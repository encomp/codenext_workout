export const alertBasicTemplate = model => `
<div class="alert ${model.type}" role="alert">
        ${model.msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
`;
