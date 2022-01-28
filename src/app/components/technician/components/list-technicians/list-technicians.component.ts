//import { element } from 'protractor';
import { TechnicianModel } from './../../../../shared/models/technician';
import { Component, OnInit } from '@angular/core';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-technicians',
  templateUrl: './list-technicians.component.html',
  styleUrls: ['./list-technicians.component.css'],
})
export class ListTechniciansComponent implements OnInit {
  listTechnicians = [];

  searchId = '';

  private subscription: Subscription;

  constructor(private _technicianService: TechnicianService) {}

  ngOnInit(): void {
    this.getTechnicians();
  }

  getTechnicians(): void {
    this.subscription = this._technicianService
      .getTechnicians()
      .subscribe((data) => {
        this.listTechnicians = data;
      });
  }

  getTechnicianById() {
    this._technicianService.getTechnicianById(this.searchId);
  }

  updateTechnician(technician: TechnicianModel, index: number) {
    this._technicianService.addTechnicianEdit(technician, index);
  }

  deleteTechnician(technicianId: string) {
    this._technicianService.deleteTechnicians(technicianId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
