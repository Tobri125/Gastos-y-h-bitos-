const CACHE='miVida-v2';
const urls=['/Gastos-y-h-bitos-/app_vida.html','/Gastos-y-h-bitos-/manifest.json'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(urls)).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([clients.claim(),caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))]));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const rc=r.clone();caches.open(CACHE).then(c=>c.put(e.request,rc));return r;}).catch(()=>caches.match(e.request)));});
