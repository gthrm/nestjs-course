import { IsString } from 'class-validator';

export class IpTopPageDto {
  @IsString()
  ip: string;

  @IsString()
  service: string;
}
