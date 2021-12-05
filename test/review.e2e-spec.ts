import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { REVIEW_NOT_MUST_BE_LESS_ONE } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
  login: 'user',
  password: 'user@user.com',
};

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Hello!',
  description: 'Hi everyone! :)',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/sign_in')
      .send(loginDto);
    token = body.access_token;
  });

  it('/review/create (POST) - succeed', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/review/create (POST) - failed', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400)
      .then(({ body }: request.Response) => {
        expect(body.message[0]).toBe(REVIEW_NOT_MUST_BE_LESS_ONE);
      });
  });

  it('/review/by_product/:productId (GET) - succeed', async () =>
    request(app.getHttpServer())
      .get(`/review/by_product/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        expect(body[0]._id).toEqual(createdId);
      }));

  it('/review/by_product/:productId (GET) - failed', async () =>
    request(app.getHttpServer())
      .get(`/review/by_product/${new Types.ObjectId().toHexString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
        expect(body[0]).not.toBeDefined();
      }));

  it('/review/:id (DELETE) - succeed', () =>
    request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200));

  it('/review/:id (DELETE) - failed', () =>
    request(app.getHttpServer())
      .delete(`/review/${new Types.ObjectId().toHexString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404));

  afterAll(() => {
    disconnect();
  });
});
