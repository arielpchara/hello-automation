(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{106:function(e,n,t){e.exports=t(234)},113:function(e,n){},115:function(e,n){},197:function(e,n){},198:function(e,n){},227:function(e,n){},234:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),r=t(95),u=t.n(r),o=t(102),i=t(12),l=t(28),s=t(21),f=t(22),m=t(96);function d(){var e=Object(s.a)(["\n  display: flex;\n  height: 100vh;\n  width: 100vw;\n  align-items: center;\n  justify-content: center;\n"]);return d=function(){return e},e}function b(){var e=Object(s.a)(["\n  border: none;\n  background: ",";\n  padding: 2em;\n  border-radius: 50%;\n  width: 100px;\n  height: 100px;\n  outline: none;\n  opacity: 0.75;\n  &:hover {\n    opacity: 1;\n  }\n"]);return b=function(){return e},e}var p=f.a.button(b(),(function(e){return"ON"===e.state?"orange":"grey"})),v=f.a.div(d()),O="stat/quarto/POWER",E=Object(m.connect)("ws://192.168.0.104:1884");function h(){var e=Object(a.useState)(),n=Object(l.a)(e,2),t=n[0],r=n[1];Object(a.useEffect)((function(){E.subscribe(O),E.on("message",(function(e,n){console.log(e,n),O===e&&r(n.toString())})),E.publish("cmnd/quarto/POWER","")}),[]);var u=Object(a.useCallback)((function(){E.publish("cmnd/quarto/POWER","TOGGLE")}),[]);return c.a.createElement(v,null,void 0===t?c.a.createElement(c.a.Fragment,null,"loading..."):c.a.createElement(p,{state:t,onClick:u},"Light is: ",t))}var j=t(100),g=t.n(j),x=t(105),w=t(101),y=t.n(w),k={animDuration:1,showValue:!0,initialValue:0,max:100};function R(e){var n=Object(a.useRef)(null),t=Object(a.useRef)(null);return Object(a.useEffect)((function(){if(!t.current){var a=Object(x.a)({},k,{},e);t.current=y()(n.current,a),t.current.setValue(e.value||0)}t.current.setValueAnimated(e.value,.5)}),[e]),c.a.createElement("div",{ref:n,className:"gauge-container"})}function S(){var e=Object(s.a)(["\n  width: 150px;\n  height: 150px;\n  display: flex;\n  flex-direction: column;\n"]);return S=function(){return e},e}function V(){var e=Object(s.a)(["\n  display: flex;\n"]);return V=function(){return e},e}var q=f.a.div(V()),F=f.a.div(S());function P(){var e=Object(a.useMemo)((function(){return g.a.connect("/",{path:"/api/monitor/socket.io"})}),[]),n=Object(a.useState)({currentload:0}),t=Object(l.a)(n,2),r=t[0],u=t[1],o=Object(a.useState)({used:100,total:100}),i=Object(l.a)(o,2),s=i[0],f=i[1];return Object(a.useEffect)((function(){console.log("load"),e.on("load",u),e.on("mem",f)}),[e]),c.a.createElement(q,null,c.a.createElement(F,null,c.a.createElement(R,{value:r.currentload,label:function(e){return"".concat(e.toFixed(1),"%")}})),c.a.createElement(F,null,c.a.createElement(R,{value:s.used/s.total*100,label:function(e){return"".concat(e.toFixed(1),"%")}})))}function W(){return c.a.createElement(o.a,null,c.a.createElement(i.c,null,c.a.createElement(i.a,{exact:!0,path:"/",component:h}),c.a.createElement(i.a,{path:"/monitor",component:P})))}var C=function(){return c.a.createElement(W,null)};u.a.render(c.a.createElement(C,null),document.getElementById("root"))}},[[106,1,2]]]);
//# sourceMappingURL=main.4495016f.chunk.js.map