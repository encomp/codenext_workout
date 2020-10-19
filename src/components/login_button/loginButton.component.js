import { buttonLoginTemplate } from './loginButton.template';
import { auth } from './../../services/firebaseService'

export const LoginButtonComponent = {

    render(model) {
        return buttonLoginTemplate(model);
    },

    afterRender(model, onSuccess, onError) {
        const loginButton = document.querySelector('#' + model.id);
        loginButton.addEventListener('click', event => {
            const provider = model.provider;
            auth().signInWithPopup(provider).then(function (result) {
                console.log(result);
                if (onSuccess !== undefined) {
                    onSuccess(result);
                }
            }).catch(function (error) {
                console.log(error);
                if (onError !== undefined) {
                    onError(error);
                }
            });
        });
    },
}
