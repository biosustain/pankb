"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = require("dom-helper");

var VisMenu = _menubuilder2.default.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    this.el.style.display = "inline-block";
    return this.listenTo(this.g.vis, "change", this.render);
  },

  render: function render() {
    var _this = this;

    this.removeAllNodes();
    this.setName("Vis.elements");

    var visElements = this.getVisElements();
    for (var i = 0, visEl; i < visElements.length; i++) {
      visEl = visElements[i];
      this._addVisEl(visEl);
    }

    // other
    this.addNode("Reset", function () {
      _this.g.vis.set("labels", true);
      _this.g.vis.set("sequences", true);
      _this.g.vis.set("metacell", true);
      _this.g.vis.set("conserv", true);
      _this.g.vis.set("labelId", true);
      _this.g.vis.set("labelName", true);
      _this.g.vis.set("labelCheckbox", false);
      _this.g.vis.set("seqlogo", false);
      _this.g.vis.set("gapHeader", false);
      _this.g.vis.set("leftHeader", true);
      _this.g.vis.set("metaGaps", true);
      _this.g.vis.set("metaIdentity", true);
      return _this.g.vis.set("metaLinks", true);
    });

    // TODO: make more efficient
    dom.removeAllChilds(this.el);
    this.el.appendChild(this.buildDOM());
    return this;
  },

  _addVisEl: function _addVisEl(visEl) {
    var _this2 = this;

    var style = {};

    if (this.g.vis.get(visEl.id)) {
      var pre = "Hide ";
      style.color = "red";
    } else {
      pre = "Show ";
      style.color = "green";
    }

    return this.addNode(pre + visEl.name, function () {
      return _this2.g.vis.set(visEl.id, !_this2.g.vis.get(visEl.id));
    }, { style: style
    });
  },


  getVisElements: function getVisElements() {
    var vis = [];
    vis.push({ name: "residues indices", id: "markers" });
    vis.push({ name: "ID/Label", id: "labels" });
    //vis.push name: "Sequences", id: "sequences"
    vis.push({ name: "meta info (Gaps/Ident)", id: "metacell" });
    vis.push({ name: "overview panel", id: "overviewbox" });
    vis.push({ name: "sequence logo", id: "seqlogo" });
    vis.push({ name: "gap weights", id: "gapHeader" });
    vis.push({ name: "conservation weights", id: "conserv" });
    vis.push({ name: "scale slider", id: "scaleslider" });
    //vis.push name: "Left header", id: "leftHeader"
    vis.push({ name: "Label", id: "labelName" });
    vis.push({ name: "ID", id: "labelId" });
    //vis.push name: "Label checkbox", id: "labelCheckbox"
    vis.push({ name: "gaps %", id: "metaGaps" });
    vis.push({ name: "identity score", id: "metaIdentity" });
    // vis.push name: "Meta links", id: "metaLinks"
    return vis;
  }
});
exports.default = VisMenu;