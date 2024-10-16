import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { z } from 'zod';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})
type AutheticatenBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AutheticatenBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password
    })
    
    if(result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}