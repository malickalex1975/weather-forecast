"use strict";(self.webpackChunkweather_forecast=self.webpackChunkweather_forecast||[]).push([[613],{613:(q,f,i)=>{i.r(f),i.d(f,{PollutionModule:()=>g});var s=i(6895),a=i(9197),t=i(4650),_=i(2229),r=i(4854);class c{constructor(){this.descriptions=["Excellent","Good","Lightly Polluted","Moderately Polluted","Heavily Polluted"],this.colors=["#0f0","#0a0","#ff0","#fc0","#f00"]}getPollutionDescription(e){return this.descriptions[e-1]}getPollutionColor(e){return this.colors[e-1]}getCOPercent(e){let n=e/r.I3.CO;return n>1&&(n=1),n}getNOPercent(e){let n=e/r.I3.NO;return n>1&&(n=1),n}getNO2Percent(e){let n=e/r.I3.NO2;return n>1&&(n=1),n}getO3Percent(e){let n=e/r.I3.O3;return n>1&&(n=1),n}getSO2Percent(e){let n=e/r.I3.SO2;return n>1&&(n=1),n}getPM2_5Percent(e){let n=e/r.I3.PM2_5;return n>1&&(n=1),n}getPM10Percent(e){let n=e/r.I3.PM10;return n>1&&(n=1),n}getHN3Percent(e){let n=e/r.I3.HN3;return n>1&&(n=1),n}static#t=this.\u0275fac=function(n){return new(n||c)};static#n=this.\u0275prov=t.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"})}var x=i(2635),y=i(135),P=i(2945),m=i(9066);function Z(o,e){if(1&o){const n=t.EpF();t.TgZ(0,"div",9),t.NdJ("mouseenter",function(){const U=t.CHM(n).$implicit,k=t.oxw(3);return t.KtG(k.hovered=U)})("mouseleave",function(){t.CHM(n);const v=t.oxw(3);return t.KtG(v.hovered=null)}),t.TgZ(1,"div",10)(2,"p"),t._uU(3),t.qZA(),t.TgZ(4,"p"),t._uU(5),t.qZA()()()}if(2&o){const n=e.$implicit,l=t.oxw(3);t.Akn(l.getElementStyle(null==n||null==n.components?null:n.components[l.index])),t.xp6(1),t.ekj("invisible",l.hovered!==n),t.xp6(2),t.Oqu(l.getTime(null==n?null:n.dt)),t.xp6(2),t.Oqu(null==n||null==n.components?null:n.components[l.index])}}function O(o,e){if(1&o&&(t.TgZ(0,"div",5)(1,"p"),t._uU(2),t.qZA(),t.TgZ(3,"p",6),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.TgZ(6,"div",7),t.YNc(7,Z,6,6,"div",8),t.ALo(8,"chooseDate"),t.qZA()()),2&o){const n=e.$implicit,l=t.oxw(2);t.xp6(1),t.ekj("red-note",l.checkWeekend(n[0])),t.xp6(1),t.HOy(" ",l.defineDay(n[1],n[2])," ",l.getDayOfWeek(n[0]),", ",l.getMonth(n[2]),", ",n[1]," "),t.xp6(2),t.AsE("(",l.index.toUpperCase(),") ",t.lcZ(5,9,"\u03bcg/m3"),""),t.xp6(3),t.Q6J("ngForOf",t.xi3(8,11,null==l.forecast?null:l.forecast.list,n[1]))}}function A(o,e){if(1&o&&(t.TgZ(0,"div",3),t.YNc(1,O,9,14,"div",4),t.qZA()),2&o){const n=e.ngrxLet;t.xp6(1),t.Q6J("ngForOf",n)}}class p{constructor(e){this.dateService=e,this.index="",this.forecastDays$$=this.dateService.emitDateArray(),this.hovered=null,this.getElementStyle=n=>`height: ${n/3}px;`}ngOnInit(){this.dateService.createDateArray(this.forecast.list)}getMonth(e){return this.dateService.getMonthByNumber(e)}getDayOfWeek(e){return this.dateService.getDayOfWeek(e)}checkWeekend(e){return 0===e||6===e}defineDay(e,n){return this.dateService.defineDay(e,n)}getTime(e){return new Date(1e3*e).getHours().toString()+":00"}static#t=this.\u0275fac=function(n){return new(n||p)(t.Y36(y.R))};static#n=this.\u0275cmp=t.Xpm({type:p,selectors:[["app-pollution-forecast-element"]],inputs:{forecast:"forecast",index:"index"},decls:4,vars:1,consts:[[1,"main-container"],[1,"arrows"],["class","forecast-5days-container",4,"ngrxLet"],[1,"forecast-5days-container"],["class","day",4,"ngFor","ngForOf"],[1,"day"],[1,"index"],[1,"diagramm-container"],["class","diagramm-element",3,"style","mouseenter","mouseleave",4,"ngFor","ngForOf"],[1,"diagramm-element",3,"mouseenter","mouseleave"],[1,"more"]],template:function(n,l){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._uU(2,"\u2194"),t.qZA(),t.YNc(3,A,2,1,"div",2),t.qZA()),2&n&&(t.xp6(3),t.Q6J("ngrxLet",l.forecastDays$$))},dependencies:[s.sg,x.eJ,P.e,m.X$],styles:[".main-container[_ngcontent-%COMP%]:hover   .arrows[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_animation 0s;visibility:hidden}.forecast-5days-container[_ngcontent-%COMP%]{width:300px;height:300px;overflow-x:scroll;overflow-y:hidden;display:flex;align-items:center;justify-content:flex-start;gap:20px;padding:10px}.day[_ngcontent-%COMP%]{padding:10px;min-width:280px;height:280px;display:flex;align-items:center;justify-content:space-between;flex-direction:column;border:1px solid #aaa;border-radius:5px;opacity:.8;transition:.2s;gap:50px}.day[_ngcontent-%COMP%]:hover{opacity:1;border:1px solid #555}.red-note[_ngcontent-%COMP%]{color:red}.diagramm-container[_ngcontent-%COMP%]{min-width:280px;display:flex;align-items:flex-end;justify-content:flex-end;gap:2px}.diagramm-element[_ngcontent-%COMP%]{width:8px;background-color:#adff2f;border:1px solid #555}.diagramm-element[_ngcontent-%COMP%]:hover{background-color:#aaa}.index[_ngcontent-%COMP%]{color:#4c6df0;font-size:20px}.invisible[_ngcontent-%COMP%]{visibility:hidden;opacity:0}.more[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:12;position:relative;top:-50px;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;padding:5px;color:#4c6df0;font-size:16px;transition:.2s;background-color:#eee;box-shadow:1px 1px 2px #0486f180}@keyframes _ngcontent-%COMP%_animation{0%{margin-left:0}5%{margin-left:-100px}10%{margin-left:0}15%{margin-left:-100px}20%{margin-left:0}to{margin-left:0}}.arrows[_ngcontent-%COMP%]{font-size:30px;width:50px;height:10px;color:#4c6df0;position:relative;top:50px;left:140px;animation:_ngcontent-%COMP%_animation 5s infinite}"]})}var C=i(7392);function M(o,e){if(1&o&&(t.TgZ(0,"div",8)(1,"p",9),t._uU(2),t.ALo(3,"translate"),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"p",10),t._uU(6),t.ALo(7,"translate"),t.qZA(),t.TgZ(8,"div",11)(9,"p",12),t._uU(10),t.ALo(11,"translate"),t.qZA(),t.TgZ(12,"div",13)(13,"div",14)(14,"div",15),t._uU(15,"\u2302"),t.qZA()()()(),t.TgZ(16,"div",11)(17,"p",12),t._uU(18),t.ALo(19,"translate"),t.qZA(),t.TgZ(20,"div",13)(21,"div",14)(22,"div",15),t._uU(23,"\u2302"),t.qZA()()()(),t.TgZ(24,"div",11)(25,"p",12),t._uU(26," NO"),t.TgZ(27,"sub"),t._uU(28,"2"),t.qZA(),t._uU(29),t.ALo(30,"translate"),t.qZA(),t.TgZ(31,"div",13)(32,"div",14)(33,"div",15),t._uU(34,"\u2302"),t.qZA()()()(),t.TgZ(35,"div",11)(36,"p",12),t._uU(37," O"),t.TgZ(38,"sub"),t._uU(39,"3"),t.qZA(),t._uU(40),t.ALo(41,"translate"),t.qZA(),t.TgZ(42,"div",13)(43,"div",14)(44,"div",15),t._uU(45,"\u2302"),t.qZA()()()(),t.TgZ(46,"div",11)(47,"p",12),t._uU(48," SO"),t.TgZ(49,"sub"),t._uU(50,"2"),t.qZA(),t._uU(51),t.ALo(52,"translate"),t.qZA(),t.TgZ(53,"div",13)(54,"div",14)(55,"div",15),t._uU(56,"\u2302"),t.qZA()()()(),t.TgZ(57,"div",11)(58,"p",12),t._uU(59," PM"),t.TgZ(60,"sub"),t._uU(61,"2.5"),t.qZA(),t._uU(62),t.ALo(63,"translate"),t.qZA(),t.TgZ(64,"div",13)(65,"div",14)(66,"div",15),t._uU(67,"\u2302"),t.qZA()()()(),t.TgZ(68,"div",11)(69,"p",12),t._uU(70," PM"),t.TgZ(71,"sub"),t._uU(72,"10"),t.qZA(),t._uU(73),t.ALo(74,"translate"),t.qZA(),t.TgZ(75,"div",13)(76,"div",14)(77,"div",15),t._uU(78,"\u2302"),t.qZA()()()(),t.TgZ(79,"div",11)(80,"p",12),t._uU(81," NH"),t.TgZ(82,"sub"),t._uU(83,"3"),t.qZA(),t._uU(84),t.ALo(85,"translate"),t.qZA(),t.TgZ(86,"div",13)(87,"div",14)(88,"div",15),t._uU(89,"\u2302"),t.qZA()()()()()),2&o){const n=t.oxw().ngrxLet,l=t.oxw();t.xp6(1),t.Akn(l.getStyle(null==n||null==n.list[0]||null==n.list[0].main?null:n.list[0].main.aqi)),t.xp6(1),t.lnq(" ",t.lcZ(3,38,"Air quality index"),": ",null==n||null==n.list[0]||null==n.list[0].main?null:n.list[0].main.aqi," (",t.lcZ(4,40,l.getDescription(null==n||null==n.list[0]||null==n.list[0].main?null:n.list[0].main.aqi)),") "),t.xp6(4),t.hij(" ",t.lcZ(7,42,"Pollution concentration"),": "),t.xp6(4),t.AsE(" CO: ",null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.co," ",t.lcZ(11,44,"\u03bcg/m3")," "),t.xp6(4),t.Akn(l.getCOStyle(null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.co)),t.xp6(4),t.AsE(" NO: ",null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.no," ",t.lcZ(19,46,"\u03bcg/m3")," "),t.xp6(4),t.Akn(l.getNOStyle(null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.no)),t.xp6(7),t.AsE(": ",null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.no2," ",t.lcZ(30,48,"\u03bcg/m3")," "),t.xp6(4),t.Akn(l.getNO2Style(null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.no2)),t.xp6(7),t.AsE(": ",null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.o3," ",t.lcZ(41,50,"\u03bcg/m3")," "),t.xp6(4),t.Akn(l.getO3Style(null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.o3)),t.xp6(7),t.AsE(": ",null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.so2," ",t.lcZ(52,52,"\u03bcg/m3")," "),t.xp6(4),t.Akn(l.getSO2Style(null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.so2)),t.xp6(7),t.AsE(": ",null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.pm2_5," ",t.lcZ(63,54,"\u03bcg/m3")," "),t.xp6(4),t.Akn(l.getPM2_5Style(null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.pm2_5)),t.xp6(7),t.AsE(": ",null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.pm10," ",t.lcZ(74,56,"\u03bcg/m3")," "),t.xp6(4),t.Akn(l.getPM10Style(null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.pm10)),t.xp6(7),t.AsE(": ",null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.nh3," ",t.lcZ(85,58,"\u03bcg/m3")," "),t.xp6(4),t.Akn(l.getHN3Style(null==n||null==n.list[0]||null==n.list[0].components?null:n.list[0].components.hn3))}}function T(o,e){if(1&o&&(t.TgZ(0,"div",16)(1,"div",17),t._UZ(2,"app-pollution-forecast-element",18),t.qZA(),t.TgZ(3,"div",17),t._UZ(4,"app-pollution-forecast-element",18),t.qZA()()),2&o){const n=e.ngrxLet;t.xp6(2),t.Q6J("forecast",n)("index","co"),t.xp6(2),t.Q6J("forecast",n)("index","pm10")}}const h=function(o,e){return["../../../../forecast",o,e]};function b(o,e){if(1&o&&(t.TgZ(0,"div",1)(1,"div",2),t.ALo(2,"async"),t.TgZ(3,"p"),t._uU(4),t.ALo(5,"translate"),t.qZA()(),t.TgZ(6,"div",3)(7,"mat-icon"),t._uU(8,"arrow_back"),t.qZA(),t.TgZ(9,"p"),t._uU(10),t.qZA()(),t.TgZ(11,"div",4),t.YNc(12,M,90,60,"div",5),t.ALo(13,"async"),t.qZA(),t.YNc(14,T,5,4,"div",6),t.TgZ(15,"div",7)(16,"mat-icon"),t._uU(17,"arrow_back"),t.qZA(),t.TgZ(18,"p"),t._uU(19),t.ALo(20,"translate"),t.qZA()()()),2&o){const n=t.oxw();t.xp6(1),t.ekj("visible",!t.lcZ(2,9,n.pollution$)),t.xp6(3),t.hij("",t.lcZ(5,11,"LOADING"),"..."),t.xp6(2),t.Q6J("routerLink",t.WLB(17,h,n.lat,n.lon)),t.xp6(4),t.hij(" ",n.place," "),t.xp6(2),t.Q6J("ngIf",t.lcZ(13,13,n.pollution$)),t.xp6(2),t.Q6J("ngrxLet",n.pollutionForecast$),t.xp6(1),t.Q6J("routerLink",t.WLB(20,h,n.lat,n.lon)),t.xp6(4),t.Oqu(t.lcZ(20,15,"Back to weather forecast"))}}class u{constructor(e,n,l){this.route=e,this.http=n,this.pollutionService=l,this.place=""}ngOnInit(){this.subscription=this.route.params.subscribe(e=>{this.lat=e.lat,this.lon=e.lon,this.place=e.place}),this.pollution$=this.http.getCurrentPollution(this.lat,this.lon),this.pollutionForecast$=this.http.getPollutionForecast(this.lat,this.lon)}getDescription(e){return this.pollutionService.getPollutionDescription(e)}getStyle(e){return`background-color: ${this.pollutionService.getPollutionColor(e)}`}getCOStyle(e){return`left: ${150*this.pollutionService.getCOPercent(e)-7}px`}getNOStyle(e){return`left: ${150*this.pollutionService.getNOPercent(e)-7}px`}getNO2Style(e){return`left: ${150*this.pollutionService.getNO2Percent(e)-7}px`}getO3Style(e){return`left: ${150*this.pollutionService.getO3Percent(e)-7}px`}getSO2Style(e){return`left: ${150*this.pollutionService.getSO2Percent(e)-7}px`}getPM2_5Style(e){return`left: ${150*this.pollutionService.getPM2_5Percent(e)-7}px`}getPM10Style(e){return`left: ${150*this.pollutionService.getPM10Percent(e)-7}px`}getHN3Style(e){return`left: ${150*this.pollutionService.getHN3Percent(e)-7}px`}ngOnDestroy(){this.subscription?.unsubscribe()}static#t=this.\u0275fac=function(n){return new(n||u)(t.Y36(a.gz),t.Y36(_.O),t.Y36(c))};static#n=this.\u0275cmp=t.Xpm({type:u,selectors:[["app-pollution"]],decls:1,vars:1,consts:[["class","main-container",4,"ngrxLet"],[1,"main-container"],[1,"loading"],[1,"place",3,"routerLink"],[1,"pollution-container"],["class","inner-container",4,"ngIf"],["class","pollution-forecast-container",4,"ngrxLet"],[1,"go-back",3,"routerLink"],[1,"inner-container"],[1,"pollution-index"],[1,"pollution-concentration"],[1,"component"],[1,"component-title"],[1,"wrapper"],[1,"diagram"],[1,"arrow"],[1,"pollution-forecast-container"],[1,"pollution-forecast"],[3,"forecast","index"]],template:function(n,l){1&n&&t.YNc(0,b,21,23,"div",0),2&n&&t.Q6J("ngrxLet",l.pollution$)},dependencies:[s.O5,a.rH,x.eJ,p,C.Hw,s.Ov,m.X$],styles:[".inner-container[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;width:300px;height:-moz-fit-content;height:fit-content;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;padding:10px;margin-top:20px;background-color:#cceeffb3;box-shadow:1px 1px 2px #0486f180;border-radius:5px;color:#000;transition:.5s}.inner-container[_ngcontent-%COMP%]:hover{opacity:1;background-color:#cef;box-shadow:1px 1px 5px #646464}.loading[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:300px;margin-left:auto;margin-right:auto;margin-top:100px;opacity:0;visibility:hidden;transform:.1s}.visible[_ngcontent-%COMP%]{opacity:1;visibility:visible}.go-back[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;margin:20px auto 100px;width:280px;padding:10px;cursor:pointer;opacity:.7;color:#4c6df0}.go-back[_ngcontent-%COMP%]:hover{opacity:1;background-color:#cef;box-shadow:1px 1px 5px #646464;transition:.2s}.go-back[_ngcontent-%COMP%]:active{background-color:#fff}.place[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;margin:20px auto;width:280px;height:50px;padding:10px;font-size:24px;color:#4c6df0;cursor:pointer}.place[_ngcontent-%COMP%]:hover{opacity:1;background-color:#cef;box-shadow:1px 1px 5px #646464;transition:.2s}.place[_ngcontent-%COMP%]:active{background-color:#fff}.pollution-index[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:5px;width:290px;height:30px;color:#555;font-size:18px;border-radius:5px}.pollution-concentration[_ngcontent-%COMP%]{font-size:20px;color:#4c6df0}.component-title[_ngcontent-%COMP%]{width:130px}.diagram[_ngcontent-%COMP%]{height:22px;width:150px;background-image:linear-gradient(to right,green,yellow,red);border-radius:5px}.wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;height:22px;width:150px;border-radius:5px;border:1px solid #aaa}.arrow[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_arrow-animation 1s infinite;position:relative;font-size:24px;top:14px}.component[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;width:300px;padding:10px;gap:10px}.pollution-forecast[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;width:300px;height:300px;display:flex;align-items:center;justify-content:center;gap:20px;padding:10px;margin-top:20px;background-color:#cceeffb3;box-shadow:1px 1px 2px #0486f180;border-radius:5px;color:#000;transition:.5s}.pollution-forecast[_ngcontent-%COMP%]:hover{opacity:1;background-color:#cef;box-shadow:1px 1px 5px #646464}@keyframes _ngcontent-%COMP%_arrow-animation{0%{transform:translateY(0)}50%{transform:translateY(2px)}to{transform:translateY(0)}}"]})}const w=[{path:"",component:u}];class d{static#t=this.\u0275fac=function(n){return new(n||d)};static#n=this.\u0275mod=t.oAB({type:d});static#e=this.\u0275inj=t.cJS({imports:[a.Bz.forChild(w),a.Bz]})}var S=i(619);class g{static#t=this.\u0275fac=function(n){return new(n||g)};static#n=this.\u0275mod=t.oAB({type:g});static#e=this.\u0275inj=t.cJS({imports:[s.ez,d,x._N,m.aw,S.MainModule]})}}}]);