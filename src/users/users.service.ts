import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../core/constants/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findOne(uuid: string): Promise<any> {
    const findOneUser = await this.userRepository.findOne({
      where: { uuid },
      attributes: { exclude: ['password'] },
    });
    if (findOneUser) {
      return findOneUser;
    }
    return {
      status: 404,
      message: 'User Not Found!',
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(uuid: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { uuid },
      attributes: { exclude: ['password', 'email'] },
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.userRepository.findOne({ where: { uuid } });
      if (findUser) {
        await this.userRepository.update(
          { ...updateUserDto },
          { where: { uuid }, returning: true },
        );
        return findUser;
      }
      return {
        status: 404,
        message: 'User Not Found!',
      };
    } catch (error) {
      return {
        status: 400,
        error: error.message,
      };
    }
  }

  async remove(uuid: string) {
    try {
      const findUser = await this.userRepository.findOne({ where: { uuid } });
      if (!findUser) {
        return {
          status: 404,
          message: 'User not found!',
        };
      }
      await this.userRepository.destroy<User>({ where: { uuid } });
      return 'User Deleted Success!';
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
