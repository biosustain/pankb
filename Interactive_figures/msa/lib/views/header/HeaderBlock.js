"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabelHeader = require("./LabelHeader");

var _LabelHeader2 = _interopRequireDefault(_LabelHeader);

var _RightHeaderBlock = require("./RightHeaderBlock");

var _RightHeaderBlock2 = _interopRequireDefault(_RightHeaderBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boneView = require("backbone-childs");


var View = boneView.extend({

  initialize: function initialize(data) {
    var _this = this;

    this.g = data.g;
    this.draw();
    return this.listenTo(this.g.vis, "change:labels change:metacell change:leftHeader", function () {
      _this.draw();
      return _this.render();
    });
  },

  draw: function draw() {
    this.removeViews();

    if (this.g.vis.get("leftHeader") && (this.g.vis.get("labels") || this.g.vis.get("metacell"))) {
      var lHeader = new _LabelHeader2.default({ model: this.model, g: this.g });
      lHeader.ordering = -50;
      this.addView("lHeader", lHeader);
    }

    var rHeader = new _RightHeaderBlock2.default({ model: this.model, g: this.g });
    rHeader.ordering = 0;
    return this.addView("rHeader", rHeader);
  },

  render: function render() {
    this.renderSubviews();

    return this.el.className = "biojs_msa_header";
  }
});
exports.default = View;