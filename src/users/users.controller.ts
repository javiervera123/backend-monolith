import { Controller, Post, Get, Param, Logger, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        this.logger.log(`User created successfully: ${user.name}`);
        return {
            message: 'User created successfully',
            user: {
                id: user['_id'],
                name: user.name,
                email: user.email,
                roles: user.roles,
            }
        }

    }
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.usersService.findById(id);

    }
    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }
}
