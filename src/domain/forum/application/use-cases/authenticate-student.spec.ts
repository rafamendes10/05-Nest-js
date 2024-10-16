import { AuthenticateStudentUseCase } from './authenticate-student';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { makeStudent } from 'test/factories/make-student';

let inMemoryStudentRepository: InMemoryStudentsRepository
let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHasher
let sut: AuthenticateStudentUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(inMemoryStudentRepository, fakeHasher, fakeEncrypter)
  })

  it('should be able to create a question', async () => {
    const student = makeStudent({
      email: 'rafamendes@example.com',
      password: await fakeHasher.hash('123456')
    })



    await inMemoryStudentRepository.create(student)

    const result = await sut.execute({
      email: 'rafamendes@example.com',
      password: '123456'
    })


    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String)
    })
  })
})
