import { makeAnswer } from 'test/factories/make-answer';
import { Either, left, right } from "@/core/either"
import { CredentialDoesntMatchError } from "./errors/credential-doesnt-match-error"
import { StudentRepository } from "../repositories/student-repository"
import { HashComparer } from "../cryptography/hash-comparer"
import { Student } from '../../enterprise/entities/student';
import { Question } from '../../enterprise/entities/question';
import { Encrypter } from '../cryptography/encrypter';
import { Inject, Injectable } from '@nestjs/common';

export interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}


type AuthenticateStudentUseCaseResponse = Either<CredentialDoesntMatchError, {
  accessToken: string
}>

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter
  ) { }

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {


    const student = await this.studentRepository.findByEmail(email)

    if (!student) {
      return left(new CredentialDoesntMatchError())
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      student.password)

      if(isPasswordValid) {
        return left(new CredentialDoesntMatchError())
      }

      const accessToken = await this.encrypter.encrypt({ sub: student.id })

      return right({
        accessToken
      })

  }
}