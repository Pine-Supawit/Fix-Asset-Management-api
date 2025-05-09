import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoginDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

describe('UserService - login', () => {
  let service: UserService;
  let mockUserRepository: Partial<Repository<User>>;
  let mockJwtService: Partial<JwtService>;
  let mockConfigService: Partial<ConfigService>;

  const mockUser = {
    id: 1,
    username: 'admin',
    setRefreshToken: jest.fn(),
  } as unknown as User;

  beforeEach(async () => {
    mockUserRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn((payload: string | object | Buffer, options?: JwtSignOptions): string => {
        return options?.expiresIn === '7d' ? 'refresh-token' : 'access-token';
      }),
    };

    mockConfigService = {
      get: jest.fn().mockReturnValue('refresh-secret'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should throw NotFoundException if user does not exist', async () => {
    (mockUserRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      service.login({ username: 'wrong-user', password: '1234' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return access and refresh tokens when login is successful', async () => {
    (mockUserRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
    (mockUserRepository.save as jest.Mock).mockResolvedValue(true);

    const result = await service.login({ username: 'admin', password: '1234' });

    expect(result).toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    expect(mockJwtService.sign).toHaveBeenCalledWith(
      { username: 'admin', sub: 1 },
      { expiresIn: '2h' },
    );

    expect(mockJwtService.sign).toHaveBeenCalledWith(
      { username: 'admin', sub: 1 },
      { expiresIn: '7d', secret: 'refresh-secret' },
    );

    expect(mockUser.setRefreshToken).toHaveBeenCalledWith('refresh-token');
    expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);
  });
});
