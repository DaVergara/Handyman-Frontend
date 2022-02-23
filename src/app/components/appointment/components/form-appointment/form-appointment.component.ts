import { AppointmentService } from './../../../../shared/services/appointment-service/appointment.service';

import { AppointmentModel } from './../../../../shared/models/appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { errorGenericMsg } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-form-appointment',
  templateUrl: './form-appointment.component.html',
  styleUrls: ['./form-appointment.component.css'],
})

export class FormAppointmentComponent implements OnInit {

  appointmentForm: FormGroup;

  title = 'Añadir Servicio';

  editFlag = false;

  constructor(
    private readonly _appointmentService: AppointmentService,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createAppointmentForm();
    this.getAppointmentEdit()
  }

  createAppointmentForm(): void {
    this.appointmentForm = new FormGroup({
      appointmentId: new FormControl('', []),
      technicianId: new FormControl('', [Validators.required]),
      serviceId: new FormControl('', [Validators.required]),
      serviceStarted: new FormControl('', [Validators.required]),
      serviceFinished: new FormControl('', [Validators.required]),
    });
  }

  getAppointmentEdit(): void {
    this._appointmentService.getAppointmentEdit().subscribe((data: AppointmentModel) => {
      this.editFlag = true;
      this.title = 'Editar Servicio';
      this.appointmentForm.patchValue({
        appointmentId: data.appointmentId,
        technicianId: data.technicianId,
        serviceId: data.serviceId,
        serviceStarted: data.serviceStarted,
        serviceFinished: data.serviceFinished,
      });
    });
  }

  onFormSubmit(): void {
    if (this.editFlag === false) {
      this.createAppoitment();
    } else {
      this.editAppointment();
    }
  }

  createAppoitment(): void {
    const appointment: AppointmentModel = this.getAppointmentFromForm();
    this._appointmentService.createAppointment(appointment).subscribe({
      next: () => {
        this.appointmentForm.reset();
        this.toastr.success('Servicio registrado con exito.');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          errorGenericMsg
        );
      },
      complete: () => this._appointmentService.sendClickCall(),
    });
  }

  editAppointment(): void {
    const appointment: AppointmentModel = this.getAppointmentFromForm();
    this._appointmentService.updateAppointment(appointment).subscribe({
      next: () => this.toastr.success('Servicio modificado con exito.'),
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          errorGenericMsg
        );
        this._appointmentService.sendClickCall();
      },
      complete: () => {
        this.appointmentForm.reset();
        this._appointmentService.sendClickCall();
        this.title = 'Añadir Servicio';
        this.editFlag = false;
      },
    });
  }

  getAppointmentFromForm(): AppointmentModel {
    const appointment: AppointmentModel = {
      appointmentId: this.appointmentForm.value.appointmentId,
      technicianId: this.appointmentForm.value.technicianId,
      serviceId: this.appointmentForm.value.serviceId,
      serviceStarted: this.appointmentForm.value.serviceStarted,
      serviceFinished: this.appointmentForm.value.serviceFinished,
    };
    return appointment;
  }
}
