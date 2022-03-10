import { Repository } from 'typeorm';
import { UserCreateDTO, UserInfoDTO, UserListDTO, UserUpdateDTO } from './user.dto';
import { User } from './user.entity';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    index(params: UserListDTO): Promise<[User[], number]>;
    info(where: UserInfoDTO): Promise<User>;
    create(params: UserCreateDTO): Promise<UserCreateDTO & User>;
    update(where: UserInfoDTO, params: UserUpdateDTO): Promise<number>;
    destroy(where: UserInfoDTO): Promise<number>;
}
