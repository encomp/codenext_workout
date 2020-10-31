import { todayCardTemplate } from './todayCard.template';
import { firestore } from './../../services/firebaseService';
import { Exercises, converterExercises, excercisesList } from './../../util/exercise';
import { getDate } from './../../util/date';
import { TodayItemComponent } from './../today_item/todayItem.component';
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
        const docRef = firestore.collection("exercises")
            .doc(model.user)
            .collection("dates")
            .doc(model.date)
            .withConverter(converterExercises);
        docRef.get().then(doc => this.render(componentElement, doc, model)).catch(function (error) {
            console.log("Error getting document:", error);
        });
    },

    render(componentElement, doc, model) {
        if (doc.exists) {
            model.exercises = doc.data();
            model.excercisesList = excercisesList(model.exercises);
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
            afterRender(model);
        } else {
            console.log("No such document!");
        }
    },
}

function afterRender(model) {
    for (let index = 0; index < model.exercisesModel.length; index++) {
        let itemModel = model.exercisesModel[index];
        TodayItemComponent.afterRender(itemModel, (item) => {
            console.log(item);
            $(`#${itemModel.id}Collapse`).collapse('toggle');
        });
    }
}