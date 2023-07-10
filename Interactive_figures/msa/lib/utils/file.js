"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require("lodash");

var _bio = require("bio.io");

var _recognize = require("./recognize");

var _recognize2 = _interopRequireDefault(_recognize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileHelper = function FileHelper(msa) {
  this.msa = msa;
  return this;
};

var funs = { guessFileFromText: function guessFileFromText(text, opt) {
    if (!(typeof text !== "undefined" && text !== null)) {
      console.warn("invalid file format");
      return ["", "error"];
    }
    var recognizedFile = (0, _recognize2.default)(text, opt);
    switch (recognizedFile) {
      case "clustal":
        var reader = _bio.clustal;
        var type = "seqs";
        break;

      case "fasta":
        reader = _bio.fasta;
        type = "seqs";
        break;

      case "newick":
        type = "newick";
        break;

      case "gff":
        reader = _bio.gff;
        type = "features";
        break;

      default:
        alert("Unknown file format. Please contact us on Github for help.");
        break;
    }
    return [reader, type];
  },

  parseText: function parseText(text, opt) {
    var _guessFileFromText = this.guessFileFromText(text, opt),
        _guessFileFromText2 = _slicedToArray(_guessFileFromText, 2),
        reader = _guessFileFromText2[0],
        type = _guessFileFromText2[1];

    if (type === "seqs") {
      var seqs = reader.parse(text);
      return [seqs, type];
    } else if (type === "features") {
      var features = reader.parseSeqs(text);
      return [features, type];
    } else {
      return [text, type];
    }
  },

  importFiles: function importFiles(files) {
    var _this = this;

    return function () {
      var result = [];
      var end = files.length - 1;
      for (var i = 0; 0 < end ? i <= end : i >= end; 0 < end ? i++ : i--) {
        var file = files[i];
        var reader = new FileReader();
        reader.onload = function (evt) {
          return _this.importFile(evt.target.result);
        };
        result.push(reader.readAsText(file));
      }
      return result;
    }();
  },

  importFile: function importFile(file, opt) {
    var _this2 = this;

    opt = opt || {};
    opt.name = file.name;
    var fileName;

    var _parseText = this.parseText(file, opt),
        _parseText2 = _slicedToArray(_parseText, 2),
        objs = _parseText2[0],
        type = _parseText2[1];

    if (type === "error") {
      alert("An error happened");
      return "error";
    }
    if (type === "seqs") {
      this.msa.seqs.reset(objs);
      this.msa.g.config.set("url", "userimport");
      this.msa.g.trigger("url:userImport");
    } else if (type === "features") {
      this.msa.seqs.addFeatures(objs);
    } else if (type === "newick") {
      this.msa.u.tree.loadTree(function () {
        return _this2.msa.u.tree.showTree(file);
      });
    } else {
      alert("Unknown file!");
    }

    return fileName = file.name;
  },

  importURL: function importURL(url, cb) {
    var _this3 = this;

    url = this.msa.u.proxy.corsURL(url);
    this.msa.g.config.set("url", url);
    return (0, _bio.xhr)({
      url: url,
      timeout: 0
    }, function (err, status, body) {
      if (!err) {
        var res = _this3.importFile(body, { url: url });
        if (res === "error") {
          return;
        }
        _this3.msa.g.trigger("import:url", url);
        if (cb) {
          return cb();
        }
      } else {
        return console.error(err);
      }
    });
  }
};

(0, _lodash.extend)(FileHelper.prototype, funs);
exports.default = FileHelper;