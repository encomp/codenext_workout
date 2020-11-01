import { todayCardTemplate } from './todayCard.template';
import { TodayItemComponent } from './../today_item/todayItem.component';
import { getMetaDataDoc } from './../../repository/metadata';
import { Exercises } from './../../util/exercise';
import $ from 'jquery';

export const TodayCardComponent = {

    init(idElement, user, date) {
        this.idElement = idElement;
        this.componentElement = document.querySelector(this.idElement);
        this.model = {
            date: date,
            user: user,
        };
        this.load();
    },

    load() {
        getMetaDataDoc(this.model.user, this.model.date)
            .then(doc => this.render(doc))
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    },

    render(doc) {
        if (doc && doc.exists) {
            const model = this.model;
            model.exercises = doc.data();
            model.excercisesList = model.exercises.enabledExercises();
            let itemsInnerHTML = '';
            model.exercisesModel = new Array();
            for (let index = 0; index < model.excercisesList.length; index++) {
                const itemModel = {
                    id: model.excercisesList[index],
                    user: model.user,
                    date: model.date,
                }
                itemsInnerHTML += TodayItemComponent.render(itemModel);
                model.exercisesModel = model.exercisesModel.concat([itemModel]);
            }
            model.items = itemsInnerHTML;
            this.componentElement.innerHTML = todayCardTemplate(model);
            this.afterRender();
        }
    },

    afterRender() {
        for (let index = 0; index < this.model.exercisesModel.length; index++) {
            let itemModel = this.model.exercisesModel[index];
            TodayItemComponent.afterRender(itemModel, (item) => {
                $(`#${itemModel.id}Collapse`).collapse('toggle');
            });
        }
        let refreshBtn = document.querySelector('#_' + this.model.date + 'RefreshBtn');
        refreshBtn.addEventListener('click', event => {
            this.load();
        });
    },

    displayAlert(date, innerHTML) {
        let alertDiv = document.querySelector('#_' + date + 'Alert');
        alertDiv.innerHTML = innerHTML;
    },
}

