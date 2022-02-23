import { of } from 'rxjs';

export class AppointmentServiceMock {

  getAppointments = jasmine.createSpy('AppointmentService.getAppointments');

  createAppointment = jasmine.createSpy('AppointmentService.createAppointment');

  updateAppointment = jasmine.createSpy('AppointmentService.updateAppointment');

  deleteAppointment = jasmine.createSpy('AppointmentService.deleteAppointment');

  addAppointmentEdit = () => {};

  getAppointmentEdit = () => { return of() };

  sendClickCall = () => {};

  getClickCall = () => { return of() };

}
