/*jQuery Mousewheel 3.1.13*/!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/*Base64.encode(),Base64.decode()*/;(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?module.exports=factory(global):typeof define==="function"&&define.amd?define(factory):factory(global)})(typeof self!=="undefined"?self:typeof window!=="undefined"?window:typeof global!=="undefined"?global:this,function(global){"use strict";var _Base64=global.Base64;var version="2.5.0";var buffer;if(typeof module!=="undefined"&&module.exports){try{buffer=eval("require('buffer').Buffer")}catch(err){buffer=undefined}}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64tab=function(bin){var t={};for(var i=0,l=bin.length;i<l;i++)t[bin.charAt(i)]=i;return t}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length<2){var cc=c.charCodeAt(0);return cc<128?c:cc<2048?fromCharCode(192|cc>>>6)+fromCharCode(128|cc&63):fromCharCode(224|cc>>>12&15)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}else{var cc=65536+(c.charCodeAt(0)-55296)*1024+(c.charCodeAt(1)-56320);return fromCharCode(240|cc>>>18&7)+fromCharCode(128|cc>>>12&63)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob,cb_utob)};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3],ord=ccc.charCodeAt(0)<<16|(ccc.length>1?ccc.charCodeAt(1):0)<<8|(ccc.length>2?ccc.charCodeAt(2):0),chars=[b64chars.charAt(ord>>>18),b64chars.charAt(ord>>>12&63),padlen>=2?"=":b64chars.charAt(ord>>>6&63),padlen>=1?"=":b64chars.charAt(ord&63)];return chars.join("")};var btoa=global.btoa?function(b){return global.btoa(b)}:function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)};var _encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(u){return(u.constructor===buffer.constructor?u:buffer.from(u)).toString("base64")}:function(u){return(u.constructor===buffer.constructor?u:new buffer(u)).toString("base64")}:function(u){return btoa(utob(u))};var encode=function(u,urisafe){return!urisafe?_encode(String(u)):_encode(String(u)).replace(/[+\/]/g,function(m0){return m0=="+"?"-":"_"}).replace(/=/g,"")};var encodeURI=function(u){return encode(u,true)};var re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var cb_btou=function(cccc){switch(cccc.length){case 4:var cp=(7&cccc.charCodeAt(0))<<18|(63&cccc.charCodeAt(1))<<12|(63&cccc.charCodeAt(2))<<6|63&cccc.charCodeAt(3),offset=cp-65536;return fromCharCode((offset>>>10)+55296)+fromCharCode((offset&1023)+56320);case 3:return fromCharCode((15&cccc.charCodeAt(0))<<12|(63&cccc.charCodeAt(1))<<6|63&cccc.charCodeAt(2));default:return fromCharCode((31&cccc.charCodeAt(0))<<6|63&cccc.charCodeAt(1))}};var btou=function(b){return b.replace(re_btou,cb_btou)};var cb_decode=function(cccc){var len=cccc.length,padlen=len%4,n=(len>0?b64tab[cccc.charAt(0)]<<18:0)|(len>1?b64tab[cccc.charAt(1)]<<12:0)|(len>2?b64tab[cccc.charAt(2)]<<6:0)|(len>3?b64tab[cccc.charAt(3)]:0),chars=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(n&255)];chars.length-=[0,0,2,1][padlen];return chars.join("")};var _atob=global.atob?function(a){return global.atob(a)}:function(a){return a.replace(/\S{1,4}/g,cb_decode)};var atob=function(a){return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g,""))};var _decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(a){return(a.constructor===buffer.constructor?a:buffer.from(a,"base64")).toString()}:function(a){return(a.constructor===buffer.constructor?a:new buffer(a,"base64")).toString()}:function(a){return btou(_atob(a))};var decode=function(a){return _decode(String(a).replace(/[-_]/g,function(m0){return m0=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};var noConflict=function(){var Base64=global.Base64;global.Base64=_Base64;return Base64};global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer};if(typeof Object.defineProperty==="function"){var noEnum=function(v){return{value:v,enumerable:false,writable:true,configurable:true}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)}));Object.defineProperty(String.prototype,"toBase64",noEnum(function(urisafe){return encode(this,urisafe)}));Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,true)}))}}if(global["Meteor"]){Base64=global.Base64}if(typeof module!=="undefined"&&module.exports){module.exports.Base64=global.Base64}else if(typeof define==="function"&&define.amd){define([],function(){return global.Base64})}return{Base64:global.Base64}});
/*imgReady()*/!function(n,e){"function"==typeof define&&define.amd?define(n,function(){return e}):window[n]=e}("imgReady",function(){var n=[],e=null,t=[["width","height"],["naturalWidth","naturalHeight"]],a=Number("naturalWidth"in new Image()),i=function(){for(var t=0;t<n.length;)n[t].end?n.splice(t,1):l.call(n[t++]);n.length&&(e=setTimeout(i,50))||(e=null)},l=function(){(this.complete||this[t[a][0]]!==this.__width||this[t[a][1]]!==this.__height||"loading"==this.readyState)&&(this.end=!0,this.onready(this))};return function(o,r,d,u){r=r||new Function(),d=d||new Function(),u=u||new Function();var c="string"==typeof o?new Image():o;if(c.onerror=function(){c.end=!0,c.onload=c.onerror=c.onreadystatechange=null,u.call(c,c),c=null},"string"==typeof o&&(c.src=o),c){if(c.complete)return c.onerror=null,r.call(c,c),d.call(c,c),void(c=null);c.__width=c[t[a][0]],c.__height=c[t[a][1]],c.onready=r,l.call(c),c.onload=c.onreadystatechange=function(){c&&c.readyState&&"loaded"!=c.readyState&&"complete"!=c.readyState||(c.onload=c.onerror=c.onreadystatechange=null,!c.end&&l.call(c),d.call(c,c),c=null)},c.end||(n.push(c),!e&&(e=setTimeout(i,50)))}}}());

var J=jQuery,__A=document.createElement('a'),__types={},__toString = __types.toString;(function(){var __typesNames="Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " );for(var i=0,l=__typesNames.length;i<l;i++){__types["[object "+ __typesNames[i] +"]"]=__typesNames[i].toLowerCase();} })();
function _typeof(o){if ( o == null ) {return o + "";}return typeof o === "object" || typeof o === "function" ?__types[ __toString.call( o ) ] || "object" :typeof o;}
function UUID(n){function S4(){return (((1+Math.random())*0x10000)|0).toString(16).substring(1);}if(!n){return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());}else{ var uuid='';for(var i=0;i<n;i++){uuid+=S4()}return uuid}}
function map (o,f,p){var r="";if(_typeof(f)==='function' && _typeof(o)==='array'){for(var i=0,l=o.length;i<l;i++){r=f.apply((p||o[i]),[i,o[i]]);if(_typeof(r)!=="undefined"){return r}}}if(_typeof(f)==='function' && (_typeof(o)==='object'|| _typeof(o)==='function')){for(var k in o){if(o.hasOwnProperty(k) && _typeof(o[k])!=='undefined'){r=f.apply((p||o[k]),[k,o[k]]);if(_typeof(r)!=="undefined"){return r}}}}if(_typeof(f)==='function' && _typeof(o)==='number' ){for(var i=0;i<o;i++){r=f.apply((p||f),[i]);if(_typeof(r)!=="undefined"){return r}}}}
function inArray (e,a,i){if(Array.indexOf){return a.indexOf(e);}var l;if(a){l = a.length;i = i ? i < 0 ? Math.max( 0, l + i ) : i : 0;for ( ;i < l;i++ ) {if ( i in a && a[ i ] === e ){return i;}}}return -1;}
function atArray(e,a){return inArray(e,a)>=0;}
function timestamp(){return new Date().getTime();}
function exe(){ var e=arguments; if("function"===_typeof(e[0])){ return e[0].apply(e[0],[].slice.call(e,1)); } if("object"===_typeof(e[0])&& _typeof(e[1])==='string'&& e[0].hasOwnProperty(e[1]) &&"function"===_typeof(e[0][e[1]]) ){ e[0][e[1]].apply(e[0],[].slice.call(e,2)); } if("string"===_typeof(e[0])){ var ts=e[0].split("."),o=window; for(var i=0,l=ts.length;i<l;i++){ o=o[ts[i]]; if(i<l-1 && !o){ return ; } if(i==l-1){ return o.apply(o,[].slice.call(e,1)); } } } }
function untill(a,b,c,d){if(typeof(a)!=='function' || typeof(b)!=='function'){return} if(a()){return b()}d=d||5000;var x=11,i=0,_id=setInterval(function(){if(d>x && i>d){typeof(c)==="function" && c();clearInterval(_id);}if(a()){b();clearInterval(_id)}i+=x},x)}
function spArray(e,a){if(!e || _typeof(a)!=='array'){return a}var idx=inArray(e,a);if(idx>=0){a.splice(idx,1);}return a;}
function uniqueArray(a){var n = {},r=[];for(var i = 0; i < a.length; i++){if (!n[a[i]]){n[a[i]] = true;r.push(a[i]);}}return r;}
function stringToRegExp(s,b,c){s=s.replace(/\//g,"\\");c=c?c:new RegExp();c.compile(s,b);return c;}
function stringToRegString(s){return s.replace(/(\[|\]|\(|\)|\.|\^|\$|\*|\+|\{|\}|\?)/g,"/$1");}
function sortObjectByKeys(obj){var tmp={};Object.keys(obj).sort().forEach(function(k){tmp[k]=obj[k]});return tmp;}
function isEmpty(v){if(v === null || _typeof(v) === 'undefined' || v === ''){return true;}if((_typeof(v)==="string" && v.length>0)||_typeof(v)==="number"){return false;}if(_typeof(v)==="array" && v.length>0){return false;}if(_typeof(v)==="object"){for (var k in v){if(hasOwnProperty.call(v,k)){return false;}}}return true;}
function timed(_f,_t,_rp){return (_rp?new JDitto(_f,_t):(new JDelay(_f,_t)));}
function suit(k,fs){if(_typeof(fs)==='object'){if(fs.hasOwnProperty(k) && _typeof(fs[k])==='function'){return fs[k].call();}if(fs.hasOwnProperty('default') && _typeof(fs['default'])==='function'){return fs['default'].call();}}}
function isNum(s){ return /^[+-]?[0-9]+(\.[0-9]+)?$/.test(s)}
function absorb(b,n){map(b,function(k,v){n.hasOwnProperty(k) && (b[k]=n[k]);});return b;}
function imgToBase64(imgsrc,callback){function _Base64Image(img){var canvas = document.createElement("canvas");canvas.width = img.width;canvas.height = img.height;var ctx = canvas.getContext("2d");ctx.drawImage(img, 0, 0, img.width, img.height);var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();var dataURL = canvas.toDataURL("image/"+ext);return dataURL;}var image = new Image();image.crossOrigin = '';image.src = imgsrc;image.onload = function(){var base64 = _Base64Image(image);callback(base64);}}
function parseURL(_url){_url=_url.replace(/&amp;/gi,'&');var _A=window['__A']||document.createElement('a');_A.href=_url;return _A.href;}
function parseURI(_url){return new JUri(_url);}
function trim(s){s=(s||"").toString();return s.replace(/^\s+|\s+$|[\r\n]+&/g, "")}
function confine(a,b,c){var d=false;if(b){for (var i=0,l=b.length;i < l;i++ ){if(b[i] === a){d=true;break;}}}if(typeof(c)==='function'){c.call(this,a);}return d;}
function objectParse(o){try{return JSON.parse(o);}catch(e){return {};}return {};}
function objectCopy(o){if(typeof(o)!=="object"){return null;}return JSON.parse(JSON.stringify(o));}
function objectKeys(o){var ks=[];map(o,function(k,v){ks.push(k)});return ks;}
function objectMerge(a,b){if(arguments.length<2){return a||{}}if(b && typeof(b)=="object"){for(var x in b){if(b.hasOwnProperty(x)){a[x]=b[x];}}}if(arguments.length>2){var arg=[a].concat([].slice.call(arguments,2));return objectMerge.apply(a,arg);}return a;}
function objectGet(o,p,d){var t=typeof(o);if(t!='object' && t!='function'){return undefined;}if(!p || typeof(p)!=="string"){return o}p=p.replace(/^\./,'');var ps=p.split("."),c=o;for(var i=0,l=ps.length;i<l;i++){if(c && c.hasOwnProperty(ps[i])){c=c[ps[i]];}else{return d||undefined;}}return c;}
function arrayMerge(a,b){var c=a.concat(b),d=[];for(var i=0,l=c.length;i<l;i++){if(d.indexOf(c[i])<0){d.push(c[i]);}}return d;}
function once(a,b){ if(arguments.length==0){return;} var n,f; if(arguments.length==1){ if(typeof(a)!=="function"){return;} f=a; n=Base64.encode(f.toString()); } if(arguments.length==2){ n=a; if(typeof(b)!=="function"){return;} f=b } n="___"+n; if(window[n]){ return ; }else{ window[n]=f; setTimeout(function(){delete window[n]},10); return f.call(f) } }
function apl(t,f){ var arg=[].slice.call(arguments,2); if(typeof (f)!=='function'){return arg;} var a=arg[0]; if(a && typeof(a)==='object' && typeof(a.callee)==='function' && a.hasOwnProperty('length') ){ var b=typeof(arg[1])==='number'?arg[1]:0; return f.apply(t,[].slice.call(a,b)); } return f.apply(t,arg); }

function JUri(url,params){__A.href=url?url.replace(/&amp;/gi,'&'):window.location.href;var _ps=function(_s){var _p={};_s.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s, k, v){k!=='v'&& (_p[k] = v);});return _p;};this.url=__A.href;this.protocol = ((!__A.protocol || __A.protocol == ':') ? window.location.protocol : __A.protocol);this.hostname = __A.hostname || window.location.hostname;this.port = __A.port || window.location.port;this.search = __A.search;this.hash = __A.hash;this.host = __A.host || window.location.host;this.pathname =__A.href.replace(this.hash||'','').replace(this.search||'','').replace(this.protocol + '//' + this.hostname, '').replace(':' + this.port, '');this.params = objectMerge((this.search ? _ps(this.search) : {}),params);this.href = this.query();}
JUri.prototype.param=function(){if(arguments.length<1){var _q=[];map(this.params,function(k,v){_q.push(k+'='+((v && _typeof(v)=="object")?JSON.stringify(v):v));});return _q.join('&');}if(arguments.length===1){return this.params[arguments[0]];}if(arguments.length===2 && _typeof(arguments[1])==='string'){return this.params[arguments[0]]=arguments[1];}};
JUri.prototype.query=function(){return (this.host === window.location.host ? '' : this.protocol + '//' + this.host) + this.pathname +(this.param()||this.hash?'?'+this.param()+this.hash:"");};

