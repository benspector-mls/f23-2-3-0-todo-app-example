(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();let c;const y=new Uint8Array(16);function g(){if(!c&&(c=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!c))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return c(y)}const d=[];for(let e=0;e<256;++e)d.push((e+256).toString(16).slice(1));function h(e,t=0){return d[e[t+0]]+d[e[t+1]]+d[e[t+2]]+d[e[t+3]]+"-"+d[e[t+4]]+d[e[t+5]]+"-"+d[e[t+6]]+d[e[t+7]]+"-"+d[e[t+8]]+d[e[t+9]]+"-"+d[e[t+10]]+d[e[t+11]]+d[e[t+12]]+d[e[t+13]]+d[e[t+14]]+d[e[t+15]]}const f=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),m={randomUUID:f};function b(e,t,n){if(m.randomUUID&&!t&&!e)return m.randomUUID();e=e||{};const r=e.random||(e.rng||g)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,t){n=n||0;for(let o=0;o<16;++o)t[n+o]=r[o];return t}return h(r)}const T=[{uuid:"5affd4e4-418d-4b62-beeb-1c0f7aaff753",title:"Take out the trash",isComplete:!1},{uuid:"32521ef4-d64c-4906-b06d-f3d0d6b16e0f",title:"Wash the dishes",isComplete:!1},{uuid:"8b144d62-faa7-4226-87e1-096d7c1bedc7",title:"Pay rent",isComplete:!0}],i=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))},p=e=>{try{return JSON.parse(localStorage.getItem(e))}catch(t){return console.error(t),null}},S=()=>{p("todos")||i("todos",T)},l=()=>p("todos"),L=e=>{const t=l();t.push(e),i("todos",t)},C=e=>{const t=l(),n=t.find(r=>r.uuid===e);n.isComplete=!n.isComplete,i("todos",t)},U=e=>{const t=l().filter(n=>n.uuid!==e);i("todos",t)},v=e=>{const t=document.querySelector("ul#todos-list"),n=document.createElement("li"),r=document.createElement("h3");n.dataset.uuid=e.uuid,n.classList.add("todo-card"),r.textContent=e.title;const o=document.createElement("div");o.innerHTML=`
    <label>
      Is Complete
      <input type="checkbox" name="isComplete" ${e.isComplete?"checked":""}>
    </label>
    <button class='delete-todo'>🗑️</button>`,n.append(r,o),t.append(n)},u=()=>{const e=document.querySelector("ul#todos-list");e.innerHTML="",l().forEach(n=>v(n))},I=e=>{if(!e.target.matches('input[type="checkbox"]'))return;const t=e.target.closest("#todos-list>li").dataset.uuid;C(t),u()},E=e=>{if(!e.target.matches("button.delete-todo"))return;const t=e.target.closest("#todos-list>li").dataset.uuid;U(t),u()},x=e=>{e.preventDefault();const t=e.target,n={uuid:b(),title:t.todoTitle.value,isComplete:!1};L(n),u(),t.reset()},O=()=>{S(),u(),document.querySelector("ul#todos-list").addEventListener("input",I),document.querySelector("ul#todos-list").addEventListener("click",E),document.querySelector("form#new-todo-form").addEventListener("submit",x)};O();
