export const todayItemDetailTemplate = (name, repetitions, weight) => `
<form id="${name}">
    <div class="form-group row">
        <label for="repetitions" class="col-sm-2 col-form-label">
            <i class="fas fa-redo center">  : </i>
        </label>
        <div class="col-sm-2">
            <input id="${name}Repetitions" type="text" class="form-control-plaintext text-white vertical-center" id="repetitions" value="${repetitions}">
        </div>
        <label for="weight" class="col-sm-2 col-form-label">
            <i class="fas fa-dumbbell center">  : </i>
        </label>
        <div class="col-sm-2">
            <input id="${name}Weight" type="text" class="form-control-plaintext text-white vertical-center" id="weight" value="${weight}">
        </div>
        <div class="col-md-2">
            <button id="${name}BtnSave" type="button" class="btn btn-secondary btn-floating" style="margin-left: 20px;">
                <span class="fab fas fa-save" aria-hidden="true"></span>
            </button>
        </div>
        <div class="col-md-2">
            <button id="${name}BtnDelete" type="button" class="btn btn-light btn-floating">
                <span class="fab fas fa-trash-alt" aria-hidden="true"></span>
            </button>
        </div>
    </div>
</form>
`;
