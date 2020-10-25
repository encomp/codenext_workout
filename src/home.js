import 'bootstrap';
import './scss/index.scss';
import './scss/login.scss';
import { auth } from './services/firebaseService'
import {ExerciseCardComponent} from './components/exercise_card/exerciseCard.component';

ExerciseCardComponent.init();