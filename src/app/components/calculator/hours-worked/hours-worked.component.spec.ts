import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursWorkedComponent } from './hours-worked.component';

describe('HoursWorkedComponent', () => {
  let component: HoursWorkedComponent;
  let fixture: ComponentFixture<HoursWorkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursWorkedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursWorkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
