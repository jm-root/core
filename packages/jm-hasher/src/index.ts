import crypto = require("crypto");
const sm3 = require("sm3")
class hasher {
  static md5(value: string): string {
    return crypto.createHash('md5').update(value).digest('hex');
  }
  static sha256(value: string): string {
    return crypto.createHash('sha256').update(value).digest('hex');
  }
  static sm3(value: string): string {
    return sm3(value)
  }
}
export = { hasher }