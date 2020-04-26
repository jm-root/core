# jm-rollup
rollup config

```javascript
const config = require('jm-rollup')(__dirname);
console.log(config)
```

## fn(dir, opts0)

### opts

inputFileName ['lib/index'] 输入的文件名, 可以带扩展名
outputFileName ['dist/index'] 输出的文件名, 不要带扩展名
