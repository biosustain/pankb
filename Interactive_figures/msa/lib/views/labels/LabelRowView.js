"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabelView = require("./LabelView");

var _LabelView2 = _interopRequireDefault(_LabelView);

var _MetaView = require("./MetaView");

var _MetaView2 = _interopRequireDefault(_MetaView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boneView = require("backbone-childs");


var View = boneView.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    this.draw();

    this.listenTo(this.g.vis, "change:labels", this.drawR);
    this.listenTo(this.g.vis, "change:metacell", this.drawR);
    this.listenTo(this.g.zoomer, "change:rowHeight", function () {
      return this.el.style.height = this.g.zoomer.get("rowHeight") + "px";
    });

    return this.listenTo(this.g.selcol, "change reset add", this.setSelection);
  },

  draw: function draw() {
    this.removeViews();
    if (this.g.vis.get("labels")) {
      this.addView("labels", new _LabelView2.default({ model: this.model, g: this.g }));
    }
    if (this.g.vis.get("metacell")) {
      var meta = new _MetaView2.default({ model: this.model, g: this.g });
      return this.addView("metacell", meta);
    }
  },

  drawR: function drawR() {
    this.draw();
    return this.render();
  },

  render: function render() {
    this.renderSubviews();

    this.el.setAttribute("class", "biojs_msa_labelrow");
    this.el.style.height = this.g.zoomer.get("rowHeight") * (this.model.attributes.height || 1) + "px";

    this.setSelection();
    return this;
  },

  setSelection: function setSelection() {
    var sel = this.g.selcol.getSelForRow(this.model.id);
    if (sel.length > 0) {
      return this.el.style.fontWeight = "bold";
    } else {
      return this.el.style.fontWeight = "normal";
    }
  }
});
exports.default = View;