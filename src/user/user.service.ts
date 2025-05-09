import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { FindOneByUsernameDto, FindUsersDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshDto } from './dto/refresh.dto';
import { LoginDto } from './dto/login-user.dto';
import { ForgetPasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }
  async create(params: CreateUserDto) {
    try {
      const checkUser = await this.userRepository.findOne({
        where: { username: params.username }
      });

      if (checkUser) {
        throw new Error("Username already exists");
      }

      const user = new User();
      user.id = randomUUID();
      user.username = params.username;
      user.password = params.password;
      user.phone = params.phone;

      await this.userRepository.save(user);

      this.logger.debug(`[create-user]: ${JSON.stringify(user)}`);

      return {
        data: user,
        status: 201,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }


  async findAll(params: FindUsersDto) {
    try {
      if (params.page && params.limit) {
        const page = params.page;
        const limit = params.limit;
        const skip = (page - 1) * limit;

        const [users, total] = await this.userRepository.findAndCount({
          skip,
          take: limit,
        });

        return {
          data: users,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total: total
          },
          status: 200,
        };
      } else {
        const users = await this.userRepository.find();
        return {
          data: users,
          status: 200,
        };
      }

    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }


  async findOneByUsername(params: FindOneByUsernameDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: params.username
        }
      })
      if (!user) {
        throw new NotFoundException('User not found')
      }
      this.logger.debug(`[find-one-user]: ${JSON.stringify(user)}`)
      return {
        data: user,
        status: 200
      }
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async forgotPassword(params: ForgetPasswordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: params.username,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcrypt.hash(params.newPassword, 10);

      await this.userRepository.update(user.id, {
        password: hashedPassword,
      });

      return {
        message: 'Password updated successfully',
        status: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update password');
    }
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateUser(username: string, pass: string) {
    const user = await this.findOneByUsername({ username });
    if (user && (await bcrypt.compare(pass, user.data.password))) {
      const { password, ...result } = user.data;
      return result;
    }
    return null;
  }

  async login(params: LoginDto) {
    const user = await this.userRepository.findOne({ where: { username: params.username } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    await user.setRefreshToken(refreshToken);
    await this.userRepository.save(user);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refresh(params: RefreshDto) {
    try {
      const payload = this.jwtService.verify(params.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) throw new NotFoundException('User not found');

      const isValid = await user.compareRefreshToken(params.refreshToken);
      if (!isValid) throw new UnauthorizedException('Invalid refresh token');

      const newAccessToken = this.jwtService.sign(
        { username: user.username, sub: user.id },
        { expiresIn: '15m' },
      );

      return { access_token: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }

}
