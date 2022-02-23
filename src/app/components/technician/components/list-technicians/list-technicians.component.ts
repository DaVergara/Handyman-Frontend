import { errorGenericMsg } from 'src/app/shared/constants/constants';
import { ToastrService } from 'ngx-toastr';
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
  public showTechnicians: TechnicianModel[];
  public technician: TechnicianModel;

  public message: string;

  public searchId: string = '';

  private subscription: Subscription;

  constructor(
    private _technicianService: TechnicianService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllTechnicians();
    this.updateListListener();
  }

  updateListListener(): void {
    this.subscription = this._technicianService.getClickCall().subscribe(() => {
      this.getAllTechnicians();
    });
  }

  getAllTechnicians(): void {
    this.subscription = this._technicianService.getTechnicians().subscribe({
      next: (response: TechnicianModel[]) => (this.listTechnicians = response),
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message, errorGenericMsg);
      },
      complete: () => (this.showTechnicians = this.listTechnicians),
    });
  }

  filterById(): void {
    if (this.searchId !== '') {
      this.showTechnicians = this.listTechnicians.filter(
        (technician: TechnicianModel) =>
          technician.technicianId.includes(this.searchId)
      );
    } else {
      this.getAllTechnicians();
    }
  }

  getTechnicianById(): void {
    this.subscription = this._technicianService
      .getTechnicianById(this.searchId)
      .subscribe({
        next: (response: TechnicianModel) => (this.technician = response),
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, errorGenericMsg);
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
          this.getAllTechnicians();
          this.toastr.success('Tecnico Eliminado.');
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
