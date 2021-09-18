import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { USER_REPOSITORY } from '../core/constants/constants';
import { ExceptionsErrors } from '../utils/errors/exceptionsErros';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<any> {
    try {
      const findAll = await this.userRepository.findAll({
        attributes: { exclude: ['password'] },
      });
      if (!findAll) {
        throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);
      }

      await this.cacheManager.set('users', findAll);
      return findAll;
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  async findOne(uuid: string): Promise<any> {
    try {
      const findOneUser = await this.userRepository.findOne({
        where: { uuid },
        attributes: { exclude: ['password'] },
      });
      if (findOneUser) {
        return findOneUser;
      }
      throw {
        status: 404,
        message: 'User Not Found!',
      };
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne<User>({
        where: { email },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  async findOneById(uuid: string): Promise<User> {
    try {
      return await this.userRepository.findOne<User>({
        where: { uuid },
        attributes: { exclude: ['password', 'email'] },
      });
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.userRepository.findOne({ where: { uuid } });
      if (findUser) {
        await this.userRepository.update(
          { ...updateUserDto },
          { where: { uuid }, returning: true },
        );
        return await this.userRepository.findOne({
          where: { uuid },
          attributes: { exclude: ['password'] },
        });
      }
      throw {
        status: 404,
        message: 'User Not Found!',
      };
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }

  async remove(uuid: string) {
    try {
      const findUser = await this.userRepository.findOne({ where: { uuid } });
      if (!findUser) {
        throw {
          status: 404,
          message: 'User not found!',
        };
      }
      await this.userRepository.destroy<User>({ where: { uuid } });
      return 'User Deleted Success!';
    } catch (error) {
      throw new ExceptionsErrors().errors(error);
    }
  }
}
