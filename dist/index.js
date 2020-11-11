'use strict';

var buttonLogin = document.querySelector('.header-btn-js');
var tabFilm = document.querySelector('.tab_film-js');
var tabTV = document.querySelector('.tab_tv-js');
var contentFilm = document.querySelector('.film-js');
var contentGenre = document.querySelector('.genre-js');
var contentTV = document.querySelector('.tv-js');
var modalWrap = document.querySelector('.modal-wrap');
var modal = document.querySelector('.modal-form-js');
var inLogin = document.querySelector('.login-js');
var inPassword = document.querySelector('.password-js');
var checkBox = document.querySelector('.check-modal');
var modalBtn = document.querySelector('.modal-btn-js');
var nav = document.querySelector('.nav-wrap');

var user = {
    name: "Константин К.",
    remember: false,
    login: "admin",
    password: "admin"
};

nav.addEventListener('click', function (event) {
    var target = event.target;
    if (!target.classList.contains('nav-btn_active') && target.classList.contains('nav-btn')) {
        tabTV.classList.toggle('nav-btn_active');
        tabFilm.classList.toggle('nav-btn_active');

        contentFilm.classList.toggle('section-content_deactive');
        contentGenre.classList.toggle('section-content_deactive');
        contentTV.classList.toggle('section-content_deactive');
    }
});
buttonLogin.addEventListener('click', function (event) {
    modalWrap.classList.toggle('modal-wrap_deactive');
});
modalWrap.addEventListener('click', function (event) {
    if (event.target === modalWrap) {
        modalWrap.classList.toggle('modal-wrap_deactive');
    }
});
document.addEventListener('keyup',function(event){
    if (event.key === 'Esc' && modalWrap.classList.contains('modal-wrap_deactive') === false ) {
        modalWrap.classList.add('modal-wrap_deactive');
        (function del() {
            document.removeEventListener("keyup",del);
        }());
    }});
modalBtn.addEventListener('click', function (event) {
    validationLogin(inLogin.value, inPassword.value);
});
addEventListener('DOMContentLoaded', function (event) {
    for (var key in localStorage) {
        if (key === user.login) {
            user.name = localStorage.getItem(user.login);
            authorisation();
        }
    }
});

var validationName = function validationName(name) {
    var tempName = name.value;
    if (/[а-яё]{1,20}/.test(tempName)) {
        user.name = tempName.toLowerCase().split(/\s+/).map(function (word) {
            return word[0].toUpperCase() + word.substring(1);
        }).join(' ').replace(/(.+) (.).+/, '$1 $2.').replace(/(.+) (.).+ (.).+/, '$1 $2. $3.');
        return true;
    }
    if (/[0-9]/.test(tempName)) {
        return false;
    }
};
var validationLogin = function validationLogin(login, password) {
    if (login === user.login && password === user.password) {
        if (checkBox.checked) {
            localStorage.setItem(user.login, user.name);
        }
        authorisation();
    }
    if (login === "" || password === "") {
        return error('Поля логин и пароль обязательны к заполнению');
    }
    if (!/^[a-zA-Z1-9]+$/.test(login)) {
        return error('В логине должны быть только латинские буквы ');
    }
    if (login.length < 4 || login.length > 20) {
        return error('В логине должено быть от 4 до 20 символов');
    }
    if (parseInt(login.substr(0, 1))) {
        return error('Логин должен начинаться с буквы');
    }
    if (login !== user.login || password !== user.password) {
        return error('Проверьте правильность введенных данных');
    }
};
var authorisation = function authorisation() {
    var insertTo = document.querySelector('.btn-wrap');
    var inputName = document.createElement('input');
    var buttonExit = document.createElement('button');

    buttonLogin.classList.toggle('deactive');

    buttonExit.innerHTML = 'Выйти';
    buttonExit.classList.add('btn-exit');

    inputName.value = user.name;
    inputName.setAttribute('onfocus', 'this.select()');
    inputName.setAttribute('maxlength', '14');
    inputName.classList.add('input_user');

    insertTo.appendChild(inputName);
    insertTo.appendChild(buttonExit);
    insertTo.classList.toggle('btn-wra_active');

    modalWrap.classList.add('modal-wrap_deactive');

    inputName.addEventListener('blur', function (event) {
        if (user.name === inputName.value) {
            return 1;
        }
        if (validationName(inputName)) {
            inputName.value = user.name;
            localStorage.removeItem(user.login);
            localStorage.setItem(user.login, user.name);
        } else {
            inputName.value = user.name;
        }
    });
    buttonExit.addEventListener('click', function (event) {
        insertTo.removeChild(inputName);
        insertTo.removeChild(buttonExit);
        localStorage.removeItem(user.login);
        buttonLogin.classList.toggle('deactive');
        insertTo.classList.remove('btn-wra_active');
    });
};
var error = function error(str) {
    var message = document.createElement('div');
    message.classList.add('error');
    message.textContent = str;
    if (modalWrap.children.length === 1) {
        modalWrap.appendChild(message);
        setTimeout(function () {
            return message.classList.add('error-click');
        }, 0);
        setTimeout(function () {
            return message.classList.remove('error-click');
        }, 2500);
        setTimeout(function () {
            return modalWrap.removeChild(message);
        }, 2600);
    }
};
(function() {
    for(let key in localStorage){
        if(key === user.login){
            user.name = localStorage.getItem(user.login);
            authorisation();
        }
    }
}());