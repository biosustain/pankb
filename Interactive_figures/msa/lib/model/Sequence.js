"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FeatureCol = require("./FeatureCol");

var _FeatureCol2 = _interopRequireDefault(_FeatureCol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = require("backbone-thin").Model;


var Sequence = Model.extend({

  defaults: {
    name: "",
    id: "",
    seq: "",
    height: 1,
    ref: false // reference: the sequence used in BLAST or the consensus seq
  },

  initialize: function initialize() {
    // residues without color
    this.set("grey", []);
    if (!(this.get("features") != null)) {
      return this.set("features", new _FeatureCol2.default());
    }
  }
});
exports.default = Sequence;