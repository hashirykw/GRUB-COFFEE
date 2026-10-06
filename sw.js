/* Grub Coffee Co. — offline cache. Bump VERSION when you upload new files. */
var VERSION='grub-v6';
var CORE=["./", "americano-duo.webp", "apple-touch-icon.png", "comfort-in-chaos.webp", "cookie-latte.webp", "favicon.png", "gallery-1-gold-sign.webp", "gallery-2-window-bar.webp", "gallery-3-just-coffee.webp", "gallery-4-plant-wall.webp", "gallery-5-the-bar.webp", "gallery-6-two-cups.webp", "gallery-7-neon.webp", "gallery-8-barista.webp", "gallery-9-stacked-cups.webp", "glass-case.webp", "grub-display.woff2", "grub-sans.woff2", "grub-script.woff2", "hero-poster.webp", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "index.html", "lenis.min.js", "logo-cream.webp", "logo-green.webp", "manifest.json", "menu-chocolate.webp", "menu-frappe.webp", "menu-hot-coffee.webp", "menu-iced-coffee.webp", "menu-iced-cooler.webp", "menu-iced-latte.webp", "menu-iced-tea.webp", "menu-texture.webp", "pistachio-croissant.webp", "step-1-grind.webp", "step-2-pull.webp", "step-3-steam.webp", "step-4-pour.webp", "storefront-night.webp", "three.min.js", "to-go.webp", "walking-breakfast.webp"];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin||r.headers.has('range')||/\.mp4$/.test(u.pathname))return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(VERSION).then(function(c){c.put('./',cp)});return res}).catch(function(){return caches.match('./').then(function(m){return m||caches.match('index.html')})}));
    return;
  }
  e.respondWith(caches.match(r).then(function(hit){
    var net=fetch(r).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(VERSION).then(function(c){c.put(r,cp)})}return res}).catch(function(){return hit});
    return hit||net;
  }));
});
