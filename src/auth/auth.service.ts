import * as argon2 from 'argon2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (user === null) {
      return;
    }
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (user && isPasswordMatch) {
      return user;
    }
    return new UnauthorizedException('Email or password are incorect');
  }

  login(user: IUser) {
    const { id, email } = user;
    return {
      ...user,
      token: this.jwtService.sign({ id, email }),
    };
  }
}
