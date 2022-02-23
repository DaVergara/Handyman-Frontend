import { editAppointmentValidMock } from './../../mocks/appointment.mock';
import { AppointmentModel } from './../../models/appointment';
import {
  HttpTestingController,
  HttpClientTestingModule,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

fdescribe('CalculatorServiceService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('[Method getAppointmentsOfWeek]', () => {
    it('Request should be GET and return all appointments', () => {
      const appointmentsMock: AppointmentModel[] = [
        { ...editAppointmentValidMock },
        { ...editAppointmentValidMock },
        { ...editAppointmentValidMock },
      ];
      const technicianIdMock = '1036671649';
      const weekNumberMock = 8;
      const url = `http://localhost:8080/appointments/technician/${technicianIdMock}/week/${weekNumberMock}`;

      service
        .getAppointmentsOfWeek(technicianIdMock, weekNumberMock)
        .subscribe({
          next: (appointments: AppointmentModel[]) => {
            expect(appointments).toEqual(appointmentsMock);
          },
        });

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('GET');
      request.flush(appointmentsMock);
    });
  });

  describe('[Method getHoursWorked]', () => {
    it('Request should be GET and return hours worked', () => {
      const hoursWorkedMock = new Map()
        .set('Horas Normales', 0)
        .set('Horas Nocturnas', 0)
        .set('Horas Dominicales', 0)
        .set('Horas Normales Extra', 0)
        .set('Horas Nocturnas Extra', 0)
        .set('Horas Dominicales Extra', 0);
      const technicianIdMock = '1036671649';
      const weekNumberMock = 8;
      const url = `http://localhost:8080/hours_worked/technician/${technicianIdMock}/week/${weekNumberMock}`

      service.getHoursWorked(technicianIdMock, weekNumberMock).subscribe({
        next: (hoursWorked: any) => {
          expect(hoursWorked).toEqual(hoursWorkedMock);
        },
      });

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('GET');
      request.flush(hoursWorkedMock);
    });
  });
});
