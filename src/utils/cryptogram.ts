import * as crypto from 'crypto';

/**
 * 生成盐
 */
export function MakeSalt() {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * 加密密码
 * @param salt 盐
 */
export function Encrypt(string, salt) {
  if (!string || !salt) return '';

  const tempSalt = Buffer.from(salt, 'base64');

  return crypto
    .pbkdf2Sync(string, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
}

export function RandomString(length = 10) {
  length = length > 10 ? 10 : length;
  length = length < 0 ? 1 : length;
  return Math.random().toString(36).substr(3, length);
}
