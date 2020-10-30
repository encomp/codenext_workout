export const todayItemTemplate = model => `
<li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
    <img src="${model.image}">
    <button id="${model.id}ItemBtn" type="button" class="btn btn-dark">${model.label}</button>
    <span id="${model.id}ItemBadge" class="badge badge-light"></span>
</li>
`;
