// DOM Elements
const uploadBtn = document.getElementById('upload_btn');
const gallery = document.getElementById('gallery');

// IndexedDB Setup
const DB_NAME = 'PhotoGalleryDB';
const STORE_NAME = 'Images';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveImageToIndexedDB(name, blob) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  // Store the Blob and its name
  store.add({ name, blob });
  transaction.oncomplete = () => console.log('Image saved to IndexedDB');
}

async function getImagesFromIndexedDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function displayCachedImages() {
  const dbImages = await getImagesFromIndexedDB(); // Get image metadata from IndexedDB

  for (const image of dbImages) {
    try {
      // Ensure the blob is valid before creating a URL
      if (image.blob instanceof Blob) {
        const imageUrl = URL.createObjectURL(image.blob); // Create a Blob URL
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        gallery.appendChild(imgElement);
      } else {
        console.warn('Invalid Blob data:', image.name);
      }
    } catch (error) {
      console.error('Error displaying image:', image.name, error);
    }
  }
}

// File Upload Using File System Access API
uploadBtn.addEventListener('click', async () => {
  try {
    // Open file picker
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Images',
          accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
        },
      ],
      multiple: false,
    });

    // Read file contents
    const file = await fileHandle.getFile();
    const imageBlob = await file.arrayBuffer();
    const blob = new Blob([imageBlob], { type: file.type });

    // Save image metadata to IndexedDB
    await saveImageToIndexedDB(file.name, blob);

    // Display the image in the gallery
    const imageUrl = URL.createObjectURL(blob);
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    gallery.appendChild(imgElement);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
});

// Load Cached Images on Page Load
window.addEventListener('load', async () => {
  await displayCachedImages();
});

// Register the Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js') // Path to your service worker file
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
} else {
  console.warn('Service Workers are not supported in this browser.');
}