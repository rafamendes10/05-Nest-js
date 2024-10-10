import { NestApplication } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { AppModule } from "@/infra/app.module"
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt';

describe('fetch recent questions', () => {

  let prisma: PrismaService
  let app: NestApplication
  let jwt: JwtService

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    jwt = moduleRef.get(JwtService);

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: "Rafael Mendes",
        email: "rafamendesmorais123@gmail.com",
        password: '123456'
      }
    })

    await prisma.question.createMany({
      data: [
        {
          title: 'New Question1',
          content: 'Question Content',
          slug: 'New Question1',
          authorId: user.id,
        },
        {
          title: 'New Question2',
          content: 'Question Content',
          slug: 'New Question2',
          authorId: user.id,
        }
      ]
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'New Question1' }),
        expect.objectContaining({ title: 'New Question2' })
      ]

    })
  })
})