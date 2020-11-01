import 'bootstrap';
import './scss/index.scss';
import './scss/login.scss';
import * as firebase from 'firebase/app';
import { auth } from './services/firebaseService'
import { ExerciseCardComponent } from './components/exercise_card/exerciseCard.component';
import { TodayCardComponent } from './components/today_card/todayCard.component';
import { getDate } from './util/date';
import { gotoIndex } from './util/redirect'

// Make the page visible only when the user is logged in.
firebase.auth().onAuthStateChanged(function (newuser) {
    if (newuser) {
        const logOutBtn = document.getElementById('btnLogOut');
        logOutBtn.addEventListener('click', event => {
            firebase.auth().signOut().then(function () {
                gotoIndex();
            }).catch(function (error) {
                console.error("Unable to logout.", error);
            });
        });

        const forDate = getDate();
        const todayCardId = '#cardTodayProgress';
        ExerciseCardComponent.init('#cardExercise', newuser.email, todayCardId, forDate);
        TodayCardComponent.init(todayCardId, newuser.email, forDate);

    } else {
        gotoIndex();
    }
});