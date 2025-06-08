const $$ = el => document.getElementById(el);

$$('logout').addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});