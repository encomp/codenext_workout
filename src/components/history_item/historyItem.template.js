import {imageMap} from './../../util/image';

export const historyItemTemplate = model => `
<div id="${model.id}Card" class="card">
    <div class="card-header text-dark d-flex justify-content-between align-items-center" id="headingOne">
        <h5 class="font-weight-normal">${model.id}</h5>
    </div>
    <div class="card-body d-flex justify-content-between align-items-center">
        ${model.exercise.enabledExercises().map(element => '<img src="' + imageMap[element] + '"></img>').join('')}
    </div>
</div>
`;
