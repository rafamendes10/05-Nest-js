import { DomainEvents } from '@/core/events/domain-events'
import { StudentRepository } from '@/domain/forum/application/repositories/student-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentRepository {
  public items: Student[] = []

  constructor() {}

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }


  
  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }

  
  
}
