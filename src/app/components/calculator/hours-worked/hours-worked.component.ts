import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CalculatorService } from './../../../shared/services/calculator-service/calculator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hours-worked',
  templateUrl: './hours-worked.component.html',
  styleUrls: ['./hours-worked.component.css'],
})
export class HoursWorkedComponent implements OnInit {
  private subscription: Subscription;

  public hoursWorked: Map<string, number>;

  constructor(
    private _calculatorService: CalculatorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.restartMap();
    this.onSave();
  }

  onSave(): void {
    this.subscription = this._calculatorService
      .getClickCall()
      .subscribe((data) => {
        this.getHoursWorked(data.technicianId, data.weekNumber);
      });
  }

  getHoursWorked(technicianId: string, weekNumber: number): void {
    this.subscription = this._calculatorService
      .getHoursWorked(technicianId, weekNumber)
      .subscribe({
        next: (response: any) => this.hoursWorked = new Map(Object.entries(response.hoursWorked)),
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'Opps... ocurrio un error.');
          this.restartMap();
        },
      });
  }

  restartMap(): void {
    this.hoursWorked = new Map()
    .set('Horas Normales', 0)
    .set('Horas Nocturnas', 0)
    .set('Horas Dominicales', 0)
    .set('Horas Normales Extra', 0)
    .set('Horas Nocturnas Extra', 0)
    .set('Horas Dominicales Extra', 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
