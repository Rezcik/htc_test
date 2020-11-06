const scroll = document.querySelector('.scroll');
const scrollThumb = document.querySelector('.scroll-thumb');
const scrollingContent = document.querySelector('.content_tv-wrap');
const tv = document.querySelector('.tv-js');

let coord = 2;
scrollThumb.style.transform = 'translate( 0, 2px)';

let scrollMove = (event) => {
    coord += event;
    if(coord > 192){ coord = 192; return scrollThumb.style.transform = 'translate( 0,' + 192 + 'px)';}
    if(coord < 2){ coord = 2; return scrollThumb.style.transform = 'translate( 0,' + 2 + 'px)';}
    scrollThumb.style.transform += 'translate( 0,' + event + 'px)';
};
let scrollClick = (event) =>{
    scrollThumb.style.transform = 'translate( 0,' + event + 'px)';
};
scrollingContent.addEventListener('wheel', (event)=>{
        let scroll = event.deltaY.toString().replace(/[0-9]/g, '') + 125;
        scrollMove(Number(scroll));

});

scrollThumb.onmousedown = () =>{

    let onMouseMove = (event) => {
        if((coord <= 192 && event.movementY > 0) || (coord >= 2 && event.movementY < 0)){
            scrollMove(event.movementY);
            scrollingContent.scrollTop += event.movementY;
        }
    };
    tv.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function(event) {
        tv.removeEventListener('mousemove', onMouseMove);
        tv.onmouseup = null;
    };
};
scrollThumb.ondragstart = function() {
    return false;
};
scroll.onclick = (event) =>{
    if(event.target === scroll){
        if(event.offsetY > 500){
            scrollClick(event.offsetY - 500);
            scrollingContent.scrollTop = event.offsetY - 500;
        }else{
            scrollClick(event.offsetY);
            scrollingContent.scrollTop = event.offsetY;
        }
    }
};