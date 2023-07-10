"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterMenu = _menubuilder2.default.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    return this.el.style.display = "inline-block";
  },

  render: function render() {
    var _this = this;

    this.setName("Filter");
    this.addNode("Hide columns by threshold", function (e) {
      var threshold = prompt("Enter threshold (in percent)", 20);
      threshold = threshold / 100;
      var maxLen = _this.model.getMaxLength();
      var hidden = [];
      // TODO: cache this value
      var conserv = _this.g.stats.scale(_this.g.stats.conservation());
      var end = maxLen - 1;
      for (var i = 0; i <= end; i++) {
        if (conserv[i] < threshold) {
          hidden.push(i);
        }
      }
      return _this.g.columns.set("hidden", hidden);
    });

    this.addNode("Hide columns by selection", function () {
      var hiddenOld = _this.g.columns.get("hidden");
      var hidden = hiddenOld.concat(_this.g.selcol.getAllColumnBlocks({ maxLen: _this.model.getMaxLength(), withPos: true }));
      _this.g.selcol.reset([]);
      return _this.g.columns.set("hidden", hidden);
    });

    this.addNode("Hide columns by gaps", function () {
      var threshold = prompt("Enter threshold (in percent)", 20);
      threshold = threshold / 100;
      var maxLen = _this.model.getMaxLength();
      var hidden = [];
      var end = maxLen - 1;

      var _loop = function _loop(i) {
        var gaps = 0;
        var total = 0;
        _this.model.each(function (el) {
          if (el.get('seq')[i] === "-") {
            gaps++;
          }
          return total++;
        });
        var gapContent = gaps / total;
        if (gapContent > threshold) {
          hidden.push(i);
        }
      };

      for (var i = 0; i <= end; i++) {
        _loop(i);
      }
      return _this.g.columns.set("hidden", hidden);
    });

    this.addNode("Hide seqs by identity", function () {
      var threshold = prompt("Enter threshold (in percent)", 20);
      threshold = threshold / 100;
      return _this.model.each(function (el) {
        if (el.get('identity') < threshold) {
          return el.set('hidden', true);
        }
      });
    });

    this.addNode("Hide seqs by selection", function () {
      var hidden = _this.g.selcol.where({ type: "row" });
      var ids = hidden.map(function (el) {
        return el.get('seqId');
      });
      _this.g.selcol.reset([]);
      return _this.model.each(function (el) {
        if (ids.indexOf(el.get('id')) >= 0) {
          return el.set('hidden', true);
        }
      });
    });

    this.addNode("Hide seqs by gaps", function () {
      var threshold = prompt("Enter threshold (in percent)", 40);
      return _this.model.each(function (el, i) {
        var seq = el.get('seq');
        var gaps = seq.reduce(function (memo, c) {
          return c === '-' ? ++memo : undefined;
        }, 0);
        if (gaps > threshold) {
          return el.set('hidden', true);
        }
      });
    });

    this.addNode("Reset", function () {
      _this.g.columns.set("hidden", []);
      return _this.model.each(function (el) {
        if (el.get('hidden')) {
          return el.set('hidden', false);
        }
      });
    });

    this.el.appendChild(this.buildDOM());
    return this;
  }
});
exports.default = FilterMenu;