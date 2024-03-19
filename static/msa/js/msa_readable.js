! function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}([function(t, e, n) {
    "use strict";

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }
    var i = n(102),
        o = r(i);
    n(142);
    var s = o.default;
    for (var a in o) o.hasOwnProperty(a) && (s[a] = o[a]);
    window && (window.msa = s), t.exports = s
}, function(t, e, n) {
    "use strict";
    t.exports.Model = n(43), t.exports.Collection = n(54), t.exports.Events = n(11), t.exports.extend = n(15)
}, function(t, e, n) {
    "use strict";
    var r = n(10),
        i = n(11),
        o = n(15),
        s = n(5),
        a = function(t) {
            this.cid = r.uniqueId("view"), t || (t = {}), r.extend(this, r.pick(t, l)), this._ensureElement(), this.initialize.apply(this, arguments)
        },
        u = /^(\S+)\s*(.*)$/,
        l = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    r.extend(a.prototype, i, {
        tagName: "div",
        $: function(t) {
            return this.$el.find(t)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            return this._removeElement(), this.stopListening(), this
        },
        _removeElement: function() {
            this.$el.remove()
        },
        setElement: function(t) {
            return this.undelegateEvents(), this._setElement(t), this.delegateEvents(), this
        },
        _setElement: function(t) {
            this.$el = t instanceof s ? t : s(t), this.el = this.$el[0]
        },
        delegateEvents: function(t) {
            if (!t && !(t = r.result(this, "events"))) return this;
            this.undelegateEvents();
            for (var e in t) {
                var n = t[e];
                if (r.isFunction(n) || (n = this[t[e]]), n) {
                    var i = e.match(u);
                    this.delegate(i[1], i[2], r.bind(n, this))
                }
            }
            return this
        },
        delegate: function(t, e, n) {
            this.$el.on(t + ".delegateEvents" + this.cid, e, n)
        },
        undelegateEvents: function() {
            return this.$el && this.$el.off(".delegateEvents" + this.cid), this
        },
        undelegate: function(t, e, n) {
            this.$el.off(t + ".delegateEvents" + this.cid, e, n)
        },
        _createElement: function(t) {
            return document.createElement(t)
        },
        _ensureElement: function() {
            if (this.el) this.setElement(r.result(this, "el"));
            else {
                var t = r.extend({}, r.result(this, "attributes"));
                this.id && (t.id = r.result(this, "id")), this.className && (t.class = r.result(this, "className")), this.setElement(this._createElement(r.result(this, "tagName"))), this._setAttributes(t)
            }
        },
        _setAttributes: function(t) {
            this.$el.attr(t)
        }
    }), a.extend = o, t.exports = a
}, function(t, e, n) {
    var r;
    (function(t, i) {
        "use strict";
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        (function() {
            function s(t, e, n) {
                switch (n.length) {
                    case 0:
                        return t.call(e);
                    case 1:
                        return t.call(e, n[0]);
                    case 2:
                        return t.call(e, n[0], n[1]);
                    case 3:
                        return t.call(e, n[0], n[1], n[2])
                }
                return t.apply(e, n)
            }

            function a(t, e, n, r) {
                for (var i = -1, o = null == t ? 0 : t.length; ++i < o;) {
                    var s = t[i];
                    e(r, s, n(s), t)
                }
                return r
            }

            function u(t, e) {
                for (var n = -1, r = null == t ? 0 : t.length; ++n < r && e(t[n], n, t) !== !1;);
                return t
            }

            function l(t, e) {
                for (var n = null == t ? 0 : t.length; n-- && e(t[n], n, t) !== !1;);
                return t
            }

            function c(t, e) {
                for (var n = -1, r = null == t ? 0 : t.length; ++n < r;)
                    if (!e(t[n], n, t)) return !1;
                return !0
            }

            function h(t, e) {
                for (var n = -1, r = null == t ? 0 : t.length, i = 0, o = []; ++n < r;) {
                    var s = t[n];
                    e(s, n, t) && (o[i++] = s)
                }
                return o
            }

            function f(t, e) {
                return !!(null == t ? 0 : t.length) && S(t, e, 0) > -1
            }

            function d(t, e, n) {
                for (var r = -1, i = null == t ? 0 : t.length; ++r < i;)
                    if (n(e, t[r])) return !0;
                return !1
            }

            function g(t, e) {
                for (var n = -1, r = null == t ? 0 : t.length, i = Array(r); ++n < r;) i[n] = e(t[n], n, t);
                return i
            }

            function p(t, e) {
                for (var n = -1, r = e.length, i = t.length; ++n < r;) t[i + n] = e[n];
                return t
            }

            function m(t, e, n, r) {
                var i = -1,
                    o = null == t ? 0 : t.length;
                for (r && o && (n = t[++i]); ++i < o;) n = e(n, t[i], i, t);
                return n
            }

            function v(t, e, n, r) {
                var i = null == t ? 0 : t.length;
                for (r && i && (n = t[--i]); i--;) n = e(n, t[i], i, t);
                return n
            }

            function _(t, e) {
                for (var n = -1, r = null == t ? 0 : t.length; ++n < r;)
                    if (e(t[n], n, t)) return !0;
                return !1
            }

            function y(t) {
                return t.split("")
            }

            function b(t) {
                return t.match(He) || []
            }

            function x(t, e, n) {
                var r;
                return n(t, function(t, n, i) {
                    if (e(t, n, i)) return r = n, !1
                }), r
            }

            function w(t, e, n, r) {
                for (var i = t.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i;)
                    if (e(t[o], o, t)) return o;
                return -1
            }

            function S(t, e, n) {
                return e === e ? J(t, e, n) : w(t, k, n)
            }

            function z(t, e, n, r) {
                for (var i = n - 1, o = t.length; ++i < o;)
                    if (r(t[i], e)) return i;
                return -1
            }

            function k(t) {
                return t !== t
            }

            function C(t, e) {
                var n = null == t ? 0 : t.length;
                return n ? T(t, e) / n : Wt
            }

            function M(t) {
                return function(e) {
                    return null == e ? ot : e[t]
                }
            }

            function j(t) {
                return function(e) {
                    return null == t ? ot : t[e]
                }
            }

            function E(t, e, n, r, i) {
                return i(t, function(t, i, o) {
                    n = r ? (r = !1, t) : e(n, t, i, o)
                }), n
            }

            function O(t, e) {
                var n = t.length;
                for (t.sort(e); n--;) t[n] = t[n].value;
                return t
            }

            function T(t, e) {
                for (var n, r = -1, i = t.length; ++r < i;) {
                    var o = e(t[r]);
                    o !== ot && (n = n === ot ? o : n + o)
                }
                return n
            }

            function A(t, e) {
                for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n);
                return r
            }

            function L(t, e) {
                return g(e, function(e) {
                    return [e, t[e]]
                })
            }

            function R(t) {
                return t ? t.slice(0, et(t) + 1).replace(Pe, "") : t
            }

            function q(t) {
                return function(e) {
                    return t(e)
                }
            }

            function N(t, e) {
                return g(e, function(e) {
                    return t[e]
                })
            }

            function I(t, e) {
                return t.has(e)
            }

            function P(t, e) {
                for (var n = -1, r = t.length; ++n < r && S(e, t[n], 0) > -1;);
                return n
            }

            function W(t, e) {
                for (var n = t.length; n-- && S(e, t[n], 0) > -1;);
                return n
            }

            function F(t, e) {
                for (var n = t.length, r = 0; n--;) t[n] === e && ++r;
                return r
            }

            function B(t) {
                return "\\" + rr[t]
            }

            function D(t, e) {
                return null == t ? ot : t[e]
            }

            function H(t) {
                return Xn.test(t)
            }

            function U(t) {
                return Zn.test(t)
            }

            function V(t) {
                for (var e, n = []; !(e = t.next()).done;) n.push(e.value);
                return n
            }

            function G(t) {
                var e = -1,
                    n = Array(t.size);
                return t.forEach(function(t, r) {
                    n[++e] = [r, t]
                }), n
            }

            function $(t, e) {
                return function(n) {
                    return t(e(n))
                }
            }

            function X(t, e) {
                for (var n = -1, r = t.length, i = 0, o = []; ++n < r;) {
                    var s = t[n];
                    s !== e && s !== dt || (t[n] = dt, o[i++] = n)
                }
                return o
            }

            function Z(t) {
                var e = -1,
                    n = Array(t.size);
                return t.forEach(function(t) {
                    n[++e] = t
                }), n
            }

            function Y(t) {
                var e = -1,
                    n = Array(t.size);
                return t.forEach(function(t) {
                    n[++e] = [t, t]
                }), n
            }

            function J(t, e, n) {
                for (var r = n - 1, i = t.length; ++r < i;)
                    if (t[r] === e) return r;
                return -1
            }

            function K(t, e, n) {
                for (var r = n + 1; r--;)
                    if (t[r] === e) return r;
                return r
            }

            function Q(t) {
                return H(t) ? nt(t) : br(t)
            }

            function tt(t) {
                return H(t) ? rt(t) : y(t)
            }

            function et(t) {
                for (var e = t.length; e-- && We.test(t.charAt(e)););
                return e
            }

            function nt(t) {
                for (var e = Gn.lastIndex = 0; Gn.test(t);) ++e;
                return e
            }

            function rt(t) {
                return t.match(Gn) || []
            }

            function it(t) {
                return t.match($n) || []
            }
            var ot, st = "4.17.21",
                at = 200,
                ut = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
                lt = "Expected a function",
                ct = "Invalid `variable` option passed into `_.template`",
                ht = "__lodash_hash_undefined__",
                ft = 500,
                dt = "__lodash_placeholder__",
                gt = 1,
                pt = 2,
                mt = 4,
                vt = 1,
                _t = 2,
                yt = 1,
                bt = 2,
                xt = 4,
                wt = 8,
                St = 16,
                zt = 32,
                kt = 64,
                Ct = 128,
                Mt = 256,
                jt = 512,
                Et = 30,
                Ot = "...",
                Tt = 800,
                At = 16,
                Lt = 1,
                Rt = 2,
                qt = 3,
                Nt = 1 / 0,
                It = 9007199254740991,
                Pt = 1.7976931348623157e308,
                Wt = NaN,
                Ft = 4294967295,
                Bt = Ft - 1,
                Dt = Ft >>> 1,
                Ht = [
                    ["ary", Ct],
                    ["bind", yt],
                    ["bindKey", bt],
                    ["curry", wt],
                    ["curryRight", St],
                    ["flip", jt],
                    ["partial", zt],
                    ["partialRight", kt],
                    ["rearg", Mt]
                ],
                Ut = "[object Arguments]",
                Vt = "[object Array]",
                Gt = "[object AsyncFunction]",
                $t = "[object Boolean]",
                Xt = "[object Date]",
                Zt = "[object DOMException]",
                Yt = "[object Error]",
                Jt = "[object Function]",
                Kt = "[object GeneratorFunction]",
                Qt = "[object Map]",
                te = "[object Number]",
                ee = "[object Null]",
                ne = "[object Object]",
                re = "[object Promise]",
                ie = "[object Proxy]",
                oe = "[object RegExp]",
                se = "[object Set]",
                ae = "[object String]",
                ue = "[object Symbol]",
                le = "[object Undefined]",
                ce = "[object WeakMap]",
                he = "[object WeakSet]",
                fe = "[object ArrayBuffer]",
                de = "[object DataView]",
                ge = "[object Float32Array]",
                pe = "[object Float64Array]",
                me = "[object Int8Array]",
                ve = "[object Int16Array]",
                _e = "[object Int32Array]",
                ye = "[object Uint8Array]",
                be = "[object Uint8ClampedArray]",
                xe = "[object Uint16Array]",
                we = "[object Uint32Array]",
                Se = /\b__p \+= '';/g,
                ze = /\b(__p \+=) '' \+/g,
                ke = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                Ce = /&(?:amp|lt|gt|quot|#39);/g,
                Me = /[&<>"']/g,
                je = RegExp(Ce.source),
                Ee = RegExp(Me.source),
                Oe = /<%-([\s\S]+?)%>/g,
                Te = /<%([\s\S]+?)%>/g,
                Ae = /<%=([\s\S]+?)%>/g,
                Le = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                Re = /^\w*$/,
                qe = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                Ne = /[\\^$.*+?()[\]{}|]/g,
                Ie = RegExp(Ne.source),
                Pe = /^\s+/,
                We = /\s/,
                Fe = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
                Be = /\{\n\/\* \[wrapped with (.+)\] \*/,
                De = /,? & /,
                He = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
                Ue = /[()=,{}\[\]\/\s]/,
                Ve = /\\(\\)?/g,
                Ge = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                $e = /\w*$/,
                Xe = /^[-+]0x[0-9a-f]+$/i,
                Ze = /^0b[01]+$/i,
                Ye = /^\[object .+?Constructor\]$/,
                Je = /^0o[0-7]+$/i,
                Ke = /^(?:0|[1-9]\d*)$/,
                Qe = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
                tn = /($^)/,
                en = /['\n\r\u2028\u2029\\]/g,
                nn = "\\ud800-\\udfff",
                rn = "\\u0300-\\u036f",
                on = "\\ufe20-\\ufe2f",
                sn = "\\u20d0-\\u20ff",
                an = rn + on + sn,
                un = "\\u2700-\\u27bf",
                ln = "a-z\\xdf-\\xf6\\xf8-\\xff",
                cn = "\\xac\\xb1\\xd7\\xf7",
                hn = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
                fn = "\\u2000-\\u206f",
                dn = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
                gn = "A-Z\\xc0-\\xd6\\xd8-\\xde",
                pn = "\\ufe0e\\ufe0f",
                mn = cn + hn + fn + dn,
                vn = "['’]",
                _n = "[" + nn + "]",
                yn = "[" + mn + "]",
                bn = "[" + an + "]",
                xn = "\\d+",
                wn = "[" + un + "]",
                Sn = "[" + ln + "]",
                zn = "[^" + nn + mn + xn + un + ln + gn + "]",
                kn = "\\ud83c[\\udffb-\\udfff]",
                Cn = "(?:" + bn + "|" + kn + ")",
                Mn = "[^" + nn + "]",
                jn = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                En = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                On = "[" + gn + "]",
                Tn = "\\u200d",
                An = "(?:" + Sn + "|" + zn + ")",
                Ln = "(?:" + On + "|" + zn + ")",
                Rn = "(?:" + vn + "(?:d|ll|m|re|s|t|ve))?",
                qn = "(?:" + vn + "(?:D|LL|M|RE|S|T|VE))?",
                Nn = Cn + "?",
                In = "[" + pn + "]?",
                Pn = "(?:" + Tn + "(?:" + [Mn, jn, En].join("|") + ")" + In + Nn + ")*",
                Wn = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
                Fn = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
                Bn = In + Nn + Pn,
                Dn = "(?:" + [wn, jn, En].join("|") + ")" + Bn,
                Hn = "(?:" + [Mn + bn + "?", bn, jn, En, _n].join("|") + ")",
                Un = RegExp(vn, "g"),
                Vn = RegExp(bn, "g"),
                Gn = RegExp(kn + "(?=" + kn + ")|" + Hn + Bn, "g"),
                $n = RegExp([On + "?" + Sn + "+" + Rn + "(?=" + [yn, On, "$"].join("|") + ")", Ln + "+" + qn + "(?=" + [yn, On + An, "$"].join("|") + ")", On + "?" + An + "+" + Rn, On + "+" + qn, Fn, Wn, xn, Dn].join("|"), "g"),
                Xn = RegExp("[" + Tn + nn + an + pn + "]"),
                Zn = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
                Yn = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
                Jn = -1,
                Kn = {};
            Kn[ge] = Kn[pe] = Kn[me] = Kn[ve] = Kn[_e] = Kn[ye] = Kn[be] = Kn[xe] = Kn[we] = !0, Kn[Ut] = Kn[Vt] = Kn[fe] = Kn[$t] = Kn[de] = Kn[Xt] = Kn[Yt] = Kn[Jt] = Kn[Qt] = Kn[te] = Kn[ne] = Kn[oe] = Kn[se] = Kn[ae] = Kn[ce] = !1;
            var Qn = {};
            Qn[Ut] = Qn[Vt] = Qn[fe] = Qn[de] = Qn[$t] = Qn[Xt] = Qn[ge] = Qn[pe] = Qn[me] = Qn[ve] = Qn[_e] = Qn[Qt] = Qn[te] = Qn[ne] = Qn[oe] = Qn[se] = Qn[ae] = Qn[ue] = Qn[ye] = Qn[be] = Qn[xe] = Qn[we] = !0, Qn[Yt] = Qn[Jt] = Qn[ce] = !1;
            var tr = {
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ã": "A",
                    "Ä": "A",
                    "Å": "A",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ã": "a",
                    "ä": "a",
                    "å": "a",
                    "Ç": "C",
                    "ç": "c",
                    "Ð": "D",
                    "ð": "d",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ë": "E",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ë": "e",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ï": "I",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ï": "i",
                    "Ñ": "N",
                    "ñ": "n",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Õ": "O",
                    "Ö": "O",
                    "Ø": "O",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "õ": "o",
                    "ö": "o",
                    "ø": "o",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ü": "U",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ü": "u",
                    "Ý": "Y",
                    "ý": "y",
                    "ÿ": "y",
                    "Æ": "Ae",
                    "æ": "ae",
                    "Þ": "Th",
                    "þ": "th",
                    "ß": "ss",
                    "Ā": "A",
                    "Ă": "A",
                    "Ą": "A",
                    "ā": "a",
                    "ă": "a",
                    "ą": "a",
                    "Ć": "C",
                    "Ĉ": "C",
                    "Ċ": "C",
                    "Č": "C",
                    "ć": "c",
                    "ĉ": "c",
                    "ċ": "c",
                    "č": "c",
                    "Ď": "D",
                    "Đ": "D",
                    "ď": "d",
                    "đ": "d",
                    "Ē": "E",
                    "Ĕ": "E",
                    "Ė": "E",
                    "Ę": "E",
                    "Ě": "E",
                    "ē": "e",
                    "ĕ": "e",
                    "ė": "e",
                    "ę": "e",
                    "ě": "e",
                    "Ĝ": "G",
                    "Ğ": "G",
                    "Ġ": "G",
                    "Ģ": "G",
                    "ĝ": "g",
                    "ğ": "g",
                    "ġ": "g",
                    "ģ": "g",
                    "Ĥ": "H",
                    "Ħ": "H",
                    "ĥ": "h",
                    "ħ": "h",
                    "Ĩ": "I",
                    "Ī": "I",
                    "Ĭ": "I",
                    "Į": "I",
                    "İ": "I",
                    "ĩ": "i",
                    "ī": "i",
                    "ĭ": "i",
                    "į": "i",
                    "ı": "i",
                    "Ĵ": "J",
                    "ĵ": "j",
                    "Ķ": "K",
                    "ķ": "k",
                    "ĸ": "k",
                    "Ĺ": "L",
                    "Ļ": "L",
                    "Ľ": "L",
                    "Ŀ": "L",
                    "Ł": "L",
                    "ĺ": "l",
                    "ļ": "l",
                    "ľ": "l",
                    "ŀ": "l",
                    "ł": "l",
                    "Ń": "N",
                    "Ņ": "N",
                    "Ň": "N",
                    "Ŋ": "N",
                    "ń": "n",
                    "ņ": "n",
                    "ň": "n",
                    "ŋ": "n",
                    "Ō": "O",
                    "Ŏ": "O",
                    "Ő": "O",
                    "ō": "o",
                    "ŏ": "o",
                    "ő": "o",
                    "Ŕ": "R",
                    "Ŗ": "R",
                    "Ř": "R",
                    "ŕ": "r",
                    "ŗ": "r",
                    "ř": "r",
                    "Ś": "S",
                    "Ŝ": "S",
                    "Ş": "S",
                    "Š": "S",
                    "ś": "s",
                    "ŝ": "s",
                    "ş": "s",
                    "š": "s",
                    "Ţ": "T",
                    "Ť": "T",
                    "Ŧ": "T",
                    "ţ": "t",
                    "ť": "t",
                    "ŧ": "t",
                    "Ũ": "U",
                    "Ū": "U",
                    "Ŭ": "U",
                    "Ů": "U",
                    "Ű": "U",
                    "Ų": "U",
                    "ũ": "u",
                    "ū": "u",
                    "ŭ": "u",
                    "ů": "u",
                    "ű": "u",
                    "ų": "u",
                    "Ŵ": "W",
                    "ŵ": "w",
                    "Ŷ": "Y",
                    "ŷ": "y",
                    "Ÿ": "Y",
                    "Ź": "Z",
                    "Ż": "Z",
                    "Ž": "Z",
                    "ź": "z",
                    "ż": "z",
                    "ž": "z",
                    "Ĳ": "IJ",
                    "ĳ": "ij",
                    "Œ": "Oe",
                    "œ": "oe",
                    "ŉ": "'n",
                    "ſ": "s"
                },
                er = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                },
                nr = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'"
                },
                rr = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                ir = parseFloat,
                or = parseInt,
                sr = "object" == ("undefined" == typeof t ? "undefined" : o(t)) && t && t.Object === Object && t,
                ar = "object" == ("undefined" == typeof self ? "undefined" : o(self)) && self && self.Object === Object && self,
                ur = sr || ar || Function("return this")(),
                lr = "object" == o(e) && e && !e.nodeType && e,
                cr = lr && "object" == o(i) && i && !i.nodeType && i,
                hr = cr && cr.exports === lr,
                fr = hr && sr.process,
                dr = function() {
                    try {
                        var t = cr && cr.require && cr.require("util").types;
                        return t ? t : fr && fr.binding && fr.binding("util")
                    } catch (t) {}
                }(),
                gr = dr && dr.isArrayBuffer,
                pr = dr && dr.isDate,
                mr = dr && dr.isMap,
                vr = dr && dr.isRegExp,
                _r = dr && dr.isSet,
                yr = dr && dr.isTypedArray,
                br = M("length"),
                xr = j(tr),
                wr = j(er),
                Sr = j(nr),
                zr = function t(e) {
                    function n(t) {
                        if (uu(t) && !bf(t) && !(t instanceof y)) {
                            if (t instanceof i) return t;
                            if (yc.call(t, "__wrapped__")) return os(t)
                        }
                        return new i(t)
                    }

                    function r() {}

                    function i(t, e) {
                        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = ot
                    }

                    function y(t) {
                        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Ft, this.__views__ = []
                    }

                    function j() {
                        var t = new y(this.__wrapped__);
                        return t.__actions__ = Pi(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = Pi(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = Pi(this.__views__), t
                    }

                    function J() {
                        if (this.__filtered__) {
                            var t = new y(this);
                            t.__dir__ = -1, t.__filtered__ = !0
                        } else t = this.clone(), t.__dir__ *= -1;
                        return t
                    }

                    function nt() {
                        var t = this.__wrapped__.value(),
                            e = this.__dir__,
                            n = bf(t),
                            r = e < 0,
                            i = n ? t.length : 0,
                            o = jo(0, i, this.__views__),
                            s = o.start,
                            a = o.end,
                            u = a - s,
                            l = r ? a : s - 1,
                            c = this.__iteratees__,
                            h = c.length,
                            f = 0,
                            d = Zc(u, this.__takeCount__);
                        if (!n || !r && i == u && d == u) return xi(t, this.__actions__);
                        var g = [];
                        t: for (; u-- && f < d;) {
                            l += e;
                            for (var p = -1, m = t[l]; ++p < h;) {
                                var v = c[p],
                                    _ = v.iteratee,
                                    y = v.type,
                                    b = _(m);
                                if (y == Rt) m = b;
                                else if (!b) {
                                    if (y == Lt) continue t;
                                    break t
                                }
                            }
                            g[f++] = m
                        }
                        return g
                    }

                    function rt(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n;) {
                            var r = t[e];
                            this.set(r[0], r[1])
                        }
                    }

                    function We() {
                        this.__data__ = oh ? oh(null) : {}, this.size = 0
                    }

                    function He(t) {
                        var e = this.has(t) && delete this.__data__[t];
                        return this.size -= e ? 1 : 0, e
                    }

                    function nn(t) {
                        var e = this.__data__;
                        if (oh) {
                            var n = e[t];
                            return n === ht ? ot : n
                        }
                        return yc.call(e, t) ? e[t] : ot
                    }

                    function rn(t) {
                        var e = this.__data__;
                        return oh ? e[t] !== ot : yc.call(e, t)
                    }

                    function on(t, e) {
                        var n = this.__data__;
                        return this.size += this.has(t) ? 0 : 1, n[t] = oh && e === ot ? ht : e, this
                    }

                    function sn(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n;) {
                            var r = t[e];
                            this.set(r[0], r[1])
                        }
                    }

                    function an() {
                        this.__data__ = [], this.size = 0
                    }

                    function un(t) {
                        var e = this.__data__,
                            n = Ln(e, t);
                        return !(n < 0 || (n == e.length - 1 ? e.pop() : Lc.call(e, n, 1), --this.size, 0))
                    }

                    function ln(t) {
                        var e = this.__data__,
                            n = Ln(e, t);
                        return n < 0 ? ot : e[n][1]
                    }

                    function cn(t) {
                        return Ln(this.__data__, t) > -1
                    }

                    function hn(t, e) {
                        var n = this.__data__,
                            r = Ln(n, t);
                        return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this
                    }

                    function fn(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n;) {
                            var r = t[e];
                            this.set(r[0], r[1])
                        }
                    }

                    function dn() {
                        this.size = 0, this.__data__ = {
                            hash: new rt,
                            map: new(eh || sn),
                            string: new rt
                        }
                    }

                    function gn(t) {
                        var e = zo(this, t).delete(t);
                        return this.size -= e ? 1 : 0, e
                    }

                    function pn(t) {
                        return zo(this, t).get(t)
                    }

                    function mn(t) {
                        return zo(this, t).has(t)
                    }

                    function vn(t, e) {
                        var n = zo(this, t),
                            r = n.size;
                        return n.set(t, e), this.size += n.size == r ? 0 : 1, this
                    }

                    function _n(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.__data__ = new fn; ++e < n;) this.add(t[e])
                    }

                    function yn(t) {
                        return this.__data__.set(t, ht), this
                    }

                    function bn(t) {
                        return this.__data__.has(t)
                    }

                    function xn(t) {
                        var e = this.__data__ = new sn(t);
                        this.size = e.size
                    }

                    function wn() {
                        this.__data__ = new sn, this.size = 0
                    }

                    function Sn(t) {
                        var e = this.__data__,
                            n = e.delete(t);
                        return this.size = e.size, n
                    }

                    function zn(t) {
                        return this.__data__.get(t)
                    }

                    function kn(t) {
                        return this.__data__.has(t)
                    }

                    function Cn(t, e) {
                        var n = this.__data__;
                        if (n instanceof sn) {
                            var r = n.__data__;
                            if (!eh || r.length < at - 1) return r.push([t, e]), this.size = ++n.size, this;
                            n = this.__data__ = new fn(r)
                        }
                        return n.set(t, e), this.size = n.size, this
                    }

                    function Mn(t, e) {
                        var n = bf(t),
                            r = !n && yf(t),
                            i = !n && !r && wf(t),
                            o = !n && !r && !i && Mf(t),
                            s = n || r || i || o,
                            a = s ? A(t.length, fc) : [],
                            u = a.length;
                        for (var l in t) !e && !yc.call(t, l) || s && ("length" == l || i && ("offset" == l || "parent" == l) || o && ("buffer" == l || "byteLength" == l || "byteOffset" == l) || No(l, u)) || a.push(l);
                        return a
                    }

                    function jn(t) {
                        var e = t.length;
                        return e ? t[ni(0, e - 1)] : ot
                    }

                    function En(t, e) {
                        return es(Pi(t), Wn(e, 0, t.length))
                    }

                    function On(t) {
                        return es(Pi(t))
                    }

                    function Tn(t, e, n) {
                        (n === ot || Xa(t[e], n)) && (n !== ot || e in t) || In(t, e, n)
                    }

                    function An(t, e, n) {
                        var r = t[e];
                        yc.call(t, e) && Xa(r, n) && (n !== ot || e in t) || In(t, e, n)
                    }

                    function Ln(t, e) {
                        for (var n = t.length; n--;)
                            if (Xa(t[n][0], e)) return n;
                        return -1
                    }

                    function Rn(t, e, n, r) {
                        return vh(t, function(t, i, o) {
                            e(r, t, n(t), o)
                        }), r
                    }

                    function qn(t, e) {
                        return t && Wi(e, Hu(e), t)
                    }

                    function Nn(t, e) {
                        return t && Wi(e, Uu(e), t)
                    }

                    function In(t, e, n) {
                        "__proto__" == e && Ic ? Ic(t, e, {
                            configurable: !0,
                            enumerable: !0,
                            value: n,
                            writable: !0
                        }) : t[e] = n
                    }

                    function Pn(t, e) {
                        for (var n = -1, r = e.length, i = oc(r), o = null == t; ++n < r;) i[n] = o ? ot : Fu(t, e[n]);
                        return i
                    }

                    function Wn(t, e, n) {
                        return t === t && (n !== ot && (t = t <= n ? t : n), e !== ot && (t = t >= e ? t : e)), t
                    }

                    function Fn(t, e, n, r, i, o) {
                        var s, a = e & gt,
                            l = e & pt,
                            c = e & mt;
                        if (n && (s = i ? n(t, r, i, o) : n(t)), s !== ot) return s;
                        if (!au(t)) return t;
                        var h = bf(t);
                        if (h) {
                            if (s = To(t), !a) return Pi(t, s)
                        } else {
                            var f = Eh(t),
                                d = f == Jt || f == Kt;
                            if (wf(t)) return ji(t, a);
                            if (f == ne || f == Ut || d && !i) {
                                if (s = l || d ? {} : Ao(t), !a) return l ? Bi(t, Nn(s, t)) : Fi(t, qn(s, t))
                            } else {
                                if (!Qn[f]) return i ? t : {};
                                s = Lo(t, f, a)
                            }
                        }
                        o || (o = new xn);
                        var g = o.get(t);
                        if (g) return g;
                        o.set(t, s), Cf(t) ? t.forEach(function(r) {
                            s.add(Fn(r, e, n, r, t, o))
                        }) : zf(t) && t.forEach(function(r, i) {
                            s.set(i, Fn(r, e, n, i, t, o))
                        });
                        var p = c ? l ? bo : yo : l ? Uu : Hu,
                            m = h ? ot : p(t);
                        return u(m || t, function(r, i) {
                            m && (i = r, r = t[i]), An(s, i, Fn(r, e, n, i, t, o))
                        }), s
                    }

                    function Bn(t) {
                        var e = Hu(t);
                        return function(n) {
                            return Dn(n, t, e)
                        }
                    }

                    function Dn(t, e, n) {
                        var r = n.length;
                        if (null == t) return !r;
                        for (t = cc(t); r--;) {
                            var i = n[r],
                                o = e[i],
                                s = t[i];
                            if (s === ot && !(i in t) || !o(s)) return !1
                        }
                        return !0
                    }

                    function Hn(t, e, n) {
                        if ("function" != typeof t) throw new dc(lt);
                        return Ah(function() {
                            t.apply(ot, n)
                        }, e)
                    }

                    function Gn(t, e, n, r) {
                        var i = -1,
                            o = f,
                            s = !0,
                            a = t.length,
                            u = [],
                            l = e.length;
                        if (!a) return u;
                        n && (e = g(e, q(n))), r ? (o = d, s = !1) : e.length >= at && (o = I, s = !1, e = new _n(e));
                        t: for (; ++i < a;) {
                            var c = t[i],
                                h = null == n ? c : n(c);
                            if (c = r || 0 !== c ? c : 0, s && h === h) {
                                for (var p = l; p--;)
                                    if (e[p] === h) continue t;
                                u.push(c)
                            } else o(e, h, r) || u.push(c)
                        }
                        return u
                    }

                    function $n(t, e) {
                        var n = !0;
                        return vh(t, function(t, r, i) {
                            return n = !!e(t, r, i)
                        }), n
                    }

                    function Xn(t, e, n) {
                        for (var r = -1, i = t.length; ++r < i;) {
                            var o = t[r],
                                s = e(o);
                            if (null != s && (a === ot ? s === s && !yu(s) : n(s, a))) var a = s,
                                u = o
                        }
                        return u
                    }

                    function Zn(t, e, n, r) {
                        var i = t.length;
                        for (n = ku(n), n < 0 && (n = -n > i ? 0 : i + n), r = r === ot || r > i ? i : ku(r), r < 0 && (r += i), r = n > r ? 0 : Cu(r); n < r;) t[n++] = e;
                        return t
                    }

                    function tr(t, e) {
                        var n = [];
                        return vh(t, function(t, r, i) {
                            e(t, r, i) && n.push(t)
                        }), n
                    }

                    function er(t, e, n, r, i) {
                        var o = -1,
                            s = t.length;
                        for (n || (n = qo), i || (i = []); ++o < s;) {
                            var a = t[o];
                            e > 0 && n(a) ? e > 1 ? er(a, e - 1, n, r, i) : p(i, a) : r || (i[i.length] = a)
                        }
                        return i
                    }

                    function nr(t, e) {
                        return t && yh(t, e, Hu)
                    }

                    function rr(t, e) {
                        return t && bh(t, e, Hu)
                    }

                    function sr(t, e) {
                        return h(e, function(e) {
                            return iu(t[e])
                        })
                    }

                    function ar(t, e) {
                        e = Ci(e, t);
                        for (var n = 0, r = e.length; null != t && n < r;) t = t[ns(e[n++])];
                        return n && n == r ? t : ot
                    }

                    function lr(t, e, n) {
                        var r = e(t);
                        return bf(t) ? r : p(r, n(t))
                    }

                    function cr(t) {
                        return null == t ? t === ot ? le : ee : Nc && Nc in cc(t) ? Mo(t) : Xo(t)
                    }

                    function fr(t, e) {
                        return t > e
                    }

                    function dr(t, e) {
                        return null != t && yc.call(t, e)
                    }

                    function br(t, e) {
                        return null != t && e in cc(t)
                    }

                    function zr(t, e, n) {
                        return t >= Zc(e, n) && t < Xc(e, n)
                    }

                    function Cr(t, e, n) {
                        for (var r = n ? d : f, i = t[0].length, o = t.length, s = o, a = oc(o), u = 1 / 0, l = []; s--;) {
                            var c = t[s];
                            s && e && (c = g(c, q(e))), u = Zc(c.length, u), a[s] = !n && (e || i >= 120 && c.length >= 120) ? new _n(s && c) : ot
                        }
                        c = t[0];
                        var h = -1,
                            p = a[0];
                        t: for (; ++h < i && l.length < u;) {
                            var m = c[h],
                                v = e ? e(m) : m;
                            if (m = n || 0 !== m ? m : 0, !(p ? I(p, v) : r(l, v, n))) {
                                for (s = o; --s;) {
                                    var _ = a[s];
                                    if (!(_ ? I(_, v) : r(t[s], v, n))) continue t
                                }
                                p && p.push(v), l.push(m)
                            }
                        }
                        return l
                    }

                    function Mr(t, e, n, r) {
                        return nr(t, function(t, i, o) {
                            e(r, n(t), i, o)
                        }), r
                    }

                    function jr(t, e, n) {
                        e = Ci(e, t), t = Yo(t, e);
                        var r = null == t ? t : t[ns(zs(e))];
                        return null == r ? ot : s(r, t, n)
                    }

                    function Er(t) {
                        return uu(t) && cr(t) == Ut
                    }

                    function Or(t) {
                        return uu(t) && cr(t) == fe
                    }

                    function Tr(t) {
                        return uu(t) && cr(t) == Xt
                    }

                    function Ar(t, e, n, r, i) {
                        return t === e || (null == t || null == e || !uu(t) && !uu(e) ? t !== t && e !== e : Lr(t, e, n, r, Ar, i))
                    }

                    function Lr(t, e, n, r, i, o) {
                        var s = bf(t),
                            a = bf(e),
                            u = s ? Vt : Eh(t),
                            l = a ? Vt : Eh(e);
                        u = u == Ut ? ne : u, l = l == Ut ? ne : l;
                        var c = u == ne,
                            h = l == ne,
                            f = u == l;
                        if (f && wf(t)) {
                            if (!wf(e)) return !1;
                            s = !0, c = !1
                        }
                        if (f && !c) return o || (o = new xn), s || Mf(t) ? po(t, e, n, r, i, o) : mo(t, e, u, n, r, i, o);
                        if (!(n & vt)) {
                            var d = c && yc.call(t, "__wrapped__"),
                                g = h && yc.call(e, "__wrapped__");
                            if (d || g) {
                                var p = d ? t.value() : t,
                                    m = g ? e.value() : e;
                                return o || (o = new xn), i(p, m, n, r, o)
                            }
                        }
                        return !!f && (o || (o = new xn), vo(t, e, n, r, i, o))
                    }

                    function Rr(t) {
                        return uu(t) && Eh(t) == Qt
                    }

                    function qr(t, e, n, r) {
                        var i = n.length,
                            o = i,
                            s = !r;
                        if (null == t) return !o;
                        for (t = cc(t); i--;) {
                            var a = n[i];
                            if (s && a[2] ? a[1] !== t[a[0]] : !(a[0] in t)) return !1
                        }
                        for (; ++i < o;) {
                            a = n[i];
                            var u = a[0],
                                l = t[u],
                                c = a[1];
                            if (s && a[2]) {
                                if (l === ot && !(u in t)) return !1
                            } else {
                                var h = new xn;
                                if (r) var f = r(l, c, u, t, e, h);
                                if (!(f === ot ? Ar(c, l, vt | _t, r, h) : f)) return !1
                            }
                        }
                        return !0
                    }

                    function Nr(t) {
                        return !(!au(t) || Bo(t)) && (iu(t) ? kc : Ye).test(rs(t))
                    }

                    function Ir(t) {
                        return uu(t) && cr(t) == oe
                    }

                    function Pr(t) {
                        return uu(t) && Eh(t) == se
                    }

                    function Wr(t) {
                        return uu(t) && su(t.length) && !!Kn[cr(t)]
                    }

                    function Fr(t) {
                        return "function" == typeof t ? t : null == t ? Ll : "object" == ("undefined" == typeof t ? "undefined" : o(t)) ? bf(t) ? Gr(t[0], t[1]) : Vr(t) : Bl(t)
                    }

                    function Br(t) {
                        if (!Do(t)) return $c(t);
                        var e = [];
                        for (var n in cc(t)) yc.call(t, n) && "constructor" != n && e.push(n);
                        return e
                    }

                    function Dr(t) {
                        if (!au(t)) return $o(t);
                        var e = Do(t),
                            n = [];
                        for (var r in t)("constructor" != r || !e && yc.call(t, r)) && n.push(r);
                        return n
                    }

                    function Hr(t, e) {
                        return t < e
                    }

                    function Ur(t, e) {
                        var n = -1,
                            r = Za(t) ? oc(t.length) : [];
                        return vh(t, function(t, i, o) {
                            r[++n] = e(t, i, o)
                        }), r
                    }

                    function Vr(t) {
                        var e = ko(t);
                        return 1 == e.length && e[0][2] ? Uo(e[0][0], e[0][1]) : function(n) {
                            return n === t || qr(n, t, e)
                        }
                    }

                    function Gr(t, e) {
                        return Po(t) && Ho(e) ? Uo(ns(t), e) : function(n) {
                            var r = Fu(n, t);
                            return r === ot && r === e ? Du(n, t) : Ar(e, r, vt | _t)
                        }
                    }

                    function $r(t, e, n, r, i) {
                        t !== e && yh(e, function(o, s) {
                            if (i || (i = new xn), au(o)) Xr(t, e, s, n, $r, r, i);
                            else {
                                var a = r ? r(Ko(t, s), o, s + "", t, e, i) : ot;
                                a === ot && (a = o), Tn(t, s, a)
                            }
                        }, Uu)
                    }

                    function Xr(t, e, n, r, i, o, s) {
                        var a = Ko(t, n),
                            u = Ko(e, n),
                            l = s.get(u);
                        if (l) return void Tn(t, n, l);
                        var c = o ? o(a, u, n + "", t, e, s) : ot,
                            h = c === ot;
                        if (h) {
                            var f = bf(u),
                                d = !f && wf(u),
                                g = !f && !d && Mf(u);
                            c = u, f || d || g ? bf(a) ? c = a : Ya(a) ? c = Pi(a) : d ? (h = !1, c = ji(u, !0)) : g ? (h = !1, c = Li(u, !0)) : c = [] : mu(u) || yf(u) ? (c = a, yf(a) ? c = ju(a) : au(a) && !iu(a) || (c = Ao(u))) : h = !1
                        }
                        h && (s.set(u, c), i(c, u, r, o, s), s.delete(u)), Tn(t, n, c)
                    }

                    function Zr(t, e) {
                        var n = t.length;
                        if (n) return e += e < 0 ? n : 0, No(e, n) ? t[e] : ot
                    }

                    function Yr(t, e, n) {
                        e = e.length ? g(e, function(t) {
                            return bf(t) ? function(e) {
                                return ar(e, 1 === t.length ? t[0] : t)
                            } : t
                        }) : [Ll];
                        var r = -1;
                        return e = g(e, q(So())), O(Ur(t, function(t, n, i) {
                            return {
                                criteria: g(e, function(e) {
                                    return e(t)
                                }),
                                index: ++r,
                                value: t
                            }
                        }), function(t, e) {
                            return qi(t, e, n)
                        })
                    }

                    function Jr(t, e) {
                        return Kr(t, e, function(e, n) {
                            return Du(t, n)
                        })
                    }

                    function Kr(t, e, n) {
                        for (var r = -1, i = e.length, o = {}; ++r < i;) {
                            var s = e[r],
                                a = ar(t, s);
                            n(a, s) && ui(o, Ci(s, t), a)
                        }
                        return o
                    }

                    function Qr(t) {
                        return function(e) {
                            return ar(e, t)
                        }
                    }

                    function ti(t, e, n, r) {
                        var i = r ? z : S,
                            o = -1,
                            s = e.length,
                            a = t;
                        for (t === e && (e = Pi(e)), n && (a = g(t, q(n))); ++o < s;)
                            for (var u = 0, l = e[o], c = n ? n(l) : l;
                                 (u = i(a, c, u, r)) > -1;) a !== t && Lc.call(a, u, 1), Lc.call(t, u, 1);
                        return t
                    }

                    function ei(t, e) {
                        for (var n = t ? e.length : 0, r = n - 1; n--;) {
                            var i = e[n];
                            if (n == r || i !== o) {
                                var o = i;
                                No(i) ? Lc.call(t, i, 1) : _i(t, i)
                            }
                        }
                        return t
                    }

                    function ni(t, e) {
                        return t + Dc(Kc() * (e - t + 1))
                    }

                    function ri(t, e, n, r) {
                        for (var i = -1, o = Xc(Bc((e - t) / (n || 1)), 0), s = oc(o); o--;) s[r ? o : ++i] = t, t += n;
                        return s
                    }

                    function ii(t, e) {
                        var n = "";
                        if (!t || e < 1 || e > It) return n;
                        do e % 2 && (n += t), e = Dc(e / 2), e && (t += t); while (e);
                        return n
                    }

                    function oi(t, e) {
                        return Lh(Zo(t, e, Ll), t + "")
                    }

                    function si(t) {
                        return jn(nl(t))
                    }

                    function ai(t, e) {
                        var n = nl(t);
                        return es(n, Wn(e, 0, n.length))
                    }

                    function ui(t, e, n, r) {
                        if (!au(t)) return t;
                        e = Ci(e, t);
                        for (var i = -1, o = e.length, s = o - 1, a = t; null != a && ++i < o;) {
                            var u = ns(e[i]),
                                l = n;
                            if ("__proto__" === u || "constructor" === u || "prototype" === u) return t;
                            if (i != s) {
                                var c = a[u];
                                l = r ? r(c, u, a) : ot, l === ot && (l = au(c) ? c : No(e[i + 1]) ? [] : {})
                            }
                            An(a, u, l), a = a[u]
                        }
                        return t
                    }

                    function li(t) {
                        return es(nl(t))
                    }

                    function ci(t, e, n) {
                        var r = -1,
                            i = t.length;
                        e < 0 && (e = -e > i ? 0 : i + e), n = n > i ? i : n, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
                        for (var o = oc(i); ++r < i;) o[r] = t[r + e];
                        return o
                    }

                    function hi(t, e) {
                        var n;
                        return vh(t, function(t, r, i) {
                            return n = e(t, r, i), !n
                        }), !!n
                    }

                    function fi(t, e, n) {
                        var r = 0,
                            i = null == t ? r : t.length;
                        if ("number" == typeof e && e === e && i <= Dt) {
                            for (; r < i;) {
                                var o = r + i >>> 1,
                                    s = t[o];
                                null !== s && !yu(s) && (n ? s <= e : s < e) ? r = o + 1 : i = o
                            }
                            return i
                        }
                        return di(t, e, Ll, n)
                    }

                    function di(t, e, n, r) {
                        var i = 0,
                            o = null == t ? 0 : t.length;
                        if (0 === o) return 0;
                        e = n(e);
                        for (var s = e !== e, a = null === e, u = yu(e), l = e === ot; i < o;) {
                            var c = Dc((i + o) / 2),
                                h = n(t[c]),
                                f = h !== ot,
                                d = null === h,
                                g = h === h,
                                p = yu(h);
                            if (s) var m = r || g;
                            else m = l ? g && (r || f) : a ? g && f && (r || !d) : u ? g && f && !d && (r || !p) : !d && !p && (r ? h <= e : h < e);
                            m ? i = c + 1 : o = c
                        }
                        return Zc(o, Bt)
                    }

                    function gi(t, e) {
                        for (var n = -1, r = t.length, i = 0, o = []; ++n < r;) {
                            var s = t[n],
                                a = e ? e(s) : s;
                            if (!n || !Xa(a, u)) {
                                var u = a;
                                o[i++] = 0 === s ? 0 : s
                            }
                        }
                        return o
                    }

                    function pi(t) {
                        return "number" == typeof t ? t : yu(t) ? Wt : +t
                    }

                    function mi(t) {
                        if ("string" == typeof t) return t;
                        if (bf(t)) return g(t, mi) + "";
                        if (yu(t)) return ph ? ph.call(t) : "";
                        var e = t + "";
                        return "0" == e && 1 / t == -Nt ? "-0" : e
                    }

                    function vi(t, e, n) {
                        var r = -1,
                            i = f,
                            o = t.length,
                            s = !0,
                            a = [],
                            u = a;
                        if (n) s = !1, i = d;
                        else if (o >= at) {
                            var l = e ? null : kh(t);
                            if (l) return Z(l);
                            s = !1, i = I, u = new _n
                        } else u = e ? [] : a;
                        t: for (; ++r < o;) {
                            var c = t[r],
                                h = e ? e(c) : c;
                            if (c = n || 0 !== c ? c : 0, s && h === h) {
                                for (var g = u.length; g--;)
                                    if (u[g] === h) continue t;
                                e && u.push(h), a.push(c)
                            } else i(u, h, n) || (u !== a && u.push(h), a.push(c))
                        }
                        return a
                    }

                    function _i(t, e) {
                        return e = Ci(e, t), t = Yo(t, e), null == t || delete t[ns(zs(e))]
                    }

                    function yi(t, e, n, r) {
                        return ui(t, e, n(ar(t, e)), r)
                    }

                    function bi(t, e, n, r) {
                        for (var i = t.length, o = r ? i : -1;
                             (r ? o-- : ++o < i) && e(t[o], o, t););
                        return n ? ci(t, r ? 0 : o, r ? o + 1 : i) : ci(t, r ? o + 1 : 0, r ? i : o)
                    }

                    function xi(t, e) {
                        var n = t;
                        return n instanceof y && (n = n.value()), m(e, function(t, e) {
                            return e.func.apply(e.thisArg, p([t], e.args))
                        }, n)
                    }

                    function wi(t, e, n) {
                        var r = t.length;
                        if (r < 2) return r ? vi(t[0]) : [];
                        for (var i = -1, o = oc(r); ++i < r;)
                            for (var s = t[i], a = -1; ++a < r;) a != i && (o[i] = Gn(o[i] || s, t[a], e, n));
                        return vi(er(o, 1), e, n)
                    }

                    function Si(t, e, n) {
                        for (var r = -1, i = t.length, o = e.length, s = {}; ++r < i;) {
                            var a = r < o ? e[r] : ot;
                            n(s, t[r], a)
                        }
                        return s
                    }

                    function zi(t) {
                        return Ya(t) ? t : []
                    }

                    function ki(t) {
                        return "function" == typeof t ? t : Ll
                    }

                    function Ci(t, e) {
                        return bf(t) ? t : Po(t, e) ? [t] : Rh(Ou(t))
                    }

                    function Mi(t, e, n) {
                        var r = t.length;
                        return n = n === ot ? r : n, !e && n >= r ? t : ci(t, e, n)
                    }

                    function ji(t, e) {
                        if (e) return t.slice();
                        var n = t.length,
                            r = Ec ? Ec(n) : new t.constructor(n);
                        return t.copy(r), r
                    }

                    function Ei(t) {
                        var e = new t.constructor(t.byteLength);
                        return new jc(e).set(new jc(t)), e
                    }

                    function Oi(t, e) {
                        var n = e ? Ei(t.buffer) : t.buffer;
                        return new t.constructor(n, t.byteOffset, t.byteLength)
                    }

                    function Ti(t) {
                        var e = new t.constructor(t.source, $e.exec(t));
                        return e.lastIndex = t.lastIndex, e
                    }

                    function Ai(t) {
                        return gh ? cc(gh.call(t)) : {}
                    }

                    function Li(t, e) {
                        var n = e ? Ei(t.buffer) : t.buffer;
                        return new t.constructor(n, t.byteOffset, t.length)
                    }

                    function Ri(t, e) {
                        if (t !== e) {
                            var n = t !== ot,
                                r = null === t,
                                i = t === t,
                                o = yu(t),
                                s = e !== ot,
                                a = null === e,
                                u = e === e,
                                l = yu(e);
                            if (!a && !l && !o && t > e || o && s && u && !a && !l || r && s && u || !n && u || !i) return 1;
                            if (!r && !o && !l && t < e || l && n && i && !r && !o || a && n && i || !s && i || !u) return -1
                        }
                        return 0
                    }

                    function qi(t, e, n) {
                        for (var r = -1, i = t.criteria, o = e.criteria, s = i.length, a = n.length; ++r < s;) {
                            var u = Ri(i[r], o[r]);
                            if (u) return r >= a ? u : u * ("desc" == n[r] ? -1 : 1)
                        }
                        return t.index - e.index
                    }

                    function Ni(t, e, n, r) {
                        for (var i = -1, o = t.length, s = n.length, a = -1, u = e.length, l = Xc(o - s, 0), c = oc(u + l), h = !r; ++a < u;) c[a] = e[a];
                        for (; ++i < s;)(h || i < o) && (c[n[i]] = t[i]);
                        for (; l--;) c[a++] = t[i++];
                        return c
                    }

                    function Ii(t, e, n, r) {
                        for (var i = -1, o = t.length, s = -1, a = n.length, u = -1, l = e.length, c = Xc(o - a, 0), h = oc(c + l), f = !r; ++i < c;) h[i] = t[i];
                        for (var d = i; ++u < l;) h[d + u] = e[u];
                        for (; ++s < a;)(f || i < o) && (h[d + n[s]] = t[i++]);
                        return h
                    }

                    function Pi(t, e) {
                        var n = -1,
                            r = t.length;
                        for (e || (e = oc(r)); ++n < r;) e[n] = t[n];
                        return e
                    }

                    function Wi(t, e, n, r) {
                        var i = !n;
                        n || (n = {});
                        for (var o = -1, s = e.length; ++o < s;) {
                            var a = e[o],
                                u = r ? r(n[a], t[a], a, n, t) : ot;
                            u === ot && (u = t[a]), i ? In(n, a, u) : An(n, a, u)
                        }
                        return n
                    }

                    function Fi(t, e) {
                        return Wi(t, Mh(t), e)
                    }

                    function Bi(t, e) {
                        return Wi(t, jh(t), e)
                    }

                    function Di(t, e) {
                        return function(n, r) {
                            var i = bf(n) ? a : Rn,
                                o = e ? e() : {};
                            return i(n, t, So(r, 2), o)
                        }
                    }

                    function Hi(t) {
                        return oi(function(e, n) {
                            var r = -1,
                                i = n.length,
                                o = i > 1 ? n[i - 1] : ot,
                                s = i > 2 ? n[2] : ot;
                            for (o = t.length > 3 && "function" == typeof o ? (i--, o) : ot, s && Io(n[0], n[1], s) && (o = i < 3 ? ot : o, i = 1), e = cc(e); ++r < i;) {
                                var a = n[r];
                                a && t(e, a, r, o)
                            }
                            return e
                        })
                    }

                    function Ui(t, e) {
                        return function(n, r) {
                            if (null == n) return n;
                            if (!Za(n)) return t(n, r);
                            for (var i = n.length, o = e ? i : -1, s = cc(n);
                                 (e ? o-- : ++o < i) && r(s[o], o, s) !== !1;);
                            return n
                        }
                    }

                    function Vi(t) {
                        return function(e, n, r) {
                            for (var i = -1, o = cc(e), s = r(e), a = s.length; a--;) {
                                var u = s[t ? a : ++i];
                                if (n(o[u], u, o) === !1) break
                            }
                            return e
                        }
                    }

                    function Gi(t, e, n) {
                        function r() {
                            return (this && this !== ur && this instanceof r ? o : t).apply(i ? n : this, arguments)
                        }
                        var i = e & yt,
                            o = Zi(t);
                        return r
                    }

                    function $i(t) {
                        return function(e) {
                            e = Ou(e);
                            var n = H(e) ? tt(e) : ot,
                                r = n ? n[0] : e.charAt(0),
                                i = n ? Mi(n, 1).join("") : e.slice(1);
                            return r[t]() + i
                        }
                    }

                    function Xi(t) {
                        return function(e) {
                            return m(jl(ul(e).replace(Un, "")), t, "")
                        }
                    }

                    function Zi(t) {
                        return function() {
                            var e = arguments;
                            switch (e.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(e[0]);
                                case 2:
                                    return new t(e[0], e[1]);
                                case 3:
                                    return new t(e[0], e[1], e[2]);
                                case 4:
                                    return new t(e[0], e[1], e[2], e[3]);
                                case 5:
                                    return new t(e[0], e[1], e[2], e[3], e[4]);
                                case 6:
                                    return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                                case 7:
                                    return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6])
                            }
                            var n = mh(t.prototype),
                                r = t.apply(n, e);
                            return au(r) ? r : n
                        }
                    }

                    function Yi(t, e, n) {
                        function r() {
                            for (var o = arguments.length, a = oc(o), u = o, l = wo(r); u--;) a[u] = arguments[u];
                            var c = o < 3 && a[0] !== l && a[o - 1] !== l ? [] : X(a, l);
                            return o -= c.length, o < n ? ao(t, e, Qi, r.placeholder, ot, a, c, ot, ot, n - o) : s(this && this !== ur && this instanceof r ? i : t, this, a)
                        }
                        var i = Zi(t);
                        return r
                    }

                    function Ji(t) {
                        return function(e, n, r) {
                            var i = cc(e);
                            if (!Za(e)) {
                                var o = So(n, 3);
                                e = Hu(e), n = function(t) {
                                    return o(i[t], t, i)
                                }
                            }
                            var s = t(e, n, r);
                            return s > -1 ? i[o ? e[s] : s] : ot
                        }
                    }

                    function Ki(t) {
                        return _o(function(e) {
                            var n = e.length,
                                r = n,
                                o = i.prototype.thru;
                            for (t && e.reverse(); r--;) {
                                var s = e[r];
                                if ("function" != typeof s) throw new dc(lt);
                                if (o && !a && "wrapper" == xo(s)) var a = new i([], !0)
                            }
                            for (r = a ? r : n; ++r < n;) {
                                s = e[r];
                                var u = xo(s),
                                    l = "wrapper" == u ? Ch(s) : ot;
                                a = l && Fo(l[0]) && l[1] == (Ct | wt | zt | Mt) && !l[4].length && 1 == l[9] ? a[xo(l[0])].apply(a, l[3]) : 1 == s.length && Fo(s) ? a[u]() : a.thru(s)
                            }
                            return function() {
                                var t = arguments,
                                    r = t[0];
                                if (a && 1 == t.length && bf(r)) return a.plant(r).value();
                                for (var i = 0, o = n ? e[i].apply(this, t) : r; ++i < n;) o = e[i].call(this, o);
                                return o
                            }
                        })
                    }

                    function Qi(t, e, n, r, i, o, s, a, u, l) {
                        function c() {
                            for (var v = arguments.length, _ = oc(v), y = v; y--;) _[y] = arguments[y];
                            if (g) var b = wo(c),
                                x = F(_, b);
                            if (r && (_ = Ni(_, r, i, g)), o && (_ = Ii(_, o, s, g)), v -= x, g && v < l) {
                                var w = X(_, b);
                                return ao(t, e, Qi, c.placeholder, n, _, w, a, u, l - v)
                            }
                            var S = f ? n : this,
                                z = d ? S[t] : t;
                            return v = _.length, a ? _ = Jo(_, a) : p && v > 1 && _.reverse(), h && u < v && (_.length = u), this && this !== ur && this instanceof c && (z = m || Zi(z)), z.apply(S, _)
                        }
                        var h = e & Ct,
                            f = e & yt,
                            d = e & bt,
                            g = e & (wt | St),
                            p = e & jt,
                            m = d ? ot : Zi(t);
                        return c
                    }

                    function to(t, e) {
                        return function(n, r) {
                            return Mr(n, t, e(r), {})
                        }
                    }

                    function eo(t, e) {
                        return function(n, r) {
                            var i;
                            if (n === ot && r === ot) return e;
                            if (n !== ot && (i = n), r !== ot) {
                                if (i === ot) return r;
                                "string" == typeof n || "string" == typeof r ? (n = mi(n), r = mi(r)) : (n = pi(n), r = pi(r)), i = t(n, r)
                            }
                            return i
                        }
                    }

                    function no(t) {
                        return _o(function(e) {
                            return e = g(e, q(So())), oi(function(n) {
                                var r = this;
                                return t(e, function(t) {
                                    return s(t, r, n)
                                })
                            })
                        })
                    }

                    function ro(t, e) {
                        e = e === ot ? " " : mi(e);
                        var n = e.length;
                        if (n < 2) return n ? ii(e, t) : e;
                        var r = ii(e, Bc(t / Q(e)));
                        return H(e) ? Mi(tt(r), 0, t).join("") : r.slice(0, t)
                    }

                    function io(t, e, n, r) {
                        function i() {
                            for (var e = -1, u = arguments.length, l = -1, c = r.length, h = oc(c + u), f = this && this !== ur && this instanceof i ? a : t; ++l < c;) h[l] = r[l];
                            for (; u--;) h[l++] = arguments[++e];
                            return s(f, o ? n : this, h)
                        }
                        var o = e & yt,
                            a = Zi(t);
                        return i
                    }

                    function oo(t) {
                        return function(e, n, r) {
                            return r && "number" != typeof r && Io(e, n, r) && (n = r = ot), e = zu(e),
                                n === ot ? (n = e, e = 0) : n = zu(n), r = r === ot ? e < n ? 1 : -1 : zu(r), ri(e, n, r, t)
                        }
                    }

                    function so(t) {
                        return function(e, n) {
                            return "string" == typeof e && "string" == typeof n || (e = Mu(e), n = Mu(n)), t(e, n)
                        }
                    }

                    function ao(t, e, n, r, i, o, s, a, u, l) {
                        var c = e & wt,
                            h = c ? s : ot,
                            f = c ? ot : s,
                            d = c ? o : ot,
                            g = c ? ot : o;
                        e |= c ? zt : kt, e &= ~(c ? kt : zt), e & xt || (e &= ~(yt | bt));
                        var p = [t, e, i, d, h, g, f, a, u, l],
                            m = n.apply(ot, p);
                        return Fo(t) && Th(m, p), m.placeholder = r, Qo(m, t, e)
                    }

                    function uo(t) {
                        var e = lc[t];
                        return function(t, n) {
                            if (t = Mu(t), n = null == n ? 0 : Zc(ku(n), 292), n && Vc(t)) {
                                var r = (Ou(t) + "e").split("e");
                                return r = (Ou(e(r[0] + "e" + (+r[1] + n))) + "e").split("e"), +(r[0] + "e" + (+r[1] - n))
                            }
                            return e(t)
                        }
                    }

                    function lo(t) {
                        return function(e) {
                            var n = Eh(e);
                            return n == Qt ? G(e) : n == se ? Y(e) : L(e, t(e))
                        }
                    }

                    function co(t, e, n, r, i, o, s, a) {
                        var u = e & bt;
                        if (!u && "function" != typeof t) throw new dc(lt);
                        var l = r ? r.length : 0;
                        if (l || (e &= ~(zt | kt), r = i = ot), s = s === ot ? s : Xc(ku(s), 0), a = a === ot ? a : ku(a), l -= i ? i.length : 0, e & kt) {
                            var c = r,
                                h = i;
                            r = i = ot
                        }
                        var f = u ? ot : Ch(t),
                            d = [t, e, n, r, i, c, h, o, s, a];
                        if (f && Go(d, f), t = d[0], e = d[1], n = d[2], r = d[3], i = d[4], a = d[9] = d[9] === ot ? u ? 0 : t.length : Xc(d[9] - l, 0), !a && e & (wt | St) && (e &= ~(wt | St)), e && e != yt) g = e == wt || e == St ? Yi(t, e, a) : e != zt && e != (yt | zt) || i.length ? Qi.apply(ot, d) : io(t, e, n, r);
                        else var g = Gi(t, e, n);
                        return Qo((f ? xh : Th)(g, d), t, e)
                    }

                    function ho(t, e, n, r) {
                        return t === ot || Xa(t, mc[n]) && !yc.call(r, n) ? e : t
                    }

                    function fo(t, e, n, r, i, o) {
                        return au(t) && au(e) && (o.set(e, t), $r(t, e, ot, fo, o), o.delete(e)), t
                    }

                    function go(t) {
                        return mu(t) ? ot : t
                    }

                    function po(t, e, n, r, i, o) {
                        var s = n & vt,
                            a = t.length,
                            u = e.length;
                        if (a != u && !(s && u > a)) return !1;
                        var l = o.get(t),
                            c = o.get(e);
                        if (l && c) return l == e && c == t;
                        var h = -1,
                            f = !0,
                            d = n & _t ? new _n : ot;
                        for (o.set(t, e), o.set(e, t); ++h < a;) {
                            var g = t[h],
                                p = e[h];
                            if (r) var m = s ? r(p, g, h, e, t, o) : r(g, p, h, t, e, o);
                            if (m !== ot) {
                                if (m) continue;
                                f = !1;
                                break
                            }
                            if (d) {
                                if (!_(e, function(t, e) {
                                    if (!I(d, e) && (g === t || i(g, t, n, r, o))) return d.push(e)
                                })) {
                                    f = !1;
                                    break
                                }
                            } else if (g !== p && !i(g, p, n, r, o)) {
                                f = !1;
                                break
                            }
                        }
                        return o.delete(t), o.delete(e), f
                    }

                    function mo(t, e, n, r, i, o, s) {
                        switch (n) {
                            case de:
                                if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                                t = t.buffer, e = e.buffer;
                            case fe:
                                return !(t.byteLength != e.byteLength || !o(new jc(t), new jc(e)));
                            case $t:
                            case Xt:
                            case te:
                                return Xa(+t, +e);
                            case Yt:
                                return t.name == e.name && t.message == e.message;
                            case oe:
                            case ae:
                                return t == e + "";
                            case Qt:
                                var a = G;
                            case se:
                                var u = r & vt;
                                if (a || (a = Z), t.size != e.size && !u) return !1;
                                var l = s.get(t);
                                if (l) return l == e;
                                r |= _t, s.set(t, e);
                                var c = po(a(t), a(e), r, i, o, s);
                                return s.delete(t), c;
                            case ue:
                                if (gh) return gh.call(t) == gh.call(e)
                        }
                        return !1
                    }

                    function vo(t, e, n, r, i, o) {
                        var s = n & vt,
                            a = yo(t),
                            u = a.length;
                        if (u != yo(e).length && !s) return !1;
                        for (var l = u; l--;) {
                            var c = a[l];
                            if (!(s ? c in e : yc.call(e, c))) return !1
                        }
                        var h = o.get(t),
                            f = o.get(e);
                        if (h && f) return h == e && f == t;
                        var d = !0;
                        o.set(t, e), o.set(e, t);
                        for (var g = s; ++l < u;) {
                            c = a[l];
                            var p = t[c],
                                m = e[c];
                            if (r) var v = s ? r(m, p, c, e, t, o) : r(p, m, c, t, e, o);
                            if (!(v === ot ? p === m || i(p, m, n, r, o) : v)) {
                                d = !1;
                                break
                            }
                            g || (g = "constructor" == c)
                        }
                        if (d && !g) {
                            var _ = t.constructor,
                                y = e.constructor;
                            _ != y && "constructor" in t && "constructor" in e && !("function" == typeof _ && _ instanceof _ && "function" == typeof y && y instanceof y) && (d = !1)
                        }
                        return o.delete(t), o.delete(e), d
                    }

                    function _o(t) {
                        return Lh(Zo(t, ot, ms), t + "")
                    }

                    function yo(t) {
                        return lr(t, Hu, Mh)
                    }

                    function bo(t) {
                        return lr(t, Uu, jh)
                    }

                    function xo(t) {
                        for (var e = t.name + "", n = ah[e], r = yc.call(ah, e) ? n.length : 0; r--;) {
                            var i = n[r],
                                o = i.func;
                            if (null == o || o == t) return i.name
                        }
                        return e
                    }

                    function wo(t) {
                        return (yc.call(n, "placeholder") ? n : t).placeholder
                    }

                    function So() {
                        var t = n.iteratee || Rl;
                        return t = t === Rl ? Fr : t, arguments.length ? t(arguments[0], arguments[1]) : t
                    }

                    function zo(t, e) {
                        var n = t.__data__;
                        return Wo(e) ? n["string" == typeof e ? "string" : "hash"] : n.map
                    }

                    function ko(t) {
                        for (var e = Hu(t), n = e.length; n--;) {
                            var r = e[n],
                                i = t[r];
                            e[n] = [r, i, Ho(i)]
                        }
                        return e
                    }

                    function Co(t, e) {
                        var n = D(t, e);
                        return Nr(n) ? n : ot
                    }

                    function Mo(t) {
                        var e = yc.call(t, Nc),
                            n = t[Nc];
                        try {
                            t[Nc] = ot;
                            var r = !0
                        } catch (t) {}
                        var i = wc.call(t);
                        return r && (e ? t[Nc] = n : delete t[Nc]), i
                    }

                    function jo(t, e, n) {
                        for (var r = -1, i = n.length; ++r < i;) {
                            var o = n[r],
                                s = o.size;
                            switch (o.type) {
                                case "drop":
                                    t += s;
                                    break;
                                case "dropRight":
                                    e -= s;
                                    break;
                                case "take":
                                    e = Zc(e, t + s);
                                    break;
                                case "takeRight":
                                    t = Xc(t, e - s)
                            }
                        }
                        return {
                            start: t,
                            end: e
                        }
                    }

                    function Eo(t) {
                        var e = t.match(Be);
                        return e ? e[1].split(De) : []
                    }

                    function Oo(t, e, n) {
                        e = Ci(e, t);
                        for (var r = -1, i = e.length, o = !1; ++r < i;) {
                            var s = ns(e[r]);
                            if (!(o = null != t && n(t, s))) break;
                            t = t[s]
                        }
                        return o || ++r != i ? o : (i = null == t ? 0 : t.length, !!i && su(i) && No(s, i) && (bf(t) || yf(t)))
                    }

                    function To(t) {
                        var e = t.length,
                            n = new t.constructor(e);
                        return e && "string" == typeof t[0] && yc.call(t, "index") && (n.index = t.index, n.input = t.input), n
                    }

                    function Ao(t) {
                        return "function" != typeof t.constructor || Do(t) ? {} : mh(Oc(t))
                    }

                    function Lo(t, e, n) {
                        var r = t.constructor;
                        switch (e) {
                            case fe:
                                return Ei(t);
                            case $t:
                            case Xt:
                                return new r(+t);
                            case de:
                                return Oi(t, n);
                            case ge:
                            case pe:
                            case me:
                            case ve:
                            case _e:
                            case ye:
                            case be:
                            case xe:
                            case we:
                                return Li(t, n);
                            case Qt:
                                return new r;
                            case te:
                            case ae:
                                return new r(t);
                            case oe:
                                return Ti(t);
                            case se:
                                return new r;
                            case ue:
                                return Ai(t)
                        }
                    }

                    function Ro(t, e) {
                        var n = e.length;
                        if (!n) return t;
                        var r = n - 1;
                        return e[r] = (n > 1 ? "& " : "") + e[r], e = e.join(n > 2 ? ", " : " "), t.replace(Fe, "{\n/* [wrapped with " + e + "] */\n")
                    }

                    function qo(t) {
                        return bf(t) || yf(t) || !!(Rc && t && t[Rc])
                    }

                    function No(t, e) {
                        var n = "undefined" == typeof t ? "undefined" : o(t);
                        return e = null == e ? It : e, !!e && ("number" == n || "symbol" != n && Ke.test(t)) && t > -1 && t % 1 == 0 && t < e
                    }

                    function Io(t, e, n) {
                        if (!au(n)) return !1;
                        var r = "undefined" == typeof e ? "undefined" : o(e);
                        return !!("number" == r ? Za(n) && No(e, n.length) : "string" == r && e in n) && Xa(n[e], t)
                    }

                    function Po(t, e) {
                        if (bf(t)) return !1;
                        var n = "undefined" == typeof t ? "undefined" : o(t);
                        return !("number" != n && "symbol" != n && "boolean" != n && null != t && !yu(t)) || Re.test(t) || !Le.test(t) || null != e && t in cc(e)
                    }

                    function Wo(t) {
                        var e = "undefined" == typeof t ? "undefined" : o(t);
                        return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t
                    }

                    function Fo(t) {
                        var e = xo(t),
                            r = n[e];
                        if ("function" != typeof r || !(e in y.prototype)) return !1;
                        if (t === r) return !0;
                        var i = Ch(r);
                        return !!i && t === i[0]
                    }

                    function Bo(t) {
                        return !!xc && xc in t
                    }

                    function Do(t) {
                        var e = t && t.constructor;
                        return t === ("function" == typeof e && e.prototype || mc)
                    }

                    function Ho(t) {
                        return t === t && !au(t)
                    }

                    function Uo(t, e) {
                        return function(n) {
                            return null != n && n[t] === e && (e !== ot || t in cc(n))
                        }
                    }

                    function Vo(t) {
                        var e = Ra(t, function(t) {
                                return n.size === ft && n.clear(), t
                            }),
                            n = e.cache;
                        return e
                    }

                    function Go(t, e) {
                        var n = t[1],
                            r = e[1],
                            i = n | r,
                            o = i < (yt | bt | Ct),
                            s = r == Ct && n == wt || r == Ct && n == Mt && t[7].length <= e[8] || r == (Ct | Mt) && e[7].length <= e[8] && n == wt;
                        if (!o && !s) return t;
                        r & yt && (t[2] = e[2], i |= n & yt ? 0 : xt);
                        var a = e[3];
                        if (a) {
                            var u = t[3];
                            t[3] = u ? Ni(u, a, e[4]) : a, t[4] = u ? X(t[3], dt) : e[4]
                        }
                        return a = e[5], a && (u = t[5], t[5] = u ? Ii(u, a, e[6]) : a, t[6] = u ? X(t[5], dt) : e[6]), a = e[7], a && (t[7] = a), r & Ct && (t[8] = null == t[8] ? e[8] : Zc(t[8], e[8])), null == t[9] && (t[9] = e[9]), t[0] = e[0], t[1] = i, t
                    }

                    function $o(t) {
                        var e = [];
                        if (null != t)
                            for (var n in cc(t)) e.push(n);
                        return e
                    }

                    function Xo(t) {
                        return wc.call(t)
                    }

                    function Zo(t, e, n) {
                        return e = Xc(e === ot ? t.length - 1 : e, 0),
                            function() {
                                for (var r = arguments, i = -1, o = Xc(r.length - e, 0), a = oc(o); ++i < o;) a[i] = r[e + i];
                                i = -1;
                                for (var u = oc(e + 1); ++i < e;) u[i] = r[i];
                                return u[e] = n(a), s(t, this, u)
                            }
                    }

                    function Yo(t, e) {
                        return e.length < 2 ? t : ar(t, ci(e, 0, -1))
                    }

                    function Jo(t, e) {
                        for (var n = t.length, r = Zc(e.length, n), i = Pi(t); r--;) {
                            var o = e[r];
                            t[r] = No(o, n) ? i[o] : ot
                        }
                        return t
                    }

                    function Ko(t, e) {
                        if (("constructor" !== e || "function" != typeof t[e]) && "__proto__" != e) return t[e]
                    }

                    function Qo(t, e, n) {
                        var r = e + "";
                        return Lh(t, Ro(r, is(Eo(r), n)))
                    }

                    function ts(t) {
                        var e = 0,
                            n = 0;
                        return function() {
                            var r = Yc(),
                                i = At - (r - n);
                            if (n = r, i > 0) {
                                if (++e >= Tt) return arguments[0]
                            } else e = 0;
                            return t.apply(ot, arguments)
                        }
                    }

                    function es(t, e) {
                        var n = -1,
                            r = t.length,
                            i = r - 1;
                        for (e = e === ot ? r : e; ++n < e;) {
                            var o = ni(n, i),
                                s = t[o];
                            t[o] = t[n], t[n] = s
                        }
                        return t.length = e, t
                    }

                    function ns(t) {
                        if ("string" == typeof t || yu(t)) return t;
                        var e = t + "";
                        return "0" == e && 1 / t == -Nt ? "-0" : e
                    }

                    function rs(t) {
                        if (null != t) {
                            try {
                                return _c.call(t)
                            } catch (t) {}
                            try {
                                return t + ""
                            } catch (t) {}
                        }
                        return ""
                    }

                    function is(t, e) {
                        return u(Ht, function(n) {
                            var r = "_." + n[0];
                            e & n[1] && !f(t, r) && t.push(r)
                        }), t.sort()
                    }

                    function os(t) {
                        if (t instanceof y) return t.clone();
                        var e = new i(t.__wrapped__, t.__chain__);
                        return e.__actions__ = Pi(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e
                    }

                    function ss(t, e, n) {
                        e = (n ? Io(t, e, n) : e === ot) ? 1 : Xc(ku(e), 0);
                        var r = null == t ? 0 : t.length;
                        if (!r || e < 1) return [];
                        for (var i = 0, o = 0, s = oc(Bc(r / e)); i < r;) s[o++] = ci(t, i, i += e);
                        return s
                    }

                    function as(t) {
                        for (var e = -1, n = null == t ? 0 : t.length, r = 0, i = []; ++e < n;) {
                            var o = t[e];
                            o && (i[r++] = o)
                        }
                        return i
                    }

                    function us() {
                        var t = arguments.length;
                        if (!t) return [];
                        for (var e = oc(t - 1), n = arguments[0], r = t; r--;) e[r - 1] = arguments[r];
                        return p(bf(n) ? Pi(n) : [n], er(e, 1))
                    }

                    function ls(t, e, n) {
                        var r = null == t ? 0 : t.length;
                        return r ? (e = n || e === ot ? 1 : ku(e), ci(t, e < 0 ? 0 : e, r)) : []
                    }

                    function cs(t, e, n) {
                        var r = null == t ? 0 : t.length;
                        return r ? (e = n || e === ot ? 1 : ku(e), e = r - e, ci(t, 0, e < 0 ? 0 : e)) : []
                    }

                    function hs(t, e) {
                        return t && t.length ? bi(t, So(e, 3), !0, !0) : []
                    }

                    function fs(t, e) {
                        return t && t.length ? bi(t, So(e, 3), !0) : []
                    }

                    function ds(t, e, n, r) {
                        var i = null == t ? 0 : t.length;
                        return i ? (n && "number" != typeof n && Io(t, e, n) && (n = 0, r = i), Zn(t, e, n, r)) : []
                    }

                    function gs(t, e, n) {
                        var r = null == t ? 0 : t.length;
                        if (!r) return -1;
                        var i = null == n ? 0 : ku(n);
                        return i < 0 && (i = Xc(r + i, 0)), w(t, So(e, 3), i)
                    }

                    function ps(t, e, n) {
                        var r = null == t ? 0 : t.length;
                        if (!r) return -1;
                        var i = r - 1;
                        return n !== ot && (i = ku(n), i = n < 0 ? Xc(r + i, 0) : Zc(i, r - 1)), w(t, So(e, 3), i, !0)
                    }

                    function ms(t) {
                        return (null == t ? 0 : t.length) ? er(t, 1) : []
                    }

                    function vs(t) {
                        return (null == t ? 0 : t.length) ? er(t, Nt) : []
                    }

                    function _s(t, e) {
                        return (null == t ? 0 : t.length) ? (e = e === ot ? 1 : ku(e), er(t, e)) : []
                    }

                    function ys(t) {
                        for (var e = -1, n = null == t ? 0 : t.length, r = {}; ++e < n;) {
                            var i = t[e];
                            r[i[0]] = i[1]
                        }
                        return r
                    }

                    function bs(t) {
                        return t && t.length ? t[0] : ot
                    }

                    function xs(t, e, n) {
                        var r = null == t ? 0 : t.length;
                        if (!r) return -1;
                        var i = null == n ? 0 : ku(n);
                        return i < 0 && (i = Xc(r + i, 0)), S(t, e, i)
                    }

                    function ws(t) {
                        return (null == t ? 0 : t.length) ? ci(t, 0, -1) : []
                    }

                    function Ss(t, e) {
                        return null == t ? "" : Gc.call(t, e)
                    }

                    function zs(t) {
                        var e = null == t ? 0 : t.length;
                        return e ? t[e - 1] : ot
                    }

                    function ks(t, e, n) {
                        var r = null == t ? 0 : t.length;
                        if (!r) return -1;
                        var i = r;
                        return n !== ot && (i = ku(n), i = i < 0 ? Xc(r + i, 0) : Zc(i, r - 1)), e === e ? K(t, e, i) : w(t, k, i, !0)
                    }

                    function Cs(t, e) {
                        return t && t.length ? Zr(t, ku(e)) : ot
                    }

                    function Ms(t, e) {
                        return t && t.length && e && e.length ? ti(t, e) : t
                    }

                    function js(t, e, n) {
                        return t && t.length && e && e.length ? ti(t, e, So(n, 2)) : t
                    }

                    function Es(t, e, n) {
                        return t && t.length && e && e.length ? ti(t, e, ot, n) : t
                    }

                    function Os(t, e) {
                        var n = [];
                        if (!t || !t.length) return n;
                        var r = -1,
                            i = [],
                            o = t.length;
                        for (e = So(e, 3); ++r < o;) {
                            var s = t[r];
                            e(s, r, t) && (n.push(s), i.push(r))
                        }
                        return ei(t, i), n
                    }

                    function Ts(t) {
                        return null == t ? t : Qc.call(t)
                    }

                    function As(t, e, n) {
                        var r = null == t ? 0 : t.length;
                        return r ? (n && "number" != typeof n && Io(t, e, n) ? (e = 0, n = r) : (e = null == e ? 0 : ku(e), n = n === ot ? r : ku(n)), ci(t, e, n)) : []
                    }

                    function Ls(t, e) {
                        return fi(t, e)
                    }

                    function Rs(t, e, n) {
                        return di(t, e, So(n, 2))
                    }

                    function qs(t, e) {
                        var n = null == t ? 0 : t.length;
                        if (n) {
                            var r = fi(t, e);
                            if (r < n && Xa(t[r], e)) return r
                        }
                        return -1
                    }

                    function Ns(t, e) {
                        return fi(t, e, !0)
                    }

                    function Is(t, e, n) {
                        return di(t, e, So(n, 2), !0)
                    }

                    function Ps(t, e) {
                        if (null == t ? 0 : t.length) {
                            var n = fi(t, e, !0) - 1;
                            if (Xa(t[n], e)) return n
                        }
                        return -1
                    }

                    function Ws(t) {
                        return t && t.length ? gi(t) : []
                    }

                    function Fs(t, e) {
                        return t && t.length ? gi(t, So(e, 2)) : []
                    }

                    function Bs(t) {
                        var e = null == t ? 0 : t.length;
                        return e ? ci(t, 1, e) : []
                    }

                    function Ds(t, e, n) {
                        return t && t.length ? (e = n || e === ot ? 1 : ku(e), ci(t, 0, e < 0 ? 0 : e)) : []
                    }

                    function Hs(t, e, n) {
                        var r = null == t ? 0 : t.length;
                        return r ? (e = n || e === ot ? 1 : ku(e), e = r - e, ci(t, e < 0 ? 0 : e, r)) : []
                    }

                    function Us(t, e) {
                        return t && t.length ? bi(t, So(e, 3), !1, !0) : []
                    }

                    function Vs(t, e) {
                        return t && t.length ? bi(t, So(e, 3)) : []
                    }

                    function Gs(t) {
                        return t && t.length ? vi(t) : []
                    }

                    function $s(t, e) {
                        return t && t.length ? vi(t, So(e, 2)) : []
                    }

                    function Xs(t, e) {
                        return e = "function" == typeof e ? e : ot, t && t.length ? vi(t, ot, e) : []
                    }

                    function Zs(t) {
                        if (!t || !t.length) return [];
                        var e = 0;
                        return t = h(t, function(t) {
                            if (Ya(t)) return e = Xc(t.length, e), !0
                        }), A(e, function(e) {
                            return g(t, M(e))
                        })
                    }

                    function Ys(t, e) {
                        if (!t || !t.length) return [];
                        var n = Zs(t);
                        return null == e ? n : g(n, function(t) {
                            return s(e, ot, t)
                        })
                    }

                    function Js(t, e) {
                        return Si(t || [], e || [], An)
                    }

                    function Ks(t, e) {
                        return Si(t || [], e || [], ui)
                    }

                    function Qs(t) {
                        var e = n(t);
                        return e.__chain__ = !0, e
                    }

                    function ta(t, e) {
                        return e(t), t
                    }

                    function ea(t, e) {
                        return e(t)
                    }

                    function na() {
                        return Qs(this)
                    }

                    function ra() {
                        return new i(this.value(), this.__chain__)
                    }

                    function ia() {
                        this.__values__ === ot && (this.__values__ = Su(this.value()));
                        var t = this.__index__ >= this.__values__.length;
                        return {
                            done: t,
                            value: t ? ot : this.__values__[this.__index__++]
                        }
                    }

                    function oa() {
                        return this
                    }

                    function sa(t) {
                        for (var e, n = this; n instanceof r;) {
                            var i = os(n);
                            i.__index__ = 0, i.__values__ = ot, e ? o.__wrapped__ = i : e = i;
                            var o = i;
                            n = n.__wrapped__
                        }
                        return o.__wrapped__ = t, e
                    }

                    function aa() {
                        var t = this.__wrapped__;
                        if (t instanceof y) {
                            var e = t;
                            return this.__actions__.length && (e = new y(this)), e = e.reverse(), e.__actions__.push({
                                func: ea,
                                args: [Ts],
                                thisArg: ot
                            }), new i(e, this.__chain__)
                        }
                        return this.thru(Ts)
                    }

                    function ua() {
                        return xi(this.__wrapped__, this.__actions__)
                    }

                    function la(t, e, n) {
                        var r = bf(t) ? c : $n;
                        return n && Io(t, e, n) && (e = ot), r(t, So(e, 3))
                    }

                    function ca(t, e) {
                        return (bf(t) ? h : tr)(t, So(e, 3))
                    }

                    function ha(t, e) {
                        return er(va(t, e), 1)
                    }

                    function fa(t, e) {
                        return er(va(t, e), Nt)
                    }

                    function da(t, e, n) {
                        return n = n === ot ? 1 : ku(n), er(va(t, e), n)
                    }

                    function ga(t, e) {
                        return (bf(t) ? u : vh)(t, So(e, 3))
                    }

                    function pa(t, e) {
                        return (bf(t) ? l : _h)(t, So(e, 3))
                    }

                    function ma(t, e, n, r) {
                        t = Za(t) ? t : nl(t), n = n && !r ? ku(n) : 0;
                        var i = t.length;
                        return n < 0 && (n = Xc(i + n, 0)), _u(t) ? n <= i && t.indexOf(e, n) > -1 : !!i && S(t, e, n) > -1
                    }

                    function va(t, e) {
                        return (bf(t) ? g : Ur)(t, So(e, 3))
                    }

                    function _a(t, e, n, r) {
                        return null == t ? [] : (bf(e) || (e = null == e ? [] : [e]), n = r ? ot : n, bf(n) || (n = null == n ? [] : [n]), Yr(t, e, n))
                    }

                    function ya(t, e, n) {
                        var r = bf(t) ? m : E,
                            i = arguments.length < 3;
                        return r(t, So(e, 4), n, i, vh)
                    }

                    function ba(t, e, n) {
                        var r = bf(t) ? v : E,
                            i = arguments.length < 3;
                        return r(t, So(e, 4), n, i, _h)
                    }

                    function xa(t, e) {
                        return (bf(t) ? h : tr)(t, qa(So(e, 3)))
                    }

                    function wa(t) {
                        return (bf(t) ? jn : si)(t)
                    }

                    function Sa(t, e, n) {
                        return e = (n ? Io(t, e, n) : e === ot) ? 1 : ku(e), (bf(t) ? En : ai)(t, e)
                    }

                    function za(t) {
                        return (bf(t) ? On : li)(t)
                    }

                    function ka(t) {
                        if (null == t) return 0;
                        if (Za(t)) return _u(t) ? Q(t) : t.length;
                        var e = Eh(t);
                        return e == Qt || e == se ? t.size : Br(t).length
                    }

                    function Ca(t, e, n) {
                        var r = bf(t) ? _ : hi;
                        return n && Io(t, e, n) && (e = ot), r(t, So(e, 3))
                    }

                    function Ma(t, e) {
                        if ("function" != typeof e) throw new dc(lt);
                        return t = ku(t),
                            function() {
                                if (--t < 1) return e.apply(this, arguments)
                            }
                    }

                    function ja(t, e, n) {
                        return e = n ? ot : e, e = t && null == e ? t.length : e, co(t, Ct, ot, ot, ot, ot, e)
                    }

                    function Ea(t, e) {
                        var n;
                        if ("function" != typeof e) throw new dc(lt);
                        return t = ku(t),
                            function() {
                                return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = ot), n
                            }
                    }

                    function Oa(t, e, n) {
                        e = n ? ot : e;
                        var r = co(t, wt, ot, ot, ot, ot, ot, e);
                        return r.placeholder = Oa.placeholder, r
                    }

                    function Ta(t, e, n) {
                        e = n ? ot : e;
                        var r = co(t, St, ot, ot, ot, ot, ot, e);
                        return r.placeholder = Ta.placeholder, r
                    }

                    function Aa(t, e, n) {
                        function r(e) {
                            var n = f,
                                r = d;
                            return f = d = ot, _ = e, p = t.apply(r, n)
                        }

                        function i(t) {
                            return _ = t, m = Ah(a, e), y ? r(t) : p
                        }

                        function o(t) {
                            var n = t - v,
                                r = t - _,
                                i = e - n;
                            return b ? Zc(i, g - r) : i
                        }

                        function s(t) {
                            var n = t - v,
                                r = t - _;
                            return v === ot || n >= e || n < 0 || b && r >= g
                        }

                        function a() {
                            var t = uf();
                            return s(t) ? u(t) : void(m = Ah(a, o(t)))
                        }

                        function u(t) {
                            return m = ot, x && f ? r(t) : (f = d = ot, p)
                        }

                        function l() {
                            m !== ot && zh(m), _ = 0, f = v = d = m = ot
                        }

                        function c() {
                            return m === ot ? p : u(uf())
                        }

                        function h() {
                            var t = uf(),
                                n = s(t);
                            if (f = arguments, d = this, v = t, n) {
                                if (m === ot) return i(v);
                                if (b) return zh(m), m = Ah(a, e), r(v)
                            }
                            return m === ot && (m = Ah(a, e)), p
                        }
                        var f, d, g, p, m, v, _ = 0,
                            y = !1,
                            b = !1,
                            x = !0;
                        if ("function" != typeof t) throw new dc(lt);
                        return e = Mu(e) || 0, au(n) && (y = !!n.leading, b = "maxWait" in n, g = b ? Xc(Mu(n.maxWait) || 0, e) : g, x = "trailing" in n ? !!n.trailing : x), h.cancel = l, h.flush = c, h
                    }

                    function La(t) {
                        return co(t, jt)
                    }

                    function Ra(t, e) {
                        if ("function" != typeof t || null != e && "function" != typeof e) throw new dc(lt);
                        var n = function n() {
                            var r = arguments,
                                i = e ? e.apply(this, r) : r[0],
                                o = n.cache;
                            if (o.has(i)) return o.get(i);
                            var s = t.apply(this, r);
                            return n.cache = o.set(i, s) || o, s
                        };
                        return n.cache = new(Ra.Cache || fn), n
                    }

                    function qa(t) {
                        if ("function" != typeof t) throw new dc(lt);
                        return function() {
                            var e = arguments;
                            switch (e.length) {
                                case 0:
                                    return !t.call(this);
                                case 1:
                                    return !t.call(this, e[0]);
                                case 2:
                                    return !t.call(this, e[0], e[1]);
                                case 3:
                                    return !t.call(this, e[0], e[1], e[2])
                            }
                            return !t.apply(this, e)
                        }
                    }

                    function Na(t) {
                        return Ea(2, t)
                    }

                    function Ia(t, e) {
                        if ("function" != typeof t) throw new dc(lt);
                        return e = e === ot ? e : ku(e), oi(t, e)
                    }

                    function Pa(t, e) {
                        if ("function" != typeof t) throw new dc(lt);
                        return e = null == e ? 0 : Xc(ku(e), 0), oi(function(n) {
                            var r = n[e],
                                i = Mi(n, 0, e);
                            return r && p(i, r), s(t, this, i)
                        })
                    }

                    function Wa(t, e, n) {
                        var r = !0,
                            i = !0;
                        if ("function" != typeof t) throw new dc(lt);
                        return au(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), Aa(t, e, {
                            leading: r,
                            maxWait: e,
                            trailing: i
                        })
                    }

                    function Fa(t) {
                        return ja(t, 1)
                    }

                    function Ba(t, e) {
                        return gf(ki(e), t)
                    }

                    function Da() {
                        if (!arguments.length) return [];
                        var t = arguments[0];
                        return bf(t) ? t : [t]
                    }

                    function Ha(t) {
                        return Fn(t, mt)
                    }

                    function Ua(t, e) {
                        return e = "function" == typeof e ? e : ot, Fn(t, mt, e)
                    }

                    function Va(t) {
                        return Fn(t, gt | mt)
                    }

                    function Ga(t, e) {
                        return e = "function" == typeof e ? e : ot, Fn(t, gt | mt, e)
                    }

                    function $a(t, e) {
                        return null == e || Dn(t, e, Hu(e))
                    }

                    function Xa(t, e) {
                        return t === e || t !== t && e !== e
                    }

                    function Za(t) {
                        return null != t && su(t.length) && !iu(t)
                    }

                    function Ya(t) {
                        return uu(t) && Za(t)
                    }

                    function Ja(t) {
                        return t === !0 || t === !1 || uu(t) && cr(t) == $t
                    }

                    function Ka(t) {
                        return uu(t) && 1 === t.nodeType && !mu(t)
                    }

                    function Qa(t) {
                        if (null == t) return !0;
                        if (Za(t) && (bf(t) || "string" == typeof t || "function" == typeof t.splice || wf(t) || Mf(t) || yf(t))) return !t.length;
                        var e = Eh(t);
                        if (e == Qt || e == se) return !t.size;
                        if (Do(t)) return !Br(t).length;
                        for (var n in t)
                            if (yc.call(t, n)) return !1;
                        return !0
                    }

                    function tu(t, e) {
                        return Ar(t, e)
                    }

                    function eu(t, e, n) {
                        n = "function" == typeof n ? n : ot;
                        var r = n ? n(t, e) : ot;
                        return r === ot ? Ar(t, e, ot, n) : !!r
                    }

                    function nu(t) {
                        if (!uu(t)) return !1;
                        var e = cr(t);
                        return e == Yt || e == Zt || "string" == typeof t.message && "string" == typeof t.name && !mu(t)
                    }

                    function ru(t) {
                        return "number" == typeof t && Vc(t)
                    }

                    function iu(t) {
                        if (!au(t)) return !1;
                        var e = cr(t);
                        return e == Jt || e == Kt || e == Gt || e == ie
                    }

                    function ou(t) {
                        return "number" == typeof t && t == ku(t)
                    }

                    function su(t) {
                        return "number" == typeof t && t > -1 && t % 1 == 0 && t <= It
                    }

                    function au(t) {
                        var e = "undefined" == typeof t ? "undefined" : o(t);
                        return null != t && ("object" == e || "function" == e)
                    }

                    function uu(t) {
                        return null != t && "object" == ("undefined" == typeof t ? "undefined" : o(t))
                    }

                    function lu(t, e) {
                        return t === e || qr(t, e, ko(e))
                    }

                    function cu(t, e, n) {
                        return n = "function" == typeof n ? n : ot, qr(t, e, ko(e), n)
                    }

                    function hu(t) {
                        return pu(t) && t != +t
                    }

                    function fu(t) {
                        if (Oh(t)) throw new ac(ut);
                        return Nr(t)
                    }

                    function du(t) {
                        return null === t
                    }

                    function gu(t) {
                        return null == t
                    }

                    function pu(t) {
                        return "number" == typeof t || uu(t) && cr(t) == te
                    }

                    function mu(t) {
                        if (!uu(t) || cr(t) != ne) return !1;
                        var e = Oc(t);
                        if (null === e) return !0;
                        var n = yc.call(e, "constructor") && e.constructor;
                        return "function" == typeof n && n instanceof n && _c.call(n) == Sc
                    }

                    function vu(t) {
                        return ou(t) && t >= -It && t <= It
                    }

                    function _u(t) {
                        return "string" == typeof t || !bf(t) && uu(t) && cr(t) == ae
                    }

                    function yu(t) {
                        return "symbol" == ("undefined" == typeof t ? "undefined" : o(t)) || uu(t) && cr(t) == ue
                    }

                    function bu(t) {
                        return t === ot
                    }

                    function xu(t) {
                        return uu(t) && Eh(t) == ce
                    }

                    function wu(t) {
                        return uu(t) && cr(t) == he
                    }

                    function Su(t) {
                        if (!t) return [];
                        if (Za(t)) return _u(t) ? tt(t) : Pi(t);
                        if (qc && t[qc]) return V(t[qc]());
                        var e = Eh(t);
                        return (e == Qt ? G : e == se ? Z : nl)(t)
                    }

                    function zu(t) {
                        return t ? (t = Mu(t), t === Nt || t === -Nt ? (t < 0 ? -1 : 1) * Pt : t === t ? t : 0) : 0 === t ? t : 0
                    }

                    function ku(t) {
                        var e = zu(t),
                            n = e % 1;
                        return e === e ? n ? e - n : e : 0
                    }

                    function Cu(t) {
                        return t ? Wn(ku(t), 0, Ft) : 0
                    }

                    function Mu(t) {
                        if ("number" == typeof t) return t;
                        if (yu(t)) return Wt;
                        if (au(t)) {
                            var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                            t = au(e) ? e + "" : e
                        }
                        if ("string" != typeof t) return 0 === t ? t : +t;
                        t = R(t);
                        var n = Ze.test(t);
                        return n || Je.test(t) ? or(t.slice(2), n ? 2 : 8) : Xe.test(t) ? Wt : +t
                    }

                    function ju(t) {
                        return Wi(t, Uu(t))
                    }

                    function Eu(t) {
                        return t ? Wn(ku(t), -It, It) : 0 === t ? t : 0
                    }

                    function Ou(t) {
                        return null == t ? "" : mi(t)
                    }

                    function Tu(t, e) {
                        var n = mh(t);
                        return null == e ? n : qn(n, e)
                    }

                    function Au(t, e) {
                        return x(t, So(e, 3), nr)
                    }

                    function Lu(t, e) {
                        return x(t, So(e, 3), rr)
                    }

                    function Ru(t, e) {
                        return null == t ? t : yh(t, So(e, 3), Uu)
                    }

                    function qu(t, e) {
                        return null == t ? t : bh(t, So(e, 3), Uu)
                    }

                    function Nu(t, e) {
                        return t && nr(t, So(e, 3))
                    }

                    function Iu(t, e) {
                        return t && rr(t, So(e, 3))
                    }

                    function Pu(t) {
                        return null == t ? [] : sr(t, Hu(t))
                    }

                    function Wu(t) {
                        return null == t ? [] : sr(t, Uu(t))
                    }

                    function Fu(t, e, n) {
                        var r = null == t ? ot : ar(t, e);
                        return r === ot ? n : r
                    }

                    function Bu(t, e) {
                        return null != t && Oo(t, e, dr)
                    }

                    function Du(t, e) {
                        return null != t && Oo(t, e, br)
                    }

                    function Hu(t) {
                        return Za(t) ? Mn(t) : Br(t)
                    }

                    function Uu(t) {
                        return Za(t) ? Mn(t, !0) : Dr(t)
                    }

                    function Vu(t, e) {
                        var n = {};
                        return e = So(e, 3), nr(t, function(t, r, i) {
                            In(n, e(t, r, i), t)
                        }), n
                    }

                    function Gu(t, e) {
                        var n = {};
                        return e = So(e, 3), nr(t, function(t, r, i) {
                            In(n, r, e(t, r, i))
                        }), n
                    }

                    function $u(t, e) {
                        return Xu(t, qa(So(e)))
                    }

                    function Xu(t, e) {
                        if (null == t) return {};
                        var n = g(bo(t), function(t) {
                            return [t]
                        });
                        return e = So(e), Kr(t, n, function(t, n) {
                            return e(t, n[0])
                        })
                    }

                    function Zu(t, e, n) {
                        e = Ci(e, t);
                        var r = -1,
                            i = e.length;
                        for (i || (i = 1, t = ot); ++r < i;) {
                            var o = null == t ? ot : t[ns(e[r])];
                            o === ot && (r = i, o = n), t = iu(o) ? o.call(t) : o
                        }
                        return t
                    }

                    function Yu(t, e, n) {
                        return null == t ? t : ui(t, e, n)
                    }

                    function Ju(t, e, n, r) {
                        return r = "function" == typeof r ? r : ot, null == t ? t : ui(t, e, n, r)
                    }

                    function Ku(t, e, n) {
                        var r = bf(t),
                            i = r || wf(t) || Mf(t);
                        if (e = So(e, 4), null == n) {
                            var o = t && t.constructor;
                            n = i ? r ? new o : [] : au(t) && iu(o) ? mh(Oc(t)) : {}
                        }
                        return (i ? u : nr)(t, function(t, r, i) {
                            return e(n, t, r, i)
                        }), n
                    }

                    function Qu(t, e) {
                        return null == t || _i(t, e)
                    }

                    function tl(t, e, n) {
                        return null == t ? t : yi(t, e, ki(n))
                    }

                    function el(t, e, n, r) {
                        return r = "function" == typeof r ? r : ot, null == t ? t : yi(t, e, ki(n), r)
                    }

                    function nl(t) {
                        return null == t ? [] : N(t, Hu(t))
                    }

                    function rl(t) {
                        return null == t ? [] : N(t, Uu(t))
                    }

                    function il(t, e, n) {
                        return n === ot && (n = e, e = ot), n !== ot && (n = Mu(n), n = n === n ? n : 0), e !== ot && (e = Mu(e), e = e === e ? e : 0), Wn(Mu(t), e, n)
                    }

                    function ol(t, e, n) {
                        return e = zu(e), n === ot ? (n = e, e = 0) : n = zu(n), t = Mu(t), zr(t, e, n)
                    }

                    function sl(t, e, n) {
                        if (n && "boolean" != typeof n && Io(t, e, n) && (e = n = ot), n === ot && ("boolean" == typeof e ? (n = e, e = ot) : "boolean" == typeof t && (n = t, t = ot)), t === ot && e === ot ? (t = 0, e = 1) : (t = zu(t), e === ot ? (e = t, t = 0) : e = zu(e)), t > e) {
                            var r = t;
                            t = e, e = r
                        }
                        if (n || t % 1 || e % 1) {
                            var i = Kc();
                            return Zc(t + i * (e - t + ir("1e-" + ((i + "").length - 1))), e)
                        }
                        return ni(t, e)
                    }

                    function al(t) {
                        return Qf(Ou(t).toLowerCase())
                    }

                    function ul(t) {
                        return t = Ou(t), t && t.replace(Qe, xr).replace(Vn, "")
                    }

                    function ll(t, e, n) {
                        t = Ou(t), e = mi(e);
                        var r = t.length;
                        n = n === ot ? r : Wn(ku(n), 0, r);
                        var i = n;
                        return n -= e.length, n >= 0 && t.slice(n, i) == e
                    }

                    function cl(t) {
                        return t = Ou(t), t && Ee.test(t) ? t.replace(Me, wr) : t
                    }

                    function hl(t) {
                        return t = Ou(t), t && Ie.test(t) ? t.replace(Ne, "\\$&") : t
                    }

                    function fl(t, e, n) {
                        t = Ou(t), e = ku(e);
                        var r = e ? Q(t) : 0;
                        if (!e || r >= e) return t;
                        var i = (e - r) / 2;
                        return ro(Dc(i), n) + t + ro(Bc(i), n)
                    }

                    function dl(t, e, n) {
                        t = Ou(t), e = ku(e);
                        var r = e ? Q(t) : 0;
                        return e && r < e ? t + ro(e - r, n) : t
                    }

                    function gl(t, e, n) {
                        t = Ou(t), e = ku(e);
                        var r = e ? Q(t) : 0;
                        return e && r < e ? ro(e - r, n) + t : t
                    }

                    function pl(t, e, n) {
                        return n || null == e ? e = 0 : e && (e = +e), Jc(Ou(t).replace(Pe, ""), e || 0)
                    }

                    function ml(t, e, n) {
                        return e = (n ? Io(t, e, n) : e === ot) ? 1 : ku(e), ii(Ou(t), e)
                    }

                    function vl() {
                        var t = arguments,
                            e = Ou(t[0]);
                        return t.length < 3 ? e : e.replace(t[1], t[2])
                    }

                    function _l(t, e, n) {
                        return n && "number" != typeof n && Io(t, e, n) && (e = n = ot), (n = n === ot ? Ft : n >>> 0) ? (t = Ou(t), t && ("string" == typeof e || null != e && !kf(e)) && (e = mi(e), !e && H(t)) ? Mi(tt(t), 0, n) : t.split(e, n)) : []
                    }

                    function yl(t, e, n) {
                        return t = Ou(t), n = null == n ? 0 : Wn(ku(n), 0, t.length), e = mi(e), t.slice(n, n + e.length) == e
                    }

                    function bl(t, e, r) {
                        var i = n.templateSettings;
                        r && Io(t, e, r) && (e = ot), t = Ou(t), e = Af({}, e, i, ho);
                        var o, s, a = Af({}, e.imports, i.imports, ho),
                            u = Hu(a),
                            l = N(a, u),
                            c = 0,
                            h = e.interpolate || tn,
                            f = "__p += '",
                            d = hc((e.escape || tn).source + "|" + h.source + "|" + (h === Ae ? Ge : tn).source + "|" + (e.evaluate || tn).source + "|$", "g"),
                            g = "//# sourceURL=" + (yc.call(e, "sourceURL") ? (e.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Jn + "]") + "\n";
                        t.replace(d, function(e, n, r, i, a, u) {
                            return r || (r = i), f += t.slice(c, u).replace(en, B), n && (o = !0, f += "' +\n__e(" + n + ") +\n'"), a && (s = !0, f += "';\n" + a + ";\n__p += '"), r && (f += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), c = u + e.length, e
                        }), f += "';\n";
                        var p = yc.call(e, "variable") && e.variable;
                        if (p) {
                            if (Ue.test(p)) throw new ac(ct)
                        } else f = "with (obj) {\n" + f + "\n}\n";
                        f = (s ? f.replace(Se, "") : f).replace(ze, "$1").replace(ke, "$1;"), f = "function(" + (p || "obj") + ") {\n" + (p ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (o ? ", __e = _.escape" : "") + (s ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + f + "return __p\n}";
                        var m = td(function() {
                            return uc(u, g + "return " + f).apply(ot, l)
                        });
                        if (m.source = f, nu(m)) throw m;
                        return m
                    }

                    function xl(t) {
                        return Ou(t).toLowerCase()
                    }

                    function wl(t) {
                        return Ou(t).toUpperCase()
                    }

                    function Sl(t, e, n) {
                        if (t = Ou(t), t && (n || e === ot)) return R(t);
                        if (!t || !(e = mi(e))) return t;
                        var r = tt(t),
                            i = tt(e);
                        return Mi(r, P(r, i), W(r, i) + 1).join("")
                    }

                    function zl(t, e, n) {
                        if (t = Ou(t), t && (n || e === ot)) return t.slice(0, et(t) + 1);
                        if (!t || !(e = mi(e))) return t;
                        var r = tt(t);
                        return Mi(r, 0, W(r, tt(e)) + 1).join("")
                    }

                    function kl(t, e, n) {
                        if (t = Ou(t), t && (n || e === ot)) return t.replace(Pe, "");
                        if (!t || !(e = mi(e))) return t;
                        var r = tt(t);
                        return Mi(r, P(r, tt(e))).join("")
                    }

                    function Cl(t, e) {
                        var n = Et,
                            r = Ot;
                        if (au(e)) {
                            var i = "separator" in e ? e.separator : i;
                            n = "length" in e ? ku(e.length) : n, r = "omission" in e ? mi(e.omission) : r
                        }
                        t = Ou(t);
                        var o = t.length;
                        if (H(t)) {
                            var s = tt(t);
                            o = s.length
                        }
                        if (n >= o) return t;
                        var a = n - Q(r);
                        if (a < 1) return r;
                        var u = s ? Mi(s, 0, a).join("") : t.slice(0, a);
                        if (i === ot) return u + r;
                        if (s && (a += u.length - a), kf(i)) {
                            if (t.slice(a).search(i)) {
                                var l, c = u;
                                for (i.global || (i = hc(i.source, Ou($e.exec(i)) + "g")), i.lastIndex = 0; l = i.exec(c);) var h = l.index;
                                u = u.slice(0, h === ot ? a : h)
                            }
                        } else if (t.indexOf(mi(i), a) != a) {
                            var f = u.lastIndexOf(i);
                            f > -1 && (u = u.slice(0, f))
                        }
                        return u + r
                    }

                    function Ml(t) {
                        return t = Ou(t), t && je.test(t) ? t.replace(Ce, Sr) : t
                    }

                    function jl(t, e, n) {
                        return t = Ou(t), e = n ? ot : e, e === ot ? U(t) ? it(t) : b(t) : t.match(e) || []
                    }

                    function El(t) {
                        var e = null == t ? 0 : t.length,
                            n = So();
                        return t = e ? g(t, function(t) {
                            if ("function" != typeof t[1]) throw new dc(lt);
                            return [n(t[0]), t[1]]
                        }) : [], oi(function(n) {
                            for (var r = -1; ++r < e;) {
                                var i = t[r];
                                if (s(i[0], this, n)) return s(i[1], this, n)
                            }
                        })
                    }

                    function Ol(t) {
                        return Bn(Fn(t, gt))
                    }

                    function Tl(t) {
                        return function() {
                            return t
                        }
                    }

                    function Al(t, e) {
                        return null == t || t !== t ? e : t
                    }

                    function Ll(t) {
                        return t
                    }

                    function Rl(t) {
                        return Fr("function" == typeof t ? t : Fn(t, gt))
                    }

                    function ql(t) {
                        return Vr(Fn(t, gt))
                    }

                    function Nl(t, e) {
                        return Gr(t, Fn(e, gt))
                    }

                    function Il(t, e, n) {
                        var r = Hu(e),
                            i = sr(e, r);
                        null != n || au(e) && (i.length || !r.length) || (n = e, e = t, t = this, i = sr(e, Hu(e)));
                        var o = !(au(n) && "chain" in n && !n.chain),
                            s = iu(t);
                        return u(i, function(n) {
                            var r = e[n];
                            t[n] = r, s && (t.prototype[n] = function() {
                                var e = this.__chain__;
                                if (o || e) {
                                    var n = t(this.__wrapped__);
                                    return (n.__actions__ = Pi(this.__actions__)).push({
                                        func: r,
                                        args: arguments,
                                        thisArg: t
                                    }), n.__chain__ = e, n
                                }
                                return r.apply(t, p([this.value()], arguments))
                            })
                        }), t
                    }

                    function Pl() {
                        return ur._ === this && (ur._ = zc), this
                    }

                    function Wl() {}

                    function Fl(t) {
                        return t = ku(t), oi(function(e) {
                            return Zr(e, t)
                        })
                    }

                    function Bl(t) {
                        return Po(t) ? M(ns(t)) : Qr(t)
                    }

                    function Dl(t) {
                        return function(e) {
                            return null == t ? ot : ar(t, e)
                        }
                    }

                    function Hl() {
                        return []
                    }

                    function Ul() {
                        return !1
                    }

                    function Vl() {
                        return {}
                    }

                    function Gl() {
                        return ""
                    }

                    function $l() {
                        return !0
                    }

                    function Xl(t, e) {
                        if (t = ku(t), t < 1 || t > It) return [];
                        var n = Ft,
                            r = Zc(t, Ft);
                        e = So(e), t -= Ft;
                        for (var i = A(r, e); ++n < t;) e(n);
                        return i
                    }

                    function Zl(t) {
                        return bf(t) ? g(t, ns) : yu(t) ? [t] : Pi(Rh(Ou(t)))
                    }

                    function Yl(t) {
                        var e = ++bc;
                        return Ou(t) + e
                    }

                    function Jl(t) {
                        return t && t.length ? Xn(t, Ll, fr) : ot
                    }

                    function Kl(t, e) {
                        return t && t.length ? Xn(t, So(e, 2), fr) : ot
                    }

                    function Ql(t) {
                        return C(t, Ll)
                    }

                    function tc(t, e) {
                        return C(t, So(e, 2))
                    }

                    function ec(t) {
                        return t && t.length ? Xn(t, Ll, Hr) : ot
                    }

                    function nc(t, e) {
                        return t && t.length ? Xn(t, So(e, 2), Hr) : ot
                    }

                    function rc(t) {
                        return t && t.length ? T(t, Ll) : 0
                    }

                    function ic(t, e) {
                        return t && t.length ? T(t, So(e, 2)) : 0
                    }
                    e = null == e ? ur : kr.defaults(ur.Object(), e, kr.pick(ur, Yn));
                    var oc = e.Array,
                        sc = e.Date,
                        ac = e.Error,
                        uc = e.Function,
                        lc = e.Math,
                        cc = e.Object,
                        hc = e.RegExp,
                        fc = e.String,
                        dc = e.TypeError,
                        gc = oc.prototype,
                        pc = uc.prototype,
                        mc = cc.prototype,
                        vc = e["__core-js_shared__"],
                        _c = pc.toString,
                        yc = mc.hasOwnProperty,
                        bc = 0,
                        xc = function() {
                            var t = /[^.]+$/.exec(vc && vc.keys && vc.keys.IE_PROTO || "");
                            return t ? "Symbol(src)_1." + t : ""
                        }(),
                        wc = mc.toString,
                        Sc = _c.call(cc),
                        zc = ur._,
                        kc = hc("^" + _c.call(yc).replace(Ne, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                        Cc = hr ? e.Buffer : ot,
                        Mc = e.Symbol,
                        jc = e.Uint8Array,
                        Ec = Cc ? Cc.allocUnsafe : ot,
                        Oc = $(cc.getPrototypeOf, cc),
                        Tc = cc.create,
                        Ac = mc.propertyIsEnumerable,
                        Lc = gc.splice,
                        Rc = Mc ? Mc.isConcatSpreadable : ot,
                        qc = Mc ? Mc.iterator : ot,
                        Nc = Mc ? Mc.toStringTag : ot,
                        Ic = function() {
                            try {
                                var t = Co(cc, "defineProperty");
                                return t({}, "", {}), t
                            } catch (t) {}
                        }(),
                        Pc = e.clearTimeout !== ur.clearTimeout && e.clearTimeout,
                        Wc = sc && sc.now !== ur.Date.now && sc.now,
                        Fc = e.setTimeout !== ur.setTimeout && e.setTimeout,
                        Bc = lc.ceil,
                        Dc = lc.floor,
                        Hc = cc.getOwnPropertySymbols,
                        Uc = Cc ? Cc.isBuffer : ot,
                        Vc = e.isFinite,
                        Gc = gc.join,
                        $c = $(cc.keys, cc),
                        Xc = lc.max,
                        Zc = lc.min,
                        Yc = sc.now,
                        Jc = e.parseInt,
                        Kc = lc.random,
                        Qc = gc.reverse,
                        th = Co(e, "DataView"),
                        eh = Co(e, "Map"),
                        nh = Co(e, "Promise"),
                        rh = Co(e, "Set"),
                        ih = Co(e, "WeakMap"),
                        oh = Co(cc, "create"),
                        sh = ih && new ih,
                        ah = {},
                        uh = rs(th),
                        lh = rs(eh),
                        ch = rs(nh),
                        hh = rs(rh),
                        fh = rs(ih),
                        dh = Mc ? Mc.prototype : ot,
                        gh = dh ? dh.valueOf : ot,
                        ph = dh ? dh.toString : ot,
                        mh = function() {
                            function t() {}
                            return function(e) {
                                if (!au(e)) return {};
                                if (Tc) return Tc(e);
                                t.prototype = e;
                                var n = new t;
                                return t.prototype = ot, n
                            }
                        }();
                    n.templateSettings = {
                        escape: Oe,
                        evaluate: Te,
                        interpolate: Ae,
                        variable: "",
                        imports: {
                            _: n
                        }
                    }, n.prototype = r.prototype, n.prototype.constructor = n, i.prototype = mh(r.prototype), i.prototype.constructor = i, y.prototype = mh(r.prototype), y.prototype.constructor = y, rt.prototype.clear = We, rt.prototype.delete = He, rt.prototype.get = nn, rt.prototype.has = rn, rt.prototype.set = on, sn.prototype.clear = an, sn.prototype.delete = un, sn.prototype.get = ln, sn.prototype.has = cn, sn.prototype.set = hn, fn.prototype.clear = dn, fn.prototype.delete = gn, fn.prototype.get = pn, fn.prototype.has = mn, fn.prototype.set = vn, _n.prototype.add = _n.prototype.push = yn, _n.prototype.has = bn, xn.prototype.clear = wn, xn.prototype.delete = Sn, xn.prototype.get = zn, xn.prototype.has = kn, xn.prototype.set = Cn;
                    var vh = Ui(nr),
                        _h = Ui(rr, !0),
                        yh = Vi(),
                        bh = Vi(!0),
                        xh = sh ? function(t, e) {
                            return sh.set(t, e), t
                        } : Ll,
                        wh = Ic ? function(t, e) {
                            return Ic(t, "toString", {
                                configurable: !0,
                                enumerable: !1,
                                value: Tl(e),
                                writable: !0
                            })
                        } : Ll,
                        Sh = oi,
                        zh = Pc || function(t) {
                            return ur.clearTimeout(t)
                        },
                        kh = rh && 1 / Z(new rh([, -0]))[1] == Nt ? function(t) {
                            return new rh(t)
                        } : Wl,
                        Ch = sh ? function(t) {
                            return sh.get(t)
                        } : Wl,
                        Mh = Hc ? function(t) {
                            return null == t ? [] : (t = cc(t), h(Hc(t), function(e) {
                                return Ac.call(t, e)
                            }))
                        } : Hl,
                        jh = Hc ? function(t) {
                            for (var e = []; t;) p(e, Mh(t)), t = Oc(t);
                            return e
                        } : Hl,
                        Eh = cr;
                    (th && Eh(new th(new ArrayBuffer(1))) != de || eh && Eh(new eh) != Qt || nh && Eh(nh.resolve()) != re || rh && Eh(new rh) != se || ih && Eh(new ih) != ce) && (Eh = function(t) {
                        var e = cr(t),
                            n = e == ne ? t.constructor : ot,
                            r = n ? rs(n) : "";
                        if (r) switch (r) {
                            case uh:
                                return de;
                            case lh:
                                return Qt;
                            case ch:
                                return re;
                            case hh:
                                return se;
                            case fh:
                                return ce
                        }
                        return e
                    });
                    var Oh = vc ? iu : Ul,
                        Th = ts(xh),
                        Ah = Fc || function(t, e) {
                            return ur.setTimeout(t, e)
                        },
                        Lh = ts(wh),
                        Rh = Vo(function(t) {
                            var e = [];
                            return 46 === t.charCodeAt(0) && e.push(""), t.replace(qe, function(t, n, r, i) {
                                e.push(r ? i.replace(Ve, "$1") : n || t)
                            }), e
                        }),
                        qh = oi(function(t, e) {
                            return Ya(t) ? Gn(t, er(e, 1, Ya, !0)) : []
                        }),
                        Nh = oi(function(t, e) {
                            var n = zs(e);
                            return Ya(n) && (n = ot), Ya(t) ? Gn(t, er(e, 1, Ya, !0), So(n, 2)) : []
                        }),
                        Ih = oi(function(t, e) {
                            var n = zs(e);
                            return Ya(n) && (n = ot), Ya(t) ? Gn(t, er(e, 1, Ya, !0), ot, n) : []
                        }),
                        Ph = oi(function(t) {
                            var e = g(t, zi);
                            return e.length && e[0] === t[0] ? Cr(e) : []
                        }),
                        Wh = oi(function(t) {
                            var e = zs(t),
                                n = g(t, zi);
                            return e === zs(n) ? e = ot : n.pop(), n.length && n[0] === t[0] ? Cr(n, So(e, 2)) : []
                        }),
                        Fh = oi(function(t) {
                            var e = zs(t),
                                n = g(t, zi);
                            return e = "function" == typeof e ? e : ot, e && n.pop(), n.length && n[0] === t[0] ? Cr(n, ot, e) : []
                        }),
                        Bh = oi(Ms),
                        Dh = _o(function(t, e) {
                            var n = null == t ? 0 : t.length,
                                r = Pn(t, e);
                            return ei(t, g(e, function(t) {
                                return No(t, n) ? +t : t
                            }).sort(Ri)), r
                        }),
                        Hh = oi(function(t) {
                            return vi(er(t, 1, Ya, !0))
                        }),
                        Uh = oi(function(t) {
                            var e = zs(t);
                            return Ya(e) && (e = ot), vi(er(t, 1, Ya, !0), So(e, 2))
                        }),
                        Vh = oi(function(t) {
                            var e = zs(t);
                            return e = "function" == typeof e ? e : ot, vi(er(t, 1, Ya, !0), ot, e)
                        }),
                        Gh = oi(function(t, e) {
                            return Ya(t) ? Gn(t, e) : []
                        }),
                        $h = oi(function(t) {
                            return wi(h(t, Ya))
                        }),
                        Xh = oi(function(t) {
                            var e = zs(t);
                            return Ya(e) && (e = ot), wi(h(t, Ya), So(e, 2))
                        }),
                        Zh = oi(function(t) {
                            var e = zs(t);
                            return e = "function" == typeof e ? e : ot, wi(h(t, Ya), ot, e)
                        }),
                        Yh = oi(Zs),
                        Jh = oi(function(t) {
                            var e = t.length,
                                n = e > 1 ? t[e - 1] : ot;
                            return n = "function" == typeof n ? (t.pop(), n) : ot, Ys(t, n)
                        }),
                        Kh = _o(function(t) {
                            var e = t.length,
                                n = e ? t[0] : 0,
                                r = this.__wrapped__,
                                o = function(e) {
                                    return Pn(e, t)
                                };
                            return !(e > 1 || this.__actions__.length) && r instanceof y && No(n) ? (r = r.slice(n, +n + (e ? 1 : 0)), r.__actions__.push({
                                func: ea,
                                args: [o],
                                thisArg: ot
                            }), new i(r, this.__chain__).thru(function(t) {
                                return e && !t.length && t.push(ot), t
                            })) : this.thru(o)
                        }),
                        Qh = Di(function(t, e, n) {
                            yc.call(t, n) ? ++t[n] : In(t, n, 1)
                        }),
                        tf = Ji(gs),
                        ef = Ji(ps),
                        nf = Di(function(t, e, n) {
                            yc.call(t, n) ? t[n].push(e) : In(t, n, [e])
                        }),
                        rf = oi(function(t, e, n) {
                            var r = -1,
                                i = "function" == typeof e,
                                o = Za(t) ? oc(t.length) : [];
                            return vh(t, function(t) {
                                o[++r] = i ? s(e, t, n) : jr(t, e, n)
                            }), o
                        }),
                        of = Di(function(t, e, n) {
                            In(t, n, e)
                        }),
                        sf = Di(function(t, e, n) {
                            t[n ? 0 : 1].push(e)
                        }, function() {
                            return [
                                [],
                                []
                            ]
                        }),
                        af = oi(function(t, e) {
                            if (null == t) return [];
                            var n = e.length;
                            return n > 1 && Io(t, e[0], e[1]) ? e = [] : n > 2 && Io(e[0], e[1], e[2]) && (e = [e[0]]), Yr(t, er(e, 1), [])
                        }),
                        uf = Wc || function() {
                            return ur.Date.now()
                        },
                        lf = oi(function(t, e, n) {
                            var r = yt;
                            if (n.length) {
                                var i = X(n, wo(lf));
                                r |= zt
                            }
                            return co(t, r, e, n, i)
                        }),
                        cf = oi(function(t, e, n) {
                            var r = yt | bt;
                            if (n.length) {
                                var i = X(n, wo(cf));
                                r |= zt
                            }
                            return co(e, r, t, n, i)
                        }),
                        hf = oi(function(t, e) {
                            return Hn(t, 1, e)
                        }),
                        ff = oi(function(t, e, n) {
                            return Hn(t, Mu(e) || 0, n)
                        });
                    Ra.Cache = fn;
                    var df = Sh(function(t, e) {
                            e = 1 == e.length && bf(e[0]) ? g(e[0], q(So())) : g(er(e, 1), q(So()));
                            var n = e.length;
                            return oi(function(r) {
                                for (var i = -1, o = Zc(r.length, n); ++i < o;) r[i] = e[i].call(this, r[i]);
                                return s(t, this, r)
                            })
                        }),
                        gf = oi(function(t, e) {
                            return co(t, zt, ot, e, X(e, wo(gf)))
                        }),
                        pf = oi(function(t, e) {
                            return co(t, kt, ot, e, X(e, wo(pf)))
                        }),
                        mf = _o(function(t, e) {
                            return co(t, Mt, ot, ot, ot, e)
                        }),
                        vf = so(fr),
                        _f = so(function(t, e) {
                            return t >= e
                        }),
                        yf = Er(function() {
                            return arguments
                        }()) ? Er : function(t) {
                            return uu(t) && yc.call(t, "callee") && !Ac.call(t, "callee")
                        },
                        bf = oc.isArray,
                        xf = gr ? q(gr) : Or,
                        wf = Uc || Ul,
                        Sf = pr ? q(pr) : Tr,
                        zf = mr ? q(mr) : Rr,
                        kf = vr ? q(vr) : Ir,
                        Cf = _r ? q(_r) : Pr,
                        Mf = yr ? q(yr) : Wr,
                        jf = so(Hr),
                        Ef = so(function(t, e) {
                            return t <= e
                        }),
                        Of = Hi(function(t, e) {
                            if (Do(e) || Za(e)) return void Wi(e, Hu(e), t);
                            for (var n in e) yc.call(e, n) && An(t, n, e[n])
                        }),
                        Tf = Hi(function(t, e) {
                            Wi(e, Uu(e), t)
                        }),
                        Af = Hi(function(t, e, n, r) {
                            Wi(e, Uu(e), t, r)
                        }),
                        Lf = Hi(function(t, e, n, r) {
                            Wi(e, Hu(e), t, r)
                        }),
                        Rf = _o(Pn),
                        qf = oi(function(t, e) {
                            t = cc(t);
                            var n = -1,
                                r = e.length,
                                i = r > 2 ? e[2] : ot;
                            for (i && Io(e[0], e[1], i) && (r = 1); ++n < r;)
                                for (var o = e[n], s = Uu(o), a = -1, u = s.length; ++a < u;) {
                                    var l = s[a],
                                        c = t[l];
                                    (c === ot || Xa(c, mc[l]) && !yc.call(t, l)) && (t[l] = o[l])
                                }
                            return t
                        }),
                        Nf = oi(function(t) {
                            return t.push(ot, fo), s(Bf, ot, t)
                        }),
                        If = to(function(t, e, n) {
                            null != e && "function" != typeof e.toString && (e = wc.call(e)), t[e] = n
                        }, Tl(Ll)),
                        Pf = to(function(t, e, n) {
                            null != e && "function" != typeof e.toString && (e = wc.call(e)), yc.call(t, e) ? t[e].push(n) : t[e] = [n]
                        }, So),
                        Wf = oi(jr),
                        Ff = Hi(function(t, e, n) {
                            $r(t, e, n)
                        }),
                        Bf = Hi(function(t, e, n, r) {
                            $r(t, e, n, r)
                        }),
                        Df = _o(function(t, e) {
                            var n = {};
                            if (null == t) return n;
                            var r = !1;
                            e = g(e, function(e) {
                                return e = Ci(e, t), r || (r = e.length > 1), e
                            }), Wi(t, bo(t), n), r && (n = Fn(n, gt | pt | mt, go));
                            for (var i = e.length; i--;) _i(n, e[i]);
                            return n
                        }),
                        Hf = _o(function(t, e) {
                            return null == t ? {} : Jr(t, e)
                        }),
                        Uf = lo(Hu),
                        Vf = lo(Uu),
                        Gf = Xi(function(t, e, n) {
                            return e = e.toLowerCase(), t + (n ? al(e) : e)
                        }),
                        $f = Xi(function(t, e, n) {
                            return t + (n ? "-" : "") + e.toLowerCase()
                        }),
                        Xf = Xi(function(t, e, n) {
                            return t + (n ? " " : "") + e.toLowerCase()
                        }),
                        Zf = $i("toLowerCase"),
                        Yf = Xi(function(t, e, n) {
                            return t + (n ? "_" : "") + e.toLowerCase()
                        }),
                        Jf = Xi(function(t, e, n) {
                            return t + (n ? " " : "") + Qf(e)
                        }),
                        Kf = Xi(function(t, e, n) {
                            return t + (n ? " " : "") + e.toUpperCase()
                        }),
                        Qf = $i("toUpperCase"),
                        td = oi(function(t, e) {
                            try {
                                return s(t, ot, e)
                            } catch (t) {
                                return nu(t) ? t : new ac(t)
                            }
                        }),
                        ed = _o(function(t, e) {
                            return u(e, function(e) {
                                e = ns(e), In(t, e, lf(t[e], t))
                            }), t
                        }),
                        nd = Ki(),
                        rd = Ki(!0),
                        id = oi(function(t, e) {
                            return function(n) {
                                return jr(n, t, e)
                            }
                        }),
                        od = oi(function(t, e) {
                            return function(n) {
                                return jr(t, n, e)
                            }
                        }),
                        sd = no(g),
                        ad = no(c),
                        ud = no(_),
                        ld = oo(),
                        cd = oo(!0),
                        hd = eo(function(t, e) {
                            return t + e
                        }, 0),
                        fd = uo("ceil"),
                        dd = eo(function(t, e) {
                            return t / e
                        }, 1),
                        gd = uo("floor"),
                        pd = eo(function(t, e) {
                            return t * e
                        }, 1),
                        md = uo("round"),
                        vd = eo(function(t, e) {
                            return t - e
                        }, 0);
                    return n.after = Ma, n.ary = ja, n.assign = Of, n.assignIn = Tf, n.assignInWith = Af, n.assignWith = Lf, n.at = Rf, n.before = Ea, n.bind = lf, n.bindAll = ed, n.bindKey = cf, n.castArray = Da, n.chain = Qs, n.chunk = ss, n.compact = as, n.concat = us, n.cond = El, n.conforms = Ol, n.constant = Tl, n.countBy = Qh, n.create = Tu, n.curry = Oa, n.curryRight = Ta, n.debounce = Aa, n.defaults = qf, n.defaultsDeep = Nf, n.defer = hf, n.delay = ff, n.difference = qh, n.differenceBy = Nh, n.differenceWith = Ih, n.drop = ls, n.dropRight = cs, n.dropRightWhile = hs, n.dropWhile = fs, n.fill = ds, n.filter = ca, n.flatMap = ha, n.flatMapDeep = fa, n.flatMapDepth = da, n.flatten = ms, n.flattenDeep = vs, n.flattenDepth = _s, n.flip = La, n.flow = nd, n.flowRight = rd, n.fromPairs = ys, n.functions = Pu, n.functionsIn = Wu, n.groupBy = nf, n.initial = ws, n.intersection = Ph, n.intersectionBy = Wh, n.intersectionWith = Fh, n.invert = If, n.invertBy = Pf, n.invokeMap = rf, n.iteratee = Rl, n.keyBy = of, n.keys = Hu, n.keysIn = Uu, n.map = va, n.mapKeys = Vu, n.mapValues = Gu, n.matches = ql, n.matchesProperty = Nl, n.memoize = Ra, n.merge = Ff, n.mergeWith = Bf, n.method = id, n.methodOf = od, n.mixin = Il, n.negate = qa, n.nthArg = Fl, n.omit = Df, n.omitBy = $u, n.once = Na, n.orderBy = _a, n.over = sd, n.overArgs = df, n.overEvery = ad, n.overSome = ud, n.partial = gf, n.partialRight = pf, n.partition = sf, n.pick = Hf, n.pickBy = Xu, n.property = Bl, n.propertyOf = Dl, n.pull = Bh, n.pullAll = Ms, n.pullAllBy = js, n.pullAllWith = Es, n.pullAt = Dh, n.range = ld, n.rangeRight = cd, n.rearg = mf, n.reject = xa, n.remove = Os, n.rest = Ia, n.reverse = Ts, n.sampleSize = Sa, n.set = Yu, n.setWith = Ju, n.shuffle = za, n.slice = As, n.sortBy = af, n.sortedUniq = Ws, n.sortedUniqBy = Fs, n.split = _l, n.spread = Pa, n.tail = Bs, n.take = Ds, n.takeRight = Hs, n.takeRightWhile = Us, n.takeWhile = Vs, n.tap = ta, n.throttle = Wa, n.thru = ea, n.toArray = Su, n.toPairs = Uf, n.toPairsIn = Vf, n.toPath = Zl, n.toPlainObject = ju, n.transform = Ku, n.unary = Fa, n.union = Hh, n.unionBy = Uh, n.unionWith = Vh, n.uniq = Gs, n.uniqBy = $s, n.uniqWith = Xs, n.unset = Qu, n.unzip = Zs, n.unzipWith = Ys, n.update = tl, n.updateWith = el, n.values = nl, n.valuesIn = rl, n.without = Gh, n.words = jl, n.wrap = Ba, n.xor = $h, n.xorBy = Xh, n.xorWith = Zh, n.zip = Yh, n.zipObject = Js, n.zipObjectDeep = Ks, n.zipWith = Jh, n.entries = Uf, n.entriesIn = Vf, n.extend = Tf, n.extendWith = Af, Il(n, n), n.add = hd, n.attempt = td, n.camelCase = Gf, n.capitalize = al, n.ceil = fd, n.clamp = il, n.clone = Ha, n.cloneDeep = Va, n.cloneDeepWith = Ga, n.cloneWith = Ua, n.conformsTo = $a, n.deburr = ul, n.defaultTo = Al, n.divide = dd, n.endsWith = ll, n.eq = Xa, n.escape = cl, n.escapeRegExp = hl, n.every = la, n.find = tf, n.findIndex = gs, n.findKey = Au, n.findLast = ef, n.findLastIndex = ps, n.findLastKey = Lu, n.floor = gd, n.forEach = ga, n.forEachRight = pa, n.forIn = Ru, n.forInRight = qu, n.forOwn = Nu, n.forOwnRight = Iu, n.get = Fu, n.gt = vf, n.gte = _f, n.has = Bu, n.hasIn = Du, n.head = bs, n.identity = Ll, n.includes = ma, n.indexOf = xs, n.inRange = ol, n.invoke = Wf, n.isArguments = yf, n.isArray = bf, n.isArrayBuffer = xf, n.isArrayLike = Za, n.isArrayLikeObject = Ya, n.isBoolean = Ja, n.isBuffer = wf, n.isDate = Sf, n.isElement = Ka, n.isEmpty = Qa, n.isEqual = tu, n.isEqualWith = eu, n.isError = nu, n.isFinite = ru, n.isFunction = iu, n.isInteger = ou, n.isLength = su, n.isMap = zf, n.isMatch = lu, n.isMatchWith = cu, n.isNaN = hu, n.isNative = fu, n.isNil = gu, n.isNull = du, n.isNumber = pu, n.isObject = au, n.isObjectLike = uu, n.isPlainObject = mu, n.isRegExp = kf, n.isSafeInteger = vu, n.isSet = Cf, n.isString = _u, n.isSymbol = yu, n.isTypedArray = Mf, n.isUndefined = bu, n.isWeakMap = xu, n.isWeakSet = wu, n.join = Ss, n.kebabCase = $f, n.last = zs, n.lastIndexOf = ks, n.lowerCase = Xf, n.lowerFirst = Zf, n.lt = jf, n.lte = Ef, n.max = Jl, n.maxBy = Kl, n.mean = Ql, n.meanBy = tc, n.min = ec, n.minBy = nc, n.stubArray = Hl, n.stubFalse = Ul, n.stubObject = Vl, n.stubString = Gl, n.stubTrue = $l, n.multiply = pd, n.nth = Cs, n.noConflict = Pl, n.noop = Wl, n.now = uf, n.pad = fl, n.padEnd = dl, n.padStart = gl, n.parseInt = pl, n.random = sl, n.reduce = ya, n.reduceRight = ba, n.repeat = ml, n.replace = vl, n.result = Zu, n.round = md, n.runInContext = t, n.sample = wa, n.size = ka, n.snakeCase = Yf, n.some = Ca, n.sortedIndex = Ls, n.sortedIndexBy = Rs, n.sortedIndexOf = qs, n.sortedLastIndex = Ns, n.sortedLastIndexBy = Is, n.sortedLastIndexOf = Ps, n.startCase = Jf, n.startsWith = yl, n.subtract = vd, n.sum = rc, n.sumBy = ic, n.template = bl, n.times = Xl, n.toFinite = zu, n.toInteger = ku, n.toLength = Cu, n.toLower = xl, n.toNumber = Mu, n.toSafeInteger = Eu, n.toString = Ou, n.toUpper = wl, n.trim = Sl, n.trimEnd = zl, n.trimStart = kl, n.truncate = Cl, n.unescape = Ml, n.uniqueId = Yl, n.upperCase = Kf, n.upperFirst = Qf, n.each = ga, n.eachRight = pa, n.first = bs, Il(n, function() {
                        var t = {};
                        return nr(n, function(e, r) {
                            yc.call(n.prototype, r) || (t[r] = e)
                        }), t
                    }(), {
                        chain: !1
                    }), n.VERSION = st, u(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
                        n[t].placeholder = n
                    }), u(["drop", "take"], function(t, e) {
                        y.prototype[t] = function(n) {
                            n = n === ot ? 1 : Xc(ku(n), 0);
                            var r = this.__filtered__ && !e ? new y(this) : this.clone();
                            return r.__filtered__ ? r.__takeCount__ = Zc(n, r.__takeCount__) : r.__views__.push({
                                size: Zc(n, Ft),
                                type: t + (r.__dir__ < 0 ? "Right" : "")
                            }), r
                        }, y.prototype[t + "Right"] = function(e) {
                            return this.reverse()[t](e).reverse()
                        }
                    }), u(["filter", "map", "takeWhile"], function(t, e) {
                        var n = e + 1,
                            r = n == Lt || n == qt;
                        y.prototype[t] = function(t) {
                            var e = this.clone();
                            return e.__iteratees__.push({
                                iteratee: So(t, 3),
                                type: n
                            }), e.__filtered__ = e.__filtered__ || r, e
                        }
                    }), u(["head", "last"], function(t, e) {
                        var n = "take" + (e ? "Right" : "");
                        y.prototype[t] = function() {
                            return this[n](1).value()[0]
                        }
                    }), u(["initial", "tail"], function(t, e) {
                        var n = "drop" + (e ? "" : "Right");
                        y.prototype[t] = function() {
                            return this.__filtered__ ? new y(this) : this[n](1)
                        }
                    }), y.prototype.compact = function() {
                        return this.filter(Ll)
                    }, y.prototype.find = function(t) {
                        return this.filter(t).head()
                    }, y.prototype.findLast = function(t) {
                        return this.reverse().find(t)
                    }, y.prototype.invokeMap = oi(function(t, e) {
                        return "function" == typeof t ? new y(this) : this.map(function(n) {
                            return jr(n, t, e)
                        })
                    }), y.prototype.reject = function(t) {
                        return this.filter(qa(So(t)))
                    }, y.prototype.slice = function(t, e) {
                        t = ku(t);
                        var n = this;
                        return n.__filtered__ && (t > 0 || e < 0) ? new y(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== ot && (e = ku(e), n = e < 0 ? n.dropRight(-e) : n.take(e - t)), n)
                    }, y.prototype.takeRightWhile = function(t) {
                        return this.reverse().takeWhile(t).reverse()
                    }, y.prototype.toArray = function() {
                        return this.take(Ft)
                    }, nr(y.prototype, function(t, e) {
                        var r = /^(?:filter|find|map|reject)|While$/.test(e),
                            o = /^(?:head|last)$/.test(e),
                            s = n[o ? "take" + ("last" == e ? "Right" : "") : e],
                            a = o || /^find/.test(e);
                        s && (n.prototype[e] = function() {
                            var e = this.__wrapped__,
                                u = o ? [1] : arguments,
                                l = e instanceof y,
                                c = u[0],
                                h = l || bf(e),
                                f = function(t) {
                                    var e = s.apply(n, p([t], u));
                                    return o && d ? e[0] : e
                                };
                            h && r && "function" == typeof c && 1 != c.length && (l = h = !1);
                            var d = this.__chain__,
                                g = !!this.__actions__.length,
                                m = a && !d,
                                v = l && !g;
                            if (!a && h) {
                                e = v ? e : new y(this);
                                var _ = t.apply(e, u);
                                return _.__actions__.push({
                                    func: ea,
                                    args: [f],
                                    thisArg: ot
                                }), new i(_, d)
                            }
                            return m && v ? t.apply(this, u) : (_ = this.thru(f), m ? o ? _.value()[0] : _.value() : _)
                        })
                    }), u(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
                        var e = gc[t],
                            r = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                            i = /^(?:pop|shift)$/.test(t);
                        n.prototype[t] = function() {
                            var t = arguments;
                            if (i && !this.__chain__) {
                                var n = this.value();
                                return e.apply(bf(n) ? n : [], t)
                            }
                            return this[r](function(n) {
                                return e.apply(bf(n) ? n : [], t)
                            })
                        }
                    }), nr(y.prototype, function(t, e) {
                        var r = n[e];
                        if (r) {
                            var i = r.name + "";
                            yc.call(ah, i) || (ah[i] = []), ah[i].push({
                                name: e,
                                func: r
                            })
                        }
                    }), ah[Qi(ot, bt).name] = [{
                        name: "wrapper",
                        func: ot
                    }], y.prototype.clone = j, y.prototype.reverse = J, y.prototype.value = nt, n.prototype.at = Kh, n.prototype.chain = na, n.prototype.commit = ra, n.prototype.next = ia, n.prototype.plant = sa, n.prototype.reverse = aa, n.prototype.toJSON = n.prototype.valueOf = n.prototype.value = ua, n.prototype.first = n.prototype.head, qc && (n.prototype[qc] = oa), n
                },
                kr = zr();
            "object" == o(n(52)) && n(52) ? (ur._ = kr, r = function() {
                return kr
            }.call(e, n, e, i), !(r !== ot && (i.exports = r))) : cr ? ((cr.exports = kr)._ = kr, lr._ = kr) : ur._ = kr
        }).call(void 0)
    }).call(e, function() {
        return this
    }(), n(23)(t))
}, function(t, e, n) {
    "use strict";

    function r(t) {
        var e = t.parentNode,
            n = t.nextSibling;
        return e.removeChild(t),
            function() {
                n ? e.insertBefore(t, n) : e.appendChild(t)
            }
    }
    var i, o = n(10),
        s = n(2),
        a = function(t) {
            for (var e; e = t.lastChild;) t.removeChild(e)
        };
    t.exports = i = s.extend({
        renderSubviews: function() {
            var t = this.el,
                e = void 0 != t.parentNode;
            if (e) var n = r(t);
            a(t);
            for (var i, s, u = document.createDocumentFragment(), l = this._views(), c = o.sortBy(l, function(t) {
                return t.ordering
            }), h = 0; h < c.length; h++) i = c[h], i.render(), s = i.el, null != s && u.appendChild(s);
            return t.appendChild(u), e && n(), t
        },
        addView: function(t, e) {
            var n = this._views();
            if (null == e) throw "Invalid plugin. ";
            return null == e.ordering && (e.ordering = t), n[t] = e
        },
        removeViews: function() {
            var t, e, n = this._views();
            for (e in n) t = n[e], t.undelegateEvents(), t.unbind(), null != t.removeViews && t.removeViews(), t.remove();
            return this.views = {}
        },
        removeView: function(t) {
            var e = this._views();
            return e[t].remove(), delete e[t]
        },
        getView: function(t) {
            return this._views()[t]
        },
        remove: function() {
            return this.removeViews(), s.prototype.remove.apply(this)
        },
        _views: function() {
            return null == this.views && (this.views = {}), this.views
        }
    })
}, function(t, e, n) {
    var r;
    (function(t) {
        "use strict";
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        /*!
         * jBone v1.2.1 - 2017-09-19 - Library for DOM manipulation
         *
         * http://jbone.js.org
         *
         * Copyright 2017 Alexey Kupriyanenko
         * Released under the MIT license.
         */
        ! function(o) {
            function s(t) {
                var e = t.length,
                    n = "undefined" == typeof t ? "undefined" : i(t);
                return !y(n) && t !== o && (!(1 !== t.nodeType || !e) || b(n) || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
            }

            function a(t, e) {
                var n, r;
                this.originalEvent = t, r = function(t, e) {
                    "preventDefault" === t ? this[t] = function() {
                        return this.defaultPrevented = !0, e[t]()
                    } : "stopImmediatePropagation" === t ? this[t] = function() {
                        return this.immediatePropagationStopped = !0, e[t]()
                    } : y(e[t]) ? this[t] = function() {
                        return e[t]()
                    } : this[t] = e[t]
                };
                for (n in t)(t[n] || "function" == typeof t[n]) && r.call(this, n, t);
                x.extend(this, e, {
                    isImmediatePropagationStopped: function() {
                        return !!this.immediatePropagationStopped
                    }
                })
            }
            var u, l = o.$,
                c = o.jBone,
                h = /^<(\w+)\s*\/?>$/,
                f = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                d = [].slice,
                g = [].splice,
                p = Object.keys,
                m = o.document,
                v = function(t) {
                    return "string" == typeof t
                },
                _ = function(t) {
                    return t instanceof Object
                },
                y = function(t) {
                    return "[object Function]" === {}.toString.call(t)
                },
                b = function(t) {
                    return Array.isArray(t)
                },
                x = function(t, e) {
                    return new u.init(t, e)
                };
            x.noConflict = function() {
                return o.$ = l, o.jBone = c, x
            }, u = x.fn = x.prototype = {
                init: function(t, e) {
                    var n, r, i, o;
                    if (!t) return this;
                    if (v(t)) {
                        if (r = h.exec(t)) return this[0] = m.createElement(r[1]), this.length = 1, _(e) && this.attr(e), this;
                        if ((r = f.exec(t)) && r[1]) {
                            for (o = m.createDocumentFragment(), i = m.createElement("div"), i.innerHTML = t; i.lastChild;) o.appendChild(i.firstChild);
                            return n = d.call(o.childNodes), x.merge(this, n)
                        }
                        if (x.isElement(e)) return x(e).find(t);
                        try {
                            return n = m.querySelectorAll(t), x.merge(this, n)
                        } catch (t) {
                            return this
                        }
                    }
                    return t.nodeType ? (this[0] = t, this.length = 1, this) : y(t) ? t() : t instanceof x ? t : x.makeArray(t, this)
                },
                pop: [].pop,
                push: [].push,
                reverse: [].reverse,
                shift: [].shift,
                sort: [].sort,
                splice: [].splice,
                slice: [].slice,
                indexOf: [].indexOf,
                forEach: [].forEach,
                unshift: [].unshift,
                concat: [].concat,
                join: [].join,
                every: [].every,
                some: [].some,
                filter: [].filter,
                map: [].map,
                reduce: [].reduce,
                reduceRight: [].reduceRight,
                length: 0
            }, u.constructor = x, u.init.prototype = u, x.setId = function(t) {
                var e = t.jid;
                t === o ? e = "window" : void 0 === t.jid && (t.jid = e = ++x._cache.jid), x._cache.events[e] || (x._cache.events[e] = {})
            }, x.getData = function(t) {
                t = t instanceof x ? t[0] : t;
                var e = t === o ? "window" : t.jid;
                return {
                    jid: e,
                    events: x._cache.events[e]
                }
            }, x.isElement = function(t) {
                return t && t instanceof x || t instanceof HTMLElement || v(t)
            }, x._cache = {
                events: {},
                jid: 0
            }, u.pushStack = function(t) {
                return x.merge(this.constructor(), t)
            }, x.merge = function(t, e) {
                for (var n = e.length, r = t.length, i = 0; i < n;) t[r++] = e[i++];
                return t.length = r, t
            }, x.contains = function(t, e) {
                return t.contains(e)
            }, x.extend = function(t) {
                var e;
                return g.call(arguments, 1).forEach(function(n) {
                    if (e = t, n)
                        for (var r in n) e[r] = n[r]
                }), t
            }, x.makeArray = function(t, e) {
                var n = e || [];
                return null !== t && (s(t) ? x.merge(n, v(t) ? [t] : t) : n.push(t)), n
            }, x.unique = function(t) {
                if (null == t) return [];
                for (var e = [], n = 0, r = t.length; n < r; n++) {
                    var i = t[n];
                    e.indexOf(i) < 0 && e.push(i)
                }
                return e
            }, x.Event = function(t, e) {
                var n, r;
                return t.type && !e && (e = t, t = t.type), n = t.split(".").splice(1).join("."), r = t.split(".")[0], t = m.createEvent("Event"), t.initEvent(r, !0, !0), x.extend(t, {
                    namespace: n,
                    isDefaultPrevented: function() {
                        return t.defaultPrevented
                    }
                }, e)
            }, x.event = {
                add: function(t, e, n, r, i) {
                    x.setId(t);
                    var o, s, a, u = function(e) {
                            x.event.dispatch.call(t, e)
                        },
                        l = x.getData(t).events;
                    for (e = e.split(" "), s = e.length; s--;) a = e[s], o = a.split(".")[0], l[o] = l[o] || [], l[o].length ? u = l[o][0].fn : t.addEventListener && t.addEventListener(o, u, !1), l[o].push({
                        namespace: a.split(".").splice(1).join("."),
                        fn: u,
                        selector: i,
                        data: r,
                        originfn: n
                    })
                },
                remove: function(t, e, n, r) {
                    var i, o, s = function(t, e, r, i, o) {
                            var s;
                            (n && o.originfn === n || !n) && (s = o.fn), t[e][r].fn === s && (t[e].splice(r, 1), t[e].length || i.removeEventListener(e, s))
                        },
                        a = x.getData(t).events;
                    if (a) return !e && a ? p(a).forEach(function(e) {
                        for (o = a[e], i = o.length; i--;) s(a, e, i, t, o[i])
                    }) : void e.split(" ").forEach(function(e) {
                        var n, u = e.split(".")[0],
                            l = e.split(".").splice(1).join(".");
                        if (a[u])
                            for (o = a[u], i = o.length; i--;) n = o[i], (!l || l && n.namespace === l) && (!r || r && n.selector === r) && s(a, u, i, t, n);
                        else l && p(a).forEach(function(e) {
                            for (o = a[e], i = o.length; i--;) n = o[i], n.namespace.split(".")[0] === l.split(".")[0] && s(a, e, i, t, n)
                        })
                    })
                },
                trigger: function(t, e) {
                    var n = [];
                    v(e) ? n = e.split(" ").map(function(t) {
                        return x.Event(t)
                    }) : (e = e instanceof Event ? e : x.Event(e), n = [e]), n.forEach(function(e) {
                        e.type && t.dispatchEvent && t.dispatchEvent(e)
                    })
                },
                dispatch: function(t) {
                    for (var e, n, r, i, o, s = 0, u = 0, l = this, c = x.getData(l).events[t.type], h = c.length, f = [], d = []; s < h; s++) f.push(c[s]);
                    for (s = 0, h = f.length; s < h && ~c.indexOf(f[s]) && (!i || !i.isImmediatePropagationStopped()); s++)
                        if (n = null, o = {}, r = f[s], r.data && (o.data = r.data), r.selector) {
                            if (~(d = x(l).find(r.selector)).indexOf(t.target) && (n = t.target) || l !== t.target && l.contains(t.target)) {
                                if (!n)
                                    for (e = d.length, u = 0; u < e; u++) d[u] && d[u].contains(t.target) && (n = d[u]);
                                if (!n) continue;
                                o.currentTarget = n, i = new a(t, o), t.namespace && t.namespace !== r.namespace || r.originfn.call(n, i)
                            }
                        } else i = new a(t, o), t.namespace && t.namespace !== r.namespace || r.originfn.call(l, i)
                }
            }, u.on = function(t, e, n, r) {
                var i = this.length,
                    o = 0;
                if (null == n && null == r ? (r = e, n = e = void 0) : null == r && ("string" == typeof e ? (r = n, n = void 0) : (r = n, n = e, e = void 0)), !r) return this;
                for (; o < i; o++) x.event.add(this[o], t, r, n, e);
                return this
            }, u.one = function(t) {
                var e, n = arguments,
                    r = 0,
                    i = this.length,
                    o = d.call(n, 1, n.length - 1),
                    s = d.call(n, -1)[0];
                for (e = function(e) {
                    var n = x(e);
                    t.split(" ").forEach(function(t) {
                        var r = function r(i) {
                            n.off(t, r), s.call(e, i)
                        };
                        n.on.apply(n, [t].concat(o, r))
                    })
                }; r < i; r++) e(this[r]);
                return this
            }, u.trigger = function(t) {
                var e = 0,
                    n = this.length;
                if (!t) return this;
                for (; e < n; e++) x.event.trigger(this[e], t);
                return this
            }, u.off = function(t, e, n) {
                var r = 0,
                    i = this.length;
                for (y(e) && (n = e, e = void 0); r < i; r++) x.event.remove(this[r], t, n, e);
                return this
            }, u.find = function(t) {
                for (var e = [], n = 0, r = this.length, i = function(n) {
                    y(n.querySelectorAll) && [].forEach.call(n.querySelectorAll(t), function(t) {
                        e.push(t)
                    })
                }; n < r; n++) i(this[n]);
                return x(e)
            }, u.get = function(t) {
                return null != t ? t < 0 ? this[t + this.length] : this[t] : d.call(this)
            }, u.eq = function(t) {
                return x(this[t])
            }, u.parent = function() {
                for (var t, e = [], n = 0, r = this.length; n < r; n++) !~e.indexOf(t = this[n].parentElement) && t && e.push(t);
                return x(e)
            }, u.toArray = function() {
                return d.call(this)
            }, u.is = function() {
                var t = arguments;
                return this.some(function(e) {
                    return e.tagName.toLowerCase() === t[0]
                })
            }, u.has = function() {
                var t = arguments;
                return this.some(function(e) {
                    return e.querySelectorAll(t[0]).length
                })
            }, u.add = function(t, e) {
                return this.pushStack(x.unique(x.merge(this.get(), x(t, e))))
            }, u.attr = function(t, e) {
                var n, r = arguments,
                    i = 0,
                    o = this.length;
                if (v(t) && 1 === r.length) return this[0] && this[0].getAttribute(t);
                for (2 === r.length ? n = function(n) {
                    n.setAttribute(t, e)
                } : _(t) && (n = function(e) {
                    p(t).forEach(function(n) {
                        e.setAttribute(n, t[n])
                    })
                }); i < o; i++) n(this[i]);
                return this
            }, u.removeAttr = function(t) {
                for (var e = 0, n = this.length; e < n; e++) this[e].removeAttribute(t);
                return this
            }, u.val = function(t) {
                var e = 0,
                    n = this.length;
                if (0 === arguments.length) return this[0] && this[0].value;
                for (; e < n; e++) this[e].value = t;
                return this
            }, u.css = function(t, e) {
                var n, r = arguments,
                    i = 0,
                    s = this.length;
                if (v(t) && 1 === r.length) return this[0] && o.getComputedStyle(this[0])[t];
                for (2 === r.length ? n = function(n) {
                    n.style[t] = e
                } : _(t) && (n = function(e) {
                    p(t).forEach(function(n) {
                        e.style[n] = t[n]
                    })
                }); i < s; i++) n(this[i]);
                return this
            }, u.data = function(t, e) {
                var n, r = arguments,
                    i = {},
                    o = 0,
                    s = this.length,
                    a = function(t, e, n) {
                        _(n) ? (t.jdata = t.jdata || {}, t.jdata[e] = n) : t.dataset[e] = n
                    },
                    u = function(t) {
                        return "true" === t || "false" !== t && t
                    };
                if (0 === r.length) return this[0].jdata && (i = this[0].jdata), p(this[0].dataset).forEach(function(t) {
                    i[t] = u(this[0].dataset[t])
                }, this), i;
                if (1 === r.length && v(t)) return this[0] && u(this[0].dataset[t] || this[0].jdata && this[0].jdata[t]);
                for (1 === r.length && _(t) ? n = function(e) {
                    p(t).forEach(function(n) {
                        a(e, n, t[n])
                    })
                } : 2 === r.length && (n = function(n) {
                    a(n, t, e)
                }); o < s; o++) n(this[o]);
                return this
            }, u.removeData = function(t) {
                for (var e, n, r = 0, i = this.length; r < i; r++)
                    if (e = this[r].jdata, n = this[r].dataset, t) e && e[t] && delete e[t], delete n[t];
                    else {
                        for (t in e) delete e[t];
                        for (t in n) delete n[t]
                    } return this
            }, u.addClass = function(t) {
                for (var e = 0, n = 0, r = this.length, i = t ? t.trim().split(/\s+/) : []; e < r; e++)
                    for (n = 0, n = 0; n < i.length; n++) this[e].classList.add(i[n]);
                return this
            }, u.removeClass = function(t) {
                for (var e = 0, n = 0, r = this.length, i = t ? t.trim().split(/\s+/) : []; e < r; e++)
                    for (n = 0, n = 0; n < i.length; n++) this[e].classList.remove(i[n]);
                return this
            }, u.toggleClass = function(t, e) {
                var n = 0,
                    r = this.length,
                    i = "toggle";
                if (e === !0 && (i = "add") || e === !1 && (i = "remove"), t)
                    for (; n < r; n++) this[n].classList[i](t);
                return this
            }, u.hasClass = function(t) {
                var e = 0,
                    n = this.length;
                if (t)
                    for (; e < n; e++)
                        if (this[e].classList.contains(t)) return !0;
                return !1
            }, u.html = function(t) {
                var e, n = arguments;
                return 1 === n.length && void 0 !== t ? this.empty().append(t) : 0 === n.length && (e = this[0]) ? e.innerHTML : this
            }, u.append = function(t) {
                var e, n = 0,
                    r = this.length;
                for (v(t) && f.exec(t) ? t = x(t) : _(t) || (t = document.createTextNode(t)), t = t instanceof x ? t : x(t), e = function(e, n) {
                    t.forEach(function(t) {
                        n ? e.appendChild(t.cloneNode(!0)) : e.appendChild(t)
                    })
                }; n < r; n++) e(this[n], n);
                return this
            }, u.appendTo = function(t) {
                return x(t).append(this), this
            }, u.empty = function() {
                for (var t, e = 0, n = this.length; e < n; e++)
                    for (t = this[e]; t.lastChild;) t.removeChild(t.lastChild);
                return this
            }, u.remove = function() {
                var t, e = 0,
                    n = this.length;
                for (this.off(); e < n; e++) t = this[e], delete t.jdata, t.parentNode && t.parentNode.removeChild(t);
                return this
            }, "object" === i(t) && t && "object" === i(t.exports) ? t.exports = x : (r = function() {
                return x
            }.call(e, n, e, t), !(void 0 !== r && (t.exports = r)), o.jBone = o.$ = x)
        }("undefined" != typeof window ? window : void 0)
    }).call(e, n(23)(t))
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(105),
        o = r(i),
        s = o.default.extend({
            buildDOM: function() {
                return this.on("new:node", this.buildNode), this.on("new:button", this.buildButton), this.on("new:menu", this.buildMenu), o.default.prototype.buildDOM.call(this)
            },
            buildNode: function(t) {
                if (null != this.g) return t.style.lineHeight = this.g.menuconfig.get("menuItemLineHeight")
            },
            buildButton: function(t) {
                if (null != this.g) return t.style.fontSize = this.g.menuconfig.get("menuFontsize"), t.style.marginLeft = this.g.menuconfig.get("menuMarginLeft"), t.style.padding = this.g.menuconfig.get("menuPadding")
            },
            buildMenu: function(t) {
                if (null != this.g) return t.style.fontSize = this.g.menuconfig.get("menuItemFontsize")
            }
        });
    e.default = s
}, function(t, e) {
    "use strict";
    var n = {};
    n.removeToInsertLater = function(t) {
        var e, n;
        return n = t.parentNode, e = t.nextSibling, n.removeChild(t),
            function() {
                e ? n.insertBefore(t, e) : n.appendChild(t)
            }
    }, n.removeAllChilds = function(t) {
        var e;
        for (e = 0; t.firstChild;) e++, t.removeChild(t.firstChild)
    }, t.exports = n
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.columnsel = e.rowsel = e.possel = e.sel = void 0;
    var r = n(3),
        i = n(1).Model,
        o = i.extend({
            defaults: {
                type: "super"
            }
        }),
        s = o.extend({
            defaults: (0, r.extend)({}, o.prototype.defaults, {
                type: "row",
                seqId: ""
            }),
            inRow: function(t) {
                return t === this.get("seqId")
            },
            inColumn: function(t) {
                return !0
            },
            getLength: function() {
                return 1
            }
        }),
        a = o.extend({
            defaults: (0, r.extend)({}, o.prototype.defaults, {
                type: "column",
                xStart: -1,
                xEnd: -1
            }),
            inRow: function() {
                return !0
            },
            inColumn: function(t) {
                return xStart <= t && t <= xEnd
            },
            getLength: function() {
                return xEnd - xStart
            }
        }),
        u = s.extend((0, r.extend)({}, (0, r.pick)(a, "inColumn"), (0, r.pick)(a, "getLength"), {
            defaults: (0, r.extend)({}, a.prototype.defaults, s.prototype.defaults, {
                type: "pos"
            })
        }));
    e.sel = o, e.possel = u, e.rowsel = s, e.columnsel = a
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(8),
        i = n(3),
        o = n(1).Collection,
        s = o.extend({
            model: r.sel,
            initialize: function(t, e) {
                if ("undefined" != typeof e && null !== e) return this.g = e.g, this.listenTo(this.g, "residue:click", function(t) {
                    return this._handleE(t.evt, new r.possel({
                        xStart: t.rowPos,
                        xEnd: t.rowPos,
                        seqId: t.seqId
                    }))
                }), this.listenTo(this.g, "row:click", function(t) {
                    return this._handleE(t.evt, new r.rowsel({
                        seqId: t.seqId
                    }))
                }), this.listenTo(this.g, "column:click", function(t) {
                    return this._handleE(t.evt, new r.columnsel({
                        xStart: t.rowPos,
                        xEnd: t.rowPos + t.stepSize - 1
                    }))
                })
            },
            getSelForRow: function(t) {
                return this.filter(function(e) {
                    return e.inRow(t)
                })
            },
            getSelForColumns: function(t) {
                return this.filter(function(e) {
                    return e.inColumn(t)
                })
            },
            addJSON: function(t) {
                return this.add(this._fromJSON(t))
            },
            _fromJSON: function(t) {
                switch (t.type) {
                    case "column":
                        return new r.columnsel(t);
                    case "row":
                        return new r.rowsel(t);
                    case "pos":
                        return new r.possel(t)
                }
            },
            resetJSON: function(t) {
                return t = t.map(this._fromJSON), this.reset(t)
            },
            getBlocksForRow: function(t, e) {
                for (var n, r = this.filter(function(e) {
                    return e.inRow(t)
                }), i = [], o = function(t, n) {
                    var n = r[t];
                    return "row" === n.attributes.type ? (i = function() {
                        var t = [],
                            n = 0;
                        if (0 <= e)
                            for (; n <= e;) t.push(n++);
                        else
                            for (; n >= e;) t.push(n--);
                        return t
                    }(), "break") : void(i = i.concat(function() {
                        var t = [],
                            e = n.attributes.xStart;
                        if (n.attributes.xStart <= n.attributes.xEnd)
                            for (; e <= n.attributes.xEnd;) t.push(e++);
                        else
                            for (; e >= n.attributes.xEnd;) t.push(e--);
                        return t
                    }()))
                }, s = 0; s < r.length && "break" !== o(s, n); s++);
                return i
            },
            getAllColumnBlocks: function(t) {
                var e = (t.maxLen, t.withPos, []),
                    n = void 0;
                n = t.withPos ? this.filter(function(t) {
                    return null != t.get("xStart")
                }) : this.filter(function(t) {
                    return "column" === t.get("type")
                });
                for (var r, o = function(t, r) {
                    var r = n[t];
                    e = e.concat(function() {
                        var t = [],
                            e = r.attributes.xStart;
                        if (r.attributes.xStart <= r.attributes.xEnd)
                            for (; e <= r.attributes.xEnd;) t.push(e++);
                        else
                            for (; e >= r.attributes.xEnd;) t.push(e--);
                        return t
                    }())
                }, s = 0; s < n.length; s++) o(s, r);
                return e = (0, i.uniq)(e)
            },
            invertRow: function(t) {
                var e = this.where({
                    type: "row"
                });
                e = e.map(function(t) {
                    return t.attributes.seqId
                });
                for (var n, o = (0, i.filter)(t, function(t) {
                    return !(e.indexOf(t) >= 0)
                }), s = [], a = 0; a < o.length; a++) {
                    var n = o[a];
                    s.push(new r.rowsel({
                        seqId: n
                    }))
                }
                return this.reset(s)
            },
            invertCol: function(t) {
                var e = this.where({
                        type: "column"
                    }).reduce(function(t, e) {
                        return t.concat(function() {
                            var t = [],
                                n = e.attributes.xStart;
                            if (e.attributes.xStart <= e.attributes.xEnd)
                                for (; n <= e.attributes.xEnd;) t.push(n++);
                            else
                                for (; n >= e.attributes.xEnd;) t.push(n--);
                            return t
                        }())
                    }, []),
                    n = (0, i.filter)(t, function(t) {
                        return !(e.indexOf(t) >= 0)
                    });
                if (0 !== n.length) {
                    for (var o, s = [], a = n[0], u = a, l = 0; l < n.length; l++) o = n[l], u + 1 === o ? u = o : (s.push(new r.columnsel({
                        xStart: a,
                        xEnd: u
                    })), a = u = o);
                    return a !== u && s.push(new r.columnsel({
                        xStart: a,
                        xEnd: n[n.length - 1]
                    })), this.reset(s)
                }
            },
            _handleE: function(t, e) {
                return t.ctrlKey || t.metaKey ? this.add(e) : this.reset([e])
            },
            _reduceColumns: function() {
                return this.each(function(t, e, n) {
                    for (var r = (0, i.filter)(n, function(t) {
                        return "column" === t.get("type")
                    }), o = t.get("xStart"), s = t.get("xEnd"), a = (0, i.filter)(r, function(t) {
                        return t.get("xEnd") === o - 1
                    }), u = 0; u < a.length; u++) a[u].set("xEnd", o);
                    for (var l = (0, i.filter)(r, function(t) {
                        return t.get("xStart") === s + 1
                    }), c = 0; c < l.length; c++) l[c].set("xStart", s);
                    if (a.length > 0 || l.length > 0) return t.collection.remove(t)
                })
            }
        });
    e.default = s
}, function(t, e, n) {
    var r, i;
    (function(o) {
        "use strict";
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        ! function(o, a) {
            "object" === s(e) && "undefined" != typeof t ? t.exports = a() : (r = a, i = "function" == typeof r ? r.call(e, n, e, t) : r, !(void 0 !== i && (t.exports = i)))
        }(void 0, function() {
            function t(t, e) {
                return e = null == e ? t.length - 1 : +e,
                    function() {
                        for (var n = Math.max(arguments.length - e, 0), r = Array(n), i = 0; i < n; i++) r[i] = arguments[i + e];
                        switch (e) {
                            case 0:
                                return t.call(this, r);
                            case 1:
                                return t.call(this, arguments[0], r);
                            case 2:
                                return t.call(this, arguments[0], arguments[1], r)
                        }
                        var o = Array(e + 1);
                        for (i = 0; i < e; i++) o[i] = arguments[i];
                        return o[e] = r, t.apply(this, o)
                    }
            }

            function e(t) {
                var e = "undefined" == typeof t ? "undefined" : s(t);
                return "function" === e || "object" === e && !!t
            }

            function n(t) {
                return null === t
            }

            function r(t) {
                return void 0 === t
            }

            function i(t) {
                return t === !0 || t === !1 || "[object Boolean]" === ce.call(t)
            }

            function a(t) {
                return !(!t || 1 !== t.nodeType)
            }

            function u(t) {
                var e = "[object " + t + "]";
                return function(t) {
                    return ce.call(t) === e
                }
            }

            function l(t) {
                return null != t && Ae(t.getInt8) && Ee(t.buffer)
            }

            function c(t, e) {
                return null != t && he.call(t, e)
            }

            function h(t) {
                return !je(t) && ye(t) && !isNaN(parseFloat(t))
            }

            function f(t) {
                return ze(t) && _e(t)
            }

            function d(t) {
                return function() {
                    return t
                }
            }

            function g(t) {
                return function(e) {
                    var n = t(e);
                    return "number" == typeof n && n >= 0 && n <= we
                }
            }

            function p(t) {
                return function(e) {
                    return null == e ? void 0 : e[t]
                }
            }

            function m(t) {
                return ve ? ve(t) && !Ie(t) : De(t) && He.test(ce.call(t))
            }

            function v(t) {
                for (var e = {}, n = t.length, r = 0; r < n; ++r) e[t[r]] = !0;
                return {
                    contains: function(t) {
                        return e[t]
                    },
                    push: function(n) {
                        return e[n] = !0, t.push(n)
                    }
                }
            }

            function _(t, e) {
                e = v(e);
                var n = xe.length,
                    r = t.constructor,
                    i = Ae(r) && r.prototype || se,
                    o = "constructor";
                for (c(t, o) && !e.contains(o) && e.push(o); n--;) o = xe[n], o in t && t[o] !== i[o] && !e.contains(o) && e.push(o)
            }

            function y(t) {
                if (!e(t)) return [];
                if (pe) return pe(t);
                var n = [];
                for (var r in t) c(t, r) && n.push(r);
                return be && _(t, n), n
            }

            function b(t) {
                if (null == t) return !0;
                var e = Ve(t);
                return "number" == typeof e && (Pe(t) || Se(t) || Fe(t)) ? 0 === e : 0 === Ve(y(t))
            }

            function x(t, e) {
                var n = y(e),
                    r = n.length;
                if (null == t) return !r;
                for (var i = Object(t), o = 0; o < r; o++) {
                    var s = n[o];
                    if (e[s] !== i[s] || !(s in i)) return !1
                }
                return !0
            }

            function w(t) {
                return t instanceof w ? t : this instanceof w ? void(this._wrapped = t) : new w(t)
            }

            function S(t) {
                return new Uint8Array(t.buffer || t, t.byteOffset || 0, Be(t))
            }

            function z(t, e, n, r) {
                if (t === e) return 0 !== t || 1 / t === 1 / e;
                if (null == t || null == e) return !1;
                if (t !== t) return e !== e;
                var i = "undefined" == typeof t ? "undefined" : s(t);
                return ("function" === i || "object" === i || "object" == ("undefined" == typeof e ? "undefined" : s(e))) && k(t, e, n, r)
            }

            function k(t, e, n, r) {
                t instanceof w && (t = t._wrapped), e instanceof w && (e = e._wrapped);
                var i = ce.call(t);
                if (i !== ce.call(e)) return !1;
                if (Re && "[object Object]" == i && Ie(t)) {
                    if (!Ie(e)) return !1;
                    i = Ge
                }
                switch (i) {
                    case "[object RegExp]":
                    case "[object String]":
                        return "" + t == "" + e;
                    case "[object Number]":
                        return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +t === +e;
                    case "[object Symbol]":
                        return ae.valueOf.call(t) === ae.valueOf.call(e);
                    case "[object ArrayBuffer]":
                    case Ge:
                        return k(S(t), S(e), n, r)
                }
                var o = "[object Array]" === i;
                if (!o && Ue(t)) {
                    if (Be(t) !== Be(e)) return !1;
                    if (t.buffer === e.buffer && t.byteOffset === e.byteOffset) return !0;
                    o = !0
                }
                if (!o) {
                    if ("object" != ("undefined" == typeof t ? "undefined" : s(t)) || "object" != ("undefined" == typeof e ? "undefined" : s(e))) return !1;
                    var a = t.constructor,
                        u = e.constructor;
                    if (a !== u && !(Ae(a) && a instanceof a && Ae(u) && u instanceof u) && "constructor" in t && "constructor" in e) return !1
                }
                n = n || [], r = r || [];
                for (var l = n.length; l--;)
                    if (n[l] === t) return r[l] === e;
                if (n.push(t), r.push(e), o) {
                    if (l = t.length, l !== e.length) return !1;
                    for (; l--;)
                        if (!z(t[l], e[l], n, r)) return !1
                } else {
                    var h, f = y(t);
                    if (l = f.length, y(e).length !== l) return !1;
                    for (; l--;)
                        if (h = f[l], !c(e, h) || !z(t[h], e[h], n, r)) return !1
                }
                return n.pop(), r.pop(), !0
            }

            function C(t, e) {
                return z(t, e)
            }

            function M(t) {
                if (!e(t)) return [];
                var n = [];
                for (var r in t) n.push(r);
                return be && _(t, n), n
            }

            function j(t) {
                var e = Ve(t);
                return function(n) {
                    if (null == n) return !1;
                    if (Ve(M(n))) return !1;
                    for (var r = 0; r < e; r++)
                        if (!Ae(n[t[r]])) return !1;
                    return t !== Ke || !Ae(n[$e])
                }
            }

            function E(t) {
                for (var e = y(t), n = e.length, r = Array(n), i = 0; i < n; i++) r[i] = t[e[i]];
                return r
            }

            function O(t) {
                for (var e = y(t), n = e.length, r = Array(n), i = 0; i < n; i++) r[i] = [e[i], t[e[i]]];
                return r
            }

            function T(t) {
                for (var e = {}, n = y(t), r = 0, i = n.length; r < i; r++) e[t[n[r]]] = n[r];
                return e
            }

            function A(t) {
                var e = [];
                for (var n in t) Ae(t[n]) && e.push(n);
                return e.sort()
            }

            function L(t, e) {
                return function(n) {
                    var r = arguments.length;
                    if (e && (n = Object(n)), r < 2 || null == n) return n;
                    for (var i = 1; i < r; i++)
                        for (var o = arguments[i], s = t(o), a = s.length, u = 0; u < a; u++) {
                            var l = s[u];
                            e && void 0 !== n[l] || (n[l] = o[l])
                        }
                    return n
                }
            }

            function R() {
                return function() {}
            }

            function q(t) {
                if (!e(t)) return {};
                if (me) return me(t);
                var n = R();
                n.prototype = t;
                var r = new n;
                return n.prototype = null, r
            }

            function N(t, e) {
                var n = q(t);
                return e && sn(n, e), n
            }

            function I(t) {
                return e(t) ? Pe(t) ? t.slice() : on({}, t) : t
            }

            function P(t, e) {
                return e(t), t
            }

            function W(t) {
                return Pe(t) ? t : [t]
            }

            function F(t) {
                return w.toPath(t)
            }

            function B(t, e) {
                for (var n = e.length, r = 0; r < n; r++) {
                    if (null == t) return;
                    t = t[e[r]]
                }
                return n ? t : void 0
            }

            function D(t, e, n) {
                var i = B(t, F(e));
                return r(i) ? n : i
            }

            function H(t, e) {
                e = F(e);
                for (var n = e.length, r = 0; r < n; r++) {
                    var i = e[r];
                    if (!c(t, i)) return !1;
                    t = t[i]
                }
                return !!n
            }

            function U(t) {
                return t
            }

            function V(t) {
                return t = sn({}, t),
                    function(e) {
                        return x(e, t)
                    }
            }

            function G(t) {
                return t = F(t),
                    function(e) {
                        return B(e, t)
                    }
            }

            function $(t, e, n) {
                if (void 0 === e) return t;
                switch (null == n ? 3 : n) {
                    case 1:
                        return function(n) {
                            return t.call(e, n)
                        };
                    case 3:
                        return function(n, r, i) {
                            return t.call(e, n, r, i)
                        };
                    case 4:
                        return function(n, r, i, o) {
                            return t.call(e, n, r, i, o)
                        }
                }
                return function() {
                    return t.apply(e, arguments)
                }
            }

            function X(t, n, r) {
                return null == t ? U : Ae(t) ? $(t, n, r) : e(t) && !Pe(t) ? V(t) : G(t)
            }

            function Z(t, e) {
                return X(t, e, 1 / 0)
            }

            function Y(t, e, n) {
                return w.iteratee !== Z ? w.iteratee(t, e) : X(t, e, n)
            }

            function J(t, e, n) {
                e = Y(e, n);
                for (var r = y(t), i = r.length, o = {}, s = 0; s < i; s++) {
                    var a = r[s];
                    o[a] = e(t[a], a, t)
                }
                return o
            }

            function K() {}

            function Q(t) {
                return null == t ? K : function(e) {
                    return D(t, e)
                }
            }

            function tt(t, e, n) {
                var r = Array(Math.max(0, t));
                e = $(e, n, 1);
                for (var i = 0; i < t; i++) r[i] = e(i);
                return r
            }

            function et(t, e) {
                return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
            }

            function nt(t) {
                var e = function(e) {
                        return t[e]
                    },
                    n = "(?:" + y(t).join("|") + ")",
                    r = RegExp(n),
                    i = RegExp(n, "g");
                return function(t) {
                    return t = null == t ? "" : "" + t, r.test(t) ? t.replace(i, e) : t
                }
            }

            function rt(t) {
                return "\\" + pn[t]
            }

            function it(t, e, n) {
                !e && n && (e = n), e = an({}, e, w.templateSettings);
                var r = RegExp([(e.escape || gn).source, (e.interpolate || gn).source, (e.evaluate || gn).source].join("|") + "|$", "g"),
                    i = 0,
                    o = "__p+='";
                t.replace(r, function(e, n, r, s, a) {
                    return o += t.slice(i, a).replace(mn, rt), i = a + e.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : s && (o += "';\n" + s + "\n__p+='"), e
                }), o += "';\n";
                var s = e.variable;
                if (s) {
                    if (!vn.test(s)) throw new Error("variable is not a bare identifier: " + s)
                } else o = "with(obj||{}){\n" + o + "}\n", s = "obj";
                o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
                var a;
                try {
                    a = new Function(s, "_", o)
                } catch (t) {
                    throw t.source = o, t
                }
                var u = function(t) {
                    return a.call(this, t, w)
                };
                return u.source = "function(" + s + "){\n" + o + "}", u
            }

            function ot(t, e, n) {
                e = F(e);
                var r = e.length;
                if (!r) return Ae(n) ? n.call(t) : n;
                for (var i = 0; i < r; i++) {
                    var o = null == t ? void 0 : t[e[i]];
                    void 0 === o && (o = n, i = r), t = Ae(o) ? o.call(t) : o
                }
                return t
            }

            function st(t) {
                var e = ++_n + "";
                return t ? t + e : e
            }

            function at(t) {
                var e = w(t);
                return e._chain = !0, e
            }

            function ut(t, n, r, i, o) {
                if (!(i instanceof n)) return t.apply(r, o);
                var s = q(t.prototype),
                    a = t.apply(s, o);
                return e(a) ? a : s
            }

            function lt(t, e, n, r) {
                if (r = r || [], e || 0 === e) {
                    if (e <= 0) return r.concat(t)
                } else e = 1 / 0;
                for (var i = r.length, o = 0, s = Ve(t); o < s; o++) {
                    var a = t[o];
                    if (xn(a) && (Pe(a) || Fe(a)))
                        if (e > 1) lt(a, e - 1, n, r), i = r.length;
                        else
                            for (var u = 0, l = a.length; u < l;) r[i++] = a[u++];
                    else n || (r[i++] = a)
                }
                return r
            }

            function ct(t, e) {
                var n = function n(r) {
                    var i = n.cache,
                        o = "" + (e ? e.apply(this, arguments) : r);
                    return c(i, o) || (i[o] = t.apply(this, arguments)), i[o]
                };
                return n.cache = {}, n
            }

            function ht(t, e, n) {
                var r, i, o, s, a = 0;
                n || (n = {});
                var u = function() {
                        a = n.leading === !1 ? 0 : un(), r = null, s = t.apply(i, o), r || (i = o = null)
                    },
                    l = function() {
                        var l = un();
                        a || n.leading !== !1 || (a = l);
                        var c = e - (l - a);
                        return i = this, o = arguments, c <= 0 || c > e ? (r && (clearTimeout(r), r = null), a = l, s = t.apply(i, o), r || (i = o = null)) : r || n.trailing === !1 || (r = setTimeout(u, c)), s
                    };
                return l.cancel = function() {
                    clearTimeout(r), a = 0, r = i = o = null
                }, l
            }

            function ft(e, n, r) {
                var i, o, s, a, u, l = function t() {
                        var l = un() - o;
                        n > l ? i = setTimeout(t, n - l) : (i = null, r || (a = e.apply(u, s)), i || (s = u = null))
                    },
                    c = t(function(t) {
                        return u = this, s = t, o = un(), i || (i = setTimeout(l, n), r && (a = e.apply(u, s))), a
                    });
                return c.cancel = function() {
                    clearTimeout(i), i = s = u = null
                }, c
            }

            function dt(t, e) {
                return yn(e, t)
            }

            function gt(t) {
                return function() {
                    return !t.apply(this, arguments)
                }
            }

            function pt() {
                var t = arguments,
                    e = t.length - 1;
                return function() {
                    for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);
                    return r
                }
            }

            function mt(t, e) {
                return function() {
                    if (--t < 1) return e.apply(this, arguments)
                }
            }

            function vt(t, e) {
                var n;
                return function() {
                    return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = null), n
                }
            }

            function _t(t, e, n) {
                e = Y(e, n);
                for (var r, i = y(t), o = 0, s = i.length; o < s; o++)
                    if (r = i[o], e(t[r], r, t)) return r
            }

            function yt(t) {
                return function(e, n, r) {
                    n = Y(n, r);
                    for (var i = Ve(e), o = t > 0 ? 0 : i - 1; o >= 0 && o < i; o += t)
                        if (n(e[o], o, e)) return o;
                    return -1
                }
            }

            function bt(t, e, n, r) {
                n = Y(n, r, 1);
                for (var i = n(e), o = 0, s = Ve(t); o < s;) {
                    var a = Math.floor((o + s) / 2);
                    n(t[a]) < i ? o = a + 1 : s = a
                }
                return o
            }

            function xt(t, e, n) {
                return function(r, i, o) {
                    var s = 0,
                        a = Ve(r);
                    if ("number" == typeof o) t > 0 ? s = o >= 0 ? o : Math.max(o + a, s) : a = o >= 0 ? Math.min(o + 1, a) : o + a + 1;
                    else if (n && o && a) return o = n(r, i), r[o] === i ? o : -1;
                    if (i !== i) return o = e(le.call(r, s, a), f), o >= 0 ? o + s : -1;
                    for (o = t > 0 ? s : a - 1; o >= 0 && o < a; o += t)
                        if (r[o] === i) return o;
                    return -1
                }
            }

            function wt(t, e, n) {
                var r = xn(t) ? Cn : _t,
                    i = r(t, e, n);
                if (void 0 !== i && i !== -1) return t[i]
            }

            function St(t, e) {
                return wt(t, V(e))
            }

            function zt(t, e, n) {
                e = $(e, n);
                var r, i;
                if (xn(t))
                    for (r = 0, i = t.length; r < i; r++) e(t[r], r, t);
                else {
                    var o = y(t);
                    for (r = 0, i = o.length; r < i; r++) e(t[o[r]], o[r], t)
                }
                return t
            }

            function kt(t, e, n) {
                e = Y(e, n);
                for (var r = !xn(t) && y(t), i = (r || t).length, o = Array(i), s = 0; s < i; s++) {
                    var a = r ? r[s] : s;
                    o[s] = e(t[a], a, t)
                }
                return o
            }

            function Ct(t) {
                var e = function(e, n, r, i) {
                    var o = !xn(e) && y(e),
                        s = (o || e).length,
                        a = t > 0 ? 0 : s - 1;
                    for (i || (r = e[o ? o[a] : a], a += t); a >= 0 && a < s; a += t) {
                        var u = o ? o[a] : a;
                        r = n(r, e[u], u, e)
                    }
                    return r
                };
                return function(t, n, r, i) {
                    var o = arguments.length >= 3;
                    return e(t, $(n, i, 4), r, o)
                }
            }

            function Mt(t, e, n) {
                var r = [];
                return e = Y(e, n), zt(t, function(t, n, i) {
                    e(t, n, i) && r.push(t)
                }), r
            }

            function jt(t, e, n) {
                return Mt(t, gt(Y(e)), n)
            }

            function Et(t, e, n) {
                e = Y(e, n);
                for (var r = !xn(t) && y(t), i = (r || t).length, o = 0; o < i; o++) {
                    var s = r ? r[o] : o;
                    if (!e(t[s], s, t)) return !1
                }
                return !0
            }

            function Ot(t, e, n) {
                e = Y(e, n);
                for (var r = !xn(t) && y(t), i = (r || t).length, o = 0; o < i; o++) {
                    var s = r ? r[o] : o;
                    if (e(t[s], s, t)) return !0
                }
                return !1
            }

            function Tt(t, e, n, r) {
                return xn(t) || (t = E(t)), ("number" != typeof n || r) && (n = 0), jn(t, e, n) >= 0
            }

            function At(t, e) {
                return kt(t, G(e))
            }

            function Lt(t, e) {
                return Mt(t, V(e))
            }

            function Rt(t, e, n) {
                var r, i, o = -(1 / 0),
                    a = -(1 / 0);
                if (null == e || "number" == typeof e && "object" != s(t[0]) && null != t) {
                    t = xn(t) ? t : E(t);
                    for (var u = 0, l = t.length; u < l; u++) r = t[u], null != r && r > o && (o = r)
                } else e = Y(e, n), zt(t, function(t, n, r) {
                    i = e(t, n, r), (i > a || i === -(1 / 0) && o === -(1 / 0)) && (o = t, a = i)
                });
                return o
            }

            function qt(t, e, n) {
                var r, i, o = 1 / 0,
                    a = 1 / 0;
                if (null == e || "number" == typeof e && "object" != s(t[0]) && null != t) {
                    t = xn(t) ? t : E(t);
                    for (var u = 0, l = t.length; u < l; u++) r = t[u], null != r && r < o && (o = r)
                } else e = Y(e, n), zt(t, function(t, n, r) {
                    i = e(t, n, r), (i < a || i === 1 / 0 && o === 1 / 0) && (o = t, a = i)
                });
                return o
            }

            function Nt(t, e, n) {
                if (null == e || n) return xn(t) || (t = E(t)), t[et(t.length - 1)];
                var r = xn(t) ? I(t) : E(t),
                    i = Ve(r);
                e = Math.max(Math.min(e, i), 0);
                for (var o = i - 1, s = 0; s < e; s++) {
                    var a = et(s, o),
                        u = r[s];
                    r[s] = r[a], r[a] = u
                }
                return r.slice(0, e)
            }

            function It(t) {
                return Nt(t, 1 / 0)
            }

            function Pt(t, e, n) {
                var r = 0;
                return e = Y(e, n), At(kt(t, function(t, n, i) {
                    return {
                        value: t,
                        index: r++,
                        criteria: e(t, n, i)
                    }
                }).sort(function(t, e) {
                    var n = t.criteria,
                        r = e.criteria;
                    if (n !== r) {
                        if (n > r || void 0 === n) return 1;
                        if (n < r || void 0 === r) return -1
                    }
                    return t.index - e.index
                }), "value")
            }

            function Wt(t, e) {
                return function(n, r, i) {
                    var o = e ? [
                        [],
                        []
                    ] : {};
                    return r = Y(r, i), zt(n, function(e, i) {
                        t(o, e, r(e, i, n))
                    }), o
                }
            }

            function Ft(t) {
                return t ? Pe(t) ? le.call(t) : Se(t) ? t.match(In) : xn(t) ? kt(t, U) : E(t) : []
            }

            function Bt(t) {
                return null == t ? 0 : xn(t) ? t.length : y(t).length
            }

            function Dt(t, e, n) {
                return e in n
            }

            function Ht(t, e, n) {
                return le.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
            }

            function Ut(t, e, n) {
                return null == t || t.length < 1 ? null == e || n ? void 0 : [] : null == e || n ? t[0] : Ht(t, t.length - e)
            }

            function Vt(t, e, n) {
                return le.call(t, null == e || n ? 1 : e)
            }

            function Gt(t, e, n) {
                return null == t || t.length < 1 ? null == e || n ? void 0 : [] : null == e || n ? t[t.length - 1] : Vt(t, Math.max(0, t.length - e))
            }

            function $t(t) {
                return Mt(t, Boolean)
            }

            function Xt(t, e) {
                return lt(t, e, !1)
            }

            function Zt(t, e, n, r) {
                i(e) || (r = n, n = e, e = !1), null != n && (n = Y(n, r));
                for (var o = [], s = [], a = 0, u = Ve(t); a < u; a++) {
                    var l = t[a],
                        c = n ? n(l, a, t) : l;
                    e && !n ? (a && s === c || o.push(l), s = c) : n ? Tt(s, c) || (s.push(c), o.push(l)) : Tt(o, l) || o.push(l)
                }
                return o
            }

            function Yt(t) {
                for (var e = [], n = arguments.length, r = 0, i = Ve(t); r < i; r++) {
                    var o = t[r];
                    if (!Tt(e, o)) {
                        var s;
                        for (s = 1; s < n && Tt(arguments[s], o); s++);
                        s === n && e.push(o)
                    }
                }
                return e
            }

            function Jt(t) {
                for (var e = t && Rt(t, Ve).length || 0, n = Array(e), r = 0; r < e; r++) n[r] = At(t, r);
                return n
            }

            function Kt(t, e) {
                for (var n = {}, r = 0, i = Ve(t); r < i; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
                return n
            }

            function Qt(t, e, n) {
                null == e && (e = t || 0, t = 0), n || (n = e < t ? -1 : 1);
                for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), o = 0; o < r; o++, t += n) i[o] = t;
                return i
            }

            function te(t, e) {
                if (null == e || e < 1) return [];
                for (var n = [], r = 0, i = t.length; r < i;) n.push(le.call(t, r, r += e));
                return n
            }

            function ee(t, e) {
                return t._chain ? w(e).chain() : e
            }

            function ne(t) {
                return zt(A(t), function(e) {
                    var n = w[e] = t[e];
                    w.prototype[e] = function() {
                        var t = [this._wrapped];
                        return ue.apply(t, arguments), ee(this, n.apply(w, t))
                    }
                }), w
            }
            var re = "1.13.1",
                ie = "object" == ("undefined" == typeof self ? "undefined" : s(self)) && self.self === self && self || "object" == ("undefined" == typeof o ? "undefined" : s(o)) && o.global === o && o || Function("return this")() || {},
                oe = Array.prototype,
                se = Object.prototype,
                ae = "undefined" != typeof Symbol ? Symbol.prototype : null,
                ue = oe.push,
                le = oe.slice,
                ce = se.toString,
                he = se.hasOwnProperty,
                fe = "undefined" != typeof ArrayBuffer,
                de = "undefined" != typeof DataView,
                ge = Array.isArray,
                pe = Object.keys,
                me = Object.create,
                ve = fe && ArrayBuffer.isView,
                _e = isNaN,
                ye = isFinite,
                be = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                xe = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
                we = Math.pow(2, 53) - 1,
                Se = u("String"),
                ze = u("Number"),
                ke = u("Date"),
                Ce = u("RegExp"),
                Me = u("Error"),
                je = u("Symbol"),
                Ee = u("ArrayBuffer"),
                Oe = u("Function"),
                Te = ie.document && ie.document.childNodes;
            "function" != typeof /./ && "object" != ("undefined" == typeof Int8Array ? "undefined" : s(Int8Array)) && "function" != typeof Te && (Oe = function(t) {
                return "function" == typeof t || !1
            });
            var Ae = Oe,
                Le = u("Object"),
                Re = de && Le(new DataView(new ArrayBuffer(8))),
                qe = "undefined" != typeof Map && Le(new Map),
                Ne = u("DataView"),
                Ie = Re ? l : Ne,
                Pe = ge || u("Array"),
                We = u("Arguments");
            ! function() {
                We(arguments) || (We = function(t) {
                    return c(t, "callee")
                })
            }();
            var Fe = We,
                Be = p("byteLength"),
                De = g(Be),
                He = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/,
                Ue = fe ? m : d(!1),
                Ve = p("length");
            w.VERSION = re, w.prototype.value = function() {
                return this._wrapped
            }, w.prototype.valueOf = w.prototype.toJSON = w.prototype.value, w.prototype.toString = function() {
                return String(this._wrapped)
            };
            var Ge = "[object DataView]",
                $e = "forEach",
                Xe = "has",
                Ze = ["clear", "delete"],
                Ye = ["get", Xe, "set"],
                Je = Ze.concat($e, Ye),
                Ke = Ze.concat(Ye),
                Qe = ["add"].concat(Ze, $e, Xe),
                tn = qe ? j(Je) : u("Map"),
                en = qe ? j(Ke) : u("WeakMap"),
                nn = qe ? j(Qe) : u("Set"),
                rn = u("WeakSet"),
                on = L(M),
                sn = L(y),
                an = L(M, !0);
            w.toPath = W, w.iteratee = Z;
            var un = Date.now || function() {
                    return (new Date).getTime()
                },
                ln = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                cn = nt(ln),
                hn = T(ln),
                fn = nt(hn),
                dn = w.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                },
                gn = /(.)^/,
                pn = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                mn = /\\|'|\r|\n|\u2028|\u2029/g,
                vn = /^\s*(\w|\$)+\s*$/,
                _n = 0,
                yn = t(function(t, e) {
                    var n = yn.placeholder;
                    return function r() {
                        for (var i = 0, o = e.length, s = Array(o), a = 0; a < o; a++) s[a] = e[a] === n ? arguments[i++] : e[a];
                        for (; i < arguments.length;) s.push(arguments[i++]);
                        return ut(t, r, this, this, s)
                    }
                });
            yn.placeholder = w;
            var bn = t(function(e, n, r) {
                    if (!Ae(e)) throw new TypeError("Bind must be called on a function");
                    var i = t(function(t) {
                        return ut(e, i, n, this, r.concat(t))
                    });
                    return i
                }),
                xn = g(Ve),
                wn = t(function(t, e) {
                    e = lt(e, !1, !1);
                    var n = e.length;
                    if (n < 1) throw new Error("bindAll must be passed function names");
                    for (; n--;) {
                        var r = e[n];
                        t[r] = bn(t[r], t)
                    }
                    return t
                }),
                Sn = t(function(t, e, n) {
                    return setTimeout(function() {
                        return t.apply(null, n)
                    }, e)
                }),
                zn = yn(Sn, w, 1),
                kn = yn(vt, 2),
                Cn = yt(1),
                Mn = yt(-1),
                jn = xt(1, Cn, bt),
                En = xt(-1, Mn),
                On = Ct(1),
                Tn = Ct(-1),
                An = t(function(t, e, n) {
                    var r, i;
                    return Ae(e) ? i = e : (e = F(e), r = e.slice(0, -1), e = e[e.length - 1]), kt(t, function(t) {
                        var o = i;
                        if (!o) {
                            if (r && r.length && (t = B(t, r)), null == t) return;
                            o = t[e]
                        }
                        return null == o ? o : o.apply(t, n)
                    })
                }),
                Ln = Wt(function(t, e, n) {
                    c(t, n) ? t[n].push(e) : t[n] = [e]
                }),
                Rn = Wt(function(t, e, n) {
                    t[n] = e
                }),
                qn = Wt(function(t, e, n) {
                    c(t, n) ? t[n]++ : t[n] = 1
                }),
                Nn = Wt(function(t, e, n) {
                    t[n ? 0 : 1].push(e)
                }, !0),
                In = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g,
                Pn = t(function(t, e) {
                    var n = {},
                        r = e[0];
                    if (null == t) return n;
                    Ae(r) ? (e.length > 1 && (r = $(r, e[1])), e = M(t)) : (r = Dt, e = lt(e, !1, !1), t = Object(t));
                    for (var i = 0, o = e.length; i < o; i++) {
                        var s = e[i],
                            a = t[s];
                        r(a, s, t) && (n[s] = a)
                    }
                    return n
                }),
                Wn = t(function(t, e) {
                    var n, r = e[0];
                    return Ae(r) ? (r = gt(r), e.length > 1 && (n = e[1])) : (e = kt(lt(e, !1, !1), String), r = function(t, n) {
                        return !Tt(e, n)
                    }), Pn(t, r, n)
                }),
                Fn = t(function(t, e) {
                    return e = lt(e, !0, !0), Mt(t, function(t) {
                        return !Tt(e, t)
                    })
                }),
                Bn = t(function(t, e) {
                    return Fn(t, e)
                }),
                Dn = t(function(t) {
                    return Zt(lt(t, !0, !0))
                }),
                Hn = t(Jt);
            zt(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
                var e = oe[t];
                w.prototype[t] = function() {
                    var n = this._wrapped;
                    return null != n && (e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0]), ee(this, n)
                }
            }), zt(["concat", "join", "slice"], function(t) {
                var e = oe[t];
                w.prototype[t] = function() {
                    var t = this._wrapped;
                    return null != t && (t = e.apply(t, arguments)), ee(this, t)
                }
            });
            var Un = {
                    __proto__: null,
                    VERSION: re,
                    restArguments: t,
                    isObject: e,
                    isNull: n,
                    isUndefined: r,
                    isBoolean: i,
                    isElement: a,
                    isString: Se,
                    isNumber: ze,
                    isDate: ke,
                    isRegExp: Ce,
                    isError: Me,
                    isSymbol: je,
                    isArrayBuffer: Ee,
                    isDataView: Ie,
                    isArray: Pe,
                    isFunction: Ae,
                    isArguments: Fe,
                    isFinite: h,
                    isNaN: f,
                    isTypedArray: Ue,
                    isEmpty: b,
                    isMatch: x,
                    isEqual: C,
                    isMap: tn,
                    isWeakMap: en,
                    isSet: nn,
                    isWeakSet: rn,
                    keys: y,
                    allKeys: M,
                    values: E,
                    pairs: O,
                    invert: T,
                    functions: A,
                    methods: A,
                    extend: on,
                    extendOwn: sn,
                    assign: sn,
                    defaults: an,
                    create: N,
                    clone: I,
                    tap: P,
                    get: D,
                    has: H,
                    mapObject: J,
                    identity: U,
                    constant: d,
                    noop: K,
                    toPath: W,
                    property: G,
                    propertyOf: Q,
                    matcher: V,
                    matches: V,
                    times: tt,
                    random: et,
                    now: un,
                    escape: cn,
                    unescape: fn,
                    templateSettings: dn,
                    template: it,
                    result: ot,
                    uniqueId: st,
                    chain: at,
                    iteratee: Z,
                    partial: yn,
                    bind: bn,
                    bindAll: wn,
                    memoize: ct,
                    delay: Sn,
                    defer: zn,
                    throttle: ht,
                    debounce: ft,
                    wrap: dt,
                    negate: gt,
                    compose: pt,
                    after: mt,
                    before: vt,
                    once: kn,
                    findKey: _t,
                    findIndex: Cn,
                    findLastIndex: Mn,
                    sortedIndex: bt,
                    indexOf: jn,
                    lastIndexOf: En,
                    find: wt,
                    detect: wt,
                    findWhere: St,
                    each: zt,
                    forEach: zt,
                    map: kt,
                    collect: kt,
                    reduce: On,
                    foldl: On,
                    inject: On,
                    reduceRight: Tn,
                    foldr: Tn,
                    filter: Mt,
                    select: Mt,
                    reject: jt,
                    every: Et,
                    all: Et,
                    some: Ot,
                    any: Ot,
                    contains: Tt,
                    includes: Tt,
                    include: Tt,
                    invoke: An,
                    pluck: At,
                    where: Lt,
                    max: Rt,
                    min: qt,
                    shuffle: It,
                    sample: Nt,
                    sortBy: Pt,
                    groupBy: Ln,
                    indexBy: Rn,
                    countBy: qn,
                    partition: Nn,
                    toArray: Ft,
                    size: Bt,
                    pick: Pn,
                    omit: Wn,
                    first: Ut,
                    head: Ut,
                    take: Ut,
                    initial: Ht,
                    last: Gt,
                    rest: Vt,
                    tail: Vt,
                    drop: Vt,
                    compact: $t,
                    flatten: Xt,
                    without: Bn,
                    uniq: Zt,
                    unique: Zt,
                    union: Dn,
                    intersection: Yt,
                    difference: Fn,
                    unzip: Jt,
                    transpose: Jt,
                    zip: Hn,
                    object: Kt,
                    range: Qt,
                    chunk: te,
                    mixin: ne,
                    default: w
                },
                Vn = ne(Un);
            return Vn._ = Vn, Vn
        })
    }).call(e, function() {
        return this
    }())
}, function(t, e, n) {
    "use strict";
    t.exports = n(53)
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.version = e.xhr = e.seqs = e.parser = e.newick = e.matrix = e.gff = e.fasta = e.clustal = void 0;
    var i = n(55),
        o = r(i),
        s = n(56),
        a = r(s),
        u = n(57),
        l = r(u),
        c = n(59),
        h = r(c),
        f = n(61),
        d = r(f),
        g = n(13),
        p = r(g),
        m = n(25),
        v = r(m);
    e.clustal = o.default, e.fasta = a.default, e.gff = l.default, e.matrix = h.default, e.newick = d.default, e.parser = p.default, e.seqs = v.default;
    var _ = n(24);
    e.xhr = _;
    var y = "imported";
    "undefined" != typeof IO_VERSION && (y = IO_VERSION), e.version = y
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        i = n(24),
        o = {};
    e.default = o, o.read = function(t, e) {
        var n = function(t) {
            return function(n, r, i) {
                return o._onRetrieval(n, i, e, t)
            }
        }(this);
        return "undefined" == typeof e ? new Promise(function(r, o) {
            e = function(t, e) {
                t ? o(t) : r(e)
            }, i(t, n)
        }) : i(t, n)
    }, o._onRetrieval = function(t, e, n, r) {
        var i = void 0;
        return "undefined" != typeof t && (i = r.parse(e)), n.call(r, t, i)
    }, o.extend = function(t, e) {
        return extend(o, t, e)
    }, o.mixin = function(t) {
        var e = ["read"];
        return "object" !== ("undefined" == typeof t ? "undefined" : r(t)) && (t = t.prototype), e.forEach(function(e) {
            t[e] = o[e]
        }, this), t
    }
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = "http://www.w3.org/2000/svg",
        r = function(t, e) {
            for (var n in e) {
                var r = e[n];
                t.setAttributeNS(null, n, r)
            }
            return t
        },
        i = function(t) {
            var e = document.createElementNS(n, "svg");
            return e.setAttribute("width", t.width), e.setAttribute("height", t.height), e
        },
        o = function(t) {
            return r(document.createElementNS(n, "rect"), t)
        },
        s = function(t) {
            return r(document.createElementNS(n, "line"), t)
        },
        a = function(t) {
            return r(document.createElementNS(n, "polygon"), t)
        };
    e.base = i, e.line = s, e.rect = o, e.polygon = a
}, function(t, e, n) {
    var r, i, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    ! function(s) {
        "object" === o(e) ? t.exports = s() : (r = s, i = "function" == typeof r ? r.call(e, n, e, t) : r, !(void 0 !== i && (t.exports = i)))
    }(function() {
        "use strict";
        var t = {
            has: function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            },
            extend: function(t) {
                for (var e = 1; e < arguments.length; ++e) {
                    var n = arguments[e];
                    if (n)
                        for (var r in n) t[r] = n[r]
                }
                return t
            }
        };
        return function(e, n) {
            var r, i = this;
            r = e && t.has(e, "constructor") ? e.constructor : function() {
                return i.apply(this, arguments)
            }, t.extend(r, i, n);
            var o = function() {
                this.constructor = r
            };
            return o.prototype = i.prototype, r.prototype = new o, e && t.extend(r.prototype, e), r.__super__ = i.prototype, r
        }
    })
}, function(t, e, n) {
    "use strict";
    var r = n(11);
    r.onAll = function(t, e) {
        return this.on("all", t, e), this
    }, r.oldMixin = r.mixin, r.mixin = function(t) {
        r.oldMixin(t);
        for (var e = ["onAll"], n = 0; n < e.length; n++) {
            var i = e[n];
            t[i] = this[i]
        }
        return t
    }, t.exports = r
}, function(t, e, n) {
    (function(t) {
        "use strict";
        var e = {};
        e.d = e.defaultValue = function(t, e) {
            return void 0 === t ? "function" == typeof t ? e() : e : t
        }, e.id = function(t) {
            return document.getElementById(t)
        }, e.mk = function(t) {
            return document.createElement(t)
        }, void 0 !== t && void 0 !== t.exports && (t.exports = e)
    }).call(e, n(23)(t))
}, function(t, e) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e
            }
        }(),
        i = function() {
            function t() {
                n(this, t)
            }
            return r(t, null, [{
                key: "randomInt",
                value: function(t, e) {
                    if ("undefined" == typeof e || null === e) {
                        var n = [0, t];
                        t = n[0], e = n[1]
                    }
                    if (t > e) {
                        var r = [e, t];
                        t = r[0], e = r[1]
                    }
                    return Math.floor(Math.random() * (e - t + 1) + t)
                }
            }, {
                key: "uniqueId",
                value: function() {
                    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8, e = ""; e.length < t;) e += Math.random().toString(36).substr(2);
                    return e.substr(0, t)
                }
            }, {
                key: "getRandomInt",
                value: function(t, e) {
                    return Math.floor(Math.random() * (e - t + 1)) + t
                }
            }]), t
        }();
    e.default = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(12),
        i = n(3),
        o = n(78),
        s = n(79),
        a = {
            openInJalview: function(t, e) {
                "." === t.charAt(0) && (t = document.URL.substr(0, document.URL.lastIndexOf("/")) + "/" + t), t.indexOf("http") < 0 && (t = "http://" + window.location.hostname + t), t = encodeURIComponent(t);
                var n = "http://www.jalview.org/services/launchApp?open=" + t;
                return n += "&colour=" + e, window.open(n, "_blank")
            },
            publishWeb: function(t, e) {
                var n = r.fasta.write(t.seqs.toJSON());
                return n = encodeURIComponent(n), (0, r.xhr)({
                    method: "POST",
                    body: "sprunge=" + n,
                    uri: "http://sprunge.biojs.net",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }, function(t, n, r) {
                    return e(r.trim())
                })
            },
            shareLink: function(t, e) {
                var n = t.g.config.get("importURL"),
                    r = "http://msa.biojs.net/app/?seq=",
                    i = function(t) {
                        var n = r + t;
                        if (e) return e(n)
                    };
                return n ? i(n) : a.publishWeb(t, i)
            },
            saveAsFile: function(t, e) {
                var n = r.fasta.write(t.seqs.toJSON());
                return s(new Blob([n], {
                    type: "text/plain"
                }), e)
            },
            saveSelection: function(t, e) {
                var n = t.g.selcol.pluck("seqId");
                if (n.length > 0) {
                    n = t.seqs.filter(function(t) {
                        return n.indexOf(t.get("id")) >= 0
                    });
                    for (var i = n.length - 1, o = 0; 0 < i ? o <= i : o >= i; 0 < i ? o++ : o--) n[o] = n[o].toJSON()
                } else n = t.seqs.toJSON(), console.warn("no selection found");
                var a = r.fasta.write(n);
                return s(new Blob([a], {
                    type: "text/plain"
                }), e)
            },
            saveAnnots: function(t, e) {
                var n = t.seqs.map(function(t) {
                    if (n = t.get("features"), 0 !== n.length) {
                        var e = t.get("name");
                        return n.each(function(t) {
                            return t.set("seqname", e)
                        }), n.toJSON()
                    }
                });
                n = (0, i.flatten)((0, i.compact)(n));
                var o = r.gff.exportLines(n);
                return s(new Blob([o], {
                    type: "text/plain"
                }), e)
            },
            saveAsImg: function(t, e) {
                var n = t.getView("stage").getView("body").getView("seqblock").el;
                if ("undefined" != typeof n && null !== n) return s(o(n.toDataURL("image/png")), e, "image/png")
            }
        };
    e.default = a
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
            function t(t, e) {
                var n = [],
                    r = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    i = !0, o = t
                } finally {
                    try {
                        !r && a.return && a.return()
                    } finally {
                        if (i) throw o
                    }
                }
                return n
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = n(3),
        s = n(12),
        a = n(39),
        u = r(a),
        l = function(t) {
            return this.msa = t, this
        },
        c = {
            guessFileFromText: function(t, e) {
                if ("undefined" == typeof t || null === t) return console.warn("invalid file format"), ["", "error"];
                switch ((0, u.default)(t, e)) {
                    case "clustal":
                        var n = s.clustal,
                            r = "seqs";
                        break;
                    case "fasta":
                        n = s.fasta, r = "seqs";
                        break;
                    case "newick":
                        r = "newick";
                        break;
                    case "gff":
                        n = s.gff, r = "features";
                        break;
                    default:
                        alert("Unknown file format. Please contact us on Github for help.")
                }
                return [n, r]
            },
            parseText: function(t, e) {
                var n = this.guessFileFromText(t, e),
                    r = i(n, 2),
                    o = r[0],
                    s = r[1];
                return "seqs" === s ? [o.parse(t), s] : "features" === s ? [o.parseSeqs(t), s] : [t, s]
            },
            importFiles: function(t) {
                var e = this;
                return function() {
                    for (var n = [], r = t.length - 1, i = 0; 0 < r ? i <= r : i >= r; 0 < r ? i++ : i--) {
                        var o = t[i],
                            s = new FileReader;
                        s.onload = function(t) {
                            return e.importFile(t.target.result)
                        }, n.push(s.readAsText(o))
                    }
                    return n
                }()
            },
            importFile: function(t, e) {
                var n = this;
                e = e || {}, e.name = t.name;
                var r, o = this.parseText(t, e),
                    s = i(o, 2),
                    a = s[0],
                    u = s[1];
                return "error" === u ? (alert("An error happened"), "error") : ("seqs" === u ? (this.msa.seqs.reset(a), this.msa.g.config.set("url", "userimport"), this.msa.g.trigger("url:userImport")) : "features" === u ? this.msa.seqs.addFeatures(a) : "newick" === u ? this.msa.u.tree.loadTree(function() {
                    return n.msa.u.tree.showTree(t)
                }) : alert("Unknown file!"), r = t.name)
            },
            importURL: function(t, e) {
                var n = this;
                return t = this.msa.u.proxy.corsURL(t), this.msa.g.config.set("url", t), (0, s.xhr)({
                    url: t,
                    timeout: 0
                }, function(r, i, o) {
                    return r ? console.error(r) : "error" !== n.importFile(o, {
                        url: t
                    }) ? (n.msa.g.trigger("import:url", t), e ? e() : void 0) : void 0
                })
            }
        };
    (0, o.extend)(l.prototype, c), e.default = l
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(17),
        i = {
            loadScript: function(t, e) {
                var n = r.mk("script");
                return n.type = "text/javascript", n.src = t, n.async = !0, n.onload = n.onreadystatechange = function() {
                    if (!(t || this.readyState && "complete" !== this.readyState)) {
                        var t = !0;
                        return e()
                    }
                }, document.getElementsByTagName("script")[0].parentNode.appendChild(n)
            },
            joinCb: function(t, e, n) {
                e = e || 1;
                var r = 0,
                    i = function(t, e) {
                        return "undefined" == typeof t || null === t ? o() : function() {
                            var n;
                            return n = "apply", t.indexOf(n) >= 0 && t.apply(e, arguments), o()
                        }
                    },
                    o = function() {
                        if (r++, r === e) return t.call(n)
                    };
                return i
            }
        };
    e.default = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(3),
        i = function(t) {
            return this.g = t.g, this
        },
        o = {
            corsURL: function(t) {
                return document.URL.indexOf("localhost") >= 0 && "/" === t[0] ? t : "." === t.charAt(0) || "/" === t.charAt(0) ? t : (this.g.config.get("importProxyStripHttp") && (t = t.replace("http://", ""), t = t.replace("https://", "")), t = this.g.config.get("importProxy") + t)
            }
        };
    (0, r.extend)(i.prototype, o), e.default = i
}, function(t, e) {
    "use strict";
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
    }
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        for (var n = 0; n < t.length; n++) e(t[n])
    }

    function i(t) {
        for (var e in t)
            if (t.hasOwnProperty(e)) return !1;
        return !0
    }

    function o(t, e, n) {
        var r = t;
        return h(e) ? (n = e, "string" == typeof t && (r = {
            uri: t
        })) : r = d(e, {
            uri: t
        }), r.callback = n, r
    }

    function s(t, e, n) {
        return e = o(t, e, n), a(e)
    }

    function a(t) {
        function e() {
            4 === c.readyState && setTimeout(o, 0)
        }

        function n() {
            var t = void 0;
            if (t = c.response ? c.response : c.responseText || u(c), b) try {
                t = JSON.parse(t)
            } catch (t) {}
            return t
        }

        function r(t) {
            return clearTimeout(g), t instanceof Error || (t = new Error("" + (t || "Unknown XMLHttpRequest Error"))), t.statusCode = 0, l(t, x)
        }

        function o() {
            if (!d) {
                var e;
                clearTimeout(g), e = t.useXDR && void 0 === c.status ? 200 : 1223 === c.status ? 204 : c.status;
                var r = x,
                    i = null;
                return 0 !== e ? (r = {
                    body: n(),
                    statusCode: e,
                    method: m,
                    headers: {},
                    url: p,
                    rawRequest: c
                }, c.getAllResponseHeaders && (r.headers = f(c.getAllResponseHeaders()))) : i = new Error("Internal XMLHttpRequest Error"), l(i, r, r.body)
            }
        }
        if ("undefined" == typeof t.callback) throw new Error("callback argument missing");
        var a = !1,
            l = function(e, n, r) {
                a || (a = !0, t.callback(e, n, r))
            },
            c = t.xhr || null;
        c || (c = t.cors || t.useXDR ? new s.XDomainRequest : new s.XMLHttpRequest);
        var h, d, g, p = c.url = t.uri || t.url,
            m = c.method = t.method || "GET",
            v = t.body || t.data,
            _ = c.headers = t.headers || {},
            y = !!t.sync,
            b = !1,
            x = {
                body: void 0,
                headers: {},
                statusCode: 0,
                method: m,
                url: p,
                rawRequest: c
            };
        if ("json" in t && t.json !== !1 && (b = !0, _.accept || _.Accept || (_.Accept = "application/json"), "GET" !== m && "HEAD" !== m && (_["content-type"] || _["Content-Type"] || (_["Content-Type"] = "application/json"), v = JSON.stringify(t.json === !0 ? v : t.json))), c.onreadystatechange = e, c.onload = o, c.onerror = r, c.onprogress = function() {}, c.onabort = function() {
            d = !0
        }, c.ontimeout = r, c.open(m, p, !y, t.username, t.password), y || (c.withCredentials = !!t.withCredentials), !y && t.timeout > 0 && (g = setTimeout(function() {
            if (!d) {
                d = !0, c.abort("timeout");
                var t = new Error("XMLHttpRequest timeout");
                t.code = "ETIMEDOUT", r(t)
            }
        }, t.timeout)), c.setRequestHeader)
            for (h in _) _.hasOwnProperty(h) && c.setRequestHeader(h, _[h]);
        else if (t.headers && !i(t.headers)) throw new Error("Headers cannot be set on an XDomainRequest object");
        return "responseType" in t && (c.responseType = t.responseType), "beforeSend" in t && "function" == typeof t.beforeSend && t.beforeSend(c), c.send(v || null), c
    }

    function u(t) {
        try {
            if ("document" === t.responseType) return t.responseXML;
            var e = t.responseXML && "parsererror" === t.responseXML.documentElement.nodeName;
            if ("" === t.responseType && !e) return t.responseXML
        } catch (t) {}
        return null
    }

    function l() {}
    var c = n(81),
        h = n(82),
        f = n(101),
        d = n(139);
    t.exports = s, t.exports.default = s, s.XMLHttpRequest = c.XMLHttpRequest || l, s.XDomainRequest = "withCredentials" in new s.XMLHttpRequest ? s.XMLHttpRequest : c.XDomainRequest, r(["get", "put", "post", "patch", "head", "delete"], function(t) {
        s["delete" === t ? "del" : t] = function(e, n, r) {
            return n = o(e, n, r), n.method = t.toUpperCase(), a(n)
        }
    })
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = {};
    e.default = n, n.getMeta = function(t) {
        var e, n, r = !1,
            i = !1,
            o = {},
            s = {},
            a = t.split(" ");
        if (a.length >= 1 ? (r = a.shift(), i = a.join(" ")) : r = t, r) {
            var u = r.split("|");
            for (e = u.pop(), s.en = e; 0 != u.length;) {
                var l = u.shift(),
                    c = u.shift();
                o[l] = c
            }
        } else e = r;
        if (i) {
            var h = i.split("=");
            if (h.length > 1) {
                var f, d;
                h.length - 1, h.forEach(function(t) {
                    t = t.trim();
                    var e, r = t.split(" ");
                    r.length > 1 ? (d = r.pop(), e = r.join(" ")) : e = t, f ? s[f.toLowerCase()] = e : n = e, f = d
                })
            } else n = h.shift()
        }
        var g = {
            name: e,
            ids: o,
            details: s
        };
        return n && (g.desc = n), g
    };
    var r = {
        sp: {
            link: "http://www.uniprot.org/%s",
            name: "Uniprot"
        },
        tr: {
            link: "http://www.uniprot.org/%s",
            name: "Trembl"
        },
        gb: {
            link: "http://www.ncbi.nlm.nih.gov/nuccore/%s",
            name: "Genbank"
        },
        pdb: {
            link: "http://www.rcsb.org/pdb/explore/explore.do?structureId=%s",
            name: "PDB"
        }
    };
    n.buildLinks = function(t) {
        var e = {};
        return t = t || {}, Object.keys(t).forEach(function(n) {
            if (n in r) {
                var i = r[n],
                    o = i.link.replace("%s", t[n]);
                e[i.name] = o
            }
        }), e
    }, n.contains = function(t, e) {
        return "".indexOf.call(t, e, 0) !== -1
    }, n.splitNChars = function(t, e) {
        var n, r;
        e = e || 80;
        var i = [];
        for (n = 0, r = t.length - 1; n <= r; n += e) i.push(t.substr(n, e));
        return i
    }, n.reverse = function(t) {
        return t.split("").reverse().join("")
    }, n.complement = function(t) {
        var e = t + "",
            n = [
                [/g/g, "0"],
                [/c/g, "1"],
                [/0/g, "c"],
                [/1/g, "g"],
                [/G/g, "0"],
                [/C/g, "1"],
                [/0/g, "C"],
                [/1/g, "G"],
                [/a/g, "0"],
                [/t/g, "1"],
                [/0/g, "t"],
                [/1/g, "a"],
                [/A/g, "0"],
                [/T/g, "1"],
                [/0/g, "T"],
                [/1/g, "A"]
            ];
        for (var r in n) e = e.replace(n[r][0], n[r][1]);
        return e
    }, n.reverseComplement = function(t) {
        return n.reverse(n.complement(t))
    }, n.model = function(t, e, n) {
        this.seq = t, this.name = e, this.id = n, this.ids = {}
    }
}, function(t, e, n) {
    "use strict";
    var r, i = n(1).Model;
    n(83), t.exports = r = i.extend({
        constructor: function(t, e) {
            return this.g = e.g, i.apply(this, arguments), this
        },
        defaults: {
            currentSize: 5,
            step: 1,
            originalSize: !1,
            scaleCategories: [{
                columnWidth: 1,
                markerStepSize: 20,
                stepSize: 0
            }, {
                columnWidth: 3,
                markerStepSize: 20,
                stepSize: 0
            }, {
                columnWidth: 5,
                markerStepSize: 10,
                stepSize: 0
            }, {
                columnWidth: 9,
                markerStepSize: 5,
                stepSize: 1
            }, {
                columnWidth: 15,
                markerStepSize: 2,
                stepSize: 1
            }, {
                columnWidth: 20,
                markerStepSize: 1,
                stepSize: 1
            }, {
                columnWidth: 30,
                markerStepSize: 1,
                stepSize: 1
            }, {
                columnWidth: 45,
                markerStepSize: 1,
                stepSize: 1
            }]
        },
        initialize: function(t) {
            var e = this.get("scaleCategories"),
                n = this.g.zoomer.get("columnWidth") || this._getScaleInfo().columnWidth,
                r = _.find(e, {
                    columnWidth: n
                });
            if (!r) {
                var i = this._insertScaleCategory(n);
                r = e[i], this.set("currentSize", i + 1)
            }
            var o = this.get("currentSize");
            return this.set("originalSize", o), this.setSize(o), this
        },
        _insertScaleCategory: function(t) {
            var e = this.get("scaleCategories"),
                n = _.findLastIndex(e, function(e) {
                    return e.columnWidth < t
                }),
                r = e[n],
                i = n + 1,
                o = {
                    columnWidth: t,
                    markerStepSize: r.markerStepSize,
                    stepSize: r.markerStepSize
                };
            return e.splice(i, 0, o), this.set("scaleCategories", e), i
        },
        getSizeRange: function() {
            return [1, this.get("scaleCategories").length]
        },
        bigger: function() {
            return this.setSize(this.get("currentSize") + this.get("step"))
        },
        smaller: function() {
            return this.setSize(this.get("currentSize") - this.get("step"))
        },
        reset: function() {
            return this.setSize(this.get("originalSize"))
        },
        setSize: function(t) {
            var e = this.getSizeRange();
            t = parseInt(t), t = t < e[0] ? e[0] : t > e[1] ? e[1] : t, this.set("currentSize", t);
            var n = this._getScaleInfo();
            return this.g.zoomer.set({
                columnWidth: n.columnWidth,
                stepSize: n.stepSize,
                markerStepSize: n.markerStepSize
            }), this
        },
        getSize: function() {
            return this.get("currentSize")
        },
        _getScaleInfo: function() {
            var t = this.getSize(),
                e = this.get("scaleCategories");
            return t > 0 && t <= e.length ? e[t - 1] : void console.error("out of bounds")
        }
    })
}, function(t, e, n) {
    "use strict";
    var r, i = n(90),
        o = n(1).Model;
    t.exports = r = o.extend({
        defaults: {
            scheme: "taylor",
            colorBackground: !0,
            showLowerCase: !0,
            opacity: .6
        },
        initialize: function(t, e, n) {
            return this.colors = new i({
                seqs: e,
                conservation: function() {
                    return n.scale(n.conservation())
                }
            }), n.on("reset", function() {
                if ("dyn" === this.getSelectedScheme().type) {
                    var t;
                    if (t = "reset", this.getSelectedScheme().indexOf(t) >= 0) return this.getSelectedScheme().reset()
                }
            }, this)
        },
        addStaticScheme: function(t, e) {
            return this.colors.addStaticScheme(t, e)
        },
        addDynScheme: function(t, e) {
            return this.colors.addDynScheme(t, e)
        },
        getScheme: function(t) {
            return this.colors.getScheme(t)
        },
        getSelectedScheme: function() {
            return this.colors.getScheme(this.get("scheme"))
        }
    })
}, function(t, e, n) {
    "use strict";
    var r, i = n(1).Model;
    t.exports = r = i.extend({
        initialize: function(t, e) {
            return null == this.get("hidden") && this.set("hidden", []), this.stats = e
        },
        calcHiddenColumns: function(t) {
            for (var e, n = this.get("hidden"), r = t, i = 0; i < n.length; i++) e = n[i], e <= r && r++;
            return r - t
        }
    })
}, function(t, e, n) {
    "use strict";
    var r, i = n(1).Model;
    t.exports = r = i.extend({
        defaults: {
            registerMouseHover: !0,
            registerMouseClicks: !0,
            importProxy: "https://cors-anywhere.herokuapp.com/",
            importProxyStripHttp: !0,
            eventBus: !0,
            alphabetSize: 20,
            dropImport: !1,
            debug: !1,
            hasRef: !1,
            bootstrapMenu: !1,
            manualRendering: !1
        }
    })
}, function(t, e, n) {
    "use strict";
    var r, i = n(21),
        o = n(1).Model;
    t.exports = r = o.extend({
        initialize: function(t) {
            return this.g = t
        },
        development: {
            "msa-tnt": "/node_modules/msa-tnt/build/bundle.js",
            "biojs-io-newick": "/node_modules/biojs-io-newick/build/biojs-io-newick.min.js"
        },
        loadPackage: function(t, e) {
            try {
                return e(n(143)(t))
            } catch (n) {
                return i.default.loadScript(this._pkgURL(t), e)
            }
        },
        loadPackages: function(t, e) {
            var n = this,
                r = i.default.joinCb(function() {
                    return e()
                }, t.length);
            return t.forEach(function(t) {
                return n.loadPackage(t, r)
            })
        },
        _pkgURL: function(t) {
            if (this.g.config.get("debug")) var e = this.development[t];
            else e = "http://wzrd.in/bundle/" + t + "@latest";
            return e
        }
    })
}, function(t, e, n) {
    "use strict";
    var r, i = n(1).Model;
    t.exports = r = i.extend({
        defaults: {
            searchText: ""
        }
    })
}, function(t, e, n) {
    "use strict";
    var r, i = n(1).Model;
    t.exports = r = i.extend({
        defaults: {
            searchBox: -10,
            overviewBox: 30,
            headerBox: -1,
            alignmentBody: 0,
            scaleSlider: 50
        }
    })
}, function(t, e, n) {
    "use strict";
    var r, i = n(1).Model;
    t.exports = r = i.extend({
        defaults: {
            sequences: !0,
            markers: !0,
            metacell: !1,
            conserv: !1,
            overviewbox: !1,
            seqlogo: !1,
            gapHeader: !1,
            leftHeader: !0,
            scaleslider: !1,
            labels: !0,
            labelName: !0,
            labelId: !0,
            labelPartition: !1,
            labelCheckbox: !1,
            metaGaps: !0,
            metaIdentity: !0,
            metaLinks: !0
        },
        constructor: function(t, e) {
            return this.calcDefaults(e.model), i.apply(this, arguments)
        },
        initialize: function() {
            return this.listenTo(this, "change:metaLinks change:metaIdentity change:metaGaps", function() {
                return this.trigger("change:metacell")
            }, this), this.listenTo(this, "change:labelName change:labelId change:labelPartition change:labelCheckbox", function() {
                return this.trigger("change:labels")
            }, this), this.listenTo(this, "change:markers change:conserv change:seqlogo change:gapHeader", function() {
                return this.trigger("change:header")
            }, this)
        },
        calcDefaults: function(t) {
            if (t.length > 0) {
                var e = t.at(0),
                    n = e.get("ids");
                if (void 0 !== n && 0 === Object.keys(n).length) return this.defaults.metaLinks = !1
            }
        }
    })
}, function(t, e, n) {
    "use strict";
    var r, i = n(1).Model;
    t.exports = r = i.extend({
        constructor: function(t, e) {
            return this.calcDefaults(e.model), i.apply(this, arguments), this.g = e.g, this.listenTo(this, "change:labelIdLength change:labelNameLength change:labelPartLength change:labelCheckLength", function() {
                return this.trigger("change:labelWidth", this.getLabelWidth())
            }, this), this.listenTo(this, "change:metaLinksWidth change:metaIdentWidth change:metaGapWidth", function() {
                return this.trigger("change:metaWidth", this.getMetaWidth())
            }, this), this
        },
        defaults: {
            alignmentWidth: "auto",
            alignmentHeight: 225,
            columnWidth: 15,
            rowHeight: 15,
            autoResize: !0,
            labelIdLength: 20,
            labelNameLength: 100,
            labelPartLength: 15,
            labelCheckLength: 15,
            labelFontsize: 13,
            labelLineHeight: "13px",
            markerFontsize: "10px",
            stepSize: 1,
            markerStepSize: 2,
            markerHeight: 20,
            residueFont: "13",
            canvasEventScale: 1,
            minLetterDrawSize: 11,
            boxRectHeight: 2,
            boxRectWidth: 2,
            overviewboxPaddingTop: 10,
            overviewboxWidth: 200,
            overviewboxHeight: 200,
            metaGapWidth: 35,
            metaIdentWidth: 40,
            _alignmentScrollLeft: 0,
            _alignmentScrollTop: 0
        },
        calcDefaults: function(t) {
            return t.getMaxLength() < 200 && t.length < 30 && (this.defaults.boxRectWidth = this.defaults.boxRectHeight = 5), this
        },
        getAlignmentWidth: function(t) {
            return this.get("autoResize") && void 0 !== t ? this.get("columnWidth") * t : void 0 === this.get("alignmentWidth") || "auto" === this.get("alignmentWidth") || 0 === this.get("alignmentWidth") ? this._adjustWidth() : this.get("alignmentWidth")
        },
        setLeftOffset: function(t) {
            var e = t;
            return e = Math.max(0, e), e -= this.g.columns.calcHiddenColumns(e), this.set("_alignmentScrollLeft", e * this.get("columnWidth"))
        },
        setTopOffset: function(t) {
            for (var e = Math.max(0, t - 1), n = 0, r = 0; 0 < e ? r <= e : r >= e; 0 < e ? r++ : r--) n += this.model.at(r).attributes.height || 1;
            return this.set("_alignmentScrollTop", n * this.get("rowHeight"))
        },
        getLeftBlockWidth: function() {
            var t = 0;
            return this.g.vis.get("labels") && (t += this.getLabelWidth()), this.g.vis.get("metacell") && (t += this.getMetaWidth()), t
        },
        getMetaWidth: function() {
            var t = 0;
            return this.g.vis.get("metaGaps") && (t += this.get("metaGapWidth")), this.g.vis.get("metaIdentity") && (t += this.get("metaIdentWidth")), this.g.vis.get("metaLinks") && (t += this.get("metaLinksWidth")), t
        },
        getLabelWidth: function() {
            var t = 0;
            return this.g.vis.get("labelName") && (t += this.get("labelNameLength")), this.g.vis.get("labelId") && (t += this.get("labelIdLength")), this.g.vis.get("labelPartition") && (t += this.get("labelPartLength")), this.g.vis.get("labelCheckbox") && (t += this.get("labelCheckLength")), t
        },
        _adjustWidth: function() {
            if (void 0 !== this.el && void 0 !== this.model) {
                if (null != this.el.parentNode && 0 !== this.el.parentNode.offsetWidth) var t = this.el.parentNode.offsetWidth;
                else t = document.body.clientWidth - 35;
                var e = t - this.getLeftBlockWidth(),
                    n = this.getAlignmentWidth(this.model.getMaxLength() - this.g.columns.get("hidden").length),
                    r = Math.min(e, n);
                return r = Math.floor(r / this.get("columnWidth")) * this.get("columnWidth"), this.attributes.alignmentWidth = r
            }
        },
        autoResize: function() {
            if (this.get("autoResize")) return this._adjustWidth(this.el, this.model)
        },
        autoHeight: function(t) {
            var e = this.getMaxAlignmentHeight();
            return void 0 !== t && t > 0 && (e = Math.min(e, t)), this.set("alignmentHeight", e)
        },
        setEl: function(t, e) {
            return this.el = t, this.model = e
        },
        _checkScrolling: function(t, e) {
            var n = t[0],
                r = t[1];
            return this.set("_alignmentScrollLeft", n, e), this.set("_alignmentScrollTop", r, e)
        },
        getMaxAlignmentHeight: function() {
            var t = 0;
            return this.model.each(function(e) {
                return t += e.attributes.height || 1
            }), t * this.get("rowHeight")
        },
        getMaxAlignmentWidth: function() {
            return this.model.getMaxLength() * this.get("columnWidth")
        }
    })
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(3),
        o = n(50),
        s = r(o),
        a = n(1).Collection,
        u = a.extend({
            model: s.default,
            constructor: function() {
                return this.startOnCache = [], this.on("all", function() {
                    return this.startOnCache = []
                }, this), a.apply(this, arguments)
            },
            startOn: function(t) {
                return null == this.startOnCache[t] && (this.startOnCache[t] = this.where({
                    xStart: t
                })), this.startOnCache[t]
            },
            contains: function(t) {
                return this.reduce(function(e, n) {
                    return n || e.contains(t)
                }, !1)
            },
            getFeatureOnRow: function(t, e) {
                return this.filter(function(n) {
                    return n.get("row") === t && n.get("xStart") <= e && e <= n.get("xEnd")
                })
            },
            assignRows: function() {
                var t = this.max(function(t) {
                        return t.get("xEnd")
                    }).attributes.xEnd,
                    e = function() {
                        for (var e = [], n = 0; 0 < t ? n <= t : n >= t; 0 < t ? n++ : n--) e.push(0);
                        return e
                    }();
                return this.each(function(t) {
                    for (var n = 0, r = t.get("xStart"), i = t.get("xEnd"), o = r; r < i ? o <= i : o >= i; r < i ? o++ : o--) e[o] > n && (n = e[o]), e[o]++;
                    return t.set("row", n)
                }), (0, i.max)(e)
            },
            getCurrentHeight: function() {
                return this.max(function(t) {
                    return t.get("row")
                }).attributes.row + 1
            },
            getMinRows: function() {
                var t = this.max(function(t) {
                        return t.get("xEnd")
                    }).attributes.xEnd,
                    e = function() {
                        for (var e = [], n = 0; 0 < t ? n <= t : n >= t; 0 < t ? n++ : n--) e.push(0);
                        return e
                    }();
                return this.each(function(t) {
                    return function() {
                        for (var n = [], r = t.get("xStart"), i = t.get("xEnd"), o = r; r < i ? o <= i : o >= i; r < i ? o++ : o++) n.push(e[o]++);
                        return n
                    }()
                }), (0, i.max)(e)
            }
        });
    e.default = u
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(37),
        o = r(i),
        s = n(35),
        a = r(s),
        u = n(1).Collection,
        l = u.extend({
            model: o.default,
            constructor: function(t, e) {
                var n = this;
                return u.apply(this, arguments), this.g = e, this.on("add reset remove", function() {
                    return n.lengthCache = null, n._bindSeqsWithFeatures()
                }, this), this.on("reset", function() {
                    return n._autoSetRefSeq()
                }), this._autoSetRefSeq(), this.lengthCache = null, this.features = {}, this
            },
            getMaxLength: function() {
                return 0 === this.models.length ? 0 : (null === this.lengthCache && (this.lengthCache = this.max(function(t) {
                    return t.get("seq").length
                }).get("seq").length), this.lengthCache)
            },
            prev: function(t, e) {
                var n = this.indexOf(t) - 1;
                return n < 0 && e && (n = this.length - 1), this.at(n)
            },
            next: function(t, e) {
                var n = this.indexOf(t) + 1;
                return n === this.length && e && (n = 0), this.at(n)
            },
            calcHiddenSeqs: function(t) {
                for (var e = t, n = 0; 0 < e ? n <= e : n >= e; 0 < e ? n++ : n--) this.at(n).get("hidden") && e++;
                return e - t
            },
            addFeatures: function(t) {
                var e = this;
                if (null != t.config) {
                    var n = t;
                    if (t = t.seqs, null != n.config.colors) {
                        var r = n.config.colors;
                        _.each(t, function(t) {
                            return _.each(t, function(t) {
                                if (null != r[t.feature]) return t.fillColor = r[t.feature]
                            })
                        })
                    }
                }
                return _.isEmpty(this.features) ? this.features = t : _.each(t, function(t, n) {
                    return e.features.hasOwnProperty(n) ? e.features[n] = _.union(e.features[n], t) : e.features[n] = t
                }), this._bindSeqsWithFeatures()
            },
            _bindSeqWithFeatures: function(t) {
                var e = this.features[t.attributes.name];
                e && (t.attributes.features = new a.default(e), t.attributes.features.assignRows(), t.attributes.height = t.attributes.features.getCurrentHeight() + 1)
            },
            _bindSeqsWithFeatures: function() {
                var t = this;
                return this.each(function(e) {
                    return t._bindSeqWithFeatures(e)
                })
            },
            removeAllFeatures: function() {
                return delete this.features
            },
            _autoSetRefSeq: function() {
                if (this.length > 0) return this.at(0).set("ref", !0)
            },
            setRef: function(t) {
                var e = this.get(t);
                return this.each(function(n) {
                    if (t.cid) return e.cid === n.cid ? n.set("ref", !0) : n.set("ref", !1)
                }), this.g.config.set("hasRef", !0), this.trigger("change:reference", t)
            }
        });
    e.default = l
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(35),
        o = r(i),
        s = n(1).Model,
        a = s.extend({
            defaults: {
                name: "",
                id: "",
                seq: "",
                height: 1,
                ref: !1
            },
            initialize: function() {
                if (this.set("grey", []), null == this.get("features")) return this.set("features", new o.default)
            }
        });
    e.default = a
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.exporter = e.file = e.seqgen = e.proxy = e.bmath = void 0;
    var i = n(18),
        o = r(i),
        s = n(22),
        a = r(s),
        u = n(40),
        l = r(u),
        c = n(20),
        h = r(c),
        f = n(19),
        d = r(f);
    e.bmath = o.default, e.proxy = a.default, e.seqgen = l.default, e.file = h.default, e.exporter = d.default
}, function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = function(t, e) {
        for (var n = e.name || e.url || "", r = n.split("."), i = r[r.length - 1] || "", o = 0; o < s.length; o++) {
            var a = s[o](t, i);
            if (a) return a
        }
        return "unknown"
    };
    var n = function(t, e) {
            return ("CLUSTAL" === t.substring(0, 7) || "clustal" == e || "aln" == e) && "clustal"
        },
        r = function(t, e) {
            return (">" === t.substring(0, 1) || "fasta" == e || "fa" == e) && "fasta"
        },
        i = function(t, e) {
            return ("(" === t.substring(0, 1) || "nwk" == e) && "newick"
        },
        o = function(t, e) {
            if (t.length <= 10) return !1;
            var n = t.split("\n");
            return n[0].indexOf("gff") >= 0 || e.indexOf("gff") >= 0 ? "gff" : n[0].indexOf("#") < 0 && 2 === n[0].split("\t").length && "gff"
        },
        s = [n, r, i, o]
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(18),
        o = r(i),
        s = n(64).seq,
        a = n(42),
        u = {
            _generateSequence: function(t) {
                for (var e = "", n = t - 1, r = 0; 0 < n ? r <= n : r >= n; 0 < n ? r++ : r--) e += u.getRandomChar();
                return e
            },
            getDummySequences: function(t, e) {
                var n = [];
                "undefined" != typeof t && null !== t || (t = o.default.getRandomInt(3, 5)), "undefined" != typeof e && null !== e || (e = o.default.getRandomInt(50, 200));
                for (var r = 1; 1 < t ? r <= t : r >= t; 1 < t ? r++ : r--) n.push(new s(u._generateSequence(e), "seq" + r, "r" + r));
                return n
            },
            getRandomChar: function(t) {
                var e = t || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                return e.charAt(Math.floor(Math.random() * e.length))
            },
            genConservedSequences: function(t, e, n) {
                var r = [];
                "undefined" != typeof t && null !== t || (t = o.default.getRandomInt(3, 5)), "undefined" != typeof e && null !== e || (e = o.default.getRandomInt(50, 200)), n = n || "ACDEFGHIKLMNPQRSTVWY---";
                for (var i = 1; 1 < t ? i <= t : i >= t; 1 < t ? i++ : i--) r[i - 1] = "";
                for (var l = .2, c = 1, h = e - 1, f = 0; 0 < h ? f <= h : f >= h; 0 < h ? f++ : f--) {
                    f % 3 === 0 && (c = o.default.getRandomInt(50, 100) / 100);
                    for (var d = [], g = t - 1, p = 0; 0 < g ? p <= g : p >= g; 0 < g ? p++ : p--) {
                        for (var m = 0, v = void 0; m < 100;) {
                            v = u.getRandomChar(n);
                            var _ = a(d);
                            if (_.addSeq(v), m++, Math.abs(c - _.scale(_.conservation())[0]) < l) break
                        }
                        r[p] += v, d.push(v)
                    }
                }
                for (var y = [], b = 1; 1 < t ? b <= t : b >= t; 1 < t ? b++ : b--) y.push(new s(r[b - 1], "seq" + b, "r" + b));
                return y
            }
        };
    e.default = u
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(3),
        o = n(36),
        s = (r(o), function(t) {
            return this.msa = t, this
        }),
        a = {
            loadTree: function(t) {
                return this.msa.g.package.loadPackages(["msa-tnt", "biojs-io-newick"], t)
            },
            showTree: function(t) {
                function e(t) {
                    if (null != t.children) t.children.forEach(function(t) {
                        return e(t)
                    });
                    else {
                        var n = u.filter(function(e) {
                            return e.name === t.name
                        })[0];
                        null != n && ("number" == typeof n.id ? (n.ids = ["s" + (n.id + 1)], t.name = "s" + (n.id + 1)) : t.name = n.id)
                    }
                }
                var r = window.require("biojs-io-newick"),
                    i = window.require("msa-tnt");
                if ("string" == typeof t) var o = r.parse_newick(t);
                else o = t;
                var s, a = new i.selections;
                0 === this.msa.el.getElementsByClassName("tnt_groupDiv").length ? (s = document.createElement("div"), this.msa.el.appendChild(s)) : (s = this.msa.el.getElementsByClassName("tnt_groupDiv")[0].parentNode, s.innerHTML = "");
                var u = this.msa.seqs.toJSON();
                e(o);
                var l = i.app({
                    seqs: u,
                    tree: o
                });
                return new i.adapters.tree({
                    model: l,
                    el: s,
                    sel: a
                }), new i.adapters.msa({
                    model: l,
                    sel: a,
                    msa: this.msa
                }), l.models.forEach(function(t) {
                    return delete t.collection, Object.setPrototypeOf(t, n(1).Model.prototype)
                }), this.msa.seqs.reset(l.models), console.log(this.msa.seqs)
            },
            require: function(t) {
                function e(e) {
                    return t.apply(this, arguments)
                }
                return e.toString = function() {
                    return t.toString()
                }, e
            }(function(t) {
                return n(144)(t)
            })
        };
    (0, i.extend)(s.prototype, a), e.default = s
}, function(t, e, n) {
    "use strict";
    var r = n(10),
        i = function t(e, n) {
            if (!this || this.constructor !== t) return new t(e);
            if (void 0 === e || "string" == typeof e) throw new TypeError("you need to give the seq stat an array");
            this.resetSeqs(e), this.alphabetSize = 4, this._useBackground = !1, this.useGaps = !1, this.ignoredChars = ["-", "*"], r.extend(this, n)
        };
    i.prototype.addSeq = function(t) {
        this.seqs.push(t), this._reset()
    }, i.prototype.removeSeq = function(t) {
        "number" == typeof t ? this.seqs.splice(t, 1) : r.each(this.seqs, function(e, n) {
            t === e && this.seqs.splice(n, 1)
        }.bind(this)), this._reset()
    }, i.prototype.addSeqs = function(t) {
        t.forEach(function(t) {
            this.addSeq(t)
        }.bind(this))
    }, i.prototype.resetSeqs = function(t) {
        if (this.seqs = [], !t instanceof Array || "at" in t && "on" in t) {
            this.mseqs = t;
            var e = function() {
                var t = this.mseqs.pluck("seq");
                this.resetSeqs(t)
            };
            t.on("add change reset ", e, this), e.call(this)
        } else this.addSeqs(t), this._reset(), this.trigger("reset")
    };
    var o = ["consensus", "frequency", "maxLength", "ic", "gaps"];
    i.prototype._reset = function() {
        for (var t = 0; t < o.length; t++) this["_" + o[t]] = void 0;
        this._identity = void 0, this._background = void 0
    }, i.prototype.setBackground = function(t) {
        this._useBackground = t, this._reset()
    }, i.prototype.useBackground = function() {
        this.setBackground(!0)
    }, i.prototype.setDNA = function() {
        this.alphabetSize = 4
    }, i.prototype.setProtein = function() {
        this.alphabetSize = 20
    }, o.forEach(function(t) {
        i.prototype[t] = function() {
            return void 0 === this["_" + t] && (this["_" + t] = this[t + "Calc"]()), this["_" + t]
        }
    }), i.prototype.identity = function(t) {
        var e;
        return (void 0 === this._identity || t) && (e = this.identityCalc(t), this._identity = void 0), this._identity || e
    }, i.prototype.background = function() {
        return void 0 !== this.bg ? this.bg : (void 0 === this._background && this.backgroundCalc(), this._background)
    }, i.prototype.frequencyCalc = function(t) {
        var e, n;
        e = new Array(this.maxLength()), n = new Array(this.seqs.length);
        var i = this.ignoredChars;
        return void 0 !== t && t.all && (i = []), r.each(this.seqs, function(t) {
            r.each(t, function(t, r) {
                i.indexOf(t) >= 0 || (void 0 === e[r] && (e[r] = {}), void 0 === e[r][t] && (e[r][t] = 0), e[r][t]++, void 0 === n[r] && (n[r] = 0), n[r]++)
            })
        }), r.each(e, function(t, i) {
            return r.each(t, function(t, r) {
                return e[i][r] = t / n[i]
            })
        }), this._frequency = e, e
    }, i.prototype.backgroundCalc = function() {
        var t = {},
            e = 0;
        return r.each(this.seqs, function(n) {
            r.each(n, function(n) {
                return void 0 === t[n] && (t[n] = 0), t[n]++, e++
            })
        }), t = r.mapValues(t, function(t) {
            return t / e
        }), this._background = t, t
    }, i.prototype.icCalc = function() {
        var t = this.frequency();
        if (this._useBackground) var e = this.background();
        var n = this.ignoredChars,
            i = this._useBackground,
            o = r.map(t, function(t) {
                return r.reduce(t, function(t, r, o) {
                    return n.indexOf(o) >= 0 ? t : (i && (r /= e[o]), t - r * (Math.log(r) / Math.log(2)))
                }, 0)
            });
        return this._ic = o, o
    }, i.prototype.conservation = function(t) {
        var e = this.ic(),
            n = this.gaps(),
            i = this;
        t = t || this.alphabetSize;
        var o = Math.log(t) / Math.log(2),
            s = 0;
        return r.map(e, function(t) {
            var e = o - t;
            return i.useGaps && (e *= 1 - n[s++]), e
        })
    }, i.prototype.conservResidue = function(t) {
        var e, n = t ? t.alphabetSize : void 0,
            i = this.ignoredChars;
        e = void 0 !== t && t.scaled ? this.scale(this.conservation(n)) : this.conservation(n);
        var o, s = this.frequency();
        return r.map(s, function(t, n) {
            o = r.reject(r.keys(t), function(t) {
                return i.indexOf(t) >= 0
            });
            var s = {};
            return r.each(o, function(r) {
                s[r] = t[r] * e[n]
            }), s
        })
    }, i.prototype.conservResidue2 = function(t) {
        var e = this.frequency(),
            n = this.conservation(t),
            i = this.background();
        return r.map(e, function(t, o) {
            return r.map(t, function(t) {
                var s = r.reduce(e[o], function(t, e) {
                    return t + e / i[o]
                }, 0);
                return t / i[o] / s * n[o]
            }, 0)
        })
    }, i.prototype.scale = function(t, e) {
        e = e || this.alphabetSize;
        var n = Math.log(e) / Math.log(2);
        return r.map(t, function(t) {
            return t / n
        })
    }, i.prototype.maxLengthCalc = function() {
        return 0 === this.seqs.length ? 0 : r.max(this.seqs, function(t) {
            return t.length
        }).length
    }, i.prototype.consensusCalc = function() {
        var t = new Array(this.maxLength());
        return r.each(this.seqs, function(e) {
            r.each(e, function(e, n) {
                void 0 === t[n] && (t[n] = {}), void 0 === t[n][e] && (t[n][e] = 0), t[n][e]++
            })
        }), this._consensus = r.reduce(t, function(t, e) {
            var n;
            return n = r.keys(e), t += r.max(n, function(t) {
                return e[t]
            })
        }, ""), this._consensus
    }, i.prototype.identityCalc = function(t) {
        var e = t || this.consensus();
        return this._identity = this.seqs.map(function(t) {
            for (var n = 0, r = 0, i = 0; i < t.length; i++) "-" !== t[i] && "-" !== e[i] && (r++, t[i] === e[i] && n++);
            return n / r
        }), this._identity
    }, i.prototype.gapsCalc = function() {
        var t = this.maxLength();
        if (t <= 1 || "undefined" == typeof t) return [];
        var e = new Array(this.maxLength());
        return r.each(this.seqs, function(t) {
            r.each(t, function(t, n) {
                void 0 === e[n] && (e[n] = {
                    g: 0,
                    t: 0
                }), t = "-" === t ? "g" : "t", e[n][t]++
            })
        }), this._gaps = r.map(e, function(t) {
            return t.g / (t.g + t.t)
        }), this._gaps
    }, r.mixin({
        mapValues: function(t, e) {
            return r.object(r.keys(t), r.map(t, e))
        }
    }), n(16).mixin(i.prototype), t.exports = i
}, function(t, e, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        i = n(11),
        o = n(15),
        s = n(10),
        a = function(t, e) {
            var n = t || {};
            e || (e = {}), this.cid = s.uniqueId("c"), this.attributes = {}, e.collection && (this.collection = e.collection), e.parse && (n = this.parse(n, e) || {}), n = s.defaults({}, n, s.result(this, "defaults")), this.set(n, e), this.changed = {}, this.initialize.apply(this, arguments)
        };
    s.extend(a.prototype, i, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function(t) {
            return s.clone(this.attributes)
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments)
        },
        get: function(t) {
            return this.attributes[t]
        },
        escape: function(t) {
            return s.escape(this.get(t))
        },
        has: function(t) {
            return null != this.get(t)
        },
        set: function(t, e, n) {
            var i, o, a, u, l, c, h, f;
            if (null == t) return this;
            if ("object" === ("undefined" == typeof t ? "undefined" : r(t)) ? (o = t, n = e) : (o = {})[t] = e, n || (n = {}), !this._validate(o, n)) return !1;
            a = n.unset, l = n.silent, u = [], c = this._changing, this._changing = !0, c || (this._previousAttributes = s.clone(this.attributes), this.changed = {}), f = this.attributes, h = this._previousAttributes, this.idAttribute in o && (this.id = o[this.idAttribute]);
            for (i in o) e = o[i], s.isEqual(f[i], e) || u.push(i), s.isEqual(h[i], e) ? delete this.changed[i] : this.changed[i] = e, a ? delete f[i] : f[i] = e;
            if (!l) {
                u.length && (this._pending = n);
                for (var d = 0, g = u.length; d < g; d++) this.trigger("change:" + u[d], this, f[u[d]], n)
            }
            if (c) return this;
            if (!l)
                for (; this._pending;) n = this._pending, this._pending = !1, this.trigger("change", this, n);
            return this._pending = !1, this._changing = !1, this
        },
        unset: function(t, e) {
            return this.set(t, void 0, s.extend({}, e, {
                unset: !0
            }))
        },
        clear: function(t) {
            var e = {};
            for (var n in this.attributes) e[n] = void 0;
            return this.set(e, s.extend({}, t, {
                unset: !0
            }))
        },
        hasChanged: function(t) {
            return null == t ? !s.isEmpty(this.changed) : s.has(this.changed, t)
        },
        changedAttributes: function(t) {
            if (!t) return !!this.hasChanged() && s.clone(this.changed);
            var e, n = !1,
                r = this._changing ? this._previousAttributes : this.attributes;
            for (var i in t) s.isEqual(r[i], e = t[i]) || ((n || (n = {}))[i] = e);
            return n
        },
        previous: function(t) {
            return null != t && this._previousAttributes ? this._previousAttributes[t] : null
        },
        previousAttributes: function() {
            return s.clone(this._previousAttributes)
        },
        fetch: function(t) {
            t = t ? s.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
            var e = this,
                n = t.success;
            return t.success = function(r) {
                return !!e.set(e.parse(r, t), t) && (n && n(e, r, t), void e.trigger("sync", e, r, t))
            }, wrapError(this, t), this.sync("read", this, t)
        },
        save: function(t, e, n) {
            var i, o, a, u = this.attributes;
            if (null == t || "object" === ("undefined" == typeof t ? "undefined" : r(t)) ? (i = t, n = e) : (i = {})[t] = e, n = s.extend({
                validate: !0
            }, n), i && !n.wait) {
                if (!this.set(i, n)) return !1
            } else if (!this._validate(i, n)) return !1;
            i && n.wait && (this.attributes = s.extend({}, u, i)), void 0 === n.parse && (n.parse = !0);
            var l = this,
                c = n.success;
            return n.success = function(t) {
                l.attributes = u;
                var e = l.parse(t, n);
                return n.wait && (e = s.extend(i || {}, e)), !(s.isObject(e) && !l.set(e, n)) && (c && c(l, t, n), void l.trigger("sync", l, t, n))
            }, wrapError(this, n), o = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" !== o || n.attrs || (n.attrs = i), a = this.sync(o, this, n), i && n.wait && (this.attributes = u), a
        },
        destroy: function t(e) {
            e = e ? s.clone(e) : {};
            var n = this,
                r = e.success,
                t = function() {
                    n.stopListening(), n.trigger("destroy", n, n.collection, e)
                };
            if (e.success = function(i) {
                (e.wait || n.isNew()) && t(), r && r(n, i, e), n.isNew() || n.trigger("sync", n, i, e)
            }, this.isNew()) return e.success(), !1;
            wrapError(this, e);
            var i = this.sync("delete", this, e);
            return e.wait || t(), i
        },
        url: function() {
            var t = s.result(this, "urlRoot") || s.result(this.collection, "url") || urlError();
            return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return !this.has(this.idAttribute)
        },
        isValid: function(t) {
            return this._validate({}, s.extend(t || {}, {
                validate: !0
            }))
        },
        _validate: function(t, e) {
            if (!e.validate || !this.validate) return !0;
            t = s.extend({}, this.attributes, t);
            var n = this.validationError = this.validate(t, e) || null;
            return !n || (this.trigger("invalid", this, n, s.extend(e, {
                validationError: n
            })), !1)
        }
    });
    var u = ["keys", "values", "pairs", "invert", "pick", "omit", "chain", "isEmpty"];
    s.each(u, function(t) {
        s[t] && (a.prototype[t] = function() {
            var e = slice.call(arguments);
            return e.unshift(this.attributes), s[t].apply(s, e)
        })
    }), a.extend = o, t.exports = a
}, function(t, e) {
    "use strict";

    function n(t) {
        var e = {};
        return t.split(";").forEach(function(t) {
            var n, r, i;
            t.indexOf("=") > 0 ? (n = t.split("="), r = n[0], i = n[1], e[r] = i) : t.indexOf(" ") > 0 && (n = t.split(" "), r = n[0], i = n[1].replace(/"/g, ""), e[r] = i)
        }), e
    }

    function r(t) {
        var e = t.toString(16);
        return 1 === e.length ? "0" + e : e
    }

    function i(t, e, n) {
        return 3 === t.length ? i(t[0], t[1], t[2]) : "#" + r(t) + r(e) + r(n)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.extractKeys = n, e.rgbToHex = i, e.default = {
        extractKeys: n,
        rgbToHex: i
    }
}, function(t, e) {
    "use strict";
    t.exports = function(t, e, n) {
        t.beginPath(), t.moveTo(0, e), t.lineTo(n, e), t.lineWidth = 1, t.strokeStyle = "#999999", t.stroke()
    }
}, function(t, e) {
    "use strict";
    t.exports = function(t, e, n, r, i, o, s) {
        t.font = o + "px Arial", t.textAlign = s ? "right" : "center", t.fillStyle = "#666666", t.fillText(i, e + r / 2, n)
    }
}, function(t, e) {
    "use strict";
    t.exports = function(t, e, n, r, i) {
        i = i || "#999999", t.beginPath(), t.moveTo(e, n), t.lineTo(e, n + r), t.lineWidth = 1, t.strokeStyle = i, t.stroke()
    }
}, function(t, e) {
    "use strict";
    var n;
    t.exports = n = {
        rel: function(t) {
            var e, n, r, i;
            return e = t.offsetX, n = t.offsetY, void 0 == e && (r = i.getBoundingClientRect(), i = t.target || t.srcElement, void 0 == e && (e = t.clientX - r.left, n = t.clientY - r.top), void 0 == e && (e = t.pageX - i.offsetLeft, n = t.pageY - i.offsetTop), void 0 == e) ? void console.log(t, "no mouse event defined. your browser sucks") : [e, n]
        },
        abs: function(t) {
            var e, n;
            return e = t.pageX, n = t.pageY, void 0 == e && (e = t.layerX, n = t.layerY), void 0 == e && (e = t.clientX, n = t.clientY), void 0 == e && (e = t.x, n = t.y), [e, n]
        },
        wheelDelta: function(t) {
            var e;
            return e = [t.deltaX, t.deltaY], void 0 == e[0] && t.mozMovementX && (e = [0, t.mozMovementX]), isNaN(e[0]) && (e[0] = 0), isNaN(e[1]) && (e[1] = 0), e
        }
    }
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(9);
    Object.defineProperty(e, "SelectionManager", {
        enumerable: !0,
        get: function() {
            return r.SelectionManager
        }
    })
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(1).Model,
        i = r.extend({
            defaults: {
                xStart: -1,
                xEnd: -1,
                height: -1,
                text: "",
                fillColor: "red",
                fillOpacity: .5,
                type: "rectangle",
                borderSize: 1,
                borderColor: "black",
                borderOpacity: .5,
                validate: !0,
                row: 0
            },
            initialize: function(t) {
                if (null != t.start && this.set("xStart", t.start - 1), null != t.end && this.set("xEnd", t.end - 1), null != t.attributes && (null != t.attributes.Name && this.set("text", t.attributes.Name), null != t.attributes.Color && this.set("fillColor", t.attributes.Color)), this.attributes.xEnd < this.attributes.xStart && console.warn("invalid feature range for", this.attributes), !_.isNumber(this.attributes.xStart) || !_.isNumber(this.attributes.xEnd)) return console.warn("please provide numeric feature ranges", t), this.set("xStart", parseInt(this.attributes.xStart)), this.set("xEnd", parseInt(this.attributes.xEnd))
            },
            validate: function() {
                if (isNaN(this.attributes.xStart || isNaN(this.attributes.xEnd))) return "features need integer start and end."
            },
            contains: function(t) {
                return this.attributes.xStart <= t && t <= this.attributes.xEnd
            }
        });
    e.default = i
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(37);
    Object.defineProperty(e, "seq", {
        enumerable: !0,
        get: function() {
            return r(i).default
        }
    });
    var o = n(36);
    Object.defineProperty(e, "seqcol", {
        enumerable: !0,
        get: function() {
            return r(o).default
        }
    });
    var s = n(50);
    Object.defineProperty(e, "feature", {
        enumerable: !0,
        get: function() {
            return r(s).default
        }
    });
    var a = n(35);
    Object.defineProperty(e, "featurecol", {
        enumerable: !0,
        get: function() {
            return r(a).default
        }
    })
}, function(t, e) {
    (function(e) {
        t.exports = e
    }).call(e, {})
}, function(t, e, n) {
    "use strict";
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    ! function() {
        function n() {
            return {
                keys: Object.keys || function(t) {
                    if ("object" !== ("undefined" == typeof t ? "undefined" : r(t)) && "function" != typeof t || null === t) throw new TypeError("keys() called on a non-object");
                    var e, n = [];
                    for (e in t) t.hasOwnProperty(e) && (n[n.length] = e);
                    return n
                },
                uniqueId: function(t) {
                    var e = ++u + "";
                    return t ? t + e : e
                },
                has: function(t, e) {
                    return s.call(t, e)
                },
                each: function(t, e, n) {
                    if (null != t)
                        if (o && t.forEach === o) t.forEach(e, n);
                        else if (t.length === +t.length)
                            for (var r = 0, i = t.length; r < i; r++) e.call(n, t[r], r, t);
                        else
                            for (var s in t) this.has(t, s) && e.call(n, t[s], s, t)
                },
                once: function(t) {
                    var e, n = !1;
                    return function() {
                        return n ? e : (n = !0, e = t.apply(this, arguments), t = null, e)
                    }
                }
            }
        }
        var i, o = Array.prototype.forEach,
            s = Object.prototype.hasOwnProperty,
            a = Array.prototype.slice,
            u = 0,
            l = n();
        i = {
            on: function(t, e, n) {
                return h(this, "on", t, [e, n]) && e ? (this._events || (this._events = {}), (this._events[t] || (this._events[t] = [])).push({
                    callback: e,
                    context: n,
                    ctx: n || this
                }), this) : this
            },
            once: function t(e, n, r) {
                if (!h(this, "once", e, [n, r]) || !n) return this;
                var i = this,
                    t = l.once(function() {
                        i.off(e, t), n.apply(this, arguments)
                    });
                return t._callback = n, this.on(e, t, r)
            },
            off: function(t, e, n) {
                var r, i, o, s, a, u, c, f;
                if (!this._events || !h(this, "off", t, [e, n])) return this;
                if (!t && !e && !n) return this._events = {}, this;
                for (s = t ? [t] : l.keys(this._events), a = 0, u = s.length; a < u; a++)
                    if (t = s[a], o = this._events[t]) {
                        if (this._events[t] = r = [], e || n)
                            for (c = 0, f = o.length; c < f; c++) i = o[c], (e && e !== i.callback && e !== i.callback._callback || n && n !== i.context) && r.push(i);
                        r.length || delete this._events[t]
                    } return this
            },
            trigger: function(t) {
                if (!this._events) return this;
                var e = a.call(arguments, 1);
                if (!h(this, "trigger", t, e)) return this;
                var n = this._events[t],
                    r = this._events.all;
                return n && f(n, e), r && f(r, arguments), this
            },
            stopListening: function(t, e, n) {
                var i = this._listeners;
                if (!i) return this;
                var o = !e && !n;
                "object" === ("undefined" == typeof e ? "undefined" : r(e)) && (n = this), t && ((i = {})[t._listenerId] = t);
                for (var s in i) i[s].off(e, n, this), o && delete this._listeners[s];
                return this
            }
        };
        var c = /\s+/,
            h = function(t, e, n, i) {
                if (!n) return !0;
                if ("object" === ("undefined" == typeof n ? "undefined" : r(n))) {
                    for (var o in n) t[e].apply(t, [o, n[o]].concat(i));
                    return !1
                }
                if (c.test(n)) {
                    for (var s = n.split(c), a = 0, u = s.length; a < u; a++) t[e].apply(t, [s[a]].concat(i));
                    return !1
                }
                return !0
            },
            f = function(t, e) {
                var n, r = -1,
                    i = t.length,
                    o = e[0],
                    s = e[1],
                    a = e[2];
                switch (e.length) {
                    case 0:
                        for (; ++r < i;)(n = t[r]).callback.call(n.ctx);
                        return;
                    case 1:
                        for (; ++r < i;)(n = t[r]).callback.call(n.ctx, o);
                        return;
                    case 2:
                        for (; ++r < i;)(n = t[r]).callback.call(n.ctx, o, s);
                        return;
                    case 3:
                        for (; ++r < i;)(n = t[r]).callback.call(n.ctx, o, s, a);
                        return;
                    default:
                        for (; ++r < i;)(n = t[r]).callback.apply(n.ctx, e)
                }
            },
            d = {
                listenTo: "on",
                listenToOnce: "once"
            };
        l.each(d, function(t, e) {
            i[e] = function(e, n, i) {
                return (this._listeners || (this._listeners = {}))[e._listenerId || (e._listenerId = l.uniqueId("l"))] = e, "object" === ("undefined" == typeof n ? "undefined" : r(n)) && (i = this), e[t](n, i, this), this
            }
        }), i.bind = i.on, i.unbind = i.off, i.mixin = function(t) {
            var e = ["on", "once", "off", "trigger", "stopListening", "listenTo", "listenToOnce", "bind", "unbind"];
            return l.each(e, function(e) {
                t[e] = this[e]
            }, this), t
        }, "undefined" != typeof t && t.exports && (e = t.exports = i), e.BackboneEvents = i
    }(void 0)
}, function(t, e, n) {
    "use strict";
    var r = n(11),
        i = n(15),
        o = n(10),
        s = n(43),
        a = [],
        u = a.slice,
        l = function(t, e) {
            e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, o.extend({
                silent: !0
            }, e))
        },
        c = {
            add: !0,
            remove: !0,
            merge: !0
        },
        h = {
            add: !0,
            remove: !1
        };
    o.extend(l.prototype, r, {
        model: s,
        initialize: function() {},
        toJSON: function(t) {
            return this.map(function(e) {
                return e.toJSON(t)
            })
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments)
        },
        add: function(t, e) {
            return this.set(t, o.extend({
                merge: !1
            }, e, h))
        },
        remove: function(t, e) {
            var n = !o.isArray(t);
            t = n ? [t] : o.clone(t), e || (e = {});
            for (var r = 0, i = t.length; r < i; r++) {
                var s = t[r] = this.get(t[r]);
                if (s) {
                    var a = this.modelId(s.attributes);
                    null != a && delete this._byId[a], delete this._byId[s.cid];
                    var u = this.indexOf(s);
                    this.models.splice(u, 1), this.length--, e.silent || (e.index = u, s.trigger("remove", s, this, e)), this._removeReference(s, e)
                }
            }
            return n ? t[0] : t
        },
        set: function(t, e) {
            e = o.defaults({}, e, c), e.parse && (t = this.parse(t, e));
            var n = !o.isArray(t);
            t = n ? t ? [t] : [] : t.slice();
            for (var r, i, s, a, u, l = e.at, h = this.comparator && null == l && e.sort !== !1, f = o.isString(this.comparator) ? this.comparator : null, d = [], g = [], p = {}, m = e.add, v = e.merge, _ = e.remove, y = !(h || !m || !_) && [], b = 0, x = t.length; b < x; b++) {
                if (s = t[b], a = this.get(s)) _ && (p[a.cid] = !0), v && s !== a && (s = this._isModel(s) ? s.attributes : s, e.parse && (s = a.parse(s, e)), a.set(s, e), h && !u && a.hasChanged(f) && (u = !0)), t[b] = a;
                else if (m) {
                    if (i = t[b] = this._prepareModel(s, e), !i) continue;
                    d.push(i), this._addReference(i, e)
                }
                i = a || i, i && (r = this.modelId(i.attributes), !y || !i.isNew() && p[r] || y.push(i), p[r] = !0)
            }
            if (_) {
                for (var b = 0, x = this.length; b < x; b++) p[(i = this.models[b]).cid] || g.push(i);
                g.length && this.remove(g, e)
            }
            if (d.length || y && y.length)
                if (h && (u = !0), this.length += d.length, null != l)
                    for (var b = 0, x = d.length; b < x; b++) this.models.splice(l + b, 0, d[b]);
                else {
                    y && (this.models.length = 0);
                    for (var w = y || d, b = 0, x = w.length; b < x; b++) this.models.push(w[b])
                } if (u && this.sort({
                silent: !0
            }), !e.silent) {
                for (var S = null != l ? o.clone(e) : e, b = 0, x = d.length; b < x; b++) null != l && (S.index = l + b), (i = d[b]).trigger("add", i, this, S);
                (u || y && y.length) && this.trigger("sort", this, e)
            }
            return n ? t[0] : t
        },
        reset: function(t, e) {
            e || (e = {});
            for (var n = 0, r = this.models.length; n < r; n++) this._removeReference(this.models[n], e);
            return e.previousModels = this.models, this._reset(), t = this.add(t, o.extend({
                silent: !0
            }, e)), e.silent || this.trigger("reset", this, e), t
        },
        push: function(t, e) {
            return this.add(t, o.extend({
                at: this.length
            }, e))
        },
        pop: function(t) {
            var e = this.at(this.length - 1);
            return this.remove(e, t), e
        },
        unshift: function(t, e) {
            return this.add(t, o.extend({
                at: 0
            }, e))
        },
        shift: function(t) {
            var e = this.at(0);
            return this.remove(e, t), e
        },
        slice: function() {
            return u.apply(this.models, arguments)
        },
        get: function(t) {
            if (null != t) {
                var e = this.modelId(this._isModel(t) ? t.attributes : t);
                return this._byId[t] || this._byId[e] || this._byId[t.cid]
            }
        },
        at: function(t) {
            return t < 0 && (t += this.length), this.models[t]
        },
        where: function(t, e) {
            return o.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function(e) {
                for (var n in t)
                    if (t[n] !== e.get(n)) return !1;
                return !0
            })
        },
        findWhere: function(t) {
            return this.where(t, !0)
        },
        sort: function(t) {
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            return t || (t = {}), o.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(o.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
        },
        pluck: function(t) {
            return o.invoke(this.models, "get", t)
        },
        fetch: function(t) {
            t = t ? o.clone(t) : {}, void 0 === t.parse && (t.parse = !0);
            var e = t.success,
                n = this;
            return t.success = function(r) {
                n[t.reset ? "reset" : "set"](r, t), e && e(n, r, t), n.trigger("sync", n, r, t)
            }, wrapError(this, t), this.sync("read", this, t)
        },
        create: function(t, e) {
            if (e = e ? o.clone(e) : {}, !(t = this._prepareModel(t, e))) return !1;
            e.wait || this.add(t, e);
            var n = this,
                r = e.success;
            return e.success = function(t, i) {
                e.wait && n.add(t, e), r && r(t, i, e)
            }, t.save(null, e), t
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.models, {
                model: this.model,
                comparator: this.comparator
            })
        },
        modelId: function(t) {
            return t[this.model.prototype.idAttribute || "id"]
        },
        _reset: function() {
            this.length = 0, this.models = [], this._byId = {}
        },
        _prepareModel: function(t, e) {
            if (this._isModel(t)) return t.collection || (t.collection = this), t;
            e = e ? o.clone(e) : {}, e.collection = this;
            var n = new this.model(t, e);
            return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
        },
        _isModel: function(t) {
            return t instanceof s
        },
        _addReference: function(t, e) {
            this._byId[t.cid] = t;
            var n = this.modelId(t.attributes);
            null != n && (this._byId[n] = t), t.on("all", this._onModelEvent, this)
        },
        _removeReference: function(t, e) {
            this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(t, e, n, r) {
            if ("add" !== t && "remove" !== t || n === this) {
                if ("destroy" === t && this.remove(e, r), "change" === t) {
                    var i = this.modelId(e.previousAttributes()),
                        o = this.modelId(e.attributes);
                    i !== o && (null != i && delete this._byId[i], null != o && (this._byId[o] = e))
                }
                this.trigger.apply(this, arguments)
            }
        }
    });
    var f = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample", "partition"];
    o.each(f, function(t) {
        o[t] && (l.prototype[t] = function() {
            var e = u.call(arguments);
            return e.unshift(this.models), o[t].apply(o, e)
        })
    });
    var d = ["groupBy", "countBy", "sortBy", "indexBy"];
    o.each(d, function(t) {
        o[t] && (l.prototype[t] = function(e, n) {
            var r = o.isFunction(e) ? e : function(t) {
                return t.get(e)
            };
            return o[t](this.models, r, n)
        })
    }), l.extend = i, t.exports = l
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(13),
        o = r(i),
        s = n(25),
        a = r(s),
        u = void 0;
    e.default = u = {
        parse: function(t) {
            var e = [];
            if ("[object Array]" === Object.prototype.toString.call(t)) var n = t;
            else var n = t.split("\n");
            if (n[0].slice(0, 6) === !1) throw new Error("Invalid CLUSTAL Header");
            for (var r = 0, i = 1, o = 0; r < n.length;) {
                r++;
                var s = n[r];
                if (null != s && 0 !== s.length)
                    if (0 !== s.trim().length) {
                        if (!a.default.contains(s, "*")) {
                            1 === i && (o = 0, i = 0);
                            var u = /^(?:\s*)(\S+)(?:\s+)(\S+)(?:\s*)(\d*)(?:\s*|$)/g,
                                l = u.exec(s);
                            if (null != l) {
                                var c = l[1].trim(),
                                    h = l[2].trim();
                                if (o >= e.length) {
                                    var f = a.default.getMeta(c.trim());
                                    c = f.name;
                                    var d = new a.default.model(h, c, o);
                                    d.ids = f.ids || {}, d.details = f.details || {};
                                    var g = Object.keys(d.ids);
                                    g.length > 0 && (d.id = d.ids[g[0]]), e.push(d)
                                } else e[o].seq += h;
                                o++
                            } else console.log("parse error", s)
                        }
                    } else i = 1;
                else i = 1
            }
            return e = e.filter(function(t) {
                return t.seq.search(/[:.*]/i) === -1 && t.name.search(/[:.*]/i) === -1
            })
        }
    }, o.default.mixin(u)
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(25),
        o = r(i),
        s = n(63),
        a = r(s),
        u = n(13),
        l = r(u),
        c = void 0;
    e.default = c = {
        getMeta: o.default.getMeta,
        extend: function(t) {
            var e = (0, a.default)(c);
            return c.getMeta = t, e
        },
        parse: function(t) {
            var e = [];
            if (!t || 0 === t.length) return [];
            "[object Array]" !== Object.prototype.toString.call(t) && (t = t.split("\n"));
            for (var n = c, r = n.getMeta, i = 0; i < t.length; i++) {
                var s = t[i];
                if (">" === s[0] || ";" === s[0]) {
                    var a = s.slice(1).trim(),
                        u = r(a.trim());
                    a = u.name;
                    var l = u.id || e.length,
                        h = new o.default.model("", u.name, l);
                    h.ids = u.ids || {}, h.details = u.details || {}, e.push(h)
                } else h.seq += s
            }
            return e
        },
        write: function(t, e) {
            for (var n = "", r = 0; r < t.length; r++) {
                var i = t[r];
                null != e && (i = e(i)), n += ">" + i.name + "\n", n += o.default.splitNChars(i.seq, 80).join("\n"), n += "\n"
            }
            return n
        }
    }, l.default.mixin(c)
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(13),
        o = r(i),
        s = n(44),
        a = r(s),
        u = n(58),
        l = r(u),
        c = function() {};
    o.default.mixin(c), e.default = c, c.parseLines = function(t) {
        var e = t.split("\n"),
            n = {},
            r = [];
        n.type = c._guessType(e);
        var i = 0;
        if ("jalview" === n.type) {
            var o = l.default.readHeader(e);
            i = o.offset, n.colors = o.colors, r = o.features
        }
        for (var s = i; s < e.length; s++) {
            var a = e[s];
            0 !== a.length && "#" !== a[0] && (a = c.parseLine(a), void 0 !== a && r.push(a))
        }
        return {
            features: r,
            config: n
        }
    }, c._guessType = function(t) {
        return "##gff-version 3" === t[0].substring(0, 15) ? "gff3" : t[0].indexOf("#") < 0 && 2 === t[0].split("\t").length ? "jalview" : "gff3"
    }, c.parseSeqs = c.parse = function(t) {
        var e = c.parseLines(t),
            n = {};
        return e.features.forEach(function(t) {
            var e = t.seqname;
            void 0 === n[e] && (n[e] = []), delete t.seqname, n[e].push(t)
        }), delete e.features, e.seqs = n, e
    }, c.parseLine = function(t) {
        var e = {},
            n = t.split(/\s+/);
        if (1 !== n.length) {
            e.seqname = n[0], e.source = n[1], e.feature = n[2], e.start = parseInt(n[3]), e.end = parseInt(n[4]), e.score = n[5], e.strand = n[6], e.frame = n[7];
            var r = n.slice(8).join(" ");
            return Object.keys(e).forEach(function(t) {
                "string" == typeof e[t] && (e[t] = e[t].trim()), "." === e[t] && (e[t] = void 0)
            }), e.score && (e.score = parseFloat(e.score)), e.frame && (e.frame = parseInt(e.frame)), e.attributes = a.default.extractKeys(r), e
        }
    }, c.exportLine = function(t) {
        var e = Object.keys(t.attributes).map(function(e) {
                return e + "=" + t.attributes[e]
            }).join(";"),
            n = [t.seqname, t.source, t.feature, t.start, t.end, t.score, t.strand, t.frame, e];
        return n = n.map(function(t) {
            return void 0 === t ? "." : t
        }), n.join("\t")
    }, c.exportLines = function(t) {
        return "##gff-version 3\n" + t.map(c.exportLine).join("\n")
    }, c.exportSeqs = c.export = function(t) {
        var e = [],
            n = function(t) {
                t.seqname = r, e.push(t)
            };
        for (var r in t) t[r].forEach(n);
        return c.exportLines(e)
    }, c.utils = a.default
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(44),
        i = {};
    e.default = i, i.readHeader = function(t) {
        for (var e, n = {}, r = 0, o = []; r < t.length; r++) {
            var s = t[r];
            if (s.indexOf("#") >= 0) break;
            var a = s.split(/\t/),
                u = a[0].trim();
            if ("GFF" === u) break;
            if (2 === a.length)
                if ("startgroup" === u) e = a[1].trim();
                else {
                    if ("endgroup" === u) {
                        e = "";
                        continue
                    }
                    n[a[0]] = i.parseColor(a[1])
                }
            else if (a.length >= 5) {
                var l = i.parseLine(a);
                e && (l.attributes.Parent = e), o.push(l)
            }
        }
        return {
            offset: r,
            colors: n,
            features: o
        }
    }, i.parseColor = function(t) {
        return t.indexOf(",") >= 0 ? (0, r.rgbToHex)(t.split(",").map(function(t) {
            return parseInt(t)
        })) : 6 === t.length && parseInt(t.charAt(0), 16) <= 16 && "bisque" !== t ? "#" + t : t
    }, i.parseLine = function(t) {
        var e = {
            attributes: {}
        };
        return e.attributes.Name = t[0].trim(), e.seqname = t[1].trim(), e.start = parseInt(t[3]), e.end = parseInt(t[4]), e.feature = t[5].trim(), "ID_NOT_SPECIFIED" === e.seqname && (e.seqname = t[2].trim()), e
    }
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var i = n(13),
        o = r(i),
        s = function t(e) {
            return this.constructor != t ? new t(e) : (this.matrix = {}, this.parsingOrder = [], void 0 != e && this.parse(e), this)
        };
    o.default.mixin(s), t.exports = s, s.prototype.parse = function(t) {
        return t.split("\n").forEach(function(t) {
            this.parseLine(t)
        }.bind(this)), this.buildMatrix(), this.matrix
    }, s.read = function(t, e) {
        return (new s).read(t, e)
    }, s.parse = function(t) {
        return (new s).parse(t)
    }, s.prototype.parseLine = function(t) {
        var e = t.charAt(0);
        if ("#" !== e) {
            this.parsingOrder.push(e);
            for (var n = t.substring(1), r = n.split(/\s+/).filter(function(t) {
                return t.length > 0
            }).map(function(t) {
                return parseInt(t)
            }), i = {}, o = 0; o < r.length; o++) i[this.parsingOrder[o]] = r[o];
            this.matrix[e] = i
        }
    }, s.prototype.export = function() {
        return s.export(this.matrix)
    }, s.export = function(t) {
        var e = [],
            n = 1;
        "matrix" in t && (t = t.matrix);
        for (var r in t) {
            for (var i = r, o = Object.keys(t[r]), s = 0; s < n; s++) i += "\t" + t[r][o[s]];
            e.push(i), n++
        }
        return e.join("\n")
    }, s.prototype.buildMatrix = function() {
        for (var t = this.parsingOrder.length - 1; t >= 0; t--) {
            var e = this.parsingOrder[t],
                n = this.matrix[e];
            for (var r in n) this.matrix[r][e] = n[r]
        }
    }
}, function(t, e) {
    "use strict";

    function n(t) {
        for (var e = [], n = {}, i = t.split(/\s*(;|\(|\)|\[|\]|,|:|=)\s*/), o = 0; o < i.length; o++) {
            var s = i[o],
                a = void 0;
            switch (s) {
                case "(":
                    a = {}, n.children = [a], e.push(n), n = a;
                    break;
                case ",":
                    a = {}, e[e.length - 1].children.push(a), n = a;
                    break;
                case ")":
                    n = e.pop();
                    break;
                case ":":
                    break;
                default:
                    var u = i[o - 1];
                    if (")" == u || "(" == u || "," == u) n.name = s;
                    else if (":" == u) "undefined" == typeof s ? "undefined" : r(s), isNaN(s) || (n.branch_length = parseFloat(s));
                    else if ("=" == u) {
                        var l = i[o - 2];
                        switch (l) {
                            case "D":
                                n.duplication = s;
                                break;
                            case "G":
                                n.gene_id = s;
                                break;
                            case "T":
                                n.taxon_id = s
                        }
                    }
            }
        }
        return n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    e.default = n
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.parseNhx = e.parse = void 0;
    var i = n(62),
        o = r(i),
        s = n(60),
        a = r(s),
        u = {};
    u.parse = o.default, u.parseNhx = a.default, e.default = u, e.parse = o.default, e.parseNhx = a.default
}, function(t, e) {
    "use strict";

    function n(t) {
        for (var e = [], n = {}, r = t.split(/\s*(;|\(|\)|,|:)\s*/), i = 0; i < r.length; i++) {
            var o = r[i],
                s = void 0;
            switch (o) {
                case "(":
                    s = {}, n.children = [s], e.push(n), n = s;
                    break;
                case ",":
                    s = {}, e[e.length - 1].children.push(s), n = s;
                    break;
                case ")":
                    n = e.pop();
                    break;
                case ":":
                    break;
                default:
                    var a = r[i - 1];
                    ")" == a || "(" == a || "," == a ? n.name = o : ":" == a && (n.branch_length = parseFloat(o))
            }
        }
        return n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = n
}, function(t, e) {
    "use strict";

    function n(t, e, n) {
        for (var r = [], i = t < e, o = n ? i ? e + 1 : e - 1 : e, s = t; i ? s < o : s > o; i ? s++ : s--) r.push(s);
        return r
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = function(t) {
        t = t || {};
        for (var e = n(0, arguments.length, !1), r = 0; r < e.length; r++) {
            var i = e[r];
            if (arguments[i])
                for (var o = 0; o < arguments[i].length; o++) {
                    var s = arguments[i][o];
                    arguments[i].hasOwnProperty(s) && (t[s] = arguments[i][s])
                }
        }
        return t
    }
}, function(t, e, n) {
    "use strict";
    t.exports.seq = n(65)
}, function(t, e) {
    "use strict";
    t.exports = function(t, e, n) {
        this.seq = t, this.name = e, this.id = n, this.meta = {}
    }
}, function(t, e, n) {
    "use strict";
    t.exports = n(72)
}, function(t, e) {
    "use strict";
    t.exports = {
        render_x_axis_label: function() {
            var t = "Model Position";
            this.display_ali_map && (t = "Alignment Column"), this.called_on.find(".logo_xaxis").remove(), this.called_on.prepend('<div class="logo_xaxis" class="centered" style="margin-left:40px"><p class="xaxis_text" style="width:10em;margin:1em auto">' + t + "</p></div>")
        },
        render_y_axis_label: function() {
            this.dom_element.parent().before('<canvas class="logo_yaxis" height="' + this.options.height + '" width="55"></canvas>');
            var t = this.called_on.find(".logo_yaxis"),
                e = (Math.abs(this.data.max_height), isNaN(this.data.min_height_obs) ? 0 : parseInt(this.data.min_height_obs, 10), null),
                n = "Information Content (bits)";
            e = t[0].getContext("2d"), e.beginPath(), e.moveTo(55, 1), e.lineTo(40, 1), e.moveTo(55, this.info_content_height), e.lineTo(40, this.info_content_height), e.moveTo(55, this.info_content_height / 2), e.lineTo(40, this.info_content_height / 2), e.lineWidth = 1, e.strokeStyle = "#666666", e.stroke(), e.fillStyle = "#666666", e.textAlign = "right", e.font = "bold 10px Arial", e.textBaseline = "top", e.fillText(parseFloat(this.data.max_height).toFixed(1), 38, 0), e.textBaseline = "middle", e.fillText(parseFloat(this.data.max_height / 2).toFixed(1), 38, this.info_content_height / 2), e.fillText("0", 38, this.info_content_height), "score" === this.data.height_calc && (n = "Score (bits)"), e.save(), e.translate(5, this.height / 2 - 20), e.rotate(-Math.PI / 2), e.textAlign = "center", e.font = "normal 12px Arial", e.fillText(n, 1, 0), e.restore(), e.fillText("occupancy", 55, this.info_content_height + 7), this.show_inserts && (e.fillText("ins. prob.", 50, 280), e.fillText("ins. len.", 46, 296))
        }
    }
}, function(t, e) {
    "use strict";
    var n = null;
    t.exports = function() {
        if (!n) {
            var t = document.createElement("canvas");
            n = !(!t.getContext || !t.getContext("2d"))
        }
        return n
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#FF9966",
        C: "#009999",
        D: "#FF0000",
        E: "#CC0033",
        F: "#00FF00",
        G: "#f2f20c",
        H: "#660033",
        I: "#CC9933",
        K: "#663300",
        L: "#FF9933",
        M: "#CC99CC",
        N: "#336666",
        P: "#0099FF",
        Q: "#6666CC",
        R: "#990000",
        S: "#0000FF",
        T: "#00FFFF",
        V: "#FFCC33",
        W: "#66CC66",
        Y: "#006600"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#cbf751",
        C: "#5ec0cc",
        G: "#ffdf59",
        T: "#b51f16",
        U: "#b51f16"
    }
}, function(t, e, n) {
    "use strict";
    var r = n(5);
    t.exports = function(t, e, n) {
        t.find(".logo_settings_switch, .logo_settings .close").on("click", function(t) {
            t.preventDefault(), r(".logo_settings").toggle()
        }), t.find(".logo_reset").on("click", function(t) {
            t.preventDefault(), e.changeZoom({
                target: e.default_zoom
            })
        }), t.find(".logo_change").on("click", function(t) {
            t.preventDefault()
        }), t.find(".logo_zoomin").on("click", function(t) {
            t.preventDefault(), e.changeZoom({
                distance: .1,
                direction: "+"
            })
        }), t.find(".logo_zoomout").on("click", function(t) {
            t.preventDefault(), e.changeZoom({
                distance: .1,
                direction: "-"
            })
        }), t.find(".logo_scale").on("change", function(t) {
            e.toggleScale(this.value)
        }), t.find(".logo_color").on("change", function(t) {
            e.toggleColorscheme(this.value)
        }), t.find(".logo_ali_map").on("change", function(t) {
            e.toggleAliMap(this.value)
        }), t.find(".logo_position").on("change", function() {
            this.value.match(/^\d+$/m) && e.scrollToColumn(this.value, 1)
        }), n.on("dblclick", function(n) {
            console.log("dblclick", e), offset = e.logo_graphic.offset(), x = parseInt(n.pageX - offset.left, 10), window_position = n.pageX - t.parent().offset().left, col = e.columnFromCoordinates(x), console.log("col", col), current = e.zoom, current < 1 ? e.changeZoom({
                target: 1,
                offset: window_position,
                column: col
            }) : e.changeZoom({
                target: .3,
                offset: window_position,
                column: col
            })
        }), r(document).on(t.attr("id") + ".scrolledTo", function(t, n, r, i) {
            e.render({
                target: n
            })
        }), r(document).on("keydown", function(t) {
            t.ctrlKey || (61 !== t.which && 107 !== t.which || (zoom += .1, e.changeZoom({
                distance: .1,
                direction: "+"
            })), 109 !== t.which && 0 !== t.which || (zoom -= .1, e.changeZoom({
                distance: .1,
                direction: "-"
            })))
        })
    }
}, function(t, e, n) {
    "use strict";
    _ = n(10);
    var r = n(68),
        i = n(75),
        o = n(74),
        s = n(2),
        a = n(67),
        u = n(71),
        l = n(73),
        c = n(5);
    t.exports = s.extend({
        options: {
            xaxis: !0,
            yaxis: !0,
            height: 300,
            column_width: 34,
            debug: !0,
            scale_height_enabled: !0,
            scaled_max: !0,
            zoom_buttons: !0,
            colorscheme: "default",
            data: void 0,
            start: 1,
            end: void 0,
            zoom: .4,
            colors: void 0,
            divider: !1,
            show_probs: !1,
            divider_step: 5,
            show_divider: !1,
            border: !1,
            settings: !1,
            scroller: !0,
            positionMarker: !0
        },
        loadDefault: function(t) {
            this.data = t.data, this.display_ali_map = 0, this.alphabet = t.data.alphabet || "dna", this.start = t.start, this.zoom = parseFloat(t.zoom) || .4, this.default_zoom = this.zoom, this.column_width = t.column_width, this.height = t.height, this.canvas_width = 5e3, this.scale_height_enabled = t.scale_height_enabled, this.scrollme = null, this.previous_target = 0, this.rendered = [], this.previous_zoom = 0, void 0 == this.data.max_height && (this.data.max_height = this.calcMaxHeight(this.data.heightArr)), this.data.insert_probs && this.data.delete_probs || (this.options.show_probs = !1), t.scaled_max ? this.data.max_height = t.data.max_height_obs || this.data.max_height || 2 : this.data.max_height = t.data.max_height_theory || this.data.max_height || 2, t.colors ? this.changeColors(t.colors) : "aa" === this.alphabet ? (this.aa_colors = n(69), this.changeColors(this.aa_colors)) : (this.dna_colors = n(70), this.changeColors(this.dna_colors))
        },
        initialize: function(t) {
            if (!r()) return void(this.el.textContent = "Your browser doesn't support canvas.");
            void 0 == t.data && (this.el.textContent = "No data added."), _.extend(this.options, t);
            var e = this.options;
            if (this.loadDefault(e), this.options.show_probs ? this.data.processing && /^observed|weighted/.test(this.data.processing) ? (this.show_inserts = 0, this.info_content_height = this.height - 14) : (this.show_inserts = 1, this.info_content_height = this.height - 44) : this.info_content_height = this.height, this.$el = c(this.el), this.initDivs(), this.options.settings) {
                var n = l(this, e);
                this.$el.append(n)
            }
            u(this.$el, this, this.logo_graphic)
        },
        initDivs: function() {
            var t = h("div");
            t.className = "logo_graphic", this.logo_graphic = c(t);
            var e = h("div");
            if (e.className = "logo_container", e.style.height = this.height, this.container = c(e), this.container.append(t), this.$el.append(e), this.options.divider) {
                var n = h("div");
                n.className = "logo_divider", this.$el.append(n)
            }
            this.dom_element = c(t), this.called_on = this.$el, this.options.xaxis && a.render_x_axis_label.call(this), this.options.yaxis ? a.render_y_axis_label.call(this) : this.container[0].style.marginLeft = "0px"
        },
        render: function() {
            return i.call(this), this
        },
        changeColors: function(t) {
            this.colors = t, void 0 != t && void 0 != t.type && (this.colorscheme = "dynamic"), this.buildAlphabet()
        },
        buildAlphabet: function() {
            this.letters = {};
            var t = this.colors;
            if ("dynamic" == this.colorscheme) {
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
                t = {}, e.forEach(function(e) {
                    t[e] = ""
                })
            }
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var r = {
                        color: t[n]
                    };
                    this.letters[n] = new o(n, r)
                }
        },
        toggleColorscheme: function(t) {
            var e = this.currentColumn();
            t ? "default" === t ? this.colorscheme = "default" : this.colorscheme = "consensus" : "default" === this.colorscheme ? this.colorscheme = "consensus" : this.colorscheme = "default", this.rendered = [], this.scrollme.reflow(), this.scrollToColumn(e + 1), this.scrollToColumn(e)
        },
        toggleScale: function(t) {
            var e = this.currentColumn();
            t ? "obs" === t ? this.data.max_height = this.data.max_height_obs : this.data.max_height = this.data.max_height_theory : this.data.max_height === this.data.max_height_obs ? this.data.max_height = this.data.max_height_theory : this.data.max_height = this.data.max_height_obs, this.rendered = [], this.logoYAxis && this.logoYAxis.remove(), a.render_y_axis_label.call(this), this.scrollme.reflow(), this.scrollToColumn(e + 1), this.scrollToColumn(e)
        },
        toggleAliMap: function(t) {
            var e = this.currentColumn();
            t ? "model" === t ? this.display_ali_map = 0 : this.display_ali_map = 1 : 1 === this.display_ali_map ? this.display_ali_map = 0 : this.display_ali_map = 1, a.render_x_axis_label(this), this.rendered = [], this.scrollme.reflow(), this.scrollToColumn(e + 1), this.scrollToColumn(e)
        },
        currentColumn: function() {
            var t = this.scrollme.scroller.getValues().left,
                e = this.column_width * this.zoom,
                n = t / e,
                r = this.container.width() / e / 2;
            return Math.ceil(n + r)
        },
        changeZoom: function(t) {
            var e = .3,
                n = null;
            if (t.target ? e = t.target : t.distance && (e = (parseFloat(this.zoom) - parseFloat(t.distance)).toFixed(1), "+" === t.direction && (e = (parseFloat(this.zoom) + parseFloat(t.distance)).toFixed(1))), e > 1 ? e = 1 : e < .1 && (e = .1), n = this.logo_graphic.width() * e / this.zoom, n > this.container.width())
                if (t.column) {
                    this.zoom = e, this.render({
                        zoom: this.zoom
                    }), this.scrollme.reflow();
                    var r = this.coordinatesFromColumn(t.column);
                    this.scrollme.scroller.scrollTo(r - t.offset)
                } else {
                    var i = this.currentColumn();
                    this.zoom = e, this.render({
                        zoom: this.zoom
                    }), this.scrollme.reflow(), this.scrollToColumn(i)
                } return this.zoom
        },
        columnFromCoordinates: function(t) {
            return Math.ceil(t / (this.column_width * this.zoom))
        },
        coordinatesFromColumn: function(t) {
            return (t - 1) * (this.column_width * this.zoom) + this.column_width * this.zoom / 2
        },
        scrollToColumn: function(t, e) {
            var n = this.logo_container.width() / 2,
                r = this.coordinatesFromColumn(t);
            this.scrollme.scroller.scrollTo(r - n, 0, e)
        },
        calcMaxHeight: function(t) {
            return t.reduce(function(t, e) {
                var n = 0;
                for (var r in e) n += e[r];
                return n > t ? n : t
            }, 0)
        }
    });
    var h = function(t) {
        return document.createElement(t)
    }
}, function(t, e, n) {
    "use strict";
    var r = n(5);
    t.exports = function(t, e) {
        var n = r('<form class="logo_form"><fieldset><label for="position">Column number</label><input type="text" name="position" class="logo_position"></input><button class="button logo_change">Go</button></fieldset></form>'),
            i = r('<div class="logo_settings"></div>');
        if (i.append('<span class="close">x</span>'), t.scale_height_enabled && t.data.max_height_obs < t.data.max_height_theory) {
            var o = "",
                s = "",
                a = "",
                u = "";
            t.data.max_height_obs === t.data.max_height ? o = "checked" : s = "checked"
        }
        var l = '<fieldset><legend>Scale</legend><label><input type="radio" name="scale" class="logo_scale" value="obs" ' + o + "/>Maximum Observed " + u + '</label></br><label><input type="radio" name="scale" class="logo_scale" value="theory" ' + s + "/>Maximum Theoretical " + a + "</label></fieldset>";
        if (i.append(l), "score" !== t.data.height_calc && "aa" === t.data.alphabet && t.data.probs_arr) {
            var c = null,
                h = null,
                f = "",
                d = "";
            "default" === t.colorscheme ? c = "checked" : h = "checked", e.help && (f = '<a class="help" href="/help#colors_default" title="Each letter receives its own color."><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>', d = '<a class="help" href="/help#colors_consensus" title="Letters are colored as in Clustalx and Jalview, with colors depending on composition of the column."><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>');
            var g = '<fieldset><legend>Color Scheme</legend><label><input type="radio" name="color" class="logo_color" value="default" ' + c + "/>Default " + f + '</label></br><label><input type="radio" name="color" class="logo_color" value="consensus" ' + h + "/>Consensus Colors " + d + "</label></fieldset>";
            i.append(g)
        }
        if (t.data.ali_map) {
            var p = null,
                m = null,
                v = "",
                _ = "";
            0 === t.display_ali_map ? p = "checked" : m = "checked", e.help && (v = '<a class="help" href="/help#coords_model" title="The coordinates along the top of the plot show the model position."><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>', _ = '<a class="help" href="/help#coords_ali" title="The coordinates along the top of the plot show the column in the alignment associated with the model"><span aria-hidden="true" data-icon="?"></span><span class="reader-text">help</span></a>');
            var y = '<fieldset><legend>Coordinates</legend><label><input type="radio" name="coords" class="logo_ali_map" value="model" ' + p + "/>Model " + v + '</label></br><label><input type="radio" name="coords" class="logo_ali_map" value="alignment" ' + m + "/>Alignment " + _ + "</label></fieldset>";
            i.append(y)
        }
        var b = r('<div class="logo_controls"></div>');
        return t.zoom_enabled && b.append('<button class="logo_zoomout button">-</button><button class="logo_zoomin button">+</button>'), i.children().length > 0 && (b.append('<button class="logo_settings_switch button">Settings</button>'), b.append(i)), n.append(b), n
    }
}, function(t, e) {
    "use strict";
    t.exports = function(t, e) {
        e = e || {}, this.value = t, this.width = parseInt(e.width, 10) || 100, "W" === this.value && (this.width += 30 * this.width / 100), this.height = parseInt(e.height, 10) || 100, this.color = e.color || "#000000", this.fontSize = e.fontSize || 138, this.scaled = function() {}, this.draw = function(t, e, n, r, i, o) {
            var s = e / this.height,
                a = n / this.width,
                u = t.font;
            t.transform(a, 0, 0, s, r, i), t.fillStyle = o || this.color, t.textAlign = "center", t.font = "bold " + this.fontSize + "px Arial", t.fillText(this.value, 0, 0), t.setTransform(1, 0, 0, 1, 0, 0), t.fillStyle = "#000000", t.font = u
        }
    }
}, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i) {
        var o = s(t).find("#canv_" + r);
        return o.length || (s(t).append('<canvas class="canvas_logo" id="canv_' + r + '"  height="' + e + '" width="' + n + '" style="left:' + i * r + 'px"></canvas>'), o = s(t).find("#canv_" + r)), s(o).attr("width", n).attr("height", e), o[0]
    }
    var i = n(77),
        o = n(76),
        s = n(5);
    t.exports = function(t) {
        if (this.data) {
            t = t || {};
            var e = t.zoom || this.zoom,
                n = t.target || 1,
                s = (t.scaled || null, this.dom_element.parent().attr("width")),
                a = 1,
                u = null,
                l = null,
                c = 0;
            if (this.previous_target = n, t.start && (this.start = t.start), t.end && (this.end = t.end), e <= .1 ? e = .1 : e >= 1 && (e = 1), this.zoom = e, u = this.end || this.data.heightArr.length, l = this.start || 1, u = u > this.data.heightArr.length ? this.data.heightArr.length : u, u = u < l ? l : u, l = l > u ? u : l, l = l > 1 ? l : 1, this.y = this.height - 20, this.max_width = this.column_width * (u - l + 1), s > this.max_width && (e = 1, this.zoom_enabled = !1), this.zoom = e, this.zoomed_column = this.column_width * e, this.total_width = this.zoomed_column * (u - l + 1), e < 1)
                for (; this.total_width < s && (this.zoom += .1, this.zoomed_column = this.column_width * this.zoom, this.total_width = this.zoomed_column * (u - l + 1), this.zoom_enabled = !1, !(e >= 1)););
            n > this.total_width && (n = this.total_width), this.dom_element.attr({
                width: this.total_width + "px"
            }).css({
                width: this.total_width + "px"
            }), this.canvas_width = this.total_width;
            var h = Math.ceil(this.total_width / this.canvas_width);
            for (this.columns_per_canvas = Math.ceil(this.canvas_width / this.zoomed_column), this.previous_zoom !== this.zoom && (this.dom_element.find("canvas").remove(), this.previous_zoom = this.zoom, this.rendered = []), this.canvases = [], this.contexts = [], c = 0; c < h; c++) {
                var f = this.columns_per_canvas * c + l,
                    d = f + this.columns_per_canvas - 1;
                d > u && (d = u);
                var g = (d - f + 1) * this.zoomed_column;
                g > a && (a = g);
                var p = a * c,
                    m = p + g;
                if (n < m + m / 2 && n > p - p / 2)
                    if (this.canvases[c] = r(this.dom_element, this.height, g, c, a), this.contexts[c] = this.canvases[c].getContext("2d"), this.contexts[c].setTransform(1, 0, 0, 1, 0, 0), this.contexts[c].clearRect(0, 0, g, this.height), this.contexts[c].fillStyle = "#ffffff", this.contexts[c].fillRect(0, 0, m, this.height), this.zoomed_column > 12) {
                        var v = parseInt(10 * e, 10);
                        v = v > 10 ? 10 : v, this.debug && o.call(this, f, d, c, 1), i.call(this, f, d, c, v)
                    } else o.call(this, f, d, c)
            }!this.scrollme && this.options.scroller && (this.scrollme = new EasyScroller(this.dom_element[0], {
                scrollingX: 1,
                scrollingY: 0,
                eventTarget: this.called_on
            })), 1 !== n && this.scrollme.reflow()
        }
    }
}, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, i, o, s, a) {
        var u = "#ffffff";
        a ? (i > .1 ? u = "#d7301f" : i > .05 ? u = "#fc8d59" : i > .03 && (u = "#fdcc8a"), t.fillStyle = u, t.fillRect(e, n + 15, r, 10), u = "#ffffff", o > 9 ? u = "#d7301f" : o > 7 ? u = "#fc8d59" : o > 4 && (u = "#fdcc8a"), t.fillStyle = u, t.fillRect(e, n + 30, r, 10)) : n += 30, u = "#ffffff", s < .75 ? u = "#2171b5" : s < .85 ? u = "#6baed6" : s < .95 && (u = "#bdd7e7"), t.fillStyle = u, t.fillRect(e, n, r, 10)
    }
    var i = n(45),
        o = n(47),
        s = n(46);
    t.exports = function(t, e, n, a) {
        var u = 0,
            l = t,
            c = null,
            h = 0,
            f = Math.abs(this.data.max_height),
            d = Math.abs(this.data.min_height_obs),
            g = f + d,
            p = Math.round(100 * Math.abs(this.data.max_height) / g),
            m = Math.round(this.info_content_height * p / 100),
            v = (this.info_content_height - m, 10);
        for (h = t; h <= e; h++) {
            if (this.data.mmline && 1 === this.data.mmline[h - 1]) this.contexts[n].fillStyle = "#cccccc", this.contexts[n].fillRect(u, 10, this.zoomed_column, this.height - 40);
            else {
                var _ = this.data.heightArr[h - 1],
                    y = 0,
                    b = (_.length, 0);
                for (var b in _) {
                    var x = [b, _[b]];
                    if (x[1] > .01) {
                        var w = parseFloat(x[1]) / this.data.max_height,
                            S = u,
                            z = (this.info_content_height - 2) * w,
                            k = this.info_content_height - 2 - y - z,
                            C = null;
                        C = "dynamic" === this.colorscheme ? this.colors.getColor(x[0], {
                            pos: h - 1
                        }) : "consensus" === this.colorscheme ? this.cmap[h - 1][x[0]] || "#7a7a7a" : this.colors[x[0]], a ? (this.contexts[n].strokeStyle = C, this.contexts[n].strokeRect(S, k, this.zoomed_column, z)) : (this.contexts[n].fillStyle = C, this.contexts[n].fillRect(S, k, this.zoomed_column, z)), y += z
                    }
                }
            }
            this.zoom < .2 ? v = 20 : this.zoom < .3 && (v = 10), this.options.positionMarker && h % v === 0 && (this.options.show_probs && o(this.contexts[n], u + this.zoomed_column, this.height - 30, parseFloat(this.height), "#dddddd"), o(this.contexts[n], u + this.zoomed_column, 0, 5), c = this.display_ali_map ? this.data.ali_map[h - 1] : l, s(this.contexts[n], u - 2, 10, this.zoomed_column, c, 10, !0)), this.options.show_probs && r(this.contexts[n], u, this.height - 42, this.zoomed_column, this.data.insert_probs[h - 1], this.data.insert_lengths[h - 1], this.data.delete_probs[h - 1], this.show_inserts), this.options.show_probs && (this.show_inserts ? i(this.contexts[n], this.height - 45, this.total_width) : i(this.contexts[n], this.height - 15, this.total_width)), this.options.border && i(this.contexts[n], 0, this.total_width), u += this.zoomed_column, l++
        }
    }
}, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, o, s, a) {
        var u = n - 4,
            l = "#ffffff",
            c = "#555555";
        a && (u = n - 35), o < .75 ? (l = "#2171b5", c = "#ffffff") : o < .85 ? l = "#6baed6" : o < .95 && (l = "#bdd7e7"), i(t, e, u, o, s, r, l, c)
    }

    function i(t, e, n, r, i, o, s, a) {
        t.font = i + "px Arial", t.fillStyle = s, t.fillRect(e, n - 10, o, 14), t.textAlign = "center", t.fillStyle = a, t.fillText(r, e + o / 2, n)
    }

    function o(t, e) {
        var n = e.ralign ? e.x + t.zoomed_column : e.x,
            r = e.ralign ? e.x + 2 : e.x;
        l(t.contexts[e.context_num], n, t.height - 30, -30 - t.height, "#dddddd"), l(t.contexts[e.context_num], n, 0, 5), c(t.contexts[e.context_num], r, 10, t.zoomed_column, e.column_num, e.fontsize, e.ralign)
    }

    function s(t, e, n, r, o, s) {
        var a = n - 20,
            u = "#ffffff",
            c = "#555555";
        o > .1 ? (u = "#d7301f", c = "#ffffff") : o > .05 ? u = "#fc8d59" : o > .03 && (u = "#fdcc8a"), i(t, e, a, o, s, r, u, c), o > .03 && l(t, e + r, n - 30, -30 - n, u)
    }

    function a(t, e, n, r, o, s) {
        var a = "#ffffff",
            u = "#555555";
        o > 9 ? (a = "#d7301f", u = "#ffffff") : o > 7 ? a = "#fc8d59" : o > 4 && (a = "#fdcc8a"), i(t, e, n, o, s, r, a, u)
    }
    var u = n(45),
        l = n(47),
        c = n(46);
    t.exports = function(t, e, n, i) {
        var c = 0,
            h = t,
            f = null,
            d = 0,
            g = Math.abs(this.data.max_height),
            p = isNaN(this.data.min_height_obs) ? 0 : parseInt(this.data.min_height_obs, 10),
            m = g + Math.abs(p),
            v = Math.round(100 * Math.abs(this.data.max_height) / m),
            _ = Math.round(this.info_content_height * v / 100),
            y = this.info_content_height - _;
        for (_ / this.info_content_height, y / this.info_content_height, e + 3 <= this.end && (e += 3), d = t; d <= e; d++) {
            if (this.data.mmline && 1 === this.data.mmline[d - 1]) this.contexts[n].fillStyle = "#cccccc", this.contexts[n].fillRect(c, 10, this.zoomed_column, this.height - 40);
            else {
                var b = this.data.heightArr[d - 1],
                    x = [];
                if (b) {
                    var w = 0,
                        S = (b.length, 0),
                        z = null;
                    for (var S in b) {
                        var k = b[S],
                            C = [S, k],
                            M = c + this.zoomed_column / 2,
                            j = null;
                        if (C[1] > .01) {
                            j = parseFloat(C[1]) / this.data.max_height;
                            var E = this.info_content_height - 2 - w,
                                O = (this.info_content_height - 2) * j;
                            x[S] = [O, this.zoomed_column, M, E], w += O
                        }
                    }
                    for (var S in b) x[S] && this.letters[S] && (z = "dynamic" === this.colorscheme ? this.colors.getColor(S, {
                        pos: d - 1
                    }) : "consensus" === this.colorscheme ? this.cmap[d - 1][S] || "#7a7a7a" : null, this.letters[S].draw(this.contexts[n], x[S][0], x[S][1], x[S][2], x[S][3], z))
                }
            }
            f = this.display_ali_map ? this.data.ali_map[d - 1] : h, this.options.show_divider && (this.zoom < .7 ? d % this.options.divider_step === 0 && o(this, {
                context_num: n,
                x: c,
                fontsize: 10,
                column_num: f,
                ralign: !0
            }) : o(this, {
                context_num: n,
                x: c,
                fontsize: i,
                column_num: f
            })), this.options.show_probs && (r(this.contexts[n], c, this.height, this.zoomed_column, this.data.delete_probs[d - 1], i, this.show_inserts), l(this.contexts[n], c, this.height - 15, 5), this.show_inserts && (s(this.contexts[n], c, this.height, this.zoomed_column, this.data.insert_probs[d - 1], i), a(this.contexts[n], c, this.height - 5, this.zoomed_column, this.data.insert_lengths[d - 1], i), l(this.contexts[n], c, this.height - 45, 5), l(this.contexts[n], c, this.height - 30, 5))), c += this.zoomed_column, h++
        }
        this.options.show_probs && (this.show_inserts && (u(this.contexts[n], this.height - 30, this.total_width), u(this.contexts[n], this.height - 45, this.total_width)), u(this.contexts[n], this.height - 15, this.total_width)), this.options.border && u(this.contexts[n], 0, this.total_width)
    }
}, function(t, e) {
    "use strict";
    var n = window.HTMLCanvasElement && window.HTMLCanvasElement.prototype,
        r = window.Blob && function() {
            try {
                return Boolean(new Blob)
            } catch (t) {
                return !1
            }
        }(),
        i = r && window.Uint8Array && function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (t) {
                return !1
            }
        }(),
        o = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
        s = (r || o) && window.atob && window.ArrayBuffer && window.Uint8Array && function(t) {
            var e, n, s, a, u, l;
            for (e = t.split(",")[0].indexOf("base64") >= 0 ? atob(t.split(",")[1]) : decodeURIComponent(t.split(",")[1]), n = new ArrayBuffer(e.length), s = new Uint8Array(n), a = 0; a < e.length; a += 1) s[a] = e.charCodeAt(a);
            return u = t.split(",")[0].split(":")[1].split(";")[0], r ? new Blob([i ? s : n], {
                type: u
            }) : (l = new o, l.append(n), l.getBlob(u))
        };
    window.HTMLCanvasElement && !n.toBlob && (n.mozGetAsFile ? n.toBlob = function(t, e, r) {
        t(r && n.toDataURL && s ? s(this.toDataURL(e, r)) : this.mozGetAsFile("blob", e))
    } : n.toDataURL && s && (n.toBlob = function(t, e, n) {
        t(s(this.toDataURL(e, n)))
    })), t.exports = s
}, function(t, e, n) {
    (function(t) {
        "use strict"; /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
        var e = e || "undefined" != typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(t) {
                if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
                    var e = t.document,
                        n = function() {
                            return t.URL || t.webkitURL || t
                        },
                        r = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                        i = !t.externalHost && "download" in r,
                        o = function(n) {
                            var r = e.createEvent("MouseEvents");
                            r.initMouseEvent("click", !0, !1, t, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(r)
                        },
                        s = t.webkitRequestFileSystem,
                        a = t.requestFileSystem || s || t.mozRequestFileSystem,
                        u = function(e) {
                            (t.setImmediate || t.setTimeout)(function() {
                                throw e
                            }, 0)
                        },
                        l = "application/octet-stream",
                        c = 0,
                        h = [],
                        f = function() {
                            for (var t = h.length; t--;) {
                                var e = h[t];
                                "string" == typeof e ? n().revokeObjectURL(e) : e.remove()
                            }
                            h.length = 0
                        },
                        d = function(t, e, n) {
                            e = [].concat(e);
                            for (var r = e.length; r--;) {
                                var i = t["on" + e[r]];
                                if ("function" == typeof i) try {
                                    i.call(t, n || t)
                                } catch (t) {
                                    u(t)
                                }
                            }
                        },
                        g = function(e, u) {
                            var f, g, p, m = this,
                                v = e.type,
                                _ = !1,
                                y = function() {
                                    var t = n().createObjectURL(e);
                                    return h.push(t), t
                                },
                                b = function() {
                                    d(m, "writestart progress write writeend".split(" "))
                                },
                                x = function() {
                                    !_ && f || (f = y(e)), g ? g.location.href = f : window.open(f, "_blank"), m.readyState = m.DONE, b()
                                },
                                w = function(t) {
                                    return function() {
                                        if (m.readyState !== m.DONE) return t.apply(this, arguments)
                                    }
                                },
                                S = {
                                    create: !0,
                                    exclusive: !1
                                };
                            return m.readyState = m.INIT, u || (u = "download"), i ? (f = y(e), r.href = f, r.download = u, o(r), m.readyState = m.DONE, void b()) : (t.chrome && v && v !== l && (p = e.slice || e.webkitSlice, e = p.call(e, 0, e.size, l), _ = !0), s && "download" !== u && (u += ".download"), (v === l || s) && (g = t), a ? (c += e.size, void a(t.TEMPORARY, c, w(function(t) {
                                t.root.getDirectory("saved", S, w(function(t) {
                                    var n = function() {
                                        t.getFile(u, S, w(function(t) {
                                            t.createWriter(w(function(n) {
                                                n.onwriteend = function(e) {
                                                    g.location.href = t.toURL(), h.push(t), m.readyState = m.DONE, d(m, "writeend", e)
                                                }, n.onerror = function() {
                                                    var t = n.error;
                                                    t.code !== t.ABORT_ERR && x()
                                                }, "writestart progress write abort".split(" ").forEach(function(t) {
                                                    n["on" + t] = m["on" + t]
                                                }), n.write(e), m.abort = function() {
                                                    n.abort(), m.readyState = m.DONE
                                                }, m.readyState = m.WRITING
                                            }), x)
                                        }), x)
                                    };
                                    t.getFile(u, {
                                        create: !1
                                    }, w(function(t) {
                                        t.remove(), n()
                                    }), w(function(t) {
                                        t.code === t.NOT_FOUND_ERR ? n() : x()
                                    }))
                                }), x)
                            }), x)) : void x())
                        },
                        p = g.prototype,
                        m = function(t, e) {
                            return new g(t, e)
                        };
                    return p.abort = function() {
                        var t = this;
                        t.readyState = t.DONE, d(t, "abort")
                    }, p.readyState = p.INIT = 0, p.WRITING = 1, p.DONE = 2, p.error = p.onwritestart = p.onprogress = p.onwrite = p.onabort = p.onerror = p.onwriteend = null, t.addEventListener("unload", f, !1), m.unload = function() {
                        f(), t.removeEventListener("unload", f, !1)
                    }, m
                }
            }("undefined" != typeof self && self || "undefined" != typeof window && window || (void 0).content),
            n = window.define;
        "undefined" == typeof n && "undefined" != typeof window.almond && "define" in window.almond && (n = window.almond.define), "undefined" != typeof t && null !== t ? t.exports = e : "undefined" != typeof n && null !== n && null != n.amd && n("saveAs", [], function() {
            return e
        })
    }).call(e, n(23)(t))
}, function(t, e) {
    "use strict";
    t.exports = function() {
        var t = [];
        return t.toString = function() {
            for (var t = [], e = 0; e < this.length; e++) {
                var n = this[e];
                n[2] ? t.push("@media " + n[2] + "{" + n[1] + "}") : t.push(n[1])
            }
            return t.join("")
        }, t.i = function(e, n) {
            "string" == typeof e && (e = [
                [null, e, ""]
            ]);
            for (var r = {}, i = 0; i < this.length; i++) {
                var o = this[i][0];
                "number" == typeof o && (r[o] = !0)
            }
            for (i = 0; i < e.length; i++) {
                var s = e[i];
                "number" == typeof s[0] && r[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), t.push(s))
            }
        }, t
    }
}, function(t, e) {
    (function(e) {
        "use strict";
        var n;
        n = "undefined" != typeof window ? window : "undefined" != typeof e ? e : "undefined" != typeof self ? self : {}, t.exports = n
    }).call(e, function() {
        return this
    }())
}, function(t, e) {
    "use strict";

    function n(t) {
        if (!t) return !1;
        var e = r.call(t);
        return "[object Function]" === e || "function" == typeof t && "[object RegExp]" !== e || "undefined" != typeof window && (t === window.setTimeout || t === window.alert || t === window.confirm || t === window.prompt)
    }
    t.exports = n;
    var r = Object.prototype.toString
}, function(t, e, n) {
    "use strict";
    ! function(n) {
        function r(t, e) {
            if (!(this instanceof r)) return new r(t, e);
            this.domain = [], this.range = [], Array.isArray(t) && (this.domain = t), Array.isArray(e) && (this.range = e);
            var n = function(t) {
                if ("number" != typeof t) return null;
                var e = this.domain[0],
                    n = this.domain[1],
                    r = this.range[0],
                    i = this.range[1];
                return "number" !== r && "number" != typeof i && (r = e, i = n), r + (i - r) / (n - e) * (t - e)
            }.bind(this);
            return n.domain = function(t) {
                return Array.isArray(t) && (this.domain = t), n
            }.bind(this), n.range = function(t) {
                return Array.isArray(t) && (this.range = t), n
            }.bind(this), n
        }
        "undefined" != typeof t && t.exports && (e = t.exports = r), e.LinearScale = r
    }(void 0)
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#00a35c",
        R: "#00fc03",
        N: "#00eb14",
        D: "#00eb14",
        C: "#0000ff",
        Q: "#00f10e",
        E: "#00f10e",
        G: "#009d62",
        H: "#00d52a",
        I: "#0054ab",
        L: "#007b84",
        K: "#00ff00",
        M: "#009768",
        F: "#008778",
        P: "#00e01f",
        S: "#00d52a",
        T: "#00db24",
        W: "#00a857",
        Y: "#00e619",
        V: "#005fa0",
        B: "#00eb14",
        X: "#00b649",
        Z: "#00f10e"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#BBBBBB",
        B: "grey",
        C: "yellow",
        D: "red",
        E: "red",
        F: "magenta",
        G: "brown",
        H: "#00FFFF",
        I: "#BBBBBB",
        J: "#fff",
        K: "#00FFFF",
        L: "#BBBBBB",
        M: "#BBBBBB",
        N: "green",
        O: "#fff",
        P: "brown",
        Q: "green",
        R: "#00FFFF",
        S: "green",
        T: "green",
        U: "#fff",
        V: "#BBBBBB",
        W: "magenta",
        X: "grey",
        Y: "magenta",
        Z: "grey",
        Gap: "grey"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "orange",
        B: "#fff",
        C: "green",
        D: "red",
        E: "red",
        F: "blue",
        G: "orange",
        H: "red",
        I: "green",
        J: "#fff",
        K: "red",
        L: "green",
        M: "green",
        N: "#fff",
        O: "#fff",
        P: "orange",
        Q: "#fff",
        R: "red",
        S: "orange",
        T: "orange",
        U: "#fff",
        V: "green",
        W: "blue",
        X: "#fff",
        Y: "blue",
        Z: "#fff",
        Gap: "#fff"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#80a0f0",
        R: "#f01505",
        N: "#00ff00",
        D: "#c048c0",
        C: "#f08080",
        Q: "#00ff00",
        E: "#c048c0",
        G: "#f09048",
        H: "#15a4a4",
        I: "#80a0f0",
        L: "#80a0f0",
        K: "#f01505",
        M: "#80a0f0",
        F: "#80a0f0",
        P: "#ffff00",
        S: "#00ff00",
        T: "#00ff00",
        W: "#80a0f0",
        Y: "#15a4a4",
        V: "#80a0f0",
        B: "#fff",
        X: "#fff",
        Z: "#fff"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#e718e7",
        R: "#6f906f",
        N: "#1be41b",
        D: "#778877",
        C: "#23dc23",
        Q: "#926d92",
        E: "#ff00ff",
        G: "#00ff00",
        H: "#758a75",
        I: "#8a758a",
        L: "#ae51ae",
        K: "#a05fa0",
        M: "#ef10ef",
        F: "#986798",
        P: "#00ff00",
        S: "#36c936",
        T: "#47b847",
        W: "#8a758a",
        Y: "#21de21",
        V: "#857a85",
        B: "#49b649",
        X: "#758a75",
        Z: "#c936c9"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#ad0052",
        B: "#0c00f3",
        C: "#c2003d",
        D: "#0c00f3",
        E: "#0c00f3",
        F: "#cb0034",
        G: "#6a0095",
        H: "#1500ea",
        I: "#ff0000",
        J: "#fff",
        K: "#0000ff",
        L: "#ea0015",
        M: "#b0004f",
        N: "#0c00f3",
        O: "#fff",
        P: "#4600b9",
        Q: "#0c00f3",
        R: "#0000ff",
        S: "#5e00a1",
        T: "#61009e",
        U: "#fff",
        V: "#f60009",
        W: "#5b00a4",
        X: "#680097",
        Y: "#4f00b0",
        Z: "#0c00f3"
    }
}, function(t, e, n) {
    "use strict";

    function r(t) {
        if (null == t || "object" != ("undefined" == typeof t ? "undefined" : i(t))) return t;
        var e = t.constructor();
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        o = n(96),
        s = o.stat,
        a = o.dyn,
        u = n(84),
        l = n(85),
        c = n(86),
        h = n(87),
        f = n(88),
        d = n(89),
        g = n(91),
        p = n(92),
        m = n(93),
        v = n(95),
        _ = n(97),
        y = n(98),
        b = n(99),
        x = n(100),
        w = {
            buried: u,
            buried_index: u,
            cinema: l,
            clustal2: h,
            clustal: c,
            helix: f,
            helix_propensity: f,
            hydro: d,
            lesk: g,
            mae: p,
            nucleotide: m,
            purine: v,
            purine_pyrimidine: v,
            strand: _,
            strand_propensity: _,
            taylor: y,
            turn: b,
            turn_propensity: b,
            zappo: x
        },
        S = n(94),
        z = {
            pid: S
        },
        k = function(t) {
            this.maps = r(w), this.dyn = r(z), this.opt = t
        };
    t.exports = k, k.getScheme = function(t) {
        return w[t]
    }, k.prototype.getScheme = function(t) {
        var e = this.maps[t];
        return void 0 === e && (e = {}, void 0 != this.dyn[t]) ? new a(this.dyn[t], this.opt) : new s(e)
    }, k.prototype.addStaticScheme = function(t, e) {
        this.maps[t] = e
    }, k.prototype.addDynScheme = function(t, e) {
        this.dyn[t] = e
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: " orange",
        B: " #fff",
        C: " green",
        D: " red",
        E: " red",
        F: " green",
        G: " orange",
        H: " magenta",
        I: " green",
        J: " #fff",
        K: " red",
        L: " green",
        M: " green",
        N: " magenta",
        O: " #fff",
        P: " green",
        Q: " magenta",
        R: " red",
        S: " orange",
        T: " orange",
        U: " #fff",
        V: " green",
        W: " green",
        X: " #fff",
        Y: " green",
        Z: " #fff",
        Gap: " #fff"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: " #77dd88",
        B: " #fff",
        C: " #99ee66",
        D: " #55bb33",
        E: " #55bb33",
        F: " #9999ff",
        G: " #77dd88",
        H: " #5555ff",
        I: " #66bbff",
        J: " #fff",
        K: " #ffcc77",
        L: " #66bbff",
        M: " #66bbff",
        N: " #55bb33",
        O: " #fff",
        P: " #eeaaaa",
        Q: " #55bb33",
        R: " #ffcc77",
        S: " #ff4455",
        T: " #ff4455",
        U: " #fff",
        V: " #66bbff",
        W: " #9999ff",
        X: " #fff",
        Y: " #9999ff",
        Z: " #fff",
        Gap: " #fff"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: " #64F73F",
        C: " #FFB340",
        G: " #EB413C",
        T: " #3C88EE",
        U: " #3C88EE"
    }
}, function(t, e) {
    "use strict";
    var n;
    t.exports = n = {}, n.init = function() {
        this.cons = this.opt.conservation()
    }, n.run = function(t, e) {
        var n = this.cons[e.pos];
        return n > .8 ? "#6464ff" : n > .6 ? "#9da5ff" : n > .4 ? "#cccccc" : "#ffffff"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: " #FF83FA",
        C: " #40E0D0",
        G: " #FF83FA",
        R: " #FF83FA",
        T: " #40E0D0",
        U: " #40E0D0",
        Y: " #40E0D0"
    }
}, function(t, e) {
    "use strict";
    var n = function(t) {
            this.defaultColor = "#ffffff", this.type = "static", this.map = t, this.getColor = function(t) {
                return void 0 !== this.map[t] ? this.map[t] : this.defaultColor
            }
        },
        r = function(t, e) {
            this.type = "dyn", this.opt = e, void 0 !== t.init ? (t.init.call(this), this.getColor = t.run, this.reset = t.init) : this.getColor = t
        };
    t.exports.stat = n, t.exports.dyn = r
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#5858a7",
        R: "#6b6b94",
        N: "#64649b",
        D: "#2121de",
        C: "#9d9d62",
        Q: "#8c8c73",
        E: "#0000ff",
        G: "#4949b6",
        H: "#60609f",
        I: "#ecec13",
        L: "#b2b24d",
        K: "#4747b8",
        M: "#82827d",
        F: "#c2c23d",
        P: "#2323dc",
        S: "#4949b6",
        T: "#9d9d62",
        W: "#c0c03f",
        Y: "#d3d32c",
        V: "#ffff00",
        B: "#4343bc",
        X: "#797986",
        Z: "#4747b8"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#ccff00",
        R: "#0000ff",
        N: "#cc00ff",
        D: "#ff0000",
        C: "#ffff00",
        Q: "#ff00cc",
        E: "#ff0066",
        G: "#ff9900",
        H: "#0066ff",
        I: "#66ff00",
        L: "#33ff00",
        K: "#6600ff",
        M: "#00ff00",
        F: "#00ff66",
        P: "#ffcc00",
        S: "#ff3300",
        T: "#ff6600",
        W: "#00ccff",
        Y: "#00ffcc",
        V: "#99ff00",
        B: "#fff",
        X: "#fff",
        Z: "#fff"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#2cd3d3",
        R: "#708f8f",
        N: "#ff0000",
        D: "#e81717",
        C: "#a85757",
        Q: "#3fc0c0",
        E: "#778888",
        G: "#ff0000",
        H: "#708f8f",
        I: "#00ffff",
        L: "#1ce3e3",
        K: "#7e8181",
        M: "#1ee1e1",
        F: "#1ee1e1",
        P: "#f60909",
        S: "#e11e1e",
        T: "#738c8c",
        W: "#738c8c",
        Y: "#9d6262",
        V: "#07f8f8",
        B: "#f30c0c",
        X: "#7c8383",
        Z: "#5ba4a4"
    }
}, function(t, e) {
    "use strict";
    t.exports = {
        A: "#ffafaf",
        R: "#6464ff",
        N: "#00ff00",
        D: "#ff0000",
        C: "#ffff00",
        Q: "#00ff00",
        E: "#ff0000",
        G: "#ff00ff",
        H: "#6464ff",
        I: "#ffafaf",
        L: "#ffafaf",
        K: "#6464ff",
        M: "#ffafaf",
        F: "#ffc800",
        P: "#ff00ff",
        S: "#00ff00",
        T: "#00ff00",
        W: "#ffc800",
        Y: "#ffc800",
        V: "#ffafaf",
        B: "#fff",
        X: "#fff",
        Z: "#fff"
    }
}, function(t, e) {
    "use strict";
    var n = function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        r = function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        };
    t.exports = function(t) {
        if (!t) return {};
        for (var e = {}, i = n(t).split("\n"), o = 0; o < i.length; o++) {
            var s = i[o],
                a = s.indexOf(":"),
                u = n(s.slice(0, a)).toLowerCase(),
                l = n(s.slice(a + 1));
            "undefined" == typeof e[u] ? e[u] = l : r(e[u]) ? e[u].push(l) : e[u] = [e[u], l]
        }
        return e
    }
}, function(t, e, n) {
    "use strict";

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.version = e.io = e.$ = e.boneView = e.view = e.selcol = e.selection = e.utils = e.menu = e.model = e.msa = void 0;
    var o = n(8);
    Object.defineProperty(e, "selection", {
        enumerable: !0,
        get: function() {
            return i(o).default
        }
    });
    var s = n(9);
    Object.defineProperty(e, "selcol", {
        enumerable: !0,
        get: function() {
            return i(s).default
        }
    });
    var a = n(2);
    Object.defineProperty(e, "view", {
        enumerable: !0,
        get: function() {
            return i(a).default
        }
    });
    var u = n(4);
    Object.defineProperty(e, "boneView", {
        enumerable: !0,
        get: function() {
            return i(u).default
        }
    });
    var l = n(5);
    Object.defineProperty(e, "$", {
        enumerable: !0,
        get: function() {
            return i(l).default
        }
    });
    var c = n(117),
        h = i(c),
        f = n(51),
        d = r(f),
        g = n(104),
        p = r(g),
        m = n(38),
        v = r(m),
        _ = n(12),
        y = function() {
            var t = function(t) {
                return h.default.apply(this, t)
            };
            return t.prototype = h.default.prototype, new t(arguments)
        };
    e.default = y, e.msa = h.default, e.model = d, e.menu = p, e.utils = v;
    var b = {
        xhr: n(24),
        fasta: _.fasta,
        clustal: _.clustal,
        gff: _.gff
    };
    e.io = b;
    var x = "imported";
    x = "1.0.6", e.version = x
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(113),
        o = r(i),
        s = n(111),
        a = r(s),
        u = n(115),
        l = r(u),
        c = n(116),
        h = r(c),
        f = n(107),
        d = r(f),
        g = n(114),
        p = r(g),
        m = n(110),
        v = r(m),
        _ = n(109),
        y = r(_),
        b = n(112),
        x = r(b),
        w = n(108),
        S = r(w),
        z = n(106),
        k = r(z),
        C = n(4),
        M = C.extend({
            initialize: function(t) {
                if (!t.msa) throw new Error("No msa instance provided. Please provide .msa");
                if (this.msa = t.msa, this.msa.g.menuconfig = new k.default(t.menu), this.addView("10_import", new o.default({
                    model: this.msa.seqs,
                    g: this.msa.g,
                    msa: this.msa
                })), this.addView("15_ordering", new p.default({
                    model: this.msa.seqs,
                    g: this.msa.g
                })), this.addView("20_filter", new a.default({
                    model: this.msa.seqs,
                    g: this.msa.g
                })), this.addView("30_selection", new l.default({
                    model: this.msa.seqs,
                    g: this.msa.g
                })), this.addView("40_vis", new h.default({
                    model: this.msa.seqs,
                    g: this.msa.g
                })), this.addView("50_color", new d.default({
                    model: this.msa.seqs,
                    g: this.msa.g
                })), this.addView("70_extra", new v.default({
                    model: this.msa.seqs,
                    g: this.msa.g,
                    msa: this.msa
                })), this.addView("80_export", new y.default({
                    model: this.msa.seqs,
                    g: this.msa.g,
                    msa: this.msa
                })), this.addView("90_help", new x.default({
                    g: this.msa.g
                })), this.msa.g.config.get("debug")) return this.addView("95_debug", new S.default({
                    g: this.msa.g
                }))
            },
            render: function() {
                return this.renderSubviews(), this.el.setAttribute("class", "smenubar"), this.el.appendChild(document.createElement("p"))
            }
        });
    e.default = M
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(103);
    Object.defineProperty(e, "defaultmenu", {
        enumerable: !0,
        get: function() {
            return r(i).default
        }
    });
    var o = n(6);
    Object.defineProperty(e, "menubuilder", {
        enumerable: !0,
        get: function() {
            return r(o).default
        }
    })
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(5),
        i = n(2),
        o = i.extend({
            initialize: function(t) {
                this._nodes = [], this.name = t.name || "", this.el.className += "smenubar"
            },
            render: function() {
                for (var t = this.el.firstChild; t;) this.el.removeChild(t), t = this.el.firstChild;
                this.el.appendChild(this.buildDOM())
            },
            setName: function(t) {
                this.name = t
            },
            addNode: function(t, e, n) {
                var r = void 0;
                null != n && (r = n.style), null == this._nodes && (this._nodes = []), this._nodes.push({
                    label: t,
                    callback: e,
                    style: r
                })
            },
            getNode: function(t) {
                var e = void 0;
                return this._nodes.forEach(function(n) {
                    n.label === t && (e = n)
                }), e
            },
            modifyNode: function(t, e, n) {
                var r = this.getNode(t);
                r.callback = e || r.callback, n = n || {}, r.style = n.style || r.style
            },
            renameNode: function(t, e) {
                var n = this.getNode(t);
                n.label = e || n.label
            },
            removeNode: function(t) {
                var e = this.getNode(t);
                this._nodes.splice(this._nodes.indexOf(e), 1)
            },
            removeAllNodes: function() {
                this._nodes = []
            },
            buildDOM: function() {
                var t = document.createElement("span");
                return t.appendChild(this._buildM({
                    nodes: this._nodes,
                    name: this.name
                })), t
            },
            _buildM: function(t) {
                var e = void 0,
                    n = void 0,
                    i = void 0,
                    o = void 0,
                    s = void 0,
                    a = void 0,
                    u = void 0,
                    l = t.nodes,
                    c = t.name,
                    h = document.createElement("div");
                h.className = "smenu-dropdown smenu-dropdown-tip", h.style.display = "none";
                var f = document.createElement("ul");
                f.className = "smenu-dropdown-menu";
                for (var d = 0, g = l.length; d < g; d++) {
                    s = l[d], o = document.createElement("li"), o.textContent = s.label, u = s.style;
                    for (i in u) a = u[i], o.style[i] = a;
                    o.addEventListener("click", s.callback), this.trigger("new:node", o), f.appendChild(o)
                }
                return this.trigger("new:menu", f), h.appendChild(f), e = document.createElement("a"), e.textContent = c, e.className = "smenubar_alink", this.trigger("new:button", e), r(e).on("click", function(t) {
                    return function(n) {
                        return t._showMenu(n, h, e), window.setTimeout(function() {
                            return r(document.body).one("click", function(t) {
                                return h.style.display = "none"
                            })
                        }, 5)
                    }
                }(this)), n = document.createDocumentFragment(), n.appendChild(h), n.appendChild(e), n
            },
            _showMenu: function(t, e, n) {
                var r = void 0;
                e.style.display = "block", e.style.position = "absolute", r = n.getBoundingClientRect()
            }
        });
    e.default = o
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(1).Model,
        i = r.extend({
            constructor: function(t, e) {
                return "small" == t && (t = this.small), r.apply(this, [t])
            },
            small: {
                menuFontsize: "12px"
            },
            defaults: {
                menuFontsize: "14px",
                menuItemFontsize: "14px",
                menuItemLineHeight: "14px",
                menuMarginLeft: "3px",
                menuPadding: "3px 4px 3px 4px"
            }
        });
    e.default = i
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = n(7),
        a = o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.el.style.display = "inline-block", this.listenTo(this.g.colorscheme, "change", function() {
                    return this.render()
                })
            },
            render: function() {
                var t = this.setName("Color scheme");
                this.removeAllNodes();
                for (var e, n = this.getColorschemes(), r = 0; r < n.length; r++) e = n[r], this.addScheme(t, e);
                return this.grey(t), s.removeAllChilds(this.el), this.el.appendChild(this.buildDOM()), this
            },
            addScheme: function(t, e) {
                var n = this,
                    r = {};
                return this.g.colorscheme.get("scheme") === e.id && (r.backgroundColor = "#77ED80"), this.addNode(e.name, function() {
                    n.g.colorscheme.set("scheme", e.id)
                }, {
                    style: r
                })
            },
            getColorschemes: function() {
                var t = [];
                return t.push({
                    name: "Taylor",
                    id: "taylor"
                }), t.push({
                    name: "Buried",
                    id: "buried"
                }), t.push({
                    name: "Cinema",
                    id: "cinema"
                }), t.push({
                    name: "Clustal",
                    id: "clustal"
                }), t.push({
                    name: "Clustal2",
                    id: "clustal2"
                }), t.push({
                    name: "Helix",
                    id: "helix"
                }), t.push({
                    name: "Hydrophobicity",
                    id: "hydro"
                }), t.push({
                    name: "Lesk",
                    id: "lesk"
                }), t.push({
                    name: "MAE",
                    id: "mae"
                }), t.push({
                    name: "Nucleotide",
                    id: "nucleotide"
                }), t.push({
                    name: "Purine",
                    id: "purine"
                }), t.push({
                    name: "PID",
                    id: "pid"
                }), t.push({
                    name: "Strand",
                    id: "strand"
                }), t.push({
                    name: "Turn",
                    id: "turn"
                }), t.push({
                    name: "Zappo",
                    id: "zappo"
                }), t.push({
                    name: "No color",
                    id: "foo"
                }), t
            },
            grey: function(t) {}
        });
    e.default = a
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.el.style.display = "inline-block"
            },
            render: function() {
                var t = this;
                return this.setName("Debug"), this.addNode("Get the code", function() {
                    return window.open("https://github.com/wilzbach/msa")
                }), this.addNode("Toggle mouseover events", function() {
                    return t.g.config.set("registerMouseHover", !t.g.config.get("registerMouseHover")), t.g.onAll(function() {
                        return console.log(arguments)
                    })
                }), this.addNode("Minimized width", function() {
                    return t.g.zoomer.set("alignmentWidth", 600)
                }), this.addNode("Minimized height", function() {
                    return t.g.zoomer.set("alignmentHeight", 120)
                }), this.el.appendChild(this.buildDOM()), this
            }
        });
    e.default = s
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = n(19),
        a = r(s),
        u = n(12),
        l = (u.fasta.write, "↪"),
        c = o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.msa = t.msa, this.el.style.display = "inline-block"
            },
            render: function() {
                var t = this;
                return this.setName("Export"), this.addNode("Share view (URL)" + l, function() {
                    return a.default.shareLink(t.msa, function(t) {
                        return window.open(t, "_blank")
                    })
                }), this.addNode("View in Jalview", function() {
                    var e = t.g.config.get("url");
                    return "undefined" == typeof e || null === e ? alert("Sequence weren't imported via an URL") : e.indexOf("localhost") ? a.default.publishWeb(t.msa, function(e) {
                        return a.default.openInJalview(e, t.g.colorscheme.get("scheme"))
                    }) : a.default.openInJalview(e, t.g.colorscheme.get("scheme"))
                }), this.addNode("Export alignment (FASTA)", function() {
                    return a.default.saveAsFile(t.msa, "all.fasta")
                }), this.addNode("Export alignment (URL)", function() {
                    return a.default.publishWeb(t.msa, function(t) {
                        return window.open(t, "_blank")
                    })
                }), this.addNode("Export selected sequences (FASTA)", function() {
                    return a.default.saveSelection(t.msa, "selection.fasta")
                }), this.addNode("Export features (GFF)", function() {
                    return a.default.saveAnnots(t.msa, "features.gff3")
                }), this.addNode("Export MSA image (PNG)", function() {
                    return a.default.saveAsImg(t.msa, "biojs-msa.png")
                }), this.el.appendChild(this.buildDOM()), this
            }
        });
    e.default = c
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = n(37),
        a = r(s),
        u = n(21),
        l = (r(u), n(24), o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.el.style.display = "inline-block", this.msa = t.msa
            },
            render: function() {
                var t = this;
                this.setName("Extras");
                var e = this.g.stats;
                return this.msa, this.addNode("Add consensus seq", function() {
                    var n = e.consensus(),
                        r = new a.default({
                            seq: n,
                            id: "0c",
                            name: "Consenus"
                        });
                    return t.model.add(r), t.model.setRef(r), t.model.comparator = function(t) {
                        return !t.get("ref")
                    }, t.model.sort()
                }), this.addNode("Jump to a column", function() {
                    var e = prompt("Column", "20");
                    return e < 0 || e > t.model.getMaxLength() || isNaN(e) ? void alert("invalid column") : t.g.zoomer.setLeftOffset(e)
                }), this.el.appendChild(this.buildDOM()), this
            }
        }));
    e.default = l
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.el.style.display = "inline-block"
            },
            render: function() {
                var t = this;
                return this.setName("Filter"), this.addNode("Hide columns by threshold", function(e) {
                    var n = prompt("Enter threshold (in percent)", 20);
                    n /= 100;
                    for (var r = t.model.getMaxLength(), i = [], o = t.g.stats.scale(t.g.stats.conservation()), s = r - 1, a = 0; a <= s; a++) o[a] < n && i.push(a);
                    return t.g.columns.set("hidden", i)
                }), this.addNode("Hide columns by selection", function() {
                    var e = t.g.columns.get("hidden"),
                        n = e.concat(t.g.selcol.getAllColumnBlocks({
                            maxLen: t.model.getMaxLength(),
                            withPos: !0
                        }));
                    return t.g.selcol.reset([]), t.g.columns.set("hidden", n)
                }), this.addNode("Hide columns by gaps", function() {
                    var e = prompt("Enter threshold (in percent)", 20);
                    e /= 100;
                    for (var n = t.model.getMaxLength(), r = [], i = n - 1, o = function(n) {
                        var i = 0,
                            o = 0;
                        t.model.each(function(t) {
                            return "-" === t.get("seq")[n] && i++, o++
                        }), i / o > e && r.push(n)
                    }, s = 0; s <= i; s++) o(s);
                    return t.g.columns.set("hidden", r)
                }), this.addNode("Hide seqs by identity", function() {
                    var e = prompt("Enter threshold (in percent)", 20);
                    return e /= 100, t.model.each(function(t) {
                        if (t.get("identity") < e) return t.set("hidden", !0)
                    })
                }), this.addNode("Hide seqs by selection", function() {
                    var e = t.g.selcol.where({
                            type: "row"
                        }),
                        n = e.map(function(t) {
                            return t.get("seqId")
                        });
                    return t.g.selcol.reset([]), t.model.each(function(t) {
                        if (n.indexOf(t.get("id")) >= 0) return t.set("hidden", !0)
                    })
                }), this.addNode("Hide seqs by gaps", function() {
                    var e = prompt("Enter threshold (in percent)", 40);
                    return t.model.each(function(t, n) {
                        if (t.get("seq").reduce(function(t, e) {
                            return "-" === e ? ++t : void 0
                        }, 0) > e) return t.set("hidden", !0)
                    })
                }), this.addNode("Reset", function() {
                    return t.g.columns.set("hidden", []), t.model.each(function(t) {
                        if (t.get("hidden")) return t.set("hidden", !1)
                    })
                }), this.el.appendChild(this.buildDOM()), this
            }
        });
    e.default = s
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = o.default.extend({
            initialize: function(t) {
                return this.g = t.g
            },
            render: function() {
                return this.setName("Help"), this.addNode("About the project", function() {
                    return window.open("https://github.com/wilzbach/msa")
                }), this.addNode("Report issues", function() {
                    return window.open("https://github.com/wilzbach/msa/issues")
                }), this.addNode("User manual", function() {
                    return window.open("https://github.com/wilzbach/msa/wiki/User-manual")
                }), this.el.style.display = "inline-block", this.el.appendChild(this.buildDOM()), this
            }
        });
    e.default = s
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = n(17),
        a = o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.el.style.display = "inline-block", this.msa = t.msa
            },
            render: function() {
                var t = this,
                    e = this.msa,
                    n = s.mk("input");
                n.type = "file", n.style.display = "none", n.multiple = !0, n.addEventListener("change", function() {
                    var t = n.files || [];
                    return e.u.file.importFiles(t)
                }), this.el.appendChild(n);
                var r = "(Fasta, Clustal, GFF, Jalview features, Newick)";
                return this.setName("Import"), this.addNode("URL", function(e) {
                    var n = prompt("URL " + r, "http://rostlab.org/~goldberg/clustalw2-I20140818-215249-0556-53699878-pg.clustalw");
                    if (n.length > 5) return t.msa.u.file.importURL(n, function() {})
                }), this.addNode("From file " + r, function() {
                    return n.click()
                }), this.addNode("Drag & Drop", function() {
                    return alert("Yep. Just drag & drop your file " + r)
                }), this.el.appendChild(this.buildDOM()), this
            }
        });
    e.default = a
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = n(7),
        a = "↑",
        u = "↓",
        l = o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.order = "ID", this.el.style.display = "inline-block"
            },
            setOrder: function(t) {
                return this.order = t, this.render()
            },
            render: function() {
                this.setName("Sorting"), this.removeAllNodes();
                for (var t, e = this.getComparators(), n = 0; n < e.length; n++) t = e[n], this._addNode(t);
                var r = this.buildDOM();
                return s.removeAllChilds(this.el), this.el.appendChild(r), this
            },
            _addNode: function(t) {
                var e = this,
                    n = t.text,
                    r = {};
                return n === this.order && (r.backgroundColor = "#77ED80"), this.addNode(n, function() {
                    return null != t.precode && t.precode(), e.model.comparator = t.comparator, e.model.sort(), e.setOrder(t.text)
                }, {
                    style: r
                })
            },
            getComparators: function() {
                var t = this,
                    e = [];
                e.push({
                    text: "ID " + a,
                    comparator: "id"
                }), e.push({
                    text: "ID " + u,
                    comparator: function(t, e) {
                        return -("" + t.get("id")).localeCompare("" + e.get("id"), [], {
                            numeric: !0
                        })
                    }
                }), e.push({
                    text: "Label " + a,
                    comparator: "name"
                }), e.push({
                    text: "Label " + u,
                    comparator: function(t, e) {
                        return -t.get("name").localeCompare(e.get("name"))
                    }
                }), e.push({
                    text: "Seq " + a,
                    comparator: "seq"
                }), e.push({
                    text: "Seq " + u,
                    comparator: function(t, e) {
                        return -t.get("seq").localeCompare(e.get("seq"))
                    }
                });
                var n = function() {
                        return t.ident = t.g.stats.identity()
                    },
                    r = function() {
                        return t.gaps = {}, t.model.each(function(e) {
                            var n = e.attributes.seq;
                            return t.gaps[e.id] = (n.reduce(function(t, e) {
                                return "-" === e ? ++t : void 0
                            }), 0 / n.length)
                        })
                    };
                return e.push({
                    text: "Identity " + a,
                    comparator: function(e, n) {
                        var r = t.ident[e.id] - t.ident[n.id];
                        return r > 0 ? 1 : r < 0 ? -1 : 0
                    },
                    precode: n
                }), e.push({
                    text: "Identity " + u,
                    comparator: function(e, n) {
                        var r = t.ident[e.id] - t.ident[n.id];
                        return r > 0 ? -1 : r < 0 ? 1 : 0
                    },
                    precode: n
                }), e.push({
                    text: "Gaps " + a,
                    comparator: function(e, n) {
                        var r = t.gaps[e.id] - t.gaps[n.id];
                        return r > 0 ? 1 : r < 0 ? -1 : 0
                    },
                    precode: r
                }), e.push({
                    text: "Gaps " + u,
                    comparator: function(e, n) {
                        var r = t.gaps[e.id] - t.gaps[n.id];
                        return r < 0 ? 1 : r > 0 ? -1 : 0
                    },
                    precode: r
                }), e.push({
                    text: "Consensus to top",
                    comparator: function(t) {
                        return !t.get("ref")
                    }
                }), e
            }
        });
    e.default = l
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.el.style.display = "inline-block"
            },
            render: function() {
                var t = this;
                return this.setName("Selection"), this.addNode("Find Motif (supports RegEx)", function() {
                    var e = prompt("your search", "D");
                    return t.g.user.set("searchText", e)
                }), this.addNode("Invert columns", function() {
                    return t.g.selcol.invertCol(function() {
                        var e = [],
                            n = t.model.getMaxLength(),
                            r = 0;
                        if (0 <= n)
                            for (; r <= n;) e.push(r++);
                        else
                            for (; r >= n;) e.push(r--);
                        return e
                    }())
                }), this.addNode("Invert rows", function() {
                    return t.g.selcol.invertRow(t.model.pluck("id"))
                }), this.addNode("Reset", function() {
                    return t.g.selcol.reset()
                }), this.el.appendChild(this.buildDOM()), this
            }
        });
    e.default = s
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(6),
        o = r(i),
        s = n(7),
        a = o.default.extend({
            initialize: function(t) {
                return this.g = t.g, this.el.style.display = "inline-block", this.listenTo(this.g.vis, "change", this.render)
            },
            render: function() {
                var t = this;
                this.removeAllNodes(), this.setName("Vis.elements");
                for (var e, n = this.getVisElements(), r = 0; r < n.length; r++) e = n[r], this._addVisEl(e);
                return this.addNode("Reset", function() {
                    return t.g.vis.set("labels", !0), t.g.vis.set("sequences", !0), t.g.vis.set("metacell", !0), t.g.vis.set("conserv", !0), t.g.vis.set("labelId", !0), t.g.vis.set("labelName", !0), t.g.vis.set("labelCheckbox", !1), t.g.vis.set("seqlogo", !1), t.g.vis.set("gapHeader", !1), t.g.vis.set("leftHeader", !0), t.g.vis.set("metaGaps", !0), t.g.vis.set("metaIdentity", !0), t.g.vis.set("metaLinks", !0)
                }), s.removeAllChilds(this.el), this.el.appendChild(this.buildDOM()), this
            },
            _addVisEl: function(t) {
                var e = this,
                    n = {};
                if (this.g.vis.get(t.id)) {
                    var r = "Hide ";
                    n.color = "red"
                } else r = "Show ", n.color = "green";
                return this.addNode(r + t.name, function() {
                    return e.g.vis.set(t.id, !e.g.vis.get(t.id))
                }, {
                    style: n
                })
            },
            getVisElements: function() {
                var t = [];
                return t.push({
                    name: "residues indices",
                    id: "markers"
                }), t.push({
                    name: "ID/Label",
                    id: "labels"
                }), t.push({
                    name: "meta info (Gaps/Ident)",
                    id: "metacell"
                }), t.push({
                    name: "overview panel",
                    id: "overviewbox"
                }), t.push({
                    name: "sequence logo",
                    id: "seqlogo"
                }), t.push({
                    name: "gap weights",
                    id: "gapHeader"
                }), t.push({
                    name: "conservation weights",
                    id: "conserv"
                }), t.push({
                    name: "scale slider",
                    id: "scaleslider"
                }), t.push({
                    name: "Label",
                    id: "labelName"
                }), t.push({
                    name: "ID",
                    id: "labelId"
                }), t.push({
                    name: "gaps %",
                    id: "metaGaps"
                }), t.push({
                    name: "identity score",
                    id: "metaIdentity"
                }), t
            }
        });
    e.default = a
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(36),
        o = r(i),
        s = n(27),
        a = r(s),
        u = n(28),
        l = r(u),
        c = n(29),
        h = r(c),
        f = n(30),
        d = r(f),
        g = n(9),
        p = r(g),
        m = n(31),
        v = r(m),
        _ = n(33),
        y = r(_),
        b = n(32),
        x = r(b),
        w = n(34),
        S = r(w),
        z = n(26),
        k = r(z),
        C = n(122),
        M = r(C),
        j = n(20),
        E = r(j),
        O = n(41),
        T = r(O),
        A = n(22),
        L = r(A),
        R = n(4),
        q = n(16),
        N = n(42),
        I = n(5),
        P = R.extend({
            initialize: function(t) {
                var e = this;
                if ("undefined" != typeof t && null !== t || (t = {}), null == t.colorscheme && (t.colorscheme = {}), null == t.columns && (t.columns = {}), null == t.conf && (t.conf = {}), null == t.vis && (t.vis = {}), null == t.visorder && (t.visorder = {}), null == t.zoomer && (t.zoomer = {}), null == t.conserv && (t.conserv = {}), null == t.scale && (t.scale = {}), this.g = q.mixin({}), this.seqs = this.g.seqs = new o.default(t.seqs, this.g), this.g.config = new h.default(t.conf), this.g.package = new d.default(this.g), this.g.selcol = new p.default([], {
                    g: this.g
                }), this.g.user = new v.default, this.g.vis = new y.default(t.vis, {
                    model: this.seqs
                }), this.g.visorder = new x.default(t.visorder), this.g.zoomer = new S.default(t.zoomer, {
                    g: this.g,
                    model: this.seqs
                }), this.g.scale = new k.default(t.scale, {
                    g: this.g
                }), this.g.conservationConfig = t.conserv, "localhost" === window.location.hostname && this.g.config.set("debug", !0), this._loadSeqs(t), this.u = {}, this.u.file = new E.default(this), this.u.proxy = new L.default({
                    g: this.g
                }), this.u.tree = new T.default(this), this.g.config.get("eventBus") === !0 && this.startEventBus(), this.g.config.get("dropImport")) {
                    var n = {
                        dragover: this.dragOver,
                        drop: this.dropFile
                    };
                    this.delegateEvents(n)
                }
                return t.importURL && this.u.file.importURL(t.importURL, function() {
                    return e.render()
                }), t.bootstrapMenu && (t.menu && (this.menuConfig = t.menu), this.g.config.set("bootstrapMenu", !0)), this.draw(), this.m()
            },
            _loadSeqs: function(t) {
                var e = this.seqs.pluck("seq");
                return this.g.stats = new N(this.seqs, {
                    useGaps: !0
                }), this.g.stats.alphabetSize = this.g.config.get("alphabetSize"), this.g.columns = new l.default(t.columns, this.g.stats), this.g.colorscheme = new a.default(t.colorscheme, e, this.g.stats), this.g.zoomer.setEl(this.el, this.seqs)
            },
            importURL: function() {
                return this.u.file.importURL.apply(this.u.file, arguments)
            },
            m: function t() {
                var t = {};
                return t.model = n(51), t.selection = n(8), t.selcol = n(9), t.view = n(2), t.boneView = n(4), this.m = t
            },
            draw: function() {
                var t = this;
                if (this.removeViews(), this.addView("stage", new M.default({
                    model: this.seqs,
                    g: this.g
                })), this.$el.addClass("biojs_msa_div"), this.g.config.get("bootstrapMenu")) {
                    var e = document.createElement("div"),
                        n = document.createElement("div");
                    this.el.parentNode ? (this.el.parentNode.replaceChild(n, this.el), n.appendChild(e), n.appendChild(this.el)) : (n.appendChild(e), n.appendChild(this.el));
                    var r = {
                        el: e,
                        msa: this
                    };
                    this.menuConfig && (r.menu = this.menuConfig), new msa.menu.defaultmenu(r).render()
                }
                return I(window).on("resize", function(e) {
                    var n = function() {
                        return this.g.zoomer.autoResize()
                    };
                    return setTimeout(n.bind(t), 5)
                })
            },
            dragOver: function(t) {
                return t.preventDefault(), t.target.className = "hover", !1
            },
            dropFile: function(t) {
                t.preventDefault();
                var e = t.target.files || t.dataTransfer.files;
                return this.u.file.importFiles(e), !1
            },
            startEventBus: function() {
                var t = this,
                    e = ["config", "columns", "colorscheme", "selcol", "vis", "visorder", "zoomer"];
                return function() {
                    for (var n, r = [], i = 0; i < e.length; i++) n = e[i], r.push(t._proxyToG(n));
                    return r
                }()
            },
            _proxyToG: function(t) {
                return this.listenTo(this.g[t], "all", function(e, n, r, i) {
                    if ("change" !== e) return "undefined" != typeof i && null !== i ? this.g.trigger(t + ":" + e, r, n, i) : this.g.trigger(t + ":" + e, r, n)
                })
            },
            render: function() {
                return void 0 === this.seqs || 0 === this.seqs.length, this.renderSubviews(), this.g.vis.set("loaded", !0), this
            }
        });
    e.default = P
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(126),
        o = r(i),
        s = n(135),
        a = r(s),
        u = n(4),
        l = u.extend({
            initialize: function(t) {
                this.g = t.g;
                var e = new a.default({
                    model: this.model,
                    g: this.g
                });
                if (e.ordering = -1, this.addView("labelblock", e), this.g.vis.get("sequences")) {
                    var n = new o.default({
                        model: this.model,
                        g: this.g
                    });
                    n.ordering = 0, this.addView("seqblock", n)
                }
                return this.listenTo(this.g.zoomer, "change:alignmentHeight", this.adjustHeight), this.listenTo(this.g.zoomer, "change:alignmentWidth", this.adjustWidth), this.listenTo(this.g.columns, "change:hidden", this.adjustHeight), this
            },
            render: function() {
                return this.renderSubviews(), this.el.className = "biojs_msa_albody", this.el.style.whiteSpace = "nowrap", this.adjustHeight(), this.adjustWidth(), this
            },
            adjustHeight: function() {
                return "auto" === this.g.zoomer.get("alignmentHeight") ? this.el.style.height = this.g.zoomer.get("rowHeight") * this.model.length + 5 : this.el.style.height = this.g.zoomer.get("alignmentHeight")
            },
            adjustWidth: function() {
                return this.el.style.width = this.getWidth()
            },
            getWidth: function() {
                var t = 0;
                return t += this.g.zoomer.getLeftBlockWidth(), this.g.vis.get("sequences") && (t += this.g.zoomer.get("alignmentWidth")), t
            }
        });
    e.default = l
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(8),
        i = n(2),
        o = n(48),
        s = n(5),
        a = i.extend({
            className: "biojs_msa_overviewbox",
            tagName: "canvas",
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.zoomer, "change:boxRectWidth change:boxRectHeight change:overviewboxPaddingTop", this.rerender), this.listenTo(this.g.zoomer, "change:alignmentHeight change:alignmentWidth", this.rerender), this.listenTo(this.g.zoomer, "change:overviewboxWidth change:overviewboxHeight", this.rerender), this.listenTo(this.g.selcol, "add reset change", this.rerender), this.listenTo(this.g.columns, "change:hidden", this.rerender), this.listenTo(this.g.colorscheme, "change:showLowerCase", this.rerender), this.listenTo(this.model, "change", _.debounce(this.rerender, 5)), this.color = this.g.colorscheme.getSelectedScheme(), this.listenTo(this.g.colorscheme, "change:scheme", function() {
                    return this.color = this.g.colorscheme.getSelectedScheme(), this.rerender()
                }), this.dragStart = []
            },
            events: {
                click: "_onclick",
                mousedown: "_onmousedown"
            },
            rerender: function() {
                if (!this.g.config.get("manualRendering")) return this.render()
            },
            render: function() {
                this._createCanvas(), this.el.textContent = "overview", this.el.style.marginTop = this.g.zoomer.get("overviewboxPaddingTop"), this.ctx.fillStyle = "#999999", this.ctx.fillRect(0, 0, this.el.width, this.el.height);
                for (var t = this.model.length, e = this.g.columns.get("hidden"), n = this.g.colorscheme.get("showLowerCase"), r = -this.coords.boxes_size.y, i = 0; i < this.coords.boxes.y; i++) {
                    for (var o = [], s = [], a = Math.floor(i * this.coords.resid_per_box.y); a < Math.floor((i + 1) * this.coords.resid_per_box.y) && a < t; a++) this.model.at(a) && (o.push(this.model.at(a).get("seq")), s.push(this.model.at(a).get("hidden")));
                    var u = 0;
                    r += this.coords.boxes_size.y;
                    for (var l = 0; l < this.coords.boxes.x; l++) {
                        for (var c = [], h = 0; h < o.length; h++)
                            for (var f = Math.floor(l * this.coords.resid_per_box.x); f < Math.floor((l + 1) * this.coords.resid_per_box.x) && f < o[h].length; f++)
                                if (s[h]) c.push("grey");
                                else {
                                    var d = o[h][f];
                                    n && (d = d.toUpperCase());
                                    var g = this.color.getColor(d, {
                                        pos: f
                                    });
                                    e.indexOf(f) >= 0 && (g = "grey"), "undefined" != typeof g && null !== g && c.push(g)
                                } 0 !== c.length && (this.ctx.fillStyle = this._mode(c), this.ctx.fillRect(u, r, this.coords.boxes_size.x, this.coords.boxes_size.y)), u += this.coords.boxes_size.x
                    }
                }
                return this._drawSelection()
            },
            coords: {
                screen_to_model: function(t, e) {
                    var n = t * this.resid_per_box[e] / this.boxes_size[e];
                    return Math.floor(n)
                },
                model_to_screen: function(t, e) {
                    return Math.floor(t * this.boxes_size[e] / this.resid_per_box[e])
                },
                updatecoords_transform: function(t) {
                    var e = t.g.zoomer.get("boxRectHeight"),
                        n = t.g.zoomer.get("boxRectWidth"),
                        r = t.g.zoomer.get("overviewboxWidth"),
                        i = t.g.zoomer.get("overviewboxHeight"),
                        o = "fixed" === r ? t.model.getMaxLength() * n : Math.min(t.g.zoomer.get("alignmentWidth") + t.g.zoomer.getLeftBlockWidth(), t.model.getMaxLength() * n),
                        s = "fixed" === i ? t.model.length * e : Math.min(isNaN(parseInt(i, 10)) ? 1e10 : parseInt(i, 10), t.model.length * e);
                    this.container_size = {
                        x: o,
                        y: s
                    }, this.boxes_size = {
                        x: n,
                        y: e
                    }, this.resid_per_box = {
                        x: Math.max(1, t.model.getMaxLength() / o * n),
                        y: Math.max(1, t.model.length / s * e)
                    }, this.boxes = {
                        x: Math.ceil(o / n),
                        y: Math.ceil(s / e)
                    }
                }
            },
            _mode: function(t) {
                return t.sort(function(e, n) {
                    return t.filter(function(t) {
                        return t === e
                    }).length - t.filter(function(t) {
                        return t === n
                    }).length
                }).pop()
            },
            _drawSelection: function() {
                var t = this;
                if (!(this.dragStart.length > 0) || this.prolongSelection) {
                    this.ctx.fillStyle = "#666666", this.ctx.globalAlpha = .9;
                    for (var e = this.g.selcol.length, n = function(e) {
                        var n = t.g.selcol.at(e);
                        if (!n) return "continue";
                        var r = void 0,
                            i = void 0;
                        "column" === n.get("type") ? t.ctx.fillRect(t.coords.boxes_size.x * n.get("xStart"), 0, t.coords.boxes_size.x * (n.get("xEnd") - n.get("xStart") + 1), t.coords.container_size.y) : "row" === n.get("type") ? (r = t.model.filter(function(t) {
                            return t.get("id") === n.get("seqId")
                        })[0], i = t.model.indexOf(r), t.ctx.fillRect(0, t.coords.model_to_screen(i, "y"), t.coords.model_to_screen(r.get("seq").length, "x"), t.coords.boxes_size.y)) : "pos" === n.get("type") && (r = t.model.filter(function(t) {
                            return t.get("id") === n.get("seqId")
                        })[0], i = t.model.indexOf(r), t.ctx.fillRect(t.coords.model_to_screen(n.get("xStart"), "x"), t.coords.model_to_screen(i, "y"), t.coords.model_to_screen(n.get("xEnd") - n.get("xStart") + 1, "x"), t.coords.boxes_size.y))
                    }, r = 0; r < e; r++) n(r);
                    return this.ctx.globalAlpha = 1
                }
            },
            _onclick: function(t) {
                return this.g.trigger("meta:click", {
                    seqId: this.model.get("id", {
                        evt: t
                    })
                })
            },
            _onmousemove: function(t) {
                if (0 !== this.dragStart.length) {
                    this.render(), this.ctx.fillStyle = "#666666", this.ctx.globalAlpha = .9;
                    var e = this._calcSelection(o.abs(t));
                    return this.ctx.fillRect(e[0][0], e[1][0], e[0][1] - e[0][0], e[1][1] - e[1][0]), t.preventDefault(), t.stopPropagation()
                }
            },
            _onmousedown: function(t) {
                var e = this;
                return this.dragStart = o.abs(t), this.dragStartRel = o.rel(t), t.ctrlKey || t.metaKey ? this.prolongSelection = !0 : this.prolongSelection = !1, s(document.body).on("mousemove.overmove", function(t) {
                    return e._onmousemove(t)
                }), s(document.body).on("mouseup.overup", function(t) {
                    return e._onmouseup(t)
                }), this.dragStart
            },
            _calcSelection: function(t) {
                for (var e = [t[0] - this.dragStart[0], t[1] - this.dragStart[1]], n = 0; n <= 1; n++) e[n] = this.dragStartRel[n] + e[n];
                for (var r = [
                    [this.dragStartRel[0], e[0]],
                    [this.dragStartRel[1], e[1]]
                ], i = 0; i <= 1; i++) r[i][1] < r[i][0] && (r[i] = [r[i][1], r[i][0]]), r[i][0] = Math.max(r[i][0], 0);
                return r
            },
            _endSelection: function(t) {
                if (s(document.body).off(".overmove"), s(document.body).off(".overup"), 0 !== this.dragStart.length) {
                    for (var e = this._calcSelection(t), n = 0; n <= 1; n++) e[0][n] = this.coords.screen_to_model(e[0][n], "x");
                    for (var n = 0; n <= 1; n++) e[1][n] = this.coords.screen_to_model(e[1][n], "y");
                    e[0][1] = Math.min(this.model.getMaxLength() - 1, e[0][1]), e[1][1] = Math.min(this.model.length - 1, e[1][1]);
                    for (var i = [], o = e[1][0]; o <= e[1][1]; o++) {
                        var a = {
                            seqId: this.model.at(o).get("id"),
                            xStart: e[0][0],
                            xEnd: e[0][1]
                        };
                        i.push(new r.possel(a))
                    }
                    return this.dragStart = [], this.prolongSelection ? this.g.selcol.add(i) : this.g.selcol.reset(i), this.g.zoomer.setLeftOffset(e[0][0]), this.g.zoomer.setTopOffset(e[1][0])
                }
            },
            _onmouseup: function(t) {
                return this._endSelection(o.abs(t))
            },
            _onmouseout: function(t) {
                return this._endSelection(o.abs(t))
            },
            _createCanvas: function() {
                return this.coords.updatecoords_transform(this), this.el.height = this.coords.container_size.y, this.el.width = this.coords.container_size.x, this.ctx = this.el.getContext("2d"), this.el.style.overflow = "auto", this.el.style.cursor = "crosshair"
            }
        });
    e.default = a
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(3),
        i = n(2),
        o = n(5),
        s = i.extend({
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.zoomer, "change:columnWidth", this.render), this.toggleClass = "msa-hide", this.isVisible = !0, this
            },
            attributes: {
                class: "biojs_msa_scale"
            },
            events: {
                "change input": "updateSlider",
                "click button.msa-btn-close": "hide",
                "click button.msa-btn-open": "show",
                "click button[data-action]": "clickButton"
            },
            template: (0, r.template)('\t<div class="msa-scale-minimised">\t  <button class="btn msa-btn msa-btn-open">Zoom</button>\t</div>\t<div class="msa-scale-maximised">\t  <button class="btn msa-btn msa-btn-close" style="float:right">&times; close</button>\t  <div>\t  <input type="range" \t    data-provide="slider" \t    min="<%= min %>" \t    max="<%= max %>" \t    step="<%= step %>" \t    value="<%= value %>" \t  >\t  </div>\t  <div class="btngroup msa-btngroup">\t    <button class="btn msa-btn" data-action="smaller"><span class="glyphicon-zoom-out"></span>-</button>\t    <button class="btn msa-btn" data-action="bigger"><span class="glyphicon-zoom-in"></span>+</button>\t    <button class="btn msa-btn" data-action="reset"><span class="glyphicon-repeat"></span>reset</button>\t  </div>\t</div>\t'),
            render: function() {
                var t = this.model.getSizeRange(),
                    e = {
                        value: this.model.getSize(),
                        min: t[0],
                        max: t[1],
                        step: this.model.step || 1
                    };
                return this.$el.html(this.template(e)), this.isVisible ? this.show() : this.hide(), this
            },
            updateSlider: function(t) {
                var e = t.target,
                    n = parseInt(o(e).val());
                this.model.setSize(n)
            },
            clickButton: function(t) {
                var e = t.target,
                    n = o(e).data("action");
                return this.model[n], "function" == typeof this.model[n] && this.model[n](), this
            },
            hide: function() {
                this.isVisible = !1, this.$el.find(".msa-scale-minimised").removeClass(this.toggleClass), this.$el.find(".msa-scale-maximised").addClass(this.toggleClass)
            },
            show: function() {
                this.isVisible = !1, this.$el.find(".msa-scale-minimised").addClass(this.toggleClass), this.$el.find(".msa-scale-maximised").removeClass(this.toggleClass)
            }
        });
    e.default = s
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(8),
        i = n(4),
        o = n(17),
        s = (n(7), i.extend({
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.user, "change:searchText", function(t, e) {
                    return this.search(e), this.render()
                }), this.sel = [], this.selPos = 0
            },
            events: {
                scroll: "_sendScrollEvent"
            },
            render: function() {
                this.renderSubviews(), this.el.className = "biojs_msa_searchresult";
                var t = this.g.user.get("searchText");
                return "undefined" != typeof t && null !== t && t.length > 0 && (0 === this.sel.length ? this.el.textContent = "no selection found" : (this.resultBox = o.mk("div"), this.resultBox.className = "biojs_msa_searchresult_ovbox", this.updateResult(), this.el.appendChild(this.resultBox), this.el.appendChild(this.buildBtns()))), this
            },
            updateResult: function() {
                var t = "search pattern: " + this.g.user.get("searchText");
                t += ", selection: " + (this.selPos + 1);
                var e = this.sel[this.selPos];
                return t += " (", t += e.get("xStart") + " - " + e.get("xEnd"), t += ", id: " + e.get("seqId"), t += ")", this.resultBox.textContent = t
            },
            buildBtns: function() {
                var t = this,
                    e = o.mk("button");
                e.textContent = "Prev", e.addEventListener("click", function() {
                    return t.moveSel(-1)
                });
                var n = o.mk("button");
                n.textContent = "Next", n.addEventListener("click", function() {
                    return t.moveSel(1)
                });
                var r = o.mk("button");
                r.textContent = "All", r.addEventListener("click", function() {
                    return t.g.selcol.reset(t.sel)
                });
                var i = o.mk("div");
                return i.appendChild(e), i.appendChild(n), i.appendChild(r), i.className = "biojs_msa_searchresult_row", i
            },
            moveSel: function(t) {
                var e = this.selPos + t;
                return e < 0 || e >= this.sel.length ? -1 : (this.focus(e), this.selPos = e, this.updateResult())
            },
            focus: function(t) {
                var e = this.sel[t],
                    n = e.get("xStart");
                return this.g.zoomer.setLeftOffset(n), this.g.selcol.reset([e])
            },
            search: function t(e) {
                var n, t = new RegExp(e, "gi"),
                    i = [],
                    o = n = 100042;
                return this.model.each(function(e) {
                    var n = e.get("seq");
                    return function() {
                        for (var s, a = []; s = t.exec(n);) {
                            var u = s.index,
                                l = {
                                    xStart: u,
                                    xEnd: u + s[0].length - 1,
                                    seqId: e.get("id")
                                };
                            i.push(new r.possel(l)), a.push(o = Math.min(u, o))
                        }
                        return a
                    }()
                }), this.g.selcol.reset(i), o === n && (o = 0), this.g.zoomer.setLeftOffset(o), this.sel = i
            }
        }));
    e.default = s
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(3),
        o = n(118),
        s = r(o),
        a = n(130),
        u = r(a),
        l = n(119),
        c = r(l),
        h = n(121),
        f = r(h),
        d = n(120),
        g = r(d),
        p = n(4),
        m = p.extend({
            initialize: function(t) {
                return this.g = t.g, this.draw(), this.listenTo(this.g.stats, "reset", function() {
                    return this.rerender()
                }), this.listenTo(this.model, "change:hidden", (0, i.debounce)(this.rerender, 10)), this.listenTo(this.model, "sort", this.rerender), this.listenTo(this.model, "add", function() {
                    return console.log("seq add")
                }), this.listenTo(this.g.vis, "change:sequences", this.rerender), this.listenTo(this.g.vis, "change:overviewbox", this.rerender), this.listenTo(this.g.visorder, "change", this.rerender), this.listenTo(this.g.zoomer, "change:columnWidth", this.rerender), this.listenTo(this.g.vis, "change:scaleslider", this.rerender), this
            },
            draw: function() {
                if (this.removeViews(), this.g.vis.get("overviewbox")) {
                    var t = new c.default({
                        model: this.model,
                        g: this.g
                    });
                    t.ordering = this.g.visorder.get("overviewBox"), this.addView("overviewBox", t)
                }
                var e = new u.default({
                    model: this.model,
                    g: this.g
                });
                e.ordering = this.g.visorder.get("headerBox"), this.addView("headerBox", e);
                var n = new f.default({
                    model: this.model,
                    g: this.g
                });
                n.ordering = this.g.visorder.get("searchBox"), this.addView("searchbox", n);
                var r = new s.default({
                    model: this.model,
                    g: this.g
                });
                if (r.ordering = this.g.visorder.get("alignmentBody"), this.addView("body", r), this.g.vis.get("scaleslider")) {
                    var i = new g.default({
                        model: this.g.scale,
                        g: this.g
                    });
                    i.ordering = this.g.visorder.get("scaleSlider"), this.addView("scaleSlider", i)
                }
                return this
            },
            render: function(t) {
                return this.renderSubviews(), this.el.className = "biojs_msa_stage", this
            },
            rerender: function() {
                if (!this.g.config.get("manualRendering")) return this.draw(), this.render()
            }
        });
    e.default = m
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e
            }
        }(),
        o = (n(16), function() {
            function t(e) {
                r(this, t), this.g = e, this.cache = {}, this.cacheHeight = 0, this.cacheWidth = 0
            }
            return i(t, [{
                key: "getFontTile",
                value: function(t, e, n) {
                    return e === this.cacheWidth && n === this.cacheHeight || (this.cacheHeight = n, this.cacheWidth = e, this.cache = {}), void 0 === this.cache[t] && this.createTile(t, e, n), this.cache[t]
                }
            }, {
                key: "createTile",
                value: function(t, e, n) {
                    var r = this.cache[t] = document.createElement("canvas");
                    return r.width = e, r.height = n, this.ctx = r.getContext("2d"), this.ctx.font = this.g.zoomer.get("residueFont") + "px mono", this.ctx.textBaseline = "middle", this.ctx.textAlign = "center", this.ctx.fillText(t, e / 2, n / 2, e)
                }
            }]), t
        }());
    e.default = o
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(3),
        i = n(16),
        o = {
            setMaxScrollHeight: function() {
                return this.maxScrollHeight = this.g.zoomer.getMaxAlignmentHeight() - this.g.zoomer.get("alignmentHeight")
            },
            setMaxScrollWidth: function() {
                return this.maxScrollWidth = this.g.zoomer.getMaxAlignmentWidth() - this.g.zoomer.getAlignmentWidth()
            }
        },
        s = function(t, e) {
            return this.g = t, this.model = e, this.maxScrollWidth = 0, this.maxScrollHeight = 0, this.setMaxScrollHeight(), this.setMaxScrollWidth(), this.listenTo(this.g.zoomer, "change:rowHeight", this.setMaxScrollHeight), this.listenTo(this.g.zoomer, "change:columnWidth", this.setMaxScrollWidth), this.listenTo(this.g.zoomer, "change:alignmentWidth", this.setMaxScrollWidth), this.listenTo(this.g.zoomer, "change:alignmentHeight", this.setMaxScrollHeight), this.listenTo(this.model, "add change reset", function() {
                return this.setMaxScrollHeight(), this.setMaxScrollWidth()
            }, this), this
        };
    (0, r.extend)(s.prototype, o), i.mixin(s.prototype), e.default = s
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(3),
        i = function(t, e) {
            return this.g = t, this.ctx = e, this
        };
    _.extend(i.prototype, {
        _getSelection: function(t) {
            var e = t.get("seq").length,
                n = [],
                i = this.g.selcol.getSelForRow(t.get("id")),
                o = (0, r.find)(i, function(t) {
                    return "row" === t.get("type")
                });
            if ("undefined" != typeof o && null !== o)
                for (var s = e - 1, a = 0; a <= s; a++) n.push(a);
            else if (i.length > 0)
                for (var u, l = 0; l < i.length; l++) {
                    u = i[l];
                    for (var c = u.get("xStart"), h = u.get("xEnd"), f = c; f <= h; f++) n.push(f)
                }
            return n
        },
        _appendSelection: function(t) {
            var e = this,
                n = t.model.get("seq"),
                r = this._getSelection(t.model),
                i = this._getPrevNextSelection(t.model),
                o = i[0],
                s = i[1];
            if (this.g.zoomer.get("columnWidth"), this.g.zoomer.get("rowHeight"), 0 !== r.length) {
                var a = 0;
                return function() {
                    for (var i = [], u = n.length - 1, l = function(n) {
                        i.push(function() {
                            if (t.hidden.indexOf(n) >= 0) return a++;
                            var i = n - a;
                            return r.indexOf(n) >= 0 && (0 === i || r.indexOf(n - 1) < 0) ? e._renderSelection({
                                n: n,
                                k: i,
                                selection: r,
                                mPrevSel: o,
                                mNextSel: s,
                                xZero: t.xZero,
                                yZero: t.yZero,
                                model: t.model
                            }) : void 0
                        }())
                    }, c = 0; c <= u; c++) l(c);
                    return i
                }()
            }
        },
        _renderSelection: function(t) {
            for (var e = t.xZero, n = t.yZero, r = t.n, i = t.k, o = t.selection, s = t.mPrevSel, a = t.mNextSel, u = 0, l = t.model.get("seq").length - 1, c = r; c <= l && o.indexOf(c) >= 0; c++) u++;
            var h = this.g.zoomer.get("columnWidth"),
                f = this.g.zoomer.get("rowHeight"),
                d = h * u + 1,
                g = this.g.columns.get("hidden");
            this.ctx.beginPath();
            var p = this.ctx.lineWidth;
            this.ctx.lineWidth = 3;
            var m = this.ctx.strokeStyle;
            this.ctx.strokeStyle = "#FF0000", e += i * h;
            for (var v = 0, _ = u - 1, y = 0; y <= _; y++) {
                var b = r + y;
                g.indexOf(b) >= 0 || ("undefined" != typeof s && null !== s && s.indexOf(b) >= 0 || (this.ctx.moveTo(e + v, n), this.ctx.lineTo(v + h + e, n)), "undefined" != typeof a && null !== a && a.indexOf(b) >= 0 || (this.ctx.moveTo(v + e, f + n), this.ctx.lineTo(v + h + e, f + n)), v += h)
            }
            return this.ctx.moveTo(e, n), this.ctx.lineTo(e, f + n), this.ctx.moveTo(e + d, n), this.ctx.lineTo(e + d, f + n), this.ctx.stroke(), this.ctx.strokeStyle = m, this.ctx.lineWidth = p
        },
        _getPrevNextSelection: function(t) {
            var e = t.collection.prev(t),
                n = t.collection.next(t),
                r = void 0,
                i = void 0;
            return "undefined" != typeof e && null !== e && (r = this._getSelection(e)), "undefined" != typeof n && null !== n && (i = this._getSelection(n)), [r, i]
        }
    }), e.default = i
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
            function t(t, e) {
                var n = [],
                    r = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    i = !0, o = t
                } finally {
                    try {
                        !r && a.return && a.return()
                    } finally {
                        if (i) throw o
                    }
                }
                return n
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = n(3),
        s = n(123),
        a = r(s),
        u = n(125),
        l = r(u),
        c = n(127),
        h = r(c),
        f = n(124),
        d = r(f),
        g = n(4),
        p = n(48),
        m = n(5),
        v = g.extend({
            tagName: "canvas",
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.zoomer, "change:_alignmentScrollLeft change:_alignmentScrollTop", function(t, e, n) {
                    if (null == ("undefined" != typeof n && null !== n ? n.origin : void 0) || "canvasseq" !== n.origin) return this.render()
                }), this.listenTo(this.g.columns, "change:hidden", this.render), this.listenTo(this.g.zoomer, "change:alignmentWidth change:alignmentHeight", this.render), this.listenTo(this.g.colorscheme, "change", this.render), this.listenTo(this.g.selcol, "reset add", this.render), this.listenTo(this.model, "reset add", this.render), this.el.style.display = "inline-block", this.el.style.overflowX = "hidden", this.el.style.overflowY = "hidden", this.el.className = "biojs_msa_seqblock", this.ctx = this.el.getContext("2d"), this.cache = new a.default(this.g), this.coordsCache = new d.default(this.g, this.model), this.listenTo(this.g.zoomer, "change:residueFont", function() {
                    return this.cache = new a.default(this.g), this.render()
                }), this.sel = new l.default(this.g, this.ctx), this._setColor(), this.throttleTime = 0, this.throttleCounts = 0, null != document.documentElement.style.webkitAppearance ? this.throttledDraw = function() {
                    var t = +new Date;
                    if (this.draw(), this.throttleTime += +new Date - t, this.throttleCounts++, this.throttleCounts > 15) return Math.ceil(this.throttleTime / this.throttleCounts), this.throttledDraw = this.draw
                } : this.throttledDraw = (0, o.throttle)(this.throttledDraw, 30), this.manageEvents()
            },
            throttledDraw: function() {
                var t = +new Date;
                if (this.draw(), this.throttleTime += +new Date - t, this.throttleCounts++, this.throttleCounts > 15) {
                    var e = Math.ceil(this.throttleTime / this.throttleCounts);
                    return e *= 1.2, e = Math.max(20, e), this.throttledDraw = _.throttle(this.draw, e)
                }
            },
            manageEvents: function() {
                var t = {};
                return t.mousedown = "_onmousedown", t.touchstart = "_ontouchstart", this.g.config.get("registerMouseClicks") && (t.dblclick = "_onclick"), this.g.config.get("registerMouseHover") && (t.mousein = "_onmousein", t.mouseout = "_onmouseout"), t.mousewheel = "_onmousewheel", t.DOMMouseScroll = "_onmousewheel", this.delegateEvents(t), this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents), this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents), this.dragStart = []
            },
            _setColor: function() {
                return this.color = this.g.colorscheme.getSelectedScheme()
            },
            draw: function() {
                if (this.el.width = this.el.width, null != this.seqDrawer && this.model.length > 0) return this.seqDrawer.drawLetters(), this.seqDrawer.drawRows(this.sel._appendSelection, this.sel), this.seqDrawer.drawRows(this.drawFeatures, this)
            },
            drawFeatures: function(t) {
                var e = this.g.zoomer.get("columnWidth"),
                    n = this.g.zoomer.get("rowHeight");
                if (t.model.attributes.height > 1) {
                    var r = this.ctx;
                    return t.model.attributes.features.each(function(i) {
                        r.fillStyle = i.attributes.fillColor || "red";
                        var o = i.attributes.xEnd - i.attributes.xStart + 1,
                            s = (i.attributes.row + 1) * n;
                        return r.fillRect(i.attributes.xStart * e + t.xZero, s + t.yZero, e * o, n)
                    }), r.fillStyle = "black", r.font = this.g.zoomer.get("residueFont") + "px mono", r.textBaseline = "middle", r.textAlign = "center", t.model.attributes.features.each(function(i) {
                        var o = i.attributes.xEnd - i.attributes.xStart + 1,
                            s = (i.attributes.row + 1) * n;
                        return r.fillText(i.attributes.text, t.xZero + i.attributes.xStart * e + o / 2 * e, t.yZero + .5 * n + s)
                    })
                }
            },
            render: function() {
                return this.el.setAttribute("height", this.g.zoomer.get("alignmentHeight") + "px"), this.el.setAttribute("width", this.g.zoomer.getAlignmentWidth() + "px"), this.g.zoomer._checkScrolling(this._checkScrolling([this.g.zoomer.get("_alignmentScrollLeft"), this.g.zoomer.get("_alignmentScrollTop")]), {
                    header: "canvasseq"
                }), this._setColor(), this.seqDrawer = new h.default(this.g, this.ctx, this.model, {
                    width: this.el.width,
                    height: this.el.height,
                    color: this.color,
                    cache: this.cache
                }), this.throttledDraw(), this
            },
            _onmousemove: function(t, e) {
                if (0 !== this.dragStart.length) {
                    var n = p.abs(t),
                        r = [n[0] - this.dragStart[0], n[1] - this.dragStart[1]],
                        i = this.g.zoomer.get("canvasEventScale");
                    e && (i = 3);
                    for (var o = 0; o <= 1; o++) r[o] = r[o] * i;
                    for (var s = [this.dragStartScroll[0] - r[0], this.dragStartScroll[1] - r[1]], a = 0; a <= 1; a++) s[a] = Math.round(s[a]);
                    var u = this._checkScrolling(s);
                    this.g.zoomer._checkScrolling(u, {
                        origin: "canvasseq"
                    });
                    for (var l = 0; l <= 1; l++) u[l] !== s[l] && (0 === u[l] ? (this.dragStart[l] = n[l], this.dragStartScroll[l] = 0) : this.dragStart[l] = n[l] - u[l]);
                    return this.throttledDraw(), null != t.preventDefault ? (t.preventDefault(), t.stopPropagation()) : void 0
                }
            },
            _ontouchmove: function(t) {
                return this._onmousemove(t.changedTouches[0], !0), t.preventDefault(), t.stopPropagation()
            },
            _onmousedown: function(t) {
                var e = this;
                return this.dragStart = p.abs(t), this.dragStartScroll = [this.g.zoomer.get("_alignmentScrollLeft"), this.g.zoomer.get("_alignmentScrollTop")], m(document.body).on("mousemove.overmove", function(t) {
                    return e._onmousemove(t)
                }), m(document.body).on("mouseup.overup", function() {
                    return e._cleanup()
                }), t.preventDefault()
            },
            _ontouchstart: function(t) {
                var e = this;
                return this.dragStart = p.abs(t.changedTouches[0]), this.dragStartScroll = [this.g.zoomer.get("_alignmentScrollLeft"), this.g.zoomer.get("_alignmentScrollTop")], m(document.body).on("touchmove.overtmove", function(t) {
                    return e._ontouchmove(t)
                }), m(document.body).on("touchend.overtend touchleave.overtleave touchcancel.overtcanel", function(t) {
                    return e._touchCleanup(t)
                })
            },
            _onmousewinout: function(t) {
                if (t.toElement === document.body.parentNode) return this._cleanup()
            },
            _cleanup: function() {
                return this.dragStart = [], m(document.body).off(".overmove"), m(document.body).off(".overup"), m(document.body).off(".overout")
            },
            _touchCleanup: function(t) {
                return t.changedTouches.length > 0 && this._onmousemove(t.changedTouches[0], !0), this.dragStart = [], m(document.body).off(".overtmove"), m(document.body).off(".overtend"), m(document.body).off(".overtleave"), m(document.body).off(".overtcancel")
            },
            _onmousewheel: function(t) {
                var e = p.wheelDelta(t);
                return this.g.zoomer.set("_alignmentScrollLeft", this.g.zoomer.get("_alignmentScrollLeft") + e[0]), this.g.zoomer.set("_alignmentScrollTop", this.g.zoomer.get("_alignmentScrollTop") + e[1]), t.preventDefault()
            },
            _onclick: function(t) {
                var e = this._getClickPos(t);
                return "undefined" != typeof e && null !== e && (null != e.feature ? this.g.trigger("feature:click", e) : this.g.trigger("residue:click", e)), this.throttledDraw()
            },
            _onmousein: function(t) {
                console.log('_onmousein triggered');
                var e = this._getClickPos(t);
                return "undefined" != typeof e && null !== e && (null != e.feature ? this.g.trigger("feature:mousein", e) : this.g.trigger("residue:mousein", e)), this.throttledDraw()
            },
            _onmouseout: function(t) {
                console.log('_onmouseout triggered');
                var e = this._getClickPos(t);
                return "undefined" != typeof e && null !== e && (null != e.feature ? this.g.trigger("feature:mouseout", e) : this.g.trigger("residue:mouseout", e)), this.throttledDraw()
            },
            _getClickPos: function(t) {
                var e = p.rel(t);
                e[0] += this.g.zoomer.get("_alignmentScrollLeft");
                var n = Math.floor(e[0] / this.g.zoomer.get("columnWidth")),
                    r = this.seqDrawer._getSeqForYClick(e[1]),
                    o = i(r, 2),
                    s = o[0],
                    a = o[1];
                n += this.g.columns.calcHiddenColumns(n), s += this.model.calcHiddenSeqs(s), n = Math.max(0, n), s = Math.max(0, s);
                var u = this.model.at(s).get("id");
                if (!(a > 0)) return {
                    seqId: u,
                    rowPos: n,
                    evt: t
                };
                var l = this.model.at(s).get("features").getFeatureOnRow(a - 1, n);
                return 0 !== l.length ? {
                    seqId: u,
                    feature: l[0],
                    rowPos: n,
                    evt: t
                } : void 0
            },
            _checkScrolling: function(t) {
                for (var e = [this.coordsCache.maxScrollWidth, this.coordsCache.maxScrollHeight], n = 0; n <= 1; n++) t[n] > e[n] && (t[n] = e[n]), t[n] < 0 && (t[n] = 0);
                return t
            }
        });
    e.default = v
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function() {
            function t(t, e) {
                var n = [],
                    r = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !e || n.length !== e); r = !0);
                } catch (t) {
                    i = !0, o = t
                } finally {
                    try {
                        !r && a.return && a.return()
                    } finally {
                        if (i) throw o
                    }
                }
                return n
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        i = n(3),
        o = {
            updateConfig: function() {
                this.rectWidth = this.g.zoomer.get("columnWidth"), this.rectHeight = this.g.zoomer.get("rowHeight")
            },
            drawLetters: function() {
                return this.updateConfig(), this.ctx.globalAlpha = this.g.colorscheme.get("opacity"), this.drawSeqs(function(t) {
                    return this.drawSeq(t, this._drawRect)
                }), this.ctx.globalAlpha = 1, this.rectWidth >= this.g.zoomer.get("minLetterDrawSize") && this.drawSeqs(function(t) {
                    return this.drawSeq(t, this._drawLetter)
                }), this
            },
            drawSeqs: function(t, e) {
                var n = this.g.columns.get("hidden");
                e = e || this;
                for (var i = this.getStartSeq(), o = r(i, 2), s = o[0], a = o[1], u = s; u < this.model.length; u++) {
                    var l = this.model.at(u);
                    if (!l.get("hidden") && (t.call(e, {
                        model: l,
                        yPos: a,
                        y: u,
                        hidden: n
                    }), a += (l.attributes.height || 1) * this.rectHeight, a > this.height)) break
                }
            },
            drawRows: function(t, e) {
                return this.drawSeqs(function(n) {
                    return this.drawRow(n, t, e)
                })
            },
            drawRow: function(t, e, n) {
                var r = this.g.zoomer.get("columnWidth"),
                    i = Math.max(0, Math.abs(Math.ceil(-this.g.zoomer.get("_alignmentScrollLeft") / r))),
                    o = -Math.abs(-this.g.zoomer.get("_alignmentScrollLeft") % r),
                    s = o - i * r,
                    a = t.yPos;
                return e.call(n, {
                    model: t.model,
                    xZero: s,
                    yZero: a,
                    hidden: t.hidden
                })
            },
            getStartSeq: function() {
                for (var t = Math.max(0, Math.floor(this.g.zoomer.get("_alignmentScrollTop") / this.rectHeight)) + 1, e = 0, n = 0; e < t && n < this.model.length;) e += this.model.at(n).attributes.height || 1, n++;
                return [n - 1, -Math.max(0, this.g.zoomer.get("_alignmentScrollTop") - e * this.rectHeight + (this.model.at(n - 1).attributes.height || 1) * this.rectHeight)]
            },
            _getSeqForYClick: function(t) {
                for (var e = this.getStartSeq(), n = r(e, 2), i = n[0], o = n[1], s = o % this.rectHeight, a = Math.max(0, Math.floor((t - s) / this.rectHeight)) + 1, u = 0, l = i; u < a && l < this.model.length;) u += this.model.at(l).attributes.height || 1, l++;
                return [l - 1, Math.max(0, Math.floor(t / this.rectHeight) - u + (this.model.at(l - 1).get("height") || 1))]
            },
            drawSeq: function(t, e) {
                for (var n = t.model.get("seq"), r = t.yPos, i = this.rectWidth, o = this.rectHeight, s = Math.max(0, Math.abs(Math.ceil(-this.g.zoomer.get("_alignmentScrollLeft") / i))), a = -Math.abs(-this.g.zoomer.get("_alignmentScrollLeft") % i), u = {
                    rectWidth: i,
                    rectHeight: o,
                    yPos: r,
                    y: t.y
                }, l = this.width, c = s; c < n.length; c++) {
                    var h = n[c];
                    if (h = h.toUpperCase(), u.x = c, u.c = h, u.xPos = a, t.hidden.indexOf(c) < 0 && (e(this, u), a += i, a > l)) break
                }
            },
            _drawRect: function(t, e) {
                var n = t.color.getColor(e.c, {
                    pos: e.x,
                    y: e.y
                });
                if ("undefined" != typeof n && null !== n) return t.ctx.fillStyle = n, t.ctx.fillRect(e.xPos, e.yPos, e.rectWidth, e.rectHeight)
            },
            _drawLetter: function(t, e) {
                return t.ctx.drawImage(t.cache.getFontTile(e.c, e.rectWidth, e.rectHeight), e.xPos, e.yPos, e.rectWidth, e.rectHeight)
            }
        },
        s = function(t, e, n, r) {
            return this.g = t, this.ctx = e, this.model = n, this.width = r.width, this.height = r.height, this.color = r.color, this.cache = r.cache, this.rectHeight = this.g.zoomer.get("rowHeight"), this.rectWidth = this.g.zoomer.get("columnWidth"), this
        };
    (0, i.extend)(s.prototype, o), e.default = s
}, function(t, e, n) {
    "use strict";

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        o = n(14),
        s = r(o),
        a = n(2),
        u = n(7),
        l = a.extend({
            className: "biojs_msa_conserv",
            initialize: function(t) {
                this.g = t.g, this.listenTo(this.g.zoomer, "change:stepSize change:labelWidth change:columnWidth", this.render), this.listenTo(this.g.vis, "change:labels change:metacell", this.render), this.listenTo(this.g.columns, "change:scaling", this.render), this.listenTo(this.g.stats, "reset", this.render);
                var e = _.extend({}, {
                    fillColor: ["#660", "#ff0"],
                    strokeColor: "#330",
                    maxHeight: 20,
                    rectStyler: function(t, e) {
                        return t
                    }
                }, this.g.conservationConfig);
                return this.fillColor = e.fillColor, this.strokeColor = e.strokeColor, this.maxHeight = e.maxHeight, this.rectStyler = e.rectStyler, this.manageEvents()
            },
            colorer: function t(e) {
                var t = function() {
                    return "none"
                };
                if ("string" == typeof e) t = function() {
                    return e
                };
                else if (Array.isArray(e)) {
                    2 != e.length && console.error("ERROR: colorRange array should have exactly two elements", e);
                    var n = "undefined" != typeof d3 && !!d3.scale,
                        r = "undefined" != typeof d3_scale;
                    if (n || r) {
                        var o = n ? d3.scale.linear() : d3_scale.scaleLinear(),
                            s = o.domain([0, this.maxHeight]).range(e);
                        t = function(t) {
                            return s(t.height)
                        }
                    } else console.warn("providing a [min/max] range as input requires d3 to be included - only using the first color"), t = function(t) {
                        return e[0]
                    }
                } else console.warn("expected colorRange to be '#rgb' or ['#rgb', '#rgb']", e, "(" + ("undefined" == typeof e ? "undefined" : i(e)) + ")");
                return t
            },
            render: function() {
                var t = this.g.stats.scale(this.g.stats.conservation());
                u.removeAllChilds(this.el);
                var e = this.model.getMaxLength(),
                    n = this.g.zoomer.get("columnWidth"),
                    r = this.maxHeight,
                    i = n * (e - this.g.columns.get("hidden").length),
                    o = s.base({
                        height: r,
                        width: i
                    });
                o.style.display = "inline-block", o.style.cursor = "pointer";
                for (var a = (this.rectData, this.colorer(this.fillColor)), l = this.colorer(this.strokeColor), c = this.rectStyler, h = this.g.zoomer.get("stepSize"), f = this.g.columns.get("hidden"), d = 0, g = 0; g < e;)
                    if (f.indexOf(g) >= 0) g += h;
                    else {
                        i = n * h;
                        for (var p = 0, m = h - 1, v = 0; 0 < m ? v <= m : v >= m; 0 < m ? v++ : v--) p += t[g];
                        var _ = r * (p / h),
                            y = {
                                x: d,
                                y: r - _,
                                maxheight: r,
                                width: i - n / 4,
                                height: _,
                                rowPos: g
                            },
                            b = s.rect(y);
                        b.style.stroke = l(y), b.style.fill = a(y), "function" == typeof c && c(b, y), b.rowPos = g, o.appendChild(b), d += i, g += h
                    } return this.el.appendChild(o),
                    this
            },
            _onclick: function(t) {
                var e = this,
                    n = t.target.rowPos,
                    r = this.g.zoomer.get("stepSize");
                return function() {
                    for (var i = [], o = r - 1, s = 0; 0 < o ? s <= o : s >= o; 0 < o ? s++ : s--) i.push(e.g.trigger("bar:click", {
                        rowPos: n + s,
                        evt: t
                    }));
                    return i
                }()
            },
            manageEvents: function() {
                var t = {};
                return this.g.config.get("registerMouseClicks") && (t.click = "_onclick"), this.g.config.get("registerMouseHover") && (t.mousein = "_onmousein", t.mouseout = "_onmouseout"), this.delegateEvents(t), this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents), this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents)
            },
            _onmousein: function(t) {
                var e = this.g.zoomer.get("stepSize" * t.rowPos);
                return this.g.trigger("bar:mousein", {
                    rowPos: e,
                    evt: t
                })
            },
            _onmouseout: function(t) {
                var e = this.g.zoomer.get("stepSize" * t.rowPos);
                return this.g.trigger("bar:mouseout", {
                    rowPos: e,
                    evt: t
                })
            }
        });
    e.default = l
}, function(t, e, n) {
    "use strict";

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(14),
        o = r(i),
        s = n(2),
        a = n(7),
        u = s.extend({
            className: "biojs_msa_gapview",
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.zoomer, "change:stepSize change:labelWidth change:columnWidth", this.render), this.listenTo(this.g.vis, "change:labels change:metacell", this.render), this.listenTo(this.g.columns, "change:scaling", this.render), this.listenTo(this.model, "reset", this.render), this.manageEvents()
            },
            render: function() {
                var t = this.g.stats.gaps();
                a.removeAllChilds(this.el);
                var e = this.model.getMaxLength(),
                    n = this.g.zoomer.get("columnWidth"),
                    r = 20,
                    i = n * (e - this.g.columns.get("hidden").length),
                    s = o.base({
                        height: r,
                        width: i
                    });
                s.style.display = "inline-block", s.style.cursor = "pointer";
                for (var u = this.g.zoomer.get("stepSize"), l = this.g.columns.get("hidden"), c = 0, h = 0; h < e;)
                    if (l.indexOf(h) >= 0) h += u;
                    else {
                        i = n * u;
                        for (var f = 0, d = u - 1, g = 0; 0 < d ? g <= d : g >= d; 0 < d ? g++ : g--) f += t[h];
                        var p = r * (f / u),
                            m = o.rect({
                                x: c,
                                y: r - p,
                                width: i - n / 4,
                                height: p,
                                style: "stroke:red;stroke-width:1;"
                            });
                        m.rowPos = h, s.appendChild(m), c += i, h += u
                    } return this.el.appendChild(s), this
            },
            _onclick: function(t) {
                var e = this,
                    n = t.target.rowPos,
                    r = this.g.zoomer.get("stepSize");
                return function() {
                    for (var i = [], o = r - 1, s = 0; 0 < o ? s <= o : s >= o; 0 < o ? s++ : s--) i.push(e.g.trigger("gap:click", {
                        rowPos: n + s,
                        evt: t
                    }));
                    return i
                }()
            },
            manageEvents: function() {
                var t = {};
                return this.g.config.get("registerMouseClicks") && (t.click = "_onclick"), this.g.config.get("registerMouseHover") && (t.mousein = "_onmousein", t.mouseout = "_onmouseout"), this.delegateEvents(t), this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents), this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents)
            },
            _onmousein: function(t) {
                var e = this.g.zoomer.get("stepSize" * t.rowPos);
                return this.g.trigger("gap:mousein", {
                    rowPos: e,
                    evt: t
                })
            },
            _onmouseout: function(t) {
                var e = this.g.zoomer.get("stepSize" * t.rowPos);
                return this.g.trigger("gap:mouseout", {
                    rowPos: e,
                    evt: t
                })
            }
        });
    e.default = u
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(131),
        o = r(i),
        s = n(133),
        a = r(s),
        u = n(4),
        l = u.extend({
            initialize: function(t) {
                var e = this;
                return this.g = t.g, this.draw(), this.listenTo(this.g.vis, "change:labels change:metacell change:leftHeader", function() {
                    return e.draw(), e.render()
                })
            },
            draw: function() {
                if (this.removeViews(), this.g.vis.get("leftHeader") && (this.g.vis.get("labels") || this.g.vis.get("metacell"))) {
                    var t = new o.default({
                        model: this.model,
                        g: this.g
                    });
                    t.ordering = -50, this.addView("lHeader", t)
                }
                var e = new a.default({
                    model: this.model,
                    g: this.g
                });
                return e.ordering = 0, this.addView("rHeader", e)
            },
            render: function() {
                return this.renderSubviews(), this.el.className = "biojs_msa_header"
            }
        });
    e.default = l
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(17),
        i = n(2),
        o = n(7),
        s = i.extend({
            className: "biojs_msa_headers",
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.vis, "change:metacell change:labels", this.render), this.listenTo(this.g.zoomer, "change:labelWidth change:metaWidth", this.render)
            },
            render: function() {
                o.removeAllChilds(this.el);
                var t = 0;
                return t += this.g.zoomer.getLeftBlockWidth(), this.el.style.width = t + "px", this.g.vis.get("labels") && this.el.appendChild(this.labelDOM()), this.g.vis.get("metacell") && this.el.appendChild(this.metaDOM()), this.el.style.display = "inline-block", this.el.style.fontSize = this.g.zoomer.get("markerFontsize"), this
            },
            labelDOM: function() {
                var t = r.mk("div");
                if (t.style.width = this.g.zoomer.getLabelWidth(), t.style.display = "inline-block", this.g.vis.get("labelCheckbox") && t.appendChild(this.addEl(".", 10)), this.g.vis.get("labelId") && t.appendChild(this.addEl("ID", this.g.zoomer.get("labelIdLength"))), this.g.vis.get("labelPartition") && t.appendChild(this.addEl("part", 15)), this.g.vis.get("labelName")) {
                    var e = this.addEl("Label");
                    t.appendChild(e)
                }
                return t
            },
            addEl: function(t, e) {
                var n = document.createElement("span");
                return n.textContent = t, "undefined" != typeof e && null !== e && (n.style.width = e + "px"), n.style.display = "inline-block", n
            },
            metaDOM: function() {
                var t = r.mk("div");
                return t.style.width = this.g.zoomer.getMetaWidth(), t.style.display = "inline-block", this.g.vis.get("metaGaps") && t.appendChild(this.addEl("Gaps", this.g.zoomer.get("metaGapWidth"))), this.g.vis.get("metaIdentity") && t.appendChild(this.addEl("Ident", this.g.zoomer.get("metaIdentWidth"))), t
            }
        });
    e.default = s
}, function(t, e, n) {
    "use strict";

    function r(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t)
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t, e
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(14),
        o = r(i),
        s = n(2),
        a = n(7),
        u = n(5),
        l = s.extend({
            className: "biojs_msa_marker",
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.zoomer, "change:stepSize change:labelWidth change:columnWidth change:markerStepSize change:markerFontsize", this.render), this.listenTo(this.g.vis, "change:labels change:metacell", this.render), this.manageEvents()
            },
            render: function() {
                a.removeAllChilds(this.el);
                var t = this.g.zoomer.get("markerFontsize"),
                    e = this.g.zoomer.get("columnWidth"),
                    n = this.g.zoomer.get("stepSize"),
                    r = this.g.zoomer.get("markerStepSize"),
                    i = this.g.columns.get("hidden");
                this.el.style.fontSize = t;
                for (var o = document.createElement("span"), s = this.model.getMaxLength(), u = 0; u < s; u++)
                    if (i.indexOf(u) >= 0) {
                        var l = this.markerHidden(u, n);
                        l && o.appendChild(l), u += n
                    } else {
                        var c = document.createElement("span");
                        c.className = "msa-col-header", c.style.width = e + "px", c.style.display = "inline-block", (u + 1) % r === 0 ? c.textContent = u + 1 : (u + 1) % n === 0 ? c.textContent = "." : c.textContent = " ", c.rowPos = u, o.appendChild(c)
                    } return this.el.appendChild(o), this
            },
            markerHidden: function(t, e) {
                for (var n = this, r = this.g.columns.get("hidden").slice(0), i = Math.max(0, t - e), s = !0, a = i; a <= t; a++) s &= r.indexOf(a) >= 0;
                if (!s) {
                    for (var l = this.model.getMaxLength(), c = 0, h = -1, f = t; f <= l && (h >= 0 || (h = r.indexOf(f)), r.indexOf(f) >= 0); f++) c++;
                    var d = o.base({
                        height: 10,
                        width: 10
                    });
                    d.style.position = "relative";
                    var g = o.polygon({
                        points: "0,0 5,5 10,0",
                        style: "fill:lime;stroke:purple;stroke-width:1"
                    });
                    return u(g).on("click", function(t) {
                        return r.splice(h, c), n.g.columns.set("hidden", r)
                    }), d.appendChild(g), d
                }
            },
            manageEvents: function() {
                var t = {};
                return this.g.config.get("registerMouseClicks") && (t.click = "_onclick"), this.g.config.get("registerMouseHover") && (t.mousein = "_onmousein", t.mouseout = "_onmouseout"), this.delegateEvents(t), this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents), this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents)
            },
            _onclick: function(t) {
                var e = t.target.rowPos,
                    n = this.g.zoomer.get("stepSize");
                return this.g.trigger("column:click", {
                    rowPos: e,
                    stepSize: n,
                    evt: t
                })
            },
            _onmousein: function(t) {
                var e = this.g.zoomer.get("stepSize" * t.rowPos),
                    n = this.g.zoomer.get("stepSize");
                return this.g.trigger("column:mousein", {
                    rowPos: e,
                    stepSize: n,
                    evt: t
                })
            },
            _onmouseout: function(t) {
                var e = this.g.zoomer.get("stepSize" * t.rowPos),
                    n = this.g.zoomer.get("stepSize");
                return this.g.trigger("column:mouseout", {
                    rowPos: e,
                    stepSize: n,
                    evt: t
                })
            }
        });
    e.default = l
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(132),
        o = r(i),
        s = n(128),
        a = r(s),
        u = n(134),
        l = r(u),
        c = n(129),
        h = r(c),
        f = n(4),
        d = f.extend({
            initialize: function(t) {
                return this.g = t.g, this.blockEvents = !1, this.listenTo(this.g.vis, "change:header", function() {
                    return this.draw(), this.render()
                }), this.listenTo(this.g.vis, "change", this._setSpacer), this.listenTo(this.g.zoomer, "change:alignmentWidth", this._setWidth), this.listenTo(this.g.zoomer, "change:_alignmentScrollLeft", this._adjustScrollingLeft), this.listenTo(this.g.columns, "change:hidden", function() {
                    return this.draw(), this.render()
                }), this.draw(), this.g.vis.once("change:loaded", this._adjustScrollingLeft, this)
            },
            events: {
                scroll: "_sendScrollEvent"
            },
            draw: function() {
                if (this.removeViews(), this.g.vis.get("conserv")) {
                    var t = new a.default({
                        model: this.model,
                        g: this.g
                    });
                    t.ordering = -20, this.addView("conserv", t)
                }
                if (this.g.vis.get("markers")) {
                    var e = new o.default({
                        model: this.model,
                        g: this.g
                    });
                    e.ordering = -10, this.addView("marker", e)
                }
                if (this.g.vis.get("seqlogo")) {
                    var n = new l.default({
                        model: this.model,
                        g: this.g
                    });
                    n.ordering = -30, this.addView("seqlogo", n)
                }
                if (this.g.vis.get("gapHeader")) {
                    var r = new h.default({
                        model: this.model,
                        g: this.g
                    });
                    return r.ordering = -25, this.addView("gapview", r)
                }
            },
            render: function() {
                return this.renderSubviews(), this._setSpacer(), this.el.className = "biojs_msa_rheader", this.el.style.overflowX = "auto", this.el.style.display = "inline-block", this._setWidth(), this._adjustScrollingLeft(), this
            },
            _sendScrollEvent: function() {
                return this.blockEvents || this.g.zoomer.set("_alignmentScrollLeft", this.el.scrollLeft, {
                    origin: "header"
                }), this.blockEvents = !1
            },
            _adjustScrollingLeft: function(t, e, n) {
                if (null == ("undefined" != typeof n && null !== n ? n.origin : void 0) || "header" !== n.origin) {
                    var r = this.g.zoomer.get("_alignmentScrollLeft");
                    return this.blockEvents = !0, this.el.scrollLeft = r
                }
            },
            _setSpacer: function() {
                return this.el.style.marginLeft = this._getLabelWidth() + "px"
            },
            _getLabelWidth: function() {
                var t = 0;
                return this.g.vis.get("leftHeader") || (t += this.g.zoomer.getLeftBlockWidth()), t
            },
            _setWidth: function() {
                return this.el.style.width = this.g.zoomer.getAlignmentWidth() + "px"
            }
        });
    e.default = d
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(66),
        i = n(2),
        o = n(7),
        s = i.extend({
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.zoomer, "change:alignmentWidth", this.render), this.listenTo(this.g.colorscheme, "change", function() {
                    var t = this.g.colorscheme.getSelectedScheme();
                    return this.seqlogo.changeColors(t), this.render()
                }), this.listenTo(this.g.zoomer, "change:columnWidth", function() {
                    return this.seqlogo.column_width = this.g.zoomer.get("columnWidth"), this.render()
                }), this.listenTo(this.g.stats, "reset", function() {
                    return this.draw(), this.render()
                }), this.draw()
            },
            draw: function() {
                o.removeAllChilds(this.el);
                var t = this.g.stats.conservResidue({
                    scaled: !0
                });
                t = _.map(t, function(t) {
                    return _.pick(t, function(t, e) {
                        return "-" !== e
                    })
                });
                var e = {
                        alphabet: "aa",
                        heightArr: t
                    },
                    n = this.g.colorscheme.getSelectedScheme();
                return this.seqlogo = new r({
                    model: this.model,
                    g: this.g,
                    data: e,
                    yaxis: !1,
                    scroller: !1,
                    xaxis: !1,
                    height: 100,
                    column_width: this.g.zoomer.get("columnWidth"),
                    positionMarker: !1,
                    zoom: 1,
                    el: this.el,
                    colors: n
                })
            },
            render: function() {
                return this.seqlogo.render()
            }
        });
    e.default = s
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(136),
        o = r(i),
        s = n(4),
        a = s.extend({
            initialize: function(t) {
                var e = this;
                return this.g = t.g, this.draw(), this.listenTo(this.g.zoomer, "change:_alignmentScrollTop", this._adjustScrollingTop), this.g.vis.once("change:loaded", this._adjustScrollingTop, this), this.listenTo(this.g.zoomer, "change:alignmentHeight", this._setHeight), this.listenTo(this.model, "change:reference", this.draw), this.listenTo(this.model, "reset add remove", function() {
                    return e.draw(), e.render()
                })
            },
            draw: function() {
                this.removeViews();
                for (var t = 0; t < this.model.length; t++)
                    if (!this.model.at(t).get("hidden")) {
                        var e = new o.default({
                            model: this.model.at(t),
                            g: this.g
                        });
                        e.ordering = t, this.addView("row_" + t, e)
                    }
            },
            events: {
                scroll: "_sendScrollEvent"
            },
            _sendScrollEvent: function() {
                return this.g.zoomer.set("_alignmentScrollTop", this.el.scrollTop, {
                    origin: "label"
                })
            },
            _adjustScrollingTop: function() {
                return this.el.scrollTop = this.g.zoomer.get("_alignmentScrollTop")
            },
            render: function() {
                return this.renderSubviews(), this.el.className = "biojs_msa_labelblock", this.el.style.display = "inline-block", this.el.style.verticalAlign = "top", this.el.style.overflowY = "auto", this.el.style.overflowX = "hidden", this.el.style.fontSize = this.g.zoomer.get("labelFontsize") + "px", this.el.style.lineHeight = "" + this.g.zoomer.get("labelLineHeight"), this._setHeight(), this
            },
            _setHeight: function() {
                return this.el.style.height = this.g.zoomer.get("alignmentHeight") + "px"
            }
        });
    e.default = a
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(137),
        o = r(i),
        s = n(138),
        a = r(s),
        u = n(4),
        l = u.extend({
            initialize: function(t) {
                return this.g = t.g, this.draw(), this.listenTo(this.g.vis, "change:labels", this.drawR), this.listenTo(this.g.vis, "change:metacell", this.drawR), this.listenTo(this.g.zoomer, "change:rowHeight", function() {
                    return this.el.style.height = this.g.zoomer.get("rowHeight") + "px"
                }), this.listenTo(this.g.selcol, "change reset add", this.setSelection)
            },
            draw: function() {
                if (this.removeViews(), this.g.vis.get("labels") && this.addView("labels", new o.default({
                    model: this.model,
                    g: this.g
                })), this.g.vis.get("metacell")) {
                    var t = new a.default({
                        model: this.model,
                        g: this.g
                    });
                    return this.addView("metacell", t)
                }
            },
            drawR: function() {
                return this.draw(), this.render()
            },
            render: function() {
                return this.renderSubviews(), this.el.setAttribute("class", "biojs_msa_labelrow"), this.el.style.height = this.g.zoomer.get("rowHeight") * (this.model.attributes.height || 1) + "px", this.setSelection(), this
            },
            setSelection: function() {
                return this.g.selcol.getSelForRow(this.model.id).length > 0 ? this.el.style.fontWeight = "bold" : this.el.style.fontWeight = "normal"
            }
        });
    e.default = l
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(2),
        i = n(7),
        o = r.extend({
            initialize: function(t) {
                return this.seq = t.seq, this.g = t.g, this.manageEvents()
            },
            manageEvents: function() {
                var t = {};
                return this.g.config.get("registerMouseClicks") && (t.click = "_onclick"), this.g.config.get("registerMouseHover") && (t.mousein = "_onmousein", t.mouseout = "_onmouseout"), this.delegateEvents(t), this.listenTo(this.g.config, "change:registerMouseHover", this.manageEvents), this.listenTo(this.g.config, "change:registerMouseClick", this.manageEvents), this.listenTo(this.g.vis, "change:labelName change:labelId change:labelPartition change:labelCheckbox", this.render), this.listenTo(this.g.zoomer, "change:labelIdLength change:labelNameLength change:labelPartLength change:labelCheckLength", this.render), this.listenTo(this.g.zoomer, "change:labelFontSize change:labelLineHeight change:labelWidth change:rowHeight", this.render)
            },
            render: function() {
                if (i.removeAllChilds(this.el), this.el.style.width = this.g.zoomer.getLabelWidth() + "px", this.el.setAttribute("class", "biojs_msa_labels"), this.g.vis.get("labelCheckbox")) {
                    var t = document.createElement("input");
                    t.setAttribute("type", "checkbox"), t.value = this.model.get("id"), t.name = "seq", t.style.width = this.g.zoomer.get("labelCheckLength") + "px", this.el.appendChild(t)
                }
                if (this.g.vis.get("labelId")) {
                    var e = document.createElement("span"),
                        n = this.model.get("id");
                    isNaN(n) || n++, e.textContent = n, e.style.width = this.g.zoomer.get("labelIdLength") + "px", e.style.display = "inline-block", this.el.appendChild(e)
                }
                if (this.g.vis.get("labelPartition")) {
                    var r = document.createElement("span");
                    r.style.width = this.g.zoomer.get("labelPartLength") + "px", r.textContent = this.model.get("partition"), r.style.display = "inline-block", this.el.appendChild(e), this.el.appendChild(r)
                }
                if (this.g.vis.get("labelName")) {
                    var o = document.createElement("span");
                    o.textContent = this.model.get("name"), this.model.get("ref") && this.g.config.get("hasRef") && (o.style.fontWeight = "bold"), o.style.width = this.g.zoomer.get("labelNameLength") + "px", this.el.appendChild(o)
                }
                return this.el.style.overflow = scroll, this.el.style.fontSize = this.g.zoomer.get("labelFontsize") + "px", this
            },
            _onclick: function(t) {
                var e = this.model.get("id");
                return this.g.trigger("row:click", {
                    seqId: e,
                    evt: t
                })
            },
            _onmousein: function(t) {
                var e = this.model.get("id");
                return this.g.trigger("row:mouseout", {
                    seqId: e,
                    evt: t
                })
            },
            _onmouseout: function(t) {
                var e = this.model.get("id");
                return this.g.trigger("row:mouseout", {
                    seqId: e,
                    evt: t
                })
            }
        });
    e.default = o
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(12),
        o = n(6),
        s = r(o),
        a = n(3),
        u = n(2),
        l = n(7),
        c = u.extend({
            className: "biojs_msa_metaview",
            initialize: function(t) {
                return this.g = t.g, this.listenTo(this.g.vis, "change:metacell", this.render), this.listenTo(this.g.zoomer, "change:metaWidth", this.render)
            },
            events: {
                click: "_onclick",
                mousein: "_onmousein",
                mouseout: "_onmouseout"
            },
            render: function() {
                l.removeAllChilds(this.el), this.el.style.display = "inline-block";
                var t = this.g.zoomer.getMetaWidth();
                if (this.el.style.width = t - 10, this.el.style.paddingRight = 5, this.el.style.paddingLeft = 5, this.el.style.fontSize = this.g.zoomer.get("labelFontsize") - 2 + "px", this.g.vis.get("metaGaps")) {
                    var e = this.model.get("seq"),
                        n = (0, a.reduce)(e, function(t, e) {
                            return "-" === e ? ++t : void 0
                        }, 0);
                    n = (100 * n / e.length).toFixed(0) + "%";
                    var r = document.createElement("span");
                    r.textContent = n, r.style.display = "inline-block", r.style.width = 35, this.el.appendChild(r)
                }
                if (this.g.vis.get("metaIdentity")) {
                    var o = this.g.stats.identity()[this.model.id],
                        u = document.createElement("span");
                    this.model.get("ref") && this.g.config.get("hasRef") ? u.textContent = "ref." : "undefined" != typeof o && null !== o && (u.textContent = o.toFixed(2)), u.style.display = "inline-block", u.style.width = 40, this.el.appendChild(u)
                }
                if (this.g.vis.get("metaLinks") && this.model.attributes.ids) {
                    var c = i.seqs.buildLinks(this.model.attributes.ids);
                    if (Object.keys(c).length > 0) {
                        var h = new s.default({
                            name: "↗"
                        });
                        c.forEach(function(t, e) {
                            return h.addNode(e, function(e) {
                                return window.open(t)
                            })
                        });
                        var f = h.buildDOM();
                        return f.style.cursor = "pointer", this.el.appendChild(f)
                    }
                }
            },
            _onclick: function(t) {
                return this.g.trigger("meta:click", {
                    seqId: this.model.get("id", {
                        evt: t
                    })
                })
            },
            _onmousein: function(t) {
                return this.g.trigger("meta:mousein", {
                    seqId: this.model.get("id", {
                        evt: t
                    })
                })
            },
            _onmouseout: function(t) {
                return this.g.trigger("meta:mouseout", {
                    seqId: this.model.get("id", {
                        evt: t
                    })
                })
            }
        });
    e.default = c
}, function(t, e) {
    "use strict";

    function n() {
        for (var t = {}, e = 0; e < arguments.length; e++) {
            var n = arguments[e];
            for (var i in n) r.call(n, i) && (t[i] = n[i])
        }
        return t
    }
    t.exports = n;
    var r = Object.prototype.hasOwnProperty
}, function(t, e, n) {
    e = t.exports = n(80)(), e.push([t.id, '.biojs_msa_stage{cursor:default;line-height:normal;font-family:Helvetica}.biojs_msa_seqblock{cursor:move}.biojs_msa_layer{display:block;white-space:nowrap}.biojs_msa_labels{color:#000;display:inline-block;cursor:pointer;vertical-align:middle;overflow:hidden;text-overflow:clip}.biojs_msa_header,.biojs_msa_labels{white-space:nowrap;text-align:left}.biojs_msa_labelrow:before{content:"";display:inline-block;width:0;height:100%;vertical-align:middle}.biojs_msa_labelrow{height:100%}.biojs_msa_labelblock::-webkit-scrollbar,.biojs_msa_rheader::-webkit-scrollbar{//:none;width:7px;height:7px}.biojs_msa_labelblock::-webkit-scrollbar-thumb,.biojs_msa_rheader::-webkit-scrollbar-thumb{border-radius:4px;background-color:rgba(0,0,0,.5);box-shadow:0 0 1px hsla(0,0%,100%,.5)}.biojs_msa_marker{color:#999;white-space:nowrap}.biojs_msa_marker .msa-col-header{cursor:pointer;text-align:center}.biojs_msa_marker .msa-col-header:hover{color:red}.smenubar .smenubar_alink{background:#3498db;background-image:linear-gradient(180deg,#3498db,#2980b9);border-radius:28px;font-family:Arial;color:#fff;padding:3px 10px;margin-left:10px;text-decoration:none}.smenubar{display:inline-block}.smenubar .smenubar_alink:hover{cursor:pointer}.smenu-dropdown{position:absolute;z-index:9;display:none;margin-left:5px;margin-top:22px}.smenu-dropdown .smenu-dropdown-menu,.smenu-dropdown .smenu-dropdown-panel{min-width:160px;max-width:360px;list-style:none;background:#fff;border:1px solid #ddd;border:1px solid rgba(0,0,0,.2);border-radius:6px;box-shadow:0 5px 10px rgba(0,0,0,.2);overflow:visible;padding:4px 0;margin:0}.smenu-dropdown .smenu-dropdown-panel{padding:10px}.smenu-dropdown.smenu-dropdown-scroll .smenu-dropdown-menu,.smenu-dropdown.smenu-dropdown-scroll .smenu-dropdown-panel{max-height:358px;overflow:auto}.smenu-dropdown .smenu-dropdown-menu li{display:block;color:#555;text-decoration:none;line-height:18px;padding:3px 15px;white-space:nowrap}.smenu-dropdown .smenu-dropdown-menu li:hover{background-color:#08c;color:#fff;cursor:pointer}.smenu-dropdown .smenu-dropdown-menu .smenu-dropdown-divider{font-size:1px;border-top:1px solid #e5e5e5;padding:0;margin:5px 0}.biojs_msa_div{position:relative}.biojs_msa_scale{position:absolute;bottom:0;right:0;background-color:#fff;box-shadow:0 2px 3px #999;border-radius:3px;margin:5px 0 0 auto;padding:5px;text-align:center}.biojs_msa_scale .msa-btngroup{margin:5px auto 0}.biojs_msa_scale [type=range]{cursor:pointer}.biojs_msa_scale .msa-btn-close{text-align:right;font-size:.8em;padding:2px}.biojs_msa_scale .msa-btn-open{background-color:#fff}.biojs_msa_scale .msa-hide{display:none}.msa-btn{cursor:pointer;font-size:1.1em;display:inline-block;padding:2px 8px;margin-bottom:0;border:1px solid transparent;border-radius:4px;box-sizing:border-box}.msa-btn:hover{background-color:#ddd}', ""])
}, function(t, e, n) {
    function r(t, e) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
                i = d[r.id];
            if (i) {
                i.refs++;
                for (var o = 0; o < i.parts.length; o++) i.parts[o](r.parts[o]);
                for (; o < r.parts.length; o++) i.parts.push(l(r.parts[o], e))
            } else {
                for (var s = [], o = 0; o < r.parts.length; o++) s.push(l(r.parts[o], e));
                d[r.id] = {
                    id: r.id,
                    refs: 1,
                    parts: s
                }
            }
        }
    }

    function i(t) {
        for (var e = [], n = {}, r = 0; r < t.length; r++) {
            var i = t[r],
                o = i[0],
                s = i[1],
                a = i[2],
                u = i[3],
                l = {
                    css: s,
                    media: a,
                    sourceMap: u
                };
            n[o] ? n[o].parts.push(l) : e.push(n[o] = {
                id: o,
                parts: [l]
            })
        }
        return e
    }

    function o(t, e) {
        var n = m(),
            r = y[y.length - 1];
        if ("top" === t.insertAt) r ? r.nextSibling ? n.insertBefore(e, r.nextSibling) : n.appendChild(e) : n.insertBefore(e, n.firstChild), y.push(e);
        else {
            if ("bottom" !== t.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            n.appendChild(e)
        }
    }

    function s(t) {
        t.parentNode.removeChild(t);
        var e = y.indexOf(t);
        e >= 0 && y.splice(e, 1)
    }

    function a(t) {
        var e = document.createElement("style");
        return e.type = "text/css", o(t, e), e
    }

    function u(t) {
        var e = document.createElement("link");
        return e.rel = "stylesheet", o(t, e), e
    }

    function l(t, e) {
        var n, r, i;
        if (e.singleton) {
            var o = _++;
            n = v || (v = a(e)), r = c.bind(null, n, o, !1), i = c.bind(null, n, o, !0)
        } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = u(e), r = f.bind(null, n), i = function() {
            s(n), n.href && URL.revokeObjectURL(n.href)
        }) : (n = a(e), r = h.bind(null, n), i = function() {
            s(n)
        });
        return r(t),
            function(e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                    r(t = e)
                } else i()
            }
    }

    function c(t, e, n, r) {
        var i = n ? "" : r.css;
        if (t.styleSheet) t.styleSheet.cssText = b(e, i);
        else {
            var o = document.createTextNode(i),
                s = t.childNodes;
            s[e] && t.removeChild(s[e]), s.length ? t.insertBefore(o, s[e]) : t.appendChild(o)
        }
    }

    function h(t, e) {
        var n = e.css,
            r = e.media;
        if (r && t.setAttribute("media", r), t.styleSheet) t.styleSheet.cssText = n;
        else {
            for (; t.firstChild;) t.removeChild(t.firstChild);
            t.appendChild(document.createTextNode(n))
        }
    }

    function f(t, e) {
        var n = e.css,
            r = e.sourceMap;
        r && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
        var i = new Blob([n], {
                type: "text/css"
            }),
            o = t.href;
        t.href = URL.createObjectURL(i), o && URL.revokeObjectURL(o)
    }
    var d = {},
        g = function(t) {
            var e;
            return function() {
                return "undefined" == typeof e && (e = t.apply(this, arguments)), e
            }
        },
        p = g(function() {
            return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
        }),
        m = g(function() {
            return document.head || document.getElementsByTagName("head")[0]
        }),
        v = null,
        _ = 0,
        y = [];
    t.exports = function(t, e) {
        e = e || {}, "undefined" == typeof e.singleton && (e.singleton = p()), "undefined" == typeof e.insertAt && (e.insertAt = "bottom");
        var n = i(t);
        return r(n, e),
            function(t) {
                for (var o = [], s = 0; s < n.length; s++) {
                    var a = n[s],
                        u = d[a.id];
                    u.refs--, o.push(u)
                }
                t && r(i(t), e);
                for (var s = 0; s < o.length; s++) {
                    var u = o[s];
                    if (0 === u.refs) {
                        for (var l = 0; l < u.parts.length; l++) u.parts[l]();
                        delete d[u.id]
                    }
                }
            }
    };
    var b = function() {
        var t = [];
        return function(e, n) {
            return t[e] = n, t.filter(Boolean).join("\n")
        }
    }()
}, function(t, e, n) {
    var r = n(140);
    "string" == typeof r && (r = [
        [t.id, r, ""]
    ]), n(141)(r, {}), r.locals && (t.exports = r.locals)
}, function(t, e, n) {
    function r(t) {
        return n(i(t))
    }

    function i(t) {
        return o[t] || function() {
            throw new Error("Cannot find module '" + t + "'.")
        }()
    }
    var o = {
        "./StageScale": 26,
        "./StageScale.js": 26,
        "./colorscheme": 27,
        "./colorscheme.js": 27,
        "./columns": 28,
        "./columns.js": 28,
        "./config": 29,
        "./config.js": 29,
        "./package": 30,
        "./package.js": 30,
        "./selection/Selection": 8,
        "./selection/Selection.js": 8,
        "./selection/SelectionCol": 9,
        "./selection/SelectionCol.js": 9,
        "./selection/index": 49,
        "./selection/index.js": 49,
        "./user": 31,
        "./user.js": 31,
        "./visOrdering": 32,
        "./visOrdering.js": 32,
        "./visibility": 33,
        "./visibility.js": 33,
        "./zoomer": 34,
        "./zoomer.js": 34
    };
    r.keys = function() {
        return Object.keys(o)
    }, r.resolve = i, t.exports = r, r.id = 143
}, function(t, e, n) {
    function r(t) {
        return n(i(t))
    }

    function i(t) {
        return o[t] || function() {
            throw new Error("Cannot find module '" + t + "'.")
        }()
    }
    var o = {
        "./bmath": 18,
        "./bmath.js": 18,
        "./exporter": 19,
        "./exporter.js": 19,
        "./file": 20,
        "./file.js": 20,
        "./index": 38,
        "./index.js": 38,
        "./loader": 21,
        "./loader.js": 21,
        "./proxy": 22,
        "./proxy.js": 22,
        "./recognize": 39,
        "./recognize.js": 39,
        "./seqgen": 40,
        "./seqgen.js": 40,
        "./svg": 14,
        "./svg.js": 14,
        "./tree": 41,
        "./tree.js": 41
    };
    r.keys = function() {
        return Object.keys(o)
    }, r.resolve = i, t.exports = r, r.id = 144
}]);
//# sourceMappingURL=msa.js.map