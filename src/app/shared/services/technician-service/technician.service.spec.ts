import { TechnicianModel } from './../../models/technician';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TechnicianService } from './technician.service';
import { technicianValidMock } from '../../mocks/technician.mock';

fdescribe('TechnicianService', () => {
  let service: TechnicianService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TechnicianService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('[Method getTechnicians]', () => {
    it('Request should be GET and return all technicians', () => {
      const techniciansMock: TechnicianModel[] = [
        {
          technicianId: '1036671649',
          technicianName: 'David Alejandro',
          technicianLastName: 'Vergara Arango',
        },
        {
          technicianId: '1036671648',
          technicianName: 'Alejandro David',
          technicianLastName: 'Arango Vergara',
        },
      ];
      const url = 'http://localhost:8080/technicians';

      service.getTechnicians().subscribe({
        next: (techncians: TechnicianModel[]) => {
          expect(techncians).toEqual(techniciansMock);
        },
      });

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('GET');
      request.flush(techniciansMock);
    });
  });

  describe('[Method createTechnicians]', () => {
    it('Request should be POST and return body technician', () => {
      const technicianMock = {...technicianValidMock};
      const url = 'http://localhost:8080/technicians';

      service.createTechnicians(technicianMock).subscribe({
        next: (techncian: TechnicianModel) => {
          expect(techncian).toEqual(technicianMock);
        },
      });

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(technicianMock);
      request.flush(technicianMock);
    });
  });

  describe('[Method updateTechnicians]', () => {
    it('Request should be PUT and return body technician', () => {
      const technicianMock = {...technicianValidMock};
      const url = 'http://localhost:8080/technicians';

      service.updateTechnicians(technicianMock).subscribe({
        next: (techncian: TechnicianModel) => {
          expect(techncian).toEqual(technicianMock);
        },
      });

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toEqual(technicianMock);
      request.flush(technicianMock);
    });
  });

  describe('[Method deleteTechnicians]', () => {
    it('Request should be DELETE', () => {
      const technicianIdMock = '1036671649'
      const url = `http://localhost:8080/technicians/${technicianIdMock}`;

      service.deleteTechnicians(technicianIdMock).subscribe(
        () => {}
      );

      const request: TestRequest = httpMock.expectOne(url);
      expect(request.request.method).toBe('DELETE');
    });
  });
});
