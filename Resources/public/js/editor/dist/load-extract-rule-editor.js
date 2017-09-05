/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + ({"1":"trigger-extra-rule-vue-editor"}[chunkId]||chunkId) + ".async.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bundles/idcitask/js/editor/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, e) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports["vue-editor-commons"] = e() : t["vue-editor-commons"] = e();
}(undefined, function () {
  return function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;var a = n[r] = { i: r, l: !1, exports: {} };return t[r].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
    }var n = {};return e.m = t, e.c = n, e.d = function (t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: r });
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };return e.d(n, "a", n), n;
    }, e.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 6);
  }([function (t, e) {
    t.exports = function (t, e, n, r, a) {
      var o,
          i = t = t || {},
          s = _typeof(t.default);"object" !== s && "function" !== s || (o = t, i = t.default);var u = "function" == typeof i ? i.options : i;e && (u.render = e.render, u.staticRenderFns = e.staticRenderFns), r && (u._scopeId = r);var c;if (a ? (c = function c(t) {
        t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), n && n.call(this, t), t && t._registeredComponents && t._registeredComponents.add(a);
      }, u._ssrRegister = c) : n && (c = n), c) {
        var l = u.functional,
            d = l ? u.render : u.beforeCreate;l ? u.render = function (t, e) {
          return c.call(e), d(t, e);
        } : u.beforeCreate = d ? [].concat(d, c) : [c];
      }return { esModule: o, exports: i, options: u };
    };
  }, function (t, e, n) {
    "use strict";
    var r = n(9),
        a = n(0),
        o = a(r.a, null, null, null, null);e.a = o.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(22),
        a = n(0),
        o = a(r.a, null, null, null, null);e.a = o.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(23),
        a = n(0),
        o = a(r.a, null, null, null, null);e.a = o.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(5);e.a = { toJson: function toJson(t) {
        function e(t) {
          return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        }function n(t) {
          var e = t.removeLineBreaksAnsExtraSpaces().replace(/([^\\])"/g, '$1\\"');return localStorage.setItem(Object(r.e)(e), t), e;
        }function a(t, e, n, r) {
          return e + ': "' + r + '"';
        }var o = /{{(.*)?}}/g,
            i = /\[(\s*?){%([\s\S]*?)%}(\s*?)\]/g,
            s = /("([\w.|]*)"): (\[(\s*?){%([\s\S]*?)%}(\s*?)\])/g;return t.replace(o, e).replace(i, n).replace(s, a);
      }, toRaw: function toRaw(t) {
        function e(t) {
          return t.replace(/\\\\/g, "\\").replace(/\\"/g, '"');
        }function n(t) {
          var e = t.substring(1, t.length - 1);return null !== localStorage.getItem(Object(r.e)(e)) ? localStorage.getItem(Object(r.e)(e)) : e.replace(/\\"/g, '"').replace(/\\\\'/g, "\\'");
        }var a = /{{(.*)?}}/g,
            o = /"\[( {0,1}){%(.*)?%}( {0,1})\]"/g;return t.replace(o, n).replace(a, e);
      } };
  }, function (t, e, n) {
    "use strict";
    function r(t, e) {
      var n = {};for (var r in t) {
        t.hasOwnProperty(r) && e(t[r]) && (n[r] = t[r]);
      }return n;
    }function a(t, e, n) {
      var r = {};void 0 === n && (n = !0), void 0 === e && (e = []);for (var a = 0, o = e.length; a < o; a++) {
        var i = e[a];r[i] = t[i];
      }if (n) Object.keys(t).sort().forEach(function (n) {
        -1 === e.indexOf(n) && (r[n] = t[n]);
      });else for (var s in t) {
        t.hasOwnProperty(s) && -1 === e.indexOf(s) && (r[s] = t[s]);
      }return r;
    }function o() {
      return Math.random().toString(36).substr(2, 9);
    }function i(t) {
      var e = 0;if (0 === t.length) return e.toString();for (var n = 0; n < t.length; n++) {
        e = (e << 5) - e + t.charCodeAt(n), e |= 0;
      }return e.toString();
    }function s(t) {
      for (var e, n = t.attributes, r = {}, a = 0, o = n.length; a < o; a++) {
        e = n[a], r[e.nodeName] = e.nodeValue;
      }return r.value = t.value, r;
    }function u(t, e, n, r, a, o) {
      return '<div id="' + e + "-" + t + '" class="editor-modal modal fade ' + n + " " + e + '"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + r + '</h4></div><div class="modal-body">' + a + '</div><div class="modal-footer">' + (o || "") + "</div></div></div></div>";
    }n.d(e, "c", function () {
      return r;
    }), n.d(e, "f", function () {
      return a;
    }), n.d(e, "d", function () {
      return o;
    }), n.d(e, "e", function () {
      return i;
    }), n.d(e, "b", function () {
      return u;
    }), n.d(e, "a", function () {
      return s;
    }), String.prototype.removeLineBreaksAnsExtraSpaces = function () {
      return this.replace(/\r?\n|\r/g, " ").replace(/ {2,}/g, " ");
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), n.d(e, "utils", function () {
      return C;
    });var r = n(7),
        a = n(11),
        o = n(14),
        i = n(17),
        s = n(20),
        u = n(25),
        c = n(28),
        l = n(30),
        d = n(2),
        p = n(1),
        f = n(3),
        v = n(32),
        m = n(33),
        h = n(34),
        _ = n(4),
        g = n(5);n.d(e, "checkBoxComponent", function () {
      return r.a;
    }), n.d(e, "choiceComponent", function () {
      return a.a;
    }), n.d(e, "integerComponent", function () {
      return o.a;
    }), n.d(e, "numberComponent", function () {
      return i.a;
    }), n.d(e, "textComponent", function () {
      return s.a;
    }), n.d(e, "textareaComponent", function () {
      return u.a;
    }), n.d(e, "modalComponent", function () {
      return c.a;
    }), n.d(e, "httpMixin", function () {
      return l.a;
    }), n.d(e, "jsonOptionMixin", function () {
      return d.a;
    }), n.d(e, "optionMixin", function () {
      return p.a;
    }), n.d(e, "waitForItMixin", function () {
      return f.a;
    }), n.d(e, "actions", function () {
      return v.a;
    }), n.d(e, "getters", function () {
      return m.a;
    }), n.d(e, "mutations", function () {
      return h.a;
    }), n.d(e, "JsonToTwigTransformer", function () {
      return _.a;
    });var C = { filterObject: g.c, sortObject: g.f, generateUniqueId: g.d, hashCode: g.e, createBootstrapModal: g.b, createAttributeMapObject: g.a };
  }, function (t, e, n) {
    "use strict";
    var r = n(8),
        a = n(10),
        o = n(0),
        i = o(r.a, a.a, null, null, null);e.a = i.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(1);e.a = { mixins: [r.a] };
  }, function (t, e, n) {
    "use strict";
    e.a = { props: ["option", "name", "value", "required-star"], data: function data() {
        return { data: this.option.options.data };
      }, computed: { displayRequiredStar: function displayRequiredStar() {
          return this.option.options.required && this.requiredStar;
        } }, created: function created() {
        void 0 !== this.value && (this.data = this.value, "object" == _typeof(this.value) && (this.data = JSON.stringify(this.value)));
      }, watch: { value: { handler: function handler(t) {
            void 0 !== t && (this.data = t, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (this.data = JSON.stringify(t)));
          } } }, methods: { updateOption: function updateOption(t) {
          void 0 !== t && (this.data = t, this.$emit("changed", { name: this.name, value: t }));
        } } };
  }, function (t, e, n) {
    "use strict";
    var r = function r() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "form-group" }, [n("label", { attrs: { for: "name" } }, [t._v(t._s(t.name))]), t._v(" "), t.displayRequiredStar ? n("span", { staticClass: "required-star" }, [t._v("*")]) : t._e(), t._v(" "), n("div", { staticClass: "form-control-wrapper" }, [t.option.options.help ? n("span", [t._v(t._s(t.option.options.help))]) : t._e(), t._v(" "), n("input", { attrs: { required: t.option.options.required, type: "checkbox", name: t.name }, domProps: { checked: t.data }, on: { click: function click(e) {
            t.updateOption(e.target.checked);
          } } })])]);
    },
        a = [],
        o = { render: r, staticRenderFns: a };e.a = o;
  }, function (t, e, n) {
    "use strict";
    var r = n(12),
        a = n(13),
        o = n(0),
        i = o(r.a, a.a, null, null, null);e.a = i.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(1);e.a = { mixins: [r.a], watch: { value: { handler: function handler(t) {
            this.data = t;
          }, deep: !0 }, data: { handler: function handler(t) {
            this.updateOption(t);
          }, deep: !0 } } };
  }, function (t, e, n) {
    "use strict";
    var r = function r() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "form-group" }, [n("label", { attrs: { for: t.name } }, [t._v(t._s(t.name))]), t._v(" "), t.displayRequiredStar ? n("span", { staticClass: "required-star" }, [t._v("*")]) : t._e(), t._v(" "), n("div", { staticClass: "form-control-wrapper" }, [t.option.options.help ? n("span", [t._v(t._s(t.option.options.help))]) : t._e(), t._v(" "), n("select", { directives: [{ name: "model", rawName: "v-model", value: t.data, expression: "data" }], staticClass: "form-control", attrs: { required: t.option.options.required, name: t.name }, on: { change: function change(e) {
            var n = Array.prototype.filter.call(e.target.options, function (t) {
              return t.selected;
            }).map(function (t) {
              return "_value" in t ? t._value : t.value;
            });t.data = e.target.multiple ? n : n[0];
          } } }, t._l(t.option.options.choices, function (e, r) {
        return n("option", { domProps: { value: r } }, [t._v(t._s(e))]);
      }))])]);
    },
        a = [],
        o = { render: r, staticRenderFns: a };e.a = o;
  }, function (t, e, n) {
    "use strict";
    var r = n(15),
        a = n(16),
        o = n(0),
        i = o(r.a, a.a, null, null, null);e.a = i.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(1);e.a = { mixins: [r.a] };
  }, function (t, e, n) {
    "use strict";
    var r = function r() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "form-group" }, [n("label", { attrs: { for: t.name } }, [t._v(t._s(t.name))]), t._v(" "), t.displayRequiredStar ? n("span", { staticClass: "required-star" }, [t._v("*")]) : t._e(), t._v(" "), n("div", { staticClass: "form-control-wrapper" }, [t.option.options.help ? n("span", [t._v(t._s(t.option.options.help))]) : t._e(), t._v(" "), n("input", { staticClass: "form-control", attrs: { required: t.option.options.required, type: "number", name: t.name }, domProps: { value: t.data }, on: { input: function input(e) {
            t.updateOption(e.target.value);
          } } })])]);
    },
        a = [],
        o = { render: r, staticRenderFns: a };e.a = o;
  }, function (t, e, n) {
    "use strict";
    var r = n(18),
        a = n(19),
        o = n(0),
        i = o(r.a, a.a, null, null, null);e.a = i.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(1);e.a = { mixins: [r.a] };
  }, function (t, e, n) {
    "use strict";
    var r = function r() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "form-group" }, [n("label", { attrs: { for: t.name } }, [t._v(t._s(t.name))]), t._v(" "), t.displayRequiredStar ? n("span", { staticClass: "required-star" }, [t._v("*")]) : t._e(), t._v(" "), n("div", { staticClass: "form-control-wrapper" }, [t.option.options.help ? n("span", [t._v(t._s(t.option.options.help))]) : t._e(), t._v(" "), n("input", { staticClass: "form-control", attrs: { required: t.option.options.required, type: "text", name: t.name }, domProps: { value: t.data }, on: { input: function input(e) {
            t.updateOption(e.target.value);
          } } })])]);
    },
        a = [],
        o = { render: r, staticRenderFns: a };e.a = o;
  }, function (t, e, n) {
    "use strict";
    var r = n(21),
        a = n(24),
        o = n(0),
        i = o(r.a, a.a, null, null, null);e.a = i.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(2);e.a = { mixins: [r.a] };
  }, function (t, e, n) {
    "use strict";
    var r = n(1),
        a = n(3),
        o = n(4);e.a = { mixins: [r.a, a.a], data: function data() {
        return { classes: "" };
      }, created: function created() {
        "object" == _typeof(this.value) && (this.data = o.a.toRaw(JSON.stringify(this.value, null, 4)), this.setJsonAttemptClass(this.data));
      }, watch: { value: { handler: function handler(t) {
            "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (this.data = o.a.toRaw(JSON.stringify(t, null, 4)), this.setJsonAttemptClass(this.data));
          } } }, methods: { onOptionValueChanged: function onOptionValueChanged(t) {
          var e = this;return new Promise(function (n) {
            e.waitForIt(function () {
              e.updateOption(t), e.setJsonAttemptClass(t), n();
            }, 300);
          });
        }, setJsonAttemptClass: function setJsonAttemptClass(t) {
          if (0 === t.indexOf("{{") || 0 !== t.indexOf("{") && 0 !== t.indexOf("[")) this.classes = "";else try {
            JSON.parse(o.a.toJson(t)), this.classes = "fa fa-check success feedback";
          } catch (t) {
            this.classes = "fa fa-exclamation-circle warning feedback";
          }
        } } };
  }, function (t, e, n) {
    "use strict";
    e.a = { data: function data() {
        return { timeout: null };
      }, methods: { waitForIt: function waitForIt(t, e) {
          void 0 === e && (e = 500), clearTimeout(this.timeout), this.timeout = setTimeout(t, e);
        } } };
  }, function (t, e, n) {
    "use strict";
    var r = function r() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "form-group" }, [n("label", { attrs: { for: t.name } }, [t._v("\n    " + t._s(t.name) + "\n    "), n("i", { class: t.classes, attrs: { "aria-hidden": "true" } })]), t._v(" "), t.displayRequiredStar ? n("span", { staticClass: "required-star" }, [t._v("*")]) : t._e(), t._v(" "), n("div", { staticClass: "form-control-wrapper" }, [t.option.options.help ? n("span", [t._v(t._s(t.option.options.help))]) : t._e(), t._v(" "), n("input", { staticClass: "form-control", attrs: { required: t.option.options.required, type: "text", name: t.name }, domProps: { value: t.data }, on: { input: function input(e) {
            t.onOptionValueChanged(e.target.value);
          } } })])]);
    },
        a = [],
        o = { render: r, staticRenderFns: a };e.a = o;
  }, function (t, e, n) {
    "use strict";
    var r = n(26),
        a = n(27),
        o = n(0),
        i = o(r.a, a.a, null, null, null);e.a = i.exports;
  }, function (t, e, n) {
    "use strict";
    var r = n(2);e.a = { mixins: [r.a] };
  }, function (t, e, n) {
    "use strict";
    var r = function r() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("div", { staticClass: "form-group" }, [n("label", { attrs: { for: t.name } }, [t._v("\n    " + t._s(t.name) + "\n    "), n("i", { class: t.classes, attrs: { "aria-hidden": "true" } })]), t._v(" "), t.displayRequiredStar ? n("span", { staticClass: "required-star" }, [t._v("*")]) : t._e(), t._v(" "), n("div", { staticClass: "form-control-wrapper" }, [t.option.options.help ? n("span", [t._v(t._s(t.option.options.help))]) : t._e(), t._v(" "), n("textarea", { staticClass: "form-control", attrs: { required: t.option.options.required, name: t.name }, domProps: { value: t.data }, on: { input: function input(e) {
            t.onOptionValueChanged(e.target.value);
          } } })])]);
    },
        a = [],
        o = { render: r, staticRenderFns: a };e.a = o;
  }, function (t, e, n) {
    "use strict";
    var r = n(29),
        a = n(0),
        o = a(null, r.a, null, null, null);e.a = o.exports;
  }, function (t, e, n) {
    "use strict";
    var r = function r() {
      var t = this,
          e = t.$createElement,
          n = t._self._c || e;return n("transition", { attrs: { name: "modal" } }, [n("div", { staticClass: "vue-modal-mask" }, [n("div", { staticClass: "vue-modal-container" }, [n("div", { staticClass: "vue-modal-header" }, [t._t("header")], 2), t._v(" "), n("div", { staticClass: "vue-modal-body" }, [t._t("body")], 2), t._v(" "), n("div", { staticClass: "vue-modal-footer" }, [t._t("footer")], 2)])])]);
    },
        a = [],
        o = { render: r, staticRenderFns: a };e.a = o;
  }, function (t, e, n) {
    "use strict";
    var r = n(31),
        a = n(0),
        o = a(r.a, null, null, null, null);e.a = o.exports;
  }, function (t, e, n) {
    "use strict";
    e.a = { methods: { handleGetRequest: function handleGetRequest(t, e) {
          var n = this,
              r = this.$store.getters.getCachedResource(t);if (r) return e(r);this.$http.get(t).then(function (t) {
            return t.json();
          }, function () {
            return null;
          }).then(function (r) {
            return n.$store.commit({ type: "cache", api_url: t, api_response: r }), e(r);
          });
        } } };
  }, function (t, e, n) {
    "use strict";
    var r = { handleGetRequest: function handleGetRequest(t, e, n, r) {
        var a = e.getters.getCachedResource(t);if (a) return r(a);n.get(t).then(function (t) {
          return t.json();
        }, function () {
          return null;
        }).then(function (n) {
          return e.commit({ type: "cache", api_url: t, api_response: n }), r(n);
        }, function () {
          return r();
        });
      } };e.a = r;
  }, function (t, e, n) {
    "use strict";
    e.a = { editorId: function editorId(t) {
        return t.configuration.editorId;
      }, getCachedResource: function getCachedResource(t) {
        return function (e) {
          return t.apiCache[e];
        };
      } };
  }, function (t, e, n) {
    "use strict";
    e.a = { cache: function cache(t, e) {
        t.apiCache[e.api_url] = e.api_response;
      } };
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _loadEditors = __webpack_require__(3);

(0, _loadEditors.loadEditors)();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadEditors", function() { return loadEditors; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_editor_commons__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_editor_commons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_editor_commons__);


/**
 * Loads extract rule editors for all HTML elements that have extract-rule-editor as class.
 */
function loadEditors() {

  var extractRuleEditors = document.querySelectorAll('.extract-rule-editor');

  [].forEach.call(extractRuleEditors, function(element) {
    __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 6)).then(function (app) {
      var editorComponentId = 'extract_rule_editor_' + element.id;

      // Return if the component already exists.
      if (document.getElementById(editorComponentId)) {
        return;
      }

      // Retrieve the textarea attributes and value
      var formProperties = __WEBPACK_IMPORTED_MODULE_0_vue_editor_commons__["utils"].createAttributeMapObject(element);
      var configuration = window[formProperties['data-configuration-variable']];

      element.style.display = 'none';

      // Insert the editor right after the current element
      var editor = document.createElement('div');
      editor.id = editorComponentId;
      editor.innerHTML = '<extract-rule-editor></extract-rule-editor>';

      element.parentNode.insertBefore(editor, element.nextSibling);
      app.triggerVueEditor('#' + editorComponentId, configuration, formProperties);
    });
  });
};




/***/ })
/******/ ]);
//# sourceMappingURL=load-extract-rule-editor.js.map