const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/manifest.json",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg",
  

 
];
var Servicenumber;
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
