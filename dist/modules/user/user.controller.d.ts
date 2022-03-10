import { UserCreateDTO, UserDestroyDTO, UserInfoDTO, UserListDTO, UserUpdateDTO } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    index(params: UserListDTO): Promise<[import("./user.entity").User[], number]>;
    info(params: UserInfoDTO): Promise<import("./user.entity").User>;
    create(params: UserCreateDTO): Promise<UserCreateDTO & import("./user.entity").User>;
    update(where: UserInfoDTO, params: UserUpdateDTO): Promise<number>;
    destroy(params: UserDestroyDTO): Promise<number>;
}
