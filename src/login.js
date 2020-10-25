import 'bootstrap';
import './scss/index.scss';
import './scss/login.scss';
import * as firebase from 'firebase/app';
import { auth } from './services/firebaseService'
import { LoginButtonsComponent } from './components/login_buttons/loginButtons.component';
import { gotoHome } from './util/redirect'

LoginButtonsComponent.init();

//If the user is already logged in redirect to the home page.
firebase.auth().onAuthStateChanged(function (newuser) {
    if (newuser) {
        gotoHome();
    }
});
