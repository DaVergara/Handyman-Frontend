import { HttpClient } from '@angular/common/http';
import { AppointmentModel } from './../../models/appointment';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiServerUrl: string = 'http://localhost:8080';

  private appointment$ = new Subject<AppointmentModel>();

  private notifyClick$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  public getAppointments(): Observable<AppointmentModel[]> {
    return this.http.get<AppointmentModel[]>(`${this.apiServerUrl}/appointments`);
  }

  public createAppointment(appointment: AppointmentModel): Observable<AppointmentModel> {
    return this.http.post<AppointmentModel>(`${this.apiServerUrl}/appointments`, appointment);
  }

  public updateAppointment(appointment: AppointmentModel): Observable<AppointmentModel> {
    return this.http.put<AppointmentModel>(`${this.apiServerUrl}/appointments`, appointment);
  }

  public deleteAppointment(appointmenteId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/appointments/appointment/${appointmenteId}`);
  }

  addAppointmentEdit(appointment: AppointmentModel): void {
    const APPOINTMENT: AppointmentModel = {
      ...appointment,
    };
    this.appointment$.next(APPOINTMENT);
  }

  getAppointmentEdit(): Observable<AppointmentModel> {
    return this.appointment$.asObservable();
  }

  sendClickCall() {
    this.notifyClick$.next('');
  }

  getClickCall() {
    return this.notifyClick$.asObservable();
  }
}
