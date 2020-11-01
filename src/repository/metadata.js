import { Exercises, converterExercises } from './../util/exercise';
import { firestore } from './../services/firebaseService';

export function getMetaDataRef(userEmail, newDate) {
    return firestore.collection("exercises").doc(userEmail).collection("dates").doc(newDate);
}

export function getMetaDataDoc(userEmail, newDate) {
    return firestore.collection("exercises").doc(userEmail).collection("dates").doc(newDate).withConverter(converterExercises).get();
}

export function getMetaDataDocuments(userEmail, limit, startAfter, endAt) {
    let query = firestore.collection("exercises").doc(userEmail).collection("dates");
    if (limit) {
        query = query.limit(limit);
    }
    if (startAfter) {
        query = query.startAfter(startAfter);
    }
    if (endAt) {
        query = query.endAt(endAt);
    }
    return query.withConverter(converterExercises).get();
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
