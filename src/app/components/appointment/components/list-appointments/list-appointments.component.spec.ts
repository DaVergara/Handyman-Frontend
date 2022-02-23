import { AppointmentService } from 'src/app/shared/services/appointment-service/appointment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { editAppointmentValidMock } from './../../../../shared/mocks/appointment.mock';
import { of, throwError } from 'rxjs';
import { AppointmentModel } from './../../../../shared/models/appointment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AppointmentServiceMock } from 'src/app/shared/mocks/appointment-service.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentsComponent } from './list-appointments.component';
import { errorGenericMsg } from 'src/app/shared/constants/constants';

fdescribe('ListAppointmentsComponent', () => {
  const appointmentServiceMock = new AppointmentServiceMock();

  let component: ListAppointmentsComponent;
  let fixture: ComponentFixture<ListAppointmentsComponent>;

  let toastrMock: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrMock = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      declarations: [ ListAppointmentsComponent ],
      providers: [
        { provide: AppointmentService, useValue: appointmentServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    const appointmentsMock: AppointmentModel[] = [];
    fixture = TestBed.createComponent(ListAppointmentsComponent);
    component = fixture.componentInstance;
    appointmentServiceMock.getAppointments.and.returnValue(of(appointmentsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Method getAllAppointments]', () => {
    it('Get all appointments succcess', () => {
      const appointmentsMock: AppointmentModel[] = [
        { ...editAppointmentValidMock }, { ...editAppointmentValidMock }, { ...editAppointmentValidMock }
      ];
      appointmentServiceMock.getAppointments.and.returnValue(of(appointmentsMock));

      component.getAllAppointments();

      expect(component.listAppointments).toEqual(appointmentsMock);
    });

    it('Get all technicianns failure', () => {
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Get Appointemnts Mock' },
        status: 400,
        statusText: 'Bad Request',
      });
      appointmentServiceMock.getAppointments.and.returnValue(
        throwError(() => new HttpErrorResponse(errorResponseMock))
      );

      component.getAllAppointments();

      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Get Appointemnts Mock',
        errorGenericMsg
      );
    });
  });

  describe('[Method deleteAppointment]', () => {
    it('Delete appointment success', () => {
      const appointmentIdMock = 'OszZTV5G';
      appointmentServiceMock.deleteAppointment.and.returnValue(of('Success'));

      component.deleteAppointment(appointmentIdMock);

      expect(toastrMock.success).toHaveBeenCalledWith('Servicio Eliminado');
    });

    it('Delete appointment failure', () => {
      const appointmentIdMock = '';
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Delete appointment Mock'},
        status: 400,
        statusText: 'Bad Request',
      });
      appointmentServiceMock.deleteAppointment.and.returnValue(
        throwError(() => new HttpErrorResponse(errorResponseMock))
      );

      component.deleteAppointment(appointmentIdMock);

      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Delete appointment Mock',
        errorGenericMsg
      );
    });
  });
});
