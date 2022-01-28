import { TechnicianModel } from './../../models/technician';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

// here, put all methods that you need for provide technician
// like create, update, query or delete.
@Injectable({
  providedIn: 'root',
})
export class TechnicianService {
  private technician$ = new Subject<TechnicianModel>();

  technicians: TechnicianModel[] = [];
  private technicians$ = new Subject<TechnicianModel[]>();

  // With HttpClient, you can use http methods like post, put, delete and get.
  // private readonly http: HttpClient
  constructor() {}

  public getTechnicians(): Observable<TechnicianModel[]> {
    return this.technicians$.asObservable();
  }

  public getTechnicianById(technicianId: string) {
    console.log(technicianId);
    if (technicianId !== '') {
      this.technicians$.next(
        this.technicians.filter((technician) =>
          technician.technicianId.includes(technicianId)
        )
      );
    } else {
      this.technicians$.next(this.technicians);
    }
  }

  public createTechnicians(technician: TechnicianModel) {
    this.technicians.push(technician);
    this.technicians$.next(this.technicians);
    alert('Tecnico creado satisfactoriamente.');
  }

  public updateTechnicians(technician: TechnicianModel, index: number) {
    this.technicians[index].name = technician.name;
    this.technicians[index].lastName = technician.lastName;
    this.technicians$.next(this.technicians);
    alert('Tecnico modificado satisfactoriamente.');
  }

  public deleteTechnicians(technicianId: string) {
    this.technicians = this.technicians.filter(
      (technician) => technician.technicianId !== technicianId
    );
    this.technicians$.next(this.technicians);
    alert('Tecnico eliminado satisfactoriamente.');
  }

  addTechnicianEdit(technician: TechnicianModel, index: number) {
    const TECHNICIAN: any = {
      index: index,
      ...technician,
    };
    this.technician$.next(TECHNICIAN);
  }

  getTechnicianEdit(): Observable<any> {
    return this.technician$.asObservable();
  }
}
