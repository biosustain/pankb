"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Model = require("backbone-thin").Model;
var MenuSettings = Model.extend({
    constructor: function constructor(attributes, options) {
        if (attributes == "small") {
            attributes = this.small;
        }
        return Model.apply(this, [attributes]);
    },
    small: {
        menuFontsize: "12px"
    },
    defaults: {
        menuFontsize: "14px",
        menuItemFontsize: "14px",
        menuItemLineHeight: "14px",
        menuMarginLeft: "3px",
        menuPadding: "3px 4px 3px 4px"
    }
});
exports.default = MenuSettings;