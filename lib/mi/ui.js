/*jLayout v11 IE8+ */
/*prototypes*/
String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ""); };
Array.prototype.isin=function(e){var a=this,l=a.length;if(l<1){return false};for (var i=0;i< l;i++){if( i in a && a[ i ] === e){return true;}}return false;}
Array.prototype.indexOf = function(e,i){var l;if(this){l = this.length;i = i ? i < 0 ? Math.max( 0, l + i ) : i : 0;for ( ;i < l;i++ ){if ( i in this && this[ i ] === e ){return i;}}}return -1;};

/*Plugins*/
/*Base64.encode(),Base64.decode()*/(function(global){"use strict";var _Base64=global.Base64;var version="2.1.9";var buffer;if(typeof module!=="undefined"&&module.exports){try{buffer=require("buffer").Buffer}catch(err){}}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";var b64tab=function(bin){var t={};for(var i=0,l=bin.length;i<l;i++)t[bin.charAt(i)]=i;return t}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length<2){var cc=c.charCodeAt(0);return cc<128?c:cc<2048?fromCharCode(192|cc>>>6)+fromCharCode(128|cc&63):fromCharCode(224|cc>>>12&15)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}else{var cc=65536+(c.charCodeAt(0)-55296)*1024+(c.charCodeAt(1)-56320);return fromCharCode(240|cc>>>18&7)+fromCharCode(128|cc>>>12&63)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob,cb_utob)};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3],ord=ccc.charCodeAt(0)<<16|(ccc.length>1?ccc.charCodeAt(1):0)<<8|(ccc.length>2?ccc.charCodeAt(2):0),chars=[b64chars.charAt(ord>>>18),b64chars.charAt(ord>>>12&63),padlen>=2?"=":b64chars.charAt(ord>>>6&63),padlen>=1?"=":b64chars.charAt(ord&63)];return chars.join("")};var btoa=global.btoa?function(b){return global.btoa(b)}:function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)};var _encode=buffer?function(u){return(u.constructor===buffer.constructor?u:new buffer(u)).toString("base64")}:function(u){return btoa(utob(u))};var encode=function(u,urisafe){return!urisafe?_encode(String(u)):_encode(String(u)).replace(/[+\/]/g,function(m0){return m0=="+"?"-":"_"}).replace(/=/g,"")};var encodeURI=function(u){return encode(u,true)};var re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var cb_btou=function(cccc){switch(cccc.length){case 4:var cp=(7&cccc.charCodeAt(0))<<18|(63&cccc.charCodeAt(1))<<12|(63&cccc.charCodeAt(2))<<6|63&cccc.charCodeAt(3),offset=cp-65536;return fromCharCode((offset>>>10)+55296)+fromCharCode((offset&1023)+56320);case 3:return fromCharCode((15&cccc.charCodeAt(0))<<12|(63&cccc.charCodeAt(1))<<6|63&cccc.charCodeAt(2));default:return fromCharCode((31&cccc.charCodeAt(0))<<6|63&cccc.charCodeAt(1))}};var btou=function(b){return b.replace(re_btou,cb_btou)};var cb_decode=function(cccc){var len=cccc.length,padlen=len%4,n=(len>0?b64tab[cccc.charAt(0)]<<18:0)|(len>1?b64tab[cccc.charAt(1)]<<12:0)|(len>2?b64tab[cccc.charAt(2)]<<6:0)|(len>3?b64tab[cccc.charAt(3)]:0),chars=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(n&255)];chars.length-=[0,0,2,1][padlen];return chars.join("")};var atob=global.atob?function(a){return global.atob(a)}:function(a){return a.replace(/[\s\S]{1,4}/g,cb_decode)};var _decode=buffer?function(a){return(a.constructor===buffer.constructor?a:new buffer(a,"base64")).toString()}:function(a){return btou(atob(a))};var decode=function(a){return _decode(String(a).replace(/[-_]/g,function(m0){return m0=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};var noConflict=function(){var Base64=global.Base64;global.Base64=_Base64;return Base64};global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict};if(typeof Object.defineProperty==="function"){var noEnum=function(v){return{value:v,enumerable:false,writable:true,configurable:true}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)}));Object.defineProperty(String.prototype,"toBase64",noEnum(function(urisafe){return encode(this,urisafe)}));Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,true)}))}}if(global["Meteor"]){Base64=global.Base64}})(this);
/*md5()*/!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;var e,i,a,h,d,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,h=v,d=m,l=o(l,g,v,m,n[e],7,-680876936),m=o(m,l,g,v,n[e+1],12,-389564586),v=o(v,m,l,g,n[e+2],17,606105819),g=o(g,v,m,l,n[e+3],22,-1044525330),l=o(l,g,v,m,n[e+4],7,-176418897),m=o(m,l,g,v,n[e+5],12,1200080426),v=o(v,m,l,g,n[e+6],17,-1473231341),g=o(g,v,m,l,n[e+7],22,-45705983),l=o(l,g,v,m,n[e+8],7,1770035416),m=o(m,l,g,v,n[e+9],12,-1958414417),v=o(v,m,l,g,n[e+10],17,-42063),g=o(g,v,m,l,n[e+11],22,-1990404162),l=o(l,g,v,m,n[e+12],7,1804603682),m=o(m,l,g,v,n[e+13],12,-40341101),v=o(v,m,l,g,n[e+14],17,-1502002290),g=o(g,v,m,l,n[e+15],22,1236535329),l=u(l,g,v,m,n[e+1],5,-165796510),m=u(m,l,g,v,n[e+6],9,-1069501632),v=u(v,m,l,g,n[e+11],14,643717713),g=u(g,v,m,l,n[e],20,-373897302),l=u(l,g,v,m,n[e+5],5,-701558691),m=u(m,l,g,v,n[e+10],9,38016083),v=u(v,m,l,g,n[e+15],14,-660478335),g=u(g,v,m,l,n[e+4],20,-405537848),l=u(l,g,v,m,n[e+9],5,568446438),m=u(m,l,g,v,n[e+14],9,-1019803690),v=u(v,m,l,g,n[e+3],14,-187363961),g=u(g,v,m,l,n[e+8],20,1163531501),l=u(l,g,v,m,n[e+13],5,-1444681467),m=u(m,l,g,v,n[e+2],9,-51403784),v=u(v,m,l,g,n[e+7],14,1735328473),g=u(g,v,m,l,n[e+12],20,-1926607734),l=c(l,g,v,m,n[e+5],4,-378558),m=c(m,l,g,v,n[e+8],11,-2022574463),v=c(v,m,l,g,n[e+11],16,1839030562),g=c(g,v,m,l,n[e+14],23,-35309556),l=c(l,g,v,m,n[e+1],4,-1530992060),m=c(m,l,g,v,n[e+4],11,1272893353),v=c(v,m,l,g,n[e+7],16,-155497632),g=c(g,v,m,l,n[e+10],23,-1094730640),l=c(l,g,v,m,n[e+13],4,681279174),m=c(m,l,g,v,n[e],11,-358537222),v=c(v,m,l,g,n[e+3],16,-722521979),g=c(g,v,m,l,n[e+6],23,76029189),l=c(l,g,v,m,n[e+9],4,-640364487),m=c(m,l,g,v,n[e+12],11,-421815835),v=c(v,m,l,g,n[e+15],16,530742520),g=c(g,v,m,l,n[e+2],23,-995338651),l=f(l,g,v,m,n[e],6,-198630844),m=f(m,l,g,v,n[e+7],10,1126891415),v=f(v,m,l,g,n[e+14],15,-1416354905),g=f(g,v,m,l,n[e+5],21,-57434055),l=f(l,g,v,m,n[e+12],6,1700485571),m=f(m,l,g,v,n[e+3],10,-1894986606),v=f(v,m,l,g,n[e+10],15,-1051523),g=f(g,v,m,l,n[e+1],21,-2054922799),l=f(l,g,v,m,n[e+8],6,1873313359),m=f(m,l,g,v,n[e+15],10,-30611744),v=f(v,m,l,g,n[e+6],15,-1560198380),g=f(g,v,m,l,n[e+13],21,1309151649),l=f(l,g,v,m,n[e+4],6,-145523070),m=f(m,l,g,v,n[e+11],10,-1120210379),v=f(v,m,l,g,n[e+2],15,718787259),g=f(g,v,m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,h),m=t(m,d);return[l,g,v,m]}function a(n){var t,r="";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function d(n){return a(i(h(n),8*n.length))}function l(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;16>r;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="0123456789abcdef",o="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}function v(n){return unescape(encodeURIComponent(n))}function m(n){return d(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
/*imgReady()*/!function(n,e){"function"==typeof define&&define.amd?define(n,function(){return e}):window[n]=e}("imgReady",function(){var n=[],e=null,t=[["width","height"],["naturalWidth","naturalHeight"]],a=Number("naturalWidth"in new Image),i=function(){for(var t=0;t<n.length;)n[t].end?n.splice(t,1):l.call(n[t++]);n.length&&(e=setTimeout(i,50))||(e=null)},l=function(){(this.complete||this[t[a][0]]!==this.__width||this[t[a][1]]!==this.__height||"loading"==this.readyState)&&(this.end=!0,this.onready(this))};return function(o,r,d,u){r=r||new Function,d=d||new Function,u=u||new Function;var c="string"==typeof o?new Image:o;if(c.onerror=function(){c.end=!0,c.onload=c.onerror=c.onreadystatechange=null,u.call(c,c),c=null},"string"==typeof o&&(c.src=o),c){if(c.complete)return c.onerror=null,r.call(c,c),d.call(c,c),void(c=null);c.__width=c[t[a][0]],c.__height=c[t[a][1]],c.onready=r,l.call(c),c.onload=c.onreadystatechange=function(){c&&c.readyState&&"loaded"!=c.readyState&&"complete"!=c.readyState||(c.onload=c.onerror=c.onreadystatechange=null,!c.end&&l.call(c),d.call(c,c),c=null)},c.end||(n.push(c),!e&&(e=setTimeout(i,50)))}}}());

var J=jQuery,__A=document.createElement('a');
var __types={},__toString = __types.toString;(function(){var __typesNames="Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " );for(var i=0,l=__typesNames.length;i<l;i++){__types["[object "+ __typesNames[i] +"]"]=__typesNames[i].toLowerCase();} })();
function _typeof(o){if ( o == null ) {return o + "";}return typeof o === "object" || typeof o === "function" ?__types[ __toString.call( o ) ] || "object" :typeof o;}
function UUID(n){function S4(){return (((1+Math.random())*0x10000)|0).toString(16).substring(1);}if(!n){return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());}else{ var uuid='';for(var i=0;i<n;i++){uuid+=S4()}return uuid}}
function map (o,f,p){var r="";if(_typeof(f)==='function' && _typeof(o)==='array'){for(var i=0,l=o.length;i<l;i++){r=f.apply((p||o[i]),[i,o[i]]);if(_typeof(r)!=="undefined"){break;return r}}};if(_typeof(f)==='function' && (_typeof(o)==='object'|| _typeof(o)==='function')){for(var k in o){if(o.hasOwnProperty(k) && _typeof(o[k])!=='undefined'){r=f.apply((p||o[k]),[k,o[k]]);if(_typeof(r)!=="undefined"){break;return r}}}};if(_typeof(f)==='function' && _typeof(o)==='number' ){for(var i=0;i<o;i++){r=f.apply((p||f),[i]);if(_typeof(r)!=="undefined"){break;return r}}};}
function inArray (e,a,i){var l;if(a){l = a.length;i = i ? i < 0 ? Math.max( 0, l + i ) : i : 0;for ( ;i < l;i++ ) {if ( i in a && a[ i ] === e ){return i;}}}return -1;}
function JUri(_url){__A.href=_url?_url.replace(/&amp;/gi,'&'):window.location.href;var _ps=function(_s){var _p={};_s.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s, k, v){k!=='v'&& (_p[k] = v);});return _p;};this.url=__A.href;this.protocol = ((!__A.protocol || __A.protocol == ':') ? window.location.protocol : __A.protocol);this.hostname = __A.hostname || window.location.hostname;this.port = __A.port || window.location.port;this.search = __A.search;this.hash = __A.hash;this.host = __A.host || window.location.host;this.pathname =__A.href.replace(this.hash||'','').replace(this.search||'','').replace(this.protocol + '//' + this.hostname, '').replace(':' + this.port, '');this.href = (this.host === window.location.host ? '' : this.protocol + '//' + this.host) + this.pathname+this.search;this.params = (this.search ? _ps(this.search) : {});JUri.prototype.param=function(){if(arguments.length<1){var _q=[];map(this.params,function(k,v){_q.push(k+'='+v);});return _q.join('&');}if(arguments.length===1){return this.params[arguments[0]];}if(arguments.length===2 && _typeof(arguments[1])==='string'){return this.params[arguments[0]]=arguments[1];}};JUri.prototype.query=function(){return (this.host === window.location.host ? '' : this.protocol + '//' + this.host) + this.pathname +this.param();};}
function exe(){var e=arguments;if("function"===_typeof(e[0]))return e[0].apply(e[0],[].slice.call(e,1));if("string"===_typeof(e[0]))for(var t=e[0].split("."),n=window,o=0,i=t.length;i>o;o++)!function(i,r){if(n.hasOwnProperty(t[i])&&r>o)n=n[t[i]];else if(n.hasOwnProperty(t[i])&&"function"==_typeof(n[t[i]]))return n[t[i]].apply(n,[].slice.call(e,1))}(o,i-1);return"object"===_typeof(e[0])&&e[0].hasOwnProperty(e[1])&&"function"===_typeof(e[0][e[1]])?e[0][e[1]].apply(e[0],[].slice.call(e,2)):void 0}
function timestamp(){return new Date().getTime();}
function untill(a,b,c,d){if(typeof(a)!=='function' || typeof(b)!=='function'){return};if(a()){return b()};d=d||5000;var x=11,i=0,_id=setInterval(function(){if(d>x && i>d){typeof(c)==="function" && c();clearInterval(_id);};if(a()){b();clearInterval(_id);};i+=x;},x);}
function spArray(e,a){if(!e || _typeof(a)!=='array'){return a}var idx=inArray(e,a);if(idx>=0){a.splice(idx,1);}return a;}
function uniqueArray(a){var n = {},r=[];for(var i = 0; i < a.length; i++){if (!n[a[i]]){n[a[i]] = true;r.push(a[i]);}}return r;}
function stringToRegExp(s,b,c){s=s.replace(/\//g,"\\");c=c?c:new RegExp();c.compile(s,b);return c;}
function stringToRegString(s){return s.replace(/(\[|\]|\(|\)|\.|\^|\$|\*|\+|\{|\}|\?)/g,"/$1");}
function sortObjectByKeys(obj){var tmp={};Object.keys(obj).sort().forEach(function(k){tmp[k]=obj[k]});return tmp;}
function isEmpty(v){if(v === null || _typeof(v) === 'undefined' || v === ''){return true;};if((_typeof(v)==="string" && v.length>0)||_typeof(v)==="number"){return false;}if(_typeof(v)==="array" && v.length>0){return false;}if(_typeof(v)==="object"){for (var k in v){if(hasOwnProperty.call(v,k)){return false;}}};return true;}
function timed(_f,_t,_rp){return (_rp?new JDitto(_f,_t):(new JDelay(_f,_t)));}
function suit(k,fs){if(_typeof(fs)==='object'){if(fs.hasOwnProperty(k) && _typeof(fs[k])==='function'){return fs[k].call();}if(fs.hasOwnProperty('default') && _typeof(fs['default'])==='function'){return fs['default'].call();}}}
function isNum(s){ return /^[+-]?[0-9]+(\.[0-9]+)?$/.test(s)}
function absorb(b,n){map(b,function(k,v){n.hasOwnProperty(k) && (b[k]=n[k]);});return b;}
function imgToBase64(imgsrc,callback){function _Base64Image(img){var canvas = document.createElement("canvas");canvas.width = img.width;canvas.height = img.height;var ctx = canvas.getContext("2d");ctx.drawImage(img, 0, 0, img.width, img.height);var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();var dataURL = canvas.toDataURL("image/"+ext);return dataURL;}var image = new Image();image.crossOrigin = '';image.src = imgsrc;image.onload = function(){var base64 = _Base64Image(image);callback(base64);}}
function parseURL(_url){_url=_url.replace(/&amp;/gi,'&');var _A=window['__A']||document.createElement('a');_A.href=_url;return _A.href;}
function parseURI(_url){return new JUri(_url);}
function trim(s){s=(s||"").toString();return s.replace(/^\s+|\s+$|[\r\n]+&/g, "")}
function confine(a,b,c){var d=false;if(b){for (var i=0,l=b.length;i < l;i++ ){if(b[i] === a){d=true;break;}}};if(typeof(c)==='function'){c.call(this,a);}return d;}
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
function JStorage(key,bool){
	this.key=key;
	this.storage=(bool ? window.sessionStorage : window.localStorage) || window.sessionStorage;
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
			case 0:return this._storage;break;
			case 1:return this._storage[arguments[0]];break;
			case 2:return this._storage[arguments[0]] ? this._storage[arguments[0]] : this.set(arguments[0],arguments[1]);break;
		}
	},
	"add":function(k,v){this._storage[k]=v;return this._storage[k];},
	"remove":function(k){delete this._storage[k];this.store();},
	"key":function(k){this.storage.key(k)},
	"clear":function(){this.storage.removeItem(this.key);this._storage={created:timestamp()};this.storage.setItem(this.key,JSON.stringify(this._storage));},
	"getItem":function(k){ return  this.get.apply(this,[].slice.call(arguments,0))},
	"setItem":function(k){ return  this.set.apply(this,[].slice.call(arguments,0))},
	"removeItem":function(k){return  this.remove.apply(this,[].slice.call(arguments,0))}
}
JStorage.prototype.constructor=JStorage;
function JMatrix(a,b){
	this.__key=this.getKey(a);
	this.__keys=new Array();
	this.__privates=new Array('__key','__keys','__privates');
	
	if(arguments.length>=1 && _typeof(a)==='object'){this.extend(a);}
	if(arguments.length>1 && _typeof(b)==='object'){this.extend(b);}
	
	if(this.hasOwnProperty('init') && _typeof(this.init)==='function'){this.init();this.remove('init');}
}
JMatrix.prototype={
	"indexof": 	function (x){ for (var i = 0, l = this.__keys.length;i < l;i++) { if (this.__keys[i] === x) { return i } }; return -1;},
	"length": 	function (){ return this.__keys.length },
	"splice"	:	function(x,a){if(_typeof(a)!='array'){return;};for(var i=0,l=a.length;i<l;i++){if(a[i]==x){a.splice(i,1);return}}},
	"getKey": 	function (a){if (!a) { return UUID(2);} if ((_typeof (a) === 'string') || (_typeof (a) === 'number')) { return a;} if (_typeof (a) === 'object') {!a["__key"] && (a["__key"]=UUID(2));return a.__key }},
	'hasOwn'	:function(key){return (this.hasOwnProperty(key) && !this.privated(key));},
	"has"		:function(key){return (this.indexof(key)>=0?true:false);},
	'get'		:function(key){if(this.has(this.getKey(key))){return this[key]}},
	"extend"	:function(o){if(_typeof(o)==='object'){for(var x in o){if(o.hasOwnProperty(x) && !this[x]){this.push(x,o[x])}}}},
	"privated": 	function () { if (arguments.length === 1) { return (inArray(arguments[0], this.__privates) >= 0 ? true : false);} if (arguments.length === 2) { this[arguments[0]] = arguments[1];this.__privates.push(arguments[0]);} },
	"key": 		function (x){ if (arguments.length < 1) { return this.__key;} var key = this.getKey(x);if (this.has(key)) { return key;};for (var i = 0, l = this.__keys.length;i < l;i++) { if (this.__keys[i] == x) { return this.__keys[i] } };return undefined;},
	"push"		:function(){
		var key=this.getKey(),val;
		switch(arguments.length){
			case 0: return '';break;
			case 1: val=arguments[0];break;
			case 2:key=this.getKey(arguments[0]);val=arguments[1];break;
		};
		this[key]=val;
		if (_typeof (val) === 'object'){ val.__key = key };
		if (inArray(key, this.__keys) < 0) { this.__keys.push(key);} return key;
	},
	"remove"	:function(){
		if (arguments.length < 1 && this.length() > 0){for (var i = 0, l = this.length();i < l;i++) {delete this[this.__keys[i]];} this.__keys = [];return;}
		var key = this.getKey(arguments[0]);if (this.has(key)){delete this[key];this.splice(key, this.__keys);return;}
	},
	"each": 		function (f) { for (var i = 0, l = this.__keys.length;i < l;i++) {;if (this.has(this.__keys[i])){ f.call(f, this.__keys[i], this[this.__keys[i]]);} } },
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
}
JMatrix.prototype.constructor=JMatrix;

