import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfTTm5cQfWFUg3IaIFH9nkck_y42X08Gs",
  authDomain: "campus-safety-49426.firebaseapp.com",
  projectId: "campus-safety-49426",
  storageBucket: "campus-safety-49426.firebasestorage.app",
  messagingSenderId: "327144540278",
  appId: "1:327144540278:web:01db5bf26dfd523315b757",
  measurementId: "G-ZFELE4D38S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Messaging (FCM)
let messaging;
try {
  messaging = getMessaging(app);
} catch (err) {
  console.log("Messaging not supported in this environment (likely server-side or non-https localhost without specific flags).");
}

export const requestForToken = async () => {
  if (!messaging) return null;
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE' }); // User needs to replace this later
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
    return null;
  }
};

export { messaging };

export default app;
