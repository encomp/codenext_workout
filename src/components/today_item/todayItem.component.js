import { todayItemTemplate } from './todayItem.template';
import { imageMap } from './../../util/image';
import { firestore } from './../../services/firebaseService';

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
        const exerciseBadge = document.querySelector('#' + model.id + 'ItemBadge');
        var docRef = firestore.collection(model.id).doc(model.user).collection("dates").doc(model.date);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                model.data = doc.data();
                console.log("Document data:", model.data);
                exerciseBadge.innerHTML = model.data.repetitions.length;
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },
}
