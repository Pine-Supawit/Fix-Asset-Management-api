import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneByUsernameDto, FindUsersDto } from './dto/find-user.dto';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { LoginDto } from './dto/login-user.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshDto) {
    return this.userService.refresh(body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('find-many')
  findAll(@Query() body: FindUsersDto) {
    return this.userService.findAll(body);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('find-one')
  findOne(@Query() body: FindOneByUsernameDto) {
    return this.userService.findOneByUsername(body);
  }

  @Patch('update-one')
  update(@Body() body: UpdateUserDto) {
    return this.userService.forgotPassword(body)
  }
}
