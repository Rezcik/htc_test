const buttonLogin = document.querySelector('.header-btn-js');
const tabFilm = document.querySelector('.tab_film-js');
const tabTV = document.querySelector('.tab_tv-js');
const contentFilm = document.querySelector('.film-js');
const contentGenre = document.querySelector('.genre-js');
const contentTV = document.querySelector('.tv-js');
const modalWrap = document.querySelector('.modal-wrap');
const modal = document.querySelector('.modal-form-js');
const inLogin = document.querySelector('.login-js');
const inPassword = document.querySelector('.password-js');
const checkBox = document.querySelector('.check-modal');
const modalBtn = document.querySelector('.modal-btn-js');
const nav = document.querySelector('.nav-wrap');

let user = {
        name: "Константин К.",
        remember: false,
        login: "admin",
        password: "admin"
};

let validationName = (name) =>{
    let tempName = name.value;
    if(/[а-яё]{1,20}/.test(tempName)){
        user.name = tempName
            .toLowerCase()
            .split(/\s+/)
            .map(word => word[0].toUpperCase() + word.substring(1))
            .join(' ')
            .replace(/(.+) (.).+/, '$1 $2.')
            .replace(/(.+) (.).+ (.).+/, '$1 $2. $3.');
        return true;
    }
    if(/[0-9]/.test(tempName)){
        return false;
    }
};
let validationLogin = (login, password) =>{
    if(login === user.login && password === user.password) {
        if (checkBox.checked) {
            localStorage.setItem(user.login, user.name);
        }
        authorisation();
    }
    if(login === "" || password === "")
    {
        return error('Поля логин и пароль обязательны к заполнению');
    }
    if(!/^[a-zA-Z1-9]+$/.test(login))
    {
        return error('В логине должны быть только латинские буквы ');
    }
    if(login.length < 4 || login.length > 20)
    {
        return error('В логине должено быть от 4 до 20 символов');
    }
    if(parseInt(login.substr(0, 1)))
    {
        return error('Логин должен начинаться с буквы');
    }
    if(login !== user.login || password !== user.password)
    {
        return error('Проверьте правильность введенных данных');
    }

};
let authorisation = () =>{
    const insertTo = document.querySelector('.btn-wrap');
    const inputName = document.createElement('input');
    const buttonExit = document.createElement('button');

    buttonLogin.classList.toggle('deactive');

    buttonExit.innerHTML = 'Выйти';
    buttonExit.classList.add('btn-exit');

    inputName.value = user.name;
    inputName.setAttribute('onfocus', 'this.select()');
    inputName.setAttribute('maxlength', '14');
    inputName.classList.add('input_user');

    insertTo.append(inputName);
    insertTo.append(buttonExit);
    insertTo.classList.toggle('btn-wra_active');

    modalWrap.classList.add('modal-wrap_deactive');

    inputName.addEventListener('blur',(event)=>{
        if(user.name === inputName.value){
            return 1;
        }
        if(validationName(inputName)){
            inputName.value = user.name;
            localStorage.removeItem(user.login);
            localStorage.setItem(user.login, user.name);
        }else{
            inputName.value = user.name;
        }
    });
    buttonExit.addEventListener('click', (event) => {
        inputName.remove();
        buttonExit.remove();
        localStorage.removeItem(user.login);
        buttonLogin.classList.toggle('deactive');
        insertTo.classList.remove('btn-wra_active');
    });
};
let error = (str) =>{
    const message = document.createElement('div');
    message.classList.add('error');
    message.textContent = str;
    if(modalWrap.children.length === 1){
        modalWrap.append(message);
        setTimeout(() => message.classList.add('error-click'), 0);
        setTimeout(() => message.classList.remove('error-click'), 2500);
        setTimeout(() => message.remove(), 2600);
    }
};

nav.addEventListener('click', (event) =>{
    let target = event.target;
    if(!target.classList.contains('nav-btn_active') && target.classList.contains('nav-btn') ){
        tabTV.classList.toggle('nav-btn_active');
        tabFilm.classList.toggle('nav-btn_active');

        contentFilm.classList.toggle('section-content_deactive');
        contentGenre.classList.toggle('section-content_deactive');
        contentTV.classList.toggle('section-content_deactive');
    }
});
buttonLogin.addEventListener('click', (event) => {
    modalWrap.classList.toggle('modal-wrap_deactive');

});
modalWrap.addEventListener('click',(event)=>{
    if(event.target === modalWrap){
        modalWrap.classList.toggle('modal-wrap_deactive');
    }
});

document.addEventListener('keyup',(event)=>{
    if (event.key === 'Esc' && modalWrap.classList.contains('modal-wrap_deactive') === false ) {
        modalWrap.classList.add('modal-wrap_deactive');
        (function del() {
            document.removeEventListener("keyup",del);
        }());
    }});
modalBtn.addEventListener('click', (event) => {
    validationLogin(inLogin.value,inPassword.value);
});

(function() {
    for(let key in localStorage){
        if(key === user.login){
            user.name = localStorage.getItem(user.login);
            authorisation();
        }
    }
}());