import { exerciseCardTemplate } from './exerciseCard.template';
import { ExerciseSelectComponent } from './../exercise_select/exerciseSelect.component';
import { Exercises } from './../../util/exercise';
import { getMetaDataRef, saveMetaData, updateMetaData } from './../../repository/metadata';
import { getExerciseRef, saveExercise, updateExercise } from './../../repository/exercises';
import { getDate } from './../../util/date';
import { TodayCardComponent } from './../today_card/todayCard.component';

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
        const user = this.user;
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
                saveOrUpdate(selectComponent.value, user.email, newDate, data, user);
            }
        });
        ExerciseSelectComponent.afterRender(this.model.selectModel);
    }
};

function validData(selectComponent, repetition, weight) {
    return selectComponent.value !== '' && repetition.value !== '' && weight.value !== ''
}

function saveOrUpdate(exercise, userEmail, newDate, data, user) {
    const docMetaRef = getMetaDataRef(userEmail, newDate);
    docMetaRef.get().then(function (doc) {
        if (doc.exists) {
            const exercisesData = doc.data();
            exercisesData[exercise] = true;
            updateMetaData(docMetaRef, exercisesData)
                .then(function () {
                    console.log("Document successfully updated!");
                    TodayCardComponent.init(user);
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        } else {
            const exercisesData = new Exercises(false, false, false, false, false, false, false, false, false, false);
            exercisesData[exercise] = true;
            saveMetaData(userEmail, newDate, exercisesData)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef);
                    TodayCardComponent.init(user);
                }).catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

    const docRef = getExerciseRef(exercise, userEmail, newDate);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            const currentData = doc.data();
            const mergeData = {
                repetitions: currentData.repetitions.slice(0).concat(data.repetitions),
                weights: currentData.weights.slice(0).concat(data.weights)
            }
            updateExercise(docRef, mergeData)
                .then(function () {
                    console.log("Document successfully updated!");
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        } else {
            saveExercise(exercise, userEmail, newDate, data)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef);
                }).catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}
