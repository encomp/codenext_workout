import { todayItemTemplate } from './todayItem.template';
import { imageMap } from './../../util/image';
import { getExercise } from './../../repository/exercises';
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
        getExercise(model.id, model.user, model.date)
            .then(function (doc) {
                if (doc.exists) {
                    model.data = doc.data();
                    TodayItemComponent.renderDetails(model);
                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
    },

    renderDetails(model) {
        const exerciseSpinner = document.querySelector('#' + model.id + 'ItemSpinner');
        const exerciseBadge = document.querySelector('#' + model.id + 'ItemBadge');
        exerciseSpinner.style.visibility = "hidden";
        exerciseBadge.style.visibility = "visible";
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
    },

    displayAlert(model, innerHTML) {
        const alertDiv = document.querySelector('#' + model.id + 'Alert');
        alertDiv.innerHTML = innerHTML;
    },

    remove(model) {
        const card = document.querySelector('#' + model.id + 'Card');
        card.innerHTML = '';
    },
}
