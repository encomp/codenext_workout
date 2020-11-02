import 'bootstrap';
import './scss/index.scss';
import { gotoLogin } from './util/redirect';

const enterBtn = document.getElementById('enterBtn');
enterBtn.addEventListener('click', event => {
    gotoLogin();
});