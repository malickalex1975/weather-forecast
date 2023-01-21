"use strict";(self.webpackChunkweather_forecast=self.webpackChunkweather_forecast||[]).push([[909],{909:(G,f,c)=>{c.r(f),c.d(f,{CameraGameModule:()=>Z});var C=c(6895),T=c(9197),_=c(5861),b=c(1135),t=c(4650),R=c(6074),m=c(4006);function P(F,o){if(1&F){const a=t.EpF();t.TgZ(0,"div",26),t.NdJ("click",function(){t.CHM(a);const n=t.oxw();return t.KtG(n.resetAll())}),t._uU(1,"reset all"),t.qZA()}}const{MyClass:O}=c(3290);class x{constructor(o){this.themeService=o,this.pointTitleColor="#eee",this.averageTitleColor="#eee",this.inputColor="",this.inputDelta=10,this.isBigCanvas=!1,this.dataArray=[],this.isResetHidden=!0,this.averageR=0,this.averageG=0,this.averageB=0,this.averageA=1,this.colR=0,this.colB=0,this.colG=0,this.filterR=0,this.filterG=0,this.filterB=0,this.pointR="-",this.pointG="-",this.pointB="-",this.pointA="-",this.pointColor="rgba(0,0,0,1)",this.isSaveButton=!1,this.dataUrl="",this.x="-",this.y="-",this.isMouseDown=!1,this.canvasWidth=640,this.canvasHeight=480,this.theme$$=this.themeService.getTheme(),this.myclass=new O,this.resetAll=()=>{this.colR=0,this.colB=0,this.colG=0,this.filterR=0,this.filterG=0,this.filterB=0,this.inputDelta=10,this.inputColor="",this.useFilter(this.applyFilter),this.isResetHidden=!0}}ngOnInit(){this.averageColor$$=new b.X("rgba(0,0,0,1)"),document.querySelector(".controls");const a=document.querySelector(".video-options>select"),e=document.querySelector("video"),n=document.querySelector(".canvas");this.toggleFullscreen(n);const i=document.querySelector(".canvas-2");document.addEventListener("mousedown",()=>this.isMouseDown=!0),document.addEventListener("mouseup",()=>this.isMouseDown=!1),i.addEventListener("mouseleave",()=>{this.x="-",this.y="-",this.pointR="-",this.pointG="-",this.pointB="-",this.pointA="-",this.pointColor="rgba(0,0,0,1)",this.pointTitleColor="#eee"}),i.addEventListener("mousemove",d=>{console.log(this.canvasWidth,this.canvasHeight),this.isSaveButton=!0;let g=i.getBoundingClientRect().x,v=i.getBoundingClientRect().y;this.x=Math.floor(d.clientX-g),this.y=Math.floor(d.clientY-v),this.isMouseDown?this.drawCanvas(this.x,this.y):this.isMouseDown||this.definePoint(this.x,this.y)});const s=document.querySelector("img"),l=document.querySelectorAll(".btn");let h=!1;const[p,r,u]=[...l],B={video:!0};function A(){return(A=(0,_.Z)(function*(){const v=(yield navigator.mediaDevices.enumerateDevices()).filter(y=>"videoinput"===y.kind).map(y=>`<option value="${y.deviceId}">${y.label}</option>`);a.innerHTML=v.join("")})).apply(this,arguments)}p.onclick=(0,_.Z)(function*(){if(h)e.play();else if("mediaDevices"in navigator){const d={...B,deviceId:{exact:a.value}};w(d)}});const w=function(){var d=(0,_.Z)(function*(g){const v=yield navigator.mediaDevices.getUserMedia(g);U(v)});return function(v){return d.apply(this,arguments)}}(),U=d=>{e.srcObject=d,h=!0,this.isSaveButton=!1};a.onchange=()=>{const d={...B,deviceId:{exact:a.value}};w(d)},r.onclick=()=>{e.pause()},u.onclick=()=>{n.width=e.videoWidth,n.height=e.videoHeight,this.canvasWidth=e.videoWidth,this.canvasHeight=e.videoHeight,n.getContext("2d").drawImage(e,0,0),s.src=n.toDataURL("image/webp");let g=n.getContext("2d")?.getImageData(0,0,this.canvasWidth,this.canvasHeight);this.createAverageColor(g);let v=new ImageData(this.applyFilter(g.data),this.canvasWidth,this.canvasHeight,{colorSpace:"srgb"});i.width=this.canvasWidth,i.height=this.canvasHeight,i.getContext("2d")?.putImageData(v,0,0)},function S(){A.apply(this,arguments)}()}createAverageColor(o){let a=Array.from(o.data),n=a.length/4,i=[],s=[],l=[],h=[];for(let r=0;r<n;r++)i.push(a[4*r+0]),s.push(a[4*r+1]),l.push(a[4*r+2]),h.push(a[4*r+3]);this.averageR=Math.round(i.reduce((r,u)=>r+u,0)/n),this.averageG=Math.round(s.reduce((r,u)=>r+u,0)/n),this.averageB=Math.round(l.reduce((r,u)=>r+u,0)/n),this.averageA=Number((Math.round(h.reduce((r,u)=>r+u,0)/n)/255).toFixed(2)),this.averageColor$$?.next(`rgba(${this.averageR},${this.averageG},${this.averageB},${this.averageA}`),this.averageTitleColor=(this.averageB+this.averageG+this.averageR)/3>150?"#000":"#eee",0===this.averageA&&(this.pointTitleColor="#f00")}createMonoImage(o){let a=o.length,e=a/4,n=new Uint8ClampedArray(a);for(let i=0;i<e;i++){let p=Math.round((o[4*i+0]+o[4*i+1]+o[4*i+2])/3);n[4*i+0]=p,n[4*i+1]=p,n[4*i+2]=p,n[4*i+3]=o[4*i+3]}return n}createInverseImage(o){let a=o.length,e=a/4,n=new Uint8ClampedArray(a);for(let i=0;i<e;i++)n[4*i+0]=Math.abs(o[4*i+0]-255),n[4*i+1]=Math.abs(o[4*i+1]-255),n[4*i+2]=Math.abs(o[4*i+2]-255),n[4*i+3]=o[4*i+3];return n}applyFilter(o){if(0===this.colB&&0===this.colG&&0===this.colR||255===this.colB&&255===this.colG&&255===this.colR)return o;let a=o.length,e=new Uint8ClampedArray(a);for(let n=0;n<a;n+=4){let i=o[n+0],s=o[n+1],l=o[n+2];i>=this.colR-this.inputDelta&&i<=this.colR+this.inputDelta&&s>=this.colG-this.inputDelta&&s<=this.colG+this.inputDelta&&l>=this.colB-this.inputDelta&&l<=this.colB+this.inputDelta?(e[n+0]=i,e[n+1]=s,e[n+2]=l):(e[n+0]=0,e[n+1]=0,e[n+2]=0),e[n+3]=o[n+3]}return e}applyMultyFilter(o){if(0===this.filterB&&0===this.filterG&&0===this.filterR)return o;let a=o.length,e=new Uint8ClampedArray(a);for(let n=0;n<a;n+=4){let s=o[n+1],l=o[n+2];e[n+0]=o[n+0]+this.filterR,e[n+1]=s+this.filterG,e[n+2]=l+this.filterB,e[n+3]=o[n+3]}return e}drawCanvas(o,a){let n=document.querySelector(".canvas-2").getContext("2d",{willReadFrequently:!0});if(!this.isMouseDown)return void n.beginPath();n.strokeStyle="red",n.lineTo(o,a),n.stroke();let i=n.getImageData(0,0,this.canvasWidth,this.canvasHeight);setTimeout(()=>this.createAverageColor(i),0)}clearCanvas(){this.isSaveButton=!1;let a=document.querySelector(".canvas-2").getContext("2d",{willReadFrequently:!0});a.beginPath(),a.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.drawCanvas(0,0)}getHref(){const o=document.querySelector(".canvas-2"),a=document.querySelector(".save-button");this.dataUrl=o.toDataURL("image/webp"),this.dataUrl&&(this.isSaveButton=!0,a.href=this.dataUrl)}definePoint(o,a){let n=document.querySelector(".canvas-2").getContext("2d",{willReadFrequently:!0});n.beginPath();let i=n.getImageData(o,a,1,1);this.pointR=i.data[0],this.pointG=i.data[1],this.pointB=i.data[2],this.pointA=Math.round(i.data[3]/255),this.pointColor=`rgba(${this.pointR},${this.pointG},${this.pointB},${this.pointA})`,this.pointTitleColor=(this.pointR+this.pointB+this.pointG)/3>150?"#000":"#eee",0===this.pointA&&(this.pointTitleColor="#f00")}toggleFullscreen(o){o.addEventListener("dblclick",()=>{document.fullscreenElement?document.exitFullscreen():o.requestFullscreen().catch(a=>console.log(a))})}convertToRGB(o){this.colR=parseInt(o.slice(1,3),16),this.colG=parseInt(o.slice(3,5),16),this.colB=parseInt(o.slice(5),16)}useFilter(o){const e=document.querySelector(".canvas"),n=document.querySelector(".canvas-2");let s=e.getContext("2d")?.getImageData(0,0,this.canvasWidth,this.canvasHeight),l=new ImageData(o.call(this,s.data),this.canvasWidth,this.canvasHeight,{colorSpace:"srgb"});n.width=this.canvasWidth,n.height=this.canvasHeight;let h=n.getContext("2d");h?.putImageData(l,0,0);let p=h?.getImageData(0,0,this.canvasWidth,this.canvasHeight);this.createAverageColor(p)}checkFilters(){return 0===this.colR&&0===this.colB&&0===this.colG&&0===this.filterR&&0===this.filterG&&0===this.filterB&&10===this.inputDelta&&""===this.inputColor}detectFace(){const o=document.querySelector(".canvas-2");o?this.myclass.checkFD()&&this.myclass.detect(o).then(a=>this.drawRects(a)):console.log("no image to detect")}drawRects(o){const e=document.querySelector(".canvas-2").getContext("2d");for(const n of o){const i=n.boundingBox.x,s=n.boundingBox.y,l=n.boundingBox.width,h=n.boundingBox.height;e.beginPath(),e.strokeStyle="#0ff",e.strokeRect(i,s,l,h)}}static#t=this.\u0275fac=function(a){return new(a||x)(t.Y36(R.f))};static#e=this.\u0275cmp=t.Xpm({type:x,selectors:[["app-camera-game"]],decls:68,vars:39,consts:[[1,"display-cover"],[1,"input-container"],["type","color",1,"input-color",3,"ngModel","ngModelChange"],["type","range","max","255","min","0","value","10","step","5",1,"input-delta",3,"ngModel","ngModelChange"],[1,"filter-container"],[2,"color","red"],["type","range","max","255","min","-255","value","0","step","1",1,"input-delta",3,"ngModel","ngModelChange"],[2,"color","green"],[2,"color","blue"],["class","reset-button",3,"click",4,"ngIf"],["autoplay","","controls","true"],["draggable","true",1,"canvas","d-none",3,"click"],[1,"canvas-2"],[1,"video-options"],["name","","id","",1,"custom-select"],["value",""],["href","#",1,"save-button",3,"download","click"],[1,"average-color"],[1,"point-color"],[1,"point-data"],[1,"average-data"],[1,"controls"],["title","Play",1,"btn","btn-danger","play"],["title","Pause",1,"btn","btn-info","pause","d-none"],["title","ScreenShot",1,"btn","btn-outline-success","screenshot","d-none"],[3,"click"],[1,"reset-button",3,"click"]],template:function(a,e){1&a&&(t.TgZ(0,"div",0),t.ALo(1,"async"),t.TgZ(2,"div",1)(3,"p"),t._uU(4,"filter by color:"),t.qZA(),t.TgZ(5,"input",2),t.NdJ("ngModelChange",function(i){return e.inputColor=i})("ngModelChange",function(){return e.convertToRGB(e.inputColor),e.useFilter(e.applyFilter),e.isResetHidden=!1}),t.qZA(),t.TgZ(6,"p"),t._uU(7),t.qZA(),t.TgZ(8,"input",3),t.NdJ("ngModelChange",function(i){return e.inputDelta=i})("ngModelChange",function(){return e.useFilter(e.applyFilter),e.isResetHidden=!1}),t.qZA()(),t.TgZ(9,"div",4)(10,"p",5),t._uU(11),t.qZA(),t.TgZ(12,"input",6),t.NdJ("ngModelChange",function(i){return e.filterR=i})("ngModelChange",function(){return e.useFilter(e.applyMultyFilter),e.isResetHidden=!1}),t.qZA(),t.TgZ(13,"p",7),t._uU(14),t.qZA(),t.TgZ(15,"input",6),t.NdJ("ngModelChange",function(i){return e.filterG=i})("ngModelChange",function(){return e.useFilter(e.applyMultyFilter),e.isResetHidden=!1}),t.qZA(),t.TgZ(16,"p",8),t._uU(17),t.qZA(),t.TgZ(18,"input",6),t.NdJ("ngModelChange",function(i){return e.filterB=i})("ngModelChange",function(){return e.useFilter(e.applyMultyFilter),e.isResetHidden=!1}),t.qZA()(),t.YNc(19,P,2,0,"div",9),t._UZ(20,"video",10),t.TgZ(21,"canvas",11),t.NdJ("click",function(){return e.isBigCanvas=!e.isBigCanvas}),t.qZA(),t._UZ(22,"canvas",12),t.TgZ(23,"div",13)(24,"select",14)(25,"option",15),t._uU(26,"Select camera"),t.qZA()()(),t.TgZ(27,"a",16),t.NdJ("click",function(){return e.getHref()}),t._uU(28,"Save"),t.qZA(),t.TgZ(29,"div",17),t.ALo(30,"async"),t._uU(31," Average colour "),t.qZA(),t.TgZ(32,"div",18),t._uU(33," Point colour "),t.qZA(),t.TgZ(34,"div",19)(35,"p"),t._uU(36),t.qZA(),t.TgZ(37,"p"),t._uU(38),t.qZA(),t.TgZ(39,"p"),t._uU(40),t.qZA(),t.TgZ(41,"p"),t._uU(42),t.qZA(),t.TgZ(43,"p"),t._uU(44),t.qZA(),t.TgZ(45,"p"),t._uU(46),t.qZA()(),t.TgZ(47,"div",20)(48,"p"),t._uU(49),t.qZA(),t.TgZ(50,"p"),t._uU(51),t.qZA(),t.TgZ(52,"p"),t._uU(53),t.qZA(),t.TgZ(54,"p"),t._uU(55),t.qZA()(),t.TgZ(56,"div",21)(57,"button",22)(58,"p"),t._uU(59,"play"),t.qZA()(),t.TgZ(60,"button",23),t._uU(61,"pause"),t.qZA(),t.TgZ(62,"button",24),t._uU(63," shot "),t.qZA(),t.TgZ(64,"button",25),t.NdJ("click",function(){return e.clearCanvas()}),t._uU(65,"clear"),t.qZA(),t.TgZ(66,"button",25),t.NdJ("click",function(){return e.detectFace()}),t._uU(67,"detect"),t.qZA()()()),2&a&&(t.ekj("dark","dark"===t.lcZ(1,35,e.theme$$)),t.xp6(5),t.Q6J("ngModel",e.inputColor),t.xp6(2),t.hij(" color delta: ",e.inputDelta,""),t.xp6(1),t.Q6J("ngModel",e.inputDelta),t.xp6(3),t.hij(" filter R: ",e.filterR,""),t.xp6(1),t.Q6J("ngModel",e.filterR),t.xp6(2),t.hij(" filter G: ",e.filterG,""),t.xp6(1),t.Q6J("ngModel",e.filterG),t.xp6(2),t.hij(" filter B: ",e.filterB,""),t.xp6(1),t.Q6J("ngModel",e.filterB),t.xp6(1),t.Q6J("ngIf",!e.isResetHidden),t.xp6(2),t.Udp("width",e.isBigCanvas?"40vw":"20vw"),t.xp6(6),t.ekj("visible",e.isSaveButton),t.Q6J("download","my_photo.png"),t.xp6(2),t.Udp("background-color",t.lcZ(30,37,e.averageColor$$))("color",e.averageTitleColor),t.xp6(3),t.Udp("background-color",e.pointColor)("color",e.pointTitleColor),t.xp6(4),t.hij("X= ",e.x,""),t.xp6(2),t.hij("Y= ",e.y,""),t.xp6(2),t.hij("R: ",e.pointR,""),t.xp6(2),t.hij("G: ",e.pointG,""),t.xp6(2),t.hij("B: ",e.pointB,""),t.xp6(2),t.hij("A: ",e.pointA,""),t.xp6(3),t.hij("R: ",e.averageR,""),t.xp6(2),t.hij("G: ",e.averageG,""),t.xp6(2),t.hij("B: ",e.averageB,""),t.xp6(2),t.hij("A: ",e.averageA,""))},dependencies:[C.O5,m.YN,m.Kr,m.Fj,m.eT,m.JJ,m.On,C.Ov],styles:[".input-container[_ngcontent-%COMP%]{position:absolute;top:10px;left:20px;display:flex;gap:50px;min-width:700px}.input-color[_ngcontent-%COMP%]{width:30px;height:30px}.input-delta[_ngcontent-%COMP%]{width:100px}.filter-container[_ngcontent-%COMP%]{position:absolute;left:-140px;top:-20px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;width:200px;height:-moz-fit-content;height:fit-content;gap:5px}.canvas[_ngcontent-%COMP%]{position:fixed;right:0;bottom:50px;width:20vw;padding:0}.canvas-2[_ngcontent-%COMP%]{position:fixed;left:50px;bottom:70px;width:640px;height:480px;padding:0;border:2px solid rgb(236,36,36);background-color:#000}.save-button[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;text-decoration:none;width:50px;height:30px;position:fixed;left:0;bottom:170px;opacity:0;visibility:hidden}.save-button[_ngcontent-%COMP%]:hover{background-color:#eee}.visible[_ngcontent-%COMP%]{opacity:1;visibility:visible}.average-color[_ngcontent-%COMP%]{position:fixed;left:700px;bottom:50px;width:50px;height:50px;border:2px solid red;padding:30px}.point-color[_ngcontent-%COMP%]{position:fixed;left:700px;bottom:180px;width:50px;height:50px;border:2px solid green;padding:30px}.display-cover[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:70%;margin:2% auto;position:relative}video[_ngcontent-%COMP%]{position:relative;left:270px;width:400px;background:rgba(0,0,0,.2)}.video-options[_ngcontent-%COMP%]{position:absolute;left:700px;top:-20px}.controls[_ngcontent-%COMP%]{position:fixed;right:20px;top:120px;display:flex}.controls[_ngcontent-%COMP%]{flex-direction:column}.controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(1){border:2px solid #d2002e}.controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(2){border:2px solid #008496}.controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(3){border:2px solid #00b541}.controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(4){border:2px solid #672052}.controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(5){border:2px solid #14fcbe}.controls[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{width:45px;height:45px;text-align:center;border-radius:100%;margin:6px;background:transparent;cursor:pointer}.controls[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]:hover{background-color:#c1eef4}.average-data[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100px;height:120px;border:1px dashed red;border-radius:5px;position:fixed;left:850px;bottom:50px}.point-data[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100px;height:120px;border:1px dashed green;border-radius:5px;position:fixed;left:850px;bottom:180px}.dark[_ngcontent-%COMP%]{color:#eee}.dark[_ngcontent-%COMP%] > .controls[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{color:#eee}.reset-button[_ngcontent-%COMP%]{position:absolute;top:50px;left:170px;min-width:120px;height:50px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:red;font-size:20px;border-radius:5px}.reset-button[_ngcontent-%COMP%]:hover{background-color:#ccc}.reset-button[_ngcontent-%COMP%]:active{background-color:red;color:#eee}.reset-buttondisabled[_ngcontent-%COMP%]{cursor:auto;opacity:.3;color:#666}"]})}const D=[{path:"",component:x}];class M{static#t=this.\u0275fac=function(a){return new(a||M)};static#e=this.\u0275mod=t.oAB({type:M});static#n=this.\u0275inj=t.cJS({imports:[T.Bz.forChild(D),T.Bz]})}var q=c(4466);class Z{static#t=this.\u0275fac=function(a){return new(a||Z)};static#e=this.\u0275mod=t.oAB({type:Z});static#n=this.\u0275inj=t.cJS({imports:[C.ez,M,q.m]})}},3290:(G,f,c)=>{c.r(f),c.d(f,{MyClass:()=>C});class C{constructor(){}checkFD(){return"FaceDetector"in window?(alert("FaceDetector is supported"),!0):(alert("FaceDetector is not supported"),!1)}detect(_){try{return new FaceDetector({fastMode:!1,maxDetectedFaces:10}).detect(_)}catch(b){console.error("Face Detection failed, boo.",b)}}}}}]);