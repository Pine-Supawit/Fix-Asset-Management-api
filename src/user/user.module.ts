import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/common/utils/strategies/jwt.strategy';
import { LocalStrategy } from 'src/common/utils/strategies/local.strategy';
import { Log } from 'src/log/entities/log.entity';
import { LogService } from 'src/log/log.service';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'off_pp'), JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '6h' },
    }),
    inject: [ConfigService],
  }),
  TypeOrmModule.forFeature([Log], 'off_pp'),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, LocalStrategy, LogService],
})
export class UserModule { }
