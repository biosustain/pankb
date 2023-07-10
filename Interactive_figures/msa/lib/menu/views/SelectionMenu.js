"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectionMenu = _menubuilder2.default.extend({
  initialize: function initialize(data) {
    this.g = data.g;
    return this.el.style.display = "inline-block";
  },
  render: function render() {
    var _this = this;

    this.setName("Selection");
    this.addNode("Find Motif (supports RegEx)", function () {
      var search = prompt("your search", "D");
      return _this.g.user.set("searchText", search);
    });

    this.addNode("Invert columns", function () {
      return _this.g.selcol.invertCol(function () {
        var result = [];
        var end = _this.model.getMaxLength();
        var i = 0;
        if (0 <= end) {
          while (i <= end) {
            result.push(i++);
          }
        } else {
          while (i >= end) {
            result.push(i--);
          }
        }
        return result;
      }());
    });
    this.addNode("Invert rows", function () {
      return _this.g.selcol.invertRow(_this.model.pluck("id"));
    });
    this.addNode("Reset", function () {
      return _this.g.selcol.reset();
    });
    this.el.appendChild(this.buildDOM());
    return this;
  }
});
exports.default = SelectionMenu;