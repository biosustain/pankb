"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _menubuilder = require("../menubuilder");

var _menubuilder2 = _interopRequireDefault(_menubuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var k = require("koala-js");

var ImportMenu = _menubuilder2.default.extend({

  initialize: function initialize(data) {
    this.g = data.g;
    this.el.style.display = "inline-block";
    return this.msa = data.msa;
  },

  render: function render() {
    var _this = this;

    var msa = this.msa;
    var uploader = k.mk("input");
    uploader.type = "file";
    uploader.style.display = "none";
    //uploader.accept
    // http://www.w3schools.com/jsref/prop_fileupload_accept.asp
    // for now we allow multiple files
    uploader.multiple = true;
    uploader.addEventListener("change", function () {
      var files = uploader.files || [];
      return msa.u.file.importFiles(files);
    });

    this.el.appendChild(uploader);

    var filetypes = "(Fasta, Clustal, GFF, Jalview features, Newick)";

    this.setName("Import");
    this.addNode("URL", function (e) {
      var url = prompt("URL " + filetypes, "http://rostlab.org/~goldberg/clustalw2-I20140818-215249-0556-53699878-pg.clustalw");
      if (url.length > 5) {
        return _this.msa.u.file.importURL(url, function () {});
      }
    });
    // mass update on zoomer
    //zoomer = @g.zoomer.toJSON()
    //#zoomer.textVisible = false
    //#zoomer.columnWidth = 4
    //zoomer.boxRectHeight = 2
    //zoomer.boxRectWidth = 2
    //@g.zoomer.set zoomer

    this.addNode("From file " + filetypes, function () {
      return uploader.click();
    });

    this.addNode("Drag & Drop", function () {
      return alert("Yep. Just drag & drop your file " + filetypes);
    });

    this.el.appendChild(this.buildDOM());
    return this;
  }
});
exports.default = ImportMenu;