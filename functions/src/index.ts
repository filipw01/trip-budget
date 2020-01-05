import * as functions from "firebase-functions";
const admin = require("firebase-admin");
const serviceAccount = require("../trip-budget-27472.json");
const cors = require("cors")({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trip-budget-27472.firebaseio.com"
});

const db = admin.firestore();

export const createTrip = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      const { tripName, dateStart, dateEnd, town } = request.body;
      const docRef = db.collection("trips").doc(tripName);

      const newTrip = await docRef.set({
        tripName,
        dateStart,
        dateEnd,
        town,
        expenses: [
          { name: "accommodation" },
          { name: "food" },
          { name: "travel" }
        ]
      });
      response.send(newTrip);
    });
  }
);

export const deleteTrip = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      const { tripName } = request.body;
      const deletedTrip = await db
        .collection("trips")
        .doc(tripName)
        .delete();

      response.send(deletedTrip);
    });
  }
);

function addIfDefined(object: any, property: any, propertyName: string) {
  if (property !== undefined) object[propertyName] = property;
}

export const updateTrip = functions.https.onRequest(
  async (request, response) => {
    cors(request, response, async () => {
      const { tripName, dateStart, dateEnd, town, expenses } = request.body;
      const docRef = db.collection("trips").doc(tripName);
      const updateData = {};
      addIfDefined(updateData, tripName, "tripName");
      addIfDefined(updateData, dateStart, "dateStart");
      addIfDefined(updateData, dateEnd, "dateEnd");
      addIfDefined(updateData, town, "town");
      addIfDefined(updateData, expenses, "expenses");
      const trip = await docRef.update(updateData);
      response.send(trip);
    });
  }
);
