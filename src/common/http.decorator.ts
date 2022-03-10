import { SetMetadata } from '@nestjs/common';

export const PAGE_INFO_FLAG = Symbol('PageInfo');

/** 标记接口为分页接口 */
export const PageInfo = () => {
  return SetMetadata(PAGE_INFO_FLAG, true);
};
