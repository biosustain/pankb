"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bio = require("bio.io");

var _menubuilder = require("../../menu/menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var view = require("backbone-viewj");
var dom = require("dom-helper");


var MetaView = view.extend({

  className: "biojs_msa_metaview",

  initialize: function initialize(data) {
    this.g = data.g;
    this.listenTo(this.g.vis, "change:metacell", this.render);
    return this.listenTo(this.g.zoomer, "change:metaWidth", this.render);
  },

  events: { click: "_onclick",
    mousein: "_onmousein",
    mouseout: "_onmouseout"
  },

  render: function render() {
    dom.removeAllChilds(this.el);

    this.el.style.display = "inline-block";

    var width = this.g.zoomer.getMetaWidth();
    this.el.style.width = width - 10;
    this.el.style.paddingRight = 5;
    this.el.style.paddingLeft = 5;
    // TODO: why do we need to decrease the font size?
    // otherwise we see a scrollbar
    this.el.style.fontSize = this.g.zoomer.get('labelFontsize') - 2 + "px";

    if (this.g.vis.get("metaGaps")) {
      // adds gaps
      var seq = this.model.get('seq');
      var gaps = (0, _lodash.reduce)(seq, function (memo, c) {
        return c === '-' ? ++memo : undefined;
      }, 0);
      // 2-place percentage , e.g. 42%
      gaps = (gaps * 100 / seq.length).toFixed(0) + "%";

      // append gap count
      var gapSpan = document.createElement('span');
      gapSpan.textContent = gaps;
      gapSpan.style.display = "inline-block";
      gapSpan.style.width = 35;
      this.el.appendChild(gapSpan);
    }

    if (this.g.vis.get("metaIdentity")) {
      // identity
      // TODO: there must be a better way to pass the id
      var ident = this.g.stats.identity()[this.model.id];
      var identSpan = document.createElement('span');

      if (this.model.get("ref") && this.g.config.get("hasRef")) {
        identSpan.textContent = "ref.";
      } else if (typeof ident !== "undefined" && ident !== null) {
        identSpan.textContent = ident.toFixed(2);
      }

      identSpan.style.display = "inline-block";
      identSpan.style.width = 40;
      this.el.appendChild(identSpan);
    }

    if (this.g.vis.get("metaLinks")) {
      // TODO: this menu builder is just an example how one could customize this
      // view
      if (this.model.attributes.ids) {
        var links = _bio.seqs.buildLinks(this.model.attributes.ids);
        if (Object.keys(links).length > 0) {
          var menu = new _menubuilder2.default({ name: "↗" });
          console.log(Object.keys(links));
          links.forEach(function (val, key) {
            return menu.addNode(key, function (e) {
              return window.open(val);
            });
          });

          var linkEl = menu.buildDOM();
          linkEl.style.cursor = "pointer";
          return this.el.appendChild(linkEl);
        }
      }
    }
  },

  //@el.style.height = "#{@g.zoomer.get "rowHeight"}px"

  _onclick: function _onclick(evt) {
    return this.g.trigger("meta:click", { seqId: this.model.get("id", { evt: evt }) });
  },

  _onmousein: function _onmousein(evt) {
    return this.g.trigger("meta:mousein", { seqId: this.model.get("id", { evt: evt }) });
  },

  _onmouseout: function _onmouseout(evt) {
    return this.g.trigger("meta:mouseout", { seqId: this.model.get("id", { evt: evt }) });
  }
});
exports.default = MetaView;