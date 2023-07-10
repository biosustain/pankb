"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsel = exports.rowsel = exports.possel = exports.sel = undefined;

var _lodash = require("lodash");

var Model = require("backbone-thin").Model;

// holds the current user selection
var Selection = Model.extend({
  defaults: { type: "super" }
});

var RowSelection = Selection.extend({
  defaults: (0, _lodash.extend)({}, Selection.prototype.defaults, { type: "row",
    seqId: ""
  }),

  inRow: function inRow(seqId) {
    return seqId === this.get("seqId");
  },
  inColumn: function inColumn(rowPos) {
    return true;
  },
  getLength: function getLength() {
    return 1;
  }
});

var ColumnSelection = Selection.extend({
  defaults: (0, _lodash.extend)({}, Selection.prototype.defaults, { type: "column",
    xStart: -1,
    xEnd: -1
  }),

  inRow: function inRow() {
    return true;
  },
  inColumn: function inColumn(rowPos) {
    return xStart <= rowPos && rowPos <= xEnd;
  },
  getLength: function getLength() {
    return xEnd - xStart;
  }
});

// pos is a mixin of column and row
// start with Row and only overwrite "inColumn" from Column
var PosSelection = RowSelection.extend((0, _lodash.extend)({}, (0, _lodash.pick)(ColumnSelection, "inColumn"), (0, _lodash.pick)(ColumnSelection, "getLength"),
// merge both defaults
{ defaults: (0, _lodash.extend)({}, ColumnSelection.prototype.defaults, RowSelection.prototype.defaults, { type: "pos"
  })
}));

exports.sel = Selection;
exports.possel = PosSelection;
exports.rowsel = RowSelection;
exports.columnsel = ColumnSelection;