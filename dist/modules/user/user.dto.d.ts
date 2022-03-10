import { User } from './user.entity';
export declare class IdDTO {
    id: string;
}
export declare class UserListDTO {
    id?: string;
    name?: string;
    phone?: string;
    page?: number;
    limit?: number;
    skip?: number;
}
export declare class UserSelectDTO {
    select?: Array<keyof User>;
}
export declare class UserInfoDTO extends IdDTO {
}
export declare class BaseUserInfoDTO {
    name: string;
    email: string;
    role: string;
    headImg: string;
    remark: string;
}
export declare enum CAN_CREATE_ROLE {
    DEVELOPER = "developer",
    ADMIN = "admin"
}
export declare class UserCreateDTO extends BaseUserInfoDTO {
    role: string;
    phone: string;
    password: string;
}
export declare class UserUpdateDTO extends BaseUserInfoDTO {
    status?: number;
}
export declare class UserDestroyDTO extends IdDTO {
}
