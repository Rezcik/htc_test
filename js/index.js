let domElem = document.querySelectorAll('.modal-btn_mobile-js, .modal-wrap_mobile-js, .modal-form_mobile-js, .modal-wrap-js, .btn_text_mobile-js, .authorisation-js');
    modalMobileBtn = domElem[0];
    modalMobileText = domElem[1];
    modalMobileWrap = domElem[2];
    modalMobilePanel = domElem[3];
    modalMobileAuthorisation = domElem[4];
    modalWrap = domElem[5];
    modalAuthorisation = domElem[6];

    headerModalBtn = document.querySelector('.login-modal-btn-js');
    tabElems = document.querySelectorAll('.nav-btn');
    tabTV = tabElems[0];
    tabFilm = tabElems[1];
    contents = document.querySelectorAll('.section-content_film, .section-content_tv');
    contentFilm = contents[0];
    contentGenre = contents[1];
    contentTV = contents[2];

    user = {
        name: "Константин К.",
        remember: false,
        login: "admin",
        password: "admin"
    };

modalMobileBtn.addEventListener('click', (event) =>{
    modalMobileBtn.classList.add('modal-btn_mobile_active');
    modalMobilePanel.classList.add('modal-form_mobile_active');
    modalMobileWrap.classList.add('modal-wrap_mobile_active');
    modalMobileBtn.classList.remove('show-panel_scroll');
    modalMobileText.style.display = 'none';
    if(event.target === modalMobileWrap){
        modalMobileBtn.classList.remove('modal-btn_mobile_active');
        modalMobilePanel.classList.remove('modal-form_mobile_active');
        modalMobileWrap.classList.remove('modal-wrap_mobile_active');
        modalMobileText.style.display = 'block';
        if(pageYOffset > 0)
            modalMobileBtn.classList.add('show-panel_scroll');
    }
});

addEventListener('scroll', (event) =>{
    if(pageYOffset > 0 && !modalMobileBtn.classList.contains('modal-btn_mobile_active'))
        modalMobileBtn.classList.add('show-panel_scroll');
    else
        modalMobileBtn.classList.remove('show-panel_scroll');
});
addEventListener('click', (event) =>{
    let target = event.target;
    if(!target.classList.contains('nav-btn_active') && target.classList.contains('nav-btn')){
        tabTV.classList.toggle('nav-btn_active');
        tabFilm.classList.toggle('nav-btn_active');

        contentFilm.classList.toggle('section-content_deactive');
        contentGenre.classList.toggle('section-content_deactive');
        contentTV.classList.toggle('section-content_deactive');
    }
} );

headerModalBtn.addEventListener('click', (event) => {
    modalWrap.classList.toggle('modal-wrap_deactive');
});
modalWrap.addEventListener('click', (event) => {
    if(event.target === modalWrap)
        modalWrap.classList.toggle('modal-wrap_deactive');
});

let authorisation = () =>{
    if(localStorage.getItem(user.login) !== null){
        window.location.reload();
    }
    let userInLogin = document.querySelector('.input_login-js').value;
    let userInPassword = document.querySelector('.input_password-js').value;
    let userRemember = document.querySelector('#checkbox-id').checked;
    if(userInLogin === user.login && userInPassword === user.password){
        if(userRemember) {
            localStorage.setItem(userInLogin, user.name);
        }
        window.location.reload();
    }
};
modalAuthorisation.addEventListener('click',(event) => {
    authorisation();
});



