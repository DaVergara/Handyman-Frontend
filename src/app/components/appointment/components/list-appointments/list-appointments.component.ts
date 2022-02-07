import { ToastrService } from 'ngx-toastr';
import { AppointmentModel } from './../../../../shared/models/appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment-service/appointment.service';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css'],
})
export class ListAppointmentsComponent implements OnInit {
  public listAppointments: AppointmentModel[];
  public appoitnment: AppointmentModel;

  message: string;

  public searchId: string = '';

  private subscription: Subscription;

  constructor(
    private _appointmentService: AppointmentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAppointments();
    this.onSave();
  }

  onSave(): void {
    this.subscription = this._appointmentService
      .getClickCall()
      .subscribe(() => {
        this.getAppointments();
      });
  }

  getAppointments(): void {
    this.subscription = this._appointmentService.getAppointments().subscribe({
      next: (response: AppointmentModel[]) =>
        (this.listAppointments = response),
      error: (error: HttpErrorResponse) => alert(error.message),
    });
  }

  filterById(): void {

  }

  getAppointmentByServiceId(): void {}

  updateAppointment(appointment: AppointmentModel): void {
    this._appointmentService.addAppointmentEdit(appointment);
  }

  deleteTechnician(serviceId: string): void {
    this.subscription = this._appointmentService
      .deleteAppointment(serviceId)
      .subscribe({
        next: () => {
          this.getAppointments();
          this.toastr.success('Servicio Eliminado');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(
            error.error.message,
            'Opps... ocurrio un error.'
          );
        },
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
