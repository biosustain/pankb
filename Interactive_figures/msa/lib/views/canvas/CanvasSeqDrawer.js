'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require('lodash');

var Drawer = {

  // caching the access is done for performance reasons
  updateConfig: function updateConfig() {
    this.rectWidth = this.g.zoomer.get('columnWidth');
    this.rectHeight = this.g.zoomer.get('rowHeight');
  },

  drawLetters: function drawLetters() {

    this.updateConfig();

    // rects
    this.ctx.globalAlpha = this.g.colorscheme.get("opacity");
    this.drawSeqs(function (data) {
      return this.drawSeq(data, this._drawRect);
    });
    this.ctx.globalAlpha = 1;

    // letters
    if (this.rectWidth >= this.g.zoomer.get('minLetterDrawSize')) {
      this.drawSeqs(function (data) {
        return this.drawSeq(data, this._drawLetter);
      });
    }

    return this;
  },

  drawSeqs: function drawSeqs(callback, target) {
    var hidden = this.g.columns.get("hidden");

    target = target || this;

    var _getStartSeq = this.getStartSeq(),
        _getStartSeq2 = _slicedToArray(_getStartSeq, 2),
        start = _getStartSeq2[0],
        y = _getStartSeq2[1];

    for (var i = start; i < this.model.length; i++) {
      var seq = this.model.at(i);
      if (seq.get('hidden')) {
        continue;
      }
      callback.call(target, { model: seq, yPos: y, y: i, hidden: hidden });

      var seqHeight = (seq.attributes.height || 1) * this.rectHeight;
      y = y + seqHeight;

      // out of viewport - stop
      if (y > this.height) {
        break;
      }
    }
  },

  // calls the callback for every drawable row
  drawRows: function drawRows(callback, target) {
    return this.drawSeqs(function (data) {
      return this.drawRow(data, callback, target);
    });
  },

  // draws a single row
  drawRow: function drawRow(data, callback, target) {
    var rectWidth = this.g.zoomer.get("columnWidth");
    var start = Math.max(0, Math.abs(Math.ceil(-this.g.zoomer.get('_alignmentScrollLeft') / rectWidth)));
    var x = -Math.abs(-this.g.zoomer.get('_alignmentScrollLeft') % rectWidth);

    var xZero = x - start * rectWidth;
    var yZero = data.yPos;
    return callback.call(target, { model: data.model, xZero: xZero, yZero: yZero, hidden: data.hidden });
  },

  // returns first sequence in the viewport
  // y is the position to start drawing
  getStartSeq: function getStartSeq() {
    var start = Math.max(0, Math.floor(this.g.zoomer.get('_alignmentScrollTop') / this.rectHeight)) + 1;
    var counter = 0;
    var i = 0;
    while (counter < start && i < this.model.length) {
      counter += this.model.at(i).attributes.height || 1;
      i++;
    }
    var y = Math.max(0, this.g.zoomer.get('_alignmentScrollTop') - counter * this.rectHeight + (this.model.at(i - 1).attributes.height || 1) * this.rectHeight);
    return [i - 1, -y];
  },

  // returns [the clicked seq for a viewport, row number]
  _getSeqForYClick: function _getSeqForYClick(click) {
    var _getStartSeq3 = this.getStartSeq(),
        _getStartSeq4 = _slicedToArray(_getStartSeq3, 2),
        start = _getStartSeq4[0],
        yDiff = _getStartSeq4[1];

    var yRel = yDiff % this.rectHeight;
    var clickedRows = Math.max(0, Math.floor((click - yRel) / this.rectHeight)) + 1;
    var counter = 0;
    var i = start;
    while (counter < clickedRows && i < this.model.length) {
      counter += this.model.at(i).attributes.height || 1;
      i++;
    }
    var rowNumber = Math.max(0, Math.floor(click / this.rectHeight) - counter + (this.model.at(i - 1).get("height") || 1));
    return [i - 1, rowNumber];
  },

  // TODO: very expensive method
  drawSeq: function drawSeq(data, callback) {
    var seq = data.model.get("seq");
    var y = data.yPos;
    var rectWidth = this.rectWidth;
    var rectHeight = this.rectHeight;

    // skip unneeded blocks at the beginning
    var start = Math.max(0, Math.abs(Math.ceil(-this.g.zoomer.get('_alignmentScrollLeft') / rectWidth)));
    var x = -Math.abs(-this.g.zoomer.get('_alignmentScrollLeft') % rectWidth);

    var res = { rectWidth: rectWidth, rectHeight: rectHeight, yPos: y, y: data.y };
    var elWidth = this.width;

    for (var j = start; j < seq.length; j++) {
      var c = seq[j];
      c = c.toUpperCase();

      // call the custom function
      res.x = j;
      res.c = c;
      res.xPos = x;

      // local call is faster than apply
      // http://jsperf.com/function-calls-direct-vs-apply-vs-call-vs-bind/6
      if (data.hidden.indexOf(j) < 0) {
        callback(this, res);
      } else {
        continue;
      }

      // move to the right
      x = x + rectWidth;

      // out of viewport - stop
      if (x > elWidth) {
        break;
      }
    }
  },

  _drawRect: function _drawRect(that, data) {
    var color = that.color.getColor(data.c, {
      pos: data.x,
      y: data.y
    });
    if (typeof color !== "undefined" && color !== null) {
      that.ctx.fillStyle = color;
      return that.ctx.fillRect(data.xPos, data.yPos, data.rectWidth, data.rectHeight);
    }
  },

  // REALLY expensive call on FF
  // Performance:
  // chrome: 2000ms drawLetter - 1000ms drawRect
  // FF: 1700ms drawLetter - 300ms drawRect
  _drawLetter: function _drawLetter(that, data) {
    return that.ctx.drawImage(that.cache.getFontTile(data.c, data.rectWidth, data.rectHeight), data.xPos, data.yPos, data.rectWidth, data.rectHeight);
  }
};

var CanvasSeqDrawer = function CanvasSeqDrawer(g, ctx, model, opts) {
  this.g = g;
  this.ctx = ctx;
  this.model = model;
  this.width = opts.width;
  this.height = opts.height;
  this.color = opts.color;
  this.cache = opts.cache;
  this.rectHeight = this.g.zoomer.get("rowHeight");
  this.rectWidth = this.g.zoomer.get("columnWidth"); // note: this can change
  return this;
};

(0, _lodash.extend)(CanvasSeqDrawer.prototype, Drawer);
exports.default = CanvasSeqDrawer;