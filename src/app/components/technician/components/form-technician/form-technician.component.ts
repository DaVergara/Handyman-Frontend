import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';
import { TechnicianModel } from './../../../../shared/models/technician';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-technician',
  templateUrl: './form-technician.component.html',
  styleUrls: ['./form-technician.component.css'],
})
export class FormTechnicianComponent implements OnInit {
  technicianForm = new FormGroup({
    technicianId: new FormControl('', [Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern('^[a-zA-Z \u00f1\u00d1]*$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern('^[a-zA-Z \u00f1\u00d1]*$'),
    ]),
  });

  title = 'Añadir Tecnico';

  editFlag = false;

  constructor(
    private _technicianService: TechnicianService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._technicianService.getTechnicianEdit().subscribe((data) => {
      this.editFlag = true;
      this.title = 'Editar Tecnico';
      this.technicianForm.patchValue({
        technicianId: data.technicianId,
        name: data.technicianName,
        lastName: data.technicianLastName,
      });
    });
  }

  saveTechnician() {
    if (this.editFlag === false) {
      this.createTechnician();
    } else {
      this.editTechnician();
    }
  }

  createTechnician() {
    const TECHNICIAN: TechnicianModel = {
      technicianId: this.technicianForm.value.technicianId,
      technicianName: this.technicianForm.value.name,
      technicianLastName: this.technicianForm.value.lastName,
    };
    this._technicianService.createTechnicians(TECHNICIAN).subscribe({
      next: () => {
        this.technicianForm.reset();
        this.toastr.success('Tecnico creado satisfactoriamente');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          'Opps... ocurrio un error.'
        );
      },
      complete: () => this._technicianService.sendClickCall(),
    });
  }

  editTechnician() {
    const TECHNICIAN: TechnicianModel = {
      technicianId: this.technicianForm.value.technicianId,
      technicianName: this.technicianForm.value.name,
      technicianLastName: this.technicianForm.value.lastName,
    };
    this._technicianService.updateTechnicians(TECHNICIAN).subscribe({
      next: () => {
        this.technicianForm.reset();
        this.toastr.success('Tecnico modificado satisfactoriamente.');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          'Opps... ocurrio un error.'
        );
        this._technicianService.sendClickCall();
        this.technicianForm.reset();
      },
      complete: () => this._technicianService.sendClickCall(),
    });
    this.title = 'Añadir Tecnico';
    this.editFlag = false;
  }
}
