import { historyCardTemplate } from './historyCard.template';
import { HistoryItemComponent } from './../history_item/historyItem.component';
import { getMetaDataDocuments } from './../../repository/metadata';

export const HistoryCardComponent = {

    init(idElement, user) {
        this.idElement = idElement;
        this.componentElement = document.querySelector(this.idElement);
        this.model = {
            priorPageBtnId: 'priorPageBtn',
            nextPageBtnId: 'nextPageBtn',
            user: user,
            limit: 3,
            page: 0,
            forward: true,
            pages: [],
            historyItemModels: []
        };
        this.load();
    },

    load() {
        let page = undefined;
        if (this.model.pages.length > 0) {
            page = this.model.pages[this.model.pages.length - 1];
        }
        if (this.model.forward) {
            getMetaDataDocuments(this.model.user, this.model.limit, page, undefined)
                .then(documentSnapshots => this.updatePage(documentSnapshots));
        } else {
            let startAt = undefined;
            if (this.model.pages.length >= 2) {
                startAt = this.model.pages[this.model.pages.length - 2];
            }
            getMetaDataDocuments(this.model.user, this.model.limit, startAt, page)
                .then(documentSnapshots => this.updatePage(documentSnapshots));
        }
    },

    updatePage(documentSnapshots) {
        if (documentSnapshots && documentSnapshots.docs && documentSnapshots.docs.length > 0) {
            if (this.model.forward) {
                this.model.page += 1;
                this.model.pages = this.model.pages.concat(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
            } else {
                this.model.page += -1;
            }
            this.render(documentSnapshots);
        }
    },

    render(documentSnapshots) {
        let items = '';
        documentSnapshots.forEach(document => {
            const historyModel = {
                id: document.id,
                exercise: document.data(),
            };
            this.model.historyItemModels = this.model.historyItemModels.concat([historyModel]);
            items += HistoryItemComponent.render(historyModel);
        });
        this.model.items = items;
        this.componentElement.innerHTML = historyCardTemplate(this.model);
        this.afterRender();
    },

    afterRender() {
        const refreshBtn = document.getElementById('historyRefreshBtn');
        refreshBtn.addEventListener('click', event => {
            this.init(this.idElement, this.model.user);
        });
        const priorBtn = document.getElementById(this.model.priorPageBtnId);
        priorBtn.addEventListener('click', event => {
            if (this.model.pages.length >= 2) {
                this.model.pages = this.model.pages.slice(0, this.model.pages.length - 1);
                this.model.forward = false;
                this.load();
            }
        });
        const nextBtn = document.getElementById(this.model.nextPageBtnId);
        nextBtn.addEventListener('click', event => {
            this.model.forward = true;
            this.load();
        });
    },
}
