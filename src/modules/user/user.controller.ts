import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageInfo } from 'src/common/http.decorator';
import {
  UserCreateDTO,
  UserDestroyDTO,
  UserInfoDTO,
  UserListDTO,
  UserUpdateDTO,
} from './user.dto';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '查询用户列表',
  })
  @PageInfo()
  @Get()
  async index(@Query() params: UserListDTO) {
    return await this.userService.index(params);
  }

  @ApiOperation({
    summary: '查询用户详情',
  })
  @Get('/:id')
  async info(@Param() params: UserInfoDTO) {
    return await this.userService.info(params);
  }

  @ApiOperation({
    summary: '创建用户',
  })
  @Post()
  async create(@Body() params: UserCreateDTO) {
    return await this.userService.create(params);
  }

  @ApiOperation({
    summary: '更新用户信息',
  })
  @Put('/:id')
  async update(@Param() where: UserInfoDTO, @Body() params: UserUpdateDTO) {
    return await this.userService.update(where, params);
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Delete('/:id')
  async destroy(@Param() params: UserDestroyDTO) {
    return await this.userService.destroy(params);
  }
}