function JAttr(a){
	var _S=this;
	var _parseAttributes=function(s,a){
			s=s.replace(/^\s+||\s+$/g,"");a=a||{};
			var m=s.match(/^([a-zA-Z-_]*)=(['"])/);
			if(m){s=s.substring(m[0].length).replace(/^\s+||\s+$/g,"");var _m=s.match(stringToRegExp('((^.*?)'+m[2]+')(/s+[a-zA-Z-_]*=[\'"]|/s*$)'));if(_m){a[m[1]]=_m[2];s=s.substring(_m[1].length).replace(/^\s+||\s+$/g,"");_parseAttributes(s,a);}}
			return a;
	}
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

function Eid(_id){(_id.charAt(0)==='#')&& (_id=_id.substring(1));return document.getElementById(_id);}
function isE(o){if(!o){return false;};if(typeof HTMLElement === 'object'){return o instanceof HTMLElement;}return (o && typeof o  === 'object' && o['nodeType'] === 1 && typeof o['nodeName'] === 'string');}
function E(_e){(_typeof(_e)==='string') && (_e=Eid(_e)); (_e instanceof jQuery && _e[0]) && (_e=_e[0]);if(isE(_e)){if(_e['E']){return _e['E'];}else{return _e['E']=new _E(_e);}}else{ return new _E();}}
function _E(_e){
	this[0]=_e;
	var __ca=function(s){return s.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ').split(" ");},
		__n=function(s){ (s.charAt(0)!=='#' || s.charAt(0)!=='.') && (s=s.substring(1));return s},
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
			if(!s){return this[0].parentNode};
			var i=s.charAt(0),n=__n(s),p=this[0].parentNode,_c=function(_e,_n,_i){if(!_e|| !_n){return false};switch(_i){case ".":return E(_e).hasClass(_n);break;case "#":return (_e.id===_n);break;default:return ((_e.tagName||"").toLowerCase()===_n.toLowerCase());}};
			while(p){if(_c(p,n,i)){return p};if(_c(p,t,'')){return null};p=p.parentNode;}
			return null;},
		"near":function(f,l){
				if(_typeof(f)!=='string' && (f.charAt(0)!=='#' || f.charAt(0)!=='.')){return null;}
				if(f.charAt(0)==='#'){return Eid(f);}
				var e=this[0],r=null,n=f.substr(1),c=0,p=J(e).parent();l=l||1;
				if(f.charAt(0) =='.' && this.hasClass(n)){return e};
				r=J(e).find(f)[0];if(r){return r};
				r=J(e).next(f)[0];if(r){return r};
				r=J(e).prev(f)[0];if(r){return r};
				while(p[0] && c<l){
					if(p.hasClass(n)){return p[0]};
					if(p.find(f)[0]){return p.find(f)[0]};
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
			};
			if(document.compatMode == "BackCompat"){sl=document.body.scrollLeft;st=document.body.scrollTop;}else{sl=document.documentElement.scrollLeft; st=document.documentElement.scrollTop; }
			return {'x':(rl-sl),'y':(rt-st)}
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
};
function isout(e,ev){if(!isE(e)){return true};var _tgt=(ev.type=="mouseout")?ev.relatedTarget:ev.target;return (_tgt===e || J(e).find(_tgt).get(0)?false:true);};
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
				};
				return true;
				};
				return isout(_S.es,event);
		};
		_S.__out=function(event){
			 _S.timed.run(function(){if(_isout(event)){_S.handle(event); _S.auto && _S.stop()}});
		};
		_S.stop=function(){this.timed.clear();J(document).off("mousemove",_S.__out);}
		_S.start=function(es,f){
			_S.stop();
			_S.es=es||_S.es;
			_S.handle=(typeof(f)==="function"?f:_S.handle);
			J(document).on("mousemove",_S.__out);
		};
};
var Tweens = {
/* t: current time; b: beginning value; c: change in value; d: duration; */
    Cubic: {
        easeIn: function(t,b,c,d){return c*(t/=d)*t*t + b;},
        easeOut: function(t,b,c,d){return c*((t=t/d-1)*t*t + 1) + b;},
        easeInOut: function(t,b,c,d){if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b;}
    }
}
function JTween(_duration,_tween){
	this._time=0;
	this._timed=timed();
	this._runtime=0;
	this._value=0;
	
	this.interval=10;
	this.duration=_duration||300;
	this.handle=null;
	this.tween=_tween||'Cubic.easeOut';
	this.set();
}
JTween.prototype={
	'__tween':function(){var _tween=Tweens,_tweens=this.tween.split('.');for(var i=0;i<_tweens.length;i++){if(_tween.hasOwnProperty(_tweens[i])){_tween=_tween[_tweens[i]];}else{return null;}}return _tween;},
	'set':function(){
			this._time=0;
			this._value=0;
			this._runtime=0;
			this._duration=Math.floor(this.duration/this.interval)*this.interval;
			this._times=this._duration/this.interval;
	},
	'run':function(_f){
		this.set();this.stop();
		var _t=this,_tween=this.__tween();_t.handle=(_typeof(_f)==='function'?_f:_t.handle);if(!_t.handle){return}
		_t._timed=timed(function(){
			_t._time++;
			_t._runtime+=_t.interval;
			_t._value=parseInt((_tween(_t._runtime,0,_t._times,_t._duration)||0)/_t._times*1000)/1000;
			_t.handle(_t._value);
			if(_t._time>=_t._times){_t.stop();}
		},_t.interval,true);
	},
	'stop':function(){this._timed.clear();},
	'end':function(){this.stop();_t.handle(1);}
}
JTween.prototype.constructor=JTween;
function JView(options){
    "use strict";
    var _S=this;
    this.options=J.extend({
    	key:"",
    	target:null,
    	src:"",
    	effect:"swipeLeft",
    	container:null
    },options);
    this.src=this.options.src||Base64.decode(this.options.key);
    this.uri=new JUri(this.src);
    this.key=this.options.key||'#'+UUID(2);
    this.state=0;
    this.renderState=false;
    this.effect=this.options.effect;//'swipeLeft','swipeRight','swipeTop','swipeBottom',fadein
    this.target=J(this.options.target)[0]? J(this.options.target)[0]:document.body;
    this.template=null;
    this.container=J(this.options.container)[0]?J(this.options.container)[0]:null;
    this.context=null;
    this.modules=[];
    this.monitor=new JMatrix({
        moduleReady:new JMatrix(),
        load:new JMatrix(),
        error:new JMatrix(),
        view:new JMatrix(),
        ready:new JMatrix()
    });
    !this.container && (this.container=this.find());
    if(!this.container){
    	this.container=J('<div class="Ui"></div>')[0];
    	J(this.container).appendTo(this.target);
    }else{
    	this.context=this.container.innerHTML;
    	this.renderState=true;
    	this.monitor.run('load',[this]);
    	this.monitor.run('ready',[this]);
    }
    this.container.setAttribute('key',this.key);
    this.container.style.visibility="hidden";
    E(this.container).set('JView',this);
    this.render();
}
JView.prototype={
	'on':function(n,f){var _S=this;
		if(this.state==1 && n=='view'){f.call(this);}
		if(_S.monitor.has(n)){_S.monitor[n].bind.apply(_S.monitor[n],[].slice.call(arguments,1));}
	},
	'find':function(){return $('[key="'+this.key+'"]')[0]||Eid(this.key.substring(1))||null;},
	"swipe":function(b){
		switch(this.effect){
			case "swipeLeft":
				return this.container.offsetWidth+'px,0,0';
			break;
			case "swipeRight":
				return '-'+this.container.offsetWidth+'px,0,0';
			break;
			case "swipeTop":
				return '0,'+this.container.offsetHeight+'px,0';
			break;
			case "swipeBottom":
				return '0,-'+this.container.offsetHeight+'px,0';
			break;
		}
	},
	'of':function(b,f){
		var t=this,d=400,animEN="webkitTransitionEnd";
		switch(b){
			case 4:
				J(this.container).attr('z',3).css({'z-index':3,'visibility':'','opacity':""}).addClass('on');
				this.state=1;
				t.monitor.run('view',[t]);
			break;
			case 3:
				J(t.target).find('>.Ui').each(function(){
					var z=this.getAttribute('z')||"";
					if(z==="3"){
						E(this).get('JView') && E(this).JView.of(1);
					}else{
						E(this).get('JView') && E(this).JView.of(2);
					}
				});
				if(this.state==1){return;}
				switch(this.effect){
					case 'fadein':
						var animEnd=function(){
							_typeof(f)==="function"&&f.call(t);
							J(this).off(animEN);
						}
						J(this.container).attr('z',3).css({'z-index':3,'visibility':'','opacity':0}).addClass('on');
						setTimeout(function(){
							J(t.container).on(animEN,animEnd).css({'opacity':1,'transition':'all '+d+'ms ease-out','-webkit-transition':'all '+d+'ms ease-out'});
						},10);
					break;
					default:
						var animEnd=function(){
							_typeof(f)==="function"&&f.call(t);
							J(this).off(animEN);
						}
						var md=this.swipe();
						J(this.container).attr('z',3).css({
							'z-index':3,'visibility':'',
							'transition-duration':'','-webkit-transition-duration':'',
							'transform':'translate3d('+md+')','-webkit-transform':'translate3d('+md+')'
						});
						setTimeout(function(){
							J(t.container).on(animEN,animEnd).css({'transition-duration':d+'ms','-webkit-transition-duration':d+'ms','transform':'translate3d(0px,0px,0px)','-webkit-transform':'translate3d(0px,0px,0px)'});
						},10);
					break;
				};
				t.state=1;
				t.monitor.run('view',[t]);
			break;
			case 2:
				J(this.container).attr('z',0).css({'z-index':0,'visibility':'hidden'});
				this.state=0;
				_typeof(f)==="function"&&f.call(t);
			break;
			case 1:
				J(this.container).attr('z',1).css({'z-index':1,'visibility':''});
				this.state=0;
				_typeof(f)==="function"&&f.call(t);
			break;
			default:
				if(this.state==0){return;}
				switch(this.effect){
					case 'fadein':
						var animEnd=function(){
							_typeof(f)==="function"&&f.call(t);J(t.container).removeClass('on').off(animEN);
						}
						J(this.container).attr('z',3).css({'z-index':3,'visibility':'','opacity':1});
						setTimeout(function(){J(t.container).on(animEN,animEnd).css({'visibility':'hidden','opacity':0,'transition':'all 500ms ease-out','-webkit-transition':'all 500ms ease-out'});},0);
					break;
					default:
						var md=this.swipe();
						var animEnd=function(){
								_typeof(f)==="function"&&f.call(t);
								J(t.container).css({'z-index':0,'transition-duration':'','-webkit-transition-duration':''}).removeClass('on').attr('z',0).off(animEN);
								J(t.target).find('>.Ui[z="1"]').attr('z',3).css('z-index',3);
						};
						setTimeout(function(){
							J(t.container).on(animEN,animEnd).css({'transition-duration':'350ms','-webkit-transition-duration':'350ms','transform':'translate3d('+md+')','-webkit-transform':'translate3d('+md+')'});
						},0);
					break;
				}
				t.state=0;
				t.monitor.run('view',[t]);
			break;
		}
	},
	"display":function(f){if(_typeof(f)==="function"){f.call(this);this.monitor.bind('load',f);}},
	"load":function(f){_typeof(f)==="function" && this.monitor.bind('load',f);},
       "ready":function(f){_typeof(f)==="function" && this.monitor.bind('ready',f);},
	"render":function(){
		var t=this;
		if(!this.renderState){
			var _uri=new JUri(t.src);
			Ui.ajax({
				"url":t.src+(isEmpty(_uri.params)?'?':'&')+'__='+timestamp(),
				"dataType":"html",
				"beforeSend":function(){
					J(t.container).removeClass('error').addClass('loading');
					t.monitor.run('load',[t]);
				},
				"success":function(data){
					J(t.container).html(data);
					t.context=t.container.innerHTML;
					t.renderState=true;
    					t.monitor.run('ready',[t]);
				},
				"error":function(){
					J(t.container).addClass('error');
					t.monitor.run('error',[t]);
				},
				"complete":function(){
					J(t.container).removeClass('loading');
					t.context=t.context||"";
					t.monitor.run('ready',[t]);
				}
			});
		}else{
			t.container.style.visibility="";
		}
		E(t.container).JView=this;
	}
}
JView.prototype.constructor=JView;
function JViews(){
	"use strict";
	this.win=window;
	this.storage=new JStorage("Ui.JViews");
	this.container=null;
	this.views={};
	this.history=this.storage.get('history',[]);
	this.refresh=this.storage.get('refresh',false);
	this.prev=null;
	this.current=null;
	this.viewing=false;
	
	var _S=this;
	$(window).on("beforeunload",function (){
		if(!(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey)){
		     _S.refresh=true;_S.storage.store();
		}
	});
}
JViews.prototype={
	"has":function(k){return this.views.hasOwnProperty(k);},
	"get":function(k){return this.has(k)?this.views[k]:null;},
	"getViewContainer":function(k){return },
	"isKey":function(k){return (k.charAt(0)==="#"||k.charAt(0)==="@");},
	"paseKey":function(k){
		k==trim(k);
		if(!k){return "";}
		if(this.isKey(k)){return k;}
		if(k.charAt(0)==="#"){return "#"}
		var _base=new JUri(),_uri=new JUri(k);
			k=(_uri.host===_base.host?_uri.pathname:_uri.url);
		return '@'+Base64.encode(k);
	},
	'view':function(k,ef){
		if(this.viewing){return;}
		var t=this,_key=this.paseKey(k),_view=this.get(_key);
		if(this.prev && this.prev.key===_key){return this.goback();}
		t.viewing=true;
		if(_view){
			_view.of(3,function(){t.viewing=false;});
		}else{
			var vo={"key":_key,"target":this.container,"src":k};
			ef && (vo.effect=ef)
			_view=new JView(vo);
			this.views[_view.key]=_view;
			_view.of(3,function(){t.viewing=false;});
		}
		this.store(_view);
	},
	"store":function(v){
		if(v){
			if(this.current && this.current.key==v.key){return ;}
			this.views[v.key]=v;
			this.current=v;
			this.history.push(v.key);
			this.prev=this.views[this.history[this.history.length-2]]||null;
		}else{
			this.history.length=this.history.length-1;
			this.current=this.views[this.history[this.history.length-1]]||null;
			this.prev=this.views[this.history[this.history.length-2]]||null;
		}
		this.history.length>11 && this.history.splice(0,1);
		this.storage.store();
	},
	"goback":function(){
		if(this.viewing||this.history.length<2){return;}
		var t=this;
		this.current.of(0,function(){
			t.store();
			t.current.of(4);
			t.viewing=false;
		});
	},
	"load":function(){},
	"ready":function(){},
	"launch":function(){
		this.container=document.body;
		var _ve=$(this.container).find('>.Ui')[0],_id=_ve?_ve.id:"";
		if(!_ve){
			J(this.container).wrapInner('<div class="Ui" style="visibility:hidden;"></div>');
			_ve=$(this.container).find('>.Ui')[0];
		}
		var _uri=new JUri();
		var _view=new JView({
			"key":this.paseKey(_id||_uri.href),
			"target":this.container,
			"container":_ve,
			'effect':'fadein',
			"src":_uri.href
		});
		this.store(_view);
		this.current.of(3);
	}
};
JViews.prototype.constructor=JViews;

function Ui(p){
	suit(_typeof(p),{
		'string':function(){},
		'function':function(){
			untill(function(){return Ui.domready;},p);
		},
		'object':function(){}
	});
};
!(function(){
"use strict";
	if(Ui.inited){return;}
	Ui.__loadingIcon='data:image/svg+xml;utf8,<svg class="ui-loaded" xmlns="http://www.w3.org/2000/svg"  preserveAspectJRatio="xMidYMid meet"><g  width="30" height="30"><path d="M23.05,2.7a14.83,14.83,0,0,1,4,4.24,14.75,14.75,0,0,1,2.1,6.41,14.3,14.3,0,0,1-1.37,7.32,14.61,14.61,0,0,1-2.17,3.23,15,15,0,0,1-3,2.52A14.69,14.69,0,0,1,18.93,28a13.77,13.77,0,0,1-1.91.34,15.85,15.85,0,0,1-2,.09,14.87,14.87,0,0,1-3.85-.72,14.25,14.25,0,0,1-3.41-1.77,14.25,14.25,0,0,1-2.69-2.6A13.57,13.57,0,0,1,3.27,20.2a13.45,13.45,0,0,1-.53-1.67l-0.18-.84c-0.06-.28-0.06-0.52-0.1-0.78a13.67,13.67,0,0,1-.09-1.81V14.89a0.54,0.54,0,0,0,0,.09l0-.2,0-.41c0-.27,0-0.54.08-0.8A12.79,12.79,0,0,1,4.75,8.16,12.43,12.43,0,0,1,8.36,4.86a11.61,11.61,0,0,1,3.45-1.38l0.71-.15c0.21,0,.39,0,0.56-0.06l0.47-.06c0.15,0,.39,0,0.55,0l1.06,0A3.17,3.17,0,0,0,18.23.48L19,0.69A14.37,14.37,0,0,1,23.05,2.7Z" style="fill:none"/><path d="M15,0a15,15,0,1,0,3.24.36A15,15,0,0,0,15,0Zm3.23,0.48L19,0.69a14.37,14.37,0,0,1,4.09,2,14.83,14.83,0,0,1,4,4.24,14.75,14.75,0,0,1,2.1,6.41,14.3,14.3,0,0,1-1.37,7.32,14.61,14.61,0,0,1-2.17,3.23,15,15,0,0,1-3,2.52A14.69,14.69,0,0,1,18.93,28a13.77,13.77,0,0,1-1.91.34,15.85,15.85,0,0,1-2,.09,14.87,14.87,0,0,1-3.85-.72,14.25,14.25,0,0,1-3.41-1.77,14.25,14.25,0,0,1-2.69-2.6A13.57,13.57,0,0,1,3.27,20.2a13.45,13.45,0,0,1-.53-1.67l-0.18-.84c-0.06-.28-0.06-0.52-0.1-0.78a13.67,13.67,0,0,1-.09-1.81V14.89a0.54,0.54,0,0,0,0,.09l0-.2,0-.41c0-.27,0-0.54.08-0.8A12.79,12.79,0,0,1,4.75,8.16,12.43,12.43,0,0,1,8.36,4.86a11.61,11.61,0,0,1,3.45-1.38l0.71-.15c0.21,0,.39,0,0.56-0.06l0.47-.06c0.15,0,.39,0,0.55,0l1.06,0A3.17,3.17,0,0,0,18.23.48Z" style="fill:#8a4cc1"/></g></svg>';
	Ui.__imgPlaceHolder='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" style="fill:none;"><rect width="1" height="1" /></svg>';
	Ui.__imgDefault='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  viewPort="0 0 32 32" width="32" height="32" ><polyline points="2.48 22.51 10.43 15.18 22.47 29.54" style="fill:none;stroke:#d0d0d0;stroke-miterlimit:10;stroke-width:1.8460038900375366px"/><polyline points="27.02 26.16 21.78 19.76 17.3 23.38" style="fill:none;stroke:#d0d0d0;stroke-miterlimit:10;stroke-width:1.8460038900375366px"/><circle cx="20.27" cy="11.67" r="3.48" style="fill:none;stroke:#d0d0d0;stroke-miterlimit:10;stroke-width:1.8460038900375366px"/><circle cx="16" cy="16" r="15" style="fill:none;stroke:#d0d0d0;stroke-miterlimit:10;stroke-width:2px"/></svg>';
	
	Ui.screenWidth=window.screen.availWidth;
	Ui.screenHeight=window.screen.availHeight;
	
	Ui.scrolltop=0;
	Ui.width=window.innerWidth||window.outerWidth||Ui.screenWidth;
	Ui.height=window.innerHeight||window.outerHeight||Ui.screenHeight;
	
	Ui.__direction={'x':{axs:'x',Axs:'X',p:'l',pos:'left',Pos:'Left',s:'w',sz:'width',Sz:'Width',rv:'y'},'y':{axs:'y',Axs:'Y',p:'t',pos:'top',Pos:'Top',s:'h',sz:'height',Sz:'Height',rv:'x'}};
	Ui.__zindex=10000;
	Ui.__axsLock=40;
	Ui.__touchaxs=null;
	Ui.__hidden=J('<div id="hidden"></div>');
	Ui.__gallery={};
	Ui.__instance=new JMatrix('instance');
	Ui.__history=[];
	
	Ui.domready=false;
	Ui.domhtml=document.getElementsByTagName('html');
	Ui.domTitle=document.getElementsByTagName('title');
	Ui.dombody=document.body;
	
	Ui.monitor=new JMatrix({
		resize:new JMatrix('resize'),
		ready:new JMatrix('ready'),
		change:new JMatrix('change')
	});
	
	// Events
	Ui.scroll = 		new JMatrix('scroll');
	Ui.scrollTop = 	new JMatrix('scrollTop');
	Ui.scrollBottom = new JMatrix('scrollBottom');
	Ui.scrollUp = 	new JMatrix('scrollUp');
	Ui.scrollDown = new JMatrix('scrollDown');
	
	Ui.touchStart = 	new JMatrix('touchStart');
	Ui.touchMove = 	new JMatrix('touchMove');
	Ui.touchEnd = 	new JMatrix('touchEnd');
	
	Ui.boundary=false;
	Ui.boundaryJStart= new JMatrix('boundaryJStart');
	Ui.boundaryGoing= new JMatrix('boundaryGoing');
	Ui.boundaryEnd = new JMatrix('boundaryEnd');
	Ui.boundaryLoad= new JMatrix('boundaryLoader');
	
	Ui.on=function(n){if(Ui.monitor.has(n)){Ui.monitor[n].bind.apply(Ui.monitor[n],[].slice.call(arguments,1));}},
	
	/*functions*/
	Ui.__loading=J('<div class="Ui-loading"><img src=\''+Ui.__loadingIcon+'\' /></div>').on('touchstart',function(event){event.preventDefault();event.stopPropagation();});
	Ui.loading=function(){Ui.__loading.css({'visibility':'','z-index':Ui.zindex}).addClass('on');Ui.write(Ui.__loading);}
	Ui.loaded=function(){Ui.__loading.removeClass('on');timed(function(){Ui.__loading.css('visibility','hidden')},800)}
	
	Ui.zindex=function(){return Ui.__zindex+=2;}
	Ui.hidden=function(e){Ui.__hidden.append(e);};
	Ui.write=function(e){var _id='anchor'+UUID(2);document.write('<b id="'+_id+'"></b>');if(J(e)[0]){J('#'+_id).replaceWith(e);return e;}return J('#'+_id);}
	Ui.scrollTo=function(a,duration,callback){
		untill(function(){return Ui.domready;},function(){
			var _top=null,_multiple=(Ui.dombody.scrollTop-_top)/200;duration=_multiple*50;
			if(_typeof(a)==='number'){_top=a;}
			if(_typeof(a)==='string'){
				if(a==='top'){_top=0;}
				else if(a==='bottom'){_top=((Ui.dombody.scrollHeight - Ui.dombody.offsetHeight+10000))}
				else if (J(a)[0]) { _top = duration=Ui.dombody.scrollTop + J(a).offset().top; }
			}
			_top!==null && J(Ui.dombody).animate({'scrollTop':_top},duration,'easeOutCubic',function(){_typeof(callback)==='function' && callback.call(callback)});
		});
	};
	Ui.install=function(s,plugin,options){if(!window[plugin]){return;}
		var _install=function(){J(s).each(function(){if(!E(this).has(plugin)){E(this)[plugin]=true;E(this)[plugin]=new window[plugin](this,options);}else{exe(E(this)[plugin],'install');}})};_install();Ui.on('change',_install);
	}
	Ui.ajax=function(params){
		var _params={
			url: '',
			beforeSend:function(){},
			success:function(){},
			error:function(){},
			complete:function(){}
		},
		__cleanHTML=function(_data,_type){
			if(!_data || _type!=='html'){return _data;}
			_data=_data.replace(/<meta[^>]*>/gi,"");
			var _s1=[],_purl=function(_url){__A.href=_url;return __A.host+__A.pathname;}
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
	}
	Ui.touch=function(e,_events){
		var __e=J(e)[0];if(!__e){return ;}
		var Touch=function(_e){
				var F=this;
					F.e=_e;
					F.events=new JMatrix('Events');
					F.events['tap']=			new JMatrix();
					F.events['tapHold']=		new JMatrix();
					F.events['doubleTap']=	new JMatrix();
					
					F.events['swipe']=		new JMatrix();
					F.events['swipeUp']=		new JMatrix();
					F.events['swipeDown']=	new JMatrix();
					F.events['swipeLeft']=	new JMatrix();
					F.events['swipeRight']=	new JMatrix();
					
					F.events['touchStart']=	new JMatrix();
					F.events['touchMove']=	new JMatrix();
					F.events['touchEnd']=	new JMatrix();
					
					F.events['draw']=		new JMatrix();
					F.events['zoom']=		new JMatrix();
					F.events['drag']=			new JMatrix();
					
					
					F.events['scroll']=		new JMatrix();
					F.events['scrollTop']=	new JMatrix();
					F.events['scrollBottom']=	new JMatrix();
					
					E(F.e).Touch=F;
					F.bind=function(){F.events.bind.apply(F.events,[].slice.call(arguments,0))};
					F.scrollTop=0;
					
					var __tap=null,
						__doubleTap=null,
						__startX=0,__startY=0,
						__swipe=null,__swipeX=null,__swipeY=null,
						__dirX=null,__dirY=null,
						__drag=null,
						__zoom=null,__startZoomDistance=0,__changeZoomDistance=0,
						__scrollTop=false,__scrollBottom=false,__scrollDir=null,
						__end=true,
						__timeds={
							'tap':timed(),
							'tapHold':timed(),
							'doubleTap':timed(),
							'swipe':timed()
						}
					var __events={
						'scroll': function(event){
							__scrollDir=null;
							if(F.scrollTop<=0 && !__scrollTop){/*top*/F.events['scrollTop'].run([event]);__scrollTop=true;}
							if(F.scrollTop>=(F.e.scrollHeight-F.e.offsetHeight) && !__scrollBottom){/*down*/__scrollBottom=true;F.events['scrollBottom'].run([event]);}
							if(F.scrollTop<F.e.scrollTop){/*To Up*/__scrollDir='up';__scrollTop=false;}
							if(F.scrollTop>F.e.scrollTop){/*To Down*/__scrollDir='down';__scrollBottom=false;}
							
							F.scrollTop=F.e.scrollTop;
							F.events['scroll'].run([event,__scrollDir]);
						},
						'touchstart':function(event){
							F.events['touchStart'].run([event]);
							var _touches=event.originalEvent.touches;
							if(_touches.length===1){
								//tap
								__tap===null && (__tap=true);
								//tapHold 
								if(!__timeds.tapHold.id){
									__timeds.tapHold=timed(function(){F.events['tapHold'].run([event]);__timeds.tapHold.clear();__tap=null;__timeds.tap.clear();},750);
								}
								//drag;
								__drag=true;
								//swipe;
								if(__swipe===null){
									__swipe=true;__timeds['swipe'].clear();
									__timeds.swipe=timed(function(){__swipe=null;},300);
								}
								//doubleTap;
								if(__doubleTap===0 && __timeds.doubleTap.id!==null){__doubleTap=1;}
								if(__doubleTap===null && __timeds.doubleTap.id===null){
									__doubleTap=0;
									__timeds.doubleTap=timed(function(){__doubleTap=null;__timeds.doubleTap.clear();},400);
								}
								__end=false;
							}
						},
						'touchmove':function(event){
							F.events['touchMove'].run([event]);
							var _touches=event.originalEvent.touches,_touch0=_touches[0];
							
							(__startX===0) && (__startX=_touch0.clientX);
							(__startY===0) && (__startY=_touch0.clientY);
							
							if(_touch0.clientX>__startX){/*right*/__dirX='Right';}else{/*left*/__dirX='Left';}
							if(_touch0.clientY>__startY){/*down*/__dirY='Down';}else{/*up*/__dirY='Up';}
							
							if(_touches.length===1 && (Math.abs(_touch0.clientX-__startX)>5 || Math.abs(_touch0.clientY-__startY)>5)){
								//tap
								__tap=__doubleTap=null;__timeds.tapHold.clear();
								(F.events['drag'].run([event,{"_x":__startX,"_y":__startY,"x":_touch0.clientX,"y":_touch0.clientY}]));
							}
							//swipe;
							if(_touches.length===1 && __swipe!==null && (Math.abs(_touch0.clientX-__startX)>Ui.__axsLock || Math.abs(_touch0.clientY-__startY)>Ui.__axsLock)){
								__swipeX=__dirX;
								__swipeY=__dirY;
							}
							//zoom;
							if(_touches.length > 1){
								if(__startZoomDistance===0){
									__startZoomDistance=Math.ceil(Math.sqrt(Math.pow(_touches[1].clientX-_touches[0].clientX,2)+Math.pow(_touches[1].clientY-_touches[0].clientY,2)));
								}
								__changeZoomDistance=Math.ceil(Math.sqrt(Math.pow(_touches[1].clientX-_touches[0].clientX,2)+Math.pow(_touches[1].clientY-_touches[0].clientY,2)))-__startZoomDistance;
								F.events['zoom'].run([event,__changeZoomDistance]);
							}
							//draw
							F.events['draw'].run([event,__dirX,__dirY,(_touch0.clientX-__startX),(_touch0.clientY-__startY)]);
						},
						'touchend':function(event){
							F.events['touchEnd'].run([event]);
							if(__end){return;}
							__startX=__startY=0;
							//zoom
							__startZoomDistance=__changeZoomDistance=0;
							//drag
							__drag=null;
							//Swipe 
							if(__swipe===true && __swipeX!==null){
								F.events['swipe'+__swipeX].run([event]);
								F.events['swipe'+__swipeY].run([event]);
								F.events['swipe'].run([event,__swipeX,__swipeY]);
							}
							__swipe=__swipeX=__swipeY=null;
							__timeds.swipe.clear();
							
							//End Double Touch;
							if(__doubleTap===1 && __timeds.doubleTap.id!==null){
								__tap=null;__timeds.tap.clear();
								F.events['doubleTap'].run([event]);
								__doubleTap=null;
								__timeds.doubleTap.clear();
							}
							//Tap 
							if(__tap===true){ 
								__timeds.tap=timed(function(){
									F.events['tap'].run([event]);
									__tap=null;
								},500);
							}else{
								__tap=null;
								__timeds.tap.clear();
							}
							if(__timeds.tapHold.id!==null){__timeds.tapHold.clear();}
							__end=true;
						}
					}
					J(F.e).on(__events);
					J(document).on('touchend',function(event){ !__end && __events['touchend'](event);});
		}
		var __Touch=E(__e).has('Touch')?E(__e).Touch:new Touch(__e);
		if(_typeof(_events)==='object'){
			map(_events,function(k,v){
				(_typeof(_events[k])==='function' && __Touch.events.hasOwnProperty(k) && __Touch.events[k] instanceof JMatrix) && __Touch.events[k].bind(_events[k]);
			});
		}
		return __Touch;
	}
	
	Ui.views=new JViews();
	
	Ui.on('resize',function(){
			Ui.width=window.innerWidth;
			Ui.height=window.innerHeight;
			Ui.scrolltop=document.body['scrollTop']||0;
	});
	Ui.on('ready',function(){
		Ui.dombody=document.body;
		Ui.views.launch();
		Ui.__hidden=Eid('hidden')?J(Eid('hidden')):Ui.__hidden;
		Ui.__hidden.appendTo(Ui.dombody).attr('style','display:none!important;');
		
//		Ui.__ui.style.width=Ui.width+"px";
//		Ui.__ui.style.height=Ui.height+"px";
		
//		Ui.touch(Ui.__ui,{
//			'scrollTop':Ui.scrollTop,
//			'scrollBottom':Ui.scrollBottom,
//			'scroll':function(ev,d){
//				if(d==='up'){Ui.scrollUp.run([ev]);}
//				if(d==='down'){Ui.scrollDown.run([ev]);}
//				Ui.scroll.run([ev]);
//			}
//		});
//		if(Ui.boundary){
//			var __boundary=new JBoundary(Ui.__ui,{
//				'start':function(n){Ui.boundaryJStart.run([n])},
//				'going':function(n){Ui.boundaryGoing.run([n])},
//				'end':function(n){Ui.boundaryEnd.run([n])},
//				'load':function(n){Ui.boundaryLoad.run([n])}
//			});
//		}
		//$(document).on('touchstart',function(event){event.stopPropagation(); event.preventDefault();});
		var __DOMchanged=false,__DOMchangeQueue=0,__pX=0,__pY=0,__touch0=null;
		J(document).on({
			'DOMNodeInserted':function(){if(__DOMchanged){__DOMchangeQueue+=1;return;}Ui.monitor.change.run([event]);__DOMchanged=true;timed(function(){if(__DOMchangeQueue!==0){Ui.monitor.change.run([event]);__DOMchangeQueue=0;}__DOMchanged=false;},170);},
			'DOMNodeRemoved':function(){},
			//'touchstart':function(event){},
			'touchmove':function(event){
				if(event.originalEvent.touches.length<1||Ui.__touchaxs!==null ){return;}
				__touch0=event.originalEvent.touches[0];
				__pX===0 && (__pX=__touch0.clientX);
				__pY===0 && (__pY=__touch0.clientY);
				
				if(Ui.__touchaxs===null && Math.abs(__touch0.clientX-__pX)>Ui.__axsLock){Ui.__touchaxs='x';}
				if(Ui.__touchaxs===null && Math.abs(__touch0.clientY-__pY)>Ui.__axsLock){Ui.__touchaxs='y';}
			},
			'touchend':function(){
				Ui.__touchaxs=null;
				__pX=__pY=0;
			}
		});
	});
	J(document).ready(function(){Ui.domready=true;Ui.monitor.ready.run()});
	J(window).on('resize',function(){Ui.monitor.resize.run()});
	
	Ui.browser = {
	    versions: function(){
	        var u = navigator.userAgent, app = navigator.appVersion;
	        return {
	            trident: u.indexOf('Trident') > -1, //IE内核
	            presto: u.indexOf('Presto') > -1, //opera内核
	            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	            iPad: u.indexOf('iPad') > -1, //是否iPad
	            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	        };
	    }(),
	    language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	

	/*Instrance*/
	Ui.gallery=new JGallery();
//	Ui.command=new JCommand();
	
//	Ui.tips=new JTips();
//	Ui.gotop=new JGotop();
//	Ui.message=new JMessages();
	Ui.inited=true;
})();
function JBoundary(e,params){
		e=$(e).get(0);if(!e){return}
		
		var __F=this;
		__F.params=J.extend({
			element:$(e),
			loader:false
		},params);
		__F.events=new JMatrix({
			"start":new JMatrix(),
			"going":new JMatrix(),
			"end":new JMatrix(),
			"load":new JMatrix(),
		});
		map(__F.params,function(k,v){if(__F.events.hasOwn(k) && _typeof(v)==='function'){__F.events.bind(v)}});
		
		/*Ui Scroll*/
		var __startX=null,__startY=null,
			__boundary = null,
			__disJBoundary=false,
			__scrolltop = 0,
			__offset=160,
			__distance = 0,
			__scrollDistance=0,
			__signTop=$('<b class="boundary" pos="top"></b>'),
			__signBot=$('<b class="boundary" pos="bottom"></b>'),
			__delayTop=timed(),__delayBot=timed(),
			__CSSClear={'transition-duration':'','transition':'','-webkit-transition-duration':'','-webkit-transition':''},
			__preventDefault=function(event){event.stopImmediatePropagation();event.stopPropagation();event.preventDefault();}
			;
		
		//__F.sign.content=function(){}
		if(__F.params.loader){
			__F.events.bind({
				'start':function(n){
					var _fs={
						"top":function(){
							__delayTop.clear();__signTop.html('按住，并往下拉').prependTo(e).attr('state','start');
						},
						"bottom":function(){
							__delayBot.clear();__signBot.html('按住，并往上拉').appendTo(e).attr('state','start');
						}
					}
					exe(_fs,n);
				},
				'going':function(n){
					var _fs={
						"topMax":function(){
							__signTop.html('松开，更新最新');
						},
						"bottomMax":function(){
							__signBot.html('松开，加载更多');
						}
					}
					exe(_fs,n);
				},
				'end':function(n){
					var _fs={
						"top":function(){
							__signTop.attr('state','end');
							__delayTop=timed(function(){__F.events.load.run([n]);__signTop.detach().attr('state','');},1000);
						},
						"bottom":function(){
							__signBot.attr('state','end');
							__delayBot=timed(function(){__F.events.load.run([n]);__signBot.detach().attr('state','');},1000);
						}
					}
					exe(_fs,n);
				}
			});
		}
		var __move=function(x,y,d){
			d=d||0;
			J(e).css({
					'transition-duration':d+'ms','-webkit-transition-duration':d+'ms',
					'transform':'translate3d('+x+'px, '+y+'px, 0px)','-webkit-transform':'translate3d('+x+'px, '+y+'px, 0px)'
			});
		},
		__start=function(event){
			if(event.originalEvent.touches.length < 1){return ;}
			var touch = event.originalEvent.touches[0];
				__startX=touch.clientY;
				__startY=touch.clientY;
				__disJBoundary=false;
		},
		__going=function(event){
			__scrollDistance=e.scrollHeight - e.offsetHeight;
			if(event.originalEvent.touches.length < 1 || __disJBoundary){return ;}
			var touch = event.originalEvent.touches[0];
				if(!__boundary && e.scrollTop<=0  && (touch.clientY-__startY)>Ui.__axsLock ){
					__boundary = 'top';
					 __distance=0;
					__F.events.start.run([__boundary]);
					__preventDefault(event);
				}
				if (__boundary === 'top'){
					__distance =touch.clientY-__startY;
					if (__distance <= __offset){
						__move(0,__distance,0);
						__F.events.going.run([__boundary]);
					}else{
						__F.events.going.run([(__boundary+'Max')]);
					}
					__preventDefault(event);
				}
				if (!__boundary && e.scrollTop>=__scrollDistance && (__startY-touch.clientY)>Ui.__axsLock ){
					__boundary = 'bottom';
					__distance=0;
					
					__F.events.start.run([__boundary]);
					__preventDefault(event);
				}
				if (__boundary === 'bottom' ){
					__distance =__startY-touch.clientY;
					if(__distance <= __offset){
						__move(0,0-__distance,0);
						__F.events.going.run([__boundary]);
					}else{
						__F.events.going.run([(__boundary+'Max')]);
					}
					__preventDefault(event);
				}
		},
		__end=function(event){
			if (__boundary === 'top'){
				__move(0,0,400);
				timed(function(){
					J(e).css(__CSSClear);
					__boundary = null;
				},300);
				__F.events.end.run([__boundary]);
			}
			if (__boundary === 'bottom'){
				__move(0,0,400);
				timed(function(){
					J(e).css(__CSSClear);
					__boundary = null;
				},300);
				__F.events.end.run([__boundary]);
			}
		};
	J(e).on({'touchstart':__start,'touchmove':__going,'touchend':__end});
	E(e).JBoundary=this;
	return this;
}
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
			'tap':null,
			'touchstart':null,
			'touchmove':null,
			'touchend':null
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
		}
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
			'tap':'cursorTap',
			'touchstart':'cursorJStart',
			'touchmove':'cursorMove',
			'touchend':'cursorEnd'
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
		}
		_S.display=function(_of){
			if(_of===true){
				_S.e.css('display','').removeClass('hidden');return;
			}else{
				_S.e.css('display','none').addClass('hidden');return;
			}
			return _S.e;
		}
		_S.addClass=_S.e.addClass;
		_S.removeClass=_S.e.removeClass;
		_S.attr=_S.e.attr;
		_S.removeAttr=_S.e.removeAttr;
		
		_S.icon=function(_in){
			if(!_typeof(_in)==='string' && !(_in.length>0)){return}
			!_S.__icon && (_S.__icon=J('<i>'+_in+'</i>'));
			J(_S.__icon).html(_in);
			__setClass();
			return _S;
		};
		_S.text=function(_in){
			if(!_typeof(_in)==='string' && !(_in.length>0)){return}
			!_S.__text && (_S.__text=J('<b>'+_in+'</b>'));
			J(_S.__text).html(_in);
			__setClass();
			return _S;
		};
		_S.show=function(){return _S.display(true)};
		_S.hide=function(){return _S.display(false)};
		_S.of=function(of){ of?_S.e.addClass('on'):_S.e.removeClass('on')};
		_S.remove=function(){_S.e.off().remove();return _S;}
		_S.e.attr(_ats.get()).append(_S.__icon).append(_S.__text);
		__setClass();
		
		_S.e.on({
			'tap':function(eve){},
		 	'touchstart':function(eve){if(!_S.disabled){J(_S.e).addClass('prs');}},
			'touchend':function(eve){J(_S.e).removeClass('prs');}
		 });
		_S.disable(_S.disabled);
		_S.display(!_S.hidden);
		E(_S.e[0]).Button=_S;
}
function JButtons(_id){
	var  _S=this;
		_S.id=_id||UUID(2);
		_S.e=J('#'+_S.id)[0]?J('#'+_S.id):J('<div id="'+_S.id+' " class="'+_S.id+' '+_S.id+'_on"></div>');
		_S.e.addClass('JButtons');
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
				break;
				case "array":
					map(_p,function(i){_S.button(_p[i],_pos);});
				break;
				case "object":
					return __addbutton(__button(_p));
				break;
			}
		}
		_S.reset=function(){__buttons.remove();_S.e.empty();}
		_S.remove=function(s){if(__buttons.get(s)){_S.e.remove(__buttons.get(s).e);__buttons.remove(s);}}
		_S.length=function(){return __buttons.length();}
		return this;
};
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
		this.e.on("touchstart",function(event){event.stopPropagation();return false});
		this.show=function(t){
			var _S=this;
			!J(this.win.document.body).find('>#'+this.id).get(0)&& this.e.appendTo(this.win.document.body);
			if(this.params.shadow && this.trg){var _ofs=J(this.trg).offset();J(this.shadow).css({"left":_ofs.left,"top":_ofs.top,"width":_S.trg.offsetWidth,"height":_S.trg.offsetHeight});}
			_S.e.css({'z-index':_S.zindex,'opacity':_S.params.opacity,'visibility':''});
			setTimeout(function(){_S.e.addClass('on')},0);
			return this;
		};
		this.hide=function(t,d){
			if(t===0){
				d ? s.remove():this.e.css('visibility','hidden');
			}else{
				var s=this;s.e.stop(true,true).animate({opacity:0},(t||s.params.timeout),function(){d ? s.remove():s.e.css('visibility','hidden')});return this;
			}
		};
		this.remove=function(){
			var s=this;
			s.e.removeClass("on");
			setTimeout(function(){s.e.remove()},s.params.timeout);
		};
};
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
		var _S=this;
		_S.__default=J.extend({
			win:window,
			self:window,
			trg:J(),
			masker:true,maskerOpacity:0.9,maskerScroll:false,maskerClass:"",
			event:null,
			width:'auto',height:'auto',minwidth:0,maxwidth:0,minheight:0,maxheight:0,offset:0,
			close:'destroy',autoClose:false,
			title:'',content:'',buttons:[],
			blur:true,resize:true,moveable:false,position:'default',
			modal:'html',mode:'popup',
			scrolling:'auto',
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
		_S.masker=new JMasker({opacity:this.params.maskerOpacity,scroll:this.params.maskerScroll,csn:this.params.maskerClass});
		_S.frame=null;
		_S.ajax=null;
		_S.autoclose=timed(null,3000);
		_S.header=J('<div class="'+_S.csn+'_h"></div>');
		_S.footer =J('<div class="'+_S.csn+'_f"></div>');
		_S.pointer =J('<i class="'+_S.csn+'_p"></i>');
		_S.target="";
		
		_S.title=null;
		_S.buttons=new JButtons();
		_S.parseURI=function(u){u=parseURI(u);_S.target=u.params['target'];return u.protocol+'//'+u.host+u.pathname+(u.search?u.search+'&v='+timestamp():'?v='+timestamp())+u.hash;}
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
						_S.frame.__popuper=_S;
						_S.frame.__source=window;
						_S.title=_S.title||_S.frame.document.title;
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
					var _l=(_S.viewWidth-_S.width)/2+(_S.win.scrollLeft||_S.win.document.body.scrollLeft),
							_t=(_S.viewHeight-_S.height)/2+_S.params.offset+(_S.win.scrollTop||_S.win.document.body.scrollTop);
					if(_t<0){_t=0};if(_l<0){_l=0}
					_S.box.css({'top':_t,'left':_l});
				}
		};
}
JPopuper.prototype={
	'on':function(n){var _S=this;if(_S.monitor.has(n)){_S.monitor[n].bind.apply(_S.monitor[n],[].slice.call(arguments,1));}},
	'anchor':function(of){
		if(this.params.modal!=="element" || !J(this.params.get)[0]){return;}
		if(!of){if(this['__anchor']){J(this.__anchor)[this.__anchorInsert](J(this.params.get));delete this.__anchor;delete this.__anchorInsert;}return ;}
		if(!this['__anchor']){var _a=J(this.params.get).prev();if(_a[0]){this.__anchor=_a[0];this.__anchorInsert='after';}else{this.__anchor=J(this.params.get).parent()[0];this.__anchorInsert='prepend';}}
	},
	'reset':function(ops){
		var _S=this;
		J.extend(this.params,this.__default,ops);
		this.Ui=this.params.win['Ui']||window['Ui'];
		
		this.win=this.params.win||window;
		this.self=this.params.self||window;
		this.frame=null;
		
		this.opened=false;
		this.zindex=this.Ui.zindex();
		this.trg=J(this.params.trg);
		//this.trg[0] && E(this.trg[0]).options(this.params);
		this.rsp=(this.params.modal==='element'? J(this.params.get):J());
		if(isE(this.params.get)|| this.params.get instanceof jQuery){this.params.modal='element'}
		
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
			_S.box.appendTo(_S.win.document.body).append(_S.pointer);
			_S.bdy=_S.box.find('>.'+_S.csn+'_b');
			if(this.params.x){
				_S.x=J('<b class="'+_S.csn+'_x b"></b>').appendTo(_S.box);
				_S.x.on('click',function(){_S.close()});
			}
			if(this.params.blur){this.masker.e.on('click',function(){_S.close()});}
			Ui.on('resize',function(){_S.resize();});
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
		var _S=this;
		this.params.masker&& this.masker.show();
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
				var __inc=0,__isSelecter=function(s){return isNaN(s) &&  (s.charAt(0)==='.'|| s.charAt(0)==='#');}
				
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
		}
		Ui.on('resize',_size);
		_S.install=function(){ 
			if(_S.installed){return;}
			E(e).isVisible()?_size():untill(function(){return E(e).isVisible()},function(){_size()},null,1);
		}
		_S.install();
}
function JImg(__img,__pre,__evs){
	if(!__img.getAttribute('src') && !__img.getAttribute('source') && (__img.getAttribute("error") || __img.getAttribute("loaded"))){return;}
	//if(!__img.getAttribute('source') && __img.width!=0 && __img.width<100 && __img.height!=0 && __img.height<100){return;}
	__img.setAttribute("loaded","1");
	
	var __csns=(__img.className||""),
		__shape=function(w,h){var _s="";(w>h) && (_s="wd");(w===h) && (_s="sq");(w<h) && (_s='nw');__csns=__csns.replace(/\b ?wd| ?sq| ?nw\b/gi,"");return (__csns.length>0?__csns+" "+_s:_s);};
		
	if(!__img.getAttribute('src') && !__img.getAttribute('source')){__img.src=Ui.__imgPlaceHolder;return;}
	
	var __Img={
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
	__Img.src=__Img.source || __Img.src;
	__img.className=__shape(__Img.width,__Img.height);

	(_typeof(__pre)==="undefined")&&(__pre=true);
	if(!__pre){return E(__img).Img=__Img;}
	
	imgReady(__Img.src,
		function(_img){/*ready*/
			__Img.width=_img.width;
			__Img.height=_img.height;
			__img.className=__shape(__Img.width,__Img.height);
			__img.src=__Img.src;
			exe(__evs,'ready',_img);
		},
		function(_img){/*loaded*/exe(__evs,'load',_img);},
		function(_img){/*error*/__img.src=Ui.__imgPlaceHolder;__img.setAttribute("error","1");exe(__evs,'error',_img);}
	);
	E(__img).Img=__Img;
}
function JTips(){
	var F=this;
		F.e=J('<span class="tips"></span>');
		var __timed=timed(),_visible=false;
		F.show=function(e,tipc){
			__timed.clear();
			F.e.css({
				'visibility':'hidden',
				'width:':'',
				'height:':'',
				'opacity':0,
				'z-index':Ui.zindex(),
				'transition-duration':'0ms',
				'transform':'translate3d(0px, -60px, 0px)',
			}).appendTo(Ui.dombody);
			F.e.html(tipc);
			var _w=J(F.e).width(),
				_h=J(F.e).height(),
				_bw=J(e).outerWidth(),
				_bh=J(e).outerHeight(),
				_bx=J(e).offset().left-Ui.dombody.scrollLeft,
				_by=J(e).offset().top-Ui.dombody.scrollTop,
				_l=(_bx+_bw/2-J(F.e).outerWidth()/2),
				_t=(_by-J(F.e).outerHeight());
			F.e.css({
				'width':_w,
				'height':_h,
				'left':_l,
				'top':(_t),
				
				});
			timed(function(){
				F.e.css({
					'visibility':'',
					'opacity':1,
					'transition-duration':'50ms',
					'transform':'translate3d(0px, -20px, 0px)',
					'transition':'all 500ms ease-out'
				});
			},50);
			
			_visible=true;
			__timed=timed(function(){F.hide()},5000);
		}
		F.hide=function(){
			__timed.clear();
			_visible=false;
			F.e.css({
				'width:':'',
				'height:':'',
				'opacity':0,
				'transition-duration':'300ms',
				'transform':'translate3d(0px, -60px, 0px)',
				'transition':'all 500ms ease-out'
			});
			timed(function(){
				F.e.removeAttr('style').empty().detach();
			},300);
		}
		Ui.scroll.bind(function(){_visible===true && F.hide();});
}
function JToolbar(_id){
	var F=this;
		F.id=_id||UUID(2);
		F.csn="bar";
		F.e=J('#'+F.id)[0]?J('#'+F.id):J('<div id="'+F.id+' " class="'+F.csn+' '+F.id+' '+F.csn+'_on"></div>');
		F.active=false;
		F.scrollMode=0;
		F.monitor=new JMatrix({
			'on':new JMatrix(),
			'off':new JMatrix(),
		});
		F.area={
			'left':J('<div class="bar-left"></div>'),
			'right':J('<div class="bar-right"></div>'),
			'center':J('<div class="bar-center"></div>'),
			'initedleft':false,
			'initedright':false,
			'initedcenter':false
		}
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
		    	__addbutton=function(_be,_pos){
		    		if(F.area.hasOwnProperty(_pos)){
		    			(!F.area['inited'+_pos]) && (F.area[_pos].appendTo(F.e),F.area['inited'+_pos]=true);
		    			F.area[_pos].append(_be)
		    		}else{
		    			F.e.append(_be);
		    		}
		    	};
		F.off=function(){
			__buttons.each(function(k,v){v.of(false)});
		}
		F.button=function(_p,_pos){
			if(!_p){return;}
			var _sep;
			switch(_typeof(_p)){
				case "string":
					if(/^<(\w+).*<\/\1>$/.test(_p) && J(_p)[0]){
						var _b=__button({element:J(_p)}),
							_ps=(_b['position']||_pos);
							__addbutton(_b.e,_ps);
							return _b;
					}else{
						return __buttons[_p];
					}
				break;
				case "array":
					map(_p,function(i){
						if(_typeof(_p[i])==='string' && (/^<(\w+).*<\/\1>$/.test(_p[i]) && J(_p[i])[0])){
						
							var _b=__button({element:J(_p[i])}),
								_ps=(_b['position']||_pos);
								__addbutton(_b.e,_ps);
						}
						if(_typeof(_p[i])==='object'){
							var _ps=(_p[i]['position']||_pos);
							__addbutton(__button(_p[i]).e,_ps);
						}
						if(_typeof(_p[i])==='array'){
							var _bs=__buttonGroup(_p[i]);__addbutton(_bs);
						}
					});
				break;
				case "object":
					var _b=__button(_p),_ps=(_p['position']||_pos);
						__addbutton(_b.e,_ps);return _b;
				break;
			}
		}
		F.autohide=false;
		F.reset=function(){F.e.empty();}
		F.insert=function(s){J(s).append(F.e)}
		F.write=function(){Ui.write(F.e);timed(function(){F.autohide=true;F.on(true)},200);}
		F.attr=F.e.attr;
		var tlbactive=false;
		F.on=function(of){
			if(F.active){return}
			if(of){
				tlbactive=true;F.e.addClass(F.csn+'_on');
				F.monitor.on.run();
			}else{
				tlbactive=false;F.e.removeClass(F.csn+'_on');
				F.monitor.off.run();
			}
		}
		Ui.scrollDown.bind('Bar-'+F.id,function(event){
			if(F.scrollMode===0 && F.autohide && tlbactive){F.on();}
			if(F.scrollMode===1 && F.autohide && !tlbactive){F.on(true);}
		});
		Ui.scrollBottom.bind('Bar-'+F.id,function(event){
			if(F.scrollMode===0 ){F.on(true);}
			if(F.scrollMode===1 ){F.on(true);}
		});
		Ui.scrollUp.bind('Bar-'+F.id,function(event){
			if(F.scrollMode===0 && F.autohide && !tlbactive){F.on(true);}
			if(F.scrollMode===1 && F.autohide && tlbactive){F.on();}
		});
		Ui.scrollTop.bind('Bar-'+F.id,function(event){
			if(F.scrollMode===0 ){F.on(true);}
			if(F.scrollMode===1 ){F.on(true);}
		});
}
function JGotop(){
	var JGotop=J('<b class="gotop" id="gotop"><svg viewBox="0 0 30 30"><polygon points="22.17 18.52 15 11.35 7.83 18.52 8.54 19.23 14.5 13.27 14.5 23.81 15.5 23.81 15.5 13.27 21.46 19.23 22.17 18.52" /><rect x="8.18" y="8.19" width="13.63" height="1" /></svg></b>');
	JGotop.on({'tap':function(){JGotop.removeClass('gotop_on');Ui.scrollTo(0);}});
	Ui.write(JGotop);
	
	var activeAmount=600,gotopactive=false;
	Ui.scroll.bind('GotoTop',function(event,changedTop){
			if(Ui.scrolltop>activeAmount){
				if(!gotopactive){
					gotopactive=true;
					JGotop.addClass('gotop_on');
				}
			}else{
				if(gotopactive){
					gotopactive=false;
					JGotop.removeClass('gotop_on');
				}
			}
		});
}
function JCommand(){
	var CA=this;
	var zindex=Ui.zindex(),
		ca=J('<div id="commands" class="commands" style="z-index:'+zindex+';height:0;"><div class="commandsWarp"></div></div>'),
		cw=ca.find('>.commandsWarp'),
		cc=J(),
		cm=null,
		state=false;
		Ui.write(ca);
		var __transToDuration=function(d){var _d=parseInt(d/200*500);return (_d>600?600:_d)}
	CA.show=function(c,t){
		if(state){return}
		state=true;t=t||'element';zindex=Ui.zindex();
		cc=J(c);cw.append(cc);
		ca.css('z-index',zindex).addClass('commands_on');
		cm.show(zindex-1);
		ca.stop().animate({'height': ca[0].scrollHeight}, __transToDuration(ca[0].scrollHeight), 'easeOutCubic',function(){
				ca.css('height','');
		});
	}
	CA.hide=function(){
		cm.hide();
		ca.stop().animate({'height': 0}, 500, 'easeOutCubic',function(){
			ca.removeClass('commands_on');
			Ui.hidden(cc);cc=J();
			state=false;
		});
	}
	cm=new JMasker({
			zindex:(zindex-1),
			blur:CA.hide
	});
}
function JMessages(){
	var MS=this;
	var zindex=Ui.zindex(),
		ca=J('<div id="JMessages" class="JMessages" style="z-index:'+zindex+';"></div>');
		Ui.write(ca);
		
	MS.alert=function(c,t){
		if(!c){return}
		zindex=Ui.zindex();t=t||100000;
		ca.html('<div class="alert">'+c+'</div>');
		ca.appendTo(document.body).css('z-index',zindex).addClass('on').on('touchstart',MS.close);
		MS.timed=timed(MS.close,t);
	}
	MS.confirm=function(_c,_bs){
		if(!_c){return}
		var _buttons=new JButtons(null,'bs'),
			_confirm=J('<div class="confirm"><div class="txt">'+_c+'</div></div>');
		_buttons.bind([
			{
				text:"No",
				cursorTap:function(){}
			},
			{
				text:"Yes",
				cursorTap:function(){}
			}
		]);
		zindex=Ui.zindex();
		ca.html(_confirm.append(_buttons.e));
		ca.css('z-index',zindex).addClass('on').on('touchstart','.b',MS.close);
	}
	MS.close=function(event){
		event && event.stopPropagation();
		ca.removeClass('on').off('tap',MS.close);
		MS.timed && MS.timed.clear();
		return false;
		
	}
}
function JRatio(e){
	var _hgt=0,
		_rio=parseFloat(J(e).attr('ratio')),
		_inc = parseFloat(J(e).attr('increment')),
		_min = parseFloat(J(e).attr('min')),
		_max = parseFloat(J(e).attr('max')),
		_imi=J(e).attr('imitate')||0;
		
		if(_imi){
			_imi = J(_imi)[0] ? J(_imi)[0].offsetHeight : 0;
			if (_imi === 0) { return;}
		}
		
		J(e).css('height', '');
		_inc = _inc ? _inc : 0;
		_hgt = _rio ? Math.floor(_rio * e.offsetWidth)+_inc : '';
		_min = _min ? Math.floor(_min * e.offsetWidth) : '';
		_max = _max ? Math.floor(_max * e.offsetWidth) : '';
		
		if (!isNaN(_imi) && _imi !== 0) { _hgt = _imi + _inc }
		
		J(e).css({
			'height': _hgt,
			'min-height': _min,
			'max-height': _max
		});
}
function JGallery(){
	var G=this;
	var Ge=J('<div class="gallery" style="visibility:hidden;"><b class="x"><svg viewBox="0 0 21.21 21.21"><line x1="20.86" y1="0.35" x2="0.35" y2="20.86" style="stroke-miterlimit:10"/><line x1="0.35" y1="0.35" x2="20.86" y2="20.86" style="stroke-miterlimit:10"/></svg></b><div class="viewer"></div></div>'),
		Gv=Ge.find('.viewer'),
		Gx=Ge.find('.x'),
		Gm=J('<div class="menus"></div>');
		
	G.idx=0;
	G.images=[];
	G.imgs=[];
	G.items=[];
	G.inisted=false;
	
	var __size=function(_w,_h){
		var __w=_w,__h=_h;
		if(_w>Ui.width){__w=Ui.width;__h=parseInt(__w/(_w/_h));}
		if(__h>Ui.height){__h=Ui.height;__w=parseInt(__h*(_w/_h));}
		return [__w,__h];
	}
	G.on=function(_idx){
		var _image=G.images[_idx];
		if(!_image.completed){
			G.imgs[_idx]=imgReady((_image.natural||_image.src),function(_img){
				if(_img.width!==0 && _img.height!==0){
					var _s=__size(_img.width,_img.height);
					_img.setAttribute('width',_img.width);
					_img.setAttribute('height',_img.height);
					_img.setAttribute('style','opacity:0;width:'+_s[0]+'px;height:'+_s[1]+'px;transition-duration:0ms;transform:scale(0.4)');
					J(G.items[_idx]).append(_img);
					timed(function(){
						J(_img).css({
							'opacity':1,
							'transition-duration':'300ms',
							'transform':'scale(1)',
							'transition':'all 500ms ease-out'
						});
						J(G.items[_idx]).removeClass('ing');
					},500);
					_image.completed=true;
				}
			},null,function(){
				timed(function(){
					J(G.items[_idx]).append('<img src=\''+Ui.__imgDefault+'\' />');
					J(G.items[_idx]).removeClass('ing');
				},300);
				_image.completed=true;
			});
		}else{
			timed(function(){J(G.items[_idx]).removeClass('ing');},500);
			_image.completed=true;
		}
		Gm.find('.current').html(_idx+1);
		Ge.find('.img_on').removeClass('img_on');
		G.items[_idx].addClass('img_on');
	}
	G.view=function(_imgs,_currentImg){
		if(!G.inisted){Ge.appendTo(Ui.dombody);G.inisted=true}
		Ge.removeAttr('style').addClass('visible');
		_imgs.each(function(i){
			var _idx=G.images.length,_image=JImg(this,false),_desc="";
				_image.completed=false;
				G.images[_idx]=_image;
				G.items[_idx]=J('<span class="img ing" style="width:'+Ui.width+'px;height:'+Ui.height+'px">'+((_image.title||_image.alt)?'<span class="dsc">'+(_image.title?'<strong class="ttl">'+_image.title+'</strong>':'')+(_image.alt?'<p class="alt">'+_image.alt+'</p>':'')+'</span>':'')+'</span>');
		});
		Gv.html(G.items);
		
		G.idx=J(_imgs).index(_currentImg)||0;
		Gv.attr('style','transform: translate3d('+(0-G.idx*Ui.width)+'px, 0px, 0px);');
		
		if(G.images.length>1){Gm.html('<b class="current">'+(G.idx+1)+'</b>/'+G.images.length).appendTo(Ge);}
		(G.images.length===1) ? Gm.hide() : Gm.show() ;
		G.on(G.idx);
	}
	
	var _slid=false,_holding=false,
		_cx=0,_cy=0,_cz=0,_zr=0,_moveX=0,_moveY=0,_slidX=0,_slidSX=0,_slidAmount=0,
		_changedImg=J(),
		_zoom=1;
		
	G.events=Ui.touch(Gv);
	Gx.on('touchstart',function(event){G.close();event.stopPropagation();event.preventDefault();});
	G.close=function(){
		Gm.empty();
		G.images.length=0;
		G.imgs.length=0;
		G.items.length=0;
		Gv.empty().removeAttr('style');
		Ge.removeClass('visible').css('visibility','hidden');
		
		_slid=_holding=false;
		_cx=_cy=_cz=_zr=_moveX=_moveY=_slidX=_slidSX=_slidAmount=0;
		_changedImg=J(),
		_zoom=1;
	}
		
	var __slid=function(d,x){d=d?d:0;_slidX=x;Gv.css({'transition-duration':d+'ms','transform':'translate3d('+_slidX+'px, 0px, 0px)'});},
		__zoom=function(_d,_x,_y,_z){
			_changedImg.css({'transition-duration':_d+'ms','transform':'translate3d('+_x+'px,'+_y+'px, 0px) scale('+_z+')'});
			_moveX=_x;_moveY=_y;_zoom=_z;
		}
	Ge.on('touchmove',function(event){event.stopPropagation();event.preventDefault();});
	G.events.bind({
		'touchStart':function(event){
			event.stopPropagation();event.preventDefault();
			
			_changedImg=J(G.imgs[G.idx]);
			_cx=_moveX;_cy=_moveY;_cz=_zoom;
			
			_slidAmount=G.images.length-1;
			
			_slidSX=_slidX=(0-G.idx*Ui.width);
		},
		'touchEnd':function(event){
			_holding && (_holding=false,Ge.removeClass('holding'));
			(_zr===0.5) && __zoom(200,_cx,_cy,1);
			_cx=0;_cy=0;_cz=0;_zr=0;
			
			if(_slid){
				var _idx=G.idx,_ress,_cc;
				if(_slidX>0){
					G.idx=0;__slid(200,0);
				}else{
					_cc=(0-_slidX/Ui.width);
					if(Math.floor(_cc)>=_slidAmount){
						G.idx=_slidAmount;
					}else{
						_ress=(_slidX%Ui.width)/Ui.width;(_ress<0) && (_ress=0-_ress);
						if(_idx>_cc){G.idx=(_ress>0.7)?_idx:_idx-1;}
						if(_idx<_cc){G.idx=(_ress>0.3)?_idx+1:_idx;}
					}
					__slid(200,0-G.idx*Ui.width);
				}
				if(G.idx!=_idx){G.on(G.idx)}
			}
		},
		"doubleTap":function(event){
			(_zoom!==1) && (_cz=1);
			(_zoom===1) && (_cz=2);
			__zoom(300,0,0,_cz);
		},
		"swipeLeft":function(event){},
		"swipeRight":function(event){},
		"drag":function(event,p){
			(!_holding) && (_holding=true,Ge.addClass('holding'));
			if(_zoom>1){
				__zoom(0,(_cx+p.x-p._x),(_cy+p.y-p._y),_zoom);
			}
			if(_zoom===1){
				_slid=true;
				__slid(0,(_slidSX+p.x-p._x));
			}
		},
		"zoom":function(event,d){
			_zr=_cz+d/200;
			(_zr<0.5) && (_zr=0.5);
			(_zr>4) && (_zr=4);
			__zoom(0,_cx,_cy,_zr);
		}
	});
}
function JSlider(_el,_options){
	var __F=this;
		__F.params={
			sds:'.sds',
			sd:'.sd',
			dir:'x',
			mode:'slider', //'2d/3d'
			rounded:false,
			menuType:1,
			fixsize:false,
			autoPlay:false
		};
		_typeof(_options)==='object' && map(_options,function(){(__F.params[x] = _options[x])});
		__F.e=J(_el);
		__F.items = __F.e.find(__F.params.sd);
		__F.length=__F.items.length;
		
		if(!__F.e[0]){return;}
		var __E=E(__F.e[0]);
		if(_E['JSlider'] && __F.length!==_E['JSlider'].length){_E['JSlider'].install();return _E['JSlider'];}
		
		__E.set('JSlider', this);
		
		__F.options=__E.options(__F.params);
		__F.w = __F.e.find(__F.params.sds);
		__F.index = 0;
		__F.menu = J('<span class="sms"></span>').appendTo(__F.e);
		__F.menuItems = [];
		__F.inited=false;
		
		var mt=__F.options['menuType'],
			autoPlay=__F.options['autoPlay'],
			dirs=Ui.__direction,
			dir=dirs[__F.options['dir']||__F.params['dir']],
			vs=__F.e[0].offsetWidth||Ui[dir.sz];
			
		__F.menu.attr('type',mt);
		__F.events=new JMatrix('events',{
			slidStart:new JMatrix('slidStart'),
			sliding:new JMatrix('sliding'),
			slidEnd:new JMatrix('slidEnd'),
			slid:new JMatrix('slid'),
			first:new JMatrix('first'),
			last:new JMatrix('last')
		});
		if(__F.options['onSlid'] && window[__F.options['onSlid']]){__F.events.slid.bind(window[__F.options['onSlid']]);}
		if(__F.options['onFirst'] && window[__F.options['onFirst']]){__F.events.slid.bind(window[__F.options['onFirst']]);}
		if(__F.options['onLast'] && window[__F.options['onLast']]){__F.events.slid.bind(window[__F.options['onLast']]);}
		
		__F.install=function(){
			var _items=__F.e.find(__F.params.sd);
			if(__F.inited && (__F.length===_items.length || _items.length<2)){return}
			
			__F.items = _items;
			__F.length=__F.items.length;
			
			__F.menu.empty();
			__F.menuItems = [];
			if(mt===1){
				var _menuitems='';
				map(__F.length,function(){_menuitems+='<i></i>';});
				__F.menu.html(_menuitems);
				__F.menuItems=__F.menu.find('i');
			}else if(mt===0){
				__F.menu.html('<b>'+(__F.index+1)+'</b>/'+__F.length);
			}else{
				__F.menu.detach();
			}
			__F.inited=true
		}
		__F.install();
		var posC=0,crtC=0,strtC=0,dtcC=0,movC=0,_viwW=__F.w.width(),_viwH=__F.w.height(),
			drag=false,
			autoPlayerTimed=timed(),
			slid=function(s,d){
				d=d?d:0;
				var _md=(dir.axs==='x')?(s+'px, 0px, 0px'):('0px, '+s+'px, 0px');
				__F.w.css({
					'transition-duration':d+'ms','-webkit-transition-duration':d+'ms',
					'transform':'translate3d('+_md+')','-webkit-transform':'translate3d('+_md+')'
				});
			},
			turnon=function(_idx){
				__F.index=_idx;
				__F.w.find('.sd_on').removeClass('sd_on')
				J(__F.items[_idx]).addClass('sd_on');
				
				if(__F.length>1){
					J(__F.menuItems).removeClass('on');
					J(__F.menuItems[_idx]).addClass('on');
					__F.menu.find('b').html(_idx+1);
				}
				if(__F.options.fixsize){
					__F.e.css('height',__F.items[_idx].scrollHeight);
				}
				__F.e.trigger("slider",__F);
			};
		var   _deg=360/__F.length,
	               _radius=(_viwW/2) / Math.tan((_deg/2) / 180 * Math.PI),
	        	_idx=__F.index,_degC=0,_moS=null,_moC=0,_moF=0,
	        	_arrange=[],
	        	_page=false,
	        	_pageTimed=timed(),
	        	_pageend=timed(),
	              _rotate=function(c,d){
	                    d=d||0;
	                    __F.w.css({
	                        'transition-duration':d+'ms','-webkit-transition-duration':d+'ms',
	                        'transform':'rotateY('+c+'deg) translateZ('+(0-_radius)+'px)',
	                        'transform-origin':'50% 50% '+(0-_radius)+'px'
	                    });
	              },
	              _index=function(c,f){var __idx=0; __idx=Math[(f<0?'ceil':'floor')](Math.abs(c/_deg))%__F.length;(c>0)&&(__idx=__F.length-__idx);(__idx===__F.length)&&(__idx=0);return __idx;},
	              _opacity=function(c,f){
	                    var __lim=0.95,__idx=_index(c,f),__idxL=(__idx+f<0?__F.length+__idx+f:__idx+f),_o=Math.abs(c%_deg/_deg);
	                    (_o>1||_o===0)&&(_o=1);
	                    $(__F.items[__idxL]).css('opacity',(1-_o<__lim?__lim:1-_o));
	                    $(__F.items[__idx]).css('opacity',(_o<__lim?__lim:_o)+0.3);
	              };
		var _modes={
			'slider':{
				'install':function(){
					turnon(0);
					if(autoPlay){
						J(window).on({'focus':this.player(),'blur':function(){autoPlayerTimed.clear();}});
						this.player();
					}
				},
				'start':function(event){
					var touch0=event.originalEvent.touches[0];
				
					posC=(0-__F.index*vs);
					crtC= (0-__F.index*vs);
					dtcC=__F.items[0].offsetWidth*(__F.length-1);
					
					_viwW=__F.w[0].offsetWidth;
					_viwH=__F.w[0].offsetHeight;
					
					__F.events.slidStart.run();
					autoPlayerTimed.clear();
				},
				'going':function(event){
					//event.preventDefault();
					if(event.originalEvent.touches.length <1){return}
					var touch0=event.originalEvent.touches[0];
					
					(strtC>touch0['client'+dir.Axs]) && (movC=1);
					(strtC<touch0['client'+dir.Axs]) && (movC=-1);
					
					//sliding
					if(Ui.__touchaxs===dir.axs){
						strtC===0 && (strtC=touch0['client'+dir.Axs]);
						drag=true;
						crtC=posC+touch0['client'+dir.Axs]-strtC;
						slid(crtC);
						__F.events.sliding.run();
					}
				},
				'end':function(){
					if(drag){
					var	_math=(crtC>posC)?"ceil":"floor",
						_idx=Math.abs(Math[_math](crtC/vs));
						_idx=crtC>0?0:_idx;
						_idx=_idx<0?0:_idx;
						_idx=(_idx>=__F.length-1)?__F.length-1:_idx;
						
						posC=0-_idx*vs;
						
						(movC===-1  && crtC>0) &&  __F.events.first.run([_idx]);
						(movC===1 && crtC<0-dtcC) &&  __F.events.last.run([_idx]);
						
						__F.slid(_idx);
						
						strtC=0;
						movC=0;
						drag=false;
						
						__F.events.slidEnd.run([__F.index]);
						autoPlay && timed(_modes['slider'].player,2000);
					}
				},
				'player':function(){
					autoPlayerTimed.clear();
					var _idx=__F.index,_of=false;
					autoPlayerTimed=timed(function(){
							if(!_of){_idx++;(_idx===__F.length)&& (_of=true,_idx=(__F.length-1));}
							if(_of){_idx--;(_idx===0) && (_of=false);}
							__F.slid(_idx);
					},autoPlay,true);
				},
				'bind':function(){
					__F.e.on({'touchstart':this.start,'touchmove':this.going,'touchend':this.end});
				},
				'to':function(_idx){
					posC=0-_idx*vs;
					slid(posC,300);
					turnon(_idx);
					__F.events.slid.run([_idx]);
					drag=false;
				}
			},
			'cube':{
	        		'install':function(){
		                 //Cube
		                __F.e.css({'perspective':Math.floor(_radius*10)+'px'});
		                __F.w.css({
		                	'transform':'rotateY(0deg) translateZ('+(0-_radius)+'px)',
		                	'transform-origin':'50% 50% '+(0-_radius)+'px'
		                	});
		                __F.items.each(function(i){$(this).css('transform','rotateY('+(_deg*i)+'deg) translateZ('+(_radius)+'px)');});
		            },
	        		'going':function(event){
	        			_degC+=_moF*2;
	            			_rotate(_degC);
	            			_opacity(_degC,_moF);
	        		},
	        		'end':function(){
	        			_degC=(_degC%_deg!==0?Math[(_moF>0?'ceil':'floor')](_degC/_deg)*_deg:_degC);
			                _rotate(_degC,200);
			                _idx=_index(_degC);
			                $(__F.items[_idx]).css('opacity',1);
			                turnon(_idx);
	        		},
	        		'to':function(){},
	        		'bind':function(){
        			        Ui.touch(__F.e[0],{
				            'touchStart':function(){},
				            'touchMove':function(event){
				                    event.preventDefault();
				                    if(Ui.__touchaxs===dir.axs){
					                    _moC=event.originalEvent.touches[0].clientX;
					                    _moS===null && (_moS=_moC);
					                    (_moC-_moS)>0 && (_moF=1);
					                    (_moC-_moS)<0 && (_moF=-1);
					                    if(_moF!==0){exe(_modes[__F.options.mode],'going',event);}
				                    }
				            },
				            'touchEnd':function(){
				            	  exe(_modes[__F.options.mode],'end',event);
				                _moF=0;
				                _moS=null;
				            }
				        });
	        		}
        		},
        		'page':{
	        		'install':function(){
		                  //page
		                   __F.items.each(function(i){
		                            var _l=__F.length-1-i;
		                            $(this).css({
		                                'z-index':_l,
		                                'opacity':(i<3?1/(i+1):0),
		                                'transition-duration':'300ms',
		                                'transform':'translate3d('+(i*20)+'px,'+(0-i*30)+'px,'+(0-i*30)+'px)'
		                            });
		                            this.arrangeIndex=i;
		                            _arrange.push(i);
		                    });
		                    turnon(0);
		            },
	        		'going':function(event){
	        			if(_page){return}
	        				if(_moF>0){
			                            var _tmp=_arrange[_arrange.length-1];
			                            _arrange.splice(_arrange.length-1,1);
			                            _arrange.splice(0,0,_tmp);
			                            _idx=_arrange[0];
			                            map(_arrange,function(k,v){
		                            		if(k>0){
				                            	$(__F.items[v]).css({
				                            		'z-index':k,
				                                		'opacity':(k<3?1/(k+1):0),
				                            		'transition-duration':'600ms',
				                                		'transform':'rotate(0) translate3d('+(k*20)+'px,'+(0-k*30)+'px,'+(0-k*30)+'px)'
				                            	});
			                            	}
			                            });
			                            $(__F.items[_idx]).css({
		        				    'z-index':(_arrange.length+10),
			                                'opacity':0,
			                                'transition-duration':'0ms','transform':'rotate(-20deg) translate3d(0,0,0)'
			                   		});
			                            _pageTimed.clear();
			                            _pageTimed=timed(function(){
			                            	$(__F.items[_idx]).css({
				                                'opacity':1,
				                                'transition-duration':'500ms',
				                                'transform':'rotate(0) translate3d(0,0,0)'
				                            });
			                            },300);
			                            // front
			                            _page=true;
			                            _pageend.clear();
			                            _pageend=timed(function(){_page && (_page=false);},900);
			                            turnon(_idx);
		        		}else if(_moF<0){
		        				$(__F.items[_arrange[0]]).css({
		        				    'z-index':0,
			                                'opacity':0,
			                                'transition-duration':'600ms',
			                                'transform':'rotate(-20deg) translate3d(0,0,0)'
			                   		});
			                   		$(__F.items[_arrange[1]]).css({'opacity':0.9,});
			                   		 var _tmp=_arrange[0];
			                            _arrange.splice(0,1);
			                            _arrange.push(_tmp);
			                            _idx=_arrange[0];
			                            
			                            _pageTimed.clear();
			                            _pageTimed=timed(function(){
			                            	map(_arrange,function(k,v){
				                            	$(__F.items[v]).css({
				                            		'z-index':k,'opacity':(k<3?1/(k+1):0),
				                            		'transition-duration':'300ms',
				                                		'transform':'rotate(0) translate3d('+(k*20)+'px,'+(0-k*30)+'px,'+(0-k*30)+'px)'
				                            	});
			                            	});
			                            },600);
			                           _pageend=timed(function(){ _page && (_page=false);},900);
			                   // back
			                   _page=true;
			                   turnon(_idx);
		        	      }
	        		},
	        		'end':function(){},
	        		'to':function(){},
	        		'bind':function(){
        			        Ui.touch(__F.e[0],{
				            'touchStart':function(event){exe(_modes[__F.options.mode],'start',event);},
				            'touchMove':function(event){
				                    event.preventDefault();
				                     if(Ui.__touchaxs===dir.axs){
					                    _moC=event.originalEvent.touches[0].clientX;
					                    _moS===null && (_moS=_moC);
					                    
					                    (_moC-_moS)>0 && (_moF=1);
					                    (_moC-_moS)<0 && (_moF=-1);
					                    
					                    if(_moF!==0){exe(_modes[__F.options.mode],'going',event);}
				                    }
				            },
				            'touchEnd':function(event){
				            	  exe(_modes[__F.options.mode],'end',event);
				                _moF=0;
				                _moS=null;
				            }
				        });
	        		}
        		}
		};
		
		_modes[__F.options.mode].install();
		_modes[__F.options.mode].bind();
		__F.slid=_modes[__F.options.mode].to;
}
function JStar(e){
	var _e=J(e),
	_score=(_e.attr('score')),
	_score0=0,
	_score1=0,
	_stars=_e.find('i'),
	_cell=14,
	_starOn=_stars[0],
	_starOf=_stars[1];
	
	if(!_e[0] || !_score){return;}
		
	if(_score.search('.')>=0){
		_score=_score.split('.');
		_score0=parseInt(_score[0]);
		_score1=Math.round(parseFloat('0.'+_score[1]));
	}else{
		_score0=parseInt(_score);
	}
	
	var _w1=_cell*_score0+(_score1===1?_cell/2:0),
		_w2=_cell*5-_w1;
	J(_starOn).width(_w1).addClass('on');
	J(_starOf).width(_w2);
	
	E(_e[0]).set('JStar',this);
}
function JScroller(e){
	var __F=this;
		__F.e=$(e);
		if(!__F.e[0] && E(_e[0]).has('JScroller')){return;}
		E(e).set("JScroller",this);
		__F.events=new JMatrix({
			"top":new JMatrix(),
			"going":new JMatrix(),
			"bottom":new JMatrix(),
		});
		
	var  _dir="y",_dur=500,_di=0,
		_disX=__F.e[0].scrollWidth,_disY=__F.e[0].scrollHeight,
		_viwX=__F.e[0].offsetWidth,_viwY=__F.e[0].offsetHeight,
		_crtX=0,_crtY=0,_psX=0,_psY=0,
		_strC=0,_moC=0,
		_scrollble=false,
		_scrollTimed=timed(),
		_scrollTween=new JTween(),
		_boundary=function(x,y,d){
			d=d||0;
			_dir==='x'&&(y=0);
			_dir==='y'&&(x=0);
			__F.e.css({
					'transition-duration':d+'ms','-webkit-transition-duration':d+'ms',
					'transform':'translate3d('+x+'px, '+y+'px, 0px)','-webkit-transform':'translate3d('+x+'px, '+y+'px, 0px)'
			});
		},
		_scroll=function(x,y,d){
			d=d||0;
			var _n='Top',_c=0;
			if(_dir==='x'){
				_n='Left';_c=x;
			}else{
				_n='Top';_c=y;
			}
			_c<0 && (_c=0);
			if(d!==0){
				var _ps=__F.e[0]['scroll'+_n];
				_scrollTween.duration=d;
				_scrollTween.run(function(r){
					__F.e[0]['scroll'+_n]=_ps+(_c-_ps)*r;
				});
			}else{
				__F.e[0]['scroll'+_n]=_c;
			}
		};
	var _count=function(d){
		var _c=0;
		switch(d){
			case 'x':
				_c=(Math.abs(_moC/_viwX)+0.5)*_viwX;
				_c<0 && (_c=0);
				_c>_disX && (_c=_disX);
			break;
			case 'y': 
				_c= (Math.abs(_moC/_viwY)+0.5)*_viwY;
				_c<0 && (_c=0);
				_c>_disY && (_c=_disY);
			break;
		};
		return _c;
	};
	var _handles={
			'start':function(event){
				var touch0=event.originalEvent.touches[0];
				
				_disX=__F.e[0].scrollWidth;
				_disY=__F.e[0].scrollHeight;
				
				_viwX=__F.e[0].offsetWidth;
				_viwY=__F.e[0].offsetHeight;
				
				_crtX=_psX=__F.e[0].scrollLeft;
				_crtY=_psY=__F.e[0].scrollTop;
				
				_scrollble=true;
			},
			'going':function(event){
				event.preventDefault();
				var touch0=event.originalEvent.touches[0];
	
				if(!_scrollble){return ;}
				if(Ui.__touchaxs==='x'){
					_strC===0 && (_strC=touch0.clientX);
					_moC=touch0.clientX-_strC;
					_crtX=_psX -_moC;
					_dir='x';
					_scroll(_crtX,_crtY);
				}
				if(Ui.__touchaxs==='y'){
					_strC===0 && (_strC=touch0.clientY);
					_moC=touch0.clientY-_strC;
					_crtY =_psY- _moC;
					_dir='y';
					_scroll(_crtX,_crtY);
				}
			},
			'end':function(event){
				if(!_scrollble){return;}
				_strC=0;
				_scrollble=false;
			}
		};
	
	Ui.touch(__F.e,{
		'touchStart':_handles.start,
		'touchMove':_handles.going,
		'touchEnd':_handles.end,
		'swipeLeft':function(){
			//_scroll(_posX+_count('x'),_posY,_dur);
		},
		'swipeRight':function(){
			//_scroll(_posX-_count('x'),_posY,_dur);
		},
		'swipeUp':function(){
			_di=_count('y');
			_scroll(__F.e[0].scrollLeft,__F.e[0].scrollTop+_di,(_di/_viwY*_dur));
		},
		'swipeDown':function(){
			_di=_count('y');_scroll(__F.e[0].scrollLeft,__F.e[0].scrollTop-_di,(_di/_viwY*_dur));
		}
	});
	__F.scroll=function(e){
		var _e=__F.e.find(e);if(!_e[0]){return;}
		
		_scrollTimed.clear();
		var	_osX=Math.ceil(_e.offset().left),_osY=Math.ceil(_e.offset().top),
			_szX=_e[0].offsetWidth,_szY=_e[0].offsetHeight;
			
		if((_osX+_szX)>_viwX){_scroll(_posX+(_osX+_szX-_viwX),_posY,300);}
		if((_osX)<0){_scroll((_posX+_osX),_posY,300);}
		
		_scrollTimed=timed(_scrollend,600);
	}
	return this;
}
function JTab(_e,_params){
    var _S = this;
    _S.params = J.extend({
        trgarea: '.j_tbs',
        trg: '.tb',
        rsparea: '.j_tbws',
        rsp: '.tbw',
        index: 0,
        lev: 2,
        store: true,
        ontab:null,
        ev: 'click'
    }, _params);
    _S.trgarea = _e ? J(_e) : J(_S.params.trgarea);
    _S.id = _S.trgarea.attr('id');
    
    if (!_S.trgarea[0]){ return;}
   
    var _options=E(_S.trgarea[0]).options(_S.params);
    	    if(_options['rsp'] && _options['rsp']!==_S.params.rsp){
    		    _options['rsparea']=_options['rsp'];
    		    delete _options['rsp']
    	    }
    _S.params = J.extend({}, _S.params, _options);
    
    _S.params.ev = _S.trgarea.attr('ev') || _S.params.ev;
    _S.rsparea = J(E(_S.trgarea).near(_S.params.rsparea, _S.params.lev));
    
    if (!_S.rsparea[0]){ return;}
    
    _S.ontab=_S.params.ontab && window[_S.params.ontab] ?window[_S.params.ontab]:function(){};
    
    _S.storage = Ui.storage('Ui-tab');
    _S.index = _S.params.index;
    _S.tb=null;
    _S.tbw=null;
    
    E(_S.trgarea[0]).set('JTab',this);
    E(_S.rsparea[0]).set('JTab',this);
    
    var _trgCsn = _S.params.trg.substring(1),
    		_rspCsn = _S.params.rsp.substring(1);
    var __trgs = function (a) {return (a !== undefined ? _S.trgarea.children(_S.params.trg).eq(a) : _S.trgarea.children(_S.params.trg));},
          __rsps = function (a) {return (a !== undefined ? _S.rsparea.children(_S.params.rsp).eq(a) : _S.rsparea.children(_S.params.rsp));},
          __geton = function () {return J(_S.trgarea.children(_S.params.trg + '_on')[0] || __trgs(_S.index))};
    _S.on = function (_e, _event) {
        if (_event && _S.index === __trgs().index(_e)) {return;}
        if (typeof(_e) === 'number') {_e = __trgs(_e);}
        _S.index = __trgs().index(_e);
        if (__rsps(_S.index)[0]) {
            __trgs().removeClass(_trgCsn + '_on');
            __rsps().removeClass(_rspCsn + '_on');

            J(_e).addClass(_trgCsn + '_on').trigger("tab");
            J(__rsps(_S.index)).css('opacity',0).addClass(_rspCsn + '_on').fadeTo(400,1);
            
            
        }
        if (_S.index === 0 && !__rsps(_S.index)[0]) {
            __trgs().removeClass(_trgCsn + '_on');
            J(_e).addClass(_trgCsn + '_on');
        }
        _S.tb=_e;_S.tbw=__rsps(_S.index)[0];
        exe(_S.ontab,_S);
        if (_S.params.store && _S.id) {_S.storage.set(_S.id, _S.index);}
    }
    _S.init = function () {
        if (_S.id && _S.params.store && _S.storage.get(_S.id)) {
            _S.on(__trgs(_S.storage.get(_S.id)));
        } else {
            _S.on(__geton());
        }
        if (_S.params.ev === 'click') {
            _S.trgarea.on(_S.params.ev, '>' + _S.params.trg, function (event) {
                _S.on(this, event);
            });
        } else if (_S.params.ev === 'hover') {
            _S.trgarea.on('mouseover', '>' + _S.params.trg, function (event) {
                _S.on(this, event)
            });
        }
    }
    _S.init();
}
function JContentEditable(e) {
    if (!e){reutrn;}
    var _ph = trim(e.getAttribute('placeholder') || "");
    E(e).JContentEditable=this;
    if(!_ph){return;}
    var _placehold = function () {
        var _ct = e.innerHTML.trim();
        if ((_ct.length > 0 && _ct !== _ph )) {
            J(e).removeClass("placeholder");
        } else {
            J(e).html(_ph);
            J(e).addClass("placeholder");
        }
    }
    if (_ph) {
        _placehold();
        J(e).on({
            "focus": function () {
                var _ct = e.innerHTML.trim();
                if (_ct === _ph) {
                    e.innerHTML = "";
                    J(e).removeClass("placeholder");
                }
            },
            "blur": function () {
                _placehold();
            }
        });
    }
}
function redirect(_href){_href && (window.location.href=_href);}
function goback(){window.history.go(-1);}
//function alert(a,b,c){Ui.message.alert(a,b,c);return Ui.message;}

//dom Ready
Ui.on('ready',function(){
		Ui.install('*[ratio],.ratio', 'JRatio');
		Ui.install('*[contenteditable="true"]', 'JContentEditable');
		
		// Text more
		J(document).on('tap','.txa',function(){
			if(!J(this).hasClass('up')){
				J(this).css('max-height',this.scrollHeight);
				J(this).addClass('up');
			}else{
				J(this).css('max-height','');
				J(this).removeClass('up');
			}
		});
		Ui.on('change',function(){
			$('.txa:not([txa])').each(function(){
				if(this.offsetWidth!=0&&this.offsetHeight!=0){
					if(this.scrollHeight>this.offsetHeight){
					 	this.setAttribute("txa",1);
					 }else{
					 	this.setAttribute("txa",0);
					 }
				}
			});
		});
		
		//Img Loader
		Ui.on('ready',function(){J('img:not([loaded])').each(function(){JImg(this);});});
		Ui.on('change',function(){J('img:not([loaded])').each(function(){JImg(this);});});
		
		//Photos JGallery
		J(document).on('tap','.pho img',function(){Ui.gallery.view(J(this).parents('.pho').eq(0).find('img'),this);});
		
		//JSlider
		Ui.install('.slider','JSlider');
		
		//JScroller
		Ui.install('.scroller','JScroller');
		
		//JStars
		Ui.install('.star','JStar');
});



