import{b as a,c as s}from"./vendors/slide-9d78CCTs.js";import"./vendors/vendor-bIBkycDJ.js";a();s();const r=document.createElement("style");r.textContent=`
@keyframes arrowShake {
  0% { transform: translateX(0); }
  12.5% { transform: translateX(-5px); }
  25% { transform: translateX(4px); }
  37.5% { transform: translateX(-4px); }
  50% { transform: translateX(3px); }
  62.5% { transform: translateX(-3px); }
  75% { transform: translateX(2px); }
  87.5% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}
`;document.head.appendChild(r);function n(){document.querySelectorAll(".card-product__button-prev").forEach(t=>{const e=t.querySelector(".icon-arrow-left");e&&(e.style.display="inline-block",e.style.transition="transform 0.3s ease",t.addEventListener("mouseenter",()=>{e.style.animation="arrowShake 0.6s ease-in-out"}),t.addEventListener("mouseleave",()=>{setTimeout(()=>{e.style.animation="none"},600)}))})}document.addEventListener("DOMContentLoaded",n);const i=new MutationObserver(()=>{n()});i.observe(document.body,{childList:!0,subtree:!0});const c=document.querySelector(".card-product__button-prev");c.addEventListener("click",function(){const t=window.location.href.includes(".html")?"/build/categories/electric-tools.html":"/categories/electric-tools";window.location.href=t});
