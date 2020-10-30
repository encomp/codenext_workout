import { exerciseSelectTemplate } from './exerciseSelect.template';
import { imageMap } from './../../util/image';

export const ExerciseSelectComponent = {

    render(model) {
        model.imageMap = imageMap;
        return exerciseSelectTemplate(model);
    },

    afterRender(model) {
        const exerciseImg = document.querySelector('#' + model.id + 'Img');
        const exerciseSelect = document.querySelector('#' + model.id);
        exerciseSelect.addEventListener('change', event => {
            if (exerciseSelect.value !== "") {
                exerciseImg.src = model.imageMap[exerciseSelect.value];
            } else {
                exerciseImg.src = "";
            }
        });
    },
}
