import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { Prisma, User as PrismaUser } from "@prisma/client";


export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student{ 
    return Student.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
    },
    new UniqueEntityID(raw.id)
  )
  }


  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput{
    return {
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}