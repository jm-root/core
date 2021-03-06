'use strict'
const crypto = require('crypto')
const sm3 = require('sm3')
class Hasher {
  static md5 (value) {
    return crypto.createHash('md5').update(value).digest('hex')
  }
  static sha256 (value) {
    return crypto.createHash('sha256').update(value).digest('hex')
  }
  static sm3 (value) {
    return sm3(value)
  }
}
module.exports = Hasher
// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFpQztBQUNqQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDMUIsTUFBTSxNQUFNO0lBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFhO1FBQ3RCLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWE7UUFDekIsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBYTtRQUN0QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQixDQUFDO0NBQ0Y7QUFDRCxpQkFBUyxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHRvID0gcmVxdWlyZShcImNyeXB0b1wiKVxuY29uc3Qgc20zID0gcmVxdWlyZShcInNtM1wiKVxuY2xhc3MgSGFzaGVyIHtcbiAgc3RhdGljIG1kNSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpLnVwZGF0ZSh2YWx1ZSkuZGlnZXN0KCdoZXgnKVxuICB9XG4gIHN0YXRpYyBzaGEyNTYodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUodmFsdWUpLmRpZ2VzdCgnaGV4JylcbiAgfVxuICBzdGF0aWMgc20zKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzbTModmFsdWUpXG4gIH1cbn1cbmV4cG9ydCA9IEhhc2hlclxuIl19
