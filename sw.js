// Service Worker for PWA functionality with Background Sync
const CACHE_NAME = 'claimbot-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', function(event) {
  console.log('[Service Worker] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
  
  if (event.tag === 'chat-sync') {
    event.waitUntil(syncChatMessages());
  }
});

// Background sync functions
async function doBackgroundSync() {
  console.log('[Service Worker] Performing background sync');
  try {
    // Sync any pending data when back online
    const cache = await caches.open(CACHE_NAME);
    // Update cache with latest content if online
    if (navigator.onLine) {
      const response = await fetch('/');
      if (response.ok) {
        await cache.put('/', response);
      }
    }
  } catch (error) {
    console.error('[Service Worker] Background sync failed:', error);
  }
}

async function syncChatMessages() {
  console.log('[Service Worker] Syncing chat messages');
  // Sync chat messages when back online
  try {
    // Add your chat syncing logic here
    const pendingMessages = await getStoredMessages();
    if (pendingMessages.length > 0) {
      // Process pending messages
      console.log('Processing pending messages:', pendingMessages.length);
    }
  } catch (error) {
    console.error('[Service Worker] Chat sync failed:', error);
  }
}

async function getStoredMessages() {
  // Get pending messages from IndexedDB or localStorage
  return []; // Placeholder
}

// Periodic sync (when supported)
self.addEventListener('periodicsync', event => {
  console.log('[Service Worker] Periodic sync triggered:', event.tag);
  
  if (event.tag === 'content-sync') {
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  console.log('[Service Worker] Updating content in background');
  try {
    const cache = await caches.open(CACHE_NAME);
    // Update critical resources
    const urlsToUpdate = ['/', '/index.html', '/manifest.json'];
    
    for (const url of urlsToUpdate) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      } catch (error) {
        console.error(`Failed to update ${url}:`, error);
      }
    }
  } catch (error) {
    console.error('[Service Worker] Content update failed:', error);
  }
}

// Network state change handler
self.addEventListener('online', function(event) {
  console.log('[Service Worker] Back online - triggering sync');
  // Trigger background sync when back online
  if (self.registration.sync) {
    self.registration.sync.register('background-sync');
  }
});
