"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var k = require("koala-js");

var Loader =

// asynchronously require a script
{ loadScript: function loadScript(url, cb) {
    var s = k.mk("script");
    s.type = "text/javascript";
    s.src = url;
    s.async = true;
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === "complete")) {
        var r = true;
        return cb();
      }
    };
    var t = document.getElementsByTagName("script")[0];
    return t.parentNode.appendChild(s);
  },

  // joins multiple callbacks into one callback
  // a bit like Promise.all - but for callbacks
  joinCb: function joinCb(retCb, finalLength, finalScope) {
    finalLength = finalLength || 1;
    var cbsFinished = 0;

    var callbackWrapper = function callbackWrapper(cb, scope) {
      if (!(typeof cb !== "undefined" && cb !== null)) {
        // directly called (without cb)
        return counter();
      } else {
        return function () {
          var ref;
          if (ref = "apply", cb.indexOf(ref) >= 0) {
            cb.apply(scope, arguments);
          }
          return counter();
        };
      }
    };

    var counter = function counter() {
      cbsFinished++;
      if (cbsFinished === finalLength) {
        return retCb.call(finalScope);
      }
    };

    return callbackWrapper;
  }
};
exports.default = Loader;