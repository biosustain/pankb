"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CanvasSeqBlock = require("./canvas/CanvasSeqBlock");

var _CanvasSeqBlock2 = _interopRequireDefault(_CanvasSeqBlock);

var _LabelBlock = require("./labels/LabelBlock");

var _LabelBlock2 = _interopRequireDefault(_LabelBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boneView = require("backbone-childs");


var View = boneView.extend({

  initialize: function initialize(data) {
    this.g = data.g;

    if (true) {
      var labelblock = new _LabelBlock2.default({ model: this.model, g: this.g });
      labelblock.ordering = -1;
      this.addView("labelblock", labelblock);
    }

    if (this.g.vis.get("sequences")) {
      var seqblock = new _CanvasSeqBlock2.default({ model: this.model, g: this.g });
      seqblock.ordering = 0;
      this.addView("seqblock", seqblock);
    }

    this.listenTo(this.g.zoomer, "change:alignmentHeight", this.adjustHeight);
    this.listenTo(this.g.zoomer, "change:alignmentWidth", this.adjustWidth);
    this.listenTo(this.g.columns, "change:hidden", this.adjustHeight);
    return this;
  },

  render: function render() {
    this.renderSubviews();
    this.el.className = "biojs_msa_albody";
    this.el.style.whiteSpace = "nowrap";
    this.adjustHeight();
    this.adjustWidth();
    return this;
  },

  adjustHeight: function adjustHeight() {
    if (this.g.zoomer.get("alignmentHeight") === "auto") {
      // TODO: fix the magic 5
      return this.el.style.height = this.g.zoomer.get("rowHeight") * this.model.length + 5;
    } else {
      return this.el.style.height = this.g.zoomer.get("alignmentHeight");
    }
  },

  adjustWidth: function adjustWidth() {
    // TODO: 15 is the width of the scrollbar
    return this.el.style.width = this.getWidth();
  },

  getWidth: function getWidth() {
    var width = 0;
    width += this.g.zoomer.getLeftBlockWidth();
    if (this.g.vis.get("sequences")) {
      width += this.g.zoomer.get("alignmentWidth");
    }
    return width;
  }
});
exports.default = View;