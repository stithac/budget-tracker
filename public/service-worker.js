const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/db.js",
    "/index.js",
    "/manifest.webmanifest",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"

  ];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// install. When it does install of everything needed. Look for files needed.  Open CACHE_NAME then cache all files that were added in FILES_TO_CACHE const
self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting(); // anticipating that always will be an install and can skip waiting
});

// activate. The below is boiler plate code. It is activating all files.  If there were any files that don't match the DATA_CACHE_NAME, remove them.  The DATA_CACHE_NAME files were pre-cached in the installation phase
self.addEventListener("activate", function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// fetch. Boiler plate code. Adding event listener to "fetch". If the request.url includes "/api/" then open DATA_CACHE_NAME, if the response.status === 200, then store it in the cache. Then clone that response and store it internally. So when offline, the info will be able to be returned
self.addEventListener("fetch", function(evt) {
  // cache successful requests to the API
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  // if the request is not for the API, serve static assets using "offline-first" approach.
  // see https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network
  evt.respondWith(
    caches.match(evt.request).then(function(response) {
      return response || fetch(evt.request);
    })
  );
});

