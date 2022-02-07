// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

//components
import { AppComponent } from './app.component';
import { FormTechnicianComponent } from './components/technician/components/form-technician/form-technician.component';
import { TechnicianComponent } from './components/technician/technician.component';
import { ListTechniciansComponent } from './components/technician/components/list-technicians/list-technicians.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { FormAppointmentComponent } from './components/appointment/components/form-appointment/form-appointment.component';
import { ListAppointmentsComponent } from './components/appointment/components/list-appointments/list-appointments.component';
import { HoursWorkedComponent } from './components/calculator/hours-worked/hours-worked.component';
import { ListAppointmentsCalculatorComponent } from './components/calculator/list-appointments-calculator/list-appointments-calculator.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    FormTechnicianComponent,
    TechnicianComponent,
    ListTechniciansComponent,
    AppointmentComponent,
    FormAppointmentComponent,
    ListAppointmentsComponent,
    CalculatorComponent,
    HoursWorkedComponent,
    ListAppointmentsCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
