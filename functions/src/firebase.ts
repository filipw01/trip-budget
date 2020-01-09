const admin = require("firebase-admin");
const serviceAccount = require("../trip-budget-27472.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trip-budget-27472.firebaseio.com"
});

export const db: FirebaseFirestore.Firestore = admin.firestore();
