import { NestApplication } from '@nestjs/core';
import { PrismaService } from '../../database/prisma/prisma.service';
import { AppModule } from "@/infra/app.module"
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('create account', () => {

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

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: "Rafael Mendes Morais",
      email: "rafamendesmorais123@gmail.com",
      password: '123456'
    })

    expect(response.statusCode).toBe(201)

    const findUserOnDataBase = await prisma.user.findUnique({
      where: {
        email: "rafamendesmorais123@gmail.com"
      }
    })

    expect(findUserOnDataBase).toBeTruthy()

  })

})
