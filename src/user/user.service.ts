import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshDto } from './dto/refresh.dto';
import { LoginDto } from './dto/login-user.dto';
import { ForgetPasswordDto } from './dto/update-user.dto';
import { FindOneByEmpIdDto, FindUsersDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)
  constructor(
    @InjectRepository(User, 'off_pp')
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }
  async create(params: CreateUserDto) {
    try {
      const checkUser = await this.userRepository.findOne({
        where: { emp_id: params.emp_id }
      });

      if (checkUser) {
        throw new Error("Username already exists");
      }

      const user = new User();
      user.emp_id = params.emp_id;
      user.password = params.password;
      user.fname = params.fname;
      user.lname = params.lname;

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
          where: {
            emp_id: params.emp_id
          },
          skip: skip,
          take: limit,
          order: {
            emp_id: 'ASC'
          }
        });
        this.logger.debug(`[find-all-users]: ${JSON.stringify(users)}`);
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
        this.logger.debug(`[find-all-users]: ${JSON.stringify(users)}`);
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


  async findOneByUsername(params: FindOneByEmpIdDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          emp_id: params.emp_id
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
          emp_id: params.emp_id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcrypt.hash(params.newPassword, 10);

      await this.userRepository.update(user.id, {
        password: hashedPassword,
      });
      this.logger.debug(`[update-password]: ${JSON.stringify(user)}`);
      return {
        message: 'Password updated successfully',
        status: 200,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update password');
    }
  }

  async remove(params: FindOneByEmpIdDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          emp_id: params.emp_id,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepository.delete(user.id);
      this.logger.debug(`[delete-user]: ${JSON.stringify(user)}`);

      return {
        message: 'User deleted successfully',
        status: 200,
      };
    } catch (error) {
      this.logger.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }


  async validateUser(emp_id: string, pass: string) {
    const user = await this.findOneByUsername({ emp_id });
    if (user && (await bcrypt.compare(pass, user.data.password))) {
      const { password, ...result } = user.data;
      return result;
    }
    return null;
  }

  async login(params: LoginDto) {
    const user = await this.userRepository.findOne({ where: { emp_id: params.emp_id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(params.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { emp_id: user.emp_id, sub: user.id };

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
      accessToken,
      refreshToken,
    };
  }

  async logout(params: RefreshDto) {
    try {
      const payload = this.jwtService.verify(params.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) throw new NotFoundException('User not found');

      const isValid = await user.compareRefreshToken(params.refreshToken);
      if (!isValid) throw new UnauthorizedException('Invalid refresh token');

      user.refreshToken = '';
      await this.userRepository.save(user);

      this.logger.warn(`[logout]: emp_id ${JSON.stringify(user.emp_id)}`);
      return { status: 200, message: 'Logout successful' };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to logout');
    }
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
        { emp_id: user.emp_id, sub: user.id },
        { expiresIn: '15m' },
      );
      this.logger.warn(`[refresh-token]: emp_id ${JSON.stringify(user.emp_id)}`);
      return { accessToken: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }

}
