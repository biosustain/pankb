"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DebugMenu = _menubuilder2.default.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    return this.el.style.display = "inline-block";
  },

  render: function render() {
    var _this = this;

    this.setName("Debug");

    this.addNode("Get the code", function () {
      return window.open("https://github.com/wilzbach/msa");
    });

    this.addNode("Toggle mouseover events", function () {
      _this.g.config.set("registerMouseHover", !_this.g.config.get("registerMouseHover"));
      return _this.g.onAll(function () {
        return console.log(arguments);
      });
    });

    this.addNode("Minimized width", function () {
      return _this.g.zoomer.set("alignmentWidth", 600);
    });
    this.addNode("Minimized height", function () {
      return _this.g.zoomer.set("alignmentHeight", 120);
    });

    this.el.appendChild(this.buildDOM());
    return this;
  }
});
exports.default = DebugMenu;