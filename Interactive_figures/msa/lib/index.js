"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.version = exports.io = exports.$ = exports.boneView = exports.view = exports.selcol = exports.selection = exports.utils = exports.menu = exports.model = exports.msa = undefined;

var _Selection = require("./g/selection/Selection");

Object.defineProperty(exports, "selection", {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Selection).default;
    }
});

var _SelectionCol = require("./g/selection/SelectionCol");

Object.defineProperty(exports, "selcol", {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_SelectionCol).default;
    }
});

var _backboneViewj = require("backbone-viewj");

Object.defineProperty(exports, "view", {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_backboneViewj).default;
    }
});

var _backboneChilds = require("backbone-childs");

Object.defineProperty(exports, "boneView", {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_backboneChilds).default;
    }
});

var _jbone = require("jbone");

Object.defineProperty(exports, "$", {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_jbone).default;
    }
});

var _msa = require("./msa");

var _msa2 = _interopRequireDefault(_msa);

var _model2 = require("./model");

var _model = _interopRequireWildcard(_model2);

var _menu2 = require("./menu");

var _menu = _interopRequireWildcard(_menu2);

var _utils2 = require("./utils");

var _utils = _interopRequireWildcard(_utils2);

var _bio = require("bio.io");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MSAWrapper = function MSAWrapper() {
    var msa = function msa(args) {
        return _msa2.default.apply(this, args);
    };
    msa.prototype = _msa2.default.prototype;
    return new msa(arguments);
};
exports.default = MSAWrapper;
exports.msa = _msa2.default;

// models

exports.model = _model;

// extra plugins, extensions

exports.menu = _menu;
exports.utils = _utils;

// probably needed more often


// parser (are currently bundled - so we can also expose them)

var io = {
    xhr: require('xhr'),
    fasta: _bio.fasta,
    clustal: _bio.clustal,
    gff: _bio.gff
};

exports.io = io;

// version will be automatically injected by webpack
// MSA_VERSION is only defined if loaded via webpack

var VERSION = "imported";
if (typeof MSA_VERSION !== "undefined") {
    VERSION = MSA_VERSION;
}

var version = exports.version = VERSION;