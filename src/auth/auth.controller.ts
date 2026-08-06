import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.validateUser(loginDto);
    }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
