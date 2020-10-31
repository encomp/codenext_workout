import { todayItemDetailTemplate } from './todayItemDetail.template';
import { TodayItemComponent } from './../today_item/todayItem.component';
import { getExerciseRef, updateExercise } from './../../repository/exercises';
import { getMetaDataRef, getExerciseDoc } from './../../repository/metadata';
import { firestore } from './../../services/firebaseService';
import { disableExcercise } from './../../util/exercise';

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
            const repetition = document.querySelector('#' + name + 'Repetitions');
            const weight = document.querySelector('#' + name + 'Weight');
            model.data.repetitions[index] = repetition.value;
            model.data.weights[index] = weight.value;
            const docRef = getExerciseRef(model.id, model.user, model.date);
            updateExercise(docRef, model.data)
                .then(function () {
                    console.log("Document successfully updated!");
                }).catch(function (error) {
                    console.error("Error updating document: ", error);
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
                        // Check if there metada should be removed.
                        getExerciseDoc(model.user, model.date).then(function (doc) {
                            if (doc.exists) {
                                const exercisesData = doc.data();
                                // Check if all the exercise are set to false.
                                if (exercisesData.shouldDelete()) {
                                    metadataRef.delete().then(function () {
                                        console.log("Document successfully deleted!", exercisesData);
                                    }).catch(function (error) {
                                        console.error("Error removing document: ", error);
                                    });
                                }
                            }
                        }).catch(function (error) {
                            console.error("Error getting document:: ", error);
                        });
                    }).catch(function (error) {
                        console.error("Error updating documents: ", error);
                    });
            } else {
                let rep = model.data.repetitions;
                let wei = model.data.weights;
                model.data.repetitions = rep.slice(0, index).concat(rep.slice(index + 1, rep.length));
                model.data.weights = wei.slice(0, index).concat(wei.slice(index + 1, wei.length));
                updateExercise(docRef, model.data)
                    .then(function () {
                        TodayItemDetailComponent.remove(model, index);
                        TodayItemComponent.updateBadge(model);
                    }).catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
            }
        });
    },

    remove(model, index) {
        const name = model.id + '_' + index + '_';
        const todayItemDetail = document.querySelector('#' + name);
        todayItemDetail.innerHTML = '';
    }
}
