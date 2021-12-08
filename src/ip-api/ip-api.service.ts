import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {
  IP_API_QUERY_PARAMS,
  IP_API_URL,
  IP_IS_NOT_PROVIDED,
} from './ip-api.constants';
import { RootObject } from './ip-api.model';

@Injectable()
export class IpApiService {
  private token: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get('IP_TOKEN');
  }

  async getIpData(ip: string) {
    if (!ip) {
      throw new BadRequestException(IP_IS_NOT_PROVIDED);
    }
    try {
      const { data } = await this.httpService
        .get<RootObject>(`${IP_API_URL}/${ip}`, {
          params: IP_API_QUERY_PARAMS,
          headers: {
            'User-Agent': 'SimpleApi/1.0 (test@test.com)',
          },
        })
        .toPromise();
      return data;
    } catch (error) {
      Logger.error(error);
    }
  }
}
