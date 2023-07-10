"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bio = require("bio.io");

var _lodash = require("lodash");

var blobURL = require("blueimp_canvastoblob");
var saveAs = require("browser-saveas");


var Exporter = { openInJalview: function openInJalview(url, colorscheme) {
    if (url.charAt(0) === '.') {
      // relative urls
      url = document.URL.substr(0, document.URL.lastIndexOf('/')) + "/" + url;
    }

    // check whether this is a local url
    if (url.indexOf("http") < 0) {
      // append host and hope for the best
      var host = "http://" + window.location.hostname;
      url = host + url;
    }

    url = encodeURIComponent(url);
    var jalviewUrl = "http://www.jalview.org/services/launchApp?open=" + url;
    jalviewUrl += "&colour=" + colorscheme;
    return window.open(jalviewUrl, '_blank');
  },

  publishWeb: function publishWeb(that, cb) {
    var text = _bio.fasta.write(that.seqs.toJSON());
    text = encodeURIComponent(text);
    var url = "http://sprunge.biojs.net";
    return (0, _bio.xhr)({
      method: "POST",
      body: "sprunge=" + text,
      uri: url,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }, function (err, rep, body) {
      var link = body.trim();
      return cb(link);
    });
  },

  shareLink: function shareLink(that, cb) {
    var url = that.g.config.get("importURL");
    var msaURL = "http://msa.biojs.net/app/?seq=";
    var fCB = function fCB(link) {
      var fURL = msaURL + link;
      if (cb) {
        return cb(fURL);
      }
    };
    if (!url) {
      return Exporter.publishWeb(that, fCB);
    } else {
      return fCB(url);
    }
  },

  saveAsFile: function saveAsFile(that, name) {
    // limit at about 256k
    var text = _bio.fasta.write(that.seqs.toJSON());
    var blob = new Blob([text], { type: 'text/plain' });
    return saveAs(blob, name);
  },

  saveSelection: function saveSelection(that, name) {
    var selection = that.g.selcol.pluck("seqId");
    console.log(selection);
    if (selection.length > 0) {
      // filter those seqids
      selection = that.seqs.filter(function (el) {
        return selection.indexOf(el.get("id")) >= 0;
      });
      var end = selection.length - 1;
      for (var i = 0; 0 < end ? i <= end : i >= end; 0 < end ? i++ : i--) {
        selection[i] = selection[i].toJSON();
      }
    } else {
      selection = that.seqs.toJSON();
      console.warn("no selection found");
    }
    var text = _bio.fasta.write(selection);
    var blob = new Blob([text], { type: 'text/plain' });
    return saveAs(blob, name);
  },

  saveAnnots: function saveAnnots(that, name) {
    var features = that.seqs.map(function (el) {
      features = el.get("features");
      if (features.length === 0) {
        return;
      }
      var seqname = el.get("name");
      features.each(function (s) {
        return s.set("seqname", seqname);
      });
      return features.toJSON();
    });
    features = (0, _lodash.flatten)((0, _lodash.compact)(features));
    console.log(features);
    var text = _bio.gff.exportLines(features);
    var blob = new Blob([text], { type: 'text/plain' });
    return saveAs(blob, name);
  },

  saveAsImg: function saveAsImg(that, name) {
    // TODO: this is very ugly
    var canvas = that.getView('stage').getView('body').getView('seqblock').el;
    if (typeof canvas !== "undefined" && canvas !== null) {
      var url = canvas.toDataURL('image/png');
      return saveAs(blobURL(url), name, "image/png");
    }
  }
};
exports.default = Exporter;