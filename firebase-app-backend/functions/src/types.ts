export enum UserType {
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}

export enum LogType {
  NORMAL = "NORMAL",
  ABNORMAL = "ABNORMAL",
}
export interface User {
  type: UserType;
  phoneNumber: string;
  age?: number;
  fullName: string;
  email: string;
  id: string;
  assignedDoctorId?: string;
  deviceIdToken?: string;
}

export interface HealthLog {
  temperature?: number;
  bloodSugar?: number;
  oxygenSaturation?: number;
  heartBeat?: number;
  kickCount?: number;
  bloodPressure?: number;
  patientId: string;
  id: string;
  timestamp: string;
  type: LogType;
}
