(this["webpackJsonpbarbell-loader"]=this["webpackJsonpbarbell-loader"]||[]).push([[0],{30:function(e,a,t){},34:function(e,a,t){e.exports=t.p+"static/media/fire.fe489d1d.png"},41:function(e,a,t){e.exports=t(75)},46:function(e,a,t){},47:function(e,a,t){},48:function(e,a,t){},49:function(e,a,t){},50:function(e,a,t){},56:function(e,a,t){},57:function(e,a,t){},58:function(e,a,t){},68:function(e,a,t){},69:function(e,a,t){},71:function(e,a,t){},72:function(e,a,t){},73:function(e,a,t){},74:function(e,a,t){},75:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(12),c=t.n(r),i=t(11),u=t(19),o=t(17),s=t(32),m=t(33),d=t(40),v=t(38),p=t(5),f=t(15),b=(t(46),t(47),function(){return l.a.createElement("div",{className:"barbell-icon"},l.a.createElement("div",{className:"barbell"},l.a.createElement("div",{className:"barbell__shaft"}),l.a.createElement("div",{className:"plate-group--1"},l.a.createElement("div",{className:"plate-group__plate--small"}),l.a.createElement("div",{className:"plate-group__plate--med"}),l.a.createElement("div",{className:"plate-group__plate--large"})),l.a.createElement("div",{className:"plate-group--2"},l.a.createElement("div",{className:"plate-group__plate--small"}),l.a.createElement("div",{className:"plate-group__plate--med"}),l.a.createElement("div",{className:"plate-group__plate--large"}))))}),g=(t(48),function(){return l.a.createElement("div",{className:"plate-icon"},l.a.createElement("div",{className:"plate__outline"}),l.a.createElement("div",{className:"plate__circle"}))}),h=(t(49),function(){return l.a.createElement("div",{className:"info-icon"},l.a.createElement("div",null,"i"))}),E=t(34),y=t.n(E),N=(t(50),function(){return l.a.createElement("img",{className:"fire-icon",src:y.a,alt:"fire"})}),w=function(){return l.a.createElement("nav",{className:"bg-red navbar fixed-bottom d-flex justify-content-between"},l.a.createElement(i.c,{className:"nav-item",activeClassName:"active-class",to:"/home"},l.a.createElement(b,null)),l.a.createElement(i.c,{className:"nav-item",activeClassName:"active-class",to:"/warmup"},l.a.createElement(N,null)),l.a.createElement(i.c,{className:"nav-item",activeClassName:"active-class",to:"/inventory"},l.a.createElement(g,null)),l.a.createElement(i.c,{className:"nav-item",activeClassName:"active-class",to:"/about"},l.a.createElement(h,null)))},k=t(78),q=t(36),_=function(e){var a=e.value,t=e.quantity,n=e.bgColor,r=e.onClick;return l.a.createElement("div",{className:"plate-group text-center"},l.a.createElement("button",{onClick:function(){return r(a)},className:"plate-group__plate"+(t?" bg-"+n:"")},l.a.createElement("span",{className:"center-vertically"},a)),l.a.createElement("div",{className:"plate-group__quantity",style:{opacity:t>0?"100%":"0"}},l.a.createElement("span",{className:"center-vertically unselectable"},t)))},C=(t(29),t(56),function(e){var a=e.unit,t=e.barbell,n=e.availPlates,r=e.onUnitClick,c=e.onPlateGroupClick,i=e.onClear;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"container"},l.a.createElement(k.a,{className:"d-flex justify-content-between"},l.a.createElement("h1",null,"Unit"),l.a.createElement("button",{className:"btn-unit",variant:"danger",onClick:function(e){return r(e)}},a)),l.a.createElement(k.a,{className:"d-flex justify-content-between"},l.a.createElement("h1",null,"Barbell"),l.a.createElement("h1",null,t[a])),l.a.createElement(k.a,{className:"d-flex justify-content-center"},l.a.createElement("h1",null,"Available plates"))),l.a.createElement(k.a,{style:{minWidth:"300px"}},n[a].map((function(e,a){var t=e.value,n=e.color,r=e.quantity,i={onClick:c,value:t,quantity:r,bgColor:n};return l.a.createElement(q.a,{key:a,xs:4},l.a.createElement(_,i))})),l.a.createElement(q.a,{xs:4},l.a.createElement("div",{className:"btn-clear-container text-center"},l.a.createElement("button",{className:"btn-clear",onClick:function(){return i()}},l.a.createElement("span",{className:"center-vertically"},"clear"))))))}),L=function(){return l.a.createElement("h1",null,"Not Found")},x=(t(57),t(58),t(26)),S=t.n(x),P=function(e){var a=e.prevCalcdLoad,t=e.calcdLoad,n=e.unit;return l.a.createElement("div",{className:"load-value center-vertically"},a>-1&&l.a.createElement("div",{key:S.a.generate(),className:"load-value__prev badge badge-success animate-leave"},"".concat(a," ").concat(n)),t>-1&&l.a.createElement("div",{key:S.a.generate(),className:"load-value__cur badge badge-success animate-enter"},"".concat(t," ").concat(n)))},j=function(e){var a=e.unit,t=e.barbellWeight,n=e.calcdPlates,r={unit:a,calcdLoad:e.calcdLoad,prevCalcdLoad:e.prevCalcdLoad};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"load"},l.a.createElement("div",{className:"load__barbell--shaft"},l.a.createElement("div",null,t)),l.a.createElement("div",{className:"load__barbell--sleeve-threshold"}),l.a.createElement("div",{className:"load__plate-group"},l.a.createElement("div",{style:{opacity:"0px"},className:"plate-container"}),n.map((function(e,a){return l.a.createElement("div",{key:a,className:"plate-container",style:{left:"".concat(32*a+32,"px")}},l.a.createElement("div",{className:"plate-container__plate center-vertically bg-".concat(e.color),style:{height:"".concat((t=7*e.value,n=45,r=315,t>=r?r:t<=n?n:t),"px")}}),l.a.createElement("div",{className:"plate-container__plate--text center-vertically"},e.value));var t,n,r})))),l.a.createElement(P,r))},T=t(80),W=t(79),O=t(37),R=t(81),U=(t(30),function(e){return l.a.createElement(T.a,{onSubmit:function(a){return e.onSubmit(a)}},l.a.createElement(W.a,null,l.a.createElement(O.a,{className:"weight-input__form",type:"number",name:"loadInput",placeholder:e.placeholder,"aria-label":"weight",min:"0",step:"0.5",onFocus:function(e){e.currentTarget.select()}}),l.a.createElement(W.a.Append,null,l.a.createElement(W.a.Text,{className:"weight-input__text"},e.unit))),l.a.createElement(R.a,{className:"mx-auto d-block",variant:"dark",type:"submit"},e.btnText))}),F=function(e){var a=e.unit,t=e.barbellWeight,n=e.calcdPlates,r=e.calcdLoad,c=e.prevCalcdLoad,i={unit:a,onSubmit:e.onSubmit},u={unit:a,barbellWeight:t,calcdPlates:n,calcdLoad:r,prevCalcdLoad:c};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"d-flex justify-content-center row"},l.a.createElement("h1",null,"Barbell Loader")),l.a.createElement(U,Object.assign({},i,{placeholder:"Enter Weight",btnText:"Load"})),l.a.createElement(j,u))},M=function(e){return l.a.createElement(T.a,{className:"warmUpSetsForm",onSubmit:function(a){return e.onSubmit(a)}},l.a.createElement(W.a,null,l.a.createElement(O.a,{className:"weight-input__form",type:"number",name:"loadInput",placeholder:"weight","aria-label":"weight",min:"0",step:"0.5",onFocus:function(e){e.currentTarget.select()}}),l.a.createElement(W.a.Append,null,l.a.createElement(W.a.Text,{className:"weight-input__text"},e.unit," \xd7 ")),l.a.createElement(O.a,{className:"weight-input__form",type:"number",name:"numRepsInput",placeholder:"reps","aria-label":"weight",min:"0",step:"1",defaultValue:"5",onFocus:function(e){e.currentTarget.select()}}),l.a.createElement(W.a.Append,null,l.a.createElement(W.a.Text,{className:"weight-input__text"}))),l.a.createElement(R.a,{className:"mx-auto d-block",variant:"dark",type:"submit"},e.btnText))},B=(t(68),function(e){var a=e.unit,t=e.percentage,n=e.weight,r=e.numReps,c=e.isWorkingSet,u=e.btnText,o=c?" working-weight":"";return l.a.createElement("div",{className:"set-container d-flex justify-content-between"+o},l.a.createElement("div",{className:"percent-container"},l.a.createElement("span",{className:"percentage badge badge-warning"},Math.round(100*t),"%")),l.a.createElement("span",{className:"set"},"".concat(n," ").concat(a," \xd7 ").concat(r)),l.a.createElement(i.b,{to:"/home"},l.a.createElement(R.a,{className:"btn btn-dark",onClick:function(){return e.onClick(n)}},u)))}),I=(t(69),function(e){var a=e.workingWeight,t=e.workingNumReps,n=e.warmUpSets,r=e.unit,c=e.onSubmit,i={unit:r,onClick:e.onLoad},u={percentage:1,weight:a,numReps:t,isWorkingSet:!0,btnText:"Start"};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"text-center"},l.a.createElement("a",{href:"https://www.t-nation.com/training/most-intelligent-way-to-warm-up",target:"#blank"},l.a.createElement("h1",null,"Warm Up Sets Calculator"))),l.a.createElement(M,{style:{display:"inline"},unit:r,onSubmit:c,btnText:"Calculate"}),l.a.createElement("div",{className:"setList-container"},l.a.createElement("div",{className:"setList mx-auto"},n.map((function(e,a){var t={percentage:e.percentage,weight:e.weight,numReps:e.numReps};return l.a.createElement(B,Object.assign({key:a,btnText:"Load"},i,t))})),-1!==a&&l.a.createElement(B,Object.assign({},i,u)))))}),A=function(){return l.a.createElement("div",{className:"center-vertically",style:{textAlign:"justify"}},"Barbell Loader was inspired by"," ",l.a.createElement("a",{target:"#blank",href:"https://www.happyliftingco.com/pages/rackmath"},"RackMath")," and built from scratch by Victor Espaillat with the help of React.js and Bootstrap.")},G=t(39),D=function(e,a){return e.reduce((function(e,t){return t.quantity>0?[].concat(Object(G.a)(e),[{value:t.value,color:t.color,quantity:Math.floor(t.quantity*a)}]):e}),[])},J=function(e){var a,t=[],n=Object(u.a)(e);try{for(n.s();!(a=n.n()).done;)for(var l=a.value,r=Math.floor(l.quantity);r>0;)t.push({value:l.value,color:l.color}),r--}catch(c){n.e(c)}finally{n.f()}return t},V=(t(70),t(71),t(72),t(73),function(e,a){var t=e%a,n=e-t;return t>=a/2?n+a:n}),H=function(e,a){var t=Math.round(a*(2-4*(e-.5)));return t>0?t:1},Y=function(e){Object(d.a)(t,e);var a=Object(v.a)(t);function t(){var e;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=a.call.apply(a,[this].concat(l))).state={unit:"lbs",barbell:{lbs:45,kg:20},availPlates:{lbs:[{value:100,quantity:0},{value:65,quantity:0},{value:55,quantity:0},{value:50,quantity:0},{value:45,quantity:8},{value:35,quantity:0},{value:30,quantity:0},{value:25,quantity:8},{value:20,quantity:0},{value:15,quantity:0},{value:12.5,quantity:0},{value:10,quantity:8},{value:7.5,quantity:0},{value:5,quantity:8},{value:2.5,quantity:8},{value:1.25,quantity:0},{value:1,quantity:0},{value:.75,quantity:0},{value:.5,quantity:0},{value:.25,quantity:0}],kg:[{value:50,quantity:0},{value:45,quantity:0},{value:35,quantity:0},{value:30,quantity:0},{value:25,quantity:0},{value:20,quantity:8},{value:15,quantity:0},{value:12.5,quantity:0},{value:10,quantity:8},{value:7.5,quantity:0},{value:5,quantity:8},{value:3,quantity:0},{value:2.5,quantity:8},{value:2,quantity:0},{value:1.5,quantity:0},{value:1.25,quantity:8},{value:1,quantity:0},{value:.75,quantity:0},{value:.5,quantity:0},{value:.25,quantity:0}]},calcdPlates:[],calcdLoad:-1,prevCalcdLoad:-1,percentages:[.5,.6,.7,.8,.9,1.1],workingWeight:-1,workingNumReps:-1,warmUpSets:[]},e.handleUnitClick=function(a){var t=e.state.unit;t="lbs"===t?"kg":"lbs",e.setState({unit:t,calcdPlates:[],calcdLoad:-1,prevCalcdLoad:-1,workingWeight:-1,warmUpSets:[]}),a.currentTarget.classList.add("animate-wiggle"),a.currentTarget.classList.remove("animate-wiggle")},e.handlePlateGroupClick=function(a){var t=e.state.unit,n=Object(o.a)({},e.state.availPlates),l=n[t].findIndex((function(e){return e.value===a}));n[t][l].quantity=(n[t][l].quantity+2)%10,e.setState({availPlates:n})},e.handleLoadSubmit=function(a){a.preventDefault(),a.currentTarget.firstElementChild.firstElementChild.blur(),e.handleLoad(a.currentTarget.loadInput.value)},e.handleLoad=function(a){var t=e.state,n=t.unit,l=t.availPlates,r=e.state.barbell[n],c=D(l[n],.5),i=J(c),u=e.validateLoad(a,r,i),o=u.valid,s=u.errMsg,m=e.state.calcdLoad;if(o){var d=e.calculatePlates(a,r,i),v=d.success,p=d.warn,b=d.calcdPlates,g=d.roundOff;if("justbar"===p?f.b.success("Just the bar!"):"roundoff"===p?f.b.warn("Rounded ".concat(g.up?"up":"down"," ").concat(g.amount," ").concat(n)):"notEnoughRoom"===p&&f.b.error("Not enough room on the bar!"),v){var h=2*b.reduce((function(e,a){return e+a.value}),0)+r;e.setState({calcdPlates:b,calcdLoad:h,prevCalcdLoad:m})}else e.setState({calcdPlates:[],calcdLoad:-1,prevCalcdLoad:m})}else e.setState({calcdPlates:[],calcdLoad:-1,prevCalcdLoad:m}),f.b.error(s)},e.validateLoad=function(e,a,t){return e<a?{valid:!1,errMsg:"That's not even the bar!"}:e>a+2*t.reduce((function(e,a){return e+a.value}),0)?{valid:!1,errMsg:"Your inventory doesn't work with that weight"}:{valid:!0}},e.calculatePlates=function(e,a,t){var n=2*t.reduce((function(e,a){return e<a?e:a})).value,l=V(e,n),r={amount:Math.abs(l-e),up:l>e},c=!0,i="",o=[],s=0===(l-=a);if(s&&(i="justbar"),r.amount>0&&(i="roundoff"),!s){l/=2;var m,d=Object(u.a)(t);try{for(d.s();!(m=d.n()).done;){var v=m.value;if(l>=v.value){if(o.push(v),o.length>8){c=!1,i="notEnoughRoom";break}l-=v.value}}}catch(p){d.e(p)}finally{d.f()}}return{success:c,warn:i,calcdPlates:o,roundOff:r}},e.handleWorkSetSubmit=function(a){a.preventDefault(),a.currentTarget.firstElementChild.querySelectorAll("input").forEach((function(e){e.blur()}));var t=a.currentTarget.loadInput.value,n=a.currentTarget.numRepsInput.value;if(t&&n){var l=[];e.state.percentages.forEach((function(e){l.push({percentage:e,weight:V(t*e,5),numReps:H(e,n)})})),e.setState({workingWeight:t,workingNumReps:n,warmUpSets:l})}else e.setState({workingWeight:-1,workingNumReps:-1,warmUpSets:[]})},e.handlePlateGroupsClear=function(){var a=e.state.unit,t=Object(o.a)({},e.state.availPlates);t[a]=t[a].map((function(e){return{value:e.value,quantity:0,color:e.color}})),e.setState({availPlates:t})},e}return Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this,a={};["lbs","kg"].forEach((function(t){a[t]=e.state.availPlates[t].map((function(e,a){return Object(o.a)(Object(o.a)({},e),{},{color:(t=a,t%6===0?"black":t%5===0?"yellow":t%4===0?"red":t%3===0?"purple":t%2===0?"green":"cyan")});var t}))})),this.setState({availPlates:a})}},{key:"render",value:function(){var e=this.state,a=e.unit,t=e.barbell,n=e.availPlates,r=e.calcdPlates,c=e.calcdLoad,i=this.state,u=i.prevCalcdLoad,o=i.workingWeight,s=i.workingNumReps,m=i.warmUpSets,d={unit:a,barbellWeight:t[a],calcdPlates:r,calcdLoad:c,prevCalcdLoad:u,onSubmit:this.handleLoadSubmit},v={unit:a,barbell:t,availPlates:n,onPlateGroupClick:this.handlePlateGroupClick,onUnitClick:this.handleUnitClick,onClear:this.handlePlateGroupsClear},b={unit:a,workingWeight:o,workingNumReps:s,warmUpSets:m,onSubmit:this.handleWorkSetSubmit,onLoad:this.handleLoad};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"container",style:{paddingBottom:"70px"}},l.a.createElement(f.a,{limit:1,autoClose:2e3,hideProgressBar:!0,pauseOnFocusLoss:!1,draggable:!1,pauseOnHover:!1}),l.a.createElement(p.d,null,l.a.createElement(p.b,{path:"/home",render:function(){return l.a.createElement(F,d)}}),l.a.createElement(p.b,{path:"/inventory",render:function(){return l.a.createElement(C,v)}}),l.a.createElement(p.b,{path:"/warmup",render:function(){return l.a.createElement(I,b)}}),l.a.createElement(p.b,{path:"/about",component:A}),l.a.createElement(p.b,{path:"/not-found",component:L}),l.a.createElement(p.a,{from:"/",exact:!0,to:"/home"}),l.a.createElement(p.a,{to:"/not-found"}))),l.a.createElement(w,null))}}]),t}(n.Component);t(74),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(i.a,null,l.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[41,1,2]]]);
//# sourceMappingURL=main.6b27b0b0.chunk.js.map