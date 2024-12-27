export type Doctor = BaseEmployee & {
  department: Department
  role: DoctorRole
  isHead: boolean
}

export type FIO<T extends BaseEmployee> = Pick<
  T,
  'name' | 'middleName' | 'lastName'
>

export type DoctorFIO = FIO<Doctor>

export type NurseFIO = FIO<Nurse>

export type Nurse = BaseEmployee & {
  department: Department
  role: NurseRole
}

export type Department = 'hirurg' | 'cardio'
export const departments: Department[] = ['hirurg', 'cardio'] as const

export type DoctorRole = 'DOCTOR'
export type NurseRole = 'NURSE'
export type EmployeeRole = DoctorRole | NurseRole

export type BaseEmployee = {
  id: number
  name: string
  middleName: string
  lastName: string
}
