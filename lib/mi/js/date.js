"use strict";
var _TEXTS={
	"Today":"现在",
	"Submit":"确定",
	"Close":"关闭",
	'Year':"年",
	'Month':"月",
	'Date':"日",
	'Hours':"时",
	'Minutes':"分",
	"Choose Year":"选择年份",
	"Choose Month":"选择月份",
	"Choose Date":"选择日期",
	"Choose Hours":"选择小时",
	"Choose Minutes":"选择分钟",
	"Choose Time":"选择小时及分钟",
	"Months":["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
	"Day":{
		"full":["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
		"sort":["日","一","二","三","四","五","六"]
	}
},
_LAN=function(s){return _TEXTS[s]|| s;}

function Ruler(e,v,cell,unit,chg){
                    e=$(e);
                    var _wrap=e.find('.rulerwrap'),
                           _selected=e.find('.selected'),
                           _pt=e.find('.pointer'),
                           _bs=_wrap.find('>b'),
                           _ns=[];
                           _bs.each(function(){_ns.push(parseInt(this.innerHTML));});
                           
                    var _width=0,_half=0,_cell=cell||15,_total=0,_left=null,_moving=false,_start=null,_distance=0,_move=0,_index=(_ns.indexOf(v)>=0?_ns.indexOf(v):0);
                    
                    var  _NUM=function(n){n=parseInt(n);return (n<10?'0'+n:n);},
                    		__init=function(){
                            _width=e.width();
                            _width=Math.floor(_width/2)*2;
                            _half=_width/2;
                            chg=chg||function(){};
                             e.css("width",_width);
                            _pt.css("left",_half-_pt.width()/2);
                            _total=_cell*_bs.length-_cell;
                            
                            $(_wrap).find('>b.on').removeClass('on');
                            $(_bs[_index]).addClass('on');
                            _selected.html(_NUM(_ns[_index])+'<b>'+unit+'</b>');
                            _wrap.css('left',0-_cell*_index+_half).css('width',_cell*_ns.length);
                    },
                    _isready=function(){if(e.width()>0){return true}return false;};
                    untill(_isready,__init);
                    var _mathMove=function(_m){
                                _m>_half && (_m=_half);
                                _m<(0-_total+_half) && (_m=(0-_total+_half));
                                return _m;
                    },
                    _integer=function(c){return _mathMove(_half-Math.floor((_half-c)/_cell)*_cell)},
                    _step=function(_m){
                                _m=_mathMove(_m);
                                _index=Math.floor(Math.abs((_m-_half)/_cell));
                                _selected.html(_NUM(_ns[_index])+'<b>'+unit+'</b>');
                                $(_wrap).find('>b.on').removeClass('on');
                                $(_bs[_index]).addClass('on');
                                chg(_ns[_index]);
                    };
                    e.on({
                            "touchmove":function(event){
                                    var _touches=event.originalEvent.touches;
                                    if(_start===null && !_moving){
                                            _start=_touches[0].clientX;
                                            _left=parseInt(_wrap.css('left'))||0;
                                            _moving=true;
                                    }
                                    if(_start!==null && _moving){
                                            _move=_mathMove(_left+_touches[0].clientX-_start);
                                            _wrap.css('left',_move);
                                            _step(_move);
                                    }
                            },
                            "touchend":function(){
                                    _start=null;
                                    _left=null;
                                    _moving=false;
                                    _wrap.css('left',_integer(_move));
                                    _step(_move);
                            }
                    });
                    e.attr('fix',1);
                    return this;
};
function Dater(Y,M,D,h,m){
        var __F=this,_dw=window.innerWidth,_dh=window.innerHeight;
        	__F.event=new JMatrix("event");
              __F.dater=$('<div class="dater" id="dater"><s class="datearea"><s class="d year"><b  v="year">2016</b><s>'+_LAN("Year")+'</s></s><s class="d month"><b v="month">01</b><s>'+_LAN("Month")+'</s></s><s class="d date" ><b v="date">11</b><s>'+_LAN("Date")+'</s></s></s><s class="day"></s><s class="timearea"><b class="d hours" ><b v="hours">00</b><s>'+_LAN("Hours")+'</s></b><b class="d minutes"><b v="minutes">00</b><s>'+_LAN("Minutes")+'</s></b></s><div class="picker"><strong class="title"></strong><div class="wrap" style="max-height:'+(_dh-70)+'px"></div></div><div class="tools"></div><s class="msk"></s></div>');
              __F.timer=$('<div class="timer"><div class="picker"><div class="hours"></div><div class="minutes"></div></div></div>');
        
        var   _vs=['year','month','date','hours','minutes'],
                _evs={},
                _eds={},
                _e_picker=__F.dater.find('.picker'),
                _e_pickTitle=__F.dater.find('.picker .title'),
                _e_pickWrap=__F.dater.find('.picker .wrap'),
                _e_submit=$('<b class="submit">'+_LAN("Submit")+'</b>'),
                
                _e_today=$('<b class="today">'+_LAN("Today")+'</b>'),
                _e_day=__F.dater.find('.day'),
                _e_x=$('<b class="close">'+_LAN("Close")+'</b>'),
                _e_timearea=__F.dater.find('.timearea'),
                _e_timerPicker=__F.timer.find('.picker'),
                _e_timerHours=__F.timer.find('b[v="hours"]'),
                _e_timerMinutes=__F.timer.find('b[v="minutes"]'),
                _e_timerSubmit=$('<s class="submit">'+_LAN("Submit")+'</s>'),
                _e_tools=__F.dater.find('.tools'),
                _e_masker=__F.dater.find('.msk')
                ;
                _e_tools.append(_e_today).append(_e_x).append(_e_submit);
       
        	__F.date=new Date();
        	map(_vs,function(k,v){
	                _eds[v]=__F.dater.find('.'+v);
	                _evs[v]=_eds[v].find('>b');
	     });

     
      var  _NUM=function(n){n=parseInt(n);return (n<10?'0'+n:n);},
             _YMDHM=function(d){
                var _d=d|| new Date();
                      return {
                                'year':_d.getFullYear(),
                                'month':_d.getMonth(),
                                'date':_d.getDate(),
                                'hours':_d.getHours(),
                                'minutes':_d.getMinutes()
                      };
            },
            _NAME=function(t,v){
                   var _o={
                            'year':function(){return _NUM(v);},
                            'month':function(){return _NUM(v+1);},
                            'date':function(){return _NUM(v);},
                            'hours':function(){return _NUM(v);},
                            'minutes':function(){return _NUM(v);}
                      }
                      return _o[t]();
            }
       __F.change=function(_date){
                var _now=_date||new Date(),
                      _c=_YMDHM(_now);
                    __F.date=new Date(_c.year,_c.month,_c.date,_c.hours,_c.minutes);
                    map(_vs,function(k,v){_evs[v].html(_NAME(v,_c[v]));});
                    _e_day.html(_LAN("Day").full[__F.date.getDay()]);
       }
       __F.setDate=function(Y,M,D,h,m){
	    		Y&&  __F.date.setYear(Y);
	               M&&  __F.date.setMonth(M-1);
	               D&&  __F.date.setDate(D);
	               h&&  __F.date.setHours(h);
	               m&&  __F.date.setMinutes(m);
	               __F.change(__F.date);
	               return __F;
	    }
	__F.setDate();
        __F.submit=function(){
        	__F.event.run("submit",[__F.date]);
        }
        
        var _co=function(s,e,c,z,r){
                        var _r=[],_c=0,_stp='';
                        for(var i=s;i<e;i++){
                             if(z &&  _c===0){_r[_r.length]='<b  val="0" class="z">00</b>';}
                            _stp="";
                            if(!r && _c!=0 && _c%c===0){ _r[_r.length]="<br/>";}
                            _c++;
                             if(r  && _c%c===0){_stp=' class="stp"';}
                            _r[_r.length]='<b val="'+i+'"  '+_stp+'>'+(i<10?'0'+i:i)+'</b>';
                        }
                        if(r){
                            return'<s class="ruler"><s class="selected"></s><s class="pointer"></s><s class="rulerwrap">'+_r.join('')+'</s></s>';
                        }
                        return _r.join('');
                };
                
        var _lastDateInMonth=function(){
                    var _d= new Date(__F.date.getFullYear(),__F.date.getMonth()+1,0);
                   return _d.getDate();
                }
        var _pickon=false,_picker="";
        var _getYearsGroup=function(s,e,c){
        		if(!_handles.year.data[s]){
	        		_handles.year.data[s]=$('<s class="yg">'+_co(s,e+1,_handles.year.cols,null)+'<s class="se">'+s+' - '+e+'</s></s>');
	        		_handles.year.element.find('.yearswrap').append(_handles.year.data[s]);
        		}
        		return _handles.year.data[s];
        },
        _timeouts={},
        _timeout=function(id,f){
        	if(_timeouts[id]){clearTimeout(_timeouts[id]);}
        	_timeouts[id]=setTimeout(function(){
        		f.call(f);
        		delete _timeouts[id];
        	},500)
        },
        _changeVal=function(e,k){
	        	e.addClass("chg");_timeout(k,function(){e.removeClass("chg");});
	        	if(k==="year"||k==="month"||k==="date"){
	        		_e_day.html(_LAN("Day").full[__F.date.getDay()]);
	        	}
        },
        _checkon=function(e,v){
        	$(e).find('*[val="'+parseInt(v)+'"]').addClass('on');
        },
        _pickerOf=function(b){if(b){!_pickon && _e_picker.addClass('on'),_e_masker.addClass('on');_pickon=true;}else{_e_picker.removeClass('on');_e_masker.removeClass('on');_pickon=false;}};
        var _handles={
                    'year':{
                            "cols":6,
                            "key":"year",
                            "val":_evs["year"],
                            "value":parseInt(_evs["year"].html()),
                            "element":$('<s class="years" tp="year"><s class="yearswrap"></s><b class="nxt"></b><b class="prv"></b></s>'),
                            "data":{},
                            "change":function(v){
                            	var _t=_handles['year'];
                                    _evs["year"].html(_NUM(v));
                                    __F.date.setYear(parseInt(v));
                                    _t.value=parseInt(v);
                                    _changeVal(_t.val,_t.key);
                            },
                            "reset":function(){
                            	var _t=_handles['year'];
                            	_t.currentLeft=0;
                            	_t.index=0;
                            	_t.start=(__F.date.getFullYear()-15);
                            	_t.end=(__F.date.getFullYear()+15-1);
                            	_handles.year.element.find('.yearswrap').attr('style','').empty();
                            },
                            "currentLeft":0,
                            "distance":0,
                            "index":0,
                            "start":(__F.date.getFullYear()-15),
                            "end":(__F.date.getFullYear()+15-1),
                            "picker":function(){
                            	var _t=_handles['year'];
                                if(_pickon&& _picker==="year"){return}_picker="year";
                                _pickerOf(1);
                                _e_pickTitle.html(_LAN("Choose Year"));
                                _getYearsGroup(_t.start,_t.end);
                                _e_pickWrap.attr("col",_t.cols).html(_t.element);
                                
                                _checkon(_t.element,_t.value);
                            }
                    },
                    'month':{
                            "cols":4,
                            "key":"month",
                            "val":_evs["month"],
                            "value":parseInt(_evs["month"].html())-1,
                            "element":null,
                            "data":_co(1,13,this.cols,null),
                            "change":function(v){
                            	var _t=_handles['month'];
                                    _evs["month"].html(_NUM(v));
                                    __F.date.setMonth(parseInt(v-1));
                                    _t.value=parseInt(v)-1;
                                    _changeVal(_t.val,_t.key);
                            },
                            "picker":function(){
                            	var _t=_handles['month'];
                                    if(_pickon&& _picker==="month"){return}_picker="month";
                                    if(!_t.element){
                                            _t.element=$('<s class="months" tp="month">'+_t.data+'</s>');
                                    }
                                    _pickerOf(1);
                                    _e_pickTitle.html(_LAN("Choose Month"));
                                    _e_pickWrap.attr("col",_t.cols).html(_t.element);
                                    
                                    _checkon(_t.element,_t.value+1);
                            }
                    },
                    'date':{
                            "element":$(),
                            "key":"date",
                            "val":_evs["date"],
                            "value":parseInt(_evs["date"].html()),
                            "data":function(){
                                        var _days=_LAN('Day').sort;
                                        var _r=[],_ds=[];
                                        _r[_r.length]='<s class="dy">';
                                        for(var i=0,l=7;i<l;i++){_r[_r.length]='<b>'+_days[i]+'</b>';}
                                        _r[_r.length]='</s>';
                                        
                                        var _d=new Date(__F.date.getFullYear(),__F.date.getMonth(),1).getDay();
                                        _ds[_ds.length]='<s class="ds">';
                                        if(_d!=0){for(var i=0,l=_d;i<l;i++){_ds[_ds.length]='<b></b>';}}
                                        for(var i=1,l=_lastDateInMonth();i<=l;i++){_ds[_ds.length]='<b  '+(i===__F.date.getDate()?'class="on"':'')+'>'+i+'</b>';}
                                        _ds[_ds.length]='</s>';
                                    return '<s class="dates" tp="data">'+_r.join('')+_ds.join('')+'</s>';
                            },
                            "change":function(v){
                            	var _t=_handles['date'];
                                    _evs["date"].html(_NUM(v));
                                    __F.date.setDate(parseInt(v));
                                    _t.value=parseInt(v);
                                   _changeVal(_t.val,_t.key);
                            },
                            "picker":function(){
                            	var _t=_handles['date'];
                                    if(_pickon&& _picker==="date"){return}_picker="date";
                                    _pickerOf(1);
                                    _e_pickTitle.html(_LAN("Choose Date"));
                                    _e_pickWrap.attr("col","").html(_t.data());
                                    
                                    _checkon(_t.element,_t.value);
                            }
                    },
                    'hours':{
                            "cols":6,
                            "key":"hours",
                            "val":_evs["hours"],
                            "value":parseInt(_evs["hours"].html()),
                            "data":_co(1,24,10,true,true),
                            "element":null,
                            "change":function(v){
                            	var _t=_handles['hours'];
                                    _evs["hours"].html(_NUM(v));
                                    __F.date.setHours(parseInt(v));
                                    _t.value=parseInt(v);
                                   _changeVal(_t.val,_t.key);
                            },
                            "picker":function(){
                            	var _t=_handles['hours'];
                                if(_pickon&& _picker==="hours"){return}_picker="hours";
                                if(!_t.element){
                                        _t.element=$(_t.data);
                                        //_t.element=$('<s class="hours">'+_t.data+'</s>');
                                }
                                _e_pickTitle.html(_LAN("Choose Hours"));
                                _e_pickWrap.attr("col",_t.cols).html(_t.element);
                                new Ruler(_t.element,parseInt(_evs["hours"].html()),15,'',_t.change);
                                _checkon(_t.element,_t.value);
                                _pickerOf(1);
                            }
                    },
                    'minutes':{
                            "cols":10,
                            "key":"minutes",
                            "val":_evs["minutes"],
                            "value":parseInt(_evs["minutes"].html()),
                            "element":null,
                            "data":_co(1,60,10,true,true),
                            "change":function(v){
                            	var _t=_handles['minutes'];
                                    _evs["minutes"].html(_NUM(v));
                                    __F.date.setMinutes(parseInt(v));
                                    _t.value=parseInt(v);
                                    _changeVal(_t.val,_t.key);
                            },
                            "picker":function(){
                            	var _t=_handles['minutes'];
                                 if(_pickon&& _picker==="minutes"){return}_picker="minutes";
                                 if(!_t.element){
                                        _t.element=$(_t.data);
                                 }
                                  _e_pickTitle.html(_LAN("Choose Minutes"));
                                  _e_pickWrap.attr("col",_t.cols).html(_t.element);
                                  new Ruler(_t.element,parseInt(_evs["minutes"].html()),15,'',_t.change);
                                  
                                  _pickerOf(1);
                            }
                    },
                    "time":{
                    		"picker":function(){
                    		    if(_pickon&& _picker==="time"){return}_picker="time";
                    		    
                    		    _e_pickTitle.html(_LAN("Choose Time"));
                                _e_pickWrap.html("");
                                
                                var _h=_handles['hours'];
                                 if(!_h.element){_h.element=$(_h.data).addClass("hoursPicker");}
                                 
                                 
                                 _e_pickWrap.attr("col",_h.cols).append(_h.element);
                                  new Ruler(_h.element,parseInt(_evs["hours"].html()),15,'',_h.change);
                                  
                                  var _m=_handles['minutes'];
                                 if(!_m.element){ _m.element=$(_m.data).addClass("minutesPicker");}
                                  _e_pickWrap.attr("col",_m.cols).append(_m.element);
                                  new Ruler(_m.element,parseInt(_evs["minutes"].html()),15,'',_m.change);
                                  
                                  _pickerOf(1);
                    }
        	}
        };
		map(_vs,function(k,v){
			(v!=="hours"&& v!=="minutes") && _eds[v].on({'touchend':function(){_handles[v].picker();}});
		});
		_e_timearea.on({'touchend':function(){_handles["time"].picker();}});
		
		var _yearNext=function(){
				var _wrap=_handles.year.element.find('.yearswrap');
				!_handles.year.currentLeft && (_handles.year.currentLeft =parseInt(_wrap.css('left')));
				!_handles.year.distance && (_handles.year.distance =_wrap.width());
				
				_handles.year.currentLeft-=_handles.year.distance;
				_handles.year.start=_handles.year.end+1;
				_handles.year.end=_handles.year.start+30-1;
				_handles.year.index+=1;
		        
		        if(!_handles.year.data[_handles.year.start]){
		        		_getYearsGroup(_handles.year.start,_handles.year.end).css('left',_handles.year.index*_handles.year.distance);
		        }
		        _handles.year.element.find('.yearswrap').css({'transition-duration':'300ms','transform':'translate3d('+_handles.year.currentLeft+'px, 0px, 0px)'});
		},
		_yearPrev=function(){
		var _wrap=_handles.year.element.find('.yearswrap');
		
		!_handles.year.currentLeft && (_handles.year.currentLeft =parseInt(_wrap.css('left')));
				!_handles.year.distance && (_handles.year.distance =_wrap.width());
				
				_handles.year.currentLeft+=_handles.year.distance;
				
				_handles.year.end=_handles.year.start-1;
				_handles.year.start=_handles.year.start-30;
				_handles.year.index-=1;
		        
		        if(!_handles.year.data[_handles.year.start]){
		        		_getYearsGroup(_handles.year.start,_handles.year.end).css('left',_handles.year.index*_handles.year.distance);
		        }
			     _handles.year.element.find('.yearswrap').css({'transition-duration':'300ms','transform':'translate3d('+_handles.year.currentLeft+'px, 0px, 0px)'});
		};
		function _bindYears(){
		    var _touchstart=null,_touchmove=false;
		    _e_picker.on({
		        "touchmove":function(event){
		                    var _touches=event.originalEvent.touches;
		                        if(_touchstart===null){_touchstart=_touches[0].clientX;}
		                        //slider left
		                        if(!_touchmove&& _touchstart!==null && (_touches[0].clientX-_touchstart>88) ){_touchmove=true;_yearPrev();}
		                        //slider right
		                        if(!_touchmove&& _touchstart!==null && (_touches[0].clientX-_touchstart<(0-88))){_touchmove=true;_yearNext();}
		         },
		         "touchend":function(event){_touchmove=false;_touchstart=null;}
		    },'.years');
		    _e_picker.on('touchend','.years .yg b',function(){
		    	_handles["year"].element.find("b.on").removeClass('on');
			$(this).addClass('on');
		    	_handles["year"].change(this.innerHTML);
		    });
		    _e_picker.on('touchend','.years .nxt',_yearNext);
		    _e_picker.on('touchend','.years .prv',_yearPrev);
		}
		_bindYears();
		
		_e_picker.on('touchend','.months >b',function(){
			_handles["month"].element.find("b.on").removeClass('on');
			$(this).addClass('on');
			_handles["month"].change(this.innerHTML);
			_pickerOf();
		});
		_e_picker.on('touchend','.dates .ds >b',function(){_handles["date"].change(this.innerHTML);_pickerOf();});
		_e_picker.on('touchend','.hours >b',function(){
			_handles["hours"].element.find(">b.on").removeClass('on');
			$(this).addClass('on');
			_handles["hours"].change(this.innerHTML);
			_pickerOf();
		});
		
		_e_x.on('touchend',function(){__F.hide()});
		_e_masker.on('touchend',function(){_pickon=false;_pickerOf()});
		
		_e_today.on('touchend',function(){__F.change(new Date());_handles.year.reset()});
		_e_submit.on('touchend',function(){__F.submit(__F.date);__F.hide()});
		_e_timerSubmit.on('touchend',function(){__F.submit(__F.date);__F.hide()});
		
		
		//timer
		var _timerHours=_co(1,24,3,true,true),
			_timerMinutes=_co(1,60,10,true,true),
			_w_hours=_e_timerPicker.find('.hours'),
			_w_minutes=_e_timerPicker.find('.minutes');
			
			_w_hours.append(_timerHours);
			_w_minutes.append(_timerMinutes);
			
			__F.timer.append(_e_timerSubmit);
			
			var rulerHours=new Ruler(_w_hours.find('.ruler'),parseInt(_e_timerHours.html()),15, _LAN("Hours") ,function(v){__F.date.setHours(parseInt(v));}),
				rulerMinutes=new Ruler(_w_minutes.find('.ruler'),parseInt(_e_timerMinutes.html()),15, _LAN("Minutes"),function(v){__F.date.setMinutes(parseInt(v));});
				
		var __actived=null;
		__F.show=function(n,d){
			if(__actived){__F.hide()}
			__actived=n;
			switch(n){
				case 'date' :
					__F.dater.addClass('notimer').appendTo(document.body);
				break;
				case 'dateAndTime' :
					__F.dater.appendTo(document.body);
				break;
				case 'time' :
					__F.timer.appendTo(document.body);
				break;
				default:
					__F.dater.appendTo(document.body);
				break;
			}
			return __F;
		}
		__F.hide=function(){
			if(__actived==='date'||__actived==='dateAndTime'){
				__F.dater.detach();
				__F.dater.removeClass('notimer');
			}
			if(__actived==='time'){
				__F.timer.detach();
			};
			__actived=null;
			
			return __F;
		}
}


