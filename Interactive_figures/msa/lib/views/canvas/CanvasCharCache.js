"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = require("biojs-events");

var CanvasCharCache = function () {
  function CanvasCharCache(g) {
    _classCallCheck(this, CanvasCharCache);

    this.g = g;
    this.cache = {};
    this.cacheHeight = 0;
    this.cacheWidth = 0;
  }

  // returns a cached canvas


  _createClass(CanvasCharCache, [{
    key: "getFontTile",
    value: function getFontTile(letter, width, height) {
      // validate cache
      if (width !== this.cacheWidth || height !== this.cacheHeight) {
        this.cacheHeight = height;
        this.cacheWidth = width;
        this.cache = {};
      }

      if (this.cache[letter] === undefined) {
        this.createTile(letter, width, height);
      }

      return this.cache[letter];
    }

    // creates a canvas with a single letter
    // (for the fast font cache)

  }, {
    key: "createTile",
    value: function createTile(letter, width, height) {

      var canvas = this.cache[letter] = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      this.ctx = canvas.getContext('2d');
      this.ctx.font = this.g.zoomer.get("residueFont") + "px mono";

      this.ctx.textBaseline = 'middle';
      this.ctx.textAlign = "center";

      return this.ctx.fillText(letter, width / 2, height / 2, width);
    }
  }]);

  return CanvasCharCache;
}();

;
exports.default = CanvasCharCache;