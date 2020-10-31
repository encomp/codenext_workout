export const todayCardTemplate = model => `
<div class="card bg-dark">
    <div class="card-header">
        <h5 class="card-title text-center">Today's Workout</h5>
    </div>
    <div class="card-body text-white bg-dark mb-3">
        <p class="card-text">Your progress:</p>
        <div class="accordion" id="todayCardAccordion">
            ${model.items}
        </div>
    </div>
</div>`;
