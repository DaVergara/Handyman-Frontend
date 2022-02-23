import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';

import { FormTechnicianComponent } from './form-technician.component';
import { TechnicianServiceMock } from 'src/app/shared/mocks/technician-service.mock';
import {
  technicianValidMock,
  technicianEmptyMock,
} from './../../../../shared/mocks/technician.mock';
import { errorGenericMsg } from 'src/app/shared/constants/constants';

fdescribe('FormTechnicianComponent', () => {
  const technicianServiceMock = new TechnicianServiceMock();

  let component: FormTechnicianComponent;
  let fixture: ComponentFixture<FormTechnicianComponent>;

  let toastrMock: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrMock = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      declarations: [FormTechnicianComponent],
      providers: [
        { provide: TechnicianService, useValue: technicianServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Form Validations]', () => {
    describe('Control "technicianId"', () => {
      it('Technician id must be required', () => {
        const technicianIdControl =
          component.technicianForm.get('technicianId');
        const emptyValue = '';

        technicianIdControl.setValue(emptyValue);

        expect(technicianIdControl.errors?.['required']).toBeTruthy();
        expect(technicianIdControl.valid).toBeFalse();
      });
    });
    describe('Control "technicianName', () => {
      it('Technician name must be required', () => {
        const technicianNameControl =
          component.technicianForm.get('technicianName');
        const emptyValue = '';

        technicianNameControl.setValue(emptyValue);

        expect(technicianNameControl.errors?.['required']).toBeTruthy();
        expect(technicianNameControl.valid).toBeFalse();
      });

      it('Technician name can not be longer than 40 chars', () => {
        const technicianNameControl =
          component.technicianForm.get('technicianName');
        const invalidValue = 'Lorem ipsum dolor sit amet viverra fusce.';

        technicianNameControl.setValue(invalidValue);

        expect(technicianNameControl.errors?.['maxlenght']).toBeTruthy;
        expect(technicianNameControl.valid).toBeFalse();
      });

      it('Technician name can not contain special chars', () => {
        const technicianNameControl =
          component.technicianForm.get('technicianName');
        const invalidValue = 'D@vid';

        technicianNameControl.setValue(invalidValue);

        expect(technicianNameControl.errors?.['pattern']).toBeTruthy;
        expect(technicianNameControl.valid).toBeFalse();
      });
    });
    describe('Control "technicianLastName', () => {
      it('Technician last name must be required', () => {
        const technicianLastNameControl =
          component.technicianForm.get('technicianLastName');
        const emptyValue = '';

        technicianLastNameControl.setValue(emptyValue);

        expect(technicianLastNameControl.errors?.['required']).toBeTruthy();
        expect(technicianLastNameControl.valid).toBeFalse();
      });

      it('Technician last name can not be longer than 40 chars', () => {
        const technicianLastNameControl =
          component.technicianForm.get('technicianLastName');
        const invalidValue = 'Lorem ipsum dolor sit amet viverra fusce.';

        technicianLastNameControl.setValue(invalidValue);

        expect(technicianLastNameControl.errors?.['maxlenght']).toBeTruthy;
        expect(technicianLastNameControl.valid).toBeFalse();
      });

      it('Technician last name can not contain special chars', () => {
        const technicianLastNameControl =
          component.technicianForm.get('technicianLastName');
        const invalidValue = 'Vergar@';

        technicianLastNameControl.setValue(invalidValue);

        expect(technicianLastNameControl.errors?.['pattern']).toBeTruthy;
        expect(technicianLastNameControl.valid).toBeFalse();
      });
    });
  });

  describe('[Method createTechnician]', () => {
    it('Create technician success', fakeAsync(() => {
      const technicianMock = { ...technicianValidMock };
      component.technicianForm.setValue(technicianMock);
      const spyresetForm = spyOn(component.technicianForm, 'reset');
      technicianServiceMock.createTechnicians.and.returnValue(of('Success'));

      component.createTechnician();

      expect(spyresetForm).toHaveBeenCalled();
      expect(toastrMock.success).toHaveBeenCalledWith(
        'Tecnico creado satisfactoriamente'
      );
      flush();
    }));

    it('Create technician failure', () => {
      const technicianMock = { ...technicianEmptyMock };
      component.technicianForm.setValue(technicianMock);
      const spyresetForm = spyOn(component.technicianForm, 'reset');
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Create Mock' },
        status: 400,
        statusText: 'Bad Request',
      });

      technicianServiceMock.createTechnicians.and.returnValue(
        throwError(() => new HttpErrorResponse(errorResponseMock))
      );

      component.createTechnician();

      expect(spyresetForm).not.toHaveBeenCalled();
      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Create Mock',
        errorGenericMsg
      );
    });
  });

  describe('[Method editTechnician]', () => {
    it('Edit technician success', fakeAsync(() => {
      const technicianMock = { ...technicianValidMock };
      component.technicianForm.setValue(technicianMock);
      const spyresetForm = spyOn(component.technicianForm, 'reset');
      technicianServiceMock.updateTechnicians.and.returnValue(of('Success'));

      component.editTechnician();

      expect(spyresetForm).toHaveBeenCalled();
      expect(toastrMock.success).toHaveBeenCalledWith(
        'Tecnico modificado satisfactoriamente.'
      );
      flush();
    }));

    it('Edit technician failure', fakeAsync(() => {
      const technicianMock = { ...technicianEmptyMock };
      component.technicianForm.setValue(technicianMock);
      const spyresetForm = spyOn(component.technicianForm, 'reset');
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Edit Mock' },
        status: 400,
        statusText: 'Bad Request',
      });

      technicianServiceMock.updateTechnicians.and.returnValue(
        throwError(() => new HttpErrorResponse(errorResponseMock))
      );

      component.editTechnician();

      expect(spyresetForm).not.toHaveBeenCalled();
      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Edit Mock',
        errorGenericMsg
      );
      flush();
    }));
  });
});
