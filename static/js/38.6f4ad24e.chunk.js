"use strict";(self.webpackChunkberry_material_react_free=self.webpackChunkberry_material_react_free||[]).push([[38],{38:function(e,t,a){a.r(t);var n=a(2791),i=a(6444),s=a(8378),l=a(9692),o=a(4453),r=a(1614),c=a(7621),d=a(9504),u=a(3767),m=a(890),h=a(8096),p=a(4925),v=a(8837),x=a(3786),g=a(1889),Z=a(7391),b=a(6151),j=a(7061),f=a(184);t.default=()=>{const[e,t]=(0,n.useState)(null),[a,y]=(0,n.useState)(null),[C,S]=(0,n.useState)(""),[T,N]=(0,n.useState)({}),[I,P]=(0,n.useState)(""),[M,O]=(0,n.useState)(null),[k,W]=(0,n.useState)(""),[B,D]=(0,n.useState)(null),[w,F]=(0,n.useState)(""),[G,V]=(0,n.useState)(""),[z,A]=(0,n.useState)(""),[E,_]=(0,n.useState)(""),[R,q]=(0,n.useState)(""),[H,L]=(0,n.useState)(""),[Y,J]=(0,n.useState)(""),[K,U]=(0,n.useState)(""),[X,Q]=(0,n.useState)(""),[$,ee]=(0,n.useState)(""),[te,ae]=(0,n.useState)(""),[ne,ie]=(0,n.useState)(""),[se,le]=(0,n.useState)(""),[oe,re]=(0,n.useState)(null),ce=(0,j.Z)((e=>({title:{paddingBottom:"30px",textTransform:"uppercase",textAlign:"center"}})))();(0,i.Aj)(s.I8,(e=>{e?(O(e),S(e.email)):O(null)}));return(0,n.useEffect)((()=>{(0,l.cf)(s.EP,(0,l.Xo)("name","desc"),(e=>{let a=[];e.docs.forEach((e=>{a.push({...e.data(),id:e.id})})),t(a)})),M&&(0,l.cf)((0,s.nx)(M.email),(e=>{e.forEach((e=>{y(e.data()),F(e.data().phone),D(e.id)}))})),(0,l.cf)(s.p5,(e=>{let t=[];e.docs.forEach((e=>{t.push({...e.data(),id:e.id})})),W(t)})),k&&(0,l.cf)((0,s.i3)(s.p5,w),(e=>{e.forEach((e=>{N(e.data()),P(e.id)})),0===e._snapshot.docChanges.length&&(0,l.ET)(s.p5,{phone:w,firstDose:"",secondDose:"",thirdDose:"",numberOfInjections:"",status:"none",name:a.name})}))}),[M,B,I]),(0,f.jsx)(r.Z,{children:M?(0,f.jsx)(c.Z,{children:(0,f.jsxs)(d.Z,{children:[(0,f.jsx)(u.Z,{children:(0,f.jsx)(m.Z,{variant:"h2",className:ce.title,children:"Th\xf4ng tin y\xeau c\u1ea7u"})}),(0,f.jsx)(u.Z,{children:"none"===(null===T||void 0===T?void 0:T.status)?(0,f.jsx)(m.Z,{variant:"subtitle2",sx:{color:"red"},children:"*Ch\u01b0a c\xf3 y\xeau c\u1ea7u n\xe0o"}):(0,f.jsx)(u.Z,{children:"pending"===(null===T||void 0===T?void 0:T.status)?(0,f.jsx)(m.Z,{children:"Y\xeau c\u1ea7u c\u1ee7a b\u1ea1n \u0111ang \u0111\u01b0\u1ee3c x\u1eed l\xed"}):(0,f.jsx)(u.Z,{children:"approved"===(null===T||void 0===T?void 0:T.status)?(0,f.jsx)(m.Z,{children:"Y\xeau c\u1ea7u c\u1ee7a b\u1ea1n \u0111\xe3 \u0111\u01b0\u1ee3c ch\u1ea5p thu\u1eadn, vui l\xf2ng ki\u1ec3m tra th\xf4ng tin \u0111\u01b0\u1ee3c thay \u0111\u1ed5i"}):(0,f.jsx)(u.Z,{children:"rejected"===(null===T||void 0===T?void 0:T.status)?(0,f.jsxs)(m.Z,{children:["Y\xeau c\u1ea7u c\u1ee7a b\u1ea1n \u0111\xe3 b\u1ecb t\u1eeb ch\u1ed1i v\u1edbi l\xed do:"," ",null===T||void 0===T?void 0:T.reason]}):(0,f.jsx)(f.Fragment,{})})})})}),(0,f.jsx)(u.Z,{children:(0,f.jsxs)(h.Z,{variant:"outlined",sx:{margin:"20px 0",minWidth:210},children:[(0,f.jsxs)(p.Z,{id:"demo-simple-select-label",children:["S\u1ed1 l\u1ea7n \u0111\xe3 ti\xeam:"," "]}),(0,f.jsxs)(v.Z,{label:"S\u1ed1 l\u1ea7n \u0111\xe3 ti\xeam",labelId:"demo-simple-select-label",id:"demo-simple-select",className:"addInfo-times",onChange:e=>_(e.target.value),value:E,children:[(0,f.jsx)(x.Z,{value:"Ch\u01b0a ti\xeam",children:"Ch\u01b0a ti\xeam "}),(0,f.jsx)(x.Z,{value:"1 m\u0169i",children:"1 l\u1ea7n"}),(0,f.jsx)(x.Z,{value:"2 m\u0169i",children:"2 l\u1ea7n"}),(0,f.jsx)(x.Z,{value:"3 m\u0169i",children:"3 l\u1ea7n"})]})]})}),(0,f.jsxs)(g.ZP,{container:!0,spacing:3,justifyContent:"center",alignItems:"center",children:[(0,f.jsx)(g.ZP,{item:!0,md:4,children:(0,f.jsxs)(u.Z,{children:[(0,f.jsxs)(h.Z,{variant:"outlined",sx:{marginTop:1,minWidth:210},children:[(0,f.jsx)(p.Z,{id:"demo-simple-select-label",children:"M\u0169i 1"}),(0,f.jsxs)(v.Z,{label:"M\u0169i 1",labelId:"demo-simple-select-label",id:"demo-simple-select",onChange:e=>q(e.target.value),value:R,children:[(0,f.jsx)(x.Z,{value:"",disabled:!0,children:"Ch\u1ecdn lo\u1ea1i vaccine"}),(0,f.jsx)(x.Z,{value:"Nanocovax",children:"Nanocovax"}),(0,f.jsx)(x.Z,{value:"Pfizer-BioNTech",children:"Pfizer-BioNTech"}),(0,f.jsx)(x.Z,{value:"AstraZeneca",children:"AstraZeneca"}),(0,f.jsx)(x.Z,{value:"Moderna",children:"Moderna"})]})]}),(0,f.jsx)(Z.Z,{sx:{marginTop:1,minWidth:210},id:"standard-basic",helperText:"Ng\xe0y ti\xeam m\u0169i 1",variant:"outlined",type:"date",className:"register-dob",value:K,onChange:e=>U(e.target.value)}),(0,f.jsx)(Z.Z,{sx:{marginTop:1,minWidth:210},autoComplete:"off",id:"standard-basic",variant:"outlined",type:"text",label:"\u0110\u01a1n v\u1ecb ti\xeam m\u0169i 1",className:"addInfo-findWithPhone",value:te,onChange:e=>ae(e.target.value)})]})}),(0,f.jsx)(g.ZP,{item:!0,md:4,children:(0,f.jsxs)(u.Z,{children:[(0,f.jsxs)(h.Z,{variant:"outlined",sx:{marginTop:1,minWidth:210},children:[(0,f.jsx)(p.Z,{id:"demo-simple-select-label",children:"M\u0169i 2"}),(0,f.jsxs)(v.Z,{label:"M\u0169i 2",labelId:"demo-simple-select-label",id:"demo-simple-select",onChange:e=>L(e.target.value),value:H,children:[(0,f.jsx)(x.Z,{value:"Ch\u01b0a ti\xeam",disabled:!0,children:"Ch\u1ecdn lo\u1ea1i vaccine"}),(0,f.jsx)(x.Z,{value:"Ch\u01b0a ti\xeam",children:"Ch\u01b0a ti\xeam"}),(0,f.jsx)(x.Z,{value:"Nanocovax",children:"Nanocovax"}),(0,f.jsx)(x.Z,{value:"Pfizer-BioNTech",children:"Pfizer-BioNTech"}),(0,f.jsx)(x.Z,{value:"AstraZeneca",children:"AstraZeneca"}),(0,f.jsx)(x.Z,{value:"Moderna",children:"Moderna"})]})]}),(0,f.jsx)(Z.Z,{sx:{marginTop:1,minWidth:210},id:"standard-basic",helperText:"Ng\xe0y ti\xeam m\u0169i 2",variant:"outlined",type:"date",className:"register-dob",value:X,onChange:e=>Q(e.target.value)}),(0,f.jsx)(Z.Z,{sx:{marginTop:1,minWidth:210},id:"standard-basic",variant:"outlined",type:"text",autoComplete:"off",label:"\u0110\u01a1n v\u1ecb ti\xeam m\u0169i 2",className:"addInfo-findWithPhone",value:ne,onChange:e=>ie(e.target.value)})]})}),(0,f.jsx)(g.ZP,{item:!0,md:4,children:(0,f.jsxs)(u.Z,{children:[(0,f.jsxs)(h.Z,{variant:"outlined",sx:{marginTop:1,minWidth:210},children:[(0,f.jsx)(p.Z,{id:"demo-simple-select-label",children:"M\u0169i 3"}),(0,f.jsxs)(v.Z,{label:"M\u0169i 3",labelId:"demo-simple-select-label",id:"demo-simple-select",onChange:e=>J(e.target.value),value:Y,children:[(0,f.jsx)(x.Z,{value:"Ch\u01b0a ti\xeam",disabled:!0,children:"Ch\u1ecdn lo\u1ea1i vaccine"}),(0,f.jsx)(x.Z,{value:"Ch\u01b0a ti\xeam",children:"Ch\u01b0a ti\xeam"}),(0,f.jsx)(x.Z,{value:"Nanocovax",children:"Nanocovax"}),(0,f.jsx)(x.Z,{value:"Pfizer-BioNTech",children:"Pfizer-BioNTech"}),(0,f.jsx)(x.Z,{value:"AstraZeneca",children:"AstraZeneca"}),(0,f.jsx)(x.Z,{value:"Moderna",children:"Moderna"})]})]}),(0,f.jsx)(Z.Z,{sx:{marginTop:1,minWidth:210},id:"standard-basic",helperText:"Ng\xe0y ti\xeam m\u0169i 3",variant:"outlined",type:"date",className:"register-dob",value:$,onChange:e=>ee(e.target.value)}),(0,f.jsx)(Z.Z,{sx:{marginTop:1,minWidth:210},id:"standard-basic",variant:"outlined",type:"text",autoComplete:"off",label:"\u0110\u01a1n v\u1ecb ti\xeam m\u0169i 3",className:"addInfo-findWithPhone",value:se,onChange:e=>le(e.target.value)})]})})]}),(0,f.jsxs)(u.Z,{sx:{alignItems:"center"},children:[(0,f.jsxs)(b.Z,{variant:"contained",component:"label",className:"addInfo-button",sx:{width:120,marginTop:4},color:"info",children:["T\u1ea3i \u1ea3nh l\xean",(0,f.jsx)("input",{hidden:!0,accept:"image/*",multiple:!0,type:"file",onChange:e=>re(e.target.files[0])})]}),(0,f.jsx)(m.Z,{sx:{marginTop:1},children:null===oe||void 0===oe?void 0:oe.name})]}),(0,f.jsx)(u.Z,{sx:{marginTop:5,justifyContent:"flex-end"},children:(0,f.jsx)(b.Z,{variant:"contained",type:"submit",onClick:e=>{if(e.preventDefault(),null===oe)return;const t=(0,o.iH)(s.tO,"".concat(w,"/verifyImg"));(0,o.KV)(t,oe).then((()=>{alert("G\u1eedi l\xean th\xe0nh c\xf4ng")}));const a=(0,o.iH)(s.tO,"".concat(w,"/verifyImg"));(0,o.Jt)(a).then((e=>{(0,l.pl)((0,l.JU)(s.db,"injectionRequestData",I),{...T,numberOfInjections:E,firstDose:R,secondDose:H,thirdDose:Y,injectDate1:K,injectDate2:X,injectDate3:$,injectPerson1:te,injectPerson2:ne,injectPerson3:se,infectedTimes:"",status:"pending",imageProof:e}),A(""),V(""),_("")})),q(""),L(""),J(""),U(""),Q(""),ee(""),ae(""),ie(""),le("")},color:"error",children:"G\u1eedi y\xeau c\u1ea7u"})})]})}):(0,f.jsx)(m.Z,{variant:"h5",gutterBottom:!0,children:"Vui l\xf2ng \u0111\u0103ng nh\u1eadp \u0111\u1ec3 ti\u1ebfp t\u1ee5c"})})}},3786:function(e,t,a){a.d(t,{Z:function(){return S}});var n=a(3366),i=a(7462),s=a(2791),l=a(8182),o=a(4419),r=a(2065),c=a(6934),d=a(1402),u=a(6199),m=a(3701),h=a(162),p=a(2071),v=a(133),x=a(6014),g=a(9849),Z=a(1217);function b(e){return(0,Z.Z)("MuiMenuItem",e)}var j=(0,a(5878).Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),f=a(184);const y=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],C=(0,c.ZP)(m.Z,{shouldForwardProp:e=>(0,c.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((e=>{let{theme:t,ownerState:a}=e;return(0,i.Z)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:"1px solid ".concat((t.vars||t).palette.divider),backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},["&.".concat(j.selected)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,r.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity),["&.".concat(j.focusVisible)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.focusOpacity,"))"):(0,r.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},["&.".concat(j.selected,":hover")]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.hoverOpacity,"))"):(0,r.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,r.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}},["&.".concat(j.focusVisible)]:{backgroundColor:(t.vars||t).palette.action.focus},["&.".concat(j.disabled)]:{opacity:(t.vars||t).palette.action.disabledOpacity},["& + .".concat(v.Z.root)]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},["& + .".concat(v.Z.inset)]:{marginLeft:52},["& .".concat(g.Z.root)]:{marginTop:0,marginBottom:0},["& .".concat(g.Z.inset)]:{paddingLeft:36},["& .".concat(x.Z.root)]:{minWidth:36}},!a.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&(0,i.Z)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{["& .".concat(x.Z.root," svg")]:{fontSize:"1.25rem"}}))}));var S=s.forwardRef((function(e,t){const a=(0,d.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:r=!1,component:c="li",dense:m=!1,divider:v=!1,disableGutters:x=!1,focusVisibleClassName:g,role:Z="menuitem",tabIndex:j}=a,S=(0,n.Z)(a,y),T=s.useContext(u.Z),N={dense:m||T.dense||!1,disableGutters:x},I=s.useRef(null);(0,h.Z)((()=>{r&&I.current&&I.current.focus()}),[r]);const P=(0,i.Z)({},a,{dense:N.dense,divider:v,disableGutters:x}),M=(e=>{const{disabled:t,dense:a,divider:n,disableGutters:s,selected:l,classes:r}=e,c={root:["root",a&&"dense",t&&"disabled",!s&&"gutters",n&&"divider",l&&"selected"]},d=(0,o.Z)(c,b,r);return(0,i.Z)({},r,d)})(a),O=(0,p.Z)(I,t);let k;return a.disabled||(k=void 0!==j?j:-1),(0,f.jsx)(u.Z.Provider,{value:N,children:(0,f.jsx)(C,(0,i.Z)({ref:O,role:Z,tabIndex:k,component:c,focusVisibleClassName:(0,l.Z)(M.focusVisible,g)},S,{ownerState:P,classes:M}))})}))}}]);
//# sourceMappingURL=38.6f4ad24e.chunk.js.map