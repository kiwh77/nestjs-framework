import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  UserCreateDTO,
  UserInfoDTO,
  UserListDTO,
  UserUpdateDTO,
} from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async index(params: UserListDTO) {
    const { page, skip, limit, name, phone, ...other } = params;

    const where: { [k in keyof User]?: any } = { ...other };
    if (name) where.name = Like(`%${name}%`);
    if (phone) where.phone = Like(`%${phone}%`);

    return await this.userRepo.findAndCount({
      where,
      skip,
      take: limit,
      order: { createTime: 'DESC' },
    });
  }

  async info(where: UserInfoDTO) {
    const user = await this.userRepo.findOne(where);
    return user;
  }

  async create(params: UserCreateDTO) {
    const user = await this.userRepo.save(params);
    return user;
  }

  async update(where: UserInfoDTO, params: UserUpdateDTO) {
    const user = await this.userRepo.find({ where });
    if (!user) throw new HttpException('用户不存在', 500);

    const { affected } = await this.userRepo.update(where, params);
    return affected;
  }

  async destroy(where: UserInfoDTO) {
    const { affected } = await this.userRepo.delete(where);
    return affected;
  }
}
