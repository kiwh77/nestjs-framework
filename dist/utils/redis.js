"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisInstance = void 0;
const Redis = require("ioredis");
const log4js_1 = require("./log4js");
let n = 0;
const redisIndex = [];
const redisList = [];
class RedisInstance {
    static async initRedis(method, db = 0) {
        const isExist = redisIndex.some((x) => x === db);
        if (!isExist) {
            log4js_1.Logger.debug(`[Redis ${db}]来自 ${method} 方法调用, Redis 实例化了 ${++n} 次 `);
            redisList[db] = new Redis({
                port: Number(process.env.REDIS_PORT),
                host: process.env.REDIS_HOST,
                password: process.env.REDIS_PWD,
                ttl: Number(process.env.REDIS_TTL),
                db,
            });
            redisIndex.push(db);
        }
        else {
            log4js_1.Logger.debug(`[Redis ${db}]来自 ${method} 方法调用`);
        }
        return redisList[db];
    }
}
exports.RedisInstance = RedisInstance;
//# sourceMappingURL=redis.js.map