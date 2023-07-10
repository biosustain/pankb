"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LabelRowView = require("./LabelRowView");

var _LabelRowView2 = _interopRequireDefault(_LabelRowView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boneView = require("backbone-childs");


var View = boneView.extend({

  initialize: function initialize(data) {
    var _this = this;

    this.g = data.g;
    this.draw();
    this.listenTo(this.g.zoomer, "change:_alignmentScrollTop", this._adjustScrollingTop);
    this.g.vis.once('change:loaded', this._adjustScrollingTop, this);

    this.listenTo(this.g.zoomer, "change:alignmentHeight", this._setHeight);
    this.listenTo(this.model, "change:reference", this.draw);

    return this.listenTo(this.model, "reset add remove", function () {
      _this.draw();
      return _this.render();
    });
  },

  draw: function draw() {
    this.removeViews();
    console.log("redraw columns", this.model.length);
    for (var i = 0; i < this.model.length; i++) {
      if (this.model.at(i).get('hidden')) {
        continue;
      }
      var view = new _LabelRowView2.default({ model: this.model.at(i), g: this.g });
      view.ordering = i;
      this.addView("row_" + i, view);
    }
  },

  events: { "scroll": "_sendScrollEvent" },

  // broadcast the scrolling event (by the scrollbar)
  _sendScrollEvent: function _sendScrollEvent() {
    return this.g.zoomer.set("_alignmentScrollTop", this.el.scrollTop, { origin: "label" });
  },

  // sets the scrolling property (from another event e.g. dragging)
  _adjustScrollingTop: function _adjustScrollingTop() {
    return this.el.scrollTop = this.g.zoomer.get("_alignmentScrollTop");
  },


  render: function render() {
    this.renderSubviews();
    this.el.className = "biojs_msa_labelblock";
    this.el.style.display = "inline-block";
    this.el.style.verticalAlign = "top";
    this.el.style.overflowY = "auto";
    this.el.style.overflowX = "hidden";
    this.el.style.fontSize = this.g.zoomer.get('labelFontsize') + "px";
    this.el.style.lineHeight = "" + this.g.zoomer.get("labelLineHeight");
    this._setHeight();
    return this;
  },

  _setHeight: function _setHeight() {
    return this.el.style.height = this.g.zoomer.get("alignmentHeight") + "px";
  }
});
exports.default = View;