import { errorGenericMsg } from 'src/app/shared/constants/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { TechnicianModel } from './../../../../shared/models/technician';
import { of, throwError } from 'rxjs';
import { technicianValidMock } from './../../../../shared/mocks/technician.mock';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TechnicianServiceMock } from './../../../../shared/mocks/technician-service.mock';
import { TechnicianService } from './../../../../shared/services/technician-service/technician.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechniciansComponent } from './list-technicians.component';

fdescribe('ListTechniciansComponent', () => {
  const technicianServiceMock = new TechnicianServiceMock();

  let component: ListTechniciansComponent;
  let fixture: ComponentFixture<ListTechniciansComponent>;

  let toastrMock: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    toastrMock = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
    ]);
    await TestBed.configureTestingModule({
      imports: [FormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
      declarations: [ListTechniciansComponent],
      providers: [
        { provide: TechnicianService, useValue: technicianServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const techniciansMock: TechnicianModel[] = [];
    fixture = TestBed.createComponent(ListTechniciansComponent);
    component = fixture.componentInstance;
    technicianServiceMock.getTechnicians.and.returnValue(of(techniciansMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Method getAllTechnicians]', () => {
    it('Get all technicianns succcess', () => {
      const techniciansMock: TechnicianModel[] = [
        { ...technicianValidMock },
        { ...technicianValidMock },
        { ...technicianValidMock },
      ];
      technicianServiceMock.getTechnicians.and.returnValue(of(techniciansMock));

      component.getAllTechnicians();

      expect(component.listTechnicians).toEqual(techniciansMock);
    });

    it('Get all technicianns failure', () => {
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Get Technicians Mock' },
        status: 400,
        statusText: 'Bad Request',
      });
      technicianServiceMock.getTechnicians.and.returnValue(
        throwError(() => new HttpErrorResponse(errorResponseMock))
      );

      component.getAllTechnicians();

      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Get Technicians Mock',
        errorGenericMsg
      );
    });
  });

  describe('[Method deleteTechnician]', () => {
    it('Delete technician success', () => {
      const technicianIdMock = '1036671649';
      technicianServiceMock.deleteTechnicians.and.returnValue(of('Success'));

      component.deleteTechnician(technicianIdMock);

      expect(toastrMock.success).toHaveBeenCalledWith('Tecnico Eliminado.');
    });

    it('Delete technciian failure', () => {
      const technicianIdMock = '';
      const errorResponseMock = new HttpErrorResponse({
        error: { code: '', message: 'Error Delete Technician Mock' },
        status: 400,
        statusText: 'Bad Request',
      });
      technicianServiceMock.deleteTechnicians.and.returnValue(
        throwError(() => new HttpErrorResponse(errorResponseMock))
      );

      component.deleteTechnician(technicianIdMock);

      expect(toastrMock.error).toHaveBeenCalledWith(
        'Error Delete Technician Mock',
        errorGenericMsg
      );
    });
  });
});
