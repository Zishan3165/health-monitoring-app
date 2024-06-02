/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { User } from "./types";
import { Message } from "firebase-admin/lib/messaging/messaging-api";

admin.initializeApp();

const getTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString([], {
    timeZone: "Asia/Dhaka",
  });
};

export const onCriticalConditionAdd = functions
  .region("asia-east2")
  .firestore.document("HealthLog/{id}")
  .onCreate(async (snap) => {
    const timestamp = Date.now();
    await snap.ref.set(
      {
        timestamp,
      },
      { merge: true }
    );
    const data = snap.data();
    if (data.type === "ABNORMAL") {
      const doctorId = data.doctorId;
      const patientId = data.patientId;
      const doctorDetailsResponse = await admin
        .firestore()
        .collection("Users")
        .doc(doctorId)
        .get();
      const doctorDetails = doctorDetailsResponse.data() as User;
      const token = doctorDetails.deviceIdToken;
      if (token) {
        const patientDetailsResponse = await admin
          .firestore()
          .collection("Users")
          .doc(patientId)
          .get();
        const patientDetails = patientDetailsResponse.data() as User;
        const message: Message = {
          notification: {
            title:
              data.fallDetection === 1
                ? "Fall detected!"
                : `Abnormal reading detected!`,
            body: `ID : ${patientDetails.id} Name: ${
              patientDetails.fullName
            } Time: ${getTime(timestamp)}`,
            // sound: "default",
          },
          token,
        };
        return admin.messaging().send(message);
      }
    }

    return Promise.resolve(null);
  });
