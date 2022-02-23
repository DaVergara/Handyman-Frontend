import { TechnicianModel } from './../../models/technician';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TechnicianService {
  private apiServerUrl: string = 'http://localhost:8080';

  private technician$ = new Subject<TechnicianModel>();

  private notifyClick$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  public getTechnicians(): Observable<TechnicianModel[]> {
    return this.http.get<TechnicianModel[]>(`${this.apiServerUrl}/technicians`);
  }

  public getTechnicianById(technicianId: string): Observable<TechnicianModel> {
    return this.http.get<TechnicianModel>(`${this.apiServerUrl}/technicians/${technicianId}`);
  }

  public createTechnicians(technician: TechnicianModel): Observable<TechnicianModel> {
    return this.http.post<TechnicianModel>(`${this.apiServerUrl}/technicians`, technician);
  }

  public updateTechnicians(technician: TechnicianModel): Observable<TechnicianModel> {
    return this.http.put<TechnicianModel>(`${this.apiServerUrl}/technicians`, technician);
  }

  public deleteTechnicians(technicianId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/technicians/${technicianId}`);
  }

  public addTechnicianEdit(technician: TechnicianModel): void {
    const TECHNICIAN: TechnicianModel = {
      ...technician,
    };
    this.technician$.next(TECHNICIAN);
  }

  public getTechnicianEdit(): Observable<TechnicianModel> {
    return this.technician$.asObservable();
  }

  public sendClickCall(): void {
    this.notifyClick$.next('');
  }

  public getClickCall():Observable<any> {
    return this.notifyClick$.asObservable();
  }
}
