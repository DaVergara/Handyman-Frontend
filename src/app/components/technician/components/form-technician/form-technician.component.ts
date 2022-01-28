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

  index: number | undefined;

  editFlag = false;

  constructor(private _technicianService: TechnicianService) {}

  ngOnInit(): void {
    this._technicianService.getTechnicianEdit().subscribe((data) => {
      this.index = data.index;
      this.editFlag = true;
      this.title = 'Editar Tecnico';
      this.technicianForm.patchValue({
        technicianId: data.technicianId,
        name: data.name,
        lastName: data.lastName,
      });
    });
  }

  saveTechnician() {
    console.log(this.index);
    if (this.editFlag === false) {
      this.createTechnician();
    } else {
      this.editTechnician(this.index);
    }
  }

  createTechnician() {
    const TECHNICIAN: TechnicianModel = {
      technicianId: this.technicianForm.value.technicianId,
      name: this.technicianForm.value.name,
      lastName: this.technicianForm.value.lastName,
    };

    this._technicianService.createTechnicians(TECHNICIAN);
    this.technicianForm.reset();
  }

  editTechnician(index: number) {
    const TECHNICIAN: TechnicianModel = {
      technicianId: this.technicianForm.value.technicianId,
      name: this.technicianForm.value.name,
      lastName: this.technicianForm.value.lastName,
    };
    this._technicianService.updateTechnicians(TECHNICIAN, index);
    this.title = 'Añadir Tecnico';
    this.technicianForm.reset();
    this.editFlag = false;
  }
}
