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
            let data = {
                repetitions: [repetition.value],
                weights: [weight.value]
            };
            saveOrUpdate(selectComponent.value, user, newDate, data);
        });
        ExerciseSelectComponent.afterRender(this.model.selectModel);
    }
};

function getDate() {
    const currentDate = new Date();
    return currentDate.getMonth() + 1 + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
}

function saveOrUpdate(exercise, user, newDate, data) {
    const docRef = firestore.collection(exercise).doc(user).collection("dates").doc(newDate);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            const currentData = doc.data();
            const mergeData = {
                repetitions: currentData.repetitions.slice(0).concat(data.repetitions),
                weights: currentData.weights.slice(0).concat(data.weights)
            }
            update(docRef, mergeData);
        } else {
            save(exercise, user, newDate, data);
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

function update(docRef, data) {
    console.log("Data:", data);
    return docRef.update(data)
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}

function save(exercise, user, newDate, data) {
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