export const exerciseCardTemplate = model => `
<div class="card bg-dark mb-3">
    <div class="card-header">
        <div class="card-title">
            <div class="col-lg-10">
                <span class="align-middle" style="font-size: 1.25rem;">
                Log your Progress:
                </span>
            </div>
        </div>
    </div>
    <div class="card-body">
        <div id="${model.id}Alert"></div>
        <form class="was-validated">
            <div class="form-row">
                <div id="${model.id}Select" class="col">   
                </div>
            </div>
            <div class="form-row" style="margin-top: 10px;">
                <div class="col">
                    <label for="${model.id}Rep">Repetitions <i class="fas fa-redo"></i> :</label>
                    <input type="text" id="${model.id}Rep" class="form-control" placeholder="Repetitions" required>
                    <div class="invalid-feedback">
                        Please provide a valid number of Repetitions.
                    </div>
                </div>
                <div class="col">
                    <label for="${model.id}Weight">Weight <i class="fas fa-dumbbell"></i> :</label>
                    <input type="text" id="${model.id}Weight" class="form-control" placeholder="Weight" required>
                    <div class="invalid-feedback">
                        Please provide a valid weight value.
                    </div>
                </div>
            </div>
        </form>
        <button id="${model.id}Submit" class="btn btn-secondary btn-lg btn-block" style="margin-top: 20px;">
                Log <i class="far fa-save"></i>
        </button>
    </div>
</div>
`;
