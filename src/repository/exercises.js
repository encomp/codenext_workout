import { firestore } from './../services/firebaseService';

export function getExerciseRef(exercise, userEmail, newDate) {
    return firestore.collection(exercise).doc(userEmail).collection("dates").doc(newDate);
}

export function getExercise(exercise, userEmail, newDate) {
    return firestore.collection(exercise).doc(userEmail).collection("dates").doc(newDate).get();
}

export function saveExercise(exercise, user, newDate, data) {
    return firestore.collection(exercise)
        .doc(user)
        .collection("dates")
        .doc(newDate)
        .set(data);
}

export function updateExercise(docRef, data) {
    return docRef.update(data);
}
