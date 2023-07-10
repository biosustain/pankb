"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HelpMenu = _menubuilder2.default.extend({

  initialize: function initialize(data) {
    return this.g = data.g;
  },

  render: function render() {
    this.setName("Help");
    this.addNode("About the project", function () {
      return window.open("https://github.com/wilzbach/msa");
    });
    this.addNode("Report issues", function () {
      return window.open("https://github.com/wilzbach/msa/issues");
    });
    this.addNode("User manual", function () {
      return window.open("https://github.com/wilzbach/msa/wiki/User-manual");
    });
    this.el.style.display = "inline-block";
    this.el.appendChild(this.buildDOM());
    return this;
  }
});
exports.default = HelpMenu;