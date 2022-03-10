import { IsString, IsPhoneNumber, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

export class IdDTO {
  @ApiProperty({
    required: true,
    description: 'id',
  })
  @IsString({
    message: 'id不能为空',
  })
  id: string;
}

export class UserListDTO {
  @ApiProperty({
    required: false,
    description: 'id',
  })
  id?: string;

  @ApiProperty({
    required: false,
    description: '名称',
  })
  name?: string;

  @ApiProperty({
    required: false,
    description: '手机号码',
  })
  phone?: string;

  @ApiProperty({
    type: Number,
    required: false,
    default: 1,
    description: '当前页',
  })
  page?: number;

  @ApiProperty({
    type: Number,
    required: false,
    default: 10,
    description: '每页数量',
  })
  limit?: number;

  skip?: number;
}

export class UserSelectDTO {
  @ApiProperty({
    type: String,
    required: false,
    description: '返回字段选择，用逗号隔开',
  })
  select?: Array<keyof User>;
}

export class UserInfoDTO extends IdDTO {}

export class BaseUserInfoDTO {
  @ApiProperty({
    required: false,
    description: '用户名，不输入将自动生成临时名称',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: '邮箱',
  })
  email: string;

  @ApiProperty({
    required: false,
    description: '角色',
  })
  role: string;

  @ApiProperty({
    required: false,
    description: '头像，不输入将取默认',
  })
  headImg: string;

  @ApiProperty({
    required: false,
    description: '备注',
  })
  remark: string;
}

/** 能创建用户的角色 */
export enum CAN_CREATE_ROLE {
  /** 开发人员 */
  DEVELOPER = 'developer',
  /** 管理 */
  ADMIN = 'admin',
}

export class UserCreateDTO extends BaseUserInfoDTO {
  @IsEnum(CAN_CREATE_ROLE, {
    message: '请输入允许范围内角色',
  })
  @IsString({
    message: '角色不能为空',
  })
  role: string;

  @ApiProperty({
    required: true,
    description: '手机号码',
  })
  @IsPhoneNumber('CN', {
    message: '请输入正确的手机号码',
  })
  phone: string;

  @ApiProperty({
    description: '密码',
  })
  @IsString()
  password: string;
}

export class UserUpdateDTO extends BaseUserInfoDTO {
  status?: number;
}

export class UserDestroyDTO extends IdDTO {}
