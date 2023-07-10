"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequence = require("./Sequence");

Object.defineProperty(exports, "seq", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Sequence).default;
  }
});

var _SeqCollection = require("./SeqCollection");

Object.defineProperty(exports, "seqcol", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SeqCollection).default;
  }
});

var _Feature = require("./Feature");

Object.defineProperty(exports, "feature", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Feature).default;
  }
});

var _FeatureCol = require("./FeatureCol");

Object.defineProperty(exports, "featurecol", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FeatureCol).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }