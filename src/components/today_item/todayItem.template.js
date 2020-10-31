export const todayItemTemplate = model => `
<div id="${model.id}Card" class="card">
    <div class="card-header d-flex justify-content-between align-items-center" id="headingOne">
        <img src="${model.image}">
        <button id="${model.id}ItemBtn" type="button" class="btn btn-dark">${model.label}</button>
        <div id="${model.id}ItemSpinner" class="spinner-grow text-dark" role="status" style="visibility: visible">
            <span class="sr-only">Loading...</span>
        </div>
        <span id="${model.id}ItemBadge" class="badge badge-pill badge-dark" style="visibility: hidden"></span>
    </div>
    <div id="${model.id}Collapse" class="collapse" aria-labelledby="headingOne" data-parent="#todayCardAccordion">
      <div class="card-body bg-dark">
        <div id="${model.id}Alert"></div>
        <div id="${model.id}Details"></div>
      </div>
    </div>
</div>
`;
