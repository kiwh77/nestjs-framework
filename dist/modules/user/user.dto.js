"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDestroyDTO = exports.UserUpdateDTO = exports.UserCreateDTO = exports.CAN_CREATE_ROLE = exports.BaseUserInfoDTO = exports.UserInfoDTO = exports.UserSelectDTO = exports.UserListDTO = exports.IdDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class IdDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'id',
    }),
    (0, class_validator_1.IsString)({
        message: 'id不能为空',
    }),
    __metadata("design:type", String)
], IdDTO.prototype, "id", void 0);
exports.IdDTO = IdDTO;
class UserListDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'id',
    }),
    __metadata("design:type", String)
], UserListDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '名称',
    }),
    __metadata("design:type", String)
], UserListDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '手机号码',
    }),
    __metadata("design:type", String)
], UserListDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        required: false,
        default: 1,
        description: '当前页',
    }),
    __metadata("design:type", Number)
], UserListDTO.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        required: false,
        default: 10,
        description: '每页数量',
    }),
    __metadata("design:type", Number)
], UserListDTO.prototype, "limit", void 0);
exports.UserListDTO = UserListDTO;
class UserSelectDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        required: false,
        description: '返回字段选择，用逗号隔开',
    }),
    __metadata("design:type", Array)
], UserSelectDTO.prototype, "select", void 0);
exports.UserSelectDTO = UserSelectDTO;
class UserInfoDTO extends IdDTO {
}
exports.UserInfoDTO = UserInfoDTO;
class BaseUserInfoDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '用户名，不输入将自动生成临时名称',
    }),
    __metadata("design:type", String)
], BaseUserInfoDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '邮箱',
    }),
    __metadata("design:type", String)
], BaseUserInfoDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '角色',
    }),
    __metadata("design:type", String)
], BaseUserInfoDTO.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '头像，不输入将取默认',
    }),
    __metadata("design:type", String)
], BaseUserInfoDTO.prototype, "headImg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '备注',
    }),
    __metadata("design:type", String)
], BaseUserInfoDTO.prototype, "remark", void 0);
exports.BaseUserInfoDTO = BaseUserInfoDTO;
var CAN_CREATE_ROLE;
(function (CAN_CREATE_ROLE) {
    CAN_CREATE_ROLE["DEVELOPER"] = "developer";
    CAN_CREATE_ROLE["ADMIN"] = "admin";
})(CAN_CREATE_ROLE = exports.CAN_CREATE_ROLE || (exports.CAN_CREATE_ROLE = {}));
class UserCreateDTO extends BaseUserInfoDTO {
}
__decorate([
    (0, class_validator_1.IsEnum)(CAN_CREATE_ROLE, {
        message: '请输入允许范围内角色',
    }),
    (0, class_validator_1.IsString)({
        message: '角色不能为空',
    }),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '手机号码',
    }),
    (0, class_validator_1.IsPhoneNumber)('CN', {
        message: '请输入正确的手机号码',
    }),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '密码',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDTO.prototype, "password", void 0);
exports.UserCreateDTO = UserCreateDTO;
class UserUpdateDTO extends BaseUserInfoDTO {
}
exports.UserUpdateDTO = UserUpdateDTO;
class UserDestroyDTO extends IdDTO {
}
exports.UserDestroyDTO = UserDestroyDTO;
//# sourceMappingURL=user.dto.js.map