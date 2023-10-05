// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { envAccess } from './envAccess';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: envAccess.API_KEY,
	authDomain: envAccess.AUTH_DOMAIN,
	projectId: envAccess.PROJECT_ID,
	storageBucket: envAccess.STORAGE_BUCKET,
	messagingSenderId: envAccess.MESSAGING_SENDER_ID,
	appId: envAccess.APP_ID,
	measurementId: envAccess.MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
