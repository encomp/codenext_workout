import 'bootstrap';
import './scss/index.scss';
import './scss/login.scss';
import * as firebase from 'firebase/app';
import { auth } from './services/firebaseService'
import { ExerciseCardComponent } from './components/exercise_card/exerciseCard.component';
import { TodayCardComponent } from './components/today_card/todayCard.component';

// Make the page visible only when the user is logged in.
firebase.auth().onAuthStateChanged(function (newuser) {
    if (newuser) {
        ExerciseCardComponent.init('#cardExercise', newuser);
        TodayCardComponent.init('#cardTodayProgress', newuser.email);
    }
});
