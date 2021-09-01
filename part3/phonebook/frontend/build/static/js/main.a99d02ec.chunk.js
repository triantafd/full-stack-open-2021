(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{22:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(16),c=n.n(r),a=n(4),u=n(2),o=n(0),s=function(e){return Object(o.jsx)("h2",{children:e.name})},i=function(e){var t,n=e.searchName,r=e.setSearchName;return Object(o.jsxs)("div",{children:["Filter shown with: ",Object(o.jsx)("input",{value:n,onChange:(t=r,function(e){t(e.target.value)})})]})},d=(n(22),function(e){var t=e.message,n=e.error;return t?void 0!==n&&n?Object(o.jsx)("div",{className:"error",children:t}):Object(o.jsx)("div",{className:"message",children:t}):null}),l=function(e){var t=e.handleSubmit,n=e.newName,r=e.setNewName,c=e.newNumber,a=e.setNewNumber;return Object(o.jsxs)("form",{onSubmit:t,children:[Object(o.jsxs)("div",{children:["name : ",Object(o.jsx)("input",{value:n,onChange:function(e){r(e.target.value)}})]}),Object(o.jsxs)("div",{children:["number : ",Object(o.jsx)("input",{value:c,onChange:function(e){a(e.target.value)}})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"save"})})]})},j=n(3),b=n.n(j),f=n(6),h=n(5),m=n.n(h),p="/api/persons",O={getAll:function(){var e=Object(f.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=m.a.get(p),e.abrupt("return",t.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(f.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=m.a.post(p,t),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),delete:function(){var e=Object(f.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=m.a.delete("".concat(p,"/").concat(t)),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(f.a)(b.a.mark((function e(t,n){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=m.a.put("".concat(p,"/").concat(t),n),e.abrupt("return",r.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},v=function(e){var t=e.id,n=e.name,r=e.number,c=e.deletePerson;return Object(o.jsxs)("tr",{children:[Object(o.jsx)("td",{children:n}),Object(o.jsx)("td",{children:r}),Object(o.jsx)("td",{children:Object(o.jsx)("button",{onClick:function(){return c(t)},children:"delete"})})]})},x=function(e){var t=e.matchPersons,n=e.deletePerson;return console.log(t),Object(o.jsx)("div",{children:Object(o.jsx)("table",{children:Object(o.jsx)("tbody",{children:t.map((function(e){return Object(o.jsx)(v,{id:e.id,name:e.name,number:e.number,deletePerson:n},e.id)}))})})})},w=function(e){var t=Object(u.useState)([]),n=Object(a.a)(t,2),r=n[0],c=n[1],j=Object(u.useState)(""),b=Object(a.a)(j,2),f=b[0],h=b[1],m=Object(u.useState)(""),p=Object(a.a)(m,2),v=p[0],w=p[1],N=Object(u.useState)(""),g=Object(a.a)(N,2),E=g[0],S=g[1],P=r.filter((function(e){return e.name.toUpperCase().includes(E.toUpperCase())})),k=Object(u.useState)(""),A=Object(a.a)(k,2),y=A[0],T=A[1],C=Object(u.useState)(""),D=Object(a.a)(C,2),H=D[0],B=D[1],I=3e3;console.log(E,S),Object(u.useEffect)((function(){O.getAll().then((function(e){return c(e)})),console.log("Persons have been fetced")}),[]);return Object(o.jsxs)("div",{children:[Object(o.jsx)(s,{name:"Phonebook"}),y&&Object(o.jsx)(d,{message:y}),H&&Object(o.jsx)(d,{message:H,error:!0}),Object(o.jsx)("div",{children:Object(o.jsx)(i,{searchName:E,setSearchName:S})}),Object(o.jsxs)("div",{children:[Object(o.jsx)(s,{name:"Add a new"}),Object(o.jsx)(l,{handleSubmit:function(e){e.preventDefault();var t={name:f,number:v};if(console.log("Save have been pressed in order to add/ modify person",t),r.map((function(e){return e.name})).includes(f)){var n=r.filter((function(e){return e.name===f}))[0],a="".concat(f," is already added to phonebook, replace the old number with a new one?");window.confirm(a)&&O.update(n.id,t).then((function(e){console.log("A  PERSON HAVE BEEN modified",e),c(r.map((function(t){return t.id!==n.id?t:e}))),T("Added ".concat(f)),setTimeout((function(){return T("")}),I)})).catch((function(e){B(e.response.data.error),setTimeout((function(){return B("")}),I)}))}else O.create(t).then((function(e){console.log("A NEW PERSON HAVE BEEN ADDED",e),T("Added ".concat(f)),setTimeout((function(){return T(null)}),I),c(r.concat(e))})).catch((function(e){console.log("SOMETHING HAPPENED",e),B(e.response.data.error),setTimeout((function(){return B(null)}),I)}));h(""),w("")},newName:f,setNewName:h,newNumber:v,setNewNumber:w})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)(s,{name:"Numbers"}),Object(o.jsx)(x,{matchPersons:P,deletePerson:function(e){var t=r.filter((function(t){return t.id===e}));window.confirm("delete ".concat(t[0].name,"?"))&&O.delete(e).then((function(){B("deleted ".concat(t[0].name)),setTimeout((function(){return T(null)}),I),c(r.filter((function(t){return t.id!==e})))})).catch((function(e){B(e.response.data.error),setTimeout((function(){return B(null)}),I)}))}})]})]})};c.a.render(Object(o.jsx)(w,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.a99d02ec.chunk.js.map