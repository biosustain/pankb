"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// math utilities
var BMath = function () {
  function BMath() {
    _classCallCheck(this, BMath);
  }

  _createClass(BMath, null, [{
    key: "randomInt",
    value: function randomInt(lower, upper) {
      // Called with one argument
      if (!(typeof upper !== "undefined" && upper !== null)) {
        var _ref = [0, lower];
        lower = _ref[0];
        upper = _ref[1];
      }
      // Lower must be less then upper
      if (lower > upper) {
        var _ref2 = [upper, lower];
        lower = _ref2[0];
        upper = _ref2[1];
      }
      // Last statement is a return value
      return Math.floor(Math.random() * (upper - lower + 1) + lower);
    }

    // @return [Integer] random id

  }, {
    key: "uniqueId",
    value: function uniqueId() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

      var id = "";
      while (id.length < length) {
        id += Math.random().toString(36).substr(2);
      }
      return id.substr(0, length);
    }

    // Returns a random integer between min (inclusive) and max (inclusive)

  }, {
    key: "getRandomInt",
    value: function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);

  return BMath;
}();

exports.default = BMath;
;