(()=>{"use strict";var e,v={},m={};function r(e){var i=m[e];if(void 0!==i)return i.exports;var t=m[e]={id:e,loaded:!1,exports:{}};return v[e](t,t.exports,r),t.loaded=!0,t.exports}r.m=v,e=[],r.O=(i,t,o,f)=>{if(!t){var a=1/0;for(n=0;n<e.length;n++){for(var[t,o,f]=e[n],c=!0,d=0;d<t.length;d++)(!1&f||a>=f)&&Object.keys(r.O).every(b=>r.O[b](t[d]))?t.splice(d--,1):(c=!1,f<a&&(a=f));if(c){e.splice(n--,1);var l=o();void 0!==l&&(i=l)}}return i}f=f||0;for(var n=e.length;n>0&&e[n-1][2]>f;n--)e[n]=e[n-1];e[n]=[t,o,f]},r.d=(e,i)=>{for(var t in i)r.o(i,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:i[t]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce((i,t)=>(r.f[t](e,i),i),[])),r.u=e=>e+"."+{4:"b0dac3b8afdfeb57",360:"e6e4dfcbc9c8b3a8",717:"558b84c73f0907f6",786:"e9d39191aeca54db",881:"b7c6f339678c7ee0",889:"9a97ed8a97485dcb"}[e]+".js",r.miniCssF=e=>{},r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,i)=>Object.prototype.hasOwnProperty.call(e,i),(()=>{var e={},i="account-manager-pwa-frontend:";r.l=(t,o,f,n)=>{if(e[t])e[t].push(o);else{var a,c;if(void 0!==f)for(var d=document.getElementsByTagName("script"),l=0;l<d.length;l++){var u=d[l];if(u.getAttribute("src")==t||u.getAttribute("data-webpack")==i+f){a=u;break}}a||(c=!0,(a=document.createElement("script")).type="module",a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",i+f),a.src=r.tu(t)),e[t]=[o];var s=(g,b)=>{a.onerror=a.onload=null,clearTimeout(p);var _=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),_&&_.forEach(h=>h(b)),g)return g(b)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=s.bind(null,a.onerror),a.onload=s.bind(null,a.onload),c&&document.head.appendChild(a)}}})(),r.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;r.tt=()=>(void 0===e&&(e={createScriptURL:i=>i},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),r.tu=e=>r.tt().createScriptURL(e),r.p="",(()=>{var e={666:0};r.f.j=(o,f)=>{var n=r.o(e,o)?e[o]:void 0;if(0!==n)if(n)f.push(n[2]);else if(666!=o){var a=new Promise((u,s)=>n=e[o]=[u,s]);f.push(n[2]=a);var c=r.p+r.u(o),d=new Error;r.l(c,u=>{if(r.o(e,o)&&(0!==(n=e[o])&&(e[o]=void 0),n)){var s=u&&("load"===u.type?"missing":u.type),p=u&&u.target&&u.target.src;d.message="Loading chunk "+o+" failed.\n("+s+": "+p+")",d.name="ChunkLoadError",d.type=s,d.request=p,n[1](d)}},"chunk-"+o,o)}else e[o]=0},r.O.j=o=>0===e[o];var i=(o,f)=>{var d,l,[n,a,c]=f,u=0;if(n.some(p=>0!==e[p])){for(d in a)r.o(a,d)&&(r.m[d]=a[d]);if(c)var s=c(r)}for(o&&o(f);u<n.length;u++)r.o(e,l=n[u])&&e[l]&&e[l][0](),e[l]=0;return r.O(s)},t=self.webpackChunkaccount_manager_pwa_frontend=self.webpackChunkaccount_manager_pwa_frontend||[];t.forEach(i.bind(null,0)),t.push=i.bind(null,t.push.bind(t))})()})();