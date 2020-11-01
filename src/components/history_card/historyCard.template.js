export const historyCardTemplate = model => `
<div class="card bg-dark">
    <div class="card-header">
        <div class="card-title row">
            <div class="col-lg-10">
                <span class="center" style="font-size: 1.25rem;">
                    Past Workouts
                </span>
            </div>
            <div class="col-lg-2">
                <button id="historyRefreshBtn" 
                    type="button" class="btn btn-outline-light btn-floating" 
                    style="position: relative; float: right;">
                    <span class="fas fa-sync" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </div>
    <div class="card-body text-white bg-dark mb-3">
        <div class="accordion" id="todayCardAccordion">
            ${model.items}
        </div>
    </div>
    <div class="card-footer">
        <nav aria-label="history navigation">
            <ul class="pagination text-white justify-content-center">
                <li class="page-item">
                    <a id="${model.priorPageBtnId}" class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">${model.page}</a></li>
                <li class="page-item">
                    <a id="${model.nextPageBtnId}" class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>`;
