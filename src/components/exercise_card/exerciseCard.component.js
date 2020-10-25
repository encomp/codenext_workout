import { exerciseCardTemplate } from './exerciseCard.template';
import { ExerciseSelectComponent } from './../exercise_select/exerciseSelect.component';

export const ExerciseCardComponent = {

    init() {
        this.componentElement = document.querySelector('#cardExercise');
        this.model = {
            id: 'log-exercise-card',
            selectModel: {
                id: 'exercise-select-component',
            }
        };
        this.render();
    },

    render() {
        this.componentElement.innerHTML = exerciseCardTemplate(this.model);
        const selectComponent = document.getElementById(this.model.id + 'Select');
        selectComponent.innerHTML = ExerciseSelectComponent.render(this.model.selectModel);
        this.afterRender();
    },

    afterRender() {
        ExerciseSelectComponent.afterRender(this.model.selectModel);
    }
};