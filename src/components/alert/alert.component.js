import { alertBasicTemplate } from './alertBasic.template';

export const AlertComponent = {

    renderBasic(style, msg) {
        this.model = {
            type: style,
            msg: msg,
        };
        return alertBasicTemplate(this.model);
    },
}