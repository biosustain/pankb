"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

var _exporter = require("../../utils/exporter");

var _exporter2 = _interopRequireDefault(_exporter);

var _bio = require("bio.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FastaExporter = _bio.fasta.write;

var ShareSym = "\u21AA";

var ExportMenu = _menubuilder2.default.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    this.msa = data.msa;
    return this.el.style.display = "inline-block";
  },

  render: function render() {
    var _this = this;

    this.setName("Export");

    this.addNode("Share view (URL)" + ShareSym, function () {
      return _exporter2.default.shareLink(_this.msa, function (link) {
        return window.open(link, '_blank');
      });
    });

    this.addNode("View in Jalview", function () {
      var url = _this.g.config.get('url');
      if (!(typeof url !== "undefined" && url !== null)) {
        return alert("Sequence weren't imported via an URL");
      } else {
        if (url.indexOf("localhost" || url === "dragimport")) {
          return _exporter2.default.publishWeb(_this.msa, function (link) {
            return _exporter2.default.openInJalview(link, _this.g.colorscheme.get("scheme"));
          });
        } else {
          return _exporter2.default.openInJalview(url, _this.g.colorscheme.get("scheme"));
        }
      }
    });

    this.addNode("Export alignment (FASTA)", function () {
      return _exporter2.default.saveAsFile(_this.msa, "all.fasta");
    });

    this.addNode("Export alignment (URL)", function () {
      return _exporter2.default.publishWeb(_this.msa, function (link) {
        return window.open(link, '_blank');
      });
    });

    this.addNode("Export selected sequences (FASTA)", function () {
      return _exporter2.default.saveSelection(_this.msa, "selection.fasta");
    });

    this.addNode("Export features (GFF)", function () {
      return _exporter2.default.saveAnnots(_this.msa, "features.gff3");
    });

    this.addNode("Export MSA image (PNG)", function () {
      return _exporter2.default.saveAsImg(_this.msa, "biojs-msa.png");
    });

    this.el.appendChild(this.buildDOM());
    return this;
  }
});
exports.default = ExportMenu;