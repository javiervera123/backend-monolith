import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

    async validateUser(loginDto: LoginDto): Promise<any> {
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user['_id'], roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user['_id'],
                name: user.name,
                email: user.email,
                roles: user.roles,
            }
        };
    }
}