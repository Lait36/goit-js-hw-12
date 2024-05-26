import{a as y,i as p,S as L}from"./assets/vendor-f144e563.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();let h=0;const m=async(a,r)=>{const o=`https://pixabay.com/api/?${new URLSearchParams({key:"43292440-b0b2b94cbd69ec3f0dfdb5c21",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:20,page:r})}`;document.querySelector(".loader");try{const t=(await y.get(o)).data,i=t.hits,u=t.total;return h=Math.ceil(u/20),i.length===0&&p.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),i}catch(e){return p.error({title:"Error",message:e.message,position:"topCenter"}),null}},f=a=>a.map(({webformatURL:r,largeImageURL:s,tags:o,likes:e,views:t,comments:i,downloads:u})=>`
      <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${o}"
        />
      </a>
      <ul class="list-jopa">
        <li class="jopa">
          <h3>Likes</h3>
          <p>${e}</p>
        </li>
        <li class="jopa">
          <h3>Views</h3>
          <p>${t}</p>
        </li>
        <li class="jopa">
          <h3>Comments</h3>
          <p>${i}</p>
        </li>
        <li class="jopa">
          <h3>Downloads</h3>
          <p>${u}</p>
        </li>
      </ul>
    `).join(""),g=new L(".gallery a",{captionsData:"alt",captionDelay:250,disableRightClick:!0}),b=document.querySelector(".form"),l=document.querySelector(".js-load-more"),d=document.querySelector(".loader");let c=null,n=1;b.addEventListener("submit",async a=>{if(a.preventDefault(),n=1,c=document.querySelector("input").value.trim(),c===""){p.warning({title:"",message:"Please enter a search query",position:"topCenter"});return}d.classList.remove("is-hidden");try{const s=await m(c,n);if(n>=h?l.classList.add("is-hidden"):l.classList.remove("is-hidden"),s){const o=document.querySelector(".gallery");o.innerHTML=f(s),g.refresh()}}catch(s){console.error("Error searching images:",s)}finally{d.classList.add("is-hidden")}});l.addEventListener("click",async a=>{a.preventDefault(),n+=1,d.classList.remove("is-hidden");try{const r=await m(c,n);if(n>=h&&l.classList.add("is-hidden"),r){const s=document.querySelector(".gallery"),o=s.querySelector(".gallery-item"),e=o?o.getBoundingClientRect().height:0;s.insertAdjacentHTML("beforeend",f(r)),g.refresh(),window.scrollBy({top:e*2,behavior:"smooth"})}}catch(r){console.error("Error searching images:",r)}finally{d.classList.add("is-hidden")}});
//# sourceMappingURL=commonHelpers.js.map
