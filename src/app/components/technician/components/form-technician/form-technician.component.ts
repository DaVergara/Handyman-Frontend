import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';
import { TechnicianModel } from './../../../../shared/models/technician';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { errorGenericMsg } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-form-technician',
  templateUrl: './form-technician.component.html',
  styleUrls: ['./form-technician.component.css'],
})
export class FormTechnicianComponent implements OnInit {

  technicianForm: FormGroup;

  public title = 'Añadir Tecnico';

  public editFlag = false;

  constructor(
    private readonly _technicianService: TechnicianService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createTechnicianForm();
    this.getTechnicianEdit();
  }

  createTechnicianForm(): void {
    this.technicianForm = new FormGroup({
      technicianId: new FormControl('', [Validators.required]),
      technicianName: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern('^[a-zA-Z \u00f1\u00d1]*$'),
      ]),
      technicianLastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern('^[a-zA-Z \u00f1\u00d1]*$'),
      ]),
    });
  }

  getTechnicianEdit(): void {
    this._technicianService.getTechnicianEdit().subscribe((data: TechnicianModel) => {
      this.editFlag = true;
      this.title = 'Editar Tecnico';
      this.technicianForm.patchValue({
        technicianId: data.technicianId,
        technicianName: data.technicianName,
        technicianLastName: data.technicianLastName,
      });
    });
  }

  onSubmit(): void {
    if (this.editFlag === false) {
      this.createTechnician();
    } else {
      this.editTechnician();
    }
  }

  createTechnician(): void {
    const technician = this.getTechnicianFromForm();
    this._technicianService.createTechnicians(technician).subscribe({
      next: () => {
        this.technicianForm.reset();
        this.toastr.success('Tecnico creado satisfactoriamente');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          errorGenericMsg
        );
      },
      complete: () => this._technicianService.sendClickCall(),
    });
  }

  editTechnician(): void {
    const technician = this.getTechnicianFromForm();
    this._technicianService.updateTechnicians(technician).subscribe({
      next: () => {
        this.technicianForm.reset();
        this.toastr.success('Tecnico modificado satisfactoriamente.');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(
          error.error.message,
          errorGenericMsg
        );
        this._technicianService.sendClickCall();
      },
      complete: () => {
        this._technicianService.sendClickCall();
        this.title = 'Añadir Tecnico';
        this.editFlag = false;
      },
    });
  }

  getTechnicianFromForm(): TechnicianModel {
    const technician: TechnicianModel = {
      technicianId: this.technicianForm.value.technicianId,
      technicianName: this.technicianForm.value.technicianName,
      technicianLastName: this.technicianForm.value.technicianLastName,
    };
    return technician;
  }

}
