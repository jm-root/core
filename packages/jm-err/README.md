# jm-err
common error defines

```javascript
// es6
import err from 'jm-err';

function test(obj) {
    console.info(JSON.stringify(obj.Err, null, 2));
    console.info(obj.errMsg('SUCCESS ${name}:${value}', {name: 'jeff', value: 123}));
    console.info(obj.err(obj.Err.SUCCESS));
    console.info(obj.err('SUCCESS ${name}:${value}', {name: 'jeff', value: 123}));
}

test(err);

let o = {};
err.enableErr(o);
test(o);

```