"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomString = exports.Encrypt = exports.MakeSalt = void 0;
const crypto = require("crypto");
function MakeSalt() {
    return crypto.randomBytes(3).toString('base64');
}
exports.MakeSalt = MakeSalt;
function Encrypt(string, salt) {
    if (!string || !salt)
        return '';
    const tempSalt = Buffer.from(salt, 'base64');
    return crypto
        .pbkdf2Sync(string, tempSalt, 10000, 16, 'sha1')
        .toString('base64');
}
exports.Encrypt = Encrypt;
function RandomString(length = 10) {
    length = length > 10 ? 10 : length;
    length = length < 0 ? 1 : length;
    return Math.random().toString(36).substr(3, length);
}
exports.RandomString = RandomString;
//# sourceMappingURL=cryptogram.js.map