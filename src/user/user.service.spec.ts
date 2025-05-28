import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Partial<Repository<User>>;
  let jwtService: Partial<JwtService>;
  let configService: Partial<ConfigService>;

  const mockUser: any = {
    id: 1,
    emp_id: '123456',
    password: bcrypt.hash('password', 10),
    setRefreshToken: jest.fn(),
    compareRefreshToken: jest.fn(),
  };

  beforeEach(async () => {
    userRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      findAndCount: jest.fn(),
      update: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(() => 'token'),
      verify: jest.fn().mockImplementation(<T extends object = any>(): T => ({ sub: 1 } as T)),
    };

    configService = {
      get: jest.fn(() => 'refresh-secret'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User, 'off_pp'), useValue: userRepository },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      (userRepository.save as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.create({
        emp_id: '123456',
        password: 'password',
        fname: 'John',
        lname: 'Doe',
      });

      expect(result.status).toBe(201);
      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should throw if user already exists', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      await expect(service.create({ emp_id: '123456', password: '123', fname: '', lname: '' }))
        .rejects.toThrow(Error);
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      (userRepository.findAndCount as jest.Mock).mockResolvedValue([[mockUser], 1]);

      const result = await service.findAll({ emp_id: '123456', page: 1, limit: 10 });
      expect(result.data).toEqual([mockUser]);
    });

    it('should return all users without pagination', async () => {
      (userRepository.find as jest.Mock).mockResolvedValue([mockUser]);
      const result = await service.findAll({ emp_id: '123456' });
      expect(result.data.length).toBe(1);
    });
  });

  describe('findOneByUsername', () => {
    it('should return user by emp_id', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      const result = await service.findOneByUsername({ emp_id: '123456' });
      expect(result.data).toEqual(mockUser);
    });

    it('should throw if user not found', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.findOneByUsername({ emp_id: 'nope' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('forgotPassword', () => {
    it('should update password', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      (userRepository.update as jest.Mock).mockResolvedValue({});

      const result = await service.forgotPassword({
        emp_id: '123456',
        newPassword: 'newpass',
      });
      expect(result.message).toBe('Password updated successfully');
    });
  });

  describe('remove', () => {
    it('should delete user', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      const result = await service.remove({ emp_id: '123456' });
      expect(result.status).toBe(200);
    });

    it('should throw if user not found', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.remove({ emp_id: 'nope' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('validateUser', () => {
    it('should return user data if valid', async () => {
      const hashed = await bcrypt.hash('password', 10);
      const userWithPassword = { ...mockUser, password: hashed };

      jest.spyOn(service, 'findOneByUsername').mockResolvedValue({ data: userWithPassword, status: 200 });

      const result = await service.validateUser('123456', 'password');
      expect(result).not.toBeNull();
      expect(result!.emp_id).toBe('123456');
    });

    it('should return null if password mismatch', async () => {
      const wrongUser = { ...mockUser, password: await bcrypt.hash('wrong', 10) };
      jest.spyOn(service, 'findOneByUsername').mockResolvedValue({ data: wrongUser, status: 200 });

      const result = await service.validateUser('123456', 'password');
      expect(result).toBe(null);
    });
  });

  describe('login', () => {
    it('should return tokens', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      (userRepository.save as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.login({ emp_id: '123456', password: 'password' });
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw on invalid user', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.login({ emp_id: 'nope', password: 'password' })).rejects.toThrow(NotFoundException);
    });

    it('should throw on wrong password', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.login({ emp_id: '123456', password: 'wrong' })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should clear refresh token', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      mockUser.compareRefreshToken.mockResolvedValue(true);

      const result = await service.logout({ refreshToken: 'valid-token' });
      expect(result.status).toBe(200);
    });
  });

  describe('refresh', () => {
    it('should return new access token', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      mockUser.compareRefreshToken.mockResolvedValue(true);

      const result = await service.refresh({ refreshToken: 'valid-token' });
      expect(result.accessToken).toBeDefined();
    });
  });
});
