import 'bootstrap';
import './scss/index.scss';
import './scss/login.scss';
import { auth } from './services/firebaseService'
import {LoginButtonsComponent} from './components/login_buttons/loginButtons.component';

LoginButtonsComponent.init();
