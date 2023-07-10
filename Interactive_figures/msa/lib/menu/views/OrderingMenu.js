"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = require("dom-helper");
var arrowUp = "\u2191";
var arrowDown = "\u2193";

var OrderingMenu = _menubuilder2.default.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    this.order = "ID";
    return this.el.style.display = "inline-block";
  },

  setOrder: function setOrder(order) {
    this.order = order;
    return this.render();
  },

  // TODO: make more generic
  render: function render() {
    this.setName("Sorting");
    this.removeAllNodes();

    var comps = this.getComparators();
    for (var i = 0, m; i < comps.length; i++) {
      m = comps[i];
      this._addNode(m);
    }

    var el = this.buildDOM();

    // TODO: make more efficient
    dom.removeAllChilds(this.el);
    this.el.appendChild(el);
    return this;
  },

  _addNode: function _addNode(m) {
    var _this = this;

    var text = m.text;
    var style = {};
    if (text === this.order) {
      style.backgroundColor = "#77ED80";
    }
    return this.addNode(text, function () {
      if (m.precode != null) {
        m.precode();
      }
      _this.model.comparator = m.comparator;
      _this.model.sort();
      return _this.setOrder(m.text);
    }, {
      style: style
    });
  },


  getComparators: function getComparators() {
    var _this2 = this;

    var models = [];

    models.push({ text: "ID " + arrowUp, comparator: "id" });

    models.push({ text: "ID " + arrowDown, comparator: function comparator(a, b) {
        // auto converts to string for localeCompare
        return -("" + a.get("id")).localeCompare("" + b.get("id"), [], { numeric: true });
      } });

    models.push({ text: "Label " + arrowUp, comparator: "name" });

    models.push({ text: "Label " + arrowDown, comparator: function comparator(a, b) {
        return -a.get("name").localeCompare(b.get("name"));
      } });

    models.push({ text: "Seq " + arrowUp, comparator: "seq" });

    models.push({ text: "Seq " + arrowDown, comparator: function comparator(a, b) {
        return -a.get("seq").localeCompare(b.get("seq"));
      } });

    var setIdent = function setIdent() {
      return _this2.ident = _this2.g.stats.identity();
    };

    var setGaps = function setGaps() {
      _this2.gaps = {};
      return _this2.model.each(function (el) {
        var seq = el.attributes.seq;
        return _this2.gaps[el.id] = (seq.reduce(function (memo, c) {
          return c === '-' ? ++memo : undefined;
        }), 0) / seq.length;
      });
    };

    models.push({ text: "Identity " + arrowUp, comparator: function comparator(a, b) {
        var val = _this2.ident[a.id] - _this2.ident[b.id];
        console.log(_this2.ident[a.id], _this2.ident[b.id]);
        if (val > 0) {
          return 1;
        }
        if (val < 0) {
          return -1;
        }
        return 0;
      }, precode: setIdent });

    models.push({ text: "Identity " + arrowDown, comparator: function comparator(a, b) {
        var val = _this2.ident[a.id] - _this2.ident[b.id];
        if (val > 0) {
          return -1;
        }
        if (val < 0) {
          return 1;
        }
        return 0;
      }, precode: setIdent });

    models.push({ text: "Gaps " + arrowUp, comparator: function comparator(a, b) {
        var val = _this2.gaps[a.id] - _this2.gaps[b.id];
        if (val > 0) {
          return 1;
        }
        if (val < 0) {
          return -1;
        }
        return 0;
      }, precode: setGaps });

    models.push({ text: "Gaps " + arrowDown, comparator: function comparator(a, b) {
        var val = _this2.gaps[a.id] - _this2.gaps[b.id];
        if (val < 0) {
          return 1;
        }
        if (val > 0) {
          return -1;
        }
        return 0;
      }, precode: setGaps });

    models.push({ text: "Consensus to top", comparator: function comparator(seq) {
        return !seq.get("ref");
      }
    });

    return models;
  }
});
exports.default = OrderingMenu;