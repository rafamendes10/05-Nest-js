import { StudentRepository } from '../../../../domain/forum/application/repositories/student-repository';
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";
import { PrismaStudentMapper } from '../mappers/prisma-students-mapper';
import { Student } from '@/domain/forum/enterprise/entities/student';

@Injectable()
export class PrismaStudentsRepository implements StudentRepository {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })
    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }


  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }
}