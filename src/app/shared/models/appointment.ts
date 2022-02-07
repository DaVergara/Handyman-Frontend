import { Timestamp } from "rxjs";

// here, put all characteristic of the technician
export interface AppointmentModel {
  technicianId: string;
  serviceId?: string;
  serviceStarted: string;
  serviceFinished: string;
}
