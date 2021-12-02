import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  const exec = {
    exec: jest.fn(),
  };
  const reviewFactory = () => ({
    find: () => exec,
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { useFactory: reviewFactory, provide: getModelToken('ReviewModel') },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId should be work', async () => {
    const productId = new Types.ObjectId().toHexString();
    reviewFactory().find().exec.mockReturnValueOnce([{ productId }]);
    const res = await service.findByProductId(productId);
    expect(res[0].productId).toBe(productId);
  });
});
