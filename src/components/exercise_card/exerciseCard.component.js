import { exerciseCardTemplate } from './exerciseCard.template';
import { ExerciseSelectComponent } from './../exercise_select/exerciseSelect.component';
import { firestore } from './../../services/firebaseService';

export const ExerciseCardComponent = {

    init(user) {
        this.user = user;
        this.componentElement = document.querySelector('#cardExercise');
        this.model = {
            id: 'log-exercise-card',
            selectModel: {
                id: 'exercise-select-component',
            }
        };
        this.render();
    },

    render() {
        this.componentElement.innerHTML = exerciseCardTemplate(this.model);
        const selectComponent = document.getElementById(this.model.id + 'Select');
        selectComponent.innerHTML = ExerciseSelectComponent.render(this.model.selectModel);
        this.afterRender();
    },

    afterRender() {
        const model = this.model;
        const user = this.user.email;
        const submitBtn = document.getElementById(model.id + 'Submit');
        submitBtn.addEventListener('click', event => {
            const newDate = getDate();
            const selectComponent = document.getElementById(model.selectModel.id);
            const repetition = document.getElementById(model.id + 'Rep');
            const weight = document.getElementById(model.id + 'Weight');
            if (validData(selectComponent, repetition, weight)) {
                let data = {
                    repetitions: [repetition.value],
                    weights: [weight.value]
                };
                saveOrUpdate(selectComponent.value, user, newDate, data);
            }
        });
        ExerciseSelectComponent.afterRender(this.model.selectModel);
    }
};

function getDate() {
    const currentDate = new Date();
    return currentDate.getMonth() + 1 + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
}

function validData(selectComponent, repetition, weight) {
    return selectComponent.value !== '' && repetition.value !== '' && weight.value !== ''
}

function saveOrUpdate(exercise, user, newDate, data) {
    const docMetaRef = firestore.collection("exercises").doc(user).collection("dates").doc(newDate);
    docMetaRef.get().then(function (doc) {
        if (doc.exists) {
            const exercisesData = doc.data();
            exercisesData[exercise] = true;
            updateMetaData(docMetaRef, exercisesData);
        } else {
            const exercisesData = new Exercises(false, false, false, false, false, false, false, false, false, false);
            exercisesData[exercise] = true;
            saveMetaData(user, newDate, exercisesData);
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

    const docRef = firestore.collection(exercise).doc(user).collection("dates").doc(newDate);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            const currentData = doc.data();
            const mergeData = {
                repetitions: currentData.repetitions.slice(0).concat(data.repetitions),
                weights: currentData.weights.slice(0).concat(data.weights)
            }
            updateExercise(docRef, mergeData);
        } else {
            saveExercise(exercise, user, newDate, data);
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function updateMetaData(docRef, data) {
    return docRef
        .withConverter(converterExercises)
        .update(data)
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}

function updateExercise(docRef, data) {
    return docRef.update(data)
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}

function saveMetaData(user, newDate, data) {
    firestore.collection("exercises")
        .doc(user)
        .collection("dates")
        .doc(newDate)
        .withConverter(converterExercises)
        .set(data)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef);
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function saveExercise(exercise, user, newDate, data) {
    firestore.collection(exercise)
        .doc(user)
        .collection("dates")
        .doc(newDate)
        .set(data)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef);
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

class Exercises {
    constructor(abs, back, biceps, chest, calves, forearms, quadriceps, shoulders, triceps) {
        this.abs = abs;
        this.back = back;
        this.biceps = biceps;
        this.chest = chest;
        this.calves = calves;
        this.forearms = forearms;
        this.quadriceps = quadriceps;
        this.shoulders = shoulders;
        this.triceps = triceps;
    }
}

const converterExercises = {
    toFirestore: function (exercises) {
        return {
            abs: exercises.abs,
            back: exercises.back,
            biceps: exercises.biceps,
            chest: exercises.chest,
            calves: exercises.calves,
            forearms: exercises.forearms,
            quadriceps: exercises.quadriceps,
            shoulders: exercises.shoulders,
            triceps: exercises.triceps
        }
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Exercises(data.abs, data.back, data.biceps, data.chest, data.calves, data.forearms, data.quadriceps, data.shoulders, data.triceps)
    }
}
