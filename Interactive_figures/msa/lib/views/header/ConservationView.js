"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _svg = require("../../utils/svg");

var svg = _interopRequireWildcard(_svg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var view = require("backbone-viewj");
var dom = require("dom-helper");


var ConservationView = view.extend({

  className: "biojs_msa_conserv",

  initialize: function initialize(data) {
    this.g = data.g;
    this.listenTo(this.g.zoomer, "change:stepSize change:labelWidth change:columnWidth", this.render);
    this.listenTo(this.g.vis, "change:labels change:metacell", this.render);
    this.listenTo(this.g.columns, "change:scaling", this.render);
    // we need to wait until stats gives us the ok
    //@listenTo @model, "reset",@render
    this.listenTo(this.g.stats, "reset", this.render);

    var opts = _.extend({}, {
      fillColor: ['#660', '#ff0'],
      strokeColor: '#330',
      maxHeight: 20,
      rectStyler: function rectStyler(rect, data) {
        return rect;
      }
    }, this.g.conservationConfig);

    this.fillColor = opts.fillColor;
    this.strokeColor = opts.strokeColor;
    this.maxHeight = opts.maxHeight;
    this.rectStyler = opts.rectStyler;

    return this.manageEvents();
  },

  // returns a function that will decide a colour
  // based on the conservation data it is given
  colorer: function colorer(colorRange) {
    var colorer = function colorer() {
      return "none";
    };

    if (typeof colorRange === 'string') {
      colorer = function colorer() {
        return colorRange;
      };
    } else if (Array.isArray(colorRange)) {
      if (colorRange.length != 2) {
        console.error("ERROR: colorRange array should have exactly two elements", colorRange);
      }

      // d3 is shipped modular nowadays - we can support both
      var d3BundledScale = typeof d3 != "undefined" && !!d3.scale;
      var d3SeperatedScale = typeof d3_scale != "undefined";
      if (!(d3BundledScale || d3SeperatedScale)) {
        console.warn("providing a [min/max] range as input requires d3 to be included - only using the first color");
        colorer = function colorer(d) {
          return colorRange[0];
        };
      } else {
        var d3LinearScale = d3BundledScale ? d3.scale.linear() : d3_scale.scaleLinear();
        var scale = d3LinearScale.domain([0, this.maxHeight]).range(colorRange);

        colorer = function colorer(d) {
          return scale(d.height);
        };
      }
    } else {
      console.warn("expected colorRange to be '#rgb' or ['#rgb', '#rgb']", colorRange, '(' + (typeof colorRange === "undefined" ? "undefined" : _typeof(colorRange)) + ')');
    }
    return colorer;
  },

  render: function render() {
    var conserv = this.g.stats.scale(this.g.stats.conservation());

    dom.removeAllChilds(this.el);

    var nMax = this.model.getMaxLength();
    var cellWidth = this.g.zoomer.get("columnWidth");
    var maxHeight = this.maxHeight;
    var width = cellWidth * (nMax - this.g.columns.get('hidden').length);

    var s = svg.base({ height: maxHeight, width: width });
    s.style.display = "inline-block";
    s.style.cursor = "pointer";

    var rectData = this.rectData;
    var fillColorer = this.colorer(this.fillColor);
    var strokeColorer = this.colorer(this.strokeColor);
    var rectStyler = this.rectStyler;

    var stepSize = this.g.zoomer.get("stepSize");
    var hidden = this.g.columns.get("hidden");
    var x = 0;
    var n = 0;
    while (n < nMax) {
      if (hidden.indexOf(n) >= 0) {
        n += stepSize;
        continue;
      }
      width = cellWidth * stepSize;
      var avgHeight = 0;
      var end = stepSize - 1;
      for (var i = 0; 0 < end ? i <= end : i >= end; 0 < end ? i++ : i--) {
        avgHeight += conserv[n];
      }
      var height = maxHeight * (avgHeight / stepSize);

      var d = {
        x: x,
        y: maxHeight - height,
        maxheight: maxHeight,
        width: width - cellWidth / 4,
        height: height,
        rowPos: n
      };

      var rect = svg.rect(d);

      rect.style.stroke = strokeColorer(d);
      rect.style.fill = fillColorer(d);

      if (typeof rectStyler === 'function') {
        rectStyler(rect, d);
      }

      rect.rowPos = n;

      s.appendChild(rect);
      x += width;
      n += stepSize;
    }

    this.el.appendChild(s);
    return this;
  },

  //TODO: make more general with HeaderView
  _onclick: function _onclick(evt) {
    var _this = this;

    var rowPos = evt.target.rowPos;
    var stepSize = this.g.zoomer.get("stepSize");
    // simulate hidden columns
    return function () {
      var result = [];
      var end = stepSize - 1;
      for (var i = 0; 0 < end ? i <= end : i >= end; 0 < end ? i++ : i--) {
        result.push(_this.g.trigger("bar:click", { rowPos: rowPos + i, evt: evt }));
      }
      return result;
    }();
  },

  manageEvents: function manageEvents() {
    var events = {};
    if (this.g.config.get("registerMouseClicks")) {
      events.click = "_onclick";
    }
    if (this.g.config.get("registerMouseHover")) {
      events.mousein = "_onmousein";
      events.mouseout = "_onmouseout";
    }
    this.delegateEvents(events);
    this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents);
    return this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents);
  },

  _onmousein: function _onmousein(evt) {
    var rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    return this.g.trigger("bar:mousein", { rowPos: rowPos, evt: evt });
  },

  _onmouseout: function _onmouseout(evt) {
    var rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    return this.g.trigger("bar:mouseout", { rowPos: rowPos, evt: evt });
  }
});

exports.default = ConservationView;