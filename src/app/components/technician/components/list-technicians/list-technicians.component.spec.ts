import { TechnicianModel } from './../../../../shared/models/technician';
import { TechnicianService } from 'src/app/shared/services/technician-service/technician.service';
import {
  ComponentFixture,
  inject,
  TestBed,
  async,
} from '@angular/core/testing';

import { ListTechniciansComponent } from './list-technicians.component';
import { of } from 'rxjs';

describe('ListTechniciansComponent', () => {
  let component: ListTechniciansComponent;
  let fixture: ComponentFixture<ListTechniciansComponent>;
  let technicianService;
  let listTechnicianComponent;
  let element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTechniciansComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTechniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([TechnicianService], (s) => {
    technicianService = s;
    fixture = TestBed.createComponent(ListTechniciansComponent);
    listTechnicianComponent = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call getTechnicians and return list of technicians', async(() => {
    const response: TechnicianModel[] = [];

    spyOn(technicianService, 'getTechnicians').and.returnValue(of(response));

    listTechnicianComponent.getTechnicians();

    fixture.detectChanges();

    expect(listTechnicianComponent.listTechnicians).toEqual(response);
  }));

  it('Should call getTechnicianById and return list of technicians', async(() => {
    const response: TechnicianModel[] = [];

    spyOn(technicianService, 'getTechnicianById').and.returnValue(of(response));

    listTechnicianComponent.getTechnicianById();

    fixture.detectChanges();

    expect(listTechnicianComponent.listTechnicians).toEqual(response);
  }));

  it('Should call deleteTechnicians and return list of technicians', async(() => {
    const response: TechnicianModel[] = [];

    spyOn(technicianService, 'deleteTechnicians').and.returnValue(of(response));

    listTechnicianComponent.deleteTechnician();

    fixture.detectChanges();

    expect(listTechnicianComponent.listTechnicians).toEqual(response);
  }));
});
