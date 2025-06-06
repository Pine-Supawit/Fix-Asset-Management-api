import { Injectable, Logger } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);
  constructor(
    @InjectRepository(Log, 'off_pp')
    private readonly logRepository: Repository<Log>,
  ) { }
  create(createLogDto: CreateLogDto) {
    try {
      this.logger.debug(`[create-log]: ${JSON.stringify(createLogDto)}`);
      const log = {
        emp_id: createLogDto.emp_id,
        login_time: createLogDto.login_time,
      }
      const newLog = this.logRepository.create(log);
      this.logRepository.save(newLog);
      this.logger.debug(`[create-log]: ${JSON.stringify(newLog)}`);
    } catch (error) {
      this.logger.error(`Error creating log: ${error.message}`);
      throw new Error(`Error creating log: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
