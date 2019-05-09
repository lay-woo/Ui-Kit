window.J=window.J||jQuery;
Ui.language=function(title,language,shourt){
    'use strict';
    language=language?language:'en';
    shourt=shourt?'Shourt':'';
    return Ui.language[title+shourt][language];
};
Ui.language.push=function(a,b){
    'use strict';
    if(typeof (a)==='object'&&a!==null){
        for(var k in a){
            if(a.hasOwnProperty(k)){
                Ui.language[k]=a[k];
            }
        }
    }else if(a&&b){
            Ui.language[a]=b;
        }
};
Ui.language.push({
    month:{
        'en':['January','February','March','April','May','June','July','August','September','October','November','December'],'cn':['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    },monthShourt:{
        'en':['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],'cn':['1','2','3','4','5','6','7','8','09','10','11','12']
    },day:{
        'en':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],'cn':['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
    },dayShourt:{
        'en':['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],'cn':['日','一','二','三','四','五','六']
    },time:{
        'en':['Hour','Minute','Second','Hours','Minutes','Seconds','Time'],'cn':['时','分','秒','小时','分钟','秒','时间']
    }
});
function JTimer(_params){
    var _S=this;

    _S.prms=jQuery.extend({},{
        trg:J(),language:'en',change:function(){
        },remove:function(){
        },end:'end'
    },_params);

    _S.trg=J(_S.prms.trg);
    _S.time=false;
    _S.hours=0;
    _S.minutes=0;

    var _text=Ui.language('time',_S.prms.language);
    _S.element=J('<div class="j_timer"><div class="tmh"><b class="t">'+_text[6]+'</b><em class="tmv"><b class="h">00</b>:<b class="m">00</b></em></div><div class="tmb" style="display:none;"><div class="tmi"><b>'+_text[0]+'</b><span class="hdg"><b><em></em></b></span></div><div class="tmi"><b>'+_text[1]+'</b><span class="mdg"><b><em></em></b></span></div></div></div>').appendTo(_S.trg);
    _S.monitor=Ui.monitor;

    var tmb=_S.element.find('.tmb'),
        bhdg=_S.element.find('.hdg b'),
        bmdg=_S.element.find('.mdg b'),
        tmv=_S.element.find('.tmv'),
        tmh=tmv.find('.h'),
        tmm=tmv.find('.m');

    _S.clear=function(){
        _S.time=false;
        tmb.css('display','none');
        _S.val(0,0);
        _S.prms.remove();
    };
    _S.val=function(h,m){
        bhdg.css('left',h*5);
        h=h<10?'0'+h:h;
        tmh.html(h);
        _S.hours=h;

        bmdg.css('left',m*2);
        m=m<10?'0'+m:m;
        tmm.html(m);
        _S.minutes=m;
    };
    _S.init=function(val){
        if(val){
            var hm=val.split(':');
            if(hm[0]&&hm[1]){
                _S.val(hm[0],hm[1]);
            }else{
                return;
            }
        }
        _S.time=true;
        tmb.css('display','block');
    };
    _S.change=function(){
        _S.prms.change({houer:_S.hours,minute:_S.minutes,string:tmv.text()});
    };

    var tp=0,
        mp=0,
        tcount=function(l){
            var h=Math.floor(l/7);
            h=h<10?'0'+h:h;
            h=h>23?23:h;
            tmh.html(h);
            _S.hours=h;
        },
        mcount=function(l){
            var m=Math.floor(l/3);
            m=m<10?'0'+m:m;
            m=m>59?59:m;
            tmm.html(m);
            _S.minutes=m;
        };
    Ui.drag(bhdg[0],{
        'doing':function(event,drg){
            var l=tp+drg.distanceX;
            l=l<0?0:l;
            l=l>177?177:l;
            tcount(l);
            bhdg.css('left',l);
        },'start':function(){
            tp=parseInt(bhdg.css('left'));
        },'end':function(){
            tcount(parseInt(bhdg.css('left')));
            _S.change();
        }
    });
    Ui.drag(bmdg[0],{
        'doing':function(event,drg){
            var l=mp+drg.distanceX;
            l=l<0?0:l;
            l=l>177?177:l;
            mcount(l);
            bmdg.css('left',l);
        },'start':function(){
            mp=parseInt(bmdg.css('left'));
        },'end':function(){
            mcount(parseInt(bmdg.css('left')));
            _S.change();
        }
    });
    return _S;
}

function JCalendar(_params){
    var S=this;
    S.prms=jQuery.extend({},{
        input:null,format:'YYYY-MM-DD hh:mm',time:false,date:true,language:'cn',monthNames:'',monthNamesShrt:'',dayNamesShrt:'',weekBegin:0,yearBegin:1940,yearEnd:2021,onSubmit:function(){
        },end:'end'
    },_params);
    S.monitor=new JMatrix({
        'changeYear':new JMatrix(),'changeMonth':new JMatrix(),'changeDate':new JMatrix()
    });
    S.monthNames=S.prms.monthNames?S.prms.monthNames:Ui.language('month',S.prms.language);
    S.monthNamesShrt=S.prms.monthNamesShrt?S.prms.monthNamesShrt:Ui.language('month',S.prms.language,true);
    S.dayNamesShrt=S.prms.dayNamesShrt?S.prms.dayNamesShrt:Ui.language('day',S.prms.language,true);
    S.weekBegin=S.prms.weekBegin;

    S.input=J(S.prms.input)[0]?J(S.prms.input):J('<input />');
    S.time=S.prms.time;
    S.format=S.prms.format;
    S.onSubmit=function(){
    };
    S.onChange=function(){
    };
    S.now=new Date();
    S.prms.yearEnd=S.now.getFullYear()+20;
    S.selectedDate=S.now;
    S.currentDate=S.now;

    S.hours=0;
    S.minutes=0;
    S.formatFinds={
        'Y':{
            format:/Y{4}/,parse:'(\\d{4})',get:function(d){return d.getFullYear();}
        },'M':{
            format:/M{1,2}/,parse:'(\\d{1,2})',get:function(d){
                var _r=d.getMonth()+1;
                return (_r<10?'0'+_r:_r);
            }
        },'D':{
            format:/D{1,2}/,parse:'(\\d{1,2})',get:function(d){
                var _r=d.getDate();
                return (_r<10?'0'+_r:_r);
            }
        },'h':{
            format:/h{1,2}/,parse:'(\\d{1,2})',get:function(d){
                var _r=d.getHours();
                return (_r<10?'0'+_r:_r);
            }
        },'m':{
            format:/m{1,2}/,parse:'(\\d{1,2})',get:function(d){
                var _r=d.getMinutes();
                return (_r<10?'0'+_r:_r);
            }
        },'s':{
            format:/s{1,2}/,parse:'(\\d{1,2})',get:function(d){
                var _r=d.getSeconds();
                return (_r<10?'0'+_r:_r);
            }
        }
    };
    var indexof=function(array,value){
            for( i=0; i<array.length; i+=1){
                if(value==array[i]) {return i;}
            }
        },
        onYM=function(){
            S.monthsArea.find('.m_slt').removeClass('m_slt');
            J(S.bms[S.currentDate.getMonth()]).addClass('m_slt');

            S.yearsArea.find('.y_slt').removeClass('y_slt');
            S.bys.each(function(){
                if(J(this).attr('year')==S.currentDate.getFullYear()){
                    J(this).addClass('y_slt');
                }
            });
        },
        onSubmit=function(){
            S.onSubmit(S);
        },
        onChange=function(){
            S.onChange(S);
        };
    S.on=function(n){
        var S=this;
        if(S.monitor.has(n)){
            S.monitor[n].bind.apply(S.monitor[n],[].slice.call(arguments,1));
        }
    };
    S.build=function(){
        var ms='',
            ys='';
        for(var i=1; i<13; i++){
            ms+='<b month="'+i+'" class="m" ><i>'+i+'</i><b>'+S.monthNames[i-1]+'</b></b>';
        }
        for( i=S.prms.yearEnd; i>S.prms.yearBegin; i--){
            ys+='<b year="'+i+'" class="y">'+i+'</b>';
        }

        S.element=(''+'<div class="j_cldr"><b class="b_prv" title="Prev Month"></b><b class="b_nxt" title="Next Month"></b>'+'<div class="months" style="display:none;"><div class="msw">'+ms+'</div></div>'+'<div class="years" style="display:none;"><div class="msw scrollarea" scroller>'+ys+'</div></div>'+'<div class="j_cldr_heading">'+'<b class="b_today"></b><b class="b_submit"></b><em class="year"></em><em class="month"></em>'+'<b class="b_prv" title="Prev Month"></b><b class="b_nxt" title="Next Month"></b>'+'</div>'+'</div>');
        S.element=J(S.element);
        var heading=S.element.find('.j_cldr_heading'),
            monthsArea=S.monthsArea=S.element.find('>.months'),
            yearsArea=S.yearsArea=S.element.find('>.years'),
            monthVal=S.monthNameSpan=heading.find('.month'),
            yearVal=S.yearNameSpan=heading.find('.year');

        S.bys=S.element.find('>.years .y');
        S.bms=S.element.find('>.months .m');
        var tableShell='<div class="j_cldr_month"><div class="ws">';
        J(S.adjustDays(S.dayNamesShrt)).each(function(){
            tableShell+='<span class="w"><b>'+this+'</b></span>';
        });
        tableShell+='</div><div class="ds"></div></div>';

        S.element.append(tableShell);

        S.datesArea=S.element.find('.ds');

        var showCheckArea=function(a){
            if(a==='m'){
                if(monthVal.hasClass('month_on')){
                    monthsArea.css('display','none');
                    monthVal.removeClass('month_on');
                }else{
                    monthsArea.css('display','');
                    monthVal.addClass('month_on');
                    //monthsArea.css('opacity',0).animate({'opacity':1},100);
                }
                yearsArea.css('display','none');
                yearVal.removeClass('year_on');

                return;
            }
            if(a==='y'){
                if(yearVal.hasClass('year_on')){
                    yearsArea.css('display','none');
                    yearVal.removeClass('year_on');
                }else{
                    yearsArea.css('display','');
                    yearVal.addClass('year_on');
                    var w=yearsArea.find('>.msw');
                    w.css('height',S.element[0].offsetHeight-80);
                    //yearsArea.css('opacity',0).animate({'opacity':1},100);
                }
                monthsArea.css('display','none');
                monthVal.removeClass('month_on');
                return;
            }
            monthsArea.css('display','none');
            monthVal.removeClass('month_on');

            yearsArea.css('display','none');
            yearVal.removeClass('year_on');

            return;
        };

        monthVal.on('click',function(){
            showCheckArea('m');
            return false;
        });
        yearVal.on('click',function(){
            showCheckArea('y');
            return false;
        });

        monthsArea.on('click','.m',function(){
            var m=parseInt(this.getAttribute('month'))-1;
            m-=S.currentDate.getMonth();
            S.moveMonthBy(m);
        });
        yearsArea.on('click','.y',function(){
            var y=parseInt(this.getAttribute('year'));
            y-=S.currentDate.getFullYear();
            S.moveMonthBy(y*12);
            S.monitor.run('changeYear',[S]);
        });

        S.element.on('click','.b_today',function(){
            S.changeMonth(new Date());
        });
        S.element.on('click','.b_submit',onSubmit);
        S.element.on('click','.b_prv',function(){
            S.moveMonthBy(-1);
        });
        S.element.on('click','.b_nxt',function(){
            S.moveMonthBy(1);
        });
        S.element.on('click',function(event){
            showCheckArea();
            event.stopPropagation();
        });

        S.datesArea.on('click','.d_enb',function(){
            S.datesArea.find('.d_slt').removeClass('d_slt');
            J(this).addClass('d_slt');
            S.changeValue(S.stringToDate(J(this).attr('date')));
            onSubmit();
        });
    };
    S.init=function(prms){

        if(typeof (prms)==='object'){
            J.extend(S.prms,prms);
        }
        S.input=J(S.prms.input)[0]?J(S.prms.input):J('<input />');

        S.valFn=S.input[0].tagName.toLowerCase()==='input'?'val':'html';
        if(!E(S.input).has('Calender')){
            S.format=S.input.attr('format')||S.prms.format;
            S.time=S.input.attr('time')||S.prms.time;

            E(S.input[0]).Calender={
                format:S.format,time:S.time
            };
        }else{
            var _Calender=E(S.input[0]).Calender;
            S.format=_Calender.format;
            S.time=_Calender.time;
        }
        S.enDate=S.formatFinds.Y.format.test(S.format)||S.formatFinds.M.format.test(S.format)||S.formatFinds.D.format.test(S.format);
        S.enTime=S.formatFinds.h.format.test(S.format)||S.formatFinds.s.format.test(S.format);

        if(!S.enDate){
            S.element.addClass('nodate');
        }else{
            S.element.removeClass('nodate');
        }
        if(!S.enTime){
            S.element.addClass('notime');
        }else{
            S.element.removeClass('notime');
        }

        var fm=S.formatPaser();
        S.formatIndexs=fm.indexs;
        S.formatPattern=fm.pattern;
        S.selectedDate=S.formatDate(S.input[S.valFn]());
        S.changeDate(S.selectedDate);

        if(S.time&& !S.timer){
            S.timer=new JTimer({
                trg:S.element,language:S.prms.language,change:function(){
                    S.hours=S.timer.hours;
                    S.minutes=S.timer.minutes;
                    S.changeValue(S.selectedDate);
                },remove:function(){
                    S.hours=0;
                    S.minutes=0;
                }
            });

            S.timer.init(S.selectedDate.getHours()+':'+S.selectedDate.getMinutes());

            S.hours=S.timer.hours;
            S.minutes=S.timer.minutes;
        }
    };
    S.changeMonth=function(date){
        var newMonth=new Date(date.getFullYear(),date.getMonth(),1);
        if(!S.currentMonth|| !(S.currentMonth.getFullYear()==newMonth.getFullYear()&&S.currentMonth.getMonth()==newMonth.getMonth())){
            S.currentMonth=newMonth;
            var rangeStart=S.rangeStart(date),
                rangeEnd=S.rangeEnd(date),
                numDays=S.daysBetween(rangeStart,rangeEnd),
                c=0,
                dayCells='';
            for(var i=0; i<=41; i++){
                var currentDay=new Date(rangeStart.getFullYear(),rangeStart.getMonth(),rangeStart.getDate()+i);
                if(S.isFirstDayOfWeek(currentDay)){
                    c=0;
                    dayCells+='<div class="wds">';
                }
                if(currentDay.getMonth()==date.getMonth()){
                    dayCells+='<span class="d_enb d" date="'+S.dateToString(currentDay)+'"><b>'+currentDay.getDate()+'</b></span>';
                }else{
                    dayCells+='<span class="d_dis d" date="'+S.dateToString(currentDay)+'"><b>'+currentDay.getDate()+'</b></span>';
                }
                if(c===6){
                    dayCells+='</div>';
                }
                c++;
            }
            S.datesArea.empty().append(dayCells);

            S.monthNameSpan.empty().append(S.monthNames[date.getMonth()]);
            S.yearNameSpan.empty().append(S.currentMonth.getFullYear());
            S.datesArea.find('span[date="'+S.dateToString(new Date())+'"]').addClass('d_tdy');
        }
        S.currentDate=date;
        onYM();
        S.datesArea.find('.d_slt').removeClass('d_slt');
        S.datesArea.find('span[date="'+S.dateToString(S.selectedDate)+'"]').addClass('d_slt');
        S.monitor.run('changeMonth',[S]);
    };
    S.changeDate=function(date){
        if(date==null) date=new Date();
        S.currentDate=date;
        S.currentDateString=S.dateToString(S.currentDate);
        S.changeMonth(S.currentDate);
    };
    S.changeValue=function(date){
        if(typeof (date)==='object'&&(date instanceof Date)&& !isNaN(date.valueOf())){
            S.selectedDate=date;
        }else{
            S.selectedDate=S.currentDate;
        }
        S.selectedDate.setHours(S.hours);
        S.selectedDate.setMinutes(S.minutes);

        var s=S.dateToString(S.selectedDate)+' '+S.timeToString(S.selectedDate);
        S.selectedDateString=S.formatDate(S.selectedDate);

        S.input[S.valFn](S.selectedDateString).attr('date',s).attr('timestamp',date.getTime());
        S.input.trigger('change',S,S.selectedDate,s);
        onChange();
        S.monitor.run('change',[S]);
        S.monitor.run('changeDate',[S]);
    };
    S.formatPaser=function(format){
        var __format=format||S.format;
        var _indexs=[],
            _indexs1={},
            _patterns=S.formatFinds,
            _getIndex=function(_n,_rgx){
                var _rs=__format.search(_rgx);
                if(_rs>=0){
                    if(_n==='h'){
                        S.time=true;
                    }
                    _indexs1[_rs]=_n;
                    _indexs.push(_rs);
                }
            },
            _formatString=__format,
            _formatPattern='',
            _formatIndexs=[],
            _replaceRegexp=function(_s){
                return _s.replace(/(\\|\.|\*|\+|\?|\{|\}|\[|\]|\^|\$|\(|\)|\|)/g,'\\'+'$1');
            },
            _getPattern=function(k,i){
                var _rs=_patterns[k].format.exec(_formatString),
                    _c=i;
                if(_rs===null){
                    return;
                }
                if(_rs.index!=0){
                    _formatPattern+='('+_replaceRegexp(_formatString.substring(0,_rs.index))+')';
                    _formatIndexs.push(_formatString.substring(0,_rs.index));
                    _c+=1;
                }
                _formatPattern+=_patterns[k].parse;
                _formatIndexs.push('='+k+'=');
                _formatString=_formatString.substring(_rs.index+_rs[0].length);

                if(i===(_indexs.length-1)&&_formatString.lenght>0){
                    _formatPattern+='('+_replaceRegexp(_formatString)+')';
                    _formatIndexs.push(_formatString);
                }
            };
        for(var k in _patterns){
            if(_patterns.hasOwnProperty(k)){
                _getIndex(k,_patterns[k].format);
            }
        }
        _indexs.sort(function(a,b){return a-b;});

        for(var i=0,l=_indexs.length; i<l; i++){
            _getPattern(_indexs1[_indexs[i]],i);
        }
        return {indexs:_formatIndexs,pattern:'^'+_formatPattern+'$'};
    };
    S.formator=function(date,format){
        format=format||S.format;
        var fm=S.formatPaser(format);
        var d=S.formatDate(date,fm.indexs,fm.pattern);
        return d;
    };
    S.formatDate=function(a,fmtIndexs,fmtPatten){
        fmtIndexs=fmtIndexs||S.formatIndexs;
        fmtPatten=fmtPatten||S.formatPattern;
        var _dateFormat=function(d){
            var _r=[];
            for(var i=0,l=fmtIndexs.length; i<l; i++){
                var _k=fmtIndexs[i].replace(/\=/g,'');
                if(S.formatFinds.hasOwnProperty(_k)){
                    _r.push(S.formatFinds[_k].get(d));
                }else{
                    _r.push(fmtIndexs[i]);
                }
            }
            return _r.join('');
        };
        if(a!==undefined&& typeof (a)==='string'){
            var _mch=a.match(new RegExp(fmtPatten)),
                _r={};
            if(_mch===null){
                var _d=new Date(a);
                if(!isNaN(_d.valueOf())){
                    return _d;
                }
                return new Date();
            }
            _mch=[].slice.call(_mch);
            for(var k in S.formatFinds){
                if(S.formatFinds.hasOwnProperty(k)){
                    _r[k]=_mch[indexof(fmtIndexs,'='+k+'=')+1]||0;
                }
            }

            return new Date(_r.Y,_r.M-1,_r.D,_r.h,_r.m,_r.s);

        }else
            if(a!==undefined&& !isNaN(a.valueOf())){
                return _dateFormat(a);
            }else{
                return _dateFormat(S.currentDate);
            }
    };
    S.stringToDate=function(s){
        var _s=s.split('-');
        return new Date(parseInt(_s[0]),(parseInt(_s[1])-1),parseInt(_s[2]));
    };
    S.dateToString=function(date){
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    };
    S.timeToString=function(date){
        return (date.getHours()<10?'0'+date.getHours():date.getHours())+':'+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
    };

    S.setPosition=function(){
        var offset=S.input.offset();
        S.element.offset({
            top:offset.top+S.input.outerHeight(),left:offset.left
        });
    };
    S.moveDateBy=function(amount){
        var newDate=new Date(S.currentDate.getFullYear(),S.currentDate.getMonth(),S.currentDate.getDate()+amount);
        S.changeDate(newDate);
    };
    S.moveDateMonthBy=function(amount){
        var newDate=new Date(S.currentDate.getFullYear(),S.currentDate.getMonth()+amount,S.currentDate.getDate());
        if(newDate.getMonth()==S.currentDate.getMonth()+amount+1){
            newDate.setDate(0);
        }
        S.changeDate(newDate);
    };
    S.moveMonthBy=function(amount){
        var newMonth=new Date(S.currentMonth.getFullYear(),S.currentMonth.getMonth()+amount,S.currentMonth.getDate());
        S.changeMonth(newMonth);
    };
    S.monthNum=function(month_name){
        return indexof(S.monthNames,month_name);
    };
    S.shortMonthNum=function(month_name){
        return indexof(S.monthNamesShrt,month_name);
    };
    S.shortDayNum=function(day_name){
        return indexof(S.dayNamesShrt,day_name);
    };
    S.daysBetween=function(start,end){
        start=Date.UTC(start.getFullYear(),start.getMonth(),start.getDate());
        end=Date.UTC(end.getFullYear(),end.getMonth(),end.getDate());
        return (end-start)/86400000;
    };
    S.changeDayTo=function(dayOfWeek,date,direction){
        var difference=direction*(Math.abs(date.getDay()-dayOfWeek-(direction*7))%7);
        return new Date(date.getFullYear(),date.getMonth(),date.getDate()+difference);
    };
    S.rangeStart=function(date){
        return S.changeDayTo(S.weekBegin,new Date(date.getFullYear(),date.getMonth()),-1);
    };
    S.rangeEnd=function(date){
        return S.changeDayTo((S.weekBegin-1)%7,new Date(date.getFullYear(),date.getMonth()+1,0),1);
    };
    S.isFirstDayOfWeek=function(date){
        return date.getDay()==S.weekBegin;
    };
    S.adjustDays=function(days){
        var newDays=[];
        for(var i=0; i<days.length; i++){
            newDays[i]=days[(i+S.weekBegin)%7];
        }
        return newDays;
    };
    S.build();
    return S;
}

function JState(e,prms){
    var _S=this,
        _params=J.extend({
            event:'click',
            nexus:'.state',
            blur:true,
            fx:true
        },prms),
        _on='on';

    _S.e=e;

    E(e).JState=this;
    var blurEv=null;

    _S.of=function(a,event){
        if(!a){return;}

        var nexus=J(a.getAttribute("nexus"))[0]||J(a).find(_params.nexus).get(0)||J(a).next(_params.nexus)[0];
        var tgt=event.target;

        if(nexus && (nexus==tgt || J(nexus).find(tgt).get(0))){
            return false;
        }
        var blur=function(event){
            var tg=event.target;
            if(
                (a!=tg && !J(a).find(tg).get(0)) && 
                (nexus!=tg && !J(nexus).find(tg).get(0))
            ){
              nexus && J(nexus).removeClass(_on);
              J(a).removeClass(_on).trigger('stateOff');
              J(document).off('click',blur);
              blurEv=null;
            }
        };

        if(!E(a).hasClass(_on)){
            nexus && J(nexus).addClass(_on);
            J(a).addClass(_on).trigger('stateOn');

            if(_params.blur && !blurEv){
                J(document).on('click',blur);
                blurEv=true;
            }

            return;
        }else{
            nexus && J(nexus).removeClass(_on);
            J(a).removeClass(_on).trigger('stateOff');
            return;
        }

    };

    J(_S.e).on({
        'click':function(event){
            J.extend(_params,E(this).options(_params));
            if(_params.event!=='click'){
                return;
            }
            _S.of(this,event);
        },'mouseover':function(event){
            J.extend(_params,E(this).options(_params));
            if(_params.event!=='hover'){
                return;
            }
            _S.of(this,event);
        }
    });
}

function JGallery(){
    var G=this;
    var Ge=J('<div class="j_gallery" style="visibility:hidden;"><b class="x"><svg viewBox="0 0 21.21 21.21"><line x1="20.86" y1="0.35" x2="0.35" y2="20.86" style="stroke-miterlimit:10"/><line x1="0.35" y1="0.35" x2="20.86" y2="20.86" style="stroke-miterlimit:10"/></svg></b><div class="viewer"></div></div>'),
        Gv=Ge.find('.viewer'),
        Gx=Ge.find('.x'),
        Gprev=J('<b class="prev"><i class="i i-arrow_back"></i></b>'),
        Gnext=J('<b class="next"><i class="i i-arrow_forward"></i></b>'),
        Gm=J('<div class="menus"></div>');
    G.container=Ge;
    G.monitor=new JMatrix();
    G.idx=0;
    G.images=[];
    G.items=[];
    G.inisted=false;
    var __size=function(_w,_h){
        var __w=_w,
            __h=_h,
            _uw=Ui.width*0.8,
            _uh=Ui.height*0.8-80;
        if(_w>_uw){
            __w=_uw;
            __h=parseInt(__w/(_w/_h));
        }
        if(__h>_uh){
            __h=_uh;
            __w=parseInt(__h*(_w/_h));
        }
        return [__w,__h];
    };
    var showItem=function(_idx){
        Gm.find('.current').html(_idx+1);
        Ge.find('.img_on').find('img').css({'opacity':0,'transition-duration':'300ms','transform':'scale(0.2)','transition':'all 500ms ease-out'});
        Ge.find('.img_on').removeClass('img_on');

        G.items[_idx].addClass('img_on');
        var img=G.items[_idx].find('img');
        img.css({
            'opacity':0,'transform':'scale(0.2)','transition-duration':'300ms','transition':'all 500ms ease-out'
        });
        timed(function(){
            img.css({
                'opacity':1,'transform':'scale(1)'
            });
        },300);
    };
    G.change=function(_idx){
        var _image=G.images[_idx];
        var _item=G.items[_idx];
        if(!_image.completed){
            imgReady((_image.natural||_image.src),function(_img){
                if(_img.width!==0&&_img.height!==0){
                    var _s=__size(_img.width,_img.height);
                    _img.setAttribute('width',_img.width);
                    _img.setAttribute('height',_img.height);
                    _img.setAttribute('style','width:'+_s[0]+'px;height:'+_s[1]+'px;');
                    J(_item).append(_img);
                    J(_item).find('.inf').attr('href',_img.src).attr('target','_blank');
                    _image.completed=true;
                    showItem(_idx);
                    G.monitor.run('change',[G]);
                }
            },null,function(){
                timed(function(){
                    J(_item).append('<img src=\''+Ui.__imgDefault+'\' />');
                    J(_item).find('.inf').removeAttr('href');
                    J(_item).removeClass('ing');
                },300);
                _image.completed=true;
            });
        }else{
            timed(function(){J(_item).removeClass('ing');},500);
            showItem(_idx);
            G.monitor.run('change',[G]);
        }
    };
    G.view=function(_imgs,_currentImg){
        if(!G.inisted){
            Ge.appendTo(Ui.dombody);
            G.inisted=true;
        }
        Ge.removeAttr('style').removeClass('hidden');
        _imgs.each(function(i){
            var _idx=G.images.length,
                _image=JImg(this),
                _desc='';
            _image.completed=false;
            G.images[_idx]=_image;
            G.items[_idx]=J('<span class="img ing" ><a href="" class="inf"><i class="i-cloud_download"></i>'+(_image.title?'<strong class="ttl">'+_image.title+'</strong>':'')+(_image.alt?'<strong class="alt">'+_image.alt+'</strong>':'')+'</a></span>');
        });
        Gv.html(G.items);
        G.idx=J(_imgs).index(_currentImg)||0;
        if(G.images.length>1){
            Gm.html('<b class="current">'+(G.idx+1)+'</b>/'+G.images.length).appendTo(Ge);
            Gprev.appendTo(Ge);
            Gnext.appendTo(Ge);
        }else{
            Gprev.detach();
            Gnext.detach();
        }
        if(G.images.length===1){
            Gm.hide();
        }else{
            Gm.show();
        }
        G.change(G.idx);
        G.monitor.run('view',[G]);
    };
    var _slid=false,
        _holding=false,
        _cx=0,
        _cy=0,
        _cz=0,
        _zr=0,
        _moveX=0,
        _moveY=0,
        _slidX=0,
        _slidSX=0,
        _slidAmount=0,
        _changedImg=J(),
        _zoom=1;
    G.close=function(){
        Gm.empty();
        G.images.length=0;
        G.items.length=0;
        Gv.empty().removeAttr('style');
        Ge.removeClass('hidden').css('visibility','hidden');
        G.monitor.remove();
        _slid=_holding=false;
        _cx=_cy=_cz=_zr=_moveX=_moveY=_slidX=_slidSX=_slidAmount=0;
        _changedImg=(J()), _zoom=1;
        G.monitor.run('close',[G]);
    };
    Gprev.on('click',function(){
        if((G.idx-1)>=0){
            G.idx--;
            G.change(G.idx);
        }
    });
    Gnext.on('click',function(){
        if((G.idx+1)<G.images.length){
            G.idx++;
            G.change(G.idx);
        }
    });
}

function JEllipsis(e,ops){
    var _S=this;
    _S.key=UUID(2);
    _S.e=e;
    if(!_S.e){
        return null;
    }
    E(this.e).set('JEllipsis',this);
    var _params=J.extend({},{
        csn:'j_ellipsis',trg:'.b',checkOff:false,replace:false,turn:false,maxSize:800,maxCount:0,delayin:500,delayout:450,stay:true
    },ops);
    var _E=E(this.e);
    _params=J.extend({},_params,_E.options(_params));

    J(_S.e).addClass('j_ellipsis');
    _S.button=J('<b class="'+_params.csn+'_b" style="display:none;"></b>');
    _S.elp=J('<span class="'+_params.csn+'_elp '+_E.firstClass()+'_elp"></span>');
    _S.dir=J(_S.e).hasClass(''+_params.csn+'_y')?'y':'x';
    _S.lis=[];
    _S.lisSizes=[];
    _S.maxSize=0;
    _S.buttonSize=0;
    _S.maxCount=_params.maxCount;
    _S.hasEllipsis=false;

    var po=Ui['po_ellipsis']||(Ui['po_ellipsis']=new JPopuper({
            modal:'element',mode:'po',get:'',delayin:200,delayout:350,masker:true,maskerOpacity:0,blur:true,stay:true,close:'hide'
        })),
        _poup=false,
        _poops={
            position:'near',get:null,trg:J(),event:null
        };
    var timedIn=timed(null,_params.delayin),
        timedOut=timed(null,_params.delayout),
        _delayout=new JDelayout(null,null,_params.delayout,false),
        _in=function(_op){
            po.open(_poops);
            po.monitor.bind({
                'open':function(){
                    po.trg.addClass('up');
                },'close':function(){
                    _poup=false;
                    po.trg.removeClass('up');
                },'hide':function(){
                    _S.button.before(_S.elp.find(_params.trg));
                    _S.elp.detach();
                }
            });
        },
        _out=function(event){
            timedIn.clear();
            if(po.opened){
                if(isout(po['box'][0],event)){
                    po.close(true);
                    _delayout.stop();
                }
            }else{
                _delayout.stop();
            }
        };
    _S.button.on('mouseover',function(event){
        _poup=true;
        if(po.opened&&po.trg[0]===this){
            return '';
        }
        if(po.opened&&po.trg[0]!==this){
            _delayout.stop();
            po.close(true);
        }

        _poops.trg=this;
        _poops.get=_S.elp.append(J(_S.e).find(_params.trg+'.off'));
        _poops.event=event;

        if(timedIn.id===0){
            timedIn.run(function(){_in(_poops);});
            _delayout.start(this,_out);
        }
        return '';
    }).appendTo(_S.e);

    var md=Ui.__direction[_S.dir];
    var __size=function(_e){
        if(_S.dir==='y'){
            return _e.offsetHeight+parseInt(J(_e).css('margin-top'))+parseInt(J(_e).css('margin-bottom'));
        }else
            if(_S.dir==='x'){
                return _e.offsetWidth+parseInt(J(_e).css('margin-left'))+parseInt(J(_e).css('margin-right'));
            }
    };
    _S.turn=function(){
        var _onls=J(_S.e).children(_params.trg).not(J(_S.e).children('.off')),
            _ls=_onls.last(),
            _ps=J(_S.lis).index(_ls);
        if(_ps===_S.maxCount-1){
            _ls.addClass('off').prependTo(_S.elp);
        }
        if(_ps>_S.maxCount-1){
            _ls.addClass('off').insertAfter(_S.lis[_ps-1]);
        }
        if(_onls.length-2<0){
            J(_S.e).prepend(J(this).removeClass('off'));
        }else{
            J(_onls[_onls.length-2]).after(J(this).removeClass('off'));
        }
    };
    _S._install=function(){
        if(!_S.e){
            return;
        }
        if((E(_S.e).has('JEllipsis')&&_S.maxSize===(_S.e['offset'+md.Sz]-_S.button[0]['offset'+md.Sz]))||_poup){
            return;
        }
        _S.lis=J(_S.e).children(_params.trg).removeClass('off');
        J(_S.e).addClass('j_ellipsis_'+_S.dir).css('opacity',1);

        if(_S.lis.length<2){
            return;
        }
        if(!E(_S.e).has('JEllipsis')){
            _S.button.appendTo(_S.e);
            _params.turn&&_S.elp.on('click','>'+_params.trg,_S.turn);
        }

        !_S.buttonSize&&(_S.buttonSize=_S.button[0]['offset'+md.Sz]);
        _S.maxSize=_S.e['offset'+md.Sz]-_S.buttonSize;

        _S.lisSizes=[];
        for(var i=0,l=_S.lis.length; i<l; i++){
            _S.lisSizes[i]=__size(_S.lis[i]);
        }
        _S.count()<_S.lis.length?_S.button.css('display',''):_S.button.css('display','none');
        _S.ellipsis();
    };
    _S.count=function(){
        var _s=0;
        for(var i=0,l=_S.lisSizes.length; i<l; i++){
            _s+=_S.lisSizes[i];
            if(_s>=_S.maxSize){
                return _S.maxCount=i;
            }
        }
        return _S.maxCount=_S.lisSizes.length;
    };
    _S.ellipsis=function(et){
         et=et||0,
            c=_S.count()-et;
        c>_S.maxCount&&(c=_S.maxCount);
        for(var i=c,l=_S.lis.length; i<l; i++){
            J(_S.lis[i]).addClass('off');
        }
    };
    Ui.resize(_S._install);
    _S._install();
    return _S;
}

function JFilter(input,area,t,item){
    var _S=this;
    _S.ipt=J(input);
    _S.ta=J(area);
    _S.fa=_S.ipt.parents('.j_filter:eq(0)');
    _S.ts=function(){ return _S.ta.find(t);};
    _S.monitor=new JMatrix({
        'filter':new JMatrix(),'done':new JMatrix(),'focus':new JMatrix(),'type':new JMatrix(),'blur':new JMatrix()
    });

    _S.clean=function(){ _S.ta.find('.of').removeClass('of');};
    var _valf='input',
        _ts=_S.ts(),
        _reg=new RegExp();
    if(_S.ipt[0]&&_S.ipt[0].tagName.toLowerCase()!=='input'){
        _valf='text';
        _S.ipt.attr('contentEditable','true');
    }
    var _val=function(v){
        if(_typeof(v)==='undefined'){
            return (_valf==='input'?_S.ipt.val():trim(_S.ipt.text()))||'';
        }else{
            _valf==='input'?_S.ipt.val(v):_S.ipt.html(v);
        }
    };
    var _f=function(event,val){
        if(!val){
            _S.clean();
            return;
        }
        var _rgx=stringToRegExp(stringToRegString(val),'gi');
        _ts.each(function(k,v){
            var r=J(v).text().search(_rgx)>=0;
            if(r){
                if(item){
                    J(v).parent(item).removeClass('of');
                }else{
                    J(v).removeClass('of');
                }
                _S.monitor.run('filter',[v,true]);
            }else{
                if(item){
                    J(v).parent(item).addClass('of');
                }else{
                    J(v).addClass('of');
                }
                _S.monitor.run('filter',[v,false]);
            }
        });
        _S.monitor.run('done',[val]);
    };
    _S.monitor.bind('done',function(){_S.fa.addClass('on');});
    _S.monitor.bind('blur',function(){_S.fa.removeClass('on');});
    _S.ipt.on({
        'focus':function(){
            _ts=_S.ts();
            _S.monitor.run('focus');
        },
        'blur':function(){!_val()&&_S.monitor.run('blur');},
        'keydown':function(event){
            if(event.keyCode===13){
                event.preventDefault();
                return false;
            }
        },
        'keyup':function(event){
            if(event.keyCode===13){
                var v=_val();
                if(v.length>0){
                    _S.monitor.run('type',[v]);
                    _f(event,v);
                }else{
                    _S.clean();
                    _S.monitor.run('blur');
                }
                
            }
        }
    });
}

function JTree(e,ops){
    var J=jQuery,
        _S=this;
    this.e=e;
    if(!this.e){
        return null;
    }

    E(this.e).set('JTree',this);

    this.id=this.e.id;
    this.storage=Ui.storage('Ui-tree');
    this.ons=[];
    this.params=J.extend({
        trg:'.e_tree',dl:'.dl,dl',dd:'.li,dd',dt:'.t',one:true,fx:true,filter:true
    },ops);
    this.params=E(this.e).options(this.params);
    var __on='on',
        __isSelecter=function(s){return isNaN(s)&&(s.charAt(0)==='.'||s.charAt(0)==='#');},
        __isD=function(_e,_t){
            _t=(_t=='dd'?_S.params.dd:_S.params.dl).toLowerCase();
            _t=_t.split(',');
            for(var i=0,l=_t.length; i<l; i++){
                if(_t[i].charAt(0)==='.'){
                    if(J(_e).hasClass(_t[i].substring(1))){
                        return true;
                    }
                }else{
                    if(J(_e)[0].tagName.toLowerCase()==_t[i]){
                        return true;
                    }
                }
            }
            return false;
        },
        __treeNodes=function(a){
            var _ar=[a],
                _p=a.parentNode,
                _c='';
            while(_p!=_S.e){
                if(__isD(_p,'dd')){
                    _ar.push(_p);
                }
                _p=_p.parentNode;
            }
            _ar.indexOf=function(e,i){
                var l;
                if(this){
                    l=this.length;
                    i=i?i<0?Math.max(0,l+i):i:0;
                    for(; i<l; i++){
                        if(i in this&&this[i]===e){
                            return i;
                        }
                    }
                }
                return -1;
            };
            return _ar;
        },
        _of=function(_a,_o,_fx){
            if(!_a){
                return;
            }
            if(_fx===false){
                _fx=false;
            }else{
                _fx=_S.params.fx||_fx;
            }
            var _dl;
            if(_o){
                if(J(_a).hasClass(__on)){
                    return;
                }
                 _dl=J(_a).find('> '+_S.params.dl);
                if(!_dl[0]){
                    J(_a).addClass(__on).trigger('on');
                    return;
                }
                if(_fx){
                    _dl.css({height:0,overflow:'hidden'});
                    J(_a).addClass(__on);
                    _dl.animate({height:_dl[0].scrollHeight},400,function(){
                        _dl.css({height:'',overflow:''});
                    });
                }else{
                    J(_a).addClass(__on);
                }
                J(_a).trigger('on');
                return;
            }else{
                if(!J(_a).hasClass(__on)){
                    return;
                }
                  _dl=J(_a).find('> '+_S.params.dl);
                if(!_dl[0]){
                    J(_a).removeClass(__on).trigger('off');
                    return;
                }
                if(_fx){
                    _dl.css({overflow:'hidden'});
                    _dl.animate({height:0},300,function(){
                        _dl.css({display:'',height:'',overflow:''});
                        J(_a).removeClass(__on);
                        _dl.css({display:''});
                        J(_a).find(_S.params.dd).filter('.'+__on).removeClass(__on);
                    });
                }else{
                    J(_a).removeClass(__on);
                    J(_a).find(_S.params.dd).filter('.'+__on).removeClass(__on);
                }
                J(_a).trigger('off');
                return;
            }
        },
        _ofTree=function(_d,_fx){
            if(!_d){return;}
            var _tree=__treeNodes(_d);
            _S.dds.each(function(){
                if(_tree.indexOf(this)<0){
                    J(this).hasClass(__on)&&_of(this,false,_fx);
                }else{
                    !J(this).hasClass(__on)&&_of(this,true,_fx);
                }
            });
        },
        _level=function(_dl){
            var _ar=[_dl],
                _p=_dl.parentNode;
            while(_p!=_S.e){
                if(__isD(_p)){_ar.push(_p);}
                _p=_p.parentNode;
            }
            return _ar.length;
        },
        _depth=function(_a){},
        _select=function(e){
            J(_S.e).find(_S.params.dd).filter(function(){return (J(this).hasClass('selected')&&this!=e);}).removeClass('selected');
            if(J(e).hasClass('selected')){
                J(e).removeClass('selected').trigger('select');
            }else{
                J(e).addClass('selected').trigger('select');
            }
        };
    this.install=function(){
        if(this.installed){
            return;
        }
        _S.dds=J(_S.e).find(_S.params.dd).each(function(){
            J(this).find('> '+_S.params.dl+'>'+_S.params.dd).length>0&&J(this).addClass('parent');
        });
        J(_S.e).find(_S.params.dl).each(function(){
            J(this).addClass('l'+_level(this));
        });
        J(_S.e).find(_S.params.dd).filter('.selected').each(function(){
            _select(this);
            _ofTree(this);
        });
        //J(_S.e).children(_S.params.dd).eq(0).addClass(__on);
        J(_S.e).css('opacity',1).addClass('l0');
        this.installed=true;
    };
    this.install();
    _S.forded=false;
    if(this.params.filter==true){
        this.params.filter=J('<div class="j_filter filter"><b class="input" contenteditable="true"></b></div>').prependTo(this.e);
    }
    var _filter=this.params.filter?J(this.params.filter):J(this.e).find('>.filter');
    if(_filter[0]){
        var __filter=new JFilter(_filter.find('.input'),this.e,_S.params.dt,_S.params.dd);
        __filter.monitor.bind('filter',function(_e,rst){
            if(rst===true){
                J(__treeNodes(J(_e).parent(_S.params.dd)[0])).removeClass('of').each(function(){_of(this,true,false);});
            }
        });
        __filter.monitor.bind('blur',function(){
            if(!__filter.ipt.text()){
                __filter.clean();
            }
        });
        J(_filter).on('click','.ford',function(){
            if(!_S.forded){
                _S.ford();
                _S.forded=true;
                this.setAttribute('ford',1);
            }else{
                _S.unford();
                _S.forded=false;
                this.removeAttribute('ford');
            }
        });
    }
    this.ford=function(){
        J(_S.e).find(_S.params.dd).filter('.parent').each(function(){_of(this,false,false);});
    };
    this.unford=function(){
        J(_S.e).find(_S.params.dd).filter('.parent').each(function(){_of(this,true,false);});
    };
    this.parents=function(e){return __treeNodes(e);};
    J(this.e).on('turnon',_S.params.dd,function(event){
        event.stopPropagation();
        _select(this);
        _ofTree(this,true);
    });
    J(this.e).on('click',_S.params.dd,function(event){
        if(J(this).find(_S.params.dl)[0]==event.target||J(this).find(_S.params.dl).find(event.target).get(0)){
            return;
        }
        if(event.target.tagName.toLowerCase()=='label'||J(event.target).parents('label')[0]){
            return;
        }
        _select(this);
        _of(this,!J(this).hasClass(__on));

        var _d=this,_dl=J(this).parents(_S.params.dl).get(0);
        if(_S.params.one){
            J(_dl).find('>'+_S.params.dd).each(function(){
                if(_d==this || J(_d).find(this)[0]){

                }else{
                    _of(this,0);
                }
            });
        };
        return;
    });
    J(this.e).on('click','.ford',function(){
        if(!_S.forded){
            _S.ford();
            _S.forded=true;
            this.setAttribute('ford',1);
        }else{
            _S.unford();
            _S.forded=false;
            this.removeAttribute('ford');
        }
    });

}

function JText(e){
    if(!e){
        reutrn ;
    }
    var _F=this;
    _F.e=e;
    _F.type=e.getAttribute('type')==='textarea'?'textarea':'input';
    _F.holder=1;
    _clear=function(s){
        s=s.replace(/&nbsp;/gi,' ');
        s=s.replace(/^\s+|\s+&/gi,'');
        return s;
    };

    _F.set=function(){
        _F.value=_clear(_F.e.innerHTML);
        _F.placeholder=e.getAttribute('placeholder')||'';
        _F.value===_F.placeholder&&(_F.value='');
        !_F.value&&_F.placeholder&&(_F.e.innerHTML=_F.placeholder, _F.e.setAttribute('holder',_F.holder));
    };
    _F.set();
    _F.submit=function(){
    };

    var _state='normal',
        _text=J('<div e="text" contentEditable="true">'+(_F.value||_F.placeholder)+'</div>'),
        _edit=J('<i e="edit"></i>'),
        _restore=J('<i e="restore"></i>'),
        _submit=J('<i  e="submit"></i>');
    var __blur=function(){
            if(_state!='edit'){
                return;
            }
            _state='normal';
            _edit.detach();
            _restore.detach();
            _submit.detach();
            _text.detach();
            var _txt=_clear(_text.html());
            (_F.placeholder&&(!_txt||_txt===_F.placeholder))?J(_F.e).html(_F.placeholder).attr('holder',_F.holder):J(_F.e).html(_txt).removeAttr('holder');
            J(_F.e).css('position','').trigger('submit');
        },
        __edit=function(){
            if(_state==='edit'){
                return;
            }
            _state='edit';
            _edit.detach();
            _F.set();

            (!_F.value&&_F.placeholder)?_text.html(''):_text.html(_clear(_F.value));

            _F.e.removeAttribute('holder');
            J(_F.e).css('position','relative').append(_text,_restore,_submit);

            _text.trigger('focus');
        };
    var _delayout=new JDelayout(null,null,750);
    J(e).on({
        'mouseover':function(){
            _state==='normal'&&J(this).append(_edit), J(_F.e).css('position','relative');
            _delayout.stop();
            _delayout.start([this],function(){
                _edit.detach();
                _state!=='edit'&&J(_F.e).css('position','');
            });
        },'submit':function(){
        }
    });
    J(_text).on({
        'foucs':function(){
        },'mousedown':function(event){
            event.stopPropagation();
        },'blur':__blur
    });
    _F.type==='input'&&J(_text).on('keydown',function(event){
        if(event.keyCode==13){
            return false;
        }
    });

    _edit.on('mousedown',function(event){
        event.stopPropagation();
        __edit();
        return false;
    });
    _restore.on('mousedown',function(event){
        event.stopPropagation();
        _text.html(_clear(_F.value)).trigger('blur');
        return false;
    });
    _submit.on('mousedown',function(event){
        event.stopPropagation();
        _text.trigger('blur');
        _text.trigger('focus');
        return false;
    });
}

function JContentEditable(e){
    if(!e){
        reutrn;
    }
    var _ph=e.getAttribute('placeholder')||'';
    _ph.trim();
    var _placehold=function(){
        var _ct=e.innerHTML.trim();
        if((_ct.length>0&&_ct!==_ph)){
            J(e).removeClass('placeholder');
        }else{
            J(e).html(_ph);
            J(e).addClass('placeholder');
        }
    };
    if(_ph){
        _placehold();
        J(e).on({
            'focus':function(){
                var _ct=e.innerHTML.trim();
                if(_ct===_ph){
                    e.innerHTML='';
                    J(e).removeClass('placeholder');
                }
            },'blur':function(){
                _placehold();
            }
        });
    }
}

function JTable(params){
    var _S=this;
    _S.params=J.extend({},{
        trg:'j_table',id:'',rsp:'',thead:'.thead',tbody:'.tbody',tr:'.tr',td:'.td',column:{},data:null,pager:true,pages:0,pageSizes:[30,60,100],pageSize:null,scrollmore:true,checker:true,checkType:'multiple',//multiple,one;
        checkTarget:'',check:{
            width:60,name:'row'
        }
    },params);
    _S.__table=J(_S.params.trg);
    if(!_S.__table[0]){
        return;
    }
    E(_S.__table[0]).set('JTable',this);
    _S.id=_S.params.id||_S.__table[0].id||'_S'+UUID(2);
    _S.__widths=[];
    _S.__fixedWidths={};
    _S.__relativeWidths={}, _S.__relativelast=0;
    _S.__classNames={};
    _S.__scrollbarSize=Ui.scrollbarSize();
    _S.__ths=[];
    _S.monitor=new JMatrix('',{
        'select':new JMatrix(),'ready':new JMatrix(),'pageSize':new JMatrix(),'pageNext':new JMatrix(),'pagePrev':new JMatrix(),'scrollBottom':new JMatrix()
    });
    _S.on=function(n){
        var _S=this;
        if(_S.monitor.has(n)){
            _S.monitor[n].bind.apply(_S.monitor[n],[].slice.call(arguments,1));
        }
    };
    _S.rows={length:0};
    _S.scrolling=false;
    _S.arrange=[];
    _S.pageCurrent=1;
    _S.__pages=_S.params.pages||1;
    _S.pageSize=_S.params.pageSize||_S.params.pageSizes[0];

    var _html='';
    !_S.__table.find('>'+_S.params.thead)[0]&&(_html+='<div class="thead"></div>');
    !_S.__table.find('>'+_S.params.tbody)[0]&&(_html+='<div class="tbody"></div>');

    if(!_S.__table.find('>.tfoot')[0]){
        _html+='<div class="tfoot"><s class="checked"><i class="i i-more_vert b_tp" rsp="'+_S.params.checkTarget+'"></i>\u5DF2\u52FE\u9009<b>0</b></s><s class="pages"><s class="bs"><b class="b b_prev b_prev_dis b_tip" title="\u4E0A\u4E00\u9875"></b><b class="pagecurrent b_tip" title="\u5F53\u524D\u9875">'+_S.pageCurrent+(_S.__pages?'/'+_S.__pages:'')+'</b><b class="b b_next b_tip" title="\u4E0B\u4E00\u9875"></b></s><b class="pagesize b_tip" title="\u6BCF\u9875\u663E\u793A\u6570\u91CF">';
        for(var i=0,l=_S.params.pageSizes.length; i<l; i++){
            _html+='<b class="b '+(_S.pageSize===_S.params.pageSizes[i]?'b_on':'')+'">'+_S.params.pageSizes[i]+'</b>';
        }
        _html+='</b></s></div>';
    }
    _S.__table.append(_html);

    if(!_S.params.checker&&_S.__table.find('>.tfoot')[0]){
        _S.__table.find('>.tfoot .checked').remove();
    }
    if(!_S.params.pager&&_S.__table.find('>.tfoot')[0]){
        _S.__table.find('>.tfoot .pages').remove();
    }

    _S.__thead=_S.__table.find('>'+_S.params.thead);
    _S.__tbody=_S.__table.find('>'+_S.params.tbody);
    _S.__tfoot=_S.__table.find('>.tfoot');
    _S.__checked=_S.__tfoot.find('.checked>b');

    if(!_S.__tbody.parent().hasClass('ttable')){
        _S.__ttable=$('<div class="ttable"></div>');
        _S.__tbody.wrap(_S.__ttable);
    }
    _S.__ttable=_S.__tbody.parent();

    if(!_S.__ttable.parent().hasClass('tcontainer')){
        _S.__tcontainer=$('<div class="tcontainer j_scroller"></div>');
        _S.__ttable.wrap(_S.__tcontainer);
    }
    _S.__tcontainer=_S.__ttable.parent();
    _S.__theadRow=function(){return _S['theadrow']=_S['theadrow']||_S.__thead.find('>'+_S.params.tr);};

    _S.check=function(_e,_c){
        if(_S.params.checkType==='one'){
            _S.__tbody.find('>.tr').removeClass('tr_checked');
            _S.__tbody.find('>.tr>.td_check input[type="checkbox"]').each(function(){this.checked=false;});
        }
        if(_c!==undefined){
            if(_c===true){
                _e.checked=true;
                J(_e).parents(_S.params.tr).addClass('tr_checked');
            }else{
                _e.checked=false;
                J(_e).parents(_S.params.tr).removeClass('tr_checked');
            }
        }else{
            if(_e.checked===true){
                _e.checked=true;
                J(_e).parents(_S.params.tr).addClass('tr_checked');
            }else{
                _e.checked=false;
                J(_e).parents(_S.params.tr).removeClass('tr_checked');
            }
        }
        var _checked=_S.__tbody.find('>.tr>.td_check input:checked');
        _S.__checked.html(_checked.length);
        _S.monitor.run('select',[_S.selected()]);
    };

    var __checker=function(_c,_h){
            _c=J.extend({},_S.params.check,_c);
            var _as=new JAttr(_c['attributes']);
            _as.set('name',(_h)?'checkall':(_c.name||'checker'));
            _as.set('value',_c['value']);
            _as.set('checked',(_c['checked']===true?' checked="true"':''));
            delete _c.attributes;
            _c.classname='td_check';
            _c.width=40;
            _c.innerHTML='<label class="e e_chb"><input type="checkbox"'+_as.tostring()+'/><b></b></label>';
            return _c;
        },
        __getTDS=function(_row){return J(_row).find('>'+_S.params.td);},
        __sum=function(o){
            var _c=0;
            map(o,function(k,v){_c+=v; });
            return _c;
        },
        __max=function(a,b){ return a>b?a:b;},
        __getWidths=function(cols,inc){
            var _widths=J.extend({},_S.__fixedWidths),
                _size=(_S.__tcontainer[0].offsetWidth>_S.__tcontainer[0].scrollWidth?_S.__tcontainer[0].offsetWidth-_S.__scrollbarSize:_S.__tcontainer[0].offsetWidth);

            cols.each(function(i){
                if(!_S.__fixedWidths[i]){
                    _widths[i]=_S.__relativeWidths[i]=this.offsetWidth;
                    _S.__relativelast=i;
                }
            });

            //_widths[_S.__relativelast] -=2;
            return _widths;
        },
        __colwidth=function(e,w){e.style.width=e.style.minWidth=w+'px';},
        __formatRow=function(row,widths){__getTDS(row).each(function(i){__colwidth(this,widths[i]);});};

    _S.col=function(_col,_c,thead){
        _c=(_c===undefined)?0:_c;
        var _w=_S.__widths[_c];
        if(_typeof(_col)==='string'||_typeof(_col)==='number'||_typeof(_col)==='undefined'){
            return ('<div class="'+('td c'+_c+(_S.__classNames[_c]?' '+_S.__classNames[_c]:''))+'">'+_col+'</div>');
        }
        if(_typeof(_col)==='object'){
            thead&&_col['classname']&&(_S.__classNames[_c]=_col['classname']);
            var _as=new JAttr(_col['attributes']);
            _as.addClass('td');
            _as.addClass('c'+_c);
            _as.addClass(_S.__classNames[_c]||_col['classname']||'');
            if(thead){
                if(_col['width']){
                    _S.__fixedWidths[_c]=_w=parseInt(_col['width']);
                    _as.style('width',_S.__fixedWidths[_c]+'px');
                    _as.style('min-width',_S.__fixedWidths[_c]+'px');
                }
            }
            return ('<div '+_as.tostring()+'>'+(_col['innerHTML']||'')+'</div>');
        }
        if(_typeof(_col)==='array'){
            var _cols=[],
                c=_c;
            for(var i=0,l=_col.length; i<l; i++){
                _cols.push(_S.col(_col[i],c,thead));
                c+=1;
            }
            return _cols.join('\n');
        }
    };
    _S.row=function(_rows,thead){
        var _rowsString='';
        switch(_typeof(_rows)){
        case 'string':
            _rowsString=_rows;
            break;
        case 'array':
            map(_rows,function(k,v){
                var _cols='',
                    _row=v;
                suit(_typeof(v),{
                    'object':function(){_rowsString+=_S.row(_row,thead);},'array':function(){
                        if(_S.params.checker){
                            _cols+=_S.col(__checker(v['check']),0,thead)+_S.col(v,1,thead);
                        }else{
                            _cols+=_S.col(v,0,thead);
                        }
                        _rowsString+='<div class="tr">'+_cols+'</div>';
                    }
                });
            });
            break;
        case 'object':
            var _cols='';
            var _as=new JAttr(_rows['attributes']);
            _as.set('class','tr'+(_rows['classname']?_rows.classname:''));
            if(_S.params.checker){
                _cols+=_S.col(__checker(_rows['check']),0,thead)+_S.col(_rows.cols,1,thead);
            }else{
                _cols+=_S.col(_rows.cols,0,thead);
            }
            _rowsString+='<div '+_as.tostring()+'>'+_cols+'</div>';
            break;
        }
        return _rowsString;
    };
    _S.add=function(_data,pos){
        pos=pos||'after';
        switch(pos){
        case 'before':
            _S.__tcontainer.scrollTop(0);
            _S.__tbody.prepend(_S.row(_data));
            break;
        default:
            _S.__tcontainer.scrollTop(1000000000);
            _S.__tbody.append(_S.row(_data));
            break;
        }
        _S.fix();
    };
    _S.remove=function(c,pos){
        if(arguments.length===0){
            _S.__tbody.find('>.tr_checked').remove();
            return;
        }
    };
    _S.empty=function(){_S.__tbody.empty();};
    _S.selected=function(){
        var _checkeds=_S.__tbody.find('.tr>.td_check input:checked'),
            _checkedvalues=[];
        _checkeds.each(function(){_checkedvalues.push(J(this).val());});
        return _checkedvalues;
    };
    _S.format=function(){
        _S.__ths=_S.__ths||_S.__thead.find('>'+_S.params.tr+'>'+_S.params.td);
        _S.__referThs=_S.__referThs||_S.__ttable.find('>.thead>'+_S.params.tr+'>'+_S.params.td);
        if(_S.__table[0].offsetWidth==0||_S.__ths.length==0){
            return;
        }
        if(_S.__ths.length>0&&_S.__referThs.length>0){
            var _ws=(__getWidths(_S.__referThs));
            _S.__ths.each(function(i){
                if(!_S.__fixedWidths[i]){
                    __colwidth(this,_ws[i]);
                    __colwidth(_S.__referThs[i],_ws[i]);
                }
            });
        }
        _S.__table.fadeTo(400,1);
        _S.monitor.run('ready',[_S]);
    };
    _S.init=function(){
        _S.__thead.on('click','.td_check',function(event){
            var _checkall=_S.__thead.find('>.tr>.td_check input[type="checkbox"]').get(0),
                _checkallLabel=J(_checkall).parent('label').get(0),
                _checks=_S.__tbody.find('>.tr>.td_check input[type="checkbox"]');
            if(!(event.target===_checkallLabel||J(_checkallLabel).find(event.target)[0])){
                if(_checkall.checked===true){
                    _checkall.checked=false;
                }else{
                    _checkall.checked=true;
                }
            }
            _checks.each(function(){_S.check(this,_checkall.checked);});
        });
        _S.__tbody.on('click',_S.params.tr,function(event){
            if(!_S.params.checker){
                return;
            }
            if(!J(event.target).hasClass('td')){
                return;
            }
            var _chb=J(this).find('.td_check input[type="checkbox"]')[0],
                _chbLabel=J(_chb).parent('label').get(0);
            if(!(event.target==_chbLabel||J(_chbLabel).find(event.target)[0])){
                if(_chb.checked===true){
                    _chb.checked=false;
                }else{
                    _chb.checked=true;
                }
            }
            _S.check(_chb,_chb.checked);
        });
        _S.__tbody.on('click','a,*[onclick]',function(event){event.stopPropagation();});
        _S.__tcontainer.on('scroll',function(){
            _S.__theadRow().css('left',0-this.scrollLeft);
            if(!_S.scrolling&&this.scrollTop>0){
                _S.scrolling=true;
            }
            if(_S.scrolling&&this.scrollTop===0){
                _S.scrolling=false;
                _S.monitor.run('scrollTop');
            }
            if(_S.scrolling&&(this.scrollTop>=(this.scrollHeight-this.offsetHeight))){
                _S.monitor.run('scrollBottom');
                _S.scrolling=false;
            }
        });
        _S.__table.on('click','>.tfoot>.pages>.pagesize>.b',function(){
            _S.pageSize=parseInt(this.innerHTML);
            J(this).parent().find('.b').removeClass('b_on');
            J(this).addClass('b_on');
            _S.monitor.run('pageSize',[_S.pageSize]);
        });
        _S.__table.on('click','>.tfoot>.pages .b_prev',function(){_S.paging(-1);});
        _S.__table.on('click','>.tfoot>.pages .b_next',function(){_S.paging(1);});
        var _scrollerLeft=0;
        Ui.drag(_S.__thead[0],{
            'doing':function(event,drg){_S.__tcontainer.scrollLeft(_scrollerLeft+drg.distanceX);},'start':function(){_scrollerLeft=_S.__tcontainer.scrollLeft();},'end':function(){}
        });
        Ui.resize(function(){
            _S.__widths=[];
            _S.__table.css('opacity',0);
            _S.format();
        });
    };
    _S.pages=function(a){
        _S.__pages=a||_S.__pages;
        _S.__table.find('>.tfoot .pagecurrent').html(_S.pageCurrent+(_S.__pages?'/'+_S.__pages:''));
    };
    _S.paging=function(_c){
        var _prev=_S.__table.find('>.tfoot .b_prev'),
            _next=_S.__table.find('>.tfoot .b_next');

        if(_c=== -1){
            if(_S.pageCurrent===1){
                _prev.addClass('b_prev_dis');
                return;
            }
            _S.pageCurrent+=_c;
            _S.pages();
            _S.monitor.run('pagePrev',[_S.pageCurrent]);
            _next.removeClass('b_next_dis');
        }else
            if(_c===1){
                if(_S.__tbody.find('>.tr').length<_S.pageSize||_S.pageCurrent>=_S.__pages){
                    _next.addClass('b_next_dis');
                    return;
                }else{
                    _next.removeClass('b_next_dis');
                }
                _S.pageCurrent+=_c;
                _S.pages();
                _S.monitor.run('pageNext',[_S.pageCurrent]);
                _prev.removeClass('b_prev_dis');

            }
    };
    var _view=false;
    _S.fix=function(){
        var trs=_S.__tbody.find('>'+_S.params.tr);
        trs.each(function(i){
            var _chb=J(this).find('>.td_check input[type=checkbox]')[0];
            if(_chb&&_chb.checked===true){
                _S.check(_chb,_chb.checked);
            }
        });
        !_view&&Ui.arouse(function(){return _S.__table[0].offsetWidth>0;},_S.format);

        if(trs.length<_S.pageSize){
            _S.__table.find('>.tfoot .b_next').addClass('b_next_dis');
        }else{
            _S.__table.find('>.tfoot .b_next').removeClass('b_next_dis');
        }
        if(trs.length<1){
            _S.__tcontainer.addClass('empty');
        }else{
            _S.__tcontainer.removeClass('empty');
        }
    };

    _S.bindHead=function(_data){
        if(_data&& !isEmpty(_data)){
            _S.__widths=[];
            _S.__fixedWidths={};
            var _theadString=_S.row([_data],true)||'';
            if(_theadString){
                _S.__thead.empty();
                _S.__thead.html(_theadString);
                _S.__ths=_S.__thead.find('>'+_S.params.tr+'>'+_S.params.td);
                _S.__ttable.find('>.thead').remove();
                _S.__ttable.prepend('<div class="thead">'+_theadString+'</div>');
            }
        }
    };
    _S.bindData=function(_data){
        _data=_data||_S.params.data;
        if(!isEmpty(_data)){
            _S.bindHead(_data['thead']);
            var _tbody=(_data['tbody']&&_S.row(_data.tbody))||'';
            _tbody&&_S.__tbody.html(_tbody);
            _S.fix();
        }
    };
    _S.init();
    _S.bindData();
    return _S;
}

function JTab(_e,_params){
    var _S=this;
    _S.params=J.extend({
        trgarea:'.e_tabs',trg:'.tab',rsparea:'.e_tabContents',rsp:'.tabContent',index:0,lev:2,store:true,ev:'click',nexus:""
    },_params);
    _S.trgarea=_e?J(_e):J(_S.params.trgarea);
    _S.id=_S.trgarea.attr('id');

    if(!_S.trgarea[0]){
        return;
    }

    var _options=E(_S.trgarea[0]).options(_S.params);

    if(_options['rsp']&&_options['rsp']!==_S.params.rsp){
        _options['rsparea']=_options['rsp'];
        delete _options['rsp'];
    }

    _S.params=J.extend({},_S.params,_options);

    _S.params.ev=_S.trgarea.attr('ev')||_S.params.ev;
    _S.rsparea=J(E(_S.trgarea).near(_S.params.rsparea,_S.params.lev));

    if(!_S.rsparea[0]){
        return;
    }

    _S.storage=Ui.storage('Ui-tab');
    _S.index=_S.params.index;
    _S.tb=null;
    _S.tbw=null;

    E(_S.trgarea[0]).set('JTab',this);
    E(_S.rsparea[0]).set('JTab',this);

    var _trgCsn=_S.params.trg.substring(1),
        _rspCsn=_S.params.rsp.substring(1);
    var __trgs=function(a){return (a!==undefined?_S.trgarea.children(_S.params.trg).eq(a):_S.trgarea.children(_S.params.trg));},
        __rsps=function(a){return (a!==undefined?_S.rsparea.children(_S.params.rsp).eq(a):_S.rsparea.children(_S.params.rsp));},
        __geton=function(){return J(_S.trgarea.children(_S.params.trg+'_on')[0]||__trgs(_S.index));};
    _S.on=function(_e,_event){
        if(_event&&_S.index===__trgs().index(_e)){
            return;
        }
        if(typeof (_e)==='number'){
            _e=__trgs(_e);
        }
        _S.index=__trgs().index(_e);
        if(__rsps(_S.index)[0]){
            __trgs().removeClass(_trgCsn+'_on');
            __rsps().removeClass(_rspCsn+'_on');

            J(_e).addClass(_trgCsn+'_on').trigger('tab');
            J(__rsps(_S.index)).css('opacity',0).addClass(_rspCsn+'_on').fadeTo(400,1);

        }
        if(_S.index===0&& !__rsps(_S.index)[0]){
            __trgs().removeClass(_trgCsn+'_on');
            J(_e).addClass(_trgCsn+'_on');
        }
        _S.tb=_e;
        _S.tbw=__rsps(_S.index)[0];

        _S.trgarea.trigger("tabChange",_S,_S.index);

        if(_S.params.store&&_S.id){
            _S.storage.set(_S.id,_S.index);
        }
    };
    _S.init=function(){
        if(_S.id&&_S.params.store&&_S.storage.get(_S.id)){
            _S.on(__trgs(_S.storage.get(_S.id)));
        }else{
            _S.on(__geton());
        }
        if(_S.params.ev==='click'){
            _S.trgarea.on(_S.params.ev,'>'+_S.params.trg,function(event){
                _S.on(this,event);
            });
        }else
            if(_S.params.ev==='hover'){
                _S.trgarea.on('mouseover','>'+_S.params.trg,function(event){
                    _S.on(this,event);
                });
            }
    };
    _S.init();
}

function JEditor(e){
    if(E(e).has('editor')){
        return;
    }
    var _S=this;
    var _editor=tinymce.get(e.id);
    if(_editor){
        _editor.remove();
    }
    E(e).editor=true;
    tinymce.init({
        target:e,theme:'modern',language:'zh_CN',height:300,menubar:false,plugins:['advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker','searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking','save contextmenu directionality emoticons template paste textcolor table'],//content_css: 'css/content.css',
        toolbar:'insertfile undo redo | styleselect  removeformat | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist  table | link  image media  photo | print preview  code ',setup:function(editor){
            editor.on('OpenWindow',function(e){
                J('#'+e.win._id).css('zIndex',Ui.zindex(2));
            });
            editor.addButton('photo',{
                text:'上传图片',icon:'',//editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
                onclick:function(){apl(editor,editorAddImage);}
            });
        },init_instance_callback:function(editor){
            _S.editor=editor;
            editor.on('Change',function(ed){
                $(e).val(editor.getContent());
            });
            delete E(e).editor;
        }
    });

    return this;
}

function JSelect(e){
    var _S=this,
        je=J(e);
    _S.e=e;

    _S.multiple=(e.type==='select-multiple'?true:false);
    _S.editable=false;
    _S.typeing=false;
    _S.on=false;
    _S.ready=false;
    _S.isSelect=true;
    _S.options=e.options||[];
    _S.value=[];

    if(!e || e.tagName.toLowerCase()!=="select"){
        _S.isSelect=false;
        //return;
    }

    E(e).set('JSelect',this);
    if(J(e).hasClass('exc')){
        return;
    }

    
    if(je.hasClass('e_slt')){
        _S.w=je;
    }else{
        _S.w=je.parent('.e_slt')[0]||J('<s class="e_slt"></s>');
        !je.parent('.e_slt')[0]&&je.wrap(_S.w);
        _S.w=je.parent('.e_slt');

    }
    _S.w.addClass((_S.multiple?'e_slm':'e_slo'));

    var _html='';
    if(!_S.w.find('.t')[0]){
        _html+='<s class="slv"><b class="t"></b></s>';
    }
    
    if(!_S.w.find('.os')[0]){
        _html+='<s class="slo"><dl class="os" scroller></dl></s>';
    }
    _html&&je.before(_html);

    _S.oa=_S.w.find('.slo');
    _S.os=_S.w.find('.os');
    _S.v=_S.w.find('.slv');
    _S.b=_S.v.find('.b');
    _S.t=_S.v.find('.t');

    _S.value=J(e).val();
    _S.filter=new JFilter(_S.t,_S.os,'.o');
    _S.filter.monitor.done.bind(function(){_S.ps();});

    _S.build=function(){
        if(!_S.isSelect){
            return ;
        }

        if(_S.ready && e.options && e.options.toString()===_S.options.toString()){
            return;
        }
        
        var ds='';
        if(_S.e.options.length>0){
            for(var i=0,l=_S.e.options.length; i<l; i++){
                ds+='<dd class="o'+(_S.e.selectedIndex===i?' o_sld':'')+(_S.e.options[i].disabled?' o_dis':'')+'" i="'+i+'">'+_S.e.options[i].innerHTML+'</dd>';
            }
            _S.os.html(ds);
        }

        if(_S.e.options.length>20){
            _S.editable=true;
            _S.v.addClass("ipt");
            _S.t.attr('contentEditable','true').addClass('t_input');
        }else{
            _S.editable=false;
            _S.v.removeClass("ipt");
            _S.t.removeAttr('contentEditable').removeClass('t_input');
        }

        _S.options=e.options||[];

        _S.select();
        _S.ready=true;
    };
    _S.select=function(){
        if(!_S.isSelect){
            _S.t.val(_S.value).attr("title",_S.value);
            return ;
        }
        if(_S.e.options.length<1){return;}
        var os=_S.os.find('.o');
        os.removeClass('o_sld');
        if(_S.multiple){
            var v='';
            for(var i=0,l=_S.e.options.length; i<l; i++){
                if(_S.e.options[i].selected===true){
                    v+='<b i="'+i+'">'+_S.e.options[i].innerHTML+'<b class="x">x</b></b>';
                    J(os[i]).addClass('o_sld');
                }
            }
            _S.t.html(v).attr("title",v);
        }else{
            var v=_S.e.options[_S.e.selectedIndex].text;
            _S.t.html(v).attr("title",v);
            J(os[_S.e.selectedIndex]).addClass('o_sld');
        }

        _S.value=J(_S.e).val();
    };

    _S.change=function(trigger){
        _S.build();
        if(_S.typeing){
            return;
        }
        _S.select();
    };

    _S.ps=function(){
        _S.oa[0].style.width=_S.oa[0].offsetWidth+'px';
        if(_S.multiple){
            E(_S.oa[0]).nextTo(_S.b[0]);
        }else{
            E(_S.oa[0]).nextTo(_S.w[0]);
        }
    };
    var fn=function(event){
            if(E(_S.w[0]).isout(event)){
                _S.typeing=false;
                _S.of(true);
            }
        };
    _S.of=function(of){
        if(!of){
            _S.w.addClass('e_slt_on');
            _S.ps();
            J(document).on('mousedown',fn);
            _S.on=true;
        }else{
            if(_S.typeing){return;}
            _S.select();
            _S.w.removeClass('e_slt_on');
            J(document).off('mousedown',fn);
            _S.on=false;
        }
        if(_S.filter){
            _S.filter.clean();
        }
        _S.stop=false;
    };

    _S.build();

    if(_S.isSelect){
        if(_S.multiple){
            _S.t.on('click','.x',function(){
                var i=parseInt(J(this).parent().attr('i'));
                _S.e.options[i].selected=false;
                je.trigger('change');
                return false;
            });
            _S.w.on('click','.o',function(){
                var i=parseInt(J(this).attr('i'));
                if(_S.e.options[i].disabled){
                    return;
                }
                if(_S.e.options[i].selected){
                    _S.e.options[i].selected=false;
                }else{
                    _S.e.options[i].selected=true;
                }
                je.trigger('change');
            });
        }else{
            _S.w.on('click','.o',function(){
                var i=parseInt(J(this).attr('i'));
                if(_S.e.options[i].selected===true||_S.e.options[i].disabled){
                    return;
                }

                _S.e.options[i].selected=true;
                _S.of(true);
                je.trigger('change');
            });
        }
    }else{
        _S.w.on('click','.o',function(){
                if(!J(this).hasClass('o_dis')){
                    _S.value=this.getAttribute('value')||this.innerText;
                    _S.os.find(".o_sld").removeClass("o_sld");
                    J(this).addClass("o_sld");
                }

                _S.of(true);
                je.trigger('change');
        });
    }

    je.on('change',_S.change);

    _S.t.on({
        'click':function(){
            if(_S.editable){
                _S.typeing=true;
                _S.t.html("");
            }
        },'blur':function(){
            _S.typeing=false;
        }
    });

    _S.v.on('click',function(){
        _S.of(_S.w.hasClass('e_slt_on'));
        _S.change();
    });

    return this;
}
function Jdate(_options){
    var options=jQuery.extend({},{
        trg:'.e_date',end:'end'
    },_options);

    var viewer=new JPopuper({
        trg:'',get:'',x:false,close:'hide',id:'',classname:'',masker:true,maskerOpacity:0,blur:true,ev:'click',position:'align',offset:14,width:'auto',height:'auto',minwidth:0,modal:'html',mode:'calendar'
    });

    var calender=new JCalendar(options);
    calender.onSubmit=function(S){
        if(!S.time){
            viewer.close();
        }
    };
    calender.onChange=function(S){
        var _input=S.input.next('.date');
        if(_input[0]&&_input[0].tagName.toLowerCase()==='input'){
            _input.val(S.selectedDateString);
        }
    };

    var duration=J('<div class="j_duration"></div>');

    J(document).on('click',options.trg,function(event){
        calender.init({input:this});
        viewer.open({get:calender.element,trg:this});
        viewer.monitor.bind('hide',function(){
            calender.element.detach();
        });
    });

    var calender1=new JCalendar(options);
    var calender2=new JCalendar(options);

    calender1.element.appendTo(duration);
    calender2.element.appendTo(duration);

    viewer.monitor.bind('hide',function(){
        duration.detach();
    });
    duration.on('click','.b_submit',function(){
        viewer.close();
    });

    J(document).on('click','.e_duration',function(event){
        var inputs=J(this).find('.date');
        if(inputs.length<2){
            return;
        }

        calender1.init({input:inputs[0]});
        calender2.init({input:inputs[1]});

        viewer.open({get:duration,trg:this});
    });
}

!(function(){
    'use strict';
    //=====================================
    Ui('table',{
        domready:true,initialize:function(optns){
            var _S=this;
            _S.params=J.extend({},{
                id:'',trg:'.j_table',tr:'.tr',td:'.td'
            },optns);
            _S.create=function(prms){
                var _params=J.extend({},_S.params,prms),
                    trg=J(_params.trg)[0],
                    _table;
                if(trg&&E(trg).has('JTable')){
                    _table=E(trg).JTable;
                    if(_params.data){
                        _table.bindData(_params.data);
                    }
                    return _table;
                }else{
                    return E(trg).JTable=new JTable(_params);
                }
            };
            return _S;
        }
    });

})();
Ui.ready(function(){
    //Ui.install('.ratio,[ratio]','JRatio');
    setTimeout(function(){J(document.body).animate({'opacity':1},200);},400);

    var Tips=Ui.tips=new JTips({trg:'*[tips]',get:".j_poc",delayin:450,delayout:100,masker:false,offset:14});
    var Po=Ui.po=new JTips({trg:'*[po]',ev:"click",modal:'element',mode:'po',position:"align",win:Ui.topwin,delayin:200,delayout:350,masker:false,maskerOpacity:0,blur:true,stay:true});
    var Popup=Ui.popuper=new JPopupers({trg:'*[pop]',modal:'html',win:window,mask:true,blur:true,position:"default",width:"auto",height:"auto",maxwidth:750,maskerOpacity:0.15,offset:14});
    
    new Jdate({trg:'*[date]',format:'YYYY-MM-DD',language:'cn'});

    Ui.install('*[edit="true"]','JText');
    Ui.install('*[contenteditable="true"]','JContentEditable');
    Ui.install('*[tree]','JTree');
    Ui.install('*[state]','JState');
    Ui.install('*[tabs]','JTab');
    Ui.install('*[select]','JSelect');
    Ui.install('*[scroller]','JScroller');

    window['tinymce']&&Ui.install('textarea.richtext','JEditor');

    Ui.gallery=new JGallery();
    Ui.gallery.show=function(imgs,e){
        Ui.gallery.view(imgs,e);
        var _po_gallery=new JPopuper({modal:'element',get:Ui.gallery.container,scrolling:'no',classname:'po_gallery',width:'auto',height:'auto'});
        _po_gallery.on('open',function(){
            Ui.gallery.container.removeClass('hidden');
        });
        _po_gallery.on('close',function(){
            Ui.gallery.close();
            Ui.gallery.container.addClass('hidden');
        });
        _po_gallery.open();
        Ui.gallery.monitor.bind('change',function(){
            _po_gallery.resize();
        });
    };

    J(document).on('click','*[gallery] img',function(){
        var imgs=J(this).parents('.gallery').eq(0).find('img');
        Ui.gallery.show(imgs,this);
        return false;
    });


    J(document).on({
        'click':function(){},
        'keydown':function(event){
            if(event.keyCode===13){
                var v=this.innerText.replace(/^\s+|\s+$/,''),e='<b class="tag">'+v+'</b>';
                J(this).before(e);
                this.innerHTML="";
                J(this).parent().trigger('add',event,v);
                event.preventDefault();
                return false;
            }
        },
        'keyup':function(event){
            if(event.keyCode!==13){
                var v=this.innerText.replace(/^\s+|\s+$/,'');
                J(this).parent().trigger('input',event,v);
            }
        },
        'blur':function(){},
        'focus':function(){}
    },".e_tags > [contenteditable]");

});
//Ui({fn: 'tab',key: 'Tab',trgarea: '.j_tbs',trg: '.tb',rsparea: '.j_tbws',rsp: '.tbw',ev: 'click',idx: 0,lev: 1});
// Ui({fn:'calendar',trg:'.e_date',format:'YYYY-MM-DD',language:'cn'});
// Ui({fn:'table',key:'table'});

//JL({fn: 'select'});