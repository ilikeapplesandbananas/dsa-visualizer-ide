var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ee(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var te=/\/+/g;function ne(e,t){return typeof e==`object`&&e&&e.key!=null?ee(``+e.key):t.toString(36)}function re(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ie(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ie(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ne(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(te,`$&/`)+`/`),ie(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(te,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ne(a,u),c+=ie(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ne(a,u++),c+=ie(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ie(re(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ae(e,t,n){if(e==null)return e;var r=[],i=0;return ie(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function oe(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var A=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function se(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,A)}catch(e){A(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function ce(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else se(ce.bind(null,e))}var le={map:ae,forEach:function(e,t,n){ae(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ae(e,function(){t++}),t},toArray:function(e){return ae(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=le,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=ce,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:oe}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=se,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&te(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&te(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,ee=k.port2;k.port1.onmessage=D,O=function(){ee.postMessage(null)}}else O=function(){_(D,0)};function te(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,te(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),ee=Symbol.for(`react.portal`),te=Symbol.for(`react.fragment`),ne=Symbol.for(`react.strict_mode`),re=Symbol.for(`react.profiler`),ie=Symbol.for(`react.consumer`),ae=Symbol.for(`react.context`),oe=Symbol.for(`react.forward_ref`),A=Symbol.for(`react.suspense`),se=Symbol.for(`react.suspense_list`),ce=Symbol.for(`react.memo`),le=Symbol.for(`react.lazy`),ue=Symbol.for(`react.activity`),de=Symbol.for(`react.legacy_hidden`),fe=Symbol.for(`react.memo_cache_sentinel`),pe=Symbol.for(`react.view_transition`),me=Symbol.for(`react.recoverable`),he=Symbol.iterator;function ge(e){return typeof e!=`object`||!e?null:(e=he&&e[he]||e[`@@iterator`],typeof e==`function`?e:null)}var _e=Symbol.for(`react.client.reference`);function ve(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===_e?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case te:return`Fragment`;case re:return`Profiler`;case ne:return`StrictMode`;case A:return`Suspense`;case se:return`SuspenseList`;case ue:return`Activity`;case pe:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case ee:return`Portal`;case ae:return e.displayName||`Context`;case ie:return(e._context.displayName||`Context`)+`.Consumer`;case oe:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ce:return t=e.displayName||null,t===null?ve(e.type)||`Memo`:t;case le:t=e._payload,e=e._init;try{return ve(e(t))}catch{}}return null}var ye=Array.isArray,j=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,M=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,be={pending:!1,data:null,method:null,action:null},xe=[],Se=-1;function Ce(e){return{current:e}}function we(e){0>Se||(e.current=xe[Se],xe[Se]=null,Se--)}function N(e,t){Se++,xe[Se]=e.current,e.current=t}var Te=Ce(null),Ee=Ce(null),De=Ce(null),Oe=Ce(null);function ke(e,t){switch(N(De,t),N(Ee,e),N(Te,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}we(Te),N(Te,e)}function Ae(){we(Te),we(Ee),we(De)}function je(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,N(Oe,e)),t=Te.current;var n=dp(t,e.type);t!==n&&(N(Ee,e),N(Te,n))}function Me(e){Ee.current===e&&(we(Te),we(Ee)),Oe.current===e&&(we(Oe),sh._currentValue=be)}var Ne,Pe;function Fe(e){if(Ne===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ne=t&&t[1]||``,Pe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ne+e+Pe}var Ie=!1;function Le(e,t){if(!e||Ie)return``;Ie=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ie=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Fe(n):``}function Re(e,t){switch(e.tag){case 26:case 27:case 5:return Fe(e.type);case 16:return Fe(`Lazy`);case 13:return e.child!==t&&t!==null?Fe(`Suspense Fallback`):Fe(`Suspense`);case 19:return Fe(`SuspenseList`);case 0:case 15:return Le(e.type,!1);case 11:return Le(e.type.render,!1);case 1:return Le(e.type,!0);case 31:return Fe(`Activity`);case 30:return Fe(`ViewTransition`);default:return``}}function ze(e){try{var t=``,n=null;do t+=Re(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Be=Object.prototype.hasOwnProperty,Ve=t.unstable_scheduleCallback,He=t.unstable_cancelCallback,Ue=t.unstable_shouldYield,We=t.unstable_requestPaint,Ge=t.unstable_now,Ke=t.unstable_getCurrentPriorityLevel,qe=t.unstable_ImmediatePriority,Je=t.unstable_UserBlockingPriority,Ye=t.unstable_NormalPriority,Xe=t.unstable_LowPriority,P=t.unstable_IdlePriority,Ze=t.log,Qe=t.unstable_setDisableYieldValue,$e=null,et=null;function tt(e){if(typeof Ze==`function`&&Qe(e),et&&typeof et.setStrictMode==`function`)try{et.setStrictMode($e,e)}catch{}}var nt=Math.clz32?Math.clz32:at,rt=Math.log,it=Math.LN2;function at(e){return e>>>=0,e===0?32:31-(rt(e)/it|0)|0}var ot=256,st=262144,ct=4194304;function lt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ut(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=lt(n))):i=lt(o):i=lt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=lt(n))):i=lt(o)):i=lt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function dt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function ft(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-nt(n),i=1<<r;t|=e[r],n&=~i}return t}function pt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function mt(){var e=ct;return ct<<=1,!(ct&62914560)&&(ct=4194304),e}function ht(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function gt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function _t(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-nt(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&vt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function vt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-nt(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function yt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-nt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function bt(e,t){var n=t&-t;return n=n&42?1:xt(n),(n&(e.suspendedLanes|t))===0?n:0}function xt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function St(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Ct(){var e=M.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function wt(e,t){var n=M.p;try{return M.p=e,t()}finally{M.p=n}}var Tt=Math.random().toString(36).slice(2),Et=`__reactFiber$`+Tt,Dt=`__reactProps$`+Tt,Ot=`__reactContainer$`+Tt,kt=`__reactEvents$`+Tt,At=`__reactListeners$`+Tt,jt=`__reactHandles$`+Tt,Mt=`__reactResources$`+Tt,Nt=`__reactMarker$`+Tt,Pt=`__reactLoad$`+Tt;function Ft(e){delete e[Et],delete e[Dt],delete e[At],delete e[jt]}function It(e){var t;if(t=e[Et])return t;for(var n=e.parentNode;n;){if(t=n[Ot]||n[Et]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[Et])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Lt(e){if(e=e[Et]||e[Ot]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Rt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function zt(e){var t=e[Mt];return t||=e[Mt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Bt(e){e[Nt]=!0}function Vt(e){e[Pt]=void 0}var Ht=new Set,Ut={};function Wt(e,t){Gt(e,t),Gt(e+`Capture`,t)}function Gt(e,t){for(Ut[e]=t,e=0;e<t.length;e++)Ht.add(t[e])}var Kt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),qt={},Jt={};function Yt(e){return Be.call(Jt,e)?!0:Be.call(qt,e)?!1:Kt.test(e)?Jt[e]=!0:(qt[e]=!0,!1)}var F=!1;function Xt(){var e=F;return F=!1,e}function Zt(e,t,n){if(Yt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Qt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function $t(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function en(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function tn(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function nn(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function rn(e){if(!e._valueTracker){var t=tn(e)?`checked`:`value`;e._valueTracker=nn(e,t,``+e[t])}}function an(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=tn(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var on=/[\n"\\]/g;function sn(e){return e.replace(on,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function cn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+en(t)):e.value!==``+en(t)&&(e.value=``+en(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):un(e,en(n)):o===`number`&&e.value==t?un(e,en(e.value)):un(e,en(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+en(s):e.removeAttribute(`name`)}function ln(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){rn(e);return}n=n==null?``:``+en(n),t=t==null?n:``+en(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),rn(e)}function un(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function dn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+en(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function fn(e,t,n){t!=null&&(t=``+en(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+en(n)}function pn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ye(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=en(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),rn(e)}function mn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var hn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function gn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||hn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function _n(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,F=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(gn(e,a,r),F=!0)}else for(var o in t)t.hasOwnProperty(o)&&gn(e,o,t[o])}function vn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var yn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),bn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xn(e){return bn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Sn(){}var Cn=null;function wn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Tn=null,En=null;function Dn(e){var t=Lt(e);if(t&&(e=t.stateNode)){var n=e[Dt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(cn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+sn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Dt]||null;if(!a)throw Error(i(90));cn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&an(r)}break a;case`textarea`:fn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&dn(e,!!n.multiple,t,!1)}}}var On=!1;function kn(e,t,n){if(On)return e(t,n);On=!0;try{return e(t)}finally{if(On=!1,(Tn!==null||En!==null)&&(zd(),Tn&&(t=Tn,e=En,En=Tn=null,Dn(t),e)))for(t=0;t<e.length;t++)Dn(e[t])}}function An(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Dt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var jn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Mn=!1;if(jn)try{var Nn={};Object.defineProperty(Nn,"passive",{get:function(){Mn=!0}}),window.addEventListener(`test`,Nn,Nn),window.removeEventListener(`test`,Nn,Nn)}catch{Mn=!1}var Pn=null,Fn=null,In=null;function Ln(){if(In)return In;var e,t=Fn,n=t.length,r,i=`value`in Pn?Pn.value:Pn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return In=i.slice(e,1<r?1-r:void 0)}function Rn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function zn(){return!0}function Bn(){return!1}function Vn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?zn:Bn,this.isPropagationStopped=Bn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=zn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=zn)},persist:function(){},isPersistent:zn}),t}var Hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Un=Vn(Hn),Wn=D({},Hn,{view:0,detail:0}),Gn=Vn(Wn),Kn,I,qn,Jn=D({},Wn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ar,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==qn&&(qn&&e.type===`mousemove`?(Kn=e.screenX-qn.screenX,I=e.screenY-qn.screenY):I=Kn=0,qn=e),Kn)},movementY:function(e){return`movementY`in e?e.movementY:I}}),Yn=Vn(Jn),Xn=Vn(D({},Jn,{dataTransfer:0})),Zn=Vn(D({},Wn,{relatedTarget:0})),Qn=Vn(D({},Hn,{animationName:0,elapsedTime:0,pseudoElement:0})),$n=Vn(D({},Hn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),er=Vn(D({},Hn,{data:0})),tr={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},nr={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},rr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function ir(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=rr[e])?!!t[e]:!1}function ar(){return ir}var or=Vn(D({},Wn,{key:function(e){if(e.key){var t=tr[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Rn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?nr[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ar,charCode:function(e){return e.type===`keypress`?Rn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Rn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),sr=Vn(D({},Jn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),cr=Vn(D({},Hn,{submitter:0})),lr=Vn(D({},Wn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ar})),ur=Vn(D({},Hn,{propertyName:0,elapsedTime:0,pseudoElement:0})),dr=Vn(D({},Jn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),fr=Vn(D({},Hn,{newState:0,oldState:0,source:0})),pr=[9,13,27,32],mr=jn&&`CompositionEvent`in window,hr=null;jn&&`documentMode`in document&&(hr=document.documentMode);var gr=jn&&`TextEvent`in window&&!hr,_r=jn&&(!mr||hr&&8<hr&&11>=hr),vr=` `,yr=!1;function br(e,t){switch(e){case`keyup`:return pr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function xr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Sr=!1;function Cr(e,t){switch(e){case`compositionend`:return xr(t);case`keypress`:return t.which===32?(yr=!0,vr):null;case`textInput`:return e=t.data,e===vr&&yr?null:e;default:return null}}function wr(e,t){if(Sr)return e===`compositionend`||!mr&&br(e,t)?(e=Ln(),In=Fn=Pn=null,Sr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return _r&&t.locale!==`ko`?null:t.data;default:return null}}var Tr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Er(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Tr[e.type]:t===`textarea`}function Dr(e,t,n,r){Tn?En?En.push(r):En=[r]:Tn=r,t=Jf(t,`onChange`),0<t.length&&(n=new Un(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Or=null,kr=null;function Ar(e){Vf(e,0)}function jr(e){if(an(Rt(e)))return e}function Mr(e,t){if(e===`change`)return t}var Nr=!1;if(jn){var Pr;if(jn){var Fr=`oninput`in document;if(!Fr){var Ir=document.createElement(`div`);Ir.setAttribute(`oninput`,`return;`),Fr=typeof Ir.oninput==`function`}Pr=Fr}else Pr=!1;Nr=Pr&&(!document.documentMode||9<document.documentMode)}function Lr(){Or&&(Or.detachEvent(`onpropertychange`,Rr),kr=Or=null)}function Rr(e){if(e.propertyName===`value`&&jr(kr)){var t=[];Dr(t,kr,e,wn(e)),kn(Ar,t)}}function zr(e,t,n){e===`focusin`?(Lr(),Or=t,kr=n,Or.attachEvent(`onpropertychange`,Rr)):e===`focusout`&&Lr()}function Br(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return jr(kr)}function Vr(e,t){if(e===`click`)return jr(t)}function Hr(e,t){if(e===`input`||e===`change`)return jr(t)}function Ur(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Wr=typeof Object.is==`function`?Object.is:Ur;function Gr(e,t){if(Wr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Be.call(t,i)||!Wr(e[i],t[i]))return!1}return!0}function Kr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function qr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jr(e,t){var n=qr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=qr(n)}}function Yr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Yr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Kr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Kr(e.document)}return t}function Zr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Qr=jn&&`documentMode`in document&&11>=document.documentMode,$r=null,ei=null,ti=null,ni=!1;function ri(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ni||$r==null||$r!==Kr(r)||(r=$r,`selectionStart`in r&&Zr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ti&&Gr(ti,r)||(ti=r,r=Jf(ei,`onSelect`),0<r.length&&(t=new Un(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=$r)))}function ii(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ai={animationend:ii(`Animation`,`AnimationEnd`),animationiteration:ii(`Animation`,`AnimationIteration`),animationstart:ii(`Animation`,`AnimationStart`),transitionrun:ii(`Transition`,`TransitionRun`),transitionstart:ii(`Transition`,`TransitionStart`),transitioncancel:ii(`Transition`,`TransitionCancel`),transitionend:ii(`Transition`,`TransitionEnd`)},oi={},si={};jn&&(si=document.createElement(`div`).style,`AnimationEvent`in window||(delete ai.animationend.animation,delete ai.animationiteration.animation,delete ai.animationstart.animation),`TransitionEvent`in window||delete ai.transitionend.transition);function ci(e){if(oi[e])return oi[e];if(!ai[e])return e;var t=ai[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in si)return oi[e]=t[n];return e}var li=ci(`animationend`),ui=ci(`animationiteration`),di=ci(`animationstart`),fi=ci(`transitionrun`),pi=ci(`transitionstart`),mi=ci(`transitioncancel`),hi=ci(`transitionend`),gi=new Map,_i=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);_i.push(`scrollEnd`);function vi(e,t){gi.set(e,t),Wt(t,[e])}var yi=0;function bi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=yi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function xi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function Si(e,t){return e=xi(e),t=xi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var Ci=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},wi=[],Ti=0,Ei=0;function Di(){for(var e=Ti,t=Ei=Ti=0;t<e;){var n=wi[t];wi[t++]=null;var r=wi[t];wi[t++]=null;var i=wi[t];wi[t++]=null;var a=wi[t];if(wi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ji(n,i,a)}}function Oi(e,t,n,r){wi[Ti++]=e,wi[Ti++]=t,wi[Ti++]=n,wi[Ti++]=r,Ei|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ki(e,t,n,r){return Oi(e,t,n,r),Mi(e)}function Ai(e,t){return Oi(e,null,null,t),Mi(e)}function ji(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-nt(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Mi(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ni={};function Pi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fi(e,t,n,r){return new Pi(e,t,n,r)}function Ii(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Li(e,t){var n=e.alternate;return n===null?(n=Fi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ri(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function zi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Ii(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,Te.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case ue:return e=Fi(31,n,t,a),e.elementType=ue,e.lanes=o,e;case te:return Bi(n.children,a,o,t);case ne:s=8,a|=24;break;case re:return e=Fi(12,n,t,a|2),e.elementType=re,e.lanes=o,e;case A:return e=Fi(13,n,t,a),e.elementType=A,e.lanes=o,e;case se:return e=Fi(19,n,t,a),e.elementType=se,e.lanes=o,e;case de:case pe:return e=a|32,e=Fi(30,n,t,e),e.elementType=pe,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case ae:s=10;break a;case ie:s=9;break a;case oe:s=11;break a;case ce:s=14;break a;case le:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Fi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Bi(e,t,n,r){return e=Fi(7,e,r,t),e.lanes=n,e}function Vi(e,t,n){return e=Fi(6,e,null,t),e.lanes=n,e}function Hi(e){var t=Fi(18,null,null,0);return t.stateNode=e,t}function Ui(e,t,n){return t=Fi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Wi=new WeakMap;function Gi(e,t){if(typeof e==`object`&&e){var n=Wi.get(e);return n===void 0?(t={value:e,source:t,stack:ze(t)},Wi.set(e,t),t):n}return{value:e,source:t,stack:ze(t)}}var Ki=[],qi=0,Ji=null,Yi=0,Xi=[],Zi=0,Qi=null,$i=1,ea=``;function ta(e,t){Ki[qi++]=Yi,Ki[qi++]=Ji,Ji=e,Yi=t}function na(e,t,n){Xi[Zi++]=$i,Xi[Zi++]=ea,Xi[Zi++]=Qi,Qi=e;var r=$i;e=ea;var i=32-nt(r)-1;r&=~(1<<i),n+=1;var a=32-nt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,$i=1<<32-nt(t)+i|n<<i|r,ea=a+e}else $i=1<<a|n<<i|r,ea=e}function ra(e){e.return!==null&&(ta(e,1),na(e,1,0))}function ia(e){for(;e===Ji;)Ji=Ki[--qi],Ki[qi]=null,Yi=Ki[--qi],Ki[qi]=null;for(;e===Qi;)Qi=Xi[--Zi],Xi[Zi]=null,ea=Xi[--Zi],Xi[Zi]=null,$i=Xi[--Zi],Xi[Zi]=null}function aa(e,t){Xi[Zi++]=$i,Xi[Zi++]=ea,Xi[Zi++]=Qi,$i=t.id,ea=t.overflow,Qi=e}var oa=null,L=null,R=!1,sa=null,ca=!1,la=Error(i(519));function ua(e){throw ga(Gi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),la}function da(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Et]=e,t[Dt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),ln(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),pn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=Sn),t=!0):t=!1,t||ua(e,!0)}function fa(e){for(oa=e.return;oa;)switch(oa.tag){case 5:case 31:case 13:ca=!1;return;case 27:case 3:ca=!0;return;default:oa=oa.return}}function pa(e){if(e!==oa)return!1;if(!R)return fa(e),R=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&L&&ua(e),fa(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));L=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));L=dm(e)}else t===27?(t=L,Sp(e.type)?(e=um,um=null,L=e):L=t):L=oa?lm(e.stateNode.nextSibling):null;return!0}function ma(){L=oa=null,R=!1}function ha(){var e=sa;return e!==null&&(pd===null?pd=e:pd.push.apply(pd,e),sa=null),e}function ga(e){sa===null?sa=[e]:sa.push(e)}var _a=Ce(null),va=null,ya=null;function ba(e,t,n){N(_a,t._currentValue),t._currentValue=n}function xa(e){e._currentValue=_a.current,we(_a)}function Sa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Ca(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Sa(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Sa(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Sa(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function wa(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Wr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Oe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&Ca(t,e,n,r),t.flags|=262144,e!==null}function Ta(e){for(e=e.firstContext;e!==null;){if(!Wr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ea(e){va=e,ya=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Da(e){return ka(va,e)}function Oa(e,t){return va===null&&Ea(e),ka(e,t)}function ka(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ya===null){if(e===null)throw Error(i(308));ya=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ya=ya.next=t;return n}var Aa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ja=t.unstable_scheduleCallback,Ma=t.unstable_NormalPriority,Na={$$typeof:ae,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Pa(){return{controller:new Aa,data:new Map,refCount:0}}function Fa(e){e.refCount--,e.refCount===0&&ja(Ma,function(){e.controller.abort()})}function Ia(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var La=null;function Ra(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var za=null,Ba=0,Va=0,Ha=null;function Ua(e,t){if(za===null){var n=za=[];Ba=0,Va=Pf(),Ha={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ba++,t.then(Wa,Wa),t}function Wa(){if(--Ba===0&&(La=null,za!==null)){Ha!==null&&(Ha.status=`fulfilled`);var e=za;za=null,Va=0,Ha=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ga(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ka=j.S;j.S=function(e,t){if(gd=Ge(),typeof t==`object`&&t&&typeof t.then==`function`&&Ua(e,t),La!==null)for(var n=bf;n!==null;)Ia(n,La),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Ia(r,n),r=r.next;if(Va!==0){r=La,r===null&&(r=La=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ka!==null&&Ka(e,t)};var qa=Ce(null);function Ja(){var e=qa.current;return e===null?K.pooledCache:e}function Ya(e,t){t===null?N(qa,qa.current):N(qa,t.pool)}function Xa(){var e=Ja();return e===null?null:{parent:Na._currentValue,pool:e}}var Za=Error(i(460)),Qa=Error(i(474)),$a=Error(i(542)),eo={then:function(){}};function to(e){return e=e.status,e===`fulfilled`||e===`rejected`}function no(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Sn,Sn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,oo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(Sn,Sn);else{if(e=K,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,oo(e),e}throw io=t,Za}}function ro(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(io=e,Za):e}}var io=null;function ao(){if(io===null)throw Error(i(459));var e=io;return io=null,e}function oo(e){if(e===Za||e===$a)throw Error(i(483))}var so=null,co=0;function lo(e){var t=co;return co+=1,so===null&&(so=[]),no(so,e,t)}function uo(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function fo(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function po(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Li(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Vi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===te?(e=d(e,t,n.props.children,r,n.key),uo(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===le&&ro(i)===t.type)?(t=a(t,n.props),uo(t,n),t.return=e,t):(t=zi(n.type,n.key,n.props,null,e.mode,r),uo(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ui(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Bi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Vi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=zi(t.type,t.key,t.props,null,e.mode,n),uo(n,t),n.return=e,n;case ee:return t=Ui(t,e.mode,n),t.return=e,t;case le:return t=ro(t),f(e,t,n)}if(ye(t)||ge(t))return t=Bi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,lo(t),n);if(t.$$typeof===ae)return f(e,Oa(e,t),n);fo(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case ee:return n.key===i?u(e,t,n,r):null;case le:return n=ro(n),p(e,t,n,r)}if(ye(n)||ge(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,lo(n),r);if(n.$$typeof===ae)return p(e,t,Oa(e,n),r);fo(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case ee:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case le:return r=ro(r),m(e,t,n,r,i)}if(ye(r)||ge(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,lo(r),i);if(r.$$typeof===ae)return m(e,t,n,Oa(t,r),i);fo(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),R&&ta(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return R&&ta(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),R&&ta(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),R&&ta(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return R&&ta(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),R&&ta(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===te&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===te){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),uo(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===le&&ro(l)===r.type){n(e,r.sibling),c=a(r,o.props),uo(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===te?(c=Bi(o.props.children,e.mode,c,o.key),uo(c,o),c.return=e,e=c):(c=zi(o.type,o.key,o.props,null,e.mode,c),uo(c,o),c.return=e,e=c)}return s(e);case ee:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ui(o,e.mode,c),c.return=e,e=c}return s(e);case le:return o=ro(o),_(e,r,o,c)}if(ye(o))return h(e,r,o,c);if(ge(o)){if(l=ge(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,lo(o),c);if(o.$$typeof===ae)return _(e,r,Oa(e,o),c);fo(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Vi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{co=0;var i=_(e,t,n,r);return so=null,i}catch(t){if(t===Za||t===$a)throw t;var a=Fi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var mo=po(!0),ho=po(!1),go=!1;function _o(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function vo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function yo(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function bo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,G&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Mi(e),ji(e,null,n),t}return Oi(e,r,t,n),Mi(e)}function xo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yt(e,n)}}function So(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Co=!1;function wo(){if(Co){var e=Ha;if(e!==null)throw e}}function To(e,t,n,r){Co=!1;var i=e.updateQueue;go=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(J&f)===f:(r&f)===f){f!==0&&f===Va&&(Co=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:go=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),sd|=o,e.lanes=o,e.memoizedState=d}}function Eo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Do(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Eo(n[e],t)}var Oo=Ce(null),ko=Ce(0);function Ao(e,t){e=ad,N(ko,e),N(Oo,t),ad=e|t.baseLanes}function jo(){N(ko,ad),N(Oo,Oo.current)}function Mo(){ad=ko.current,we(Oo),we(ko)}var No=Ce(null),Po=null;function Fo(e){var t=e.alternate;N(Bo,Bo.current&1),N(No,e),Po===null&&(t===null||Oo.current!==null||t.memoizedState!==null)&&(Po=e)}function Io(e){N(Bo,Bo.current),N(No,e),Po===null&&(Po=e)}function Lo(e){e.tag===22?(N(Bo,Bo.current),N(No,e),Po===null&&(Po=e)):Ro()}function Ro(){N(Bo,Bo.current),N(No,No.current)}function zo(e){we(No),Po===e&&(Po=null),we(Bo)}var Bo=Ce(0);function Vo(e,t){N(No,No.current),N(Bo,t)}function Ho(e){we(Bo),we(No),Po===e&&(Po=null)}function Uo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Wo=0,z=null,B=null,Go=null,Ko=!1,qo=!1,Jo=!1,Yo=0,Xo=0,Zo=null,Qo=0;function V(){throw Error(i(321))}function $o(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Wr(e[n],t[n]))return!1;return!0}function es(e,t,n,r,i,a){return Wo=a,z=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,j.H=e===null||e.memoizedState===null?_c:vc,Jo=!1,a=n(r,i),Jo=!1,qo&&(a=ns(t,n,r,i)),ts(e),a}function ts(e){j.H=gc;var t=B!==null&&B.next!==null;if(Wo=0,Go=B=z=null,Ko=!1,Xo=0,Zo=null,t)throw Error(i(300));e===null||Fc||(e=e.dependencies,e!==null&&Ta(e)&&(Fc=!0))}function ns(e,t,n,r){z=e;var a=0;do{if(qo&&(Zo=null),Xo=0,qo=!1,25<=a)throw Error(i(301));if(a+=1,Go=B=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}j.H=yc,o=t(n,r)}while(qo);return o}function rs(){var e=j.H,t=e.useState()[0];return t=typeof t.then==`function`?us(t):t,e=e.useState()[0],(B===null?null:B.memoizedState)!==e&&(z.flags|=1024),t}function is(){var e=Yo!==0;return Yo=0,e}function as(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function os(e){if(Ko){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ko=!1}Wo=0,Go=B=z=null,qo=!1,Xo=Yo=0,Zo=null}function ss(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Go===null?z.memoizedState=Go=e:Go=Go.next=e,Go}function cs(){if(B===null){var e=z.alternate;e=e===null?null:e.memoizedState}else e=B.next;var t=Go===null?z.memoizedState:Go.next;if(t!==null)Go=t,B=e;else{if(e===null)throw z.alternate===null?Error(i(467)):Error(i(310));B=e,e={memoizedState:B.memoizedState,baseState:B.baseState,baseQueue:B.baseQueue,queue:B.queue,next:null},Go===null?z.memoizedState=Go=e:Go=Go.next=e}return Go}function ls(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function us(e){var t=Xo;return Xo+=1,Zo===null&&(Zo=[]),e=no(Zo,e,t),t=z,(Go===null?t.memoizedState:Go.next)===null&&(t=t.alternate,j.H=t===null||t.memoizedState===null?_c:vc),e}function ds(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return us(e);if(e.$$typeof===me)return;if(e.$$typeof===ae)return Da(e)}throw Error(i(438,String(e)))}function fs(e){var t=null,n=z.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=z.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=ls(),z.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=fe;return t.index++,n}function ps(e,t){return typeof t==`function`?t(e):t}function ms(e){return hs(cs(),B,e)}function hs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Wo&f)===f:(J&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Va&&(d=!0);else if((Wo&p)===p){u=u.next,p===Va&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,z.lanes|=p,sd|=p;f=u.action,Jo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,z.lanes|=f,sd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Wr(o,e.memoizedState)&&(Fc=!0,d&&(n=Ha,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function gs(e){var t=cs(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Wr(o,t.memoizedState)||(Fc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function _s(e,t,n){var r=z,a=cs(),o=R;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Wr((B||a).memoizedState,n);if(s&&(a.memoizedState=n,Fc=!0),a=a.queue,Hs(bs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Go!==null&&!!(Go.memoizedState.tag&1),Ls(e?9:8,{destroy:void 0},ys.bind(null,r,a,n,t),null),e){if(r.flags|=2048,K===null)throw Error(i(349));o||Wo&127||vs(r,t,n)}return n}function vs(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=z.updateQueue,t===null?(t=ls(),z.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ys(e,t,n,r){t.value=n,t.getSnapshot=r,xs(t)&&Ss(e)}function bs(e,t,n){return n(function(){xs(t)&&Ss(e)})}function xs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Wr(e,n)}catch{return!0}}function Ss(e){var t=Ai(e,2);t!==null&&Pd(t,e,2)}function Cs(e){var t=ss();if(typeof e==`function`){var n=e;if(e=n(),Jo){tt(!0);try{n()}finally{tt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ps,lastRenderedState:e},t}function ws(e,t,n,r){return e.baseState=n,hs(e,B,typeof r==`function`?r:ps)}function Ts(e,t,n,r,a){if(pc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};j.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Es(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Es(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=j.T,o={};o.types=a===null?null:a.types,j.T=o;try{var s=n(i,r),c=j.S;c!==null&&c(o,s),Ds(e,t,s)}catch(n){ks(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),j.T=a}}else try{a=n(i,r),Ds(e,t,a)}catch(n){ks(e,t,n)}}function Ds(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Os(e,t,n)},function(n){return ks(e,t,n)}):Os(e,t,n)}function Os(e,t,n){t.status=`fulfilled`,t.value=n,As(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Es(e,n)))}function ks(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,As(t),t=t.next;while(t!==r)}e.action=null}function As(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function js(e,t){return t}function Ms(e,t){if(R){var n=K.formState;if(n!==null){a:{var r=z;if(R){if(L){b:{for(var i=L,a=ca;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){L=lm(i.nextSibling),r=i.data===`F!`;break a}}ua(r)}r=!1}r&&(t=n[0])}}return n=ss(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:js,lastRenderedState:t},n.queue=r,n=uc.bind(null,z,r),r.dispatch=n,r=Cs(!1),a=fc.bind(null,z,!1,r.queue),r=ss(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ts.bind(null,z,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Ns(e){return Ps(cs(),B,e)}function Ps(e,t,n){if(t=hs(e,t,js)[0],e=ms(ps)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=us(t)}catch(e){throw e===Za?$a:e}else r=t;t=cs();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(z.flags|=2048,Ls(9,{destroy:void 0},Fs.bind(null,i,n),null)),[r,a,e]}function Fs(e,t){e.action=t}function Is(e){var t=cs(),n=B;if(n!==null)return Ps(t,n,e);cs(),t=t.memoizedState,n=cs();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ls(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=z.updateQueue,t===null&&(t=ls(),z.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Rs(){return cs().memoizedState}function zs(e,t,n,r){var i=ss();z.flags|=e,i.memoizedState=Ls(1|t,{destroy:void 0},n,r===void 0?null:r)}function Bs(e,t,n,r){var i=cs();r=r===void 0?null:r;var a=i.memoizedState.inst;B!==null&&r!==null&&$o(r,B.memoizedState.deps)?i.memoizedState=Ls(t,a,n,r):(z.flags|=e,i.memoizedState=Ls(1|t,a,n,r))}function Vs(e,t){zs(8390656,8,e,t)}function Hs(e,t){Bs(2048,8,e,t)}function Us(e){z.flags|=4;var t=z.updateQueue;if(t===null)t=ls(),z.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Ws(e){var t=cs().memoizedState;return Us({ref:t,nextImpl:e}),function(){if(G&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Gs(e,t){return Bs(4,2,e,t)}function Ks(e,t){return Bs(4,4,e,t)}function qs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Js(e,t,n){n=n==null?null:n.concat([e]),Bs(4,4,qs.bind(null,t,e),n)}function Ys(){}function Xs(e,t){var n=cs();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&$o(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Zs(e,t){var n=cs();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&$o(t,r[1]))return r[0];if(r=e(),Jo){tt(!0);try{e()}finally{tt(!1)}}return n.memoizedState=[r,t],r}function Qs(e,t,n){return n===void 0||Wo&1073741824&&!(J&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),z.lanes|=e,sd|=e,n)}function $s(e,t,n,r){return Wr(n,t)?n:Oo.current===null?!(Wo&106)||Wo&1073741824&&!(J&261930)?(Fc=!0,e.memoizedState=n):(e=Md(),z.lanes|=e,sd|=e,t):(e=Qs(e,n,r),Wr(e,t)||(Fc=!0),e)}function ec(e,t,n,r,i){var a=M.p;M.p=a!==0&&8>a?a:8;var o=j.T,s={};s.types=o===null?null:o.types,j.T=s,fc(e,!1,t,n);try{var c=i(),l=j.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?dc(e,t,Ga(c,r),jd(e)):dc(e,t,r,jd(e))}catch(n){dc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{M.p=a,o!==null&&s.types!==null&&(o.types=s.types),j.T=o}}function tc(){}function nc(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=rc(e).queue;ec(e,a,t,be,n===null?tc:function(){return ic(e),n(r)})}function rc(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:be,baseState:be,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ps,lastRenderedState:be},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ps,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ic(e){var t=rc(e);t.next===null&&(t=e.alternate.memoizedState),dc(e,t.next.queue,{},jd())}function ac(){return Da(sh)}function oc(){return cs().memoizedState}function sc(){return cs().memoizedState}function cc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=yo(n);var r=bo(t,e,n);r!==null&&(Pd(r,t,n),xo(r,t,n)),t={cache:Pa()},e.payload=t;return}t=t.return}}function lc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},pc(e)?mc(t,n):(n=ki(e,t,n,r),n!==null&&(Pd(n,e,r),hc(n,t,r)))}function uc(e,t,n){dc(e,t,n,jd())}function dc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(pc(e))mc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Wr(s,o))return Oi(e,t,i,0),K===null&&Di(),!1}catch{}if(n=ki(e,t,i,r),n!==null)return Pd(n,e,r),hc(n,t,r),!0}return!1}function fc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},pc(e)){if(t)throw Error(i(479))}else t=ki(e,n,r,2),t!==null&&Pd(t,e,2)}function pc(e){var t=e.alternate;return e===z||t!==null&&t===z}function mc(e,t){qo=Ko=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function hc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yt(e,n)}}var gc={readContext:Da,use:ds,useCallback:V,useContext:V,useEffect:V,useImperativeHandle:V,useLayoutEffect:V,useInsertionEffect:V,useMemo:V,useReducer:V,useRef:V,useState:V,useDebugValue:V,useDeferredValue:V,useTransition:V,useSyncExternalStore:V,useId:V,useHostTransitionStatus:V,useFormState:V,useActionState:V,useOptimistic:V,useMemoCache:V,useCacheRefresh:V,useEffectEvent:V},_c={readContext:Da,use:ds,useCallback:function(e,t){return ss().memoizedState=[e,t===void 0?null:t],e},useContext:Da,useEffect:Vs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),zs(4194308,4,qs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return zs(4194308,4,e,t)},useInsertionEffect:function(e,t){zs(4,2,e,t)},useMemo:function(e,t){var n=ss();t=t===void 0?null:t;var r=e();if(Jo){tt(!0);try{e()}finally{tt(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=ss();if(n!==void 0){var i=n(t);if(Jo){tt(!0);try{n(t)}finally{tt(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=lc.bind(null,z,e),[r.memoizedState,e]},useRef:function(e){var t=ss();return e={current:e},t.memoizedState=e},useState:function(e){e=Cs(e);var t=e.queue,n=uc.bind(null,z,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ys,useDeferredValue:function(e,t){return Qs(ss(),e,t)},useTransition:function(){var e=Cs(!1);return e=ec.bind(null,z,e.queue,!0,!1),ss().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=z,a=ss();if(R){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),K===null)throw Error(i(349));J&127||vs(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Vs(bs.bind(null,r,o,e),[e]),r.flags|=2048,Ls(9,{destroy:void 0},ys.bind(null,r,o,n,t),null),n},useId:function(){var e=ss(),t=K.identifierPrefix;if(R){var n=ea,r=$i;n=(r&~(1<<32-nt(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Yo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Qo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:ac,useFormState:Ms,useActionState:Ms,useOptimistic:function(e){var t=ss();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=fc.bind(null,z,!0,n),n.dispatch=t,[e,t]},useMemoCache:fs,useCacheRefresh:function(){return ss().memoizedState=cc.bind(null,z)},useEffectEvent:function(e){var t=ss(),n={impl:e};return t.memoizedState=n,function(){if(G&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},vc={readContext:Da,use:ds,useCallback:Xs,useContext:Da,useEffect:Hs,useImperativeHandle:Js,useInsertionEffect:Gs,useLayoutEffect:Ks,useMemo:Zs,useReducer:ms,useRef:Rs,useState:function(){return ms(ps)},useDebugValue:Ys,useDeferredValue:function(e,t){return $s(cs(),B.memoizedState,e,t)},useTransition:function(){var e=ms(ps)[0],t=cs().memoizedState;return[typeof e==`boolean`?e:us(e),t]},useSyncExternalStore:_s,useId:oc,useHostTransitionStatus:ac,useFormState:Ns,useActionState:Ns,useOptimistic:function(e,t){return ws(cs(),B,e,t)},useMemoCache:fs,useCacheRefresh:sc,useEffectEvent:Ws},yc={readContext:Da,use:ds,useCallback:Xs,useContext:Da,useEffect:Hs,useImperativeHandle:Js,useInsertionEffect:Gs,useLayoutEffect:Ks,useMemo:Zs,useReducer:gs,useRef:Rs,useState:function(){return gs(ps)},useDebugValue:Ys,useDeferredValue:function(e,t){var n=cs();return B===null?Qs(n,e,t):$s(n,B.memoizedState,e,t)},useTransition:function(){var e=gs(ps)[0],t=cs().memoizedState;return[typeof e==`boolean`?e:us(e),t]},useSyncExternalStore:_s,useId:oc,useHostTransitionStatus:ac,useFormState:Is,useActionState:Is,useOptimistic:function(e,t){var n=cs();return B===null?(n.baseState=e,[e,n.queue.dispatch]):ws(n,B,e,t)},useMemoCache:fs,useCacheRefresh:sc,useEffectEvent:Ws};function bc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var xc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=yo(r);i.payload=t,n!=null&&(i.callback=n),t=bo(e,i,r),t!==null&&(Pd(t,e,r),xo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=yo(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=bo(e,i,r),t!==null&&(Pd(t,e,r),xo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=yo(n);r.tag=2,t!=null&&(r.callback=t),t=bo(e,r,n),t!==null&&(Pd(t,e,n),xo(t,e,n))}};function Sc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Gr(n,r)||!Gr(i,a):!0}function Cc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&xc.enqueueReplaceState(t,t.state,null)}function wc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Tc(e){Ci(e)}function Ec(e){console.error(e)}function Dc(e){Ci(e)}function Oc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function kc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ac(e,t,n){return n=yo(n),n.tag=3,n.payload={element:null},n.callback=function(){Oc(e,t)},n}function jc(e){return e=yo(e),e.tag=3,e}function Mc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){kc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){kc(t,n,r),typeof i!=`function`&&(yd===null?yd=new Set([this]):yd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Nc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&wa(t,n,a,!0),n=No.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Po===null?Kd():n.alternate===null&&od===0&&(od=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===eo?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===eo?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(R)return t=No.current,t===null?(r!==la&&(t=Error(i(423),{cause:r}),ga(Gi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Gi(r,n),a=Ac(e.stateNode,r,a),So(e,a),od!==4&&(od=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==la&&(e=Error(i(422),{cause:r}),ga(Gi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Gi(o,n),fd===null?fd=[o]:fd.push(o),od!==4&&(od=2),t===null)return!0;r=Gi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ac(n.stateNode,r,e),So(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(yd===null||!yd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=jc(a),Mc(a,e,n,r),So(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Pc=Error(i(461)),Fc=!1;function Ic(e,t,n,r){t.child=e===null?ho(t,null,n,r):mo(t,e.child,n,r)}function Lc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ea(t),r=es(e,t,n,o,a,i),s=is(),e!==null&&!Fc?(as(e,t,i),dl(e,t,i)):(R&&s&&ra(t),t.flags|=1,Ic(e,t,r,i),t.child)}function Rc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Ii(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,zc(e,t,a,r,i)):(e=zi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!fl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Gr:n,n(o,r)&&e.ref===t.ref)return dl(e,t,i)}return t.flags|=1,e=Li(a,r),e.ref=t.ref,e.return=t,t.child=e}function zc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Gr(a,r)&&e.ref===t.ref){if(Fc=!1,t.pendingProps=r=a,fl(e,i))e.flags&131072&&(Fc=!0);else return t.lanes=e.lanes,dl(e,t,i)}}return qc(e,t,n,r,i)}function Bc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Hc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ya(t,a===null?null:a.cachePool),a===null?jo():Ao(t,a),Lo(t);else return r=t.lanes=536870912,Hc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ya(t,null),jo(),Ro()):(Ya(t,a.cachePool),Ao(t,a),Ro(),t.memoizedState=null);return Ic(e,t,i,n),t.child}function Vc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Hc(e,t,n,r,i){var a=Ja();return a=a===null?null:{parent:Na._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ya(t,null),jo(),Lo(t),e!==null&&wa(e,t,r,!0),t.childLanes=i,null}function Uc(e,t){return t=nl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Wc(e,t,n){return mo(t,e.child,null,n),e=Uc(t,t.pendingProps),e.flags|=2,zo(t),t.memoizedState=null,e}function Gc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(R){if(r.mode===`hidden`)return e=Uc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Vc(null,e);if(Io(t),(e=L)?(e=am(e,ca),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Qi===null?null:{id:$i,overflow:ea},retryLane:536870912,hydrationErrors:null},n=Hi(e),n.return=t,t.child=n,oa=t,L=null)):e=null,e===null)throw ua(t);return t.lanes=536870912,null}return Uc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Io(t),a){if(t.flags&256)t.flags&=-257,t=Wc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Fc||wa(e,t,n,!1),a=(n&e.childLanes)!==0,Fc||a){if(Oo.current===null){if(r=K,r!==null&&(s=bt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ai(e,s),Pd(r,e,s),Pc;Kd()}t=Wc(e,t,n)}else e=o.treeContext,L=lm(s.nextSibling),oa=t,R=!0,sa=null,ca=!1,e!==null&&aa(t,e),t=Uc(t,r),t.flags|=134221824;return t}return e=Li(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Kc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function qc(e,t,n,r,i){return Ea(t),n=es(e,t,n,r,void 0,i),r=is(),e!==null&&!Fc?(as(e,t,i),dl(e,t,i)):(R&&r&&ra(t),t.flags|=1,Ic(e,t,n,i),t.child)}function Jc(e,t,n,r,i,a){return Ea(t),t.updateQueue=null,n=ns(t,r,n,i),ts(e),r=is(),e!==null&&!Fc?(as(e,t,a),dl(e,t,a)):(R&&r&&ra(t),t.flags|=1,Ic(e,t,n,a),t.child)}function Yc(e,t,n,r,i){if(Ea(t),t.stateNode===null){var a=Ni,o=n.contextType;typeof o==`object`&&o&&(a=Da(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=xc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},_o(t),o=n.contextType,a.context=typeof o==`object`&&o?Da(o):Ni,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(bc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&xc.enqueueReplaceState(a,a.state,null),To(t,r,a,i),wo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=wc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ni,typeof u==`object`&&u&&(o=Da(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Cc(t,a,r,o),go=!1;var f=t.memoizedState;a.state=f,To(t,r,a,i),wo(),l=t.memoizedState,s||f!==l||go?(typeof d==`function`&&(bc(t,n,d,r),l=t.memoizedState),(c=go||Sc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,vo(e,t),o=t.memoizedProps,u=wc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ni,typeof l==`object`&&l&&(c=Da(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Cc(t,a,r,c),go=!1,f=t.memoizedState,a.state=f,To(t,r,a,i),wo();var p=t.memoizedState;o!==d||f!==p||go||e!==null&&e.dependencies!==null&&Ta(e.dependencies)?(typeof s==`function`&&(bc(t,n,s,r),p=t.memoizedState),(u=go||Sc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Ta(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Kc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=mo(t,e.child,null,i),t.child=mo(t,null,n,i)):Ic(e,t,n,i),t.memoizedState=a.state,e=t.child):e=dl(e,t,i),e}function Xc(e,t,n,r){return ma(),t.flags|=256,Ic(e,t,n,r),t.child}var Zc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qc(e){return{baseLanes:e,cachePool:Xa()}}function $c(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ud),e}function el(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Bo.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(R){if(i?Fo(t):Ro(),(e=L)?(e=am(e,ca),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Qi===null?null:{id:$i,overflow:ea},retryLane:536870912,hydrationErrors:null},n=Hi(e),n.return=t,t.child=n,oa=t,L=null)):e=null,e===null)throw ua(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Ro(),i=t.mode,a=nl({mode:`hidden`,children:a},i),r=Bi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Qc(n),r.childLanes=$c(e,o,n),t.memoizedState=Zc,Vc(null,r)):(Fo(t),tl(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return il(e,t,a,o,r,c,s,n)}return i?(Ro(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Li(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Bi(i,a,n,null),i.flags|=2):i=Li(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Vc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Qc(n):(a=i.cachePool,a===null?a=Xa():(s=Na._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=$c(e,o,n),t.memoizedState=Zc,Vc(e.child,r)):(Fo(t),n=e.child,e=n.sibling,n=Li(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function tl(e,t){return t=nl({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function nl(e,t){return e=Fi(22,e,null,t),e.lanes=0,e}function rl(e,t,n){return mo(t,e.child,null,n),e=tl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function il(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(Fo(t),t.flags&=-257,rl(e,t,c)):t.memoizedState===null?(Ro(),o=a.fallback,s=t.mode,a=nl({mode:`visible`,children:a.children},s),o=Bi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,mo(t,e.child,null,c),a=t.child,a.memoizedState=Qc(c),a.childLanes=$c(e,r,c),t.memoizedState=Zc,Vc(null,a)):(Ro(),t.child=e.child,t.flags|=128,null);if(Fo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ga({value:a,source:null,stack:null})),rl(e,t,c)}if(Fc||wa(e,t,c,!1),r=(c&e.childLanes)!==0,Fc||r){if(Oo.current!==null)return rl(e,t,c);if(r=K,r!==null&&(a=bt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ai(e,a),Pd(r,e,a),Pc;return om(o)||Kd(),rl(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,L=lm(o.nextSibling),oa=t,R=!0,sa=null,ca=!1,e!==null&&aa(t,e),t=tl(t,a.children),t.flags|=134221824,t)}function al(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Sa(e.return,t,n)}function ol(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Uo(n)===null&&(t=e),e=e.sibling}return t}function sl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function cl(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ll(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Bo.current;if(t.flags&128)return Vo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Vo(t,o),i===`backwards`&&e!==null?(cl(e),Ic(e,t,r,n),cl(e)):Ic(e,t,r,n),r=R?Yi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&al(e,n,t);else if(e.tag===19)al(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=ol(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,cl(t)),sl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Uo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}sl(t,!0,n,null,a,r);break;case`together`:sl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=ol(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),sl(t,!1,i,n,a,r)}return t.child}function ul(e,t,n){var r=t.pendingProps;return ba(t,t.type,r.value),Ic(e,t,r.children,n),t.child}function dl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),sd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(wa(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Li(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Li(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function fl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Ta(e)))}function pl(e,t,n){switch(t.tag){case 3:ke(t,t.stateNode.containerInfo),ba(t,Na,e.memoizedState.cache),ma();break;case 27:case 5:je(t);break;case 4:ke(t,t.stateNode.containerInfo);break;case 10:ba(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Io(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return Fo(t),t.flags|=128,null;r=wa(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?el(e,t,n):(Fo(t),e=dl(e,t,n),e===null?null:e.sibling)}Fo(t);break;case 19:if(t.flags&128)return ll(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(wa(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return ll(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Vo(t,Bo.current),r)break;return null;case 22:return t.lanes=0,Bc(e,t,n,t.pendingProps);case 24:ba(t,Na,e.memoizedState.cache)}return dl(e,t,n)}function ml(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Fc=!0;else{if(!fl(e,n)&&!(t.flags&128))return Fc=!1,pl(e,t,n);Fc=!!(e.flags&131072)}}else Fc=!1,R&&t.flags&1048576&&na(t,Yi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ro(t.elementType),t.type=e,typeof e==`function`)Ii(e)?(r=wc(e,r),t.tag=1,t=Yc(null,t,e,r,n)):(t.tag=0,t=qc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===oe){t.tag=11,t=Lc(null,t,e,r,n);break a}if(a===ce){t.tag=14,t=Rc(null,t,e,r,n);break a}if(a===ae){t.tag=10,t.type=e,t=ul(null,t,n);break a}}throw t=ve(e)||e,Error(i(306,t,``))}}return t;case 0:return qc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=wc(r,t.pendingProps),Yc(e,t,r,a,n);case 3:a:{if(ke(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,vo(e,t),To(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ba(t,Na,r),r!==o.cache&&Ca(t,[Na],n,!0),wo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Xc(e,t,r,n);break a}if(r!==a){a=Gi(Error(i(424)),t),ga(a),t=Xc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(L=lm(e.firstChild),oa=t,R=!0,sa=null,ca=!0,n=ho(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ma(),r===a){t=dl(e,t,n);break a}Ic(e,t,r,n)}t=t.child}return t;case 26:return Kc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:R||(t.stateNode=fp(t.type,t.pendingProps,De.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return je(t),e===null&&R&&(r=t.stateNode=hm(t.type,t.pendingProps,De.current),oa=t,ca=!0,a=L,Sp(t.type)?(um=a,L=lm(r.firstChild)):L=a),Ic(e,t,t.pendingProps.children,n),Kc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&R&&((a=r=L)&&(r=rm(r,t.type,t.pendingProps,ca),r===null?a=!1:(t.stateNode=r,oa=t,L=lm(r.firstChild),ca=!1,a=!0)),a||ua(t)),je(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=es(e,t,rs,null,null,n),sh._currentValue=a),Kc(e,t),Ic(e,t,r,n),t.child;case 6:return e===null&&R&&((e=n=L)&&(n=im(n,t.pendingProps,ca),n===null?e=!1:(t.stateNode=n,oa=t,L=null,e=!0)),e||ua(t)),null;case 13:return el(e,t,n);case 4:return ke(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=mo(t,null,r,n):Ic(e,t,r,n),t.child;case 11:return Lc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Kc(e,t),Ic(e,t,r,n),t.child;case 8:return Ic(e,t,t.pendingProps.children,n),t.child;case 12:return Ic(e,t,t.pendingProps.children,n),t.child;case 10:return ul(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Ea(t),a=Da(a),r=r(a),t.flags|=1,Ic(e,t,r,n),t.child;case 14:return Rc(e,t,t.type,t.pendingProps,n);case 15:return zc(e,t,t.type,t.pendingProps,n);case 19:return ll(e,t,n);case 31:return Gc(e,t,n);case 22:return Bc(e,t,n,t.pendingProps);case 24:return Ea(t),r=Da(Na),e===null?(a=Ja(),a===null&&(a=K,o=Pa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},_o(t),ba(t,Na,a)):((e.lanes&n)!==0&&(vo(e,t),To(t,null,null,n),wo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ba(t,Na,r),r!==a.cache&&Ca(t,[Na],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ba(t,Na,r))),Ic(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:R&&ra(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Kc(e,t),Ic(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function hl(e){e.flags|=4}function gl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw io=eo,Qa}}else e.flags&=-16777217}function _l(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw io=eo,Qa}}function vl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:mt(),e.lanes|=t,dd|=t)}function yl(e,t){if(!R)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function H(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function bl(e,t,n){var r=t.pendingProps;switch(ia(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return H(t),null;case 1:return H(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),xa(Na),Ae(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(pa(t)?hl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ha())),H(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(hl(t),o===null?(H(t),gl(t,a,null,r,n)):(H(t),_l(t,o))):o?o===e.memoizedState?(H(t),t.flags&=-16777217):(hl(t),H(t),_l(t,o)):(e=e.memoizedProps,e!==r&&hl(t),H(t),gl(t,a,e,r,n)),null;case 27:if(Me(t),n=De.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&hl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return H(t),t.subtreeFlags&=-33554433,null}e=Te.current,pa(t)?da(t,e):(e=hm(a,r,n),t.stateNode=e,hl(t))}return H(t),t.subtreeFlags&=-33554433,null;case 5:if(Me(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&hl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return H(t),t.subtreeFlags&=-33554433,null}if(o=Te.current,pa(t))da(t,o);else{var s=lp(De.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Et]=t,o[Dt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&hl(t)}}return H(t),t.subtreeFlags&=-33554433,gl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&hl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=De.current,pa(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=oa,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Et]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||ua(t,!0)}else e=lp(e).createTextNode(r),e[Et]=t,t.stateNode=e}return H(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=pa(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Et]=t}else ma(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;H(t),e=!1}else n=ha(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(zo(t),t):(zo(t),null);if(t.flags&128)throw Error(i(558))}return H(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=pa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Et]=t}else ma(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;H(t),a=!1}else a=ha(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(zo(t),t):(zo(t),null)}return zo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),vl(t,t.updateQueue),H(t),null);case 4:return Ae(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,H(t),null;case 10:return xa(t.type),H(t),null;case 19:if(Ho(t),r=t.memoizedState,r===null)return H(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)yl(r,!1);else{if(od!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Uo(e),o!==null){for(t.flags|=128,yl(r,!1),e=o.updateQueue,t.updateQueue=e,vl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ri(n,e),n=n.sibling;return Vo(t,Bo.current&1|2),R&&ta(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ge()>_d&&(t.flags|=128,a=!0,yl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Uo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,vl(t,e),yl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!R)return H(t),null}else 2*Ge()-r.renderingStartTime>_d&&n!==536870912&&(t.flags|=128,a=!0,yl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ge(),e.sibling=null,o=Bo.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||R?Vo(t,o):(n=o,N(No,t),N(Bo,n),Po===null&&(Po=t)),R&&ta(t,r.treeForkCount),e}return H(t),null;case 22:case 23:return zo(t),Mo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(H(t),t.subtreeFlags&6&&(t.flags|=8192)):H(t),n=t.updateQueue,n!==null&&vl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&we(qa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),xa(Na),H(t),null;case 25:return null;case 30:return t.flags|=33554432,H(t),null}throw Error(i(156,t.tag))}function xl(e,t){switch(ia(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xa(Na),Ae(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Me(t),null;case 31:if(t.memoizedState!==null){if(zo(t),t.alternate===null)throw Error(i(340));ma()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(zo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ma()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ho(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ae(),null;case 10:return xa(t.type),null;case 22:case 23:return zo(t),Mo(),e!==null&&we(qa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return xa(Na),null;case 25:return null;default:return null}}function Sl(e,t){switch(ia(t),t.tag){case 3:xa(Na),Ae();break;case 26:case 27:case 5:Me(t);break;case 4:Ae();break;case 31:t.memoizedState!==null&&zo(t);break;case 13:zo(t);break;case 19:Ho(t);break;case 10:xa(t.type);break;case 22:case 23:zo(t),Mo(),e!==null&&we(qa);break;case 24:xa(Na)}}function Cl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function wl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Tl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Do(t,n)}catch(t){Z(e,e.return,t)}}}function El(e,t,n){n.props=wc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Dl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=bi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Ol(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function kl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function Al(e){for(var t=e.return;t!==null&&(Nl(t)&&em(e.stateNode,t.stateNode),!Ml(t));)t=t.return}function jl(e){for(var t=e.return;t!==null&&(Nl(t)&&tm(e.stateNode,t.stateNode),!Ml(t));)t=t.return}function Ml(e){return e.tag===5||e.tag===3||e.tag===27}function Nl(e){return e&&e.tag===7&&e.stateNode!==null}function Pl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Fl(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Dt]=t}catch(t){Z(e,e.return,t)}}function Il(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Ll(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Il(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Rl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Sn)),kl(e,r),F=!0;else if(i!==4&&(i===27&&(kl(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Rl(e,t,n,r),e=e.sibling;e!==null;)Rl(e,t,n,r),e=e.sibling}function zl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),kl(e,r),F=!0;else if(i!==4&&(i===27&&(kl(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(zl(e,t,n,r),e=e.sibling;e!==null;)zl(e,t,n,r),e=e.sibling}function Bl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[Et]=e,t[Dt]=n}catch(t){Z(e,e.return,t)}}var Vl=!1,Hl=null;function Ul(e){(e.tag===30||e.subtreeFlags&33554432)&&(Vl=!0)}var Wl=null;function Gl(){var e=Wl;return Wl=null,e}var Kl=0;function ql(e,t,n,r,i){return Kl=0,Jl(e.child,t,n,r,i)}function Jl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Vl=!0,Tp(o,Kl===0?t:t+`_`+Kl,n),Kl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Jl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Yl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Yl(e.child,t),e=e.sibling}function Xl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Xl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=Si(t.default,t.share),t!==`none`&&(ql(e,n,t,null,!1)||Yl(e.child,!1))}e=e.sibling}}function Zl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=bi(r,n),a=Si(r.default,n.paired?r.share:r.enter);a===`none`?Xl(e):ql(e,i,a,null,!1)?(Xl(e),n.paired||t||Nd(e,r.onEnter)):Yl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Zl(e,t),e=e.sibling;else Xl(e)}function Ql(e){if(Hl!==null&&Hl.size!==0){var t=Hl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=Si(n.default,n.share);if(a!==`none`&&(ql(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Yl(e.child,!1)),t.delete(r),t.size===0)break}}}Ql(e)}e=e.sibling}}}function $l(e){if(e.tag===30){var t=e.memoizedProps,n=bi(t,e.stateNode),r=Hl===null?void 0:Hl.get(n),i=Si(t.default,r===void 0?t.exit:t.share);i!==`none`&&(ql(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Hl.delete(n),Nd(e,t.onShare)):Yl(e.child,!1)),Hl!==null&&Ql(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)$l(e),e=e.sibling;else Hl!==null&&Ql(e)}function eu(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=bi(t,e.stateNode);t=Si(t.default,t.update),e.flags&=-5,t!==`none`&&ql(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&eu(e);e=e.sibling}}function tu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Yl(e.child,!1))}tu(e)}e=e.sibling}}function nu(e){if(e.tag===30)e.stateNode.paired=null,Yl(e.child,!1),tu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)nu(e),e=e.sibling;else tu(e)}function ru(e){for(e=e.child;e!==null;)e.tag===30?Yl(e.child,!1):e.subtreeFlags&33554432&&ru(e),e=e.sibling}function iu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Kl<a.length){var l=a[Kl],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,Kl===0?n:n+`_`+Kl,i),s&&e.flags&4||(Wl===null&&(Wl=[]),Wl.push(c,Kl===0?r:r+`_`+Kl,t.memoizedProps)),Kl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:iu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function au(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=bi(n,r),a=Si(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Kl=0,i=iu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&au(e,t);e=e.sibling}}var ou=!1,U=!1,su=!1,cu=!1,lu=typeof WeakSet==`function`?WeakSet:Set,uu=null,du=!1,fu=!1,pu=!1,mu=!1;function hu(e,t,n){if(e=e.containerInfo,sp=gh,e=Xr(e),Zr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,uu=t,t=n?9270:1024;uu!==null;){if(e=uu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&$l(r[a]);if(e.alternate===null&&e.flags&2)n&&Ul(e),gu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&$l(r),gu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Ul(e),gu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,uu=r):(n&&eu(e),gu(n))}}Hl=null}function gu(e){for(;uu!==null;){var t=uu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=wc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=bi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=Si(a.default,a.update),a!==`none`&&ql(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,uu=r;break}uu=t.return}}function _u(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Iu(e,n),r&4&&Cl(5,n);break;case 1:if(Iu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=wc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&Tl(n),r&512&&Dl(n,n.return);break;case 3:if(Iu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Do(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Bl(n);case 26:case 5:Iu(e,n),t===null&&r&4&&Pl(n),r&512&&Dl(n,n.return);break;case 12:Iu(e,n);break;case 31:Iu(e,n),r&4&&Tu(e,n);break;case 13:Iu(e,n),r&4&&Eu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||ou,!r){var a=t!==null&&t.memoizedState!==null||U;t=ou,i=U,ou=r,(U=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Ru(e,n,r)):Iu(e,n),ou=t,U=i}break;case 30:Iu(e,n),r&512&&Dl(n,n.return);break;case 7:r&512&&Dl(n,n.return);default:Iu(e,n)}}function vu(e,t){for(e=e.child;e!==null;)yu(e,t),e=e.sibling}function yu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}bu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,F=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&vu(e,t);break;default:vu(e,t)}}function bu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:yu(n,r);break a;case 22:n.memoizedState===null&&bu(n,r);break a;default:bu(n,r)}}e=e.sibling}}function xu(e){var t=e.alternate;t!==null&&(e.alternate=null,xu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Ft(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var W=null,Su=!1;function Cu(e,t,n){for(n=n.child;n!==null;)wu(e,t,n),n=n.sibling}function wu(e,t,n){if(et&&typeof et.onCommitFiberUnmount==`function`)try{et.onCommitFiberUnmount($e,n)}catch{}switch(n.tag){case 26:U||Ol(n,t),Cu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!U&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:U||Ol(n,t),jl(n);var r=W,i=Su;Sp(n.type)&&(W=n.stateNode,Su=!1),Cu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),W=r,Su=i;break;case 5:U||Ol(n,t),jl(n);case 6:if(n.tag===6&&jl(n),r=W,i=Su,W=null,Cu(e,t,n),W=r,Su=i,W!==null){if(Su)try{(W.nodeType===9?W.body:W.nodeName===`HTML`?W.ownerDocument.body:W).removeChild(n.stateNode),F=!0}catch(e){Z(n,t,e)}else try{W.removeChild(n.stateNode),F=!0}catch(e){Z(n,t,e)}}break;case 18:W!==null&&(Su?(e=W,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(W,n.stateNode));break;case 4:r=W,i=Su,W=n.stateNode.containerInfo,Su=!0,Cu(e,t,n),W=r,Su=i;break;case 0:case 11:case 14:case 15:wl(2,n,t),U||wl(4,n,t),Cu(e,t,n);break;case 1:U||(Ol(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&El(n,t,r)),Cu(e,t,n);break;case 21:Cu(e,t,n);break;case 22:U=(r=U)||n.memoizedState!==null,Cu(e,t,n),U=r;break;case 30:Ol(n,t),Cu(e,t,n);break;case 7:U||Ol(n,t),Cu(e,t,n);break;default:Cu(e,t,n)}}function Tu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Eu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Du(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new lu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new lu),t;default:throw Error(i(435,e.tag))}}function Ou(e,t){var n=Du(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function ku(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){W=l.stateNode,Su=!1;break a}break;case 5:W=l.stateNode,Su=!1;break a;case 3:case 4:W=l.stateNode.containerInfo,Su=!0;break a}l=l.return}if(W===null)throw Error(i(160));wu(s,c,o),W=null,Su=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ju(t,e,n),t=t.sibling}var Au=null;function ju(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}ku(t,e,n),Mu(e),a&4&&(wl(3,e,e.return),Cl(3,e),wl(5,e,e.return));break;case 1:ku(t,e,n),Mu(e),a&512&&(U||r===null||Ol(r,r.return)),a&64&&ou&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Au,ku(t,e,n),Mu(e),a&512&&(U||r===null||Ol(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(ou)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Nt]||r[Et]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[Et]=e,Bt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[Et]=e,Bt(r),t=r}e.stateNode=t}}else ou||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Fl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||U||t.parentNode.removeChild(t)):a.count--,n===null?ou||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:ku(t,e,n),Mu(e),a&512&&(U||r===null||Ol(r,r.return)),r!==null&&a&4&&Fl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=su,su=!1,ku(t,e,n),su=o,Mu(e),a&512&&(U||r===null||Ol(r,r.return)),e.flags&32){t=e.stateNode;try{mn(t,``),F=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Fl(e,t,r===null?t:r.memoizedProps)),a&1024&&(cu=!0);break;case 6:if(ku(t,e,n),Mu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,F=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(F=!1,Wm=null,o=Au,Au=bm(t.containerInfo),ku(t,e,n),Au=o,Mu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}cu&&(cu=!1,Nu(e)),F=!1;break;case 4:a=su,su=ou,r=Xt(),o=Au,Au=bm(e.stateNode.containerInfo),ku(t,e,n),Mu(e),Au=o,F&&fu&&(pu=!0),F=r,su=a;break;case 12:ku(t,e,n),Mu(e);break;case 31:ku(t,e,n),Mu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 13:ku(t,e,n),Mu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hd=Ge()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=ou,l=U,u=su;ou=c||o,su=u||o,U=l||s,ku(t,e,n),U=l,su=u,ou=c,Mu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||ou||U||(t=s||U,n=ou,r=U,ou=o||ou,U=t,Lu(e,2),ou=n,U=r),!o&&su||vu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Ou(e,n))));break;case 19:ku(t,e,n),Mu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ou(e,t)));break;case 30:a&512&&(U||r===null||Ol(r,r.return)),a=Xt(),o=fu,s=(n&335544064)===n,c=e.memoizedProps,fu=s&&Si(c.default,c.update)!==`none`,ku(t,e,n),Mu(e),s&&r!==null&&F&&(e.flags|=4),fu=o,F=a;break;case 21:break;case 7:a&512&&(U||r===null||Ol(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:ku(t,e,n),Mu(e)}}function Mu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Il(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Nl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Ml(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;zl(e,Ll(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(mn(l,``),n.flags&=-33),zl(e,Ll(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Rl(e,Ll(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Nu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Nu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Pu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Fu(t,e),t=t.sibling;else au(t,!1)}function Fu(e,t){var n=e.alternate;if(n===null)Zl(e,!1);else switch(e.tag){case 3:if(mu=du=!1,Gl(),Pu(t,e),!du&&!pu){if(e=Wl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),mu=!0}Wl=null;break;case 5:Pu(t,e);break;case 4:r=du,du=!1,Pu(t,e),du&&(pu=!0),du=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Pu(t,e):Zl(e,!1));break;case 30:r=du,i=Gl(),du=!1,Pu(t,e),du&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=bi(a,o),o=bi(n.memoizedProps,o);var s=Si(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Kl=0,t=iu(e,n,t,o,s,a,!0),Kl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Wl=i):i!==null&&(i.push.apply(i,Wl),Wl=i),du=e.flags&32?!0:r;break;default:Pu(t,e)}}function Iu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)_u(e,t.alternate,t),t=t.sibling}function Lu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:wl(4,n,n.return),Lu(n,r);break;case 1:Ol(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&El(n,n.return,i),Lu(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:Ol(n,n.return),n.tag!==5&&n.tag!==27||jl(n),Lu(n,r);break;case 6:jl(n);break;case 26:Ol(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||U||i.parentNode.removeChild(i),Lu(n,r);break;case 22:n.memoizedState===null&&Lu(n,r);break;case 30:Ol(n,n.return),Lu(n,r);break;case 7:Ol(n,n.return);default:Lu(n,r)}e=e.sibling}}function Ru(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Ru(i,a,n),Cl(4,a);break;case 1:if(Ru(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)Eo(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&Tl(a),Dl(a,a.return);break;case 27:n&2&&Bl(a);case 5:a.tag!==5&&a.tag!==27||Al(a),Ru(i,a,n),s&&r===null&&o&4&&Pl(a),Dl(a,a.return);break;case 6:Al(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||ou||Km(bm(c.ownerDocument),a.type,c),Ru(i,a,n),s&&r===null&&o&4&&Pl(a),Dl(a,a.return);break;case 12:Ru(i,a,n);break;case 31:Ru(i,a,n),s&&o&4&&Tu(i,a);break;case 13:Ru(i,a,n),s&&o&4&&Eu(i,a);break;case 22:a.memoizedState===null&&Ru(i,a,n),Dl(a,a.return);break;case 30:Ru(i,a,n),Dl(a,a.return);break;case 7:Dl(a,a.return);default:Ru(i,a,n)}t=t.sibling}}function zu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Fa(n))}function Bu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Fa(e))}function Vu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Hu(e,t,n,r),t=t.sibling;else i&&ru(t)}function Hu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&nu(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Vu(e,t,n,r),a&2048&&Cl(9,t);break;case 1:Vu(e,t,n,r);break;case 3:Vu(e,t,n,r),i&&mu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Fa(a)));break;case 12:if(a&2048){Vu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Vu(e,t,n,r);break;case 31:Vu(e,t,n,r);break;case 13:Vu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&nu(t),o._visibility&2?Vu(e,t,n,r):(o._visibility|=2,Uu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&nu(s),o._visibility&2?Vu(e,t,n,r):Wu(e,t)),a&2048&&zu(s,t);break;case 24:Vu(e,t,n,r),a&2048&&Bu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Yl(a.child,!0),Yl(t.child,!0))),Vu(e,t,n,r);break;default:Vu(e,t,n,r)}}function Uu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Uu(a,o,s,c,i),Cl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Uu(a,o,s,c,i)):u._visibility&2?Uu(a,o,s,c,i):Wu(a,o),i&&l&2048&&zu(o.alternate,o);break;case 24:Uu(a,o,s,c,i),i&&l&2048&&Bu(o.alternate,o);break;default:Uu(a,o,s,c,i)}t=t.sibling}}function Wu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Wu(n,r),i&2048&&zu(r.alternate,r);break;case 24:Wu(n,r),i&2048&&Bu(r.alternate,r);break;default:Wu(n,r)}t=t.sibling}}var Gu=8192;function Ku(e,t,n){if(e.subtreeFlags&Gu)for(e=e.child;e!==null;)qu(e,t,n),e=e.sibling}function qu(e,t,n){switch(e.tag){case 26:Ku(e,t,n),e.flags&Gu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,Au,e.memoizedState,e.memoizedProps));break;case 5:Ku(e,t,n),e.flags&Gu&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=Au;Au=bm(e.stateNode.containerInfo),Ku(e,t,n),Au=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Gu,Gu=16777216,Ku(e,t,n),Gu=r):Ku(e,t,n));break;case 30:if((e.flags&Gu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Hl===null&&(Hl=new Map),Hl.set(r,i)}Ku(e,t,n);break;default:Ku(e,t,n)}}function Ju(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Yu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];uu=r,Qu(r,e)}Ju(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Xu(e),e=e.sibling}function Xu(e){switch(e.tag){case 0:case 11:case 15:Yu(e),e.flags&2048&&wl(9,e,e.return);break;case 3:Yu(e);break;case 12:Yu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Zu(e)):Yu(e);break;default:Yu(e)}}function Zu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];uu=r,Qu(r,e)}Ju(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:wl(8,t,t.return),Zu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Zu(t));break;default:Zu(t)}e=e.sibling}}function Qu(e,t){for(;uu!==null;){var n=uu;switch(n.tag){case 0:case 11:case 15:wl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Fa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,uu=r;else a:for(n=e;uu!==null;){r=uu;var i=r.sibling,a=r.return;if(xu(r),r===n){uu=null;break a}if(i!==null){i.return=a,uu=i;break a}uu=a}}}var $u={getCacheForType:function(e){var t=Da(Na),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Da(Na).controller.signal}},ed=typeof WeakMap==`function`?WeakMap:Map,G=0,K=null,q=null,J=0,Y=0,td=null,nd=!1,rd=!1,id=!1,ad=0,od=0,sd=0,cd=0,ld=0,ud=0,dd=0,fd=null,pd=null,md=!1,hd=0,gd=0,_d=1/0,vd=null,yd=null,X=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return G&2&&J!==0?J&-J:j.T===null?Ct():Pf()}function Md(){if(ud===0){if(!(J&536870912)||R){var e=st;st<<=1,!(st&3932160)&&(st=262144),ud=e}else ud=536870912}return e=No.current,e!==null&&(e.flags|=32),ud}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(bi(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===K&&(Y===2||Y===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,J,ud,!1)),gt(e,n),G&2&&e===K||(e===K&&(!(G&2)&&(cd|=n),od===4&&Rd(e,J,ud,!1)),Ef(e))}function Fd(e,t,n){if(G&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||dt(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){rd&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=fd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(id&&!l){c.errorRecoveryDisabledLanes|=o,cd|=o,a=4;break a}o=pd,pd=a,o!==null&&(pd===null?pd=o:pd.push.apply(pd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ud,!nd);break a;case 2:pd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=hd+300-Ge(),10<a)){if(Rd(r,t,ud,!nd),ut(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,pd,vd,md,t,ud,cd,dd,nd,o,`Throttled`,-0,0),a);break a}Id(r,n,pd,vd,md,t,ud,cd,dd,nd,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Sn},Hl=null,qu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?hd-Ge():(a&4194048)===a?gd-Ge():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Wr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=ft(e,t),t&=~ld,t&=~cd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-nt(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&vt(e,n,t)}function zd(){return G&6?!0:(Df(0,!1),!1)}function Bd(){if(q!==null){if(Y===0)var e=q.return;else e=q,ya=va=null,os(e),so=null,co=0,e=q;for(;e!==null;)Sl(e.alternate,e),e=e.return;q=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),K=e,q=n=Li(e.current,null),J=t,Y=0,td=null,nd=!1,rd=dt(e,t),id=!1,dd=ud=ld=cd=sd=od=0,pd=fd=null,md=!1,ad=ft(e,t),Di(),n}function Hd(e,t){z=null,j.H=gc,t===Za||t===$a?(t=ao(),Y=3):t===Qa?(t=ao(),Y=4):Y=t===Pc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,td=t,q===null&&(od=1,Oc(e,Gi(t,e.current)))}function Ud(){var e=No.current;return e===null?!0:(J&4194048)===J?Po===null:(J&62914560)===J||J&536870912?e===Po:!1}function Wd(){var e=j.H;return j.H=gc,e===null?gc:e}function Gd(){var e=j.A;return j.A=$u,e}function Kd(){od=4,nd||(J&4194048)!==J&&No.current!==null||(rd=!0),!(sd&134217727)&&!(cd&134217727)||K===null||Rd(K,J,ud,!1)}function qd(e,t,n){var r=G;G|=2;var i=Wd(),a=Gd();(K!==e||J!==t)&&(vd=null,Vd(e,t)),t=!1;var o=od;a:do try{if(Y!==0&&q!==null){var s=q,c=td;switch(Y){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:No.current===null&&(t=!0);var l=Y;if(Y=0,td=null,$d(e,s,c,l),n&&rd){o=0;break a}break;default:l=Y,Y=0,td=null,$d(e,s,c,l)}}Jd(),o=od;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,ya=va=null,G=r,j.H=i,j.A=a,q===null&&(K=null,J=0,Di()),o}function Jd(){for(;q!==null;)Zd(q)}function Yd(e,t){var n=G;G|=2;var r=Wd(),a=Gd();K!==e||J!==t?(vd=null,_d=Ge()+500,Vd(e,t)):rd=dt(e,t);a:do try{if(Y!==0&&q!==null){t=q;var o=td;b:switch(Y){case 1:Y=0,td=null,$d(e,t,o,1);break;case 2:case 9:if(to(o)){Y=0,td=null,Qd(t);break}t=function(){Y!==2&&Y!==9||K!==e||(Y=7),Ef(e)},o.then(t,t);break a;case 3:Y=7;break a;case 4:Y=5;break a;case 7:to(o)?(Y=0,td=null,Qd(t)):(Y=0,td=null,$d(e,t,o,7));break;case 5:var s=null;switch(q.tag){case 26:s=q.memoizedState;case 5:case 27:var c=q;if(s?Ym(s):c.stateNode.complete){Y=0,td=null;var l=c.sibling;if(l!==null)q=l;else{var u=c.return;u===null?q=null:(q=u,ef(u))}break b}}Y=0,td=null,$d(e,t,o,5);break;case 6:Y=0,td=null,$d(e,t,o,6);break;case 8:Bd(),od=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return ya=va=null,j.H=r,j.A=a,G=n,q===null?(K=null,J=0,Di(),od):0}function Xd(){for(;q!==null&&!Ue();)Zd(q)}function Zd(e){var t=ml(e.alternate,e,ad);e.memoizedProps=e.pendingProps,t===null?ef(e):q=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Jc(n,t,t.pendingProps,t.type,void 0,J);break;case 11:t=Jc(n,t,t.pendingProps,t.type.render,t.ref,J);break;case 5:os(t);var r=t;r===oa&&(R?(fa(r),r.tag===5&&r.stateNode!=null&&(L=r.stateNode)):(fa(r),R=!0));default:Sl(n,t),t=q=Ri(t,ad),t=ml(n,t,ad)}e.memoizedProps=e.pendingProps,t===null?ef(e):q=t}function $d(e,t,n,r){ya=va=null,os(t),so=null,co=0;var i=t.return;try{if(Nc(e,i,t,n,J)){od=1,Oc(e,Gi(n,e.current)),q=null;return}}catch(t){if(i!==null)throw q=i,t;od=1,Oc(e,Gi(n,e.current)),q=null;return}t.flags&32768?(R||r===1?e=!0:rd||J&536870912?e=!1:(nd=e=!0,(r===2||r===9||r===3||r===6)&&(r=No.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,nd);return}e=t.return;var n=bl(t.alternate,t,ad);if(n!==null){q=n;return}if(t=t.sibling,t!==null){q=t;return}q=t=e}while(t!==null);od===0&&(od=5)}function tf(e,t){do{var n=xl(e.alternate,e);if(n!==null){n.flags&=32767,q=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){q=e;return}q=e=n}while(e!==null);od=6,q=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(X!==0);if(G&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===K&&(q=K=null,J=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=Ei,_t(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ra(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(Ye,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Vl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=j.T,j.T=null,i=M.p,M.p=2,a=G,G|=4;try{hu(e,t,n)}finally{G=a,M.p=i,j.T=r}}X=1,Vl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(X!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){X===3&&(X=0,Fu(xd,bd),X=4)}function sf(){if(X===1){X=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=j.T,j.T=null;var i=M.p;M.p=2;var a=G;G|=4;try{fu=pu=!1,ju(t,e,n),n=cp;var o=Xr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Yr(s.ownerDocument.documentElement,s)){if(c!==null&&Zr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Jr(s,h),v=Jr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{G=a,M.p=i,j.T=r}}e.current=t,X=2}}function cf(){if(X===2){X=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=j.T,j.T=null;var r=M.p;M.p=2;var i=G;G|=4;try{_u(e,t.alternate,t)}finally{G=i,M.p=r,j.T=n}}X=3}}function lf(){if(X===4||X===3){X=0;var e=Ed;Ed=null,We();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?X=5:(X=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(yd=null),St(r),n=n.stateNode,et&&typeof et.onCommitFiberRoot==`function`)try{et.onCommitFiberRoot($e,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=j.T,a=M.p,M.p=2,j.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{j.T=n,M.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Fa(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(X!==5)return!1;var e=bd,t=Cd;Cd=0;var n=St(Sd),r=j.T,a=M.p;try{M.p=32>n?32:n,j.T=null,n=wd,wd=null;var o=bd,s=Sd;if(X=0,xd=bd=null,Sd=0,G&6)throw Error(i(331));var c=G;if(G|=4,Xu(o.current),Hu(o,o.current,s,n),G=c,Df(0,!1),et&&typeof et.onPostCommitFiberRoot==`function`)try{et.onPostCommitFiberRoot($e,o)}catch{}return!0}finally{M.p=a,j.T=r,uf(e,t)}}function pf(e,t,n){t=Gi(n,t),t=Ac(e.stateNode,t,2),e=bo(e,t,2),e!==null&&(gt(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(yd===null||!yd.has(r))){e=Gi(n,e),n=jc(2),r=bo(t,n,2),r!==null&&(Mc(n,r,t,e),gt(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ed;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(id=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,K===e&&(J&n)===n&&(od===4||od===3&&(J&62914560)===J&&300>Ge()-hd?G&2?ld|=n:Vd(e,0):ld|=n,dd===J&&(dd=0)),Ef(e)}function gf(e,t){t===0&&(t=mt()),e=Ai(e,t),e!==null&&(gt(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return Ve(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-nt(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=J,a=ut(r,r===K?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||dt(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Ge(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}X!==0&&X!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-nt(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=pt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=K,n=J,n=ut(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Y===2||Y===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&He(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||dt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&He(r),St(n)){case 2:case 8:n=Je;break;case 32:n=Ye;break;case 268435456:n=P;break;default:n=Ye}return r=jf.bind(null,e),n=Ve(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&He(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(X!==0&&X!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=J;return r=ut(e,e===K?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Ge()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){G&6?Ve(qe,Of):kf()})}function Pf(){if(Tf===0){var e=Va;e===0&&(e=ot,ot<<=1,!(ot&261888)&&(ot=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:xn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Dt]||null).action),o=r.submitter;o&&(t=(t=o[Dt]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Un(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);nc(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),nc(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<_i.length;Lf++){var Rf=_i[Lf];vi(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}vi(li,`onAnimationEnd`),vi(ui,`onAnimationIteration`),vi(di,`onAnimationStart`),vi(`dblclick`,`onDoubleClick`),vi(`focusin`,`onFocus`),vi(`focusout`,`onBlur`),vi(fi,`onTransitionRun`),vi(pi,`onTransitionStart`),vi(mi,`onTransitionCancel`),vi(hi,`onTransitionEnd`),Gt(`onMouseEnter`,[`mouseout`,`mouseover`]),Gt(`onMouseLeave`,[`mouseout`,`mouseover`]),Gt(`onPointerEnter`,[`pointerout`,`pointerover`]),Gt(`onPointerLeave`,[`pointerout`,`pointerover`]),Wt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Wt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Wt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Wt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Wt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Wt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ci(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ci(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[kt];n===void 0&&(n=t[kt]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Ht.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!Mn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=It(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}kn(function(){var r=a,i=wn(n),s=[];a:{var c=gi.get(e);if(c!==void 0){var l=Un,u=e;switch(e){case`keypress`:if(Rn(n)===0)break a;case`keydown`:case`keyup`:l=or;break;case`focusin`:u=`focus`,l=Zn;break;case`focusout`:u=`blur`,l=Zn;break;case`beforeblur`:case`afterblur`:l=Zn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Yn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Xn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=lr;break;case li:case ui:case di:l=Qn;break;case hi:l=ur;break;case`scroll`:case`scrollend`:l=Gn;break;case`wheel`:l=dr;break;case`copy`:case`cut`:case`paste`:l=$n;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=sr;break;case`submit`:l=cr;break;case`toggle`:case`beforetoggle`:l=fr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=An(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==Cn&&(u=n.relatedTarget||n.fromElement)&&(It(u)||u[Ot]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?It(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Yn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=sr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Rt(c),h=l==null?u:Rt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,It(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Rt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Mr;else if(Er(c)){if(Nr)_=Hr;else{_=Br;var v=zr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&vn(r.elementType)&&(_=Mr):_=Vr;if(_&&=_(e,r)){Dr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Rt(r):window,e){case`focusin`:(Er(v)||v.contentEditable===`true`)&&($r=v,ei=r,ti=null);break;case`focusout`:ti=ei=$r=null;break;case`mousedown`:ni=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ni=!1,ri(s,n,i);break;case`selectionchange`:if(Qr)break;case`keydown`:case`keyup`:ri(s,n,i)}var y;if(mr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else Sr?br(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(_r&&n.locale!==`ko`&&(Sr||b!==`onCompositionStart`?b===`onCompositionEnd`&&Sr&&(y=Ln()):(Pn=i,Fn=`value`in Pn?Pn.value:Pn.textContent,Sr=!0)),v=Jf(r,b),0<v.length&&(b=new er(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=xr(n),y!==null&&(b.data=y)))),(y=gr?Cr(e,n):wr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new er(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=An(e,n),i!=null&&r.unshift(qf(e,i,a)),i=An(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=An(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=An(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||mn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&mn(e,``+r);else return;break;case`className`:Qt(e,`class`,r);break;case`tabIndex`:Qt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Qt(e,n,r);break;case`style`:_n(e,r,o);return;case`data`:if(t!==`object`){Qt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=xn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=xn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Sn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=xn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Zt(e,`popover`,r);break;case`xlinkActuate`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:$t(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:$t(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Zt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=yn.get(n)||n,Zt(e,n,r);else return}F=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:_n(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)mn(e,r);else if(typeof r==`number`||typeof r==`bigint`)mn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=Sn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Ut.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Dt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}F=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Zt(e,n,r)}return}F=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}ln(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&dn(e,!!r,n,!0):dn(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}pn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(vn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(F=!0),o=m;break;case`name`:m!==f&&(F=!0),a=m;break;case`checked`:m!==f&&(F=!0),u=m;break;case`defaultChecked`:m!==f&&(F=!0),d=m;break;case`value`:m!==f&&(F=!0),s=m;break;case`defaultValue`:m!==f&&(F=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}cn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(F=!0),p=o;break;case`defaultValue`:o!==l&&(F=!0),c=o;break;case`multiple`:o!==l&&(F=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?dn(e,!!n,n?[]:``,!1):dn(e,!!n,t,!0)):dn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(F=!0),p=a;break;case`defaultValue`:a!==o&&(F=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}fn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(F=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(vn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[Et]=r,n[Dt]=t,np(n,e,t),Bt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Nt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=It(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(h(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(h(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Ft(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Nt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===Sn&&(e.onclick=null),Ft(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ft(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=M.d;M.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=Lt(e);t!==null&&t.tag===5&&t.type===`form`?ic(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=sn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Bt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+sn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+sn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+sn(n.imageSizes)+`"]`)):i+=`[href="`+sn(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Pt]=!0,o.onload=o.onerror=function(){Vt(o)}),Bt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+sn(r)+`"][href="`+sn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Bt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=zt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Bt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=zt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=D({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Bt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=zt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Bt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=De.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=zt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=zt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=zt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+sn(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Pt]){r.loading=1;return}}else t=e.createElement(`link`),t[Pt]=!0,t.onload=t.onerror=Vt.bind(null,t),np(t,`link`,n),Bt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+sn(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+sn(n.href)+`"]`);if(r)return t.instance=r,Bt(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Bt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Bt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Bt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Bt(a),a):(r=n,(a=vm.get(o))&&(r=D({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Bt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Nt]||a[Et]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Bt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Bt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:ae,Provider:null,Consumer:null,_currentValue:be,_currentValue2:be,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ht(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ht(0),this.hiddenUpdates=ht(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Fi(3,null,null,t),e.current=a,a.stateNode=e,t=Pa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},_o(a),e}function uh(e){return e?(e=Ni,e):Ni}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=yo(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=bo(e,r,t),n!==null&&(Pd(n,e,t),xo(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Ai(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=xt(t);var n=Ai(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=2,yh(e,t,n,r)}finally{M.p=a,j.T=i}}function vh(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=8,yh(e,t,n,r)}finally{M.p=a,j.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Lt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=lt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-nt(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(G&6)&&(_d=Ge()+500,Df(0,!1))}}break;case 31:case 13:s=Ai(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=wn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=It(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ke()){case qe:return 2;case Je:return 8;case Ye:case Xe:return 32;case P:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Lt(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=It(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,wt(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,wt(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Cn=r,n.target.dispatchEvent(r),Cn=null}else return t=Lt(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Lt(n);a!==null&&(e.splice(t,3),t-=3,nc(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Dt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Dt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Ot]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ct();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));M.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:j,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{$e=Jh.inject(qh),et=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Tc,s=Ec,c=Dc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Ot]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=[{id:`two-sum`,number:1,title:`Two Sum`,difficulty:`Easy`,category:`Arrays & Hashing`,tags:[`Array`,`Hash Table`],entryFunction:`twoSum`,params:[{name:`nums`,type:`number[]`},{name:`target`,type:`number`}],returnType:`number[]`,compareMode:`unorderedArray`,description:"Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",examples:[{input:`nums = [2, 7, 11, 15], target = 9`,output:`[0, 1]`,explanation:`Because nums[0] + nums[1] == 9, we return [0, 1].`},{input:`nums = [3, 2, 4], target = 6`,output:`[1, 2]`},{input:`nums = [3, 3], target = 6`,output:`[0, 1]`}],constraints:[`2 <= nums.length <= 10^4`,`-10^9 <= nums[i] <= 10^9`,`-10^9 <= target <= 10^9`,`Only one valid answer exists.`],hints:["Instead of checking all pairs in O(n^2), ask: what number would complete `nums[i]` to reach `target`?","Store each visited number and its index inside a Hash Map (`seen[num] = i`) so you can look up `target - nums[i]` in O(1) time."],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`array`,highlightPointers:[`i`],description:"Watch `i` scan `nums` while `seen` Hash Map builds complement lookups."},starterCode:{python:`def twoSum(nums, target):
    # Write your solution here
    pass`,javascript:`function twoSum(nums, target) {
  // Write your solution here
  
}`,java:`class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,cpp:`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`,c:`int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your solution here
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`},optimalCode:{python:`def twoSum(nums, target):
    seen = {}
    for i in range(len(nums)):
        complement = target - nums[i]
        if complement in seen:
            return [seen[complement], i]
        seen[nums[i]] = i
    return []`,javascript:`function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,java:`class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,cpp:`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,c:`int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                int* res = (int*)malloc(2 * sizeof(int));
                res[0] = i;
                res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        var seen = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int complement = target - nums[i];
            if (seen.ContainsKey(complement)) {
                return new int[] { seen[complement], i };
            }
            seen[nums[i]] = i;
        }
        return new int[0];
    }
}`},testCases:[{id:`ts-1`,label:`Case 1`,args:[[2,7,11,15],9],expected:[0,1]},{id:`ts-2`,label:`Case 2`,args:[[3,2,4],6],expected:[1,2]},{id:`ts-3`,label:`Case 3`,args:[[3,3],6],expected:[0,1]},{id:`ts-4`,label:`Negatives`,args:[[-3,4,3,90],0],expected:[0,2],isHidden:!0},{id:`ts-5`,label:`Last Pair`,args:[[1,5,8,12,7],19],expected:[3,4],isHidden:!0},{id:`ts-6`,label:`Zeroes`,args:[[0,4,3,0],0],expected:[0,3],isHidden:!0}]},{id:`best-time-buy-sell-stock`,number:121,title:`Best Time to Buy and Sell Stock`,difficulty:`Easy`,category:`Sliding Window`,tags:[`Array`,`Dynamic Programming`,`Greedy`],entryFunction:`maxProfit`,params:[{name:`prices`,type:`number[]`}],returnType:`number`,compareMode:`exact`,description:"You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",examples:[{input:`prices = [7, 1, 5, 3, 6, 4]`,output:`5`,explanation:`Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.`},{input:`prices = [7, 6, 4, 3, 1]`,output:`0`,explanation:`No profitable transaction is possible, so max profit is 0.`}],constraints:[`1 <= prices.length <= 10^5`,`0 <= prices[i] <= 10^4`],hints:["Track two pointers: `left` (buy day) and `right` (sell day), or track the minimum price seen so far.","Whenever `prices[right] < prices[left]`, move `left = right` because a cheaper buy price was found!"],timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`bars`,highlightPointers:[`left`,`right`],description:"Buy pointer `left` jumps to new lows while `right` scans future sell days."},starterCode:{python:`def maxProfit(prices):
    # Write your solution here
    pass`,javascript:`function maxProfit(prices) {
  // Write your solution here
  
}`,java:`class Solution {
    public int maxProfit(int[] prices) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int maxProfit(vector<int>& prices) {
        return 0;
    }
};`,c:`int maxProfit(int* prices, int pricesSize) {
    return 0;
}`,csharp:`public class Solution {
    public int MaxProfit(int[] prices) {
        return 0;
    }
}`},optimalCode:{python:`def maxProfit(prices):
    left = 0
    best = 0
    for right in range(1, len(prices)):
        if prices[right] < prices[left]:
            left = right
        else:
            best = max(best, prices[right] - prices[left])
    return best`,javascript:`function maxProfit(prices) {
  let left = 0;
  let best = 0;
  for (let right = 1; right < prices.length; right++) {
    if (prices[right] < prices[left]) {
      left = right;
    } else {
      best = Math.max(best, prices[right] - prices[left]);
    }
  }
  return best;
}`,java:`class Solution {
    public int maxProfit(int[] prices) {
        int left = 0;
        int best = 0;
        for (int right = 1; right < prices.length; right++) {
            if (prices[right] < prices[left]) {
                left = right;
            } else {
                best = Math.max(best, prices[right] - prices[left]);
            }
        }
        return best;
    }
}`,cpp:`class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int left = 0;
        int best = 0;
        for (int right = 1; right < prices.size(); right++) {
            if (prices[right] < prices[left]) {
                left = right;
            } else {
                best = max(best, prices[right] - prices[left]);
            }
        }
        return best;
    }
};`,c:`int maxProfit(int* prices, int pricesSize) {
    int left = 0;
    int best = 0;
    for (int right = 1; right < pricesSize; right++) {
        if (prices[right] < prices[left]) {
            left = right;
        } else {
            int profit = prices[right] - prices[left];
            if (profit > best) best = profit;
        }
    }
    return best;
}`,csharp:`public class Solution {
    public int MaxProfit(int[] prices) {
        int left = 0;
        int best = 0;
        for (int right = 1; right < prices.Length; right++) {
            if (prices[right] < prices[left]) {
                left = right;
            } else {
                best = Math.Max(best, prices[right] - prices[left]);
            }
        }
        return best;
    }
}`},testCases:[{id:`stock-1`,label:`Case 1`,args:[[7,1,5,3,6,4]],expected:5},{id:`stock-2`,label:`Case 2`,args:[[7,6,4,3,1]],expected:0},{id:`stock-3`,label:`Case 3`,args:[[2,4,1,7]],expected:6},{id:`stock-4`,label:`Single Day`,args:[[5]],expected:0,isHidden:!0},{id:`stock-5`,label:`Flat`,args:[[3,3,3,3]],expected:0,isHidden:!0},{id:`stock-6`,label:`Late Spike`,args:[[5,4,3,2,10]],expected:8,isHidden:!0}]},{id:`product-except-self`,number:238,title:`Product of Array Except Self`,difficulty:`Medium`,category:`Arrays & Hashing`,tags:[`Array`,`Prefix Sum`],entryFunction:`productExceptSelf`,params:[{name:`nums`,type:`number[]`}],returnType:`number[]`,compareMode:`exact`,description:"Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in **O(n)** time and **without using the division operation**.",examples:[{input:`nums = [1, 2, 3, 4]`,output:`[24, 12, 8, 6]`},{input:`nums = [-1, 1, 0, -3, 3]`,output:`[0, 0, 9, 0, 0]`}],constraints:[`2 <= nums.length <= 10^5`,`-30 <= nums[i] <= 30`],hints:["Each position `i` needs `(product of elements to the left) * (product of elements to the right)`.","Pass 1 (left to right) stores running `prefix` in `answer[i]`. Pass 2 (right to left) multiplies by running `suffix`."],timeComplexity:`O(n)`,spaceComplexity:`O(1) extra`,visualHint:{primaryStructure:`array`,highlightPointers:[`i`],description:"Two sweeps across `nums` and `answer`: prefix product left->right, suffix right->left."},starterCode:{python:`def productExceptSelf(nums):
    # Write your solution here
    pass`,javascript:`function productExceptSelf(nums) {
  // Write your solution here
  
}`,java:`class Solution {
    public int[] productExceptSelf(int[] nums) {
        return new int[0];
    }
}`,cpp:`class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        return {};
    }
};`,c:`int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        return new int[0];
    }
}`},optimalCode:{python:`def productExceptSelf(nums):
    n = len(nums)
    answer = [1] * n
    prefix = 1
    for i in range(n):
        answer[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix
        suffix *= nums[i]
    return answer`,javascript:`function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }
  return answer;
}`,java:`class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }
        return answer;
    }
}`,cpp:`class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }
        return answer;
    }
};`,c:`int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    int* answer = (int*)malloc(numsSize * sizeof(int));
    *returnSize = numsSize;
    int prefix = 1;
    for (int i = 0; i < numsSize; i++) {
        answer[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = numsSize - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }
    return answer;
}`,csharp:`public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] answer = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }
        return answer;
    }
}`},testCases:[{id:`pes-1`,label:`Case 1`,args:[[1,2,3,4]],expected:[24,12,8,6]},{id:`pes-2`,label:`Case 2`,args:[[-1,1,0,-3,3]],expected:[0,0,9,0,0]},{id:`pes-3`,label:`Two Elements`,args:[[5,9]],expected:[9,5]},{id:`pes-4`,label:`Two Zeros`,args:[[0,2,0,4]],expected:[0,0,0,0],isHidden:!0},{id:`pes-5`,label:`All Negatives`,args:[[-2,-3,-4]],expected:[12,8,6],isHidden:!0}]},{id:`container-with-most-water`,number:11,title:`Container With Most Water`,difficulty:`Medium`,category:`Two Pointers`,tags:[`Array`,`Two Pointers`,`Greedy`],entryFunction:`maxArea`,params:[{name:`height`,type:`number[]`}],returnType:`number`,compareMode:`exact`,description:"You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",examples:[{input:`height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`,output:`49`,explanation:`Lines at index 1 (height 8) and index 8 (height 7) hold min(8, 7) * (8 - 1) = 49.`},{input:`height = [1, 1]`,output:`1`}],constraints:[`2 <= height.length <= 10^5`,`0 <= height[i] <= 10^4`],hints:["Start pointers at the widest possible container: `left = 0` and `right = n - 1`.","Always move the pointer pointing to the **shorter** wall inward — moving the taller wall can never increase `min(h[left], h[right])` while width shrinks."],timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`bars`,highlightPointers:[`left`,`right`],description:"Vertical elevation bars with `left` and `right` pointers closing inward."},starterCode:{python:`def maxArea(height):
    # Write your solution here
    pass`,javascript:`function maxArea(height) {
  // Write your solution here
  
}`,java:`class Solution {
    public int maxArea(int[] height) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int maxArea(vector<int>& height) {
        return 0;
    }
};`,c:`int maxArea(int* height, int heightSize) {
    return 0;
}`,csharp:`public class Solution {
    public int MaxArea(int[] height) {
        return 0;
    }
}`},optimalCode:{python:`def maxArea(height):
    left = 0
    right = len(height) - 1
    best = 0

    while left < right:
        width = right - left
        h = min(height[left], height[right])
        best = max(best, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best`,javascript:`function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    best = Math.max(best, width * h);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return best;
}`,java:`class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int best = 0;
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            best = Math.max(best, width * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }
}`,cpp:`class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int best = 0;
        while (left < right) {
            int width = right - left;
            int h = min(height[left], height[right]);
            best = max(best, width * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }
};`,c:`int maxArea(int* height, int heightSize) {
    int left = 0;
    int right = heightSize - 1;
    int best = 0;
    while (left < right) {
        int width = right - left;
        int h = height[left] < height[right] ? height[left] : height[right];
        int area = width * h;
        if (area > best) best = area;
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return best;
}`,csharp:`public class Solution {
    public int MaxArea(int[] height) {
        int left = 0;
        int right = height.Length - 1;
        int best = 0;
        while (left < right) {
            int width = right - left;
            int h = Math.Min(height[left], height[right]);
            best = Math.Max(best, width * h);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return best;
    }
}`},testCases:[{id:`cwmw-1`,label:`Case 1`,args:[[1,8,6,2,5,4,8,3,7]],expected:49},{id:`cwmw-2`,label:`Case 2`,args:[[1,1]],expected:1},{id:`cwmw-3`,label:`Center Peaks`,args:[[2,3,10,5,7,8,9]],expected:36},{id:`cwmw-4`,label:`Zeros`,args:[[0,2,0,4,0]],expected:4,isHidden:!0},{id:`cwmw-5`,label:`Monotonic`,args:[[1,2,3,4,5,6]],expected:9,isHidden:!0}]},{id:`trapping-rain-water`,number:42,title:`Trapping Rain Water`,difficulty:`Hard`,category:`Two Pointers`,tags:[`Array`,`Two Pointers`,`Stack`],entryFunction:`trap`,params:[{name:`height`,type:`number[]`}],returnType:`number`,compareMode:`exact`,description:"Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",examples:[{input:`height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`,output:`6`,explanation:`6 units of rain water are trapped between the elevation bars.`},{input:`height = [4, 2, 0, 3, 2, 5]`,output:`9`}],constraints:[`1 <= height.length <= 2 * 10^4`,`0 <= height[i] <= 10^5`],hints:["Water above bar `i` equals `min(maxLeft[i], maxRight[i]) - height[i]`.","With two pointers (`left`, `right`), whichever side has smaller `height` is guaranteed to be bounded by its own side max (`leftMax` or `rightMax`)!"],timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`bars`,highlightPointers:[`left`,`right`],description:"Elevation map bars with converging `left` / `right` pointers and running wall maxima."},starterCode:{python:`def trap(height):
    # Write your solution here
    pass`,javascript:`function trap(height) {
  // Write your solution here
  
}`,java:`class Solution {
    public int trap(int[] height) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int trap(vector<int>& height) {
        return 0;
    }
};`,c:`int trap(int* height, int heightSize) {
    return 0;
}`,csharp:`public class Solution {
    public int Trap(int[] height) {
        return 0;
    }
}`},optimalCode:{python:`def trap(height):
    left, right = 0, len(height) - 1
    leftMax, rightMax = 0, 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            leftMax = max(leftMax, height[left])
            water += leftMax - height[left]
            left += 1
        else:
            rightMax = max(rightMax, height[right])
            water += rightMax - height[right]
            right -= 1
    return water`,javascript:`function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,java:`class Solution {
    public int trap(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,cpp:`class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
};`,c:`int trap(int* height, int heightSize) {
    int left = 0;
    int right = heightSize - 1;
    int leftMax = 0;
    int rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] > leftMax) leftMax = height[left];
            water += leftMax - height[left];
            left++;
        } else {
            if (height[right] > rightMax) rightMax = height[right];
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,csharp:`public class Solution {
    public int Trap(int[] height) {
        int left = 0;
        int right = height.Length - 1;
        int leftMax = 0;
        int rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.Max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.Max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`},testCases:[{id:`trap-1`,label:`Case 1`,args:[[0,1,0,2,1,0,1,3,2,1,2,1]],expected:6},{id:`trap-2`,label:`Case 2`,args:[[4,2,0,3,2,5]],expected:9},{id:`trap-3`,label:`Single Bowl`,args:[[3,0,3]],expected:3},{id:`trap-4`,label:`Pyramid`,args:[[1,2,3,2,1]],expected:0,isHidden:!0},{id:`trap-5`,label:`Single Bar`,args:[[5]],expected:0,isHidden:!0}]},{id:`longest-substring-no-repeat`,number:3,title:`Longest Substring Without Repeating Characters`,scenario:`Kindle / CloudWatch Traffic Spike`,difficulty:`Medium`,category:`Sliding Window`,tags:[`String`,`Sliding Window`,`Hash Table`],entryFunction:`lengthOfLongestSubstring`,params:[{name:`s`,type:`string`}],returnType:`number`,compareMode:`exact`,description:"Given a string `s` (e.g. a CloudWatch stream of session IDs or log tokens), find the length of the **longest contiguous substring** without repeating characters.",examples:[{input:`s = "abcabcbb"`,output:`3`,explanation:`The answer is "abc", with the length of 3.`},{input:`s = "bbbbb"`,output:`1`},{input:`s = "pwwkew"`,output:`3`,explanation:`The answer is "wke", not "pwke" (subsequence).`}],constraints:[`0 <= s.length <= 5 * 10^4`,`s consists of English letters, digits, symbols and spaces.`],hints:["Maintain a sliding window `[left .. right]` whose characters are all unique.","Use a Set (or Map of last seen index) so when `s[right]` duplicates a char in the window, you shrink `left` until uniqueness is restored."],timeComplexity:`O(n)`,spaceComplexity:`O(min(n, charset))`,visualHint:{primaryStructure:`array`,highlightPointers:[`left`,`right`],description:"Character array with live `[left..right]` sliding window bracket and HashSet."},starterCode:{python:`def lengthOfLongestSubstring(s):
    # Write your solution here
    pass`,javascript:`function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}`,java:`class Solution {
    public int lengthOfLongestSubstring(String s) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        return 0;
    }
};`,c:`int lengthOfLongestSubstring(char* s) {
    return 0;
}`,csharp:`public class Solution {
    public int LengthOfLongestSubstring(string s) {
        return 0;
    }
}`},optimalCode:{python:`def lengthOfLongestSubstring(s):
    window_set = set()
    left = 0
    best = 0

    for right in range(len(s)):
        while s[right] in window_set:
            window_set.remove(s[left])
            left += 1
        window_set.add(s[right])
        best = max(best, right - left + 1)
    return best`,javascript:`function lengthOfLongestSubstring(s) {
  const windowSet = new Set();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    while (windowSet.has(s[right])) {
      windowSet.delete(s[left]);
      left++;
    }
    windowSet.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,java:`class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> windowSet = new HashSet<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            while (windowSet.contains(s.charAt(right))) {
                windowSet.remove(s.charAt(left));
                left++;
            }
            windowSet.add(s.charAt(right));
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,cpp:`class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> windowSet;
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.size(); right++) {
            while (windowSet.count(s[right])) {
                windowSet.erase(s[left]);
                left++;
            }
            windowSet.insert(s[right]);
            best = max(best, right - left + 1);
        }
        return best;
    }
};`,c:`int lengthOfLongestSubstring(char* s) {
    int n = strlen(s);
    int lastSeen[256];
    for (int k = 0; k < 256; k++) lastSeen[k] = -1;
    int left = 0;
    int best = 0;
    for (int right = 0; right < n; right++) {
        int code = (int)s[right];
        if (lastSeen[code] >= left) {
            left = lastSeen[code] + 1;
        }
        lastSeen[code] = right;
        int len = right - left + 1;
        if (len > best) best = len;
    }
    return best;
}`,csharp:`public class Solution {
    public int LengthOfLongestSubstring(string s) {
        var windowSet = new HashSet<char>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.Length; right++) {
            while (windowSet.Contains(s[right])) {
                windowSet.Remove(s[left]);
                left++;
            }
            windowSet.Add(s[right]);
            best = Math.Max(best, right - left + 1);
        }
        return best;
    }
}`},testCases:[{id:`lswrc-1`,label:`Case 1`,args:[`abcabcbb`],expected:3},{id:`lswrc-2`,label:`Case 2`,args:[`bbbbb`],expected:1},{id:`lswrc-3`,label:`Case 3`,args:[`pwwkew`],expected:3},{id:`lswrc-4`,label:`Empty`,args:[``],expected:0,isHidden:!0},{id:`lswrc-5`,label:`All Unique`,args:[`abcdef`],expected:6,isHidden:!0},{id:`lswrc-6`,label:`Bridge`,args:[`dvdf`],expected:3,isHidden:!0}]},{id:`binary-search`,number:704,title:`Binary Search`,difficulty:`Easy`,category:`Binary Search`,tags:[`Array`,`Binary Search`],entryFunction:`search`,params:[{name:`nums`,type:`number[]`},{name:`target`,type:`number`}],returnType:`number`,compareMode:`exact`,description:"Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with **O(log n)** runtime complexity.",examples:[{input:`nums = [-1, 0, 3, 5, 9, 12], target = 9`,output:`4`,explanation:`9 exists in nums and its index is 4.`},{input:`nums = [-1, 0, 3, 5, 9, 12], target = 2`,output:`-1`}],constraints:[`1 <= nums.length <= 10^4`,`All integers in nums are unique.`,`nums is sorted in ascending order.`],hints:["Use `left = 0`, `right = nums.length - 1`, and compute `mid = left + Math.floor((right - left) / 2)`.","Compare `nums[mid]` with `target` to discard half of the search range each step."],timeComplexity:`O(log n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`array`,highlightPointers:[`left`,`mid`,`right`],description:"Sorted search range `[left..right]` halving around `mid` on every iteration."},starterCode:{python:`def search(nums, target):
    # Write your solution here
    pass`,javascript:`function search(nums, target) {
  // Write your solution here
  
}`,java:`class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}`,cpp:`class Solution {
public:
    int search(vector<int>& nums, int target) {
        return -1;
    }
};`,c:`int search(int* nums, int numsSize, int target) {
    return -1;
}`,csharp:`public class Solution {
    public int Search(int[] nums, int target) {
        return -1;
    }
}`},optimalCode:{python:`def search(nums, target):
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,javascript:`function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,java:`class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,cpp:`class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
};`,c:`int search(int* nums, int numsSize, int target) {
    int left = 0;
    int right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,csharp:`public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0;
        int right = nums.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`},testCases:[{id:`bs-1`,label:`Case 1`,args:[[-1,0,3,5,9,12],9],expected:4},{id:`bs-2`,label:`Case 2`,args:[[-1,0,3,5,9,12],2],expected:-1},{id:`bs-3`,label:`First Elem`,args:[[1,3,5,7,9,11],1],expected:0},{id:`bs-4`,label:`Single Hit`,args:[[5],5],expected:0,isHidden:!0},{id:`bs-5`,label:`Single Miss`,args:[[5],-5],expected:-1,isHidden:!0}]},{id:`search-rotated-array`,number:33,title:`Search in Rotated Sorted Array`,difficulty:`Medium`,category:`Binary Search`,tags:[`Array`,`Binary Search`],entryFunction:`search`,params:[{name:`nums`,type:`number[]`},{name:`target`,type:`number`}],returnType:`number`,compareMode:`exact`,description:"There is an integer array `nums` sorted in ascending order (with **distinct** values), rotated at an unknown pivot index.\n\nGiven the rotated array `nums` and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with **O(log n)** runtime complexity.",examples:[{input:`nums = [4, 5, 6, 7, 0, 1, 2], target = 0`,output:`4`},{input:`nums = [4, 5, 6, 7, 0, 1, 2], target = 3`,output:`-1`},{input:`nums = [1], target = 0`,output:`-1`}],constraints:[`1 <= nums.length <= 5000`,`All values of nums are unique.`],hints:["At any `mid`, at least one half (`[left..mid]` or `[mid..right]`) is strictly sorted!","Check which half is sorted (`nums[left] <= nums[mid]`), then test whether `target` lies inside that sorted interval."],timeComplexity:`O(log n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`array`,highlightPointers:[`left`,`mid`,`right`],description:"Identify the sorted half `[left..mid]` or `[mid..right]` at each step."},starterCode:{python:`def search(nums, target):
    # Write your solution here
    pass`,javascript:`function search(nums, target) {
  // Write your solution here
  
}`,java:`class Solution {
    public int search(int[] nums, int target) {
        return -1;
    }
}`,cpp:`class Solution {
public:
    int search(vector<int>& nums, int target) {
        return -1;
    }
};`,c:`int search(int* nums, int numsSize, int target) {
    return -1;
}`,csharp:`public class Solution {
    public int Search(int[] nums, int target) {
        return -1;
    }
}`},optimalCode:{python:`def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,javascript:`function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}`,java:`class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,cpp:`class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
};`,c:`int search(int* nums, int numsSize, int target) {
    int left = 0;
    int right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}`,csharp:`public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0;
        int right = nums.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`},testCases:[{id:`rot-1`,label:`Case 1`,args:[[4,5,6,7,0,1,2],0],expected:4},{id:`rot-2`,label:`Case 2`,args:[[4,5,6,7,0,1,2],3],expected:-1},{id:`rot-3`,label:`Case 3`,args:[[1],0],expected:-1},{id:`rot-4`,label:`Two Elements`,args:[[3,1],1],expected:1,isHidden:!0},{id:`rot-5`,label:`Pivot Left`,args:[[5,1,2,3,4],5],expected:0,isHidden:!0}]},{id:`valid-parentheses`,number:20,title:`Valid Parentheses`,difficulty:`Easy`,category:`Stack & Queue`,tags:[`String`,`Stack`],entryFunction:`isValid`,params:[{name:`s`,type:`string`}],returnType:`boolean`,compareMode:`exact`,description:"Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",examples:[{input:`s = "()"`,output:`true`},{input:`s = "()[]{}"`,output:`true`},{input:`s = "([)]"`,output:`false`}],constraints:[`1 <= s.length <= 10^4`,`s consists of parentheses only: ()[]{}`],hints:[`Push opening brackets onto a Stack as you scan left to right.`,`When you see a closing bracket, check if the Stack is non-empty and its top matches the expected opener.`],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`stack`,highlightPointers:[`i`],description:"Watch characters push and pop on the LIFO Stack as `i` scans `s`."},starterCode:{python:`def isValid(s):
    # Write your solution here
    pass`,javascript:`function isValid(s) {
  // Write your solution here
  
}`,java:`class Solution {
    public boolean isValid(String s) {
        return false;
    }
}`,cpp:`class Solution {
public:
    bool isValid(string s) {
        return false;
    }
};`,c:`bool isValid(char* s) {
    return false;
}`,csharp:`public class Solution {
    public bool IsValid(string s) {
        return false;
    }
}`},optimalCode:{python:`def isValid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for i in range(len(s)):
        ch = s[i]
        if ch in ('(', '{', '['):
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return len(stack) == 0`,javascript:`function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}`,java:`class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (ch == ')' && top != '(') return false;
                if (ch == '}' && top != '{') return false;
                if (ch == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }
}`,cpp:`class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (int i = 0; i < s.size(); i++) {
            char ch = s[i];
            if (ch == '(' || ch == '{' || ch == '[') {
                st.push(ch);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                st.pop();
                if (ch == ')' && top != '(') return false;
                if (ch == '}' && top != '{') return false;
                if (ch == ']' && top != '[') return false;
            }
        }
        return st.empty();
    }
};`,c:`bool isValid(char* s) {
    int n = strlen(s);
    char* stack = (char*)malloc((n + 1) * sizeof(char));
    int top = -1;
    for (int i = 0; i < n; i++) {
        char ch = s[i];
        if (ch == '(' || ch == '{' || ch == '[') {
            stack[++top] = ch;
        } else {
            if (top < 0) return false;
            char open = stack[top--];
            if (ch == ')' && open != '(') return false;
            if (ch == '}' && open != '{') return false;
            if (ch == ']' && open != '[') return false;
        }
    }
    return top == -1;
}`,csharp:`public class Solution {
    public bool IsValid(string s) {
        var stack = new Stack<char>();
        for (int i = 0; i < s.Length; i++) {
            char ch = s[i];
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.Push(ch);
            } else {
                if (stack.Count == 0) return false;
                char top = stack.Pop();
                if (ch == ')' && top != '(') return false;
                if (ch == '}' && top != '{') return false;
                if (ch == ']' && top != '[') return false;
            }
        }
        return stack.Count == 0;
    }
}`},testCases:[{id:`vp-1`,label:`Case 1`,args:[`{[()]}`],expected:!0},{id:`vp-2`,label:`Case 2`,args:[`()[]{}`],expected:!0},{id:`vp-3`,label:`Case 3`,args:[`([)]`],expected:!1},{id:`vp-4`,label:`Unclosed`,args:[`(((`],expected:!1,isHidden:!0},{id:`vp-5`,label:`Only Closer`,args:[`]`],expected:!1,isHidden:!0}]},{id:`daily-temperatures`,number:739,title:`Daily Temperatures`,difficulty:`Medium`,category:`Stack & Queue`,tags:[`Array`,`Monotonic Stack`],entryFunction:`dailyTemperatures`,params:[{name:`temperatures`,type:`number[]`}],returnType:`number[]`,compareMode:`exact`,description:"Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature.\n\nIf there is no future day for which this is possible, keep `answer[i] == 0`.",examples:[{input:`temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`,output:`[1, 1, 4, 2, 1, 1, 0, 0]`},{input:`temperatures = [30, 40, 50, 60]`,output:`[1, 1, 1, 0]`}],constraints:[`1 <= temperatures.length <= 10^5`,`30 <= temperatures[i] <= 100`],hints:[`Maintain a **monotonic decreasing stack** storing indices of days still waiting for a warmer day.`,"When `temperatures[i] > temperatures[stack.top]`, pop `prevIdx` and record `answer[prevIdx] = i - prevIdx`!"],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`bars`,highlightPointers:[`i`],description:`Temperature bars + monotonic decreasing index stack popping whenever a warmer day arrives.`},starterCode:{python:`def dailyTemperatures(temperatures):
    # Write your solution here
    pass`,javascript:`function dailyTemperatures(temperatures) {
  // Write your solution here
  
}`,java:`class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        return new int[0];
    }
}`,cpp:`class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        return {};
    }
};`,c:`int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        return new int[0];
    }
}`},optimalCode:{python:`def dailyTemperatures(temperatures):
    answer = [0] * len(temperatures)
    stack = []

    for i in range(len(temperatures)):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev_idx = stack.pop()
            answer[prev_idx] = i - prev_idx
        stack.append(i)
    return answer`,javascript:`function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIdx = stack.pop();
      answer[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return answer;
}`,java:`class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIdx = stack.pop();
                answer[prevIdx] = i - prevIdx;
            }
            stack.push(i);
        }
        return answer;
    }
}`,cpp:`class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> answer(n, 0);
        stack<int> st;
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prevIdx = st.top();
                st.pop();
                answer[prevIdx] = i - prevIdx;
            }
            st.push(i);
        }
        return answer;
    }
};`,c:`int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    int* answer = (int*)calloc(temperaturesSize, sizeof(int));
    int* stack = (int*)malloc(temperaturesSize * sizeof(int));
    int top = -1;
    *returnSize = temperaturesSize;
    for (int i = 0; i < temperaturesSize; i++) {
        while (top >= 0 && temperatures[i] > temperatures[stack[top]]) {
            int prevIdx = stack[top--];
            answer[prevIdx] = i - prevIdx;
        }
        stack[++top] = i;
    }
    return answer;
}`,csharp:`public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        int n = temperatures.Length;
        int[] answer = new int[n];
        var stack = new Stack<int>();
        for (int i = 0; i < n; i++) {
            while (stack.Count > 0 && temperatures[i] > temperatures[stack.Peek()]) {
                int prevIdx = stack.Pop();
                answer[prevIdx] = i - prevIdx;
            }
            stack.Push(i);
        }
        return answer;
    }
}`},testCases:[{id:`dt-1`,label:`Case 1`,args:[[73,74,75,71,69,72,76,73]],expected:[1,1,4,2,1,1,0,0]},{id:`dt-2`,label:`Case 2`,args:[[30,40,50,60]],expected:[1,1,1,0]},{id:`dt-3`,label:`Falling`,args:[[80,70,60,50]],expected:[0,0,0,0]},{id:`dt-4`,label:`Equal Temps`,args:[[50,50,50,51]],expected:[3,2,1,0],isHidden:!0}]},{id:`reverse-linked-list`,number:206,title:`Reverse Linked List`,difficulty:`Easy`,category:`Linked List`,tags:[`Linked List`,`Pointers`],entryFunction:`reverseList`,params:[{name:`head`,type:`linkedList`}],returnType:`linkedList`,compareMode:`exact`,description:"Given the `head` of a singly linked list, reverse the list, and return the reversed list.\n\n*Note: `ListNode(val, next)` is pre-defined for you in the execution environment.*",examples:[{input:`head = [1, 2, 3, 4, 5]`,output:`[5, 4, 3, 2, 1]`},{input:`head = [1, 2]`,output:`[2, 1]`},{input:`head = []`,output:`[]`}],constraints:[`The number of nodes in the list is in range [0, 5000].`,`-5000 <= Node.val <= 5000`],hints:["Keep three pointers: `prev = null`, `curr = head`, and `nextTemp = curr.next`.","At each node, save `nextTemp`, reverse `curr.next = prev`, then advance `prev = curr` and `curr = nextTemp`."],timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`linkedList`,description:"Watch `prev`, `curr`, and `nextTemp` rewire node `next` arrows step-by-step!"},starterCode:{python:`# class ListNode:
#     def __init__(self, val=0, next=None): ...
def reverseList(head):
    # Write your solution here
    pass`,javascript:`// class ListNode { constructor(val, next) { this.val = val; this.next = next; } }
function reverseList(head) {
  // Write your solution here
  
}`,java:`class Solution {
    public ListNode reverseList(ListNode head) {
        return null;
    }
}`,cpp:`class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        return nullptr;
    }
};`,c:`struct ListNode* reverseList(struct ListNode* head) {
    return NULL;
}`,csharp:`public class Solution {
    public ListNode ReverseList(ListNode head) {
        return null;
    }
}`},optimalCode:{python:`def reverseList(head):
    prev = None
    curr = head

    while curr is not None:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,javascript:`function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,java:`class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,cpp:`class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,c:`struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    while (curr != NULL) {
        struct ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,csharp:`public class Solution {
    public ListNode ReverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`},testCases:[{id:`rll-1`,label:`Case 1`,args:[[1,2,3,4,5]],expected:[5,4,3,2,1]},{id:`rll-2`,label:`Case 2`,args:[[1,2]],expected:[2,1]},{id:`rll-3`,label:`Empty`,args:[[]],expected:[]},{id:`rll-4`,label:`Single Node`,args:[[42]],expected:[42],isHidden:!0}]}],b=[{id:`linked-list-cycle`,number:141,title:`Linked List Cycle`,difficulty:`Easy`,category:`Linked List`,tags:[`Linked List`,`Two Pointers`,`Floyd's Tortoise & Hare`],entryFunction:`hasCycle`,params:[{name:`head`,type:`linkedListCycle`}],returnType:`boolean`,compareMode:`exact`,description:"Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` denotes the index of the tail's `next` connection (`-1` if no cycle).",examples:[{input:`head = { "values": [3, 2, 0, -4], "pos": 1 }`,output:`true`,explanation:`Tail connects back to node index 1 (value 2).`},{input:`head = { "values": [1, 2], "pos": 0 }`,output:`true`},{input:`head = { "values": [1], "pos": -1 }`,output:`false`}],constraints:[`The number of nodes is in range [0, 10^4].`,`pos is -1 or a valid index in the linked list.`],hints:["Use Floyd's Tortoise & Hare: `slow` moves 1 step per iteration, `fast` moves 2 steps per iteration.","If there is a cycle, `fast` will lap `slow` inside the loop so `slow === fast`. If `fast` hits `null`, there is no cycle."],timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`linkedList`,description:"See the cycle back-edge and watch `slow` (1x) and `fast` (2x) collide!"},starterCode:{python:`def hasCycle(head):
    # Write your solution here
    pass`,javascript:`function hasCycle(head) {
  // Write your solution here
  
}`,java:`public class Solution {
    public boolean hasCycle(ListNode head) {
        return false;
    }
}`,cpp:`class Solution {
public:
    bool hasCycle(ListNode* head) {
        return false;
    }
};`,c:`bool hasCycle(struct ListNode* head) {
    return false;
}`,csharp:`public class Solution {
    public bool HasCycle(ListNode head) {
        return false;
    }
}`},optimalCode:{python:`def hasCycle(head):
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,javascript:`function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}`,java:`public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,cpp:`class Solution {
public:
    bool hasCycle(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`,c:`bool hasCycle(struct ListNode* head) {
    struct ListNode* slow = head;
    struct ListNode* fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,csharp:`public class Solution {
    public bool HasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`},testCases:[{id:`llc-1`,label:`Case 1 (Cycle)`,args:[{values:[3,2,0,-4],pos:1}],expected:!0},{id:`llc-2`,label:`Case 2 (2-Node Cycle)`,args:[{values:[1,2],pos:0}],expected:!0},{id:`llc-3`,label:`Case 3 (No Cycle)`,args:[{values:[1,2,3,4],pos:-1}],expected:!1},{id:`llc-4`,label:`Empty List`,args:[{values:[],pos:-1}],expected:!1,isHidden:!0},{id:`llc-5`,label:`Self Loop`,args:[{values:[7],pos:0}],expected:!0,isHidden:!0}]},{id:`merge-two-sorted-lists`,number:21,title:`Merge Two Sorted Lists`,difficulty:`Easy`,category:`Linked List`,tags:[`Linked List`,`Two Pointers`],entryFunction:`mergeTwoLists`,params:[{name:`list1`,type:`linkedList`},{name:`list2`,type:`linkedList`}],returnType:`linkedList`,compareMode:`exact`,description:"You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list by splicing together the nodes of the first two lists. Return the head of the merged linked list.",examples:[{input:`list1 = [1, 2, 4], list2 = [1, 3, 4]`,output:`[1, 1, 2, 3, 4, 4]`},{input:`list1 = [], list2 = [0]`,output:`[0]`}],constraints:[`0 <= list length <= 50`,`Both list1 and list2 are sorted in non-decreasing order.`],hints:["Create a `dummy = new ListNode(0)` sentinel node and a `tail = dummy` pointer.","Compare `list1.val` and `list2.val`, attach the smaller node to `tail.next`, and advance both `tail` and the chosen list pointer."],timeComplexity:`O(n + m)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`linkedList`,description:"Watch `dummy` and `tail` weave `list1` and `list2` together into one sorted chain."},starterCode:{python:`def mergeTwoLists(list1, list2):
    # Write your solution here
    pass`,javascript:`function mergeTwoLists(list1, list2) {
  // Write your solution here
  
}`,java:`class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        return null;
    }
}`,cpp:`class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        return nullptr;
    }
};`,c:`struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    return NULL;
}`,csharp:`public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        return null;
    }
}`},optimalCode:{python:`def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    tail = dummy

    while list1 is not None and list2 is not None:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    tail.next = list1 if list1 is not None else list2
    return dummy.next`,javascript:`function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 !== null ? list1 : list2;
  return dummy.next;
}`,java:`class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,cpp:`class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* dummy = new ListNode(0);
        ListNode* tail = dummy;
        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 != nullptr ? list1 : list2;
        return dummy->next;
    }
};`,c:`struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    if (list1 == NULL) return list2;
    if (list2 == NULL) return list1;
    if (list1->val <= list2->val) {
        list1->next = mergeTwoLists(list1->next, list2);
        return list1;
    } else {
        list2->next = mergeTwoLists(list1, list2->next);
        return list2;
    }
}`,csharp:`public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`},testCases:[{id:`mtl-1`,label:`Case 1`,args:[[1,2,4],[1,3,4]],expected:[1,1,2,3,4,4]},{id:`mtl-2`,label:`Case 2`,args:[[],[0]],expected:[0]},{id:`mtl-3`,label:`Both Empty`,args:[[],[]],expected:[]},{id:`mtl-4`,label:`Disjoint`,args:[[1,2,3],[10,20]],expected:[1,2,3,10,20],isHidden:!0}]},{id:`invert-binary-tree`,number:226,title:`Invert Binary Tree`,difficulty:`Easy`,category:`Trees`,tags:[`Tree`,`DFS`,`Recursion`],entryFunction:`invertTree`,params:[{name:`root`,type:`binaryTree`}],returnType:`binaryTree`,compareMode:`exact`,description:"Given the `root` of a binary tree, invert the tree (mirror its left and right subtrees recursively), and return its root.\n\n*Note: `TreeNode(val, left, right)` is pre-defined for you.*",examples:[{input:`root = [4, 2, 7, 1, 3, 6, 9]`,output:`[4, 7, 2, 9, 6, 3, 1]`},{input:`root = [2, 1, 3]`,output:`[2, 3, 1]`},{input:`root = []`,output:`[]`}],constraints:[`The number of nodes in the tree is in range [0, 100].`],hints:["Base case: if `root === null`, return `null`.","Swap `root.left` and `root.right`, then recursively invert both children!"],timeComplexity:`O(n)`,spaceComplexity:`O(h) call stack`,visualHint:{primaryStructure:`tree`,description:`Watch the Binary Tree mirror live alongside the Recursion Call Stack!`},starterCode:{python:`def invertTree(root):
    # Write your solution here
    pass`,javascript:`function invertTree(root) {
  // Write your solution here
  
}`,java:`class Solution {
    public TreeNode invertTree(TreeNode root) {
        return root;
    }
}`,cpp:`class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        return root;
    }
};`,c:`struct TreeNode* invertTree(struct TreeNode* root) {
    return root;
}`,csharp:`public class Solution {
    public TreeNode InvertTree(TreeNode root) {
        return root;
    }
}`},optimalCode:{python:`def invertTree(root):
    if root is None:
        return None

    root.left, root.right = root.right, root.left
    invertTree(root.left)
    invertTree(root.right)
    return root`,javascript:`function invertTree(root) {
  if (root === null) return null;

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);
  return root;
}`,java:`class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`,cpp:`class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) return nullptr;
        TreeNode* temp = root->left;
        root->left = root->right;
        root->right = temp;
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`,c:`struct TreeNode* invertTree(struct TreeNode* root) {
    if (root == NULL) return NULL;
    struct TreeNode* temp = root->left;
    root->left = root->right;
    root->right = temp;
    invertTree(root->left);
    invertTree(root->right);
    return root;
}`,csharp:`public class Solution {
    public TreeNode InvertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        InvertTree(root.left);
        InvertTree(root.right);
        return root;
    }
}`},testCases:[{id:`ibt-1`,label:`Case 1`,args:[[4,2,7,1,3,6,9]],expected:[4,7,2,9,6,3,1]},{id:`ibt-2`,label:`Case 2`,args:[[2,1,3]],expected:[2,3,1]},{id:`ibt-3`,label:`Empty`,args:[[]],expected:[]},{id:`ibt-4`,label:`Skewed`,args:[[1,2,null,3]],expected:[1,null,2,null,3],isHidden:!0}]},{id:`level-order-traversal`,number:102,title:`Binary Tree Level Order Traversal`,scenario:`Category Hierarchy / Permission Tree`,difficulty:`Medium`,category:`Trees`,tags:[`Tree`,`BFS`,`Queue`],entryFunction:`levelOrder`,params:[{name:`root`,type:`binaryTree`}],returnType:`number[][]`,compareMode:`exact`,description:"Given the `root` of a binary tree (representing a category or permission hierarchy), return the **level order traversal** of its nodes' values from left to right, depth level by depth level.",examples:[{input:`root = [3, 9, 20, null, null, 15, 7]`,output:`[[3], [9, 20], [15, 7]]`},{input:`root = [1]`,output:`[[1]]`},{input:`root = []`,output:`[]`}],constraints:[`The number of nodes in the tree is in range [0, 2000].`],hints:["Use a FIFO `queue` initialized with `[root]`.","At each level, capture `levelSize = queue.length` and process exactly `levelSize` nodes before starting the next level list."],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`tree`,description:"See tree nodes glow as they enter the BFS `queue` and populate `result` level by level."},starterCode:{python:`def levelOrder(root):
    # Write your solution here
    pass`,javascript:`function levelOrder(root) {
  // Write your solution here
  
}`,java:`class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        return new ArrayList<>();
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        return {};
    }
};`,c:`int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public IList<IList<int>> LevelOrder(TreeNode root) {
        return new List<IList<int>>();
    }
}`},optimalCode:{python:`def levelOrder(root):
    if not root:
        return []
    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,javascript:`function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,java:`class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> level;
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
        }
        return result;
    }
};`,c:`int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    if (root == NULL) return NULL;
    int** result = (int**)malloc(2000 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(2000 * sizeof(int));
    struct TreeNode* queue[2000];
    int front = 0, back = 0;
    queue[back++] = root;
    while (front < back) {
        int levelSize = back - front;
        int* level = (int*)malloc(levelSize * sizeof(int));
        for (int i = 0; i < levelSize; i++) {
            struct TreeNode* node = queue[front++];
            level[i] = node->val;
            if (node->left != NULL) queue[back++] = node->left;
            if (node->right != NULL) queue[back++] = node->right;
        }
        result[*returnSize] = level;
        (*returnColumnSizes)[*returnSize] = levelSize;
        (*returnSize)++;
    }
    return result;
}`,csharp:`public class Solution {
    public IList<IList<int>> LevelOrder(TreeNode root) {
        var result = new List<IList<int>>();
        if (root == null) return result;
        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);
        while (queue.Count > 0) {
            int levelSize = queue.Count;
            var level = new List<int>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.Dequeue();
                level.Add(node.val);
                if (node.left != null) queue.Enqueue(node.left);
                if (node.right != null) queue.Enqueue(node.right);
            }
            result.Add(level);
        }
        return result;
    }
}`},testCases:[{id:`lot-1`,label:`Case 1`,args:[[3,9,20,null,null,15,7]],expected:[[3],[9,20],[15,7]]},{id:`lot-2`,label:`Case 2`,args:[[1]],expected:[[1]]},{id:`lot-3`,label:`Empty`,args:[[]],expected:[]},{id:`lot-4`,label:`Full 3 Levels`,args:[[1,2,3,4,5,6,7]],expected:[[1],[2,3],[4,5,6,7]],isHidden:!0}]},{id:`validate-bst`,number:98,title:`Validate Binary Search Tree`,difficulty:`Medium`,category:`Trees`,tags:[`Tree`,`BST`,`DFS`],entryFunction:`isValidBST`,params:[{name:`root`,type:`binaryTree`}],returnType:`boolean`,compareMode:`exact`,description:`Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys **strictly less than** the node's key.
- The right subtree of a node contains only nodes with keys **strictly greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.`,examples:[{input:`root = [2, 1, 3]`,output:`true`},{input:`root = [5, 1, 4, null, null, 3, 6]`,output:`false`,explanation:`Root is 5, but its right child has value 4.`}],constraints:[`The number of nodes in the tree is in range [1, 10^4].`],hints:["Checking only `node.left.val < node.val < node.right.val` is NOT enough — every node in the entire left subtree must stay below ancestor bounds!","Pass `(minBound, maxBound)` down recursion: going left updates `maxBound = node.val`; going right updates `minBound = node.val`."],timeComplexity:`O(n)`,spaceComplexity:`O(h)`,visualHint:{primaryStructure:`tree`,description:"Follow `validate(node, minVal, maxVal)` descending the Tree SVG & Recursion Tree."},starterCode:{python:`def isValidBST(root):
    # Write your solution here
    pass`,javascript:`function isValidBST(root) {
  // Write your solution here
  
}`,java:`class Solution {
    public boolean isValidBST(TreeNode root) {
        return false;
    }
}`,cpp:`class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return false;
    }
};`,c:`bool isValidBST(struct TreeNode* root) {
    return false;
}`,csharp:`public class Solution {
    public bool IsValidBST(TreeNode root) {
        return false;
    }
}`},optimalCode:{python:`def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (
            validate(node.left, min_val, node.val)
            and validate(node.right, node.val, max_val)
        )
    return validate(root, float('-inf'), float('inf'))`,javascript:`function isValidBST(root) {
  function validate(node, minVal, maxVal) {
    if (!node) return true;
    if (node.val <= minVal || node.val >= maxVal) return false;
    return (
      validate(node.left, minVal, node.val) &&
      validate(node.right, node.val, maxVal)
    );
  }
  return validate(root, -Infinity, Infinity);
}`,java:`class Solution {
    private boolean validate(TreeNode node, long minVal, long maxVal) {
        if (node == null) return true;
        if (node.val <= minVal || node.val >= maxVal) return false;
        return validate(node.left, minVal, node.val) && validate(node.right, node.val, maxVal);
    }
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
}`,cpp:`class Solution {
public:
    bool validate(TreeNode* node, long long minVal, long long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        return validate(node->left, minVal, node->val) && validate(node->right, node->val, maxVal);
    }
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
};`,c:`bool validate(struct TreeNode* node, long minVal, long maxVal) {
    if (node == NULL) return true;
    if (node->val <= minVal || node->val >= maxVal) return false;
    return validate(node->left, minVal, node->val) && validate(node->right, node->val, maxVal);
}
bool isValidBST(struct TreeNode* root) {
    return validate(root, -2147483649, 2147483648);
}`,csharp:`public class Solution {
    private bool Validate(TreeNode node, long minVal, long maxVal) {
        if (node == null) return true;
        if (node.val <= minVal || node.val >= maxVal) return false;
        return Validate(node.left, minVal, node.val) && Validate(node.right, node.val, maxVal);
    }
    public bool IsValidBST(TreeNode root) {
        return Validate(root, long.MinValue, long.MaxValue);
    }
}`},testCases:[{id:`vbst-1`,label:`Case 1 (Valid)`,args:[[2,1,3]],expected:!0},{id:`vbst-2`,label:`Case 2 (Invalid)`,args:[[5,1,4,null,null,3,6]],expected:!1},{id:`vbst-3`,label:`Subtree Violation`,args:[[5,4,6,null,null,3,7]],expected:!1},{id:`vbst-4`,label:`Equal Duplicate`,args:[[2,2,2]],expected:!1,isHidden:!0},{id:`vbst-5`,label:`Deep Valid`,args:[[8,3,10,1,6,null,14]],expected:!0,isHidden:!0}]},{id:`number-of-islands`,number:200,title:`Number of Islands`,scenario:`Warehouse Robot / Server Cluster`,difficulty:`Medium`,category:`Graphs`,tags:[`Matrix`,`DFS`,`BFS`,`Grid`],entryFunction:`numIslands`,params:[{name:`grid`,type:`string[][]`}],returnType:`number`,compareMode:`exact`,description:'Given an `m x n` 2D binary grid `grid` which represents a map of `"1"`s (land) and `"0"`s (water), return the number of islands.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',examples:[{input:`grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]`,output:`3`},{input:`grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]`,output:`1`}],constraints:[`1 <= m, n <= 300`,`grid[r][c] is "0" or "1".`],hints:['Scan every cell `(r, c)`. Whenever you hit unvisited land `"1"`, increment `islands` and flood-fill the entire island.','During DFS/BFS flood-fill, mark visited land cells as `"#"` (or `"0"`) so you never count the same island twice.'],timeComplexity:`O(m * n)`,spaceComplexity:`O(m * n)`,visualHint:{primaryStructure:`matrix`,highlightPointers:[`r`,`c`],description:"Watch `(r, c)` scan the 2D land/water grid and flood-fill each discovered island!"},starterCode:{python:`def numIslands(grid):
    # Write your solution here
    pass`,javascript:`function numIslands(grid) {
  // Write your solution here
  
}`,java:`class Solution {
    public int numIslands(char[][] grid) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        return 0;
    }
};`,c:`int numIslands(char** grid, int gridSize, int* gridColSize) {
    return 0;
}`,csharp:`public class Solution {
    public int NumIslands(char[][] grid) {
        return 0;
    }
}`},optimalCode:{python:`def numIslands(grid):
    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '#'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)
    return islands`,javascript:`function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') {
      return;
    }
    grid[r][c] = '#';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}`,java:`class Solution {
    private void dfs(char[][] grid, int r, int c, int rows, int cols) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '#';
        dfs(grid, r + 1, c, rows, cols);
        dfs(grid, r - 1, c, rows, cols);
        dfs(grid, r, c + 1, rows, cols);
        dfs(grid, r, c - 1, rows, cols);
    }
    public int numIslands(char[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    dfs(grid, r, c, rows, cols);
                }
            }
        }
        return islands;
    }
}`,cpp:`class Solution {
public:
    void dfs(vector<vector<char>>& grid, int r, int c, int rows, int cols) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '#';
        dfs(grid, r + 1, c, rows, cols);
        dfs(grid, r - 1, c, rows, cols);
        dfs(grid, r, c + 1, rows, cols);
        dfs(grid, r, c - 1, rows, cols);
    }
    int numIslands(vector<vector<char>>& grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        int islands = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    dfs(grid, r, c, rows, cols);
                }
            }
        }
        return islands;
    }
};`,c:`void dfsIsland(char** grid, int r, int c, int rows, int cols) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
    grid[r][c] = '#';
    dfsIsland(grid, r + 1, c, rows, cols);
    dfsIsland(grid, r - 1, c, rows, cols);
    dfsIsland(grid, r, c + 1, rows, cols);
    dfsIsland(grid, r, c - 1, rows, cols);
}
int numIslands(char** grid, int gridSize, int* gridColSize) {
    int rows = gridSize;
    int cols = gridColSize[0];
    int islands = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                islands++;
                dfsIsland(grid, r, c, rows, cols);
            }
        }
    }
    return islands;
}`,csharp:`public class Solution {
    private void Dfs(char[][] grid, int r, int c, int rows, int cols) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1') return;
        grid[r][c] = '#';
        Dfs(grid, r + 1, c, rows, cols);
        Dfs(grid, r - 1, c, rows, cols);
        Dfs(grid, r, c + 1, rows, cols);
        Dfs(grid, r, c - 1, rows, cols);
    }
    public int NumIslands(char[][] grid) {
        int rows = grid.Length;
        int cols = grid[0].Length;
        int islands = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    Dfs(grid, r, c, rows, cols);
                }
            }
        }
        return islands;
    }
}`},testCases:[{id:`noi-1`,label:`Case 1 (3 Islands)`,args:[[[`1`,`1`,`0`,`0`,`0`],[`1`,`1`,`0`,`0`,`0`],[`0`,`0`,`1`,`0`,`0`],[`0`,`0`,`0`,`1`,`1`]]],expected:3},{id:`noi-2`,label:`Case 2 (1 Island)`,args:[[[`1`,`1`,`1`,`0`],[`1`,`0`,`1`,`0`],[`1`,`1`,`0`,`0`]]],expected:1},{id:`noi-3`,label:`All Water`,args:[[[`0`,`0`],[`0`,`0`]]],expected:0},{id:`noi-4`,label:`Checkerboard`,args:[[[`1`,`0`,`1`],[`0`,`1`,`0`],[`1`,`0`,`1`]]],expected:5,isHidden:!0}]},{id:`course-schedule`,number:207,title:`Course Schedule`,difficulty:`Medium`,category:`Graphs`,tags:[`Graph`,`Topological Sort`,`BFS`],entryFunction:`canFinish`,params:[{name:`numCourses`,type:`number`},{name:`prerequisites`,type:`number[][]`}],returnType:`boolean`,compareMode:`exact`,description:"There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you **must** take course `b` first if you want to take course `a`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false` (cycle detected).",examples:[{input:`numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]`,output:`true`},{input:`numCourses = 2, prerequisites = [[1,0],[0,1]]`,output:`false`,explanation:`Cycle between course 0 and course 1.`}],constraints:[`1 <= numCourses <= 2000`,`0 <= prerequisites.length <= 5000`],hints:["Build a directed graph `adj` (`b -> a`) and an `indegree` array counting prerequisites for each course.","Using Kahn's BFS Topological Sort, enqueue all 0-indegree courses; peel edges off as you take courses and check if `taken === numCourses`."],timeComplexity:`O(V + E)`,spaceComplexity:`O(V + E)`,visualHint:{primaryStructure:`graph`,highlightPointers:[`u`,`v`],description:"Live directed graph `adj` + `indegree` array + topological BFS `queue`!"},starterCode:{python:`def canFinish(numCourses, prerequisites):
    # Write your solution here
    pass`,javascript:`function canFinish(numCourses, prerequisites) {
  // Write your solution here
  
}`,java:`class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        return false;
    }
}`,cpp:`class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        return false;
    }
};`,c:`bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    return false;
}`,csharp:`public class Solution {
    public bool CanFinish(int numCourses, int[][] prerequisites) {
        return false;
    }
}`},optimalCode:{python:`def canFinish(numCourses, prerequisites):
    adj = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses

    for course, pre in prerequisites:
        adj[pre].append(course)
        indegree[course] += 1

    queue = deque()
    for i in range(numCourses):
        if indegree[i] == 0:
            queue.append(i)

    taken = 0
    while queue:
        u = queue.popleft()
        taken += 1
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                queue.append(v)
    return taken == numCourses`,javascript:`function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let taken = 0;
  while (queue.length > 0) {
    const u = queue.shift();
    taken++;
    for (const v of adj[u]) {
      indegree[v]--;
      if (indegree[v] === 0) queue.push(v);
    }
  }
  return taken === numCourses;
}`,java:`class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        for (int[] edge : prerequisites) {
            adj.get(edge[1]).add(edge[0]);
            indegree[edge[0]]++;
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.offer(i);
        }
        int taken = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            taken++;
            for (int v : adj.get(u)) {
                indegree[v]--;
                if (indegree[v] == 0) queue.offer(v);
            }
        }
        return taken == numCourses;
    }
}`,cpp:`class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        for (auto& edge : prerequisites) {
            adj[edge[1]].push_back(edge[0]);
            indegree[edge[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        int taken = 0;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            taken++;
            for (int v : adj[u]) {
                indegree[v]--;
                if (indegree[v] == 0) q.push(v);
            }
        }
        return taken == numCourses;
    }
};`,c:`bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    int* indegree = (int*)calloc(numCourses, sizeof(int));
    for (int i = 0; i < prerequisitesSize; i++) {
        indegree[prerequisites[i][0]]++;
    }
    int* queue = (int*)malloc(numCourses * sizeof(int));
    int front = 0, back = 0;
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) queue[back++] = i;
    }
    int taken = 0;
    while (front < back) {
        int u = queue[front++];
        taken++;
        for (int i = 0; i < prerequisitesSize; i++) {
            if (prerequisites[i][1] == u) {
                int v = prerequisites[i][0];
                indegree[v]--;
                if (indegree[v] == 0) queue[back++] = v;
            }
        }
    }
    return taken == numCourses;
}`,csharp:`public class Solution {
    public bool CanFinish(int numCourses, int[][] prerequisites) {
        var adj = new List<int>[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new List<int>();
        int[] indegree = new int[numCourses];
        foreach (var edge in prerequisites) {
            adj[edge[1]].Add(edge[0]);
            indegree[edge[0]]++;
        }
        var queue = new Queue<int>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.Enqueue(i);
        }
        int taken = 0;
        while (queue.Count > 0) {
            int u = queue.Dequeue();
            taken++;
            foreach (int v in adj[u]) {
                indegree[v]--;
                if (indegree[v] == 0) queue.Enqueue(v);
            }
        }
        return taken == numCourses;
    }
}`},testCases:[{id:`cs-1`,label:`Case 1 (DAG)`,args:[4,[[1,0],[2,0],[3,1],[3,2]]],expected:!0},{id:`cs-2`,label:`Case 2 (Cycle)`,args:[2,[[1,0],[0,1]]],expected:!1},{id:`cs-3`,label:`No Edges`,args:[3,[]],expected:!0},{id:`cs-4`,label:`3-Cycle`,args:[3,[[0,1],[1,2],[2,0]]],expected:!1,isHidden:!0}]},{id:`climbing-stairs`,number:70,title:`Climbing Stairs`,difficulty:`Easy`,category:`Dynamic Programming`,tags:[`Dynamic Programming`,`DP Array`],entryFunction:`climbStairs`,params:[{name:`n`,type:`number`}],returnType:`number`,compareMode:`exact`,description:"You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",examples:[{input:`n = 5`,output:`8`,explanation:`DP table fills [1, 1, 2, 3, 5, 8].`},{input:`n = 3`,output:`3`}],constraints:[`1 <= n <= 45`],hints:["To reach step `i`, you either came from step `i - 1` (1-step jump) or step `i - 2` (2-step jump).","So `dp[i] = dp[i - 1] + dp[i - 2]` with base cases `dp[0] = 1`, `dp[1] = 1`."],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`dp`,highlightPointers:[`i`],description:"Watch the 1D `dp` array fill step by step from `i = 2` to `n`!"},starterCode:{python:`def climbStairs(n):
    # Write your solution here
    pass`,javascript:`function climbStairs(n) {
  // Write your solution here
  
}`,java:`class Solution {
    public int climbStairs(int n) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int climbStairs(int n) {
        return 0;
    }
};`,c:`int climbStairs(int n) {
    return 0;
}`,csharp:`public class Solution {
    public int ClimbStairs(int n) {
        return 0;
    }
}`},optimalCode:{python:`def climbStairs(n):
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,javascript:`function climbStairs(n) {
  if (n <= 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,java:`class Solution {
    public int climbStairs(int n) {
        if (n <= 1) return 1;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`,cpp:`class Solution {
public:
    int climbStairs(int n) {
        if (n <= 1) return 1;
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
};`,c:`int climbStairs(int n) {
    if (n <= 1) return 1;
    int* dp = (int*)calloc(n + 1, sizeof(int));
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,csharp:`public class Solution {
    public int ClimbStairs(int n) {
        if (n <= 1) return 1;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`},testCases:[{id:`cs70-1`,label:`Case 1 (n=5)`,args:[5],expected:8},{id:`cs70-2`,label:`Case 2 (n=3)`,args:[3],expected:3},{id:`cs70-3`,label:`Case 3 (n=1)`,args:[1],expected:1},{id:`cs70-4`,label:`n=8`,args:[8],expected:34,isHidden:!0}]},{id:`coin-change`,number:322,title:`Coin Change`,difficulty:`Medium`,category:`Dynamic Programming`,tags:[`Array`,`Dynamic Programming`],entryFunction:`coinChange`,params:[{name:`coins`,type:`number[]`},{name:`amount`,type:`number`}],returnType:`number`,compareMode:`exact`,description:"You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.",examples:[{input:`coins = [1, 2, 5], amount = 11`,output:`3`,explanation:`11 = 5 + 5 + 1`},{input:`coins = [2], amount = 3`,output:`-1`},{input:`coins = [1], amount = 0`,output:`0`}],constraints:[`1 <= coins.length <= 12`,`0 <= amount <= 10^4`],hints:["Define `dp[a]` = minimum coins needed to make amount `a`, initialized to `amount + 1` (representing infinity), with `dp[0] = 0`.","For each amount `a` from `1..amount` and each `coin <= a`, relax `dp[a] = min(dp[a], dp[a - coin] + 1)`."],timeComplexity:`O(amount * coins.length)`,spaceComplexity:`O(amount)`,visualHint:{primaryStructure:`dp`,highlightPointers:[`a`],description:"Bottom-up `dp` array showing optimal coin counts for amounts `0..amount`."},starterCode:{python:`def coinChange(coins, amount):
    # Write your solution here
    pass`,javascript:`function coinChange(coins, amount) {
  // Write your solution here
  
}`,java:`class Solution {
    public int coinChange(int[] coins, int amount) {
        return -1;
    }
}`,cpp:`class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        return -1;
    }
};`,c:`int coinChange(int* coins, int coinsSize, int amount) {
    return -1;
}`,csharp:`public class Solution {
    public int CoinChange(int[] coins, int amount) {
        return -1;
    }
}`},optimalCode:{python:`def coinChange(coins, amount):
    INF = amount + 1
    dp = [INF] * (amount + 1)
    dp[0] = 0

    for a in range(1, amount + 1):
        for coin in coins:
            if a - coin >= 0:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return -1 if dp[amount] > amount else dp[amount]`,javascript:`function coinChange(coins, amount) {
  const INF = amount + 1;
  const dp = new Array(amount + 1).fill(INF);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (a - coin >= 0) {
        dp[a] = Math.min(dp[a], dp[a - coin] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}`,java:`class Solution {
    public int coinChange(int[] coins, int amount) {
        int INF = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (a - coin >= 0) {
                    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,cpp:`class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int INF = amount + 1;
        vector<int> dp(amount + 1, INF);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int coin : coins) {
                if (a - coin >= 0) {
                    dp[a] = min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,c:`int coinChange(int* coins, int coinsSize, int amount) {
    int INF = amount + 1;
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    for (int i = 0; i <= amount; i++) dp[i] = INF;
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int j = 0; j < coinsSize; j++) {
            int coin = coins[j];
            if (a - coin >= 0 && dp[a - coin] + 1 < dp[a]) {
                dp[a] = dp[a - coin] + 1;
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,csharp:`public class Solution {
    public int CoinChange(int[] coins, int amount) {
        int INF = amount + 1;
        int[] dp = new int[amount + 1];
        Array.Fill(dp, INF);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            foreach (int coin in coins) {
                if (a - coin >= 0) {
                    dp[a] = Math.Min(dp[a], dp[a - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`},testCases:[{id:`cc-1`,label:`Case 1`,args:[[1,2,5],11],expected:3},{id:`cc-2`,label:`Case 2`,args:[[2],3],expected:-1},{id:`cc-3`,label:`Zero Amount`,args:[[1],0],expected:0},{id:`cc-4`,label:`Greedy Fails`,args:[[1,3,4],6],expected:2,isHidden:!0}]},{id:`longest-common-subsequence`,number:1143,title:`Longest Common Subsequence`,difficulty:`Medium`,category:`Dynamic Programming`,tags:[`String`,`Dynamic Programming`,`2D Matrix`],entryFunction:`longestCommonSubsequence`,params:[{name:`text1`,type:`string`},{name:`text2`,type:`string`}],returnType:`number`,compareMode:`exact`,description:"Given two strings `text1` and `text2`, return the length of their **longest common subsequence**. If there is no common subsequence, return `0`.\n\nA subsequence is derived by deleting some or no characters without changing the relative order of the remaining characters.",examples:[{input:`text1 = "abcde", text2 = "ace"`,output:`3`,explanation:`LCS is "ace" of length 3.`},{input:`text1 = "abc", text2 = "def"`,output:`0`}],constraints:[`1 <= text1.length, text2.length <= 1000`],hints:["Build a 2D DP matrix `dp` of size `(m + 1) x (n + 1)` where `dp[i][j]` is LCS of `text1[0..i-1]` and `text2[0..j-1]`.","If `text1[i - 1] === text2[j - 1]`, `dp[i][j] = 1 + dp[i - 1][j - 1]`; else `max(dp[i - 1][j], dp[i][j - 1])`."],timeComplexity:`O(m * n)`,spaceComplexity:`O(m * n)`,visualHint:{primaryStructure:`matrix`,highlightPointers:[`i`,`j`],description:"2D DP matrix `dp[i][j]` filling cell-by-cell with `(i, j)` crosshair!"},starterCode:{python:`def longestCommonSubsequence(text1, text2):
    # Write your solution here
    pass`,javascript:`function longestCommonSubsequence(text1, text2) {
  // Write your solution here
  
}`,java:`class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        return 0;
    }
};`,c:`int longestCommonSubsequence(char* text1, char* text2) {
    return 0;
}`,csharp:`public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        return 0;
    }
}`},optimalCode:{python:`def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,javascript:`function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,java:`class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,cpp:`class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size();
        int n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
};`,c:`int longestCommonSubsequence(char* text1, char* text2) {
    int m = strlen(text1);
    int n = strlen(text2);
    int** dp = (int**)malloc((m + 1) * sizeof(int*));
    for (int i = 0; i <= m; i++) {
        dp[i] = (int*)calloc(n + 1, sizeof(int));
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
            }
        }
    }
    return dp[m][n];
}`,csharp:`public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        int m = text1.Length;
        int n = text2.Length;
        int[][] dp = new int[m + 1][];
        for (int i = 0; i <= m; i++) dp[i] = new int[n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.Max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`},testCases:[{id:`lcs-1`,label:`Case 1`,args:[`abcde`,`ace`],expected:3},{id:`lcs-2`,label:`Case 2`,args:[`abc`,`def`],expected:0},{id:`lcs-3`,label:`Identical`,args:[`algo`,`algo`],expected:4},{id:`lcs-4`,label:`Subsequence`,args:[`bsbininm`,`jmjkbkjkv`],expected:1,isHidden:!0}]},{id:`playground-quicksort`,number:901,title:`Playground: Quick Sort & Array Swaps`,difficulty:`Playground`,category:`Sorting & Playground`,tags:[`Playground`,`Sorting`,`Recursion`],isPlayground:!0,entryFunction:``,params:[],returnType:`any`,compareMode:`playground`,description:`Free **Sorting & Recursion Playground**! Write or tweak any sorting algorithm (Quick Sort, Merge Sort, Insertion Sort) and watch the bars swap, pointers move, and recursion call tree unfold in real time.`,examples:[{input:`arr = [38, 27, 43, 3, 9, 82, 10]`,output:`[3, 9, 10, 27, 38, 43, 82]`}],constraints:["Runs top-level script or `main()` directly."],hints:["Try changing `arr` or replacing `quickSort` with `bubbleSort` or `mergeSort`!"],timeComplexity:`O(n log n) avg`,spaceComplexity:`O(log n)`,visualHint:{primaryStructure:`bars`,description:"Live bar chart + partition pointers (`low`, `high`, `pivot`, `i`) + recursion tree!"},starterCode:{python:`arr = [38, 27, 43, 3, 9, 82, 10]

def partition(nums, low, high):
    pivot = nums[high]
    i = low
    for j in range(low, high):
        if nums[j] <= pivot:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    nums[i], nums[high] = nums[high], nums[i]
    return i

def quickSort(nums, low, high):
    if low >= high:
        return
    p = partition(nums, low, high)
    quickSort(nums, low, p - 1)
    quickSort(nums, p + 1, high)

quickSort(arr, 0, len(arr) - 1)
print("Sorted:", arr)`,javascript:`const arr = [38, 27, 43, 3, 9, 82, 10];

function quickSort(nums, low, high) {
  if (low >= high) return;
  const p = partition(nums, low, high);
  quickSort(nums, low, p - 1);
  quickSort(nums, p + 1, high);
}

function partition(nums, low, high) {
  const pivot = nums[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (nums[j] <= pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  [nums[i], nums[high]] = [nums[high], nums[i]];
  return i;
}

quickSort(arr, 0, arr.length - 1);
console.log('Sorted:', arr);`,java:`class Main {
    static int partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                i++;
            }
        }
        int tmp = nums[i];
        nums[i] = nums[high];
        nums[high] = tmp;
        return i;
    }
    static void quickSort(int[] nums, int low, int high) {
        if (low >= high) return;
        int p = partition(nums, low, high);
        quickSort(nums, low, p - 1);
        quickSort(nums, p + 1, high);
    }
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,cpp:`int partition(vector<int>& nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
        }
    }
    int tmp = nums[i];
    nums[i] = nums[high];
    nums[high] = tmp;
    return i;
}

void quickSort(vector<int>& nums, int low, int high) {
    if (low >= high) return;
    int p = partition(nums, low, high);
    quickSort(nums, low, p - 1);
    quickSort(nums, p + 1, high);
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    quickSort(arr, 0, arr.size() - 1);
    return 0;
}`,c:`int partition(int* nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
        }
    }
    int tmp = nums[i];
    nums[i] = nums[high];
    nums[high] = tmp;
    return i;
}

void quickSort(int* nums, int low, int high) {
    if (low >= high) return;
    int p = partition(nums, low, high);
    quickSort(nums, low, p - 1);
    quickSort(nums, p + 1, high);
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    quickSort(arr, 0, 6);
    return 0;
}`,csharp:`public class Program {
    static int Partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                i++;
            }
        }
        int t = nums[i];
        nums[i] = nums[high];
        nums[high] = t;
        return i;
    }
    static void QuickSort(int[] nums, int low, int high) {
        if (low >= high) return;
        int p = Partition(nums, low, high);
        QuickSort(nums, low, p - 1);
        QuickSort(nums, p + 1, high);
    }
    public static void Main() {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        QuickSort(arr, 0, arr.Length - 1);
    }
}`},optimalCode:{python:`arr = [38, 27, 43, 3, 9, 82, 10]

def partition(nums, low, high):
    pivot = nums[high]
    i = low
    for j in range(low, high):
        if nums[j] <= pivot:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    nums[i], nums[high] = nums[high], nums[i]
    return i

def quickSort(nums, low, high):
    if low >= high:
        return
    p = partition(nums, low, high)
    quickSort(nums, low, p - 1)
    quickSort(nums, p + 1, high)

quickSort(arr, 0, len(arr) - 1)
print("Sorted:", arr)`,javascript:`const arr = [38, 27, 43, 3, 9, 82, 10];

function quickSort(nums, low, high) {
  if (low >= high) return;
  const p = partition(nums, low, high);
  quickSort(nums, low, p - 1);
  quickSort(nums, p + 1, high);
}

function partition(nums, low, high) {
  const pivot = nums[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (nums[j] <= pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  [nums[i], nums[high]] = [nums[high], nums[i]];
  return i;
}

quickSort(arr, 0, arr.length - 1);
console.log('Sorted:', arr);`,java:`class Main {
    static int partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                i++;
            }
        }
        int tmp = nums[i];
        nums[i] = nums[high];
        nums[high] = tmp;
        return i;
    }
    static void quickSort(int[] nums, int low, int high) {
        if (low >= high) return;
        int p = partition(nums, low, high);
        quickSort(nums, low, p - 1);
        quickSort(nums, p + 1, high);
    }
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }
}`,cpp:`int partition(vector<int>& nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
        }
    }
    int tmp = nums[i];
    nums[i] = nums[high];
    nums[high] = tmp;
    return i;
}

void quickSort(vector<int>& nums, int low, int high) {
    if (low >= high) return;
    int p = partition(nums, low, high);
    quickSort(nums, low, p - 1);
    quickSort(nums, p + 1, high);
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    quickSort(arr, 0, arr.size() - 1);
    return 0;
}`,c:`int partition(int* nums, int low, int high) {
    int pivot = nums[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
        }
    }
    int tmp = nums[i];
    nums[i] = nums[high];
    nums[high] = tmp;
    return i;
}

void quickSort(int* nums, int low, int high) {
    if (low >= high) return;
    int p = partition(nums, low, high);
    quickSort(nums, low, p - 1);
    quickSort(nums, p + 1, high);
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    quickSort(arr, 0, 6);
    return 0;
}`,csharp:`public class Program {
    static int Partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                i++;
            }
        }
        int t = nums[i];
        nums[i] = nums[high];
        nums[high] = t;
        return i;
    }
    static void QuickSort(int[] nums, int low, int high) {
        if (low >= high) return;
        int p = Partition(nums, low, high);
        QuickSort(nums, low, p - 1);
        QuickSort(nums, p + 1, high);
    }
    public static void Main() {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        QuickSort(arr, 0, arr.Length - 1);
    }
}`},testCases:[{id:`pg-qs`,label:`Run Script`,args:[],expected:null}]},{id:`playground-graph-bfs`,number:902,title:`Playground: Graph BFS Traversal`,difficulty:`Playground`,category:`Sorting & Playground`,tags:[`Playground`,`Graph`,`BFS`],isPlayground:!0,entryFunction:``,params:[],returnType:`any`,compareMode:`playground`,description:"Interactive **Graph BFS Playground**! Edit the `adj` adjacency list, starting vertex, or replace BFS with DFS to watch vertices move from queued -> active -> visited in real time.",examples:[{input:`6 vertices adjacency list, start = 0`,output:`order = [0, 1, 2, 3, 4, 5]`}],constraints:["Runs top-level script or `main()` directly."],hints:["Name your adjacency list `adj` and `visited` Set + `queue` array to see automatic Graph visualization!"],timeComplexity:`O(V + E)`,spaceComplexity:`O(V)`,visualHint:{primaryStructure:`graph`,description:"Live adjacency graph `adj` + BFS `queue` + `visited` set!"},starterCode:{python:`adj = [
    [1, 2],
    [0, 3, 4],
    [0, 4],
    [1, 5],
    [1, 2, 5],
    [3, 4],
]

visited = {0}
queue = deque([0])
order = []

while queue:
    u = queue.popleft()
    order.append(u)
    for v in adj[u]:
        if v not in visited:
            visited.add(v)
            queue.append(v)

print("BFS Order:", order)`,javascript:`const adj = [
  [1, 2],
  [0, 3, 4],
  [0, 4],
  [1, 5],
  [1, 2, 5],
  [3, 4],
];

const visited = new Set([0]);
const queue = [0];
const order = [];

while (queue.length > 0) {
  const u = queue.shift();
  order.push(u);
  for (const v of adj[u]) {
    if (!visited.has(v)) {
      visited.add(v);
      queue.push(v);
    }
  }
}
console.log('BFS Order:', order);`,java:`class Main {
    public static void main(String[] args) {
        int[][] adj = {
            {1, 2},
            {0, 3, 4},
            {0, 4},
            {1, 5},
            {1, 2, 5},
            {3, 4}
        };
        Set<Integer> visited = new HashSet<>();
        visited.add(0);
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(0);
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order.add(u);
            for (int v : adj[u]) {
                if (!visited.contains(v)) {
                    visited.add(v);
                    queue.offer(v);
                }
            }
        }
        System.out.println("BFS Order:");
    }
}`,cpp:`int main() {
    vector<vector<int>> adj = {
        {1, 2},
        {0, 3, 4},
        {0, 4},
        {1, 5},
        {1, 2, 5},
        {3, 4}
    };
    unordered_set<int> visited;
    visited.insert(0);
    queue<int> q;
    q.push(0);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (!visited.count(v)) {
                visited.insert(v);
                q.push(v);
            }
        }
    }
    return 0;
}`,c:`int main() {
    int deg[] = {2, 3, 2, 2, 3, 2};
    int adj[6][3] = {
        {1, 2, -1},
        {0, 3, 4},
        {0, 4, -1},
        {1, 5, -1},
        {1, 2, 5},
        {3, 4, -1}
    };
    int visited[6] = {0, 0, 0, 0, 0, 0};
    visited[0] = 1;
    int queue[10];
    int front = 0, back = 0;
    queue[back++] = 0;
    int order[6];
    int k = 0;
    while (front < back) {
        int u = queue[front++];
        order[k++] = u;
        for (int j = 0; j < deg[u]; j++) {
            int v = adj[u][j];
            if (!visited[v]) {
                visited[v] = 1;
                queue[back++] = v;
            }
        }
    }
    return 0;
}`,csharp:`public class Program {
    public static void Main() {
        int[][] adj = new int[][] {
            new int[] {1, 2},
            new int[] {0, 3, 4},
            new int[] {0, 4},
            new int[] {1, 5},
            new int[] {1, 2, 5},
            new int[] {3, 4}
        };
        var visited = new HashSet<int>();
        visited.Add(0);
        var queue = new Queue<int>();
        queue.Enqueue(0);
        var order = new List<int>();
        while (queue.Count > 0) {
            int u = queue.Dequeue();
            order.Add(u);
            foreach (int v in adj[u]) {
                if (!visited.Contains(v)) {
                    visited.Add(v);
                    queue.Enqueue(v);
                }
            }
        }
    }
}`},optimalCode:{python:`adj = [
    [1, 2],
    [0, 3, 4],
    [0, 4],
    [1, 5],
    [1, 2, 5],
    [3, 4],
]

visited = {0}
queue = deque([0])
order = []

while queue:
    u = queue.popleft()
    order.append(u)
    for v in adj[u]:
        if v not in visited:
            visited.add(v)
            queue.append(v)

print("BFS Order:", order)`,javascript:`const adj = [
  [1, 2],
  [0, 3, 4],
  [0, 4],
  [1, 5],
  [1, 2, 5],
  [3, 4],
];

const visited = new Set([0]);
const queue = [0];
const order = [];

while (queue.length > 0) {
  const u = queue.shift();
  order.push(u);
  for (const v of adj[u]) {
    if (!visited.has(v)) {
      visited.add(v);
      queue.push(v);
    }
  }
}
console.log('BFS Order:', order);`,java:`class Main {
    public static void main(String[] args) {
        int[][] adj = {
            {1, 2},
            {0, 3, 4},
            {0, 4},
            {1, 5},
            {1, 2, 5},
            {3, 4}
        };
        Set<Integer> visited = new HashSet<>();
        visited.add(0);
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(0);
        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            order.add(u);
            for (int v : adj[u]) {
                if (!visited.contains(v)) {
                    visited.add(v);
                    queue.offer(v);
                }
            }
        }
        System.out.println("BFS Order:");
    }
}`,cpp:`int main() {
    vector<vector<int>> adj = {
        {1, 2},
        {0, 3, 4},
        {0, 4},
        {1, 5},
        {1, 2, 5},
        {3, 4}
    };
    unordered_set<int> visited;
    visited.insert(0);
    queue<int> q;
    q.push(0);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (!visited.count(v)) {
                visited.insert(v);
                q.push(v);
            }
        }
    }
    return 0;
}`,c:`int main() {
    int deg[] = {2, 3, 2, 2, 3, 2};
    int adj[6][3] = {
        {1, 2, -1},
        {0, 3, 4},
        {0, 4, -1},
        {1, 5, -1},
        {1, 2, 5},
        {3, 4, -1}
    };
    int visited[6] = {0, 0, 0, 0, 0, 0};
    visited[0] = 1;
    int queue[10];
    int front = 0, back = 0;
    queue[back++] = 0;
    int order[6];
    int k = 0;
    while (front < back) {
        int u = queue[front++];
        order[k++] = u;
        for (int j = 0; j < deg[u]; j++) {
            int v = adj[u][j];
            if (!visited[v]) {
                visited[v] = 1;
                queue[back++] = v;
            }
        }
    }
    return 0;
}`,csharp:`public class Program {
    public static void Main() {
        int[][] adj = new int[][] {
            new int[] {1, 2},
            new int[] {0, 3, 4},
            new int[] {0, 4},
            new int[] {1, 5},
            new int[] {1, 2, 5},
            new int[] {3, 4}
        };
        var visited = new HashSet<int>();
        visited.Add(0);
        var queue = new Queue<int>();
        queue.Enqueue(0);
        var order = new List<int>();
        while (queue.Count > 0) {
            int u = queue.Dequeue();
            order.Add(u);
            foreach (int v in adj[u]) {
                if (!visited.Contains(v)) {
                    visited.Add(v);
                    queue.Enqueue(v);
                }
            }
        }
    }
}`},testCases:[{id:`pg-bfs`,label:`Run Script`,args:[],expected:null}]},{id:`playground-scratchpad`,number:903,title:`Playground: Free DSA Scratchpad`,difficulty:`Playground`,category:`Sorting & Playground`,tags:[`Playground`,`Custom Code`],isPlayground:!0,entryFunction:``,params:[],returnType:`any`,compareMode:`playground`,description:"Write **anything from scratch** — `TreeNode`, `ListNode`, arrays, hash maps, stacks, queues, dynamic programming, or recursive algorithms — and immediately watch your own code execute step-by-step!",examples:[{input:`Build a TreeNode or ListNode or array algorithm`,output:`Live trace visualization`}],constraints:[`Built-in classes available: ListNode, TreeNode, GraphNode`],hints:["Try building a small Binary Tree with `new TreeNode(...)` and writing an inorder DFS!"],timeComplexity:`Custom`,spaceComplexity:`Custom`,visualHint:{primaryStructure:`auto`,description:`Auto-detects every variable and data structure in your script!`},starterCode:{python:`# Build any data structure and visualize your code!
root = TreeNode(10,
    TreeNode(5, TreeNode(2), TreeNode(7)),
    TreeNode(15, None, TreeNode(20))
)

inorder = []
def dfs(node):
    if not node:
        return
    dfs(node.left)
    inorder.append(node.val)
    dfs(node.right)

dfs(root)
print("Inorder:", inorder)`,javascript:`// Build any data structure and visualize your code!
const root = new TreeNode(10,
  new TreeNode(5, new TreeNode(2), new TreeNode(7)),
  new TreeNode(15, null, new TreeNode(20))
);

const inorder = [];
function dfs(node) {
  if (!node) return;
  dfs(node.left);
  inorder.push(node.val);
  dfs(node.right);
}

dfs(root);
console.log('Inorder:', inorder);`,java:`class Main {
    static void dfs(TreeNode node, List<Integer> inorder) {
        if (node == null) return;
        dfs(node.left, inorder);
        inorder.add(node.val);
        dfs(node.right, inorder);
    }
    public static void main(String[] args) {
        TreeNode root = new TreeNode(10,
            new TreeNode(5, new TreeNode(2), new TreeNode(7)),
            new TreeNode(15, null, new TreeNode(20))
        );
        List<Integer> inorder = new ArrayList<>();
        dfs(root, inorder);
        System.out.println("Inorder done");
    }
}`,cpp:`void dfs(TreeNode* node, vector<int>& inorder) {
    if (!node) return;
    dfs(node->left, inorder);
    inorder.push_back(node->val);
    dfs(node->right, inorder);
}

int main() {
    TreeNode* root = new TreeNode(10,
        new TreeNode(5, new TreeNode(2), new TreeNode(7)),
        new TreeNode(15, nullptr, new TreeNode(20))
    );
    vector<int> inorder;
    dfs(root, inorder);
    return 0;
}`,c:`struct TreeNode* makeNode(int val, struct TreeNode* left, struct TreeNode* right) {
    struct TreeNode* n = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    n->val = val;
    n->left = left;
    n->right = right;
    return n;
}

void dfs(struct TreeNode* node, int* inorder, int* idx) {
    if (node == NULL) return;
    dfs(node->left, inorder, idx);
    inorder[(*idx)++] = node->val;
    dfs(node->right, inorder, idx);
}

int main() {
    struct TreeNode* root = makeNode(10,
        makeNode(5, makeNode(2, NULL, NULL), makeNode(7, NULL, NULL)),
        makeNode(15, NULL, makeNode(20, NULL, NULL))
    );
    int inorder[10];
    int idx[1] = {0};
    dfs(root, inorder, idx);
    return 0;
}`,csharp:`public class Program {
    static void Dfs(TreeNode node, List<int> inorder) {
        if (node == null) return;
        Dfs(node.left, inorder);
        inorder.Add(node.val);
        Dfs(node.right, inorder);
    }
    public static void Main() {
        TreeNode root = new TreeNode(10,
            new TreeNode(5, new TreeNode(2), new TreeNode(7)),
            new TreeNode(15, null, new TreeNode(20))
        );
        var inorder = new List<int>();
        Dfs(root, inorder);
    }
}`},optimalCode:{python:`# Build any data structure and visualize your code!
root = TreeNode(10,
    TreeNode(5, TreeNode(2), TreeNode(7)),
    TreeNode(15, None, TreeNode(20))
)

inorder = []
def dfs(node):
    if not node:
        return
    dfs(node.left)
    inorder.append(node.val)
    dfs(node.right)

dfs(root)
print("Inorder:", inorder)`,javascript:`// Build any data structure and visualize your code!
const root = new TreeNode(10,
  new TreeNode(5, new TreeNode(2), new TreeNode(7)),
  new TreeNode(15, null, new TreeNode(20))
);

const inorder = [];
function dfs(node) {
  if (!node) return;
  dfs(node.left);
  inorder.push(node.val);
  dfs(node.right);
}

dfs(root);
console.log('Inorder:', inorder);`,java:`class Main {
    static void dfs(TreeNode node, List<Integer> inorder) {
        if (node == null) return;
        dfs(node.left, inorder);
        inorder.add(node.val);
        dfs(node.right, inorder);
    }
    public static void main(String[] args) {
        TreeNode root = new TreeNode(10,
            new TreeNode(5, new TreeNode(2), new TreeNode(7)),
            new TreeNode(15, null, new TreeNode(20))
        );
        List<Integer> inorder = new ArrayList<>();
        dfs(root, inorder);
        System.out.println("Inorder done");
    }
}`,cpp:`void dfs(TreeNode* node, vector<int>& inorder) {
    if (!node) return;
    dfs(node->left, inorder);
    inorder.push_back(node->val);
    dfs(node->right, inorder);
}

int main() {
    TreeNode* root = new TreeNode(10,
        new TreeNode(5, new TreeNode(2), new TreeNode(7)),
        new TreeNode(15, nullptr, new TreeNode(20))
    );
    vector<int> inorder;
    dfs(root, inorder);
    return 0;
}`,c:`struct TreeNode* makeNode(int val, struct TreeNode* left, struct TreeNode* right) {
    struct TreeNode* n = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    n->val = val;
    n->left = left;
    n->right = right;
    return n;
}

void dfs(struct TreeNode* node, int* inorder, int* idx) {
    if (node == NULL) return;
    dfs(node->left, inorder, idx);
    inorder[(*idx)++] = node->val;
    dfs(node->right, inorder, idx);
}

int main() {
    struct TreeNode* root = makeNode(10,
        makeNode(5, makeNode(2, NULL, NULL), makeNode(7, NULL, NULL)),
        makeNode(15, NULL, makeNode(20, NULL, NULL))
    );
    int inorder[10];
    int idx[1] = {0};
    dfs(root, inorder, idx);
    return 0;
}`,csharp:`public class Program {
    static void Dfs(TreeNode node, List<int> inorder) {
        if (node == null) return;
        Dfs(node.left, inorder);
        inorder.Add(node.val);
        Dfs(node.right, inorder);
    }
    public static void Main() {
        TreeNode root = new TreeNode(10,
            new TreeNode(5, new TreeNode(2), new TreeNode(7)),
            new TreeNode(15, null, new TreeNode(20))
        );
        var inorder = new List<int>();
        Dfs(root, inorder);
    }
}`},testCases:[{id:`pg-free`,label:`Run Script`,args:[],expected:null}]}],x=[{id:`rotting-oranges`,number:994,title:`Rotting Oranges`,scenario:`Warehouse Robot / Server Broadcast`,difficulty:`Medium`,category:`Graphs`,tags:[`Matrix`,`Multi-Source BFS`,`Queue`],entryFunction:`orangesRotting`,params:[{name:`grid`,type:`number[][]`}],returnType:`number`,compareMode:`exact`,description:"You are given an `m x n` grid where each cell can have one of three values:\n- `0`: empty cell,\n- `1`: fresh orange (unreached node),\n- `2`: rotten orange (broadcast source).\n\nEvery minute, any fresh cell 4-directionally adjacent to a rotten cell becomes rotten.\n\nReturn the **minimum number of minutes** that must elapse until no fresh cell remains, or `-1` if impossible.",examples:[{input:`grid = [[2,1,1],[1,1,0],[0,1,1]]`,output:`4`,explanation:`Rot spreads layer-by-layer simultaneously from (0, 0) in 4 minutes.`},{input:`grid = [[2,1,1],[0,1,1],[1,0,1]]`,output:`-1`,explanation:`Bottom-left orange is unreachable.`},{input:`grid = [[0,2]]`,output:`0`}],constraints:[`1 <= m, n <= 10`,`grid[r][c] is 0, 1, or 2.`],hints:["Push ALL initially rotten `(r, c)` cells into `collections.deque` (Queue) together before starting BFS.","Mark visited cells `grid[nr][nc] = 2` in-place immediately on enqueue so nothing gets queued twice."],timeComplexity:`O(R * C)`,spaceComplexity:`O(R * C)`,visualHint:{primaryStructure:`matrix`,highlightPointers:[`r`,`c`],description:"Multi-source BFS wavefront spreading from `2` cells through `1` cells minute by minute."},starterCode:{python:`def orangesRotting(grid):
    # Multi-source BFS with collections.deque
    pass`,javascript:`function orangesRotting(grid) {
  // Write your solution here
  
}`,java:`class Solution {
    public int orangesRotting(int[][] grid) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        return 0;
    }
};`,c:`int orangesRotting(int** grid, int gridSize, int* gridColSize) {
    return 0;
}`,csharp:`public class Solution {
    public int OrangesRotting(int[][] grid) {
        return 0;
    }
}`},optimalCode:{python:`def orangesRotting(grid):
    rows, cols = len(grid), len(grid[0])
    q = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                q.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    minutes = 0
    dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    while q and fresh > 0:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1
    return minutes if fresh == 0 else -1`,javascript:`function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const q = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  let minutes = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (q.length > 0 && fresh > 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          q.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,java:`class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) q.offer(new int[] {r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        int minutes = 0;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.isEmpty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0];
                    int nc = cur[1] + d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.offer(new int[] {nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`,cpp:`class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        int minutes = 0;
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        while (!q.empty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto cur = q.front();
                q.pop();
                for (int d = 0; d < 4; d++) {
                    int nr = cur.first + dr[d];
                    int nc = cur.second + dc[d];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
};`,c:`int orangesRotting(int** grid, int gridSize, int* gridColSize) {
    int rows = gridSize;
    int cols = gridColSize[0];
    int qr[105], qc[105];
    int front = 0, back = 0;
    int fresh = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == 2) {
                qr[back] = r;
                qc[back] = c;
                back++;
            } else if (grid[r][c] == 1) {
                fresh++;
            }
        }
    }
    int minutes = 0;
    int dr[4] = {1, -1, 0, 0};
    int dc[4] = {0, 0, 1, -1};
    while (front < back && fresh > 0) {
        int size = back - front;
        for (int i = 0; i < size; i++) {
            int r = qr[front];
            int c = qc[front];
            front++;
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    qr[back] = nr;
                    qc[back] = nc;
                    back++;
                }
            }
        }
        minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,csharp:`public class Solution {
    public int OrangesRotting(int[][] grid) {
        int rows = grid.Length;
        int cols = grid[0].Length;
        var q = new Queue<int[]>();
        int fresh = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) q.Enqueue(new int[] {r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        int minutes = 0;
        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};
        while (q.Count > 0 && fresh > 0) {
            int size = q.Count;
            for (int i = 0; i < size; i++) {
                int[] cur = q.Dequeue();
                for (int d = 0; d < 4; d++) {
                    int nr = cur[0] + dr[d];
                    int nc = cur[1] + dc[d];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.Enqueue(new int[] {nr, nc});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`},testCases:[{id:`ro-1`,label:`Case 1`,args:[[[2,1,1],[1,1,0],[0,1,1]]],expected:4},{id:`ro-2`,label:`Unreachable`,args:[[[2,1,1],[0,1,1],[1,0,1]]],expected:-1},{id:`ro-3`,label:`Already Done`,args:[[[0,2]]],expected:0},{id:`ro-4`,label:`Multi-Source`,args:[[[2,1,1],[1,1,1],[1,1,2]]],expected:2,isHidden:!0}]},{id:`shortest-path-binary-matrix`,number:1091,title:`Shortest Path in Binary Matrix`,scenario:`Warehouse Robot / Server Broadcast`,difficulty:`Medium`,category:`Graphs`,tags:[`Matrix`,`BFS`,`Shortest Path`],entryFunction:`shortestPathBinaryMatrix`,params:[{name:`grid`,type:`number[][]`}],returnType:`number`,compareMode:`exact`,description:"Given an `n x n` binary matrix `grid`, return the length of the shortest **clear path** from `(0, 0)` to `(n - 1, n - 1)`. If there is no clear path, return `-1`.\n\nA clear path visits only `0` cells moving in any **8 directions** (horizontal, vertical, or diagonal). Length is the number of visited cells.",examples:[{input:`grid = [[0,1],[1,0]]`,output:`2`},{input:`grid = [[0,0,0],[1,1,0],[1,1,0]]`,output:`4`},{input:`grid = [[1,0,0],[1,1,0],[1,1,0]]`,output:`-1`}],constraints:[`n == grid.length == grid[i].length`,`1 <= n <= 100`],hints:["Check early exit: if `grid[0][0] === 1 || grid[n-1][n-1] === 1`, return `-1`.","Run 8-directional BFS starting from `(0, 0, dist=1)` marking visited cells `grid[nr][nc] = 1` on enqueue."],timeComplexity:`O(R * C)`,spaceComplexity:`O(R * C)`,visualHint:{primaryStructure:`matrix`,highlightPointers:[`r`,`c`],description:`Robot shortest-path 8-directional BFS wavefront over binary floor grid.`},starterCode:{python:`def shortestPathBinaryMatrix(grid):
    # Write your BFS solution here
    pass`,javascript:`function shortestPathBinaryMatrix(grid) {
  // Write your solution here
  
}`,java:`class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        return -1;
    }
}`,cpp:`class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        return -1;
    }
};`,c:`int shortestPathBinaryMatrix(int** grid, int gridSize, int* gridColSize) {
    return -1;
}`,csharp:`public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        return -1;
    }
}`},optimalCode:{python:`def shortestPathBinaryMatrix(grid):
    n = len(grid)
    if grid[0][0] == 1 or grid[n - 1][n - 1] == 1:
        return -1
    q = deque([(0, 0, 1)])
    grid[0][0] = 1
    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

    while q:
        r, c, dist = q.popleft()
        if r == n - 1 and c == n - 1:
            return dist
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                q.append((nr, nc, dist + 1))
    return -1`,javascript:`function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
  const q = [[0, 0, 1]];
  grid[0][0] = 1;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

  while (q.length > 0) {
    const [r, c, dist] = q.shift();
    if (r === n - 1 && c === n - 1) return dist;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        q.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}`,java:`class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[] {0, 0, 1});
        grid[0][0] = 1;
        int[][] dirs = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0], c = cur[1], dist = cur[2];
            if (r == n - 1 && c == n - 1) return dist;
            for (int[] d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    q.offer(new int[] {nr, nc, dist + 1});
                }
            }
        }
        return -1;
    }
}`,cpp:`class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
        queue<vector<int>> q;
        q.push({0, 0, 1});
        grid[0][0] = 1;
        int dr[8] = {-1,-1,-1,0,0,1,1,1};
        int dc[8] = {-1,0,1,-1,1,-1,0,1};
        while (!q.empty()) {
            auto cur = q.front();
            q.pop();
            int r = cur[0], c = cur[1], dist = cur[2];
            if (r == n - 1 && c == n - 1) return dist;
            for (int d = 0; d < 8; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    q.push({nr, nc, dist + 1});
                }
            }
        }
        return -1;
    }
};`,c:`int shortestPathBinaryMatrix(int** grid, int gridSize, int* gridColSize) {
    int n = gridSize;
    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
    int qr[2500], qc[2500], qd[2500];
    int front = 0, back = 0;
    qr[back] = 0; qc[back] = 0; qd[back] = 1; back++;
    grid[0][0] = 1;
    int dr[8] = {-1,-1,-1,0,0,1,1,1};
    int dc[8] = {-1,0,1,-1,1,-1,0,1};
    while (front < back) {
        int r = qr[front];
        int c = qc[front];
        int dist = qd[front];
        front++;
        if (r == n - 1 && c == n - 1) return dist;
        for (int d = 0; d < 8; d++) {
            int nr = r + dr[d];
            int nc = c + dc[d];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                grid[nr][nc] = 1;
                qr[back] = nr; qc[back] = nc; qd[back] = dist + 1;
                back++;
            }
        }
    }
    return -1;
}`,csharp:`public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        int n = grid.Length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;
        var q = new Queue<int[]>();
        q.Enqueue(new int[] {0, 0, 1});
        grid[0][0] = 1;
        int[] dr = {-1,-1,-1,0,0,1,1,1};
        int[] dc = {-1,0,1,-1,1,-1,0,1};
        while (q.Count > 0) {
            int[] cur = q.Dequeue();
            int r = cur[0], c = cur[1], dist = cur[2];
            if (r == n - 1 && c == n - 1) return dist;
            for (int d = 0; d < 8; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1;
                    q.Enqueue(new int[] {nr, nc, dist + 1});
                }
            }
        }
        return -1;
    }
}`},testCases:[{id:`spbm-1`,label:`Case 1`,args:[[[0,1],[1,0]]],expected:2},{id:`spbm-2`,label:`Case 2`,args:[[[0,0,0],[1,1,0],[1,1,0]]],expected:4},{id:`spbm-3`,label:`Blocked Start`,args:[[[1,0,0],[1,1,0],[1,1,0]]],expected:-1},{id:`spbm-4`,label:`Single Zero`,args:[[[0]]],expected:1,isHidden:!0}]},{id:`right-side-view`,number:199,title:`Binary Tree Right Side View`,scenario:`Category Hierarchy / Permission Tree`,difficulty:`Medium`,category:`Trees`,tags:[`Tree`,`BFS`,`DFS`],entryFunction:`rightSideView`,params:[{name:`root`,type:`binaryTree`}],returnType:`number[]`,compareMode:`exact`,description:"Given the `root` of a binary tree, imagine yourself standing on the **right side** of it; return the values of the nodes you can see ordered from top to bottom.",examples:[{input:`root = [1, 2, 3, null, 5, null, 4]`,output:`[1, 3, 4]`},{input:`root = [1, null, 3]`,output:`[1, 3]`},{input:`root = []`,output:`[]`}],constraints:[`The number of nodes is in range [0, 100].`],hints:[`Run level-order BFS with a FIFO queue.`,"For each depth level, record the LAST node dequeued (`i === levelSize - 1`)."],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`tree`,description:`Level-order BFS selecting the rightmost node at each hierarchy depth.`},starterCode:{python:`def rightSideView(root):
    # Write your solution here
    pass`,javascript:`function rightSideView(root) {
  // Write your solution here
  
}`,java:`class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        return new ArrayList<>();
    }
}`,cpp:`class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        return {};
    }
};`,c:`int* rightSideView(struct TreeNode* root, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public IList<int> RightSideView(TreeNode root) {
        return new List<int>();
    }
}`},optimalCode:{python:`def rightSideView(root):
    if not root:
        return []
    res = []
    q = deque([root])
    while q:
        level_size = len(q)
        for i in range(level_size):
            node = q.popleft()
            if i == level_size - 1:
                res.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
    return res`,javascript:`function rightSideView(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length > 0) {
    const levelSize = q.length;
    for (let i = 0; i < levelSize; i++) {
      const node = q.shift();
      if (i === levelSize - 1) res.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return res;
}`,java:`class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int levelSize = q.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = q.poll();
                if (i == levelSize - 1) res.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return res;
    }
}`,cpp:`class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int levelSize = q.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                if (i == levelSize - 1) res.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};`,c:`int* rightSideView(struct TreeNode* root, int* returnSize) {
    *returnSize = 0;
    if (root == NULL) return NULL;
    int* res = (int*)malloc(105 * sizeof(int));
    struct TreeNode* q[105];
    int front = 0, back = 0;
    q[back++] = root;
    while (front < back) {
        int levelSize = back - front;
        for (int i = 0; i < levelSize; i++) {
            struct TreeNode* node = q[front++];
            if (i == levelSize - 1) {
                res[(*returnSize)++] = node->val;
            }
            if (node->left != NULL) q[back++] = node->left;
            if (node->right != NULL) q[back++] = node->right;
        }
    }
    return res;
}`,csharp:`public class Solution {
    public IList<int> RightSideView(TreeNode root) {
        var res = new List<int>();
        if (root == null) return res;
        var q = new Queue<TreeNode>();
        q.Enqueue(root);
        while (q.Count > 0) {
            int levelSize = q.Count;
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = q.Dequeue();
                if (i == levelSize - 1) res.Add(node.val);
                if (node.left != null) q.Enqueue(node.left);
                if (node.right != null) q.Enqueue(node.right);
            }
        }
        return res;
    }
}`},testCases:[{id:`rsv-1`,label:`Case 1`,args:[[1,2,3,null,5,null,4]],expected:[1,3,4]},{id:`rsv-2`,label:`Left Shadow`,args:[[1,2,3,4]],expected:[1,3,4]},{id:`rsv-3`,label:`Empty`,args:[[]],expected:[]}]},{id:`path-sum-ii`,number:113,title:`Path Sum II`,scenario:`Category Hierarchy / Permission Tree`,difficulty:`Medium`,category:`Trees`,tags:[`Tree`,`Backtracking`,`DFS`],entryFunction:`pathSum`,params:[{name:`root`,type:`binaryTree`},{name:`targetSum`,type:`number`}],returnType:`number[][]`,compareMode:`exact`,description:"Given the `root` of a binary tree and an integer `targetSum`, return all **root-to-leaf paths** where the sum of node values along the path equals `targetSum`.",examples:[{input:`root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22`,output:`[[5,4,11,2],[5,8,4,5]]`},{input:`root = [1,2,3], targetSum = 5`,output:`[]`}],constraints:[`The number of nodes is in range [0, 5000].`],hints:["Append `node.val` to `path` on entry and decrement `remaining -= node.val`.","Copy `path` into `result` at leaves where `remaining === 0`, then `path.pop()` before returning to backtrack cleanly."],timeComplexity:`O(n^2) worst / O(n) traverse`,spaceComplexity:`O(h)`,visualHint:{primaryStructure:`tree`,description:"Recursive backtracking along the tree with live `path` stack and `remaining` sum."},starterCode:{python:`def pathSum(root, targetSum):
    # Write your solution here
    pass`,javascript:`function pathSum(root, targetSum) {
  // Write your solution here
  
}`,java:`class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        return new ArrayList<>();
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        return {};
    }
};`,c:`int** pathSum(struct TreeNode* root, int targetSum, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public IList<IList<int>> PathSum(TreeNode root, int targetSum) {
        return new List<IList<int>>();
    }
}`},optimalCode:{python:`def pathSum(root, targetSum):
    res = []
    path = []

    def dfs(node, remaining):
        if not node:
            return
        path.append(node.val)
        remaining -= node.val
        if not node.left and not node.right and remaining == 0:
            res.append(list(path))
        else:
            dfs(node.left, remaining)
            dfs(node.right, remaining)
        path.pop()

    dfs(root, targetSum)
    return res`,javascript:`function pathSum(root, targetSum) {
  const res = [];
  const path = [];

  function dfs(node, remaining) {
    if (!node) return;
    path.push(node.val);
    remaining -= node.val;
    if (!node.left && !node.right && remaining === 0) {
      res.push([...path]);
    } else {
      dfs(node.left, remaining);
      dfs(node.right, remaining);
    }
    path.pop();
  }

  dfs(root, targetSum);
  return res;
}`,java:`class Solution {
    private void dfs(TreeNode node, int remaining, List<Integer> path, List<List<Integer>> res) {
        if (node == null) return;
        path.add(node.val);
        remaining -= node.val;
        if (node.left == null && node.right == null && remaining == 0) {
            res.add(new ArrayList<>(path));
        } else {
            dfs(node.left, remaining, path, res);
            dfs(node.right, remaining, path, res);
        }
        path.remove(path.size() - 1);
    }
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(root, targetSum, new ArrayList<>(), res);
        return res;
    }
}`,cpp:`class Solution {
public:
    void dfs(TreeNode* node, int remaining, vector<int>& path, vector<vector<int>>& res) {
        if (!node) return;
        path.push_back(node->val);
        remaining -= node->val;
        if (!node->left && !node->right && remaining == 0) {
            res.push_back(vector<int>(path));
        } else {
            dfs(node->left, remaining, path, res);
            dfs(node->right, remaining, path, res);
        }
        path.pop_back();
    }
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(root, targetSum, path, res);
        return res;
    }
};`,c:`void dfsPath(struct TreeNode* node, int remaining, int* path, int depth, int** res, int* returnSize, int* colSizes) {
    if (node == NULL) return;
    path[depth] = node->val;
    remaining -= node->val;
    if (node->left == NULL && node->right == NULL && remaining == 0) {
        int* copy = (int*)malloc((depth + 1) * sizeof(int));
        for (int i = 0; i <= depth; i++) copy[i] = path[i];
        res[*returnSize] = copy;
        colSizes[*returnSize] = depth + 1;
        (*returnSize)++;
        return;
    }
    dfsPath(node->left, remaining, path, depth + 1, res, returnSize, colSizes);
    dfsPath(node->right, remaining, path, depth + 1, res, returnSize, colSizes);
}
int** pathSum(struct TreeNode* root, int targetSum, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    int** res = (int**)malloc(500 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(500 * sizeof(int));
    int path[500];
    dfsPath(root, targetSum, path, 0, res, returnSize, *returnColumnSizes);
    return res;
}`,csharp:`public class Solution {
    private void Dfs(TreeNode node, int remaining, List<int> path, List<IList<int>> res) {
        if (node == null) return;
        path.Add(node.val);
        remaining -= node.val;
        if (node.left == null && node.right == null && remaining == 0) {
            res.Add(new List<int>(path));
        } else {
            Dfs(node.left, remaining, path, res);
            Dfs(node.right, remaining, path, res);
        }
        path.RemoveAt(path.Count - 1);
    }
    public IList<IList<int>> PathSum(TreeNode root, int targetSum) {
        var res = new List<IList<int>>();
        Dfs(root, targetSum, new List<int>(), res);
        return res;
    }
}`},testCases:[{id:`ps2-1`,label:`Case 1`,args:[[5,4,8,11,null,13,4,7,2,null,null,5,1],22],expected:[[5,4,11,2],[5,8,4,5]]},{id:`ps2-2`,label:`No Match`,args:[[1,2,3],5],expected:[]},{id:`ps2-3`,label:`Empty Tree`,args:[[],0],expected:[]}]},{id:`lowest-common-ancestor`,number:236,title:`Lowest Common Ancestor of a Binary Tree`,scenario:`Category Hierarchy / Permission Tree`,difficulty:`Medium`,category:`Trees`,tags:[`Tree`,`DFS`,`Recursion`],entryFunction:`lowestCommonAncestor`,params:[{name:`root`,type:`binaryTree`},{name:`p`,type:`treeNodeRef`},{name:`q`,type:`treeNodeRef`}],returnType:`treeNodeVal`,compareMode:`exact`,description:"Given a binary tree (`root`) and two target nodes `p` and `q`, find their **lowest common ancestor (LCA)** — the lowest node in the tree that has both `p` and `q` as descendants (a node can be a descendant of itself).",examples:[{input:`root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1`,output:`3`},{input:`root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4`,output:`5`}],constraints:[`All Node.val are unique.`,`p != q and both exist in root.`],hints:["If `root` is null, `p`, or `q`, return `root` directly.","Recurse into `left` and `right`: if both sides return non-null nodes, `root` is their split point (LCA); otherwise return whichever side is non-null."],timeComplexity:`O(n)`,spaceComplexity:`O(h)`,visualHint:{primaryStructure:`tree`,description:"Bottom-up recursion bubbling target hits `p` and `q` until they meet at their LCA."},starterCode:{python:`def lowestCommonAncestor(root, p, q):
    # p and q are TreeNode references in root
    pass`,javascript:`function lowestCommonAncestor(root, p, q) {
  // p and q are TreeNode references in root
  
}`,java:`class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        return null;
    }
}`,cpp:`class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        return nullptr;
    }
};`,c:`struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    return NULL;
}`,csharp:`public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        return null;
    }
}`},optimalCode:{python:`def lowestCommonAncestor(root, p, q):
    if root is None or root is p or root is q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left is not None and right is not None:
        return root
    return left if left is not None else right`,javascript:`function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}`,java:`class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,cpp:`class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (root == nullptr || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left != nullptr && right != nullptr) return root;
        return left != nullptr ? left : right;
    }
};`,c:`struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    if (root == NULL || root == p || root == q) return root;
    struct TreeNode* left = lowestCommonAncestor(root->left, p, q);
    struct TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left != NULL && right != NULL) return root;
    return left != NULL ? left : right;
}`,csharp:`public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = LowestCommonAncestor(root.left, p, q);
        TreeNode right = LowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`},testCases:[{id:`lca-1`,label:`Case 1`,args:[[3,5,1,6,2,0,8,null,null,7,4],5,1],expected:3},{id:`lca-2`,label:`Ancestor Self`,args:[[3,5,1,6,2,0,8,null,null,7,4],5,4],expected:5},{id:`lca-3`,label:`Two Nodes`,args:[[1,2],1,2],expected:1,isHidden:!0}]},{id:`max-sum-distinct-subarrays`,number:2461,title:`Maximum Sum of Distinct Subarrays With Length K`,scenario:`Kindle / CloudWatch Traffic Spike`,difficulty:`Medium`,category:`Sliding Window`,tags:[`Array`,`Sliding Window`,`Hash Table`],entryFunction:`maximumSubarraySum`,params:[{name:`nums`,type:`number[]`},{name:`k`,type:`number`}],returnType:`number`,compareMode:`exact`,description:"You are given an integer array `nums` (e.g. request traffic spikes) and an integer `k`. Find the **maximum subarray sum** of all subarrays of `nums` that meet:\n1. Length of the subarray is exactly `k`, and\n2. All elements in the subarray are **distinct**.\n\nReturn `0` if no valid subarray exists.",examples:[{input:`nums = [1, 5, 4, 2, 9, 9, 9], k = 3`,output:`15`,explanation:`[4, 2, 9] has 3 distinct items summing to 15.`},{input:`nums = [4, 4, 4], k = 3`,output:`0`}],constraints:[`1 <= k <= nums.length <= 10^5`],hints:["Maintain a `counts` frequency map and `windowSum` across `[left .. right]`.","Whenever `right - left + 1 > k` or `counts[nums[right]] > 1`, shrink `left` until both constraints hold; record `maxSum` whenever size equals `k` and `len(counts) == k`."],timeComplexity:`O(n)`,spaceComplexity:`O(k)`,visualHint:{primaryStructure:`array`,highlightPointers:[`left`,`right`],description:"Fixed-k sliding window `[left..right]` with uniqueness `counts` map and `windowSum`."},starterCode:{python:`def maximumSubarraySum(nums, k):
    # Write your solution here
    pass`,javascript:`function maximumSubarraySum(nums, k) {
  // Write your solution here
  
}`,java:`class Solution {
    public long maximumSubarraySum(int[] nums, int k) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    long long maximumSubarraySum(vector<int>& nums, int k) {
        return 0;
    }
};`,c:`long long maximumSubarraySum(int* nums, int numsSize, int k) {
    return 0;
}`,csharp:`public class Solution {
    public long MaximumSubarraySum(int[] nums, int k) {
        return 0;
    }
}`},optimalCode:{python:`def maximumSubarraySum(nums, k):
    counts = {}
    windowSum = 0
    maxSum = 0
    left = 0

    for right in range(len(nums)):
        val = nums[right]
        windowSum += val
        counts[val] = counts.get(val, 0) + 1

        while right - left + 1 > k or counts[val] > 1:
            rem = nums[left]
            windowSum -= rem
            counts[rem] -= 1
            if counts[rem] == 0:
                del counts[rem]
            left += 1

        if right - left + 1 == k:
            maxSum = max(maxSum, windowSum)
    return maxSum`,javascript:`function maximumSubarraySum(nums, k) {
  const counts = new Map();
  let windowSum = 0;
  let maxSum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    const val = nums[right];
    windowSum += val;
    counts.set(val, (counts.get(val) || 0) + 1);

    while (right - left + 1 > k || counts.get(val) > 1) {
      const rem = nums[left];
      windowSum -= rem;
      const nextCnt = counts.get(rem) - 1;
      if (nextCnt === 0) counts.delete(rem);
      else counts.set(rem, nextCnt);
      left++;
    }

    if (right - left + 1 === k) {
      maxSum = Math.max(maxSum, windowSum);
    }
  }
  return maxSum;
}`,java:`class Solution {
    public long maximumSubarraySum(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        long windowSum = 0;
        long maxSum = 0;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            int val = nums[right];
            windowSum += val;
            counts.put(val, counts.getOrDefault(val, 0) + 1);
            while (right - left + 1 > k || counts.get(val) > 1) {
                int rem = nums[left];
                windowSum -= rem;
                counts.put(rem, counts.get(rem) - 1);
                if (counts.get(rem) == 0) counts.remove(rem);
                left++;
            }
            if (right - left + 1 == k) {
                maxSum = Math.max(maxSum, windowSum);
            }
        }
        return maxSum;
    }
}`,cpp:`class Solution {
public:
    long long maximumSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        long long windowSum = 0;
        long long maxSum = 0;
        int left = 0;
        for (int right = 0; right < nums.size(); right++) {
            int val = nums[right];
            windowSum += val;
            counts[val]++;
            while (right - left + 1 > k || counts[val] > 1) {
                int rem = nums[left];
                windowSum -= rem;
                counts[rem]--;
                if (counts[rem] == 0) counts.erase(rem);
                left++;
            }
            if (right - left + 1 == k) {
                if (windowSum > maxSum) maxSum = windowSum;
            }
        }
        return maxSum;
    }
};`,c:`long long maximumSubarraySum(int* nums, int numsSize, int k) {
    int maxVal = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    int* counts = (int*)calloc(maxVal + 2, sizeof(int));
    long long windowSum = 0;
    long long maxSum = 0;
    int left = 0;
    for (int right = 0; right < numsSize; right++) {
        int val = nums[right];
        windowSum += val;
        counts[val]++;
        while (right - left + 1 > k || counts[val] > 1) {
            int rem = nums[left];
            windowSum -= rem;
            counts[rem]--;
            left++;
        }
        if (right - left + 1 == k && windowSum > maxSum) {
            maxSum = windowSum;
        }
    }
    return maxSum;
}`,csharp:`public class Solution {
    public long MaximumSubarraySum(int[] nums, int k) {
        var counts = new Dictionary<int, int>();
        long windowSum = 0;
        long maxSum = 0;
        int left = 0;
        for (int right = 0; right < nums.Length; right++) {
            int val = nums[right];
            windowSum += val;
            counts[val] = counts.GetValueOrDefault(val, 0) + 1;
            while (right - left + 1 > k || counts[val] > 1) {
                int rem = nums[left];
                windowSum -= rem;
                counts[rem] = counts[rem] - 1;
                if (counts[rem] == 0) counts.Remove(rem);
                left++;
            }
            if (right - left + 1 == k) {
                maxSum = Math.Max(maxSum, windowSum);
            }
        }
        return maxSum;
    }
}`},testCases:[{id:`msd-1`,label:`Case 1`,args:[[1,5,4,2,9,9,9],3],expected:15},{id:`msd-2`,label:`Duplicates`,args:[[4,4,4],3],expected:0},{id:`msd-3`,label:`All Unique`,args:[[9,1,8,2],2],expected:10,isHidden:!0}]},{id:`merge-intervals`,number:56,title:`Merge Intervals`,difficulty:`Medium`,category:`Intervals`,tags:[`Array`,`Sorting`,`Intervals`],entryFunction:`merge`,params:[{name:`intervals`,type:`number[][]`}],returnType:`number[][]`,compareMode:`exact`,description:"Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals sorted by start.",examples:[{input:`intervals = [[1,3],[2,6],[8,10],[15,18]]`,output:`[[1,6],[8,10],[15,18]]`},{input:`intervals = [[1,4],[4,5]]`,output:`[[1,5]]`}],constraints:[`1 <= intervals.length <= 10^4`,`intervals[i].length == 2`],hints:[`Sort intervals ascending by start coordinate.`,"Compare each interval with `merged[last]`: if `cur.start <= merged[last].end`, extend `end = max(end, cur.end)`; else push `[cur.start, cur.end]`."],timeComplexity:`O(n log n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`intervals`,description:`Interactive interval timeline bars showing overlap checks and merged spans.`},starterCode:{python:`def merge(intervals):
    # Write your solution here
    pass`,javascript:`function merge(intervals) {
  // Write your solution here
  
}`,java:`class Solution {
    public int[][] merge(int[][] intervals) {
        return new int[0][0];
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        return {};
    }
};`,c:`int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public int[][] Merge(int[][] intervals) {
        return new int[0][];
    }
}`},optimalCode:{python:`def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [list(intervals[0])]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,javascript:`function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [[intervals[0][0], intervals[0][1]]];
  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i];
    const last = merged[merged.length - 1];
    if (cur[0] <= last[1]) {
      last[1] = Math.max(last[1], cur[1]);
    } else {
      merged.push([cur[0], cur[1]]);
    }
  }
  return merged;
}`,java:`class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> merged = new ArrayList<>();
        for (int[] iv : intervals) {
            if (merged.isEmpty() || iv[0] > merged.get(merged.size() - 1)[1]) {
                merged.add(new int[] {iv[0], iv[1]});
            } else {
                int[] last = merged.get(merged.size() - 1);
                last[1] = Math.max(last[1], iv[1]);
            }
        }
        return merged.toArray(new int[0][]);
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });
        vector<vector<int>> merged;
        for (auto& iv : intervals) {
            if (merged.empty() || iv[0] > merged.back()[1]) {
                merged.push_back({iv[0], iv[1]});
            } else {
                merged.back()[1] = max(merged.back()[1], iv[1]);
            }
        }
        return merged;
    }
};`,c:`int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    for (int i = 0; i < intervalsSize; i++) {
        for (int j = i + 1; j < intervalsSize; j++) {
            if (intervals[j][0] < intervals[i][0]) {
                int* tmp = intervals[i];
                intervals[i] = intervals[j];
                intervals[j] = tmp;
            }
        }
    }
    int** merged = (int**)malloc(intervalsSize * sizeof(int*));
    *returnColumnSizes = (int*)malloc(intervalsSize * sizeof(int));
    int count = 0;
    for (int i = 0; i < intervalsSize; i++) {
        if (count == 0 || intervals[i][0] > merged[count - 1][1]) {
            merged[count] = (int*)malloc(2 * sizeof(int));
            merged[count][0] = intervals[i][0];
            merged[count][1] = intervals[i][1];
            (*returnColumnSizes)[count] = 2;
            count++;
        } else {
            if (intervals[i][1] > merged[count - 1][1]) {
                merged[count - 1][1] = intervals[i][1];
            }
        }
    }
    *returnSize = count;
    return merged;
}`,csharp:`public class Solution {
    public int[][] Merge(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[0] - b[0]);
        var merged = new List<int[]>();
        foreach (var iv in intervals) {
            if (merged.Count == 0 || iv[0] > merged[merged.Count - 1][1]) {
                merged.Add(new int[] {iv[0], iv[1]});
            } else {
                var last = merged[merged.Count - 1];
                last[1] = Math.Max(last[1], iv[1]);
            }
        }
        return merged.ToArray();
    }
}`},testCases:[{id:`mi-1`,label:`Case 1`,args:[[[1,3],[2,6],[8,10],[15,18]]],expected:[[1,6],[8,10],[15,18]]},{id:`mi-2`,label:`Touching`,args:[[[1,4],[4,5]]],expected:[[1,5]]},{id:`mi-3`,label:`Unsorted Enclosing`,args:[[[2,3],[1,10],[4,6]]],expected:[[1,10]],isHidden:!0}]}],S=[{id:`top-k-frequent`,number:347,title:`Top K Frequent Elements`,scenario:`Order Fulfillment / Log Aggregation`,difficulty:`Medium`,category:`Heap & Priority Queue`,tags:[`Heap`,`Hash Table`,`Counting`],entryFunction:`topKFrequent`,params:[{name:`nums`,type:`number[]`},{name:`k`,type:`number`}],returnType:`number[]`,compareMode:`unorderedArray`,description:"Given an integer array `nums` (e.g. product SKUs or error codes in log streams) and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",examples:[{input:`nums = [1, 1, 1, 2, 2, 3], k = 2`,output:`[1, 2]`},{input:`nums = [1], k = 1`,output:`[1]`}],constraints:[`1 <= nums.length <= 10^5`,`1 <= k <= unique elements`],hints:["Count element frequencies in a Hash Map (`counts[val]++`).","Push `(freq, val)` into a **min-heap** and pop whenever `heap.size > k` so the top `k` frequent elements stay in the heap."],timeComplexity:`O(n log k)`,spaceComplexity:`O(n + k)`,visualHint:{primaryStructure:`heap`,description:"Frequency hash table paired with a bounded min-heap of size `k`."},starterCode:{python:`def topKFrequent(nums, k):
    # Count frequencies + min-heap of size k
    pass`,javascript:`function topKFrequent(nums, k) {
  // Use counts Map + new MinHeap((a, b) => a[0] - b[0])
  
}`,java:`class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        return new int[0];
    }
}`,cpp:`class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        return {};
    }
};`,c:`int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        return new int[0];
    }
}`},optimalCode:{python:`def topKFrequent(nums, k):
    counts = {}
    for x in nums:
        counts[x] = counts.get(x, 0) + 1
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    return [pair[1] for pair in heap]`,javascript:`function topKFrequent(nums, k) {
  const counts = new Map();
  for (const x of nums) {
    counts.set(x, (counts.get(x) || 0) + 1);
  }
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  for (const [num, freq] of counts.entries()) {
    heap.push([freq, num]);
    if (heap.size > k) {
      heap.pop();
    }
  }
  const res = [];
  while (heap.size > 0) {
    res.push(heap.pop()[1]);
  }
  return res;
}`,java:`class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) {
            counts.put(x, counts.getOrDefault(x, 0) + 1);
        }
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (int num : counts.keySet()) {
            heap.offer(new int[] {counts.get(num), num});
            if (heap.size() > k) heap.poll();
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = heap.poll()[1];
        }
        return res;
    }
}`,cpp:`class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        for (int x : nums) counts[x]++;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
        for (auto& kv : counts) {
            minHeap.push({kv.second, kv.first});
            if (minHeap.size() > k) minHeap.pop();
        }
        vector<int> res;
        while (!minHeap.empty()) {
            res.push_back(minHeap.top().second);
            minHeap.pop();
        }
        return res;
    }
};`,c:`int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    int vals[1005], freqs[1005];
    int unique = 0;
    for (int i = 0; i < numsSize; i++) {
        int found = -1;
        for (int j = 0; j < unique; j++) {
            if (vals[j] == nums[i]) { found = j; break; }
        }
        if (found >= 0) {
            freqs[found]++;
        } else {
            vals[unique] = nums[i];
            freqs[unique] = 1;
            unique++;
        }
    }
    for (int i = 0; i < unique; i++) {
        for (int j = i + 1; j < unique; j++) {
            if (freqs[j] > freqs[i]) {
                int tf = freqs[i]; freqs[i] = freqs[j]; freqs[j] = tf;
                int tv = vals[i]; vals[i] = vals[j]; vals[j] = tv;
            }
        }
    }
    int* res = (int*)malloc(k * sizeof(int));
    for (int i = 0; i < k; i++) res[i] = vals[i];
    *returnSize = k;
    return res;
}`,csharp:`public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        var counts = new Dictionary<int, int>();
        foreach (int x in nums) {
            counts[x] = counts.GetValueOrDefault(x, 0) + 1;
        }
        var heap = new PriorityQueue<int, int>();
        foreach (int num in counts.Keys) {
            heap.Enqueue(num, counts[num]);
            if (heap.Count > k) heap.Dequeue();
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = heap.Dequeue();
        }
        return res;
    }
}`},testCases:[{id:`tkf-1`,label:`Case 1`,args:[[1,1,1,2,2,3],2],expected:[1,2]},{id:`tkf-2`,label:`Single`,args:[[1],1],expected:[1]},{id:`tkf-3`,label:`Negative Values`,args:[[4,1,-1,2,-1,2,3],2],expected:[-1,2],isHidden:!0}]},{id:`k-closest-points`,number:973,title:`K Closest Points to Origin`,scenario:`Order Fulfillment / Log Aggregation`,difficulty:`Medium`,category:`Heap & Priority Queue`,tags:[`Heap`,`Geometry`,`Sorting`],entryFunction:`kClosest`,params:[{name:`points`,type:`number[][]`},{name:`k`,type:`number`}],returnType:`number[][]`,compareMode:`unorderedOuterArray`,description:"Given an array of `points` where `points[i] = [x_i, y_i]` represents a warehouse drop point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)` in any order.",examples:[{input:`points = [[1,3],[-2,2]], k = 1`,output:`[[-2,2]]`},{input:`points = [[3,3],[5,-1],[-2,4]], k = 2`,output:`[[3,3],[-2,4]]`}],constraints:[`1 <= k <= points.length <= 10^4`],hints:["Avoid floating-point `sqrt`: squared distance `d2 = x*x + y*y` preserves exact order.","Push `(x*x + y*y, x, y)` onto a max-heap of size `k` (or push negated `-d2` into a min-heap) and pop whenever `heap.size > k`."],timeComplexity:`O(n log k)`,spaceComplexity:`O(k)`,visualHint:{primaryStructure:`heap`,description:"Bounded size-k priority queue evicting farthest points by `x² + y²`."},starterCode:{python:`def kClosest(points, k):
    # Max-heap via negated distance or size-k priority queue
    pass`,javascript:`function kClosest(points, k) {
  // Use new MaxHeap((a, b) => a[0] - b[0])
  
}`,java:`class Solution {
    public int[][] kClosest(int[][] points, int k) {
        return new int[0][0];
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        return {};
    }
};`,c:`int** kClosest(int** points, int pointsSize, int* pointsColSize, int k, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public int[][] KClosest(int[][] points, int k) {
        return new int[0][];
    }
}`},optimalCode:{python:`def kClosest(points, k):
    maxHeap = []
    for x, y in points:
        dist = x * x + y * y
        heapq.heappush(maxHeap, (-dist, x, y))
        if len(maxHeap) > k:
            heapq.heappop(maxHeap)
    return [[x, y] for _, x, y in maxHeap]`,javascript:`function kClosest(points, k) {
  const maxHeap = new MaxHeap((a, b) => b[0] - a[0]);
  for (const [x, y] of points) {
    const dist = x * x + y * y;
    maxHeap.push([dist, x, y]);
    if (maxHeap.size > k) {
      maxHeap.pop();
    }
  }
  const res = [];
  while (maxHeap.size > 0) {
    const item = maxHeap.pop();
    res.push([item[1], item[2]]);
  }
  return res;
}`,java:`class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        for (int[] p : points) {
            int dist = p[0] * p[0] + p[1] * p[1];
            maxHeap.offer(new int[] {dist, p[0], p[1]});
            if (maxHeap.size() > k) maxHeap.poll();
        }
        int[][] res = new int[k][2];
        for (int i = 0; i < k; i++) {
            int[] item = maxHeap.poll();
            res[i] = new int[] {item[1], item[2]};
        }
        return res;
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<vector<int>, vector<vector<int>>, less<vector<int>>> maxHeap;
        for (auto& p : points) {
            int dist = p[0] * p[0] + p[1] * p[1];
            maxHeap.push({dist, p[0], p[1]});
            if (maxHeap.size() > k) maxHeap.pop();
        }
        vector<vector<int>> res;
        while (!maxHeap.empty()) {
            auto item = maxHeap.top();
            maxHeap.pop();
            res.push_back({item[1], item[2]});
        }
        return res;
    }
};`,c:`int** kClosest(int** points, int pointsSize, int* pointsColSize, int k, int* returnSize, int** returnColumnSizes) {
    for (int i = 0; i < pointsSize; i++) {
        for (int j = i + 1; j < pointsSize; j++) {
            int d1 = points[i][0] * points[i][0] + points[i][1] * points[i][1];
            int d2 = points[j][0] * points[j][0] + points[j][1] * points[j][1];
            if (d2 < d1) {
                int* tmp = points[i];
                points[i] = points[j];
                points[j] = tmp;
            }
        }
    }
    int** res = (int**)malloc(k * sizeof(int*));
    *returnColumnSizes = (int*)malloc(k * sizeof(int));
    for (int i = 0; i < k; i++) {
        res[i] = (int*)malloc(2 * sizeof(int));
        res[i][0] = points[i][0];
        res[i][1] = points[i][1];
        (*returnColumnSizes)[i] = 2;
    }
    *returnSize = k;
    return res;
}`,csharp:`public class Solution {
    public int[][] KClosest(int[][] points, int k) {
        var heap = new PriorityQueue<int[], int>();
        foreach (var p in points) {
            int dist = p[0] * p[0] + p[1] * p[1];
            heap.Enqueue(new int[] {p[0], p[1]}, -dist);
            if (heap.Count > k) heap.Dequeue();
        }
        int[][] res = new int[k][];
        for (int i = 0; i < k; i++) {
            res[i] = heap.Dequeue();
        }
        return res;
    }
}`},testCases:[{id:`kcp-1`,label:`Case 1`,args:[[[1,3],[-2,2]],1],expected:[[-2,2]]},{id:`kcp-2`,label:`Case 2`,args:[[[3,3],[5,-1],[-2,4]],2],expected:[[3,3],[-2,4]]},{id:`kcp-3`,label:`Origin Ties`,args:[[[0,1],[1,0]],2],expected:[[0,1],[1,0]],isHidden:!0}]},{id:`meeting-rooms-ii`,number:253,title:`Meeting Rooms II`,scenario:`Order Fulfillment / Log Aggregation`,difficulty:`Medium`,category:`Heap & Priority Queue`,tags:[`Heap`,`Intervals`,`Greedy`],entryFunction:`minMeetingRooms`,params:[{name:`intervals`,type:`number[][]`}],returnType:`number`,compareMode:`exact`,description:"Given an array of job/meeting time intervals `intervals[i] = [start_i, end_i]`, return the **minimum number of conference rooms / parallel servers required** so overlapping jobs never collide.",examples:[{input:`intervals = [[0,30],[5,10],[15,20]]`,output:`2`},{input:`intervals = [[7,10],[2,4]]`,output:`1`}],constraints:[`1 <= intervals.length <= 10^4`],hints:[`Sort intervals ascending by start time.`,"Keep active room end times inside a **min-heap**. If `heap.peek() <= cur.start`, pop that freed room and push `cur.end`. The final heap size equals rooms needed!"],timeComplexity:`O(n log n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`heap`,description:`Interval schedule paired with a min-heap of active server end-times.`},starterCode:{python:`def minMeetingRooms(intervals):
    # Sort + min-heap of active end times
    pass`,javascript:`function minMeetingRooms(intervals) {
  // Sort by start + new MinHeap()
  
}`,java:`class Solution {
    public int minMeetingRooms(int[][] intervals) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        return 0;
    }
};`,c:`int minMeetingRooms(int** intervals, int intervalsSize, int* intervalsColSize) {
    return 0;
}`,csharp:`public class Solution {
    public int MinMeetingRooms(int[][] intervals) {
        return 0;
    }
}`},optimalCode:{python:`def minMeetingRooms(intervals):
    if not intervals:
        return 0
    intervals.sort(key=lambda x: x[0])
    minHeap = [intervals[0][1]]
    for start, end in intervals[1:]:
        if start >= minHeap[0]:
            heapq.heappop(minHeap)
        heapq.heappush(minHeap, end)
    return len(minHeap)`,javascript:`function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a[0] - b[0]);
  const minHeap = new MinHeap();
  minHeap.push(intervals[0][1]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= minHeap.peek()) {
      minHeap.pop();
    }
    minHeap.push(intervals[i][1]);
  }
  return minHeap.size;
}`,java:`class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(intervals[0][1]);
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] >= minHeap.peek()) {
                minHeap.poll();
            }
            minHeap.offer(intervals[i][1]);
        }
        return minHeap.size();
    }
}`,cpp:`class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });
        priority_queue<int, vector<int>, greater<int>> minHeap;
        minHeap.push(intervals[0][1]);
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] >= minHeap.top()) {
                minHeap.pop();
            }
            minHeap.push(intervals[i][1]);
        }
        return minHeap.size();
    }
};`,c:`int minMeetingRooms(int** intervals, int intervalsSize, int* intervalsColSize) {
    if (intervalsSize == 0) return 0;
    int starts[1005], ends[1005];
    for (int i = 0; i < intervalsSize; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    for (int i = 0; i < intervalsSize; i++) {
        for (int j = i + 1; j < intervalsSize; j++) {
            if (starts[j] < starts[i]) {
                int ts = starts[i]; starts[i] = starts[j]; starts[j] = ts;
            }
            if (ends[j] < ends[i]) {
                int te = ends[i]; ends[i] = ends[j]; ends[j] = te;
            }
        }
    }
    int rooms = 0, endPtr = 0;
    for (int s = 0; s < intervalsSize; s++) {
        if (starts[s] < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }
    return rooms;
}`,csharp:`public class Solution {
    public int MinMeetingRooms(int[][] intervals) {
        if (intervals.Length == 0) return 0;
        Array.Sort(intervals, (a, b) => a[0] - b[0]);
        var minHeap = new PriorityQueue<int, int>();
        minHeap.Enqueue(intervals[0][1], intervals[0][1]);
        for (int i = 1; i < intervals.Length; i++) {
            if (intervals[i][0] >= minHeap.Peek()) {
                minHeap.Dequeue();
            }
            minHeap.Enqueue(intervals[i][1], intervals[i][1]);
        }
        return minHeap.Count;
    }
}`},testCases:[{id:`mr2-1`,label:`Case 1`,args:[[[0,30],[5,10],[15,20]]],expected:2},{id:`mr2-2`,label:`Non-Overlapping`,args:[[[7,10],[2,4]]],expected:1},{id:`mr2-3`,label:`Three Simultaneous`,args:[[[1,10],[2,7],[3,19],[8,12],[10,20],[11,30]]],expected:4,isHidden:!0}]},{id:`merge-k-sorted-lists`,number:23,title:`Merge k Sorted Lists`,scenario:`Order Fulfillment / Log Aggregation`,difficulty:`Hard`,category:`Heap & Priority Queue`,tags:[`Heap`,`Linked List`,`Divide & Conquer`],entryFunction:`mergeKLists`,params:[{name:`lists`,type:`linkedListArray`}],returnType:`linkedList`,compareMode:`exact`,description:"You are given an array of `k` sorted linked lists `lists` (e.g. time-ordered shard logs). Merge all linked lists into one sorted linked list and return its head.",examples:[{input:`lists = [[1,4,5],[1,3,4],[2,6]]`,output:`[1,1,2,3,4,4,5,6]`},{input:`lists = []`,output:`[]`}],constraints:[`0 <= k <= 10^4`],hints:["Push each non-null list head into a **min-heap** keyed by `node.val`.","Repeatedly pop the smallest head `node`, append it to `tail.next`, and push `node.next` if non-null."],timeComplexity:`O(N log k)`,spaceComplexity:`O(k)`,visualHint:{primaryStructure:`heap`,description:"Min-heap frontier of size `k` feeding the merged linked list chain."},starterCode:{python:`def mergeKLists(lists):
    # Push (node.val, idx, node) to min-heap
    pass`,javascript:`function mergeKLists(lists) {
  // Use new MinHeap((a, b) => a[0] - b[0])
  
}`,java:`class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        return null;
    }
}`,cpp:`class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        return nullptr;
    }
};`,c:`struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    return NULL;
}`,csharp:`public class Solution {
    public ListNode MergeKLists(ListNode[] lists) {
        return null;
    }
}`},optimalCode:{python:`def mergeKLists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    dummy = ListNode(0)
    tail = dummy
    while heap:
        val, idx, node = heapq.heappop(heap)
        tail.next = node
        tail = tail.next
        if node.next:
            heapq.heappush(heap, (node.next.val, idx, node.next))
    return dummy.next`,javascript:`function mergeKLists(lists) {
  const minHeap = new MinHeap((a, b) => a[0] - b[0]);
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) minHeap.push([lists[i].val, i, lists[i]]);
  }
  const dummy = new ListNode(0);
  let tail = dummy;
  while (minHeap.size > 0) {
    const [, idx, node] = minHeap.pop();
    tail.next = node;
    tail = tail.next;
    if (node.next) minHeap.push([node.next.val, idx, node.next]);
  }
  return dummy.next;
}`,java:`class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode head : lists) {
            if (head != null) heap.offer(head);
        }
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            tail.next = node;
            tail = tail.next;
            if (node.next != null) heap.offer(node.next);
        }
        return dummy.next;
    }
}`,cpp:`class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, greater<ListNode*>> heap;
        for (ListNode* head : lists) {
            if (head) heap.push(head);
        }
        ListNode* dummy = new ListNode(0);
        ListNode* tail = dummy;
        while (!heap.empty()) {
            ListNode* bestNode = nullptr;
            break;
        }
        // Clean divide-and-conquer / pairwise merge for C++ pointer safety
        if (lists.empty()) return nullptr;
        int n = lists.size();
        for (int step = 1; step < n; step *= 2) {
            for (int i = 0; i + step < n; i += step * 2) {
                ListNode* d = new ListNode(0);
                ListNode* t = d;
                ListNode* a = lists[i];
                ListNode* b = lists[i + step];
                while (a && b) {
                    if (a->val <= b->val) { t->next = a; a = a->next; }
                    else { t->next = b; b = b->next; }
                    t = t->next;
                }
                t->next = a ? a : b;
                lists[i] = d->next;
            }
        }
        return lists[0];
    }
};`,c:`struct ListNode* mergeTwoC(struct ListNode* a, struct ListNode* b) {
    if (a == NULL) return b;
    if (b == NULL) return a;
    if (a->val <= b->val) {
        a->next = mergeTwoC(a->next, b);
        return a;
    } else {
        b->next = mergeTwoC(a, b->next);
        return b;
    }
}
struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;
    for (int step = 1; step < listsSize; step *= 2) {
        for (int i = 0; i + step < listsSize; i += step * 2) {
            lists[i] = mergeTwoC(lists[i], lists[i + step]);
        }
    }
    return lists[0];
}`,csharp:`public class Solution {
    public ListNode MergeKLists(ListNode[] lists) {
        var heap = new PriorityQueue<ListNode, int>();
        foreach (var head in lists) {
            if (head != null) heap.Enqueue(head, head.val);
        }
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (heap.Count > 0) {
            ListNode node = heap.Dequeue();
            tail.next = node;
            tail = tail.next;
            if (node.next != null) heap.Enqueue(node.next, node.next.val);
        }
        return dummy.next;
    }
}`},testCases:[{id:`mksl-1`,label:`Case 1`,args:[[[1,4,5],[1,3,4],[2,6]]],expected:[1,1,2,3,4,4,5,6]},{id:`mksl-2`,label:`Empty Array`,args:[[]],expected:[]},{id:`mksl-3`,label:`Empty Inner`,args:[[[],[1]]],expected:[1],isHidden:!0}]},{id:`three-sum`,number:15,title:`3Sum`,difficulty:`Medium`,category:`Two Pointers`,tags:[`Array`,`Two Pointers`,`Sorting`],entryFunction:`threeSum`,params:[{name:`nums`,type:`number[]`}],returnType:`number[][]`,compareMode:`unorderedOuterArray`,description:"Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.",examples:[{input:`nums = [-1,0,1,2,-1,-4]`,output:`[[-1,-1,2],[-1,0,1]]`},{input:`nums = [0,1,1]`,output:`[]`}],constraints:[`3 <= nums.length <= 3000`],hints:["Sort `nums` ascending, then loop anchor `i` while skipping duplicate values (`nums[i] === nums[i - 1]`).","Inside, use two converging pointers `left = i + 1` and `right = n - 1` to find pairs summing to `-nums[i]`."],timeComplexity:`O(n^2)`,spaceComplexity:`O(1) extra`,visualHint:{primaryStructure:`array`,highlightPointers:[`i`,`left`,`right`],description:"Sorted array with anchor `i` and converging two-pointer search `left`/`right`."},starterCode:{python:`def threeSum(nums):
    # Write your solution here
    pass`,javascript:`function threeSum(nums) {
  // Write your solution here
  
}`,java:`class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        return new ArrayList<>();
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        return {};
    }
};`,c:`int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public IList<IList<int>> ThreeSum(int[] nums) {
        return new List<IList<int>>();
    }
}`},optimalCode:{python:`def threeSum(nums):
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return res`,javascript:`function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (total < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
}`,java:`class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = nums.length - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}`,cpp:`class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = n - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total == 0) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
};`,c:`int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[j] < nums[i]) {
                int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
            }
        }
    }
    int** res = (int**)malloc(2000 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(2000 * sizeof(int));
    *returnSize = 0;
    for (int i = 0; i < numsSize - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = numsSize - 1;
        while (left < right) {
            int total = nums[i] + nums[left] + nums[right];
            if (total == 0) {
                int* tri = (int*)malloc(3 * sizeof(int));
                tri[0] = nums[i]; tri[1] = nums[left]; tri[2] = nums[right];
                res[*returnSize] = tri;
                (*returnColumnSizes)[*returnSize] = 3;
                (*returnSize)++;
                left++; right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            } else if (total < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return res;
}`,csharp:`public class Solution {
    public IList<IList<int>> ThreeSum(int[] nums) {
        Array.Sort(nums);
        var res = new List<IList<int>>();
        for (int i = 0; i < nums.Length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = nums.Length - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total == 0) {
                    res.Add(new List<int> {nums[i], nums[left], nums[right]});
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}`},testCases:[{id:`3s-1`,label:`Case 1`,args:[[-1,0,1,2,-1,-4]],expected:[[-1,-1,2],[-1,0,1]]},{id:`3s-2`,label:`None`,args:[[0,1,1]],expected:[]},{id:`3s-3`,label:`All Zeros`,args:[[0,0,0,0]],expected:[[0,0,0]],isHidden:!0}]},{id:`subarray-sum-equals-k`,number:560,title:`Subarray Sum Equals K`,difficulty:`Medium`,category:`Arrays & Hashing`,tags:[`Array`,`Prefix Sum`,`Hash Table`],entryFunction:`subarraySum`,params:[{name:`nums`,type:`number[]`},{name:`k`,type:`number`}],returnType:`number`,compareMode:`exact`,description:"Given an array of integers `nums` (which may include negative values) and an integer `k`, return the total number of contiguous subarrays whose sum equals `k`.",examples:[{input:`nums = [1, 1, 1], k = 2`,output:`2`},{input:`nums = [1, 2, 3], k = 3`,output:`2`}],constraints:[`1 <= nums.length <= 2 * 10^4`,`-1000 <= nums[i] <= 1000`],hints:["Initialize `prefixCounts = {0: 1}` representing the empty prefix before index `0`.","At each element, add `nums[i]` to `prefixSum`, add `prefixCounts[prefixSum - k]` to `count`, then increment `prefixCounts[prefixSum]`."],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`array`,highlightPointers:[`i`],description:"Running `prefixSum` + `prefixCounts` HashMap finding matching prior sums."},starterCode:{python:`def subarraySum(nums, k):
    # Write your solution here
    pass`,javascript:`function subarraySum(nums, k) {
  // Write your solution here
  
}`,java:`class Solution {
    public int subarraySum(int[] nums, int k) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        return 0;
    }
};`,c:`int subarraySum(int* nums, int numsSize, int k) {
    return 0;
}`,csharp:`public class Solution {
    public int SubarraySum(int[] nums, int k) {
        return 0;
    }
}`},optimalCode:{python:`def subarraySum(nums, k):
    prefixCounts = {0: 1}
    prefixSum = 0
    count = 0
    for i in range(len(nums)):
        prefixSum += nums[i]
        count += prefixCounts.get(prefixSum - k, 0)
        prefixCounts[prefixSum] = prefixCounts.get(prefixSum, 0) + 1
    return count`,javascript:`function subarraySum(nums, k) {
  const prefixCounts = new Map([[0, 1]]);
  let prefixSum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    count += prefixCounts.get(prefixSum - k) || 0;
    prefixCounts.set(prefixSum, (prefixCounts.get(prefixSum) || 0) + 1);
  }
  return count;
}`,java:`class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCounts = new HashMap<>();
        prefixCounts.put(0, 1);
        int prefixSum = 0;
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            count += prefixCounts.getOrDefault(prefixSum - k, 0);
            prefixCounts.put(prefixSum, prefixCounts.getOrDefault(prefixSum, 0) + 1);
        }
        return count;
    }
}`,cpp:`class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCounts;
        prefixCounts[0] = 1;
        int prefixSum = 0;
        int count = 0;
        for (int i = 0; i < nums.size(); i++) {
            prefixSum += nums[i];
            if (prefixCounts.count(prefixSum - k)) {
                count += prefixCounts[prefixSum - k];
            }
            prefixCounts[prefixSum]++;
        }
        return count;
    }
};`,c:`int subarraySum(int* nums, int numsSize, int k) {
    int count = 0;
    for (int start = 0; start < numsSize; start++) {
        int sum = 0;
        for (int end = start; end < numsSize; end++) {
            sum += nums[end];
            if (sum == k) count++;
        }
    }
    return count;
}`,csharp:`public class Solution {
    public int SubarraySum(int[] nums, int k) {
        var prefixCounts = new Dictionary<int, int>();
        prefixCounts[0] = 1;
        int prefixSum = 0;
        int count = 0;
        for (int i = 0; i < nums.Length; i++) {
            prefixSum += nums[i];
            count += prefixCounts.GetValueOrDefault(prefixSum - k, 0);
            prefixCounts[prefixSum] = prefixCounts.GetValueOrDefault(prefixSum, 0) + 1;
        }
        return count;
    }
}`},testCases:[{id:`ssk-1`,label:`Case 1`,args:[[1,1,1],2],expected:2},{id:`ssk-2`,label:`Case 2`,args:[[1,2,3],3],expected:2},{id:`ssk-3`,label:`Negatives & Zero`,args:[[1,-1,0],0],expected:3,isHidden:!0}]},{id:`house-robber`,number:198,title:`House Robber`,difficulty:`Medium`,category:`Dynamic Programming`,tags:[`Array`,`Dynamic Programming`],entryFunction:`rob`,params:[{name:`nums`,type:`number[]`}],returnType:`number`,compareMode:`exact`,description:"Given an integer array `nums` representing the money stashed at each house along a street, return the maximum amount you can rob without alerting security (you cannot rob two adjacent houses).",examples:[{input:`nums = [1, 2, 3, 1]`,output:`4`,explanation:`Rob house 0 (1) + house 2 (3) = 4.`},{input:`nums = [2, 7, 9, 3, 1]`,output:`12`,explanation:`2 + 9 + 1 = 12.`}],constraints:[`1 <= nums.length <= 100`,`0 <= nums[i] <= 400`],hints:["At index `i`, you choose `max(skip, rob)`: either `dp[i - 1]` or `dp[i - 2] + nums[i]`.","Compress `dp` into two rolling variables `prev2` and `prev1` for O(1) auxiliary space."],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`dp`,highlightPointers:[`i`],description:"1D `dp` table contrasting adjacent skip vs include transitions."},starterCode:{python:`def rob(nums):
    # Write your solution here
    pass`,javascript:`function rob(nums) {
  // Write your solution here
  
}`,java:`class Solution {
    public int rob(int[] nums) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int rob(vector<int>& nums) {
        return 0;
    }
};`,c:`int rob(int* nums, int numsSize) {
    return 0;
}`,csharp:`public class Solution {
    public int Rob(int[] nums) {
        return 0;
    }
}`},optimalCode:{python:`def rob(nums):
    n = len(nums)
    if n == 1:
        return nums[0]
    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, n):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    return dp[n - 1]`,javascript:`function rob(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[n - 1];
}`,java:`class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        int[] dp = new int[n];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[n - 1];
    }
}`,cpp:`class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        vector<int> dp(n, 0);
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[n - 1];
    }
};`,c:`int rob(int* nums, int numsSize) {
    if (numsSize == 1) return nums[0];
    int* dp = (int*)calloc(numsSize, sizeof(int));
    dp[0] = nums[0];
    dp[1] = nums[0] > nums[1] ? nums[0] : nums[1];
    for (int i = 2; i < numsSize; i++) {
        int skip = dp[i - 1];
        int take = dp[i - 2] + nums[i];
        dp[i] = skip > take ? skip : take;
    }
    return dp[numsSize - 1];
}`,csharp:`public class Solution {
    public int Rob(int[] nums) {
        int n = nums.Length;
        if (n == 1) return nums[0];
        int[] dp = new int[n];
        dp[0] = nums[0];
        dp[1] = Math.Max(nums[0], nums[1]);
        for (int i = 2; i < n; i++) {
            dp[i] = Math.Max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        return dp[n - 1];
    }
}`},testCases:[{id:`hr-1`,label:`Case 1`,args:[[1,2,3,1]],expected:4},{id:`hr-2`,label:`Case 2`,args:[[2,7,9,3,1]],expected:12},{id:`hr-3`,label:`Single House`,args:[[5]],expected:5,isHidden:!0}]},{id:`longest-substring-k-repeating`,number:395,title:`Longest Substring with At Least K Repeating Characters`,difficulty:`Medium`,category:`Sliding Window`,tags:[`Divide and Conquer`,`String`,`Hash Table`,`Sliding Window`],entryFunction:`longestSubstring`,params:[{name:`s`,type:`string`},{name:`k`,type:`number`}],returnType:`number`,compareMode:`exact`,description:"Given a string `s` and an integer `k`, return the length of the longest substring of `s` such that the frequency of each character in this substring is greater than or equal to `k`.",examples:[{input:`s = "aaabb", k = 3`,output:`3`,explanation:`Longest valid substring is "aaa", since "a" repeats 3 times.`},{input:`s = "ababbc", k = 2`,output:`5`,explanation:`Longest valid substring is "ababb", since "a" repeats 2 times and "b" repeats 3 times.`}],constraints:[`1 <= s.length <= 10^4`,`s consists of lowercase English letters`,`1 <= k <= 10^5`],hints:["Any character whose total count in `s` is strictly less than `k` can NEVER belong to any valid substring.","Count all characters with `Counter(s)`. If a character `ch` appears `< k` times, split `s` on `ch` and recursively take the `max` over all pieces."],timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualHint:{primaryStructure:`array`,highlightPointers:[`i`,`left`,`right`],description:"Character frequency map (`counts`), active substring slice, and Divide & Conquer recursion tree."},starterCode:{python:`from collections import Counter

def longest_substring(s: str, k: int) -> int:
    # Write your solution here
    pass`,javascript:`function longestSubstring(s, k) {
  // Write your solution here
  
}`,java:`class Solution {
    public int longestSubstring(String s, int k) {
        return 0;
    }
}`,cpp:`class Solution {
public:
    int longestSubstring(string s, int k) {
        return 0;
    }
};`,c:`int longestSubstring(char* s, int k) {
    return 0;
}`,csharp:`public class Solution {
    public int LongestSubstring(string s, int k) {
        return 0;
    }
}`},optimalCode:{python:`from collections import Counter

def longest_substring(s: str, k: int) -> int:
    if len(s) < k:
        return 0
    counts = Counter(s)
    for ch, cnt in counts.items():
        if cnt < k:
            # Any character appearing < k times can never be in the answer—split on it
            return max(longest_substring(part, k) for part in s.split(ch))
    return len(s)`,javascript:`function longestSubstring(s, k) {
  if (s.length < k) return 0;
  const counts = new Map();
  for (const ch of s) {
    counts.set(ch, (counts.get(ch) || 0) + 1);
  }
  for (const [ch, cnt] of counts.entries()) {
    if (cnt < k) {
      let best = 0;
      for (const part of s.split(ch)) {
        best = Math.max(best, longestSubstring(part, k));
      }
      return best;
    }
  }
  return s.length;
}`,java:`class Solution {
    public int longestSubstring(String s, int k) {
        if (s.length() < k) return 0;
        Map<Character, Integer> counts = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            counts.put(ch, counts.getOrDefault(ch, 0) + 1);
        }
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (counts.get(ch) < k) {
                int best = 0;
                int start = 0;
                for (int j = 0; j <= s.length(); j++) {
                    if (j == s.length() || s.charAt(j) == ch) {
                        best = Math.max(best, longestSubstring(s.substring(start, j), k));
                        start = j + 1;
                    }
                }
                return best;
            }
        }
        return s.length();
    }
}`,cpp:`class Solution {
public:
    int longestSubstring(string s, int k) {
        if (s.size() < k) return 0;
        unordered_map<char, int> counts;
        for (int i = 0; i < s.size(); i++) {
            counts[s[i]]++;
        }
        for (int i = 0; i < s.size(); i++) {
            char ch = s[i];
            if (counts[ch] < k) {
                int best = 0;
                int start = 0;
                for (int j = 0; j <= s.size(); j++) {
                    if (j == s.size() || s[j] == ch) {
                        best = max(best, longestSubstring(s.substr(start, j - start), k));
                        start = j + 1;
                    }
                }
                return best;
            }
        }
        return s.size();
    }
};`,c:`int helper395(char* s, int start, int end, int k) {
    if (end - start < k) return 0;
    int counts[26] = {0};
    for (int i = start; i < end; i++) {
        counts[s[i] - 'a']++;
    }
    for (int mid = start; mid < end; mid++) {
        if (counts[s[mid] - 'a'] < k) {
            int midNext = mid + 1;
            while (midNext < end && counts[s[midNext] - 'a'] < k) {
                midNext++;
            }
            int leftBest = helper395(s, start, mid, k);
            int rightBest = helper395(s, midNext, end, k);
            return leftBest > rightBest ? leftBest : rightBest;
        }
    }
    return end - start;
}

int longestSubstring(char* s, int k) {
    return helper395(s, 0, strlen(s), k);
}`,csharp:`public class Solution {
    public int LongestSubstring(string s, int k) {
        if (s.Length < k) return 0;
        var counts = new Dictionary<char, int>();
        for (int i = 0; i < s.Length; i++) {
            char ch = s[i];
            counts[ch] = counts.GetValueOrDefault(ch, 0) + 1;
        }
        for (int i = 0; i < s.Length; i++) {
            char ch = s[i];
            if (counts[ch] < k) {
                int best = 0;
                int start = 0;
                for (int j = 0; j <= s.Length; j++) {
                    if (j == s.Length || s[j] == ch) {
                        best = Math.Max(best, LongestSubstring(s.Substring(start, j - start), k));
                        start = j + 1;
                    }
                }
                return best;
            }
        }
        return s.Length;
    }
}`},testCases:[{id:`lsk-1`,label:`Case 1`,args:[`aaabb`,3],expected:3},{id:`lsk-2`,label:`Case 2`,args:[`ababbc`,2],expected:5},{id:`lsk-3`,label:`No Valid Slice`,args:[`ababacb`,3],expected:0,isHidden:!0},{id:`lsk-4`,label:`Entire String Valid`,args:[`aaabbb`,3],expected:6,isHidden:!0}]},{id:`partition-labels`,number:763,title:`Partition Labels`,difficulty:`Medium`,category:`Two Pointers`,tags:[`Greedy`,`Two Pointers`,`Hash Table`,`String`],entryFunction:`partitionLabels`,params:[{name:`s`,type:`string`}],returnType:`number[]`,compareMode:`exact`,description:`You are given a string \`s\`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Return a list of integers representing the size of these parts.`,examples:[{input:`s = "ababcbacadefegdehijhklij"`,output:`[9, 7, 8]`,explanation:`Partitions are "ababcbaca", "defegde", "hijhklij".`},{input:`s = "eccbbbbdec"`,output:`[10]`}],constraints:[`1 <= s.length <= 500`,`s consists of lowercase English letters`],hints:["Record the last index where every character appears: `last_seen[ch]`.","Sweep `i` from left to right extending `right = max(right, last_seen[ch])`. When `i == right`, close the piece `[left..right]` and set `left = i + 1`."],timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`array`,highlightPointers:[`left`,`right`,`i`],description:"Active partition slice `[left..right]`, `last_seen` lookup map, and resulting piece lengths `res`."},starterCode:{python:`def partition_labels(s: str) -> list[int]:
    # Write your solution here
    pass`,javascript:`function partitionLabels(s) {
  // Write your solution here
  
}`,java:`class Solution {
    public List<Integer> partitionLabels(String s) {
        return new ArrayList<>();
    }
}`,cpp:`class Solution {
public:
    vector<int> partitionLabels(string s) {
        return {};
    }
};`,c:`int* partitionLabels(char* s, int* returnSize) {
    *returnSize = 0;
    return NULL;
}`,csharp:`public class Solution {
    public IList<int> PartitionLabels(string s) {
        return new List<int>();
    }
}`},optimalCode:{python:`def partition_labels(s: str) -> list[int]:
    last_seen = {ch: i for i, ch in enumerate(s)}
    res = []
    left = right = 0
    for i, ch in enumerate(s):
        right = max(right, last_seen[ch])
        if i == right:
            res.append(right - left + 1)
            left = i + 1
    return res`,javascript:`function partitionLabels(s) {
  const lastSeen = new Map();
  for (let i = 0; i < s.length; i++) {
    lastSeen.set(s[i], i);
  }
  const res = [];
  let left = 0;
  let right = 0;
  for (let i = 0; i < s.length; i++) {
    right = Math.max(right, lastSeen.get(s[i]));
    if (i === right) {
      res.push(right - left + 1);
      left = i + 1;
    }
  }
  return res;
}`,java:`class Solution {
    public List<Integer> partitionLabels(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            lastSeen.put(s.charAt(i), i);
        }
        List<Integer> res = new ArrayList<>();
        int left = 0;
        int right = 0;
        for (int i = 0; i < s.length(); i++) {
            right = Math.max(right, lastSeen.get(s.charAt(i)));
            if (i == right) {
                res.add(right - left + 1);
                left = i + 1;
            }
        }
        return res;
    }
}`,cpp:`class Solution {
public:
    vector<int> partitionLabels(string s) {
        unordered_map<char, int> lastSeen;
        for (int i = 0; i < s.size(); i++) {
            lastSeen[s[i]] = i;
        }
        vector<int> res;
        int left = 0;
        int right = 0;
        for (int i = 0; i < s.size(); i++) {
            right = max(right, lastSeen[s[i]]);
            if (i == right) {
                res.push_back(right - left + 1);
                left = i + 1;
            }
        }
        return res;
    }
};`,c:`int* partitionLabels(char* s, int* returnSize) {
    int n = strlen(s);
    int lastSeen[26] = {0};
    for (int i = 0; i < n; i++) {
        lastSeen[s[i] - 'a'] = i;
    }
    int* res = (int*)malloc(n * sizeof(int));
    int count = 0;
    int left = 0;
    int right = 0;
    for (int i = 0; i < n; i++) {
        int end = lastSeen[s[i] - 'a'];
        if (end > right) right = end;
        if (i == right) {
            res[count++] = right - left + 1;
            left = i + 1;
        }
    }
    *returnSize = count;
    return res;
}`,csharp:`public class Solution {
    public IList<int> PartitionLabels(string s) {
        var lastSeen = new Dictionary<char, int>();
        for (int i = 0; i < s.Length; i++) {
            lastSeen[s[i]] = i;
        }
        var res = new List<int>();
        int left = 0;
        int right = 0;
        for (int i = 0; i < s.Length; i++) {
            right = Math.Max(right, lastSeen[s[i]]);
            if (i == right) {
                res.Add(right - left + 1);
                left = i + 1;
            }
        }
        return res;
    }
}`},testCases:[{id:`pl-1`,label:`Case 1`,args:[`ababcbacadefegdehijhklij`],expected:[9,7,8]},{id:`pl-2`,label:`Case 2`,args:[`eccbbbbdec`],expected:[10]},{id:`pl-3`,label:`Lead Single Char`,args:[`caedbdedda`],expected:[1,9],isHidden:!0}]},{id:`remove-duplicate-letters`,number:316,title:`Remove Duplicate Letters`,difficulty:`Medium`,category:`Stack & Queue`,tags:[`Stack`,`Monotonic Stack`,`Greedy`,`String`],entryFunction:`removeDuplicateLetters`,params:[{name:`s`,type:`string`}],returnType:`string`,compareMode:`exact`,description:"Given a string `s`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.",examples:[{input:`s = "bcabc"`,output:`"abc"`},{input:`s = "cbacdcbc"`,output:`"acdb"`}],constraints:[`1 <= s.length <= 10^4`,`s consists of lowercase English letters`],hints:["Track `last_index[ch]` for every character so you know whether a character on the stack still appears later.","Maintain a monotonic increasing `stack` of characters with a `seen` set: skip `ch` if already in `seen`; otherwise pop larger stack tops while `last_index[stack[-1]] > i`."],timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualHint:{primaryStructure:`stack`,highlightPointers:[`i`],description:"Monotonic increasing character `stack`, `seen` set, and `last_index` map."},starterCode:{python:`def remove_duplicate_letters(s: str) -> str:
    # Write your solution here
    pass`,javascript:`function removeDuplicateLetters(s) {
  // Write your solution here
  
}`,java:`class Solution {
    public String removeDuplicateLetters(String s) {
        return "";
    }
}`,cpp:`class Solution {
public:
    string removeDuplicateLetters(string s) {
        return "";
    }
};`,c:`char* removeDuplicateLetters(char* s) {
    return "";
}`,csharp:`public class Solution {
    public string RemoveDuplicateLetters(string s) {
        return "";
    }
}`},optimalCode:{python:`def remove_duplicate_letters(s: str) -> str:
    last_index = {ch: i for i, ch in enumerate(s)}
    stack = []
    seen = set()
    for i, ch in enumerate(s):
        if ch in seen:
            continue
        # Pop bigger letters if they appear again later in the string
        while stack and ch < stack[-1] and last_index[stack[-1]] > i:
            seen.remove(stack.pop())
        stack.append(ch)
        seen.add(ch)
    return "".join(stack)`,javascript:`function removeDuplicateLetters(s) {
  const lastIndex = new Map();
  for (let i = 0; i < s.length; i++) {
    lastIndex.set(s[i], i);
  }
  const stack = [];
  const seen = new Set();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (seen.has(ch)) continue;
    while (
      stack.length > 0 &&
      ch < stack[stack.length - 1] &&
      lastIndex.get(stack[stack.length - 1]) > i
    ) {
      seen.delete(stack.pop());
    }
    stack.push(ch);
    seen.add(ch);
  }
  return stack.join('');
}`,java:`class Solution {
    public String removeDuplicateLetters(String s) {
        Map<Character, Integer> lastIndex = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            lastIndex.put(s.charAt(i), i);
        }
        Stack<Character> stack = new Stack<>();
        Set<Character> seen = new HashSet<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (seen.contains(ch)) continue;
            while (!stack.isEmpty() && ch < stack.peek() && lastIndex.get(stack.peek()) > i) {
                seen.remove(stack.pop());
            }
            stack.push(ch);
            seen.add(ch);
        }
        StringBuilder sb = new StringBuilder();
        for (char c : stack) {
            sb.append(c);
        }
        return sb.toString();
    }
}`,cpp:`class Solution {
public:
    string removeDuplicateLetters(string s) {
        unordered_map<char, int> lastIndex;
        for (int i = 0; i < s.size(); i++) {
            lastIndex[s[i]] = i;
        }
        vector<char> stack;
        unordered_set<char> seen;
        for (int i = 0; i < s.size(); i++) {
            char ch = s[i];
            if (seen.count(ch)) continue;
            while (!stack.empty() && ch < stack.back() && lastIndex[stack.back()] > i) {
                seen.erase(stack.back());
                stack.pop_back();
            }
            stack.push_back(ch);
            seen.insert(ch);
        }
        string res = "";
        for (char c : stack) res += c;
        return res;
    }
};`,c:`char* removeDuplicateLetters(char* s) {
    int n = strlen(s);
    int lastIndex[26] = {0};
    int seen[26] = {0};
    for (int i = 0; i < n; i++) {
        lastIndex[s[i] - 'a'] = i;
    }
    char* stack = (char*)calloc(27, sizeof(char));
    int top = 0;
    for (int i = 0; i < n; i++) {
        char ch = s[i];
        if (seen[ch - 'a']) continue;
        while (top > 0 && ch < stack[top - 1] && lastIndex[stack[top - 1] - 'a'] > i) {
            seen[stack[top - 1] - 'a'] = 0;
            top--;
        }
        stack[top++] = ch;
        seen[ch - 'a'] = 1;
    }
    stack[top] = '\\0';
    return stack;
}`,csharp:`public class Solution {
    public string RemoveDuplicateLetters(string s) {
        var lastIndex = new Dictionary<char, int>();
        for (int i = 0; i < s.Length; i++) {
            lastIndex[s[i]] = i;
        }
        var stack = new List<char>();
        var seen = new HashSet<char>();
        for (int i = 0; i < s.Length; i++) {
            char ch = s[i];
            if (seen.Contains(ch)) continue;
            while (stack.Count > 0 && ch < stack[stack.Count - 1] && lastIndex[stack[stack.Count - 1]] > i) {
                seen.Remove(stack[stack.Count - 1]);
                stack.RemoveAt(stack.Count - 1);
            }
            stack.Add(ch);
            seen.Add(ch);
        }
        return string.Join("", stack);
    }
}`},testCases:[{id:`rdl-1`,label:`Case 1`,args:[`bcabc`],expected:`abc`},{id:`rdl-2`,label:`Case 2`,args:[`cbacdcbc`],expected:`acdb`},{id:`rdl-3`,label:`Mixed Dups`,args:[`ecbacba`],expected:`eacb`,isHidden:!0},{id:`rdl-4`,label:`Simple Greedy`,args:[`abacb`],expected:`abc`,isHidden:!0}]}],C=[...y,...b,...x,...S],w=e=>e?.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase();function T(e,t,n=[]){if(t==null)throw Error(`[lucide]: iconNode is required when icon name is used`);return{name:w(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}var E=e=>{let t=``,n=!1;for(let r of e)r===`-`||r===`_`||r<=` `?n=t.length>0:(t.length===0?t+=r.toLowerCase():t+=n?r.toUpperCase():r,n=!1);return t},D=e=>{let t=E(e);return t.charAt(0).toUpperCase()+t.slice(1)},O=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),k={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`};function ee(e){return e!=null}function te(e,t={}){let n=t.attributeNames??{},r=e=>n[e]??e,i=e.size??e.width??k.width,a=e.size??e.height??k.height,o=e.aliases?.filter(e=>typeof e==`string`&&e.trim()!==``).map(e=>`lucide-${e}`)??[],s=[...e.name?[`lucide-${e.name}`]:[],...o],c=t.className?.split(` `).filter(Boolean)??[],l=t.includeDefaultClasses===!1?O(...c):O(`lucide`,...s,...c),u=t.absoluteStrokeWidth?Number(t.strokeWidth??k[`stroke-width`])*Number(e.size??e.width??k.width)/Number(t.size??t.width??k.width):t.strokeWidth??k[`stroke-width`];return[`svg`,{...Object.entries(k).reduce((e,[t,n])=>(e[r(t)]=n,e),{}),...`color`in t&&t.color&&{[r(`stroke`)]:t.color},...`size`in t&&ee(t.size)&&{[r(`width`)]:t.size,[r(`height`)]:t.size},...`width`in t&&ee(t.width)&&{[r(`width`)]:t.width},...`height`in t&&ee(t.height)&&{[r(`height`)]:t.height},[r(`stroke-width`)]:u,...l&&{[r(`class`)]:l},[r(`viewBox`)]:`0 0 ${i} ${a}`,...t.hasA11yProp===!1?{[r(`aria-hidden`)]:`true`}:{},...`attributes`in t&&t.attributes},e.node.map(e=>{let[n,i,a]=e,o=t.nonScalingStroke?{[r(`vector-effect`)]:`non-scaling-stroke`,...i}:i;return a?[n,o,a]:[n,o]})]}function ne(e,t={}){return te(e,{...t,attributeNames:{...t.attributeNames,class:`className`,"stroke-width":`strokeWidth`,"stroke-linecap":`strokeLinecap`,"stroke-linejoin":`strokeLinejoin`,"vector-effect":`vectorEffect`}})}var re=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},ie=(0,_.createContext)({}),ae=()=>(0,_.useContext)(ie),oe=(0,_.forwardRef)(({color:e,size:t,width:n,height:r,strokeWidth:i,absoluteStrokeWidth:a,nonScalingStroke:o,className:s=``,children:c,iconNode:l=[],icon:u={node:l,aliases:[],size:24},...d},f)=>{let{size:p=24,strokeWidth:m=2,absoluteStrokeWidth:h=!1,nonScalingStroke:g=!1,color:v=`currentColor`,className:y=``}=ae()??{},b=!!c||re(d),[x,S,C=[]]=ne(u,{color:e??v,width:n??t??p,height:r??t??p,strokeWidth:i??m,absoluteStrokeWidth:a??h,nonScalingStroke:o??g,className:O(y,s),hasA11yProp:b,attributes:d});return(0,_.createElement)(x,{ref:f,...S},[...C.map(([e,t])=>(0,_.createElement)(e,t)),...Array.isArray(c)?c:[c]])});function A(e,t=[],n=[]){let r=typeof e==`string`?T(e,t,n):e,i=(0,_.forwardRef)(({className:e,...t},n)=>(0,_.createElement)(oe,{ref:n,icon:r,className:e,...t}));return r.name&&(i.displayName=D(r.name)),i}var se={name:`chevron-down`,size:24,node:[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]};se.node;var ce=A(se),le={name:`chevron-left`,size:24,node:[[`path`,{d:`m15 18-6-6 6-6`,key:`1wnfg3`}]]};le.node;var ue=A(le),de={name:`chevron-right`,size:24,node:[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]};de.node;var fe=A(de),pe={name:`chevron-up`,size:24,node:[[`path`,{d:`m18 15-6-6-6 6`,key:`153udz`}]]};pe.node;var me=A(pe),he={name:`circle-check`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m16 9-5.5 5.5L8 12`,key:`xofnsj`}]],aliases:[`check-circle-2`]};he.node;var ge=A(he),_e={name:`circle-exclamation-point`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]],aliases:[`alert-circle`,`circle-alert`]};_e.node;var ve=A(_e),ye={name:`circle-x`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]],aliases:[`x-circle`]};ye.node;var j=A(ye),M={name:`clock`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]};M.node;var be=A(M),xe={name:`eye`,size:24,node:[[`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,key:`1nclc0`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]};xe.node;var Se=A(xe),Ce={name:`flask-conical`,size:24,node:[[`path`,{d:`M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2`,key:`18mbvz`}],[`path`,{d:`M6.453 15h11.094`,key:`3shlmq`}],[`path`,{d:`M8.5 2h7`,key:`csnxdl`}]]};Ce.node;var we=A(Ce),N={name:`lightbulb`,size:24,node:[[`path`,{d:`M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,key:`1gvzjb`}],[`path`,{d:`M9 18h6`,key:`x1upvd`}],[`path`,{d:`M10 22h4`,key:`ceow96`}]]};N.node;var Te=A(N),Ee={name:`loader-circle`,size:24,node:[[`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`,key:`13zald`}]],aliases:[`loader-2`]};Ee.node;var De=A(Ee),Oe={name:`maximize-2`,size:24,node:[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`m21 3-7 7`,key:`1l2asr`}],[`path`,{d:`m3 21 7-7`,key:`tjx5ai`}],[`path`,{d:`M9 21H3v-6`,key:`wtvkvv`}]]};Oe.node;var ke=A(Oe),Ae={name:`minimize-2`,size:24,node:[[`path`,{d:`m14 10 7-7`,key:`oa77jy`}],[`path`,{d:`M20 10h-6V4`,key:`mjg0md`}],[`path`,{d:`m3 21 7-7`,key:`tjx5ai`}],[`path`,{d:`M4 14h6v6`,key:`rmj7iw`}]]};Ae.node;var je=A(Ae),Me={name:`pause`,size:24,node:[[`rect`,{x:`14`,y:`3`,width:`5`,height:`18`,rx:`1`,key:`kaeet6`}],[`rect`,{x:`5`,y:`3`,width:`5`,height:`18`,rx:`1`,key:`1wsw3u`}]]};Me.node;var Ne=A(Me),Pe={name:`play`,size:24,node:[[`path`,{d:`M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z`,key:`10ikf1`}]]};Pe.node;var Fe=A(Pe),Ie={name:`plus`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]};Ie.node;var Le=A(Ie),Re={name:`rotate-ccw`,size:24,node:[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]};Re.node;var ze=A(Re),Be={name:`search`,size:24,node:[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]};Be.node;var Ve=A(Be),He={name:`send`,size:24,node:[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]};He.node;var Ue=A(He),We={name:`sparkles`,size:24,node:[[`path`,{d:`M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,key:`1s2grr`}],[`path`,{d:`M20 2v4`,key:`1rf3ol`}],[`path`,{d:`M22 4h-4`,key:`gwowj6`}],[`circle`,{cx:`4`,cy:`20`,r:`2`,key:`6kqj1y`}]],aliases:[`stars`]};We.node;var Ge=A(We),Ke={name:`terminal`,size:24,node:[[`path`,{d:`M12 19h8`,key:`baeox8`}],[`path`,{d:`m4 17 6-6-6-6`,key:`1yngyt`}]]};Ke.node;var qe=A(Ke),Je={name:`x`,size:24,node:[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]};Je.node;var Ye=A(Je),Xe=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),P=o(((e,t)=>{t.exports=Xe()}))(),Ze=({problem:e,isSolved:t,isRunningTrace:n,isRunningTests:r,totalProblems:i,onOpenProblemDrawer:a,onPrevProblem:o,onNextProblem:s,onVisualize:c,onRunTests:l})=>(0,P.jsxs)(`header`,{className:`flex h-12 shrink-0 items-center justify-between border-b border-[#1b1e29] bg-[#0b0c10] px-4 select-none`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2 text-xs`,children:[(0,P.jsx)(`span`,{className:`font-mono text-sm font-semibold tracking-tight text-[#eef1f8]`,children:`trace`}),(0,P.jsx)(`span`,{className:`text-[#454c5e]`,children:`/`}),(0,P.jsxs)(`button`,{type:`button`,onClick:a,className:`flex items-center gap-1 rounded-md px-1.5 py-1 text-[#7e8699] transition hover:bg-[#151822] hover:text-[#d8deea] cursor-pointer`,title:`Browse all ${i} problems & playgrounds`,children:[(0,P.jsx)(`span`,{children:e.isPlayground?`playground`:`problems`}),(0,P.jsx)(ce,{className:`h-3 w-3 opacity-70`})]})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[(0,P.jsx)(`button`,{type:`button`,onClick:o,className:`flex h-6 w-6 items-center justify-center rounded-md text-[#6b7386] transition hover:bg-[#151822] hover:text-[#cfd6e6] cursor-pointer`,title:`Previous Problem`,children:(0,P.jsx)(ue,{className:`h-3.5 w-3.5`})}),(0,P.jsxs)(`button`,{type:`button`,onClick:a,className:`flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs transition hover:bg-[#151822] cursor-pointer`,title:`Click to switch problem`,children:[t&&(0,P.jsx)(ge,{className:`h-3.5 w-3.5 text-emerald-400`}),(0,P.jsx)(`span`,{className:`font-medium text-[#e3e7f2]`,children:e.title}),(0,P.jsx)(`span`,{className:`text-[#43495b]`,children:`/`}),(0,P.jsx)(`span`,{className:`text-[#7e8699]`,children:e.category})]}),(0,P.jsx)(`button`,{type:`button`,onClick:s,className:`flex h-6 w-6 items-center justify-center rounded-md text-[#6b7386] transition hover:bg-[#151822] hover:text-[#cfd6e6] cursor-pointer`,title:`Next Problem`,children:(0,P.jsx)(fe,{className:`h-3.5 w-3.5`})})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[(0,P.jsxs)(`button`,{type:`button`,onClick:l,disabled:r||n,className:`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#8d96aa] transition hover:bg-[#151822] hover:text-[#e3e7f2] disabled:opacity-50 cursor-pointer`,title:`Run visible test cases`,children:[r?(0,P.jsx)(De,{className:`h-3.5 w-3.5 animate-spin`}):(0,P.jsx)(we,{className:`h-3.5 w-3.5`}),(0,P.jsx)(`span`,{children:`Run Tests`})]}),(0,P.jsxs)(`button`,{type:`button`,onClick:c,disabled:n||r,className:`flex items-center gap-2 rounded-lg bg-[#9db2ff] px-3.5 py-1.5 text-xs font-semibold text-[#0b0d14] transition hover:bg-[#b2c2ff] active:scale-[0.99] disabled:opacity-60 cursor-pointer`,title:`Trace step-by-step execution (Ctrl/Cmd + Enter)`,children:[n?(0,P.jsx)(De,{className:`h-3.5 w-3.5 animate-spin`}):(0,P.jsx)(Fe,{className:`h-3 w-3 fill-current`}),(0,P.jsx)(`span`,{children:`Visualize`}),(0,P.jsx)(`span`,{className:`hidden sm:inline font-mono text-[10px] font-medium opacity-60`,children:`⌘↵`})]})]})]});function Qe(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function $e(e){if(Array.isArray(e))return e}function et(e,t,n){return(t=lt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function tt(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t!==0)for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function nt(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function rt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function it(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?rt(Object(n),!0).forEach(function(t){et(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):rt(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function at(e,t){if(e==null)return{};var n,r,i=ot(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function ot(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function st(e,t){return $e(e)||tt(e,t)||ut(e,t)||nt()}function ct(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function lt(e){var t=ct(e,`string`);return typeof t==`symbol`?t:t+``}function ut(e,t){if(e){if(typeof e==`string`)return Qe(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Qe(e,t):void 0}}function dt(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ft(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function pt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?ft(Object(n),!0).forEach(function(t){dt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ft(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function mt(){var e=[...arguments];return function(t){return e.reduceRight(function(e,t){return t(e)},t)}}function ht(e){return function t(){var n=this,r=[...arguments];return r.length>=e.length?e.apply(this,r):function(){var e=[...arguments];return t.apply(n,[].concat(r,e))}}}function gt(e){return{}.toString.call(e).includes(`Object`)}function _t(e){return!Object.keys(e).length}function vt(e){return typeof e==`function`}function yt(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function bt(e,t){return gt(t)||Tt(`changeType`),Object.keys(t).some(function(t){return!yt(e,t)})&&Tt(`changeField`),t}function xt(e){vt(e)||Tt(`selectorType`)}function St(e){vt(e)||gt(e)||Tt(`handlerType`),gt(e)&&Object.values(e).some(function(e){return!vt(e)})&&Tt(`handlersType`)}function Ct(e){e||Tt(`initialIsRequired`),gt(e)||Tt(`initialType`),_t(e)&&Tt(`initialContent`)}function wt(e,t){throw Error(e[t]||e.default)}var Tt=ht(wt)({initialIsRequired:`initial state is required`,initialType:`initial state should be an object`,initialContent:`initial state shouldn't be an empty object`,handlerType:`handler should be an object or a function`,handlersType:`all handlers should be a functions`,selectorType:`selector should be a function`,changeType:`provided value of changes should be an object`,changeField:`it seams you want to change a field in the state which is not specified in the "initial" state`,default:"an unknown error accured in `state-local` package"}),Et={changes:bt,selector:xt,handler:St,initial:Ct};function Dt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Et.initial(e),Et.handler(t);var n={current:e},r=ht(At)(n,t),i=ht(kt)(n),a=ht(Et.changes)(e),o=ht(Ot)(n);function s(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(e){return e};return Et.selector(e),e(n.current)}function c(e){mt(r,i,a,o)(e)}return[s,c]}function Ot(e,t){return vt(t)?t(e.current):t}function kt(e,t){return e.current=pt(pt({},e.current),t),t}function At(e,t,n){return vt(t)?t(e.current):Object.keys(n).forEach(function(n){return t[n]?.call(t,e.current[n])}),n}var jt={create:Dt},Mt={paths:{vs:`https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs`}};function Nt(e){return function t(){var n=this,r=[...arguments];return r.length>=e.length?e.apply(this,r):function(){var e=[...arguments];return t.apply(n,[].concat(r,e))}}}function Pt(e){return{}.toString.call(e).includes(`Object`)}function Ft(e){return e||zt(`configIsRequired`),Pt(e)||zt(`configType`),e.urls?(It(),{paths:{vs:e.urls.monacoBase}}):e}function It(){console.warn(Rt.deprecation)}function Lt(e,t){throw Error(e[t]||e.default)}var Rt={configIsRequired:`the configuration object is required`,configType:`the configuration object should be an object`,default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},zt=Nt(Lt)(Rt),Bt={config:Ft},Vt=function(){var e=[...arguments];return function(t){return e.reduceRight(function(e,t){return t(e)},t)}};function Ht(e,t){return Object.keys(t).forEach(function(n){t[n]instanceof Object&&e[n]&&Object.assign(t[n],Ht(e[n],t[n]))}),it(it({},e),t)}var Ut={type:`cancelation`,msg:`operation is manually canceled`};function Wt(e){var t=!1,n=new Promise(function(n,r){e.then(function(e){return t?r(Ut):n(e)}),e.catch(r)});return n.cancel=function(){return t=!0},n}var Gt=[`monaco`],Kt=st(jt.create({config:Mt,isInitialized:!1,resolve:null,reject:null,monaco:null}),2),qt=Kt[0],Jt=Kt[1];function Yt(e){var t=Bt.config(e),n=t.monaco,r=at(t,Gt);Jt(function(e){return{config:Ht(e.config,r),monaco:n}})}function F(){var e=qt(function(e){return{monaco:e.monaco,isInitialized:e.isInitialized,resolve:e.resolve}});if(!e.isInitialized){if(Jt({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),Wt(nn);if(window.monaco&&window.monaco.editor)return en(window.monaco),e.resolve(window.monaco),Wt(nn);Vt(Xt,Qt)($t)}return Wt(nn)}function Xt(e){return document.body.appendChild(e)}function Zt(e){var t=document.createElement(`script`);return e&&(t.src=e),t}function Qt(e){var t=qt(function(e){return{config:e.config,reject:e.reject}}),n=Zt(`${t.config.paths.vs}/loader.js`);return n.onload=function(){return e()},n.onerror=t.reject,n}function $t(){var e=qt(function(e){return{config:e.config,resolve:e.resolve,reject:e.reject}}),t=window.require;t.config(e.config),t([`vs/editor/editor.main`],function(t){var n=t.m||t;en(n),e.resolve(n)},function(t){e.reject(t)})}function en(e){qt().monaco||Jt({monaco:e})}function tn(){return qt(function(e){return e.monaco})}var nn=new Promise(function(e,t){return Jt({resolve:e,reject:t})}),rn={config:Yt,init:F,__getMonacoInstance:tn},an={wrapper:{display:`flex`,position:`relative`,textAlign:`initial`},fullWidth:{width:`100%`},hide:{display:`none`}},on={container:{display:`flex`,height:`100%`,width:`100%`,justifyContent:`center`,alignItems:`center`}};function sn({children:e}){return _.createElement(`div`,{style:on.container},e)}var cn=sn;function ln({width:e,height:t,isEditorReady:n,loading:r,_ref:i,className:a,wrapperProps:o}){return _.createElement(`section`,{style:{...an.wrapper,width:e,height:t},...o},!n&&_.createElement(cn,null,r),_.createElement(`div`,{ref:i,style:{...an.fullWidth,...!n&&an.hide},className:a}))}var un=(0,_.memo)(ln);function dn(e){(0,_.useEffect)(e,[])}var fn=dn;function pn(e,t,n=!0){let r=(0,_.useRef)(!0);(0,_.useEffect)(r.current||!n?()=>{r.current=!1}:e,t)}var mn=pn;function hn(){}function gn(e,t,n,r){return _n(e,r)||vn(e,t,n,r)}function _n(e,t){return e.editor.getModel(yn(e,t))}function vn(e,t,n,r){return e.editor.createModel(t,n,r?yn(e,r):void 0)}function yn(e,t){return e.Uri.parse(t)}function bn({original:e,modified:t,language:n,originalLanguage:r,modifiedLanguage:i,originalModelPath:a,modifiedModelPath:o,keepCurrentOriginalModel:s=!1,keepCurrentModifiedModel:c=!1,theme:l=`light`,loading:u=`Loading...`,options:d={},height:f=`100%`,width:p=`100%`,className:m,wrapperProps:h={},beforeMount:g=hn,onMount:v=hn}){let[y,b]=(0,_.useState)(!1),[x,S]=(0,_.useState)(!0),C=(0,_.useRef)(null),w=(0,_.useRef)(null),T=(0,_.useRef)(null),E=(0,_.useRef)(v),D=(0,_.useRef)(g),O=(0,_.useRef)(!1);fn(()=>{let e=rn.init();return e.then(e=>(w.current=e)&&S(!1)).catch(e=>e?.type!==`cancelation`&&console.error(`Monaco initialization: error:`,e)),()=>C.current?te():e.cancel()}),mn(()=>{if(C.current&&w.current){let t=C.current.getOriginalEditor(),i=gn(w.current,e||``,r||n||`text`,a||``);i!==t.getModel()&&t.setModel(i)}},[a],y),mn(()=>{if(C.current&&w.current){let e=C.current.getModifiedEditor(),r=gn(w.current,t||``,i||n||`text`,o||``);r!==e.getModel()&&e.setModel(r)}},[o],y),mn(()=>{let e=C.current.getModifiedEditor();e.getOption(w.current.editor.EditorOption.readOnly)?e.setValue(t||``):t!==e.getValue()&&(e.executeEdits(``,[{range:e.getModel().getFullModelRange(),text:t||``,forceMoveMarkers:!0}]),e.pushUndoStop())},[t],y),mn(()=>{C.current?.getModel()?.original.setValue(e||``)},[e],y),mn(()=>{let{original:e,modified:t}=C.current.getModel();w.current.editor.setModelLanguage(e,r||n||`text`),w.current.editor.setModelLanguage(t,i||n||`text`)},[n,r,i],y),mn(()=>{w.current?.editor.setTheme(l)},[l],y),mn(()=>{C.current?.updateOptions(d)},[d],y);let k=(0,_.useCallback)(()=>{if(!w.current)return;D.current(w.current);let s=gn(w.current,e||``,r||n||`text`,a||``),c=gn(w.current,t||``,i||n||`text`,o||``);C.current?.setModel({original:s,modified:c})},[n,t,i,e,r,a,o]),ee=(0,_.useCallback)(()=>{!O.current&&T.current&&(C.current=w.current.editor.createDiffEditor(T.current,{automaticLayout:!0,...d}),k(),w.current?.editor.setTheme(l),b(!0),O.current=!0)},[d,l,k]);(0,_.useEffect)(()=>{y&&E.current(C.current,w.current)},[y]),(0,_.useEffect)(()=>{!x&&!y&&ee()},[x,y,ee]);function te(){let e=C.current?.getModel();s||e?.original?.dispose(),c||e?.modified?.dispose(),C.current?.dispose()}return _.createElement(un,{width:p,height:f,isEditorReady:y,loading:u,_ref:T,className:m,wrapperProps:h})}(0,_.memo)(bn);function xn(e){let t=(0,_.useRef)();return(0,_.useEffect)(()=>{t.current=e},[e]),t.current}var Sn=xn,Cn=new Map;function wn({defaultValue:e,defaultLanguage:t,defaultPath:n,value:r,language:i,path:a,theme:o=`light`,line:s,loading:c=`Loading...`,options:l={},overrideServices:u={},saveViewState:d=!0,keepCurrentModel:f=!1,width:p=`100%`,height:m=`100%`,className:h,wrapperProps:g={},beforeMount:v=hn,onMount:y=hn,onChange:b,onValidate:x=hn}){let[S,C]=(0,_.useState)(!1),[w,T]=(0,_.useState)(!0),E=(0,_.useRef)(null),D=(0,_.useRef)(null),O=(0,_.useRef)(null),k=(0,_.useRef)(y),ee=(0,_.useRef)(v),te=(0,_.useRef)(),ne=(0,_.useRef)(r),re=Sn(a),ie=(0,_.useRef)(!1),ae=(0,_.useRef)(!1);fn(()=>{let e=rn.init();return e.then(e=>(E.current=e)&&T(!1)).catch(e=>e?.type!==`cancelation`&&console.error(`Monaco initialization: error:`,e)),()=>D.current?A():e.cancel()}),mn(()=>{let o=gn(E.current,e||r||``,t||i||``,a||n||``);o!==D.current?.getModel()&&(d&&Cn.set(re,D.current?.saveViewState()),D.current?.setModel(o),d&&D.current?.restoreViewState(Cn.get(a)))},[a],S),mn(()=>{D.current?.updateOptions(l)},[l],S),mn(()=>{!D.current||r===void 0||(D.current.getOption(E.current.editor.EditorOption.readOnly)?D.current.setValue(r):r!==D.current.getValue()&&(ae.current=!0,D.current.executeEdits(``,[{range:D.current.getModel().getFullModelRange(),text:r,forceMoveMarkers:!0}]),D.current.pushUndoStop(),ae.current=!1))},[r],S),mn(()=>{let e=D.current?.getModel();e&&i&&E.current?.editor.setModelLanguage(e,i)},[i],S),mn(()=>{s!==void 0&&D.current?.revealLine(s)},[s],S),mn(()=>{E.current?.editor.setTheme(o)},[o],S);let oe=(0,_.useCallback)(()=>{if(O.current&&E.current&&!ie.current){ee.current(E.current);let c=a||n,f=gn(E.current,r||e||``,t||i||``,c||``);D.current=E.current?.editor.create(O.current,{model:f,automaticLayout:!0,...l},u),d&&D.current.restoreViewState(Cn.get(c)),E.current.editor.setTheme(o),s!==void 0&&D.current.revealLine(s),C(!0),ie.current=!0}},[e,t,n,r,i,a,l,u,d,o,s]);(0,_.useEffect)(()=>{S&&k.current(D.current,E.current)},[S]),(0,_.useEffect)(()=>{!w&&!S&&oe()},[w,S,oe]),ne.current=r,(0,_.useEffect)(()=>{S&&b&&(te.current?.dispose(),te.current=D.current?.onDidChangeModelContent(e=>{ae.current||b(D.current.getValue(),e)}))},[S,b]),(0,_.useEffect)(()=>{if(S){let e=E.current.editor.onDidChangeMarkers(e=>{let t=D.current.getModel()?.uri;if(t&&e.find(e=>e.path===t.path)){let e=E.current.editor.getModelMarkers({resource:t});x?.(e)}});return()=>{e?.dispose()}}return()=>{}},[S,x]);function A(){te.current?.dispose(),f?d&&Cn.set(a,D.current.saveViewState()):D.current.getModel()?.dispose(),D.current.dispose()}return _.createElement(un,{width:p,height:m,isEditorReady:S,loading:c,_ref:O,className:h,wrapperProps:g})}var Tn=(0,_.memo)(wn),En=[{id:`python`,label:`Python 3`,badge:`PY`,monacoId:`python`},{id:`javascript`,label:`JavaScript`,badge:`JS`,monacoId:`javascript`},{id:`java`,label:`Java`,badge:`JV`,monacoId:`java`},{id:`cpp`,label:`C++`,badge:`C++`,monacoId:`cpp`},{id:`c`,label:`C`,badge:`C`,monacoId:`c`},{id:`csharp`,label:`C#`,badge:`C#`,monacoId:`csharp`}];function Dn(e,t){let n=e.id.replace(/-/g,`_`),r=e.entryFunction||`solution`;switch(t){case`python`:return`${n}.py`;case`javascript`:return`${r}.js`;case`java`:return e.isPlayground?`Main.java`:`Solution.java`;case`cpp`:return`${n}.cpp`;case`c`:return`${n}.c`;case`csharp`:return e.isPlayground?`Program.cs`:`Solution.cs`}}function On(e){return e.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((e,t)=>e.startsWith("`")&&e.endsWith("`")?(0,P.jsx)(`code`,{className:`rounded bg-[#1a1d28] px-1.5 py-0.5 font-mono text-[11px] text-[#cdd6ee]`,children:e.slice(1,-1)},t):e.startsWith(`**`)&&e.endsWith(`**`)?(0,P.jsx)(`strong`,{className:`font-semibold text-[#eef1f8]`,children:e.slice(2,-2)},t):(0,P.jsx)(_.Fragment,{children:e},t))}var kn=({problem:e,submissions:t,code:n,language:r,activeLine:i,errorLine:a,isPlaying:o,onChange:s,onChangeLanguage:c,onReset:l,onLoadOptimal:u})=>{let d=(0,_.useRef)(null),f=(0,_.useRef)(null),p=(0,_.useRef)([]),[m,h]=(0,_.useState)(!1),[g,v]=(0,_.useState)(`description`),[y,b]=(0,_.useState)(0),[x,S]=(0,_.useState)({line:1,col:1});(0,_.useEffect)(()=>{b(0),v(`description`)},[e.id]);let C=(0,_.useMemo)(()=>En.find(e=>e.id===r)??En[0],[r]),w=(0,_.useMemo)(()=>Dn(e,r),[e,r]),T=(0,_.useMemo)(()=>{let t=e.description.split(`
`)[0].replace(/`([^`]+)`/g,`$1`).replace(/\*\*([^*]+)\*\*/g,`$1`).trim();return t.length>125?t.slice(0,122)+`...`:t},[e.description]);return(0,_.useEffect)(()=>{let e=d.current,t=f.current;if(!e||!t)return;let n=[];i&&i>0&&(n.push({range:new t.Range(i,1,i,1),options:{isWholeLine:!0,className:`monaco-active-trace-line`,glyphMarginClassName:`monaco-active-trace-glyph`}}),e.revealLineInCenterIfOutsideViewport(i)),a&&a>0&&n.push({range:new t.Range(a,1,a,1),options:{isWholeLine:!0,className:`monaco-error-trace-line`}}),p.current=e.deltaDecorations(p.current,n)},[i,a]),(0,P.jsxs)(`div`,{className:`relative flex h-full flex-col bg-[#0e1016]`,children:[(0,P.jsxs)(`div`,{className:`flex h-10 shrink-0 items-center justify-between border-b border-[#1b1e29] bg-[#0c0d12] pr-3`,children:[(0,P.jsx)(`div`,{className:`flex h-full items-center`,children:(0,P.jsxs)(`div`,{className:`flex h-full items-center gap-2 border-r border-[#1b1e29] bg-[#0e1016] px-4 text-xs text-[#dde2ee]`,children:[(0,P.jsx)(`span`,{className:`rounded bg-[#1a1f30] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#9db2ff]`,children:C.badge}),(0,P.jsx)(`span`,{className:`font-mono text-[12px]`,children:w})]})}),(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,P.jsxs)(`div`,{className:`relative`,children:[(0,P.jsx)(`select`,{"aria-label":`Programming Language`,value:r,onChange:e=>c(e.target.value),className:`appearance-none rounded-md border border-[#232736] bg-[#14161f] py-1 pl-2.5 pr-7 text-xs font-medium text-[#d4dbe8] transition hover:border-[#343b52] focus:border-[#8ea3ff] focus:outline-none cursor-pointer`,children:En.map(e=>(0,P.jsx)(`option`,{value:e.id,className:`bg-[#11131a] text-[#e4e8f2]`,children:e.label},e.id))}),(0,P.jsx)(ce,{className:`pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#737b8e]`})]}),(0,P.jsxs)(`button`,{type:`button`,onClick:u,className:`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-[#8a93a8] transition hover:bg-[#171a24] hover:text-[#e3e7f2] cursor-pointer`,title:`Load clean optimal solution & visualize`,children:[(0,P.jsx)(Ge,{className:`h-3 w-3 text-[#9db2ff]`}),(0,P.jsx)(`span`,{children:`Optimal`})]}),(0,P.jsxs)(`button`,{type:`button`,onClick:l,className:`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-[#757d90] transition hover:bg-[#171a24] hover:text-[#d6dce8] cursor-pointer`,title:`Reset starter template`,children:[(0,P.jsx)(ze,{className:`h-3 w-3`}),(0,P.jsx)(`span`,{children:`Reset`})]})]})]}),(0,P.jsxs)(`div`,{className:`shrink-0 border-b border-[#191c26] bg-[#0e1016] px-5 pt-3.5 pb-3`,children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,P.jsxs)(`div`,{className:`flex min-w-0 items-center gap-2.5`,children:[(0,P.jsx)(`span`,{className:`truncate text-sm font-semibold text-[#eef1f8]`,children:e.isPlayground?e.title:`${e.number}. ${e.title}`}),(0,P.jsx)(`span`,{className:`shrink-0 text-[11px] font-medium text-[#7c8499]`,children:e.difficulty}),e.scenario&&(0,P.jsx)(`span`,{className:`hidden xl:inline-block truncate rounded bg-[#161923] px-2 py-0.5 text-[10px] text-[#8d99b8]`,children:e.scenario})]}),(0,P.jsxs)(`div`,{className:`flex shrink-0 items-center gap-3`,children:[(0,P.jsxs)(`span`,{className:`hidden sm:flex items-center gap-1.5 text-[11px] text-[#6d7588]`,children:[(0,P.jsx)(`span`,{className:`h-1.5 w-1.5 rounded-full bg-[#6d7588]`}),`Saved`]}),(0,P.jsxs)(`button`,{type:`button`,onClick:()=>h(e=>!e),className:`flex items-center gap-1 rounded-md border border-[#232736] bg-[#14161f] px-2 py-0.5 text-[11px] font-medium text-[#b5bdd0] transition hover:border-[#373f57] hover:text-white cursor-pointer`,children:[(0,P.jsx)(`span`,{children:`Problem details`}),m?(0,P.jsx)(me,{className:`h-3 w-3`}):(0,P.jsx)(ce,{className:`h-3 w-3`})]})]})]}),(0,P.jsx)(`p`,{className:`mt-1 truncate text-xs text-[#7d8598]`,children:T})]}),m&&(0,P.jsxs)(`div`,{className:`absolute inset-x-0 top-[96px] bottom-7 z-30 flex flex-col border-b border-[#242836] bg-[#0d0f16]/98 backdrop-blur-md`,children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between border-b border-[#1c1f2b] px-5`,children:[(0,P.jsx)(`div`,{className:`flex items-center gap-5 text-xs font-medium`,children:[{id:`description`,label:`Description`},{id:`hints`,label:`Hints (${e.hints.length})`},{id:`submissions`,label:`Submissions (${t.length})`}].map(e=>(0,P.jsx)(`button`,{type:`button`,onClick:()=>v(e.id),className:`border-b-2 py-2.5 transition cursor-pointer ${g===e.id?`border-[#8ea3ff] text-[#eef1f8]`:`border-transparent text-[#737b8e] hover:text-[#cfd6e6]`}`,children:e.label},e.id))}),(0,P.jsx)(`button`,{type:`button`,onClick:()=>h(!1),className:`text-[11px] text-[#838ba0] hover:text-white cursor-pointer`,children:`Collapse ✕`})]}),(0,P.jsxs)(`div`,{className:`flex-1 overflow-y-auto px-5 py-4 space-y-4 text-xs leading-relaxed text-[#cfd6e6]`,children:[g===`description`&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`div`,{className:`space-y-2`,children:e.description.split(`

`).map((e,t)=>(0,P.jsx)(`p`,{children:On(e)},t))}),e.examples.length>0&&(0,P.jsxs)(`div`,{className:`space-y-2.5`,children:[(0,P.jsx)(`div`,{className:`text-[10px] font-semibold uppercase tracking-wider text-[#6d7588]`,children:`Examples`}),e.examples.map((e,t)=>(0,P.jsxs)(`div`,{className:`rounded-lg border border-[#222532] bg-[#12141c] p-3 font-mono text-[11px] space-y-1`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`span`,{className:`text-[#6d7588]`,children:`Input: `}),(0,P.jsx)(`span`,{className:`text-[#dce2ee]`,children:e.input})]}),(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`span`,{className:`text-[#6d7588]`,children:`Output: `}),(0,P.jsx)(`span`,{className:`text-emerald-300`,children:e.output})]}),e.explanation&&(0,P.jsx)(`div`,{className:`font-sans text-[11px] text-[#848ca0] pt-0.5`,children:e.explanation})]},t))]}),e.constraints.length>0&&(0,P.jsxs)(`div`,{className:`space-y-1.5`,children:[(0,P.jsx)(`div`,{className:`text-[10px] font-semibold uppercase tracking-wider text-[#6d7588]`,children:`Constraints`}),(0,P.jsx)(`ul`,{className:`list-disc pl-4 space-y-1 text-[#9ca4b8]`,children:e.constraints.map((e,t)=>(0,P.jsx)(`li`,{children:On(e)},t))})]})]}),g===`hints`&&(0,P.jsx)(`div`,{className:`space-y-3`,children:e.hints.map((e,t)=>{let n=t<y;return(0,P.jsxs)(`div`,{className:`rounded-lg border border-[#222532] bg-[#12141c] p-3`,children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between mb-1`,children:[(0,P.jsxs)(`span`,{className:`flex items-center gap-1.5 text-[11px] font-medium text-[#9db2ff]`,children:[(0,P.jsx)(Te,{className:`h-3.5 w-3.5`}),`Hint `,t+1]}),!n&&(0,P.jsx)(`button`,{type:`button`,onClick:()=>b(t+1),className:`rounded bg-[#1a1f30] px-2 py-0.5 text-[10px] text-[#b4c3ff] hover:bg-[#232940] cursor-pointer`,children:`Reveal`})]}),n?(0,P.jsx)(`p`,{className:`text-xs text-[#cfd6e6]`,children:On(e)}):(0,P.jsx)(`p`,{className:`text-[11px] italic text-[#5e6578]`,children:`Hidden — try reasoning about invariants first.`})]},t)})}),g===`submissions`&&(0,P.jsx)(`div`,{className:`space-y-2`,children:t.length===0?(0,P.jsx)(`div`,{className:`py-8 text-center text-xs text-[#697084]`,children:`No full submissions yet — run tests from the Output drawer below.`}):t.map(e=>(0,P.jsxs)(`div`,{className:`flex items-center justify-between rounded-lg border border-[#222532] bg-[#12141c] px-3 py-2.5`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2.5`,children:[e.passed?(0,P.jsx)(ge,{className:`h-4 w-4 text-emerald-400`}):(0,P.jsx)(j,{className:`h-4 w-4 text-rose-400`}),(0,P.jsxs)(`div`,{children:[(0,P.jsxs)(`div`,{className:e.passed?`font-medium text-emerald-300`:`font-medium text-rose-300`,children:[e.passed?`Accepted`:`Wrong Answer`,` (`,e.passedCount,`/`,e.totalCount,`)`]}),(0,P.jsxs)(`div`,{className:`text-[11px] text-[#737b8e]`,children:[e.language,` · `,e.timestamp]})]})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-1 font-mono text-[11px] text-[#8d95a8]`,children:[(0,P.jsx)(be,{className:`h-3 w-3`}),e.runtimeMs,` ms`]})]},e.id))})]})]}),(0,P.jsx)(`div`,{className:`min-h-0 flex-1 overflow-hidden`,children:(0,P.jsx)(Tn,{height:`100%`,language:C.monacoId,value:n,theme:`trace-obsidian`,onMount:(e,t)=>{d.current=e,f.current=t,t.editor.defineTheme(`trace-obsidian`,{base:`vs-dark`,inherit:!0,rules:[{token:`comment`,foreground:`5a6378`,fontStyle:`italic`},{token:`keyword`,foreground:`9db2ff`},{token:`type`,foreground:`93c5fd`},{token:`string`,foreground:`86efac`},{token:`number`,foreground:`f9a8d4`}],colors:{"editor.background":`#0e1016`,"editor.foreground":`#dce2ee`,"editorLineNumber.foreground":`#3e4556`,"editorLineNumber.activeForeground":`#8a93a8`,"editorCursor.foreground":`#9db2ff`,"editor.lineHighlightBackground":`#141722`,"editor.selectionBackground":`#263052`,"editorGutter.background":`#0e1016`}}),t.editor.setTheme(`trace-obsidian`),e.onDidChangeCursorPosition(e=>{S({line:e.position.lineNumber,col:e.position.column})});let n=t.languages.typescript?.javascriptDefaults;n&&n.setDiagnosticsOptions({noSemanticValidation:!0,noSyntaxValidation:!1})},onChange:e=>s(e??``),options:{minimap:{enabled:!1},fontSize:13.5,lineHeight:22,fontFamily:`'JetBrains Mono', 'Fira Code', Consolas, monospace`,fontLigatures:!0,scrollBeyondLastLine:!1,automaticLayout:!0,glyphMargin:!0,lineNumbersMinChars:3,tabSize:r===`javascript`?2:4,wordWrap:`off`,padding:{top:14,bottom:12},smoothScrolling:!0,cursorBlinking:`smooth`,renderLineHighlight:`line`,scrollbar:{verticalScrollbarSize:6,horizontalScrollbarSize:6}}})}),(0,P.jsxs)(`div`,{className:`flex h-7 shrink-0 items-center justify-between border-t border-[#181b25] bg-[#0e1016] px-5 font-mono text-[11px] text-[#666e80]`,children:[(0,P.jsx)(`div`,{children:a?(0,P.jsxs)(`span`,{className:`text-rose-400`,children:[`Error on line `,a]}):i?(0,P.jsxs)(`span`,{children:[o?`Executing`:`Paused on`,` line`,` `,(0,P.jsx)(`span`,{className:`text-[#9db2ff]`,children:i})]}):(0,P.jsx)(`span`,{children:`Ready to trace`})}),(0,P.jsxs)(`div`,{children:[`Ln `,x.line,`, Col `,x.col]})]})]})};function An(e,t){return t===`string`?typeof e==`string`?e:JSON.stringify(e??``):JSON.stringify(e??null)}function jn(e,t){if(t===`string`){let t=e;if(t.startsWith(`"`)&&t.endsWith(`"`))try{return{ok:!0,value:JSON.parse(t)}}catch{return{ok:!0,value:t}}return{ok:!0,value:t}}try{return{ok:!0,value:JSON.parse(e)}}catch(e){return{ok:!1,error:e instanceof Error?e.message:`Invalid JSON`}}}var Mn=({problem:e,sampleTestCases:t,activeTestCaseId:n,customArgs:r,testResults:i,liveStdout:a,activeTab:o,isRunningTests:s,onTabChange:c,onSelectTestCase:l,onUpdateCustomArgs:u,onVisualizeCase:d,onRunTests:f,onSubmitAll:p})=>{let[m,h]=(0,_.useState)([]),[g,v]=(0,_.useState)([]),[y,b]=(0,_.useState)(!1),x=n===`custom`?{id:`custom`,label:`Custom`,args:r,expected:null}:t.find(e=>e.id===n)??t[0];(0,_.useEffect)(()=>{let t=x?.args??[];h(e.params.map((e,n)=>An(t[n],e.type))),v(e.params.map(()=>null))},[e.id,e.params,n,x?.args]),(0,_.useEffect)(()=>{n===`custom`&&b(!0)},[n]);let S=(t,i)=>{let a=[...m];a[t]=i,h(a);let o=jn(i,e.params[t]?.type??`any`),s=[...g];if(!o.ok){s[t]=o.error,v(s);return}s[t]=null,v(s);let c=n===`custom`?[...r]:[...x?.args??[]];c[t]=o.value,b(!0),n!==`custom`&&l(`custom`),u(c)},C=()=>{let e=t[0];e&&(b(!1),l(e.id),u(e.args))},w=()=>{let e=x?.args??t[0]?.args??[];b(!0),u(JSON.parse(JSON.stringify(e))),l(`custom`),c(`testcase`)},T=g.some(Boolean);return(0,P.jsxs)(`div`,{className:`flex h-full flex-col border-t border-[#1b1e29] bg-[#0e1016]`,children:[(0,P.jsxs)(`div`,{className:`flex h-9 shrink-0 items-center justify-between border-b border-[#191c26] px-5`,children:[(0,P.jsxs)(`div`,{className:`flex h-full items-center gap-5 text-xs font-medium`,children:[(0,P.jsx)(`button`,{type:`button`,onClick:()=>c(`testcase`),className:`h-full border-b-2 px-0.5 transition cursor-pointer ${o===`testcase`?`border-[#8ea3ff] text-[#eef1f8]`:`border-transparent text-[#6f778a] hover:text-[#cfd6e6]`}`,children:`Test case`}),(0,P.jsxs)(`button`,{type:`button`,onClick:()=>c(`output`),className:`flex h-full items-center gap-1.5 border-b-2 px-0.5 transition cursor-pointer ${o===`output`?`border-[#8ea3ff] text-[#eef1f8]`:`border-transparent text-[#6f778a] hover:text-[#cfd6e6]`}`,children:[(0,P.jsx)(`span`,{children:`Output`}),i&&(0,P.jsxs)(`span`,{className:`rounded px-1.5 py-0.5 font-mono text-[10px] ${i.allPassed?`bg-emerald-500/15 text-emerald-300`:`bg-rose-500/15 text-rose-300`}`,children:[i.passedCount,`/`,i.totalCount]})]})]}),!e.isPlayground&&(0,P.jsxs)(`button`,{type:`button`,onClick:w,className:`flex items-center gap-1 text-[11px] font-medium text-[#7b8396] transition hover:text-[#dce2ee] cursor-pointer`,children:[(0,P.jsx)(Le,{className:`h-3 w-3`}),(0,P.jsx)(`span`,{children:`Add case`})]})]}),(0,P.jsx)(`div`,{className:`min-h-0 flex-1 overflow-y-auto px-5 py-3`,children:o===`testcase`?e.isPlayground?(0,P.jsxs)(`div`,{className:`flex h-full flex-col justify-center gap-1 text-xs text-[#737b8e]`,children:[(0,P.jsx)(`p`,{children:`Playground script runs top-level code directly.`}),(0,P.jsx)(`p`,{className:`text-[11px] text-[#596073]`,children:`Switch to Output to view captured console / print statements.`})]}):(0,P.jsxs)(`div`,{className:`space-y-3`,children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,P.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[t.slice(0,4).map((e,t)=>{let r=n===e.id;return(0,P.jsxs)(`button`,{type:`button`,onClick:()=>l(e.id),className:`text-xs font-medium transition cursor-pointer ${r?`text-[#eef1f8]`:`text-[#666e82] hover:text-[#b4bccb]`}`,children:[`Case `,t+1]},e.id)}),y&&(0,P.jsx)(`button`,{type:`button`,onClick:()=>l(`custom`),className:`text-xs font-medium transition cursor-pointer ${n===`custom`?`text-[#9db2ff]`:`text-[#666e82] hover:text-[#b4bccb]`}`,children:`Custom`})]}),(0,P.jsxs)(`button`,{type:`button`,onClick:C,className:`flex items-center gap-1 text-[11px] text-[#6d7588] transition hover:text-[#cfd6e6] cursor-pointer`,children:[(0,P.jsx)(ze,{className:`h-2.5 w-2.5`}),(0,P.jsx)(`span`,{children:`Reset`})]})]}),(0,P.jsx)(`div`,{className:`grid gap-3 ${e.params.length>=2?`grid-cols-1 sm:grid-cols-2`:`grid-cols-1`}`,children:e.params.map((e,t)=>(0,P.jsxs)(`div`,{className:`space-y-1`,children:[(0,P.jsx)(`label`,{className:`block font-mono text-[11px] text-[#6f778a]`,children:e.name}),(0,P.jsx)(`input`,{type:`text`,value:m[t]??``,onChange:e=>S(t,e.target.value),spellCheck:!1,className:`w-full rounded-lg border bg-[#13151e] px-3 py-2 font-mono text-xs text-[#e2e7f2] focus:outline-none transition ${g[t]?`border-rose-500/60 focus:border-rose-400`:`border-[#222534] focus:border-[#7c90f6]`}`})]},e.name))}),(0,P.jsxs)(`div`,{className:`flex items-center justify-between pt-0.5 text-[11px]`,children:[T?(0,P.jsxs)(`span`,{className:`text-rose-400`,children:[`✕ `,g.find(Boolean)]}):(0,P.jsx)(`span`,{className:`text-emerald-400/80`,children:`✓ Valid input`}),x?.expected!==void 0&&x.expected!==null&&n!==`custom`&&(0,P.jsxs)(`span`,{className:`font-mono text-[#61687a]`,children:[`expected `,JSON.stringify(x.expected)]})]})]}):(0,P.jsxs)(`div`,{className:`space-y-3`,children:[!e.isPlayground&&(0,P.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-2`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,P.jsxs)(`button`,{type:`button`,onClick:f,disabled:s,className:`flex items-center gap-1.5 rounded-md border border-[#252938] bg-[#141722] px-2.5 py-1 text-[11px] font-medium text-[#cfd6e6] transition hover:border-[#363d54] hover:text-white disabled:opacity-50 cursor-pointer`,children:[(0,P.jsx)(Fe,{className:`h-3 w-3`}),(0,P.jsx)(`span`,{children:`Run Sample Cases`})]}),(0,P.jsxs)(`button`,{type:`button`,onClick:p,disabled:s,className:`flex items-center gap-1.5 rounded-md border border-[#2c334a] bg-[#171c2c] px-2.5 py-1 text-[11px] font-medium text-[#c5d0ff] transition hover:bg-[#1e253b] disabled:opacity-50 cursor-pointer`,children:[(0,P.jsx)(Ue,{className:`h-3 w-3`}),(0,P.jsxs)(`span`,{children:[`Submit All (`,e.testCases.length,`)`]})]})]}),i&&(0,P.jsxs)(`span`,{className:`font-mono text-[11px] text-[#6d7588]`,children:[i.totalRuntimeMs,` ms`]})]}),i&&(0,P.jsxs)(`div`,{className:`space-y-2`,children:[(0,P.jsx)(`div`,{className:`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${i.allPassed?`border-emerald-500/35 bg-emerald-500/10 text-emerald-200`:`border-rose-500/35 bg-rose-500/10 text-rose-200`}`,children:(0,P.jsxs)(`div`,{className:`flex items-center gap-2 font-medium`,children:[i.allPassed?(0,P.jsx)(ge,{className:`h-3.5 w-3.5 text-emerald-400`}):(0,P.jsx)(j,{className:`h-3.5 w-3.5 text-rose-400`}),(0,P.jsx)(`span`,{children:i.error?`Execution Error`:i.allPassed?`Accepted — ${i.passedCount}/${i.totalCount} Tests Passed`:`Wrong Answer — ${i.passedCount}/${i.totalCount} Passed`})]})}),i.error&&(0,P.jsx)(`div`,{className:`rounded-lg border border-rose-500/35 bg-rose-950/25 p-2.5 font-mono text-[11px] text-rose-200`,children:i.error}),i.results.map(t=>{let n=e.testCases.find(e=>e.id===t.testCaseId);return(0,P.jsxs)(`div`,{className:`rounded-lg border border-[#1f2230] bg-[#12141c] px-3 py-2 text-[11px] space-y-1`,children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-1.5`,children:[t.passed?(0,P.jsx)(ge,{className:`h-3 w-3 text-emerald-400`}):(0,P.jsx)(j,{className:`h-3 w-3 text-rose-400`}),(0,P.jsxs)(`span`,{className:`font-medium text-[#dce2ee]`,children:[t.label,t.isHidden?` (Hidden)`:``]}),(0,P.jsxs)(`span`,{className:`font-mono text-[10px] text-[#61687a]`,children:[t.runtimeMs,` ms`]})]}),n&&(0,P.jsxs)(`button`,{type:`button`,onClick:()=>d(n),className:`flex items-center gap-1 text-[10px] font-medium text-[#9db2ff] hover:underline cursor-pointer`,children:[(0,P.jsx)(Se,{className:`h-3 w-3`}),(0,P.jsx)(`span`,{children:t.passed?`Trace`:`Debug Failure`})]})]}),(0,P.jsx)(`div`,{className:`font-mono text-[#8890a4] break-all`,children:t.inputDisplay}),(0,P.jsxs)(`div`,{className:`flex flex-wrap gap-3 font-mono`,children:[(0,P.jsxs)(`span`,{className:`text-emerald-300/90`,children:[`expected: `,t.expectedDisplay]}),(0,P.jsxs)(`span`,{className:t.passed?`text-emerald-300/90`:`text-rose-300`,children:[`actual: `,t.actualDisplay]})]})]},t.testCaseId)})]}),(0,P.jsxs)(`div`,{className:`rounded-lg border border-[#1f2230] bg-[#0b0d12] p-2.5 font-mono text-[11px]`,children:[(0,P.jsxs)(`div`,{className:`mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#5f667a]`,children:[(0,P.jsx)(qe,{className:`h-3 w-3`}),(0,P.jsx)(`span`,{children:`Console stdout`})]}),a.length===0?(0,P.jsx)(`div`,{className:`text-[#545b6e]`,children:`// No print / console output captured`}):(0,P.jsx)(`div`,{className:`space-y-0.5 text-[#cfd6e6]`,children:a.map((e,t)=>(0,P.jsxs)(`div`,{className:`whitespace-pre-wrap break-all`,children:[(0,P.jsx)(`span`,{className:`mr-2 select-none text-[#535a6c]`,children:`>`}),e]},t))})]})]})})]})},Nn=[`#818cf8`,`#34d399`,`#fbbf24`,`#f472b6`,`#38bdf8`,`#a78bfa`,`#fb7185`],Pn=new Set(`target.sum.total.ans.res.result.output.count.cnt.max.min.maxArea.max_area.maxLen.max_len.minLen.min_len.water.area.height.width.profit.best.complement.comp.diff.val.value.temp.tmp.prod.prefix.suffix.leftMax.left_max.rightMax.right_max.numCourses.num_courses.amount.coins.n.m.rows.cols.len.size.depth.level.islands.streak.longest.fresh.minutes.mins.time.dist.steps.windowSum.window_sum.maxSum.max_sum.currSum.curr_sum.prefixSum.prefix_sum.targetSum.target_sum.remain.remaining.k.rooms.maxRooms.max_rooms.returnSize.returnColumnSizes`.split(`.`)),Fn=new Set(`i.j.l.r.left.right.mid.low.high.lo.hi.start.end.idx.index.pos.ptr.cur.curr.p.p1.p2.slow.fast.head.tail.front.back.a.b.c.row.col`.split(`.`));function In(e,t,n=0){if(!e)return`undefined`;if(e.kind===`primitive`)return e.type===`null`?`null`:e.type===`undefined`?`undefined`:e.type===`string`?JSON.stringify(e.value):String(e.value);let r=t[e.id];return r?n>2?`[${r.kind}]`:r.kind===`array`||r.kind===`heap`?`[${r.items.slice(0,6).map(e=>In(e,t,n+1)).join(`, `)}${r.items.length>6?`, ...`:``}]`:r.kind===`set`?`{${r.items.slice(0,5).map(e=>In(e,t,n+1)).join(`, `)}${r.items.length>5?`, ...`:``}}`:r.kind===`map`?`{${r.entries.slice(0,4).map(e=>`${e.key}: ${In(e.value,t,n+1)}`).join(`, `)}${r.entries.length>4?`, ...`:``}}`:`val`in r.fields?`${r.className}(${In(r.fields.val,t,n+1)})`:`${r.className}{...}`:`@${e.id}`}function Ln(e,t){if(!e)return`null`;if(e.kind===`primitive`)return e.type===`null`?`null`:e.type===`undefined`?`undef`:(e.type,String(e.value));let n=t[e.id];return n?n.kind===`object`&&`val`in n.fields?`${n.className}(${Ln(n.fields.val,t)})`:n.kind===`array`?`[${n.items.slice(0,3).map(e=>Ln(e,t)).join(`,`)}${n.items.length>3?`..`:``}]`:In(e,t,1):`@${e.id}`}function Rn(e){return!e||e.kind!==`object`?!1:e.className===`ListNode`||`next`in e.fields&&(`val`in e.fields||`value`in e.fields)}function zn(e){return!e||e.kind!==`object`?!1:e.className===`TreeNode`||(`left`in e.fields||`right`in e.fields)&&(`val`in e.fields||`value`in e.fields)}function Bn(e,t){if(!e||e.kind!==`array`||e.items.length===0)return!1;let n=-1;for(let r of e.items){if(r.kind!==`ref`)return!1;let e=t[r.id];if(!e||e.kind!==`array`||(n===-1&&(n=e.items.length),e.items.length===0))return!1;for(let t of e.items)if(t.kind!==`primitive`)return!1}return n>0}function Vn(e,t,n,r){if(!t||t.kind!==`array`||t.items.length===0)return!1;let i=/^(adj|graph|adjList|adj_list)$/i.test(e);if(!i&&r?.primaryStructure!==`graph`||!i&&/^(edges|prerequisites|intervals|res|result|ans)$/i.test(e))return!1;let a=t.items.length;return t.items.every(e=>{if(e.kind!==`ref`)return!1;let t=n[e.id];return!t||t.kind!==`array`?!1:t.items.every(e=>e.kind===`primitive`&&e.type===`number`&&typeof e.value==`number`&&e.value>=0&&e.value<a)})}function Hn(e){let t={};for(let n of e)for(let[e,r]of Object.entries(n.locals))t[e]=r;return{merged:t,topLocals:e.length>0?e[e.length-1].locals:{}}}function Un(e,t){for(let[n,r]of Object.entries(e))if(r.kind===`ref`&&r.id===t)return n;return null}function Wn(e,t){if(!e.length||t<0)return null;let n=e.slice(0,t+1),r={},i=[];for(let e of n)if(e.event===`call`&&!r[e.callId]){let t=e.callStack[e.callStack.length-1],n=t?Object.entries(t.locals).slice(0,3).map(([t,n])=>`${t}=${Ln(n,e.heap)}`).join(`, `):``;r[e.callId]={callId:e.callId,parentCallId:e.parentCallId,funcName:e.funcName,argsSummary:n,status:`active`,children:[]},e.parentCallId!==null&&r[e.parentCallId]?r[e.parentCallId].children.push(e.callId):i.push(e.callId)}else e.event===`return`&&r[e.callId]&&(r[e.callId].status=`returned`,e.returnValue&&(r[e.callId].returnDisplay=Ln(e.returnValue,e.heap)));if(Object.keys(r).length<2)return null;let a=n[n.length-1],o=a?.callId??null,s=new Set((a?.callStack??[]).map(e=>e.callId));for(let e of Object.values(r))e.status!==`returned`&&(e.status=e.callId===o?`active`:s.has(e.callId)?`waiting`:`returned`);return{roots:i,nodes:r,activeCallId:o}}function Gn(e,t,n,r,i){let a={arrays:[],matrices:[],linkedList:null,trees:[],graphs:[],maps:[],sets:[],stacksQueues:[],heaps:[],intervals:[],scalars:[],recursionTree:null};if(!e)return a;let{merged:o,topLocals:s}=Hn(e.callStack),c=t?Hn(t.callStack).merged:{},l=e.heap,u=t?.heap??{},d=[],f=0;for(let[e,t]of Object.entries(s)){let n=i?.highlightPointers?.includes(e)??!1;t.kind===`primitive`&&t.type===`number`&&typeof t.value==`number`&&Number.isInteger(t.value)&&(n||!Pn.has(e))&&(Fn.has(e)||n||t.value>=0&&t.value<=200)&&(d.push({name:e,value:t.value,color:Nn[f%Nn.length]}),f+=1)}d.sort((e,t)=>+!Fn.has(e.name)-!Fn.has(t.name));let p=Object.keys(l).filter(e=>Rn(l[e])),m=null;if(p.length>0){let e=new Set(p),t={};for(let e of p)t[e]=0;for(let n of p){let r=l[n].fields.next;r?.kind===`ref`&&e.has(r.id)&&(t[r.id]=(t[r.id]||0)+1)}let n={};for(let[t,r]of Object.entries(s))r.kind===`ref`&&e.has(r.id)&&(n[r.id]=n[r.id]||[],n[r.id].push(t));for(let[t,r]of Object.entries(o))r.kind===`ref`&&e.has(r.id)&&(n[r.id]=n[r.id]||[],n[r.id].includes(t)||n[r.id].push(t));let r=p.filter(e=>t[e]===0),i=r.length>0?r:[p[0]],a=[],c=new Set,d=[],f=t=>{let r=t;for(;r&&e.has(r)&&!c.has(r);){c.add(r);let t=l[r],i=u[r],o=t.fields.val??t.fields.value,s=t.fields.next,f=s?.kind===`ref`&&e.has(s.id)?s.id:null,p=!1;if(!i||i.kind!==`object`)p=!0;else{let e=i.fields.next,t=i.fields.val??i.fields.value;(JSON.stringify(e)!==JSON.stringify(s)||JSON.stringify(t)!==JSON.stringify(o))&&(p=!0)}if(a.push({id:r,valDisplay:Ln(o,l),nextId:f,pointers:n[r]??[],changed:p}),f&&c.has(f)){d.push({from:r,to:f});break}r=f}};for(let e of i)f(e);for(let e of p)c.has(e)||(i.push(e),f(e));m={nodes:a,heads:i,cycleEdges:d}}let h=Object.keys(l).filter(e=>zn(l[e])),g=[];if(h.length>0){let e=new Set(h),t={};for(let e of h)t[e]=0;for(let n of h){let r=l[n],i=r.fields.left?.kind===`ref`&&e.has(r.fields.left.id)?r.fields.left.id:null,a=r.fields.right?.kind===`ref`&&e.has(r.fields.right.id)?r.fields.right.id:null;i&&(t[i]+=1),a&&(t[a]+=1)}let n={};for(let[t,r]of Object.entries(s))r.kind===`ref`&&e.has(r.id)&&(n[r.id]=n[r.id]||[],n[r.id].push(t));let r=new Set;for(let[t,n]of Object.entries(o))if(n.kind===`ref`&&/^(q|queue|deque|stack|stk|st)/i.test(t)){let t=l[n.id];if(t?.kind===`array`){for(let n of t.items)if(n.kind===`ref`&&e.has(n.id)&&r.add(n.id),n.kind===`ref`&&l[n.id]?.kind===`array`)for(let t of l[n.id].items)t.kind===`ref`&&e.has(t.id)&&r.add(t.id)}}let i={};for(let t of h){let a=l[t],o=u[t],s=a.fields.val??a.fields.value,c=a.fields.left?.kind===`ref`&&e.has(a.fields.left.id)?a.fields.left.id:null,d=a.fields.right?.kind===`ref`&&e.has(a.fields.right.id)?a.fields.right.id:null,f=!1;o&&o.kind===`object`&&JSON.stringify(o.fields.left)===JSON.stringify(a.fields.left)&&JSON.stringify(o.fields.right)===JSON.stringify(a.fields.right)&&JSON.stringify(o.fields.val)===JSON.stringify(s)||(f=!0),i[t]={id:t,valDisplay:Ln(s,l),leftId:c,rightId:d,pointers:n[t]??[],inQueue:r.has(t),changed:f}}let a=o.root,c=h.find(e=>t[e]===0)??h[0];a?.kind===`ref`&&e.has(a.id)&&t[a.id]===0&&(c=a.id);let d=h.filter(e=>e!==c&&t[e]===0);g.push({rootId:c,nodes:i,extraRoots:d})}let _=[],v=[],y=[],b=[],x=[],S=[],C=[],w=[],T=[],E=new Set,D=Object.entries(o),O=d.find(e=>/^(r|row|i)$/i.test(e.name)),k=d.find(e=>/^(c|col|j)$/i.test(e.name)),ee=e=>{for(let[t,n]of[[`left`,`right`],[`l`,`r`],[`start`,`end`],[`low`,`high`],[`lo`,`hi`],[`slow`,`fast`]]){let r=d.find(e=>e.name===t),i=d.find(e=>e.name===n);if(r&&i&&r.value>=0&&i.value>=0&&r.value<=e&&i.value<=e){let a=Math.min(r.value,i.value),o=Math.max(r.value,i.value);if(o<e)return{start:a,end:o,label:`${t}..${n}`}}}};for(let[t,n]of D){let r=e.changedVars.includes(t);if(n.kind===`primitive`){if(n.type===`string`&&typeof n.value==`string`&&n.value.length>=1&&n.value.length<=40&&/^(s|t|word|word1|word2|text|text1|text2|str|pattern|chars|part)$/i.test(t)){let e=Array.from(n.value),i=d.filter(t=>t.value>=0&&t.value<=e.length).map(e=>({name:e.name,index:e.value,color:e.color}));v.push({id:`str_${t}`,name:t,isString:!0,items:e.map((e,t)=>({index:t,display:e,numericValue:null,changed:r})),pointers:i,windowRange:ee(e.length),preferBars:!1})}T.push({name:t,type:n.type,display:In(n,l),changed:r});continue}let a=l[n.id];if(a){if(Rn(a)||zn(a))E.add(n.id);else if(!E.has(n.id)){if(a.kind===`heap`){E.add(n.id);let e=u[n.id],r=e&&(e.kind===`heap`||e.kind===`array`)?e.items.length:0;C.push({id:n.id,name:t,comparator:a.comparator??`min`,items:a.items.map((t,n)=>{let i=e&&(e.kind===`heap`||e.kind===`array`)?e.items[n]:void 0,a=!i||n>=r||JSON.stringify(i)!==JSON.stringify(t),o=t.kind===`primitive`&&t.type===`number`?Number(t.value):null;return{display:Ln(t,l),numericValue:o,changed:a}})})}else if(a.kind===`array`){if(a.items.length>0&&a.items.every(e=>e.kind===`ref`&&(Rn(l[e.id])||zn(l[e.id])))){E.add(n.id);continue}if(a.items.length>0&&(i?.primaryStructure===`intervals`||/^(intervals|merged|meetings)$/i.test(t))&&a.items.every(e=>{if(e.kind!==`ref`)return!1;let t=l[e.id];return t?.kind===`array`&&t.items.length===2&&t.items[0]?.kind===`primitive`&&t.items[0].type===`number`&&t.items[1]?.kind===`primitive`&&t.items[1].type===`number`})){E.add(n.id);let e=u[n.id],r=[],i=1/0,o=-1/0;a.items.forEach((t,n)=>{if(t.kind!==`ref`)return;let a=l[t.id],s=Number(a.items[0].value),c=Number(a.items[1].value);i=Math.min(i,s),o=Math.max(o,c);let u=e?.kind===`array`?e.items[n]:void 0,d=!u||JSON.stringify(u)!==JSON.stringify(t);r.push({index:n,start:s,end:c,changed:d})});let s=d.filter(e=>e.value>=0&&e.value<r.length).map(e=>e.value);w.push({id:n.id,name:t,minVal:Number.isFinite(i)?i:0,maxVal:Number.isFinite(o)?o:1,items:r,activeIndices:s});continue}if((/^(heap|minHeap|min_heap|maxHeap|max_heap|pq|minPq|maxPq)$/i.test(t)||i?.primaryStructure===`heap`&&/heap|pq|rooms/i.test(t))&&a.className!==`Queue`&&a.className!==`Deque`){E.add(n.id);let e=u[n.id],r=e?.kind===`array`?e.items.length:0;C.push({id:n.id,name:t,comparator:/max/i.test(t)?`max`:`min`,items:a.items.map((t,n)=>{let i=e?.kind===`array`?e.items[n]:void 0,a=!i||n>=r||JSON.stringify(i)!==JSON.stringify(t),o=t.kind===`primitive`&&t.type===`number`?Number(t.value):null;return{display:Ln(t,l),numericValue:o,changed:a}})});continue}if(Vn(t,a,l,i)){E.add(n.id);let e=a.items.length,r=[];for(let t=0;t<e;t++){let e=a.items[t];if(e.kind===`ref`){let n=l[e.id];if(n?.kind===`array`)for(let e of n.items)e.kind===`primitive`&&typeof e.value==`number`&&r.push({from:String(t),to:String(e.value),directed:!0})}}let i=new Set,s=new Map,c=new Set,u=o.visited?.kind===`ref`?l[o.visited.id]:void 0;if(u?.kind===`set`)for(let e of u.items)e.kind===`primitive`&&typeof e.value==`number`&&i.add(e.value);let f=o.state??o.color??o.visited,p=f?.kind===`ref`?l[f.id]:void 0;p?.kind===`array`&&p.items.forEach((e,t)=>{e.kind===`primitive`&&typeof e.value==`number`&&s.set(t,e.value)});let m=o.queue??o.q,h=m?.kind===`ref`?l[m.id]:void 0;if(h?.kind===`array`)for(let e of h.items)e.kind===`primitive`&&typeof e.value==`number`&&c.add(e.value);let g=new Map;for(let t of d)if(/^(u|v|node|curr|cur|course|nei|next)$/i.test(t.name)&&t.value>=0&&t.value<e){let e=String(t.value);g.set(e,[...g.get(e)??[],t.name])}let _=[];for(let t=0;t<e;t++){let e=g.get(String(t))??[],n=`default`;e.length>0?n=`active`:c.has(t)?n=`queued`:i.has(t)||s.get(t)===2?n=`visited`:s.get(t)===1&&(n=`visiting`),_.push({id:String(t),label:String(t),status:n,pointers:e})}y.push({name:t,nodes:_,edges:r});continue}if(Bn(a,l)){E.add(n.id);let e=c[t]?.kind===`ref`?u[c[t].id]:u[n.id],r=a.items.map((t,n)=>{let r=t.kind===`ref`?l[t.id]:null,i=e?.kind===`array`?e.items[n]:void 0,a=i?.kind===`ref`?u[i.id]:void 0;return r.items.map((e,t)=>{let r=a?.kind===`array`?a.items[t]:void 0,i=r?JSON.stringify(r)!==JSON.stringify(e):!1;return{r:n,c:t,display:Ln(e,l),numericValue:e.kind===`primitive`&&e.type===`number`?Number(e.value):null,changed:i}})}),i=r.length,o=r[0]?.length??0;_.push({id:n.id,name:t,rows:r,activeRow:O&&O.value>=0&&O.value<i?O.value:null,activeCol:k&&k.value>=0&&k.value<o?k.value:null,rowLabel:O?.name,colLabel:k?.name});continue}let e=/^(stack|stk|st|mono)$/i.test(t)||a.className===`Stack`,r=/^(queue|q|deque|dq)$/i.test(t)||a.className===`deque`||a.className===`Queue`||a.className===`Deque`;if(e||r){E.add(n.id);let r=u[n.id],i=r?.kind===`array`?r.items.length:0;S.push({id:n.id,name:t,kind:e?`stack`:`queue`,items:a.items.map((e,t)=>{let n=r?.kind===`array`?r.items[t]:void 0,a=!n||t>=i||JSON.stringify(n)!==JSON.stringify(e);return{display:Ln(e,l),changed:a}})});continue}E.add(n.id);let s=u[n.id],f=a.items.map((e,t)=>{let n=s?.kind===`array`?s.items[t]:void 0,r=s?.kind===`array`?!n||JSON.stringify(n)!==JSON.stringify(e):!1,i=e.kind===`primitive`&&e.type===`number`?Number(e.value):null;return{index:t,display:Ln(e,l),numericValue:i,changed:r}}),p=d.filter(e=>e.value>=0&&e.value<=f.length).map(e=>({name:e.name,index:e.value,color:e.color})),m=f.length>0&&f.every(e=>e.numericValue!==null)&&(i?.primaryStructure===`bars`||/^(height|heights|temperatures|temps|bars|arr)$/i.test(t));v.push({id:n.id,name:t,items:f,pointers:p,windowRange:ee(f.length),preferBars:m})}else if(a.kind===`map`){if(E.add(n.id),i?.primaryStructure===`graph`&&/^(adj|graph|adjList|adj_list)$/i.test(t)&&a.entries.every(e=>e.value.kind===`ref`&&l[e.value.id]?.kind===`array`)){let e=new Set,n=[];for(let t of a.entries){e.add(t.key);let r=t.value.kind===`ref`?l[t.value.id]:void 0;if(r?.kind===`array`)for(let i of r.items){let r=Ln(i,l);e.add(r),n.push({from:t.key,to:r,directed:!0})}}y.push({name:t,nodes:Array.from(e).map(e=>({id:e,label:e,status:`default`,pointers:[]})),edges:n});continue}let e=u[n.id],r=new Map;if(e?.kind===`map`)for(let t of e.entries)r.set(t.key,JSON.stringify(t.value));b.push({id:n.id,name:t,entries:a.entries.map(t=>{let n=JSON.stringify(t.value),i=e?.kind!==`map`||r.get(t.key)!==n;return{key:t.key,valueDisplay:Ln(t.value,l),changed:i}})})}else if(a.kind===`set`){E.add(n.id);let e=u[n.id],r=new Set;if(e?.kind===`set`)for(let t of e.items)r.add(JSON.stringify(t));x.push({id:n.id,name:t,items:a.items.map(t=>({display:Ln(t,l),changed:e?.kind!==`set`||!r.has(JSON.stringify(t))}))})}else if(a.kind===`object`){if(`neighbors`in a.fields){E.add(n.id);let e=new Set,r=[n.id],i=[],a=[];for(;r.length>0&&e.size<40;){let t=r.shift();if(e.has(t))continue;e.add(t);let n=l[t];if(!n||n.kind!==`object`)continue;let o=Ln(n.fields.val,l),c=Un(s,t);i.push({id:t,label:o,status:c?`active`:`default`,pointers:c?[c]:[]});let u=n.fields.neighbors;if(u?.kind===`ref`&&l[u.id]?.kind===`array`)for(let n of l[u.id].items)n.kind===`ref`&&l[n.id]?.kind===`object`&&(a.push({from:t,to:n.id,directed:!1}),e.has(n.id)||r.push(n.id))}y.push({name:t,nodes:i,edges:a})}else T.push({name:t,type:a.className,display:In(n,l),changed:r})}}}}return v.sort((e,t)=>{let n=e=>+!/^(nums|height|heights|prices|s|t|dp|temperatures|arr)$/i.test(e);return n(e.name)-n(t.name)}),{arrays:v,matrices:_,linkedList:m,trees:g,graphs:y,maps:b,sets:x,stacksQueues:S,heaps:C,intervals:w,scalars:T,recursionTree:Wn(n,r)}}function Kn(e,t){if(!t||e.isPlayground)return{arrays:[],matrices:[],linkedList:null,trees:[],graphs:[],maps:[],sets:[],stacksQueues:[],heaps:[],intervals:[],scalars:[],recursionTree:null};let n={},r={},i=0,a=()=>`preview_${++i}`,o=e=>{if(e===null)return{kind:`primitive`,type:`null`,value:null};if(e===void 0)return{kind:`primitive`,type:`undefined`,value:null};if(typeof e==`boolean`)return{kind:`primitive`,type:`boolean`,value:e};if(typeof e==`number`)return{kind:`primitive`,type:`number`,value:e};if(typeof e==`string`)return{kind:`primitive`,type:`string`,value:e};if(Array.isArray(e)){let t=a();return n[t]={id:t,kind:`array`,items:e.slice(0,100).map(o)},{kind:`ref`,id:t}}return{kind:`primitive`,type:`string`,value:JSON.stringify(e)}};e.params.forEach((i,s)=>{let c=t.args[s];if(c!==void 0){if(i.type===`linkedList`||i.type===`linkedListCycle`){let e=i.type===`linkedListCycle`&&c&&typeof c==`object`&&!Array.isArray(c)?c.values??[]:Array.isArray(c)?c:[],t=i.type===`linkedListCycle`&&c&&typeof c==`object`&&!Array.isArray(c)?c.pos??-1:-1;if(e.length===0){r[i.name]={kind:`primitive`,type:`null`,value:null};return}let s=e.map(()=>a());e.forEach((r,i)=>{let a=i<e.length-1?i+1:t>=0&&t<e.length?t:-1;n[s[i]]={id:s[i],kind:`object`,className:`ListNode`,fields:{val:o(r),next:a>=0?{kind:`ref`,id:s[a]}:{kind:`primitive`,type:`null`,value:null}}}}),r[i.name]={kind:`ref`,id:s[0]}}else if(i.type===`linkedListArray`&&Array.isArray(c)){let e=[];for(let t of c){if(!Array.isArray(t)||t.length===0){e.push({kind:`primitive`,type:`null`,value:null});continue}let r=t.map(()=>a());t.forEach((e,i)=>{n[r[i]]={id:r[i],kind:`object`,className:`ListNode`,fields:{val:o(e),next:i<t.length-1?{kind:`ref`,id:r[i+1]}:{kind:`primitive`,type:`null`,value:null}}}}),e.push({kind:`ref`,id:r[0]})}let t=a();n[t]={id:t,kind:`array`,items:e},r[i.name]={kind:`ref`,id:t}}else{if(i.type===`treeNodeRef`){let e=Object.keys(n).find(e=>{let t=n[e];if(t.kind!==`object`||t.className!==`TreeNode`)return!1;let r=t.fields.val;return r?.kind===`primitive`&&r.value===c});if(e){r[i.name]={kind:`ref`,id:e};return}}if(i.type===`binaryTree`){let e=Array.isArray(c)?c:[];if(e.length===0||e[0]===null||e[0]===void 0){r[i.name]={kind:`primitive`,type:`null`,value:null};return}let t=a(),s=e=>{let t=a();return n[t]={id:t,kind:`object`,className:`TreeNode`,fields:{val:o(e),left:{kind:`primitive`,type:`null`,value:null},right:{kind:`primitive`,type:`null`,value:null}}},t};n[t]={id:t,kind:`object`,className:`TreeNode`,fields:{val:o(e[0]),left:{kind:`primitive`,type:`null`,value:null},right:{kind:`primitive`,type:`null`,value:null}}};let l=[t],u=1;for(;l.length>0&&u<e.length;){let t=l.shift(),r=n[t];if(u<e.length){let t=e[u++];if(t!=null){let e=s(t);r.fields.left={kind:`ref`,id:e},l.push(e)}}if(u<e.length){let t=e[u++];if(t!=null){let e=s(t);r.fields.right={kind:`ref`,id:e},l.push(e)}}}r[i.name]={kind:`ref`,id:t}}else if(e.id===`course-schedule`&&i.name===`prerequisites`&&Array.isArray(c)&&typeof t.args[0]==`number`){let e=t.args[0],n=Array.from({length:e},()=>[]);for(let t of c)Array.isArray(t)&&t.length>=2&&t[1]>=0&&t[1]<e&&n[t[1]].push(t[0]);r.adj=o(n)}else r[i.name]=o(c)}}});let s={step:0,line:1,event:`step`,funcName:e.entryFunction||`main`,callId:1,parentCallId:null,callStack:[{id:`preview`,callId:1,parentCallId:null,funcName:e.entryFunction||`main`,line:1,locals:r}],heap:n,stdout:[],changedVars:[]};return Gn(s,null,[s],0,e.visualHint)}function I(e,...t){for(let n of t){let t=e.scalars.find(e=>e.name===n);if(t){let e=t.display.replace(/^['"]|['"]$/g,``),n=Number(e);if(Number.isFinite(n)&&e!==``&&e!==`true`&&e!==`false`)return n}}return null}function qn(e,...t){for(let n of t){let t=e.scalars.find(e=>e.name===n);if(t)return t.display}return null}function Jn(e,...t){for(let n of t){let t=e.arrays.find(e=>e.name===n);if(t)return t}return e.arrays[0]}function Yn(e,...t){for(let n of t){let t=e.maps.find(e=>e.name===n);if(t)return t}return e.maps[0]}function Xn(e,...t){for(let n of t){let t=e.matrices.find(e=>e.name===n);if(t)return t}return e.matrices[0]}function Zn(e,t){return e?.event===`return`&&e.returnValue!==void 0&&e.callStack.length<=1?In(e.returnValue,e.heap):e===null&&t!==void 0?JSON.stringify(t):null}function Qn(e,t){if(!e)return 0;let n=0;for(let r of e.rows)for(let e of r)e.display===t&&n++;return n}function $n(e,t,n){return`${e}[${t}] = ${n}`}function er(e,t){let n=e.scenario?`${e.scenario} · `:``,r=e.description.split(`
`)[0].replace(/`([^`]+)`/g,`$1`).slice(0,110),i=t?e.params.map((e,n)=>`${e.name} = ${JSON.stringify(t.args[n])}`).join(`, `):``;return{headline:e.title,subtitle:`${n}${e.category} · ${e.timeComplexity}`,whyTitle:`Ready to trace every execution step.`,whyBody:r||`Press Visualize to inspect live pointers, data structures, and state transitions.`,resultPreview:i?{label:`input`,value:i.length>46?i.slice(0,43)+`...`:i,note:`expected ${JSON.stringify(t?.expected??``)}`}:void 0}}function tr(e,t,n,r,i,a,o=!1){if(o||!t)return er(e,i);let s=Zn(t,a),c=new Set(t.changedVars);if(t.event===`exception`||t.error)return{headline:`Execution error`,subtitle:`Stopped on line ${t.line}`,whyTitle:`Runtime exception raised.`,whyBody:t.error??`Check edge cases, array bounds, or syntax.`};switch(e.id){case`two-sum`:{let e=Jn(r,`nums`),t=Yn(r,`seen`,`map`,`mp`,`prevMap`,`dict`,`lookup`),n=I(r,`target`)??(Number(i?.args?.[1])||null),a=I(r,`i`,`idx`),o=I(r,`num`,`n`,`x`,`val`)??(a!==null&&e?.items[a]?e.items[a].numericValue:null),l=I(r,`complement`,`comp`,`diff`,`need`,`needed`)??(n!==null&&o!==null?n-o:null),u=l===null?null:String(l),d=u?t?.entries.find(e=>e.key.replace(/^['"]|['"]$/g,``)===u):void 0,f=n!==null&&o!==null&&l!==null?{label:`complement`,expression:`${n} - ${o} = ${l}`,badge:d?`✓ in seen`:`not in seen yet`,badgeOk:!!d}:void 0,p={keyLabel:`VALUE`,valueLabel:`INDEX`,highlightKey:u??void 0,noteFormatter:$n};if(s&&d)return{headline:`Match found`,subtitle:`Two values. One target.`,formula:f,mapAnnotation:p,whyTitle:`${o} needs ${l} to reach ${n}.`,whyBody:`We already saw ${l} at index ${d.valueDisplay}. Return both indices.`,resultPreview:{label:`return`,value:s,note:`${l} + ${o} = ${n}`}};if(d&&o!==null&&l!==null)return{headline:`Complement located`,subtitle:`Checking hash table lookup in O(1).`,formula:f,mapAnnotation:p,whyTitle:`${o} needs ${l} to reach ${n}.`,whyBody:`Hash map already holds ${l} → index ${d.valueDisplay}, avoiding a quadratic scan.`,resultPreview:{label:`pair`,value:`[${d.valueDisplay}, ${a??`?`}]`,note:`${l} + ${o} = ${n}`}};if(a!==null&&o!==null&&l!==null){let e=c.has(`seen`)||c.has(`mp`)||c.has(`map`);return{headline:e?`Record seen value`:`Inspect index ${a}`,subtitle:`Two values. One target.`,formula:f,mapAnnotation:p,whyTitle:e?`Stored ${o} → index ${a}.`:`${o} needs ${l} to reach ${n}.`,whyBody:e?`Future elements needing ${o} can now look up index ${a} in O(1) time.`:`${l} has not appeared earlier in the pass, so we record ${o} after checking.`}}return{headline:`Initialize hash map`,subtitle:`Two values. One target.`,mapAnnotation:p,whyTitle:`Trade O(n) space for O(1) complement lookups.`,whyBody:`Instead of nested loops checking every pair, remember each visited number and its index.`}}case`product-except-self`:{let e=Jn(r,`nums`),t=Jn(r,`res`,`ans`,`answer`,`output`,`result`),n=I(r,`i`),i=I(r,`prefix`,`left`,`pre`),a=I(r,`suffix`,`right`,`post`,`postfix`),o=a!==null&&(c.has(`suffix`)||c.has(`right`)||c.has(`post`)||i===null||a!==1||n!==null&&c.has(`res`)),l=n===null?0:n,u=e?.items[l]?.numericValue,d=t?.items[l]?.numericValue;return s?{headline:`Products complete`,subtitle:`Prefix pass + suffix pass in O(1) extra space.`,whyTitle:`Every index combined left and right products.`,whyBody:`Multiplying the prefix product (left of i) by the suffix product (right of i) excludes nums[i] without division.`,resultPreview:{label:`return`,value:s,note:`Time O(n) · Space O(1) aux`}}:o&&a!==null&&u!==null?{headline:`Suffix pass (right → left)`,subtitle:`Multiply stored left prefix by running right product.`,formula:{label:`res[${l}]`,expression:`${d??`?`} × ${a} (suffix)`,badge:`next suffix = ${a} × ${u}`,badgeOk:!0},whyTitle:`Index ${l} carries its left product ${d??`?`}.`,whyBody:`Multiplying by suffix ${a} gives the full product excluding nums[${l}] = ${u}.`}:{headline:`Prefix pass (left → right)`,subtitle:`Accumulate product of elements strictly before index i.`,formula:i===null?void 0:{label:`res[${l}] = prefix`,expression:`${i}${u===null?``:`  (then prefix × ${u})`}`,badge:`left pass`},whyTitle:i===null?`Prepare output array for two linear passes.`:`Prefix before index ${l} equals ${i}.`,whyBody:`First pass writes product of nums[0..i-1] into answer[i]; second pass multiplies by nums[i+1..n-1].`}}case`best-time-buy-sell-stock`:{let e=Jn(r,`prices`),t=I(r,`minPrice`,`min_price`,`low`,`buy`),n=I(r,`maxProfit`,`max_profit`,`profit`,`best`,`res`),i=I(r,`price`,`p`),a=I(r,`i`,`r`),o=i??(a===null?null:e?.items[a]?.numericValue??null),c=t!==null&&o!==null?o-t:null;return{headline:s?`Maximum profit found`:c!==null&&c>(n??0)?`New best sell day`:`Scan price timeline`,subtitle:`Single-pass minimum buy tracking.`,formula:t!==null&&o!==null&&c!==null?{label:`profit today`,expression:`${o} - ${t} = ${c}`,badge:n===null?void 0:`best = ${n}`,badgeOk:c>=0&&c>=(n??0)}:void 0,whyTitle:o!==null&&t!==null?`Lowest buy price so far is ${t}; selling at ${o} yields ${o-t}.`:`Track the running minimum buy price before today.`,whyBody:`A valid sale always comes after the buy day, so keeping minPrice from earlier indices guarantees temporal order in O(1) space.`,resultPreview:s?{label:`return`,value:s,note:`max profit`}:void 0}}case`container-with-most-water`:{let e=Jn(r,`height`,`h`),t=I(r,`l`,`left`),n=I(r,`r`,`right`),i=I(r,`best`,`maxArea`,`max_area`,`res`,`ans`),a=t===null?null:e?.items[t]?.numericValue??null,o=n===null?null:e?.items[n]?.numericValue??null,c=a!==null&&o!==null&&t!==null&&n!==null?Math.min(a,o)*(n-t):null;return{headline:s?`Maximum container area`:`Shrink the shorter wall`,subtitle:`Two converging pointers maximize width × min height.`,formula:c!==null&&t!==null&&n!==null&&a!==null&&o!==null?{label:`area`,expression:`min(${a}, ${o}) × (${n} - ${t}) = ${c}`,badge:i===null?void 0:`best = ${i}`,badgeOk:i!==null&&c>=i}:void 0,whyTitle:a!==null&&o!==null?`Left height ${a} vs right height ${o}: move ${a<=o?`left`:`right`} pointer.`:`Width only shrinks as pointers move inward.`,whyBody:`Moving the taller wall inward can never increase min(h[l], h[r]) while reducing width, so only advancing the shorter wall can uncover a taller bound.`,resultPreview:s?{label:`return`,value:s,note:`max water area`}:void 0}}case`trapping-rain-water`:{let e=Jn(r,`height`,`h`),t=I(r,`l`,`left`),n=I(r,`r`,`right`),i=I(r,`leftMax`,`left_max`,`lMax`),a=I(r,`rightMax`,`right_max`,`rMax`),o=I(r,`water`,`res`,`ans`,`total`),c=i!==null&&a!==null?i<=a?`left`:`right`:null,l=c===`left`?t:n,u=l===null?null:e?.items[l]?.numericValue??null;return{headline:s?`Total trapped water`:`Two-pointer boundary water`,subtitle:`Lower max boundary locks the water level at current bar.`,formula:i!==null&&a!==null&&u!==null?{label:c===`left`?`left fill`:`right fill`,expression:`${c===`left`?i:a} - ${u} = ${Math.max(0,(c===`left`?i:a)-u)}`,badge:o===null?void 0:`total = ${o}`,badgeOk:!0}:void 0,whyTitle:i!==null&&a!==null?`leftMax=${i}, rightMax=${a} → safe side is ${c}.`:`Maintain prefix/suffix walls dynamically.`,whyBody:`Water above a bar equals min(leftMax, rightMax) - height[i]. When leftMax <= rightMax, leftMax alone determines the cap at index l.`,resultPreview:s?{label:`return`,value:s,note:`units trapped`}:void 0}}case`longest-substring-no-repeat`:{let t=I(r,`left`,`l`),n=I(r,`right`,`r`),i=qn(r,`c`,`ch`,`char`),a=I(r,`best`,`maxLen`,`max_len`,`res`,`ans`),o=t!==null&&n!==null?Math.max(0,n-t+1):null;return{headline:s?`Longest unique window found`:c.has(`left`)||c.has(`l`)?`Shrink duplicate left edge`:`Expand sliding window`,subtitle:`${e.scenario?e.scenario+` · `:``}Sliding window + last-seen index.`,formula:t!==null&&n!==null?{label:`window [l..r]`,expression:`[${t}..${n}] length = ${o}${i?` (char ${i})`:``}`,badge:a===null?void 0:`best = ${a}`,badgeOk:o!==null&&a!==null&&o>=a}:void 0,whyTitle:i===null?`Jump left directly past duplicates.`:`Evaluating ${i} inside active window [${t??0}..${n??0}].`,whyBody:`Whenever right hits a repeated character inside [left..right], jumping left to lastSeen[ch] + 1 restores uniqueness in O(1) without backtracking right.`,resultPreview:s?{label:`return`,value:s,note:`max distinct length`}:void 0}}case`max-sum-distinct-subarrays`:{let t=I(r,`left`,`l`),n=I(r,`right`,`r`),i=I(r,`k`),a=I(r,`windowSum`,`window_sum`,`curSum`,`cur_sum`,`sum`),o=I(r,`maxSum`,`max_sum`,`best`,`ans`,`res`),c=Yn(r,`counts`,`freq`,`count`,`mp`,`map`)?.entries.length??r.sets[0]?.items.length??null,l=t!==null&&n!==null?n-t+1:null,u=i!==null&&l===i&&c===i;return{headline:s?`Max distinct k-sum`:u?`Valid distinct k-window`:`Slide & enforce uniqueness`,subtitle:`${e.scenario?e.scenario+` · `:``}Fixed-size sliding window.`,formula:a===null?void 0:{label:`window sum`,expression:`${a} (${c??`?`}/${i??`?`} unique)`,badge:u?`✓ valid k-window`:o===null?void 0:`best = ${o}`,badgeOk:u},whyTitle:u?`Window holds ${i} distinct elements summing to ${a}.`:`Maintain length ≤ k and zero duplicates.`,whyBody:`Evicting elements while size exceeds k or frequency > 1 ensures only valid distinct subarrays update maxSum.`,resultPreview:s?{label:`return`,value:s,note:`max distinct sum`}:void 0,mapAnnotation:{keyLabel:`VALUE`,valueLabel:`FREQ`,noteFormatter:$n}}}case`three-sum`:{let e=I(r,`i`),t=I(r,`l`,`left`),n=I(r,`r`,`right`),i=Jn(r,`nums`),a=e===null?null:i?.items[e]?.numericValue??null,o=t===null?null:i?.items[t]?.numericValue??null,c=n===null?null:i?.items[n]?.numericValue??null,l=a!==null&&o!==null&&c!==null?a+o+c:I(r,`total`,`sum`,`s`);return{headline:s?`All unique zero-sum triplets`:l===0?`Triplet sum = 0`:`Converge two pointers around anchor i`,subtitle:`Sort once, anchor nums[i], sweep sorted suffix.`,formula:a!==null&&o!==null&&c!==null&&l!==null?{label:`triplet sum`,expression:`${a} + (${o}) + (${c}) = ${l}`,badge:l===0?`✓ record triplet`:l<0?`too small → l++`:`too large → r--`,badgeOk:l===0}:void 0,whyTitle:l===null?`Sorting turns 2-sum suffix search into O(n).`:`Current sum is ${l} (anchor nums[${e??0}] = ${a??`?`}).`,whyBody:`Skipping equal adjacent anchors and equal l/r values guarantees zero duplicate triplets without needing a set.`,resultPreview:s?{label:`return`,value:s,note:`unique triplets`}:void 0}}case`subarray-sum-equals-k`:{let e=I(r,`k`),t=I(r,`prefixSum`,`prefix_sum`,`curr`,`cur`,`sum`),n=I(r,`count`,`ans`,`res`),i=t!==null&&e!==null?t-e:null,a=Yn(r,`prefixCounts`,`prefix_counts`,`counts`,`mp`,`map`,`seen`),o=i===null?void 0:a?.entries.find(e=>e.key===String(i));return{headline:s?`Subarray count complete`:o?`Matching prefix found`:`Accumulate prefix sum`,subtitle:`Prefix sum difference equals target k.`,formula:t!==null&&e!==null&&i!==null?{label:`needed prefix`,expression:`${t} - ${e} = ${i}`,badge:o?`+${o.valueDisplay} subarrays`:n===null?void 0:`count = ${n}`,badgeOk:!!o}:void 0,whyTitle:i!==null&&o?`Seen ${o.valueDisplay} prior prefix(es) equal to ${i}.`:`Every prior prefix of value (prefixSum - k) yields a valid ending subarray.`,whyBody:`Even with negative numbers where sliding window fails, prefixSum[r] - prefixSum[l-1] = k holds identically.`,resultPreview:s?{label:`return`,value:s,note:`subarrays summing to k`}:void 0,mapAnnotation:{keyLabel:`PREFIX`,valueLabel:`COUNT`,highlightKey:i===null?void 0:String(i),noteFormatter:$n}}}case`merge-intervals`:{let e=r.intervals.find(e=>e.name.includes(`merged`)||e.name===`res`||e.name===`ans`)??r.intervals[r.intervals.length-1],t=e?.items.length??0;return{headline:s?`Intervals merged`:`Sweep sorted intervals`,subtitle:`Sort by start time, extend end on overlap.`,formula:e&&t>0?{label:`last merged`,expression:`[${e.items[t-1].start}, ${e.items[t-1].end}]`,badge:`${t} interval(s)`,badgeOk:!0}:void 0,whyTitle:`Adjacent intervals overlap iff next.start ≤ current.end.`,whyBody:`After sorting by start coordinate, any interval that can merge with the current chain must touch the last merged interval.`,resultPreview:s?{label:`return`,value:s,note:`merged schedule`}:void 0}}case`binary-search`:case`search-rotated-array`:{let t=Jn(r,`nums`),n=I(r,`l`,`left`),a=I(r,`r`,`right`),o=I(r,`mid`,`m`),c=I(r,`target`)??(Number(i?.args?.[1])||null),l=o===null?null:t?.items[o]?.numericValue??null,u=l!==null&&c!==null&&l===c;return{headline:s?`Search finished`:u?`Target found at mid`:`Halve search space`,subtitle:e.id===`search-rotated-array`?`Identify sorted half before discarding.`:`Binary search O(log n) narrowing.`,formula:o!==null&&l!==null&&c!==null?{label:`nums[${o}] vs target`,expression:`${l} ${l===c?`==`:l<c?`<`:`>`} ${c}`,badge:u?`✓ index ${o}`:n!==null&&a!==null?`range [${n}..${a}]`:void 0,badgeOk:u}:void 0,whyTitle:u?`Middle element nums[${o}] equals ${c}.`:n!==null&&a!==null?`Search space narrows to [${n}..${a}] (${Math.max(0,a-n+1)} elements).`:`Initialize left and right bounds.`,whyBody:e.id===`search-rotated-array`?`At least one side of mid is guaranteed monotonically sorted; check whether target lies inside that sorted range.`:`Comparing mid against target eliminates half the remaining elements on each iteration.`,resultPreview:s?{label:`return`,value:s,note:`target index`}:void 0}}case`valid-parentheses`:{let e=r.stacksQueues[0],t=qn(r,`c`,`ch`,`char`),n=I(r,`i`),i=Jn(r,`s`),a=t??(n===null?void 0:i?.items[n]?.display);return{headline:s?`Validation complete`:`Match brackets with LIFO stack`,subtitle:`Opening brackets push expected closers; closers verify top of stack.`,formula:a?{label:`token`,expression:a,badge:`stack depth = ${e?.items.length??0}`,badgeOk:!0}:void 0,whyTitle:`Most recently opened bracket must close first (LIFO).`,whyBody:`If a closer meets an empty stack or mismatched opener, nesting is invalid immediately.`,resultPreview:s?{label:`return`,value:s,note:`valid brackets`}:void 0}}case`daily-temperatures`:{let e=I(r,`i`),t=Jn(r,`temperatures`,`temps`,`T`),n=e===null?null:t?.items[e]?.numericValue??null,i=r.stacksQueues[0];return{headline:s?`Wait days computed`:`Monotonic decreasing stack`,subtitle:`Resolve colder waiting days as soon as a warmer day arrives.`,formula:e!==null&&n!==null?{label:`day ${e}`,expression:`${n}°${i?` · waiting = ${i.items.length}`:``}`,badge:c.has(`res`)||c.has(`ans`)?`resolved colder day`:`push index`,badgeOk:c.has(`res`)||c.has(`ans`)}:void 0,whyTitle:`Each index is pushed once and popped once in O(n) total time.`,whyBody:`Whenever today is warmer than the day at the top of the stack, its exact wait distance is i - prevDay.`,resultPreview:s?{label:`return`,value:s,note:`days until warmer`}:void 0}}case`reverse-linked-list`:case`linked-list-cycle`:case`merge-two-sorted-lists`:{let t=r.linkedList?.nodes.some(e=>e.pointers.includes(`fast`)),n=r.linkedList?.nodes.reduce((e,t)=>e+t.pointers.length,0)??0,i={"reverse-linked-list":`Rewire next pointer backward`,"linked-list-cycle":t?`Floyd slow / fast pointer race`:`Advance tortoise & hare pointers`,"merge-two-sorted-lists":`Splice smaller head node`};return{headline:s?`Pointer traversal finished`:i[e.id],subtitle:`In-place O(1) extra space pointer rewiring.`,formula:{label:`active pointers`,expression:`${n} pointer(s) positioned`,badge:`${r.linkedList?.nodes.length??0} nodes`,badgeOk:!0},whyTitle:i[e.id],whyBody:{"reverse-linked-list":`Save curr.next before flipping curr.next = prev so the remaining list is never lost.`,"linked-list-cycle":`Fast advances 2 steps while slow advances 1; inside any cycle, their gap closes by 1 per step.`,"merge-two-sorted-lists":`Compare l1.val and l2.val and attach the smaller node directly without allocating copies.`}[e.id],resultPreview:s?{label:`return`,value:s}:void 0}}case`invert-binary-tree`:case`level-order-traversal`:case`validate-bst`:case`right-side-view`:case`path-sum-ii`:case`lowest-common-ancestor`:{let n=r.stacksQueues.find(e=>e.kind===`queue`),i=t.callStack.length,a=Jn(r,`path`,`res`,`level`,`ans`),o=I(r,`remaining`,`rem`,`curSum`,`sum`),[c,l,u]={"invert-binary-tree":[`Swap left & right subtrees`,`DFS post/pre-order mirror flip.`,`Swapping children recursively mirrors every subtree bottom-up or top-down.`],"level-order-traversal":[`Drain current BFS level`,`${e.scenario??`Category Hierarchy BFS`}`,`Snapshots q.length before draining ensures nodes from each depth stay grouped cleanly.`],"validate-bst":[`Verify strict (low, high) bounds`,`Pass ancestor range down recursion.`,`Checking node.val against left/right immediate children misses deep violations; range bounds enforce global BST order.`],"right-side-view":[`Capture rightmost node at depth`,`${e.scenario??`Hierarchy Right View`}`,`Iterating level-by-level via BFS queue means the final node (i == levelSize - 1) is visible from the right.`],"path-sum-ii":[`Explore root-to-leaf path & backtrack`,`${e.scenario??`Permission Path Accumulator`}`,`Record path when a leaf hits remaining == 0, then pop on return so siblings share one mutable path buffer.`],"lowest-common-ancestor":[`Propagate target hits upward`,`${e.scenario??`Shared Ancestor Lookup`}`,`The first node receiving non-null matches from both left and right subtrees is the lowest common ancestor.`]}[e.id];return{headline:s?`Tree traversal complete`:c,subtitle:l,formula:n?{label:`BFS queue`,expression:`${n.items.length} node(s) queued`,badge:a?`output len = ${a.items.length}`:void 0,badgeOk:!0}:o===null?{label:`recursion depth`,expression:`frame ${i} (${t.funcName})`,badgeOk:!0}:{label:`remaining sum`,expression:`${o}`,badge:`call depth ${i}`,badgeOk:o===0},whyTitle:c,whyBody:u,resultPreview:s?{label:`return`,value:s}:void 0}}case`rotting-oranges`:case`shortest-path-binary-matrix`:case`number-of-islands`:{let t=Xn(r,`grid`),n=r.stacksQueues.find(e=>e.kind===`queue`),i=I(r,`minutes`,`mins`,`dist`,`steps`,`islands`,`count`),a=I(r,`fresh`);if(e.id===`rotting-oranges`){let r=a??Qn(t,`1`),o=Qn(t,`2`);return{headline:s?`Propagation finished`:n&&n.items.length>0?`Expand rotten wavefront`:`Seed multi-source BFS`,subtitle:`${e.scenario??`Warehouse Multi-Source BFS`} · O(R·C)`,formula:{label:`grid state`,expression:`minutes = ${i??0} · fresh = ${r} · rotten = ${o}`,badge:n?`queue = ${n.items.length}`:void 0,badgeOk:r===0},whyTitle:`All initially rotten cells start in the deque together (minute 0).`,whyBody:`Expanding level-by-level spreads rot simultaneously in O(R·C) time while marking visited cells 1 → 2 in-place.`,resultPreview:s?{label:`return`,value:s,note:`minutes elapsed`}:void 0}}return e.id===`shortest-path-binary-matrix`?{headline:s?`Shortest path resolved`:`8-directional unweighted BFS`,subtitle:`${e.scenario??`Warehouse Robot Navigation`} · O(R·C)`,formula:{label:`BFS wavefront`,expression:`queue = ${n?.items.length??0}${i===null?``:` · dist = ${i}`}`,badge:t&&t.activeRow!==null&&t.activeCol!==null?`cell (${t.activeRow}, ${t.activeCol})`:void 0,badgeOk:!0},whyTitle:`First arrival at (n-1, n-1) in unweighted BFS is guaranteed shortest.`,whyBody:`Marking visited cells 0 → 1 on enqueue prevents duplicate queue entries and bounds work to O(R·C).`,resultPreview:s?{label:`return`,value:s,note:`path length`}:void 0}:{headline:s?`Island count complete`:`Flood-fill connected land`,subtitle:`${e.scenario??`Grid Cluster Discovery`} · O(R·C)`,formula:{label:`islands`,expression:`count = ${i??0}${t&&t.activeRow!==null&&t.activeCol!==null?` @ (${t.activeRow},${t.activeCol})`:``}`,badgeOk:!0},whyTitle:`Sink visited "1" cells to "0" during traversal.`,whyBody:`Every unvisited "1" starts one flood fill across its 4 neighbors, counting each connected component exactly once.`,resultPreview:s?{label:`return`,value:s,note:`total islands`}:void 0}}case`course-schedule`:{let e=r.stacksQueues.find(e=>e.kind===`queue`),t=I(r,`visited`,`count`,`taken`);return{headline:s?`Topological cycle check done`:`Kahn topological BFS`,subtitle:`Drain 0-indegree prerequisites.`,formula:{label:`progress`,expression:`completed = ${t??0} · ready queue = ${e?.items.length??0}`,badgeOk:!0},whyTitle:`Only courses with all prerequisites satisfied enter the queue.`,whyBody:`If every course finishes (visited == numCourses), the dependency graph is a DAG with no cycle.`,resultPreview:s?{label:`return`,value:s}:void 0}}case`top-k-frequent`:{let t=r.heaps[0],n=Yn(r,`counts`,`freq`,`count`,`mp`,`map`),a=I(r,`k`)??(Number(i?.args?.[1])||null);return{headline:s?`Top K items extracted`:t&&t.items.length>0?`Maintain size-k min-heap`:`Count item frequencies`,subtitle:`${e.scenario??`Frequency + Heap Top-K`} · O(n log k)`,formula:{label:`heap size`,expression:`${t?.items.length??0}${a===null?``:` / k=${a}`}`,badge:n?`${n.entries.length} distinct keys`:void 0,badgeOk:!0},whyTitle:`Evicting the smallest frequency whenever heap size > k retains the top k.`,whyBody:`Bounding the min-heap to k entries keeps push/pop at O(log k) instead of sorting all unique keys.`,resultPreview:s?{label:`return`,value:s,note:`top k keys`}:void 0,mapAnnotation:{keyLabel:`VALUE`,valueLabel:`FREQ`,noteFormatter:$n}}}case`k-closest-points`:{let t=r.heaps[0],n=I(r,`k`)??(Number(i?.args?.[1])||null),a=I(r,`dist`,`d`);return{headline:s?`K closest points ready`:`Bound distance heap / order`,subtitle:`${e.scenario??`Spatial Priority Queue`} · Squared distance`,formula:{label:`x² + y²`,expression:a===null?`heap size = ${t?.items.length??0}${n?` / ${n}`:``}`:`dist² = ${a}`,badgeOk:!0},whyTitle:`Squared Euclidean distance preserves ordering without sqrt overhead.`,whyBody:`Using a max-heap of size k (or min-heap) compares x² + y² directly in O(n log k) without floating-point rounding.`,resultPreview:s?{label:`return`,value:s}:void 0}}case`meeting-rooms-ii`:{let t=r.heaps[0],n=t?.items.length??I(r,`rooms`,`res`,`ans`)??0;return{headline:s?`Minimum concurrency computed`:`Track earliest finishing job in min-heap`,subtitle:`${e.scenario??`Capacity & Overlapping Intervals`} · O(n log n)`,formula:{label:`active rooms`,expression:`${t?.items.length??n}${t?.items[0]?` · earliest free = ${t.items[0].display}`:``}`,badgeOk:!0},whyTitle:`Reuse a room/server whenever the earliest end time ≤ next start time.`,whyBody:`If the heap top finishes before the new interval starts, pop and reuse that server; otherwise allocate one more.`,resultPreview:s?{label:`return`,value:s,note:`min rooms/servers`}:void 0}}case`merge-k-sorted-lists`:{let t=r.heaps[0];return{headline:s?`Merged k sorted lists`:`Pop smallest head from min-heap`,subtitle:`${e.scenario??`Multi-Way Log Merge`} · O(N log k)`,formula:{label:`frontier heap`,expression:`${t?.items.length??0} list heads queued`,badgeOk:!0},whyTitle:`At most k nodes sit inside the min-heap at any moment.`,whyBody:`Popping the smallest node and pushing node.next merges all k lists in O(N log k) time.`,resultPreview:s?{label:`return`,value:s}:void 0}}case`climbing-stairs`:case`house-robber`:case`coin-change`:{let t=e.id===`climbing-stairs`,n=e.id===`house-robber`,i=I(r,`a`,`i`,`step`,`amount`),a=Jn(r,`dp`),o=I(r,`prev1`,`rob2`,`curr`,`b`,`one`),c=I(r,`prev2`,`rob1`,`prev`,`a`,`two`);return{headline:s?`Optimal DP answer`:`Build bottom-up subproblems`,subtitle:t?`Fibonacci state transition dp[i] = dp[i-1] + dp[i-2].`:n?`Exclude/Include recurrence dp[i] = max(dp[i-1], dp[i-2] + nums[i]).`:`Unbounded knapsack min-coins recurrence.`,formula:o!==null&&c!==null&&t?{label:`recurrence`,expression:`${c} + ${o} = ${c+o}`,badgeOk:!0}:i!==null&&a?{label:`dp[${i}]`,expression:`${a.items[i]?.display??`?`}`,badgeOk:!0}:void 0,whyTitle:n?`At house i: either skip (keep prev1) or rob (prev2 + nums[i]).`:t?`Every step i is reached from step i-1 or i-2.`:`dp[a] records minimum coins needed to form amount a.`,whyBody:n?`Two rolling variables preserve the adjacent constraint in O(1) auxiliary space.`:t?`Reusing just two previous states computes dp[n] in O(n) time and O(1) space.`:`Testing each coin ≤ a builds optimal answers monotonically from 0 up to amount.`,resultPreview:s?{label:`return`,value:s}:void 0}}case`longest-common-subsequence`:{let e=Xn(r,`dp`),t=I(r,`i`,`r`),n=I(r,`j`,`c`),i=t!==null&&n!==null?e?.rows[t]?.[n]?.display:void 0;return{headline:s?`LCS table filled`:`Compare characters in 2D DP grid`,subtitle:`Match adds +1 diagonally; mismatch takes max(top, left).`,formula:t!==null&&n!==null?{label:`dp[${t}][${n}]`,expression:i??`evaluating`,badgeOk:!0}:void 0,whyTitle:`Prefix LCS of s1[0..i] and s2[0..j] depends only on shorter prefixes.`,whyBody:`Equal characters extend the diagonal LCS(i-1, j-1) + 1; unequal characters inherit the best without one character.`,resultPreview:s?{label:`return`,value:s,note:`LCS length`}:void 0}}case`longest-substring-k-repeating`:{let n=Jn(r,`s`),a=Yn(r,`counts`,`count`,`freq`,`mp`),o=I(r,`k`)??(Number(i?.args?.[1])||0),c=qn(r,`s`)?.replace(/^"|"$/g,``)??n?.items.map(e=>e.display).join(``)??``,l=qn(r,`ch`)?.replace(/^['"]|['"]$/g,``)??null,u=I(r,`cnt`),d=qn(r,`part`),f=t.callStack.length,p=a?.entries.find(e=>Number(e.valueDisplay)<o),m=(u!==null&&u<o&&l?l:p?.key.replace(/^['"]|['"]$/g,``))??null,h=u!==null&&u<o?u:p?Number(p.valueDisplay):null,g={keyLabel:`CHAR`,valueLabel:`COUNT`,highlightKey:m??void 0,noteFormatter:(e,t,n)=>{let r=Number(n);return Number.isFinite(r)&&o>0&&r<o?`< ${o} · split`:`>= ${o} ok`}},_=c.length<o,v=a&&a.entries.length>0&&!p&&!_;return{headline:s?`Branch returned ${s}`:m?`Split around '${m}'`:_?`Subproblem shorter than k`:a?`Verify character frequencies`:`Inspect current substring`,subtitle:`Divide & Conquer (depth ${f}) · ${e.timeComplexity}`,mapAnnotation:g,formula:m&&h!==null?{label:`split rule`,expression:`count('${m}') = ${h} < k (${o})`,badge:d?`part = ${d}`:`split & recurse`,badgeOk:!1}:_?{label:`base case`,expression:`len("${c}") = ${c.length} < k (${o})`,badge:`return 0`,badgeOk:!1}:v?{label:`valid slice`,expression:`all chars >= ${o} · len = ${c.length}`,badge:`✓ valid`,badgeOk:!0}:{label:`active slice`,expression:`s = "${c}" · k = ${o}`,badge:`depth ${f}`,badgeOk:!0},whyTitle:m?`'${m}' appears only ${h} time(s) (< ${o}), so it cannot sit inside any valid substring.`:_?`"${c}" has length ${c.length} < k=${o}, so no character can repeat k times.`:`Every character inside this slice appears at least k times.`,whyBody:`Splitting on any invalid character (< k occurrences) narrows the recursion by at least 1 unique letter, bounding recursion depth to at most 26 levels in O(26·N) = O(N) time.`,resultPreview:s?{label:`return`,value:s,note:f<=1?`longest valid length`:`from "${c}"`}:void 0}}case`partition-labels`:{let t=Jn(r,`s`),n=Yn(r,`last_seen`,`lastSeen`,`last`,`mp`),i=Jn(r,`res`,`ans`,`result`),a=I(r,`left`,`start`,`l`),o=I(r,`right`,`end`,`r`),l=I(r,`i`),u=qn(r,`ch`)?.replace(/^['"]|['"]$/g,``)??null??(l!==null&&t?.items[l]?t.items[l].display:null),d=u?n?.entries.find(e=>e.key.replace(/^['"]|['"]$/g,``)===u):void 0,f=l!==null&&o!==null&&l===o&&a!==null&&o>=a,p=c.has(`last_seen`)||c.has(`lastSeen`)||l!==null&&o===null,m={keyLabel:`CHAR`,valueLabel:`LAST IDX`,highlightKey:u??void 0,noteFormatter:(e,t,n)=>`last @ ${n}`},h=i&&i.items.length>0?`[${i.items.map(e=>e.display).join(`, `)}]`:null;return{headline:s?`All partitions closed`:f?`Close partition [${a}..${o}]`:p||!n||n.entries.length===0?`Record last occurrence per letter`:`Stretch partition boundary right`,subtitle:`Greedy Two Pointers · ${e.timeComplexity}`,mapAnnotation:m,formula:f&&a!==null&&o!==null?{label:`cut check`,expression:`i == right (${l} == ${o}) → size = ${o-a+1}`,badge:`✓ slice closed`,badgeOk:!0}:u&&d&&o!==null?{label:`extend right`,expression:`right = max(${o}, last['${u}']=${d.valueDisplay})`,badge:l===null?void 0:`i = ${l}`,badgeOk:!1}:u&&d?{label:`record last`,expression:`last_seen['${u}'] = ${d.valueDisplay}`,badgeOk:!0}:void 0,whyTitle:f&&a!==null&&o!==null?`Every character inside [${a}..${o}] has its last occurrence <= ${o}.`:`A partition cannot end until it covers the final occurrence of every letter seen inside it.`,whyBody:`Precomputing each character’s last index turns the partition check into a single linear scan: expand right = max(right, last[s[i]]) and cut whenever i catches up to right.`,resultPreview:s?{label:`return`,value:s,note:`partition sizes`}:h?{label:`partitions`,value:h,note:`${i?.items.length??0} piece(s)`}:void 0}}case`remove-duplicate-letters`:{let t=Jn(r,`s`),n=Yn(r,`last_index`,`lastIndex`,`last`,`mp`),i=r.stacksQueues.find(e=>e.kind===`stack`)??r.stacksQueues[0],a=i?void 0:Jn(r,`stack`,`st`,`res`),o=i?.items??a?.items??[],l=r.sets[0],u=I(r,`i`),d=qn(r,`ch`,`c`)?.replace(/^['"]|['"]$/g,``)??null??(u!==null&&t?.items[u]?t.items[u].display:null),f=o.length>0?o[o.length-1].display:null,p=f?f.replace(/^['"]|['"]$/g,``):null,m=p?n?.entries.find(e=>e.key.replace(/^['"]|['"]$/g,``)===p):void 0,h=m?Number(m.valueDisplay):null,g=!!(d&&l?.items.some(e=>e.display.replace(/^['"]|['"]$/g,``)===d)),_=!!(d&&p&&!g&&d<p&&h!==null&&u!==null&&h>u),v=o.map(e=>e.display.replace(/^['"]|['"]$/g,``)).join(``),y={keyLabel:`CHAR`,valueLabel:`LAST IDX`,highlightKey:(_?p:d)??void 0,noteFormatter:(e,t,n)=>{let r=Number(n);return u!==null&&Number.isFinite(r)?r>u?`appears again @ ${r}`:`final copy @ ${r}`:`last @ ${n}`}};return{headline:s?`Lexicographically smallest ready`:_?`Pop '${p}' before '${d}'`:g?`Skip duplicate '${d}'`:d&&!c.has(`last_index`)&&!c.has(`lastIndex`)?`Keep '${d}' on stack`:`Index last positions & build stack`,subtitle:`Monotonic Stack + Seen Set · ${e.timeComplexity}`,mapAnnotation:y,formula:_&&d&&p&&h!==null&&u!==null?{label:`greedy pop`,expression:`'${d}' < '${p}' & last['${p}']=${h} > i=${u}`,badge:`pop '${p}'`,badgeOk:!0}:g&&d?{label:`already used`,expression:`'${d}' ∈ seen`,badge:`skip duplicate`,badgeOk:!1}:d?{label:`stack`,expression:`top='${p??`∅`}' · push '${d}'`,badge:`unique = ${o.length}`,badgeOk:!0}:void 0,whyTitle:_&&p&&d?`Replacing '${p}' with smaller '${d}' is safe because '${p}' reappears later.`:`Maintain the smallest possible prefix while ensuring no last-remaining character is dropped.`,whyBody:`Each unique letter enters the monotonic stack once when unseen; bigger stack tops are popped only while another copy exists at a later index (last_index[top] > i).`,resultPreview:s?{label:`return`,value:s,note:`smallest subsequence`}:v?{label:`stack`,value:`"${v}"`,note:`${l?.items.length??v.length} unique`}:void 0}}default:{let n=r.scalars.filter(e=>e.changed).slice(0,3).map(e=>`${e.name}=${e.display}`).join(`, `),i=t.stdout[t.stdout.length-1];return{headline:s?`Execution finished`:t.event===`call`?`Call ${t.funcName}()`:t.event===`return`?`Return from ${t.funcName}()`:`Step ${t.step} · Line ${t.line}`,subtitle:`${e.category} · ${e.timeComplexity}`,formula:n?{label:`updated`,expression:n,badge:i?`stdout: ${i.slice(0,28)}`:void 0,badgeOk:!0}:i?{label:`stdout`,expression:i.slice(0,48),badgeOk:!0}:void 0,whyTitle:n?`Modified ${n} on line ${t.line}.`:`Executing ${t.funcName}() at line ${t.line}.`,whyBody:`Live memory frames, arrays, maps, heaps, trees, and pointers synchronize automatically on every statement.`,resultPreview:s?{label:`return`,value:s}:void 0}}}}var nr=({arrays:e,forceBars:t=!1,rightMeta:n,formula:r})=>e.length===0?null:(0,P.jsx)(`div`,{className:`space-y-4`,children:e.map((e,i)=>{let a=(t||e.preferBars)&&e.items.length>0&&e.items.every(e=>e.numericValue!==null),o=a?Math.max(1,...e.items.map(e=>Math.abs(e.numericValue??0))):1;return(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-4`,children:[(0,P.jsxs)(`div`,{className:`mb-3.5 flex items-center justify-between`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium text-[#b4bccb]`,children:e.name}),(0,P.jsx)(`span`,{className:`font-mono text-xs text-[#6f7688]`,children:i===0&&n?n:e.windowRange?`${e.windowRange.label} [${e.windowRange.start}..${e.windowRange.end}]`:`len ${e.items.length}`})]}),e.items.length===0?(0,P.jsx)(`div`,{className:`py-5 text-center font-mono text-xs italic text-[#646b7d]`,children:`[]`}):a?(0,P.jsx)(`div`,{className:`flex h-44 items-end gap-2 pt-7 pb-6`,children:e.items.map(t=>{let n=Math.max(0,t.numericValue??0),r=Math.max(8,n/o*100),i=e.pointers.filter(e=>e.index===t.index),a=e.windowRange&&t.index>=e.windowRange.start&&t.index<=e.windowRange.end,s=i.length>0;return(0,P.jsxs)(`div`,{className:`relative flex h-full min-w-[24px] flex-1 flex-col items-center justify-end`,children:[s&&(0,P.jsx)(`div`,{className:`absolute -top-6 flex flex-wrap justify-center gap-1`,children:i.map(e=>(0,P.jsx)(`span`,{className:`font-mono text-[10px] font-medium text-[#9db2ff]`,children:e.name},e.name))}),(0,P.jsx)(`div`,{className:`w-full max-w-[44px] rounded-t-md border transition-all duration-200 ${s?`border-[#8fa3ff] bg-[#7d93ff]/30`:t.changed?`border-[#5eead4]/70 bg-[#2dd4bf]/20`:a?`border-[#566494] bg-[#21273d]`:`border-[#272b3a] bg-[#191c26]`}`,style:{height:`${r}%`}}),(0,P.jsx)(`span`,{className:`mt-1 font-mono text-[10px] text-[#9aa3b8]`,children:t.display}),(0,P.jsx)(`span`,{className:`font-mono text-[9px] text-[#5e6577]`,children:t.index})]},t.index)})}):(0,P.jsx)(`div`,{className:`overflow-x-auto pb-1`,children:(0,P.jsx)(`div`,{className:`inline-flex min-w-full justify-center pt-5 ${e.items.length>10?`gap-1.5`:`gap-2.5`}`,children:e.items.map(t=>{let n=e.pointers.filter(e=>e.index===t.index),r=e.windowRange&&t.index>=e.windowRange.start&&t.index<=e.windowRange.end,i=!!n.find(e=>/^(i|j|mid|m|r|right|curr|head|fast|hi)$/i.test(e.name))||n.length>0&&e.pointers[0]?.index===t.index,a=n.length>0,o=e.items.length>10;return(0,P.jsxs)(`div`,{className:`relative flex flex-col items-center`,children:[(0,P.jsx)(`div`,{className:`absolute -top-5 flex h-4 items-center gap-1 whitespace-nowrap`,children:n.map(e=>(0,P.jsx)(`span`,{className:`font-mono text-[10px] font-medium ${i?`text-[#9db2ff]`:`text-[#7c87a3]`}`,children:e.name===`i`||e.name===`j`||e.name===`l`||e.name===`r`?`${e.name} = ${t.index}`:e.name},e.name))}),(0,P.jsx)(`div`,{className:`flex items-center justify-center rounded-lg border font-mono font-medium transition-all duration-150 ${o?`min-w-[34px] px-2 py-2 text-xs`:`min-w-[54px] px-3 py-3 text-sm`} ${i?`border-[#7c90f6] bg-[#1a2036] text-[#e6ebff] shadow-[0_0_0_1px_rgba(124,144,246,0.2)]`:a?`border-[#3d4766] bg-[#171b29] text-[#d5dcf0]`:t.changed?`border-[#4b608a] bg-[#181d2b] text-[#d9e2ff]`:r?`border-[#495580] bg-[#171b2a] text-[#dce2f0]`:`border-[#252836] bg-[#151720] text-[#b4bccd]`}`,children:t.display}),(0,P.jsx)(`span`,{className:`mt-1.5 font-mono text-[10px] text-[#60677a]`,children:t.index})]},t.index)})})}),i===0&&r&&(0,P.jsxs)(`div`,{className:`mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#1c1f2b] pt-3`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs text-[#6f7688]`,children:r.label}),(0,P.jsx)(`span`,{className:`font-mono text-sm tracking-wide text-[#e2e7f2]`,children:r.expression}),r.badge?(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium ${r.badgeOk?`text-[#9db2ff]`:`text-[#7a8296]`}`,children:r.badge}):(0,P.jsx)(`span`,{className:`w-12`})]})]},e.id)})});function rr(e,t,n){let r=e.replace(/^['"]|['"]$/g,``);if(t)return`border-[#8ea3ff] bg-[#1e2645] text-[#eef2ff] shadow-[0_0_0_1px_rgba(142,163,255,0.35)]`;if(n)return`border-[#5eead4]/60 bg-[#142929] text-[#ccfbf1]`;if(r===`2`||r===`rotten`)return`border-[#59352b] bg-[#241614] text-[#fda486]`;if(r===`1`||r===`land`)return`border-[#253b31] bg-[#13211b] text-[#7dd3a8]`;if(r===`0`)return`border-[#20232f] bg-[#13151c] text-[#555c6e]`;if(r===`#`)return`border-[#2e3242] bg-[#1f2330] text-[#7c849c]`;let i=Number(r);return Number.isFinite(i)&&r!==``?i>0?`border-[#2c334a] bg-[#171b2a] text-[#d6def5]`:`border-[#212430] bg-[#14161e] text-[#737b90]`:`border-[#252836] bg-[#151720] text-[#c4ccdc]`}var ir=({matrices:e})=>e.length===0?null:(0,P.jsx)(`div`,{className:`space-y-3`,children:e.map(e=>{let t=e.rows[0]?.length??0;return(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3.5`,children:[(0,P.jsxs)(`div`,{className:`mb-3 flex items-center justify-between`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium text-[#b4bccb]`,children:e.name}),(0,P.jsxs)(`span`,{className:`font-mono text-[11px] text-[#6d7488]`,children:[e.rows.length,` × `,t,e.activeRow!==null&&e.activeCol!==null?` · (${e.activeRow}, ${e.activeCol})`:``]})]}),e.rows.length===0?(0,P.jsx)(`div`,{className:`py-3 text-center font-mono text-xs italic text-[#60677a]`,children:`[ ] empty grid`}):(0,P.jsx)(`div`,{className:`overflow-x-auto`,children:(0,P.jsxs)(`table`,{className:`mx-auto border-separate border-spacing-1`,children:[(0,P.jsx)(`thead`,{children:(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`th`,{className:`w-6`}),Array.from({length:t},(t,n)=>(0,P.jsx)(`th`,{className:`pb-1 font-mono text-[10px] font-normal ${e.activeCol===n?`text-[#9db2ff]`:`text-[#5b6274]`}`,children:n},n))]})}),(0,P.jsx)(`tbody`,{children:e.rows.map((t,n)=>(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`pr-1.5 text-right font-mono text-[10px] ${e.activeRow===n?`text-[#9db2ff]`:`text-[#5b6274]`}`,children:n}),t.map(t=>{let n=e.activeRow===t.r&&e.activeCol===t.c;return(0,P.jsx)(`td`,{children:(0,P.jsx)(`div`,{className:`flex h-9 min-w-[36px] items-center justify-center rounded-md border px-2 font-mono text-xs font-medium transition-colors ${rr(t.display,n,t.changed)}`,children:t.display.replace(/^['"]|['"]$/g,``)})},t.c)})]},n))})]})})]},e.id)})});function ar(e,t,n=64,r=76){let i=new Map,a=new Set,o=0,s=0;function c(e,l){if(a.has(e)||!t[e])return o;a.add(e),s=Math.max(s,l);let u=t[e],d=!!(u.leftId&&t[u.leftId]&&!a.has(u.leftId)),f=!!(u.rightId&&t[u.rightId]&&!a.has(u.rightId)),p;if(!d&&!f)p=o,o+=n;else if(d&&f)p=(c(u.leftId,l+1)+c(u.rightId,l+1))/2;else if(d)p=c(u.leftId,l+1)+n*.4,o=Math.max(o,p+n*.6);else{let e=c(u.rightId,l+1);p=e-n*.4,o=Math.max(o,e+n*.6)}return i.set(e,{x:p,y:l*r+46}),p}c(e,0);let l=1/0,u=-1/0;for(let e of i.values())l=Math.min(l,e.x),u=Math.max(u,e.x);let d=Number.isFinite(l)?52-l:52,f=[],p=new Map;for(let[e,n]of i.entries()){let r={node:t[e],x:n.x+d,y:n.y};f.push(r),p.set(e,r)}let m=[];for(let e of f)e.node.leftId&&p.has(e.node.leftId)&&m.push({from:e,to:p.get(e.node.leftId)}),e.node.rightId&&p.has(e.node.rightId)&&m.push({from:e,to:p.get(e.node.rightId)});return{positioned:f,edges:m,width:Math.max(360,(Number.isFinite(u)?u-l:0)+104),height:Math.max(180,(s+1)*r+38)}}var or=({model:e})=>{let{positioned:t,edges:n,width:r,height:i}=ar(e.rootId,e.nodes);return(0,P.jsxs)(`div`,{className:`rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm`,children:[(0,P.jsxs)(`div`,{className:`mb-2 flex items-center justify-between gap-2`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,P.jsx)(`span`,{className:`rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-300 border border-emerald-500/25`,children:`Binary Tree`}),(0,P.jsxs)(`span`,{className:`text-[11px] text-slate-400`,children:[t.length,` visible nodes`]})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-2 text-[10px] text-slate-400`,children:[(0,P.jsxs)(`span`,{className:`flex items-center gap-1`,children:[(0,P.jsx)(`span`,{className:`inline-block h-2 w-2 rounded-full bg-indigo-400`}),` active pointer`]}),(0,P.jsxs)(`span`,{className:`flex items-center gap-1`,children:[(0,P.jsx)(`span`,{className:`inline-block h-2 w-2 rounded-full bg-amber-400`}),` queued`]})]})]}),(0,P.jsx)(`div`,{className:`overflow-x-auto flex justify-center`,children:(0,P.jsxs)(`svg`,{viewBox:`0 0 ${r} ${i}`,style:{minWidth:Math.min(r,420),maxWidth:`100%`,height:Math.min(340,i)},className:`block`,children:[n.map(({from:e,to:t})=>{let n=(e.y+t.y)/2;return(0,P.jsx)(`path`,{d:`M ${e.x} ${e.y+18} C ${e.x} ${n}, ${t.x} ${n}, ${t.x} ${t.y-18}`,fill:`none`,stroke:`#475569`,strokeWidth:2},`${e.node.id}-${t.node.id}`)}),t.map(({node:e,x:t,y:n})=>{let r=e.pointers.length>0,i=e.pointers.join(`,`);return(0,P.jsxs)(`g`,{transform:`translate(${t}, ${n})`,children:[r&&(0,P.jsxs)(`g`,{children:[(0,P.jsx)(`rect`,{x:-Math.max(20,i.length*4+8),y:-41,width:Math.max(40,i.length*8+16),height:17,rx:5,fill:`rgba(99, 102, 241, 0.25)`,stroke:`#818cf8`,strokeWidth:1}),(0,P.jsx)(`text`,{x:0,y:-29,textAnchor:`middle`,className:`fill-indigo-200 font-mono text-[10px] font-semibold`,children:i})]}),e.inQueue&&!r&&(0,P.jsx)(`circle`,{r:24,fill:`none`,stroke:`#fbbf24`,strokeWidth:1.5,strokeDasharray:`3 2`}),(0,P.jsx)(`circle`,{r:19,fill:e.changed?`rgba(16, 185, 129, 0.28)`:r?`rgba(99, 102, 241, 0.28)`:`#171d2c`,stroke:e.changed?`#34d399`:r?`#818cf8`:e.inQueue?`#fbbf24`:`#475569`,strokeWidth:r||e.changed?2.4:1.6}),(0,P.jsx)(`text`,{x:0,y:4,textAnchor:`middle`,className:`fill-slate-100 font-mono text-xs font-semibold`,children:e.valDisplay})]},e.id)})]})})]})},sr=({model:e})=>{let t=e.nodes.length,n=Math.min(96,Math.max(55,t*16)),r=new Map;e.nodes.forEach((e,i)=>{let a=-Math.PI/2+i*2*Math.PI/Math.max(1,t);r.set(e.id,{x:t===1?220:220+n*Math.cos(a),y:t===1?135:135+n*Math.sin(a)})});let i=new Set(e.edges.map(e=>`${e.from}->${e.to}`)),a=e=>{switch(e){case`active`:return{fill:`rgba(99, 102, 241, 0.3)`,stroke:`#818cf8`};case`queued`:return{fill:`rgba(251, 191, 36, 0.2)`,stroke:`#fbbf24`};case`visiting`:return{fill:`rgba(244, 114, 182, 0.25)`,stroke:`#f472b6`};case`visited`:return{fill:`rgba(16, 185, 129, 0.24)`,stroke:`#34d399`};default:return{fill:`#171d2c`,stroke:`#475569`}}};return(0,P.jsxs)(`div`,{className:`rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm`,children:[(0,P.jsxs)(`div`,{className:`mb-2 flex items-center justify-between gap-2 flex-wrap`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,P.jsxs)(`span`,{className:`rounded-md bg-sky-500/15 px-2 py-0.5 font-mono text-xs font-semibold text-sky-300 border border-sky-500/25`,children:[e.name,` (Graph)`]}),(0,P.jsxs)(`span`,{className:`text-[11px] text-slate-400`,children:[e.nodes.length,`V · `,e.edges.length,`E`]})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-2 text-[10px] text-slate-400`,children:[(0,P.jsxs)(`span`,{className:`flex items-center gap-1`,children:[(0,P.jsx)(`span`,{className:`h-2 w-2 rounded-full bg-indigo-400`}),` active`]}),(0,P.jsxs)(`span`,{className:`flex items-center gap-1`,children:[(0,P.jsx)(`span`,{className:`h-2 w-2 rounded-full bg-amber-400`}),` queued`]}),(0,P.jsxs)(`span`,{className:`flex items-center gap-1`,children:[(0,P.jsx)(`span`,{className:`h-2 w-2 rounded-full bg-emerald-400`}),` visited`]})]})]}),(0,P.jsx)(`div`,{className:`flex justify-center overflow-x-auto`,children:(0,P.jsxs)(`svg`,{viewBox:`0 0 440 270`,className:`w-full max-w-[460px] h-[250px]`,children:[(0,P.jsx)(`defs`,{children:(0,P.jsx)(`marker`,{id:`graph-arrow`,markerWidth:`8`,markerHeight:`8`,refX:`7`,refY:`4`,orient:`auto`,children:(0,P.jsx)(`path`,{d:`M0,1 L7,4 L0,7 Z`,fill:`#64748b`})})}),e.edges.map((e,t)=>{let n=r.get(e.from),a=r.get(e.to);if(!n||!a)return null;if(e.from===e.to)return(0,P.jsx)(`circle`,{cx:n.x,cy:n.y-24,r:11,fill:`none`,stroke:`#fbbf24`,strokeWidth:1.6},`self-${t}`);let o=a.x-n.x,s=a.y-n.y,c=Math.hypot(o,s)||1,l=o/c,u=s/c,d=e.directed&&i.has(`${e.to}->${e.from}`),f=n.x+l*20,p=n.y+u*20,m=a.x-l*(20+(e.directed?4:0)),h=a.y-u*(20+(e.directed?4:0));if(d){let n=-u*18,r=l*18,i=(f+m)/2+n,a=(p+h)/2+r;return(0,P.jsx)(`path`,{d:`M ${f} ${p} Q ${i} ${a} ${m} ${h}`,fill:`none`,stroke:`#64748b`,strokeWidth:1.6,markerEnd:e.directed?`url(#graph-arrow)`:void 0},`ge-${t}`)}return(0,P.jsx)(`line`,{x1:f,y1:p,x2:m,y2:h,stroke:`#64748b`,strokeWidth:1.6,markerEnd:e.directed?`url(#graph-arrow)`:void 0},`ge-${t}`)}),e.nodes.map(e=>{let t=r.get(e.id);if(!t)return null;let n=a(e.status);return(0,P.jsxs)(`g`,{transform:`translate(${t.x}, ${t.y})`,children:[e.pointers.length>0&&(0,P.jsx)(`text`,{x:0,y:-26,textAnchor:`middle`,className:`fill-indigo-300 font-mono text-[10px] font-semibold`,children:e.pointers.join(`,`)}),(0,P.jsx)(`circle`,{r:20,fill:n.fill,stroke:n.stroke,strokeWidth:e.status===`active`?2.4:1.7}),(0,P.jsx)(`text`,{x:0,y:4,textAnchor:`middle`,className:`fill-slate-100 font-mono text-xs font-semibold`,children:e.label})]},e.id)})]})})]})},cr=({model:e})=>{let t=new Map;for(let n of e.nodes)t.set(n.id,n);let n=new Set,r=[];for(let i of e.heads){let e=[],a=i;for(;a&&t.has(a)&&!n.has(a);){n.add(a);let r=t.get(a);if(!r)break;e.push(r),a=r.nextId}e.length>0&&r.push(e)}for(let t of e.nodes)n.has(t.id)||(n.add(t.id),r.push([t]));let i=new Map,a=1;r.forEach((e,t)=>{a=Math.max(a,e.length),e.forEach((e,n)=>{i.set(e.id,{x:36+n*136,y:52+t*112,row:t,col:n})})});let o=Math.max(460,72+a*136+40),s=Math.max(150,52+r.length*112+26);return(0,P.jsxs)(`div`,{className:`rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm`,children:[(0,P.jsxs)(`div`,{className:`mb-2 flex items-center justify-between`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,P.jsx)(`span`,{className:`rounded-md bg-violet-500/15 px-2 py-0.5 font-mono text-xs font-semibold text-violet-300 border border-violet-500/25`,children:`Linked List`}),(0,P.jsxs)(`span`,{className:`text-[11px] text-slate-400`,children:[e.nodes.length,` nodes`]})]}),e.cycleEdges.length>0&&(0,P.jsx)(`span`,{className:`rounded bg-amber-500/15 px-2 py-0.5 font-mono text-[11px] text-amber-300 border border-amber-500/30`,children:`Cycle Detected`})]}),(0,P.jsx)(`div`,{className:`overflow-x-auto`,children:(0,P.jsxs)(`svg`,{width:o,height:s,className:`block`,children:[(0,P.jsxs)(`defs`,{children:[(0,P.jsx)(`marker`,{id:`ll-arrow`,markerWidth:`8`,markerHeight:`8`,refX:`7`,refY:`4`,orient:`auto`,children:(0,P.jsx)(`path`,{d:`M0,1 L7,4 L0,7 Z`,fill:`#64748b`})}),(0,P.jsx)(`marker`,{id:`ll-arrow-cycle`,markerWidth:`8`,markerHeight:`8`,refX:`7`,refY:`4`,orient:`auto`,children:(0,P.jsx)(`path`,{d:`M0,1 L7,4 L0,7 Z`,fill:`#fbbf24`})})]}),e.nodes.map(e=>{let t=i.get(e.id);if(!t)return null;let n=t.x+84,r=t.y+19;if(!e.nextId)return(0,P.jsxs)(`g`,{children:[(0,P.jsx)(`line`,{x1:n,y1:r,x2:n+22,y2:r,stroke:`#475569`,strokeWidth:1.6,markerEnd:`url(#ll-arrow)`}),(0,P.jsx)(`rect`,{x:n+26,y:r-11,width:36,height:22,rx:6,fill:`#0f172a`,stroke:`#334155`,strokeDasharray:`3 2`}),(0,P.jsx)(`text`,{x:n+44,y:r+4,textAnchor:`middle`,className:`fill-slate-500 font-mono text-[10px]`,children:`null`})]},`null-${e.id}`);let a=i.get(e.nextId);if(!a)return null;let o=a.row===t.row&&a.col===t.col+1,s=a.row===t.row&&a.col<=t.col;if(o)return(0,P.jsx)(`line`,{x1:n,y1:r,x2:a.x-2,y2:a.y+19,stroke:`#64748b`,strokeWidth:1.8,markerEnd:`url(#ll-arrow)`},`e-${e.id}-${e.nextId}`);if(s){let n=a.x+42,r=a.y+38;return(0,P.jsx)(`path`,{d:`M ${t.x+42} ${t.y+38} C ${t.x+42} ${t.y+38+36}, ${n} ${r+36}, ${n} ${r+2}`,fill:`none`,stroke:`#fbbf24`,strokeWidth:1.8,strokeDasharray:`4 2`,markerEnd:`url(#ll-arrow-cycle)`},`e-${e.id}-${e.nextId}`)}let c=a.x,l=a.y+19,u=(n+c)/2;return(0,P.jsx)(`path`,{d:`M ${n} ${r} C ${u} ${r}, ${u} ${l}, ${c-2} ${l}`,fill:`none`,stroke:`#818cf8`,strokeWidth:1.8,markerEnd:`url(#ll-arrow)`},`e-${e.id}-${e.nextId}`)}),e.nodes.map(e=>{let t=i.get(e.id);if(!t)return null;let n=e.pointers.length>0,r=e.pointers.join(`, `);return(0,P.jsxs)(`g`,{children:[n&&(0,P.jsxs)(`g`,{children:[(0,P.jsx)(`rect`,{x:t.x+42-Math.max(28,r.length*4+10),y:t.y-34,width:Math.max(56,r.length*8+20),height:19,rx:5,fill:`rgba(99, 102, 241, 0.22)`,stroke:`#818cf8`,strokeWidth:1}),(0,P.jsx)(`text`,{x:t.x+42,y:t.y-21,textAnchor:`middle`,className:`fill-indigo-200 font-mono text-[10px] font-semibold`,children:r}),(0,P.jsx)(`line`,{x1:t.x+42,y1:t.y-15,x2:t.x+42,y2:t.y-2,stroke:`#818cf8`,strokeWidth:1.3})]}),(0,P.jsx)(`rect`,{x:t.x,y:t.y,width:84,height:38,rx:8,fill:e.changed?`rgba(16, 185, 129, 0.2)`:n?`rgba(99, 102, 241, 0.16)`:`#171d2c`,stroke:e.changed?`#34d399`:n?`#818cf8`:`#334155`,strokeWidth:n||e.changed?2:1.4}),(0,P.jsx)(`line`,{x1:t.x+84-24,y1:t.y+4,x2:t.x+84-24,y2:t.y+38-4,stroke:`#334155`,strokeWidth:1}),(0,P.jsx)(`text`,{x:t.x+30,y:t.y+19+5,textAnchor:`middle`,className:`fill-slate-100 font-mono text-sm font-semibold`,children:e.valDisplay}),(0,P.jsx)(`circle`,{cx:t.x+84-12,cy:t.y+19,r:3.2,fill:e.nextId?`#818cf8`:`#475569`})]},e.id)})]})})]})},lr=({maps:e,sets:t,mapAnnotation:n})=>e.length===0&&t.length===0?null:(0,P.jsxs)(`div`,{className:`space-y-3`,children:[e.map((e,t)=>{let r=t===0&&n?n.keyLabel:`KEY`,i=t===0&&n?n.valueLabel:`VALUE`;return(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3.5`,children:[(0,P.jsxs)(`div`,{className:`mb-2.5 flex items-center justify-between`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium text-[#b4bccb]`,children:e.name}),(0,P.jsx)(`span`,{className:`text-[11px] text-[#6a7183]`,children:`Hash map`})]}),e.entries.length===0?(0,P.jsx)(`div`,{className:`py-2 text-xs italic text-[#60677a]`,children:`{ } empty`}):(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`div`,{className:`mb-1.5 grid grid-cols-[1fr_auto] items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-[#61687a]`,children:(0,P.jsxs)(`div`,{className:`flex items-center gap-5`,children:[(0,P.jsx)(`span`,{className:`min-w-[44px]`,children:r}),(0,P.jsx)(`span`,{className:`w-3`}),(0,P.jsx)(`span`,{children:i})]})}),(0,P.jsx)(`div`,{className:`divide-y divide-[#1a1d28]`,children:e.entries.map(r=>{let i=r.key.replace(/^['"]|['"]$/g,``),a=t===0&&n?.highlightKey!==void 0&&i===n.highlightKey,o=t===0&&n?n.noteFormatter(e.name,r.key,r.valueDisplay):`${e.name}[${r.key}] = ${r.valueDisplay}`;return(0,P.jsxs)(`div`,{className:`flex items-center justify-between py-1.5 font-mono text-xs transition-colors ${a?`text-[#dce4ff]`:r.changed?`text-[#9db2ff]`:`text-[#cfd6e6]`}`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-5`,children:[(0,P.jsx)(`span`,{className:`min-w-[44px] font-medium ${a?`text-[#9db2ff]`:`text-[#e3e8f4]`}`,children:r.key}),(0,P.jsx)(`span`,{className:`text-[#5e6578]`,children:`→`}),(0,P.jsx)(`span`,{children:r.valueDisplay})]}),(0,P.jsx)(`span`,{className:`text-[11px] text-[#6d7589]`,children:o})]},r.key)})})]})]},e.id)}),t.map(e=>(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3.5`,children:[(0,P.jsxs)(`div`,{className:`mb-2.5 flex items-center justify-between`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium text-[#b4bccb]`,children:e.name}),(0,P.jsxs)(`span`,{className:`text-[11px] text-[#6a7183]`,children:[`Hash set · `,e.items.length]})]}),e.items.length===0?(0,P.jsx)(`div`,{className:`py-1.5 text-xs italic text-[#60677a]`,children:`empty set`}):(0,P.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:e.items.map((e,t)=>(0,P.jsx)(`span`,{className:`rounded-md border px-2.5 py-1 font-mono text-xs ${e.changed?`border-[#7c90f6] bg-[#1a2036] text-[#dce4ff]`:`border-[#252836] bg-[#151720] text-[#c7cfdf]`}`,children:e.display},t))})]},e.id))]}),ur=({items:e})=>e.length===0?null:(0,P.jsx)(`div`,{className:`space-y-3`,children:e.map(e=>(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3.5`,children:[(0,P.jsxs)(`div`,{className:`mb-2.5 flex items-center justify-between`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium text-[#b4bccb]`,children:e.name}),(0,P.jsxs)(`span`,{className:`text-[11px] text-[#6d7488]`,children:[e.kind===`queue`?`Queue (FIFO)`:`Stack (LIFO)`,` · `,e.items.length]})]}),e.items.length===0?(0,P.jsx)(`div`,{className:`py-2 text-xs italic text-[#60677a]`,children:`empty`}):(0,P.jsxs)(`div`,{className:`flex flex-wrap items-center gap-1.5`,children:[e.kind===`queue`&&(0,P.jsx)(`span`,{className:`mr-1 font-mono text-[10px] uppercase tracking-wider text-[#666d80]`,children:`front →`}),e.items.map((t,n)=>{let r=e.kind===`queue`&&n===0||e.kind===`stack`&&n===e.items.length-1;return(0,P.jsx)(`div`,{className:`rounded-md border px-2.5 py-1 font-mono text-xs ${r?`border-[#7c90f6] bg-[#1a2036] text-[#dce4ff]`:t.changed?`border-[#5eead4]/60 bg-[#142929] text-[#ccfbf1]`:`border-[#252836] bg-[#151720] text-[#c7cfdf]`}`,children:t.display},n)}),e.kind===`stack`&&(0,P.jsx)(`span`,{className:`ml-1 font-mono text-[10px] uppercase tracking-wider text-[#666d80]`,children:`← top`})]})]},e.id))}),dr=({heaps:e})=>e.length===0?null:(0,P.jsx)(`div`,{className:`space-y-3`,children:e.map(e=>{let t=e.items.length>0&&e.items.length<=15,n=t?Math.floor(Math.log2(e.items.length))+1:0,r=Math.max(88,n*52+18),i=e.items.map((e,t)=>{let n=Math.floor(Math.log2(t+1)),r=t-(2**n-1),i=2**n;return{x:(r+.5)/i*440,y:26+n*48}});return(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#232634] bg-[#14161e] px-4 py-3`,children:[(0,P.jsxs)(`div`,{className:`mb-2.5 flex items-center justify-between`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium text-[#d7dce6]`,children:e.name}),(0,P.jsx)(`span`,{className:`rounded bg-[#1c1f2b] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#9db2ff]`,children:e.comparator===`max`?`max-heap`:`min-heap`})]}),(0,P.jsxs)(`span`,{className:`text-[11px] text-[#72798c]`,children:[e.items.length,` item`,e.items.length===1?``:`s`]})]}),e.items.length===0?(0,P.jsx)(`div`,{className:`py-3 text-center text-xs italic text-[#687082]`,children:`empty priority queue`}):(0,P.jsxs)(`div`,{className:`space-y-3`,children:[t&&(0,P.jsxs)(`svg`,{viewBox:`0 0 440 ${r}`,className:`mx-auto block w-full max-w-[440px] overflow-visible`,children:[e.items.map((e,t)=>{if(t===0)return null;let n=Math.floor((t-1)/2),r=i[n],a=i[t];return(0,P.jsx)(`line`,{x1:r.x,y1:r.y,x2:a.x,y2:a.y,stroke:`#292d3d`,strokeWidth:1.4},`edge-${n}-${t}`)}),e.items.map((e,t)=>{let n=i[t],r=t===0,a=e.display.length>10?e.display.slice(0,9)+`…`:e.display,o=Math.max(36,Math.min(76,a.length*7.5+14));return(0,P.jsxs)(`g`,{children:[(0,P.jsx)(`rect`,{x:n.x-o/2,y:n.y-14,width:o,height:28,rx:7,fill:r?`#1d2236`:`#181a24`,stroke:r?`#8b9eff`:e.changed?`#5eead4`:`#2a2e3e`,strokeWidth:r||e.changed?1.5:1}),(0,P.jsx)(`text`,{x:n.x,y:n.y+4,textAnchor:`middle`,className:`font-mono text-[11px] font-medium`,fill:r?`#d9e2ff`:`#d6dae4`,children:a})]},`node-${t}`)})]}),(0,P.jsx)(`div`,{className:`flex flex-wrap items-center gap-1.5 border-t border-[#1e212e] pt-2.5`,children:e.items.map((e,t)=>(0,P.jsxs)(`div`,{className:`flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-xs transition-colors ${t===0?`border-[#7c8ef7]/60 bg-[#1c2135] text-[#dce3ff]`:e.changed?`border-[#3b4b6b] bg-[#191d2b] text-[#d6dae4]`:`border-[#252836] bg-[#161821] text-[#b4bccb]`}`,children:[(0,P.jsx)(`span`,{className:`text-[10px] text-[#6d7487]`,children:t===0?`top`:t}),(0,P.jsx)(`span`,{children:e.display})]},t))})]})]},e.id)})}),fr=({intervals:e})=>e.length===0?null:(0,P.jsx)(`div`,{className:`space-y-3`,children:e.map(e=>{let t=Math.max(1,e.maxVal-e.minVal),n=Math.min(8,Math.max(3,t+1)),r=new Set(e.activeIndices);return(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#232634] bg-[#14161e] px-4 py-3`,children:[(0,P.jsxs)(`div`,{className:`mb-3 flex items-center justify-between`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium text-[#d7dce6]`,children:e.name}),(0,P.jsxs)(`span`,{className:`text-[11px] text-[#72798c]`,children:[`[`,e.minVal,` .. `,e.maxVal,`] · `,e.items.length,` interval`,e.items.length===1?``:`s`]})]}),e.items.length===0?(0,P.jsx)(`div`,{className:`py-3 text-center text-xs italic text-[#687082]`,children:`empty intervals`}):(0,P.jsxs)(`div`,{className:`space-y-2`,children:[e.items.map(n=>{let i=(n.start-e.minVal)/t*100,a=Math.max(3,(n.end-n.start)/t*100),o=r.has(n.index);return(0,P.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,P.jsxs)(`span`,{className:`w-16 shrink-0 font-mono text-[11px] text-[#838b9e]`,children:[`[`,n.start,`, `,n.end,`]`]}),(0,P.jsx)(`div`,{className:`relative h-5 flex-1 rounded bg-[#191b25]`,children:(0,P.jsx)(`div`,{className:`absolute top-1 bottom-1 rounded transition-all duration-200 ${o?`border border-[#90a4ff] bg-[#7c90ff]/35`:n.changed?`border border-[#5eead4]/60 bg-[#2dd4bf]/20`:`border border-[#383e54] bg-[#262b3d]`}`,style:{left:`${Math.min(97,Math.max(0,i))}%`,width:`${Math.min(100-Math.max(0,i),a)}%`}})})]},n.index)}),(0,P.jsx)(`div`,{className:`ml-[76px] flex justify-between border-t border-[#1e212e] pt-1 font-mono text-[10px] text-[#666d80]`,children:Array.from({length:n},(r,i)=>{let a=Math.round(e.minVal+t*i/(n-1));return(0,P.jsx)(`span`,{children:a},i)})})]})]},e.id)})}),pr=({frames:e,heap:t,changedVars:n})=>(0,P.jsxs)(`div`,{className:`rounded-xl border border-slate-800/90 bg-[#111622]/90 p-3.5 shadow-sm`,children:[(0,P.jsx)(`div`,{className:`mb-2.5 flex items-center justify-between`,children:(0,P.jsxs)(`span`,{className:`text-xs font-semibold uppercase tracking-wider text-slate-400`,children:[`Call Stack (`,e.length,`)`]})}),(0,P.jsx)(`div`,{className:`flex flex-col-reverse gap-2`,children:e.map((r,i)=>{let a=i===e.length-1,o=Object.entries(r.locals);return(0,P.jsxs)(`div`,{className:`rounded-lg border p-2.5 ${a?`border-indigo-500/50 bg-indigo-500/10`:`border-slate-800 bg-slate-900/60 opacity-85`}`,children:[(0,P.jsxs)(`div`,{className:`mb-1.5 flex items-center justify-between font-mono text-xs`,children:[(0,P.jsxs)(`span`,{className:a?`font-semibold text-indigo-200`:`text-slate-300`,children:[r.funcName,`()`]}),(0,P.jsxs)(`span`,{className:`rounded bg-slate-800/90 px-1.5 py-0.5 text-[10px] text-slate-400`,children:[`line `,r.line]})]}),o.length===0?(0,P.jsx)(`div`,{className:`font-mono text-[11px] text-slate-500`,children:`(no local variables)`}):(0,P.jsx)(`div`,{className:`grid grid-cols-1 gap-1`,children:o.map(([e,r])=>{let i=a&&n.includes(e);return(0,P.jsxs)(`div`,{className:`flex items-baseline justify-between gap-2 rounded px-1.5 py-0.5 font-mono text-[11px] ${i?`bg-emerald-500/15 text-emerald-200`:`text-slate-300`}`,children:[(0,P.jsxs)(`span`,{className:`text-slate-400 shrink-0`,children:[e,`:`]}),(0,P.jsx)(`span`,{className:`truncate text-right text-slate-100`,children:In(r,t)})]},e)})})]},r.id)})})]}),mr=({tree:e})=>{let t=new Map,n=0,r=0;function i(a,o){let s=e.nodes[a];if(!s)return n;if(r=Math.max(r,o),s.children.length===0){let e=n;return n+=144,t.set(a,{x:e,y:o*66+34,node:s}),e}let c=s.children.map(e=>i(e,o+1)),l=(c[0]+c[c.length-1])/2;return t.set(a,{x:l,y:o*66+34,node:s}),l}for(let t of e.roots)i(t,0);let a=Math.max(420,n+48),o=Math.max(150,(r+1)*66+26);return(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-4`,children:[(0,P.jsx)(`div`,{className:`mb-2.5 flex items-center justify-between`,children:(0,P.jsxs)(`span`,{className:`font-mono text-xs font-medium text-[#b4bccb]`,children:[`Recursion Call Tree (`,Object.keys(e.nodes).length,` calls)`]})}),(0,P.jsx)(`div`,{className:`overflow-x-auto`,children:(0,P.jsxs)(`svg`,{width:a,height:o,className:`block`,children:[Array.from(t.values()).map(({x:e,y:n,node:r})=>r.children.map(i=>{let a=t.get(i);return a?(0,P.jsx)(`path`,{d:`M ${e+68} ${n+18} C ${e+68} ${(n+a.y)/2}, ${a.x+68} ${(n+a.y)/2}, ${a.x+68} ${a.y-18}`,fill:`none`,stroke:`#394056`,strokeWidth:1.5},`${r.callId}-${i}`):null})),Array.from(t.values()).map(({x:e,y:t,node:n})=>{let r=n.status===`active`,i=n.status===`returned`,a=`${n.funcName}(${n.argsSummary})`,o=n.argsSummary||`${n.funcName}()`,s=a.length<=20?a:o,c=s.length>20?s.slice(0,19)+`…`:s;return(0,P.jsxs)(`g`,{transform:`translate(${e+68}, ${t})`,children:[(0,P.jsx)(`rect`,{x:-66,y:-18,width:132,height:36,rx:8,fill:r?`rgba(124, 144, 246, 0.22)`:i?`rgba(16, 185, 129, 0.14)`:`rgba(251, 191, 36, 0.12)`,stroke:r?`#8ea3ff`:i?`#34d399`:`#fbbf24`,strokeWidth:r?1.8:1.2}),(0,P.jsx)(`text`,{x:0,y:n.returnDisplay?-2:4,textAnchor:`middle`,className:`fill-[#e4e8f4] font-mono text-[10px]`,children:c}),n.returnDisplay!==void 0&&(0,P.jsxs)(`text`,{x:0,y:11,textAnchor:`middle`,className:`fill-emerald-300 font-mono text-[10px] font-semibold`,children:[`→ `,n.returnDisplay.slice(0,14)]})]},n.callId)})]})})]})},hr=[{label:`0.5x`,ms:1300},{label:`1x`,ms:650},{label:`1.5x`,ms:420},{label:`2x`,ms:260},{label:`4x`,ms:120}],gr=({problem:e,trace:t,currentStepIndex:n,activeTestCase:r,isPlaying:i,speedMs:a,isRunning:o,isExpanded:s,onStepChange:c,onTogglePlay:l,onSpeedChange:u,onToggleExpand:d})=>{let[f,p]=(0,_.useState)(`visualization`),m=t?.steps??[],h=m.length>0,g=h?Math.min(Math.max(0,n),m.length-1):0,v=h?m[g]:null,y=h&&g>0?m[g-1]:null,b=(0,_.useMemo)(()=>v?Gn(v,y,m,g,e.visualHint):Kn(e,r),[v,y,m,g,e,r]),x=(0,_.useMemo)(()=>tr(e,v,y,b,r,t?.finalOutput??null,!h),[e,v,y,b,r,t?.finalOutput,h]),S=(0,_.useMemo)(()=>{if(b.arrays.length!==0){if(e.id===`two-sum`||e.id===`subarray-sum-equals-k`){let e=b.scalars.find(e=>e.name===`target`||e.name===`k`);if(e)return`${e.name} = ${e.display}`}for(let t of e.params)if(t.type===`number`||t.type===`string`){let n=e.params.indexOf(t),i=r?.args[n];if(i!==void 0)return`${t.name} = ${typeof i==`string`?JSON.stringify(i):String(i)}`}}},[b.arrays.length,b.scalars,e.id,e.params,r]),C=b.arrays.length>0||b.matrices.length>0||b.trees.length>0||b.graphs.length>0||!!b.linkedList||b.intervals.length>0||b.heaps.length>0||b.maps.length>0||b.sets.length>0||b.stacksQueues.length>0,w=h?g+1:0,T=m.length,E=e=>String(e).padStart(2,`0`),D=T>1?Math.round(g/(T-1)*100):h?100:0,O=o?`Running...`:t?.error?`Error`:h?i?`Playing`:`Synced`:`Preview`,k=o?`bg-amber-400 animate-pulse`:t?.error?`bg-rose-400`:h?`bg-[#8ea3ff]`:`bg-[#5d6478]`,ee=v?.stdout??t?.stdout??[];return(0,P.jsxs)(`section`,{className:`flex h-full flex-col bg-[#0d0f14] text-[#e6eaf3]`,children:[(0,P.jsxs)(`div`,{className:`flex h-10 shrink-0 items-center justify-between border-b border-[#1b1e29] bg-[#0e1016] px-5`,children:[(0,P.jsxs)(`div`,{className:`flex h-full items-center gap-5`,children:[(0,P.jsxs)(`button`,{type:`button`,onClick:()=>p(`visualization`),className:`relative flex h-full items-center text-xs font-medium transition cursor-pointer ${f===`visualization`?`text-[#edf1fa]`:`text-[#6c7488] hover:text-[#b2bacb]`}`,children:[`Visualization`,f===`visualization`&&(0,P.jsx)(`span`,{className:`absolute right-0 bottom-0 left-0 h-[1.5px] bg-[#8ea3ff]`})]}),(0,P.jsxs)(`button`,{type:`button`,onClick:()=>p(`debug`),className:`relative flex h-full items-center gap-1.5 text-xs font-medium transition cursor-pointer ${f===`debug`?`text-[#edf1fa]`:`text-[#6c7488] hover:text-[#b2bacb]`}`,children:[(0,P.jsx)(`span`,{children:`Execution trace`}),v&&v.callStack.length>0&&(0,P.jsx)(`span`,{className:`rounded bg-[#1a1e2a] px-1.5 py-0.5 font-mono text-[10px] text-[#7c8499]`,children:v.callStack.length}),f===`debug`&&(0,P.jsx)(`span`,{className:`absolute right-0 bottom-0 left-0 h-[1.5px] bg-[#8ea3ff]`})]})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,P.jsxs)(`span`,{className:`flex items-center gap-1.5 text-[11px] text-[#788096]`,children:[(0,P.jsx)(`span`,{className:`h-1.5 w-1.5 rounded-full ${k}`}),O]}),(0,P.jsx)(`button`,{type:`button`,onClick:d,className:`rounded-md p-1 text-[#6c7488] transition hover:bg-[#191c27] hover:text-[#d5dce9] cursor-pointer`,title:s?`Restore split layout`:`Expand visual canvas`,children:s?(0,P.jsx)(je,{className:`h-3.5 w-3.5`}):(0,P.jsx)(ke,{className:`h-3.5 w-3.5`})})]})]}),(0,P.jsx)(`div`,{className:`min-h-0 flex-1 overflow-y-auto px-6 py-5`,children:f===`visualization`?(0,P.jsxs)(`div`,{className:`mx-auto flex max-w-3xl flex-col gap-4`,children:[(0,P.jsxs)(`div`,{className:`flex items-start justify-between gap-4 pt-0.5`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`h2`,{className:`text-[22px] font-semibold leading-tight tracking-tight text-[#edf1fa]`,children:x.headline}),(0,P.jsx)(`p`,{className:`mt-1 text-xs text-[#737b8f]`,children:x.subtitle})]}),(0,P.jsx)(`div`,{className:`shrink-0 pt-1 font-mono text-xs text-[#6a7285]`,children:h?`${E(w)} / ${E(T)}`:`Preview`})]}),t?.error&&(0,P.jsxs)(`div`,{className:`flex items-start gap-2.5 rounded-xl border border-rose-500/35 bg-rose-950/25 px-4 py-3 text-xs text-rose-200`,children:[(0,P.jsx)(ve,{className:`mt-0.5 h-4 w-4 shrink-0 text-rose-400`}),(0,P.jsxs)(`div`,{className:`min-w-0 font-mono leading-relaxed`,children:[t.errorLine?`Line ${t.errorLine}: `:``,t.error]})]}),t?.truncated&&(0,P.jsxs)(`div`,{className:`rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-[11px] text-amber-200`,children:[`Trace capped at `,m.length,` steps to keep playback responsive.`]}),(0,P.jsx)(fr,{intervals:b.intervals}),(0,P.jsx)(nr,{arrays:b.arrays,rightMeta:S,formula:b.arrays.length>0?x.formula:void 0}),(0,P.jsx)(ir,{matrices:b.matrices}),b.trees.map((e,t)=>(0,P.jsx)(or,{model:e},`tree-${t}`)),b.graphs.map((e,t)=>(0,P.jsx)(sr,{model:e},`graph-${t}`)),b.linkedList&&(0,P.jsx)(cr,{model:b.linkedList}),(0,P.jsx)(dr,{heaps:b.heaps}),(0,P.jsx)(lr,{maps:b.maps,sets:b.sets,mapAnnotation:x.mapAnnotation}),(0,P.jsx)(ur,{items:b.stacksQueues}),e.id===`longest-substring-k-repeating`&&b.recursionTree&&Object.keys(b.recursionTree.nodes).length>1&&(0,P.jsx)(mr,{tree:b.recursionTree}),b.arrays.length===0&&x.formula&&(0,P.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#222532] bg-[#11131a] px-5 py-3`,children:[(0,P.jsx)(`span`,{className:`font-mono text-xs text-[#6d7487]`,children:x.formula.label}),(0,P.jsx)(`span`,{className:`font-mono text-sm font-medium text-[#e5e9f2]`,children:x.formula.expression}),x.formula.badge&&(0,P.jsx)(`span`,{className:`font-mono text-xs font-medium ${x.formula.badgeOk===!0?`text-[#8ea3ff]`:x.formula.badgeOk===!1?`text-amber-300`:`text-[#8c94a8]`}`,children:x.formula.badge})]}),!C&&b.scalars.length>0&&(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-4`,children:[(0,P.jsx)(`div`,{className:`mb-3 flex items-center justify-between`,children:(0,P.jsx)(`span`,{className:`text-[11px] font-medium uppercase tracking-wider text-[#666e82]`,children:`State Variables`})}),(0,P.jsx)(`div`,{className:`flex flex-wrap gap-2.5`,children:b.scalars.map(e=>(0,P.jsxs)(`div`,{className:`rounded-lg border px-3 py-2 font-mono text-xs transition ${e.changed?`border-[#8ea3ff] bg-[#191f36] text-[#edf1ff]`:`border-[#252938] bg-[#151822] text-[#c7cfdf]`}`,children:[(0,P.jsxs)(`span`,{className:`text-[#727a90]`,children:[e.name,` = `]}),(0,P.jsx)(`span`,{className:`font-semibold`,children:e.display})]},e.name))})]}),(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-4`,children:[(0,P.jsx)(`div`,{className:`text-[10px] font-semibold uppercase tracking-[0.12em] text-[#666e82]`,children:`WHY THIS WORKS`}),(0,P.jsx)(`div`,{className:`mt-1.5 text-[15px] font-medium text-[#edf1fa]`,children:x.whyTitle}),(0,P.jsx)(`p`,{className:`mt-1 text-xs leading-relaxed text-[#7c8498]`,children:x.whyBody}),x.resultPreview&&(0,P.jsxs)(`div`,{className:`mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-[#1d202c] pt-3`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-3 font-mono`,children:[(0,P.jsx)(`span`,{className:`text-xs text-[#6d7487]`,children:x.resultPreview.label}),(0,P.jsx)(`span`,{className:`text-sm font-semibold text-[#eef2fb]`,children:x.resultPreview.value})]}),x.resultPreview.note&&(0,P.jsx)(`span`,{className:`font-mono text-xs text-[#6b7285]`,children:x.resultPreview.note})]})]})]}):(0,P.jsx)(`div`,{className:`mx-auto flex max-w-3xl flex-col gap-4`,children:v?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(pr,{frames:v.callStack,heap:v.heap,changedVars:v.changedVars}),b.recursionTree&&Object.keys(b.recursionTree.nodes).length>1&&(0,P.jsx)(mr,{tree:b.recursionTree}),v.event===`return`&&v.returnValue!==void 0&&(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-4 py-3 font-mono text-xs`,children:[(0,P.jsx)(`span`,{className:`text-[#72798d]`,children:`Return value: `}),(0,P.jsx)(`span`,{className:`font-semibold text-emerald-300`,children:In(v.returnValue,v.heap)})]}),(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] p-3.5`,children:[(0,P.jsxs)(`div`,{className:`mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-[#6d7487]`,children:[(0,P.jsx)(qe,{className:`h-3.5 w-3.5`}),(0,P.jsxs)(`span`,{children:[`Stdout (`,ee.length,`)`]})]}),ee.length===0?(0,P.jsx)(`div`,{className:`font-mono text-[11px] italic text-[#5c6375]`,children:`No print output on this step.`}):(0,P.jsx)(`pre`,{className:`max-h-36 overflow-y-auto rounded-lg border border-[#1c1f2b] bg-[#0b0d12] p-2.5 font-mono text-[11px] leading-relaxed text-[#cfd6e5]`,children:ee.join(`
`)})]})]}):(0,P.jsxs)(`div`,{className:`rounded-xl border border-[#222532] bg-[#11131a] px-5 py-8 text-center`,children:[(0,P.jsx)(`p`,{className:`text-xs font-medium text-[#cfd6e5]`,children:`No execution trace captured yet.`}),(0,P.jsxs)(`p`,{className:`mt-1 text-[11px] text-[#6d7487]`,children:[`Click `,(0,P.jsx)(`span`,{className:`font-semibold text-[#b8c6ff]`,children:`Visualize`}),` in the top bar to step through frames, local variables, heap objects, and recursion trees.`]})]})})}),(0,P.jsxs)(`div`,{className:`shrink-0 border-t border-[#1b1e29] bg-[#0e1016] px-6 py-3 select-none`,children:[(0,P.jsxs)(`div`,{className:`mb-1.5 flex items-center justify-between text-[11px] text-[#747c90]`,children:[(0,P.jsx)(`span`,{className:`font-mono`,children:h?`Step ${w} of ${T}`:`Step 0 of 0`}),(0,P.jsx)(`label`,{className:`flex items-center gap-1 text-[#747c90]`,children:(0,P.jsx)(`select`,{value:a,onChange:e=>u(Number(e.target.value)),className:`rounded bg-transparent px-1 py-0.5 font-mono text-[11px] text-[#8d95aa] outline-none hover:text-[#d8deec] cursor-pointer`,"aria-label":`Playback speed`,children:hr.map(e=>(0,P.jsx)(`option`,{value:e.ms,className:`bg-[#12141c] text-[#e5e9f2]`,children:e.label},e.ms))})})]}),(0,P.jsx)(`input`,{type:`range`,min:0,max:Math.max(0,T-1),value:g,disabled:!h,onChange:e=>c(Number(e.target.value)),style:{"--pct":`${D}%`},className:`trace-slider mb-3 w-full disabled:opacity-40`,"aria-label":`Execution step scrubber`}),(0,P.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,P.jsx)(`button`,{type:`button`,disabled:!h||g<=0,onClick:()=>c(g-1),className:`flex h-7 w-7 items-center justify-center rounded-md border border-[#242836] bg-[#141720] text-[#9aa2b6] transition hover:border-[#343a4f] hover:text-[#edf1fa] disabled:opacity-35 cursor-pointer`,title:`Previous step (Left Arrow)`,children:(0,P.jsx)(ue,{className:`h-3.5 w-3.5`})}),(0,P.jsxs)(`button`,{type:`button`,disabled:!h,onClick:l,className:`flex h-7 items-center gap-1.5 rounded-md border border-[#282d3e] bg-[#161923] px-3 text-xs font-medium text-[#dce2f0] transition hover:border-[#394158] hover:bg-[#1b1f2c] disabled:opacity-40 cursor-pointer`,title:`Play / Pause (Space)`,children:[i?(0,P.jsx)(Ne,{className:`h-3 w-3`}):(0,P.jsx)(Fe,{className:`h-3 w-3 fill-current`}),(0,P.jsx)(`span`,{children:i?`Pause`:`Play`})]}),(0,P.jsx)(`button`,{type:`button`,disabled:!h||g>=T-1,onClick:()=>c(g+1),className:`flex h-7 w-7 items-center justify-center rounded-md border border-[#242836] bg-[#141720] text-[#9aa2b6] transition hover:border-[#343a4f] hover:text-[#edf1fa] disabled:opacity-35 cursor-pointer`,title:`Next step (Right Arrow)`,children:(0,P.jsx)(fe,{className:`h-3.5 w-3.5`})})]}),(0,P.jsx)(`span`,{className:`font-mono text-[11px] text-[#5c6376]`,children:`← → to step`})]})]})]})},_r={Easy:`text-emerald-300/90 bg-emerald-500/10 border-emerald-500/25`,Medium:`text-amber-300/90 bg-amber-500/10 border-amber-500/25`,Hard:`text-rose-300/90 bg-rose-500/10 border-rose-500/25`,Playground:`text-[#9db2ff] bg-[#8ea3ff]/10 border-[#8ea3ff]/25`},vr=({open:e,problems:t,activeProblemId:n,solvedIds:r,onSelect:i,onClose:a})=>{let[o,s]=(0,_.useState)(``),[c,l]=(0,_.useState)(`All`),[u,d]=(0,_.useState)(`All`),f=(0,_.useMemo)(()=>{let e=new Set;for(let n of t)e.add(n.category);return Array.from(e)},[t]),p=(0,_.useMemo)(()=>{let e=o.trim().toLowerCase();return t.filter(t=>c!==`All`&&t.difficulty!==c||u!==`All`&&t.category!==u?!1:!e||t.title.toLowerCase().includes(e)||t.category.toLowerCase().includes(e)||t.scenario&&t.scenario.toLowerCase().includes(e)||String(t.number).includes(e)||t.tags.some(t=>t.toLowerCase().includes(e)))},[t,o,c,u]);return e?(0,P.jsx)(`div`,{className:`fixed inset-0 z-50 flex bg-black/65 backdrop-blur-[2px]`,onClick:a,children:(0,P.jsxs)(`div`,{className:`flex h-full w-full max-w-lg flex-col border-r border-[#1f222e] bg-[#0d0e14] shadow-2xl`,onClick:e=>e.stopPropagation(),children:[(0,P.jsxs)(`div`,{className:`flex items-center justify-between border-b border-[#1c1f2b] px-5 py-4`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`h2`,{className:`text-sm font-semibold text-[#eef1f8]`,children:`Problems & Playgrounds`}),(0,P.jsxs)(`p`,{className:`text-[11px] text-[#777f93]`,children:[t.length,` visualizable DSA items · `,r.length,` solved`]})]}),(0,P.jsx)(`button`,{type:`button`,onClick:a,className:`rounded-lg p-1.5 text-[#777f93] transition hover:bg-[#171924] hover:text-white cursor-pointer`,children:(0,P.jsx)(Ye,{className:`h-4 w-4`})})]}),(0,P.jsxs)(`div`,{className:`space-y-3 border-b border-[#1c1f2b] p-4`,children:[(0,P.jsxs)(`div`,{className:`relative`,children:[(0,P.jsx)(Ve,{className:`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#646b7e]`}),(0,P.jsx)(`input`,{type:`text`,value:o,onChange:e=>s(e.target.value),placeholder:`Search problem, scenario (e.g. Warehouse, CloudWatch), tag...`,className:`w-full rounded-lg border border-[#242836] bg-[#12141c] py-2 pl-9 pr-3 text-xs text-[#e5e9f2] placeholder-[#5e6578] focus:border-[#8ea3ff] focus:outline-none`})]}),(0,P.jsx)(`div`,{className:`flex flex-wrap gap-1.5`,children:[`All`,`Easy`,`Medium`,`Hard`,`Playground`].map(e=>(0,P.jsx)(`button`,{type:`button`,onClick:()=>l(e),className:`rounded-md px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${c===e?`bg-[#20253a] text-[#dce3ff]`:`bg-[#14161f] text-[#7c8498] hover:text-[#cfd6e6]`}`,children:e},e))}),(0,P.jsxs)(`div`,{className:`flex flex-wrap gap-1`,children:[(0,P.jsx)(`button`,{type:`button`,onClick:()=>d(`All`),className:`rounded-md px-2 py-0.5 text-[10px] transition cursor-pointer ${u===`All`?`bg-[#20253a] text-[#dce3ff]`:`text-[#737b8e] hover:bg-[#14161f] hover:text-[#cfd6e6]`}`,children:`All Topics`}),f.map(e=>(0,P.jsx)(`button`,{type:`button`,onClick:()=>d(e),className:`rounded-md px-2 py-0.5 text-[10px] transition cursor-pointer ${u===e?`bg-[#20253a] text-[#dce3ff]`:`text-[#737b8e] hover:bg-[#14161f] hover:text-[#cfd6e6]`}`,children:e},e))]})]}),(0,P.jsx)(`div`,{className:`flex-1 space-y-1.5 overflow-y-auto p-3`,children:p.length===0?(0,P.jsxs)(`div`,{className:`py-12 text-center text-xs text-[#697084]`,children:[`No problems match "`,o,`".`]}):p.map(e=>{let t=e.id===n,o=r.includes(e.id);return(0,P.jsxs)(`button`,{type:`button`,onClick:()=>{i(e.id),a()},className:`flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${t?`border-[#6d80e0]/60 bg-[#171c2e]`:`border-[#1d202b] bg-[#11131a] hover:border-[#2c3142] hover:bg-[#151822]`}`,children:[(0,P.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-2`,children:[e.isPlayground?(0,P.jsx)(Ge,{className:`h-3.5 w-3.5 shrink-0 text-[#9db2ff]`}):o?(0,P.jsx)(ge,{className:`h-3.5 w-3.5 shrink-0 text-emerald-400`}):(0,P.jsx)(`span`,{className:`ml-0.5 mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#383e52]`}),(0,P.jsx)(`span`,{className:`font-mono text-xs text-[#737b8e]`,children:e.isPlayground?`PLAY`:`#${e.number}`}),(0,P.jsx)(`span`,{className:`truncate text-xs font-medium text-[#e6eaf5]`,children:e.title})]}),(0,P.jsxs)(`div`,{className:`mt-1.5 flex flex-wrap items-center gap-1.5 pl-5`,children:[(0,P.jsx)(`span`,{className:`text-[10px] text-[#7c8499]`,children:e.category}),e.scenario&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`span`,{className:`text-[#454c5e]`,children:`·`}),(0,P.jsx)(`span`,{className:`text-[10px] text-[#9db2ff]/85`,children:e.scenario})]}),e.tags.slice(0,2).map(e=>(0,P.jsx)(`span`,{className:`rounded bg-[#171a24] px-1.5 py-0.5 text-[10px] text-[#838b9e]`,children:e},e))]})]}),(0,P.jsx)(`span`,{className:`shrink-0 rounded border px-2 py-0.5 text-[10px] font-medium ${_r[e.difficulty]}`,children:e.difficulty})]},e.id)})})]})}):null},yr=`modulepreload`,br=function(e){return`/dsa-visualizer-ide/`+e},xr={},Sr=function(e){return e.pathname.endsWith(`.css`)},Cr=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},wr=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=br(t,n);let r=s(t),i=Sr(r);return Cr(xr,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:yr,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Tr=null;async function Er(){return typeof window>`u`||!window.location.hostname.endsWith(`github.io`)&&(Tr||=(async()=>{let e=new AbortController,t=setTimeout(()=>e.abort(),900);try{let t=await fetch(`/api/health`,{signal:e.signal}),n=t.headers.get(`content-type`)||``;return!t.ok||!n.includes(`application/json`)?!1:(await t.json()).ok===!0}catch{return!1}finally{clearTimeout(t)}})(),Tr)}async function Dr(e,t,n){if(await Er())try{let n=await fetch(`/api/python/execute`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({...t,mode:e})}),r=n.headers.get(`content-type`)||``;if(n.ok&&r.includes(`application/json`))return await n.json()}catch{}return n(t)}async function Or(e){return Dr(`trace`,e,async e=>{let{runBrowserPythonTrace:t}=await wr(async()=>{let{runBrowserPythonTrace:e}=await import(`./browserPythonRunner-DY4haFyu.js`);return{runBrowserPythonTrace:e}},[]);return t(e)})}async function kr(e){return Dr(`tests`,e,async e=>{let{runBrowserPythonTests:t}=await wr(async()=>{let{runBrowserPythonTests:e}=await import(`./browserPythonRunner-DY4haFyu.js`);return{runBrowserPythonTests:e}},[]);return t(e)})}var Ar=null,jr=0;function Mr(){return Ar||=new Worker(new URL(`/dsa-visualizer-ide/assets/jsWorker-OZSV1zUN.js`,``+import.meta.url),{type:`module`}),Ar}function Nr(){Ar&&=(Ar.terminate(),null)}function Pr(e,t=4e3){return new Promise(n=>{let r=Mr(),i=++jr,a=!1,o=setTimeout(()=>{a||(a=!0,Nr(),n({steps:[],finalOutput:null,stdout:[],error:`JavaScript execution timed out after ${t}ms (worker terminated safely).`,runtimeMs:t}))},t),s=e=>{e.data?.requestId!==i||a||(a=!0,clearTimeout(o),r.removeEventListener(`message`,s),e.data.ok?n(e.data.result):n({steps:[],finalOutput:null,stdout:[],error:e.data.error||`Worker execution error`,runtimeMs:0}))};r.addEventListener(`message`,s),r.postMessage({requestId:i,kind:`trace`,payload:e})})}function Fr(e,t=4e3){return new Promise(n=>{let r=Mr(),i=++jr,a=!1,o=setTimeout(()=>{a||(a=!0,Nr(),n({allPassed:!1,passedCount:0,totalCount:e.testCases.length,results:[],totalRuntimeMs:t,error:`JavaScript tests timed out after ${t}ms (worker terminated safely).`}))},t),s=t=>{t.data?.requestId!==i||a||(a=!0,clearTimeout(o),r.removeEventListener(`message`,s),t.data.ok?n(t.data.result):n({allPassed:!1,passedCount:0,totalCount:e.testCases.length,results:[],totalRuntimeMs:0,error:t.data.error||`Worker test execution error`}))};r.addEventListener(`message`,s),r.postMessage({requestId:i,kind:`tests`,payload:e})})}async function Ir(e,t,n,r){if(await Er())try{let r=await fetch(`/api/lang/execute`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({...n,language:e,mode:t})}),i=r.headers.get(`content-type`)||``;if(r.ok&&i.includes(`application/json`))return await r.json()}catch{}return r(e,n)}async function Lr(e,t){return Ir(e,`trace`,t,async(e,t)=>{let{runBrowserCompiledTrace:n}=await wr(async()=>{let{runBrowserCompiledTrace:e}=await import(`./browserLangRunner-BtSzMAS3.js`);return{runBrowserCompiledTrace:e}},[]);return n(e,t)})}async function Rr(e,t){return Ir(e,`tests`,t,async(e,t)=>{let{runBrowserCompiledTests:n}=await wr(async()=>{let{runBrowserCompiledTests:e}=await import(`./browserLangRunner-BtSzMAS3.js`);return{runBrowserCompiledTests:e}},[]);return n(e,t)})}async function zr(e,t){return e===`javascript`?Pr({code:t.code,entryFunction:t.entryFunction,params:t.params,returnType:t.returnType,isPlayground:t.isPlayground,testCase:t.testCase}):e===`python`?Or({code:t.code,entryFunction:t.entryFunction,params:t.params,returnType:t.returnType,compareMode:t.compareMode,isPlayground:t.isPlayground,testCases:[t.testCase]}):Lr(e,{code:t.code,entryFunction:t.entryFunction,params:t.params,returnType:t.returnType,compareMode:t.compareMode,isPlayground:t.isPlayground,testCases:[t.testCase]})}async function Br(e,t){return e===`javascript`?Fr(t):e===`python`?kr(t):Rr(e,t)}var Vr=`trace.v2`;function Hr(e,t){try{let n=localStorage.getItem(`${Vr}.${e}`);return n?JSON.parse(n):t}catch{return t}}function Ur(e,t){try{localStorage.setItem(`${Vr}.${e}`,JSON.stringify(t))}catch{}}function Wr(){let[e,t]=(0,_.useState)(()=>{let e=Hr(`problem`,C[0].id);return C.some(t=>t.id===e)?e:C[0].id}),n=(0,_.useMemo)(()=>C.find(t=>t.id===e)??C[0],[e]),[r,i]=(0,_.useState)(()=>{let e=Hr(`lang`,`python`);return En.some(t=>t.id===e)?e:`python`}),[a,o]=(0,_.useState)(()=>Hr(`code`,{})),[s,c]=(0,_.useState)(()=>Hr(`solved`,[])),[l,u]=(0,_.useState)(()=>Hr(`submissions`,{})),d=`${n.id}:${r}`,f=a[d]??n.starterCode[r],p=(0,_.useMemo)(()=>n.testCases.filter(e=>!e.isHidden),[n]),[m,h]=(0,_.useState)(()=>p[0]?.id??`custom`),[g,v]=(0,_.useState)(()=>JSON.parse(JSON.stringify(p[0]?.args??[])));(0,_.useEffect)(()=>{let e=n.testCases.find(e=>!e.isHidden)??n.testCases[0];h(e?.id??`custom`),v(JSON.parse(JSON.stringify(e?.args??[]))),x(null),ne(null),w(0),E(!1),oe(`testcase`)},[n]);let y=(0,_.useMemo)(()=>n.isPlayground?n.testCases[0]:m===`custom`?{id:`custom`,label:`Custom`,args:g,expected:null}:p.find(e=>e.id===m)??p[0],[n,p,m,g]),[b,x]=(0,_.useState)(null),[S,w]=(0,_.useState)(0),[T,E]=(0,_.useState)(!1),[D,O]=(0,_.useState)(650),[k,ee]=(0,_.useState)(!1),[te,ne]=(0,_.useState)(null),[re,ie]=(0,_.useState)(!1),[ae,oe]=(0,_.useState)(`testcase`),[A,se]=(0,_.useState)(!1),[ce,le]=(0,_.useState)(!1),[ue,de]=(0,_.useState)(48),[fe,pe]=(0,_.useState)(67),me=(0,_.useRef)(null),he=(0,_.useRef)(null),ge=(0,_.useRef)(null);(0,_.useEffect)(()=>{Ur(`problem`,e)},[e]),(0,_.useEffect)(()=>{Ur(`lang`,r)},[r]),(0,_.useEffect)(()=>{Ur(`code`,a)},[a]),(0,_.useEffect)(()=>{Ur(`solved`,s)},[s]),(0,_.useEffect)(()=>{Ur(`submissions`,l)},[l]),(0,_.useEffect)(()=>{if(!T||!b||b.steps.length<=1)return;let e=window.setInterval(()=>{w(e=>e>=b.steps.length-1?(E(!1),e):e+1)},D);return()=>window.clearInterval(e)},[T,D,b]),(0,_.useEffect)(()=>{let e=e=>{if(ge.current){if(ge.current===`vertical`&&me.current){let t=me.current.getBoundingClientRect(),n=(e.clientX-t.left)/Math.max(1,t.width)*100;de(Math.min(68,Math.max(28,n)))}else if(ge.current===`horizontal`&&he.current){let t=he.current.getBoundingClientRect(),n=(e.clientY-t.top)/Math.max(1,t.height)*100;pe(Math.min(82,Math.max(36,n)))}}},t=()=>{ge.current=null,document.body.style.cursor=``,document.body.style.userSelect=``};return window.addEventListener(`mousemove`,e),window.addEventListener(`mouseup`,t),()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`mouseup`,t)}},[]);let _e=e=>{ge.current=e,document.body.style.cursor=e===`vertical`?`col-resize`:`row-resize`,document.body.style.userSelect=`none`},ve=(0,_.useCallback)(e=>{o(t=>({...t,[d]:e}))},[d]),ye=(0,_.useCallback)(e=>{i(e),x(null),ne(null),w(0),E(!1)},[]),j=(0,_.useCallback)(()=>{o(e=>{let t={...e};return delete t[d],t}),x(null),ne(null),w(0),E(!1)},[d]),M=(0,_.useCallback)(()=>{o(e=>({...e,[d]:n.optimalCode[r]})),x(null),w(0),E(!1)},[d,n,r]),be=(0,_.useCallback)(e=>{if(h(e),e!==`custom`){let t=p.find(t=>t.id===e);t&&v(JSON.parse(JSON.stringify(t.args)))}},[p]),xe=(0,_.useCallback)(async e=>{let t=e??y??{id:`default`,label:`Case 1`,args:[],expected:null};ee(!0),E(!1);try{let e=await zr(r,{code:f,entryFunction:n.entryFunction,params:n.params,returnType:n.returnType,compareMode:n.compareMode,isPlayground:n.isPlayground,testCase:t});x(e),w(0),E(e.steps.length>1)}finally{ee(!1)}},[y,r,f,n]),Se=(0,_.useCallback)(async e=>{ie(!0),oe(`output`);try{let t;t=n.isPlayground||e?n.testCases:m===`custom`?[{id:`custom`,label:`Custom Case`,args:g,expected:p[0]?.expected??null}]:p;let i=await Br(r,{code:f,entryFunction:n.entryFunction,params:n.params,returnType:n.returnType,compareMode:n.compareMode,isPlayground:n.isPlayground,testCases:t});if(ne(i),e){let e=En.find(e=>e.id===r)?.label??r,t={id:`sub_${Date.now()}`,timestamp:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`}),language:e,passed:i.allPassed,passedCount:i.passedCount,totalCount:i.totalCount,runtimeMs:i.totalRuntimeMs};u(e=>({...e,[n.id]:[t,...e[n.id]??[]].slice(0,15)})),i.allPassed&&!n.isPlayground&&c(e=>e.includes(n.id)?e:[...e,n.id])}}finally{ie(!1)}},[n,m,g,p,r,f]);(0,_.useEffect)(()=>{let e=e=>{if((e.metaKey||e.ctrlKey)&&e.key===`Enter`){e.preventDefault(),xe();return}let t=e.target;t&&(t.tagName===`INPUT`||t.tagName===`TEXTAREA`||t.tagName===`SELECT`||t.closest(`.monaco-editor`))||!b||b.steps.length===0||(e.key===` `?(e.preventDefault(),E(e=>(!e&&S>=b.steps.length-1&&w(0),!e))):e.key===`ArrowRight`?(e.preventDefault(),E(!1),w(e=>Math.min(b.steps.length-1,e+1))):e.key===`ArrowLeft`&&(e.preventDefault(),E(!1),w(e=>Math.max(0,e-1))))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[xe,b,S]);let Ce=C.findIndex(e=>e.id===n.id),we=()=>{let e=(Ce-1+C.length)%C.length;t(C[e].id)},N=()=>{let e=(Ce+1)%C.length;t(C[e].id)},Te=b&&b.steps.length>0?b.steps[Math.min(S,b.steps.length-1)]:null,Ee=Te?Te.line:null,De=Te?.stdout??b?.stdout??[],Oe=(0,_.useMemo)(()=>new Set(s),[s]),ke=En.find(e=>e.id===r)?.label??r,Ae=k?`Tracing`:b?.error?`Error`:b&&b.steps.length>0?T?`Playing`:`Paused`:`Ready`,je=k?`bg-amber-400 animate-pulse`:b?.error?`bg-rose-400`:b&&b.steps.length>0?T?`bg-emerald-400 animate-pulse`:`bg-[#8ea3ff]`:`bg-[#5d6478]`;return(0,P.jsxs)(`div`,{className:`flex h-screen w-screen flex-col overflow-hidden bg-[#0e0f14] text-[#e6eaf3]`,children:[(0,P.jsx)(Ze,{problem:n,isSolved:Oe.has(n.id),isRunningTrace:k,isRunningTests:re,totalProblems:C.length,onOpenProblemDrawer:()=>se(!0),onPrevProblem:we,onNextProblem:N,onVisualize:()=>void xe(),onRunTests:()=>void Se(!1)}),(0,P.jsxs)(`main`,{ref:me,className:`flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row`,children:[!ce&&(0,P.jsxs)(`div`,{ref:he,style:{"--left-pane-pct":`${ue}%`},className:`flex min-h-0 w-full flex-col md:h-full md:w-[var(--left-pane-pct)] max-md:h-1/2`,children:[(0,P.jsx)(`div`,{style:{height:`${fe}%`},className:`min-h-0 overflow-hidden`,children:(0,P.jsx)(kn,{problem:n,submissions:l[n.id]??[],code:f,language:r,activeLine:Ee,errorLine:b?.errorLine??null,isPlaying:T,onChange:ve,onChangeLanguage:ye,onReset:j,onLoadOptimal:M})}),(0,P.jsx)(`div`,{onMouseDown:()=>_e(`horizontal`),className:`hidden h-1 shrink-0 cursor-row-resize bg-[#181a24] transition-colors hover:bg-[#8ea3ff]/50 md:block`,title:`Drag to resize editor and test drawer`}),(0,P.jsx)(`div`,{style:{height:`${100-fe}%`},className:`min-h-0 overflow-hidden`,children:(0,P.jsx)(Mn,{problem:n,sampleTestCases:p,activeTestCaseId:m,customArgs:g,testResults:te,liveStdout:De,activeTab:ae,isRunningTests:re,onTabChange:oe,onSelectTestCase:be,onUpdateCustomArgs:v,onVisualizeCase:e=>void xe(e),onRunTests:()=>void Se(!1),onSubmitAll:()=>void Se(!0)})})]}),!ce&&(0,P.jsx)(`div`,{onMouseDown:()=>_e(`vertical`),className:`hidden w-1 shrink-0 cursor-col-resize bg-[#181a24] transition-colors hover:bg-[#8ea3ff]/50 md:block`,title:`Drag to resize editor and visual canvas`}),(0,P.jsx)(`div`,{style:{"--right-pane-pct":ce?`100%`:`${100-ue}%`},className:`min-h-0 w-full flex-1 overflow-hidden md:h-full md:w-[var(--right-pane-pct)]`,children:(0,P.jsx)(gr,{problem:n,trace:b,currentStepIndex:S,activeTestCase:y,isPlaying:T,speedMs:D,isRunning:k,isExpanded:ce,onStepChange:e=>{E(!1),w(e)},onTogglePlay:()=>{b&&b.steps.length!==0&&(!T&&S>=b.steps.length-1&&w(0),E(e=>!e))},onSpeedChange:O,onToggleExpand:()=>le(e=>!e)})})]}),(0,P.jsxs)(`footer`,{className:`flex h-7 shrink-0 items-center justify-between border-t border-[#1b1e29] bg-[#0b0c10] px-4 font-mono text-[11px] text-[#687084] select-none`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,P.jsxs)(`span`,{className:`flex items-center gap-1.5 text-[#b8c2d8]`,children:[(0,P.jsx)(`span`,{className:`h-1.5 w-1.5 rounded-full ${je}`}),Ae]}),(0,P.jsx)(`span`,{className:`text-[#4a5163]`,children:`·`}),(0,P.jsx)(`span`,{children:`All changes saved`})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,P.jsxs)(`span`,{className:`hidden sm:inline`,children:[`Time `,(0,P.jsx)(`span`,{className:`text-[#99a2b8]`,children:n.timeComplexity})]}),(0,P.jsxs)(`span`,{className:`hidden sm:inline`,children:[`Space `,(0,P.jsx)(`span`,{className:`text-[#99a2b8]`,children:n.spaceComplexity})]}),(0,P.jsx)(`span`,{className:`hidden text-[#3a4052] sm:inline`,children:`|`}),(0,P.jsxs)(`span`,{children:[`UTF-8 · `,ke]})]})]}),(0,P.jsx)(vr,{open:A,problems:C,activeProblemId:n.id,solvedIds:s,onSelect:e=>{t(e),se(!1)},onClose:()=>se(!1)})]})}(0,v.createRoot)(document.getElementById(`root`)).render((0,P.jsx)(_.StrictMode,{children:(0,P.jsx)(Wr,{})}));export{o as n,c as r,wr as t};