function JDelay(_f,_t){this.run(_f,_t);}
JDelay.prototype={
	'clear':function(){clearTimeout(this.id);this.id=0;return this;},
	'end':function(){_typeof(this.handle)==='function' && (this.clear(),this.handle());return this;},
	'run':function(_f,_t){
		var _S=this;
		this.duration=_t||this["duration"]||11;
		this.fn=(_typeof(_f)==='function'?_f:this.fn);
		this.handle=(_typeof(_f)==='function' ? function(){_f();_S.id=0} : this["handle"] ||null);
		this.id=(_typeof(this.handle)==='function' && setTimeout(this.handle,(this.duration)))||0;
	}
};
JDelay.prototype.constructor=JDelay;
function JDitto(_f,_t,_a){this.run(_f,_t,_a);}
JDitto.prototype={
	"clear":function(){clearInterval(this.id);this.id=0;return this;},
	"run":function(_f,_t,_a){
			var _S=this;
			this.times=0;
			this.handle=(_typeof(_f)==='function') ? function(){_f();_S.times+=1;(_S.total&& _S.total===_S.times && _S.clear())}:_S["handle"]||null;
			this.interval=_t||this["interval"]||11;
			this.total=_a||this["total"]||0;
			this.id=(_typeof(this.handle)==='function' &&setInterval(this.handle,this.interval))||0;
	}
};
JDitto.prototype.constructor=JDitto;

//JStorage
function JStorage(key,bool){
	this.key=key;
	this.storage=(bool && window['sessionStorage'] ? window['sessionStorage'] : window['localStorage']) || window['localStorage'];
	this._storage=this.storage.getItem(this.key);
	if (this._storage) {
		this._storage=JSON.parse(this._storage);
	}else{
		this._storage={created:timestamp()};
		this.storage.setItem(this.key,JSON.stringify(this._storage));
	}
	this.change=function(){};
}
JStorage.prototype={
	"store":function(){this.storage.setItem(this.key,JSON.stringify(this._storage));this.change(this);},
	"set":function(k,v){this._storage[k]=v;this.store();return this._storage[k];},
	"get":function(){
		switch(arguments.length){
			case 0:return this._storage;
			case 1:return this._storage[arguments[0]];
			case 2:return this._storage[arguments[0]] ? this._storage[arguments[0]] : this.set(arguments[0],arguments[1]);
		}
	},
	"add":function(k,v){this._storage[k]=v;return this._storage[k];},
	"remove":function(k){delete this._storage[k];this.store();},
	"key":function(k){this.storage.key(k)},
	"clear":function(){this.storage.removeItem(this.key);this._storage={created:timestamp()};this.storage.setItem(this.key,JSON.stringify(this._storage));},
	"getItem":function(k){ return  this.get.apply(this,[].slice.call(arguments,0))},
	"setItem":function(k){ return  this.set.apply(this,[].slice.call(arguments,0))},
	"removeItem":function(k){return  this.remove.apply(this,[].slice.call(arguments,0))}
};
JStorage.prototype.constructor=JStorage;

//JMatrix
function JMatrix(a,b){
	this.__key=this.getKey(a);
	this.__keys=[];
	this.__privates=new Array('__key','__keys','__privates');

	if(arguments.length>=1 && _typeof(a)==='object'){this.extend(a);}
	if(arguments.length>1 && _typeof(b)==='object'){this.extend(b);}

	if(this.hasOwnProperty('init') && _typeof(this.init)==='function'){this.init();this.remove('init');}
}
JMatrix.prototype={
	"indexof": 	function (x){ for (var i = 0, l = this.__keys.length;i < l;i++) { if (this.__keys[i] === x) { return i } } return -1;},
	"length": 	function (){ return this.__keys.length },
	"splice"	:	function(x,a){if(_typeof(a)!='array'){return}for(var i=0,l=a.length;i<l;i++){if(a[i]==x){a.splice(i,1);return}}},
	"getKey": 	function (a){if (!a) { return UUID(2);} if ((_typeof (a) === 'string') || (_typeof (a) === 'number')) { return a;} if (_typeof (a) === 'object') {!a["__key"] && (a["__key"]=UUID(2));return a.__key }},
	'hasOwn'	:function(key){return (this.hasOwnProperty(key) && !this.privated(key));},
	"has"		:function(key){return (this.indexof(key)>=0?true:false);},
	'get'		:function(key){if(this.has(this.getKey(key))){return this[key]}},
	"extend"	:function(o){if(_typeof(o)==='object'){for(var x in o){if(o.hasOwnProperty(x) && !this[x]){this.push(x,o[x])}}}},
	"privated": 	function () { if (arguments.length === 1) { return (inArray(arguments[0], this.__privates) >= 0 ? true : false);} if (arguments.length === 2) { this[arguments[0]] = arguments[1];this.__privates.push(arguments[0]);} },
	"key": 		function (x){ if (arguments.length < 1) { return this.__key;} var key = this.getKey(x);if (this.has(key)) { return key;}for (var i = 0, l = this.__keys.length;i < l;i++) { if (this.__keys[i] == x) { return this.__keys[i] } }return undefined},
	"push"		:function(){
		var key=this.getKey(),val;
		switch(arguments.length){
			case 0: return '';
			case 1: val=arguments[0];break;
			case 2:key=this.getKey(arguments[0]);val=arguments[1];break;
		}
		this[key]=val;
		if (_typeof (val) === 'object'){ val.__key = key }
		if (inArray(key, this.__keys) < 0) { this.__keys.push(key);} return key;
	},
	"remove"	:function(){
		if (arguments.length < 1 && this.length() > 0){for (var i = 0, l = this.length();i < l;i++) {delete this[this.__keys[i]];} this.__keys = [];return;}var key = this.getKey(arguments[0]);if (this.has(key)){delete this[key];this.splice(key, this.__keys);return;}
	},
	"each": 		function (f) { for (var i = 0, l = this.__keys.length;i < l;i++) {if (this.has(this.__keys[i])){ f.call(f, this.__keys[i], this[this.__keys[i]]);} } },
	"bind"		:function(){
		if(arguments.length<1){return;}
		var arg0=arguments[0],arg1=arguments[1],key=this.getKey(arg0);
		if(arguments.length>2){
			(!this.hasOwnProperty(key)) && this.push(key,new JMatrix(key));
			this[key].bind.apply(this[key],[].slice.call(arguments,1));
		}else if (arguments.length === 2) {
			if (this.hasOwnProperty(key) && (this[key] instanceof JMatrix)){
				this[key].bind(arg1);
			} else {
				_typeof(arg1)==='function' && this.push(key, arg1);
			}
		}else if(arguments.length === 1){
			if (this.hasOwnProperty(key) && (this[key] instanceof JMatrix)) {
				this[key].bind(arg0);
			}else{
				if(_typeof(arg0)==='object'){
					for(var x in arg0){if(arg0.hasOwnProperty(x) && _typeof(arg0[x]==='function')){this.bind(x,arg0[x]);}}return;
				}
				_typeof(arg0)==='function' && this.push(key, arg0);
			}
		}
	},
	"run"		:function(){
		var _S=this;
		if(arguments.length===0){
			for(var i=0,l=_S.length();i<l;i++){
				(_S[_S.__keys[i]] instanceof JMatrix) && _S[_S.__keys[i]].run.apply(_S[_S.__keys[i]]);
				_typeof(_S[_S.__keys[i]])==='function' && _S[_S.__keys[i]].apply(_S[_S.__keys[i]]);
			}
			return;
		}
		if(_typeof(arguments[0]) === 'array'){
			for(var i=0,l=_S.length();i<l;i++){
				(_S[_S.__keys[i]] instanceof JMatrix) && _S[_S.__keys[i]].run.apply(_S[_S.__keys[i]],arguments[0]);
				_typeof(_S[_S.__keys[i]])==='function' && _S[_S.__keys[i]].apply(_S[_S.__keys[i]],arguments[0]);
			}
			return;
		}
		var key=this.getKey(arguments[0]);
		if(this.has(key) && (this[key] instanceof JMatrix)){this[key].run.apply(this[key],[].slice.call(arguments,1)); return ;}
		if(this.has(key) && _typeof(this[key])==='function'){this[key].apply(this[key],arguments[1]); return ;}
	}
};
JMatrix.prototype.constructor=JMatrix;

