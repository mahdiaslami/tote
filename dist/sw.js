if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const t=e=>n(e,r),l={module:{uri:r},exports:c,require:t};i[r]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(o(...e),c)))}}define(["./workbox-3e4da89b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.1b66988c.js",revision:null},{url:"assets/index.68973e6a.css",revision:null},{url:"assets/vendor.99a3d906.js",revision:null},{url:"index.html",revision:"585115b6848e4c5031034a502f039336"},{url:"img/icons/icon-72x72.png",revision:"517eea541343a61f81807d12e708ff31"},{url:"img/icons/icon-96x96.png",revision:"6aeedac72b05cd332a54f89ab715583c"},{url:"img/icons/icon-128x128.png",revision:"df8ff737b9cac297401d8c024ce4b4e4"},{url:"img/icons/icon-144x144.png",revision:"bfc3191f31265fb72abc8a5da98a1731"},{url:"manifest.webmanifest",revision:"8024823523676b251f9575ef4fc443ec"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
