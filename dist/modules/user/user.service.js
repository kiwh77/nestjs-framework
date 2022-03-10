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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async index(params) {
        const { page, skip, limit, name, phone } = params, other = __rest(params, ["page", "skip", "limit", "name", "phone"]);
        const where = Object.assign({}, other);
        if (name)
            where.name = (0, typeorm_2.Like)(`%${name}%`);
        if (phone)
            where.phone = (0, typeorm_2.Like)(`%${phone}%`);
        return await this.userRepo.findAndCount({
            where,
            skip,
            take: limit,
            order: { createTime: 'DESC' },
        });
    }
    async info(where) {
        const user = await this.userRepo.findOne(where);
        return user;
    }
    async create(params) {
        const user = await this.userRepo.save(params);
        return user;
    }
    async update(where, params) {
        const user = await this.userRepo.find({ where });
        if (!user)
            throw new common_1.HttpException('用户不存在', 500);
        const { affected } = await this.userRepo.update(where, params);
        return affected;
    }
    async destroy(where) {
        const { affected } = await this.userRepo.delete(where);
        return affected;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map