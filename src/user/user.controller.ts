import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/common/utils/guard/local-auth.guard';
import { LoginDto } from './dto/login-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ForgetPasswordDto } from './dto/update-user.dto';
import { FindOneByEmpIdDto, FindUsersDto } from './dto/find-user.dto';

@ApiBearerAuth()
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Find user(s) in the system', description: 'Returns user(s) in the database' })
  findAll(@Query() body: FindUsersDto) {
    return this.userService.findAll(body);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create new user', description: 'Create new user that can login to the system' })
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user', description: 'Returns access token and refresh token' })
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Login user', description: 'Returns access token and refresh token' })
  async logout(@Body() body: RefreshDto) {
    return this.userService.logout(body);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Get refresh token if access token is expired', description: 'Returns new access token' })
  async refresh(@Body() body: RefreshDto) {
    return this.userService.refresh(body);
  }

  @Patch('forget-password')
  @ApiOperation({ summary: 'Forget password', description: 'Reset password if user forgot password' })
  update(@Body() body: ForgetPasswordDto) {
    return this.userService.forgotPassword(body);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user', description: 'Delete user from the system' })
  delete(@Body() body: FindOneByEmpIdDto) {
    return this.userService.remove(body);
  }
}
