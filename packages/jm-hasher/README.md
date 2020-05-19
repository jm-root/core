# jm-hasher

封装了常用的哈希算法，用于对于字符串加密。

## features

- md5
- sha256
- sm3 国产密码

## install

```bash
npm i jm-hasher
```

## usage

- javascript

```javascript
const { md5, sha256, sm3 } = require('jm-hasher');
console.log(md5('123')); // => '202cb962ac59075b964b07152d234b70'
console.log(sha256('123')); // => 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
console.log(sm3('123')); // =>'6e0f9e14344c5406a0cf5a3b4dfb665f87f4a771a31f7edbb5c72874a32b2957'
```

- typescript

```typescript
import {md5} from 'jm-hasher';
console.log(md5('123')); //=> '202cb962ac59075b964b07152d234b70'
```
