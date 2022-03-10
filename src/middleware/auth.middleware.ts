import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";

// 鉴权
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { authorization } = req.headers;
    // const { url } = req
    // TODO:判断当前接口是否需要鉴权
    // 1、判断是否有TOKEN
    // if (!authorization) throw new HttpException('权限验证失败', HttpStatus.FORBIDDEN)
    // TODO：2、判断TOKEN是否有效
    next();
  }
}
