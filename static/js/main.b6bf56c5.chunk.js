(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{52:function(t,e,s){},59:function(t,e,s){},61:function(t,e,s){},73:function(t,e,s){},74:function(t,e,s){},75:function(t,e,s){},76:function(t,e,s){"use strict";s.r(e);var i=s(2),a=s.n(i),n=s(44),r=s.n(n),c=s(28),o=s(14),h=s(0),l=s(1),u=s(3),d=s(4),j=(s(52),s(5)),p=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(){return Object(h.a)(this,s),e.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(j.jsxs)("nav",{class:"navbar navbar-expand-lg navbar-dark custom-colour",children:[Object(j.jsx)(c.b,{class:"navbar-brand",to:"/",children:"KieranBrett"}),Object(j.jsx)("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(j.jsx)("span",{class:"navbar-toggler-icon"})}),Object(j.jsx)("div",{class:"collapse navbar-collapse",id:"navbarNav",children:Object(j.jsxs)("ul",{class:"navbar-nav",children:[Object(j.jsx)("li",{class:"nav-item",children:Object(j.jsx)(c.b,{class:"nav-link",to:"/",children:"Projects"})}),Object(j.jsx)("li",{class:"nav-item",children:Object(j.jsx)(c.b,{class:"nav-link",to:"/websites",children:"Websites"})})]})})]})}}]),s}(a.a.Component),b=(s(58),s(59),s(23)),x=s.n(b),m=["Hello","Tumeke","Churr Cuzzi","Bring Back $1 Frozen Cokes","Whats the weather like?","Huh","Creationism","Christmas","Dunedin","I like cheese","Whats up?","The Matrix"],f=15;var g=function(t){var e,s,i,a,n,r,c,o,u=["\uff8a","\uff90","\uff8b","\uff73","\uff7c","\uff85","\uff93","\uff7b","\uff9c","\uff82","\uff75","\uff98","\uff71","\uff8e","\uff83","\uff8f","\uff79","\uff92","\uff74","\uff76","\uff77","\uff91","\uff95","\uff97","\uff7e","\uff88","\uff7d","\uff80","\uff87","\uff8d","\uff66","\uff72","\uff78","\uff7a","\uff7f","\uff81","\uff84","\uff89","\uff8c","\uff94","\uff96","\uff99","\uff9a","\uff9d"],d=document.getElementById("matrix-2").offsetWidth,j=500;function p(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}t.setup=function(){a=!1,"true"==localStorage.sweep&&(a=!0),o=null!=localStorage.message?localStorage.message:t.random(m);var h=localStorage.colour;"#000000"==h&&(h=null),null!=h?(n=p(h).r,r=p(h).g,c=p(h).b):(n=40,r=190,c=40),t.createCanvas(d,j),t.frameRate(30),t.textAlign(t.CENTER),t.stroke(n-80,r-80,c-80),t.strokeWeight(5),s=d/(o.length+8),e=new x(o),i=[]},t.draw=function(){t.background(0,70),e.update();for(var s=0;s<i.length;s++)t.push(),i[s].update(),t.pop()};var b=function(){function e(t,s,i){Object(h.a)(this,e),this.letter=t,this.x=s,this.y=i,this.r=255,this.g=255,this.b=255,this.rDes=!0,this.gDes=!0,this.bDes=!0}return Object(l.a)(e,[{key:"update",value:function(){t.fill(this.r,this.g,this.b),t.stroke(255,255,255),t.strokeWeight(1.5),t.text(this.letter,this.x,this.y),this.rDes&&(this.r-=2,this.r<=n+100&&(this.r=n+100,this.rDes=!1)),this.gDes&&(this.g-=2,this.g<=r+100&&(this.g=r+100,this.gDes=!1)),this.bDes&&(this.b-=2,this.b<=c+100&&(this.b=c+100,this.bDes=!1))}}]),e}(),x=function(){function e(i){Object(h.a)(this,e),this.string="";for(var a=0;a<8;a++)this.string+=";";this.string+=i;for(var n=0;n<8;n++)this.string+=";";this.strings=[],t.textSize(s),this.generateLanes()}return Object(l.a)(e,[{key:"generateLanes",value:function(){this.lanes=new g(this.string)}},{key:"update",value:function(){this.lanes.update()}}]),e}(),g=function(){function e(t){Object(h.a)(this,e),this.lanes=[];for(var s=0;s<t.length;s++)this.lanes.push(new O(t.charAt(s),s*(d/t.length)+d/t.length/2))}return Object(l.a)(e,[{key:"update",value:function(){for(var e=0;e<this.lanes.length;e++)this.lanes[e].update();if(t.frameCount%3==0){var s=parseInt(t.random(0,this.lanes.length));this.lanes[s].available&&(this.lanes[s].spawnString(),this.lanes[s].available=!1)}for(var i=0;i<10;i++)t.random(0,100)<70&&this.lanes[parseInt(t.random(0,this.lanes.length))].updateCharacters()}}]),e}(),O=function(){function e(t,s){Object(h.a)(this,e),this.x=s,this.letter=t,this.available=!0,this.strings=[],this.laneTripped=!1}return Object(l.a)(e,[{key:"update",value:function(){for(var e=this.strings.length-1;e>=0;e--)this.strings[e].update(),this.strings[e].getY()>j&&this.strings.splice(e,1);if(0!=this.strings.length)switch(this.letter){case";":case" ":break;default:if(this.strings[0].y>250+s/2&&!this.laneTripped)i.push(new b(this.letter,this.x,250+s/2)),this.strings[0].characters.splice(0,1),this.strings[0].y-=s,this.laneTripped=!0;else if(this.strings[0].y>250+s/2){t.push(),t.noStroke(),t.fill(0,0,0);var n=this.strings[0].x-s/2,r=250-s/3;t.rect(n,r,s,s),this.strings[0].y-s>r&&(this.strings[0].characters.splice(0,1),this.strings[0].y-=s,0==this.strings[0].characters.length&&this.strings.splice(0,1)),t.pop()}}else a||(this.available=!0)}},{key:"spawnString",value:function(){this.strings.push(new v(this.letter,this.x)),t.random(100)<60&&(this.strings[this.strings.length-1].characters[0].bright=!0)}},{key:"updateCharacters",value:function(){for(var t=this.strings.length-1;t>=0;t--)this.strings[t].updateCharacters()}}]),e}(),v=function(){function e(s,i){Object(h.a)(this,e),this.letter=s,this.length=t.random(3,15),this.x=i,this.y=0,this.speed=t.random(8,15),this.enabled=!0,this.characters=[];for(var a=0;a<this.length;a++)this.characters.push(new y(u[parseInt(t.random(0,u.length))])),t.random(100)<50&&(this.characters[this.characters.length-1].flipped=!0)}return Object(l.a)(e,[{key:"update",value:function(){for(var e=0;e<this.characters.length;e++){if(t.push(),t.fill(this.characters[e].r,this.characters[e].g,this.characters[e].b),0==e)this.characters[e].bright&&(t.fill(n+100,r+100,c+100),t.text(this.characters[e].letter,this.x,this.y-e*s));else if(this.characters[e].flipped){t.translate(this.x,this.y-e*s);var i=t.map(0,0,t.width,-1,1);t.scale(i,1),t.text(this.characters[e].letter,0,0)}else t.text(this.characters[e].letter,this.x,this.y-e*s);t.pop()}this.enabled&&(this.y+=this.speed)}},{key:"updateCharacters",value:function(){this.characters[parseInt(t.random(0,this.characters.length-1))].update()}},{key:"getY",value:function(){return this.y-this.characters.length*s}}]),e}(),y=function(){function e(s){Object(h.a)(this,e),this.letter=s,this.bright=!1,this.flipped=!1,this.r=n+t.random(-15,f),this.g=r+t.random(-15,f),this.b=c+t.random(-15,f)}return Object(l.a)(e,[{key:"update",value:function(){this.letter=u[parseInt(t.random(0,u.length))]}}]),e}()},O=s.p+"static/media/image.dd612e50.PNG",v=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i;return Object(h.a)(this,s),(i=e.call(this,t)).state={message:!1,play:!1},localStorage.clear(),i}return Object(l.a)(s,[{key:"matrix2Sketch",value:function(){return this.state.play?this.state.message?Object(j.jsx)("div",{children:Object(j.jsx)(x.a,{sketch:g})}):Object(j.jsx)(x.a,{sketch:g}):Object(j.jsx)("img",{src:O,alt:"Screenshot of simulation",class:"placeholder-image"})}},{key:"matrixForm",value:function(){var t=this;return Object(j.jsxs)("div",{children:[Object(j.jsx)("br",{}),Object(j.jsxs)("label",{children:["Enter your text: ",Object(j.jsx)("input",{id:"matrixText",type:"text"})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{children:["Sweep: ",Object(j.jsx)("input",{id:"matrixSweep",type:"checkbox"})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{children:["Colour: ",Object(j.jsx)("input",{id:"matrixColour",type:"color"})]}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{class:"btn btn-primary",onClick:function(){t.setState({message:!t.state.message,play:!1}),localStorage.message=document.getElementById("matrixText").value,localStorage.sweep=document.getElementById("matrixSweep").checked,localStorage.colour=document.getElementById("matrixColour").value,t.setState({message:!t.state.message,play:!0})},children:"Submit"})]})}},{key:"render",value:function(){var t=this;return Object(j.jsxs)("div",{class:"row project shadow",children:[Object(j.jsxs)("div",{class:"sketch-text col-sm-6",children:[Object(j.jsxs)("h2",{children:["Matrix ",Object(j.jsx)("small",{class:"text-muted",children:"Version 2"})]}),Object(j.jsx)("p",{children:"This is a more traditional matrix simulation, except this time, the user can enter values that are taken into account. Enter your name or any text and watch it fall from the matrix!"}),Object(j.jsx)("p",{children:'Sweep decides if each "Lane" will rain text or if it will only fall once, revealing the text'}),this.matrixForm()]}),Object(j.jsx)("div",{class:"col-sm-6 no-padding",id:"matrix-2",onClick:function(){t.setState({play:!t.state.play,message:t.state.message})},children:this.matrix2Sketch()})]})}}]),s}(a.a.Component);var y,k,w,S,z,C=function(t){var e,s,i,a,n,r,c=["\uff8a","\uff90","\uff8b","\uff70","\uff73","\uff7c","\uff85","\uff93","\uff86","\uff7b","\uff9c","\uff82","\uff75","\uff98","\uff71","\uff8e","\uff83","\uff8f","\uff79","\uff92","\uff74","\uff76","\uff77","\uff91","\uff95","\uff97","\uff7e","\uff88","\uff7d","\uff80","\uff87","\uff8d","\uff66","\uff72","\uff78","\uff7a","\uff7f","\uff81","\uff84","\uff89","\uff8c","\uff94","\uff96","\uff99","\uff9a","\uff9d"],o=[];t.setup=function(){t.createCanvas(document.getElementById("matrix-1").clientWidth,500),t.frameRate(30),e=t.random(256),a=!1,s=t.random(256),n=!1,i=t.random(256),r=!1,t.fill(e,s,i)},t.draw=function(){t.background(10,200);for(var c=o.length-1;c>=0;c--)o[c].update(),o[c].y-o[c].length*o[c].textSize>t.height&&o.splice(c,1);t.frameCount%4===0&&o.push(new u),function(){var c=parseInt(t.random(2));0===c?a?--e<0&&(e=0,a=!1):++e>255&&(e=255,a=!0):1===c?n?--s<0&&(s=0,n=!1):++s>255&&(s=255,n=!0):2===c&&(r?--i<0&&(i=0,r=!1):++i>255&&(i=255,r=!0));t.fill(e,s,i)}()};var u=function(){function e(){Object(h.a)(this,e),this.x=t.random(t.width),this.y=0,this.textSize=t.random(5,50),this.length=t.random(3,15),this.textSpeed=parseInt(this.textSize*t.random(.2,.3)),this.characters=[];for(var s=0;s<this.length;s++)this.characters.push(new d)}return Object(l.a)(e,[{key:"update",value:function(){t.textSize(this.textSize);for(var e=0;e<this.characters.length;e++)t.text(this.characters[e].character,this.x,this.y-e*this.textSize),t.random(0,10)<1.5&&this.characters[e].update();this.y+=this.textSpeed}}]),e}(),d=function(){function e(){Object(h.a)(this,e),this.character=c[parseInt(t.random(0,c.length-1))]}return Object(l.a)(e,[{key:"update",value:function(){this.character=c[parseInt(t.random(0,c.length-1))]}}]),e}()},I=s.p+"static/media/image.19bbf742.PNG",T=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i;return Object(h.a)(this,s),(i=e.call(this,t)).state={play:!1},i}return Object(l.a)(s,[{key:"matrix",value:function(){return this.state.resized&&console.log("I should reset"),this.state.play?Object(j.jsx)(x.a,{sketch:C}):Object(j.jsx)("img",{src:I,alt:"Screenshot of simulation",class:"placeholder-image"})}},{key:"render",value:function(){var t=this;return Object(j.jsxs)("div",{class:"row project shadow",children:[Object(j.jsxs)("div",{class:"sketch-text col-sm-6",children:[Object(j.jsxs)("h2",{children:["Matrix ",Object(j.jsx)("small",{class:"text-muted",children:"Version 1"})]}),Object(j.jsx)("p",{children:"This is a Matrix simulation that is designed to show depth, as opposed to just 1 layer of falling text"}),Object(j.jsx)("p",{children:"It is made by using a String object class, which has a random amount of Character Objects when created. Each character randomly chooses from an array of characters and displays, and will also randomly change to another character"}),Object(j.jsxs)("p",{children:["View the source code ",Object(j.jsx)("a",{href:"https://editor.p5js.org/KieranBrett/sketches/kR11siG1Y",children:"Here"})]}),Object(j.jsx)("button",{class:"btn btn-primary",onClick:function(){t.setState({play:!t.state.play})},children:"Play/Pause"})]}),Object(j.jsx)("div",{class:"col-sm-6 no-padding",id:"matrix-1",children:this.matrix()})]})}}]),s}(a.a.Component),M=s.p+"static/media/pricedown.6bea83af.otf",P=s.p+"static/media/sun.b34e6ead.jpg",B=s.p+"static/media/moon.26419cb1.jpg",D=s.p+"static/media/rock.e04de2eb.jpg",V=s.p+"static/media/venus.a2b5dff8.jpg",E=[],G=[],W=0,L=5,R=5,F=5,A=1,Y=30,N=500,K=.02,X=[],H=[],$=[],J=!1;var _=function(t){function e(){var e,s,i;s=1.5*(e=y.mass*t.random(.003,.006)),e<=10?i=1:e<=20?i=2:e<=30?i=3:e<=50&&(i=0),E.push(new n(t.createVector(t.random(-(N+y.size),N+y.size),t.random(-(N+y.size),N+y.size),t.random(-(N+y.size),N+y.size)),t.createVector(t.random(-3,3),t.random(-3,3),t.random(-3,3)),e,s,i,t.createVector(t.random(360),t.random(360),t.random(360)),t.createVector(t.random(-.02,K),t.random(-.02,K),t.random(-.02,K))))}t.preload=function(){H.push(t.loadFont("https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf")),console.log("First font"),H.push(t.loadFont(M)),console.log("second font"),X.push(t.loadImage(P)),console.log("First the sun"),X.push(t.loadImage(B)),console.log("Moon Loaded"),X.push(t.loadImage(D)),console.log("Rock Done"),X.push(t.loadImage(V)),console.log("Done")},t.setup=function(){t.createCanvas(document.getElementById("gravity").clientWidth,500,t.WEBGL),t.setAttributes("antialias",!0),t.frameRate(60),t.createCamera().move(0,0,400),y=new n(t.createVector(0,0,0),t.createVector(0,0,0),1500,200,0,t.createVector(0,0,0),t.createVector(0,.001,0)),t.textFont(H[0]),t.textSize(16),w=t.height/3*2,k=250;for(var e=0;e<5;e++)$.push(new a(t.createVector(Y,50+w/6*e,0),e));S=new i(10,30,t.height-60,"Gravity"),z=new i(10,30,t.height-110,"Spawn Two"),J=!0},t.draw=function(){t.background(30),t.noStroke(),L=S.active?100:R;for(var i=G.length-1;i>=0;i--)G[i].update()&&G.splice(i,1);y.update();for(i=E.length-1;i>=0;i--)if(E[i].update(),E[i].attract(y.pos,y.mass),E[i].checkCollision(y.pos,y.size)){if(W+=E[i].mass,G.push(new s(E[i].pos,E[i].size,E[i].img)),z.active)for(var a=0;a<2;a++)e();E.splice(i,1)}else E[i].limitDistance(y.pos,y.size)&&E.splice(i,1);if(t.frameCount%100==0)for(var n=0;n<A;n++)E.length<F&&e()},t.mouseClicked=function(){J&&e()};var s=function(){function e(t,s,i){Object(h.a)(this,e),this.pos=t,this.size=s,this.img=i,this.tick=30}return Object(l.a)(e,[{key:"update",value:function(){return this.tick-=.3,this.draw(),this.tick<=0}},{key:"draw",value:function(){for(var e=0;e<this.tick;e++)t.push(),t.fill(247,156,29,90),t.translate(this.pos.x+t.random(-this.size,this.size),this.pos.y+t.random(-this.size,this.size),this.pos.z+t.random(-this.size,this.size)),t.sphere(8),t.pop()}}]),e}(),i=function(){function e(s,i,a,n){Object(h.a)(this,e),this.length=s,this.active=!1,this.pos=t.createVector(i,a,0),this.genTimes(),this.text=n}return Object(l.a)(e,[{key:"genTimes",value:function(){this.startSecond=60*t.minute()+t.second()}},{key:"time",value:function(){return 60*t.minute()+t.second()}},{key:"timeRunning",value:function(){return this.time()-this.startSecond}},{key:"checkActive",value:function(){this.timeRunning()>=this.length&&(this.active=!1)}},{key:"update",value:function(){t.fill(255,255,255),t.text(this.text,this.pos.x,this.pos.y-3),this.active?(t.text(this.length-this.timeRunning(),this.pos.x+15-t.textWidth(this.length-this.timeRunning())/2,this.pos.y+t.textSize()+4),this.checkActive()):(t.fill(20,255,20),t.rect(this.pos.x+5,this.pos.y+5,20,20)),t.fill(255,255,255,70),t.rect(this.pos.x,this.pos.y,30,30)}},{key:"checkClick",value:function(){if(t.mouseX>=this.pos.x&&t.mouseX<=this.pos.x+30&&t.mouseY>=this.pos.y&&t.mouseY<=this.pos.y+30&&0==this.active)return this.genTimes(),this.active=!0,!0}}]),e}(),a=function(){function e(t,s){Object(h.a)(this,e),this.pos=t,this.type=s,this.level=1}return Object(l.a)(e,[{key:"show",value:function(){var e;switch(t.textFont(H[0]),t.fill(255,255,255),t.textSize(12),this.type){case 0:e="Force of Gravity",t.text("G = "+L,this.pos.x,this.pos.y+30);break;case 1:e="Mass",t.text(y.mass,this.pos.x,this.pos.y+30);break;case 2:e="Size",t.text(y.size,this.pos.x,this.pos.y+30);break;case 3:e="Max Planets",t.text(F+"       Current Planets: "+E.length,this.pos.x,this.pos.y+30);break;case 4:e="Spawn Rate",t.text(A,this.pos.x,this.pos.y+30)}t.textSize(16),t.text(e,this.pos.x,this.pos.y+t.textSize()),t.fill(0,0,0,80),t.rect(k-60,this.pos.y,30,30),t.textSize(18),t.textFont(H[1]),t.fill(80,255,80),t.text("$"+this.calculateCost(),k-65-t.textWidth("$"+this.calculateCost()),this.pos.y+t.textSize())}},{key:"checkClick",value:function(){if(t.mouseX>Y+k-60&&t.mouseX<Y+k-Y&&t.mouseY>this.pos.y+30&&t.mouseY<this.pos.y+30+30)return this.upgrade(),!0}},{key:"calculateCost",value:function(){switch(this.type){case 0:return Math.pow(6,this.level);case 1:return Math.pow(5,this.level);case 2:return Math.pow(4,this.level);case 3:return Math.pow(2,this.level);case 4:return Math.pow(4,this.level)}}},{key:"upgrade",value:function(){if(W>=this.calculateCost()){switch(this.type){case 0:R+=1;break;case 1:y.mass+=500;break;case 2:y.size+=100,undefined.setDistanceMin(y.size+200);break;case 3:F+=1;break;case 4:A+=1}W-=this.calculateCost(),this.level+=1}}}]),e}(),n=function(){function e(t,s,i,a,n,r,c){Object(h.a)(this,e),this.pos=t,this.vel=s,this.mass=i,this.size=a,this.img=n,this.rot=r,this.rotVel=c}return Object(l.a)(e,[{key:"update",value:function(){this.move(),this.draw()}},{key:"move",value:function(){this.pos.x+=this.vel.x,this.pos.y+=this.vel.y,this.pos.z+=this.vel.z,this.rot.x+=this.rotVel.x,this.rot.y+=this.rotVel.y,this.rot.z+=this.rotVel.z}},{key:"draw",value:function(){t.push(),t.texture(X[this.img]),t.translate(this.pos.x,this.pos.y,this.pos.z),t.rotateX(this.rot.x),t.rotateY(this.rot.y),t.rotateZ(this.rot.z),t.sphere(this.size),t.pop()}},{key:"attract",value:function(e,s){var i=t.dist(this.pos.x,this.pos.y,this.pos.z,e.x,e.y,e.z),a=this.pos.copy().sub(e);a.setMag(L*this.mass*s/(i*i)),this.vel.x-=a.x/this.mass,this.vel.y-=a.y/this.mass,this.vel.z-=a.z/this.mass}},{key:"checkCollision",value:function(e,s){return t.dist(this.pos.x,this.pos.y,this.pos.z,e.x,e.y,e.z)<s}},{key:"limitDistance",value:function(e,s){return t.dist(this.pos.x,this.pos.y,this.pos.z,e.x,e.y,e.z)>s+2e3}}]),e}()},U=s.p+"static/media/image.a4d8ad0a.PNG",Z=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i;return Object(h.a)(this,s),(i=e.call(this,t)).state={play:!1},i}return Object(l.a)(s,[{key:"gravity",value:function(){return this.state.play?Object(j.jsx)(x.a,{sketch:_}):Object(j.jsx)("img",{src:U,alt:"Screenshot of simulation",class:"placeholder-image"})}},{key:"render",value:function(){var t=this;return Object(j.jsxs)("div",{class:"row project shadow",children:[Object(j.jsxs)("div",{class:"sketch-text col-sm-6",children:[Object(j.jsxs)("h2",{children:["Gravity ",Object(j.jsx)("small",{class:"text-muted",children:"Version Draft"})]}),Object(j.jsx)("p",{children:"This is a gravity simulation where you can watch planets crash and burn into the sun!"}),Object(j.jsx)("p",{children:"Unfortunately I cant use p5.easyCam with the react-p5 wrapper so this is a stripped down version"}),Object(j.jsx)("p",{children:"You can click on the simulation to spawn in another planet."}),Object(j.jsx)("button",{class:"btn btn-primary",onClick:function(){t.setState({play:!t.state.play})},children:"Play/Pause"}),Object(j.jsxs)("p",{children:["Please ",Object(j.jsx)("a",{href:"https://editor.p5js.org/KieranBrett/sketches/M6ezC4T4o",children:"view and play the full game"}),", which includes a store with upgrades, as well as power ups! (and the abillity to freely move the camera)"]}),Object(j.jsxs)("p",{children:["View the source code ",Object(j.jsx)("a",{href:"https://editor.p5js.org/KieranBrett/sketches/M6ezC4T4o",children:"Here"})]})]}),Object(j.jsx)("div",{class:"col-sm-6 no-padding",id:"gravity",children:this.gravity()})]})}}]),s}(a.a.Component),q=s(12),Q=s(11),tt=s(13),et=s(79),st=s(78),it=s(36);s(61);function at(t){var e=Object(it.c)((function(){return Object(q.a)({rotation:[-Math.PI/2,0,0]},t)})),s=Object(Q.a)(e,1)[0];return Object(j.jsxs)("mesh",{ref:s,receiveShadow:!0,children:[Object(j.jsx)("planeBufferGeometry",{attach:"geometry",args:[10,10]}),Object(j.jsx)("meshPhysicalMaterial",{attach:"material",color:"lightblue"})]})}function nt(t){var e=Object(it.b)((function(){return Object(q.a)({mass:1,position:[0,5,0],rotation:[.4,.2,.5]},t)})),s=Object(Q.a)(e,2),a=s[0],n=s[1],r=Object(i.useState)(!1),c=Object(Q.a)(r,2),o=c[0],h=c[1];return Object(tt.b)((function(t,e){})),Object(j.jsxs)("mesh",{receiveShadow:!0,castShadow:!0,ref:a,onPointerEnter:function(){n.velocity.set(0,2,0)},onClick:function(){h(!o)},children:[Object(j.jsx)("boxBufferGeometry",{attach:"geometry"}),Object(j.jsx)("meshLambertMaterial",{attach:"material",color:o?"hotpink":"blue"})]})}function rt(){return Object(j.jsxs)("group",{children:[Object(j.jsx)(nt,{}),Object(j.jsx)(nt,{position:[0,10,-2]}),Object(j.jsx)(nt,{position:[0,20,-2]})]})}var ct=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(){return Object(h.a)(this,s),e.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(j.jsxs)("div",{class:"row project shadow",children:[Object(j.jsxs)("div",{class:"sketch-text col-sm-6",children:[Object(j.jsxs)("h2",{children:["Three ",Object(j.jsx)("small",{class:"text-muted",children:"Three.js Tester"})]}),Object(j.jsx)("br",{}),Object(j.jsx)("p",{children:"This is a small panel currently being used to test Three.js!"})]}),Object(j.jsx)("div",{class:"col-sm-6 no-padding",id:"threeCanvas",children:Object(j.jsxs)(tt.a,{shadows:!0,shadowMap:!0,camera:{position:[-1,2,5],fov:50},children:[Object(j.jsx)(et.a,{}),Object(j.jsx)(st.a,{}),Object(j.jsx)("hemisphereLight",{intensity:.35}),Object(j.jsx)("spotLight",{position:[10,10,10],angle:.3,penumbra:1,intensity:4,castShadow:!0}),Object(j.jsxs)(it.a,{children:[Object(j.jsx)(at,{}),Object(j.jsx)(rt,{})]})]})})]})}}]),s}(a.a.Component),ot=s(42);s(73);function ht(){return Object(j.jsxs)("mesh",{receiveShadow:!0,"position-z":-2.5,children:[Object(j.jsx)("planeBufferGeometry",{attach:"geometry",args:[100,100]}),Object(j.jsx)("meshPhysicalMaterial",{attach:"material",color:"#262626"})]})}function lt(){return Object(j.jsxs)("mesh",{receiveShadow:!0,rotation:[-Math.PI/2,0,0],"position-y":-2.5,children:[Object(j.jsx)("planeBufferGeometry",{attach:"geometry",args:[100,100]}),Object(j.jsx)("meshPhysicalMaterial",{attach:"material",color:"#616161"})]})}function ut(t){var e=Object(i.useState)(!1),s=Object(Q.a)(e,2),a=s[0],n=s[1],r=Object(i.useRef)();return Object(tt.b)((function(t,e){a&&(r.current.rotation.y+=.01)})),Object(j.jsxs)("mesh",{receiveShadow:!0,castShadow:!0,ref:r,onPointerEnter:function(){n(!0)},onPointerLeave:function(){n(!1),r.current.rotation.y=0},children:[Object(j.jsx)("boxBufferGeometry",{attach:"geometry"}),Object(j.jsx)("meshLambertMaterial",{attach:"material",color:t.color}),Object(j.jsx)(dt,{active:a})]})}function dt(t){return t.active?Object(j.jsx)("spotLight",{angle:.2,intensity:2,castShadow:!0}):null}function jt(t){return Object(j.jsx)(ot.a,{centerAnchor:!0,flexGrow:1,margin:1,children:Object(j.jsx)(ut,{color:t.color})})}var pt=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(){return Object(h.a)(this,s),e.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(j.jsxs)("div",{class:"row project shadow",children:[Object(j.jsxs)("div",{class:"sketch-text col-sm-6",children:[Object(j.jsxs)("h2",{children:["Item Showcase ",Object(j.jsx)("small",{class:"text-muted",children:"React-Three-Fiber"})]}),Object(j.jsx)("br",{}),Object(j.jsx)("p",{children:"A small showcase features items"})]}),Object(j.jsx)("div",{class:"col-sm-6 no-padding",id:"showcase",children:Object(j.jsxs)(tt.a,{shadows:!0,shadowMap:!0,children:[Object(j.jsx)("color",{attach:"background",args:"#141414"}),Object(j.jsx)(et.a,{}),Object(j.jsx)("hemisphereLight",{intensity:1}),Object(j.jsx)("spotLight",{position:[0,2,35],angle:.3,penumbra:1,intensity:.8,castShadow:!0}),Object(j.jsxs)(ot.b,{justifyContent:"center",alignItems:"center",flexDirection:"row",position:[-.5,.5,0],children:[Object(j.jsx)(jt,{color:"blue"}),Object(j.jsx)(jt,{color:"yellow"}),Object(j.jsx)(jt,{color:"green"}),Object(j.jsx)(jt,{color:"red"})]}),Object(j.jsx)(lt,{}),Object(j.jsx)(ht,{})]})})]})}}]),s}(a.a.Component),bt=(s(74),function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(t){var i;return Object(h.a)(this,s),(i=e.call(this,t)).state={resized:!1,width:window.innerWidth},window.addEventListener("resize",(function(){window.innerWidth!==i.state.width&&i.setState({resized:!0,width:window.innerWidth})})),i}return Object(l.a)(s,[{key:"intro",value:function(){return Object(j.jsx)("div",{id:"intro",children:Object(j.jsx)("p",{children:"Kieran Brett"})})}},{key:"projects",value:function(){return this.state.resized?(this.setState({resized:!1}),Object(j.jsxs)("section",{children:[Object(j.jsx)(T,{}),Object(j.jsx)(v,{}),Object(j.jsx)(Z,{}),Object(j.jsx)(pt,{}),Object(j.jsx)(ct,{})]})):Object(j.jsxs)("div",{children:[Object(j.jsx)(T,{}),Object(j.jsx)(v,{}),Object(j.jsx)(Z,{}),Object(j.jsx)(pt,{}),Object(j.jsx)(ct,{})]})}},{key:"render",value:function(){return Object(j.jsxs)("div",{id:"home",children:[Object(j.jsx)("img",{src:"/assets/kieran.png",alt:"img of Kieran Brett",id:"background"}),this.intro(),this.projects()]})}}]),s}(a.a.Component)),xt=(s(75),s.p+"static/media/todo.4a76e12e.PNG"),mt=function(t){Object(u.a)(s,t);var e=Object(d.a)(s);function s(){return Object(h.a)(this,s),e.apply(this,arguments)}return Object(l.a)(s,[{key:"todo_list",value:function(){return Object(j.jsxs)("div",{class:"row project shadow",children:[Object(j.jsxs)("div",{class:"sketch-text col-sm-6",children:[Object(j.jsxs)("h2",{children:["To Do List ",Object(j.jsx)("small",{class:"text-muted",children:"React & Firebase"})]}),Object(j.jsx)("p",{children:"This is a simple, easy to use Progressive Web App (PWA) that caches as you use it, so you can revisit the App and use it offline"}),Object(j.jsx)("p",{children:"The user can create as many lists as they would like, and also share a list with someone using the same email they use on the App"}),Object(j.jsxs)("p",{children:["You can find the web app here ",Object(j.jsx)("a",{href:"https://makeatodo.web.app/#/",children:"here"})]})]}),Object(j.jsx)("div",{class:"col-sm-6 no-padding",id:"gravity",children:Object(j.jsx)("img",{src:xt,alt:"Screenshot of ToDo web app",class:"placeholder-image"})})]})}},{key:"render",value:function(){return Object(j.jsx)("div",{children:this.todo_list()})}}]),s}(a.a.Component);r.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsxs)(c.a,{children:[Object(j.jsx)(p,{}),Object(j.jsx)("div",{id:"contentPane",children:Object(j.jsxs)(o.c,{children:[Object(j.jsx)(o.a,{path:"/websites",children:Object(j.jsx)(mt,{})}),Object(j.jsxs)(o.a,{path:"/",children:[" ",Object(j.jsx)(bt,{})]})]})})]})}),document.getElementById("root"))}},[[76,1,2]]]);
//# sourceMappingURL=main.b6bf56c5.chunk.js.map