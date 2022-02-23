import { createAppointmentValidMock, editAppointmentValidMock } from './../../mocks/appointment.mock';
import { AppointmentModel } from './../../models/appointment';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppointmentService } from './appointment.service';

fdescribe('AppointmentService', () => {
  let service: AppointmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AppointmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('[Method getAppointments]', () => {
    it('Request should be GET and return all appointments', () => {
      const appointmentsMock: AppointmentModel[] = [
        {...editAppointmentValidMock}, {...editAppointmentValidMock}, {...editAppointmentValidMock}
      ];
      const url = 'http://localhost:8080/appointments';

      service.getAppointments().subscribe({
        next: (appointments: AppointmentModel[]) => {
          expect(appointments).toEqual(appointmentsMock);
        },
      });

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('GET');
      request.flush(appointmentsMock);
    });
  });

  describe('[Method createAppointment]', () => {
    it('Request should be POST and return body appointment', () => {
      const appointmentMock = {...createAppointmentValidMock};
      const url = 'http://localhost:8080/appointments';

      service.createAppointment(appointmentMock).subscribe({
        next: (appointment: AppointmentModel) => {
          expect(appointment).toEqual(appointmentMock);
        },
      });

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(appointmentMock);
      request.flush(appointmentMock);
    });
  });

  describe('[Method updateAppointment]', () => {
    it('Request should be PUT and return body appointment', () => {
      const appointmentMock = {...editAppointmentValidMock};
      const url = 'http://localhost:8080/appointments';

      service.updateAppointment(appointmentMock).subscribe({
        next: (appointment: AppointmentModel) => {
          expect(appointment).toEqual(appointmentMock);
        },
      });

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toEqual(appointmentMock);
      request.flush(appointmentMock);
    });
  });

  describe('[Method deleteAppointment]', () => {
    it('Request should be DELETE', () => {
      const appointmentIdMock = '1036671649'
      const url = `http://localhost:8080/appointments/appointment/${appointmentIdMock}`;

      service.deleteAppointment(appointmentIdMock).subscribe(
        () => {}
      );

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('DELETE');
    });
  });
});
