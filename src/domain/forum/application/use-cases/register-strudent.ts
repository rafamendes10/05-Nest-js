import { Injectable } from '@nestjs/common';
import { Student } from '../../enterprise/entities/student';
import { HashGenerator } from '../cryptography/hash-generator';
import { StudentRepository } from '../repositories/student-repository';
import { Either, left, right } from './../../../../core/either';
import { StudentAlreadyExistsError } from './errors/student-already-exists-error';

export interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<StudentAlreadyExistsError, {
  student: Student
}>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute ({
    name,
    email,
    password
  }: RegisterStudentUseCaseRequest ): Promise<RegisterStudentUseCaseResponse> {
    
    const ifStudentExists = await this.studentsRepository.findByEmail(email)

    if(ifStudentExists) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword
    })

    await this.studentsRepository.create(student)

    return right({
      student
    })
  }

}
