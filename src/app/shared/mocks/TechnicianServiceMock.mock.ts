import { of } from 'rxjs';

export class TechnicianServiceMock {

  getTechnicians = () => { return of() };

  getTechnicianById = () => {};

  createTechnicians = jasmine.createSpy('TechnicianService.createTechnicians');

  updateTechnicians = () => {};

  deleteTechnicians = () => {};

  addTechnicianEdit = () => {};

  getTechnicianEdit = () => { return of() };

  sendClickCall = () => {};

  getClickCall = () => {};

}
