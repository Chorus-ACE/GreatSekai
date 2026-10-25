(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1/60,t=5;function n(n,i){let a=0,o=!1,s=!1,c=Promise.resolve(),l=null,u=null,d=null,f=0,p=0,m=()=>{if(s)throw Error(`Haruki 3D runtime has been destroyed.`)},h=e=>{m();let t=r(e);if(u?.key===t)return u.promise;let a=Promise.all([n.waitForPostProcessorReady?.()??Promise.resolve(),n.loadRenderRecipe({...e,baseUrl:i})]).then(()=>void 0);return u={key:t,promise:a},c=a.then(()=>void 0,()=>void 0),a.catch(()=>{u?.promise===a&&(u=null)}),a},g=r=>{if(!o||s)return;d===null&&(d=r),f+=Math.min(Math.max((r-d)/1e3,0),e*t),d=r;let i=0;for(;f>=e&&i<t;)p+=e,n.stepRuntimeFrame(e,{advanceAnimation:!0,elapsedTime:p}),f-=e,i+=1;n.renderFrame(),a=requestAnimationFrame(g)};return{prepare:h,async load(e){await h(e),!s&&(n.stepRuntimeFrame(0,{advanceAnimation:!1,elapsedTime:p}),n.renderFrame())},play(){m(),!o&&(o=!0,d=null,f=0,a=requestAnimationFrame(g))},pause(){o&&(o=!1,cancelAnimationFrame(a),a=0,d=null,f=0)},resize(e,t){m(),n.setViewportSize(e,t),n.renderFrame()},setBackgroundTheme(e){m(),n.setBackgroundTheme?.(e),o||n.renderFrame()},setCharacterYawDegrees(e){m(),n.setCharacterYawDegrees(e),o||n.renderFrame()},setViewYawDegrees(e){m(),n.setViewYawDegrees(e),o||n.renderFrame()},setViewZoom(e){m(),n.setViewZoom(e),o||n.renderFrame()},setViewHeightOffset(e){m(),n.setViewHeightOffset(e),o||n.renderFrame()},destroy(){return l||(s=!0,u=null,o=!1,cancelAnimationFrame(a),a=0,l=c.then(()=>{n.destroy()}),l)}}}function r(e){return[e.roleId,e.bodyCostume3dId,e.headCostume3dId,e.headPackagePath??``,e.hairCostume3dId,e.headOptionalCostume3dId??``].join(`\0`)}var i={x:-15,y:50,z:0},a={x:-.7127446532249451,y:.258819043636322,z:.6519262194633484},o={x:.833125114440918,y:-.3420201539993286,z:.43465474247932434},s={ambientColor:{r:.5,g:.5,b:.5},ambientIntensity:1,specularColor:{r:1,g:1,b:1},specularIntensity:1,rimColor:{r:.5,g:.5,b:.5},rimColorAlpha:1,rimRange:7,rimEdgeSmoothness:.0010000000474974513,rimEmission:0,rimLightInfluence:1,shadowRimColor:{r:0,g:0,b:0},rimShadowSharpness:.5},c=a,l={x:c.x,y:c.y,z:c.z,intensity:1,ambient:0,shadowThreshold:.40625,shadowWeight:1,characterAmbient:s.ambientIntensity,rimColorAlpha:s.rimColorAlpha,rimRange:s.rimRange,rimEdgeSmoothness:s.rimEdgeSmoothness,rimEmission:s.rimEmission,rimLightInfluence:s.rimLightInfluence,rimShadowSharpness:s.rimShadowSharpness};s.ambientIntensity,s.rimColorAlpha,s.rimRange,s.rimEdgeSmoothness,s.rimEmission,s.rimLightInfluence,s.rimShadowSharpness;var u=new WeakMap;function d(e){let t=new Set;e.traverse(e=>{let n=e;if(!n.isMesh||n.userData.pjskOutlineShell||t.has(n.geometry))return;let r=n.geometry,i=r.morphAttributes.tangent;if(!i?.length)return;t.add(r);let a=r.getAttribute(`tangent`),o=n.morphTargetInfluences;if(!o||o.length!==i.length||!o.every(Number.isFinite))throw Error(`Native mesh '${n.name}' has invalid tangent morph influences.`);let s=u.get(r);if(s||(s={base:new Float32Array(a.array),weights:[]},u.set(r,s)),!(o.length===s.weights.length&&o.every((e,t)=>e===s.weights[t]))){a.copyArray(s.base);for(let e=0;e<i.length;e+=1){let t=o[e];if(t===0)continue;let n=i[e];for(let e=0;e<a.count;e+=1)a.setXYZ(e,a.getX(e)+n.getX(e)*t,a.getY(e)+n.getY(e)*t,a.getZ(e)+n.getZ(e)*t)}s.weights=o.slice(),a.needsUpdate=!0}})}var f=`attached`,p=1e3,m=1001,h=1002,g=1003,_=1004,v=1005,y=1006,b=1007,x=1008,S=1009,C=1010,w=1011,T=1012,E=1013,D=1014,O=1015,k=1016,A=1017,ee=1018,te=1020,j=35902,ne=35899,M=1021,re=1022,ie=1023,ae=1026,oe=1027,se=1028,ce=1029,N=1030,le=1031,ue=1033,de=33776,fe=33777,pe=33778,me=33779,he=35840,ge=35841,_e=35842,ve=35843,ye=36196,be=37492,xe=37496,Se=37488,Ce=37489,we=37490,Te=37491,Ee=37808,De=37809,Oe=37810,ke=37811,Ae=37812,je=37813,Me=37814,Ne=37815,Pe=37816,P=37817,Fe=37818,Ie=37819,Le=37820,F=37821,Re=36492,I=36494,L=36495,ze=36283,Be=36284,Ve=36285,He=36286,Ue=2200,We=2201,Ge=2202,Ke=2300,qe=2301,Je=2302,Ye=2303,Xe=2400,Ze=2401,Qe=2402,$e=2500,et=2501,tt=3200,nt=`srgb`,rt=`srgb-linear`,it=`linear`,at=`srgb`,ot=7680,st=7681,ct=35044,lt=2e3;function ut(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function dt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function ft(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function pt(){let e=ft(`canvas`);return e.style.display=`block`,e}var mt={};function ht(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function gt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function R(...e){e=gt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function z(...e){e=gt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function _t(...e){let t=e.join(` `);t in mt||(mt[t]=!0,R(...e))}function vt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var yt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},bt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},xt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),St=1234567,Ct=Math.PI/180,wt=180/Math.PI;function Tt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xt[e&255]+xt[e>>8&255]+xt[e>>16&255]+xt[e>>24&255]+`-`+xt[t&255]+xt[t>>8&255]+`-`+xt[t>>16&15|64]+xt[t>>24&255]+`-`+xt[n&63|128]+xt[n>>8&255]+`-`+xt[n>>16&255]+xt[n>>24&255]+xt[r&255]+xt[r>>8&255]+xt[r>>16&255]+xt[r>>24&255]).toLowerCase()}function B(e,t,n){return Math.max(t,Math.min(n,e))}function Et(e,t){return(e%t+t)%t}function Dt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Ot(e,t,n){return e===t?0:(n-e)/(t-e)}function kt(e,t,n){return(1-n)*e+n*t}function At(e,t,n,r){return kt(e,t,1-Math.exp(-n*r))}function jt(e,t=1){return t-Math.abs(Et(e,t*2)-t)}function Mt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Nt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Pt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Ft(e,t){return e+Math.random()*(t-e)}function It(e){return e*(.5-Math.random())}function Lt(e){e!==void 0&&(St=e);let t=St+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Rt(e){return e*Ct}function zt(e){return e*wt}function Bt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Vt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Ht(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ut(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:R(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Wt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Gt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var V={DEG2RAD:Ct,RAD2DEG:wt,generateUUID:Tt,clamp:B,euclideanModulo:Et,mapLinear:Dt,inverseLerp:Ot,lerp:kt,damp:At,pingpong:jt,smoothstep:Mt,smootherstep:Nt,randInt:Pt,randFloat:Ft,randFloatSpread:It,seededRandom:Lt,degToRad:Rt,radToDeg:zt,isPowerOfTwo:Bt,ceilPowerOfTwo:Vt,floorPowerOfTwo:Ht,setQuaternionFromProperEuler:Ut,normalize:Gt,denormalize:Wt},H=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},U=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:R(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(B(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Kt.copy(this).projectOnVector(e),this.sub(Kt)}reflect(e){return this.sub(Kt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(B(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Kt=new W,qt=new U,G=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return _t(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Jt.makeScale(e,t)),this}rotate(e){return _t(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Jt.makeRotation(-e)),this}translate(e,t){return _t(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Jt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Jt=new G,Yt=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xt=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zt(){let e={enabled:!0,workingColorSpace:rt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Qt(e.r),e.g=Qt(e.g),e.b=Qt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=$t(e.r),e.g=$t(e.g),e.b=$t(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?it:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return _t(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return _t(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[rt]:{primaries:t,whitePoint:r,transfer:it,toXYZ:Yt,fromXYZ:Xt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:nt},outputColorSpaceConfig:{drawingBufferColorSpace:nt}},[nt]:{primaries:t,whitePoint:r,transfer:at,toXYZ:Yt,fromXYZ:Xt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:nt}}}),e}var K=Zt();function Qt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function $t(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var en,tn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{en===void 0&&(en=ft(`canvas`)),en.width=e.width,en.height=e.height;let t=en.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=en}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=ft(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Qt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Qt(t[e]/255)*255):t[e]=Qt(t[e]);return{data:t,width:e.width,height:e.height}}return R(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},nn=0,rn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:nn++}),this.uuid=Tt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(an(r[t].image)):e.push(an(r[t]))}else e=an(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function an(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?tn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(R(`Texture: Unable to serialize Texture.`),{})}var on=0,sn=new W,cn=class e extends bt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=m,i=m,a=y,o=x,s=ie,c=S,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:on++}),this.uuid=Tt(),this.name=``,this.source=new rn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(sn).x}get height(){return this.source.getSize(sn).y}get depth(){return this.source.getSize(sn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){R(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){R(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case p:e.x-=Math.floor(e.x);break;case m:e.x=e.x<0?0:1;break;case h:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case p:e.y-=Math.floor(e.y);break;case m:e.y=e.y<0?0:1;break;case h:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};cn.DEFAULT_IMAGE=null,cn.DEFAULT_MAPPING=300,cn.DEFAULT_ANISOTROPY=1;var ln=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=B(this.x,e.x,t.x),this.y=B(this.y,e.y,t.y),this.z=B(this.z,e.z,t.z),this.w=B(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=B(this.x,e,t),this.y=B(this.y,e,t),this.z=B(this.z,e,t),this.w=B(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(B(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},un=class extends bt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:y,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ln(0,0,e,t),this.scissorTest=!1,this.viewport=new ln(0,0,e,t),this.textures=[];let r=new cn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:y,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new rn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},dn=class extends un{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},fn=class extends cn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=g,this.minFilter=g,this.wrapR=m,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},pn=class extends cn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=g,this.minFilter=g,this.wrapR=m,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},q=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/mn.setFromMatrixColumn(e,0).length(),i=1/mn.setFromMatrixColumn(e,1).length(),a=1/mn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(gn,e,_n)}lookAt(e,t,n){let r=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),vn.crossVectors(n,bn),vn.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),vn.crossVectors(n,bn)),vn.normalize(),yn.crossVectors(bn,vn),r[0]=vn.x,r[4]=yn.x,r[8]=bn.x,r[1]=vn.y,r[5]=yn.y,r[9]=bn.y,r[2]=vn.z,r[6]=yn.z,r[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],ne=r[7],M=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*ne,i[8]=a*C+o*D+s*ee+c*M,i[12]=a*w+o*O+s*te+c*re,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*ne,i[9]=l*C+u*D+d*ee+f*M,i[13]=l*w+u*O+d*te+f*re,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*ne,i[10]=p*C+m*D+h*ee+g*M,i[14]=p*w+m*O+h*te+g*re,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*ne,i[11]=_*C+v*D+y*ee+b*M,i[15]=_*w+v*O+y*te+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=mn.set(r[0],r[1],r[2]).length(),o=mn.set(r[4],r[5],r[6]).length(),s=mn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),hn.copy(this);let c=1/a,l=1/o,u=1/s;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=l,hn.elements[5]*=l,hn.elements[6]*=l,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,t.setFromRotationMatrix(hn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=lt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=lt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},mn=new W,hn=new q,gn=new W(0,0,0),_n=new W(1,1,1),vn=new W,yn=new W,bn=new W,xn=new q,Sn=new U,Cn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(B(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-B(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(B(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-B(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(B(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-B(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:R(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Sn.setFromEuler(this),this.setFromQuaternion(Sn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Cn.DEFAULT_ORDER=`XYZ`;var wn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Tn=0,En=new W,Dn=new U,On=new q,kn=new W,An=new W,jn=new W,Mn=new U,Nn=new W(1,0,0),Pn=new W(0,1,0),Fn=new W(0,0,1),In={type:`added`},Ln={type:`removed`},Rn={type:`childadded`,child:null},zn={type:`childremoved`,child:null},Bn=class e extends bt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tn++}),this.uuid=Tt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new Cn,r=new U,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new q},normalMatrix:{value:new G}}),this.matrix=new q,this.matrixWorld=new q,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Dn.setFromAxisAngle(e,t),this.quaternion.multiply(Dn),this}rotateOnWorldAxis(e,t){return Dn.setFromAxisAngle(e,t),this.quaternion.premultiply(Dn),this}rotateX(e){return this.rotateOnAxis(Nn,e)}rotateY(e){return this.rotateOnAxis(Pn,e)}rotateZ(e){return this.rotateOnAxis(Fn,e)}translateOnAxis(e,t){return En.copy(e).applyQuaternion(this.quaternion),this.position.add(En.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nn,e)}translateY(e){return this.translateOnAxis(Pn,e)}translateZ(e){return this.translateOnAxis(Fn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?kn.copy(e):kn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),An.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(An,kn,this.up):On.lookAt(kn,An,this.up),this.quaternion.setFromRotationMatrix(On),r&&(On.extractRotation(r.matrixWorld),Dn.setFromRotationMatrix(On),this.quaternion.premultiply(Dn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(z(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(In),Rn.child=e,this.dispatchEvent(Rn),Rn.child=null):z(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ln),zn.child=e,this.dispatchEvent(zn),zn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),On.multiply(e.parent.matrixWorld)),e.applyMatrix4(On),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(In),Rn.child=e,this.dispatchEvent(Rn),Rn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(An,e,jn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(An,Mn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Bn.DEFAULT_UP=new W(0,1,0),Bn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Vn=class extends Bn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Hn={type:`move`},Un=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Vn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},Kn={h:0,s:0,l:0};function qn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,K.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=K.workingColorSpace){return this.r=e,this.g=t,this.b=n,K.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=K.workingColorSpace){if(e=Et(e,1),t=B(t,0,1),n=B(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=qn(i,r,e+1/3),this.g=qn(i,r,e),this.b=qn(i,r,e-1/3)}return K.colorSpaceToWorking(this,r),this}setStyle(e,t=nt){function n(t){t!==void 0&&parseFloat(t)<1&&R(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:R(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);R(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){let n=Wn[e.toLowerCase()];return n===void 0?R(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qt(e.r),this.g=Qt(e.g),this.b=Qt(e.b),this}copyLinearToSRGB(e){return this.r=$t(e.r),this.g=$t(e.g),this.b=$t(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return K.workingToColorSpace(Jn.copy(this),e),Math.round(B(Jn.r*255,0,255))*65536+Math.round(B(Jn.g*255,0,255))*256+Math.round(B(Jn.b*255,0,255))}getHexString(e=nt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=K.workingColorSpace){K.workingToColorSpace(Jn.copy(this),t);let n=Jn.r,r=Jn.g,i=Jn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=K.workingColorSpace){return K.workingToColorSpace(Jn.copy(this),t),e.r=Jn.r,e.g=Jn.g,e.b=Jn.b,e}getStyle(e=nt){K.workingToColorSpace(Jn.copy(this),e);let t=Jn.r,n=Jn.g,r=Jn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(Kn);let n=kt(Gn.h,Kn.h,t),r=kt(Gn.s,Kn.s,t),i=kt(Gn.l,Kn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jn=new J;J.NAMES=Wn;var Yn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new J(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Xn=class extends Bn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Zn=new W,Qn=new W,$n=new W,er=new W,tr=new W,nr=new W,rr=new W,ir=new W,ar=new W,or=new W,sr=new ln,cr=new ln,lr=new ln,ur=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Zn.subVectors(e,t),r.cross(Zn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Zn.subVectors(r,t),Qn.subVectors(n,t),$n.subVectors(e,t);let a=Zn.dot(Zn),o=Zn.dot(Qn),s=Zn.dot($n),c=Qn.dot(Qn),l=Qn.dot($n),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,er)!==null&&er.x>=0&&er.y>=0&&er.x+er.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,er)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,er.x),s.addScaledVector(a,er.y),s.addScaledVector(o,er.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return sr.setScalar(0),cr.setScalar(0),lr.setScalar(0),sr.fromBufferAttribute(e,t),cr.fromBufferAttribute(e,n),lr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(sr,i.x),a.addScaledVector(cr,i.y),a.addScaledVector(lr,i.z),a}static isFrontFacing(e,t,n,r){return Zn.subVectors(n,t),Qn.subVectors(e,t),Zn.cross(Qn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Zn.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;tr.subVectors(r,n),nr.subVectors(i,n),ir.subVectors(e,n);let s=tr.dot(ir),c=nr.dot(ir);if(s<=0&&c<=0)return t.copy(n);ar.subVectors(e,r);let l=tr.dot(ar),u=nr.dot(ar);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(tr,a);or.subVectors(e,i);let f=tr.dot(or),p=nr.dot(or);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(nr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return rr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(rr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(tr,a).addScaledVector(nr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},dr=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=pr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,pr):pr.fromBufferAttribute(r,t),pr.applyMatrix4(e.matrixWorld),this.expandByPoint(pr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),mr.copy(e.boundingBox)),mr.applyMatrix4(e.matrixWorld),this.union(mr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pr),pr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xr),Sr.subVectors(this.max,xr),hr.subVectors(e.a,xr),gr.subVectors(e.b,xr),_r.subVectors(e.c,xr),vr.subVectors(gr,hr),yr.subVectors(_r,gr),br.subVectors(hr,_r);let t=[0,-vr.z,vr.y,0,-yr.z,yr.y,0,-br.z,br.y,vr.z,0,-vr.x,yr.z,0,-yr.x,br.z,0,-br.x,-vr.y,vr.x,0,-yr.y,yr.x,0,-br.y,br.x,0];return!Tr(t,hr,gr,_r,Sr)||(t=[1,0,0,0,1,0,0,0,1],!Tr(t,hr,gr,_r,Sr))?!1:(Cr.crossVectors(vr,yr),t=[Cr.x,Cr.y,Cr.z],Tr(t,hr,gr,_r,Sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fr=[new W,new W,new W,new W,new W,new W,new W,new W],pr=new W,mr=new dr,hr=new W,gr=new W,_r=new W,vr=new W,yr=new W,br=new W,xr=new W,Sr=new W,Cr=new W,wr=new W;function Tr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){wr.fromArray(e,a);let o=i.x*Math.abs(wr.x)+i.y*Math.abs(wr.y)+i.z*Math.abs(wr.z),s=t.dot(wr),c=n.dot(wr),l=r.dot(wr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Er=new W,Dr=new H,Or=0,kr=class extends bt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Or++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=ct,this.updateRanges=[],this.gpuType=O,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.applyMatrix3(e),this.setXYZ(t,Er.x,Er.y,Er.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.applyMatrix4(e),this.setXYZ(t,Er.x,Er.y,Er.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.applyNormalMatrix(e),this.setXYZ(t,Er.x,Er.y,Er.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.transformDirection(e),this.setXYZ(t,Er.x,Er.y,Er.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),r=Gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),r=Gt(r,this.array),i=Gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Ar=class extends kr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},jr=class extends kr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Mr=class extends kr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Nr=new dr,Pr=new W,Fr=new W,Ir=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Nr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pr.subVectors(e,this.center);let t=Pr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Pr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pr.copy(e.center).add(Fr)),this.expandByPoint(Pr.copy(e.center).sub(Fr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Lr=0,Rr=new q,zr=new Bn,Br=new W,Vr=new dr,Hr=new dr,Ur=new W,Wr=class e extends bt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lr++}),this.uuid=Tt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(ut(e)?jr:Ar)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Rr.makeRotationFromQuaternion(e),this.applyMatrix4(Rr),this}rotateX(e){return Rr.makeRotationX(e),this.applyMatrix4(Rr),this}rotateY(e){return Rr.makeRotationY(e),this.applyMatrix4(Rr),this}rotateZ(e){return Rr.makeRotationZ(e),this.applyMatrix4(Rr),this}translate(e,t,n){return Rr.makeTranslation(e,t,n),this.applyMatrix4(Rr),this}scale(e,t,n){return Rr.makeScale(e,t,n),this.applyMatrix4(Rr),this}lookAt(e){return zr.lookAt(e),zr.updateMatrix(),this.applyMatrix4(zr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Mr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&R(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){z(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Vr.setFromBufferAttribute(n),this.morphTargetsRelative?(Ur.addVectors(this.boundingBox.min,Vr.min),this.boundingBox.expandByPoint(Ur),Ur.addVectors(this.boundingBox.max,Vr.max),this.boundingBox.expandByPoint(Ur)):(this.boundingBox.expandByPoint(Vr.min),this.boundingBox.expandByPoint(Vr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&z(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ir);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){z(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);return}if(e){let n=this.boundingSphere.center;if(Vr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Hr.setFromBufferAttribute(n),this.morphTargetsRelative?(Ur.addVectors(Vr.min,Hr.min),Vr.expandByPoint(Ur),Ur.addVectors(Vr.max,Hr.max),Vr.expandByPoint(Ur)):(Vr.expandByPoint(Hr.min),Vr.expandByPoint(Hr.max))}Vr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Ur.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Ur));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Ur.fromBufferAttribute(a,t),o&&(Br.fromBufferAttribute(e,t),Ur.add(Br)),r=Math.max(r,n.distanceToSquared(Ur))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&z(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){z(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new kr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let c=new W,l=new W,u=new W,d=new H,f=new H,p=new H,m=new W,h=new W;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new W,y=new W,b=new W,x=new W;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new kr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ur.fromBufferAttribute(e,t),Ur.normalize(),e.setXYZ(t,Ur.x,Ur.y,Ur.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new kr(a,r,i)}if(this.index===null)return R(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Gr=new W,Kr=new W,qr=new G,Jr=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Gr.subVectors(n,t).cross(Kr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Gr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||qr.getNormalMatrix(e),r=this.coplanarPoint(Gr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Yr=0,Xr=class extends bt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yr++}),this.uuid=Tt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ot,this.stencilZFail=ot,this.stencilZPass=ot,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){R(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){R(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Jr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Zr=new W,Qr=new W,$r=new W,ei=new W,ti=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Zr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zr.copy(this.origin).addScaledVector(this.direction,t),Zr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Qr.copy(e).add(t).multiplyScalar(.5),$r.copy(t).sub(e).normalize(),ei.copy(this.origin).sub(Qr);let i=e.distanceTo(t)*.5,a=-this.direction.dot($r),o=ei.dot(this.direction),s=-ei.dot($r),c=ei.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Qr).addScaledVector($r,d),f}intersectSphere(e,t){if(e.radius<0)return null;Zr.subVectors(e.center,this.origin);let n=Zr.dot(this.direction),r=Zr.dot(Zr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Zr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,ee,te,j;if(y>=b&&y>=x?(w=s,D=u,A=p,j=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,ee=_,te=v):(S=l,C=c,T=f,E=d,O=h,k=m,ee=v,te=_)):b>=x?(w=c,D=d,A=m,j=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,ee=v,te=g):(S=s,C=l,T=u,E=f,O=p,k=h,ee=g,te=v)):(w=l,D=f,A=h,j=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,ee=g,te=_):(S=c,C=s,T=d,E=u,O=m,k=p,ee=_,te=g)),w===0)return null;let ne=S/w,M=C/w,re=1/w,ie=T-ne*D,ae=E-M*D,oe=O-ne*A,se=k-M*A,ce=ee-ne*j,N=te-M*j,le=ce*se-N*oe,ue=ie*N-ae*ce,de=oe*ae-se*ie;if(r){if(le<0||ue<0||de<0)return null}else if((le<0||ue<0||de<0)&&(le>0||ue>0||de>0))return null;let fe=le+ue+de;if(fe===0)return null;let pe=re*(le*D+ue*A+de*j);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ni=class extends Xr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ri=new q,ii=new ti,ai=new Ir,oi=new W,si=new W,ci=new W,li=new W,ui=new W,di=new W,fi=new W,pi=new W,mi=class extends Bn{constructor(e=new Wr,t=new ni){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){di.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ui.fromBufferAttribute(s,e),a?di.addScaledVector(ui,r):di.addScaledVector(ui.sub(t),r))}t.add(di)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ai.copy(n.boundingSphere),ai.applyMatrix4(i),ii.copy(e.ray).recast(e.near),!(ai.containsPoint(ii.origin)===!1&&(ii.intersectSphere(ai,oi)===null||ii.origin.distanceToSquared(oi)>(e.far-e.near)**2))&&(ri.copy(i).invert(),ii.copy(e.ray).applyMatrix4(ri),(n.boundingBox===null||ii.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,ii)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=gi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=gi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=gi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=gi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function hi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;pi.copy(s),pi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(pi);return l<n.near||l>n.far?null:{distance:l,point:pi.clone(),object:e}}function gi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,si),e.getVertexPosition(c,ci),e.getVertexPosition(l,li);let u=hi(e,t,n,r,si,ci,li,fi);if(u){let e=new W;ur.getBarycoord(fi,si,ci,li,e),i&&(u.uv=ur.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=ur.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=ur.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};ur.getNormal(si,ci,li,t.normal),u.face=t,u.barycoord=e}return u}var _i=new ln,vi=new ln,yi=new ln,bi=new ln,xi=new q,Si=new W,Ci=new Ir,wi=new q,Ti=new ti,Ei=class extends mi{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=f,this.bindMatrix=new q,this.bindMatrixInverse=new q,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new dr),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,Si),this.boundingBox.expandByPoint(Si)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ir),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,Si),this.boundingSphere.expandByPoint(Si)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ci.copy(this.boundingSphere),Ci.applyMatrix4(r),e.ray.intersectsSphere(Ci)!==!1&&(wi.copy(r).invert(),Ti.copy(e.ray).applyMatrix4(wi),(this.boundingBox===null||Ti.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,Ti)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ln,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():R(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;vi.fromBufferAttribute(r.attributes.skinIndex,e),yi.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(_i.copy(t),t.set(0,0,0,0)):(_i.set(...t,1),t.set(0,0,0)),_i.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=yi.getComponent(e);if(r!==0){let i=vi.getComponent(e);xi.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(bi.copy(_i).applyMatrix4(xi),r)}}return t.isVector4&&(t.w=_i.w),t.applyMatrix4(this.bindMatrixInverse)}},Di=class extends Bn{constructor(){super(),this.isBone=!0,this.type=`Bone`}},Oi=class extends cn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=g,l=g,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ki=new q,Ai=new q,ji=class e{constructor(e=[],t=[]){this.uuid=Tt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){R(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new q)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new q;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:Ai;ki.multiplyMatrices(i,t[r]),ki.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Oi(t,e,e,ie,O);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(R(`Skeleton: No bone found with UUID:`,r),i=new Di),this.bones.push(i),this.boneInverses.push(new q().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Mi=new Ir,Ni=new H(.5,.5),Pi=new W,Fi=class{constructor(e=new Jr,t=new Jr,n=new Jr,r=new Jr,i=new Jr,a=new Jr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=lt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476+Ni.distanceTo(e.center),Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Pi.x=r.normal.x>0?e.max.x:e.min.x,Pi.y=r.normal.y>0?e.max.y:e.min.y,Pi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Pi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ii=class extends cn{constructor(e,t,n,r,i,a,o,s,c,l,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},Li=class extends Ii{constructor(e,t,n,r,i,a){super(e,t,n,i,a),this.isCompressedArrayTexture=!0,this.image.depth=r,this.wrapR=m,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ri=class extends Ii{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,301),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},zi=class extends cn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Bi=class extends cn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Vi=class extends cn{constructor(e,t,n=D,r,i,a,o=g,s=g,c,l=ae,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Hi=class extends Vi{constructor(e,t=D,n=301,r,i,a=g,o=g,s,c=ae){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ui=class extends cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Wi=class e extends Wr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Mr(c,3)),this.setAttribute(`normal`,new Mr(l,3)),this.setAttribute(`uv`,new Mr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Gi=class e extends Wr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Mr(p,3)),this.setAttribute(`normal`,new Mr(m,3)),this.setAttribute(`uv`,new Mr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Ki(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ji(i))i.isRenderTargetTexture?(R(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ji(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function qi(e){let t={};for(let n=0;n<e.length;n++){let r=Ki(e[n]);for(let e in r)t[e]=r[e]}return t}function Ji(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Yi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Xi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:K.workingColorSpace}var Zi={clone:Ki,merge:qi},Qi=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$i=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ea=class extends Xr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qi,this.fragmentShader=$i,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=Yi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new ln().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new q().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ta=class extends ea{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},na=class extends Xr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=tt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ra=class extends Xr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ia(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function aa(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function oa(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function sa(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function ca(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0){if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}}var la=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ua=class extends la{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xe,endingEnd:Xe}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ze:i=e,o=2*t-n;break;case Qe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ze:a=e,s=2*n-t;break;case Qe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},da=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},fa=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},pa=class extends la{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=ga(n,t,g,y,r);i[p]=ma(x,o,_,b,m)}return i}};function ma(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function ha(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function ga(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ma(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=ha(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var _a=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ia(t,this.TimeBufferType),this.values=ia(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ia(e.times,Array),values:ia(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),aa(e.settings)&&(n.settings={inTangents:ia(e.settings.inTangents,Array),outTangents:ia(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new fa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new pa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ke:t=this.InterpolantFactoryMethodDiscrete;break;case qe:t=this.InterpolantFactoryMethodLinear;break;case Je:t=this.InterpolantFactoryMethodSmooth;break;case Ye:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return R(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ke;case this.InterpolantFactoryMethodLinear:return qe;case this.InterpolantFactoryMethodSmooth:return Je;case this.InterpolantFactoryMethodBezier:return Ye}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;aa(this.settings)&&(va(this.settings.inTangents,e),va(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(z(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(z(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){z(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){z(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&dt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){z(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Je,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,aa(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function va(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}_a.prototype.ValueTypeName=``,_a.prototype.TimeBufferType=Float32Array,_a.prototype.ValueBufferType=Float32Array,_a.prototype.DefaultInterpolation=qe;var ya=class extends _a{constructor(e,t,n){super(e,t,n)}};ya.prototype.ValueTypeName=`bool`,ya.prototype.ValueBufferType=Array,ya.prototype.DefaultInterpolation=Ke,ya.prototype.InterpolantFactoryMethodLinear=void 0,ya.prototype.InterpolantFactoryMethodSmooth=void 0;var ba=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};ba.prototype.ValueTypeName=`color`;var xa=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};xa.prototype.ValueTypeName=`number`;var Sa=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)U.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ca=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Sa(this.times,this.values,this.getValueSize(),e)}};Ca.prototype.ValueTypeName=`quaternion`,Ca.prototype.InterpolantFactoryMethodSmooth=void 0;var wa=class extends _a{constructor(e,t,n){super(e,t,n)}};wa.prototype.ValueTypeName=`string`,wa.prototype.ValueBufferType=Array,wa.prototype.DefaultInterpolation=Ke,wa.prototype.InterpolantFactoryMethodLinear=void 0,wa.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};Ta.prototype.ValueTypeName=`vector`;var Ea=class{constructor(e=``,t=-1,n=[],r=$e){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Tt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(Oa(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(_a.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=oa(o);o=sa(o,1,c),s=sa(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new xa(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Da(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return xa;case`vector`:case`vector2`:case`vector3`:case`vector4`:return Ta;case`color`:return ba;case`quaternion`:return Ca;case`bool`:case`boolean`:return ya;case`string`:return wa}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function Oa(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=Da(e.type);if(e.times===void 0){let t=[],n=[];ca(e.keys,t,n,`value`),e.times=t,e.values=n}let n;return n=t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e),aa(e.settings)&&(n.settings={inTangents:ia(e.settings.inTangents,Float32Array),outTangents:ia(e.settings.outTangents,Float32Array)}),n}var ka={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Aa(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Aa(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Aa(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var ja=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Ma=class{constructor(e){this.manager=e===void 0?ja:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ma.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Na={},Pa=class extends Error{constructor(e,t){super(e),this.response=t}},Fa=class extends Ma{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=ka.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(Na[e]!==void 0){Na[e].push({onLoad:t,onProgress:n,onError:r});return}Na[e]=[],Na[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&R(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=Na[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}throw new Pa(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{ka.add(`file:${e}`,t);let n=Na[e];delete Na[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=Na[e];if(n===void 0)throw this.manager.itemError(e),t;delete Na[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Ia=new WeakMap,La=class extends Ma{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=ka.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Ia.get(a);e===void 0&&(e=[],Ia.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=ft(`img`);function s(){l(),t&&t(this);let n=Ia.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Ia.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),ka.remove(`image:${e}`);let n=Ia.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Ia.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ka.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},Ra=class extends Ma{constructor(e){super(e)}load(e,t,n,r){let i=new cn,a=new La(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},za=class extends Bn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ba=new q,Va=new W,Ha=new W,Ua=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=S,this.map=null,this.mapPass=null,this.matrix=new q,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fi,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new ln(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Va.setFromMatrixPosition(e.matrixWorld),t.position.copy(Va),Ha.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ha),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ba.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ba,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ba)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Wa=new W,Ga=new U,Ka=new W,qa=class extends Bn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new q,this.projectionMatrix=new q,this.projectionMatrixInverse=new q,this.coordinateSystem=lt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Wa,Ga,Ka),Ka.x===1&&Ka.y===1&&Ka.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wa,Ga,Ka.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Wa,Ga,Ka),Ka.x===1&&Ka.y===1&&Ka.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wa,Ga,Ka.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ja=new W,Ya=new H,Xa=new H,Za=class extends qa{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=wt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ct*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wt*2*Math.atan(Math.tan(Ct*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ja.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ja.x,Ja.y).multiplyScalar(-e/Ja.z),Ja.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ja.x,Ja.y).multiplyScalar(-e/Ja.z)}getViewSize(e,t){return this.getViewBounds(e,Ya,Xa),t.subVectors(Xa,Ya)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ct*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Qa=class extends qa{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},$a=class extends Ua{constructor(){super(new Qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},eo=class extends za{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Bn.DEFAULT_UP),this.updateMatrix(),this.target=new Bn,this.shadow=new $a}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},to=class extends za{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},no=-90,ro=1,io=class extends Bn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Za(no,ro,e,t);r.layers=this.layers,this.add(r);let i=new Za(no,ro,e,t);i.layers=this.layers,this.add(i);let a=new Za(no,ro,e,t);a.layers=this.layers,this.add(a);let o=new Za(no,ro,e,t);o.layers=this.layers,this.add(o);let s=new Za(no,ro,e,t);s.layers=this.layers,this.add(s);let c=new Za(no,ro,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ao=class extends Za{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},oo=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,i,a;switch(t){case`quaternion`:r=this._slerp,i=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case`string`:case`bool`:r=this._select,i=this._select,a=this._setAdditiveIdentityOther,this.buffer=Array(n*5);break;default:r=this._lerp,i=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=i,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,r=this.valueSize,i=e*r+r,a=this.cumulativeWeight;if(a===0){for(let e=0;e!==r;++e)n[i+e]=n[e];a=t}else{a+=t;let e=t/a;this._mixBufferRegion(n,i,0,e,r)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,r=e*t+t,i=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,i<1){let e=t*this._origIndex;this._mixBufferRegion(n,r,e,1-i,t)}a>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let e=t,i=t+t;e!==i;++e)if(n[e]!==n[e+t]){o.setValue(n,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let e=n,i=r;e!==i;++e)t[e]=t[r+e%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,i){if(r>=.5)for(let r=0;r!==i;++r)e[t+r]=e[n+r]}_slerp(e,t,n,r){U.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,i){let a=this._workIndex*i;U.multiplyQuaternionsFlat(e,a,e,t,e,n),U.slerpFlat(e,t,e,t,e,a,r)}_lerp(e,t,n,r,i){let a=1-r;for(let o=0;o!==i;++o){let i=t+o;e[i]=e[i]*a+e[n+o]*r}}_lerpAdditive(e,t,n,r,i){for(let a=0;a!==i;++a){let i=t+a;e[i]=e[i]+e[n+a]*r}}},so=`\\[\\]\\.:\\/`,co=RegExp(`[\\[\\]\\.:\\/]`,`g`),lo=`[^\\[\\]\\.:\\/]`,uo=`[^`+so.replace(`\\.`,``)+`]`,fo=`((?:WC+[\\/:])*)`.replace(`WC`,lo),po=`(WCOD+)?`.replace(`WCOD`,uo),mo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,lo),ho=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,lo),go=RegExp(`^`+fo+po+mo+ho+`$`),_o=[`material`,`materials`,`bones`,`map`],vo=class{constructor(e,t,n){let r=n||yo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},yo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(co,``)}static parseTrackName(e){let t=go.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);_o.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){R(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){z(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){z(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){z(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){z(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){z(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){z(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;z(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){z(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};yo.Composite=vo,yo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},yo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},yo.prototype.GetterByBindingType=[yo.prototype._getValue_direct,yo.prototype._getValue_array,yo.prototype._getValue_arrayElement,yo.prototype._getValue_toArray],yo.prototype.SetterByBindingTypeAndVersioning=[[yo.prototype._setValue_direct,yo.prototype._setValue_direct_setNeedsUpdate,yo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yo.prototype._setValue_array,yo.prototype._setValue_array_setNeedsUpdate,yo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yo.prototype._setValue_arrayElement,yo.prototype._setValue_arrayElement_setNeedsUpdate,yo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yo.prototype._setValue_fromArray,yo.prototype._setValue_fromArray_setNeedsUpdate,yo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var bo=class{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;let i=t.tracks,a=i.length,o=Array(a),s={endingStart:Xe,endingEnd:Xe};for(let e=0;e!==a;++e){let t=i[e].createInterpolant(null);o[e]=t,t.settings=s}this._interpolantSettings=s,this._interpolants=o,this._propertyBindings=Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=We,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let n=this._clip.duration,r=e._clip.duration,i=r/n,a=n/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,i,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let r=this._mixer,i=r.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=r._lendControlInterpolant(),this._timeScaleInterpolant=o);let s=o.parameterPositions,c=o.sampleValues;return s[0]=i,s[1]=i+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}let i=this._startTime;if(i!==null){let r=(e-i)*n;r<0||n===0?t=0:(this._startTime=null,t=n*r)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let e=this._interpolants,t=this._propertyBindings;switch(this.blendMode){case et:for(let n=0,r=e.length;n!==r;++n)e[n].evaluate(a),t[n].accumulateAdditive(o);break;case $e:default:for(let n=0,i=e.length;n!==i;++n)e[n].evaluate(a),t[n].accumulate(r,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,r=this.time+e,i=this._loopCount,a=n===Ge;if(e===0)return i===-1?r:a&&(i&1)==1?t-r:r;if(n===2200){i===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));handle_stop:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break handle_stop}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:`finished`,action:this,direction:e<0?-1:1})}}else{if(i===-1&&(e>=0?(i=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),r>=t||r<0){let n=Math.floor(r/t);r-=t*n,i+=Math.abs(n);let o=this.repetitions-i;if(o<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:`finished`,action:this,direction:e>0?1:-1});else{if(o===1){let t=e<0;this._setEndings(t,!t,a)}else this._setEndings(!1,!1,a);this._loopCount=i,this.time=r,this._mixer.dispatchEvent({type:`loop`,action:this,loopDelta:n})}}else this._loopCount=i,this.time=r;if(a&&(i&1)==1)return t-r}return r}_setEndings(e,t,n){let r=this._interpolantSettings;n?(r.endingStart=Ze,r.endingEnd=Ze):(r.endingStart=e?this.zeroSlopeAtStart?Ze:Xe:Qe,r.endingEnd=t?this.zeroSlopeAtEnd?Ze:Xe:Qe)}_scheduleFading(e,t,n){let r=this._mixer,i=r.time,a=this._weightInterpolant;a===null&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,s=a.sampleValues;return o[0]=i,s[0]=t,o[1]=i+e,s[1]=n,this}},xo=new Float32Array(1),So=class extends bt{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,r=e._clip.tracks,i=r.length,a=e._propertyBindings,o=e._interpolants,s=n.uuid,c=this._bindingsByRootAndName,l=c[s];l===void 0&&(l={},c[s]=l);for(let e=0;e!==i;++e){let i=r[e],c=i.name,u=l[c];if(u!==void 0)++u.referenceCount,a[e]=u;else{if(u=a[e],u!==void 0){u._cacheIndex===null&&(++u.referenceCount,this._addInactiveBinding(u,s,c));continue}let r=t&&t._propertyBindings[e].binding.parsedPath;u=new oo(yo.create(n,c,r),i.ValueTypeName,i.getValueSize()),++u.referenceCount,this._addInactiveBinding(u,s,c),a[e]=u}o[e].resultBuffer=u.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let t=(e._localRoot||this._root).uuid,n=e._clip.uuid,r=this._actionsByClip[n];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,n,t)}let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];n.useCount++===0&&(this._lendBinding(n),n.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];--n.useCount===0&&(n.restoreOriginalState(),this._takeBackBinding(n))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let r=this._actions,i=this._actionsByClip,a=i[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,i[t]=a;else{let t=a.knownActions;e._byClipCacheIndex=t.length,t.push(e)}e._cacheIndex=r.length,r.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;let i=e._clip.uuid,a=this._actionsByClip,o=a[i],s=o.knownActions,c=s[s.length-1],l=e._byClipCacheIndex;c._byClipCacheIndex=l,s[l]=c,s.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],s.length===0&&delete a[i],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];--n.referenceCount===0&&this._removeInactiveBinding(n)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_addInactiveBinding(e,t,n){let r=this._bindingsByRootAndName,i=this._bindings,a=r[t];a===void 0&&(a={},r[t]=a),a[n]=e,e._cacheIndex=i.length,i.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,r=n.rootNode.uuid,i=n.path,a=this._bindingsByRootAndName,o=a[r],s=t[t.length-1],c=e._cacheIndex;s._cacheIndex=c,t[c]=s,t.pop(),delete o[i],Object.keys(o).length===0&&delete a[r]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new da(new Float32Array(2),new Float32Array(2),1,xo),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,i=t[r];e.__cacheIndex=r,t[r]=e,i.__cacheIndex=n,t[n]=i}clipAction(e,t,n){let r=t||this._root,i=r.uuid,a=typeof e==`string`?Ea.findByName(r,e):e,o=a===null?e:a.uuid,s=this._actionsByClip[o],c=null;if(n===void 0&&(n=a===null?$e:a.blendMode),s!==void 0){let e=s.actionByRoot[i];if(e!==void 0&&e.blendMode===n)return e;c=s.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let l=new bo(this,a,t,n);return this._bindAction(l,c),this._addInactiveAction(l,o,i),l}existingAction(e,t){let n=t||this._root,r=n.uuid,i=typeof e==`string`?Ea.findByName(n,e):e,a=i?i.uuid:e,o=this._actionsByClip[a];return o===void 0?null:o.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,r=this.time+=e,i=Math.sign(e),a=this._accuIndex^=1;for(let o=0;o!==n;++o)t[o]._update(r,e,i,a);let o=this._bindings,s=this._nActiveBindings;for(let e=0;e!==s;++e)o[e].apply(a);return this}setTime(e){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,r=this._actionsByClip,i=r[n];if(i!==void 0){let e=i.knownActions;for(let n=0,r=e.length;n!==r;++n){let r=e[n];this._deactivateAction(r);let i=r._cacheIndex,a=t[t.length-1];r._cacheIndex=null,r._byClipCacheIndex=null,a._cacheIndex=i,t[i]=a,t.pop(),this._removeInactiveBindingsForAction(r)}delete r[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let e in n){let r=n[e].actionByRoot[t];r!==void 0&&(this._deactivateAction(r),this._removeInactiveAction(r))}let r=this._bindingsByRootAndName[t];if(r!==void 0)for(let e in r){let t=r[e];t.restoreOriginalState(),this._removeInactiveBinding(t)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},Co=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,R(`Clock: This module has been deprecated. Please use THREE.Timer instead.`)}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},wo=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=B(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(B(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function To(e,t,n,r){let i=Eo(r);switch(n){case M:return e*t;case se:return e*t/i.components*i.byteLength;case ce:return e*t/i.components*i.byteLength;case N:return e*t*2/i.components*i.byteLength;case le:return e*t*2/i.components*i.byteLength;case re:return e*t*3/i.components*i.byteLength;case ie:return e*t*4/i.components*i.byteLength;case ue:return e*t*4/i.components*i.byteLength;case de:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case pe:case me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ge:case ve:return Math.max(e,16)*Math.max(t,8)/4;case he:case _e:return Math.max(e,8)*Math.max(t,8)/2;case ye:case be:case Se:case Ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case xe:case we:case Te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ee:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case De:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Oe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ke:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Ae:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case je:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Me:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ne:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Pe:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case P:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Fe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ie:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Le:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case F:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Re:case I:case L:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ze:case Be:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ve:case He:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Eo(e){switch(e){case S:case C:return{byteLength:1,components:1};case T:case w:case k:return{byteLength:2,components:1};case A:case ee:return{byteLength:2,components:4};case D:case E:case O:return{byteLength:4,components:1};case j:case ne:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?R(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Do(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Oo(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},ko={basic:{uniforms:qi([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:qi([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:qi([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:qi([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:qi([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new J(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:qi([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:qi([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:qi([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:qi([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:qi([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:qi([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:qi([X.common,X.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:qi([X.lights,X.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};ko.physical={uniforms:qi([ko.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var Ao={r:0,b:0,g:0},jo=new q,Mo=new G;Mo.set(-1,0,0,0,1,0,0,0,1);function No(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new mi(new Wi(1,1,1),new ea({name:`BackgroundCubeMaterial`,uniforms:Ki(ko.backgroundCube.uniforms),vertexShader:ko.backgroundCube.vertexShader,fragmentShader:ko.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(jo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Mo),l.material.toneMapped=K.getTransfer(i.colorSpace)!==at,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new mi(new Gi(2,2),new ea({name:`BackgroundMaterial`,uniforms:Ki(ko.background.uniforms),vertexShader:ko.background.vertexShader,fragmentShader:ko.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=K.getTransfer(i.colorSpace)!==at,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Ao,Xi(e)),n.buffers.color.setClear(Ao.r,Ao.g,Ao.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Po(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Fo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Io(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(R(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&R(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Lo(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Jr,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ro=4,zo=6,Bo=20,Vo=256,Ho=new Qa,Uo=new J,Wo=null,Go=0,Ko=0,qo=!1,Jo=new W,Yo=new W,Xo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Jo}=i;Wo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Ko=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ns(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wo,Go,Ko),this._renderer.xr.enabled=qo,e.scissorTest=!1,$o(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wo=this._renderer.getRenderTarget(),Go=this._renderer.getActiveCubeFace(),Ko=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:y,minFilter:y,generateMipmaps:!1,type:k,format:ie,colorSpace:rt,depthBuffer:!1},r=Qo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Zo(r)),this._blurMaterial=ts(r,e,t),this._ggxMaterial=es(r,e,t)}return r}_compileMaterial(e){let t=new mi(new Wr,e);this._renderer.compile(t,Ho)}_sceneToCubeUV(e,t,n,r,i){let a=new Za(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Uo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new mi(new Wi,new ni({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Uo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;$o(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=rs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ns());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;$o(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ho)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ro?n-d+Ro:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,$o(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ho),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,$o(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ho)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];$o(t,3*l*(r>this._lodMax-Ro?r-this._lodMax+Ro:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Ho)}};function Zo(e){let t=[],n=[],r=e,i=e-Ro+1+zo;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Yo.set(1,r,n):e===1?Yo.set(-n,1,-r):e===2?Yo.set(-n,r,1):e===3?Yo.set(-1,r,-n):e===4?Yo.set(-n,-1,r):Yo.set(n,r,-1),Yo.toArray(l,(e*6+t)*3)}}let u=new Wr;u.setAttribute(`position`,new kr(c,3)),u.setAttribute(`outputDirection`,new kr(l,3)),n.push(new mi(u,null)),r>Ro&&r--}return{lodMeshes:n,sizeLods:t}}function Qo(e,t,n){let r=new dn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function $o(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function es(e,t,n){return new ea({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Vo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:is(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ts(e,t,n){return new ea({name:`SphericalGaussianBlur`,defines:{SAMPLES:Bo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:is(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ns(){return new ea({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function rs(){return new ea({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function is(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var as=class extends dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new zi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Wi(5,5,5),i=new ea({name:`CubemapFromEquirect`,uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new mi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=y),new io(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function os(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new as(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Xo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Xo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function ss(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&_t(`WebGLRenderer: `+e+` extension not supported.`),t}}}function cs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?jr:Ar)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function ls(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function us(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:z(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ds(e,t,n){let r=new WeakMap,i=new ln;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new fn(h,p,m,u);g.type=O,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function fs(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ps={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ms(e,t,n,r,i,a){let o=new dn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Wr;l.setAttribute(`position`,new Mr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Mr([0,2,0,0,2,0],2));let u=new ta({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new mi(l,u),f=new Qa(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new dn(t,n,{type:k,depthBuffer:!1,stencilBuffer:!1}),c=new dn(t,n,{type:k,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},K.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=ps[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var hs=new cn,gs=new Vi(1,1),_s=new fn,vs=new pn,ys=new zi,bs=[],xs=[],Ss=new Float32Array(16),Cs=new Float32Array(9),ws=new Float32Array(4);function Ts(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=bs[i];if(a===void 0&&(a=new Float32Array(i),bs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Es(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Ds(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Os(e,t){let n=xs[t];n===void 0&&(n=new Int32Array(t),xs[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function ks(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function As(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Es(n,t))return;e.uniform2fv(this.addr,t),Ds(n,t)}}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Es(n,t))return;e.uniform3fv(this.addr,t),Ds(n,t)}}function Ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Es(n,t))return;e.uniform4fv(this.addr,t),Ds(n,t)}}function Ns(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Es(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ds(n,t)}else{if(Es(n,r))return;ws.set(r),e.uniformMatrix2fv(this.addr,!1,ws),Ds(n,r)}}function Ps(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Es(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ds(n,t)}else{if(Es(n,r))return;Cs.set(r),e.uniformMatrix3fv(this.addr,!1,Cs),Ds(n,r)}}function Fs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Es(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ds(n,t)}else{if(Es(n,r))return;Ss.set(r),e.uniformMatrix4fv(this.addr,!1,Ss),Ds(n,r)}}function Is(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Es(n,t))return;e.uniform2iv(this.addr,t),Ds(n,t)}}function Rs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Es(n,t))return;e.uniform3iv(this.addr,t),Ds(n,t)}}function zs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Es(n,t))return;e.uniform4iv(this.addr,t),Ds(n,t)}}function Bs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Vs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Es(n,t))return;e.uniform2uiv(this.addr,t),Ds(n,t)}}function Hs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Es(n,t))return;e.uniform3uiv(this.addr,t),Ds(n,t)}}function Us(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Es(n,t))return;e.uniform4uiv(this.addr,t),Ds(n,t)}}function Ws(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(gs.compareFunction=n.isReversedDepthBuffer()?518:515,a=gs):a=hs,n.setTexture2D(t||a,i)}function Gs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||vs,i)}function Ks(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ys,i)}function qs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||_s,i)}function Js(e){switch(e){case 5126:return ks;case 35664:return As;case 35665:return js;case 35666:return Ms;case 35674:return Ns;case 35675:return Ps;case 35676:return Fs;case 5124:case 35670:return Is;case 35667:case 35671:return Ls;case 35668:case 35672:return Rs;case 35669:case 35673:return zs;case 5125:return Bs;case 36294:return Vs;case 36295:return Hs;case 36296:return Us;case 35678:case 36198:case 36298:case 36306:case 35682:return Ws;case 35679:case 36299:case 36307:return Gs;case 35680:case 36300:case 36308:case 36293:return Ks;case 36289:case 36303:case 36311:case 36292:return qs}}function Ys(e,t){e.uniform1fv(this.addr,t)}function Xs(e,t){let n=Ts(t,this.size,2);e.uniform2fv(this.addr,n)}function Zs(e,t){let n=Ts(t,this.size,3);e.uniform3fv(this.addr,n)}function Qs(e,t){let n=Ts(t,this.size,4);e.uniform4fv(this.addr,n)}function $s(e,t){let n=Ts(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ec(e,t){let n=Ts(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function tc(e,t){let n=Ts(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function nc(e,t){e.uniform1iv(this.addr,t)}function rc(e,t){e.uniform2iv(this.addr,t)}function ic(e,t){e.uniform3iv(this.addr,t)}function ac(e,t){e.uniform4iv(this.addr,t)}function oc(e,t){e.uniform1uiv(this.addr,t)}function sc(e,t){e.uniform2uiv(this.addr,t)}function cc(e,t){e.uniform3uiv(this.addr,t)}function lc(e,t){e.uniform4uiv(this.addr,t)}function uc(e,t,n){let r=this.cache,i=t.length,a=Os(n,i);Es(r,a)||(e.uniform1iv(this.addr,a),Ds(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?gs:hs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function dc(e,t,n){let r=this.cache,i=t.length,a=Os(n,i);Es(r,a)||(e.uniform1iv(this.addr,a),Ds(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||vs,a[e])}function fc(e,t,n){let r=this.cache,i=t.length,a=Os(n,i);Es(r,a)||(e.uniform1iv(this.addr,a),Ds(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ys,a[e])}function pc(e,t,n){let r=this.cache,i=t.length,a=Os(n,i);Es(r,a)||(e.uniform1iv(this.addr,a),Ds(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||_s,a[e])}function mc(e){switch(e){case 5126:return Ys;case 35664:return Xs;case 35665:return Zs;case 35666:return Qs;case 35674:return $s;case 35675:return ec;case 35676:return tc;case 5124:case 35670:return nc;case 35667:case 35671:return rc;case 35668:case 35672:return ic;case 35669:case 35673:return ac;case 5125:return oc;case 36294:return sc;case 36295:return cc;case 36296:return lc;case 35678:case 36198:case 36298:case 36306:case 35682:return uc;case 35679:case 36299:case 36307:return dc;case 35680:case 36300:case 36308:case 36293:return fc;case 36289:case 36303:case 36311:case 36292:return pc}}var hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Js(t.type)}},gc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mc(t.type)}},_c=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},vc=/(\w+)(\])?(\[|\.)?/g;function yc(e,t){e.seq.push(t),e.map[t.id]=t}function bc(e,t,n){let r=e.name,i=r.length;for(vc.lastIndex=0;;){let a=vc.exec(r),o=vc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){yc(n,l===void 0?new hc(s,e,t):new gc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new _c(s),yc(n,e)),n=e}}}var xc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);bc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Sc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Cc=37297,wc=0;function Tc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Ec=new G;function Dc(e){K._getMatrix(Ec,K.workingColorSpace,e);let t=`mat3( ${Ec.elements.map(e=>e.toFixed(4))} )`;switch(K.getTransfer(e)){case it:return[t,`LinearTransferOETF`];case at:return[t,`sRGBTransferOETF`];default:return R(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Oc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Tc(e.getShaderSource(t),r)}return i}function kc(e,t){let n=Dc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Ac={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function jc(e,t){let n=Ac[t];return n===void 0?(R(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Mc=new W;function Nc(){return K.getLuminanceCoefficients(Mc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Mc.x.toFixed(4)}, ${Mc.y.toFixed(4)}, ${Mc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Pc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Lc).join(`
`)}function Fc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ic(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Lc(e){return e!==``}function Rc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Bc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vc(e){return e.replace(Bc,Uc)}var Hc=new Map;function Uc(e,t){let n=Y[t];if(n===void 0){let e=Hc.get(t);if(e!==void 0)n=Y[e],R(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Vc(n)}var Wc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gc(e){return e.replace(Wc,Kc)}function Kc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function qc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Jc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Yc(e){return Jc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Xc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Zc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Xc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Qc={302:`ENVMAP_MODE_REFRACTION`};function $c(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Qc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var el={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function tl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:el[e.combine]||`ENVMAP_BLENDING_NONE`}function nl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function rl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Yc(n),l=Zc(n),u=$c(n),d=tl(n),f=nl(n),p=Pc(n),m=Fc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Lc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Lc).join(`
`),_.length>0&&(_+=`
`)):(g=[qc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Lc).join(`
`),_=[qc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:jc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,kc(`linearToOutputTexel`,n.outputColorSpace),Nc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Lc).join(`
`)),o=Vc(o),o=Rc(o,n),o=zc(o,n),s=Vc(s),s=Rc(s,n),s=zc(s,n),o=Gc(o),s=Gc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Sc(i,i.VERTEX_SHADER,y),S=Sc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Oc(i,x,`vertex`),n=Oc(i,S,`fragment`);z(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):R(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new xc(i,h),T=Ic(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Cc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=wc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var il=0,al=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ol(e),t.set(e,n)),n}},ol=class{constructor(e){this.id=il++,this.code=e,this.usedTimes=0}};function sl(e){return e===1030||e===37490||e===36285}function cl(e,t,n,r,i,a){let o=new wn,s=new al,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&R(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ko[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,ne=h.isBatchedMesh===!0,M=!!i.map,re=!!i.matcap,ie=!!x,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,ce=!!i.normalMap,N=!!i.displacementMap,le=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,je=ve&&!!i.thicknessMap,Me=!!i.gradientMap,Ne=!!i.alphaMap,Pe=i.alphaTest>0,P=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:K.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:M,matcap:re,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:N,emissiveMap:le,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&sl(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ne,alphaTest:Pe,alphaHash:P,combine:i.combine,mapUv:M&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:oe&&m(i.lightMap.channel),bumpMapUv:se&&m(i.bumpMap.channel),normalMapUv:ce&&m(i.normalMap.channel),displacementMapUv:N&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:ue&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:Ae&&m(i.transmissionMap.channel),thicknessMapUv:je&&m(i.thicknessMap.channel),alphaMapUv:Ne&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ce||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(M||Ne),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:M&&i.map.isVideoTexture===!0&&K.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&K.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ko[t];n=Zi.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new rl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function ll(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ul(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function dl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function fl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ul),r.length>1&&r.sort(t||dl),i.length>1&&i.sort(t||dl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function pl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new fl,e.set(t,[i])):n>=r.length?(i=new fl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function ml(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new J};break;case`SpotLight`:n={position:new W,direction:new W,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function hl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var gl=0;function _l(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function vl(e){let t=new ml,n=hl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new q,o=new q;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(_l);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=gl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function yl(e){let t=new vl(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function bl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new yl(e),t.set(n,[a])):r>=i.length?(a=new yl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var xl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Cl=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],wl=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Tl=new q,El=new W,Dl=new W;function Ol(e,t,n){let r=new Fi,i=new H,a=new H,o=new ln,s=new na,c=new ra,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new ea({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:xl,fragmentShader:Sl}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Wr;m.setAttribute(`position`,new kr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new mi(m,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,s){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;this.type===2&&(R(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=v!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){R(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){R(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new dn(i.x,i.y,{format:N,type:k,minFilter:y,magFilter:y,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Vi(i.x,i.y,O),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ae,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=g,d.map.depthTexture.magFilter=g}else l.isPointLight?(d.map=new as(i.x),d.map.depthTexture=new Hi(i.x,D)):(d.map=new dn(i.x,i.y),d.map.depthTexture=new Vi(i.x,i.y,D)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ae,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=y,d.map.depthTexture.magFilter=y):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=g,d.map.depthTexture.magFilter=g);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let _=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<_;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),El.setFromMatrixPosition(l.matrixWorld),e.position.copy(El),Dl.copy(e.position),Dl.add(Cl[t]),e.up.copy(wl[t]),e.lookAt(Dl),e.updateMatrixWorld(),n.makeTranslation(-El.x,-El.y,-El.z),Tl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Tl,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new dn(i.x,i.y,{format:N,type:k}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,C)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=x(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)S(c[e],i,a,o,s)}function C(e){e.target.removeEventListener(`dispose`,C);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function kl(e,t){function n(){let t=!1,n=new ln,r=null,i=new ln(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ue(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=yt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ue(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ne=0,M=e.getParameter(e.VERSION);M.indexOf(`WebGL`)===-1?M.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(M)[1]),j=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(M)[1]),j=ne>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new ln().fromArray(ae),ce=new ln().fromArray(oe);function N(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=N(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=N(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=N(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=N(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ue(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),ue(e.CULL_FACE),_e(0);function ue(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(ue(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:z(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:z(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:z(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:z(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):ue(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ue(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(ue(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function xe(t){t!==k&&(j&&e.lineWidth(t),k=t)}function Se(t,n,r){t?(ue(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?ue(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+te-1),re!==t&&(e.activeTexture(t),re=t)}function Te(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+te-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Ee(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function P(){try{e.texImage2D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){z(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function F(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function I(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function L(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ze(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},re=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ue,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:P,texImage3D:Fe,pixelStorei:Le,getParameter:Ie,updateUBOMapping:I,uniformBlockBinding:L,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:F,viewport:Re,reset:ze}}function Al(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new H,u=new WeakMap,d=new Set,f,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):ft(`canvas`)}function T(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=w(n,a));let o=t?w(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),R(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&R(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];R(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||R(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?it:K.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,R(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),ne(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),re(t)}function ne(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&M(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function M(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function re(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let ie=0;function ae(){ie=0}function se(){return ie}function ce(e){ie=e}function N(){let e=ie;return e>=i.maxTextures&&R(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ie+=1,e}function le(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ue(t,i){let a=r.get(t);if(t.isVideoTexture&&P(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)R(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)R(`WebGLRenderer: Texture marked for update but image is incomplete`);else{xe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function fe(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function pe(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){Se(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let me={[p]:e.REPEAT,[m]:e.CLAMP_TO_EDGE,[h]:e.MIRRORED_REPEAT},he={[g]:e.NEAREST,[_]:e.NEAREST_MIPMAP_NEAREST,[v]:e.NEAREST_MIPMAP_LINEAR,[y]:e.LINEAR,[b]:e.LINEAR_MIPMAP_NEAREST,[x]:e.LINEAR_MIPMAP_LINEAR},ge={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function _e(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&R(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,me[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,me[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,me[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,he[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,he[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ge[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ve(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,te));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=le(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&M(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function be(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ye(n.start,r.width,4),c=ye(t.start,r.width,4);n.start<=i+1&&a===c&&ye(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function xe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ve(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=K.getPrimaries(K.workingColorSpace),r=o.colorSpace===``?null:K.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=T(o.image,!1,i.maxTextureSize);t=Fe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=k(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);_e(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,v=f.__version===void 0||l===!0,y=u.dataReady,b=ee(o,t);if(o.isDepthTexture)m=A(o.format===oe,o.type),v&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&v&&n.texStorage2D(e.TEXTURE_2D,b,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(v&&n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height),y&&be(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&v&&n.texStorage3D(e.TEXTURE_2D_ARRAY,b,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(y){if(o.layerUpdates.size>0){let t=To(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?y&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&v&&n.texStorage2D(e.TEXTURE_2D,b,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?y&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(v&&n.texStorage3D(e.TEXTURE_2D_ARRAY,b,m,t.width,t.height,t.depth),y){if(o.layerUpdates.size>0){let i=To(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(v&&n.texStorage3D(e.TEXTURE_3D,b,m,t.width,t.height,t.depth),y&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(v){if(_)n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<b;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&v){let t=Ie(g[0]);n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(v){let r=Ie(t);n.texStorage2D(e.TEXTURE_2D,b,m,r.width,r.height)}y&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);E(o)&&D(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Se(t,o,s){if(o.image.length!==6)return;let c=ve(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=K.getPrimaries(K.workingColorSpace),r=o.colorSpace===``?null:K.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=T(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Fe(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=k(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=ee(o,h);_e(e.TEXTURE_CUBE_MAP,o);let C;if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?R(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=Ie(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}E(o)&&D(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Ce(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=k(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ne(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Pe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=k(o.internalFormat,c,l,o.normalized,o.colorSpace);Pe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Te(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,te)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),_e(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ue(i.depthTexture,0);let u=l.__webglTexture,d=Ne(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ee(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Te(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Te(i.__webglFramebuffer[0],t,0):Te(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),we(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),we(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function De(t,n,i){let a=r.get(t);n!==void 0&&Ce(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ee(t)}function Oe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,j);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Pe(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=k(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),we(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),_e(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ce(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ce(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);E(i)&&D(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),_e(c,a),Ce(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),E(a)&&D(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),_e(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ce(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ce(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);E(i)&&D(r),n.unbindTexture()}t.depthBuffer&&Ee(t)}function ke(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(E(a)){let t=O(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),D(t),n.unbindTexture()}}}let Ae=[],je=[];function Me(t){if(t.samples>0){if(Pe(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ae.length=0,je.length=0,Ae.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Ae.push(l),je.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,je)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ae))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(i.maxSamples,e.samples)}function Pe(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function P(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(K.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&R(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):z(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=ae,this.getTextureUnits=se,this.setTextureUnits=ce,this.setTexture2D=ue,this.setTexture2DArray=de,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=De,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function jl(e,t){function n(n,r=``){let i,a=K.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ml=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Pl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ui(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ea({vertexShader:Ml,fragmentShader:Nl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new mi(new Gi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fl=class extends bt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Pl,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],C=new H,w=null,T=null,E=new Za;E.viewport=new ln;let O=new Za;O.viewport=new ln;let k=[E,O],A=new ao,ee=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Un,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Un,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Un,b[e]=t),t.getHandSpace()};function ne(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,ne),r.removeEventListener(`selectstart`,ne),r.removeEventListener(`selectend`,ne),r.removeEventListener(`squeeze`,ne),r.removeEventListener(`squeezestart`,ne),r.removeEventListener(`squeezeend`,ne),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,re);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}ee=null,j=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),T!==null){let e=T.camera;e.fov=T.fov,e.zoom=T.zoom,e.updateProjectionMatrix(),T=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&R(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,ne),r.addEventListener(`selectstart`,ne),r.addEventListener(`selectend`,ne),r.addEventListener(`squeeze`,ne),r.addEventListener(`squeezestart`,ne),r.addEventListener(`squeezeend`,ne),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,re),_.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?oe:ae,a=_.stencil?te:D);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new dn(d.textureWidth,d.textureHeight,{format:ie,type:S,depthTexture:new Vi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new dn(f.framebufferWidth,f.framebufferHeight,{format:ie,type:S,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function re(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let se=new W,ce=new W;function N(e,t,n){se.setFromMatrixPosition(t.matrixWorld),ce.setFromMatrixPosition(n.matrixWorld);let r=se.distanceTo(ce),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function le(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),A.near=O.near=E.near=t,A.far=O.far=E.far=n,(ee!==A.near||j!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),ee=A.near,j=A.far),A.layers.mask=e.layers.mask|6,E.layers.mask=A.layers.mask&-5,O.layers.mask=A.layers.mask&-3;let i=e.parent,a=A.cameras;le(A,i);for(let e=0;e<a.length;e++)le(a[e],i);a.length===2?N(A,E,O):A.projectionMatrix.copy(E.projectionMatrix),T===null&&e.isPerspectiveCamera&&(T={camera:e,fov:e.fov,zoom:e.zoom}),ue(e,A,i)};function ue(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=wt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(A)},this.getCameraTexture=function(e){return g[e]};let de=null;function fe(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==A.cameras.length&&(A.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=k[n];o===void 0&&(o=new Za,o.layers.enable(n),o.viewport=new ln,k[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),i===!0&&A.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ui,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}de&&de(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let pe=new Do;pe.setAnimationLoop(fe),this.setAnimationLoop=function(e){de=e},this.dispose=function(){}}},Il=new q,Ll=new G;Ll.set(-1,0,0,0,1,0,0,0,1);function Rl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Xi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Il.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Ll),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function zl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return z(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?R(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):R(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Bl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vl=null;function Hl(){return Vl===null&&(Vl=new Oi(Bl,16,16,N,k),Vl.name=`DFG_LUT`,Vl.minFilter=y,Vl.magFilter=y,Vl.wrapS=m,Vl.wrapT=m,Vl.generateMipmaps=!1,Vl.needsUpdate=!0),Vl}var Ul=class{constructor(e={}){let{canvas:t=pt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=S}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ue,le,ce]),g=new Set([S,D,T,te,A,ee]),_=new Uint32Array(4),v=new Int32Array(4),y=new W,b=null,C=null,w=[],E=[],O=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,ne=!1,M=null,re=null,ie=null,ae=null;this._outputColorSpace=nt;let oe=0,se=0,N=null,de=-1,fe=null,pe=new ln,me=new ln,he=null,ge=new J(0),_e=0,ve=t.width,ye=t.height,be=1,xe=null,Se=null,Ce=new ln(0,0,ve,ye),we=new ln(0,0,ve,ye),Te=!1,Ee=new Fi,De=!1,Oe=!1,ke=new q,Ae=new W,je=new ln,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return N===null?be:1}let P=n;function Fe(e,n){return t.getContext(e,n)}let Ie,Le,F,Re,I,L,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,at,!1),t.addEventListener(`webglcontextrestored`,ot,!1),t.addEventListener(`webglcontextcreationerror`,st,!1),P===null){let t=`webgl2`;if(P=Fe(t,e),P===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}rt()}catch(e){throw t.removeEventListener(`webglcontextlost`,at,!1),t.removeEventListener(`webglcontextrestored`,ot,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),z(`WebGLRenderer: `+e.message),e}function rt(){Ie=new ss(P),Ie.init(),$e=new jl(P,Ie),Le=new Io(P,Ie,e,$e),F=new kl(P,Ie),Le.reversedDepthBuffer&&d&&F.buffers.depth.setReversed(!0),re=P.createFramebuffer(),ie=P.createFramebuffer(),ae=P.createFramebuffer(),Re=new us(P),I=new ll,L=new Al(P,Ie,F,I,Le,$e,Re),ze=new os(j),Be=new Oo(P),et=new Po(P,Be),Ve=new cs(P,Be,Re,et),He=new fs(P,Ve,Be,et,Re),Xe=new ds(P,Le,L),qe=new Lo(I),Ue=new cl(j,ze,Ie,Le,et,qe),We=new Rl(j,I),Ge=new pl,Ke=new bl(Ie),Ye=new No(j,ze,F,He,p,s),Je=new Ol(j,He,Le),tt=new zl(P,Re,Le,F),Ze=new Fo(P,Ie,Re),Qe=new ls(P,Ie,Re),Re.programs=Ue.programs,j.capabilities=Le,j.extensions=Ie,j.properties=I,j.renderLists=Ge,j.shadowMap=Je,j.state=F,j.info=Re}m!==1009&&(O=new ms(m,t.width,t.height,o,r,i));let it=new Fl(j,P);this.xr=it,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return be},this.setPixelRatio=function(e){e!==void 0&&(be=e,this.setSize(ve,ye,!1))},this.getSize=function(e){return e.set(ve,ye)},this.setSize=function(e,n,r=!0){if(it.isPresenting){R(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ve=e,ye=n,t.width=Math.floor(e*be),t.height=Math.floor(n*be),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),O!==null&&O.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ve*be,ye*be).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,ye=n,be=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){z(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){R(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}O.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(pe)},this.getViewport=function(e){return e.copy(Ce)},this.setViewport=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),F.viewport(pe.copy(Ce).multiplyScalar(be).round())},this.getScissor=function(e){return e.copy(we)},this.setScissor=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),F.scissor(me.copy(we).multiplyScalar(be).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(e){F.setScissorTest(Te=e)},this.setOpaqueSort=function(e){xe=e},this.setTransparentSort=function(e){Se=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,P.clearBufferiv(P.COLOR,0,v))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),M=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,at,!1),t.removeEventListener(`webglcontextrestored`,ot,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),Ye.dispose(),Ge.dispose(),Ke.dispose(),I.dispose(),ze.dispose(),He.dispose(),et.dispose(),tt.dispose(),Ue.dispose(),it.dispose(),it.removeEventListener(`sessionstart`,_t),it.removeEventListener(`sessionend`,yt),bt.stop()};function at(e){e.preventDefault(),ht(`WebGLRenderer: Context Lost.`),ne=!0}function ot(){ht(`WebGLRenderer: Context Restored.`),ne=!1;let e=Re.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;rt(),Re.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function st(e){z(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ct(e){let t=e.target;t.removeEventListener(`dispose`,ct),ut(t)}function ut(e){dt(e),I.remove(e)}function dt(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=kt(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;et.setup(i,r,s,n,c);let h,g=Ze;if(c!==null&&(h=Be.get(c),g=Qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Be.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ft(e,t,n,r){M!==null&&e.isNodeMaterial&&M.setObject(r,e),De===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,B(e,t,r),e.side=0,e.needsUpdate=!0,B(e,t,r),e.side=2):B(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),M!==null&&M.renderStart(e,t,n),C=Ke.get(n),C.init(t),E.push(C),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(C.pushLight(e),e.castShadow&&C.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(C.pushLight(e),e.castShadow&&C.pushShadow(e))}),C.setupLights(),M!==null&&M.updateLights(C.state.lightsArray),Oe=this.localClippingEnabled,De=qe.init(this.clippingPlanes,Oe),De===!0&&qe.setGlobalState(this.clippingPlanes,t),M!==null&&Je.render(C.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ft(o,n,t,e),r.add(o)}else ft(i,n,t,e),r.add(i)}}),C=E.pop(),M!==null&&M.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let mt=null;function gt(e){mt&&mt(e)}function _t(){bt.stop()}function yt(){bt.start()}let bt=new Do;bt.setAnimationLoop(gt),typeof self<`u`&&bt.setContext(self),this.setAnimationLoop=function(e){mt=e,it.setAnimationLoop(e),e===null?bt.stop():bt.start()},it.addEventListener(`sessionstart`,_t),it.addEventListener(`sessionend`,yt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){z(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ne===!0)return;M!==null&&M.renderStart(e,t);let n=it.enabled===!0&&it.isPresenting===!0,r=O!==null&&(N===null||n)&&O.begin(j,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(t),t=it.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,N),C=Ke.get(e,E.length),C.init(t),C.state.textureUnits=L.getTextureUnits(),E.push(C),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ee.setFromProjectionMatrix(ke,lt,t.reversedDepth),Oe=this.localClippingEnabled,De=qe.init(this.clippingPlanes,Oe),b=Ge.get(e,w.length),b.init(),w.push(b),it.enabled===!0&&it.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&xt(e,t,-1/0,j.sortObjects)}xt(e,t,0,j.sortObjects),b.finish(),M!==null&&M.updateLights(C.state.lightsArray),j.sortObjects===!0&&b.sort(xe,Se),Ne=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Ne&&Ye.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),De===!0&&qe.beginShadows();let i=C.state.shadowsArray;if(Je.render(i,e,t),De===!0&&qe.endShadows(),(r&&O.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(C.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ct(n,r,e,a)}Ne&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];St(b,e,n,n.viewport)}}else r.length>0&&Ct(n,r,e,t),Ne&&Ye.render(e),St(b,e,t)}N!==null&&se===0&&(L.updateMultisampleRenderTarget(N),L.updateRenderTargetMipmap(N)),r&&O.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),et.resetDefaultState(),de=-1,fe=null,E.pop(),E.length>0?(C=E[E.length-1],L.setTextureUnits(C.state.textureUnits),De===!0&&qe.setGlobalState(j.clippingPlanes,C.state.camera)):C=null,w.pop(),b=w.length>0?w[w.length-1]:null,M!==null&&M.renderEnd()};function xt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)C.pushLightProbeGrid(e);else if(e.isLight)C.pushLight(e),e.castShadow&&C.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ee)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let i=He.update(e),a=e.material;a.visible&&b.push(e,i,a,n,je.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ee))){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),je.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,je.z,s,t)}}else a.visible&&b.push(e,i,a,n,je.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)xt(i[e],t,n,r)}function St(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;C.setupLightsView(n),De===!0&&qe.setGlobalState(j.clippingPlanes,n),r&&F.viewport(pe.copy(r)),i.length>0&&wt(i,t,n),a.length>0&&wt(a,t,n),o.length>0&&wt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Ct(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);C.state.transmissionRenderTarget[r.id]=new dn(1,1,{generateMipmaps:!0,type:e?k:S,minFilter:x,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:K.workingColorSpace})}let a=C.state.transmissionRenderTarget[r.id],o=r.viewport||pe;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),l=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(ge),_e=j.getClearAlpha(),_e<1&&j.setClearColor(16777215,.5),j.clear(),Ne&&Ye.render(n);let u=j.toneMapping;j.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),C.setupLightsView(r),De===!0&&qe.setGlobalState(j.clippingPlanes,r),wt(e,n,r),L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Tt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(L.updateMultisampleRenderTarget(a),L.updateRenderTargetMipmap(a))}j.setRenderTarget(s,c,l),j.setClearColor(ge,_e),d!==void 0&&(r.viewport=d),j.toneMapping=u}function wt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Tt(o,t,n,s,l,c)}}function Tt(e,t,n,r,i,a){M!==null&&i.isNodeMaterial&&M.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function B(e,t,n){t.isScene!==!0&&(t=Me);let r=I.get(e),i=C.state.lights,a=C.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,C.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ze.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ct),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=Ue.getUniforms(e),M!==null&&e.isNodeMaterial&&M.build(e,n,s),e.onBeforeCompile(s,j),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),Dt(e,s),r.needsLights=jt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=C.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Et(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=xc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ot(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function kt(e,t,n,r,i){t.isScene!==!0&&(t=Me),L.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?j.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:K.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ze.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=C.state.lights;if(De===!0&&(Oe===!0||e!==fe)){let t=e===fe&&r.id===de;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=C.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=B(r,t,i),M&&r.isNodeMaterial&&M.onUpdateProgram(r,x,v));let S=!1,w=!1,T=!1,E=x.getUniforms(),D=v.uniforms;if(F.useProgram(x.program)&&(S=!0,w=!0,T=!0),r.id!==de&&(de=r.id,w=!0),v.needsLights){let e=Ot(C.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(S||fe!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(P,`projectionMatrix`,e.projectionMatrix),E.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(P,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&E.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),fe!==e&&(fe=e,w=!0,T=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&E.setValue(P,`sunShadowMap`,y.state.sunShadowMap,L),y.state.directionalShadowMap.length>0&&E.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,L),y.state.spotShadowMap.length>0&&E.setValue(P,`spotShadowMap`,y.state.spotShadowMap,L),y.state.pointShadowMap.length>0&&E.setValue(P,`pointShadowMap`,y.state.pointShadowMap,L)),i.isSkinnedMesh){E.setOptional(P,i,`bindMatrix`),E.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(P,`boneTexture`,e.boneTexture,L))}i.isBatchedMesh&&(E.setOptional(P,i,`batchingTexture`),E.setValue(P,`batchingTexture`,i._matricesTexture,L),E.setOptional(P,i,`batchingIdTexture`),E.setValue(P,`batchingIdTexture`,i._indirectTexture,L),E.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(P,`batchingColorTexture`,i._colorsTexture,L));let O=n.morphAttributes;if((O.position!==void 0||O.normal!==void 0||O.color!==void 0)&&Xe.update(i,n,x),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,E.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(D.envMapIntensity.value=t.environmentIntensity),D.dfgLUT!==void 0&&(D.dfgLUT.value=Hl()),w){if(E.setValue(P,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&At(D,T),a&&r.fog===!0&&We.refreshFogUniforms(D,a),We.refreshMaterialUniforms(D,r,be,ye,C.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;D.probesSH.value=e.texture,D.probesMin.value.copy(e.boundingBox.min),D.probesMax.value.copy(e.boundingBox.max),D.probesResolution.value.copy(e.resolution)}xc.upload(P,Et(v),D,L)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(xc.upload(P,Et(v),D,L),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(P,`center`,i.center),E.setValue(P,`modelViewMatrix`,i.modelViewMatrix),E.setValue(P,`normalMatrix`,i.normalMatrix),E.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];tt.update(n,x),tt.bind(n,x)}}return x}function At(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function jt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return se},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,oe=t,se=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest,F.viewport(pe),F.scissor(me),F.setScissorTest(he),de=-1;return}if(o.__webglFramebuffer===void 0)L.setupRenderTarget(e);else if(o.__hasExternalTextures)L.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);L.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&L.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest}else pe.copy(Ce).multiplyScalar(be).floor(),me.copy(we).multiplyScalar(be).floor(),he=Te;if(n!==0&&(r=re),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(pe),F.scissor(me),F.setScissorTest(he),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}de=-1};function Mt(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Le.textureFormatReadable(e.format),t.__typeReadable=Le.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=Mt(o);if(u.__formatReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){z(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,$e.convert(c),$e.convert(l),a)}finally{let e=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,$e.convert(l),$e.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await vt(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;L.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=$e.convert(t.format),_=$e.convert(t.type),v;t.isData3DTexture?(L.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(L.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(L.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,ie),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,ae);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&L.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?L.setTextureCube(e,0):e.isData3DTexture?L.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?L.setTexture2DArray(e,0):L.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){oe=0,se=0,N=null,F.reset(),et.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return lt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=K._getDrawingBufferColorSpace(e),t.unpackColorSpace=K._getUnpackColorSpace()}};function Wl(e,t){let{corePath:n,warnings:r,...i}=e;return{...t,...i,warnings:[...t.warnings??[],...r??[]]}}var Gl=new WeakMap;function Kl(e){let t=e.toLowerCase();if(t===`head_optional`||t===`accessory`)return`head_optional`;if(t===`body`||t===`head`||t===`hair`)return t;throw Error(`Unsupported runtime part type: ${e}`)}function ql(e){let t=Kl(e.partType);return(t===`head`||t===`head_optional`)&&Yl(e.headCostume3dAssetbundleType)?`head`:t===`head`&&Xl(e.headCostume3dAssetbundleType)?`head_optional`:t}function Jl(e){try{return ql(e)}catch{return null}}function Yl(e){return(e??``).trim().toLowerCase()===`head_and_hair`}function Xl(e){let t=(e??``).trim().toLowerCase();return t===`head_only`||t===`head_all`||t===`head_front`||t===`head_back`}function Z(e,t){return`${e}:${Su(t)}`}function Zl(e){let t=e.roles.find(t=>iu(e,t.characterId,t.unit??null,`body`,t.bodyCostume3dId)&&au(e,t.characterId,t.unit??null,t.headCostume3dId)&&iu(e,t.characterId,t.unit??null,`hair`,t.hairCostume3dId));if(t){let n=t.bodyCostume3dId,r=t.headCostume3dId,i=t.hairCostume3dId;return{characterId:t.characterId,unit:t.unit??null,bodyCostume3dId:n,headCostume3dId:r,headPackagePath:hu(e,t.characterId,t.unit??null,r),hairCostume3dId:i,headOptionalCostume3dId:null}}let n=nu(e,`body`);if(!n)return null;let r=ru(e,n.characterId,n.unit??null);if(!r)return null;let{head:i,hair:a}=r;return{characterId:n.characterId,unit:n.unit??i.unit??a.unit??null,bodyCostume3dId:n.costume3dId,headCostume3dId:i.costume3dId,headPackagePath:i.packagePath,hairCostume3dId:a.costume3dId,headOptionalCostume3dId:null}}function Ql(e,t,n,r={}){return e.registry.filter(e=>e.characterId===t).filter(e=>r.unit===void 0||Cu(e.unit,r.unit)).filter(e=>Jl(e)===n).filter(gu).filter(t=>!r.loadedOnly||_u(t)||e.packages.has(t.packagePath)).sort((e,t)=>e.costume3dId-t.costume3dId)}function $l(e){let{partSet:t,selection:n,activeRoleId:r,resolveUrl:i}=e,a=Z(n.characterId,n.unit);if(r!==null&&a!==r)throw Error(`Custom switching is limited to role ${r}. Reload/select another role before switching to ${a}.`);let o=ou(t,n.characterId,n.unit,`body`,n.bodyCostume3dId),s=ou(t,n.characterId,n.unit,`hair`,n.hairCostume3dId),c=su(t,n),l={...n,headPackagePath:c.packagePath},u=cu(t,l,c),d=u&&ql(u.part)===`head`?u:s,f=ql(c)===`head`?tu(t,n):null,p=f?t.packages.get(f.packagePath)??null:null,m=u&&ql(u.part)===`head_optional`?u:null,h=lu(t,n);pu(o,`body`),d&&pu(d,`head`),vu(n.characterId,n.unit,[o,d,m,h].filter(Boolean)),yu(t.compatibility,l,ql(c));let g=[o,d,m,h].filter(Boolean),_=Mu(c),v=Nu(g,_),y=t.roleRuntimes.get(a)??null,b=t.roles.find(e=>Z(e.characterId,e.unit)===a),x=eu(t,b,o),S=wu(o,i);S.characterHeightMeters=x,Tu(S,y);let C=Eu(Nu([d,m,h].filter(Boolean),_),l,i,p);C.characterHeightMeters=x;let w=Iu(v,S,C,y);return{id:`custom-${[t.baseUrl,t.masterVersion??`unknown-master`,a,`requested:${n.bodyCostume3dId}:${n.headCostume3dId}:${n.hairCostume3dId}:${n.headOptionalCostume3dId??`none`}`,`body:${o.packagePath??`unknown`}`,`head:${c.packagePath}`,`hair:${s.packagePath??`unknown`}`,`accessory:${h?.packagePath??m?.packagePath??`none`}`,`motion:${y?.motionPackage?.sourcePath??`none`}`].map(encodeURIComponent).join(`-`)}`,displayName:`Custom ${a}`,meshUrl:``,unityRuntimeJsonUrl:`haruki-composed://role-${a}/unity-runtime.msgpack.br`,unityRuntimeJsonPath:`viewer-composed-part-runtime`,bodyAsset:S,headAsset:C,skinColors:b?.skinColors,runtimeExtension:w}}function eu(e,t,n){if(!t){let e=(Xd(n.manifest)?n.manifest:null)?.characterHeightMeters;if(typeof e==`number`&&Number.isFinite(e)&&e>0)return e;throw Error(`Runtime role catalog entry is missing.`)}if(typeof t.characterHeightMeters==`number`&&Number.isFinite(t.characterHeightMeters)&&t.characterHeightMeters>0)return t.characterHeightMeters;let r=mu(e,t.characterId,t.unit,`body`,t.bodyCostume3dId),i=r?e.packages.get(r.packagePath):null,a=(Xd(i?.manifest)?i.manifest:null)?.characterHeightMeters;if(typeof a==`number`&&Number.isFinite(a)&&a>0)return a;throw Error(`Runtime role ${Z(t.characterId,t.unit)} is missing master characterHeightMeters.`)}function tu(e,t){let n=e.roles.find(e=>e.characterId===t.characterId&&Cu(e.unit,t.unit));return n?e.registry.find(e=>e.characterId===n.characterId&&Cu(e.unit,n.unit)&&e.costume3dId===n.hairCostume3dId&&Jl(e)===`hair`&&gu(e))??null:null}function nu(e,t,n,r){return e.registry.find(i=>Jl(i)===t&&(n===void 0||i.characterId===n)&&(r===void 0||Cu(i.unit,r))&&i.status!==`missing`&&e.packages.has(i.packagePath))}function ru(e,t,n){let r=[...Ql(e,t,`head`,{unit:n,loadedOnly:!1}),...Ql(e,t,`head_optional`,{unit:n,loadedOnly:!1})],i=[...Ql(e,t,`head`,{unit:n,loadedOnly:!0}),...Ql(e,t,`head_optional`,{unit:n,loadedOnly:!0}).filter(e=>!_u(e))],a=new Map;for(let e of r){let t=a.get(e.costume3dId)??new Set;t.add(`${ql(e)}|${e.packagePath}`),a.set(e.costume3dId,t)}let o=i.filter(e=>a.get(e.costume3dId)?.size===1).sort((e,t)=>e.costume3dId-t.costume3dId||e.packagePath.localeCompare(t.packagePath)),s=Ql(e,t,`hair`,{unit:n,loadedOnly:!0});for(let r of o)for(let i of s){let a={characterId:t,unit:n,bodyCostume3dId:0,headCostume3dId:r.costume3dId,hairCostume3dId:i.costume3dId,headOptionalCostume3dId:null};try{return yu(e.compatibility,a,ql(r)),{head:r,hair:i}}catch{}}return null}function iu(e,t,n,r,i){let a=mu(e,t,n,r,i);return!!(a&&(_u(a)||e.packages.has(a.packagePath)))}function au(e,t,n,r){return iu(e,t,n,`head`,r)||iu(e,t,n,`head_optional`,r)}function ou(e,t,n,r,i){let a=mu(e,t,n,r,i);if(!a)throw Error(`Missing ${r} registry entry for role ${Z(t,n)}, costume3dId ${i}.`);if(!e.packages.has(a.packagePath))throw Error(`Missing loaded ${r} package for role ${Z(t,n)}, ${du(a)}.`);return fu(e.packages.get(a.packagePath),a)}function su(e,t){let n=t.headPackagePath?.trim()||null,r=e.registry.filter(e=>e.characterId===t.characterId&&Cu(e.unit,t.unit)&&e.costume3dId===t.headCostume3dId&&[`head`,`head_optional`].includes(Jl(e)??``)&&gu(e)&&(n===null||e.packagePath===n)).sort((e,t)=>{let n=e.packagePath.localeCompare(t.packagePath);return n===0?ql(e).localeCompare(ql(t)):n});if(r.length===0){let e=n?`, packagePath ${n}`:``;throw Error(`Missing head registry entry for role ${Z(t.characterId,t.unit)}, costume3dId ${t.headCostume3dId}${e}.`)}if(new Set(r.map(e=>`${ql(e)}|${e.packagePath}`)).size>1){let e=r.map(e=>`${ql(e)}:${e.packagePath}`).join(`, `);throw Error(`Ambiguous head registry entry for role ${Z(t.characterId,t.unit)}, costume3dId ${t.headCostume3dId}; specify headPackagePath. Candidates: ${e}.`)}return r[0]}function cu(e,t,n=su(e,t)){if(_u(n))return null;if(!e.packages.has(n.packagePath))throw Error(`Missing loaded head package for role ${Z(t.characterId,t.unit)}, ${du(n)}.`);return fu(e.packages.get(n.packagePath),n)}function lu(e,t){let n=uu(e,t);if(!n||_u(n))return null;if(!e.packages.has(n.packagePath))throw Error(`Missing loaded head_optional package for role ${Z(t.characterId,t.unit)}, ${du(n)}.`);return fu(e.packages.get(n.packagePath),n)}function uu(e,t){if(!t.headOptionalCostume3dId)return null;let n=e.registry.filter(e=>e.characterId===t.characterId&&Cu(e.unit,t.unit)&&e.costume3dId===t.headOptionalCostume3dId&&Jl(e)===`head_optional`&&gu(e)).sort((e,t)=>e.packagePath.localeCompare(t.packagePath));if(n.length===0)throw Error(`Missing head_optional registry entry for role ${Z(t.characterId,t.unit)}, costume3dId ${t.headOptionalCostume3dId}.`);let r=new Set(n.map(e=>e.packagePath));if(r.size>1)throw Error(`Ambiguous head_optional registry entry for role ${Z(t.characterId,t.unit)}, costume3dId ${t.headOptionalCostume3dId}; the legacy selector cannot identify one original source. Candidates: ${[...r].join(`, `)}.`);return n[0]}function du(e){let t=[`costume3dId ${e.costume3dId}`,`partType ${ql(e)}`,`packagePath ${e.packagePath}`];e.bundlePath&&t.push(`bundlePath ${e.bundlePath}`),e.colorVariationBundlePath&&t.push(`colorVariationBundlePath ${e.colorVariationBundlePath}`);let n=e.warnings?.[0];return n&&t.push(`warning ${n}`),t.join(`, `)}function fu(e,t){let n=Jl(t)??e.part.partType,r=Xd(e.manifest)?Yd(e.manifest):e.manifest;if(Xd(r)&&(r.id=`${n}-${t.characterId}-${t.costume3dId}-${t.unit??`default`}`,r.displayName=t.name??Fu(r.displayName)??r.id,r.characterId=String(t.characterId).padStart(2,`0`),typeof r.characterHeightMeters!=`number`||r.characterHeightMeters<=0))throw Error(`Part runtime ${t.packagePath} is missing characterHeightMeters.`);return{...e,packagePath:t.packagePath,part:{...e.part,costume3dId:t.costume3dId,partType:n,characterId:t.characterId,unit:t.unit,name:t.name??e.part.name,colorId:typeof t.colorId==`number`?t.colorId:e.part.colorId,colorName:t.colorName??e.part.colorName,costume3dGroupId:typeof t.costume3dGroupId==`number`?t.costume3dGroupId:e.part.costume3dGroupId,modelAssetbundleName:t.modelAssetbundleName??e.part.modelAssetbundleName,headCostume3dAssetbundleType:t.headCostume3dAssetbundleType??e.part.headCostume3dAssetbundleType},manifest:r,mount:{...e.mount??{},packagePath:t.packagePath,expectedSkeletonId:String(t.characterId).padStart(2,`0`)}}}function pu(e,t){let n=Xd(e.manifest)?e.manifest:{};if(!Xd(n.proxy??n.Proxy))throw Error(`Part runtime package '${e.packagePath??e.part.costume3dId}' is missing manifest.proxy material metadata for ${t}; regenerate it with a current Haruki-3D-Exporter before capture.`)}function mu(e,t,n,r,i){return e.registry.find(e=>e.characterId===t&&Cu(e.unit,n)&&e.costume3dId===i&&Jl(e)===r&&gu(e))}function hu(e,t,n,r){let i=new Set(e.registry.filter(e=>e.characterId===t&&Cu(e.unit,n)&&e.costume3dId===r&&[`head`,`head_optional`].includes(Jl(e)??``)&&gu(e)).map(e=>e.packagePath));return i.size===1?[...i][0]:null}function gu(e){return e.status!==`missing`}function _u(e){return e.status===`empty`&&Jl(e)===`head_optional`}function vu(e,t,n){let r=n.find(n=>n.part.characterId!==e||!Cu(n.part.unit,t));if(r)throw Error(`Part ${r.part.partType}/${r.part.costume3dId} belongs to role ${Z(r.part.characterId,r.part.unit)}, not ${Z(e,t)}.`)}function yu(e,t,n){if(!e||n===`head`)return;let r=xu(t.unit,t.headCostume3dId,t.hairCostume3dId);if(bu(e).has(r))throw Error(`Head ${t.headCostume3dId} and hair ${t.hairCostume3dId} are not available together.`)}function bu(e){if(!e)return new Set;let t=Gl.get(e);if(t)return t;let n=new Set([...e.denied??[],...(e.rules??[]).filter(e=>e.state===`not_available`)].map(e=>xu(e.unit,e.headCostume3dId,e.hairCostume3dId)));return Gl.set(e,n),n}function xu(e,t,n){return`${Su(e)}|${t}|${n}`}function Su(e){return e??``}function Cu(e,t){return Su(e)===Su(t)}function wu(e,t){let n=Yd(e.manifest);if(n.id||=`body-${e.part.costume3dId}`,n.displayName||=e.part.name??n.id,n.characterId=String(e.part.characterId).padStart(2,`0`),typeof n.characterHeightMeters!=`number`||n.characterHeightMeters<=0)throw Error(`Body part runtime ${e.packagePath} is missing characterHeightMeters.`);n.materialPipeline??=`embedded`,n.source||={bundleRoot:``,manifestUrl:``,meshUrl:``},n.neckAnchor=ju(n.neckAnchor,{x:0,y:1.75,z:.15}),n.skeleton||={},n.skeleton.neckAttach||={fallbackPosition:{x:0,y:1.75,z:.15}},n.skeleton.neckAttach.fallbackPosition=ju(n.skeleton.neckAttach.fallbackPosition,{x:0,y:1.75,z:.15}),n.proxy||={},n.proxy={bodyColor:n.proxy.bodyColor??`#f2d0c3`,shadowColor:n.proxy.shadowColor??`#bf958a`,bodyScale:n.proxy.bodyScale??1,torsoLength:n.proxy.torsoLength??2.2,shoulderWidth:n.proxy.shoulderWidth??1.1},n.bodyMaterials||=[];let r=Du(e,t);return n.source={...n.source,meshUrl:Jd(n.source?.meshUrl,r),skeletonUrl:qd(n.source?.skeletonUrl,r),animationUrls:n.source?.animationUrls?.map(e=>Jd(e,r))},n.bodyMaterials=Gd(n.bodyMaterials,[e],t),n}function Tu(e,t){let n=t?.motionPackage?.unityMotionJson;n&&(e.source={...e.source,animationUrls:[n]})}function Eu(e,t,n,r){let i=e.find(e=>ql(e.part)===`head`)??e[0],a=Yd(i.manifest);if(a.id=`head-${t.headCostume3dId}-source-${encodeURIComponent(t.headPackagePath??`auto`)}-hair-${t.hairCostume3dId}`,a.displayName=`Head ${t.headCostume3dId} / Hair ${t.hairCostume3dId}`,a.characterId=String(t.characterId).padStart(2,`0`),typeof a.characterHeightMeters!=`number`||a.characterHeightMeters<=0)throw Error(`Head part runtime ${i.packagePath} is missing characterHeightMeters.`);a.materialPipeline??=`embedded`,a.source||={bundleRoot:``,manifestUrl:``,meshUrl:``},a.rawImportOffset=ju(a.rawImportOffset,{x:0,y:0,z:0}),a.assembly||={},a.assembly.attachOrigin||={fallbackPosition:{x:0,y:1.75,z:.15}},a.assembly.attachOrigin.fallbackPosition=ju(a.assembly.attachOrigin.fallbackPosition,{x:0,y:1.75,z:.15}),a.proxy||={},a.proxy={faceColor:a.proxy.faceColor??`#fde2d9`,faceShadeColor:a.proxy.faceShadeColor??`#f7cdbf`,skinColorDefault:a.proxy.skinColorDefault??a.proxy.faceColor??`#fde2d9`,skinColor1:a.proxy.skinColor1??a.proxy.faceShadeColor??`#f7cdbf`,skinColor2:a.proxy.skinColor2??a.proxy.faceShadeColor??`#f7cdbf`,hairColor:a.proxy.hairColor??`#7b5b4a`,hairShadowColor:a.proxy.hairShadowColor??`#513d33`,headRadius:a.proxy.headRadius??.74,faceDepth:a.proxy.faceDepth??.82,hairArc:a.proxy.hairArc??.98},a.faceMaterials||=[];let o=Du(i,n);return a.source={...a.source,meshUrl:Jd(a.source?.meshUrl,o),skeletonUrl:qd(a.source?.skeletonUrl,o),animationUrls:a.source?.animationUrls?.map(e=>Jd(e,o))},a.faceMaterials=Wd(Gd(a.faceMaterials,e,n),r,n),a.morphChannelBindings=e.flatMap(e=>Array.isArray(e.morphChannelBindings)?e.morphChannelBindings:[]),a}function Du(e,t){let n=Fu(e.packagePath)||Fu(e.mount?.packagePath)||``;return e=>t(Ou(n,e))}function Ou(e,t){if(!t||/^[a-z][a-z0-9+.-]*:/i.test(t)||t.startsWith(`/`))return t;let n=ku(e);return!n||t.startsWith(`${n}/`)?t:`${n}/${Au(t)}`}function ku(e){let t=e.length;for(;t>0&&e[t-1]===`/`;)--t;return e.slice(0,t)}function Au(e){let t=0;for(;t<e.length&&e[t]===`/`;)t+=1;return e.slice(t)}function ju(e,t){return{x:typeof e?.x==`number`?e.x:t.x,y:typeof e?.y==`number`?e.y:t.y,z:typeof e?.z==`number`?e.z:t.z}}function Mu(e){return ql(e)===`head_optional`?{kind:`resolved_head_optional_source`,activePartTypes:new Set([`body`,`hair`,`head_optional`])}:{kind:`resolved_complete_head_source`,activePartTypes:new Set([`body`,`head`,`head_optional`])}}function Nu(e,t){return e.filter(e=>Pu(e,t))}function Pu(e,t){return t.activePartTypes.has(ql(e.part))}function Fu(e){return typeof e==`string`?e:``}function Iu(e,t,n,r){let i=Ru(e);return{version:`0414`,sourceKind:`viewer_composed_part_runtime_package`,bodyAsset:t,headAsset:n,bodyManifest:t,headManifest:n,materialSlots:{body:t.bodyMaterials,head:n.faceMaterials,accessory:[]},textureRoles:e.flatMap(e=>e.textureRoles??[]),characterTextures:Object.assign({},...e.map(e=>e.characterTextures??{})),characterControllers:Lu(e),nativeMeshes:Fd(e,i),motionPackage:r?.motionPackage??null,morphChannelBindings:n.morphChannelBindings??[],pjskSpringBone:{raw:i.raw,runtimeUnitySetup:i},warnings:[...i.warnings??[],...r?.warnings??[]]}}function Lu(e){return e.find(e=>{let t=ql(e.part);return t===`head`||t===`hair`})?.characterControllers??{}}function Ru(e){let t=e.map((e,t)=>$u(e,t)),n=t[0]?.setup??{},r=t.map(e=>e.prefabGraph).filter(e=>e!==null),i=e.flatMap(e=>[...e.warnings??[],...e.springBone?.warnings??[]]),a=tf(t.flatMap(e=>e.activeRoots)),o=t.flatMap(e=>e.managers),s=t.flatMap(e=>e.bones),c=t.flatMap(e=>e.extraBones),l=t.flatMap(e=>e.colliders),u=t.flatMap(e=>e.constraints),d=xd(t),f=zu(i,d),p=Ed(t,d),m=Td(s,d),h=Ju(r);if(!h)throw Error(`Composed parts do not provide the official model_combine_setup body/head paths.`);let g={...n,version:`0414`,prefabGraphs:r,bodyHeadAssembly:h,rootSelectionProfile:{policy:`viewer_composed_active_parts`,rootCandidates:[]},setupPlan:{discoveryMode:`viewer_composed_part_runtime_package`,rootPolicy:`active_custom_parts; manager ownership is rebuilt from composed hierarchy`,orderedSteps:[`load active part packages`,`merge part native meshes`,`merge active part springbone records`,`rebuild SpringManager ownership from composed hierarchy`,`repair constraints after composition`,`rebind colliderFlag springs to current body colliders`,`reset spring runtime`],directBindingCount:d.filter(e=>e.sourceKind===`direct`).length,colliderFlagBindingCount:d.filter(e=>e.sourceKind===`colliderFlag`).length},activeRootProfile:{defaultBodyRoot:a[0]??`body`,activeRoots:a.length?a:[`body`,`face`],inactiveRoots:[]},funit:Ku(e),raw:qu(t),managers:o,bones:s,extraBones:c,colliders:l,colliderBindings:d,bindingDecisions:m,constraintSetup:{version:`0414`,sourceKind:`viewer_composed_part_runtime_package`,constraints:u,warnings:tf(t.flatMap(e=>Qd(e.setup.constraintSetup?.warnings)))},managerColliderCaches:p,warnings:f};return Bu(t,g,Ld(e)),g}function zu(e,t){let n=t.filter(e=>e.sourceKind===`colliderFlag`);return n.length>0&&n.every(e=>ef(e.colliders).length>0)?e.filter(e=>!/has colliderFlag .* but no body colliders matched runtime CL_\* prefixes/.test(e)):e}function Bu(e,t,n){for(let r of e.filter(e=>e.partType===`head_optional`)){let i=r.prefabGraph,a=Ud(Fu(r.runtime.mount?.attachNode)),o=a?Vu(e,a):null,s=(i?.transforms??[]).find(e=>e.parentPathId==null&&Fu(e.transformPath)===`optional`);if(!i||!o||!s||typeof o.pathId!=`number`||typeof s.pathId!=`number`){t.warnings?.push(`Head optional prefab '${Fu(r.runtime.part.modelAssetbundleName)||`<unknown>`}' was not instantiated: official prefab root 'optional' or active attach node '${a||`<missing>`}' was not found.`);continue}let c=(i.monoBehaviours??[]).find(e=>Fu(e.scriptName)===`CharacterAccessoryTransformController`&&Uu(Fu(e.transformPath),`optional`));if(c){let e=Fu(c.transformPath),a=(i.transforms??[]).find(t=>Fu(t.transformPath)===e);a?(Wu(a,zd(r.runtime,n)),i.headOptionalControllerPath=e):t.warnings?.push(`Head optional controller target '${e||`<missing>`}' was not found in prefab 'optional'.`)}else s.localPosition={X:0,Y:0,Z:0},s.localRotation={x:0,y:0,z:0,w:1};Hu(i,`optional`),s.parentPathId=o.pathId,o.childPathIds=[...new Set([...o.childPathIds??[],s.pathId])],i.headOptionalAttachPath=Fu(o.transformPath),i.headOptionalPrefabRootPath=`optional`}}function Vu(e,t){for(let n of e){if(n.partType===`head_optional`||!n.prefabGraph)continue;let e=n.prefabGraph.transforms??[],r=new Map(e.filter(e=>typeof e.pathId==`number`).map(e=>[e.pathId,e])),i=new Map($d(n.prefabGraph.gameObjects).map(e=>[Hd(e.pathId,NaN),e.activeSelf!==!1&&e.activeInHierarchy!==!1])),a=e=>typeof e.gameObjectPathId!=`number`||i.get(e.gameObjectPathId)!==!1,o=e=>{if(!a(e))return null;if(Fu(e.name)===t||Ud(Fu(e.transformPath))===t)return e;for(let t of e.childPathIds??[]){let e=r.get(t),n=e?o(e):null;if(n)return n}return null};for(let t of n.activeRoots){let n=e.find(e=>e.parentPathId==null&&Fu(e.transformPath)===t),r=n?o(n):null;if(r)return r}}return null}function Hu(e,t){let n=e=>Uu(Fu(e.transformPath),t);e.transforms=(e.transforms??[]).filter(n),e.gameObjects=$d(e.gameObjects).filter(n),e.renderers=$d(e.renderers).filter(n),e.animators=$d(e.animators).filter(n),e.monoBehaviours=(e.monoBehaviours??[]).filter(n),e.constraints=$d(e.constraints).filter(n),e.rootTransformPathIds=e.transforms.filter(e=>Fu(e.transformPath)===t).map(e=>e.pathId).filter(e=>typeof e==`number`)}function Uu(e,t){return e===t||e.startsWith(`${t}/`)}function Wu(e,t){let n=Vd(t?.position,0,0,0),r=Vd(t?.rotationEulerDegrees,0,0,0),i=Vd(t?.scale,1,1,1);e.localPosition={X:n.x,Y:n.y,Z:n.z},e.localRotation=Gu(r),e.localScale={X:Math.abs(i.x),Y:Math.abs(i.y),Z:Math.abs(i.z)}}function Gu(e){let t=e.x*Math.PI/180,n=e.y*Math.PI/180,r=e.z*Math.PI/180,i=Math.cos(t/2),a=Math.cos(n/2),o=Math.cos(r/2),s=Math.sin(t/2),c=Math.sin(n/2),l=Math.sin(r/2);return{x:s*a*o-i*c*l,y:i*c*o+s*a*l,z:i*a*l+s*c*o,w:i*a*o-s*c*l}}function Ku(e){let t=e.map(e=>Zd(e.springBone?.funit)).filter(e=>Object.keys(e).length>0),n=(e,t)=>typeof e[t]==`number`&&Number.isFinite(e[t])?Math.max(Math.trunc(e[t]),0):0,r=tf(t.flatMap(e=>Qd(e.detectedScripts))).sort((e,t)=>e.localeCompare(t));return{present:t.some(e=>e.present===!0),scriptCount:t.reduce((e,t)=>e+n(t,`scriptCount`),0),springManagerCount:t.reduce((e,t)=>e+n(t,`springManagerCount`),0),springBoneCount:t.reduce((e,t)=>e+n(t,`springBoneCount`),0),sphereColliderCount:t.reduce((e,t)=>e+n(t,`sphereColliderCount`),0),capsuleColliderCount:t.reduce((e,t)=>e+n(t,`capsuleColliderCount`),0),panelColliderCount:t.reduce((e,t)=>e+n(t,`panelColliderCount`),0),detectedScripts:r,policy:`metadata_only; do not merge with UTJ/Sekai SpringBone runtime`}}function qu(e){let t=e.filter(e=>e.partType===`body`).flatMap(e=>e.extraBones),n=e.filter(e=>e.partType===`head`||e.partType===`hair`||e.partType===`head_optional`).flatMap(e=>e.extraBones);return{body:{extraBones:t},head:{extraBones:n}}}function Ju(e){let t=Yu(e),n=Xu(e);return!t||!Zu(e,`face`)||!n?null:{version:`0414`,sourceKind:`viewer_composed_part_runtime_package`,parentRootPath:`body`,parentAttachPath:t,childRootPath:`face`,childOriginPath:n,parentingMode:`model_combine_setup`,coordinateSpace:`unity-left-handed`,faceRendererName:`Face`,combineNodeAName:`Neck`,combineNodeBName:`Head`,childMoveSuffix:`_target`,parentCombineNodeAPath:t,parentCombineNodeBPath:`${t}/Head`,childCombineNodeAPath:n,childCombineNodeBPath:`${n}/Head`}}function Yu(e){return[`body/Position/PositionOffset/Hip/Waist/Spine/Chest/Neck`,`body/Position/Hip/Waist/Spine/Chest/Neck`].find(t=>Zu(e,t))??null}function Xu(e){return[`face/Position/Hip/Waist/Spine/Chest/Neck`,`face/Position`].find(t=>Zu(e,t))??null}function Zu(e,t){return e.some(e=>$d(e?.transforms).some(e=>Fu(e.transformPath)===t))}function Qu(e){let t=e.springBone??{};return{managers:t.managers,bones:t.bones,extraBones:t.extraBones,colliders:t.colliders,colliderBindings:t.colliderBindings,managerColliderCaches:t.managerColliderCaches,activeRootProfile:t.activeRootProfile,funit:t.funit,bindingDecisions:t.bindingDecisions,constraintSetup:t.constraintSetup}}function $u(e,t){let n=Qu(e),r=ql(e.part),i=ed(r,Qd(n.activeRootProfile?.activeRoots)),a=td(ud(n.managers,t,r),i),o=td(ud(n.bones,t,r),i),s=td(nd(n.extraBones,t,r),i),c=td(ud(n.colliders,t,r),i),l=id(ud(n.colliderBindings,t,r),o),u=ad(ud(n.managerColliderCaches,t,r),a),d=od(n.constraintSetup,t,r,i);return cd(a,o,u),{runtime:e,partIndex:t,partType:r,setup:n,prefabGraph:sd(e.springBone?.prefabGraph,t),managers:a,bones:o,extraBones:s,colliders:c,colliderBindings:l,managerColliderCaches:u,constraints:d,activeRoots:i}}function ed(e,t){return e===`body`&&t.includes(`body`)?[`body`]:(e===`head`||e===`hair`)&&t.includes(`face`)?[`face`]:e===`head_optional`&&t.includes(`optional`)?[`optional`]:t.length?[t[0]]:[e===`body`?`body`:`face`]}function td(e,t){let n=new Set(t.map(e=>Nd(e)));return e.filter(e=>{let t=Nd(Pd(e.nodePath)??e.poseRoot);return n.has(t)})}function nd(e,t,n){return ud(e,t,n).map(e=>{let n=e,r=rd(n.gameObject??n.GameObject,t),i=rd(n.referenceBone??n.ReferenceBone,t);return n.gameObject=r,n.GameObject=r,n.referenceBone=i,n.ReferenceBone=i,n.nodePath=r?.transformPath??r?.TransformPath??null,n.poseRoot=Pd(n.nodePath)??null,n})}function rd(e,t){if(!Xd(e))return e;let n={...e};return typeof n.pathId==`number`&&(n.pathId=gd(n.pathId,t)),typeof n.PathId==`number`&&(n.PathId=gd(n.PathId,t)),n}function id(e,t){let n=new Set(t.map(e=>e.pathId).filter(e=>typeof e==`number`));return e.filter(e=>typeof e.sourceSpringBonePathId!=`number`||n.has(e.sourceSpringBonePathId))}function ad(e,t){let n=new Set(t.map(e=>e.pathId).filter(e=>typeof e==`number`));return e.filter(e=>typeof e.managerPathId!=`number`||n.has(e.managerPathId))}function od(e,t,n,r){let i=new Set(r.map(e=>Nd(e)));return ud(e?.constraints,t,n).map(e=>{let n=$d(e.sources).map(e=>{let n={...e};return typeof n.sourcePathId==`number`&&(n.sourcePathId=gd(n.sourcePathId,t)),n});return typeof e.worldUpObjectPathId==`number`&&(e.worldUpObjectPathId=gd(e.worldUpObjectPathId,t)),{...e,sources:n}}).filter(e=>{let t=Nd(Pd(e.ownerPath));return!t||i.has(t)})}function sd(e,t){if(!Xd(e))return null;let n={...e};return n.runtimePartIndex=t,n.transforms=$d(e.transforms).map(e=>{let n={...e,runtimePartIndex:t};return typeof n.pathId==`number`&&(n.pathId=gd(n.pathId,t)),typeof n.PathId==`number`&&(n.PathId=gd(n.PathId,t)),typeof n.parentPathId==`number`&&(n.parentPathId=gd(n.parentPathId,t)),Array.isArray(n.childPathIds)&&(n.childPathIds=n.childPathIds.map(e=>typeof e==`number`?gd(e,t):e)),n}),n.monoBehaviours=$d(e.monoBehaviours).map(e=>{let n={...e,runtimePartIndex:t};return typeof n.pathId==`number`&&(n.pathId=gd(n.pathId,t)),n}),n}function cd(e,t,n){let r=new Map;for(let n of e){let e=n.nodePath,i=t.filter(t=>ld(t.nodePath,e)).map(e=>e.pathId).filter(e=>typeof e==`number`);i.length&&(n.bonePathIds=i,typeof n.pathId==`number`&&r.set(n.pathId,i))}for(let e of n){let t=typeof e.managerPathId==`number`?r.get(e.managerPathId):void 0;t?.length&&(e.springBonePathIds=t)}}function ld(e,t){return!e||!t?!1:e===t||e.startsWith(`${t}/`)}function ud(e,t,n){return Array.isArray(e)?e.map(e=>{if(!Xd(e))return e;let r={...e};return r.runtimePartIndex=t,r.runtimePartType=n,pd(r,t),md(r,t),Array.isArray(r.forceProviders)&&(r.forceProviders=hd(r.forceProviders,t)),Xd(r.collidersByRoot)&&(r.collidersByRoot=_d(r.collidersByRoot,t)),Xd(r.candidateRoots)&&(r.candidateRoots=_d(r.candidateRoots,t)),r}):[]}var dd=[`pathId`,`index`,`managerPathId`,`pivotSourcePathId`,`sourceSpringBonePathId`],fd=[`bonePathIds`,`directColliderPathIds`,`sourceColliderPathIds`,`colliders`,`selectedColliderIndexes`,`sphereColliderIndexes`,`capsuleColliderIndexes`,`panelColliderIndexes`,`springBonePathIds`];function pd(e,t){for(let n of dd)typeof e[n]==`number`&&(e[n]=gd(e[n],t))}function md(e,t){for(let n of fd){let r=e[n];Array.isArray(r)&&(e[n]=r.map(e=>typeof e==`number`?gd(e,t):e))}}function hd(e,t){return e.map(e=>{if(!Xd(e))return e;let n={...e,runtimePartIndex:t};return typeof n.sourcePathId==`number`&&(n.sourcePathId=gd(n.sourcePathId,t)),typeof n.springManagerPathId==`number`&&(n.springManagerPathId=gd(n.springManagerPathId,t)),n})}function gd(e,t){return(t+1)*1e9+e}function _d(e,t){return Object.fromEntries(Object.entries(e).map(([e,n])=>[e,Array.isArray(n)?n.map(e=>typeof e==`number`?gd(e,t):e).filter(e=>typeof e==`number`):[]]))}var vd=[[1,`CL_Hip`],[2,`CL_Chest`],[4,`CL_Left_Arm`],[8,`CL_Right_Arm`],[16,`CL_Left_Elbow`],[32,`CL_Right_Elbow`]];function yd(e){return vd.filter(([t])=>(e&t)!==0).map(([,e])=>e)}function bd(e){return e.flatMap(e=>e.partType===`body`?[]:e.bones.filter(t=>(t.colliderFlag??0)===0||typeof t.pathId!=`number`?!1:!e.colliderBindings.some(e=>e.sourceSpringBonePathId===t.pathId&&(e.sourceKind===`deferred_body_colliderFlag`||e.sourceKind===`colliderFlag`))).map(t=>({sourceKind:`deferred_body_colliderFlag`,partKind:t.partKind??e.partType,sourceSpringBonePathId:t.pathId,colliderFlag:t.colliderFlag,matchedPrefixes:yd(t.colliderFlag??0),collidersByRoot:{},defaultRoot:`body`,sourceColliderPathIds:[],colliders:[],rebindReason:`viewer_synthesized_missing_colliderFlag_binding`})))}function xd(e){let t=e.filter(e=>e.partType===`body`).flatMap(e=>e.colliders),n=kd(t);return bd(e).map(e=>Sd(e,t)).concat(e.flatMap(e=>e.colliderBindings.map(r=>{if(r.sourceKind===`deferred_body_colliderFlag`&&e.partType!==`body`)return Sd(r,t);if(r.sourceKind!==`colliderFlag`||e.partType===`body`||!Ad(n))return r;let i=jd(n);return{...r,collidersByRoot:n,defaultRoot:i.root,colliders:i.indexes,sourceColliderPathIds:i.indexes.map(e=>t.find(t=>t.index===e)?.pathId).filter(e=>typeof e==`number`),rebindReason:`viewer_composed_current_body_colliders`}})))}function Sd(e,t){let n=Cd(e,t);return{...e,sourceKind:`colliderFlag`,originalSourceKind:`deferred_body_colliderFlag`,collidersByRoot:n.byRoot,defaultRoot:n.defaultRoot,colliders:n.indexes,sourceColliderPathIds:n.indexes.map(e=>t.find(t=>t.index===e)?.pathId).filter(e=>typeof e==`number`),rebindReason:`viewer_composed_deferred_body_colliderFlag`}}function Cd(e,t){let n=Qd(e.matchedPrefixes),r=kd(t.filter(e=>typeof e.index==`number`&&wd(e,n))),i=Ad(r)?jd(r).root:Nd(e.defaultRoot??`body`);return{byRoot:r,defaultRoot:i,indexes:r[i]??[]}}function wd(e,t){if(!t.length)return!1;let n=Fu(e.nodeName);return t.some(e=>n.startsWith(e))}function Td(e,t){let n=new Map(e.filter(e=>typeof e.pathId==`number`).map(e=>[e.pathId,e]));return t.filter(e=>typeof e.sourceSpringBonePathId==`number`).map(e=>{let t=n.get(e.sourceSpringBonePathId),r=Ad(e.collidersByRoot)?e.collidersByRoot:{[e.defaultRoot??t?.poseRoot??`unknown`]:e.colliders??[]};return{sourceKind:e.sourceKind??`direct`,partKind:e.partKind??t?.partKind??`Unknown`,sourceSpringBonePathId:e.sourceSpringBonePathId,nodePath:t?.nodePath??null,poseRoot:t?.poseRoot??null,colliderFlag:typeof e.colliderFlag==`number`?e.colliderFlag:null,directColliderPathIds:e.sourceKind===`direct`?e.sourceColliderPathIds??[]:[],candidateRoots:r,defaultRoot:e.defaultRoot??null,selectedColliderIndexes:e.colliders??[],reason:e.sourceKind===`colliderFlag`?`viewer custom composer rebound colliderFlag candidates to current body colliders`:`direct serialized collider references`}})}function Ed(e,t){let n=new Map(e.flatMap(e=>e.colliders).filter(e=>typeof e.index==`number`).map(e=>[e.index,e]));return e.flatMap(e=>e.managerColliderCaches.map(r=>e.partType===`head`||e.partType===`hair`?Dd(r,t,n):Od(r,n)))}function Dd(e,t,n){let r=new Set(ef(e.springBonePathIds)),i=nf(t.filter(e=>typeof e.sourceSpringBonePathId==`number`&&r.has(e.sourceSpringBonePathId)&&e.sourceKind===`colliderFlag`).flatMap(e=>ef(e.colliders)).filter(e=>n.has(e)));return i.length?{...e,sphereColliderIndexes:i.filter(e=>Fu(n.get(e)?.scriptName).includes(`Sphere`)),capsuleColliderIndexes:i.filter(e=>Fu(n.get(e)?.scriptName).includes(`Capsule`)),panelColliderIndexes:i.filter(e=>Fu(n.get(e)?.scriptName).includes(`Panel`)),reason:`viewer_composed_head_body_collider_cache`}:Od(e,n)}function Od(e,t){return{...e,sphereColliderIndexes:ef(e.sphereColliderIndexes).filter(e=>t.has(e)),capsuleColliderIndexes:ef(e.capsuleColliderIndexes).filter(e=>t.has(e)),panelColliderIndexes:ef(e.panelColliderIndexes).filter(e=>t.has(e)),reason:`viewer_composed_active_parts_manager_cache`}}function kd(e){let t=new Map;for(let n of e){if(typeof n.index!=`number`)continue;let e=Nd(Pd(n.nodePath)??n.poseRoot??`body`),r=t.get(e)??[];r.push(n.index),t.set(e,r)}return Object.fromEntries([...t.entries()].map(([e,t])=>[e,[...new Set(t)].sort((e,t)=>e-t)]))}function Ad(e){return!!(e&&Object.values(e).some(e=>e.length>0))}function jd(e){let[t,n]=Object.entries(e).sort(([e],[t])=>Md(e)-Md(t)||e.localeCompare(t))[0];return{root:t,indexes:n}}function Md(e){return e===`body`?0:e===`sit_body`?1:e===`guitar_body`?2:10}function Nd(e){return(e??``).trim()||`body`}function Pd(e){return e?.split(`/`).find(Boolean)??null}function Fd(e,t){let n=[...t.warnings??[]],r=[];for(let[i,a]of e.entries()){let e=ql(a.part);for(let o of $d(a.nativeMeshes?.meshes)){let a=Id(o,i);if(e!==`head_optional`){r.push(a);continue}let s=Fu(a.rendererTransformPath),c=$d(t.prefabGraphs).find(e=>Hd(e.runtimePartIndex,-1)===i&&!!Fu(e.headOptionalAttachPath)),l=Fu(c?.headOptionalPrefabRootPath);if(!c||!l){n.push(`Head optional mesh '${Fu(o.meshPath)||Fu(o.meshName)||`<unnamed>`}' was skipped because the official prefab could not be mounted.`);continue}(s===l||s.startsWith(`${l}/`))&&r.push({...a,sourceRendererTransformPath:s,rendererTransformPath:s})}}return{version:`0414`,meshes:r,warnings:n}}function Id(e,t){let n={...e};for(let e of[`rendererPathId`,`rendererTransformPathId`,`rootBonePathId`])typeof n[e]==`number`&&(n[e]=gd(n[e],t));return Array.isArray(n.bonePathIds)&&(n.bonePathIds=n.bonePathIds.map(e=>typeof e==`number`?gd(e,t):e)),n}function Ld(e){let t=[...e.filter(e=>ql(e.part)===`head`),...e.filter(e=>ql(e.part)===`hair`),...e.filter(e=>ql(e.part)!==`head_optional`)];for(let e of t){let t=Rd(Fu(e.source?.bundlePath));if(t)return t;let n=Rd(Fu(e.part.modelAssetbundleName));if(n)return n}return null}function Rd(e){let t=e.replace(/\\/g,`/`).replace(/\.bundle$/i,``).match(/(?:^|\/)face\/([^/]+)\/([^/]+)$/i);return t?`${t[1]}/${t[2]}`:null}function zd(e,t){if(!t)return null;let n=Bd(e)[t];return Xd(n)?n:null}function Bd(e){return Zd(e.mount?.accessoryTransformAdjustments)}function Vd(e,t,n,r){let i=Zd(e);return{x:Hd(i.x??i.X,t),y:Hd(i.y??i.Y,n),z:Hd(i.z??i.Z,r)}}function Hd(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function Ud(e){return(e?.replace(/\\/g,`/`).split(`/`).filter(Boolean).pop()??``)||null}function Wd(e,t,n){if(!t)return e;let r=Gd([],[t],n),i=new Map(r.filter(e=>e.materialKind===`eye`||e.materialKind===`eyelight`).map(e=>[e.materialKind,e]));return e.map(e=>{if(e.mainTex||e.materialKind!==`eye`&&e.materialKind!==`eyelight`)return e;let t=i.get(e.materialKind);return t?.mainTex?{...e,mainTex:t.mainTex}:e})}function Gd(e,t,n){let r=t.flatMap(e=>{let t=Du(e,n);return(e.materialSlots??[]).map(e=>Kd(e,t))});if(r.length)return r;let i=t[0]?Du(t[0],n):n;return[...e??[]].map(e=>Kd(e,i))}function Kd(e,t){return{...e,mainTex:qd(e.mainTex??void 0,t)??e.mainTex,shadowTex:qd(e.shadowTex??void 0,t)??e.shadowTex,valueTex:qd(e.valueTex??void 0,t)??e.valueTex,faceShadowTex:qd(e.faceShadowTex??void 0,t)??e.faceShadowTex,rawMaterial:e.rawMaterial?{...e.rawMaterial,textureProperties:e.rawMaterial.textureProperties.map(e=>({...e,uri:qd(e.uri??void 0,t)??e.uri}))}:e.rawMaterial}}function qd(e,t){return e&&t(e)}function Jd(e,t){return e?t(e):``}function Yd(e){return JSON.parse(JSON.stringify(e))}function Xd(e){return!(!e||typeof e!=`object`||Array.isArray(e))}function Zd(e){return Xd(e)?e:{}}function Qd(e){return Array.isArray(e)?e.filter(e=>typeof e==`string`):[]}function $d(e){return Array.isArray(e)?e.filter(e=>Xd(e)):[]}function ef(e){return Array.isArray(e)?e.filter(e=>typeof e==`number`):[]}function tf(e){return[...new Set(e)]}function nf(e){return[...new Set(e)].sort((e,t)=>e-t)}var rf=class{options;partSet=null;selection=null;activeRoleId=null;combined=null;constructor(e){this.options=e}loadPartPackageSet(e,t={}){this.partSet=e;let n=t.composeDefault??!0;return this.selection=n?Zl(e):null,this.activeRoleId=this.selection?Z(this.selection.characterId,this.selection.unit):null,this.combined=this.selection?this.compose(this.selection):null,this.combined}clear(){this.partSet=null,this.selection=null,this.activeRoleId=null,this.combined=null}getPartPackageSet(){return this.partSet}getCustomSelection(){return this.selection?{...this.selection}:null}getActiveCharacterId(){return this.selection?.characterId??null}getActiveRoleId(){return this.activeRoleId}selectRole(e,t){if(!this.partSet)throw Error(`No custom part package set is loaded.`);this.activeRoleId=Z(e,t),this.selection&&Z(this.selection.characterId,this.selection.unit)!==this.activeRoleId&&(this.selection=null,this.combined=null)}getCombinedCharacter(){return this.combined}listCustomParts(e,t,n={}){return this.partSet?Ql(this.partSet,e,t,n):[]}async setCustomSelection(e,t=()=>!0){if(!this.partSet)throw Error(`No custom part package set is loaded.`);let n=this.resolveHeadSource(e);if(this.assertSameActiveCharacter(n),await this.ensureSelectionPackages(n),await this.options.ensureCompatibility?.(n),!t())throw af();this.activeRoleId??=Z(n.characterId,n.unit);let r=this.compose(n);return this.selection={...n},this.combined=r,r}updateCustomSelection(e,t){if(!this.selection)throw Error(`No custom selection is active.`);let n={...this.selection,bodyCostume3dId:e===`body`&&t!==null?t:this.selection.bodyCostume3dId,headCostume3dId:e===`head`&&t!==null?t:this.selection.headCostume3dId,headPackagePath:e===`head`&&t!==null?null:this.selection.headPackagePath,hairCostume3dId:e===`hair`&&t!==null?t:this.selection.hairCostume3dId,headOptionalCostume3dId:e===`head_optional`?t:this.selection.headOptionalCostume3dId};return this.setCustomSelection(n)}async composeCustomCharacter(e){let t=this.resolveHeadSource(e);return this.assertSameActiveCharacter(t),await this.ensureSelectionPackages(t),await this.options.ensureCompatibility?.(t),this.compose(t)}resolveHeadSource(e){if(!this.partSet)throw Error(`No custom part package set is loaded.`);let t=su(this.partSet,e);return{...e,headPackagePath:t.packagePath}}assertSameActiveCharacter(e){let t=Z(e.characterId,e.unit);if(this.activeRoleId!==null&&t!==this.activeRoleId)throw Error(`Custom switching is limited to active role ${this.activeRoleId}. Select/reload role ${t} before switching parts.`)}async ensureSelectionPackages(e){if(!this.partSet||!this.options.loadPartRuntime)return;let t=su(this.partSet,e),n=this.partSet.roles.find(t=>Z(t.characterId,t.unit)===Z(e.characterId,e.unit)),r=[this.findRegistryEntry(e,`body`,e.bodyCostume3dId),n?this.findRegistryEntry(e,`body`,n.bodyCostume3dId):null,t,this.findRegistryEntry(e,`hair`,e.hairCostume3dId),uu(this.partSet,e),Jl(t)===`head`?tu(this.partSet,e):null].filter(e=>e!==null&&e.status!==`empty`);await Promise.all(r.map(async e=>{if(!this.partSet.packages.has(e.packagePath)&&!await this.options.loadPartRuntime(e))throw Error(`Failed to load ${e.partType} package ${e.packagePath}.`)}))}findRegistryEntry(e,t,n){if(!this.partSet)throw Error(`No custom part package set is loaded.`);let r=Ql(this.partSet,e.characterId,t,{unit:e.unit,loadedOnly:!1}).find(e=>e.costume3dId===n);if(!r)throw Error(`No ${t} registry entry for role ${Z(e.characterId,e.unit)}, costume3dId ${n}.`);return r}compose(e){if(!this.partSet)throw Error(`No custom part package set is loaded.`);return $l({partSet:this.partSet,selection:e,activeRoleId:this.activeRoleId??Z(e.characterId,e.unit),resolveUrl:this.options.resolveUrl})}};function af(){let e=Error(`Custom part selection was superseded by a newer request.`);return e.name=`AbortError`,e}var of=new URL(`brotli_wasm_bg-NfWIZley.wasm`,import.meta.url).href,sf=`modulepreload`,cf=function(e,t){return new URL(e,t).href},lf={},uf=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=cf(t,n),t=s(t),t in lf)return;lf[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:sf,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},df=65536,ff=3e4,pf=null,mf=1,hf=new Map,gf=null;async function _f(e){if(e.byteLength<df||typeof Worker>`u`)return vf(e);let t=yf();if(!t)return vf(e);let n=mf++;return new Promise((r,i)=>{hf.set(n,{resolve:r,reject:i}),hf.size===1&&bf(),t.postMessage({id:n,bytes:e,wasmUrl:of},[e])})}async function vf(e){let{decodeRuntimeMessagePackBrotliDirect:t}=await uf(async()=>{let{decodeRuntimeMessagePackBrotliDirect:e}=await import(`./runtimeMessagePackDecodeCore-C88ErUk0.js`);return{decodeRuntimeMessagePackBrotliDirect:e}},[],import.meta.url);return t(e,of)}function yf(){if(pf)return pf;try{return pf=new Worker(new URL(new URL(`runtimeDecodeWorker-CzrbnFzp.js`,import.meta.url).href,``+import.meta.url),{type:`module`,name:`haruki-runtime-decoder`}),pf.onmessage=({data:e})=>{let t=hf.get(e.id);t&&(hf.delete(e.id),hf.size===0?xf():bf(),e.error?t.reject(Error(e.error)):t.resolve(e.value))},pf.onerror=()=>Sf(`Runtime decode worker failed.`),pf}catch{return pf=null,null}}function bf(){gf!==null&&clearTimeout(gf),gf=setTimeout(()=>{gf=null,Sf(`Runtime decode worker made no progress within ${ff} ms; rejecting ${hf.size} pending decode(s).`)},ff)}function xf(){gf!==null&&(clearTimeout(gf),gf=null)}function Sf(e){xf(),pf?.terminate(),pf=null;for(let t of hf.values())t.reject(Error(e));hf.clear()}var Cf=new Map,wf=16,Tf=new Map;async function Ef(e,t){let n=new Map,r=await kf(e,t),i=new rf({resolveUrl:t=>Df(e,t),loadPartRuntime:async t=>Pf(r,t,e),ensureCompatibility:async t=>Lf(r,t.unit,e)}),a=i.loadPartPackageSet(r,{composeDefault:!t.deferDefaultSelection});if(!a&&!t.deferDefaultSelection)throw Error(`Part registry package did not expose a default custom selection from ${e}.`);return{kind:`part-registry`,combinedCharacter:a,previewLight:null,faceMotion:null,displayNameByUrl:n,partSet:r,wardrobe:i}}function Df(e,t){let n=new URL(e,window.location.href);n.pathname.endsWith(`/`)||(n.pathname=`${n.pathname}/`);let r=t.replace(/\\/g,`/`).replace(/^\/+/,``).split(`/`).filter(e=>e.length>0);if(r.length===0||r.some(e=>e===`.`||e===`..`))throw Error(`Invalid runtime package relative path: ${t}`);let i=r.map(e=>encodeURIComponent(e)).join(`/`);return new URL(i,n).toString()}function Of(e,t){if(!t)return e;let n=new URL(e,window.location.href);return n.searchParams.set(`masterVersion`,t),n.toString()}async function kf(e,t){let n=Rf(t.roleId),r=`parts/by-role/${n.characterId}/${Hf(n.unit)}`,i=await Wf(Df(e,`${r}/runtime-role-catalog.msgpack.br`)),a=zf(i,n.characterId,n.unit),o=qf(await Wf(Of(Df(e,`${r}/part-registry.msgpack.br`),i.masterVersion))),s=new Map;if(t.deferDefaultSelection)return{registry:o,roles:a,masterVersion:i.masterVersion,compatibility:null,packages:s,roleRuntimes:new Map,baseUrl:e};let c=Qf(o,a,null);for(let t=0;t<Math.min(c.length,720);t+=24){let n=c.slice(t,t+24),r=await Promise.all(n.map(async t=>({entry:t,runtime:await If(e,t)})));for(let e of r)e.runtime&&s.set(e.entry.packagePath,Uf(e.runtime,e.entry));if(tp(o,a,null,s,e))break}if(!tp(o,a,null,s,e))throw Error(`Part registry package did not expose a compatible loaded body/head/hair selection from ${e}.`);let l=Zl({registry:o,roles:a,compatibility:null,packages:s,roleRuntimes:new Map,baseUrl:e}),u=l?new Set([Z(l.characterId,l.unit)]):null,d=await jf(e,a,i.masterVersion,u);return{registry:o,roles:a,masterVersion:i.masterVersion,compatibility:null,packages:s,roleRuntimes:d,baseUrl:e}}async function Af(e,t,n){let r=Z(t,n),i=e.roleRuntimes.get(r);if(i)return i;let a=e.roles.find(e=>e.roleRuntimePath&&e.characterId===t&&Z(e.characterId,e.unit??null)===r);if(!a?.roleRuntimePath)throw Error(`Runtime role catalog has no package for ${r}.`);let o=await Wf(Of(Df(e.baseUrl,a.roleRuntimePath),e.masterVersion)),s=Mf(e.baseUrl,a.roleRuntimePath,o,e.masterVersion),c=s.role?.characterId,l=s.role?.unit??null;if(c!==t||Z(c,l)!==r)throw Error(`Runtime role package identity differs from requested role ${r}.`);return e.roleRuntimes.set(Z(c,l),s),s}async function jf(e,t,n,r=null){let i=new Map,a=t.filter(e=>e.roleRuntimePath&&(!r||r.has(Z(e.characterId,e.unit??null)))),o=await Promise.all(a.map(async t=>({entry:t,runtime:await Wf(Of(Df(e,t.roleRuntimePath),n))})));for(let t of o){let r=t.runtime.role?.characterId??t.entry.characterId,a=t.runtime.role?.unit??t.entry.unit??null,o=Mf(e,t.entry.roleRuntimePath,t.runtime,n);i.set(Z(r,a),o)}return i}function Mf(e,t,n,r){let i=n.motionPackage,a=i?.unityMotionJson;if(!a)return n;let o=/^[a-z][a-z0-9+.-]*:/i.test(a)||a.startsWith(`/`)?new URL(a,window.location.href).toString():Df(e,Nf(t,a));return{...n,motionPackage:{...i,unityMotionJson:Of(o,r)}}}function Nf(e,t){let n=e.replace(/\\/g,`/`).split(`/`).slice(0,-1).join(`/`);return n?`${n}/${t.replace(/^\/+/,``)}`:t}async function Pf(e,t,n=e.baseUrl){let r=e.packages.get(t.packagePath);if(r)return r;let i=Uf(await Ff(n,t),t);return e.packages.set(t.packagePath,i),i}async function Ff(e,t){let n=await Wf(Df(e,`${t.packagePath}/part-runtime.msgpack.br`));if(!n.corePath?.endsWith(`.msgpack.br`))throw Error(`Part runtime must reference a .msgpack.br shared core: ${t.packagePath}.`);return Wl(n,await Wf(Df(e,n.corePath)))}async function If(e,t){let n=Df(e,`${t.packagePath}/part-runtime.msgpack.br`);try{return await Ff(e,t)}catch(e){if(e instanceof Error&&`status`in e&&e.status===404&&`url`in e&&e.url===n)return null;throw e}}async function Lf(e,t,n=e.baseUrl){e.compatibility||=await Wf(Of(Df(n,`parts/compat/by-unit/${Hf(t)}/head-hair-compatibility.msgpack.br`),e.masterVersion))}function Rf(e){if(!e)throw Error(`Runtime role id is required.`);let[t,...n]=e.split(`:`),r=Number(t);if(!Number.isInteger(r)||r<=0)throw Error(`Invalid runtime role id: ${e}`);return{characterId:r,unit:n.join(`:`)||null}}function zf(e,t,n){let r=(e?.version===2||e?.version===3||e?.version===4)&&typeof e.masterVersion==`string`&&e.masterVersion.length>0&&Array.isArray(e.roles)?e.roles:[];if(r.length!==1)throw Error(`Runtime role catalog must contain exactly one scoped role for ${Z(t,n)}.`);let i=r[0],a=Vf(i.roleId),o=a?`roles/${a.characterId}/${Hf(a.unit)}/role-runtime.msgpack.br`:``;if(!a||i.characterId!==t||Z(i.characterId,i.unit)!==Z(t,n)||i.characterId!==a.characterId||Z(i.characterId,i.unit)!==Z(a.characterId,a.unit)||!Number.isInteger(i.roleId)||i.roleId<1||i.roleId>31||!Number.isInteger(i.bodyCostume3dId)||i.bodyCostume3dId<=0||!Number.isInteger(i.headCostume3dId)||i.headCostume3dId<=0||!Number.isInteger(i.hairCostume3dId)||i.hairCostume3dId<=0||e.version>=3&&!Bf(i.skinColors)||e.version>=4&&(typeof i.characterHeightMeters!=`number`||!Number.isFinite(i.characterHeightMeters)||i.characterHeightMeters<=0)||i.roleRuntimePath!==o)throw Error(`Runtime role catalog is invalid for ${Z(t,n)}.`);return r}function Bf(e){let t=e=>typeof e==`string`&&/^#[0-9a-f]{6}$/i.test(e);return!!(e&&t(e.default)&&t(e.shadow1)&&t(e.shadow2))}function Vf(e){return!Number.isInteger(e)||e<1||e>31?null:e<=20?{characterId:e,unit:[`light_sound`,`idol`,`street`,`theme_park`,`school_refusal`][Math.floor((e-1)/4)]}:e<=26?{characterId:21,unit:[`piapro`,`idol`,`light_sound`,`street`,`theme_park`,`school_refusal`][e-21]}:{characterId:e-5,unit:`piapro`}}function Hf(e){return e||`default`}function Uf(e,t){return{...e,packagePath:t.packagePath,mount:{...e.mount??{},packagePath:t.packagePath}}}async function Wf(e){if(!/\.msgpack\.br(?:[?#]|$)/i.test(e))throw Error(`Runtime metadata must use .msgpack.br: ${e}`);let t=Tf.get(e);if(t)return t;let n=(async()=>{let t=await fetch(e);if(!t.ok)throw Object.assign(Error(`Failed to load ${e}: HTTP ${t.status}`),{status:t.status,url:e});return Gf(t,e)})();Tf.set(e,n);try{return await n}finally{Tf.get(e)===n&&Tf.delete(e)}}async function Gf(e,t){try{let n=e.headers.get(`x-haruki-file-version`),r=n&&Kf(t)?Cf.get(t):null;if(r?.version===n)return Cf.delete(t),Cf.set(t,r),await e.body?.cancel(),r.value;let i=await _f(await e.arrayBuffer());if(n&&Kf(t))for(Cf.delete(t),Cf.set(t,{version:n,value:i});Cf.size>wf;)Cf.delete(Cf.keys().next().value);return i}catch(e){throw e instanceof Error?e:Error(`Failed to decode ${t}: ${String(e)}`)}}function Kf(e){let t=e.split(/[?#]/,1)[0]??e;return/\/parts\/by-role\/[^/]+\/[^/]+\/(?:part-registry|runtime-role-catalog)\.msgpack\.br$/.test(t)||/\/parts\/compat\/by-unit\/[^/]+\/head-hair-compatibility\.msgpack\.br$/.test(t)||/\/roles\/[^/]+\/[^/]+\/(?:role-runtime|motion\/unity-motion)\.msgpack\.br$/.test(t)}function qf(e){let t=Array.isArray(e)?e:e.entries??e.parts??[];if(t.length===0)throw Error(`Runtime part registry is empty.`);let n=new Set;for(let[e,r]of t.entries()){let t=ql(r),i=[r.characterId,r.unit??`default`,t,r.costume3dId,r.packagePath?.replace(/\/$/,``)].join(`
`);if(!Number.isInteger(r.characterId)||r.characterId<=0||!Number.isInteger(r.costume3dId)||r.costume3dId<0||typeof r.packagePath!=`string`||r.packagePath.length===0||r.packagePath.startsWith(`/`)||r.packagePath.includes(`\\`)||r.packagePath.replace(/\/$/,``).split(`/`).some(e=>e.length===0||e===`.`||e===`..`)||r.status!==void 0&&![`planned`,`ready`,`empty`,`missing`].includes(r.status)||n.has(i))throw Error(`Runtime part registry entry ${e} is invalid or duplicated.`);n.add(i)}return t}function Jf(e,t,n,r,i){return e.find(e=>e.characterId===t&&e.costume3dId===r&&Jl(e)===n&&(i===void 0||e.unit===i)&&$f(e))}function Yf(e,t,n,r){let i=(t,n,r,i)=>Jf(e,t,n,r,i);for(let e of t)e.characterId===n&&(typeof e.bodyCostume3dId==`number`&&r(i(e.characterId,`body`,e.bodyCostume3dId,e.unit)),typeof e.headCostume3dId==`number`&&(r(i(e.characterId,`head`,e.headCostume3dId,e.unit)),r(i(e.characterId,`head_optional`,e.headCostume3dId,e.unit))),typeof e.hairCostume3dId==`number`&&r(i(e.characterId,`hair`,e.hairCostume3dId,e.unit)))}function Xf(e,t,n,r){let i=e.filter(e=>e.characterId===t&&[`head`,`head_optional`].includes(Jl(e)??``)&&$f(e)).sort((e,t)=>e.costume3dId-t.costume3dId),a=e.filter(e=>e.characterId===t&&Jl(e)===`hair`&&$f(e)).sort((e,t)=>e.costume3dId-t.costume3dId);for(let e of i)for(let t of a)Jl(e)!==`head`&&n.has(xu(e.unit??t.unit,e.costume3dId,t.costume3dId))||(r(e),r(t))}function Zf(e,t){let n=new Set;for(let r of e)if(t===null||r.characterId===t)for(let e of[r.bodyCostume3dId,r.headCostume3dId,r.hairCostume3dId])typeof e==`number`&&n.add(e);return n}function Qf(e,t,n){let r=t.find(e=>typeof e.characterId==`number`)?.characterId??e.find(ep)?.characterId??null,i=[],a=new Set,o=e=>{if(!e||!ep(e))return;let t=e.packagePath;a.has(t)||(a.add(t),i.push(e))},s=bu(n);r!==null&&(Yf(e,t,r,o),o(e.filter(e=>e.characterId===r&&Jl(e)===`body`&&$f(e)).sort((e,t)=>e.costume3dId-t.costume3dId)[0]),Xf(e,r,s,o));let c=Zf(t,r),l=e.filter(ep).filter(e=>!a.has(e.packagePath)).map((e,t)=>({entry:e,index:t,score:(r!==null&&e.characterId===r?0:1e6)+(c.has(e.costume3dId)?0:1e4)+np(e)+Math.min(e.costume3dId,9999)})).sort((e,t)=>e.score-t.score||e.index-t.index);return[...i,...l.map(e=>e.entry)]}function $f(e){return e.status!==`missing`}function ep(e){return $f(e)&&e.status!==`empty`}function tp(e,t,n,r,i){let a=new Set(e.filter(e=>r.has(e.packagePath)).map(e=>Jl(e)).filter(Boolean));return!a.has(`body`)||!a.has(`head`)&&!a.has(`head_optional`)||!a.has(`hair`)?!1:!!Zl({registry:e,roles:t,compatibility:n,packages:r,roleRuntimes:new Map,baseUrl:i})}function np(e){switch(Jl(e)){case`body`:return 0;case`head`:return 100;case`hair`:return 200;case`head_optional`:return 300;default:return 1e3}}var rp=`
float sekaiSmooth01(float value) {
  float x = clamp(value, 0.0, 1.0);
  return x * x * (3.0 - 2.0 * x);
}

float sekaiBaseShadow(
  float normalDotLight,
  float valueB,
  float useLambert,
  float useValueTex,
  float threshold,
  float width,
  float fadeMode
) {
  float halfLambert = normalDotLight * 0.5 + 0.5;
  float baseLight = useLambert > 0.5 ? halfLambert : 1.0;
  float selectedValueB = useValueTex > 0.5 ? valueB : 0.5;
  float rawLight = clamp(baseLight + 2.0 * selectedValueB - 1.0, 0.0, 1.0);
  float t = clamp(threshold, 0.0, 1.0);
  float w = clamp(width, 0.0, 1.0);
  float q = fadeMode < 0.5
    ? clamp((rawLight - t * (1.0 - w)) / max(t * w, 0.00001), 0.0, 1.0)
    : clamp((rawLight - t) / max((1.0 - t) * w, 0.00001), 0.0, 1.0);
  return 1.0 - sekaiSmooth01(q);
}

float sekaiFaceShadow(
  float sdf,
  float threshold,
  float width,
  float fadeMode
) {
  float w = clamp(width, 0.0, 1.0);
  float q = fadeMode < 0.5
    ? clamp((threshold - sdf) / max((1.0 - sdf) * w, 0.00001), 0.0, 1.0)
    : clamp((sdf - threshold) / max((1.0 - threshold) * w, 0.00001), 0.0, 1.0);
  return fadeMode < 0.5 ? sekaiSmooth01(q) : 1.0 - sekaiSmooth01(q);
}
`,ip=`
vec3 sekaiApplyHsvc(
  vec3 color,
  float hueSin,
  float hueCos,
  float saturation,
  float value,
  float contrast
) {
  vec3 axis = vec3(0.577350259);
  vec3 rotated =
    color * hueCos +
    cross(axis, color) * hueSin +
    axis * dot(axis, color) * (1.0 - hueCos);
  rotated =
    (rotated - vec3(0.5)) * (contrast * 2.0) +
    vec3(value * 2.0 - 0.5);
  float luma = dot(rotated, vec3(0.22, 0.707, 0.071));
  return (rotated - vec3(luma)) * (saturation * 2.0) + vec3(luma);
}

vec3 sekaiSkinRamp(
  float skinValue,
  vec3 globalShadow,
  vec3 defaultSkin,
  vec3 shadow1Skin,
  vec3 shadow2Skin
) {
  vec3 mid = globalShadow * shadow1Skin;
  vec3 dark = globalShadow * shadow2Skin;
  vec3 upperBand = mix(mid, defaultSkin, clamp(skinValue * 2.0 - 1.0, 0.0, 1.0));
  return mix(dark, upperBand, clamp(skinValue * 2.0, 0.0, 1.0));
}

vec3 sekaiOverlay(vec3 base, vec3 blend) {
  vec3 multiplyBranch = 2.0 * base * blend;
  vec3 screenBranch = 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
  return mix(multiplyBranch, screenBranch, step(vec3(0.5), base));
}

vec3 sekaiApplyCharacterAmbient(
  vec3 color,
  vec3 ambientColor,
  float ambientIntensity,
  vec4 partsAmbientColor
) {
  vec3 overlaid = sekaiOverlay(color, ambientColor);
  float intensity = ambientIntensity;
  vec3 multiplied = overlaid * intensity * partsAmbientColor.rgb;
  vec3 screened =
    1.0 -
    2.0 * (1.0 - overlaid * intensity) * (1.0 - partsAmbientColor.rgb);
  return mix(screened, multiplied, clamp(partsAmbientColor.a, 0.0, 1.0));
}

`;function Q(e,t){return t instanceof J?e.copy(t):typeof t==`number`?e.setHex(t,rt):e.setStyle(t,rt)}function ap(e){return Q(new J,e)}function op(e,t){return e===void 0?new J().setRGB(t.r,t.g,t.b):ap(e)}function sp(e){return e?(e.updateMatrix(),e.matrix.clone()):new G}var cp=`
  vec3 sekaiGammaTexture(vec3 linearColor) {
    vec3 safeColor = max(linearColor, vec3(0.0));
    vec3 low = safeColor * 12.92;
    vec3 high = pow(safeColor, vec3(1.0 / 2.4)) * 1.055 - vec3(0.055);
    return mix(low, high, step(vec3(0.0031308), safeColor));
  }

  vec4 sekaiGammaTexture(vec4 linearColor) {
    return vec4(sekaiGammaTexture(linearColor.rgb), linearColor.a);
  }
`;function lp(e){return new ea({transparent:!1,depthWrite:!0,side:0,vertexColors:!0,uniforms:{uBaseColor:{value:ap(e.baseColor)},uShadowColor:{value:ap(e.shadowColor)},uSkinColorDefault:{value:ap(e.skinColorDefault??e.baseColor)},uSkinColor1:{value:ap(e.skinColor1??e.shadowColor)},uSkinColor2:{value:ap(e.skinColor2??e.skinColor1??e.shadowColor)},uPartsAmbientColor:{value:ap(e.partsAmbientColor??`#ffffff`)},uPartsAmbientAlpha:{value:e.partsAmbientAlpha??0},uReflectionBlendColor:{value:ap(e.reflectionBlendColor??`#ffffff`)},uGlobalShadowColor:{value:ap(e.globalShadowColor??`#ffffff`)},uGlobalShadowAlpha:{value:e.globalShadowAlpha??1},uControllerAmbientColor:{value:op(e.controllerAmbientColor,s.ambientColor)},uControllerAmbientIntensity:{value:e.controllerAmbientIntensity??1},uControllerSpecularColor:{value:ap(e.controllerSpecularColor??`#ffffff`)},uControllerSpecularIntensity:{value:e.controllerSpecularIntensity??1},uControllerRimColor:{value:op(e.controllerRimColor,s.rimColor)},uControllerShadowRimColor:{value:op(e.controllerShadowRimColor,s.shadowRimColor)},uControllerRimColorWeight:{value:e.controllerRimColorWeight??1},uControllerShadowRimColorWeight:{value:e.controllerShadowRimColorWeight??1},uControllerRimRange:{value:e.controllerRimRange??s.rimRange},uControllerRimEdgeSmoothness:{value:e.controllerRimEdgeSmoothness??s.rimEdgeSmoothness},uControllerRimEmission:{value:e.controllerRimEmission??s.rimEmission},uControllerRimLightInfluence:{value:e.controllerRimLightInfluence??s.rimLightInfluence},uControllerRimShadowSharpness:{value:e.controllerRimShadowSharpness??s.rimShadowSharpness},uBodyDebugMode:{value:e.bodyDebugMode??0},uMainTex:{value:e.mainTex??null},uShadowTex:{value:e.shadowTex??null},uValueTex:{value:e.valueTex??null},uMainTexTransform:{value:sp(e.mainTex)},uUseMainTex:{value:+!!e.mainTex},uUseShadowTex:{value:+!!e.shadowTex},uHasValueTex:{value:+!!e.valueTex},uUseValueTex:{value:e.useValueTex??!!e.valueTex?1:0},uLightDirection:{value:e.lightDirection.clone().normalize()},uCameraPosition:{value:new W},uLightIntensity:{value:e.lightIntensity},uAmbientIntensity:{value:e.ambientIntensity},uShadowThreshold:{value:e.shadowThreshold},uShadowWeight:{value:e.shadowWeight},uShadowWidth:{value:e.shadowWidth??0},uShadowFade:{value:e.shadowFade??0},uShadowWidthOverride:{value:e.shadowWidthOverride??-1},uValueShadowInfluence:{value:e.valueShadowInfluence??0},uCharacterAmbientIntensity:{value:e.characterAmbientIntensity??.3},uRimColorAlpha:{value:e.rimColorAlpha??s.rimColorAlpha},uRimDirection:{value:(e.rimDirection??new W(o.x,o.y,o.z)).clone().normalize()},uSpecularPower:{value:e.specularPower??0},uRimThreshold:{value:e.rimThreshold??.2},uShadowTexWeight:{value:e.shadowTexWeight??1},uFadeMode:{value:e.fadeMode??0},uHueSinAngle:{value:e.hueSinAngle??0},uHueCosAngle:{value:e.hueCosAngle??1},uHairShadowEnabled:{value:+!!e.hairShadowEnabled},uUseLambert:{value:e.useLambert===!1?0:1},uHeadPosition:{value:(e.headPosition??new W).clone()},uHeadNormalBlend:{value:e.headNormalBlend??.7},uSaturation:{value:e.saturation??.5},uValue:{value:e.value??.5},uContrast:{value:e.contrast??.5},uAlphaCutoff:{value:e.alphaCutoff??0}},vertexShader:`
      #include <common>
      #include <uv_pars_vertex>
      #include <color_pars_vertex>
      #include <skinning_pars_vertex>

      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;
      varying vec3 vViewPosition;
      varying vec3 vModelPosition;
      varying vec2 vUv;

      uniform float uHairShadowEnabled;
      uniform vec3 uHeadPosition;
      uniform float uHeadNormalBlend;

      void main() {
        #include <uv_vertex>
        #include <color_vertex>
        #include <skinbase_vertex>
        #include <beginnormal_vertex>
        #include <skinnormal_vertex>
        #include <defaultnormal_vertex>
        #include <begin_vertex>
        #include <skinning_vertex>

        vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
        vec4 viewPosition = viewMatrix * worldPosition;
        vWorldPosition = worldPosition.xyz;
        vec3 worldNormal = inverseTransformDirection(
          transformedNormal,
          viewMatrix
        );
        vWorldNormal = worldNormal;
        vViewPosition = viewPosition.xyz;
        vModelPosition = transformed;
        vUv = uv;
        gl_Position = projectionMatrix * viewPosition;
      }
    `,fragmentShader:`
      #include <common>
      #include <color_pars_fragment>

      uniform vec3 uBaseColor;
      uniform vec3 uShadowColor;
      uniform vec3 uSkinColorDefault;
      uniform vec3 uSkinColor1;
      uniform vec3 uSkinColor2;
      uniform vec3 uPartsAmbientColor;
      uniform float uPartsAmbientAlpha;
      uniform vec3 uReflectionBlendColor;
      uniform vec3 uGlobalShadowColor;
      uniform float uGlobalShadowAlpha;
      uniform vec3 uControllerAmbientColor;
      uniform float uControllerAmbientIntensity;
      uniform vec3 uControllerSpecularColor;
      uniform float uControllerSpecularIntensity;
      uniform vec3 uControllerRimColor;
      uniform vec3 uControllerShadowRimColor;
      uniform float uControllerRimColorWeight;
      uniform float uControllerShadowRimColorWeight;
      uniform float uControllerRimRange;
      uniform float uControllerRimEdgeSmoothness;
      uniform float uControllerRimEmission;
      uniform float uControllerRimLightInfluence;
      uniform float uControllerRimShadowSharpness;
      uniform float uBodyDebugMode;
      uniform sampler2D uMainTex;
      uniform sampler2D uShadowTex;
      uniform sampler2D uValueTex;
      uniform mat3 uMainTexTransform;
      uniform float uUseMainTex;
      uniform float uUseShadowTex;
      uniform float uHasValueTex;
      uniform float uUseValueTex;
      uniform vec3 uLightDirection;
      uniform vec3 uCameraPosition;
      uniform float uLightIntensity;
      uniform float uAmbientIntensity;
      uniform float uShadowThreshold;
      uniform float uShadowWeight;
      uniform float uShadowWidth;
      uniform float uShadowFade;
      uniform float uShadowWidthOverride;
      uniform float uValueShadowInfluence;
      uniform float uCharacterAmbientIntensity;
      uniform float uRimColorAlpha;
      uniform vec3 uRimDirection;
      uniform float uSpecularPower;
      uniform float uRimThreshold;
      uniform float uShadowTexWeight;
      uniform float uFadeMode;
      uniform float uHueSinAngle;
      uniform float uHueCosAngle;
      uniform float uUseLambert;
      uniform float uSaturation;
      uniform float uValue;
      uniform float uContrast;
      uniform float uAlphaCutoff;

      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;
      varying vec3 vViewPosition;
      varying vec3 vModelPosition;
      varying vec2 vUv;

      ${rp}
      ${ip}
      ${cp}

      vec3 outputColor(vec3 color) {
        return color;
      }

      vec3 applyMaterialHsvc(vec3 color) {
        return sekaiApplyHsvc(
          color,
          uHueSinAngle,
          uHueCosAngle,
          uSaturation,
          uValue,
          uContrast
        );
      }

      float toonBand(float value, float threshold, float width) {
        return width <= 0.0001
          ? step(threshold, value)
          : smoothstep(threshold - width, threshold + width, value);
      }

      void main() {
        vec3 normal = normalize(vWorldNormal);
        vec3 lightDir = normalize(uLightDirection);
        vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
        float ndl = dot(normal, lightDir);
        vec2 mainUv = (uMainTexTransform * vec3(vUv, 1.0)).xy;
        vec4 mainSample = vec4(1.0);
        vec3 mainColor = uBaseColor;
        if (uUseMainTex > 0.5) {
          mainSample = sekaiGammaTexture(texture2D(uMainTex, mainUv));
          if (uAlphaCutoff > 0.0 && mainSample.a < uAlphaCutoff) {
            discard;
          }
          mainColor = mainSample.rgb;
        }
        vec3 shadowValue = mainColor;
        if (uUseShadowTex > 0.5) {
          shadowValue = mix(
            shadowValue,
            sekaiGammaTexture(texture2D(uShadowTex, mainUv).rgb),
            clamp(uShadowTexWeight, 0.0, 1.0)
          );
        }
        vec4 valueSample = vec4(0.0, 0.0, 0.5, 0.0);
        if (uHasValueTex > 0.5) {
          valueSample = texture2D(uValueTex, mainUv);
        }
        float skinMask = uHasValueTex > 0.5
          ? step(0.5, valueSample.r)
          : 0.0;
        float hMask = valueSample.b;
        float hAlpha = valueSample.a;
        float vertexOutlineIntensity = 1.0;
        float vertexRimMask = 1.0;
        #ifdef USE_COLOR
        vertexOutlineIntensity = clamp(vColor.r, 0.0, 1.0);
        vertexRimMask = clamp(vColor.g, 0.0, 1.0);
        #endif

        float halfNdl = clamp(ndl * 0.5 + 0.5, 0.0, 1.0);
        float materialShadowThreshold = clamp(uShadowThreshold, 0.0, 1.0);
        float shadowWidth = (uShadowWidthOverride >= 0.0)
          ? uShadowWidthOverride
          : uShadowWidth;
        float toonLuma = clamp((uUseLambert > 0.5 ? halfNdl : 1.0) + (uUseValueTex > 0.5 ? hMask * 2.0 - 1.0 : 0.0), 0.0, 1.0);
        float officialShadowBand = sekaiBaseShadow(
          ndl,
          hMask,
          uUseLambert,
          uUseValueTex,
          materialShadowThreshold,
          shadowWidth,
          uFadeMode
        );
        float valueShadowInfluence = clamp(uValueShadowInfluence, 0.0, 1.0);
        float geometricShadowBand = sekaiBaseShadow(
          ndl,
          0.5,
          uUseLambert,
          0.0,
          materialShadowThreshold,
          shadowWidth,
          uFadeMode
        );
        float shadowBand = mix(geometricShadowBand, officialShadowBand, valueShadowInfluence) * uShadowWeight;
        float litBand = clamp(1.0 - shadowBand, 0.0, 1.0);

        vec3 adjustedMainColor = applyMaterialHsvc(mainColor);
        vec3 fallbackShadowColor = mainColor * uShadowColor;
        vec3 weightedShadowColor = uUseShadowTex > 0.5
          ? shadowValue
          : mix(adjustedMainColor, fallbackShadowColor, clamp(uShadowTexWeight, 0.0, 1.0));
        vec3 shadowColor = weightedShadowColor;
        if (uBodyDebugMode > 0.5 && uBodyDebugMode < 12.5) {
          float debugValue = skinMask;
          if (uBodyDebugMode > 1.5 && uBodyDebugMode < 2.5) {
            gl_FragColor = vec4(outputColor(clamp(mainColor, 0.0, 1.0)), 1.0);
            return;
          } else if (uBodyDebugMode > 2.5 && uBodyDebugMode < 3.5) {
            float debugSkinValue = mix(
              mainColor.r,
              shadowValue.r,
              clamp(shadowBand, 0.0, 1.0)
            );
            vec3 debugSkinColor = applyMaterialHsvc(sekaiSkinRamp(
              debugSkinValue,
              mix(vec3(1.0), uGlobalShadowColor, clamp(uGlobalShadowAlpha, 0.0, 1.0)),
              uSkinColorDefault,
              uSkinColor1,
              uSkinColor2
            ));
            gl_FragColor = vec4(outputColor(clamp(debugSkinColor, 0.0, 1.0)), 1.0);
            return;
          } else if (uBodyDebugMode > 3.5 && uBodyDebugMode < 4.5) {
            debugValue = valueSample.r;
          } else if (uBodyDebugMode > 4.5 && uBodyDebugMode < 5.5) {
            debugValue = valueSample.g;
          } else if (uBodyDebugMode > 5.5 && uBodyDebugMode < 6.5) {
            debugValue = valueSample.b;
          } else if (uBodyDebugMode > 6.5 && uBodyDebugMode < 7.5) {
            debugValue = valueSample.a;
          } else if (uBodyDebugMode > 7.5 && uBodyDebugMode < 8.5) {
            debugValue = vertexOutlineIntensity;
          } else if (uBodyDebugMode > 8.5 && uBodyDebugMode < 9.5) {
            debugValue = vertexRimMask;
          } else if (uBodyDebugMode > 9.5 && uBodyDebugMode < 10.5) {
            debugValue = shadowBand;
          } else if (uBodyDebugMode > 10.5 && uBodyDebugMode < 11.5) {
            debugValue = halfNdl;
          } else if (uBodyDebugMode > 11.5 && uBodyDebugMode < 12.5) {
            debugValue = officialShadowBand;
          }
          gl_FragColor = vec4(outputColor(vec3(debugValue)), 1.0);
          return;
        }
        if (uBodyDebugMode > 23.5 && uBodyDebugMode < 24.5) {
          gl_FragColor = vec4(outputColor(vec3(clamp(toonLuma, 0.0, 1.0))), 1.0);
          return;
        } else if (uBodyDebugMode > 24.5 && uBodyDebugMode < 25.5) {
          gl_FragColor = vec4(outputColor(vec3(clamp(1.0 - litBand, 0.0, 1.0))), 1.0);
          return;
        } else if (uBodyDebugMode > 25.5 && uBodyDebugMode < 26.5) {
          gl_FragColor = vec4(outputColor(clamp(shadowColor, 0.0, 1.0)), 1.0);
          return;
        }
        vec3 globalShadow = mix(
          vec3(1.0),
          uGlobalShadowColor,
          clamp(uGlobalShadowAlpha, 0.0, 1.0)
        );
        vec3 baseShadedColor = mix(
          adjustedMainColor,
          weightedShadowColor * globalShadow,
          shadowBand
        );
        float skinValue = mix(
          mainColor.r,
          shadowValue.r,
          clamp(shadowBand, 0.0, 1.0)
        );
        vec3 skinColor = applyMaterialHsvc(sekaiSkinRamp(
          skinValue,
          globalShadow,
          uSkinColorDefault,
          uSkinColor1,
          uSkinColor2
        ));
        vec3 color = mix(baseShadedColor, skinColor, skinMask);

        float halfLambert = clamp(dot(normal, normalize(lightDir + viewDir)), 0.0, 1.0);
        float specEnabled = step(0.0001, uSpecularPower);
        float specPower = 10.0 / max(uSpecularPower, 0.0001);
        float specMask = hAlpha * specEnabled;
        float specular = pow(halfLambert, specPower) * specMask;
        vec3 specularAdd =
          uControllerSpecularColor *
          uControllerSpecularIntensity *
          specular;

        float nDotV = clamp(dot(normal, viewDir), 0.0, 1.0);
        vec3 rimDirection = normalize(uRimDirection);
        float nDotRim = dot(normal, rimDirection);
        float vDotRim = clamp(dot(viewDir, rimDirection), 0.0, 1.0);
        float rimFactorX = max(uControllerRimRange, 0.0);
        rimFactorX = rimFactorX > 10.0 ? rimFactorX * 0.01 : rimFactorX;
        rimFactorX = min(rimFactorX, 10.0);
        float rimFactorY = max(uControllerRimEdgeSmoothness, 0.00001);
        float rimFactorW = clamp(uControllerRimLightInfluence, 0.0, 1.0);
        float viewFresnel = pow(
          1.0 - nDotV,
          max(10.0 - clamp(rimFactorX, 0.0, 10.0), 0.001)
        );
        float directedRim = viewFresnel * mix(1.0, vDotRim, rimFactorW);
        float sidedRim = nDotRim < 0.05
          ? directedRim
          : directedRim * (1.0 - 2.0 * rimFactorW);
        float rim = sekaiSmooth01(clamp(
          (sidedRim - uRimThreshold) / rimFactorY,
          0.0,
          1.0
        ));
        float rimMask = vertexRimMask;
        vec3 controllerRimBase = mix(
          vec3(0.5),
          uControllerRimColor,
          clamp(uControllerRimColorWeight, 0.0, 1.0)
        );
        vec3 controllerShadowRimBase = mix(
          controllerRimBase,
          uControllerShadowRimColor,
          clamp(uControllerShadowRimColorWeight, 0.0, 1.0)
        );
        float rimShadowSharpness = clamp(
          uControllerRimShadowSharpness,
          0.0,
          1.0
        );
        float rimColorMix = sekaiSmooth01(clamp(
          (nDotRim - (rimShadowSharpness - 1.0)) /
            max(2.0 * (1.0 - rimShadowSharpness), 0.00001),
          0.0,
          1.0
        ));
        vec3 rimColor = mix(
          controllerRimBase,
          controllerShadowRimBase,
          rimColorMix
        );
        float rimGate = rimMask * max(uRimColorAlpha, 0.0);
        float rimScalar = rim * rimGate;
        vec3 rimAdd = rimColor * rimScalar;
        if (uBodyDebugMode > 15.5 && uBodyDebugMode < 16.5) {
          gl_FragColor = vec4(outputColor(vec3(clamp(specular, 0.0, 1.0))), 1.0);
          return;
        } else if (uBodyDebugMode > 21.5 && uBodyDebugMode < 22.5) {
          gl_FragColor = vec4(outputColor(vec3(clamp(specMask, 0.0, 1.0))), 1.0);
          return;
        } else if (uBodyDebugMode > 22.5 && uBodyDebugMode < 23.5) {
          gl_FragColor = vec4(outputColor(clamp(specularAdd * 8.0, 0.0, 1.0)), 1.0);
          return;
        } else if (uBodyDebugMode > 16.5 && uBodyDebugMode < 17.5) {
          gl_FragColor = vec4(outputColor(vec3(clamp(rim, 0.0, 1.0))), 1.0);
          return;
        } else if (uBodyDebugMode > 17.5 && uBodyDebugMode < 18.5) {
          gl_FragColor = vec4(outputColor(clamp(rimAdd * 4.0, 0.0, 1.0)), 1.0);
          return;
        } else if (uBodyDebugMode > 18.5 && uBodyDebugMode < 19.5) {
          gl_FragColor = vec4(outputColor(vec3(clamp(rimGate * 4.0, 0.0, 1.0))), 1.0);
          return;
        } else if (uBodyDebugMode > 19.5 && uBodyDebugMode < 20.5) {
          gl_FragColor = vec4(outputColor(clamp(rimColor, 0.0, 1.0)), 1.0);
          return;
        } else if (uBodyDebugMode > 20.5 && uBodyDebugMode < 21.5) {
          gl_FragColor = vec4(outputColor(vec3(clamp(rimScalar * 8.0, 0.0, 1.0))), 1.0);
          return;
        }
        color += rimAdd;
        color += rimAdd * uControllerRimEmission;
        color += specularAdd;

        vec3 ambientTarget = sekaiApplyCharacterAmbient(
          color,
          uControllerAmbientColor,
          uControllerAmbientIntensity,
          vec4(uPartsAmbientColor, uPartsAmbientAlpha)
        );
        if (uBodyDebugMode > 12.5 && uBodyDebugMode < 13.5) {
          gl_FragColor = vec4(outputColor(clamp(ambientTarget, 0.0, 1.0)), 1.0);
          return;
        } else if (uBodyDebugMode > 13.5 && uBodyDebugMode < 14.5) {
          gl_FragColor = vec4(outputColor(vec3(clamp(uControllerAmbientIntensity, 0.0, 1.0))), 1.0);
          return;
        } else if (uBodyDebugMode > 14.5 && uBodyDebugMode < 15.5) {
          gl_FragColor = vec4(outputColor(clamp(uControllerAmbientColor, 0.0, 1.0)), 1.0);
          return;
        }
        color = ambientTarget;
        gl_FragColor = vec4(
          outputColor(clamp(color, 0.0, 1.0)),
          uUseMainTex > 0.5 ? mainSample.a : 1.0
        );
      }
    `})}function up(e,t){dp(e,t),fp(e,t),pp(e,t),mp(e,t),vp(e,t)}function dp(e,t){Q(e.uniforms.uBaseColor.value,t.baseColor),Q(e.uniforms.uShadowColor.value,t.shadowColor),Q(e.uniforms.uSkinColorDefault.value,t.skinColorDefault??t.baseColor),Q(e.uniforms.uSkinColor1.value,t.skinColor1??t.shadowColor),Q(e.uniforms.uSkinColor2.value,t.skinColor2??t.skinColor1??t.shadowColor),Q(e.uniforms.uPartsAmbientColor.value,t.partsAmbientColor??`#ffffff`),e.uniforms.uPartsAmbientAlpha.value=t.partsAmbientAlpha??e.uniforms.uPartsAmbientAlpha.value,Q(e.uniforms.uReflectionBlendColor.value,t.reflectionBlendColor??`#ffffff`),Q(e.uniforms.uGlobalShadowColor.value,t.globalShadowColor??`#ffffff`),e.uniforms.uGlobalShadowAlpha.value=t.globalShadowAlpha??e.uniforms.uGlobalShadowAlpha.value}function fp(e,t){t.controllerAmbientColor!==void 0&&Q(e.uniforms.uControllerAmbientColor.value,t.controllerAmbientColor),e.uniforms.uControllerAmbientIntensity.value=t.controllerAmbientIntensity??e.uniforms.uControllerAmbientIntensity.value,Q(e.uniforms.uControllerSpecularColor.value,t.controllerSpecularColor??`#ffffff`),e.uniforms.uControllerSpecularIntensity.value=t.controllerSpecularIntensity??e.uniforms.uControllerSpecularIntensity.value,t.controllerRimColor!==void 0&&Q(e.uniforms.uControllerRimColor.value,t.controllerRimColor),t.controllerShadowRimColor!==void 0&&Q(e.uniforms.uControllerShadowRimColor.value,t.controllerShadowRimColor),e.uniforms.uControllerRimColorWeight.value=t.controllerRimColorWeight??e.uniforms.uControllerRimColorWeight.value,e.uniforms.uControllerShadowRimColorWeight.value=t.controllerShadowRimColorWeight??e.uniforms.uControllerShadowRimColorWeight.value,e.uniforms.uControllerRimRange.value=t.controllerRimRange??e.uniforms.uControllerRimRange.value,e.uniforms.uControllerRimEdgeSmoothness.value=t.controllerRimEdgeSmoothness??e.uniforms.uControllerRimEdgeSmoothness.value,e.uniforms.uControllerRimEmission.value=t.controllerRimEmission??e.uniforms.uControllerRimEmission.value,e.uniforms.uControllerRimLightInfluence.value=t.controllerRimLightInfluence??e.uniforms.uControllerRimLightInfluence.value,e.uniforms.uControllerRimShadowSharpness.value=t.controllerRimShadowSharpness??e.uniforms.uControllerRimShadowSharpness.value,t.bodyDebugMode!==void 0&&e.uniforms.uBodyDebugMode&&(e.uniforms.uBodyDebugMode.value=t.bodyDebugMode)}function pp(e,t){e.uniforms.uMainTex.value=t.mainTex??null,e.uniforms.uShadowTex.value=t.shadowTex??null,e.uniforms.uValueTex.value=t.valueTex??null,e.uniforms.uMainTexTransform.value=sp(t.mainTex),e.uniforms.uUseMainTex.value=+!!t.mainTex,e.uniforms.uUseShadowTex.value=+!!t.shadowTex,e.uniforms.uHasValueTex.value=+!!t.valueTex,e.uniforms.uUseValueTex.value=t.useValueTex??!!t.valueTex?1:0,e.uniforms.uAlphaCutoff&&(e.uniforms.uAlphaCutoff.value=t.alphaCutoff??0)}function mp(e,t){e.uniforms.uLightDirection.value.copy(t.lightDirection.clone().normalize()),e.uniforms.uLightIntensity.value=t.lightIntensity,e.uniforms.uAmbientIntensity.value=t.ambientIntensity,e.uniforms.uShadowThreshold.value=t.shadowThreshold,e.uniforms.uShadowWeight.value=t.shadowWeight,e.uniforms.uShadowWidth.value=t.shadowWidth??e.uniforms.uShadowWidth.value,hp(e,t)}function hp(e,t){gp(e,t),_p(e,t)}function gp(e,t){t.shadowFade!==void 0&&e.uniforms.uShadowFade&&(e.uniforms.uShadowFade.value=t.shadowFade),t.shadowWidthOverride!==void 0&&e.uniforms.uShadowWidthOverride&&(e.uniforms.uShadowWidthOverride.value=t.shadowWidthOverride??-1),t.valueShadowInfluence!==void 0&&e.uniforms.uValueShadowInfluence&&(e.uniforms.uValueShadowInfluence.value=t.valueShadowInfluence)}function _p(e,t){t.hairShadowEnabled!==void 0&&e.uniforms.uHairShadowEnabled&&(e.uniforms.uHairShadowEnabled.value=+!!t.hairShadowEnabled),t.useLambert!==void 0&&e.uniforms.uUseLambert&&(e.uniforms.uUseLambert.value=+!!t.useLambert),t.headPosition&&e.uniforms.uHeadPosition&&e.uniforms.uHeadPosition.value.copy(t.headPosition),t.headNormalBlend!==void 0&&e.uniforms.uHeadNormalBlend&&(e.uniforms.uHeadNormalBlend.value=t.headNormalBlend)}function vp(e,t){e.uniforms.uCharacterAmbientIntensity.value=t.characterAmbientIntensity??.3,e.uniforms.uRimColorAlpha.value=t.rimColorAlpha??e.uniforms.uRimColorAlpha.value,e.uniforms.uRimDirection.value.copy((t.rimDirection??new W(o.x,o.y,o.z)).clone().normalize()),e.uniforms.uSpecularPower.value=t.specularPower??0,e.uniforms.uRimThreshold.value=t.rimThreshold??.2,e.uniforms.uShadowTexWeight.value=t.shadowTexWeight??1,e.uniforms.uFadeMode&&(e.uniforms.uFadeMode.value=t.fadeMode??e.uniforms.uFadeMode.value),e.uniforms.uHueSinAngle&&(e.uniforms.uHueSinAngle.value=t.hueSinAngle??e.uniforms.uHueSinAngle.value),e.uniforms.uHueCosAngle&&(e.uniforms.uHueCosAngle.value=t.hueCosAngle??e.uniforms.uHueCosAngle.value),e.uniforms.uSaturation.value=t.saturation??e.uniforms.uSaturation.value,e.uniforms.uValue&&(e.uniforms.uValue.value=t.value??e.uniforms.uValue.value),e.uniforms.uContrast&&(e.uniforms.uContrast.value=t.contrast??e.uniforms.uContrast.value)}function yp(e,t){e.uniforms.uCameraPosition.value.copy(t)}function bp(e){return new ea({defines:{USE_UV1:``},transparent:!1,depthWrite:!0,side:0,uniforms:{uBaseColor:{value:ap(e.baseColor)},uWarmColor:{value:ap(e.warmColor)},uSkinColorDefault:{value:ap(e.skinColorDefault??e.baseColor)},uSkinColor1:{value:ap(e.skinColor1??e.warmColor)},uSkinColor2:{value:ap(e.skinColor2??e.warmColor)},uMainTex:{value:e.mainTex??null},uShadowTex:{value:e.shadowTex??null},uValueTex:{value:e.valueTex??null},uFaceShadowTex:{value:e.faceShadowTex??null},uMainTexTransform:{value:sp(e.mainTex)},uUseMainTex:{value:+!!e.mainTex},uUseShadowTex:{value:+!!e.shadowTex},uHasValueTex:{value:+!!e.valueTex},uUseValueTex:{value:e.useValueTex??!!e.valueTex?1:0},uUseFaceShadowTex:{value:+!!e.faceShadowTex},uLightDirection:{value:e.lightDirection.clone().normalize()},uCameraPosition:{value:new W},uHeadDotDirectionalLight:{value:(e.headDotDirectionalLight??new H(0,0)).clone()},uUseFaceShadowLimiter:{value:e.useFaceShadowLimiter===!1?0:1},uFaceShadowLimitRange:{value:e.faceShadowLimitRange??0},uLightIntensity:{value:e.lightIntensity},uAmbientIntensity:{value:e.ambientIntensity},uFaceDebugMode:{value:e.faceDebugMode??0},uFaceSdfEnabled:{value:e.faceSdfEnabled&&e.faceShadowTex?1:0},uShadowThreshold:{value:e.shadowThreshold??.5},uShadowWeight:{value:e.shadowWeight??1},uShadowWidth:{value:e.shadowWidth??0},uFadeMode:{value:e.fadeMode??0},uUseLambert:{value:e.useLambert===!1?0:1},uShadowTexWeight:{value:e.shadowTexWeight??1},uHueSinAngle:{value:e.hueSinAngle??0},uHueCosAngle:{value:e.hueCosAngle??1},uSaturation:{value:e.saturation??.5},uValue:{value:e.value??.5},uContrast:{value:e.contrast??.5},uPartsAmbientColor:{value:ap(e.partsAmbientColor??`#ffffff`)},uPartsAmbientAlpha:{value:e.partsAmbientAlpha??0},uControllerAmbientColor:{value:op(e.controllerAmbientColor,s.ambientColor)},uControllerAmbientIntensity:{value:e.controllerAmbientIntensity??1},uControllerSpecularColor:{value:op(e.controllerSpecularColor,s.specularColor)},uControllerSpecularIntensity:{value:e.controllerSpecularIntensity??1},uControllerRimColor:{value:op(e.controllerRimColor,s.rimColor)},uControllerShadowRimColor:{value:op(e.controllerShadowRimColor,s.shadowRimColor)},uControllerRimColorWeight:{value:e.controllerRimColorWeight??1},uControllerShadowRimColorWeight:{value:e.controllerShadowRimColorWeight??1},uControllerRimRange:{value:e.controllerRimRange??s.rimRange},uControllerRimEdgeSmoothness:{value:e.controllerRimEdgeSmoothness??s.rimEdgeSmoothness},uControllerRimEmission:{value:e.controllerRimEmission??s.rimEmission},uControllerRimLightInfluence:{value:e.controllerRimLightInfluence??s.rimLightInfluence},uControllerRimShadowSharpness:{value:e.controllerRimShadowSharpness??s.rimShadowSharpness},uRimColorAlpha:{value:e.rimColorAlpha??s.rimColorAlpha},uRimDirection:{value:(e.rimDirection??new W(o.x,o.y,o.z)).clone().normalize()},uSpecularPower:{value:e.specularPower??0},uRimThreshold:{value:e.rimThreshold??.2},uGlobalShadowColor:{value:ap(e.globalShadowColor??`#ffffff`)},uGlobalShadowAlpha:{value:e.globalShadowAlpha??1},uAlphaCutoff:{value:e.alphaCutoff??0}},vertexColors:!0,vertexShader:`
      #include <common>
      #include <uv_pars_vertex>
      #include <color_pars_vertex>
      #include <skinning_pars_vertex>
      #include <morphtarget_pars_vertex>

      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;
      varying vec2 vUv;
      varying vec2 vFaceShadowUv;

      void main() {
        #include <uv_vertex>
        #include <color_vertex>
        #include <beginnormal_vertex>
        #include <morphnormal_vertex>
        #include <skinbase_vertex>
        #include <skinnormal_vertex>
        #include <defaultnormal_vertex>
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>

        vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
        vWorldPosition = worldPosition.xyz;
        vWorldNormal = inverseTransformDirection(
          transformedNormal,
          viewMatrix
        );
        vUv = uv;
        #ifdef USE_UV1
          vFaceShadowUv = uv1;
        #else
          vFaceShadowUv = uv;
        #endif
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,fragmentShader:`
      #include <common>
      #include <color_pars_fragment>

      uniform vec3 uBaseColor;
      uniform vec3 uWarmColor;
      uniform vec3 uSkinColorDefault;
      uniform vec3 uSkinColor1;
      uniform vec3 uSkinColor2;
      uniform sampler2D uMainTex;
      uniform sampler2D uShadowTex;
      uniform sampler2D uValueTex;
      uniform sampler2D uFaceShadowTex;
      uniform mat3 uMainTexTransform;
      uniform float uUseMainTex;
      uniform float uUseShadowTex;
      uniform float uHasValueTex;
      uniform float uUseValueTex;
      uniform float uUseFaceShadowTex;
      uniform vec3 uLightDirection;
      uniform vec3 uCameraPosition;
      uniform vec2 uHeadDotDirectionalLight;
      uniform float uUseFaceShadowLimiter;
      uniform float uFaceShadowLimitRange;
      uniform float uLightIntensity;
      uniform float uAmbientIntensity;
      uniform float uFaceDebugMode;
      uniform float uFaceSdfEnabled;
      uniform float uShadowThreshold;
      uniform float uShadowWeight;
      uniform float uShadowWidth;
      uniform float uFadeMode;
      uniform float uUseLambert;
      uniform float uShadowTexWeight;
      uniform float uHueSinAngle;
      uniform float uHueCosAngle;
      uniform float uSaturation;
      uniform float uValue;
      uniform float uContrast;
      uniform vec3 uPartsAmbientColor;
      uniform float uPartsAmbientAlpha;
      uniform vec3 uControllerAmbientColor;
      uniform float uControllerAmbientIntensity;
      uniform vec3 uControllerSpecularColor;
      uniform float uControllerSpecularIntensity;
      uniform vec3 uControllerRimColor;
      uniform vec3 uControllerShadowRimColor;
      uniform float uControllerRimColorWeight;
      uniform float uControllerShadowRimColorWeight;
      uniform float uControllerRimRange;
      uniform float uControllerRimEdgeSmoothness;
      uniform float uControllerRimEmission;
      uniform float uControllerRimLightInfluence;
      uniform float uControllerRimShadowSharpness;
      uniform float uRimColorAlpha;
      uniform vec3 uRimDirection;
      uniform float uSpecularPower;
      uniform float uRimThreshold;
      uniform vec3 uGlobalShadowColor;
      uniform float uGlobalShadowAlpha;
      uniform float uAlphaCutoff;

      varying vec3 vWorldPosition;
      varying vec3 vWorldNormal;
      varying vec2 vUv;
      varying vec2 vFaceShadowUv;

      ${rp}
      ${ip}
      ${cp}

      vec3 outputColor(vec3 color) {
        return color;
      }

      void main() {
        vec2 mainUv = (uMainTexTransform * vec3(vUv, 1.0)).xy;
        vec2 faceShadowUv = vFaceShadowUv;
        vec4 mainSample = vec4(1.0);
        vec3 mainColor = uBaseColor;
        if (uUseMainTex > 0.5) {
          mainSample = sekaiGammaTexture(texture2D(uMainTex, mainUv));
          if (uAlphaCutoff > 0.0 && mainSample.a < uAlphaCutoff) {
            discard;
          }
          mainColor = mainSample.rgb;
        }

        vec3 sampledShadow = uUseShadowTex > 0.5
          ? sekaiGammaTexture(texture2D(uShadowTex, mainUv).rgb)
          : uWarmColor;
        vec3 shadowColor = mix(mainColor, sampledShadow, clamp(uShadowTexWeight, 0.0, 1.0));
        vec4 valueSample = vec4(0.0, 0.0, 0.5, 0.0);
        if (uHasValueTex > 0.5) {
          valueSample = texture2D(uValueTex, mainUv);
        }
        float skinMask = uHasValueTex > 0.5
          ? step(0.5, valueSample.r)
          : 0.0;
        float shadowBand = sekaiBaseShadow(
          dot(normalize(vWorldNormal), normalize(uLightDirection)),
          valueSample.b,
          uUseLambert,
          uUseValueTex,
          uShadowThreshold,
          uShadowWidth,
          uFadeMode
        ) * uShadowWeight;
        float sdfValue = 0.0;
        float faceThreshold = 0.0;
        float faceShadow = 0.0;
        if ((uFaceSdfEnabled > 0.5 || uFaceDebugMode > 0.5) && uUseFaceShadowTex > 0.5) {
          float sdf0 = texture2D(uFaceShadowTex, faceShadowUv).r;
          float sdf1 = texture2D(
            uFaceShadowTex,
            vec2(-faceShadowUv.x, faceShadowUv.y)
          ).r;
          sdfValue = uHeadDotDirectionalLight.x <= 0.0 ? sdf1 : sdf0;
          faceThreshold = uHeadDotDirectionalLight.y;
          if (uUseFaceShadowLimiter > 0.5) {
            faceThreshold = min(
              max((1.0 - abs(2.0 * uHeadDotDirectionalLight.y - 1.0)) * 0.5, 0.0),
              uFaceShadowLimitRange
            );
          }
          faceThreshold = clamp(faceThreshold, 0.0, 1.0);
          faceShadow = sekaiFaceShadow(sdfValue, faceThreshold, uShadowWidth, uFadeMode);
          if (uFaceDebugMode > 0.5) {
            if (uFaceDebugMode < 1.5) {
              gl_FragColor = vec4(outputColor(vec3(sdfValue)), 1.0);
              return;
            }
            if (uFaceDebugMode < 2.5) {
              gl_FragColor = vec4(outputColor(vec3(faceShadow)), 1.0);
              return;
            }
            if (uFaceDebugMode < 3.5) {
              gl_FragColor = vec4(outputColor(vec3(faceThreshold)), 1.0);
              return;
            }
            if (uFaceDebugMode < 4.5) {
              gl_FragColor = vec4(outputColor(vec3(
                max(uHeadDotDirectionalLight.x, 0.0),
                max(-uHeadDotDirectionalLight.x, 0.0),
                uHeadDotDirectionalLight.y
              )), 1.0);
              return;
            }
            gl_FragColor = vec4(outputColor(vec3(uHeadDotDirectionalLight.y)), 1.0);
            return;
          }
          if (uFaceSdfEnabled > 0.5) {
            shadowBand = max(shadowBand, faceShadow);
          }
        }
        vec3 adjustedMainColor = sekaiApplyHsvc(
          mainColor,
          uHueSinAngle,
          uHueCosAngle,
          uSaturation,
          uValue,
          uContrast
        );
        vec3 globalShadow = mix(
          vec3(1.0),
          uGlobalShadowColor,
          clamp(uGlobalShadowAlpha, 0.0, 1.0)
        );
        vec3 baseShadedColor = mix(
          adjustedMainColor,
          shadowColor * globalShadow,
          clamp(shadowBand, 0.0, 1.0)
        );
        float skinValue = mix(
          mainColor.r,
          mix(mainColor.r, sampledShadow.r, clamp(uShadowTexWeight, 0.0, 1.0)),
          clamp(shadowBand, 0.0, 1.0)
        );
        vec3 skinColor = sekaiApplyHsvc(
          sekaiSkinRamp(
            skinValue,
            globalShadow,
            uSkinColorDefault,
            uSkinColor1,
            uSkinColor2
          ),
          uHueSinAngle,
          uHueCosAngle,
          uSaturation,
          uValue,
          uContrast
        );
        vec3 color = mix(baseShadedColor, skinColor, skinMask);

        vec3 normal = normalize(vWorldNormal);
        vec3 lightDir = normalize(uLightDirection);
        vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
        float vertexRimMask = 1.0;
        #ifdef USE_COLOR
        vertexRimMask = clamp(vColor.g, 0.0, 1.0);
        #endif

        float halfLambert = clamp(
          dot(normal, normalize(lightDir + viewDir)),
          0.0,
          1.0
        );
        float specEnabled = step(0.0001, uSpecularPower);
        float specPower = 10.0 / max(uSpecularPower, 0.0001);
        float specular = pow(halfLambert, specPower) * valueSample.a * specEnabled;

        float nDotV = clamp(dot(normal, viewDir), 0.0, 1.0);
        vec3 rimDirection = normalize(uRimDirection);
        float nDotRim = dot(normal, rimDirection);
        float vDotRim = clamp(dot(viewDir, rimDirection), 0.0, 1.0);
        float rimRange = max(uControllerRimRange, 0.0);
        rimRange = rimRange > 10.0 ? rimRange * 0.01 : rimRange;
        rimRange = min(rimRange, 10.0);
        float rimSmoothness = max(uControllerRimEdgeSmoothness, 0.00001);
        float rimInfluence = clamp(uControllerRimLightInfluence, 0.0, 1.0);
        float viewFresnel = pow(
          1.0 - nDotV,
          max(10.0 - clamp(rimRange, 0.0, 10.0), 0.001)
        );
        float directedRim =
          viewFresnel * mix(1.0, vDotRim, rimInfluence);
        float sidedRim = nDotRim < 0.05
          ? directedRim
          : directedRim * (1.0 - 2.0 * rimInfluence);
        float rim = sekaiSmooth01(clamp(
          (sidedRim - uRimThreshold) / rimSmoothness,
          0.0,
          1.0
        ));
        vec3 controllerRimBase = mix(
          vec3(0.5),
          uControllerRimColor,
          clamp(uControllerRimColorWeight, 0.0, 1.0)
        );
        vec3 controllerShadowRimBase = mix(
          controllerRimBase,
          uControllerShadowRimColor,
          clamp(uControllerShadowRimColorWeight, 0.0, 1.0)
        );
        float rimShadowSharpness = clamp(
          uControllerRimShadowSharpness,
          0.0,
          1.0
        );
        float rimColorMix = sekaiSmooth01(clamp(
          (nDotRim - (rimShadowSharpness - 1.0)) /
            max(2.0 * (1.0 - rimShadowSharpness), 0.00001),
          0.0,
          1.0
        ));
        vec3 rimColor = mix(
          controllerRimBase,
          controllerShadowRimBase,
          rimColorMix
        );
        vec3 rimAdd = rimColor *
          rim *
          vertexRimMask *
          max(uRimColorAlpha, 0.0);
        color += rimAdd;
        color += rimAdd * uControllerRimEmission;
        color +=
          uControllerSpecularColor *
          uControllerSpecularIntensity *
          specular;

        color = sekaiApplyCharacterAmbient(
          color,
          uControllerAmbientColor,
          uControllerAmbientIntensity,
          vec4(uPartsAmbientColor, uPartsAmbientAlpha)
        );
        gl_FragColor = vec4(
          outputColor(clamp(color, 0.0, 1.0)),
          uUseMainTex > 0.5 ? mainSample.a : 1.0
        );
      }
    `})}function xp(e,t){t.controllerAmbientColor!==void 0&&Q(e.uniforms.uControllerAmbientColor.value,t.controllerAmbientColor),e.uniforms.uControllerAmbientIntensity.value=t.controllerAmbientIntensity??e.uniforms.uControllerAmbientIntensity.value,t.controllerSpecularColor!==void 0&&Q(e.uniforms.uControllerSpecularColor.value,t.controllerSpecularColor),e.uniforms.uControllerSpecularIntensity.value=t.controllerSpecularIntensity??e.uniforms.uControllerSpecularIntensity.value,t.controllerRimColor!==void 0&&Q(e.uniforms.uControllerRimColor.value,t.controllerRimColor),t.controllerShadowRimColor!==void 0&&Q(e.uniforms.uControllerShadowRimColor.value,t.controllerShadowRimColor),e.uniforms.uControllerRimColorWeight.value=t.controllerRimColorWeight??e.uniforms.uControllerRimColorWeight.value,e.uniforms.uControllerShadowRimColorWeight.value=t.controllerShadowRimColorWeight??e.uniforms.uControllerShadowRimColorWeight.value,e.uniforms.uControllerRimRange.value=t.controllerRimRange??e.uniforms.uControllerRimRange.value,e.uniforms.uControllerRimEdgeSmoothness.value=t.controllerRimEdgeSmoothness??e.uniforms.uControllerRimEdgeSmoothness.value,e.uniforms.uControllerRimEmission.value=t.controllerRimEmission??e.uniforms.uControllerRimEmission.value,e.uniforms.uControllerRimLightInfluence.value=t.controllerRimLightInfluence??e.uniforms.uControllerRimLightInfluence.value,e.uniforms.uControllerRimShadowSharpness.value=t.controllerRimShadowSharpness??e.uniforms.uControllerRimShadowSharpness.value,e.uniforms.uRimColorAlpha.value=t.rimColorAlpha??e.uniforms.uRimColorAlpha.value,t.rimDirection&&e.uniforms.uRimDirection.value.copy(t.rimDirection).normalize(),e.uniforms.uSpecularPower.value=t.specularPower??e.uniforms.uSpecularPower.value,e.uniforms.uRimThreshold.value=t.rimThreshold??e.uniforms.uRimThreshold.value,Q(e.uniforms.uGlobalShadowColor.value,t.globalShadowColor??`#ffffff`),e.uniforms.uGlobalShadowAlpha.value=t.globalShadowAlpha??e.uniforms.uGlobalShadowAlpha.value,e.uniforms.uAlphaCutoff.value=t.alphaCutoff??e.uniforms.uAlphaCutoff.value}function Sp(e,t){t.faceDebugMode!==void 0&&(e.uniforms.uFaceDebugMode.value=t.faceDebugMode),e.uniforms.uFaceSdfEnabled&&(e.uniforms.uFaceSdfEnabled.value=t.faceSdfEnabled&&t.faceShadowTex?1:0)}function Cp(e,t){Q(e.uniforms.uBaseColor.value,t.baseColor),Q(e.uniforms.uWarmColor.value,t.warmColor),Q(e.uniforms.uSkinColorDefault.value,t.skinColorDefault??t.baseColor),Q(e.uniforms.uSkinColor1.value,t.skinColor1??t.warmColor),Q(e.uniforms.uSkinColor2.value,t.skinColor2??t.warmColor),e.uniforms.uMainTex.value=t.mainTex??null,e.uniforms.uShadowTex.value=t.shadowTex??null,e.uniforms.uValueTex.value=t.valueTex??null,e.uniforms.uFaceShadowTex.value=t.faceShadowTex??null,e.uniforms.uMainTexTransform.value=sp(t.mainTex),e.uniforms.uUseMainTex.value=+!!t.mainTex,e.uniforms.uUseShadowTex.value=+!!t.shadowTex,e.uniforms.uHasValueTex.value=+!!t.valueTex,e.uniforms.uUseValueTex.value=t.useValueTex??!!t.valueTex?1:0,e.uniforms.uUseFaceShadowTex.value=+!!t.faceShadowTex,e.uniforms.uLightDirection.value.copy(t.lightDirection.clone().normalize()),wp(e,t.lightDirection,t.headDotDirectionalLight??e.uniforms.uHeadDotDirectionalLight?.value,t.useFaceShadowLimiter,t.faceShadowLimitRange),e.uniforms.uLightIntensity.value=t.lightIntensity,e.uniforms.uAmbientIntensity.value=t.ambientIntensity,e.uniforms.uShadowThreshold.value=t.shadowThreshold??e.uniforms.uShadowThreshold.value,e.uniforms.uShadowWeight.value=t.shadowWeight??e.uniforms.uShadowWeight.value,e.uniforms.uShadowWidth.value=t.shadowWidth??e.uniforms.uShadowWidth.value,e.uniforms.uFadeMode.value=t.fadeMode??e.uniforms.uFadeMode.value,e.uniforms.uUseLambert.value=t.useLambert===!1?0:1,e.uniforms.uShadowTexWeight.value=t.shadowTexWeight??e.uniforms.uShadowTexWeight.value,e.uniforms.uHueSinAngle.value=t.hueSinAngle??e.uniforms.uHueSinAngle.value,e.uniforms.uHueCosAngle.value=t.hueCosAngle??e.uniforms.uHueCosAngle.value,e.uniforms.uSaturation.value=t.saturation??e.uniforms.uSaturation.value,e.uniforms.uValue.value=t.value??e.uniforms.uValue.value,e.uniforms.uContrast.value=t.contrast??e.uniforms.uContrast.value,Q(e.uniforms.uPartsAmbientColor.value,t.partsAmbientColor??`#ffffff`),e.uniforms.uPartsAmbientAlpha.value=t.partsAmbientAlpha??e.uniforms.uPartsAmbientAlpha.value,xp(e,t),Sp(e,t)}function wp(e,t,n,r=!0,i=0){e.uniforms.uLightDirection?.value.copy(t).normalize(),n&&e.uniforms.uHeadDotDirectionalLight&&e.uniforms.uHeadDotDirectionalLight.value.copy(n),e.uniforms.uUseFaceShadowLimiter&&(e.uniforms.uUseFaceShadowLimiter.value=+!!r),e.uniforms.uFaceShadowLimitRange&&(e.uniforms.uFaceShadowLimitRange.value=i)}function Tp(e){return+!!e}function Ep(e){let t=e===`add`||e===`eyelight`,n=e===`eyelight`;return{defaultDistortion:+!!n,uniformMode:e===`eye`?1:n?2:0,materialSettings:{blending:t?5:1,...t?{blendSrc:204,blendDst:201,blendEquation:100}:{},polygonOffsetFactor:n?-.5:-1,polygonOffsetUnits:n?-.5:-1}}}function Dp(e){return{tileX:e&&e.tileX>0?e.tileX:1,tileY:e&&e.tileY>0?e.tileY:1,sample:Math.max(0,e?.sample??0)}}function Op(e,t=`alpha`,n,r){let{defaultDistortion:i,uniformMode:a,materialSettings:o}=Ep(t),s=Dp(n),c=new ea({transparent:!0,depthWrite:!1,depthTest:!0,depthFunc:3,side:2,vertexColors:(r?.vertexBViewOffset??0)>0,...o,polygonOffset:!0,uniforms:{uMainTex:{value:e},uMainTexTransform:{value:sp(e)},uUseMainTex:{value:Tp(e)},uMode:{value:a},uTintColor:{value:ap(r?.tintColor??`#ffffff`)},uEmissionColor:{value:ap(r?.emissionColor??`#000000`)},uAtlasTile:{value:new H(s.tileX,s.tileY)},uAtlasSample:{value:s.sample},uUseAtlas:{value:0},uTime:{value:0},uLightInfluence:{value:V.clamp(r?.lightInfluence??1,0,1)},uHighlightInfluence:{value:V.clamp(r?.highlightInfluence??1,0,1)},uVertexBViewOffset:{value:Math.max(0,r?.vertexBViewOffset??0)},uDistortionFps:{value:Math.max(1,r?.distortionFps??12)},uDistortionIntensity:{value:Math.max(0,r?.distortionIntensity??i)},uDistortionIntensityXY:{value:new H(Math.max(0,r?.distortionIntensityX??i),Math.max(0,r?.distortionIntensityY??i))},uDistortionOffset:{value:new H(r?.distortionOffsetX??0,r?.distortionOffsetY??0)},uDistortionScroll:{value:new H(r?.distortionScrollX??.5,r?.distortionScrollY??.5)},uDistortionScrollSpeed:{value:r?.distortionScrollSpeed??1},uDistortionTexTiling:{value:new H(Math.max(.001,r?.distortionTexTilingX??1),Math.max(.001,r?.distortionTexTilingY??1))},uThreshold:{value:V.clamp(r?.threshold??.5,0,1)},uAlphaScale:{value:V.clamp(r?.alphaScale??1,0,1)},uAlphaCutoff:{value:V.clamp(r?.alphaCutoff??.001,0,1)},uStrictAlpha:{value:Tp(r?.strictAlpha)},uAlphaSource:{value:0}},vertexShader:`
      #include <common>
      #include <uv_pars_vertex>
      #include <color_pars_vertex>
      #include <skinning_pars_vertex>
      #include <morphtarget_pars_vertex>

      uniform float uVertexBViewOffset;

      varying vec2 vUv;
      varying vec3 vViewNormal;

      void main() {
        #include <uv_vertex>
        #include <color_vertex>
        #include <beginnormal_vertex>
        #include <morphnormal_vertex>
        #include <skinbase_vertex>
        #include <skinnormal_vertex>
        #include <defaultnormal_vertex>
        #include <begin_vertex>
        #include <morphtarget_vertex>
        #include <skinning_vertex>

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        #ifdef USE_COLOR
        mvPosition.z += clamp(vColor.b, 0.0, 1.0) * uVertexBViewOffset;
        #endif
        vUv = uv;
        vViewNormal = normalize(normalMatrix * objectNormal);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      #include <common>

      uniform sampler2D uMainTex;
      uniform mat3 uMainTexTransform;
      uniform float uUseMainTex;
      uniform float uMode;
      uniform vec3 uTintColor;
      uniform vec3 uEmissionColor;
      uniform vec2 uAtlasTile;
      uniform float uAtlasSample;
      uniform float uUseAtlas;
      uniform float uTime;
      uniform float uLightInfluence;
      uniform float uHighlightInfluence;
      uniform float uDistortionFps;
      uniform float uDistortionIntensity;
      uniform vec2 uDistortionIntensityXY;
      uniform vec2 uDistortionOffset;
      uniform vec2 uDistortionScroll;
      uniform float uDistortionScrollSpeed;
      uniform vec2 uDistortionTexTiling;
      uniform float uThreshold;
      uniform float uAlphaScale;
      uniform float uAlphaCutoff;
      uniform float uStrictAlpha;
      uniform float uAlphaSource;

      varying vec2 vUv;
      varying vec3 vViewNormal;

      ${cp}

      vec3 outputColor(vec3 color) {
        return color;
      }

      void main() {
        vec2 uv = (uMainTexTransform * vec3(vUv, 1.0)).xy;
        if (uUseAtlas > 0.5) {
          vec2 tile = max(uAtlasTile, vec2(1.0));
          float sampleIndex = floor(max(uAtlasSample, 0.0));
          float tileX = mod(sampleIndex, tile.x);
          float tileY = floor(sampleIndex / tile.x);
          uv = (uv + vec2(tileX, tileY)) / tile;
        }
        if (uMode > 1.5) {
          float steppedTime = floor(uTime * uDistortionFps) / uDistortionFps;
          vec2 distortionUv = uv * uDistortionTexTiling
            + uDistortionOffset
            + uDistortionScroll * steppedTime * uDistortionScrollSpeed;
          vec2 proceduralDistortion = vec2(
            sin((distortionUv.x + distortionUv.y) * 6.2831853),
            cos((distortionUv.x - distortionUv.y) * 6.2831853)
          ) * 0.5 + vec2(
            sin(distortionUv.y * 12.5663706 + steppedTime),
            cos(distortionUv.x * 12.5663706 - steppedTime)
          ) * 0.25;
          float edge = 1.0 - clamp(abs(vViewNormal.z), 0.0, 1.0);
          vec2 normalDrift = normalize(vViewNormal.xy + vec2(0.0001)) * edge * 0.0045;
          vec2 distortion = proceduralDistortion * uDistortionIntensityXY * 0.0032 * uDistortionIntensity;
          uv += (normalDrift + distortion) * mix(0.25, 1.0, uHighlightInfluence);
        }
        vec4 sampleColor = uUseMainTex > 0.5
          ? sekaiGammaTexture(texture2D(uMainTex, uv))
          : vec4(1.0);
        float textureAlpha = sampleColor.a;
        float alpha = uAlphaSource > 1.5
          ? sampleColor.r
          : (uAlphaSource > 0.5 ? 1.0 : textureAlpha);
        if (uAlphaSource > 1.5 && sampleColor.r < uThreshold) {
          discard;
        }
        if (uAlphaSource < 0.5 && uMode > 1.5 && uStrictAlpha < 0.5) {
          float brightness = max(max(sampleColor.r, sampleColor.g), sampleColor.b);
          float alphaLow = mix(0.06, 0.16, uThreshold);
          float alphaHigh = mix(0.32, 0.55, uThreshold);
          float brightnessMask = smoothstep(alphaLow, alphaHigh, brightness);
          alpha = textureAlpha * brightnessMask;
        }
        if (alpha < max(uAlphaCutoff, 0.001)) {
          discard;
        }
        alpha *= uAlphaScale;
        if (alpha < 0.001) {
          discard;
        }
        vec3 color = sampleColor.rgb * uTintColor + uEmissionColor;
        if (uMode > 0.5 && uMode < 1.5) {
          color *= mix(1.0, 1.04, uLightInfluence);
        }
        if (uMode > 1.5) {
          float brightness = max(max(sampleColor.r, sampleColor.g), sampleColor.b);
          color = max(color, vec3(brightness) * uTintColor);
          color *= 1.05 + alpha * mix(0.65, 1.05, uHighlightInfluence);
          if (uAlphaSource < 0.5) {
            alpha = clamp(alpha * mix(1.1, 1.55, uHighlightInfluence), 0.0, 1.0);
          }
        }
        gl_FragColor = vec4(outputColor(clamp(color, 0.0, 1.0)), alpha);
      }
    `});return c.forceSinglePass=!0,c}var kp={right:new W(1,0,0),left:new W(-1,0,0),up:new W(0,1,0),down:new W(0,-1,0),forward:new W(0,0,1),back:new W(0,0,-1)};function Ap(e,t){if(!e)return t.clone();let n=Kp(e.x??e.X),r=Kp(e.y??e.Y),i=Kp(e.z??e.Z);return n===null||r===null||i===null?t.clone():new W(n,r,i)}function jp(e){if(!e)return new U;let t=Kp(e.x??e.X),n=Kp(e.y??e.Y),r=Kp(e.z??e.Z),i=Kp(e.w??e.W);return t===null||n===null||r===null||i===null?new U:Mp(new U(t,n,r,i))}function Mp(e){let t=Math.fround,n=t(e.x),r=t(e.y),i=t(e.z),a=t(e.w),o=t(n*n),s=t(r*r),c=t(i*i),l=t(a*a),u=t(t(o+s)+t(c+l)),d=t(t(s+c)+t(l+o)),f=t(Math.sqrt(u)),p=t(Math.sqrt(d));return e.set(u>t(1e-30)?t(n/f):0,d>t(1e-30)?t(r/p):0,u>t(1e-30)?t(i/f):0,d>t(1e-30)?t(a/p):1)}function Np(e){return new W(-e.x,e.y,e.z)}function Pp(e){return Np(e)}function Fp(e){return new U(e.x,-e.y,-e.z,e.w)}function Ip(e){return Pp(kp[e])}function Lp(e,t){let n=Math.fround;t.identity();for(let r=e;r;r=r.parent){let e=n(r.quaternion.x),i=n(r.quaternion.y),a=n(r.quaternion.z),o=n(r.quaternion.w),s=r.scale.x<0?-1:1,c=r.scale.y<0?-1:1,l=r.scale.z<0?-1:1,u=t.x*c*l,d=t.y*s*l,f=t.z*s*c,p=t.w;t.set(n(n(n(n(i*f)-n(a*d))+n(o*u))+n(e*p)),n(n(n(n(a*u)-n(e*f))+n(o*d))+n(i*p)),n(n(n(n(o*f)-n(i*u))+n(a*p))+n(e*d)),n(n(n(n(o*p)-n(e*u))-n(a*f))-n(i*d)))}return t}var Rp=new U;function zp(e,t){let n=Math.fround;t.set(n(e.position.x),n(e.position.y),n(e.position.z));for(let r=e.parent;r;r=r.parent)t.set(n(t.x*n(r.scale.x)),n(t.y*n(r.scale.y)),n(t.z*n(r.scale.z))),Hp(t,r.quaternion),t.set(n(t.x+n(r.position.x)),n(t.y+n(r.position.y)),n(t.z+n(r.position.z)));return t}function Bp(e,t){let n=[];for(let t=e;t;t=t.parent)n.push(t);let r=Math.fround;t.set(r(t.x),r(t.y),r(t.z));for(let e=n.length-1;e>=0;e--){let i=n[e];t.set(r(t.x-r(i.position.x)),r(t.y-r(i.position.y)),r(t.z-r(i.position.z))),Hp(t,i.quaternion,!0),t.set(r(t.x*Vp(i.scale.x)),r(t.y*Vp(i.scale.y)),r(t.z*Vp(i.scale.z)))}return t}function Vp(e){let t=Math.fround,n=t(e),r=Math.abs(n);if(r<t(1e-9))return 0;if(!Number.isFinite(n))return 1/n;let i=2**Math.floor(Math.log2(r)),a=Math.floor((r/i-1)*2048),o=t(Math.sign(n)*Math.round(8192/(1+(a+.5)/2048))/8192/i),s=t(o*t(2.000000476837158-t(o*n)));return s=t(s*t(2-t(s*n))),Number.isNaN(s)?o:s}function Hp(e,t,n=!1){let r=Math.fround,i=e.x,a=e.y,o=e.z,s=n?-1:1,c=s*r(t.x),l=s*r(t.y),u=s*r(t.z),d=r(t.w),f=r(r(-2*l*l)-r(2*u*u)),p=r(r(-2*u*d)-r(-2*c*l)),m=r(r(2*c*u)-r(-2*l*d)),h=r(r(2*l*c)-r(-2*u*d)),g=r(r(-2*u*u)-r(2*c*c)),_=r(r(-2*c*d)-r(-2*l*u)),v=r(r(-2*l*d)-r(-2*u*c)),y=r(r(2*u*l)-r(-2*c*d)),b=r(r(-2*c*c)-r(2*l*l));e.set(r(r(r(f*i)+i)+r(r(p*a)+r(m*o))),r(r(r(h*i)+a)+r(r(g*a)+r(_*o))),r(r(r(v*i)+o)+r(r(y*a)+r(b*o))))}function Up(e,t){return t.copy(Wp(t,Lp(e,Rp)))}function Wp(e,t){let n=Math.fround,r=n(t.x*2),i=n(t.y*2),a=n(t.z*2),o=n(t.x*r),s=n(t.y*i),c=n(t.z*a),l=n(t.x*i),u=n(t.x*a),d=n(t.y*a),f=n(t.w*r),p=n(t.w*i),m=n(t.w*a);return new W(n((1-(s+c))*e.x+(l-m)*e.y+(u+p)*e.z),n((l+m)*e.x+(1-(o+c))*e.y+(d-f)*e.z),n((u-p)*e.x+(d+f)*e.y+(1-(o+s))*e.z))}function Gp(e,t,n){let r=Math.fround,i=r(V.clamp(n,0,1)),a=r(e.x),o=r(e.y),s=r(e.z),c=r(e.w),l=r(t.x),u=r(t.y),d=r(t.z),f=r(t.w);r(r(r(r(a*l)+r(o*u))+r(s*d))+r(c*f))<0&&(l=-l,u=-u,d=-d,f=-f);let p=r(a+r(r(l-a)*i)),m=r(o+r(r(u-o)*i)),h=r(s+r(r(d-s)*i)),g=r(c+r(r(f-c)*i)),_=r(Math.sqrt(r(r(r(r(p*p)+r(m*m))+r(h*h))+r(g*g))));return _>0?new U(r(p/_),r(m/_),r(h/_),r(g/_)):new U}function Kp(e){return typeof e==`number`&&Number.isFinite(e)?e:null}var qp=function(e){return e[e.NoCollision=0]=`NoCollision`,e[e.HeadIsEmbedded=1]=`HeadIsEmbedded`,e[e.TailCollision=2]=`TailCollision`,e}({}),Jp=1e-5,Yp=.001,Xp=new W(1,0,0);function Zp(e,t){return{currTipPos:t.clone(),prevTipPos:t.clone(),hitNormal:new W(0,0,0),cachedPosition:e.clone(),cachedMovement:new W(0,0,0)}}function Qp(e){let t=Cm(e.parentRotation.clone().multiply(e.initialLocalRotation)),n=Wp(e.boneAxis,t);return $(n.multiplyScalar(Math.fround(e.springLength))),$(e.headPosition.clone().add(n))}function $p(e,t){let n=Math.fround;$(e.currTipPos),$(e.prevTipPos);let r=e.currTipPos.clone(),i=$($(Qp(t).sub(e.currTipPos)).multiplyScalar(n(t.stiffnessForce))),a=$($($(t.springForce.clone().add(t.externalForce)).add(i)).multiplyScalar(n(.5*n(t.deltaTime)*n(t.deltaTime)))),o=$($(e.currTipPos.clone().sub(e.prevTipPos)).multiplyScalar(n(1-n(t.dragForce))));$(e.currTipPos.add($(a.add(o)))),e.prevTipPos.copy(r);let s=$(t.headPosition.clone()),c=$(e.currTipPos.clone().sub(s));Math.fround(c.length())<=Yp&&c.copy(t.lengthFallbackDirection??t.boneAxis),wm(c),$(c.multiplyScalar(n(t.springLength))),e.currTipPos.copy($(c.add(s)))}function em(e,t){let n=$(t.clone());$(e.cachedMovement.copy(n).sub(e.cachedPosition)),e.cachedPosition.copy(n)}function tm(e,t,n,r,i,a=Xp){let o=n.clone().sub(t),s=o.length();if(s<=Yp){o.copy(a).normalize(),e.copy(t).addScaledVector(o,r);return}let c=V.clamp(s,r,i);e.copy(t).addScaledVector(o,c/s)}function nm(e){if(e.targets.length===0)return;let t=e.springConstant*e.deltaTime*e.deltaTime,n=new W;for(let r of e.targets){let i=e.currTipPos.clone().sub(r.position),a=i.length();if(a<=Jp)continue;let o=a-r.initialLength;n.addScaledVector(i,-(t*o)/a)}e.currTipPos.add(n)}function rm(e,t){let n=qp.NoCollision,r=null,i=e.currTipPos.clone();for(let i of Am(t.colliders)){if(i.enabled===!1)continue;let a=om(i,t.headPosition,e.currTipPos,t.tailRadius,t.springLength);t.onColliderCheck?.(i,{status:a.status,beforeTailPosition:e.currTipPos.clone(),afterTailPosition:a.tailPosition.clone(),hitNormal:a.hitNormal.clone(),details:im(i,t.headPosition,e.currTipPos,a.tailPosition,t.tailRadius)}),a.status!==qp.NoCollision&&(e.currTipPos.copy(a.tailPosition),e.hitNormal.copy(a.hitNormal),r=a.hitNormal,n=a.status,t.onCollision?.(i,a))}return r&&bm(e,r,t.bounce,t.friction,i),n}function im(e,t,n,r,i){return e.kind===`sphere`?{kind:e.kind,localHeadPosition:t.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionBefore:n.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionAfter:r.clone().applyMatrix4(e.worldToLocalMatrix),localTailRadius:i*e.worldToLocalRadiusScale,localSphereOrigin:e.localOffset.clone(),localSphereRadius:e.radius}:e.kind===`capsuleLocal`?{kind:e.kind,localHeadPosition:t.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionBefore:n.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionAfter:r.clone().applyMatrix4(e.worldToLocalMatrix),localTailRadius:i*e.worldToLocalRadiusScale,localCapsuleStart:e.localStart.clone(),localCapsuleEnd:e.localEnd.clone(),capsuleRadius:e.radius}:e.kind===`panel`?{kind:e.kind,localHeadPosition:t.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionBefore:n.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionAfter:r.clone().applyMatrix4(e.worldToLocalMatrix),localTailRadius:i*e.worldToLocalRadiusScale,panelWidth:e.width,panelHeight:e.height}:{kind:e.kind,localHeadPosition:t.clone(),localTailPositionBefore:n.clone(),localTailPositionAfter:r.clone(),localTailRadius:i,localCapsuleStart:e.start.clone(),localCapsuleEnd:e.end.clone(),capsuleRadius:e.radius}}function am(e,t){let n=t.headPosition.clone();n.y-=t.groundHeight;let r=e.currTipPos.clone();return r.y-=t.groundHeight,dm(n,e.currTipPos.distanceTo(t.headPosition),r,t.tailRadius,1)!==qp.NoCollision&&(r.y+=t.groundHeight,tm(e.currTipPos,t.headPosition,r,t.springLength*.5,t.springLength,t.lengthFallbackDirection),e.prevTipPos.copy(e.currTipPos),e.hitNormal.set(0,1,0),!0)}function om(e,t,n,r,i){return e.kind===`sphere`?pm(t,n,r,e):e.kind===`capsule`?mm(t,n,r,e.start,e.end,e.radius):e.kind===`panel`?sm(t,n,r,i,e):hm(t,n,r,e)}function sm(e,t,n,r,i){let a=t.clone().applyMatrix4(i.worldToLocalMatrix),o=n*i.worldToLocalRadiusScale;if(a.z>=o)return km(t);let s=i.width*.5,c=i.height*.5;if(Math.abs(a.x)>=s+o||Math.abs(a.y)>=c+o)return km(t);let l=e.clone().applyMatrix4(i.worldToLocalMatrix),u=r*i.worldToLocalLengthScale,d=a.clone(),f=a.z>0||l.z>0?cm(l,a,d,u,o,s,c):um(l,a,d,o,s,c);return f===qp.NoCollision?km(t):{status:f,tailPosition:d.applyMatrix4(i.localToWorldMatrix),hitNormal:Nm(new W(0,0,1),i.localToWorldMatrix)}}function cm(e,t,n,r,i,a,o){if(Math.abs(t.y)<=o&&Math.abs(t.x)<=a)return dm(e,r,n,i,2);if(Math.abs(t.y)>o){let e=t.y>=0?o:-o,r=lm(new W(0,t.y-e,t.z));return n.set(t.x+r.x*i,e+r.y*i,r.z*i),qp.TailCollision}let s=t.x>=0?a:-a,c=lm(new W(t.x-s,0,t.z));return n.set(s+c.x*i,t.y+c.y*i,c.z*i),qp.TailCollision}function lm(e){return e.lengthSq()<=Jp*Jp?e.set(0,0,0):e.normalize()}function um(e,t,n,r,i,a){return Math.abs(e.y)>a?(n.set(t.x,t.y>=0?a:-a,t.z),qp.TailCollision):Math.abs(e.x)<=i?(n.set(e.x,e.y,r),qp.HeadIsEmbedded):(n.set(t.x<0?-i:i,t.y,t.z),qp.TailCollision)}function dm(e,t,n,r,i){if(Pm(n,i)>=r)return qp.NoCollision;let a=Pm(e,i);if(a+t<=r)return n.copy(e),Fm(n,i,a+t),qp.HeadIsEmbedded;let o=(i+1)%3,s=(i+2)%3,c=Pm(n,o)-Pm(e,o),l=Pm(n,s)-Pm(e,s),u=Math.sqrt(c*c+l*l);if(u>.001){let d=a-r,f=Math.sqrt(t*t-d*d)/u;Fm(n,o,Pm(e,o)+c*f),Fm(n,s,Pm(e,s)+l*f),Fm(n,i,r)}else n.copy(e);return qp.TailCollision}function fm(e,t,n,r,i,a=i,o={}){let s=n+i,c=t.clone().sub(r);if(c.lengthSq()>=s*s)return km(t);if(e.distanceToSquared(r)<=a*a){let t=o.headEmbeddedFallback===!1?c.clone().multiplyScalar(1/Math.sqrt(c.lengthSq())):Mm(c,o.headEmbeddedFallback instanceof W?o.headEmbeddedFallback:e.clone().sub(r).lengthSq()<=Jp*Jp?new W(0,1,0):e.clone().sub(r));return{status:qp.HeadIsEmbedded,tailPosition:r.clone().addScaledVector(t,s),hitNormal:t}}let l=vm(e,t.distanceTo(e),r,s);if(!l)return o.noIntersectionStatus===qp.TailCollision?{status:qp.TailCollision,tailPosition:t.clone(),hitNormal:Mm(t.clone().sub(r),c)}:km(t);let u=ym(l,t);return{status:qp.TailCollision,tailPosition:u,hitNormal:Mm(u.clone().sub(r),c)}}function pm(e,t,n,r){let i=e.clone().applyMatrix4(r.worldToLocalMatrix),a=t.clone().applyMatrix4(r.worldToLocalMatrix),o=n*r.worldToLocalRadiusScale,s=r.radius,c=fm(i,a,o,r.localOffset,s,s,{headEmbeddedFallback:!1,noIntersectionStatus:qp.TailCollision});return c.status===qp.NoCollision?km(t):{status:c.status,tailPosition:c.tailPosition.clone().applyMatrix4(r.localToWorldMatrix),hitNormal:Nm(c.hitNormal.clone(),r.localToWorldNormalMatrix)}}function mm(e,t,n,r,i,a){let o=i.clone().sub(r),s=o.lengthSq();if(s<=Jp*Jp)return fm(e,t,n,r,a);let c=V.clamp(t.clone().sub(r).dot(o)/s,0,1),l=r.clone().addScaledVector(o,c),u=n+a,d=t.clone().sub(l);if(d.lengthSq()>=u*u)return km(t);if(c<=Jp)return fm(e,t,n,r,a);if(c>=.99999)return fm(e,t,n,i,a);let f=Mm(d,e.clone().sub(l)),p=V.clamp(e.clone().sub(r).dot(o)/s,0,1),m=r.clone().addScaledVector(o,p);return{status:e.distanceToSquared(m)<=a*a?qp.HeadIsEmbedded:qp.TailCollision,tailPosition:l.addScaledVector(f,u),hitNormal:f}}function hm(e,t,n,r){let i=gm(e.clone().applyMatrix4(r.worldToLocalMatrix),t.clone().applyMatrix4(r.worldToLocalMatrix),n*r.worldToLocalRadiusScale,r.localStart,r.localEnd,r.radius,1);if(i.status===qp.NoCollision)return km(t);let a=i.tailPosition.clone().applyMatrix4(r.localToWorldMatrix),o=Nm(i.hitNormal,r.localToWorldNormalMatrix);return{status:i.status,tailPosition:a,hitNormal:o}}function gm(e,t,n,r,i,a,o=1){if(a<=1e-4)return km(t);let s=r.y<=i.y?r:i,c=r.y<=i.y?i:r,l=s.y,u=c.y;return t.y<=l||t.y>=u?fm(e,t,n,t.y<u?s:c,a,Math.abs(o)*a,{headEmbeddedFallback:new W(0,0,0),noIntersectionStatus:qp.TailCollision}):_m(e,t,n,a,o)}function _m(e,t,n,r,i=1){let a=r+n,o=t.x*t.x+t.z*t.z;if(o>a*a)return km(t);let s=Math.sqrt(o),c=s>Jp?t.x/s:0,l=s>Jp?t.z/s:0,u=new W(a*c,t.y,a*l),d=new W(c,0,l),f=e.x*e.x+e.z*e.z,p=Math.abs(i)*r;return{status:f<=p*p?qp.HeadIsEmbedded:qp.TailCollision,tailPosition:u,hitNormal:d}}function vm(e,t,n,r){let i=n.clone().sub(e),a=i.lengthSq(),o=Math.sqrt(a);if(o<=0)return null;let s=i.multiplyScalar(1/o),c=t*t,l=c+a-r*r,u=.5/o,d=a*4*c-l*l;if(d<0)return null;let f=l*u;return{origin:e.clone().addScaledVector(s,f),upVector:s,radius:u*Math.sqrt(d)}}function ym(e,t){let n=t.clone().sub(e.origin),r=e.origin.clone().addScaledVector(e.upVector,n.dot(e.upVector)),i=t.clone().sub(r),a=i.length();return a<=Jp||e.radius<=Jp?e.origin.clone():e.origin.clone().addScaledVector(i,e.radius/a)}function bm(e,t,n,r,i=e.currTipPos){let a=Mm(t,Xp),o=e.prevTipPos.clone(),s=i.clone().sub(o),c=a.clone().multiplyScalar(s.dot(a)),l=s.sub(c).multiplyScalar(1-r).sub(c.multiplyScalar(n));if(l.lengthSq()<=1e-4){e.prevTipPos.copy(e.currTipPos);return}e.prevTipPos.copy(e.currTipPos).sub(l);let u=e.currTipPos.distanceTo(o),d=l.length(),f=Math.max(d-u,0);f>0&&e.currTipPos.addScaledVector(l,f/d)}function xm(e){if(!e.limit.active)return!1;let t=Math.fround,n=e.vector,r=$(e.basisUp.clone()),i=$(e.basisSide.clone()),a=$(e.basisForward.clone());$(n);let o=t(r.dot(n)),s=$(r.multiplyScalar(o)),c=$(n.clone().sub(s)),l=t(c.length()),u=l<=Jp?c.set(0,0,0):c.set(t(c.x/l),t(c.y/l),t(c.z/l)),d=t(i.dot(u)),f=t(Math.asin(d<-1?-1:Number.isNaN(d)?1:Math.min(d,1)))*t(180/Math.PI),p=t(f-f*t(e.springStrength)*t(e.deltaTime)*t(e.deltaTime)),m=p<=e.limit.max?p:e.limit.max,h=p<e.limit.min?e.limit.min:m,g=h>=0?e.limit.max:e.limit.min,_=0;if(g<-1e-4||g>1e-4){let e=t(h/g);e>=0&&(_=Math.min(e,1))}let v=t(g*_),y=t(g*_*t(Math.PI/180)),b=$(i.multiplyScalar(t(Math.sin(y))));return $(b.add($(a.multiplyScalar(t(Math.cos(y)))))),$(b.multiplyScalar(l)),$(n.copy(s).add(b)),v!==p}function Sm(e,t,n,r,i){let a=Math.fround,o=n.clone().multiply(r);Cm(o);let s=Wp(new W(a(a(t.x)-a(e.x)),a(a(t.y)-a(e.y)),a(a(t.z)-a(e.z))),o.invert());if(s.lengthSq()<=Jp*Jp)return r.clone();wm(s);let c=Tm(i,s);return r.clone().multiply(c)}function $(e){return e.set(Math.fround(e.x),Math.fround(e.y),Math.fround(e.z))}function Cm(e){return e.set(Math.fround(e.x),Math.fround(e.y),Math.fround(e.z),Math.fround(e.w))}function wm(e){$(e);let t=Math.fround(e.length());return t>1e-5?e.set(Math.fround(e.x/t),Math.fround(e.y/t),Math.fround(e.z/t)):e.set(0,0,0)}function Tm(e,t){let n=Math.fround,r=Om(e.clone()),i=Om(t.clone()),a=Dm(r,i);if(r.lengthSq()===0||i.lengthSq()===0||a>1-1e-6)return new U;let o=Array(9);if(a<-1+1e-6){let e=new W(0,r.z,-r.y);Dm(e,e)<1e-6&&e.set(-r.z,0,r.x);let t=n(1/n(Math.sqrt(Dm(e,e))));$(e.multiplyScalar(t));let i=Em(e,r),a=r.toArray(),s=e.toArray(),c=i.toArray();for(let e=0;e<3;e++)for(let t=0;t<3;t++)o[e*3+t]=n(n(n(c[t]*c[e])-n(a[t]*a[e]))-n(s[t]*s[e]))}else{let e=Em(r,i),t=n(n(1-a)/Dm(e,e)),s=n(e.x*t),c=n(e.y*t),l=n(e.z*t),u=n(e.y*s),d=n(e.z*s),f=n(e.y*l);o[0]=n(a+n(e.x*s)),o[1]=n(e.z+u),o[2]=n(d-e.y),o[3]=n(u-e.z),o[4]=n(a+n(c*e.y)),o[5]=n(e.x+f),o[6]=n(e.y+d),o[7]=n(f-e.x),o[8]=n(a+n(e.z*l))}let s=[0,0,0,0],c=n(n(o[0]+o[4])+o[8]);if(c>0){let e=n(Math.sqrt(n(c+1))),t=n(.5/e);s[3]=n(e*.5),s[0]=n(n(o[5]-o[7])*t),s[1]=n(n(o[6]-o[2])*t),s[2]=n(n(o[1]-o[3])*t)}else{let e=+(o[4]>o[0]);o[8]>o[e*4]&&(e=2);let t=(e+1)%3,r=(t+1)%3,i=n(Math.sqrt(n(n(n(o[e*4]-o[t*4])-o[r*4])+1))),a=n(.5/i);s[e]=n(i*.5),s[3]=n(n(o[t*3+r]-o[r*3+t])*a),s[t]=n(n(o[e*3+t]+o[t*3+e])*a),s[r]=n(n(o[e*3+r]+o[r*3+e])*a)}let l=n(Math.sqrt(n(n(n(n(s[0]*s[0])+n(s[1]*s[1]))+n(s[2]*s[2]))+n(s[3]*s[3]))));return new U(n(s[0]/l),n(s[1]/l),n(s[2]/l),n(s[3]/l))}function Em(e,t){let n=Math.fround;return new W(n(n(e.y*t.z)-n(e.z*t.y)),n(n(e.z*t.x)-n(e.x*t.z)),n(n(e.x*t.y)-n(e.y*t.x)))}function Dm(e,t){let n=Math.fround;return n(n(n(e.x*t.x)+n(e.y*t.y))+n(e.z*t.z))}function Om(e){let t=Math.fround;e.set(t(e.x),t(e.y),t(e.z));let n=t(Math.sqrt(Dm(e,e)));return n>=Math.fround(1e-5)?e.set(t(e.x/n),t(e.y/n),t(e.z/n)):e.set(0,0,0)}function km(e){return{status:qp.NoCollision,tailPosition:e.clone(),hitNormal:new W(0,0,0)}}function Am(e){return[...e].sort((e,t)=>jm(e)-jm(t))}function jm(e){return e.kind===`capsule`||e.kind===`capsuleLocal`?0:e.kind===`sphere`?1:2}function Mm(e,t){return e.lengthSq()<=Jp*Jp&&e.copy(t),e.lengthSq()<=Jp*Jp&&e.copy(Xp),e.normalize()}function Nm(e,t){let n=t.elements,r=e.x,i=e.y,a=e.z;return e.set(n[0]*r+n[4]*i+n[8]*a,n[1]*r+n[5]*i+n[9]*a,n[2]*r+n[6]*i+n[10]*a),Mm(e,Xp)}function Pm(e,t){return t===0?e.x:t===1?e.y:e.z}function Fm(e,t,n){t===0?e.x=n:t===1?e.y=n:e.z=n}var Im=1401298464324817e-60,Lm=Ip(`right`),Rm=Ip(`left`),zm=Ip(`back`),Bm=Ip(`down`),Vm=class e{bones;managerBatches;missingNodes;skinnedBones;setupDiagnostics;externalForce=new W(0,0,0);parentRotation=new U;headPosition=new W;localRotation=new U;colliderLocalToWorld=new q;colliderWorldToLocal=new q;frameColliderCache=new Map;angleVector=new W;debugAnimatedTip=new W;providerForce=new W;providerRotation=new U;providerWorldToLocal=new q;waveAxis=new W;providerRight=new W;providerUp=new W;mainWindDirection=new W;localBonePosition=new W;additionalDirection=new W;traceFilters=[];traceMaxEvents=240;traceSequence=0;updateManagerPathId=null;traceEvents=[];constructor(e,t,n,r,i){this.bones=e,this.managerBatches=t,this.missingNodes=n,this.skinnedBones=r,this.setupDiagnostics=i}static fromPjskRuntimeExtension(t,n){let r=Lh(t);if(!r)return null;n.updateMatrixWorld(!0);let i=sh(n),a=ih(r),o=ph(n),s=[],c=yh(r),l=Jm(r,i,s,c),u=hh(r),d=gh(r),f=_h(r,l),p=mh(r),m=Xm(r),h=Ym(r,c,m),g=new Map,_=new Map,v=new Map,y=new Map;n.traverse(e=>y.set(e,y.size));let b=new Map;for(let e of p.values())b.set(e,lh(i,e.nodePath,e.runtimePartIndex));let x=(r.managers??[]).filter(e=>bh(e.nodePath??e.poseRoot,c)).map(e=>({source:e,node:lh(i,e.nodePath,e.runtimePartIndex),nodes:[]})).sort((e,t)=>(y.get(e.node)??0)-(y.get(t.node)??0));for(let e of x){let t=e.source,n=Wm(i,t,v),o=e.node?[...b].filter(([n,r])=>r?hg(r,e.node):n.pathId!==void 0&&t.bonePathIds?.includes(n.pathId)).sort((e,t)=>(y.get(e[1])??1/0)-(y.get(t[1])??1/0)).map(([e])=>e):(t.bonePathIds??[]).map(e=>p.get(e));for(let p of o){if(!p||!bh(p.nodePath,c))continue;let o=p.pathId;if(!Qm(p,m)){h.rejectedUnverifiedBoneSourceCount+=1;continue}let v=b.get(p);if(!v){s.push(p.nodePath??p.nodeName??`bone:${o}`);continue}e.nodes.push(v),_.set(v,p);let y=eh(p,v,a,i),x=lh(i,p.pivotNodePath,p.runtimePartIndex),S=$m(r,t,p,o===void 0?void 0:u.get(o),o===void 0?void 0:d.get(o),t.pathId===void 0?void 0:f.get(t.pathId),l),C=Um(t,p,v,y,x,xh(i,p),n,S);C&&g.set(v,C)}}let S=[...g.values()];S.sort((e,t)=>mg(e.node)-mg(t.node));let C=x.map(e=>{let t=[...new Set(e.nodes)].map(e=>g.get(e)).sort((e,t)=>mg(e.node)-mg(t.node));return{source:e.source,bones:t,animatedBones:new Set(t.filter(t=>Ph(_.get(t.node),t.node,e.source))),gravity:Yh(e.source.rawGravity),forceProviders:Wm(i,e.source,v),slowMotionScale:ag(e.source.slowMotionScale)??1,isPaused:e.source.isPaused===!0}});return S.length>0?new e(S,C,s,o,h):null}getControlledTrackNodeNames(){return new Set(this.bones.map(e=>e.node.name).filter(Boolean))}setTraceBoneFilters(e,t=240){this.traceFilters=e.map(e=>e.trim().toLowerCase()).filter(Boolean),this.traceMaxEvents=Math.max(1,Math.trunc(t)||240),this.traceSequence=0,this.traceEvents.length=0}getTraceSnapshot(){return{filters:[...this.traceFilters],eventCount:this.traceEvents.length,events:this.traceEvents.map(e=>({...e,collisionChecks:e.collisionChecks.map(e=>({...e}))}))}}setSimulationControl(e){for(let t of this.managerBatches)t.slowMotionScale=ig(e.slowMotionScale,1),t.isPaused=e.paused??!1;for(let t of this.bones)t.stiffnessForce=ig(e.stiffnessForce,t.originalStiffnessForce),t.dragForce=ig(e.dragForce,t.originalDragForce),t.windInfluence=ig(e.windInfluence,t.originalWindInfluence),t.slowMotionScale=ig(e.slowMotionScale,1),t.isPaused=e.paused??!1}clearSimulationControl(){this.setSimulationControl({})}update(e){let t=this.collectWindVolumeOneSelfProviders(),n=new Set(t.filter(e=>e.isActive&&e.springManagerPathId!==null).map(e=>e.springManagerPathId)),r=new Set(t.filter(e=>!e.isActive&&e.springManagerPathId!==null).map(e=>e.springManagerPathId));for(let t of this.managerBatches){let i=t.source;if(i.enabled===!1||i.automaticUpdates===!1)continue;this.updateManagerPathId=ag(i.pathId),t.isPaused||this.preUpdateColliders(t.bones);let a=this.updateManagerPathId!==null&&r.has(this.updateManagerPathId)?!0:i.isSumOfForcesOnBone!==!1;for(let r of t.bones){if(!r.enabled)continue;Lp(r.node.parent,this.parentRotation),zp(r.node,this.headPosition);let o=t.animatedBones.has(r)?V.clamp(ag(i.dynamicRatio)??.5,0,1):1;if(t.isPaused){r.skinAnimationLocalRotation.copy(r.node.quaternion),this.applyBoneRotation(r,o);continue}!a||this.updateManagerPathId!==null&&n.has(this.updateManagerPathId)||(this.computeExternalForce(r,e,t),this.updateBoneSpringAndRotation(r,Ih(e,ag(i.simulationFrameRate)??60,t.slowMotionScale),this.externalForce,o))}}for(let n of t)n.isActive&&this.updateWindVolumeOneSelfLateUpdate(n,e)}collectWindVolumeOneSelfProviders(){let e=new Set;for(let t of this.managerBatches)for(let n of t.forceProviders)n.kind===`WindVolumeOneSelf`&&e.add(n);return[...e]}updateWindVolumeOneSelfLateUpdate(e,t){if(e.springManagerPathId===null)return;let n=e.simulationFrameRate>0?1/e.simulationFrameRate:t,r=this.managerBatches.find(t=>t.source.pathId===e.springManagerPathId);if(r&&r.source.enabled!==!1&&r.source.automaticUpdates!==!1&&!r.isPaused){this.updateManagerPathId=e.springManagerPathId,this.preUpdateColliders(r.bones);for(let i of r.bones)i.enabled&&(this.computeWindVolumeOneSelfForce(e,i,t),this.externalForce.copy(r.gravity).add(this.providerForce),this.updateBoneSpringAndRotation(i,n,this.externalForce,r.animatedBones.has(i)?e.dynamicRatio:1))}}computeExternalForce(e,t,n){this.externalForce.copy(n.gravity);for(let r of n.forceProviders)this.externalForce.add(this.computeForceProvider(r,e,t));return this.externalForce}computeForceProvider(e,t,n){return e.kind===`ForceVolume`?(e.node.updateMatrixWorld(!0),Lp(e.node,this.providerRotation),this.providerForce.set(0,0,1).applyQuaternion(this.providerRotation).multiplyScalar(e.strength)):e.kind===`WindVolume`?this.computeWindVolume(e,t):this.computeWindVolumeOneSelfForce(e,t,n)}computeWindVolume(e,t){let n=e.weight*e.strength;if(n<=Im||e.period<=.001)return this.providerForce.set(0,0,0);e.node.updateMatrixWorld(!0),Lp(e.node,this.providerRotation),t.node.getWorldPosition(this.localBonePosition).applyMatrix4(this.providerWorldToLocal.copy(e.node.matrixWorld).invert());let r=-this.localBonePosition.x,i=Math.sin(e.timeFactor+Math.sin(r*e.positionalMultiplier)+Math.cos(this.localBonePosition.z*e.positionalMultiplier));return this.providerForce.set(0,0,1).applyQuaternion(this.providerRotation).addScaledVector(e.offsetVector,i).normalize().multiplyScalar(n*t.windInfluence)}computeWindVolumeOneSelfForce(e,t,n){let r=e.weight*e.strength;if(r<=Im||e.period<=Im)return this.providerForce.set(0,0,0);e.currentTime=rg(e.currentTime,n,e.period);let i=e.currentTime*Math.PI*2/e.period;if(e.node.updateMatrixWorld(!0),Lp(e.node,this.providerRotation),this.waveAxis.set(0,1,0).applyQuaternion(this.providerRotation),Math.abs(e.spinPeriod)>.001){e.spinTime=rg(e.spinTime,n,e.spinPeriod);let t=e.spinTime*Math.PI*2/e.spinPeriod;this.providerRight.copy(Lm).applyQuaternion(this.providerRotation),this.providerUp.set(0,1,0).applyQuaternion(this.providerRotation),this.waveAxis.copy(this.providerRight).multiplyScalar(Math.cos(t)).addScaledVector(this.providerUp,Math.sin(t))}let a=Math.max(e.peakDistance,Im);t.node.getWorldPosition(this.localBonePosition).applyMatrix4(this.providerWorldToLocal.copy(e.node.matrixWorld).invert());let o=Math.PI*2/a,s=-this.localBonePosition.x,c=Math.sin(i+Math.sin(o*s)+Math.cos(o*this.localBonePosition.z));return this.mainWindDirection.set(0,0,1).applyQuaternion(this.providerRotation).addScaledVector(this.waveAxis,e.amplitude*c).normalize(),this.additionalDirection.set(-Math.cos(V.degToRad(e.additionalWindAngle)),0,-Math.sin(V.degToRad(e.additionalWindAngle))).normalize(),this.providerForce.copy(this.mainWindDirection).multiplyScalar(r).addScaledVector(this.additionalDirection,e.additionalWindStrength).multiplyScalar(t.windInfluence)}settleCurrentPose(e=60,t=1/60){let n=Math.max(0,Math.floor(e));for(let e=0;e<n;e+=1)this.update(t)}resetPose(){for(let e of this.bones)e.node.quaternion.copy(e.initialLocalRotation),e.skinAnimationLocalRotation.copy(e.initialLocalRotation),e.node.scale.copy(e.initialLocalScale),e.node.updateMatrix(),e.node.updateMatrixWorld(!0)}resetStateToCurrentPose(){for(let e of this.bones)Lp(e.node.parent,this.parentRotation),zp(e.node,this.headPosition),e.skinAnimationLocalRotation.copy(e.node.quaternion),this.debugAnimatedTip.copy(Qp({headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,springLength:e.springLength})),e.state.currTipPos.copy(this.debugAnimatedTip),e.state.prevTipPos.copy(this.debugAnimatedTip),e.state.cachedPosition.copy(this.headPosition),e.state.cachedMovement.set(0,0,0),e.state.hitNormal.set(0,0,0)}getSnapshot(e=!0,t={}){let n=new Set,r=[],i=[],a=0,o=0,s=0,c=0;for(let e of this.bones){for(let t of e.colliders)n.add(t);Lp(e.node.parent,this.parentRotation),zp(e.node,this.headPosition),this.debugAnimatedTip.copy(Qp({headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,springLength:e.springLength}));let t=this.debugAnimatedTip.distanceTo(e.state.currTipPos),l=e.node.name.toLowerCase(),u=e.state.currTipPos.clone().sub(this.debugAnimatedTip),d=e.state.currTipPos.clone().sub(e.state.prevTipPos),f=this.skinnedBones.has(e.node);l.includes(`sleeve`)&&(a=Math.max(a,t)),l.includes(`skirt`)&&(o=Math.max(o,t)),f?s+=1:c+=1,r.push({name:e.node.name,path:sg(e.node),springName:e.springName,sourceBoneName:e.sourceBoneName,sourceBonePath:e.sourceBonePath,sourceBonePathId:e.sourceBonePathId,resolvedIsSkinnedBone:f,pivotSourceName:e.pivotSourceName,pivotSourcePath:e.pivotSourcePath,pivotResolvedPath:e.pivotResolvedPath,tailBinding:Kh(e.tailBinding),offset:t,colliderCount:e.colliders.length,lastCollisionStatus:e.lastCollisionStatus,lastCollisionColliderName:e.lastCollisionInfo?.name??null,lastCollisionColliderPath:e.lastCollisionInfo?.path??null,lastCollisionColliderKind:e.lastCollisionInfo?.kind??null,lastCollisionColliderSourcePathId:e.lastCollisionInfo?.sourcePathId??null,lastAngleLimitApplied:e.lastAngleLimitApplied,hasSpringForce:e.springForce.lengthSq()>1e-8,forceProviderCount:e.forceProviders.length,stiffnessForce:e.stiffnessForce,managerDynamicRatio:e.dynamicRatio,dynamicRatio:Nh(e),isAnimated:e.isAnimated,automaticUpdates:e.automaticUpdates,boneEnabled:e.enabled,bonePaused:e.isPaused,isSumOfForcesOnBone:e.isSumOfForcesOnBone,simulationFrameRate:e.simulationFrameRate,slowMotionScale:e.slowMotionScale,updateSkipReason:Bh(e),animatedTipDelta:Rh(u),velocity:Rh(d),springForce:Rh(e.springForce),colliderBindings:e.colliderBindingDiagnostics.map(Oh)}),l.includes(`skirt`)&&i.push({name:e.node.name,path:sg(e.node),springName:e.springName,sourceBoneName:e.sourceBoneName,sourceBonePath:e.sourceBonePath,sourceBonePathId:e.sourceBonePathId,resolvedIsSkinnedBone:f,pivotSourceName:e.pivotSourceName,pivotSourcePath:e.pivotSourcePath,pivotResolvedPath:e.pivotResolvedPath,tailBinding:Kh(e.tailBinding),offset:t,appliedRotationDegrees:V.radToDeg(e.skinAnimationLocalRotation.clone().normalize().angleTo(e.node.quaternion.clone().normalize())),colliderCount:e.colliders.length,lastCollisionStatus:e.lastCollisionStatus,lastCollisionColliderName:e.lastCollisionInfo?.name??null,lastCollisionColliderPath:e.lastCollisionInfo?.path??null,lastCollisionColliderKind:e.lastCollisionInfo?.kind??null,lastCollisionColliderSourcePathId:e.lastCollisionInfo?.sourcePathId??null,lastCollisionHitNormal:e.lastCollisionInfo?Rh(e.lastCollisionInfo.hitNormal):null,lastAngleLimitApplied:e.lastAngleLimitApplied,hasSpringForce:e.springForce.lengthSq()>1e-8,forceProviderCount:e.forceProviders.length,stiffnessForce:e.stiffnessForce,dragForce:e.dragForce,managerDynamicRatio:e.dynamicRatio,dynamicRatio:Nh(e),isAnimated:e.isAnimated,automaticUpdates:e.automaticUpdates,boneEnabled:e.enabled,bonePaused:e.isPaused,isSumOfForcesOnBone:e.isSumOfForcesOnBone,simulationFrameRate:e.simulationFrameRate,slowMotionScale:e.slowMotionScale,updateSkipReason:Bh(e),animatedTipDelta:Rh(u),velocity:Rh(d),headMovement:Rh(e.state.cachedMovement),gravity:Rh(e.gravity),springForce:Rh(e.springForce),colliderBindings:e.colliderBindingDiagnostics.map(Oh)})}r.sort((e,t)=>t.offset-e.offset),i.sort((e,t)=>t.offset-e.offset);let l=zh(r,t),u=Hm(this.bones,this.skinnedBones);return{runtimeMode:`unity-prefab`,enabled:e,springCount:this.managerBatches.length,boneCount:this.bones.length,colliderCount:n.size,missingNodeCount:this.missingNodes.length,missingNodeSamples:this.missingNodes.slice(0,96),setupDiagnostics:{...this.setupDiagnostics,activeRoots:[...this.setupDiagnostics.activeRoots]},maxSleeveOffset:a,maxSkirtOffset:o,topOffsets:r.slice(0,8),debugOffsets:l,controlledPartCounts:u.counts,controlledHairSamples:u.hairSamples,skirtOffsets:i,bindingDiagnostics:this.bones.flatMap(e=>e.colliderBindingDiagnostics).map(Oh),skinnedBoneMatches:s,skinnedBoneMisses:c}}updateBoneSpringAndRotation(e,t,n,r){Lp(e.node.parent,this.parentRotation),zp(e.node,this.headPosition);let i=this.shouldTraceBone(e)?this.createTraceEvent(e,t,n,r):null;this.advanceBoneSpring(e,t,n,i),this.applyLengthLimits(e,t),i&&(i.stateAfterLengthLimits=Uh(e.state));let a=Math.abs(e.radius)*fg(e.node);i&&(i.tailRadius=a);let o=this.checkBoneGround(e,a,i);this.checkBoneCollisions(e,a,o,i),this.applyBoneAngleLimitsWithTrace(e,t,i),this.resetInvalidTipPosition(e),this.applyBoneRotation(e,r),i&&(i.finalLocalRotation=Hh(e.node.quaternion),this.pushTraceEvent(i))}advanceBoneSpring(e,t,n,r){e.skinAnimationLocalRotation.copy(e.node.quaternion),r&&(r.skinAnimationLocalRotation=Hh(e.skinAnimationLocalRotation)),em(e.state,this.headPosition),r&&(r.stateAfterCache=Uh(e.state)),$p(e.state,{headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,lengthFallbackDirection:e.boneAxis.clone().applyQuaternion(Lp(e.node,new U)),springLength:e.springLength,stiffnessForce:e.stiffnessForce,dragForce:e.dragForce,springForce:e.springForce,externalForce:n,deltaTime:t}),r&&(r.stateAfterUpdateSpring=Uh(e.state))}checkBoneGround(e,t,n){let r=e.collideWithGround?am(e.state,{headPosition:this.headPosition,springLength:e.springLength,tailRadius:t,groundHeight:e.groundHeight,lengthFallbackDirection:e.boneAxis.clone().applyQuaternion(Lp(e.node,new U)),bounce:e.bounce,friction:e.friction}):!1;return n&&(n.groundHit=r,n.stateAfterGround=Uh(e.state)),r}checkBoneCollisions(e,t,n,r){e.lastCollisionInfo=null;let i=[],a=e.enableCollision?this.buildWorldColliders(e.colliders):[];e.lastCollisionStatus=!n&&e.enableCollision?rm(e.state,{headPosition:this.headPosition,springLength:e.springLength,tailRadius:t,colliders:a,bounce:e.bounce,friction:e.friction,onColliderCheck:r?(e,t)=>i.push(Gh(e,t)):void 0,onCollision:(t,n)=>{e.lastCollisionInfo={kind:t.kind,name:t.debugName??null,path:t.debugPath??null,sourcePathId:t.debugSourcePathId??null,hitNormal:n.hitNormal.clone()}}}):0,r&&(r.collisionChecks=i,r.collisionStatus=e.lastCollisionStatus,r.stateAfterCollisions=Uh(e.state))}applyBoneAngleLimitsWithTrace(e,t,n){let r=n?Wh(e):void 0;e.lastAngleLimitApplied=e.enableAngleLimits?this.applyAngleLimits(e,t,r):!1,n&&r&&(n.angleLimit=r,n.stateAfterAngleLimits=Uh(e.state))}applyLengthLimits(e,t){if(!e.enableLengthLimits||e.lengthLimitTargets.length===0)return;let n=e.lengthLimitTargets.map(e=>({position:zp(e.node,new W),initialLength:e.initialLength}));nm({currTipPos:e.state.currTipPos,springConstant:e.springConstant,deltaTime:t,targets:n})}applyAngleLimits(e,t,n){if(!e.yAngleLimit&&!e.zAngleLimit)return!1;let r=e.pivotNode??e.node.parent??e.node;r.updateMatrixWorld(!0),this.angleVector.copy(e.state.currTipPos).sub(e.state.cachedPosition),this.angleVector.set(Math.fround(this.angleVector.x),Math.fround(this.angleVector.y),Math.fround(this.angleVector.z));let i=Up(r,Rm.clone()),a=Up(r,zm.clone()),o=Up(r,Bm.clone());n&&(n.enabled=!0,n.hasPivot=!0,n.pivotName=r.name||null,n.pivotPath=sg(r)||null,n.vectorBefore=Rh(this.angleVector),n.forward=Rh(i),n.back=Rh(a),n.down=Rh(o));let s=!1;if(e.yAngleLimit){let r=xm({basisSide:o,basisUp:a,basisForward:i,springStrength:e.angularStiffness,deltaTime:t,limit:e.yAngleLimit,vector:this.angleVector});n&&(n.yApplied=r,n.afterY=Rh(this.angleVector)),s=r||s}if(e.zAngleLimit){let r=xm({basisSide:a,basisUp:o,basisForward:i,springStrength:e.angularStiffness,deltaTime:t,limit:e.zAngleLimit,vector:this.angleVector});n&&(n.zApplied=r,n.afterZ=Rh(this.angleVector)),s=r||s}return e.state.currTipPos.copy(e.state.cachedPosition).add(this.angleVector),e.state.currTipPos.set(Math.fround(e.state.currTipPos.x),Math.fround(e.state.currTipPos.y),Math.fround(e.state.currTipPos.z)),n&&(n.vectorAfter=Rh(this.angleVector)),s}applyBoneRotation(e,t=e.dynamicRatio){this.resetInvalidTipPosition(e),this.localRotation.copy(Sm(this.headPosition,e.state.currTipPos,this.parentRotation,e.initialLocalRotation,e.boneAxis)),e.node.quaternion.copy(Mp(Gp(e.skinAnimationLocalRotation,this.localRotation,t))),e.node.updateMatrix(),e.node.updateMatrixWorld(!0)}resetInvalidTipPosition(e){Number.isFinite(e.state.currTipPos.x)&&Number.isFinite(e.state.currTipPos.y)&&Number.isFinite(e.state.currTipPos.z)||(this.debugAnimatedTip.copy(Qp({headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,springLength:e.springLength})),e.state.currTipPos.copy(this.debugAnimatedTip),e.state.prevTipPos.copy(this.debugAnimatedTip))}shouldTraceBone(e){if(this.traceFilters.length===0)return!1;let t=e.node.name.toLowerCase(),n=sg(e.node).toLowerCase(),r=e.springName.toLowerCase();return this.traceFilters.some(e=>t.includes(e)||n.includes(e)||r.includes(e))}createTraceEvent(e,t,n,r){return{sequence:this.traceSequence,springName:e.springName,boneName:e.node.name,bonePath:sg(e.node),sourceBoneName:e.sourceBoneName,sourceBonePath:e.sourceBonePath,sourceBonePathId:e.sourceBonePathId,pivotSourceName:e.pivotSourceName,pivotSourcePath:e.pivotSourcePath,pivotResolvedPath:e.pivotResolvedPath,tailBinding:Kh(e.tailBinding),managerPathId:e.managerPathId,updateManagerPathId:this.updateManagerPathId,deltaTime:t,dynamicRatio:r,automaticUpdates:e.automaticUpdates,enabled:e.enabled,enableCollision:e.enableCollision,enableAngleLimits:e.enableAngleLimits,enableLengthLimits:e.enableLengthLimits,colliderCount:e.colliders.length,forceProviderCount:e.forceProviders.length,headPosition:Rh(this.headPosition),parentRotation:Hh(this.parentRotation),initialLocalRotation:Hh(e.initialLocalRotation),skinAnimationLocalRotation:Hh(e.skinAnimationLocalRotation),boneAxis:Rh(e.boneAxis),boneAxisSource:e.boneAxisSource,springLength:e.springLength,radius:e.radius,tailRadius:0,stiffnessForce:e.stiffnessForce,dragForce:e.dragForce,springForce:Rh(e.springForce),gravity:Rh(e.gravity),externalForce:Rh(n),stateBefore:Uh(e.state),stateAfterCache:Uh(e.state),animatedTip:Rh(Qp({headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,springLength:e.springLength})),stateAfterUpdateSpring:Uh(e.state),stateAfterLengthLimits:Uh(e.state),groundHit:!1,stateAfterGround:Uh(e.state),collisionStatus:0,collisionChecks:[],stateAfterCollisions:Uh(e.state),angleLimit:Wh(e),stateAfterAngleLimits:Uh(e.state),finalLocalRotation:Hh(e.node.quaternion)}}pushTraceEvent(e){for(this.traceSequence+=1,this.traceEvents.push({...e});this.traceEvents.length>this.traceMaxEvents;)this.traceEvents.shift()}buildWorldColliders(e){let t=[];for(let n of e){let e=this.frameColliderCache.get(n)??this.createWorldCollider(n);e&&t.push(e)}return t}preUpdateColliders(e=this.bones){this.frameColliderCache.clear();let t=new Set;for(let n of e)for(let e of n.colliders)t.add(e);let n=[...t].sort((e,t)=>ug(e.source)-ug(t.source));for(let e of n){let t=this.createWorldCollider(e);t&&this.frameColliderCache.set(e,t)}}createWorldCollider(e){let t=e.source.shape,n=e.source.enabled!==!1,r=n&&e.source.linkedRendererEnabled!==!1;return t?.sphere?(e.node.updateMatrixWorld(!0),this.colliderLocalToWorld.copy(e.node.matrixWorld),this.colliderWorldToLocal.copy(e.node.matrixWorld).invert(),{kind:`sphere`,enabled:n,debugName:e.source.nodeName??e.source.scriptName??e.node.name,debugPath:e.source.nodePath??sg(e.node),debugSourcePathId:e.source.pathId,localOffset:Yh(t.sphere.offset),radius:Math.max(0,t.sphere.radius??.01),localToWorldMatrix:this.colliderLocalToWorld.clone(),worldToLocalMatrix:this.colliderWorldToLocal.clone(),worldToLocalRadiusScale:pg(this.colliderWorldToLocal),localToWorldNormalMatrix:new q().makeRotationFromQuaternion(Lp(e.node,new U)),lossyScaleX:dg(e.node)}):t?.capsule?(e.node.updateMatrixWorld(!0),this.colliderLocalToWorld.copy(e.node.matrixWorld),this.colliderWorldToLocal.copy(e.node.matrixWorld).invert(),{kind:`capsuleLocal`,enabled:r,debugName:e.source.nodeName??e.source.scriptName??e.node.name,debugPath:e.source.nodePath??sg(e.node),debugSourcePathId:e.source.pathId,localStart:Yh(t.capsule.offset),localEnd:Yh(t.capsule.tail),radius:Math.max(0,t.capsule.radius??.01),localToWorldMatrix:this.colliderLocalToWorld.clone(),worldToLocalMatrix:this.colliderWorldToLocal.clone(),worldToLocalRadiusScale:pg(this.colliderWorldToLocal),localToWorldNormalMatrix:new q().makeRotationFromQuaternion(Lp(e.node,new U)),lossyScaleX:dg(e.node)}):t?.panel?(e.node.updateMatrixWorld(!0),this.colliderLocalToWorld.copy(e.node.matrixWorld),this.colliderWorldToLocal.copy(e.node.matrixWorld).invert(),{kind:`panel`,enabled:r,debugName:e.source.nodeName??e.source.scriptName??e.node.name,debugPath:e.source.nodePath??sg(e.node),debugSourcePathId:e.source.pathId,width:Math.max(0,t.panel.width??0),height:Math.max(0,t.panel.height??0),localToWorldMatrix:this.colliderLocalToWorld.clone(),worldToLocalMatrix:this.colliderWorldToLocal.clone(),worldToLocalRadiusScale:pg(this.colliderWorldToLocal),worldToLocalLengthScale:pg(this.colliderWorldToLocal),localToWorldNormalMatrix:new q().makeRotationFromQuaternion(Lp(e.node,new U))}):null}};function Hm(e,t){let n=new Map,r=[];for(let i of e){let e=qh(i.sourceBonePath),a=`${i.runtimePartIndex??`null`}|${i.runtimePartType??`null`}|${e??`null`}`,o=n.get(a);o||(o={runtimePartIndex:i.runtimePartIndex,runtimePartType:i.runtimePartType,sourceRoot:e,count:0,sampleNames:[],samplePaths:[]},n.set(a,o)),o.count+=1,o.sampleNames.length<6&&(o.sampleNames.push(i.node.name),o.samplePaths.push(sg(i.node))),r.length<12&&(i.runtimePartType===`hair`||i.node.name.toLowerCase().includes(`hair`)||(i.sourceBonePath??``).toLowerCase().includes(`hair`))&&r.push({name:i.node.name,path:sg(i.node),sourceBonePath:i.sourceBonePath,runtimePartIndex:i.runtimePartIndex,runtimePartType:i.runtimePartType,resolvedIsSkinnedBone:t.has(i.node)})}return{counts:[...n.values()].sort((e,t)=>(e.runtimePartIndex??-1)-(t.runtimePartIndex??-1)||String(e.runtimePartType??``).localeCompare(String(t.runtimePartType??``))||String(e.sourceRoot??``).localeCompare(String(t.sourceRoot??``))),hairSamples:r}}function Um(e,t,n,r,i,a,o,s){let c=r.tailPosition,l=zp(n,new W),u=c.clone().sub(l);u.set(Math.fround(u.x),Math.fround(u.y),Math.fround(u.z));let d=Math.fround(u.length()),f=n.quaternion.clone(),p=Xh(n,c),m=V.clamp(ag(e.dynamicRatio)??.5,0,1),h=a.map(e=>({node:e.node,initialLength:zp(e.node,new W).distanceTo(c)})),g=t.rawStiffnessForce??300,_=t.rawDragForce??t.dragForce??.4,v=Math.max(0,t.rawWindInfluence??1),y=ag(e.slowMotionScale)??1,b=e.isPaused===!0;return{managerPathId:ag(e.pathId),runtimePartIndex:ag(t.runtimePartIndex)??ag(e.runtimePartIndex),runtimePartType:t.runtimePartType??e.runtimePartType??t.partKind??e.partKind??null,springName:`${e.partKind??t.partKind??`Part`}:${e.nodeName??e.pathId??`manager`}`,sourceBoneName:t.nodeName??null,sourceBonePath:t.nodePath??null,sourceBonePathId:ag(t.pathId),pivotSourceName:t.pivotNodeName??null,pivotSourcePath:t.pivotNodePath??null,pivotResolvedPath:i?sg(i):null,tailBinding:r,automaticUpdates:e.automaticUpdates!==!1,enabled:t.enabled!==!1,enableLengthLimits:e.enableLengthLimits!==!1,enableAngleLimits:e.enableAngleLimits!==!1,enableCollision:e.enableCollision!==!1,collideWithGround:e.collideWithGround===!0,groundHeight:e.groundHeight??0,isSumOfForcesOnBone:e.isSumOfForcesOnBone!==!1,isPaused:b,gravity:Yh(e.rawGravity),forceProviders:o,node:n,state:Zp(l,c),initialLocalRotation:f,initialLocalScale:n.scale.clone(),skinAnimationLocalRotation:f.clone(),boneAxis:p.axis,boneAxisSource:p.source,springLength:d,dynamicRatio:m,isAnimated:Ph(t,n,e),simulationFrameRate:ag(e.simulationFrameRate)??60,slowMotionScale:y,bounce:ag(e.bounce)??0,friction:ag(e.friction)??1,radius:Math.max(0,t.hitRadius??.05),stiffnessForce:g,dragForce:_,windInfluence:v,originalStiffnessForce:g,originalDragForce:_,originalWindInfluence:v,springForce:Yh(t.rawSpringForce),springConstant:t.rawSpringConstant??.5,lengthLimitTargets:h,angularStiffness:Math.max(0,t.rawAngularStiffness??100),pivotNode:i,yAngleLimit:Mh(t.rawAngleLimits?.y),zAngleLimit:Mh(t.rawAngleLimits?.z),colliders:s.colliders,colliderBindingDiagnostics:s.diagnostics,lastCollisionStatus:0,lastCollisionInfo:null,lastAngleLimitApplied:!1}}function Wm(e,t,n){return(t.forceProviders??[]).map(t=>{let r=Gm(t),i=r?n.get(r):void 0;if(i)return i;let a=Km(e,t);return a&&r&&n.set(r,a),a}).filter(e=>!!e)}function Gm(e){let t=typeof e.runtimePartIndex==`number`?`${e.runtimePartIndex}:`:``;return typeof e.sourcePathId==`number`?`${t}path:${e.sourcePathId}`:e.nodePath?`${t}nodePath:${e.nodePath}`:null}function Km(e,t){let n=t.scriptName??``,r=n.endsWith(`WindVolumeOneSelf`),i=n.endsWith(`WindVolume`)&&!r,a=n.endsWith(`ForceVolume`)&&!i;if(!a&&!i&&!r)return null;let o=lh(e,t.nodePath,t.runtimePartIndex)??qm(e,t.nodeName),s=t.raw??{};if(!o||!eg(s,`m_Enabled`,!0)||t.activeSelf===!1||t.activeInHierarchy===!1)return null;let c={sourcePathId:ag(t.sourcePathId),node:o,springManagerPathId:ag(t.springManagerPathId)??tg(s,`<SpringManager>k__BackingField`)??tg(s,`_SpringManager_k__BackingField`)??tg(s,`springManager`)};return a?{kind:`ForceVolume`,...c,strength:Qh(s,`strength`,0)}:i?{kind:`WindVolume`,...c,weight:Qh(s,`weight`,0),strength:Qh(s,`strength`,0),period:Qh(s,`period`,0),positionalMultiplier:Qh(s,`positionalMultiplier`,0),timeFactor:Qh(s,`timeFactor`,0),offsetVector:$h(s,`offsetVector`)}:{kind:`WindVolumeOneSelf`,...c,isActive:eg(s,`isActive`,!1),dynamicRatio:V.clamp(Qh(s,`dynamicRatio`,.5),0,1),simulationFrameRate:Math.max(0,Qh(s,`simulationFrameRate`,60)),weight:Qh(s,`weight`,0),strength:Qh(s,`strength`,0),period:Qh(s,`period`,0),currentTime:Qh(s,`currentTime`,0),spinPeriod:Qh(s,`spinPeriod`,0),spinTime:Qh(s,`spinTime`,0),amplitude:Qh(s,`amplitude`,0),peakDistance:Qh(s,`peakDistance`,0),additionalWindAngle:Qh(s,`additionalWindAngle`,0),additionalWindStrength:Qh(s,`additionalWindStrength`,0)}}function qm(e,t){if(!t)return null;let n=[...new Set(e.nodeByPath.values())].filter(e=>e.name===t);return n.length===1?n[0]:null}function Jm(e,t,n,r){let i=new Map;for(let a of e.colliders??[]){if(typeof a.index!=`number`||!bh(a.nodePath,r))continue;let e=lh(t,a.nodePath,a.runtimePartIndex);if(!e){n.push(a.nodePath??a.nodeName??`collider:${a.index}`);continue}i.set(a.index,{source:a,node:e})}return i}function Ym(e,t,n){return{managerCount:e.managers?.length??0,boneSourceCount:e.bones?.length??0,colliderSourceCount:e.colliders?.length??0,bindingDecisionCount:e.bindingDecisions?.length??0,managerColliderCacheCount:e.managerColliderCaches?.length??0,officialSpringComponentCount:n.pathIds.size,rejectedUnverifiedBoneSourceCount:0,activeRootCount:t.size,activeRoots:[...t].sort((e,t)=>e.localeCompare(t))}}function Xm(e){let t=new Set,n=new Set,r=!1;for(let i of e.prefabGraphs??[]){Array.isArray(i.monoBehaviours)&&(r=!0);for(let e of i.monoBehaviours??[])Zm(e.scriptName)&&(typeof e.pathId==`number`&&t.add(e.pathId),e.transformPath&&n.add(dh(e.runtimePartIndex??-1,e.transformPath)))}return{hasComponentMetadata:r,pathIds:t,partPaths:n}}function Zm(e){let t=e?.trim().toLowerCase();return t===`springbone`||t===`sekaispringbone`}function Qm(e,t){return!t.hasComponentMetadata||typeof e.pathId==`number`&&t.pathIds.has(e.pathId)?!0:!!(e.nodePath&&t.partPaths.has(dh(e.runtimePartIndex??-1,e.nodePath)))}function $m(e,t,n,r,i,a,o){if(!r&&!i)return{colliders:[],diagnostics:a?[Dh(t,n,r,i,null,null,null,`no per-bone collider binding; manager cache not used as fallback; ${jh(a)}`,[])]:[]};let s=i?.sourceKind??r?.sourceKind??`direct`,c=Sh(i?.candidateRoots??r?.collidersByRoot,o);if(s===`colliderFlag`&&c.size>0){let o=wh(c,a),s=Th(e,t,n,i,r,o),l=s.root?o.get(s.root)??[]:[];return{colliders:l,diagnostics:[Dh(t,n,r,i,c,i?.defaultRoot??r?.defaultRoot,s.root,`${s.reason}; manager cache constrained; ${jh(a)}`,l)]}}let l=kh((i?.selectedColliderIndexes??r?.colliders??[]).map(e=>o.get(e)).filter(e=>!!e),t,n);return{colliders:l,diagnostics:[Dh(t,n,r,i,null,i?.defaultRoot??r?.defaultRoot,null,`${i?.selectedColliderIndexes?`bindingDecision.selectedColliderIndexes`:r?.colliders?`colliderBinding.colliders`:`no direct collider indexes`} / direct serialized collider references / pose root preference; ${jh(a)}`,l)]}}function eh(e,t,n,r){t.updateMatrixWorld(!0);let i=zp(t,new W),a=Up(t,Ip(`right`)),o=Math.fround,s=new W(o(i.x-o(a.x*o(.1))),o(i.y-o(a.y*o(.1))),o(i.z-o(a.z*o(.1)))),c=e.nodePath?uh(n,e.nodePath,e.runtimePartIndex):void 0,l=c?nh(c,n,r,e.runtimePartIndex):[],u=l.map(e=>e.source.name??e.node.name),d=l.map(e=>e.source.transformPath??sg(e.node));if(l.length===0)return{mode:`fallback`,childCount:0,childNames:u,childPaths:d,childSources:[],tailPosition:s};if(l.length===1)return{mode:`singleChild`,childCount:1,childNames:u,childPaths:d,childSources:l.map(e=>e.source),tailPosition:zp(l[0].node,new W)};let f=new W,p=0;for(let e of l){let t=zp(e.node,new W);f.add(t),f.set(o(f.x),o(f.y),o(f.z));let n=t.clone().sub(i);n.set(o(n.x),o(n.y),o(n.z)),p=o(p+o(n.length()))}f.set(o(f.x/l.length),o(f.y/l.length),o(f.z/l.length)),p=o(p/l.length);let m=th(i,f,p);return{mode:`averageChildren`,childCount:l.length,childNames:u,childPaths:d,childSources:l.map(e=>e.source),tailPosition:m}}function th(e,t,n){let r=Math.fround,i=t.clone().sub(e);if(i.set(r(i.x),r(i.y),r(i.z)),i.lengthSq()<=1e-5*1e-5)i.copy(Lm);else{let e=r(i.length());i.set(r(i.x/e),r(i.y/e),r(i.z/e))}return new W(r(e.x+r(i.x*r(n))),r(e.y+r(i.y*r(n))),r(e.z+r(i.z*r(n))))}function nh(e,t,n,r){let i=[];for(let a of e.childPathIds??[]){let e=t.transformByPathId.get(a);if(!e||!rh(e,t))continue;let o=lh(n,e.transformPath,r??e.runtimePartIndex);o&&i.push({source:e,node:o})}return i}function rh(e,t){return typeof e.pathId==`number`&&t.pivotTransformPathIds.has(e.pathId)?!1:!e.transformPath||!t.pivotTransformPaths.has(e.transformPath)}function ih(e){let t=new Map,n=new Map,r=new Map,i=new Set,a=new Set;return ah(e,t,n,r),oh(e,n,i,a),{transformByPathId:t,transformByPath:n,transformByPartPath:r,pivotTransformPathIds:i,pivotTransformPaths:a}}function ah(e,t,n,r){for(let i of e.prefabGraphs??[])for(let e of i.transforms??[])typeof e.pathId==`number`&&t.set(e.pathId,e),e.transformPath&&(n.set(e.transformPath,e),typeof e.runtimePartIndex==`number`&&r.set(dh(e.runtimePartIndex,e.transformPath),e))}function oh(e,t,n,r){for(let i of e.prefabGraphs??[])for(let e of i.monoBehaviours??[]){if(e.scriptName?.toLowerCase()!==`springbonepivot`||!e.transformPath)continue;r.add(e.transformPath);let i=t.get(e.transformPath);typeof i?.pathId==`number`&&n.add(i.pathId)}}function sh(e){let t=new Map,n=new Map,r=new Map;return e.traverse(i=>{let a=sg(i,e);if(!a)return;t.set(a,i);let o=cg(i,e);o&&o!==a&&r.set(o,i);let s=fh(i),c=i.userData.pjskTransformPath;for(let e of typeof c==`string`&&c.length>0?[c]:[])typeof s==`number`&&n.set(dh(s,e),i),t.has(e)||t.set(e,i)}),{nodeByPath:t,nodeByPartPath:n,canonicalNodeByPath:r}}function ch(e,t){return t?e.nodeByPath.get(t)??e.canonicalNodeByPath.get(t)??null:null}function lh(e,t,n){if(!t)return null;if(typeof n==`number`){let r=e.nodeByPartPath.get(dh(n,t));if(r)return r}return ch(e,t)}function uh(e,t,n){return typeof n==`number`?e.transformByPartPath.get(dh(n,t))??e.transformByPath.get(t):e.transformByPath.get(t)}function dh(e,t){return`${e}:${t}`}function fh(e){let t=e.userData.pjskRuntimePartIndex;return typeof t==`number`?t:void 0}function ph(e){let t=new Set;return e.traverse(e=>{let n=e;if(n.isSkinnedMesh)for(let e of n.skeleton.bones)t.add(e)}),t}function mh(e){let t=new Map;for(let n of e.bones??[])typeof n.pathId==`number`&&t.set(n.pathId,n);return t}function hh(e){let t=new Map;for(let n of e.colliderBindings??[])typeof n.sourceSpringBonePathId==`number`&&t.set(n.sourceSpringBonePathId,n);return t}function gh(e){let t=new Map;for(let n of e.bindingDecisions??[])typeof n.sourceSpringBonePathId==`number`&&t.set(n.sourceSpringBonePathId,n);return t}function _h(e,t){let n=new Map;for(let r of e.managerColliderCaches??[]){if(typeof r.managerPathId!=`number`)continue;let e=new Set;for(let n of[...r.sphereColliderIndexes??[],...r.capsuleColliderIndexes??[],...r.panelColliderIndexes??[]]){let i=typeof n==`number`?t.get(n):void 0;typeof n==`number`&&i&&vh(r,i)&&e.add(n)}n.set(r.managerPathId,{source:r,colliderIndexes:e})}return n}function vh(e,t){let n=e.managerNodePath??``,r=t.source.nodePath??``,i=t.source.shape;return n.endsWith(`/Position/PositionOffset/Hip`)?i?.sphere?/\/(?:Left_Thigh|Right_Thigh)\/CL_/.test(r)||/\/Hip\/CL_HipSphereCollider$/.test(r):!1:!0}function yh(e){return new Set((e.activeRootProfile?.activeRoots??[]).map(e=>Jh(e)).filter(e=>!!e))}function bh(e,t){if(t.size===0)return!0;let n=Jh(qh(e));return n!==null&&t.has(n)}function xh(e,t){let n=[];for(let r of t.lengthLimitTargets??[]){let i=lh(e,r.nodePath,r.runtimePartIndex??t.runtimePartIndex);i&&n.push({node:i,initialLength:0})}return n}function Sh(e,t){let n=new Map;for(let[r,i]of Object.entries(e??{})){let e=i.map(e=>t.get(e)).filter(e=>!!e);e.length>0&&n.set(r,e)}return n}function Ch(e,t){return!t||t.colliderIndexes.size===0?e:e.filter(e=>typeof e.source.index==`number`&&t.colliderIndexes.has(e.source.index))}function wh(e,t){let n=new Map;for(let[r,i]of e.entries()){let e=Ch(i,t);e.length>0&&n.set(r,e)}return n}function Th(e,t,n,r,i,a){if(a.size===1)return{root:a.keys().next().value,reason:`single manager-cache root`};let o=Jh(qh(n.nodePath));if(o&&a.has(o))return{root:o,reason:`joint root matched candidate root`};let s=Eh(e,t,o,a);if(s)return s;let c=Jh(r?.defaultRoot);if(c&&a.has(c))return{root:c,reason:`bindingDecision.defaultRoot`};for(let t of e.activeRootProfile?.activeRoots??[]){let e=Jh(t);if(e&&a.has(e))return{root:e,reason:`activeRootProfile active root`}}let l=Jh(i?.defaultRoot);return l&&a.has(l)?{root:l,reason:`binding.defaultRoot`}:{root:null,reason:l?`binding.defaultRoot ${l} not available after manager cache`:`no matching root`}}function Eh(e,t,n,r){if(t.partKind!==`Head`&&n!==`face`)return null;let i=Jh(e.rootSelectionProfile?.defaultBodyRoot??e.activeRootProfile?.defaultBodyRoot);return i&&r.has(i)?{root:i,reason:`head/face uses runtime defaultBodyRoot`}:r.has(`body`)?{root:`body`,reason:`head/face body fallback`}:null}function Dh(e,t,n,r,i,a,o,s,c){return{sourceKind:r?.sourceKind??n?.sourceKind??`direct`,colliderFlag:r?.colliderFlag??n?.colliderFlag??null,colliderGroupIndex:null,springName:`${e.partKind??t.partKind??`Part`}:${e.nodeName??e.pathId??`manager`}`,boneName:t.nodeName??null,bonePath:t.nodePath??null,sourceSpringBonePathId:ag(t.pathId),candidateRoots:i?[...i.entries()].map(([e,t])=>({root:e,colliderCount:t.length,colliderSourcePathIds:t.map(e=>e.source.pathId).filter(e=>typeof e==`number`)})):[],defaultRoot:Jh(a),selectedRoot:o,selectedColliderCount:c.length,selectedColliderSourcePathIds:c.map(e=>e.source.pathId).filter(e=>typeof e==`number`),selectionReason:s}}function Oh(e){return{...e,candidateRoots:e.candidateRoots.map(e=>({...e,colliderSourcePathIds:[...e.colliderSourcePathIds]})),selectedColliderSourcePathIds:[...e.selectedColliderSourcePathIds]}}function kh(e,t,n){let r=Ah(t,n);if(!r)return e;let i=new Map;for(let t of e){let e=t.source.nodeName??t.source.scriptName??``,n=i.get(e);n?n.push(t):i.set(e,[t])}return e.filter(e=>{let t=e.source.nodeName??e.source.scriptName??``,n=i.get(t);return!n||n.length<=1||!n.some(e=>e.source.nodePath?.startsWith(r))||e.source.nodePath?.startsWith(r)})}function Ah(e,t){return t.nodePath?.startsWith(`sit_body/`)?`sit_body/`:t.nodePath?.startsWith(`body/`)||e.partKind===`Head`||t.nodePath?.startsWith(`face/`)?`body/`:null}function jh(e){return e?`${e.source.managerNodeName??`manager`} manager cache (${e.source.sphereColliderIndexes?.length??0} sphere, ${e.source.capsuleColliderIndexes?.length??0} capsule, ${e.source.panelColliderIndexes?.length??0} panel)`:`no manager cache available`}function Mh(e){return e?.active?{active:!0,min:e.min??0,max:e.max??0}:null}function Nh(e){return e.isAnimated?e.dynamicRatio:1}function Ph(e,t,n){let r=Fh(n.animatedBoneNames);return r.size===0?!1:r.has(t.name)||typeof e.nodeName==`string`&&r.has(e.nodeName)}function Fh(e){return Array.isArray(e)?new Set(e.filter(e=>typeof e==`string`)):new Set}function Ih(e,t,n){let r=t>0?1/t:e;return n===1?r:r*n}function Lh(e){let t=og(e),n=og(t?.pjskSpringBone??t?.PjskSpringBone),r=og(n?.runtimeUnitySetup??n?.RuntimeUnitySetup),i=r?.version;return i===`0414`||i===414?r:null}function Rh(e){return{x:e.x,y:e.y,z:e.z,length:e.length()}}function zh(e,t){if(t.springDebugAllOffsets)return e;let n=(t.springDebugBones??[]).map(e=>e.trim().toLowerCase()).filter(Boolean);return n.length===0?[]:e.filter(e=>{let t=[e.name,e.path,e.springName,e.sourceBoneName,e.sourceBonePath,e.pivotSourceName,e.pivotSourcePath,e.pivotResolvedPath].filter(e=>typeof e==`string`).join(`
`).toLowerCase();return n.some(e=>t.includes(e))})}function Bh(e){return e.automaticUpdates?e.enabled?e.isPaused?`isPaused=true`:e.isSumOfForcesOnBone?null:`isSumOfForcesOnBone=false`:`enabled=false`:`automaticUpdates=false`}function Vh(e){return e?Rh(e):null}function Hh(e){return{x:e.x,y:e.y,z:e.z,w:e.w}}function Uh(e){return{currTipPos:Rh(e.currTipPos),prevTipPos:Rh(e.prevTipPos),hitNormal:Rh(e.hitNormal),cachedPosition:Rh(e.cachedPosition),cachedMovement:Rh(e.cachedMovement)}}function Wh(e){return{enabled:e.enableAngleLimits,hasPivot:!!e.pivotNode,pivotName:e.pivotNode?.name||null,pivotPath:e.pivotNode&&sg(e.pivotNode)||null,vectorBefore:null,forward:null,back:null,down:null,yApplied:!1,zApplied:!1,afterY:null,afterZ:null,vectorAfter:null}}function Gh(e,t){return{kind:e.kind,name:e.debugName??null,path:e.debugPath??null,sourcePathId:e.debugSourcePathId??null,enabled:e.enabled!==!1,status:t.status,beforeTailPosition:Rh(t.beforeTailPosition),afterTailPosition:Rh(t.afterTailPosition),hitNormal:Rh(t.hitNormal),localHeadPosition:Vh(t.details.localHeadPosition),localTailPositionBefore:Vh(t.details.localTailPositionBefore),localTailPositionAfter:Vh(t.details.localTailPositionAfter),localTailRadius:t.details.localTailRadius??null,localSphereOrigin:Vh(t.details.localSphereOrigin),localSphereRadius:t.details.localSphereRadius??null,localCapsuleStart:Vh(t.details.localCapsuleStart),localCapsuleEnd:Vh(t.details.localCapsuleEnd),capsuleRadius:t.details.capsuleRadius??null,panelWidth:t.details.panelWidth??null,panelHeight:t.details.panelHeight??null}}function Kh(e){return{mode:e.mode,childCount:e.childCount,childNames:[...e.childNames],childPaths:[...e.childPaths],tailPosition:Rh(e.tailPosition)}}function qh(e){if(!e)return null;let t=e.indexOf(`/`);return t<0?e:e.slice(0,t)}function Jh(e){return e?e.endsWith(`/`)?e.slice(0,-1):e:null}function Yh(e){return Pp(Array.isArray(e)?new W(e[0]??0,e[1]??0,e[2]??0):Ap(e,new W))}function Xh(e,t){e.updateMatrixWorld(!0);let n=Zh(Bp(e,t.clone()));return n?{axis:n,source:`computed-local-tip`}:{axis:Lm.clone(),source:`fallback-local-tip`}}function Zh(e){let t=Math.fround(e.length());return t<=1e-5?null:new W(Math.fround(e.x/t),Math.fround(e.y/t),Math.fround(e.z/t))}function Qh(e,t,n){return ag(e[t]??e[ng(t)])??n}function $h(e,t){let n=e[t]??e[ng(t)];return Array.isArray(n)||typeof n==`object`&&n?Yh(n):new W}function eg(e,t,n){let r=e[t]??e[ng(t)];return typeof r==`boolean`?r:typeof r==`number`?r!==0:n}function tg(e,t){let n=og(e[t]??e[ng(t)]);return ag(n?.m_PathID??n?.m_pathID??n?.pathId)}function ng(e){return e.length>0?e[0].toUpperCase()+e.slice(1):e}function rg(e,t,n){return n>0?V.euclideanModulo(e+t,n):e+t}function ig(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function ag(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function og(e){return e&&typeof e==`object`?e:null}function sg(e,t){let n=[],r=e;for(;r&&r!==t;)r.name&&!r.name.startsWith(`Loaded:`)&&n.unshift(r.name),r=r.parent;return n.join(`/`)}function cg(e,t){let n=[],r=e;for(;r&&r!==t;)r.name&&!r.name.startsWith(`Loaded:`)&&n.unshift(lg(r.name)),r=r.parent;return n.join(`/`)}function lg(e){return e.replace(/_([1-9]\d*)$/,``)}function ug(e){return e.shape?.sphere?0:e.shape?.capsule?1:2}function dg(e){return e.getWorldScale(new W).x}function fg(e){let t=e.matrixWorld.elements;return Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2])}function pg(e){let t=e.elements;return Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2])}function mg(e){let t=0,n=e;for(;n;)t+=1,n=n.parent;return t}function hg(e,t){for(let n=e;n;n=n.parent)if(n===t)return!0;return!1}var gg=Math.PI/180,_g=[`XYZ`,`XZY`,`YXZ`,`YZX`,`ZXY`,`ZYX`],vg=class e{entries;sourceUnityQuaternion=new U;sourceUnityEuler=new Cn;targetUnityEuler=new Cn;targetUnityQuaternion=new U;targetQuaternion=new U;constructor(e){this.entries=e}static fromPjskRuntimeExtension(t,n){let r=bg(t);if(!r.length)return null;n.updateMatrixWorld(!0);let i=wg(n),a=[];for(let e of r){let t=e.GameObject??e.gameObject??null,n=e.ReferenceBone??e.referenceBone??null,r=Dg(i,Ng(t?.TransformPath??t?.transformPath),Ng(t?.Name??t?.name)),o=Dg(i,Ng(n?.TransformPath??n?.transformPath),Ng(n?.Name??n?.name));if(!r||!o)continue;let s=_g[Mg(e.RotationOrder??e.rotationOrder,4)]??`ZXY`;a.push({node:r,referenceNode:o,coefficient:Mg(e.Coefficient??e.coefficient,1),defaultQuaternion:xg(e),axisX:Pg(e.AxisX??e.axisX,!0),axisY:Pg(e.AxisY??e.axisY,!0),axisZ:Pg(e.AxisZ??e.axisZ,!0),order:s})}return a.sort((e,t)=>kg(e.referenceNode)-kg(t.referenceNode)),a.length?new e(a):null}update(){for(let e of this.entries){this.sourceUnityQuaternion.set(e.referenceNode.quaternion.x,-e.referenceNode.quaternion.y,-e.referenceNode.quaternion.z,e.referenceNode.quaternion.w).normalize(),this.sourceUnityEuler.setFromQuaternion(this.sourceUnityQuaternion,`ZXY`),Sg(this.sourceUnityEuler);let t=e.coefficient>0?-1:+(e.coefficient<0);this.targetUnityEuler.set(0,0,0,e.order),e.axisX&&(this.targetUnityEuler.x=this.sourceUnityEuler.x*t),e.axisY&&(this.targetUnityEuler.y=this.sourceUnityEuler.y*t),e.axisZ&&(this.targetUnityEuler.z=this.sourceUnityEuler.z*t),this.targetUnityQuaternion.setFromEuler(this.targetUnityEuler).invert(),this.targetQuaternion.copy(Fp(this.targetUnityQuaternion)),yg(e.node.quaternion,e.defaultQuaternion,this.targetQuaternion,Math.abs(e.coefficient)),e.node.updateMatrix(),e.node.updateMatrixWorld(!0)}}getControlledTrackNodeNames(){return new Set(this.entries.map(e=>e.node.name).filter(Boolean))}};function yg(e,t,n,r){let i=V.clamp(r,0,1),a=t.dot(n)<0?-1:1;return e.set(V.lerp(t.x,n.x*a,i),V.lerp(t.y,n.y*a,i),V.lerp(t.z,n.z*a,i),V.lerp(t.w,n.w*a,i)).normalize()}function bg(e){let t=Ag(e),n=Ag(t?.pjskSpringBone??t?.PjskSpringBone),r=Ag(n?.raw??n?.Raw),i=[];for(let e of[r?.body??r?.Body,r?.head??r?.Head]){let t=Ag(e),n=t?.extraBones??t?.ExtraBones;Array.isArray(n)&&i.push(...n.filter(jg))}return i}function xg(e){let t=Ag(e.DefaultEulerAngles??e.defaultEulerAngles)??{},n=Mg(t.X??t.x,0),r=Mg(t.Y??t.y,0),i=Mg(t.Z??t.z,0);return Fp(new U().setFromEuler(new Cn(n*gg,r*gg,i*gg,`ZXY`)))}function Sg(e){return e.x=Cg(e.x),e.y=Cg(e.y),e.z=Cg(e.z),e}function Cg(e){let t=Math.PI*2;return(e%t+t)%t}function wg(e){let t=new Map,n=new Map;return e.traverse(r=>{if(r!==e){let e=n.get(r.name)??[];e.push(r),n.set(r.name,e)}for(let n of Tg(e,r))t.set(n,r)}),{nodeByPath:t,nodeByName:n}}function Tg(e,t){let n=Eg(t,e);if(!n)return[];let r=[n];return n.startsWith(`body/`)&&r.push(`sit_body/${n.slice(5)}`),r}function Eg(e,t){let n=[],r=e;for(;r&&r!==t;)r.name&&!r.name.startsWith(`Loaded:`)&&n.unshift(r.name),r=r.parent;return n.join(`/`)}function Dg(e,t,n){for(let n of Og(t)){let t=e.nodeByPath.get(n);if(t)return t}return n?e.nodeByName.get(n)?.[0]??null:null}function Og(e){if(!e)return[];let t=[e];return e.startsWith(`sit_body/`)&&t.push(`body/${e.slice(9)}`),t}function kg(e){let t=0,n=e.parent;for(;n;)t+=1,n=n.parent;return t}function Ag(e){return e&&typeof e==`object`?e:null}function jg(e){return!!Ag(e)}function Mg(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function Ng(e){return typeof e==`string`?e:null}function Pg(e,t){return typeof e==`boolean`?e:typeof e==`number`?e!==0:t}function Fg(e){let t=String(e.roleId??``).trim();if(!/^\d+(?::[A-Za-z0-9_/-]+)?$/.test(t))throw Error(`roleId must be '<characterId>:<unit>' or '<characterId>'.`);let n=t=>{let n=e[t];if(!Number.isInteger(n)||Number(n)<=0)throw Error(`${t} must be a positive integer.`);return Number(n)},r=e.headPackagePath,i=r==null?null:String(r).trim();if(i!==null&&(i.length===0||i.length>1024||i.includes(`\0`)))throw Error(`headPackagePath must be null or a non-empty string of at most 1024 characters without NUL bytes.`);let a=e.headOptionalCostume3dId==null?null:n(`headOptionalCostume3dId`);return{roleId:t,bodyCostume3dId:n(`bodyCostume3dId`),headCostume3dId:n(`headCostume3dId`),headPackagePath:i,hairCostume3dId:n(`hairCostume3dId`),headOptionalCostume3dId:a}}var Ig=new W(.04835,.48222,.07241),Lg=new W(-.08532,.12848,1.93551),Rg=35,zg=.46,Bg=2.74,Vg=-.0245,Hg=.765,Ug={zoomDuration:.35,bottomLowerLimitPosition:.4,bottomUpperLimitPosition:.85,topLowerLimitPosition:1.25,topUpperLimitPosition:.85,nearZ:2.3,farZ:4.5,fov:25};function Wg(e){let t=Ig.clone().multiplyScalar(e);return{target:t,position:t.clone().add(Lg.clone().multiplyScalar(e)),fov:Rg,costumeShopState:null}}function Gg(e,t=0,n=1.6){let r=Number.isFinite(t)?t:0;if(e===`legacy-cloud`){let e=new W(0,zg,0),t=new W(0,0,Bg).applyAxisAngle(new W(0,1,0),V.degToRad(r));return{target:e,position:e.clone().add(t),fov:Ug.fov,costumeShopState:null}}let i=e===`official-default`?{cameraRootYawDegrees:r,zoomValue:0,zoomMoveValue:1}:{cameraRootYawDegrees:r,zoomValue:Ug.zoomDuration,zoomMoveValue:0},a=V.clamp(i.zoomValue,0,Ug.zoomDuration),o=Ug.zoomDuration>0?a/Ug.zoomDuration:0,s=V.lerp(Ug.bottomLowerLimitPosition,Ug.bottomUpperLimitPosition,o),c=V.lerp(Ug.topLowerLimitPosition,Ug.topUpperLimitPosition,o),l=V.clamp(i.zoomMoveValue,0,1),u=e===`full-body`?Hg:V.lerp(s,c,l),d=V.lerp(Ug.nearZ,Ug.farZ,o),f=V.degToRad(i.cameraRootYawDegrees),p=new W(0,u,d);return{target:new W(0,u,0),position:p.clone().applyAxisAngle(new W(0,1,0),f),fov:Ug.fov,costumeShopState:{cameraRootYawDegrees:i.cameraRootYawDegrees,zoomValue:a,zoomMoveValue:l,zoomRatio:o,localCameraPosition:p,localCameraRotationYDegrees:180}}}function Kg(e,t,n,r){let i=t.clone().sub(e).normalize(),a=new W().crossVectors(i,new W(0,1,0)).normalize().multiplyScalar(Vg*n*r);return{target:t.clone().add(a),position:e.clone().add(a)}}var qg={minZoom:.5,maxZoom:3,minHeightOffset:-.5,maxHeightOffset:.8},Jg={zoom:1,heightOffset:0};function Yg(e){let t=qg,n=Number.isFinite(e.zoom)?e.zoom:Jg.zoom,r=Number.isFinite(e.heightOffset)?e.heightOffset:Jg.heightOffset;return{zoom:V.clamp(n,t.minZoom,t.maxZoom),heightOffset:V.clamp(r,t.minHeightOffset,t.maxHeightOffset)}}function Xg(e,t){let{zoom:n,heightOffset:r}=Yg(t),i=e.target.clone();i.y+=r;let a=e.position.clone().sub(e.target).divideScalar(n);return{target:i,position:i.clone().add(a)}}function Zg(e,t,n=`light`){let r=new Bi($g(e,t,n===`dark`));return r.colorSpace=nt,r}function Qg(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function $g(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t;let i=r.getContext(`2d`);if(!i)return r;let a=i.createLinearGradient(0,t,e,0);a.addColorStop(0,n?`#141c26`:`#f9fffe`),a.addColorStop(.52,n?`#1b2433`:`#edfaff`),a.addColorStop(1,n?`#241e30`:`#fff8fe`),i.fillStyle=a,i.fillRect(0,0,e,t);let o=i.createLinearGradient(0,0,e,t);o.addColorStop(0,n?`rgba(103, 73, 125, 0.08)`:`rgba(255, 246, 252, 0.34)`),o.addColorStop(1,n?`rgba(51, 110, 139, 0.10)`:`rgba(219, 246, 255, 0.40)`),i.fillStyle=o,i.fillRect(0,0,e,t),i.fillStyle=n?`rgba(0, 0, 0, 0.10)`:`rgba(255, 255, 255, 0.48)`,i.fillRect(0,0,e,t);let s=Qg(e*73856093^t*19349663),c=[[166,236,255],[214,206,255],[255,204,238],[255,237,182]],l=e/Math.max(t,1),u=Math.min(.12,Math.max(0,(l-1)*.08)),d=(e,t,n,r,a,o)=>{i.save(),i.translate(e,t),i.rotate(n),i.beginPath();for(let e=0;e<3;e+=1){let t=-Math.PI/2+e*Math.PI*2/3,n=Math.cos(t)*r*.56,a=Math.sin(t)*r*.56;e===0?i.moveTo(n,a):i.lineTo(n,a)}i.closePath(),i.fillStyle=`rgba(${a[0]}, ${a[1]}, ${a[2]}, ${o})`,i.fill(),i.restore()},f=(r,i)=>{for(let a=0;a<r;a+=1){let r=s(),a,o;if(r<.78){let n=s();n<.26?(a=(-.04+s()*.22)*e,o=s()*t):n<.5?(a=(.82-u+s()*(.21+u))*e,o=s()*t):n<.78?(a=s()*e,o=(-.04+s()*(.24+u*.5))*t):(a=s()*e,o=(.8-u*.8+s()*(.23+u*.8))*t)}else a=(.12+s()*.76)*e,o=(.12+s()*.76)*t;let l=(a-e*.5)/e*2,f=(o-t*.5)/t*2,p=Math.max(.28,l*l+f*f),m=i*(.72+s()*.46)*p,h=(.08+s()*.13)*Math.min(1.25,p+.25)*(n?.35:1);d(a,o,s()*Math.PI*2,m,c[Math.floor(s()*c.length)],h)}},p=Math.min(e,t)/1e3;return f(Math.max(8,Math.round(18*p)),150*p),f(Math.max(24,Math.round(80*p)),72*p),r}var e_=[`Left_Toe`,`Right_Toe`],t_=.015,n_=.01,r_={width:.72,height:1.06,opacity:.28,crossSize:.46,crossOpacity:.22,floorY:0,adjustShadow:!1,adjustAlpha:!0,invisibleHeight:.2,directionalShadow:!1},i_=class{group=new Vn;defaultDirection=new W(0,0,1);settings={...r_};pairs=[];constructor(){let e=c_(),t=o_(),n=a_();for(let r of e_){let i=this.createShadowMaterial(e,this.settings.opacity),a=this.createShadowMaterial(e,this.settings.crossOpacity),o=new Vn,s=new Vn,c=new mi(t.clone(),i);c.name=`CharacterDirectionalShadow_${r}`,c.renderOrder=-100,c.scale.set(this.settings.width,1,this.settings.height),o.add(c);let l=new mi(n.clone(),a);l.name=`CharacterCrossShadow_${r}`,l.renderOrder=-99,l.scale.set(this.settings.crossSize,1,this.settings.crossSize),s.add(l),o.visible=this.settings.directionalShadow,s.visible=!this.settings.directionalShadow,this.group.add(o,s),this.pairs.push({targetWorldPosition:new W,initialToeHeight:null,directionalAnchor:o,crossAnchor:s,directionalMaterial:i,crossMaterial:a,directionalAlpha:this.settings.opacity})}t.dispose(),n.dispose(),this.group.name=`CharacterProjectedShadow`,this.group.visible=!1}setSettings(e={}){this.settings=l_(e,this.settings);for(let e of this.pairs)e.directionalAnchor.children[0]?.scale.set(this.settings.width,1,this.settings.height),e.crossAnchor.children[0]?.scale.set(this.settings.crossSize,1,this.settings.crossSize),e.directionalAnchor.visible=this.settings.directionalShadow,e.crossAnchor.visible=!this.settings.directionalShadow}update(e){let t=e.targetWorldPositions;if(this.group.visible=e.visible&&t.some(e=>e!==null),!this.group.visible){for(let e of this.pairs)e.initialToeHeight=null,e.targetWorldPosition.set(0,0,0);return}for(let[n,r]of this.pairs.entries()){let i=t[n];if(!i){r.directionalAnchor.visible=!1,r.crossAnchor.visible=!1,r.initialToeHeight=null,r.targetWorldPosition.set(0,0,0);continue}r.targetWorldPosition.copy(i),r.initialToeHeight??=i.y,r.directionalAnchor.visible=this.settings.directionalShadow,r.crossAnchor.visible=!this.settings.directionalShadow;let a=this.resolveDirection(i,e.lightWorldPosition),o=(i.y-this.settings.floorY)/Math.max(.001,e.characterModelScale),s=this.settings.height*o,c=i.x+a.x*s,l=i.z+a.z*s;r.directionalAnchor.position.set(this.settings.adjustShadow?i.x:c,this.settings.floorY+n_,this.settings.adjustShadow?i.z:l),r.directionalAnchor.rotation.y=Math.atan2(a.x,a.z),r.directionalAlpha=this.calculateDirectionalAlpha(r,i.y),r.directionalMaterial.opacity=r.directionalAlpha;let u=(i.y-this.settings.floorY)/this.settings.invisibleHeight,d=u<0?1:1-Math.min(u,1);r.crossAnchor.position.set(i.x,this.settings.floorY+t_,i.z),r.crossMaterial.opacity=this.settings.crossOpacity*d}}getDebugSnapshot(e){let t=this.pairs[0];t.directionalAnchor.updateMatrixWorld(!0),t.crossAnchor.updateMatrixWorld(!0);let n=new W(0,0,1).applyQuaternion(t.directionalAnchor.getWorldQuaternion(new U)).normalize(),r=this.pairs.reduce((e,t)=>e.add(t.targetWorldPosition),new W).multiplyScalar(1/Math.max(this.pairs.length,1));return{visible:this.group.visible,floorY:Number(this.settings.floorY.toFixed(4)),characterModelScale:Number(e.toFixed(4)),settings:{...this.settings},targetPosition:u_(r),targetPositions:this.pairs.map(e=>u_(e.targetWorldPosition)),directional:{position:u_(t.directionalAnchor.position),forward:u_(n),scale:u_(new W(this.settings.width,1,this.settings.height)),opacity:Number(t.directionalMaterial.opacity.toFixed(4)),alpha:Number(t.directionalAlpha.toFixed(4))},cross:{position:u_(t.crossAnchor.position),scale:u_(new W(this.settings.crossSize,1,this.settings.crossSize)),opacity:Number(t.crossMaterial.opacity.toFixed(4))},pairs:this.pairs.map(e=>({targetPosition:u_(e.targetWorldPosition),directionalOpacity:Number(e.directionalMaterial.opacity.toFixed(4)),crossOpacity:Number(e.crossMaterial.opacity.toFixed(4))}))}}dispose(){let e=new Set;this.group.traverse(t=>{let n=t;if(!n.isMesh)return;n.geometry.dispose();let r=Array.isArray(n.material)?n.material:[n.material];for(let t of r){let n=t.map;n&&e.add(n),t.dispose()}});for(let t of e)t.dispose()}createShadowMaterial(e,t){return new ni({color:`#000000`,map:e,transparent:!0,opacity:t,depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-1,side:2})}calculateDirectionalAlpha(e,t){if(!this.settings.adjustAlpha)return this.settings.opacity;let n=(t-(e.initialToeHeight??this.settings.floorY))/this.settings.invisibleHeight,r=n<0?1:1-Math.min(n,1);return this.settings.opacity*r}resolveDirection(e,t){if(!t)return this.defaultDirection.clone();let n=new W(e.x-t.x,0,e.z-t.z);return n.lengthSq()<1e-6?new W:n.normalize()}};function a_(){return s_([-.5,0,.5,.5,0,.5,-.5,0,-.5,.5,0,-.5])}function o_(){return s_([-.5,0,1,.5,0,1,-.5,0,0,.5,0,0])}function s_(e){let t=new Wr;return t.setAttribute(`position`,new Mr(e,3)),t.setAttribute(`uv`,new Mr([0,1,1,1,0,0,1,0],2)),t.setIndex([0,1,2,1,3,2]),t.computeVertexNormals(),t}function c_(e=128){let t=document.createElement(`canvas`);t.width=e,t.height=e;let n=t.getContext(`2d`);if(!n)throw Error(`Canvas 2D context is required for projected shadow texture.`);let r=n.createRadialGradient(e*.5,e*.5,e*.05,e*.5,e*.5,e*.5);r.addColorStop(0,`rgba(0, 0, 0, 0.72)`),r.addColorStop(.45,`rgba(0, 0, 0, 0.32)`),r.addColorStop(1,`rgba(0, 0, 0, 0.0)`),n.fillStyle=r,n.fillRect(0,0,e,e);let i=new Bi(t);return i.colorSpace=``,i.wrapS=m,i.wrapT=m,i.needsUpdate=!0,i}function l_(e,t){let n=(e,t,n=0)=>Number.isFinite(e)?Math.max(e,n):t,r=(e,t)=>Number.isFinite(e)?V.clamp(e,0,1):t;return{width:n(e.width,t.width,.001),height:n(e.height,t.height,.001),opacity:r(e.opacity,t.opacity),crossSize:n(e.crossSize,t.crossSize,.001),crossOpacity:r(e.crossOpacity,t.crossOpacity),floorY:Number.isFinite(e.floorY)?e.floorY:t.floorY,adjustShadow:e.adjustShadow??t.adjustShadow,adjustAlpha:e.adjustAlpha??t.adjustAlpha,invisibleHeight:n(e.invisibleHeight,t.invisibleHeight,.001),directionalShadow:e.directionalShadow??t.directionalShadow}}function u_(e){return{x:Number(e.x.toFixed(5)),y:Number(e.y.toFixed(5)),z:Number(e.z.toFixed(5))}}function d_(e){let t=new Map;return e.traverse(n=>{if(n===e||!n.name)return;let r=[],i=[],a=n;for(;a&&a!==e;)a.name&&(r.push(a.name),i.push(a.name.replace(/_\d+$/,``))),a=a.parent;r.reverse(),i.reverse();for(let e=0;e<r.length;e+=1){let a=r.slice(e).join(`/`);a&&t.set(a,n);let o=i.slice(e).join(`/`);o&&t.set(o,n)}}),t}var f_=new W,p_=new U,m_=new W,h_=new U,g_=new U,__=new W,v_=new W,y_=new W(0,1,0),b_=7,x_=class{graph;setup;constraints;constructor(e,t,n){this.graph=e,this.setup=t,e.root.updateMatrixWorld(!0);let r=Array.isArray(t.constraints)?t.constraints:[];this.constraints=r.map(t=>w_(e,t,n))}update(){this.graph.root.updateMatrixWorld(!0);let e=this.constraints.map(T_);return this.graph.root.updateMatrixWorld(!0),C_(this.setup,e)}};function S_(e,t,n){if(!t)return null;let r=Array.isArray(t.constraints)?t.constraints:[];e.root.updateMatrixWorld(!0);let i=r.map(t=>w_(e,t,n)).map(T_);return e.root.updateMatrixWorld(!0),C_(t,i)}function C_(e,t){let n=t.filter(e=>e.resolvedOwner&&e.sources.length>0&&e.sources.every(e=>e.resolvedSource)).length;return{version:e.version??null,sourceKind:e.sourceKind??null,constraintCount:t.length,resolvedCount:n,unresolvedCount:t.length-n,appliedCount:t.filter(e=>e.applied).length,warnings:Array.isArray(e.warnings)?e.warnings.filter(e=>typeof e==`string`):[],constraints:t}}function w_(e,t,n){let r=Z_(t.type)??`unknown`,i=Z_(t.ownerPath),a=Z_(t.ownerName),o=A_(e,i,a),s=A_(e,Z_(t.worldUpObjectPath),Z_(t.worldUpObjectName)).node,c=(Array.isArray(t.sources)?t.sources:[]).map(t=>D_(e,t,n));return{source:t,type:r,ownerPath:i,ownerName:a,owner:o,worldUpObject:s,sources:c,sourceDebug:c.map(e=>e.debug)}}function T_(e){let{source:t,type:n,ownerPath:r,ownerName:i,owner:a,worldUpObject:o,sources:s,sourceDebug:c}=e,l=(e,t)=>({type:n,status:e,reason:t,ownerPath:r,ownerName:i,resolvedOwner:!!a.node,applied:!1,sources:c});if(t.enabled===!1||t.active===!1)return l(`skipped`,`constraint component is disabled`);if(!a.node)return l(`unresolved`,a.reason);if(s.length===0)return l(`unresolved`,`constraint has no source transforms`);let u=s.find(e=>!e.node);if(u)return l(`unresolved`,u.debug.sourceName?`source transform ${u.debug.sourceName} was not uniquely resolved`:`constraint source transform was not resolved`);let d=s.filter(k_),f=a.node.position.clone(),p=a.node.quaternion.clone();if(n===`parent`)return j_(a.node,d)?(I_(a.node,t,f,p,!0,!0),E_(n,r,i,c,`parent constraint applied with height-scaled translation offsets`)):l(`skipped`,`parent constraint has no positive source weight`);if(n===`rotation`)return M_(a.node,d,t.rotationOffset)?(I_(a.node,t,f,p,!1,!0),E_(n,r,i,c,`rotation constraint applied with weighted source rotations`)):l(`skipped`,`rotation constraint has no positive source weight`);if(n===`aim`){let e=q_(t.aimVector,new W(0,0,1)),s=q_(t.upVector,new W(0,1,0)),u=P_(a.node,o,t.worldUpType,t.worldUpVector);return N_(a.node,d,e,s,u,t.rotationOffset)?(I_(a.node,t,f,p,!1,!0),E_(n,r,i,c,`aim constraint applied with exported aim/up vectors`)):l(`skipped`,`aim constraint target direction or source weight was invalid`)}return l(`skipped`,`unsupported constraint type ${n}`)}function E_(e,t,n,r,i){return{type:e,status:`applied`,reason:i,ownerPath:t,ownerName:n,resolvedOwner:!0,applied:!0,sources:r}}function D_(e,t,n){let r=Z_(t.sourcePath),i=Z_(t.sourceName),a=O_(e,r,i),o=Q_(t.weight)??1,s=G_(t.translationOffset,n),c=K_(t.rotationOffset);return{node:a.node,weight:o,translationOffset:s,rotationOffset:c,debug:{sourcePath:r,sourceName:i,weight:o,resolvedSource:!!a.node,translationOffset:s?{x:s.x,y:s.y,z:s.z}:null,rotationOffset:c?{x:c.x,y:c.y,z:c.z}:null}}}function O_(e,t,n){if(n){let t=null;if(e.root.traverse(e=>{!t&&e.name===n&&(t=e)}),t)return{node:t,reason:`rebound by transform name in the combined model`}}return A_(e,t,n)}function k_(e){return!!e.node}function A_(e,t,n){if(t){let n=e.nodeByPath.get(t);if(n)return{node:n,reason:`resolved by transform path`}}if(!n)return{node:null,reason:`constraint transform path and name are missing`};let r=[];for(let t of e.nodeByPath.values())t.name===n&&r.push(t);return r.length===1?{node:r[0],reason:`resolved by exact transform name`}:r.length>1?{node:null,reason:`transform name ${n} matched ${r.length} nodes`}:{node:null,reason:`transform name ${n} was not found`}}function j_(e,t){let n=t.reduce((e,t)=>e+Math.max(0,t.weight),0);if(n<=0)return!1;m_.set(0,0,0);let r=null,i=0;for(let e of t){let t=Math.max(0,e.weight);if(t<=0)continue;e.node.updateMatrixWorld(!0),e.node.getWorldPosition(f_),Lp(e.node,p_);let a=f_.clone().add((e.translationOffset??new W).clone().applyQuaternion(p_));m_.addScaledVector(a,t/n),r=U_(r,F_(p_,e.rotationOffset),i,t),i+=t}return r?(H_(e,m_,r),!0):!1}function M_(e,t,n){let r=W_(t);return r?(e.getWorldPosition(m_),H_(e,m_,F_(r,K_(n))),!0):!1}function N_(e,t,n,r,i,a){let o=t.reduce((e,t)=>e+Math.max(0,t.weight),0);if(o<=0)return!1;e.updateMatrixWorld(!0),e.getWorldPosition(m_),__.set(0,0,0);for(let e of t){let t=Math.max(0,e.weight);t<=0||(e.node.updateMatrixWorld(!0),e.node.getWorldPosition(f_),__.addScaledVector(f_,t/o))}if(__.sub(m_),__.lengthSq()<1e-6)return!1;__.normalize();let s=Y_(n,new W(0,0,1)),c=Y_(r,new W(0,1,0));if(h_.setFromUnitVectors(s,__),v_.copy(c).applyQuaternion(h_),i){let e=Y_(i,y_),t=X_(v_,__),n=X_(e,__);if(t.lengthSq()>1e-6&&n.lengthSq()>1e-6){t.normalize(),n.normalize();let e=Math.atan2(__.dot(new W().crossVectors(t,n)),V.clamp(t.dot(n),-1,1));h_.premultiply(new U().setFromAxisAngle(__,e))}}return H_(e,m_,F_(h_,K_(a))),!0}function P_(e,t,n,r){switch(Q_(n)??0){case 1:return t?(e.getWorldPosition(m_),t.getWorldPosition(f_),f_.clone().sub(m_)):y_.clone();case 2:return t?J_(t,q_(r,y_)):q_(r,y_);case 3:return q_(r,y_);case 4:return null;default:return y_.clone()}}function F_(e,t){return t?e.clone().multiply(V_(t)).normalize():e.clone()}function I_(e,t,n,r,i,a){let o=V.clamp(Q_(t.weight)??1,0,1),s=e.position.clone(),c=e.quaternion.clone(),l=G_(t.translationAtRest,1)??n,u=t.rotationAtRest?V_(B_(t.rotationAtRest)):r;L_(e,t,n,l,s,o,i),R_(e,t,r,u,c,o,a),e.updateMatrix(),e.updateMatrixWorld(!0)}function L_(e,t,n,r,i,a,o){if(!o){e.position.copy(n);return}let s=Q_(t.translationAxis)??b_,c=r.clone().lerp(i,a);e.position.set(z_(s,1)?c.x:r.x,z_(s,2)?c.y:r.y,z_(s,4)?c.z:r.z)}function R_(e,t,n,r,i,a,o){if(!o){e.quaternion.copy(n);return}let s=Q_(t.rotationAxis)??b_,c=new Cn().setFromQuaternion(r,`ZXY`),l=new Cn().setFromQuaternion(i,`ZXY`),u=new Cn(z_(s,1)?l.x:c.x,z_(s,2)?l.y:c.y,z_(s,4)?l.z:c.z,`ZXY`);e.quaternion.copy(r).slerp(new U().setFromEuler(u),a).normalize()}function z_(e,t){return(e&t)!==0}function B_(e){return Ap(e,new W)}function V_(e){return Fp(new U().setFromEuler(new Cn(V.degToRad(e.x),V.degToRad(e.y),V.degToRad(e.z),`ZXY`)))}function H_(e,t,n){let r=t.clone(),i=n.clone();e.parent&&(e.parent.updateMatrixWorld(!0),e.parent.worldToLocal(r),Lp(e.parent,g_),i.premultiply(g_.invert())),e.position.copy(r),e.quaternion.copy(i.normalize()),e.updateMatrix(),e.updateMatrixWorld(!0)}function U_(e,t,n,r){if(!e)return t.clone();let i=t.clone();return e.dot(i)<0&&i.set(-i.x,-i.y,-i.z,-i.w),e.slerp(i,r/(n+r)).normalize()}function W_(e){let t=null,n=0;for(let r of e){let e=Math.max(0,r.weight);e<=0||(r.node.updateMatrixWorld(!0),Lp(r.node,p_),t=U_(t,p_,n,e),n+=e)}return t}function G_(e,t){return!e||typeof e!=`object`?null:Np(Ap(e,new W)).multiplyScalar(t)}function K_(e){return!e||typeof e!=`object`?null:Ap(e,new W)}function q_(e,t){return!e||typeof e!=`object`?t.clone():Pp(Ap(e,t))}function J_(e,t){return e.updateMatrixWorld(!0),Lp(e,h_),t.clone().applyQuaternion(h_)}function Y_(e,t){return e.lengthSq()>1e-6?e.clone().normalize():t.clone().normalize()}function X_(e,t){return e.clone().addScaledVector(t,-e.dot(t))}function Z_(e){return typeof e==`string`?e:null}function Q_(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function $_(e,t){let n=V.clamp(t||1,.5,2),r=e.nodeByPath.get(`body/Position`);if(!r)throw Error(`Official CharacterModel PositionNote 'body/Position' was not found.`);return r.scale.setScalar(n),r.updateMatrix(),e.root.updateMatrixWorld(!0),r}function ev(e){return e&&typeof e==`object`?e:{}}function tv(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function nv(e){let t=ev(e),n=ev(t.pjskSpringBone??t.PjskSpringBone),r=ev(t.runtimeUnitySetup??t.RuntimeUnitySetup??n.runtimeUnitySetup??n.RuntimeUnitySetup),i=r.version;return i===`0414`||i===414?r:null}function rv(e){let t=ev(e),n=ev(t.nativeMeshes??t.NativeMeshes),r=n.version;return r===`0414`||r===414?n:null}function iv(e,t){for(let n of t){if(!n)continue;let t=e.get(n);if(t)return{path:n,node:t}}return null}function av(e){return e?.parentingMode===`model_combine_setup`}function ov(e,t){e.parent&&e.parent.remove(e),t.add(e),e.updateMatrix()}function sv(e,t){for(;e.children.length>0;)ov(e.children[0],t)}function cv(e,t,n){let r=[],i=new Set;for(let a of t){let t=e.get(a);t&&!i.has(t)&&(ov(t,n),i.add(t),r.push(a))}return r}function lv(e,t,n){e.parent&&e.parent.remove(e);let r=new Set;e.traverse(e=>{e.userData.pjskModelCombineDestroyed=!0,r.add(e)});for(let[e,n]of t.entries())r.has(n)&&t.delete(e);for(let[e,t]of n.entries())r.has(t)&&n.delete(e)}function uv(e,t,n){for(let[r,i]of e.entries())i===t&&e.set(r,n)}function dv(e,t,n,r,i){let a=r.childMoveSuffix??`_target`,o=r.parentRootPath,s=r.childRootPath,c=iv(t,[r.parentCombineNodeAPath??r.parentAttachPath]),l=iv(t,[r.parentCombineNodeBPath]),u=iv(t,[r.childCombineNodeAPath??r.childOriginPath]),d=iv(t,[r.childCombineNodeBPath]),f=iv(t,[s]);if(!o||!s||!c||!l||!u||!d||!f)throw Error(`Official model_combine_setup paths were not fully resolved.`);sv(l.node,d.node);let p=c.node.parent,m=u.node.parent;if(p&&m){for(let e of[...p.children])e.name.endsWith(a)&&ov(e,m);let e=cv(t,i,t.get(o)??p),n=i.filter(t=>!e.includes(t));if(n.length>0)throw Error(`Official model_combine_setup head renderers were not moved: ${n.join(`, `)}.`);let c=`${s}/${r.faceRendererName??`Face`}`;if(!e.includes(c))throw Error(`Official model_combine_setup face renderer '${c}' was not moved.`);ov(u.node,p)}return u.node.position.copy(c.node.position),u.node.quaternion.copy(c.node.quaternion),u.node.scale.copy(c.node.scale),u.node.updateMatrix(),d.node.position.copy(l.node.position),d.node.quaternion.copy(l.node.quaternion),d.node.scale.copy(l.node.scale),d.node.updateMatrix(),uv(n,c.node,u.node),uv(n,l.node,d.node),lv(l.node,t,n),lv(c.node,t,n),lv(f.node,t,n),t.set(c.path,u.node),t.set(l.path,d.node),r.parentAttachPath&&t.set(r.parentAttachPath,u.node),r.parentCombineNodeBPath&&t.set(r.parentCombineNodeBPath,d.node),e.updateMatrixWorld(!0),{bodyNodeA:c,bodyNodeB:l,faceNodeA:u,faceNodeB:d}}function fv(e,t){return[...new Set((nv(e)?.prefabGraphs??[]).flatMap(e=>e.renderers??[]).filter(e=>e.typeName===`SkinnedMeshRenderer`).map(e=>e.transformPath).filter(e=>!!(e&&e.startsWith(`${t}/`))))]}function pv(e,t){let n=nv(e),r=n?.bodyHeadAssembly?.childRootPath,i=t.rendererTransformPath;if(!r||!i?.startsWith(`${r}/`))return!1;let a=(n.prefabGraphs??[]).flatMap(e=>e.renderers??[]).filter(e=>e.transformPath===i);return a.length>0&&a.every(e=>e.typeName!==`SkinnedMeshRenderer`)}function mv(e,t){return(rv(e)?.meshes??[]).find(e=>e.rendererTransformPath?.startsWith(`${t}/`)&&typeof e.rootBonePath==`string`)?.rootBonePath??null}function hv(e,t){let n=e,r=new Set;for(;typeof n.parentPathId==`number`;){if(typeof n.pathId==`number`){if(r.has(n.pathId))throw Error(`Runtime prefab graph contains a parent cycle at PathID ${n.pathId}.`);r.add(n.pathId)}let e=t.get(n.parentPathId);if(!e)break;n=e}return n}function gv(e){let t=e.transformPath?.split(`/`)[0];return t?`${e.runtimePartIndex??-1}:${t}`:null}function _v(e,t){let n=new Map;for(let r of rv(e)?.meshes??[]){if(typeof r.rendererTransformPathId!=`number`)continue;let e=t.get(r.rendererTransformPathId);if(!e)continue;let i=hv(e,t),a=gv(e);if(!a||typeof i.pathId!=`number`)continue;let o=n.get(a);if(o!==void 0&&o!==i.pathId)throw Error(`Runtime native meshes reference multiple Unity prefab instances for '${a}' (${o}, ${i.pathId}).`);n.set(a,i.pathId)}return n}function vv(e,t){let n=nv(e);if(!n?.prefabGraphs?.length)return null;let r=new Vn;r.name=`UnityPrefabSourceRoot`,r.userData.pjskUnityPrefabSourceGraph=!0;let i=Tv(e);r.scale.setScalar(i.scale),r.userData.pjskSourceScaleCorrection=i;let{sourceByPathId:a,pathCounts:o}=yv(n),s=new Set([...o.entries()].filter(([,e])=>e>1).map(([e])=>e)),{nodeByPathId:c,nodeByPath:l}=bv(n,a,_v(e,a));Sv(r,c,a),r.updateMatrixWorld(!0);let u=wv(r),d=n.bodyHeadAssembly;if(!av(d))throw Error(`Runtime package must provide the official model_combine_setup body/head assembly.`);let f=iv(l,[d.parentAttachPath]),p=iv(l,[d.childRootPath]),m=iv(l,[d.childOriginPath]);if(!f||!p||!m)throw Error(`Official model_combine_setup body/head roots were not fully resolved.`);let h=fv(e,p.path),g=dv(r,l,c,d,h),_=mv(e,f.path.split(`/`)[0]),v=_?l.get(_)??null:null,y=wv(r),b=u-y,x=Cv(l,t),S={active:!0,sourcePath:g.bodyNodeA.path,targetPath:g.faceNodeA.path,reason:null,setupVersion:String(n.version??``),sourceScaleCorrection:i,mountedHeadRootCount:1,mountedHeadOriginPaths:[g.faceNodeA.path],assemblyCounts:{inputTransforms:u,retainedTransforms:y,removedTransforms:b,capturedCommonRemovedTransforms:14,removedAtLeastCapturedCommonCount:b>=14},targetCount:x.length,targetPaths:x.slice(0,24).map(e=>String(e.source.userData.pjskTransformPath??e.source.name)),keyNodes:{runtimeMount:null,modelCombineBodyNeck:ry(g.bodyNodeA.node,r),modelCombineFaceNeck:ry(g.faceNodeA.node,r)}};return{root:r,nodeByPath:l,nodeByPathId:c,ambiguousPaths:s,meshCarrierBindings:x,bodyAttach:g.faceNodeA.node,bodyAttachPath:f.path,headRoot:g.faceNodeA.node,headRootPath:g.faceNodeA.path,headOrigin:g.faceNodeA.node,headOriginPath:g.faceNodeA.path,bodyRootBone:v,bodyRootBonePath:_,headRendererPaths:h,debug:S}}function yv(e){let t=new Map,n=new Map;for(let r of e.prefabGraphs??[])for(let e of r.transforms??[])typeof e.pathId==`number`&&e.transformPath&&(t.set(e.pathId,e),n.set(e.transformPath,(n.get(e.transformPath)??0)+1));return{sourceByPathId:t,pathCounts:n}}function bv(e,t,n){let r=new Map,i=new Map;for(let a of e.prefabGraphs??[])for(let e of a.transforms??[])xv(e,t,n,r,i);return{nodeByPathId:r,nodeByPath:i}}function xv(e,t,n,r,i){if(typeof e.pathId!=`number`||!e.transformPath)return;let a=new Bn;a.name=e.name??e.transformPath.split(`/`).pop()??`path_${e.pathId}`,a.userData.pjskTransformPath=e.transformPath,a.userData.pjskRuntimePartIndex=e.runtimePartIndex,a.userData.pjskPoseRoot=e.poseRoot??null,a.position.copy(Np(Ap(e.localPosition,new W))),a.quaternion.copy(Fp(jp(e.localRotation))),a.scale.copy(Ap(e.localScale,new W(1,1,1))),a.updateMatrix(),r.set(e.pathId,a);let o=hv(e,t),s=n.get(gv(e)??``);(s===void 0||s===o.pathId||!i.has(e.transformPath))&&i.set(e.transformPath,a)}function Sv(e,t,n){for(let[r,i]of t.entries()){let a=n.get(r)?.parentPathId;((typeof a==`number`?t.get(a):null)??e).add(i)}}function Cv(e,t){if(!t)return[];let n=[],r=d_(t);for(let[t,i]of e.entries()){let e=r.get(t);e&&n.push({source:i,target:e})}return n}function wv(e){let t=0;return e.traverse(n=>{n!==e&&(t+=1)}),t}function Tv(e){let t=ev(e),n=ev(t.character??t.Character),r=ev(t.bodyManifest??t.BodyManifest);return{characterHeightMeters:tv(n.characterHeightMeters??n.CharacterHeightMeters??r.CharacterHeightMeters??r.characterHeightMeters),scale:1,reason:`presentation-module-applies-position-scale`}}function Ev(e,t){let n=rv(t),r=n?.meshes??[];if(!n||r.length===0)return{meshCount:0,boneCount:e.nodeByPath.size,skinnedMeshCount:0,skinBindings:[],error:`Unity runtime nativeMeshes version 0414 is missing or empty.`,warnings:n?.warnings??[]};let i=0,a=0,o=[],s=[...n.warnings??[]],c=[];e.root.updateMatrixWorld(!0);for(let n of r){if(pv(t,n))continue;let r=Dv(e,n,s,c);i+=+!!r.installed,a+=+!!r.skinned,r.skinBinding&&o.push(r.skinBinding)}return e.root.updateMatrixWorld(!0),{meshCount:i,boneCount:e.nodeByPath.size,skinnedMeshCount:a,skinBindings:o,error:c.length>0?c.join(` `):i>0?null:`Unity runtime nativeMeshes did not produce any renderable mesh.`,warnings:s}}function Dv(e,t,n,r){let i=t.bonePaths??[],a=t.bonePathIds??[];if(!kv(e,t,i,a,n,r))return{installed:!1,skinned:!1};let o=Av(e,t,n,r);if(!o)return{installed:!1,skinned:!1};let s=Vv(t);if(!s){let e=`Native mesh '${Ov(t)}' skipped: invalid geometry payload.`;return n.push(e),r.push(e),{installed:!1,skinned:!1}}if(!t.submeshes?.length||s.groups.length!==t.submeshes.length){s.dispose();let e=`Native mesh '${Ov(t)}' has no exact submesh/material-slot mapping.`;return n.push(e),r.push(e),{installed:!1,skinned:!1}}let c=jv(t,s),l=t.meshName??t.meshPath?.split(`/`).pop()??`UnityNativeMesh`,u=Mv(e,i,a);if(i.length>0&&u.length!==i.length){let e=`Native mesh '${t.meshPath??l}' skipped: ${i.length-u.length} skin bones were unresolved.`;return n.push(e),r.push(e),s.dispose(),{installed:!1,skinned:!1}}let d=i.length>0?new Ei(s,c):new mi(s,c);Nv(d,l,t,o);let f=d instanceof Ei?Pv(e,t,d,u,l,n):void 0;return{installed:!0,skinned:d instanceof Ei,skinBinding:f}}function Ov(e){return e.meshPath??e.meshName??`<unnamed>`}function kv(e,t,n,r,i,a){let o=[...typeof t.rendererTransformPathId==`number`?[]:[t.rendererTransformPath],...r.length===0?n:[],...typeof t.rootBonePathId==`number`?[]:[t.rootBonePath]].filter(t=>!!(t&&e.ambiguousPaths.has(t)));if(o.length>0){let e=`Native mesh '${Ov(t)}' has an ambiguous legacy PathID-less skin binding (${[...new Set(o)].join(`, `)}); regenerate it with a current Haruki-3D-Exporter.`;return i.push(e),a.push(e),!1}if(r.length>0&&r.length!==n.length){let e=`Native mesh '${Ov(t)}' has ${n.length} bone paths but ${r.length} bone PathIDs; regenerate it with a current Haruki-3D-Exporter.`;return i.push(e),a.push(e),!1}return!0}function Av(e,t,n,r){let i=t.rendererTransformPath,a=typeof t.rendererTransformPathId==`number`?e.nodeByPathId.get(t.rendererTransformPathId):i?e.nodeByPath.get(i):null;if(a)return a;let o=`Native mesh '${Ov(t)}' skipped: renderer transform '${i??`<null>`}' was not found.`;return n.push(o),r.push(o),null}function jv(e,t){return(e.submeshes??[]).map((n,r)=>{if(!n.materialKey||typeof n.slotIndex!=`number`)throw Error(`Native mesh '${Ov(e)}' has a submesh without material identity; regenerate it with Haruki-3D-Exporter materialKey runtime support.`);if(n.slotIndex!==r)throw Error(`Native mesh '${Ov(e)}' material slot ${n.slotIndex} is out of order; expected ${r}.`);let i=new ni({color:16777215,vertexColors:t.hasAttribute(`color`)});return i.name=n.materialName??e.meshName??e.meshPath??`native_material`,i.userData.pjskMaterialKey=n.materialKey,i.userData.pjskMaterialSlotIndex=n.slotIndex,i.userData.pjskPlaceholderMaterial=!0,i})}function Mv(e,t,n){return t.map((t,r)=>n.length>0?e.nodeByPathId.get(n[r]):e.nodeByPath.get(t)).filter(e=>!!e)}function Nv(e,t,n,r){e.name=t,e.userData.pjskNativeUnityMesh=!0,e.userData.pjskPartKind=n.partKind??null,e.userData.pjskRendererPathId=n.rendererPathId??null,e.frustumCulled=!1,r.add(e)}function Pv(e,t,n,r,i,a){e.root.updateMatrixWorld(!0),n.updateMatrixWorld(!0);let o=Bv(t,r.length,a),s=n.matrixWorld.clone();Fv(o,s);let c=new ji(r,o.length>0?o:void 0);return o.length===0&&c.calculateInverses(),n.bind(c,s),Iv(e,t,i,r,c)}function Fv(e,t){if(e.length===0)return;let n=t.clone().invert();for(let t of e)t.multiply(n)}function Iv(e,t,n,r,i){let a=t.rendererTransformPath,o=!!(a&&e.headRendererPaths.includes(a)),s=Lv(e,t);return{meshName:n,partKind:t.partKind??null,rendererTransformPath:a??null,rootBonePath:t.rootBonePath??null,rootBoneResolved:s,effectiveRootBonePath:o?e.bodyRootBonePath:t.rootBonePath??null,effectiveRootBoneResolved:o?!!e.bodyRootBone:s,boneCount:r.length,...Rv(r[0],i.boneInverses[0]),...zv(r,i.boneInverses)}}function Lv(e,t){return typeof t.rootBonePathId==`number`?e.nodeByPathId.has(t.rootBonePathId):t.rootBonePath?e.nodeByPath.has(t.rootBonePath):!1}function Rv(e,t){let n=new q().multiplyMatrices(e.matrixWorld,t),r=new W,i=new U,a=new W;return n.decompose(r,i,a),{restTranslation:ty(r),restScale:ty(a)}}function zv(e,t){if(e.length<2||t.length!==e.length)return{restMatrixSpread:0,restMatrixSpreadBonePath:null};let n=new q().multiplyMatrices(e[0].matrixWorld,t[0]),r=new q,i=0,a=null;for(let o=1;o<e.length;o+=1){r.multiplyMatrices(e[o].matrixWorld,t[o]);for(let t=0;t<16;t+=1){let s=Math.abs(r.elements[t]-n.elements[t]);s>i&&(i=s,a=String(e[o].userData.pjskTransformPath??e[o].name))}}let o=Number(i.toFixed(6));return{restMatrixSpread:o,restMatrixSpreadBonePath:o>0?a:null}}function Bv(e,t,n){let r=e.boneInverseBindMatrices??[];if(t===0||r.length===0){if(t===0&&r.length===0)return[];throw Error(`Native mesh inverse bind matrices are missing for ${t} bones.`)}if(r.length!==t*16)throw Error(`Native mesh '${e.meshPath??e.meshName??`<unnamed>`}' has ${r.length} inverse bind matrix floats for ${t} bones; expected ${t*16}.`);let i=[];for(let e=0;e<r.length;e+=16)i.push(new q().fromArray(r,e));return i}function Vv(e){let t=e.positions??[];if(t.length===0||t.length%3!=0)return null;let n=t.length/3,r=new Wr;return r.setAttribute(`position`,new Mr(t,3)),Hv(r,e,n),Gv(r,e,n),Kv(r,e.morphTargets??[],n),r.computeBoundingSphere(),r}function Hv(e,t,n){for(let[e,r]of[[`normals`,3],[`tangents`,4],[`uv0`,2],[`uv1`,2],[`uv2`,2],[`colors`,4],[`skinIndices`,4],[`skinWeights`,4]])qv(t,e,n*r);if((t.skinIndices?.length??0)!==(t.skinWeights?.length??0))throw Error(`Native mesh '${Ov(t)}' has incomplete skin indices/weights.`);Uv(e,`normal`,t.normals,3,n),t.tangents?.length===n*4&&e.setAttribute(`tangent`,new Mr(t.tangents,4)),Uv(e,`uv`,t.uv0,2,n),Uv(e,`uv1`,t.uv1,2,n),t.uv2?.length===n*2&&e.setAttribute(`uv2`,new Mr(t.uv2,2)),Uv(e,`color`,t.colors,4,n),Wv(e,`skinIndex`,t.skinIndices,4,n),Uv(e,`skinWeight`,t.skinWeights,4,n)}function Uv(e,t,n,r,i){n?.length===i*r&&e.setAttribute(t,new Mr(n,r))}function Wv(e,t,n,r,i){n?.length===i*r&&e.setAttribute(t,new Ar(n,r))}function Gv(e,t,n){let r=t.submeshes??[],i=[];for(let a of r){let r=i.length,o=a.indices??[];if(o.length===0||o.some(e=>!Number.isInteger(e)||e<0||e>=n))throw Error(`Native mesh '${t.meshPath??t.meshName??`<unnamed>`}' has invalid submesh indices.`);i.push(...o),e.addGroup(r,o.length,e.groups.length)}i.length>0&&e.setIndex(i)}function Kv(e,t,n){let r=[],i=[],a=[],o=new Set;for(let e of t){let t=e.name;if(typeof t!=`string`||t.trim().length===0)throw Error(`Native mesh 'native geometry' has a morph target without a name.`);if(o.has(t))throw Error(`Native mesh 'native geometry' has duplicate target name '${t}'.`);if(o.add(t),e.hasPositionDeltas!==!0)throw Error(`Native morph target '${t}' must explicitly declare position deltas present with hasPositionDeltas=true.`);if(typeof e.hasNormalDeltas!=`boolean`)throw Error(`Native morph target '${t}' must explicitly declare hasNormalDeltas.`);if(typeof e.hasTangentDeltas!=`boolean`)throw Error(`Native morph target '${t}' must explicitly declare hasTangentDeltas.`);let s=e.indices,c=e.positionDeltas,l=e.normalDeltas,u=e.tangentDeltas;if(!s||s.length===0)throw Error(`Native morph target '${t}' must contain a non-empty indices array.`);if(!c||c.length!==s.length*3)throw Error(`Native morph target '${t}' has invalid positionDeltas length.`);if(!l||l.length!==(e.hasNormalDeltas?s.length*3:0))throw Error(`Native morph target '${t}' has invalid normalDeltas length for hasNormalDeltas=${e.hasNormalDeltas}.`);if(!u||u.length!==(e.hasTangentDeltas?s.length*3:0))throw Error(`Native morph target '${t}' has invalid tangentDeltas length for hasTangentDeltas=${e.hasTangentDeltas}.`);if(!Array.from(c).every(Number.isFinite)||!Array.from(l).every(Number.isFinite)||!Array.from(u).every(Number.isFinite))throw Error(`Native morph target '${t}' delta arrays must contain only finite numbers.`);let d=new Float32Array(n*3),f=e.hasNormalDeltas?new Float32Array(n*3):null,p=e.hasTangentDeltas?new Float32Array(n*3):null,m=new Set;for(let e=0;e<s.length;e+=1){let r=s[e];if(!Number.isInteger(r)||r<0||r>=n)throw Error(`Native morph target '${t}' has invalid vertex index ${r}.`);if(m.has(r))throw Error(`Native morph target '${t}' has duplicate vertex index ${r}.`);m.add(r),d[r*3]=c[e*3],d[r*3+1]=c[e*3+1],d[r*3+2]=c[e*3+2],f&&(f[r*3]=l[e*3],f[r*3+1]=l[e*3+1],f[r*3+2]=l[e*3+2]),p&&(p[r*3]=u[e*3],p[r*3+1]=u[e*3+1],p[r*3+2]=u[e*3+2])}let h=new kr(d,3);if(h.name=t,r.push(h),f){let e=new kr(f,3);e.name=t,i.push(e)}if(p){let e=new kr(p,3);e.name=t,a.push(e)}}if(r.length>0&&(e.morphAttributes.position=r,e.morphTargetsRelative=!0),i.length>0&&i.length!==r.length)throw Error(`Native mesh 'native geometry' has mixed normal delta presence across morph targets.`);if(i.length>0&&(e.morphAttributes.normal=i),a.length>0&&a.length!==r.length)throw Error(`Native mesh 'native geometry' has mixed tangent delta presence across morph targets.`);if(a.length>0){let t=e.morphAttributes;t.tangent=a;let r=e.getAttribute(`tangent`);if(!r||r.itemSize!==4||r.count!==n)throw Error(`Native morph tangent deltas require a complete base tangent attribute.`)}}function qv(e,t,n){let r=e[t]??[];if(r.length!==0&&r.length!==n)throw Error(`Native mesh '${e.meshPath??e.meshName??`<unnamed>`}' attribute '${t}' has ${r.length} values; expected ${n}.`)}function Jv(e,t,n,r){e.root.updateMatrixWorld(!0);let i=r?r.update():S_(e,nv(t)?.constraintSetup,n);for(let t of e.meshCarrierBindings)t.target.position.copy(t.source.position),t.target.quaternion.copy(t.source.quaternion),t.target.scale.copy(t.source.scale),t.target.updateMatrix();return e.root.updateMatrixWorld(!0),i}function Yv(e,t,n){let r=nv(t)?.constraintSetup;return r?new x_(e,r,n):null}function Xv(e,t,n){let r={...e?.debug??n,setupVersion:Zv(t)};if(!e)return r;let i=e.root;i.updateMatrixWorld(!0);let a=nv(t)?.bodyHeadAssembly,o=d_(i),s=t=>{let n=iv(e.nodeByPath,t)??Qv(o,t);return n?ry(n.node,i):null},c=s([a?.parentCombineNodeAPath??``,e.debug.sourcePath??``,`body/Position/PositionOffset/Hip/Waist/Spine/Chest/Neck`,`body/Position/Hip/Waist/Spine/Chest/Neck`]),l=s([a?.parentCombineNodeBPath??``,e.debug.sourcePath?`${e.debug.sourcePath}/Head`:``,`body/Position/PositionOffset/Hip/Waist/Spine/Chest/Neck/Head`,`body/Position/Hip/Waist/Spine/Chest/Neck/Head`]),u=s([`face/Position`]),d=s([a?.childCombineNodeAPath??``,e.debug.targetPath??``,`face/Position/Hip/Waist/Spine/Chest/Neck`]),f=s([a?.childCombineNodeBPath??``,e.debug.targetPath?`${e.debug.targetPath}/Head`:``,`face/Position/Hip/Waist/Spine/Chest/Neck/Head`]),p=s([`mdl_chr_IDL_A_00/Position`,`mdl_chr_IDL_A_00/Position_4`]);return{...r,positionRoots:iy(i),assemblyDistances:{bodyNeckToFaceNeck:null,bodyHeadToFaceHead:null},keyNodes:{...r.keyNodes??{},bodyNeck:c,bodyHead:l,facePosition:u,faceNeck:d,faceHead:f,meshContainerPosition:p}}}function Zv(e){let t=ev(e),n=ev(t.pjskSpringBone??t.PjskSpringBone),r=ev(t.runtimeUnitySetup??t.RuntimeUnitySetup??n.runtimeUnitySetup??n.RuntimeUnitySetup);return String(r.version??r.Version??``)}function Qv(e,t){for(let n of t){let t=e.get(n);if(t)return{node:t,path:n}}return null}function $v(e){return e.replace(/_\d+$/,``)}function ey(e,t,n=!1){let r=[],i=e;for(;i&&i!==t;)i.name&&r.push(n?$v(i.name):i.name),i=i.parent;return r.reverse().join(`/`)}function ty(e){return{x:Number(e.x.toFixed(5)),y:Number(e.y.toFixed(5)),z:Number(e.z.toFixed(5))}}function ny(e){return{x:Number(e.x.toFixed(5)),y:Number(e.y.toFixed(5)),z:Number(e.z.toFixed(5)),w:Number(e.w.toFixed(5))}}function ry(e,t){e.updateMatrixWorld(!0);let n=new W,r=new U,i=new W(0,0,1);return e.getWorldPosition(n),Lp(e,r),i.applyQuaternion(r).normalize(),{path:ey(e,t),canonicalPath:ey(e,t,!0),parentPath:e.parent&&e.parent!==t?ey(e.parent,t):null,destroyed:e.userData.pjskModelCombineDestroyed===!0,localPosition:ty(e.position),localQuaternion:ny(e.quaternion),worldPosition:ty(n),worldQuaternion:ny(r),worldForward:ty(i)}}function iy(e){let t=[],n=new Set;return e.updateMatrixWorld(!0),e.traverse(r=>{if(r===e||!r.name||n.has(r))return;let i=ey(r,e,!0),a=i===`face/Position`,o=i===`body/Position`,s=i.endsWith(`/Position`)&&i.split(`/`).some(e=>e.startsWith(`mdl_chr_`));(a||o||s)&&(n.add(r),t.push(ry(r,e)))}),t}var ay=1.6;function oy(e){return .5+.8/cy(e)}function sy(e){return oy(e)}function cy(e){return V.clamp(e||ay,.5,2)}function ly(e){return e&&typeof e==`object`?e:{}}function uy(e,t){return/(?:^|[_-])loop$/i.test(e??``)||/(?:^|[_-])loop(?:\.json)?$/i.test(t?.split(`/`).pop()??``)}function dy(e,t,n,r,i=1e-4){let a=n*t,o=r*t;for(let n=0;n<t;n+=1)if(Math.abs(e[a+n]-e[o+n])>i)return!1;return!0}function fy(e,t){let n=e[t],r=e[t+1],i=e[t+2],a=e[t+3],o=Math.hypot(n,r,i,a);if(o<1e-8){e[t]=0,e[t+1]=0,e[t+2]=0,e[t+3]=1;return}e[t]=n/o,e[t+1]=r/o,e[t+2]=i/o,e[t+3]=a/o}function py(e,t){if(t===4)for(let n=t;n<e.length;n+=t){let r=n-t;e[r]*e[n]+e[r+1]*e[n+1]+e[r+2]*e[n+2]+e[r+3]*e[n+3]<0&&(e[n]*=-1,e[n+1]*=-1,e[n+2]*=-1,e[n+3]*=-1)}}function my(e,t,n,r,i,a,o,s,c){let l=Math.max(o-a,1e-6),u=V.clamp((c-a)/l,0,1),d=u*u,f=d*u,p=(n-e)/Math.max(o-i,1e-6),m=(r-t)/Math.max(s-a,1e-6),h=2*f-3*d+1,g=f-2*d+u,_=-2*f+3*d,v=f-d;return h*t+g*l*p+_*n+v*l*m}function hy(e,t,n){let r=e instanceof Ca,i=e instanceof Ta&&e.name.endsWith(`.position`);if(!r&&!i)return e.clone();let a=gy(e,t);if(!a)return e.clone();let{stride:o,times:s,values:c}=a;return r&&py(c,o),_y(e,t,n,s,c,r)}function gy(e,t){let n=e.getValueSize(),r=Array.from(e.times),i=Array.from(e.values),a=r.length;return a<3||t<=0?null:(Math.abs(r[a-1]-t)<.001&&dy(i,n,0,a-1)&&--a,a<3?null:{stride:n,times:r.slice(0,a),values:i.slice(0,a*n)})}function _y(e,t,n,r,i,a){let o=e.getValueSize(),s=r.length,c=Math.max(2,Math.round(t*n)),l=new Float32Array(c+1),u=new Float32Array((c+1)*o),d=0;for(let e=0;e<=c;e+=1){let n=e===c?t:t*e/c;if(l[e]=n,e===c){vy(u,e*o,o);continue}for(;d<s-1&&n>r[d+1];)d+=1;by(u,e*o,o,i,yy(r,d,t),n),a&&fy(u,e*o)}return a?new Ca(e.name,l,u):new Ta(e.name,l,u)}function vy(e,t,n){for(let r=0;r<n;r+=1)e[t+r]=e[r]}function yy(e,t,n){let r=e.length,i=t,a=t+1<r?t+1:0,o=(i-1+r)%r,s=(a+1)%r;return{indexes:[o,i,a,s],times:[e[o]-(o>=i?n:0),e[i],e[a]+(a<=i?n:0),e[s]+(s<=i?n:0)]}}function by(e,t,n,r,i,a){let[o,s,c,l]=i.indexes,[u,d,f,p]=i.times;for(let i=0;i<n;i+=1)e[t+i]=my(r[o*n+i],r[s*n+i],r[c*n+i],r[l*n+i],u,d,f,p,a)}function xy(e){let t=e.tracks.filter(e=>e.times.length>2);return t.length?t.some(t=>t.times.length<Math.max(12,e.duration*24)):!1}function Sy(e,t=60){return xy(e)?new Ea(e.name,e.duration,e.tracks.map(n=>hy(n,e.duration,t))):e}function Cy(e){return/^(Head|Neck)\.(position|quaternion|scale)$/.test(e.name)}function wy(e,t=new Set){if(!e)return null;let n=e.tracks.filter(e=>/hair/i.test(e.name)),r=e.tracks.filter(e=>/^Head\./.test(e.name)),i=e.tracks.filter(e=>/^Neck\./.test(e.name)),a=e.tracks.filter(e=>/^(Position|Hip|Waist|Spine|Chest|Neck|Head)\./.test(e.name)),o=e.tracks.filter(e=>/\.(position|quaternion|scale)$/.test(e.name)),s=e.tracks.filter(e=>Ty(e,t));return{trackCount:e.tracks.length,transformTrackCount:o.length,hairTrackCount:n.length,headTrackCount:r.length,neckTrackCount:i.length,upperBodyTrackCount:a.length,utjControlledTrackCount:s.length,sampleHairTracks:n.slice(0,12).map(e=>e.name),sampleHeadTracks:[...r,...i].slice(0,12).map(e=>e.name),sampleUtjControlledTracks:s.slice(0,12).map(e=>e.name)}}function Ty(e,t){if(t.size===0)return!1;let n=e.name.split(`.`)[0];return t.has(n)}function Ey(e){return e.tracks.some(Cy)?new Ea(`${e.name||`motion`}_no_head_tracks`,e.duration,e.tracks.filter(e=>!Cy(e))):e}function Dy(e,t){return t?e:Ey(e)}function Oy(e){return/(?:^|\/)unity-motion\.msgpack\.br(?:$|[?#])/i.test(e)}function ky(e,t){return e?t??(Oy(e)?`unity-json`:null):null}function Ay(e,t){return`${t??`unknown`}:${e}`}function jy(e){let t=ly(e),n=String(t.version??t.Version??``),r=t.clips??t.Clips;if(n!==`0414`||!Array.isArray(r))throw Error(`Unity motion runtime must be version 0414 and contain clips.`);let i=r.map(My);if(!i.length)throw Error(`Unity motion runtime contains no clips.`);return{version:n,clips:i}}function My(e){let t=ly(e),n=String(t.name??t.Name??`motion`),r=t.tracks??t.Tracks;if(!Array.isArray(r))throw Error(`Unity motion clip ${n} contains no tracks.`);let i=r.map(Ny);if(!i.length)throw Error(`Unity motion clip ${n} contains no valid tracks.`);return{name:n,tracks:i}}function Ny(e){let t=ly(e),n=String(t.nodeKey??t.NodeKey??``),r=String(t.property??t.Property??``),i=Number(t.componentCount??t.ComponentCount),a=Py(t.times??t.Times),o=Py(t.values??t.Values);if(!n||!r||!Number.isInteger(i))throw Error(`Unity motion track is missing nodeKey, property, or componentCount.`);if(!a.length||o.length!==a.length*i)throw Error(`Unity motion track ${n}.${r} has inconsistent sample arrays.`);return{nodeKey:n,property:r,componentCount:i,times:a,values:o}}function Py(e){if(e instanceof Float32Array||e instanceof Uint16Array||e instanceof Uint32Array)return e;if(!Array.isArray(e))return[];if(e.every(e=>typeof e==`number`&&Number.isFinite(e)))return e;let t=e.map(Number);if(!t.every(Number.isFinite))throw Error(`Unity motion numeric array contains non-finite values.`);return t}function Fy(e){let t=e.property===`translation`?`position`:e.property===`rotation`?`quaternion`:e.property,n=`${e.nodeKey}.${t}`;if(t===`position`||t===`scale`){if(e.componentCount!==3)throw Error(`Unity motion track ${n} must have 3 components.`);return new Ta(n,e.times,e.values)}if(t===`quaternion`){if(e.componentCount!==4)throw Error(`Unity motion track ${n} must have 4 components.`);return new Ca(n,e.times,e.values)}throw Error(`Unsupported Unity motion property: ${e.property}`)}function Iy(e){return jy(e).clips.map(e=>{let t=e.tracks.map(Fy),n=t.flatMap(e=>Array.from(e.times)).reduce((e,t)=>Math.max(e,t),0);return new Ea(e.name,n,t)})}function Ly(e){let t=ly(e),n=ly(t.motionPackage??t.MotionPackage),r=ly(n.bodyMotionBindings??n.BodyMotionBindings),i=r.bindings??r.Bindings;return Array.isArray(i)?{version:String(r.version??r.Version??``),bindingMode:String(r.bindingMode??r.BindingMode??``),warnings:Uy(r.warnings??r.Warnings),bindings:i.map((e,t)=>{let n=Ry(e);if(!n)throw Error(`Body motion binding ${t} is invalid.`);return n})}:null}function Ry(e){let t=ly(e),n=Number(t.pathCrc??t.PathCrc),r=String(t.nodeKey??t.NodeKey??``),i=String(t.leafName??t.LeafName??``),a=t.targets??t.Targets;if(!Number.isFinite(n)||!r||!Array.isArray(a))return null;let o=a.map((e,t)=>{let n=zy(e);if(!n)throw Error(`Body motion binding '${r}' target ${t} is invalid.`);return n}),s=Number(t.targetCount??t.TargetCount??o.length);if(!Number.isInteger(s)||s!==o.length)throw Error(`Body motion binding '${r}' targetCount is inconsistent.`);return{pathCrc:n,nodeKey:r,leafName:i,importedPath:Wy(t.importedPath??t.ImportedPath),sourceRest:By(t.sourceRest??t.SourceRest),targetCount:s,targets:o}}function zy(e){let t=ly(e),n=String(t.poseRoot??t.PoseRoot??``),r=String(t.transformPath??t.TransformPath??``),i=Number(t.pathId??t.PathId);return!n||!r||!Number.isFinite(i)?null:{poseRoot:n,transformPath:r,pathId:i,optional:(t.optional??t.Optional)===!0,rest:By(t.rest??t.Rest)}}function By(e){let t=ly(e),n=Vy(t.position??t.Position),r=Hy(t.rotation??t.Rotation),i=Vy(t.scale??t.Scale);return!n||!r||!i?null:{position:n,rotation:r,scale:i}}function Vy(e){let t=ly(e),n=Number(t.x??t.X),r=Number(t.y??t.Y),i=Number(t.z??t.Z);return Number.isFinite(n)&&Number.isFinite(r)&&Number.isFinite(i)?new W(n,r,i):null}function Hy(e){let t=ly(e),n=Number(t.x??t.X),r=Number(t.y??t.Y),i=Number(t.z??t.Z),a=Number(t.w??t.W);return!Number.isFinite(n)||!Number.isFinite(r)||!Number.isFinite(i)||!Number.isFinite(a)?null:new U(n,r,i,a).normalize()}function Uy(e){return Array.isArray(e)?e.filter(e=>typeof e==`string`):[]}function Wy(e){return typeof e==`string`&&e.length>0?e:null}function Gy(e,t){let n=e.clone();return n.name=t,n}function Ky(e,t,n,r,i){if(i.poseRoot!==`face`)return Gy(e,t);if(!r.sourceRest||!i.rest)return null;if(n===`position`){let n=[];for(let t=0;t<e.values.length;t+=3){let a=new W(e.values[t],e.values[t+1],e.values[t+2]),o=i.rest.position.clone().add(a.sub(r.sourceRest.position));n.push(o.x,o.y,o.z)}return new Ta(t,e.times,n)}if(n===`quaternion`){let n=[],a=r.sourceRest.rotation.clone().invert();for(let t=0;t<e.values.length;t+=4){let r=new U(e.values[t],e.values[t+1],e.values[t+2],e.values[t+3]).normalize(),o=i.rest.rotation.clone().multiply(a).multiply(r).normalize();n.push(o.x,o.y,o.z,o.w)}return new Ca(t,e.times,n)}if(n===`scale`){let n=[],a=r.sourceRest.scale,o=i.rest.scale;if(a.x===0||a.y===0||a.z===0)return null;for(let t=0;t<e.values.length;t+=3)n.push(o.x*(e.values[t]/a.x),o.y*(e.values[t+1]/a.y),o.z*(e.values[t+2]/a.z));return new Ta(t,e.times,n)}return Gy(e,t)}function qy(e){return e.poseRoot===`face`&&/^face\/Position(?:\/Hip(?:\/Waist(?:\/Spine(?:\/Chest(?:\/Neck(?:\/Head)?)?)?)?)?)?$/.test(e.transformPath)}function Jy(e){let t=ly(e),n=ly(t.pjskSpringBone??t.PjskSpringBone),r=ly(t.runtimeUnitySetup??t.RuntimeUnitySetup??n.runtimeUnitySetup??n.RuntimeUnitySetup),i=r.version,a=i===`0414`||i===414?ly(r.bodyHeadAssembly):{};return!!(a.parentingMode===`model_combine_setup`&&a.parentAttachPath&&a.childRootPath&&a.childOriginPath)}function Yy(e,t,n){let r=Ly(n),i={mode:`unity-prefab`,bindingCount:r?.bindings.length??0,sourceTrackCount:e.tracks.length,emittedTrackCount:0,resolvedTargetCount:0,resolvedBodyTargetCount:0,resolvedFaceTargetCount:0,unresolvedTrackCount:0,duplicateTargetTrackCount:0,sampleUnresolvedTracks:[],sampleResolvedHeadTargets:[]};if(!r||r.version!==`0414`||r.bindings.length===0)return{clip:null,debug:i,error:`Unity Prefab animation requires motionPackage.bodyMotionBindings version 0414.`};let a=new Map(r.bindings.map(e=>[e.nodeKey,e]));if(a.size!==r.bindings.length)return{clip:null,debug:i,error:`Unity Prefab animation bindings contain duplicate node keys.`};let o=d_(t),s=Jy(n),c=[],l=new Set,u=new Set,d=new Set,f=new Set;for(let t of e.tracks){let e=Xy(t,{bindingByNodeKey:a,nodeByPath:o,suppressFaceAssemblyBridgeTargets:s,tracks:c,emittedTargets:l,resolvedBodyTargetPaths:u,resolvedFaceTargetPaths:d,sampleResolvedHeadTargets:f,debug:i});e===0?$y(i,t.name):i.resolvedTargetCount+=e}return i.emittedTrackCount=c.length,i.resolvedBodyTargetCount=u.size,i.resolvedFaceTargetCount=d.size,i.sampleResolvedHeadTargets=[...f],c.length===0||i.unresolvedTrackCount!==0||i.duplicateTargetTrackCount!==0?{clip:null,debug:i,error:`Unity Prefab animation retarget failed: ${i.unresolvedTrackCount} unresolved tracks, ${i.duplicateTargetTrackCount} duplicate targets.`}:{clip:new Ea(`${e.name||`motion`}_unity_prefab`,e.duration,c),debug:i,error:null}}function Xy(e,t){let n=e.name.lastIndexOf(`.`),r=n>0?e.name.slice(0,n):``,i=n>0?e.name.slice(n+1):``,a=t.bindingByNodeKey.get(r);if(!a||!i)return 0;let o=0,s=!1,c=!1;for(let n of a.targets){if(t.suppressFaceAssemblyBridgeTargets&&qy(n)||n.optional&&!t.nodeByPath.has(n.transformPath)){c=!0;continue}Zy(e,i,a,n,t)?o+=1:s=!0}return s?0:o||+!!c}function Zy(e,t,n,r,i){if(i.suppressFaceAssemblyBridgeTargets&&qy(r))return!1;let a=i.nodeByPath.get(r.transformPath);if(!a)return!1;let o=`${a.uuid}.${t}`;if(i.emittedTargets.has(o))return i.debug.duplicateTargetTrackCount+=1,!1;let s=Ky(e,o,t,n,r);return s?(i.emittedTargets.add(o),i.tracks.push(s),Qy(r,i),!0):!1}function Qy(e,t){e.poseRoot===`body`&&t.resolvedBodyTargetPaths.add(e.transformPath),e.poseRoot===`face`&&t.resolvedFaceTargetPaths.add(e.transformPath),t.sampleResolvedHeadTargets.size<16&&/(?:^|\/)(Position|Hip|Waist|Spine|Chest|Neck|Head)$/.test(e.transformPath)&&t.sampleResolvedHeadTargets.add(e.transformPath)}function $y(e,t){e.unresolvedTrackCount+=1,e.sampleUnresolvedTracks.length<16&&e.sampleUnresolvedTracks.push(t)}function eb(e,t){if(e.length!==1)throw Error(`Expected exactly one ${t}, found ${e.length}.`);return e[0]}async function tb(e){return Iy(await Wf(e))}var nb=class{loadClips;onLoopPromoted;clipCache=new Map;smoothedLoopClipCache=new WeakMap;context=null;motionUrl=null;motionKind=null;loopUrl=null;loopKind=null;activeClipName=null;duration=0;action=null;loopAction=null;mixer=null;finishedHandler=null;error=null;retargetDebug=null;queuedLoopClipName=null;speed=1;paused=!1;bodyHeadTracksEnabled=!0;revision=0;constructor(e={}){this.loadClips=e.loadClips??tb,this.onLoopPromoted=e.onLoopPromoted??(()=>void 0)}setSelection(e){this.motionUrl=e?.motionUrl??null,this.motionKind=ky(this.motionUrl,e?.motionKind),this.loopUrl=e?.loopUrl??null,this.loopKind=ky(this.loopUrl,e?.loopKind)}hasSelection(){return this.motionUrl!==null}matchesSelection(e,t){return this.motionUrl===e&&this.loopUrl===t}capturePosition(){return{activeClipName:this.activeClipName,currentTime:this.action?.time??0}}setPaused(e){this.paused=e,this.applySettings()}setSpeed(e){this.speed=e,this.applySettings()}getSpeed(){return this.speed}isPaused(){return this.paused}setBodyHeadTracksEnabled(e){return this.bodyHeadTracksEnabled!==e&&(this.bodyHeadTracksEnabled=e,!0)}step(e){this.mixer?.update(Math.max(0,e))}seek(e){let t=Math.max(this.duration,0),n=t>0?V.clamp(e,0,t):Math.max(e,0);return this.paused=!0,this.applySettings(),this.action&&(this.action.paused=!1,this.action.time=n),this.mixer?.update(0),this.applySettings(),n}seekPhase(e){let t=V.clamp(Number.isFinite(e)?e:0,0,1);return this.seek(Math.max(this.duration,0)*t)}seekLoopPhase(e){return this.promoteQueuedLoop(),this.seekPhase(e)}restorePosition(e){if(!this.action)return;let t=!!(this.loopUrl&&e.activeClipName&&(e.activeClipName===this.queuedLoopClipName||uy(e.activeClipName,this.loopUrl)));t&&this.promoteQueuedLoop();let n=Math.max(this.duration,0);this.action.time=n>0?t?V.euclideanModulo(e.currentTime,n):V.clamp(e.currentTime,0,n):Math.max(e.currentTime,0),this.mixer?.update(0)}async refresh(e){let t=++this.revision;if(this.context=e,this.stopPlayback(),this.error=null,!this.motionUrl||!e.root)return{poseApplied:!0};let n=await this.loadCachedClips(this.motionUrl,this.motionKind,t);if(t!==this.revision||!n)return{poseApplied:!1};if(!n.length)return this.error=`No clips found in ${this.motionUrl}`,{poseApplied:!1};let r=eb(n.filter(e=>!uy(e.name,this.motionUrl)),`primary motion in ${this.motionUrl}`),i=this.preparePlayableClip(r,e,!0),a=null;if(this.loopUrl===this.motionUrl){let t=n.filter(e=>uy(e.name,this.loopUrl));if(t.length>1)throw Error(`Expected at most one loop motion in ${this.loopUrl}, found ${t.length}.`);let r=t[0]??null;a=r?this.preparePlayableClip(r,e,!1):null}else if(this.loopUrl){let n=await this.loadCachedClips(this.loopUrl,this.loopKind,t);if(t!==this.revision)return{poseApplied:!1};let r=eb(n,`loop motion in ${this.loopUrl}`);a=this.preparePlayableClip(r,e,!1)}return t===this.revision?(this.installPlayback(e.root,i,a),{poseApplied:!0}):{poseApplied:!1}}release(e={}){this.revision+=1,this.stopPlayback(),this.context=null,e.preserveSelection||this.setSelection(null),e.clearCache&&this.clipCache.clear()}getSnapshot(e={}){let t=e.utjControlledNodeNames??new Set,n=this.context?.prefabHeadFollow,r=this.retargetDebug?{...this.retargetDebug,prefabHeadFollow:n}:this.context?.retargetWithUnityPrefab?{mode:`unity-prefab`,bindingCount:0,sourceTrackCount:0,emittedTrackCount:0,resolvedTargetCount:0,resolvedBodyTargetCount:0,resolvedFaceTargetCount:0,unresolvedTrackCount:0,duplicateTargetTrackCount:0,sampleUnresolvedTracks:[],sampleResolvedHeadTargets:[],prefabHeadFollow:n}:null;return{selectedUrl:this.motionUrl,selectedLoopUrl:this.loopUrl,activeClipName:this.activeClipName,queuedLoopClipName:this.queuedLoopClipName,currentTime:this.action?.time??0,duration:this.duration,paused:this.paused,speed:this.speed,faceMotionEnabled:e.faceMotionEnabled??!1,bodyHeadTracksEnabled:this.bodyHeadTracksEnabled,bodyTrackDebug:wy(this.action?.getClip()??null,t),bodyLoopTrackDebug:wy(this.loopAction?.getClip()??null,t),bodyRetargetDebug:r,error:this.error}}async loadCachedClips(e,t,n){let r=Ay(e,t),i=this.clipCache.get(r);if(i)return i;if(t!==`unity-json`)throw this.error=`Unity motion .msgpack.br is required for ${e}.`,Error(this.error);try{let n=await this.loadClips(e,t);return this.clipCache.set(r,n),n}catch(e){throw n===this.revision&&(this.error=e instanceof Error?e.message:String(e)),e}}preparePlayableClip(e,t,n){let r=Dy(e,this.bodyHeadTracksEnabled);if(!t.retargetWithUnityPrefab)return n&&(this.retargetDebug={mode:`none`,bindingCount:0,sourceTrackCount:r.tracks.length,emittedTrackCount:r.tracks.length,resolvedTargetCount:r.tracks.length,resolvedBodyTargetCount:0,resolvedFaceTargetCount:0,unresolvedTrackCount:0,duplicateTargetTrackCount:0,sampleUnresolvedTracks:[],sampleResolvedHeadTargets:[],prefabHeadFollow:t.prefabHeadFollow}),r;if(!t.root)throw Error(`Unity Prefab animation requires a loaded prefab root.`);let i=Yy(r,t.root,t.runtimeExtension);if(n&&(this.retargetDebug={...i.debug,prefabHeadFollow:t.prefabHeadFollow}),i.error)throw this.error=i.error,Error(i.error);if(!i.clip)throw Error(`Unity Prefab animation retarget produced no clip.`);return i.clip}installPlayback(e,t,n){this.mixer=new So(e);let r=t.name||this.motionUrl;if(this.activeClipName=r,this.duration=t.duration,this.action=this.mixer.clipAction(t,e),this.configureAction(this.action),this.action.reset(),n){let t=this.getSmoothedLoopClip(n);this.loopAction=this.mixer.clipAction(t,e),this.configureAction(this.loopAction),this.loopAction.reset(),this.loopAction.enabled=!1,this.loopAction.loop=We,this.loopAction.clampWhenFinished=!1,this.action.loop=Ue,this.action.clampWhenFinished=!0,this.queuedLoopClipName=t.name||this.loopUrl||`${r}_loop`,this.finishedHandler=e=>{e.action===this.action&&this.promoteQueuedLoop()},this.mixer.addEventListener(`finished`,this.finishedHandler)}else this.action.loop=We,this.action.clampWhenFinished=!1,this.queuedLoopClipName=null;this.action.play(),this.applySettings(),this.mixer.update(0)}promoteQueuedLoop(){this.loopAction&&this.mixer&&this.action&&(this.removeFinishedHandler(),this.action.stop(),this.loopAction.enabled=!0,this.loopAction.reset(),this.loopAction.play(),this.action=this.loopAction,this.loopAction=null,this.activeClipName=this.queuedLoopClipName??this.action.getClip().name,this.duration=this.action.getClip().duration,this.queuedLoopClipName=null,this.onLoopPromoted(),this.applySettings())}applySettings(){for(let e of[this.action,this.loopAction])e&&(e.paused=this.paused,e.enabled=!0,e.setEffectiveTimeScale(this.paused?0:this.speed))}configureAction(e){e.zeroSlopeAtStart=!1,e.zeroSlopeAtEnd=!1}getSmoothedLoopClip(e){let t=this.smoothedLoopClipCache.get(e);if(t)return t;let n=Sy(e,60);return n!==e&&this.smoothedLoopClipCache.set(e,n),n}removeFinishedHandler(){this.mixer&&this.finishedHandler&&(this.mixer.removeEventListener(`finished`,this.finishedHandler),this.finishedHandler=null)}stopPlayback(){this.removeFinishedHandler(),this.action?.stop(),this.loopAction?.stop(),this.mixer?.stopAllAction(),this.action=null,this.loopAction=null,this.mixer=null,this.activeClipName=null,this.duration=0,this.retargetDebug=null,this.queuedLoopClipName=null}};function rb(e){return e&&typeof e==`object`?e:{}}function ib(e){let t=e;return!!t.isMesh&&Array.isArray(t.morphTargetInfluences)}function ab(e){let t=4294967295;for(let n of new TextEncoder().encode(e)){t^=n;for(let e=0;e<8;e++)t=t>>>1^(t&1?3988292384:0)}return~t>>>0}function ob(e,t){if(!e.length)return 0;if(t<=e[0].time)return e[0].value;for(let n=1;n<e.length;n+=1){let r=e[n-1],i=e[n];if(t>i.time)continue;let a=i.time-r.time;if(a<=1e-6)return i.value;let o=(t-r.time)/a;return r.value+(i.value-r.value)*o}return e[e.length-1].value}function sb(e){let t=rb(rb(e).motionPackage??rb(e).MotionPackage);return(t.faceMotion??t.FaceMotion)||null}var cb=class{motionSet=null;clip=null;loopClip=null;time=0;error=null;enabled=!0;bindings=[];bind(e,t){let n=t.morphChannels??[],r=t.morphChannelBindings??[],i=[];return this.bindings.length=0,e.traverse(e=>{if(e.userData.pjskOutlineShell||e.userData.pjskEyeThroughHairOverlay||e.userData.pjskEyeThroughHairStencilPrepass||!ib(e))return;let t=e,a=t.morphTargetInfluences?.length??0;if(!a)return;(!t.morphTargetDictionary||!Object.keys(t.morphTargetDictionary).length)&&n.length===a&&(t.morphTargetDictionary=Object.fromEntries(n.map((e,t)=>[e,t])));let o=t.morphTargetDictionary??{},s=new Map,c=[];for(let e of r){let t=o[e.name];typeof t==`number`&&(s.set(e.curveHash,t),c.push(t))}for(let[e,t]of Object.entries(o))s.set(ab(e),t),c.push(t);t.morphTargetInfluences?.fill(0),this.bindings.push({mesh:t,curveIndexByHash:s,controlledIndices:[...new Set(c)]});let l=Object.entries(o).sort((e,t)=>e[1]-t[1]).map(([e])=>e);i.push({meshName:t.name,morphTargetCount:a,mappedChannelCount:new Set(s.values()).size,sampleChannels:l.slice(0,12)})}),i}setMotion(e,t,n){if(this.motionSet=e,this.error=null,this.time=0,this.clip=null,this.loopClip=null,!e?.clips.length){this.clearInfluences();return}let r=t?e.clips.filter(e=>e.name===t):e.clips;if(r.length!==1)throw Error(`Expected exactly one face motion '${t??`<only clip>`}', found ${r.length}.`);if(this.clip=r[0],n&&n!==this.clip.name){let t=e.clips.filter(e=>e.name===n);if(t.length!==1)throw Error(`Expected exactly one face loop '${n}', found ${t.length}.`);this.loopClip=t[0]}this.applyCurrent()}hasMotion(){return this.motionSet!==null}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e,e?this.applyCurrent():this.clearInfluences()}step(e,t,n=!1){if(n||!this.enabled||!this.clip||this.bindings.length===0)return;this.time+=e*t;let r=this.clip.duration;if(r>0&&this.time>r){if(this.loopClip){let e=this.time-r;this.clip=this.loopClip,this.loopClip=null,this.time=this.clip.duration>0?e%this.clip.duration:0}else this.time%=r}this.applyCurrent()}seek(e){this.time=e,this.applyCurrent()}promoteLoop(){this.loopClip&&(this.clip=this.loopClip,this.loopClip=null,this.time=0,this.applyCurrent())}applyCurrent(){if(this.enabled&&this.clip)for(let e of this.bindings){let t=e.mesh.morphTargetInfluences;if(t){for(let n of e.controlledIndices)t[n]=0;for(let n of this.clip.curves){let r=e.curveIndexByHash.get(n.curveHash);r!==void 0&&(t[r]=ob(n.keyframes,this.time)/100)}}}}release(e={}){this.clearInfluences(),this.bindings.length=0,e.preserveMotion||this.setMotion(null,null,null)}getSnapshot(){return{activeClipName:this.clip?.name??null,queuedLoopClipName:this.loopClip?.name??null,error:this.error,currentTime:this.time,mappedMeshCount:this.bindings.length,mappedCurveCount:this.bindings.reduce((e,t)=>e+new Set(t.curveIndexByHash.values()).size,0)}}clearInfluences(){for(let e of this.bindings){let t=e.mesh.morphTargetInfluences;if(t)for(let n of e.controlledIndices)t[n]=0}}};function lb(e,t){return e.toLowerCase()===t.toLowerCase()}function ub(e,t){let n=e?.floatProperties?.find(e=>lb(e.name,t));if(Number.isFinite(n?.value))return n.value;let r=e?.intProperties?.find(e=>lb(e.name,t));return Number.isFinite(r?.value)?r.value:null}function db(e,t,n){let r=ub(e,t);return r===null?n&&(e?.validKeywords?.some(e=>lb(e,n))||e?.invalidKeywords?.some(e=>lb(e,n)))?!0:null:r>.5}function fb(e,t){let n=e?.colorProperties?.find(e=>lb(e.name,t));return!n||!Number.isFinite(n.r)||!Number.isFinite(n.g)||!Number.isFinite(n.b)||!Number.isFinite(n.a)?null:{r:n.r,g:n.g,b:n.b,a:n.a}}function pb(e,t){return e?.textureProperties?.find(e=>lb(e.name,t))??null}function mb(e,t,n){if(!e)return;let r=pb(t,n);r&&(e.repeat.set(r.scaleX,r.scaleY),e.offset.set(r.offsetX,r.offsetY),e.wrapS=hb(r.wrapU),e.wrapT=hb(r.wrapV),e.anisotropy=Math.max(1,r.anisoLevel||1),r.filterMode===0?(e.magFilter=g,e.minFilter=_):(e.magFilter=y,e.minFilter=r.filterMode===2?x:b)),e.updateMatrix(),e.needsUpdate=!0}function hb(e){switch(e){case 1:return m;case 2:return h;case 3:return m;default:return p}}var gb={eye:{opacity:.2,edge1:.9,edge2:.2},eyelash:{opacity:.2,edge1:.9,edge2:.2},eyebrow:{opacity:.5,edge1:.5,edge2:.1},eyelight:{opacity:.2,edge1:.9,edge2:.2}};function _b(){return new W(o.x,o.y,o.z)}function vb(e,t){let n=e.clone();return up(n,{baseColor:t.baseColor??e.uniforms.uBaseColor.value.clone(),shadowColor:t.shadowColor??e.uniforms.uShadowColor.value.clone(),skinColorDefault:t.skinColorDefault??e.uniforms.uSkinColorDefault.value.clone(),skinColor1:t.skinColor1??e.uniforms.uSkinColor1.value.clone(),skinColor2:t.skinColor2??e.uniforms.uSkinColor2.value.clone(),mainTex:t.mainTex??null,shadowTex:t.shadowTex??null,valueTex:t.valueTex??null,useValueTex:t.lighting?.useValueTex??!!t.valueTex,lightDirection:e.uniforms.uLightDirection.value.clone(),lightIntensity:e.uniforms.uLightIntensity.value,ambientIntensity:e.uniforms.uAmbientIntensity.value,shadowThreshold:t.lighting?.sekaiShadowThreshold??e.uniforms.uShadowThreshold.value,shadowWeight:e.uniforms.uShadowWeight.value,characterAmbientIntensity:e.uniforms.uCharacterAmbientIntensity?.value??.3,rimColorAlpha:e.uniforms.uRimColorAlpha?.value??s.rimColorAlpha,controllerRimRange:e.uniforms.uControllerRimRange?.value??s.rimRange,controllerRimEdgeSmoothness:e.uniforms.uControllerRimEdgeSmoothness?.value??s.rimEdgeSmoothness,controllerRimEmission:e.uniforms.uControllerRimEmission?.value??s.rimEmission,controllerRimLightInfluence:e.uniforms.uControllerRimLightInfluence?.value??s.rimLightInfluence,rimDirection:e.uniforms.uRimDirection?.value.clone()??_b(),specularPower:t.lighting?.specularPower??e.uniforms.uSpecularPower.value,rimThreshold:t.lighting?.rimThreshold??e.uniforms.uRimThreshold.value,shadowTexWeight:t.lighting?.shadowTexWeight??e.uniforms.uShadowTexWeight.value,fadeMode:t.lighting?.fadeMode??e.uniforms.uFadeMode?.value??0,hueSinAngle:t.lighting?.hueSinAngle??e.uniforms.uHueSinAngle?.value??0,hueCosAngle:t.lighting?.hueCosAngle??e.uniforms.uHueCosAngle?.value??1,shadowWidth:t.lighting?.shadowWidth??e.uniforms.uShadowWidth.value,shadowWidthOverride:t.shadowWidthOverride??((e.uniforms.uShadowWidthOverride?.value??-1)>=0?e.uniforms.uShadowWidthOverride.value:null),valueShadowInfluence:t.valueShadowInfluence??e.uniforms.uValueShadowInfluence?.value??0,hairShadowEnabled:t.hairShadowEnabled??(e.uniforms.uHairShadowEnabled?.value??0)>.5,useLambert:t.useLambert??t.lighting?.useLambert??(e.uniforms.uUseLambert?.value??1)>.5,headPosition:t.headPosition??e.uniforms.uHeadPosition?.value.clone(),headNormalBlend:t.lighting?.headNormalBlend??e.uniforms.uHeadNormalBlend?.value??.7,saturation:t.lighting?.saturation??e.uniforms.uSaturation.value,value:t.lighting?.value??e.uniforms.uValue?.value??.5,contrast:t.lighting?.contrast??e.uniforms.uContrast?.value??.5,partsAmbientColor:t.lighting?.partsAmbientColor??e.uniforms.uPartsAmbientColor.value.clone(),partsAmbientAlpha:e.uniforms.uPartsAmbientAlpha?.value??0,reflectionBlendColor:t.lighting?.reflectionBlendColor??e.uniforms.uReflectionBlendColor.value.clone(),globalShadowColor:e.uniforms.uGlobalShadowColor?e.uniforms.uGlobalShadowColor.value.clone():`#ffffff`,globalShadowAlpha:e.uniforms.uGlobalShadowAlpha?.value??1,controllerAmbientColor:e.uniforms.uControllerAmbientColor?e.uniforms.uControllerAmbientColor.value.clone():new J().setRGB(s.ambientColor.r,s.ambientColor.g,s.ambientColor.b),controllerAmbientIntensity:e.uniforms.uControllerAmbientIntensity?.value??1,controllerSpecularColor:e.uniforms.uControllerSpecularColor?e.uniforms.uControllerSpecularColor.value.clone():`#ffffff`,controllerSpecularIntensity:e.uniforms.uControllerSpecularIntensity?.value??1,controllerRimColor:e.uniforms.uControllerRimColor?e.uniforms.uControllerRimColor.value.clone():new J().setRGB(s.rimColor.r,s.rimColor.g,s.rimColor.b),controllerShadowRimColor:e.uniforms.uControllerShadowRimColor?e.uniforms.uControllerShadowRimColor.value.clone():new J().setRGB(s.shadowRimColor.r,s.shadowRimColor.g,s.shadowRimColor.b),controllerRimColorWeight:e.uniforms.uControllerRimColorWeight?.value??1,controllerShadowRimColorWeight:e.uniforms.uControllerShadowRimColorWeight?.value??1,controllerRimShadowSharpness:e.uniforms.uControllerRimShadowSharpness?.value??s.rimShadowSharpness,bodyDebugMode:t.bodyDebugMode??e.uniforms.uBodyDebugMode?.value??0,alphaCutoff:t.alphaCutoff??e.uniforms.uAlphaCutoff?.value??0}),n}async function yb(e,t,n=nt){if(!t)return null;let r=`${n}\u0000${t}`,i=bb.get(e);i||(i=new Map,bb.set(e,i));let a=i.get(r);if(a)return a;let o=e.loadAsync(t).then(e=>(e.wrapS=p,e.wrapT=p,e.flipY=!1,e.colorSpace=n,e.needsUpdate=!0,e)).finally(()=>{i.get(r)===o&&i.delete(r)});return i.set(r,o),o}var bb=new WeakMap;function xb(e){return e.map??null}function Sb(e,t){if(!t)return;let n=e=>{e&&(e.wrapS=t.wrapS,e.wrapT=t.wrapT,e.offset.copy(t.offset),e.repeat.copy(t.repeat),e.center.copy(t.center),e.rotation=t.rotation,e.magFilter=t.magFilter,e.minFilter=t.minFilter,e.anisotropy=t.anisotropy,e.flipY=t.flipY,e.updateMatrix(),e.needsUpdate=!0)};if(e instanceof ni)n(e.map);else if(e instanceof ea){let t=e.uniforms.uMainTex?.value;n(t),t&&e.uniforms.uMainTexTransform?.value instanceof G&&e.uniforms.uMainTexTransform.value.copy(t.matrix)}}function Cb(e){let t=e.toLowerCase();return t.includes(`face`)?`face`:t.includes(`hair`)?`hair`:t.includes(`acc`)?`acc`:t.includes(`body`)?`body`:t}function wb(e,t,n){if(!t)return;let r=(e,t)=>ub(n,e)??t,i=(e,t,r)=>db(n,e,t)??r,a=e=>Math.round(V.clamp(e,0,1)*255).toString(16).padStart(2,`0`),o=(e,t)=>{let r=fb(n,e);return r?`#${a(r.r)}${a(r.g)}${a(r.b)}`:t};return{...t,specularPower:r(`_SpecularPower`,t.specularPower),rimThreshold:r(`_RimThreshold`,t.rimThreshold),shadowTexWeight:r(`_ShadowTexWeight`,t.shadowTexWeight),fadeMode:r(`_FadeMode`,t.fadeMode),hueSinAngle:r(`_HueSinAngle`,t.hueSinAngle),hueCosAngle:r(`_HueCosAngle`,t.hueCosAngle),saturation:r(`_Saturation`,t.saturation),value:r(`_Value`,t.value),contrast:r(`_Contrast`,t.contrast),partsAmbientColor:o(`_PartsAmbientColor`,t.partsAmbientColor),reflectionBlendColor:o(`_ReflectionBlendColor`,t.reflectionBlendColor),outlineWidth:r(`_OutlineWidth`,t.outlineWidth),outlineOffset:r(`_OutlineOffset`,t.outlineOffset),outlineLightness:r(`_OutlineL`,t.outlineLightness),shadowWidth:r(`_ShadowWidth`,t.shadowWidth),useOutlineSecondNormal:ub(n,`_UseOutlineSecondNormal`)??(db(n,`_UseOutlineSecondNormal`,`_OUTLINE_SECOND_NORMAL`)===!0?1:t.useOutlineSecondNormal),sekaiShadowThreshold:ub(n,`_SekaiShadowThreshold`)??t.sekaiShadowThreshold,useLambert:i(`_UseLambert`,`_LAMBERT`,t.useLambert),useValueTex:i(`_UseValueTex`,void 0,t.useValueTex),useFaceSdf:i(`_UseFaceSDF`,`_USE_FACE_SDF`,t.useFaceSdf),useFaceShadowLimiter:i(`_UseFaceShadowLimiter`,`_FACE_SHADOW_RANGE_LIMIT`,t.useFaceShadowLimiter),rangeLimit:ub(n,`_RangeLimit`)??t.rangeLimit,hairShadow:i(`_HairShadow`,`_HAIR_SHADOW`,t.hairShadow),headNormalBlend:r(`_HeadNormalBlend`,t.headNormalBlend??.7)}}function Tb(e,t){if(!(e instanceof ea)||!t)return;let n=e.uniforms,r=(e,r)=>{let i=ub(t,r);i!==null&&n[e]&&(n[e].value=i)},i=(e,r,i)=>{let a=fb(t,r);a&&(n[e]?.value?.setRGB(a.r,a.g,a.b),i&&n[i]&&(n[i].value=a.a))};i(`uPartsAmbientColor`,`_PartsAmbientColor`,`uPartsAmbientAlpha`),i(`uReflectionBlendColor`,`_ReflectionBlendColor`),i(`uSkinColorDefault`,`_DefaultSkinColor`),i(`uSkinColor1`,`_Shadow1SkinColor`),i(`uSkinColor2`,`_Shadow2SkinColor`),r(`uUseLambert`,`_UseLambert`),r(`uUseValueTex`,`_UseValueTex`),r(`uHeadNormalBlend`,`_HeadNormalBlend`);let a=db(t,`_UseAlphaClip`,`_ALPHATEST_ON`);a!==null&&n.uAlphaCutoff&&(n.uAlphaCutoff.value=a?V.clamp(ub(t,`_Cutoff`)??.5,0,1):0)}function Eb(e){e.stencilWrite=!0,e.stencilRef=0,e.stencilFunc=519,e.stencilFuncMask=255,e.stencilWriteMask=255,e.stencilFail=ot,e.stencilZFail=ot,e.stencilZPass=st}function Db(e,t,n,r){if(e.side=0,e.transparent=!0,e.stencilWrite=!0,e.stencilRef=t,e.stencilFunc=514,e.stencilFuncMask=t,e.stencilWriteMask=t,e.stencilFail=ot,e.stencilZFail=ot,e.stencilZPass=ot,e.depthTest=!0,e.depthWrite=!1,e.depthFunc=1,e.blending=5,e.blendSrc=204,e.blendDst=205,e.blendEquation=100,e.blendSrcAlpha=200,e.blendDstAlpha=201,e.blendEquationAlpha=100,e.polygonOffset=!1,n){let t=gb[n],i=(e,t)=>ub(r,e)??fb(r,e)?.r??t,a={opacity:i(`_EyelashTransparent`,t.opacity),edge1:i(`_EyelashFaceCameraEdge1`,t.edge1),edge2:i(`_EyelashFaceCameraEdge2`,t.edge2)};e.userData.pjskSekaiEyelashViewSettings={...a},e instanceof ea&&e.uniforms.uAlphaScale&&(e.uniforms.uAlphaScale.value=a.opacity),e instanceof ea&&e.uniforms.uAlphaSource&&(e.uniforms.uAlphaSource.value=n===`eyelight`?2:1)}}function Ob(e,t){let n=e.userData.pjskSekaiEyelashViewSettings;if(!n)return null;let r=n.edge1-n.edge2,i=r===0?+(t>=n.edge1):V.clamp((t-n.edge2)/r,0,1),a=i*i*(3-2*i)*n.opacity;return e instanceof ea&&e.uniforms.uAlphaScale&&(e.uniforms.uAlphaScale.value=a),a}function kb(e,t){e.transparent=!1,e.colorWrite=!1,e.stencilWrite=!0,e.stencilRef=t,e.stencilFunc=519,e.stencilFuncMask=255,e.stencilWriteMask=t,e.stencilFail=ot,e.stencilZFail=ot,e.stencilZPass=st,e.depthTest=!0,e.depthWrite=!1,e.depthFunc=3}function Ab(e,t){e.stencilWrite=!0,e.stencilRef=0,e.stencilFunc=519,e.stencilFuncMask=255,e.stencilWriteMask=255&~t,e.stencilFail=ot,e.stencilZFail=ot,e.stencilZPass=st}function jb(e){switch(e){case`face_sdf`:case`face`:case`accessory`:case`body`:case`eyelight`:return 2e3;case`eye_stencil_prepass`:return 2001;case`eyelash_stencil_prepass`:return 2001.1;case`eyebrow_stencil_prepass`:return 2001.2;case`eyelash`:case`eyebrow`:return 2001;case`eye`:return 2002;case`hair`:return 2451;case`eye_through_hair`:return 2452;case`eyelash_through_hair`:return 2453;case`eyebrow_through_hair`:return 2454;case`eyelight_through_hair`:return 2455;default:return 2e3}}function Mb(e,t){if(t.length<2||e.geometry.groups.length<2)return;let n=e.geometry.groups.map((e,n)=>{let r=t[e.materialIndex??0],i=typeof r?.userData.pjskMaterialKind==`string`?r.userData.pjskMaterialKind:``;return{start:e.start,count:e.count,materialIndex:e.materialIndex??0,order:jb(i),index:n}}).sort((e,t)=>e.order-t.order||e.index-t.index);e.geometry.clearGroups();for(let t of n)e.geometry.addGroup(t.start,t.count,t.materialIndex)}function Nb(e,t,n,r){if(t.length===0||n.length===0)return null;let i=e.geometry.clone();i.clearGroups();for(let e of t)i.addGroup(e.start,e.count,e.materialIndex);let a=e,o=a.isSkinnedMesh?new Ei(i,n):new mi(i,n);if(o.name=`${e.name}_${r}`,o.position.copy(e.position),o.quaternion.copy(e.quaternion),o.scale.copy(e.scale),o.matrix.copy(e.matrix),o.matrixAutoUpdate=e.matrixAutoUpdate,o.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,o.layers.mask=e.layers.mask,o.visible=e.visible,o.renderOrder=Math.min(...n.map(e=>jb(typeof e.userData.pjskMaterialKind==`string`?e.userData.pjskMaterialKind:``))),o.frustumCulled=e.frustumCulled,o.castShadow=!1,o.receiveShadow=!1,o.morphTargetDictionary=e.morphTargetDictionary,o.morphTargetInfluences=e.morphTargetInfluences,Mb(o,n),o.isSkinnedMesh&&a.isSkinnedMesh){let e=o;e.bind(a.skeleton,a.bindMatrix),e.bindMode=a.bindMode,e.bindMatrix.copy(a.bindMatrix),e.bindMatrixInverse.copy(a.bindMatrixInverse)}return o}function Pb(e,t,n){let r=Nb(e,t,n,`through_hair_overlay`);if(!r)return null;let i=typeof n[0]?.userData.pjskMaterialKind==`string`?n[0].userData.pjskMaterialKind:``,a=i.startsWith(`eyelash_`)?`eyelash`:i.startsWith(`eyebrow_`)?`eyebrow`:i.startsWith(`eyelight_`)?`eyelight`:i.startsWith(`eye_`)?`eye`:``;return r.userData.pjskEyeThroughHairSource=e,r.userData.pjskEyeThroughHairSourceKind=a,r.userData.pjskEyeThroughHairPassKind=`overlay`,r.userData.pjskEyeThroughHairOverlay=!0,r}async function Fb({root:e,bodyAsset:t,headAsset:n,textureLoader:r,template:i,bodyDebugMode:a,debug:o=[]}){let s=await Promise.all(t.bodyMaterials.map(async e=>{if(!e.materialKind)throw Error(`Body material ${e.materialName??e.materialKey} is missing materialKind.`);let[o,s,c]=await Promise.all([yb(r,e.mainTex),yb(r,e.shadowTex),yb(r,e.valueTex,``)]);mb(o,e.rawMaterial,`_MainTex`),mb(s,e.rawMaterial,`_ShadowTex`),mb(c,e.rawMaterial,`_ValueTex`);let l=wb(e.materialKind,e.lighting,e.rawMaterial),u=vb(i,{mainTex:o,shadowTex:s,valueTex:c,baseColor:t.proxy.bodyColor,shadowColor:t.proxy.shadowColor,skinColorDefault:n?.proxy.skinColorDefault??n?.proxy.faceColor??t.proxy.bodyColor,skinColor1:n?.proxy.skinColor1??n?.proxy.faceShadeColor??t.proxy.shadowColor,skinColor2:n?.proxy.skinColor2??n?.proxy.faceShadeColor??t.proxy.shadowColor,lighting:l,bodyDebugMode:a});return Tb(u,e.rawMaterial),Eb(u),u.userData.pjskLighting=l,u.userData.pjskRawMaterial=e.rawMaterial,u.userData.pjskMaterialKind=e.materialKind,u.userData.pjskMaterialKey=e.materialKey,u.userData.pjskMaterialSlotIndex=e.slotIndex,{key:e.materialKey,meshKey:Cb(e.meshName),materialKey:e.materialKey,materialKind:e.materialKind,mainTex:e.mainTex??null,shadowTex:e.shadowTex??null,valueTex:e.valueTex??null,material:u}}));return e.traverse(e=>{let t=e;if(!t.isMesh)return;let n=Array.isArray(t.material)?t.material:[t.material],r=s.filter(e=>e.meshKey===Cb(t.name));if(r.length===0)return;let i=n.map(e=>{let n=typeof e.userData.pjskMaterialKey==`string`?e.userData.pjskMaterialKey:``;if(!n)throw Error(`Body mesh '${t.name}' material '${e.name}' is missing pjskMaterialKey; regenerate it with Haruki-3D-Exporter materialKey runtime support.`);let i=r.find(e=>e.materialKey===n);if(!i)throw Error(`Body mesh '${t.name}' material key '${n}' was not found in body material slots.`);let a=xb(e);Sb(i.material,a),t.userData.pjskMaterialKind=i.materialKind;let s=!1;!i.material.uniforms.uMainTex.value&&a&&(i.material.uniforms.uMainTex.value=a,i.material.uniforms.uMainTexTransform.value.copy(a.matrix),i.material.uniforms.uUseMainTex.value=1,i.material.uniforms.uBaseColor.value.set(`#ffffff`),s=!0);let c=i.material.uniforms;return o.push({meshName:t.name,sourceMaterialName:e.name,resolvedKey:i.key,resolvedKind:i.materialKind,usedOriginalMap:s,boundMainTex:i.mainTex,boundShadowTex:i.shadowTex,boundValueTex:i.valueTex,boundFaceShadowTex:null,finalMaterialType:i.material.type,shaderHasMainTex:c.uUseMainTex?.value??null,shaderHasShadowTex:c.uUseShadowTex?.value??null,shaderHasValueTex:c.uUseValueTex?.value??null,shaderLightDirectionX:c.uLightDirection?.value?.x??null,shaderLightDirectionY:c.uLightDirection?.value?.y??null,shaderLightDirectionZ:c.uLightDirection?.value?.z??null,shaderShadowThreshold:c.uShadowThreshold?.value??null,shaderShadowWeight:c.uShadowWeight?.value??null,shaderShadowWidthOverride:c.uShadowWidthOverride?.value??null,shaderValueShadowInfluence:c.uValueShadowInfluence?.value??null,shaderLambertEnabled:c.uUseLambert?.value??null,shaderHeadNormalBlend:c.uHeadNormalBlend?.value??null,shaderSpecularPower:c.uSpecularPower?.value??null,shaderRimThreshold:c.uRimThreshold?.value??null,shaderControllerRimRange:c.uControllerRimRange?.value??null,shaderControllerRimEdgeSmoothness:c.uControllerRimEdgeSmoothness?.value??null,shaderRimColorAlpha:c.uRimColorAlpha?.value??null,shaderControllerRimEmission:c.uControllerRimEmission?.value??null,shaderControllerRimLightInfluence:c.uControllerRimLightInfluence?.value??null,shaderCharacterAmbient:c.uCharacterAmbientIntensity?.value??null,shaderShadowTexWeight:c.uShadowTexWeight?.value??null,shaderSaturation:c.uSaturation?.value??null,shaderPartsAmbientAlpha:c.uPartsAmbientAlpha?.value??null,shaderSkinColorDefault:c.uSkinColorDefault?.value?`#${c.uSkinColorDefault.value.getHexString(rt)}`:null,shaderSkinColor1:c.uSkinColor1?.value?`#${c.uSkinColor1.value.getHexString(rt)}`:null,shaderSkinColor2:c.uSkinColor2?.value?`#${c.uSkinColor2.value.getHexString(rt)}`:null,shaderBodyDebugMode:c.uBodyDebugMode?.value??null}),i.material}),a=new Set(i);n.forEach(e=>{a.has(e)||e.dispose()}),t.material=Array.isArray(t.material)?i:i[0],t.castShadow=!1,t.receiveShadow=!1}),o}var Ib=1,Lb=.02,Rb=.02;function zb(e,t,n,r,i,a,o){let s=r.material instanceof ea?r.material.uniforms:null;e.push({meshName:t.name,sourceMaterialName:n.name,resolvedKey:r.key,resolvedKind:r.materialKind,usedOriginalMap:i,boundMainTex:r.mainTex,boundShadowTex:r.shadowTex,boundValueTex:r.valueTex,boundFaceShadowTex:r.faceShadowTex,finalMaterialType:r.material.type,shaderHasMainTex:s?.uUseMainTex?.value??null,shaderHasShadowTex:s?.uUseShadowTex?.value??null,shaderHasFaceShadowTex:s?.uUseFaceShadowTex?.value??null,shaderHasValueTex:s?.uUseValueTex?.value??null,shaderLightDirectionX:s?.uLightDirection?.value?.x??null,shaderLightDirectionY:s?.uLightDirection?.value?.y??null,shaderLightDirectionZ:s?.uLightDirection?.value?.z??null,shaderShadowThreshold:s?.uShadowThreshold?.value??null,shaderShadowWeight:s?.uShadowWeight?.value??null,shaderShadowWidthOverride:s?.uShadowWidthOverride?.value??null,shaderValueShadowInfluence:s?.uValueShadowInfluence?.value??null,shaderHairShadowEnabled:r.materialKind===`hair`?s?.uHairShadowEnabled?.value??null:null,shaderHeadNormalBlend:r.materialKind===`hair`?s?.uHeadNormalBlend?.value??null:null,shaderLambertEnabled:s?.uUseLambert?.value??null,shaderBodyDebugMode:s?.uBodyDebugMode?.value??null,shaderSpecularPower:s?.uSpecularPower?.value??null,shaderRimThreshold:s?.uRimThreshold?.value??null,shaderControllerRimRange:s?.uControllerRimRange?.value??null,shaderControllerRimEdgeSmoothness:s?.uControllerRimEdgeSmoothness?.value??null,shaderRimColorAlpha:s?.uRimColorAlpha?.value??null,shaderControllerRimEmission:s?.uControllerRimEmission?.value??null,shaderControllerRimLightInfluence:s?.uControllerRimLightInfluence?.value??null,shaderCharacterAmbient:s?.uCharacterAmbientIntensity?.value??null,shaderShadowTexWeight:s?.uShadowTexWeight?.value??null,shaderSaturation:s?.uSaturation?.value??null,shaderPartsAmbientAlpha:s?.uPartsAmbientAlpha?.value??null,shaderSkinColorDefault:s?.uSkinColorDefault?.value?`#${s.uSkinColorDefault.value.getHexString(rt)}`:null,shaderSkinColor1:s?.uSkinColor1?.value?`#${s.uSkinColor1.value.getHexString(rt)}`:null,shaderSkinColor2:s?.uSkinColor2?.value?`#${s.uSkinColor2.value.getHexString(rt)}`:null,shaderFaceDebugMode:s?.uFaceDebugMode?.value??null,shaderFaceSdfEnabled:s?.uFaceSdfEnabled?.value??null,faceSdfCapable:a,faceSdfUv1Available:o,shaderAtlasTileX:s?.uAtlasTile?.value?.x??null,shaderAtlasTileY:s?.uAtlasTile?.value?.y??null,shaderAtlasSample:s?.uAtlasSample?.value??null,shaderUseAtlas:s?.uUseAtlas?.value??null,shaderAlphaScale:s?.uAlphaScale?.value??null,shaderAlphaCutoff:s?.uAlphaCutoff?.value??null,shaderStrictAlpha:s?.uStrictAlpha?.value??null,shaderStencilWrite:r.material.stencilWrite??null,shaderStencilRef:r.material.stencilRef??null,shaderStencilFunc:r.material.stencilFunc??null,shaderStencilFuncMask:r.material.stencilFuncMask??null,shaderStencilWriteMask:r.material.stencilWriteMask??null,shaderStencilZPass:r.material.stencilZPass??null,shaderDepthFunc:r.material.depthFunc??null,shaderDepthWrite:r.material.depthWrite??null,shaderTransparent:r.material.transparent??null,renderOrder:t.renderOrder})}function Bb(e,t,n,r,i=!0){let a=r instanceof ea?r.uniforms:null;e.push({meshName:t,sourceMaterialName:n,resolvedKey:null,resolvedKind:typeof r.userData.pjskMaterialKind==`string`?r.userData.pjskMaterialKind:null,usedOriginalMap:!1,boundMainTex:null,boundShadowTex:null,boundValueTex:null,boundFaceShadowTex:null,finalMaterialType:r.type,shaderHasMainTex:a?.uUseMainTex?.value??null,...i?{shaderAtlasTileX:a?.uAtlasTile?.value?.x??null,shaderAtlasTileY:a?.uAtlasTile?.value?.y??null,shaderAtlasSample:a?.uAtlasSample?.value??null}:{},shaderUseAtlas:a?.uUseAtlas?.value??null,shaderAlphaScale:a?.uAlphaScale?.value??null,shaderAlphaCutoff:a?.uAlphaCutoff?.value??null,shaderStrictAlpha:a?.uStrictAlpha?.value??null,shaderStencilWrite:r.stencilWrite??null,shaderStencilRef:r.stencilRef??null,shaderStencilFunc:r.stencilFunc??null,shaderStencilFuncMask:r.stencilFuncMask??null,shaderStencilWriteMask:r.stencilWriteMask??null,shaderStencilZPass:r.stencilZPass??null,shaderDepthFunc:r.depthFunc??null,shaderDepthWrite:r.depthWrite??null,shaderTransparent:r.transparent??null,renderOrder:jb(typeof r.userData.pjskMaterialKind==`string`?r.userData.pjskMaterialKind:``)})}function Vb(e,t){let n=e.clone();return Cp(n,{baseColor:t.baseColor??e.uniforms.uBaseColor.value.clone(),warmColor:t.warmColor??e.uniforms.uWarmColor.value.clone(),skinColorDefault:t.skinColorDefault??e.uniforms.uSkinColorDefault.value.clone(),skinColor1:t.skinColor1??e.uniforms.uSkinColor1.value.clone(),skinColor2:t.skinColor2??e.uniforms.uSkinColor2.value.clone(),mainTex:t.mainTex??null,shadowTex:t.shadowTex??null,valueTex:t.valueTex??null,faceShadowTex:t.faceShadowTex??null,lightDirection:e.uniforms.uLightDirection.value.clone(),lightIntensity:e.uniforms.uLightIntensity.value,ambientIntensity:e.uniforms.uAmbientIntensity.value,headDotDirectionalLight:e.uniforms.uHeadDotDirectionalLight?.value,faceDebugMode:e.uniforms.uFaceDebugMode?.value??0,faceSdfEnabled:!1,useValueTex:t.lighting?.useValueTex??!!t.valueTex,shadowThreshold:t.lighting?.sekaiShadowThreshold??e.uniforms.uShadowThreshold?.value??.5,shadowWeight:e.uniforms.uShadowWeight?.value??1,shadowWidth:t.lighting?.shadowWidth??e.uniforms.uShadowWidth?.value??0,fadeMode:t.lighting?.fadeMode??e.uniforms.uFadeMode?.value??0,useLambert:t.lighting?.useLambert??!0,shadowTexWeight:t.lighting?.shadowTexWeight??e.uniforms.uShadowTexWeight?.value??1,useFaceShadowLimiter:t.lighting?.useFaceShadowLimiter??(e.uniforms.uUseFaceShadowLimiter?.value??1)>.5,faceShadowLimitRange:t.lighting?.rangeLimit??e.uniforms.uFaceShadowLimitRange?.value??0,hueSinAngle:t.lighting?.hueSinAngle??e.uniforms.uHueSinAngle?.value??0,hueCosAngle:t.lighting?.hueCosAngle??e.uniforms.uHueCosAngle?.value??1,saturation:t.lighting?.saturation??e.uniforms.uSaturation?.value??.5,value:t.lighting?.value??e.uniforms.uValue?.value??.5,contrast:t.lighting?.contrast??e.uniforms.uContrast?.value??.5,partsAmbientColor:t.lighting?.partsAmbientColor??(e.uniforms.uPartsAmbientColor?e.uniforms.uPartsAmbientColor.value.clone():`#ffffff`),partsAmbientAlpha:e.uniforms.uPartsAmbientAlpha?.value??0,controllerAmbientColor:e.uniforms.uControllerAmbientColor?e.uniforms.uControllerAmbientColor.value.clone():new J().setRGB(s.ambientColor.r,s.ambientColor.g,s.ambientColor.b),controllerAmbientIntensity:e.uniforms.uControllerAmbientIntensity?.value??1,controllerSpecularColor:e.uniforms.uControllerSpecularColor?e.uniforms.uControllerSpecularColor.value.clone():new J().setRGB(s.specularColor.r,s.specularColor.g,s.specularColor.b),controllerSpecularIntensity:e.uniforms.uControllerSpecularIntensity?.value??1,controllerRimColor:e.uniforms.uControllerRimColor?e.uniforms.uControllerRimColor.value.clone():new J().setRGB(s.rimColor.r,s.rimColor.g,s.rimColor.b),controllerShadowRimColor:e.uniforms.uControllerShadowRimColor?e.uniforms.uControllerShadowRimColor.value.clone():new J().setRGB(s.shadowRimColor.r,s.shadowRimColor.g,s.shadowRimColor.b),controllerRimColorWeight:e.uniforms.uControllerRimColorWeight?.value??1,controllerShadowRimColorWeight:e.uniforms.uControllerShadowRimColorWeight?.value??1,controllerRimRange:e.uniforms.uControllerRimRange?.value??s.rimRange,controllerRimEdgeSmoothness:e.uniforms.uControllerRimEdgeSmoothness?.value??s.rimEdgeSmoothness,controllerRimEmission:e.uniforms.uControllerRimEmission?.value??s.rimEmission,controllerRimLightInfluence:e.uniforms.uControllerRimLightInfluence?.value??s.rimLightInfluence,controllerRimShadowSharpness:e.uniforms.uControllerRimShadowSharpness?.value??s.rimShadowSharpness,rimColorAlpha:e.uniforms.uRimColorAlpha?.value??s.rimColorAlpha,rimDirection:e.uniforms.uRimDirection?.value.clone(),specularPower:t.lighting?.specularPower??e.uniforms.uSpecularPower?.value??0,rimThreshold:t.lighting?.rimThreshold??e.uniforms.uRimThreshold?.value??.2,globalShadowColor:e.uniforms.uGlobalShadowColor?e.uniforms.uGlobalShadowColor.value.clone():`#ffffff`,globalShadowAlpha:e.uniforms.uGlobalShadowAlpha?.value??1}),n}function Hb(e,t){let n=new Set(t);for(let t of e)n.has(t)||t.dispose()}function Ub(e){return!!e.geometry?.getAttribute(`uv1`)}function Wb(e,t){return{tintColor:e?.tintColor,emissionColor:e?.emissionColor,lightInfluence:e?.lightInfluence??t?.lightInfluence,distortionFps:t?.distortionFps,distortionIntensity:t?.distortionIntensity,distortionIntensityX:t?.distortionIntensityX,distortionIntensityY:t?.distortionIntensityY,distortionOffsetX:t?.distortionOffsetX,distortionOffsetY:t?.distortionOffsetY,distortionScrollSpeed:t?.distortionScrollSpeed,distortionScrollX:t?.distortionScrollX,distortionScrollY:t?.distortionScrollY,distortionTexTilingX:t?.distortionTexTilingX,distortionTexTilingY:t?.distortionTexTilingY,threshold:t?.threshold}}function Gb(e,t){return{...Wb(e,t),highlightInfluence:e?.lightInfluenceForEyeHighlight??t?.lightInfluenceForEyeHighlight}}function Kb(e,t,n,r,i,a,o,s){let{mainTex:c,shadowTex:l,valueTex:u,faceShadowTex:d}=t,f=e.materialKind,p,m=null,h=null;if(f===`eye`){let t=Wb(o,s);p=Op(c,`eye`,o?.baseTiling,{...t,strictAlpha:!0}),p.side=0;let n=Op(c,`eye`,o?.baseTiling,t);n.side=0,kb(n,Ib),n.userData.pjskMaterialKind=`eye_stencil_prepass`;let r=Op(c,`eye`,o?.baseTiling,{...t,strictAlpha:!0});r.side=0,Db(r,Ib,`eye`,e.rawMaterial),r.userData.pjskMaterialKind=`eye_through_hair`,p.userData.pjskOverlayMaterial=r,p.userData.pjskStencilPrepassMaterial=n}else if(f===`eyelight`){let t=Gb(o,s);m=Op(c,`eyelight`,o?.highlightTiling,t),m.side=0,p=m.clone(),p.visible=!1,p.colorWrite=!1,p.depthWrite=!1;let n=Op(c,`eyelight`,o?.highlightTiling,t);n.side=0,Db(n,Ib,`eyelight`,e.rawMaterial),n.userData.pjskMaterialKind=`eyelight_through_hair`,p.userData.pjskOverlayMaterial=n}else if(f===`eyelash`||f===`eyebrow`){p=Op(c,`alpha`,null,{vertexBViewOffset:.015}),h=qb(t,n,r.face,s),p.side=0;let i=Op(c,`alpha`,null,{strictAlpha:!0});i.side=0,kb(i,Ib),i.userData.pjskMaterialKind=`${f}_stencil_prepass`;let a=Op(c,`alpha`,null,{strictAlpha:!0});a.side=0,Db(a,Ib,f,e.rawMaterial),a.userData.pjskMaterialKind=`${f}_through_hair`,p.userData.pjskOverlayMaterial=a,p.userData.pjskStencilPrepassMaterial=i}else if(f===`hair`)p=vb(r.hair,{mainTex:c,shadowTex:l,valueTex:u,baseColor:n.proxy.hairColor,shadowColor:n.proxy.hairShadowColor,lighting:s,hairShadowEnabled:a.proximityShadowEnabled&&a.controllerPresent&&s?.hairShadow===!0,useLambert:a.controllerPresent?!0:s?.useLambert??!0,headPosition:a.headPosition,bodyDebugMode:i.bodyDebugMode,alphaCutoff:Lb}),Ab(p,Ib);else if(f===`accessory`||f===`body`)p=vb(r.body,{mainTex:c,shadowTex:l,valueTex:u,baseColor:n.proxy.skinColorDefault??n.proxy.faceColor,shadowColor:n.proxy.skinColor1??n.proxy.faceShadeColor,skinColorDefault:n.proxy.skinColorDefault??n.proxy.faceColor,skinColor1:n.proxy.skinColor1??n.proxy.faceShadeColor,skinColor2:n.proxy.skinColor2??n.proxy.faceShadeColor,lighting:s,bodyDebugMode:i.bodyDebugMode,alphaCutoff:f===`accessory`?Rb:0}),Eb(p);else if(f===`face`||f===`face_sdf`){let e=qb(t,n,r.face,s);e.uniforms.uFaceDebugMode&&(e.uniforms.uFaceDebugMode.value=i.faceDebugMode),e.side=0,Eb(e),p=e}else throw Error(`Head material ${e.materialName??e.materialKey} has unsupported materialKind '${f}'.`);return{material:p,topLayerMaterial:m,outlineSourceMaterial:h}}function qb(e,t,n,r){return Vb(n,{...e,baseColor:t.proxy.faceColor,warmColor:t.proxy.faceShadeColor,skinColorDefault:t.proxy.skinColorDefault??t.proxy.faceColor,skinColor1:t.proxy.skinColor1??t.proxy.faceShadeColor,skinColor2:t.proxy.skinColor2??t.proxy.faceShadeColor,lighting:r})}function Jb(e,t,n,r,i,a,o){let s=typeof t.userData.pjskMaterialKey==`string`?t.userData.pjskMaterialKey:``;if(!s)throw Error(`Head mesh '${e.name}' material '${t.name}' is missing pjskMaterialKey; regenerate it with Haruki-3D-Exporter materialKey runtime support.`);let c=r.find(e=>e.materialKey===s);if(!c)throw Error(`Head mesh '${e.name}' material key '${s}' was not found in head material slots.`);let l=xb(t);Yb(c,l);let u=Xb(c,l);e.renderOrder=jb(c.materialKind),e.userData.pjskMaterialKind=c.materialKind;let d=Ub(e),f=c.material.userData.pjskLighting,p=c.materialKind===`face_sdf`&&!!c.faceShadowTex&&f?.useFaceSdf!==!1;return Qb(c.material,{faceSdfEnabled:i},p,d),o[n]=c,zb(a,e,t,c,u,p,d),c.material}function Yb(e,t){Sb(e.material,t);for(let n of[e.overlayMaterial,e.stencilPrepassMaterial,e.topLayerMaterial])n&&Sb(n,t)}function Xb(e,t){if(e.material instanceof ea&&!e.material.uniforms.uMainTex.value&&t){Zb(e.material,t);for(let n of[e.overlayMaterial,e.stencilPrepassMaterial,e.topLayerMaterial])n instanceof ea&&Zb(n,t);return`uBaseColor`in e.material.uniforms&&e.material.uniforms.uBaseColor.value.set(`#ffffff`),!0}return e.material instanceof ni&&!e.material.map&&t?(e.material.map=t,e.material.needsUpdate=!0,!0):!1}function Zb(e,t){e.uniforms.uMainTex.value=t,e.uniforms.uMainTexTransform&&(e.uniforms.uMainTexTransform.value=t.matrix),e.uniforms.uUseMainTex.value=1}function Qb(e,t,n,r){if(!(e instanceof ea)||!e.uniforms.uFaceShadowTex)return;let i=e.uniforms;e.userData.pjskFaceSdfCapable=n,e.userData.pjskFaceSdfUv1Available=r,i.uFaceSdfEnabled.value=t.faceSdfEnabled&&n?1:0}function $b(e,t,n,r,i){let a={materials:[],groups:[]},o={materials:[],groups:[]},s={materials:[],groups:[]};for(let c of e){let e=t[c.materialIndex];ex(a,c,e?.topLayerMaterial??null),ex(o,c,e?.overlayMaterial??null),ex(s,c,e?.stencilPrepassMaterial??null);let l=n[c.materialIndex]?.name??``;e?.topLayerMaterial&&Bb(i,r,l,e.topLayerMaterial),e?.stencilPrepassMaterial&&Bb(i,r,l,e.stencilPrepassMaterial,!1),e?.overlayMaterial&&Bb(i,r,l,e.overlayMaterial)}return{top:a,overlay:o,stencil:s}}function ex(e,t,n){if(!n)return;let r=e.materials.length;e.materials.push(n),e.groups.push({start:t.start,count:t.count,materialIndex:r})}function tx(e,t,n,r){for(let i of t.groups){let a=t.materials[i.materialIndex];if(!a)continue;let o=Pb(e,[{start:i.start,count:i.count,materialIndex:0}],[a]);o&&e.parent&&(n===`stencil_prepass`&&(o.name=`${e.name}_eye_stencil_prepass`,o.userData.pjskEyeThroughHairPassKind=n,o.userData.pjskEyeThroughHairStencilPrepass=!0,o.userData.pjskEyeThroughHairOverlay=!1),r.push({parent:e.parent,mesh:o}))}}function nx(e,t,n){for(let r of t.groups){let i=t.materials[r.materialIndex];if(!i)continue;let a=Nb(e,[{start:r.start,count:r.count,materialIndex:0}],[i],`eyelight_top_layer`);a&&e.parent&&(a.userData.pjskTopLayerSource=e,a.userData.pjskMaterialKind=typeof i.userData.pjskMaterialKind==`string`?i.userData.pjskMaterialKind:null,n.push({parent:e.parent,mesh:a}))}}async function rx({root:e,headAsset:t,textureLoader:n,templates:r,view:i,hair:a,eyeController:o,debug:s=[]}){let c=[],l=[],u=[],d=await Promise.all(t.faceMaterials.map(async e=>{let[s,c,l,u]=await Promise.all([yb(n,e.mainTex),yb(n,e.shadowTex),yb(n,e.valueTex,``),yb(n,e.faceShadowTex,``)]);if(mb(s,e.rawMaterial,`_MainTex`),mb(c,e.rawMaterial,`_ShadowTex`),mb(l,e.rawMaterial,`_ValueTex`),mb(u,e.rawMaterial,`_FaceShadowTex`),!e.materialKind)throw Error(`Head material ${e.materialName??e.materialKey} is missing materialKind.`);let d=e.materialKind,f=!!e.isAccessory||d===`accessory`,p=wb(d,e.lighting,e.rawMaterial),{material:m,topLayerMaterial:h,outlineSourceMaterial:g}=Kb(e,{mainTex:s,shadowTex:c,valueTex:l,faceShadowTex:u},t,r,i,a,o,p);return Tb(m,e.rawMaterial),g&&(Tb(g,e.rawMaterial),m.userData.pjskOutlineSourceMaterial=g),m.userData.pjskLighting=p,m.userData.pjskRawMaterial=e.rawMaterial,m.userData.pjskMaterialKind=d,m.userData.pjskIsAccessory=f,m.userData.pjskMaterialKey=e.materialKey,m.userData.pjskMaterialSlotIndex=e.slotIndex,h&&(h.userData.pjskLighting=p,h.userData.pjskRawMaterial=e.rawMaterial,h.userData.pjskMaterialKind=d,h.userData.pjskIsAccessory=f,h.userData.pjskMaterialKey=e.materialKey,h.userData.pjskMaterialSlotIndex=e.slotIndex),{key:e.materialKey,meshKey:Cb(e.meshName),materialKey:e.materialKey,materialKind:d,mainTex:e.mainTex??null,shadowTex:e.shadowTex??null,valueTex:e.valueTex??null,faceShadowTex:e.faceShadowTex??null,material:m,overlayMaterial:m.userData.pjskOverlayMaterial instanceof Xr?m.userData.pjskOverlayMaterial:null,stencilPrepassMaterial:m.userData.pjskStencilPrepassMaterial instanceof Xr?m.userData.pjskStencilPrepassMaterial:null,topLayerMaterial:h}}));e.traverse(e=>{let t=e;if(!t.isMesh||t.userData.pjskEyeThroughHairOverlay||t.userData.pjskEyeThroughHairStencilPrepass)return;let n=Array.isArray(t.material)?t.material:[t.material],r=Cb(t.name),a=d.filter(e=>e.meshKey===r);if(a.length===0)return;let o=[],f=n.map((e,n)=>Jb(t,e,n,a,i.faceSdfEnabled,s,o)),p=o.reduce((e,t)=>t?Math.min(e,jb(t.materialKind)):e,1/0);Number.isFinite(p)&&(t.renderOrder=p);let m=$b(t.geometry.groups.length>0?t.geometry.groups.map(e=>({start:e.start,count:e.count,materialIndex:e.materialIndex??0})):[{start:0,count:t.geometry.index?.count??t.geometry.getAttribute(`position`)?.count??0,materialIndex:0}],o,n,t.name,s);Hb(n,f),Mb(t,f),t.material=Array.isArray(t.material)||f.length>1?f:f[0],t.castShadow=!1,t.receiveShadow=!1,tx(t,m.stencil,`stencil_prepass`,l),tx(t,m.overlay,`overlay`,c),nx(t,m.top,u)});for(let e of l)e.parent.add(e.mesh);for(let e of c)e.parent.add(e.mesh);for(let e of u)e.parent.add(e.mesh);return s}var ix={widthMin:4e-4,widthMax:.0095,distanceNear:.45,distanceFar:20},ax={startTime:-.013763427734375,startValue:27.81246566772461,startOutTangent:-.13214513659477234,endTime:100.92341613769531,endValue:-.03620624542236328,endInTangent:-.5713597536087036};function ox(e){let t=Number.isFinite(e)?e:25,n=ax,r;if(t<=n.startTime)r=n.startValue;else if(t>=n.endTime)r=n.endValue;else{let e=n.endTime-n.startTime,i=(t-n.startTime)/e,a=i*i,o=a*i;r=(2*o-3*a+1)*n.startValue+(o-2*a+i)*e*n.startOutTangent+(-2*o+3*a)*n.endValue+(o-a)*e*n.endInTangent}return Math.abs(r)>2**-52?t/r:1}var sx={color:{r:0,g:0,b:0},blending:.5};function cx(){return new H(ix.widthMin,ix.widthMax)}function lx(e){return!e?.disabledShaderPasses?.some(e=>e.toLowerCase()===`outline`)}var ux={r:.52,g:.47,b:.55,a:1};function dx(e,t,n){if(e.name!==`pjsk_shell_outline`)return;let r=e.userData.pjskOutlineController;r&&(t&&typeof t==`object`&&`r`in t&&`g`in t&&`b`in t?r.color.setRGB(t.r,t.g,t.b):Q(r.color,t??new J().setRGB(sx.color.r,sx.color.g,sx.color.b)),r.blending=V.clamp(n??sx.blending,0,1))}function fx(e,t,n){let r=[`skinning_vertex`,`morphtarget_vertex`,`begin_vertex`].map(e=>`#include <${e}>`).find(t=>e.includes(t));if(!r)throw Error(`Outline source has no vertex deformation boundary.`);return e.replace(r,[r,`vec3 outlineWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`,`float outlineDistance = length(outlineWorldPosition - cameraPosition);`,`float outlineDistanceFactor = clamp((outlineDistance - uSekaiOutlineFactor.x) * uSekaiOutlineFactor.y, 0.0, 1.0);`,`outlineDistanceFactor = min(outlineDistanceFactor * uSekaiOutlineFactor.z, 1.0);`,`float outlineWidth = mix(uSekaiOutlineWidth.x, uSekaiOutlineWidth.y, outlineDistanceFactor);`,`vec3 outlineNormal = normal;`,`#if defined(USE_SKINNING) || defined(USE_MORPHNORMALS)`,`outlineNormal = objectNormal;`,`#endif`,n?[`vec3 outlineTangent = tangent.xyz;`,`#ifdef USE_SKINNING`,`outlineTangent = (skinMatrix * vec4(outlineTangent, 0.0)).xyz;`,`#endif`,`vec3 outlineSecondBitangent = cross(outlineNormal, outlineTangent) * tangent.w;`,`vec3 outlineDirection = normalize(outlineTangent * uv1.x + outlineSecondBitangent * uv1.y + outlineNormal * uv2.x);`].join(`
`):`vec3 outlineDirection = normalize(outlineNormal);`,t?`float outlineScale = clamp(color.r, 0.0, 1.0);`:`float outlineScale = 1.0;`,t?`float outlineOffsetScale = clamp(color.b, 0.0, 1.0);`:`float outlineOffsetScale = 0.0;`,`transformed += outlineDirection * outlineWidth * outlineScale;`].join(`
`))}function px(e,t,n,r){let i=new W(ix.distanceNear,1/(ix.distanceFar-ix.distanceNear),ox(25)),a={color:new J().setRGB(sx.color.r,sx.color.g,sx.color.b),blending:sx.blending},o=ub(n,`_OutlineOffset`)??0,s=e.clone();s.name=`pjsk_shell_outline`,s.side=1,s.transparent=!1,s.opacity=1,s.depthFunc=2,s.depthWrite=!0,s.depthTest=!0,s.blending=0,s.polygonOffset=!1,s.userData={...e.userData,pjskOutlineController:a};let c={};for(let t of[`uFaceSdfEnabled`,`uRimColorAlpha`,`uControllerSpecularIntensity`])t in e.uniforms&&(c[t]={value:0});return s.uniforms={...e.uniforms,...c,uSekaiOutlineWidth:{value:cx()},uSekaiOutlineFactor:{value:i},uSekaiOutlineOffset:{value:o},uSekaiCharacterOutlineColor:{value:a.color},uSekaiCharacterOutlineBlending:{get value(){return a.blending}}},s.vertexShader=e.vertexShader.replace(`#include <common>`,[`#include <common>`,`uniform vec2 uSekaiOutlineWidth;`,`uniform vec3 uSekaiOutlineFactor;`,`uniform float uSekaiOutlineOffset;`,r?`attribute vec4 tangent;`:``,r?`attribute vec2 uv1;`:``,r?`attribute vec2 uv2;`:``].join(`
`)),s.vertexShader=s.vertexShader.replace(`#include <defaultnormal_vertex>`,[`#include <defaultnormal_vertex>`,`#ifdef FLIP_SIDED`,`transformedNormal = -transformedNormal;`,`#endif`].join(`
`)),s.vertexShader=fx(s.vertexShader,t,r),s.vertexShader=s.vertexShader.replace(/gl_Position\s*=\s*projectionMatrix\s*\*[^;]*;/,e=>[e,`vec4 projectedCameraOrigin = projectionMatrix * viewMatrix * vec4(cameraPosition, 1.0);`,`gl_Position += projectedCameraOrigin * (-0.01 * uSekaiOutlineOffset) * outlineOffsetScale;`].join(`
`)),s.fragmentShader=e.fragmentShader.replace(/vec3 outputColor\s*\(\s*vec3 color\s*\)\s*\{\s*return color;\s*\}/,[`uniform vec3 uSekaiCharacterOutlineColor;`,`uniform float uSekaiCharacterOutlineBlending;`,``,`vec3 outputColor(vec3 color) {`,`  return mix(`,`    uSekaiCharacterOutlineColor,`,`    clamp(color, 0.0, 1.0),`,`    clamp(uSekaiCharacterOutlineBlending, 0.0, 1.0)`,`  );`,`}`].join(`
`)),s.customProgramCacheKey=()=>`sekai-toon-outline:${+!!t}:${+!!r}`,s.onBeforeRender=(e,t,n)=>{n instanceof Za&&(i.z=ox(n.fov))},s}function mx(e,t,n=!1,r=null,i=null){if(i instanceof ea&&/vec3 outputColor\s*\(\s*vec3 color\s*\)/.test(i.fragmentShader))return px(i,e,t,n);let a=fb(t,`_OutlineColor`)??ux,o=pb(t,`_MainTex`),s=new ln(o?.scaleX??1,o?.scaleY??1,o?.offsetX??0,o?.offsetY??0),c=(ub(t,`_UseAlphaClip`)??0)>.5,l=V.clamp(ub(t,`_Cutoff`)??.5,0,1),u=ub(t,`_OutlineOffset`)??0,d=new J().setRGB(a.r,a.g,a.b),f={color:new J().setRGB(sx.color.r,sx.color.g,sx.color.b),blending:sx.blending},p=new ni({color:d,map:r,side:1,transparent:!1,opacity:1,depthFunc:2,depthWrite:!0,depthTest:!0,blending:0,vertexColors:!1,alphaTest:c?l:0}),m=new W(ix.distanceNear,1/(ix.distanceFar-ix.distanceNear),ox(25));return p.name=`pjsk_shell_outline`,p.userData.pjskOutlineController=f,p.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace(`#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )`,`#if 1`),t.uniforms.uSekaiOutlineWidth={value:cx()},t.uniforms.uSekaiOutlineFactor={value:m},t.uniforms.uSekaiOutlineOffset={value:u},t.uniforms.uSekaiMainTexST={value:s},t.uniforms.uSekaiCharacterOutlineColor={value:f.color},t.uniforms.uSekaiCharacterOutlineBlending={get value(){return f.blending}},t.vertexShader=t.vertexShader.replace(`#include <common>`,[`#include <common>`,`uniform vec2 uSekaiOutlineWidth;`,`uniform vec3 uSekaiOutlineFactor;`,`uniform float uSekaiOutlineOffset;`,`uniform vec4 uSekaiMainTexST;`,`#ifdef USE_MAP`,`varying vec2 vSekaiMainTexUv;`,`#endif`,e?`attribute vec3 color;`:``,n?`attribute vec4 tangent;`:``,n?`attribute vec2 uv1;`:``,n?`attribute vec2 uv2;`:``].join(`
`)),t.vertexShader=fx(t.vertexShader,e,n),t.vertexShader=t.vertexShader.replace(`#include <project_vertex>`,[`#include <project_vertex>`,`vec4 projectedCameraOrigin = projectionMatrix * viewMatrix * vec4(cameraPosition, 1.0);`,`gl_Position += projectedCameraOrigin * (-0.01 * uSekaiOutlineOffset) * outlineOffsetScale;`].join(`
`)),t.vertexShader=t.vertexShader.replace(`#include <uv_vertex>`,[`#include <uv_vertex>`,`#ifdef USE_MAP`,`vSekaiMainTexUv = uv * uSekaiMainTexST.xy + uSekaiMainTexST.zw;`,`#endif`].join(`
`)),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,[`#include <common>`,`uniform vec3 uSekaiCharacterOutlineColor;`,`uniform float uSekaiCharacterOutlineBlending;`,`#ifdef USE_MAP`,`varying vec2 vSekaiMainTexUv;`,`#endif`].join(`
`)),t.fragmentShader=t.fragmentShader.replace(`#include <map_fragment>`,[`#ifdef USE_MAP`,`  vec4 sampledDiffuseColor = texture2D(map, vSekaiMainTexUv);`,`  #ifdef DECODE_VIDEO_TEXTURE`,`    sampledDiffuseColor = sRGBTransferEOTF(sampledDiffuseColor);`,`  #endif`,`  sampledDiffuseColor = sRGBTransferOETF(sampledDiffuseColor);`,`  diffuseColor *= sampledDiffuseColor;`,`#endif`].join(`
`)),t.fragmentShader=t.fragmentShader.replace(`#include <color_fragment>`,[`#include <color_fragment>`,`diffuseColor.rgb = mix(`,`  diffuseColor.rgb,`,`  uSekaiCharacterOutlineColor,`,`  clamp(uSekaiCharacterOutlineBlending, 0.0, 1.0)`,`);`].join(`
`)),t.fragmentShader=t.fragmentShader.replace(`#include <colorspace_fragment>`,``)},p.customProgramCacheKey=()=>`sekai-outline:${+!!e}:${+!!n}`,p.onBeforeRender=(e,t,n)=>{n instanceof Za&&(m.z=ox(n.fov))},p}function hx(e,t){let n=e;if(n.isMesh){if(n.userData.pjskEyeThroughHairOverlay||n.userData.pjskEyeThroughHairStencilPrepass){gx(n,t);return}if(n.userData.pjskOutlineShell){_x(n,t);return}vx(n,t)}}function gx(e,t){let n=e.userData.pjskEyeThroughHairSource,r=typeof e.userData.pjskEyeThroughHairSourceKind==`string`?e.userData.pjskEyeThroughHairSourceKind:``,i=typeof e.userData.pjskEyeThroughHairPassKind==`string`?e.userData.pjskEyeThroughHairPassKind:``,a=n instanceof Bn?n.visible:!0;n instanceof Bn&&(e.layers.mask=n.layers.mask),e.visible=a&&!t.outlineOnly&&!t.eyelightOnly&&!t.noEyeThroughHair&&kx(r,t.mode)&&Ax(r,i,t.mode)&&t.faceLayersVisible&&(!t.noEyelight||r!==`eyelight`),e.userData.pjskEyeThroughHairBaseVisible=e.visible}function _x(e,t){let n=typeof e.userData.pjskSourceMaterialKind==`string`?e.userData.pjskSourceMaterialKind:``;if(t.eyelightOnly){e.visible=n===`eye`||n===`eyelight`;return}let r=Ox(n);e.visible=!t.eyeThroughHairOnly&&t.outlineVisible&&!jx(n,t.mode)&&(!t.noEyelight||n!==`eyelight`)&&(!r||t.faceLayersVisible)}function vx(e,t){let n=Array.isArray(e.material)?e.material:[e.material],r=yx(n,t.faceSdfEnabled);e.visible=t.outlineOnly||t.eyeThroughHairOnly?!1:t.eyelightOnly?r.faceLayer&&n.some(e=>e.userData.pjskMaterialKind===`eye`||e.userData.pjskMaterialKind===`eyelight`):!r.faceLayer||t.faceLayersVisible&&(!t.noEyelight||!r.eyelightLayer);let i=e.userData.pjskEyeThroughHairSource;i instanceof Bn&&(e.visible=e.visible&&i.visible,e.layers.mask=i.layers.mask)}function yx(e,t){let n=!1,r=!1;for(let i of e){if(!(i instanceof ea))continue;let e=i.visible!==!1&&i.colorWrite!==!1;i.uniforms.uFaceSdfEnabled&&(i.uniforms.uFaceSdfEnabled.value=t&&i.userData.pjskFaceSdfCapable===!0?1:0,n=!0),i.uniforms.uMode&&!i.uniforms.uFaceSdfEnabled&&(n=!0,r||=e&&i.uniforms.uMode.value>1.5)}return{faceLayer:n,eyelightLayer:r}}function bx(e,t){let n=e.uniforms;n.uSkinColorDefault&&Q(n.uSkinColorDefault.value,t.default),n.uSkinColor1&&Q(n.uSkinColor1.value,t.shadow1),n.uSkinColor2&&Q(n.uSkinColor2.value,t.shadow2)}function xx(e,t){e.shaderSkinColorDefault!==void 0&&e.shaderSkinColorDefault!==null&&(e.shaderSkinColorDefault=t.default.toLowerCase()),e.shaderSkinColor1!==void 0&&e.shaderSkinColor1!==null&&(e.shaderSkinColor1=t.shadow1.toLowerCase()),e.shaderSkinColor2!==void 0&&e.shaderSkinColor2!==null&&(e.shaderSkinColor2=t.shadow2.toLowerCase())}function Sx(e){return e===`head_proximity`?`sekai_head_position`:e}var Cx={skin:1,main_color:2,skin_color:3,h_r:4,h_g:5,h_b:6,h_a:7,vertex_r:8,vertex_g:9,base_shadow:10,ndotl_raw:11,h_b_adjusted_shadow:12,ambient_target:13,ambient_weight:14,ambient_tint:15,specular:16,rim_raw:17,rim_add:18,rim_gate:19,rim_color:20,rim_scalar:21,specular_mask:22,specular_add:23,toon_luma:24,shadow_mask:25,shadow_target:26},wx={sdf:1,mask:2,limit:3,basis:4,range:5};function Tx(e){return Cx[e]??0}function Ex(e){return wx[e]??0}function Dx(e){return e===`eyelash`||e===`eyebrow`||e===`eye`||e===`eyelight`}function Ox(e){return e===`face`||e===`face_sdf`||Dx(e)}function kx(e,t){switch(t){case`eye_through_hair_eye_only`:return e===`eye`;case`eye_through_hair_eyebrow_only`:return e===`eyebrow`;case`eye_through_hair_eyelash_only`:return e===`eyelash`;case`no_eye_through_hair_eye`:return e!==`eye`;case`no_eye_through_hair_eyebrow`:return e!==`eyebrow`;case`no_eye_through_hair_eyelash`:return e!==`eyelash`;default:return!0}}function Ax(e,t,n){return n===`no_eye_through_hair_eyelash_overlay`?e!==`eyelash`||t!==`overlay`:n!==`no_eye_through_hair_eyelash_prepass`||e!==`eyelash`||t!==`stencil_prepass`}function jx(e,t){switch(t){case`no_body_outline`:return e===`body`;case`no_hair_outline`:return e===`hair`;case`no_face_layers`:case`no_face_outline`:return Ox(e);default:return!1}}var Mx=class{options;cameraDirection=new W;hairShadowMode=`sekai_head_position`;bodyDebugMode=`off`;toonShadowWidthOverride=null;toonValueShadowInfluence;faceSdfEnabled=!0;faceSdfDebugMode=`off`;faceSdfDebugLightMode=`scene`;renderIsolationMode=`normal`;controllerOutlineColor=new J().setRGB(sx.color.r,sx.color.g,sx.color.b);controllerOutlineBlending=sx.blending;skinColors=null;constructor(e){this.options=e,this.toonValueShadowInfluence=e.valueShadowInfluence??1,e.debug.hairShadowMode=this.hairShadowMode}get slots(){return[this.options.bodySlot,this.options.headSlot]}get debugEntries(){return[this.options.debug.body,this.options.debug.head]}forEachShaderMaterial(e){for(let t of this.slots)t.traverse(t=>{let n=t;if(!n.isMesh)return;let r=Array.isArray(n.material)?n.material:[n.material];for(let t of r)t instanceof ea&&e(t)})}getBindingView(){return{bodyDebugMode:Tx(this.bodyDebugMode),faceDebugMode:Ex(this.faceSdfDebugMode),faceSdfEnabled:this.shouldEnableFaceSdf(),shadowWidthOverride:this.toonShadowWidthOverride,valueShadowInfluence:this.toonValueShadowInfluence,proximityHairShadowEnabled:this.isHairShadowEnabled()}}getHairShadowMode(){return this.hairShadowMode}isHairShadowEnabled(){return this.hairShadowMode===`sekai_head_position`}setHairShadowMode(e){this.hairShadowMode=Sx(e),this.options.debug.hairShadowMode=this.hairShadowMode,this.applyHairShadowMode()}setFaceSdfDebugMode(e){this.faceSdfDebugMode=e,this.applyFaceSdfDebug()}setFaceSdfEnabled(e){this.faceSdfEnabled=e,this.applyFaceSdfEnabled()}setBodyDebugMode(e){this.bodyDebugMode=e,this.applyBodyDebug()}setToonShadowPreview(e,t){this.toonShadowWidthOverride=e===null?null:Math.max(0,e),this.toonValueShadowInfluence=V.clamp(t,0,1),this.applyToonShadowPreview()}setFaceSdfDebugLightMode(e){this.faceSdfDebugLightMode=e,this.applyFaceSdfDebug()}setRenderIsolationMode(e){this.renderIsolationMode=e,this.applyRenderIsolationMode()}resolveFaceShadowLightDirection(e,t,n){switch(this.faceSdfDebugLightMode){case`front`:return n.clone();case`left`:return t.clone().negate();case`right`:return t.clone();case`back`:return n.clone().negate();default:return e.clone()}}applyCharacterView(){this.applyRenderIsolationMode(),this.applyFaceSdfDebug(),this.applyBodyDebug(),this.applyToonShadowPreview(),this.applyHairShadowMode(),this.applyCharacterSkinColors()}setCharacterSkinColors(e){this.skinColors=e?{...e}:null,this.options.debug.skinColors=this.skinColors?{...this.skinColors}:null,this.applyCharacterSkinColors()}applyCharacterSkinColors(){let e=this.skinColors;if(!e)return;let t=t=>bx(t,e);[this.options.bodyMaterial,this.options.hairMaterial,this.options.faceMaterial].forEach(t),this.forEachShaderMaterial(t);for(let t of this.debugEntries)for(let n of t)xx(n,e)}shouldEnableFaceSdf(){return this.renderIsolationMode===`no_face_sdf`?!1:this.faceSdfEnabled||this.renderIsolationMode===`face_sdf`}applyFaceSdfEnabled(){let e=this.shouldEnableFaceSdf(),t=t=>{t.uniforms.uFaceSdfEnabled&&(t.uniforms.uFaceSdfEnabled.value=e&&t.userData.pjskFaceSdfCapable===!0?1:0)};t(this.options.faceMaterial),this.forEachShaderMaterial(t);for(let t of this.debugEntries)for(let n of t)(n.shaderFaceSdfEnabled!==void 0||n.resolvedKind===`face_sdf`)&&(n.shaderFaceSdfEnabled=e&&n.faceSdfCapable===!0?1:0)}applyFaceSdfDebug(){let e=Ex(this.faceSdfDebugMode);this.options.faceMaterial.uniforms.uFaceDebugMode.value=e,this.forEachShaderMaterial(t=>{t.uniforms.uFaceDebugMode&&(t.uniforms.uFaceDebugMode.value=e)});for(let t of this.debugEntries)for(let n of t)(n.resolvedKind===`face_sdf`||n.shaderFaceDebugMode!==void 0)&&(n.shaderFaceDebugMode=e)}applyBodyDebug(){let e=Tx(this.bodyDebugMode),t=t=>{t.uniforms.uBodyDebugMode&&(t.uniforms.uBodyDebugMode.value=e)};t(this.options.bodyMaterial),t(this.options.hairMaterial),this.forEachShaderMaterial(t);for(let t of this.debugEntries)for(let n of t)(n.shaderBodyDebugMode!==void 0||n.resolvedKind===`body`)&&(n.shaderBodyDebugMode=e)}applyToonShadowPreview(){let e=this.toonShadowWidthOverride??-1,t=t=>{t instanceof ea&&(t.uniforms.uShadowWidthOverride&&(t.uniforms.uShadowWidthOverride.value=e),t.uniforms.uValueShadowInfluence&&(t.uniforms.uValueShadowInfluence.value=this.toonValueShadowInfluence))};t(this.options.bodyMaterial),t(this.options.hairMaterial),this.forEachShaderMaterial(t);for(let t of this.debugEntries)for(let n of t)n.shaderShadowWidthOverride!==void 0&&n.shaderShadowWidthOverride!==null&&n.shaderValueShadowInfluence!==void 0&&n.shaderValueShadowInfluence!==null&&(n.shaderShadowWidthOverride=e,n.shaderValueShadowInfluence=this.toonValueShadowInfluence)}applyHairShadowMode(){let e=+!!this.isHairShadowEnabled();this.options.hairMaterial.uniforms.uHairShadowEnabled&&(this.options.hairMaterial.uniforms.uHairShadowEnabled.value=e),this.forEachShaderMaterial(t=>{t.userData.pjskMaterialKind===`hair`&&t.uniforms.uHairShadowEnabled&&(t.uniforms.uHairShadowEnabled.value=e)});for(let t of this.options.debug.head)t.resolvedKind===`hair`&&t.shaderHairShadowEnabled!==void 0&&(t.shaderHairShadowEnabled=e)}applyRenderIsolationMode(){let e=this.shouldEnableFaceSdf(),t=this.renderIsolationMode,n={mode:t,faceSdfEnabled:e,eyelightOnly:t===`eyelight_only`,noEyelight:t===`no_eyelight`,faceLayersVisible:t!==`no_face_layers`,outlineOnly:t===`outline_only`,outlineVisible:t!==`no_outline`,noEyeThroughHair:t===`no_eye_through_hair`,eyeThroughHairOnly:t===`eye_through_hair_only`||t===`eye_through_hair_eye_only`||t===`eye_through_hair_eyebrow_only`||t===`eye_through_hair_eyelash_only`};for(let e of this.slots)e.traverse(e=>hx(e,n));for(let t of this.debugEntries)for(let n of t)(n.shaderFaceSdfEnabled!==void 0||n.resolvedKind===`face_sdf`)&&(n.shaderFaceSdfEnabled=e&&n.faceSdfCapable===!0?1:0)}updateEyeThroughHairView(e,t,n){let r=this.cameraDirection.copy(e).sub(t),i=r.lengthSq()>1e-6?r.normalize().dot(n):1;for(let e of this.slots)e.traverse(e=>{let t=e;if(!t.isMesh||!t.userData.pjskEyeThroughHairOverlay&&!t.userData.pjskEyeThroughHairStencilPrepass)return;let n=t.userData.pjskEyeThroughHairBaseVisible,r=typeof n==`boolean`?n:t.visible;if(t.userData.pjskEyeThroughHairStencilPrepass){t.visible=r;return}let a=Array.isArray(t.material)?t.material:[t.material],o=!1;for(let e of a){let t=Ob(e,i);o||=t===null||t>.001}t.visible=r&&o})}updateCamera(e){yp(this.options.bodyMaterial,e),yp(this.options.hairMaterial,e),this.forEachShaderMaterial(t=>{t.uniforms.uCameraPosition&&yp(t,e)})}updateFaceBasis(e,t,n){wp(this.options.faceMaterial,e,t,!0,0),this.forEachShaderMaterial(r=>{r.uniforms.uHeadDotDirectionalLight&&wp(r,e,t,!0,0),r.uniforms.uHeadPosition&&r.uniforms.uHeadPosition.value.copy(n)})}updatePreviewLight(e,t,n,r,i,a=_b()){let o=this.getBindingView(),{bodyMaterial:s,hairMaterial:c,faceMaterial:l,directionalLight:u,fillLight:d}=this.options;u.position.set(e.x,e.y,e.z),u.intensity=e.intensity,d.intensity=e.ambient,up(s,{baseColor:t?.proxy.bodyColor??`#f5d6d0`,shadowColor:t?.proxy.shadowColor??`#c79b95`,skinColorDefault:n?.proxy.skinColorDefault??n?.proxy.faceColor??t?.proxy.bodyColor??`#f5d6d0`,skinColor1:n?.proxy.skinColor1??n?.proxy.faceShadeColor??t?.proxy.shadowColor??`#c79b95`,skinColor2:n?.proxy.skinColor2??n?.proxy.faceShadeColor??t?.proxy.shadowColor??`#c79b95`,lightDirection:u.position.clone(),lightIntensity:e.intensity,ambientIntensity:e.ambient,shadowThreshold:e.shadowThreshold,shadowWeight:e.shadowWeight,characterAmbientIntensity:e.characterAmbient,rimColorAlpha:e.rimColorAlpha,controllerRimRange:e.rimRange,controllerRimEdgeSmoothness:e.rimEdgeSmoothness,controllerRimEmission:e.rimEmission,controllerRimLightInfluence:e.rimLightInfluence,rimDirection:a,specularPower:s.uniforms.uSpecularPower.value,rimThreshold:s.uniforms.uRimThreshold.value,shadowTexWeight:s.uniforms.uShadowTexWeight.value,shadowWidthOverride:o.shadowWidthOverride,valueShadowInfluence:o.valueShadowInfluence,saturation:s.uniforms.uSaturation.value,partsAmbientColor:s.uniforms.uPartsAmbientColor.value.clone(),reflectionBlendColor:s.uniforms.uReflectionBlendColor.value.clone(),globalShadowColor:s.uniforms.uGlobalShadowColor.value.clone(),globalShadowAlpha:s.uniforms.uGlobalShadowAlpha.value,controllerAmbientColor:s.uniforms.uControllerAmbientColor.value.clone(),controllerAmbientIntensity:s.uniforms.uControllerAmbientIntensity.value,controllerSpecularColor:s.uniforms.uControllerSpecularColor.value.clone(),controllerSpecularIntensity:s.uniforms.uControllerSpecularIntensity.value,controllerRimColor:s.uniforms.uControllerRimColor.value.clone(),controllerShadowRimColor:s.uniforms.uControllerShadowRimColor.value.clone(),controllerRimColorWeight:s.uniforms.uControllerRimColorWeight.value,controllerShadowRimColorWeight:s.uniforms.uControllerShadowRimColorWeight.value,controllerRimShadowSharpness:e.rimShadowSharpness,bodyDebugMode:o.bodyDebugMode}),up(c,{baseColor:n?.proxy.hairColor??`#7b5b4a`,shadowColor:n?.proxy.hairShadowColor??`#513d33`,lightDirection:u.position.clone(),lightIntensity:e.intensity,ambientIntensity:e.ambient,shadowThreshold:e.shadowThreshold,shadowWeight:e.shadowWeight,characterAmbientIntensity:e.characterAmbient,rimColorAlpha:e.rimColorAlpha,controllerRimRange:e.rimRange,controllerRimEdgeSmoothness:e.rimEdgeSmoothness,controllerRimEmission:e.rimEmission,controllerRimLightInfluence:e.rimLightInfluence,rimDirection:a,specularPower:c.uniforms.uSpecularPower.value,rimThreshold:c.uniforms.uRimThreshold.value,shadowTexWeight:c.uniforms.uShadowTexWeight.value,shadowWidthOverride:o.shadowWidthOverride,valueShadowInfluence:o.valueShadowInfluence,saturation:c.uniforms.uSaturation.value,partsAmbientColor:c.uniforms.uPartsAmbientColor.value.clone(),reflectionBlendColor:c.uniforms.uReflectionBlendColor.value.clone(),globalShadowColor:c.uniforms.uGlobalShadowColor.value.clone(),globalShadowAlpha:c.uniforms.uGlobalShadowAlpha.value,controllerAmbientColor:c.uniforms.uControllerAmbientColor.value.clone(),controllerAmbientIntensity:c.uniforms.uControllerAmbientIntensity.value,controllerSpecularColor:c.uniforms.uControllerSpecularColor.value.clone(),controllerSpecularIntensity:c.uniforms.uControllerSpecularIntensity.value,controllerRimColor:c.uniforms.uControllerRimColor.value.clone(),controllerShadowRimColor:c.uniforms.uControllerShadowRimColor.value.clone(),controllerRimColorWeight:c.uniforms.uControllerRimColorWeight.value,controllerShadowRimColorWeight:c.uniforms.uControllerShadowRimColorWeight.value,controllerRimShadowSharpness:e.rimShadowSharpness,hairShadowEnabled:!1}),Cp(l,{baseColor:n?.proxy.faceColor??`#ffe4dc`,warmColor:n?.proxy.faceShadeColor??`#ffd4c8`,skinColorDefault:n?.proxy.skinColorDefault??n?.proxy.faceColor??`#ffe4dc`,skinColor1:n?.proxy.skinColor1??n?.proxy.faceShadeColor??`#ffd4c8`,skinColor2:n?.proxy.skinColor2??n?.proxy.faceShadeColor??`#ffd4c8`,lightDirection:i.clone(),lightIntensity:e.intensity,ambientIntensity:e.ambient,headDotDirectionalLight:r,shadowWeight:e.shadowWeight,useLambert:!0,useFaceShadowLimiter:!0,faceShadowLimitRange:0,partsAmbientColor:l.uniforms.uPartsAmbientColor.value.clone(),partsAmbientAlpha:l.uniforms.uPartsAmbientAlpha.value,controllerAmbientColor:l.uniforms.uControllerAmbientColor.value.clone(),controllerAmbientIntensity:l.uniforms.uControllerAmbientIntensity.value,controllerSpecularColor:l.uniforms.uControllerSpecularColor.value.clone(),controllerSpecularIntensity:l.uniforms.uControllerSpecularIntensity.value,controllerRimColor:l.uniforms.uControllerRimColor.value.clone(),controllerShadowRimColor:l.uniforms.uControllerShadowRimColor.value.clone(),controllerRimColorWeight:l.uniforms.uControllerRimColorWeight.value,controllerShadowRimColorWeight:l.uniforms.uControllerShadowRimColorWeight.value,controllerRimRange:e.rimRange,controllerRimEdgeSmoothness:e.rimEdgeSmoothness,controllerRimEmission:e.rimEmission,controllerRimLightInfluence:e.rimLightInfluence,controllerRimShadowSharpness:e.rimShadowSharpness,rimColorAlpha:e.rimColorAlpha,rimDirection:a,specularPower:l.uniforms.uSpecularPower.value,rimThreshold:l.uniforms.uRimThreshold.value,globalShadowColor:l.uniforms.uGlobalShadowColor.value.clone(),globalShadowAlpha:l.uniforms.uGlobalShadowAlpha.value}),this.updateLoadedMaterialLight(e,i,a),this.applyCharacterSkinColors()}updateLoadedMaterialLight(e,t,n=_b()){let r=this.options.directionalLight.position.clone().normalize();this.forEachShaderMaterial(i=>{let a=i.uniforms,o=i.userData.pjskLighting,s=!!(a.uFaceShadowTex||a.uHeadDotDirectionalLight);a.uLightDirection?.value.copy(s?t:r),a.uLightIntensity&&(a.uLightIntensity.value=e.intensity),a.uAmbientIntensity&&(a.uAmbientIntensity.value=e.ambient),a.uShadowThreshold&&(a.uShadowThreshold.value=o?.sekaiShadowThreshold??e.shadowThreshold),a.uShadowWeight&&(a.uShadowWeight.value=e.shadowWeight),a.uCharacterAmbientIntensity&&(a.uCharacterAmbientIntensity.value=e.characterAmbient),a.uRimColorAlpha&&(a.uRimColorAlpha.value=e.rimColorAlpha),a.uControllerRimRange&&(a.uControllerRimRange.value=e.rimRange),a.uControllerRimEdgeSmoothness&&(a.uControllerRimEdgeSmoothness.value=e.rimEdgeSmoothness),a.uControllerRimEmission&&(a.uControllerRimEmission.value=e.rimEmission),a.uControllerRimLightInfluence&&(a.uControllerRimLightInfluence.value=e.rimLightInfluence),a.uControllerRimShadowSharpness&&(a.uControllerRimShadowSharpness.value=e.rimShadowSharpness),a.uRimDirection?.value.copy(n)})}updateGlobalShadowColor(e,t=1){let n=Q(new J,e),r=V.clamp(t,0,1),i=e=>{e.uniforms.uGlobalShadowColor?.value.copy(n),e.uniforms.uGlobalShadowAlpha&&(e.uniforms.uGlobalShadowAlpha.value=r)};for(let e of[this.options.bodyMaterial,this.options.hairMaterial])i(e);this.forEachShaderMaterial(i)}updateControllerColors(e){let t=e.ambientColor==null?new J().setRGB(s.ambientColor.r,s.ambientColor.g,s.ambientColor.b):Q(new J,e.ambientColor),n=Q(new J,e.specularColor??`#ffffff`),r=e.rimColor==null?new J().setRGB(s.rimColor.r,s.rimColor.g,s.rimColor.b):Q(new J,e.rimColor),i=e.shadowRimColor==null?new J().setRGB(s.shadowRimColor.r,s.shadowRimColor.g,s.shadowRimColor.b):Q(new J,e.shadowRimColor),a=a=>{a.uniforms.uControllerAmbientColor?.value.copy(t),a.uniforms.uControllerAmbientIntensity&&(a.uniforms.uControllerAmbientIntensity.value=Math.max(e.ambientIntensity??1,0)),a.uniforms.uControllerSpecularColor?.value.copy(n),a.uniforms.uControllerSpecularIntensity&&(a.uniforms.uControllerSpecularIntensity.value=Math.max(e.specularIntensity??1,0)),a.uniforms.uControllerRimColor?.value.copy(r),a.uniforms.uControllerShadowRimColor?.value.copy(i),a.uniforms.uControllerRimColorWeight&&(a.uniforms.uControllerRimColorWeight.value=1),a.uniforms.uControllerShadowRimColorWeight&&(a.uniforms.uControllerShadowRimColorWeight.value=1)};for(let e of[this.options.bodyMaterial,this.options.hairMaterial])a(e);this.forEachShaderMaterial(a)}updateControllerRimShape(e){let t=Math.max(e.edgeSmoothness??s.rimEdgeSmoothness,0),n=Math.max(e.emission??s.rimEmission,0),r=V.clamp(e.shadowSharpness??s.rimShadowSharpness,0,1),i=e=>{e.uniforms.uControllerRimEdgeSmoothness&&(e.uniforms.uControllerRimEdgeSmoothness.value=t),e.uniforms.uControllerRimEmission&&(e.uniforms.uControllerRimEmission.value=n),e.uniforms.uControllerRimShadowSharpness&&(e.uniforms.uControllerRimShadowSharpness.value=r)};for(let e of[this.options.bodyMaterial,this.options.hairMaterial])i(e);this.forEachShaderMaterial(i)}updateControllerOutline(e){this.controllerOutlineColor=e.color?Q(new J,e.color):new J().setRGB(sx.color.r,sx.color.g,sx.color.b),this.controllerOutlineBlending=V.clamp(e.blending??sx.blending,0,1);for(let e of this.slots)e.traverse(e=>{let t=e;if(!t.isMesh||!t.userData.pjskOutlineShell)return;let n=Array.isArray(t.material)?t.material:[t.material];for(let e of n)e.userData.pjskOutlineController&&this.applyOutlineMaterial(e)})}applyOutlineMaterial(e){dx(e,this.controllerOutlineColor,this.controllerOutlineBlending)}},Nx=class{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0,this.workerCreator=null}_initWorker(e){if(!this.workers[e]){let t=this.workerCreator();t.addEventListener(`message`,this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){let n=this.workersResolve[e];if(n&&n(t),this.queue.length){let{resolve:t,msg:n,transfer:r}=this.queue.shift();this.workersResolve[e]=t,this.workers[e].postMessage(n,r)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(n=>{let r=this._getIdleWorker();r===-1?this.queue.push({resolve:n,msg:e,transfer:t}):(this._initWorker(r),this.workerStatus|=1<<r,this.workersResolve[r]=n,this.workers[r].postMessage(e,t))})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}},Px=1000054e3,Fx=1000054001,Ix=1000054004,Lx=1000054005,Rx=1000066e3,zx=1000066004,Bx=class{constructor(e,t,n,r){this._dataView=void 0,this._littleEndian=void 0,this._offset=void 0,this._dataView=new DataView(e.buffer,e.byteOffset+t,n),this._littleEndian=r,this._offset=0}_nextUint8(){let e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){let e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){let e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){let e=this._dataView.getUint32(this._offset,this._littleEndian)+2**32*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){let e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint8Array(e){let t=new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+this._offset,e);return this._offset+=e,t}_skip(e){return this._offset+=e,this}_scan(e,t=0){let n=this._offset,r=0;for(;this._dataView.getUint8(this._offset)!==t&&r<e;)r++,this._offset++;return r<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+n,r)}};new Uint8Array([0]);var Vx=[171,75,84,88,32,50,48,187,13,10,26,10];function Hx(e){return new TextDecoder().decode(e)}function Ux(e){let t=new Uint8Array(e.buffer,e.byteOffset,Vx.length);if(t[0]!==Vx[0]||t[1]!==Vx[1]||t[2]!==Vx[2]||t[3]!==Vx[3]||t[4]!==Vx[4]||t[5]!==Vx[5]||t[6]!==Vx[6]||t[7]!==Vx[7]||t[8]!==Vx[8]||t[9]!==Vx[9]||t[10]!==Vx[10]||t[11]!==Vx[11])throw Error(`Missing KTX 2.0 identifier.`);let n={vkFormat:0,typeSize:1,pixelWidth:0,pixelHeight:0,pixelDepth:0,layerCount:0,faceCount:1,levelCount:0,supercompressionScheme:0,levels:[],dataFormatDescriptor:[{vendorId:0,descriptorType:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],keyValue:{},globalData:null},r=17*Uint32Array.BYTES_PER_ELEMENT,i=new Bx(e,Vx.length,r,!0);n.vkFormat=i._nextUint32(),n.typeSize=i._nextUint32(),n.pixelWidth=i._nextUint32(),n.pixelHeight=i._nextUint32(),n.pixelDepth=i._nextUint32(),n.layerCount=i._nextUint32(),n.faceCount=i._nextUint32(),n.levelCount=i._nextUint32(),n.supercompressionScheme=i._nextUint32();let a=i._nextUint32(),o=i._nextUint32(),s=i._nextUint32(),c=i._nextUint32(),l=i._nextUint64(),u=i._nextUint64(),d=3*Math.max(n.levelCount,1)*8,f=new Bx(e,Vx.length+r,d,!0);for(let t=0,r=Math.max(n.levelCount,1);t<r;t++)n.levels.push({levelData:new Uint8Array(e.buffer,e.byteOffset+f._nextUint64(),f._nextUint64()),uncompressedByteLength:f._nextUint64()});let p=new Bx(e,a,o,!0);p._skip(4);let m=p._nextUint16(),h=p._nextUint16(),g=p._nextUint16(),_=p._nextUint16(),v={vendorId:m,descriptorType:h,versionNumber:g,colorModel:p._nextUint8(),colorPrimaries:p._nextUint8(),transferFunction:p._nextUint8(),flags:p._nextUint8(),texelBlockDimension:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],bytesPlane:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],samples:[]},y=(_/4-6)/4;for(let e=0;e<y;e++){let t={bitOffset:p._nextUint16(),bitLength:p._nextUint8(),channelType:p._nextUint8(),samplePosition:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&t.channelType?(t.sampleLower=p._nextInt32(),t.sampleUpper=p._nextInt32()):(t.sampleLower=p._nextUint32(),t.sampleUpper=p._nextUint32()),v.samples[e]=t}n.dataFormatDescriptor.length=0,n.dataFormatDescriptor.push(v);let b=new Bx(e,s,c,!0);for(;b._offset<c;){let e=b._nextUint32(),t=b._scan(e),r=Hx(t);if(n.keyValue[r]=b._nextUint8Array(e-t.byteLength-1),r.match(/^ktx/i)){let e=Hx(n.keyValue[r]);n.keyValue[r]=e.substring(0,e.lastIndexOf(`\0`))}b._skip(e%4?4-e%4:0)}if(u<=0)return n;let x=new Bx(e,l,u,!0),S=x._nextUint16(),C=x._nextUint16(),w=x._nextUint32(),T=x._nextUint32(),E=x._nextUint32(),D=x._nextUint32(),O=[];for(let e=0,t=Math.max(n.levelCount,1);e<t;e++)O.push({imageFlags:x._nextUint32(),rgbSliceByteOffset:x._nextUint32(),rgbSliceByteLength:x._nextUint32(),alphaSliceByteOffset:x._nextUint32(),alphaSliceByteLength:x._nextUint32()});let k=l+x._offset,A=k+w,ee=A+T,te=ee+E;return n.globalData={endpointCount:S,selectorCount:C,imageDescs:O,endpointsData:new Uint8Array(e.buffer,e.byteOffset+k,w),selectorsData:new Uint8Array(e.buffer,e.byteOffset+A,T),tablesData:new Uint8Array(e.buffer,e.byteOffset+ee,E),extendedData:new Uint8Array(e.buffer,e.byteOffset+te,D)},n}var Wx,Gx,Kx,qx={env:{emscripten_notify_memory_growth:function(e){Kx=new Uint8Array(Gx.exports.memory.buffer)}}},Jx=class{init(){return Wx||(Wx=typeof fetch<`u`?fetch(`data:application/wasm;base64,`+Yx).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,qx)).then(this._init):WebAssembly.instantiate(Buffer.from(Yx,`base64`),qx).then(this._init),Wx)}_init(e){Gx=e.instance,qx.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!Gx)throw Error(`ZSTDDecoder: Await .init() before decoding.`);let n=e.byteLength,r=Gx.exports.malloc(n);Kx.set(e,r),t||=Number(Gx.exports.ZSTD_findDecompressedSize(r,n));let i=Gx.exports.malloc(t),a=Gx.exports.ZSTD_decompress(i,t,r,n),o=Kx.slice(i,i+a);return Gx.exports.free(r),Gx.exports.free(i),o}},Yx=`AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY0AAQMyIFEAMiBg0AIANBHzYCfCADIANB/ABqIANB+ABqIAQgBCAFaiAGGyIEIAEgAmoiAiAEaxAVIgUQAw0AIAMoAnwiBkEfSw0AIAMoAngiB0EJTw0AIABBiCBqIAMgBkGAC0GADCAHEBggA0E0NgJ8IAMgA0H8AGogA0H4AGogBCAFaiIEIAIgBGsQFSIFEAMNACADKAJ8IgZBNEsNACADKAJ4IgdBCk8NACAAQZAwaiADIAZBgA1B4A4gBxAYIANBIzYCfCADIANB/ABqIANB+ABqIAQgBWoiBCACIARrEBUiBRADDQAgAygCfCIGQSNLDQAgAygCeCIHQQpPDQAgACADIAZBwBBB0BEgBxAYIAQgBWoiBEEMaiIFIAJLDQAgAiAFayEFQQAhAgNAIAJBA0cEQCAEKAAAIgZBf2ogBU8NAiAAIAJBAnRqQZzQAWogBjYCACACQQFqIQIgBEEEaiEEDAELCyAEIAFrIQgLIANBgAFqJAAgCAtGAQN/IABBCGohAyAAKAIEIQJBACEAA0AgACACdkUEQCABIAMgAEEDdGotAAJBFktqIQEgAEEBaiEADAELCyABQQggAmt0C4YDAQV/Qbh/IQcCQCADRQ0AIAItAAAiBEUEQCABQQA2AgBBAUG4fyADQQFGGw8LAn8gAkEBaiIFIARBGHRBGHUiBkF/Sg0AGiAGQX9GBEAgA0EDSA0CIAUvAABBgP4BaiEEIAJBA2oMAQsgA0ECSA0BIAItAAEgBEEIdHJBgIB+aiEEIAJBAmoLIQUgASAENgIAIAVBAWoiASACIANqIgNLDQBBbCEHIABBEGogACAFLQAAIgVBBnZBI0EJIAEgAyABa0HAEEHQEUHwEiAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBmCBqIABBCGogBUEEdkEDcUEfQQggASABIAZqIAgbIgEgAyABa0GAC0GADEGAFyAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBoDBqIABBBGogBUECdkEDcUE0QQkgASABIAZqIAgbIgEgAyABa0GADUHgDkGQGSAAKAKM4QEgACgCnOIBIAQQHyIAEAMNACAAIAFqIAJrIQcLIAcLrQMBCn8jAEGABGsiCCQAAn9BUiACQf8BSw0AGkFUIANBDEsNABogAkEBaiELIABBBGohCUGAgAQgA0F/anRBEHUhCkEAIQJBASEEQQEgA3QiB0F/aiIMIQUDQCACIAtGRQRAAkAgASACQQF0Ig1qLwEAIgZB//8DRgRAIAkgBUECdGogAjoAAiAFQX9qIQVBASEGDAELIARBACAKIAZBEHRBEHVKGyEECyAIIA1qIAY7AQAgAkEBaiECDAELCyAAIAQ7AQIgACADOwEAIAdBA3YgB0EBdmpBA2ohBkEAIQRBACECA0AgBCALRkUEQCABIARBAXRqLgEAIQpBACEAA0AgACAKTkUEQCAJIAJBAnRqIAQ6AAIDQCACIAZqIAxxIgIgBUsNAAsgAEEBaiEADAELCyAEQQFqIQQMAQsLQX8gAg0AGkEAIQIDfyACIAdGBH9BAAUgCCAJIAJBAnRqIgAtAAJBAXRqIgEgAS8BACIBQQFqOwEAIAAgAyABEBRrIgU6AAMgACABIAVB/wFxdCAHazsBACACQQFqIQIMAQsLCyEFIAhBgARqJAAgBQvjBgEIf0FsIQcCQCACQQNJDQACQAJAAkACQCABLQAAIgNBA3EiCUEBaw4DAwEAAgsgACgCiOEBDQBBYg8LIAJBBUkNAkEDIQYgASgAACEFAn8CQAJAIANBAnZBA3EiCEF+aiIEQQFNBEAgBEEBaw0BDAILIAVBDnZB/wdxIQQgBUEEdkH/B3EhAyAIRQwCCyAFQRJ2IQRBBCEGIAVBBHZB//8AcSEDQQAMAQsgBUEEdkH//w9xIgNBgIAISw0DIAEtAARBCnQgBUEWdnIhBEEFIQZBAAshBSAEIAZqIgogAksNAgJAIANBgQZJDQAgACgCnOIBRQ0AQQAhAgNAIAJBg4ABSw0BIAJBQGshAgwAAAsACwJ/IAlBA0YEQCABIAZqIQEgAEHw4gFqIQIgACgCDCEGIAUEQCACIAMgASAEIAYQXwwCCyACIAMgASAEIAYQXQwBCyAAQbjQAWohAiABIAZqIQEgAEHw4gFqIQYgAEGo0ABqIQggBQRAIAggBiADIAEgBCACEF4MAQsgCCAGIAMgASAEIAIQXAsQAw0CIAAgAzYCgOIBIABBATYCiOEBIAAgAEHw4gFqNgLw4QEgCUECRgRAIAAgAEGo0ABqNgIMCyAAIANqIgBBiOMBakIANwAAIABBgOMBakIANwAAIABB+OIBakIANwAAIABB8OIBakIANwAAIAoPCwJ/AkACQAJAIANBAnZBA3FBf2oiBEECSw0AIARBAWsOAgACAQtBASEEIANBA3YMAgtBAiEEIAEvAABBBHYMAQtBAyEEIAEQIUEEdgsiAyAEaiIFQSBqIAJLBEAgBSACSw0CIABB8OIBaiABIARqIAMQCyEBIAAgAzYCgOIBIAAgATYC8OEBIAEgA2oiAEIANwAYIABCADcAECAAQgA3AAggAEIANwAAIAUPCyAAIAM2AoDiASAAIAEgBGo2AvDhASAFDwsCfwJAAkACQCADQQJ2QQNxQX9qIgRBAksNACAEQQFrDgIAAgELQQEhByADQQN2DAILQQIhByABLwAAQQR2DAELIAJBBEkgARAhIgJBj4CAAUtyDQFBAyEHIAJBBHYLIQIgAEHw4gFqIAEgB2otAAAgAkEgahAQIQEgACACNgKA4gEgACABNgLw4QEgB0EBaiEHCyAHC0sAIABC+erQ0OfJoeThADcDICAAQgA3AxggAELP1tO+0ser2UI3AxAgAELW64Lu6v2J9eAANwMIIABCADcDACAAQShqQQBBKBAQGgviAgICfwV+IABBKGoiASAAKAJIaiECAn4gACkDACIDQiBaBEAgACkDECIEQgeJIAApAwgiBUIBiXwgACkDGCIGQgyJfCAAKQMgIgdCEol8IAUQGSAEEBkgBhAZIAcQGQwBCyAAKQMYQsXP2bLx5brqJ3wLIAN8IQMDQCABQQhqIgAgAk0EQEIAIAEpAAAQCSADhUIbiUKHla+vmLbem55/fkLj3MqV/M7y9YV/fCEDIAAhAQwBCwsCQCABQQRqIgAgAksEQCABIQAMAQsgASgAAK1Ch5Wvr5i23puef34gA4VCF4lCz9bTvtLHq9lCfkL5893xmfaZqxZ8IQMLA0AgACACSQRAIAAxAABCxc/ZsvHluuonfiADhUILiUKHla+vmLbem55/fiEDIABBAWohAAwBCwsgA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC+8CAgJ/BH4gACAAKQMAIAKtfDcDAAJAAkAgACgCSCIDIAJqIgRBH00EQCABRQ0BIAAgA2pBKGogASACECAgACgCSCACaiEEDAELIAEgAmohAgJ/IAMEQCAAQShqIgQgA2ogAUEgIANrECAgACAAKQMIIAQpAAAQCTcDCCAAIAApAxAgACkAMBAJNwMQIAAgACkDGCAAKQA4EAk3AxggACAAKQMgIABBQGspAAAQCTcDICAAKAJIIQMgAEEANgJIIAEgA2tBIGohAQsgAUEgaiACTQsEQCACQWBqIQMgACkDICEFIAApAxghBiAAKQMQIQcgACkDCCEIA0AgCCABKQAAEAkhCCAHIAEpAAgQCSEHIAYgASkAEBAJIQYgBSABKQAYEAkhBSABQSBqIgEgA00NAAsgACAFNwMgIAAgBjcDGCAAIAc3AxAgACAINwMICyABIAJPDQEgAEEoaiABIAIgAWsiBBAgCyAAIAQ2AkgLCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQEBogAwVBun8LCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQCxogAwVBun8LC6gCAQZ/IwBBEGsiByQAIABB2OABaikDAEKAgIAQViEIQbh/IQUCQCAEQf//B0sNACAAIAMgBBBCIgUQAyIGDQAgACgCnOIBIQkgACAHQQxqIAMgAyAFaiAGGyIKIARBACAFIAYbayIGEEAiAxADBEAgAyEFDAELIAcoAgwhBCABRQRAQbp/IQUgBEEASg0BCyAGIANrIQUgAyAKaiEDAkAgCQRAIABBADYCnOIBDAELAkACQAJAIARBBUgNACAAQdjgAWopAwBCgICACFgNAAwBCyAAQQA2ApziAQwBCyAAKAIIED8hBiAAQQA2ApziASAGQRRPDQELIAAgASACIAMgBSAEIAgQOSEFDAELIAAgASACIAMgBSAEIAgQOiEFCyAHQRBqJAAgBQtnACAAQdDgAWogASACIAAoAuzhARAuIgEQAwRAIAEPC0G4fyECAkAgAQ0AIABB7OABaigCACIBBEBBYCECIAAoApjiASABRw0BC0EAIQIgAEHw4AFqKAIARQ0AIABBkOEBahBDCyACCycBAX8QVyIERQRAQUAPCyAEIAAgASACIAMgBBBLEE8hACAEEFYgAAs/AQF/AkACQAJAIAAoAqDiAUEBaiIBQQJLDQAgAUEBaw4CAAECCyAAEDBBAA8LIABBADYCoOIBCyAAKAKU4gELvAMCB38BfiMAQRBrIgkkAEG4fyEGAkAgBCgCACIIQQVBCSAAKALs4QEiBRtJDQAgAygCACIHQQFBBSAFGyAFEC8iBRADBEAgBSEGDAELIAggBUEDakkNACAAIAcgBRBJIgYQAw0AIAEgAmohCiAAQZDhAWohCyAIIAVrIQIgBSAHaiEHIAEhBQNAIAcgAiAJECwiBhADDQEgAkF9aiICIAZJBEBBuH8hBgwCCyAJKAIAIghBAksEQEFsIQYMAgsgB0EDaiEHAn8CQAJAAkAgCEEBaw4CAgABCyAAIAUgCiAFayAHIAYQSAwCCyAFIAogBWsgByAGEEcMAQsgBSAKIAVrIActAAAgCSgCCBBGCyIIEAMEQCAIIQYMAgsgACgC8OABBEAgCyAFIAgQRQsgAiAGayECIAYgB2ohByAFIAhqIQUgCSgCBEUNAAsgACkD0OABIgxCf1IEQEFsIQYgDCAFIAFrrFINAQsgACgC8OABBEBBaiEGIAJBBEkNASALEEQhDCAHKAAAIAynRw0BIAdBBGohByACQXxqIQILIAMgBzYCACAEIAI2AgAgBSABayEGCyAJQRBqJAAgBgsuACAAECsCf0EAQQAQAw0AGiABRSACRXJFBEBBYiAAIAEgAhA9EAMNARoLQQALCzcAIAEEQCAAIAAoAsTgASABKAIEIAEoAghqRzYCnOIBCyAAECtBABADIAFFckUEQCAAIAEQWwsL0QIBB38jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAFBEAgBSgCBCEKIAUoAgghCQsgASEIAkACQANAIAAoAuzhARAWIQsCQANAIAQgC0kNASADKAAAQXBxQdDUtMIBRgRAIAMgBBAiIgcQAw0EIAQgB2shBCADIAdqIQMMAQsLIAYgAzYCDCAGIAQ2AggCQCAFBEAgACAFEE5BACEHQQAQA0UNAQwFCyAAIAogCRBNIgcQAw0ECyAAIAgQUCAMQQFHQQAgACAIIAIgBkEMaiAGQQhqEEwiByIDa0EAIAMQAxtBCkdyRQRAQbh/IQcMBAsgBxADDQMgAiAHayECIAcgCGohCEEBIQwgBigCDCEDIAYoAgghBAwBCwsgBiADNgIMIAYgBDYCCEG4fyEHIAQNASAIIAFrIQcMAQsgBiADNgIMIAYgBDYCCAsgBkEQaiQAIAcLRgECfyABIAAoArjgASICRwRAIAAgAjYCxOABIAAgATYCuOABIAAoArzgASEDIAAgATYCvOABIAAgASADIAJrajYCwOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ`,Xx=`display-p3`,Zx=`display-p3-linear`;({...K.spaces[nt]});var Qx=new URL(new URL(`basis_transcoder-VXdx5NbI.wasm`,import.meta.url).href,``+import.meta.url).toString(),$x=new URL(new URL(`basis_transcoder-o4Hde_L7.js`,import.meta.url).href,``+import.meta.url).toString(),eS=new WeakMap,tS=0,nS,rS=class e extends Ma{constructor(e){super(e),this.transcoderPath=``,this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new Nx,this.workerSourceURL=``,this.workerConfig=null,typeof MSC_TRANSCODER<`u`&&console.warn(`THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.`)}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerPool.setWorkerLimit(e),this}async detectSupportAsync(e){return console.warn(`KTX2Loader: "detectSupportAsync()" has been deprecated. Use "detectSupport()" and "await renderer.init();" when creating the renderer.`),await e.init(),this.detectSupport(e)}detectSupport(e){return e.isWebGPURenderer===!0?this.workerConfig={astcSupported:e.hasFeature(`texture-compression-astc`),astcHDRSupported:!1,etc1Supported:e.hasFeature(`texture-compression-etc1`),etc2Supported:e.hasFeature(`texture-compression-etc2`),dxtSupported:e.hasFeature(`texture-compression-s3tc`),bptcSupported:e.hasFeature(`texture-compression-bc`),pvrtcSupported:e.hasFeature(`texture-compression-pvrtc`)}:(this.workerConfig={astcSupported:e.extensions.has(`WEBGL_compressed_texture_astc`),astcHDRSupported:e.extensions.has(`WEBGL_compressed_texture_astc`)&&e.extensions.get(`WEBGL_compressed_texture_astc`).getSupportedProfiles().includes(`hdr`),etc1Supported:e.extensions.has(`WEBGL_compressed_texture_etc1`),etc2Supported:e.extensions.has(`WEBGL_compressed_texture_etc`),dxtSupported:e.extensions.has(`WEBGL_compressed_texture_s3tc`),bptcSupported:e.extensions.has(`EXT_texture_compression_bptc`),pvrtcSupported:e.extensions.has(`WEBGL_compressed_texture_pvrtc`)||e.extensions.has(`WEBKIT_WEBGL_compressed_texture_pvrtc`)},typeof navigator<`u`&&navigator.platform!==void 0&&navigator.userAgent!==void 0&&navigator.platform.indexOf(`Linux`)>=0&&navigator.userAgent.indexOf(`Android`)<0&&this.workerConfig.astcSupported&&this.workerConfig.etc2Supported&&this.workerConfig.bptcSupported&&this.workerConfig.dxtSupported&&(this.workerConfig.astcSupported=!1,this.workerConfig.etc1Supported=!1,this.workerConfig.etc2Supported=!1)),this}init(){if(!this.transcoderPending){let t=new Fa(this.manager);t.setWithCredentials(this.withCredentials);let n=new Fa(this.manager);n.setWithCredentials(this.withCredentials),n.setResponseType(`arraybuffer`);let r,i;this.transcoderPath===``?(r=t.loadAsync($x),i=n.loadAsync(Qx)):(t.setPath(this.transcoderPath),r=t.loadAsync(`basis_transcoder.js`),n.setPath(this.transcoderPath),i=n.loadAsync(`basis_transcoder.wasm`)),this.transcoderPending=Promise.all([r,i]).then(([t,n])=>{let r=e.BasisWorker.toString(),i=[`/* constants */`,`let _EngineFormat = `+JSON.stringify(e.EngineFormat),`let _EngineType = `+JSON.stringify(e.EngineType),`let _TranscoderFormat = `+JSON.stringify(e.TranscoderFormat),`let _BasisFormat = `+JSON.stringify(e.BasisFormat),`/* basis_transcoder.js */`,t,`/* worker */`,r.substring(r.indexOf(`{`)+1,r.lastIndexOf(`}`))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([i])),this.transcoderBinary=n,this.workerPool.setWorkerCreator(()=>{let e=new Worker(this.workerSourceURL),t=this.transcoderBinary.slice(0);return e.postMessage({type:`init`,config:this.workerConfig,transcoderBinary:t},[t]),e})}),tS>0&&console.warn(`THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances.`),tS++}return this.transcoderPending}load(e,t,n,r){if(this.workerConfig===null)throw Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");let i=new Fa(this.manager);i.setPath(this.path),i.setCrossOrigin(this.crossOrigin),i.setWithCredentials(this.withCredentials),i.setRequestHeader(this.requestHeader),i.setResponseType(`arraybuffer`),i.load(e,e=>{this.parse(e,t,r)},n,r)}parse(e,t,n){if(this.workerConfig===null)throw Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");if(eS.has(e))return eS.get(e).promise.then(t).catch(n);this._createTexture(e).then(e=>t?t(e):null).catch(n)}_createTextureFrom(e,t){let{type:n,error:r,data:{faces:i,width:a,height:o,format:s,type:c,dfdFlags:l}}=e;if(n===`error`)return Promise.reject(r);let u;if(t.faceCount===6)u=new Ri(i,s,c);else{let e=i[0].mipmaps;u=t.layerCount>1?new Li(e,a,o,t.layerCount,s,c):new Ii(e,a,o,s,c)}return u.minFilter=i[0].mipmaps.length===1?y:x,u.magFilter=y,u.generateMipmaps=!1,u.needsUpdate=!0,u.colorSpace=lS(t),u.premultiplyAlpha=!!(l&1),u}async _createTexture(e,t={}){let n=Ux(new Uint8Array(e)),r=n.vkFormat===1000066e3&&n.dataFormatDescriptor[0].colorModel===167;if(!(n.vkFormat===0||r&&!this.workerConfig.astcHDRSupported))return cS(n);let i=t,a=this.init().then(()=>this.workerPool.postMessage({type:`transcode`,buffer:e,taskConfig:i},[e])).then(e=>this._createTextureFrom(e.data,n));return eS.set(e,{promise:a}),a}dispose(){this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),tS--}};rS.BasisFormat={ETC1S:0,UASTC:1,UASTC_HDR:2},rS.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16,BC6H:22,RGB_HALF:24,RGBA_HALF:25},rS.EngineFormat={RGBAFormat:ie,RGBA_ASTC_4x4_Format:Ee,RGB_BPTC_UNSIGNED_Format:L,RGBA_BPTC_Format:Re,RGBA_ETC2_EAC_Format:xe,RGBA_PVRTC_4BPPV1_Format:_e,RGBA_S3TC_DXT5_Format:me,RGB_ETC1_Format:ye,RGB_ETC2_Format:be,RGB_PVRTC_4BPPV1_Format:he,RGBA_S3TC_DXT1_Format:fe},rS.EngineType={UnsignedByteType:S,HalfFloatType:k,FloatType:O},rS.BasisWorker=function(){let e,t,n,r=_EngineFormat,i=_EngineType,a=_TranscoderFormat,o=_BasisFormat;self.addEventListener(`message`,function(n){let r=n.data;switch(r.type){case`init`:e=r.config,s(r.transcoderBinary);break;case`transcode`:t.then(()=>{try{let{faces:e,buffers:t,width:n,height:i,hasAlpha:a,format:o,type:s,dfdFlags:l}=c(r.buffer);self.postMessage({type:`transcode`,id:r.id,data:{faces:e,width:n,height:i,hasAlpha:a,format:o,type:s,dfdFlags:l}},t)}catch(e){console.error(e),self.postMessage({type:`error`,id:r.id,error:e.message})}})}});function s(e){t=new Promise(t=>{n={wasmBinary:e,onRuntimeInitialized:t},BASIS(n)}).then(()=>{n.initializeBasis(),n.KTX2File===void 0&&console.warn(`THREE.KTX2Loader: Please update Basis Universal transcoder.`)})}function c(e){let t=new n.KTX2File(new Uint8Array(e));function r(){t.close(),t.delete()}if(!t.isValid())throw r(),Error(`THREE.KTX2Loader:	Invalid or unsupported .ktx2 file`);let a;if(t.isUASTC())a=o.UASTC;else if(t.isETC1S())a=o.ETC1S;else if(t.isHDR())a=o.UASTC_HDR;else throw Error(`THREE.KTX2Loader: Unknown Basis encoding`);let s=t.getWidth(),c=t.getHeight(),l=t.getLayers()||1,u=t.getLevels(),f=t.getFaces(),m=t.getHasAlpha(),h=t.getDFDFlags(),{transcoderFormat:g,engineFormat:_,engineType:v}=d(a,s,c,m);if(!s||!c||!u)throw r(),Error(`THREE.KTX2Loader:	Invalid texture`);if(!t.startTranscoding())throw r(),Error(`THREE.KTX2Loader: .startTranscoding failed`);let y=[],b=[];for(let e=0;e<f;e++){let n=[];for(let a=0;a<u;a++){let o=[],s,c;for(let n=0;n<l;n++){let l=t.getImageLevelInfo(a,n,e);e===0&&a===0&&n===0&&(l.origWidth%4!=0||l.origHeight%4!=0)&&console.warn(`THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions.`),u>1?(s=l.origWidth,c=l.origHeight):(s=l.width,c=l.height);let d=new Uint8Array(t.getImageTranscodedSizeInBytes(a,n,0,g)),f=t.transcodeImage(d,a,n,e,g,0,-1,-1);if(v===i.HalfFloatType&&(d=new Uint16Array(d.buffer,d.byteOffset,d.byteLength/Uint16Array.BYTES_PER_ELEMENT)),!f)throw r(),Error(`THREE.KTX2Loader: .transcodeImage failed.`);o.push(d)}let d=p(o);n.push({data:d,width:s,height:c}),b.push(d.buffer)}y.push({mipmaps:n,width:s,height:c,format:_,type:v})}return r(),{faces:y,buffers:b,width:s,height:c,hasAlpha:m,dfdFlags:h,format:_,type:v}}let l=[{if:`astcSupported`,basisFormat:[o.UASTC],transcoderFormat:[a.ASTC_4x4,a.ASTC_4x4],engineFormat:[r.RGBA_ASTC_4x4_Format,r.RGBA_ASTC_4x4_Format],engineType:[i.UnsignedByteType],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:`bptcSupported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.BC7_M5,a.BC7_M5],engineFormat:[r.RGBA_BPTC_Format,r.RGBA_BPTC_Format],engineType:[i.UnsignedByteType],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:`dxtSupported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.BC1,a.BC3],engineFormat:[r.RGBA_S3TC_DXT1_Format,r.RGBA_S3TC_DXT5_Format],engineType:[i.UnsignedByteType],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:`etc2Supported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.ETC1,a.ETC2],engineFormat:[r.RGB_ETC2_Format,r.RGBA_ETC2_EAC_Format],engineType:[i.UnsignedByteType],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:`etc1Supported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.ETC1],engineFormat:[r.RGB_ETC1_Format],engineType:[i.UnsignedByteType],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:`pvrtcSupported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.PVRTC1_4_RGB,a.PVRTC1_4_RGBA],engineFormat:[r.RGB_PVRTC_4BPPV1_Format,r.RGBA_PVRTC_4BPPV1_Format],engineType:[i.UnsignedByteType],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0},{if:`bptcSupported`,basisFormat:[o.UASTC_HDR],transcoderFormat:[a.BC6H],engineFormat:[r.RGB_BPTC_UNSIGNED_Format],engineType:[i.HalfFloatType],priorityHDR:1,needsPowerOfTwo:!1},{basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.RGBA32,a.RGBA32],engineFormat:[r.RGBAFormat,r.RGBAFormat],engineType:[i.UnsignedByteType,i.UnsignedByteType],priorityETC1S:100,priorityUASTC:100,needsPowerOfTwo:!1},{basisFormat:[o.UASTC_HDR],transcoderFormat:[a.RGBA_HALF],engineFormat:[r.RGBAFormat],engineType:[i.HalfFloatType],priorityHDR:100,needsPowerOfTwo:!1}],u={[o.ETC1S]:l.filter(e=>e.basisFormat.includes(o.ETC1S)).sort((e,t)=>e.priorityETC1S-t.priorityETC1S),[o.UASTC]:l.filter(e=>e.basisFormat.includes(o.UASTC)).sort((e,t)=>e.priorityUASTC-t.priorityUASTC),[o.UASTC_HDR]:l.filter(e=>e.basisFormat.includes(o.UASTC_HDR)).sort((e,t)=>e.priorityHDR-t.priorityHDR)};function d(t,n,r,i){let a=u[t];for(let o=0;o<a.length;o++){let s=a[o];if((!s.if||e[s.if])&&s.basisFormat.includes(t)&&!(i&&s.transcoderFormat.length<2)&&(!s.needsPowerOfTwo||f(n)&&f(r)))return{transcoderFormat:s.transcoderFormat[+!!i],engineFormat:s.engineFormat[+!!i],engineType:s.engineType[0]}}throw Error(`THREE.KTX2Loader: Failed to identify transcoding target.`)}function f(e){return e<=2||!(e&e-1)&&e!==0}function p(e){if(e.length===1)return e[0];let t=0;for(let n=0;n<e.length;n++){let r=e[n];t+=r.byteLength}let n=new Uint8Array(t),r=0;for(let t=0;t<e.length;t++){let i=e[t];n.set(i,r),r+=i.byteLength}return n}};var iS=new Set([ie,re,N,se]),aS=new Set([91]),oS={109:ie,103:N,100:se,97:ie,83:N,76:se,91:ie,43:ie,37:ie,22:N,16:N,15:se,9:se,123:re,122:re,152:xe,148:be,153:Se,154:Ce,155:we,156:Te,[Rx]:Ee,158:Ee,157:Ee,[zx]:Ae,166:Ae,165:Ae,134:fe,133:fe,132:de,131:de,138:me,137:me,140:Be,139:ze,142:He,141:Ve,146:Re,145:Re,[Lx]:_e,[Fx]:_e,[Ix]:ve,[Px]:ve},sS={109:O,103:O,100:O,97:k,83:k,76:k,91:T,43:S,37:S,22:S,16:S,15:S,9:S,123:j,122:ne,152:S,148:S,153:S,154:S,155:S,156:S,[Rx]:k,158:S,157:S,[zx]:k,166:S,165:S,134:S,133:S,132:S,131:S,138:S,137:S,140:S,139:S,142:S,141:S,146:S,145:S,[Lx]:S,[Fx]:S,[Ix]:S,[Px]:S};async function cS(e){let{vkFormat:t}=e;if(oS[t]===void 0)throw Error(`THREE.KTX2Loader: Unsupported vkFormat: `+t);sS[t]===void 0&&console.warn(`THREE.KTX2Loader: Missing ".type" for vkFormat: `+t);let n;e.supercompressionScheme===2&&(nS||=new Promise(async e=>{let t=new Jx;await t.init(),e(t)}),n=await nS);let r=[];for(let i=0;i<e.levels.length;i++){let a=Math.max(1,e.pixelWidth>>i),o=Math.max(1,e.pixelHeight>>i),s=e.pixelDepth?Math.max(1,e.pixelDepth>>i):0,c=e.levels[i],l;if(e.supercompressionScheme===0)l=c.levelData;else if(e.supercompressionScheme===2)l=n.decode(c.levelData,c.uncompressedByteLength);else throw Error(`THREE.KTX2Loader: Unsupported supercompressionScheme.`);let u;u=sS[t]===1015?new Float32Array(l.buffer,l.byteOffset,l.byteLength/Float32Array.BYTES_PER_ELEMENT):sS[t]===1016||sS[t]===1012?new Uint16Array(l.buffer,l.byteOffset,l.byteLength/Uint16Array.BYTES_PER_ELEMENT):sS[t]===35902||sS[t]===35899?new Uint32Array(l.buffer,l.byteOffset,l.byteLength/Uint32Array.BYTES_PER_ELEMENT):l,r.push({data:u,width:a,height:o,depth:s})}let i=e.levelCount===0||r.length>1,a;if(iS.has(oS[t]))a=e.pixelDepth===0?new Oi(r[0].data,e.pixelWidth,e.pixelHeight):new pn(r[0].data,e.pixelWidth,e.pixelHeight,e.pixelDepth),a.minFilter=i?_:g,a.magFilter=g,a.generateMipmaps=e.levelCount===0,a.normalized=aS.has(t);else{if(e.pixelDepth>0)throw Error(`THREE.KTX2Loader: Unsupported pixelDepth.`);a=new Ii(r,e.pixelWidth,e.pixelHeight),a.minFilter=i?x:y,a.magFilter=y}return a.mipmaps=r,a.type=sS[t],a.format=oS[t],a.colorSpace=lS(e),a.needsUpdate=!0,Promise.resolve(a)}function lS(e){let t=e.dataFormatDescriptor[0];return t.colorPrimaries===1?t.transferFunction===2?nt:rt:t.colorPrimaries===10?t.transferFunction===2?Xx:Zx:(t.colorPrimaries===0||console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${t.colorPrimaries}"`),``)}var uS=class{imageLoader=new Ra;ktx2Loader;constructor(e,t=`/basis/`){this.ktx2Loader=new rS().setTranscoderPath(t).detectSupport(e)}loadAsync(e){return/\.ktx2(?:[?#]|$)/i.test(e)?this.ktx2Loader.loadAsync(e):this.imageLoader.loadAsync(e)}dispose(){this.ktx2Loader.dispose()}},dS={maxOutputSize:1024,enabled:!1};function fS(e,t,n,r=dS){let i=Math.max(1,Number.isFinite(e)?e:1),a=Math.max(1,Number.isFinite(t)?t:1),o=Math.min(Math.max(.1,Number.isFinite(n)?n:1),2);return r.enabled?Math.min(o,r.maxOutputSize/Math.max(i,a)):o}var pS=1,mS=new W(i.x,i.y,i.z),hS=new W(a.x,a.y,a.z).normalize(),gS=new W(0,1,0),_S=!0,vS=0,yS=1e-5,bS=Ip(`up`);function xS(e){return e&&typeof e==`object`?e:{}}function SS(e){return Array.isArray(e)?e.length:0}function CS(e){let t=xS(e);return{managers:SS(t.managers??t.Managers),bones:SS(t.bones??t.Bones),extraBones:SS(t.extraBones??t.ExtraBones),sphereColliders:SS(t.sphereColliders??t.SphereColliders),capsuleColliders:SS(t.capsuleColliders??t.CapsuleColliders),panelColliders:SS(t.panelColliders??t.PanelColliders),characterHairPresent:!!(t.characterHair??t.CharacterHair),characterEyePresent:!!(t.characterEye??t.CharacterEye)}}function wS(e,t,n){let r=xS(e),i=xS(r.pjskSpringBone??r.PjskSpringBone),a=xS(i.raw??i.Raw),o=CS(a.body??a.Body),s=CS(a.head??a.Head),c=!!(a.body??a.Body??a.head??a.Head);return{present:c,runtimePresent:!!n,active:!!n?.enabled,bodyManagerCount:o.managers,bodySpringBoneCount:o.bones,bodyExtraBoneCount:o.extraBones,bodySphereColliderCount:o.sphereColliders,bodyCapsuleColliderCount:o.capsuleColliders,bodyPanelColliderCount:o.panelColliders,headManagerCount:s.managers,headSpringBoneCount:s.bones,headExtraBoneCount:s.extraBones,headSphereColliderCount:s.sphereColliders,headCapsuleColliderCount:s.capsuleColliders,headPanelColliderCount:s.panelColliders,characterHairPresent:s.characterHairPresent,characterEyePresent:s.characterEyePresent,vrmSpringBoneManagerPresent:t,utjRuntime:n,source:c?`PJSK_sekai_runtime`:`none`}}function TS(e,t,n=new Set){if(e&&typeof e==`object`&&!n.has(e)){if(n.add(e),e instanceof cn){t.add(e);return}if(!(e instanceof J||e instanceof H||e instanceof W||e instanceof ln||e instanceof G||e instanceof q||ArrayBuffer.isView(e)||e instanceof ArrayBuffer)){if(Array.isArray(e)){for(let r of e)TS(r,t,n);return}for(let r of Object.values(e))TS(r,t,n)}}}function ES(e,t=!0,n=new Set,r=new Set){let i=Array.isArray(e)?e:[e];for(let e of i)if(!n.has(e)){if(t){let t=new Set;TS(e,t);for(let e of t)r.has(e)||(e.dispose(),r.add(e))}e.dispose()}}function DS(e,t=new Set){let n=new Set,r=new Set;e.traverse(e=>{let i=e;i.isMesh&&(i.geometry&&!i.userData.pjskOutlineShell&&!n.has(i.geometry)&&(i.geometry.dispose(),n.add(i.geometry)),i.material&&ES(i.material,!0,t,r))})}function OS(e,t=new Set){for(let n of[...e.children])DS(n,t),e.remove(n)}function kS(e){let t=e.getAttribute(`color`);if(!t)return null;let n=0;for(let e=0;e<t.count;e+=1)if(n=Math.max(n,t.getX(e)),n>.01)return n;return n}function AS(e){return e===`eye`||e===`eyelight`}function jS(e){let t=new Set;typeof e.userData.pjskMaterialKind==`string`&&t.add(e.userData.pjskMaterialKind);let n=Array.isArray(e.material)?e.material:[e.material];for(let e of n)typeof e?.userData.pjskMaterialKind==`string`&&t.add(e.userData.pjskMaterialKind);let r=n.map(e=>e.name.toLowerCase()),i=e.name.toLowerCase();return(Cb(e.name)===`acc`||i.includes(`/acc`)||r.some(e=>e.includes(`_acc`)||e.startsWith(`mtl_acc`)))&&t.add(`accessory`),[...t]}function MS(e){return e.find(e=>!AS(e))??e[0]??null}function NS(e){return e.length>0&&e.every(AS)}function PS(e){if(e instanceof ea){let t=e.uniforms.uMainTex?.value;if(t instanceof cn)return t}return e.map??null}function FS(e,t,n,r=0,i=1){let a=Math.hypot(t,n);return a<=yS?e.set(r,i):e.set(t/a,n/a)}function IS(e,t){let n=Math.abs(t-e);return V.clamp(1-Math.abs(n-180)/180,0,1)}function LS(e){return e&&typeof e==`object`?e:{}}function RS(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function zS(e){let t=LS(e),n=RS(t.r??t.R),r=RS(t.g??t.G),i=RS(t.b??t.B);return n===null||r===null||i===null?null:`#${new J(n,r,i).getHexString()}`}function BS(e,t=!0){let n=LS(e),r=RS(n.tileX??n.TileX),i=RS(n.tileY??n.TileY),a=RS(n.sample??n.Sample);return r&&i&&a!==null?{tileX:r,tileY:i,sample:a,enabled:t}:null}function VS(e){let t=LS(e),n=LS(t.characterControllers??t.CharacterControllers),r=LS(n.eye??n.Eye);return Object.keys(r).length?{lightInfluence:RS(r.lightInfluence??r.LightInfluence),lightInfluenceForEyeHighlight:RS(r.lightInfluenceForEyeHighlight??r.LightInfluenceForEyeHighlight),tintColor:zS(r.tintColor??r.TintColor),emissionColor:zS(r.emissionColor??r.EmissionColor),baseTiling:BS(r.baseTiling??r.BaseTiling),highlightTiling:BS(r.highlightTiling??r.HighlightTiling)}:null}function HS(e){let t=LS(e),n=LS(t.pjskSpringBone??t.PjskSpringBone),r=LS(t.runtimeUnitySetup??t.RuntimeUnitySetup??n.runtimeUnitySetup??n.RuntimeUnitySetup),i=LS(t.funit??t.FUnit??n.funit??n.FUnit??r.funit??r.FUnit),a=i.detectedScripts??i.DetectedScripts,o=Array.isArray(a)?a.filter(e=>typeof e==`string`):[],s=(e,t)=>Math.max(Math.trunc(RS(i[e]??i[t])??0),0);return{present:!!(i.present??i.Present),scriptCount:s(`scriptCount`,`ScriptCount`),springManagerCount:s(`springManagerCount`,`SpringManagerCount`),springBoneCount:s(`springBoneCount`,`SpringBoneCount`),sphereColliderCount:s(`sphereColliderCount`,`SphereColliderCount`),capsuleColliderCount:s(`capsuleColliderCount`,`CapsuleColliderCount`),panelColliderCount:s(`panelColliderCount`,`PanelColliderCount`),detectedScripts:o,policy:typeof(i.policy??i.Policy)==`string`?String(i.policy??i.Policy):`metadata_only; do not merge with UTJ/Sekai SpringBone runtime`}}function US(e){let t=LS(e),n=LS(t.characterControllers??t.CharacterControllers),r=LS(n.hair??n.Hair);if(!Object.keys(r).length)return null;let i=LS(r.headTransform??r.HeadTransform);return{offset:Np(Ap(r.offset??r.Offset,new W)),headTransformName:typeof(i.name??i.Name)==`string`?String(i.name??i.Name):null,headTransformPath:typeof(i.transformPath??i.TransformPath)==`string`?String(i.transformPath??i.TransformPath):null}}function WS(e,t){for(let n of t){let t=e.get(n);if(t)return{node:t,path:n}}return null}function GS(e){return{x:Number(e.x.toFixed(5)),y:Number(e.y.toFixed(5)),z:Number(e.z.toFixed(5))}}function KS(e){let[t,...n]=e.split(`:`),r=Number(t);if(!Number.isInteger(r)||r<=0)throw Error(`Invalid roleId ${e}: expected "<characterId>:<unit>".`);return{characterId:r,unit:n.length>0&&n.join(`:`).trim()||null}}function qS(){let e=Error(`Custom part selection was superseded by a newer request.`);return e.name=`AbortError`,e}var JS=class{container;ownsCanvas;scene;camera;renderer;controls;cameraTarget=new W;autoRender;manageResize;clock=new Co;directionalLight;fillLight;previewLightBase;textureLoader;bodyMaterial;hairMaterial;faceMaterial;characterLighting;projectedShadow;characterRoot;bodySlot;headSlot;sceneReference=new Vn;capturePresentationEnabled=null;captureBackgroundTexture=null;backgroundTheme=`light`;viewportWidth=0;viewportHeight=0;viewportPixelRatio=0;animationFrame=0;importRevision=0;customSelectionQueue=Promise.resolve();customSelectionGeneration=0;currentBodyAsset=null;currentHeadAsset=null;currentImportSnapshot=null;currentBodyAttachNode=null;currentHeadAttachOriginNode=null;currentCompositionStatus={mode:`pending`,missingBodyBones:[],missingHeadBones:[]};currentBodyAnimationRoot=null;faceMotion=new cb;animationPlayback;currentRuntimeExtension=null;currentSpringRuntime=null;currentExtraBoneRuntime=null;currentConstraintRuntime=null;currentSpringSimulationControl=null;currentPrefabSourceGraph=null;currentPrefabHeadFollowDebug={active:!1,sourcePath:null,targetPath:null,reason:null};springRuntimeMode=`unity-prefab`;masterCharacterHeightMeters=1.6;characterModelScaleMeters=1.6;tempMatrixA=new q;tempMatrixB=new q;tempVector=new W;tempVectorB=new W;tempQuaternion=new U;tempScale=new W;faceRightWorld=new W;faceUpWorld=new W;faceForwardWorld=new W;headTransformUpWorld=new W;faceHeadWorldPosition=new W;faceShadowHeadHorizontal=new H;faceShadowLightHorizontal=new H;headDotDirectionalLight=new H;hairHeadPosition=new W;currentHairOffset=new W;currentHairHeadTransform=null;currentCameraPreset=`default`;currentCameraProfile=null;cameraRootYawDegrees=0;viewFraming={...Jg};cameraDebugChangeCallback=null;currentLoadedRuntimePackage=null;lastNativeMeshInstallDiagnostics=null;lastConstraintSetupDiagnostics=null;runtimeDebug={materialBindingMode:`manifest`,hairShadowMode:`sekai_head_position`,hairShadowOffset:GS(this.currentHairOffset),hairShadowWorldPosition:GS(this.hairHeadPosition),funit:HS(null),body:[],head:[],headMaterialSlots:[],headMorphs:[],outlineShells:[]};constructor(e,t){let n=e instanceof HTMLElement?{container:e,initialLight:t}:e;if(!n.initialLight)throw Error(`Missing initial light state for Haruki 3D engine.`);let r=n.initialLight;if(this.previewLightBase={...r},!n.container&&!n.canvas)throw Error(`Haruki 3D engine requires a container or canvas.`);this.animationPlayback=new nb({onLoopPromoted:()=>this.faceMotion.promoteLoop()}),this.container=n.container??null,this.ownsCanvas=n.canvas===void 0,this.autoRender=n.autoRender??!0,this.manageResize=n.manageResize??n.canvas===void 0,this.scene=new Xn,this.scene.background=new J(`#7f8d95`),this.scene.fog=new Yn(`#7f8d95`,5.5,15);let i=n.canvas??n.container,a=this.ownsCanvas?320:1,o=Math.max(i.clientWidth,a),s=Math.max(i.clientHeight,a),c=Wg(this.characterModelScaleMeters);this.camera=new Za(c.fov,o/s,.1,100),this.camera.position.copy(c.position),this.renderer=new Ul({antialias:!1,stencil:!0,canvas:n.canvas}),this.renderer.autoClearStencil=!0;let l=fS(o,s,window.devicePixelRatio);this.renderer.setPixelRatio(l),this.renderer.setSize(o,s,this.ownsCanvas),this.viewportWidth=o,this.viewportHeight=s,this.viewportPixelRatio=l,this.renderer.outputColorSpace=nt,this.container&&this.renderer.domElement.parentElement!==this.container&&this.container.appendChild(this.renderer.domElement),this.updateCaptureBackgroundTexture(),this.cameraTarget.copy(c.target),n.controlsFactory?(this.controls=n.controlsFactory({camera:this.camera,canvas:this.renderer.domElement,target:this.cameraTarget,onChange:e=>{this.cameraTarget.copy(e),this.cameraDebugChangeCallback?.()}}),this.controls.update()):(this.controls=null,this.camera.lookAt(this.cameraTarget)),this.directionalLight=new eo(`#fffaf2`,r.intensity),this.directionalLight.position.set(r.x,r.y,r.z),this.scene.add(this.directionalLight),this.fillLight=new to(`#fff8f0`,r.ambient),this.scene.add(this.fillLight),this.textureLoader=new uS(this.renderer,n.ktx2TranscoderPath),this.bodyMaterial=lp({baseColor:`#f5d6d0`,shadowColor:`#c79b95`,lightDirection:this.directionalLight.position.clone(),lightIntensity:r.intensity,ambientIntensity:r.ambient,shadowThreshold:r.shadowThreshold,shadowWeight:r.shadowWeight,valueShadowInfluence:pS,characterAmbientIntensity:r.characterAmbient,rimColorAlpha:r.rimColorAlpha,controllerRimRange:r.rimRange,controllerRimEdgeSmoothness:r.rimEdgeSmoothness,controllerRimEmission:r.rimEmission,controllerRimLightInfluence:r.rimLightInfluence,controllerRimShadowSharpness:r.rimShadowSharpness,rimDirection:_b()}),this.hairMaterial=lp({baseColor:`#7b5b4a`,shadowColor:`#513d33`,lightDirection:this.directionalLight.position.clone(),lightIntensity:r.intensity,ambientIntensity:r.ambient,shadowThreshold:r.shadowThreshold,shadowWeight:r.shadowWeight,valueShadowInfluence:pS,characterAmbientIntensity:r.characterAmbient,rimColorAlpha:r.rimColorAlpha,controllerRimRange:r.rimRange,controllerRimEdgeSmoothness:r.rimEdgeSmoothness,controllerRimEmission:r.rimEmission,controllerRimLightInfluence:r.rimLightInfluence,controllerRimShadowSharpness:r.rimShadowSharpness,rimDirection:_b(),hairShadowEnabled:!1,useLambert:!0,headPosition:this.hairHeadPosition}),this.faceMaterial=bp({baseColor:`#ffe4dc`,warmColor:`#ffd4c8`,lightDirection:hS.clone(),lightIntensity:r.intensity,ambientIntensity:r.ambient,headDotDirectionalLight:this.headDotDirectionalLight,useFaceShadowLimiter:_S,faceShadowLimitRange:vS,shadowThreshold:r.shadowThreshold,shadowWeight:r.shadowWeight,useLambert:!0}),this.characterRoot=new Vn,this.bodySlot=new Vn,this.headSlot=new Vn,this.characterRoot.add(this.bodySlot),this.characterRoot.add(this.headSlot),this.characterLighting=new Mx({bodyMaterial:this.bodyMaterial,hairMaterial:this.hairMaterial,faceMaterial:this.faceMaterial,bodySlot:this.bodySlot,headSlot:this.headSlot,directionalLight:this.directionalLight,fillLight:this.fillLight,debug:this.runtimeDebug,valueShadowInfluence:pS}),this.scene.add(this.characterRoot),this.projectedShadow=new i_,this.scene.add(this.projectedShadow.group),this.setPresentationMode(n.presentationMode??`interactive`),this.applyCameraPreset(n.cameraPreset??`default`,n.cameraProfile),this.handleResize=this.handleResize.bind(this),this.manageResize&&(window.addEventListener(`resize`,this.handleResize),this.handleResize()),this.autoRender&&this.render()}async importCombinedCharacter(e,t={}){let n=++this.importRevision,r=t.preserveAnimation?this.animationPlayback.capturePosition():null;t.disposeBeforeLoad&&this.releaseCurrentCharacterResources({preserveAnimationSelection:t.preserveAnimation??!1,clearAnimationCache:t.clearAnimationCache??!1}),this.runtimeDebug.outlineShells=[],this.lastNativeMeshInstallDiagnostics=null,this.currentBodyAsset=e.bodyAsset,this.currentHeadAsset=e.headAsset,this.characterLighting.setCharacterSkinColors(e.skinColors??null),this.lastConstraintSetupDiagnostics=null,this.applyCostumeShopCharacterHeight(e.bodyAsset.characterHeightMeters??this.masterCharacterHeightMeters);let i=await this.loadCombinedCharacterAsset(e);if(n!==this.importRevision)return{revision:n,body:this.makeImportStatus(e.bodyAsset,i),head:this.makeImportStatus(e.headAsset,i),composition:this.currentCompositionStatus};this.clearCharacterSlot(this.bodySlot),this.clearCharacterSlot(this.headSlot),this.resetSlotParents(),this.currentRuntimeExtension=e.runtimeExtension,this.currentSpringRuntime=null,this.currentExtraBoneRuntime=null,this.currentConstraintRuntime=null,this.currentBodyAttachNode=null,this.currentHeadAttachOriginNode=null,this.runtimeDebug.headMorphs=[],this.faceMotion.release({preserveMotion:!0}),this.currentBodyAnimationRoot=null,this.currentPrefabSourceGraph=null,this.currentHairHeadTransform=null,this.currentPrefabHeadFollowDebug={active:!1,sourcePath:null,targetPath:null,reason:`not initialized`},this.bodySlot.add(i.root),this.currentPrefabSourceGraph=i.prefabSourceGraph,$_(i.prefabSourceGraph,this.characterModelScaleMeters),i.prefabSourceGraph.root!==i.root&&this.bodySlot.add(i.prefabSourceGraph.root),this.currentBodyAnimationRoot=i.prefabSourceGraph.root,this.currentBodyAttachNode=i.prefabSourceGraph.bodyAttach,this.currentHeadAttachOriginNode=i.prefabSourceGraph.headOrigin,this.currentPrefabHeadFollowDebug=i.prefabSourceGraph.debug,this.runtimeDebug.headMorphs=this.faceMotion.bind(i.root,e.headAsset),this.prepareCombinedComposition(),this.currentConstraintRuntime=Yv(i.prefabSourceGraph,this.currentRuntimeExtension,this.characterModelScaleMeters),this.syncUnityPrefabSourceGraph(),this.currentExtraBoneRuntime=vg.fromPjskRuntimeExtension(this.currentRuntimeExtension,i.prefabSourceGraph.root),this.currentSpringRuntime=this.createSpringRuntime(i.prefabSourceGraph.root),await Promise.all([this.reloadAnimationPlayback({resetSpring:r===null}),this.renderer.compileAsync(this.scene,this.camera)]),r&&(this.animationPlayback.restorePosition(r),this.faceMotion.applyCurrent(),this.syncOfficialModelCombineSetup(),this.currentExtraBoneRuntime?.update(),this.resetCurrentSpringRuntimeState());let a={revision:n,body:{...this.makeImportStatus(e.bodyAsset,i),assetId:e.id,displayName:`${e.displayName} [combined body]`},head:{...this.makeImportStatus(e.headAsset,i),assetId:e.id,displayName:`${e.displayName} [combined head]`},composition:this.currentCompositionStatus};return this.currentImportSnapshot=a,this.characterLighting.applyCharacterView(),a}setHairShadowMode(e){this.characterLighting.setHairShadowMode(e)}setProjectedShadowSettings(e={}){this.projectedShadow.setSettings(e)}setFaceSdfDebugMode(e){this.characterLighting.setFaceSdfDebugMode(e)}setFaceSdfEnabled(e){this.characterLighting.setFaceSdfEnabled(e)}setBodyDebugMode(e){this.characterLighting.setBodyDebugMode(e)}setToonShadowPreview(e,t){this.characterLighting.setToonShadowPreview(e,t)}setFaceSdfDebugLightMode(e){this.characterLighting.setFaceSdfDebugLightMode(e),this.updateShaderFaceBasis()}setRenderIsolationMode(e){this.characterLighting.setRenderIsolationMode(e)}setCharacterYawDegrees(e){let t=V.degToRad(Number.isFinite(e)?e:0);this.characterRoot.rotation.y=t,this.characterRoot.updateMatrixWorld(!0),this.syncOfficialModelCombineSetup(),this.characterRoot.updateMatrixWorld(!0),this.resetCurrentSpringRuntimeState(),this.updateShaderFaceBasis()}setViewYawDegrees(e){this.cameraRootYawDegrees=Number.isFinite(e)?e:0,this.applyCostumeShopView()}setViewZoom(e){this.viewFraming=Yg({...this.viewFraming,zoom:e}),this.applyCostumeShopView()}setViewHeightOffset(e){this.viewFraming=Yg({...this.viewFraming,heightOffset:e}),this.applyCostumeShopView()}getViewFraming(){return{...this.viewFraming}}applyCostumeShopView(){let e;if(this.currentCameraPreset===`capture`)e=Gg(this.currentCameraProfile??`full-body`,this.cameraRootYawDegrees,this.masterCharacterHeightMeters);else{let t=Wg(this.characterModelScaleMeters),n=t.position.clone().sub(t.target).applyAxisAngle(gS,V.degToRad(this.cameraRootYawDegrees));e={target:t.target,position:t.target.clone().add(n),fov:t.fov}}let t=Xg(e,this.viewFraming);this.setCameraTarget(t.target),this.camera.position.copy(t.position),this.camera.fov=e.fov,this.camera.updateProjectionMatrix(),this.syncCameraTarget(),this.applyPreviewLightForCameraRoot(),this.updateShaderFaceBasis(),this.cameraDebugChangeCallback?.()}faceCharacterTowardCamera(){this.characterRoot.updateMatrixWorld(!0);let e=this.currentBodyAnimationRoot??this.characterRoot;e.updateMatrixWorld(!0);let t=WS(d_(e),[`body/Position`,`body/Position/PositionOffset`,`body/Position/PositionOffset/Hip`,`body/Position/Hip`,`face/Position`])?.node??e;if(t.updateMatrixWorld(!0),Lp(t,this.tempQuaternion),this.tempVector.set(0,0,1).applyQuaternion(this.tempQuaternion),this.tempVector.y=0,this.tempVector.lengthSq()<1e-6){this.setCharacterYawDegrees(0);return}this.tempVector.normalize(),t.getWorldPosition(this.tempVectorB);let n=this.camera.position.clone().sub(this.tempVectorB);if(n.y=0,n.lengthSq()<1e-6){this.setCharacterYawDegrees(0);return}n.normalize();let r=Math.atan2(this.tempVector.x,this.tempVector.z),i=Math.atan2(n.x,n.z);this.characterRoot.rotation.y+=i-r,this.characterRoot.updateMatrixWorld(!0),this.syncOfficialModelCombineSetup(),this.characterRoot.updateMatrixWorld(!0),this.resetCurrentSpringRuntimeState(),this.updateShaderFaceBasis()}getRuntimeDebugSnapshot(){return{...structuredClone(this.runtimeDebug),headMaterialSlots:this.currentHeadAsset?.faceMaterials.map(e=>({meshName:e.meshName,slotIndex:e.slotIndex,materialKey:e.materialKey,materialName:e.materialName,materialKind:e.materialKind,isAccessory:e.isAccessory,valueTex:e.valueTex}))??[],nativeMeshes:this.lastNativeMeshInstallDiagnostics,constraints:this.lastConstraintSetupDiagnostics,funit:HS(this.currentRuntimeExtension),hairShadowOffset:GS(this.currentHairOffset),hairShadowWorldPosition:GS(this.hairHeadPosition),camera:this.getCameraDebugSnapshot(),faceLight:this.getFaceLightDebugSnapshot(),projectedShadow:this.projectedShadow.getDebugSnapshot(this.characterModelScaleMeters)}}getFaceLightDebugSnapshot(){let e=this.directionalLight.position.clone().normalize(),t=this.characterLighting.resolveFaceShadowLightDirection(this.getCameraRootFaceShadowLightDirection(),this.faceRightWorld,this.faceForwardWorld),n=new H,r=new H,i=new H,a=new H;FS(n,-this.headTransformUpWorld.x,-this.headTransformUpWorld.z),FS(r,this.faceRightWorld.x,this.faceRightWorld.z),FS(i,this.faceForwardWorld.x,this.faceForwardWorld.z),FS(a,t.x,t.z);let o=V.radToDeg(Math.atan2(this.faceForwardWorld.x,this.faceForwardWorld.z)),s=V.radToDeg(Math.atan2(a.x,a.y)),c=this.faceForwardWorld.clone().normalize(),l=this.faceRightWorld.clone().sub(c.clone().multiplyScalar(this.faceRightWorld.dot(c))).normalize(),u=this.faceUpWorld.clone().sub(c.clone().multiplyScalar(this.faceUpWorld.dot(c))).sub(l.clone().multiplyScalar(this.faceUpWorld.dot(l))).normalize(),d=new W(t.dot(l),t.dot(u),t.dot(c)),f=Math.max(Math.hypot(d.x,d.z),.001),p=d.x/f,m=d.z/f,h=(this.faceMaterial.uniforms.uUseFaceShadowLimiter?.value??1)>.5,g=this.faceMaterial.uniforms.uFaceShadowLimitRange?.value??0,_=this.headDotDirectionalLight.y,v=V.clamp(h?Math.min(Math.max((1-Math.abs(2*_-1))*.5,0),g):_,0,1);return{lightDirection:GS(t),previewLightDirection:GS(e),costumeShopLightRotationDegrees:GS(mS),faceRightWorld:GS(l),faceUpWorld:GS(u),faceForwardWorld:GS(c),headHorizontalFromUp:{x:Number(n.x.toFixed(5)),y:Number(n.y.toFixed(5))},headHorizontalFromRight:{x:Number(r.x.toFixed(5)),y:Number(r.y.toFixed(5))},headHorizontalFromForward:{x:Number(i.x.toFixed(5)),y:Number(i.y.toFixed(5))},lightHorizontal:{x:Number(a.x.toFixed(5)),y:Number(a.y.toFixed(5))},headDotDirectionalLight:{x:Number(this.headDotDirectionalLight.x.toFixed(5)),y:Number(this.headDotDirectionalLight.y.toFixed(5))},faceTbnLight:GS(d),faceLight:{side:Number(p.toFixed(5)),front:Number(m.toFixed(5))},faceSdfLimit:Number(v.toFixed(5)),headYawDegrees:Number(o.toFixed(3)),lightYawDegrees:Number(s.toFixed(3))}}getCameraDebugSnapshot(){let e=this.camera.position,t=this.controls?.target??this.cameraTarget,n=e.clone().sub(t),r=new wo().setFromVector3(n),i=(this.currentCameraPreset===`capture`?Gg(this.currentCameraProfile??`full-body`,this.cameraRootYawDegrees,this.masterCharacterHeightMeters):null)?.costumeShopState??null;return{preset:this.currentCameraPreset,profile:this.currentCameraProfile,characterRootYawDegrees:Number(V.radToDeg(this.characterRoot.rotation.y).toFixed(3)),costumeShopState:i===null?null:{cameraRootYawDegrees:Number(i.cameraRootYawDegrees.toFixed(3)),zoomValue:Number(i.zoomValue.toFixed(4)),zoomMoveValue:Number(i.zoomMoveValue.toFixed(4)),zoomRatio:Number(i.zoomRatio.toFixed(4)),localCameraPosition:{x:Number(i.localCameraPosition.x.toFixed(4)),y:Number(i.localCameraPosition.y.toFixed(4)),z:Number(i.localCameraPosition.z.toFixed(4))},localCameraRotationYDegrees:i.localCameraRotationYDegrees},position:{x:Number(e.x.toFixed(4)),y:Number(e.y.toFixed(4)),z:Number(e.z.toFixed(4))},target:{x:Number(t.x.toFixed(4)),y:Number(t.y.toFixed(4)),z:Number(t.z.toFixed(4))},offset:{x:Number(n.x.toFixed(4)),y:Number(n.y.toFixed(4)),z:Number(n.z.toFixed(4))},distance:Number(r.radius.toFixed(4)),polarDegrees:Number(V.radToDeg(r.phi).toFixed(3)),azimuthDegrees:Number(V.radToDeg(r.theta).toFixed(3)),fovDegrees:Number(this.camera.fov.toFixed(3)),aspect:Number(this.camera.aspect.toFixed(4)),zoom:Number(this.camera.zoom.toFixed(4)),minPolarDegrees:Number(V.radToDeg(this.controls?.minPolarAngle??V.degToRad(82)).toFixed(3)),maxPolarDegrees:Number(V.radToDeg(this.controls?.maxPolarAngle??V.degToRad(100)).toFixed(3)),masterCharacterHeightMeters:Number(this.masterCharacterHeightMeters.toFixed(4)),characterModelScaleMeters:Number(this.characterModelScaleMeters.toFixed(4))}}onCameraDebugChange(e){this.cameraDebugChangeCallback=e}getSpringBoneSnapshot(e){return wS(this.currentRuntimeExtension,!1,this.currentSpringRuntime?.getSnapshot(this.isSpringRuntimeEnabled(),e)??null)}setUtjSpringBoneTraceFilters(e,t){this.currentSpringRuntime?.setTraceBoneFilters(e,t)}getUtjSpringBoneTraceSnapshot(){return this.currentSpringRuntime?.getTraceSnapshot()??null}getAnimationSnapshot(){let e=this.currentSpringRuntime?.getControlledTrackNodeNames()??new Set,t=this.animationPlayback.getSnapshot({faceMotionEnabled:this.faceMotion.isEnabled(),utjControlledNodeNames:e});return t.bodyRetargetDebug?{...t,bodyRetargetDebug:{...t.bodyRetargetDebug,prefabHeadFollow:this.getPrefabHeadFollowDebugSnapshot()}}:t}getFaceMotionSnapshot(){return this.faceMotion.getSnapshot()}setAnimationPaused(e){this.animationPlayback.setPaused(e)}setAnimationSpeed(e){this.animationPlayback.setSpeed(e)}setFaceMotionEnabled(e){this.faceMotion.setEnabled(e)}setBodyHeadTracksEnabled(e){this.animationPlayback.setBodyHeadTracksEnabled(e)&&this.reloadAnimationPlayback()}setUtjSpringBoneEnabled(e){this.setSpringRuntimeMode(e?`unity-prefab`:`off`)}setSpringRuntimeMode(e){this.springRuntimeMode!==e&&(this.currentSpringRuntime?.resetPose(),this.springRuntimeMode=e,this.resetCurrentSpringRuntimeState())}resetCurrentSpringRuntimeState(){this.currentSpringRuntime?.resetStateToCurrentPose()}isSpringRuntimeEnabled(){return this.springRuntimeMode!==`off`}createSpringRuntime(e){let t=Vm.fromPjskRuntimeExtension(this.currentRuntimeExtension,e);return t&&this.currentSpringSimulationControl&&t.setSimulationControl(this.currentSpringSimulationControl),t}setSpringSimulationControl(e){this.currentSpringSimulationControl=e?{...e}:null,this.currentSpringSimulationControl?this.currentSpringRuntime?.setSimulationControl(this.currentSpringSimulationControl):this.currentSpringRuntime?.clearSimulationControl()}seekAnimation(e){this.prepareSpringRuntimeForAnimationSeek(),this.applyAnimationSeekResult(this.animationPlayback.seek(e))}seekAnimationPhase(e){return this.prepareSpringRuntimeForAnimationSeek(),this.applyAnimationSeekResult(this.animationPlayback.seekPhase(e)),this.getAnimationSnapshot()}seekAnimationLoopPhase(e){return this.prepareSpringRuntimeForAnimationSeek(),this.applyAnimationSeekResult(this.animationPlayback.seekLoopPhase(e)),this.getAnimationSnapshot()}prepareSpringRuntimeForAnimationSeek(){this.currentSpringRuntime?.resetPose()}applyAnimationSeekResult(e){this.faceMotion.seek(e),this.syncOfficialModelCombineSetup(),this.resetCurrentSpringRuntimeState()}setPresentationMode(e){this.setCapturePresentation(e===`capture`)}setCapturePresentation(e){if(this.capturePresentationEnabled===e){e&&this.handleResize();return}if(this.capturePresentationEnabled=e,e){this.scene.fog=null,this.sceneReference.visible=!1,this.handleResize();return}this.scene.fog=new Yn(`#7f8d95`,5.5,15),this.sceneReference.visible=!1}stepCharacterDynamics(e,t){let n=Math.max(0,e);t&&(this.animationPlayback.step(n),this.faceMotion.step(n,this.animationPlayback.getSpeed(),this.animationPlayback.isPaused())),this.syncOfficialModelCombineSetup(),this.currentExtraBoneRuntime?.update(),this.isSpringRuntimeEnabled()?this.currentSpringRuntime?.update(n):this.currentSpringRuntime?.resetPose()}stepCaptureFrame(e,t){this.stepCharacterDynamics(e,t),this.updateProjectedShadows(),this.updateShaderCameraPositions(),this.updateShaderFaceBasis()}getCharacterRoot(){return this.characterRoot}updateProjectedShadows(){if(!this.currentBodyAsset){this.projectedShadow.update({targetWorldPositions:[],lightWorldPosition:null,characterModelScale:this.characterModelScaleMeters,visible:!1});return}let e=new W;this.directionalLight.getWorldPosition(e),this.projectedShadow.update({targetWorldPositions:this.resolveProjectedShadowTargetWorldPositions(),lightWorldPosition:e,characterModelScale:this.characterModelScaleMeters,visible:!0})}resolveProjectedShadowTargetWorldPositions(){let e=this.currentBodyAnimationRoot??this.characterRoot;return e.updateMatrixWorld(!0),e_.map(t=>this.findNodeByImportedName(e,t)).map(e=>e?.getWorldPosition(new W)??null)}getCanvas(){return this.renderer.domElement}waitForPostProcessorReady(){return Promise.resolve()}setBackgroundTheme(e){this.backgroundTheme!==e&&(this.backgroundTheme=e,this.updateCaptureBackgroundTexture(this.viewportWidth||void 0,this.viewportHeight||void 0))}setViewportSize(e,t){let n=this.ownsCanvas?320:1,r=Math.max(Math.trunc(e)||0,n),i=Math.max(Math.trunc(t)||0,n),a=fS(r,i,window.devicePixelRatio);(this.viewportWidth!==r||this.viewportHeight!==i||this.viewportPixelRatio!==a)&&(this.camera.aspect=r/i,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(a),this.renderer.setSize(r,i,this.ownsCanvas),this.updateCaptureBackgroundTexture(r,i),this.viewportWidth=r,this.viewportHeight=i,this.viewportPixelRatio=a)}renderFrame(){d(this.characterRoot),this.renderer.render(this.scene,this.camera)}finishCaptureFrame(){this.renderer.getContext().finish()}stepRuntimeFrame(e,t={}){this.stepCaptureFrame(e,t.advanceAnimation??!0),this.updateLayerMaterialTime(t.elapsedTime??this.clock.elapsedTime)}async loadRuntimePackage(e){let t=this.currentLoadedRuntimePackage?.wardrobe?.getActiveRoleId()??null,n=e.roleId??null;t&&n&&t!==n&&(this.releaseCurrentCharacterResources({preserveAnimationSelection:!1,clearAnimationCache:!0}),this.currentLoadedRuntimePackage=null);let r=await Ef(e.baseUrl,e);if(this.currentLoadedRuntimePackage=r,r.previewLight&&this.updatePreviewLight(r.previewLight),await this.setAnimationSelection(null),this.setFaceMotionSet(null,null,null),!r.combinedCharacter)return r;await this.importCombinedCharacter(r.combinedCharacter);let i=r.combinedCharacter.bodyAsset.source.animationUrls?.[0],a=ky(i??null),o=i&&(a===`unity-json`||/body[_-]?motion/i.test(i.split(/[/?#]/)[0]??``))?i:null,s=sb(r.combinedCharacter.runtimeExtension);return e.applyFaceMotion!==!1&&(r.faceMotion??s)&&this.setFaceMotionSet(r.faceMotion??s,`face`,o?`face_loop`:null),e.applyDefaultAnimation!==!1&&i&&await this.setAnimationSelection({motionUrl:i,motionKind:a,loopUrl:o,loopKind:o?a:null}),r}async setCustomSelection(e){return this.enqueueCustomSelectionMutation(t=>this.applyCustomSelection(e,t))}async updateCustomSelection(e,t){return this.enqueueCustomSelectionMutation(async n=>{let r=this.currentLoadedRuntimePackage?.wardrobe;if(!r)throw Error(`No custom part package is loaded.`);let i=r.getCustomSelection();if(!i)throw Error(`No custom selection is active.`);return this.applyCustomSelection({...i,bodyCostume3dId:e===`body`&&t!==null?t:i.bodyCostume3dId,headCostume3dId:e===`head`&&t!==null?t:i.headCostume3dId,headPackagePath:e===`head`&&t!==null?null:i.headPackagePath,hairCostume3dId:e===`hair`&&t!==null?t:i.hairCostume3dId,headOptionalCostume3dId:e===`head_optional`?t:i.headOptionalCostume3dId},n)})}async loadRenderRecipe(e){return this.enqueueCustomSelectionMutation(t=>this.loadRenderRecipeInternal(e,t))}enqueueCustomSelectionMutation(e){let t=++this.customSelectionGeneration,n=()=>t===this.customSelectionGeneration,r=()=>{if(!n())throw qS();return e(n)},i=this.customSelectionQueue.then(r,r);return this.customSelectionQueue=i.catch(()=>void 0),i}async applyCustomSelection(e,t=()=>!0){let n=this.currentLoadedRuntimePackage?.wardrobe;if(!n)throw Error(`No custom part package is loaded.`);let r=n.getCustomSelection(),i=n.getCombinedCharacter()?.id??null,a=await n.setCustomSelection(e,t);if(!t())throw qS();let o=i!==null&&i===a.id,s=a.bodyAsset.source.animationUrls?.[0]??null,c=ky(s),l=s&&(c===`unity-json`||/body[_-]?motion/i.test(s.split(/[/?#]/)[0]??``))?s:null,u=i!==null&&r!==null&&Z(r.characterId,r.unit)===Z(e.characterId,e.unit)&&this.animationPlayback.matchesSelection(s,l);return o||await this.importCombinedCharacter(a,{preserveAnimation:u,disposeBeforeLoad:!0,clearAnimationCache:!1}),await this.applyCustomRoleDefaultMotion(a,!u),a}async loadRenderRecipeInternal(e,t){let n=String(e.baseUrl??``).trim();if(!n)throw Error(`baseUrl is required to load a render recipe.`);let r=Fg(e),i=KS(r.roleId),a=Z(i.characterId,i.unit),o=this.currentLoadedRuntimePackage,s=o?.partSet?.baseUrl??null,c=o?.wardrobe?.getActiveRoleId()??null;(!o?.wardrobe||s!==n||c!==a)&&await this.loadRuntimePackage({baseUrl:n,roleId:a,deferDefaultSelection:!0,applyDefaultAnimation:!1,applyFaceMotion:!1});let l=this.currentLoadedRuntimePackage?.wardrobe;if(!l)throw Error(`No custom part package is loaded.`);l.getActiveRoleId()!==a&&l.selectRole(i.characterId,i.unit);let u=l.getPartPackageSet();u&&await Af(u,i.characterId,i.unit);let d={characterId:i.characterId,unit:i.unit,bodyCostume3dId:r.bodyCostume3dId,headCostume3dId:r.headCostume3dId,headPackagePath:r.headPackagePath,hairCostume3dId:r.hairCostume3dId,headOptionalCostume3dId:r.headOptionalCostume3dId};return{selection:d,combinedCharacter:await this.applyCustomSelection(d,t)}}async applyCustomRoleDefaultMotion(e,t){let n=e.bodyAsset.source.animationUrls?.[0],r=ky(n??null),i=n&&(r===`unity-json`||/body[_-]?motion/i.test(n.split(/[/?#]/)[0]??``))?n:null,a=sb(e.runtimeExtension);a&&(t||!this.faceMotion.hasMotion())&&this.setFaceMotionSet(a,`face`,i?`face_loop`:null),n&&(t||!this.animationPlayback.hasSelection())&&await this.setAnimationSelection({motionUrl:n,motionKind:r,loopUrl:i,loopKind:i?r:null})}getSnapshots(e){return{animation:this.getAnimationSnapshot(),faceMotion:this.getFaceMotionSnapshot(),springBone:this.getSpringBoneSnapshot(e),camera:this.getCameraDebugSnapshot(),runtimeDebug:this.getRuntimeDebugSnapshot(),utjSpringBoneTrace:this.getUtjSpringBoneTraceSnapshot()}}setFaceMotionSet(e,t,n){this.faceMotion.setMotion(e,t,n)}async setAnimationSelection(e){return this.animationPlayback.setSelection(e),await this.reloadAnimationPlayback(),this.getAnimationSnapshot()}updatePreviewLight(e){this.previewLightBase={...e},this.applyPreviewLightForCameraRoot()}applyPreviewLightForCameraRoot(){let e=V.degToRad(this.cameraRootYawDegrees),t=new W(this.previewLightBase.x,this.previewLightBase.y,this.previewLightBase.z).applyAxisAngle(gS,e),n=_b().applyAxisAngle(gS,e);this.characterLighting.updatePreviewLight({...this.previewLightBase,x:t.x,y:t.y,z:t.z},this.currentBodyAsset,this.currentHeadAsset,this.headDotDirectionalLight,this.getCameraRootFaceShadowLightDirection(),n)}getCameraRootFaceShadowLightDirection(){return hS.clone().applyAxisAngle(gS,V.degToRad(this.cameraRootYawDegrees))}updateGlobalShadowColor(e,t=1){this.characterLighting.updateGlobalShadowColor(e,t)}updateLightControllerColors(e){this.characterLighting.updateControllerColors(e)}updateLightControllerRimShape(e){this.characterLighting.updateControllerRimShape(e)}updateLightControllerOutline(e){this.characterLighting.updateControllerOutline(e)}destroy(){cancelAnimationFrame(this.animationFrame),this.releaseCurrentCharacterResources({preserveAnimationSelection:!1,clearAnimationCache:!0}),this.manageResize&&window.removeEventListener(`resize`,this.handleResize),this.controls?.dispose(),this.projectedShadow.dispose(),this.textureLoader.dispose(),this.captureBackgroundTexture?.dispose(),this.renderer.dispose(),this.ownsCanvas&&this.renderer.domElement.parentElement===this.container&&this.renderer.domElement.remove()}setCameraTarget(e){this.cameraTarget.copy(e),this.controls?.target.copy(e)}syncCameraTarget(){if(this.controls){this.controls.update(),this.cameraTarget.copy(this.controls.target);return}this.camera.lookAt(this.cameraTarget)}applyCostumeShopCharacterHeight(e){let t=V.clamp(e||1.6,.5,2),n=sy(t),r=Math.abs(n-this.characterModelScaleMeters)>=1e-4;if(this.masterCharacterHeightMeters=t,this.characterModelScaleMeters=n,this.characterRoot.scale.setScalar(1),this.currentPrefabSourceGraph&&$_(this.currentPrefabSourceGraph,n),!r||this.currentCameraPreset!=="default"&&this.currentCameraProfile!==`legacy-cloud`)return;let i=this.currentCameraProfile===`legacy-cloud`?Gg(`legacy-cloud`,this.cameraRootYawDegrees,t):Wg(n),a=i.position.clone().sub(i.target).applyAxisAngle(gS,this.currentCameraProfile===`legacy-cloud`?0:V.degToRad(this.cameraRootYawDegrees)),o=Xg({target:i.target,position:i.target.clone().add(a)},this.viewFraming);this.setCameraTarget(o.target),this.camera.position.copy(o.position),this.syncCameraTarget()}applyCameraPreset(e,t=`full-body`){this.currentCameraPreset=e,this.currentCameraProfile=e===`capture`?t:null,this.applyCostumeShopView()}shiftCameraRight(e=1){if(!Number.isFinite(e)||e===0)return;let t=this.controls?.target??this.cameraTarget,n=Kg(this.camera.position,t,e,this.characterModelScaleMeters);this.setCameraTarget(n.target),this.camera.position.copy(n.position),this.syncCameraTarget(),this.cameraDebugChangeCallback?.()}makeImportStatus(e,t){return{assetId:e.id,displayName:e.displayName,sourceMode:t.sourceMode,requestedUrl:t.requestedUrl,meshCount:t.meshCount,boneCount:t.boneCount,skinnedMeshCount:t.skinnedMeshCount}}resetSlotParents(){this.bodySlot.parent?.remove(this.bodySlot),this.headSlot.parent?.remove(this.headSlot),this.characterRoot.add(this.bodySlot),this.characterRoot.add(this.headSlot)}getPersistentCharacterMaterials(){return new Set([this.bodyMaterial,this.hairMaterial,this.faceMaterial])}clearCharacterSlot(e){OS(e,this.getPersistentCharacterMaterials())}releaseCurrentCharacterResources(e={}){this.animationPlayback.release({preserveSelection:e.preserveAnimationSelection,clearCache:e.clearAnimationCache}),this.faceMotion.release({preserveMotion:e.preserveAnimationSelection}),this.currentSpringRuntime?.resetPose(),this.currentSpringRuntime=null,this.currentExtraBoneRuntime=null,this.currentConstraintRuntime=null,this.currentRuntimeExtension=null,this.currentBodyAttachNode=null,this.currentHeadAttachOriginNode=null,this.currentBodyAnimationRoot=null,this.currentPrefabSourceGraph=null,this.currentPrefabHeadFollowDebug={active:!1,sourcePath:null,targetPath:null,reason:`not initialized`},this.runtimeDebug.headMorphs=[],this.clearCharacterSlot(this.bodySlot),this.clearCharacterSlot(this.headSlot),this.resetSlotParents(),this.renderer.renderLists.dispose(),this.renderer.info.reset()}findNodeByName(e,t){return t?this.findNodeByImportedName(e,t):null}findNodeByImportedName(e,t){let n=e.getObjectByName(t);if(n)return n;for(let n=1;n<=16;n++){let r=e.getObjectByName(`${t}_${n}`);if(r)return r}return null}findBoneByImportedName(e,t){let n=e.get(t);if(n)return n;for(let n=1;n<=16;n++){let r=e.get(`${t}_${n}`);if(r)return r}return null}getNodeDepth(e){let t=0,n=e.parent;for(;n;)t+=1,n=n.parent;return t}prepareCombinedComposition(){let e=this.currentPrefabSourceGraph;if(!e)throw Error(`Official model_combine_setup graph is not loaded.`);return this.currentCompositionStatus={mode:`model_combine_setup`,missingBodyBones:e.bodyAttach?[]:[`Unity prefab body attach unresolved`],missingHeadBones:e.headRoot&&e.headOrigin?[]:[`Unity prefab head root/origin unresolved`]},this.currentCompositionStatus}async loadCombinedCharacterAsset(e){if(!e.unityRuntimeJsonUrl)throw Error(`Final runtime package must provide container.unityRuntimeJson.`);let t=vv(e.runtimeExtension,null);if(!t)throw Error(`Final runtime package must provide runtimeUnitySetup version 0414.`);this.currentPrefabSourceGraph=t,this.syncUnityPrefabSourceGraph();let n=Ev(t,e.runtimeExtension);if(this.lastNativeMeshInstallDiagnostics=n,n.error)throw Error(`${n.error}${n.warnings.length?` ${n.warnings.slice(0,3).join(` `)}`:``}`);return this.syncUnityPrefabSourceGraph(),await Promise.all([this.overrideBodyMaterials(t.root,e.bodyAsset),this.overrideHeadMaterials(t.root,e.headAsset,{eyeController:VS(e.runtimeExtension),hairController:US(e.runtimeExtension)})]),this.assertNoPlaceholderMaterials(t.root),this.installSekaiOutlineShells(t.root),{root:t.root,sourceMode:`unity-runtime`,requestedUrl:e.unityRuntimeJsonUrl,meshCount:n.meshCount,boneCount:n.boneCount,skinnedMeshCount:n.skinnedMeshCount,prefabSourceGraph:t}}assertNoPlaceholderMaterials(e){let t=[];if(e.traverse(e=>{let n=e;if(!n.isMesh)return;let r=Array.isArray(n.material)?n.material:[n.material];for(let e of r)(!e||e.userData.pjskPlaceholderMaterial===!0)&&t.push(`${n.name}:${e?.name??`<null>`}`)}),t.length>0)throw Error(`Unity runtime material binding left ${t.length} placeholder slot(s): ${t.slice(0,8).join(`, `)}`)}installSekaiOutlineShells(e){let t=[];e.traverse(e=>{let n=e;!n.isMesh||n.userData.pjskOutlineShell||n.userData.pjskEyeThroughHairOverlay||n.userData.pjskEyeThroughHairStencilPrepass||t.push(n)});for(let e of t)this.installSekaiOutlineShell(e)}installSekaiOutlineShell(e){let t=jS(e);if(NS(t))return;let n=kS(e.geometry);if(n===null||n<=.01)return;let r=Array.isArray(e.material)?e.material:[e.material],i=this.createSekaiOutlineMaterials(e,r);if(!i.some(e=>e.visible)){for(let e of i)e.dispose();return}let a=MS(t),o=Array.isArray(e.material)?i:i[0],s=e instanceof Ei?new Ei(e.geometry,o):new mi(e.geometry,o);s.morphTargetDictionary=e.morphTargetDictionary,s.morphTargetInfluences=e.morphTargetInfluences,s.name=`${e.name}_outline`,s.renderOrder=Math.max(e.renderOrder-2,0),s.frustumCulled=e.frustumCulled,s.userData.pjskOutlineShell=!0,s.userData.pjskSourceMaterialKind=a,s.matrixAutoUpdate=e.matrixAutoUpdate,s.position.copy(e.position),s.quaternion.copy(e.quaternion),s.scale.copy(e.scale),s instanceof Ei&&e instanceof Ei&&s.bind(e.skeleton,e.bindMatrix),this.runtimeDebug.outlineShells.push({meshName:e.name,outlineName:s.name,sourceMaterialKind:a,sourceMaterialKinds:t,sourceMaterialNames:r.map(e=>e.name),hasVertexColor:!!e.geometry.getAttribute(`color`),vertexColorRedMax:n,renderOrder:s.renderOrder,sourceRenderOrder:e.renderOrder,hasTangent:!!e.geometry.getAttribute(`tangent`),hasUv1:!!e.geometry.getAttribute(`uv1`),hasUv2:!!e.geometry.getAttribute(`uv2`),useSecondNormal:i.map(e=>e.userData.pjskOutlineUseSecondNormal===!0),wantsSecondNormal:i.map(e=>e.userData.pjskOutlineWantsSecondNormal===!0)}),e.parent?.add(s)}createSekaiOutlineMaterials(e,t){return t.map(t=>{let n=t.userData.pjskOutlineSourceMaterial instanceof ea?t.userData.pjskOutlineSourceMaterial:null;if(delete t.userData.pjskOutlineSourceMaterial,AS(t.userData.pjskMaterialKind)){n?.dispose();let e=new ni;return e.name=`pjsk_shell_outline_skipped`,e.visible=!1,e}let r=t.userData.pjskRawMaterial;if(!lx(r)){n?.dispose();let e=new ni;return e.name=`pjsk_shell_outline_disabled`,e.visible=!1,e}let i=(t.userData.pjskLighting?.useOutlineSecondNormal??0)>.5,a=i&&!!e.geometry.getAttribute(`tangent`)&&!!e.geometry.getAttribute(`uv1`)&&!!e.geometry.getAttribute(`uv2`),o=mx(!!e.geometry.getAttribute(`color`),r,a,PS(t),n??t);return o.userData.pjskOutlineUseSecondNormal=a,o.userData.pjskOutlineWantsSecondNormal=i,n?.dispose(),this.characterLighting.applyOutlineMaterial(o),o})}async overrideBodyMaterials(e,t){this.runtimeDebug.body=[];let n=this.characterLighting.getBindingView();await Fb({root:e,bodyAsset:t,headAsset:this.currentHeadAsset,textureLoader:this.textureLoader,template:this.bodyMaterial,bodyDebugMode:n.bodyDebugMode,debug:this.runtimeDebug.body})}async overrideHeadMaterials(e,t,n={}){let r=this.characterLighting.getBindingView();this.runtimeDebug.head=[],this.currentHairOffset.copy(n.hairController?.offset??new W),this.currentHairHeadTransform=null;let i=n.hairController?.headTransformPath;i&&e.traverse(e=>{!this.currentHairHeadTransform&&e.userData.pjskTransformPath===i&&(this.currentHairHeadTransform=e)}),this.currentHairHeadTransform??=n.hairController?.headTransformName?this.findNodeByImportedName(e,n.hairController.headTransformName):null,await rx({root:e,headAsset:t,textureLoader:this.textureLoader,templates:{body:this.bodyMaterial,hair:this.hairMaterial,face:this.faceMaterial},view:{bodyDebugMode:r.bodyDebugMode,faceDebugMode:r.faceDebugMode,faceSdfEnabled:r.faceSdfEnabled},hair:{controllerPresent:!!n.hairController,proximityShadowEnabled:r.proximityHairShadowEnabled,headPosition:this.hairHeadPosition},eyeController:n.eyeController,debug:this.runtimeDebug.head})}handleResize(){let e=this.container??this.renderer.domElement,t=Math.max(e.clientWidth,320),n=Math.max(e.clientHeight,320);this.setViewportSize(t,n)}updateCaptureBackgroundTexture(e,t){let n=this.container??this.renderer.domElement,r=Math.max(Math.round(e??n.clientWidth),320),i=Math.max(Math.round(t??n.clientHeight),320);this.captureBackgroundTexture?.dispose(),this.captureBackgroundTexture=Zg(r,i,this.backgroundTheme),this.scene.background=this.captureBackgroundTexture}updateShaderCameraPositions(){this.characterLighting.updateCamera(this.camera.position)}updateShaderFaceBasis(){let e=this.currentHairHeadTransform??this.findFaceSdfHeadBone()??this.findNodeByImportedName(this.bodySlot,`Head`)??this.findNodeByImportedName(this.headSlot,`Head`)??this.currentBodyAnimationRoot??this.characterRoot;Lp(e,this.tempQuaternion),e.getWorldPosition(this.faceHeadWorldPosition),this.headTransformUpWorld.copy(bS).applyQuaternion(this.tempQuaternion).normalize(),this.faceUpWorld.set(1,0,0).applyQuaternion(this.tempQuaternion).normalize(),this.faceForwardWorld.set(0,0,1).applyQuaternion(this.tempQuaternion).normalize(),this.faceRightWorld.crossVectors(this.faceUpWorld,this.faceForwardWorld).normalize(),this.faceUpWorld.crossVectors(this.faceForwardWorld,this.faceRightWorld).normalize();let t=this.characterLighting.resolveFaceShadowLightDirection(this.getCameraRootFaceShadowLightDirection(),this.faceRightWorld,this.faceForwardWorld);FS(this.faceShadowHeadHorizontal,-this.headTransformUpWorld.x,-this.headTransformUpWorld.z),FS(this.faceShadowLightHorizontal,t.x,t.z);let n=V.radToDeg(Math.atan2(this.faceForwardWorld.x,this.faceForwardWorld.z)),r=V.radToDeg(Math.atan2(this.faceShadowLightHorizontal.x,this.faceShadowLightHorizontal.y));this.headDotDirectionalLight.set(this.faceShadowHeadHorizontal.dot(this.faceShadowLightHorizontal),IS(n,r)),this.hairHeadPosition.copy(this.currentHairOffset),e.localToWorld(this.hairHeadPosition),this.runtimeDebug.hairShadowOffset=GS(this.currentHairOffset),this.runtimeDebug.hairShadowWorldPosition=GS(this.hairHeadPosition),this.characterLighting.updateFaceBasis(t,this.headDotDirectionalLight,this.hairHeadPosition),this.characterLighting.updateEyeThroughHairView(this.camera.position,this.faceHeadWorldPosition,this.faceForwardWorld)}findFaceSdfHeadBone(){for(let e of[this.headSlot,this.bodySlot]){let t=null,n=null;if(e.traverse(e=>{if(n)return;let r=e;if(r.isSkinnedMesh&&r.skeleton&&(Array.isArray(r.material)?r.material:[r.material]).some(e=>e instanceof ea&&!!e.uniforms.uFaceShadowTex))for(let e of r.skeleton.bones){if(e.name===`Head`||/^Head_\d+$/.test(e.name)){n=e;return}!t&&e.name.toLowerCase().includes(`head`)&&(t=e)}}),n??t)return n??t}return null}updateLayerMaterialTime(e){for(let t of[this.bodySlot,this.headSlot])t.traverse(t=>{let n=t;if(!n.isMesh)return;let r=Array.isArray(n.material)?n.material:[n.material];for(let t of r)t instanceof ea&&t.uniforms.uTime&&(t.uniforms.uTime.value=e)})}render(){let e=this.clock.getDelta(),t=this.clock.elapsedTime;this.stepRuntimeFrame(e,{advanceAnimation:!0,elapsedTime:t}),this.controls?.update(),this.renderFrame(),this.animationFrame=requestAnimationFrame(()=>this.render())}async reloadAnimationPlayback(e={}){(await this.animationPlayback.refresh({root:this.currentBodyAnimationRoot,retargetWithUnityPrefab:this.currentPrefabSourceGraph!==null,runtimeExtension:this.currentRuntimeExtension,prefabHeadFollow:this.getPrefabHeadFollowDebugSnapshot()})).poseApplied&&(this.syncOfficialModelCombineSetup(),this.currentExtraBoneRuntime?.update(),(e.resetSpring??!0)&&this.resetCurrentSpringRuntimeState())}getPrefabHeadFollowDebugSnapshot(){return Xv(this.currentPrefabSourceGraph,this.currentRuntimeExtension,this.currentPrefabHeadFollowDebug)}syncUnityPrefabSourceGraph(){let e=this.currentPrefabSourceGraph;e&&(this.lastConstraintSetupDiagnostics=Jv(e,this.currentRuntimeExtension,this.characterModelScaleMeters,this.currentConstraintRuntime))}syncOfficialModelCombineSetup(){this.syncUnityPrefabSourceGraph()}};function YS(e){let t=String(e.assetBaseUrl??``).trim();if(!t)throw Error(`assetBaseUrl is required to create the CostumeShop kernel.`);return XS(new JS({canvas:e.canvas,initialLight:{...e.initialLight??l},autoRender:!1,manageResize:!1,ktx2TranscoderPath:e.ktx2TranscoderPath}),t)}function XS(e,t){let r=n(e,t);return{...r,setCharacterYawDegrees:r.setViewYawDegrees}}var ZS=YS;function QS(e,t,n=()=>{}){let r=new AbortController,i=new Map,a=!1,o={yaw:0,zoom:1,height:0},s=1,c=(e,t,n)=>Math.min(n,Math.max(t,e)),l=(e,t,n,i={})=>e?.addEventListener(t,n,{...i,signal:r.signal});function u(){t.setViewYawDegrees(o.yaw),t.setViewZoom(o.zoom),t.setViewHeightOffset(o.height),e.dataset.viewYaw=String(o.yaw),e.dataset.viewZoom=String(o.zoom),e.dataset.viewHeight=String(o.height),n({...o,enabled:a})}function d(e){Number.isFinite(e.yaw)&&(o.yaw=((e.yaw+180)%360+360)%360-180),Number.isFinite(e.zoom)&&(o.zoom=c(e.zoom,.5,3)),Number.isFinite(e.height)&&(o.height=c(e.height,-.5,.8)),u()}function f(t){i.delete(t);try{e.hasPointerCapture(t)&&e.releasePointerCapture(t)}catch{}}function p(){for(let e of[...i.keys()])f(e)}function m(e){a&&Number.isFinite(e)&&e>0&&d({zoom:o.zoom*e})}function h(e){a&&Number.isFinite(e)&&d({zoom:e})}function g(){p(),d({yaw:0,zoom:1,height:0})}function _(){let[e,t]=[...i.values()];return{distance:Math.hypot(e.x-t.x,e.y-t.y),y:(e.y+t.y)/2}}l(e,`pointerdown`,t=>{if(!(!a||t.pointerType===`mouse`&&t.button!==0||i.size>=2)){t.preventDefault(),e.focus({preventScroll:!0}),i.set(t.pointerId,{x:t.clientX,y:t.clientY});try{e.setPointerCapture(t.pointerId)}catch{}e.style.cursor=`grabbing`}},{passive:!1}),l(e,`pointermove`,t=>{if(!a||!i.has(t.pointerId))return;t.preventDefault();let n=i.get(t.pointerId),r=i.size===2?_():null;i.set(t.pointerId,{x:t.clientX,y:t.clientY});let s=Math.max(1,e.clientHeight);if(r){let e=_();d({zoom:r.distance>1?o.zoom*e.distance/r.distance:o.zoom,height:o.height+(e.y-r.y)*2/(s*o.zoom)})}else d({yaw:o.yaw-(t.clientX-n.x)*360/Math.max(1,e.clientWidth),height:o.height+(t.clientY-n.y)*2/(s*o.zoom)})},{passive:!1});for(let t of[`pointerup`,`pointercancel`,`lostpointercapture`])l(e,t,t=>{f(t.pointerId),e.style.cursor=i.size?`grabbing`:`grab`});return l(e.ownerDocument?.defaultView,`blur`,()=>{p(),e.style.cursor=`grab`}),l(e,`wheel`,t=>{if(!a)return;t.preventDefault();let n=t.deltaMode===1?16:t.deltaMode===2?e.clientHeight:1;m(Math.exp(c(-t.deltaY*n*.0015,-1,1)))},{passive:!1}),l(e,`gesturestart`,e=>{a&&(e.preventDefault(),s=o.zoom)},{passive:!1}),l(e,`gesturechange`,e=>{a&&(e.preventDefault(),i.size<2&&d({zoom:s*e.scale}))},{passive:!1}),l(e,`dblclick`,e=>{e.preventDefault()}),l(e,`keydown`,e=>{if(!(!a||e.metaKey||e.ctrlKey||e.altKey)){switch(e.key){case`ArrowLeft`:d({yaw:o.yaw+15});break;case`ArrowRight`:d({yaw:o.yaw-15});break;case`ArrowUp`:d({height:o.height+.1});break;case`ArrowDown`:d({height:o.height-.1});break;case`+`:case`=`:m(1.2);break;case`-`:case`_`:m(1/1.2);break;case`Home`:case`0`:g();break;default:return}e.preventDefault()}}),e.style.cursor=`grab`,{reset:g,zoomBy:m,setZoom:h,apply:u,getState:()=>({...o}),setEnabled(t){a=t,a||(p(),e.style.cursor=`grab`),n({...o,enabled:a})},dispose(){p(),r.abort()}}}var $S={"viewer.canvas":`3D model. Arrow keys rotate and move the view. Plus and minus zoom. Home resets the view.`},eC={en:$S,"zh-Hans":{"viewer.canvas":`3D 模型。方向键旋转和移动视角，加减键缩放，Home 键重置视角。`},"zh-Hant":{"viewer.canvas":`3D 模型。方向鍵旋轉和移動視角，加減鍵縮放，Home 鍵重設視角。`},ja:{"viewer.canvas":`3Dモデル。矢印キーで回転・移動、プラス・マイナスで拡大・縮小、Homeで視点をリセット。`},ko:{"viewer.canvas":`3D 모델. 방향키로 회전·이동, 더하기·빼기로 확대·축소, Home 키로 시점을 초기화합니다.`}};function tC(e){let t=String(e).toLowerCase(),n=t.startsWith(`zh`)?/hant|tw|hk|mo/.test(t)?`zh-Hant`:`zh-Hans`:t.split(`-`)[0];return{language:eC[n]?n:`en`,values:eC[n]??$S}}var nC=document.querySelector(`#viewer`),rC=ZS({canvas:nC,assetBaseUrl:new URLSearchParams(location.search).get(`assets`)??`sekai3d://runtime/`,ktx2TranscoderPath:`./basis/`}),iC=matchMedia(`(prefers-color-scheme: dark)`);function aC(){let e=window.viewerColorScheme??(iC.matches?`dark`:`light`);document.documentElement.dataset.viewerTheme=e,rC.setBackgroundTheme(e)}window.setViewerColorScheme=e=>{(e===`light`||e===`dark`)&&(window.viewerColorScheme=e,aC())},iC.addEventListener(`change`,aC),aC();var oC,sC=QS(nC,rC,({zoom:e,enabled:t})=>{(oC?.zoom!==e||oC.enabled!==t)&&(oC={zoom:e,enabled:t},cC(`view-state`,``,{zoom:e,enabled:t}))});sC.setEnabled(!1),window.setViewerLocale=e=>{let{language:t,values:n}=tC(e);document.documentElement.lang=t;for(let e of document.querySelectorAll(`[data-label]`)){let t=n[e.dataset.label];e.setAttribute(`aria-label`,t)}},window.setViewerLocale(navigator.language);function cC(e,t=``,n={}){window.webkit?.messageHandlers?.model3D?.postMessage({type:e,message:t,...n})}var lC=Promise.resolve(),uC;window.loadModel=e=>(lC=lC.catch(()=>{}).then(async()=>{cC(`loading`),sC.setEnabled(!1);try{await rC.load(e),uC===e.roleId?sC.apply():sC.reset(),uC=e.roleId,sC.setEnabled(!0),rC.play(),cC(`loaded`)}catch(e){throw cC(`error`,String(e)),e}}),lC),window.resetModelView=()=>sC.reset(),window.zoomModelViewBy=e=>sC.zoomBy(e),window.setModelViewZoom=e=>sC.setZoom(e),addEventListener(`resize`,()=>rC.resize(innerWidth,innerHeight)),document.addEventListener(`visibilitychange`,()=>document.hidden?rC.pause():rC.play()),addEventListener(`pagehide`,()=>{iC.removeEventListener(`change`,aC),sC.dispose(),rC.destroy()},{once:!0}),rC.resize(innerWidth,innerHeight),cC(`ready`);