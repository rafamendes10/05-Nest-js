import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { PrismaService } from '../../prisma/prisma.service';
import { Body, ConflictException, Controller, Post, UsePipes } from "@nestjs/common"
import { hash } from 'bcryptjs'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})
type createAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@UsePipes(new ZodValidationPipe(createAccountBodySchema))
export class CreateAccountController {
  constructor(
    private prisma: PrismaService) { }

  @Post()

  async handle(@Body() body: createAccountBodySchema) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with e-mail addres already exists'
      )
    }
    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    // const name = 'Jhon doe'
    // const email = 'johndoe@example.com'
    // const password = '12345'
  }
}