import{a as y,i as p,S as L}from"./assets/vendor-f144e563.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();let d=0;const h=async(o,t)=>{const a=`https://pixabay.com/api/?${new URLSearchParams({key:"43292440-b0b2b94cbd69ec3f0dfdb5c21",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:20,page:t})}`,e=document.querySelector(".loader");e.classList.remove("is-hidden");try{const i=(await y.get(a)).data,c=i.hits,g=i.total;return d=Math.ceil(g/20),c.length===0&&p.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),e.classList.add("is-hidden"),c}catch(r){return console.error("Error fetching images:",r),null}},m=o=>o.map(({webformatURL:t,largeImageURL:s,tags:a,likes:e,views:r,comments:i,downloads:c})=>`
      <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img
          class="gallery-image"
          src="${t}"
          alt="${a}"
        />
      </a>
      <ul class="list-jopa">
        <li class="jopa">
          <h3>Likes</h3>
          <p>${e}</p>
        </li>
        <li class="jopa">
          <h3>Views</h3>
          <p>${r}</p>
        </li>
        <li class="jopa">
          <h3>Comments</h3>
          <p>${i}</p>
        </li>
        <li class="jopa">
          <h3>Downloads</h3>
          <p>${c}</p>
        </li>
      </ul>
    `).join(""),f=new L(".gallery a",{captionsData:"alt",captionDelay:250,disableRightClick:!0}),b=document.querySelector(".form"),u=document.querySelector(".js-load-more");let l=null,n=1;b.addEventListener("submit",async o=>{if(o.preventDefault(),n=1,l=document.querySelector("input").value.trim(),l===""){p.warning({title:"",message:"Please enter a search query",position:"topCenter"});return}try{const s=await h(l,n);if(n>d&&u.classList.add("is-hidden"),s){const a=document.querySelector(".gallery");a.innerHTML=m(s),f.refresh()}}catch(s){console.error("Error searching images:",s)}});u.addEventListener("click",async o=>{o.preventDefault(),n+=1;try{const t=await h(l,n);if(n>d&&u.classList.add("is-hidden"),t){const s=document.querySelector(".gallery");s.innerHTML=m(t),f.refresh()}}catch(t){console.error("Error searching images:",t)}});
//# sourceMappingURL=commonHelpers.js.map
