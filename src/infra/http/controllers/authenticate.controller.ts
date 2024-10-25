import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { z } from 'zod';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { CredentialDoesntMatchError } from '@/domain/forum/application/use-cases/errors/credential-doesnt-match-error';
import { Public } from '@/infra/auth/public';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})
type AutheticatenBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
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

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CredentialDoesntMatchError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value
    console.log(accessToken)

    return {
      access_token: accessToken,
    }
  }
}