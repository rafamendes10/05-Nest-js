import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { PrismaService } from '../../prisma/prisma.service';
import { Body, ConflictException, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common"
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string()
})
type AutheticatenBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AutheticatenBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })
    if (!user) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      throw new UnauthorizedException('User credentials do not match')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    return {
      access_token: accessToken,
    }
  }
}