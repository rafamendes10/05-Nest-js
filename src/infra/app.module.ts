import { AuthModule } from './auth/auth.module';
import { envSchema } from './env';
import { CreateAccountController } from './http/controllers/create-account.controller';
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthenticateController } from './http/controllers/authenticate.controller';
import { CreateQuestionController } from './http/controllers/create-question.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { FetchRecentQuestionsController } from './http/controllers/fetch-recent-questions.controller';
import { httpModule } from './http/http.module';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  }),
    AuthModule,
    httpModule,
  ]
})
export class AppModule { }