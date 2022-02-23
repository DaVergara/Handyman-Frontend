import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CalculatorService } from './../../../shared/services/calculator-service/calculator.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CalculatorServiceMock } from './../../../shared/mocks/calculator-service.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursWorkedComponent } from './hours-worked.component';
import { resultMapWithoutValues, resultMapWithValues } from 'src/app/shared/mocks/hours-worked.mock';
import { errorGenericMsg } from 'src/app/shared/constants/constants';

fdescribe('HoursWorkedComponent', () => {
  const calculatorServiceMock = new CalculatorServiceMock();

  let component: HoursWorkedComponent;
  let fixture: ComponentFixture<HoursWorkedComponent>;

  let toastrMock: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrMock = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      imports: [FormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
      declarations: [HoursWorkedComponent],
      providers: [
        { provide: CalculatorService, useValue: calculatorServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursWorkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Method getHoursWorked]', () => {
    it('Get hours worked success', () => {
      const resultMap = resultMapWithValues;

      const hoursWorkedMock = {
        hoursWorked: {
          'Horas Normales': 120,
          'Horas Nocturnas': 180,
          'Horas Dominicales': 240,
          'Horas Normales Extra': 0,
          'Horas Nocturnas Extra': 0,
          'Horas Dominicales Extra': 0,
        },
      };

      const technicianIdMock = '1036671649';
      const weekNumberMock = 8;
      calculatorServiceMock.getHoursWorked.and.returnValue(of(hoursWorkedMock));

      component.getHoursWorked(technicianIdMock, weekNumberMock);

      expect(component.hoursWorked).toEqual(resultMap);
    });

    it('Get hours worked failure', () => {
      const resultMap = resultMapWithoutValues;
      const technicianIdMock = '1036671649';
      const weekNumberMock = 8;
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Get hours worked Mock'},
        status: 400,
        statusText: 'Bad Request',
      });
      const spyResetMap = spyOn(component, 'restartMap');
      calculatorServiceMock.getHoursWorked.and.returnValue(throwError(() => new HttpErrorResponse(errorResponseMock)));

      component.getHoursWorked(technicianIdMock, weekNumberMock);

      expect(component.hoursWorked).toEqual(resultMap);
      expect(spyResetMap).toHaveBeenCalled();
      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Get hours worked Mock',
        errorGenericMsg
      )
    });
  });
});
