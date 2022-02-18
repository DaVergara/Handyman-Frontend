import { ToastrService } from 'ngx-toastr';
//import { element } from 'protractor';
import { TechnicianModel } from './../../../../shared/models/technician';
import { Component, Input, OnInit } from '@angular/core';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-technicians',
  templateUrl: './list-technicians.component.html',
  styleUrls: ['./list-technicians.component.css'],
})
export class ListTechniciansComponent implements OnInit {
  public listTechnicians: TechnicianModel[];
  public technician: TechnicianModel;

  message: string;

  public searchId: string = '';

  private subscription: Subscription;

  constructor(
    private _technicianService: TechnicianService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTechnicians();
    this.onSave();
  }

  onSave(): void {
    this.subscription = this._technicianService.getClickCall().subscribe(() => {
      this.getTechnicians();
    });
  }

  getTechnicians(): void {
    this.subscription = this._technicianService.getTechnicians().subscribe({
      next: (response: TechnicianModel[]) => (this.listTechnicians = response),
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          'Opps... ocurrio un error.'
        );
      },
    });
  }

  filterById(): void {
    const results: TechnicianModel[] = [];
    for (const technician of this.listTechnicians) {
      if (technician.technicianId.indexOf(this.searchId) !== -1) {
        results.push(technician);
      }
    }
    this.listTechnicians = results;
    if (results.length === 0 || !this.searchId) {
      this.getTechnicians();
    }
  }

  getTechnicianById(): void {
    this.subscription = this._technicianService
      .getTechnicianById(this.searchId)
      .subscribe({
        next: (response: TechnicianModel) => (this.technician = response),
        error: (error: HttpErrorResponse) => {
          this.toastr.error(
            error.error.message,
            'Opps... ocurrio un error.'
          );
        },
      });
  }

  updateTechnician(technician: TechnicianModel): void {
    this._technicianService.addTechnicianEdit(technician);
  }

  deleteTechnician(technicianId: string): void {
    this.subscription = this._technicianService
      .deleteTechnicians(technicianId)
      .subscribe({
        next: () => {
          this.getTechnicians();
          this.toastr.success('Tecnico Eliminado.');
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
