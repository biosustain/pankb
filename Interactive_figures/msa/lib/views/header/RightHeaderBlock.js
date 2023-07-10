"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MarkerView = require("./MarkerView");

var _MarkerView2 = _interopRequireDefault(_MarkerView);

var _ConservationView = require("./ConservationView");

var _ConservationView2 = _interopRequireDefault(_ConservationView);

var _SeqLogoWrapper = require("./SeqLogoWrapper");

var _SeqLogoWrapper2 = _interopRequireDefault(_SeqLogoWrapper);

var _GapView = require("./GapView");

var _GapView2 = _interopRequireDefault(_GapView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boneView = require("backbone-childs");

var View = boneView.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    this.blockEvents = false;

    this.listenTo(this.g.vis, "change:header", function () {
      this.draw();
      return this.render();
    });
    this.listenTo(this.g.vis, "change", this._setSpacer);
    this.listenTo(this.g.zoomer, "change:alignmentWidth", this._setWidth);
    this.listenTo(this.g.zoomer, "change:_alignmentScrollLeft", this._adjustScrollingLeft);

    // TODO: duplicate rendering
    this.listenTo(this.g.columns, "change:hidden", function () {
      this.draw();
      return this.render();
    });

    this.draw();

    return this.g.vis.once('change:loaded', this._adjustScrollingLeft, this);
  },

  events: { "scroll": "_sendScrollEvent" },

  draw: function draw() {
    this.removeViews();

    if (this.g.vis.get("conserv")) {
      var conserv = new _ConservationView2.default({ model: this.model, g: this.g });
      conserv.ordering = -20;
      this.addView("conserv", conserv);
    }

    if (this.g.vis.get("markers")) {
      var marker = new _MarkerView2.default({ model: this.model, g: this.g });
      marker.ordering = -10;
      this.addView("marker", marker);
    }

    if (this.g.vis.get("seqlogo")) {
      var seqlogo = new _SeqLogoWrapper2.default({ model: this.model, g: this.g });
      seqlogo.ordering = -30;
      this.addView("seqlogo", seqlogo);
    }

    if (this.g.vis.get("gapHeader")) {
      var gapview = new _GapView2.default({ model: this.model, g: this.g });
      gapview.ordering = -25;
      return this.addView("gapview", gapview);
    }
  },

  render: function render() {
    this.renderSubviews();

    this._setSpacer();

    this.el.className = "biojs_msa_rheader";
    this.el.style.overflowX = "auto";
    this.el.style.display = "inline-block";
    //@el.style.height = @g.zoomer.get("markerHeight") + "px"
    this._setWidth();
    this._adjustScrollingLeft();
    return this;
  },

  // scrollLeft triggers a reflow of the whole area (even only get)
  _sendScrollEvent: function _sendScrollEvent() {
    if (!this.blockEvents) {
      this.g.zoomer.set("_alignmentScrollLeft", this.el.scrollLeft, { origin: "header" });
    }
    return this.blockEvents = false;
  },

  _adjustScrollingLeft: function _adjustScrollingLeft(model, value, options) {
    if (!((typeof options !== "undefined" && options !== null ? options.origin : undefined) != null) || options.origin !== "header") {
      var scrollLeft = this.g.zoomer.get("_alignmentScrollLeft");
      this.blockEvents = true;
      return this.el.scrollLeft = scrollLeft;
    }
  },

  _setSpacer: function _setSpacer() {
    // spacer / padding element
    return this.el.style.marginLeft = this._getLabelWidth() + "px";
  },

  _getLabelWidth: function _getLabelWidth() {
    var paddingLeft = 0;
    if (!this.g.vis.get("leftHeader")) {
      paddingLeft += this.g.zoomer.getLeftBlockWidth();
    }
    return paddingLeft;
  },

  _setWidth: function _setWidth() {
    return this.el.style.width = this.g.zoomer.getAlignmentWidth() + "px";
  }
});
exports.default = View;