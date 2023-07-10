"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

var _Sequence = require("../../model/Sequence");

var _Sequence2 = _interopRequireDefault(_Sequence);

var _loader = require("../../utils/loader");

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xhr = require("xhr");

var ExtraMenu = _menubuilder2.default.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    this.el.style.display = "inline-block";
    return this.msa = data.msa;
  },

  render: function render() {
    var _this = this;

    this.setName("Extras");
    var stats = this.g.stats;
    var msa = this.msa;
    this.addNode("Add consensus seq", function () {
      var con = stats.consensus();
      var seq = new _Sequence2.default({
        seq: con,
        id: "0c",
        name: "Consenus"
      });
      _this.model.add(seq);
      _this.model.setRef(seq);
      _this.model.comparator = function (seq) {
        return !seq.get("ref");
      };
      return _this.model.sort();
    });

    // @addNode "Calc Tree", ->
    //   # this is a very experimental feature
    //   # TODO: exclude msa & tnt in the adapter package
    //   newickStr = ""
    //
    //   cbs = Loader.joinCb ->
    //     msa.u.tree.showTree nwkData
    //   , 2, @
    //
    //   msa.u.tree.loadTree cbs
    //   # load fake tree
    //   nwkData =
    //     name: "root",
    //     children: [
    //       name: "c1",
    //       branch_length: 4
    //       children: msa.seqs.filter (f,i) ->  i % 2 is 0
    //     ,
    //       name: "c2",
    //       children: msa.seqs.filter (f,i) ->  i % 2 is 1
    //       branch_length: 4
    //     ]
    //   msa.seqs.each (s) ->
    //     s.set "branch_length", 2
    //   cbs()

    this.addNode("Jump to a column", function () {
      var offset = prompt("Column", "20");
      if (offset < 0 || offset > _this.model.getMaxLength() || isNaN(offset)) {
        alert("invalid column");
        return;
      }
      return _this.g.zoomer.setLeftOffset(offset);
    });

    this.el.appendChild(this.buildDOM());
    return this;
  }
});
exports.default = ExtraMenu;