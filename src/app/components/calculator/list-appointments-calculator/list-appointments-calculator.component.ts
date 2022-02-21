import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AppointmentModel } from './../../../shared/models/appointment';
import { Subscription } from 'rxjs';
import { CalculatorService } from '../../../shared/services/calculator-service/calculator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-appointments-calculator',
  templateUrl: './list-appointments-calculator.component.html',
  styleUrls: ['./list-appointments-calculator.component.css'],
})
export class ListAppointmentsCalculatorComponent implements OnInit {
  public listAppointments: AppointmentModel[];
  public showAppointments: AppointmentModel[];
  private subscription: Subscription;

  public technicianId: string = '';
  public weekNumber: number = 1;

  constructor(
    private readonly _calculatorService: CalculatorService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getAppointmentsOfWeek(): void {
    this.subscription = this._calculatorService
      .getAppointmentsOfWeek(this.technicianId, this.weekNumber)
      .subscribe({
        next: (response: AppointmentModel[]) =>
          (this.listAppointments = response),
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'Opps... ocurrio un error.');
        },
        complete: () =>
          this._calculatorService.sendClickCall(
            this.technicianId,
            this.weekNumber
          ),
      });
  }
}
