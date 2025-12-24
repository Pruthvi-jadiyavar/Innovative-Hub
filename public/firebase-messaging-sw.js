// Scripts for firebase messaging service worker

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSy...", // We'll rely on the app to register this mostly, or if needed here we'd need to injection env vars which is hard in SW without build step. 
    // For basic SW receiving background messages, generic init might work if sender ID is correct.
    // Actually, standard practice for VITE is to just have the SW file.
    // We need to initialize with real config if we want to handle background events specifically.
    // For now, let's keep it minimal as per standard setup.
    authDomain: "campus-safety-app.firebaseapp.com",
    projectId: "campus-safety-app",
    storageBucket: "campus-safety-app.appspot.com",
    messagingSenderId: "1234567890", // Placeholder
    appId: "1:1234567890:web:123456" // Placeholder
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/vite.svg'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
