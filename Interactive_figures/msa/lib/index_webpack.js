'use strict';

var _index = require('./index');

var MSA = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// trick to bundle the css
require('./../css/msa.css');

var msa = MSA.default;
// workaround against es6 exports
// we want to expose the MSA constructor by default
for (var key in MSA) {
    if (MSA.hasOwnProperty(key)) {
        msa[key] = MSA[key];
    }
}
if (!!window) {
    window.msa = msa;
}
module.exports = msa;