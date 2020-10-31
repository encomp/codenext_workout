import { todayItemTemplate } from './todayItem.template';
import { imageMap } from './../../util/image';
import { firestore } from './../../services/firebaseService';
import { TodayItemDetailComponent } from './../today_item_detail/todayItemDetail.component';

export const TodayItemComponent = {

    render(model) {
        model.label = model.id.toUpperCase();
        model.image = imageMap[model.id];
        return todayItemTemplate(model);
    },

    afterRender(model, onClick) {
        const exerciseBtn = document.querySelector('#' + model.id + 'ItemBtn');
        exerciseBtn.addEventListener('click', event => {
            onClick(model);
        });
        const exerciseSpinner = document.querySelector('#' + model.id + 'ItemSpinner');
        const exerciseBadge = document.querySelector('#' + model.id + 'ItemBadge');
        var docRef = firestore.collection(model.id).doc(model.user).collection("dates").doc(model.date);
        docRef.get().then(function (doc) {
            exerciseSpinner.style.visibility = "hidden";
            exerciseBadge.style.visibility = "visible";
            if (doc.exists) {
                model.data = doc.data();
                console.log("Model:", model);
                console.log("Document data:", model.data);
                exerciseBadge.innerHTML = model.data.repetitions.length;
                let items = '';
                for (let index = 0; index < model.data.repetitions.length; index++) {
                    items += TodayItemDetailComponent.render(model, index);
                }
                const details = document.querySelector('#' + model.id + 'Details');
                details.innerHTML = items;
                for (let index = 0; index < model.data.repetitions.length; index++) {
                    TodayItemDetailComponent.afterRender(model, index);
                }
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },

    updateBadge(model) {
        const exerciseBadge = document.querySelector('#' + model.id + 'ItemBadge');
        exerciseBadge.innerHTML = model.data.repetitions.length;
    },

    remove(model) {
        const card = document.querySelector('#' + model.id + 'Card');
        card.innerHTML = '';
    },
}
