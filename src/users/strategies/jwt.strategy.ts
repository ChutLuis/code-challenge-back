import {
    Injectable, UnauthorizedException
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { PassportStrategy } from '@nestjs/passport';
  import { ExtractJwt, Strategy } from 'passport-jwt';
  import { CreateUserDto } from '../dto/user.dto';
  import { JwtPayload } from '../interfaces/jwt-payload.interface';
  import { UsersService } from '../users.service';
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      ConfigService: ConfigService,
      private readonly authService: UsersService,
    ) {
      console.log(ConfigService.get('JWT_SECRET'))
      super({
        secretOrKey: ConfigService.get('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      });
    }
  
    async validate(payload: JwtPayload): Promise<CreateUserDto> {
      const {id} = payload
      const user = await this.authService.validateUser(id);
      if (user) return user
      else throw new UnauthorizedException
    }
  }
  