// here, put all characteristic of the technician
export interface AppointmentModel {
  appointmentId?: string;
  technicianId: string;
  serviceId: string;
  serviceStarted: string;
  serviceFinished: string;
}
