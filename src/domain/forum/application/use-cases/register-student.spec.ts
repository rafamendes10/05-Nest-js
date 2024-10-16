import { FakeHasher } from './../../../../../test/cryptography/fake-hasher';
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator';
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { RegisterStudentUseCase } from './register-student'
import { makeAnswer } from 'test/factories/make-answer';
import { makeStudent } from 'test/factories/make-student';

let inMemoryStudentRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHasher)
  })

  it('should be able to register a student', async () => {
    const student = await sut.execute({
      name: 'Rafael Mendes',
      email: 'rafamendesmorais123@gmail.com',
      password: '123456'
    })

    expect(student.isRight()).toBe(true)
    expect(student.value).toEqual({
      student: inMemoryStudentRepository.items[0]
    })
  })

  it('should hash student password upon registration', async () => {
    const student = await sut.execute({
      name: 'Rafael Mendes',
      email: 'rafamendesmorais123@gmail.com',
      password: '123456'
    })

    const hashedPassword = await fakeHasher.hash('123456') 

    expect(inMemoryStudentRepository.items[0].password).toEqual(hashedPassword)
  })
})
