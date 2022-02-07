import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentsCalculatorComponent } from './list-appointments-calculator.component';

describe('ListAppointmentsCalculatorComponent', () => {
  let component: ListAppointmentsCalculatorComponent;
  let fixture: ComponentFixture<ListAppointmentsCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentsCalculatorComponent ]
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
});
