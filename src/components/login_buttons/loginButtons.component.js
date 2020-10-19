import { auth } from './../../services/firebaseService'
import { LoginButtonComponent } from './../login_button/loginButton.component';

export const LoginButtonsComponent = {

    init() {
        this.appElement = document.querySelector('#loginButtons');

        let provider = new auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        this.facebookButton = {
            id: 'facebook-login',
            image: 'fa-facebook-f',
            provider: provider,
        };
        
        provider = new auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.googleButton = {
            id: 'google-login',
            image: 'fa-google',
            provider: provider,
        };

        provider = new auth.GithubAuthProvider();
        provider.addScope('repo');
        this.githubButton = {
            id: 'github-login',
            image: 'fa-github-alt',
            provider: provider,
        }
        this.render();
    },

    render() {
        let loginButtonsViewHTML = LoginButtonComponent.render(this.facebookButton);
        loginButtonsViewHTML += LoginButtonComponent.render(this.githubButton);
        loginButtonsViewHTML += LoginButtonComponent.render(this.googleButton);
        this.appElement.innerHTML = loginButtonsViewHTML;
        this.afterRender();
    },

    afterRender() {
        LoginButtonComponent.afterRender(this.facebookButton, (successMsg) => {
            console.log("Facebook: " + successMsg);
        });
        LoginButtonComponent.afterRender(this.githubButton, (successMsg) => {
            console.log("Github: " + successMsg);
        });
        LoginButtonComponent.afterRender(this.googleButton, (successMsg) => {
            console.log("Google: " + successMsg);
        });
    },
}
