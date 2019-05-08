/*md5()*/!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;var e,i,a,h,d,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,h=v,d=m,l=o(l,g,v,m,n[e],7,-680876936),m=o(m,l,g,v,n[e+1],12,-389564586),v=o(v,m,l,g,n[e+2],17,606105819),g=o(g,v,m,l,n[e+3],22,-1044525330),l=o(l,g,v,m,n[e+4],7,-176418897),m=o(m,l,g,v,n[e+5],12,1200080426),v=o(v,m,l,g,n[e+6],17,-1473231341),g=o(g,v,m,l,n[e+7],22,-45705983),l=o(l,g,v,m,n[e+8],7,1770035416),m=o(m,l,g,v,n[e+9],12,-1958414417),v=o(v,m,l,g,n[e+10],17,-42063),g=o(g,v,m,l,n[e+11],22,-1990404162),l=o(l,g,v,m,n[e+12],7,1804603682),m=o(m,l,g,v,n[e+13],12,-40341101),v=o(v,m,l,g,n[e+14],17,-1502002290),g=o(g,v,m,l,n[e+15],22,1236535329),l=u(l,g,v,m,n[e+1],5,-165796510),m=u(m,l,g,v,n[e+6],9,-1069501632),v=u(v,m,l,g,n[e+11],14,643717713),g=u(g,v,m,l,n[e],20,-373897302),l=u(l,g,v,m,n[e+5],5,-701558691),m=u(m,l,g,v,n[e+10],9,38016083),v=u(v,m,l,g,n[e+15],14,-660478335),g=u(g,v,m,l,n[e+4],20,-405537848),l=u(l,g,v,m,n[e+9],5,568446438),m=u(m,l,g,v,n[e+14],9,-1019803690),v=u(v,m,l,g,n[e+3],14,-187363961),g=u(g,v,m,l,n[e+8],20,1163531501),l=u(l,g,v,m,n[e+13],5,-1444681467),m=u(m,l,g,v,n[e+2],9,-51403784),v=u(v,m,l,g,n[e+7],14,1735328473),g=u(g,v,m,l,n[e+12],20,-1926607734),l=c(l,g,v,m,n[e+5],4,-378558),m=c(m,l,g,v,n[e+8],11,-2022574463),v=c(v,m,l,g,n[e+11],16,1839030562),g=c(g,v,m,l,n[e+14],23,-35309556),l=c(l,g,v,m,n[e+1],4,-1530992060),m=c(m,l,g,v,n[e+4],11,1272893353),v=c(v,m,l,g,n[e+7],16,-155497632),g=c(g,v,m,l,n[e+10],23,-1094730640),l=c(l,g,v,m,n[e+13],4,681279174),m=c(m,l,g,v,n[e],11,-358537222),v=c(v,m,l,g,n[e+3],16,-722521979),g=c(g,v,m,l,n[e+6],23,76029189),l=c(l,g,v,m,n[e+9],4,-640364487),m=c(m,l,g,v,n[e+12],11,-421815835),v=c(v,m,l,g,n[e+15],16,530742520),g=c(g,v,m,l,n[e+2],23,-995338651),l=f(l,g,v,m,n[e],6,-198630844),m=f(m,l,g,v,n[e+7],10,1126891415),v=f(v,m,l,g,n[e+14],15,-1416354905),g=f(g,v,m,l,n[e+5],21,-57434055),l=f(l,g,v,m,n[e+12],6,1700485571),m=f(m,l,g,v,n[e+3],10,-1894986606),v=f(v,m,l,g,n[e+10],15,-1051523),g=f(g,v,m,l,n[e+1],21,-2054922799),l=f(l,g,v,m,n[e+8],6,1873313359),m=f(m,l,g,v,n[e+15],10,-30611744),v=f(v,m,l,g,n[e+6],15,-1560198380),g=f(g,v,m,l,n[e+13],21,1309151649),l=f(l,g,v,m,n[e+4],6,-145523070),m=f(m,l,g,v,n[e+11],10,-1120210379),v=f(v,m,l,g,n[e+2],15,718787259),g=f(g,v,m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,h),m=t(m,d);return[l,g,v,m]}function a(n){var t,r="";for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function d(n){return a(i(h(n),8*n.length))}function l(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;16>r;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="0123456789abcdef",o="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}function v(n){return unescape(encodeURIComponent(n))}function m(n){return d(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
Array.prototype.isin(e,a,i){var l;if(a){l = a.length;i = i ? i < 0 ? Math.max( 0, l + i ) : i : 0;for ( ;i < l;i++ ) {if ( i in a && a[ i ] === e ){return true;}}}return false;}
function untill(a,b,c,d){if(typeof(a)!=='function' || typeof(b)!=='function'){return};if(a()){return b()};d=d||5000;var x=11,i=0,_id=setInterval(function(){if(d>0 && i>d){clearInterval(_id);typeof(c)==="function" && c();};if(a()){clearInterval(_id);b();};i+=x;},x);}
!(function(win){
	if(!win.APP){win.APP=function(){}}else{return;}
	var APP=win.APP;
	APP.os=((function(){var ua = navigator.userAgent.toLowerCase();if (/iphone|ipad|ipod/.test(ua)){return "IOS";}else if (/android/.test(ua)){return "Android";}})());
	var _JBridge=function(){
			this.__bridge=null;
			this.__registers=[];
			this.__calls=[];
			this.ready=false;
			this.error=false;
			this.timeout=1000;
			this.events=new Jmatrix("events",{
				"ready":new Jmatrix(),
				"error":new Jmatrix(),
				"complete":new Jmatrix(),
				"response":new Jmatrix()
			});
			var _S=this;
			/*Android*/
			if (window.WebViewJavascriptBridge){_S.ready=true;_S.__bridge=window.WebViewJavascriptBridge;}else{document.addEventListener('WebViewJavascriptBridgeReady',function(){_S.ready=true;_S.__bridge=window.WebViewJavascriptBridge;},false)};
			/*IOS*/	
			!(function(callback){
		                if(_S.__bridge!==null ){return ;}
		                if(window.WVJBCallbacks){ return window.WVJBCallbacks.push(callback);};window.WVJBCallbacks = [callback];
		                var WVJBIframe= document.createElement('iframe');WVJBIframe.style.display = 'none';WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';document.documentElement.appendChild(WVJBIframe);setTimeout(function(){document.documentElement.removeChild(WVJBIframe)},0);
	        	})(function(_bridge){if(_bridge){_S.ready=true;_S.__bridge=_bridge;}});
	       
		    untill(function(){
				return _S.__bridge!==null;
		    },function(){
				for(var i=0,l=_S.__registers.length;i<l;i++){
					 _S.__register(_S.__registers[i].n,_S.__registers[i].f);
				};
				for(var i=0,l=_S.__calls.length;i<l;i++){
					 _S.__call(_S.__calls[i].n,_S.__calls[i].p,_S.__calls[i].f);
				}
				_S.events.ready.run();
				_S.events.complete.run([true]);
		    },function(){
				this.error=true;
				for(var i=0,l=_S.__calls.length;i<l;i++){typeof(_S.__calls[i].f==="function") && _S.__calls[i].f.apply(_S,[null]);}
				_S.events.error.run();
				_S.events.complete.run([false]);
			},_S.timeout);
	};
	_JBridge.prototype={
		"__register":function(n,f){
			if(this.__bridge===null){
				this.__registers.push({"n":n,"f":f});return;
			}else{
				this.__bridge.init(function(message,responseCallback){responseCallback("")});
				this.__bridge.registerHandler(n,f);
				return;
			}
		},
		"__call":function(n,p,f){
			if(this.__bridge===null){
				this.error?f.apply(this,[null]):this.__calls.push({"n":n,"p":p,"f":f});return;
			}else{
				this.__bridge.callHandler(n,p,f);return;
			}
		},
		"register":function(n,f){this.__register(n,f);},
		"call":function(n,p,f){this.__call(n,p,f);}
	};
	var __apply=function(f){typeof(f)==="function" && f.apply(f,[].slice.call(arguments,1));},
		_datatype=function(_type,_data){
			var __datatypes={
					"xml": function(){return $(_data);},
					"html": function(){return $(_data);},
					"script": function(){return _data},
					"json": function(){return JSON.parse(_data);},
					"jsonp": function(){return JSON.parse(_data);},
					"text": function(){return _data}
				};
			return __apply(__datatypes[_type]);
	};
	APP.bridge=new _JBridge();
	APP.data=function(params){
		var _key=md5(params.key||params.url),
			_type="string",
			_handlename=["beforeSend","success","error","complete"],
			_handles={};
			for(var i=0,l=_handlename.length;i<l;i++){if(params.hasOwnProperty(_handlename[i])){_handles[_handlename[i]]=params[_handlename[i]];delete params[_handlename[i]];}}
			APP.bridge.call('APPStoreGet',{key:_key,type: "string"},function(_data){
				if(_data){
					_data=JSON.parse(_data);
					__apply(_handles["beforeSend"]);
					__apply(_handles["success"],_datatype(params.dataType,_data.value));
					__apply(_handles["complete"]);
				}else{
					$.ajax($.extend({},params,{
						"beforeSend":function(){__apply(_handles["beforeSend"],[].slice.call(arguments,0));},
						"success":function(_dat){
							__apply(_handles["success"],[].slice.call(arguments,0));
							APP.bridge.call('APPStoreSet',{key:_key,value:_dat,type:_type},function(){});
						},
						"error":function(){__apply(_handles["error"],[].slice.call(arguments,0));},
						"complete":function(){__apply(_handles["complete"],[].slice.call(arguments,0));}
					}));
				}
			});
	};
	APP.image=function(url,f){
		var _key=md5(url);
		APP.bridge.call('APPStoreGet',{key:_key,type: "image"},function(_data){
				if(_data){
					_data=JSON.parse(_data);
					__apply(f,_data.value);
				}else{
					__apply(f,url);
					APP.bridge.call('APPStoreSet',{"key":_key,"value":url,"type":"image"},function(){});
				}
		});
	}
	APP.bridge.register("APPResponse",function(data){});
	var _JCache=function(){
		this.__cache=window.applicationCache;
		this.__events=["error","checking","noupdate","downloading","progress","updateready","cached"];
		this.state="";
		switch ( this.__cache.status ){
		      case this.__cache.UNCACHED : this.state =0; break;
		      case this.__cache.IDLE:this.state =1; break;
		      case this.__cache.CHECKING : this.state =2; break;
		      case this.__cache.DOWNLOADING : this.state =3; break;
		      case this.__cache.UPDATEREADY : this.state =4; break;
		      case this.__cache.OBSOLETE : this.state =5; break;
		      default : this.state = "Unexpected Status ( " + this.__cache.status.toString() + ")";break;
		}
	}
	_JCache.prototype={
		"on":function(n,f,b){this.__cache.addEventListener(n,f,false);},
		"abort":function(){return this.__cache.abort.apply(this.__cache,[].slice.call(arguments,0));},
		"swapCache":function(){return this.__cache.swapCache.apply(this.__cache,[].slice.call(arguments,0));},
		"update":function(){return this.__cache.update.apply(this.__cache,[].slice.call(arguments,0));}
	};
	APP.cache=new _JCache();
})(window);