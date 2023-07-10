"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bmath = require("./bmath");

var _bmath2 = _interopRequireDefault(_bmath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequence = require("biojs-model").seq;

var Stat = require("@bighatbio/stat.seqs");

var SeqGen = {
  _generateSequence: function _generateSequence(len) {
    var text = "";
    var end = len - 1;
    for (var i = 0; 0 < end ? i <= end : i >= end; 0 < end ? i++ : i--) {
      text += SeqGen.getRandomChar();
    }
    return text;
  },

  // generates a dummy sequences
  // @param len [int] number of generated sequences
  // @param seqLen [int] length of the generated sequences
  getDummySequences: function getDummySequences(len, seqLen) {
    var seqs = [];
    if (!(typeof len !== "undefined" && len !== null)) {
      len = _bmath2.default.getRandomInt(3, 5);
    }
    if (!(typeof seqLen !== "undefined" && seqLen !== null)) {
      seqLen = _bmath2.default.getRandomInt(50, 200);
    }

    for (var i = 1; 1 < len ? i <= len : i >= len; 1 < len ? i++ : i--) {
      seqs.push(new Sequence(SeqGen._generateSequence(seqLen), "seq" + i, "r" + i));
    }
    return seqs;
  },

  getRandomChar: function getRandomChar(dict) {
    var possible = dict || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return possible.charAt(Math.floor(Math.random() * possible.length));
  },

  // generates a dummy sequences
  // @param len [int] number of generated sequences
  // @param seqLen [int] length of the generated sequences
  genConservedSequences: function genConservedSequences(len, seqLen, dict) {
    var seqs = [];
    if (!(typeof len !== "undefined" && len !== null)) {
      len = _bmath2.default.getRandomInt(3, 5);
    }
    if (!(typeof seqLen !== "undefined" && seqLen !== null)) {
      seqLen = _bmath2.default.getRandomInt(50, 200);
    }

    dict = dict || "ACDEFGHIKLMNPQRSTVWY---";

    for (var _i = 1; 1 < len ? _i <= len : _i >= len; 1 < len ? _i++ : _i--) {
      seqs[_i - 1] = "";
    }

    var tolerance = 0.2;

    var conservAim = 1;
    var end = seqLen - 1;
    for (var _i2 = 0; 0 < end ? _i2 <= end : _i2 >= end; 0 < end ? _i2++ : _i2--) {
      if (_i2 % 3 === 0) {
        conservAim = _bmath2.default.getRandomInt(50, 100) / 100;
      }
      var observed = [];
      var end1 = len - 1;
      for (var j = 0; 0 < end1 ? j <= end1 : j >= end1; 0 < end1 ? j++ : j--) {
        var counter = 0;
        var c = void 0;
        while (counter < 100) {
          c = SeqGen.getRandomChar(dict);
          var cConserv = Stat(observed);
          cConserv.addSeq(c);
          counter++;
          if (Math.abs(conservAim - cConserv.scale(cConserv.conservation())[0]) < tolerance) {
            break;
          }
        }
        seqs[j] += c;
        observed.push(c);
      }
    }

    var pseqs = [];
    for (var i = 1; 1 < len ? i <= len : i >= len; 1 < len ? i++ : i--) {
      pseqs.push(new Sequence(seqs[i - 1], "seq" + i, "r" + i));
    }

    return pseqs;
  }
};
exports.default = SeqGen;