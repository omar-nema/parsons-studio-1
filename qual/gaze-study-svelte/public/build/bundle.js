var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function i(e){e.forEach(t)}function s(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let o,a;function l(e,t){return o||(o=document.createElement("a")),o.href=t,e===o.href}function c(t,...n){if(null==t)return e;const i=t.subscribe(...n);return i.unsubscribe?()=>i.unsubscribe():i}function h(e){let t;return c(e,(e=>t=e))(),t}function u(e,t,n){e.$$.on_destroy.push(c(t,n))}function d(e,t){e.appendChild(t)}function p(e,t,n){e.insertBefore(t,n||null)}function f(e){e.parentNode.removeChild(e)}function _(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function m(e){return document.createElement(e)}function g(e){return document.createTextNode(e)}function y(){return g(" ")}function v(){return g("")}function C(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function b(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function w(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function T(e,t,n,i){e.style.setProperty(t,n,i?"important":"")}function I(e,t,n){e.classList[n?"add":"remove"](t)}function k(e){a=e}function S(){if(!a)throw new Error("Function called outside component initialization");return a}const E=[],N=[],R=[],x=[],P=Promise.resolve();let D=!1;function A(e){R.push(e)}let L=!1;const O=new Set;function M(){if(!L){L=!0;do{for(let e=0;e<E.length;e+=1){const t=E[e];k(t),F(t.$$)}for(k(null),E.length=0;N.length;)N.pop()();for(let e=0;e<R.length;e+=1){const t=R[e];O.has(t)||(O.add(t),t())}R.length=0}while(E.length);for(;x.length;)x.pop()();D=!1,L=!1,O.clear()}}function F(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(A)}}const $=new Set;let q;function W(){q={r:0,c:[],p:q}}function z(){q.r||i(q.c),q=q.p}function U(e,t){e&&e.i&&($.delete(e),e.i(t))}function B(e,t,n,i){if(e&&e.o){if($.has(e))return;$.add(e),q.c.push((()=>{$.delete(e),i&&(n&&e.d(1),i())})),e.o(t)}}function H(e){e&&e.c()}function j(e,n,r,o){const{fragment:a,on_mount:l,on_destroy:c,after_update:h}=e.$$;a&&a.m(n,r),o||A((()=>{const n=l.map(t).filter(s);c?c.push(...n):i(n),e.$$.on_mount=[]})),h.forEach(A)}function V(e,t){const n=e.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function G(e,t){-1===e.$$.dirty[0]&&(E.push(e),D||(D=!0,P.then(M)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Y(t,s,r,o,l,c,h,u=[-1]){const d=a;k(t);const p=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(d?d.$$.context:[])),callbacks:n(),dirty:u,skip_bound:!1,root:s.target||d.$$.root};h&&h(p.root);let _=!1;if(p.ctx=r?r(t,s.props||{},((e,n,...i)=>{const s=i.length?i[0]:n;return p.ctx&&l(p.ctx[e],p.ctx[e]=s)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](s),_&&G(t,e)),n})):[],p.update(),_=!0,i(p.before_update),p.fragment=!!o&&o(p.ctx),s.target){if(s.hydrate){const e=function(e){return Array.from(e.childNodes)}(s.target);p.fragment&&p.fragment.l(e),e.forEach(f)}else p.fragment&&p.fragment.c();s.intro&&U(t.$$.fragment),j(t,s.target,s.anchor,s.customElement),M()}k(d)}class K{$destroy(){V(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Q=[];function J(t,n=e){let i;const s=new Set;function o(e){if(r(t,e)&&(t=e,i)){const e=!Q.length;for(const e of s)e[1](),Q.push(e,t);if(e){for(let e=0;e<Q.length;e+=2)Q[e][0](Q[e+1]);Q.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(r,a=e){const l=[r,a];return s.add(l),1===s.size&&(i=n(o)||e),r(t),()=>{s.delete(l),0===s.size&&(i(),i=null)}}}}
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function X(e,t,n,i){return new(n||(n=Promise))((function(s,r){function o(e){try{l(i.next(e))}catch(e){r(e)}}function a(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}l((i=i.apply(e,t||[])).next())}))}function Z(e,t){var n,i,s,r,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,i&&(s=2&r[0]?i.return:r[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,r[1])).done)return s;switch(i=0,s&&(r=[2&r[0],s.value]),r[0]){case 0:case 1:s=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,i=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!(s=o.trys,(s=s.length>0&&s[s.length-1])||6!==r[0]&&2!==r[0])){o=0;continue}if(3===r[0]&&(!s||r[1]>s[0]&&r[1]<s[3])){o.label=r[1];break}if(6===r[0]&&o.label<s[1]){o.label=s[1],s=r;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(r);break}s[2]&&o.ops.pop(),o.trys.pop();continue}r=t.call(e,o)}catch(e){r=[6,e],i=0}finally{n=s=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}}function ee(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],i=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function te(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var i,s,r=n.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(i=r.next()).done;)o.push(i.value)}catch(e){s={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(s)throw s.error}}return o}function ne(e,t,n){if(n||2===arguments.length)for(var i,s=0,r=t.length;s<r;s++)!i&&s in t||(i||(i=Array.prototype.slice.call(t,0,s)),i[s]=t[s]);return e.concat(i||Array.prototype.slice.call(t))}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const ie=!1,se="${JSCORE_VERSION}",re=function(e,t){if(!e)throw oe(t)},oe=function(e){return new Error("Firebase Database ("+se+") INTERNAL ASSERT FAILED: "+e)},ae=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let s=e.charCodeAt(i);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):55296==(64512&s)&&i+1<e.length&&56320==(64512&e.charCodeAt(i+1))?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++i)),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t},le={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let t=0;t<e.length;t+=3){const s=e[t],r=t+1<e.length,o=r?e[t+1]:0,a=t+2<e.length,l=a?e[t+2]:0,c=s>>2,h=(3&s)<<4|o>>4;let u=(15&o)<<2|l>>6,d=63&l;a||(d=64,r||(u=64)),i.push(n[c],n[h],n[u],n[d])}return i.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(ae(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,i=0;for(;n<e.length;){const s=e[n++];if(s<128)t[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=e[n++];t[i++]=String.fromCharCode((31&s)<<6|63&r)}else if(s>239&&s<365){const r=((7&s)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[i++]=String.fromCharCode(55296+(r>>10)),t[i++]=String.fromCharCode(56320+(1023&r))}else{const r=e[n++],o=e[n++];t[i++]=String.fromCharCode((15&s)<<12|(63&r)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let t=0;t<e.length;){const s=n[e.charAt(t++)],r=t<e.length?n[e.charAt(t)]:0;++t;const o=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==s||null==r||null==o||null==a)throw Error();const l=s<<2|r>>4;if(i.push(l),64!==o){const e=r<<4&240|o>>2;if(i.push(e),64!==a){const e=o<<6&192|a;i.push(e)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},ce=function(e){try{return le.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function he(e){return ue(void 0,e)}function ue(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=ue(e[n],t[n]));return e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class de{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function pe(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")}function fe(){return!0===ie}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class _e extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,_e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,me.prototype.create)}}class me{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],r=s?function(e,t){return e.replace(ge,((e,n)=>{const i=t[n];return null!=i?String(i):`<${n}?>`}))}(s,n):"Error",o=`${this.serviceName}: ${r} (${i}).`;return new _e(i,o,n)}}const ge=/\{\$([^}]+)}/g;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ye(e){return JSON.parse(e)}function ve(e){return JSON.stringify(e)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Ce=function(e){let t={},n={},i={},s="";try{const r=e.split(".");t=ye(ce(r[0])||""),n=ye(ce(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:i,signature:s}};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function be(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function we(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function Te(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Ie(e,t,n){const i={};for(const s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=t.call(n,e[s],s,e));return i}function ke(e,t){if(e===t)return!0;const n=Object.keys(e),i=Object.keys(t);for(const s of n){if(!i.includes(s))return!1;const n=e[s],r=t[s];if(Se(n)&&Se(r)){if(!ke(n,r))return!1}else if(n!==r)return!1}for(const e of i)if(!n.includes(e))return!1;return!0}function Se(e){return null!==e&&"object"==typeof e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Ee{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"==typeof e)for(let i=0;i<16;i++)n[i]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let i=0;i<16;i++)n[i]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let e=16;e<80;e++){const t=n[e-3]^n[e-8]^n[e-14]^n[e-16];n[e]=4294967295&(t<<1|t>>>31)}let i,s,r=this.chain_[0],o=this.chain_[1],a=this.chain_[2],l=this.chain_[3],c=this.chain_[4];for(let e=0;e<80;e++){e<40?e<20?(i=l^o&(a^l),s=1518500249):(i=o^a^l,s=1859775393):e<60?(i=o&a|l&(o|a),s=2400959708):(i=o^a^l,s=3395469782);const t=(r<<5|r>>>27)+i+c+s+n[e]&4294967295;c=l,l=a,a=4294967295&(o<<30|o>>>2),o=r,r=t}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let i=0;const s=this.buf_;let r=this.inbuf_;for(;i<t;){if(0===r)for(;i<=n;)this.compress_(e,i),i+=this.blockSize;if("string"==typeof e){for(;i<t;)if(s[r]=e.charCodeAt(i),++r,++i,r===this.blockSize){this.compress_(s),r=0;break}}else for(;i<t;)if(s[r]=e[i],++r,++i,r===this.blockSize){this.compress_(s),r=0;break}}this.inbuf_=r,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let t=0;t<5;t++)for(let i=24;i>=0;i-=8)e[n]=this.chain_[t]>>i&255,++n;return e}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const Ne=function(e){let t=0;for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);i<128?t++:i<2048?t+=2:i>=55296&&i<=56319?(t+=4,n++):t+=3}return t};var Re=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}(),xe="[DEFAULT]",Pe=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}return e.prototype.get=function(e){var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new de;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{var i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t,n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),i=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(i)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(i)return null;throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,n;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e))try{this.getOrInitializeService({instanceIdentifier:xe})}catch(e){}try{for(var i=ee(this.instancesDeferred.entries()),s=i.next();!s.done;s=i.next()){var r=te(s.value,2),o=r[0],a=r[1],l=this.normalizeInstanceIdentifier(o);try{var c=this.getOrInitializeService({instanceIdentifier:l});a.resolve(c)}catch(e){}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}}},e.prototype.clearInstance=function(e){void 0===e&&(e=xe),this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return X(this,void 0,void 0,(function(){var e;return Z(this,(function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(ne(ne([],te(e.filter((function(e){return"INTERNAL"in e})).map((function(e){return e.INTERNAL.delete()})))),te(e.filter((function(e){return"_delete"in e})).map((function(e){return e._delete()})))))];case 1:return t.sent(),[2]}}))}))},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.isInitialized=function(e){return void 0===e&&(e=xe),this.instances.has(e)},e.prototype.getOptions=function(e){return void 0===e&&(e=xe),this.instancesOptions.get(e)||{}},e.prototype.initialize=function(e){var t,n;void 0===e&&(e={});var i=e.options,s=void 0===i?{}:i,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(this.name+"("+r+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var o=this.getOrInitializeService({instanceIdentifier:r,options:s});try{for(var a=ee(this.instancesDeferred.entries()),l=a.next();!l.done;l=a.next()){var c=te(l.value,2),h=c[0],u=c[1];r===this.normalizeInstanceIdentifier(h)&&u.resolve(o)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(n=a.return)&&n.call(a)}finally{if(t)throw t.error}}return o},e.prototype.onInit=function(e,t){var n,i=this.normalizeInstanceIdentifier(t),s=null!==(n=this.onInitCallbacks.get(i))&&void 0!==n?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);var r=this.instances.get(i);return r&&e(r,i),function(){s.delete(e)}},e.prototype.invokeOnInitCallbacks=function(e,t){var n,i,s=this.onInitCallbacks.get(t);if(s)try{for(var r=ee(s),o=r.next();!o.done;o=r.next()){var a=o.value;try{a(e,t)}catch(e){}}}catch(e){n={error:e}}finally{try{o&&!o.done&&(i=r.return)&&i.call(r)}finally{if(n)throw n.error}}},e.prototype.getOrInitializeService=function(e){var t,n=e.instanceIdentifier,i=e.options,s=void 0===i?{}:i,r=this.instances.get(n);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:(t=n,t===xe?void 0:t),options:s}),this.instances.set(n,r),this.instancesOptions.set(n,s),this.invokeOnInitCallbacks(r,n),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,r)}catch(e){}return r||null},e.prototype.normalizeInstanceIdentifier=function(e){return void 0===e&&(e=xe),this.component?this.component.multipleInstances?e:xe:e},e.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},e}();
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var De,Ae=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new Pe(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}();
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(De||(De={}));const Le={debug:De.DEBUG,verbose:De.VERBOSE,info:De.INFO,warn:De.WARN,error:De.ERROR,silent:De.SILENT},Oe=De.INFO,Me={[De.DEBUG]:"log",[De.VERBOSE]:"log",[De.INFO]:"info",[De.WARN]:"warn",[De.ERROR]:"error"},Fe=(e,t,...n)=>{if(t<e.logLevel)return;const i=(new Date).toISOString(),s=Me[t];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[s](`[${i}]  ${e.name}:`,...n)};class $e{constructor(e){this.name=e,this._logLevel=Oe,this._logHandler=Fe,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in De))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?Le[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,De.DEBUG,...e),this._logHandler(this,De.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,De.VERBOSE,...e),this._logHandler(this,De.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,De.INFO,...e),this._logHandler(this,De.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,De.WARN,...e),this._logHandler(this,De.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,De.ERROR,...e),this._logHandler(this,De.ERROR,...e)}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class qe{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const We="@firebase/app",ze="0.7.4",Ue=new $e("@firebase/app"),Be="[DEFAULT]",He={[We]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},je=new Map,Ve=new Map;function Ge(e,t){try{e.container.addComponent(t)}catch(n){Ue.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Ye(e){const t=e.name;if(Ve.has(t))return Ue.debug(`There were multiple attempts to register component ${t}.`),!1;Ve.set(t,e);for(const t of je.values())Ge(t,e);return!0}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const Ke=new me("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Qe{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Re("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ke.create("app-deleted",{appName:this._name})}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Je(e,t,n){var i;let s=null!==(i=He[e])&&void 0!==i?i:e;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=t.match(/\s|\//);if(r||o){const e=[`Unable to register library "${s}" with version "${t}":`];return r&&e.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void Ue.warn(e.join(" "))}Ye(new Re(`${s}-version`,(()=>({library:s,version:t})),"VERSION"))}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Xe;Xe="",Ye(new Re("platform-logger",(e=>new qe(e)),"PRIVATE")),Je(We,ze,Xe),Je(We,ze,"esm2017"),Je("fire-js","");
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
Je("firebase","9.1.3","app");const Ze="@firebase/database",et="0.12.2";
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
let tt="";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class nt{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ve(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:ye(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class it{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return be(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const st=function(e){try{if("undefined"!=typeof window&&void 0!==window[e]){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new nt(t)}}catch(e){}return new it},rt=st("localStorage"),ot=st("sessionStorage"),at=new $e("@firebase/database"),lt=function(){let e=1;return function(){return e++}}(),ct=function(e){const t=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let s=e.charCodeAt(i);if(s>=55296&&s<=56319){const t=s-55296;i++,re(i<e.length,"Surrogate pair missing trail surrogate."),s=65536+(t<<10)+(e.charCodeAt(i)-56320)}s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):s<65536?(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t}(e),n=new Ee;n.update(t);const i=n.digest();return le.encodeByteArray(i)},ht=function(...e){let t="";for(let n=0;n<e.length;n++){const i=e[n];Array.isArray(i)||i&&"object"==typeof i&&"number"==typeof i.length?t+=ht.apply(null,i):t+="object"==typeof i?ve(i):i,t+=" "}return t};let ut=null,dt=!0;const pt=function(...e){var t,n;if(!0===dt&&(dt=!1,null===ut&&!0===ot.get("logging_enabled")&&(t=!0,re(!n||!0===t||!1===t,"Can't turn on custom loggers persistently."),!0===t?(at.logLevel=De.VERBOSE,ut=at.log.bind(at),n&&ot.set("logging_enabled",!0)):"function"==typeof t?ut=t:(ut=null,ot.remove("logging_enabled")))),ut){const t=ht.apply(null,e);ut(t)}},ft=function(e){return function(...t){pt(e,...t)}},_t=function(...e){const t="FIREBASE INTERNAL ERROR: "+ht(...e);at.error(t)},mt=function(...e){const t=`FIREBASE FATAL ERROR: ${ht(...e)}`;throw at.error(t),new Error(t)},gt=function(...e){const t="FIREBASE WARNING: "+ht(...e);at.warn(t)},yt=function(e){return"number"==typeof e&&(e!=e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},vt="[MIN_NAME]",Ct="[MAX_NAME]",bt=function(e,t){if(e===t)return 0;if(e===vt||t===Ct)return-1;if(t===vt||e===Ct)return 1;{const n=Rt(e),i=Rt(t);return null!==n?null!==i?n-i==0?e.length-t.length:n-i:-1:null!==i?1:e<t?-1:1}},wt=function(e,t){return e===t?0:e<t?-1:1},Tt=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+ve(t))},It=function(e){if("object"!=typeof e||null===e)return ve(e);const t=[];for(const n in e)t.push(n);t.sort();let n="{";for(let i=0;i<t.length;i++)0!==i&&(n+=","),n+=ve(t[i]),n+=":",n+=It(e[t[i]]);return n+="}",n},kt=function(e,t){const n=e.length;if(n<=t)return[e];const i=[];for(let s=0;s<n;s+=t)s+t>n?i.push(e.substring(s,n)):i.push(e.substring(s,s+t));return i};function St(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const Et=function(e){re(!yt(e),"Invalid JSON number");const t=1023;let n,i,s,r,o;0===e?(i=0,s=0,n=1/e==-1/0?1:0):(n=e<0,(e=Math.abs(e))>=Math.pow(2,-1022)?(r=Math.min(Math.floor(Math.log(e)/Math.LN2),t),i=r+t,s=Math.round(e*Math.pow(2,52-r)-Math.pow(2,52))):(i=0,s=Math.round(e/Math.pow(2,-1074))));const a=[];for(o=52;o;o-=1)a.push(s%2?1:0),s=Math.floor(s/2);for(o=11;o;o-=1)a.push(i%2?1:0),i=Math.floor(i/2);a.push(n?1:0),a.reverse();const l=a.join("");let c="";for(o=0;o<64;o+=8){let e=parseInt(l.substr(o,8),2).toString(16);1===e.length&&(e="0"+e),c+=e}return c.toLowerCase()},Nt=new RegExp("^-?(0*)\\d{1,10}$"),Rt=function(e){if(Nt.test(e)){const t=Number(e);if(t>=-2147483648&&t<=2147483647)return t}return null},xt=function(e){try{e()}catch(e){setTimeout((()=>{const t=e.stack||"";throw gt("Exception was thrown by user callback.",t),e}),Math.floor(0))}},Pt=function(e,t){const n=setTimeout(e,t);return"object"==typeof n&&n.unref&&n.unref(),n};
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Dt{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=null==t?void 0:t.getImmediate({optional:!0}),this.appCheck||null==t||t.get().then((e=>this.appCheck=e))}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise(((t,n)=>{setTimeout((()=>{this.appCheck?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){var t;null===(t=this.appCheckProvider)||void 0===t||t.get().then((t=>t.addTokenListener(e)))}notifyForInvalidToken(){gt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class At{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit((e=>this.auth_=e))}getToken(e){return this.auth_?this.auth_.getToken(e).catch((e=>e&&"auth/token-not-initialized"===e.code?(pt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e))):new Promise(((t,n)=>{setTimeout((()=>{this.auth_?this.getToken(e).then(t,n):t(null)}),0)}))}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then((t=>t.addAuthTokenListener(e)))}removeTokenChangeListener(e){this.authProvider_.get().then((t=>t.removeAuthTokenListener(e)))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',gt(e)}}class Lt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Lt.OWNER="owner";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const Ot=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Mt="websocket",Ft="long_polling";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class $t{constructor(e,t,n,i,s=!1,r="",o=!1){this.secure=t,this.namespace=n,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=r,this.includeNamespaceInQueryParams=o,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=rt.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&rt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function qt(e,t,n){let i;if(re("string"==typeof t,"typeof type must == string"),re("object"==typeof n,"typeof params must == object"),t===Mt)i=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else{if(t!==Ft)throw new Error("Unknown connection type: "+t);i=(e.secure?"https://":"http://")+e.internalHost+"/.lp?"}(function(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams})(e)&&(n.ns=e.namespace);const s=[];return St(n,((e,t)=>{s.push(e+"="+t)})),i+s.join("&")}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Wt{constructor(){this.counters_={}}incrementCounter(e,t=1){be(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return he(this.counters_)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const zt={},Ut={};function Bt(e){const t=e.toString();return zt[t]||(zt[t]=new Wt),zt[t]}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Ht{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&xt((()=>{this.onMessage_(e[t])}));if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const jt="start";class Vt{constructor(e,t,n,i,s,r,o){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=i,this.authToken=s,this.transportSessionId=r,this.lastSessionId=o,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ft(e),this.stats_=Bt(t),this.urlFn=e=>(this.appCheckToken&&(e.ac=this.appCheckToken),qt(t,Ft,e))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Ht(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout((()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null}),Math.floor(3e4)),function(e){if("complete"===document.readyState)e();else{let t=!1;const n=function(){document.body?t||(t=!0,e()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",(()=>{"complete"===document.readyState&&n()})),window.attachEvent("onload",n))}}((()=>{if(this.isClosed_)return;this.scriptTagHolder=new Gt(((...e)=>{const[t,n,i,s,r]=e;if(this.incrementIncomingBytes_(e),this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,t===jt)this.id=n,this.password=i;else{if("close"!==t)throw new Error("Unrecognized command received: "+t);n?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(n,(()=>{this.onClosed_()}))):this.onClosed_()}}),((...e)=>{const[t,n]=e;this.incrementIncomingBytes_(e),this.myPacketOrderer.handleResponse(t,n)}),(()=>{this.onClosed_()}),this.urlFn);const e={start:"t"};e.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e.cb=this.scriptTagHolder.uniqueCallbackIdentifier),e.v="5",this.transportSessionId&&(e.s=this.transportSessionId),this.lastSessionId&&(e.ls=this.lastSessionId),this.applicationId&&(e.p=this.applicationId),this.appCheckToken&&(e.ac=this.appCheckToken),"undefined"!=typeof location&&location.hostname&&Ot.test(location.hostname)&&(e.r="f");const t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,(()=>{}))}))}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Vt.forceAllow_=!0}static forceDisallow(){Vt.forceDisallow_=!0}static isAvailable(){return!!Vt.forceAllow_||!(Vt.forceDisallow_||"undefined"==typeof document||null==document.createElement||"object"==typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href)||"object"==typeof Windows&&"object"==typeof Windows.UI)}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=ve(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=function(e){const t=ae(e);return le.encodeByteArray(t,!0)}(t),i=kt(n,1840);for(let e=0;e<i.length;e++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[e]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const n={dframe:"t"};n.id=e,n.pw=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=ve(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Gt{constructor(e,t,n,i){this.onDisconnect=n,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=lt(),window["pLPCommand"+this.uniqueCallbackIdentifier]=e,window["pRTLPCB"+this.uniqueCallbackIdentifier]=t,this.myIFrame=Gt.createIFrame_();let n="";if(this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,"javascript:".length)){n='<script>document.domain="'+document.domain+'";<\/script>'}const i="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(i),this.myIFrame.doc.close()}catch(e){pt("frame writing exception"),e.stack&&pt(e.stack),pt(e)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{e.contentWindow.document||pt("No IE domain setting required")}catch(t){const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.innerHTML="",setTimeout((()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)}),Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e.id=this.myID,e.pw=this.myPW,e.ser=this.currentSerial;let t=this.urlFn(e),n="",i=0;for(;this.pendingSegs.length>0;){if(!(this.pendingSegs[0].d.length+30+n.length<=1870))break;{const e=this.pendingSegs.shift();n=n+"&seg"+i+"="+e.seg+"&ts"+i+"="+e.ts+"&d"+i+"="+e.d,i++}}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(n,Math.floor(25e3));this.addTag(e,(()=>{clearTimeout(i),n()}))}addTag(e,t){setTimeout((()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{pt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(e){}}),Math.floor(1))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let Yt=null;"undefined"!=typeof MozWebSocket?Yt=MozWebSocket:"undefined"!=typeof WebSocket&&(Yt=WebSocket);class Kt{constructor(e,t,n,i,s,r,o){this.connId=e,this.applicationId=n,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ft(this.connId),this.stats_=Bt(t),this.connURL=Kt.connectionURL_(t,r,o,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,i){const s={v:"5"};return"undefined"!=typeof location&&location.hostname&&Ot.test(location.hostname)&&(s.r="f"),t&&(s.s=t),n&&(s.ls=n),i&&(s.ac=i),qt(e,Mt,s)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,rt.set("previous_websocket_failure",!0);try{if(fe());else{const e={headers:{"X-Firebase-GMPID":this.applicationId||"","X-Firebase-AppCheck":this.appCheckToken||""}};this.mySock=new Yt(this.connURL,[],e)}}catch(e){this.log_("Error instantiating WebSocket.");const t=e.message||e.data;return t&&this.log_(t),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");const t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){Kt.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!=typeof navigator&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&null!==Yt&&!Kt.forceDisallow_}static previouslyFailed(){return rt.isInMemoryStorage||!0===rt.get("previous_websocket_failure")}markConnectionHealthy(){rt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const t=ye(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(re(null===this.frames,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{const e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();const t=ve(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=kt(t,16384);n.length>1&&this.sendString_(String(n.length));for(let e=0;e<n.length;e++)this.sendString_(n[e])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval((()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()}),Math.floor(45e3))}sendString_(e){try{this.mySock.send(e)}catch(e){this.log_("Exception thrown from WebSocket.send():",e.message||e.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Kt.responsesRequiredToBeHealthy=2,Kt.healthyTimeout=3e4;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Qt{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Vt,Kt]}initTransports_(e){const t=Kt&&Kt.isAvailable();let n=t&&!Kt.previouslyFailed();if(e.webSocketOnly&&(t||gt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[Kt];else{const e=this.transports_=[];for(const t of Qt.ALL_TRANSPORTS)t&&t.isAvailable()&&e.push(t)}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Jt{constructor(e,t,n,i,s,r,o,a,l,c){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=r,this.onReady_=o,this.onDisconnect_=a,this.onKill_=l,this.lastSessionId=c,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ft("c:"+this.id+":"),this.transportManager_=new Qt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout((()=>{this.conn_&&this.conn_.open(t,n)}),Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Pt((()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))}),Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if("t"in e){const t=e.t;"a"===t?this.upgradeIfSecondaryHealthy_():"r"===t?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):"o"===t&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Tt("t",e),n=Tt("d",e);if("c"===t)this.onSecondaryControl_(n);else{if("d"!==t)throw new Error("Unknown protocol layer: "+t);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Tt("t",e),n=Tt("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Tt("t",e);if("d"in e){const n=e.d;if("h"===t)this.onHandshake_(n);else if("n"===t){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===t?this.onConnectionShutdown_(n):"r"===t?this.onReset_(n):"e"===t?_t("Server Error: "+n):"o"===t?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):_t("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),"5"!==n&&gt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),Pt((()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())}),Math.floor(6e4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Pt((()=>{this.sendPingOnPrimaryIfNecessary_()}),Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==e&&this.rx_!==e||this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(rt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Xt{put(e,t,n,i){}merge(e,t,n,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Zt{constructor(e){this.allowedEvents_=e,this.listeners_={},re(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let e=0;e<n.length;e++)n[e].callback.apply(n[e].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const i=this.getInitialEvent(e);i&&t.apply(n,i)}off(e,t,n){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let e=0;e<i.length;e++)if(i[e].callback===t&&(!n||n===i[e].context))return void i.splice(e,1)}validateEventType_(e){re(this.allowedEvents_.find((t=>t===e)),"Unknown event: "+e)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class en extends Zt{constructor(){super(["online"]),this.online_=!0,"undefined"==typeof window||void 0===window.addEventListener||pe()||(window.addEventListener("online",(()=>{this.online_||(this.online_=!0,this.trigger("online",!0))}),!1),window.addEventListener("offline",(()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))}),!1))}static getInstance(){return new en}getInitialEvent(e){return re("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class tn{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function nn(){return new tn("")}function sn(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function rn(e){return e.pieces_.length-e.pieceNum_}function on(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new tn(e.pieces_,t)}function an(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function ln(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function cn(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new tn(t,0)}function hn(e,t){const n=[];for(let t=e.pieceNum_;t<e.pieces_.length;t++)n.push(e.pieces_[t]);if(t instanceof tn)for(let e=t.pieceNum_;e<t.pieces_.length;e++)n.push(t.pieces_[e]);else{const e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new tn(n,0)}function un(e){return e.pieceNum_>=e.pieces_.length}function dn(e,t){const n=sn(e),i=sn(t);if(null===n)return t;if(n===i)return dn(on(e),on(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function pn(e,t){if(rn(e)!==rn(t))return!1;for(let n=e.pieceNum_,i=t.pieceNum_;n<=e.pieces_.length;n++,i++)if(e.pieces_[n]!==t.pieces_[i])return!1;return!0}function fn(e,t){let n=e.pieceNum_,i=t.pieceNum_;if(rn(e)>rn(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[i])return!1;++n,++i}return!0}class _n{constructor(e,t){this.errorPrefix_=t,this.parts_=ln(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let e=0;e<this.parts_.length;e++)this.byteLength_+=Ne(this.parts_[e]);mn(this)}}function mn(e){if(e.byteLength_>768)throw new Error(e.errorPrefix_+"has a key path longer than 768 bytes ("+e.byteLength_+").");if(e.parts_.length>32)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+gn(e))}function gn(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class yn extends Zt{constructor(){let e,t;super(["visible"]),"undefined"!=typeof document&&void 0!==document.addEventListener&&(void 0!==document.hidden?(t="visibilitychange",e="hidden"):void 0!==document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):void 0!==document.msHidden?(t="msvisibilitychange",e="msHidden"):void 0!==document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,(()=>{const t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))}),!1)}static getInstance(){return new yn}getInitialEvent(e){return re("visible"===e,"Unknown event type: "+e),[this.visible_]}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const vn=1e3;class Cn extends Xt{constructor(e,t,n,i,s,r,o,a){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=r,this.appCheckTokenProvider_=o,this.authOverride_=a,this.id=Cn.nextPersistentConnectionId_++,this.log_=ft("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=vn,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a&&!fe())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");yn.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&en.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const i=++this.requestNumber_,s={r:i,a:e,b:t};this.log_(ve(s)),re(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),n&&(this.requestCBHash_[i]=n)}get(e){this.initConnection_();const t=new de,n={p:e._path.toString(),q:e._queryObject},i={action:"g",request:n,onComplete:e=>{const i=e.d;"ok"===e.s?(this.onDataUpdate_(n.p,i,!1,null),t.resolve(i)):t.reject(i)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_||setTimeout((()=>{const e=this.outstandingGets_[s];void 0!==e&&i===e&&(delete this.outstandingGets_[s],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),this.log_("get "+s+" timed out on connection"),t.reject(new Error("Client is offline.")))}),3e3),this.connected_&&this.sendGet_(s),t.promise}listen(e,t,n,i){this.initConnection_();const s=e._queryIdentifier,r=e._path.toString();this.log_("Listen called for "+r+" "+s),this.listens.has(r)||this.listens.set(r,new Map),re(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),re(!this.listens.get(r).has(s),"listen() called twice for same path/queryId.");const o={onComplete:i,hashFn:t,query:e,tag:n};this.listens.get(r).set(s,o),this.connected_&&this.sendListen_(o)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,(n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)}))}sendListen_(e){const t=e.query,n=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+n+" for "+i);const s={p:n};e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest("q",s,(s=>{const r=s.d,o=s.s;Cn.warnOnListenWarnings_(r,t);(this.listens.get(n)&&this.listens.get(n).get(i))===e&&(this.log_("listen response",s),"ok"!==o&&this.removeListen_(n,i),e.onComplete&&e.onComplete(o,r))}))}static warnOnListenWarnings_(e,t){if(e&&"object"==typeof e&&be(e,"w")){const n=we(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();gt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},(()=>{})),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&40===e.length||function(e){const t=Ce(e).claims;return"object"==typeof t&&!0===t.admin}(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},(()=>{}))}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=function(e){const t=Ce(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")}(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n.noauth=!0:"object"==typeof this.authOverride_&&(n.authvar=this.authOverride_),this.sendRequest(t,n,(t=>{const n=t.s,i=t.d||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,i))}))}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},(e=>{const t=e.s,n=e.d||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)}))}unlisten(e,t){const n=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+i),re(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query");this.removeListen_(n,i)&&this.connected_&&this.sendUnlisten_(n,i,e._queryObject,t)}sendUnlisten_(e,t,n,i){this.log_("Unlisten on "+e+" for "+t);const s={p:e};i&&(s.q=n,s.t=i),this.sendRequest("n",s)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,i){const s={p:t,d:n};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,(e=>{i&&setTimeout((()=>{i(e.s,e.d)}),Math.floor(0))}))}put(e,t,n,i){this.putInternal("p",e,t,n,i)}merge(e,t,n,i){this.putInternal("m",e,t,n,i)}putInternal(e,t,n,i,s){this.initConnection_();const r={p:t,d:n};void 0!==s&&(r.h=s),this.outstandingPuts_.push({action:e,request:r,onComplete:i}),this.outstandingPutCount_++;const o=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(o):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,(n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),i&&i(n.s,n.d)}))}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,(e=>{if("ok"!==e.s){const t=e.d;this.log_("reportStats","Error sending stats: "+t)}}))}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ve(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t.p,t.d,!1,t.t):"m"===e?this.onDataUpdate_(t.p,t.d,!0,t.t):"c"===e?this.onListenRevoked_(t.p,t.q):"ac"===e?this.onAuthRevoked_(t.s,t.d):"apc"===e?this.onAppCheckRevoked_(t.s,t.d):"sd"===e?this.onSecurityDebugPacket_(t):_t("Unrecognized action received from server: "+ve(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){re(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout((()=>{this.establishConnectionTimer_=null,this.establishConnection_()}),Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=vn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=vn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){if(this.visible_){if(this.lastConnectionEstablishedTime_){(new Date).getTime()-this.lastConnectionEstablishedTime_>3e4&&(this.reconnectDelay_=vn),this.lastConnectionEstablishedTime_=null}}else this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime();const e=(new Date).getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Cn.nextConnectionId_++,s=this.lastSessionId;let r=!1,o=null;const a=function(){o?o.close():(r=!0,n())},l=function(e){re(o,"sendRequest call when we're not connected not allowed."),o.sendRequest(e)};this.realtime_={close:a,sendRequest:l};const c=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[a,l]=await Promise.all([this.authTokenProvider_.getToken(c),this.appCheckTokenProvider_.getToken(c)]);r?pt("getToken() completed but was canceled"):(pt("getToken() completed. Creating connection."),this.authToken_=a&&a.accessToken,this.appCheckToken_=l&&l.token,o=new Jt(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,(e=>{gt(e+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")}),s))}catch(e){this.log_("Failed to get token: "+e),r||(this.repoInfo_.nodeAdmin&&gt(e),a())}}}interrupt(e){pt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){pt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Te(this.interruptReasons_)&&(this.reconnectDelay_=vn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map((e=>It(e))).join("$"):"default";const i=this.removeListen_(e,n);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const n=new tn(e).toString();let i;if(this.listens.has(n)){const e=this.listens.get(n);i=e.get(t),e.delete(t),0===e.size&&this.listens.delete(n)}else i=void 0;return i}onAuthRevoked_(e,t){pt("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){pt("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace("\n","\nFIREBASE: "))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};e["sdk.js."+tt.replace(/\./g,"-")]=1,pe()?e["framework.cordova"]=1:"object"==typeof navigator&&"ReactNative"===navigator.product&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=en.getInstance().currentlyOnline();return Te(this.interruptReasons_)&&e}}Cn.nextPersistentConnectionId_=0,Cn.nextConnectionId_=0;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class bn{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new bn(e,t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class wn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new bn(vt,e),i=new bn(vt,t);return 0!==this.compare(n,i)}minPost(){return bn.MIN}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let Tn;class In extends wn{static get __EMPTY_NODE(){return Tn}static set __EMPTY_NODE(e){Tn=e}compare(e,t){return bt(e.name,t.name)}isDefinedOn(e){throw oe("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return bn.MIN}maxPost(){return new bn(Ct,Tn)}makePost(e,t){return re("string"==typeof e,"KeyIndex indexValue must always be a string."),new bn(e,Tn)}toString(){return".key"}}const kn=new In;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Sn{constructor(e,t,n,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let r=1;for(;!e.isEmpty();)if(e=e,r=t?n(e.key,t):1,i&&(r*=-1),r<0)e=this.isReverse_?e.left:e.right;else{if(0===r){this.nodeStack_.push(e);break}this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}}getNext(){if(0===this.nodeStack_.length)return null;let e,t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class En{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=null!=n?n:En.RED,this.left=null!=i?i:Nn.EMPTY_NODE,this.right=null!=s?s:Nn.EMPTY_NODE}copy(e,t,n,i,s){return new En(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=i?i:this.left,null!=s?s:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):0===s?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Nn.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,i;if(n=this,t(e,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return Nn.EMPTY_NODE;i=n.right.min_(),n=n.copy(i.key,i.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,En.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,En.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}En.RED=!0,En.BLACK=!1;class Nn{constructor(e,t=Nn.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Nn(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,En.BLACK,null,null))}remove(e){return new Nn(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,En.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,i=null;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t){if(n.left.isEmpty())return i?i.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}t<0?n=n.left:t>0&&(i=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Sn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Sn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Sn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Sn(this.root_,null,this.comparator_,!0,e)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function Rn(e,t){return bt(e.name,t.name)}function xn(e,t){return bt(e,t)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let Pn;Nn.EMPTY_NODE=new class{copy(e,t,n,i,s){return this}insert(e,t,n){return new En(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};const Dn=function(e){return"number"==typeof e?"number:"+Et(e):"string:"+e},An=function(e){if(e.isLeafNode()){const t=e.val();re("string"==typeof t||"number"==typeof t||"object"==typeof t&&be(t,".sv"),"Priority must be a string or number.")}else re(e===Pn||e.isEmpty(),"priority of unexpected type.");re(e===Pn||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
let Ln,On,Mn;class Fn{constructor(e,t=Fn.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,re(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),An(this.priorityNode_)}static set __childrenNodeConstructor(e){Ln=e}static get __childrenNodeConstructor(){return Ln}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Fn(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:Fn.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return un(e)?this:".priority"===sn(e)?this.priorityNode_:Fn.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:Fn.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=sn(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:(re(".priority"!==n||1===rn(e),".priority must be the last token in a path"),this.updateImmediateChild(n,Fn.__childrenNodeConstructor.EMPTY_NODE.updateChild(on(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Dn(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",e+="number"===t?Et(this.value_):this.value_,this.lazyHash_=ct(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Fn.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Fn.__childrenNodeConstructor?-1:(re(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,i=Fn.VALUE_TYPE_ORDER.indexOf(t),s=Fn.VALUE_TYPE_ORDER.indexOf(n);return re(i>=0,"Unknown leaf type: "+t),re(s>=0,"Unknown leaf type: "+n),i===s?"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}return!1}}Fn.VALUE_TYPE_ORDER=["object","boolean","number","string"];const $n=new class extends wn{compare(e,t){const n=e.node.getPriority(),i=t.node.getPriority(),s=n.compareTo(i);return 0===s?bt(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return bn.MIN}maxPost(){return new bn(Ct,new Fn("[PRIORITY-POST]",Mn))}makePost(e,t){const n=On(e);return new bn(t,new Fn("[PRIORITY-POST]",n))}toString(){return".priority"}},qn=Math.log(2);
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Wn{constructor(e){var t;this.count=(t=e+1,parseInt(Math.log(t)/qn,10)),this.current_=this.count-1;const n=(i=this.count,parseInt(Array(i+1).join("1"),2));var i;this.bits_=e+1&n}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const zn=function(e,t,n,i){e.sort(t);const s=function(t,i){const r=i-t;let o,a;if(0===r)return null;if(1===r)return o=e[t],a=n?n(o):o,new En(a,o.node,En.BLACK,null,null);{const l=parseInt(r/2,10)+t,c=s(t,l),h=s(l+1,i);return o=e[l],a=n?n(o):o,new En(a,o.node,En.BLACK,c,h)}},r=function(t){let i=null,r=null,o=e.length;const a=function(t,i){const r=o-t,a=o;o-=t;const c=s(r+1,a),h=e[r],u=n?n(h):h;l(new En(u,h.node,i,null,c))},l=function(e){i?(i.left=e,i=e):(r=e,i=e)};for(let e=0;e<t.count;++e){const n=t.nextBitIsOne(),i=Math.pow(2,t.count-(e+1));n?a(i,En.BLACK):(a(i,En.BLACK),a(i,En.RED))}return r}(new Wn(e.length));return new Nn(i||t,r)};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let Un;const Bn={};class Hn{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return re(Bn&&$n,"ChildrenNode.ts has not been loaded"),Un=Un||new Hn({".priority":Bn},{".priority":$n}),Un}get(e){const t=we(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Nn?t:null}hasIndex(e){return be(this.indexSet_,e.toString())}addIndex(e,t){re(e!==kn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let i=!1;const s=t.getIterator(bn.Wrap);let r,o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),n.push(o),o=s.getNext();r=i?zn(n,e.getCompare()):Bn;const a=e.toString(),l=Object.assign({},this.indexSet_);l[a]=e;const c=Object.assign({},this.indexes_);return c[a]=r,new Hn(c,l)}addToIndexes(e,t){const n=Ie(this.indexes_,((n,i)=>{const s=we(this.indexSet_,i);if(re(s,"Missing index implementation for "+i),n===Bn){if(s.isDefinedOn(e.node)){const n=[],i=t.getIterator(bn.Wrap);let r=i.getNext();for(;r;)r.name!==e.name&&n.push(r),r=i.getNext();return n.push(e),zn(n,s.getCompare())}return Bn}{const i=t.get(e.name);let s=n;return i&&(s=s.remove(new bn(e.name,i))),s.insert(e,e.node)}}));return new Hn(n,this.indexSet_)}removeFromIndexes(e,t){const n=Ie(this.indexes_,(n=>{if(n===Bn)return n;{const i=t.get(e.name);return i?n.remove(new bn(e.name,i)):n}}));return new Hn(n,this.indexSet_)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let jn;class Vn{constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&An(this.priorityNode_),this.children_.isEmpty()&&re(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return jn||(jn=new Vn(new Nn(xn),null,Hn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||jn}updatePriority(e){return this.children_.isEmpty()?this:new Vn(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{const t=this.children_.get(e);return null===t?jn:t}}getChild(e){const t=sn(e);return null===t?this:this.getImmediateChild(t).getChild(on(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if(re(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{const n=new bn(e,t);let i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(n,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(n,this.children_));const r=i.isEmpty()?jn:this.priorityNode_;return new Vn(i,r,s)}}updateChild(e,t){const n=sn(e);if(null===n)return t;{re(".priority"!==sn(e)||1===rn(e),".priority must be the last token in a path");const i=this.getImmediateChild(n).updateChild(on(e),t);return this.updateImmediateChild(n,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,i=0,s=!0;if(this.forEachChild($n,((r,o)=>{t[r]=o.val(e),n++,s&&Vn.INTEGER_REGEXP_.test(r)?i=Math.max(i,Number(r)):s=!1})),!e&&s&&i<2*n){const e=[];for(const n in t)e[n]=t[n];return e}return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+Dn(this.getPriority().val())+":"),this.forEachChild($n,((t,n)=>{const i=n.hash();""!==i&&(e+=":"+t+":"+i)})),this.lazyHash_=""===e?"":ct(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const i=this.resolveIndex_(n);if(i){const n=i.getPredecessorKey(new bn(e,t));return n?n.name:null}return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.minKey();return e&&e.name}return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new bn(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.maxKey();return e&&e.name}return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new bn(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal((e=>t(e.name,e.node))):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,(e=>e));{const n=this.children_.getIteratorFrom(e.name,bn.Wrap);let i=n.peek();for(;null!=i&&t.compare(i,e)<0;)n.getNext(),i=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,(e=>e));{const n=this.children_.getReverseIteratorFrom(e.name,bn.Wrap);let i=n.peek();for(;null!=i&&t.compare(i,e)>0;)n.getNext(),i=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Gn?-1:0}withIndex(e){if(e===kn||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new Vn(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===kn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority())){if(this.children_.count()===t.children_.count()){const e=this.getIterator($n),n=t.getIterator($n);let i=e.getNext(),s=n.getNext();for(;i&&s;){if(i.name!==s.name||!i.node.equals(s.node))return!1;i=e.getNext(),s=n.getNext()}return null===i&&null===s}return!1}return!1}}resolveIndex_(e){return e===kn?null:this.indexMap_.get(e.toString())}}Vn.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;const Gn=new class extends Vn{constructor(){super(new Nn(xn),Vn.EMPTY_NODE,Hn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return Vn.EMPTY_NODE}isEmpty(){return!1}};Object.defineProperties(bn,{MIN:{value:new bn(vt,Vn.EMPTY_NODE)},MAX:{value:new bn(Ct,Gn)}}),In.__EMPTY_NODE=Vn.EMPTY_NODE,Fn.__childrenNodeConstructor=Vn,Pn=Gn,function(e){Mn=e}(Gn);function Yn(e,t=null){if(null===e)return Vn.EMPTY_NODE;if("object"==typeof e&&".priority"in e&&(t=e[".priority"]),re(null===t||"string"==typeof t||"number"==typeof t||"object"==typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"==typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!=typeof e||".sv"in e){return new Fn(e,Yn(t))}if(e instanceof Array){let n=Vn.EMPTY_NODE;return St(e,((t,i)=>{if(be(e,t)&&"."!==t.substring(0,1)){const e=Yn(i);!e.isLeafNode()&&e.isEmpty()||(n=n.updateImmediateChild(t,e))}})),n.updatePriority(Yn(t))}{const n=[];let i=!1;if(St(e,((e,t)=>{if("."!==e.substring(0,1)){const s=Yn(t);s.isEmpty()||(i=i||!s.getPriority().isEmpty(),n.push(new bn(e,s)))}})),0===n.length)return Vn.EMPTY_NODE;const s=zn(n,Rn,(e=>e.name),xn);if(i){const e=zn(n,$n.getCompare());return new Vn(s,Yn(t),new Hn({".priority":e},{".priority":$n}))}return new Vn(s,Yn(t),Hn.Default)}}!function(e){On=e}(Yn);
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Kn extends wn{constructor(e){super(),this.indexPath_=e,re(!un(e)&&".priority"!==sn(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),i=this.extractChild(t.node),s=n.compareTo(i);return 0===s?bt(e.name,t.name):s}makePost(e,t){const n=Yn(e),i=Vn.EMPTY_NODE.updateChild(this.indexPath_,n);return new bn(t,i)}maxPost(){const e=Vn.EMPTY_NODE.updateChild(this.indexPath_,Gn);return new bn(Ct,e)}toString(){return ln(this.indexPath_,0).join("/")}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Qn=new class extends wn{compare(e,t){const n=e.node.compareTo(t.node);return 0===n?bt(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return bn.MIN}maxPost(){return bn.MAX}makePost(e,t){const n=Yn(e);return new bn(t,n)}toString(){return".value"}};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Jn(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Xn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=$n}hasStart(){return this.startSet_}hasStartAfter(){return this.startAfterSet_}hasEndBefore(){return this.endBeforeSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return re(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return re(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:vt}hasEnd(){return this.endSet_}getIndexEndValue(){return re(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return re(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ct}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return re(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===$n}copy(){const e=new Xn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Zn(e){const t={};if(e.isDefault())return t;let n;return e.index_===$n?n="$priority":e.index_===Qn?n="$value":e.index_===kn?n="$key":(re(e.index_ instanceof Kn,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=ve(n),e.startSet_&&(t.startAt=ve(e.indexStartValue_),e.startNameSet_&&(t.startAt+=","+ve(e.indexStartName_))),e.endSet_&&(t.endAt=ve(e.indexEndValue_),e.endNameSet_&&(t.endAt+=","+ve(e.indexEndName_))),e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function ei(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_)),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_)),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t.vf=n}return e.index_!==$n&&(t.i=e.index_.toString()),t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ti extends Xt{constructor(e,t,n,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=i,this.log_=ft("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:(re(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,n,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const r=ti.getListenId_(e,n),o={};this.listens_[r]=o;const a=Zn(e._queryParams);this.restRequest_(s+".json",a,((e,t)=>{let a=t;if(404===e&&(a=null,e=null),null===e&&this.onDataUpdate_(s,a,!1,n),we(this.listens_,r)===o){let t;t=e?401===e?"permission_denied":"rest_error:"+e:"ok",i(t,null)}}))}unlisten(e,t){const n=ti.getListenId_(e,t);delete this.listens_[n]}get(e){const t=Zn(e._queryParams),n=e._path.toString(),i=new de;return this.restRequest_(n+".json",t,((e,t)=>{let s=t;404===e&&(s=null,e=null),null===e?(this.onDataUpdate_(n,s,!1,null),i.resolve(s)):i.reject(new Error(s))})),i.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then((([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const r=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+function(e){const t=[];for(const[n,i]of Object.entries(e))Array.isArray(i)?i.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return t.length?"&"+t.join("&"):""}(t);this.log_("Sending REST request for "+r);const o=new XMLHttpRequest;o.onreadystatechange=()=>{if(n&&4===o.readyState){this.log_("REST Response for "+r+" received. status:",o.status,"response:",o.responseText);let e=null;if(o.status>=200&&o.status<300){try{e=ye(o.responseText)}catch(e){gt("Failed to parse JSON response for "+r+": "+o.responseText)}n(null,e)}else 401!==o.status&&404!==o.status&&gt("Got unsuccessful REST response for "+r+" Status: "+o.status),n(o.status);n=null}},o.open("GET",r,!0),o.send()}))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ni{constructor(){this.rootNode_=Vn.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ii(){return{value:null,children:new Map}}function si(e,t,n){if(un(t))e.value=n,e.children.clear();else if(null!==e.value)e.value=e.value.updateChild(t,n);else{const i=sn(t);e.children.has(i)||e.children.set(i,ii());si(e.children.get(i),t=on(t),n)}}function ri(e,t,n){null!==e.value?n(t,e.value):function(e,t){e.children.forEach(((e,n)=>{t(n,e)}))}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e,((e,i)=>{ri(i,new tn(t.toString()+"/"+e),n)}))}class oi{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&St(this.last_,((e,n)=>{t[e]=t[e]-n})),this.last_=e,t}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ai{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new oi(e);const n=1e4+2e4*Math.random();Pt(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;St(e,((e,i)=>{i>0&&be(this.statsToReport_,e)&&(t[e]=i,n=!0)})),n&&this.server_.reportStats(t),Pt(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var li;function ci(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(e){e[e.OVERWRITE=0]="OVERWRITE",e[e.MERGE=1]="MERGE",e[e.ACK_USER_WRITE=2]="ACK_USER_WRITE",e[e.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"}(li||(li={}));class hi{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=li.ACK_USER_WRITE,this.source={fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}operationForChild(e){if(un(this.path)){if(null!=this.affectedTree.value)return re(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new tn(e));return new hi(nn(),t,this.revert)}}return re(sn(this.path)===e,"operationForChild called for unrelated child."),new hi(on(this.path),this.affectedTree,this.revert)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ui{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=li.OVERWRITE}operationForChild(e){return un(this.path)?new ui(this.source,nn(),this.snap.getImmediateChild(e)):new ui(this.source,on(this.path),this.snap)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class di{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=li.MERGE}operationForChild(e){if(un(this.path)){const t=this.children.subtree(new tn(e));return t.isEmpty()?null:t.value?new ui(this.source,nn(),t.value):new di(this.source,nn(),t)}return re(sn(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new di(this.source,on(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class pi{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(un(e))return this.isFullyInitialized()&&!this.filtered_;const t=sn(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}function fi(e,t,n,i,s,r){const o=i.filter((e=>e.type===n));o.sort(((t,n)=>function(e,t,n){if(null==t.childName||null==n.childName)throw oe("Should only compare child_ events.");const i=new bn(t.childName,t.snapshotNode),s=new bn(n.childName,n.snapshotNode);return e.index_.compare(i,s)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e,t,n))),o.forEach((n=>{const i=function(e,t,n){return"value"===t.type||"child_removed"===t.type||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}(e,n,r);s.forEach((s=>{s.respondsTo(n.type)&&t.push(s.createEvent(i,e.query_))}))}))}function _i(e,t){return{eventCache:e,serverCache:t}}function mi(e,t,n,i){return _i(new pi(t,n,i),e.serverCache)}function gi(e,t,n,i){return _i(e.eventCache,new pi(t,n,i))}function yi(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function vi(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let Ci;class bi{constructor(e,t=(()=>(Ci||(Ci=new Nn(wt)),Ci))()){this.value=e,this.children=t}static fromObject(e){let t=new bi(null);return St(e,((e,n)=>{t=t.set(new tn(e),n)})),t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:nn(),value:this.value};if(un(e))return null;{const n=sn(e),i=this.children.get(n);if(null!==i){const s=i.findRootMostMatchingPathAndValue(on(e),t);if(null!=s){return{path:hn(new tn(n),s.path),value:s.value}}return null}return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,(()=>!0))}subtree(e){if(un(e))return this;{const t=sn(e),n=this.children.get(t);return null!==n?n.subtree(on(e)):new bi(null)}}set(e,t){if(un(e))return new bi(t,this.children);{const n=sn(e),i=(this.children.get(n)||new bi(null)).set(on(e),t),s=this.children.insert(n,i);return new bi(this.value,s)}}remove(e){if(un(e))return this.children.isEmpty()?new bi(null):new bi(null,this.children);{const t=sn(e),n=this.children.get(t);if(n){const i=n.remove(on(e));let s;return s=i.isEmpty()?this.children.remove(t):this.children.insert(t,i),null===this.value&&s.isEmpty()?new bi(null):new bi(this.value,s)}return this}}get(e){if(un(e))return this.value;{const t=sn(e),n=this.children.get(t);return n?n.get(on(e)):null}}setTree(e,t){if(un(e))return t;{const n=sn(e),i=(this.children.get(n)||new bi(null)).setTree(on(e),t);let s;return s=i.isEmpty()?this.children.remove(n):this.children.insert(n,i),new bi(this.value,s)}}fold(e){return this.fold_(nn(),e)}fold_(e,t){const n={};return this.children.inorderTraversal(((i,s)=>{n[i]=s.fold_(hn(e,i),t)})),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,nn(),t)}findOnPath_(e,t,n){const i=!!this.value&&n(t,this.value);if(i)return i;if(un(e))return null;{const i=sn(e),s=this.children.get(i);return s?s.findOnPath_(on(e),hn(t,i),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,nn(),t)}foreachOnPath_(e,t,n){if(un(e))return this;{this.value&&n(t,this.value);const i=sn(e),s=this.children.get(i);return s?s.foreachOnPath_(on(e),hn(t,i),n):new bi(null)}}foreach(e){this.foreach_(nn(),e)}foreach_(e,t){this.children.inorderTraversal(((n,i)=>{i.foreach_(hn(e,n),t)})),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal(((t,n)=>{n.value&&e(t,n.value)}))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class wi{constructor(e){this.writeTree_=e}static empty(){return new wi(new bi(null))}}function Ti(e,t,n){if(un(t))return new wi(new bi(n));{const i=e.writeTree_.findRootMostValueAndPath(t);if(null!=i){const s=i.path;let r=i.value;const o=dn(s,t);return r=r.updateChild(o,n),new wi(e.writeTree_.set(s,r))}{const i=new bi(n),s=e.writeTree_.setTree(t,i);return new wi(s)}}}function Ii(e,t,n){let i=e;return St(n,((e,n)=>{i=Ti(i,hn(t,e),n)})),i}function ki(e,t){if(un(t))return wi.empty();{const n=e.writeTree_.setTree(t,new bi(null));return new wi(n)}}function Si(e,t){return null!=Ei(e,t)}function Ei(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(dn(n.path,t)):null}function Ni(e){const t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild($n,((e,n)=>{t.push(new bn(e,n))})):e.writeTree_.children.inorderTraversal(((e,n)=>{null!=n.value&&t.push(new bn(e,n.value))})),t}function Ri(e,t){if(un(t))return e;{const n=Ei(e,t);return new wi(null!=n?new bi(n):e.writeTree_.subtree(t))}}function xi(e){return e.writeTree_.isEmpty()}function Pi(e,t){return Di(nn(),e.writeTree_,t)}function Di(e,t,n){if(null!=t.value)return n.updateChild(e,t.value);{let i=null;return t.children.inorderTraversal(((t,s)=>{".priority"===t?(re(null!==s.value,"Priority writes must always be leaf nodes"),i=s.value):n=Di(hn(e,t),s,n)})),n.getChild(e).isEmpty()||null===i||(n=n.updateChild(hn(e,".priority"),i)),n}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Ai(e,t){return Vi(t,e)}function Li(e,t){const n=e.allWrites.findIndex((e=>e.writeId===t));re(n>=0,"removeWrite called with nonexistent writeId.");const i=e.allWrites[n];e.allWrites.splice(n,1);let s=i.visible,r=!1,o=e.allWrites.length-1;for(;s&&o>=0;){const t=e.allWrites[o];t.visible&&(o>=n&&Oi(t,i.path)?s=!1:fn(i.path,t.path)&&(r=!0)),o--}if(s){if(r)return function(e){e.visibleWrites=Fi(e.allWrites,Mi,nn()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}(e),!0;if(i.snap)e.visibleWrites=ki(e.visibleWrites,i.path);else{St(i.children,(t=>{e.visibleWrites=ki(e.visibleWrites,hn(i.path,t))}))}return!0}return!1}function Oi(e,t){if(e.snap)return fn(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&fn(hn(e.path,n),t))return!0;return!1}function Mi(e){return e.visible}function Fi(e,t,n){let i=wi.empty();for(let s=0;s<e.length;++s){const r=e[s];if(t(r)){const e=r.path;let t;if(r.snap)fn(n,e)?(t=dn(n,e),i=Ti(i,t,r.snap)):fn(e,n)&&(t=dn(e,n),i=Ti(i,nn(),r.snap.getChild(t)));else{if(!r.children)throw oe("WriteRecord should have .snap or .children");if(fn(n,e))t=dn(n,e),i=Ii(i,t,r.children);else if(fn(e,n))if(t=dn(e,n),un(t))i=Ii(i,nn(),r.children);else{const e=we(r.children,sn(t));if(e){const n=e.getChild(on(t));i=Ti(i,nn(),n)}}}}}return i}function $i(e,t,n,i,s){if(i||s){const r=Ri(e.visibleWrites,t);if(!s&&xi(r))return n;if(s||null!=n||Si(r,nn())){const r=function(e){return(e.visible||s)&&(!i||!~i.indexOf(e.writeId))&&(fn(e.path,t)||fn(t,e.path))};return Pi(Fi(e.allWrites,r,t),n||Vn.EMPTY_NODE)}return null}{const i=Ei(e.visibleWrites,t);if(null!=i)return i;{const i=Ri(e.visibleWrites,t);if(xi(i))return n;if(null!=n||Si(i,nn())){return Pi(i,n||Vn.EMPTY_NODE)}return null}}}function qi(e,t,n,i){return $i(e.writeTree,e.treePath,t,n,i)}function Wi(e,t){return function(e,t,n){let i=Vn.EMPTY_NODE;const s=Ei(e.visibleWrites,t);if(s)return s.isLeafNode()||s.forEachChild($n,((e,t)=>{i=i.updateImmediateChild(e,t)})),i;if(n){const s=Ri(e.visibleWrites,t);return n.forEachChild($n,((e,t)=>{const n=Pi(Ri(s,new tn(e)),t);i=i.updateImmediateChild(e,n)})),Ni(s).forEach((e=>{i=i.updateImmediateChild(e.name,e.node)})),i}return Ni(Ri(e.visibleWrites,t)).forEach((e=>{i=i.updateImmediateChild(e.name,e.node)})),i}(e.writeTree,e.treePath,t)}function zi(e,t,n,i){return function(e,t,n,i,s){re(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=hn(t,n);if(Si(e.visibleWrites,r))return null;{const t=Ri(e.visibleWrites,r);return xi(t)?s.getChild(n):Pi(t,s.getChild(n))}}(e.writeTree,e.treePath,t,n,i)}function Ui(e,t){return function(e,t){return Ei(e.visibleWrites,t)}(e.writeTree,hn(e.treePath,t))}function Bi(e,t,n,i,s,r){return function(e,t,n,i,s,r,o){let a;const l=Ri(e.visibleWrites,t),c=Ei(l,nn());if(null!=c)a=c;else{if(null==n)return[];a=Pi(l,n)}if(a=a.withIndex(o),a.isEmpty()||a.isLeafNode())return[];{const e=[],t=o.getCompare(),n=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let l=n.getNext();for(;l&&e.length<s;)0!==t(l,i)&&e.push(l),l=n.getNext();return e}}(e.writeTree,e.treePath,t,n,i,s,r)}function Hi(e,t,n){return function(e,t,n,i){const s=hn(t,n),r=Ei(e.visibleWrites,s);if(null!=r)return r;if(i.isCompleteForChild(n))return Pi(Ri(e.visibleWrites,s),i.getNode().getImmediateChild(n));return null}(e.writeTree,e.treePath,t,n)}function ji(e,t){return Vi(hn(e.treePath,t),e.writeTree)}function Vi(e,t){return{treePath:e,writeTree:t}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Gi{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;re("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),re(".priority"!==n,"Only non-priority child changes can be tracked.");const i=this.changeMap.get(n);if(i){const r=i.type;if("child_added"===t&&"child_removed"===r)this.changeMap.set(n,Jn(n,e.snapshotNode,i.snapshotNode));else if("child_removed"===t&&"child_added"===r)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===r)this.changeMap.set(n,(s=n,{type:"child_removed",snapshotNode:i.oldSnap,childName:s}));else if("child_changed"===t&&"child_added"===r)this.changeMap.set(n,function(e,t){return{type:"child_added",snapshotNode:t,childName:e}}(n,e.snapshotNode));else{if("child_changed"!==t||"child_changed"!==r)throw oe("Illegal combination of changes: "+e+" occurred after "+i);this.changeMap.set(n,Jn(n,e.snapshotNode,i.oldSnap))}}else this.changeMap.set(n,e);var s}getChanges(){return Array.from(this.changeMap.values())}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Yi=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}};class Ki{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const t=null!=this.optCompleteServerCache_?new pi(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Hi(this.writes_,e,t)}}getChildAfterChild(e,t,n){const i=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:vi(this.viewCache_),s=Bi(this.writes_,i,t,1,n,e);return 0===s.length?null:s[0]}}function Qi(e,t,n,i,s){const r=new Gi;let o,a;if(n.type===li.OVERWRITE){const l=n;l.source.fromUser?o=Zi(e,t,l.path,l.snap,i,s,r):(re(l.source.fromServer,"Unknown source."),a=l.source.tagged||t.serverCache.isFiltered()&&!un(l.path),o=Xi(e,t,l.path,l.snap,i,s,a,r))}else if(n.type===li.MERGE){const l=n;l.source.fromUser?o=function(e,t,n,i,s,r,o){let a=t;return i.foreach(((i,l)=>{const c=hn(n,i);es(t,sn(c))&&(a=Zi(e,a,c,l,s,r,o))})),i.foreach(((i,l)=>{const c=hn(n,i);es(t,sn(c))||(a=Zi(e,a,c,l,s,r,o))})),a}(e,t,l.path,l.children,i,s,r):(re(l.source.fromServer,"Unknown source."),a=l.source.tagged||t.serverCache.isFiltered(),o=ns(e,t,l.path,l.children,i,s,a,r))}else if(n.type===li.ACK_USER_WRITE){const a=n;o=a.revert?function(e,t,n,i,s,r){let o;if(null!=Ui(i,n))return t;{const a=new Ki(i,t,s),l=t.eventCache.getNode();let c;if(un(n)||".priority"===sn(n)){let n;if(t.serverCache.isFullyInitialized())n=qi(i,vi(t));else{const e=t.serverCache.getNode();re(e instanceof Vn,"serverChildren would be complete if leaf node"),n=Wi(i,e)}n=n,c=e.filter.updateFullNode(l,n,r)}else{const s=sn(n);let h=Hi(i,s,t.serverCache);null==h&&t.serverCache.isCompleteForChild(s)&&(h=l.getImmediateChild(s)),c=null!=h?e.filter.updateChild(l,s,h,on(n),a,r):t.eventCache.getNode().hasChild(s)?e.filter.updateChild(l,s,Vn.EMPTY_NODE,on(n),a,r):l,c.isEmpty()&&t.serverCache.isFullyInitialized()&&(o=qi(i,vi(t)),o.isLeafNode()&&(c=e.filter.updateFullNode(c,o,r)))}return o=t.serverCache.isFullyInitialized()||null!=Ui(i,nn()),mi(t,c,o,e.filter.filtersNodes())}}(e,t,a.path,i,s,r):function(e,t,n,i,s,r,o){if(null!=Ui(s,n))return t;const a=t.serverCache.isFiltered(),l=t.serverCache;if(null!=i.value){if(un(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Xi(e,t,n,l.getNode().getChild(n),s,r,a,o);if(un(n)){let i=new bi(null);return l.getNode().forEachChild(kn,((e,t)=>{i=i.set(new tn(e),t)})),ns(e,t,n,i,s,r,a,o)}return t}{let c=new bi(null);return i.foreach(((e,t)=>{const i=hn(n,e);l.isCompleteForPath(i)&&(c=c.set(e,l.getNode().getChild(i)))})),ns(e,t,n,c,s,r,a,o)}}(e,t,a.path,a.affectedTree,i,s,r)}else{if(n.type!==li.LISTEN_COMPLETE)throw oe("Unknown operation type: "+n.type);o=function(e,t,n,i,s){const r=t.serverCache,o=gi(t,r.getNode(),r.isFullyInitialized()||un(n),r.isFiltered());return Ji(e,o,n,i,Yi,s)}(e,t,n.path,i,r)}const l=r.getChanges();return function(e,t,n){const i=t.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=yi(e);(n.length>0||!e.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push({type:"value",snapshotNode:yi(t)})}}(t,o,l),{viewCache:o,changes:l}}function Ji(e,t,n,i,s,r){const o=t.eventCache;if(null!=Ui(i,n))return t;{let a,l;if(un(n))if(re(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const n=vi(t),s=Wi(i,n instanceof Vn?n:Vn.EMPTY_NODE);a=e.filter.updateFullNode(t.eventCache.getNode(),s,r)}else{const n=qi(i,vi(t));a=e.filter.updateFullNode(t.eventCache.getNode(),n,r)}else{const c=sn(n);if(".priority"===c){re(1===rn(n),"Can't have a priority with additional path components");const s=o.getNode();l=t.serverCache.getNode();const r=zi(i,n,s,l);a=null!=r?e.filter.updatePriority(s,r):o.getNode()}else{const h=on(n);let u;if(o.isCompleteForChild(c)){l=t.serverCache.getNode();const e=zi(i,n,o.getNode(),l);u=null!=e?o.getNode().getImmediateChild(c).updateChild(h,e):o.getNode().getImmediateChild(c)}else u=Hi(i,c,t.serverCache);a=null!=u?e.filter.updateChild(o.getNode(),c,u,h,s,r):o.getNode()}}return mi(t,a,o.isFullyInitialized()||un(n),e.filter.filtersNodes())}}function Xi(e,t,n,i,s,r,o,a){const l=t.serverCache;let c;const h=o?e.filter:e.filter.getIndexedFilter();if(un(n))c=h.updateFullNode(l.getNode(),i,null);else if(h.filtersNodes()&&!l.isFiltered()){const e=l.getNode().updateChild(n,i);c=h.updateFullNode(l.getNode(),e,null)}else{const e=sn(n);if(!l.isCompleteForPath(n)&&rn(n)>1)return t;const s=on(n),r=l.getNode().getImmediateChild(e).updateChild(s,i);c=".priority"===e?h.updatePriority(l.getNode(),r):h.updateChild(l.getNode(),e,r,s,Yi,null)}const u=gi(t,c,l.isFullyInitialized()||un(n),h.filtersNodes());return Ji(e,u,n,s,new Ki(s,u,r),a)}function Zi(e,t,n,i,s,r,o){const a=t.eventCache;let l,c;const h=new Ki(s,t,r);if(un(n))c=e.filter.updateFullNode(t.eventCache.getNode(),i,o),l=mi(t,c,!0,e.filter.filtersNodes());else{const s=sn(n);if(".priority"===s)c=e.filter.updatePriority(t.eventCache.getNode(),i),l=mi(t,c,a.isFullyInitialized(),a.isFiltered());else{const r=on(n),c=a.getNode().getImmediateChild(s);let u;if(un(r))u=i;else{const e=h.getCompleteChild(s);u=null!=e?".priority"===an(r)&&e.getChild(cn(r)).isEmpty()?e:e.updateChild(r,i):Vn.EMPTY_NODE}if(c.equals(u))l=t;else{l=mi(t,e.filter.updateChild(a.getNode(),s,u,r,h,o),a.isFullyInitialized(),e.filter.filtersNodes())}}}return l}function es(e,t){return e.eventCache.isCompleteForChild(t)}function ts(e,t,n){return n.foreach(((e,n)=>{t=t.updateChild(e,n)})),t}function ns(e,t,n,i,s,r,o,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let l,c=t;l=un(n)?i:new bi(null).setTree(n,i);const h=t.serverCache.getNode();return l.children.inorderTraversal(((n,i)=>{if(h.hasChild(n)){const l=ts(0,t.serverCache.getNode().getImmediateChild(n),i);c=Xi(e,c,new tn(n),l,s,r,o,a)}})),l.children.inorderTraversal(((n,i)=>{const l=!t.serverCache.isCompleteForChild(n)&&void 0===i.value;if(!h.hasChild(n)&&!l){const l=ts(0,t.serverCache.getNode().getImmediateChild(n),i);c=Xi(e,c,new tn(n),l,s,r,o,a)}})),c}function is(e,t){const n=vi(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!un(t)&&!n.getImmediateChild(sn(t)).isEmpty())?n.getChild(t):null}function ss(e,t,n,i){t.type===li.MERGE&&null!==t.source.queryId&&(re(vi(e.viewCache_),"We should always have a full cache before handling merges"),re(yi(e.viewCache_),"Missing event cache, even though we have a server cache"));const s=e.viewCache_,r=Qi(e.processor_,s,t,n,i);var o,a;return o=e.processor_,a=r.viewCache,re(a.eventCache.getNode().isIndexed(o.filter.getIndex()),"Event snap not indexed"),re(a.serverCache.getNode().isIndexed(o.filter.getIndex()),"Server snap not indexed"),re(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=r.viewCache,function(e,t,n,i){const s=i?[i]:e.eventRegistrations_;return function(e,t,n,i){const s=[],r=[];return t.forEach((t=>{var n;"child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&r.push((n=t.childName,{type:"child_moved",snapshotNode:t.snapshotNode,childName:n}))})),fi(e,s,"child_removed",t,i,n),fi(e,s,"child_added",t,i,n),fi(e,s,"child_moved",r,i,n),fi(e,s,"child_changed",t,i,n),fi(e,s,"value",t,i,n),s}(e.eventGenerator_,t,n,s)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e,r.changes,r.viewCache.eventCache.getNode(),null)}let rs,os;function as(e,t,n,i){const s=t.source.queryId;if(null!==s){const r=e.views.get(s);return re(null!=r,"SyncTree gave us an op for an invalid query."),ss(r,t,n,i)}{let s=[];for(const r of e.views.values())s=s.concat(ss(r,t,n,i));return s}}function ls(e,t){let n=null;for(const i of e.views.values())n=n||is(i,t);return n}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class cs{constructor(e){this.listenProvider_=e,this.syncPointTree_=new bi(null),this.pendingWriteTree_={visibleWrites:wi.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function hs(e,t,n,i,s){return function(e,t,n,i,s){re(i>e.lastWriteId,"Stacking an older write on top of newer ones"),void 0===s&&(s=!0),e.allWrites.push({path:t,snap:n,writeId:i,visible:s}),s&&(e.visibleWrites=Ti(e.visibleWrites,t,n)),e.lastWriteId=i}(e.pendingWriteTree_,t,n,i,s),s?fs(e,new ui({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,n)):[]}function us(e,t,n=!1){const i=function(e,t){for(let n=0;n<e.allWrites.length;n++){const i=e.allWrites[n];if(i.writeId===t)return i}return null}(e.pendingWriteTree_,t);if(Li(e.pendingWriteTree_,t)){let t=new bi(null);return null!=i.snap?t=t.set(nn(),!0):St(i.children,(e=>{t=t.set(new tn(e),!0)})),fs(e,new hi(i.path,t,n))}return[]}function ds(e,t,n){return fs(e,new ui({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,n))}function ps(e,t,n){const i=e.pendingWriteTree_,s=e.syncPointTree_.findOnPath(t,((e,n)=>{const i=ls(n,dn(e,t));if(i)return i}));return $i(i,t,s,n,!0)}function fs(e,t){return _s(t,e.syncPointTree_,null,Ai(e.pendingWriteTree_,nn()))}function _s(e,t,n,i){if(un(e.path))return ms(e,t,n,i);{const s=t.get(nn());null==n&&null!=s&&(n=ls(s,nn()));let r=[];const o=sn(e.path),a=e.operationForChild(o),l=t.children.get(o);if(l&&a){const e=n?n.getImmediateChild(o):null,t=ji(i,o);r=r.concat(_s(a,l,e,t))}return s&&(r=r.concat(as(s,e,i,n))),r}}function ms(e,t,n,i){const s=t.get(nn());null==n&&null!=s&&(n=ls(s,nn()));let r=[];return t.children.inorderTraversal(((t,s)=>{const o=n?n.getImmediateChild(t):null,a=ji(i,t),l=e.operationForChild(t);l&&(r=r.concat(ms(l,s,o,a)))})),s&&(r=r.concat(as(s,e,i,n))),r}function gs(e,t){return e.tagToQueryMap.get(t)}function ys(e){const t=e.indexOf("$");return re(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new tn(e.substr(0,t))}}function vs(e,t,n){const i=e.syncPointTree_.get(t);re(i,"Missing sync point for query tag that we're tracking");return as(i,n,Ai(e.pendingWriteTree_,t),null)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Cs{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Cs(t)}node(){return this.node_}}class bs{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=hn(this.path_,e);return new bs(this.syncTree_,t)}node(){return ps(this.syncTree_,this.path_)}}const ws=function(e,t,n){return e&&"object"==typeof e?(re(".sv"in e,"Unexpected leaf node or priority contents"),"string"==typeof e[".sv"]?Ts(e[".sv"],t,n):"object"==typeof e[".sv"]?Is(e[".sv"],t):void re(!1,"Unexpected server value: "+JSON.stringify(e,null,2))):e},Ts=function(e,t,n){if("timestamp"===e)return n.timestamp;re(!1,"Unexpected server value: "+e)},Is=function(e,t,n){e.hasOwnProperty("increment")||re(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const i=e.increment;"number"!=typeof i&&re(!1,"Unexpected increment value: "+i);const s=t.node();if(re(null!=s,"Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const r=s.getValue();return"number"!=typeof r?i:r+i},ks=function(e,t,n){return Ss(e,new Cs(t),n)};function Ss(e,t,n){const i=e.getPriority().val(),s=ws(i,t.getImmediateChild(".priority"),n);let r;if(e.isLeafNode()){const i=e,r=ws(i.getValue(),t,n);return r!==i.getValue()||s!==i.getPriority().val()?new Fn(r,Yn(s)):e}{const i=e;return r=i,s!==i.getPriority().val()&&(r=r.updatePriority(new Fn(s))),i.forEachChild($n,((e,i)=>{const s=Ss(i,t.getImmediateChild(e),n);s!==i&&(r=r.updateImmediateChild(e,s))})),r}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Es{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function Ns(e,t){let n=t instanceof tn?t:new tn(t),i=e,s=sn(n);for(;null!==s;){const e=we(i.node.children,s)||{children:{},childCount:0};i=new Es(s,i,e),n=on(n),s=sn(n)}return i}function Rs(e){return e.node.value}function xs(e,t){e.node.value=t,Os(e)}function Ps(e){return e.node.childCount>0}function Ds(e,t){St(e.node.children,((n,i)=>{t(new Es(n,e,i))}))}function As(e,t,n,i){n&&!i&&t(e),Ds(e,(e=>{As(e,t,!0,i)})),n&&i&&t(e)}function Ls(e){return new tn(null===e.parent?e.name:Ls(e.parent)+"/"+e.name)}function Os(e){null!==e.parent&&function(e,t,n){const i=function(e){return void 0===Rs(e)&&!Ps(e)}(n),s=be(e.node.children,t);i&&s?(delete e.node.children[t],e.node.childCount--,Os(e)):i||s||(e.node.children[t]=n.node,e.node.childCount++,Os(e))}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(e.parent,e.name,e)}const Ms=/[\[\].#$\/\u0000-\u001F\u007F]/,Fs=/[\[\].#$\u0000-\u001F\u007F]/,$s=10485760,qs=function(e){return"string"==typeof e&&0!==e.length&&!Ms.test(e)},Ws=function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),function(e){return"string"==typeof e&&0!==e.length&&!Fs.test(e)}(e)},zs=function(e,t,n){const i=n instanceof tn?new _n(n,e):n;if(void 0===t)throw new Error(e+"contains undefined "+gn(i));if("function"==typeof t)throw new Error(e+"contains a function "+gn(i)+" with contents = "+t.toString());if(yt(t))throw new Error(e+"contains "+t.toString()+" "+gn(i));if("string"==typeof t&&t.length>$s/3&&Ne(t)>$s)throw new Error(e+"contains a string greater than "+"10485760 utf8 bytes "+gn(i)+" ('"+t.substring(0,50)+"...')");if(t&&"object"==typeof t){let n=!1,s=!1;if(St(t,((t,r)=>{if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(s=!0,!qs(t)))throw new Error(e+" contains an invalid key ("+t+") "+gn(i)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');var o,a;a=t,(o=i).parts_.length>0&&(o.byteLength_+=1),o.parts_.push(a),o.byteLength_+=Ne(a),mn(o),zs(e,r,i),function(e){const t=e.parts_.pop();e.byteLength_-=Ne(t),e.parts_.length>0&&(e.byteLength_-=1)}(i)})),n&&s)throw new Error(e+' contains ".value" child '+gn(i)+" in addition to actual children.")}};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Us{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Bs(e,t,n){!function(e,t){let n=null;for(let i=0;i<t.length;i++){const s=t[i],r=s.getPath();null===n||pn(r,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:r}),n.events.push(s)}n&&e.eventLists_.push(n)}(e,n),function(e,t){e.recursionDepth_++;let n=!0;for(let i=0;i<e.eventLists_.length;i++){const s=e.eventLists_[i];if(s){t(s.path)?(Hs(e.eventLists_[i]),e.eventLists_[i]=null):n=!1}}n&&(e.eventLists_=[]);e.recursionDepth_--}(e,(e=>fn(e,t)||fn(t,e)))}function Hs(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(null!==n){e.events[t]=null;const i=n.getEventRunner();ut&&pt("event: "+n.toString()),xt(i)}}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class js{constructor(e,t,n,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Us,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ii(),this.transactionQueueTree_=new Es,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Vs(e,t,n){if(e.stats_=Bt(e.repoInfo_),e.forceRestClient_||("object"==typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0)e.server_=new ti(e.repoInfo_,((t,n,i,s)=>{Ks(e,t,n,i,s)}),e.authTokenProvider_,e.appCheckProvider_),setTimeout((()=>Qs(e,!0)),0);else{if(null!=n){if("object"!=typeof n)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ve(n)}catch(e){throw new Error("Invalid authOverride provided: "+e)}}e.persistentConnection_=new Cn(e.repoInfo_,t,((t,n,i,s)=>{Ks(e,t,n,i,s)}),(t=>{Qs(e,t)}),(t=>{!function(e,t){St(t,((t,n)=>{Js(e,t,n)}))}(e,t)}),e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener((t=>{e.server_.refreshAuthToken(t)})),e.appCheckProvider_.addTokenChangeListener((t=>{e.server_.refreshAppCheckToken(t.token)})),e.statsReporter_=function(e,t){const n=e.toString();return Ut[n]||(Ut[n]=t()),Ut[n]}(e.repoInfo_,(()=>new ai(e.stats_,e.server_))),e.infoData_=new ni,e.infoSyncTree_=new cs({startListening:(t,n,i,s)=>{let r=[];const o=e.infoData_.getNode(t._path);return o.isEmpty()||(r=ds(e.infoSyncTree_,t._path,o),setTimeout((()=>{s("ok")}),0)),r},stopListening:()=>{}}),Js(e,"connected",!1),e.serverSyncTree_=new cs({startListening:(t,n,i,s)=>(e.server_.listen(t,i,n,((n,i)=>{const r=s(n,i);Bs(e.eventQueue_,t._path,r)})),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function Gs(e){const t=e.infoData_.getNode(new tn(".info/serverTimeOffset")).val()||0;return(new Date).getTime()+t}function Ys(e){return(t=(t={timestamp:Gs(e)})||{}).timestamp=t.timestamp||(new Date).getTime(),t;var t}function Ks(e,t,n,i,s){e.dataUpdateCount++;const r=new tn(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let o=[];if(s)if(i){const t=Ie(n,(e=>Yn(e)));o=function(e,t,n,i){const s=gs(e,i);if(s){const i=ys(s),r=i.path,o=i.queryId,a=dn(r,t),l=bi.fromObject(n);return vs(e,r,new di(ci(o),a,l))}return[]}(e.serverSyncTree_,r,t,s)}else{const t=Yn(n);o=function(e,t,n,i){const s=gs(e,i);if(null!=s){const i=ys(s),r=i.path,o=i.queryId,a=dn(r,t);return vs(e,r,new ui(ci(o),a,n))}return[]}(e.serverSyncTree_,r,t,s)}else if(i){const t=Ie(n,(e=>Yn(e)));o=function(e,t,n){const i=bi.fromObject(n);return fs(e,new di({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,i))}(e.serverSyncTree_,r,t)}else{const t=Yn(n);o=ds(e.serverSyncTree_,r,t)}let a=r;o.length>0&&(a=nr(e,r)),Bs(e.eventQueue_,a,o)}function Qs(e,t){Js(e,"connected",t),!1===t&&function(e){Zs(e,"onDisconnectEvents");const t=Ys(e),n=ii();ri(e.onDisconnect_,nn(),((i,s)=>{const r=function(e,t,n,i){return Ss(t,new bs(n,e),i)}(i,s,e.serverSyncTree_,t);si(n,i,r)}));let i=[];ri(n,nn(),((t,n)=>{i=i.concat(ds(e.serverSyncTree_,t,n));const s=function(e,t){const n=Ls(ir(e,t)),i=Ns(e.transactionQueueTree_,t);return function(e,t,n){let i=n?e:e.parent;for(;null!==i;){if(t(i))return!0;i=i.parent}}(i,(t=>{ar(e,t)})),ar(e,i),As(i,(t=>{ar(e,t)})),n}(e,t);nr(e,s)})),e.onDisconnect_=ii(),Bs(e.eventQueue_,nn(),i)}(e)}function Js(e,t,n){const i=new tn("/.info/"+t),s=Yn(n);e.infoData_.updateSnapshot(i,s);const r=ds(e.infoSyncTree_,i,s);Bs(e.eventQueue_,i,r)}function Xs(e){return e.nextWriteId_++}function Zs(e,...t){let n="";e.persistentConnection_&&(n=e.persistentConnection_.id+":"),pt(n,...t)}function er(e,t,n){return ps(e.serverSyncTree_,t,n)||Vn.EMPTY_NODE}function tr(e,t=e.transactionQueueTree_){if(t||or(e,t),Rs(t)){const n=sr(e,t);re(n.length>0,"Sending zero length transaction queue");n.every((e=>0===e.status))&&function(e,t,n){const i=n.map((e=>e.currentWriteId)),s=er(e,t,i);let r=s;const o=s.hash();for(let e=0;e<n.length;e++){const i=n[e];re(0===i.status,"tryToSendTransactionQueue_: items in queue should all be run."),i.status=1,i.retryCount++;const s=dn(t,i.path);r=r.updateChild(s,i.currentOutputSnapshotRaw)}const a=r.val(!0),l=t;e.server_.put(l.toString(),a,(i=>{Zs(e,"transaction put response",{path:l.toString(),status:i});let s=[];if("ok"===i){const i=[];for(let t=0;t<n.length;t++)n[t].status=2,s=s.concat(us(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&i.push((()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved))),n[t].unwatcher();or(e,Ns(e.transactionQueueTree_,t)),tr(e,e.transactionQueueTree_),Bs(e.eventQueue_,t,s);for(let e=0;e<i.length;e++)xt(i[e])}else{if("datastale"===i)for(let e=0;e<n.length;e++)3===n[e].status?n[e].status=4:n[e].status=0;else{gt("transaction at "+l.toString()+" failed: "+i);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=i}nr(e,t)}}),o)}(e,Ls(t),n)}else Ps(t)&&Ds(t,(t=>{tr(e,t)}))}function nr(e,t){const n=ir(e,t),i=Ls(n);return function(e,t,n){if(0===t.length)return;const i=[];let s=[];const r=t.filter((e=>0===e.status)).map((e=>e.currentWriteId));for(let a=0;a<t.length;a++){const l=t[a],c=dn(n,l.path);let h,u=!1;if(re(null!==c,"rerunTransactionsUnderNode_: relativePath should not be null."),4===l.status)u=!0,h=l.abortReason,s=s.concat(us(e.serverSyncTree_,l.currentWriteId,!0));else if(0===l.status)if(l.retryCount>=25)u=!0,h="maxretry",s=s.concat(us(e.serverSyncTree_,l.currentWriteId,!0));else{const n=er(e,l.path,r);l.currentInputSnapshot=n;const i=t[a].update(n.val());if(void 0!==i){zs("transaction failed: Data returned ",i,l.path);let t=Yn(i);"object"==typeof i&&null!=i&&be(i,".priority")||(t=t.updatePriority(n.getPriority()));const o=l.currentWriteId,a=Ys(e),c=ks(t,n,a);l.currentOutputSnapshotRaw=t,l.currentOutputSnapshotResolved=c,l.currentWriteId=Xs(e),r.splice(r.indexOf(o),1),s=s.concat(hs(e.serverSyncTree_,l.path,c,l.currentWriteId,l.applyLocally)),s=s.concat(us(e.serverSyncTree_,o,!0))}else u=!0,h="nodata",s=s.concat(us(e.serverSyncTree_,l.currentWriteId,!0))}Bs(e.eventQueue_,n,s),s=[],u&&(t[a].status=2,o=t[a].unwatcher,setTimeout(o,Math.floor(0)),t[a].onComplete&&("nodata"===h?i.push((()=>t[a].onComplete(null,!1,t[a].currentInputSnapshot))):i.push((()=>t[a].onComplete(new Error(h),!1,null)))))}var o;or(e,e.transactionQueueTree_);for(let e=0;e<i.length;e++)xt(i[e]);tr(e,e.transactionQueueTree_)}(e,sr(e,n),i),i}function ir(e,t){let n,i=e.transactionQueueTree_;for(n=sn(t);null!==n&&void 0===Rs(i);)i=Ns(i,n),n=sn(t=on(t));return i}function sr(e,t){const n=[];return rr(e,t,n),n.sort(((e,t)=>e.order-t.order)),n}function rr(e,t,n){const i=Rs(t);if(i)for(let e=0;e<i.length;e++)n.push(i[e]);Ds(t,(t=>{rr(e,t,n)}))}function or(e,t){const n=Rs(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,xs(t,n.length>0?n:void 0)}Ds(t,(t=>{or(e,t)}))}function ar(e,t){const n=Rs(t);if(n){const i=[];let s=[],r=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?(re(r===t-1,"All SENT items should be at beginning of queue."),r=t,n[t].status=3,n[t].abortReason="set"):(re(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),s=s.concat(us(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&i.push(n[t].onComplete.bind(null,new Error("set"),!1,null))));-1===r?xs(t,void 0):n.length=r+1,Bs(e.eventQueue_,Ls(t),s);for(let e=0;e<i.length;e++)xt(i[e])}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const lr=function(e,t){const n=cr(e),i=n.namespace;"firebase.com"===n.domain&&mt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),i&&"undefined"!==i||"localhost"===n.domain||mt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||"undefined"!=typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&gt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");const s="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new $t(n.host,n.secure,i,t,s,"",i!==n.subdomain),path:new tn(n.pathString)}},cr=function(e){let t="",n="",i="",s="",r="",o=!0,a="https",l=443;if("string"==typeof e){let c=e.indexOf("//");c>=0&&(a=e.substring(0,c-1),e=e.substring(c+2));let h=e.indexOf("/");-1===h&&(h=e.length);let u=e.indexOf("?");-1===u&&(u=e.length),t=e.substring(0,Math.min(h,u)),h<u&&(s=function(e){let t="";const n=e.split("/");for(let e=0;e<n.length;e++)if(n[e].length>0){let i=n[e];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch(e){}t+="/"+i}return t}(e.substring(h,u)));const d=function(e){const t={};"?"===e.charAt(0)&&(e=e.substring(1));for(const n of e.split("&")){if(0===n.length)continue;const i=n.split("=");2===i.length?t[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):gt(`Invalid query segment '${n}' in query '${e}'`)}return t}(e.substring(Math.min(e.length,u)));c=t.indexOf(":"),c>=0?(o="https"===a||"wss"===a,l=parseInt(t.substring(c+1),10)):c=t.length;const p=t.slice(0,c);if("localhost"===p.toLowerCase())n="localhost";else if(p.split(".").length<=2)n=p;else{const e=t.indexOf(".");i=t.substring(0,e).toLowerCase(),n=t.substring(e+1),r=i}"ns"in d&&(r=d.ns)}return{host:t,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class hr{constructor(e,t,n,i){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=i}get key(){return un(this._path)?null:an(this._path)}get ref(){return new ur(this._repo,this._path)}get _queryIdentifier(){const e=ei(this._queryParams),t=It(e);return"{}"===t?"default":t}get _queryObject(){return ei(this._queryParams)}isEqual(e){
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
var t;if(!((e=(t=e)&&t._delegate?t._delegate:t)instanceof hr))return!1;const n=this._repo===e._repo,i=pn(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}(this._path)}}class ur extends hr{constructor(e,t){super(e,t,new Xn,!1)}get parent(){const e=cn(this._path);return null===e?null:new ur(this._repo,e)}get root(){let e=this;for(;null!==e.parent;)e=e.parent;return e}}!function(e){re(!rs,"__referenceConstructor has already been defined"),rs=e}(ur),function(e){re(!os,"__referenceConstructor has already been defined"),os=e}(ur);
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const dr={};function pr(e,t,n,i,s){let r=i||e.options.databaseURL;void 0===r&&(e.options.projectId||mt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),pt("Using default host for project ",e.options.projectId),r=`${e.options.projectId}-default-rtdb.firebaseio.com`);let o,a,l=lr(r,s),c=l.repoInfo;"undefined"!=typeof process&&(a=process.env.FIREBASE_DATABASE_EMULATOR_HOST),a?(o=!0,r=`http://${a}?ns=${c.namespace}`,l=lr(r,s),c=l.repoInfo):o=!l.repoInfo.secure;const h=s&&o?new Lt(Lt.OWNER):new At(e.name,e.options,t);!function(e,t){const n=t.path.toString();if("string"!=typeof t.repoInfo.host||0===t.repoInfo.host.length||!qs(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==n.length&&!Ws(n))throw new Error(function(e,t){return`${e} failed: ${"url"} argument `}(e)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')}("Invalid Firebase Database URL",l),un(l.path)||mt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=function(e,t,n,i){let s=dr[t.name];s||(s={},dr[t.name]=s);let r=s[e.toURLString()];r&&mt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");return r=new js(e,false,n,i),s[e.toURLString()]=r,r}(c,e,h,new Dt(e.name,n));return new fr(u,e)}class fr{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Vs(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ur(this._repo,nn())),this._rootInternal}_delete(){return null!==this._rootInternal&&(!function(e,t){const n=dr[t];n&&n[e.key]===e||mt(`Database ${t}(${e.repoInfo_}) has already been deleted.`),function(e){e.persistentConnection_&&e.persistentConnection_.interrupt("repo_interrupt")}(e),delete n[e.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&mt("Cannot call "+e+" on a deleted database.")}}Cn.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},Cn.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)},
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
function(e){!function(e){tt=e}("9.1.3"),Ye(new Re("database",((e,{instanceIdentifier:t})=>pr(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t)),"PUBLIC").setMultipleInstances(!0)),Je(Ze,et,e),Je(Ze,et,"esm2017")}();!function(e,t={}){if("object"!=typeof t){t={name:t}}const n=Object.assign({name:Be,automaticDataCollectionEnabled:!1},t),i=n.name;if("string"!=typeof i||!i)throw Ke.create("bad-app-name",{appName:String(i)});const s=je.get(i);if(s){if(ke(e,s.options)&&ke(n,s.config))return s;throw Ke.create("duplicate-app",{appName:i})}const r=new Ae(i);for(const e of Ve.values())r.addComponent(e);const o=new Qe(e,n,r);je.set(i,o)}({apiKey:"AIzaSyCFE8TqTBWCDSBee0CuT9HXLnNNRtSA4S8",authDomain:"eye-tracking-8adeb.firebaseapp.com",databaseURL:"https://eye-tracking-8adeb-default-rtdb.firebaseio.com",projectId:"eye-tracking-8adeb",storageBucket:"eye-tracking-8adeb.appspot.com",messagingSenderId:"214459503975",appId:"1:214459503975:web:ff62018ff95cb21cfe8bc2",measurementId:"G-55T3T75PPR"}),function(e=function(e="[DEFAULT]"){const t=je.get(e);if(!t)throw Ke.create("no-app",{appName:e});return t}(),t){(function(e,t){return e.container.getProvider(t)})(e,"database").getImmediate({identifier:t})}(app);let _r=J("record"),mr=J(null),gr=J([]),yr=J([]),vr=J(!1),Cr=J(!1),br=J(null),wr={subscribe:J(10,Tr).subscribe};var Tr;function Ir(t){let n,i,s,r,o,a,c,h,u,_=t[0].label+"";return{c(){n=m("div"),i=m("div"),s=m("img"),o=y(),a=m("p"),c=g(_),l(s.src,r=kr+t[0].path)||b(s,"src",r),b(i,"class","card"),b(a,"class","svelte-w6bq71"),b(n,"class","card-outer clickable")},m(e,r){p(e,n,r),d(n,i),d(i,s),d(n,o),d(n,a),d(a,c),h||(u=C(n,"click",t[1]),h=!0)},p(e,[t]){1&t&&!l(s.src,r=kr+e[0].path)&&b(s,"src",r),1&t&&_!==(_=e[0].label+"")&&w(c,_)},i:e,o:e,d(e){e&&f(n),h=!1,u()}}}let kr="/assets/img/";function Sr(e,t,n){let{data:i}=t;return e.$$set=e=>{"data"in e&&n(0,i=e.data)},[i,function(){mr.set(i),_r.set("patterns")}]}class Er extends K{constructor(e){super(),Y(this,e,Sr,Ir,r,{data:0})}}function Nr(e,t,n){const i=e.slice();return i[1]=t[n],i}function Rr(t){let n,i;return n=new Er({props:{data:t[1]}}),{c(){H(n.$$.fragment)},m(e,t){j(n,e,t),i=!0},p:e,i(e){i||(U(n.$$.fragment,e),i=!0)},o(e){B(n.$$.fragment,e),i=!1},d(e){V(n,e)}}}function xr(e){let t,n,i,s,r,o,a=e[0],l=[];for(let t=0;t<a.length;t+=1)l[t]=Rr(Nr(e,a,t));const c=e=>B(l[e],1,1,(()=>{l[e]=null}));return{c(){t=m("h1"),t.textContent="Gallery",n=y(),i=m("p"),i.textContent="Welcome to the gallery! Select a piece of artwork to see how participating\r\n  individuals viewed it.",s=y(),r=m("div");for(let e=0;e<l.length;e+=1)l[e].c();b(i,"class","font-lg"),b(r,"class","card-holder")},m(e,a){p(e,t,a),p(e,n,a),p(e,i,a),p(e,s,a),p(e,r,a);for(let e=0;e<l.length;e+=1)l[e].m(r,null);o=!0},p(e,[t]){if(1&t){let n;for(a=e[0],n=0;n<a.length;n+=1){const i=Nr(e,a,n);l[n]?(l[n].p(i,t),U(l[n],1)):(l[n]=Rr(i),l[n].c(),U(l[n],1),l[n].m(r,null))}for(W(),n=a.length;n<l.length;n+=1)c(n);z()}},i(e){if(!o){for(let e=0;e<a.length;e+=1)U(l[e]);o=!0}},o(e){l=l.filter(Boolean);for(let e=0;e<l.length;e+=1)B(l[e]);o=!1},d(e){e&&f(t),e&&f(n),e&&f(i),e&&f(s),e&&f(r),_(l,e)}}}function Pr(e){return[[{path:"mehretuCropped.png",label:"Local Calm",artist:"Julie Mehretu",museumLink:"blah"},{path:"mehretuCropped.png",label:"Local Calm",artist:"Julie Mehretu",museumLink:"blah"}]]}class Dr extends K{constructor(e){super(),Y(this,e,Pr,xr,r,{})}}function Ar(t){let n,i,s,r,o,a,l,c;return{c(){n=m("header"),i=m("div"),s=m("div"),s.textContent="How We Gaze",r=y(),o=m("div"),a=m("div"),a.textContent="View",l=y(),c=m("div"),c.textContent="Gaze",b(s,"class","header-left svelte-1k4lsx7"),b(a,"class","breadcrumb svelte-1k4lsx7"),I(a,"active","gallery"===t[0]||"patterns"===t[0]),b(c,"class","breadcrumb svelte-1k4lsx7"),I(c,"active","record"===t[0]),b(o,"class","header-right svelte-1k4lsx7"),b(i,"class","header-content svelte-1k4lsx7"),b(n,"class","svelte-1k4lsx7")},m(e,t){p(e,n,t),d(n,i),d(i,s),d(i,r),d(i,o),d(o,a),d(o,l),d(o,c)},p(e,[t]){1&t&&I(a,"active","gallery"===e[0]||"patterns"===e[0]),1&t&&I(c,"active","record"===e[0])},i:e,o:e,d(e){e&&f(n)}}}function Lr(e,t,n){let i;return u(e,_r,(e=>n(0,i=e))),console.log(i),[i]}class Or extends K{constructor(e){super(),Y(this,e,Lr,Ar,r,{})}}function Mr(t){let n,i,s,r,o,a,l,c,h,u,_,v,T,I=t[0].artist+"'s",k=t[0].label+"";return{c(){n=m("h1"),n.textContent="Viewing Patterns",i=y(),s=m("p"),r=g("Below: a series of visualizations summarizing how participants viewed "),o=g(I),a=y(),l=g(k),c=g(". Click on a tile to see a detailed analysis or\r\n  visualize your own viewing session!"),h=y(),u=m("section"),_=m("div"),_.innerHTML='<div class="card"><span>View &amp; Visualize</span></div>',b(s,"class","font-lg"),b(_,"class","card-outer clickable"),b(u,"class","card-holder")},m(e,f){p(e,n,f),p(e,i,f),p(e,s,f),d(s,r),d(s,o),d(s,a),d(s,l),d(s,c),p(e,h,f),p(e,u,f),d(u,_),v||(T=C(_,"click",t[1]),v=!0)},p(e,[t]){1&t&&I!==(I=e[0].artist+"'s")&&w(o,I),1&t&&k!==(k=e[0].label+"")&&w(l,k)},i:e,o:e,d(e){e&&f(n),e&&f(i),e&&f(s),e&&f(h),e&&f(u),v=!1,T()}}}function Fr(e,t,n){let i;u(e,mr,(e=>n(0,i=e)));return[i,()=>_r.set("record")]}class $r extends K{constructor(e){super(),Y(this,e,Fr,Mr,r,{})}}function qr(t){let n,i,s,r,o,a,l;return{c(){n=m("h3"),n.textContent="Overview",i=y(),s=m("p"),s.textContent="In order to generate a visualization of your viewing session, we’ll ask you to\r\n  study a piece of artwork for 15 seconds with your webcam turned on.",r=y(),o=m("p"),o.innerHTML="<strong>No personal information will be recorded.</strong> The only information\n  that will be recorded is a series of points corresponding to your eye movement.\n  Please enable webcam permission to proceed!",a=y(),l=m("p"),l.textContent="This should take about 5 minutes total."},m(e,t){p(e,n,t),p(e,i,t),p(e,s,t),p(e,r,t),p(e,o,t),p(e,a,t),p(e,l,t)},p:e,i:e,o:e,d(e){e&&f(n),e&&f(i),e&&f(s),e&&f(r),e&&f(o),e&&f(a),e&&f(l)}}}class Wr extends K{constructor(e){super(),Y(this,e,null,qr,r,{})}}function zr(){webgazer.setGazeListener((function(e,t){if(null==e)return;let n=h(gr);n.push({x:e.x,y:e.y}),gr.set(n)})),setTimeout((()=>{webgazer.clearGazeListener(),function(){let e=document.querySelector(".center-dot").getBoundingClientRect(),t=0,n=h(gr);n.map((n=>{let i=n.x-e.x+e.width/2,s=n.y-e.y+e.height/2,r=Math.sqrt(s*s+i*i);return t+=r,r}));let i=100*(1-t/n.length/(document.querySelector(".container-body").getBoundingClientRect().width/2));console.log(i),br.set(Math.round(i))}()}),4e3)}function Ur(){webgazer.removeMouseEventListeners()}async function Br(){if(webgazer.isReady()){console.log("gazer fully loaded"),webgazer.pause(),webgazer.setVideoViewerSize(300,300);let e=document.querySelector("#webgazerVideoContainer");document.querySelector(".container-body").append(e),setTimeout((()=>{vr.set(!0)}),1500)}else await setTimeout(Br,100)}function Hr(e){let t;return{c(){t=m("div"),t.innerHTML="<p>Initializing Video Stream...</p>",b(t,"class","video-wrapper svelte-n1d24a")},m(e,n){p(e,t,n)},d(e){e&&f(t)}}}function jr(t){let n,i,s,r,o,a=!t[0]&&Hr();return{c(){n=m("h3"),n.textContent="Calibrate: Video",i=y(),s=m("p"),s.textContent="We’ll need to first calibrate your webcam in order to proceed. Ensure that\r\n  your are in a well-lit environment, and that your face is in the green section\r\n  of the screen below.",r=y(),a&&a.c(),o=v(),b(s,"class","inst svelte-n1d24a")},m(e,t){p(e,n,t),p(e,i,t),p(e,s,t),p(e,r,t),a&&a.m(e,t),p(e,o,t)},p(e,[t]){e[0]?a&&(a.d(1),a=null):a||(a=Hr(),a.c(),a.m(o.parentNode,o))},i:e,o:e,d(e){e&&f(n),e&&f(i),e&&f(s),e&&f(r),a&&a.d(e),e&&f(o)}}}function Vr(e,t,n){let i;var s;return u(e,Cr,(e=>n(0,i=e))),s=()=>{setTimeout((()=>{!async function(){await webgazer.resume(),Ur(),Cr.set(!0)}()}),100)},S().$$.on_mount.push(s),[i]}class Gr extends K{constructor(e){super(),Y(this,e,Vr,jr,r,{})}}function Yr(e,t,n){const i=e.slice();return i[6]=t[n],i}function Kr(e){let t;function n(e,t){return e[1]>70?Zr:Xr}let i=n(e),s=i(e);return{c(){s.c(),t=v()},m(e,n){s.m(e,n),p(e,t,n)},p(e,r){i===(i=n(e))&&s?s.p(e,r):(s.d(1),s=i(e),s&&(s.c(),s.m(t.parentNode,t)))},d(e){s.d(e),e&&f(t)}}}function Qr(e){let t,n,i,s,r,o,a;return{c(){t=m("p"),t.textContent="Great work! Now stare at the dot at the center of the screen for 5 seconds\r\n    so we can calculate your accuracy rate!",n=y(),i=m("div"),i.textContent="Start staring!",s=y(),r=m("div"),b(t,"class","svelte-1ttilq9"),b(i,"class","clickable btn btn-stare accent svelte-1ttilq9"),I(i,"disabled",e[2]),b(r,"class","center-dot svelte-1ttilq9")},m(l,c){p(l,t,c),p(l,n,c),p(l,i,c),p(l,s,c),p(l,r,c),o||(a=C(i,"click",e[5]),o=!0)},p(e,t){4&t&&I(i,"disabled",e[2])},d(e){e&&f(t),e&&f(n),e&&f(i),e&&f(s),e&&f(r),o=!1,a()}}}function Jr(e){let t,n=e[3],i=[];for(let t=0;t<n.length;t+=1)i[t]=eo(Yr(e,n,t));return{c(){for(let e=0;e<i.length;e+=1)i[e].c();t=v()},m(e,n){for(let t=0;t<i.length;t+=1)i[t].m(e,n);p(e,t,n)},p(e,s){if(24&s){let r;for(n=e[3],r=0;r<n.length;r+=1){const o=Yr(e,n,r);i[r]?i[r].p(o,s):(i[r]=eo(o),i[r].c(),i[r].m(t.parentNode,t))}for(;r<i.length;r+=1)i[r].d(1);i.length=n.length}},d(e){_(i,e),e&&f(t)}}}function Xr(e){let t,n,i,s,r,o,a,l;return{c(){t=m("p"),n=g("Your calculated accuracy is "),i=m("strong"),s=g(e[1]),r=g("%"),o=g("."),a=y(),l=m("p"),l.textContent=":( Unfortunately we require an accuracy rate of 75% or higher to proceed",T(t,"color","var(--color-neg)"),b(t,"class","svelte-1ttilq9"),b(l,"class","svelte-1ttilq9")},m(e,c){p(e,t,c),d(t,n),d(t,i),d(i,s),d(i,r),d(t,o),p(e,a,c),p(e,l,c)},p(e,t){2&t&&w(s,e[1])},d(e){e&&f(t),e&&f(a),e&&f(l)}}}function Zr(e){let t,n,i,s,r,o,a,l,c,h,u,_,v,C=100-e[1]+"";return{c(){t=m("p"),n=g("Your calculated accuracy is "),i=m("strong"),s=g(e[1]),r=g("%"),o=g("!"),a=y(),l=m("p"),c=g("This means that the eye tracker can detect your eye movements with a\r\n      margin of error of "),h=g(C),u=g("% of the size of the container\r\n      that holds this text."),_=y(),v=m("p"),v.textContent="Not perfect, but good enough to deduce patterns in how you look at art!\r\n      Lastly, please look at the selected piece of artwork (full-screen) for 20\r\n      seconds, and we’ll generate a custom visual summarizing how you viewed the\r\n      painting.",T(t,"color","var(--color-pos)"),b(t,"class","svelte-1ttilq9"),b(l,"class","svelte-1ttilq9"),b(v,"class","svelte-1ttilq9")},m(e,f){p(e,t,f),d(t,n),d(t,i),d(i,s),d(i,r),d(t,o),p(e,a,f),p(e,l,f),d(l,c),d(l,h),d(l,u),p(e,_,f),p(e,v,f)},p(e,t){2&t&&w(s,e[1]),2&t&&C!==(C=100-e[1]+"")&&w(h,C)},d(e){e&&f(t),e&&f(a),e&&f(l),e&&f(_),e&&f(v)}}}function eo(t){let n,i,s;return{c(){n=m("div"),b(n,"class","calibration-pt svelte-1ttilq9"),T(n,"top",t[6].top),T(n,"right",t[6].right),b(n,"numclicks","0")},m(e,r){p(e,n,r),i||(s=C(n,"click",t[4]),i=!0)},p:e,d(e){e&&f(n),i=!1,s()}}}function to(t){let n,i,s;function r(e,t){return"dots"==e[0]?Jr:"stare"==e[0]?Qr:"done"==e[0]?Kr:void 0}let o=r(t),a=o&&o(t);return{c(){n=m("h3"),n.textContent="Calibrate: Exercise",i=y(),a&&a.c(),s=v()},m(e,t){p(e,n,t),p(e,i,t),a&&a.m(e,t),p(e,s,t)},p(e,[t]){o===(o=r(e))&&a?a.p(e,t):(a&&a.d(1),a=o&&o(e),a&&(a.c(),a.m(s.parentNode,s)))},i:e,o:e,d(e){e&&f(n),e&&f(i),a&&a.d(e),e&&f(s)}}}function no(e,t,n){let i;u(e,br,(e=>n(1,i=e)));let s="dots";!async function(){webgazer.addMouseEventListeners()}();let r;return e.$$.update=()=>{3&e.$$.dirty&&("stare"==s&&Ur(),i&&n(0,s="done"))},[s,i,r,[{top:"4%",right:"4%",numClicks:0},{top:"50%",right:"4%",numClicks:0},{top:"96%",right:"4%",numClicks:0},{top:"4%",right:"calc(100% - 400px)",numClicks:0},{top:"50%",right:"96%",numClicks:0},{top:"96%",right:"96%",numClicks:0},{top:"4%",right:"50%",numClicks:0},{top:"96%",right:"50%",numClicks:0},{top:"50%",right:"50%",numClicks:0}],function(e){let t=parseInt(this.getAttribute("numclicks"))+1;this.setAttribute("numclicks",t),this.style.opacity=1-t*(1/4),4==t&&function(){let e=document.querySelectorAll(".calibration-pt"),t=!0;return e.forEach((e=>{parseInt(e.getAttribute("numclicks"))<4&&(t=!1)})),t}()&&n(0,s="stare")},()=>{n(2,r=!0),zr()}]}class io extends K{constructor(e){super(),Y(this,e,no,to,r,{})}}function so(t){let n,i,s,r,o;return{c(){n=m("h3"),n.textContent="Calibrate: Instructions",i=y(),s=m("p"),s.textContent="Great! Your face calibration will be displayed on the right for reference.\r\n  Next, we’ll calibrate your eye tracking movement on the screen. Remember these\r\n  two rules!",r=y(),o=m("div"),o.innerHTML='<div class="svelte-1t38vns"><p class="svelte-1t38vns">Eyes on cursor at all times</p> \n    <img src="/assets/img/explain-eye.svg" class="svelte-1t38vns"/></div> \n  <div class="svelte-1t38vns"><p class="svelte-1t38vns">Move cursor to each red dot, and click on dot until it disappears</p> \n    <img src="/assets/img/explain-cursor.svg" class="svelte-1t38vns"/></div>',b(s,"class","instr svelte-1t38vns"),b(o,"class","explain svelte-1t38vns")},m(e,t){p(e,n,t),p(e,i,t),p(e,s,t),p(e,r,t),p(e,o,t)},p:e,i:e,o:e,d(e){e&&f(n),e&&f(i),e&&f(s),e&&f(r),e&&f(o)}}}class ro extends K{constructor(e){super(),Y(this,e,null,so,r,{})}}function oo(t){let n;return{c(){n=m("h3"),n.textContent="Calibrate: Results"},m(e,t){p(e,n,t)},p:e,i:e,o:e,d(e){e&&f(n)}}}class ao extends K{constructor(e){super(),Y(this,e,null,oo,r,{})}}function lo(t){let n,i,s,r,o,a;return{c(){n=m("div"),i=m("div"),s=m("img"),o=y(),a=m("p"),a.textContent="Please look at the following image for 20 seconds",b(s,"id","artView"),l(s.src,r="/assets/img/mehretuCropped.png")||b(s,"src","/assets/img/mehretuCropped.png"),b(s,"class","svelte-pcr7ku"),I(s,"inactive",1==t[0]),b(a,"class","svelte-pcr7ku"),I(a,"inactive",0==t[0]),b(i,"class","img-holder svelte-pcr7ku"),b(n,"class","wrapper-full svelte-pcr7ku")},m(e,t){p(e,n,t),d(n,i),d(i,s),d(i,o),d(i,a)},p(e,[t]){1&t&&I(s,"inactive",1==e[0]),1&t&&I(a,"inactive",0==e[0])},i:e,o:e,d(e){e&&f(n)}}}function co(e,t,n){let i=!0;return setTimeout((()=>{n(0,i=!1),async function(){let e=document.querySelector("#artView").getBoundingClientRect();webgazer.setGazeListener((function(t,n){if(null==t)return;let i={time:n,x:t.x-e.x,y:t.y-e.y,xPct:100*(t.x-e.x)/e.width,yPct:100*(t.y-e.y)/e.height,xMin:e.left,xMax:e.right,yMin:e.top,yMax:e.bottom},s=h(yr);s.push(i),yr.set(s)})),setTimeout((()=>{webgazer.clearGazeListener(),console.log(h(yr))}),4e3)}()}),3e3),[i]}class ho extends K{constructor(e){super(),Y(this,e,co,lo,r,{})}}function uo(e,t,n){const i=e.slice();return i[15]=t[n],i}function po(e){let t;return{c(){t=m("div"),b(t,"class","nav-dot svelte-phm2bs"),I(t,"active",e[6][e[0]]===e[15])},m(e,n){p(e,t,n)},p(e,n){65&n&&I(t,"active",e[6][e[0]]===e[15])},d(e){e&&f(t)}}}function fo(e){let t,n;return t=new ao({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function _o(e){let t,n;return t=new ho({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function mo(e){let t,n;return t=new io({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function go(e){let t,n;return t=new ro({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function yo(e){let t,n;return t=new Gr({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function vo(e){let t,n;return t=new Wr({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function Co(e){let t,n=e[6][e[0]].btnLabel+"";return{c(){t=g(n)},m(e,n){p(e,t,n)},p(e,i){1&i&&n!==(n=e[6][e[0]].btnLabel+"")&&w(t,n)},d(e){e&&f(t)}}}function bo(t){let n;return{c(){n=g("Loading...")},m(e,t){p(e,n,t)},p:e,d(e){e&&f(n)}}}function wo(e){let t,n,s,r,o,a,c,h,u,v,T,k,S,E,N,R,x,P,D,A,L,O,M,F=e[6][e[0]].btnBackLabel+"",$=e[6],q=[];for(let t=0;t<$.length;t+=1)q[t]=po(uo(e,$,t));const H=[vo,yo,go,mo,_o,fo],j=[];function V(e,t){return"overview"==e[6][e[0]].sectionName?0:"calibrate-vid"==e[6][e[0]].sectionName?1:"calibrate-instructions"==e[6][e[0]].sectionName?2:"calibrate-exercise"==e[6][e[0]].sectionName?3:"view"==e[6][e[0]].sectionName?4:"results"==e[6][e[0]].sectionName?5:-1}function G(e,t){return e[5]?Co:bo}~(S=V(e))&&(E=j[S]=H[S](e));let Y=G(e),K=Y(e);return{c(){t=m("script"),s=y(),r=m("header"),r.innerHTML='<h1>Share Your Gaze</h1> \n    <h3 class="clickable svelte-phm2bs">Back to Gallery</h3>',o=y(),a=m("section"),c=m("div"),h=m("div"),u=y(),v=m("div");for(let e=0;e<q.length;e+=1)q[e].c();T=y(),k=m("div"),E&&E.c(),N=y(),R=m("div"),x=m("div"),P=g(F),D=y(),A=m("div"),K.c(),l(t.src,n="/assets/webgazer.min.js")||b(t,"src","/assets/webgazer.min.js"),b(r,"class","svelte-phm2bs"),b(h,"class","current-selection"),b(v,"class","nav-ind svelte-phm2bs"),b(c,"class","container-header svelte-phm2bs"),b(k,"class","container-body svelte-phm2bs"),b(x,"class","btn-prev btn disabled svelte-phm2bs"),I(x,"accent",e[2]&&e[2]<70),I(x,"disabled",1==e[3]),b(A,"class","btn-next btn accent clickable svelte-phm2bs"),I(A,"disabled",1==e[4]),I(A,"glow",0==e[5]),b(R,"class","container-footer svelte-phm2bs"),b(a,"class","experiment-container svelte-phm2bs")},m(n,i){d(document.head,t),p(n,s,i),p(n,r,i),p(n,o,i),p(n,a,i),d(a,c),d(c,h),d(c,u),d(c,v);for(let e=0;e<q.length;e+=1)q[e].m(v,null);d(a,T),d(a,k),~S&&j[S].m(k,null),d(a,N),d(a,R),d(R,x),d(x,P),d(R,D),d(R,A),K.m(A,null),L=!0,O||(M=[C(t,"load",e[11]),C(x,"click",e[7]),C(A,"click",e[12])],O=!0)},p(e,[t]){if(65&t){let n;for($=e[6],n=0;n<$.length;n+=1){const i=uo(e,$,n);q[n]?q[n].p(i,t):(q[n]=po(i),q[n].c(),q[n].m(v,null))}for(;n<q.length;n+=1)q[n].d(1);q.length=$.length}let n=S;S=V(e),S!==n&&(E&&(W(),B(j[n],1,1,(()=>{j[n]=null})),z()),~S?(E=j[S],E||(E=j[S]=H[S](e),E.c()),U(E,1),E.m(k,null)):E=null),(!L||1&t)&&F!==(F=e[6][e[0]].btnBackLabel+"")&&w(P,F),4&t&&I(x,"accent",e[2]&&e[2]<70),8&t&&I(x,"disabled",1==e[3]),Y===(Y=G(e))&&K?K.p(e,t):(K.d(1),K=Y(e),K&&(K.c(),K.m(A,null))),16&t&&I(A,"disabled",1==e[4]),32&t&&I(A,"glow",0==e[5])},i(e){L||(U(E),L=!0)},o(e){B(E),L=!1},d(e){f(t),e&&f(s),e&&f(r),e&&f(o),e&&f(a),_(q,e),~S&&j[S].d(),K.d(),O=!1,i(M)}}}function To(e,t,n){let i,s,r,o;u(e,wr,(e=>n(9,i=e))),u(e,br,(e=>n(2,s=e))),u(e,Cr,(e=>n(10,r=e))),u(e,vr,(e=>n(5,o=e)));let a,l,c=0,h=!1,d=!1,p=[{sectionName:"overview",videoShown:!1,btnLabel:"Start!",disableBack:!0},{sectionName:"calibrate-vid",videoShown:!0,videoPos:"middle",disableBack:!1,disableNext:!0,btnBackLabel:"Back to Overview",btnLabel:"Got It - Face is Aligned"},{sectionName:"calibrate-instructions",videoShown:!0,videoPos:"top",btnBackLabel:"Back to Video Alignment",btnLabel:"Got It - Proceed"},{sectionName:"calibrate-exercise",videoShown:!0,videoPos:"top",disableNext:!0,btnBackLabel:"Restart Eye Calibration",btnLabel:"Proceed to View Art",gazerRecording:!0},{sectionName:"view",videoShown:!1,btnLabel:"Proceed",disableNext:!0,btnBackLabel:"Back to Calibration"},{sectionName:"results",videoShown:!1,btnLabel:"View Pattern",disableNext:!0,btnBackLabel:"Back to Calibration"}];var f;f=()=>{n(8,l=!0)},S().$$.after_update.push(f);return e.$$.update=()=>{if(258&e.$$.dirty&&l&&a&&(webgazer.showVideo(!1),webgazer.begin(),Br()),259&e.$$.dirty){let e=p[c];l&&a&&(1==e.videoShown?(webgazer.showVideo(!0),function(e){let t=document.querySelector("#webgazerVideoContainer"),n=320;"top"==e?(n=110,webgazer.setVideoViewerSize(n,n),t.style.top="0%",t.style.left="90%",t.style.width=`${n}px`,t.style.height="auto"):"middle"==e&&(webgazer.setVideoViewerSize(n,n),t.style.width=`${n}px`,t.style.height="auto",t.style.position="absolute",t.style.left="50%",t.style.top="30%",t.style.transform="translate(-50%, -50%)")}(e.videoPos)):webgazer.showVideo(!1),e.disableBack?n(3,h=!0):n(3,h=!1),e.disableNext?n(4,d=!0):n(4,d=!1))}1024&e.$$.dirty&&r&&n(4,d=!1),516&e.$$.dirty&&s>i&&n(4,d=!1)},[c,a,s,h,d,o,p,function(){"calibrate-exercise"==p[c]&&(console.log("uh restarting i guess"),br.set(null)),n(0,c--,c)},l,i,r,()=>{n(1,a=!0)},()=>n(0,c++,c)]}class Io extends K{constructor(e){super(),Y(this,e,To,wo,r,{})}}function ko(e){let t,n;return t=new Io({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function So(e){let t,n;return t=new $r({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function Eo(e){let t,n;return t=new Dr({}),{c(){H(t.$$.fragment)},m(e,i){j(t,e,i),n=!0},i(e){n||(U(t.$$.fragment,e),n=!0)},o(e){B(t.$$.fragment,e),n=!1},d(e){V(t,e)}}}function No(e){let t,n,i,s,r,o,a;n=new Or({});const l=[Eo,So,ko],c=[];function h(e,t){return"gallery"==e[0]?0:"patterns"==e[0]?1:"record"==e[0]?2:-1}return~(r=h(e))&&(o=c[r]=l[r](e)),{c(){t=m("main"),H(n.$$.fragment),i=y(),s=m("div"),o&&o.c(),b(s,"class","container svelte-1p2bjjx")},m(e,o){p(e,t,o),j(n,t,null),d(t,i),d(t,s),~r&&c[r].m(s,null),a=!0},p(e,[t]){let n=r;r=h(e),r!==n&&(o&&(W(),B(c[n],1,1,(()=>{c[n]=null})),z()),~r?(o=c[r],o||(o=c[r]=l[r](e),o.c()),U(o,1),o.m(s,null)):o=null)},i(e){a||(U(n.$$.fragment,e),U(o),a=!0)},o(e){B(n.$$.fragment,e),B(o),a=!1},d(e){e&&f(t),V(n),~r&&c[r].d()}}}function Ro(e,t,n){let i;return u(e,_r,(e=>n(0,i=e))),[i]}return new class extends K{constructor(e){super(),Y(this,e,Ro,No,r,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