function JAttr(a){
	var _S=this;
	var _parseAttributes=function(s,a){
			s=s.replace(/^\s+||\s+$/g,"");a=a||{};
			var m=s.match(/^([a-zA-Z-_]*)=(['"])/);
			if(m){s=s.substring(m[0].length).replace(/^\s+||\s+$/g,"");var _m=s.match(stringToRegExp('((^.*?)'+m[2]+')(/s+[a-zA-Z-_]*=[\'"]|/s*$)'));if(_m){a[m[1]]=_m[2];s=s.substring(_m[1].length).replace(/^\s+||\s+$/g,"");_parseAttributes(s,a);}}
			return a;
	};
	if(_typeof(a)==="string" && a.length>0){a=_parseAttributes(a);}
	this.__attributes=J.extend({},a);
	this.__classname=[],
	this.__styles={};
	suit(_typeof(this.__attributes['style']),{
		"object":function(){_S.__styles=J.extend({},_S.__attributes['style']);},
		"string":function(){_S.__attributes['style'].replace(/(\w+)\s?:\s?([^:;]*);/g,function(s,a,b){_S.__styles[a]=b;});}});
	delete this.__attributes['style'];
	this.__attributes['classname'] && this.__classname.concat(this.__attributes['classname'].split(" "));
	delete this.__attributes['classname'];
}
JAttr.prototype={
	"get":function(k){
		if(k){return this[k]||""}
		var _r=J.extend({},this.__attributes),
		_c=this.__classname.join(" "),
		_s="";_c && (_r["class"]=_c);
		map(this.__styles,function(k,v){(_s+=(k+':'+v+';'));});_s && (_r["style"]=_s);
		return _r;
	},
	"set":function(k,v){(k && v) &&(this.__attributes[k]=v);return this;},
	"style":function(k,v){
		(k && v)&&(this.__styles[k]=v);
		return this.__styles;
	},
	"addClass":function(c){if(_typeof(c)==="array"){this.__classname=this.__classname.concat(c);return this;}(c && inArray(c,this.__classname)<0)&&   this.__classname.push(c);return this;},
	"data":function(){return this.__attributes;},
	"tostring":function(){
		var a="",s="",c=this.__classname.length>0?this.__classname.join(" "):"";
		map(this.__attributes,function(k,v){(a+=(k+'="'+v+'" '));});
		map(this.__styles,function(k,v){(s+=(k+':'+v+';'));});
		return (c?' class="'+c+'"':"")+a+(s?' style="'+s+'"':"");
	}
};
JAttr.prototype.constructor=JAttr;

Element.prototype.$=function(){};
function isSelecter(s){return isNaN(s) &&  (s.charAt(0)==='.'|| s.charAt(0)==='#');}
function isE(o){if(!o){return false}if(typeof HTMLElement === 'object'){return o instanceof HTMLElement;}return (o && typeof o  === 'object' && o['nodeType'] === 1 && typeof o['nodeName'] === 'string');}

function Eid(_id){if(isE(_id)){return _id};(_id.charAt(0)==='#')&& (_id=_id.substring(1));return document.getElementById(_id);}
function E(_e){(_typeof(_e)==='string') && (_e=Eid(_e)); (_e instanceof jQuery && _e[0]) && (_e=_e[0]);if(isE(_e)){if(_e['E']){return _e['E'];}else{return _e['E']=new _E(_e);}}else{ return new _E();}}
function _E(_e){
	this[0]=_e;
	var __ca=function(s){return s.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ').split(" ");},
		__n=function(s){ (s.charAt(0)=='#' || s.charAt(0)=='.') && (s=s.substring(1));return s},
		__fn={
		"has":function(_p){if(this.hasOwnProperty(_p)){return true}else{return false;}},
		"set":function(_k,_v){this[_k]=_v;},
		"get":function(_k,_d){return this[_k]||_d;},
		"remove":function(_k){this.hasOwnProperty(_k) && delete this[_k];},
		"hasClass":function(_c){var _n=__ca(this[0].className);return (_n.indexOf(_c)<0?false:true);},
		"firstClass":function(){var _n=__ca(this[0].className);return (_n.length>0?_n[0]:'');},
		"addClass":function(_c){var _n=__ca(this[0].className);if(_n.indexOf(_c)<0){_n.push(_c);this[0].className=_n.join(" ");}},
		"removeClass":function(_c,_r){var _n=this[0].className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');if(_r){this[0].className=_n.replace(stringToRegExp('[ ]*/b'+_c+'/b','g'),'');return ;}var id=_n.indexOf(_c);if(id>=0){_n.splice(id,1);this[0].className=_n.join(" ");}},
		"attribute":function(_a,_b){
			if(_a && _typeof(_a)==='string' && _typeof(_b)!=='undefined'){if(_typeof(_b)==="string" && _b.length<=0){this[0].removeAttribute(_a);}else{this[0].setAttribute(_a,_b);}}
			if(_a && _typeof(_a)==='string' && _typeof(_b)==='undefined'){return this[0].getAttribute(_a);}
		},
		"parent":function(s,t){
			if(!s){return this[0].parentNode}
			var i=s.charAt(0),n=__n(s),p=this[0].parentNode,_c=function(_e,_n,_i){if(!_e|| !_n){return false}switch(_i){case ".":return E(_e).hasClass(_n);case "#":return (_e.id===_n);default:return ((_e.tagName||"").toLowerCase()===_n.toLowerCase());}};
			while(p){if(_c(p,n,i)){return p}if(_c(p,t,'')){return null}p=p.parentNode}
			return null;},
		"scrollParent":function(e,d){
			e=e||this[0];
			var p=e.parentNode;
			while(p){
				if(p==document.body){return document.body;}
				if((J(p).css("overflowY")=="auto" || J(p).css("overflowY")=="scroll") || (J(p).css("overflowX")=="auto" || J(p).css("overflowX")=="scroll")){
					return p;
				}
				p=p.parentNode;
			}
		},
		"near":function(f,l){
				if(_typeof(f)!=='string' && (f.charAt(0)!=='#' || f.charAt(0)!=='.')){return null;}
				if(f.charAt(0)==='#'){return Eid(f);}

				var e=this[0],r=null,n=f.substr(1),c=0,p=J(e).parent();l=l||1;
				if(f.charAt(0) =='.' && this.hasClass(n)){return e}
				r=J(e).find(f)[0];if(r){return r}
				r=J(e).next(f)[0];if(r){return r}
				r=J(e).prev(f)[0];if(r){return r}
				while(p[0] && c<l){
					if(p.hasClass(n)){return p[0]}
					if(p.find('>'+f)[0]){return p.find('>'+f)[0]}
					p=p.parent();
					c++;
				}
		},
		"offset":function(){
			var e=this[0],
				rl = e.offsetLeft,
				rt = e.offsetTop,
				sl=0,
				st=0,
				c = e.offsetParent;
			while (c !== null){
				rl += c.offsetLeft;
				rt += current. offsetTop;
				c = c.offsetParent;
			}
			if(document.compatMode == "BackCompat"){
				sl=document.body.scrollLeft;
				st=document.body.scrollTop;
			}else{
				sl=document.documentElement.scrollLeft; 
				st=document.documentElement.scrollTop; 
			}
			return {'x':(rl-sl),'y':(rt-st)};
		},
		"options":function(_d){var _e=this[0],_options=J.extend({},(_d||{}),JSON.parse(_e.getAttribute('data-options')||'{}'));map(_options,function(k,v){var _a=_e.getAttribute(k)||_e.getAttribute('data-'+k)||_e.getAttribute('data-'+k.toLowerCase());if(_a!==null){_a==="true" && (_a=true);_a==="false" && (_a=false);_a==="null" && (_a=null);isNum(_a) && (_a=parseFloat(_a));_options[k]=_a}});return _options;},
		"isVisible":function(){return (this[0].offsetWidth===0 && this[0].offsetHeight===0?false:true)},
		"isout":function(event){var _tgt=(event.type=="mouseout")?event.relatedTarget:event.target;return (_tgt===this[0] || J(this[0]).find(_tgt).get(0)?false:true);},
		"of":function(of){of?this.addClass('on'):this.removeClass('on');},
		"bind":function(){return this.__events.bind.apply(this.__events,[].slice.call(arguments,0))},
		"trigger":function(){this.__events.has(arguments[0]) && this.__events.run(arguments[0],[].slice.call(arguments,1))},
		"run":function(s){if(_typeof(s)!=='string'){return '';}var _slf=this,_fns=s.split('.'),_run=function(t,f){if(_fns.length>1){if(t.hasOwnProperty(f)){_fns.splice(0,1);return _run(t[f],_fns[0]);}}else if(_fns.length===1 && _typeof(t[f])==='function'){t[f].apply(t,[].slice.call(arguments,1));return _slf;}return _slf;};return _run(_slf,_fns[0]);},
		"nextTo":function(b,osf){
			var a=this[0];J(a).removeClass('ps-t','ps-b');
			if(!a||!b){return;}osf=osf||10;
			var bp=J(b).offset(),taget=J(a).find('i.i_target')[0]?J(a).find('i.i_target').get(0):J('<i class="i_target"></i>').appendTo(a).get(0);
			var bl=bp.left+b.offsetWidth/2,bt=bp.top+b.offsetHeight,ws={w:J(window).width(),h:J(window).height()},nl=0,nt=0;
			var p='ps-',_px='',_py='',tgtpos={};

			if((bl+a.offsetWidth/2)>ws.w*0.95){
				nl=bp.left+b.offsetWidth-a.offsetWidth;nt=bt+osf;
			}else if((bl-a.offsetWidth/2)<ws.w*0.05){
				nl=bp.left-osf;nt=bt+osf;
			}else{
				nl=bl-a.offsetWidth/2;nt=bt+osf;
			}
			_py='b';
			if(bp.top>ws.h*0.6){
				_py='t';
				nt=bp.top-a.offsetHeight-osf;
			}
			J(a).offset({'left':nl,'top':nt}).addClass(p+_py+_px);
			J(taget).offset({'left':bl-taget.offsetWidth/2,'top':bt+osf-taget.offsetHeight});
		}
	};
	map(__fn,function(k,v){_E.prototype[k]=function(){return (this[0]?v.apply(this,[].slice.call(arguments,0)):'');}});
}
function isout(e,ev){if(!isE(e)){return true}var _tgt=(ev.type=="mouseout")?ev.relatedTarget:ev.target;return (_tgt===e || J(e).find(_tgt).get(0)?false:true)}
function JDelayout(es,f,t,a){
	var _S=this;
		_S.es=es;
		_S.timed=timed(null,t||250);
		_S.auto=(a===false)?false:true;
		_S.handle=(typeof(f)==="function"?f:function(){return true});
	var _isout=function(event){
			if(_typeof(_S.es)==="array"){
				for(var i=0,l=_S.es.length;i<l;i++){
					if(!isout(_S.es[i],event)){return false;}
				}
				return true;
				}
				return isout(_S.es,event);
		};
		_S.__out=function(event){
			 _S.timed.run(function(){if(_isout(event)){_S.handle(event); _S.auto && _S.stop()}});
		};
		_S.stop=function(){this.timed.clear();J(document).off("mousemove",_S.__out);};
		_S.start=function(es,f){
			_S.stop();
			_S.es=es||_S.es;
			_S.handle=(typeof(f)==="function"?f:_S.handle);
			J(document).on("mousemove",_S.__out);
		};
}
!(function(n,Ui){
"use strict";
	if(window[n]){return ;}
	window[n]=Ui;
	Ui.ui=function(a,b){if(a && !b){return Ui.ui[a];}if(a && b){return Ui.ui[a]=b;}};
	Ui.A=document.createElement('a');
	Ui.A.href = window.location.href;
	Ui.URI ={"href": Ui.A.href,"protocol":Ui.A.protocol,"hostname":Ui.A.hostname,"port":Ui.A.port,"host":Ui.A.host};

	Ui.topwindow=function(w){var t=w.parent;while(t!=w){w=t;t=w.parent;}return t;};
	Ui.wintop=(function(w){var _p=w.parent,_r=w;try{if(_p.document.body){_r=__getTopWin(_p);}else{_r=_p;}}catch(e){}return _r;})(window);
	try{window.top.document.body;Ui.wintop=window.top;}catch(e){}
	Ui.window=window;

	Ui.istouch = "ontouchend" in document ? true : false;

	Ui.storage=function(k){return new JStorage(k);};
	Ui.get=function(n,d){return (Ui.hasOwnProperty(n)?Ui[n]:(Ui[n]=d));};
	Ui.instances=new JMatrix('instances',{arrange:[],priority:0,inited:false,readyed:false,install:function(){
			if(Ui.instances.inited){return ;}
			Ui.instances.readyed=true;
			Ui.instances.arrange.sort(function(a,b){if(a.priority>b.priority){return 1;}else if(a.priority<b.priority){return -1;}else{return 0;}});
			for(var i=0,l=Ui.instances.arrange.length;i<l;i++){
				var k=Ui.instances.arrange[i].key;
				if(
					!Ui.instances[k]['inited'] &&
					Ui.ui[Ui.instances[k].initial.p['fn']]['domready'] &&
					(typeof(Ui.ui[Ui.instances[k].initial.p['fn']]['initialize'])=='function')
				  ){
					Ui.instances[k].fn=function(){this[arguments[0]].apply(this,[].slice.call(arguments,1))};
					Ui.instances[k]=J.extend(new Ui.ui[Ui.instances[k].initial.p.fn].initialize(Ui.instances[k].initial.p),Ui.instances[k]);
					Ui.instances[k].inited=true;
					for(var i in Ui.instances[k].initial.fns){if(typeof(Ui.instances[k][i])=='function'){Ui.instances[k][i].apply(Ui.instances[k],Ui.instances[k].initial.fns[i]);}}
				  }
			}
			Ui.instances.arrange=[];
			Ui.instances.priority=0;
			Ui.instances.inited=true;
	}});

	Ui.dCsn=function(el,SRgx){if(!el){return '';}var csn=el.className;if(!el||!SRgx||!csn){return}csn=csn.replace(stringToRegExp('[ ]*/b'+SRgx+'/b','g'),'');el.className=csn.trim();};
	Ui.gNear=function(el,fnd,lev){el=J(el);if(!el[0] || !fnd){return J()}if(fnd.charAt(0)==='#'){return J(fnd);}if(el.hasClass(fnd.substr(1))){return el} if(el.find(fnd)[0]){return el.find(fnd)}if(el.next(fnd)[0]){return el.next(fnd)}if(el.prev(fnd)[0]){return el.prev(fnd)}if(el.parent().hasClass(fnd.substr(1))){return el.parent()}if(!lev||(lev==0) ){return J()}var eParent=el.parent(),o=J();for(var i=lev;i>0;i--){o=eParent.find(fnd)[0];if(o){return eParent.find(fnd);}eParent=eParent.parent();}return J(o);};

	Ui.__loadingIcon='data:image/svg+xml;utf8,<svg class="ui-loaded" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid meet"><g  width="30" height="30"><path d="M23.05,2.7a14.83,14.83,0,0,1,4,4.24,14.75,14.75,0,0,1,2.1,6.41,14.3,14.3,0,0,1-1.37,7.32,14.61,14.61,0,0,1-2.17,3.23,15,15,0,0,1-3,2.52A14.69,14.69,0,0,1,18.93,28a13.77,13.77,0,0,1-1.91.34,15.85,15.85,0,0,1-2,.09,14.87,14.87,0,0,1-3.85-.72,14.25,14.25,0,0,1-3.41-1.77,14.25,14.25,0,0,1-2.69-2.6A13.57,13.57,0,0,1,3.27,20.2a13.45,13.45,0,0,1-.53-1.67l-0.18-.84c-0.06-.28-0.06-0.52-0.1-0.78a13.67,13.67,0,0,1-.09-1.81V14.89a0.54,0.54,0,0,0,0,.09l0-.2,0-.41c0-.27,0-0.54.08-0.8A12.79,12.79,0,0,1,4.75,8.16,12.43,12.43,0,0,1,8.36,4.86a11.61,11.61,0,0,1,3.45-1.38l0.71-.15c0.21,0,.39,0,0.56-0.06l0.47-.06c0.15,0,.39,0,0.55,0l1.06,0A3.17,3.17,0,0,0,18.23.48L19,0.69A14.37,14.37,0,0,1,23.05,2.7Z" style="fill:none"/><path d="M15,0a15,15,0,1,0,3.24.36A15,15,0,0,0,15,0Zm3.23,0.48L19,0.69a14.37,14.37,0,0,1,4.09,2,14.83,14.83,0,0,1,4,4.24,14.75,14.75,0,0,1,2.1,6.41,14.3,14.3,0,0,1-1.37,7.32,14.61,14.61,0,0,1-2.17,3.23,15,15,0,0,1-3,2.52A14.69,14.69,0,0,1,18.93,28a13.77,13.77,0,0,1-1.91.34,15.85,15.85,0,0,1-2,.09,14.87,14.87,0,0,1-3.85-.72,14.25,14.25,0,0,1-3.41-1.77,14.25,14.25,0,0,1-2.69-2.6A13.57,13.57,0,0,1,3.27,20.2a13.45,13.45,0,0,1-.53-1.67l-0.18-.84c-0.06-.28-0.06-0.52-0.1-0.78a13.67,13.67,0,0,1-.09-1.81V14.89a0.54,0.54,0,0,0,0,.09l0-.2,0-.41c0-.27,0-0.54.08-0.8A12.79,12.79,0,0,1,4.75,8.16,12.43,12.43,0,0,1,8.36,4.86a11.61,11.61,0,0,1,3.45-1.38l0.71-.15c0.21,0,.39,0,0.56-0.06l0.47-.06c0.15,0,.39,0,0.55,0l1.06,0A3.17,3.17,0,0,0,18.23.48Z" style="fill:#8a4cc1"/></g></svg>';
	Ui.__imgPlaceHolder='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" style="fill:none;"><rect width="1" height="1" /></svg>';
	Ui.__imgDefault='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  viewPort="0 0 32 32" width="32" height="32" ><polyline points="2.48 22.51 10.43 15.18 22.47 29.54" style="fill:none;stroke:#d0d0d0;stroke-miterlimit:10;stroke-width:1.8460038900375366px"/><polyline points="27.02 26.16 21.78 19.76 17.3 23.38" style="fill:none;stroke:#d0d0d0;stroke-miterlimit:10;stroke-width:1.8460038900375366px"/><circle cx="20.27" cy="11.67" r="3.48" style="fill:none;stroke:#d0d0d0;stroke-miterlimit:10;stroke-width:1.8460038900375366px"/><circle cx="16" cy="16" r="15" style="fill:none;stroke:#d0d0d0;stroke-miterlimit:10;stroke-width:2px"/></svg>';

	Ui.screenWidth=window.screen.availWidth;
	Ui.screenHeight=window.screen.availHeight;

	Ui.scrolltop=0;
	Ui.width=window.innerWidth||window.outerWidth;
	Ui.height=window.innerHeight||window.outerHeight;

	Ui.__direction={'x':{axs:'x',Axs:'X',p:'l',pos:'left',Pos:'Left',s:'w',sz:'width',Sz:'Width',rv:'y'},'y':{axs:'y',Axs:'Y',p:'t',pos:'top',Pos:'Top',s:'h',sz:'height',Sz:'Height',rv:'x'}};
	Ui.__zindex=5000;
	Ui.__hidden=J('<div id="hidden"></div>');
	Ui.__ui=J('<div id="Ui"></div>')[0];
	var __js=document.scripts;__js=(__js[__js.length - 1].src).replace(/ui\.js.*$/gi,"");
	Ui.__src=__js;

	Ui.domready=false;
	Ui.domhtml=document.getElementsByTagName('html');
	Ui.domTitle=document.getElementsByTagName('title');
	Ui.dombody=document.body;

	Ui.__resize=new JMatrix('resize');
	Ui.__ready=new JMatrix('ready');
	Ui.__change = new JMatrix('change');
	Ui.__zChange= new JMatrix('zChange');

	Ui.resize=function(){Ui.__resize.bind.apply(Ui.__resize,[].slice.call(arguments,0));};
	Ui.ready=function(){if(Ui.domready){exe(arguments[0])}else{Ui.__ready.bind.apply(Ui.__ready,[].slice.call(arguments,0));}};
	Ui.change=function(){Ui.__change.bind.apply(Ui.__change,[].slice.call(arguments,0));};
	Ui.hidden=function(e){Ui.__hidden.append(e);};

	Ui.zindex=function(c){
		c=c||0;
		if(_typeof(c)==="number"){Ui.__zChange.run();Ui.__zindex+=11 ;return Ui.__zindex+c}
		if(_typeof(c)==="function"){Ui.__zChange.bind(c);}
	};

	Ui.ready(function(){
		Ui.dombody=document.body;
		Ui.__hidden=Eid('hidden')?J(Eid('hidden')):Ui.__hidden;
		Ui.__hidden.appendTo(Ui.dombody).attr('style','display:none!important;');
	});
	var __DOMchanged=false,__DOMchangeQueue=0,__DOMchangeTimed=timed(null,200),
		__DOMResize=false,__DOMResizeQueue=0,__DOMResizeTimed=timed(null,200);
	J(document).ready(function(){Ui.domready=true;Ui.__ready.run()}).on({
		'DOMNodeInserted':function(event){if(__DOMchanged){__DOMchangeQueue+=1;return;}Ui.__change.run([event]);__DOMchanged=true;__DOMchangeTimed.run(function(){if(__DOMchangeQueue!==0){Ui.__change.run([event]);__DOMchangeQueue=0;}__DOMchanged=false;});},
		'DOMNodeRemoved':function(event){}
	});
	Ui.arouse=function(a,b){return (function(a,b){var _on=false,_arouse=function(){if(a()){b.call(b);J(document).off('mousedown',_delayarouse);J(document).off('mousemove',_arouse);}},_delayarouse=function(){setTimeout(_arouse,150);};_delayarouse();J(document).on({'mousedown':_delayarouse,'mousemove':_arouse});})(a,b);};
	J(window).on({
		'resize':function(event){
			Ui.width=window.innerWidth||window.outerWidth;
			Ui.height=window.innerHeight||window.outerHeight;
			Ui.scrolltop=document.body['scrollTop']||0;
			if(__DOMResize){__DOMResizeQueue+=1;return;}Ui.__resize.run([event]);__DOMResize=true;__DOMResizeTimed.run(function(){if(__DOMResizeQueue!==0){Ui.__resize.run([event]);__DOMResizeQueue=0;}__DOMResize=false;});
		}
	});
	Ui.install=function(s,plugin,options){if(!window[plugin]){return;}
		var _install=function(){J(s).each(function(){if(!E(this).has(plugin)){E(this)[plugin]=true;E(this)[plugin]=new window[plugin](this,options);}else{exe(E(this)[plugin],'install');}})};_install();Ui.change(_install);
	};
	Ui.scrollbarSize=function(){if(Ui.__scrollbarSize){return Ui.__scrollbarSize} var _s=J('<div style="visibility:hidden;position:fixed;width:100px;height:100px;overflow:scroll;"></div>').appendTo(document.body);Ui.__scrollbarSize=_s[0].offsetWidth-_s[0].scrollWidth;_s.remove();return Ui.__scrollbarSize;};
	Ui.indexes=function(a){if(!a||(typeof(a)!=='object'&&_typeof(a)!=='array')){return '';}var r='';if(a.hasOwnProperty('trgarea')){r+=a['trgarea']||'';}if(a.hasOwnProperty('rsparea')){r+=a['rsparea']||'';}if(a.hasOwnProperty('trg')){r+=a['trg']||'';}if(a.hasOwnProperty('rsp')){r+=a['rsp']||'';}return r.replace(/[^a-z0-9A-Z_-]+/g,"");};

	/*Monitor*/
	Ui.masker=new JMasker({opacity:0});
	Ui.drag=function(e,_do){
		var JDrag=function(e,_do){
			var _S=this;
				this.e=e;
				this.win=Ui.wintop;
				this.beginX=0,
				this.beginY=0,
				this.currentX=0,this.currentY=0,
				this.distanceX=0,this.distanceY=0,
				this.masker=Ui.masker,
				this.monitor=new JMatrix({
					"start":new JMatrix(),
					"doing":new JMatrix(),
					"end":new JMatrix()
				});
				var _maskerUp=false,
					_start=function(event){
						_S.beginX=event.screenX;
						_S.beginY=event.screenY;

						_S.masker.win=_S.win;
						_S.masker.zindex=Ui.zindex()+1000000;
						_S.masker.trg=_S.e;

						J(_S.masker.e).on({"mouseout":_out,"mouseup":_end});
						J(document).on({"mouseup":_end,"mousemove":_doing});
						J(_S.win).on("blur",_end);

						_S.monitor.run('start',[event,_S]);
					},
					_doing=function(event){
						_S.currentX=event.screenX;
						_S.currentY=event.screenY;
						_S.distanceX=_S.currentX-_S.beginX;
						_S.distanceY=_S.currentY-_S.beginY;

						if(!_maskerUp && (Math.abs(_S.distanceX)>5 || Math.abs(_S.distanceY)>5)){
							_S.masker.show(0);_maskerUp=true;
						}

						_S.monitor.run('doing',[event,_S]);
						return false;
					},
					_end=function(event){
						J(_S.masker.e).off({"mouseout":_out,"mouseup":_end});
						J(document).off({"mouseup":_end,"mousemove":_doing});
						J(_S.win).off("blur",_end);

						_S.beginX=_S.beginY=_S.currentX=_S.currentY=_S.distaceX=_S.distaceY=0;

						_S.masker.hide(0);_maskerUp=false;
						_S.monitor.run('end',[event,_S]);
					},
					_out=function(event){
						//if(isout(this,event) && isout(_S.e,event)){_end()}
					};

				_typeof(_do)==="object" && map(_do,function(k,v){var mo=this.monitor.get(k);mo && mo.bind(v);},this);

				J(this.masker.e).appendTo(document.body);
				J(e).on({
					'selectstart':function(){return false;},
					'mousedown':_start
				});
		};
		return new JDrag(e,_do);
	};
	Ui.load=function(t,p,s){
		var _load=function(_cr){
			var	_js=function(_src){var j =document.createElement("script");j.src =_src;
				_cr.parentNode.insertBefore(j, _cr);
				//document.head.appendChild(j);
				},
				_css=function(_src){var c=document.createElement('link');c.rel="stylesheet";c.href=_src;
					_cr.parentNode.insertBefore(c, _cr);
					//document.head.appendChild(c);
				},
				_purl=function(_url){__A.href=_url;return __A.host+__A.pathname;},
				_tp=t+'-'+_typeof(p);
			switch(_tp){
				case "css-string":_css(p);break;
				case "css-array":map(p,function(k,v){_css(v)});break;
				case "js-string":_js(p);break;
				case "js-array":map(p,function(k,v){_js(v)});break;
				case "html-string":J(_cr).before(p);break;
				case "html-function":p=p(); p && J(_cr).before(p);break;
			}
			J(_cr).remove();
		};
		if(s){_load(document.getElementById(s));return;}
		if(document.currentScript){
			var _cr,_t=document.currentScript.text||document.currentScript.src;
			map(document.scripts,function(k,v){if(v.text==_t||v.src==_t){_cr=v;return 'break';}});
			_load(_cr);
			return;
		}
		_load(document.scripts[document.scripts.length-1]);
	};
	Ui.ajax=function(params){
		var _params={
			url: '',
			//dataType: 'json', /*"xml","html","script","cache","json","jsonp","text"*/
			//type: "get",
			//cache:false,
			//timeout:4000,
			//dataFilter:function(data, type){},
			//async:true,
			//context:document.body,
			//dataFilter:function(d,t){},
			beforeSend:function(){},
			success:function(){},
			error:function(){},
			complete:function(){}
		},
		__cleanHTML=function(_data,_type){
			if(!_data || _type!=='html'){return _data;}
			var _s1=[],_purl=function(_url){__A.href=_url;return __A.host+__A.pathname;};
			map(document.scripts,function(k,v){v.src && _s1.push(_purl(v.src));});
			map(document.styleSheets,function(k,v){v.href && _s1.push(_purl(v.href));});
			var _m=_data.match(/<script[^\n\r]*?src=['"]([^'"]*)['"].*?<\/script>/g)||[],_m1=_data.match(/<link[^\n\r]*?href=['"]([^'"]*)['"][^>]*?>/g)||[],_a=_m.concat(_m1);_m.length=0;_m1.length=0;
			map(_a,function(k,v){var __m=v.match(/src=['"]([^'"]*\.js)[^'"]*['"]/)||v.match(/href=['"]([^'"]*\.css)[^'"]*['"]/),_url='';if(__m!==null){var _url=_purl(__m[1]);if(_url && inArray(_url,_s1)>=0){_data=_data.replace(v,'');}}});
			return _data;
		};
		var _dataFilter=__cleanHTML;
		if(_params.hasOwnProperty('dataFilter') && _typeof(_params.dataFilter)=='function'){var _df=_params.dataFilter;_dataFilter=function(d,t){d=_df(d,t)||d;return __cleanHTML(d,t);}}
		_params.dataFilter=_dataFilter;
		_params=J.extend({},_params,params);
		_params.url=parseURL(_params.url);

		if(_params.url){return J.ajax(_params);}
		return null;
	};
	window.JL =Ui;
	Ui.inited=true;
})('Ui',function(p,b){
		if(_typeof(p)==='string' && arguments.length>1){Ui.ui[p]=b;return b;}
		if(_typeof(p)==='string' && Ui.instances.has(p)){Ui.instances[p].srcwin=window;return Ui.instances[p];}
		if(_typeof(p)==='object'){
			if(isE(p)){return E(p);}
			if((p instanceof jQuery) && isE(p[0])){return E(p)}
			if(p.hasOwnProperty('fn') && Ui.ui(p.fn)){
				var key=p.hasOwnProperty('key')?p["key"]:(p.fn+Ui.indexes(p)),
					priority=p.hasOwnProperty('priority')?p.priority:(Ui.ui[p.fn].hasOwnProperty('priority')?Ui.ui[p.fn].priority:Ui.instances.priority);
				Ui.instances.priority=priority+1;
				if(Ui.instances.has(key)){
					if(Ui.instances[key].hasOwnProperty('fix') && _typeof(Ui.instances[key].fix)==='function'){Ui.instances[key].fix();}return Ui.instances[key];
				}
				Ui.instances.push(key,{initial:{p:p,fns:{}},inited:false,priority:priority,fn:function(){if(arguments.length<1){return}this.initial.fns[arguments[0]]=arguments[1];}});
				Ui.instances.arrange.push({'key':key,priority:priority});
				if(!Ui.ui[p.fn]['domready'] || Ui.instances['readyed']){
					if(_typeof(Ui.ui[p.fn]['initialize'])=='function'){Ui.instances[key]=new Ui.ui[p.fn].initialize(p);Ui.instances[key].inited=true;}
				}
				return Ui.instances[key];
			}
		}
});

/*---------------------------------------------------*/
function JButton(_params){
	var __params=J.extend({
			'element':J(),
			'icon':null,
			'text':'',
			'tips':'',
			'id':'',
			'classname':'',
			'attributes':'',
			'position':null,
			'disabled':false,
			'hidden':false,
			'click':null,
			'mousedown':null,
			'mousemove':null,
			'mouseup':null,
			'mouseover':null,
			'mouseout':null
		},_params);
	var _S=this;
	var __getHandle=function(n){return __params[n]|| __params[n.toLowerCase()];},
		__parseAttributes=function(a){
			if(_typeof(a)==='object'){return a;}
			if(_typeof(a)==='string'){
				var ps={};a.replace(/(\w+)\s?=\s?(['"]+)([^\s]*)\2/g,function(s,a,b,c){
					ps[a]=c;
					});return ps;}
			return {};
		};
		_S[0]=J(__params.element).get(0) || J('<b></b>')[0];
		_S.e=J(_S[0]);
		_S.id=__params.id||_S[0].id||UUID(2);
		_S.__position=__params.position;
		_S.__text= __params.text ? J('<b>'+__params.text+'</b>'):"";
		_S.__icon=__params.icon?J('<i>'+__params.icon+'</i>'):'';

		_S.tips= __params.tips ? '<b>'+__params.tips+'</b>':"";
		_S.disabled=__params.disabled;
		_S.hidden=__params.hidden;

		var _ats=new JAttr(__params.attributes);
			_ats.set("id",_S.id);
			_S[0].className && _ats.addClass(_S[0].className.split(" "));
			_ats.addClass("b");
			_ats.addClass(__params.classname);



		var __events={
				'click':'click',
				'mousedown':'mousedown',
				'mousemove':'mousemove',
				'mouseup':'mouseup',
				"mouseover":"mouseover",
				"mouseout":"mouseout",
		},
		__setClass=function(){
			_S.e.removeClass('bi').removeClass('bit').removeClass('bt');
			 (_S.__icon && !_S.__text) 	&& (_S.e.addClass('bi'));
			 (_S.__icon && _S.__text) 	&& (_S.e.addClass('bit'));
			 (!_S.__icon && _S.__text)	&& (_S.e.addClass('bt'));
		};
		map(__events,function(k,v){
                	__events[k]=__getHandle(v);
                	(_typeof(__events[k])!=='function') && delete __events[k];
          	});
		_S.disable=function(_of){
			if(_of===true){
				_S.e.addClass('disabled');
				map(__events,function(k,v){_S.e.off(k,__events[k]);});
				_S.disabled=true;
				return;
			}else{
				_S.e.on(__events).removeClass('disabled');
				_S.disabled=false;
				return;
			}
			return _S.e;
		};
		_S.display=function(_of){
			if(_of===true){
				_S.e.css('display','').removeClass('hidden');return;
			}else{
				_S.e.css('display','none').addClass('hidden');return;
			}
			return _S.e;
		};
		_S.addClass=_S.e.addClass;
		_S.removeClass=_S.e.removeClass;
		_S.attr=_S.e.attr;
		_S.removeAttr=_S.e.removeAttr;

		_S.icon=function(_in){
			if(_typeof(_in)!=='string' && (_in.length<=0)){return}
			!_S.__icon && (_S.__icon=J('<i>'+_in+'</i>'));
			J(_S.__icon).html(_in);
			__setClass();
			return _S;
		};
		_S.text=function(_in){
			if(_typeof(_in)!=='string' && (_in.length<=0)){return}
			!_S.__text && (_S.__text=J('<b>'+_in+'</b>'));
			J(_S.__text).html(_in);
			__setClass();
			return _S;
		};
		_S.show=function(){return _S.display(true)};
		_S.hide=function(){return _S.display(false)};
		_S.of=function(of){ of?_S.e.addClass('on'):_S.e.removeClass('on')};
		_S.remove=function(){_S.e.off().remove();return _S;};
		_S.e.attr(_ats.get()).append(_S.__icon).append(_S.__text);
		__setClass();

		_S.e.on({
			'click':function(eve){},
		 	'mousedow':function(eve){if(!_S.disabled){J(_S.e).addClass('prs');}},
			'mouseup':function(eve){J(_S.e).removeClass('prs');}
		 });
		_S.disable(_S.disabled);
		_S.display(!_S.hidden);
		E(_S.e[0]).Button=_S;
}
function JButtons(_id){
	var  _S=this;
		_S.id=_id||UUID(2);
		_S.e=J('#'+_S.id)[0]?J('#'+_S.id):J('<div id="'+_S.id+' " class="'+_S.id+' '+_S.id+'_on"></div>');
		_S.e.addClass('bar');
		var __buttons=new JMatrix(),
		    	__button=function(_button){
		    	    var _b = __buttons.get(_button.id) || new JButton(_button); __buttons.push(_button.id, _b); return _b;
		    	},
		    	__buttonGroup=function(_buttons){
		    		if(_buttons.length<1){return;}
		    		var _bs=J('<span class="bs"></span>');
		    		map(_buttons,function(){
		    			J(__button(_buttons[i]).e).appendTo(_bs);
		    		});
		    		return _bs;
		    	},
		    	__separator=function(_s){
		    		if(_typeof(_s)==='string' && _s.charAt(0)==='|'){return '<b class="spr '+_s.substring(1)+'"></b>';}return null;
		    	},
		    	__element=function(_p){
		    		if(/^\s*<(\w+).*<\/\1>\s*$/.test(_p) && J(_p)[0]){return __button({element:J(_p)})}
				return null;
		    	},
		    	__addbutton=function(_b){
		    		_S.e.append(_b.e);return _b;
		    	};
		_S.button=function(_p,_pos){
			if(!_p){return;}
			var _sep;
			switch(_typeof(_p)){
				case "string":
					_sep=__separator(_p) ;_sep && _S.e.append(_sep);
					var _b=__element(_p);return (_b?__addbutton(_b):__buttons[_p]);
				case "array":
					map(_p,function(i){_S.button(_p[i],_pos);});
				break;
				case "object":
					return __addbutton(__button(_p));
			}
		};
		_S.reset=function(){__buttons.remove();_S.e.empty();};
		_S.remove=function(s){if(__buttons.get(s)){_S.e.remove(__buttons.get(s).e);__buttons.remove(s);}};
		_S.length=function(){return __buttons.length();};
		return this;
}
function JMasker(ops){
		var _S=this;
		this.params=J.extend({},{
			win:window,
			trg:null,
			csn:'',
			zindex:null,
			opacity:0.9,
			blur:false,
			scroll:false,
			timein:300,
			timeout:300,
			shadow:false,
			id:''
		},ops);
		this.win=this.params.win;
		this.id=UUID(2)||this.params.id;
		this.trg=this.params.trg;
		this.zindex=this.params.zindex||Ui.zindex();
		this.e=J('<div class="j_masker '+(this.params.csn)+'" id="'+this.id+'" style="visibility:hidden;opacity:0;"><s></s></div>');
		this.shadow=this.e.find('s')[0];
		this.e.on("mousedown",function(event){event.stopPropagation();return false});
		if(!this.params.scroll){
			this.e.on("mousewheel",function(e){e.preventDefault && e.preventDefault();e.returnValue=false;e.stopPropagation && e.stopPropagation();return false;});
		}
		this.show=function(t){
			var _S=this;
			!J(this.win.document.body).find('>#'+this.id).get(0)&& this.e.appendTo(this.win.document.body);
			if(this.params.shadow && this.trg){var _ofs=J(this.trg).offset();J(this.shadow).css({"left":_ofs.left,"top":_ofs.top,"width":_S.trg.offsetWidth,"height":_S.trg.offsetHeight});}
			if(t===0){
				_S.e.css({'z-index':_S.zindex,'opacity':_S.params.opacity,'visibility':''});
			}else{
				_S.e.css({'z-index':_S.zindex,'opacity':0,'visibility':''}).stop(true,true).animate({opacity:_S.params.opacity},_S.params.timein);
			}
			return this;
		};
		this.hide=function(t,d){
			if(t===0){
				d ? _S.remove():this.e.css('visibility','hidden');
			}else{
				var s=this;s.e.stop(true,true).animate({opacity:0},(t||s.params.timeout),function(){d ? s.remove():s.e.css('visibility','hidden')});return this;
			}
		};
		this.remove=function(){this.e.remove();return this;};
}
/*---------------------------------------------------*/
function JImg(__img,__evs){
	if(_typeof(__img)==='string'){var __newimg=new Image();__newimg.src=__img;__img=__newimg;}
	if(!__img.getAttribute('src') && !__img.getAttribute('source') && (__img.getAttribute("error") || __img.getAttribute("JImg"))){return;}
	__img.setAttribute("JImg","1");
	var __csns=(__img.className||""),
		__shape=function(w,h){var _s="";(w>h) && (_s="wd");(w===h) && (_s="sq");(w<h) && (_s='nw');__csns=__csns.replace(/\b ?wd| ?sq| ?nw\b/gi,"");return (__csns.length>0?__csns+" "+_s:_s);};

	if(!__img.getAttribute('src') && !__img.getAttribute('source')){__img.src=Ui.__imgPlaceHolder;return;}

	var __Img=E(__img).has('JImg')?E(__img).JImg:(function(){
			var _imgdata={
		"img":__img,
		"natural":	(__img.getAttribute('natural')||__img.getAttribute('origin'))||__img.getAttribute('org'),
		"thumbnail":	(__img.getAttribute('thumbnail')),
		"source":	(__img.getAttribute('source')),
		"src":		(__img.getAttribute('src')),
		"title":		(__img.getAttribute('title')||''),
		"alt":		(__img.getAttribute('alt')||''),
		"width":		(parseInt(__img.getAttribute('width'))||__img.width),
		"height":	(parseInt(__img.getAttribute('height'))||__img.height),
		"viewWidth":(__img.offsetWidth),
		"viewHeight":(__img.offsetHeight)
	};
			_imgdata.src=_imgdata.source || _imgdata.src;
			_imgdata.shape=__shape(_imgdata.width,_imgdata.height);
			return _imgdata;
	})();
	if(isEmpty(__evs)){return E(__img).JImg=__Img;}
	imgReady(__Img.src,
		function(_img){/*ready*/
			__Img.width=_img.width;
			__Img.height=_img.height;
			__img.shape=__shape(__Img.width,__Img.height);
			__img.src=__Img.src;
			exe(__evs,'ready',_img);
		},
		function(_img){/*loaded*/exe(__evs,'load',_img);},
		function(_img){/*error*/__img.src=Ui.__imgPlaceHolder;__img.setAttribute("error","1");exe(__evs,'error',_img);}
	);
	return E(__img).JImg=__Img;
}
function JPopuper(ops){
		if(!window.top["__popupers"]){window.top["__popupers"]=new JMatrix();}
		var _S=this;
		_S.__default=J.extend({
			win:window,
			self:window,
			trg:J(),
			masker:true,maskerOpacity:0.9,maskerScroll:false,maskerClass:"",
			event:null,defaultWidth:750,defaultHeight:0.8,
			width:'auto',height:'auto',minwidth:0,maxwidth:0,minheight:0,maxheight:0,offset:0,
			close:'destroy',autoClose:false,
			title:'',content:'',buttons:[],
			blur:true,resize:true,moveable:false,position:'default',
			modal:'html',mode:'popup',
			scrolling:'auto',
			container:'',
			forcedOpen:false,
			x:true,
			ajax:{
				type:"get",
				beforeSend:function(){},
				success:function(){},
				complete:function(){},
				error:function(){}
			},
			timein:0,timeout:300,
			classname:'',
			get:null,
			id:''
		},ops);
		_S.params=J.extend({},_S.__default);

		_S.uuid=UUID(2);
		_S.csn='j_'+this.params.mode;

		_S.monitor=new JMatrix('monitor',{
			'build':new JMatrix(),
			'open':new JMatrix(),
			'fill':new JMatrix(),
			'show':new JMatrix(),
			'hide':new JMatrix(),
			'destroy':new JMatrix(),
			'frameload':new JMatrix(),
			'close':new JMatrix(),
			'ajax':new JMatrix({
				'beforeSend':new JMatrix(),
				'success':new JMatrix(),
				'complete':new JMatrix(),
				'error':new JMatrix()
			})
		});

		_S.opened=false;

		_S.self=_S.params.self||window;
		_S.modal=_S.params.modal||'html';

		_S.trg=J();
		_S.rsp=J();
		_S.box=J();
		_S.bdy=J();
		_S.masker=new JMasker({opacity:this.params.maskerOpacity,scroll:this.params.maskerScroll,csn:this.params.maskerClass||(this.params.classname?this.params.classname+'_masker':'')});
		_S.frame=null;
		_S.ajax=null;
		_S.autoclose=timed(null,3000);
		_S.header=J('<div class="'+_S.csn+'_h"></div>');
		_S.footer =J('<div class="'+_S.csn+'_f"></div>');
		_S.pointer =J('<i class="'+_S.csn+'_p"></i>');
		_S.target="";

		_S.title=null;
		_S.buttons=new JButtons();
		_S.parseURI=function(u){u=parseURI(u);_S.target=u.params['target'];return u.protocol+'//'+u.host+u.pathname+(u.search?u.search+'&po='+_S.id+'&v='+timestamp():'?po='+_S.id+'&v='+timestamp())+u.hash;};
		_S.__modals={
				'html' :function(){return (_S.params.get);},
				'element':function(){return J(_S.params.get);},
				'image':function(){var img = new Image();img.src=_S.params.get=_S.parseURI(_S.params.get);return img;},
				'ajax':function(cb){
					var uri,_ajax=J.extend({},_S.params.ajax);
					_S.params.get=_S.parseURI(_S.params.ajax['url']||_S.params.get);
					_ajax['url']=_S.params.get;
					_ajax['dataType']='html';
					_ajax['beforeSend']=function(){_S.monitor.ajax.run('beforeSend',[].slice.call(arguments,0));};
					_ajax['success']=function(){_S.monitor.ajax.run('success',[].slice.call(arguments,0));};
					_ajax['complete']=function(){_S.monitor.ajax.run('complete',[].slice.call(arguments,0));};
					_ajax['error']=function(){_S.monitor.ajax.run('error',[].slice.call(arguments,0));};
					_S.ajax=Ui.ajax(_ajax);
					return '<i class="loading"><b></b></i>';
				},
				'iframe':function(cb){
					_S.params.get=_S.parseURI(_S.params.get);
					_S.iframe = document.createElement("iframe");
					_S.iframe.src=_S.params.get;
					_S.params.iframename && (_S.iframe.name=_S.params.iframename);
					_S.params.iframename && (_S.iframe.id=_S.params.iframename);
					_S.iframe.frameBorder = 0;
					_S.iframe.setAttribute('allowtransparency','true');
					_S.iframe.onload=function(){
						_S.frame=this.contentWindow;
						try{
							_S.frame.__popuper=_S;
							_S.frame.__source=_S.self;
							_S.title=_S.title||_S.frame.document.title;
							_S.frame.document.documentElement.className="iframe";
						}catch(e){}
						_S.monitor.run('frameload',[_S.frame,_S]);
					};
					return (_S.iframe);
				}
		};
		_S.__positions={
				'near':function(){
					var pY,pX,tw=_S.trg[0].offsetWidth,
						th=_S.trg[0].offsetHeight,
						tl=_S.trg.offset().left,
						tt=_S.trg.offset().top,
						wl=J(_S.self).scrollLeft(),
						wt=J(_S.self).scrollTop(),
						ww=J(_S.self).width(),
						_l=0,_t=0;

					var pX=tw/2+tl;

					if(tw>_S.width){
						_l=pX-_S.width/2;
						_l=_l<(tl-_S.width/5)?tl-_S.width/5:_l;
						_l=_l>(tl+tw-_S.width*0.8)?(tl+tw-_S.width*0.8):_l;
					}else{
						_l=tl-(_S.width/2-tw/2);
					}
					pX='c';_S.pointing=_S.width/2;

					if(_l<wl){pX='l';_l=wl+_S.params.offset;_S.pointing=pX-wl;}
					if((_l+_S.width)>(wl+ww)){pX='r';_l=wl+ww-_S.width-_S.params.offset;_S.pointing=pX-_l;}
					if((tt-_S.height-_S.params.offset)<wt){
						pY='b';_t=tt+th+_S.params.offset;
					}else{
						pY='t';_t=tt-_S.height-_S.params.offset;
					}
					_S.box.css({'top':_t,'left':_l});
					E(_S.pointer[0]).removeClass(_S.csn+'_p_[A-Za-z0-9]*',true);
					_S.pointer.addClass(_S.csn+'_p_'+pY).css('left',tl-_l+tw/2-_S.pointer[0].offsetWidth/2+wl);
				},
				'align':function(){
					var pY,pX,_l,_t,
					tw=_S.trg[0].offsetWidth,
					th=_S.trg[0].offsetHeight,
					tl=_S.trg.offset().left,
					tt=_S.trg.offset().top,
					wl=J(_S.self).scrollLeft(),
					wt=J(_S.self).scrollTop(),
					ww=J(_S.win).width();

					_l=tl+tw/2-_S.width/2;

					(_l<(ww/4))&&(_l=tl);
					((_l+_S.width)>(ww/4*3))&&(_l=tl+tw-_S.width);

					_l>ww && (_l=ww-_S.width);
					_l<0 && (_l=0);

					if((tt-_S.height-_S.params.offset)<wt){
						pY='b';_t=tt+th+_S.params.offset;
					}else{
						pY='t';_t=tt-_S.height-_S.params.offset;
					}
					_S.box.css({'top':_t,'left':_l});

					E(_S.pointer[0]).removeClass(_S.csn+'_p_[A-Za-z0-9]*',true);
					_S.pointer.addClass(_S.csn+'_p_'+pY).css('left',tl-_l+tw/2-_S.pointer[0].offsetWidth/2+wl);
				},
				'follow':function(){
					var tw=_S.trg[0].offsetWidth,
						th=_S.trg[0].offsetHeight,
						xy=_S.trg.offset(),
						tl=xy.left,
						tt=xy.top,
						_l=tl+tw-_S.width,
						_t=tt+th;

					(_l<0)&&(_l=tl);

					_S.box.css({'top':_t,'left':_l});
					_S.box.addClass(_S.csn+'_flw');
				},
				'default':function(){
					var _l=(_S.viewWidth-_S.width)/2,
							_t=(_S.viewHeight-_S.height)/2;
					if(_t<0){_t=0}if(_l<0){_l=0}
					_S.box.css({'top':_t,'left':_l});
				}
		};
}
JPopuper.prototype={
	'on':function(n){var _S=this;if(_S.monitor.has(n)){_S.monitor[n].bind.apply(_S.monitor[n],[].slice.call(arguments,1));}},
	'anchor':function(of){
		if(this.params.modal!=="element"){return ;}
		if(!of && this['__anchor']){
			J(this.__anchor)[this.__anchorInsert](this.rsp);
			delete this.__anchor;
			delete this.__anchorInsert;
			return ;
		}
		if(of && !this['__anchor']){
			var _a=J(this.rsp).prev();
			if(_a[0]){
				this.__anchor=_a[0];this.__anchorInsert='after';
			}else{
				this.__anchor=J(this.rsp).parent()[0];this.__anchorInsert='prepend';
			}
		}
	},
	'reset':function(ops){
		var _S=this;
		J.extend(this.params,this.__default,ops);
		this.Ui=this.params.win['Ui']||window['Ui'];

		this.win=this.params.win||window;
		this.self=this.params.self||window;
		this.frame=null;
		this.container=J(this.params.container)[0]||this.win.document.body;
		this.opened=false;
		this.zindex=this.params.zIndex||this.Ui.zindex();
		this.trg=J(this.params.trg);

		//this.trg[0] && E(this.trg[0]).options(this.params);
		if(isE(this.params.get) || (_typeof(this.params.get)==="string" && (this.params.get.charAt(0)=="."||this.params.get.charAt(0)=="#"))){this.params.modal='element'}

		this.rsp=(this.params.modal==='element'? J(this.params.get):J());


		this.target="";
		this.masker.win=this.win;
		this.masker.params.opacity=this.params.maskerOpacity;
		this.masker.zindex=this.zindex-2;
		this.masker.trg=this.trg[0];

		this.title=this.params.title||'';
		this.width=0;
		this.height=0;
		this.id=this.params.id||this.uuid;
		this.viewWidth=J(this.win).width();
		this.viewHeight=J(this.win).height();

		this.buttons.reset();
		this.buttons.button(this.params.buttons);

		this.params["monitor"] && _S.monitor.bind(this.params.monitor);
	},
	'build':function(){
		var _S=this;
		if(!_S.box[0]){
			_S.box=J('<div class="'+_S.csn+(this.params.classname?' '+this.params.classname:'')+'"  id="'+_S.id+'"  style="position:absolute;left:0;top:0;visibility:hidden;opacity:0"><div  class="'+_S.csn+'_b" style="padding:0;margin:0;border:0;"></div></div>');
			_S.box.appendTo(_S.container).append(_S.pointer);
			_S.bdy=_S.box.find('>.'+_S.csn+'_b');
			if(this.params.x){
				_S.x=J('<b class="'+_S.csn+'_x"></b>').appendTo(_S.box);
				_S.x.on('click',function(){_S.close()});
			}
			if(this.params.blur){this.masker.e.on('click',function(){_S.close()});}
			Ui.resize(function(){_S.resize();});
			E(_S.box[0]).Popuper=this;
		}
		if(this.params.title){
			this.header.html('<h3>'+this.params.title+'</h3>').prependTo(_S.box);
		}else{
			this.header.detach();
		}
		if(this.buttons.length()>0){
			this.footer.append(this.buttons.e).appendTo(_S.box);
		}else{
			this.footer.detach();
		}
		_S.monitor.build.run();
	},
	'resize':function(w,h){
		this.viewWidth=J(this.win).width();
		this.viewHeight=J(this.win).height();
		this.params.width=w||this.params.width;
		this.params.height=h||this.params.height;
		this.position();
	},
	'position':function(){
		var _ps=this.params,
			_w=_ps.width,_h=_ps.height,
			_vw=this.viewWidth,_vh=this.viewHeight;

			this.box.css({'width':'','height':''});
			this.bdy.css({'width':'','height':''});

			(_ps.width==='auto')  && (_w=this.bdy[0].scrollWidth);
			(_ps.width<=1)  && (_w=_vw*_ps.width);

			_w<_ps.minwidth && (_w=_ps.minwidth);
			_w>_ps.maxwidth && _ps.maxwidth!=0 && (_w=_ps.maxwidth);

			_w>_vw && (_w=_vw);

			this.bdy.css({'width':_w});

		var _ot=this.header[0].offsetHeight,_ob=this.footer[0].offsetHeight;

			(_ps.height=='auto') && (_h=this.bdy[0].scrollHeight+_ot+_ob);
			(_ps.height<=1) && (_h=_vh*_ps.height);

			_h<_ps.minheight && (_h=_ps.minheight);
			_h>_ps.maxheight && _ps.maxheight!=0 && (_h=_ps.maxheight);

			_h>_vh  && (_h=_vh);

		this.width=_w;
		this.height=_h;
		this.box.css({'width':_w,'height':_h});
		this.bdy.css({'height':_h-_ot-_ob});
		!this.trg[0] && (_ps.position="default");

		suit(_ps.position,this.__positions);
	},
	'show':function(){
		window.top["__popupers"].push(this.uuid,this);
		var _S=this;
		this.params.masker&& this.masker.show();
		if(this.params.modal==="iframe"){
			this.params.scrolling='no';
			if(this.params.width=="auto"){
				this.params.width=this.params.defaultWidth;
			}
			if(this.params.height=="auto"){
				this.params.height=this.params.defaultHeight;
			}
		}
		this.position();
		
		if(this.params.scrolling=='no'){
			 this.iframe && (this.iframe.scrolling="no");
			 this.bdy.css('overflow','visible');
		}else{
			 this.iframe && this.iframe.removeAttribute('scrolling');
			 this.bdy.css('overflow','');
		}
		this.box.css({'visibility':'visible','z-index':this.zindex});
		this.box.stop(true,true).animate({opacity:1},_S.params.timein);
	},
	'hide':function(im,e){
		var _S=this;
		if(im){
			_S.box.css({'visibility':'hidden','opacity':0});
			_S.masker.hide(0);
			_S.monitor.hide.run();
			_S.anchor(false);
			_S.bdy.empty();
			J(e).trigger("popuperClose");
		}else{
			_S.box.stop(true,true).animate({opacity:0},_S.params.timeout,function(){
				_S.box.css({'visibility':'hidden','opacity':0});
				_S.monitor.hide.run();
				_S.anchor(false);
				_S.bdy.empty();
				J(e).trigger("popuperClose");
			});
			_S.masker.hide();
		}
	},
	'destroy':function(im,e){
		var _S=this;
		if(im){
			_S.monitor.destroy.run();
			_S.anchor(false);
			_S.box.remove();
			_S.masker.hide(0,true);
			J(e).trigger("popuperClose");
		}else{
			_S.box.stop(true,true).animate({opacity:0},_S.params.timeout,function(){
				_S.monitor.destroy.run();
				_S.anchor(false);
				_S.box.remove();
				J(e).trigger("popuperClose");
			});
			_S.masker.hide(null,true);
		}
	},
	'blur':function(){},
	'content':function(cb){
		var _S=this;
		if(this.params.modal==="ajax"){
			_S.monitor.ajax.bind('success',function(dat){
				_S.fill(dat);
				_S.box.attr("src",_S.params.get);
				_S.position();
			});
		}
		return this.__modals[this.params.modal](cb);
	},
	'fill':function(c){
		this.anchor(true);
		this.bdy.html(c);
		this.monitor.fill.run();
	},
	'open':function(ops){
		if(this.opened){return;}
		this.reset(ops);
		var _S=this,c=this.content();
		if(!c){return;}

		this.opened=true;
		this.build();
		this.fill(c);
		this.show();
		this.monitor.open.run();

		this.self.__popuper=this;
		this.trg.trigger("popuperOpen");
		if(this.params.autoClose){
			_S.autoclose.id && _S.autoclose.clear();
			_S.autoclose.run(function(){_S.close()},_S.params.autoClose);
		}
	},
	'close':function(im){
		this[this.params.close](im,this.trg[0]);
		this.monitor.close.run();
		this.opened=false;
		this.trg=J();
		this.self.__popuper=null;
		if(window.top["__popupers"]){window.top["__popupers"].remove(this.uuid);}
	}
};
JPopuper.prototype.constructor=JPopuper;
/*---------------------------------------------------*/
function JRatio(e,p){
	var _S=this;
	_S.installed=false;
	E(e).set('JRatio',this);
	var _ps=J.extend({
		ratio:'',
		inc:'',
		min:'',
		max:'',
		imi:'',
	},p);
	var _size=function(){
			if(!E(e).isVisible()){return;}
			var _hgt=0,
				_rto=parseFloat(e.getAttribute('ratio')||e.getAttribute('rto')||"")||_ps.ratio,
				_inc = e.getAttribute('inc')||e.getAttribute('increment')||_ps.inc,
				_min = parseFloat(e.getAttribute('min'))||_ps.min,
				_max = parseFloat(e.getAttribute('max'))||_ps.max,
				_imi=e.getAttribute('imitate')||e.getAttribute('imi')||_ps.imi;

				J(e).css('height', '');
				var __inc=0,__isSelecter=function(s){return isNaN(s) &&  (s.charAt(0)==='.'|| s.charAt(0)==='#');};

				if(isNaN(_imi) && (_imi==='screen'||_imi==='window'||_imi==='parent'||  __isSelecter(_imi) )){
					var _imi_p=J(e).parent()[0];
					switch(_imi){
						case "window":_imi=(window.innerHeight||window.outerHeight);break;
						case "screen":_imi=(window.innerHeight||window.outerHeight);_inc && (__inc=(e.offsetTop!==0 ? (0-J(e).offset().top+0):0));break;
						case "parent":_imi=(_imi_p?_imi_p.offsetHeight:0);J(e).parent()[0] && (__inc=(0-J(e).offset().top+J(_imi_p).offset().top));break;
						default:
							var _imie=J(_imi)[0];
							if(_imi.charAt(0)==="."){_imie=E(e).parent(_imi)||J(_imi)[0];}
							if(_imie){
								_imi=_imie.offsetHeight;
								__inc=(e.offsetTop!==0 ? (0-J(e).offset().top+J(_imie).offset().top):0);
							}else{
								_imi=0;
							}
						break;
					}
				}
				__isSelecter(_inc)  && (_inc=0-(J(_inc)[0]?J(_inc)[0].offsetHeight:0));
				_inc=parseFloat(_inc);

				isNaN(_imi) && (_imi=0);
				isNaN(_inc) && (_inc=0);

				_inc+=__inc;

				_hgt = _rto ? Math.floor(_rto * e.offsetWidth):"";
				_min = _min ? Math.floor(_min * e.offsetWidth) : "";
				_max = _max ? Math.floor(_max * e.offsetWidth) : "";

				_hgt=(_imi||_hgt)+_inc;
				_hgt<=0 && (_hgt='');
				J(e).css({'height': _hgt,'min-height': _min,'max-height': _max});

				_S.installed=true;
		};
		Ui.resize(_size);
		_S.install=function(){
			if(_S.installed){return;}
			E(e).isVisible()?_size():untill(function(){return E(e).isVisible()},function(){_size()},null,1);
		};
		_S.install();
}
function JScroller(e){
	if(!e || Ui.istouch){return null;}
	var _S=this;
	this.e=e;
	this.parent=J(this.e).parent().get(0);
	this.md=Ui.__direction;
	this.scrollbarSize=Ui.scrollbarSize();

	this.scrollDistance=100;
	this.scrollTop=0;this.scrollLeft=0;
	this.width=0;this.height=0;
	this.scrollWidth=0;this.scrollHeight=0;

	E(e).set('JScroller',this);

	var scrollbar=function(dir){
		var _s=this,
			axs=Ui.__direction[dir],
			xb=(_S.e.scrollWidth>_S.e.offsetWidth),
			yb=(_S.e.scrollHeight>_S.e.offsetHeight),
			_bs=_S.scrollbarSize;

		_s.je=J('<s class="scrollbar'+axs.Axs+'" style="display:block;position:absolute;width:0px;height:0px;visibility:hidden;"><b></b></s>').appendTo(J(_S.e).parent());
		_s.e=_s.je[0];
		_s.bar=_s.e,
		_s.handle=_s.je.find('b')[0];

		var viewSize=_S.e['offset'+axs.Sz],
			currentSS=_S.e['scroll'+axs.Pos],
			currentPos=_S.e['scroll'+axs.Pos];

		var scrollLimit=function(){return _S.e['scroll'+axs.Sz]-viewSize},
			dragLimit=function(){return (_s.bar['offset'+axs.Sz]-_s.handle['offset'+axs.Sz])};

		_s.drag=Ui.drag(_s.handle);
		_s.pos=function(){
			var _p=_S.e['scroll'+axs.Pos]/scrollLimit()*dragLimit();
			_p=(_p>(_s.bar['offset'+axs.Sz]-_s.handle['offset'+axs.Sz]))?(_s.bar['offset'+axs.Sz]-_s.handle['offset'+axs.Sz]):_p;
			J(_s.handle).css(axs.pos,_p);
		};
		_s.init=function(){
			var _hs,_bal,_bat,_bah,_baw,bat,__bs;
			if(axs.axs==='x'){
				__bs=yb?_bs:0;
				_s.je.css({'left':0,'bottom':0});
				_baw=_S.e.offsetWidth;
				_bah=_bs;
			}else{
				__bs=xb?_bs:0;
				_s.je.css({'right':0,'top':0});
				_baw=_bs;
				_bah=_S.e.offsetHeight;
			}
			viewSize=_S.e['offset'+axs.Sz]-__bs;
			_s.je.css({'width':_baw,'height':_bah});

			J(_s.bar).css(axs.sz,viewSize);

			_hs=_s.bar['offset'+axs.Sz]-scrollLimit()/_S.e['scroll'+axs.Sz]*_s.bar['offset'+axs.Sz];
			_hs=_hs>_s.bar['offset'+axs.Sz]?_s.bar['offset'+axs.Sz]:_hs;

			J(_s.handle).css(axs.sz,_hs);
			if(_S.e['scroll'+axs.Sz]<=_S.e['offset'+axs.Sz]){
				J(_s.bar).css('visibility','hidden');
			}else{
				J(_s.bar).css('visibility','');
			}
			_s.pos();
		};
		_s.scroll=function(){_s.pos();};
		_s.active=function(of){
			if(of){
				_s.e.style.visibility="";
				J(_s.e).appendTo(J(_S.e).parent());

			}else{
				_s.e.style.visibility="hidden";
				J(_s.e).detach();
			}
		};

		var chp=0;
		_s.drag.monitor.bind({
			"start":function(){chp=J(_s.handle).position()[axs.pos];_s.je.addClass("on");},
			"doing":function(){J(_S.e)['scroll'+axs.Pos]((chp+_s.drag['current'+axs.Axs]-_s.drag['begin'+axs.Axs])/dragLimit()*scrollLimit());	},
			"end":function(){chp=J(_s.handle).position()[axs.pos];_s.je.removeClass("on");},
		});
		J(_S.e).on('scroll',_s.scroll);
		J(_s.bar).on({
			'click':function(event){
				var	_hs=_s.handle['offset'+axs.Sz],
					_hp=J(_s.handle).offset()[axs.pos]-J(_s.bar).offset()[axs.pos],
					ckp=(event['page'+axs.Axs]-J(_s.bar).offset()[axs.pos]),
					np=ckp;
					if(ckp<_hp){np=ckp;}
					if(ckp>(_hp+_hs)){np=ckp-_hs;}
					J(_S.e)['scroll'+axs.Pos](np/dragLimit()*scrollLimit());
			}
		});
		E(_s.je).set("scrollbar",this);
	};

	var ready=false,xb=false,yb=false,
		sw=0,sh=0,
		ox=J(_S.e).css('overflow-x'),
		oy=J(_S.e).css('overflow-y');
		ox=(ox=="auto")||(ox=="scroll");
		oy=(oy=="auto")||(oy=="scroll");

	(J(_S.parent).css('position')==='static') && J(_S.parent).css('position','relative');
	//J(_S.e).css("overflow","hidden");

	_S.scrollbarx=new scrollbar('x');
	_S.scrollbary=new scrollbar('y');
	_S._install=function(){
		if(_S.e.offsetWidth===0 || _S.e.offsetHeight===0){return}
		if(ox){
			if(_S.width!==_S.e.offsetWidth || _S.scrollWidth!==_S.e.scrollWidth){
				_S.width=_S.e.offsetWidth;
				_S.scrollWidth=_S.e.scrollWidth;
				_S.scrollbarx.init();
				_S.scrollbarx.active((_S.scrollWidth-10)>_S.width);
			}
		}else{_S.scrollbarx.active(0)}
		if(oy){
			if(_S.height!==_S.e.offsetHeight || _S.scrollHeight!==_S.e.scrollHeight){
				_S.height=_S.e.offsetHeight;
				_S.scrollHeight=_S.e.scrollHeight;
				_S.scrollbary.init();
				_S.scrollbary.active((_S.scrollHeight-10)>_S.height);
			}
		}else{_S.scrollbarx.active(0)}
		return ;
	};
	//J(_S.parent).on("mousemove",_S._install);
	J(_S.e).on({
		// "mousewheel":function(event,wheel){
		// 	if((_S.e.scrollTop+_S.e.offsetHeight)>_S.e.scrollHeight-4 && wheel<0){return}
		// 	event.preventDefault();J(_S.e).scrollTop(_S.scrollTop+(0-wheel*_S.scrollDistance));
		// },
		"mouseenter":function(){_S._install();},
		"scroll":function(){_S.scrollTop=_S.e.scrollTop;},
		"resize":function(){_S._install();}
	});
	Ui.resize(function(){J(_S.e).triggerHandler("resize")});
	_S._install();
	this.installed=true;
}
function JTips(optns){
		var _default=J.extend({
			win:window,
			trg:null,
			get:'',
			x:false,
			for:".tips",
			close:'hide',
			id:'',classname:'',masker:false,maskerOpacity:0,
			blur:true,moveable:false,
			stay:false,position:'near',
			width:'auto',height:'auto',
			modal:'html',background:true,offset:10,
			delayin:500,delayout:200,minwidth:30,maxwidth:400,
			title:false,
			mode:"tips"
		},optns);

		var tiper=new JPopuper(_default);
		tiper.on('open','trgon',function(){tiper.trg.addClass('up');});
		tiper.on('close','trgoff',function(){tiper.trg.removeClass('up');});

		var timedIn=timed(null,_default.delayin),timedOut=timed(null,_default.delayout),_focus=null,
			_isout=function(event,bl){return (!bl ? isout(tiper['trg'][0],event) && isout(tiper['box'][0],event) && isout(tiper.masker.shadow,event):isout(tiper['trg'][0],event) && isout(tiper.masker.shadow,event));},
			_off=function(){J(window).off('blur',_out);J(document).off('mousemove',_out);},
			_out=function(event){
				if(tiper.opened){
					if(!tiper['trg'][0]){tiper.close(true);_off();return;}
					if(timedOut.id===0 ){
						timedOut.run(function(){
							if(_default.stay && _isout(event)){tiper.close(true);_off();return ;}
							if(!_default.stay && _isout(event,true)){tiper.close(true);_off();return ;}
						});
				   }else{
						if(_default.stay && !_isout(event)){timedOut.clear()}
						if(!_default.stay && !_isout(event,true)){timedOut.clear()}
				   }
				}else{
					if(_focus && E(_focus).isout(event)){timedIn.clear();_focus=null;}
				}
		};
		J(document).on({
			'mouseover':function(event){event.preventDefault();
				_focus=this;
				if(tiper.opened && tiper.trg[0]===this){return '';}
				if(tiper.opened && tiper.trg[0]!==this){timedOut.clear();tiper.close(true);}
				var ops=_getOptions(this,_default);
				ops.trg=J(this);
				ops.event=event;
				ops.area=this.offsetParent;
				if(!ops.get){return;}
				timedIn.clear();
				timedIn.run(function(){tiper.open(ops);});
				J(document).on('mousemove',_out);
				J(window).on('blur',_out);
				return '';
			}
		},_default.trg);
		function _getOptions(trg,_prms){
				if(!trg){return J.extend({},_prms);}
				var _E=E(trg),_ops=J.extend({},_prms,_E.options({"get":_prms.get,"title":_prms.title,"alt":"","modal":_prms.modal,"tips":""}));
				_ops.trg=trg;

				!_E.has('ops') && _E.set("ops",{});
				var tipcontent=_ops.tips||_ops.title||_ops.alt||_prms.get;

				if(!_E.ops["get"]){

					if(!_E.ops["get"] && isSelecter(tipcontent)){
						var _e=E(trg).near(_E.attribute('rsp')||tipcontent,0);

						if(_e){
							_E.ops.get=isE(_e)?_e:null;
							_E.ops.modal='element';
						}
					}
					if(!_E.ops["get"] && J(trg).find(_prms.for)[0]){

						_E.ops.get=J(trg).find(_prms.for)[0];
						_E.ops.modal='element';
					}

					if(!_E.ops["get"] && tipcontent){
						_E.ops.get='<span class="text">'+tipcontent+'</span>';
						_E.ops.modal='html';
						_E.ops.title="";

						trg.removeAttribute('title');
                        trg.removeAttribute('alt');
					}
				}
				return J.extend(_ops,_E.ops);
		}
		return tiper;
};
function JPopupers(prms){
	var PO=function(_ops){
				var _S=this;
				this.options=J.extend({},{
					win:window,
					self:window,
					trg:'.pop',get:'',
					iframePreload:false,iframename:'',
					id:'',classname:'',mask:true,buttons:null,x:true,
					blur:false,resize:true,moveable:false,background:false,
					ev:'click',stay:true,zindex:10000,autoClose:false,timein:750,
					modal:'iframe',
					mode:'popup'
				},_ops);
				this.win=this.options.win;
				this.self=this.options.self;
				this.popups=new JMatrix('popups');
				this.popup={};
				this.popupkey=0;
		};
		PO.prototype.getOptions=function(trg,optns){
			if(!trg){return J.extend({},this.options,optns);}
			var _E=E(trg),_ops=J.extend({},this.options,optns,_E.options(this.options));

			_ops.trg=trg;
			_ops.get=_E.attribute('get')||_ops.get;
			_ops.title=_E.attribute('title')||_ops.title;

			if(isSelecter(_ops.get)){
				_ops.modal='element';
				_ops.get=J(_ops.get)[0];
			}
			if( (_ops.modal==='iframe' || _ops.modal==='ajax')){
				_ops.get=_E.attribute('get')||_E.attribute('href')||_ops.get;
			}

			if(_ops.modal==='element'){
				if(_ops.get instanceof jQuery && _ops.get[0]){
					_ops.get=_ops.get[0]||null;
				}
				if(!isE(_ops.get)){
					var _e=E(trg).near(_E.attribute('rsp')||_ops.get,0);
					_ops.get=isE(_e)?_e:null;
				}
			}
			return _ops;
		};
		PO.prototype.current=function(){
			if(window!=window.parent){
				var uri=new JUri();
				var pid=uri.param("po");
				if(pid && window.parent.E(pid)){
					return window.parent.E(pid).Popuper;
				}
			}
			if(this.popupkey){
				return this.popup;
			}
			return null;
		};
		PO.prototype.source=function(){
			var po=this.current();
			if(po){
				return po.self;
			}
			return _S.popup.self;
		};
		PO.prototype.frame=function(){return _S.popup.frame;};
		PO.prototype.open=function(ops,trg){
            		var _popuper=this.create(ops,trg);
				_popuper && _popuper.open();
			return _popuper;
		};
        PO.prototype.create=function(ops,trg){
            var _S=this,trg=trg||ops.trg;
            if(trg){ops=this.getOptions(trg,ops);}else{ops.trg='';}
			ops=J.extend({},this.options,ops);

			if(!ops.get){return null}

			ops.self = ops.self || this.srcwin;
			ops.zindex+=(this.popups.length()+5);

			var po=new JPopuper(ops);
			var _key=this.popupkey=this.popups.push(po.uuid,po);
			this.popup=this.popups[_key];
			this.popups[_key].monitor.bind('open',null,function(){_S.popups[_key].box.on('mouseenter',function(){_S.point(_key);});});
			this.popups[_key].monitor.bind('close',null,function(){_S.popups.remove(_key);_S.point();});

			return this.popups[_key];
		};
		PO.prototype.close=function(prm){
			var _s=this;
			if(!prm){
				var keys=window.top.__popupers.__keys,key=keys[keys.length-1];
				if(key){
					window.top.__popupers.get(key).close();
					window.top.__popupers.remove(key);
				}
				return ;
			}
			if((typeof(prm)=="string") && this.popups[prm]){
				this.popups[prm].close();
			}
			if((typeof(prm)=="boolean")&&prm){
				this.popups.each(function(key,obj){exe(obj,'close');_s.popups.remove(key)});
			}
		};
		PO.prototype.get=function(key){
			if(!key){
				return this.popup;
			}else{
				return this.popups.get(key);
			}
		};
		PO.prototype.point=function(pointo){
			if(pointo && this.popups[pointo]){
				this.popupkey=pointo;this.popup=this.popups[this.popupkey];return;
			}
			if(this.popups.__keys.length>0){
				this.popupkey=this.popups.__keys[this.popups.__keys.length-1];this.popup=this.popups[this.popupkey];return;
			}else{
				this.popup=null;this.popupkey='';return;
			}
		};
		var po= new PO(prms);
		J.extend(prms,{win:prms.win||Ui.wintop,self:window.self});
		function assign(po,optns){
			if(!optns.trg){return;}
			J(document).on('click',optns.trg,function(event){
				optns.event=event;
				optns.self=event.view.self;
				E(this).popuper=po.open(optns,this);
				event.preventDefault();
				return false;
			});
		}
		if(prms.win!=prms.self){if(!prms.win['Ui']){prms.win['Ui']=Ui}}
		assign(po,prms);
		return po;
}

Ui.instances.install();

