"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Selection = require("./Selection");

var _lodash = require("lodash");

var Collection = require("backbone-thin").Collection;

// holds the current user selection
var SelectionManager = Collection.extend({

  model: _Selection.sel,

  initialize: function initialize(data, opts) {
    if (typeof opts !== "undefined" && opts !== null) {
      this.g = opts.g;

      this.listenTo(this.g, "residue:click", function (e) {
        return this._handleE(e.evt, new _Selection.possel({
          xStart: e.rowPos,
          xEnd: e.rowPos,
          seqId: e.seqId
        }));
      });

      this.listenTo(this.g, "row:click", function (e) {
        return this._handleE(e.evt, new _Selection.rowsel({
          seqId: e.seqId
        }));
      });

      return this.listenTo(this.g, "column:click", function (e) {
        return this._handleE(e.evt, new _Selection.columnsel({
          xStart: e.rowPos,
          xEnd: e.rowPos + e.stepSize - 1
        }));
      });
    }
  },

  getSelForRow: function getSelForRow(seqId) {
    return this.filter(function (el) {
      return el.inRow(seqId);
    });
  },

  getSelForColumns: function getSelForColumns(rowPos) {
    return this.filter(function (el) {
      return el.inColumn(rowPos);
    });
  },

  addJSON: function addJSON(model) {
    return this.add(this._fromJSON(model));
  },

  _fromJSON: function _fromJSON(model) {
    switch (model.type) {
      case "column":
        return new _Selection.columnsel(model);
      case "row":
        return new _Selection.rowsel(model);
      case "pos":
        return new _Selection.possel(model);
    }
  },

  // allows normal JSON input
  resetJSON: function resetJSON(arr) {
    arr = arr.map(this._fromJSON);
    return this.reset(arr);
  },

  // @returns array of all selected residues for a row
  getBlocksForRow: function getBlocksForRow(seqId, maxLen) {
    var selis = this.filter(function (el) {
      return el.inRow(seqId);
    });
    var blocks = [];

    var _loop = function _loop(i, seli) {
      var seli = selis[i];
      if (seli.attributes.type === "row") {
        blocks = function () {
          var result = [];
          var i1 = 0;
          if (0 <= maxLen) {
            while (i1 <= maxLen) {
              result.push(i1++);
            }
          } else {
            while (i1 >= maxLen) {
              result.push(i1--);
            }
          }
          return result;
        }();
        return "break";
      } else {
        blocks = blocks.concat(function () {
          var result = [];
          var i1 = seli.attributes.xStart;
          if (seli.attributes.xStart <= seli.attributes.xEnd) {
            while (i1 <= seli.attributes.xEnd) {
              result.push(i1++);
            }
          } else {
            while (i1 >= seli.attributes.xEnd) {
              result.push(i1--);
            }
          }
          return result;
        }());
      }
    };

    for (var i = 0, seli; i < selis.length; i++) {
      var _ret = _loop(i, seli);

      if (_ret === "break") break;
    }
    return blocks;
  },

  // @returns array with all columns being selected
  // example: 0-4... 12-14 selected -> [0,1,2,3,4,12,13,14]
  getAllColumnBlocks: function getAllColumnBlocks(conf) {
    var maxLen = conf.maxLen;
    var withPos = conf.withPos;
    var blocks = [];
    var filtered = void 0;
    if (conf.withPos) {
      filtered = this.filter(function (el) {
        return el.get('xStart') != null;
      });
    } else {
      filtered = this.filter(function (el) {
        return el.get('type') === "column";
      });
    }

    var _loop2 = function _loop2(i, seli) {
      var seli = filtered[i];
      blocks = blocks.concat(function () {
        var result = [];
        var i1 = seli.attributes.xStart;
        if (seli.attributes.xStart <= seli.attributes.xEnd) {
          while (i1 <= seli.attributes.xEnd) {
            result.push(i1++);
          }
        } else {
          while (i1 >= seli.attributes.xEnd) {
            result.push(i1--);
          }
        }
        return result;
      }());
    };

    for (var i = 0, seli; i < filtered.length; i++) {
      _loop2(i, seli);
    }
    blocks = (0, _lodash.uniq)(blocks);
    return blocks;
  },

  // inverts the current selection for columns
  // @param rows [Array] all available seqId
  invertRow: function invertRow(rows) {
    var selRows = this.where({ type: "row" });
    selRows = selRows.map(function (el) {
      return el.attributes.seqId;
    });
    var inverted = (0, _lodash.filter)(rows, function (el) {
      if (selRows.indexOf(el) >= 0) {
        return false;
      } // existing selection
      return true;
    });
    // mass insert
    var s = [];
    for (var i = 0, el; i < inverted.length; i++) {
      var el = inverted[i];
      s.push(new _Selection.rowsel({ seqId: el }));
    }
    return this.reset(s);
  },

  // inverts the current selection for rows
  // @param rows [Array] all available rows (0..max.length)
  invertCol: function invertCol(columns) {
    var selColumns = this.where({ type: "column" }).reduce(function (memo, el) {
      return memo.concat(function () {
        var result = [];
        var i = el.attributes.xStart;
        if (el.attributes.xStart <= el.attributes.xEnd) {
          while (i <= el.attributes.xEnd) {
            result.push(i++);
          }
        } else {
          while (i >= el.attributes.xEnd) {
            result.push(i--);
          }
        }
        return result;
      }());
    }, []);
    var inverted = (0, _lodash.filter)(columns, function (el) {
      if (selColumns.indexOf(el) >= 0) {
        // existing selection
        return false;
      }
      return true;
    });
    // mass insert
    if (inverted.length === 0) {
      return;
    }
    var s = [];
    var xStart = inverted[0];
    var xEnd = xStart;
    for (var i = 0, el; i < inverted.length; i++) {
      el = inverted[i];
      if (xEnd + 1 === el) {
        // contiguous
        xEnd = el;
      } else {
        // gap between
        s.push(new _Selection.columnsel({ xStart: xStart, xEnd: xEnd }));
        xStart = xEnd = el;
      }
    }
    // check for last gap
    if (xStart !== xEnd) {
      s.push(new _Selection.columnsel({ xStart: xStart, xEnd: inverted[inverted.length - 1] }));
    }
    return this.reset(s);
  },

  // method to decide whether to start a new selection
  // or append to the old one (depending whether CTRL was pressed)
  _handleE: function _handleE(e, selection) {
    if (e.ctrlKey || e.metaKey) {
      return this.add(selection);
    } else {
      return this.reset([selection]);
    }
  },

  // experimental reduce method for columns
  _reduceColumns: function _reduceColumns() {
    return this.each(function (el, index, arr) {
      var cols = (0, _lodash.filter)(arr, function (el) {
        return el.get('type') === 'column';
      });
      var xStart = el.get('xStart');
      var xEnd = el.get('xEnd');

      var lefts = (0, _lodash.filter)(cols, function (el) {
        return el.get('xEnd') === xStart - 1;
      });
      for (var i = 0, left; i < lefts.length; i++) {
        var left = lefts[i];
        left.set('xEnd', xStart);
      }

      var rights = (0, _lodash.filter)(cols, function (el) {
        return el.get('xStart') === xEnd + 1;
      });
      for (var j = 0, right; j < rights.length; j++) {
        var right = rights[j];
        right.set('xStart', xEnd);
      }

      if (lefts.length > 0 || rights.length > 0) {
        console.log("removed el");
        return el.collection.remove(el);
      }
    });
  }
});
exports.default = SelectionManager;