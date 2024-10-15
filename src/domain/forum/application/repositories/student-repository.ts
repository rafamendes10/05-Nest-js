import { Student } from '../../enterprise/entities/student'

export abstract class StudentRepository {
  abstract findByEmail(emial: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}
