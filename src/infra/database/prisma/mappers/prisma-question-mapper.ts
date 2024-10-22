import { UniqueEntityID } from './../../../../core/entities/unique-entity-id';
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { Prisma, Question as QuestionPrisma } from "@prisma/client";


export class PrismaQuestionMapper {
  static toDomain(raw: QuestionPrisma): Question{ 
    return Question.create({
      title: raw.title,
      content: raw.content,
      createdAt: raw.createdAt,
      authorId: new UniqueEntityID(raw.authorId),
      bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.bestAnswerId) : null,
      slug: Slug.create(raw.slug),
      updatedAt: raw.updatedAT
    })
  }


  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput{
    return {
      id: question.id.toString(),
      title: question.title,
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAT: question.updatedAt
    }
  }
}