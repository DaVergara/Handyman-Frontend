import { ToastrService } from 'ngx-toastr';
import { AppointmentModel } from './../../../../shared/models/appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/shared/services/appointment-service/appointment.service';
import { errorGenericMsg } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css'],
})
export class ListAppointmentsComponent implements OnInit {
  public listAppointments: AppointmentModel[];
  public showAppointments: AppointmentModel[];
  public appoitnment: AppointmentModel;

  public searchId = '';

  private subscription: Subscription;

  constructor(
    private readonly _appointmentService: AppointmentService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllAppointments();
    this.updateListListener();
  }

  updateListListener(): void {
    this.subscription = this._appointmentService
      .getClickCall()
      .subscribe(() => {
        this.getAllAppointments();
      });
  }

  getAllAppointments(): void {
    this.subscription = this._appointmentService.getAppointments().subscribe({
      next: (response: AppointmentModel[]) =>
        (this.listAppointments = response),
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message, errorGenericMsg);
      },
      complete: () => (this.showAppointments = this.listAppointments),
    });
  }

  filterById(): void {
    if (this.searchId !== '') {
      this.showAppointments = this.listAppointments.filter(
        (appointment: AppointmentModel) =>
          appointment.appointmentId.includes(this.searchId)
      );
    } else {
      this.getAllAppointments();
    }
  }

  getAppointmentByServiceId(): void {}

  updateAppointment(appointment: AppointmentModel): void {
    this._appointmentService.addAppointmentEdit(appointment);
  }

  deleteAppointment(appointmentId: string): void {
    this.subscription = this._appointmentService
      .deleteAppointment(appointmentId)
      .subscribe({
        next: () => {
          this.getAllAppointments();
          this.toastr.success('Servicio Eliminado');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, errorGenericMsg);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
