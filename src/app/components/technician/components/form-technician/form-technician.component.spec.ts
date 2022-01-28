//import { element } from 'protractor';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';
import { TechnicianModel } from './../../../../shared/models/technician';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { FormTechnicianComponent } from './form-technician.component';
import { By } from '@angular/platform-browser';

describe('FormTechnicianComponent', () => {
  let component: FormTechnicianComponent;
  let fixture: ComponentFixture<FormTechnicianComponent>;
  let technicianService;
  let formTechnicianComponent;
  let element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [FormTechnicianComponent],
      providers: [TechnicianService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([TechnicianService], s => {
    technicianService = s;
    fixture = TestBed.createComponent(FormTechnicianComponent);
    formTechnicianComponent = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('Invalid form', () => {
    const fixture = TestBed.createComponent(FormTechnicianComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges;

    const form = app.technicianForm;
    const id = app.technicianForm.controls['technicianId'];
    id.setValue('1036671649');
    expect(form.invalid).toBeTrue();
  });

  it('something', () => {
    const fixture = TestBed.createComponent(FormTechnicianComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges;

    const id = app.technicianForm.controls['technicianId'];
    const name = app.technicianForm.controls['name'];
    const lastName = app.technicianForm.controls['lastName'];

    id.setValue('101010');
    name.setValue('David');
    lastName.setValue('Vergara');

    const btnElement = fixture.debugElement.query(By.css('button.btn'));
    btnElement.nativeElement.click();

    expect(1).toEqual(1);
  })

});
