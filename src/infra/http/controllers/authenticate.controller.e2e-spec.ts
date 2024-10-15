import { NestApplication } from '@nestjs/core';
import { PrismaService } from '../../database/prisma/prisma.service';
import { AppModule } from "@/infra/app.module"
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs';

describe('authenticate a account', () => {

  let prisma: PrismaService
  let app: NestApplication

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: "Rafael Mendes Morais",
        email: "rafamendesmorais123@gmail.com",
        password: await hash('123456', 8)
      }
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: "rafamendesmorais123@gmail.com",
      password: '123456'
    })



    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String)
    })

  })

})
