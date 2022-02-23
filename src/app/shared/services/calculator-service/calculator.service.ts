
import { Observable, Subject } from 'rxjs';
import { AppointmentModel } from '../../models/appointment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private apiServerUrl: string = 'http://localhost:8080';

  private notifyClick$ = new Subject<any>();

  constructor(private readonly http: HttpClient) { }

  public getAppointmentsOfWeek(technicianId: string ,weekNumber: number): Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(`${this.apiServerUrl}/appointments/technician/${technicianId}/week/${weekNumber}`);
  }

  public getHoursWorked(technicianId: string ,weekNumber: number): any {
    return this.http.get<any>(`${this.apiServerUrl}/hours_worked/technician/${technicianId}/week/${weekNumber}`);
  }

  sendClickCall(technicianId: string, weekNumber: number): void {
    const CONSULT: any = {
      technicianId,
      weekNumber
    }
    this.notifyClick$.next(CONSULT);
  }

  getClickCall(): Observable<any> {
    return this.notifyClick$.asObservable();
  }

}
