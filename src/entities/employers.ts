export type Doctor = {
  id: number
  name: string
  middleName: string
  lastName: string
  department: Department
  role: DoctorRole
  isHead: boolean
}

export type Nurse = {
  id: number
  name: string
  middleName: string
  lastName: string
  department: Department
  role: NurseRole
}

export type Department = 'hirurg' | 'cardio'
export const Departments: Department[] = ['hirurg', 'cardio'] as const

export type DoctorRole = 'DOCTOR'
export type NurseRole = 'NURSE'
export type EmployeeRole = DoctorRole | NurseRole

export type BaseEmpoloyee = {
  id: number
  name: string
  middleName: string
  lastName: string
}
