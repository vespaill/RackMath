(this.webpackJsonprackmath=this.webpackJsonprackmath||[]).push([[0],{37:function(e,a,t){e.exports=t(58)},42:function(e,a,t){},43:function(e,a,t){},44:function(e,a,t){},50:function(e,a,t){},51:function(e,a,t){},52:function(e,a,t){},55:function(e,a,t){},56:function(e,a,t){},57:function(e,a,t){},58:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(11),c=t.n(r),u=t(12),i=t(17),o=t(16),s=t(29),v=t(30),m=t(36),d=t(34),b=t(5),y=t(19),f=t(63),h=(t(42),t(43),function(){return l.a.createElement("div",{className:"barbell"},l.a.createElement("div",{className:"barbell__shaft"}),l.a.createElement("div",{className:"barbell__weights"},l.a.createElement("div",{className:"barbell__weights--1"},l.a.createElement("div",{className:"weights__small"}),l.a.createElement("div",{className:"weights__med"}),l.a.createElement("div",{className:"weights__big"})),l.a.createElement("div",{className:"barbell__weights--2"},l.a.createElement("div",{className:"weights__small"}),l.a.createElement("div",{className:"weights__med"}),l.a.createElement("div",{className:"weights__big"}))))}),E=(t(44),function(){return l.a.createElement("div",{className:"plate"},l.a.createElement("div",{className:"plate__outline"}),l.a.createElement("div",{className:"plate__circle"}))}),p=function(){return l.a.createElement("nav",{className:"bg-red fixed-bottom navbar navbar-dark"},l.a.createElement("div",{className:"navbar-nav navbar-expand"},l.a.createElement(u.b,{className:"nav-item nav-link pr-5",to:"/rackmath"},l.a.createElement(h,null)),l.a.createElement(u.b,{className:"nav-item nav-link",to:"/inventory"},l.a.createElement(E,null))))},g=t(61),q=t(32),_=function(e){var a=e.value,t=e.quantity,n=e.bgColor,r=e.onClick;return l.a.createElement("div",{className:"plate-group text-center"},l.a.createElement("a",{href:"#0",onClick:function(){return r(a)},className:"plate-group__plate"+(t?" bg-"+n:"")},l.a.createElement("span",{className:"center-vertically"},a)),l.a.createElement("div",{className:"plate-group__quantity",style:{opacity:t?"100%":"0"}},l.a.createElement("span",{className:"center-vertically"},t)))},N=(t(27),t(50),function(e){var a=e.data,t=a.unit,n=a.barbell,r=a.availablePlates,c=e.onUnitClick,u=e.onPlateGroupClick;return l.a.createElement(l.a.Fragment,null,l.a.createElement(g.a,{className:"d-flex justify-content-between"},l.a.createElement("h1",null,"Unit"),l.a.createElement("a",{href:"#0",onClick:function(){return c()}},l.a.createElement("h1",null,t))),l.a.createElement(g.a,{className:"d-flex justify-content-between"},l.a.createElement("h1",null,"Barbell"),l.a.createElement("h1",null,n[t])),l.a.createElement(g.a,{className:"d-flex justify-content-center"},l.a.createElement("h1",null,"Available plates")),l.a.createElement(g.a,null,r[t].map((function(e,a){var t=e.value,n=e.color,r=e.quantity;return l.a.createElement(q.a,{key:a,xs:4},l.a.createElement(_,{onClick:u,value:t,quantity:r,bgColor:n}))}))))}),k=function(){return l.a.createElement("h1",null,"Not Found")},w=(t(51),function(e){return l.a.createElement("div",{className:"load"},l.a.createElement("div",{className:"load__barbell--shaft"},l.a.createElement("div",null,e.barbell)),l.a.createElement("div",{className:"load__barbell--sleeve-threshold"}),l.a.createElement("div",{className:"load__plate-group "},l.a.createElement("div",{style:{opacity:"0px"},className:"plate-container"}),e.calculatedPlates.map((function(e,a){return l.a.createElement("div",{key:a,style:{left:"".concat(32*a+32,"px")},className:"plate-container"},l.a.createElement("div",{className:"plate-container__plate center-vertically bg-".concat(e.color),style:{height:"".concat((t=8*e.value,n=35,r=315,t>=r?r:t<=n?n:t),"px")}}),l.a.createElement("div",{className:"plate-container__plate--text center-vertically"},e.value));var t,n,r}))))}),P=t(64),j=t(62),x=t(33),O=t(65),C=(t(52),function(e){return l.a.createElement(P.a,{onSubmit:function(a){return e.onSubmit(a)}},l.a.createElement(j.a,null,l.a.createElement(x.a,{className:"weight-input__form mb-3",type:"number",name:"loadInput",placeholder:"Enter Weight","aria-label":"weight"}),l.a.createElement(j.a.Append,null,l.a.createElement(j.a.Text,{className:"weight-input__text"},e.unit))),l.a.createElement(O.a,{className:"mx-auto d-block",variant:"dark",type:"submit"},"Submit"))}),S=function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement(C,{unit:e.unit,onSubmit:e.onSubmit}),l.a.createElement(w,{barbell:e.barbell,calculatedPlates:e.calculatedPlates}))},M=t(35),B=function(e,a){return e.reduce((function(e,t){return t.quantity>0?[].concat(Object(M.a)(e),[{value:t.value,color:t.color,quantity:Math.floor(t.quantity*a)}]):e}),[])},F=function(e){var a,t=[],n=Object(i.a)(e);try{for(n.s();!(a=n.n()).done;)for(var l=a.value,r=Math.floor(l.quantity);r>0;)t.push({value:l.value,color:l.color}),r--}catch(c){n.e(c)}finally{n.f()}return t},L=function(e){return Math.round(e/2.20462)},U=(t(54),t(55),t(56),function(e){Object(m.a)(t,e);var a=Object(d.a)(t);function t(){var e;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=a.call.apply(a,[this].concat(l))).state={inventory:{unit:"lbs",barbell:{lbs:45,kg:L(45)},availablePlates:{lbs:[{value:100,quantity:0},{value:65,quantity:0},{value:55,quantity:0},{value:50,quantity:0},{value:45,quantity:8},{value:35,quantity:0},{value:30,quantity:0},{value:25,quantity:8},{value:20,quantity:0},{value:15,quantity:0},{value:12.5,quantity:0},{value:10,quantity:8},{value:7.5,quantity:0},{value:5,quantity:8},{value:2.5,quantity:8},{value:1.25,quantity:0},{value:1,quantity:0},{value:.75,quantity:0},{value:.5,quantity:0},{value:.25,quantity:0}],kg:[{value:50,quantity:0},{value:45,quantity:0},{value:35,quantity:0},{value:30,quantity:0},{value:25,quantity:0},{value:20,quantity:8},{value:15,quantity:0},{value:12.5,quantity:0},{value:10,quantity:8},{value:7.5,quantity:0},{value:5,quantity:8},{value:3,quantity:0},{value:2.5,quantity:8},{value:2,quantity:0},{value:1.5,quantity:0},{value:1.25,quantity:8},{value:1,quantity:0},{value:.75,quantity:0},{value:.5,quantity:0},{value:.25,quantity:0}]}},calculatedPlates:[]},e.handleUnitClick=function(){var a=Object(o.a)({},e.state.inventory);"lbs"===a.unit?a.unit="kg":a.unit="lbs",e.setState({inventory:a})},e.handlePlateGroupClick=function(a){var t=e.state.inventory.unit,n=Object(o.a)({},e.state.inventory.availablePlates),l=n[t].findIndex((function(e){return e.value===a}));n[t][l].quantity=(n[t][l].quantity+2)%10,e.setState({availablePlates:n})},e.handleLoadSubmit=function(a){a.preventDefault();var t=a.currentTarget.loadInput.value,n=e.state.inventory,l=n.unit,r=n.availablePlates,c=e.state.inventory.barbell[l],u=B(r[l],.5),i=F(u),o=e.validateLoad(t,c,i),s=o.valid,v=o.errMsg;if(s){var m=e.calculatePlates(l,t,c,i),d=m.success,b=m.warn,f=m.calcdPlateObjs;b&&y.b.error(b),d&&e.setState({calculatedPlates:f})}else y.b.error(v)},e.validateLoad=function(e,a,t){return e<a?{errMsg:"That's not even the bar!",valid:!1}:e>a+2*t.reduce((function(e,a){return e+a.value}),0)?{errMsg:"Your inventory doesn't work with that weight",valid:!1}:{valid:!0}},e.calculatePlates=function(e,a,t,n){var l=a-t;if(0===l)return{success:!0,warn:"Just the bar",calcdPlateObjs:[]};l/=2;var r,c=[],u=Object(i.a)(n);try{for(u.s();!(r=u.n()).done;){var o=r.value;if(l>=o.value){if(c.push(o),c.length>8)return{success:!1,warn:"Not enough room on the bar!"};l-=o.value}}}catch(s){u.e(s)}finally{u.f()}return 0!==l?{success:!0,warn:"".concat(2*l," ").concat(e," has been rounded off."),calcdPlateObjs:c}:{success:!0,warn:"".concat(a," ").concat(e," loaded!"),calcdPlateObjs:c}},e}return Object(v.a)(t,[{key:"componentDidMount",value:function(){var e=this,a={};["lbs","kg"].forEach((function(t){a[t]=e.state.inventory.availablePlates[t].map((function(e,a){return Object(o.a)(Object(o.a)({},e),{},{color:(t=a,t%6===0?"black":t%5===0?"yellow":t%4===0?"red":t%3===0?"purple":t%2===0?"green":"cyan")});var t}))}));var t=this.state.inventory;t.availablePlates=a,this.setState({inventory:t})}},{key:"render",value:function(){var e=this,a=this.state.inventory,t=a.unit,n=a.barbell;return l.a.createElement(l.a.Fragment,null,l.a.createElement(f.a,{style:{paddingBottom:"70px"}},l.a.createElement(y.a,{limit:1,autoClose:2e3,hideProgressBar:!0,pauseOnFocusLoss:!1,draggable:!1,pauseOnHover:!1}),l.a.createElement(b.d,null,l.a.createElement(b.b,{path:"/rackmath",render:function(){return l.a.createElement(S,{unit:t,barbell:n[t],calculatedPlates:e.state.calculatedPlates,onSubmit:e.handleLoadSubmit})}}),l.a.createElement(b.b,{path:"/inventory",render:function(){return l.a.createElement(N,{data:e.state.inventory,onUnitClick:e.handleUnitClick,onPlateGroupClick:e.handlePlateGroupClick})}}),l.a.createElement(b.b,{path:"/not-found",component:k}),l.a.createElement(b.a,{from:"/",exact:!0,to:"/rackmath"}),l.a.createElement(b.a,{to:"/not-found"}))),l.a.createElement(p,null))}}]),t}(n.Component));t(57),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(u.a,null,l.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.84b58232.chunk.js.map