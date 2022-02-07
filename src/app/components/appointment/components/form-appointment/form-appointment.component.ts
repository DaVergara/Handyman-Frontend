import { AppointmentService } from './../../../../shared/services/appointment-service/appointment.service';

import { AppointmentModel } from './../../../../shared/models/appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-appointment',
  templateUrl: './form-appointment.component.html',
  styleUrls: ['./form-appointment.component.css'],
})
export class FormAppointmentComponent implements OnInit {
  appointmentForm = new FormGroup({
    technicianId: new FormControl('', [Validators.required]),
    serviceId: new FormControl('', []),
    serviceStarted: new FormControl('', [Validators.required]),
    serviceFinished: new FormControl('', [Validators.required]),
  });

  title = 'Añadir Servicio';

  editFlag = false;

  constructor(
    private _appointmentService: AppointmentService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this._appointmentService.getAppointmentEdit().subscribe((data) => {
      this.editFlag = true;
      this.title = 'Editar Servicio';
      this.appointmentForm.patchValue({
        technicianId: data.technicianId,
        serviceId: data.serviceId,
        serviceStarted: data.serviceStarted,
        serviceFinished: data.serviceFinished,
      });
    });
  }

  saveAppointment() {
    if (this.editFlag === false) {
      this.createAppoitment();
    } else {
      this.editAppointment();
    }
  }

  createAppoitment() {
    const APPOINTMENT: AppointmentModel = {
      technicianId: this.appointmentForm.value.technicianId,
      serviceId: '',
      serviceStarted: this.appointmentForm.value.serviceStarted,
      serviceFinished: this.appointmentForm.value.serviceFinished,
    };
    this._appointmentService.createAppointment(APPOINTMENT).subscribe({
      next: () => {
        this.appointmentForm.reset();
        this.toastr.success('Servicio registrado con exito.');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          'Opps... ocurrio un error.'
        );
      },
      complete: () => this._appointmentService.sendClickCall(),
    });
  }

  editAppointment() {
    const APPOINTMENT: AppointmentModel = {
      technicianId: this.appointmentForm.value.technicianId,
      serviceId: this.appointmentForm.value.serviceId,
      serviceStarted: this.appointmentForm.value.serviceStarted,
      serviceFinished: this.appointmentForm.value.serviceFinished,
    };
    this._appointmentService.updateAppointment(APPOINTMENT).subscribe({
      next: () => {
        this.appointmentForm.reset();
        this.toastr.success('Servicio modificado con exito.');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          'Opps... ocurrio un error.'
        );
        this.appointmentForm.reset();
        this._appointmentService.sendClickCall();
      },
      complete: () => this._appointmentService.sendClickCall(),
    });
    this.title = 'Añadir Servicio';
    this.editFlag = false;
  }
}
