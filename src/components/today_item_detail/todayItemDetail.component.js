import { todayItemDetailTemplate } from './todayItemDetail.template';
import { AlertComponent } from './../alert/alert.component';
import { TodayCardComponent } from './../today_card/todayCard.component';
import { TodayItemComponent } from './../today_item/todayItem.component';
import { getExerciseRef, updateExercise } from './../../repository/exercises';
import { getMetaDataRef, getMetaDataDoc } from './../../repository/metadata';
import { firestore } from './../../services/firebaseService';
import { disableExcercise } from './../../util/exercise';
import $ from 'jquery';

export const TodayItemDetailComponent = {
    render(model, index) {
        this.model = model;
        this.index = index;
        this.name = model.id + '_' + index + '_';
        return todayItemDetailTemplate(this.name, model.data.repetitions[index], model.data.weights[index]);
    },

    afterRender(model, index) {
        const name = model.id + '_' + index + '_';
        const saveBtn = document.querySelector('#' + name + 'BtnSave');
        saveBtn.addEventListener('click', event => {
            $('#' + name + 'Alert').alert('dispose');
            const repetition = document.querySelector('#' + name + 'Repetitions');
            const weight = document.querySelector('#' + name + 'Weight');
            model.data.repetitions[index] = repetition.value;
            model.data.weights[index] = weight.value;
            const docRef = getExerciseRef(model.id, model.user, model.date);
            updateExercise(docRef, model.data)
                .then(function () {
                    const alert = AlertComponent.renderBasic("alert-success", "Document updated <strong>successfully<strong>.");
                    TodayItemComponent.displayAlert(model, alert);
                }).catch(function (error) {
                    const alert = AlertComponent.renderBasic("alert-danger", "Error <strong>updating</strong> document.");
                    TodayItemComponent.displayAlert(model, alert);
                    console.error("Error deleting document: ", model.data, error);
                });
        });
        const deleteBtn = document.querySelector('#' + name + 'BtnDelete');
        deleteBtn.addEventListener('click', event => {
            const docRef = getExerciseRef(model.id, model.user, model.date);
            if (model.data.repetitions.length == 1) {
                const metadataRef = getMetaDataRef(model.user, model.date);
                const data = disableExcercise(model.id);
                const batch = firestore.batch();
                batch.delete(docRef);
                batch.update(metadataRef, data);
                batch.commit()
                    .then(function () {
                        TodayItemComponent.remove(model);
                        const alert = AlertComponent.renderBasic("alert-info", "Document <strong>deleted</strong> successfully.");
                        TodayCardComponent.displayAlert(model.date, alert);
                        // Check if there metada should be removed.
                        getMetaDataDoc(model.user, model.date).then(function (doc) {
                            if (doc.exists) {
                                const exercisesData = doc.data();
                                // Check if all the exercise are set to false.
                                if (exercisesData.shouldDelete()) {
                                    metadataRef.delete().then(function () {
                                        console.log("Document successfully deleted!", exercisesData);
                                    }).catch(function (error) {
                                        const alert = AlertComponent.renderBasic("alert-danger", "Error <strong>deleting</strong> document.");
                                        TodayCardComponent.displayAlert(model.date, alert);
                                        console.error("Error deleting document: ", exercisesData, error);
                                    });
                                }
                            }
                        }).catch(function (error) {
                            const alert = AlertComponent.renderBasic("alert-warning", "Error <strong>retrieving</strong> the document.");
                            TodayCardComponent.displayAlert(model.date, alert);
                            console.error("Error getting document: ", model.user, model.date, error);
                        });
                    }).catch(function (error) {
                        const alert = AlertComponent.renderBasic("alert-danger", "Error <strong>deleting</strong> document.");
                        TodayCardComponent.displayAlert(model.date, alert);
                        console.error("Error deleting document: ", model, error);
                    });
            } else {
                console.log(model.data, index);
                model.data  = {
                    repetitions: removeIndex(model.data.repetitions, index),
                    weights: removeIndex(model.data.weights, index)
                };
                console.log(model.data);
                console.log(model);
                updateExercise(docRef, model.data)
                    .then(function () {
                        TodayItemComponent.renderDetails(model);
                        const alert = AlertComponent.renderBasic("alert-info", "Document <strong>deleted</strong> successfully.");
                        TodayCardComponent.displayAlert(model.date, alert);
                    }).catch(function (error) {
                        const alert = AlertComponent.renderBasic("alert-danger", "Error <strong>updating</strong> document.");
                        TodayCardComponent.displayAlert(model.date, alert);
                        console.error("Error updating document: ", model.data, error);
                    });
            }
        });
    },
}

function removeIndex(array, index) {
    const item = array[index];
    return array.filter(element => element !== item);
}