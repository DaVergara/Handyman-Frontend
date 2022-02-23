import { of } from 'rxjs';

export class TechnicianServiceMock {

  getTechnicians = jasmine.createSpy('TechnicianService.getTechnicians');

  getTechnicianById = () => {};

  createTechnicians = jasmine.createSpy('TechnicianService.createTechnicians');

  updateTechnicians = jasmine.createSpy('TechnicianService.updateTechnicians');

  deleteTechnicians = jasmine.createSpy('TechnicianService.deleteTechnicians');

  addTechnicianEdit = () => {};

  getTechnicianEdit = () => { return of() };

  sendClickCall = () => {};

  getClickCall = () => { return of() };

}
