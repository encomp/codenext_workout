export const todayCardTemplate = model => `
<div class="card bg-dark">
    <div class="card-header">
        <div class="card-title row">
            <div class="col-lg-10">
                <span class="center" style="font-size: 1.25rem;">
                    Today's Workout
                </span>
            </div>
            <div class="col-lg-2">
                <button id="_${model.date}RefreshBtn" 
                    type="button" class="btn btn-outline-light btn-floating" 
                    style="position: relative; float: right;">
                    <span class="fas fa-sync" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </div>
    <div class="card-body text-white bg-dark mb-3">
        <p class="card-text">Your progress:</p>
        <div id="_${model.date}Alert"></div>
        <div class="accordion" id="todayCardAccordion">
            ${model.items}
        </div>
    </div>
</div>`;
