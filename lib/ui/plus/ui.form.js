function setFormData(_sltr,_data){
	var _form=$(_sltr),_eselector='input[name],select[name],textarea[name]',_type=['input','select','textarea'];
	var _val=function(e,v){
		var tag=e.tagName.toLowerCase();
		if(confine(tag,_type)){
			switch(e.type){case 'checkbox':case 'radio':J(e).val()==v && (e.checked=true);break;default:J(e).val(v);break;}
		}else{
			e.innerHTML=v;
		}
	}
	_form.find(_eselector).each(function(){var n=this.getAttribute('name');_data.hasOwnProperty(n) && _val(this,_data[n]);});
	_form.find('[group]').each(function(){
		var _g=this.getAttribute('group');
		if(_g && _data.hasOwnProperty(_g)){
			var g=_data[_g];
			J(this).find(_eselector).each(function(){var n=this.getAttribute('name');g.hasOwnProperty(n) && _val(this,g[n]);});
		}
	});
}
function JForm(a){
	var _S=this;
	this.elements=[];
	if(isE(a) || a instanceof jQuery){
		J(a).find('input[name],textarea[name],select[name]').each(function(){
			_S.elements.push(new JElement(this));
		});
	}else if(_typeof(a)==="string" && a.length>0){
		a=trim(a);
		if(a.charAt(0)==='.'|| a.charAt(0)==='#'){
				a=J(a)[0];
		}else{
			a=JSON.parse(a);
		}
	}else if(_typeof(a)==="array"){
		map(a,function(k,v){_typeof(v)==="object" && v.name && this.add(v)},this);
	}
}
function getFormData(_sltr){
	var _form=$(_sltr),_eselector='input[name],textarea[name],select[name]';
	var FORM=function(){};
	FORM.prototype.set=function(n,v){if(!n){return}var s=this;if(!s.hasOwnProperty(n)){s[n]=v;}else{_typeof(s[n])!=="array" &&  (s[n]=[s[n]]);s[n].push(v);}};
	FORM.prototype.parse=function(e){
		if(!isE(e)){return;}
		var s=this,n=trim(e.getAttribute("name")),v=$(e).val()||null;if(!n){return}
		if(/^.*\[\s*\]$/.test(n)){n=n.replace(/\s*\[\s*\]$/,'');!s.hasOwnProperty(n) && (s[n]=[]);}
		if(_typeof(v)=="string"){this.set(n,v,s);return;}
		if(_typeof(v)=="array"){map(v,function(k,x){this.set(n,x,s);},this);return;}
	};
	FORM.prototype.fetch=function(e){
		var s=this;
		J(e).find(_eselector).each(function(){
			switch(this.type){case 'checkbox':case 'radio':if(this.checked){s.parse(this)}break;default:s.parse(this);break;}
		});
	};
	FORM.prototype.group=function(e,n){
		!this.hasOwnProperty(n) && (this[n]=[]);
		if(J(e).find(_eselector).length>0){
			!this.hasOwnProperty('__groups') && (this.__groups={});
			var g=new FORM();g.fetch(e);
			this[n].push(g);
			this[n].ally=function(){var r=[];map(this,function(k,v){r.push(v.ally());});return r;};
			this.__groups[n]=this[n];
		}
	};
	FORM.prototype.data=function(){var _data={};map(this,function(k,v){k.substring(0,2)!=="__" && (_data[k]=(_typeof(v)==="array" && v['ally'] ?v[0].data():v));});return _data;}
	FORM.prototype.get=function(n){return this[n]||null;};
	FORM.prototype.isAlly=function(o){return (_typeof(o)==="array" && o['ally']);};
	FORM.prototype.ally=function(){
		var r={};map(this,function(k,v){
			if(v && v['ally']){
				r[k]=v.ally();
			}else{
				_typeof(v)==="string" && (r[k]=v);
				_typeof(v)==="array" && (r[k]=v.join(','));
			}
		},this);return r;};
	FORM.prototype.query=function(q,encode){
		q=q||"";var _q=[];map(this,function(k,v){
			if(this.isAlly(v)){
				_q.push(k+'='+JSON.stringify(v.ally()));
			}else{
				_typeof(v)==="array" && (k+'='+v.join(","));
				_typeof(v)==="string" && (k+'='+v);
			}},this);return (encode?Base64.encode(q+_q.join('&')):q+_q.join('&'));
	};
	FORM.prototype.groups=function(f){map(this.__groups,function(k,v){_typeof(f)==="function" && f.call(this,k,v)});}
	var _formData=new FORM();
	_formData.fetch(_form);
	_form.find('[group]').each(function(){var g=trim(this.getAttribute('group'));g && _formData.group(this,g);});
	return _formData;
}
JForm.prototype={
	'isInternal':function(t){return inArray(t,["button","email","url","number","range","date","search","color","checkbox","file","hidden","password","radio","textarea","text",'select','select-one','select-multiple','separator'])>0;},
	'type':function(n,o){if(_typeof(o)==='undefined'){return (this.types.hasOwnProperty(n)?this.types[n]:null);};this.types[n]=o;},
	'typeof':function(e){var t=e.type||e.getAttribute('type'),_tag=e.tagName.toLowerCase();},
	'isEmpty':function(){return this.element.length<1;},
	'empty':function(){this.elements.length=0;},
	'element':function(){},
	'build':function(e,axs,clone){
			if(e.type==="separator"){return $('<s class="separator">'+(e.title?'<i>'+e.title+'</i>':"")+'</s>')[0];}
			var _element=(clone?J(e.element()).clone().get(0):e.element());
			if(e.type==="hidden"){return _element}
			var fd=$('<span class="fd fd_'+(axs==='y'?'v':'h')+'" type="'+e.type+'" name="'+e.name+'"><b class="k">'+(e.label||"")+'</b><s class="v"></s></span>'),
					fv=fd.find('.v');
			switch(e.type){
					 case 'radio' :
					 case 'checkbox':
					 	fv.append(_element);
					 break;
					 default :
					 	if(this.isInternal(e.type)){
							var fe=$('<label class="e e_'+e.type+'"><i></i></label>');
							fe.prepend(_element).appendTo(fv);
						}else{
							fv.append(_element);
						}
					break;
			}
			e.note && fv.append('<div class="note">'+e.note+'</div>');
			map(["required","disabled","readonly","hidden"],function(k,v){e[v] && fd.addClass(v)});
			return fd[0];
	},
	'add':function(e){!(e.constructor===JElement) && e.name && (e=new JElement(e));e.monitor.bind(function(){});this.elements.push(e);return e;},
	'remove':function(e){var i=inArray(e,this.elements);if(i>=0){this.elements.splice(i,1);}},
	'order':function(e,i){
			var _i=inArray(e,this.elements);
			if(_i>=0){this.elements.splice(_i,1);this.elements.splice(i,0,e);}
	},
	'data':function(a){
			if(_typeof(a)==='undefined'){return this.values();}
			var _names={};map(this.elements,function(k,v){v.name && (_names[v.name]=v);});
			if(_typeof(a)=="array"){
				map(a,function(k,v){_names.hasOwnProperty(v.name) && _names[v.name].data(v);});
			}
			if(_typeof(a)=="object"){
				map(a,function(k,v){_names.hasOwnProperty(k) && _names[k].val(v);});
			}
	},
	"values":function(){var _values={};map(this.elements,function(k,v){_values[v.name]=v.val()});return _values;},
	'set':function(a,b){
		var _names={};map(this.elements,function(k,v){v.name && (_names[v.name]=v);});
		if(_typeof(a)=="array"){map(a,function(k,v){_names.hasOwnProperty(v.name) && _names[v.name].data(v);});}
		if(_typeof(a)=="object"){_names.hasOwnProperty(a.name) && _names[a.name].data(a);}
	},
	'get':function(a){if(isEmpty(a)){return this.elements;};var r=null;map(this.elements,function(k,v){ if(v.name===a){return r=v}});return r;},
	'getJSON':function(){
		var _data=[];
		map(this.elements,function(k,v){var _tmp=v.data();!isEmpty(_tmp) && _data.push(_tmp);});
		return JSON.stringify(_data);
	},
	'getHTML':function(axs){var _html=[];map(this.elements,function(k,v){_html.push(this.build(v,axs,true).outerHTML);},this);return _html.join("\n");},
	'changed':function(data){
		var _result={}
		map(this.elements,function(k,v){
			if(data.hasOwnProperty(v.name) && v.value!=data[v.name]){
				_result[v.name]=data[v.name];
			}
		});
		return _result;
	},
	'import':function(a,b){
		switch(_typeof(a)){
			case 'string':
				a=JSON.parse(a);
				this.import(a,b);
				return ;
			break;
			case 'array':
				map(a,function(k,v){
					if(_typeof(v)==='object'){var e=this.add(new JElement(v));exe(b,e);}
					if(_typeof(v)==='string'){var e=this.add(new JElement({name:v}));exe(b,e);}
				},this);
			break;
			case 'object':
				var e=this.add(new JElement(a));exe(b,e);
			break;
		}
	},
	'map':function(f){if(typeof(f)!=='function'){return;}map(this.elements,function(k,v){f.call(v,v.name,v);});},
	'required':function(){}
}
JForm.prototype.constructor=JForm;
JForm.types={};
function JElement(a,b){
	var _S=this,__types=["button","email","url","number","range","date","search","color","checkbox","file","hidden","password","radio","textarea","text",'select','select-one','select-multiple','separator'];
	var _prototype={
		"monitor":new JMatrix(),
		'isStatic':function(e){return inArray(e,['__id','0','type','attributes','options'])>=0;},
		'isPrivate':function(e){return inArray(e,['type','name','placeholder','attributes','default','value','checked','disabled','readonly','required','hidden','text','label','note','validate','options'])>=0;},
		'changeType':function(t){
			this[0]=null;this.type=t;
			this.type==='select' && (this.type="select-one");
			(this.type==='radio' || this.type==='checkbox') && this.options.length<1 && this.options.push({value:this.data.value||"",text:this.label||""});
			!this.name && (this.name=this.__id);
			!this.type && (this.type="text");
			this.element();
		},
		'attribute':function(s){
				if(!isEmpty(s)){
						var _a=new JAttr(s);
						map(_a.get(),function(k,v){if( !isEmpty(v) && !this.isPrivate(k)){this.attributes[k]=trim(v);}},this);
						return;
				}
		},
		'option':function(a,b){
				if(_typeof(a)==="string" && _typeof(b)==="string"){this.options.push({text:a,value:b});return this;}
				if(_typeof(a)==='array'){map(a,function(k,v){if(v.value && v.text){this.options.push({text:v.text,value:v.value})}},this);return this;}
				if(_typeof(a)==='object' && a.value && a.text){this.options.push({text:a.text,value:a.value});return this;}
				if(_typeof(a)==="string" && _typeof(b)==="undefined"){
					if(/[\r\n]/.test(a)){
						a=a.split('\n');
						map(a,function(k,v){v=v.split(",");if(v.length===2){this.option(trim(v[0]),trim(v[1]));}},this);return this;
					}else{
						a=a.split(',');a.length===2 && this.options.push({text:trim(a[0]),value:trim(a[1])});return this;
				}
				}
				return this;
		},
		'val':function(v){
			var s=this;
			if(_typeof(v)==='undefined'){
				if(this[0] && confine(this.type,['radio','checkbox'])){
					s.value=[];J(this[0]).find('input').each(function(){this.checked===true && s.value.push(J(this).val());});
				}else if(this[0]){
					s.value=J(this[0]).val();
				}
			}else{
				if(this[0] && confine(this.type,['radio','checkbox'])){
						_typeof(v==="string") ? (s.value=v.split(",")) :s.value=v;
						J(this[0]).find('input').each(function(){confine(J(this).val(),s.value) && (this.checked=true);});
				}else if(this[0]){
						s.value=v;J(this[0]).val(v);
				}else{
		              s.value=v;
		            }
			}
			return s.value||"";
		},
		"element":function(data){
				var e=this[0],d=this;
				var _ua=function(e,n,v){!isEmpty(v) ? e.setAttribute(n,v) :e.removeAttribute(n);}
				if(e){map(this.attributes,function(k,v){e.removeAttribute(k)});}
				this.data(data);
				switch(d.type){
					case 'separator':
								this[0]=e=e||document.createElement('i');
								e.setAttribute('class','separator');
					break;
					case 'textarea':
							this[0]=e=e||document.createElement('textarea');
							e.innerHTML=d.value||d.text||"";
					break;
						case 'select-one':
							this[0]=e=e||document.createElement('select');
							var _options=[];map(this.options,function(k,v){_options.push('<option value="'+v.value+'">'+v.text+'</option>');},this);
							e.innerHTML=_options.join('');
					break;
					case 'select-multiple':
							this[0]=e=e||document.createElement('select');
							var _options=[];map(this.options,function(k,v){_options.push('<option value="'+v.value+'">'+v.text+'</option>');},this);
							e.setAttribute('multiple','multiple');
							e.innerHTML=_options.join('');
					break;
					case 'radio':
					case 'checkbox':
								this[0]=e=e||document.createElement('span');
								e.setAttribute('class','es');
								var cs=[],val=(d.value||"").split(",");
								map(d.options,function(k,v){cs.push('<label class="e" i="'+k+'"><input type="'+d.type+'" name="'+(d.name||"")+'" value="'+v.value+'" '+(inArray(v.value,val)>=0?'checked':"")+'/><b>'+v.text+'</b></label>');});
								e.innerHTML=cs.join('');
					break;
					default:
							this[0]=e=e||document.createElement('input');
							_ua(e,'default',d.default);
							_ua(e,'value',(d.value||d.default));
					break;
				}
				J(e).on({"change":function(){d.val()}}).focusout(function(){J(e).change()});
				_ua(e,'disabled',d.disabled);
				_ua(e,'readonly',d.readonly);
				_ua(e,'type',d.type);
				_ua(e,'name',d.name);
				_ua(e,'placeholder',d.placeholder);

				map(this.attributes,function(k,v){!this.isPrivate(k) && _ua(e,k,v);},this);
				E(e).set('JElement',this);
				return this[0];
		},
		"data":function(k,v){
				if(_typeof(k)=="object"){
					 map(k,function(_k,_v){
				 		if(confine(_k,['checked','disabled','readonly','required','hidden'])){
				 			k[_k] ? this[_k]="true" : this[_k]=null;
				 		}else{
				 			!this.isStatic(_k)  && (this[_k]=trim(k[_k])||null);
				 		}
					 },this);
					 this.attribute(k.attributes);this.options.length=0;this.option(k.options);
					 return this;
				}
				if(_typeof(k)!=="undefined" && _typeof(v)!=="undefined" && this.hasOwnProperty(k) && !this.isStatic(k)){this[k]=v;return this;}
				if(_typeof(k)!=="undefined" && _typeof(v)=="undefined"){return this[k];}
				if(_typeof(k) =="undefined" && _typeof(v)=="undefined"){var _data={};map(this,function(_k,_v){if(!isEmpty(_v) && _k!=="__id" && _k!=="0"){_data[_k]=_v}},this);return _data;}
		},
		"map":function(f){map(this,function(k,v){exe(f,k,v);},this);}
	}
	var __property={
			'type':'text',
			'name':null,
			'placeholder':null,
			'attributes':{},
			'default':null,
			'value':null,
			'checked':null,
			'disabled':null,
			'readonly':null,
			'required':null,
			'hidden':null,
			'text':null,
			'label':null,
			'note':null,
			'validate':null,
			'options':[]
	};
	function element(){
		map(__property,function(k,v){this[k]=v},this);
		element.prototype["__id"]=UUID(2);
		this.type="text";
		if(isE(a) || _typeof(a)==="object"){this.type=a.type;}
		this.type==='select' && (this.type="select-one");

		if(JForm.types.hasOwnProperty(this.type)){map(JForm.types[this.type],function(k,v){_prototype[k]=v;});}
		map(_prototype,function(k,v){element.prototype[k]=v;});

		if(isE(a)){
			if(inArray(a.type,__types)>=0){
				map(a.attributes,function(k,v){
					var _at=a.getAttribute(v.name),_n=v.name;
					_at!==null && __property.hasOwnProperty(_n) && (__property[_n]=_at);
					_at!==null && !__property.hasOwnProperty(_n) && (__property.attributes[_n]=_at||null);
				});
				__property.value=J(a).val();
				map(['checked','disabled','readonly','required'],function(k,v){__property[v]=a[v]||null;});
				switch(__property.type){
						case 'radio':
						case 'checkbox':
								__property.options.push({value:__property.value,text:'option'});
						break;
						case 'select':
						case 'select-one':
						case 'select-multiple':
								map(a.options,function(k,v){__property.options.push({value:v.value,text:v.innerHTML})},this);
						break;
				}
				this.data(__property);
				this.data(b);
			}
		}else if(_typeof(a)=="object"){
			this.data(a);
		}
		(this.type==='radio' || this.type==='checkbox') && this.options.length<1 && this.options.push({value:this.data.value||"",text:this.label||""});
		!this.name && (this.name=this.__id);


		if(inArray(this.type,__types)<0){return null;}
	}

	element.prototype.constructor=JElement;
	return new element();
}
JElement.prototype={};
JElement.prototype.constructor=JElement;