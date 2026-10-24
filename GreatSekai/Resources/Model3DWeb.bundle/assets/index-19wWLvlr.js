(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1/60,t=5;function n(n,i){let a=0,o=!1,s=!1,c=Promise.resolve(),l=null,u=null,d=null,f=0,p=0,m=()=>{if(s)throw Error(`Haruki 3D runtime has been destroyed.`)},h=e=>{m();let t=r(e);if(u?.key===t)return u.promise;let a=Promise.all([n.waitForPostProcessorReady?.()??Promise.resolve(),n.loadRenderRecipe({...e,baseUrl:i})]).then(()=>void 0);return u={key:t,promise:a},c=a.then(()=>void 0,()=>void 0),a.catch(()=>{u?.promise===a&&(u=null)}),a},g=r=>{if(!o||s)return;d===null&&(d=r),f+=Math.min(Math.max((r-d)/1e3,0),e*t),d=r;let i=0;for(;f>=e&&i<t;)p+=e,n.stepRuntimeFrame(e,{advanceAnimation:!0,elapsedTime:p}),f-=e,i+=1;n.renderFrame(),a=requestAnimationFrame(g)};return{prepare:h,async load(e){await h(e),!s&&(n.stepRuntimeFrame(0,{advanceAnimation:!1,elapsedTime:p}),n.renderFrame())},play(){m(),!o&&(o=!0,d=null,f=0,a=requestAnimationFrame(g))},pause(){o&&(o=!1,cancelAnimationFrame(a),a=0,d=null,f=0)},resize(e,t){m(),n.setViewportSize(e,t),n.renderFrame()},setCharacterYawDegrees(e){m(),n.setCharacterYawDegrees(e),o||n.renderFrame()},setViewYawDegrees(e){m(),n.setViewYawDegrees(e),o||n.renderFrame()},setViewZoom(e){m(),n.setViewZoom(e),o||n.renderFrame()},setViewHeightOffset(e){m(),n.setViewHeightOffset(e),o||n.renderFrame()},destroy(){return l||(s=!0,u=null,o=!1,cancelAnimationFrame(a),a=0,l=c.then(()=>{n.destroy()}),l)}}}function r(e){return[e.roleId,e.bodyCostume3dId,e.headCostume3dId,e.headPackagePath??``,e.hairCostume3dId,e.headOptionalCostume3dId??``].join(`\0`)}var i={x:-15,y:50,z:0},a={x:-.7127446532249451,y:.258819043636322,z:.6519262194633484},o={x:.833125114440918,y:-.3420201539993286,z:.43465474247932434},s={ambientColor:{r:.5,g:.5,b:.5},ambientIntensity:1,specularColor:{r:1,g:1,b:1},specularIntensity:1,rimColor:{r:.5,g:.5,b:.5},rimColorAlpha:1,rimRange:7,rimEdgeSmoothness:.0010000000474974513,rimEmission:0,rimLightInfluence:1,shadowRimColor:{r:0,g:0,b:0},rimShadowSharpness:.5},c=a,l={x:c.x,y:c.y,z:c.z,intensity:1,ambient:0,shadowThreshold:.40625,shadowWeight:1,characterAmbient:s.ambientIntensity,rimColorAlpha:s.rimColorAlpha,rimRange:s.rimRange,rimEdgeSmoothness:s.rimEdgeSmoothness,rimEmission:s.rimEmission,rimLightInfluence:s.rimLightInfluence,rimShadowSharpness:s.rimShadowSharpness};s.ambientIntensity,s.rimColorAlpha,s.rimRange,s.rimEdgeSmoothness,s.rimEmission,s.rimLightInfluence,s.rimShadowSharpness;var u=new WeakMap;function d(e){let t=new Set;e.traverse(e=>{let n=e;if(!n.isMesh||n.userData.pjskOutlineShell||t.has(n.geometry))return;let r=n.geometry,i=r.morphAttributes.tangent;if(!i?.length)return;t.add(r);let a=r.getAttribute(`tangent`),o=n.morphTargetInfluences;if(!o||o.length!==i.length||!o.every(Number.isFinite))throw Error(`Native mesh '${n.name}' has invalid tangent morph influences.`);let s=u.get(r);if(s||(s={base:new Float32Array(a.array),weights:[]},u.set(r,s)),!(o.length===s.weights.length&&o.every((e,t)=>e===s.weights[t]))){a.copyArray(s.base);for(let e=0;e<i.length;e+=1){let t=o[e];if(t===0)continue;let n=i[e];for(let e=0;e<a.count;e+=1)a.setXYZ(e,a.getX(e)+n.getX(e)*t,a.getY(e)+n.getY(e)*t,a.getZ(e)+n.getZ(e)*t)}s.weights=o.slice(),a.needsUpdate=!0}})}var f=`attached`,p=1e3,m=1001,h=1002,g=1003,_=1004,v=1005,y=1006,b=1007,x=1008,S=1009,C=1010,w=1011,T=1012,E=1013,D=1014,O=1015,k=1016,A=1017,ee=1018,te=1020,j=35902,M=35899,N=1021,ne=1022,re=1023,ie=1026,ae=1027,oe=1028,se=1029,P=1030,ce=1031,le=1033,ue=33776,de=33777,fe=33778,pe=33779,me=35840,he=35841,ge=35842,_e=35843,ve=36196,ye=37492,be=37496,xe=37488,Se=37489,Ce=37490,we=37491,Te=37808,Ee=37809,De=37810,Oe=37811,ke=37812,Ae=37813,je=37814,Me=37815,Ne=37816,F=37817,Pe=37818,Fe=37819,Ie=37820,I=37821,Le=36492,L=36494,R=36495,Re=36283,ze=36284,Be=36285,Ve=36286,He=2200,Ue=2201,We=2202,Ge=2300,Ke=2301,qe=2302,Je=2303,Ye=2400,Xe=2401,Ze=2402,Qe=2500,$e=2501,et=3200,tt=`srgb`,nt=`srgb-linear`,rt=`linear`,it=`srgb`,at=7680,ot=7681,st=35044,ct=2e3;function lt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function ut(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function dt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function ft(){let e=dt(`canvas`);return e.style.display=`block`,e}var pt={};function mt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function ht(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=ht(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=ht(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function gt(...e){let t=e.join(` `);t in pt||(pt[t]=!0,z(...e))}function _t(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var vt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},yt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},bt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),xt=1234567,St=Math.PI/180,Ct=180/Math.PI;function wt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(bt[e&255]+bt[e>>8&255]+bt[e>>16&255]+bt[e>>24&255]+`-`+bt[t&255]+bt[t>>8&255]+`-`+bt[t>>16&15|64]+bt[t>>24&255]+`-`+bt[n&63|128]+bt[n>>8&255]+`-`+bt[n>>16&255]+bt[n>>24&255]+bt[r&255]+bt[r>>8&255]+bt[r>>16&255]+bt[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function Tt(e,t){return(e%t+t)%t}function Et(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Dt(e,t,n){return e===t?0:(n-e)/(t-e)}function Ot(e,t,n){return(1-n)*e+n*t}function kt(e,t,n,r){return Ot(e,t,1-Math.exp(-n*r))}function At(e,t=1){return t-Math.abs(Tt(e,t*2)-t)}function jt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Mt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Nt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Pt(e,t){return e+Math.random()*(t-e)}function Ft(e){return e*(.5-Math.random())}function It(e){e!==void 0&&(xt=e);let t=xt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Lt(e){return e*St}function Rt(e){return e*Ct}function zt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Bt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Vt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ht(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:z(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Ut(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Wt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var H={DEG2RAD:St,RAD2DEG:Ct,generateUUID:wt,clamp:V,euclideanModulo:Tt,mapLinear:Et,inverseLerp:Dt,lerp:Ot,damp:kt,pingpong:At,smoothstep:jt,smootherstep:Mt,randInt:Nt,randFloat:Pt,randFloatSpread:Ft,seededRandom:It,degToRad:Lt,radToDeg:Rt,isPowerOfTwo:zt,ceilPowerOfTwo:Bt,floorPowerOfTwo:Vt,setQuaternionFromProperEuler:Ht,normalize:Wt,denormalize:Ut},U=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},W=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Kt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Kt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Gt.copy(this).projectOnVector(e),this.sub(Gt)}reflect(e){return this.sub(Gt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Gt=new G,Kt=new W,K=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return gt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(qt.makeScale(e,t)),this}rotate(e){return gt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(qt.makeRotation(-e)),this}translate(e,t){return gt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(qt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},qt=new K,Jt=new K().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yt=new K().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xt(){let e={enabled:!0,workingColorSpace:nt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Zt(e.r),e.g=Zt(e.g),e.b=Zt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Qt(e.r),e.g=Qt(e.g),e.b=Qt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?rt:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return gt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return gt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[nt]:{primaries:t,whitePoint:r,transfer:rt,toXYZ:Jt,fromXYZ:Yt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:tt},outputColorSpaceConfig:{drawingBufferColorSpace:tt}},[tt]:{primaries:t,whitePoint:r,transfer:it,toXYZ:Jt,fromXYZ:Yt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:tt}}}),e}var q=Xt();function Zt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Qt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var $t,en=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$t===void 0&&($t=dt(`canvas`)),$t.width=e.width,$t.height=e.height;let t=$t.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=$t}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=dt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Zt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Zt(t[e]/255)*255):t[e]=Zt(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},tn=0,nn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:tn++}),this.uuid=wt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(rn(r[t].image)):e.push(rn(r[t]))}else e=rn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function rn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?en.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var an=0,on=new G,sn=class e extends yt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=m,i=m,a=y,o=x,s=re,c=S,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:an++}),this.uuid=wt(),this.name=``,this.source=new nn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new K,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(on).x}get height(){return this.source.getSize(on).y}get depth(){return this.source.getSize(on).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case p:e.x-=Math.floor(e.x);break;case m:e.x=e.x<0?0:1;break;case h:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case p:e.y-=Math.floor(e.y);break;case m:e.y=e.y<0?0:1;break;case h:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null,sn.DEFAULT_MAPPING=300,sn.DEFAULT_ANISOTROPY=1;var cn=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ln=class extends yt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:y,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new cn(0,0,e,t),this.scissorTest=!1,this.viewport=new cn(0,0,e,t),this.textures=[];let r=new sn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:y,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new nn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},un=class extends ln{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},dn=class extends sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=g,this.minFilter=g,this.wrapR=m,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},fn=class extends sn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=g,this.minFilter=g,this.wrapR=m,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},J=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/pn.setFromMatrixColumn(e,0).length(),i=1/pn.setFromMatrixColumn(e,1).length(),a=1/pn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hn,e,gn)}lookAt(e,t,n){let r=this.elements;return yn.subVectors(e,t),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),_n.crossVectors(n,yn),_n.lengthSq()===0&&(Math.abs(n.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),_n.crossVectors(n,yn)),_n.normalize(),vn.crossVectors(yn,_n),r[0]=_n.x,r[4]=vn.x,r[8]=yn.x,r[1]=_n.y,r[5]=vn.y,r[9]=yn.y,r[2]=_n.z,r[6]=vn.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],M=r[7],N=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*M,i[8]=a*C+o*D+s*ee+c*N,i[12]=a*w+o*O+s*te+c*ne,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*M,i[9]=l*C+u*D+d*ee+f*N,i[13]=l*w+u*O+d*te+f*ne,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*M,i[10]=p*C+m*D+h*ee+g*N,i[14]=p*w+m*O+h*te+g*ne,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*M,i[11]=_*C+v*D+y*ee+b*N,i[15]=_*w+v*O+y*te+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=pn.set(r[0],r[1],r[2]).length(),o=pn.set(r[4],r[5],r[6]).length(),s=pn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),mn.copy(this);let c=1/a,l=1/o,u=1/s;return mn.elements[0]*=c,mn.elements[1]*=c,mn.elements[2]*=c,mn.elements[4]*=l,mn.elements[5]*=l,mn.elements[6]*=l,mn.elements[8]*=u,mn.elements[9]*=u,mn.elements[10]*=u,t.setFromRotationMatrix(mn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ct,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ct,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},pn=new G,mn=new J,hn=new G(0,0,0),gn=new G(1,1,1),_n=new G,vn=new G,yn=new G,bn=new J,xn=new W,Sn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return bn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xn.setFromEuler(this),this.setFromQuaternion(xn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Sn.DEFAULT_ORDER=`XYZ`;var Cn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},wn=0,Tn=new G,En=new W,Dn=new J,On=new G,kn=new G,An=new G,jn=new W,Mn=new G(1,0,0),Nn=new G(0,1,0),Pn=new G(0,0,1),Fn={type:`added`},In={type:`removed`},Ln={type:`childadded`,child:null},Rn={type:`childremoved`,child:null},zn=class e extends yt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wn++}),this.uuid=wt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new Sn,r=new W,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new J},normalMatrix:{value:new K}}),this.matrix=new J,this.matrixWorld=new J,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return En.setFromAxisAngle(e,t),this.quaternion.multiply(En),this}rotateOnWorldAxis(e,t){return En.setFromAxisAngle(e,t),this.quaternion.premultiply(En),this}rotateX(e){return this.rotateOnAxis(Mn,e)}rotateY(e){return this.rotateOnAxis(Nn,e)}rotateZ(e){return this.rotateOnAxis(Pn,e)}translateOnAxis(e,t){return Tn.copy(e).applyQuaternion(this.quaternion),this.position.add(Tn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mn,e)}translateY(e){return this.translateOnAxis(Nn,e)}translateZ(e){return this.translateOnAxis(Pn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?On.copy(e):On.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),kn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(kn,On,this.up):Dn.lookAt(On,kn,this.up),this.quaternion.setFromRotationMatrix(Dn),r&&(Dn.extractRotation(r.matrixWorld),En.setFromRotationMatrix(Dn),this.quaternion.premultiply(En.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fn),Ln.child=e,this.dispatchEvent(Ln),Ln.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(In),Rn.child=e,this.dispatchEvent(Rn),Rn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fn),Ln.child=e,this.dispatchEvent(Ln),Ln.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kn,e,An),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kn,jn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};zn.DEFAULT_UP=new G(0,1,0),zn.DEFAULT_MATRIX_AUTO_UPDATE=!0,zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Bn=class extends zn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Vn={type:`move`},Hn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Bn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Un={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Gn={h:0,s:0,l:0};function Kn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,q.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=q.workingColorSpace){return this.r=e,this.g=t,this.b=n,q.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=q.workingColorSpace){if(e=Tt(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Kn(i,r,e+1/3),this.g=Kn(i,r,e),this.b=Kn(i,r,e-1/3)}return q.colorSpaceToWorking(this,r),this}setStyle(e,t=tt){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=tt){let n=Un[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zt(e.r),this.g=Zt(e.g),this.b=Zt(e.b),this}copyLinearToSRGB(e){return this.r=Qt(e.r),this.g=Qt(e.g),this.b=Qt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=tt){return q.workingToColorSpace(qn.copy(this),e),Math.round(V(qn.r*255,0,255))*65536+Math.round(V(qn.g*255,0,255))*256+Math.round(V(qn.b*255,0,255))}getHexString(e=tt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=q.workingColorSpace){q.workingToColorSpace(qn.copy(this),t);let n=qn.r,r=qn.g,i=qn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=q.workingColorSpace){return q.workingToColorSpace(qn.copy(this),t),e.r=qn.r,e.g=qn.g,e.b=qn.b,e}getStyle(e=tt){q.workingToColorSpace(qn.copy(this),e);let t=qn.r,n=qn.g,r=qn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Wn),this.setHSL(Wn.h+e,Wn.s+t,Wn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wn),e.getHSL(Gn);let n=Ot(Wn.h,Gn.h,t),r=Ot(Wn.s,Gn.s,t),i=Ot(Wn.l,Gn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qn=new Y;Y.NAMES=Un;var Jn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new Y(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Yn=class extends zn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Xn=new G,Zn=new G,Qn=new G,$n=new G,er=new G,tr=new G,nr=new G,rr=new G,ir=new G,ar=new G,or=new cn,sr=new cn,cr=new cn,lr=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Xn.subVectors(e,t),r.cross(Xn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Xn.subVectors(r,t),Zn.subVectors(n,t),Qn.subVectors(e,t);let a=Xn.dot(Xn),o=Xn.dot(Zn),s=Xn.dot(Qn),c=Zn.dot(Zn),l=Zn.dot(Qn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,$n)!==null&&$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,$n)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,$n.x),s.addScaledVector(a,$n.y),s.addScaledVector(o,$n.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return or.setScalar(0),sr.setScalar(0),cr.setScalar(0),or.fromBufferAttribute(e,t),sr.fromBufferAttribute(e,n),cr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(or,i.x),a.addScaledVector(sr,i.y),a.addScaledVector(cr,i.z),a}static isFrontFacing(e,t,n,r){return Xn.subVectors(n,t),Zn.subVectors(e,t),Xn.cross(Zn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Xn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;er.subVectors(r,n),tr.subVectors(i,n),rr.subVectors(e,n);let s=er.dot(rr),c=tr.dot(rr);if(s<=0&&c<=0)return t.copy(n);ir.subVectors(e,r);let l=er.dot(ir),u=tr.dot(ir);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(er,a);ar.subVectors(e,i);let f=er.dot(ar),p=tr.dot(ar);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(tr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return nr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(nr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(er,a).addScaledVector(tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ur=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=fr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,fr):fr.fromBufferAttribute(r,t),fr.applyMatrix4(e.matrixWorld),this.expandByPoint(fr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),pr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),pr.copy(e.boundingBox)),pr.applyMatrix4(e.matrixWorld),this.union(pr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fr),fr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(br),xr.subVectors(this.max,br),mr.subVectors(e.a,br),hr.subVectors(e.b,br),gr.subVectors(e.c,br),_r.subVectors(hr,mr),vr.subVectors(gr,hr),yr.subVectors(mr,gr);let t=[0,-_r.z,_r.y,0,-vr.z,vr.y,0,-yr.z,yr.y,_r.z,0,-_r.x,vr.z,0,-vr.x,yr.z,0,-yr.x,-_r.y,_r.x,0,-vr.y,vr.x,0,-yr.y,yr.x,0];return!wr(t,mr,hr,gr,xr)||(t=[1,0,0,0,1,0,0,0,1],!wr(t,mr,hr,gr,xr))?!1:(Sr.crossVectors(_r,vr),t=[Sr.x,Sr.y,Sr.z],wr(t,mr,hr,gr,xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},dr=[new G,new G,new G,new G,new G,new G,new G,new G],fr=new G,pr=new ur,mr=new G,hr=new G,gr=new G,_r=new G,vr=new G,yr=new G,br=new G,xr=new G,Sr=new G,Cr=new G;function wr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Cr.fromArray(e,a);let o=i.x*Math.abs(Cr.x)+i.y*Math.abs(Cr.y)+i.z*Math.abs(Cr.z),s=t.dot(Cr),c=n.dot(Cr),l=r.dot(Cr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Tr=new G,Er=new U,Dr=0,Or=class extends yt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=st,this.updateRanges=[],this.gpuType=O,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.applyMatrix3(e),this.setXY(t,Er.x,Er.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tr.fromBufferAttribute(this,t),Tr.applyMatrix3(e),this.setXYZ(t,Tr.x,Tr.y,Tr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tr.fromBufferAttribute(this,t),Tr.applyMatrix4(e),this.setXYZ(t,Tr.x,Tr.y,Tr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tr.fromBufferAttribute(this,t),Tr.applyNormalMatrix(e),this.setXYZ(t,Tr.x,Tr.y,Tr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tr.fromBufferAttribute(this,t),Tr.transformDirection(e),this.setXYZ(t,Tr.x,Tr.y,Tr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ut(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ut(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ut(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ut(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ut(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),r=Wt(r,this.array),i=Wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},kr=class extends Or{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Ar=class extends Or{constructor(e,t,n){super(new Uint32Array(e),t,n)}},jr=class extends Or{constructor(e,t,n){super(new Float32Array(e),t,n)}},Mr=new ur,Nr=new G,Pr=new G,Fr=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Mr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Nr.subVectors(e,this.center);let t=Nr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Nr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Pr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Nr.copy(e.center).add(Pr)),this.expandByPoint(Nr.copy(e.center).sub(Pr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ir=0,Lr=new J,Rr=new zn,zr=new G,Br=new ur,Vr=new ur,Hr=new G,Ur=class e extends yt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ir++}),this.uuid=wt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(lt(e)?Ar:kr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new K().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Lr.makeRotationFromQuaternion(e),this.applyMatrix4(Lr),this}rotateX(e){return Lr.makeRotationX(e),this.applyMatrix4(Lr),this}rotateY(e){return Lr.makeRotationY(e),this.applyMatrix4(Lr),this}rotateZ(e){return Lr.makeRotationZ(e),this.applyMatrix4(Lr),this}translate(e,t,n){return Lr.makeTranslation(e,t,n),this.applyMatrix4(Lr),this}scale(e,t,n){return Lr.makeScale(e,t,n),this.applyMatrix4(Lr),this}lookAt(e){return Rr.lookAt(e),Rr.updateMatrix(),this.applyMatrix4(Rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zr).negate(),this.translate(zr.x,zr.y,zr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new jr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ur);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Br.setFromBufferAttribute(n),this.morphTargetsRelative?(Hr.addVectors(this.boundingBox.min,Br.min),this.boundingBox.expandByPoint(Hr),Hr.addVectors(this.boundingBox.max,Br.max),this.boundingBox.expandByPoint(Hr)):(this.boundingBox.expandByPoint(Br.min),this.boundingBox.expandByPoint(Br.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);return}if(e){let n=this.boundingSphere.center;if(Br.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Vr.setFromBufferAttribute(n),this.morphTargetsRelative?(Hr.addVectors(Br.min,Vr.min),Br.expandByPoint(Hr),Hr.addVectors(Br.max,Vr.max),Br.expandByPoint(Hr)):(Br.expandByPoint(Vr.min),Br.expandByPoint(Vr.max))}Br.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Hr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Hr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Hr.fromBufferAttribute(a,t),o&&(zr.fromBufferAttribute(e,t),Hr.add(zr)),r=Math.max(r,n.distanceToSquared(Hr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Or(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let c=new G,l=new G,u=new G,d=new U,f=new U,p=new U,m=new G,h=new G;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new G,y=new G,b=new G,x=new G;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Or(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Hr.fromBufferAttribute(e,t),Hr.normalize(),e.setXYZ(t,Hr.x,Hr.y,Hr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Or(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Wr=new G,Gr=new G,Kr=new K,qr=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Wr.subVectors(n,t).cross(Gr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Wr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Kr.getNormalMatrix(e),r=this.coplanarPoint(Wr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Jr=0,Yr=class extends yt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jr++}),this.uuid=wt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=at,this.stencilZFail=at,this.stencilZPass=at,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new qr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new U().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new U().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Xr=new G,Zr=new G,Qr=new G,$r=new G,ei=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xr.copy(this.origin).addScaledVector(this.direction,t),Xr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Zr.copy(e).add(t).multiplyScalar(.5),Qr.copy(t).sub(e).normalize(),$r.copy(this.origin).sub(Zr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Qr),o=$r.dot(this.direction),s=-$r.dot(Qr),c=$r.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Zr).addScaledVector(Qr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Xr.subVectors(e.center,this.origin);let n=Xr.dot(this.direction),r=Xr.dot(Xr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Xr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,ee,te,j;if(y>=b&&y>=x?(w=s,D=u,A=p,j=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,ee=_,te=v):(S=l,C=c,T=f,E=d,O=h,k=m,ee=v,te=_)):b>=x?(w=c,D=d,A=m,j=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,ee=v,te=g):(S=s,C=l,T=u,E=f,O=p,k=h,ee=g,te=v)):(w=l,D=f,A=h,j=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,ee=g,te=_):(S=c,C=s,T=d,E=u,O=m,k=p,ee=_,te=g)),w===0)return null;let M=S/w,N=C/w,ne=1/w,re=T-M*D,ie=E-N*D,ae=O-M*A,oe=k-N*A,se=ee-M*j,P=te-N*j,ce=se*oe-P*ae,le=re*P-ie*se,ue=ae*ie-oe*re;if(r){if(ce<0||le<0||ue<0)return null}else if((ce<0||le<0||ue<0)&&(ce>0||le>0||ue>0))return null;let de=ce+le+ue;if(de===0)return null;let fe=ne*(ce*D+le*A+ue*j);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ti=class extends Yr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ni=new J,ri=new ei,ii=new Fr,ai=new G,oi=new G,si=new G,ci=new G,li=new G,ui=new G,di=new G,fi=new G,pi=class extends zn{constructor(e=new Ur,t=new ti){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ui.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(li.fromBufferAttribute(s,e),a?ui.addScaledVector(li,r):ui.addScaledVector(li.sub(t),r))}t.add(ui)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ii.copy(n.boundingSphere),ii.applyMatrix4(i),ri.copy(e.ray).recast(e.near),!(ii.containsPoint(ri.origin)===!1&&(ri.intersectSphere(ii,ai)===null||ri.origin.distanceToSquared(ai)>(e.far-e.near)**2))&&(ni.copy(i).invert(),ri.copy(e.ray).applyMatrix4(ni),(n.boundingBox===null||ri.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,ri)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=hi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=hi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=hi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=hi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function mi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;fi.copy(s),fi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(fi);return l<n.near||l>n.far?null:{distance:l,point:fi.clone(),object:e}}function hi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,oi),e.getVertexPosition(c,si),e.getVertexPosition(l,ci);let u=mi(e,t,n,r,oi,si,ci,di);if(u){let e=new G;lr.getBarycoord(di,oi,si,ci,e),i&&(u.uv=lr.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=lr.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=lr.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};lr.getNormal(oi,si,ci,t.normal),u.face=t,u.barycoord=e}return u}var gi=new cn,_i=new cn,vi=new cn,yi=new cn,bi=new J,xi=new G,Si=new Fr,Ci=new J,wi=new ei,Ti=class extends pi{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=f,this.bindMatrix=new J,this.bindMatrixInverse=new J,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ur),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,xi),this.boundingBox.expandByPoint(xi)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Fr),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,xi),this.boundingSphere.expandByPoint(xi)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Si.copy(this.boundingSphere),Si.applyMatrix4(r),e.ray.intersectsSphere(Si)!==!1&&(Ci.copy(r).invert(),wi.copy(e.ray).applyMatrix4(Ci),(this.boundingBox===null||wi.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,wi)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new cn,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():z(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;_i.fromBufferAttribute(r.attributes.skinIndex,e),vi.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(gi.copy(t),t.set(0,0,0,0)):(gi.set(...t,1),t.set(0,0,0)),gi.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=vi.getComponent(e);if(r!==0){let i=_i.getComponent(e);bi.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(yi.copy(gi).applyMatrix4(bi),r)}}return t.isVector4&&(t.w=gi.w),t.applyMatrix4(this.bindMatrixInverse)}},Ei=class extends zn{constructor(){super(),this.isBone=!0,this.type=`Bone`}},Di=class extends sn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=g,l=g,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oi=new J,ki=new J,Ai=class e{constructor(e=[],t=[]){this.uuid=wt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){z(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new J)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new J;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:ki;Oi.multiplyMatrices(i,t[r]),Oi.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Di(t,e,e,re,O);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(z(`Skeleton: No bone found with UUID:`,r),i=new Ei),this.bones.push(i),this.boneInverses.push(new J().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},ji=new Fr,Mi=new U(.5,.5),Ni=new G,Pi=class{constructor(e=new qr,t=new qr,n=new qr,r=new qr,i=new qr,a=new qr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ct,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(e){return ji.center.set(0,0,0),ji.radius=.7071067811865476+Mi.distanceTo(e.center),ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ni.x=r.normal.x>0?e.max.x:e.min.x,Ni.y=r.normal.y>0?e.max.y:e.min.y,Ni.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ni)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Fi=class extends sn{constructor(e,t,n,r,i,a,o,s,c,l,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},Ii=class extends Fi{constructor(e,t,n,r,i,a){super(e,t,n,i,a),this.isCompressedArrayTexture=!0,this.image.depth=r,this.wrapR=m,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Li=class extends Fi{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,301),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},Ri=class extends sn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},zi=class extends sn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Bi=class extends sn{constructor(e,t,n=D,r,i,a,o=g,s=g,c,l=ie,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new nn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Vi=class extends Bi{constructor(e,t=D,n=301,r,i,a=g,o=g,s,c=ie){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Hi=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ui=class e extends Ur{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new jr(c,3)),this.setAttribute(`normal`,new jr(l,3)),this.setAttribute(`uv`,new jr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Wi=class e extends Ur{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new jr(p,3)),this.setAttribute(`normal`,new jr(m,3)),this.setAttribute(`uv`,new jr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Gi(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(qi(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(qi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ki(e){let t={};for(let n=0;n<e.length;n++){let r=Gi(e[n]);for(let e in r)t[e]=r[e]}return t}function qi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ji(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Yi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:q.workingColorSpace}var Xi={clone:Gi,merge:Ki},Zi=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qi=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$i=class extends Yr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zi,this.fragmentShader=Qi,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gi(e.uniforms),this.uniformsGroups=Ji(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new cn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new J().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ea=class extends $i{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ta=class extends Yr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=et,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},na=class extends Yr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ra(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function ia(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function aa(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function oa(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function sa(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0){if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}}var ca=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},la=class extends ca{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ye,endingEnd:Ye}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Xe:i=e,o=2*t-n;break;case Ze:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Xe:a=e,s=2*n-t;break;case Ze:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ua=class extends ca{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},da=class extends ca{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},fa=class extends ca{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=ha(n,t,g,y,r);i[p]=pa(x,o,_,b,m)}return i}};function pa(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function ma(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function ha(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=pa(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=ma(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var ga=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ra(t,this.TimeBufferType),this.values=ra(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ra(e.times,Array),values:ra(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),ia(e.settings)&&(n.settings={inTangents:ra(e.settings.inTangents,Array),outTangents:ra(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new la(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new fa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ge:t=this.InterpolantFactoryMethodDiscrete;break;case Ke:t=this.InterpolantFactoryMethodLinear;break;case qe:t=this.InterpolantFactoryMethodSmooth;break;case Je:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ge;case this.InterpolantFactoryMethodLinear:return Ke;case this.InterpolantFactoryMethodSmooth:return qe;case this.InterpolantFactoryMethodBezier:return Je}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ia(this.settings)&&(_a(this.settings.inTangents,e),_a(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&ut(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===qe,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,ia(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function _a(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}ga.prototype.ValueTypeName=``,ga.prototype.TimeBufferType=Float32Array,ga.prototype.ValueBufferType=Float32Array,ga.prototype.DefaultInterpolation=Ke;var va=class extends ga{constructor(e,t,n){super(e,t,n)}};va.prototype.ValueTypeName=`bool`,va.prototype.ValueBufferType=Array,va.prototype.DefaultInterpolation=Ge,va.prototype.InterpolantFactoryMethodLinear=void 0,va.prototype.InterpolantFactoryMethodSmooth=void 0;var ya=class extends ga{constructor(e,t,n,r){super(e,t,n,r)}};ya.prototype.ValueTypeName=`color`;var ba=class extends ga{constructor(e,t,n,r){super(e,t,n,r)}};ba.prototype.ValueTypeName=`number`;var xa=class extends ca{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)W.slerpFlat(i,0,a,c-o,a,c,s);return i}},Sa=class extends ga{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new xa(this.times,this.values,this.getValueSize(),e)}};Sa.prototype.ValueTypeName=`quaternion`,Sa.prototype.InterpolantFactoryMethodSmooth=void 0;var Ca=class extends ga{constructor(e,t,n){super(e,t,n)}};Ca.prototype.ValueTypeName=`string`,Ca.prototype.ValueBufferType=Array,Ca.prototype.DefaultInterpolation=Ge,Ca.prototype.InterpolantFactoryMethodLinear=void 0,Ca.prototype.InterpolantFactoryMethodSmooth=void 0;var wa=class extends ga{constructor(e,t,n,r){super(e,t,n,r)}};wa.prototype.ValueTypeName=`vector`;var Ta=class{constructor(e=``,t=-1,n=[],r=Qe){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=wt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(Da(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(ga.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=aa(o);o=oa(o,1,c),s=oa(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new ba(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Ea(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return ba;case`vector`:case`vector2`:case`vector3`:case`vector4`:return wa;case`color`:return ya;case`quaternion`:return Sa;case`bool`:case`boolean`:return va;case`string`:return Ca}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function Da(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=Ea(e.type);if(e.times===void 0){let t=[],n=[];sa(e.keys,t,n,`value`),e.times=t,e.values=n}let n;return n=t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e),ia(e.settings)&&(n.settings={inTangents:ra(e.settings.inTangents,Float32Array),outTangents:ra(e.settings.outTangents,Float32Array)}),n}var Oa={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(ka(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!ka(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function ka(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Aa=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},ja=class{constructor(e){this.manager=e===void 0?Aa:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ja.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Ma={},Na=class extends Error{constructor(e,t){super(e),this.response=t}},Pa=class extends ja{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=Oa.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(Ma[e]!==void 0){Ma[e].push({onLoad:t,onProgress:n,onError:r});return}Ma[e]=[],Ma[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&z(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=Ma[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}throw new Na(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{Oa.add(`file:${e}`,t);let n=Ma[e];delete Ma[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=Ma[e];if(n===void 0)throw this.manager.itemError(e),t;delete Ma[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Fa=new WeakMap,Ia=class extends ja{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Oa.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Fa.get(a);e===void 0&&(e=[],Fa.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=dt(`img`);function s(){l(),t&&t(this);let n=Fa.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Fa.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Oa.remove(`image:${e}`);let n=Fa.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Fa.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Oa.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},La=class extends ja{constructor(e){super(e)}load(e,t,n,r){let i=new sn,a=new Ia(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Ra=class extends zn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},za=new J,Ba=new G,Va=new G,Ha=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=S,this.map=null,this.mapPass=null,this.matrix=new J,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pi,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new cn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ba.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ba),Va.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Va),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){za.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(za,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(za)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ua=new G,Wa=new W,Ga=new G,Ka=class extends zn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new J,this.projectionMatrix=new J,this.projectionMatrixInverse=new J,this.coordinateSystem=ct,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ua,Wa,Ga),Ga.x===1&&Ga.y===1&&Ga.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,Wa,Ga.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ua,Wa,Ga),Ga.x===1&&Ga.y===1&&Ga.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,Wa,Ga.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qa=new G,Ja=new U,Ya=new U,Xa=class extends Ka{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ct*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(St*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ct*2*Math.atan(Math.tan(St*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qa.x,qa.y).multiplyScalar(-e/qa.z),qa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qa.x,qa.y).multiplyScalar(-e/qa.z)}getViewSize(e,t){return this.getViewBounds(e,Ja,Ya),t.subVectors(Ya,Ja)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(St*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Za=class extends Ka{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Qa=class extends Ha{constructor(){super(new Za(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},$a=class extends Ra{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(zn.DEFAULT_UP),this.updateMatrix(),this.target=new zn,this.shadow=new Qa}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},eo=class extends Ra{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},to=-90,no=1,ro=class extends zn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Xa(to,no,e,t);r.layers=this.layers,this.add(r);let i=new Xa(to,no,e,t);i.layers=this.layers,this.add(i);let a=new Xa(to,no,e,t);a.layers=this.layers,this.add(a);let o=new Xa(to,no,e,t);o.layers=this.layers,this.add(o);let s=new Xa(to,no,e,t);s.layers=this.layers,this.add(s);let c=new Xa(to,no,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},io=class extends Xa{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ao=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,i,a;switch(t){case`quaternion`:r=this._slerp,i=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case`string`:case`bool`:r=this._select,i=this._select,a=this._setAdditiveIdentityOther,this.buffer=Array(n*5);break;default:r=this._lerp,i=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=i,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,r=this.valueSize,i=e*r+r,a=this.cumulativeWeight;if(a===0){for(let e=0;e!==r;++e)n[i+e]=n[e];a=t}else{a+=t;let e=t/a;this._mixBufferRegion(n,i,0,e,r)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,r=e*t+t,i=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,i<1){let e=t*this._origIndex;this._mixBufferRegion(n,r,e,1-i,t)}a>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let e=t,i=t+t;e!==i;++e)if(n[e]!==n[e+t]){o.setValue(n,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let e=n,i=r;e!==i;++e)t[e]=t[r+e%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,i){if(r>=.5)for(let r=0;r!==i;++r)e[t+r]=e[n+r]}_slerp(e,t,n,r){W.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,i){let a=this._workIndex*i;W.multiplyQuaternionsFlat(e,a,e,t,e,n),W.slerpFlat(e,t,e,t,e,a,r)}_lerp(e,t,n,r,i){let a=1-r;for(let o=0;o!==i;++o){let i=t+o;e[i]=e[i]*a+e[n+o]*r}}_lerpAdditive(e,t,n,r,i){for(let a=0;a!==i;++a){let i=t+a;e[i]=e[i]+e[n+a]*r}}},oo=`\\[\\]\\.:\\/`,so=RegExp(`[\\[\\]\\.:\\/]`,`g`),co=`[^\\[\\]\\.:\\/]`,lo=`[^`+oo.replace(`\\.`,``)+`]`,uo=`((?:WC+[\\/:])*)`.replace(`WC`,co),fo=`(WCOD+)?`.replace(`WCOD`,lo),po=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,co),mo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,co),ho=RegExp(`^`+uo+fo+po+mo+`$`),go=[`material`,`materials`,`bones`,`map`],_o=class{constructor(e,t,n){let r=n||vo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},vo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(so,``)}static parseTrackName(e){let t=ho.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);go.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};vo.Composite=_o,vo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},vo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},vo.prototype.GetterByBindingType=[vo.prototype._getValue_direct,vo.prototype._getValue_array,vo.prototype._getValue_arrayElement,vo.prototype._getValue_toArray],vo.prototype.SetterByBindingTypeAndVersioning=[[vo.prototype._setValue_direct,vo.prototype._setValue_direct_setNeedsUpdate,vo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vo.prototype._setValue_array,vo.prototype._setValue_array_setNeedsUpdate,vo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vo.prototype._setValue_arrayElement,vo.prototype._setValue_arrayElement_setNeedsUpdate,vo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vo.prototype._setValue_fromArray,vo.prototype._setValue_fromArray_setNeedsUpdate,vo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var yo=class{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;let i=t.tracks,a=i.length,o=Array(a),s={endingStart:Ye,endingEnd:Ye};for(let e=0;e!==a;++e){let t=i[e].createInterpolant(null);o[e]=t,t.settings=s}this._interpolantSettings=s,this._interpolants=o,this._propertyBindings=Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Ue,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let n=this._clip.duration,r=e._clip.duration,i=r/n,a=n/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,i,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let r=this._mixer,i=r.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=r._lendControlInterpolant(),this._timeScaleInterpolant=o);let s=o.parameterPositions,c=o.sampleValues;return s[0]=i,s[1]=i+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}let i=this._startTime;if(i!==null){let r=(e-i)*n;r<0||n===0?t=0:(this._startTime=null,t=n*r)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let e=this._interpolants,t=this._propertyBindings;switch(this.blendMode){case $e:for(let n=0,r=e.length;n!==r;++n)e[n].evaluate(a),t[n].accumulateAdditive(o);break;case Qe:default:for(let n=0,i=e.length;n!==i;++n)e[n].evaluate(a),t[n].accumulate(r,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,r=this.time+e,i=this._loopCount,a=n===We;if(e===0)return i===-1?r:a&&(i&1)==1?t-r:r;if(n===2200){i===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));handle_stop:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break handle_stop}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:`finished`,action:this,direction:e<0?-1:1})}}else{if(i===-1&&(e>=0?(i=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),r>=t||r<0){let n=Math.floor(r/t);r-=t*n,i+=Math.abs(n);let o=this.repetitions-i;if(o<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:`finished`,action:this,direction:e>0?1:-1});else{if(o===1){let t=e<0;this._setEndings(t,!t,a)}else this._setEndings(!1,!1,a);this._loopCount=i,this.time=r,this._mixer.dispatchEvent({type:`loop`,action:this,loopDelta:n})}}else this._loopCount=i,this.time=r;if(a&&(i&1)==1)return t-r}return r}_setEndings(e,t,n){let r=this._interpolantSettings;n?(r.endingStart=Xe,r.endingEnd=Xe):(r.endingStart=e?this.zeroSlopeAtStart?Xe:Ye:Ze,r.endingEnd=t?this.zeroSlopeAtEnd?Xe:Ye:Ze)}_scheduleFading(e,t,n){let r=this._mixer,i=r.time,a=this._weightInterpolant;a===null&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,s=a.sampleValues;return o[0]=i,s[0]=t,o[1]=i+e,s[1]=n,this}},bo=new Float32Array(1),xo=class extends yt{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,r=e._clip.tracks,i=r.length,a=e._propertyBindings,o=e._interpolants,s=n.uuid,c=this._bindingsByRootAndName,l=c[s];l===void 0&&(l={},c[s]=l);for(let e=0;e!==i;++e){let i=r[e],c=i.name,u=l[c];if(u!==void 0)++u.referenceCount,a[e]=u;else{if(u=a[e],u!==void 0){u._cacheIndex===null&&(++u.referenceCount,this._addInactiveBinding(u,s,c));continue}let r=t&&t._propertyBindings[e].binding.parsedPath;u=new ao(vo.create(n,c,r),i.ValueTypeName,i.getValueSize()),++u.referenceCount,this._addInactiveBinding(u,s,c),a[e]=u}o[e].resultBuffer=u.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let t=(e._localRoot||this._root).uuid,n=e._clip.uuid,r=this._actionsByClip[n];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,n,t)}let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];n.useCount++===0&&(this._lendBinding(n),n.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];--n.useCount===0&&(n.restoreOriginalState(),this._takeBackBinding(n))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let r=this._actions,i=this._actionsByClip,a=i[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,i[t]=a;else{let t=a.knownActions;e._byClipCacheIndex=t.length,t.push(e)}e._cacheIndex=r.length,r.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;let i=e._clip.uuid,a=this._actionsByClip,o=a[i],s=o.knownActions,c=s[s.length-1],l=e._byClipCacheIndex;c._byClipCacheIndex=l,s[l]=c,s.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],s.length===0&&delete a[i],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];--n.referenceCount===0&&this._removeInactiveBinding(n)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_addInactiveBinding(e,t,n){let r=this._bindingsByRootAndName,i=this._bindings,a=r[t];a===void 0&&(a={},r[t]=a),a[n]=e,e._cacheIndex=i.length,i.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,r=n.rootNode.uuid,i=n.path,a=this._bindingsByRootAndName,o=a[r],s=t[t.length-1],c=e._cacheIndex;s._cacheIndex=c,t[c]=s,t.pop(),delete o[i],Object.keys(o).length===0&&delete a[r]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new ua(new Float32Array(2),new Float32Array(2),1,bo),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,i=t[r];e.__cacheIndex=r,t[r]=e,i.__cacheIndex=n,t[n]=i}clipAction(e,t,n){let r=t||this._root,i=r.uuid,a=typeof e==`string`?Ta.findByName(r,e):e,o=a===null?e:a.uuid,s=this._actionsByClip[o],c=null;if(n===void 0&&(n=a===null?Qe:a.blendMode),s!==void 0){let e=s.actionByRoot[i];if(e!==void 0&&e.blendMode===n)return e;c=s.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let l=new yo(this,a,t,n);return this._bindAction(l,c),this._addInactiveAction(l,o,i),l}existingAction(e,t){let n=t||this._root,r=n.uuid,i=typeof e==`string`?Ta.findByName(n,e):e,a=i?i.uuid:e,o=this._actionsByClip[a];return o===void 0?null:o.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,r=this.time+=e,i=Math.sign(e),a=this._accuIndex^=1;for(let o=0;o!==n;++o)t[o]._update(r,e,i,a);let o=this._bindings,s=this._nActiveBindings;for(let e=0;e!==s;++e)o[e].apply(a);return this}setTime(e){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,r=this._actionsByClip,i=r[n];if(i!==void 0){let e=i.knownActions;for(let n=0,r=e.length;n!==r;++n){let r=e[n];this._deactivateAction(r);let i=r._cacheIndex,a=t[t.length-1];r._cacheIndex=null,r._byClipCacheIndex=null,a._cacheIndex=i,t[i]=a,t.pop(),this._removeInactiveBindingsForAction(r)}delete r[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let e in n){let r=n[e].actionByRoot[t];r!==void 0&&(this._deactivateAction(r),this._removeInactiveAction(r))}let r=this._bindingsByRootAndName[t];if(r!==void 0)for(let e in r){let t=r[e];t.restoreOriginalState(),this._removeInactiveBinding(t)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},So=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,z(`Clock: This module has been deprecated. Please use THREE.Timer instead.`)}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},Co=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=V(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(V(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function wo(e,t,n,r){let i=To(r);switch(n){case N:return e*t;case oe:return e*t/i.components*i.byteLength;case se:return e*t/i.components*i.byteLength;case P:return e*t*2/i.components*i.byteLength;case ce:return e*t*2/i.components*i.byteLength;case ne:return e*t*3/i.components*i.byteLength;case re:return e*t*4/i.components*i.byteLength;case le:return e*t*4/i.components*i.byteLength;case ue:case de:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case fe:case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case he:case _e:return Math.max(e,16)*Math.max(t,8)/4;case me:case ge:return Math.max(e,8)*Math.max(t,8)/2;case ve:case ye:case xe:case Se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case be:case Ce:case we:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ee:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case De:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Oe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ke:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ae:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case je:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Me:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ne:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case F:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Pe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Fe:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ie:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case I:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Le:case L:case R:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Re:case ze:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Be:case Ve:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function To(e){switch(e){case S:case C:return{byteLength:1,components:1};case T:case w:case k:return{byteLength:2,components:1};case A:case ee:return{byteLength:2,components:4};case D:case E:case O:return{byteLength:4,components:1};case j:case M:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Eo(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Do(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Z={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new K}},envmap:{envMap:{value:null},envMapRotation:{value:new K},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new K}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new K}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new K},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new K},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new K},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new K}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new K}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new K}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0},uvTransform:{value:new K}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}}},Oo={basic:{uniforms:Ki([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:Ki([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:Ki([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:Ki([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:Ki([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new Y(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:Ki([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:Ki([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:Ki([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:Ki([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:Ki([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:Ki([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new K},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new K}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:Ki([Z.common,Z.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:Ki([Z.lights,Z.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};Oo.physical={uniforms:Ki([Oo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new K},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new K},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new K},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new K},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new K},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new K},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new K},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new K},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new K},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new K},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new K},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new K}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var ko={r:0,b:0,g:0},Ao=new J,jo=new K;jo.set(-1,0,0,0,1,0,0,0,1);function Mo(e,t,n,r,i,a){let o=new Y(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new pi(new Ui(1,1,1),new $i({name:`BackgroundCubeMaterial`,uniforms:Gi(Oo.backgroundCube.uniforms),vertexShader:Oo.backgroundCube.vertexShader,fragmentShader:Oo.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ao.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(jo),l.material.toneMapped=q.getTransfer(i.colorSpace)!==it,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new pi(new Wi(2,2),new $i({name:`BackgroundMaterial`,uniforms:Gi(Oo.background.uniforms),vertexShader:Oo.background.vertexShader,fragmentShader:Oo.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=q.getTransfer(i.colorSpace)!==it,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ko,Yi(e)),n.buffers.color.setClear(ko.r,ko.g,ko.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function No(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Po(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Fo(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Io(e){let t=this,n=null,r=0,i=!1,a=!1,o=new qr,s=new K,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Lo=4,Ro=6,zo=20,Bo=256,Vo=new Za,Ho=new Y,Uo=null,Wo=0,Go=0,Ko=!1,qo=new G,Jo=new G,Yo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=qo}=i;Uo=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ns(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ts(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Uo,Wo,Go),this._renderer.xr.enabled=Ko,e.scissorTest=!1,Qo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Uo=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:y,minFilter:y,generateMipmaps:!1,type:k,format:re,colorSpace:nt,depthBuffer:!1},r=Zo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Xo(r)),this._blurMaterial=es(r,e,t),this._ggxMaterial=$o(r,e,t)}return r}_compileMaterial(e){let t=new pi(new Ur,e);this._renderer.compile(t,Vo)}_sceneToCubeUV(e,t,n,r,i){let a=new Xa(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ho),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pi(new Ui,new ti({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ho),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Qo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ns()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ts());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Qo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Vo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Lo?n-d+Lo:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Qo(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Vo),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Qo(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Vo)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Qo(t,3*l*(r>this._lodMax-Lo?r-this._lodMax+Lo:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Vo)}};function Xo(e){let t=[],n=[],r=e,i=e-Lo+1+Ro;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Jo.set(1,r,n):e===1?Jo.set(-n,1,-r):e===2?Jo.set(-n,r,1):e===3?Jo.set(-1,r,-n):e===4?Jo.set(-n,-1,r):Jo.set(n,r,-1),Jo.toArray(l,(e*6+t)*3)}}let u=new Ur;u.setAttribute(`position`,new Or(c,3)),u.setAttribute(`outputDirection`,new Or(l,3)),n.push(new pi(u,null)),r>Lo&&r--}return{lodMeshes:n,sizeLods:t}}function Zo(e,t,n){let r=new un(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Qo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function $o(e,t,n){return new $i({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Bo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function es(e,t,n){return new $i({name:`SphericalGaussianBlur`,defines:{SAMPLES:zo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:rs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function ts(){return new $i({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:rs(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function ns(){return new $i({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function rs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var is=class extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ri(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ui(5,5,5),i=new $i({name:`CubemapFromEquirect`,uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new pi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=y),new ro(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function as(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new is(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Yo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Yo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function os(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&gt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ss(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Ar:kr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function cs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function ls(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function us(e,t,n){let r=new WeakMap,i=new cn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new dn(h,p,m,u);g.type=O,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new U(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ds(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var fs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ps(e,t,n,r,i,a){let o=new un(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ur;l.setAttribute(`position`,new jr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new jr([0,2,0,0,2,0],2));let u=new ea({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new pi(l,u),f=new Za(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new un(t,n,{type:k,depthBuffer:!1,stencilBuffer:!1}),c=new un(t,n,{type:k,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},q.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=fs[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var ms=new sn,hs=new Bi(1,1),gs=new dn,_s=new fn,vs=new Ri,ys=[],bs=[],xs=new Float32Array(16),Ss=new Float32Array(9),Cs=new Float32Array(4);function ws(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ys[i];if(a===void 0&&(a=new Float32Array(i),ys[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ts(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Es(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ds(e,t){let n=bs[t];n===void 0&&(n=new Int32Array(t),bs[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Os(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ks(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ts(n,t))return;e.uniform2fv(this.addr,t),Es(n,t)}}function As(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ts(n,t))return;e.uniform3fv(this.addr,t),Es(n,t)}}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ts(n,t))return;e.uniform4fv(this.addr,t),Es(n,t)}}function Ms(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ts(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Es(n,t)}else{if(Ts(n,r))return;Cs.set(r),e.uniformMatrix2fv(this.addr,!1,Cs),Es(n,r)}}function Ns(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ts(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Es(n,t)}else{if(Ts(n,r))return;Ss.set(r),e.uniformMatrix3fv(this.addr,!1,Ss),Es(n,r)}}function Ps(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ts(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Es(n,t)}else{if(Ts(n,r))return;xs.set(r),e.uniformMatrix4fv(this.addr,!1,xs),Es(n,r)}}function Fs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Is(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ts(n,t))return;e.uniform2iv(this.addr,t),Es(n,t)}}function Ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ts(n,t))return;e.uniform3iv(this.addr,t),Es(n,t)}}function Rs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ts(n,t))return;e.uniform4iv(this.addr,t),Es(n,t)}}function zs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Bs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ts(n,t))return;e.uniform2uiv(this.addr,t),Es(n,t)}}function Vs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ts(n,t))return;e.uniform3uiv(this.addr,t),Es(n,t)}}function Hs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ts(n,t))return;e.uniform4uiv(this.addr,t),Es(n,t)}}function Us(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(hs.compareFunction=n.isReversedDepthBuffer()?518:515,a=hs):a=ms,n.setTexture2D(t||a,i)}function Ws(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||_s,i)}function Gs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||vs,i)}function Ks(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||gs,i)}function qs(e){switch(e){case 5126:return Os;case 35664:return ks;case 35665:return As;case 35666:return js;case 35674:return Ms;case 35675:return Ns;case 35676:return Ps;case 5124:case 35670:return Fs;case 35667:case 35671:return Is;case 35668:case 35672:return Ls;case 35669:case 35673:return Rs;case 5125:return zs;case 36294:return Bs;case 36295:return Vs;case 36296:return Hs;case 35678:case 36198:case 36298:case 36306:case 35682:return Us;case 35679:case 36299:case 36307:return Ws;case 35680:case 36300:case 36308:case 36293:return Gs;case 36289:case 36303:case 36311:case 36292:return Ks}}function Js(e,t){e.uniform1fv(this.addr,t)}function Ys(e,t){let n=ws(t,this.size,2);e.uniform2fv(this.addr,n)}function Xs(e,t){let n=ws(t,this.size,3);e.uniform3fv(this.addr,n)}function Zs(e,t){let n=ws(t,this.size,4);e.uniform4fv(this.addr,n)}function Qs(e,t){let n=ws(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function $s(e,t){let n=ws(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ec(e,t){let n=ws(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function tc(e,t){e.uniform1iv(this.addr,t)}function nc(e,t){e.uniform2iv(this.addr,t)}function rc(e,t){e.uniform3iv(this.addr,t)}function ic(e,t){e.uniform4iv(this.addr,t)}function ac(e,t){e.uniform1uiv(this.addr,t)}function oc(e,t){e.uniform2uiv(this.addr,t)}function sc(e,t){e.uniform3uiv(this.addr,t)}function cc(e,t){e.uniform4uiv(this.addr,t)}function lc(e,t,n){let r=this.cache,i=t.length,a=Ds(n,i);Ts(r,a)||(e.uniform1iv(this.addr,a),Es(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?hs:ms;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function uc(e,t,n){let r=this.cache,i=t.length,a=Ds(n,i);Ts(r,a)||(e.uniform1iv(this.addr,a),Es(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||_s,a[e])}function dc(e,t,n){let r=this.cache,i=t.length,a=Ds(n,i);Ts(r,a)||(e.uniform1iv(this.addr,a),Es(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||vs,a[e])}function fc(e,t,n){let r=this.cache,i=t.length,a=Ds(n,i);Ts(r,a)||(e.uniform1iv(this.addr,a),Es(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||gs,a[e])}function pc(e){switch(e){case 5126:return Js;case 35664:return Ys;case 35665:return Xs;case 35666:return Zs;case 35674:return Qs;case 35675:return $s;case 35676:return ec;case 5124:case 35670:return tc;case 35667:case 35671:return nc;case 35668:case 35672:return rc;case 35669:case 35673:return ic;case 5125:return ac;case 36294:return oc;case 36295:return sc;case 36296:return cc;case 35678:case 36198:case 36298:case 36306:case 35682:return lc;case 35679:case 36299:case 36307:return uc;case 35680:case 36300:case 36308:case 36293:return dc;case 36289:case 36303:case 36311:case 36292:return fc}}var mc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=qs(t.type)}},hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pc(t.type)}},gc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},_c=/(\w+)(\])?(\[|\.)?/g;function vc(e,t){e.seq.push(t),e.map[t.id]=t}function yc(e,t,n){let r=e.name,i=r.length;for(_c.lastIndex=0;;){let a=_c.exec(r),o=_c.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){vc(n,l===void 0?new mc(s,e,t):new hc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new gc(s),vc(n,e)),n=e}}}var bc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);yc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function xc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Sc=37297,Cc=0;function wc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Tc=new K;function Ec(e){q._getMatrix(Tc,q.workingColorSpace,e);let t=`mat3( ${Tc.elements.map(e=>e.toFixed(4))} )`;switch(q.getTransfer(e)){case rt:return[t,`LinearTransferOETF`];case it:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Dc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+wc(e.getShaderSource(t),r)}return i}function Oc(e,t){let n=Ec(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var kc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Ac(e,t){let n=kc[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var jc=new G;function Mc(){return q.getLuminanceCoefficients(jc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${jc.x.toFixed(4)}, ${jc.y.toFixed(4)}, ${jc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Nc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Ic).join(`
`)}function Pc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Fc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Ic(e){return e!==``}function Lc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var zc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bc(e){return e.replace(zc,Hc)}var Vc=new Map;function Hc(e,t){let n=X[t];if(n===void 0){let e=Vc.get(t);if(e!==void 0)n=X[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Bc(n)}var Uc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wc(e){return e.replace(Uc,Gc)}function Gc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Kc(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var qc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Jc(e){return qc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Yc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Xc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Yc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Zc={302:`ENVMAP_MODE_REFRACTION`};function Qc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Zc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var $c={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function el(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:$c[e.combine]||`ENVMAP_BLENDING_NONE`}function tl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function nl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Jc(n),l=Xc(n),u=Qc(n),d=el(n),f=tl(n),p=Nc(n),m=Pc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ic).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ic).join(`
`),_.length>0&&(_+=`
`)):(g=[Kc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Ic).join(`
`),_=[Kc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:Ac(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,Oc(`linearToOutputTexel`,n.outputColorSpace),Mc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Ic).join(`
`)),o=Bc(o),o=Lc(o,n),o=Rc(o,n),s=Bc(s),s=Lc(s,n),s=Rc(s,n),o=Wc(o),s=Wc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=xc(i,i.VERTEX_SHADER,y),S=xc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Dc(i,x,`vertex`),n=Dc(i,S,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new bc(i,h),T=Fc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Sc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Cc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var rl=0,il=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new al(e),t.set(e,n)),n}},al=class{constructor(e){this.id=rl++,this.code=e,this.usedTimes=0}};function ol(e){return e===1030||e===37490||e===36285}function sl(e,t,n,r,i,a){let o=new Cn,s=new il,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Oo[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,M=h.isBatchedMesh===!0,N=!!i.map,ne=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,P=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.dispersion>0,me=i.retroreflectivity>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=de&&!!i.anisotropyMap,ye=fe&&!!i.clearcoatMap,be=fe&&!!i.clearcoatNormalMap,xe=fe&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,we=ge&&!!i.sheenColorMap,Te=ge&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,De=!!i.specularColorMap,Oe=!!i.specularIntensityMap,ke=_e&&!!i.transmissionMap,Ae=_e&&!!i.thicknessMap,je=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,F=!!i.alphaHash,Pe=!!i.extensions,Fe=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Fe=e.toneMapping);let Ie={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:M,batchingColor:M&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:q.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:ne,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:P,emissiveMap:ce,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&ol(i.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:de,anisotropyMap:ve,clearcoat:fe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:pe,retroreflection:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:_e,transmissionMap:ke,thicknessMap:Ae,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:F,combine:i.combine,mapUv:N&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:P&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:le&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:De&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:ke&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:Me&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||de),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(N||Me),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Fe,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&q.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&q.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Pe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Pe&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Oo[t];n=Xi.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new nl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function cl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ll(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ul(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function dl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ll),r.length>1&&r.sort(t||ul),i.length>1&&i.sort(t||ul)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function fl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new dl,e.set(t,[i])):n>=r.length?(i=new dl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function pl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new G,color:new Y};break;case`SpotLight`:n={position:new G,direction:new G,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function ml(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var hl=0;function gl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function _l(e){let t=new pl,n=ml(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new J,o=new J;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(gl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=hl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function vl(e){let t=new _l(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function yl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new vl(e),t.set(n,[a])):r>=i.length?(a=new vl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var bl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xl=`uniform sampler2D shadow_pass;
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
}`,Sl=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],Cl=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],wl=new J,Tl=new G,El=new G;function Dl(e,t,n){let r=new Pi,i=new U,a=new U,o=new cn,s=new ta,c=new na,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new $i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:bl,fragmentShader:xl}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ur;m.setAttribute(`position`,new Or(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new pi(m,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,s){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=v!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new un(i.x,i.y,{format:P,type:k,minFilter:y,magFilter:y,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Bi(i.x,i.y,O),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ie,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=g,d.map.depthTexture.magFilter=g}else l.isPointLight?(d.map=new is(i.x),d.map.depthTexture=new Vi(i.x,D)):(d.map=new un(i.x,i.y),d.map.depthTexture=new Bi(i.x,i.y,D)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ie,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=y,d.map.depthTexture.magFilter=y):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=g,d.map.depthTexture.magFilter=g);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let _=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<_;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Tl.setFromMatrixPosition(l.matrixWorld),e.position.copy(Tl),El.copy(e.position),El.add(Sl[t]),e.up.copy(Cl[t]),e.lookAt(El),e.updateMatrixWorld(),n.makeTranslation(-Tl.x,-Tl.y,-Tl.z),wl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(wl,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new un(i.x,i.y,{format:P,type:k}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,C)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=x(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)S(c[e],i,a,o,s)}function C(e){e.target.removeEventListener(`dispose`,C);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Ol(e,t){function n(){let t=!1,n=new cn,r=null,i=new cn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?le(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=vt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?le(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,M=0,N=e.getParameter(e.VERSION);N.indexOf(`WebGL`)===-1?N.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),j=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(N)[1]),j=M>=1);let ne=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new cn().fromArray(ie),se=new cn().fromArray(ae);function P(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=P(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=P(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=P(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=P(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),le(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),le(e.CULL_FACE),ge(0);function le(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(ue(e.BLEND),g=!1);return}if(g===!1&&(le(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):le(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?ue(e.CULL_FACE):(le(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function be(t){t!==k&&(j&&e.lineWidth(t),k=t)}function xe(t,n,r){t?(le(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?le(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+te-1),ne!==t&&(e.activeTexture(t),ne=t)}function we(t,n,r){r===void 0&&(r=ne===null?e.TEXTURE0+te-1:ne);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(ne!==r&&(e.activeTexture(r),ne=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function Te(){let t=re[ne];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Pe(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Fe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ie(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function I(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Le(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function L(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function R(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:le,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:F,texImage3D:Pe,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:L,uniformBlockBinding:R,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:I,viewport:Le,reset:Re}}function kl(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new U,u=new WeakMap,d=new Set,f,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):dt(`canvas`)}function T(e,t,n){let r=1,i=Fe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=w(n,a));let o=t?w(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?rt:q.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function A(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function te(e){let t=e.target;t.removeEventListener(`dispose`,te),M(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),ne(t)}function M(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&N(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function N(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function ne(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let re=0;function ie(){re=0}function oe(){return re}function se(e){re=e}function P(){let e=re;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),re+=1,e}function ce(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function le(t,i){let a=r.get(t);if(t.isVideoTexture&&F(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{be(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ue(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){be(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){be(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function fe(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){xe(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let pe={[p]:e.REPEAT,[m]:e.CLAMP_TO_EDGE,[h]:e.MIRRORED_REPEAT},me={[g]:e.NEAREST,[_]:e.NEAREST_MIPMAP_NEAREST,[v]:e.NEAREST_MIPMAP_LINEAR,[y]:e.LINEAR,[b]:e.LINEAR_MIPMAP_NEAREST,[x]:e.LINEAR_MIPMAP_LINEAR},he={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ge(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,pe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,pe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,pe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,me[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,me[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,he[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function _e(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,te));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=ce(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ve(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ye(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ve(n.start,r.width,4),c=ve(t.start,r.width,4);n.start<=i+1&&a===c&&ve(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function be(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=_e(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=q.getPrimaries(q.workingColorSpace),r=o.colorSpace===``?null:q.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=T(o.image,!1,i.maxTextureSize);t=Pe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=k(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ge(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,v=f.__version===void 0||l===!0,y=u.dataReady,b=ee(o,t);if(o.isDepthTexture)m=A(o.format===ae,o.type),v&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&v&&n.texStorage2D(e.TEXTURE_2D,b,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(v&&n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height),y&&ye(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&v&&n.texStorage3D(e.TEXTURE_2D_ARRAY,b,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(y){if(o.layerUpdates.size>0){let t=wo(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?y&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&v&&n.texStorage2D(e.TEXTURE_2D,b,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?y&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(v&&n.texStorage3D(e.TEXTURE_2D_ARRAY,b,m,t.width,t.height,t.depth),y){if(o.layerUpdates.size>0){let i=wo(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(v&&n.texStorage3D(e.TEXTURE_3D,b,m,t.width,t.height,t.depth),y&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(v){if(_)n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<b;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&v){let t=Fe(g[0]);n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(v){let r=Fe(t);n.texStorage2D(e.TEXTURE_2D,b,m,r.width,r.height)}y&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);E(o)&&D(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function xe(t,o,s){if(o.image.length!==6)return;let c=_e(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=q.getPrimaries(q.workingColorSpace),r=o.colorSpace===``?null:q.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=T(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Pe(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=k(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=ee(o,h);ge(e.TEXTURE_CUBE_MAP,o);let C;if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=Fe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}E(o)&&D(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Se(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=k(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ne(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Me(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=A(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ne(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=k(o.internalFormat,c,l,o.normalized,o.colorSpace);Ne(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function we(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,te)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ge(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else le(i.depthTexture,0);let u=l.__webglTexture,d=Me(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ne(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ne(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Te(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)we(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?we(i.__webglFramebuffer[0],t,0):we(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ce(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ce(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,i){let a=r.get(t);n!==void 0&&Se(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Te(t)}function De(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,j);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Ne(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=k(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Me(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Ce(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ge(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Se(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Se(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);E(i)&&D(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ge(c,a),Se(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),E(a)&&D(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ge(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Se(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Se(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);E(i)&&D(r),n.unbindTexture()}t.depthBuffer&&Te(t)}function Oe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(E(a)){let t=O(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),D(t),n.unbindTexture()}}}let ke=[],Ae=[];function je(t){if(t.samples>0){if(Ne(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ke.length=0,Ae.length=0,ke.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(ke.push(l),Ae.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ae)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ke))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Me(e){return Math.min(i.maxSamples,e.samples)}function Ne(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function F(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Pe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(q.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Fe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=ie,this.getTextureUnits=oe,this.setTextureUnits=se,this.setTexture2D=le,this.setTexture2DArray=ue,this.setTexture3D=de,this.setTextureCube=fe,this.rebindTextures=Ee,this.setupRenderTarget=De,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Al(e,t){function n(n,r=``){let i,a=q.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var jl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ml=`
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

}`,Nl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Hi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new $i({vertexShader:jl,fragmentShader:Ml,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pi(new Wi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Pl=class extends yt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Nl,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],C=new U,w=null,T=null,E=new Xa;E.viewport=new cn;let O=new Xa;O.viewport=new cn;let k=[E,O],A=new io,ee=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Hn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Hn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Hn,b[e]=t),t.getHandSpace()};function M(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function N(){r.removeEventListener(`select`,M),r.removeEventListener(`selectstart`,M),r.removeEventListener(`selectend`,M),r.removeEventListener(`squeeze`,M),r.removeEventListener(`squeezestart`,M),r.removeEventListener(`squeezeend`,M),r.removeEventListener(`end`,N),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}ee=null,j=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),T!==null){let e=T.camera;e.fov=T.fov,e.zoom=T.zoom,e.updateProjectionMatrix(),T=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,M),r.addEventListener(`selectstart`,M),r.addEventListener(`selectend`,M),r.addEventListener(`squeeze`,M),r.addEventListener(`squeezestart`,M),r.addEventListener(`squeezeend`,M),r.addEventListener(`end`,N),r.addEventListener(`inputsourceschange`,ne),_.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?ae:ie,a=_.stencil?te:D);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new un(d.textureWidth,d.textureHeight,{format:re,type:S,depthTexture:new Bi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new un(f.framebufferWidth,f.framebufferHeight,{format:re,type:S,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let oe=new G,se=new G;function P(e,t,n){oe.setFromMatrixPosition(t.matrixWorld),se.setFromMatrixPosition(n.matrixWorld);let r=oe.distanceTo(se),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ce(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),A.near=O.near=E.near=t,A.far=O.far=E.far=n,(ee!==A.near||j!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),ee=A.near,j=A.far),A.layers.mask=e.layers.mask|6,E.layers.mask=A.layers.mask&-5,O.layers.mask=A.layers.mask&-3;let i=e.parent,a=A.cameras;ce(A,i);for(let e=0;e<a.length;e++)ce(a[e],i);a.length===2?P(A,E,O):A.projectionMatrix.copy(E.projectionMatrix),T===null&&e.isPerspectiveCamera&&(T={camera:e,fov:e.fov,zoom:e.zoom}),le(e,A,i)};function le(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Ct*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(A)},this.getCameraTexture=function(e){return g[e]};let ue=null;function de(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==A.cameras.length&&(A.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=k[n];o===void 0&&(o=new Xa,o.layers.enable(n),o.viewport=new cn,k[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),i===!0&&A.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Hi,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ue&&ue(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let fe=new Eo;fe.setAnimationLoop(de),this.setAnimationLoop=function(e){ue=e},this.dispose=function(){}}},Fl=new J,Il=new K;Il.set(-1,0,0,0,1,0,0,0,1);function Ll(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Yi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Fl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Il),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Rl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var zl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bl=null;function Vl(){return Bl===null&&(Bl=new Di(zl,16,16,P,k),Bl.name=`DFG_LUT`,Bl.minFilter=y,Bl.magFilter=y,Bl.wrapS=m,Bl.wrapT=m,Bl.generateMipmaps=!1,Bl.needsUpdate=!0),Bl}var Hl=class{constructor(e={}){let{canvas:t=ft(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=S}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([le,ce,se]),g=new Set([S,D,T,te,A,ee]),_=new Uint32Array(4),v=new Int32Array(4),y=new G,b=null,C=null,w=[],E=[],O=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,M=!1,N=null,ne=null,re=null,ie=null;this._outputColorSpace=tt;let ae=0,oe=0,P=null,ue=-1,de=null,fe=new cn,pe=new cn,me=null,he=new Y(0),ge=0,_e=t.width,ve=t.height,ye=1,be=null,xe=null,Se=new cn(0,0,_e,ve),Ce=new cn(0,0,_e,ve),we=!1,Te=new Pi,Ee=!1,De=!1,Oe=new J,ke=new G,Ae=new cn,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Me=!1;function Ne(){return P===null?ye:1}let F=n;function Pe(e,n){return t.getContext(e,n)}let Fe,Ie,I,Le,L,R,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,it,!1),t.addEventListener(`webglcontextrestored`,at,!1),t.addEventListener(`webglcontextcreationerror`,ot,!1),F===null){let t=`webgl2`;if(F=Pe(t,e),F===null)throw Pe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}nt()}catch(e){throw t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),B(`WebGLRenderer: `+e.message),e}function nt(){Fe=new os(F),Fe.init(),Qe=new Al(F,Fe),Ie=new Fo(F,Fe,e,Qe),I=new Ol(F,Fe),Ie.reversedDepthBuffer&&d&&I.buffers.depth.setReversed(!0),ne=F.createFramebuffer(),re=F.createFramebuffer(),ie=F.createFramebuffer(),Le=new ls(F),L=new cl,R=new kl(F,Fe,I,L,Ie,Qe,Le),Re=new as(j),ze=new Do(F),$e=new No(F,ze),Be=new ss(F,ze,Le,$e),Ve=new ds(F,Be,ze,$e,Le),Ye=new us(F,Ie,R),Ke=new Io(L),He=new sl(j,Re,Fe,Ie,$e,Ke),Ue=new Ll(j,L),We=new fl,Ge=new yl(Fe),Je=new Mo(j,Re,I,Ve,p,s),qe=new Dl(j,Ve,Ie),et=new Rl(F,Le,Ie,I),Xe=new Po(F,Fe,Le),Ze=new cs(F,Fe,Le),Le.programs=He.programs,j.capabilities=Ie,j.extensions=Fe,j.properties=L,j.renderLists=We,j.shadowMap=qe,j.state=I,j.info=Le}m!==1009&&(O=new ps(m,t.width,t.height,o,r,i));let rt=new Pl(j,F);this.xr=rt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(e){e!==void 0&&(ye=e,this.setSize(_e,ve,!1))},this.getSize=function(e){return e.set(_e,ve)},this.setSize=function(e,n,r=!0){if(rt.isPresenting){z(`WebGLRenderer: Can't change size while VR device is presenting.`);return}_e=e,ve=n,t.width=Math.floor(e*ye),t.height=Math.floor(n*ye),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),O!==null&&O.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(_e*ye,ve*ye).floor()},this.setDrawingBufferSize=function(e,n,r){_e=e,ve=n,ye=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}O.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(fe)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),I.viewport(fe.copy(Se).multiplyScalar(ye).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),I.scissor(pe.copy(Ce).multiplyScalar(ye).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(e){I.setScissorTest(we=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(P!==null){let t=P.texture.format;e=h.has(t)}if(e){let e=P.texture.type,t=g.has(e),n=Je.getClearColor(),r=Je.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,F.clearBufferuiv(F.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,F.clearBufferiv(F.COLOR,0,v))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),N=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),Je.dispose(),We.dispose(),Ge.dispose(),L.dispose(),Re.dispose(),Ve.dispose(),$e.dispose(),et.dispose(),He.dispose(),rt.dispose(),rt.removeEventListener(`sessionstart`,gt),rt.removeEventListener(`sessionend`,vt),yt.stop()};function it(e){e.preventDefault(),mt(`WebGLRenderer: Context Lost.`),M=!0}function at(){mt(`WebGLRenderer: Context Restored.`),M=!1;let e=Le.autoReset,t=qe.enabled,n=qe.autoUpdate,r=qe.needsUpdate,i=qe.type;nt(),Le.autoReset=e,qe.enabled=t,qe.autoUpdate=n,qe.needsUpdate=r,qe.type=i}function ot(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function st(e){let t=e.target;t.removeEventListener(`dispose`,st),lt(t)}function lt(e){ut(e),L.remove(e)}function ut(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){He.releaseProgram(e)}),e.isShaderMaterial&&He.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=je);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;$e.setup(i,r,s,n,c);let h,g=Xe;if(c!==null&&(h=ze.get(c),g=Ze,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*Ne()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*Ne()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(Fe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ze.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function dt(e,t,n,r){N!==null&&e.isNodeMaterial&&N.setObject(r,e),Ee===!0&&Ke.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,V(e,t,r),e.side=0,e.needsUpdate=!0,V(e,t,r),e.side=2):V(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),N!==null&&N.renderStart(e,t,n),C=Ge.get(n),C.init(t),E.push(C),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(C.pushLight(e),e.castShadow&&C.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(C.pushLight(e),e.castShadow&&C.pushShadow(e))}),C.setupLights(),N!==null&&N.updateLights(C.state.lightsArray),De=this.localClippingEnabled,Ee=Ke.init(this.clippingPlanes,De),Ee===!0&&Ke.setGlobalState(this.clippingPlanes,t),N!==null&&qe.render(C.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];dt(o,n,t,e),r.add(o)}else dt(i,n,t,e),r.add(i)}}),C=E.pop(),N!==null&&N.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=L.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Fe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let pt=null;function ht(e){pt&&pt(e)}function gt(){yt.stop()}function vt(){yt.start()}let yt=new Eo;yt.setAnimationLoop(ht),typeof self<`u`&&yt.setContext(self),this.setAnimationLoop=function(e){pt=e,rt.setAnimationLoop(e),e===null?yt.stop():yt.start()},rt.addEventListener(`sessionstart`,gt),rt.addEventListener(`sessionend`,vt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(M===!0)return;N!==null&&N.renderStart(e,t);let n=rt.enabled===!0&&rt.isPresenting===!0,r=O!==null&&(P===null||n)&&O.begin(j,P);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(t),t=rt.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,P),C=Ge.get(e,E.length),C.init(t),C.state.textureUnits=R.getTextureUnits(),E.push(C),Oe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Te.setFromProjectionMatrix(Oe,ct,t.reversedDepth),De=this.localClippingEnabled,Ee=Ke.init(this.clippingPlanes,De),b=We.get(e,w.length),b.init(),w.push(b),rt.enabled===!0&&rt.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&bt(e,t,-1/0,j.sortObjects)}bt(e,t,0,j.sortObjects),b.finish(),N!==null&&N.updateLights(C.state.lightsArray),j.sortObjects===!0&&b.sort(be,xe),Me=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Me&&Je.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&Ke.beginShadows();let i=C.state.shadowsArray;if(qe.render(i,e,t),Ee===!0&&Ke.endShadows(),(r&&O.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(C.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];St(n,r,e,a)}Me&&Je.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];xt(b,e,n,n.viewport)}}else r.length>0&&St(n,r,e,t),Me&&Je.render(e),xt(b,e,t)}P!==null&&oe===0&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),r&&O.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),$e.resetDefaultState(),ue=-1,de=null,E.pop(),E.length>0?(C=E[E.length-1],R.setTextureUnits(C.state.textureUnits),Ee===!0&&Ke.setGlobalState(j.clippingPlanes,C.state.camera)):C=null,w.pop(),b=w.length>0?w[w.length-1]:null,N!==null&&N.renderEnd()};function bt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)C.pushLightProbeGrid(e);else if(e.isLight)C.pushLight(e),e.castShadow&&C.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Te)){r&&Ae.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);let i=Ve.update(e),a=e.material;a.visible&&b.push(e,i,a,n,Ae.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Te))){let i=Ve.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ae.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ae.copy(e.boundingSphere.center)),Ae.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,Ae.z,s,t)}}else a.visible&&b.push(e,i,a,n,Ae.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)bt(i[e],t,n,r)}function xt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;C.setupLightsView(n),Ee===!0&&Ke.setGlobalState(j.clippingPlanes,n),r&&I.viewport(fe.copy(r)),i.length>0&&Ct(i,t,n),a.length>0&&Ct(a,t,n),o.length>0&&Ct(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function St(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[r.id]===void 0){let e=Fe.has(`EXT_color_buffer_half_float`)||Fe.has(`EXT_color_buffer_float`);C.state.transmissionRenderTarget[r.id]=new un(1,1,{generateMipmaps:!0,type:e?k:S,minFilter:x,samples:Math.max(4,Ie.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:q.workingColorSpace})}let a=C.state.transmissionRenderTarget[r.id],o=r.viewport||fe;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),l=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(he),ge=j.getClearAlpha(),ge<1&&j.setClearColor(16777215,.5),j.clear(),Me&&Je.render(n);let u=j.toneMapping;j.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),C.setupLightsView(r),Ee===!0&&Ke.setGlobalState(j.clippingPlanes,r),Ct(e,n,r),R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a),Fe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,wt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a))}j.setRenderTarget(s,c,l),j.setClearColor(he,ge),d!==void 0&&(r.viewport=d),j.toneMapping=u}function Ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&wt(o,t,n,s,l,c)}}function wt(e,t,n,r,i,a){N!==null&&i.isNodeMaterial&&N.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function V(e,t,n){t.isScene!==!0&&(t=je);let r=L.get(e),i=C.state.lights,a=C.state.shadowsArray,o=i.state.version,s=He.getParameters(e,i.state,a,t,n,C.state.lightProbeGridArray),c=He.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Re.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,st),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=He.getUniforms(e),N!==null&&e.isNodeMaterial&&N.build(e,n,s),e.onBeforeCompile(s,j),d=He.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ke.uniform),Et(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=C.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=bc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Dt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=je),R.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=P===null?j.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:q.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Re.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),y=C.state.lights;if(Ee===!0&&(De===!0||e!==de)){let t=e===de&&r.id===ue;Ke.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ke.numPlanes||v.numIntersection!==Ke.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=C.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=V(r,t,i),N&&r.isNodeMaterial&&N.onUpdateProgram(r,x,v));let S=!1,w=!1,T=!1,E=x.getUniforms(),D=v.uniforms;if(I.useProgram(x.program)&&(S=!0,w=!0,T=!0),r.id!==ue&&(ue=r.id,w=!0),v.needsLights){let e=Dt(C.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(S||de!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(F,`projectionMatrix`,e.projectionMatrix),E.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(F,ke.setFromMatrixPosition(e.matrixWorld)),Ie.logarithmicDepthBuffer&&E.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),de!==e&&(de=e,w=!0,T=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&E.setValue(F,`sunShadowMap`,y.state.sunShadowMap,R),y.state.directionalShadowMap.length>0&&E.setValue(F,`directionalShadowMap`,y.state.directionalShadowMap,R),y.state.spotShadowMap.length>0&&E.setValue(F,`spotShadowMap`,y.state.spotShadowMap,R),y.state.pointShadowMap.length>0&&E.setValue(F,`pointShadowMap`,y.state.pointShadowMap,R)),i.isSkinnedMesh){E.setOptional(F,i,`bindMatrix`),E.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(F,`boneTexture`,e.boneTexture,R))}i.isBatchedMesh&&(E.setOptional(F,i,`batchingTexture`),E.setValue(F,`batchingTexture`,i._matricesTexture,R),E.setOptional(F,i,`batchingIdTexture`),E.setValue(F,`batchingIdTexture`,i._indirectTexture,R),E.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(F,`batchingColorTexture`,i._colorsTexture,R));let O=n.morphAttributes;if((O.position!==void 0||O.normal!==void 0||O.color!==void 0)&&Ye.update(i,n,x),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,E.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(D.envMapIntensity.value=t.environmentIntensity),D.dfgLUT!==void 0&&(D.dfgLUT.value=Vl()),w){if(E.setValue(F,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&kt(D,T),a&&r.fog===!0&&Ue.refreshFogUniforms(D,a),Ue.refreshMaterialUniforms(D,r,ye,ve,C.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;D.probesSH.value=e.texture,D.probesMin.value.copy(e.boundingBox.min),D.probesMax.value.copy(e.boundingBox.max),D.probesResolution.value.copy(e.resolution)}bc.upload(F,Tt(v),D,R)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(bc.upload(F,Tt(v),D,R),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(F,`center`,i.center),E.setValue(F,`modelViewMatrix`,i.modelViewMatrix),E.setValue(F,`normalMatrix`,i.normalMatrix),E.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];et.update(n,x),et.bind(n,x)}}return x}function kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){P=e,ae=t,oe=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest,I.viewport(fe),I.scissor(pe),I.setScissorTest(me),ue=-1;return}if(o.__webglFramebuffer===void 0)R.setupRenderTarget(e);else if(o.__hasExternalTextures)R.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);R.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&R.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest}else fe.copy(Se).multiplyScalar(ye).floor(),pe.copy(Ce).multiplyScalar(ye).floor(),me=we;if(n!==0&&(r=ne),I.bindFramebuffer(F.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(fe),I.scissor(pe),I.setScissorTest(me),i){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ue=-1};function jt(e){let t=L.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ie.textureFormatReadable(e.format),t.__typeReadable=Ie.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,Qe.convert(c),Qe.convert(l),a)}finally{let e=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,Qe.convert(l),Qe.convert(u),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let p=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,p);let m=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await _t(F,m,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(f),F.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;R.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Qe.convert(t.format),_=Qe.convert(t.type),v;t.isData3DTexture?(R.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(R.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(R.setTexture2D(t,0),v=F.TEXTURE_2D),I.activeTexture(F.TEXTURE0),I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(F.UNPACK_ROW_LENGTH),b=I.getParameter(F.UNPACK_IMAGE_HEIGHT),x=I.getParameter(F.UNPACK_SKIP_PIXELS),S=I.getParameter(F.UNPACK_SKIP_ROWS),C=I.getParameter(F.UNPACK_SKIP_IMAGES);I.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(F.UNPACK_SKIP_PIXELS,l),I.pixelStorei(F.UNPACK_SKIP_ROWS,u),I.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,o,s,f,p,o,s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,re),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,ie);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,o,s,f,p,o,s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(F.UNPACK_ROW_LENGTH,y),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(F.UNPACK_SKIP_PIXELS,x),I.pixelStorei(F.UNPACK_SKIP_ROWS,S),I.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&R.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?R.setTextureCube(e,0):e.isData3DTexture?R.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?R.setTexture2DArray(e,0):R.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){ae=0,oe=0,P=null,I.reset(),$e.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ct}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=q._getDrawingBufferColorSpace(e),t.unpackColorSpace=q._getUnpackColorSpace()}};function Ul(e,t){let{corePath:n,warnings:r,...i}=e;return{...t,...i,warnings:[...t.warnings??[],...r??[]]}}var Wl=new WeakMap;function Gl(e){let t=e.toLowerCase();if(t===`head_optional`||t===`accessory`)return`head_optional`;if(t===`body`||t===`head`||t===`hair`)return t;throw Error(`Unsupported runtime part type: ${e}`)}function Kl(e){let t=Gl(e.partType);return(t===`head`||t===`head_optional`)&&Jl(e.headCostume3dAssetbundleType)?`head`:t===`head`&&Yl(e.headCostume3dAssetbundleType)?`head_optional`:t}function ql(e){try{return Kl(e)}catch{return null}}function Jl(e){return(e??``).trim().toLowerCase()===`head_and_hair`}function Yl(e){let t=(e??``).trim().toLowerCase();return t===`head_only`||t===`head_all`||t===`head_front`||t===`head_back`}function Q(e,t){return`${e}:${xu(t)}`}function Xl(e){let t=e.roles.find(t=>ru(e,t.characterId,t.unit??null,`body`,t.bodyCostume3dId)&&iu(e,t.characterId,t.unit??null,t.headCostume3dId)&&ru(e,t.characterId,t.unit??null,`hair`,t.hairCostume3dId));if(t){let n=t.bodyCostume3dId,r=t.headCostume3dId,i=t.hairCostume3dId;return{characterId:t.characterId,unit:t.unit??null,bodyCostume3dId:n,headCostume3dId:r,headPackagePath:mu(e,t.characterId,t.unit??null,r),hairCostume3dId:i,headOptionalCostume3dId:null}}let n=tu(e,`body`);if(!n)return null;let r=nu(e,n.characterId,n.unit??null);if(!r)return null;let{head:i,hair:a}=r;return{characterId:n.characterId,unit:n.unit??i.unit??a.unit??null,bodyCostume3dId:n.costume3dId,headCostume3dId:i.costume3dId,headPackagePath:i.packagePath,hairCostume3dId:a.costume3dId,headOptionalCostume3dId:null}}function Zl(e,t,n,r={}){return e.registry.filter(e=>e.characterId===t).filter(e=>r.unit===void 0||Su(e.unit,r.unit)).filter(e=>ql(e)===n).filter(hu).filter(t=>!r.loadedOnly||gu(t)||e.packages.has(t.packagePath)).sort((e,t)=>e.costume3dId-t.costume3dId)}function Ql(e){let{partSet:t,selection:n,activeRoleId:r,resolveUrl:i}=e,a=Q(n.characterId,n.unit);if(r!==null&&a!==r)throw Error(`Custom switching is limited to role ${r}. Reload/select another role before switching to ${a}.`);let o=au(t,n.characterId,n.unit,`body`,n.bodyCostume3dId),s=au(t,n.characterId,n.unit,`hair`,n.hairCostume3dId),c=ou(t,n),l={...n,headPackagePath:c.packagePath},u=su(t,l,c),d=u&&Kl(u.part)===`head`?u:s,f=Kl(c)===`head`?eu(t,n):null,p=f?t.packages.get(f.packagePath)??null:null,m=u&&Kl(u.part)===`head_optional`?u:null,h=cu(t,n);fu(o,`body`),d&&fu(d,`head`),_u(n.characterId,n.unit,[o,d,m,h].filter(Boolean)),vu(t.compatibility,l,Kl(c));let g=[o,d,m,h].filter(Boolean),_=ju(c),v=Mu(g,_),y=t.roleRuntimes.get(a)??null,b=t.roles.find(e=>Q(e.characterId,e.unit)===a),x=$l(t,b,o),S=Cu(o,i);S.characterHeightMeters=x,wu(S,y);let C=Tu(Mu([d,m,h].filter(Boolean),_),l,i,p);C.characterHeightMeters=x;let w=Fu(v,S,C,y);return{id:`custom-${[t.baseUrl,t.masterVersion??`unknown-master`,a,`requested:${n.bodyCostume3dId}:${n.headCostume3dId}:${n.hairCostume3dId}:${n.headOptionalCostume3dId??`none`}`,`body:${o.packagePath??`unknown`}`,`head:${c.packagePath}`,`hair:${s.packagePath??`unknown`}`,`accessory:${h?.packagePath??m?.packagePath??`none`}`,`motion:${y?.motionPackage?.sourcePath??`none`}`].map(encodeURIComponent).join(`-`)}`,displayName:`Custom ${a}`,meshUrl:``,unityRuntimeJsonUrl:`haruki-composed://role-${a}/unity-runtime.msgpack.br`,unityRuntimeJsonPath:`viewer-composed-part-runtime`,bodyAsset:S,headAsset:C,skinColors:b?.skinColors,runtimeExtension:w}}function $l(e,t,n){if(!t){let e=(Yd(n.manifest)?n.manifest:null)?.characterHeightMeters;if(typeof e==`number`&&Number.isFinite(e)&&e>0)return e;throw Error(`Runtime role catalog entry is missing.`)}if(typeof t.characterHeightMeters==`number`&&Number.isFinite(t.characterHeightMeters)&&t.characterHeightMeters>0)return t.characterHeightMeters;let r=pu(e,t.characterId,t.unit,`body`,t.bodyCostume3dId),i=r?e.packages.get(r.packagePath):null,a=(Yd(i?.manifest)?i.manifest:null)?.characterHeightMeters;if(typeof a==`number`&&Number.isFinite(a)&&a>0)return a;throw Error(`Runtime role ${Q(t.characterId,t.unit)} is missing master characterHeightMeters.`)}function eu(e,t){let n=e.roles.find(e=>e.characterId===t.characterId&&Su(e.unit,t.unit));return n?e.registry.find(e=>e.characterId===n.characterId&&Su(e.unit,n.unit)&&e.costume3dId===n.hairCostume3dId&&ql(e)===`hair`&&hu(e))??null:null}function tu(e,t,n,r){return e.registry.find(i=>ql(i)===t&&(n===void 0||i.characterId===n)&&(r===void 0||Su(i.unit,r))&&i.status!==`missing`&&e.packages.has(i.packagePath))}function nu(e,t,n){let r=[...Zl(e,t,`head`,{unit:n,loadedOnly:!1}),...Zl(e,t,`head_optional`,{unit:n,loadedOnly:!1})],i=[...Zl(e,t,`head`,{unit:n,loadedOnly:!0}),...Zl(e,t,`head_optional`,{unit:n,loadedOnly:!0}).filter(e=>!gu(e))],a=new Map;for(let e of r){let t=a.get(e.costume3dId)??new Set;t.add(`${Kl(e)}|${e.packagePath}`),a.set(e.costume3dId,t)}let o=i.filter(e=>a.get(e.costume3dId)?.size===1).sort((e,t)=>e.costume3dId-t.costume3dId||e.packagePath.localeCompare(t.packagePath)),s=Zl(e,t,`hair`,{unit:n,loadedOnly:!0});for(let r of o)for(let i of s){let a={characterId:t,unit:n,bodyCostume3dId:0,headCostume3dId:r.costume3dId,hairCostume3dId:i.costume3dId,headOptionalCostume3dId:null};try{return vu(e.compatibility,a,Kl(r)),{head:r,hair:i}}catch{}}return null}function ru(e,t,n,r,i){let a=pu(e,t,n,r,i);return!!(a&&(gu(a)||e.packages.has(a.packagePath)))}function iu(e,t,n,r){return ru(e,t,n,`head`,r)||ru(e,t,n,`head_optional`,r)}function au(e,t,n,r,i){let a=pu(e,t,n,r,i);if(!a)throw Error(`Missing ${r} registry entry for role ${Q(t,n)}, costume3dId ${i}.`);if(!e.packages.has(a.packagePath))throw Error(`Missing loaded ${r} package for role ${Q(t,n)}, ${uu(a)}.`);return du(e.packages.get(a.packagePath),a)}function ou(e,t){let n=t.headPackagePath?.trim()||null,r=e.registry.filter(e=>e.characterId===t.characterId&&Su(e.unit,t.unit)&&e.costume3dId===t.headCostume3dId&&[`head`,`head_optional`].includes(ql(e)??``)&&hu(e)&&(n===null||e.packagePath===n)).sort((e,t)=>{let n=e.packagePath.localeCompare(t.packagePath);return n===0?Kl(e).localeCompare(Kl(t)):n});if(r.length===0){let e=n?`, packagePath ${n}`:``;throw Error(`Missing head registry entry for role ${Q(t.characterId,t.unit)}, costume3dId ${t.headCostume3dId}${e}.`)}if(new Set(r.map(e=>`${Kl(e)}|${e.packagePath}`)).size>1){let e=r.map(e=>`${Kl(e)}:${e.packagePath}`).join(`, `);throw Error(`Ambiguous head registry entry for role ${Q(t.characterId,t.unit)}, costume3dId ${t.headCostume3dId}; specify headPackagePath. Candidates: ${e}.`)}return r[0]}function su(e,t,n=ou(e,t)){if(gu(n))return null;if(!e.packages.has(n.packagePath))throw Error(`Missing loaded head package for role ${Q(t.characterId,t.unit)}, ${uu(n)}.`);return du(e.packages.get(n.packagePath),n)}function cu(e,t){let n=lu(e,t);if(!n||gu(n))return null;if(!e.packages.has(n.packagePath))throw Error(`Missing loaded head_optional package for role ${Q(t.characterId,t.unit)}, ${uu(n)}.`);return du(e.packages.get(n.packagePath),n)}function lu(e,t){if(!t.headOptionalCostume3dId)return null;let n=e.registry.filter(e=>e.characterId===t.characterId&&Su(e.unit,t.unit)&&e.costume3dId===t.headOptionalCostume3dId&&ql(e)===`head_optional`&&hu(e)).sort((e,t)=>e.packagePath.localeCompare(t.packagePath));if(n.length===0)throw Error(`Missing head_optional registry entry for role ${Q(t.characterId,t.unit)}, costume3dId ${t.headOptionalCostume3dId}.`);let r=new Set(n.map(e=>e.packagePath));if(r.size>1)throw Error(`Ambiguous head_optional registry entry for role ${Q(t.characterId,t.unit)}, costume3dId ${t.headOptionalCostume3dId}; the legacy selector cannot identify one original source. Candidates: ${[...r].join(`, `)}.`);return n[0]}function uu(e){let t=[`costume3dId ${e.costume3dId}`,`partType ${Kl(e)}`,`packagePath ${e.packagePath}`];e.bundlePath&&t.push(`bundlePath ${e.bundlePath}`),e.colorVariationBundlePath&&t.push(`colorVariationBundlePath ${e.colorVariationBundlePath}`);let n=e.warnings?.[0];return n&&t.push(`warning ${n}`),t.join(`, `)}function du(e,t){let n=ql(t)??e.part.partType,r=Yd(e.manifest)?Jd(e.manifest):e.manifest;if(Yd(r)&&(r.id=`${n}-${t.characterId}-${t.costume3dId}-${t.unit??`default`}`,r.displayName=t.name??Pu(r.displayName)??r.id,r.characterId=String(t.characterId).padStart(2,`0`),typeof r.characterHeightMeters!=`number`||r.characterHeightMeters<=0))throw Error(`Part runtime ${t.packagePath} is missing characterHeightMeters.`);return{...e,packagePath:t.packagePath,part:{...e.part,costume3dId:t.costume3dId,partType:n,characterId:t.characterId,unit:t.unit,name:t.name??e.part.name,colorId:typeof t.colorId==`number`?t.colorId:e.part.colorId,colorName:t.colorName??e.part.colorName,costume3dGroupId:typeof t.costume3dGroupId==`number`?t.costume3dGroupId:e.part.costume3dGroupId,modelAssetbundleName:t.modelAssetbundleName??e.part.modelAssetbundleName,headCostume3dAssetbundleType:t.headCostume3dAssetbundleType??e.part.headCostume3dAssetbundleType},manifest:r,mount:{...e.mount??{},packagePath:t.packagePath,expectedSkeletonId:String(t.characterId).padStart(2,`0`)}}}function fu(e,t){let n=Yd(e.manifest)?e.manifest:{};if(!Yd(n.proxy??n.Proxy))throw Error(`Part runtime package '${e.packagePath??e.part.costume3dId}' is missing manifest.proxy material metadata for ${t}; regenerate it with a current Haruki-3D-Exporter before capture.`)}function pu(e,t,n,r,i){return e.registry.find(e=>e.characterId===t&&Su(e.unit,n)&&e.costume3dId===i&&ql(e)===r&&hu(e))}function mu(e,t,n,r){let i=new Set(e.registry.filter(e=>e.characterId===t&&Su(e.unit,n)&&e.costume3dId===r&&[`head`,`head_optional`].includes(ql(e)??``)&&hu(e)).map(e=>e.packagePath));return i.size===1?[...i][0]:null}function hu(e){return e.status!==`missing`}function gu(e){return e.status===`empty`&&ql(e)===`head_optional`}function _u(e,t,n){let r=n.find(n=>n.part.characterId!==e||!Su(n.part.unit,t));if(r)throw Error(`Part ${r.part.partType}/${r.part.costume3dId} belongs to role ${Q(r.part.characterId,r.part.unit)}, not ${Q(e,t)}.`)}function vu(e,t,n){if(!e||n===`head`)return;let r=bu(t.unit,t.headCostume3dId,t.hairCostume3dId);if(yu(e).has(r))throw Error(`Head ${t.headCostume3dId} and hair ${t.hairCostume3dId} are not available together.`)}function yu(e){if(!e)return new Set;let t=Wl.get(e);if(t)return t;let n=new Set([...e.denied??[],...(e.rules??[]).filter(e=>e.state===`not_available`)].map(e=>bu(e.unit,e.headCostume3dId,e.hairCostume3dId)));return Wl.set(e,n),n}function bu(e,t,n){return`${xu(e)}|${t}|${n}`}function xu(e){return e??``}function Su(e,t){return xu(e)===xu(t)}function Cu(e,t){let n=Jd(e.manifest);if(n.id||=`body-${e.part.costume3dId}`,n.displayName||=e.part.name??n.id,n.characterId=String(e.part.characterId).padStart(2,`0`),typeof n.characterHeightMeters!=`number`||n.characterHeightMeters<=0)throw Error(`Body part runtime ${e.packagePath} is missing characterHeightMeters.`);n.materialPipeline??=`embedded`,n.source||={bundleRoot:``,manifestUrl:``,meshUrl:``},n.neckAnchor=Au(n.neckAnchor,{x:0,y:1.75,z:.15}),n.skeleton||={},n.skeleton.neckAttach||={fallbackPosition:{x:0,y:1.75,z:.15}},n.skeleton.neckAttach.fallbackPosition=Au(n.skeleton.neckAttach.fallbackPosition,{x:0,y:1.75,z:.15}),n.proxy||={},n.proxy={bodyColor:n.proxy.bodyColor??`#f2d0c3`,shadowColor:n.proxy.shadowColor??`#bf958a`,bodyScale:n.proxy.bodyScale??1,torsoLength:n.proxy.torsoLength??2.2,shoulderWidth:n.proxy.shoulderWidth??1.1},n.bodyMaterials||=[];let r=Eu(e,t);return n.source={...n.source,meshUrl:qd(n.source?.meshUrl,r),skeletonUrl:Kd(n.source?.skeletonUrl,r),animationUrls:n.source?.animationUrls?.map(e=>qd(e,r))},n.bodyMaterials=Wd(n.bodyMaterials,[e],t),n}function wu(e,t){let n=t?.motionPackage?.unityMotionJson;n&&(e.source={...e.source,animationUrls:[n]})}function Tu(e,t,n,r){let i=e.find(e=>Kl(e.part)===`head`)??e[0],a=Jd(i.manifest);if(a.id=`head-${t.headCostume3dId}-source-${encodeURIComponent(t.headPackagePath??`auto`)}-hair-${t.hairCostume3dId}`,a.displayName=`Head ${t.headCostume3dId} / Hair ${t.hairCostume3dId}`,a.characterId=String(t.characterId).padStart(2,`0`),typeof a.characterHeightMeters!=`number`||a.characterHeightMeters<=0)throw Error(`Head part runtime ${i.packagePath} is missing characterHeightMeters.`);a.materialPipeline??=`embedded`,a.source||={bundleRoot:``,manifestUrl:``,meshUrl:``},a.rawImportOffset=Au(a.rawImportOffset,{x:0,y:0,z:0}),a.assembly||={},a.assembly.attachOrigin||={fallbackPosition:{x:0,y:1.75,z:.15}},a.assembly.attachOrigin.fallbackPosition=Au(a.assembly.attachOrigin.fallbackPosition,{x:0,y:1.75,z:.15}),a.proxy||={},a.proxy={faceColor:a.proxy.faceColor??`#fde2d9`,faceShadeColor:a.proxy.faceShadeColor??`#f7cdbf`,skinColorDefault:a.proxy.skinColorDefault??a.proxy.faceColor??`#fde2d9`,skinColor1:a.proxy.skinColor1??a.proxy.faceShadeColor??`#f7cdbf`,skinColor2:a.proxy.skinColor2??a.proxy.faceShadeColor??`#f7cdbf`,hairColor:a.proxy.hairColor??`#7b5b4a`,hairShadowColor:a.proxy.hairShadowColor??`#513d33`,headRadius:a.proxy.headRadius??.74,faceDepth:a.proxy.faceDepth??.82,hairArc:a.proxy.hairArc??.98},a.faceMaterials||=[];let o=Eu(i,n);return a.source={...a.source,meshUrl:qd(a.source?.meshUrl,o),skeletonUrl:Kd(a.source?.skeletonUrl,o),animationUrls:a.source?.animationUrls?.map(e=>qd(e,o))},a.faceMaterials=Ud(Wd(a.faceMaterials,e,n),r,n),a.morphChannelBindings=e.flatMap(e=>Array.isArray(e.morphChannelBindings)?e.morphChannelBindings:[]),a}function Eu(e,t){let n=Pu(e.packagePath)||Pu(e.mount?.packagePath)||``;return e=>t(Du(n,e))}function Du(e,t){if(!t||/^[a-z][a-z0-9+.-]*:/i.test(t)||t.startsWith(`/`))return t;let n=Ou(e);return!n||t.startsWith(`${n}/`)?t:`${n}/${ku(t)}`}function Ou(e){let t=e.length;for(;t>0&&e[t-1]===`/`;)--t;return e.slice(0,t)}function ku(e){let t=0;for(;t<e.length&&e[t]===`/`;)t+=1;return e.slice(t)}function Au(e,t){return{x:typeof e?.x==`number`?e.x:t.x,y:typeof e?.y==`number`?e.y:t.y,z:typeof e?.z==`number`?e.z:t.z}}function ju(e){return Kl(e)===`head_optional`?{kind:`resolved_head_optional_source`,activePartTypes:new Set([`body`,`hair`,`head_optional`])}:{kind:`resolved_complete_head_source`,activePartTypes:new Set([`body`,`head`,`head_optional`])}}function Mu(e,t){return e.filter(e=>Nu(e,t))}function Nu(e,t){return t.activePartTypes.has(Kl(e.part))}function Pu(e){return typeof e==`string`?e:``}function Fu(e,t,n,r){let i=Lu(e);return{version:`0414`,sourceKind:`viewer_composed_part_runtime_package`,bodyAsset:t,headAsset:n,bodyManifest:t,headManifest:n,materialSlots:{body:t.bodyMaterials,head:n.faceMaterials,accessory:[]},textureRoles:e.flatMap(e=>e.textureRoles??[]),characterTextures:Object.assign({},...e.map(e=>e.characterTextures??{})),characterControllers:Iu(e),nativeMeshes:Pd(e,i),motionPackage:r?.motionPackage??null,morphChannelBindings:n.morphChannelBindings??[],pjskSpringBone:{raw:i.raw,runtimeUnitySetup:i},warnings:[...i.warnings??[],...r?.warnings??[]]}}function Iu(e){return e.find(e=>{let t=Kl(e.part);return t===`head`||t===`hair`})?.characterControllers??{}}function Lu(e){let t=e.map((e,t)=>Qu(e,t)),n=t[0]?.setup??{},r=t.map(e=>e.prefabGraph).filter(e=>e!==null),i=e.flatMap(e=>[...e.warnings??[],...e.springBone?.warnings??[]]),a=ef(t.flatMap(e=>e.activeRoots)),o=t.flatMap(e=>e.managers),s=t.flatMap(e=>e.bones),c=t.flatMap(e=>e.extraBones),l=t.flatMap(e=>e.colliders),u=t.flatMap(e=>e.constraints),d=bd(t),f=Ru(i,d),p=Td(t,d),m=wd(s,d),h=qu(r);if(!h)throw Error(`Composed parts do not provide the official model_combine_setup body/head paths.`);let g={...n,version:`0414`,prefabGraphs:r,bodyHeadAssembly:h,rootSelectionProfile:{policy:`viewer_composed_active_parts`,rootCandidates:[]},setupPlan:{discoveryMode:`viewer_composed_part_runtime_package`,rootPolicy:`active_custom_parts; manager ownership is rebuilt from composed hierarchy`,orderedSteps:[`load active part packages`,`merge part native meshes`,`merge active part springbone records`,`rebuild SpringManager ownership from composed hierarchy`,`repair constraints after composition`,`rebind colliderFlag springs to current body colliders`,`reset spring runtime`],directBindingCount:d.filter(e=>e.sourceKind===`direct`).length,colliderFlagBindingCount:d.filter(e=>e.sourceKind===`colliderFlag`).length},activeRootProfile:{defaultBodyRoot:a[0]??`body`,activeRoots:a.length?a:[`body`,`face`],inactiveRoots:[]},funit:Gu(e),raw:Ku(t),managers:o,bones:s,extraBones:c,colliders:l,colliderBindings:d,bindingDecisions:m,constraintSetup:{version:`0414`,sourceKind:`viewer_composed_part_runtime_package`,constraints:u,warnings:ef(t.flatMap(e=>Zd(e.setup.constraintSetup?.warnings)))},managerColliderCaches:p,warnings:f};return zu(t,g,Id(e)),g}function Ru(e,t){let n=t.filter(e=>e.sourceKind===`colliderFlag`);return n.length>0&&n.every(e=>$d(e.colliders).length>0)?e.filter(e=>!/has colliderFlag .* but no body colliders matched runtime CL_\* prefixes/.test(e)):e}function zu(e,t,n){for(let r of e.filter(e=>e.partType===`head_optional`)){let i=r.prefabGraph,a=Hd(Pu(r.runtime.mount?.attachNode)),o=a?Bu(e,a):null,s=(i?.transforms??[]).find(e=>e.parentPathId==null&&Pu(e.transformPath)===`optional`);if(!i||!o||!s||typeof o.pathId!=`number`||typeof s.pathId!=`number`){t.warnings?.push(`Head optional prefab '${Pu(r.runtime.part.modelAssetbundleName)||`<unknown>`}' was not instantiated: official prefab root 'optional' or active attach node '${a||`<missing>`}' was not found.`);continue}let c=(i.monoBehaviours??[]).find(e=>Pu(e.scriptName)===`CharacterAccessoryTransformController`&&Hu(Pu(e.transformPath),`optional`));if(c){let e=Pu(c.transformPath),a=(i.transforms??[]).find(t=>Pu(t.transformPath)===e);a?(Uu(a,Rd(r.runtime,n)),i.headOptionalControllerPath=e):t.warnings?.push(`Head optional controller target '${e||`<missing>`}' was not found in prefab 'optional'.`)}else s.localPosition={X:0,Y:0,Z:0},s.localRotation={x:0,y:0,z:0,w:1};Vu(i,`optional`),s.parentPathId=o.pathId,o.childPathIds=[...new Set([...o.childPathIds??[],s.pathId])],i.headOptionalAttachPath=Pu(o.transformPath),i.headOptionalPrefabRootPath=`optional`}}function Bu(e,t){for(let n of e){if(n.partType===`head_optional`||!n.prefabGraph)continue;let e=n.prefabGraph.transforms??[],r=new Map(e.filter(e=>typeof e.pathId==`number`).map(e=>[e.pathId,e])),i=new Map(Qd(n.prefabGraph.gameObjects).map(e=>[Vd(e.pathId,NaN),e.activeSelf!==!1&&e.activeInHierarchy!==!1])),a=e=>typeof e.gameObjectPathId!=`number`||i.get(e.gameObjectPathId)!==!1,o=e=>{if(!a(e))return null;if(Pu(e.name)===t||Hd(Pu(e.transformPath))===t)return e;for(let t of e.childPathIds??[]){let e=r.get(t),n=e?o(e):null;if(n)return n}return null};for(let t of n.activeRoots){let n=e.find(e=>e.parentPathId==null&&Pu(e.transformPath)===t),r=n?o(n):null;if(r)return r}}return null}function Vu(e,t){let n=e=>Hu(Pu(e.transformPath),t);e.transforms=(e.transforms??[]).filter(n),e.gameObjects=Qd(e.gameObjects).filter(n),e.renderers=Qd(e.renderers).filter(n),e.animators=Qd(e.animators).filter(n),e.monoBehaviours=(e.monoBehaviours??[]).filter(n),e.constraints=Qd(e.constraints).filter(n),e.rootTransformPathIds=e.transforms.filter(e=>Pu(e.transformPath)===t).map(e=>e.pathId).filter(e=>typeof e==`number`)}function Hu(e,t){return e===t||e.startsWith(`${t}/`)}function Uu(e,t){let n=Bd(t?.position,0,0,0),r=Bd(t?.rotationEulerDegrees,0,0,0),i=Bd(t?.scale,1,1,1);e.localPosition={X:n.x,Y:n.y,Z:n.z},e.localRotation=Wu(r),e.localScale={X:Math.abs(i.x),Y:Math.abs(i.y),Z:Math.abs(i.z)}}function Wu(e){let t=e.x*Math.PI/180,n=e.y*Math.PI/180,r=e.z*Math.PI/180,i=Math.cos(t/2),a=Math.cos(n/2),o=Math.cos(r/2),s=Math.sin(t/2),c=Math.sin(n/2),l=Math.sin(r/2);return{x:s*a*o-i*c*l,y:i*c*o+s*a*l,z:i*a*l+s*c*o,w:i*a*o-s*c*l}}function Gu(e){let t=e.map(e=>Xd(e.springBone?.funit)).filter(e=>Object.keys(e).length>0),n=(e,t)=>typeof e[t]==`number`&&Number.isFinite(e[t])?Math.max(Math.trunc(e[t]),0):0,r=ef(t.flatMap(e=>Zd(e.detectedScripts))).sort((e,t)=>e.localeCompare(t));return{present:t.some(e=>e.present===!0),scriptCount:t.reduce((e,t)=>e+n(t,`scriptCount`),0),springManagerCount:t.reduce((e,t)=>e+n(t,`springManagerCount`),0),springBoneCount:t.reduce((e,t)=>e+n(t,`springBoneCount`),0),sphereColliderCount:t.reduce((e,t)=>e+n(t,`sphereColliderCount`),0),capsuleColliderCount:t.reduce((e,t)=>e+n(t,`capsuleColliderCount`),0),panelColliderCount:t.reduce((e,t)=>e+n(t,`panelColliderCount`),0),detectedScripts:r,policy:`metadata_only; do not merge with UTJ/Sekai SpringBone runtime`}}function Ku(e){let t=e.filter(e=>e.partType===`body`).flatMap(e=>e.extraBones),n=e.filter(e=>e.partType===`head`||e.partType===`hair`||e.partType===`head_optional`).flatMap(e=>e.extraBones);return{body:{extraBones:t},head:{extraBones:n}}}function qu(e){let t=Ju(e),n=Yu(e);return!t||!Xu(e,`face`)||!n?null:{version:`0414`,sourceKind:`viewer_composed_part_runtime_package`,parentRootPath:`body`,parentAttachPath:t,childRootPath:`face`,childOriginPath:n,parentingMode:`model_combine_setup`,coordinateSpace:`unity-left-handed`,faceRendererName:`Face`,combineNodeAName:`Neck`,combineNodeBName:`Head`,childMoveSuffix:`_target`,parentCombineNodeAPath:t,parentCombineNodeBPath:`${t}/Head`,childCombineNodeAPath:n,childCombineNodeBPath:`${n}/Head`}}function Ju(e){return[`body/Position/PositionOffset/Hip/Waist/Spine/Chest/Neck`,`body/Position/Hip/Waist/Spine/Chest/Neck`].find(t=>Xu(e,t))??null}function Yu(e){return[`face/Position/Hip/Waist/Spine/Chest/Neck`,`face/Position`].find(t=>Xu(e,t))??null}function Xu(e,t){return e.some(e=>Qd(e?.transforms).some(e=>Pu(e.transformPath)===t))}function Zu(e){let t=e.springBone??{};return{managers:t.managers,bones:t.bones,extraBones:t.extraBones,colliders:t.colliders,colliderBindings:t.colliderBindings,managerColliderCaches:t.managerColliderCaches,activeRootProfile:t.activeRootProfile,funit:t.funit,bindingDecisions:t.bindingDecisions,constraintSetup:t.constraintSetup}}function Qu(e,t){let n=Zu(e),r=Kl(e.part),i=$u(r,Zd(n.activeRootProfile?.activeRoots)),a=ed(ld(n.managers,t,r),i),o=ed(ld(n.bones,t,r),i),s=ed(td(n.extraBones,t,r),i),c=ed(ld(n.colliders,t,r),i),l=rd(ld(n.colliderBindings,t,r),o),u=id(ld(n.managerColliderCaches,t,r),a),d=ad(n.constraintSetup,t,r,i);return sd(a,o,u),{runtime:e,partIndex:t,partType:r,setup:n,prefabGraph:od(e.springBone?.prefabGraph,t),managers:a,bones:o,extraBones:s,colliders:c,colliderBindings:l,managerColliderCaches:u,constraints:d,activeRoots:i}}function $u(e,t){return e===`body`&&t.includes(`body`)?[`body`]:(e===`head`||e===`hair`)&&t.includes(`face`)?[`face`]:e===`head_optional`&&t.includes(`optional`)?[`optional`]:t.length?[t[0]]:[e===`body`?`body`:`face`]}function ed(e,t){let n=new Set(t.map(e=>Md(e)));return e.filter(e=>{let t=Md(Nd(e.nodePath)??e.poseRoot);return n.has(t)})}function td(e,t,n){return ld(e,t,n).map(e=>{let n=e,r=nd(n.gameObject??n.GameObject,t),i=nd(n.referenceBone??n.ReferenceBone,t);return n.gameObject=r,n.GameObject=r,n.referenceBone=i,n.ReferenceBone=i,n.nodePath=r?.transformPath??r?.TransformPath??null,n.poseRoot=Nd(n.nodePath)??null,n})}function nd(e,t){if(!Yd(e))return e;let n={...e};return typeof n.pathId==`number`&&(n.pathId=hd(n.pathId,t)),typeof n.PathId==`number`&&(n.PathId=hd(n.PathId,t)),n}function rd(e,t){let n=new Set(t.map(e=>e.pathId).filter(e=>typeof e==`number`));return e.filter(e=>typeof e.sourceSpringBonePathId!=`number`||n.has(e.sourceSpringBonePathId))}function id(e,t){let n=new Set(t.map(e=>e.pathId).filter(e=>typeof e==`number`));return e.filter(e=>typeof e.managerPathId!=`number`||n.has(e.managerPathId))}function ad(e,t,n,r){let i=new Set(r.map(e=>Md(e)));return ld(e?.constraints,t,n).map(e=>{let n=Qd(e.sources).map(e=>{let n={...e};return typeof n.sourcePathId==`number`&&(n.sourcePathId=hd(n.sourcePathId,t)),n});return typeof e.worldUpObjectPathId==`number`&&(e.worldUpObjectPathId=hd(e.worldUpObjectPathId,t)),{...e,sources:n}}).filter(e=>{let t=Md(Nd(e.ownerPath));return!t||i.has(t)})}function od(e,t){if(!Yd(e))return null;let n={...e};return n.runtimePartIndex=t,n.transforms=Qd(e.transforms).map(e=>{let n={...e,runtimePartIndex:t};return typeof n.pathId==`number`&&(n.pathId=hd(n.pathId,t)),typeof n.PathId==`number`&&(n.PathId=hd(n.PathId,t)),typeof n.parentPathId==`number`&&(n.parentPathId=hd(n.parentPathId,t)),Array.isArray(n.childPathIds)&&(n.childPathIds=n.childPathIds.map(e=>typeof e==`number`?hd(e,t):e)),n}),n.monoBehaviours=Qd(e.monoBehaviours).map(e=>{let n={...e,runtimePartIndex:t};return typeof n.pathId==`number`&&(n.pathId=hd(n.pathId,t)),n}),n}function sd(e,t,n){let r=new Map;for(let n of e){let e=n.nodePath,i=t.filter(t=>cd(t.nodePath,e)).map(e=>e.pathId).filter(e=>typeof e==`number`);i.length&&(n.bonePathIds=i,typeof n.pathId==`number`&&r.set(n.pathId,i))}for(let e of n){let t=typeof e.managerPathId==`number`?r.get(e.managerPathId):void 0;t?.length&&(e.springBonePathIds=t)}}function cd(e,t){return!e||!t?!1:e===t||e.startsWith(`${t}/`)}function ld(e,t,n){return Array.isArray(e)?e.map(e=>{if(!Yd(e))return e;let r={...e};return r.runtimePartIndex=t,r.runtimePartType=n,fd(r,t),pd(r,t),Array.isArray(r.forceProviders)&&(r.forceProviders=md(r.forceProviders,t)),Yd(r.collidersByRoot)&&(r.collidersByRoot=gd(r.collidersByRoot,t)),Yd(r.candidateRoots)&&(r.candidateRoots=gd(r.candidateRoots,t)),r}):[]}var ud=[`pathId`,`index`,`managerPathId`,`pivotSourcePathId`,`sourceSpringBonePathId`],dd=[`bonePathIds`,`directColliderPathIds`,`sourceColliderPathIds`,`colliders`,`selectedColliderIndexes`,`sphereColliderIndexes`,`capsuleColliderIndexes`,`panelColliderIndexes`,`springBonePathIds`];function fd(e,t){for(let n of ud)typeof e[n]==`number`&&(e[n]=hd(e[n],t))}function pd(e,t){for(let n of dd){let r=e[n];Array.isArray(r)&&(e[n]=r.map(e=>typeof e==`number`?hd(e,t):e))}}function md(e,t){return e.map(e=>{if(!Yd(e))return e;let n={...e,runtimePartIndex:t};return typeof n.sourcePathId==`number`&&(n.sourcePathId=hd(n.sourcePathId,t)),typeof n.springManagerPathId==`number`&&(n.springManagerPathId=hd(n.springManagerPathId,t)),n})}function hd(e,t){return(t+1)*1e9+e}function gd(e,t){return Object.fromEntries(Object.entries(e).map(([e,n])=>[e,Array.isArray(n)?n.map(e=>typeof e==`number`?hd(e,t):e).filter(e=>typeof e==`number`):[]]))}var _d=[[1,`CL_Hip`],[2,`CL_Chest`],[4,`CL_Left_Arm`],[8,`CL_Right_Arm`],[16,`CL_Left_Elbow`],[32,`CL_Right_Elbow`]];function vd(e){return _d.filter(([t])=>(e&t)!==0).map(([,e])=>e)}function yd(e){return e.flatMap(e=>e.partType===`body`?[]:e.bones.filter(t=>(t.colliderFlag??0)===0||typeof t.pathId!=`number`?!1:!e.colliderBindings.some(e=>e.sourceSpringBonePathId===t.pathId&&(e.sourceKind===`deferred_body_colliderFlag`||e.sourceKind===`colliderFlag`))).map(t=>({sourceKind:`deferred_body_colliderFlag`,partKind:t.partKind??e.partType,sourceSpringBonePathId:t.pathId,colliderFlag:t.colliderFlag,matchedPrefixes:vd(t.colliderFlag??0),collidersByRoot:{},defaultRoot:`body`,sourceColliderPathIds:[],colliders:[],rebindReason:`viewer_synthesized_missing_colliderFlag_binding`})))}function bd(e){let t=e.filter(e=>e.partType===`body`).flatMap(e=>e.colliders),n=Od(t);return yd(e).map(e=>xd(e,t)).concat(e.flatMap(e=>e.colliderBindings.map(r=>{if(r.sourceKind===`deferred_body_colliderFlag`&&e.partType!==`body`)return xd(r,t);if(r.sourceKind!==`colliderFlag`||e.partType===`body`||!kd(n))return r;let i=Ad(n);return{...r,collidersByRoot:n,defaultRoot:i.root,colliders:i.indexes,sourceColliderPathIds:i.indexes.map(e=>t.find(t=>t.index===e)?.pathId).filter(e=>typeof e==`number`),rebindReason:`viewer_composed_current_body_colliders`}})))}function xd(e,t){let n=Sd(e,t);return{...e,sourceKind:`colliderFlag`,originalSourceKind:`deferred_body_colliderFlag`,collidersByRoot:n.byRoot,defaultRoot:n.defaultRoot,colliders:n.indexes,sourceColliderPathIds:n.indexes.map(e=>t.find(t=>t.index===e)?.pathId).filter(e=>typeof e==`number`),rebindReason:`viewer_composed_deferred_body_colliderFlag`}}function Sd(e,t){let n=Zd(e.matchedPrefixes),r=Od(t.filter(e=>typeof e.index==`number`&&Cd(e,n))),i=kd(r)?Ad(r).root:Md(e.defaultRoot??`body`);return{byRoot:r,defaultRoot:i,indexes:r[i]??[]}}function Cd(e,t){if(!t.length)return!1;let n=Pu(e.nodeName);return t.some(e=>n.startsWith(e))}function wd(e,t){let n=new Map(e.filter(e=>typeof e.pathId==`number`).map(e=>[e.pathId,e]));return t.filter(e=>typeof e.sourceSpringBonePathId==`number`).map(e=>{let t=n.get(e.sourceSpringBonePathId),r=kd(e.collidersByRoot)?e.collidersByRoot:{[e.defaultRoot??t?.poseRoot??`unknown`]:e.colliders??[]};return{sourceKind:e.sourceKind??`direct`,partKind:e.partKind??t?.partKind??`Unknown`,sourceSpringBonePathId:e.sourceSpringBonePathId,nodePath:t?.nodePath??null,poseRoot:t?.poseRoot??null,colliderFlag:typeof e.colliderFlag==`number`?e.colliderFlag:null,directColliderPathIds:e.sourceKind===`direct`?e.sourceColliderPathIds??[]:[],candidateRoots:r,defaultRoot:e.defaultRoot??null,selectedColliderIndexes:e.colliders??[],reason:e.sourceKind===`colliderFlag`?`viewer custom composer rebound colliderFlag candidates to current body colliders`:`direct serialized collider references`}})}function Td(e,t){let n=new Map(e.flatMap(e=>e.colliders).filter(e=>typeof e.index==`number`).map(e=>[e.index,e]));return e.flatMap(e=>e.managerColliderCaches.map(r=>e.partType===`head`||e.partType===`hair`?Ed(r,t,n):Dd(r,n)))}function Ed(e,t,n){let r=new Set($d(e.springBonePathIds)),i=tf(t.filter(e=>typeof e.sourceSpringBonePathId==`number`&&r.has(e.sourceSpringBonePathId)&&e.sourceKind===`colliderFlag`).flatMap(e=>$d(e.colliders)).filter(e=>n.has(e)));return i.length?{...e,sphereColliderIndexes:i.filter(e=>Pu(n.get(e)?.scriptName).includes(`Sphere`)),capsuleColliderIndexes:i.filter(e=>Pu(n.get(e)?.scriptName).includes(`Capsule`)),panelColliderIndexes:i.filter(e=>Pu(n.get(e)?.scriptName).includes(`Panel`)),reason:`viewer_composed_head_body_collider_cache`}:Dd(e,n)}function Dd(e,t){return{...e,sphereColliderIndexes:$d(e.sphereColliderIndexes).filter(e=>t.has(e)),capsuleColliderIndexes:$d(e.capsuleColliderIndexes).filter(e=>t.has(e)),panelColliderIndexes:$d(e.panelColliderIndexes).filter(e=>t.has(e)),reason:`viewer_composed_active_parts_manager_cache`}}function Od(e){let t=new Map;for(let n of e){if(typeof n.index!=`number`)continue;let e=Md(Nd(n.nodePath)??n.poseRoot??`body`),r=t.get(e)??[];r.push(n.index),t.set(e,r)}return Object.fromEntries([...t.entries()].map(([e,t])=>[e,[...new Set(t)].sort((e,t)=>e-t)]))}function kd(e){return!!(e&&Object.values(e).some(e=>e.length>0))}function Ad(e){let[t,n]=Object.entries(e).sort(([e],[t])=>jd(e)-jd(t)||e.localeCompare(t))[0];return{root:t,indexes:n}}function jd(e){return e===`body`?0:e===`sit_body`?1:e===`guitar_body`?2:10}function Md(e){return(e??``).trim()||`body`}function Nd(e){return e?.split(`/`).find(Boolean)??null}function Pd(e,t){let n=[...t.warnings??[]],r=[];for(let[i,a]of e.entries()){let e=Kl(a.part);for(let o of Qd(a.nativeMeshes?.meshes)){let a=Fd(o,i);if(e!==`head_optional`){r.push(a);continue}let s=Pu(a.rendererTransformPath),c=Qd(t.prefabGraphs).find(e=>Vd(e.runtimePartIndex,-1)===i&&!!Pu(e.headOptionalAttachPath)),l=Pu(c?.headOptionalPrefabRootPath);if(!c||!l){n.push(`Head optional mesh '${Pu(o.meshPath)||Pu(o.meshName)||`<unnamed>`}' was skipped because the official prefab could not be mounted.`);continue}(s===l||s.startsWith(`${l}/`))&&r.push({...a,sourceRendererTransformPath:s,rendererTransformPath:s})}}return{version:`0414`,meshes:r,warnings:n}}function Fd(e,t){let n={...e};for(let e of[`rendererPathId`,`rendererTransformPathId`,`rootBonePathId`])typeof n[e]==`number`&&(n[e]=hd(n[e],t));return Array.isArray(n.bonePathIds)&&(n.bonePathIds=n.bonePathIds.map(e=>typeof e==`number`?hd(e,t):e)),n}function Id(e){let t=[...e.filter(e=>Kl(e.part)===`head`),...e.filter(e=>Kl(e.part)===`hair`),...e.filter(e=>Kl(e.part)!==`head_optional`)];for(let e of t){let t=Ld(Pu(e.source?.bundlePath));if(t)return t;let n=Ld(Pu(e.part.modelAssetbundleName));if(n)return n}return null}function Ld(e){let t=e.replace(/\\/g,`/`).replace(/\.bundle$/i,``).match(/(?:^|\/)face\/([^/]+)\/([^/]+)$/i);return t?`${t[1]}/${t[2]}`:null}function Rd(e,t){if(!t)return null;let n=zd(e)[t];return Yd(n)?n:null}function zd(e){return Xd(e.mount?.accessoryTransformAdjustments)}function Bd(e,t,n,r){let i=Xd(e);return{x:Vd(i.x??i.X,t),y:Vd(i.y??i.Y,n),z:Vd(i.z??i.Z,r)}}function Vd(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function Hd(e){return(e?.replace(/\\/g,`/`).split(`/`).filter(Boolean).pop()??``)||null}function Ud(e,t,n){if(!t)return e;let r=Wd([],[t],n),i=new Map(r.filter(e=>e.materialKind===`eye`||e.materialKind===`eyelight`).map(e=>[e.materialKind,e]));return e.map(e=>{if(e.mainTex||e.materialKind!==`eye`&&e.materialKind!==`eyelight`)return e;let t=i.get(e.materialKind);return t?.mainTex?{...e,mainTex:t.mainTex}:e})}function Wd(e,t,n){let r=t.flatMap(e=>{let t=Eu(e,n);return(e.materialSlots??[]).map(e=>Gd(e,t))});if(r.length)return r;let i=t[0]?Eu(t[0],n):n;return[...e??[]].map(e=>Gd(e,i))}function Gd(e,t){return{...e,mainTex:Kd(e.mainTex??void 0,t)??e.mainTex,shadowTex:Kd(e.shadowTex??void 0,t)??e.shadowTex,valueTex:Kd(e.valueTex??void 0,t)??e.valueTex,faceShadowTex:Kd(e.faceShadowTex??void 0,t)??e.faceShadowTex,rawMaterial:e.rawMaterial?{...e.rawMaterial,textureProperties:e.rawMaterial.textureProperties.map(e=>({...e,uri:Kd(e.uri??void 0,t)??e.uri}))}:e.rawMaterial}}function Kd(e,t){return e&&t(e)}function qd(e,t){return e?t(e):``}function Jd(e){return JSON.parse(JSON.stringify(e))}function Yd(e){return!(!e||typeof e!=`object`||Array.isArray(e))}function Xd(e){return Yd(e)?e:{}}function Zd(e){return Array.isArray(e)?e.filter(e=>typeof e==`string`):[]}function Qd(e){return Array.isArray(e)?e.filter(e=>Yd(e)):[]}function $d(e){return Array.isArray(e)?e.filter(e=>typeof e==`number`):[]}function ef(e){return[...new Set(e)]}function tf(e){return[...new Set(e)].sort((e,t)=>e-t)}var nf=class{options;partSet=null;selection=null;activeRoleId=null;combined=null;constructor(e){this.options=e}loadPartPackageSet(e,t={}){this.partSet=e;let n=t.composeDefault??!0;return this.selection=n?Xl(e):null,this.activeRoleId=this.selection?Q(this.selection.characterId,this.selection.unit):null,this.combined=this.selection?this.compose(this.selection):null,this.combined}clear(){this.partSet=null,this.selection=null,this.activeRoleId=null,this.combined=null}getPartPackageSet(){return this.partSet}getCustomSelection(){return this.selection?{...this.selection}:null}getActiveCharacterId(){return this.selection?.characterId??null}getActiveRoleId(){return this.activeRoleId}selectRole(e,t){if(!this.partSet)throw Error(`No custom part package set is loaded.`);this.activeRoleId=Q(e,t),this.selection&&Q(this.selection.characterId,this.selection.unit)!==this.activeRoleId&&(this.selection=null,this.combined=null)}getCombinedCharacter(){return this.combined}listCustomParts(e,t,n={}){return this.partSet?Zl(this.partSet,e,t,n):[]}async setCustomSelection(e,t=()=>!0){if(!this.partSet)throw Error(`No custom part package set is loaded.`);let n=this.resolveHeadSource(e);if(this.assertSameActiveCharacter(n),await this.ensureSelectionPackages(n),await this.options.ensureCompatibility?.(n),!t())throw rf();this.activeRoleId??=Q(n.characterId,n.unit);let r=this.compose(n);return this.selection={...n},this.combined=r,r}updateCustomSelection(e,t){if(!this.selection)throw Error(`No custom selection is active.`);let n={...this.selection,bodyCostume3dId:e===`body`&&t!==null?t:this.selection.bodyCostume3dId,headCostume3dId:e===`head`&&t!==null?t:this.selection.headCostume3dId,headPackagePath:e===`head`&&t!==null?null:this.selection.headPackagePath,hairCostume3dId:e===`hair`&&t!==null?t:this.selection.hairCostume3dId,headOptionalCostume3dId:e===`head_optional`?t:this.selection.headOptionalCostume3dId};return this.setCustomSelection(n)}async composeCustomCharacter(e){let t=this.resolveHeadSource(e);return this.assertSameActiveCharacter(t),await this.ensureSelectionPackages(t),await this.options.ensureCompatibility?.(t),this.compose(t)}resolveHeadSource(e){if(!this.partSet)throw Error(`No custom part package set is loaded.`);let t=ou(this.partSet,e);return{...e,headPackagePath:t.packagePath}}assertSameActiveCharacter(e){let t=Q(e.characterId,e.unit);if(this.activeRoleId!==null&&t!==this.activeRoleId)throw Error(`Custom switching is limited to active role ${this.activeRoleId}. Select/reload role ${t} before switching parts.`)}async ensureSelectionPackages(e){if(!this.partSet||!this.options.loadPartRuntime)return;let t=ou(this.partSet,e),n=this.partSet.roles.find(t=>Q(t.characterId,t.unit)===Q(e.characterId,e.unit)),r=[this.findRegistryEntry(e,`body`,e.bodyCostume3dId),n?this.findRegistryEntry(e,`body`,n.bodyCostume3dId):null,t,this.findRegistryEntry(e,`hair`,e.hairCostume3dId),lu(this.partSet,e),ql(t)===`head`?eu(this.partSet,e):null].filter(e=>e!==null&&e.status!==`empty`);await Promise.all(r.map(async e=>{if(!this.partSet.packages.has(e.packagePath)&&!await this.options.loadPartRuntime(e))throw Error(`Failed to load ${e.partType} package ${e.packagePath}.`)}))}findRegistryEntry(e,t,n){if(!this.partSet)throw Error(`No custom part package set is loaded.`);let r=Zl(this.partSet,e.characterId,t,{unit:e.unit,loadedOnly:!1}).find(e=>e.costume3dId===n);if(!r)throw Error(`No ${t} registry entry for role ${Q(e.characterId,e.unit)}, costume3dId ${n}.`);return r}compose(e){if(!this.partSet)throw Error(`No custom part package set is loaded.`);return Ql({partSet:this.partSet,selection:e,activeRoleId:this.activeRoleId??Q(e.characterId,e.unit),resolveUrl:this.options.resolveUrl})}};function rf(){let e=Error(`Custom part selection was superseded by a newer request.`);return e.name=`AbortError`,e}var af=new URL(`brotli_wasm_bg-NfWIZley.wasm`,import.meta.url).href,of=`modulepreload`,sf=function(e,t){return new URL(e,t).href},cf={},lf=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=sf(t,n),t=s(t),t in cf)return;cf[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:of,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},uf=65536,df=3e4,ff=null,pf=1,mf=new Map,hf=null;async function gf(e){if(e.byteLength<uf||typeof Worker>`u`)return _f(e);let t=vf();if(!t)return _f(e);let n=pf++;return new Promise((r,i)=>{mf.set(n,{resolve:r,reject:i}),mf.size===1&&yf(),t.postMessage({id:n,bytes:e,wasmUrl:af},[e])})}async function _f(e){let{decodeRuntimeMessagePackBrotliDirect:t}=await lf(async()=>{let{decodeRuntimeMessagePackBrotliDirect:e}=await import(`./runtimeMessagePackDecodeCore-C88ErUk0.js`);return{decodeRuntimeMessagePackBrotliDirect:e}},[],import.meta.url);return t(e,af)}function vf(){if(ff)return ff;try{return ff=new Worker(new URL(new URL(`runtimeDecodeWorker-CzrbnFzp.js`,import.meta.url).href,``+import.meta.url),{type:`module`,name:`haruki-runtime-decoder`}),ff.onmessage=({data:e})=>{let t=mf.get(e.id);t&&(mf.delete(e.id),mf.size===0?bf():yf(),e.error?t.reject(Error(e.error)):t.resolve(e.value))},ff.onerror=()=>xf(`Runtime decode worker failed.`),ff}catch{return ff=null,null}}function yf(){hf!==null&&clearTimeout(hf),hf=setTimeout(()=>{hf=null,xf(`Runtime decode worker made no progress within ${df} ms; rejecting ${mf.size} pending decode(s).`)},df)}function bf(){hf!==null&&(clearTimeout(hf),hf=null)}function xf(e){bf(),ff?.terminate(),ff=null;for(let t of mf.values())t.reject(Error(e));mf.clear()}var Sf=new Map,Cf=16,wf=new Map;async function Tf(e,t){let n=new Map,r=await Of(e,t),i=new nf({resolveUrl:t=>Ef(e,t),loadPartRuntime:async t=>Nf(r,t,e),ensureCompatibility:async t=>If(r,t.unit,e)}),a=i.loadPartPackageSet(r,{composeDefault:!t.deferDefaultSelection});if(!a&&!t.deferDefaultSelection)throw Error(`Part registry package did not expose a default custom selection from ${e}.`);return{kind:`part-registry`,combinedCharacter:a,previewLight:null,faceMotion:null,displayNameByUrl:n,partSet:r,wardrobe:i}}function Ef(e,t){let n=new URL(e,window.location.href);n.pathname.endsWith(`/`)||(n.pathname=`${n.pathname}/`);let r=t.replace(/\\/g,`/`).replace(/^\/+/,``).split(`/`).filter(e=>e.length>0);if(r.length===0||r.some(e=>e===`.`||e===`..`))throw Error(`Invalid runtime package relative path: ${t}`);let i=r.map(e=>encodeURIComponent(e)).join(`/`);return new URL(i,n).toString()}function Df(e,t){if(!t)return e;let n=new URL(e,window.location.href);return n.searchParams.set(`masterVersion`,t),n.toString()}async function Of(e,t){let n=Lf(t.roleId),r=`parts/by-role/${n.characterId}/${Vf(n.unit)}`,i=await Uf(Ef(e,`${r}/runtime-role-catalog.msgpack.br`)),a=Rf(i,n.characterId,n.unit),o=Kf(await Uf(Df(Ef(e,`${r}/part-registry.msgpack.br`),i.masterVersion))),s=new Map;if(t.deferDefaultSelection)return{registry:o,roles:a,masterVersion:i.masterVersion,compatibility:null,packages:s,roleRuntimes:new Map,baseUrl:e};let c=Zf(o,a,null);for(let t=0;t<Math.min(c.length,720);t+=24){let n=c.slice(t,t+24),r=await Promise.all(n.map(async t=>({entry:t,runtime:await Ff(e,t)})));for(let e of r)e.runtime&&s.set(e.entry.packagePath,Hf(e.runtime,e.entry));if(ep(o,a,null,s,e))break}if(!ep(o,a,null,s,e))throw Error(`Part registry package did not expose a compatible loaded body/head/hair selection from ${e}.`);let l=Xl({registry:o,roles:a,compatibility:null,packages:s,roleRuntimes:new Map,baseUrl:e}),u=l?new Set([Q(l.characterId,l.unit)]):null,d=await Af(e,a,i.masterVersion,u);return{registry:o,roles:a,masterVersion:i.masterVersion,compatibility:null,packages:s,roleRuntimes:d,baseUrl:e}}async function kf(e,t,n){let r=Q(t,n),i=e.roleRuntimes.get(r);if(i)return i;let a=e.roles.find(e=>e.roleRuntimePath&&e.characterId===t&&Q(e.characterId,e.unit??null)===r);if(!a?.roleRuntimePath)throw Error(`Runtime role catalog has no package for ${r}.`);let o=await Uf(Df(Ef(e.baseUrl,a.roleRuntimePath),e.masterVersion)),s=jf(e.baseUrl,a.roleRuntimePath,o,e.masterVersion),c=s.role?.characterId,l=s.role?.unit??null;if(c!==t||Q(c,l)!==r)throw Error(`Runtime role package identity differs from requested role ${r}.`);return e.roleRuntimes.set(Q(c,l),s),s}async function Af(e,t,n,r=null){let i=new Map,a=t.filter(e=>e.roleRuntimePath&&(!r||r.has(Q(e.characterId,e.unit??null)))),o=await Promise.all(a.map(async t=>({entry:t,runtime:await Uf(Df(Ef(e,t.roleRuntimePath),n))})));for(let t of o){let r=t.runtime.role?.characterId??t.entry.characterId,a=t.runtime.role?.unit??t.entry.unit??null,o=jf(e,t.entry.roleRuntimePath,t.runtime,n);i.set(Q(r,a),o)}return i}function jf(e,t,n,r){let i=n.motionPackage,a=i?.unityMotionJson;if(!a)return n;let o=/^[a-z][a-z0-9+.-]*:/i.test(a)||a.startsWith(`/`)?new URL(a,window.location.href).toString():Ef(e,Mf(t,a));return{...n,motionPackage:{...i,unityMotionJson:Df(o,r)}}}function Mf(e,t){let n=e.replace(/\\/g,`/`).split(`/`).slice(0,-1).join(`/`);return n?`${n}/${t.replace(/^\/+/,``)}`:t}async function Nf(e,t,n=e.baseUrl){let r=e.packages.get(t.packagePath);if(r)return r;let i=Hf(await Pf(n,t),t);return e.packages.set(t.packagePath,i),i}async function Pf(e,t){let n=await Uf(Ef(e,`${t.packagePath}/part-runtime.msgpack.br`));if(!n.corePath?.endsWith(`.msgpack.br`))throw Error(`Part runtime must reference a .msgpack.br shared core: ${t.packagePath}.`);return Ul(n,await Uf(Ef(e,n.corePath)))}async function Ff(e,t){let n=Ef(e,`${t.packagePath}/part-runtime.msgpack.br`);try{return await Pf(e,t)}catch(e){if(e instanceof Error&&`status`in e&&e.status===404&&`url`in e&&e.url===n)return null;throw e}}async function If(e,t,n=e.baseUrl){e.compatibility||=await Uf(Df(Ef(n,`parts/compat/by-unit/${Vf(t)}/head-hair-compatibility.msgpack.br`),e.masterVersion))}function Lf(e){if(!e)throw Error(`Runtime role id is required.`);let[t,...n]=e.split(`:`),r=Number(t);if(!Number.isInteger(r)||r<=0)throw Error(`Invalid runtime role id: ${e}`);return{characterId:r,unit:n.join(`:`)||null}}function Rf(e,t,n){let r=(e?.version===2||e?.version===3||e?.version===4)&&typeof e.masterVersion==`string`&&e.masterVersion.length>0&&Array.isArray(e.roles)?e.roles:[];if(r.length!==1)throw Error(`Runtime role catalog must contain exactly one scoped role for ${Q(t,n)}.`);let i=r[0],a=Bf(i.roleId),o=a?`roles/${a.characterId}/${Vf(a.unit)}/role-runtime.msgpack.br`:``;if(!a||i.characterId!==t||Q(i.characterId,i.unit)!==Q(t,n)||i.characterId!==a.characterId||Q(i.characterId,i.unit)!==Q(a.characterId,a.unit)||!Number.isInteger(i.roleId)||i.roleId<1||i.roleId>31||!Number.isInteger(i.bodyCostume3dId)||i.bodyCostume3dId<=0||!Number.isInteger(i.headCostume3dId)||i.headCostume3dId<=0||!Number.isInteger(i.hairCostume3dId)||i.hairCostume3dId<=0||e.version>=3&&!zf(i.skinColors)||e.version>=4&&(typeof i.characterHeightMeters!=`number`||!Number.isFinite(i.characterHeightMeters)||i.characterHeightMeters<=0)||i.roleRuntimePath!==o)throw Error(`Runtime role catalog is invalid for ${Q(t,n)}.`);return r}function zf(e){let t=e=>typeof e==`string`&&/^#[0-9a-f]{6}$/i.test(e);return!!(e&&t(e.default)&&t(e.shadow1)&&t(e.shadow2))}function Bf(e){return!Number.isInteger(e)||e<1||e>31?null:e<=20?{characterId:e,unit:[`light_sound`,`idol`,`street`,`theme_park`,`school_refusal`][Math.floor((e-1)/4)]}:e<=26?{characterId:21,unit:[`piapro`,`idol`,`light_sound`,`street`,`theme_park`,`school_refusal`][e-21]}:{characterId:e-5,unit:`piapro`}}function Vf(e){return e||`default`}function Hf(e,t){return{...e,packagePath:t.packagePath,mount:{...e.mount??{},packagePath:t.packagePath}}}async function Uf(e){if(!/\.msgpack\.br(?:[?#]|$)/i.test(e))throw Error(`Runtime metadata must use .msgpack.br: ${e}`);let t=wf.get(e);if(t)return t;let n=(async()=>{let t=await fetch(e);if(!t.ok)throw Object.assign(Error(`Failed to load ${e}: HTTP ${t.status}`),{status:t.status,url:e});return Wf(t,e)})();wf.set(e,n);try{return await n}finally{wf.get(e)===n&&wf.delete(e)}}async function Wf(e,t){try{let n=e.headers.get(`x-haruki-file-version`),r=n&&Gf(t)?Sf.get(t):null;if(r?.version===n)return Sf.delete(t),Sf.set(t,r),await e.body?.cancel(),r.value;let i=await gf(await e.arrayBuffer());if(n&&Gf(t))for(Sf.delete(t),Sf.set(t,{version:n,value:i});Sf.size>Cf;)Sf.delete(Sf.keys().next().value);return i}catch(e){throw e instanceof Error?e:Error(`Failed to decode ${t}: ${String(e)}`)}}function Gf(e){let t=e.split(/[?#]/,1)[0]??e;return/\/parts\/by-role\/[^/]+\/[^/]+\/(?:part-registry|runtime-role-catalog)\.msgpack\.br$/.test(t)||/\/parts\/compat\/by-unit\/[^/]+\/head-hair-compatibility\.msgpack\.br$/.test(t)||/\/roles\/[^/]+\/[^/]+\/(?:role-runtime|motion\/unity-motion)\.msgpack\.br$/.test(t)}function Kf(e){let t=Array.isArray(e)?e:e.entries??e.parts??[];if(t.length===0)throw Error(`Runtime part registry is empty.`);let n=new Set;for(let[e,r]of t.entries()){let t=Kl(r),i=[r.characterId,r.unit??`default`,t,r.costume3dId,r.packagePath?.replace(/\/$/,``)].join(`
`);if(!Number.isInteger(r.characterId)||r.characterId<=0||!Number.isInteger(r.costume3dId)||r.costume3dId<0||typeof r.packagePath!=`string`||r.packagePath.length===0||r.packagePath.startsWith(`/`)||r.packagePath.includes(`\\`)||r.packagePath.replace(/\/$/,``).split(`/`).some(e=>e.length===0||e===`.`||e===`..`)||r.status!==void 0&&![`planned`,`ready`,`empty`,`missing`].includes(r.status)||n.has(i))throw Error(`Runtime part registry entry ${e} is invalid or duplicated.`);n.add(i)}return t}function qf(e,t,n,r,i){return e.find(e=>e.characterId===t&&e.costume3dId===r&&ql(e)===n&&(i===void 0||e.unit===i)&&Qf(e))}function Jf(e,t,n,r){let i=(t,n,r,i)=>qf(e,t,n,r,i);for(let e of t)e.characterId===n&&(typeof e.bodyCostume3dId==`number`&&r(i(e.characterId,`body`,e.bodyCostume3dId,e.unit)),typeof e.headCostume3dId==`number`&&(r(i(e.characterId,`head`,e.headCostume3dId,e.unit)),r(i(e.characterId,`head_optional`,e.headCostume3dId,e.unit))),typeof e.hairCostume3dId==`number`&&r(i(e.characterId,`hair`,e.hairCostume3dId,e.unit)))}function Yf(e,t,n,r){let i=e.filter(e=>e.characterId===t&&[`head`,`head_optional`].includes(ql(e)??``)&&Qf(e)).sort((e,t)=>e.costume3dId-t.costume3dId),a=e.filter(e=>e.characterId===t&&ql(e)===`hair`&&Qf(e)).sort((e,t)=>e.costume3dId-t.costume3dId);for(let e of i)for(let t of a)ql(e)!==`head`&&n.has(bu(e.unit??t.unit,e.costume3dId,t.costume3dId))||(r(e),r(t))}function Xf(e,t){let n=new Set;for(let r of e)if(t===null||r.characterId===t)for(let e of[r.bodyCostume3dId,r.headCostume3dId,r.hairCostume3dId])typeof e==`number`&&n.add(e);return n}function Zf(e,t,n){let r=t.find(e=>typeof e.characterId==`number`)?.characterId??e.find($f)?.characterId??null,i=[],a=new Set,o=e=>{if(!e||!$f(e))return;let t=e.packagePath;a.has(t)||(a.add(t),i.push(e))},s=yu(n);r!==null&&(Jf(e,t,r,o),o(e.filter(e=>e.characterId===r&&ql(e)===`body`&&Qf(e)).sort((e,t)=>e.costume3dId-t.costume3dId)[0]),Yf(e,r,s,o));let c=Xf(t,r),l=e.filter($f).filter(e=>!a.has(e.packagePath)).map((e,t)=>({entry:e,index:t,score:(r!==null&&e.characterId===r?0:1e6)+(c.has(e.costume3dId)?0:1e4)+tp(e)+Math.min(e.costume3dId,9999)})).sort((e,t)=>e.score-t.score||e.index-t.index);return[...i,...l.map(e=>e.entry)]}function Qf(e){return e.status!==`missing`}function $f(e){return Qf(e)&&e.status!==`empty`}function ep(e,t,n,r,i){let a=new Set(e.filter(e=>r.has(e.packagePath)).map(e=>ql(e)).filter(Boolean));return!a.has(`body`)||!a.has(`head`)&&!a.has(`head_optional`)||!a.has(`hair`)?!1:!!Xl({registry:e,roles:t,compatibility:n,packages:r,roleRuntimes:new Map,baseUrl:i})}function tp(e){switch(ql(e)){case`body`:return 0;case`head`:return 100;case`hair`:return 200;case`head_optional`:return 300;default:return 1e3}}var np=`
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
`,rp=`
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

`;function $(e,t){return t instanceof Y?e.copy(t):typeof t==`number`?e.setHex(t,nt):e.setStyle(t,nt)}function ip(e){return $(new Y,e)}function ap(e,t){return e===void 0?new Y().setRGB(t.r,t.g,t.b):ip(e)}function op(e){return e?(e.updateMatrix(),e.matrix.clone()):new K}var sp=`
  vec3 sekaiGammaTexture(vec3 linearColor) {
    vec3 safeColor = max(linearColor, vec3(0.0));
    vec3 low = safeColor * 12.92;
    vec3 high = pow(safeColor, vec3(1.0 / 2.4)) * 1.055 - vec3(0.055);
    return mix(low, high, step(vec3(0.0031308), safeColor));
  }

  vec4 sekaiGammaTexture(vec4 linearColor) {
    return vec4(sekaiGammaTexture(linearColor.rgb), linearColor.a);
  }
`;function cp(e){return new $i({transparent:!1,depthWrite:!0,side:0,vertexColors:!0,uniforms:{uBaseColor:{value:ip(e.baseColor)},uShadowColor:{value:ip(e.shadowColor)},uSkinColorDefault:{value:ip(e.skinColorDefault??e.baseColor)},uSkinColor1:{value:ip(e.skinColor1??e.shadowColor)},uSkinColor2:{value:ip(e.skinColor2??e.skinColor1??e.shadowColor)},uPartsAmbientColor:{value:ip(e.partsAmbientColor??`#ffffff`)},uPartsAmbientAlpha:{value:e.partsAmbientAlpha??0},uReflectionBlendColor:{value:ip(e.reflectionBlendColor??`#ffffff`)},uGlobalShadowColor:{value:ip(e.globalShadowColor??`#ffffff`)},uGlobalShadowAlpha:{value:e.globalShadowAlpha??1},uControllerAmbientColor:{value:ap(e.controllerAmbientColor,s.ambientColor)},uControllerAmbientIntensity:{value:e.controllerAmbientIntensity??1},uControllerSpecularColor:{value:ip(e.controllerSpecularColor??`#ffffff`)},uControllerSpecularIntensity:{value:e.controllerSpecularIntensity??1},uControllerRimColor:{value:ap(e.controllerRimColor,s.rimColor)},uControllerShadowRimColor:{value:ap(e.controllerShadowRimColor,s.shadowRimColor)},uControllerRimColorWeight:{value:e.controllerRimColorWeight??1},uControllerShadowRimColorWeight:{value:e.controllerShadowRimColorWeight??1},uControllerRimRange:{value:e.controllerRimRange??s.rimRange},uControllerRimEdgeSmoothness:{value:e.controllerRimEdgeSmoothness??s.rimEdgeSmoothness},uControllerRimEmission:{value:e.controllerRimEmission??s.rimEmission},uControllerRimLightInfluence:{value:e.controllerRimLightInfluence??s.rimLightInfluence},uControllerRimShadowSharpness:{value:e.controllerRimShadowSharpness??s.rimShadowSharpness},uBodyDebugMode:{value:e.bodyDebugMode??0},uMainTex:{value:e.mainTex??null},uShadowTex:{value:e.shadowTex??null},uValueTex:{value:e.valueTex??null},uMainTexTransform:{value:op(e.mainTex)},uUseMainTex:{value:+!!e.mainTex},uUseShadowTex:{value:+!!e.shadowTex},uHasValueTex:{value:+!!e.valueTex},uUseValueTex:{value:e.useValueTex??!!e.valueTex?1:0},uLightDirection:{value:e.lightDirection.clone().normalize()},uCameraPosition:{value:new G},uLightIntensity:{value:e.lightIntensity},uAmbientIntensity:{value:e.ambientIntensity},uShadowThreshold:{value:e.shadowThreshold},uShadowWeight:{value:e.shadowWeight},uShadowWidth:{value:e.shadowWidth??0},uShadowFade:{value:e.shadowFade??0},uShadowWidthOverride:{value:e.shadowWidthOverride??-1},uValueShadowInfluence:{value:e.valueShadowInfluence??0},uCharacterAmbientIntensity:{value:e.characterAmbientIntensity??.3},uRimColorAlpha:{value:e.rimColorAlpha??s.rimColorAlpha},uRimDirection:{value:(e.rimDirection??new G(o.x,o.y,o.z)).clone().normalize()},uSpecularPower:{value:e.specularPower??0},uRimThreshold:{value:e.rimThreshold??.2},uShadowTexWeight:{value:e.shadowTexWeight??1},uFadeMode:{value:e.fadeMode??0},uHueSinAngle:{value:e.hueSinAngle??0},uHueCosAngle:{value:e.hueCosAngle??1},uHairShadowEnabled:{value:+!!e.hairShadowEnabled},uUseLambert:{value:e.useLambert===!1?0:1},uHeadPosition:{value:(e.headPosition??new G).clone()},uHeadNormalBlend:{value:e.headNormalBlend??.7},uSaturation:{value:e.saturation??.5},uValue:{value:e.value??.5},uContrast:{value:e.contrast??.5},uAlphaCutoff:{value:e.alphaCutoff??0}},vertexShader:`
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

      ${np}
      ${rp}
      ${sp}

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
    `})}function lp(e,t){up(e,t),dp(e,t),fp(e,t),pp(e,t),_p(e,t)}function up(e,t){$(e.uniforms.uBaseColor.value,t.baseColor),$(e.uniforms.uShadowColor.value,t.shadowColor),$(e.uniforms.uSkinColorDefault.value,t.skinColorDefault??t.baseColor),$(e.uniforms.uSkinColor1.value,t.skinColor1??t.shadowColor),$(e.uniforms.uSkinColor2.value,t.skinColor2??t.skinColor1??t.shadowColor),$(e.uniforms.uPartsAmbientColor.value,t.partsAmbientColor??`#ffffff`),e.uniforms.uPartsAmbientAlpha.value=t.partsAmbientAlpha??e.uniforms.uPartsAmbientAlpha.value,$(e.uniforms.uReflectionBlendColor.value,t.reflectionBlendColor??`#ffffff`),$(e.uniforms.uGlobalShadowColor.value,t.globalShadowColor??`#ffffff`),e.uniforms.uGlobalShadowAlpha.value=t.globalShadowAlpha??e.uniforms.uGlobalShadowAlpha.value}function dp(e,t){t.controllerAmbientColor!==void 0&&$(e.uniforms.uControllerAmbientColor.value,t.controllerAmbientColor),e.uniforms.uControllerAmbientIntensity.value=t.controllerAmbientIntensity??e.uniforms.uControllerAmbientIntensity.value,$(e.uniforms.uControllerSpecularColor.value,t.controllerSpecularColor??`#ffffff`),e.uniforms.uControllerSpecularIntensity.value=t.controllerSpecularIntensity??e.uniforms.uControllerSpecularIntensity.value,t.controllerRimColor!==void 0&&$(e.uniforms.uControllerRimColor.value,t.controllerRimColor),t.controllerShadowRimColor!==void 0&&$(e.uniforms.uControllerShadowRimColor.value,t.controllerShadowRimColor),e.uniforms.uControllerRimColorWeight.value=t.controllerRimColorWeight??e.uniforms.uControllerRimColorWeight.value,e.uniforms.uControllerShadowRimColorWeight.value=t.controllerShadowRimColorWeight??e.uniforms.uControllerShadowRimColorWeight.value,e.uniforms.uControllerRimRange.value=t.controllerRimRange??e.uniforms.uControllerRimRange.value,e.uniforms.uControllerRimEdgeSmoothness.value=t.controllerRimEdgeSmoothness??e.uniforms.uControllerRimEdgeSmoothness.value,e.uniforms.uControllerRimEmission.value=t.controllerRimEmission??e.uniforms.uControllerRimEmission.value,e.uniforms.uControllerRimLightInfluence.value=t.controllerRimLightInfluence??e.uniforms.uControllerRimLightInfluence.value,e.uniforms.uControllerRimShadowSharpness.value=t.controllerRimShadowSharpness??e.uniforms.uControllerRimShadowSharpness.value,t.bodyDebugMode!==void 0&&e.uniforms.uBodyDebugMode&&(e.uniforms.uBodyDebugMode.value=t.bodyDebugMode)}function fp(e,t){e.uniforms.uMainTex.value=t.mainTex??null,e.uniforms.uShadowTex.value=t.shadowTex??null,e.uniforms.uValueTex.value=t.valueTex??null,e.uniforms.uMainTexTransform.value=op(t.mainTex),e.uniforms.uUseMainTex.value=+!!t.mainTex,e.uniforms.uUseShadowTex.value=+!!t.shadowTex,e.uniforms.uHasValueTex.value=+!!t.valueTex,e.uniforms.uUseValueTex.value=t.useValueTex??!!t.valueTex?1:0,e.uniforms.uAlphaCutoff&&(e.uniforms.uAlphaCutoff.value=t.alphaCutoff??0)}function pp(e,t){e.uniforms.uLightDirection.value.copy(t.lightDirection.clone().normalize()),e.uniforms.uLightIntensity.value=t.lightIntensity,e.uniforms.uAmbientIntensity.value=t.ambientIntensity,e.uniforms.uShadowThreshold.value=t.shadowThreshold,e.uniforms.uShadowWeight.value=t.shadowWeight,e.uniforms.uShadowWidth.value=t.shadowWidth??e.uniforms.uShadowWidth.value,mp(e,t)}function mp(e,t){hp(e,t),gp(e,t)}function hp(e,t){t.shadowFade!==void 0&&e.uniforms.uShadowFade&&(e.uniforms.uShadowFade.value=t.shadowFade),t.shadowWidthOverride!==void 0&&e.uniforms.uShadowWidthOverride&&(e.uniforms.uShadowWidthOverride.value=t.shadowWidthOverride??-1),t.valueShadowInfluence!==void 0&&e.uniforms.uValueShadowInfluence&&(e.uniforms.uValueShadowInfluence.value=t.valueShadowInfluence)}function gp(e,t){t.hairShadowEnabled!==void 0&&e.uniforms.uHairShadowEnabled&&(e.uniforms.uHairShadowEnabled.value=+!!t.hairShadowEnabled),t.useLambert!==void 0&&e.uniforms.uUseLambert&&(e.uniforms.uUseLambert.value=+!!t.useLambert),t.headPosition&&e.uniforms.uHeadPosition&&e.uniforms.uHeadPosition.value.copy(t.headPosition),t.headNormalBlend!==void 0&&e.uniforms.uHeadNormalBlend&&(e.uniforms.uHeadNormalBlend.value=t.headNormalBlend)}function _p(e,t){e.uniforms.uCharacterAmbientIntensity.value=t.characterAmbientIntensity??.3,e.uniforms.uRimColorAlpha.value=t.rimColorAlpha??e.uniforms.uRimColorAlpha.value,e.uniforms.uRimDirection.value.copy((t.rimDirection??new G(o.x,o.y,o.z)).clone().normalize()),e.uniforms.uSpecularPower.value=t.specularPower??0,e.uniforms.uRimThreshold.value=t.rimThreshold??.2,e.uniforms.uShadowTexWeight.value=t.shadowTexWeight??1,e.uniforms.uFadeMode&&(e.uniforms.uFadeMode.value=t.fadeMode??e.uniforms.uFadeMode.value),e.uniforms.uHueSinAngle&&(e.uniforms.uHueSinAngle.value=t.hueSinAngle??e.uniforms.uHueSinAngle.value),e.uniforms.uHueCosAngle&&(e.uniforms.uHueCosAngle.value=t.hueCosAngle??e.uniforms.uHueCosAngle.value),e.uniforms.uSaturation.value=t.saturation??e.uniforms.uSaturation.value,e.uniforms.uValue&&(e.uniforms.uValue.value=t.value??e.uniforms.uValue.value),e.uniforms.uContrast&&(e.uniforms.uContrast.value=t.contrast??e.uniforms.uContrast.value)}function vp(e,t){e.uniforms.uCameraPosition.value.copy(t)}function yp(e){return new $i({defines:{USE_UV1:``},transparent:!1,depthWrite:!0,side:0,uniforms:{uBaseColor:{value:ip(e.baseColor)},uWarmColor:{value:ip(e.warmColor)},uSkinColorDefault:{value:ip(e.skinColorDefault??e.baseColor)},uSkinColor1:{value:ip(e.skinColor1??e.warmColor)},uSkinColor2:{value:ip(e.skinColor2??e.warmColor)},uMainTex:{value:e.mainTex??null},uShadowTex:{value:e.shadowTex??null},uValueTex:{value:e.valueTex??null},uFaceShadowTex:{value:e.faceShadowTex??null},uMainTexTransform:{value:op(e.mainTex)},uUseMainTex:{value:+!!e.mainTex},uUseShadowTex:{value:+!!e.shadowTex},uHasValueTex:{value:+!!e.valueTex},uUseValueTex:{value:e.useValueTex??!!e.valueTex?1:0},uUseFaceShadowTex:{value:+!!e.faceShadowTex},uLightDirection:{value:e.lightDirection.clone().normalize()},uCameraPosition:{value:new G},uHeadDotDirectionalLight:{value:(e.headDotDirectionalLight??new U(0,0)).clone()},uUseFaceShadowLimiter:{value:e.useFaceShadowLimiter===!1?0:1},uFaceShadowLimitRange:{value:e.faceShadowLimitRange??0},uLightIntensity:{value:e.lightIntensity},uAmbientIntensity:{value:e.ambientIntensity},uFaceDebugMode:{value:e.faceDebugMode??0},uFaceSdfEnabled:{value:e.faceSdfEnabled&&e.faceShadowTex?1:0},uShadowThreshold:{value:e.shadowThreshold??.5},uShadowWeight:{value:e.shadowWeight??1},uShadowWidth:{value:e.shadowWidth??0},uFadeMode:{value:e.fadeMode??0},uUseLambert:{value:e.useLambert===!1?0:1},uShadowTexWeight:{value:e.shadowTexWeight??1},uHueSinAngle:{value:e.hueSinAngle??0},uHueCosAngle:{value:e.hueCosAngle??1},uSaturation:{value:e.saturation??.5},uValue:{value:e.value??.5},uContrast:{value:e.contrast??.5},uPartsAmbientColor:{value:ip(e.partsAmbientColor??`#ffffff`)},uPartsAmbientAlpha:{value:e.partsAmbientAlpha??0},uControllerAmbientColor:{value:ap(e.controllerAmbientColor,s.ambientColor)},uControllerAmbientIntensity:{value:e.controllerAmbientIntensity??1},uControllerSpecularColor:{value:ap(e.controllerSpecularColor,s.specularColor)},uControllerSpecularIntensity:{value:e.controllerSpecularIntensity??1},uControllerRimColor:{value:ap(e.controllerRimColor,s.rimColor)},uControllerShadowRimColor:{value:ap(e.controllerShadowRimColor,s.shadowRimColor)},uControllerRimColorWeight:{value:e.controllerRimColorWeight??1},uControllerShadowRimColorWeight:{value:e.controllerShadowRimColorWeight??1},uControllerRimRange:{value:e.controllerRimRange??s.rimRange},uControllerRimEdgeSmoothness:{value:e.controllerRimEdgeSmoothness??s.rimEdgeSmoothness},uControllerRimEmission:{value:e.controllerRimEmission??s.rimEmission},uControllerRimLightInfluence:{value:e.controllerRimLightInfluence??s.rimLightInfluence},uControllerRimShadowSharpness:{value:e.controllerRimShadowSharpness??s.rimShadowSharpness},uRimColorAlpha:{value:e.rimColorAlpha??s.rimColorAlpha},uRimDirection:{value:(e.rimDirection??new G(o.x,o.y,o.z)).clone().normalize()},uSpecularPower:{value:e.specularPower??0},uRimThreshold:{value:e.rimThreshold??.2},uGlobalShadowColor:{value:ip(e.globalShadowColor??`#ffffff`)},uGlobalShadowAlpha:{value:e.globalShadowAlpha??1},uAlphaCutoff:{value:e.alphaCutoff??0}},vertexColors:!0,vertexShader:`
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

      ${np}
      ${rp}
      ${sp}

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
    `})}function bp(e,t){t.controllerAmbientColor!==void 0&&$(e.uniforms.uControllerAmbientColor.value,t.controllerAmbientColor),e.uniforms.uControllerAmbientIntensity.value=t.controllerAmbientIntensity??e.uniforms.uControllerAmbientIntensity.value,t.controllerSpecularColor!==void 0&&$(e.uniforms.uControllerSpecularColor.value,t.controllerSpecularColor),e.uniforms.uControllerSpecularIntensity.value=t.controllerSpecularIntensity??e.uniforms.uControllerSpecularIntensity.value,t.controllerRimColor!==void 0&&$(e.uniforms.uControllerRimColor.value,t.controllerRimColor),t.controllerShadowRimColor!==void 0&&$(e.uniforms.uControllerShadowRimColor.value,t.controllerShadowRimColor),e.uniforms.uControllerRimColorWeight.value=t.controllerRimColorWeight??e.uniforms.uControllerRimColorWeight.value,e.uniforms.uControllerShadowRimColorWeight.value=t.controllerShadowRimColorWeight??e.uniforms.uControllerShadowRimColorWeight.value,e.uniforms.uControllerRimRange.value=t.controllerRimRange??e.uniforms.uControllerRimRange.value,e.uniforms.uControllerRimEdgeSmoothness.value=t.controllerRimEdgeSmoothness??e.uniforms.uControllerRimEdgeSmoothness.value,e.uniforms.uControllerRimEmission.value=t.controllerRimEmission??e.uniforms.uControllerRimEmission.value,e.uniforms.uControllerRimLightInfluence.value=t.controllerRimLightInfluence??e.uniforms.uControllerRimLightInfluence.value,e.uniforms.uControllerRimShadowSharpness.value=t.controllerRimShadowSharpness??e.uniforms.uControllerRimShadowSharpness.value,e.uniforms.uRimColorAlpha.value=t.rimColorAlpha??e.uniforms.uRimColorAlpha.value,t.rimDirection&&e.uniforms.uRimDirection.value.copy(t.rimDirection).normalize(),e.uniforms.uSpecularPower.value=t.specularPower??e.uniforms.uSpecularPower.value,e.uniforms.uRimThreshold.value=t.rimThreshold??e.uniforms.uRimThreshold.value,$(e.uniforms.uGlobalShadowColor.value,t.globalShadowColor??`#ffffff`),e.uniforms.uGlobalShadowAlpha.value=t.globalShadowAlpha??e.uniforms.uGlobalShadowAlpha.value,e.uniforms.uAlphaCutoff.value=t.alphaCutoff??e.uniforms.uAlphaCutoff.value}function xp(e,t){t.faceDebugMode!==void 0&&(e.uniforms.uFaceDebugMode.value=t.faceDebugMode),e.uniforms.uFaceSdfEnabled&&(e.uniforms.uFaceSdfEnabled.value=t.faceSdfEnabled&&t.faceShadowTex?1:0)}function Sp(e,t){$(e.uniforms.uBaseColor.value,t.baseColor),$(e.uniforms.uWarmColor.value,t.warmColor),$(e.uniforms.uSkinColorDefault.value,t.skinColorDefault??t.baseColor),$(e.uniforms.uSkinColor1.value,t.skinColor1??t.warmColor),$(e.uniforms.uSkinColor2.value,t.skinColor2??t.warmColor),e.uniforms.uMainTex.value=t.mainTex??null,e.uniforms.uShadowTex.value=t.shadowTex??null,e.uniforms.uValueTex.value=t.valueTex??null,e.uniforms.uFaceShadowTex.value=t.faceShadowTex??null,e.uniforms.uMainTexTransform.value=op(t.mainTex),e.uniforms.uUseMainTex.value=+!!t.mainTex,e.uniforms.uUseShadowTex.value=+!!t.shadowTex,e.uniforms.uHasValueTex.value=+!!t.valueTex,e.uniforms.uUseValueTex.value=t.useValueTex??!!t.valueTex?1:0,e.uniforms.uUseFaceShadowTex.value=+!!t.faceShadowTex,e.uniforms.uLightDirection.value.copy(t.lightDirection.clone().normalize()),Cp(e,t.lightDirection,t.headDotDirectionalLight??e.uniforms.uHeadDotDirectionalLight?.value,t.useFaceShadowLimiter,t.faceShadowLimitRange),e.uniforms.uLightIntensity.value=t.lightIntensity,e.uniforms.uAmbientIntensity.value=t.ambientIntensity,e.uniforms.uShadowThreshold.value=t.shadowThreshold??e.uniforms.uShadowThreshold.value,e.uniforms.uShadowWeight.value=t.shadowWeight??e.uniforms.uShadowWeight.value,e.uniforms.uShadowWidth.value=t.shadowWidth??e.uniforms.uShadowWidth.value,e.uniforms.uFadeMode.value=t.fadeMode??e.uniforms.uFadeMode.value,e.uniforms.uUseLambert.value=t.useLambert===!1?0:1,e.uniforms.uShadowTexWeight.value=t.shadowTexWeight??e.uniforms.uShadowTexWeight.value,e.uniforms.uHueSinAngle.value=t.hueSinAngle??e.uniforms.uHueSinAngle.value,e.uniforms.uHueCosAngle.value=t.hueCosAngle??e.uniforms.uHueCosAngle.value,e.uniforms.uSaturation.value=t.saturation??e.uniforms.uSaturation.value,e.uniforms.uValue.value=t.value??e.uniforms.uValue.value,e.uniforms.uContrast.value=t.contrast??e.uniforms.uContrast.value,$(e.uniforms.uPartsAmbientColor.value,t.partsAmbientColor??`#ffffff`),e.uniforms.uPartsAmbientAlpha.value=t.partsAmbientAlpha??e.uniforms.uPartsAmbientAlpha.value,bp(e,t),xp(e,t)}function Cp(e,t,n,r=!0,i=0){e.uniforms.uLightDirection?.value.copy(t).normalize(),n&&e.uniforms.uHeadDotDirectionalLight&&e.uniforms.uHeadDotDirectionalLight.value.copy(n),e.uniforms.uUseFaceShadowLimiter&&(e.uniforms.uUseFaceShadowLimiter.value=+!!r),e.uniforms.uFaceShadowLimitRange&&(e.uniforms.uFaceShadowLimitRange.value=i)}function wp(e){return+!!e}function Tp(e){let t=e===`add`||e===`eyelight`,n=e===`eyelight`;return{defaultDistortion:+!!n,uniformMode:e===`eye`?1:n?2:0,materialSettings:{blending:t?5:1,...t?{blendSrc:204,blendDst:201,blendEquation:100}:{},polygonOffsetFactor:n?-.5:-1,polygonOffsetUnits:n?-.5:-1}}}function Ep(e){return{tileX:e&&e.tileX>0?e.tileX:1,tileY:e&&e.tileY>0?e.tileY:1,sample:Math.max(0,e?.sample??0)}}function Dp(e,t=`alpha`,n,r){let{defaultDistortion:i,uniformMode:a,materialSettings:o}=Tp(t),s=Ep(n),c=new $i({transparent:!0,depthWrite:!1,depthTest:!0,depthFunc:3,side:2,vertexColors:(r?.vertexBViewOffset??0)>0,...o,polygonOffset:!0,uniforms:{uMainTex:{value:e},uMainTexTransform:{value:op(e)},uUseMainTex:{value:wp(e)},uMode:{value:a},uTintColor:{value:ip(r?.tintColor??`#ffffff`)},uEmissionColor:{value:ip(r?.emissionColor??`#000000`)},uAtlasTile:{value:new U(s.tileX,s.tileY)},uAtlasSample:{value:s.sample},uUseAtlas:{value:0},uTime:{value:0},uLightInfluence:{value:H.clamp(r?.lightInfluence??1,0,1)},uHighlightInfluence:{value:H.clamp(r?.highlightInfluence??1,0,1)},uVertexBViewOffset:{value:Math.max(0,r?.vertexBViewOffset??0)},uDistortionFps:{value:Math.max(1,r?.distortionFps??12)},uDistortionIntensity:{value:Math.max(0,r?.distortionIntensity??i)},uDistortionIntensityXY:{value:new U(Math.max(0,r?.distortionIntensityX??i),Math.max(0,r?.distortionIntensityY??i))},uDistortionOffset:{value:new U(r?.distortionOffsetX??0,r?.distortionOffsetY??0)},uDistortionScroll:{value:new U(r?.distortionScrollX??.5,r?.distortionScrollY??.5)},uDistortionScrollSpeed:{value:r?.distortionScrollSpeed??1},uDistortionTexTiling:{value:new U(Math.max(.001,r?.distortionTexTilingX??1),Math.max(.001,r?.distortionTexTilingY??1))},uThreshold:{value:H.clamp(r?.threshold??.5,0,1)},uAlphaScale:{value:H.clamp(r?.alphaScale??1,0,1)},uAlphaCutoff:{value:H.clamp(r?.alphaCutoff??.001,0,1)},uStrictAlpha:{value:wp(r?.strictAlpha)},uAlphaSource:{value:0}},vertexShader:`
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

      ${sp}

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
    `});return c.forceSinglePass=!0,c}var Op={right:new G(1,0,0),left:new G(-1,0,0),up:new G(0,1,0),down:new G(0,-1,0),forward:new G(0,0,1),back:new G(0,0,-1)};function kp(e,t){if(!e)return t.clone();let n=Gp(e.x??e.X),r=Gp(e.y??e.Y),i=Gp(e.z??e.Z);return n===null||r===null||i===null?t.clone():new G(n,r,i)}function Ap(e){if(!e)return new W;let t=Gp(e.x??e.X),n=Gp(e.y??e.Y),r=Gp(e.z??e.Z),i=Gp(e.w??e.W);return t===null||n===null||r===null||i===null?new W:jp(new W(t,n,r,i))}function jp(e){let t=Math.fround,n=t(e.x),r=t(e.y),i=t(e.z),a=t(e.w),o=t(n*n),s=t(r*r),c=t(i*i),l=t(a*a),u=t(t(o+s)+t(c+l)),d=t(t(s+c)+t(l+o)),f=t(Math.sqrt(u)),p=t(Math.sqrt(d));return e.set(u>t(1e-30)?t(n/f):0,d>t(1e-30)?t(r/p):0,u>t(1e-30)?t(i/f):0,d>t(1e-30)?t(a/p):1)}function Mp(e){return new G(-e.x,e.y,e.z)}function Np(e){return Mp(e)}function Pp(e){return new W(e.x,-e.y,-e.z,e.w)}function Fp(e){return Np(Op[e])}function Ip(e,t){let n=Math.fround;t.identity();for(let r=e;r;r=r.parent){let e=n(r.quaternion.x),i=n(r.quaternion.y),a=n(r.quaternion.z),o=n(r.quaternion.w),s=r.scale.x<0?-1:1,c=r.scale.y<0?-1:1,l=r.scale.z<0?-1:1,u=t.x*c*l,d=t.y*s*l,f=t.z*s*c,p=t.w;t.set(n(n(n(n(i*f)-n(a*d))+n(o*u))+n(e*p)),n(n(n(n(a*u)-n(e*f))+n(o*d))+n(i*p)),n(n(n(n(o*f)-n(i*u))+n(a*p))+n(e*d)),n(n(n(n(o*p)-n(e*u))-n(a*f))-n(i*d)))}return t}var Lp=new W;function Rp(e,t){let n=Math.fround;t.set(n(e.position.x),n(e.position.y),n(e.position.z));for(let r=e.parent;r;r=r.parent)t.set(n(t.x*n(r.scale.x)),n(t.y*n(r.scale.y)),n(t.z*n(r.scale.z))),Vp(t,r.quaternion),t.set(n(t.x+n(r.position.x)),n(t.y+n(r.position.y)),n(t.z+n(r.position.z)));return t}function zp(e,t){let n=[];for(let t=e;t;t=t.parent)n.push(t);let r=Math.fround;t.set(r(t.x),r(t.y),r(t.z));for(let e=n.length-1;e>=0;e--){let i=n[e];t.set(r(t.x-r(i.position.x)),r(t.y-r(i.position.y)),r(t.z-r(i.position.z))),Vp(t,i.quaternion,!0),t.set(r(t.x*Bp(i.scale.x)),r(t.y*Bp(i.scale.y)),r(t.z*Bp(i.scale.z)))}return t}function Bp(e){let t=Math.fround,n=t(e),r=Math.abs(n);if(r<t(1e-9))return 0;if(!Number.isFinite(n))return 1/n;let i=2**Math.floor(Math.log2(r)),a=Math.floor((r/i-1)*2048),o=t(Math.sign(n)*Math.round(8192/(1+(a+.5)/2048))/8192/i),s=t(o*t(2.000000476837158-t(o*n)));return s=t(s*t(2-t(s*n))),Number.isNaN(s)?o:s}function Vp(e,t,n=!1){let r=Math.fround,i=e.x,a=e.y,o=e.z,s=n?-1:1,c=s*r(t.x),l=s*r(t.y),u=s*r(t.z),d=r(t.w),f=r(r(-2*l*l)-r(2*u*u)),p=r(r(-2*u*d)-r(-2*c*l)),m=r(r(2*c*u)-r(-2*l*d)),h=r(r(2*l*c)-r(-2*u*d)),g=r(r(-2*u*u)-r(2*c*c)),_=r(r(-2*c*d)-r(-2*l*u)),v=r(r(-2*l*d)-r(-2*u*c)),y=r(r(2*u*l)-r(-2*c*d)),b=r(r(-2*c*c)-r(2*l*l));e.set(r(r(r(f*i)+i)+r(r(p*a)+r(m*o))),r(r(r(h*i)+a)+r(r(g*a)+r(_*o))),r(r(r(v*i)+o)+r(r(y*a)+r(b*o))))}function Hp(e,t){return t.copy(Up(t,Ip(e,Lp)))}function Up(e,t){let n=Math.fround,r=n(t.x*2),i=n(t.y*2),a=n(t.z*2),o=n(t.x*r),s=n(t.y*i),c=n(t.z*a),l=n(t.x*i),u=n(t.x*a),d=n(t.y*a),f=n(t.w*r),p=n(t.w*i),m=n(t.w*a);return new G(n((1-(s+c))*e.x+(l-m)*e.y+(u+p)*e.z),n((l+m)*e.x+(1-(o+c))*e.y+(d-f)*e.z),n((u-p)*e.x+(d+f)*e.y+(1-(o+s))*e.z))}function Wp(e,t,n){let r=Math.fround,i=r(H.clamp(n,0,1)),a=r(e.x),o=r(e.y),s=r(e.z),c=r(e.w),l=r(t.x),u=r(t.y),d=r(t.z),f=r(t.w);r(r(r(r(a*l)+r(o*u))+r(s*d))+r(c*f))<0&&(l=-l,u=-u,d=-d,f=-f);let p=r(a+r(r(l-a)*i)),m=r(o+r(r(u-o)*i)),h=r(s+r(r(d-s)*i)),g=r(c+r(r(f-c)*i)),_=r(Math.sqrt(r(r(r(r(p*p)+r(m*m))+r(h*h))+r(g*g))));return _>0?new W(r(p/_),r(m/_),r(h/_),r(g/_)):new W}function Gp(e){return typeof e==`number`&&Number.isFinite(e)?e:null}var Kp=1e-5,qp=.001,Jp=new G(1,0,0);function Yp(e,t){return{currTipPos:t.clone(),prevTipPos:t.clone(),hitNormal:new G(0,0,0),cachedPosition:e.clone(),cachedMovement:new G(0,0,0)}}function Xp(e){let t=Sm(e.parentRotation.clone().multiply(e.initialLocalRotation)),n=Up(e.boneAxis,t);return xm(n.multiplyScalar(Math.fround(e.springLength))),xm(e.headPosition.clone().add(n))}function Zp(e,t){let n=Math.fround;xm(e.currTipPos),xm(e.prevTipPos);let r=e.currTipPos.clone(),i=xm(xm(Xp(t).sub(e.currTipPos)).multiplyScalar(n(t.stiffnessForce))),a=xm(xm(xm(t.springForce.clone().add(t.externalForce)).add(i)).multiplyScalar(n(.5*n(t.deltaTime)*n(t.deltaTime)))),o=xm(xm(e.currTipPos.clone().sub(e.prevTipPos)).multiplyScalar(n(1-n(t.dragForce))));xm(e.currTipPos.add(xm(a.add(o)))),e.prevTipPos.copy(r);let s=xm(t.headPosition.clone()),c=xm(e.currTipPos.clone().sub(s));Math.fround(c.length())<=qp&&c.copy(t.lengthFallbackDirection??t.boneAxis),Cm(c),xm(c.multiplyScalar(n(t.springLength))),e.currTipPos.copy(xm(c.add(s)))}function Qp(e,t){let n=xm(t.clone());xm(e.cachedMovement.copy(n).sub(e.cachedPosition)),e.cachedPosition.copy(n)}function $p(e,t,n,r,i,a=Jp){let o=n.clone().sub(t),s=o.length();if(s<=qp){o.copy(a).normalize(),e.copy(t).addScaledVector(o,r);return}let c=H.clamp(s,r,i);e.copy(t).addScaledVector(o,c/s)}function em(e){if(e.targets.length===0)return;let t=e.springConstant*e.deltaTime*e.deltaTime,n=new G;for(let r of e.targets){let i=e.currTipPos.clone().sub(r.position),a=i.length();if(a<=Kp)continue;let o=a-r.initialLength;n.addScaledVector(i,-(t*o)/a)}e.currTipPos.add(n)}function tm(e,t){let n=0,r=null,i=e.currTipPos.clone();for(let i of km(t.colliders)){if(i.enabled===!1)continue;let a=im(i,t.headPosition,e.currTipPos,t.tailRadius,t.springLength);t.onColliderCheck?.(i,{status:a.status,beforeTailPosition:e.currTipPos.clone(),afterTailPosition:a.tailPosition.clone(),hitNormal:a.hitNormal.clone(),details:nm(i,t.headPosition,e.currTipPos,a.tailPosition,t.tailRadius)}),a.status!==0&&(e.currTipPos.copy(a.tailPosition),e.hitNormal.copy(a.hitNormal),r=a.hitNormal,n=a.status,t.onCollision?.(i,a))}return r&&vm(e,r,t.bounce,t.friction,i),n}function nm(e,t,n,r,i){return e.kind===`sphere`?{kind:e.kind,localHeadPosition:t.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionBefore:n.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionAfter:r.clone().applyMatrix4(e.worldToLocalMatrix),localTailRadius:i*e.worldToLocalRadiusScale,localSphereOrigin:e.localOffset.clone(),localSphereRadius:e.radius}:e.kind===`capsuleLocal`?{kind:e.kind,localHeadPosition:t.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionBefore:n.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionAfter:r.clone().applyMatrix4(e.worldToLocalMatrix),localTailRadius:i*e.worldToLocalRadiusScale,localCapsuleStart:e.localStart.clone(),localCapsuleEnd:e.localEnd.clone(),capsuleRadius:e.radius}:e.kind===`panel`?{kind:e.kind,localHeadPosition:t.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionBefore:n.clone().applyMatrix4(e.worldToLocalMatrix),localTailPositionAfter:r.clone().applyMatrix4(e.worldToLocalMatrix),localTailRadius:i*e.worldToLocalRadiusScale,panelWidth:e.width,panelHeight:e.height}:{kind:e.kind,localHeadPosition:t.clone(),localTailPositionBefore:n.clone(),localTailPositionAfter:r.clone(),localTailRadius:i,localCapsuleStart:e.start.clone(),localCapsuleEnd:e.end.clone(),capsuleRadius:e.radius}}function rm(e,t){let n=t.headPosition.clone();n.y-=t.groundHeight;let r=e.currTipPos.clone();return r.y-=t.groundHeight,lm(n,e.currTipPos.distanceTo(t.headPosition),r,t.tailRadius,1)!==0&&(r.y+=t.groundHeight,$p(e.currTipPos,t.headPosition,r,t.springLength*.5,t.springLength,t.lengthFallbackDirection),e.prevTipPos.copy(e.currTipPos),e.hitNormal.set(0,1,0),!0)}function im(e,t,n,r,i){return e.kind===`sphere`?dm(t,n,r,e):e.kind===`capsule`?fm(t,n,r,e.start,e.end,e.radius):e.kind===`panel`?am(t,n,r,i,e):pm(t,n,r,e)}function am(e,t,n,r,i){let a=t.clone().applyMatrix4(i.worldToLocalMatrix),o=n*i.worldToLocalRadiusScale;if(a.z>=o)return Om(t);let s=i.width*.5,c=i.height*.5;if(Math.abs(a.x)>=s+o||Math.abs(a.y)>=c+o)return Om(t);let l=e.clone().applyMatrix4(i.worldToLocalMatrix),u=r*i.worldToLocalLengthScale,d=a.clone(),f=a.z>0||l.z>0?om(l,a,d,u,o,s,c):cm(l,a,d,o,s,c);return f===0?Om(t):{status:f,tailPosition:d.applyMatrix4(i.localToWorldMatrix),hitNormal:Mm(new G(0,0,1),i.localToWorldMatrix)}}function om(e,t,n,r,i,a,o){if(Math.abs(t.y)<=o&&Math.abs(t.x)<=a)return lm(e,r,n,i,2);if(Math.abs(t.y)>o){let e=t.y>=0?o:-o,r=sm(new G(0,t.y-e,t.z));return n.set(t.x+r.x*i,e+r.y*i,r.z*i),2}let s=t.x>=0?a:-a,c=sm(new G(t.x-s,0,t.z));return n.set(s+c.x*i,t.y+c.y*i,c.z*i),2}function sm(e){return e.lengthSq()<=Kp*Kp?e.set(0,0,0):e.normalize()}function cm(e,t,n,r,i,a){return Math.abs(e.y)>a?(n.set(t.x,t.y>=0?a:-a,t.z),2):Math.abs(e.x)<=i?(n.set(e.x,e.y,r),1):(n.set(t.x<0?-i:i,t.y,t.z),2)}function lm(e,t,n,r,i){if(Nm(n,i)>=r)return 0;let a=Nm(e,i);if(a+t<=r)return n.copy(e),Pm(n,i,a+t),1;let o=(i+1)%3,s=(i+2)%3,c=Nm(n,o)-Nm(e,o),l=Nm(n,s)-Nm(e,s),u=Math.sqrt(c*c+l*l);if(u>.001){let d=a-r,f=Math.sqrt(t*t-d*d)/u;Pm(n,o,Nm(e,o)+c*f),Pm(n,s,Nm(e,s)+l*f),Pm(n,i,r)}else n.copy(e);return 2}function um(e,t,n,r,i,a=i,o={}){let s=n+i,c=t.clone().sub(r);if(c.lengthSq()>=s*s)return Om(t);if(e.distanceToSquared(r)<=a*a){let t=o.headEmbeddedFallback===!1?c.clone().multiplyScalar(1/Math.sqrt(c.lengthSq())):jm(c,o.headEmbeddedFallback instanceof G?o.headEmbeddedFallback:e.clone().sub(r).lengthSq()<=Kp*Kp?new G(0,1,0):e.clone().sub(r));return{status:1,tailPosition:r.clone().addScaledVector(t,s),hitNormal:t}}let l=gm(e,t.distanceTo(e),r,s);if(!l)return o.noIntersectionStatus===2?{status:2,tailPosition:t.clone(),hitNormal:jm(t.clone().sub(r),c)}:Om(t);let u=_m(l,t);return{status:2,tailPosition:u,hitNormal:jm(u.clone().sub(r),c)}}function dm(e,t,n,r){let i=e.clone().applyMatrix4(r.worldToLocalMatrix),a=t.clone().applyMatrix4(r.worldToLocalMatrix),o=n*r.worldToLocalRadiusScale,s=r.radius,c=um(i,a,o,r.localOffset,s,s,{headEmbeddedFallback:!1,noIntersectionStatus:2});return c.status===0?Om(t):{status:c.status,tailPosition:c.tailPosition.clone().applyMatrix4(r.localToWorldMatrix),hitNormal:Mm(c.hitNormal.clone(),r.localToWorldNormalMatrix)}}function fm(e,t,n,r,i,a){let o=i.clone().sub(r),s=o.lengthSq();if(s<=Kp*Kp)return um(e,t,n,r,a);let c=H.clamp(t.clone().sub(r).dot(o)/s,0,1),l=r.clone().addScaledVector(o,c),u=n+a,d=t.clone().sub(l);if(d.lengthSq()>=u*u)return Om(t);if(c<=Kp)return um(e,t,n,r,a);if(c>=.99999)return um(e,t,n,i,a);let f=jm(d,e.clone().sub(l)),p=H.clamp(e.clone().sub(r).dot(o)/s,0,1),m=r.clone().addScaledVector(o,p);return{status:e.distanceToSquared(m)<=a*a?1:2,tailPosition:l.addScaledVector(f,u),hitNormal:f}}function pm(e,t,n,r){let i=mm(e.clone().applyMatrix4(r.worldToLocalMatrix),t.clone().applyMatrix4(r.worldToLocalMatrix),n*r.worldToLocalRadiusScale,r.localStart,r.localEnd,r.radius,1);if(i.status===0)return Om(t);let a=i.tailPosition.clone().applyMatrix4(r.localToWorldMatrix),o=Mm(i.hitNormal,r.localToWorldNormalMatrix);return{status:i.status,tailPosition:a,hitNormal:o}}function mm(e,t,n,r,i,a,o=1){if(a<=1e-4)return Om(t);let s=r.y<=i.y?r:i,c=r.y<=i.y?i:r,l=s.y,u=c.y;return t.y<=l||t.y>=u?um(e,t,n,t.y<u?s:c,a,Math.abs(o)*a,{headEmbeddedFallback:new G(0,0,0),noIntersectionStatus:2}):hm(e,t,n,a,o)}function hm(e,t,n,r,i=1){let a=r+n,o=t.x*t.x+t.z*t.z;if(o>a*a)return Om(t);let s=Math.sqrt(o),c=s>Kp?t.x/s:0,l=s>Kp?t.z/s:0,u=new G(a*c,t.y,a*l),d=new G(c,0,l),f=e.x*e.x+e.z*e.z,p=Math.abs(i)*r;return{status:f<=p*p?1:2,tailPosition:u,hitNormal:d}}function gm(e,t,n,r){let i=n.clone().sub(e),a=i.lengthSq(),o=Math.sqrt(a);if(o<=0)return null;let s=i.multiplyScalar(1/o),c=t*t,l=c+a-r*r,u=.5/o,d=a*4*c-l*l;if(d<0)return null;let f=l*u;return{origin:e.clone().addScaledVector(s,f),upVector:s,radius:u*Math.sqrt(d)}}function _m(e,t){let n=t.clone().sub(e.origin),r=e.origin.clone().addScaledVector(e.upVector,n.dot(e.upVector)),i=t.clone().sub(r),a=i.length();return a<=Kp||e.radius<=Kp?e.origin.clone():e.origin.clone().addScaledVector(i,e.radius/a)}function vm(e,t,n,r,i=e.currTipPos){let a=jm(t,Jp),o=e.prevTipPos.clone(),s=i.clone().sub(o),c=a.clone().multiplyScalar(s.dot(a)),l=s.sub(c).multiplyScalar(1-r).sub(c.multiplyScalar(n));if(l.lengthSq()<=1e-4){e.prevTipPos.copy(e.currTipPos);return}e.prevTipPos.copy(e.currTipPos).sub(l);let u=e.currTipPos.distanceTo(o),d=l.length(),f=Math.max(d-u,0);f>0&&e.currTipPos.addScaledVector(l,f/d)}function ym(e){if(!e.limit.active)return!1;let t=Math.fround,n=e.vector,r=xm(e.basisUp.clone()),i=xm(e.basisSide.clone()),a=xm(e.basisForward.clone());xm(n);let o=t(r.dot(n)),s=xm(r.multiplyScalar(o)),c=xm(n.clone().sub(s)),l=t(c.length()),u=l<=Kp?c.set(0,0,0):c.set(t(c.x/l),t(c.y/l),t(c.z/l)),d=t(i.dot(u)),f=t(Math.asin(d<-1?-1:Number.isNaN(d)?1:Math.min(d,1)))*t(180/Math.PI),p=t(f-f*t(e.springStrength)*t(e.deltaTime)*t(e.deltaTime)),m=p<=e.limit.max?p:e.limit.max,h=p<e.limit.min?e.limit.min:m,g=h>=0?e.limit.max:e.limit.min,_=0;if(g<-1e-4||g>1e-4){let e=t(h/g);e>=0&&(_=Math.min(e,1))}let v=t(g*_),y=t(g*_*t(Math.PI/180)),b=xm(i.multiplyScalar(t(Math.sin(y))));return xm(b.add(xm(a.multiplyScalar(t(Math.cos(y)))))),xm(b.multiplyScalar(l)),xm(n.copy(s).add(b)),v!==p}function bm(e,t,n,r,i){let a=Math.fround,o=n.clone().multiply(r);Sm(o);let s=Up(new G(a(a(t.x)-a(e.x)),a(a(t.y)-a(e.y)),a(a(t.z)-a(e.z))),o.invert());if(s.lengthSq()<=Kp*Kp)return r.clone();Cm(s);let c=wm(i,s);return r.clone().multiply(c)}function xm(e){return e.set(Math.fround(e.x),Math.fround(e.y),Math.fround(e.z))}function Sm(e){return e.set(Math.fround(e.x),Math.fround(e.y),Math.fround(e.z),Math.fround(e.w))}function Cm(e){xm(e);let t=Math.fround(e.length());return t>1e-5?e.set(Math.fround(e.x/t),Math.fround(e.y/t),Math.fround(e.z/t)):e.set(0,0,0)}function wm(e,t){let n=Math.fround,r=Dm(e.clone()),i=Dm(t.clone()),a=Em(r,i);if(r.lengthSq()===0||i.lengthSq()===0||a>1-1e-6)return new W;let o=Array(9);if(a<-1+1e-6){let e=new G(0,r.z,-r.y);Em(e,e)<1e-6&&e.set(-r.z,0,r.x);let t=n(1/n(Math.sqrt(Em(e,e))));xm(e.multiplyScalar(t));let i=Tm(e,r),a=r.toArray(),s=e.toArray(),c=i.toArray();for(let e=0;e<3;e++)for(let t=0;t<3;t++)o[e*3+t]=n(n(n(c[t]*c[e])-n(a[t]*a[e]))-n(s[t]*s[e]))}else{let e=Tm(r,i),t=n(n(1-a)/Em(e,e)),s=n(e.x*t),c=n(e.y*t),l=n(e.z*t),u=n(e.y*s),d=n(e.z*s),f=n(e.y*l);o[0]=n(a+n(e.x*s)),o[1]=n(e.z+u),o[2]=n(d-e.y),o[3]=n(u-e.z),o[4]=n(a+n(c*e.y)),o[5]=n(e.x+f),o[6]=n(e.y+d),o[7]=n(f-e.x),o[8]=n(a+n(e.z*l))}let s=[0,0,0,0],c=n(n(o[0]+o[4])+o[8]);if(c>0){let e=n(Math.sqrt(n(c+1))),t=n(.5/e);s[3]=n(e*.5),s[0]=n(n(o[5]-o[7])*t),s[1]=n(n(o[6]-o[2])*t),s[2]=n(n(o[1]-o[3])*t)}else{let e=+(o[4]>o[0]);o[8]>o[e*4]&&(e=2);let t=(e+1)%3,r=(t+1)%3,i=n(Math.sqrt(n(n(n(o[e*4]-o[t*4])-o[r*4])+1))),a=n(.5/i);s[e]=n(i*.5),s[3]=n(n(o[t*3+r]-o[r*3+t])*a),s[t]=n(n(o[e*3+t]+o[t*3+e])*a),s[r]=n(n(o[e*3+r]+o[r*3+e])*a)}let l=n(Math.sqrt(n(n(n(n(s[0]*s[0])+n(s[1]*s[1]))+n(s[2]*s[2]))+n(s[3]*s[3]))));return new W(n(s[0]/l),n(s[1]/l),n(s[2]/l),n(s[3]/l))}function Tm(e,t){let n=Math.fround;return new G(n(n(e.y*t.z)-n(e.z*t.y)),n(n(e.z*t.x)-n(e.x*t.z)),n(n(e.x*t.y)-n(e.y*t.x)))}function Em(e,t){let n=Math.fround;return n(n(n(e.x*t.x)+n(e.y*t.y))+n(e.z*t.z))}function Dm(e){let t=Math.fround;e.set(t(e.x),t(e.y),t(e.z));let n=t(Math.sqrt(Em(e,e)));return n>=Math.fround(1e-5)?e.set(t(e.x/n),t(e.y/n),t(e.z/n)):e.set(0,0,0)}function Om(e){return{status:0,tailPosition:e.clone(),hitNormal:new G(0,0,0)}}function km(e){return[...e].sort((e,t)=>Am(e)-Am(t))}function Am(e){return e.kind===`capsule`||e.kind===`capsuleLocal`?0:e.kind===`sphere`?1:2}function jm(e,t){return e.lengthSq()<=Kp*Kp&&e.copy(t),e.lengthSq()<=Kp*Kp&&e.copy(Jp),e.normalize()}function Mm(e,t){let n=t.elements,r=e.x,i=e.y,a=e.z;return e.set(n[0]*r+n[4]*i+n[8]*a,n[1]*r+n[5]*i+n[9]*a,n[2]*r+n[6]*i+n[10]*a),jm(e,Jp)}function Nm(e,t){return t===0?e.x:t===1?e.y:e.z}function Pm(e,t,n){t===0?e.x=n:t===1?e.y=n:e.z=n}var Fm=1401298464324817e-60,Im=Fp(`right`),Lm=Fp(`left`),Rm=Fp(`back`),zm=Fp(`down`),Bm=class e{bones;managerBatches;missingNodes;skinnedBones;setupDiagnostics;externalForce=new G(0,0,0);parentRotation=new W;headPosition=new G;localRotation=new W;colliderLocalToWorld=new J;colliderWorldToLocal=new J;frameColliderCache=new Map;angleVector=new G;debugAnimatedTip=new G;providerForce=new G;providerRotation=new W;providerWorldToLocal=new J;waveAxis=new G;providerRight=new G;providerUp=new G;mainWindDirection=new G;localBonePosition=new G;additionalDirection=new G;traceFilters=[];traceMaxEvents=240;traceSequence=0;updateManagerPathId=null;traceEvents=[];constructor(e,t,n,r,i){this.bones=e,this.managerBatches=t,this.missingNodes=n,this.skinnedBones=r,this.setupDiagnostics=i}static fromPjskRuntimeExtension(t,n){let r=Ih(t);if(!r)return null;n.updateMatrixWorld(!0);let i=oh(n),a=rh(r),o=fh(n),s=[],c=vh(r),l=qm(r,i,s,c),u=mh(r),d=hh(r),f=gh(r,l),p=ph(r),m=Ym(r),h=Jm(r,c,m),g=new Map,_=new Map,v=new Map,y=new Map;n.traverse(e=>y.set(e,y.size));let b=new Map;for(let e of p.values())b.set(e,ch(i,e.nodePath,e.runtimePartIndex));let x=(r.managers??[]).filter(e=>yh(e.nodePath??e.poseRoot,c)).map(e=>({source:e,node:ch(i,e.nodePath,e.runtimePartIndex),nodes:[]})).sort((e,t)=>(y.get(e.node)??0)-(y.get(t.node)??0));for(let e of x){let t=e.source,n=Um(i,t,v),o=e.node?[...b].filter(([n,r])=>r?mg(r,e.node):n.pathId!==void 0&&t.bonePathIds?.includes(n.pathId)).sort((e,t)=>(y.get(e[1])??1/0)-(y.get(t[1])??1/0)).map(([e])=>e):(t.bonePathIds??[]).map(e=>p.get(e));for(let p of o){if(!p||!yh(p.nodePath,c))continue;let o=p.pathId;if(!Zm(p,m)){h.rejectedUnverifiedBoneSourceCount+=1;continue}let v=b.get(p);if(!v){s.push(p.nodePath??p.nodeName??`bone:${o}`);continue}e.nodes.push(v),_.set(v,p);let y=$m(p,v,a,i),x=ch(i,p.pivotNodePath,p.runtimePartIndex),S=Qm(r,t,p,o===void 0?void 0:u.get(o),o===void 0?void 0:d.get(o),t.pathId===void 0?void 0:f.get(t.pathId),l),C=Hm(t,p,v,y,x,bh(i,p),n,S);C&&g.set(v,C)}}let S=[...g.values()];S.sort((e,t)=>pg(e.node)-pg(t.node));let C=x.map(e=>{let t=[...new Set(e.nodes)].map(e=>g.get(e)).sort((e,t)=>pg(e.node)-pg(t.node));return{source:e.source,bones:t,animatedBones:new Set(t.filter(t=>Nh(_.get(t.node),t.node,e.source))),gravity:Jh(e.source.rawGravity),forceProviders:Um(i,e.source,v),slowMotionScale:ig(e.source.slowMotionScale)??1,isPaused:e.source.isPaused===!0}});return S.length>0?new e(S,C,s,o,h):null}getControlledTrackNodeNames(){return new Set(this.bones.map(e=>e.node.name).filter(Boolean))}setTraceBoneFilters(e,t=240){this.traceFilters=e.map(e=>e.trim().toLowerCase()).filter(Boolean),this.traceMaxEvents=Math.max(1,Math.trunc(t)||240),this.traceSequence=0,this.traceEvents.length=0}getTraceSnapshot(){return{filters:[...this.traceFilters],eventCount:this.traceEvents.length,events:this.traceEvents.map(e=>({...e,collisionChecks:e.collisionChecks.map(e=>({...e}))}))}}setSimulationControl(e){for(let t of this.managerBatches)t.slowMotionScale=rg(e.slowMotionScale,1),t.isPaused=e.paused??!1;for(let t of this.bones)t.stiffnessForce=rg(e.stiffnessForce,t.originalStiffnessForce),t.dragForce=rg(e.dragForce,t.originalDragForce),t.windInfluence=rg(e.windInfluence,t.originalWindInfluence),t.slowMotionScale=rg(e.slowMotionScale,1),t.isPaused=e.paused??!1}clearSimulationControl(){this.setSimulationControl({})}update(e){let t=this.collectWindVolumeOneSelfProviders(),n=new Set(t.filter(e=>e.isActive&&e.springManagerPathId!==null).map(e=>e.springManagerPathId)),r=new Set(t.filter(e=>!e.isActive&&e.springManagerPathId!==null).map(e=>e.springManagerPathId));for(let t of this.managerBatches){let i=t.source;if(i.enabled===!1||i.automaticUpdates===!1)continue;this.updateManagerPathId=ig(i.pathId),t.isPaused||this.preUpdateColliders(t.bones);let a=this.updateManagerPathId!==null&&r.has(this.updateManagerPathId)?!0:i.isSumOfForcesOnBone!==!1;for(let r of t.bones){if(!r.enabled)continue;Ip(r.node.parent,this.parentRotation),Rp(r.node,this.headPosition);let o=t.animatedBones.has(r)?H.clamp(ig(i.dynamicRatio)??.5,0,1):1;if(t.isPaused){r.skinAnimationLocalRotation.copy(r.node.quaternion),this.applyBoneRotation(r,o);continue}!a||this.updateManagerPathId!==null&&n.has(this.updateManagerPathId)||(this.computeExternalForce(r,e,t),this.updateBoneSpringAndRotation(r,Fh(e,ig(i.simulationFrameRate)??60,t.slowMotionScale),this.externalForce,o))}}for(let n of t)n.isActive&&this.updateWindVolumeOneSelfLateUpdate(n,e)}collectWindVolumeOneSelfProviders(){let e=new Set;for(let t of this.managerBatches)for(let n of t.forceProviders)n.kind===`WindVolumeOneSelf`&&e.add(n);return[...e]}updateWindVolumeOneSelfLateUpdate(e,t){if(e.springManagerPathId===null)return;let n=e.simulationFrameRate>0?1/e.simulationFrameRate:t,r=this.managerBatches.find(t=>t.source.pathId===e.springManagerPathId);if(r&&r.source.enabled!==!1&&r.source.automaticUpdates!==!1&&!r.isPaused){this.updateManagerPathId=e.springManagerPathId,this.preUpdateColliders(r.bones);for(let i of r.bones)i.enabled&&(this.computeWindVolumeOneSelfForce(e,i,t),this.externalForce.copy(r.gravity).add(this.providerForce),this.updateBoneSpringAndRotation(i,n,this.externalForce,r.animatedBones.has(i)?e.dynamicRatio:1))}}computeExternalForce(e,t,n){this.externalForce.copy(n.gravity);for(let r of n.forceProviders)this.externalForce.add(this.computeForceProvider(r,e,t));return this.externalForce}computeForceProvider(e,t,n){return e.kind===`ForceVolume`?(e.node.updateMatrixWorld(!0),Ip(e.node,this.providerRotation),this.providerForce.set(0,0,1).applyQuaternion(this.providerRotation).multiplyScalar(e.strength)):e.kind===`WindVolume`?this.computeWindVolume(e,t):this.computeWindVolumeOneSelfForce(e,t,n)}computeWindVolume(e,t){let n=e.weight*e.strength;if(n<=Fm||e.period<=.001)return this.providerForce.set(0,0,0);e.node.updateMatrixWorld(!0),Ip(e.node,this.providerRotation),t.node.getWorldPosition(this.localBonePosition).applyMatrix4(this.providerWorldToLocal.copy(e.node.matrixWorld).invert());let r=-this.localBonePosition.x,i=Math.sin(e.timeFactor+Math.sin(r*e.positionalMultiplier)+Math.cos(this.localBonePosition.z*e.positionalMultiplier));return this.providerForce.set(0,0,1).applyQuaternion(this.providerRotation).addScaledVector(e.offsetVector,i).normalize().multiplyScalar(n*t.windInfluence)}computeWindVolumeOneSelfForce(e,t,n){let r=e.weight*e.strength;if(r<=Fm||e.period<=Fm)return this.providerForce.set(0,0,0);e.currentTime=ng(e.currentTime,n,e.period);let i=e.currentTime*Math.PI*2/e.period;if(e.node.updateMatrixWorld(!0),Ip(e.node,this.providerRotation),this.waveAxis.set(0,1,0).applyQuaternion(this.providerRotation),Math.abs(e.spinPeriod)>.001){e.spinTime=ng(e.spinTime,n,e.spinPeriod);let t=e.spinTime*Math.PI*2/e.spinPeriod;this.providerRight.copy(Im).applyQuaternion(this.providerRotation),this.providerUp.set(0,1,0).applyQuaternion(this.providerRotation),this.waveAxis.copy(this.providerRight).multiplyScalar(Math.cos(t)).addScaledVector(this.providerUp,Math.sin(t))}let a=Math.max(e.peakDistance,Fm);t.node.getWorldPosition(this.localBonePosition).applyMatrix4(this.providerWorldToLocal.copy(e.node.matrixWorld).invert());let o=Math.PI*2/a,s=-this.localBonePosition.x,c=Math.sin(i+Math.sin(o*s)+Math.cos(o*this.localBonePosition.z));return this.mainWindDirection.set(0,0,1).applyQuaternion(this.providerRotation).addScaledVector(this.waveAxis,e.amplitude*c).normalize(),this.additionalDirection.set(-Math.cos(H.degToRad(e.additionalWindAngle)),0,-Math.sin(H.degToRad(e.additionalWindAngle))).normalize(),this.providerForce.copy(this.mainWindDirection).multiplyScalar(r).addScaledVector(this.additionalDirection,e.additionalWindStrength).multiplyScalar(t.windInfluence)}settleCurrentPose(e=60,t=1/60){let n=Math.max(0,Math.floor(e));for(let e=0;e<n;e+=1)this.update(t)}resetPose(){for(let e of this.bones)e.node.quaternion.copy(e.initialLocalRotation),e.skinAnimationLocalRotation.copy(e.initialLocalRotation),e.node.scale.copy(e.initialLocalScale),e.node.updateMatrix(),e.node.updateMatrixWorld(!0)}resetStateToCurrentPose(){for(let e of this.bones)Ip(e.node.parent,this.parentRotation),Rp(e.node,this.headPosition),e.skinAnimationLocalRotation.copy(e.node.quaternion),this.debugAnimatedTip.copy(Xp({headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,springLength:e.springLength})),e.state.currTipPos.copy(this.debugAnimatedTip),e.state.prevTipPos.copy(this.debugAnimatedTip),e.state.cachedPosition.copy(this.headPosition),e.state.cachedMovement.set(0,0,0),e.state.hitNormal.set(0,0,0)}getSnapshot(e=!0,t={}){let n=new Set,r=[],i=[],a=0,o=0,s=0,c=0;for(let e of this.bones){for(let t of e.colliders)n.add(t);Ip(e.node.parent,this.parentRotation),Rp(e.node,this.headPosition),this.debugAnimatedTip.copy(Xp({headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,springLength:e.springLength}));let t=this.debugAnimatedTip.distanceTo(e.state.currTipPos),l=e.node.name.toLowerCase(),u=e.state.currTipPos.clone().sub(this.debugAnimatedTip),d=e.state.currTipPos.clone().sub(e.state.prevTipPos),f=this.skinnedBones.has(e.node);l.includes(`sleeve`)&&(a=Math.max(a,t)),l.includes(`skirt`)&&(o=Math.max(o,t)),f?s+=1:c+=1,r.push({name:e.node.name,path:og(e.node),springName:e.springName,sourceBoneName:e.sourceBoneName,sourceBonePath:e.sourceBonePath,sourceBonePathId:e.sourceBonePathId,resolvedIsSkinnedBone:f,pivotSourceName:e.pivotSourceName,pivotSourcePath:e.pivotSourcePath,pivotResolvedPath:e.pivotResolvedPath,tailBinding:Gh(e.tailBinding),offset:t,colliderCount:e.colliders.length,lastCollisionStatus:e.lastCollisionStatus,lastCollisionColliderName:e.lastCollisionInfo?.name??null,lastCollisionColliderPath:e.lastCollisionInfo?.path??null,lastCollisionColliderKind:e.lastCollisionInfo?.kind??null,lastCollisionColliderSourcePathId:e.lastCollisionInfo?.sourcePathId??null,lastAngleLimitApplied:e.lastAngleLimitApplied,hasSpringForce:e.springForce.lengthSq()>1e-8,forceProviderCount:e.forceProviders.length,stiffnessForce:e.stiffnessForce,managerDynamicRatio:e.dynamicRatio,dynamicRatio:Mh(e),isAnimated:e.isAnimated,automaticUpdates:e.automaticUpdates,boneEnabled:e.enabled,bonePaused:e.isPaused,isSumOfForcesOnBone:e.isSumOfForcesOnBone,simulationFrameRate:e.simulationFrameRate,slowMotionScale:e.slowMotionScale,updateSkipReason:zh(e),animatedTipDelta:Lh(u),velocity:Lh(d),springForce:Lh(e.springForce),colliderBindings:e.colliderBindingDiagnostics.map(Dh)}),l.includes(`skirt`)&&i.push({name:e.node.name,path:og(e.node),springName:e.springName,sourceBoneName:e.sourceBoneName,sourceBonePath:e.sourceBonePath,sourceBonePathId:e.sourceBonePathId,resolvedIsSkinnedBone:f,pivotSourceName:e.pivotSourceName,pivotSourcePath:e.pivotSourcePath,pivotResolvedPath:e.pivotResolvedPath,tailBinding:Gh(e.tailBinding),offset:t,appliedRotationDegrees:H.radToDeg(e.skinAnimationLocalRotation.clone().normalize().angleTo(e.node.quaternion.clone().normalize())),colliderCount:e.colliders.length,lastCollisionStatus:e.lastCollisionStatus,lastCollisionColliderName:e.lastCollisionInfo?.name??null,lastCollisionColliderPath:e.lastCollisionInfo?.path??null,lastCollisionColliderKind:e.lastCollisionInfo?.kind??null,lastCollisionColliderSourcePathId:e.lastCollisionInfo?.sourcePathId??null,lastCollisionHitNormal:e.lastCollisionInfo?Lh(e.lastCollisionInfo.hitNormal):null,lastAngleLimitApplied:e.lastAngleLimitApplied,hasSpringForce:e.springForce.lengthSq()>1e-8,forceProviderCount:e.forceProviders.length,stiffnessForce:e.stiffnessForce,dragForce:e.dragForce,managerDynamicRatio:e.dynamicRatio,dynamicRatio:Mh(e),isAnimated:e.isAnimated,automaticUpdates:e.automaticUpdates,boneEnabled:e.enabled,bonePaused:e.isPaused,isSumOfForcesOnBone:e.isSumOfForcesOnBone,simulationFrameRate:e.simulationFrameRate,slowMotionScale:e.slowMotionScale,updateSkipReason:zh(e),animatedTipDelta:Lh(u),velocity:Lh(d),headMovement:Lh(e.state.cachedMovement),gravity:Lh(e.gravity),springForce:Lh(e.springForce),colliderBindings:e.colliderBindingDiagnostics.map(Dh)})}r.sort((e,t)=>t.offset-e.offset),i.sort((e,t)=>t.offset-e.offset);let l=Rh(r,t),u=Vm(this.bones,this.skinnedBones);return{runtimeMode:`unity-prefab`,enabled:e,springCount:this.managerBatches.length,boneCount:this.bones.length,colliderCount:n.size,missingNodeCount:this.missingNodes.length,missingNodeSamples:this.missingNodes.slice(0,96),setupDiagnostics:{...this.setupDiagnostics,activeRoots:[...this.setupDiagnostics.activeRoots]},maxSleeveOffset:a,maxSkirtOffset:o,topOffsets:r.slice(0,8),debugOffsets:l,controlledPartCounts:u.counts,controlledHairSamples:u.hairSamples,skirtOffsets:i,bindingDiagnostics:this.bones.flatMap(e=>e.colliderBindingDiagnostics).map(Dh),skinnedBoneMatches:s,skinnedBoneMisses:c}}updateBoneSpringAndRotation(e,t,n,r){Ip(e.node.parent,this.parentRotation),Rp(e.node,this.headPosition);let i=this.shouldTraceBone(e)?this.createTraceEvent(e,t,n,r):null;this.advanceBoneSpring(e,t,n,i),this.applyLengthLimits(e,t),i&&(i.stateAfterLengthLimits=Hh(e.state));let a=Math.abs(e.radius)*dg(e.node);i&&(i.tailRadius=a);let o=this.checkBoneGround(e,a,i);this.checkBoneCollisions(e,a,o,i),this.applyBoneAngleLimitsWithTrace(e,t,i),this.resetInvalidTipPosition(e),this.applyBoneRotation(e,r),i&&(i.finalLocalRotation=Vh(e.node.quaternion),this.pushTraceEvent(i))}advanceBoneSpring(e,t,n,r){e.skinAnimationLocalRotation.copy(e.node.quaternion),r&&(r.skinAnimationLocalRotation=Vh(e.skinAnimationLocalRotation)),Qp(e.state,this.headPosition),r&&(r.stateAfterCache=Hh(e.state)),Zp(e.state,{headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,lengthFallbackDirection:e.boneAxis.clone().applyQuaternion(Ip(e.node,new W)),springLength:e.springLength,stiffnessForce:e.stiffnessForce,dragForce:e.dragForce,springForce:e.springForce,externalForce:n,deltaTime:t}),r&&(r.stateAfterUpdateSpring=Hh(e.state))}checkBoneGround(e,t,n){let r=e.collideWithGround?rm(e.state,{headPosition:this.headPosition,springLength:e.springLength,tailRadius:t,groundHeight:e.groundHeight,lengthFallbackDirection:e.boneAxis.clone().applyQuaternion(Ip(e.node,new W)),bounce:e.bounce,friction:e.friction}):!1;return n&&(n.groundHit=r,n.stateAfterGround=Hh(e.state)),r}checkBoneCollisions(e,t,n,r){e.lastCollisionInfo=null;let i=[],a=e.enableCollision?this.buildWorldColliders(e.colliders):[];e.lastCollisionStatus=!n&&e.enableCollision?tm(e.state,{headPosition:this.headPosition,springLength:e.springLength,tailRadius:t,colliders:a,bounce:e.bounce,friction:e.friction,onColliderCheck:r?(e,t)=>i.push(Wh(e,t)):void 0,onCollision:(t,n)=>{e.lastCollisionInfo={kind:t.kind,name:t.debugName??null,path:t.debugPath??null,sourcePathId:t.debugSourcePathId??null,hitNormal:n.hitNormal.clone()}}}):0,r&&(r.collisionChecks=i,r.collisionStatus=e.lastCollisionStatus,r.stateAfterCollisions=Hh(e.state))}applyBoneAngleLimitsWithTrace(e,t,n){let r=n?Uh(e):void 0;e.lastAngleLimitApplied=e.enableAngleLimits?this.applyAngleLimits(e,t,r):!1,n&&r&&(n.angleLimit=r,n.stateAfterAngleLimits=Hh(e.state))}applyLengthLimits(e,t){if(!e.enableLengthLimits||e.lengthLimitTargets.length===0)return;let n=e.lengthLimitTargets.map(e=>({position:Rp(e.node,new G),initialLength:e.initialLength}));em({currTipPos:e.state.currTipPos,springConstant:e.springConstant,deltaTime:t,targets:n})}applyAngleLimits(e,t,n){if(!e.yAngleLimit&&!e.zAngleLimit)return!1;let r=e.pivotNode??e.node.parent??e.node;r.updateMatrixWorld(!0),this.angleVector.copy(e.state.currTipPos).sub(e.state.cachedPosition),this.angleVector.set(Math.fround(this.angleVector.x),Math.fround(this.angleVector.y),Math.fround(this.angleVector.z));let i=Hp(r,Lm.clone()),a=Hp(r,Rm.clone()),o=Hp(r,zm.clone());n&&(n.enabled=!0,n.hasPivot=!0,n.pivotName=r.name||null,n.pivotPath=og(r)||null,n.vectorBefore=Lh(this.angleVector),n.forward=Lh(i),n.back=Lh(a),n.down=Lh(o));let s=!1;if(e.yAngleLimit){let r=ym({basisSide:o,basisUp:a,basisForward:i,springStrength:e.angularStiffness,deltaTime:t,limit:e.yAngleLimit,vector:this.angleVector});n&&(n.yApplied=r,n.afterY=Lh(this.angleVector)),s=r||s}if(e.zAngleLimit){let r=ym({basisSide:a,basisUp:o,basisForward:i,springStrength:e.angularStiffness,deltaTime:t,limit:e.zAngleLimit,vector:this.angleVector});n&&(n.zApplied=r,n.afterZ=Lh(this.angleVector)),s=r||s}return e.state.currTipPos.copy(e.state.cachedPosition).add(this.angleVector),e.state.currTipPos.set(Math.fround(e.state.currTipPos.x),Math.fround(e.state.currTipPos.y),Math.fround(e.state.currTipPos.z)),n&&(n.vectorAfter=Lh(this.angleVector)),s}applyBoneRotation(e,t=e.dynamicRatio){this.resetInvalidTipPosition(e),this.localRotation.copy(bm(this.headPosition,e.state.currTipPos,this.parentRotation,e.initialLocalRotation,e.boneAxis)),e.node.quaternion.copy(jp(Wp(e.skinAnimationLocalRotation,this.localRotation,t))),e.node.updateMatrix(),e.node.updateMatrixWorld(!0)}resetInvalidTipPosition(e){Number.isFinite(e.state.currTipPos.x)&&Number.isFinite(e.state.currTipPos.y)&&Number.isFinite(e.state.currTipPos.z)||(this.debugAnimatedTip.copy(Xp({headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,springLength:e.springLength})),e.state.currTipPos.copy(this.debugAnimatedTip),e.state.prevTipPos.copy(this.debugAnimatedTip))}shouldTraceBone(e){if(this.traceFilters.length===0)return!1;let t=e.node.name.toLowerCase(),n=og(e.node).toLowerCase(),r=e.springName.toLowerCase();return this.traceFilters.some(e=>t.includes(e)||n.includes(e)||r.includes(e))}createTraceEvent(e,t,n,r){return{sequence:this.traceSequence,springName:e.springName,boneName:e.node.name,bonePath:og(e.node),sourceBoneName:e.sourceBoneName,sourceBonePath:e.sourceBonePath,sourceBonePathId:e.sourceBonePathId,pivotSourceName:e.pivotSourceName,pivotSourcePath:e.pivotSourcePath,pivotResolvedPath:e.pivotResolvedPath,tailBinding:Gh(e.tailBinding),managerPathId:e.managerPathId,updateManagerPathId:this.updateManagerPathId,deltaTime:t,dynamicRatio:r,automaticUpdates:e.automaticUpdates,enabled:e.enabled,enableCollision:e.enableCollision,enableAngleLimits:e.enableAngleLimits,enableLengthLimits:e.enableLengthLimits,colliderCount:e.colliders.length,forceProviderCount:e.forceProviders.length,headPosition:Lh(this.headPosition),parentRotation:Vh(this.parentRotation),initialLocalRotation:Vh(e.initialLocalRotation),skinAnimationLocalRotation:Vh(e.skinAnimationLocalRotation),boneAxis:Lh(e.boneAxis),boneAxisSource:e.boneAxisSource,springLength:e.springLength,radius:e.radius,tailRadius:0,stiffnessForce:e.stiffnessForce,dragForce:e.dragForce,springForce:Lh(e.springForce),gravity:Lh(e.gravity),externalForce:Lh(n),stateBefore:Hh(e.state),stateAfterCache:Hh(e.state),animatedTip:Lh(Xp({headPosition:this.headPosition,parentRotation:this.parentRotation,initialLocalRotation:e.initialLocalRotation,boneAxis:e.boneAxis,springLength:e.springLength})),stateAfterUpdateSpring:Hh(e.state),stateAfterLengthLimits:Hh(e.state),groundHit:!1,stateAfterGround:Hh(e.state),collisionStatus:0,collisionChecks:[],stateAfterCollisions:Hh(e.state),angleLimit:Uh(e),stateAfterAngleLimits:Hh(e.state),finalLocalRotation:Vh(e.node.quaternion)}}pushTraceEvent(e){for(this.traceSequence+=1,this.traceEvents.push({...e});this.traceEvents.length>this.traceMaxEvents;)this.traceEvents.shift()}buildWorldColliders(e){let t=[];for(let n of e){let e=this.frameColliderCache.get(n)??this.createWorldCollider(n);e&&t.push(e)}return t}preUpdateColliders(e=this.bones){this.frameColliderCache.clear();let t=new Set;for(let n of e)for(let e of n.colliders)t.add(e);let n=[...t].sort((e,t)=>lg(e.source)-lg(t.source));for(let e of n){let t=this.createWorldCollider(e);t&&this.frameColliderCache.set(e,t)}}createWorldCollider(e){let t=e.source.shape,n=e.source.enabled!==!1,r=n&&e.source.linkedRendererEnabled!==!1;return t?.sphere?(e.node.updateMatrixWorld(!0),this.colliderLocalToWorld.copy(e.node.matrixWorld),this.colliderWorldToLocal.copy(e.node.matrixWorld).invert(),{kind:`sphere`,enabled:n,debugName:e.source.nodeName??e.source.scriptName??e.node.name,debugPath:e.source.nodePath??og(e.node),debugSourcePathId:e.source.pathId,localOffset:Jh(t.sphere.offset),radius:Math.max(0,t.sphere.radius??.01),localToWorldMatrix:this.colliderLocalToWorld.clone(),worldToLocalMatrix:this.colliderWorldToLocal.clone(),worldToLocalRadiusScale:fg(this.colliderWorldToLocal),localToWorldNormalMatrix:new J().makeRotationFromQuaternion(Ip(e.node,new W)),lossyScaleX:ug(e.node)}):t?.capsule?(e.node.updateMatrixWorld(!0),this.colliderLocalToWorld.copy(e.node.matrixWorld),this.colliderWorldToLocal.copy(e.node.matrixWorld).invert(),{kind:`capsuleLocal`,enabled:r,debugName:e.source.nodeName??e.source.scriptName??e.node.name,debugPath:e.source.nodePath??og(e.node),debugSourcePathId:e.source.pathId,localStart:Jh(t.capsule.offset),localEnd:Jh(t.capsule.tail),radius:Math.max(0,t.capsule.radius??.01),localToWorldMatrix:this.colliderLocalToWorld.clone(),worldToLocalMatrix:this.colliderWorldToLocal.clone(),worldToLocalRadiusScale:fg(this.colliderWorldToLocal),localToWorldNormalMatrix:new J().makeRotationFromQuaternion(Ip(e.node,new W)),lossyScaleX:ug(e.node)}):t?.panel?(e.node.updateMatrixWorld(!0),this.colliderLocalToWorld.copy(e.node.matrixWorld),this.colliderWorldToLocal.copy(e.node.matrixWorld).invert(),{kind:`panel`,enabled:r,debugName:e.source.nodeName??e.source.scriptName??e.node.name,debugPath:e.source.nodePath??og(e.node),debugSourcePathId:e.source.pathId,width:Math.max(0,t.panel.width??0),height:Math.max(0,t.panel.height??0),localToWorldMatrix:this.colliderLocalToWorld.clone(),worldToLocalMatrix:this.colliderWorldToLocal.clone(),worldToLocalRadiusScale:fg(this.colliderWorldToLocal),worldToLocalLengthScale:fg(this.colliderWorldToLocal),localToWorldNormalMatrix:new J().makeRotationFromQuaternion(Ip(e.node,new W))}):null}};function Vm(e,t){let n=new Map,r=[];for(let i of e){let e=Kh(i.sourceBonePath),a=`${i.runtimePartIndex??`null`}|${i.runtimePartType??`null`}|${e??`null`}`,o=n.get(a);o||(o={runtimePartIndex:i.runtimePartIndex,runtimePartType:i.runtimePartType,sourceRoot:e,count:0,sampleNames:[],samplePaths:[]},n.set(a,o)),o.count+=1,o.sampleNames.length<6&&(o.sampleNames.push(i.node.name),o.samplePaths.push(og(i.node))),r.length<12&&(i.runtimePartType===`hair`||i.node.name.toLowerCase().includes(`hair`)||(i.sourceBonePath??``).toLowerCase().includes(`hair`))&&r.push({name:i.node.name,path:og(i.node),sourceBonePath:i.sourceBonePath,runtimePartIndex:i.runtimePartIndex,runtimePartType:i.runtimePartType,resolvedIsSkinnedBone:t.has(i.node)})}return{counts:[...n.values()].sort((e,t)=>(e.runtimePartIndex??-1)-(t.runtimePartIndex??-1)||String(e.runtimePartType??``).localeCompare(String(t.runtimePartType??``))||String(e.sourceRoot??``).localeCompare(String(t.sourceRoot??``))),hairSamples:r}}function Hm(e,t,n,r,i,a,o,s){let c=r.tailPosition,l=Rp(n,new G),u=c.clone().sub(l);u.set(Math.fround(u.x),Math.fround(u.y),Math.fround(u.z));let d=Math.fround(u.length()),f=n.quaternion.clone(),p=Yh(n,c),m=H.clamp(ig(e.dynamicRatio)??.5,0,1),h=a.map(e=>({node:e.node,initialLength:Rp(e.node,new G).distanceTo(c)})),g=t.rawStiffnessForce??300,_=t.rawDragForce??t.dragForce??.4,v=Math.max(0,t.rawWindInfluence??1),y=ig(e.slowMotionScale)??1,b=e.isPaused===!0;return{managerPathId:ig(e.pathId),runtimePartIndex:ig(t.runtimePartIndex)??ig(e.runtimePartIndex),runtimePartType:t.runtimePartType??e.runtimePartType??t.partKind??e.partKind??null,springName:`${e.partKind??t.partKind??`Part`}:${e.nodeName??e.pathId??`manager`}`,sourceBoneName:t.nodeName??null,sourceBonePath:t.nodePath??null,sourceBonePathId:ig(t.pathId),pivotSourceName:t.pivotNodeName??null,pivotSourcePath:t.pivotNodePath??null,pivotResolvedPath:i?og(i):null,tailBinding:r,automaticUpdates:e.automaticUpdates!==!1,enabled:t.enabled!==!1,enableLengthLimits:e.enableLengthLimits!==!1,enableAngleLimits:e.enableAngleLimits!==!1,enableCollision:e.enableCollision!==!1,collideWithGround:e.collideWithGround===!0,groundHeight:e.groundHeight??0,isSumOfForcesOnBone:e.isSumOfForcesOnBone!==!1,isPaused:b,gravity:Jh(e.rawGravity),forceProviders:o,node:n,state:Yp(l,c),initialLocalRotation:f,initialLocalScale:n.scale.clone(),skinAnimationLocalRotation:f.clone(),boneAxis:p.axis,boneAxisSource:p.source,springLength:d,dynamicRatio:m,isAnimated:Nh(t,n,e),simulationFrameRate:ig(e.simulationFrameRate)??60,slowMotionScale:y,bounce:ig(e.bounce)??0,friction:ig(e.friction)??1,radius:Math.max(0,t.hitRadius??.05),stiffnessForce:g,dragForce:_,windInfluence:v,originalStiffnessForce:g,originalDragForce:_,originalWindInfluence:v,springForce:Jh(t.rawSpringForce),springConstant:t.rawSpringConstant??.5,lengthLimitTargets:h,angularStiffness:Math.max(0,t.rawAngularStiffness??100),pivotNode:i,yAngleLimit:jh(t.rawAngleLimits?.y),zAngleLimit:jh(t.rawAngleLimits?.z),colliders:s.colliders,colliderBindingDiagnostics:s.diagnostics,lastCollisionStatus:0,lastCollisionInfo:null,lastAngleLimitApplied:!1}}function Um(e,t,n){return(t.forceProviders??[]).map(t=>{let r=Wm(t),i=r?n.get(r):void 0;if(i)return i;let a=Gm(e,t);return a&&r&&n.set(r,a),a}).filter(e=>!!e)}function Wm(e){let t=typeof e.runtimePartIndex==`number`?`${e.runtimePartIndex}:`:``;return typeof e.sourcePathId==`number`?`${t}path:${e.sourcePathId}`:e.nodePath?`${t}nodePath:${e.nodePath}`:null}function Gm(e,t){let n=t.scriptName??``,r=n.endsWith(`WindVolumeOneSelf`),i=n.endsWith(`WindVolume`)&&!r,a=n.endsWith(`ForceVolume`)&&!i;if(!a&&!i&&!r)return null;let o=ch(e,t.nodePath,t.runtimePartIndex)??Km(e,t.nodeName),s=t.raw??{};if(!o||!$h(s,`m_Enabled`,!0)||t.activeSelf===!1||t.activeInHierarchy===!1)return null;let c={sourcePathId:ig(t.sourcePathId),node:o,springManagerPathId:ig(t.springManagerPathId)??eg(s,`<SpringManager>k__BackingField`)??eg(s,`_SpringManager_k__BackingField`)??eg(s,`springManager`)};return a?{kind:`ForceVolume`,...c,strength:Zh(s,`strength`,0)}:i?{kind:`WindVolume`,...c,weight:Zh(s,`weight`,0),strength:Zh(s,`strength`,0),period:Zh(s,`period`,0),positionalMultiplier:Zh(s,`positionalMultiplier`,0),timeFactor:Zh(s,`timeFactor`,0),offsetVector:Qh(s,`offsetVector`)}:{kind:`WindVolumeOneSelf`,...c,isActive:$h(s,`isActive`,!1),dynamicRatio:H.clamp(Zh(s,`dynamicRatio`,.5),0,1),simulationFrameRate:Math.max(0,Zh(s,`simulationFrameRate`,60)),weight:Zh(s,`weight`,0),strength:Zh(s,`strength`,0),period:Zh(s,`period`,0),currentTime:Zh(s,`currentTime`,0),spinPeriod:Zh(s,`spinPeriod`,0),spinTime:Zh(s,`spinTime`,0),amplitude:Zh(s,`amplitude`,0),peakDistance:Zh(s,`peakDistance`,0),additionalWindAngle:Zh(s,`additionalWindAngle`,0),additionalWindStrength:Zh(s,`additionalWindStrength`,0)}}function Km(e,t){if(!t)return null;let n=[...new Set(e.nodeByPath.values())].filter(e=>e.name===t);return n.length===1?n[0]:null}function qm(e,t,n,r){let i=new Map;for(let a of e.colliders??[]){if(typeof a.index!=`number`||!yh(a.nodePath,r))continue;let e=ch(t,a.nodePath,a.runtimePartIndex);if(!e){n.push(a.nodePath??a.nodeName??`collider:${a.index}`);continue}i.set(a.index,{source:a,node:e})}return i}function Jm(e,t,n){return{managerCount:e.managers?.length??0,boneSourceCount:e.bones?.length??0,colliderSourceCount:e.colliders?.length??0,bindingDecisionCount:e.bindingDecisions?.length??0,managerColliderCacheCount:e.managerColliderCaches?.length??0,officialSpringComponentCount:n.pathIds.size,rejectedUnverifiedBoneSourceCount:0,activeRootCount:t.size,activeRoots:[...t].sort((e,t)=>e.localeCompare(t))}}function Ym(e){let t=new Set,n=new Set,r=!1;for(let i of e.prefabGraphs??[]){Array.isArray(i.monoBehaviours)&&(r=!0);for(let e of i.monoBehaviours??[])Xm(e.scriptName)&&(typeof e.pathId==`number`&&t.add(e.pathId),e.transformPath&&n.add(uh(e.runtimePartIndex??-1,e.transformPath)))}return{hasComponentMetadata:r,pathIds:t,partPaths:n}}function Xm(e){let t=e?.trim().toLowerCase();return t===`springbone`||t===`sekaispringbone`}function Zm(e,t){return!t.hasComponentMetadata||typeof e.pathId==`number`&&t.pathIds.has(e.pathId)?!0:!!(e.nodePath&&t.partPaths.has(uh(e.runtimePartIndex??-1,e.nodePath)))}function Qm(e,t,n,r,i,a,o){if(!r&&!i)return{colliders:[],diagnostics:a?[Eh(t,n,r,i,null,null,null,`no per-bone collider binding; manager cache not used as fallback; ${Ah(a)}`,[])]:[]};let s=i?.sourceKind??r?.sourceKind??`direct`,c=xh(i?.candidateRoots??r?.collidersByRoot,o);if(s===`colliderFlag`&&c.size>0){let o=Ch(c,a),s=wh(e,t,n,i,r,o),l=s.root?o.get(s.root)??[]:[];return{colliders:l,diagnostics:[Eh(t,n,r,i,c,i?.defaultRoot??r?.defaultRoot,s.root,`${s.reason}; manager cache constrained; ${Ah(a)}`,l)]}}let l=Oh((i?.selectedColliderIndexes??r?.colliders??[]).map(e=>o.get(e)).filter(e=>!!e),t,n);return{colliders:l,diagnostics:[Eh(t,n,r,i,null,i?.defaultRoot??r?.defaultRoot,null,`${i?.selectedColliderIndexes?`bindingDecision.selectedColliderIndexes`:r?.colliders?`colliderBinding.colliders`:`no direct collider indexes`} / direct serialized collider references / pose root preference; ${Ah(a)}`,l)]}}function $m(e,t,n,r){t.updateMatrixWorld(!0);let i=Rp(t,new G),a=Hp(t,Fp(`right`)),o=Math.fround,s=new G(o(i.x-o(a.x*o(.1))),o(i.y-o(a.y*o(.1))),o(i.z-o(a.z*o(.1)))),c=e.nodePath?lh(n,e.nodePath,e.runtimePartIndex):void 0,l=c?th(c,n,r,e.runtimePartIndex):[],u=l.map(e=>e.source.name??e.node.name),d=l.map(e=>e.source.transformPath??og(e.node));if(l.length===0)return{mode:`fallback`,childCount:0,childNames:u,childPaths:d,childSources:[],tailPosition:s};if(l.length===1)return{mode:`singleChild`,childCount:1,childNames:u,childPaths:d,childSources:l.map(e=>e.source),tailPosition:Rp(l[0].node,new G)};let f=new G,p=0;for(let e of l){let t=Rp(e.node,new G);f.add(t),f.set(o(f.x),o(f.y),o(f.z));let n=t.clone().sub(i);n.set(o(n.x),o(n.y),o(n.z)),p=o(p+o(n.length()))}f.set(o(f.x/l.length),o(f.y/l.length),o(f.z/l.length)),p=o(p/l.length);let m=eh(i,f,p);return{mode:`averageChildren`,childCount:l.length,childNames:u,childPaths:d,childSources:l.map(e=>e.source),tailPosition:m}}function eh(e,t,n){let r=Math.fround,i=t.clone().sub(e);if(i.set(r(i.x),r(i.y),r(i.z)),i.lengthSq()<=1e-5*1e-5)i.copy(Im);else{let e=r(i.length());i.set(r(i.x/e),r(i.y/e),r(i.z/e))}return new G(r(e.x+r(i.x*r(n))),r(e.y+r(i.y*r(n))),r(e.z+r(i.z*r(n))))}function th(e,t,n,r){let i=[];for(let a of e.childPathIds??[]){let e=t.transformByPathId.get(a);if(!e||!nh(e,t))continue;let o=ch(n,e.transformPath,r??e.runtimePartIndex);o&&i.push({source:e,node:o})}return i}function nh(e,t){return typeof e.pathId==`number`&&t.pivotTransformPathIds.has(e.pathId)?!1:!e.transformPath||!t.pivotTransformPaths.has(e.transformPath)}function rh(e){let t=new Map,n=new Map,r=new Map,i=new Set,a=new Set;return ih(e,t,n,r),ah(e,n,i,a),{transformByPathId:t,transformByPath:n,transformByPartPath:r,pivotTransformPathIds:i,pivotTransformPaths:a}}function ih(e,t,n,r){for(let i of e.prefabGraphs??[])for(let e of i.transforms??[])typeof e.pathId==`number`&&t.set(e.pathId,e),e.transformPath&&(n.set(e.transformPath,e),typeof e.runtimePartIndex==`number`&&r.set(uh(e.runtimePartIndex,e.transformPath),e))}function ah(e,t,n,r){for(let i of e.prefabGraphs??[])for(let e of i.monoBehaviours??[]){if(e.scriptName?.toLowerCase()!==`springbonepivot`||!e.transformPath)continue;r.add(e.transformPath);let i=t.get(e.transformPath);typeof i?.pathId==`number`&&n.add(i.pathId)}}function oh(e){let t=new Map,n=new Map,r=new Map;return e.traverse(i=>{let a=og(i,e);if(!a)return;t.set(a,i);let o=sg(i,e);o&&o!==a&&r.set(o,i);let s=dh(i),c=i.userData.pjskTransformPath;for(let e of typeof c==`string`&&c.length>0?[c]:[])typeof s==`number`&&n.set(uh(s,e),i),t.has(e)||t.set(e,i)}),{nodeByPath:t,nodeByPartPath:n,canonicalNodeByPath:r}}function sh(e,t){return t?e.nodeByPath.get(t)??e.canonicalNodeByPath.get(t)??null:null}function ch(e,t,n){if(!t)return null;if(typeof n==`number`){let r=e.nodeByPartPath.get(uh(n,t));if(r)return r}return sh(e,t)}function lh(e,t,n){return typeof n==`number`?e.transformByPartPath.get(uh(n,t))??e.transformByPath.get(t):e.transformByPath.get(t)}function uh(e,t){return`${e}:${t}`}function dh(e){let t=e.userData.pjskRuntimePartIndex;return typeof t==`number`?t:void 0}function fh(e){let t=new Set;return e.traverse(e=>{let n=e;if(n.isSkinnedMesh)for(let e of n.skeleton.bones)t.add(e)}),t}function ph(e){let t=new Map;for(let n of e.bones??[])typeof n.pathId==`number`&&t.set(n.pathId,n);return t}function mh(e){let t=new Map;for(let n of e.colliderBindings??[])typeof n.sourceSpringBonePathId==`number`&&t.set(n.sourceSpringBonePathId,n);return t}function hh(e){let t=new Map;for(let n of e.bindingDecisions??[])typeof n.sourceSpringBonePathId==`number`&&t.set(n.sourceSpringBonePathId,n);return t}function gh(e,t){let n=new Map;for(let r of e.managerColliderCaches??[]){if(typeof r.managerPathId!=`number`)continue;let e=new Set;for(let n of[...r.sphereColliderIndexes??[],...r.capsuleColliderIndexes??[],...r.panelColliderIndexes??[]]){let i=typeof n==`number`?t.get(n):void 0;typeof n==`number`&&i&&_h(r,i)&&e.add(n)}n.set(r.managerPathId,{source:r,colliderIndexes:e})}return n}function _h(e,t){let n=e.managerNodePath??``,r=t.source.nodePath??``,i=t.source.shape;return n.endsWith(`/Position/PositionOffset/Hip`)?i?.sphere?/\/(?:Left_Thigh|Right_Thigh)\/CL_/.test(r)||/\/Hip\/CL_HipSphereCollider$/.test(r):!1:!0}function vh(e){return new Set((e.activeRootProfile?.activeRoots??[]).map(e=>qh(e)).filter(e=>!!e))}function yh(e,t){if(t.size===0)return!0;let n=qh(Kh(e));return n!==null&&t.has(n)}function bh(e,t){let n=[];for(let r of t.lengthLimitTargets??[]){let i=ch(e,r.nodePath,r.runtimePartIndex??t.runtimePartIndex);i&&n.push({node:i,initialLength:0})}return n}function xh(e,t){let n=new Map;for(let[r,i]of Object.entries(e??{})){let e=i.map(e=>t.get(e)).filter(e=>!!e);e.length>0&&n.set(r,e)}return n}function Sh(e,t){return!t||t.colliderIndexes.size===0?e:e.filter(e=>typeof e.source.index==`number`&&t.colliderIndexes.has(e.source.index))}function Ch(e,t){let n=new Map;for(let[r,i]of e.entries()){let e=Sh(i,t);e.length>0&&n.set(r,e)}return n}function wh(e,t,n,r,i,a){if(a.size===1)return{root:a.keys().next().value,reason:`single manager-cache root`};let o=qh(Kh(n.nodePath));if(o&&a.has(o))return{root:o,reason:`joint root matched candidate root`};let s=Th(e,t,o,a);if(s)return s;let c=qh(r?.defaultRoot);if(c&&a.has(c))return{root:c,reason:`bindingDecision.defaultRoot`};for(let t of e.activeRootProfile?.activeRoots??[]){let e=qh(t);if(e&&a.has(e))return{root:e,reason:`activeRootProfile active root`}}let l=qh(i?.defaultRoot);return l&&a.has(l)?{root:l,reason:`binding.defaultRoot`}:{root:null,reason:l?`binding.defaultRoot ${l} not available after manager cache`:`no matching root`}}function Th(e,t,n,r){if(t.partKind!==`Head`&&n!==`face`)return null;let i=qh(e.rootSelectionProfile?.defaultBodyRoot??e.activeRootProfile?.defaultBodyRoot);return i&&r.has(i)?{root:i,reason:`head/face uses runtime defaultBodyRoot`}:r.has(`body`)?{root:`body`,reason:`head/face body fallback`}:null}function Eh(e,t,n,r,i,a,o,s,c){return{sourceKind:r?.sourceKind??n?.sourceKind??`direct`,colliderFlag:r?.colliderFlag??n?.colliderFlag??null,colliderGroupIndex:null,springName:`${e.partKind??t.partKind??`Part`}:${e.nodeName??e.pathId??`manager`}`,boneName:t.nodeName??null,bonePath:t.nodePath??null,sourceSpringBonePathId:ig(t.pathId),candidateRoots:i?[...i.entries()].map(([e,t])=>({root:e,colliderCount:t.length,colliderSourcePathIds:t.map(e=>e.source.pathId).filter(e=>typeof e==`number`)})):[],defaultRoot:qh(a),selectedRoot:o,selectedColliderCount:c.length,selectedColliderSourcePathIds:c.map(e=>e.source.pathId).filter(e=>typeof e==`number`),selectionReason:s}}function Dh(e){return{...e,candidateRoots:e.candidateRoots.map(e=>({...e,colliderSourcePathIds:[...e.colliderSourcePathIds]})),selectedColliderSourcePathIds:[...e.selectedColliderSourcePathIds]}}function Oh(e,t,n){let r=kh(t,n);if(!r)return e;let i=new Map;for(let t of e){let e=t.source.nodeName??t.source.scriptName??``,n=i.get(e);n?n.push(t):i.set(e,[t])}return e.filter(e=>{let t=e.source.nodeName??e.source.scriptName??``,n=i.get(t);return!n||n.length<=1||!n.some(e=>e.source.nodePath?.startsWith(r))||e.source.nodePath?.startsWith(r)})}function kh(e,t){return t.nodePath?.startsWith(`sit_body/`)?`sit_body/`:t.nodePath?.startsWith(`body/`)||e.partKind===`Head`||t.nodePath?.startsWith(`face/`)?`body/`:null}function Ah(e){return e?`${e.source.managerNodeName??`manager`} manager cache (${e.source.sphereColliderIndexes?.length??0} sphere, ${e.source.capsuleColliderIndexes?.length??0} capsule, ${e.source.panelColliderIndexes?.length??0} panel)`:`no manager cache available`}function jh(e){return e?.active?{active:!0,min:e.min??0,max:e.max??0}:null}function Mh(e){return e.isAnimated?e.dynamicRatio:1}function Nh(e,t,n){let r=Ph(n.animatedBoneNames);return r.size===0?!1:r.has(t.name)||typeof e.nodeName==`string`&&r.has(e.nodeName)}function Ph(e){return Array.isArray(e)?new Set(e.filter(e=>typeof e==`string`)):new Set}function Fh(e,t,n){let r=t>0?1/t:e;return n===1?r:r*n}function Ih(e){let t=ag(e),n=ag(t?.pjskSpringBone??t?.PjskSpringBone),r=ag(n?.runtimeUnitySetup??n?.RuntimeUnitySetup),i=r?.version;return i===`0414`||i===414?r:null}function Lh(e){return{x:e.x,y:e.y,z:e.z,length:e.length()}}function Rh(e,t){if(t.springDebugAllOffsets)return e;let n=(t.springDebugBones??[]).map(e=>e.trim().toLowerCase()).filter(Boolean);return n.length===0?[]:e.filter(e=>{let t=[e.name,e.path,e.springName,e.sourceBoneName,e.sourceBonePath,e.pivotSourceName,e.pivotSourcePath,e.pivotResolvedPath].filter(e=>typeof e==`string`).join(`
`).toLowerCase();return n.some(e=>t.includes(e))})}function zh(e){return e.automaticUpdates?e.enabled?e.isPaused?`isPaused=true`:e.isSumOfForcesOnBone?null:`isSumOfForcesOnBone=false`:`enabled=false`:`automaticUpdates=false`}function Bh(e){return e?Lh(e):null}function Vh(e){return{x:e.x,y:e.y,z:e.z,w:e.w}}function Hh(e){return{currTipPos:Lh(e.currTipPos),prevTipPos:Lh(e.prevTipPos),hitNormal:Lh(e.hitNormal),cachedPosition:Lh(e.cachedPosition),cachedMovement:Lh(e.cachedMovement)}}function Uh(e){return{enabled:e.enableAngleLimits,hasPivot:!!e.pivotNode,pivotName:e.pivotNode?.name||null,pivotPath:e.pivotNode&&og(e.pivotNode)||null,vectorBefore:null,forward:null,back:null,down:null,yApplied:!1,zApplied:!1,afterY:null,afterZ:null,vectorAfter:null}}function Wh(e,t){return{kind:e.kind,name:e.debugName??null,path:e.debugPath??null,sourcePathId:e.debugSourcePathId??null,enabled:e.enabled!==!1,status:t.status,beforeTailPosition:Lh(t.beforeTailPosition),afterTailPosition:Lh(t.afterTailPosition),hitNormal:Lh(t.hitNormal),localHeadPosition:Bh(t.details.localHeadPosition),localTailPositionBefore:Bh(t.details.localTailPositionBefore),localTailPositionAfter:Bh(t.details.localTailPositionAfter),localTailRadius:t.details.localTailRadius??null,localSphereOrigin:Bh(t.details.localSphereOrigin),localSphereRadius:t.details.localSphereRadius??null,localCapsuleStart:Bh(t.details.localCapsuleStart),localCapsuleEnd:Bh(t.details.localCapsuleEnd),capsuleRadius:t.details.capsuleRadius??null,panelWidth:t.details.panelWidth??null,panelHeight:t.details.panelHeight??null}}function Gh(e){return{mode:e.mode,childCount:e.childCount,childNames:[...e.childNames],childPaths:[...e.childPaths],tailPosition:Lh(e.tailPosition)}}function Kh(e){if(!e)return null;let t=e.indexOf(`/`);return t<0?e:e.slice(0,t)}function qh(e){return e?e.endsWith(`/`)?e.slice(0,-1):e:null}function Jh(e){return Np(Array.isArray(e)?new G(e[0]??0,e[1]??0,e[2]??0):kp(e,new G))}function Yh(e,t){e.updateMatrixWorld(!0);let n=Xh(zp(e,t.clone()));return n?{axis:n,source:`computed-local-tip`}:{axis:Im.clone(),source:`fallback-local-tip`}}function Xh(e){let t=Math.fround(e.length());return t<=1e-5?null:new G(Math.fround(e.x/t),Math.fround(e.y/t),Math.fround(e.z/t))}function Zh(e,t,n){return ig(e[t]??e[tg(t)])??n}function Qh(e,t){let n=e[t]??e[tg(t)];return Array.isArray(n)||typeof n==`object`&&n?Jh(n):new G}function $h(e,t,n){let r=e[t]??e[tg(t)];return typeof r==`boolean`?r:typeof r==`number`?r!==0:n}function eg(e,t){let n=ag(e[t]??e[tg(t)]);return ig(n?.m_PathID??n?.m_pathID??n?.pathId)}function tg(e){return e.length>0?e[0].toUpperCase()+e.slice(1):e}function ng(e,t,n){return n>0?H.euclideanModulo(e+t,n):e+t}function rg(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function ig(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function ag(e){return e&&typeof e==`object`?e:null}function og(e,t){let n=[],r=e;for(;r&&r!==t;)r.name&&!r.name.startsWith(`Loaded:`)&&n.unshift(r.name),r=r.parent;return n.join(`/`)}function sg(e,t){let n=[],r=e;for(;r&&r!==t;)r.name&&!r.name.startsWith(`Loaded:`)&&n.unshift(cg(r.name)),r=r.parent;return n.join(`/`)}function cg(e){return e.replace(/_([1-9]\d*)$/,``)}function lg(e){return e.shape?.sphere?0:e.shape?.capsule?1:2}function ug(e){return e.getWorldScale(new G).x}function dg(e){let t=e.matrixWorld.elements;return Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2])}function fg(e){let t=e.elements;return Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2])}function pg(e){let t=0,n=e;for(;n;)t+=1,n=n.parent;return t}function mg(e,t){for(let n=e;n;n=n.parent)if(n===t)return!0;return!1}var hg=Math.PI/180,gg=[`XYZ`,`XZY`,`YXZ`,`YZX`,`ZXY`,`ZYX`],_g=class e{entries;sourceUnityQuaternion=new W;sourceUnityEuler=new Sn;targetUnityEuler=new Sn;targetUnityQuaternion=new W;targetQuaternion=new W;constructor(e){this.entries=e}static fromPjskRuntimeExtension(t,n){let r=yg(t);if(!r.length)return null;n.updateMatrixWorld(!0);let i=Cg(n),a=[];for(let e of r){let t=e.GameObject??e.gameObject??null,n=e.ReferenceBone??e.referenceBone??null,r=Eg(i,Mg(t?.TransformPath??t?.transformPath),Mg(t?.Name??t?.name)),o=Eg(i,Mg(n?.TransformPath??n?.transformPath),Mg(n?.Name??n?.name));if(!r||!o)continue;let s=gg[jg(e.RotationOrder??e.rotationOrder,4)]??`ZXY`;a.push({node:r,referenceNode:o,coefficient:jg(e.Coefficient??e.coefficient,1),defaultQuaternion:bg(e),axisX:Ng(e.AxisX??e.axisX,!0),axisY:Ng(e.AxisY??e.axisY,!0),axisZ:Ng(e.AxisZ??e.axisZ,!0),order:s})}return a.sort((e,t)=>Og(e.referenceNode)-Og(t.referenceNode)),a.length?new e(a):null}update(){for(let e of this.entries){this.sourceUnityQuaternion.set(e.referenceNode.quaternion.x,-e.referenceNode.quaternion.y,-e.referenceNode.quaternion.z,e.referenceNode.quaternion.w).normalize(),this.sourceUnityEuler.setFromQuaternion(this.sourceUnityQuaternion,`ZXY`),xg(this.sourceUnityEuler);let t=e.coefficient>0?-1:+(e.coefficient<0);this.targetUnityEuler.set(0,0,0,e.order),e.axisX&&(this.targetUnityEuler.x=this.sourceUnityEuler.x*t),e.axisY&&(this.targetUnityEuler.y=this.sourceUnityEuler.y*t),e.axisZ&&(this.targetUnityEuler.z=this.sourceUnityEuler.z*t),this.targetUnityQuaternion.setFromEuler(this.targetUnityEuler).invert(),this.targetQuaternion.copy(Pp(this.targetUnityQuaternion)),vg(e.node.quaternion,e.defaultQuaternion,this.targetQuaternion,Math.abs(e.coefficient)),e.node.updateMatrix(),e.node.updateMatrixWorld(!0)}}getControlledTrackNodeNames(){return new Set(this.entries.map(e=>e.node.name).filter(Boolean))}};function vg(e,t,n,r){let i=H.clamp(r,0,1),a=t.dot(n)<0?-1:1;return e.set(H.lerp(t.x,n.x*a,i),H.lerp(t.y,n.y*a,i),H.lerp(t.z,n.z*a,i),H.lerp(t.w,n.w*a,i)).normalize()}function yg(e){let t=kg(e),n=kg(t?.pjskSpringBone??t?.PjskSpringBone),r=kg(n?.raw??n?.Raw),i=[];for(let e of[r?.body??r?.Body,r?.head??r?.Head]){let t=kg(e),n=t?.extraBones??t?.ExtraBones;Array.isArray(n)&&i.push(...n.filter(Ag))}return i}function bg(e){let t=kg(e.DefaultEulerAngles??e.defaultEulerAngles)??{},n=jg(t.X??t.x,0),r=jg(t.Y??t.y,0),i=jg(t.Z??t.z,0);return Pp(new W().setFromEuler(new Sn(n*hg,r*hg,i*hg,`ZXY`)))}function xg(e){return e.x=Sg(e.x),e.y=Sg(e.y),e.z=Sg(e.z),e}function Sg(e){let t=Math.PI*2;return(e%t+t)%t}function Cg(e){let t=new Map,n=new Map;return e.traverse(r=>{if(r!==e){let e=n.get(r.name)??[];e.push(r),n.set(r.name,e)}for(let n of wg(e,r))t.set(n,r)}),{nodeByPath:t,nodeByName:n}}function wg(e,t){let n=Tg(t,e);if(!n)return[];let r=[n];return n.startsWith(`body/`)&&r.push(`sit_body/${n.slice(5)}`),r}function Tg(e,t){let n=[],r=e;for(;r&&r!==t;)r.name&&!r.name.startsWith(`Loaded:`)&&n.unshift(r.name),r=r.parent;return n.join(`/`)}function Eg(e,t,n){for(let n of Dg(t)){let t=e.nodeByPath.get(n);if(t)return t}return n?e.nodeByName.get(n)?.[0]??null:null}function Dg(e){if(!e)return[];let t=[e];return e.startsWith(`sit_body/`)&&t.push(`body/${e.slice(9)}`),t}function Og(e){let t=0,n=e.parent;for(;n;)t+=1,n=n.parent;return t}function kg(e){return e&&typeof e==`object`?e:null}function Ag(e){return!!kg(e)}function jg(e,t){return typeof e==`number`&&Number.isFinite(e)?e:t}function Mg(e){return typeof e==`string`?e:null}function Ng(e,t){return typeof e==`boolean`?e:typeof e==`number`?e!==0:t}function Pg(e){let t=String(e.roleId??``).trim();if(!/^\d+(?::[A-Za-z0-9_/-]+)?$/.test(t))throw Error(`roleId must be '<characterId>:<unit>' or '<characterId>'.`);let n=t=>{let n=e[t];if(!Number.isInteger(n)||Number(n)<=0)throw Error(`${t} must be a positive integer.`);return Number(n)},r=e.headPackagePath,i=r==null?null:String(r).trim();if(i!==null&&(i.length===0||i.length>1024||i.includes(`\0`)))throw Error(`headPackagePath must be null or a non-empty string of at most 1024 characters without NUL bytes.`);let a=e.headOptionalCostume3dId==null?null:n(`headOptionalCostume3dId`);return{roleId:t,bodyCostume3dId:n(`bodyCostume3dId`),headCostume3dId:n(`headCostume3dId`),headPackagePath:i,hairCostume3dId:n(`hairCostume3dId`),headOptionalCostume3dId:a}}var Fg=new G(.04835,.48222,.07241),Ig=new G(-.08532,.12848,1.93551),Lg=35,Rg=.46,zg=2.74,Bg=-.0245,Vg=.765,Hg={zoomDuration:.35,bottomLowerLimitPosition:.4,bottomUpperLimitPosition:.85,topLowerLimitPosition:1.25,topUpperLimitPosition:.85,nearZ:2.3,farZ:4.5,fov:25};function Ug(e){let t=Fg.clone().multiplyScalar(e);return{target:t,position:t.clone().add(Ig.clone().multiplyScalar(e)),fov:Lg,costumeShopState:null}}function Wg(e,t=0,n=1.6){let r=Number.isFinite(t)?t:0;if(e===`legacy-cloud`){let e=new G(0,Rg,0),t=new G(0,0,zg).applyAxisAngle(new G(0,1,0),H.degToRad(r));return{target:e,position:e.clone().add(t),fov:Hg.fov,costumeShopState:null}}let i=e===`official-default`?{cameraRootYawDegrees:r,zoomValue:0,zoomMoveValue:1}:{cameraRootYawDegrees:r,zoomValue:Hg.zoomDuration,zoomMoveValue:0},a=H.clamp(i.zoomValue,0,Hg.zoomDuration),o=Hg.zoomDuration>0?a/Hg.zoomDuration:0,s=H.lerp(Hg.bottomLowerLimitPosition,Hg.bottomUpperLimitPosition,o),c=H.lerp(Hg.topLowerLimitPosition,Hg.topUpperLimitPosition,o),l=H.clamp(i.zoomMoveValue,0,1),u=e===`full-body`?Vg:H.lerp(s,c,l),d=H.lerp(Hg.nearZ,Hg.farZ,o),f=H.degToRad(i.cameraRootYawDegrees),p=new G(0,u,d);return{target:new G(0,u,0),position:p.clone().applyAxisAngle(new G(0,1,0),f),fov:Hg.fov,costumeShopState:{cameraRootYawDegrees:i.cameraRootYawDegrees,zoomValue:a,zoomMoveValue:l,zoomRatio:o,localCameraPosition:p,localCameraRotationYDegrees:180}}}function Gg(e,t,n,r){let i=t.clone().sub(e).normalize(),a=new G().crossVectors(i,new G(0,1,0)).normalize().multiplyScalar(Bg*n*r);return{target:t.clone().add(a),position:e.clone().add(a)}}var Kg={minZoom:.5,maxZoom:3,minHeightOffset:-.5,maxHeightOffset:.8},qg={zoom:1,heightOffset:0};function Jg(e){let t=Kg,n=Number.isFinite(e.zoom)?e.zoom:qg.zoom,r=Number.isFinite(e.heightOffset)?e.heightOffset:qg.heightOffset;return{zoom:H.clamp(n,t.minZoom,t.maxZoom),heightOffset:H.clamp(r,t.minHeightOffset,t.maxHeightOffset)}}function Yg(e,t){let{zoom:n,heightOffset:r}=Jg(t),i=e.target.clone();i.y+=r;let a=e.position.clone().sub(e.target).divideScalar(n);return{target:i,position:i.clone().add(a)}}function Xg(e,t){let n=new zi(Qg(e,t));return n.colorSpace=tt,n}function Zg(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Qg(e,t){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`);if(!r)return n;let i=r.createLinearGradient(0,t,e,0);i.addColorStop(0,`#f9fffe`),i.addColorStop(.52,`#edfaff`),i.addColorStop(1,`#fff8fe`),r.fillStyle=i,r.fillRect(0,0,e,t);let a=r.createLinearGradient(0,0,e,t);a.addColorStop(0,`rgba(255, 246, 252, 0.34)`),a.addColorStop(1,`rgba(219, 246, 255, 0.40)`),r.fillStyle=a,r.fillRect(0,0,e,t),r.fillStyle=`rgba(255, 255, 255, 0.48)`,r.fillRect(0,0,e,t);let o=Zg(e*73856093^t*19349663),s=[[166,236,255],[214,206,255],[255,204,238],[255,237,182]],c=e/Math.max(t,1),l=Math.min(.12,Math.max(0,(c-1)*.08)),u=(e,t,n,i,a,o)=>{r.save(),r.translate(e,t),r.rotate(n),r.beginPath();for(let e=0;e<3;e+=1){let t=-Math.PI/2+e*Math.PI*2/3,n=Math.cos(t)*i*.56,a=Math.sin(t)*i*.56;e===0?r.moveTo(n,a):r.lineTo(n,a)}r.closePath(),r.fillStyle=`rgba(${a[0]}, ${a[1]}, ${a[2]}, ${o})`,r.fill(),r.restore()},d=(n,r)=>{for(let i=0;i<n;i+=1){let n=o(),i,a;if(n<.78){let n=o();n<.26?(i=(-.04+o()*.22)*e,a=o()*t):n<.5?(i=(.82-l+o()*(.21+l))*e,a=o()*t):n<.78?(i=o()*e,a=(-.04+o()*(.24+l*.5))*t):(i=o()*e,a=(.8-l*.8+o()*(.23+l*.8))*t)}else i=(.12+o()*.76)*e,a=(.12+o()*.76)*t;let c=(i-e*.5)/e*2,d=(a-t*.5)/t*2,f=Math.max(.28,c*c+d*d),p=r*(.72+o()*.46)*f,m=(.08+o()*.13)*Math.min(1.25,f+.25);u(i,a,o()*Math.PI*2,p,s[Math.floor(o()*s.length)],m)}},f=Math.min(e,t)/1e3;return d(Math.max(8,Math.round(18*f)),150*f),d(Math.max(24,Math.round(80*f)),72*f),n}var $g=[`Left_Toe`,`Right_Toe`],e_=.015,t_=.01,n_={width:.72,height:1.06,opacity:.28,crossSize:.46,crossOpacity:.22,floorY:0,adjustShadow:!1,adjustAlpha:!0,invisibleHeight:.2,directionalShadow:!1},r_=class{group=new Bn;defaultDirection=new G(0,0,1);settings={...n_};pairs=[];constructor(){let e=s_(),t=a_(),n=i_();for(let r of $g){let i=this.createShadowMaterial(e,this.settings.opacity),a=this.createShadowMaterial(e,this.settings.crossOpacity),o=new Bn,s=new Bn,c=new pi(t.clone(),i);c.name=`CharacterDirectionalShadow_${r}`,c.renderOrder=-100,c.scale.set(this.settings.width,1,this.settings.height),o.add(c);let l=new pi(n.clone(),a);l.name=`CharacterCrossShadow_${r}`,l.renderOrder=-99,l.scale.set(this.settings.crossSize,1,this.settings.crossSize),s.add(l),o.visible=this.settings.directionalShadow,s.visible=!this.settings.directionalShadow,this.group.add(o,s),this.pairs.push({targetWorldPosition:new G,initialToeHeight:null,directionalAnchor:o,crossAnchor:s,directionalMaterial:i,crossMaterial:a,directionalAlpha:this.settings.opacity})}t.dispose(),n.dispose(),this.group.name=`CharacterProjectedShadow`,this.group.visible=!1}setSettings(e={}){this.settings=c_(e,this.settings);for(let e of this.pairs)e.directionalAnchor.children[0]?.scale.set(this.settings.width,1,this.settings.height),e.crossAnchor.children[0]?.scale.set(this.settings.crossSize,1,this.settings.crossSize),e.directionalAnchor.visible=this.settings.directionalShadow,e.crossAnchor.visible=!this.settings.directionalShadow}update(e){let t=e.targetWorldPositions;if(this.group.visible=e.visible&&t.some(e=>e!==null),!this.group.visible){for(let e of this.pairs)e.initialToeHeight=null,e.targetWorldPosition.set(0,0,0);return}for(let[n,r]of this.pairs.entries()){let i=t[n];if(!i){r.directionalAnchor.visible=!1,r.crossAnchor.visible=!1,r.initialToeHeight=null,r.targetWorldPosition.set(0,0,0);continue}r.targetWorldPosition.copy(i),r.initialToeHeight??=i.y,r.directionalAnchor.visible=this.settings.directionalShadow,r.crossAnchor.visible=!this.settings.directionalShadow;let a=this.resolveDirection(i,e.lightWorldPosition),o=(i.y-this.settings.floorY)/Math.max(.001,e.characterModelScale),s=this.settings.height*o,c=i.x+a.x*s,l=i.z+a.z*s;r.directionalAnchor.position.set(this.settings.adjustShadow?i.x:c,this.settings.floorY+t_,this.settings.adjustShadow?i.z:l),r.directionalAnchor.rotation.y=Math.atan2(a.x,a.z),r.directionalAlpha=this.calculateDirectionalAlpha(r,i.y),r.directionalMaterial.opacity=r.directionalAlpha;let u=(i.y-this.settings.floorY)/this.settings.invisibleHeight,d=u<0?1:1-Math.min(u,1);r.crossAnchor.position.set(i.x,this.settings.floorY+e_,i.z),r.crossMaterial.opacity=this.settings.crossOpacity*d}}getDebugSnapshot(e){let t=this.pairs[0];t.directionalAnchor.updateMatrixWorld(!0),t.crossAnchor.updateMatrixWorld(!0);let n=new G(0,0,1).applyQuaternion(t.directionalAnchor.getWorldQuaternion(new W)).normalize(),r=this.pairs.reduce((e,t)=>e.add(t.targetWorldPosition),new G).multiplyScalar(1/Math.max(this.pairs.length,1));return{visible:this.group.visible,floorY:Number(this.settings.floorY.toFixed(4)),characterModelScale:Number(e.toFixed(4)),settings:{...this.settings},targetPosition:l_(r),targetPositions:this.pairs.map(e=>l_(e.targetWorldPosition)),directional:{position:l_(t.directionalAnchor.position),forward:l_(n),scale:l_(new G(this.settings.width,1,this.settings.height)),opacity:Number(t.directionalMaterial.opacity.toFixed(4)),alpha:Number(t.directionalAlpha.toFixed(4))},cross:{position:l_(t.crossAnchor.position),scale:l_(new G(this.settings.crossSize,1,this.settings.crossSize)),opacity:Number(t.crossMaterial.opacity.toFixed(4))},pairs:this.pairs.map(e=>({targetPosition:l_(e.targetWorldPosition),directionalOpacity:Number(e.directionalMaterial.opacity.toFixed(4)),crossOpacity:Number(e.crossMaterial.opacity.toFixed(4))}))}}dispose(){let e=new Set;this.group.traverse(t=>{let n=t;if(!n.isMesh)return;n.geometry.dispose();let r=Array.isArray(n.material)?n.material:[n.material];for(let t of r){let n=t.map;n&&e.add(n),t.dispose()}});for(let t of e)t.dispose()}createShadowMaterial(e,t){return new ti({color:`#000000`,map:e,transparent:!0,opacity:t,depthWrite:!1,depthTest:!0,polygonOffset:!0,polygonOffsetFactor:-1,side:2})}calculateDirectionalAlpha(e,t){if(!this.settings.adjustAlpha)return this.settings.opacity;let n=(t-(e.initialToeHeight??this.settings.floorY))/this.settings.invisibleHeight,r=n<0?1:1-Math.min(n,1);return this.settings.opacity*r}resolveDirection(e,t){if(!t)return this.defaultDirection.clone();let n=new G(e.x-t.x,0,e.z-t.z);return n.lengthSq()<1e-6?new G:n.normalize()}};function i_(){return o_([-.5,0,.5,.5,0,.5,-.5,0,-.5,.5,0,-.5])}function a_(){return o_([-.5,0,1,.5,0,1,-.5,0,0,.5,0,0])}function o_(e){let t=new Ur;return t.setAttribute(`position`,new jr(e,3)),t.setAttribute(`uv`,new jr([0,1,1,1,0,0,1,0],2)),t.setIndex([0,1,2,1,3,2]),t.computeVertexNormals(),t}function s_(e=128){let t=document.createElement(`canvas`);t.width=e,t.height=e;let n=t.getContext(`2d`);if(!n)throw Error(`Canvas 2D context is required for projected shadow texture.`);let r=n.createRadialGradient(e*.5,e*.5,e*.05,e*.5,e*.5,e*.5);r.addColorStop(0,`rgba(0, 0, 0, 0.72)`),r.addColorStop(.45,`rgba(0, 0, 0, 0.32)`),r.addColorStop(1,`rgba(0, 0, 0, 0.0)`),n.fillStyle=r,n.fillRect(0,0,e,e);let i=new zi(t);return i.colorSpace=``,i.wrapS=m,i.wrapT=m,i.needsUpdate=!0,i}function c_(e,t){let n=(e,t,n=0)=>Number.isFinite(e)?Math.max(e,n):t,r=(e,t)=>Number.isFinite(e)?H.clamp(e,0,1):t;return{width:n(e.width,t.width,.001),height:n(e.height,t.height,.001),opacity:r(e.opacity,t.opacity),crossSize:n(e.crossSize,t.crossSize,.001),crossOpacity:r(e.crossOpacity,t.crossOpacity),floorY:Number.isFinite(e.floorY)?e.floorY:t.floorY,adjustShadow:e.adjustShadow??t.adjustShadow,adjustAlpha:e.adjustAlpha??t.adjustAlpha,invisibleHeight:n(e.invisibleHeight,t.invisibleHeight,.001),directionalShadow:e.directionalShadow??t.directionalShadow}}function l_(e){return{x:Number(e.x.toFixed(5)),y:Number(e.y.toFixed(5)),z:Number(e.z.toFixed(5))}}function u_(e){let t=new Map;return e.traverse(n=>{if(n===e||!n.name)return;let r=[],i=[],a=n;for(;a&&a!==e;)a.name&&(r.push(a.name),i.push(a.name.replace(/_\d+$/,``))),a=a.parent;r.reverse(),i.reverse();for(let e=0;e<r.length;e+=1){let a=r.slice(e).join(`/`);a&&t.set(a,n);let o=i.slice(e).join(`/`);o&&t.set(o,n)}}),t}var d_=new G,f_=new W,p_=new G,m_=new W,h_=new W,g_=new G,__=new G,v_=new G(0,1,0),y_=7,b_=class{graph;setup;constraints;constructor(e,t,n){this.graph=e,this.setup=t,e.root.updateMatrixWorld(!0);let r=Array.isArray(t.constraints)?t.constraints:[];this.constraints=r.map(t=>C_(e,t,n))}update(){this.graph.root.updateMatrixWorld(!0);let e=this.constraints.map(w_);return this.graph.root.updateMatrixWorld(!0),S_(this.setup,e)}};function x_(e,t,n){if(!t)return null;let r=Array.isArray(t.constraints)?t.constraints:[];e.root.updateMatrixWorld(!0);let i=r.map(t=>C_(e,t,n)).map(w_);return e.root.updateMatrixWorld(!0),S_(t,i)}function S_(e,t){let n=t.filter(e=>e.resolvedOwner&&e.sources.length>0&&e.sources.every(e=>e.resolvedSource)).length;return{version:e.version??null,sourceKind:e.sourceKind??null,constraintCount:t.length,resolvedCount:n,unresolvedCount:t.length-n,appliedCount:t.filter(e=>e.applied).length,warnings:Array.isArray(e.warnings)?e.warnings.filter(e=>typeof e==`string`):[],constraints:t}}function C_(e,t,n){let r=X_(t.type)??`unknown`,i=X_(t.ownerPath),a=X_(t.ownerName),o=k_(e,i,a),s=k_(e,X_(t.worldUpObjectPath),X_(t.worldUpObjectName)).node,c=(Array.isArray(t.sources)?t.sources:[]).map(t=>E_(e,t,n));return{source:t,type:r,ownerPath:i,ownerName:a,owner:o,worldUpObject:s,sources:c,sourceDebug:c.map(e=>e.debug)}}function w_(e){let{source:t,type:n,ownerPath:r,ownerName:i,owner:a,worldUpObject:o,sources:s,sourceDebug:c}=e,l=(e,t)=>({type:n,status:e,reason:t,ownerPath:r,ownerName:i,resolvedOwner:!!a.node,applied:!1,sources:c});if(t.enabled===!1||t.active===!1)return l(`skipped`,`constraint component is disabled`);if(!a.node)return l(`unresolved`,a.reason);if(s.length===0)return l(`unresolved`,`constraint has no source transforms`);let u=s.find(e=>!e.node);if(u)return l(`unresolved`,u.debug.sourceName?`source transform ${u.debug.sourceName} was not uniquely resolved`:`constraint source transform was not resolved`);let d=s.filter(O_),f=a.node.position.clone(),p=a.node.quaternion.clone();if(n===`parent`)return A_(a.node,d)?(F_(a.node,t,f,p,!0,!0),T_(n,r,i,c,`parent constraint applied with height-scaled translation offsets`)):l(`skipped`,`parent constraint has no positive source weight`);if(n===`rotation`)return j_(a.node,d,t.rotationOffset)?(F_(a.node,t,f,p,!1,!0),T_(n,r,i,c,`rotation constraint applied with weighted source rotations`)):l(`skipped`,`rotation constraint has no positive source weight`);if(n===`aim`){let e=K_(t.aimVector,new G(0,0,1)),s=K_(t.upVector,new G(0,1,0)),u=N_(a.node,o,t.worldUpType,t.worldUpVector);return M_(a.node,d,e,s,u,t.rotationOffset)?(F_(a.node,t,f,p,!1,!0),T_(n,r,i,c,`aim constraint applied with exported aim/up vectors`)):l(`skipped`,`aim constraint target direction or source weight was invalid`)}return l(`skipped`,`unsupported constraint type ${n}`)}function T_(e,t,n,r,i){return{type:e,status:`applied`,reason:i,ownerPath:t,ownerName:n,resolvedOwner:!0,applied:!0,sources:r}}function E_(e,t,n){let r=X_(t.sourcePath),i=X_(t.sourceName),a=D_(e,r,i),o=Z_(t.weight)??1,s=W_(t.translationOffset,n),c=G_(t.rotationOffset);return{node:a.node,weight:o,translationOffset:s,rotationOffset:c,debug:{sourcePath:r,sourceName:i,weight:o,resolvedSource:!!a.node,translationOffset:s?{x:s.x,y:s.y,z:s.z}:null,rotationOffset:c?{x:c.x,y:c.y,z:c.z}:null}}}function D_(e,t,n){if(n){let t=null;if(e.root.traverse(e=>{!t&&e.name===n&&(t=e)}),t)return{node:t,reason:`rebound by transform name in the combined model`}}return k_(e,t,n)}function O_(e){return!!e.node}function k_(e,t,n){if(t){let n=e.nodeByPath.get(t);if(n)return{node:n,reason:`resolved by transform path`}}if(!n)return{node:null,reason:`constraint transform path and name are missing`};let r=[];for(let t of e.nodeByPath.values())t.name===n&&r.push(t);return r.length===1?{node:r[0],reason:`resolved by exact transform name`}:r.length>1?{node:null,reason:`transform name ${n} matched ${r.length} nodes`}:{node:null,reason:`transform name ${n} was not found`}}function A_(e,t){let n=t.reduce((e,t)=>e+Math.max(0,t.weight),0);if(n<=0)return!1;p_.set(0,0,0);let r=null,i=0;for(let e of t){let t=Math.max(0,e.weight);if(t<=0)continue;e.node.updateMatrixWorld(!0),e.node.getWorldPosition(d_),Ip(e.node,f_);let a=d_.clone().add((e.translationOffset??new G).clone().applyQuaternion(f_));p_.addScaledVector(a,t/n),r=H_(r,P_(f_,e.rotationOffset),i,t),i+=t}return r?(V_(e,p_,r),!0):!1}function j_(e,t,n){let r=U_(t);return r?(e.getWorldPosition(p_),V_(e,p_,P_(r,G_(n))),!0):!1}function M_(e,t,n,r,i,a){let o=t.reduce((e,t)=>e+Math.max(0,t.weight),0);if(o<=0)return!1;e.updateMatrixWorld(!0),e.getWorldPosition(p_),g_.set(0,0,0);for(let e of t){let t=Math.max(0,e.weight);t<=0||(e.node.updateMatrixWorld(!0),e.node.getWorldPosition(d_),g_.addScaledVector(d_,t/o))}if(g_.sub(p_),g_.lengthSq()<1e-6)return!1;g_.normalize();let s=J_(n,new G(0,0,1)),c=J_(r,new G(0,1,0));if(m_.setFromUnitVectors(s,g_),__.copy(c).applyQuaternion(m_),i){let e=J_(i,v_),t=Y_(__,g_),n=Y_(e,g_);if(t.lengthSq()>1e-6&&n.lengthSq()>1e-6){t.normalize(),n.normalize();let e=Math.atan2(g_.dot(new G().crossVectors(t,n)),H.clamp(t.dot(n),-1,1));m_.premultiply(new W().setFromAxisAngle(g_,e))}}return V_(e,p_,P_(m_,G_(a))),!0}function N_(e,t,n,r){switch(Z_(n)??0){case 1:return t?(e.getWorldPosition(p_),t.getWorldPosition(d_),d_.clone().sub(p_)):v_.clone();case 2:return t?q_(t,K_(r,v_)):K_(r,v_);case 3:return K_(r,v_);case 4:return null;default:return v_.clone()}}function P_(e,t){return t?e.clone().multiply(B_(t)).normalize():e.clone()}function F_(e,t,n,r,i,a){let o=H.clamp(Z_(t.weight)??1,0,1),s=e.position.clone(),c=e.quaternion.clone(),l=W_(t.translationAtRest,1)??n,u=t.rotationAtRest?B_(z_(t.rotationAtRest)):r;I_(e,t,n,l,s,o,i),L_(e,t,r,u,c,o,a),e.updateMatrix(),e.updateMatrixWorld(!0)}function I_(e,t,n,r,i,a,o){if(!o){e.position.copy(n);return}let s=Z_(t.translationAxis)??y_,c=r.clone().lerp(i,a);e.position.set(R_(s,1)?c.x:r.x,R_(s,2)?c.y:r.y,R_(s,4)?c.z:r.z)}function L_(e,t,n,r,i,a,o){if(!o){e.quaternion.copy(n);return}let s=Z_(t.rotationAxis)??y_,c=new Sn().setFromQuaternion(r,`ZXY`),l=new Sn().setFromQuaternion(i,`ZXY`),u=new Sn(R_(s,1)?l.x:c.x,R_(s,2)?l.y:c.y,R_(s,4)?l.z:c.z,`ZXY`);e.quaternion.copy(r).slerp(new W().setFromEuler(u),a).normalize()}function R_(e,t){return(e&t)!==0}function z_(e){return kp(e,new G)}function B_(e){return Pp(new W().setFromEuler(new Sn(H.degToRad(e.x),H.degToRad(e.y),H.degToRad(e.z),`ZXY`)))}function V_(e,t,n){let r=t.clone(),i=n.clone();e.parent&&(e.parent.updateMatrixWorld(!0),e.parent.worldToLocal(r),Ip(e.parent,h_),i.premultiply(h_.invert())),e.position.copy(r),e.quaternion.copy(i.normalize()),e.updateMatrix(),e.updateMatrixWorld(!0)}function H_(e,t,n,r){if(!e)return t.clone();let i=t.clone();return e.dot(i)<0&&i.set(-i.x,-i.y,-i.z,-i.w),e.slerp(i,r/(n+r)).normalize()}function U_(e){let t=null,n=0;for(let r of e){let e=Math.max(0,r.weight);e<=0||(r.node.updateMatrixWorld(!0),Ip(r.node,f_),t=H_(t,f_,n,e),n+=e)}return t}function W_(e,t){return!e||typeof e!=`object`?null:Mp(kp(e,new G)).multiplyScalar(t)}function G_(e){return!e||typeof e!=`object`?null:kp(e,new G)}function K_(e,t){return!e||typeof e!=`object`?t.clone():Np(kp(e,t))}function q_(e,t){return e.updateMatrixWorld(!0),Ip(e,m_),t.clone().applyQuaternion(m_)}function J_(e,t){return e.lengthSq()>1e-6?e.clone().normalize():t.clone().normalize()}function Y_(e,t){return e.clone().addScaledVector(t,-e.dot(t))}function X_(e){return typeof e==`string`?e:null}function Z_(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function Q_(e,t){let n=H.clamp(t||1,.5,2),r=e.nodeByPath.get(`body/Position`);if(!r)throw Error(`Official CharacterModel PositionNote 'body/Position' was not found.`);return r.scale.setScalar(n),r.updateMatrix(),e.root.updateMatrixWorld(!0),r}function $_(e){return e&&typeof e==`object`?e:{}}function ev(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function tv(e){let t=$_(e),n=$_(t.pjskSpringBone??t.PjskSpringBone),r=$_(t.runtimeUnitySetup??t.RuntimeUnitySetup??n.runtimeUnitySetup??n.RuntimeUnitySetup),i=r.version;return i===`0414`||i===414?r:null}function nv(e){let t=$_(e),n=$_(t.nativeMeshes??t.NativeMeshes),r=n.version;return r===`0414`||r===414?n:null}function rv(e,t){for(let n of t){if(!n)continue;let t=e.get(n);if(t)return{path:n,node:t}}return null}function iv(e){return e?.parentingMode===`model_combine_setup`}function av(e,t){e.parent&&e.parent.remove(e),t.add(e),e.updateMatrix()}function ov(e,t){for(;e.children.length>0;)av(e.children[0],t)}function sv(e,t,n){let r=[],i=new Set;for(let a of t){let t=e.get(a);t&&!i.has(t)&&(av(t,n),i.add(t),r.push(a))}return r}function cv(e,t,n){e.parent&&e.parent.remove(e);let r=new Set;e.traverse(e=>{e.userData.pjskModelCombineDestroyed=!0,r.add(e)});for(let[e,n]of t.entries())r.has(n)&&t.delete(e);for(let[e,t]of n.entries())r.has(t)&&n.delete(e)}function lv(e,t,n){for(let[r,i]of e.entries())i===t&&e.set(r,n)}function uv(e,t,n,r,i){let a=r.childMoveSuffix??`_target`,o=r.parentRootPath,s=r.childRootPath,c=rv(t,[r.parentCombineNodeAPath??r.parentAttachPath]),l=rv(t,[r.parentCombineNodeBPath]),u=rv(t,[r.childCombineNodeAPath??r.childOriginPath]),d=rv(t,[r.childCombineNodeBPath]),f=rv(t,[s]);if(!o||!s||!c||!l||!u||!d||!f)throw Error(`Official model_combine_setup paths were not fully resolved.`);ov(l.node,d.node);let p=c.node.parent,m=u.node.parent;if(p&&m){for(let e of[...p.children])e.name.endsWith(a)&&av(e,m);let e=sv(t,i,t.get(o)??p),n=i.filter(t=>!e.includes(t));if(n.length>0)throw Error(`Official model_combine_setup head renderers were not moved: ${n.join(`, `)}.`);let c=`${s}/${r.faceRendererName??`Face`}`;if(!e.includes(c))throw Error(`Official model_combine_setup face renderer '${c}' was not moved.`);av(u.node,p)}return u.node.position.copy(c.node.position),u.node.quaternion.copy(c.node.quaternion),u.node.scale.copy(c.node.scale),u.node.updateMatrix(),d.node.position.copy(l.node.position),d.node.quaternion.copy(l.node.quaternion),d.node.scale.copy(l.node.scale),d.node.updateMatrix(),lv(n,c.node,u.node),lv(n,l.node,d.node),cv(l.node,t,n),cv(c.node,t,n),cv(f.node,t,n),t.set(c.path,u.node),t.set(l.path,d.node),r.parentAttachPath&&t.set(r.parentAttachPath,u.node),r.parentCombineNodeBPath&&t.set(r.parentCombineNodeBPath,d.node),e.updateMatrixWorld(!0),{bodyNodeA:c,bodyNodeB:l,faceNodeA:u,faceNodeB:d}}function dv(e,t){return[...new Set((tv(e)?.prefabGraphs??[]).flatMap(e=>e.renderers??[]).filter(e=>e.typeName===`SkinnedMeshRenderer`).map(e=>e.transformPath).filter(e=>!!(e&&e.startsWith(`${t}/`))))]}function fv(e,t){let n=tv(e),r=n?.bodyHeadAssembly?.childRootPath,i=t.rendererTransformPath;if(!r||!i?.startsWith(`${r}/`))return!1;let a=(n.prefabGraphs??[]).flatMap(e=>e.renderers??[]).filter(e=>e.transformPath===i);return a.length>0&&a.every(e=>e.typeName!==`SkinnedMeshRenderer`)}function pv(e,t){return(nv(e)?.meshes??[]).find(e=>e.rendererTransformPath?.startsWith(`${t}/`)&&typeof e.rootBonePath==`string`)?.rootBonePath??null}function mv(e,t){let n=e,r=new Set;for(;typeof n.parentPathId==`number`;){if(typeof n.pathId==`number`){if(r.has(n.pathId))throw Error(`Runtime prefab graph contains a parent cycle at PathID ${n.pathId}.`);r.add(n.pathId)}let e=t.get(n.parentPathId);if(!e)break;n=e}return n}function hv(e){let t=e.transformPath?.split(`/`)[0];return t?`${e.runtimePartIndex??-1}:${t}`:null}function gv(e,t){let n=new Map;for(let r of nv(e)?.meshes??[]){if(typeof r.rendererTransformPathId!=`number`)continue;let e=t.get(r.rendererTransformPathId);if(!e)continue;let i=mv(e,t),a=hv(e);if(!a||typeof i.pathId!=`number`)continue;let o=n.get(a);if(o!==void 0&&o!==i.pathId)throw Error(`Runtime native meshes reference multiple Unity prefab instances for '${a}' (${o}, ${i.pathId}).`);n.set(a,i.pathId)}return n}function _v(e,t){let n=tv(e);if(!n?.prefabGraphs?.length)return null;let r=new Bn;r.name=`UnityPrefabSourceRoot`,r.userData.pjskUnityPrefabSourceGraph=!0;let i=wv(e);r.scale.setScalar(i.scale),r.userData.pjskSourceScaleCorrection=i;let{sourceByPathId:a,pathCounts:o}=vv(n),s=new Set([...o.entries()].filter(([,e])=>e>1).map(([e])=>e)),{nodeByPathId:c,nodeByPath:l}=yv(n,a,gv(e,a));xv(r,c,a),r.updateMatrixWorld(!0);let u=Cv(r),d=n.bodyHeadAssembly;if(!iv(d))throw Error(`Runtime package must provide the official model_combine_setup body/head assembly.`);let f=rv(l,[d.parentAttachPath]),p=rv(l,[d.childRootPath]),m=rv(l,[d.childOriginPath]);if(!f||!p||!m)throw Error(`Official model_combine_setup body/head roots were not fully resolved.`);let h=dv(e,p.path),g=uv(r,l,c,d,h),_=pv(e,f.path.split(`/`)[0]),v=_?l.get(_)??null:null,y=Cv(r),b=u-y,x=Sv(l,t),S={active:!0,sourcePath:g.bodyNodeA.path,targetPath:g.faceNodeA.path,reason:null,setupVersion:String(n.version??``),sourceScaleCorrection:i,mountedHeadRootCount:1,mountedHeadOriginPaths:[g.faceNodeA.path],assemblyCounts:{inputTransforms:u,retainedTransforms:y,removedTransforms:b,capturedCommonRemovedTransforms:14,removedAtLeastCapturedCommonCount:b>=14},targetCount:x.length,targetPaths:x.slice(0,24).map(e=>String(e.source.userData.pjskTransformPath??e.source.name)),keyNodes:{runtimeMount:null,modelCombineBodyNeck:ny(g.bodyNodeA.node,r),modelCombineFaceNeck:ny(g.faceNodeA.node,r)}};return{root:r,nodeByPath:l,nodeByPathId:c,ambiguousPaths:s,meshCarrierBindings:x,bodyAttach:g.faceNodeA.node,bodyAttachPath:f.path,headRoot:g.faceNodeA.node,headRootPath:g.faceNodeA.path,headOrigin:g.faceNodeA.node,headOriginPath:g.faceNodeA.path,bodyRootBone:v,bodyRootBonePath:_,headRendererPaths:h,debug:S}}function vv(e){let t=new Map,n=new Map;for(let r of e.prefabGraphs??[])for(let e of r.transforms??[])typeof e.pathId==`number`&&e.transformPath&&(t.set(e.pathId,e),n.set(e.transformPath,(n.get(e.transformPath)??0)+1));return{sourceByPathId:t,pathCounts:n}}function yv(e,t,n){let r=new Map,i=new Map;for(let a of e.prefabGraphs??[])for(let e of a.transforms??[])bv(e,t,n,r,i);return{nodeByPathId:r,nodeByPath:i}}function bv(e,t,n,r,i){if(typeof e.pathId!=`number`||!e.transformPath)return;let a=new zn;a.name=e.name??e.transformPath.split(`/`).pop()??`path_${e.pathId}`,a.userData.pjskTransformPath=e.transformPath,a.userData.pjskRuntimePartIndex=e.runtimePartIndex,a.userData.pjskPoseRoot=e.poseRoot??null,a.position.copy(Mp(kp(e.localPosition,new G))),a.quaternion.copy(Pp(Ap(e.localRotation))),a.scale.copy(kp(e.localScale,new G(1,1,1))),a.updateMatrix(),r.set(e.pathId,a);let o=mv(e,t),s=n.get(hv(e)??``);(s===void 0||s===o.pathId||!i.has(e.transformPath))&&i.set(e.transformPath,a)}function xv(e,t,n){for(let[r,i]of t.entries()){let a=n.get(r)?.parentPathId;((typeof a==`number`?t.get(a):null)??e).add(i)}}function Sv(e,t){if(!t)return[];let n=[],r=u_(t);for(let[t,i]of e.entries()){let e=r.get(t);e&&n.push({source:i,target:e})}return n}function Cv(e){let t=0;return e.traverse(n=>{n!==e&&(t+=1)}),t}function wv(e){let t=$_(e),n=$_(t.character??t.Character),r=$_(t.bodyManifest??t.BodyManifest);return{characterHeightMeters:ev(n.characterHeightMeters??n.CharacterHeightMeters??r.CharacterHeightMeters??r.characterHeightMeters),scale:1,reason:`presentation-module-applies-position-scale`}}function Tv(e,t){let n=nv(t),r=n?.meshes??[];if(!n||r.length===0)return{meshCount:0,boneCount:e.nodeByPath.size,skinnedMeshCount:0,skinBindings:[],error:`Unity runtime nativeMeshes version 0414 is missing or empty.`,warnings:n?.warnings??[]};let i=0,a=0,o=[],s=[...n.warnings??[]],c=[];e.root.updateMatrixWorld(!0);for(let n of r){if(fv(t,n))continue;let r=Ev(e,n,s,c);i+=+!!r.installed,a+=+!!r.skinned,r.skinBinding&&o.push(r.skinBinding)}return e.root.updateMatrixWorld(!0),{meshCount:i,boneCount:e.nodeByPath.size,skinnedMeshCount:a,skinBindings:o,error:c.length>0?c.join(` `):i>0?null:`Unity runtime nativeMeshes did not produce any renderable mesh.`,warnings:s}}function Ev(e,t,n,r){let i=t.bonePaths??[],a=t.bonePathIds??[];if(!Ov(e,t,i,a,n,r))return{installed:!1,skinned:!1};let o=kv(e,t,n,r);if(!o)return{installed:!1,skinned:!1};let s=Bv(t);if(!s){let e=`Native mesh '${Dv(t)}' skipped: invalid geometry payload.`;return n.push(e),r.push(e),{installed:!1,skinned:!1}}if(!t.submeshes?.length||s.groups.length!==t.submeshes.length){s.dispose();let e=`Native mesh '${Dv(t)}' has no exact submesh/material-slot mapping.`;return n.push(e),r.push(e),{installed:!1,skinned:!1}}let c=Av(t,s),l=t.meshName??t.meshPath?.split(`/`).pop()??`UnityNativeMesh`,u=jv(e,i,a);if(i.length>0&&u.length!==i.length){let e=`Native mesh '${t.meshPath??l}' skipped: ${i.length-u.length} skin bones were unresolved.`;return n.push(e),r.push(e),s.dispose(),{installed:!1,skinned:!1}}let d=i.length>0?new Ti(s,c):new pi(s,c);Mv(d,l,t,o);let f=d instanceof Ti?Nv(e,t,d,u,l,n):void 0;return{installed:!0,skinned:d instanceof Ti,skinBinding:f}}function Dv(e){return e.meshPath??e.meshName??`<unnamed>`}function Ov(e,t,n,r,i,a){let o=[...typeof t.rendererTransformPathId==`number`?[]:[t.rendererTransformPath],...r.length===0?n:[],...typeof t.rootBonePathId==`number`?[]:[t.rootBonePath]].filter(t=>!!(t&&e.ambiguousPaths.has(t)));if(o.length>0){let e=`Native mesh '${Dv(t)}' has an ambiguous legacy PathID-less skin binding (${[...new Set(o)].join(`, `)}); regenerate it with a current Haruki-3D-Exporter.`;return i.push(e),a.push(e),!1}if(r.length>0&&r.length!==n.length){let e=`Native mesh '${Dv(t)}' has ${n.length} bone paths but ${r.length} bone PathIDs; regenerate it with a current Haruki-3D-Exporter.`;return i.push(e),a.push(e),!1}return!0}function kv(e,t,n,r){let i=t.rendererTransformPath,a=typeof t.rendererTransformPathId==`number`?e.nodeByPathId.get(t.rendererTransformPathId):i?e.nodeByPath.get(i):null;if(a)return a;let o=`Native mesh '${Dv(t)}' skipped: renderer transform '${i??`<null>`}' was not found.`;return n.push(o),r.push(o),null}function Av(e,t){return(e.submeshes??[]).map((n,r)=>{if(!n.materialKey||typeof n.slotIndex!=`number`)throw Error(`Native mesh '${Dv(e)}' has a submesh without material identity; regenerate it with Haruki-3D-Exporter materialKey runtime support.`);if(n.slotIndex!==r)throw Error(`Native mesh '${Dv(e)}' material slot ${n.slotIndex} is out of order; expected ${r}.`);let i=new ti({color:16777215,vertexColors:t.hasAttribute(`color`)});return i.name=n.materialName??e.meshName??e.meshPath??`native_material`,i.userData.pjskMaterialKey=n.materialKey,i.userData.pjskMaterialSlotIndex=n.slotIndex,i.userData.pjskPlaceholderMaterial=!0,i})}function jv(e,t,n){return t.map((t,r)=>n.length>0?e.nodeByPathId.get(n[r]):e.nodeByPath.get(t)).filter(e=>!!e)}function Mv(e,t,n,r){e.name=t,e.userData.pjskNativeUnityMesh=!0,e.userData.pjskPartKind=n.partKind??null,e.userData.pjskRendererPathId=n.rendererPathId??null,e.frustumCulled=!1,r.add(e)}function Nv(e,t,n,r,i,a){e.root.updateMatrixWorld(!0),n.updateMatrixWorld(!0);let o=zv(t,r.length,a),s=n.matrixWorld.clone();Pv(o,s);let c=new Ai(r,o.length>0?o:void 0);return o.length===0&&c.calculateInverses(),n.bind(c,s),Fv(e,t,i,r,c)}function Pv(e,t){if(e.length===0)return;let n=t.clone().invert();for(let t of e)t.multiply(n)}function Fv(e,t,n,r,i){let a=t.rendererTransformPath,o=!!(a&&e.headRendererPaths.includes(a)),s=Iv(e,t);return{meshName:n,partKind:t.partKind??null,rendererTransformPath:a??null,rootBonePath:t.rootBonePath??null,rootBoneResolved:s,effectiveRootBonePath:o?e.bodyRootBonePath:t.rootBonePath??null,effectiveRootBoneResolved:o?!!e.bodyRootBone:s,boneCount:r.length,...Lv(r[0],i.boneInverses[0]),...Rv(r,i.boneInverses)}}function Iv(e,t){return typeof t.rootBonePathId==`number`?e.nodeByPathId.has(t.rootBonePathId):t.rootBonePath?e.nodeByPath.has(t.rootBonePath):!1}function Lv(e,t){let n=new J().multiplyMatrices(e.matrixWorld,t),r=new G,i=new W,a=new G;return n.decompose(r,i,a),{restTranslation:ey(r),restScale:ey(a)}}function Rv(e,t){if(e.length<2||t.length!==e.length)return{restMatrixSpread:0,restMatrixSpreadBonePath:null};let n=new J().multiplyMatrices(e[0].matrixWorld,t[0]),r=new J,i=0,a=null;for(let o=1;o<e.length;o+=1){r.multiplyMatrices(e[o].matrixWorld,t[o]);for(let t=0;t<16;t+=1){let s=Math.abs(r.elements[t]-n.elements[t]);s>i&&(i=s,a=String(e[o].userData.pjskTransformPath??e[o].name))}}let o=Number(i.toFixed(6));return{restMatrixSpread:o,restMatrixSpreadBonePath:o>0?a:null}}function zv(e,t,n){let r=e.boneInverseBindMatrices??[];if(t===0||r.length===0){if(t===0&&r.length===0)return[];throw Error(`Native mesh inverse bind matrices are missing for ${t} bones.`)}if(r.length!==t*16)throw Error(`Native mesh '${e.meshPath??e.meshName??`<unnamed>`}' has ${r.length} inverse bind matrix floats for ${t} bones; expected ${t*16}.`);let i=[];for(let e=0;e<r.length;e+=16)i.push(new J().fromArray(r,e));return i}function Bv(e){let t=e.positions??[];if(t.length===0||t.length%3!=0)return null;let n=t.length/3,r=new Ur;return r.setAttribute(`position`,new jr(t,3)),Vv(r,e,n),Wv(r,e,n),Gv(r,e.morphTargets??[],n),r.computeBoundingSphere(),r}function Vv(e,t,n){for(let[e,r]of[[`normals`,3],[`tangents`,4],[`uv0`,2],[`uv1`,2],[`uv2`,2],[`colors`,4],[`skinIndices`,4],[`skinWeights`,4]])Kv(t,e,n*r);if((t.skinIndices?.length??0)!==(t.skinWeights?.length??0))throw Error(`Native mesh '${Dv(t)}' has incomplete skin indices/weights.`);Hv(e,`normal`,t.normals,3,n),t.tangents?.length===n*4&&e.setAttribute(`tangent`,new jr(t.tangents,4)),Hv(e,`uv`,t.uv0,2,n),Hv(e,`uv1`,t.uv1,2,n),t.uv2?.length===n*2&&e.setAttribute(`uv2`,new jr(t.uv2,2)),Hv(e,`color`,t.colors,4,n),Uv(e,`skinIndex`,t.skinIndices,4,n),Hv(e,`skinWeight`,t.skinWeights,4,n)}function Hv(e,t,n,r,i){n?.length===i*r&&e.setAttribute(t,new jr(n,r))}function Uv(e,t,n,r,i){n?.length===i*r&&e.setAttribute(t,new kr(n,r))}function Wv(e,t,n){let r=t.submeshes??[],i=[];for(let a of r){let r=i.length,o=a.indices??[];if(o.length===0||o.some(e=>!Number.isInteger(e)||e<0||e>=n))throw Error(`Native mesh '${t.meshPath??t.meshName??`<unnamed>`}' has invalid submesh indices.`);i.push(...o),e.addGroup(r,o.length,e.groups.length)}i.length>0&&e.setIndex(i)}function Gv(e,t,n){let r=[],i=[],a=[],o=new Set;for(let e of t){let t=e.name;if(typeof t!=`string`||t.trim().length===0)throw Error(`Native mesh 'native geometry' has a morph target without a name.`);if(o.has(t))throw Error(`Native mesh 'native geometry' has duplicate target name '${t}'.`);if(o.add(t),e.hasPositionDeltas!==!0)throw Error(`Native morph target '${t}' must explicitly declare position deltas present with hasPositionDeltas=true.`);if(typeof e.hasNormalDeltas!=`boolean`)throw Error(`Native morph target '${t}' must explicitly declare hasNormalDeltas.`);if(typeof e.hasTangentDeltas!=`boolean`)throw Error(`Native morph target '${t}' must explicitly declare hasTangentDeltas.`);let s=e.indices,c=e.positionDeltas,l=e.normalDeltas,u=e.tangentDeltas;if(!s||s.length===0)throw Error(`Native morph target '${t}' must contain a non-empty indices array.`);if(!c||c.length!==s.length*3)throw Error(`Native morph target '${t}' has invalid positionDeltas length.`);if(!l||l.length!==(e.hasNormalDeltas?s.length*3:0))throw Error(`Native morph target '${t}' has invalid normalDeltas length for hasNormalDeltas=${e.hasNormalDeltas}.`);if(!u||u.length!==(e.hasTangentDeltas?s.length*3:0))throw Error(`Native morph target '${t}' has invalid tangentDeltas length for hasTangentDeltas=${e.hasTangentDeltas}.`);if(!Array.from(c).every(Number.isFinite)||!Array.from(l).every(Number.isFinite)||!Array.from(u).every(Number.isFinite))throw Error(`Native morph target '${t}' delta arrays must contain only finite numbers.`);let d=new Float32Array(n*3),f=e.hasNormalDeltas?new Float32Array(n*3):null,p=e.hasTangentDeltas?new Float32Array(n*3):null,m=new Set;for(let e=0;e<s.length;e+=1){let r=s[e];if(!Number.isInteger(r)||r<0||r>=n)throw Error(`Native morph target '${t}' has invalid vertex index ${r}.`);if(m.has(r))throw Error(`Native morph target '${t}' has duplicate vertex index ${r}.`);m.add(r),d[r*3]=c[e*3],d[r*3+1]=c[e*3+1],d[r*3+2]=c[e*3+2],f&&(f[r*3]=l[e*3],f[r*3+1]=l[e*3+1],f[r*3+2]=l[e*3+2]),p&&(p[r*3]=u[e*3],p[r*3+1]=u[e*3+1],p[r*3+2]=u[e*3+2])}let h=new Or(d,3);if(h.name=t,r.push(h),f){let e=new Or(f,3);e.name=t,i.push(e)}if(p){let e=new Or(p,3);e.name=t,a.push(e)}}if(r.length>0&&(e.morphAttributes.position=r,e.morphTargetsRelative=!0),i.length>0&&i.length!==r.length)throw Error(`Native mesh 'native geometry' has mixed normal delta presence across morph targets.`);if(i.length>0&&(e.morphAttributes.normal=i),a.length>0&&a.length!==r.length)throw Error(`Native mesh 'native geometry' has mixed tangent delta presence across morph targets.`);if(a.length>0){let t=e.morphAttributes;t.tangent=a;let r=e.getAttribute(`tangent`);if(!r||r.itemSize!==4||r.count!==n)throw Error(`Native morph tangent deltas require a complete base tangent attribute.`)}}function Kv(e,t,n){let r=e[t]??[];if(r.length!==0&&r.length!==n)throw Error(`Native mesh '${e.meshPath??e.meshName??`<unnamed>`}' attribute '${t}' has ${r.length} values; expected ${n}.`)}function qv(e,t,n,r){e.root.updateMatrixWorld(!0);let i=r?r.update():x_(e,tv(t)?.constraintSetup,n);for(let t of e.meshCarrierBindings)t.target.position.copy(t.source.position),t.target.quaternion.copy(t.source.quaternion),t.target.scale.copy(t.source.scale),t.target.updateMatrix();return e.root.updateMatrixWorld(!0),i}function Jv(e,t,n){let r=tv(t)?.constraintSetup;return r?new b_(e,r,n):null}function Yv(e,t,n){let r={...e?.debug??n,setupVersion:Xv(t)};if(!e)return r;let i=e.root;i.updateMatrixWorld(!0);let a=tv(t)?.bodyHeadAssembly,o=u_(i),s=t=>{let n=rv(e.nodeByPath,t)??Zv(o,t);return n?ny(n.node,i):null},c=s([a?.parentCombineNodeAPath??``,e.debug.sourcePath??``,`body/Position/PositionOffset/Hip/Waist/Spine/Chest/Neck`,`body/Position/Hip/Waist/Spine/Chest/Neck`]),l=s([a?.parentCombineNodeBPath??``,e.debug.sourcePath?`${e.debug.sourcePath}/Head`:``,`body/Position/PositionOffset/Hip/Waist/Spine/Chest/Neck/Head`,`body/Position/Hip/Waist/Spine/Chest/Neck/Head`]),u=s([`face/Position`]),d=s([a?.childCombineNodeAPath??``,e.debug.targetPath??``,`face/Position/Hip/Waist/Spine/Chest/Neck`]),f=s([a?.childCombineNodeBPath??``,e.debug.targetPath?`${e.debug.targetPath}/Head`:``,`face/Position/Hip/Waist/Spine/Chest/Neck/Head`]),p=s([`mdl_chr_IDL_A_00/Position`,`mdl_chr_IDL_A_00/Position_4`]);return{...r,positionRoots:ry(i),assemblyDistances:{bodyNeckToFaceNeck:null,bodyHeadToFaceHead:null},keyNodes:{...r.keyNodes??{},bodyNeck:c,bodyHead:l,facePosition:u,faceNeck:d,faceHead:f,meshContainerPosition:p}}}function Xv(e){let t=$_(e),n=$_(t.pjskSpringBone??t.PjskSpringBone),r=$_(t.runtimeUnitySetup??t.RuntimeUnitySetup??n.runtimeUnitySetup??n.RuntimeUnitySetup);return String(r.version??r.Version??``)}function Zv(e,t){for(let n of t){let t=e.get(n);if(t)return{node:t,path:n}}return null}function Qv(e){return e.replace(/_\d+$/,``)}function $v(e,t,n=!1){let r=[],i=e;for(;i&&i!==t;)i.name&&r.push(n?Qv(i.name):i.name),i=i.parent;return r.reverse().join(`/`)}function ey(e){return{x:Number(e.x.toFixed(5)),y:Number(e.y.toFixed(5)),z:Number(e.z.toFixed(5))}}function ty(e){return{x:Number(e.x.toFixed(5)),y:Number(e.y.toFixed(5)),z:Number(e.z.toFixed(5)),w:Number(e.w.toFixed(5))}}function ny(e,t){e.updateMatrixWorld(!0);let n=new G,r=new W,i=new G(0,0,1);return e.getWorldPosition(n),Ip(e,r),i.applyQuaternion(r).normalize(),{path:$v(e,t),canonicalPath:$v(e,t,!0),parentPath:e.parent&&e.parent!==t?$v(e.parent,t):null,destroyed:e.userData.pjskModelCombineDestroyed===!0,localPosition:ey(e.position),localQuaternion:ty(e.quaternion),worldPosition:ey(n),worldQuaternion:ty(r),worldForward:ey(i)}}function ry(e){let t=[],n=new Set;return e.updateMatrixWorld(!0),e.traverse(r=>{if(r===e||!r.name||n.has(r))return;let i=$v(r,e,!0),a=i===`face/Position`,o=i===`body/Position`,s=i.endsWith(`/Position`)&&i.split(`/`).some(e=>e.startsWith(`mdl_chr_`));(a||o||s)&&(n.add(r),t.push(ny(r,e)))}),t}var iy=1.6;function ay(e){return .5+.8/sy(e)}function oy(e){return ay(e)}function sy(e){return H.clamp(e||iy,.5,2)}function cy(e){return e&&typeof e==`object`?e:{}}function ly(e,t){return/(?:^|[_-])loop$/i.test(e??``)||/(?:^|[_-])loop(?:\.json)?$/i.test(t?.split(`/`).pop()??``)}function uy(e,t,n,r,i=1e-4){let a=n*t,o=r*t;for(let n=0;n<t;n+=1)if(Math.abs(e[a+n]-e[o+n])>i)return!1;return!0}function dy(e,t){let n=e[t],r=e[t+1],i=e[t+2],a=e[t+3],o=Math.hypot(n,r,i,a);if(o<1e-8){e[t]=0,e[t+1]=0,e[t+2]=0,e[t+3]=1;return}e[t]=n/o,e[t+1]=r/o,e[t+2]=i/o,e[t+3]=a/o}function fy(e,t){if(t===4)for(let n=t;n<e.length;n+=t){let r=n-t;e[r]*e[n]+e[r+1]*e[n+1]+e[r+2]*e[n+2]+e[r+3]*e[n+3]<0&&(e[n]*=-1,e[n+1]*=-1,e[n+2]*=-1,e[n+3]*=-1)}}function py(e,t,n,r,i,a,o,s,c){let l=Math.max(o-a,1e-6),u=H.clamp((c-a)/l,0,1),d=u*u,f=d*u,p=(n-e)/Math.max(o-i,1e-6),m=(r-t)/Math.max(s-a,1e-6),h=2*f-3*d+1,g=f-2*d+u,_=-2*f+3*d,v=f-d;return h*t+g*l*p+_*n+v*l*m}function my(e,t,n){let r=e instanceof Sa,i=e instanceof wa&&e.name.endsWith(`.position`);if(!r&&!i)return e.clone();let a=hy(e,t);if(!a)return e.clone();let{stride:o,times:s,values:c}=a;return r&&fy(c,o),gy(e,t,n,s,c,r)}function hy(e,t){let n=e.getValueSize(),r=Array.from(e.times),i=Array.from(e.values),a=r.length;return a<3||t<=0?null:(Math.abs(r[a-1]-t)<.001&&uy(i,n,0,a-1)&&--a,a<3?null:{stride:n,times:r.slice(0,a),values:i.slice(0,a*n)})}function gy(e,t,n,r,i,a){let o=e.getValueSize(),s=r.length,c=Math.max(2,Math.round(t*n)),l=new Float32Array(c+1),u=new Float32Array((c+1)*o),d=0;for(let e=0;e<=c;e+=1){let n=e===c?t:t*e/c;if(l[e]=n,e===c){_y(u,e*o,o);continue}for(;d<s-1&&n>r[d+1];)d+=1;yy(u,e*o,o,i,vy(r,d,t),n),a&&dy(u,e*o)}return a?new Sa(e.name,l,u):new wa(e.name,l,u)}function _y(e,t,n){for(let r=0;r<n;r+=1)e[t+r]=e[r]}function vy(e,t,n){let r=e.length,i=t,a=t+1<r?t+1:0,o=(i-1+r)%r,s=(a+1)%r;return{indexes:[o,i,a,s],times:[e[o]-(o>=i?n:0),e[i],e[a]+(a<=i?n:0),e[s]+(s<=i?n:0)]}}function yy(e,t,n,r,i,a){let[o,s,c,l]=i.indexes,[u,d,f,p]=i.times;for(let i=0;i<n;i+=1)e[t+i]=py(r[o*n+i],r[s*n+i],r[c*n+i],r[l*n+i],u,d,f,p,a)}function by(e){let t=e.tracks.filter(e=>e.times.length>2);return t.length?t.some(t=>t.times.length<Math.max(12,e.duration*24)):!1}function xy(e,t=60){return by(e)?new Ta(e.name,e.duration,e.tracks.map(n=>my(n,e.duration,t))):e}function Sy(e){return/^(Head|Neck)\.(position|quaternion|scale)$/.test(e.name)}function Cy(e,t=new Set){if(!e)return null;let n=e.tracks.filter(e=>/hair/i.test(e.name)),r=e.tracks.filter(e=>/^Head\./.test(e.name)),i=e.tracks.filter(e=>/^Neck\./.test(e.name)),a=e.tracks.filter(e=>/^(Position|Hip|Waist|Spine|Chest|Neck|Head)\./.test(e.name)),o=e.tracks.filter(e=>/\.(position|quaternion|scale)$/.test(e.name)),s=e.tracks.filter(e=>wy(e,t));return{trackCount:e.tracks.length,transformTrackCount:o.length,hairTrackCount:n.length,headTrackCount:r.length,neckTrackCount:i.length,upperBodyTrackCount:a.length,utjControlledTrackCount:s.length,sampleHairTracks:n.slice(0,12).map(e=>e.name),sampleHeadTracks:[...r,...i].slice(0,12).map(e=>e.name),sampleUtjControlledTracks:s.slice(0,12).map(e=>e.name)}}function wy(e,t){if(t.size===0)return!1;let n=e.name.split(`.`)[0];return t.has(n)}function Ty(e){return e.tracks.some(Sy)?new Ta(`${e.name||`motion`}_no_head_tracks`,e.duration,e.tracks.filter(e=>!Sy(e))):e}function Ey(e,t){return t?e:Ty(e)}function Dy(e){return/(?:^|\/)unity-motion\.msgpack\.br(?:$|[?#])/i.test(e)}function Oy(e,t){return e?t??(Dy(e)?`unity-json`:null):null}function ky(e,t){return`${t??`unknown`}:${e}`}function Ay(e){let t=cy(e),n=String(t.version??t.Version??``),r=t.clips??t.Clips;if(n!==`0414`||!Array.isArray(r))throw Error(`Unity motion runtime must be version 0414 and contain clips.`);let i=r.map(jy);if(!i.length)throw Error(`Unity motion runtime contains no clips.`);return{version:n,clips:i}}function jy(e){let t=cy(e),n=String(t.name??t.Name??`motion`),r=t.tracks??t.Tracks;if(!Array.isArray(r))throw Error(`Unity motion clip ${n} contains no tracks.`);let i=r.map(My);if(!i.length)throw Error(`Unity motion clip ${n} contains no valid tracks.`);return{name:n,tracks:i}}function My(e){let t=cy(e),n=String(t.nodeKey??t.NodeKey??``),r=String(t.property??t.Property??``),i=Number(t.componentCount??t.ComponentCount),a=Ny(t.times??t.Times),o=Ny(t.values??t.Values);if(!n||!r||!Number.isInteger(i))throw Error(`Unity motion track is missing nodeKey, property, or componentCount.`);if(!a.length||o.length!==a.length*i)throw Error(`Unity motion track ${n}.${r} has inconsistent sample arrays.`);return{nodeKey:n,property:r,componentCount:i,times:a,values:o}}function Ny(e){if(e instanceof Float32Array||e instanceof Uint16Array||e instanceof Uint32Array)return e;if(!Array.isArray(e))return[];if(e.every(e=>typeof e==`number`&&Number.isFinite(e)))return e;let t=e.map(Number);if(!t.every(Number.isFinite))throw Error(`Unity motion numeric array contains non-finite values.`);return t}function Py(e){let t=e.property===`translation`?`position`:e.property===`rotation`?`quaternion`:e.property,n=`${e.nodeKey}.${t}`;if(t===`position`||t===`scale`){if(e.componentCount!==3)throw Error(`Unity motion track ${n} must have 3 components.`);return new wa(n,e.times,e.values)}if(t===`quaternion`){if(e.componentCount!==4)throw Error(`Unity motion track ${n} must have 4 components.`);return new Sa(n,e.times,e.values)}throw Error(`Unsupported Unity motion property: ${e.property}`)}function Fy(e){return Ay(e).clips.map(e=>{let t=e.tracks.map(Py),n=t.flatMap(e=>Array.from(e.times)).reduce((e,t)=>Math.max(e,t),0);return new Ta(e.name,n,t)})}function Iy(e){let t=cy(e),n=cy(t.motionPackage??t.MotionPackage),r=cy(n.bodyMotionBindings??n.BodyMotionBindings),i=r.bindings??r.Bindings;return Array.isArray(i)?{version:String(r.version??r.Version??``),bindingMode:String(r.bindingMode??r.BindingMode??``),warnings:Hy(r.warnings??r.Warnings),bindings:i.map((e,t)=>{let n=Ly(e);if(!n)throw Error(`Body motion binding ${t} is invalid.`);return n})}:null}function Ly(e){let t=cy(e),n=Number(t.pathCrc??t.PathCrc),r=String(t.nodeKey??t.NodeKey??``),i=String(t.leafName??t.LeafName??``),a=t.targets??t.Targets;if(!Number.isFinite(n)||!r||!Array.isArray(a))return null;let o=a.map((e,t)=>{let n=Ry(e);if(!n)throw Error(`Body motion binding '${r}' target ${t} is invalid.`);return n}),s=Number(t.targetCount??t.TargetCount??o.length);if(!Number.isInteger(s)||s!==o.length)throw Error(`Body motion binding '${r}' targetCount is inconsistent.`);return{pathCrc:n,nodeKey:r,leafName:i,importedPath:Uy(t.importedPath??t.ImportedPath),sourceRest:zy(t.sourceRest??t.SourceRest),targetCount:s,targets:o}}function Ry(e){let t=cy(e),n=String(t.poseRoot??t.PoseRoot??``),r=String(t.transformPath??t.TransformPath??``),i=Number(t.pathId??t.PathId);return!n||!r||!Number.isFinite(i)?null:{poseRoot:n,transformPath:r,pathId:i,optional:(t.optional??t.Optional)===!0,rest:zy(t.rest??t.Rest)}}function zy(e){let t=cy(e),n=By(t.position??t.Position),r=Vy(t.rotation??t.Rotation),i=By(t.scale??t.Scale);return!n||!r||!i?null:{position:n,rotation:r,scale:i}}function By(e){let t=cy(e),n=Number(t.x??t.X),r=Number(t.y??t.Y),i=Number(t.z??t.Z);return Number.isFinite(n)&&Number.isFinite(r)&&Number.isFinite(i)?new G(n,r,i):null}function Vy(e){let t=cy(e),n=Number(t.x??t.X),r=Number(t.y??t.Y),i=Number(t.z??t.Z),a=Number(t.w??t.W);return!Number.isFinite(n)||!Number.isFinite(r)||!Number.isFinite(i)||!Number.isFinite(a)?null:new W(n,r,i,a).normalize()}function Hy(e){return Array.isArray(e)?e.filter(e=>typeof e==`string`):[]}function Uy(e){return typeof e==`string`&&e.length>0?e:null}function Wy(e,t){let n=e.clone();return n.name=t,n}function Gy(e,t,n,r,i){if(i.poseRoot!==`face`)return Wy(e,t);if(!r.sourceRest||!i.rest)return null;if(n===`position`){let n=[];for(let t=0;t<e.values.length;t+=3){let a=new G(e.values[t],e.values[t+1],e.values[t+2]),o=i.rest.position.clone().add(a.sub(r.sourceRest.position));n.push(o.x,o.y,o.z)}return new wa(t,e.times,n)}if(n===`quaternion`){let n=[],a=r.sourceRest.rotation.clone().invert();for(let t=0;t<e.values.length;t+=4){let r=new W(e.values[t],e.values[t+1],e.values[t+2],e.values[t+3]).normalize(),o=i.rest.rotation.clone().multiply(a).multiply(r).normalize();n.push(o.x,o.y,o.z,o.w)}return new Sa(t,e.times,n)}if(n===`scale`){let n=[],a=r.sourceRest.scale,o=i.rest.scale;if(a.x===0||a.y===0||a.z===0)return null;for(let t=0;t<e.values.length;t+=3)n.push(o.x*(e.values[t]/a.x),o.y*(e.values[t+1]/a.y),o.z*(e.values[t+2]/a.z));return new wa(t,e.times,n)}return Wy(e,t)}function Ky(e){return e.poseRoot===`face`&&/^face\/Position(?:\/Hip(?:\/Waist(?:\/Spine(?:\/Chest(?:\/Neck(?:\/Head)?)?)?)?)?)?$/.test(e.transformPath)}function qy(e){let t=cy(e),n=cy(t.pjskSpringBone??t.PjskSpringBone),r=cy(t.runtimeUnitySetup??t.RuntimeUnitySetup??n.runtimeUnitySetup??n.RuntimeUnitySetup),i=r.version,a=i===`0414`||i===414?cy(r.bodyHeadAssembly):{};return!!(a.parentingMode===`model_combine_setup`&&a.parentAttachPath&&a.childRootPath&&a.childOriginPath)}function Jy(e,t,n){let r=Iy(n),i={mode:`unity-prefab`,bindingCount:r?.bindings.length??0,sourceTrackCount:e.tracks.length,emittedTrackCount:0,resolvedTargetCount:0,resolvedBodyTargetCount:0,resolvedFaceTargetCount:0,unresolvedTrackCount:0,duplicateTargetTrackCount:0,sampleUnresolvedTracks:[],sampleResolvedHeadTargets:[]};if(!r||r.version!==`0414`||r.bindings.length===0)return{clip:null,debug:i,error:`Unity Prefab animation requires motionPackage.bodyMotionBindings version 0414.`};let a=new Map(r.bindings.map(e=>[e.nodeKey,e]));if(a.size!==r.bindings.length)return{clip:null,debug:i,error:`Unity Prefab animation bindings contain duplicate node keys.`};let o=u_(t),s=qy(n),c=[],l=new Set,u=new Set,d=new Set,f=new Set;for(let t of e.tracks){let e=Yy(t,{bindingByNodeKey:a,nodeByPath:o,suppressFaceAssemblyBridgeTargets:s,tracks:c,emittedTargets:l,resolvedBodyTargetPaths:u,resolvedFaceTargetPaths:d,sampleResolvedHeadTargets:f,debug:i});e===0?Qy(i,t.name):i.resolvedTargetCount+=e}return i.emittedTrackCount=c.length,i.resolvedBodyTargetCount=u.size,i.resolvedFaceTargetCount=d.size,i.sampleResolvedHeadTargets=[...f],c.length===0||i.unresolvedTrackCount!==0||i.duplicateTargetTrackCount!==0?{clip:null,debug:i,error:`Unity Prefab animation retarget failed: ${i.unresolvedTrackCount} unresolved tracks, ${i.duplicateTargetTrackCount} duplicate targets.`}:{clip:new Ta(`${e.name||`motion`}_unity_prefab`,e.duration,c),debug:i,error:null}}function Yy(e,t){let n=e.name.lastIndexOf(`.`),r=n>0?e.name.slice(0,n):``,i=n>0?e.name.slice(n+1):``,a=t.bindingByNodeKey.get(r);if(!a||!i)return 0;let o=0,s=!1,c=!1;for(let n of a.targets){if(t.suppressFaceAssemblyBridgeTargets&&Ky(n)||n.optional&&!t.nodeByPath.has(n.transformPath)){c=!0;continue}Xy(e,i,a,n,t)?o+=1:s=!0}return s?0:o||+!!c}function Xy(e,t,n,r,i){if(i.suppressFaceAssemblyBridgeTargets&&Ky(r))return!1;let a=i.nodeByPath.get(r.transformPath);if(!a)return!1;let o=`${a.uuid}.${t}`;if(i.emittedTargets.has(o))return i.debug.duplicateTargetTrackCount+=1,!1;let s=Gy(e,o,t,n,r);return s?(i.emittedTargets.add(o),i.tracks.push(s),Zy(r,i),!0):!1}function Zy(e,t){e.poseRoot===`body`&&t.resolvedBodyTargetPaths.add(e.transformPath),e.poseRoot===`face`&&t.resolvedFaceTargetPaths.add(e.transformPath),t.sampleResolvedHeadTargets.size<16&&/(?:^|\/)(Position|Hip|Waist|Spine|Chest|Neck|Head)$/.test(e.transformPath)&&t.sampleResolvedHeadTargets.add(e.transformPath)}function Qy(e,t){e.unresolvedTrackCount+=1,e.sampleUnresolvedTracks.length<16&&e.sampleUnresolvedTracks.push(t)}function $y(e,t){if(e.length!==1)throw Error(`Expected exactly one ${t}, found ${e.length}.`);return e[0]}async function eb(e){return Fy(await Uf(e))}var tb=class{loadClips;onLoopPromoted;clipCache=new Map;smoothedLoopClipCache=new WeakMap;context=null;motionUrl=null;motionKind=null;loopUrl=null;loopKind=null;activeClipName=null;duration=0;action=null;loopAction=null;mixer=null;finishedHandler=null;error=null;retargetDebug=null;queuedLoopClipName=null;speed=1;paused=!1;bodyHeadTracksEnabled=!0;revision=0;constructor(e={}){this.loadClips=e.loadClips??eb,this.onLoopPromoted=e.onLoopPromoted??(()=>void 0)}setSelection(e){this.motionUrl=e?.motionUrl??null,this.motionKind=Oy(this.motionUrl,e?.motionKind),this.loopUrl=e?.loopUrl??null,this.loopKind=Oy(this.loopUrl,e?.loopKind)}hasSelection(){return this.motionUrl!==null}matchesSelection(e,t){return this.motionUrl===e&&this.loopUrl===t}capturePosition(){return{activeClipName:this.activeClipName,currentTime:this.action?.time??0}}setPaused(e){this.paused=e,this.applySettings()}setSpeed(e){this.speed=e,this.applySettings()}getSpeed(){return this.speed}isPaused(){return this.paused}setBodyHeadTracksEnabled(e){return this.bodyHeadTracksEnabled!==e&&(this.bodyHeadTracksEnabled=e,!0)}step(e){this.mixer?.update(Math.max(0,e))}seek(e){let t=Math.max(this.duration,0),n=t>0?H.clamp(e,0,t):Math.max(e,0);return this.paused=!0,this.applySettings(),this.action&&(this.action.paused=!1,this.action.time=n),this.mixer?.update(0),this.applySettings(),n}seekPhase(e){let t=H.clamp(Number.isFinite(e)?e:0,0,1);return this.seek(Math.max(this.duration,0)*t)}seekLoopPhase(e){return this.promoteQueuedLoop(),this.seekPhase(e)}restorePosition(e){if(!this.action)return;let t=!!(this.loopUrl&&e.activeClipName&&(e.activeClipName===this.queuedLoopClipName||ly(e.activeClipName,this.loopUrl)));t&&this.promoteQueuedLoop();let n=Math.max(this.duration,0);this.action.time=n>0?t?H.euclideanModulo(e.currentTime,n):H.clamp(e.currentTime,0,n):Math.max(e.currentTime,0),this.mixer?.update(0)}async refresh(e){let t=++this.revision;if(this.context=e,this.stopPlayback(),this.error=null,!this.motionUrl||!e.root)return{poseApplied:!0};let n=await this.loadCachedClips(this.motionUrl,this.motionKind,t);if(t!==this.revision||!n)return{poseApplied:!1};if(!n.length)return this.error=`No clips found in ${this.motionUrl}`,{poseApplied:!1};let r=$y(n.filter(e=>!ly(e.name,this.motionUrl)),`primary motion in ${this.motionUrl}`),i=this.preparePlayableClip(r,e,!0),a=null;if(this.loopUrl===this.motionUrl){let t=n.filter(e=>ly(e.name,this.loopUrl));if(t.length>1)throw Error(`Expected at most one loop motion in ${this.loopUrl}, found ${t.length}.`);let r=t[0]??null;a=r?this.preparePlayableClip(r,e,!1):null}else if(this.loopUrl){let n=await this.loadCachedClips(this.loopUrl,this.loopKind,t);if(t!==this.revision)return{poseApplied:!1};let r=$y(n,`loop motion in ${this.loopUrl}`);a=this.preparePlayableClip(r,e,!1)}return t===this.revision?(this.installPlayback(e.root,i,a),{poseApplied:!0}):{poseApplied:!1}}release(e={}){this.revision+=1,this.stopPlayback(),this.context=null,e.preserveSelection||this.setSelection(null),e.clearCache&&this.clipCache.clear()}getSnapshot(e={}){let t=e.utjControlledNodeNames??new Set,n=this.context?.prefabHeadFollow,r=this.retargetDebug?{...this.retargetDebug,prefabHeadFollow:n}:this.context?.retargetWithUnityPrefab?{mode:`unity-prefab`,bindingCount:0,sourceTrackCount:0,emittedTrackCount:0,resolvedTargetCount:0,resolvedBodyTargetCount:0,resolvedFaceTargetCount:0,unresolvedTrackCount:0,duplicateTargetTrackCount:0,sampleUnresolvedTracks:[],sampleResolvedHeadTargets:[],prefabHeadFollow:n}:null;return{selectedUrl:this.motionUrl,selectedLoopUrl:this.loopUrl,activeClipName:this.activeClipName,queuedLoopClipName:this.queuedLoopClipName,currentTime:this.action?.time??0,duration:this.duration,paused:this.paused,speed:this.speed,faceMotionEnabled:e.faceMotionEnabled??!1,bodyHeadTracksEnabled:this.bodyHeadTracksEnabled,bodyTrackDebug:Cy(this.action?.getClip()??null,t),bodyLoopTrackDebug:Cy(this.loopAction?.getClip()??null,t),bodyRetargetDebug:r,error:this.error}}async loadCachedClips(e,t,n){let r=ky(e,t),i=this.clipCache.get(r);if(i)return i;if(t!==`unity-json`)throw this.error=`Unity motion .msgpack.br is required for ${e}.`,Error(this.error);try{let n=await this.loadClips(e,t);return this.clipCache.set(r,n),n}catch(e){throw n===this.revision&&(this.error=e instanceof Error?e.message:String(e)),e}}preparePlayableClip(e,t,n){let r=Ey(e,this.bodyHeadTracksEnabled);if(!t.retargetWithUnityPrefab)return n&&(this.retargetDebug={mode:`none`,bindingCount:0,sourceTrackCount:r.tracks.length,emittedTrackCount:r.tracks.length,resolvedTargetCount:r.tracks.length,resolvedBodyTargetCount:0,resolvedFaceTargetCount:0,unresolvedTrackCount:0,duplicateTargetTrackCount:0,sampleUnresolvedTracks:[],sampleResolvedHeadTargets:[],prefabHeadFollow:t.prefabHeadFollow}),r;if(!t.root)throw Error(`Unity Prefab animation requires a loaded prefab root.`);let i=Jy(r,t.root,t.runtimeExtension);if(n&&(this.retargetDebug={...i.debug,prefabHeadFollow:t.prefabHeadFollow}),i.error)throw this.error=i.error,Error(i.error);if(!i.clip)throw Error(`Unity Prefab animation retarget produced no clip.`);return i.clip}installPlayback(e,t,n){this.mixer=new xo(e);let r=t.name||this.motionUrl;if(this.activeClipName=r,this.duration=t.duration,this.action=this.mixer.clipAction(t,e),this.configureAction(this.action),this.action.reset(),n){let t=this.getSmoothedLoopClip(n);this.loopAction=this.mixer.clipAction(t,e),this.configureAction(this.loopAction),this.loopAction.reset(),this.loopAction.enabled=!1,this.loopAction.loop=Ue,this.loopAction.clampWhenFinished=!1,this.action.loop=He,this.action.clampWhenFinished=!0,this.queuedLoopClipName=t.name||this.loopUrl||`${r}_loop`,this.finishedHandler=e=>{e.action===this.action&&this.promoteQueuedLoop()},this.mixer.addEventListener(`finished`,this.finishedHandler)}else this.action.loop=Ue,this.action.clampWhenFinished=!1,this.queuedLoopClipName=null;this.action.play(),this.applySettings(),this.mixer.update(0)}promoteQueuedLoop(){this.loopAction&&this.mixer&&this.action&&(this.removeFinishedHandler(),this.action.stop(),this.loopAction.enabled=!0,this.loopAction.reset(),this.loopAction.play(),this.action=this.loopAction,this.loopAction=null,this.activeClipName=this.queuedLoopClipName??this.action.getClip().name,this.duration=this.action.getClip().duration,this.queuedLoopClipName=null,this.onLoopPromoted(),this.applySettings())}applySettings(){for(let e of[this.action,this.loopAction])e&&(e.paused=this.paused,e.enabled=!0,e.setEffectiveTimeScale(this.paused?0:this.speed))}configureAction(e){e.zeroSlopeAtStart=!1,e.zeroSlopeAtEnd=!1}getSmoothedLoopClip(e){let t=this.smoothedLoopClipCache.get(e);if(t)return t;let n=xy(e,60);return n!==e&&this.smoothedLoopClipCache.set(e,n),n}removeFinishedHandler(){this.mixer&&this.finishedHandler&&(this.mixer.removeEventListener(`finished`,this.finishedHandler),this.finishedHandler=null)}stopPlayback(){this.removeFinishedHandler(),this.action?.stop(),this.loopAction?.stop(),this.mixer?.stopAllAction(),this.action=null,this.loopAction=null,this.mixer=null,this.activeClipName=null,this.duration=0,this.retargetDebug=null,this.queuedLoopClipName=null}};function nb(e){return e&&typeof e==`object`?e:{}}function rb(e){let t=e;return!!t.isMesh&&Array.isArray(t.morphTargetInfluences)}function ib(e){let t=4294967295;for(let n of new TextEncoder().encode(e)){t^=n;for(let e=0;e<8;e++)t=t>>>1^(t&1?3988292384:0)}return~t>>>0}function ab(e,t){if(!e.length)return 0;if(t<=e[0].time)return e[0].value;for(let n=1;n<e.length;n+=1){let r=e[n-1],i=e[n];if(t>i.time)continue;let a=i.time-r.time;if(a<=1e-6)return i.value;let o=(t-r.time)/a;return r.value+(i.value-r.value)*o}return e[e.length-1].value}function ob(e){let t=nb(nb(e).motionPackage??nb(e).MotionPackage);return(t.faceMotion??t.FaceMotion)||null}var sb=class{motionSet=null;clip=null;loopClip=null;time=0;error=null;enabled=!0;bindings=[];bind(e,t){let n=t.morphChannels??[],r=t.morphChannelBindings??[],i=[];return this.bindings.length=0,e.traverse(e=>{if(e.userData.pjskOutlineShell||e.userData.pjskEyeThroughHairOverlay||e.userData.pjskEyeThroughHairStencilPrepass||!rb(e))return;let t=e,a=t.morphTargetInfluences?.length??0;if(!a)return;(!t.morphTargetDictionary||!Object.keys(t.morphTargetDictionary).length)&&n.length===a&&(t.morphTargetDictionary=Object.fromEntries(n.map((e,t)=>[e,t])));let o=t.morphTargetDictionary??{},s=new Map,c=[];for(let e of r){let t=o[e.name];typeof t==`number`&&(s.set(e.curveHash,t),c.push(t))}for(let[e,t]of Object.entries(o))s.set(ib(e),t),c.push(t);t.morphTargetInfluences?.fill(0),this.bindings.push({mesh:t,curveIndexByHash:s,controlledIndices:[...new Set(c)]});let l=Object.entries(o).sort((e,t)=>e[1]-t[1]).map(([e])=>e);i.push({meshName:t.name,morphTargetCount:a,mappedChannelCount:new Set(s.values()).size,sampleChannels:l.slice(0,12)})}),i}setMotion(e,t,n){if(this.motionSet=e,this.error=null,this.time=0,this.clip=null,this.loopClip=null,!e?.clips.length){this.clearInfluences();return}let r=t?e.clips.filter(e=>e.name===t):e.clips;if(r.length!==1)throw Error(`Expected exactly one face motion '${t??`<only clip>`}', found ${r.length}.`);if(this.clip=r[0],n&&n!==this.clip.name){let t=e.clips.filter(e=>e.name===n);if(t.length!==1)throw Error(`Expected exactly one face loop '${n}', found ${t.length}.`);this.loopClip=t[0]}this.applyCurrent()}hasMotion(){return this.motionSet!==null}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e,e?this.applyCurrent():this.clearInfluences()}step(e,t,n=!1){if(n||!this.enabled||!this.clip||this.bindings.length===0)return;this.time+=e*t;let r=this.clip.duration;if(r>0&&this.time>r){if(this.loopClip){let e=this.time-r;this.clip=this.loopClip,this.loopClip=null,this.time=this.clip.duration>0?e%this.clip.duration:0}else this.time%=r}this.applyCurrent()}seek(e){this.time=e,this.applyCurrent()}promoteLoop(){this.loopClip&&(this.clip=this.loopClip,this.loopClip=null,this.time=0,this.applyCurrent())}applyCurrent(){if(this.enabled&&this.clip)for(let e of this.bindings){let t=e.mesh.morphTargetInfluences;if(t){for(let n of e.controlledIndices)t[n]=0;for(let n of this.clip.curves){let r=e.curveIndexByHash.get(n.curveHash);r!==void 0&&(t[r]=ab(n.keyframes,this.time)/100)}}}}release(e={}){this.clearInfluences(),this.bindings.length=0,e.preserveMotion||this.setMotion(null,null,null)}getSnapshot(){return{activeClipName:this.clip?.name??null,queuedLoopClipName:this.loopClip?.name??null,error:this.error,currentTime:this.time,mappedMeshCount:this.bindings.length,mappedCurveCount:this.bindings.reduce((e,t)=>e+new Set(t.curveIndexByHash.values()).size,0)}}clearInfluences(){for(let e of this.bindings){let t=e.mesh.morphTargetInfluences;if(t)for(let n of e.controlledIndices)t[n]=0}}};function cb(e,t){return e.toLowerCase()===t.toLowerCase()}function lb(e,t){let n=e?.floatProperties?.find(e=>cb(e.name,t));if(Number.isFinite(n?.value))return n.value;let r=e?.intProperties?.find(e=>cb(e.name,t));return Number.isFinite(r?.value)?r.value:null}function ub(e,t,n){let r=lb(e,t);return r===null?n&&(e?.validKeywords?.some(e=>cb(e,n))||e?.invalidKeywords?.some(e=>cb(e,n)))?!0:null:r>.5}function db(e,t){let n=e?.colorProperties?.find(e=>cb(e.name,t));return!n||!Number.isFinite(n.r)||!Number.isFinite(n.g)||!Number.isFinite(n.b)||!Number.isFinite(n.a)?null:{r:n.r,g:n.g,b:n.b,a:n.a}}function fb(e,t){return e?.textureProperties?.find(e=>cb(e.name,t))??null}function pb(e,t,n){if(!e)return;let r=fb(t,n);r&&(e.repeat.set(r.scaleX,r.scaleY),e.offset.set(r.offsetX,r.offsetY),e.wrapS=mb(r.wrapU),e.wrapT=mb(r.wrapV),e.anisotropy=Math.max(1,r.anisoLevel||1),r.filterMode===0?(e.magFilter=g,e.minFilter=_):(e.magFilter=y,e.minFilter=r.filterMode===2?x:b)),e.updateMatrix(),e.needsUpdate=!0}function mb(e){switch(e){case 1:return m;case 2:return h;case 3:return m;default:return p}}var hb={eye:{opacity:.2,edge1:.9,edge2:.2},eyelash:{opacity:.2,edge1:.9,edge2:.2},eyebrow:{opacity:.5,edge1:.5,edge2:.1},eyelight:{opacity:.2,edge1:.9,edge2:.2}};function gb(){return new G(o.x,o.y,o.z)}function _b(e,t){let n=e.clone();return lp(n,{baseColor:t.baseColor??e.uniforms.uBaseColor.value.clone(),shadowColor:t.shadowColor??e.uniforms.uShadowColor.value.clone(),skinColorDefault:t.skinColorDefault??e.uniforms.uSkinColorDefault.value.clone(),skinColor1:t.skinColor1??e.uniforms.uSkinColor1.value.clone(),skinColor2:t.skinColor2??e.uniforms.uSkinColor2.value.clone(),mainTex:t.mainTex??null,shadowTex:t.shadowTex??null,valueTex:t.valueTex??null,useValueTex:t.lighting?.useValueTex??!!t.valueTex,lightDirection:e.uniforms.uLightDirection.value.clone(),lightIntensity:e.uniforms.uLightIntensity.value,ambientIntensity:e.uniforms.uAmbientIntensity.value,shadowThreshold:t.lighting?.sekaiShadowThreshold??e.uniforms.uShadowThreshold.value,shadowWeight:e.uniforms.uShadowWeight.value,characterAmbientIntensity:e.uniforms.uCharacterAmbientIntensity?.value??.3,rimColorAlpha:e.uniforms.uRimColorAlpha?.value??s.rimColorAlpha,controllerRimRange:e.uniforms.uControllerRimRange?.value??s.rimRange,controllerRimEdgeSmoothness:e.uniforms.uControllerRimEdgeSmoothness?.value??s.rimEdgeSmoothness,controllerRimEmission:e.uniforms.uControllerRimEmission?.value??s.rimEmission,controllerRimLightInfluence:e.uniforms.uControllerRimLightInfluence?.value??s.rimLightInfluence,rimDirection:e.uniforms.uRimDirection?.value.clone()??gb(),specularPower:t.lighting?.specularPower??e.uniforms.uSpecularPower.value,rimThreshold:t.lighting?.rimThreshold??e.uniforms.uRimThreshold.value,shadowTexWeight:t.lighting?.shadowTexWeight??e.uniforms.uShadowTexWeight.value,fadeMode:t.lighting?.fadeMode??e.uniforms.uFadeMode?.value??0,hueSinAngle:t.lighting?.hueSinAngle??e.uniforms.uHueSinAngle?.value??0,hueCosAngle:t.lighting?.hueCosAngle??e.uniforms.uHueCosAngle?.value??1,shadowWidth:t.lighting?.shadowWidth??e.uniforms.uShadowWidth.value,shadowWidthOverride:t.shadowWidthOverride??((e.uniforms.uShadowWidthOverride?.value??-1)>=0?e.uniforms.uShadowWidthOverride.value:null),valueShadowInfluence:t.valueShadowInfluence??e.uniforms.uValueShadowInfluence?.value??0,hairShadowEnabled:t.hairShadowEnabled??(e.uniforms.uHairShadowEnabled?.value??0)>.5,useLambert:t.useLambert??t.lighting?.useLambert??(e.uniforms.uUseLambert?.value??1)>.5,headPosition:t.headPosition??e.uniforms.uHeadPosition?.value.clone(),headNormalBlend:t.lighting?.headNormalBlend??e.uniforms.uHeadNormalBlend?.value??.7,saturation:t.lighting?.saturation??e.uniforms.uSaturation.value,value:t.lighting?.value??e.uniforms.uValue?.value??.5,contrast:t.lighting?.contrast??e.uniforms.uContrast?.value??.5,partsAmbientColor:t.lighting?.partsAmbientColor??e.uniforms.uPartsAmbientColor.value.clone(),partsAmbientAlpha:e.uniforms.uPartsAmbientAlpha?.value??0,reflectionBlendColor:t.lighting?.reflectionBlendColor??e.uniforms.uReflectionBlendColor.value.clone(),globalShadowColor:e.uniforms.uGlobalShadowColor?e.uniforms.uGlobalShadowColor.value.clone():`#ffffff`,globalShadowAlpha:e.uniforms.uGlobalShadowAlpha?.value??1,controllerAmbientColor:e.uniforms.uControllerAmbientColor?e.uniforms.uControllerAmbientColor.value.clone():new Y().setRGB(s.ambientColor.r,s.ambientColor.g,s.ambientColor.b),controllerAmbientIntensity:e.uniforms.uControllerAmbientIntensity?.value??1,controllerSpecularColor:e.uniforms.uControllerSpecularColor?e.uniforms.uControllerSpecularColor.value.clone():`#ffffff`,controllerSpecularIntensity:e.uniforms.uControllerSpecularIntensity?.value??1,controllerRimColor:e.uniforms.uControllerRimColor?e.uniforms.uControllerRimColor.value.clone():new Y().setRGB(s.rimColor.r,s.rimColor.g,s.rimColor.b),controllerShadowRimColor:e.uniforms.uControllerShadowRimColor?e.uniforms.uControllerShadowRimColor.value.clone():new Y().setRGB(s.shadowRimColor.r,s.shadowRimColor.g,s.shadowRimColor.b),controllerRimColorWeight:e.uniforms.uControllerRimColorWeight?.value??1,controllerShadowRimColorWeight:e.uniforms.uControllerShadowRimColorWeight?.value??1,controllerRimShadowSharpness:e.uniforms.uControllerRimShadowSharpness?.value??s.rimShadowSharpness,bodyDebugMode:t.bodyDebugMode??e.uniforms.uBodyDebugMode?.value??0,alphaCutoff:t.alphaCutoff??e.uniforms.uAlphaCutoff?.value??0}),n}async function vb(e,t,n=tt){if(!t)return null;let r=`${n}\u0000${t}`,i=yb.get(e);i||(i=new Map,yb.set(e,i));let a=i.get(r);if(a)return a;let o=e.loadAsync(t).then(e=>(e.wrapS=p,e.wrapT=p,e.flipY=!1,e.colorSpace=n,e.needsUpdate=!0,e)).finally(()=>{i.get(r)===o&&i.delete(r)});return i.set(r,o),o}var yb=new WeakMap;function bb(e){return e.map??null}function xb(e,t){if(!t)return;let n=e=>{e&&(e.wrapS=t.wrapS,e.wrapT=t.wrapT,e.offset.copy(t.offset),e.repeat.copy(t.repeat),e.center.copy(t.center),e.rotation=t.rotation,e.magFilter=t.magFilter,e.minFilter=t.minFilter,e.anisotropy=t.anisotropy,e.flipY=t.flipY,e.updateMatrix(),e.needsUpdate=!0)};if(e instanceof ti)n(e.map);else if(e instanceof $i){let t=e.uniforms.uMainTex?.value;n(t),t&&e.uniforms.uMainTexTransform?.value instanceof K&&e.uniforms.uMainTexTransform.value.copy(t.matrix)}}function Sb(e){let t=e.toLowerCase();return t.includes(`face`)?`face`:t.includes(`hair`)?`hair`:t.includes(`acc`)?`acc`:t.includes(`body`)?`body`:t}function Cb(e,t,n){if(!t)return;let r=(e,t)=>lb(n,e)??t,i=(e,t,r)=>ub(n,e,t)??r,a=e=>Math.round(H.clamp(e,0,1)*255).toString(16).padStart(2,`0`),o=(e,t)=>{let r=db(n,e);return r?`#${a(r.r)}${a(r.g)}${a(r.b)}`:t};return{...t,specularPower:r(`_SpecularPower`,t.specularPower),rimThreshold:r(`_RimThreshold`,t.rimThreshold),shadowTexWeight:r(`_ShadowTexWeight`,t.shadowTexWeight),fadeMode:r(`_FadeMode`,t.fadeMode),hueSinAngle:r(`_HueSinAngle`,t.hueSinAngle),hueCosAngle:r(`_HueCosAngle`,t.hueCosAngle),saturation:r(`_Saturation`,t.saturation),value:r(`_Value`,t.value),contrast:r(`_Contrast`,t.contrast),partsAmbientColor:o(`_PartsAmbientColor`,t.partsAmbientColor),reflectionBlendColor:o(`_ReflectionBlendColor`,t.reflectionBlendColor),outlineWidth:r(`_OutlineWidth`,t.outlineWidth),outlineOffset:r(`_OutlineOffset`,t.outlineOffset),outlineLightness:r(`_OutlineL`,t.outlineLightness),shadowWidth:r(`_ShadowWidth`,t.shadowWidth),useOutlineSecondNormal:lb(n,`_UseOutlineSecondNormal`)??(ub(n,`_UseOutlineSecondNormal`,`_OUTLINE_SECOND_NORMAL`)===!0?1:t.useOutlineSecondNormal),sekaiShadowThreshold:lb(n,`_SekaiShadowThreshold`)??t.sekaiShadowThreshold,useLambert:i(`_UseLambert`,`_LAMBERT`,t.useLambert),useValueTex:i(`_UseValueTex`,void 0,t.useValueTex),useFaceSdf:i(`_UseFaceSDF`,`_USE_FACE_SDF`,t.useFaceSdf),useFaceShadowLimiter:i(`_UseFaceShadowLimiter`,`_FACE_SHADOW_RANGE_LIMIT`,t.useFaceShadowLimiter),rangeLimit:lb(n,`_RangeLimit`)??t.rangeLimit,hairShadow:i(`_HairShadow`,`_HAIR_SHADOW`,t.hairShadow),headNormalBlend:r(`_HeadNormalBlend`,t.headNormalBlend??.7)}}function wb(e,t){if(!(e instanceof $i)||!t)return;let n=e.uniforms,r=(e,r)=>{let i=lb(t,r);i!==null&&n[e]&&(n[e].value=i)},i=(e,r,i)=>{let a=db(t,r);a&&(n[e]?.value?.setRGB(a.r,a.g,a.b),i&&n[i]&&(n[i].value=a.a))};i(`uPartsAmbientColor`,`_PartsAmbientColor`,`uPartsAmbientAlpha`),i(`uReflectionBlendColor`,`_ReflectionBlendColor`),i(`uSkinColorDefault`,`_DefaultSkinColor`),i(`uSkinColor1`,`_Shadow1SkinColor`),i(`uSkinColor2`,`_Shadow2SkinColor`),r(`uUseLambert`,`_UseLambert`),r(`uUseValueTex`,`_UseValueTex`),r(`uHeadNormalBlend`,`_HeadNormalBlend`);let a=ub(t,`_UseAlphaClip`,`_ALPHATEST_ON`);a!==null&&n.uAlphaCutoff&&(n.uAlphaCutoff.value=a?H.clamp(lb(t,`_Cutoff`)??.5,0,1):0)}function Tb(e){e.stencilWrite=!0,e.stencilRef=0,e.stencilFunc=519,e.stencilFuncMask=255,e.stencilWriteMask=255,e.stencilFail=at,e.stencilZFail=at,e.stencilZPass=ot}function Eb(e,t,n,r){if(e.side=0,e.transparent=!0,e.stencilWrite=!0,e.stencilRef=t,e.stencilFunc=514,e.stencilFuncMask=t,e.stencilWriteMask=t,e.stencilFail=at,e.stencilZFail=at,e.stencilZPass=at,e.depthTest=!0,e.depthWrite=!1,e.depthFunc=1,e.blending=5,e.blendSrc=204,e.blendDst=205,e.blendEquation=100,e.blendSrcAlpha=200,e.blendDstAlpha=201,e.blendEquationAlpha=100,e.polygonOffset=!1,n){let t=hb[n],i=(e,t)=>lb(r,e)??db(r,e)?.r??t,a={opacity:i(`_EyelashTransparent`,t.opacity),edge1:i(`_EyelashFaceCameraEdge1`,t.edge1),edge2:i(`_EyelashFaceCameraEdge2`,t.edge2)};e.userData.pjskSekaiEyelashViewSettings={...a},e instanceof $i&&e.uniforms.uAlphaScale&&(e.uniforms.uAlphaScale.value=a.opacity),e instanceof $i&&e.uniforms.uAlphaSource&&(e.uniforms.uAlphaSource.value=n===`eyelight`?2:1)}}function Db(e,t){let n=e.userData.pjskSekaiEyelashViewSettings;if(!n)return null;let r=n.edge1-n.edge2,i=r===0?+(t>=n.edge1):H.clamp((t-n.edge2)/r,0,1),a=i*i*(3-2*i)*n.opacity;return e instanceof $i&&e.uniforms.uAlphaScale&&(e.uniforms.uAlphaScale.value=a),a}function Ob(e,t){e.transparent=!1,e.colorWrite=!1,e.stencilWrite=!0,e.stencilRef=t,e.stencilFunc=519,e.stencilFuncMask=255,e.stencilWriteMask=t,e.stencilFail=at,e.stencilZFail=at,e.stencilZPass=ot,e.depthTest=!0,e.depthWrite=!1,e.depthFunc=3}function kb(e,t){e.stencilWrite=!0,e.stencilRef=0,e.stencilFunc=519,e.stencilFuncMask=255,e.stencilWriteMask=255&~t,e.stencilFail=at,e.stencilZFail=at,e.stencilZPass=ot}function Ab(e){switch(e){case`face_sdf`:case`face`:case`accessory`:case`body`:case`eyelight`:return 2e3;case`eye_stencil_prepass`:return 2001;case`eyelash_stencil_prepass`:return 2001.1;case`eyebrow_stencil_prepass`:return 2001.2;case`eyelash`:case`eyebrow`:return 2001;case`eye`:return 2002;case`hair`:return 2451;case`eye_through_hair`:return 2452;case`eyelash_through_hair`:return 2453;case`eyebrow_through_hair`:return 2454;case`eyelight_through_hair`:return 2455;default:return 2e3}}function jb(e,t){if(t.length<2||e.geometry.groups.length<2)return;let n=e.geometry.groups.map((e,n)=>{let r=t[e.materialIndex??0],i=typeof r?.userData.pjskMaterialKind==`string`?r.userData.pjskMaterialKind:``;return{start:e.start,count:e.count,materialIndex:e.materialIndex??0,order:Ab(i),index:n}}).sort((e,t)=>e.order-t.order||e.index-t.index);e.geometry.clearGroups();for(let t of n)e.geometry.addGroup(t.start,t.count,t.materialIndex)}function Mb(e,t,n,r){if(t.length===0||n.length===0)return null;let i=e.geometry.clone();i.clearGroups();for(let e of t)i.addGroup(e.start,e.count,e.materialIndex);let a=e,o=a.isSkinnedMesh?new Ti(i,n):new pi(i,n);if(o.name=`${e.name}_${r}`,o.position.copy(e.position),o.quaternion.copy(e.quaternion),o.scale.copy(e.scale),o.matrix.copy(e.matrix),o.matrixAutoUpdate=e.matrixAutoUpdate,o.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,o.layers.mask=e.layers.mask,o.visible=e.visible,o.renderOrder=Math.min(...n.map(e=>Ab(typeof e.userData.pjskMaterialKind==`string`?e.userData.pjskMaterialKind:``))),o.frustumCulled=e.frustumCulled,o.castShadow=!1,o.receiveShadow=!1,o.morphTargetDictionary=e.morphTargetDictionary,o.morphTargetInfluences=e.morphTargetInfluences,jb(o,n),o.isSkinnedMesh&&a.isSkinnedMesh){let e=o;e.bind(a.skeleton,a.bindMatrix),e.bindMode=a.bindMode,e.bindMatrix.copy(a.bindMatrix),e.bindMatrixInverse.copy(a.bindMatrixInverse)}return o}function Nb(e,t,n){let r=Mb(e,t,n,`through_hair_overlay`);if(!r)return null;let i=typeof n[0]?.userData.pjskMaterialKind==`string`?n[0].userData.pjskMaterialKind:``,a=i.startsWith(`eyelash_`)?`eyelash`:i.startsWith(`eyebrow_`)?`eyebrow`:i.startsWith(`eyelight_`)?`eyelight`:i.startsWith(`eye_`)?`eye`:``;return r.userData.pjskEyeThroughHairSource=e,r.userData.pjskEyeThroughHairSourceKind=a,r.userData.pjskEyeThroughHairPassKind=`overlay`,r.userData.pjskEyeThroughHairOverlay=!0,r}async function Pb({root:e,bodyAsset:t,headAsset:n,textureLoader:r,template:i,bodyDebugMode:a,debug:o=[]}){let s=await Promise.all(t.bodyMaterials.map(async e=>{if(!e.materialKind)throw Error(`Body material ${e.materialName??e.materialKey} is missing materialKind.`);let[o,s,c]=await Promise.all([vb(r,e.mainTex),vb(r,e.shadowTex),vb(r,e.valueTex,``)]);pb(o,e.rawMaterial,`_MainTex`),pb(s,e.rawMaterial,`_ShadowTex`),pb(c,e.rawMaterial,`_ValueTex`);let l=Cb(e.materialKind,e.lighting,e.rawMaterial),u=_b(i,{mainTex:o,shadowTex:s,valueTex:c,baseColor:t.proxy.bodyColor,shadowColor:t.proxy.shadowColor,skinColorDefault:n?.proxy.skinColorDefault??n?.proxy.faceColor??t.proxy.bodyColor,skinColor1:n?.proxy.skinColor1??n?.proxy.faceShadeColor??t.proxy.shadowColor,skinColor2:n?.proxy.skinColor2??n?.proxy.faceShadeColor??t.proxy.shadowColor,lighting:l,bodyDebugMode:a});return wb(u,e.rawMaterial),Tb(u),u.userData.pjskLighting=l,u.userData.pjskRawMaterial=e.rawMaterial,u.userData.pjskMaterialKind=e.materialKind,u.userData.pjskMaterialKey=e.materialKey,u.userData.pjskMaterialSlotIndex=e.slotIndex,{key:e.materialKey,meshKey:Sb(e.meshName),materialKey:e.materialKey,materialKind:e.materialKind,mainTex:e.mainTex??null,shadowTex:e.shadowTex??null,valueTex:e.valueTex??null,material:u}}));return e.traverse(e=>{let t=e;if(!t.isMesh)return;let n=Array.isArray(t.material)?t.material:[t.material],r=s.filter(e=>e.meshKey===Sb(t.name));if(r.length===0)return;let i=n.map(e=>{let n=typeof e.userData.pjskMaterialKey==`string`?e.userData.pjskMaterialKey:``;if(!n)throw Error(`Body mesh '${t.name}' material '${e.name}' is missing pjskMaterialKey; regenerate it with Haruki-3D-Exporter materialKey runtime support.`);let i=r.find(e=>e.materialKey===n);if(!i)throw Error(`Body mesh '${t.name}' material key '${n}' was not found in body material slots.`);let a=bb(e);xb(i.material,a),t.userData.pjskMaterialKind=i.materialKind;let s=!1;!i.material.uniforms.uMainTex.value&&a&&(i.material.uniforms.uMainTex.value=a,i.material.uniforms.uMainTexTransform.value.copy(a.matrix),i.material.uniforms.uUseMainTex.value=1,i.material.uniforms.uBaseColor.value.set(`#ffffff`),s=!0);let c=i.material.uniforms;return o.push({meshName:t.name,sourceMaterialName:e.name,resolvedKey:i.key,resolvedKind:i.materialKind,usedOriginalMap:s,boundMainTex:i.mainTex,boundShadowTex:i.shadowTex,boundValueTex:i.valueTex,boundFaceShadowTex:null,finalMaterialType:i.material.type,shaderHasMainTex:c.uUseMainTex?.value??null,shaderHasShadowTex:c.uUseShadowTex?.value??null,shaderHasValueTex:c.uUseValueTex?.value??null,shaderLightDirectionX:c.uLightDirection?.value?.x??null,shaderLightDirectionY:c.uLightDirection?.value?.y??null,shaderLightDirectionZ:c.uLightDirection?.value?.z??null,shaderShadowThreshold:c.uShadowThreshold?.value??null,shaderShadowWeight:c.uShadowWeight?.value??null,shaderShadowWidthOverride:c.uShadowWidthOverride?.value??null,shaderValueShadowInfluence:c.uValueShadowInfluence?.value??null,shaderLambertEnabled:c.uUseLambert?.value??null,shaderHeadNormalBlend:c.uHeadNormalBlend?.value??null,shaderSpecularPower:c.uSpecularPower?.value??null,shaderRimThreshold:c.uRimThreshold?.value??null,shaderControllerRimRange:c.uControllerRimRange?.value??null,shaderControllerRimEdgeSmoothness:c.uControllerRimEdgeSmoothness?.value??null,shaderRimColorAlpha:c.uRimColorAlpha?.value??null,shaderControllerRimEmission:c.uControllerRimEmission?.value??null,shaderControllerRimLightInfluence:c.uControllerRimLightInfluence?.value??null,shaderCharacterAmbient:c.uCharacterAmbientIntensity?.value??null,shaderShadowTexWeight:c.uShadowTexWeight?.value??null,shaderSaturation:c.uSaturation?.value??null,shaderPartsAmbientAlpha:c.uPartsAmbientAlpha?.value??null,shaderSkinColorDefault:c.uSkinColorDefault?.value?`#${c.uSkinColorDefault.value.getHexString(nt)}`:null,shaderSkinColor1:c.uSkinColor1?.value?`#${c.uSkinColor1.value.getHexString(nt)}`:null,shaderSkinColor2:c.uSkinColor2?.value?`#${c.uSkinColor2.value.getHexString(nt)}`:null,shaderBodyDebugMode:c.uBodyDebugMode?.value??null}),i.material}),a=new Set(i);n.forEach(e=>{a.has(e)||e.dispose()}),t.material=Array.isArray(t.material)?i:i[0],t.castShadow=!1,t.receiveShadow=!1}),o}var Fb=1,Ib=.02,Lb=.02;function Rb(e,t,n,r,i,a,o){let s=r.material instanceof $i?r.material.uniforms:null;e.push({meshName:t.name,sourceMaterialName:n.name,resolvedKey:r.key,resolvedKind:r.materialKind,usedOriginalMap:i,boundMainTex:r.mainTex,boundShadowTex:r.shadowTex,boundValueTex:r.valueTex,boundFaceShadowTex:r.faceShadowTex,finalMaterialType:r.material.type,shaderHasMainTex:s?.uUseMainTex?.value??null,shaderHasShadowTex:s?.uUseShadowTex?.value??null,shaderHasFaceShadowTex:s?.uUseFaceShadowTex?.value??null,shaderHasValueTex:s?.uUseValueTex?.value??null,shaderLightDirectionX:s?.uLightDirection?.value?.x??null,shaderLightDirectionY:s?.uLightDirection?.value?.y??null,shaderLightDirectionZ:s?.uLightDirection?.value?.z??null,shaderShadowThreshold:s?.uShadowThreshold?.value??null,shaderShadowWeight:s?.uShadowWeight?.value??null,shaderShadowWidthOverride:s?.uShadowWidthOverride?.value??null,shaderValueShadowInfluence:s?.uValueShadowInfluence?.value??null,shaderHairShadowEnabled:r.materialKind===`hair`?s?.uHairShadowEnabled?.value??null:null,shaderHeadNormalBlend:r.materialKind===`hair`?s?.uHeadNormalBlend?.value??null:null,shaderLambertEnabled:s?.uUseLambert?.value??null,shaderBodyDebugMode:s?.uBodyDebugMode?.value??null,shaderSpecularPower:s?.uSpecularPower?.value??null,shaderRimThreshold:s?.uRimThreshold?.value??null,shaderControllerRimRange:s?.uControllerRimRange?.value??null,shaderControllerRimEdgeSmoothness:s?.uControllerRimEdgeSmoothness?.value??null,shaderRimColorAlpha:s?.uRimColorAlpha?.value??null,shaderControllerRimEmission:s?.uControllerRimEmission?.value??null,shaderControllerRimLightInfluence:s?.uControllerRimLightInfluence?.value??null,shaderCharacterAmbient:s?.uCharacterAmbientIntensity?.value??null,shaderShadowTexWeight:s?.uShadowTexWeight?.value??null,shaderSaturation:s?.uSaturation?.value??null,shaderPartsAmbientAlpha:s?.uPartsAmbientAlpha?.value??null,shaderSkinColorDefault:s?.uSkinColorDefault?.value?`#${s.uSkinColorDefault.value.getHexString(nt)}`:null,shaderSkinColor1:s?.uSkinColor1?.value?`#${s.uSkinColor1.value.getHexString(nt)}`:null,shaderSkinColor2:s?.uSkinColor2?.value?`#${s.uSkinColor2.value.getHexString(nt)}`:null,shaderFaceDebugMode:s?.uFaceDebugMode?.value??null,shaderFaceSdfEnabled:s?.uFaceSdfEnabled?.value??null,faceSdfCapable:a,faceSdfUv1Available:o,shaderAtlasTileX:s?.uAtlasTile?.value?.x??null,shaderAtlasTileY:s?.uAtlasTile?.value?.y??null,shaderAtlasSample:s?.uAtlasSample?.value??null,shaderUseAtlas:s?.uUseAtlas?.value??null,shaderAlphaScale:s?.uAlphaScale?.value??null,shaderAlphaCutoff:s?.uAlphaCutoff?.value??null,shaderStrictAlpha:s?.uStrictAlpha?.value??null,shaderStencilWrite:r.material.stencilWrite??null,shaderStencilRef:r.material.stencilRef??null,shaderStencilFunc:r.material.stencilFunc??null,shaderStencilFuncMask:r.material.stencilFuncMask??null,shaderStencilWriteMask:r.material.stencilWriteMask??null,shaderStencilZPass:r.material.stencilZPass??null,shaderDepthFunc:r.material.depthFunc??null,shaderDepthWrite:r.material.depthWrite??null,shaderTransparent:r.material.transparent??null,renderOrder:t.renderOrder})}function zb(e,t,n,r,i=!0){let a=r instanceof $i?r.uniforms:null;e.push({meshName:t,sourceMaterialName:n,resolvedKey:null,resolvedKind:typeof r.userData.pjskMaterialKind==`string`?r.userData.pjskMaterialKind:null,usedOriginalMap:!1,boundMainTex:null,boundShadowTex:null,boundValueTex:null,boundFaceShadowTex:null,finalMaterialType:r.type,shaderHasMainTex:a?.uUseMainTex?.value??null,...i?{shaderAtlasTileX:a?.uAtlasTile?.value?.x??null,shaderAtlasTileY:a?.uAtlasTile?.value?.y??null,shaderAtlasSample:a?.uAtlasSample?.value??null}:{},shaderUseAtlas:a?.uUseAtlas?.value??null,shaderAlphaScale:a?.uAlphaScale?.value??null,shaderAlphaCutoff:a?.uAlphaCutoff?.value??null,shaderStrictAlpha:a?.uStrictAlpha?.value??null,shaderStencilWrite:r.stencilWrite??null,shaderStencilRef:r.stencilRef??null,shaderStencilFunc:r.stencilFunc??null,shaderStencilFuncMask:r.stencilFuncMask??null,shaderStencilWriteMask:r.stencilWriteMask??null,shaderStencilZPass:r.stencilZPass??null,shaderDepthFunc:r.depthFunc??null,shaderDepthWrite:r.depthWrite??null,shaderTransparent:r.transparent??null,renderOrder:Ab(typeof r.userData.pjskMaterialKind==`string`?r.userData.pjskMaterialKind:``)})}function Bb(e,t){let n=e.clone();return Sp(n,{baseColor:t.baseColor??e.uniforms.uBaseColor.value.clone(),warmColor:t.warmColor??e.uniforms.uWarmColor.value.clone(),skinColorDefault:t.skinColorDefault??e.uniforms.uSkinColorDefault.value.clone(),skinColor1:t.skinColor1??e.uniforms.uSkinColor1.value.clone(),skinColor2:t.skinColor2??e.uniforms.uSkinColor2.value.clone(),mainTex:t.mainTex??null,shadowTex:t.shadowTex??null,valueTex:t.valueTex??null,faceShadowTex:t.faceShadowTex??null,lightDirection:e.uniforms.uLightDirection.value.clone(),lightIntensity:e.uniforms.uLightIntensity.value,ambientIntensity:e.uniforms.uAmbientIntensity.value,headDotDirectionalLight:e.uniforms.uHeadDotDirectionalLight?.value,faceDebugMode:e.uniforms.uFaceDebugMode?.value??0,faceSdfEnabled:!1,useValueTex:t.lighting?.useValueTex??!!t.valueTex,shadowThreshold:t.lighting?.sekaiShadowThreshold??e.uniforms.uShadowThreshold?.value??.5,shadowWeight:e.uniforms.uShadowWeight?.value??1,shadowWidth:t.lighting?.shadowWidth??e.uniforms.uShadowWidth?.value??0,fadeMode:t.lighting?.fadeMode??e.uniforms.uFadeMode?.value??0,useLambert:t.lighting?.useLambert??!0,shadowTexWeight:t.lighting?.shadowTexWeight??e.uniforms.uShadowTexWeight?.value??1,useFaceShadowLimiter:t.lighting?.useFaceShadowLimiter??(e.uniforms.uUseFaceShadowLimiter?.value??1)>.5,faceShadowLimitRange:t.lighting?.rangeLimit??e.uniforms.uFaceShadowLimitRange?.value??0,hueSinAngle:t.lighting?.hueSinAngle??e.uniforms.uHueSinAngle?.value??0,hueCosAngle:t.lighting?.hueCosAngle??e.uniforms.uHueCosAngle?.value??1,saturation:t.lighting?.saturation??e.uniforms.uSaturation?.value??.5,value:t.lighting?.value??e.uniforms.uValue?.value??.5,contrast:t.lighting?.contrast??e.uniforms.uContrast?.value??.5,partsAmbientColor:t.lighting?.partsAmbientColor??(e.uniforms.uPartsAmbientColor?e.uniforms.uPartsAmbientColor.value.clone():`#ffffff`),partsAmbientAlpha:e.uniforms.uPartsAmbientAlpha?.value??0,controllerAmbientColor:e.uniforms.uControllerAmbientColor?e.uniforms.uControllerAmbientColor.value.clone():new Y().setRGB(s.ambientColor.r,s.ambientColor.g,s.ambientColor.b),controllerAmbientIntensity:e.uniforms.uControllerAmbientIntensity?.value??1,controllerSpecularColor:e.uniforms.uControllerSpecularColor?e.uniforms.uControllerSpecularColor.value.clone():new Y().setRGB(s.specularColor.r,s.specularColor.g,s.specularColor.b),controllerSpecularIntensity:e.uniforms.uControllerSpecularIntensity?.value??1,controllerRimColor:e.uniforms.uControllerRimColor?e.uniforms.uControllerRimColor.value.clone():new Y().setRGB(s.rimColor.r,s.rimColor.g,s.rimColor.b),controllerShadowRimColor:e.uniforms.uControllerShadowRimColor?e.uniforms.uControllerShadowRimColor.value.clone():new Y().setRGB(s.shadowRimColor.r,s.shadowRimColor.g,s.shadowRimColor.b),controllerRimColorWeight:e.uniforms.uControllerRimColorWeight?.value??1,controllerShadowRimColorWeight:e.uniforms.uControllerShadowRimColorWeight?.value??1,controllerRimRange:e.uniforms.uControllerRimRange?.value??s.rimRange,controllerRimEdgeSmoothness:e.uniforms.uControllerRimEdgeSmoothness?.value??s.rimEdgeSmoothness,controllerRimEmission:e.uniforms.uControllerRimEmission?.value??s.rimEmission,controllerRimLightInfluence:e.uniforms.uControllerRimLightInfluence?.value??s.rimLightInfluence,controllerRimShadowSharpness:e.uniforms.uControllerRimShadowSharpness?.value??s.rimShadowSharpness,rimColorAlpha:e.uniforms.uRimColorAlpha?.value??s.rimColorAlpha,rimDirection:e.uniforms.uRimDirection?.value.clone(),specularPower:t.lighting?.specularPower??e.uniforms.uSpecularPower?.value??0,rimThreshold:t.lighting?.rimThreshold??e.uniforms.uRimThreshold?.value??.2,globalShadowColor:e.uniforms.uGlobalShadowColor?e.uniforms.uGlobalShadowColor.value.clone():`#ffffff`,globalShadowAlpha:e.uniforms.uGlobalShadowAlpha?.value??1}),n}function Vb(e,t){let n=new Set(t);for(let t of e)n.has(t)||t.dispose()}function Hb(e){return!!e.geometry?.getAttribute(`uv1`)}function Ub(e,t){return{tintColor:e?.tintColor,emissionColor:e?.emissionColor,lightInfluence:e?.lightInfluence??t?.lightInfluence,distortionFps:t?.distortionFps,distortionIntensity:t?.distortionIntensity,distortionIntensityX:t?.distortionIntensityX,distortionIntensityY:t?.distortionIntensityY,distortionOffsetX:t?.distortionOffsetX,distortionOffsetY:t?.distortionOffsetY,distortionScrollSpeed:t?.distortionScrollSpeed,distortionScrollX:t?.distortionScrollX,distortionScrollY:t?.distortionScrollY,distortionTexTilingX:t?.distortionTexTilingX,distortionTexTilingY:t?.distortionTexTilingY,threshold:t?.threshold}}function Wb(e,t){return{...Ub(e,t),highlightInfluence:e?.lightInfluenceForEyeHighlight??t?.lightInfluenceForEyeHighlight}}function Gb(e,t,n,r,i,a,o,s){let{mainTex:c,shadowTex:l,valueTex:u,faceShadowTex:d}=t,f=e.materialKind,p,m=null,h=null;if(f===`eye`){let t=Ub(o,s);p=Dp(c,`eye`,o?.baseTiling,{...t,strictAlpha:!0}),p.side=0;let n=Dp(c,`eye`,o?.baseTiling,t);n.side=0,Ob(n,Fb),n.userData.pjskMaterialKind=`eye_stencil_prepass`;let r=Dp(c,`eye`,o?.baseTiling,{...t,strictAlpha:!0});r.side=0,Eb(r,Fb,`eye`,e.rawMaterial),r.userData.pjskMaterialKind=`eye_through_hair`,p.userData.pjskOverlayMaterial=r,p.userData.pjskStencilPrepassMaterial=n}else if(f===`eyelight`){let t=Wb(o,s);m=Dp(c,`eyelight`,o?.highlightTiling,t),m.side=0,p=m.clone(),p.visible=!1,p.colorWrite=!1,p.depthWrite=!1;let n=Dp(c,`eyelight`,o?.highlightTiling,t);n.side=0,Eb(n,Fb,`eyelight`,e.rawMaterial),n.userData.pjskMaterialKind=`eyelight_through_hair`,p.userData.pjskOverlayMaterial=n}else if(f===`eyelash`||f===`eyebrow`){p=Dp(c,`alpha`,null,{vertexBViewOffset:.015}),h=Kb(t,n,r.face,s),p.side=0;let i=Dp(c,`alpha`,null,{strictAlpha:!0});i.side=0,Ob(i,Fb),i.userData.pjskMaterialKind=`${f}_stencil_prepass`;let a=Dp(c,`alpha`,null,{strictAlpha:!0});a.side=0,Eb(a,Fb,f,e.rawMaterial),a.userData.pjskMaterialKind=`${f}_through_hair`,p.userData.pjskOverlayMaterial=a,p.userData.pjskStencilPrepassMaterial=i}else if(f===`hair`)p=_b(r.hair,{mainTex:c,shadowTex:l,valueTex:u,baseColor:n.proxy.hairColor,shadowColor:n.proxy.hairShadowColor,lighting:s,hairShadowEnabled:a.proximityShadowEnabled&&a.controllerPresent&&s?.hairShadow===!0,useLambert:a.controllerPresent?!0:s?.useLambert??!0,headPosition:a.headPosition,bodyDebugMode:i.bodyDebugMode,alphaCutoff:Ib}),kb(p,Fb);else if(f===`accessory`||f===`body`)p=_b(r.body,{mainTex:c,shadowTex:l,valueTex:u,baseColor:n.proxy.skinColorDefault??n.proxy.faceColor,shadowColor:n.proxy.skinColor1??n.proxy.faceShadeColor,skinColorDefault:n.proxy.skinColorDefault??n.proxy.faceColor,skinColor1:n.proxy.skinColor1??n.proxy.faceShadeColor,skinColor2:n.proxy.skinColor2??n.proxy.faceShadeColor,lighting:s,bodyDebugMode:i.bodyDebugMode,alphaCutoff:f===`accessory`?Lb:0}),Tb(p);else if(f===`face`||f===`face_sdf`){let e=Kb(t,n,r.face,s);e.uniforms.uFaceDebugMode&&(e.uniforms.uFaceDebugMode.value=i.faceDebugMode),e.side=0,Tb(e),p=e}else throw Error(`Head material ${e.materialName??e.materialKey} has unsupported materialKind '${f}'.`);return{material:p,topLayerMaterial:m,outlineSourceMaterial:h}}function Kb(e,t,n,r){return Bb(n,{...e,baseColor:t.proxy.faceColor,warmColor:t.proxy.faceShadeColor,skinColorDefault:t.proxy.skinColorDefault??t.proxy.faceColor,skinColor1:t.proxy.skinColor1??t.proxy.faceShadeColor,skinColor2:t.proxy.skinColor2??t.proxy.faceShadeColor,lighting:r})}function qb(e,t,n,r,i,a,o){let s=typeof t.userData.pjskMaterialKey==`string`?t.userData.pjskMaterialKey:``;if(!s)throw Error(`Head mesh '${e.name}' material '${t.name}' is missing pjskMaterialKey; regenerate it with Haruki-3D-Exporter materialKey runtime support.`);let c=r.find(e=>e.materialKey===s);if(!c)throw Error(`Head mesh '${e.name}' material key '${s}' was not found in head material slots.`);let l=bb(t);Jb(c,l);let u=Yb(c,l);e.renderOrder=Ab(c.materialKind),e.userData.pjskMaterialKind=c.materialKind;let d=Hb(e),f=c.material.userData.pjskLighting,p=c.materialKind===`face_sdf`&&!!c.faceShadowTex&&f?.useFaceSdf!==!1;return Zb(c.material,{faceSdfEnabled:i},p,d),o[n]=c,Rb(a,e,t,c,u,p,d),c.material}function Jb(e,t){xb(e.material,t);for(let n of[e.overlayMaterial,e.stencilPrepassMaterial,e.topLayerMaterial])n&&xb(n,t)}function Yb(e,t){if(e.material instanceof $i&&!e.material.uniforms.uMainTex.value&&t){Xb(e.material,t);for(let n of[e.overlayMaterial,e.stencilPrepassMaterial,e.topLayerMaterial])n instanceof $i&&Xb(n,t);return`uBaseColor`in e.material.uniforms&&e.material.uniforms.uBaseColor.value.set(`#ffffff`),!0}return e.material instanceof ti&&!e.material.map&&t?(e.material.map=t,e.material.needsUpdate=!0,!0):!1}function Xb(e,t){e.uniforms.uMainTex.value=t,e.uniforms.uMainTexTransform&&(e.uniforms.uMainTexTransform.value=t.matrix),e.uniforms.uUseMainTex.value=1}function Zb(e,t,n,r){if(!(e instanceof $i)||!e.uniforms.uFaceShadowTex)return;let i=e.uniforms;e.userData.pjskFaceSdfCapable=n,e.userData.pjskFaceSdfUv1Available=r,i.uFaceSdfEnabled.value=t.faceSdfEnabled&&n?1:0}function Qb(e,t,n,r,i){let a={materials:[],groups:[]},o={materials:[],groups:[]},s={materials:[],groups:[]};for(let c of e){let e=t[c.materialIndex];$b(a,c,e?.topLayerMaterial??null),$b(o,c,e?.overlayMaterial??null),$b(s,c,e?.stencilPrepassMaterial??null);let l=n[c.materialIndex]?.name??``;e?.topLayerMaterial&&zb(i,r,l,e.topLayerMaterial),e?.stencilPrepassMaterial&&zb(i,r,l,e.stencilPrepassMaterial,!1),e?.overlayMaterial&&zb(i,r,l,e.overlayMaterial)}return{top:a,overlay:o,stencil:s}}function $b(e,t,n){if(!n)return;let r=e.materials.length;e.materials.push(n),e.groups.push({start:t.start,count:t.count,materialIndex:r})}function ex(e,t,n,r){for(let i of t.groups){let a=t.materials[i.materialIndex];if(!a)continue;let o=Nb(e,[{start:i.start,count:i.count,materialIndex:0}],[a]);o&&e.parent&&(n===`stencil_prepass`&&(o.name=`${e.name}_eye_stencil_prepass`,o.userData.pjskEyeThroughHairPassKind=n,o.userData.pjskEyeThroughHairStencilPrepass=!0,o.userData.pjskEyeThroughHairOverlay=!1),r.push({parent:e.parent,mesh:o}))}}function tx(e,t,n){for(let r of t.groups){let i=t.materials[r.materialIndex];if(!i)continue;let a=Mb(e,[{start:r.start,count:r.count,materialIndex:0}],[i],`eyelight_top_layer`);a&&e.parent&&(a.userData.pjskTopLayerSource=e,a.userData.pjskMaterialKind=typeof i.userData.pjskMaterialKind==`string`?i.userData.pjskMaterialKind:null,n.push({parent:e.parent,mesh:a}))}}async function nx({root:e,headAsset:t,textureLoader:n,templates:r,view:i,hair:a,eyeController:o,debug:s=[]}){let c=[],l=[],u=[],d=await Promise.all(t.faceMaterials.map(async e=>{let[s,c,l,u]=await Promise.all([vb(n,e.mainTex),vb(n,e.shadowTex),vb(n,e.valueTex,``),vb(n,e.faceShadowTex,``)]);if(pb(s,e.rawMaterial,`_MainTex`),pb(c,e.rawMaterial,`_ShadowTex`),pb(l,e.rawMaterial,`_ValueTex`),pb(u,e.rawMaterial,`_FaceShadowTex`),!e.materialKind)throw Error(`Head material ${e.materialName??e.materialKey} is missing materialKind.`);let d=e.materialKind,f=!!e.isAccessory||d===`accessory`,p=Cb(d,e.lighting,e.rawMaterial),{material:m,topLayerMaterial:h,outlineSourceMaterial:g}=Gb(e,{mainTex:s,shadowTex:c,valueTex:l,faceShadowTex:u},t,r,i,a,o,p);return wb(m,e.rawMaterial),g&&(wb(g,e.rawMaterial),m.userData.pjskOutlineSourceMaterial=g),m.userData.pjskLighting=p,m.userData.pjskRawMaterial=e.rawMaterial,m.userData.pjskMaterialKind=d,m.userData.pjskIsAccessory=f,m.userData.pjskMaterialKey=e.materialKey,m.userData.pjskMaterialSlotIndex=e.slotIndex,h&&(h.userData.pjskLighting=p,h.userData.pjskRawMaterial=e.rawMaterial,h.userData.pjskMaterialKind=d,h.userData.pjskIsAccessory=f,h.userData.pjskMaterialKey=e.materialKey,h.userData.pjskMaterialSlotIndex=e.slotIndex),{key:e.materialKey,meshKey:Sb(e.meshName),materialKey:e.materialKey,materialKind:d,mainTex:e.mainTex??null,shadowTex:e.shadowTex??null,valueTex:e.valueTex??null,faceShadowTex:e.faceShadowTex??null,material:m,overlayMaterial:m.userData.pjskOverlayMaterial instanceof Yr?m.userData.pjskOverlayMaterial:null,stencilPrepassMaterial:m.userData.pjskStencilPrepassMaterial instanceof Yr?m.userData.pjskStencilPrepassMaterial:null,topLayerMaterial:h}}));e.traverse(e=>{let t=e;if(!t.isMesh||t.userData.pjskEyeThroughHairOverlay||t.userData.pjskEyeThroughHairStencilPrepass)return;let n=Array.isArray(t.material)?t.material:[t.material],r=Sb(t.name),a=d.filter(e=>e.meshKey===r);if(a.length===0)return;let o=[],f=n.map((e,n)=>qb(t,e,n,a,i.faceSdfEnabled,s,o)),p=o.reduce((e,t)=>t?Math.min(e,Ab(t.materialKind)):e,1/0);Number.isFinite(p)&&(t.renderOrder=p);let m=Qb(t.geometry.groups.length>0?t.geometry.groups.map(e=>({start:e.start,count:e.count,materialIndex:e.materialIndex??0})):[{start:0,count:t.geometry.index?.count??t.geometry.getAttribute(`position`)?.count??0,materialIndex:0}],o,n,t.name,s);Vb(n,f),jb(t,f),t.material=Array.isArray(t.material)||f.length>1?f:f[0],t.castShadow=!1,t.receiveShadow=!1,ex(t,m.stencil,`stencil_prepass`,l),ex(t,m.overlay,`overlay`,c),tx(t,m.top,u)});for(let e of l)e.parent.add(e.mesh);for(let e of c)e.parent.add(e.mesh);for(let e of u)e.parent.add(e.mesh);return s}var rx={widthMin:4e-4,widthMax:.0095,distanceNear:.45,distanceFar:20},ix={startTime:-.013763427734375,startValue:27.81246566772461,startOutTangent:-.13214513659477234,endTime:100.92341613769531,endValue:-.03620624542236328,endInTangent:-.5713597536087036};function ax(e){let t=Number.isFinite(e)?e:25,n=ix,r;if(t<=n.startTime)r=n.startValue;else if(t>=n.endTime)r=n.endValue;else{let e=n.endTime-n.startTime,i=(t-n.startTime)/e,a=i*i,o=a*i;r=(2*o-3*a+1)*n.startValue+(o-2*a+i)*e*n.startOutTangent+(-2*o+3*a)*n.endValue+(o-a)*e*n.endInTangent}return Math.abs(r)>2**-52?t/r:1}var ox={color:{r:0,g:0,b:0},blending:.5};function sx(){return new U(rx.widthMin,rx.widthMax)}function cx(e){return!e?.disabledShaderPasses?.some(e=>e.toLowerCase()===`outline`)}var lx={r:.52,g:.47,b:.55,a:1};function ux(e,t,n){if(e.name!==`pjsk_shell_outline`)return;let r=e.userData.pjskOutlineController;r&&(t&&typeof t==`object`&&`r`in t&&`g`in t&&`b`in t?r.color.setRGB(t.r,t.g,t.b):$(r.color,t??new Y().setRGB(ox.color.r,ox.color.g,ox.color.b)),r.blending=H.clamp(n??ox.blending,0,1))}function dx(e,t,n){let r=[`skinning_vertex`,`morphtarget_vertex`,`begin_vertex`].map(e=>`#include <${e}>`).find(t=>e.includes(t));if(!r)throw Error(`Outline source has no vertex deformation boundary.`);return e.replace(r,[r,`vec3 outlineWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`,`float outlineDistance = length(outlineWorldPosition - cameraPosition);`,`float outlineDistanceFactor = clamp((outlineDistance - uSekaiOutlineFactor.x) * uSekaiOutlineFactor.y, 0.0, 1.0);`,`outlineDistanceFactor = min(outlineDistanceFactor * uSekaiOutlineFactor.z, 1.0);`,`float outlineWidth = mix(uSekaiOutlineWidth.x, uSekaiOutlineWidth.y, outlineDistanceFactor);`,`vec3 outlineNormal = normal;`,`#if defined(USE_SKINNING) || defined(USE_MORPHNORMALS)`,`outlineNormal = objectNormal;`,`#endif`,n?[`vec3 outlineTangent = tangent.xyz;`,`#ifdef USE_SKINNING`,`outlineTangent = (skinMatrix * vec4(outlineTangent, 0.0)).xyz;`,`#endif`,`vec3 outlineSecondBitangent = cross(outlineNormal, outlineTangent) * tangent.w;`,`vec3 outlineDirection = normalize(outlineTangent * uv1.x + outlineSecondBitangent * uv1.y + outlineNormal * uv2.x);`].join(`
`):`vec3 outlineDirection = normalize(outlineNormal);`,t?`float outlineScale = clamp(color.r, 0.0, 1.0);`:`float outlineScale = 1.0;`,t?`float outlineOffsetScale = clamp(color.b, 0.0, 1.0);`:`float outlineOffsetScale = 0.0;`,`transformed += outlineDirection * outlineWidth * outlineScale;`].join(`
`))}function fx(e,t,n,r){let i=new G(rx.distanceNear,1/(rx.distanceFar-rx.distanceNear),ax(25)),a={color:new Y().setRGB(ox.color.r,ox.color.g,ox.color.b),blending:ox.blending},o=lb(n,`_OutlineOffset`)??0,s=e.clone();s.name=`pjsk_shell_outline`,s.side=1,s.transparent=!1,s.opacity=1,s.depthFunc=2,s.depthWrite=!0,s.depthTest=!0,s.blending=0,s.polygonOffset=!1,s.userData={...e.userData,pjskOutlineController:a};let c={};for(let t of[`uFaceSdfEnabled`,`uRimColorAlpha`,`uControllerSpecularIntensity`])t in e.uniforms&&(c[t]={value:0});return s.uniforms={...e.uniforms,...c,uSekaiOutlineWidth:{value:sx()},uSekaiOutlineFactor:{value:i},uSekaiOutlineOffset:{value:o},uSekaiCharacterOutlineColor:{value:a.color},uSekaiCharacterOutlineBlending:{get value(){return a.blending}}},s.vertexShader=e.vertexShader.replace(`#include <common>`,[`#include <common>`,`uniform vec2 uSekaiOutlineWidth;`,`uniform vec3 uSekaiOutlineFactor;`,`uniform float uSekaiOutlineOffset;`,r?`attribute vec4 tangent;`:``,r?`attribute vec2 uv1;`:``,r?`attribute vec2 uv2;`:``].join(`
`)),s.vertexShader=s.vertexShader.replace(`#include <defaultnormal_vertex>`,[`#include <defaultnormal_vertex>`,`#ifdef FLIP_SIDED`,`transformedNormal = -transformedNormal;`,`#endif`].join(`
`)),s.vertexShader=dx(s.vertexShader,t,r),s.vertexShader=s.vertexShader.replace(/gl_Position\s*=\s*projectionMatrix\s*\*[^;]*;/,e=>[e,`vec4 projectedCameraOrigin = projectionMatrix * viewMatrix * vec4(cameraPosition, 1.0);`,`gl_Position += projectedCameraOrigin * (-0.01 * uSekaiOutlineOffset) * outlineOffsetScale;`].join(`
`)),s.fragmentShader=e.fragmentShader.replace(/vec3 outputColor\s*\(\s*vec3 color\s*\)\s*\{\s*return color;\s*\}/,[`uniform vec3 uSekaiCharacterOutlineColor;`,`uniform float uSekaiCharacterOutlineBlending;`,``,`vec3 outputColor(vec3 color) {`,`  return mix(`,`    uSekaiCharacterOutlineColor,`,`    clamp(color, 0.0, 1.0),`,`    clamp(uSekaiCharacterOutlineBlending, 0.0, 1.0)`,`  );`,`}`].join(`
`)),s.customProgramCacheKey=()=>`sekai-toon-outline:${+!!t}:${+!!r}`,s.onBeforeRender=(e,t,n)=>{n instanceof Xa&&(i.z=ax(n.fov))},s}function px(e,t,n=!1,r=null,i=null){if(i instanceof $i&&/vec3 outputColor\s*\(\s*vec3 color\s*\)/.test(i.fragmentShader))return fx(i,e,t,n);let a=db(t,`_OutlineColor`)??lx,o=fb(t,`_MainTex`),s=new cn(o?.scaleX??1,o?.scaleY??1,o?.offsetX??0,o?.offsetY??0),c=(lb(t,`_UseAlphaClip`)??0)>.5,l=H.clamp(lb(t,`_Cutoff`)??.5,0,1),u=lb(t,`_OutlineOffset`)??0,d=new Y().setRGB(a.r,a.g,a.b),f={color:new Y().setRGB(ox.color.r,ox.color.g,ox.color.b),blending:ox.blending},p=new ti({color:d,map:r,side:1,transparent:!1,opacity:1,depthFunc:2,depthWrite:!0,depthTest:!0,blending:0,vertexColors:!1,alphaTest:c?l:0}),m=new G(rx.distanceNear,1/(rx.distanceFar-rx.distanceNear),ax(25));return p.name=`pjsk_shell_outline`,p.userData.pjskOutlineController=f,p.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace(`#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )`,`#if 1`),t.uniforms.uSekaiOutlineWidth={value:sx()},t.uniforms.uSekaiOutlineFactor={value:m},t.uniforms.uSekaiOutlineOffset={value:u},t.uniforms.uSekaiMainTexST={value:s},t.uniforms.uSekaiCharacterOutlineColor={value:f.color},t.uniforms.uSekaiCharacterOutlineBlending={get value(){return f.blending}},t.vertexShader=t.vertexShader.replace(`#include <common>`,[`#include <common>`,`uniform vec2 uSekaiOutlineWidth;`,`uniform vec3 uSekaiOutlineFactor;`,`uniform float uSekaiOutlineOffset;`,`uniform vec4 uSekaiMainTexST;`,`#ifdef USE_MAP`,`varying vec2 vSekaiMainTexUv;`,`#endif`,e?`attribute vec3 color;`:``,n?`attribute vec4 tangent;`:``,n?`attribute vec2 uv1;`:``,n?`attribute vec2 uv2;`:``].join(`
`)),t.vertexShader=dx(t.vertexShader,e,n),t.vertexShader=t.vertexShader.replace(`#include <project_vertex>`,[`#include <project_vertex>`,`vec4 projectedCameraOrigin = projectionMatrix * viewMatrix * vec4(cameraPosition, 1.0);`,`gl_Position += projectedCameraOrigin * (-0.01 * uSekaiOutlineOffset) * outlineOffsetScale;`].join(`
`)),t.vertexShader=t.vertexShader.replace(`#include <uv_vertex>`,[`#include <uv_vertex>`,`#ifdef USE_MAP`,`vSekaiMainTexUv = uv * uSekaiMainTexST.xy + uSekaiMainTexST.zw;`,`#endif`].join(`
`)),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,[`#include <common>`,`uniform vec3 uSekaiCharacterOutlineColor;`,`uniform float uSekaiCharacterOutlineBlending;`,`#ifdef USE_MAP`,`varying vec2 vSekaiMainTexUv;`,`#endif`].join(`
`)),t.fragmentShader=t.fragmentShader.replace(`#include <map_fragment>`,[`#ifdef USE_MAP`,`  vec4 sampledDiffuseColor = texture2D(map, vSekaiMainTexUv);`,`  #ifdef DECODE_VIDEO_TEXTURE`,`    sampledDiffuseColor = sRGBTransferEOTF(sampledDiffuseColor);`,`  #endif`,`  sampledDiffuseColor = sRGBTransferOETF(sampledDiffuseColor);`,`  diffuseColor *= sampledDiffuseColor;`,`#endif`].join(`
`)),t.fragmentShader=t.fragmentShader.replace(`#include <color_fragment>`,[`#include <color_fragment>`,`diffuseColor.rgb = mix(`,`  diffuseColor.rgb,`,`  uSekaiCharacterOutlineColor,`,`  clamp(uSekaiCharacterOutlineBlending, 0.0, 1.0)`,`);`].join(`
`)),t.fragmentShader=t.fragmentShader.replace(`#include <colorspace_fragment>`,``)},p.customProgramCacheKey=()=>`sekai-outline:${+!!e}:${+!!n}`,p.onBeforeRender=(e,t,n)=>{n instanceof Xa&&(m.z=ax(n.fov))},p}function mx(e,t){let n=e;if(n.isMesh){if(n.userData.pjskEyeThroughHairOverlay||n.userData.pjskEyeThroughHairStencilPrepass){hx(n,t);return}if(n.userData.pjskOutlineShell){gx(n,t);return}_x(n,t)}}function hx(e,t){let n=e.userData.pjskEyeThroughHairSource,r=typeof e.userData.pjskEyeThroughHairSourceKind==`string`?e.userData.pjskEyeThroughHairSourceKind:``,i=typeof e.userData.pjskEyeThroughHairPassKind==`string`?e.userData.pjskEyeThroughHairPassKind:``,a=n instanceof zn?n.visible:!0;n instanceof zn&&(e.layers.mask=n.layers.mask),e.visible=a&&!t.outlineOnly&&!t.eyelightOnly&&!t.noEyeThroughHair&&Ox(r,t.mode)&&kx(r,i,t.mode)&&t.faceLayersVisible&&(!t.noEyelight||r!==`eyelight`),e.userData.pjskEyeThroughHairBaseVisible=e.visible}function gx(e,t){let n=typeof e.userData.pjskSourceMaterialKind==`string`?e.userData.pjskSourceMaterialKind:``;if(t.eyelightOnly){e.visible=n===`eye`||n===`eyelight`;return}let r=Dx(n);e.visible=!t.eyeThroughHairOnly&&t.outlineVisible&&!Ax(n,t.mode)&&(!t.noEyelight||n!==`eyelight`)&&(!r||t.faceLayersVisible)}function _x(e,t){let n=Array.isArray(e.material)?e.material:[e.material],r=vx(n,t.faceSdfEnabled);e.visible=t.outlineOnly||t.eyeThroughHairOnly?!1:t.eyelightOnly?r.faceLayer&&n.some(e=>e.userData.pjskMaterialKind===`eye`||e.userData.pjskMaterialKind===`eyelight`):!r.faceLayer||t.faceLayersVisible&&(!t.noEyelight||!r.eyelightLayer);let i=e.userData.pjskEyeThroughHairSource;i instanceof zn&&(e.visible=e.visible&&i.visible,e.layers.mask=i.layers.mask)}function vx(e,t){let n=!1,r=!1;for(let i of e){if(!(i instanceof $i))continue;let e=i.visible!==!1&&i.colorWrite!==!1;i.uniforms.uFaceSdfEnabled&&(i.uniforms.uFaceSdfEnabled.value=t&&i.userData.pjskFaceSdfCapable===!0?1:0,n=!0),i.uniforms.uMode&&!i.uniforms.uFaceSdfEnabled&&(n=!0,r||=e&&i.uniforms.uMode.value>1.5)}return{faceLayer:n,eyelightLayer:r}}function yx(e,t){let n=e.uniforms;n.uSkinColorDefault&&$(n.uSkinColorDefault.value,t.default),n.uSkinColor1&&$(n.uSkinColor1.value,t.shadow1),n.uSkinColor2&&$(n.uSkinColor2.value,t.shadow2)}function bx(e,t){e.shaderSkinColorDefault!==void 0&&e.shaderSkinColorDefault!==null&&(e.shaderSkinColorDefault=t.default.toLowerCase()),e.shaderSkinColor1!==void 0&&e.shaderSkinColor1!==null&&(e.shaderSkinColor1=t.shadow1.toLowerCase()),e.shaderSkinColor2!==void 0&&e.shaderSkinColor2!==null&&(e.shaderSkinColor2=t.shadow2.toLowerCase())}function xx(e){return e===`head_proximity`?`sekai_head_position`:e}var Sx={skin:1,main_color:2,skin_color:3,h_r:4,h_g:5,h_b:6,h_a:7,vertex_r:8,vertex_g:9,base_shadow:10,ndotl_raw:11,h_b_adjusted_shadow:12,ambient_target:13,ambient_weight:14,ambient_tint:15,specular:16,rim_raw:17,rim_add:18,rim_gate:19,rim_color:20,rim_scalar:21,specular_mask:22,specular_add:23,toon_luma:24,shadow_mask:25,shadow_target:26},Cx={sdf:1,mask:2,limit:3,basis:4,range:5};function wx(e){return Sx[e]??0}function Tx(e){return Cx[e]??0}function Ex(e){return e===`eyelash`||e===`eyebrow`||e===`eye`||e===`eyelight`}function Dx(e){return e===`face`||e===`face_sdf`||Ex(e)}function Ox(e,t){switch(t){case`eye_through_hair_eye_only`:return e===`eye`;case`eye_through_hair_eyebrow_only`:return e===`eyebrow`;case`eye_through_hair_eyelash_only`:return e===`eyelash`;case`no_eye_through_hair_eye`:return e!==`eye`;case`no_eye_through_hair_eyebrow`:return e!==`eyebrow`;case`no_eye_through_hair_eyelash`:return e!==`eyelash`;default:return!0}}function kx(e,t,n){return n===`no_eye_through_hair_eyelash_overlay`?e!==`eyelash`||t!==`overlay`:n!==`no_eye_through_hair_eyelash_prepass`||e!==`eyelash`||t!==`stencil_prepass`}function Ax(e,t){switch(t){case`no_body_outline`:return e===`body`;case`no_hair_outline`:return e===`hair`;case`no_face_layers`:case`no_face_outline`:return Dx(e);default:return!1}}var jx=class{options;cameraDirection=new G;hairShadowMode=`sekai_head_position`;bodyDebugMode=`off`;toonShadowWidthOverride=null;toonValueShadowInfluence;faceSdfEnabled=!0;faceSdfDebugMode=`off`;faceSdfDebugLightMode=`scene`;renderIsolationMode=`normal`;controllerOutlineColor=new Y().setRGB(ox.color.r,ox.color.g,ox.color.b);controllerOutlineBlending=ox.blending;skinColors=null;constructor(e){this.options=e,this.toonValueShadowInfluence=e.valueShadowInfluence??1,e.debug.hairShadowMode=this.hairShadowMode}get slots(){return[this.options.bodySlot,this.options.headSlot]}get debugEntries(){return[this.options.debug.body,this.options.debug.head]}forEachShaderMaterial(e){for(let t of this.slots)t.traverse(t=>{let n=t;if(!n.isMesh)return;let r=Array.isArray(n.material)?n.material:[n.material];for(let t of r)t instanceof $i&&e(t)})}getBindingView(){return{bodyDebugMode:wx(this.bodyDebugMode),faceDebugMode:Tx(this.faceSdfDebugMode),faceSdfEnabled:this.shouldEnableFaceSdf(),shadowWidthOverride:this.toonShadowWidthOverride,valueShadowInfluence:this.toonValueShadowInfluence,proximityHairShadowEnabled:this.isHairShadowEnabled()}}getHairShadowMode(){return this.hairShadowMode}isHairShadowEnabled(){return this.hairShadowMode===`sekai_head_position`}setHairShadowMode(e){this.hairShadowMode=xx(e),this.options.debug.hairShadowMode=this.hairShadowMode,this.applyHairShadowMode()}setFaceSdfDebugMode(e){this.faceSdfDebugMode=e,this.applyFaceSdfDebug()}setFaceSdfEnabled(e){this.faceSdfEnabled=e,this.applyFaceSdfEnabled()}setBodyDebugMode(e){this.bodyDebugMode=e,this.applyBodyDebug()}setToonShadowPreview(e,t){this.toonShadowWidthOverride=e===null?null:Math.max(0,e),this.toonValueShadowInfluence=H.clamp(t,0,1),this.applyToonShadowPreview()}setFaceSdfDebugLightMode(e){this.faceSdfDebugLightMode=e,this.applyFaceSdfDebug()}setRenderIsolationMode(e){this.renderIsolationMode=e,this.applyRenderIsolationMode()}resolveFaceShadowLightDirection(e,t,n){switch(this.faceSdfDebugLightMode){case`front`:return n.clone();case`left`:return t.clone().negate();case`right`:return t.clone();case`back`:return n.clone().negate();default:return e.clone()}}applyCharacterView(){this.applyRenderIsolationMode(),this.applyFaceSdfDebug(),this.applyBodyDebug(),this.applyToonShadowPreview(),this.applyHairShadowMode(),this.applyCharacterSkinColors()}setCharacterSkinColors(e){this.skinColors=e?{...e}:null,this.options.debug.skinColors=this.skinColors?{...this.skinColors}:null,this.applyCharacterSkinColors()}applyCharacterSkinColors(){let e=this.skinColors;if(!e)return;let t=t=>yx(t,e);[this.options.bodyMaterial,this.options.hairMaterial,this.options.faceMaterial].forEach(t),this.forEachShaderMaterial(t);for(let t of this.debugEntries)for(let n of t)bx(n,e)}shouldEnableFaceSdf(){return this.renderIsolationMode===`no_face_sdf`?!1:this.faceSdfEnabled||this.renderIsolationMode===`face_sdf`}applyFaceSdfEnabled(){let e=this.shouldEnableFaceSdf(),t=t=>{t.uniforms.uFaceSdfEnabled&&(t.uniforms.uFaceSdfEnabled.value=e&&t.userData.pjskFaceSdfCapable===!0?1:0)};t(this.options.faceMaterial),this.forEachShaderMaterial(t);for(let t of this.debugEntries)for(let n of t)(n.shaderFaceSdfEnabled!==void 0||n.resolvedKind===`face_sdf`)&&(n.shaderFaceSdfEnabled=e&&n.faceSdfCapable===!0?1:0)}applyFaceSdfDebug(){let e=Tx(this.faceSdfDebugMode);this.options.faceMaterial.uniforms.uFaceDebugMode.value=e,this.forEachShaderMaterial(t=>{t.uniforms.uFaceDebugMode&&(t.uniforms.uFaceDebugMode.value=e)});for(let t of this.debugEntries)for(let n of t)(n.resolvedKind===`face_sdf`||n.shaderFaceDebugMode!==void 0)&&(n.shaderFaceDebugMode=e)}applyBodyDebug(){let e=wx(this.bodyDebugMode),t=t=>{t.uniforms.uBodyDebugMode&&(t.uniforms.uBodyDebugMode.value=e)};t(this.options.bodyMaterial),t(this.options.hairMaterial),this.forEachShaderMaterial(t);for(let t of this.debugEntries)for(let n of t)(n.shaderBodyDebugMode!==void 0||n.resolvedKind===`body`)&&(n.shaderBodyDebugMode=e)}applyToonShadowPreview(){let e=this.toonShadowWidthOverride??-1,t=t=>{t instanceof $i&&(t.uniforms.uShadowWidthOverride&&(t.uniforms.uShadowWidthOverride.value=e),t.uniforms.uValueShadowInfluence&&(t.uniforms.uValueShadowInfluence.value=this.toonValueShadowInfluence))};t(this.options.bodyMaterial),t(this.options.hairMaterial),this.forEachShaderMaterial(t);for(let t of this.debugEntries)for(let n of t)n.shaderShadowWidthOverride!==void 0&&n.shaderShadowWidthOverride!==null&&n.shaderValueShadowInfluence!==void 0&&n.shaderValueShadowInfluence!==null&&(n.shaderShadowWidthOverride=e,n.shaderValueShadowInfluence=this.toonValueShadowInfluence)}applyHairShadowMode(){let e=+!!this.isHairShadowEnabled();this.options.hairMaterial.uniforms.uHairShadowEnabled&&(this.options.hairMaterial.uniforms.uHairShadowEnabled.value=e),this.forEachShaderMaterial(t=>{t.userData.pjskMaterialKind===`hair`&&t.uniforms.uHairShadowEnabled&&(t.uniforms.uHairShadowEnabled.value=e)});for(let t of this.options.debug.head)t.resolvedKind===`hair`&&t.shaderHairShadowEnabled!==void 0&&(t.shaderHairShadowEnabled=e)}applyRenderIsolationMode(){let e=this.shouldEnableFaceSdf(),t=this.renderIsolationMode,n={mode:t,faceSdfEnabled:e,eyelightOnly:t===`eyelight_only`,noEyelight:t===`no_eyelight`,faceLayersVisible:t!==`no_face_layers`,outlineOnly:t===`outline_only`,outlineVisible:t!==`no_outline`,noEyeThroughHair:t===`no_eye_through_hair`,eyeThroughHairOnly:t===`eye_through_hair_only`||t===`eye_through_hair_eye_only`||t===`eye_through_hair_eyebrow_only`||t===`eye_through_hair_eyelash_only`};for(let e of this.slots)e.traverse(e=>mx(e,n));for(let t of this.debugEntries)for(let n of t)(n.shaderFaceSdfEnabled!==void 0||n.resolvedKind===`face_sdf`)&&(n.shaderFaceSdfEnabled=e&&n.faceSdfCapable===!0?1:0)}updateEyeThroughHairView(e,t,n){let r=this.cameraDirection.copy(e).sub(t),i=r.lengthSq()>1e-6?r.normalize().dot(n):1;for(let e of this.slots)e.traverse(e=>{let t=e;if(!t.isMesh||!t.userData.pjskEyeThroughHairOverlay&&!t.userData.pjskEyeThroughHairStencilPrepass)return;let n=t.userData.pjskEyeThroughHairBaseVisible,r=typeof n==`boolean`?n:t.visible;if(t.userData.pjskEyeThroughHairStencilPrepass){t.visible=r;return}let a=Array.isArray(t.material)?t.material:[t.material],o=!1;for(let e of a){let t=Db(e,i);o||=t===null||t>.001}t.visible=r&&o})}updateCamera(e){vp(this.options.bodyMaterial,e),vp(this.options.hairMaterial,e),this.forEachShaderMaterial(t=>{t.uniforms.uCameraPosition&&vp(t,e)})}updateFaceBasis(e,t,n){Cp(this.options.faceMaterial,e,t,!0,0),this.forEachShaderMaterial(r=>{r.uniforms.uHeadDotDirectionalLight&&Cp(r,e,t,!0,0),r.uniforms.uHeadPosition&&r.uniforms.uHeadPosition.value.copy(n)})}updatePreviewLight(e,t,n,r,i,a=gb()){let o=this.getBindingView(),{bodyMaterial:s,hairMaterial:c,faceMaterial:l,directionalLight:u,fillLight:d}=this.options;u.position.set(e.x,e.y,e.z),u.intensity=e.intensity,d.intensity=e.ambient,lp(s,{baseColor:t?.proxy.bodyColor??`#f5d6d0`,shadowColor:t?.proxy.shadowColor??`#c79b95`,skinColorDefault:n?.proxy.skinColorDefault??n?.proxy.faceColor??t?.proxy.bodyColor??`#f5d6d0`,skinColor1:n?.proxy.skinColor1??n?.proxy.faceShadeColor??t?.proxy.shadowColor??`#c79b95`,skinColor2:n?.proxy.skinColor2??n?.proxy.faceShadeColor??t?.proxy.shadowColor??`#c79b95`,lightDirection:u.position.clone(),lightIntensity:e.intensity,ambientIntensity:e.ambient,shadowThreshold:e.shadowThreshold,shadowWeight:e.shadowWeight,characterAmbientIntensity:e.characterAmbient,rimColorAlpha:e.rimColorAlpha,controllerRimRange:e.rimRange,controllerRimEdgeSmoothness:e.rimEdgeSmoothness,controllerRimEmission:e.rimEmission,controllerRimLightInfluence:e.rimLightInfluence,rimDirection:a,specularPower:s.uniforms.uSpecularPower.value,rimThreshold:s.uniforms.uRimThreshold.value,shadowTexWeight:s.uniforms.uShadowTexWeight.value,shadowWidthOverride:o.shadowWidthOverride,valueShadowInfluence:o.valueShadowInfluence,saturation:s.uniforms.uSaturation.value,partsAmbientColor:s.uniforms.uPartsAmbientColor.value.clone(),reflectionBlendColor:s.uniforms.uReflectionBlendColor.value.clone(),globalShadowColor:s.uniforms.uGlobalShadowColor.value.clone(),globalShadowAlpha:s.uniforms.uGlobalShadowAlpha.value,controllerAmbientColor:s.uniforms.uControllerAmbientColor.value.clone(),controllerAmbientIntensity:s.uniforms.uControllerAmbientIntensity.value,controllerSpecularColor:s.uniforms.uControllerSpecularColor.value.clone(),controllerSpecularIntensity:s.uniforms.uControllerSpecularIntensity.value,controllerRimColor:s.uniforms.uControllerRimColor.value.clone(),controllerShadowRimColor:s.uniforms.uControllerShadowRimColor.value.clone(),controllerRimColorWeight:s.uniforms.uControllerRimColorWeight.value,controllerShadowRimColorWeight:s.uniforms.uControllerShadowRimColorWeight.value,controllerRimShadowSharpness:e.rimShadowSharpness,bodyDebugMode:o.bodyDebugMode}),lp(c,{baseColor:n?.proxy.hairColor??`#7b5b4a`,shadowColor:n?.proxy.hairShadowColor??`#513d33`,lightDirection:u.position.clone(),lightIntensity:e.intensity,ambientIntensity:e.ambient,shadowThreshold:e.shadowThreshold,shadowWeight:e.shadowWeight,characterAmbientIntensity:e.characterAmbient,rimColorAlpha:e.rimColorAlpha,controllerRimRange:e.rimRange,controllerRimEdgeSmoothness:e.rimEdgeSmoothness,controllerRimEmission:e.rimEmission,controllerRimLightInfluence:e.rimLightInfluence,rimDirection:a,specularPower:c.uniforms.uSpecularPower.value,rimThreshold:c.uniforms.uRimThreshold.value,shadowTexWeight:c.uniforms.uShadowTexWeight.value,shadowWidthOverride:o.shadowWidthOverride,valueShadowInfluence:o.valueShadowInfluence,saturation:c.uniforms.uSaturation.value,partsAmbientColor:c.uniforms.uPartsAmbientColor.value.clone(),reflectionBlendColor:c.uniforms.uReflectionBlendColor.value.clone(),globalShadowColor:c.uniforms.uGlobalShadowColor.value.clone(),globalShadowAlpha:c.uniforms.uGlobalShadowAlpha.value,controllerAmbientColor:c.uniforms.uControllerAmbientColor.value.clone(),controllerAmbientIntensity:c.uniforms.uControllerAmbientIntensity.value,controllerSpecularColor:c.uniforms.uControllerSpecularColor.value.clone(),controllerSpecularIntensity:c.uniforms.uControllerSpecularIntensity.value,controllerRimColor:c.uniforms.uControllerRimColor.value.clone(),controllerShadowRimColor:c.uniforms.uControllerShadowRimColor.value.clone(),controllerRimColorWeight:c.uniforms.uControllerRimColorWeight.value,controllerShadowRimColorWeight:c.uniforms.uControllerShadowRimColorWeight.value,controllerRimShadowSharpness:e.rimShadowSharpness,hairShadowEnabled:!1}),Sp(l,{baseColor:n?.proxy.faceColor??`#ffe4dc`,warmColor:n?.proxy.faceShadeColor??`#ffd4c8`,skinColorDefault:n?.proxy.skinColorDefault??n?.proxy.faceColor??`#ffe4dc`,skinColor1:n?.proxy.skinColor1??n?.proxy.faceShadeColor??`#ffd4c8`,skinColor2:n?.proxy.skinColor2??n?.proxy.faceShadeColor??`#ffd4c8`,lightDirection:i.clone(),lightIntensity:e.intensity,ambientIntensity:e.ambient,headDotDirectionalLight:r,shadowWeight:e.shadowWeight,useLambert:!0,useFaceShadowLimiter:!0,faceShadowLimitRange:0,partsAmbientColor:l.uniforms.uPartsAmbientColor.value.clone(),partsAmbientAlpha:l.uniforms.uPartsAmbientAlpha.value,controllerAmbientColor:l.uniforms.uControllerAmbientColor.value.clone(),controllerAmbientIntensity:l.uniforms.uControllerAmbientIntensity.value,controllerSpecularColor:l.uniforms.uControllerSpecularColor.value.clone(),controllerSpecularIntensity:l.uniforms.uControllerSpecularIntensity.value,controllerRimColor:l.uniforms.uControllerRimColor.value.clone(),controllerShadowRimColor:l.uniforms.uControllerShadowRimColor.value.clone(),controllerRimColorWeight:l.uniforms.uControllerRimColorWeight.value,controllerShadowRimColorWeight:l.uniforms.uControllerShadowRimColorWeight.value,controllerRimRange:e.rimRange,controllerRimEdgeSmoothness:e.rimEdgeSmoothness,controllerRimEmission:e.rimEmission,controllerRimLightInfluence:e.rimLightInfluence,controllerRimShadowSharpness:e.rimShadowSharpness,rimColorAlpha:e.rimColorAlpha,rimDirection:a,specularPower:l.uniforms.uSpecularPower.value,rimThreshold:l.uniforms.uRimThreshold.value,globalShadowColor:l.uniforms.uGlobalShadowColor.value.clone(),globalShadowAlpha:l.uniforms.uGlobalShadowAlpha.value}),this.updateLoadedMaterialLight(e,i,a),this.applyCharacterSkinColors()}updateLoadedMaterialLight(e,t,n=gb()){let r=this.options.directionalLight.position.clone().normalize();this.forEachShaderMaterial(i=>{let a=i.uniforms,o=i.userData.pjskLighting,s=!!(a.uFaceShadowTex||a.uHeadDotDirectionalLight);a.uLightDirection?.value.copy(s?t:r),a.uLightIntensity&&(a.uLightIntensity.value=e.intensity),a.uAmbientIntensity&&(a.uAmbientIntensity.value=e.ambient),a.uShadowThreshold&&(a.uShadowThreshold.value=o?.sekaiShadowThreshold??e.shadowThreshold),a.uShadowWeight&&(a.uShadowWeight.value=e.shadowWeight),a.uCharacterAmbientIntensity&&(a.uCharacterAmbientIntensity.value=e.characterAmbient),a.uRimColorAlpha&&(a.uRimColorAlpha.value=e.rimColorAlpha),a.uControllerRimRange&&(a.uControllerRimRange.value=e.rimRange),a.uControllerRimEdgeSmoothness&&(a.uControllerRimEdgeSmoothness.value=e.rimEdgeSmoothness),a.uControllerRimEmission&&(a.uControllerRimEmission.value=e.rimEmission),a.uControllerRimLightInfluence&&(a.uControllerRimLightInfluence.value=e.rimLightInfluence),a.uControllerRimShadowSharpness&&(a.uControllerRimShadowSharpness.value=e.rimShadowSharpness),a.uRimDirection?.value.copy(n)})}updateGlobalShadowColor(e,t=1){let n=$(new Y,e),r=H.clamp(t,0,1),i=e=>{e.uniforms.uGlobalShadowColor?.value.copy(n),e.uniforms.uGlobalShadowAlpha&&(e.uniforms.uGlobalShadowAlpha.value=r)};for(let e of[this.options.bodyMaterial,this.options.hairMaterial])i(e);this.forEachShaderMaterial(i)}updateControllerColors(e){let t=e.ambientColor==null?new Y().setRGB(s.ambientColor.r,s.ambientColor.g,s.ambientColor.b):$(new Y,e.ambientColor),n=$(new Y,e.specularColor??`#ffffff`),r=e.rimColor==null?new Y().setRGB(s.rimColor.r,s.rimColor.g,s.rimColor.b):$(new Y,e.rimColor),i=e.shadowRimColor==null?new Y().setRGB(s.shadowRimColor.r,s.shadowRimColor.g,s.shadowRimColor.b):$(new Y,e.shadowRimColor),a=a=>{a.uniforms.uControllerAmbientColor?.value.copy(t),a.uniforms.uControllerAmbientIntensity&&(a.uniforms.uControllerAmbientIntensity.value=Math.max(e.ambientIntensity??1,0)),a.uniforms.uControllerSpecularColor?.value.copy(n),a.uniforms.uControllerSpecularIntensity&&(a.uniforms.uControllerSpecularIntensity.value=Math.max(e.specularIntensity??1,0)),a.uniforms.uControllerRimColor?.value.copy(r),a.uniforms.uControllerShadowRimColor?.value.copy(i),a.uniforms.uControllerRimColorWeight&&(a.uniforms.uControllerRimColorWeight.value=1),a.uniforms.uControllerShadowRimColorWeight&&(a.uniforms.uControllerShadowRimColorWeight.value=1)};for(let e of[this.options.bodyMaterial,this.options.hairMaterial])a(e);this.forEachShaderMaterial(a)}updateControllerRimShape(e){let t=Math.max(e.edgeSmoothness??s.rimEdgeSmoothness,0),n=Math.max(e.emission??s.rimEmission,0),r=H.clamp(e.shadowSharpness??s.rimShadowSharpness,0,1),i=e=>{e.uniforms.uControllerRimEdgeSmoothness&&(e.uniforms.uControllerRimEdgeSmoothness.value=t),e.uniforms.uControllerRimEmission&&(e.uniforms.uControllerRimEmission.value=n),e.uniforms.uControllerRimShadowSharpness&&(e.uniforms.uControllerRimShadowSharpness.value=r)};for(let e of[this.options.bodyMaterial,this.options.hairMaterial])i(e);this.forEachShaderMaterial(i)}updateControllerOutline(e){this.controllerOutlineColor=e.color?$(new Y,e.color):new Y().setRGB(ox.color.r,ox.color.g,ox.color.b),this.controllerOutlineBlending=H.clamp(e.blending??ox.blending,0,1);for(let e of this.slots)e.traverse(e=>{let t=e;if(!t.isMesh||!t.userData.pjskOutlineShell)return;let n=Array.isArray(t.material)?t.material:[t.material];for(let e of n)e.userData.pjskOutlineController&&this.applyOutlineMaterial(e)})}applyOutlineMaterial(e){ux(e,this.controllerOutlineColor,this.controllerOutlineBlending)}},Mx=class{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0,this.workerCreator=null}_initWorker(e){if(!this.workers[e]){let t=this.workerCreator();t.addEventListener(`message`,this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){let n=this.workersResolve[e];if(n&&n(t),this.queue.length){let{resolve:t,msg:n,transfer:r}=this.queue.shift();this.workersResolve[e]=t,this.workers[e].postMessage(n,r)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(n=>{let r=this._getIdleWorker();r===-1?this.queue.push({resolve:n,msg:e,transfer:t}):(this._initWorker(r),this.workerStatus|=1<<r,this.workersResolve[r]=n,this.workers[r].postMessage(e,t))})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}},Nx=1000054e3,Px=1000054001,Fx=1000054004,Ix=1000054005,Lx=1000066e3,Rx=1000066004,zx=class{constructor(e,t,n,r){this._dataView=void 0,this._littleEndian=void 0,this._offset=void 0,this._dataView=new DataView(e.buffer,e.byteOffset+t,n),this._littleEndian=r,this._offset=0}_nextUint8(){let e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){let e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){let e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){let e=this._dataView.getUint32(this._offset,this._littleEndian)+2**32*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){let e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint8Array(e){let t=new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+this._offset,e);return this._offset+=e,t}_skip(e){return this._offset+=e,this}_scan(e,t=0){let n=this._offset,r=0;for(;this._dataView.getUint8(this._offset)!==t&&r<e;)r++,this._offset++;return r<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+n,r)}};new Uint8Array([0]);var Bx=[171,75,84,88,32,50,48,187,13,10,26,10];function Vx(e){return new TextDecoder().decode(e)}function Hx(e){let t=new Uint8Array(e.buffer,e.byteOffset,Bx.length);if(t[0]!==Bx[0]||t[1]!==Bx[1]||t[2]!==Bx[2]||t[3]!==Bx[3]||t[4]!==Bx[4]||t[5]!==Bx[5]||t[6]!==Bx[6]||t[7]!==Bx[7]||t[8]!==Bx[8]||t[9]!==Bx[9]||t[10]!==Bx[10]||t[11]!==Bx[11])throw Error(`Missing KTX 2.0 identifier.`);let n={vkFormat:0,typeSize:1,pixelWidth:0,pixelHeight:0,pixelDepth:0,layerCount:0,faceCount:1,levelCount:0,supercompressionScheme:0,levels:[],dataFormatDescriptor:[{vendorId:0,descriptorType:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],keyValue:{},globalData:null},r=17*Uint32Array.BYTES_PER_ELEMENT,i=new zx(e,Bx.length,r,!0);n.vkFormat=i._nextUint32(),n.typeSize=i._nextUint32(),n.pixelWidth=i._nextUint32(),n.pixelHeight=i._nextUint32(),n.pixelDepth=i._nextUint32(),n.layerCount=i._nextUint32(),n.faceCount=i._nextUint32(),n.levelCount=i._nextUint32(),n.supercompressionScheme=i._nextUint32();let a=i._nextUint32(),o=i._nextUint32(),s=i._nextUint32(),c=i._nextUint32(),l=i._nextUint64(),u=i._nextUint64(),d=3*Math.max(n.levelCount,1)*8,f=new zx(e,Bx.length+r,d,!0);for(let t=0,r=Math.max(n.levelCount,1);t<r;t++)n.levels.push({levelData:new Uint8Array(e.buffer,e.byteOffset+f._nextUint64(),f._nextUint64()),uncompressedByteLength:f._nextUint64()});let p=new zx(e,a,o,!0);p._skip(4);let m=p._nextUint16(),h=p._nextUint16(),g=p._nextUint16(),_=p._nextUint16(),v={vendorId:m,descriptorType:h,versionNumber:g,colorModel:p._nextUint8(),colorPrimaries:p._nextUint8(),transferFunction:p._nextUint8(),flags:p._nextUint8(),texelBlockDimension:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],bytesPlane:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],samples:[]},y=(_/4-6)/4;for(let e=0;e<y;e++){let t={bitOffset:p._nextUint16(),bitLength:p._nextUint8(),channelType:p._nextUint8(),samplePosition:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&t.channelType?(t.sampleLower=p._nextInt32(),t.sampleUpper=p._nextInt32()):(t.sampleLower=p._nextUint32(),t.sampleUpper=p._nextUint32()),v.samples[e]=t}n.dataFormatDescriptor.length=0,n.dataFormatDescriptor.push(v);let b=new zx(e,s,c,!0);for(;b._offset<c;){let e=b._nextUint32(),t=b._scan(e),r=Vx(t);if(n.keyValue[r]=b._nextUint8Array(e-t.byteLength-1),r.match(/^ktx/i)){let e=Vx(n.keyValue[r]);n.keyValue[r]=e.substring(0,e.lastIndexOf(`\0`))}b._skip(e%4?4-e%4:0)}if(u<=0)return n;let x=new zx(e,l,u,!0),S=x._nextUint16(),C=x._nextUint16(),w=x._nextUint32(),T=x._nextUint32(),E=x._nextUint32(),D=x._nextUint32(),O=[];for(let e=0,t=Math.max(n.levelCount,1);e<t;e++)O.push({imageFlags:x._nextUint32(),rgbSliceByteOffset:x._nextUint32(),rgbSliceByteLength:x._nextUint32(),alphaSliceByteOffset:x._nextUint32(),alphaSliceByteLength:x._nextUint32()});let k=l+x._offset,A=k+w,ee=A+T,te=ee+E;return n.globalData={endpointCount:S,selectorCount:C,imageDescs:O,endpointsData:new Uint8Array(e.buffer,e.byteOffset+k,w),selectorsData:new Uint8Array(e.buffer,e.byteOffset+A,T),tablesData:new Uint8Array(e.buffer,e.byteOffset+ee,E),extendedData:new Uint8Array(e.buffer,e.byteOffset+te,D)},n}var Ux,Wx,Gx,Kx={env:{emscripten_notify_memory_growth:function(e){Gx=new Uint8Array(Wx.exports.memory.buffer)}}},qx=class{init(){return Ux||(Ux=typeof fetch<`u`?fetch(`data:application/wasm;base64,`+Jx).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,Kx)).then(this._init):WebAssembly.instantiate(Buffer.from(Jx,`base64`),Kx).then(this._init),Ux)}_init(e){Wx=e.instance,Kx.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!Wx)throw Error(`ZSTDDecoder: Await .init() before decoding.`);let n=e.byteLength,r=Wx.exports.malloc(n);Gx.set(e,r),t||=Number(Wx.exports.ZSTD_findDecompressedSize(r,n));let i=Wx.exports.malloc(t),a=Wx.exports.ZSTD_decompress(i,t,r,n),o=Gx.slice(i,i+a);return Wx.exports.free(r),Wx.exports.free(i),o}},Jx=`AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY0AAQMyIFEAMiBg0AIANBHzYCfCADIANB/ABqIANB+ABqIAQgBCAFaiAGGyIEIAEgAmoiAiAEaxAVIgUQAw0AIAMoAnwiBkEfSw0AIAMoAngiB0EJTw0AIABBiCBqIAMgBkGAC0GADCAHEBggA0E0NgJ8IAMgA0H8AGogA0H4AGogBCAFaiIEIAIgBGsQFSIFEAMNACADKAJ8IgZBNEsNACADKAJ4IgdBCk8NACAAQZAwaiADIAZBgA1B4A4gBxAYIANBIzYCfCADIANB/ABqIANB+ABqIAQgBWoiBCACIARrEBUiBRADDQAgAygCfCIGQSNLDQAgAygCeCIHQQpPDQAgACADIAZBwBBB0BEgBxAYIAQgBWoiBEEMaiIFIAJLDQAgAiAFayEFQQAhAgNAIAJBA0cEQCAEKAAAIgZBf2ogBU8NAiAAIAJBAnRqQZzQAWogBjYCACACQQFqIQIgBEEEaiEEDAELCyAEIAFrIQgLIANBgAFqJAAgCAtGAQN/IABBCGohAyAAKAIEIQJBACEAA0AgACACdkUEQCABIAMgAEEDdGotAAJBFktqIQEgAEEBaiEADAELCyABQQggAmt0C4YDAQV/Qbh/IQcCQCADRQ0AIAItAAAiBEUEQCABQQA2AgBBAUG4fyADQQFGGw8LAn8gAkEBaiIFIARBGHRBGHUiBkF/Sg0AGiAGQX9GBEAgA0EDSA0CIAUvAABBgP4BaiEEIAJBA2oMAQsgA0ECSA0BIAItAAEgBEEIdHJBgIB+aiEEIAJBAmoLIQUgASAENgIAIAVBAWoiASACIANqIgNLDQBBbCEHIABBEGogACAFLQAAIgVBBnZBI0EJIAEgAyABa0HAEEHQEUHwEiAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBmCBqIABBCGogBUEEdkEDcUEfQQggASABIAZqIAgbIgEgAyABa0GAC0GADEGAFyAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBoDBqIABBBGogBUECdkEDcUE0QQkgASABIAZqIAgbIgEgAyABa0GADUHgDkGQGSAAKAKM4QEgACgCnOIBIAQQHyIAEAMNACAAIAFqIAJrIQcLIAcLrQMBCn8jAEGABGsiCCQAAn9BUiACQf8BSw0AGkFUIANBDEsNABogAkEBaiELIABBBGohCUGAgAQgA0F/anRBEHUhCkEAIQJBASEEQQEgA3QiB0F/aiIMIQUDQCACIAtGRQRAAkAgASACQQF0Ig1qLwEAIgZB//8DRgRAIAkgBUECdGogAjoAAiAFQX9qIQVBASEGDAELIARBACAKIAZBEHRBEHVKGyEECyAIIA1qIAY7AQAgAkEBaiECDAELCyAAIAQ7AQIgACADOwEAIAdBA3YgB0EBdmpBA2ohBkEAIQRBACECA0AgBCALRkUEQCABIARBAXRqLgEAIQpBACEAA0AgACAKTkUEQCAJIAJBAnRqIAQ6AAIDQCACIAZqIAxxIgIgBUsNAAsgAEEBaiEADAELCyAEQQFqIQQMAQsLQX8gAg0AGkEAIQIDfyACIAdGBH9BAAUgCCAJIAJBAnRqIgAtAAJBAXRqIgEgAS8BACIBQQFqOwEAIAAgAyABEBRrIgU6AAMgACABIAVB/wFxdCAHazsBACACQQFqIQIMAQsLCyEFIAhBgARqJAAgBQvjBgEIf0FsIQcCQCACQQNJDQACQAJAAkACQCABLQAAIgNBA3EiCUEBaw4DAwEAAgsgACgCiOEBDQBBYg8LIAJBBUkNAkEDIQYgASgAACEFAn8CQAJAIANBAnZBA3EiCEF+aiIEQQFNBEAgBEEBaw0BDAILIAVBDnZB/wdxIQQgBUEEdkH/B3EhAyAIRQwCCyAFQRJ2IQRBBCEGIAVBBHZB//8AcSEDQQAMAQsgBUEEdkH//w9xIgNBgIAISw0DIAEtAARBCnQgBUEWdnIhBEEFIQZBAAshBSAEIAZqIgogAksNAgJAIANBgQZJDQAgACgCnOIBRQ0AQQAhAgNAIAJBg4ABSw0BIAJBQGshAgwAAAsACwJ/IAlBA0YEQCABIAZqIQEgAEHw4gFqIQIgACgCDCEGIAUEQCACIAMgASAEIAYQXwwCCyACIAMgASAEIAYQXQwBCyAAQbjQAWohAiABIAZqIQEgAEHw4gFqIQYgAEGo0ABqIQggBQRAIAggBiADIAEgBCACEF4MAQsgCCAGIAMgASAEIAIQXAsQAw0CIAAgAzYCgOIBIABBATYCiOEBIAAgAEHw4gFqNgLw4QEgCUECRgRAIAAgAEGo0ABqNgIMCyAAIANqIgBBiOMBakIANwAAIABBgOMBakIANwAAIABB+OIBakIANwAAIABB8OIBakIANwAAIAoPCwJ/AkACQAJAIANBAnZBA3FBf2oiBEECSw0AIARBAWsOAgACAQtBASEEIANBA3YMAgtBAiEEIAEvAABBBHYMAQtBAyEEIAEQIUEEdgsiAyAEaiIFQSBqIAJLBEAgBSACSw0CIABB8OIBaiABIARqIAMQCyEBIAAgAzYCgOIBIAAgATYC8OEBIAEgA2oiAEIANwAYIABCADcAECAAQgA3AAggAEIANwAAIAUPCyAAIAM2AoDiASAAIAEgBGo2AvDhASAFDwsCfwJAAkACQCADQQJ2QQNxQX9qIgRBAksNACAEQQFrDgIAAgELQQEhByADQQN2DAILQQIhByABLwAAQQR2DAELIAJBBEkgARAhIgJBj4CAAUtyDQFBAyEHIAJBBHYLIQIgAEHw4gFqIAEgB2otAAAgAkEgahAQIQEgACACNgKA4gEgACABNgLw4QEgB0EBaiEHCyAHC0sAIABC+erQ0OfJoeThADcDICAAQgA3AxggAELP1tO+0ser2UI3AxAgAELW64Lu6v2J9eAANwMIIABCADcDACAAQShqQQBBKBAQGgviAgICfwV+IABBKGoiASAAKAJIaiECAn4gACkDACIDQiBaBEAgACkDECIEQgeJIAApAwgiBUIBiXwgACkDGCIGQgyJfCAAKQMgIgdCEol8IAUQGSAEEBkgBhAZIAcQGQwBCyAAKQMYQsXP2bLx5brqJ3wLIAN8IQMDQCABQQhqIgAgAk0EQEIAIAEpAAAQCSADhUIbiUKHla+vmLbem55/fkLj3MqV/M7y9YV/fCEDIAAhAQwBCwsCQCABQQRqIgAgAksEQCABIQAMAQsgASgAAK1Ch5Wvr5i23puef34gA4VCF4lCz9bTvtLHq9lCfkL5893xmfaZqxZ8IQMLA0AgACACSQRAIAAxAABCxc/ZsvHluuonfiADhUILiUKHla+vmLbem55/fiEDIABBAWohAAwBCwsgA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC+8CAgJ/BH4gACAAKQMAIAKtfDcDAAJAAkAgACgCSCIDIAJqIgRBH00EQCABRQ0BIAAgA2pBKGogASACECAgACgCSCACaiEEDAELIAEgAmohAgJ/IAMEQCAAQShqIgQgA2ogAUEgIANrECAgACAAKQMIIAQpAAAQCTcDCCAAIAApAxAgACkAMBAJNwMQIAAgACkDGCAAKQA4EAk3AxggACAAKQMgIABBQGspAAAQCTcDICAAKAJIIQMgAEEANgJIIAEgA2tBIGohAQsgAUEgaiACTQsEQCACQWBqIQMgACkDICEFIAApAxghBiAAKQMQIQcgACkDCCEIA0AgCCABKQAAEAkhCCAHIAEpAAgQCSEHIAYgASkAEBAJIQYgBSABKQAYEAkhBSABQSBqIgEgA00NAAsgACAFNwMgIAAgBjcDGCAAIAc3AxAgACAINwMICyABIAJPDQEgAEEoaiABIAIgAWsiBBAgCyAAIAQ2AkgLCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQEBogAwVBun8LCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQCxogAwVBun8LC6gCAQZ/IwBBEGsiByQAIABB2OABaikDAEKAgIAQViEIQbh/IQUCQCAEQf//B0sNACAAIAMgBBBCIgUQAyIGDQAgACgCnOIBIQkgACAHQQxqIAMgAyAFaiAGGyIKIARBACAFIAYbayIGEEAiAxADBEAgAyEFDAELIAcoAgwhBCABRQRAQbp/IQUgBEEASg0BCyAGIANrIQUgAyAKaiEDAkAgCQRAIABBADYCnOIBDAELAkACQAJAIARBBUgNACAAQdjgAWopAwBCgICACFgNAAwBCyAAQQA2ApziAQwBCyAAKAIIED8hBiAAQQA2ApziASAGQRRPDQELIAAgASACIAMgBSAEIAgQOSEFDAELIAAgASACIAMgBSAEIAgQOiEFCyAHQRBqJAAgBQtnACAAQdDgAWogASACIAAoAuzhARAuIgEQAwRAIAEPC0G4fyECAkAgAQ0AIABB7OABaigCACIBBEBBYCECIAAoApjiASABRw0BC0EAIQIgAEHw4AFqKAIARQ0AIABBkOEBahBDCyACCycBAX8QVyIERQRAQUAPCyAEIAAgASACIAMgBBBLEE8hACAEEFYgAAs/AQF/AkACQAJAIAAoAqDiAUEBaiIBQQJLDQAgAUEBaw4CAAECCyAAEDBBAA8LIABBADYCoOIBCyAAKAKU4gELvAMCB38BfiMAQRBrIgkkAEG4fyEGAkAgBCgCACIIQQVBCSAAKALs4QEiBRtJDQAgAygCACIHQQFBBSAFGyAFEC8iBRADBEAgBSEGDAELIAggBUEDakkNACAAIAcgBRBJIgYQAw0AIAEgAmohCiAAQZDhAWohCyAIIAVrIQIgBSAHaiEHIAEhBQNAIAcgAiAJECwiBhADDQEgAkF9aiICIAZJBEBBuH8hBgwCCyAJKAIAIghBAksEQEFsIQYMAgsgB0EDaiEHAn8CQAJAAkAgCEEBaw4CAgABCyAAIAUgCiAFayAHIAYQSAwCCyAFIAogBWsgByAGEEcMAQsgBSAKIAVrIActAAAgCSgCCBBGCyIIEAMEQCAIIQYMAgsgACgC8OABBEAgCyAFIAgQRQsgAiAGayECIAYgB2ohByAFIAhqIQUgCSgCBEUNAAsgACkD0OABIgxCf1IEQEFsIQYgDCAFIAFrrFINAQsgACgC8OABBEBBaiEGIAJBBEkNASALEEQhDCAHKAAAIAynRw0BIAdBBGohByACQXxqIQILIAMgBzYCACAEIAI2AgAgBSABayEGCyAJQRBqJAAgBgsuACAAECsCf0EAQQAQAw0AGiABRSACRXJFBEBBYiAAIAEgAhA9EAMNARoLQQALCzcAIAEEQCAAIAAoAsTgASABKAIEIAEoAghqRzYCnOIBCyAAECtBABADIAFFckUEQCAAIAEQWwsL0QIBB38jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAFBEAgBSgCBCEKIAUoAgghCQsgASEIAkACQANAIAAoAuzhARAWIQsCQANAIAQgC0kNASADKAAAQXBxQdDUtMIBRgRAIAMgBBAiIgcQAw0EIAQgB2shBCADIAdqIQMMAQsLIAYgAzYCDCAGIAQ2AggCQCAFBEAgACAFEE5BACEHQQAQA0UNAQwFCyAAIAogCRBNIgcQAw0ECyAAIAgQUCAMQQFHQQAgACAIIAIgBkEMaiAGQQhqEEwiByIDa0EAIAMQAxtBCkdyRQRAQbh/IQcMBAsgBxADDQMgAiAHayECIAcgCGohCEEBIQwgBigCDCEDIAYoAgghBAwBCwsgBiADNgIMIAYgBDYCCEG4fyEHIAQNASAIIAFrIQcMAQsgBiADNgIMIAYgBDYCCAsgBkEQaiQAIAcLRgECfyABIAAoArjgASICRwRAIAAgAjYCxOABIAAgATYCuOABIAAoArzgASEDIAAgATYCvOABIAAgASADIAJrajYCwOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ`,Yx=`display-p3`,Xx=`display-p3-linear`;({...q.spaces[tt]});var Zx=new URL(new URL(`basis_transcoder-VXdx5NbI.wasm`,import.meta.url).href,``+import.meta.url).toString(),Qx=new URL(new URL(`basis_transcoder-o4Hde_L7.js`,import.meta.url).href,``+import.meta.url).toString(),$x=new WeakMap,eS=0,tS,nS=class e extends ja{constructor(e){super(e),this.transcoderPath=``,this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new Mx,this.workerSourceURL=``,this.workerConfig=null,typeof MSC_TRANSCODER<`u`&&console.warn(`THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.`)}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerPool.setWorkerLimit(e),this}async detectSupportAsync(e){return console.warn(`KTX2Loader: "detectSupportAsync()" has been deprecated. Use "detectSupport()" and "await renderer.init();" when creating the renderer.`),await e.init(),this.detectSupport(e)}detectSupport(e){return e.isWebGPURenderer===!0?this.workerConfig={astcSupported:e.hasFeature(`texture-compression-astc`),astcHDRSupported:!1,etc1Supported:e.hasFeature(`texture-compression-etc1`),etc2Supported:e.hasFeature(`texture-compression-etc2`),dxtSupported:e.hasFeature(`texture-compression-s3tc`),bptcSupported:e.hasFeature(`texture-compression-bc`),pvrtcSupported:e.hasFeature(`texture-compression-pvrtc`)}:(this.workerConfig={astcSupported:e.extensions.has(`WEBGL_compressed_texture_astc`),astcHDRSupported:e.extensions.has(`WEBGL_compressed_texture_astc`)&&e.extensions.get(`WEBGL_compressed_texture_astc`).getSupportedProfiles().includes(`hdr`),etc1Supported:e.extensions.has(`WEBGL_compressed_texture_etc1`),etc2Supported:e.extensions.has(`WEBGL_compressed_texture_etc`),dxtSupported:e.extensions.has(`WEBGL_compressed_texture_s3tc`),bptcSupported:e.extensions.has(`EXT_texture_compression_bptc`),pvrtcSupported:e.extensions.has(`WEBGL_compressed_texture_pvrtc`)||e.extensions.has(`WEBKIT_WEBGL_compressed_texture_pvrtc`)},typeof navigator<`u`&&navigator.platform!==void 0&&navigator.userAgent!==void 0&&navigator.platform.indexOf(`Linux`)>=0&&navigator.userAgent.indexOf(`Android`)<0&&this.workerConfig.astcSupported&&this.workerConfig.etc2Supported&&this.workerConfig.bptcSupported&&this.workerConfig.dxtSupported&&(this.workerConfig.astcSupported=!1,this.workerConfig.etc1Supported=!1,this.workerConfig.etc2Supported=!1)),this}init(){if(!this.transcoderPending){let t=new Pa(this.manager);t.setWithCredentials(this.withCredentials);let n=new Pa(this.manager);n.setWithCredentials(this.withCredentials),n.setResponseType(`arraybuffer`);let r,i;this.transcoderPath===``?(r=t.loadAsync(Qx),i=n.loadAsync(Zx)):(t.setPath(this.transcoderPath),r=t.loadAsync(`basis_transcoder.js`),n.setPath(this.transcoderPath),i=n.loadAsync(`basis_transcoder.wasm`)),this.transcoderPending=Promise.all([r,i]).then(([t,n])=>{let r=e.BasisWorker.toString(),i=[`/* constants */`,`let _EngineFormat = `+JSON.stringify(e.EngineFormat),`let _EngineType = `+JSON.stringify(e.EngineType),`let _TranscoderFormat = `+JSON.stringify(e.TranscoderFormat),`let _BasisFormat = `+JSON.stringify(e.BasisFormat),`/* basis_transcoder.js */`,t,`/* worker */`,r.substring(r.indexOf(`{`)+1,r.lastIndexOf(`}`))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([i])),this.transcoderBinary=n,this.workerPool.setWorkerCreator(()=>{let e=new Worker(this.workerSourceURL),t=this.transcoderBinary.slice(0);return e.postMessage({type:`init`,config:this.workerConfig,transcoderBinary:t},[t]),e})}),eS>0&&console.warn(`THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances.`),eS++}return this.transcoderPending}load(e,t,n,r){if(this.workerConfig===null)throw Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");let i=new Pa(this.manager);i.setPath(this.path),i.setCrossOrigin(this.crossOrigin),i.setWithCredentials(this.withCredentials),i.setRequestHeader(this.requestHeader),i.setResponseType(`arraybuffer`),i.load(e,e=>{this.parse(e,t,r)},n,r)}parse(e,t,n){if(this.workerConfig===null)throw Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");if($x.has(e))return $x.get(e).promise.then(t).catch(n);this._createTexture(e).then(e=>t?t(e):null).catch(n)}_createTextureFrom(e,t){let{type:n,error:r,data:{faces:i,width:a,height:o,format:s,type:c,dfdFlags:l}}=e;if(n===`error`)return Promise.reject(r);let u;if(t.faceCount===6)u=new Li(i,s,c);else{let e=i[0].mipmaps;u=t.layerCount>1?new Ii(e,a,o,t.layerCount,s,c):new Fi(e,a,o,s,c)}return u.minFilter=i[0].mipmaps.length===1?y:x,u.magFilter=y,u.generateMipmaps=!1,u.needsUpdate=!0,u.colorSpace=cS(t),u.premultiplyAlpha=!!(l&1),u}async _createTexture(e,t={}){let n=Hx(new Uint8Array(e)),r=n.vkFormat===1000066e3&&n.dataFormatDescriptor[0].colorModel===167;if(!(n.vkFormat===0||r&&!this.workerConfig.astcHDRSupported))return sS(n);let i=t,a=this.init().then(()=>this.workerPool.postMessage({type:`transcode`,buffer:e,taskConfig:i},[e])).then(e=>this._createTextureFrom(e.data,n));return $x.set(e,{promise:a}),a}dispose(){this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),eS--}};nS.BasisFormat={ETC1S:0,UASTC:1,UASTC_HDR:2},nS.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16,BC6H:22,RGB_HALF:24,RGBA_HALF:25},nS.EngineFormat={RGBAFormat:re,RGBA_ASTC_4x4_Format:Te,RGB_BPTC_UNSIGNED_Format:R,RGBA_BPTC_Format:Le,RGBA_ETC2_EAC_Format:be,RGBA_PVRTC_4BPPV1_Format:ge,RGBA_S3TC_DXT5_Format:pe,RGB_ETC1_Format:ve,RGB_ETC2_Format:ye,RGB_PVRTC_4BPPV1_Format:me,RGBA_S3TC_DXT1_Format:de},nS.EngineType={UnsignedByteType:S,HalfFloatType:k,FloatType:O},nS.BasisWorker=function(){let e,t,n,r=_EngineFormat,i=_EngineType,a=_TranscoderFormat,o=_BasisFormat;self.addEventListener(`message`,function(n){let r=n.data;switch(r.type){case`init`:e=r.config,s(r.transcoderBinary);break;case`transcode`:t.then(()=>{try{let{faces:e,buffers:t,width:n,height:i,hasAlpha:a,format:o,type:s,dfdFlags:l}=c(r.buffer);self.postMessage({type:`transcode`,id:r.id,data:{faces:e,width:n,height:i,hasAlpha:a,format:o,type:s,dfdFlags:l}},t)}catch(e){console.error(e),self.postMessage({type:`error`,id:r.id,error:e.message})}})}});function s(e){t=new Promise(t=>{n={wasmBinary:e,onRuntimeInitialized:t},BASIS(n)}).then(()=>{n.initializeBasis(),n.KTX2File===void 0&&console.warn(`THREE.KTX2Loader: Please update Basis Universal transcoder.`)})}function c(e){let t=new n.KTX2File(new Uint8Array(e));function r(){t.close(),t.delete()}if(!t.isValid())throw r(),Error(`THREE.KTX2Loader:	Invalid or unsupported .ktx2 file`);let a;if(t.isUASTC())a=o.UASTC;else if(t.isETC1S())a=o.ETC1S;else if(t.isHDR())a=o.UASTC_HDR;else throw Error(`THREE.KTX2Loader: Unknown Basis encoding`);let s=t.getWidth(),c=t.getHeight(),l=t.getLayers()||1,u=t.getLevels(),f=t.getFaces(),m=t.getHasAlpha(),h=t.getDFDFlags(),{transcoderFormat:g,engineFormat:_,engineType:v}=d(a,s,c,m);if(!s||!c||!u)throw r(),Error(`THREE.KTX2Loader:	Invalid texture`);if(!t.startTranscoding())throw r(),Error(`THREE.KTX2Loader: .startTranscoding failed`);let y=[],b=[];for(let e=0;e<f;e++){let n=[];for(let a=0;a<u;a++){let o=[],s,c;for(let n=0;n<l;n++){let l=t.getImageLevelInfo(a,n,e);e===0&&a===0&&n===0&&(l.origWidth%4!=0||l.origHeight%4!=0)&&console.warn(`THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions.`),u>1?(s=l.origWidth,c=l.origHeight):(s=l.width,c=l.height);let d=new Uint8Array(t.getImageTranscodedSizeInBytes(a,n,0,g)),f=t.transcodeImage(d,a,n,e,g,0,-1,-1);if(v===i.HalfFloatType&&(d=new Uint16Array(d.buffer,d.byteOffset,d.byteLength/Uint16Array.BYTES_PER_ELEMENT)),!f)throw r(),Error(`THREE.KTX2Loader: .transcodeImage failed.`);o.push(d)}let d=p(o);n.push({data:d,width:s,height:c}),b.push(d.buffer)}y.push({mipmaps:n,width:s,height:c,format:_,type:v})}return r(),{faces:y,buffers:b,width:s,height:c,hasAlpha:m,dfdFlags:h,format:_,type:v}}let l=[{if:`astcSupported`,basisFormat:[o.UASTC],transcoderFormat:[a.ASTC_4x4,a.ASTC_4x4],engineFormat:[r.RGBA_ASTC_4x4_Format,r.RGBA_ASTC_4x4_Format],engineType:[i.UnsignedByteType],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:`bptcSupported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.BC7_M5,a.BC7_M5],engineFormat:[r.RGBA_BPTC_Format,r.RGBA_BPTC_Format],engineType:[i.UnsignedByteType],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:`dxtSupported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.BC1,a.BC3],engineFormat:[r.RGBA_S3TC_DXT1_Format,r.RGBA_S3TC_DXT5_Format],engineType:[i.UnsignedByteType],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:`etc2Supported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.ETC1,a.ETC2],engineFormat:[r.RGB_ETC2_Format,r.RGBA_ETC2_EAC_Format],engineType:[i.UnsignedByteType],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:`etc1Supported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.ETC1],engineFormat:[r.RGB_ETC1_Format],engineType:[i.UnsignedByteType],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:`pvrtcSupported`,basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.PVRTC1_4_RGB,a.PVRTC1_4_RGBA],engineFormat:[r.RGB_PVRTC_4BPPV1_Format,r.RGBA_PVRTC_4BPPV1_Format],engineType:[i.UnsignedByteType],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0},{if:`bptcSupported`,basisFormat:[o.UASTC_HDR],transcoderFormat:[a.BC6H],engineFormat:[r.RGB_BPTC_UNSIGNED_Format],engineType:[i.HalfFloatType],priorityHDR:1,needsPowerOfTwo:!1},{basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[a.RGBA32,a.RGBA32],engineFormat:[r.RGBAFormat,r.RGBAFormat],engineType:[i.UnsignedByteType,i.UnsignedByteType],priorityETC1S:100,priorityUASTC:100,needsPowerOfTwo:!1},{basisFormat:[o.UASTC_HDR],transcoderFormat:[a.RGBA_HALF],engineFormat:[r.RGBAFormat],engineType:[i.HalfFloatType],priorityHDR:100,needsPowerOfTwo:!1}],u={[o.ETC1S]:l.filter(e=>e.basisFormat.includes(o.ETC1S)).sort((e,t)=>e.priorityETC1S-t.priorityETC1S),[o.UASTC]:l.filter(e=>e.basisFormat.includes(o.UASTC)).sort((e,t)=>e.priorityUASTC-t.priorityUASTC),[o.UASTC_HDR]:l.filter(e=>e.basisFormat.includes(o.UASTC_HDR)).sort((e,t)=>e.priorityHDR-t.priorityHDR)};function d(t,n,r,i){let a=u[t];for(let o=0;o<a.length;o++){let s=a[o];if((!s.if||e[s.if])&&s.basisFormat.includes(t)&&!(i&&s.transcoderFormat.length<2)&&(!s.needsPowerOfTwo||f(n)&&f(r)))return{transcoderFormat:s.transcoderFormat[+!!i],engineFormat:s.engineFormat[+!!i],engineType:s.engineType[0]}}throw Error(`THREE.KTX2Loader: Failed to identify transcoding target.`)}function f(e){return e<=2||!(e&e-1)&&e!==0}function p(e){if(e.length===1)return e[0];let t=0;for(let n=0;n<e.length;n++){let r=e[n];t+=r.byteLength}let n=new Uint8Array(t),r=0;for(let t=0;t<e.length;t++){let i=e[t];n.set(i,r),r+=i.byteLength}return n}};var rS=new Set([re,ne,P,oe]),iS=new Set([91]),aS={109:re,103:P,100:oe,97:re,83:P,76:oe,91:re,43:re,37:re,22:P,16:P,15:oe,9:oe,123:ne,122:ne,152:be,148:ye,153:xe,154:Se,155:Ce,156:we,[Lx]:Te,158:Te,157:Te,[Rx]:ke,166:ke,165:ke,134:de,133:de,132:ue,131:ue,138:pe,137:pe,140:ze,139:Re,142:Ve,141:Be,146:Le,145:Le,[Ix]:ge,[Px]:ge,[Fx]:_e,[Nx]:_e},oS={109:O,103:O,100:O,97:k,83:k,76:k,91:T,43:S,37:S,22:S,16:S,15:S,9:S,123:j,122:M,152:S,148:S,153:S,154:S,155:S,156:S,[Lx]:k,158:S,157:S,[Rx]:k,166:S,165:S,134:S,133:S,132:S,131:S,138:S,137:S,140:S,139:S,142:S,141:S,146:S,145:S,[Ix]:S,[Px]:S,[Fx]:S,[Nx]:S};async function sS(e){let{vkFormat:t}=e;if(aS[t]===void 0)throw Error(`THREE.KTX2Loader: Unsupported vkFormat: `+t);oS[t]===void 0&&console.warn(`THREE.KTX2Loader: Missing ".type" for vkFormat: `+t);let n;e.supercompressionScheme===2&&(tS||=new Promise(async e=>{let t=new qx;await t.init(),e(t)}),n=await tS);let r=[];for(let i=0;i<e.levels.length;i++){let a=Math.max(1,e.pixelWidth>>i),o=Math.max(1,e.pixelHeight>>i),s=e.pixelDepth?Math.max(1,e.pixelDepth>>i):0,c=e.levels[i],l;if(e.supercompressionScheme===0)l=c.levelData;else if(e.supercompressionScheme===2)l=n.decode(c.levelData,c.uncompressedByteLength);else throw Error(`THREE.KTX2Loader: Unsupported supercompressionScheme.`);let u;u=oS[t]===1015?new Float32Array(l.buffer,l.byteOffset,l.byteLength/Float32Array.BYTES_PER_ELEMENT):oS[t]===1016||oS[t]===1012?new Uint16Array(l.buffer,l.byteOffset,l.byteLength/Uint16Array.BYTES_PER_ELEMENT):oS[t]===35902||oS[t]===35899?new Uint32Array(l.buffer,l.byteOffset,l.byteLength/Uint32Array.BYTES_PER_ELEMENT):l,r.push({data:u,width:a,height:o,depth:s})}let i=e.levelCount===0||r.length>1,a;if(rS.has(aS[t]))a=e.pixelDepth===0?new Di(r[0].data,e.pixelWidth,e.pixelHeight):new fn(r[0].data,e.pixelWidth,e.pixelHeight,e.pixelDepth),a.minFilter=i?_:g,a.magFilter=g,a.generateMipmaps=e.levelCount===0,a.normalized=iS.has(t);else{if(e.pixelDepth>0)throw Error(`THREE.KTX2Loader: Unsupported pixelDepth.`);a=new Fi(r,e.pixelWidth,e.pixelHeight),a.minFilter=i?x:y,a.magFilter=y}return a.mipmaps=r,a.type=oS[t],a.format=aS[t],a.colorSpace=cS(e),a.needsUpdate=!0,Promise.resolve(a)}function cS(e){let t=e.dataFormatDescriptor[0];return t.colorPrimaries===1?t.transferFunction===2?tt:nt:t.colorPrimaries===10?t.transferFunction===2?Yx:Xx:(t.colorPrimaries===0||console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${t.colorPrimaries}"`),``)}var lS=class{imageLoader=new La;ktx2Loader;constructor(e,t=`/basis/`){this.ktx2Loader=new nS().setTranscoderPath(t).detectSupport(e)}loadAsync(e){return/\.ktx2(?:[?#]|$)/i.test(e)?this.ktx2Loader.loadAsync(e):this.imageLoader.loadAsync(e)}dispose(){this.ktx2Loader.dispose()}},uS={maxOutputSize:1024,enabled:!1};function dS(e,t,n,r=uS){let i=Math.max(1,Number.isFinite(e)?e:1),a=Math.max(1,Number.isFinite(t)?t:1),o=Math.min(Math.max(.1,Number.isFinite(n)?n:1),2);return r.enabled?Math.min(o,r.maxOutputSize/Math.max(i,a)):o}var fS=1,pS=new G(i.x,i.y,i.z),mS=new G(a.x,a.y,a.z).normalize(),hS=new G(0,1,0),gS=!0,_S=0,vS=1e-5,yS=Fp(`up`);function bS(e){return e&&typeof e==`object`?e:{}}function xS(e){return Array.isArray(e)?e.length:0}function SS(e){let t=bS(e);return{managers:xS(t.managers??t.Managers),bones:xS(t.bones??t.Bones),extraBones:xS(t.extraBones??t.ExtraBones),sphereColliders:xS(t.sphereColliders??t.SphereColliders),capsuleColliders:xS(t.capsuleColliders??t.CapsuleColliders),panelColliders:xS(t.panelColliders??t.PanelColliders),characterHairPresent:!!(t.characterHair??t.CharacterHair),characterEyePresent:!!(t.characterEye??t.CharacterEye)}}function CS(e,t,n){let r=bS(e),i=bS(r.pjskSpringBone??r.PjskSpringBone),a=bS(i.raw??i.Raw),o=SS(a.body??a.Body),s=SS(a.head??a.Head),c=!!(a.body??a.Body??a.head??a.Head);return{present:c,runtimePresent:!!n,active:!!n?.enabled,bodyManagerCount:o.managers,bodySpringBoneCount:o.bones,bodyExtraBoneCount:o.extraBones,bodySphereColliderCount:o.sphereColliders,bodyCapsuleColliderCount:o.capsuleColliders,bodyPanelColliderCount:o.panelColliders,headManagerCount:s.managers,headSpringBoneCount:s.bones,headExtraBoneCount:s.extraBones,headSphereColliderCount:s.sphereColliders,headCapsuleColliderCount:s.capsuleColliders,headPanelColliderCount:s.panelColliders,characterHairPresent:s.characterHairPresent,characterEyePresent:s.characterEyePresent,vrmSpringBoneManagerPresent:t,utjRuntime:n,source:c?`PJSK_sekai_runtime`:`none`}}function wS(e,t,n=new Set){if(e&&typeof e==`object`&&!n.has(e)){if(n.add(e),e instanceof sn){t.add(e);return}if(!(e instanceof Y||e instanceof U||e instanceof G||e instanceof cn||e instanceof K||e instanceof J||ArrayBuffer.isView(e)||e instanceof ArrayBuffer)){if(Array.isArray(e)){for(let r of e)wS(r,t,n);return}for(let r of Object.values(e))wS(r,t,n)}}}function TS(e,t=!0,n=new Set,r=new Set){let i=Array.isArray(e)?e:[e];for(let e of i)if(!n.has(e)){if(t){let t=new Set;wS(e,t);for(let e of t)r.has(e)||(e.dispose(),r.add(e))}e.dispose()}}function ES(e,t=new Set){let n=new Set,r=new Set;e.traverse(e=>{let i=e;i.isMesh&&(i.geometry&&!i.userData.pjskOutlineShell&&!n.has(i.geometry)&&(i.geometry.dispose(),n.add(i.geometry)),i.material&&TS(i.material,!0,t,r))})}function DS(e,t=new Set){for(let n of[...e.children])ES(n,t),e.remove(n)}function OS(e){let t=e.getAttribute(`color`);if(!t)return null;let n=0;for(let e=0;e<t.count;e+=1)if(n=Math.max(n,t.getX(e)),n>.01)return n;return n}function kS(e){return e===`eye`||e===`eyelight`}function AS(e){let t=new Set;typeof e.userData.pjskMaterialKind==`string`&&t.add(e.userData.pjskMaterialKind);let n=Array.isArray(e.material)?e.material:[e.material];for(let e of n)typeof e?.userData.pjskMaterialKind==`string`&&t.add(e.userData.pjskMaterialKind);let r=n.map(e=>e.name.toLowerCase()),i=e.name.toLowerCase();return(Sb(e.name)===`acc`||i.includes(`/acc`)||r.some(e=>e.includes(`_acc`)||e.startsWith(`mtl_acc`)))&&t.add(`accessory`),[...t]}function jS(e){return e.find(e=>!kS(e))??e[0]??null}function MS(e){return e.length>0&&e.every(kS)}function NS(e){if(e instanceof $i){let t=e.uniforms.uMainTex?.value;if(t instanceof sn)return t}return e.map??null}function PS(e,t,n,r=0,i=1){let a=Math.hypot(t,n);return a<=vS?e.set(r,i):e.set(t/a,n/a)}function FS(e,t){let n=Math.abs(t-e);return H.clamp(1-Math.abs(n-180)/180,0,1)}function IS(e){return e&&typeof e==`object`?e:{}}function LS(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function RS(e){let t=IS(e),n=LS(t.r??t.R),r=LS(t.g??t.G),i=LS(t.b??t.B);return n===null||r===null||i===null?null:`#${new Y(n,r,i).getHexString()}`}function zS(e,t=!0){let n=IS(e),r=LS(n.tileX??n.TileX),i=LS(n.tileY??n.TileY),a=LS(n.sample??n.Sample);return r&&i&&a!==null?{tileX:r,tileY:i,sample:a,enabled:t}:null}function BS(e){let t=IS(e),n=IS(t.characterControllers??t.CharacterControllers),r=IS(n.eye??n.Eye);return Object.keys(r).length?{lightInfluence:LS(r.lightInfluence??r.LightInfluence),lightInfluenceForEyeHighlight:LS(r.lightInfluenceForEyeHighlight??r.LightInfluenceForEyeHighlight),tintColor:RS(r.tintColor??r.TintColor),emissionColor:RS(r.emissionColor??r.EmissionColor),baseTiling:zS(r.baseTiling??r.BaseTiling),highlightTiling:zS(r.highlightTiling??r.HighlightTiling)}:null}function VS(e){let t=IS(e),n=IS(t.pjskSpringBone??t.PjskSpringBone),r=IS(t.runtimeUnitySetup??t.RuntimeUnitySetup??n.runtimeUnitySetup??n.RuntimeUnitySetup),i=IS(t.funit??t.FUnit??n.funit??n.FUnit??r.funit??r.FUnit),a=i.detectedScripts??i.DetectedScripts,o=Array.isArray(a)?a.filter(e=>typeof e==`string`):[],s=(e,t)=>Math.max(Math.trunc(LS(i[e]??i[t])??0),0);return{present:!!(i.present??i.Present),scriptCount:s(`scriptCount`,`ScriptCount`),springManagerCount:s(`springManagerCount`,`SpringManagerCount`),springBoneCount:s(`springBoneCount`,`SpringBoneCount`),sphereColliderCount:s(`sphereColliderCount`,`SphereColliderCount`),capsuleColliderCount:s(`capsuleColliderCount`,`CapsuleColliderCount`),panelColliderCount:s(`panelColliderCount`,`PanelColliderCount`),detectedScripts:o,policy:typeof(i.policy??i.Policy)==`string`?String(i.policy??i.Policy):`metadata_only; do not merge with UTJ/Sekai SpringBone runtime`}}function HS(e){let t=IS(e),n=IS(t.characterControllers??t.CharacterControllers),r=IS(n.hair??n.Hair);if(!Object.keys(r).length)return null;let i=IS(r.headTransform??r.HeadTransform);return{offset:Mp(kp(r.offset??r.Offset,new G)),headTransformName:typeof(i.name??i.Name)==`string`?String(i.name??i.Name):null,headTransformPath:typeof(i.transformPath??i.TransformPath)==`string`?String(i.transformPath??i.TransformPath):null}}function US(e,t){for(let n of t){let t=e.get(n);if(t)return{node:t,path:n}}return null}function WS(e){return{x:Number(e.x.toFixed(5)),y:Number(e.y.toFixed(5)),z:Number(e.z.toFixed(5))}}function GS(e){let[t,...n]=e.split(`:`),r=Number(t);if(!Number.isInteger(r)||r<=0)throw Error(`Invalid roleId ${e}: expected "<characterId>:<unit>".`);return{characterId:r,unit:n.length>0&&n.join(`:`).trim()||null}}function KS(){let e=Error(`Custom part selection was superseded by a newer request.`);return e.name=`AbortError`,e}var qS=class{container;ownsCanvas;scene;camera;renderer;controls;cameraTarget=new G;autoRender;manageResize;clock=new So;directionalLight;fillLight;previewLightBase;textureLoader;bodyMaterial;hairMaterial;faceMaterial;characterLighting;projectedShadow;characterRoot;bodySlot;headSlot;sceneReference=new Bn;capturePresentationEnabled=null;captureBackgroundTexture=null;viewportWidth=0;viewportHeight=0;viewportPixelRatio=0;animationFrame=0;importRevision=0;customSelectionQueue=Promise.resolve();customSelectionGeneration=0;currentBodyAsset=null;currentHeadAsset=null;currentImportSnapshot=null;currentBodyAttachNode=null;currentHeadAttachOriginNode=null;currentCompositionStatus={mode:`pending`,missingBodyBones:[],missingHeadBones:[]};currentBodyAnimationRoot=null;faceMotion=new sb;animationPlayback;currentRuntimeExtension=null;currentSpringRuntime=null;currentExtraBoneRuntime=null;currentConstraintRuntime=null;currentSpringSimulationControl=null;currentPrefabSourceGraph=null;currentPrefabHeadFollowDebug={active:!1,sourcePath:null,targetPath:null,reason:null};springRuntimeMode=`unity-prefab`;masterCharacterHeightMeters=1.6;characterModelScaleMeters=1.6;tempMatrixA=new J;tempMatrixB=new J;tempVector=new G;tempVectorB=new G;tempQuaternion=new W;tempScale=new G;faceRightWorld=new G;faceUpWorld=new G;faceForwardWorld=new G;headTransformUpWorld=new G;faceHeadWorldPosition=new G;faceShadowHeadHorizontal=new U;faceShadowLightHorizontal=new U;headDotDirectionalLight=new U;hairHeadPosition=new G;currentHairOffset=new G;currentHairHeadTransform=null;currentCameraPreset=`default`;currentCameraProfile=null;cameraRootYawDegrees=0;viewFraming={...qg};cameraDebugChangeCallback=null;currentLoadedRuntimePackage=null;lastNativeMeshInstallDiagnostics=null;lastConstraintSetupDiagnostics=null;runtimeDebug={materialBindingMode:`manifest`,hairShadowMode:`sekai_head_position`,hairShadowOffset:WS(this.currentHairOffset),hairShadowWorldPosition:WS(this.hairHeadPosition),funit:VS(null),body:[],head:[],headMaterialSlots:[],headMorphs:[],outlineShells:[]};constructor(e,t){let n=e instanceof HTMLElement?{container:e,initialLight:t}:e;if(!n.initialLight)throw Error(`Missing initial light state for Haruki 3D engine.`);let r=n.initialLight;if(this.previewLightBase={...r},!n.container&&!n.canvas)throw Error(`Haruki 3D engine requires a container or canvas.`);this.animationPlayback=new tb({onLoopPromoted:()=>this.faceMotion.promoteLoop()}),this.container=n.container??null,this.ownsCanvas=n.canvas===void 0,this.autoRender=n.autoRender??!0,this.manageResize=n.manageResize??n.canvas===void 0,this.scene=new Yn,this.scene.background=new Y(`#7f8d95`),this.scene.fog=new Jn(`#7f8d95`,5.5,15);let i=n.canvas??n.container,a=this.ownsCanvas?320:1,o=Math.max(i.clientWidth,a),s=Math.max(i.clientHeight,a),c=Ug(this.characterModelScaleMeters);this.camera=new Xa(c.fov,o/s,.1,100),this.camera.position.copy(c.position),this.renderer=new Hl({antialias:!1,stencil:!0,canvas:n.canvas}),this.renderer.autoClearStencil=!0;let l=dS(o,s,window.devicePixelRatio);this.renderer.setPixelRatio(l),this.renderer.setSize(o,s,this.ownsCanvas),this.viewportWidth=o,this.viewportHeight=s,this.viewportPixelRatio=l,this.renderer.outputColorSpace=tt,this.container&&this.renderer.domElement.parentElement!==this.container&&this.container.appendChild(this.renderer.domElement),this.updateCaptureBackgroundTexture(),this.cameraTarget.copy(c.target),n.controlsFactory?(this.controls=n.controlsFactory({camera:this.camera,canvas:this.renderer.domElement,target:this.cameraTarget,onChange:e=>{this.cameraTarget.copy(e),this.cameraDebugChangeCallback?.()}}),this.controls.update()):(this.controls=null,this.camera.lookAt(this.cameraTarget)),this.directionalLight=new $a(`#fffaf2`,r.intensity),this.directionalLight.position.set(r.x,r.y,r.z),this.scene.add(this.directionalLight),this.fillLight=new eo(`#fff8f0`,r.ambient),this.scene.add(this.fillLight),this.textureLoader=new lS(this.renderer,n.ktx2TranscoderPath),this.bodyMaterial=cp({baseColor:`#f5d6d0`,shadowColor:`#c79b95`,lightDirection:this.directionalLight.position.clone(),lightIntensity:r.intensity,ambientIntensity:r.ambient,shadowThreshold:r.shadowThreshold,shadowWeight:r.shadowWeight,valueShadowInfluence:fS,characterAmbientIntensity:r.characterAmbient,rimColorAlpha:r.rimColorAlpha,controllerRimRange:r.rimRange,controllerRimEdgeSmoothness:r.rimEdgeSmoothness,controllerRimEmission:r.rimEmission,controllerRimLightInfluence:r.rimLightInfluence,controllerRimShadowSharpness:r.rimShadowSharpness,rimDirection:gb()}),this.hairMaterial=cp({baseColor:`#7b5b4a`,shadowColor:`#513d33`,lightDirection:this.directionalLight.position.clone(),lightIntensity:r.intensity,ambientIntensity:r.ambient,shadowThreshold:r.shadowThreshold,shadowWeight:r.shadowWeight,valueShadowInfluence:fS,characterAmbientIntensity:r.characterAmbient,rimColorAlpha:r.rimColorAlpha,controllerRimRange:r.rimRange,controllerRimEdgeSmoothness:r.rimEdgeSmoothness,controllerRimEmission:r.rimEmission,controllerRimLightInfluence:r.rimLightInfluence,controllerRimShadowSharpness:r.rimShadowSharpness,rimDirection:gb(),hairShadowEnabled:!1,useLambert:!0,headPosition:this.hairHeadPosition}),this.faceMaterial=yp({baseColor:`#ffe4dc`,warmColor:`#ffd4c8`,lightDirection:mS.clone(),lightIntensity:r.intensity,ambientIntensity:r.ambient,headDotDirectionalLight:this.headDotDirectionalLight,useFaceShadowLimiter:gS,faceShadowLimitRange:_S,shadowThreshold:r.shadowThreshold,shadowWeight:r.shadowWeight,useLambert:!0}),this.characterRoot=new Bn,this.bodySlot=new Bn,this.headSlot=new Bn,this.characterRoot.add(this.bodySlot),this.characterRoot.add(this.headSlot),this.characterLighting=new jx({bodyMaterial:this.bodyMaterial,hairMaterial:this.hairMaterial,faceMaterial:this.faceMaterial,bodySlot:this.bodySlot,headSlot:this.headSlot,directionalLight:this.directionalLight,fillLight:this.fillLight,debug:this.runtimeDebug,valueShadowInfluence:fS}),this.scene.add(this.characterRoot),this.projectedShadow=new r_,this.scene.add(this.projectedShadow.group),this.setPresentationMode(n.presentationMode??`interactive`),this.applyCameraPreset(n.cameraPreset??`default`,n.cameraProfile),this.handleResize=this.handleResize.bind(this),this.manageResize&&(window.addEventListener(`resize`,this.handleResize),this.handleResize()),this.autoRender&&this.render()}async importCombinedCharacter(e,t={}){let n=++this.importRevision,r=t.preserveAnimation?this.animationPlayback.capturePosition():null;t.disposeBeforeLoad&&this.releaseCurrentCharacterResources({preserveAnimationSelection:t.preserveAnimation??!1,clearAnimationCache:t.clearAnimationCache??!1}),this.runtimeDebug.outlineShells=[],this.lastNativeMeshInstallDiagnostics=null,this.currentBodyAsset=e.bodyAsset,this.currentHeadAsset=e.headAsset,this.characterLighting.setCharacterSkinColors(e.skinColors??null),this.lastConstraintSetupDiagnostics=null,this.applyCostumeShopCharacterHeight(e.bodyAsset.characterHeightMeters??this.masterCharacterHeightMeters);let i=await this.loadCombinedCharacterAsset(e);if(n!==this.importRevision)return{revision:n,body:this.makeImportStatus(e.bodyAsset,i),head:this.makeImportStatus(e.headAsset,i),composition:this.currentCompositionStatus};this.clearCharacterSlot(this.bodySlot),this.clearCharacterSlot(this.headSlot),this.resetSlotParents(),this.currentRuntimeExtension=e.runtimeExtension,this.currentSpringRuntime=null,this.currentExtraBoneRuntime=null,this.currentConstraintRuntime=null,this.currentBodyAttachNode=null,this.currentHeadAttachOriginNode=null,this.runtimeDebug.headMorphs=[],this.faceMotion.release({preserveMotion:!0}),this.currentBodyAnimationRoot=null,this.currentPrefabSourceGraph=null,this.currentHairHeadTransform=null,this.currentPrefabHeadFollowDebug={active:!1,sourcePath:null,targetPath:null,reason:`not initialized`},this.bodySlot.add(i.root),this.currentPrefabSourceGraph=i.prefabSourceGraph,Q_(i.prefabSourceGraph,this.characterModelScaleMeters),i.prefabSourceGraph.root!==i.root&&this.bodySlot.add(i.prefabSourceGraph.root),this.currentBodyAnimationRoot=i.prefabSourceGraph.root,this.currentBodyAttachNode=i.prefabSourceGraph.bodyAttach,this.currentHeadAttachOriginNode=i.prefabSourceGraph.headOrigin,this.currentPrefabHeadFollowDebug=i.prefabSourceGraph.debug,this.runtimeDebug.headMorphs=this.faceMotion.bind(i.root,e.headAsset),this.prepareCombinedComposition(),this.currentConstraintRuntime=Jv(i.prefabSourceGraph,this.currentRuntimeExtension,this.characterModelScaleMeters),this.syncUnityPrefabSourceGraph(),this.currentExtraBoneRuntime=_g.fromPjskRuntimeExtension(this.currentRuntimeExtension,i.prefabSourceGraph.root),this.currentSpringRuntime=this.createSpringRuntime(i.prefabSourceGraph.root),await Promise.all([this.reloadAnimationPlayback({resetSpring:r===null}),this.renderer.compileAsync(this.scene,this.camera)]),r&&(this.animationPlayback.restorePosition(r),this.faceMotion.applyCurrent(),this.syncOfficialModelCombineSetup(),this.currentExtraBoneRuntime?.update(),this.resetCurrentSpringRuntimeState());let a={revision:n,body:{...this.makeImportStatus(e.bodyAsset,i),assetId:e.id,displayName:`${e.displayName} [combined body]`},head:{...this.makeImportStatus(e.headAsset,i),assetId:e.id,displayName:`${e.displayName} [combined head]`},composition:this.currentCompositionStatus};return this.currentImportSnapshot=a,this.characterLighting.applyCharacterView(),a}setHairShadowMode(e){this.characterLighting.setHairShadowMode(e)}setProjectedShadowSettings(e={}){this.projectedShadow.setSettings(e)}setFaceSdfDebugMode(e){this.characterLighting.setFaceSdfDebugMode(e)}setFaceSdfEnabled(e){this.characterLighting.setFaceSdfEnabled(e)}setBodyDebugMode(e){this.characterLighting.setBodyDebugMode(e)}setToonShadowPreview(e,t){this.characterLighting.setToonShadowPreview(e,t)}setFaceSdfDebugLightMode(e){this.characterLighting.setFaceSdfDebugLightMode(e),this.updateShaderFaceBasis()}setRenderIsolationMode(e){this.characterLighting.setRenderIsolationMode(e)}setCharacterYawDegrees(e){let t=H.degToRad(Number.isFinite(e)?e:0);this.characterRoot.rotation.y=t,this.characterRoot.updateMatrixWorld(!0),this.syncOfficialModelCombineSetup(),this.characterRoot.updateMatrixWorld(!0),this.resetCurrentSpringRuntimeState(),this.updateShaderFaceBasis()}setViewYawDegrees(e){this.cameraRootYawDegrees=Number.isFinite(e)?e:0,this.applyCostumeShopView()}setViewZoom(e){this.viewFraming=Jg({...this.viewFraming,zoom:e}),this.applyCostumeShopView()}setViewHeightOffset(e){this.viewFraming=Jg({...this.viewFraming,heightOffset:e}),this.applyCostumeShopView()}getViewFraming(){return{...this.viewFraming}}applyCostumeShopView(){let e;if(this.currentCameraPreset===`capture`)e=Wg(this.currentCameraProfile??`full-body`,this.cameraRootYawDegrees,this.masterCharacterHeightMeters);else{let t=Ug(this.characterModelScaleMeters),n=t.position.clone().sub(t.target).applyAxisAngle(hS,H.degToRad(this.cameraRootYawDegrees));e={target:t.target,position:t.target.clone().add(n),fov:t.fov}}let t=Yg(e,this.viewFraming);this.setCameraTarget(t.target),this.camera.position.copy(t.position),this.camera.fov=e.fov,this.camera.updateProjectionMatrix(),this.syncCameraTarget(),this.applyPreviewLightForCameraRoot(),this.updateShaderFaceBasis(),this.cameraDebugChangeCallback?.()}faceCharacterTowardCamera(){this.characterRoot.updateMatrixWorld(!0);let e=this.currentBodyAnimationRoot??this.characterRoot;e.updateMatrixWorld(!0);let t=US(u_(e),[`body/Position`,`body/Position/PositionOffset`,`body/Position/PositionOffset/Hip`,`body/Position/Hip`,`face/Position`])?.node??e;if(t.updateMatrixWorld(!0),Ip(t,this.tempQuaternion),this.tempVector.set(0,0,1).applyQuaternion(this.tempQuaternion),this.tempVector.y=0,this.tempVector.lengthSq()<1e-6){this.setCharacterYawDegrees(0);return}this.tempVector.normalize(),t.getWorldPosition(this.tempVectorB);let n=this.camera.position.clone().sub(this.tempVectorB);if(n.y=0,n.lengthSq()<1e-6){this.setCharacterYawDegrees(0);return}n.normalize();let r=Math.atan2(this.tempVector.x,this.tempVector.z),i=Math.atan2(n.x,n.z);this.characterRoot.rotation.y+=i-r,this.characterRoot.updateMatrixWorld(!0),this.syncOfficialModelCombineSetup(),this.characterRoot.updateMatrixWorld(!0),this.resetCurrentSpringRuntimeState(),this.updateShaderFaceBasis()}getRuntimeDebugSnapshot(){return{...structuredClone(this.runtimeDebug),headMaterialSlots:this.currentHeadAsset?.faceMaterials.map(e=>({meshName:e.meshName,slotIndex:e.slotIndex,materialKey:e.materialKey,materialName:e.materialName,materialKind:e.materialKind,isAccessory:e.isAccessory,valueTex:e.valueTex}))??[],nativeMeshes:this.lastNativeMeshInstallDiagnostics,constraints:this.lastConstraintSetupDiagnostics,funit:VS(this.currentRuntimeExtension),hairShadowOffset:WS(this.currentHairOffset),hairShadowWorldPosition:WS(this.hairHeadPosition),camera:this.getCameraDebugSnapshot(),faceLight:this.getFaceLightDebugSnapshot(),projectedShadow:this.projectedShadow.getDebugSnapshot(this.characterModelScaleMeters)}}getFaceLightDebugSnapshot(){let e=this.directionalLight.position.clone().normalize(),t=this.characterLighting.resolveFaceShadowLightDirection(this.getCameraRootFaceShadowLightDirection(),this.faceRightWorld,this.faceForwardWorld),n=new U,r=new U,i=new U,a=new U;PS(n,-this.headTransformUpWorld.x,-this.headTransformUpWorld.z),PS(r,this.faceRightWorld.x,this.faceRightWorld.z),PS(i,this.faceForwardWorld.x,this.faceForwardWorld.z),PS(a,t.x,t.z);let o=H.radToDeg(Math.atan2(this.faceForwardWorld.x,this.faceForwardWorld.z)),s=H.radToDeg(Math.atan2(a.x,a.y)),c=this.faceForwardWorld.clone().normalize(),l=this.faceRightWorld.clone().sub(c.clone().multiplyScalar(this.faceRightWorld.dot(c))).normalize(),u=this.faceUpWorld.clone().sub(c.clone().multiplyScalar(this.faceUpWorld.dot(c))).sub(l.clone().multiplyScalar(this.faceUpWorld.dot(l))).normalize(),d=new G(t.dot(l),t.dot(u),t.dot(c)),f=Math.max(Math.hypot(d.x,d.z),.001),p=d.x/f,m=d.z/f,h=(this.faceMaterial.uniforms.uUseFaceShadowLimiter?.value??1)>.5,g=this.faceMaterial.uniforms.uFaceShadowLimitRange?.value??0,_=this.headDotDirectionalLight.y,v=H.clamp(h?Math.min(Math.max((1-Math.abs(2*_-1))*.5,0),g):_,0,1);return{lightDirection:WS(t),previewLightDirection:WS(e),costumeShopLightRotationDegrees:WS(pS),faceRightWorld:WS(l),faceUpWorld:WS(u),faceForwardWorld:WS(c),headHorizontalFromUp:{x:Number(n.x.toFixed(5)),y:Number(n.y.toFixed(5))},headHorizontalFromRight:{x:Number(r.x.toFixed(5)),y:Number(r.y.toFixed(5))},headHorizontalFromForward:{x:Number(i.x.toFixed(5)),y:Number(i.y.toFixed(5))},lightHorizontal:{x:Number(a.x.toFixed(5)),y:Number(a.y.toFixed(5))},headDotDirectionalLight:{x:Number(this.headDotDirectionalLight.x.toFixed(5)),y:Number(this.headDotDirectionalLight.y.toFixed(5))},faceTbnLight:WS(d),faceLight:{side:Number(p.toFixed(5)),front:Number(m.toFixed(5))},faceSdfLimit:Number(v.toFixed(5)),headYawDegrees:Number(o.toFixed(3)),lightYawDegrees:Number(s.toFixed(3))}}getCameraDebugSnapshot(){let e=this.camera.position,t=this.controls?.target??this.cameraTarget,n=e.clone().sub(t),r=new Co().setFromVector3(n),i=(this.currentCameraPreset===`capture`?Wg(this.currentCameraProfile??`full-body`,this.cameraRootYawDegrees,this.masterCharacterHeightMeters):null)?.costumeShopState??null;return{preset:this.currentCameraPreset,profile:this.currentCameraProfile,characterRootYawDegrees:Number(H.radToDeg(this.characterRoot.rotation.y).toFixed(3)),costumeShopState:i===null?null:{cameraRootYawDegrees:Number(i.cameraRootYawDegrees.toFixed(3)),zoomValue:Number(i.zoomValue.toFixed(4)),zoomMoveValue:Number(i.zoomMoveValue.toFixed(4)),zoomRatio:Number(i.zoomRatio.toFixed(4)),localCameraPosition:{x:Number(i.localCameraPosition.x.toFixed(4)),y:Number(i.localCameraPosition.y.toFixed(4)),z:Number(i.localCameraPosition.z.toFixed(4))},localCameraRotationYDegrees:i.localCameraRotationYDegrees},position:{x:Number(e.x.toFixed(4)),y:Number(e.y.toFixed(4)),z:Number(e.z.toFixed(4))},target:{x:Number(t.x.toFixed(4)),y:Number(t.y.toFixed(4)),z:Number(t.z.toFixed(4))},offset:{x:Number(n.x.toFixed(4)),y:Number(n.y.toFixed(4)),z:Number(n.z.toFixed(4))},distance:Number(r.radius.toFixed(4)),polarDegrees:Number(H.radToDeg(r.phi).toFixed(3)),azimuthDegrees:Number(H.radToDeg(r.theta).toFixed(3)),fovDegrees:Number(this.camera.fov.toFixed(3)),aspect:Number(this.camera.aspect.toFixed(4)),zoom:Number(this.camera.zoom.toFixed(4)),minPolarDegrees:Number(H.radToDeg(this.controls?.minPolarAngle??H.degToRad(82)).toFixed(3)),maxPolarDegrees:Number(H.radToDeg(this.controls?.maxPolarAngle??H.degToRad(100)).toFixed(3)),masterCharacterHeightMeters:Number(this.masterCharacterHeightMeters.toFixed(4)),characterModelScaleMeters:Number(this.characterModelScaleMeters.toFixed(4))}}onCameraDebugChange(e){this.cameraDebugChangeCallback=e}getSpringBoneSnapshot(e){return CS(this.currentRuntimeExtension,!1,this.currentSpringRuntime?.getSnapshot(this.isSpringRuntimeEnabled(),e)??null)}setUtjSpringBoneTraceFilters(e,t){this.currentSpringRuntime?.setTraceBoneFilters(e,t)}getUtjSpringBoneTraceSnapshot(){return this.currentSpringRuntime?.getTraceSnapshot()??null}getAnimationSnapshot(){let e=this.currentSpringRuntime?.getControlledTrackNodeNames()??new Set,t=this.animationPlayback.getSnapshot({faceMotionEnabled:this.faceMotion.isEnabled(),utjControlledNodeNames:e});return t.bodyRetargetDebug?{...t,bodyRetargetDebug:{...t.bodyRetargetDebug,prefabHeadFollow:this.getPrefabHeadFollowDebugSnapshot()}}:t}getFaceMotionSnapshot(){return this.faceMotion.getSnapshot()}setAnimationPaused(e){this.animationPlayback.setPaused(e)}setAnimationSpeed(e){this.animationPlayback.setSpeed(e)}setFaceMotionEnabled(e){this.faceMotion.setEnabled(e)}setBodyHeadTracksEnabled(e){this.animationPlayback.setBodyHeadTracksEnabled(e)&&this.reloadAnimationPlayback()}setUtjSpringBoneEnabled(e){this.setSpringRuntimeMode(e?`unity-prefab`:`off`)}setSpringRuntimeMode(e){this.springRuntimeMode!==e&&(this.currentSpringRuntime?.resetPose(),this.springRuntimeMode=e,this.resetCurrentSpringRuntimeState())}resetCurrentSpringRuntimeState(){this.currentSpringRuntime?.resetStateToCurrentPose()}isSpringRuntimeEnabled(){return this.springRuntimeMode!==`off`}createSpringRuntime(e){let t=Bm.fromPjskRuntimeExtension(this.currentRuntimeExtension,e);return t&&this.currentSpringSimulationControl&&t.setSimulationControl(this.currentSpringSimulationControl),t}setSpringSimulationControl(e){this.currentSpringSimulationControl=e?{...e}:null,this.currentSpringSimulationControl?this.currentSpringRuntime?.setSimulationControl(this.currentSpringSimulationControl):this.currentSpringRuntime?.clearSimulationControl()}seekAnimation(e){this.prepareSpringRuntimeForAnimationSeek(),this.applyAnimationSeekResult(this.animationPlayback.seek(e))}seekAnimationPhase(e){return this.prepareSpringRuntimeForAnimationSeek(),this.applyAnimationSeekResult(this.animationPlayback.seekPhase(e)),this.getAnimationSnapshot()}seekAnimationLoopPhase(e){return this.prepareSpringRuntimeForAnimationSeek(),this.applyAnimationSeekResult(this.animationPlayback.seekLoopPhase(e)),this.getAnimationSnapshot()}prepareSpringRuntimeForAnimationSeek(){this.currentSpringRuntime?.resetPose()}applyAnimationSeekResult(e){this.faceMotion.seek(e),this.syncOfficialModelCombineSetup(),this.resetCurrentSpringRuntimeState()}setPresentationMode(e){this.setCapturePresentation(e===`capture`)}setCapturePresentation(e){if(this.capturePresentationEnabled===e){e&&this.handleResize();return}if(this.capturePresentationEnabled=e,e){this.scene.fog=null,this.sceneReference.visible=!1,this.handleResize();return}this.scene.fog=new Jn(`#7f8d95`,5.5,15),this.sceneReference.visible=!1}stepCharacterDynamics(e,t){let n=Math.max(0,e);t&&(this.animationPlayback.step(n),this.faceMotion.step(n,this.animationPlayback.getSpeed(),this.animationPlayback.isPaused())),this.syncOfficialModelCombineSetup(),this.currentExtraBoneRuntime?.update(),this.isSpringRuntimeEnabled()?this.currentSpringRuntime?.update(n):this.currentSpringRuntime?.resetPose()}stepCaptureFrame(e,t){this.stepCharacterDynamics(e,t),this.updateProjectedShadows(),this.updateShaderCameraPositions(),this.updateShaderFaceBasis()}getCharacterRoot(){return this.characterRoot}updateProjectedShadows(){if(!this.currentBodyAsset){this.projectedShadow.update({targetWorldPositions:[],lightWorldPosition:null,characterModelScale:this.characterModelScaleMeters,visible:!1});return}let e=new G;this.directionalLight.getWorldPosition(e),this.projectedShadow.update({targetWorldPositions:this.resolveProjectedShadowTargetWorldPositions(),lightWorldPosition:e,characterModelScale:this.characterModelScaleMeters,visible:!0})}resolveProjectedShadowTargetWorldPositions(){let e=this.currentBodyAnimationRoot??this.characterRoot;return e.updateMatrixWorld(!0),$g.map(t=>this.findNodeByImportedName(e,t)).map(e=>e?.getWorldPosition(new G)??null)}getCanvas(){return this.renderer.domElement}waitForPostProcessorReady(){return Promise.resolve()}setViewportSize(e,t){let n=this.ownsCanvas?320:1,r=Math.max(Math.trunc(e)||0,n),i=Math.max(Math.trunc(t)||0,n),a=dS(r,i,window.devicePixelRatio);(this.viewportWidth!==r||this.viewportHeight!==i||this.viewportPixelRatio!==a)&&(this.camera.aspect=r/i,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(a),this.renderer.setSize(r,i,this.ownsCanvas),this.updateCaptureBackgroundTexture(r,i),this.viewportWidth=r,this.viewportHeight=i,this.viewportPixelRatio=a)}renderFrame(){d(this.characterRoot),this.renderer.render(this.scene,this.camera)}finishCaptureFrame(){this.renderer.getContext().finish()}stepRuntimeFrame(e,t={}){this.stepCaptureFrame(e,t.advanceAnimation??!0),this.updateLayerMaterialTime(t.elapsedTime??this.clock.elapsedTime)}async loadRuntimePackage(e){let t=this.currentLoadedRuntimePackage?.wardrobe?.getActiveRoleId()??null,n=e.roleId??null;t&&n&&t!==n&&(this.releaseCurrentCharacterResources({preserveAnimationSelection:!1,clearAnimationCache:!0}),this.currentLoadedRuntimePackage=null);let r=await Tf(e.baseUrl,e);if(this.currentLoadedRuntimePackage=r,r.previewLight&&this.updatePreviewLight(r.previewLight),await this.setAnimationSelection(null),this.setFaceMotionSet(null,null,null),!r.combinedCharacter)return r;await this.importCombinedCharacter(r.combinedCharacter);let i=r.combinedCharacter.bodyAsset.source.animationUrls?.[0],a=Oy(i??null),o=i&&(a===`unity-json`||/body[_-]?motion/i.test(i.split(/[/?#]/)[0]??``))?i:null,s=ob(r.combinedCharacter.runtimeExtension);return e.applyFaceMotion!==!1&&(r.faceMotion??s)&&this.setFaceMotionSet(r.faceMotion??s,`face`,o?`face_loop`:null),e.applyDefaultAnimation!==!1&&i&&await this.setAnimationSelection({motionUrl:i,motionKind:a,loopUrl:o,loopKind:o?a:null}),r}async setCustomSelection(e){return this.enqueueCustomSelectionMutation(t=>this.applyCustomSelection(e,t))}async updateCustomSelection(e,t){return this.enqueueCustomSelectionMutation(async n=>{let r=this.currentLoadedRuntimePackage?.wardrobe;if(!r)throw Error(`No custom part package is loaded.`);let i=r.getCustomSelection();if(!i)throw Error(`No custom selection is active.`);return this.applyCustomSelection({...i,bodyCostume3dId:e===`body`&&t!==null?t:i.bodyCostume3dId,headCostume3dId:e===`head`&&t!==null?t:i.headCostume3dId,headPackagePath:e===`head`&&t!==null?null:i.headPackagePath,hairCostume3dId:e===`hair`&&t!==null?t:i.hairCostume3dId,headOptionalCostume3dId:e===`head_optional`?t:i.headOptionalCostume3dId},n)})}async loadRenderRecipe(e){return this.enqueueCustomSelectionMutation(t=>this.loadRenderRecipeInternal(e,t))}enqueueCustomSelectionMutation(e){let t=++this.customSelectionGeneration,n=()=>t===this.customSelectionGeneration,r=()=>{if(!n())throw KS();return e(n)},i=this.customSelectionQueue.then(r,r);return this.customSelectionQueue=i.catch(()=>void 0),i}async applyCustomSelection(e,t=()=>!0){let n=this.currentLoadedRuntimePackage?.wardrobe;if(!n)throw Error(`No custom part package is loaded.`);let r=n.getCustomSelection(),i=n.getCombinedCharacter()?.id??null,a=await n.setCustomSelection(e,t);if(!t())throw KS();let o=i!==null&&i===a.id,s=a.bodyAsset.source.animationUrls?.[0]??null,c=Oy(s),l=s&&(c===`unity-json`||/body[_-]?motion/i.test(s.split(/[/?#]/)[0]??``))?s:null,u=i!==null&&r!==null&&Q(r.characterId,r.unit)===Q(e.characterId,e.unit)&&this.animationPlayback.matchesSelection(s,l);return o||await this.importCombinedCharacter(a,{preserveAnimation:u,disposeBeforeLoad:!0,clearAnimationCache:!1}),await this.applyCustomRoleDefaultMotion(a,!u),a}async loadRenderRecipeInternal(e,t){let n=String(e.baseUrl??``).trim();if(!n)throw Error(`baseUrl is required to load a render recipe.`);let r=Pg(e),i=GS(r.roleId),a=Q(i.characterId,i.unit),o=this.currentLoadedRuntimePackage,s=o?.partSet?.baseUrl??null,c=o?.wardrobe?.getActiveRoleId()??null;(!o?.wardrobe||s!==n||c!==a)&&await this.loadRuntimePackage({baseUrl:n,roleId:a,deferDefaultSelection:!0,applyDefaultAnimation:!1,applyFaceMotion:!1});let l=this.currentLoadedRuntimePackage?.wardrobe;if(!l)throw Error(`No custom part package is loaded.`);l.getActiveRoleId()!==a&&l.selectRole(i.characterId,i.unit);let u=l.getPartPackageSet();u&&await kf(u,i.characterId,i.unit);let d={characterId:i.characterId,unit:i.unit,bodyCostume3dId:r.bodyCostume3dId,headCostume3dId:r.headCostume3dId,headPackagePath:r.headPackagePath,hairCostume3dId:r.hairCostume3dId,headOptionalCostume3dId:r.headOptionalCostume3dId};return{selection:d,combinedCharacter:await this.applyCustomSelection(d,t)}}async applyCustomRoleDefaultMotion(e,t){let n=e.bodyAsset.source.animationUrls?.[0],r=Oy(n??null),i=n&&(r===`unity-json`||/body[_-]?motion/i.test(n.split(/[/?#]/)[0]??``))?n:null,a=ob(e.runtimeExtension);a&&(t||!this.faceMotion.hasMotion())&&this.setFaceMotionSet(a,`face`,i?`face_loop`:null),n&&(t||!this.animationPlayback.hasSelection())&&await this.setAnimationSelection({motionUrl:n,motionKind:r,loopUrl:i,loopKind:i?r:null})}getSnapshots(e){return{animation:this.getAnimationSnapshot(),faceMotion:this.getFaceMotionSnapshot(),springBone:this.getSpringBoneSnapshot(e),camera:this.getCameraDebugSnapshot(),runtimeDebug:this.getRuntimeDebugSnapshot(),utjSpringBoneTrace:this.getUtjSpringBoneTraceSnapshot()}}setFaceMotionSet(e,t,n){this.faceMotion.setMotion(e,t,n)}async setAnimationSelection(e){return this.animationPlayback.setSelection(e),await this.reloadAnimationPlayback(),this.getAnimationSnapshot()}updatePreviewLight(e){this.previewLightBase={...e},this.applyPreviewLightForCameraRoot()}applyPreviewLightForCameraRoot(){let e=H.degToRad(this.cameraRootYawDegrees),t=new G(this.previewLightBase.x,this.previewLightBase.y,this.previewLightBase.z).applyAxisAngle(hS,e),n=gb().applyAxisAngle(hS,e);this.characterLighting.updatePreviewLight({...this.previewLightBase,x:t.x,y:t.y,z:t.z},this.currentBodyAsset,this.currentHeadAsset,this.headDotDirectionalLight,this.getCameraRootFaceShadowLightDirection(),n)}getCameraRootFaceShadowLightDirection(){return mS.clone().applyAxisAngle(hS,H.degToRad(this.cameraRootYawDegrees))}updateGlobalShadowColor(e,t=1){this.characterLighting.updateGlobalShadowColor(e,t)}updateLightControllerColors(e){this.characterLighting.updateControllerColors(e)}updateLightControllerRimShape(e){this.characterLighting.updateControllerRimShape(e)}updateLightControllerOutline(e){this.characterLighting.updateControllerOutline(e)}destroy(){cancelAnimationFrame(this.animationFrame),this.releaseCurrentCharacterResources({preserveAnimationSelection:!1,clearAnimationCache:!0}),this.manageResize&&window.removeEventListener(`resize`,this.handleResize),this.controls?.dispose(),this.projectedShadow.dispose(),this.textureLoader.dispose(),this.captureBackgroundTexture?.dispose(),this.renderer.dispose(),this.ownsCanvas&&this.renderer.domElement.parentElement===this.container&&this.renderer.domElement.remove()}setCameraTarget(e){this.cameraTarget.copy(e),this.controls?.target.copy(e)}syncCameraTarget(){if(this.controls){this.controls.update(),this.cameraTarget.copy(this.controls.target);return}this.camera.lookAt(this.cameraTarget)}applyCostumeShopCharacterHeight(e){let t=H.clamp(e||1.6,.5,2),n=oy(t),r=Math.abs(n-this.characterModelScaleMeters)>=1e-4;if(this.masterCharacterHeightMeters=t,this.characterModelScaleMeters=n,this.characterRoot.scale.setScalar(1),this.currentPrefabSourceGraph&&Q_(this.currentPrefabSourceGraph,n),!r||this.currentCameraPreset!=="default"&&this.currentCameraProfile!==`legacy-cloud`)return;let i=this.currentCameraProfile===`legacy-cloud`?Wg(`legacy-cloud`,this.cameraRootYawDegrees,t):Ug(n),a=i.position.clone().sub(i.target).applyAxisAngle(hS,this.currentCameraProfile===`legacy-cloud`?0:H.degToRad(this.cameraRootYawDegrees)),o=Yg({target:i.target,position:i.target.clone().add(a)},this.viewFraming);this.setCameraTarget(o.target),this.camera.position.copy(o.position),this.syncCameraTarget()}applyCameraPreset(e,t=`full-body`){this.currentCameraPreset=e,this.currentCameraProfile=e===`capture`?t:null,this.applyCostumeShopView()}shiftCameraRight(e=1){if(!Number.isFinite(e)||e===0)return;let t=this.controls?.target??this.cameraTarget,n=Gg(this.camera.position,t,e,this.characterModelScaleMeters);this.setCameraTarget(n.target),this.camera.position.copy(n.position),this.syncCameraTarget(),this.cameraDebugChangeCallback?.()}makeImportStatus(e,t){return{assetId:e.id,displayName:e.displayName,sourceMode:t.sourceMode,requestedUrl:t.requestedUrl,meshCount:t.meshCount,boneCount:t.boneCount,skinnedMeshCount:t.skinnedMeshCount}}resetSlotParents(){this.bodySlot.parent?.remove(this.bodySlot),this.headSlot.parent?.remove(this.headSlot),this.characterRoot.add(this.bodySlot),this.characterRoot.add(this.headSlot)}getPersistentCharacterMaterials(){return new Set([this.bodyMaterial,this.hairMaterial,this.faceMaterial])}clearCharacterSlot(e){DS(e,this.getPersistentCharacterMaterials())}releaseCurrentCharacterResources(e={}){this.animationPlayback.release({preserveSelection:e.preserveAnimationSelection,clearCache:e.clearAnimationCache}),this.faceMotion.release({preserveMotion:e.preserveAnimationSelection}),this.currentSpringRuntime?.resetPose(),this.currentSpringRuntime=null,this.currentExtraBoneRuntime=null,this.currentConstraintRuntime=null,this.currentRuntimeExtension=null,this.currentBodyAttachNode=null,this.currentHeadAttachOriginNode=null,this.currentBodyAnimationRoot=null,this.currentPrefabSourceGraph=null,this.currentPrefabHeadFollowDebug={active:!1,sourcePath:null,targetPath:null,reason:`not initialized`},this.runtimeDebug.headMorphs=[],this.clearCharacterSlot(this.bodySlot),this.clearCharacterSlot(this.headSlot),this.resetSlotParents(),this.renderer.renderLists.dispose(),this.renderer.info.reset()}findNodeByName(e,t){return t?this.findNodeByImportedName(e,t):null}findNodeByImportedName(e,t){let n=e.getObjectByName(t);if(n)return n;for(let n=1;n<=16;n++){let r=e.getObjectByName(`${t}_${n}`);if(r)return r}return null}findBoneByImportedName(e,t){let n=e.get(t);if(n)return n;for(let n=1;n<=16;n++){let r=e.get(`${t}_${n}`);if(r)return r}return null}getNodeDepth(e){let t=0,n=e.parent;for(;n;)t+=1,n=n.parent;return t}prepareCombinedComposition(){let e=this.currentPrefabSourceGraph;if(!e)throw Error(`Official model_combine_setup graph is not loaded.`);return this.currentCompositionStatus={mode:`model_combine_setup`,missingBodyBones:e.bodyAttach?[]:[`Unity prefab body attach unresolved`],missingHeadBones:e.headRoot&&e.headOrigin?[]:[`Unity prefab head root/origin unresolved`]},this.currentCompositionStatus}async loadCombinedCharacterAsset(e){if(!e.unityRuntimeJsonUrl)throw Error(`Final runtime package must provide container.unityRuntimeJson.`);let t=_v(e.runtimeExtension,null);if(!t)throw Error(`Final runtime package must provide runtimeUnitySetup version 0414.`);this.currentPrefabSourceGraph=t,this.syncUnityPrefabSourceGraph();let n=Tv(t,e.runtimeExtension);if(this.lastNativeMeshInstallDiagnostics=n,n.error)throw Error(`${n.error}${n.warnings.length?` ${n.warnings.slice(0,3).join(` `)}`:``}`);return this.syncUnityPrefabSourceGraph(),await Promise.all([this.overrideBodyMaterials(t.root,e.bodyAsset),this.overrideHeadMaterials(t.root,e.headAsset,{eyeController:BS(e.runtimeExtension),hairController:HS(e.runtimeExtension)})]),this.assertNoPlaceholderMaterials(t.root),this.installSekaiOutlineShells(t.root),{root:t.root,sourceMode:`unity-runtime`,requestedUrl:e.unityRuntimeJsonUrl,meshCount:n.meshCount,boneCount:n.boneCount,skinnedMeshCount:n.skinnedMeshCount,prefabSourceGraph:t}}assertNoPlaceholderMaterials(e){let t=[];if(e.traverse(e=>{let n=e;if(!n.isMesh)return;let r=Array.isArray(n.material)?n.material:[n.material];for(let e of r)(!e||e.userData.pjskPlaceholderMaterial===!0)&&t.push(`${n.name}:${e?.name??`<null>`}`)}),t.length>0)throw Error(`Unity runtime material binding left ${t.length} placeholder slot(s): ${t.slice(0,8).join(`, `)}`)}installSekaiOutlineShells(e){let t=[];e.traverse(e=>{let n=e;!n.isMesh||n.userData.pjskOutlineShell||n.userData.pjskEyeThroughHairOverlay||n.userData.pjskEyeThroughHairStencilPrepass||t.push(n)});for(let e of t)this.installSekaiOutlineShell(e)}installSekaiOutlineShell(e){let t=AS(e);if(MS(t))return;let n=OS(e.geometry);if(n===null||n<=.01)return;let r=Array.isArray(e.material)?e.material:[e.material],i=this.createSekaiOutlineMaterials(e,r);if(!i.some(e=>e.visible)){for(let e of i)e.dispose();return}let a=jS(t),o=Array.isArray(e.material)?i:i[0],s=e instanceof Ti?new Ti(e.geometry,o):new pi(e.geometry,o);s.morphTargetDictionary=e.morphTargetDictionary,s.morphTargetInfluences=e.morphTargetInfluences,s.name=`${e.name}_outline`,s.renderOrder=Math.max(e.renderOrder-2,0),s.frustumCulled=e.frustumCulled,s.userData.pjskOutlineShell=!0,s.userData.pjskSourceMaterialKind=a,s.matrixAutoUpdate=e.matrixAutoUpdate,s.position.copy(e.position),s.quaternion.copy(e.quaternion),s.scale.copy(e.scale),s instanceof Ti&&e instanceof Ti&&s.bind(e.skeleton,e.bindMatrix),this.runtimeDebug.outlineShells.push({meshName:e.name,outlineName:s.name,sourceMaterialKind:a,sourceMaterialKinds:t,sourceMaterialNames:r.map(e=>e.name),hasVertexColor:!!e.geometry.getAttribute(`color`),vertexColorRedMax:n,renderOrder:s.renderOrder,sourceRenderOrder:e.renderOrder,hasTangent:!!e.geometry.getAttribute(`tangent`),hasUv1:!!e.geometry.getAttribute(`uv1`),hasUv2:!!e.geometry.getAttribute(`uv2`),useSecondNormal:i.map(e=>e.userData.pjskOutlineUseSecondNormal===!0),wantsSecondNormal:i.map(e=>e.userData.pjskOutlineWantsSecondNormal===!0)}),e.parent?.add(s)}createSekaiOutlineMaterials(e,t){return t.map(t=>{let n=t.userData.pjskOutlineSourceMaterial instanceof $i?t.userData.pjskOutlineSourceMaterial:null;if(delete t.userData.pjskOutlineSourceMaterial,kS(t.userData.pjskMaterialKind)){n?.dispose();let e=new ti;return e.name=`pjsk_shell_outline_skipped`,e.visible=!1,e}let r=t.userData.pjskRawMaterial;if(!cx(r)){n?.dispose();let e=new ti;return e.name=`pjsk_shell_outline_disabled`,e.visible=!1,e}let i=(t.userData.pjskLighting?.useOutlineSecondNormal??0)>.5,a=i&&!!e.geometry.getAttribute(`tangent`)&&!!e.geometry.getAttribute(`uv1`)&&!!e.geometry.getAttribute(`uv2`),o=px(!!e.geometry.getAttribute(`color`),r,a,NS(t),n??t);return o.userData.pjskOutlineUseSecondNormal=a,o.userData.pjskOutlineWantsSecondNormal=i,n?.dispose(),this.characterLighting.applyOutlineMaterial(o),o})}async overrideBodyMaterials(e,t){this.runtimeDebug.body=[];let n=this.characterLighting.getBindingView();await Pb({root:e,bodyAsset:t,headAsset:this.currentHeadAsset,textureLoader:this.textureLoader,template:this.bodyMaterial,bodyDebugMode:n.bodyDebugMode,debug:this.runtimeDebug.body})}async overrideHeadMaterials(e,t,n={}){let r=this.characterLighting.getBindingView();this.runtimeDebug.head=[],this.currentHairOffset.copy(n.hairController?.offset??new G),this.currentHairHeadTransform=null;let i=n.hairController?.headTransformPath;i&&e.traverse(e=>{!this.currentHairHeadTransform&&e.userData.pjskTransformPath===i&&(this.currentHairHeadTransform=e)}),this.currentHairHeadTransform??=n.hairController?.headTransformName?this.findNodeByImportedName(e,n.hairController.headTransformName):null,await nx({root:e,headAsset:t,textureLoader:this.textureLoader,templates:{body:this.bodyMaterial,hair:this.hairMaterial,face:this.faceMaterial},view:{bodyDebugMode:r.bodyDebugMode,faceDebugMode:r.faceDebugMode,faceSdfEnabled:r.faceSdfEnabled},hair:{controllerPresent:!!n.hairController,proximityShadowEnabled:r.proximityHairShadowEnabled,headPosition:this.hairHeadPosition},eyeController:n.eyeController,debug:this.runtimeDebug.head})}handleResize(){let e=this.container??this.renderer.domElement,t=Math.max(e.clientWidth,320),n=Math.max(e.clientHeight,320);this.setViewportSize(t,n)}updateCaptureBackgroundTexture(e,t){let n=this.container??this.renderer.domElement,r=Math.max(Math.round(e??n.clientWidth),320),i=Math.max(Math.round(t??n.clientHeight),320);this.captureBackgroundTexture?.dispose(),this.captureBackgroundTexture=Xg(r,i),this.scene.background=this.captureBackgroundTexture}updateShaderCameraPositions(){this.characterLighting.updateCamera(this.camera.position)}updateShaderFaceBasis(){let e=this.currentHairHeadTransform??this.findFaceSdfHeadBone()??this.findNodeByImportedName(this.bodySlot,`Head`)??this.findNodeByImportedName(this.headSlot,`Head`)??this.currentBodyAnimationRoot??this.characterRoot;Ip(e,this.tempQuaternion),e.getWorldPosition(this.faceHeadWorldPosition),this.headTransformUpWorld.copy(yS).applyQuaternion(this.tempQuaternion).normalize(),this.faceUpWorld.set(1,0,0).applyQuaternion(this.tempQuaternion).normalize(),this.faceForwardWorld.set(0,0,1).applyQuaternion(this.tempQuaternion).normalize(),this.faceRightWorld.crossVectors(this.faceUpWorld,this.faceForwardWorld).normalize(),this.faceUpWorld.crossVectors(this.faceForwardWorld,this.faceRightWorld).normalize();let t=this.characterLighting.resolveFaceShadowLightDirection(this.getCameraRootFaceShadowLightDirection(),this.faceRightWorld,this.faceForwardWorld);PS(this.faceShadowHeadHorizontal,-this.headTransformUpWorld.x,-this.headTransformUpWorld.z),PS(this.faceShadowLightHorizontal,t.x,t.z);let n=H.radToDeg(Math.atan2(this.faceForwardWorld.x,this.faceForwardWorld.z)),r=H.radToDeg(Math.atan2(this.faceShadowLightHorizontal.x,this.faceShadowLightHorizontal.y));this.headDotDirectionalLight.set(this.faceShadowHeadHorizontal.dot(this.faceShadowLightHorizontal),FS(n,r)),this.hairHeadPosition.copy(this.currentHairOffset),e.localToWorld(this.hairHeadPosition),this.runtimeDebug.hairShadowOffset=WS(this.currentHairOffset),this.runtimeDebug.hairShadowWorldPosition=WS(this.hairHeadPosition),this.characterLighting.updateFaceBasis(t,this.headDotDirectionalLight,this.hairHeadPosition),this.characterLighting.updateEyeThroughHairView(this.camera.position,this.faceHeadWorldPosition,this.faceForwardWorld)}findFaceSdfHeadBone(){for(let e of[this.headSlot,this.bodySlot]){let t=null,n=null;if(e.traverse(e=>{if(n)return;let r=e;if(r.isSkinnedMesh&&r.skeleton&&(Array.isArray(r.material)?r.material:[r.material]).some(e=>e instanceof $i&&!!e.uniforms.uFaceShadowTex))for(let e of r.skeleton.bones){if(e.name===`Head`||/^Head_\d+$/.test(e.name)){n=e;return}!t&&e.name.toLowerCase().includes(`head`)&&(t=e)}}),n??t)return n??t}return null}updateLayerMaterialTime(e){for(let t of[this.bodySlot,this.headSlot])t.traverse(t=>{let n=t;if(!n.isMesh)return;let r=Array.isArray(n.material)?n.material:[n.material];for(let t of r)t instanceof $i&&t.uniforms.uTime&&(t.uniforms.uTime.value=e)})}render(){let e=this.clock.getDelta(),t=this.clock.elapsedTime;this.stepRuntimeFrame(e,{advanceAnimation:!0,elapsedTime:t}),this.controls?.update(),this.renderFrame(),this.animationFrame=requestAnimationFrame(()=>this.render())}async reloadAnimationPlayback(e={}){(await this.animationPlayback.refresh({root:this.currentBodyAnimationRoot,retargetWithUnityPrefab:this.currentPrefabSourceGraph!==null,runtimeExtension:this.currentRuntimeExtension,prefabHeadFollow:this.getPrefabHeadFollowDebugSnapshot()})).poseApplied&&(this.syncOfficialModelCombineSetup(),this.currentExtraBoneRuntime?.update(),(e.resetSpring??!0)&&this.resetCurrentSpringRuntimeState())}getPrefabHeadFollowDebugSnapshot(){return Yv(this.currentPrefabSourceGraph,this.currentRuntimeExtension,this.currentPrefabHeadFollowDebug)}syncUnityPrefabSourceGraph(){let e=this.currentPrefabSourceGraph;e&&(this.lastConstraintSetupDiagnostics=qv(e,this.currentRuntimeExtension,this.characterModelScaleMeters,this.currentConstraintRuntime))}syncOfficialModelCombineSetup(){this.syncUnityPrefabSourceGraph()}};function JS(e){let t=String(e.assetBaseUrl??``).trim();if(!t)throw Error(`assetBaseUrl is required to create the CostumeShop kernel.`);return YS(new qS({canvas:e.canvas,initialLight:{...e.initialLight??l},autoRender:!1,manageResize:!1,ktx2TranscoderPath:e.ktx2TranscoderPath}),t)}function YS(e,t){let r=n(e,t);return{...r,setCharacterYawDegrees:r.setViewYawDegrees}}var XS=JS;function ZS(e,t,n=()=>{}){let r=new AbortController,i=new Map,a=!1,o={yaw:0,zoom:1,height:0},s=1,c=(e,t,n)=>Math.min(n,Math.max(t,e)),l=(e,t,n,i={})=>e?.addEventListener(t,n,{...i,signal:r.signal});function u(){t.setViewYawDegrees(o.yaw),t.setViewZoom(o.zoom),t.setViewHeightOffset(o.height),e.dataset.viewYaw=String(o.yaw),e.dataset.viewZoom=String(o.zoom),e.dataset.viewHeight=String(o.height),n({...o,enabled:a})}function d(e){Number.isFinite(e.yaw)&&(o.yaw=((e.yaw+180)%360+360)%360-180),Number.isFinite(e.zoom)&&(o.zoom=c(e.zoom,.5,3)),Number.isFinite(e.height)&&(o.height=c(e.height,-.5,.8)),u()}function f(t){i.delete(t);try{e.hasPointerCapture(t)&&e.releasePointerCapture(t)}catch{}}function p(){for(let e of[...i.keys()])f(e)}function m(e){a&&Number.isFinite(e)&&e>0&&d({zoom:o.zoom*e})}function h(){p(),d({yaw:0,zoom:1,height:0})}function g(){let[e,t]=[...i.values()];return{distance:Math.hypot(e.x-t.x,e.y-t.y),y:(e.y+t.y)/2}}l(e,`pointerdown`,t=>{if(!(!a||t.pointerType===`mouse`&&t.button!==0||i.size>=2)){t.preventDefault(),e.focus({preventScroll:!0}),i.set(t.pointerId,{x:t.clientX,y:t.clientY});try{e.setPointerCapture(t.pointerId)}catch{}e.style.cursor=`grabbing`}},{passive:!1}),l(e,`pointermove`,t=>{if(!a||!i.has(t.pointerId))return;t.preventDefault();let n=i.get(t.pointerId),r=i.size===2?g():null;i.set(t.pointerId,{x:t.clientX,y:t.clientY});let s=Math.max(1,e.clientHeight);if(r){let e=g();d({zoom:r.distance>1?o.zoom*e.distance/r.distance:o.zoom,height:o.height+(e.y-r.y)*2/(s*o.zoom)})}else d({yaw:o.yaw-(t.clientX-n.x)*360/Math.max(1,e.clientWidth),height:o.height+(t.clientY-n.y)*2/(s*o.zoom)})},{passive:!1});for(let t of[`pointerup`,`pointercancel`,`lostpointercapture`])l(e,t,t=>{f(t.pointerId),e.style.cursor=i.size?`grabbing`:`grab`});return l(e.ownerDocument?.defaultView,`blur`,()=>{p(),e.style.cursor=`grab`}),l(e,`wheel`,t=>{if(!a)return;t.preventDefault();let n=t.deltaMode===1?16:t.deltaMode===2?e.clientHeight:1;m(Math.exp(c(-t.deltaY*n*.0015,-1,1)))},{passive:!1}),l(e,`gesturestart`,e=>{a&&(e.preventDefault(),s=o.zoom)},{passive:!1}),l(e,`gesturechange`,e=>{a&&(e.preventDefault(),i.size<2&&d({zoom:s*e.scale}))},{passive:!1}),l(e,`dblclick`,e=>{a&&(e.preventDefault(),h())}),l(e,`keydown`,e=>{if(!(!a||e.metaKey||e.ctrlKey||e.altKey)){switch(e.key){case`ArrowLeft`:d({yaw:o.yaw+15});break;case`ArrowRight`:d({yaw:o.yaw-15});break;case`ArrowUp`:d({height:o.height+.1});break;case`ArrowDown`:d({height:o.height-.1});break;case`+`:case`=`:m(1.2);break;case`-`:case`_`:m(1/1.2);break;case`Home`:case`0`:h();break;default:return}e.preventDefault()}}),e.style.cursor=`grab`,{reset:h,zoomBy:m,apply:u,getState:()=>({...o}),setEnabled(t){a=t,a||(p(),e.style.cursor=`grab`),n({...o,enabled:a})},dispose(){p(),r.abort()}}}var QS={"viewer.hint":`Drag left or right to rotate, up or down to move. Scroll or pinch to zoom.`,"viewer.hint.touch":`Drag to rotate and move. Pinch with two fingers to zoom.`,"viewer.canvas":`3D model. Arrow keys rotate and move the view. Plus and minus zoom. Home resets the view.`,"viewer.controls":`Model view controls`,"viewer.zoom-in":`Zoom in`,"viewer.zoom-out":`Zoom out`,"viewer.zoom-level":`Zoom level`,"viewer.reset-view":`Reset view`},$S={en:QS,"zh-Hans":{"viewer.hint":`左右拖动旋转，上下拖动移动；滚轮或双指缩放。`,"viewer.hint.touch":`拖动旋转和移动，双指捏合缩放。`,"viewer.canvas":`3D 模型。方向键旋转和移动视角，加减键缩放，Home 键重置视角。`,"viewer.controls":`模型视角控制`,"viewer.zoom-in":`放大`,"viewer.zoom-out":`缩小`,"viewer.zoom-level":`缩放比例`,"viewer.reset-view":`重置视角`},"zh-Hant":{"viewer.hint":`左右拖曳旋轉，上下拖曳移動；滾輪或雙指縮放。`,"viewer.hint.touch":`拖曳旋轉和移動，雙指捏合縮放。`,"viewer.canvas":`3D 模型。方向鍵旋轉和移動視角，加減鍵縮放，Home 鍵重設視角。`,"viewer.controls":`模型視角控制`,"viewer.zoom-in":`放大`,"viewer.zoom-out":`縮小`,"viewer.zoom-level":`縮放比例`,"viewer.reset-view":`重設視角`},ja:{"viewer.hint":`左右にドラッグして回転、上下にドラッグして移動。スクロールやピンチで拡大・縮小。`,"viewer.hint.touch":`ドラッグで回転・移動、2本指のピンチで拡大・縮小。`,"viewer.canvas":`3Dモデル。矢印キーで回転・移動、プラス・マイナスで拡大・縮小、Homeで視点をリセット。`,"viewer.controls":`モデルの視点操作`,"viewer.zoom-in":`拡大`,"viewer.zoom-out":`縮小`,"viewer.zoom-level":`表示倍率`,"viewer.reset-view":`視点をリセット`},ko:{"viewer.hint":`좌우로 드래그하여 회전하고 위아래로 이동합니다. 스크롤하거나 두 손가락으로 확대·축소합니다.`,"viewer.hint.touch":`드래그하여 회전·이동하고 두 손가락으로 확대·축소합니다.`,"viewer.canvas":`3D 모델. 방향키로 회전·이동, 더하기·빼기로 확대·축소, Home 키로 시점을 초기화합니다.`,"viewer.controls":`모델 시점 조작`,"viewer.zoom-in":`확대`,"viewer.zoom-out":`축소`,"viewer.zoom-level":`확대 비율`,"viewer.reset-view":`시점 초기화`}};function eC(e){let t=String(e).toLowerCase(),n=t.startsWith(`zh`)?/hant|tw|hk|mo/.test(t)?`zh-Hant`:`zh-Hans`:t.split(`-`)[0];return{language:$S[n]?n:`en`,values:$S[n]??QS}}var tC=document.querySelector(`#viewer`),nC=document.querySelector(`#zoom-level`),rC=document.querySelector(`#zoom-in`),iC=document.querySelector(`#zoom-out`),aC=document.querySelector(`#reset-view`),oC=XS({canvas:tC,assetBaseUrl:new URLSearchParams(location.search).get(`assets`)??`sekai3d://runtime/`,ktx2TranscoderPath:`./basis/`}),sC=ZS(tC,oC,({zoom:e,enabled:t})=>{nC.value=`${Math.round(e*100)}%`,rC.disabled=!t||e>=3,iC.disabled=!t||e<=.5,aC.disabled=!t});sC.setEnabled(!1),rC.addEventListener(`click`,()=>sC.zoomBy(1.2)),iC.addEventListener(`click`,()=>sC.zoomBy(1/1.2)),aC.addEventListener(`click`,()=>sC.reset()),window.setViewerLocale=e=>{let{language:t,values:n}=eC(e);document.documentElement.lang=t;for(let e of document.querySelectorAll(`[data-label]`)){let t=n[e.dataset.label];e.setAttribute(`aria-label`,t),e.title=t}document.querySelector(`#interaction-hint`).textContent=n[matchMedia(`(pointer:coarse)`).matches?`viewer.hint.touch`:`viewer.hint`]},window.setViewerLocale(navigator.language);function cC(e,t=``){window.webkit?.messageHandlers?.model3D?.postMessage({type:e,message:t})}var lC=Promise.resolve(),uC;window.loadModel=e=>(lC=lC.catch(()=>{}).then(async()=>{cC(`loading`),sC.setEnabled(!1);try{await oC.load(e),uC===e.roleId?sC.apply():sC.reset(),uC=e.roleId,sC.setEnabled(!0),oC.play(),cC(`loaded`)}catch(e){throw cC(`error`,String(e)),e}}),lC),window.resetModelView=()=>sC.reset(),addEventListener(`resize`,()=>oC.resize(innerWidth,innerHeight)),document.addEventListener(`visibilitychange`,()=>document.hidden?oC.pause():oC.play()),addEventListener(`pagehide`,()=>{sC.dispose(),oC.destroy()},{once:!0}),oC.resize(innerWidth,innerHeight),cC(`ready`);