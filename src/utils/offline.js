// utils/offline.js

import { openDB } from 'idb';

const dbPromise = openDB('pos-app-db', 1, {
  upgrade(db) {
    db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
  }
});

export async function saveRequest(request) {
  const db = await dbPromise;
  console.log('Saving request to IndexedDB', request);
  await db.add('requests', request);
}

export async function syncQueuedRequests() {
  const db = await dbPromise;
  const allRequests = await db.getAll('requests');
  
  for (const request of allRequests) {
    try {
      console.log('Syncing request', request);
      const fetchOptions = {
        method: request.method,
        headers: request.headers,
      };
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        fetchOptions.body = JSON.stringify(request.body);
      }
      await fetch(request.url, fetchOptions);
      await db.delete('requests', request.id);
    } catch (error) {
      console.error('Sync failed for request', request, error);
    }
  }
}
