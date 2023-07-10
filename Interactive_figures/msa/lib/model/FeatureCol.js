"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _Feature = require("./Feature");

var _Feature2 = _interopRequireDefault(_Feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collection = require("backbone-thin").Collection;


var FeatureCol = Collection.extend({
  model: _Feature2.default,

  constructor: function constructor() {
    this.startOnCache = [];
    // invalidate cache
    this.on("all", function () {
      return this.startOnCache = [];
    }, this);
    return Collection.apply(this, arguments);
  },

  // returns all features starting on index
  startOn: function startOn(index) {
    if (!(this.startOnCache[index] != null)) {
      this.startOnCache[index] = this.where({ xStart: index });
    }
    return this.startOnCache[index];
  },

  contains: function contains(index) {
    return this.reduce(function (el, memo) {
      return memo || el.contains(index);
    }, false);
  },

  getFeatureOnRow: function getFeatureOnRow(row, x) {
    return this.filter(function (el) {
      return el.get("row") === row && el.get("xStart") <= x && x <= el.get("xEnd");
    });
  },

  // tries to auto-fit the rows
  // not a very efficient algorithm
  assignRows: function assignRows() {

    var len = this.max(function (el) {
      return el.get("xEnd");
    }).attributes.xEnd;
    var rows = function () {
      var result = [];
      for (var x = 0; 0 < len ? x <= len : x >= len; 0 < len ? x++ : x--) {
        result.push(0);
      }
      return result;
    }();

    this.each(function (el) {
      var max = 0;
      var start = el.get("xStart");
      var end = el.get("xEnd");
      for (var x = start; start < end ? x <= end : x >= end; start < end ? x++ : x--) {
        if (rows[x] > max) {
          max = rows[x];
        }
        rows[x]++;
      }
      return el.set("row", max);
    });

    return (0, _lodash.max)(rows);
  },

  getCurrentHeight: function getCurrentHeight() {
    return this.max(function (el) {
      return el.get("row");
    }).attributes.row + 1;
  },

  // gives the minimal needed number of rows
  // not a very efficient algorithm
  // (there is one in O(n) )
  getMinRows: function getMinRows() {

    var len = this.max(function (el) {
      return el.get("xEnd");
    }).attributes.xEnd;
    var rows = function () {
      var result = [];
      for (var x = 0; 0 < len ? x <= len : x >= len; 0 < len ? x++ : x--) {
        result.push(0);
      }
      return result;
    }();

    this.each(function (el) {
      return function () {
        var result = [];
        var start = el.get("xStart");
        var end = el.get("xEnd");
        for (var x = start; start < end ? x <= end : x >= end; start < end ? x++ : x++) {
          result.push(rows[x]++);
        }
        return result;
      }();
    });

    return (0, _lodash.max)(rows);
  }
});
exports.default = FeatureCol;