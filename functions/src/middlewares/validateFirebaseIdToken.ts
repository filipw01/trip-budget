const admin = require("firebase-admin");
const productionUsers = require("../../production-users.json");

export const validateFirebaseIdToken = async (
  req: any,
  res: any,
  next: any
) => {
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    req.user = { name: "Anonymous" };
    next();
    console.error(
      "No Firebase ID token was passed as a Bearer token in the Authorization header.",
      "Make sure you authorize your request by providing the following HTTP header:",
      "Authorization: Bearer <Firebase ID Token>",
      'or by passing a "__session" cookie.'
    );
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    req.user = { name: "Anonymous" };
    next();
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    if (productionUsers.includes(decodedIdToken.uid)) {
      req.user = decodedIdToken;
    } else {
      req.user = { name: "Anonymous" };
    }
    next();
    return;
  } catch (error) {
    req.user = { name: "Anonymous" };
    next();
    console.error("Error while verifying Firebase ID token:", error);
    return;
  }
};
