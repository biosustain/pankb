"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SeqCollection = require("./model/SeqCollection");

var _SeqCollection2 = _interopRequireDefault(_SeqCollection);

var _colorscheme = require("./g/colorscheme");

var _colorscheme2 = _interopRequireDefault(_colorscheme);

var _columns = require("./g/columns");

var _columns2 = _interopRequireDefault(_columns);

var _config = require("./g/config");

var _config2 = _interopRequireDefault(_config);

var _package = require("./g/package");

var _package2 = _interopRequireDefault(_package);

var _SelectionCol = require("./g/selection/SelectionCol");

var _SelectionCol2 = _interopRequireDefault(_SelectionCol);

var _user = require("./g/user");

var _user2 = _interopRequireDefault(_user);

var _visibility = require("./g/visibility");

var _visibility2 = _interopRequireDefault(_visibility);

var _visOrdering = require("./g/visOrdering");

var _visOrdering2 = _interopRequireDefault(_visOrdering);

var _zoomer = require("./g/zoomer");

var _zoomer2 = _interopRequireDefault(_zoomer);

var _StageScale = require("./g/StageScale");

var _StageScale2 = _interopRequireDefault(_StageScale);

var _Stage = require("./views/Stage");

var _Stage2 = _interopRequireDefault(_Stage);

var _file = require("./utils/file");

var _file2 = _interopRequireDefault(_file);

var _tree = require("./utils/tree");

var _tree2 = _interopRequireDefault(_tree);

var _proxy = require("./utils/proxy");

