import { of, throwError } from 'rxjs';
import { createAppointmentValidMock, createAppointmentEmptyMock, editAppointmentValidMock, editAppointmentEmptyMock } from './../../../../shared/mocks/appointment.mock';
import { AppointmentService } from './../../../../shared/services/appointment-service/appointment.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { FormAppointmentComponent } from './form-appointment.component';
import { AppointmentServiceMock } from 'src/app/shared/mocks/appointment-service.mock';
import { errorGenericMsg } from 'src/app/shared/constants/constants';

fdescribe('FormAppointmentComponent', () => {

  const appointmentServiceMock = new AppointmentServiceMock();

  let component: FormAppointmentComponent;
  let fixture: ComponentFixture<FormAppointmentComponent>;

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
      declarations: [ FormAppointmentComponent ],
      providers: [
        { provide: AppointmentService, useValue: appointmentServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAppointmentComponent);
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
          component.appointmentForm.get('technicianId');
        const emptyValue = '';

        technicianIdControl.setValue(emptyValue);

        expect(technicianIdControl.errors?.['required']).toBeTruthy();
        expect(technicianIdControl.valid).toBeFalse();
      });
    })
    describe('Control "serviceId"', () => {
      it('Service id must be required', () => {
        const serviceIdControl =
          component.appointmentForm.get('serviceId');
        const emptyValue = '';

        serviceIdControl.setValue(emptyValue);

        expect(serviceIdControl.errors?.['required']).toBeTruthy();
        expect(serviceIdControl.valid).toBeFalse();
      });
    })
    describe('Control "serviceStarted"', () => {
      it('Servicice start must be required', () => {
        const serviceStartedControl =
          component.appointmentForm.get('serviceStarted');
        const emptyValue = '';

        serviceStartedControl.setValue(emptyValue);

        expect(serviceStartedControl.errors?.['required']).toBeTruthy();
        expect(serviceStartedControl.valid).toBeFalse();
      });
    })
    describe('Control "serviceFinished"', () => {
      it('Service end must be required', () => {
        const serviceFinishedControl =
          component.appointmentForm.get('serviceFinished');
        const emptyValue = '';

        serviceFinishedControl.setValue(emptyValue);

        expect(serviceFinishedControl.errors?.['required']).toBeTruthy();
        expect(serviceFinishedControl.valid).toBeFalse();
      });
    })
  });

  describe('[Method createAppoitment]', () => {
    it('Create appointment success', fakeAsync(() => {
      const appointmentMock = { ...createAppointmentValidMock };
      component.appointmentForm.setValue(appointmentMock);
      const spyresetForm = spyOn(component.appointmentForm, 'reset');
      appointmentServiceMock.createAppointment.and.returnValue(of('Success'));

      component.createAppoitment();

      expect(spyresetForm).toHaveBeenCalled();
      expect(toastrMock.success).toHaveBeenCalledWith(
        'Servicio registrado con exito.'
      );
      flush();
    }));

    it('Create appointment failure', () => {
      const appointmentMock = { ...createAppointmentEmptyMock };
      component.appointmentForm.setValue(appointmentMock);
      const spyresetForm = spyOn(component.appointmentForm, 'reset');
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Create Mock' },
        status: 400,
        statusText: 'Bad Request',
      });

      appointmentServiceMock.createAppointment.and.returnValue(
        throwError(() => new HttpErrorResponse(errorResponseMock))
      );

      component.createAppoitment();

      expect(spyresetForm).not.toHaveBeenCalled();
      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Create Mock',
        errorGenericMsg
      );
    });
  });

  describe('[Method editAppointment]', () => {
    it('Edit appointment success', fakeAsync(() => {
      const appointmentMock = { ...editAppointmentValidMock };
      component.appointmentForm.setValue(appointmentMock);
      const spyresetForm = spyOn(component.appointmentForm, 'reset');
      appointmentServiceMock.updateAppointment.and.returnValue(of('Success'));

      component.editAppointment();

      expect(spyresetForm).toHaveBeenCalled();
      expect(toastrMock.success).toHaveBeenCalledWith(
        'Servicio modificado con exito.'
      );
      flush();
    }));

    it('Create technician failure', fakeAsync(() => {
      const appointmentMock = { ...editAppointmentEmptyMock };
      component.appointmentForm.setValue(appointmentMock);
      const spyresetForm = spyOn(component.appointmentForm, 'reset');
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Edit Mock' },
        status: 400,
        statusText: 'Bad Request',
      });

      appointmentServiceMock.createAppointment.and.returnValue(
        throwError(() => new HttpErrorResponse(errorResponseMock))
      );

      component.createAppoitment();

      expect(spyresetForm).not.toHaveBeenCalled();
      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Edit Mock',
        errorGenericMsg
      );
    }));
  });

});
