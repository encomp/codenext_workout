export const todayItemTemplate = model => `
<li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
    <img src="${model.image}">
    <button id="${model.id}ItemBtn" type="button" class="btn btn-dark">${model.label}</button>
    <div id="${model.id}ItemSpinner" class="spinner-grow text-dark" role="status" style="visibility: visible">
        <span class="sr-only">Loading...</span>
    </div>
    <span id="${model.id}ItemBadge" class="badge badge-light" style="visibility: hidden"></span>
</li>
`;
