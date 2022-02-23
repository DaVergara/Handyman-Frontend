import { AppointmentModel } from './../models/appointment';

export const createAppointmentEmptyMock: AppointmentModel = {
  appointmentId: '',
  technicianId: '',
  serviceId: '',
  serviceStarted: '',
  serviceFinished: '',
}

export const createAppointmentValidMock: AppointmentModel = {
  appointmentId: '',
  technicianId: '1036671649',
  serviceId: 'REPARACION',
  serviceStarted: '2022-02-27T01:00:00',
  serviceFinished: '2022-02-27T23:00:00',
}

export const editAppointmentEmptyMock: AppointmentModel = {
  appointmentId: '',
  technicianId: '',
  serviceId: '',
  serviceStarted: '',
  serviceFinished: '',
}

export const editAppointmentValidMock: AppointmentModel = {
  appointmentId: 'rwH0nuu0',
  technicianId: '1036671649',
  serviceId: 'REPARACION',
  serviceStarted: '2022-02-27T01:00:00',
  serviceFinished: '2022-02-27T23:00:00',
}
