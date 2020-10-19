export const buttonLoginTemplate = model => `
<div class="col col-lg-2">
    <button id="${model.id}" type="button" class="btn btn-outline-light btn-floating">
        <span class="fab ${model.image}" aria-hidden="true"></span>
    </button>
</div>
`;