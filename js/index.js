let domElem = document.querySelectorAll('.tab_film-js, .tab_tv-js, ' +
                                                 '.section-content_tv, .section-content_film,' +
                                                 '.btn-login,' +
                                                 '.modal-wrap, .modal-input, .check-modal, .modal-btn');
    buttonLogin = domElem[0];
    tabFilm = domElem[1];
    tabTV = domElem[2];
    contentFilm = domElem[3];
    contentGenre = domElem[4];
    contentTV = domElem[5];
    modalWrap = domElem[6];
    inLogin = domElem[7];
    inPassword = domElem[8];
    checkBox = domElem[9];
    modalBtn = domElem[10];

    user = {
        name: "Константин К.",
        remember: false,
        login: "admin",
        password: "admin"
};

addEventListener('click', (event) =>{
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
addEventListener('DOMContentLoaded',(event) => {
    for(let key in localStorage){
        if(key === user.login){
            user.name = localStorage.getItem(user.login)
            authorisation();
        }
    }
});

modalBtn.addEventListener('click', (event) => {
    if(inLogin.value === user.login && inPassword.value === user.password) {
        if (checkBox.checked) {
            localStorage.setItem(user.login, user.name);
        }
        authorisation();
    }else
        validationLogin(inLogin.value);
});

function validationName(name){
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
}
function validationLogin(login){

    if(/^[a-zA-Z1-9]+$/.test(login) === false)
    {
        alert('В логине должны быть только латинские буквы');
        return false;
    }
    if(login.length < 4 || login.length > 20)
    {
        alert('В логине должено быть от 4 до 20 символов');
        return false;
    }
    if(parseInt(login.substr(0, 1)))
    {
        alert('Логин должен начинаться с буквы');
        return false;
    }

    return true;
}
let authorisation = () =>{
    let insertTo = document.querySelector('.btn-wrap');
    let inputName = document.createElement('input');
    let buttonExit = document.createElement('button');

    buttonLogin.classList.toggle('deactive');

    buttonExit.innerHTML = 'Выйти';
    buttonExit.classList.add('btn-exit');

    inputName.value = user.name;
    inputName.setAttribute('onfocus', 'this.select()');
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
    });
};