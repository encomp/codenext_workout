export function gotoHome() {
    redirectToPage("home.html");
}

export function gotoIndex() {
    redirectToPage("index.html");
}

export function gotoLogin() {
    redirectToPage("login.html");
}

export function redirectToPage(page) {
    let url = window.location.href;
    let urlSplit = url.split('/');
    let newUrl = url.split(urlSplit[urlSplit.length - 1]);
    newUrl = newUrl[0] + page;
    window.location.replace(newUrl);
}
