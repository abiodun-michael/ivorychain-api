import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAuthService } from 'src/users/auth/user-auth.service';


@Injectable()
export class UserLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userAuthService: UserAuthService) {
    super({
      usernameField:'email'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userAuthService.validate(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}