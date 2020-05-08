import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

const serviceAccount = require("../service-account-key.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hito-33569.firebaseio.com"
})

// exports.addAuthUser = functions.firestore
//   .document('users/{userId}')
//   .onCreate(async (snap, context) => {
//     try {
//       await admin.auth().createUser();
//       // tslint:disable-next-line: no-void-expression
//       return console.log('Created user with ID:' + snap.id);
//     }
//     catch (error) {
//             // tslint:disable-next-line: no-void-expression
//       return console.error('There was an error while creating authUser:', error);
//     }
//   });

exports.deleteAuthUser = functions.firestore
  .document('users/{userId}')
  .onDelete(async (snap, context) => {
    try {
      await admin.auth().deleteUser(snap.id);
      // tslint:disable-next-line: no-void-expression
      return console.log('Deleted user with ID:' + snap.id);
    }
    catch (error) {
            // tslint:disable-next-line: no-void-expression
      return console.error('There was an error while deleting authUser:', error);
    }
  });

// exports.addDocUser = functions.firestore
//   .document('users/{userId}')
//   .onCreate(async (snap, context) => {
//     try {
//       await admin.auth().createUser();
//       // tslint:disable-next-line: no-void-expression
//       return console.log('Created user with ID:' + snap.id);
//     }
//     catch (error) {
//             // tslint:disable-next-line: no-void-expression
//       return console.error('There was an error while creating docUser:', error);
//     }
//   });
  
exports.deleteDocUser = functions.auth
  .user()
  .onDelete(async (snap, context) => {
    try {
      await admin.firestore().collection('users').doc(snap.uid).delete();
      // tslint:disable-next-line: no-void-expression
      return console.log('Deleted authUser with ID:' + snap.uid);
    }
    catch (error) {
            // tslint:disable-next-line: no-void-expression
      return console.error('There was an error while deleting docUser:', error);
    }
  });