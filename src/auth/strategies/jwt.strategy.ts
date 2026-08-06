//extraer y validar el token en cada petición protegida:

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configservice: ConfigService) {
    
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configservice.get<string>('JWT_SECRET') || 'defaultSecret',
        });
    }
    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, roles: payload.roles };
    }
}