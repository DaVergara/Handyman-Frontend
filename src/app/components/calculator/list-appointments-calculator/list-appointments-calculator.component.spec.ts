import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { editAppointmentValidMock } from './../../../shared/mocks/appointment.mock';
import { AppointmentModel } from './../../../shared/models/appointment';
import { CalculatorService } from './../../../shared/services/calculator-service/calculator.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CalculatorServiceMock } from './../../../shared/mocks/calculator-service.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentsCalculatorComponent } from './list-appointments-calculator.component';
import { errorGenericMsg } from 'src/app/shared/constants/constants';

fdescribe('ListAppointmentsCalculatorComponent', () => {
  const calculatorServiceMock = new CalculatorServiceMock();

  let component: ListAppointmentsCalculatorComponent;
  let fixture: ComponentFixture<ListAppointmentsCalculatorComponent>;

  let toastrMock: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrMock = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      imports: [FormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
      declarations: [ ListAppointmentsCalculatorComponent ],
      providers: [
        { provide: CalculatorService, useValue: calculatorServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Method getAppointmentsOfWeek]', () => {
    it('Get appointments of week success', () => {
      const appointmentMock: AppointmentModel[] = [
        {...editAppointmentValidMock}, {...editAppointmentValidMock}, {...editAppointmentValidMock},
      ];
      calculatorServiceMock.getAppointmentsOfWeek.and.returnValue(of(appointmentMock));
      const spySendClickCall = spyOn(calculatorServiceMock, 'sendClickCall');

      component.getAppointmentsOfWeek();

      expect(component.listAppointments).toEqual(appointmentMock);
      expect(spySendClickCall).toHaveBeenCalled();
    });

    it('Get appointments of week filure', () => {
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Get appointments of week Mock'},
        status: 400,
        statusText: 'Bad Request',
      });
      const spySendClickCall = spyOn(calculatorServiceMock, 'sendClickCall');
      calculatorServiceMock.getAppointmentsOfWeek.and.returnValue(throwError(() => new HttpErrorResponse(errorResponseMock)));

      component.getAppointmentsOfWeek();

      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Get appointments of week Mock',
        errorGenericMsg
      );
      expect(spySendClickCall).not.toHaveBeenCalled();
    });
  });
});
