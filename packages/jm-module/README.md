# jm-module
use and unuse modules

```javascript
// nodejs
const mdl = require('jm-module');

// define a modulabe named 'test'
var mdlTest = function(opts) {
    var app = this;
    app.test = function () {
        return true;
    };

    return {
        name: 'test',
        unuse: function () {
            delete app.test;
        }
    }
};

function test(obj) {
    obj.use(mdlTest);
    console.log('test: %j', obj.test());
    obj.unuse('test');
}

var m = new mdl.Modulable();
test(m);

var o = {};
mdl.enableModule(o);
test(o);

```

```javascript
// es6
import mdl from 'jm-module';

let mdlTest = function (opts) {
    var app = this;
    app.test = () => {
        return true;
    };

    return {
        name: 'test',
        unuse: () => {
            delete app.test;
        },
    };
};

function test(obj) {
    obj.use(mdl);
    obj.test();
    obj.unuse('test');
}

let m = new module.Modulable();
test(m);

let o = {};
module.enableModule(o);
test(o);

```