"use strict";
var J=jQuery;
function isout(event,e){if(!J(e)[0]){return true;}var tgt=event.target;if(event.type=="mouseout"){tgt=event.relatedTarget}if(tgt == J(e)[0] || J(e).find(tgt)[0]){ return false; }else{ return true }}
function stepper(){
	var _f=this,
		_sp=function (a){var sps=[1000,500,250,125,100,50,40,20,10,5,2,1];if(a<1){a=1}if(a>10){a=10}return sps[a];};
		
		_f.onBof=function(){};
		_f.onStpBof=function(){};
		_f.onStp=function(){};
		_f.onEof=function(){};
		_f.onRun=function(){};
		
		_f.degree=0;
		_f.stepSize=0;
		_f.stepsSize=0;
		
		_f.speed=10;
		_f.steps=0;
		
		var  _t=0,
			_step=0,
			_steps=0,
			_stopof=false,
			_speed=0,
			_stpBof=false,
			_runtid=0;
			
		_f.stop=function(){_stopof=true};
		_f.run=function(){
			_t=0;
			_stopof=false,
			_f.speed=_f.stepSize/_sp(_f.degree);
			
			_step=_f.stepSize/_f.speed;
			_steps=_f.steps=_f.stepsSize/_f.stepSize*_step;
			
			_stpBof=false;
			
			_runtid=setInterval(function(){
				if(_t==0){if(_stopof){clearInterval(_runtid)}_f.onBof(_t);}
				if(!_stpBof){_f.onStpBof(_t);_stpBof=true;}
				_f.onRun(_t);
				if(_t>0 && ((_t%_step)==0)){if(_stopof){clearInterval(_runtid)}_f.onStp(_t);_stpBof=false;}
				if(_t>=_steps){_f.onEof(_t);clearInterval(_runtid);}else{_t++}
			},11);
		};
		_f.easing=function(t,b,c,d){return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;/*t:current time;b:beginning value;c:change in value;d:duration.*/};
		return _f;
}
function JSlider(optns){
		var SLD=this;
		SLD.options={
			trg:'.j_slider',
			sd:'.sd',
			slideEvents:{},
			speed:8,
			onSlid:function(){},
			autoplay:false,
			button:true,
			menu:false,
			linkedmenu:false,
			menuevent:'click',
			menuType:'bull',
			wheel:false,
			slidebar:false,
			imgReady:true,
			direction:'x',
			rounded:true,
			mode:'sliderone',
			knob:1
		};
		jQuery.extend(SLD.options, optns);
		var MODES={'x':{axs:'x',Axs:'X',p:'l',pos:'left',Pos:'Left',s:'w',sz:'width',Sz:'Width'},'y':{axs:'y',Axs:'Y',p:'t',pos:'top',Pos:'Top',s:'h',sz:'height',Sz:'Height'}};
		
		SLD.je= J(SLD.options.trg);
		SLD[0]=SLD.je[0];
		if(!SLD[0]){return;}
		jQuery.extend(SLD.options, E(SLD.je).options());
		
		SLD.md=MODES[SLD.options.direction];
		SLD.csn=SLD.options.mode==='display'?'j_dslider':'j_'+SLD.options.direction+'slider';
		SLD.authorized=true;
		
		SLD.je.addClass('j_slider');
		SLD.je.addClass(SLD.csn);
		
		SLD.area=SLD.je.find('.slidarea').eq(0);
		SLD.wrap=SLD.je.find('.sds').eq(0);
		
		SLD.area.css({'position':'relative','overflow':'hidden'});
		SLD.wrap.css({'position':'relative'});
		
		 var md= MODES[SLD.options.direction],
		 	sds=SLD.je.find(SLD.options.sd);
		 	(sds.length < SLD.options.knob)&&(SLD.authorized=false);
		 
		 SLD.monitor=new JMatrix();
		 SLD.on=function(n){
		 	var _S=SLD;
		 	if(!_S.monitor.has(n)){
		 			_S.monitor.push(n,new JMatrix(n));
		 	}
		 	_S.monitor[n].bind.apply(_S.monitor[n],[].slice.call(arguments,1))
		 };
		 var _steper=new stepper(),
		 	_locked=false,_pos=0,_cridx=0,_toidx=0,
		 	_sdcsn='sd',
		 	_sdsiz= J(sds[0])[md.sz](),
		 	_sdslen=sds.length,
		 	_sdsSort={};
		 
		if (_sdslen <= 1) { return;}
		 var _areaknob=Math.floor(SLD.area[md.sz]()/_sdsiz),_arrange=[],
		 	_knob=!isNaN(SLD.options.knob)? SLD.options.knob : _areaknob ;_knob=(_knob>1)?_knob:1;
		 
		 SLD.area[md.sz](_areaknob*_sdsiz);
		  J(sds[0]).addClass(_sdcsn+'_f'); J(sds[sds.length-1]).addClass(_sdcsn+'_l');
		 
		 var cmpIndex=function(_c){if(_c<0){_c=_sdslen+_c;}if(_c>=_sdslen){_c=_c-_sdslen}return _c;};
		 var slids={
			"slider":{
				'init':function(){
					sds.each(function(idx){
						var it= J(this);
						it.addClass(_sdcsn).addClass(_sdcsn+'_'+idx);
						it.css(md.pos,_sdsiz*idx);
						_sdsSort[idx]=idx;
					});
					if(((_sdsiz*_sdslen)<=SLD.area[md.sz]())){SLD.authorized=false;}
				},
				'slid':function(s){
					if(_locked){return}
						_locked=true;
					var _toPos=_pos+s*_sdsiz,
						_cpos=_pos,
						_factor=(s<0)?-1:1;
						_toidx=cmpIndex(_cridx-s);
					
					if(!SLD.options.rounded && (_factor<0) && (_toidx>(_sdslen-_areaknob))){_toidx=(_sdslen-_areaknob);_toPos=_toidx*_sdsiz;}
					if(!SLD.options.rounded && (_factor>0) && (_toPos>0)){_toidx=0;_toPos=0;}
					
					if(!SLD.options.rounded && (_factor>0) && (_cridx==0)){_locked=false;SLD.monitor.run('slidStart');return;}
					if(!SLD.options.rounded && (_factor<0) && (_cridx>=(_sdslen-_areaknob))){_locked=false;SLD.monitor.run('slidEnd');return;}
					
					_steper.degree=SLD.options.speed+Math.abs(s)-1;
					_steper.stepSize=_sdsiz;
					_steper.stepsSize=Math.abs(Math.abs(_pos)-Math.abs(_toPos));
					_steper.onBof=function(c){
						SLD.monitor.run('slidMenu');
						//if(_factor>0){slids.slider.sort(s);}
						SLD.monitor.run('slidBof',[_toidx]);
					};
					_steper.onStpBof=function(){
						slids.slider.sort(_factor);
					};
					_steper.onRun=function(c){
						//SLD.wrap.css(md.pos,_steper.easing(c,_cpos,_steper.stepsSize*_factor,_steper.steps));
						SLD.wrap.css(md.pos,_cpos+_steper.speed*_factor*c);
						SLD.monitor.run('slidRun');
					};
					_steper.onStp=function(c){
						_pos=_pos+_sdsiz*_factor;
						_cridx=cmpIndex(_cridx-_factor);
						SLD.monitor.run('slidStp');
					};
					_steper.onEof=function(){
						if(!SLD.options.rounded && (_factor>0) && (_cridx==0)){_locked=false;SLD.monitor.run('slidStart');return;}
						if(!SLD.options.rounded && (_factor<0) && (_cridx==(_sdslen-Math.ceil(SLD.area[md.sz]()/_sdsiz)))){_locked=false;SLD.monitor.run('slidEnd');return;}
						
						_locked=false;	
						//if(_factor<0){slids.slider.sort(s);}
						SLD.monitor.run('slidEof');
					};
					_steper.run();
					SLD.options.onSlid(_cridx,SLD.monitor);
				},
				'sort':function(f){
					if(!SLD.options.rounded){return}
					var curp=f<0?_pos:_pos+(f*_sdsiz),_p=0;
					sds.each(function(i){
						_p=_sdsSort[i]=cmpIndex(_sdsSort[i]+f);
						this.setAttribute('p',_sdsSort[i]);
						if((f===1 || f===-1)){
							if(f<0){//toRight
							 J(this).css(md.pos,(_sdsSort[i]*_sdsiz)-curp);
							}
							if(f>0){//toLeft
								 J(this).css(md.pos,(_sdsSort[i]*_sdsiz)-curp);
							}
						}
					});
				}
			},
			'sliderone':{
				'init':function(){
					SLD.options.knob=1;
					for(var i=0;i<_sdslen;i++){
						 J(sds[i]).addClass(_sdcsn+' '+_sdcsn+'_'+i);
						sds[i].p=i;
						if(i==0){
							 J(sds[i]).css('z-index',1);
						}else{
							 J(sds[i]).css('z-index',0);
						}
						 J(sds[i]).css(md.pos,0);
					}
					if(SLD.options.speed<1){SLD.options.speed=1}
					if(SLD.options.speed>12){SLD.options.speed=12}
					SLD.options.speed=(13-SLD.options.speed)*100;
				},
				'slid':function(s){
					if(_locked){return}_locked=true;
					var _factor=(s<0)?-1:1;
					var slidsteps=Math.ceil(_sdslen/_knob);
					
					if(!SLD.options.rounded && (_factor>0) && (_cridx==0)){SLD.monitor.run('slidStart');return;}
					if(!SLD.options.rounded && (_factor<0) && (_cridx==((slidsteps-1)*_knob))){SLD.monitor.run('slidEnd');return;}
					
					_toidx=_cridx-s;
					if(_toidx<0){_toidx=_sdslen+_toidx;}
					if(_toidx>=_sdslen){_toidx=_toidx-_sdslen;}
					
					SLD.monitor.run('slidBof',[_toidx]);
					
					var c_sd=sds[_cridx],t_sd=sds[_toidx],sz=Math.ceil(_sdsiz/4);
					_cridx-=_factor;
					if(_cridx<0){_cridx=_sdslen+_cridx;}
					if(_cridx>=_sdslen){_cridx=_cridx-_sdslen}
					SLD.monitor.run('slidStp',[_cridx]);
					SLD.monitor.run('slidMenu');
					
					 J(sds).css('z-index',0);
					 J(c_sd).css({'z-index':1});
					 J(t_sd).css({'opacity':0,'z-index':2});
					if(_factor<0){
						 J(t_sd).css(md.pos,sz);
					}else{
						 J(t_sd).css(md.pos,0-sz);
					}
					
					var amv={};amv[md.pos]=0;amv['opacity']=1;
					 J(t_sd).stop(true,true).animate(amv,SLD.options.speed,function(){
						 J(c_sd).css({'opacity':0,'z-index':0});
						SLD.monitor.run('slidEof');
						_locked=false;
					});
					SLD.options.onSlid(_cridx,SLD.monitor);
					if(!SLD.options.rounded && (_factor>0) && (_cridx==0)){SLD.monitor.run('slidStart');return;}
					if(!SLD.options.rounded && (_factor<0) && (_cridx==((slidsteps-1)*_knob))){SLD.monitor.run('slidEnd');return;}
				}
			},
			'display':{
				'init':function(){
					SLD.options.knob=1;
					if((_sdslen%_knob)>0){
						SLD.wrap.append('<'+sds[0].tagName+' class="'+_sdcsn+' '+_sdcsn+'_hdn"></'+sds[0].tagName+'>');
					}
					sds=SLD.wrap.find('.'+_sdcsn);
					_sdslen=sds.length;
					for(var i=0;i<_sdslen;i++){
						 J(sds[i]).addClass(_sdcsn+' '+_sdcsn+'_'+i);
						sds[i].p=i;
						 J(sds[i]).css('z-index',(_sdslen-1)-i);
						 J(sds[i]).css(md.pos,_sdsiz*(i%_knob));
						if(i>=_knob){
							 J(sds[i]).css('opacity',0);
						}else{
							 J(sds[i]).css('opacity',1);
						}
					}
					if(SLD.options.speed<1){SLD.options.speed=1}
					if(SLD.options.speed>12){SLD.options.speed=12}
					SLD.options.speed=(13-SLD.options.speed)*100;
				},
				'slid':function(s){
					if(_locked){return}
						_locked=true;
					var _factor=(s<0)?-1:1;
					var slidsteps=Math.ceil(_sdslen/_knob);
					if(!SLD.options.rounded && (_factor>0) && (_cridx==0)){_locked=false;SLD.monitor.run('slidStart');return;}
					if(!SLD.options.rounded && (_factor<0) && (_cridx==((slidsteps-1)*_knob))){_locked=false;SLD.monitor.run('slidEnd');return;}
					
					_toidx=_cridx-s;
					if(_toidx<0){_toidx=_sdslen+_toidx;}
					if(_toidx>=_sdslen){_toidx=_toidx-_sdslen}
					
					SLD.monitor.run('slidBof');
					var idx=_cridx-s,slds=[],idx2=_cridx,slds2=[];
					for(var i=0;i<_knob;i++){
						if(idx<0){idx=_sdslen+idx;}if(idx>=_sdslen){idx=idx-_sdslen}
						if(idx2<0){idx2=_sdslen+idx2;}if(idx2>=_sdslen){idx2=idx2-_sdslen}
					 	slds.push(sds[idx]);slds2.push(sds[idx2]);
						idx++;idx2++;
					}
					for(var i=0;i<Math.abs(s);i++){
						slids.display.sort(_factor);
						_cridx-=_factor;
						if(_cridx<0){_cridx=_sdslen+_cridx;}
						if(_cridx>=_sdslen){_cridx=_cridx-_sdslen}
						SLD.monitor.run('slidStp',[_cridx]);
					}
					SLD.monitor.run('slidMenu');
					 J(sds).css('opacity',0); J(slds2).css('opacity',1); J(slds).css('opacity',0);
					 J(slds).animate({opacity:1},SLD.options.speed,function(){
						SLD.monitor.run('slidEof');
						_locked=false;
					});
					SLD.options.onSlid(_cridx,SLD.monitor);
					if(!SLD.options.rounded && (_factor>0) && (_cridx==0)){_locked=false;SLD.monitor.run('slidStart');return;}
					if(!SLD.options.rounded && (_factor<0) && (_cridx==((slidsteps-1)*_knob))){_locked=false;SLD.monitor.run('slidEnd');return;}
				},
				'sort':function(f){
					sds.css('z-index',function(i,v){
						var p=this.p;p=p+f;
						if(p<0){p=_sdslen+p}
							if(p>=(_sdslen)){p=p-_sdslen}
						this.p=p;return (_sdslen-1)-p;
					});
				}
			}
		};
		SLD.je.css('visibility','hidden');
		var _init=function(){
				slids[SLD.options.mode].init();
				SLD.slid=function(s){slids[SLD.options.mode].slid(s);};
				SLD.wrap.height(SLD.wrap.height());
				SLD.je.addClass('slidinited').css('visibility','');
		};
		var sdf=sds[0],imgf=$(sdf).find('img').get(0);
		if(imgf){
			imgReady(imgf,function(img){
					SLD.wrap.height(img.height);
			});
			_init();
		}else{
			SLD.wrap.height($(sdf).height());
			_init();
		}

		if(!SLD.authorized){return SLD;}
		//autoplay=====================================
		SLD.autoplay=false;
		var autoplayTid;
		var autoplay=function(){
			var _f=this;
			_f.rounded=SLD.options.rounded;
			if(SLD.options.autoplay<500){SLD.options.autoplay=500}
			_f.fn=function(){SLD.slid(0-_knob);};
			_f.play=function(){
				if(sds.length<2){return}
				SLD.options.rounded=true;
				clearInterval(autoplayTid);
				autoplayTid=setInterval(_f.fn,SLD.options.autoplay);
			};
			_f.stop=function(){SLD.options.rounded=_f.rounded;clearInterval(autoplayTid)};
			_f.goon=function(){_f.play();};
			return _f;
		};
		//rowed====================================
		var rowed=function(){
			if(!SLD.options.rowed){return}
			var ro=false,ros=0;
			sds.bind('mousedown',function(event){event.preventDefault()});
			SLD.area.bind('mousedown',function(event){ro=true;ros=event['page'+SLD.md.Axs]});
			 J(document).bind('mouseup',function(event){
				if(!ro){return}
				if((event['page'+SLD.md.Axs]-ros)>0){SLD.slid(_knob)}
				if((event['page'+SLD.md.Axs]-ros)<0){SLD.slid(0-_knob)}ro=false;
			});
		};
		//wheel====================================
		var wheel=function(){
			if(!SLD.options.wheel){return}
			SLD.je.bind('mousewheel',function(event,wheel){event.preventDefault();if(wheel>0){SLD.slid(_knob)}if(wheel<0){SLD.slid(0-_knob);}});
		};
		//button====================================
		var button=function(){
			if(!SLD.options.button){return}
				var prev= J(),next= J();
			if(SLD.options.direction==='x'){
				 prev= J('<span class="j_sldprev b"><s><b>&lsaquo;</b></s></span>');
				 next= J('<span class="j_sldnext b"><s><b>&rsaquo;</b></s></span>');
			}
			if(SLD.options.direction==='y'){
				 prev= J('<span class="j_sldprev b"><s><b>&and;</b></s></span>');
				 next= J('<span class="j_sldnext b"><s><b>&or;</b></s></span>');
			}
			SLD.je.append(prev);SLD.je.append(next);
			prev.bind({'click':function(){SLD.slid(_knob) }});
			next.bind({'click':function(){SLD.slid(0-_knob);}});
			
			if(!SLD.options.rounded){prev.addClass('j_sldprev_dis');}
			
			SLD.monitor.bind('slidStart','',function(){prev.addClass('j_sldprev_dis');});
			SLD.monitor.bind('slidStp','',function(){prev.removeClass('j_sldprev_dis');next.removeClass('j_sldnext_dis');});
			SLD.monitor.bind('slidEnd','',function(){next.addClass('j_sldnext_dis');});
		};
		//menu=====================================
		var menu=function(){
			if(!SLD.options.menu){return}
			var ms,m,mleh=Math.ceil(_sdslen/_knob);
			if (mleh<1){return ;}
			var menucon='',menu= J('<span class="j_sldmenu"></span>').appendTo(SLD.je);
			for(var i=0;i<mleh;i++){
				menucon=(SLD.options.menuType==='bull')?'<s>&bull;</s>':'<b>'+(i+1)+'</b>';
				m= J('<span class="m" idx="'+i+'">'+menucon+'</span>');
				menu.append(m);
				m.bind(SLD.options.menuevent,function(){
					var idx=parseInt( J(this).attr('idx'));
					if( (_cridx/_knob) < idx){SLD.slid(0-(idx*_knob-_cridx));}
					if( (_cridx/_knob) > idx){SLD.slid((_cridx-idx*_knob));}
				});
			}
			ms=menu.find('.m');
			 J(ms[0]).addClass('m_on');
			SLD.monitor.bind('slidMenu','menu',function(){
				var n=Math.ceil(_toidx/_knob);
				ms.removeClass('m_on');
				 J(ms[n]).addClass('m_on');
			});
		};
		//linkedmenu=====================================
		
		var linkedmenu=function(){
			if(!SLD.options.linkedmenu){return}
			var lma= J(SLD.options.linkedmenu);
			if(!lma[0]){return}
			var lmds=lma.find('.m'),lilen=Math.ceil(_sdslen/_knob);
			if(lmds.length<1){return;}
			lilen=lilen<lmds.length?lilen:lmds.length;
			for(var i=0;i<lilen;i++){
				 J(lmds[i]).addClass('m');
				 J(lmds[i]).attr('idx',i);
				 J(lmds[i]).bind('click',function(){
					var idx=parseInt( J(this).attr('idx'));
					if( (_cridx/_knob) < idx){SLD.slid(0-(idx*_knob-_cridx));}
					if( (_cridx/_knob) > idx){SLD.slid((_cridx-idx*_knob));}
				});
			}
			 J(lmds[0]).addClass('m_on');
			SLD.monitor.bind('slidMenu','linkedmenu',function(){var n=Math.ceil(_toidx/_knob);lmds.removeClass('m_on');lmds.eq(n).addClass('m_on');});
			 J(lmds[0]).parent().bind({'mouseover':function(){if(SLD.autoplay){SLD.autoplay.stop()}},'mouseout':function(event){if(isout(event,this) && SLD.autoplay){SLD.autoplay.play();}}});
		};
		//touch=====================================
		var th=false,pths=0,pthc=0;
		SLD.je.on({
			'touchstart':function(event){
				 th=true;
				 pths = event.originalEvent.targetTouches[0]['pages'+SLD.md.Axs];
			},
			'touchend':function(event){
				if(!th){return}
				pthc = event.originalEvent.targetTouches[0]['pages'+SLD.md.Axs];
				if(pths>pthc){
					SLD.slid(0-_knob);
				}else{
					SLD.slid(_knob);
				}
				th=false;
			}
		});
		if(SLD.options.autoplay){
			SLD.autoplay=new autoplay();
			SLD.autoplay.play();
			SLD.je.bind({'mouseover':function(){SLD.autoplay.stop()},'mouseout':function(event){if(isout(event,this)){SLD.autoplay.play();}}});
		}
		button();menu();linkedmenu();rowed();wheel();
		
		return SLD;
}