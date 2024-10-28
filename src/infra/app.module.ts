import { AuthModule } from './auth/auth.module';
import { envSchema } from './env/env';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { httpModule } from './http/http.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  }),
    AuthModule,
    httpModule,
    EnvModule,
  ],
 
})
export class AppModule { }