import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerCommentRepository } from "./prisma/repositories/prisma-answer-comment-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaQuestionsAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionCommentRepository } from "./prisma/repositories/prisma-question-comment-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";

@Module({
  providers: [
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswersRepository,
    PrismaQuestionsAttachmentsRepository,
    PrismaQuestionCommentRepository,
    PrismaQuestionsRepository,
    PrismaService
  ],
  exports: [
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswersRepository,
    PrismaQuestionsAttachmentsRepository,
    PrismaQuestionCommentRepository,
    PrismaQuestionsRepository,
    PrismaService
  ]
})

export class DatabaseModule { }