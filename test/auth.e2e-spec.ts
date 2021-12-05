import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
  login: 'user',
  password: 'user@user.com',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/sign_up (POST) - succeed', async () => {
    return request(app.getHttpServer())
      .post('/auth/sign_in')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        const accessToken = body.access_token;
        expect(accessToken).toBeDefined();
      });
  });

  it('/auth/sign_up (POST) - failed password', async () => {
    return request(app.getHttpServer())
      .post('/auth/sign_in')
      .send({ ...loginDto, password: 'user' })
      .expect(401, {
        statusCode: 401,
        message: WRONG_PASSWORD,
        error: 'Unauthorized',
      });
  });

  it('/auth/sign_up (POST) - failed login', async () => {
    return request(app.getHttpServer())
      .post('/auth/sign_in')
      .send({ ...loginDto, login: 'user1' })
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND,
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
