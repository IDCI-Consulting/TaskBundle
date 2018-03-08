webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.triggerVueEditor=undefined;var _vue=__webpack_require__(16);var _vue2=_interopRequireDefault(_vue);var _vuex=__webpack_require__(24);var _vuex2=_interopRequireDefault(_vuex);var _vueMultiselect=__webpack_require__(14);var _vueMultiselect2=_interopRequireDefault(_vueMultiselect);var _vueResource=__webpack_require__(25);var _vueResource2=_interopRequireDefault(_vueResource);var _vue2Collapse=__webpack_require__(27);var _vue2Collapse2=_interopRequireDefault(_vue2Collapse);var _editor=__webpack_require__(63);var _editor2=_interopRequireDefault(_editor);var _getters=__webpack_require__(75);var _getters2=_interopRequireDefault(_getters);var _mutations=__webpack_require__(76);var _mutations2=_interopRequireDefault(_mutations);var _actions=__webpack_require__(77);var _actions2=_interopRequireDefault(_actions);var _vueEditorCommons=__webpack_require__(0);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * Trigger the extract rule Vue editor.
 *
 * @param {(string|Object)} element - The DOM element to trigger the editor
 * @param {Object} configuration - Object containing the editor configuration (api url, etc)
 * @param {Object} formProperties - Object containing the properties of the default form
 */function triggerVueEditor(element,configuration,formProperties){_vue2.default.use(_vuex2.default);_vue2.default.use(_vueResource2.default);_vue2.default.use(_vue2Collapse2.default);_vue2.default.component('extract-rule-editor',_editor2.default);/**
   * The common state
   */var extractRuleEditorStore=new _vuex2.default.Store({state:{configuration:configuration,formProperties:formProperties,extractRuleList:[],apiCache:{},usedExtractRule:{}},getters:Object.assign(_getters2.default,_vueEditorCommons.getters),mutations:Object.assign(_mutations2.default,_vueEditorCommons.mutations),actions:Object.assign(_actions2.default,_vueEditorCommons.actions)});/**
   * The app
   */new _vue2.default({el:element,store:extractRuleEditorStore,/**
     * Call the APIs before creating the app
     */beforeCreate:function beforeCreate(){var _this=this;extractRuleEditorStore.dispatch('setExtractRules',this.$http).then(function(){_this.$store.getters.getExtractRuleList.forEach(function(element,index){_this.$store.dispatch('setExtractRuleData',{http:_this.$http,extractRuleName:element.name}).then(function(){_this.$store.commit('cleanUsedParameters');});});});},created:function created(){this.$store.commit('initializeUsedExtractRule');}});}exports.triggerVueEditor=triggerVueEditor;

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/// css base code, injected by the css-loader
module.exports=function(useSourceMap){var list=[];// return the list of modules as css string
list.toString=function toString(){return this.map(function(item){var content=cssWithMappingToString(item,useSourceMap);if(item[2]){return"@media "+item[2]+"{"+content+"}";}else{return content;}}).join("");};// import a list of modules into the list
list.i=function(modules,mediaQuery){if(typeof modules==="string")modules=[[null,modules,""]];var alreadyImportedModules={};for(var i=0;i<this.length;i++){var id=this[i][0];if(typeof id==="number")alreadyImportedModules[id]=true;}for(i=0;i<modules.length;i++){var item=modules[i];// skip already imported module
// this implementation is not 100% perfect for weird media query combinations
//  when a module is imported multiple times with different media queries.
//  I hope this will never occur (Hey this way we have smaller bundles)
if(typeof item[0]!=="number"||!alreadyImportedModules[item[0]]){if(mediaQuery&&!item[2]){item[2]=mediaQuery;}else if(mediaQuery){item[2]="("+item[2]+") and ("+mediaQuery+")";}list.push(item);}}};return list;};function cssWithMappingToString(item,useSourceMap){var content=item[1]||'';var cssMapping=item[3];if(!cssMapping){return content;}if(useSourceMap&&typeof btoa==='function'){var sourceMapping=toComment(cssMapping);var sourceURLs=cssMapping.sources.map(function(source){return'/*# sourceURL='+cssMapping.sourceRoot+source+' */';});return[content].concat(sourceURLs).concat([sourceMapping]).join('\n');}return[content].join('\n');}// Adapted from convert-source-map (MIT)
function toComment(sourceMap){// eslint-disable-next-line no-undef
var base64=btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));var data='sourceMappingURL=data:application/json;charset=utf-8;base64,'+base64;return'/*# '+data+' */';}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(31)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// shim for using process in browser
var process=module.exports={};// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error('setTimeout has not been defined');}function defaultClearTimeout(){throw new Error('clearTimeout has not been defined');}(function(){try{if(typeof setTimeout==='function'){cachedSetTimeout=setTimeout;}else{cachedSetTimeout=defaultSetTimout;}}catch(e){cachedSetTimeout=defaultSetTimout;}try{if(typeof clearTimeout==='function'){cachedClearTimeout=clearTimeout;}else{cachedClearTimeout=defaultClearTimeout;}}catch(e){cachedClearTimeout=defaultClearTimeout;}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){//normal enviroments in sane situations
return setTimeout(fun,0);}// if setTimeout wasn't available but was latter defined
if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun,0);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return cachedSetTimeout.call(null,fun,0);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return cachedSetTimeout.call(this,fun,0);}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){//normal enviroments in sane situations
return clearTimeout(marker);}// if clearTimeout wasn't available but was latter defined
if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker);}try{// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);}catch(e){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return cachedClearTimeout.call(null,marker);}catch(e){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return cachedClearTimeout.call(this,marker);}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else{queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;runClearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue);}};// v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version='';// empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[];};process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return'/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};var g;// This works in non-strict mode
g=function(){return this;}();try{// This works if eval is allowed (see CSP)
g=g||Function("return this")()||(1,eval)("this");}catch(e){// This works if the window reference is available
if((typeof window==="undefined"?"undefined":_typeof(window))==="object")g=window;}// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}
module.exports=g;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Default configuration
var prefix='v-collapse';var basename='collapse';var defaults={'prefix':prefix,'basename':basename,'togglerClassDefault':prefix+'-toggler','contentClassDefault':prefix+'-content','contentClassEnd':prefix+'-content-end'};// Global toggle methods
var toggleElement=function toggleElement(target,config){target.classList.toggle(config.contentClassEnd);};var closeElement=function closeElement(target,config){target.classList.remove(config.contentClassEnd);};var openElement=function openElement(target,config){target.classList.add(config.contentClassEnd);};module.exports={defaults:defaults,toggleElement:toggleElement,closeElement:closeElement,openElement:openElement};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};!function(e,t){"object"==( false?"undefined":_typeof(exports))&&"object"==( false?"undefined":_typeof(module))?module.exports=t(): true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?exports.VueMultiselect=t():e.VueMultiselect=t();}(undefined,function(){return function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports;}var i={};return t.m=e,t.c=i,t.i=function(e){return e;},t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n});},t.n=function(e){var i=e&&e.__esModule?function(){return e.default;}:function(){return e;};return t.d(i,"a",i),i;},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t);},t.p="/",t(t.s=4);}([function(e,t,i){"use strict";function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e;}function s(e){return 0!==e&&(!(!Array.isArray(e)||0!==e.length)||!e);}function o(e,t){return void 0===e&&(e="undefined"),null===e&&(e="null"),!1===e&&(e="false"),-1!==e.toString().toLowerCase().indexOf(t.trim());}function l(e,t,i,n){return e.filter(function(e){return o(n(e,i),t);});}function r(e){return e.filter(function(e){return!e.$isLabel;});}function a(e,t){return function(i){return i.reduce(function(i,n){return n[e]&&n[e].length?(i.push({$groupLabel:n[t],$isLabel:!0}),i.concat(n[e])):i;},[]);};}function u(e,t,i,s,o){return function(r){return r.map(function(r){var a;if(!r[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];var u=l(r[i],e,t,o);return u.length?(a={},n(a,s,r[s]),n(a,i,u),a):[];});};}Object.defineProperty(t,"__esModule",{value:!0});var c="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(e){return typeof e==="undefined"?"undefined":_typeof(e);}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e==="undefined"?"undefined":_typeof(e);},h=i(2),p=function(e){return e&&e.__esModule?e:{default:e};}(h),d=function d(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++){t[i]=arguments[i];}return function(e){return t.reduce(function(e,t){return t(e);},e);};};t.default={data:function data(){return{search:"",isOpen:!1,prefferedOpenDirection:"below",optimizedHeight:this.maxHeight,internalValue:this.value||0===this.value?(0,p.default)(Array.isArray(this.value)?this.value:[this.value]):[]};},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},value:{type:null,default:function _default(){return[];}},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default:function _default(e,t){return s(e)?"":t?e[t]:e;}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},blockKeys:{type:Array,default:function _default(){return[];}},preserveSearch:{type:Boolean,default:!1}},mounted:function mounted(){this.multiple||this.clearOnSelect||console.warn("[Vue-Multiselect warn]: ClearOnSelect and Multiple props can’t be both set to false."),!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false.");},computed:{filteredOptions:function filteredOptions(){var e=this.search||"",t=e.toLowerCase().trim(),i=this.options.concat();return i=this.internalSearch?this.groupValues?this.filterAndFlat(i,t,this.label):l(i,t,this.label,this.customLabel):this.groupValues?a(this.groupValues,this.groupLabel)(i):i,i=this.hideSelected?i.filter(this.isNotSelected):i,this.taggable&&t.length&&!this.isExistingOption(t)&&("bottom"===this.tagPosition?i.push({isTag:!0,label:e}):i.unshift({isTag:!0,label:e})),i.slice(0,this.optionsLimit);},valueKeys:function valueKeys(){var e=this;return this.trackBy?this.internalValue.map(function(t){return t[e.trackBy];}):this.internalValue;},optionKeys:function optionKeys(){var e=this;return(this.groupValues?this.flatAndStrip(this.options):this.options).map(function(t){return e.customLabel(t,e.label).toString().toLowerCase();});},currentOptionLabel:function currentOptionLabel(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder;}},watch:{internalValue:function internalValue(e,t){this.resetAfter&&this.internalValue.length&&(this.search="",this.internalValue=[]);},search:function search(){this.$emit("search-change",this.search,this.id);},value:function value(e){this.internalValue=this.getInternalValue(e);}},methods:{getValue:function getValue(){return this.multiple?(0,p.default)(this.internalValue):0===this.internalValue.length?null:(0,p.default)(this.internalValue[0]);},getInternalValue:function getInternalValue(e){return null===e||void 0===e?[]:this.multiple?(0,p.default)(e):(0,p.default)([e]);},filterAndFlat:function filterAndFlat(e,t,i){return d(u(t,i,this.groupValues,this.groupLabel,this.customLabel),a(this.groupValues,this.groupLabel))(e);},flatAndStrip:function flatAndStrip(e){return d(a(this.groupValues,this.groupLabel),r)(e);},updateSearch:function updateSearch(e){this.search=e;},isExistingOption:function isExistingOption(e){return!!this.options&&this.optionKeys.indexOf(e)>-1;},isSelected:function isSelected(e){var t=this.trackBy?e[this.trackBy]:e;return this.valueKeys.indexOf(t)>-1;},isNotSelected:function isNotSelected(e){return!this.isSelected(e);},getOptionLabel:function getOptionLabel(e){if(s(e))return"";if(e.isTag)return e.label;if(e.$isLabel)return e.$groupLabel;var t=this.customLabel(e,this.label);return s(t)?"":t;},select:function select(e,t){if(!(-1!==this.blockKeys.indexOf(t)||this.disabled||e.$isLabel||e.$isDisabled)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==t||this.pointerDirty)){if(e.isTag)this.$emit("tag",e.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(e))return void("Tab"!==t&&this.removeElement(e));this.multiple?this.internalValue.push(e):this.internalValue=[e],this.$emit("select",(0,p.default)(e),this.id),this.$emit("input",this.getValue(),this.id),this.clearOnSelect&&(this.search="");}this.closeOnSelect&&this.deactivate();}},removeElement:function removeElement(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.disabled){if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();var i="object"===(void 0===e?"undefined":c(e))?this.valueKeys.indexOf(e[this.trackBy]):this.valueKeys.indexOf(e);this.internalValue.splice(i,1),this.$emit("input",this.getValue(),this.id),this.$emit("remove",(0,p.default)(e),this.id),this.closeOnSelect&&t&&this.deactivate();}},removeLastElement:function removeLastElement(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.removeElement(this.internalValue[this.internalValue.length-1],!1);},activate:function activate(){var e=this;this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.$nextTick(function(){return e.$refs.search.focus();})):this.$el.focus(),this.$emit("open",this.id));},deactivate:function deactivate(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search.blur():this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id));},toggle:function toggle(){this.isOpen?this.deactivate():this.activate();},adjustPosition:function adjustPosition(){if("undefined"!=typeof window){var e=this.$el.getBoundingClientRect().top,t=window.innerHeight-this.$el.getBoundingClientRect().bottom;t>this.maxHeight||t>e||"below"===this.openDirection||"bottom"===this.openDirection?(this.prefferedOpenDirection="below",this.optimizedHeight=Math.min(t-40,this.maxHeight)):(this.prefferedOpenDirection="above",this.optimizedHeight=Math.min(e-40,this.maxHeight));}}}};},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function data(){return{pointer:0,pointerDirty:!1};},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition:function pointerPosition(){return this.pointer*this.optionHeight;},visibleElements:function visibleElements(){return this.optimizedHeight/this.optionHeight;}},watch:{filteredOptions:function filteredOptions(){this.pointerAdjust();},isOpen:function isOpen(){this.pointerDirty=!1;}},methods:{optionHighlight:function optionHighlight(e,t){return{"multiselect__option--highlight":e===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(t)};},addPointerElement:function addPointerElement(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Enter",t=e.key;this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],t),this.pointerReset();},pointerForward:function pointerForward(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer].$isLabel&&this.pointerForward()),this.pointerDirty=!0;},pointerBackward:function pointerBackward(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer].$isLabel&&this.pointerBackward()):this.filteredOptions[0].$isLabel&&this.pointerForward(),this.pointerDirty=!0;},pointerReset:function pointerReset(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0));},pointerAdjust:function pointerAdjust(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0);},pointerSet:function pointerSet(e){this.pointer=e,this.pointerDirty=!0;}}};},function(e,t,i){"use strict";function n(e){if(Array.isArray(e))return e.map(n);if(e&&"object"===(void 0===e?"undefined":s(e))){for(var t={},i=Object.keys(e),o=0,l=i.length;o<l;o++){var r=i[o];t[r]=n(e[r]);}return t;}return e;}Object.defineProperty(t,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==_typeof(Symbol.iterator)?function(e){return typeof e==="undefined"?"undefined":_typeof(e);}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e==="undefined"?"undefined":_typeof(e);};t.default=n;},function(e,t,i){"use strict";function n(e){i(6);}Object.defineProperty(t,"__esModule",{value:!0});var s=i(5),o=i.n(s),l=i(8),r=i(7),a=n,u=r(o.a,l.a,!1,a,null,null);t.default=u.exports;},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0}),t.deepClone=t.pointerMixin=t.multiselectMixin=t.Multiselect=void 0;var s=i(3),o=n(s),l=i(0),r=n(l),a=i(1),u=n(a),c=i(2),h=n(c);t.default=o.default,t.Multiselect=o.default,t.multiselectMixin=r.default,t.pointerMixin=u.default,t.deepClone=h.default;},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e};}Object.defineProperty(t,"__esModule",{value:!0});var s=i(0),o=n(s),l=i(1),r=n(l);t.default={name:"vue-multiselect",mixins:[o.default,r.default],props:{name:{type:String,default:""},selectLabel:{type:String,default:"Press enter to select"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:function _default(e){return"and "+e+" more";}},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{visibleValue:function visibleValue(){return this.multiple?this.internalValue.slice(0,this.limit):[];},deselectLabelText:function deselectLabelText(){return this.showLabels?this.deselectLabel:"";},selectLabelText:function selectLabelText(){return this.showLabels?this.selectLabel:"";},selectedLabelText:function selectedLabelText(){return this.showLabels?this.selectedLabel:"";},inputStyle:function inputStyle(){if(this.multiple&&this.value&&this.value.length)return this.isOpen?{width:"auto"}:{width:"0",position:"absolute"};},contentStyle:function contentStyle(){return this.options.length?{display:"inline-block"}:{display:"block"};},isAbove:function isAbove(){return"above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.prefferedOpenDirection;}}};},function(e,t){},function(e,t){e.exports=function(e,t,i,n,s,o){var l,r=e=e||{},a=_typeof(e.default);"object"!==a&&"function"!==a||(l=e,r=e.default);var u="function"==typeof r?r.options:r;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),i&&(u.functional=!0),s&&(u._scopeId=s);var c;if(o?(c=function c(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o);},u._ssrRegister=c):n&&(c=n),c){var h=u.functional,p=h?u.render:u.beforeCreate;h?(u._injectStyles=c,u.render=function(e,t){return c.call(t),p(e,t);}):u.beforeCreate=p?[].concat(p,c):[c];}return{esModule:l,exports:r,options:u};};},function(e,t,i){"use strict";var n=function n(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"multiselect",class:{"multiselect--active":e.isOpen,"multiselect--disabled":e.disabled,"multiselect--above":e.isAbove},attrs:{tabindex:e.searchable?-1:e.tabindex},on:{focus:function focus(t){e.activate();},blur:function blur(t){!e.searchable&&e.deactivate();},keydown:[function(t){return"button"in t||!e._k(t.keyCode,"down",40,t.key)?t.target!==t.currentTarget?null:(t.preventDefault(),void e.pointerForward()):null;},function(t){return"button"in t||!e._k(t.keyCode,"up",38,t.key)?t.target!==t.currentTarget?null:(t.preventDefault(),void e.pointerBackward()):null;},function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key)||!e._k(t.keyCode,"tab",9,t.key)?(t.stopPropagation(),t.target!==t.currentTarget?null:void e.addPointerElement(t)):null;}],keyup:function keyup(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key))return null;e.deactivate();}}},[e._t("caret",[i("div",{staticClass:"multiselect__select",on:{mousedown:function mousedown(t){t.preventDefault(),t.stopPropagation(),e.toggle();}}})],{toggle:e.toggle}),e._v(" "),e._t("clear",null,{search:e.search}),e._v(" "),i("div",{ref:"tags",staticClass:"multiselect__tags"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.visibleValue.length>0,expression:"visibleValue.length > 0"}],staticClass:"multiselect__tags-wrap"},[e._l(e.visibleValue,function(t){return[e._t("tag",[i("span",{staticClass:"multiselect__tag"},[i("span",{domProps:{textContent:e._s(e.getOptionLabel(t))}}),e._v(" "),i("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keydown:function keydown(i){if(!("button"in i)&&e._k(i.keyCode,"enter",13,i.key))return null;i.preventDefault(),e.removeElement(t);},mousedown:function mousedown(i){i.preventDefault(),e.removeElement(t);}}})])],{option:t,search:e.search,remove:e.removeElement})];})],2),e._v(" "),e.internalValue&&e.internalValue.length>e.limit?[i("strong",{staticClass:"multiselect__strong",domProps:{textContent:e._s(e.limitText(e.internalValue.length-e.limit))}})]:e._e(),e._v(" "),i("transition",{attrs:{name:"multiselect__loading"}},[e._t("loading",[i("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"multiselect__spinner"})])],2),e._v(" "),e.searchable?i("input",{ref:"search",staticClass:"multiselect__input",style:e.inputStyle,attrs:{name:e.name,id:e.id,type:"text",autocomplete:"off",placeholder:e.placeholder,disabled:e.disabled,tabindex:e.tabindex},domProps:{value:e.isOpen?e.search:e.currentOptionLabel},on:{input:function input(t){e.updateSearch(t.target.value);},focus:function focus(t){t.preventDefault(),e.activate();},blur:function blur(t){t.preventDefault(),e.deactivate();},keyup:function keyup(t){if(!("button"in t)&&e._k(t.keyCode,"esc",27,t.key))return null;e.deactivate();},keydown:[function(t){if(!("button"in t)&&e._k(t.keyCode,"down",40,t.key))return null;t.preventDefault(),e.pointerForward();},function(t){if(!("button"in t)&&e._k(t.keyCode,"up",38,t.key))return null;t.preventDefault(),e.pointerBackward();},function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key)?(t.preventDefault(),t.stopPropagation(),t.target!==t.currentTarget?null:void e.addPointerElement(t)):null;},function(t){if(!("button"in t)&&e._k(t.keyCode,"delete",[8,46],t.key))return null;t.stopPropagation(),e.removeLastElement();}]}}):e._e(),e._v(" "),e.searchable?e._e():i("span",{staticClass:"multiselect__single",domProps:{textContent:e._s(e.currentOptionLabel)},on:{mousedown:function mousedown(t){t.preventDefault(),e.toggle(t);}}})],2),e._v(" "),i("transition",{attrs:{name:"multiselect"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content-wrapper",style:{maxHeight:e.optimizedHeight+"px"},on:{focus:e.activate,mousedown:function mousedown(e){e.preventDefault();}}},[i("ul",{staticClass:"multiselect__content",style:e.contentStyle},[e._t("beforeList"),e._v(" "),e.multiple&&e.max===e.internalValue.length?i("li",[i("span",{staticClass:"multiselect__option"},[e._t("maxElements",[e._v("Maximum of "+e._s(e.max)+" options selected. First remove a selected option to select another.")])],2)]):e._e(),e._v(" "),!e.max||e.internalValue.length<e.max?e._l(e.filteredOptions,function(t,n){return i("li",{key:n,staticClass:"multiselect__element"},[t&&(t.$isLabel||t.$isDisabled)?e._e():i("span",{staticClass:"multiselect__option",class:e.optionHighlight(n,t),attrs:{"data-select":t&&t.isTag?e.tagPlaceholder:e.selectLabelText,"data-selected":e.selectedLabelText,"data-deselect":e.deselectLabelText},on:{click:function click(i){i.stopPropagation(),e.select(t);},mouseenter:function mouseenter(t){if(t.target!==t.currentTarget)return null;e.pointerSet(n);}}},[e._t("option",[i("span",[e._v(e._s(e.getOptionLabel(t)))])],{option:t,search:e.search})],2),e._v(" "),t&&(t.$isLabel||t.$isDisabled)?i("span",{staticClass:"multiselect__option multiselect__option--disabled",class:e.optionHighlight(n,t)},[e._t("option",[i("span",[e._v(e._s(e.getOptionLabel(t)))])],{option:t,search:e.search})],2):e._e()]);}):e._e(),e._v(" "),i("li",{directives:[{name:"show",rawName:"v-show",value:e.showNoResults&&0===e.filteredOptions.length&&e.search&&!e.loading,expression:"showNoResults && (filteredOptions.length === 0 && search && !loading)"}]},[i("span",{staticClass:"multiselect__option"},[e._t("noResult",[e._v("No elements found. Consider changing the search query.")])],2)]),e._v(" "),e._t("afterList")],2)])])],2);},s=[],o={render:n,staticRenderFns:s};t.a=o;}]);});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(35);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 *//*  */var emptyObject=Object.freeze({});// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v){return v===undefined||v===null;}function isDef(v){return v!==undefined&&v!==null;}function isTrue(v){return v===true;}function isFalse(v){return v===false;}/**
 * Check if value is primitive
 */function isPrimitive(value){return typeof value==='string'||typeof value==='number'||// $flow-disable-line
(typeof value==='undefined'?'undefined':_typeof(value))==='symbol'||typeof value==='boolean';}/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */function isObject(obj){return obj!==null&&(typeof obj==='undefined'?'undefined':_typeof(obj))==='object';}/**
 * Get the raw type string of a value e.g. [object Object]
 */var _toString=Object.prototype.toString;function toRawType(value){return _toString.call(value).slice(8,-1);}/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */function isPlainObject(obj){return _toString.call(obj)==='[object Object]';}function isRegExp(v){return _toString.call(v)==='[object RegExp]';}/**
 * Check if val is a valid array index.
 */function isValidArrayIndex(val){var n=parseFloat(String(val));return n>=0&&Math.floor(n)===n&&isFinite(val);}/**
 * Convert a value to a string that is actually rendered.
 */function toString(val){return val==null?'':(typeof val==='undefined'?'undefined':_typeof(val))==='object'?JSON.stringify(val,null,2):String(val);}/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */function toNumber(val){var n=parseFloat(val);return isNaN(n)?val:n;}/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */function makeMap(str,expectsLowerCase){var map=Object.create(null);var list=str.split(',');for(var i=0;i<list.length;i++){map[list[i]]=true;}return expectsLowerCase?function(val){return map[val.toLowerCase()];}:function(val){return map[val];};}/**
 * Check if a tag is a built-in tag.
 */var isBuiltInTag=makeMap('slot,component',true);/**
 * Check if a attribute is a reserved attribute.
 */var isReservedAttribute=makeMap('key,ref,slot,slot-scope,is');/**
 * Remove an item from an array
 */function remove(arr,item){if(arr.length){var index=arr.indexOf(item);if(index>-1){return arr.splice(index,1);}}}/**
 * Check whether the object has the property.
 */var hasOwnProperty=Object.prototype.hasOwnProperty;function hasOwn(obj,key){return hasOwnProperty.call(obj,key);}/**
 * Create a cached version of a pure function.
 */function cached(fn){var cache=Object.create(null);return function cachedFn(str){var hit=cache[str];return hit||(cache[str]=fn(str));};}/**
 * Camelize a hyphen-delimited string.
 */var camelizeRE=/-(\w)/g;var camelize=cached(function(str){return str.replace(camelizeRE,function(_,c){return c?c.toUpperCase():'';});});/**
 * Capitalize a string.
 */var capitalize=cached(function(str){return str.charAt(0).toUpperCase()+str.slice(1);});/**
 * Hyphenate a camelCase string.
 */var hyphenateRE=/\B([A-Z])/g;var hyphenate=cached(function(str){return str.replace(hyphenateRE,'-$1').toLowerCase();});/**
 * Simple bind, faster than native
 */function bind(fn,ctx){function boundFn(a){var l=arguments.length;return l?l>1?fn.apply(ctx,arguments):fn.call(ctx,a):fn.call(ctx);}// record original fn length
boundFn._length=fn.length;return boundFn;}/**
 * Convert an Array-like object to a real Array.
 */function toArray(list,start){start=start||0;var i=list.length-start;var ret=new Array(i);while(i--){ret[i]=list[i+start];}return ret;}/**
 * Mix properties into target object.
 */function extend(to,_from){for(var key in _from){to[key]=_from[key];}return to;}/**
 * Merge an Array of Objects into a single Object.
 */function toObject(arr){var res={};for(var i=0;i<arr.length;i++){if(arr[i]){extend(res,arr[i]);}}return res;}/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */function noop(a,b,c){}/**
 * Always return false.
 */var no=function no(a,b,c){return false;};/**
 * Return same value
 */var identity=function identity(_){return _;};/**
 * Generate a static keys string from compiler modules.
 */function genStaticKeys(modules){return modules.reduce(function(keys,m){return keys.concat(m.staticKeys||[]);},[]).join(',');}/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */function looseEqual(a,b){if(a===b){return true;}var isObjectA=isObject(a);var isObjectB=isObject(b);if(isObjectA&&isObjectB){try{var isArrayA=Array.isArray(a);var isArrayB=Array.isArray(b);if(isArrayA&&isArrayB){return a.length===b.length&&a.every(function(e,i){return looseEqual(e,b[i]);});}else if(!isArrayA&&!isArrayB){var keysA=Object.keys(a);var keysB=Object.keys(b);return keysA.length===keysB.length&&keysA.every(function(key){return looseEqual(a[key],b[key]);});}else{/* istanbul ignore next */return false;}}catch(e){/* istanbul ignore next */return false;}}else if(!isObjectA&&!isObjectB){return String(a)===String(b);}else{return false;}}function looseIndexOf(arr,val){for(var i=0;i<arr.length;i++){if(looseEqual(arr[i],val)){return i;}}return-1;}/**
 * Ensure a function is called only once.
 */function once(fn){var called=false;return function(){if(!called){called=true;fn.apply(this,arguments);}};}var SSR_ATTR='data-server-rendered';var ASSET_TYPES=['component','directive','filter'];var LIFECYCLE_HOOKS=['beforeCreate','created','beforeMount','mounted','beforeUpdate','updated','beforeDestroy','destroyed','activated','deactivated','errorCaptured'];/*  */var config={/**
   * Option merge strategies (used in core/util/options)
   */// $flow-disable-line
optionMergeStrategies:Object.create(null),/**
   * Whether to suppress warnings.
   */silent:false,/**
   * Show production mode tip message on boot?
   */productionTip:process.env.NODE_ENV!=='production',/**
   * Whether to enable devtools
   */devtools:process.env.NODE_ENV!=='production',/**
   * Whether to record perf
   */performance:false,/**
   * Error handler for watcher errors
   */errorHandler:null,/**
   * Warn handler for watcher warns
   */warnHandler:null,/**
   * Ignore certain custom elements
   */ignoredElements:[],/**
   * Custom user key aliases for v-on
   */// $flow-disable-line
keyCodes:Object.create(null),/**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */isReservedTag:no,/**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */isReservedAttr:no,/**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */isUnknownElement:no,/**
   * Get the namespace of an element
   */getTagNamespace:noop,/**
   * Parse the real tag name for the specific platform.
   */parsePlatformTagName:identity,/**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */mustUseProp:no,/**
   * Exposed for legacy reasons
   */_lifecycleHooks:LIFECYCLE_HOOKS};/*  *//**
 * Check if a string starts with $ or _
 */function isReserved(str){var c=(str+'').charCodeAt(0);return c===0x24||c===0x5F;}/**
 * Define a property.
 */function def(obj,key,val,enumerable){Object.defineProperty(obj,key,{value:val,enumerable:!!enumerable,writable:true,configurable:true});}/**
 * Parse simple path.
 */var bailRE=/[^\w.$]/;function parsePath(path){if(bailRE.test(path)){return;}var segments=path.split('.');return function(obj){for(var i=0;i<segments.length;i++){if(!obj){return;}obj=obj[segments[i]];}return obj;};}/*  */// can we use __proto__?
var hasProto='__proto__'in{};// Browser environment sniffing
var inBrowser=typeof window!=='undefined';var inWeex=typeof WXEnvironment!=='undefined'&&!!WXEnvironment.platform;var weexPlatform=inWeex&&WXEnvironment.platform.toLowerCase();var UA=inBrowser&&window.navigator.userAgent.toLowerCase();var isIE=UA&&/msie|trident/.test(UA);var isIE9=UA&&UA.indexOf('msie 9.0')>0;var isEdge=UA&&UA.indexOf('edge/')>0;var isAndroid=UA&&UA.indexOf('android')>0||weexPlatform==='android';var isIOS=UA&&/iphone|ipad|ipod|ios/.test(UA)||weexPlatform==='ios';var isChrome=UA&&/chrome\/\d+/.test(UA)&&!isEdge;// Firefox has a "watch" function on Object.prototype...
var nativeWatch={}.watch;var supportsPassive=false;if(inBrowser){try{var opts={};Object.defineProperty(opts,'passive',{get:function get(){/* istanbul ignore next */supportsPassive=true;}});// https://github.com/facebook/flow/issues/285
window.addEventListener('test-passive',null,opts);}catch(e){}}// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;var isServerRendering=function isServerRendering(){if(_isServer===undefined){/* istanbul ignore if */if(!inBrowser&&typeof global!=='undefined'){// detect presence of vue-server-renderer and avoid
// Webpack shimming the process
_isServer=global['process'].env.VUE_ENV==='server';}else{_isServer=false;}}return _isServer;};// detect devtools
var devtools=inBrowser&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;/* istanbul ignore next */function isNative(Ctor){return typeof Ctor==='function'&&/native code/.test(Ctor.toString());}var hasSymbol=typeof Symbol!=='undefined'&&isNative(Symbol)&&typeof Reflect!=='undefined'&&isNative(Reflect.ownKeys);var _Set;/* istanbul ignore if */// $flow-disable-line
if(typeof Set!=='undefined'&&isNative(Set)){// use native Set when available.
_Set=Set;}else{// a non-standard Set polyfill that only works with primitive keys.
_Set=function(){function Set(){this.set=Object.create(null);}Set.prototype.has=function has(key){return this.set[key]===true;};Set.prototype.add=function add(key){this.set[key]=true;};Set.prototype.clear=function clear(){this.set=Object.create(null);};return Set;}();}/*  */var warn=noop;var tip=noop;var generateComponentTrace=noop;// work around flow check
var formatComponentName=noop;if(process.env.NODE_ENV!=='production'){var hasConsole=typeof console!=='undefined';var classifyRE=/(?:^|[-_])(\w)/g;var classify=function classify(str){return str.replace(classifyRE,function(c){return c.toUpperCase();}).replace(/[-_]/g,'');};warn=function warn(msg,vm){var trace=vm?generateComponentTrace(vm):'';if(config.warnHandler){config.warnHandler.call(null,msg,vm,trace);}else if(hasConsole&&!config.silent){console.error("[Vue warn]: "+msg+trace);}};tip=function tip(msg,vm){if(hasConsole&&!config.silent){console.warn("[Vue tip]: "+msg+(vm?generateComponentTrace(vm):''));}};formatComponentName=function formatComponentName(vm,includeFile){if(vm.$root===vm){return'<Root>';}var options=typeof vm==='function'&&vm.cid!=null?vm.options:vm._isVue?vm.$options||vm.constructor.options:vm||{};var name=options.name||options._componentTag;var file=options.__file;if(!name&&file){var match=file.match(/([^/\\]+)\.vue$/);name=match&&match[1];}return(name?"<"+classify(name)+">":"<Anonymous>")+(file&&includeFile!==false?" at "+file:'');};var repeat=function repeat(str,n){var res='';while(n){if(n%2===1){res+=str;}if(n>1){str+=str;}n>>=1;}return res;};generateComponentTrace=function generateComponentTrace(vm){if(vm._isVue&&vm.$parent){var tree=[];var currentRecursiveSequence=0;while(vm){if(tree.length>0){var last=tree[tree.length-1];if(last.constructor===vm.constructor){currentRecursiveSequence++;vm=vm.$parent;continue;}else if(currentRecursiveSequence>0){tree[tree.length-1]=[last,currentRecursiveSequence];currentRecursiveSequence=0;}}tree.push(vm);vm=vm.$parent;}return'\n\nfound in\n\n'+tree.map(function(vm,i){return""+(i===0?'---> ':repeat(' ',5+i*2))+(Array.isArray(vm)?formatComponentName(vm[0])+"... ("+vm[1]+" recursive calls)":formatComponentName(vm));}).join('\n');}else{return"\n\n(found in "+formatComponentName(vm)+")";}};}/*  */var uid=0;/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */var Dep=function Dep(){this.id=uid++;this.subs=[];};Dep.prototype.addSub=function addSub(sub){this.subs.push(sub);};Dep.prototype.removeSub=function removeSub(sub){remove(this.subs,sub);};Dep.prototype.depend=function depend(){if(Dep.target){Dep.target.addDep(this);}};Dep.prototype.notify=function notify(){// stabilize the subscriber list first
var subs=this.subs.slice();for(var i=0,l=subs.length;i<l;i++){subs[i].update();}};// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target=null;var targetStack=[];function pushTarget(_target){if(Dep.target){targetStack.push(Dep.target);}Dep.target=_target;}function popTarget(){Dep.target=targetStack.pop();}/*  */var VNode=function VNode(tag,data,children,text,elm,context,componentOptions,asyncFactory){this.tag=tag;this.data=data;this.children=children;this.text=text;this.elm=elm;this.ns=undefined;this.context=context;this.fnContext=undefined;this.fnOptions=undefined;this.fnScopeId=undefined;this.key=data&&data.key;this.componentOptions=componentOptions;this.componentInstance=undefined;this.parent=undefined;this.raw=false;this.isStatic=false;this.isRootInsert=true;this.isComment=false;this.isCloned=false;this.isOnce=false;this.asyncFactory=asyncFactory;this.asyncMeta=undefined;this.isAsyncPlaceholder=false;};var prototypeAccessors={child:{configurable:true}};// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */prototypeAccessors.child.get=function(){return this.componentInstance;};Object.defineProperties(VNode.prototype,prototypeAccessors);var createEmptyVNode=function createEmptyVNode(text){if(text===void 0)text='';var node=new VNode();node.text=text;node.isComment=true;return node;};function createTextVNode(val){return new VNode(undefined,undefined,undefined,String(val));}// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode,deep){var componentOptions=vnode.componentOptions;var cloned=new VNode(vnode.tag,vnode.data,vnode.children,vnode.text,vnode.elm,vnode.context,componentOptions,vnode.asyncFactory);cloned.ns=vnode.ns;cloned.isStatic=vnode.isStatic;cloned.key=vnode.key;cloned.isComment=vnode.isComment;cloned.fnContext=vnode.fnContext;cloned.fnOptions=vnode.fnOptions;cloned.fnScopeId=vnode.fnScopeId;cloned.isCloned=true;if(deep){if(vnode.children){cloned.children=cloneVNodes(vnode.children,true);}if(componentOptions&&componentOptions.children){componentOptions.children=cloneVNodes(componentOptions.children,true);}}return cloned;}function cloneVNodes(vnodes,deep){var len=vnodes.length;var res=new Array(len);for(var i=0;i<len;i++){res[i]=cloneVNode(vnodes[i],deep);}return res;}/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */var arrayProto=Array.prototype;var arrayMethods=Object.create(arrayProto);['push','pop','shift','unshift','splice','sort','reverse'].forEach(function(method){// cache original method
var original=arrayProto[method];def(arrayMethods,method,function mutator(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var result=original.apply(this,args);var ob=this.__ob__;var inserted;switch(method){case'push':case'unshift':inserted=args;break;case'splice':inserted=args.slice(2);break;}if(inserted){ob.observeArray(inserted);}// notify change
ob.dep.notify();return result;});});/*  */var arrayKeys=Object.getOwnPropertyNames(arrayMethods);/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */var observerState={shouldConvert:true};/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */var Observer=function Observer(value){this.value=value;this.dep=new Dep();this.vmCount=0;def(value,'__ob__',this);if(Array.isArray(value)){var augment=hasProto?protoAugment:copyAugment;augment(value,arrayMethods,arrayKeys);this.observeArray(value);}else{this.walk(value);}};/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */Observer.prototype.walk=function walk(obj){var keys=Object.keys(obj);for(var i=0;i<keys.length;i++){defineReactive(obj,keys[i],obj[keys[i]]);}};/**
 * Observe a list of Array items.
 */Observer.prototype.observeArray=function observeArray(items){for(var i=0,l=items.length;i<l;i++){observe(items[i]);}};// helpers
/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */function protoAugment(target,src,keys){/* eslint-disable no-proto */target.__proto__=src;/* eslint-enable no-proto */}/**
 * Augment an target Object or Array by defining
 * hidden properties.
 *//* istanbul ignore next */function copyAugment(target,src,keys){for(var i=0,l=keys.length;i<l;i++){var key=keys[i];def(target,key,src[key]);}}/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */function observe(value,asRootData){if(!isObject(value)||value instanceof VNode){return;}var ob;if(hasOwn(value,'__ob__')&&value.__ob__ instanceof Observer){ob=value.__ob__;}else if(observerState.shouldConvert&&!isServerRendering()&&(Array.isArray(value)||isPlainObject(value))&&Object.isExtensible(value)&&!value._isVue){ob=new Observer(value);}if(asRootData&&ob){ob.vmCount++;}return ob;}/**
 * Define a reactive property on an Object.
 */function defineReactive(obj,key,val,customSetter,shallow){var dep=new Dep();var property=Object.getOwnPropertyDescriptor(obj,key);if(property&&property.configurable===false){return;}// cater for pre-defined getter/setters
var getter=property&&property.get;var setter=property&&property.set;var childOb=!shallow&&observe(val);Object.defineProperty(obj,key,{enumerable:true,configurable:true,get:function reactiveGetter(){var value=getter?getter.call(obj):val;if(Dep.target){dep.depend();if(childOb){childOb.dep.depend();if(Array.isArray(value)){dependArray(value);}}}return value;},set:function reactiveSetter(newVal){var value=getter?getter.call(obj):val;/* eslint-disable no-self-compare */if(newVal===value||newVal!==newVal&&value!==value){return;}/* eslint-enable no-self-compare */if(process.env.NODE_ENV!=='production'&&customSetter){customSetter();}if(setter){setter.call(obj,newVal);}else{val=newVal;}childOb=!shallow&&observe(newVal);dep.notify();}});}/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */function set(target,key,val){if(Array.isArray(target)&&isValidArrayIndex(key)){target.length=Math.max(target.length,key);target.splice(key,1,val);return val;}if(key in target&&!(key in Object.prototype)){target[key]=val;return val;}var ob=target.__ob__;if(target._isVue||ob&&ob.vmCount){process.env.NODE_ENV!=='production'&&warn('Avoid adding reactive properties to a Vue instance or its root $data '+'at runtime - declare it upfront in the data option.');return val;}if(!ob){target[key]=val;return val;}defineReactive(ob.value,key,val);ob.dep.notify();return val;}/**
 * Delete a property and trigger change if necessary.
 */function del(target,key){if(Array.isArray(target)&&isValidArrayIndex(key)){target.splice(key,1);return;}var ob=target.__ob__;if(target._isVue||ob&&ob.vmCount){process.env.NODE_ENV!=='production'&&warn('Avoid deleting properties on a Vue instance or its root $data '+'- just set it to null.');return;}if(!hasOwn(target,key)){return;}delete target[key];if(!ob){return;}ob.dep.notify();}/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */function dependArray(value){for(var e=void 0,i=0,l=value.length;i<l;i++){e=value[i];e&&e.__ob__&&e.__ob__.dep.depend();if(Array.isArray(e)){dependArray(e);}}}/*  *//**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */var strats=config.optionMergeStrategies;/**
 * Options with restrictions
 */if(process.env.NODE_ENV!=='production'){strats.el=strats.propsData=function(parent,child,vm,key){if(!vm){warn("option \""+key+"\" can only be used during instance "+'creation with the `new` keyword.');}return defaultStrat(parent,child);};}/**
 * Helper that recursively merges two data objects together.
 */function mergeData(to,from){if(!from){return to;}var key,toVal,fromVal;var keys=Object.keys(from);for(var i=0;i<keys.length;i++){key=keys[i];toVal=to[key];fromVal=from[key];if(!hasOwn(to,key)){set(to,key,fromVal);}else if(isPlainObject(toVal)&&isPlainObject(fromVal)){mergeData(toVal,fromVal);}}return to;}/**
 * Data
 */function mergeDataOrFn(parentVal,childVal,vm){if(!vm){// in a Vue.extend merge, both should be functions
if(!childVal){return parentVal;}if(!parentVal){return childVal;}// when parentVal & childVal are both present,
// we need to return a function that returns the
// merged result of both functions... no need to
// check if parentVal is a function here because
// it has to be a function to pass previous merges.
return function mergedDataFn(){return mergeData(typeof childVal==='function'?childVal.call(this,this):childVal,typeof parentVal==='function'?parentVal.call(this,this):parentVal);};}else{return function mergedInstanceDataFn(){// instance merge
var instanceData=typeof childVal==='function'?childVal.call(vm,vm):childVal;var defaultData=typeof parentVal==='function'?parentVal.call(vm,vm):parentVal;if(instanceData){return mergeData(instanceData,defaultData);}else{return defaultData;}};}}strats.data=function(parentVal,childVal,vm){if(!vm){if(childVal&&typeof childVal!=='function'){process.env.NODE_ENV!=='production'&&warn('The "data" option should be a function '+'that returns a per-instance value in component '+'definitions.',vm);return parentVal;}return mergeDataOrFn(parentVal,childVal);}return mergeDataOrFn(parentVal,childVal,vm);};/**
 * Hooks and props are merged as arrays.
 */function mergeHook(parentVal,childVal){return childVal?parentVal?parentVal.concat(childVal):Array.isArray(childVal)?childVal:[childVal]:parentVal;}LIFECYCLE_HOOKS.forEach(function(hook){strats[hook]=mergeHook;});/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */function mergeAssets(parentVal,childVal,vm,key){var res=Object.create(parentVal||null);if(childVal){process.env.NODE_ENV!=='production'&&assertObjectType(key,childVal,vm);return extend(res,childVal);}else{return res;}}ASSET_TYPES.forEach(function(type){strats[type+'s']=mergeAssets;});/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */strats.watch=function(parentVal,childVal,vm,key){// work around Firefox's Object.prototype.watch...
if(parentVal===nativeWatch){parentVal=undefined;}if(childVal===nativeWatch){childVal=undefined;}/* istanbul ignore if */if(!childVal){return Object.create(parentVal||null);}if(process.env.NODE_ENV!=='production'){assertObjectType(key,childVal,vm);}if(!parentVal){return childVal;}var ret={};extend(ret,parentVal);for(var key$1 in childVal){var parent=ret[key$1];var child=childVal[key$1];if(parent&&!Array.isArray(parent)){parent=[parent];}ret[key$1]=parent?parent.concat(child):Array.isArray(child)?child:[child];}return ret;};/**
 * Other object hashes.
 */strats.props=strats.methods=strats.inject=strats.computed=function(parentVal,childVal,vm,key){if(childVal&&process.env.NODE_ENV!=='production'){assertObjectType(key,childVal,vm);}if(!parentVal){return childVal;}var ret=Object.create(null);extend(ret,parentVal);if(childVal){extend(ret,childVal);}return ret;};strats.provide=mergeDataOrFn;/**
 * Default strategy.
 */var defaultStrat=function defaultStrat(parentVal,childVal){return childVal===undefined?parentVal:childVal;};/**
 * Validate component names
 */function checkComponents(options){for(var key in options.components){validateComponentName(key);}}function validateComponentName(name){if(!/^[a-zA-Z][\w-]*$/.test(name)){warn('Invalid component name: "'+name+'". Component names '+'can only contain alphanumeric characters and the hyphen, '+'and must start with a letter.');}if(isBuiltInTag(name)||config.isReservedTag(name)){warn('Do not use built-in or reserved HTML elements as component '+'id: '+name);}}/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */function normalizeProps(options,vm){var props=options.props;if(!props){return;}var res={};var i,val,name;if(Array.isArray(props)){i=props.length;while(i--){val=props[i];if(typeof val==='string'){name=camelize(val);res[name]={type:null};}else if(process.env.NODE_ENV!=='production'){warn('props must be strings when using array syntax.');}}}else if(isPlainObject(props)){for(var key in props){val=props[key];name=camelize(key);res[name]=isPlainObject(val)?val:{type:val};}}else if(process.env.NODE_ENV!=='production'){warn("Invalid value for option \"props\": expected an Array or an Object, "+"but got "+toRawType(props)+".",vm);}options.props=res;}/**
 * Normalize all injections into Object-based format
 */function normalizeInject(options,vm){var inject=options.inject;if(!inject){return;}var normalized=options.inject={};if(Array.isArray(inject)){for(var i=0;i<inject.length;i++){normalized[inject[i]]={from:inject[i]};}}else if(isPlainObject(inject)){for(var key in inject){var val=inject[key];normalized[key]=isPlainObject(val)?extend({from:key},val):{from:val};}}else if(process.env.NODE_ENV!=='production'){warn("Invalid value for option \"inject\": expected an Array or an Object, "+"but got "+toRawType(inject)+".",vm);}}/**
 * Normalize raw function directives into object format.
 */function normalizeDirectives(options){var dirs=options.directives;if(dirs){for(var key in dirs){var def=dirs[key];if(typeof def==='function'){dirs[key]={bind:def,update:def};}}}}function assertObjectType(name,value,vm){if(!isPlainObject(value)){warn("Invalid value for option \""+name+"\": expected an Object, "+"but got "+toRawType(value)+".",vm);}}/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */function mergeOptions(parent,child,vm){if(process.env.NODE_ENV!=='production'){checkComponents(child);}if(typeof child==='function'){child=child.options;}normalizeProps(child,vm);normalizeInject(child,vm);normalizeDirectives(child);var extendsFrom=child.extends;if(extendsFrom){parent=mergeOptions(parent,extendsFrom,vm);}if(child.mixins){for(var i=0,l=child.mixins.length;i<l;i++){parent=mergeOptions(parent,child.mixins[i],vm);}}var options={};var key;for(key in parent){mergeField(key);}for(key in child){if(!hasOwn(parent,key)){mergeField(key);}}function mergeField(key){var strat=strats[key]||defaultStrat;options[key]=strat(parent[key],child[key],vm,key);}return options;}/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */function resolveAsset(options,type,id,warnMissing){/* istanbul ignore if */if(typeof id!=='string'){return;}var assets=options[type];// check local registration variations first
if(hasOwn(assets,id)){return assets[id];}var camelizedId=camelize(id);if(hasOwn(assets,camelizedId)){return assets[camelizedId];}var PascalCaseId=capitalize(camelizedId);if(hasOwn(assets,PascalCaseId)){return assets[PascalCaseId];}// fallback to prototype chain
var res=assets[id]||assets[camelizedId]||assets[PascalCaseId];if(process.env.NODE_ENV!=='production'&&warnMissing&&!res){warn('Failed to resolve '+type.slice(0,-1)+': '+id,options);}return res;}/*  */function validateProp(key,propOptions,propsData,vm){var prop=propOptions[key];var absent=!hasOwn(propsData,key);var value=propsData[key];// handle boolean props
if(isType(Boolean,prop.type)){if(absent&&!hasOwn(prop,'default')){value=false;}else if(!isType(String,prop.type)&&(value===''||value===hyphenate(key))){value=true;}}// check default value
if(value===undefined){value=getPropDefaultValue(vm,prop,key);// since the default value is a fresh copy,
// make sure to observe it.
var prevShouldConvert=observerState.shouldConvert;observerState.shouldConvert=true;observe(value);observerState.shouldConvert=prevShouldConvert;}if(process.env.NODE_ENV!=='production'&&// skip validation for weex recycle-list child component props
!(false&&isObject(value)&&'@binding'in value)){assertProp(prop,key,value,vm,absent);}return value;}/**
 * Get the default value of a prop.
 */function getPropDefaultValue(vm,prop,key){// no default, return undefined
if(!hasOwn(prop,'default')){return undefined;}var def=prop.default;// warn against non-factory defaults for Object & Array
if(process.env.NODE_ENV!=='production'&&isObject(def)){warn('Invalid default value for prop "'+key+'": '+'Props with type Object/Array must use a factory function '+'to return the default value.',vm);}// the raw prop value was also undefined from previous render,
// return previous default value to avoid unnecessary watcher trigger
if(vm&&vm.$options.propsData&&vm.$options.propsData[key]===undefined&&vm._props[key]!==undefined){return vm._props[key];}// call factory function for non-Function types
// a value is Function if its prototype is function even across different execution context
return typeof def==='function'&&getType(prop.type)!=='Function'?def.call(vm):def;}/**
 * Assert whether a prop is valid.
 */function assertProp(prop,name,value,vm,absent){if(prop.required&&absent){warn('Missing required prop: "'+name+'"',vm);return;}if(value==null&&!prop.required){return;}var type=prop.type;var valid=!type||type===true;var expectedTypes=[];if(type){if(!Array.isArray(type)){type=[type];}for(var i=0;i<type.length&&!valid;i++){var assertedType=assertType(value,type[i]);expectedTypes.push(assertedType.expectedType||'');valid=assertedType.valid;}}if(!valid){warn("Invalid prop: type check failed for prop \""+name+"\"."+" Expected "+expectedTypes.map(capitalize).join(', ')+", got "+toRawType(value)+".",vm);return;}var validator=prop.validator;if(validator){if(!validator(value)){warn('Invalid prop: custom validator check failed for prop "'+name+'".',vm);}}}var simpleCheckRE=/^(String|Number|Boolean|Function|Symbol)$/;function assertType(value,type){var valid;var expectedType=getType(type);if(simpleCheckRE.test(expectedType)){var t=typeof value==='undefined'?'undefined':_typeof(value);valid=t===expectedType.toLowerCase();// for primitive wrapper objects
if(!valid&&t==='object'){valid=value instanceof type;}}else if(expectedType==='Object'){valid=isPlainObject(value);}else if(expectedType==='Array'){valid=Array.isArray(value);}else{valid=value instanceof type;}return{valid:valid,expectedType:expectedType};}/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */function getType(fn){var match=fn&&fn.toString().match(/^\s*function (\w+)/);return match?match[1]:'';}function isType(type,fn){if(!Array.isArray(fn)){return getType(fn)===getType(type);}for(var i=0,len=fn.length;i<len;i++){if(getType(fn[i])===getType(type)){return true;}}/* istanbul ignore next */return false;}/*  */function handleError(err,vm,info){if(vm){var cur=vm;while(cur=cur.$parent){var hooks=cur.$options.errorCaptured;if(hooks){for(var i=0;i<hooks.length;i++){try{var capture=hooks[i].call(cur,err,vm,info)===false;if(capture){return;}}catch(e){globalHandleError(e,cur,'errorCaptured hook');}}}}}globalHandleError(err,vm,info);}function globalHandleError(err,vm,info){if(config.errorHandler){try{return config.errorHandler.call(null,err,vm,info);}catch(e){logError(e,null,'config.errorHandler');}}logError(err,vm,info);}function logError(err,vm,info){if(process.env.NODE_ENV!=='production'){warn("Error in "+info+": \""+err.toString()+"\"",vm);}/* istanbul ignore else */if((inBrowser||inWeex)&&typeof console!=='undefined'){console.error(err);}else{throw err;}}/*  *//* globals MessageChannel */var callbacks=[];var pending=false;function flushCallbacks(){pending=false;var copies=callbacks.slice(0);callbacks.length=0;for(var i=0;i<copies.length;i++){copies[i]();}}// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;var macroTimerFunc;var useMacroTask=false;// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */if(typeof setImmediate!=='undefined'&&isNative(setImmediate)){macroTimerFunc=function macroTimerFunc(){setImmediate(flushCallbacks);};}else if(typeof MessageChannel!=='undefined'&&(isNative(MessageChannel)||// PhantomJS
MessageChannel.toString()==='[object MessageChannelConstructor]')){var channel=new MessageChannel();var port=channel.port2;channel.port1.onmessage=flushCallbacks;macroTimerFunc=function macroTimerFunc(){port.postMessage(1);};}else{/* istanbul ignore next */macroTimerFunc=function macroTimerFunc(){setTimeout(flushCallbacks,0);};}// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */if(typeof Promise!=='undefined'&&isNative(Promise)){var p=Promise.resolve();microTimerFunc=function microTimerFunc(){p.then(flushCallbacks);// in problematic UIWebViews, Promise.then doesn't completely break, but
// it can get stuck in a weird state where callbacks are pushed into the
// microtask queue but the queue isn't being flushed, until the browser
// needs to do some other work, e.g. handle a timer. Therefore we can
// "force" the microtask queue to be flushed by adding an empty timer.
if(isIOS){setTimeout(noop);}};}else{// fallback to macro
microTimerFunc=macroTimerFunc;}/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */function withMacroTask(fn){return fn._withTask||(fn._withTask=function(){useMacroTask=true;var res=fn.apply(null,arguments);useMacroTask=false;return res;});}function nextTick(cb,ctx){var _resolve;callbacks.push(function(){if(cb){try{cb.call(ctx);}catch(e){handleError(e,ctx,'nextTick');}}else if(_resolve){_resolve(ctx);}});if(!pending){pending=true;if(useMacroTask){macroTimerFunc();}else{microTimerFunc();}}// $flow-disable-line
if(!cb&&typeof Promise!=='undefined'){return new Promise(function(resolve){_resolve=resolve;});}}/*  */var mark;var measure;if(process.env.NODE_ENV!=='production'){var perf=inBrowser&&window.performance;/* istanbul ignore if */if(perf&&perf.mark&&perf.measure&&perf.clearMarks&&perf.clearMeasures){mark=function mark(tag){return perf.mark(tag);};measure=function measure(name,startTag,endTag){perf.measure(name,startTag,endTag);perf.clearMarks(startTag);perf.clearMarks(endTag);perf.clearMeasures(name);};}}/* not type checking this file because flow doesn't play well with Proxy */var initProxy;if(process.env.NODE_ENV!=='production'){var allowedGlobals=makeMap('Infinity,undefined,NaN,isFinite,isNaN,'+'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,'+'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,'+'require'// for Webpack/Browserify
);var warnNonPresent=function warnNonPresent(target,key){warn("Property or method \""+key+"\" is not defined on the instance but "+'referenced during render. Make sure that this property is reactive, '+'either in the data option, or for class-based components, by '+'initializing the property. '+'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',target);};var hasProxy=typeof Proxy!=='undefined'&&Proxy.toString().match(/native code/);if(hasProxy){var isBuiltInModifier=makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');config.keyCodes=new Proxy(config.keyCodes,{set:function set(target,key,value){if(isBuiltInModifier(key)){warn("Avoid overwriting built-in modifier in config.keyCodes: ."+key);return false;}else{target[key]=value;return true;}}});}var hasHandler={has:function has(target,key){var has=key in target;var isAllowed=allowedGlobals(key)||key.charAt(0)==='_';if(!has&&!isAllowed){warnNonPresent(target,key);}return has||!isAllowed;}};var getHandler={get:function get(target,key){if(typeof key==='string'&&!(key in target)){warnNonPresent(target,key);}return target[key];}};initProxy=function initProxy(vm){if(hasProxy){// determine which proxy handler to use
var options=vm.$options;var handlers=options.render&&options.render._withStripped?getHandler:hasHandler;vm._renderProxy=new Proxy(vm,handlers);}else{vm._renderProxy=vm;}};}/*  */var seenObjects=new _Set();/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */function traverse(val){_traverse(val,seenObjects);seenObjects.clear();}function _traverse(val,seen){var i,keys;var isA=Array.isArray(val);if(!isA&&!isObject(val)||Object.isFrozen(val)){return;}if(val.__ob__){var depId=val.__ob__.dep.id;if(seen.has(depId)){return;}seen.add(depId);}if(isA){i=val.length;while(i--){_traverse(val[i],seen);}}else{keys=Object.keys(val);i=keys.length;while(i--){_traverse(val[keys[i]],seen);}}}/*  */var normalizeEvent=cached(function(name){var passive=name.charAt(0)==='&';name=passive?name.slice(1):name;var once$$1=name.charAt(0)==='~';// Prefixed last, checked first
name=once$$1?name.slice(1):name;var capture=name.charAt(0)==='!';name=capture?name.slice(1):name;return{name:name,once:once$$1,capture:capture,passive:passive};});function createFnInvoker(fns){function invoker(){var arguments$1=arguments;var fns=invoker.fns;if(Array.isArray(fns)){var cloned=fns.slice();for(var i=0;i<cloned.length;i++){cloned[i].apply(null,arguments$1);}}else{// return handler return value for single handlers
return fns.apply(null,arguments);}}invoker.fns=fns;return invoker;}function updateListeners(on,oldOn,add,remove$$1,vm){var name,def,cur,old,event;for(name in on){def=cur=on[name];old=oldOn[name];event=normalizeEvent(name);/* istanbul ignore if */if(isUndef(cur)){process.env.NODE_ENV!=='production'&&warn("Invalid handler for event \""+event.name+"\": got "+String(cur),vm);}else if(isUndef(old)){if(isUndef(cur.fns)){cur=on[name]=createFnInvoker(cur);}add(event.name,cur,event.once,event.capture,event.passive,event.params);}else if(cur!==old){old.fns=cur;on[name]=old;}}for(name in oldOn){if(isUndef(on[name])){event=normalizeEvent(name);remove$$1(event.name,oldOn[name],event.capture);}}}/*  */function mergeVNodeHook(def,hookKey,hook){if(def instanceof VNode){def=def.data.hook||(def.data.hook={});}var invoker;var oldHook=def[hookKey];function wrappedHook(){hook.apply(this,arguments);// important: remove merged hook to ensure it's called only once
// and prevent memory leak
remove(invoker.fns,wrappedHook);}if(isUndef(oldHook)){// no existing hook
invoker=createFnInvoker([wrappedHook]);}else{/* istanbul ignore if */if(isDef(oldHook.fns)&&isTrue(oldHook.merged)){// already a merged invoker
invoker=oldHook;invoker.fns.push(wrappedHook);}else{// existing plain hook
invoker=createFnInvoker([oldHook,wrappedHook]);}}invoker.merged=true;def[hookKey]=invoker;}/*  */function extractPropsFromVNodeData(data,Ctor,tag){// we are only extracting raw values here.
// validation and default values are handled in the child
// component itself.
var propOptions=Ctor.options.props;if(isUndef(propOptions)){return;}var res={};var attrs=data.attrs;var props=data.props;if(isDef(attrs)||isDef(props)){for(var key in propOptions){var altKey=hyphenate(key);if(process.env.NODE_ENV!=='production'){var keyInLowerCase=key.toLowerCase();if(key!==keyInLowerCase&&attrs&&hasOwn(attrs,keyInLowerCase)){tip("Prop \""+keyInLowerCase+"\" is passed to component "+formatComponentName(tag||Ctor)+", but the declared prop name is"+" \""+key+"\". "+"Note that HTML attributes are case-insensitive and camelCased "+"props need to use their kebab-case equivalents when using in-DOM "+"templates. You should probably use \""+altKey+"\" instead of \""+key+"\".");}}checkProp(res,props,key,altKey,true)||checkProp(res,attrs,key,altKey,false);}}return res;}function checkProp(res,hash,key,altKey,preserve){if(isDef(hash)){if(hasOwn(hash,key)){res[key]=hash[key];if(!preserve){delete hash[key];}return true;}else if(hasOwn(hash,altKey)){res[key]=hash[altKey];if(!preserve){delete hash[altKey];}return true;}}return false;}/*  */// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children){for(var i=0;i<children.length;i++){if(Array.isArray(children[i])){return Array.prototype.concat.apply([],children);}}return children;}// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children){return isPrimitive(children)?[createTextVNode(children)]:Array.isArray(children)?normalizeArrayChildren(children):undefined;}function isTextNode(node){return isDef(node)&&isDef(node.text)&&isFalse(node.isComment);}function normalizeArrayChildren(children,nestedIndex){var res=[];var i,c,lastIndex,last;for(i=0;i<children.length;i++){c=children[i];if(isUndef(c)||typeof c==='boolean'){continue;}lastIndex=res.length-1;last=res[lastIndex];//  nested
if(Array.isArray(c)){if(c.length>0){c=normalizeArrayChildren(c,(nestedIndex||'')+"_"+i);// merge adjacent text nodes
if(isTextNode(c[0])&&isTextNode(last)){res[lastIndex]=createTextVNode(last.text+c[0].text);c.shift();}res.push.apply(res,c);}}else if(isPrimitive(c)){if(isTextNode(last)){// merge adjacent text nodes
// this is necessary for SSR hydration because text nodes are
// essentially merged when rendered to HTML strings
res[lastIndex]=createTextVNode(last.text+c);}else if(c!==''){// convert primitive to vnode
res.push(createTextVNode(c));}}else{if(isTextNode(c)&&isTextNode(last)){// merge adjacent text nodes
res[lastIndex]=createTextVNode(last.text+c.text);}else{// default key for nested array children (likely generated by v-for)
if(isTrue(children._isVList)&&isDef(c.tag)&&isUndef(c.key)&&isDef(nestedIndex)){c.key="__vlist"+nestedIndex+"_"+i+"__";}res.push(c);}}}return res;}/*  */function ensureCtor(comp,base){if(comp.__esModule||hasSymbol&&comp[Symbol.toStringTag]==='Module'){comp=comp.default;}return isObject(comp)?base.extend(comp):comp;}function createAsyncPlaceholder(factory,data,context,children,tag){var node=createEmptyVNode();node.asyncFactory=factory;node.asyncMeta={data:data,context:context,children:children,tag:tag};return node;}function resolveAsyncComponent(factory,baseCtor,context){if(isTrue(factory.error)&&isDef(factory.errorComp)){return factory.errorComp;}if(isDef(factory.resolved)){return factory.resolved;}if(isTrue(factory.loading)&&isDef(factory.loadingComp)){return factory.loadingComp;}if(isDef(factory.contexts)){// already pending
factory.contexts.push(context);}else{var contexts=factory.contexts=[context];var sync=true;var forceRender=function forceRender(){for(var i=0,l=contexts.length;i<l;i++){contexts[i].$forceUpdate();}};var resolve=once(function(res){// cache resolved
factory.resolved=ensureCtor(res,baseCtor);// invoke callbacks only if this is not a synchronous resolve
// (async resolves are shimmed as synchronous during SSR)
if(!sync){forceRender();}});var reject=once(function(reason){process.env.NODE_ENV!=='production'&&warn("Failed to resolve async component: "+String(factory)+(reason?"\nReason: "+reason:''));if(isDef(factory.errorComp)){factory.error=true;forceRender();}});var res=factory(resolve,reject);if(isObject(res)){if(typeof res.then==='function'){// () => Promise
if(isUndef(factory.resolved)){res.then(resolve,reject);}}else if(isDef(res.component)&&typeof res.component.then==='function'){res.component.then(resolve,reject);if(isDef(res.error)){factory.errorComp=ensureCtor(res.error,baseCtor);}if(isDef(res.loading)){factory.loadingComp=ensureCtor(res.loading,baseCtor);if(res.delay===0){factory.loading=true;}else{setTimeout(function(){if(isUndef(factory.resolved)&&isUndef(factory.error)){factory.loading=true;forceRender();}},res.delay||200);}}if(isDef(res.timeout)){setTimeout(function(){if(isUndef(factory.resolved)){reject(process.env.NODE_ENV!=='production'?"timeout ("+res.timeout+"ms)":null);}},res.timeout);}}}sync=false;// return in case resolved synchronously
return factory.loading?factory.loadingComp:factory.resolved;}}/*  */function isAsyncPlaceholder(node){return node.isComment&&node.asyncFactory;}/*  */function getFirstComponentChild(children){if(Array.isArray(children)){for(var i=0;i<children.length;i++){var c=children[i];if(isDef(c)&&(isDef(c.componentOptions)||isAsyncPlaceholder(c))){return c;}}}}/*  *//*  */function initEvents(vm){vm._events=Object.create(null);vm._hasHookEvent=false;// init parent attached events
var listeners=vm.$options._parentListeners;if(listeners){updateComponentListeners(vm,listeners);}}var target;function add(event,fn,once){if(once){target.$once(event,fn);}else{target.$on(event,fn);}}function remove$1(event,fn){target.$off(event,fn);}function updateComponentListeners(vm,listeners,oldListeners){target=vm;updateListeners(listeners,oldListeners||{},add,remove$1,vm);target=undefined;}function eventsMixin(Vue){var hookRE=/^hook:/;Vue.prototype.$on=function(event,fn){var this$1=this;var vm=this;if(Array.isArray(event)){for(var i=0,l=event.length;i<l;i++){this$1.$on(event[i],fn);}}else{(vm._events[event]||(vm._events[event]=[])).push(fn);// optimize hook:event cost by using a boolean flag marked at registration
// instead of a hash lookup
if(hookRE.test(event)){vm._hasHookEvent=true;}}return vm;};Vue.prototype.$once=function(event,fn){var vm=this;function on(){vm.$off(event,on);fn.apply(vm,arguments);}on.fn=fn;vm.$on(event,on);return vm;};Vue.prototype.$off=function(event,fn){var this$1=this;var vm=this;// all
if(!arguments.length){vm._events=Object.create(null);return vm;}// array of events
if(Array.isArray(event)){for(var i=0,l=event.length;i<l;i++){this$1.$off(event[i],fn);}return vm;}// specific event
var cbs=vm._events[event];if(!cbs){return vm;}if(!fn){vm._events[event]=null;return vm;}if(fn){// specific handler
var cb;var i$1=cbs.length;while(i$1--){cb=cbs[i$1];if(cb===fn||cb.fn===fn){cbs.splice(i$1,1);break;}}}return vm;};Vue.prototype.$emit=function(event){var vm=this;if(process.env.NODE_ENV!=='production'){var lowerCaseEvent=event.toLowerCase();if(lowerCaseEvent!==event&&vm._events[lowerCaseEvent]){tip("Event \""+lowerCaseEvent+"\" is emitted in component "+formatComponentName(vm)+" but the handler is registered for \""+event+"\". "+"Note that HTML attributes are case-insensitive and you cannot use "+"v-on to listen to camelCase events when using in-DOM templates. "+"You should probably use \""+hyphenate(event)+"\" instead of \""+event+"\".");}}var cbs=vm._events[event];if(cbs){cbs=cbs.length>1?toArray(cbs):cbs;var args=toArray(arguments,1);for(var i=0,l=cbs.length;i<l;i++){try{cbs[i].apply(vm,args);}catch(e){handleError(e,vm,"event handler for \""+event+"\"");}}}return vm;};}/*  *//**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */function resolveSlots(children,context){var slots={};if(!children){return slots;}for(var i=0,l=children.length;i<l;i++){var child=children[i];var data=child.data;// remove slot attribute if the node is resolved as a Vue slot node
if(data&&data.attrs&&data.attrs.slot){delete data.attrs.slot;}// named slots should only be respected if the vnode was rendered in the
// same context.
if((child.context===context||child.fnContext===context)&&data&&data.slot!=null){var name=data.slot;var slot=slots[name]||(slots[name]=[]);if(child.tag==='template'){slot.push.apply(slot,child.children||[]);}else{slot.push(child);}}else{(slots.default||(slots.default=[])).push(child);}}// ignore slots that contains only whitespace
for(var name$1 in slots){if(slots[name$1].every(isWhitespace)){delete slots[name$1];}}return slots;}function isWhitespace(node){return node.isComment&&!node.asyncFactory||node.text===' ';}function resolveScopedSlots(fns,// see flow/vnode
res){res=res||{};for(var i=0;i<fns.length;i++){if(Array.isArray(fns[i])){resolveScopedSlots(fns[i],res);}else{res[fns[i].key]=fns[i].fn;}}return res;}/*  */var activeInstance=null;var isUpdatingChildComponent=false;function initLifecycle(vm){var options=vm.$options;// locate first non-abstract parent
var parent=options.parent;if(parent&&!options.abstract){while(parent.$options.abstract&&parent.$parent){parent=parent.$parent;}parent.$children.push(vm);}vm.$parent=parent;vm.$root=parent?parent.$root:vm;vm.$children=[];vm.$refs={};vm._watcher=null;vm._inactive=null;vm._directInactive=false;vm._isMounted=false;vm._isDestroyed=false;vm._isBeingDestroyed=false;}function lifecycleMixin(Vue){Vue.prototype._update=function(vnode,hydrating){var vm=this;if(vm._isMounted){callHook(vm,'beforeUpdate');}var prevEl=vm.$el;var prevVnode=vm._vnode;var prevActiveInstance=activeInstance;activeInstance=vm;vm._vnode=vnode;// Vue.prototype.__patch__ is injected in entry points
// based on the rendering backend used.
if(!prevVnode){// initial render
vm.$el=vm.__patch__(vm.$el,vnode,hydrating,false/* removeOnly */,vm.$options._parentElm,vm.$options._refElm);// no need for the ref nodes after initial patch
// this prevents keeping a detached DOM tree in memory (#5851)
vm.$options._parentElm=vm.$options._refElm=null;}else{// updates
vm.$el=vm.__patch__(prevVnode,vnode);}activeInstance=prevActiveInstance;// update __vue__ reference
if(prevEl){prevEl.__vue__=null;}if(vm.$el){vm.$el.__vue__=vm;}// if parent is an HOC, update its $el as well
if(vm.$vnode&&vm.$parent&&vm.$vnode===vm.$parent._vnode){vm.$parent.$el=vm.$el;}// updated hook is called by the scheduler to ensure that children are
// updated in a parent's updated hook.
};Vue.prototype.$forceUpdate=function(){var vm=this;if(vm._watcher){vm._watcher.update();}};Vue.prototype.$destroy=function(){var vm=this;if(vm._isBeingDestroyed){return;}callHook(vm,'beforeDestroy');vm._isBeingDestroyed=true;// remove self from parent
var parent=vm.$parent;if(parent&&!parent._isBeingDestroyed&&!vm.$options.abstract){remove(parent.$children,vm);}// teardown watchers
if(vm._watcher){vm._watcher.teardown();}var i=vm._watchers.length;while(i--){vm._watchers[i].teardown();}// remove reference from data ob
// frozen object may not have observer.
if(vm._data.__ob__){vm._data.__ob__.vmCount--;}// call the last hook...
vm._isDestroyed=true;// invoke destroy hooks on current rendered tree
vm.__patch__(vm._vnode,null);// fire destroyed hook
callHook(vm,'destroyed');// turn off all instance listeners.
vm.$off();// remove __vue__ reference
if(vm.$el){vm.$el.__vue__=null;}// release circular reference (#6759)
if(vm.$vnode){vm.$vnode.parent=null;}};}function mountComponent(vm,el,hydrating){vm.$el=el;if(!vm.$options.render){vm.$options.render=createEmptyVNode;if(process.env.NODE_ENV!=='production'){/* istanbul ignore if */if(vm.$options.template&&vm.$options.template.charAt(0)!=='#'||vm.$options.el||el){warn('You are using the runtime-only build of Vue where the template '+'compiler is not available. Either pre-compile the templates into '+'render functions, or use the compiler-included build.',vm);}else{warn('Failed to mount component: template or render function not defined.',vm);}}}callHook(vm,'beforeMount');var updateComponent;/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){updateComponent=function updateComponent(){var name=vm._name;var id=vm._uid;var startTag="vue-perf-start:"+id;var endTag="vue-perf-end:"+id;mark(startTag);var vnode=vm._render();mark(endTag);measure("vue "+name+" render",startTag,endTag);mark(startTag);vm._update(vnode,hydrating);mark(endTag);measure("vue "+name+" patch",startTag,endTag);};}else{updateComponent=function updateComponent(){vm._update(vm._render(),hydrating);};}// we set this to vm._watcher inside the watcher's constructor
// since the watcher's initial patch may call $forceUpdate (e.g. inside child
// component's mounted hook), which relies on vm._watcher being already defined
new Watcher(vm,updateComponent,noop,null,true/* isRenderWatcher */);hydrating=false;// manually mounted instance, call mounted on self
// mounted is called for render-created child components in its inserted hook
if(vm.$vnode==null){vm._isMounted=true;callHook(vm,'mounted');}return vm;}function updateChildComponent(vm,propsData,listeners,parentVnode,renderChildren){if(process.env.NODE_ENV!=='production'){isUpdatingChildComponent=true;}// determine whether component has slot children
// we need to do this before overwriting $options._renderChildren
var hasChildren=!!(renderChildren||// has new static slots
vm.$options._renderChildren||// has old static slots
parentVnode.data.scopedSlots||// has new scoped slots
vm.$scopedSlots!==emptyObject// has old scoped slots
);vm.$options._parentVnode=parentVnode;vm.$vnode=parentVnode;// update vm's placeholder node without re-render
if(vm._vnode){// update child tree's parent
vm._vnode.parent=parentVnode;}vm.$options._renderChildren=renderChildren;// update $attrs and $listeners hash
// these are also reactive so they may trigger child update if the child
// used them during render
vm.$attrs=parentVnode.data&&parentVnode.data.attrs||emptyObject;vm.$listeners=listeners||emptyObject;// update props
if(propsData&&vm.$options.props){observerState.shouldConvert=false;var props=vm._props;var propKeys=vm.$options._propKeys||[];for(var i=0;i<propKeys.length;i++){var key=propKeys[i];props[key]=validateProp(key,vm.$options.props,propsData,vm);}observerState.shouldConvert=true;// keep a copy of raw propsData
vm.$options.propsData=propsData;}// update listeners
if(listeners){var oldListeners=vm.$options._parentListeners;vm.$options._parentListeners=listeners;updateComponentListeners(vm,listeners,oldListeners);}// resolve slots + force update if has children
if(hasChildren){vm.$slots=resolveSlots(renderChildren,parentVnode.context);vm.$forceUpdate();}if(process.env.NODE_ENV!=='production'){isUpdatingChildComponent=false;}}function isInInactiveTree(vm){while(vm&&(vm=vm.$parent)){if(vm._inactive){return true;}}return false;}function activateChildComponent(vm,direct){if(direct){vm._directInactive=false;if(isInInactiveTree(vm)){return;}}else if(vm._directInactive){return;}if(vm._inactive||vm._inactive===null){vm._inactive=false;for(var i=0;i<vm.$children.length;i++){activateChildComponent(vm.$children[i]);}callHook(vm,'activated');}}function deactivateChildComponent(vm,direct){if(direct){vm._directInactive=true;if(isInInactiveTree(vm)){return;}}if(!vm._inactive){vm._inactive=true;for(var i=0;i<vm.$children.length;i++){deactivateChildComponent(vm.$children[i]);}callHook(vm,'deactivated');}}function callHook(vm,hook){var handlers=vm.$options[hook];if(handlers){for(var i=0,j=handlers.length;i<j;i++){try{handlers[i].call(vm);}catch(e){handleError(e,vm,hook+" hook");}}}if(vm._hasHookEvent){vm.$emit('hook:'+hook);}}/*  */var MAX_UPDATE_COUNT=100;var queue=[];var activatedChildren=[];var has={};var circular={};var waiting=false;var flushing=false;var index=0;/**
 * Reset the scheduler's state.
 */function resetSchedulerState(){index=queue.length=activatedChildren.length=0;has={};if(process.env.NODE_ENV!=='production'){circular={};}waiting=flushing=false;}/**
 * Flush both queues and run the watchers.
 */function flushSchedulerQueue(){flushing=true;var watcher,id;// Sort queue before flush.
// This ensures that:
// 1. Components are updated from parent to child. (because parent is always
//    created before the child)
// 2. A component's user watchers are run before its render watcher (because
//    user watchers are created before the render watcher)
// 3. If a component is destroyed during a parent component's watcher run,
//    its watchers can be skipped.
queue.sort(function(a,b){return a.id-b.id;});// do not cache length because more watchers might be pushed
// as we run existing watchers
for(index=0;index<queue.length;index++){watcher=queue[index];id=watcher.id;has[id]=null;watcher.run();// in dev build, check and stop circular updates.
if(process.env.NODE_ENV!=='production'&&has[id]!=null){circular[id]=(circular[id]||0)+1;if(circular[id]>MAX_UPDATE_COUNT){warn('You may have an infinite update loop '+(watcher.user?"in watcher with expression \""+watcher.expression+"\"":"in a component render function."),watcher.vm);break;}}}// keep copies of post queues before resetting state
var activatedQueue=activatedChildren.slice();var updatedQueue=queue.slice();resetSchedulerState();// call component updated and activated hooks
callActivatedHooks(activatedQueue);callUpdatedHooks(updatedQueue);// devtool hook
/* istanbul ignore if */if(devtools&&config.devtools){devtools.emit('flush');}}function callUpdatedHooks(queue){var i=queue.length;while(i--){var watcher=queue[i];var vm=watcher.vm;if(vm._watcher===watcher&&vm._isMounted){callHook(vm,'updated');}}}/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */function queueActivatedComponent(vm){// setting _inactive to false here so that a render function can
// rely on checking whether it's in an inactive tree (e.g. router-view)
vm._inactive=false;activatedChildren.push(vm);}function callActivatedHooks(queue){for(var i=0;i<queue.length;i++){queue[i]._inactive=true;activateChildComponent(queue[i],true/* true */);}}/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */function queueWatcher(watcher){var id=watcher.id;if(has[id]==null){has[id]=true;if(!flushing){queue.push(watcher);}else{// if already flushing, splice the watcher based on its id
// if already past its id, it will be run next immediately.
var i=queue.length-1;while(i>index&&queue[i].id>watcher.id){i--;}queue.splice(i+1,0,watcher);}// queue the flush
if(!waiting){waiting=true;nextTick(flushSchedulerQueue);}}}/*  */var uid$2=0;/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */var Watcher=function Watcher(vm,expOrFn,cb,options,isRenderWatcher){this.vm=vm;if(isRenderWatcher){vm._watcher=this;}vm._watchers.push(this);// options
if(options){this.deep=!!options.deep;this.user=!!options.user;this.lazy=!!options.lazy;this.sync=!!options.sync;}else{this.deep=this.user=this.lazy=this.sync=false;}this.cb=cb;this.id=++uid$2;// uid for batching
this.active=true;this.dirty=this.lazy;// for lazy watchers
this.deps=[];this.newDeps=[];this.depIds=new _Set();this.newDepIds=new _Set();this.expression=process.env.NODE_ENV!=='production'?expOrFn.toString():'';// parse expression for getter
if(typeof expOrFn==='function'){this.getter=expOrFn;}else{this.getter=parsePath(expOrFn);if(!this.getter){this.getter=function(){};process.env.NODE_ENV!=='production'&&warn("Failed watching path: \""+expOrFn+"\" "+'Watcher only accepts simple dot-delimited paths. '+'For full control, use a function instead.',vm);}}this.value=this.lazy?undefined:this.get();};/**
 * Evaluate the getter, and re-collect dependencies.
 */Watcher.prototype.get=function get(){pushTarget(this);var value;var vm=this.vm;try{value=this.getter.call(vm,vm);}catch(e){if(this.user){handleError(e,vm,"getter for watcher \""+this.expression+"\"");}else{throw e;}}finally{// "touch" every property so they are all tracked as
// dependencies for deep watching
if(this.deep){traverse(value);}popTarget();this.cleanupDeps();}return value;};/**
 * Add a dependency to this directive.
 */Watcher.prototype.addDep=function addDep(dep){var id=dep.id;if(!this.newDepIds.has(id)){this.newDepIds.add(id);this.newDeps.push(dep);if(!this.depIds.has(id)){dep.addSub(this);}}};/**
 * Clean up for dependency collection.
 */Watcher.prototype.cleanupDeps=function cleanupDeps(){var this$1=this;var i=this.deps.length;while(i--){var dep=this$1.deps[i];if(!this$1.newDepIds.has(dep.id)){dep.removeSub(this$1);}}var tmp=this.depIds;this.depIds=this.newDepIds;this.newDepIds=tmp;this.newDepIds.clear();tmp=this.deps;this.deps=this.newDeps;this.newDeps=tmp;this.newDeps.length=0;};/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */Watcher.prototype.update=function update(){/* istanbul ignore else */if(this.lazy){this.dirty=true;}else if(this.sync){this.run();}else{queueWatcher(this);}};/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */Watcher.prototype.run=function run(){if(this.active){var value=this.get();if(value!==this.value||// Deep watchers and watchers on Object/Arrays should fire even
// when the value is the same, because the value may
// have mutated.
isObject(value)||this.deep){// set new value
var oldValue=this.value;this.value=value;if(this.user){try{this.cb.call(this.vm,value,oldValue);}catch(e){handleError(e,this.vm,"callback for watcher \""+this.expression+"\"");}}else{this.cb.call(this.vm,value,oldValue);}}}};/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */Watcher.prototype.evaluate=function evaluate(){this.value=this.get();this.dirty=false;};/**
 * Depend on all deps collected by this watcher.
 */Watcher.prototype.depend=function depend(){var this$1=this;var i=this.deps.length;while(i--){this$1.deps[i].depend();}};/**
 * Remove self from all dependencies' subscriber list.
 */Watcher.prototype.teardown=function teardown(){var this$1=this;if(this.active){// remove self from vm's watcher list
// this is a somewhat expensive operation so we skip it
// if the vm is being destroyed.
if(!this.vm._isBeingDestroyed){remove(this.vm._watchers,this);}var i=this.deps.length;while(i--){this$1.deps[i].removeSub(this$1);}this.active=false;}};/*  */var sharedPropertyDefinition={enumerable:true,configurable:true,get:noop,set:noop};function proxy(target,sourceKey,key){sharedPropertyDefinition.get=function proxyGetter(){return this[sourceKey][key];};sharedPropertyDefinition.set=function proxySetter(val){this[sourceKey][key]=val;};Object.defineProperty(target,key,sharedPropertyDefinition);}function initState(vm){vm._watchers=[];var opts=vm.$options;if(opts.props){initProps(vm,opts.props);}if(opts.methods){initMethods(vm,opts.methods);}if(opts.data){initData(vm);}else{observe(vm._data={},true/* asRootData */);}if(opts.computed){initComputed(vm,opts.computed);}if(opts.watch&&opts.watch!==nativeWatch){initWatch(vm,opts.watch);}}function initProps(vm,propsOptions){var propsData=vm.$options.propsData||{};var props=vm._props={};// cache prop keys so that future props updates can iterate using Array
// instead of dynamic object key enumeration.
var keys=vm.$options._propKeys=[];var isRoot=!vm.$parent;// root instance props should be converted
observerState.shouldConvert=isRoot;var loop=function loop(key){keys.push(key);var value=validateProp(key,propsOptions,propsData,vm);/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){var hyphenatedKey=hyphenate(key);if(isReservedAttribute(hyphenatedKey)||config.isReservedAttr(hyphenatedKey)){warn("\""+hyphenatedKey+"\" is a reserved attribute and cannot be used as component prop.",vm);}defineReactive(props,key,value,function(){if(vm.$parent&&!isUpdatingChildComponent){warn("Avoid mutating a prop directly since the value will be "+"overwritten whenever the parent component re-renders. "+"Instead, use a data or computed property based on the prop's "+"value. Prop being mutated: \""+key+"\"",vm);}});}else{defineReactive(props,key,value);}// static props are already proxied on the component's prototype
// during Vue.extend(). We only need to proxy props defined at
// instantiation here.
if(!(key in vm)){proxy(vm,"_props",key);}};for(var key in propsOptions){loop(key);}observerState.shouldConvert=true;}function initData(vm){var data=vm.$options.data;data=vm._data=typeof data==='function'?getData(data,vm):data||{};if(!isPlainObject(data)){data={};process.env.NODE_ENV!=='production'&&warn('data functions should return an object:\n'+'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',vm);}// proxy data on instance
var keys=Object.keys(data);var props=vm.$options.props;var methods=vm.$options.methods;var i=keys.length;while(i--){var key=keys[i];if(process.env.NODE_ENV!=='production'){if(methods&&hasOwn(methods,key)){warn("Method \""+key+"\" has already been defined as a data property.",vm);}}if(props&&hasOwn(props,key)){process.env.NODE_ENV!=='production'&&warn("The data property \""+key+"\" is already declared as a prop. "+"Use prop default value instead.",vm);}else if(!isReserved(key)){proxy(vm,"_data",key);}}// observe data
observe(data,true/* asRootData */);}function getData(data,vm){try{return data.call(vm,vm);}catch(e){handleError(e,vm,"data()");return{};}}var computedWatcherOptions={lazy:true};function initComputed(vm,computed){// $flow-disable-line
var watchers=vm._computedWatchers=Object.create(null);// computed properties are just getters during SSR
var isSSR=isServerRendering();for(var key in computed){var userDef=computed[key];var getter=typeof userDef==='function'?userDef:userDef.get;if(process.env.NODE_ENV!=='production'&&getter==null){warn("Getter is missing for computed property \""+key+"\".",vm);}if(!isSSR){// create internal watcher for the computed property.
watchers[key]=new Watcher(vm,getter||noop,noop,computedWatcherOptions);}// component-defined computed properties are already defined on the
// component prototype. We only need to define computed properties defined
// at instantiation here.
if(!(key in vm)){defineComputed(vm,key,userDef);}else if(process.env.NODE_ENV!=='production'){if(key in vm.$data){warn("The computed property \""+key+"\" is already defined in data.",vm);}else if(vm.$options.props&&key in vm.$options.props){warn("The computed property \""+key+"\" is already defined as a prop.",vm);}}}}function defineComputed(target,key,userDef){var shouldCache=!isServerRendering();if(typeof userDef==='function'){sharedPropertyDefinition.get=shouldCache?createComputedGetter(key):userDef;sharedPropertyDefinition.set=noop;}else{sharedPropertyDefinition.get=userDef.get?shouldCache&&userDef.cache!==false?createComputedGetter(key):userDef.get:noop;sharedPropertyDefinition.set=userDef.set?userDef.set:noop;}if(process.env.NODE_ENV!=='production'&&sharedPropertyDefinition.set===noop){sharedPropertyDefinition.set=function(){warn("Computed property \""+key+"\" was assigned to but it has no setter.",this);};}Object.defineProperty(target,key,sharedPropertyDefinition);}function createComputedGetter(key){return function computedGetter(){var watcher=this._computedWatchers&&this._computedWatchers[key];if(watcher){if(watcher.dirty){watcher.evaluate();}if(Dep.target){watcher.depend();}return watcher.value;}};}function initMethods(vm,methods){var props=vm.$options.props;for(var key in methods){if(process.env.NODE_ENV!=='production'){if(methods[key]==null){warn("Method \""+key+"\" has an undefined value in the component definition. "+"Did you reference the function correctly?",vm);}if(props&&hasOwn(props,key)){warn("Method \""+key+"\" has already been defined as a prop.",vm);}if(key in vm&&isReserved(key)){warn("Method \""+key+"\" conflicts with an existing Vue instance method. "+"Avoid defining component methods that start with _ or $.");}}vm[key]=methods[key]==null?noop:bind(methods[key],vm);}}function initWatch(vm,watch){for(var key in watch){var handler=watch[key];if(Array.isArray(handler)){for(var i=0;i<handler.length;i++){createWatcher(vm,key,handler[i]);}}else{createWatcher(vm,key,handler);}}}function createWatcher(vm,keyOrFn,handler,options){if(isPlainObject(handler)){options=handler;handler=handler.handler;}if(typeof handler==='string'){handler=vm[handler];}return vm.$watch(keyOrFn,handler,options);}function stateMixin(Vue){// flow somehow has problems with directly declared definition object
// when using Object.defineProperty, so we have to procedurally build up
// the object here.
var dataDef={};dataDef.get=function(){return this._data;};var propsDef={};propsDef.get=function(){return this._props;};if(process.env.NODE_ENV!=='production'){dataDef.set=function(newData){warn('Avoid replacing instance root $data. '+'Use nested data properties instead.',this);};propsDef.set=function(){warn("$props is readonly.",this);};}Object.defineProperty(Vue.prototype,'$data',dataDef);Object.defineProperty(Vue.prototype,'$props',propsDef);Vue.prototype.$set=set;Vue.prototype.$delete=del;Vue.prototype.$watch=function(expOrFn,cb,options){var vm=this;if(isPlainObject(cb)){return createWatcher(vm,expOrFn,cb,options);}options=options||{};options.user=true;var watcher=new Watcher(vm,expOrFn,cb,options);if(options.immediate){cb.call(vm,watcher.value);}return function unwatchFn(){watcher.teardown();};};}/*  */function initProvide(vm){var provide=vm.$options.provide;if(provide){vm._provided=typeof provide==='function'?provide.call(vm):provide;}}function initInjections(vm){var result=resolveInject(vm.$options.inject,vm);if(result){observerState.shouldConvert=false;Object.keys(result).forEach(function(key){/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){defineReactive(vm,key,result[key],function(){warn("Avoid mutating an injected value directly since the changes will be "+"overwritten whenever the provided component re-renders. "+"injection being mutated: \""+key+"\"",vm);});}else{defineReactive(vm,key,result[key]);}});observerState.shouldConvert=true;}}function resolveInject(inject,vm){if(inject){// inject is :any because flow is not smart enough to figure out cached
var result=Object.create(null);var keys=hasSymbol?Reflect.ownKeys(inject).filter(function(key){/* istanbul ignore next */return Object.getOwnPropertyDescriptor(inject,key).enumerable;}):Object.keys(inject);for(var i=0;i<keys.length;i++){var key=keys[i];var provideKey=inject[key].from;var source=vm;while(source){if(source._provided&&provideKey in source._provided){result[key]=source._provided[provideKey];break;}source=source.$parent;}if(!source){if('default'in inject[key]){var provideDefault=inject[key].default;result[key]=typeof provideDefault==='function'?provideDefault.call(vm):provideDefault;}else if(process.env.NODE_ENV!=='production'){warn("Injection \""+key+"\" not found",vm);}}}return result;}}/*  *//**
 * Runtime helper for rendering v-for lists.
 */function renderList(val,render){var ret,i,l,keys,key;if(Array.isArray(val)||typeof val==='string'){ret=new Array(val.length);for(i=0,l=val.length;i<l;i++){ret[i]=render(val[i],i);}}else if(typeof val==='number'){ret=new Array(val);for(i=0;i<val;i++){ret[i]=render(i+1,i);}}else if(isObject(val)){keys=Object.keys(val);ret=new Array(keys.length);for(i=0,l=keys.length;i<l;i++){key=keys[i];ret[i]=render(val[key],key,i);}}if(isDef(ret)){ret._isVList=true;}return ret;}/*  *//**
 * Runtime helper for rendering <slot>
 */function renderSlot(name,fallback,props,bindObject){var scopedSlotFn=this.$scopedSlots[name];var nodes;if(scopedSlotFn){// scoped slot
props=props||{};if(bindObject){if(process.env.NODE_ENV!=='production'&&!isObject(bindObject)){warn('slot v-bind without argument expects an Object',this);}props=extend(extend({},bindObject),props);}nodes=scopedSlotFn(props)||fallback;}else{var slotNodes=this.$slots[name];// warn duplicate slot usage
if(slotNodes){if(process.env.NODE_ENV!=='production'&&slotNodes._rendered){warn("Duplicate presence of slot \""+name+"\" found in the same render tree "+"- this will likely cause render errors.",this);}slotNodes._rendered=true;}nodes=slotNodes||fallback;}var target=props&&props.slot;if(target){return this.$createElement('template',{slot:target},nodes);}else{return nodes;}}/*  *//**
 * Runtime helper for resolving filters
 */function resolveFilter(id){return resolveAsset(this.$options,'filters',id,true)||identity;}/*  *//**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */function checkKeyCodes(eventKeyCode,key,builtInAlias,eventKeyName){var keyCodes=config.keyCodes[key]||builtInAlias;if(keyCodes){if(Array.isArray(keyCodes)){return keyCodes.indexOf(eventKeyCode)===-1;}else{return keyCodes!==eventKeyCode;}}else if(eventKeyName){return hyphenate(eventKeyName)!==key;}}/*  *//**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */function bindObjectProps(data,tag,value,asProp,isSync){if(value){if(!isObject(value)){process.env.NODE_ENV!=='production'&&warn('v-bind without argument expects an Object or Array value',this);}else{if(Array.isArray(value)){value=toObject(value);}var hash;var loop=function loop(key){if(key==='class'||key==='style'||isReservedAttribute(key)){hash=data;}else{var type=data.attrs&&data.attrs.type;hash=asProp||config.mustUseProp(tag,type,key)?data.domProps||(data.domProps={}):data.attrs||(data.attrs={});}if(!(key in hash)){hash[key]=value[key];if(isSync){var on=data.on||(data.on={});on["update:"+key]=function($event){value[key]=$event;};}}};for(var key in value){loop(key);}}}return data;}/*  *//**
 * Runtime helper for rendering static trees.
 */function renderStatic(index,isInFor){var cached=this._staticTrees||(this._staticTrees=[]);var tree=cached[index];// if has already-rendered static tree and not inside v-for,
// we can reuse the same tree by doing a shallow clone.
if(tree&&!isInFor){return Array.isArray(tree)?cloneVNodes(tree):cloneVNode(tree);}// otherwise, render a fresh tree.
tree=cached[index]=this.$options.staticRenderFns[index].call(this._renderProxy,null,this// for render fns generated for functional component templates
);markStatic(tree,"__static__"+index,false);return tree;}/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */function markOnce(tree,index,key){markStatic(tree,"__once__"+index+(key?"_"+key:""),true);return tree;}function markStatic(tree,key,isOnce){if(Array.isArray(tree)){for(var i=0;i<tree.length;i++){if(tree[i]&&typeof tree[i]!=='string'){markStaticNode(tree[i],key+"_"+i,isOnce);}}}else{markStaticNode(tree,key,isOnce);}}function markStaticNode(node,key,isOnce){node.isStatic=true;node.key=key;node.isOnce=isOnce;}/*  */function bindObjectListeners(data,value){if(value){if(!isPlainObject(value)){process.env.NODE_ENV!=='production'&&warn('v-on without argument expects an Object value',this);}else{var on=data.on=data.on?extend({},data.on):{};for(var key in value){var existing=on[key];var ours=value[key];on[key]=existing?[].concat(existing,ours):ours;}}}return data;}/*  */function installRenderHelpers(target){target._o=markOnce;target._n=toNumber;target._s=toString;target._l=renderList;target._t=renderSlot;target._q=looseEqual;target._i=looseIndexOf;target._m=renderStatic;target._f=resolveFilter;target._k=checkKeyCodes;target._b=bindObjectProps;target._v=createTextVNode;target._e=createEmptyVNode;target._u=resolveScopedSlots;target._g=bindObjectListeners;}/*  */function FunctionalRenderContext(data,props,children,parent,Ctor){var options=Ctor.options;this.data=data;this.props=props;this.children=children;this.parent=parent;this.listeners=data.on||emptyObject;this.injections=resolveInject(options.inject,parent);this.slots=function(){return resolveSlots(children,parent);};// ensure the createElement function in functional components
// gets a unique context - this is necessary for correct named slot check
var contextVm=Object.create(parent);var isCompiled=isTrue(options._compiled);var needNormalization=!isCompiled;// support for compiled functional template
if(isCompiled){// exposing $options for renderStatic()
this.$options=options;// pre-resolve slots for renderSlot()
this.$slots=this.slots();this.$scopedSlots=data.scopedSlots||emptyObject;}if(options._scopeId){this._c=function(a,b,c,d){var vnode=createElement(contextVm,a,b,c,d,needNormalization);if(vnode){vnode.fnScopeId=options._scopeId;vnode.fnContext=parent;}return vnode;};}else{this._c=function(a,b,c,d){return createElement(contextVm,a,b,c,d,needNormalization);};}}installRenderHelpers(FunctionalRenderContext.prototype);function createFunctionalComponent(Ctor,propsData,data,contextVm,children){var options=Ctor.options;var props={};var propOptions=options.props;if(isDef(propOptions)){for(var key in propOptions){props[key]=validateProp(key,propOptions,propsData||emptyObject);}}else{if(isDef(data.attrs)){mergeProps(props,data.attrs);}if(isDef(data.props)){mergeProps(props,data.props);}}var renderContext=new FunctionalRenderContext(data,props,children,contextVm,Ctor);var vnode=options.render.call(null,renderContext._c,renderContext);if(vnode instanceof VNode){vnode.fnContext=contextVm;vnode.fnOptions=options;if(data.slot){(vnode.data||(vnode.data={})).slot=data.slot;}}return vnode;}function mergeProps(to,from){for(var key in from){to[camelize(key)]=from[key];}}/*  */// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.
// Updates the state of the component to weex native render engine.
/*  */// https://github.com/Hanks10100/weex-native-directive/tree/master/component
// listening on native callback
/*  *//*  */// hooks to be invoked on component VNodes during patch
var componentVNodeHooks={init:function init(vnode,hydrating,parentElm,refElm){if(!vnode.componentInstance||vnode.componentInstance._isDestroyed){var child=vnode.componentInstance=createComponentInstanceForVnode(vnode,activeInstance,parentElm,refElm);child.$mount(hydrating?vnode.elm:undefined,hydrating);}else if(vnode.data.keepAlive){// kept-alive components, treat as a patch
var mountedNode=vnode;// work around flow
componentVNodeHooks.prepatch(mountedNode,mountedNode);}},prepatch:function prepatch(oldVnode,vnode){var options=vnode.componentOptions;var child=vnode.componentInstance=oldVnode.componentInstance;updateChildComponent(child,options.propsData,// updated props
options.listeners,// updated listeners
vnode,// new parent vnode
options.children// new children
);},insert:function insert(vnode){var context=vnode.context;var componentInstance=vnode.componentInstance;if(!componentInstance._isMounted){componentInstance._isMounted=true;callHook(componentInstance,'mounted');}if(vnode.data.keepAlive){if(context._isMounted){// vue-router#1212
// During updates, a kept-alive component's child components may
// change, so directly walking the tree here may call activated hooks
// on incorrect children. Instead we push them into a queue which will
// be processed after the whole patch process ended.
queueActivatedComponent(componentInstance);}else{activateChildComponent(componentInstance,true/* direct */);}}},destroy:function destroy(vnode){var componentInstance=vnode.componentInstance;if(!componentInstance._isDestroyed){if(!vnode.data.keepAlive){componentInstance.$destroy();}else{deactivateChildComponent(componentInstance,true/* direct */);}}}};var hooksToMerge=Object.keys(componentVNodeHooks);function createComponent(Ctor,data,context,children,tag){if(isUndef(Ctor)){return;}var baseCtor=context.$options._base;// plain options object: turn it into a constructor
if(isObject(Ctor)){Ctor=baseCtor.extend(Ctor);}// if at this stage it's not a constructor or an async component factory,
// reject.
if(typeof Ctor!=='function'){if(process.env.NODE_ENV!=='production'){warn("Invalid Component definition: "+String(Ctor),context);}return;}// async component
var asyncFactory;if(isUndef(Ctor.cid)){asyncFactory=Ctor;Ctor=resolveAsyncComponent(asyncFactory,baseCtor,context);if(Ctor===undefined){// return a placeholder node for async component, which is rendered
// as a comment node but preserves all the raw information for the node.
// the information will be used for async server-rendering and hydration.
return createAsyncPlaceholder(asyncFactory,data,context,children,tag);}}data=data||{};// resolve constructor options in case global mixins are applied after
// component constructor creation
resolveConstructorOptions(Ctor);// transform component v-model data into props & events
if(isDef(data.model)){transformModel(Ctor.options,data);}// extract props
var propsData=extractPropsFromVNodeData(data,Ctor,tag);// functional component
if(isTrue(Ctor.options.functional)){return createFunctionalComponent(Ctor,propsData,data,context,children);}// extract listeners, since these needs to be treated as
// child component listeners instead of DOM listeners
var listeners=data.on;// replace with listeners with .native modifier
// so it gets processed during parent component patch.
data.on=data.nativeOn;if(isTrue(Ctor.options.abstract)){// abstract components do not keep anything
// other than props & listeners & slot
// work around flow
var slot=data.slot;data={};if(slot){data.slot=slot;}}// merge component management hooks onto the placeholder node
mergeHooks(data);// return a placeholder vnode
var name=Ctor.options.name||tag;var vnode=new VNode("vue-component-"+Ctor.cid+(name?"-"+name:''),data,undefined,undefined,undefined,context,{Ctor:Ctor,propsData:propsData,listeners:listeners,tag:tag,children:children},asyncFactory);// Weex specific: invoke recycle-list optimized @render function for
// extracting cell-slot template.
// https://github.com/Hanks10100/weex-native-directive/tree/master/component
/* istanbul ignore if */return vnode;}function createComponentInstanceForVnode(vnode,// we know it's MountedComponentVNode but flow doesn't
parent,// activeInstance in lifecycle state
parentElm,refElm){var options={_isComponent:true,parent:parent,_parentVnode:vnode,_parentElm:parentElm||null,_refElm:refElm||null};// check inline-template render functions
var inlineTemplate=vnode.data.inlineTemplate;if(isDef(inlineTemplate)){options.render=inlineTemplate.render;options.staticRenderFns=inlineTemplate.staticRenderFns;}return new vnode.componentOptions.Ctor(options);}function mergeHooks(data){if(!data.hook){data.hook={};}for(var i=0;i<hooksToMerge.length;i++){var key=hooksToMerge[i];var fromParent=data.hook[key];var ours=componentVNodeHooks[key];data.hook[key]=fromParent?mergeHook$1(ours,fromParent):ours;}}function mergeHook$1(one,two){return function(a,b,c,d){one(a,b,c,d);two(a,b,c,d);};}// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options,data){var prop=options.model&&options.model.prop||'value';var event=options.model&&options.model.event||'input';(data.props||(data.props={}))[prop]=data.model.value;var on=data.on||(data.on={});if(isDef(on[event])){on[event]=[data.model.callback].concat(on[event]);}else{on[event]=data.model.callback;}}/*  */var SIMPLE_NORMALIZE=1;var ALWAYS_NORMALIZE=2;// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context,tag,data,children,normalizationType,alwaysNormalize){if(Array.isArray(data)||isPrimitive(data)){normalizationType=children;children=data;data=undefined;}if(isTrue(alwaysNormalize)){normalizationType=ALWAYS_NORMALIZE;}return _createElement(context,tag,data,children,normalizationType);}function _createElement(context,tag,data,children,normalizationType){if(isDef(data)&&isDef(data.__ob__)){process.env.NODE_ENV!=='production'&&warn("Avoid using observed data object as vnode data: "+JSON.stringify(data)+"\n"+'Always create fresh vnode data objects in each render!',context);return createEmptyVNode();}// object syntax in v-bind
if(isDef(data)&&isDef(data.is)){tag=data.is;}if(!tag){// in case of component :is set to falsy value
return createEmptyVNode();}// warn against non-primitive key
if(process.env.NODE_ENV!=='production'&&isDef(data)&&isDef(data.key)&&!isPrimitive(data.key)){{warn('Avoid using non-primitive value as key, '+'use string/number value instead.',context);}}// support single function children as default scoped slot
if(Array.isArray(children)&&typeof children[0]==='function'){data=data||{};data.scopedSlots={default:children[0]};children.length=0;}if(normalizationType===ALWAYS_NORMALIZE){children=normalizeChildren(children);}else if(normalizationType===SIMPLE_NORMALIZE){children=simpleNormalizeChildren(children);}var vnode,ns;if(typeof tag==='string'){var Ctor;ns=context.$vnode&&context.$vnode.ns||config.getTagNamespace(tag);if(config.isReservedTag(tag)){// platform built-in elements
vnode=new VNode(config.parsePlatformTagName(tag),data,children,undefined,undefined,context);}else if(isDef(Ctor=resolveAsset(context.$options,'components',tag))){// component
vnode=createComponent(Ctor,data,context,children,tag);}else{// unknown or unlisted namespaced elements
// check at runtime because it may get assigned a namespace when its
// parent normalizes children
vnode=new VNode(tag,data,children,undefined,undefined,context);}}else{// direct component options / constructor
vnode=createComponent(tag,data,context,children);}if(isDef(vnode)){if(ns){applyNS(vnode,ns);}return vnode;}else{return createEmptyVNode();}}function applyNS(vnode,ns,force){vnode.ns=ns;if(vnode.tag==='foreignObject'){// use default namespace inside foreignObject
ns=undefined;force=true;}if(isDef(vnode.children)){for(var i=0,l=vnode.children.length;i<l;i++){var child=vnode.children[i];if(isDef(child.tag)&&(isUndef(child.ns)||isTrue(force))){applyNS(child,ns,force);}}}}/*  */function initRender(vm){vm._vnode=null;// the root of the child tree
vm._staticTrees=null;// v-once cached trees
var options=vm.$options;var parentVnode=vm.$vnode=options._parentVnode;// the placeholder node in parent tree
var renderContext=parentVnode&&parentVnode.context;vm.$slots=resolveSlots(options._renderChildren,renderContext);vm.$scopedSlots=emptyObject;// bind the createElement fn to this instance
// so that we get proper render context inside it.
// args order: tag, data, children, normalizationType, alwaysNormalize
// internal version is used by render functions compiled from templates
vm._c=function(a,b,c,d){return createElement(vm,a,b,c,d,false);};// normalization is always applied for the public version, used in
// user-written render functions.
vm.$createElement=function(a,b,c,d){return createElement(vm,a,b,c,d,true);};// $attrs & $listeners are exposed for easier HOC creation.
// they need to be reactive so that HOCs using them are always updated
var parentData=parentVnode&&parentVnode.data;/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){defineReactive(vm,'$attrs',parentData&&parentData.attrs||emptyObject,function(){!isUpdatingChildComponent&&warn("$attrs is readonly.",vm);},true);defineReactive(vm,'$listeners',options._parentListeners||emptyObject,function(){!isUpdatingChildComponent&&warn("$listeners is readonly.",vm);},true);}else{defineReactive(vm,'$attrs',parentData&&parentData.attrs||emptyObject,null,true);defineReactive(vm,'$listeners',options._parentListeners||emptyObject,null,true);}}function renderMixin(Vue){// install runtime convenience helpers
installRenderHelpers(Vue.prototype);Vue.prototype.$nextTick=function(fn){return nextTick(fn,this);};Vue.prototype._render=function(){var vm=this;var ref=vm.$options;var render=ref.render;var _parentVnode=ref._parentVnode;if(vm._isMounted){// if the parent didn't update, the slot nodes will be the ones from
// last render. They need to be cloned to ensure "freshness" for this render.
for(var key in vm.$slots){var slot=vm.$slots[key];// _rendered is a flag added by renderSlot, but may not be present
// if the slot is passed from manually written render functions
if(slot._rendered||slot[0]&&slot[0].elm){vm.$slots[key]=cloneVNodes(slot,true/* deep */);}}}vm.$scopedSlots=_parentVnode&&_parentVnode.data.scopedSlots||emptyObject;// set parent vnode. this allows render functions to have access
// to the data on the placeholder node.
vm.$vnode=_parentVnode;// render self
var vnode;try{vnode=render.call(vm._renderProxy,vm.$createElement);}catch(e){handleError(e,vm,"render");// return error render result,
// or previous vnode to prevent render error causing blank component
/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){if(vm.$options.renderError){try{vnode=vm.$options.renderError.call(vm._renderProxy,vm.$createElement,e);}catch(e){handleError(e,vm,"renderError");vnode=vm._vnode;}}else{vnode=vm._vnode;}}else{vnode=vm._vnode;}}// return empty vnode in case the render function errored out
if(!(vnode instanceof VNode)){if(process.env.NODE_ENV!=='production'&&Array.isArray(vnode)){warn('Multiple root nodes returned from render function. Render function '+'should return a single root node.',vm);}vnode=createEmptyVNode();}// set parent
vnode.parent=_parentVnode;return vnode;};}/*  */var uid$1=0;function initMixin(Vue){Vue.prototype._init=function(options){var vm=this;// a uid
vm._uid=uid$1++;var startTag,endTag;/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){startTag="vue-perf-start:"+vm._uid;endTag="vue-perf-end:"+vm._uid;mark(startTag);}// a flag to avoid this being observed
vm._isVue=true;// merge options
if(options&&options._isComponent){// optimize internal component instantiation
// since dynamic options merging is pretty slow, and none of the
// internal component options needs special treatment.
initInternalComponent(vm,options);}else{vm.$options=mergeOptions(resolveConstructorOptions(vm.constructor),options||{},vm);}/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){initProxy(vm);}else{vm._renderProxy=vm;}// expose real self
vm._self=vm;initLifecycle(vm);initEvents(vm);initRender(vm);callHook(vm,'beforeCreate');initInjections(vm);// resolve injections before data/props
initState(vm);initProvide(vm);// resolve provide after data/props
callHook(vm,'created');/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){vm._name=formatComponentName(vm,false);mark(endTag);measure("vue "+vm._name+" init",startTag,endTag);}if(vm.$options.el){vm.$mount(vm.$options.el);}};}function initInternalComponent(vm,options){var opts=vm.$options=Object.create(vm.constructor.options);// doing this because it's faster than dynamic enumeration.
var parentVnode=options._parentVnode;opts.parent=options.parent;opts._parentVnode=parentVnode;opts._parentElm=options._parentElm;opts._refElm=options._refElm;var vnodeComponentOptions=parentVnode.componentOptions;opts.propsData=vnodeComponentOptions.propsData;opts._parentListeners=vnodeComponentOptions.listeners;opts._renderChildren=vnodeComponentOptions.children;opts._componentTag=vnodeComponentOptions.tag;if(options.render){opts.render=options.render;opts.staticRenderFns=options.staticRenderFns;}}function resolveConstructorOptions(Ctor){var options=Ctor.options;if(Ctor.super){var superOptions=resolveConstructorOptions(Ctor.super);var cachedSuperOptions=Ctor.superOptions;if(superOptions!==cachedSuperOptions){// super option changed,
// need to resolve new options.
Ctor.superOptions=superOptions;// check if there are any late-modified/attached options (#4976)
var modifiedOptions=resolveModifiedOptions(Ctor);// update base extend options
if(modifiedOptions){extend(Ctor.extendOptions,modifiedOptions);}options=Ctor.options=mergeOptions(superOptions,Ctor.extendOptions);if(options.name){options.components[options.name]=Ctor;}}}return options;}function resolveModifiedOptions(Ctor){var modified;var latest=Ctor.options;var extended=Ctor.extendOptions;var sealed=Ctor.sealedOptions;for(var key in latest){if(latest[key]!==sealed[key]){if(!modified){modified={};}modified[key]=dedupe(latest[key],extended[key],sealed[key]);}}return modified;}function dedupe(latest,extended,sealed){// compare latest and sealed to ensure lifecycle hooks won't be duplicated
// between merges
if(Array.isArray(latest)){var res=[];sealed=Array.isArray(sealed)?sealed:[sealed];extended=Array.isArray(extended)?extended:[extended];for(var i=0;i<latest.length;i++){// push original options and not sealed options to exclude duplicated options
if(extended.indexOf(latest[i])>=0||sealed.indexOf(latest[i])<0){res.push(latest[i]);}}return res;}else{return latest;}}function Vue$3(options){if(process.env.NODE_ENV!=='production'&&!(this instanceof Vue$3)){warn('Vue is a constructor and should be called with the `new` keyword');}this._init(options);}initMixin(Vue$3);stateMixin(Vue$3);eventsMixin(Vue$3);lifecycleMixin(Vue$3);renderMixin(Vue$3);/*  */function initUse(Vue){Vue.use=function(plugin){var installedPlugins=this._installedPlugins||(this._installedPlugins=[]);if(installedPlugins.indexOf(plugin)>-1){return this;}// additional parameters
var args=toArray(arguments,1);args.unshift(this);if(typeof plugin.install==='function'){plugin.install.apply(plugin,args);}else if(typeof plugin==='function'){plugin.apply(null,args);}installedPlugins.push(plugin);return this;};}/*  */function initMixin$1(Vue){Vue.mixin=function(mixin){this.options=mergeOptions(this.options,mixin);return this;};}/*  */function initExtend(Vue){/**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */Vue.cid=0;var cid=1;/**
   * Class inheritance
   */Vue.extend=function(extendOptions){extendOptions=extendOptions||{};var Super=this;var SuperId=Super.cid;var cachedCtors=extendOptions._Ctor||(extendOptions._Ctor={});if(cachedCtors[SuperId]){return cachedCtors[SuperId];}var name=extendOptions.name||Super.options.name;if(process.env.NODE_ENV!=='production'&&name){validateComponentName(name);}var Sub=function VueComponent(options){this._init(options);};Sub.prototype=Object.create(Super.prototype);Sub.prototype.constructor=Sub;Sub.cid=cid++;Sub.options=mergeOptions(Super.options,extendOptions);Sub['super']=Super;// For props and computed properties, we define the proxy getters on
// the Vue instances at extension time, on the extended prototype. This
// avoids Object.defineProperty calls for each instance created.
if(Sub.options.props){initProps$1(Sub);}if(Sub.options.computed){initComputed$1(Sub);}// allow further extension/mixin/plugin usage
Sub.extend=Super.extend;Sub.mixin=Super.mixin;Sub.use=Super.use;// create asset registers, so extended classes
// can have their private assets too.
ASSET_TYPES.forEach(function(type){Sub[type]=Super[type];});// enable recursive self-lookup
if(name){Sub.options.components[name]=Sub;}// keep a reference to the super options at extension time.
// later at instantiation we can check if Super's options have
// been updated.
Sub.superOptions=Super.options;Sub.extendOptions=extendOptions;Sub.sealedOptions=extend({},Sub.options);// cache constructor
cachedCtors[SuperId]=Sub;return Sub;};}function initProps$1(Comp){var props=Comp.options.props;for(var key in props){proxy(Comp.prototype,"_props",key);}}function initComputed$1(Comp){var computed=Comp.options.computed;for(var key in computed){defineComputed(Comp.prototype,key,computed[key]);}}/*  */function initAssetRegisters(Vue){/**
   * Create asset registration methods.
   */ASSET_TYPES.forEach(function(type){Vue[type]=function(id,definition){if(!definition){return this.options[type+'s'][id];}else{/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&type==='component'){validateComponentName(id);}if(type==='component'&&isPlainObject(definition)){definition.name=definition.name||id;definition=this.options._base.extend(definition);}if(type==='directive'&&typeof definition==='function'){definition={bind:definition,update:definition};}this.options[type+'s'][id]=definition;return definition;}};});}/*  */function getComponentName(opts){return opts&&(opts.Ctor.options.name||opts.tag);}function matches(pattern,name){if(Array.isArray(pattern)){return pattern.indexOf(name)>-1;}else if(typeof pattern==='string'){return pattern.split(',').indexOf(name)>-1;}else if(isRegExp(pattern)){return pattern.test(name);}/* istanbul ignore next */return false;}function pruneCache(keepAliveInstance,filter){var cache=keepAliveInstance.cache;var keys=keepAliveInstance.keys;var _vnode=keepAliveInstance._vnode;for(var key in cache){var cachedNode=cache[key];if(cachedNode){var name=getComponentName(cachedNode.componentOptions);if(name&&!filter(name)){pruneCacheEntry(cache,key,keys,_vnode);}}}}function pruneCacheEntry(cache,key,keys,current){var cached$$1=cache[key];if(cached$$1&&(!current||cached$$1.tag!==current.tag)){cached$$1.componentInstance.$destroy();}cache[key]=null;remove(keys,key);}var patternTypes=[String,RegExp,Array];var KeepAlive={name:'keep-alive',abstract:true,props:{include:patternTypes,exclude:patternTypes,max:[String,Number]},created:function created(){this.cache=Object.create(null);this.keys=[];},destroyed:function destroyed(){var this$1=this;for(var key in this$1.cache){pruneCacheEntry(this$1.cache,key,this$1.keys);}},watch:{include:function include(val){pruneCache(this,function(name){return matches(val,name);});},exclude:function exclude(val){pruneCache(this,function(name){return!matches(val,name);});}},render:function render(){var slot=this.$slots.default;var vnode=getFirstComponentChild(slot);var componentOptions=vnode&&vnode.componentOptions;if(componentOptions){// check pattern
var name=getComponentName(componentOptions);var ref=this;var include=ref.include;var exclude=ref.exclude;if(// not included
include&&(!name||!matches(include,name))||// excluded
exclude&&name&&matches(exclude,name)){return vnode;}var ref$1=this;var cache=ref$1.cache;var keys=ref$1.keys;var key=vnode.key==null// same constructor may get registered as different local components
// so cid alone is not enough (#3269)
?componentOptions.Ctor.cid+(componentOptions.tag?"::"+componentOptions.tag:''):vnode.key;if(cache[key]){vnode.componentInstance=cache[key].componentInstance;// make current key freshest
remove(keys,key);keys.push(key);}else{cache[key]=vnode;keys.push(key);// prune oldest entry
if(this.max&&keys.length>parseInt(this.max)){pruneCacheEntry(cache,keys[0],keys,this._vnode);}}vnode.data.keepAlive=true;}return vnode||slot&&slot[0];}};var builtInComponents={KeepAlive:KeepAlive};/*  */function initGlobalAPI(Vue){// config
var configDef={};configDef.get=function(){return config;};if(process.env.NODE_ENV!=='production'){configDef.set=function(){warn('Do not replace the Vue.config object, set individual fields instead.');};}Object.defineProperty(Vue,'config',configDef);// exposed util methods.
// NOTE: these are not considered part of the public API - avoid relying on
// them unless you are aware of the risk.
Vue.util={warn:warn,extend:extend,mergeOptions:mergeOptions,defineReactive:defineReactive};Vue.set=set;Vue.delete=del;Vue.nextTick=nextTick;Vue.options=Object.create(null);ASSET_TYPES.forEach(function(type){Vue.options[type+'s']=Object.create(null);});// this is used to identify the "base" constructor to extend all plain-object
// components with in Weex's multi-instance scenarios.
Vue.options._base=Vue;extend(Vue.options.components,builtInComponents);initUse(Vue);initMixin$1(Vue);initExtend(Vue);initAssetRegisters(Vue);}initGlobalAPI(Vue$3);Object.defineProperty(Vue$3.prototype,'$isServer',{get:isServerRendering});Object.defineProperty(Vue$3.prototype,'$ssrContext',{get:function get(){/* istanbul ignore next */return this.$vnode&&this.$vnode.ssrContext;}});Vue$3.version='2.5.13';/*  */// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr=makeMap('style,class');// attributes that should be using props for binding
var acceptValue=makeMap('input,textarea,option,select,progress');var mustUseProp=function mustUseProp(tag,type,attr){return attr==='value'&&acceptValue(tag)&&type!=='button'||attr==='selected'&&tag==='option'||attr==='checked'&&tag==='input'||attr==='muted'&&tag==='video';};var isEnumeratedAttr=makeMap('contenteditable,draggable,spellcheck');var isBooleanAttr=makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,'+'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,'+'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,'+'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,'+'required,reversed,scoped,seamless,selected,sortable,translate,'+'truespeed,typemustmatch,visible');var xlinkNS='http://www.w3.org/1999/xlink';var isXlink=function isXlink(name){return name.charAt(5)===':'&&name.slice(0,5)==='xlink';};var getXlinkProp=function getXlinkProp(name){return isXlink(name)?name.slice(6,name.length):'';};var isFalsyAttrValue=function isFalsyAttrValue(val){return val==null||val===false;};/*  */function genClassForVnode(vnode){var data=vnode.data;var parentNode=vnode;var childNode=vnode;while(isDef(childNode.componentInstance)){childNode=childNode.componentInstance._vnode;if(childNode&&childNode.data){data=mergeClassData(childNode.data,data);}}while(isDef(parentNode=parentNode.parent)){if(parentNode&&parentNode.data){data=mergeClassData(data,parentNode.data);}}return renderClass(data.staticClass,data.class);}function mergeClassData(child,parent){return{staticClass:concat(child.staticClass,parent.staticClass),class:isDef(child.class)?[child.class,parent.class]:parent.class};}function renderClass(staticClass,dynamicClass){if(isDef(staticClass)||isDef(dynamicClass)){return concat(staticClass,stringifyClass(dynamicClass));}/* istanbul ignore next */return'';}function concat(a,b){return a?b?a+' '+b:a:b||'';}function stringifyClass(value){if(Array.isArray(value)){return stringifyArray(value);}if(isObject(value)){return stringifyObject(value);}if(typeof value==='string'){return value;}/* istanbul ignore next */return'';}function stringifyArray(value){var res='';var stringified;for(var i=0,l=value.length;i<l;i++){if(isDef(stringified=stringifyClass(value[i]))&&stringified!==''){if(res){res+=' ';}res+=stringified;}}return res;}function stringifyObject(value){var res='';for(var key in value){if(value[key]){if(res){res+=' ';}res+=key;}}return res;}/*  */var namespaceMap={svg:'http://www.w3.org/2000/svg',math:'http://www.w3.org/1998/Math/MathML'};var isHTMLTag=makeMap('html,body,base,head,link,meta,style,title,'+'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,'+'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,'+'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,'+'s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,'+'embed,object,param,source,canvas,script,noscript,del,ins,'+'caption,col,colgroup,table,thead,tbody,td,th,tr,'+'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,'+'output,progress,select,textarea,'+'details,dialog,menu,menuitem,summary,'+'content,element,shadow,template,blockquote,iframe,tfoot');// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG=makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,'+'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,'+'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',true);var isPreTag=function isPreTag(tag){return tag==='pre';};var isReservedTag=function isReservedTag(tag){return isHTMLTag(tag)||isSVG(tag);};function getTagNamespace(tag){if(isSVG(tag)){return'svg';}// basic support for MathML
// note it doesn't support other MathML elements being component roots
if(tag==='math'){return'math';}}var unknownElementCache=Object.create(null);function isUnknownElement(tag){/* istanbul ignore if */if(!inBrowser){return true;}if(isReservedTag(tag)){return false;}tag=tag.toLowerCase();/* istanbul ignore if */if(unknownElementCache[tag]!=null){return unknownElementCache[tag];}var el=document.createElement(tag);if(tag.indexOf('-')>-1){// http://stackoverflow.com/a/28210364/1070244
return unknownElementCache[tag]=el.constructor===window.HTMLUnknownElement||el.constructor===window.HTMLElement;}else{return unknownElementCache[tag]=/HTMLUnknownElement/.test(el.toString());}}var isTextInputType=makeMap('text,number,password,search,email,tel,url');/*  *//**
 * Query an element selector if it's not an element already.
 */function query(el){if(typeof el==='string'){var selected=document.querySelector(el);if(!selected){process.env.NODE_ENV!=='production'&&warn('Cannot find element: '+el);return document.createElement('div');}return selected;}else{return el;}}/*  */function createElement$1(tagName,vnode){var elm=document.createElement(tagName);if(tagName!=='select'){return elm;}// false or null will remove the attribute but undefined will not
if(vnode.data&&vnode.data.attrs&&vnode.data.attrs.multiple!==undefined){elm.setAttribute('multiple','multiple');}return elm;}function createElementNS(namespace,tagName){return document.createElementNS(namespaceMap[namespace],tagName);}function createTextNode(text){return document.createTextNode(text);}function createComment(text){return document.createComment(text);}function insertBefore(parentNode,newNode,referenceNode){parentNode.insertBefore(newNode,referenceNode);}function removeChild(node,child){node.removeChild(child);}function appendChild(node,child){node.appendChild(child);}function parentNode(node){return node.parentNode;}function nextSibling(node){return node.nextSibling;}function tagName(node){return node.tagName;}function setTextContent(node,text){node.textContent=text;}function setAttribute(node,key,val){node.setAttribute(key,val);}var nodeOps=Object.freeze({createElement:createElement$1,createElementNS:createElementNS,createTextNode:createTextNode,createComment:createComment,insertBefore:insertBefore,removeChild:removeChild,appendChild:appendChild,parentNode:parentNode,nextSibling:nextSibling,tagName:tagName,setTextContent:setTextContent,setAttribute:setAttribute});/*  */var ref={create:function create(_,vnode){registerRef(vnode);},update:function update(oldVnode,vnode){if(oldVnode.data.ref!==vnode.data.ref){registerRef(oldVnode,true);registerRef(vnode);}},destroy:function destroy(vnode){registerRef(vnode,true);}};function registerRef(vnode,isRemoval){var key=vnode.data.ref;if(!key){return;}var vm=vnode.context;var ref=vnode.componentInstance||vnode.elm;var refs=vm.$refs;if(isRemoval){if(Array.isArray(refs[key])){remove(refs[key],ref);}else if(refs[key]===ref){refs[key]=undefined;}}else{if(vnode.data.refInFor){if(!Array.isArray(refs[key])){refs[key]=[ref];}else if(refs[key].indexOf(ref)<0){// $flow-disable-line
refs[key].push(ref);}}else{refs[key]=ref;}}}/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */var emptyNode=new VNode('',{},[]);var hooks=['create','activate','update','remove','destroy'];function sameVnode(a,b){return a.key===b.key&&(a.tag===b.tag&&a.isComment===b.isComment&&isDef(a.data)===isDef(b.data)&&sameInputType(a,b)||isTrue(a.isAsyncPlaceholder)&&a.asyncFactory===b.asyncFactory&&isUndef(b.asyncFactory.error));}function sameInputType(a,b){if(a.tag!=='input'){return true;}var i;var typeA=isDef(i=a.data)&&isDef(i=i.attrs)&&i.type;var typeB=isDef(i=b.data)&&isDef(i=i.attrs)&&i.type;return typeA===typeB||isTextInputType(typeA)&&isTextInputType(typeB);}function createKeyToOldIdx(children,beginIdx,endIdx){var i,key;var map={};for(i=beginIdx;i<=endIdx;++i){key=children[i].key;if(isDef(key)){map[key]=i;}}return map;}function createPatchFunction(backend){var i,j;var cbs={};var modules=backend.modules;var nodeOps=backend.nodeOps;for(i=0;i<hooks.length;++i){cbs[hooks[i]]=[];for(j=0;j<modules.length;++j){if(isDef(modules[j][hooks[i]])){cbs[hooks[i]].push(modules[j][hooks[i]]);}}}function emptyNodeAt(elm){return new VNode(nodeOps.tagName(elm).toLowerCase(),{},[],undefined,elm);}function createRmCb(childElm,listeners){function remove(){if(--remove.listeners===0){removeNode(childElm);}}remove.listeners=listeners;return remove;}function removeNode(el){var parent=nodeOps.parentNode(el);// element may have already been removed due to v-html / v-text
if(isDef(parent)){nodeOps.removeChild(parent,el);}}function isUnknownElement$$1(vnode,inVPre){return!inVPre&&!vnode.ns&&!(config.ignoredElements.length&&config.ignoredElements.some(function(ignore){return isRegExp(ignore)?ignore.test(vnode.tag):ignore===vnode.tag;}))&&config.isUnknownElement(vnode.tag);}var creatingElmInVPre=0;function createElm(vnode,insertedVnodeQueue,parentElm,refElm,nested){vnode.isRootInsert=!nested;// for transition enter check
if(createComponent(vnode,insertedVnodeQueue,parentElm,refElm)){return;}var data=vnode.data;var children=vnode.children;var tag=vnode.tag;if(isDef(tag)){if(process.env.NODE_ENV!=='production'){if(data&&data.pre){creatingElmInVPre++;}if(isUnknownElement$$1(vnode,creatingElmInVPre)){warn('Unknown custom element: <'+tag+'> - did you '+'register the component correctly? For recursive components, '+'make sure to provide the "name" option.',vnode.context);}}vnode.elm=vnode.ns?nodeOps.createElementNS(vnode.ns,tag):nodeOps.createElement(tag,vnode);setScope(vnode);/* istanbul ignore if */{createChildren(vnode,children,insertedVnodeQueue);if(isDef(data)){invokeCreateHooks(vnode,insertedVnodeQueue);}insert(parentElm,vnode.elm,refElm);}if(process.env.NODE_ENV!=='production'&&data&&data.pre){creatingElmInVPre--;}}else if(isTrue(vnode.isComment)){vnode.elm=nodeOps.createComment(vnode.text);insert(parentElm,vnode.elm,refElm);}else{vnode.elm=nodeOps.createTextNode(vnode.text);insert(parentElm,vnode.elm,refElm);}}function createComponent(vnode,insertedVnodeQueue,parentElm,refElm){var i=vnode.data;if(isDef(i)){var isReactivated=isDef(vnode.componentInstance)&&i.keepAlive;if(isDef(i=i.hook)&&isDef(i=i.init)){i(vnode,false/* hydrating */,parentElm,refElm);}// after calling the init hook, if the vnode is a child component
// it should've created a child instance and mounted it. the child
// component also has set the placeholder vnode's elm.
// in that case we can just return the element and be done.
if(isDef(vnode.componentInstance)){initComponent(vnode,insertedVnodeQueue);if(isTrue(isReactivated)){reactivateComponent(vnode,insertedVnodeQueue,parentElm,refElm);}return true;}}}function initComponent(vnode,insertedVnodeQueue){if(isDef(vnode.data.pendingInsert)){insertedVnodeQueue.push.apply(insertedVnodeQueue,vnode.data.pendingInsert);vnode.data.pendingInsert=null;}vnode.elm=vnode.componentInstance.$el;if(isPatchable(vnode)){invokeCreateHooks(vnode,insertedVnodeQueue);setScope(vnode);}else{// empty component root.
// skip all element-related modules except for ref (#3455)
registerRef(vnode);// make sure to invoke the insert hook
insertedVnodeQueue.push(vnode);}}function reactivateComponent(vnode,insertedVnodeQueue,parentElm,refElm){var i;// hack for #4339: a reactivated component with inner transition
// does not trigger because the inner node's created hooks are not called
// again. It's not ideal to involve module-specific logic in here but
// there doesn't seem to be a better way to do it.
var innerNode=vnode;while(innerNode.componentInstance){innerNode=innerNode.componentInstance._vnode;if(isDef(i=innerNode.data)&&isDef(i=i.transition)){for(i=0;i<cbs.activate.length;++i){cbs.activate[i](emptyNode,innerNode);}insertedVnodeQueue.push(innerNode);break;}}// unlike a newly created component,
// a reactivated keep-alive component doesn't insert itself
insert(parentElm,vnode.elm,refElm);}function insert(parent,elm,ref$$1){if(isDef(parent)){if(isDef(ref$$1)){if(ref$$1.parentNode===parent){nodeOps.insertBefore(parent,elm,ref$$1);}}else{nodeOps.appendChild(parent,elm);}}}function createChildren(vnode,children,insertedVnodeQueue){if(Array.isArray(children)){if(process.env.NODE_ENV!=='production'){checkDuplicateKeys(children);}for(var i=0;i<children.length;++i){createElm(children[i],insertedVnodeQueue,vnode.elm,null,true);}}else if(isPrimitive(vnode.text)){nodeOps.appendChild(vnode.elm,nodeOps.createTextNode(String(vnode.text)));}}function isPatchable(vnode){while(vnode.componentInstance){vnode=vnode.componentInstance._vnode;}return isDef(vnode.tag);}function invokeCreateHooks(vnode,insertedVnodeQueue){for(var i$1=0;i$1<cbs.create.length;++i$1){cbs.create[i$1](emptyNode,vnode);}i=vnode.data.hook;// Reuse variable
if(isDef(i)){if(isDef(i.create)){i.create(emptyNode,vnode);}if(isDef(i.insert)){insertedVnodeQueue.push(vnode);}}}// set scope id attribute for scoped CSS.
// this is implemented as a special case to avoid the overhead
// of going through the normal attribute patching process.
function setScope(vnode){var i;if(isDef(i=vnode.fnScopeId)){nodeOps.setAttribute(vnode.elm,i,'');}else{var ancestor=vnode;while(ancestor){if(isDef(i=ancestor.context)&&isDef(i=i.$options._scopeId)){nodeOps.setAttribute(vnode.elm,i,'');}ancestor=ancestor.parent;}}// for slot content they should also get the scopeId from the host instance.
if(isDef(i=activeInstance)&&i!==vnode.context&&i!==vnode.fnContext&&isDef(i=i.$options._scopeId)){nodeOps.setAttribute(vnode.elm,i,'');}}function addVnodes(parentElm,refElm,vnodes,startIdx,endIdx,insertedVnodeQueue){for(;startIdx<=endIdx;++startIdx){createElm(vnodes[startIdx],insertedVnodeQueue,parentElm,refElm);}}function invokeDestroyHook(vnode){var i,j;var data=vnode.data;if(isDef(data)){if(isDef(i=data.hook)&&isDef(i=i.destroy)){i(vnode);}for(i=0;i<cbs.destroy.length;++i){cbs.destroy[i](vnode);}}if(isDef(i=vnode.children)){for(j=0;j<vnode.children.length;++j){invokeDestroyHook(vnode.children[j]);}}}function removeVnodes(parentElm,vnodes,startIdx,endIdx){for(;startIdx<=endIdx;++startIdx){var ch=vnodes[startIdx];if(isDef(ch)){if(isDef(ch.tag)){removeAndInvokeRemoveHook(ch);invokeDestroyHook(ch);}else{// Text node
removeNode(ch.elm);}}}}function removeAndInvokeRemoveHook(vnode,rm){if(isDef(rm)||isDef(vnode.data)){var i;var listeners=cbs.remove.length+1;if(isDef(rm)){// we have a recursively passed down rm callback
// increase the listeners count
rm.listeners+=listeners;}else{// directly removing
rm=createRmCb(vnode.elm,listeners);}// recursively invoke hooks on child component root node
if(isDef(i=vnode.componentInstance)&&isDef(i=i._vnode)&&isDef(i.data)){removeAndInvokeRemoveHook(i,rm);}for(i=0;i<cbs.remove.length;++i){cbs.remove[i](vnode,rm);}if(isDef(i=vnode.data.hook)&&isDef(i=i.remove)){i(vnode,rm);}else{rm();}}else{removeNode(vnode.elm);}}function updateChildren(parentElm,oldCh,newCh,insertedVnodeQueue,removeOnly){var oldStartIdx=0;var newStartIdx=0;var oldEndIdx=oldCh.length-1;var oldStartVnode=oldCh[0];var oldEndVnode=oldCh[oldEndIdx];var newEndIdx=newCh.length-1;var newStartVnode=newCh[0];var newEndVnode=newCh[newEndIdx];var oldKeyToIdx,idxInOld,vnodeToMove,refElm;// removeOnly is a special flag used only by <transition-group>
// to ensure removed elements stay in correct relative positions
// during leaving transitions
var canMove=!removeOnly;if(process.env.NODE_ENV!=='production'){checkDuplicateKeys(newCh);}while(oldStartIdx<=oldEndIdx&&newStartIdx<=newEndIdx){if(isUndef(oldStartVnode)){oldStartVnode=oldCh[++oldStartIdx];// Vnode has been moved left
}else if(isUndef(oldEndVnode)){oldEndVnode=oldCh[--oldEndIdx];}else if(sameVnode(oldStartVnode,newStartVnode)){patchVnode(oldStartVnode,newStartVnode,insertedVnodeQueue);oldStartVnode=oldCh[++oldStartIdx];newStartVnode=newCh[++newStartIdx];}else if(sameVnode(oldEndVnode,newEndVnode)){patchVnode(oldEndVnode,newEndVnode,insertedVnodeQueue);oldEndVnode=oldCh[--oldEndIdx];newEndVnode=newCh[--newEndIdx];}else if(sameVnode(oldStartVnode,newEndVnode)){// Vnode moved right
patchVnode(oldStartVnode,newEndVnode,insertedVnodeQueue);canMove&&nodeOps.insertBefore(parentElm,oldStartVnode.elm,nodeOps.nextSibling(oldEndVnode.elm));oldStartVnode=oldCh[++oldStartIdx];newEndVnode=newCh[--newEndIdx];}else if(sameVnode(oldEndVnode,newStartVnode)){// Vnode moved left
patchVnode(oldEndVnode,newStartVnode,insertedVnodeQueue);canMove&&nodeOps.insertBefore(parentElm,oldEndVnode.elm,oldStartVnode.elm);oldEndVnode=oldCh[--oldEndIdx];newStartVnode=newCh[++newStartIdx];}else{if(isUndef(oldKeyToIdx)){oldKeyToIdx=createKeyToOldIdx(oldCh,oldStartIdx,oldEndIdx);}idxInOld=isDef(newStartVnode.key)?oldKeyToIdx[newStartVnode.key]:findIdxInOld(newStartVnode,oldCh,oldStartIdx,oldEndIdx);if(isUndef(idxInOld)){// New element
createElm(newStartVnode,insertedVnodeQueue,parentElm,oldStartVnode.elm);}else{vnodeToMove=oldCh[idxInOld];if(sameVnode(vnodeToMove,newStartVnode)){patchVnode(vnodeToMove,newStartVnode,insertedVnodeQueue);oldCh[idxInOld]=undefined;canMove&&nodeOps.insertBefore(parentElm,vnodeToMove.elm,oldStartVnode.elm);}else{// same key but different element. treat as new element
createElm(newStartVnode,insertedVnodeQueue,parentElm,oldStartVnode.elm);}}newStartVnode=newCh[++newStartIdx];}}if(oldStartIdx>oldEndIdx){refElm=isUndef(newCh[newEndIdx+1])?null:newCh[newEndIdx+1].elm;addVnodes(parentElm,refElm,newCh,newStartIdx,newEndIdx,insertedVnodeQueue);}else if(newStartIdx>newEndIdx){removeVnodes(parentElm,oldCh,oldStartIdx,oldEndIdx);}}function checkDuplicateKeys(children){var seenKeys={};for(var i=0;i<children.length;i++){var vnode=children[i];var key=vnode.key;if(isDef(key)){if(seenKeys[key]){warn("Duplicate keys detected: '"+key+"'. This may cause an update error.",vnode.context);}else{seenKeys[key]=true;}}}}function findIdxInOld(node,oldCh,start,end){for(var i=start;i<end;i++){var c=oldCh[i];if(isDef(c)&&sameVnode(node,c)){return i;}}}function patchVnode(oldVnode,vnode,insertedVnodeQueue,removeOnly){if(oldVnode===vnode){return;}var elm=vnode.elm=oldVnode.elm;if(isTrue(oldVnode.isAsyncPlaceholder)){if(isDef(vnode.asyncFactory.resolved)){hydrate(oldVnode.elm,vnode,insertedVnodeQueue);}else{vnode.isAsyncPlaceholder=true;}return;}// reuse element for static trees.
// note we only do this if the vnode is cloned -
// if the new node is not cloned it means the render functions have been
// reset by the hot-reload-api and we need to do a proper re-render.
if(isTrue(vnode.isStatic)&&isTrue(oldVnode.isStatic)&&vnode.key===oldVnode.key&&(isTrue(vnode.isCloned)||isTrue(vnode.isOnce))){vnode.componentInstance=oldVnode.componentInstance;return;}var i;var data=vnode.data;if(isDef(data)&&isDef(i=data.hook)&&isDef(i=i.prepatch)){i(oldVnode,vnode);}var oldCh=oldVnode.children;var ch=vnode.children;if(isDef(data)&&isPatchable(vnode)){for(i=0;i<cbs.update.length;++i){cbs.update[i](oldVnode,vnode);}if(isDef(i=data.hook)&&isDef(i=i.update)){i(oldVnode,vnode);}}if(isUndef(vnode.text)){if(isDef(oldCh)&&isDef(ch)){if(oldCh!==ch){updateChildren(elm,oldCh,ch,insertedVnodeQueue,removeOnly);}}else if(isDef(ch)){if(isDef(oldVnode.text)){nodeOps.setTextContent(elm,'');}addVnodes(elm,null,ch,0,ch.length-1,insertedVnodeQueue);}else if(isDef(oldCh)){removeVnodes(elm,oldCh,0,oldCh.length-1);}else if(isDef(oldVnode.text)){nodeOps.setTextContent(elm,'');}}else if(oldVnode.text!==vnode.text){nodeOps.setTextContent(elm,vnode.text);}if(isDef(data)){if(isDef(i=data.hook)&&isDef(i=i.postpatch)){i(oldVnode,vnode);}}}function invokeInsertHook(vnode,queue,initial){// delay insert hooks for component root nodes, invoke them after the
// element is really inserted
if(isTrue(initial)&&isDef(vnode.parent)){vnode.parent.data.pendingInsert=queue;}else{for(var i=0;i<queue.length;++i){queue[i].data.hook.insert(queue[i]);}}}var hydrationBailed=false;// list of modules that can skip create hook during hydration because they
// are already rendered on the client or has no need for initialization
// Note: style is excluded because it relies on initial clone for future
// deep updates (#7063).
var isRenderedModule=makeMap('attrs,class,staticClass,staticStyle,key');// Note: this is a browser-only function so we can assume elms are DOM nodes.
function hydrate(elm,vnode,insertedVnodeQueue,inVPre){var i;var tag=vnode.tag;var data=vnode.data;var children=vnode.children;inVPre=inVPre||data&&data.pre;vnode.elm=elm;if(isTrue(vnode.isComment)&&isDef(vnode.asyncFactory)){vnode.isAsyncPlaceholder=true;return true;}// assert node match
if(process.env.NODE_ENV!=='production'){if(!assertNodeMatch(elm,vnode,inVPre)){return false;}}if(isDef(data)){if(isDef(i=data.hook)&&isDef(i=i.init)){i(vnode,true/* hydrating */);}if(isDef(i=vnode.componentInstance)){// child component. it should have hydrated its own tree.
initComponent(vnode,insertedVnodeQueue);return true;}}if(isDef(tag)){if(isDef(children)){// empty element, allow client to pick up and populate children
if(!elm.hasChildNodes()){createChildren(vnode,children,insertedVnodeQueue);}else{// v-html and domProps: innerHTML
if(isDef(i=data)&&isDef(i=i.domProps)&&isDef(i=i.innerHTML)){if(i!==elm.innerHTML){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&typeof console!=='undefined'&&!hydrationBailed){hydrationBailed=true;console.warn('Parent: ',elm);console.warn('server innerHTML: ',i);console.warn('client innerHTML: ',elm.innerHTML);}return false;}}else{// iterate and compare children lists
var childrenMatch=true;var childNode=elm.firstChild;for(var i$1=0;i$1<children.length;i$1++){if(!childNode||!hydrate(childNode,children[i$1],insertedVnodeQueue,inVPre)){childrenMatch=false;break;}childNode=childNode.nextSibling;}// if childNode is not null, it means the actual childNodes list is
// longer than the virtual children list.
if(!childrenMatch||childNode){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&typeof console!=='undefined'&&!hydrationBailed){hydrationBailed=true;console.warn('Parent: ',elm);console.warn('Mismatching childNodes vs. VNodes: ',elm.childNodes,children);}return false;}}}}if(isDef(data)){var fullInvoke=false;for(var key in data){if(!isRenderedModule(key)){fullInvoke=true;invokeCreateHooks(vnode,insertedVnodeQueue);break;}}if(!fullInvoke&&data['class']){// ensure collecting deps for deep class bindings for future updates
traverse(data['class']);}}}else if(elm.data!==vnode.text){elm.data=vnode.text;}return true;}function assertNodeMatch(node,vnode,inVPre){if(isDef(vnode.tag)){return vnode.tag.indexOf('vue-component')===0||!isUnknownElement$$1(vnode,inVPre)&&vnode.tag.toLowerCase()===(node.tagName&&node.tagName.toLowerCase());}else{return node.nodeType===(vnode.isComment?8:3);}}return function patch(oldVnode,vnode,hydrating,removeOnly,parentElm,refElm){if(isUndef(vnode)){if(isDef(oldVnode)){invokeDestroyHook(oldVnode);}return;}var isInitialPatch=false;var insertedVnodeQueue=[];if(isUndef(oldVnode)){// empty mount (likely as component), create new root element
isInitialPatch=true;createElm(vnode,insertedVnodeQueue,parentElm,refElm);}else{var isRealElement=isDef(oldVnode.nodeType);if(!isRealElement&&sameVnode(oldVnode,vnode)){// patch existing root node
patchVnode(oldVnode,vnode,insertedVnodeQueue,removeOnly);}else{if(isRealElement){// mounting to a real element
// check if this is server-rendered content and if we can perform
// a successful hydration.
if(oldVnode.nodeType===1&&oldVnode.hasAttribute(SSR_ATTR)){oldVnode.removeAttribute(SSR_ATTR);hydrating=true;}if(isTrue(hydrating)){if(hydrate(oldVnode,vnode,insertedVnodeQueue)){invokeInsertHook(vnode,insertedVnodeQueue,true);return oldVnode;}else if(process.env.NODE_ENV!=='production'){warn('The client-side rendered virtual DOM tree is not matching '+'server-rendered content. This is likely caused by incorrect '+'HTML markup, for example nesting block-level elements inside '+'<p>, or missing <tbody>. Bailing hydration and performing '+'full client-side render.');}}// either not server-rendered, or hydration failed.
// create an empty node and replace it
oldVnode=emptyNodeAt(oldVnode);}// replacing existing element
var oldElm=oldVnode.elm;var parentElm$1=nodeOps.parentNode(oldElm);// create new node
createElm(vnode,insertedVnodeQueue,// extremely rare edge case: do not insert if old element is in a
// leaving transition. Only happens when combining transition +
// keep-alive + HOCs. (#4590)
oldElm._leaveCb?null:parentElm$1,nodeOps.nextSibling(oldElm));// update parent placeholder node element, recursively
if(isDef(vnode.parent)){var ancestor=vnode.parent;var patchable=isPatchable(vnode);while(ancestor){for(var i=0;i<cbs.destroy.length;++i){cbs.destroy[i](ancestor);}ancestor.elm=vnode.elm;if(patchable){for(var i$1=0;i$1<cbs.create.length;++i$1){cbs.create[i$1](emptyNode,ancestor);}// #6513
// invoke insert hooks that may have been merged by create hooks.
// e.g. for directives that uses the "inserted" hook.
var insert=ancestor.data.hook.insert;if(insert.merged){// start at index 1 to avoid re-invoking component mounted hook
for(var i$2=1;i$2<insert.fns.length;i$2++){insert.fns[i$2]();}}}else{registerRef(ancestor);}ancestor=ancestor.parent;}}// destroy old node
if(isDef(parentElm$1)){removeVnodes(parentElm$1,[oldVnode],0,0);}else if(isDef(oldVnode.tag)){invokeDestroyHook(oldVnode);}}}invokeInsertHook(vnode,insertedVnodeQueue,isInitialPatch);return vnode.elm;};}/*  */var directives={create:updateDirectives,update:updateDirectives,destroy:function unbindDirectives(vnode){updateDirectives(vnode,emptyNode);}};function updateDirectives(oldVnode,vnode){if(oldVnode.data.directives||vnode.data.directives){_update(oldVnode,vnode);}}function _update(oldVnode,vnode){var isCreate=oldVnode===emptyNode;var isDestroy=vnode===emptyNode;var oldDirs=normalizeDirectives$1(oldVnode.data.directives,oldVnode.context);var newDirs=normalizeDirectives$1(vnode.data.directives,vnode.context);var dirsWithInsert=[];var dirsWithPostpatch=[];var key,oldDir,dir;for(key in newDirs){oldDir=oldDirs[key];dir=newDirs[key];if(!oldDir){// new directive, bind
callHook$1(dir,'bind',vnode,oldVnode);if(dir.def&&dir.def.inserted){dirsWithInsert.push(dir);}}else{// existing directive, update
dir.oldValue=oldDir.value;callHook$1(dir,'update',vnode,oldVnode);if(dir.def&&dir.def.componentUpdated){dirsWithPostpatch.push(dir);}}}if(dirsWithInsert.length){var callInsert=function callInsert(){for(var i=0;i<dirsWithInsert.length;i++){callHook$1(dirsWithInsert[i],'inserted',vnode,oldVnode);}};if(isCreate){mergeVNodeHook(vnode,'insert',callInsert);}else{callInsert();}}if(dirsWithPostpatch.length){mergeVNodeHook(vnode,'postpatch',function(){for(var i=0;i<dirsWithPostpatch.length;i++){callHook$1(dirsWithPostpatch[i],'componentUpdated',vnode,oldVnode);}});}if(!isCreate){for(key in oldDirs){if(!newDirs[key]){// no longer present, unbind
callHook$1(oldDirs[key],'unbind',oldVnode,oldVnode,isDestroy);}}}}var emptyModifiers=Object.create(null);function normalizeDirectives$1(dirs,vm){var res=Object.create(null);if(!dirs){// $flow-disable-line
return res;}var i,dir;for(i=0;i<dirs.length;i++){dir=dirs[i];if(!dir.modifiers){// $flow-disable-line
dir.modifiers=emptyModifiers;}res[getRawDirName(dir)]=dir;dir.def=resolveAsset(vm.$options,'directives',dir.name,true);}// $flow-disable-line
return res;}function getRawDirName(dir){return dir.rawName||dir.name+"."+Object.keys(dir.modifiers||{}).join('.');}function callHook$1(dir,hook,vnode,oldVnode,isDestroy){var fn=dir.def&&dir.def[hook];if(fn){try{fn(vnode.elm,dir,vnode,oldVnode,isDestroy);}catch(e){handleError(e,vnode.context,"directive "+dir.name+" "+hook+" hook");}}}var baseModules=[ref,directives];/*  */function updateAttrs(oldVnode,vnode){var opts=vnode.componentOptions;if(isDef(opts)&&opts.Ctor.options.inheritAttrs===false){return;}if(isUndef(oldVnode.data.attrs)&&isUndef(vnode.data.attrs)){return;}var key,cur,old;var elm=vnode.elm;var oldAttrs=oldVnode.data.attrs||{};var attrs=vnode.data.attrs||{};// clone observed objects, as the user probably wants to mutate it
if(isDef(attrs.__ob__)){attrs=vnode.data.attrs=extend({},attrs);}for(key in attrs){cur=attrs[key];old=oldAttrs[key];if(old!==cur){setAttr(elm,key,cur);}}// #4391: in IE9, setting type can reset value for input[type=radio]
// #6666: IE/Edge forces progress value down to 1 before setting a max
/* istanbul ignore if */if((isIE||isEdge)&&attrs.value!==oldAttrs.value){setAttr(elm,'value',attrs.value);}for(key in oldAttrs){if(isUndef(attrs[key])){if(isXlink(key)){elm.removeAttributeNS(xlinkNS,getXlinkProp(key));}else if(!isEnumeratedAttr(key)){elm.removeAttribute(key);}}}}function setAttr(el,key,value){if(isBooleanAttr(key)){// set attribute for blank value
// e.g. <option disabled>Select one</option>
if(isFalsyAttrValue(value)){el.removeAttribute(key);}else{// technically allowfullscreen is a boolean attribute for <iframe>,
// but Flash expects a value of "true" when used on <embed> tag
value=key==='allowfullscreen'&&el.tagName==='EMBED'?'true':key;el.setAttribute(key,value);}}else if(isEnumeratedAttr(key)){el.setAttribute(key,isFalsyAttrValue(value)||value==='false'?'false':'true');}else if(isXlink(key)){if(isFalsyAttrValue(value)){el.removeAttributeNS(xlinkNS,getXlinkProp(key));}else{el.setAttributeNS(xlinkNS,key,value);}}else{if(isFalsyAttrValue(value)){el.removeAttribute(key);}else{// #7138: IE10 & 11 fires input event when setting placeholder on
// <textarea>... block the first input event and remove the blocker
// immediately.
/* istanbul ignore if */if(isIE&&!isIE9&&el.tagName==='TEXTAREA'&&key==='placeholder'&&!el.__ieph){var blocker=function blocker(e){e.stopImmediatePropagation();el.removeEventListener('input',blocker);};el.addEventListener('input',blocker);// $flow-disable-line
el.__ieph=true;/* IE placeholder patched */}el.setAttribute(key,value);}}}var attrs={create:updateAttrs,update:updateAttrs};/*  */function updateClass(oldVnode,vnode){var el=vnode.elm;var data=vnode.data;var oldData=oldVnode.data;if(isUndef(data.staticClass)&&isUndef(data.class)&&(isUndef(oldData)||isUndef(oldData.staticClass)&&isUndef(oldData.class))){return;}var cls=genClassForVnode(vnode);// handle transition classes
var transitionClass=el._transitionClasses;if(isDef(transitionClass)){cls=concat(cls,stringifyClass(transitionClass));}// set the class
if(cls!==el._prevClass){el.setAttribute('class',cls);el._prevClass=cls;}}var klass={create:updateClass,update:updateClass};/*  */var validDivisionCharRE=/[\w).+\-_$\]]/;function parseFilters(exp){var inSingle=false;var inDouble=false;var inTemplateString=false;var inRegex=false;var curly=0;var square=0;var paren=0;var lastFilterIndex=0;var c,prev,i,expression,filters;for(i=0;i<exp.length;i++){prev=c;c=exp.charCodeAt(i);if(inSingle){if(c===0x27&&prev!==0x5C){inSingle=false;}}else if(inDouble){if(c===0x22&&prev!==0x5C){inDouble=false;}}else if(inTemplateString){if(c===0x60&&prev!==0x5C){inTemplateString=false;}}else if(inRegex){if(c===0x2f&&prev!==0x5C){inRegex=false;}}else if(c===0x7C&&// pipe
exp.charCodeAt(i+1)!==0x7C&&exp.charCodeAt(i-1)!==0x7C&&!curly&&!square&&!paren){if(expression===undefined){// first filter, end of expression
lastFilterIndex=i+1;expression=exp.slice(0,i).trim();}else{pushFilter();}}else{switch(c){case 0x22:inDouble=true;break;// "
case 0x27:inSingle=true;break;// '
case 0x60:inTemplateString=true;break;// `
case 0x28:paren++;break;// (
case 0x29:paren--;break;// )
case 0x5B:square++;break;// [
case 0x5D:square--;break;// ]
case 0x7B:curly++;break;// {
case 0x7D:curly--;break;// }
}if(c===0x2f){// /
var j=i-1;var p=void 0;// find first non-whitespace prev char
for(;j>=0;j--){p=exp.charAt(j);if(p!==' '){break;}}if(!p||!validDivisionCharRE.test(p)){inRegex=true;}}}}if(expression===undefined){expression=exp.slice(0,i).trim();}else if(lastFilterIndex!==0){pushFilter();}function pushFilter(){(filters||(filters=[])).push(exp.slice(lastFilterIndex,i).trim());lastFilterIndex=i+1;}if(filters){for(i=0;i<filters.length;i++){expression=wrapFilter(expression,filters[i]);}}return expression;}function wrapFilter(exp,filter){var i=filter.indexOf('(');if(i<0){// _f: resolveFilter
return"_f(\""+filter+"\")("+exp+")";}else{var name=filter.slice(0,i);var args=filter.slice(i+1);return"_f(\""+name+"\")("+exp+","+args;}}/*  */function baseWarn(msg){console.error("[Vue compiler]: "+msg);}function pluckModuleFunction(modules,key){return modules?modules.map(function(m){return m[key];}).filter(function(_){return _;}):[];}function addProp(el,name,value){(el.props||(el.props=[])).push({name:name,value:value});el.plain=false;}function addAttr(el,name,value){(el.attrs||(el.attrs=[])).push({name:name,value:value});el.plain=false;}// add a raw attr (use this in preTransforms)
function addRawAttr(el,name,value){el.attrsMap[name]=value;el.attrsList.push({name:name,value:value});}function addDirective(el,name,rawName,value,arg,modifiers){(el.directives||(el.directives=[])).push({name:name,rawName:rawName,value:value,arg:arg,modifiers:modifiers});el.plain=false;}function addHandler(el,name,value,modifiers,important,warn){modifiers=modifiers||emptyObject;// warn prevent and passive modifier
/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&warn&&modifiers.prevent&&modifiers.passive){warn('passive and prevent can\'t be used together. '+'Passive handler can\'t prevent default event.');}// check capture modifier
if(modifiers.capture){delete modifiers.capture;name='!'+name;// mark the event as captured
}if(modifiers.once){delete modifiers.once;name='~'+name;// mark the event as once
}/* istanbul ignore if */if(modifiers.passive){delete modifiers.passive;name='&'+name;// mark the event as passive
}// normalize click.right and click.middle since they don't actually fire
// this is technically browser-specific, but at least for now browsers are
// the only target envs that have right/middle clicks.
if(name==='click'){if(modifiers.right){name='contextmenu';delete modifiers.right;}else if(modifiers.middle){name='mouseup';}}var events;if(modifiers.native){delete modifiers.native;events=el.nativeEvents||(el.nativeEvents={});}else{events=el.events||(el.events={});}var newHandler={value:value};if(modifiers!==emptyObject){newHandler.modifiers=modifiers;}var handlers=events[name];/* istanbul ignore if */if(Array.isArray(handlers)){important?handlers.unshift(newHandler):handlers.push(newHandler);}else if(handlers){events[name]=important?[newHandler,handlers]:[handlers,newHandler];}else{events[name]=newHandler;}el.plain=false;}function getBindingAttr(el,name,getStatic){var dynamicValue=getAndRemoveAttr(el,':'+name)||getAndRemoveAttr(el,'v-bind:'+name);if(dynamicValue!=null){return parseFilters(dynamicValue);}else if(getStatic!==false){var staticValue=getAndRemoveAttr(el,name);if(staticValue!=null){return JSON.stringify(staticValue);}}}// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr(el,name,removeFromMap){var val;if((val=el.attrsMap[name])!=null){var list=el.attrsList;for(var i=0,l=list.length;i<l;i++){if(list[i].name===name){list.splice(i,1);break;}}}if(removeFromMap){delete el.attrsMap[name];}return val;}/*  *//**
 * Cross-platform code generation for component v-model
 */function genComponentModel(el,value,modifiers){var ref=modifiers||{};var number=ref.number;var trim=ref.trim;var baseValueExpression='$$v';var valueExpression=baseValueExpression;if(trim){valueExpression="(typeof "+baseValueExpression+" === 'string'"+"? "+baseValueExpression+".trim()"+": "+baseValueExpression+")";}if(number){valueExpression="_n("+valueExpression+")";}var assignment=genAssignmentCode(value,valueExpression);el.model={value:"("+value+")",expression:"\""+value+"\"",callback:"function ("+baseValueExpression+") {"+assignment+"}"};}/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */function genAssignmentCode(value,assignment){var res=parseModel(value);if(res.key===null){return value+"="+assignment;}else{return"$set("+res.exp+", "+res.key+", "+assignment+")";}}/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */var len;var str;var chr;var index$1;var expressionPos;var expressionEndPos;function parseModel(val){len=val.length;if(val.indexOf('[')<0||val.lastIndexOf(']')<len-1){index$1=val.lastIndexOf('.');if(index$1>-1){return{exp:val.slice(0,index$1),key:'"'+val.slice(index$1+1)+'"'};}else{return{exp:val,key:null};}}str=val;index$1=expressionPos=expressionEndPos=0;while(!eof()){chr=next();/* istanbul ignore if */if(isStringStart(chr)){parseString(chr);}else if(chr===0x5B){parseBracket(chr);}}return{exp:val.slice(0,expressionPos),key:val.slice(expressionPos+1,expressionEndPos)};}function next(){return str.charCodeAt(++index$1);}function eof(){return index$1>=len;}function isStringStart(chr){return chr===0x22||chr===0x27;}function parseBracket(chr){var inBracket=1;expressionPos=index$1;while(!eof()){chr=next();if(isStringStart(chr)){parseString(chr);continue;}if(chr===0x5B){inBracket++;}if(chr===0x5D){inBracket--;}if(inBracket===0){expressionEndPos=index$1;break;}}}function parseString(chr){var stringQuote=chr;while(!eof()){chr=next();if(chr===stringQuote){break;}}}/*  */var warn$1;// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN='__r';var CHECKBOX_RADIO_TOKEN='__c';function model(el,dir,_warn){warn$1=_warn;var value=dir.value;var modifiers=dir.modifiers;var tag=el.tag;var type=el.attrsMap.type;if(process.env.NODE_ENV!=='production'){// inputs with type="file" are read only and setting the input's
// value will throw an error.
if(tag==='input'&&type==='file'){warn$1("<"+el.tag+" v-model=\""+value+"\" type=\"file\">:\n"+"File inputs are read only. Use a v-on:change listener instead.");}}if(el.component){genComponentModel(el,value,modifiers);// component v-model doesn't need extra runtime
return false;}else if(tag==='select'){genSelect(el,value,modifiers);}else if(tag==='input'&&type==='checkbox'){genCheckboxModel(el,value,modifiers);}else if(tag==='input'&&type==='radio'){genRadioModel(el,value,modifiers);}else if(tag==='input'||tag==='textarea'){genDefaultModel(el,value,modifiers);}else if(!config.isReservedTag(tag)){genComponentModel(el,value,modifiers);// component v-model doesn't need extra runtime
return false;}else if(process.env.NODE_ENV!=='production'){warn$1("<"+el.tag+" v-model=\""+value+"\">: "+"v-model is not supported on this element type. "+'If you are working with contenteditable, it\'s recommended to '+'wrap a library dedicated for that purpose inside a custom component.');}// ensure runtime directive metadata
return true;}function genCheckboxModel(el,value,modifiers){var number=modifiers&&modifiers.number;var valueBinding=getBindingAttr(el,'value')||'null';var trueValueBinding=getBindingAttr(el,'true-value')||'true';var falseValueBinding=getBindingAttr(el,'false-value')||'false';addProp(el,'checked',"Array.isArray("+value+")"+"?_i("+value+","+valueBinding+")>-1"+(trueValueBinding==='true'?":("+value+")":":_q("+value+","+trueValueBinding+")"));addHandler(el,'change',"var $$a="+value+","+'$$el=$event.target,'+"$$c=$$el.checked?("+trueValueBinding+"):("+falseValueBinding+");"+'if(Array.isArray($$a)){'+"var $$v="+(number?'_n('+valueBinding+')':valueBinding)+","+'$$i=_i($$a,$$v);'+"if($$el.checked){$$i<0&&("+value+"=$$a.concat([$$v]))}"+"else{$$i>-1&&("+value+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}"+"}else{"+genAssignmentCode(value,'$$c')+"}",null,true);}function genRadioModel(el,value,modifiers){var number=modifiers&&modifiers.number;var valueBinding=getBindingAttr(el,'value')||'null';valueBinding=number?"_n("+valueBinding+")":valueBinding;addProp(el,'checked',"_q("+value+","+valueBinding+")");addHandler(el,'change',genAssignmentCode(value,valueBinding),null,true);}function genSelect(el,value,modifiers){var number=modifiers&&modifiers.number;var selectedVal="Array.prototype.filter"+".call($event.target.options,function(o){return o.selected})"+".map(function(o){var val = \"_value\" in o ? o._value : o.value;"+"return "+(number?'_n(val)':'val')+"})";var assignment='$event.target.multiple ? $$selectedVal : $$selectedVal[0]';var code="var $$selectedVal = "+selectedVal+";";code=code+" "+genAssignmentCode(value,assignment);addHandler(el,'change',code,null,true);}function genDefaultModel(el,value,modifiers){var type=el.attrsMap.type;// warn if v-bind:value conflicts with v-model
if(process.env.NODE_ENV!=='production'){var value$1=el.attrsMap['v-bind:value']||el.attrsMap[':value'];if(value$1){var binding=el.attrsMap['v-bind:value']?'v-bind:value':':value';warn$1(binding+"=\""+value$1+"\" conflicts with v-model on the same element "+'because the latter already expands to a value binding internally');}}var ref=modifiers||{};var lazy=ref.lazy;var number=ref.number;var trim=ref.trim;var needCompositionGuard=!lazy&&type!=='range';var event=lazy?'change':type==='range'?RANGE_TOKEN:'input';var valueExpression='$event.target.value';if(trim){valueExpression="$event.target.value.trim()";}if(number){valueExpression="_n("+valueExpression+")";}var code=genAssignmentCode(value,valueExpression);if(needCompositionGuard){code="if($event.target.composing)return;"+code;}addProp(el,'value',"("+value+")");addHandler(el,event,code,null,true);if(trim||number){addHandler(el,'blur','$forceUpdate()');}}/*  */// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on){/* istanbul ignore if */if(isDef(on[RANGE_TOKEN])){// IE input[type=range] only supports `change` event
var event=isIE?'change':'input';on[event]=[].concat(on[RANGE_TOKEN],on[event]||[]);delete on[RANGE_TOKEN];}// This was originally intended to fix #4521 but no longer necessary
// after 2.5. Keeping it for backwards compat with generated code from < 2.4
/* istanbul ignore if */if(isDef(on[CHECKBOX_RADIO_TOKEN])){on.change=[].concat(on[CHECKBOX_RADIO_TOKEN],on.change||[]);delete on[CHECKBOX_RADIO_TOKEN];}}var target$1;function createOnceHandler(handler,event,capture){var _target=target$1;// save current target element in closure
return function onceHandler(){var res=handler.apply(null,arguments);if(res!==null){remove$2(event,onceHandler,capture,_target);}};}function add$1(event,handler,once$$1,capture,passive){handler=withMacroTask(handler);if(once$$1){handler=createOnceHandler(handler,event,capture);}target$1.addEventListener(event,handler,supportsPassive?{capture:capture,passive:passive}:capture);}function remove$2(event,handler,capture,_target){(_target||target$1).removeEventListener(event,handler._withTask||handler,capture);}function updateDOMListeners(oldVnode,vnode){if(isUndef(oldVnode.data.on)&&isUndef(vnode.data.on)){return;}var on=vnode.data.on||{};var oldOn=oldVnode.data.on||{};target$1=vnode.elm;normalizeEvents(on);updateListeners(on,oldOn,add$1,remove$2,vnode.context);target$1=undefined;}var events={create:updateDOMListeners,update:updateDOMListeners};/*  */function updateDOMProps(oldVnode,vnode){if(isUndef(oldVnode.data.domProps)&&isUndef(vnode.data.domProps)){return;}var key,cur;var elm=vnode.elm;var oldProps=oldVnode.data.domProps||{};var props=vnode.data.domProps||{};// clone observed objects, as the user probably wants to mutate it
if(isDef(props.__ob__)){props=vnode.data.domProps=extend({},props);}for(key in oldProps){if(isUndef(props[key])){elm[key]='';}}for(key in props){cur=props[key];// ignore children if the node has textContent or innerHTML,
// as these will throw away existing DOM nodes and cause removal errors
// on subsequent patches (#3360)
if(key==='textContent'||key==='innerHTML'){if(vnode.children){vnode.children.length=0;}if(cur===oldProps[key]){continue;}// #6601 work around Chrome version <= 55 bug where single textNode
// replaced by innerHTML/textContent retains its parentNode property
if(elm.childNodes.length===1){elm.removeChild(elm.childNodes[0]);}}if(key==='value'){// store value as _value as well since
// non-string values will be stringified
elm._value=cur;// avoid resetting cursor position when value is the same
var strCur=isUndef(cur)?'':String(cur);if(shouldUpdateValue(elm,strCur)){elm.value=strCur;}}else{elm[key]=cur;}}}// check platforms/web/util/attrs.js acceptValue
function shouldUpdateValue(elm,checkVal){return!elm.composing&&(elm.tagName==='OPTION'||isNotInFocusAndDirty(elm,checkVal)||isDirtyWithModifiers(elm,checkVal));}function isNotInFocusAndDirty(elm,checkVal){// return true when textbox (.number and .trim) loses focus and its value is
// not equal to the updated value
var notInFocus=true;// #6157
// work around IE bug when accessing document.activeElement in an iframe
try{notInFocus=document.activeElement!==elm;}catch(e){}return notInFocus&&elm.value!==checkVal;}function isDirtyWithModifiers(elm,newVal){var value=elm.value;var modifiers=elm._vModifiers;// injected by v-model runtime
if(isDef(modifiers)){if(modifiers.lazy){// inputs with lazy should only be updated when not in focus
return false;}if(modifiers.number){return toNumber(value)!==toNumber(newVal);}if(modifiers.trim){return value.trim()!==newVal.trim();}}return value!==newVal;}var domProps={create:updateDOMProps,update:updateDOMProps};/*  */var parseStyleText=cached(function(cssText){var res={};var listDelimiter=/;(?![^(]*\))/g;var propertyDelimiter=/:(.+)/;cssText.split(listDelimiter).forEach(function(item){if(item){var tmp=item.split(propertyDelimiter);tmp.length>1&&(res[tmp[0].trim()]=tmp[1].trim());}});return res;});// merge static and dynamic style data on the same vnode
function normalizeStyleData(data){var style=normalizeStyleBinding(data.style);// static style is pre-processed into an object during compilation
// and is always a fresh object, so it's safe to merge into it
return data.staticStyle?extend(data.staticStyle,style):style;}// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle){if(Array.isArray(bindingStyle)){return toObject(bindingStyle);}if(typeof bindingStyle==='string'){return parseStyleText(bindingStyle);}return bindingStyle;}/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */function getStyle(vnode,checkChild){var res={};var styleData;if(checkChild){var childNode=vnode;while(childNode.componentInstance){childNode=childNode.componentInstance._vnode;if(childNode&&childNode.data&&(styleData=normalizeStyleData(childNode.data))){extend(res,styleData);}}}if(styleData=normalizeStyleData(vnode.data)){extend(res,styleData);}var parentNode=vnode;while(parentNode=parentNode.parent){if(parentNode.data&&(styleData=normalizeStyleData(parentNode.data))){extend(res,styleData);}}return res;}/*  */var cssVarRE=/^--/;var importantRE=/\s*!important$/;var setProp=function setProp(el,name,val){/* istanbul ignore if */if(cssVarRE.test(name)){el.style.setProperty(name,val);}else if(importantRE.test(val)){el.style.setProperty(name,val.replace(importantRE,''),'important');}else{var normalizedName=normalize(name);if(Array.isArray(val)){// Support values array created by autoprefixer, e.g.
// {display: ["-webkit-box", "-ms-flexbox", "flex"]}
// Set them one by one, and the browser will only set those it can recognize
for(var i=0,len=val.length;i<len;i++){el.style[normalizedName]=val[i];}}else{el.style[normalizedName]=val;}}};var vendorNames=['Webkit','Moz','ms'];var emptyStyle;var normalize=cached(function(prop){emptyStyle=emptyStyle||document.createElement('div').style;prop=camelize(prop);if(prop!=='filter'&&prop in emptyStyle){return prop;}var capName=prop.charAt(0).toUpperCase()+prop.slice(1);for(var i=0;i<vendorNames.length;i++){var name=vendorNames[i]+capName;if(name in emptyStyle){return name;}}});function updateStyle(oldVnode,vnode){var data=vnode.data;var oldData=oldVnode.data;if(isUndef(data.staticStyle)&&isUndef(data.style)&&isUndef(oldData.staticStyle)&&isUndef(oldData.style)){return;}var cur,name;var el=vnode.elm;var oldStaticStyle=oldData.staticStyle;var oldStyleBinding=oldData.normalizedStyle||oldData.style||{};// if static style exists, stylebinding already merged into it when doing normalizeStyleData
var oldStyle=oldStaticStyle||oldStyleBinding;var style=normalizeStyleBinding(vnode.data.style)||{};// store normalized style under a different key for next diff
// make sure to clone it if it's reactive, since the user likely wants
// to mutate it.
vnode.data.normalizedStyle=isDef(style.__ob__)?extend({},style):style;var newStyle=getStyle(vnode,true);for(name in oldStyle){if(isUndef(newStyle[name])){setProp(el,name,'');}}for(name in newStyle){cur=newStyle[name];if(cur!==oldStyle[name]){// ie9 setting to null has no effect, must use empty string
setProp(el,name,cur==null?'':cur);}}}var style={create:updateStyle,update:updateStyle};/*  *//**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */function addClass(el,cls){/* istanbul ignore if */if(!cls||!(cls=cls.trim())){return;}/* istanbul ignore else */if(el.classList){if(cls.indexOf(' ')>-1){cls.split(/\s+/).forEach(function(c){return el.classList.add(c);});}else{el.classList.add(cls);}}else{var cur=" "+(el.getAttribute('class')||'')+" ";if(cur.indexOf(' '+cls+' ')<0){el.setAttribute('class',(cur+cls).trim());}}}/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */function removeClass(el,cls){/* istanbul ignore if */if(!cls||!(cls=cls.trim())){return;}/* istanbul ignore else */if(el.classList){if(cls.indexOf(' ')>-1){cls.split(/\s+/).forEach(function(c){return el.classList.remove(c);});}else{el.classList.remove(cls);}if(!el.classList.length){el.removeAttribute('class');}}else{var cur=" "+(el.getAttribute('class')||'')+" ";var tar=' '+cls+' ';while(cur.indexOf(tar)>=0){cur=cur.replace(tar,' ');}cur=cur.trim();if(cur){el.setAttribute('class',cur);}else{el.removeAttribute('class');}}}/*  */function resolveTransition(def){if(!def){return;}/* istanbul ignore else */if((typeof def==='undefined'?'undefined':_typeof(def))==='object'){var res={};if(def.css!==false){extend(res,autoCssTransition(def.name||'v'));}extend(res,def);return res;}else if(typeof def==='string'){return autoCssTransition(def);}}var autoCssTransition=cached(function(name){return{enterClass:name+"-enter",enterToClass:name+"-enter-to",enterActiveClass:name+"-enter-active",leaveClass:name+"-leave",leaveToClass:name+"-leave-to",leaveActiveClass:name+"-leave-active"};});var hasTransition=inBrowser&&!isIE9;var TRANSITION='transition';var ANIMATION='animation';// Transition property/event sniffing
var transitionProp='transition';var transitionEndEvent='transitionend';var animationProp='animation';var animationEndEvent='animationend';if(hasTransition){/* istanbul ignore if */if(window.ontransitionend===undefined&&window.onwebkittransitionend!==undefined){transitionProp='WebkitTransition';transitionEndEvent='webkitTransitionEnd';}if(window.onanimationend===undefined&&window.onwebkitanimationend!==undefined){animationProp='WebkitAnimation';animationEndEvent='webkitAnimationEnd';}}// binding to window is necessary to make hot reload work in IE in strict mode
var raf=inBrowser?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:/* istanbul ignore next */function(fn){return fn();};function nextFrame(fn){raf(function(){raf(fn);});}function addTransitionClass(el,cls){var transitionClasses=el._transitionClasses||(el._transitionClasses=[]);if(transitionClasses.indexOf(cls)<0){transitionClasses.push(cls);addClass(el,cls);}}function removeTransitionClass(el,cls){if(el._transitionClasses){remove(el._transitionClasses,cls);}removeClass(el,cls);}function whenTransitionEnds(el,expectedType,cb){var ref=getTransitionInfo(el,expectedType);var type=ref.type;var timeout=ref.timeout;var propCount=ref.propCount;if(!type){return cb();}var event=type===TRANSITION?transitionEndEvent:animationEndEvent;var ended=0;var end=function end(){el.removeEventListener(event,onEnd);cb();};var onEnd=function onEnd(e){if(e.target===el){if(++ended>=propCount){end();}}};setTimeout(function(){if(ended<propCount){end();}},timeout+1);el.addEventListener(event,onEnd);}var transformRE=/\b(transform|all)(,|$)/;function getTransitionInfo(el,expectedType){var styles=window.getComputedStyle(el);var transitionDelays=styles[transitionProp+'Delay'].split(', ');var transitionDurations=styles[transitionProp+'Duration'].split(', ');var transitionTimeout=getTimeout(transitionDelays,transitionDurations);var animationDelays=styles[animationProp+'Delay'].split(', ');var animationDurations=styles[animationProp+'Duration'].split(', ');var animationTimeout=getTimeout(animationDelays,animationDurations);var type;var timeout=0;var propCount=0;/* istanbul ignore if */if(expectedType===TRANSITION){if(transitionTimeout>0){type=TRANSITION;timeout=transitionTimeout;propCount=transitionDurations.length;}}else if(expectedType===ANIMATION){if(animationTimeout>0){type=ANIMATION;timeout=animationTimeout;propCount=animationDurations.length;}}else{timeout=Math.max(transitionTimeout,animationTimeout);type=timeout>0?transitionTimeout>animationTimeout?TRANSITION:ANIMATION:null;propCount=type?type===TRANSITION?transitionDurations.length:animationDurations.length:0;}var hasTransform=type===TRANSITION&&transformRE.test(styles[transitionProp+'Property']);return{type:type,timeout:timeout,propCount:propCount,hasTransform:hasTransform};}function getTimeout(delays,durations){/* istanbul ignore next */while(delays.length<durations.length){delays=delays.concat(delays);}return Math.max.apply(null,durations.map(function(d,i){return toMs(d)+toMs(delays[i]);}));}function toMs(s){return Number(s.slice(0,-1))*1000;}/*  */function enter(vnode,toggleDisplay){var el=vnode.elm;// call leave callback now
if(isDef(el._leaveCb)){el._leaveCb.cancelled=true;el._leaveCb();}var data=resolveTransition(vnode.data.transition);if(isUndef(data)){return;}/* istanbul ignore if */if(isDef(el._enterCb)||el.nodeType!==1){return;}var css=data.css;var type=data.type;var enterClass=data.enterClass;var enterToClass=data.enterToClass;var enterActiveClass=data.enterActiveClass;var appearClass=data.appearClass;var appearToClass=data.appearToClass;var appearActiveClass=data.appearActiveClass;var beforeEnter=data.beforeEnter;var enter=data.enter;var afterEnter=data.afterEnter;var enterCancelled=data.enterCancelled;var beforeAppear=data.beforeAppear;var appear=data.appear;var afterAppear=data.afterAppear;var appearCancelled=data.appearCancelled;var duration=data.duration;// activeInstance will always be the <transition> component managing this
// transition. One edge case to check is when the <transition> is placed
// as the root node of a child component. In that case we need to check
// <transition>'s parent for appear check.
var context=activeInstance;var transitionNode=activeInstance.$vnode;while(transitionNode&&transitionNode.parent){transitionNode=transitionNode.parent;context=transitionNode.context;}var isAppear=!context._isMounted||!vnode.isRootInsert;if(isAppear&&!appear&&appear!==''){return;}var startClass=isAppear&&appearClass?appearClass:enterClass;var activeClass=isAppear&&appearActiveClass?appearActiveClass:enterActiveClass;var toClass=isAppear&&appearToClass?appearToClass:enterToClass;var beforeEnterHook=isAppear?beforeAppear||beforeEnter:beforeEnter;var enterHook=isAppear?typeof appear==='function'?appear:enter:enter;var afterEnterHook=isAppear?afterAppear||afterEnter:afterEnter;var enterCancelledHook=isAppear?appearCancelled||enterCancelled:enterCancelled;var explicitEnterDuration=toNumber(isObject(duration)?duration.enter:duration);if(process.env.NODE_ENV!=='production'&&explicitEnterDuration!=null){checkDuration(explicitEnterDuration,'enter',vnode);}var expectsCSS=css!==false&&!isIE9;var userWantsControl=getHookArgumentsLength(enterHook);var cb=el._enterCb=once(function(){if(expectsCSS){removeTransitionClass(el,toClass);removeTransitionClass(el,activeClass);}if(cb.cancelled){if(expectsCSS){removeTransitionClass(el,startClass);}enterCancelledHook&&enterCancelledHook(el);}else{afterEnterHook&&afterEnterHook(el);}el._enterCb=null;});if(!vnode.data.show){// remove pending leave element on enter by injecting an insert hook
mergeVNodeHook(vnode,'insert',function(){var parent=el.parentNode;var pendingNode=parent&&parent._pending&&parent._pending[vnode.key];if(pendingNode&&pendingNode.tag===vnode.tag&&pendingNode.elm._leaveCb){pendingNode.elm._leaveCb();}enterHook&&enterHook(el,cb);});}// start enter transition
beforeEnterHook&&beforeEnterHook(el);if(expectsCSS){addTransitionClass(el,startClass);addTransitionClass(el,activeClass);nextFrame(function(){addTransitionClass(el,toClass);removeTransitionClass(el,startClass);if(!cb.cancelled&&!userWantsControl){if(isValidDuration(explicitEnterDuration)){setTimeout(cb,explicitEnterDuration);}else{whenTransitionEnds(el,type,cb);}}});}if(vnode.data.show){toggleDisplay&&toggleDisplay();enterHook&&enterHook(el,cb);}if(!expectsCSS&&!userWantsControl){cb();}}function leave(vnode,rm){var el=vnode.elm;// call enter callback now
if(isDef(el._enterCb)){el._enterCb.cancelled=true;el._enterCb();}var data=resolveTransition(vnode.data.transition);if(isUndef(data)||el.nodeType!==1){return rm();}/* istanbul ignore if */if(isDef(el._leaveCb)){return;}var css=data.css;var type=data.type;var leaveClass=data.leaveClass;var leaveToClass=data.leaveToClass;var leaveActiveClass=data.leaveActiveClass;var beforeLeave=data.beforeLeave;var leave=data.leave;var afterLeave=data.afterLeave;var leaveCancelled=data.leaveCancelled;var delayLeave=data.delayLeave;var duration=data.duration;var expectsCSS=css!==false&&!isIE9;var userWantsControl=getHookArgumentsLength(leave);var explicitLeaveDuration=toNumber(isObject(duration)?duration.leave:duration);if(process.env.NODE_ENV!=='production'&&isDef(explicitLeaveDuration)){checkDuration(explicitLeaveDuration,'leave',vnode);}var cb=el._leaveCb=once(function(){if(el.parentNode&&el.parentNode._pending){el.parentNode._pending[vnode.key]=null;}if(expectsCSS){removeTransitionClass(el,leaveToClass);removeTransitionClass(el,leaveActiveClass);}if(cb.cancelled){if(expectsCSS){removeTransitionClass(el,leaveClass);}leaveCancelled&&leaveCancelled(el);}else{rm();afterLeave&&afterLeave(el);}el._leaveCb=null;});if(delayLeave){delayLeave(performLeave);}else{performLeave();}function performLeave(){// the delayed leave may have already been cancelled
if(cb.cancelled){return;}// record leaving element
if(!vnode.data.show){(el.parentNode._pending||(el.parentNode._pending={}))[vnode.key]=vnode;}beforeLeave&&beforeLeave(el);if(expectsCSS){addTransitionClass(el,leaveClass);addTransitionClass(el,leaveActiveClass);nextFrame(function(){addTransitionClass(el,leaveToClass);removeTransitionClass(el,leaveClass);if(!cb.cancelled&&!userWantsControl){if(isValidDuration(explicitLeaveDuration)){setTimeout(cb,explicitLeaveDuration);}else{whenTransitionEnds(el,type,cb);}}});}leave&&leave(el,cb);if(!expectsCSS&&!userWantsControl){cb();}}}// only used in dev mode
function checkDuration(val,name,vnode){if(typeof val!=='number'){warn("<transition> explicit "+name+" duration is not a valid number - "+"got "+JSON.stringify(val)+".",vnode.context);}else if(isNaN(val)){warn("<transition> explicit "+name+" duration is NaN - "+'the duration expression might be incorrect.',vnode.context);}}function isValidDuration(val){return typeof val==='number'&&!isNaN(val);}/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */function getHookArgumentsLength(fn){if(isUndef(fn)){return false;}var invokerFns=fn.fns;if(isDef(invokerFns)){// invoker
return getHookArgumentsLength(Array.isArray(invokerFns)?invokerFns[0]:invokerFns);}else{return(fn._length||fn.length)>1;}}function _enter(_,vnode){if(vnode.data.show!==true){enter(vnode);}}var transition=inBrowser?{create:_enter,activate:_enter,remove:function remove$$1(vnode,rm){/* istanbul ignore else */if(vnode.data.show!==true){leave(vnode,rm);}else{rm();}}}:{};var platformModules=[attrs,klass,events,domProps,style,transition];/*  */// the directive module should be applied last, after all
// built-in modules have been applied.
var modules=platformModules.concat(baseModules);var patch=createPatchFunction({nodeOps:nodeOps,modules:modules});/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 *//* istanbul ignore if */if(isIE9){// http://www.matts411.com/post/internet-explorer-9-oninput/
document.addEventListener('selectionchange',function(){var el=document.activeElement;if(el&&el.vmodel){trigger(el,'input');}});}var directive={inserted:function inserted(el,binding,vnode,oldVnode){if(vnode.tag==='select'){// #6903
if(oldVnode.elm&&!oldVnode.elm._vOptions){mergeVNodeHook(vnode,'postpatch',function(){directive.componentUpdated(el,binding,vnode);});}else{setSelected(el,binding,vnode.context);}el._vOptions=[].map.call(el.options,getValue);}else if(vnode.tag==='textarea'||isTextInputType(el.type)){el._vModifiers=binding.modifiers;if(!binding.modifiers.lazy){// Safari < 10.2 & UIWebView doesn't fire compositionend when
// switching focus before confirming composition choice
// this also fixes the issue where some browsers e.g. iOS Chrome
// fires "change" instead of "input" on autocomplete.
el.addEventListener('change',onCompositionEnd);if(!isAndroid){el.addEventListener('compositionstart',onCompositionStart);el.addEventListener('compositionend',onCompositionEnd);}/* istanbul ignore if */if(isIE9){el.vmodel=true;}}}},componentUpdated:function componentUpdated(el,binding,vnode){if(vnode.tag==='select'){setSelected(el,binding,vnode.context);// in case the options rendered by v-for have changed,
// it's possible that the value is out-of-sync with the rendered options.
// detect such cases and filter out values that no longer has a matching
// option in the DOM.
var prevOptions=el._vOptions;var curOptions=el._vOptions=[].map.call(el.options,getValue);if(curOptions.some(function(o,i){return!looseEqual(o,prevOptions[i]);})){// trigger change event if
// no matching option found for at least one value
var needReset=el.multiple?binding.value.some(function(v){return hasNoMatchingOption(v,curOptions);}):binding.value!==binding.oldValue&&hasNoMatchingOption(binding.value,curOptions);if(needReset){trigger(el,'change');}}}}};function setSelected(el,binding,vm){actuallySetSelected(el,binding,vm);/* istanbul ignore if */if(isIE||isEdge){setTimeout(function(){actuallySetSelected(el,binding,vm);},0);}}function actuallySetSelected(el,binding,vm){var value=binding.value;var isMultiple=el.multiple;if(isMultiple&&!Array.isArray(value)){process.env.NODE_ENV!=='production'&&warn("<select multiple v-model=\""+binding.expression+"\"> "+"expects an Array value for its binding, but got "+Object.prototype.toString.call(value).slice(8,-1),vm);return;}var selected,option;for(var i=0,l=el.options.length;i<l;i++){option=el.options[i];if(isMultiple){selected=looseIndexOf(value,getValue(option))>-1;if(option.selected!==selected){option.selected=selected;}}else{if(looseEqual(getValue(option),value)){if(el.selectedIndex!==i){el.selectedIndex=i;}return;}}}if(!isMultiple){el.selectedIndex=-1;}}function hasNoMatchingOption(value,options){return options.every(function(o){return!looseEqual(o,value);});}function getValue(option){return'_value'in option?option._value:option.value;}function onCompositionStart(e){e.target.composing=true;}function onCompositionEnd(e){// prevent triggering an input event for no reason
if(!e.target.composing){return;}e.target.composing=false;trigger(e.target,'input');}function trigger(el,type){var e=document.createEvent('HTMLEvents');e.initEvent(type,true,true);el.dispatchEvent(e);}/*  */// recursively search for possible transition defined inside the component root
function locateNode(vnode){return vnode.componentInstance&&(!vnode.data||!vnode.data.transition)?locateNode(vnode.componentInstance._vnode):vnode;}var show={bind:function bind(el,ref,vnode){var value=ref.value;vnode=locateNode(vnode);var transition$$1=vnode.data&&vnode.data.transition;var originalDisplay=el.__vOriginalDisplay=el.style.display==='none'?'':el.style.display;if(value&&transition$$1){vnode.data.show=true;enter(vnode,function(){el.style.display=originalDisplay;});}else{el.style.display=value?originalDisplay:'none';}},update:function update(el,ref,vnode){var value=ref.value;var oldValue=ref.oldValue;/* istanbul ignore if */if(value===oldValue){return;}vnode=locateNode(vnode);var transition$$1=vnode.data&&vnode.data.transition;if(transition$$1){vnode.data.show=true;if(value){enter(vnode,function(){el.style.display=el.__vOriginalDisplay;});}else{leave(vnode,function(){el.style.display='none';});}}else{el.style.display=value?el.__vOriginalDisplay:'none';}},unbind:function unbind(el,binding,vnode,oldVnode,isDestroy){if(!isDestroy){el.style.display=el.__vOriginalDisplay;}}};var platformDirectives={model:directive,show:show};/*  */// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)
var transitionProps={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode){var compOptions=vnode&&vnode.componentOptions;if(compOptions&&compOptions.Ctor.options.abstract){return getRealChild(getFirstComponentChild(compOptions.children));}else{return vnode;}}function extractTransitionData(comp){var data={};var options=comp.$options;// props
for(var key in options.propsData){data[key]=comp[key];}// events.
// extract listeners and pass them directly to the transition methods
var listeners=options._parentListeners;for(var key$1 in listeners){data[camelize(key$1)]=listeners[key$1];}return data;}function placeholder(h,rawChild){if(/\d-keep-alive$/.test(rawChild.tag)){return h('keep-alive',{props:rawChild.componentOptions.propsData});}}function hasParentTransition(vnode){while(vnode=vnode.parent){if(vnode.data.transition){return true;}}}function isSameChild(child,oldChild){return oldChild.key===child.key&&oldChild.tag===child.tag;}var Transition={name:'transition',props:transitionProps,abstract:true,render:function render(h){var this$1=this;var children=this.$slots.default;if(!children){return;}// filter out text nodes (possible whitespaces)
children=children.filter(function(c){return c.tag||isAsyncPlaceholder(c);});/* istanbul ignore if */if(!children.length){return;}// warn multiple elements
if(process.env.NODE_ENV!=='production'&&children.length>1){warn('<transition> can only be used on a single element. Use '+'<transition-group> for lists.',this.$parent);}var mode=this.mode;// warn invalid mode
if(process.env.NODE_ENV!=='production'&&mode&&mode!=='in-out'&&mode!=='out-in'){warn('invalid <transition> mode: '+mode,this.$parent);}var rawChild=children[0];// if this is a component root node and the component's
// parent container node also has transition, skip.
if(hasParentTransition(this.$vnode)){return rawChild;}// apply transition data to child
// use getRealChild() to ignore abstract components e.g. keep-alive
var child=getRealChild(rawChild);/* istanbul ignore if */if(!child){return rawChild;}if(this._leaving){return placeholder(h,rawChild);}// ensure a key that is unique to the vnode type and to this transition
// component instance. This key will be used to remove pending leaving nodes
// during entering.
var id="__transition-"+this._uid+"-";child.key=child.key==null?child.isComment?id+'comment':id+child.tag:isPrimitive(child.key)?String(child.key).indexOf(id)===0?child.key:id+child.key:child.key;var data=(child.data||(child.data={})).transition=extractTransitionData(this);var oldRawChild=this._vnode;var oldChild=getRealChild(oldRawChild);// mark v-show
// so that the transition module can hand over the control to the directive
if(child.data.directives&&child.data.directives.some(function(d){return d.name==='show';})){child.data.show=true;}if(oldChild&&oldChild.data&&!isSameChild(child,oldChild)&&!isAsyncPlaceholder(oldChild)&&// #6687 component root is a comment node
!(oldChild.componentInstance&&oldChild.componentInstance._vnode.isComment)){// replace old child transition data with fresh one
// important for dynamic transitions!
var oldData=oldChild.data.transition=extend({},data);// handle transition mode
if(mode==='out-in'){// return placeholder node and queue update when leave finishes
this._leaving=true;mergeVNodeHook(oldData,'afterLeave',function(){this$1._leaving=false;this$1.$forceUpdate();});return placeholder(h,rawChild);}else if(mode==='in-out'){if(isAsyncPlaceholder(child)){return oldRawChild;}var delayedLeave;var performLeave=function performLeave(){delayedLeave();};mergeVNodeHook(data,'afterEnter',performLeave);mergeVNodeHook(data,'enterCancelled',performLeave);mergeVNodeHook(oldData,'delayLeave',function(leave){delayedLeave=leave;});}}return rawChild;}};/*  */// Provides transition support for list items.
// supports move transitions using the FLIP technique.
// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.
var props=extend({tag:String,moveClass:String},transitionProps);delete props.mode;var TransitionGroup={props:props,render:function render(h){var tag=this.tag||this.$vnode.data.tag||'span';var map=Object.create(null);var prevChildren=this.prevChildren=this.children;var rawChildren=this.$slots.default||[];var children=this.children=[];var transitionData=extractTransitionData(this);for(var i=0;i<rawChildren.length;i++){var c=rawChildren[i];if(c.tag){if(c.key!=null&&String(c.key).indexOf('__vlist')!==0){children.push(c);map[c.key]=c;(c.data||(c.data={})).transition=transitionData;}else if(process.env.NODE_ENV!=='production'){var opts=c.componentOptions;var name=opts?opts.Ctor.options.name||opts.tag||'':c.tag;warn("<transition-group> children must be keyed: <"+name+">");}}}if(prevChildren){var kept=[];var removed=[];for(var i$1=0;i$1<prevChildren.length;i$1++){var c$1=prevChildren[i$1];c$1.data.transition=transitionData;c$1.data.pos=c$1.elm.getBoundingClientRect();if(map[c$1.key]){kept.push(c$1);}else{removed.push(c$1);}}this.kept=h(tag,null,kept);this.removed=removed;}return h(tag,null,children);},beforeUpdate:function beforeUpdate(){// force removing pass
this.__patch__(this._vnode,this.kept,false,// hydrating
true// removeOnly (!important avoids unnecessary moves)
);this._vnode=this.kept;},updated:function updated(){var children=this.prevChildren;var moveClass=this.moveClass||(this.name||'v')+'-move';if(!children.length||!this.hasMove(children[0].elm,moveClass)){return;}// we divide the work into three loops to avoid mixing DOM reads and writes
// in each iteration - which helps prevent layout thrashing.
children.forEach(callPendingCbs);children.forEach(recordPosition);children.forEach(applyTranslation);// force reflow to put everything in position
// assign to this to avoid being removed in tree-shaking
// $flow-disable-line
this._reflow=document.body.offsetHeight;children.forEach(function(c){if(c.data.moved){var el=c.elm;var s=el.style;addTransitionClass(el,moveClass);s.transform=s.WebkitTransform=s.transitionDuration='';el.addEventListener(transitionEndEvent,el._moveCb=function cb(e){if(!e||/transform$/.test(e.propertyName)){el.removeEventListener(transitionEndEvent,cb);el._moveCb=null;removeTransitionClass(el,moveClass);}});}});},methods:{hasMove:function hasMove(el,moveClass){/* istanbul ignore if */if(!hasTransition){return false;}/* istanbul ignore if */if(this._hasMove){return this._hasMove;}// Detect whether an element with the move class applied has
// CSS transitions. Since the element may be inside an entering
// transition at this very moment, we make a clone of it and remove
// all other transition classes applied to ensure only the move class
// is applied.
var clone=el.cloneNode();if(el._transitionClasses){el._transitionClasses.forEach(function(cls){removeClass(clone,cls);});}addClass(clone,moveClass);clone.style.display='none';this.$el.appendChild(clone);var info=getTransitionInfo(clone);this.$el.removeChild(clone);return this._hasMove=info.hasTransform;}}};function callPendingCbs(c){/* istanbul ignore if */if(c.elm._moveCb){c.elm._moveCb();}/* istanbul ignore if */if(c.elm._enterCb){c.elm._enterCb();}}function recordPosition(c){c.data.newPos=c.elm.getBoundingClientRect();}function applyTranslation(c){var oldPos=c.data.pos;var newPos=c.data.newPos;var dx=oldPos.left-newPos.left;var dy=oldPos.top-newPos.top;if(dx||dy){c.data.moved=true;var s=c.elm.style;s.transform=s.WebkitTransform="translate("+dx+"px,"+dy+"px)";s.transitionDuration='0s';}}var platformComponents={Transition:Transition,TransitionGroup:TransitionGroup};/*  */// install platform specific utils
Vue$3.config.mustUseProp=mustUseProp;Vue$3.config.isReservedTag=isReservedTag;Vue$3.config.isReservedAttr=isReservedAttr;Vue$3.config.getTagNamespace=getTagNamespace;Vue$3.config.isUnknownElement=isUnknownElement;// install platform runtime directives & components
extend(Vue$3.options.directives,platformDirectives);extend(Vue$3.options.components,platformComponents);// install platform patch function
Vue$3.prototype.__patch__=inBrowser?patch:noop;// public mount method
Vue$3.prototype.$mount=function(el,hydrating){el=el&&inBrowser?query(el):undefined;return mountComponent(this,el,hydrating);};// devtools global hook
/* istanbul ignore next */Vue$3.nextTick(function(){if(config.devtools){if(devtools){devtools.emit('init',Vue$3);}else if(process.env.NODE_ENV!=='production'&&isChrome){console[console.info?'info':'log']('Download the Vue Devtools extension for a better development experience:\n'+'https://github.com/vuejs/vue-devtools');}}if(process.env.NODE_ENV!=='production'&&config.productionTip!==false&&inBrowser&&typeof console!=='undefined'){console[console.info?'info':'log']("You are running Vue in development mode.\n"+"Make sure to turn on production mode when deploying for production.\n"+"See more tips at https://vuejs.org/guide/deployment.html");}},0);/*  */var defaultTagRE=/\{\{((?:.|\n)+?)\}\}/g;var regexEscapeRE=/[-.*+?^${}()|[\]\/\\]/g;var buildRegex=cached(function(delimiters){var open=delimiters[0].replace(regexEscapeRE,'\\$&');var close=delimiters[1].replace(regexEscapeRE,'\\$&');return new RegExp(open+'((?:.|\\n)+?)'+close,'g');});function parseText(text,delimiters){var tagRE=delimiters?buildRegex(delimiters):defaultTagRE;if(!tagRE.test(text)){return;}var tokens=[];var rawTokens=[];var lastIndex=tagRE.lastIndex=0;var match,index,tokenValue;while(match=tagRE.exec(text)){index=match.index;// push text token
if(index>lastIndex){rawTokens.push(tokenValue=text.slice(lastIndex,index));tokens.push(JSON.stringify(tokenValue));}// tag token
var exp=parseFilters(match[1].trim());tokens.push("_s("+exp+")");rawTokens.push({'@binding':exp});lastIndex=index+match[0].length;}if(lastIndex<text.length){rawTokens.push(tokenValue=text.slice(lastIndex));tokens.push(JSON.stringify(tokenValue));}return{expression:tokens.join('+'),tokens:rawTokens};}/*  */function transformNode(el,options){var warn=options.warn||baseWarn;var staticClass=getAndRemoveAttr(el,'class');if(process.env.NODE_ENV!=='production'&&staticClass){var res=parseText(staticClass,options.delimiters);if(res){warn("class=\""+staticClass+"\": "+'Interpolation inside attributes has been removed. '+'Use v-bind or the colon shorthand instead. For example, '+'instead of <div class="{{ val }}">, use <div :class="val">.');}}if(staticClass){el.staticClass=JSON.stringify(staticClass);}var classBinding=getBindingAttr(el,'class',false/* getStatic */);if(classBinding){el.classBinding=classBinding;}}function genData(el){var data='';if(el.staticClass){data+="staticClass:"+el.staticClass+",";}if(el.classBinding){data+="class:"+el.classBinding+",";}return data;}var klass$1={staticKeys:['staticClass'],transformNode:transformNode,genData:genData};/*  */function transformNode$1(el,options){var warn=options.warn||baseWarn;var staticStyle=getAndRemoveAttr(el,'style');if(staticStyle){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'){var res=parseText(staticStyle,options.delimiters);if(res){warn("style=\""+staticStyle+"\": "+'Interpolation inside attributes has been removed. '+'Use v-bind or the colon shorthand instead. For example, '+'instead of <div style="{{ val }}">, use <div :style="val">.');}}el.staticStyle=JSON.stringify(parseStyleText(staticStyle));}var styleBinding=getBindingAttr(el,'style',false/* getStatic */);if(styleBinding){el.styleBinding=styleBinding;}}function genData$1(el){var data='';if(el.staticStyle){data+="staticStyle:"+el.staticStyle+",";}if(el.styleBinding){data+="style:("+el.styleBinding+"),";}return data;}var style$1={staticKeys:['staticStyle'],transformNode:transformNode$1,genData:genData$1};/*  */var decoder;var he={decode:function decode(html){decoder=decoder||document.createElement('div');decoder.innerHTML=html;return decoder.textContent;}};/*  */var isUnaryTag=makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,'+'link,meta,param,source,track,wbr');// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag=makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag=makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,'+'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,'+'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,'+'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,'+'title,tr,track');/**
 * Not type-checking this file because it's mostly vendor code.
 *//*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */// Regular Expressions for parsing tags and attributes
var attribute=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname='[a-zA-Z_][\\w\\-\\.]*';var qnameCapture="((?:"+ncname+"\\:)?"+ncname+")";var startTagOpen=new RegExp("^<"+qnameCapture);var startTagClose=/^\s*(\/?)>/;var endTag=new RegExp("^<\\/"+qnameCapture+"[^>]*>");var doctype=/^<!DOCTYPE [^>]+>/i;var comment=/^<!--/;var conditionalComment=/^<!\[/;var IS_REGEX_CAPTURING_BROKEN=false;'x'.replace(/x(.)?/g,function(m,g){IS_REGEX_CAPTURING_BROKEN=g==='';});// Special Elements (can contain anything)
var isPlainTextElement=makeMap('script,style,textarea',true);var reCache={};var decodingMap={'&lt;':'<','&gt;':'>','&quot;':'"','&amp;':'&','&#10;':'\n','&#9;':'\t'};var encodedAttr=/&(?:lt|gt|quot|amp);/g;var encodedAttrWithNewLines=/&(?:lt|gt|quot|amp|#10|#9);/g;// #5992
var isIgnoreNewlineTag=makeMap('pre,textarea',true);var shouldIgnoreFirstNewline=function shouldIgnoreFirstNewline(tag,html){return tag&&isIgnoreNewlineTag(tag)&&html[0]==='\n';};function decodeAttr(value,shouldDecodeNewlines){var re=shouldDecodeNewlines?encodedAttrWithNewLines:encodedAttr;return value.replace(re,function(match){return decodingMap[match];});}function parseHTML(html,options){var stack=[];var expectHTML=options.expectHTML;var isUnaryTag$$1=options.isUnaryTag||no;var canBeLeftOpenTag$$1=options.canBeLeftOpenTag||no;var index=0;var last,lastTag;while(html){last=html;// Make sure we're not in a plaintext content element like script/style
if(!lastTag||!isPlainTextElement(lastTag)){var textEnd=html.indexOf('<');if(textEnd===0){// Comment:
if(comment.test(html)){var commentEnd=html.indexOf('-->');if(commentEnd>=0){if(options.shouldKeepComment){options.comment(html.substring(4,commentEnd));}advance(commentEnd+3);continue;}}// http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
if(conditionalComment.test(html)){var conditionalEnd=html.indexOf(']>');if(conditionalEnd>=0){advance(conditionalEnd+2);continue;}}// Doctype:
var doctypeMatch=html.match(doctype);if(doctypeMatch){advance(doctypeMatch[0].length);continue;}// End tag:
var endTagMatch=html.match(endTag);if(endTagMatch){var curIndex=index;advance(endTagMatch[0].length);parseEndTag(endTagMatch[1],curIndex,index);continue;}// Start tag:
var startTagMatch=parseStartTag();if(startTagMatch){handleStartTag(startTagMatch);if(shouldIgnoreFirstNewline(lastTag,html)){advance(1);}continue;}}var text=void 0,rest=void 0,next=void 0;if(textEnd>=0){rest=html.slice(textEnd);while(!endTag.test(rest)&&!startTagOpen.test(rest)&&!comment.test(rest)&&!conditionalComment.test(rest)){// < in plain text, be forgiving and treat it as text
next=rest.indexOf('<',1);if(next<0){break;}textEnd+=next;rest=html.slice(textEnd);}text=html.substring(0,textEnd);advance(textEnd);}if(textEnd<0){text=html;html='';}if(options.chars&&text){options.chars(text);}}else{var endTagLength=0;var stackedTag=lastTag.toLowerCase();var reStackedTag=reCache[stackedTag]||(reCache[stackedTag]=new RegExp('([\\s\\S]*?)(</'+stackedTag+'[^>]*>)','i'));var rest$1=html.replace(reStackedTag,function(all,text,endTag){endTagLength=endTag.length;if(!isPlainTextElement(stackedTag)&&stackedTag!=='noscript'){text=text.replace(/<!--([\s\S]*?)-->/g,'$1').replace(/<!\[CDATA\[([\s\S]*?)]]>/g,'$1');}if(shouldIgnoreFirstNewline(stackedTag,text)){text=text.slice(1);}if(options.chars){options.chars(text);}return'';});index+=html.length-rest$1.length;html=rest$1;parseEndTag(stackedTag,index-endTagLength,index);}if(html===last){options.chars&&options.chars(html);if(process.env.NODE_ENV!=='production'&&!stack.length&&options.warn){options.warn("Mal-formatted tag at end of template: \""+html+"\"");}break;}}// Clean up any remaining tags
parseEndTag();function advance(n){index+=n;html=html.substring(n);}function parseStartTag(){var start=html.match(startTagOpen);if(start){var match={tagName:start[1],attrs:[],start:index};advance(start[0].length);var end,attr;while(!(end=html.match(startTagClose))&&(attr=html.match(attribute))){advance(attr[0].length);match.attrs.push(attr);}if(end){match.unarySlash=end[1];advance(end[0].length);match.end=index;return match;}}}function handleStartTag(match){var tagName=match.tagName;var unarySlash=match.unarySlash;if(expectHTML){if(lastTag==='p'&&isNonPhrasingTag(tagName)){parseEndTag(lastTag);}if(canBeLeftOpenTag$$1(tagName)&&lastTag===tagName){parseEndTag(tagName);}}var unary=isUnaryTag$$1(tagName)||!!unarySlash;var l=match.attrs.length;var attrs=new Array(l);for(var i=0;i<l;i++){var args=match.attrs[i];// hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
if(IS_REGEX_CAPTURING_BROKEN&&args[0].indexOf('""')===-1){if(args[3]===''){delete args[3];}if(args[4]===''){delete args[4];}if(args[5]===''){delete args[5];}}var value=args[3]||args[4]||args[5]||'';var shouldDecodeNewlines=tagName==='a'&&args[1]==='href'?options.shouldDecodeNewlinesForHref:options.shouldDecodeNewlines;attrs[i]={name:args[1],value:decodeAttr(value,shouldDecodeNewlines)};}if(!unary){stack.push({tag:tagName,lowerCasedTag:tagName.toLowerCase(),attrs:attrs});lastTag=tagName;}if(options.start){options.start(tagName,attrs,unary,match.start,match.end);}}function parseEndTag(tagName,start,end){var pos,lowerCasedTagName;if(start==null){start=index;}if(end==null){end=index;}if(tagName){lowerCasedTagName=tagName.toLowerCase();}// Find the closest opened tag of the same type
if(tagName){for(pos=stack.length-1;pos>=0;pos--){if(stack[pos].lowerCasedTag===lowerCasedTagName){break;}}}else{// If no tag name is provided, clean shop
pos=0;}if(pos>=0){// Close all the open elements, up the stack
for(var i=stack.length-1;i>=pos;i--){if(process.env.NODE_ENV!=='production'&&(i>pos||!tagName)&&options.warn){options.warn("tag <"+stack[i].tag+"> has no matching end tag.");}if(options.end){options.end(stack[i].tag,start,end);}}// Remove the open elements from the stack
stack.length=pos;lastTag=pos&&stack[pos-1].tag;}else if(lowerCasedTagName==='br'){if(options.start){options.start(tagName,[],true,start,end);}}else if(lowerCasedTagName==='p'){if(options.start){options.start(tagName,[],false,start,end);}if(options.end){options.end(tagName,start,end);}}}}/*  */var onRE=/^@|^v-on:/;var dirRE=/^v-|^@|^:/;var forAliasRE=/(.*?)\s+(?:in|of)\s+(.*)/;var forIteratorRE=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/;var stripParensRE=/^\(|\)$/g;var argRE=/:(.*)$/;var bindRE=/^:|^v-bind:/;var modifierRE=/\.[^.]+/g;var decodeHTMLCached=cached(he.decode);// configurable state
var warn$2;var delimiters;var transforms;var preTransforms;var postTransforms;var platformIsPreTag;var platformMustUseProp;var platformGetTagNamespace;function createASTElement(tag,attrs,parent){return{type:1,tag:tag,attrsList:attrs,attrsMap:makeAttrsMap(attrs),parent:parent,children:[]};}/**
 * Convert HTML string to AST.
 */function parse(template,options){warn$2=options.warn||baseWarn;platformIsPreTag=options.isPreTag||no;platformMustUseProp=options.mustUseProp||no;platformGetTagNamespace=options.getTagNamespace||no;transforms=pluckModuleFunction(options.modules,'transformNode');preTransforms=pluckModuleFunction(options.modules,'preTransformNode');postTransforms=pluckModuleFunction(options.modules,'postTransformNode');delimiters=options.delimiters;var stack=[];var preserveWhitespace=options.preserveWhitespace!==false;var root;var currentParent;var inVPre=false;var inPre=false;var warned=false;function warnOnce(msg){if(!warned){warned=true;warn$2(msg);}}function closeElement(element){// check pre state
if(element.pre){inVPre=false;}if(platformIsPreTag(element.tag)){inPre=false;}// apply post-transforms
for(var i=0;i<postTransforms.length;i++){postTransforms[i](element,options);}}parseHTML(template,{warn:warn$2,expectHTML:options.expectHTML,isUnaryTag:options.isUnaryTag,canBeLeftOpenTag:options.canBeLeftOpenTag,shouldDecodeNewlines:options.shouldDecodeNewlines,shouldDecodeNewlinesForHref:options.shouldDecodeNewlinesForHref,shouldKeepComment:options.comments,start:function start(tag,attrs,unary){// check namespace.
// inherit parent ns if there is one
var ns=currentParent&&currentParent.ns||platformGetTagNamespace(tag);// handle IE svg bug
/* istanbul ignore if */if(isIE&&ns==='svg'){attrs=guardIESVGBug(attrs);}var element=createASTElement(tag,attrs,currentParent);if(ns){element.ns=ns;}if(isForbiddenTag(element)&&!isServerRendering()){element.forbidden=true;process.env.NODE_ENV!=='production'&&warn$2('Templates should only be responsible for mapping the state to the '+'UI. Avoid placing tags with side-effects in your templates, such as '+"<"+tag+">"+', as they will not be parsed.');}// apply pre-transforms
for(var i=0;i<preTransforms.length;i++){element=preTransforms[i](element,options)||element;}if(!inVPre){processPre(element);if(element.pre){inVPre=true;}}if(platformIsPreTag(element.tag)){inPre=true;}if(inVPre){processRawAttrs(element);}else if(!element.processed){// structural directives
processFor(element);processIf(element);processOnce(element);// element-scope stuff
processElement(element,options);}function checkRootConstraints(el){if(process.env.NODE_ENV!=='production'){if(el.tag==='slot'||el.tag==='template'){warnOnce("Cannot use <"+el.tag+"> as component root element because it may "+'contain multiple nodes.');}if(el.attrsMap.hasOwnProperty('v-for')){warnOnce('Cannot use v-for on stateful component root element because '+'it renders multiple elements.');}}}// tree management
if(!root){root=element;checkRootConstraints(root);}else if(!stack.length){// allow root elements with v-if, v-else-if and v-else
if(root.if&&(element.elseif||element.else)){checkRootConstraints(element);addIfCondition(root,{exp:element.elseif,block:element});}else if(process.env.NODE_ENV!=='production'){warnOnce("Component template should contain exactly one root element. "+"If you are using v-if on multiple elements, "+"use v-else-if to chain them instead.");}}if(currentParent&&!element.forbidden){if(element.elseif||element.else){processIfConditions(element,currentParent);}else if(element.slotScope){// scoped slot
currentParent.plain=false;var name=element.slotTarget||'"default"';(currentParent.scopedSlots||(currentParent.scopedSlots={}))[name]=element;}else{currentParent.children.push(element);element.parent=currentParent;}}if(!unary){currentParent=element;stack.push(element);}else{closeElement(element);}},end:function end(){// remove trailing whitespace
var element=stack[stack.length-1];var lastNode=element.children[element.children.length-1];if(lastNode&&lastNode.type===3&&lastNode.text===' '&&!inPre){element.children.pop();}// pop stack
stack.length-=1;currentParent=stack[stack.length-1];closeElement(element);},chars:function chars(text){if(!currentParent){if(process.env.NODE_ENV!=='production'){if(text===template){warnOnce('Component template requires a root element, rather than just text.');}else if(text=text.trim()){warnOnce("text \""+text+"\" outside root element will be ignored.");}}return;}// IE textarea placeholder bug
/* istanbul ignore if */if(isIE&&currentParent.tag==='textarea'&&currentParent.attrsMap.placeholder===text){return;}var children=currentParent.children;text=inPre||text.trim()?isTextTag(currentParent)?text:decodeHTMLCached(text)// only preserve whitespace if its not right after a starting tag
:preserveWhitespace&&children.length?' ':'';if(text){var res;if(!inVPre&&text!==' '&&(res=parseText(text,delimiters))){children.push({type:2,expression:res.expression,tokens:res.tokens,text:text});}else if(text!==' '||!children.length||children[children.length-1].text!==' '){children.push({type:3,text:text});}}},comment:function comment(text){currentParent.children.push({type:3,text:text,isComment:true});}});return root;}function processPre(el){if(getAndRemoveAttr(el,'v-pre')!=null){el.pre=true;}}function processRawAttrs(el){var l=el.attrsList.length;if(l){var attrs=el.attrs=new Array(l);for(var i=0;i<l;i++){attrs[i]={name:el.attrsList[i].name,value:JSON.stringify(el.attrsList[i].value)};}}else if(!el.pre){// non root node in pre blocks with no attributes
el.plain=true;}}function processElement(element,options){processKey(element);// determine whether this is a plain element after
// removing structural attributes
element.plain=!element.key&&!element.attrsList.length;processRef(element);processSlot(element);processComponent(element);for(var i=0;i<transforms.length;i++){element=transforms[i](element,options)||element;}processAttrs(element);}function processKey(el){var exp=getBindingAttr(el,'key');if(exp){if(process.env.NODE_ENV!=='production'&&el.tag==='template'){warn$2("<template> cannot be keyed. Place the key on real elements instead.");}el.key=exp;}}function processRef(el){var ref=getBindingAttr(el,'ref');if(ref){el.ref=ref;el.refInFor=checkInFor(el);}}function processFor(el){var exp;if(exp=getAndRemoveAttr(el,'v-for')){var res=parseFor(exp);if(res){extend(el,res);}else if(process.env.NODE_ENV!=='production'){warn$2("Invalid v-for expression: "+exp);}}}function parseFor(exp){var inMatch=exp.match(forAliasRE);if(!inMatch){return;}var res={};res.for=inMatch[2].trim();var alias=inMatch[1].trim().replace(stripParensRE,'');var iteratorMatch=alias.match(forIteratorRE);if(iteratorMatch){res.alias=alias.replace(forIteratorRE,'');res.iterator1=iteratorMatch[1].trim();if(iteratorMatch[2]){res.iterator2=iteratorMatch[2].trim();}}else{res.alias=alias;}return res;}function processIf(el){var exp=getAndRemoveAttr(el,'v-if');if(exp){el.if=exp;addIfCondition(el,{exp:exp,block:el});}else{if(getAndRemoveAttr(el,'v-else')!=null){el.else=true;}var elseif=getAndRemoveAttr(el,'v-else-if');if(elseif){el.elseif=elseif;}}}function processIfConditions(el,parent){var prev=findPrevElement(parent.children);if(prev&&prev.if){addIfCondition(prev,{exp:el.elseif,block:el});}else if(process.env.NODE_ENV!=='production'){warn$2("v-"+(el.elseif?'else-if="'+el.elseif+'"':'else')+" "+"used on element <"+el.tag+"> without corresponding v-if.");}}function findPrevElement(children){var i=children.length;while(i--){if(children[i].type===1){return children[i];}else{if(process.env.NODE_ENV!=='production'&&children[i].text!==' '){warn$2("text \""+children[i].text.trim()+"\" between v-if and v-else(-if) "+"will be ignored.");}children.pop();}}}function addIfCondition(el,condition){if(!el.ifConditions){el.ifConditions=[];}el.ifConditions.push(condition);}function processOnce(el){var once$$1=getAndRemoveAttr(el,'v-once');if(once$$1!=null){el.once=true;}}function processSlot(el){if(el.tag==='slot'){el.slotName=getBindingAttr(el,'name');if(process.env.NODE_ENV!=='production'&&el.key){warn$2("`key` does not work on <slot> because slots are abstract outlets "+"and can possibly expand into multiple elements. "+"Use the key on a wrapping element instead.");}}else{var slotScope;if(el.tag==='template'){slotScope=getAndRemoveAttr(el,'scope');/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&slotScope){warn$2("the \"scope\" attribute for scoped slots have been deprecated and "+"replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute "+"can also be used on plain elements in addition to <template> to "+"denote scoped slots.",true);}el.slotScope=slotScope||getAndRemoveAttr(el,'slot-scope');}else if(slotScope=getAndRemoveAttr(el,'slot-scope')){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&el.attrsMap['v-for']){warn$2("Ambiguous combined usage of slot-scope and v-for on <"+el.tag+"> "+"(v-for takes higher priority). Use a wrapper <template> for the "+"scoped slot to make it clearer.",true);}el.slotScope=slotScope;}var slotTarget=getBindingAttr(el,'slot');if(slotTarget){el.slotTarget=slotTarget==='""'?'"default"':slotTarget;// preserve slot as an attribute for native shadow DOM compat
// only for non-scoped slots.
if(el.tag!=='template'&&!el.slotScope){addAttr(el,'slot',slotTarget);}}}}function processComponent(el){var binding;if(binding=getBindingAttr(el,'is')){el.component=binding;}if(getAndRemoveAttr(el,'inline-template')!=null){el.inlineTemplate=true;}}function processAttrs(el){var list=el.attrsList;var i,l,name,rawName,value,modifiers,isProp;for(i=0,l=list.length;i<l;i++){name=rawName=list[i].name;value=list[i].value;if(dirRE.test(name)){// mark element as dynamic
el.hasBindings=true;// modifiers
modifiers=parseModifiers(name);if(modifiers){name=name.replace(modifierRE,'');}if(bindRE.test(name)){// v-bind
name=name.replace(bindRE,'');value=parseFilters(value);isProp=false;if(modifiers){if(modifiers.prop){isProp=true;name=camelize(name);if(name==='innerHtml'){name='innerHTML';}}if(modifiers.camel){name=camelize(name);}if(modifiers.sync){addHandler(el,"update:"+camelize(name),genAssignmentCode(value,"$event"));}}if(isProp||!el.component&&platformMustUseProp(el.tag,el.attrsMap.type,name)){addProp(el,name,value);}else{addAttr(el,name,value);}}else if(onRE.test(name)){// v-on
name=name.replace(onRE,'');addHandler(el,name,value,modifiers,false,warn$2);}else{// normal directives
name=name.replace(dirRE,'');// parse arg
var argMatch=name.match(argRE);var arg=argMatch&&argMatch[1];if(arg){name=name.slice(0,-(arg.length+1));}addDirective(el,name,rawName,value,arg,modifiers);if(process.env.NODE_ENV!=='production'&&name==='model'){checkForAliasModel(el,value);}}}else{// literal attribute
if(process.env.NODE_ENV!=='production'){var res=parseText(value,delimiters);if(res){warn$2(name+"=\""+value+"\": "+'Interpolation inside attributes has been removed. '+'Use v-bind or the colon shorthand instead. For example, '+'instead of <div id="{{ val }}">, use <div :id="val">.');}}addAttr(el,name,JSON.stringify(value));// #6887 firefox doesn't update muted state if set via attribute
// even immediately after element creation
if(!el.component&&name==='muted'&&platformMustUseProp(el.tag,el.attrsMap.type,name)){addProp(el,name,'true');}}}}function checkInFor(el){var parent=el;while(parent){if(parent.for!==undefined){return true;}parent=parent.parent;}return false;}function parseModifiers(name){var match=name.match(modifierRE);if(match){var ret={};match.forEach(function(m){ret[m.slice(1)]=true;});return ret;}}function makeAttrsMap(attrs){var map={};for(var i=0,l=attrs.length;i<l;i++){if(process.env.NODE_ENV!=='production'&&map[attrs[i].name]&&!isIE&&!isEdge){warn$2('duplicate attribute: '+attrs[i].name);}map[attrs[i].name]=attrs[i].value;}return map;}// for script (e.g. type="x/template") or style, do not decode content
function isTextTag(el){return el.tag==='script'||el.tag==='style';}function isForbiddenTag(el){return el.tag==='style'||el.tag==='script'&&(!el.attrsMap.type||el.attrsMap.type==='text/javascript');}var ieNSBug=/^xmlns:NS\d+/;var ieNSPrefix=/^NS\d+:/;/* istanbul ignore next */function guardIESVGBug(attrs){var res=[];for(var i=0;i<attrs.length;i++){var attr=attrs[i];if(!ieNSBug.test(attr.name)){attr.name=attr.name.replace(ieNSPrefix,'');res.push(attr);}}return res;}function checkForAliasModel(el,value){var _el=el;while(_el){if(_el.for&&_el.alias===value){warn$2("<"+el.tag+" v-model=\""+value+"\">: "+"You are binding v-model directly to a v-for iteration alias. "+"This will not be able to modify the v-for source array because "+"writing to the alias is like modifying a function local variable. "+"Consider using an array of objects and use v-model on an object property instead.");}_el=_el.parent;}}/*  *//**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */function preTransformNode(el,options){if(el.tag==='input'){var map=el.attrsMap;if(map['v-model']&&(map['v-bind:type']||map[':type'])){var typeBinding=getBindingAttr(el,'type');var ifCondition=getAndRemoveAttr(el,'v-if',true);var ifConditionExtra=ifCondition?"&&("+ifCondition+")":"";var hasElse=getAndRemoveAttr(el,'v-else',true)!=null;var elseIfCondition=getAndRemoveAttr(el,'v-else-if',true);// 1. checkbox
var branch0=cloneASTElement(el);// process for on the main node
processFor(branch0);addRawAttr(branch0,'type','checkbox');processElement(branch0,options);branch0.processed=true;// prevent it from double-processed
branch0.if="("+typeBinding+")==='checkbox'"+ifConditionExtra;addIfCondition(branch0,{exp:branch0.if,block:branch0});// 2. add radio else-if condition
var branch1=cloneASTElement(el);getAndRemoveAttr(branch1,'v-for',true);addRawAttr(branch1,'type','radio');processElement(branch1,options);addIfCondition(branch0,{exp:"("+typeBinding+")==='radio'"+ifConditionExtra,block:branch1});// 3. other
var branch2=cloneASTElement(el);getAndRemoveAttr(branch2,'v-for',true);addRawAttr(branch2,':type',typeBinding);processElement(branch2,options);addIfCondition(branch0,{exp:ifCondition,block:branch2});if(hasElse){branch0.else=true;}else if(elseIfCondition){branch0.elseif=elseIfCondition;}return branch0;}}}function cloneASTElement(el){return createASTElement(el.tag,el.attrsList.slice(),el.parent);}var model$2={preTransformNode:preTransformNode};var modules$1=[klass$1,style$1,model$2];/*  */function text(el,dir){if(dir.value){addProp(el,'textContent',"_s("+dir.value+")");}}/*  */function html(el,dir){if(dir.value){addProp(el,'innerHTML',"_s("+dir.value+")");}}var directives$1={model:model,text:text,html:html};/*  */var baseOptions={expectHTML:true,modules:modules$1,directives:directives$1,isPreTag:isPreTag,isUnaryTag:isUnaryTag,mustUseProp:mustUseProp,canBeLeftOpenTag:canBeLeftOpenTag,isReservedTag:isReservedTag,getTagNamespace:getTagNamespace,staticKeys:genStaticKeys(modules$1)};/*  */var isStaticKey;var isPlatformReservedTag;var genStaticKeysCached=cached(genStaticKeys$1);/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */function optimize(root,options){if(!root){return;}isStaticKey=genStaticKeysCached(options.staticKeys||'');isPlatformReservedTag=options.isReservedTag||no;// first pass: mark all non-static nodes.
markStatic$1(root);// second pass: mark static roots.
markStaticRoots(root,false);}function genStaticKeys$1(keys){return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs'+(keys?','+keys:''));}function markStatic$1(node){node.static=isStatic(node);if(node.type===1){// do not make component slot content static. this avoids
// 1. components not able to mutate slot nodes
// 2. static slot content fails for hot-reloading
if(!isPlatformReservedTag(node.tag)&&node.tag!=='slot'&&node.attrsMap['inline-template']==null){return;}for(var i=0,l=node.children.length;i<l;i++){var child=node.children[i];markStatic$1(child);if(!child.static){node.static=false;}}if(node.ifConditions){for(var i$1=1,l$1=node.ifConditions.length;i$1<l$1;i$1++){var block=node.ifConditions[i$1].block;markStatic$1(block);if(!block.static){node.static=false;}}}}}function markStaticRoots(node,isInFor){if(node.type===1){if(node.static||node.once){node.staticInFor=isInFor;}// For a node to qualify as a static root, it should have children that
// are not just static text. Otherwise the cost of hoisting out will
// outweigh the benefits and it's better off to just always render it fresh.
if(node.static&&node.children.length&&!(node.children.length===1&&node.children[0].type===3)){node.staticRoot=true;return;}else{node.staticRoot=false;}if(node.children){for(var i=0,l=node.children.length;i<l;i++){markStaticRoots(node.children[i],isInFor||!!node.for);}}if(node.ifConditions){for(var i$1=1,l$1=node.ifConditions.length;i$1<l$1;i$1++){markStaticRoots(node.ifConditions[i$1].block,isInFor);}}}}function isStatic(node){if(node.type===2){// expression
return false;}if(node.type===3){// text
return true;}return!!(node.pre||!node.hasBindings&&// no dynamic bindings
!node.if&&!node.for&&// not v-if or v-for or v-else
!isBuiltInTag(node.tag)&&// not a built-in
isPlatformReservedTag(node.tag)&&// not a component
!isDirectChildOfTemplateFor(node)&&Object.keys(node).every(isStaticKey));}function isDirectChildOfTemplateFor(node){while(node.parent){node=node.parent;if(node.tag!=='template'){return false;}if(node.for){return true;}}return false;}/*  */var fnExpRE=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;var simplePathRE=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;// keyCode aliases
var keyCodes={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,'delete':[8,46]};// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard=function genGuard(condition){return"if("+condition+")return null;";};var modifierCode={stop:'$event.stopPropagation();',prevent:'$event.preventDefault();',self:genGuard("$event.target !== $event.currentTarget"),ctrl:genGuard("!$event.ctrlKey"),shift:genGuard("!$event.shiftKey"),alt:genGuard("!$event.altKey"),meta:genGuard("!$event.metaKey"),left:genGuard("'button' in $event && $event.button !== 0"),middle:genGuard("'button' in $event && $event.button !== 1"),right:genGuard("'button' in $event && $event.button !== 2")};function genHandlers(events,isNative,warn){var res=isNative?'nativeOn:{':'on:{';for(var name in events){res+="\""+name+"\":"+genHandler(name,events[name])+",";}return res.slice(0,-1)+'}';}function genHandler(name,handler){if(!handler){return'function(){}';}if(Array.isArray(handler)){return"["+handler.map(function(handler){return genHandler(name,handler);}).join(',')+"]";}var isMethodPath=simplePathRE.test(handler.value);var isFunctionExpression=fnExpRE.test(handler.value);if(!handler.modifiers){if(isMethodPath||isFunctionExpression){return handler.value;}/* istanbul ignore if */return"function($event){"+handler.value+"}";// inline statement
}else{var code='';var genModifierCode='';var keys=[];for(var key in handler.modifiers){if(modifierCode[key]){genModifierCode+=modifierCode[key];// left/right
if(keyCodes[key]){keys.push(key);}}else if(key==='exact'){var modifiers=handler.modifiers;genModifierCode+=genGuard(['ctrl','shift','alt','meta'].filter(function(keyModifier){return!modifiers[keyModifier];}).map(function(keyModifier){return"$event."+keyModifier+"Key";}).join('||'));}else{keys.push(key);}}if(keys.length){code+=genKeyFilter(keys);}// Make sure modifiers like prevent and stop get executed after key filtering
if(genModifierCode){code+=genModifierCode;}var handlerCode=isMethodPath?handler.value+'($event)':isFunctionExpression?"("+handler.value+")($event)":handler.value;/* istanbul ignore if */return"function($event){"+code+handlerCode+"}";}}function genKeyFilter(keys){return"if(!('button' in $event)&&"+keys.map(genFilterCode).join('&&')+")return null;";}function genFilterCode(key){var keyVal=parseInt(key,10);if(keyVal){return"$event.keyCode!=="+keyVal;}var code=keyCodes[key];return"_k($event.keyCode,"+JSON.stringify(key)+","+JSON.stringify(code)+","+"$event.key)";}/*  */function on(el,dir){if(process.env.NODE_ENV!=='production'&&dir.modifiers){warn("v-on without argument does not support modifiers.");}el.wrapListeners=function(code){return"_g("+code+","+dir.value+")";};}/*  */function bind$1(el,dir){el.wrapData=function(code){return"_b("+code+",'"+el.tag+"',"+dir.value+","+(dir.modifiers&&dir.modifiers.prop?'true':'false')+(dir.modifiers&&dir.modifiers.sync?',true':'')+")";};}/*  */var baseDirectives={on:on,bind:bind$1,cloak:noop};/*  */var CodegenState=function CodegenState(options){this.options=options;this.warn=options.warn||baseWarn;this.transforms=pluckModuleFunction(options.modules,'transformCode');this.dataGenFns=pluckModuleFunction(options.modules,'genData');this.directives=extend(extend({},baseDirectives),options.directives);var isReservedTag=options.isReservedTag||no;this.maybeComponent=function(el){return!isReservedTag(el.tag);};this.onceId=0;this.staticRenderFns=[];};function generate(ast,options){var state=new CodegenState(options);var code=ast?genElement(ast,state):'_c("div")';return{render:"with(this){return "+code+"}",staticRenderFns:state.staticRenderFns};}function genElement(el,state){if(el.staticRoot&&!el.staticProcessed){return genStatic(el,state);}else if(el.once&&!el.onceProcessed){return genOnce(el,state);}else if(el.for&&!el.forProcessed){return genFor(el,state);}else if(el.if&&!el.ifProcessed){return genIf(el,state);}else if(el.tag==='template'&&!el.slotTarget){return genChildren(el,state)||'void 0';}else if(el.tag==='slot'){return genSlot(el,state);}else{// component or element
var code;if(el.component){code=genComponent(el.component,el,state);}else{var data=el.plain?undefined:genData$2(el,state);var children=el.inlineTemplate?null:genChildren(el,state,true);code="_c('"+el.tag+"'"+(data?","+data:'')+(children?","+children:'')+")";}// module transforms
for(var i=0;i<state.transforms.length;i++){code=state.transforms[i](el,code);}return code;}}// hoist static sub-trees out
function genStatic(el,state){el.staticProcessed=true;state.staticRenderFns.push("with(this){return "+genElement(el,state)+"}");return"_m("+(state.staticRenderFns.length-1)+(el.staticInFor?',true':'')+")";}// v-once
function genOnce(el,state){el.onceProcessed=true;if(el.if&&!el.ifProcessed){return genIf(el,state);}else if(el.staticInFor){var key='';var parent=el.parent;while(parent){if(parent.for){key=parent.key;break;}parent=parent.parent;}if(!key){process.env.NODE_ENV!=='production'&&state.warn("v-once can only be used inside v-for that is keyed. ");return genElement(el,state);}return"_o("+genElement(el,state)+","+state.onceId++ +","+key+")";}else{return genStatic(el,state);}}function genIf(el,state,altGen,altEmpty){el.ifProcessed=true;// avoid recursion
return genIfConditions(el.ifConditions.slice(),state,altGen,altEmpty);}function genIfConditions(conditions,state,altGen,altEmpty){if(!conditions.length){return altEmpty||'_e()';}var condition=conditions.shift();if(condition.exp){return"("+condition.exp+")?"+genTernaryExp(condition.block)+":"+genIfConditions(conditions,state,altGen,altEmpty);}else{return""+genTernaryExp(condition.block);}// v-if with v-once should generate code like (a)?_m(0):_m(1)
function genTernaryExp(el){return altGen?altGen(el,state):el.once?genOnce(el,state):genElement(el,state);}}function genFor(el,state,altGen,altHelper){var exp=el.for;var alias=el.alias;var iterator1=el.iterator1?","+el.iterator1:'';var iterator2=el.iterator2?","+el.iterator2:'';if(process.env.NODE_ENV!=='production'&&state.maybeComponent(el)&&el.tag!=='slot'&&el.tag!=='template'&&!el.key){state.warn("<"+el.tag+" v-for=\""+alias+" in "+exp+"\">: component lists rendered with "+"v-for should have explicit keys. "+"See https://vuejs.org/guide/list.html#key for more info.",true/* tip */);}el.forProcessed=true;// avoid recursion
return(altHelper||'_l')+"(("+exp+"),"+"function("+alias+iterator1+iterator2+"){"+"return "+(altGen||genElement)(el,state)+'})';}function genData$2(el,state){var data='{';// directives first.
// directives may mutate the el's other properties before they are generated.
var dirs=genDirectives(el,state);if(dirs){data+=dirs+',';}// key
if(el.key){data+="key:"+el.key+",";}// ref
if(el.ref){data+="ref:"+el.ref+",";}if(el.refInFor){data+="refInFor:true,";}// pre
if(el.pre){data+="pre:true,";}// record original tag name for components using "is" attribute
if(el.component){data+="tag:\""+el.tag+"\",";}// module data generation functions
for(var i=0;i<state.dataGenFns.length;i++){data+=state.dataGenFns[i](el);}// attributes
if(el.attrs){data+="attrs:{"+genProps(el.attrs)+"},";}// DOM props
if(el.props){data+="domProps:{"+genProps(el.props)+"},";}// event handlers
if(el.events){data+=genHandlers(el.events,false,state.warn)+",";}if(el.nativeEvents){data+=genHandlers(el.nativeEvents,true,state.warn)+",";}// slot target
// only for non-scoped slots
if(el.slotTarget&&!el.slotScope){data+="slot:"+el.slotTarget+",";}// scoped slots
if(el.scopedSlots){data+=genScopedSlots(el.scopedSlots,state)+",";}// component v-model
if(el.model){data+="model:{value:"+el.model.value+",callback:"+el.model.callback+",expression:"+el.model.expression+"},";}// inline-template
if(el.inlineTemplate){var inlineTemplate=genInlineTemplate(el,state);if(inlineTemplate){data+=inlineTemplate+",";}}data=data.replace(/,$/,'')+'}';// v-bind data wrap
if(el.wrapData){data=el.wrapData(data);}// v-on data wrap
if(el.wrapListeners){data=el.wrapListeners(data);}return data;}function genDirectives(el,state){var dirs=el.directives;if(!dirs){return;}var res='directives:[';var hasRuntime=false;var i,l,dir,needRuntime;for(i=0,l=dirs.length;i<l;i++){dir=dirs[i];needRuntime=true;var gen=state.directives[dir.name];if(gen){// compile-time directive that manipulates AST.
// returns true if it also needs a runtime counterpart.
needRuntime=!!gen(el,dir,state.warn);}if(needRuntime){hasRuntime=true;res+="{name:\""+dir.name+"\",rawName:\""+dir.rawName+"\""+(dir.value?",value:("+dir.value+"),expression:"+JSON.stringify(dir.value):'')+(dir.arg?",arg:\""+dir.arg+"\"":'')+(dir.modifiers?",modifiers:"+JSON.stringify(dir.modifiers):'')+"},";}}if(hasRuntime){return res.slice(0,-1)+']';}}function genInlineTemplate(el,state){var ast=el.children[0];if(process.env.NODE_ENV!=='production'&&(el.children.length!==1||ast.type!==1)){state.warn('Inline-template components must have exactly one child element.');}if(ast.type===1){var inlineRenderFns=generate(ast,state.options);return"inlineTemplate:{render:function(){"+inlineRenderFns.render+"},staticRenderFns:["+inlineRenderFns.staticRenderFns.map(function(code){return"function(){"+code+"}";}).join(',')+"]}";}}function genScopedSlots(slots,state){return"scopedSlots:_u(["+Object.keys(slots).map(function(key){return genScopedSlot(key,slots[key],state);}).join(',')+"])";}function genScopedSlot(key,el,state){if(el.for&&!el.forProcessed){return genForScopedSlot(key,el,state);}var fn="function("+String(el.slotScope)+"){"+"return "+(el.tag==='template'?el.if?el.if+"?"+(genChildren(el,state)||'undefined')+":undefined":genChildren(el,state)||'undefined':genElement(el,state))+"}";return"{key:"+key+",fn:"+fn+"}";}function genForScopedSlot(key,el,state){var exp=el.for;var alias=el.alias;var iterator1=el.iterator1?","+el.iterator1:'';var iterator2=el.iterator2?","+el.iterator2:'';el.forProcessed=true;// avoid recursion
return"_l(("+exp+"),"+"function("+alias+iterator1+iterator2+"){"+"return "+genScopedSlot(key,el,state)+'})';}function genChildren(el,state,checkSkip,altGenElement,altGenNode){var children=el.children;if(children.length){var el$1=children[0];// optimize single v-for
if(children.length===1&&el$1.for&&el$1.tag!=='template'&&el$1.tag!=='slot'){return(altGenElement||genElement)(el$1,state);}var normalizationType=checkSkip?getNormalizationType(children,state.maybeComponent):0;var gen=altGenNode||genNode;return"["+children.map(function(c){return gen(c,state);}).join(',')+"]"+(normalizationType?","+normalizationType:'');}}// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType(children,maybeComponent){var res=0;for(var i=0;i<children.length;i++){var el=children[i];if(el.type!==1){continue;}if(needsNormalization(el)||el.ifConditions&&el.ifConditions.some(function(c){return needsNormalization(c.block);})){res=2;break;}if(maybeComponent(el)||el.ifConditions&&el.ifConditions.some(function(c){return maybeComponent(c.block);})){res=1;}}return res;}function needsNormalization(el){return el.for!==undefined||el.tag==='template'||el.tag==='slot';}function genNode(node,state){if(node.type===1){return genElement(node,state);}if(node.type===3&&node.isComment){return genComment(node);}else{return genText(node);}}function genText(text){return"_v("+(text.type===2?text.expression// no need for () because already wrapped in _s()
:transformSpecialNewlines(JSON.stringify(text.text)))+")";}function genComment(comment){return"_e("+JSON.stringify(comment.text)+")";}function genSlot(el,state){var slotName=el.slotName||'"default"';var children=genChildren(el,state);var res="_t("+slotName+(children?","+children:'');var attrs=el.attrs&&"{"+el.attrs.map(function(a){return camelize(a.name)+":"+a.value;}).join(',')+"}";var bind$$1=el.attrsMap['v-bind'];if((attrs||bind$$1)&&!children){res+=",null";}if(attrs){res+=","+attrs;}if(bind$$1){res+=(attrs?'':',null')+","+bind$$1;}return res+')';}// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent(componentName,el,state){var children=el.inlineTemplate?null:genChildren(el,state,true);return"_c("+componentName+","+genData$2(el,state)+(children?","+children:'')+")";}function genProps(props){var res='';for(var i=0;i<props.length;i++){var prop=props[i];/* istanbul ignore if */{res+="\""+prop.name+"\":"+transformSpecialNewlines(prop.value)+",";}}return res.slice(0,-1);}// #3895, #4268
function transformSpecialNewlines(text){return text.replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');}/*  */// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE=new RegExp('\\b'+('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,'+'super,throw,while,yield,delete,export,import,return,switch,default,'+'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b')+'\\b');// these unary operators should not be used as property/method names
var unaryOperatorsRE=new RegExp('\\b'+'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b')+'\\s*\\([^\\)]*\\)');// strip strings in expressions
var stripStringRE=/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;// detect problematic expressions in a template
function detectErrors(ast){var errors=[];if(ast){checkNode(ast,errors);}return errors;}function checkNode(node,errors){if(node.type===1){for(var name in node.attrsMap){if(dirRE.test(name)){var value=node.attrsMap[name];if(value){if(name==='v-for'){checkFor(node,"v-for=\""+value+"\"",errors);}else if(onRE.test(name)){checkEvent(value,name+"=\""+value+"\"",errors);}else{checkExpression(value,name+"=\""+value+"\"",errors);}}}}if(node.children){for(var i=0;i<node.children.length;i++){checkNode(node.children[i],errors);}}}else if(node.type===2){checkExpression(node.expression,node.text,errors);}}function checkEvent(exp,text,errors){var stipped=exp.replace(stripStringRE,'');var keywordMatch=stipped.match(unaryOperatorsRE);if(keywordMatch&&stipped.charAt(keywordMatch.index-1)!=='$'){errors.push("avoid using JavaScript unary operator as property name: "+"\""+keywordMatch[0]+"\" in expression "+text.trim());}checkExpression(exp,text,errors);}function checkFor(node,text,errors){checkExpression(node.for||'',text,errors);checkIdentifier(node.alias,'v-for alias',text,errors);checkIdentifier(node.iterator1,'v-for iterator',text,errors);checkIdentifier(node.iterator2,'v-for iterator',text,errors);}function checkIdentifier(ident,type,text,errors){if(typeof ident==='string'){try{new Function("var "+ident+"=_");}catch(e){errors.push("invalid "+type+" \""+ident+"\" in expression: "+text.trim());}}}function checkExpression(exp,text,errors){try{new Function("return "+exp);}catch(e){var keywordMatch=exp.replace(stripStringRE,'').match(prohibitedKeywordRE);if(keywordMatch){errors.push("avoid using JavaScript keyword as property name: "+"\""+keywordMatch[0]+"\"\n  Raw expression: "+text.trim());}else{errors.push("invalid expression: "+e.message+" in\n\n"+"    "+exp+"\n\n"+"  Raw expression: "+text.trim()+"\n");}}}/*  */function createFunction(code,errors){try{return new Function(code);}catch(err){errors.push({err:err,code:code});return noop;}}function createCompileToFunctionFn(compile){var cache=Object.create(null);return function compileToFunctions(template,options,vm){options=extend({},options);var warn$$1=options.warn||warn;delete options.warn;/* istanbul ignore if */if(process.env.NODE_ENV!=='production'){// detect possible CSP restriction
try{new Function('return 1');}catch(e){if(e.toString().match(/unsafe-eval|CSP/)){warn$$1('It seems you are using the standalone build of Vue.js in an '+'environment with Content Security Policy that prohibits unsafe-eval. '+'The template compiler cannot work in this environment. Consider '+'relaxing the policy to allow unsafe-eval or pre-compiling your '+'templates into render functions.');}}}// check cache
var key=options.delimiters?String(options.delimiters)+template:template;if(cache[key]){return cache[key];}// compile
var compiled=compile(template,options);// check compilation errors/tips
if(process.env.NODE_ENV!=='production'){if(compiled.errors&&compiled.errors.length){warn$$1("Error compiling template:\n\n"+template+"\n\n"+compiled.errors.map(function(e){return"- "+e;}).join('\n')+'\n',vm);}if(compiled.tips&&compiled.tips.length){compiled.tips.forEach(function(msg){return tip(msg,vm);});}}// turn code into functions
var res={};var fnGenErrors=[];res.render=createFunction(compiled.render,fnGenErrors);res.staticRenderFns=compiled.staticRenderFns.map(function(code){return createFunction(code,fnGenErrors);});// check function generation errors.
// this should only happen if there is a bug in the compiler itself.
// mostly for codegen development use
/* istanbul ignore if */if(process.env.NODE_ENV!=='production'){if((!compiled.errors||!compiled.errors.length)&&fnGenErrors.length){warn$$1("Failed to generate render function:\n\n"+fnGenErrors.map(function(ref){var err=ref.err;var code=ref.code;return err.toString()+" in\n\n"+code+"\n";}).join('\n'),vm);}}return cache[key]=res;};}/*  */function createCompilerCreator(baseCompile){return function createCompiler(baseOptions){function compile(template,options){var finalOptions=Object.create(baseOptions);var errors=[];var tips=[];finalOptions.warn=function(msg,tip){(tip?tips:errors).push(msg);};if(options){// merge custom modules
if(options.modules){finalOptions.modules=(baseOptions.modules||[]).concat(options.modules);}// merge custom directives
if(options.directives){finalOptions.directives=extend(Object.create(baseOptions.directives||null),options.directives);}// copy other options
for(var key in options){if(key!=='modules'&&key!=='directives'){finalOptions[key]=options[key];}}}var compiled=baseCompile(template,finalOptions);if(process.env.NODE_ENV!=='production'){errors.push.apply(errors,detectErrors(compiled.ast));}compiled.errors=errors;compiled.tips=tips;return compiled;}return{compile:compile,compileToFunctions:createCompileToFunctionFn(compile)};};}/*  */// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler=createCompilerCreator(function baseCompile(template,options){var ast=parse(template.trim(),options);if(options.optimize!==false){optimize(ast,options);}var code=generate(ast,options);return{ast:ast,render:code.render,staticRenderFns:code.staticRenderFns};});/*  */var ref$1=createCompiler(baseOptions);var compileToFunctions=ref$1.compileToFunctions;/*  */// check whether current browser encodes a char inside attribute values
var div;function getShouldDecode(href){div=div||document.createElement('div');div.innerHTML=href?"<a href=\"\n\"/>":"<div a=\"\n\"/>";return div.innerHTML.indexOf('&#10;')>0;}// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines=inBrowser?getShouldDecode(false):false;// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref=inBrowser?getShouldDecode(true):false;/*  */var idToTemplate=cached(function(id){var el=query(id);return el&&el.innerHTML;});var mount=Vue$3.prototype.$mount;Vue$3.prototype.$mount=function(el,hydrating){el=el&&query(el);/* istanbul ignore if */if(el===document.body||el===document.documentElement){process.env.NODE_ENV!=='production'&&warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");return this;}var options=this.$options;// resolve template/el and convert to render function
if(!options.render){var template=options.template;if(template){if(typeof template==='string'){if(template.charAt(0)==='#'){template=idToTemplate(template);/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&!template){warn("Template element not found or is empty: "+options.template,this);}}}else if(template.nodeType){template=template.innerHTML;}else{if(process.env.NODE_ENV!=='production'){warn('invalid template option:'+template,this);}return this;}}else if(el){template=getOuterHTML(el);}if(template){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){mark('compile');}var ref=compileToFunctions(template,{shouldDecodeNewlines:shouldDecodeNewlines,shouldDecodeNewlinesForHref:shouldDecodeNewlinesForHref,delimiters:options.delimiters,comments:options.comments},this);var render=ref.render;var staticRenderFns=ref.staticRenderFns;options.render=render;options.staticRenderFns=staticRenderFns;/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&config.performance&&mark){mark('compile end');measure("vue "+this._name+" compile",'compile','compile end');}}}return mount.call(this,el,hydrating);};/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */function getOuterHTML(el){if(el.outerHTML){return el.outerHTML;}else{var container=document.createElement('div');container.appendChild(el.cloneNode(true));return container.innerHTML;}}Vue$3.compile=compileToFunctions;exports.default=Vue$3;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), __webpack_require__(12), __webpack_require__(22).setImmediate))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _defaults=__webpack_require__(13);exports.default={data:function data(){return{nodes:{},status:false};},props:['active'],// status watcher - change toggle element when status changes
watch:{active:function active(status){if(status!=null){this.status=status;}},status:function status(new_value,old_value){this.$emit('onStatusChange',{vm:this,status:new_value,old_status:old_value});if(this.$parent.onlyOneActive===false){(0,_defaults.toggleElement)(this.nodes.content,this.$options.$vc.settings);}else{if(new_value===true&&old_value===false){var active=this.$parent.$children.filter(function(el){return el.status===true;});if(active.length>1){active.forEach(function(el){el.close();(0,_defaults.closeElement)(el.nodes.content,this.$options.$vc.settings);}.bind(this));}(0,_defaults.openElement)(this.nodes.content,this.$options.$vc.settings);this.open();}else if(old_value===true&&new_value===false){(0,_defaults.closeElement)(this.nodes.content,this.$options.$vc.settings);this.close();}}}},// collapse basic instance methods
methods:{toggle:function toggle(){this.$emit('beforeToggle',this);this.status=!this.status;this.$emit('afterToggle',this);},close:function close(){this.$emit('beforeClose',this);this.status=false;this.$emit('afterClose',this);},open:function open(){this.$emit('beforeOpen',this);this.status=true;this.$emit('afterOpen',this);}},// mounting
mounted:function mounted(){var _this=this;this.nodes.toggle=this.$el.querySelector('.'+this.$options.$vc.settings.togglerClassDefault);this.nodes.content=this.$el.querySelector('.'+this.$options.$vc.settings.contentClassDefault);this.$emit('afterNodesBinding',{vm:this,nodes:this.nodes});if(this.nodes.toggle!==null){this.nodes.toggle.addEventListener('click',function(){_this.toggle();});}if(this.active!=null){this.status=this.active;}}};//
//
//
//
//
//

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _defaults=__webpack_require__(13);exports.default={data:function data(){return{};},props:{onlyOneActive:{default:false,type:Boolean}},// computed props for accessing elements
computed:{elements:function elements(){return this.$children;},elements_count:function elements_count(){return this.$children.length;},active_elements:function active_elements(){return this.$children.filter(function(el){return el.status===true;});}},methods:{closeAll:function closeAll(){this.$children.forEach(function(el){el.close();});},openAll:function openAll(){this.$children.forEach(function(el){el.open();});}}};//
//
//
//
//
//

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _vueEditorCommons=__webpack_require__(0);exports.default={props:['name','option','value','required-star'],components:{'component-checkbox':_vueEditorCommons.checkBoxComponent,'component-choice':_vueEditorCommons.choiceComponent,'component-integer':_vueEditorCommons.integerComponent,'component-number':_vueEditorCommons.numberComponent,'component-text':_vueEditorCommons.textComponent,'component-textarea':_vueEditorCommons.textareaComponent},methods:{updateParameter:function updateParameter(parameter){this.$emit('change',parameter);}}};//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _vueEditorCommons=__webpack_require__(0);exports.default={props:['header','body','footer'],data:function data(){return{showModal:false};},components:{'modal':_vueEditorCommons.modalComponent},methods:{openModal:function openModal(){this.showModal=true;},closeModal:function closeModal(){this.showModal=false;}}};//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var apply=Function.prototype.apply;// DOM APIs, for completeness
exports.setTimeout=function(){return new Timeout(apply.call(setTimeout,window,arguments),clearTimeout);};exports.setInterval=function(){return new Timeout(apply.call(setInterval,window,arguments),clearInterval);};exports.clearTimeout=exports.clearInterval=function(timeout){if(timeout){timeout.close();}};function Timeout(id,clearFn){this._id=id;this._clearFn=clearFn;}Timeout.prototype.unref=Timeout.prototype.ref=function(){};Timeout.prototype.close=function(){this._clearFn.call(window,this._id);};// Does not start the time, just sets up the members needed.
exports.enroll=function(item,msecs){clearTimeout(item._idleTimeoutId);item._idleTimeout=msecs;};exports.unenroll=function(item){clearTimeout(item._idleTimeoutId);item._idleTimeout=-1;};exports._unrefActive=exports.active=function(item){clearTimeout(item._idleTimeoutId);var msecs=item._idleTimeout;if(msecs>=0){item._idleTimeoutId=setTimeout(function onTimeout(){if(item._onTimeout)item._onTimeout();},msecs);}};// setimmediate attaches itself to the global object
__webpack_require__(23);// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate=typeof self!=="undefined"&&self.setImmediate||typeof global!=="undefined"&&global.setImmediate||undefined&&undefined.setImmediate;exports.clearImmediate=typeof self!=="undefined"&&self.clearImmediate||typeof global!=="undefined"&&global.clearImmediate||undefined&&undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {(function(global,undefined){"use strict";if(global.setImmediate){return;}var nextHandle=1;// Spec says greater than zero
var tasksByHandle={};var currentlyRunningATask=false;var doc=global.document;var registerImmediate;function setImmediate(callback){// Callback can either be a function or a string
if(typeof callback!=="function"){callback=new Function(""+callback);}// Copy function arguments
var args=new Array(arguments.length-1);for(var i=0;i<args.length;i++){args[i]=arguments[i+1];}// Store and register the task
var task={callback:callback,args:args};tasksByHandle[nextHandle]=task;registerImmediate(nextHandle);return nextHandle++;}function clearImmediate(handle){delete tasksByHandle[handle];}function run(task){var callback=task.callback;var args=task.args;switch(args.length){case 0:callback();break;case 1:callback(args[0]);break;case 2:callback(args[0],args[1]);break;case 3:callback(args[0],args[1],args[2]);break;default:callback.apply(undefined,args);break;}}function runIfPresent(handle){// From the spec: "Wait until any invocations of this algorithm started before this one have completed."
// So if we're currently running a task, we'll need to delay this invocation.
if(currentlyRunningATask){// Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
// "too much recursion" error.
setTimeout(runIfPresent,0,handle);}else{var task=tasksByHandle[handle];if(task){currentlyRunningATask=true;try{run(task);}finally{clearImmediate(handle);currentlyRunningATask=false;}}}}function installNextTickImplementation(){registerImmediate=function registerImmediate(handle){process.nextTick(function(){runIfPresent(handle);});};}function canUsePostMessage(){// The test against `importScripts` prevents this implementation from being installed inside a web worker,
// where `global.postMessage` means something completely different and can't be used for this purpose.
if(global.postMessage&&!global.importScripts){var postMessageIsAsynchronous=true;var oldOnMessage=global.onmessage;global.onmessage=function(){postMessageIsAsynchronous=false;};global.postMessage("","*");global.onmessage=oldOnMessage;return postMessageIsAsynchronous;}}function installPostMessageImplementation(){// Installs an event handler on `global` for the `message` event: see
// * https://developer.mozilla.org/en/DOM/window.postMessage
// * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
var messagePrefix="setImmediate$"+Math.random()+"$";var onGlobalMessage=function onGlobalMessage(event){if(event.source===global&&typeof event.data==="string"&&event.data.indexOf(messagePrefix)===0){runIfPresent(+event.data.slice(messagePrefix.length));}};if(global.addEventListener){global.addEventListener("message",onGlobalMessage,false);}else{global.attachEvent("onmessage",onGlobalMessage);}registerImmediate=function registerImmediate(handle){global.postMessage(messagePrefix+handle,"*");};}function installMessageChannelImplementation(){var channel=new MessageChannel();channel.port1.onmessage=function(event){var handle=event.data;runIfPresent(handle);};registerImmediate=function registerImmediate(handle){channel.port2.postMessage(handle);};}function installReadyStateChangeImplementation(){var html=doc.documentElement;registerImmediate=function registerImmediate(handle){// Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
// into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
var script=doc.createElement("script");script.onreadystatechange=function(){runIfPresent(handle);script.onreadystatechange=null;html.removeChild(script);script=null;};html.appendChild(script);};}function installSetTimeoutImplementation(){registerImmediate=function registerImmediate(handle){setTimeout(runIfPresent,0,handle);};}// If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
var attachTo=Object.getPrototypeOf&&Object.getPrototypeOf(global);attachTo=attachTo&&attachTo.setTimeout?attachTo:global;// Don't get fooled by e.g. browserify environments.
if({}.toString.call(global.process)==="[object process]"){// For Node.js before 0.9
installNextTickImplementation();}else if(canUsePostMessage()){// For non-IE10 modern browsers
installPostMessageImplementation();}else if(global.MessageChannel){// For web workers, where supported
installMessageChannelImplementation();}else if(doc&&"onreadystatechange"in doc.createElement("script")){// For IE 6–8
installReadyStateChangeImplementation();}else{// For older browsers
installSetTimeoutImplementation();}attachTo.setImmediate=setImmediate;attachTo.clearImmediate=clearImmediate;})(typeof self==="undefined"?typeof global==="undefined"?undefined:global:self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(11)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/**
 * vuex v2.5.0
 * (c) 2017 Evan You
 * @license MIT
 */var applyMixin=function applyMixin(Vue){var version=Number(Vue.version.split('.')[0]);if(version>=2){Vue.mixin({beforeCreate:vuexInit});}else{// override init and inject vuex init procedure
// for 1.x backwards compatibility.
var _init=Vue.prototype._init;Vue.prototype._init=function(options){if(options===void 0)options={};options.init=options.init?[vuexInit].concat(options.init):vuexInit;_init.call(this,options);};}/**
   * Vuex init hook, injected into each instances init hooks list.
   */function vuexInit(){var options=this.$options;// store injection
if(options.store){this.$store=typeof options.store==='function'?options.store():options.store;}else if(options.parent&&options.parent.$store){this.$store=options.parent.$store;}}};var devtoolHook=typeof window!=='undefined'&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function devtoolPlugin(store){if(!devtoolHook){return;}store._devtoolHook=devtoolHook;devtoolHook.emit('vuex:init',store);devtoolHook.on('vuex:travel-to-state',function(targetState){store.replaceState(targetState);});store.subscribe(function(mutation,state){devtoolHook.emit('vuex:mutation',mutation,state);});}/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 *//**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 *//**
 * forEach for object
 */function forEachValue(obj,fn){Object.keys(obj).forEach(function(key){return fn(obj[key],key);});}function isObject(obj){return obj!==null&&(typeof obj==='undefined'?'undefined':_typeof(obj))==='object';}function isPromise(val){return val&&typeof val.then==='function';}function assert(condition,msg){if(!condition){throw new Error("[vuex] "+msg);}}var Module=function Module(rawModule,runtime){this.runtime=runtime;this._children=Object.create(null);this._rawModule=rawModule;var rawState=rawModule.state;this.state=(typeof rawState==='function'?rawState():rawState)||{};};var prototypeAccessors$1={namespaced:{configurable:true}};prototypeAccessors$1.namespaced.get=function(){return!!this._rawModule.namespaced;};Module.prototype.addChild=function addChild(key,module){this._children[key]=module;};Module.prototype.removeChild=function removeChild(key){delete this._children[key];};Module.prototype.getChild=function getChild(key){return this._children[key];};Module.prototype.update=function update(rawModule){this._rawModule.namespaced=rawModule.namespaced;if(rawModule.actions){this._rawModule.actions=rawModule.actions;}if(rawModule.mutations){this._rawModule.mutations=rawModule.mutations;}if(rawModule.getters){this._rawModule.getters=rawModule.getters;}};Module.prototype.forEachChild=function forEachChild(fn){forEachValue(this._children,fn);};Module.prototype.forEachGetter=function forEachGetter(fn){if(this._rawModule.getters){forEachValue(this._rawModule.getters,fn);}};Module.prototype.forEachAction=function forEachAction(fn){if(this._rawModule.actions){forEachValue(this._rawModule.actions,fn);}};Module.prototype.forEachMutation=function forEachMutation(fn){if(this._rawModule.mutations){forEachValue(this._rawModule.mutations,fn);}};Object.defineProperties(Module.prototype,prototypeAccessors$1);var ModuleCollection=function ModuleCollection(rawRootModule){// register root module (Vuex.Store options)
this.register([],rawRootModule,false);};ModuleCollection.prototype.get=function get(path){return path.reduce(function(module,key){return module.getChild(key);},this.root);};ModuleCollection.prototype.getNamespace=function getNamespace(path){var module=this.root;return path.reduce(function(namespace,key){module=module.getChild(key);return namespace+(module.namespaced?key+'/':'');},'');};ModuleCollection.prototype.update=function update$1(rawRootModule){update([],this.root,rawRootModule);};ModuleCollection.prototype.register=function register(path,rawModule,runtime){var this$1=this;if(runtime===void 0)runtime=true;if(process.env.NODE_ENV!=='production'){assertRawModule(path,rawModule);}var newModule=new Module(rawModule,runtime);if(path.length===0){this.root=newModule;}else{var parent=this.get(path.slice(0,-1));parent.addChild(path[path.length-1],newModule);}// register nested modules
if(rawModule.modules){forEachValue(rawModule.modules,function(rawChildModule,key){this$1.register(path.concat(key),rawChildModule,runtime);});}};ModuleCollection.prototype.unregister=function unregister(path){var parent=this.get(path.slice(0,-1));var key=path[path.length-1];if(!parent.getChild(key).runtime){return;}parent.removeChild(key);};function update(path,targetModule,newModule){if(process.env.NODE_ENV!=='production'){assertRawModule(path,newModule);}// update target module
targetModule.update(newModule);// update nested modules
if(newModule.modules){for(var key in newModule.modules){if(!targetModule.getChild(key)){if(process.env.NODE_ENV!=='production'){console.warn("[vuex] trying to add a new module '"+key+"' on hot reloading, "+'manual reload is needed');}return;}update(path.concat(key),targetModule.getChild(key),newModule.modules[key]);}}}var functionAssert={assert:function assert(value){return typeof value==='function';},expected:'function'};var objectAssert={assert:function assert(value){return typeof value==='function'||(typeof value==='undefined'?'undefined':_typeof(value))==='object'&&typeof value.handler==='function';},expected:'function or object with "handler" function'};var assertTypes={getters:functionAssert,mutations:functionAssert,actions:objectAssert};function assertRawModule(path,rawModule){Object.keys(assertTypes).forEach(function(key){if(!rawModule[key]){return;}var assertOptions=assertTypes[key];forEachValue(rawModule[key],function(value,type){assert(assertOptions.assert(value),makeAssertionMessage(path,key,type,value,assertOptions.expected));});});}function makeAssertionMessage(path,key,type,value,expected){var buf=key+" should be "+expected+" but \""+key+"."+type+"\"";if(path.length>0){buf+=" in module \""+path.join('.')+"\"";}buf+=" is "+JSON.stringify(value)+".";return buf;}var Vue;// bind on install
var Store=function Store(options){var this$1=this;if(options===void 0)options={};// Auto install if it is not done yet and `window` has `Vue`.
// To allow users to avoid auto-installation in some cases,
// this code should be placed here. See #731
if(!Vue&&typeof window!=='undefined'&&window.Vue){install(window.Vue);}if(process.env.NODE_ENV!=='production'){assert(Vue,"must call Vue.use(Vuex) before creating a store instance.");assert(typeof Promise!=='undefined',"vuex requires a Promise polyfill in this browser.");assert(this instanceof Store,"Store must be called with the new operator.");}var plugins=options.plugins;if(plugins===void 0)plugins=[];var strict=options.strict;if(strict===void 0)strict=false;var state=options.state;if(state===void 0)state={};if(typeof state==='function'){state=state()||{};}// store internal state
this._committing=false;this._actions=Object.create(null);this._actionSubscribers=[];this._mutations=Object.create(null);this._wrappedGetters=Object.create(null);this._modules=new ModuleCollection(options);this._modulesNamespaceMap=Object.create(null);this._subscribers=[];this._watcherVM=new Vue();// bind commit and dispatch to self
var store=this;var ref=this;var dispatch=ref.dispatch;var commit=ref.commit;this.dispatch=function boundDispatch(type,payload){return dispatch.call(store,type,payload);};this.commit=function boundCommit(type,payload,options){return commit.call(store,type,payload,options);};// strict mode
this.strict=strict;// init root module.
// this also recursively registers all sub-modules
// and collects all module getters inside this._wrappedGetters
installModule(this,state,[],this._modules.root);// initialize the store vm, which is responsible for the reactivity
// (also registers _wrappedGetters as computed properties)
resetStoreVM(this,state);// apply plugins
plugins.forEach(function(plugin){return plugin(this$1);});if(Vue.config.devtools){devtoolPlugin(this);}};var prototypeAccessors={state:{configurable:true}};prototypeAccessors.state.get=function(){return this._vm._data.$$state;};prototypeAccessors.state.set=function(v){if(process.env.NODE_ENV!=='production'){assert(false,"Use store.replaceState() to explicit replace store state.");}};Store.prototype.commit=function commit(_type,_payload,_options){var this$1=this;// check object-style commit
var ref=unifyObjectStyle(_type,_payload,_options);var type=ref.type;var payload=ref.payload;var options=ref.options;var mutation={type:type,payload:payload};var entry=this._mutations[type];if(!entry){if(process.env.NODE_ENV!=='production'){console.error("[vuex] unknown mutation type: "+type);}return;}this._withCommit(function(){entry.forEach(function commitIterator(handler){handler(payload);});});this._subscribers.forEach(function(sub){return sub(mutation,this$1.state);});if(process.env.NODE_ENV!=='production'&&options&&options.silent){console.warn("[vuex] mutation type: "+type+". Silent option has been removed. "+'Use the filter functionality in the vue-devtools');}};Store.prototype.dispatch=function dispatch(_type,_payload){var this$1=this;// check object-style dispatch
var ref=unifyObjectStyle(_type,_payload);var type=ref.type;var payload=ref.payload;var action={type:type,payload:payload};var entry=this._actions[type];if(!entry){if(process.env.NODE_ENV!=='production'){console.error("[vuex] unknown action type: "+type);}return;}this._actionSubscribers.forEach(function(sub){return sub(action,this$1.state);});return entry.length>1?Promise.all(entry.map(function(handler){return handler(payload);})):entry[0](payload);};Store.prototype.subscribe=function subscribe(fn){return genericSubscribe(fn,this._subscribers);};Store.prototype.subscribeAction=function subscribeAction(fn){return genericSubscribe(fn,this._actionSubscribers);};Store.prototype.watch=function watch(getter,cb,options){var this$1=this;if(process.env.NODE_ENV!=='production'){assert(typeof getter==='function',"store.watch only accepts a function.");}return this._watcherVM.$watch(function(){return getter(this$1.state,this$1.getters);},cb,options);};Store.prototype.replaceState=function replaceState(state){var this$1=this;this._withCommit(function(){this$1._vm._data.$$state=state;});};Store.prototype.registerModule=function registerModule(path,rawModule,options){if(options===void 0)options={};if(typeof path==='string'){path=[path];}if(process.env.NODE_ENV!=='production'){assert(Array.isArray(path),"module path must be a string or an Array.");assert(path.length>0,'cannot register the root module by using registerModule.');}this._modules.register(path,rawModule);installModule(this,this.state,path,this._modules.get(path),options.preserveState);// reset store to update getters...
resetStoreVM(this,this.state);};Store.prototype.unregisterModule=function unregisterModule(path){var this$1=this;if(typeof path==='string'){path=[path];}if(process.env.NODE_ENV!=='production'){assert(Array.isArray(path),"module path must be a string or an Array.");}this._modules.unregister(path);this._withCommit(function(){var parentState=getNestedState(this$1.state,path.slice(0,-1));Vue.delete(parentState,path[path.length-1]);});resetStore(this);};Store.prototype.hotUpdate=function hotUpdate(newOptions){this._modules.update(newOptions);resetStore(this,true);};Store.prototype._withCommit=function _withCommit(fn){var committing=this._committing;this._committing=true;fn();this._committing=committing;};Object.defineProperties(Store.prototype,prototypeAccessors);function genericSubscribe(fn,subs){if(subs.indexOf(fn)<0){subs.push(fn);}return function(){var i=subs.indexOf(fn);if(i>-1){subs.splice(i,1);}};}function resetStore(store,hot){store._actions=Object.create(null);store._mutations=Object.create(null);store._wrappedGetters=Object.create(null);store._modulesNamespaceMap=Object.create(null);var state=store.state;// init all modules
installModule(store,state,[],store._modules.root,true);// reset vm
resetStoreVM(store,state,hot);}function resetStoreVM(store,state,hot){var oldVm=store._vm;// bind store public getters
store.getters={};var wrappedGetters=store._wrappedGetters;var computed={};forEachValue(wrappedGetters,function(fn,key){// use computed to leverage its lazy-caching mechanism
computed[key]=function(){return fn(store);};Object.defineProperty(store.getters,key,{get:function get(){return store._vm[key];},enumerable:true// for local getters
});});// use a Vue instance to store the state tree
// suppress warnings just in case the user has added
// some funky global mixins
var silent=Vue.config.silent;Vue.config.silent=true;store._vm=new Vue({data:{$$state:state},computed:computed});Vue.config.silent=silent;// enable strict mode for new vm
if(store.strict){enableStrictMode(store);}if(oldVm){if(hot){// dispatch changes in all subscribed watchers
// to force getter re-evaluation for hot reloading.
store._withCommit(function(){oldVm._data.$$state=null;});}Vue.nextTick(function(){return oldVm.$destroy();});}}function installModule(store,rootState,path,module,hot){var isRoot=!path.length;var namespace=store._modules.getNamespace(path);// register in namespace map
if(module.namespaced){store._modulesNamespaceMap[namespace]=module;}// set state
if(!isRoot&&!hot){var parentState=getNestedState(rootState,path.slice(0,-1));var moduleName=path[path.length-1];store._withCommit(function(){Vue.set(parentState,moduleName,module.state);});}var local=module.context=makeLocalContext(store,namespace,path);module.forEachMutation(function(mutation,key){var namespacedType=namespace+key;registerMutation(store,namespacedType,mutation,local);});module.forEachAction(function(action,key){var type=action.root?key:namespace+key;var handler=action.handler||action;registerAction(store,type,handler,local);});module.forEachGetter(function(getter,key){var namespacedType=namespace+key;registerGetter(store,namespacedType,getter,local);});module.forEachChild(function(child,key){installModule(store,rootState,path.concat(key),child,hot);});}/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */function makeLocalContext(store,namespace,path){var noNamespace=namespace==='';var local={dispatch:noNamespace?store.dispatch:function(_type,_payload,_options){var args=unifyObjectStyle(_type,_payload,_options);var payload=args.payload;var options=args.options;var type=args.type;if(!options||!options.root){type=namespace+type;if(process.env.NODE_ENV!=='production'&&!store._actions[type]){console.error("[vuex] unknown local action type: "+args.type+", global type: "+type);return;}}return store.dispatch(type,payload);},commit:noNamespace?store.commit:function(_type,_payload,_options){var args=unifyObjectStyle(_type,_payload,_options);var payload=args.payload;var options=args.options;var type=args.type;if(!options||!options.root){type=namespace+type;if(process.env.NODE_ENV!=='production'&&!store._mutations[type]){console.error("[vuex] unknown local mutation type: "+args.type+", global type: "+type);return;}}store.commit(type,payload,options);}};// getters and state object must be gotten lazily
// because they will be changed by vm update
Object.defineProperties(local,{getters:{get:noNamespace?function(){return store.getters;}:function(){return makeLocalGetters(store,namespace);}},state:{get:function get(){return getNestedState(store.state,path);}}});return local;}function makeLocalGetters(store,namespace){var gettersProxy={};var splitPos=namespace.length;Object.keys(store.getters).forEach(function(type){// skip if the target getter is not match this namespace
if(type.slice(0,splitPos)!==namespace){return;}// extract local getter type
var localType=type.slice(splitPos);// Add a port to the getters proxy.
// Define as getter property because
// we do not want to evaluate the getters in this time.
Object.defineProperty(gettersProxy,localType,{get:function get(){return store.getters[type];},enumerable:true});});return gettersProxy;}function registerMutation(store,type,handler,local){var entry=store._mutations[type]||(store._mutations[type]=[]);entry.push(function wrappedMutationHandler(payload){handler.call(store,local.state,payload);});}function registerAction(store,type,handler,local){var entry=store._actions[type]||(store._actions[type]=[]);entry.push(function wrappedActionHandler(payload,cb){var res=handler.call(store,{dispatch:local.dispatch,commit:local.commit,getters:local.getters,state:local.state,rootGetters:store.getters,rootState:store.state},payload,cb);if(!isPromise(res)){res=Promise.resolve(res);}if(store._devtoolHook){return res.catch(function(err){store._devtoolHook.emit('vuex:error',err);throw err;});}else{return res;}});}function registerGetter(store,type,rawGetter,local){if(store._wrappedGetters[type]){if(process.env.NODE_ENV!=='production'){console.error("[vuex] duplicate getter key: "+type);}return;}store._wrappedGetters[type]=function wrappedGetter(store){return rawGetter(local.state,// local state
local.getters,// local getters
store.state,// root state
store.getters// root getters
);};}function enableStrictMode(store){store._vm.$watch(function(){return this._data.$$state;},function(){if(process.env.NODE_ENV!=='production'){assert(store._committing,"Do not mutate vuex store state outside mutation handlers.");}},{deep:true,sync:true});}function getNestedState(state,path){return path.length?path.reduce(function(state,key){return state[key];},state):state;}function unifyObjectStyle(type,payload,options){if(isObject(type)&&type.type){options=payload;payload=type;type=type.type;}if(process.env.NODE_ENV!=='production'){assert(typeof type==='string',"Expects string as the type, but found "+(typeof type==='undefined'?'undefined':_typeof(type))+".");}return{type:type,payload:payload,options:options};}function install(_Vue){if(Vue&&_Vue===Vue){if(process.env.NODE_ENV!=='production'){console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');}return;}Vue=_Vue;applyMixin(Vue);}var mapState=normalizeNamespace(function(namespace,states){var res={};normalizeMap(states).forEach(function(ref){var key=ref.key;var val=ref.val;res[key]=function mappedState(){var state=this.$store.state;var getters=this.$store.getters;if(namespace){var module=getModuleByNamespace(this.$store,'mapState',namespace);if(!module){return;}state=module.context.state;getters=module.context.getters;}return typeof val==='function'?val.call(this,state,getters):state[val];};// mark vuex getter for devtools
res[key].vuex=true;});return res;});var mapMutations=normalizeNamespace(function(namespace,mutations){var res={};normalizeMap(mutations).forEach(function(ref){var key=ref.key;var val=ref.val;res[key]=function mappedMutation(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var commit=this.$store.commit;if(namespace){var module=getModuleByNamespace(this.$store,'mapMutations',namespace);if(!module){return;}commit=module.context.commit;}return typeof val==='function'?val.apply(this,[commit].concat(args)):commit.apply(this.$store,[val].concat(args));};});return res;});var mapGetters=normalizeNamespace(function(namespace,getters){var res={};normalizeMap(getters).forEach(function(ref){var key=ref.key;var val=ref.val;val=namespace+val;res[key]=function mappedGetter(){if(namespace&&!getModuleByNamespace(this.$store,'mapGetters',namespace)){return;}if(process.env.NODE_ENV!=='production'&&!(val in this.$store.getters)){console.error("[vuex] unknown getter: "+val);return;}return this.$store.getters[val];};// mark vuex getter for devtools
res[key].vuex=true;});return res;});var mapActions=normalizeNamespace(function(namespace,actions){var res={};normalizeMap(actions).forEach(function(ref){var key=ref.key;var val=ref.val;res[key]=function mappedAction(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var dispatch=this.$store.dispatch;if(namespace){var module=getModuleByNamespace(this.$store,'mapActions',namespace);if(!module){return;}dispatch=module.context.dispatch;}return typeof val==='function'?val.apply(this,[dispatch].concat(args)):dispatch.apply(this.$store,[val].concat(args));};});return res;});var createNamespacedHelpers=function createNamespacedHelpers(namespace){return{mapState:mapState.bind(null,namespace),mapGetters:mapGetters.bind(null,namespace),mapMutations:mapMutations.bind(null,namespace),mapActions:mapActions.bind(null,namespace)};};function normalizeMap(map){return Array.isArray(map)?map.map(function(key){return{key:key,val:key};}):Object.keys(map).map(function(key){return{key:key,val:map[key]};});}function normalizeNamespace(fn){return function(namespace,map){if(typeof namespace!=='string'){map=namespace;namespace='';}else if(namespace.charAt(namespace.length-1)!=='/'){namespace+='/';}return fn(namespace,map);};}function getModuleByNamespace(store,helper,namespace){var module=store._modulesNamespaceMap[namespace];if(process.env.NODE_ENV!=='production'&&!module){console.error("[vuex] module namespace not found in "+helper+"(): "+namespace);}return module;}var index_esm={Store:Store,install:install,version:'2.5.0',mapState:mapState,mapMutations:mapMutations,mapGetters:mapGetters,mapActions:mapActions,createNamespacedHelpers:createNamespacedHelpers};exports.Store=Store;exports.install=install;exports.mapState=mapState;exports.mapMutations=mapMutations;exports.mapGetters=mapGetters;exports.mapActions=mapActions;exports.createNamespacedHelpers=createNamespacedHelpers;exports.default=index_esm;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};/*!
 * vue-resource v1.5.0
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 *//**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */var RESOLVED=0;var REJECTED=1;var PENDING=2;function Promise$1(executor){this.state=PENDING;this.value=undefined;this.deferred=[];var promise=this;try{executor(function(x){promise.resolve(x);},function(r){promise.reject(r);});}catch(e){promise.reject(e);}}Promise$1.reject=function(r){return new Promise$1(function(resolve,reject){reject(r);});};Promise$1.resolve=function(x){return new Promise$1(function(resolve,reject){resolve(x);});};Promise$1.all=function all(iterable){return new Promise$1(function(resolve,reject){var count=0,result=[];if(iterable.length===0){resolve(result);}function resolver(i){return function(x){result[i]=x;count+=1;if(count===iterable.length){resolve(result);}};}for(var i=0;i<iterable.length;i+=1){Promise$1.resolve(iterable[i]).then(resolver(i),reject);}});};Promise$1.race=function race(iterable){return new Promise$1(function(resolve,reject){for(var i=0;i<iterable.length;i+=1){Promise$1.resolve(iterable[i]).then(resolve,reject);}});};var p=Promise$1.prototype;p.resolve=function resolve(x){var promise=this;if(promise.state===PENDING){if(x===promise){throw new TypeError('Promise settled with itself.');}var called=false;try{var then=x&&x['then'];if(x!==null&&(typeof x==='undefined'?'undefined':_typeof(x))==='object'&&typeof then==='function'){then.call(x,function(x){if(!called){promise.resolve(x);}called=true;},function(r){if(!called){promise.reject(r);}called=true;});return;}}catch(e){if(!called){promise.reject(e);}return;}promise.state=RESOLVED;promise.value=x;promise.notify();}};p.reject=function reject(reason){var promise=this;if(promise.state===PENDING){if(reason===promise){throw new TypeError('Promise settled with itself.');}promise.state=REJECTED;promise.value=reason;promise.notify();}};p.notify=function notify(){var promise=this;nextTick(function(){if(promise.state!==PENDING){while(promise.deferred.length){var deferred=promise.deferred.shift(),onResolved=deferred[0],onRejected=deferred[1],resolve=deferred[2],reject=deferred[3];try{if(promise.state===RESOLVED){if(typeof onResolved==='function'){resolve(onResolved.call(undefined,promise.value));}else{resolve(promise.value);}}else if(promise.state===REJECTED){if(typeof onRejected==='function'){resolve(onRejected.call(undefined,promise.value));}else{reject(promise.value);}}}catch(e){reject(e);}}}});};p.then=function then(onResolved,onRejected){var promise=this;return new Promise$1(function(resolve,reject){promise.deferred.push([onResolved,onRejected,resolve,reject]);promise.notify();});};p.catch=function(onRejected){return this.then(undefined,onRejected);};/**
 * Promise adapter.
 */if(typeof Promise==='undefined'){window.Promise=Promise$1;}function PromiseObj(executor,context){if(executor instanceof Promise){this.promise=executor;}else{this.promise=new Promise(executor.bind(context));}this.context=context;}PromiseObj.all=function(iterable,context){return new PromiseObj(Promise.all(iterable),context);};PromiseObj.resolve=function(value,context){return new PromiseObj(Promise.resolve(value),context);};PromiseObj.reject=function(reason,context){return new PromiseObj(Promise.reject(reason),context);};PromiseObj.race=function(iterable,context){return new PromiseObj(Promise.race(iterable),context);};var p$1=PromiseObj.prototype;p$1.bind=function(context){this.context=context;return this;};p$1.then=function(fulfilled,rejected){if(fulfilled&&fulfilled.bind&&this.context){fulfilled=fulfilled.bind(this.context);}if(rejected&&rejected.bind&&this.context){rejected=rejected.bind(this.context);}return new PromiseObj(this.promise.then(fulfilled,rejected),this.context);};p$1.catch=function(rejected){if(rejected&&rejected.bind&&this.context){rejected=rejected.bind(this.context);}return new PromiseObj(this.promise.catch(rejected),this.context);};p$1.finally=function(callback){return this.then(function(value){callback.call(this);return value;},function(reason){callback.call(this);return Promise.reject(reason);});};/**
 * Utility functions.
 */var ref={};var hasOwnProperty=ref.hasOwnProperty;var ref$1=[];var slice=ref$1.slice;var debug=false,ntick;var inBrowser=typeof window!=='undefined';function Util(ref){var config=ref.config;var nextTick=ref.nextTick;ntick=nextTick;debug=config.debug||!config.silent;}function warn(msg){if(typeof console!=='undefined'&&debug){console.warn('[VueResource warn]: '+msg);}}function error(msg){if(typeof console!=='undefined'){console.error(msg);}}function nextTick(cb,ctx){return ntick(cb,ctx);}function trim(str){return str?str.replace(/^\s*|\s*$/g,''):'';}function trimEnd(str,chars){if(str&&chars===undefined){return str.replace(/\s+$/,'');}if(!str||!chars){return str;}return str.replace(new RegExp("["+chars+"]+$"),'');}function toLower(str){return str?str.toLowerCase():'';}function toUpper(str){return str?str.toUpperCase():'';}var isArray=Array.isArray;function isString(val){return typeof val==='string';}function isFunction(val){return typeof val==='function';}function isObject(obj){return obj!==null&&(typeof obj==='undefined'?'undefined':_typeof(obj))==='object';}function isPlainObject(obj){return isObject(obj)&&Object.getPrototypeOf(obj)==Object.prototype;}function isBlob(obj){return typeof Blob!=='undefined'&&obj instanceof Blob;}function isFormData(obj){return typeof FormData!=='undefined'&&obj instanceof FormData;}function when(value,fulfilled,rejected){var promise=PromiseObj.resolve(value);if(arguments.length<2){return promise;}return promise.then(fulfilled,rejected);}function options(fn,obj,opts){opts=opts||{};if(isFunction(opts)){opts=opts.call(obj);}return merge(fn.bind({$vm:obj,$options:opts}),fn,{$options:opts});}function each(obj,iterator){var i,key;if(isArray(obj)){for(i=0;i<obj.length;i++){iterator.call(obj[i],obj[i],i);}}else if(isObject(obj)){for(key in obj){if(hasOwnProperty.call(obj,key)){iterator.call(obj[key],obj[key],key);}}}return obj;}var assign=Object.assign||_assign;function merge(target){var args=slice.call(arguments,1);args.forEach(function(source){_merge(target,source,true);});return target;}function defaults(target){var args=slice.call(arguments,1);args.forEach(function(source){for(var key in source){if(target[key]===undefined){target[key]=source[key];}}});return target;}function _assign(target){var args=slice.call(arguments,1);args.forEach(function(source){_merge(target,source);});return target;}function _merge(target,source,deep){for(var key in source){if(deep&&(isPlainObject(source[key])||isArray(source[key]))){if(isPlainObject(source[key])&&!isPlainObject(target[key])){target[key]={};}if(isArray(source[key])&&!isArray(target[key])){target[key]=[];}_merge(target[key],source[key],deep);}else if(source[key]!==undefined){target[key]=source[key];}}}/**
 * Root Prefix Transform.
 */function root(options$$1,next){var url=next(options$$1);if(isString(options$$1.root)&&!/^(https?:)?\//.test(url)){url=trimEnd(options$$1.root,'/')+'/'+url;}return url;}/**
 * Query Parameter Transform.
 */function query(options$$1,next){var urlParams=Object.keys(Url.options.params),query={},url=next(options$$1);each(options$$1.params,function(value,key){if(urlParams.indexOf(key)===-1){query[key]=value;}});query=Url.params(query);if(query){url+=(url.indexOf('?')==-1?'?':'&')+query;}return url;}/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */function expand(url,params,variables){var tmpl=parse(url),expanded=tmpl.expand(params);if(variables){variables.push.apply(variables,tmpl.vars);}return expanded;}function parse(template){var operators=['+','#','.','/',';','?','&'],variables=[];return{vars:variables,expand:function expand(context){return template.replace(/\{([^{}]+)\}|([^{}]+)/g,function(_,expression,literal){if(expression){var operator=null,values=[];if(operators.indexOf(expression.charAt(0))!==-1){operator=expression.charAt(0);expression=expression.substr(1);}expression.split(/,/g).forEach(function(variable){var tmp=/([^:*]*)(?::(\d+)|(\*))?/.exec(variable);values.push.apply(values,getValues(context,operator,tmp[1],tmp[2]||tmp[3]));variables.push(tmp[1]);});if(operator&&operator!=='+'){var separator=',';if(operator==='?'){separator='&';}else if(operator!=='#'){separator=operator;}return(values.length!==0?operator:'')+values.join(separator);}else{return values.join(',');}}else{return encodeReserved(literal);}});}};}function getValues(context,operator,key,modifier){var value=context[key],result=[];if(isDefined(value)&&value!==''){if(typeof value==='string'||typeof value==='number'||typeof value==='boolean'){value=value.toString();if(modifier&&modifier!=='*'){value=value.substring(0,parseInt(modifier,10));}result.push(encodeValue(operator,value,isKeyOperator(operator)?key:null));}else{if(modifier==='*'){if(Array.isArray(value)){value.filter(isDefined).forEach(function(value){result.push(encodeValue(operator,value,isKeyOperator(operator)?key:null));});}else{Object.keys(value).forEach(function(k){if(isDefined(value[k])){result.push(encodeValue(operator,value[k],k));}});}}else{var tmp=[];if(Array.isArray(value)){value.filter(isDefined).forEach(function(value){tmp.push(encodeValue(operator,value));});}else{Object.keys(value).forEach(function(k){if(isDefined(value[k])){tmp.push(encodeURIComponent(k));tmp.push(encodeValue(operator,value[k].toString()));}});}if(isKeyOperator(operator)){result.push(encodeURIComponent(key)+'='+tmp.join(','));}else if(tmp.length!==0){result.push(tmp.join(','));}}}}else{if(operator===';'){result.push(encodeURIComponent(key));}else if(value===''&&(operator==='&'||operator==='?')){result.push(encodeURIComponent(key)+'=');}else if(value===''){result.push('');}}return result;}function isDefined(value){return value!==undefined&&value!==null;}function isKeyOperator(operator){return operator===';'||operator==='&'||operator==='?';}function encodeValue(operator,value,key){value=operator==='+'||operator==='#'?encodeReserved(value):encodeURIComponent(value);if(key){return encodeURIComponent(key)+'='+value;}else{return value;}}function encodeReserved(str){return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part){if(!/%[0-9A-Fa-f]/.test(part)){part=encodeURI(part);}return part;}).join('');}/**
 * URL Template (RFC 6570) Transform.
 */function template(options){var variables=[],url=expand(options.url,options.params,variables);variables.forEach(function(key){delete options.params[key];});return url;}/**
 * Service for URL templating.
 */function Url(url,params){var self=this||{},options$$1=url,transform;if(isString(url)){options$$1={url:url,params:params};}options$$1=merge({},Url.options,self.$options,options$$1);Url.transforms.forEach(function(handler){if(isString(handler)){handler=Url.transform[handler];}if(isFunction(handler)){transform=factory(handler,transform,self.$vm);}});return transform(options$$1);}/**
 * Url options.
 */Url.options={url:'',root:null,params:{}};/**
 * Url transforms.
 */Url.transform={template:template,query:query,root:root};Url.transforms=['template','query','root'];/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */Url.params=function(obj){var params=[],escape=encodeURIComponent;params.add=function(key,value){if(isFunction(value)){value=value();}if(value===null){value='';}this.push(escape(key)+'='+escape(value));};serialize(params,obj);return params.join('&').replace(/%20/g,'+');};/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */Url.parse=function(url){var el=document.createElement('a');if(document.documentMode){el.href=url;url=el.href;}el.href=url;return{href:el.href,protocol:el.protocol?el.protocol.replace(/:$/,''):'',port:el.port,host:el.host,hostname:el.hostname,pathname:el.pathname.charAt(0)==='/'?el.pathname:'/'+el.pathname,search:el.search?el.search.replace(/^\?/,''):'',hash:el.hash?el.hash.replace(/^#/,''):''};};function factory(handler,next,vm){return function(options$$1){return handler.call(vm,options$$1,next);};}function serialize(params,obj,scope){var array=isArray(obj),plain=isPlainObject(obj),hash;each(obj,function(value,key){hash=isObject(value)||isArray(value);if(scope){key=scope+'['+(plain||hash?key:'')+']';}if(!scope&&array){params.add(value.name,value.value);}else if(hash){serialize(params,value,key);}else{params.add(key,value);}});}/**
 * XDomain client (Internet Explorer).
 */function xdrClient(request){return new PromiseObj(function(resolve){var xdr=new XDomainRequest(),handler=function handler(ref){var type=ref.type;var status=0;if(type==='load'){status=200;}else if(type==='error'){status=500;}resolve(request.respondWith(xdr.responseText,{status:status}));};request.abort=function(){return xdr.abort();};xdr.open(request.method,request.getUrl());if(request.timeout){xdr.timeout=request.timeout;}xdr.onload=handler;xdr.onabort=handler;xdr.onerror=handler;xdr.ontimeout=handler;xdr.onprogress=function(){};xdr.send(request.getBody());});}/**
 * CORS Interceptor.
 */var SUPPORTS_CORS=inBrowser&&'withCredentials'in new XMLHttpRequest();function cors(request){if(inBrowser){var orgUrl=Url.parse(location.href);var reqUrl=Url.parse(request.getUrl());if(reqUrl.protocol!==orgUrl.protocol||reqUrl.host!==orgUrl.host){request.crossOrigin=true;request.emulateHTTP=false;if(!SUPPORTS_CORS){request.client=xdrClient;}}}}/**
 * Form data Interceptor.
 */function form(request){if(isFormData(request.body)){request.headers.delete('Content-Type');}else if(isObject(request.body)&&request.emulateJSON){request.body=Url.params(request.body);request.headers.set('Content-Type','application/x-www-form-urlencoded');}}/**
 * JSON Interceptor.
 */function json(request){var type=request.headers.get('Content-Type')||'';if(isObject(request.body)&&type.indexOf('application/json')===0){request.body=JSON.stringify(request.body);}return function(response){return response.bodyText?when(response.text(),function(text){var type=response.headers.get('Content-Type')||'';if(type.indexOf('application/json')===0||isJson(text)){try{response.body=JSON.parse(text);}catch(e){response.body=null;}}else{response.body=text;}return response;}):response;};}function isJson(str){var start=str.match(/^\s*(\[|\{)/);var end={'[':/]\s*$/,'{':/}\s*$/};return start&&end[start[1]].test(str);}/**
 * JSONP client (Browser).
 */function jsonpClient(request){return new PromiseObj(function(resolve){var name=request.jsonp||'callback',callback=request.jsonpCallback||'_jsonp'+Math.random().toString(36).substr(2),body=null,handler,script;handler=function handler(ref){var type=ref.type;var status=0;if(type==='load'&&body!==null){status=200;}else if(type==='error'){status=500;}if(status&&window[callback]){delete window[callback];document.body.removeChild(script);}resolve(request.respondWith(body,{status:status}));};window[callback]=function(result){body=JSON.stringify(result);};request.abort=function(){handler({type:'abort'});};request.params[name]=callback;if(request.timeout){setTimeout(request.abort,request.timeout);}script=document.createElement('script');script.src=request.getUrl();script.type='text/javascript';script.async=true;script.onload=handler;script.onerror=handler;document.body.appendChild(script);});}/**
 * JSONP Interceptor.
 */function jsonp(request){if(request.method=='JSONP'){request.client=jsonpClient;}}/**
 * Before Interceptor.
 */function before(request){if(isFunction(request.before)){request.before.call(this,request);}}/**
 * HTTP method override Interceptor.
 */function method(request){if(request.emulateHTTP&&/^(PUT|PATCH|DELETE)$/i.test(request.method)){request.headers.set('X-HTTP-Method-Override',request.method);request.method='POST';}}/**
 * Header Interceptor.
 */function header(request){var headers=assign({},Http.headers.common,!request.crossOrigin?Http.headers.custom:{},Http.headers[toLower(request.method)]);each(headers,function(value,name){if(!request.headers.has(name)){request.headers.set(name,value);}});}/**
 * XMLHttp client (Browser).
 */function xhrClient(request){return new PromiseObj(function(resolve){var xhr=new XMLHttpRequest(),handler=function handler(event){var response=request.respondWith('response'in xhr?xhr.response:xhr.responseText,{status:xhr.status===1223?204:xhr.status,// IE9 status bug
statusText:xhr.status===1223?'No Content':trim(xhr.statusText)});each(trim(xhr.getAllResponseHeaders()).split('\n'),function(row){response.headers.append(row.slice(0,row.indexOf(':')),row.slice(row.indexOf(':')+1));});resolve(response);};request.abort=function(){return xhr.abort();};xhr.open(request.method,request.getUrl(),true);if(request.timeout){xhr.timeout=request.timeout;}if(request.responseType&&'responseType'in xhr){xhr.responseType=request.responseType;}if(request.withCredentials||request.credentials){xhr.withCredentials=true;}if(!request.crossOrigin){request.headers.set('X-Requested-With','XMLHttpRequest');}// deprecated use downloadProgress
if(isFunction(request.progress)&&request.method==='GET'){xhr.addEventListener('progress',request.progress);}if(isFunction(request.downloadProgress)){xhr.addEventListener('progress',request.downloadProgress);}// deprecated use uploadProgress
if(isFunction(request.progress)&&/^(POST|PUT)$/i.test(request.method)){xhr.upload.addEventListener('progress',request.progress);}if(isFunction(request.uploadProgress)&&xhr.upload){xhr.upload.addEventListener('progress',request.uploadProgress);}request.headers.forEach(function(value,name){xhr.setRequestHeader(name,value);});xhr.onload=handler;xhr.onabort=handler;xhr.onerror=handler;xhr.ontimeout=handler;xhr.send(request.getBody());});}/**
 * Http client (Node).
 */function nodeClient(request){var client=__webpack_require__(26);return new PromiseObj(function(resolve){var url=request.getUrl();var body=request.getBody();var method=request.method;var headers={},handler;request.headers.forEach(function(value,name){headers[name]=value;});client(url,{body:body,method:method,headers:headers}).then(handler=function handler(resp){var response=request.respondWith(resp.body,{status:resp.statusCode,statusText:trim(resp.statusMessage)});each(resp.headers,function(value,name){response.headers.set(name,value);});resolve(response);},function(error$$1){return handler(error$$1.response);});});}/**
 * Base client.
 */function Client(context){var reqHandlers=[sendRequest],resHandlers=[];if(!isObject(context)){context=null;}function Client(request){while(reqHandlers.length){var handler=reqHandlers.pop();if(isFunction(handler)){var response=void 0,next=void 0;response=handler.call(context,request,function(val){return next=val;})||next;if(isObject(response)){return new PromiseObj(function(resolve,reject){resHandlers.forEach(function(handler){response=when(response,function(response){return handler.call(context,response)||response;},reject);});when(response,resolve,reject);},context);}if(isFunction(response)){resHandlers.unshift(response);}}else{warn("Invalid interceptor of type "+(typeof handler==='undefined'?'undefined':_typeof(handler))+", must be a function");}}}Client.use=function(handler){reqHandlers.push(handler);};return Client;}function sendRequest(request){var client=request.client||(inBrowser?xhrClient:nodeClient);return client(request);}/**
 * HTTP Headers.
 */var Headers=function Headers(headers){var this$1=this;this.map={};each(headers,function(value,name){return this$1.append(name,value);});};Headers.prototype.has=function has(name){return getName(this.map,name)!==null;};Headers.prototype.get=function get(name){var list=this.map[getName(this.map,name)];return list?list.join():null;};Headers.prototype.getAll=function getAll(name){return this.map[getName(this.map,name)]||[];};Headers.prototype.set=function set(name,value){this.map[normalizeName(getName(this.map,name)||name)]=[trim(value)];};Headers.prototype.append=function append(name,value){var list=this.map[getName(this.map,name)];if(list){list.push(trim(value));}else{this.set(name,value);}};Headers.prototype.delete=function delete$1(name){delete this.map[getName(this.map,name)];};Headers.prototype.deleteAll=function deleteAll(){this.map={};};Headers.prototype.forEach=function forEach(callback,thisArg){var this$1=this;each(this.map,function(list,name){each(list,function(value){return callback.call(thisArg,value,name,this$1);});});};function getName(map,name){return Object.keys(map).reduce(function(prev,curr){return toLower(name)===toLower(curr)?curr:prev;},null);}function normalizeName(name){if(/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)){throw new TypeError('Invalid character in header field name');}return trim(name);}/**
 * HTTP Response.
 */var Response=function Response(body,ref){var url=ref.url;var headers=ref.headers;var status=ref.status;var statusText=ref.statusText;this.url=url;this.ok=status>=200&&status<300;this.status=status||0;this.statusText=statusText||'';this.headers=new Headers(headers);this.body=body;if(isString(body)){this.bodyText=body;}else if(isBlob(body)){this.bodyBlob=body;if(isBlobText(body)){this.bodyText=blobText(body);}}};Response.prototype.blob=function blob(){return when(this.bodyBlob);};Response.prototype.text=function text(){return when(this.bodyText);};Response.prototype.json=function json(){return when(this.text(),function(text){return JSON.parse(text);});};Object.defineProperty(Response.prototype,'data',{get:function get(){return this.body;},set:function set(body){this.body=body;}});function blobText(body){return new PromiseObj(function(resolve){var reader=new FileReader();reader.readAsText(body);reader.onload=function(){resolve(reader.result);};});}function isBlobText(body){return body.type.indexOf('text')===0||body.type.indexOf('json')!==-1;}/**
 * HTTP Request.
 */var Request=function Request(options$$1){this.body=null;this.params={};assign(this,options$$1,{method:toUpper(options$$1.method||'GET')});if(!(this.headers instanceof Headers)){this.headers=new Headers(this.headers);}};Request.prototype.getUrl=function getUrl(){return Url(this);};Request.prototype.getBody=function getBody(){return this.body;};Request.prototype.respondWith=function respondWith(body,options$$1){return new Response(body,assign(options$$1||{},{url:this.getUrl()}));};/**
 * Service for sending network requests.
 */var COMMON_HEADERS={'Accept':'application/json, text/plain, */*'};var JSON_CONTENT_TYPE={'Content-Type':'application/json;charset=utf-8'};function Http(options$$1){var self=this||{},client=Client(self.$vm);defaults(options$$1||{},self.$options,Http.options);Http.interceptors.forEach(function(handler){if(isString(handler)){handler=Http.interceptor[handler];}if(isFunction(handler)){client.use(handler);}});return client(new Request(options$$1)).then(function(response){return response.ok?response:PromiseObj.reject(response);},function(response){if(response instanceof Error){error(response);}return PromiseObj.reject(response);});}Http.options={};Http.headers={put:JSON_CONTENT_TYPE,post:JSON_CONTENT_TYPE,patch:JSON_CONTENT_TYPE,delete:JSON_CONTENT_TYPE,common:COMMON_HEADERS,custom:{}};Http.interceptor={before:before,method:method,jsonp:jsonp,json:json,form:form,header:header,cors:cors};Http.interceptors=['before','method','jsonp','json','form','header','cors'];['get','delete','head','jsonp'].forEach(function(method$$1){Http[method$$1]=function(url,options$$1){return this(assign(options$$1||{},{url:url,method:method$$1}));};});['post','put','patch'].forEach(function(method$$1){Http[method$$1]=function(url,body,options$$1){return this(assign(options$$1||{},{url:url,method:method$$1,body:body}));};});/**
 * Service for interacting with RESTful services.
 */function Resource(url,params,actions,options$$1){var self=this||{},resource={};actions=assign({},Resource.actions,actions);each(actions,function(action,name){action=merge({url:url,params:assign({},params)},options$$1,action);resource[name]=function(){return(self.$http||Http)(opts(action,arguments));};});return resource;}function opts(action,args){var options$$1=assign({},action),params={},body;switch(args.length){case 2:params=args[0];body=args[1];break;case 1:if(/^(POST|PUT|PATCH)$/i.test(options$$1.method)){body=args[0];}else{params=args[0];}break;case 0:break;default:throw'Expected up to 2 arguments [params, body], got '+args.length+' arguments';}options$$1.body=body;options$$1.params=assign({},options$$1.params,params);return options$$1;}Resource.actions={get:{method:'GET'},save:{method:'POST'},query:{method:'GET'},update:{method:'PUT'},remove:{method:'DELETE'},delete:{method:'DELETE'}};/**
 * Install plugin.
 */function plugin(Vue){if(plugin.installed){return;}Util(Vue);Vue.url=Url;Vue.http=Http;Vue.resource=Resource;Vue.Promise=PromiseObj;Object.defineProperties(Vue.prototype,{$url:{get:function get(){return options(Vue.url,this,this.$options.url);}},$http:{get:function get(){return options(Vue.http,this,this.$options.http);}},$resource:{get:function get(){return Vue.resource.bind(this);}},$promise:{get:function get(){var this$1=this;return function(executor){return new Vue.Promise(executor,this$1);};}}});}if(typeof window!=='undefined'&&window.Vue){window.Vue.use(plugin);}exports.default=plugin;exports.Url=Url;exports.Http=Http;exports.Resource=Resource;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _wrapper=__webpack_require__(28);var _wrapper2=_interopRequireDefault(_wrapper);var _group=__webpack_require__(33);var _group2=_interopRequireDefault(_group);var _defaults=__webpack_require__(13);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var VueCollapse={};VueCollapse.install=function(Vue,options){// merge configs
var settings=Object.assign(_defaults.defaults,options);// creating required components
Vue.component(settings.prefix+'-wrapper',_wrapper2.default);Vue.component(settings.prefix+'-group',_group2.default);// creates instance of settings in the Vue
Vue.mixin({created:function created(){this.$options.$vc={settings:settings};}});// content directive
Vue.directive(settings.basename+'-content',{// assigning css classes from settings
bind:function bind(el,binding,vnode,oldVnode){vnode.elm.classList.add(vnode.context.$options.$vc.settings.contentClassDefault);}});// toggler directive
Vue.directive(settings.basename+'-toggle',{// adding toggle class
bind:function bind(el,binding,vnode,oldVnode){vnode.elm.classList.add(vnode.context.$options.$vc.settings.togglerClassDefault);},// Creating custom toggler handler
inserted:function inserted(el,binding,vnode,oldVnode){if(binding.value!=null){vnode.elm.addEventListener('click',function(){vnode.context.$refs[binding.value].status=!vnode.context.$refs[binding.value].status;}.bind(this));}}});};if(typeof window!=='undefined'&&window.Vue){window.Vue.use(VueCollapse);}exports.default=VueCollapse;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_wrapper_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_wrapper_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_wrapper_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_wrapper_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_wrapper_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_6987e66d_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_wrapper_vue__ = __webpack_require__(32);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(29)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_wrapper_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_6987e66d_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_wrapper_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules/vue2-collapse/src/components/wrapper.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6987e66d", Component.options)
  } else {
    hotAPI.reload("data-v-6987e66d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("273a4a12", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6987e66d\",\"scoped\":false,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./wrapper.vue", function() {
     var newContent = require("!!../../../css-loader/index.js?sourceMap!../../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6987e66d\",\"scoped\":false,\"hasInlineConfig\":false}!../../../vue-loader/lib/selector.js?type=styles&index=0!./wrapper.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(true);
// imports


// module
exports.push([module.i, "\n.v-collapse-content{\n    max-height: 0;\n    transition: max-height 0.3s ease-out;\n    overflow: hidden;\n    padding: 0;\n}\n.v-collapse-content-end{\n    transition: max-height 0.3s ease-in;\n    max-height: 500px;\n}\n", "", {"version":3,"sources":["/usr/src/app/node_modules/vue2-collapse/src/components/node_modules/vue2-collapse/src/components/wrapper.vue"],"names":[],"mappings":";AA4FA;IACA,cAAA;IACA,qCAAA;IACA,iBAAA;IACA,WAAA;CACA;AAEA;IACA,oCAAA;IACA,kBAAA;CACA","file":"wrapper.vue","sourcesContent":["<template>\n    <div :class=\"'vc-' + $options.$vc.settings.basename\">\n        <slot></slot>\n    </div>\n</template>\n\n<script>\n    import {defaults, toggleElement, closeElement, openElement} from './../defaults'\n\n    export default {\n        data: function () {\n            return {\n                nodes: {},\n                status: false,\n            }\n        },\n        \n        props: ['active'],\n\n        // status watcher - change toggle element when status changes\n        watch: {\n                active: function(status){\n                      if ( status != null ) {\n                        this.status = status;\n                    }\n                },\n\n                status: function (new_value, old_value) {\n                    this.$emit('onStatusChange', {vm: this, status: new_value, old_status: old_value});\n                    if (this.$parent.onlyOneActive === false) {\n                        toggleElement(this.nodes.content, this.$options.$vc.settings);\n                    } else {\n                        if (new_value === true && old_value === false) {\n                            let active = this.$parent.$children.filter(function (el) {\n                                return el.status === true;\n                            });\n                            if (active.length > 1) {\n                                active.forEach(function (el) {\n                                    el.close();\n                                    closeElement(el.nodes.content, this.$options.$vc.settings);\n                                }.bind(this))\n                            }\n                            openElement(this.nodes.content, this.$options.$vc.settings);\n                            this.open();\n                        } else if (old_value === true && new_value === false) {\n                            closeElement(this.nodes.content, this.$options.$vc.settings);\n                            this.close();\n                        }\n                    }\n\n                }\n        },\n\n        // collapse basic instance methods\n\n        methods: {\n            toggle: function () {\n                this.$emit('beforeToggle', this);\n                this.status = !this.status;\n                this.$emit('afterToggle', this);\n            },\n            close: function () {\n                this.$emit('beforeClose', this);\n                this.status = false;\n                this.$emit('afterClose', this);\n            },\n            open: function () {\n                this.$emit('beforeOpen', this);\n                this.status = true;\n                this.$emit('afterOpen', this);\n            },\n        },\n\n        // mounting\n\n        mounted: function () {\n            this.nodes.toggle = this.$el.querySelector('.' + this.$options.$vc.settings.togglerClassDefault);\n            this.nodes.content = this.$el.querySelector('.' + this.$options.$vc.settings.contentClassDefault);\n            this.$emit('afterNodesBinding', {vm: this, nodes: this.nodes});\n            if(this.nodes.toggle !== null){\n                this.nodes.toggle.addEventListener('click', () => {\n                    this.toggle();\n                });\n            }\n            if ( this.active != null ) {\n                    this.status = this.active;\n            }\n        }\n    }\n</script>\n\n<style>\n    .v-collapse-content{\n        max-height: 0;\n        transition: max-height 0.3s ease-out;\n        overflow: hidden;\n        padding: 0;\n    }\n\n    .v-collapse-content-end{\n        transition: max-height 0.3s ease-in;\n        max-height: 500px;\n    }\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */module.exports=function listToStyles(parentId,list){var styles=[];var newStyles={};for(var i=0;i<list.length;i++){var item=list[i];var id=item[0];var css=item[1];var media=item[2];var sourceMap=item[3];var part={id:parentId+':'+i,css:css,media:media,sourceMap:sourceMap};if(!newStyles[id]){styles.push(newStyles[id]={id:id,parts:[part]});}else{newStyles[id].parts.push(part);}}return styles;};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: "vc-" + _vm.$options.$vc.settings.basename },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6987e66d", esExports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_group_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_group_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_group_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_group_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_group_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_1325cad9_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_group_vue__ = __webpack_require__(34);
var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_group_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_1325cad9_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_group_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules/vue2-collapse/src/components/group.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1325cad9", Component.options)
  } else {
    hotAPI.reload("data-v-1325cad9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "v-collapse-group" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1325cad9", esExports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */module.exports=function(css){// get current location
var location=typeof window!=="undefined"&&window.location;if(!location){throw new Error("fixUrls requires window.location");}// blank or null?
if(!css||typeof css!=="string"){return css;}var baseUrl=location.protocol+"//"+location.host;var currentDir=baseUrl+location.pathname.replace(/\/[^\/]*$/,"/");// convert each url(...)
/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */var fixedCss=css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(fullMatch,origUrl){// strip quotes (if they exist)
var unquotedOrigUrl=origUrl.trim().replace(/^"(.*)"$/,function(o,$1){return $1;}).replace(/^'(.*)'$/,function(o,$1){return $1;});// already a full url? no change
if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)){return fullMatch;}// convert the url to a full url
var newUrl;if(unquotedOrigUrl.indexOf("//")===0){//TODO: should we add protocol?
newUrl=unquotedOrigUrl;}else if(unquotedOrigUrl.indexOf("/")===0){// path should be relative to the base url
newUrl=baseUrl+unquotedOrigUrl;// already starts with '/'
}else{// path should be relative to current directory
newUrl=currentDir+unquotedOrigUrl.replace(/^\.\//,"");// Strip leading './'
}// send back the fixed url(...)
return"url("+JSON.stringify(newUrl)+")";});// send back the fixed css
return fixedCss;};

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_parameter_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_parameter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_parameter_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_parameter_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_parameter_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8608d602_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_parameter_vue__ = __webpack_require__(39);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(37)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_parameter_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8608d602_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_parameter_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "Resources/public/js/editor/src/common/components/parameter.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8608d602", Component.options)
  } else {
    hotAPI.reload("data-v-8608d602", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("7dbc36e6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8608d602\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./parameter.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8608d602\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./parameter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(true);
// imports


// module
exports.push([module.i, "\n.parameter .form-group > span {\n    font-style: italic;\n    font-size: 0.9em;\n}\n\n", "", {"version":3,"sources":["/usr/src/app/Resources/public/js/editor/src/common/components/Resources/public/js/editor/src/common/components/parameter.vue"],"names":[],"mappings":";AAkDA;IACA,mBAAA;IACA,iBAAA;CACA","file":"parameter.vue","sourcesContent":["<template>\n\n    <div class=\"parameter\">\n        <component\n          :is=\"option.component_name\"\n          :option=\"option\"\n          :name=\"name\"\n          :value=\"value\"\n          :required-star=\"requiredStar\"\n          @changed=\"updateParameter\"\n        ></component>\n    </div>\n\n</template>\n\n<script>\n\nimport {\n    checkBoxComponent,\n    choiceComponent,\n    integerComponent,\n    numberComponent,\n    textComponent,\n    textareaComponent\n} from 'vue-editor-commons';\n\nexport default {\n\n    props: ['name', 'option', 'value', 'required-star'],\n\n    components: {\n        'component-checkbox': checkBoxComponent,\n        'component-choice': choiceComponent,\n        'component-integer': integerComponent,\n        'component-number': numberComponent,\n        'component-text': textComponent,\n        'component-textarea': textareaComponent\n    },\n\n    methods: {\n        updateParameter: function (parameter) {\n            this.$emit('change', parameter);\n        }\n    }\n};\n\n</script>\n\n<style>\n\n.parameter .form-group > span {\n    font-style: italic;\n    font-size: 0.9em;\n}\n\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "parameter" },
    [
      _c(_vm.option.component_name, {
        tag: "component",
        attrs: {
          option: _vm.option,
          name: _vm.name,
          value: _vm.value,
          "required-star": _vm.requiredStar
        },
        on: { changed: _vm.updateParameter }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8608d602", esExports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!./collapsed-block.css", function() {
			var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!./collapsed-block.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".editor .collapsed-block > a > span {\n    display: inline-block;\n    float: right;\n    font-size: 20px;\n}\n\n.editor .collapsed-block > a > span .fa-plus-circle { display: none; }\n.editor .collapsed-block > a > span .fa-minus-circle { display: inline-block; }\n.editor .collapsed-block > a.collapsed > span .fa-plus-circle { display: inline-block; }\n.editor .collapsed-block > a.collapsed > span .fa-minus-circle { display: none; }\n\n.editor .collapsed-block > a {\n    display: block;\n    margin: 10px 0;\n}\n", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!./editor.css", function() {
			var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!./editor.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".editor h1,\n.editor h2,\n.editor h3,\n.editor h4,\n.editor h5,\n.editor h6 {\n  margin-bottom: 6px;\n}\n\n.editor button {\n  display: inline-block;\n  min-width: inherit;\n  padding: 9px;\n}\n\n.editor div.parameters .form-group .form-control-wrapper textarea {\n  min-width: inherit;\n}\n\n.editor span.required-star {\n  color: #c9302c;\n  font-weight: bold;\n  font-size: 20px;\n}\n\n\n\n/*******************************\n *      Workflow editor        *\n *******************************/\n\n.configuration-box {\n  border: 1px solid #CECECE;\n  margin: 10px auto;\n  padding: 10px;\n  -webkit-transition: box-shadow 1s;\n  transition: box-shadow .5s;\n  width: 90%;\n}\n\n.configuration-box:hover {\n  box-shadow: #555 0 0 3px\n}\n\n.configuration-box .collapsed-block > a .configuration-box .form-group {\n    margin: 0;\n}\n", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_json_raw_button_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_json_raw_button_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_json_raw_button_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_json_raw_button_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_json_raw_button_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_595a13d2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_json_raw_button_vue__ = __webpack_require__(47);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(45)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_json_raw_button_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_595a13d2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_json_raw_button_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "Resources/public/js/editor/src/common/components/json-raw-button.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-595a13d2", Component.options)
  } else {
    hotAPI.reload("data-v-595a13d2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("643b2368", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-595a13d2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./json-raw-button.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-595a13d2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./json-raw-button.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(true);
// imports


// module
exports.push([module.i, "\n.vue-modal-mask {\n    position: fixed;\n    z-index: 9998;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, .5);\n    display: table;\n    transition: opacity .3s ease;\n}\n.vue-modal-wrapper {\n    display: table-cell;\n    vertical-align: middle;\n}\n.vue-modal-container {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 620px;\n    margin: 0px auto;\n    padding: 20px 30px;\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\n    transition: all .3s ease;\n    font-family: Helvetica, Arial, sans-serif;\n}\n.vue-modal-body {\n    margin: 20px 0;\n    width: 100%;\n}\n.vue-modal-container .vue-modal-body textarea.raw-json {\n    min-height: 300px;\n    min-width: 100%;\n    max-width: 100%;\n}\n.vue-modal-container .close {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n}\n\n/*\n * The following styles are auto-applied to elements with\n * transition=\"modal\" when their visibility is toggled\n * by Vue.js.\n *\n * You can easily play with the modal transition by editing\n * these styles.\n */\n.modal-enter {\n    opacity: 0;\n}\n.modal-leave-active {\n    opacity: 0;\n}\n.modal-enter .vue-modal-container,\n.modal-leave-active .vue-modal-container {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n}\n.json-raw-button {\n    cursor: pointer;\n    display: block;\n    font-size: 20px;\n    margin-bottom: 20px;\n    padding: 10px 10px 0;\n    text-align: right;\n    z-index: 20;\n}\n.json-raw-button:hover {\n    color: #514D61;\n}\n", "", {"version":3,"sources":["/usr/src/app/Resources/public/js/editor/src/common/components/Resources/public/js/editor/src/common/components/json-raw-button.vue"],"names":[],"mappings":";AAiBA;IACA,gBAAA;IACA,cAAA;IACA,OAAA;IACA,QAAA;IACA,YAAA;IACA,aAAA;IACA,oCAAA;IACA,eAAA;IACA,6BAAA;CACA;AAEA;IACA,oBAAA;IACA,uBAAA;CACA;AAEA;IACA,gBAAA;IACA,SAAA;IACA,UAAA;IACA,iCAAA;IACA,aAAA;IACA,iBAAA;IACA,mBAAA;IACA,uBAAA;IACA,mBAAA;IACA,yCAAA;IACA,yBAAA;IACA,0CAAA;CACA;AAEA;IACA,eAAA;IACA,YAAA;CACA;AAEA;IACA,kBAAA;IACA,gBAAA;IACA,gBAAA;CACA;AAEA;IACA,mBAAA;IACA,SAAA;IACA,WAAA;CACA;;AAEA;;;;;;;GAOA;AAEA;IACA,WAAA;CACA;AAEA;IACA,WAAA;CACA;AAEA;;IAEA,8BAAA;IACA,sBAAA;CACA;AAEA;IACA,gBAAA;IACA,eAAA;IACA,gBAAA;IACA,oBAAA;IACA,qBAAA;IACA,kBAAA;IACA,YAAA;CACA;AAEA;IACA,eAAA;CACA","file":"json-raw-button.vue","sourcesContent":["<template>\n\n    <div>\n        <i class=\"fa fa-file-code-o json-raw-button\" aria-hidden=\"true\" @click=\"openModal()\"></i>\n        <modal v-if=\"showModal\">\n            <button type=\"button\" class=\"btn\" slot=\"header\" @click=\"closeModal()\">\n                <i class=\"icofont icofont-close\"></i>\n            </button>\n            <h3 slot=\"header\">{{ header }}</h3>\n            <textarea readonly slot=\"body\" class=\"raw-json\">{{ body }}</textarea>\n            <p slot=\"footer\">{{ footer }}</p>\n        </modal>\n    </div>\n\n</template>\n\n<style>\n.vue-modal-mask {\n    position: fixed;\n    z-index: 9998;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, .5);\n    display: table;\n    transition: opacity .3s ease;\n}\n\n.vue-modal-wrapper {\n    display: table-cell;\n    vertical-align: middle;\n}\n\n.vue-modal-container {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 620px;\n    margin: 0px auto;\n    padding: 20px 30px;\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);\n    transition: all .3s ease;\n    font-family: Helvetica, Arial, sans-serif;\n}\n\n.vue-modal-body {\n    margin: 20px 0;\n    width: 100%;\n}\n\n.vue-modal-container .vue-modal-body textarea.raw-json {\n    min-height: 300px;\n    min-width: 100%;\n    max-width: 100%;\n}\n\n.vue-modal-container .close {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n}\n\n/*\n * The following styles are auto-applied to elements with\n * transition=\"modal\" when their visibility is toggled\n * by Vue.js.\n *\n * You can easily play with the modal transition by editing\n * these styles.\n */\n\n.modal-enter {\n    opacity: 0;\n}\n\n.modal-leave-active {\n    opacity: 0;\n}\n\n.modal-enter .vue-modal-container,\n.modal-leave-active .vue-modal-container {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n}\n\n.json-raw-button {\n    cursor: pointer;\n    display: block;\n    font-size: 20px;\n    margin-bottom: 20px;\n    padding: 10px 10px 0;\n    text-align: right;\n    z-index: 20;\n}\n\n.json-raw-button:hover {\n    color: #514D61;\n}\n</style>\n\n<script>\n\nimport {\n    modalComponent\n} from 'vue-editor-commons';\n\nexport default {\n    props: ['header', 'body', 'footer'],\n\n    data: function () {\n        return {\n            showModal: false\n        };\n    },\n\n    components: {\n        'modal': modalComponent,\n    },\n\n    methods: {\n        openModal: function () {\n            this.showModal = true;\n        },\n\n        closeModal: function () {\n            this.showModal = false;\n        }\n    }\n};\n\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("i", {
        staticClass: "fa fa-file-code-o json-raw-button",
        attrs: { "aria-hidden": "true" },
        on: {
          click: function($event) {
            _vm.openModal()
          }
        }
      }),
      _vm._v(" "),
      _vm.showModal
        ? _c("modal", [
            _c(
              "button",
              {
                staticClass: "btn",
                attrs: { slot: "header", type: "button" },
                on: {
                  click: function($event) {
                    _vm.closeModal()
                  }
                },
                slot: "header"
              },
              [_c("i", { staticClass: "icofont icofont-close" })]
            ),
            _vm._v(" "),
            _c("h3", { attrs: { slot: "header" }, slot: "header" }, [
              _vm._v(_vm._s(_vm.header))
            ]),
            _vm._v(" "),
            _c(
              "textarea",
              {
                staticClass: "raw-json",
                attrs: { slot: "body", readonly: "" },
                slot: "body"
              },
              [_vm._v(_vm._s(_vm.body))]
            ),
            _vm._v(" "),
            _c("p", { attrs: { slot: "footer" }, slot: "footer" }, [
              _vm._v(_vm._s(_vm.footer))
            ])
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-595a13d2", esExports)
  }
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _extractRuleList=__webpack_require__(64);var _extractRuleList2=_interopRequireDefault(_extractRuleList);var _extractRuleConfiguration=__webpack_require__(70);var _extractRuleConfiguration2=_interopRequireDefault(_extractRuleConfiguration);__webpack_require__(42);var _jsonRawButton=__webpack_require__(44);var _jsonRawButton2=_interopRequireDefault(_jsonRawButton);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default={components:{'extract-rule-list':_extractRuleList2.default,'extract-rule-configuration':_extractRuleConfiguration2.default,'modal':_jsonRawButton2.default},computed:{rawJSON:function rawJSON(){return this.$store.getters.getRawJSON;}}};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});__webpack_require__(67);var _vueMultiselect=__webpack_require__(14);var _vueMultiselect2=_interopRequireDefault(_vueMultiselect);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
exports.default={components:{'multiselect':_vueMultiselect2.default},data:function data(){return{selectedExtractRuleService:null};},created:function created(){this.selectedExtractRuleService=this.$store.getters.getUsedExtractRule.service;},watch:{selectedExtractRuleService:function selectedExtractRuleService(newSelectedExtractRuleService){// Update the data object
this.$store.commit('updateUsedExtractRuleService',newSelectedExtractRuleService);}},computed:{extractRuleServiceList:function extractRuleServiceList(){return this.$store.getters.getExtractRuleList.map(function(element){return element.name;});},description:function description(){var usedExtractRule=this.$store.getters.getUsedExtractRule;return this.$store.getters.getExtractRuleDescription(usedExtractRule.service);}}};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _parameter=__webpack_require__(36);var _parameter2=_interopRequireDefault(_parameter);var _vueEditorCommons=__webpack_require__(0);__webpack_require__(40);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default={components:{'parameter':_parameter2.default},computed:{id:function id(){return'extract_rule_parameters'+_vueEditorCommons.utils.generateUniqueId();},requiredParameters:function requiredParameters(){return _vueEditorCommons.utils.filterObject(this.getParameters(),function(element){return element.options.required;});},optionalParameters:function optionalParameters(){return _vueEditorCommons.utils.filterObject(this.getParameters(),function(element){return!element.options.required;});},usedParameters:function usedParameters(){var usedExtractRule=this.$store.getters.getUsedExtractRule;return usedExtractRule.parameters;}},methods:{updateParameterValue:function updateParameterValue(parameter){this.$store.commit('updateUsedExtractRuleParameter',parameter);},hasOptionalParameters:function hasOptionalParameters(){return Object.keys(this.optionalParameters).length>0;},getParameters:function getParameters(){var usedExtractRule=this.$store.getters.getUsedExtractRule;return this.$store.getters.getExtractRuleParameters(usedExtractRule.service);}}};//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3b366738_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editor_vue__ = __webpack_require__(74);
var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3b366738_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "Resources/public/js/editor/src/extract-rule/components/editor.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b366738", Component.options)
  } else {
    hotAPI.reload("data-v-3b366738", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_list_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_list_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_list_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_list_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_list_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38379b5c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_extract_rule_list_vue__ = __webpack_require__(69);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(65)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_list_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38379b5c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_extract_rule_list_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "Resources/public/js/editor/src/extract-rule/components/extract-rule-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38379b5c", Component.options)
  } else {
    hotAPI.reload("data-v-38379b5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("52614fef", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-38379b5c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./extract-rule-list.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-38379b5c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./extract-rule-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(true);
// imports


// module
exports.push([module.i, "\n.editor.extract-rule-editor div.parameters .form-group .form-control-wrapper textarea {\n  min-height: 60px;\n}\n.editor .description {\n  font-style: italic;\n  padding: 5px;\n}\n", "", {"version":3,"sources":["/usr/src/app/Resources/public/js/editor/src/extract-rule/components/Resources/public/js/editor/src/extract-rule/components/extract-rule-list.vue"],"names":[],"mappings":";AAkEA;EACA,iBAAA;CACA;AAEA;EACA,mBAAA;EACA,aAAA;CACA","file":"extract-rule-list.vue","sourcesContent":["<template>\n\n    <div>\n      <div class=\"description\">{{ description }}</div>\n      <multiselect\n        v-model=\"selectedExtractRuleService\"\n        :options=\"extractRuleServiceList\"\n        :allow-empty=\"false\"\n        deselect-label=\"Selected\"\n        select-label=\"\"\n        placeholder=\"Select an extract rule service\">\n      </multiselect>\n      <hr>\n    </div>\n\n</template>\n\n<script>\n\nimport 'TaskBundle/common/styles/multiselect.css';\nimport multiselect from 'vue-multiselect';\n\nexport default {\n\n  components: { 'multiselect': multiselect },\n\n  data: function () {\n    return {\n      selectedExtractRuleService: null\n    };\n  },\n\n  created: function () {\n    this.selectedExtractRuleService = this.$store.getters.getUsedExtractRule.service;\n  },\n\n  watch: {\n    selectedExtractRuleService: function (newSelectedExtractRuleService) {\n      // Update the data object\n      this.$store.commit('updateUsedExtractRuleService', newSelectedExtractRuleService);\n    }\n  },\n\n  computed: {\n    extractRuleServiceList: function () {\n      return this.$store.getters.getExtractRuleList.map(\n        function (element) {\n          return element.name;\n        }\n      );\n    },\n    description: function () {\n      let usedExtractRule = this.$store.getters.getUsedExtractRule;\n      return this\n        .$store\n        .getters\n        .getExtractRuleDescription(usedExtractRule.service)\n     ;\n    }\n  }\n\n};\n\n</script>\n\n<style>\n  .editor.extract-rule-editor div.parameters .form-group .form-control-wrapper textarea {\n    min-height: 60px;\n  }\n\n  .editor .description {\n    font-style: italic;\n    padding: 5px;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!./multiselect.css", function() {
			var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!./multiselect.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "/** BASE **/\n\nfieldset[disabled] .multiselect{pointer-events:none}.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:\"\";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border-color:#41b883 transparent transparent;border-style:solid;border-width:2px;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{animation:a 2.4s cubic-bezier(.41,.26,.2,.62);animation-iteration-count:infinite}.multiselect__spinner:after{animation:a 2.4s cubic-bezier(.51,.09,.21,.8);animation-iteration-count:infinite}.multiselect__loading-enter-active,.multiselect__loading-leave-active{transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:14px;-ms-touch-action:manipulation;touch-action:manipulation}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:none}.multiselect--disabled{opacity:.6}.multiselect--active{z-index:1}.multiselect--active .multiselect__current,.multiselect--active .multiselect__input,.multiselect--active .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{transform:rotate(180deg)}.multiselect--above.multiselect--active .multiselect__current,.multiselect--above.multiselect--active .multiselect__input,.multiselect--above.multiselect--active .multiselect__tags{border-top-left-radius:0;border-top-right-radius:0}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:1px 0 0 5px;width:100%;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px}.multiselect__tag~.multiselect__input,.multiselect__tag~.multiselect__single{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:none}.multiselect__single{padding-left:6px;margin-bottom:8px}.multiselect__tags-wrap{display:inline}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:8px;white-space:nowrap}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:\"\\D7\";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 12px 0;padding-right:30px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;transition:transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-style:solid;border-width:5px 5px 0;border-color:#999 transparent transparent;content:\"\"}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content-wrapper{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:1;-webkit-overflow-scrolling:touch}.multiselect__content{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%}.multiselect--above .multiselect__content-wrapper{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8}.multiselect__content::webkit-scrollbar{display:none}.multiselect__element{display:block}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px}.multiselect__option--highlight{background:#41b883;outline:none;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect--disabled{background:#ededed;pointer-events:none}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select,.multiselect__option--disabled{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{cursor:text;pointer-events:none}.multiselect__option--disabled.multiselect__option--highlight{background:#dedede!important}.multiselect-enter-active,.multiselect-leave-active{transition:all .15s ease}.multiselect-enter,.multiselect-leave-active{opacity:0}.multiselect__strong{margin-bottom:10px;display:inline-block}@keyframes a{0%{transform:rotate(0)}to{transform:rotate(2turn)}}\n\n/** CUSTOM **/\n\n.editor .multiselect__option--highlight,\n.editor .multiselect__option--selected.multiselect__option--highlight,\n.editor .multiselect__option--highlight:after {\n    background: #514D61;\n}\n\n.editor .multiselect.multiselect-form-control {\n    display: inline-block;\n    width: 65%;\n    margin-right: -30px;\n}\n", ""]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "description" }, [
        _vm._v(_vm._s(_vm.description))
      ]),
      _vm._v(" "),
      _c("multiselect", {
        attrs: {
          options: _vm.extractRuleServiceList,
          "allow-empty": false,
          "deselect-label": "Selected",
          "select-label": "",
          placeholder: "Select an extract rule service"
        },
        model: {
          value: _vm.selectedExtractRuleService,
          callback: function($$v) {
            _vm.selectedExtractRuleService = $$v
          },
          expression: "selectedExtractRuleService"
        }
      }),
      _vm._v(" "),
      _c("hr")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-38379b5c", esExports)
  }
}

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_configuration_vue__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_configuration_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_configuration_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_configuration_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_configuration_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_520bb028_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_extract_rule_configuration_vue__ = __webpack_require__(73);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(71)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_extract_rule_configuration_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_520bb028_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_extract_rule_configuration_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "Resources/public/js/editor/src/extract-rule/components/extract-rule-configuration.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-520bb028", Component.options)
  } else {
    hotAPI.reload("data-v-520bb028", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("16323f6a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-520bb028\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./extract-rule-configuration.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-520bb028\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./extract-rule-configuration.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(true);
// imports


// module
exports.push([module.i, "\n.editor .collapsed {\n    float: none;\n    margin-bottom: 10px;\n}\n.parameters.v-collapse-content {\n    overflow: auto;\n}\n", "", {"version":3,"sources":["/usr/src/app/Resources/public/js/editor/src/extract-rule/components/Resources/public/js/editor/src/extract-rule/components/extract-rule-configuration.vue"],"names":[],"mappings":";AAsFA;IACA,YAAA;IACA,oBAAA;CACA;AAEA;IACA,eAAA;CACA","file":"extract-rule-configuration.vue","sourcesContent":["<template>\n    <div>\n        <div class=\"parameters\">\n            <parameter\n                v-for=\"(option, name) in requiredParameters\"\n                :key=\"name\"\n                :name=\"name\"\n                :option=\"option\"\n                :value=\"usedParameters[name]\"\n                :required-star=\"true\"\n                @change=\"updateParameterValue\"\n            ></parameter>\n            <v-collapse-wrapper v-if=\"hasOptionalParameters()\">\n                <button type=\"button\" style=\"display: block\" class=\"btn btn-primary collapsed\" v-collapse-toggle>\n                    Optional parameters\n                </button>\n                <div class=\"parameters\" v-collapse-content>\n                  <parameter\n                    v-for=\"(option, name) in optionalParameters\"\n                    :key=\"name\"\n                    :name=\"name\"\n                    :option=\"option\"\n                    :value=\"usedParameters[name]\"\n                    :required-star=\"true\"\n                    @change=\"updateParameterValue\"\n                  ></parameter>\n                </div>\n            </v-collapse-wrapper>\n        </div>\n    </div>\n\n</template>\n\n<script>\n\nimport parameterComponent from'TaskBundle/common/components/parameter.vue';\nimport { utils } from 'vue-editor-commons';\nimport 'TaskBundle/common/styles/collapsed-block.css';\n\nexport default {\n\n  components: { 'parameter': parameterComponent },\n\n  computed: {\n    id: function () {\n      return 'extract_rule_parameters' + utils.generateUniqueId();\n    },\n    requiredParameters: function () {\n      return utils.filterObject(this.getParameters(), function(element){\n        return element.options.required;\n      });\n    },\n    optionalParameters: function () {\n      return utils.filterObject(this.getParameters(), function(element){\n        return !element.options.required;\n      });\n    },\n    usedParameters: function () {\n      let usedExtractRule = this.$store.getters.getUsedExtractRule;\n\n      return usedExtractRule.parameters;\n    }\n  },\n\n  methods: {\n    updateParameterValue: function (parameter) {\n      this.$store.commit('updateUsedExtractRuleParameter', parameter);\n    },\n    hasOptionalParameters: function () {\n      return Object.keys(this.optionalParameters).length > 0;\n    },\n    getParameters: function () {\n      let usedExtractRule = this.$store.getters.getUsedExtractRule;\n      return this\n        .$store\n        .getters\n        .getExtractRuleParameters(usedExtractRule.service)\n      ;\n    }\n  }\n\n};\n\n</script>\n\n<style>\n.editor .collapsed {\n    float: none;\n    margin-bottom: 10px;\n}\n\n.parameters.v-collapse-content {\n    overflow: auto;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "parameters" },
      [
        _vm._l(_vm.requiredParameters, function(option, name) {
          return _c("parameter", {
            key: name,
            attrs: {
              name: name,
              option: option,
              value: _vm.usedParameters[name],
              "required-star": true
            },
            on: { change: _vm.updateParameterValue }
          })
        }),
        _vm._v(" "),
        _vm.hasOptionalParameters()
          ? _c("v-collapse-wrapper", [
              _c(
                "button",
                {
                  directives: [
                    { name: "collapse-toggle", rawName: "v-collapse-toggle" }
                  ],
                  staticClass: "btn btn-primary collapsed",
                  staticStyle: { display: "block" },
                  attrs: { type: "button" }
                },
                [_vm._v("\n                Optional parameters\n            ")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    { name: "collapse-content", rawName: "v-collapse-content" }
                  ],
                  staticClass: "parameters"
                },
                _vm._l(_vm.optionalParameters, function(option, name) {
                  return _c("parameter", {
                    key: name,
                    attrs: {
                      name: name,
                      option: option,
                      value: _vm.usedParameters[name],
                      "required-star": true
                    },
                    on: { change: _vm.updateParameterValue }
                  })
                })
              )
            ])
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-520bb028", esExports)
  }
}

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "extract-rule-editor editor" },
    [
      _c("modal", {
        attrs: { header: "Workflow raw JSON", body: _vm.rawJSON }
      }),
      _vm._v(" "),
      _c("extract-rule-list"),
      _vm._v(" "),
      _c("extract-rule-configuration")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3b366738", esExports)
  }
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default={/**
   * Get the url of the api to retrieve extract rules
   *
   * @param state
   * @returns string
   */getExtractRuleListApiUrl:function getExtractRuleListApiUrl(state){return state.configuration.api_url.get_extract_rules;},/**
   * Get the url of the api to retrieve extract rules parameters
   *
   * @param state
   * @returns string
   */getExtractRuleParametersApiUrl:function getExtractRuleParametersApiUrl(state){return function(serviceName){return state.configuration.api_url.get_extract_rules_parameters.replace('XNAME',serviceName);};},/**
   * Get the extract rule list
   *
   * @param state
   * @returns []
   */getExtractRuleList:function getExtractRuleList(state){return state.extractRuleList;},/**
   * Get the used extract rule
   *
   * @param state
   * @returns {Object}
   */getUsedExtractRule:function getUsedExtractRule(state){return state.usedExtractRule;},/**
   * Get the extract rule parameters for the given extract rule name
   *
   * @param state
   * @returns {Object}
   */getExtractRuleParameters:function getExtractRuleParameters(state,getters){return function(extractRuleServiceName){var extractRule=getters.getExtractRuleList.find(function(element){return element.name===extractRuleServiceName;});if(null!=extractRule){return extractRule.parameters;}};},/**
   * Get the extract rule parameters for the given extract rule name
   *
   * @param state
   * @returns {Object}
   */getExtractRuleDescription:function getExtractRuleDescription(state,getters){return function(extractRuleServiceName){var extractRule=getters.getExtractRuleList.find(function(element){return element.name===extractRuleServiceName;});if(null!=extractRule){return extractRule.description;}};},/**
   * Return the JSON string of used extract rule
   *
   * @returns {string}
   */getRawJSON:function getRawJSON(state){return JSON.stringify(state.usedExtractRule,null,2);}};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var _vue=__webpack_require__(16);var _vue2=_interopRequireDefault(_vue);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default={/**
   * Set the extract rule list
   *
   * @param state
   * @param {Object[]} extractRuleList
   */setExtractRuleList:function setExtractRuleList(state,extractRuleList){extractRuleList.forEach(function(element,index){state.extractRuleList.push({name:element});});},/**
   * Set the data for an extract rule
   *
   * @param state
   * @param {Object} payload
   */setExtractRuleData:function setExtractRuleData(state,payload){var parameters=payload.extractRuleParameters;for(var key in parameters){parameters[key].component_name='component-'+parameters[key].form_type;}var extractRule=state.extractRuleList.find(function(element){return element.name===payload.extractRuleName;});_vue2.default.set(extractRule,'parameters',payload.extractRuleParameters);_vue2.default.set(extractRule,'description',payload.extractRuleDescription);},/**
   * Update the used extract rule service
   *
   * @param state
   * @param {Object[]} extractRules
   */updateUsedExtractRuleService:function updateUsedExtractRuleService(state,extractRuleService){state.usedExtractRule.service=extractRuleService;this.commit('updateInitialTextareaValue');},/**
   * Update a used extract rule parameter
   *
   * @param state
   * @param {Object[]} extractRules
   */updateUsedExtractRuleParameter:function updateUsedExtractRuleParameter(state,parameter){if(0===parameter.value.length){_vue2.default.delete(state.usedExtractRule.parameters,parameter.name);}else{_vue2.default.set(state.usedExtractRule.parameters,parameter.name,parameter.value);}this.commit('updateInitialTextareaValue');},/**
   * Clean the parameters after the extract rule was changed
   *
   * @param state
   * @param {Object[]} extractRules
   */cleanUsedParameters:function cleanUsedParameters(state,parameter){var usedParameters=state.usedExtractRule.parameters;var allParameters=state.extractRuleList.find(function(element){return element.name===state.usedExtractRule.service;}).parameters;if(typeof allParameters!=='undefined'){for(var usedParameterName in usedParameters){if(typeof allParameters[usedParameterName]==='undefined'){_vue2.default.delete(state.usedExtractRule.parameters,usedParameterName);}}}this.commit('updateInitialTextareaValue');},/**
   * Initialize the extract rule used in the form
   *
   * @param state
   * @returns []
   */initializeUsedExtractRule:function initializeUsedExtractRule(state){var defaultConf={service:null,parameters:{}};if(''!==state.formProperties.value){var existingConf=JSON.parse(state.formProperties.value);_vue2.default.set(state,'usedExtractRule',Object.assign(defaultConf,existingConf));}else{_vue2.default.set(state,'usedExtractRule',defaultConf);}},/**
   * Update the initial textarea value
   *
   * @param state
   * @returns []
   */updateInitialTextareaValue:function updateInitialTextareaValue(state){var parameters=state.usedExtractRule.parameters;for(var parameterName in parameters){try{parameters[parameterName]=JSON.parse(parameters[parameterName]);}catch(e){}}var rawExtractRule=JSON.stringify(state.usedExtractRule,null,4);document.getElementById(state.formProperties.id).value=rawExtractRule;}};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});var extractRuleEditorActions={/**
   * Set the extract rules in the store
   *
   * @param $store
   * @param $http
   */setExtractRules:function setExtractRules($store,$http){return new Promise(function(resolve,reject){var url=$store.getters.getExtractRuleListApiUrl;extractRuleEditorActions.handleGetRequest(url,$store,$http,function(extractRuleList){$store.commit('setExtractRuleList',extractRuleList);resolve();});});},/**
   * Set the extract rule parameters and description
   *
   * @param $store
   * @param payload
   * @returns {Promise}
   */setExtractRuleData:function setExtractRuleData($store,payload){return new Promise(function(resolve,reject){var url=$store.getters.getExtractRuleParametersApiUrl(payload.extractRuleName);extractRuleEditorActions.handleGetRequest(url,$store,payload.http,function(response){$store.commit('setExtractRuleData',{extractRuleName:payload.extractRuleName,extractRuleParameters:response.parameters,extractRuleDescription:response.description});resolve();});});}};exports.default=extractRuleEditorActions;

/***/ })
]);
//# sourceMappingURL=trigger-extra-rule-vue-editor.async.js.map