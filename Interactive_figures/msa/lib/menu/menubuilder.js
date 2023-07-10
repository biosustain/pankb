"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menulib = require("./menulib");

var _menulib2 = _interopRequireDefault(_menulib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuBuilder = _menulib2.default.extend({

  buildDOM: function buildDOM() {
    this.on("new:node", this.buildNode);
    this.on("new:button", this.buildButton);
    this.on("new:menu", this.buildMenu);
    return _menulib2.default.prototype.buildDOM.call(this);
  },

  buildNode: function buildNode(li) {
    if (this.g != null) {
      return li.style.lineHeight = this.g.menuconfig.get("menuItemLineHeight");
    }
  },

  buildButton: function buildButton(btn) {
    if (this.g != null) {
      btn.style.fontSize = this.g.menuconfig.get("menuFontsize");
      btn.style.marginLeft = this.g.menuconfig.get("menuMarginLeft");
      return btn.style.padding = this.g.menuconfig.get("menuPadding");
    }
  },

  buildMenu: function buildMenu(menu) {
    if (this.g != null) {
      return menu.style.fontSize = this.g.menuconfig.get("menuItemFontsize");
    }
  }
});
exports.default = MenuBuilder;