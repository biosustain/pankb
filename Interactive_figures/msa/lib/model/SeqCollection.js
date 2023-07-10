"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sequence = require("./Sequence");

var _Sequence2 = _interopRequireDefault(_Sequence);

var _FeatureCol = require("./FeatureCol");

var _FeatureCol2 = _interopRequireDefault(_FeatureCol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collection = require("backbone-thin").Collection;

var SeqCollection = Collection.extend({
  model: _Sequence2.default,

  constructor: function constructor(seqs, g) {
    var _this = this;

    Collection.apply(this, arguments);
    this.g = g;

    this.on("add reset remove", function () {
      // invalidate cache
      _this.lengthCache = null;
      return _this._bindSeqsWithFeatures();
    }, this);

    // use the first seq as reference as default
    this.on("reset", function () {
      return _this._autoSetRefSeq();
    });
    this._autoSetRefSeq();

    this.lengthCache = null;

    this.features = {};
    return this;
  },

  // gives the max length of all sequences
  // (cached)
  getMaxLength: function getMaxLength() {
    if (this.models.length === 0) {
      return 0;
    }
    if (this.lengthCache === null) {
      this.lengthCache = this.max(function (seq) {
        return seq.get("seq").length;
      }).get("seq").length;
    }
    return this.lengthCache;
  },

  // gets the previous model
  // @param endless [boolean] for the first element
  // true: returns the last element, false: returns undefined
  prev: function prev(model, endless) {
    var index = this.indexOf(model) - 1;
    if (index < 0 && endless) {
      index = this.length - 1;
    }
    return this.at(index);
  },

  // gets the next model
  // @param endless [boolean] for the last element
  // true: returns the first element, false: returns undefined
  next: function next(model, endless) {
    var index = this.indexOf(model) + 1;
    if (index === this.length && endless) {
      index = 0;
    }
    return this.at(index);
  },

  // @returns n [int] number of hidden columns until n
  calcHiddenSeqs: function calcHiddenSeqs(n) {
    var nNew = n;
    for (var i = 0; 0 < nNew ? i <= nNew : i >= nNew; 0 < nNew ? i++ : i--) {
      if (this.at(i).get("hidden")) {
        nNew++;
      }
    }
    return nNew - n;
  },

  // you can add features independent to the current seqs as they may be added
  // later (lagging connection)
  // sequence - feature binding is based on id
  addFeatures: function addFeatures(features) {
    var _this2 = this;

    if (features.config != null) {
      var obj = features;
      features = features.seqs;
      if (obj.config.colors != null) {
        var colors = obj.config.colors;
        _.each(features, function (seq) {
          return _.each(seq, function (val) {
            if (colors[val.feature] != null) {
              return val.fillColor = colors[val.feature];
            }
          });
        });
      }
    }
    // we might already have features
    if (_.isEmpty(this.features)) {
      // replace (no existent features)
      this.features = features;
    } else {
      // merge
      _.each(features, function (val, key) {
        if (!_this2.features.hasOwnProperty(key)) {
          return _this2.features[key] = val;
        } else {
          return _this2.features[key] = _.union(_this2.features[key], val);
        }
      });
    }
    // rehash
    return this._bindSeqsWithFeatures();
  },

  // adds features to a sequence
  // does it silenty without triggering an event
  _bindSeqWithFeatures: function _bindSeqWithFeatures(seq) {
    // TODO: probably we don't always want to bind to name
    var features = this.features[seq.attributes.name];
    if (features) {
      // do silently to avoid triggering to many events
      seq.attributes.features = new _FeatureCol2.default(features);
      seq.attributes.features.assignRows();
      seq.attributes.height = seq.attributes.features.getCurrentHeight() + 1;
    }
  },

  // rehash the sequence feature binding
  _bindSeqsWithFeatures: function _bindSeqsWithFeatures() {
    var _this3 = this;

    return this.each(function (seq) {
      return _this3._bindSeqWithFeatures(seq);
    });
  },

  // removes all features from the cache (not from the seqs)
  removeAllFeatures: function removeAllFeatures() {
    return delete this.features;
  },

  _autoSetRefSeq: function _autoSetRefSeq() {
    if (this.length > 0) {
      return this.at(0).set("ref", true);
    }
  },

  // sets a sequence (e.g. BLAST start or consensus seq) as reference
  setRef: function setRef(seq) {
    var obj = this.get(seq);
    this.each(function (s) {
      if (seq.cid) {
        if (obj.cid === s.cid) {
          return s.set("ref", true);
        } else {
          return s.set("ref", false);
        }
      }
    });

    this.g.config.set("hasRef", true);
    return this.trigger("change:reference", seq);
  }
});
exports.default = SeqCollection;