import{b as a,c as o}from"./vendors/slide-oSiZXUx5.js";import"./vendors/vendor-BrPt5w0u.js";a();o();const r=document.createElement("style");r.textContent=`
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
`;document.head.appendChild(r);function n(){document.querySelectorAll(".card-product__button-prev").forEach(e=>{const t=e.querySelector(".icon-arrow-left");t&&(t.style.display="inline-block",t.style.transition="transform 0.3s ease",e.addEventListener("mouseenter",()=>{t.style.animation="arrowShake 0.6s ease-in-out"}),e.addEventListener("mouseleave",()=>{setTimeout(()=>{t.style.animation="none"},600)}))})}document.addEventListener("DOMContentLoaded",n);const s=new MutationObserver(()=>{n()});s.observe(document.body,{childList:!0,subtree:!0});const i=document.querySelector(".card-product__button-prev");i.addEventListener("click",function(){window.history.back()});
