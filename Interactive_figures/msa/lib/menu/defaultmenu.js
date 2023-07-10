"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ImportMenu = require("./views/ImportMenu");

var _ImportMenu2 = _interopRequireDefault(_ImportMenu);

var _FilterMenu = require("./views/FilterMenu");

var _FilterMenu2 = _interopRequireDefault(_FilterMenu);

var _SelectionMenu = require("./views/SelectionMenu");

var _SelectionMenu2 = _interopRequireDefault(_SelectionMenu);

var _VisMenu = require("./views/VisMenu");

var _VisMenu2 = _interopRequireDefault(_VisMenu);

var _ColorMenu = require("./views/ColorMenu");

var _ColorMenu2 = _interopRequireDefault(_ColorMenu);

var _OrderingMenu = require("./views/OrderingMenu");

var _OrderingMenu2 = _interopRequireDefault(_OrderingMenu);

var _ExtraMenu = require("./views/ExtraMenu");

var _ExtraMenu2 = _interopRequireDefault(_ExtraMenu);

var _ExportMenu = require("./views/ExportMenu");

var _ExportMenu2 = _interopRequireDefault(_ExportMenu);

var _HelpMenu = require("./views/HelpMenu");

var _HelpMenu2 = _interopRequireDefault(_HelpMenu);

var _DebugMenu = require("./views/DebugMenu");

var _DebugMenu2 = _interopRequireDefault(_DebugMenu);

var _settings = require("./settings");

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boneView = require("backbone-childs");

// menu views


// this very basic menu demonstrates calls to the MSA component
var MenuView = boneView.extend({

  initialize: function initialize(data) {
    if (!data.msa) {
      throw new Error("No msa instance provided. Please provide .msa");
    }
    this.msa = data.msa;

    // add menu config to the global object
    this.msa.g.menuconfig = new _settings2.default(data.menu);

    this.addView("10_import", new _ImportMenu2.default({ model: this.msa.seqs, g: this.msa.g, msa: this.msa }));
    this.addView("15_ordering", new _OrderingMenu2.default({ model: this.msa.seqs, g: this.msa.g }));
    this.addView("20_filter", new _FilterMenu2.default({ model: this.msa.seqs, g: this.msa.g }));
    this.addView("30_selection", new _SelectionMenu2.default({ model: this.msa.seqs, g: this.msa.g }));
    this.addView("40_vis", new _VisMenu2.default({ model: this.msa.seqs, g: this.msa.g }));
    this.addView("50_color", new _ColorMenu2.default({ model: this.msa.seqs, g: this.msa.g }));
    this.addView("70_extra", new _ExtraMenu2.default({ model: this.msa.seqs, g: this.msa.g, msa: this.msa }));
    this.addView("80_export", new _ExportMenu2.default({ model: this.msa.seqs, g: this.msa.g, msa: this.msa }));
    this.addView("90_help", new _HelpMenu2.default({ g: this.msa.g }));
    if (this.msa.g.config.get("debug")) {
      return this.addView("95_debug", new _DebugMenu2.default({ g: this.msa.g }));
    }
  },

  render: function render() {
    this.renderSubviews();
    // other
    this.el.setAttribute("class", "smenubar");
    return this.el.appendChild(document.createElement("p"));
  }
});
exports.default = MenuView;