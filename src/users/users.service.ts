import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}

  private getToken(userEmail: String) {
    const secret = this.config.get('JWT_SECRET')

    console.log(secret)
    
    return this.jwtService.sign({ id: userEmail },{
      expiresIn: '15m',
      secret: secret,
    },);
  }

  async logIn(data: { email: string; password: string }): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
        deletedAt: null,
      },
    });

    if (!user) throw new UnauthorizedException('User does not exist.');

    const pwMatch = await argon.verify(user.password, data.password);

    if (!pwMatch) throw new UnauthorizedException('Incorrect Password');

    const token = this.getToken(user.email);
    return { userId: user.id, jwt: token };
  }

  async signUp(data: CreateUserDto) {
    const hash = await argon.hash(data.password);
    data.password = hash;
    try {
      const User = await this.prisma.user.create({
        data,
      });
      const jwtReturn = {
        userId: User.id,
        jwt: this.getToken(User.email),
      };
      return jwtReturn;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  async validateUser(email: string): Promise<CreateUserDto> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: email, deletedAt: null },
    });

    delete user.password;

    return user;
  }

  revalidateUser(user: CreateUserDto): User {
    const token = this.getToken(user.email);

    return { userId: user.email, jwt: token };
  }
}
