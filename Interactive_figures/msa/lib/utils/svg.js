"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// mini svg helper

var svgns = "http://www.w3.org/2000/svg";

var setAttr = function setAttr(obj, opts) {
  for (var name in opts) {
    var value = opts[name];
    obj.setAttributeNS(null, name, value);
  }
  return obj;
};

var Base = function Base(opts) {
  var svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute("width", opts.width);
  svg.setAttribute("height", opts.height);
  return svg;
};

var Rect = function Rect(opts) {
  var rect = document.createElementNS(svgns, 'rect');
  return setAttr(rect, opts);
};

var Line = function Line(opts) {
  var line = document.createElementNS(svgns, 'line');
  return setAttr(line, opts);
};

var Polygon = function Polygon(opts) {
  var line = document.createElementNS(svgns, 'polygon');
  return setAttr(line, opts);
};

exports.base = Base;
exports.line = Line;
exports.rect = Rect;
exports.polygon = Polygon;