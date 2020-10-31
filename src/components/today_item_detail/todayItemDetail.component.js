import { todayItemDetailTemplate } from './todayItemDetail.template';
import { getExerciseRef, updateExercise } from './../../repository/exercises';

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
            if (model.data.repetitions.length == 1) {
                
            } else {
                let rep = model.data.repetitions;
                let wei = model.data.weights;
                model.data.repetitions = rep.slice(0, index).concat(rep.slice(index + 1, rep.length));
                model.data.weights = wei.slice(0, index).concat(wei.slice(index + 1, wei.length));
                console.log(model.id, model.user, model.date, model.data);
                const docRef = getExerciseRef(model.id, model.user, model.date);
                updateExercise(docRef, model.data)
                    .then(function () {
                        console.log("Document successfully updated!");
                    }).catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
            }
            const row = document.querySelector('#' + name);
            row.innerHTML = '';
        });
    },
}
