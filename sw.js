const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
 
];

var Servicenumber =0;
Servicenumber++;


self.addEventListener("install", installEvent => {
  console.log(installEvent);
  installEvent.waitUntil(
    caches
      .open(staticDevCoffee)
      .then(cache => {
        cache.addAll(assets);
      })
      .catch(console.log)
  );
})





self.addEventListener("fetch", event => {
  // console.log(event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then(res => {
        return res || fetch(event.request);
      })
      .catch(console.log)
  );
})

const expectedCaches=["dev-coffee-site-v1"];

self.addEventListener("install", event => {
  console.log("Version2 installing");
  caches.delete("dev-coffee-site-v1");
  //console.log("old cache deleted");
  caches.open(staticDevCoffee).then(cache => {
    cache.addAll(assets)
  })
  

});

self.addEventListener('activate', event => {
  console.log("Service Worker activated, deleting cache now");

  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key=> {
        if(!expectedCaches.includes(key)){
          return caches.delete(key);
        }
      })
    )).then(()=>{
      console.log('V2 ready to catch fetches');
    })
  );
})
