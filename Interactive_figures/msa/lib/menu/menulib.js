"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var jbone = require("jbone");
var view = require("backbone-viewj");

// This could has been inlined from https://github.com/wilzbach/menu-builder
// It is intended to be replaced with in-MSA controls
// see https://github.com/wilzbach/msa/issues/149 for more details

var MenuBuilder = view.extend({
  initialize: function initialize(opts) {
    this._nodes = [];
    this.name = opts.name || "";
    this.el.className += "smenubar";
  },
  render: function render() {

    // remove all childs
    var fc = this.el.firstChild;
    while (fc) {
      this.el.removeChild(fc);
      fc = this.el.firstChild;
    }

    // replace child
    this.el.appendChild(this.buildDOM());
  },
  setName: function setName(name) {
    this.name = name;
  },
  addNode: function addNode(label, callback, opts) {
    var style = void 0;
    if (opts != null) {
      style = opts.style;
    }
    if (this._nodes == null) {
      this._nodes = [];
    }
    this._nodes.push({
      label: label,
      callback: callback,
      style: style
    });
  },

  getNode: function getNode(label) {
    var rNode = void 0;
    this._nodes.forEach(function (el) {
      if (el.label === label) {
        rNode = el;
      }
    });
    return rNode;
  },

  modifyNode: function modifyNode(label, callback, opts) {
    var node = this.getNode(label);
    node.callback = callback || node.callback;
    opts = opts || {};
    node.style = opts.style || node.style;
  },

  renameNode: function renameNode(label, newLabel) {
    var node = this.getNode(label);
    node.label = newLabel || node.label;
  },

  removeNode: function removeNode(label) {
    var node = this.getNode(label);
    this._nodes.splice(this._nodes.indexOf(node), 1);
  },

  removeAllNodes: function removeAllNodes() {
    this._nodes = [];
  },

  buildDOM: function buildDOM() {
    var span = document.createElement("span");
    span.appendChild(this._buildM({
      nodes: this._nodes,
      name: this.name
    }));
    return span;
  },
  _buildM: function _buildM(data) {
    var displayedButton = void 0,
        frag = void 0,
        key = void 0,
        li = void 0,
        node = void 0,
        style = void 0,
        _ref = void 0;
    var nodes = data.nodes;
    var name = data.name;
    var menu = document.createElement("div");
    menu.className = "smenu-dropdown smenu-dropdown-tip";
    menu.style.display = "none";

    var menuUl = document.createElement("ul");
    menuUl.className = "smenu-dropdown-menu";

    // currently we support one-level
    for (var i = 0, _len = nodes.length; i < _len; i++) {
      node = nodes[i];
      li = document.createElement("li");
      li.textContent = node.label;
      _ref = node.style;
      for (key in _ref) {
        style = _ref[key];
        li.style[key] = style;
      }
      li.addEventListener("click", node.callback);
      this.trigger("new:node", li);
      menuUl.appendChild(li);
    }
    this.trigger("new:menu", menuUl);
    menu.appendChild(menuUl);

    displayedButton = document.createElement("a");
    displayedButton.textContent = name;
    displayedButton.className = "smenubar_alink";
    this.trigger("new:button", displayedButton);

    // HACK to be able to hide the submenu
    // listens globally for click events
    jbone(displayedButton).on("click", function (_this) {
      return function (e) {
        _this._showMenu(e, menu, displayedButton);
        return window.setTimeout(function () {
          return jbone(document.body).one("click", function (e) {
            return menu.style.display = "none";
          });
        }, 5);
      };
    }(this));

    frag = document.createDocumentFragment();
    frag.appendChild(menu);
    frag.appendChild(displayedButton);
    return frag;
  },

  // internal method to display the lower menu on a click
  _showMenu: function _showMenu(e, menu, target) {
    var rect = void 0;
    menu.style.display = "block";
    menu.style.position = "absolute";
    rect = target.getBoundingClientRect();
    //menu.style.left = rect.left + "px";
    //menu.style.top = (rect.top + target.offsetHeight) + "px";
  }
});
exports.default = MenuBuilder;