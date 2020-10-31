import { Exercises, converterExercises } from './../util/exercise';
import { firestore } from './../services/firebaseService';

export function getMetaDataRef(userEmail, newDate) {
    return firestore.collection("exercises").doc(userEmail).collection("dates").doc(newDate);
}

export function saveMetaData(userEmail, newDate, data) {
    return firestore.collection("exercises")
        .doc(userEmail)
        .collection("dates")
        .doc(newDate)
        .withConverter(converterExercises)
        .set(data);
}

export function updateMetaData(docRef, data) {
    return docRef
        .withConverter(converterExercises)
        .update(data);
}
