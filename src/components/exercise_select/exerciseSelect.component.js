import { exerciseSelectTemplate } from './exerciseSelect.template';

export const ExerciseSelectComponent = {

    render(model) {
        model.imageMap = new Map();
        let imageMap = model.imageMap;
        imageMap['abs'] = 'assets/icons8-abs-50.png';
        imageMap['back'] = 'assets/icons8-back-50.png';
        imageMap['biceps'] = 'assets/icons8-biceps-50.png';
        imageMap['chest'] = 'assets/icons8-chest-50.png';
        imageMap['calves'] = 'assets/icons8-calves-50.png';
        imageMap['forearms'] = 'assets/icons8-forearm-50.png';
        imageMap['quadriceps'] = 'assets/icons8-quadriceps-50.png';
        imageMap['shoulders'] = 'assets/icons8-shoulders-50.png';
        imageMap['triceps'] = 'assets/icons8-triceps-50.png';
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
