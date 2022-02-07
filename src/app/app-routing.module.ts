import { CalculatorComponent } from './components/calculator/calculator.component';
import { AppointmentComponent } from './components/appointment/appointment.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnicianComponent } from './components/technician/technician.component';

// here, put all routes that you need use.
const routes: Routes = [
  {path: '', redirectTo: 'technician', pathMatch: 'full'},
  {path: 'technician', component: TechnicianComponent},
  {path: 'appointment', component: AppointmentComponent},
  {path: 'calculator', component: CalculatorComponent},
  {path: '**', redirectTo: 'technician', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
