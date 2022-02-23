import { of } from 'rxjs';

export class CalculatorServiceMock {

  getAppointmentsOfWeek = jasmine.createSpy('CalculatorService.getAppointmentsOfWeek');

  getHoursWorked =jasmine.createSpy('CalculatorService.getHoursWorked');

  sendClickCall = () => {};

  getClickCall = () => { return of() };

}
