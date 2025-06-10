import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { cleanDatabase } from '../src/config/database.test.service';
import { User } from '@prisma/client';

describe('App (e2e)', () => {
  let app: INestApplication<App>;
  let token: string;
  let user: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const userRegister = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        name: 'Test',
        role: 'ADMIN',
        email: 'test@example.com',
        password: '123456',
      });

    user = userRegister.body;

    const res = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456',
    });

    token = res.body.token;
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Desk Create 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/desks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Desk Test',
        quantity: 2,
        status: 'AVAILABLE',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
  });

  it('Desk Create 400', async () => {
    const res = await request(app.getHttpServer())
      .post('/desks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Desk Test',
        quantity: '2',
        status: 'AVAILABLE',
      })
      .expect(400);

    expect(res.body).toHaveProperty('error');
  });

  it('Desk list 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/desks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveLength;
  });

  it('Desk Update 200', async () => {
    const created = await request(app.getHttpServer())
      .post('/desks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Desk Test',
        quantity: 1,
        status: 'AVAILABLE',
      })
      .expect(201);

    const deskId = created.body.id;

    const res = await request(app.getHttpServer())
      .put(`/desks/${deskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Desk Updated',
        quantity: 5,
        status: 'RESERVED',
      })
      .expect(200);

    expect(res.body.name).toBe('Desk Updated');
    expect(res.body.quantity).toBe(5);
  });

  it('Desk Update 400', async () => {
    const created = await request(app.getHttpServer())
      .post('/desks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Desk para Erro',
        quantity: 1,
        status: 'AVAILABLE',
      });

    const deskId = created.body.id;

    const res = await request(app.getHttpServer())
      .put(`/desks/${deskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 123,
        quantity: 'muito',
        status: 'FAKE',
      })
      .expect(400);

    expect(res.body).toHaveProperty('error');
  });
});
