import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello People!';
  }
  getProfile(): string {
    return 'Profile';
  }
}
