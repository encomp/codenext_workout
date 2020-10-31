import { todayItemDetailTemplate } from './todayItemDetail.template';
import { firestore } from './../../services/firebaseService';

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
            console.log(name + 'save');
        });
        const deleteBtn = document.querySelector('#' + name + 'BtnDelete');
        deleteBtn.addEventListener('click', event => {
            console.log(name + 'delete');
        });
    },
}
