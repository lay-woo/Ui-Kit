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
};
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
function JLocations(){
	"use strict";
	var L = this;
	L.monitor	= new JMatrix({
		"load":new JMatrix(),
		"loadError":new JMatrix(),
		"page":new JMatrix(),
		"frame":new JMatrix(),
		"module":new JMatrix()
	});

	L.storage	= new JStorage('Ui-locations');
	L.locations 	= {};
	L.__base		= parseURI(L.storage.get('base', L.cleanHref(window.location.href)));
	L.__history 	= L.storage.get('history',[]);
	L.__Locations = L.storage.get('locations',{});
	L.__register=L.storage.get('register',{});
	L.__names={
		"module":"location-module",
		"container":"location-container"
	};
	var __LC={
				"key":"",
				"href":"",
				"target":"",
				"parent":"",
				"template":"",
				"refresh":"",
				"_locked":"",
				"_route":"",
				"_data":"{}"
	}
	var LC=function(_uri){map(__LC,function(k){this[k]=_uri[k]||"";},this);}
		LC.prototype.constructor=LC;
	var URI = function(o){
			map(__LC,function(k,v){this[k]=v;},this);
			map(o,function(k,v){this[k]=v;},this);
			var _uri=parseURI(this.href.replace(/[?&]v|_=\d+/gi,''));
			map(_uri,function(k){this[k]=_uri[k];},this);
			this.install();
		}
		URI.prototype = {
			install:function(){
				this.key=L.parseKey(this);
				this.href=this.href || L.cleanHref(this.href);
				this.target = this.target || this.params.target || '';
				this.url=(this.hash?this.url.replace(this.hash,''):this.url);
				this.parent && (this.parent=L.parseHref(this.parent));
				this.template && (this.template=L.parseHref(this.template));
				this._route= this.route();
				_typeof(this._data)==="string" && (this._data= JSON.parse(this._data));
			},
			absorb:function(o){
				if(_typeof(o) !=='object'){return this;}
				map(o,function(k,v){(__LC.hasOwnProperty(k) && k!=="_data") && (this[k]=v||this[k]);},this);o["_data"] && this.data(o["_data"]);
				return this;
			},
			param: function(a,b){
				switch(arguments.length){
					case 0:return this.params;break;
					case 1:(_typeof(a) === 'object')&&(map(a, function(x, v){this.params[x] = v;},this),L.update(this));return this.params[a];break;
					case 2:this.params[a] = b;break;
				}
			},
			data: function(a,b){
				switch (arguments.length){
					case 0:return this._data;break;
					case 1:(_typeof(a) === 'object') && (map(a, function(x, v){this._data[x] = v;},this),L.update(this));return this._data[a]||this.params[a];break;
					case 2:this._data[a] = b;L.update(this);break;
				}
			},
			getParent:function(){return L.get(this.parent);},
			getSearch:function(){var _r=[];map(this.params,function(k,v){_r.push(k+'='+v);});if(_r.length>0){return '?'+_r.join('&');}return "";},
			getBase:function(){return this.protocol + '//' + this.host + this.pathname;},
			getURL:function(){return  this.getBase()+ this.getSearch();},
			getTemplate:function(){
				return (this.template?this.template+this.getSearch():this.getURL());
			},
			route: function(refresh){
				//if (this._route&&!refresh){ return this._route }
				var _r = '',_k=L.parseKey(this)+(this.target?(this.search?'&':'?')+'target='+this.target:"");
				var _p=this.getParent();
				(_p && _p.key!==this.key) && (_r += _p.route());
				this._route=_r?(_r + '=>' + _k):_k;
				return this._route;
			},
			clear:function(){map(this._data,function(x){delete this._data[x]},this);L.update(this);
			}
		}
		URI.prototype.constructor=URI;

	var	__parseURL=function(_href,_x){
			var _uri=parseURI(_href),
				_lc={
					href:L.cleanHref(_uri.href),
					target:_uri.params['target']||'',
					parent:(_uri.params['parent']||''),
					template:(_uri.params['template']||''),
					refresh:_uri.params['refresh']||''
				};
				map(_x,function(k,v){_lc[k]=v||_lc[k];});
				_lc.key=L.parseKey(_uri);
			return _lc;
		};

	L.location =new URI();
	L.current = new URI();

	L.is=function(a,b){
		return suit(b,{
			"LC":function(){return a instanceof LC},
			"URI":function(){return a instanceof URI}
		});
	}
	L.LC=function(a){return new LC(a);}
	L.URI=function(a){return new URI(a);}
	L.loader = null;
	L.parseURI = function(_a,_x){
		return suit(_typeof(_a),{
			'string':function(){
				var _uri=__parseURL(_a,_x),_lc=L.get(_uri.href);
				return (_lc?_lc.absorb(_x):new URI(_uri));
			},
			"object":function(){
				var _uri=L.get(_a['key']);
				return (_uri ?_uri.absorb(_a).absorb(_x):(new URI(_a)).absorb(_x));
			},
			"default":function(){
				return (new URI({href:''})).absorb(_x);
			}
		});
	}
	var __default=function(e){
			if(!e){return}
			J(e).find('.'+L.__names.module).each(function(){
				var _source=this.getAttribute("source")||"",_id,_uri;
				if(_source){
					!this.id && (this.id="location-"+UUID(2));
					_id=this.id;
					_uri=L.parseURI(__parseURL(_source,{"target":_id}));
					this.id=_id;
					new __loader(_uri,{record:false,history:false,loader:'module'});
				}
			});
			J(e).find('.'+L.__names.container+'[source]').each(function(){
				var _source=this.getAttribute("source")||"";
				if(!E(this).has("location") && _source){
					!this.id && (this.id="location-"+UUID(2));
					var _uri=L.parseURI(_source,{target:this.id,parent:L.getParent(this)});
					E(this).set("location",_uri);
					L.load(_uri,{"history":false});
				}
			});
		},
		__loader = function(_uri, _params){
			if(!L.is(_uri,"URI")){return}
			var _s = this;
				_s.uri = _uri;
				_s.ajax = null;
				_s.result='';
				_s.state=null;
				_s.target = L.getTarget(_s.uri);
				if(!_s.target){return}
				_s.masker=null;
				_s.params = J.extend({
					loader:'page',
					record: true,
					store:true,
					history:false,
					hash:true,
					success: function(_tgt, _da){},
					error:function(){}
				},_params);
			var _ended =true,
				_end =function(){
					if (_ended === true){ return }
					_s.masker && _s.masker.remove();
					_s.masker=_s.result=_s.ajax=null;
					_ended = true;
				},
				_masker={
					"up":function(){
						if(_s.params.loader=="module"){return }
						!_s.masker && (_s.masker=J('<s class="location-masker" style="opacity:0;"></s>'));
						_s.masker.appendTo(document.body).html('<b class="loading"></b>').css({"width":_s.target.offsetWidth,"height":_s.target.offsetHeight,"left":J(_s.target).offset().left,"top":J(_s.target).offset().top,"opacity":1});
						setTimeout(function(){_s.masker.on('click', _end);},750);
					},
					"dn":function(a){if(!_s.masker){return;};setTimeout(function(){_s.masker.animate({ opacity: 0}, 500,function(){_end();_typeof(a)==='function' && a.call()})},450);}
				};

			var _loaders={
				"page":{
					"before":function(){
						(_ended === false && _s.ajax != null) && _s.ajax.abort(); _ended = false;
						J(_s.target).addClass(L.__names.container);
						_masker.up();
					},
					"success":function(_data){
						E(_s.target).location=L.current=_s.uri;
						J(_s.target).attr('source', _s.uri.key).html(_data);
						_s.uri.parent=_s.uri.parent||L.getParent(_s.target);
						L.record(_s.uri,_s.params.store,_s.params.history);
						_masker.dn(function(){__default(_s.target);});
						L.monitor.run(_s.params.loader,[_s.uri]);

						_typeof(_s.params['success'])=='function' && _s.params.success.apply(_s);
					},
					"error":function(){
						_s.masker && _s.masker.html('<b class="error"></b>');
						setTimeout(_end,1200);

						_typeof(_s.params['error'])=='function' && _s.params.error.apply(_s);
					},
					"complete":function(){L.monitor.run('load',[_s]);}
				},
				"frame":{
					"before":function(){},
					"success":function(_data){
						E(_s.target).location=L.current=_s.uri;
						J(_s.target).addClass(L.__names.container).attr('source', _s.uri.key).html(_data);
						J(_s.target).find('#'+_s.uri['subtarget']).empty().removeAttr('source');
						_s.uri.parent=_s.uri.parent||L.getParent(_s.target);
						L.record(_s.uri,true,false);
						__default(_s.target);
						L.monitor.run(_s.params.loader,[_s.uri]);
						_typeof(_s.params['success'])=='function' && _s.params.success.apply(_s);
					},
					"error":function(){_typeof(_s.params['error'])=='function' && _s.params.error.apply(_s);},
					"complete":function(){L.monitor.run('load',[_s]);}
				},
				"module":{
					"before":function(){return _loaders.page.before()},
					"success":function(_data){
						E(_s.target).location=_s.uri;
						J(_s.target).attr('source', _s.uri.key).html(_data);

						_s.uri.parent=_s.uri.parent||L.getParent(_s.target);
						__default(_s.target);

						_masker.dn();

						L.monitor.run(_s.params.loader,[_s.uri]);
					},
					"error":function(){return _loaders.page.error()},
					"complete":function(){return _loaders.page.complete()}
				}
			};
			L.loader=_s.ajax=Ui.ajax({
				type: "get",dataType: 'html',
				url: _s.uri.getTemplate(),
				beforeSend:_loaders[_s.params.loader].before,
				success: function(){_s.result="success";_loaders[_s.params.loader].success.apply(this,[].slice.call(arguments,0));},
				error: function(){_s.result='error';L.monitor.run('loadError',[_s]);_loaders[_s.params.loader].error.apply(this,[].slice.call(arguments,0));},
				complete: function(){_s.result='complete';_loaders[_s.params.loader].complete.apply(this,[].slice.call(arguments,0));L.loader=_s.ajax=null;}
			});
	};

	L.load=function(a,b){return new __loader(a,b)};
	L.install=function(){
		var _route=L.parseHash(window.location.hash);
		if(_route){
			L.loadRoute(_route);
		}else{
			__default(document.body);
		}
	}
	J(document).ready(L.install);
	map(L.__Locations,function(k){L.set(L.parseURI(L.__Locations[k]))});
	L.storage.store();
}
JLocations.prototype={
	'on':function(n){var _S=this;if(_S.monitor.has(n)){_S.monitor[n].bind.apply(_S.monitor[n],[].slice.call(arguments,1));}},
	'clear':function(){
		this.locations 	= {};
		this.__history 	=[];
		this.__Locations = {};
		this.__register={};
		this.storage.clear();
		window.location.href=this.__base.url;
	},
	"get":function(k){if (this.locations.hasOwnProperty(k)){return this.locations[k];}return null;},
	"set":function(_uri){return this.locations[_uri.key]=_uri;this.update(_uri);},
	"cleanHref":function(_href){_href=_href.replace(/(#route=)([0-9a-zA-Z-+_=\/]*)=/gi,'');_href=_href.replace(/[?&]?(target=[^&#?=]*|v=\d+|parent=[^&#?=]*|template=[^&#?=]*)/gi,'');return _href;},
	"parseHref":function(_hrf){if(!_hrf){return "";}_hrf=parseURI(_hrf);return _hrf.href;},
	"parseKey":function(_uri){if(!_uri){return "";}return ((this.__base.host !== _uri.host ? _uri.protocol + '//' + _uri.host : '') + _uri.pathname)+_uri.search;},
	"parseHash":function(_hash){
		_hash=_hash.replace(/^#/,"");_hash=Base64.decode(_hash);
		if(/^(route::)(.*)$/.test(_hash)){
			return _hash.replace(/^(route::)/,"");
		}else{
			return "";
		}
	},
	"parseRoute":function(_route){
		if (!_route){ return [];}
		_route = _route.split('=>');
		var _l = _route.length;
		for (var i = 0; i < _l; i++){
			var _uri=this.parseURI(_route[i]);
			if(i!==0){
				_uri.parent = _route[i-1].key;
				_route[i-1].subtarget=_uri.target||'';
			}
			_route[i] =_uri;
			this.set(_route[i]);
		}
		return _route;
	},
	"inRoute":function(_uri,_route){
		_uri=this.parseURI(_uri);_route=this.parseRoute(_route);var _is=false;map(_route,function(k,v){if(_uri.getURL()===v.getURL()){_is=true; return "break"}});return _is;},
	"loadRoute":function(_route){
		_route=this.parseRoute(_route);
		var _S=this,__ql=_route.length,
			__queue=function(i){
				if(__ql<1 || i>=__ql){return}
				var _q=_route[i];
				if(i<(__ql-1)){
					var _target=_S.getTarget(_q);
					if(_target && E(_target).has("location") && E(_target).location.getURL()==_q.getURL()){_S.record(_q,true,false);__queue(i+1);return ;}
					_S.load(_q,{"loader":"frame","store":true,"history":false,"success":function(){__queue(i + 1) }});

				}else{
					var _target=_S.getTarget(_q);
					if(_target && E(_target).has("location") && E(_target).location.getURL()==_q.getURL()){return ;}
					_S.load(_q,{"history":true});
				}
			}
			__queue(0);
	},
	"getParent":function(e){
		if(isE(e)){
			var _p=E(e).parent("."+this.__names.container),_s="";
			while(!_s && _p){
				_s=_p.getAttribute('source');
				_p=E(_p).parent("."+this.__names.container);
			}
			return this.parseHref(_s||"");
		}
		return (Eid(e) ? this.parseHref(Eid(e).getAttribute('source')):"");
	},
	"getTarget":function(_uri){
	var _tgt=Eid(_uri['target']);
	if(!_tgt){var _ptgt=this.get(_uri.getParent());_ptgt &&  (_ptgt=Eid(_ptgt.target));if(!_ptgt){return ""};_tgt=J(_ptgt).find('.'+this.__names.container)[0];if(!_tgt){_tgt=J('<div class="'+this.__names.container+'" id="location-'+UUID(2)+'"></div>')[0];J(_ptgt).html(_tgt);}}return  _tgt;},
	"loadHash":function(_hash){if(_hash){_hash = this.parseHash(_hash);_hash && this.loadRoute(_hash);};},
	"history":function(_uri){var _i=inArray(_uri.key,this.__history);(_i>=0) && this.__history.splice(_i,1);this.__history.push(_uri.key);},
	"update":function(_uri){_uri?(this.__Locations[_uri.key]=this.LC(_uri)):map(this.locations,function(k){this.__Locations[k]=this.LC(this.locations[k]);},this);this.storage.store();},
	"record":function(_uri,_store,_history,_hash){
			var __uri=this.set(_uri); _typeof(_history)==="undefined" && (_history=true);_typeof(_hash)==="undefined" && (_hash=true);
			_store && this.update(__uri);
			_history && this.history(__uri);
			_hash && this.hash(__uri);
			this.location=__uri;
			return __uri;
	},
	"hash":function(_uri){window.location.hash =Base64.encode('route::'+_uri.route());},
	"isOn":function(url,target){var _k=this.parseHref(parseURI(url)),_t=Eid(target);if(_k && _t){var _s=_t.getAttribute('source')?this.parseHref(parseURI(_t.getAttribute('source'))):null;if(_k===_s){return true;}}return false;},
	"page":function(_href, _target,_parent,_ex){
		if (!_href || typeof(_href)!="string"){ return}
		var _uri,__ex={"target":_target||"","parent":_parent||''};
		_typeof(_parent)==="object" && J.extend(__ex,_parent);
		_typeof(__ex)==="object" && J.extend(__ex,_ex);
		_uri= this.parseURI(_href,__ex);
		//if(this.location.getURL()===_uri.getURL()){console.log(2);return _uri}
		this.loadRoute(_uri.route());
		return _uri;
	},
	"module":function(_href,_target){if (!_href || !_target){ return };var _uri=this.parseURI(_href,{"target":_target});this.load(_uri,{record:false,histroy:false,loader:'module'});return _uri;},
	"go":function(_c){
		if(this.__history.length===1){return;}
		var _l=this.__history.length-1+_c,_uri=this.get(this.__history[_l]);
			this.__history.length=_l;_uri && this.loadRoute(_uri.route());
	},
	"register":function(lcs,id){
		if(id && this.__register.hasOwnProperty(id)){return;}
		var _S=this;
		suit(_typeof(lcs),{
			'array':function(){
				var _register=function(_arr,_prt){
						if(_arr.length<1){return;}
						_prt=_prt||"";
						map(_arr,function(k,v){
							var _children=v._children||[]; delete v['_children'];v.parent=_prt||v.parent;
							var _uri=_S.set(_S.parseURI(v.href,v));
							_register(_children,_uri.key);
						});
				}
				_register(lcs);
			},
			"object":function(){
				_S.set(_S.parseURI(lcs));
			}});
		this.__register[id]=true;
		this.update();
	},
	"registerMenus":function(id,p){
			var _S=this;
			 (id.charAt(0)==='#')&& (id=id.substring(1));
                      if(!id || this.__register.hasOwnProperty(id)){return;}
                        var _ps=J.extend({
                                dl:"dl",
                                dd:"dd",
                                lnk:".t",
                                target:"",
                                parent:""
                        },p);
                        _register = function (a, p, lv){
                            var   _f = arguments.callee,
                                    _dds=[],
                                    _ds = $(a).find('>'+_ps.dd+'>'+_ps.lnk),
                                    _refresh =(lv < 2)?true:false;
                                    _ds.each(function(){
                                         var _uri=locations.parseURI(this.getAttribute('href')||""),_tgt=this.getAttribute('target')||"",_prt=this.getAttribute('parent')||p||"";
                                         if(lv===0){
                                         		_tgt=_ps.target||_tgt;
                                         		_prt=_ps.parent||_prt;
                                         }
                                         var _dd={
                                                    "href":_uri.href,
                                                    "target":_tgt,
                                                    "parent":_prt,
                                                    "refresh":_refresh,
                                                    "_locked":true,
                                                    "_data":{
                                                            "title":this.innerText
                                                    }
                                              },
                                              _a = $(this).next(_ps.dl);
                                        (_a[0]) && (_dd['_children']=_f(_a,_dd.href, lv+1));
                                        _dds.push(_dd);
                                    });
                                    return _dds;
                        };
                        this.register(_register(Eid(id), '', 0),id);
        }
};
JLocations.prototype.constructor=JLocations;