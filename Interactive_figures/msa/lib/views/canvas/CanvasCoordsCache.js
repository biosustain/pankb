"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var Events = require("biojs-events");

var cache = {
  setMaxScrollHeight: function setMaxScrollHeight() {
    return this.maxScrollHeight = this.g.zoomer.getMaxAlignmentHeight() - this.g.zoomer.get('alignmentHeight');
  },
  setMaxScrollWidth: function setMaxScrollWidth() {
    return this.maxScrollWidth = this.g.zoomer.getMaxAlignmentWidth() - this.g.zoomer.getAlignmentWidth();
  }
};

var CacheConstructor = function CacheConstructor(g, model) {
  this.g = g;
  this.model = model;
  this.maxScrollWidth = 0;
  this.maxScrollHeight = 0;
  this.setMaxScrollHeight();
  this.setMaxScrollWidth();

  this.listenTo(this.g.zoomer, "change:rowHeight", this.setMaxScrollHeight);
  this.listenTo(this.g.zoomer, "change:columnWidth", this.setMaxScrollWidth);
  this.listenTo(this.g.zoomer, "change:alignmentWidth", this.setMaxScrollWidth);
  this.listenTo(this.g.zoomer, "change:alignmentHeight", this.setMaxScrollHeight);
  this.listenTo(this.model, "add change reset", function () {
    this.setMaxScrollHeight();
    return this.setMaxScrollWidth();
  }, this);
  return this;
};

(0, _lodash.extend)(CacheConstructor.prototype, cache);
Events.mixin(CacheConstructor.prototype);
exports.default = CacheConstructor;