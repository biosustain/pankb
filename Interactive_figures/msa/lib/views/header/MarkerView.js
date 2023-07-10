"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _svg = require("../../utils/svg");

var svg = _interopRequireWildcard(_svg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var view = require("backbone-viewj");
var dom = require("dom-helper");
var jbone = require("jbone");


var MarkerView = view.extend({

  className: "biojs_msa_marker",

  initialize: function initialize(data) {
    this.g = data.g;
    this.listenTo(this.g.zoomer, "change:stepSize change:labelWidth change:columnWidth change:markerStepSize change:markerFontsize", this.render);
    this.listenTo(this.g.vis, "change:labels change:metacell", this.render);
    return this.manageEvents();
  },

  render: function render() {
    dom.removeAllChilds(this.el);

    var fontSize = this.g.zoomer.get("markerFontsize");
    var cellWidth = this.g.zoomer.get("columnWidth");
    var stepSize = this.g.zoomer.get("stepSize");
    var markerStepSize = this.g.zoomer.get("markerStepSize");

    var hidden = this.g.columns.get("hidden");

    this.el.style.fontSize = fontSize;

    var container = document.createElement("span");
    var nMax = this.model.getMaxLength();

    for (var n = 0; n < nMax; n++) {
      if (hidden.indexOf(n) >= 0) {
        var el = this.markerHidden(n, stepSize);
        if (!!el) container.appendChild(el);
        n += stepSize;
        continue;
      }
      var span = document.createElement("span");
      span.className = 'msa-col-header';
      span.style.width = cellWidth + "px";
      span.style.display = "inline-block";

      if ((n + 1) % markerStepSize === 0) {
        span.textContent = n + 1;
      } else if ((n + 1) % stepSize === 0) {
        span.textContent = ".";
      } else {
        span.textContent = " ";
      }
      span.rowPos = n;
      container.appendChild(span);
    }

    this.el.appendChild(container);
    return this;
  },

  markerHidden: function markerHidden(n, stepSize) {
    var _this = this;

    var hidden = this.g.columns.get("hidden").slice(0);

    var min = Math.max(0, n - stepSize);
    var prevHidden = true;
    for (var j = min; j <= n; j++) {
      prevHidden &= hidden.indexOf(j) >= 0;
    }

    // filter duplicates
    if (prevHidden) {
      return;
    }

    var nMax = this.model.getMaxLength();

    var length = 0;
    var index = -1;
    // accumlate multiple rows
    for (var n2 = n; n2 <= nMax; n2++) {
      if (!(index >= 0)) {
        index = hidden.indexOf(n2);
      } // sets the first index
      if (hidden.indexOf(n2) >= 0) {
        length++;
      } else {
        break;
      }
    }

    var s = svg.base({ height: 10, width: 10 });
    s.style.position = "relative";
    var triangle = svg.polygon({ points: "0,0 5,5 10,0", style: "fill:lime;stroke:purple;stroke-width:1"
    });
    jbone(triangle).on("click", function (evt) {
      hidden.splice(index, length);
      return _this.g.columns.set("hidden", hidden);
    });

    s.appendChild(triangle);
    return s;
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

  _onclick: function _onclick(evt) {
    var rowPos = evt.target.rowPos;
    var stepSize = this.g.zoomer.get("stepSize");
    return this.g.trigger("column:click", { rowPos: rowPos, stepSize: stepSize, evt: evt });
  },

  _onmousein: function _onmousein(evt) {
    var rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    var stepSize = this.g.zoomer.get("stepSize");
    return this.g.trigger("column:mousein", { rowPos: rowPos, stepSize: stepSize, evt: evt });
  },

  _onmouseout: function _onmouseout(evt) {
    var rowPos = this.g.zoomer.get("stepSize" * evt.rowPos);
    var stepSize = this.g.zoomer.get("stepSize");
    return this.g.trigger("column:mouseout", { rowPos: rowPos, stepSize: stepSize, evt: evt });
  }
});

exports.default = MarkerView;