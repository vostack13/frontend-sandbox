!function(n){var r={};function o(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=n,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){function n(){1024<window.innerWidth&&(d=3),768<=window.innerWidth&&window.innerWidth<=1024&&(d=2),window.innerWidth<768&&(d=1),l=i.offsetWidth/d,i.style.cssText="--width-item: ".concat(l,"px"),o.style.cssText="--height-container: ".concat(4*l/3,"px")}function r(e){0<a+e||a+e<d-s||(a+=e,i.firstElementChild.style.cssText="--translate: translateX(".concat(l*a,"px)"))}var o=document.getElementById("general-slider"),i=document.getElementById("general-slider__container"),u=(document.getElementById("general-slider__item"),document.querySelector(".btn__prev")),c=document.querySelector(".btn__next"),l=0,d=0,a=0,s=i.firstElementChild.childElementCount;window.addEventListener("DOMContentLoaded",n),window.addEventListener("resize",n),u.addEventListener("click",function(){return r(-1)}),c.addEventListener("click",function(){return r(1)});var f,h;i.firstElementChild.addEventListener("touchstart",function(e){return(t=e).preventDefault(),f=t.touches[0].clientX,void t.touches[0].clientX;var t}),i.firstElementChild.addEventListener("touchmove",function(e){return(t=e).touches[0].clientX,void(h=t.touches[0].clientX);var t}),i.firstElementChild.addEventListener("touchend",function(e){0<f-h?(touchValue=Math.round((f-h)/l*-1),console.log("posFinal",touchValue-1),r(touchValue-1)):(touchValue=Math.round((h-f)/l),r(touchValue+1))})}]);