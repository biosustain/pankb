"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _AlignmentBody = require("./AlignmentBody");

var _AlignmentBody2 = _interopRequireDefault(_AlignmentBody);

var _HeaderBlock = require("./header/HeaderBlock");

var _HeaderBlock2 = _interopRequireDefault(_HeaderBlock);

var _OverviewBox = require("./OverviewBox");

var _OverviewBox2 = _interopRequireDefault(_OverviewBox);

var _Search = require("./Search");

var _Search2 = _interopRequireDefault(_Search);

var _ScaleSlider = require("./ScaleSlider");

var _ScaleSlider2 = _interopRequireDefault(_ScaleSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boneView = require("backbone-childs");


// a neat collection view
var View = boneView.extend({

  initialize: function initialize(data) {
    this.g = data.g;

    this.draw();
    //@listenTo @model,"reset", ->
    // we need to wait until stats gives us the ok
    this.listenTo(this.g.stats, "reset", function () {
      return this.rerender();
    });

    // debounce a bulk operation
    this.listenTo(this.model, "change:hidden", (0, _lodash.debounce)(this.rerender, 10));

    this.listenTo(this.model, "sort", this.rerender);
    this.listenTo(this.model, "add", function () {
      return console.log("seq add");
    });

    this.listenTo(this.g.vis, "change:sequences", this.rerender);
    this.listenTo(this.g.vis, "change:overviewbox", this.rerender);
    this.listenTo(this.g.visorder, "change", this.rerender);
    this.listenTo(this.g.zoomer, "change:columnWidth", this.rerender);
    this.listenTo(this.g.vis, "change:scaleslider", this.rerender);

    return this;
  },

  draw: function draw() {
    this.removeViews();

    if (this.g.vis.get("overviewbox")) {
      var overviewbox = new _OverviewBox2.default({ model: this.model, g: this.g });
      overviewbox.ordering = this.g.visorder.get('overviewBox');
      this.addView("overviewBox", overviewbox);
    }

    if (true) {
      var headerblock = new _HeaderBlock2.default({ model: this.model, g: this.g });
      headerblock.ordering = this.g.visorder.get('headerBox');
      this.addView("headerBox", headerblock);
    }

    if (true) {
      var searchblock = new _Search2.default({ model: this.model, g: this.g });
      searchblock.ordering = this.g.visorder.get('searchBox');
      this.addView("searchbox", searchblock);
    }

    var body = new _AlignmentBody2.default({ model: this.model, g: this.g });
    body.ordering = this.g.visorder.get('alignmentBody');
    this.addView("body", body);

    if (this.g.vis.get("scaleslider")) {
      var scaleslider = new _ScaleSlider2.default({ model: this.g.scale, g: this.g });
      scaleslider.ordering = this.g.visorder.get('scaleSlider');
      this.addView("scaleSlider", scaleslider);
    }

    return this;
  },

  render: function render(e) {
    this.renderSubviews();
    this.el.className = "biojs_msa_stage";
    return this;
  },

  rerender: function rerender() {
    if (!this.g.config.get("manualRendering")) {
      this.draw();
      return this.render();
    }
  }
});
exports.default = View;