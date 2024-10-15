import { Question } from "@/domain/forum/enterprise/entities/question";

export class QuestionPresenter{
  static toHTTP(question: Question) {
    return {
      id: question.id,
      title: question.title,
      content: question.content,
      slug: question.slug,
      bestAnswerId: question.bestAnswerId,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }

}