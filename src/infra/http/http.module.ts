import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { JwtStrategy } from "../auth/jwt.strategy";
import { DatabaseModule } from "../database/database.module";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student";

@Module({
  imports:[
    DatabaseModule, CryptographyModule
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController
  ],
  providers: [
    PrismaService,
    JwtStrategy,
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase
  ]
})

export class httpModule { }