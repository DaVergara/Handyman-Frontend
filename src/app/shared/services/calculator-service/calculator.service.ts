
import { Observable, Subject } from 'rxjs';
import { AppointmentModel } from '../../models/appointment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private apiServerUrl: string = 'http://localhost:8080';

  private subject$ = new Subject<any>();

  constructor(private http: HttpClient) { }

  public getAppointmentsOfWeek(technicianId: string ,weekNumber: number): Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(`${this.apiServerUrl}/hours_worked/appointments/technician/${technicianId}/week/${weekNumber}`);

  }

  public getHoursWorked(technicianId: string ,weekNumber: number) {
    return this.http.get<any>(`${this.apiServerUrl}/hours_worked/technician/${technicianId}/week/${weekNumber}`);
  }

  sendClickCall(technicianId: string, weekNumber: number) {
    const CONSULT: any = {
      technicianId,
      weekNumber
    }
    this.subject$.next(CONSULT);
  }

  getClickCall() {
    return this.subject$.asObservable();
  }

}
