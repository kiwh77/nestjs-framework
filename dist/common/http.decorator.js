"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageInfo = exports.PAGE_INFO_FLAG = void 0;
const common_1 = require("@nestjs/common");
exports.PAGE_INFO_FLAG = Symbol('PageInfo');
const PageInfo = () => {
    return (0, common_1.SetMetadata)(exports.PAGE_INFO_FLAG, true);
};
exports.PageInfo = PageInfo;
//# sourceMappingURL=http.decorator.js.map