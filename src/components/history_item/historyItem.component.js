import { historyItemTemplate } from './historyItem.template';

export const HistoryItemComponent = {

    render(model) {
        this.model = model;
        return historyItemTemplate(model);
    }
}