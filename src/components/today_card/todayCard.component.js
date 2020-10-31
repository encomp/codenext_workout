import { todayCardTemplate } from './todayCard.template';
import { TodayItemComponent } from './../today_item/todayItem.component';
import { getExerciseDoc } from './../../repository/metadata';
import { Exercises } from './../../util/exercise';
import { getDate } from './../../util/date';
import $ from 'jquery';

export const TodayCardComponent = {

    init(user) {
        this.componentElement = document.querySelector('#cardTodayProgress');
        this.model = {
            date: getDate(),
            user: user.email,
        };
        const model = this.model;
        const componentElement = this.componentElement;
        getExerciseDoc(model.user, model.date)
            .then(doc => this.render(componentElement, model, doc))
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    },

    render(componentElement, model, doc) {
        if (doc && doc.exists) {
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
            componentElement.innerHTML = todayCardTemplate(model);
            TodayCardComponent.afterRender(model);
        }
    },

    afterRender(model) {
        for (let index = 0; index < model.exercisesModel.length; index++) {
            let itemModel = model.exercisesModel[index];
            TodayItemComponent.afterRender(itemModel, (item) => {
                $(`#${itemModel.id}Collapse`).collapse('toggle');
            });
        }
    },
} 

