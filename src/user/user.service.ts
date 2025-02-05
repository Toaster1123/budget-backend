import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser) throw new BadRequestException('Email already exist');

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
      },
    });

    const token = this.jwtService.sign({ email: user.email });

    return { user, token };
  }

  async findOne(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