var _proxy2 = _interopRequireDefault(_proxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MV from backbone


// globals
var boneView = require("backbone-childs"); // models

var Eventhandler = require("biojs-events");

// MSA views


// statistics
var Stats = require("@bighatbio/stat.seqs");

// utils
var $ = require("jbone");


// opts is a dictionary consisting of
// @param el [String] id or reference to a DOM element
// @param seqs [SeqArray] Array of sequences for initlization
// @param conf [Dict] user config
// @param vis [Dict] config of visible views
// @param zoomer [Dict] display settings like columnWidth
var MSA = boneView.extend({

  initialize: function initialize(data) {
    var _this = this;

    if (!(typeof data !== "undefined" && data !== null)) {
      data = {};
    }
    // check for default arrays
    if (!(data.colorscheme != null)) {
      data.colorscheme = {};
    }
    if (!(data.columns != null)) {
      data.columns = {};
    }
    if (!(data.conf != null)) {
      data.conf = {};
    }
    if (!(data.vis != null)) {
      data.vis = {};
    }
    if (!(data.visorder != null)) {
      data.visorder = {};
    }
    if (!(data.zoomer != null)) {
      data.zoomer = {};
    }
    if (!(data.conserv != null)) {
      data.conserv = {};
    }
    if (!(data.scale != null)) {
      data.scale = {};
    }

    // g is our global Mediator
    this.g = Eventhandler.mixin({});

    // load seqs and add subviews
    this.seqs = this.g.seqs = new _SeqCollection2.default(data.seqs, this.g);

    // populate it and init the global models
    this.g.config = new _config2.default(data.conf);
    this.g.package = new _package2.default(this.g);
    this.g.selcol = new _SelectionCol2.default([], { g: this.g });
    this.g.user = new _user2.default();
    this.g.vis = new _visibility2.default(data.vis, { model: this.seqs });
    this.g.visorder = new _visOrdering2.default(data.visorder);
    this.g.zoomer = new _zoomer2.default(data.zoomer, { g: this.g, model: this.seqs });

    this.g.scale = new _StageScale2.default(data.scale, { g: this.g });

    // store config options for plugins
    this.g.conservationConfig = data.conserv;

    // debug mode
    if (window.location.hostname === "localhost") {
      this.g.config.set("debug", true);
    }

    this._loadSeqs(data);

    // utils
    this.u = {};
    this.u.file = new _file2.default(this);
    this.u.proxy = new _proxy2.default({ g: this.g });
    this.u.tree = new _tree2.default(this);

    if (this.g.config.get("eventBus") === true) {
      this.startEventBus();
    }

    if (this.g.config.get("dropImport")) {
      var events = { "dragover": this.dragOver,
        "drop": this.dropFile
      };
      this.delegateEvents(events);
    }

    if (data.importURL) {
      this.u.file.importURL(data.importURL, function () {
        return _this.render();
      });
    }

    if (data.bootstrapMenu) {
      // pass menu configuration to defaultmenu
      if (data.menu) {
        this.menuConfig = data.menu;
      }
      this.g.config.set("bootstrapMenu", true);
    }

    this.draw();
    // add models to the msa (convenience)
    return this.m();
  },

  _loadSeqs: function _loadSeqs(data) {
    // stats
    var pureSeq = this.seqs.pluck("seq");
    this.g.stats = new Stats(this.seqs, { useGaps: true });
    this.g.stats.alphabetSize = this.g.config.get("alphabetSize");
    this.g.columns = new _columns2.default(data.columns, this.g.stats); // for action on the columns like hiding

    // depending config
    this.g.colorscheme = new _colorscheme2.default(data.colorscheme, pureSeq, this.g.stats);

    // more init
    return this.g.zoomer.setEl(this.el, this.seqs);
  },

  // proxy to the utility package
  importURL: function importURL() {
    return this.u.file.importURL.apply(this.u.file, arguments);
  },

  // add models to the msa (convenience)
  m: function m() {
    var m = {};
    m.model = require("./model");
    m.selection = require("./g/selection/Selection");
    m.selcol = require("./g/selection/SelectionCol");
    m.view = require("backbone-viewj");
    m.boneView = require("backbone-childs");
    return this.m = m;
  },

  draw: function draw() {
    var _this2 = this;

    this.removeViews();

    this.addView("stage", new _Stage2.default({ model: this.seqs, g: this.g }));
    this.$el.addClass("biojs_msa_div");

    // bootstraps the menu bar by default -> destroys modularity
    if (this.g.config.get("bootstrapMenu")) {
      var menuDiv = document.createElement('div');
      var wrapperDiv = document.createElement('div');
      if (!this.el.parentNode) {
        wrapperDiv.appendChild(menuDiv);
        wrapperDiv.appendChild(this.el);
      } else {
        this.el.parentNode.replaceChild(wrapperDiv, this.el);
        wrapperDiv.appendChild(menuDiv);
        wrapperDiv.appendChild(this.el);
      }

      var bootstrapOpts = { el: menuDiv,
        msa: this
      };
      if (this.menuConfig) {
        bootstrapOpts.menu = this.menuConfig;
      }
      var defMenu = new msa.menu.defaultmenu(bootstrapOpts);
      defMenu.render();
    }

    return $(window).on("resize", function (e) {
      var f = function f() {
        return this.g.zoomer.autoResize();
      };
      return setTimeout(f.bind(_this2), 5);
    });
  },

  dragOver: function dragOver(e) {
    // prevent the normal browser actions
    e.preventDefault();
    e.target.className = 'hover';
    return false;
  },

  dropFile: function dropFile(e) {
    e.preventDefault();
    var files = e.target.files || e.dataTransfer.files;
    this.u.file.importFiles(files);
    return false;
  },

  startEventBus: function startEventBus() {
    var _this3 = this;

    var busObjs = ["config", "columns", "colorscheme", "selcol", "vis", "visorder", "zoomer"];
    return function () {
      var result = [];
      for (var i = 0, key; i < busObjs.length; i++) {
        key = busObjs[i];
        result.push(_this3._proxyToG(key));
      }
      return result;
    }();
  },


  _proxyToG: function _proxyToG(key) {
    return this.listenTo(this.g[key], "all", function (name, prev, now, opts) {
      // suppress duplicate events
      if (name === "change") {
        return;
      }
      // backbone uses the second argument for the next value -> swap
      if (typeof opts !== "undefined" && opts !== null) {
        return this.g.trigger(key + ":" + name, now, prev, opts);
      } else {
        return this.g.trigger(key + ":" + name, now, prev);
      }
    });
  },

  render: function render() {
    if (this.seqs === undefined || this.seqs.length === 0) {
      console.log("warning. empty seqs.");
    }
    this.renderSubviews();
    this.g.vis.set("loaded", true);
    return this;
  }
});
exports.default = MSA;