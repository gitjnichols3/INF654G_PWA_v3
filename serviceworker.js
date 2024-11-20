const CACHE_NAME = "gig-tracker_v2";

const ASSETS_TO_CACHE = [
    "/",
    "/manifest.json",
    "/serviceworker.js",
    "/index.html",
    "/pages/zoe.html",
    "/pages/cooper.html",
    "/pages/contact.html",
    "/pages/p1.html",
    "/css/materialize.min.css",
    "/css/styles.css",
    "/js/firebaseDB.js",
    "/js/materialize.min.js",
    "/js/ui.js",
    "/images/p1/IMG_2523.JPEG",
    "/images/p1/IMG_4359.JPEG",
    "/images/p1/IMG_4360.JPEG",
    "/images/p1/IMG_4363.JPEG",
    "/images/p1/IMG_4367.JPEG",
    "/images/p1/IMG_4376.JPEG",
    "/images/16.png",
    "/images/32.png",
    "/images/c-mug-s.png",
    "/images/c-p1Thumb.png",
    "/images/ig icon.png",
    "/images/IMG_3039.JPEG",
    "/images/YT icon.png",
    "/images/z-mug-s.png",
    "/images/z-p1Thumb.png",
    "/images/icons/512.png",
    "/images/icons/192.png",
    "/images/icons/32.png",
    "/images/icons/16.png",
   "/images/screenshots/screenshot1.png",
    "/images/screenshots/screenshot2.png",
    "/images/screenshots/screenshot3.png",
    "/images/screenshots/screenshot4.png"
];

//Install event
self.addEventListener("install", (event) => {
    console.log("Service worker: Installing...");
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Service worker: caching files");
        return cache.addAll(ASSETS_TO_CACHE);
      })
    );
  });
  
  //Activate event
  self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activating...");
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log("Service Worker: Deleting old Cache");
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });
  
  // Fetch event with async/wait
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      (async function () {
        if (event.request.method !== "GET") {
          return fetch(event.request);
        }

        const cachedResponse = await caches.match(event.request);
  
        if (cachedResponse) {
          return cachedResponse;
        }
  
        try {
          const networkResponse = await fetch(event.request);
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone()); // Update cache with the fetched response
          return networkResponse;
        } catch (error) {
          console.error("Fetch failed, returning offline page:", error);
          // Optionally, return an offline page here if available in the cache
        }
      })()
    );
  });
