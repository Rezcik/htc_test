'use strict';

var scroll = document.querySelector('.scroll');
var scrollThumb = document.querySelector('.scroll-thumb');
var scrollingContent = document.querySelector('.content_tv-wrap');
var tv = document.querySelector('.tv-js');

var coord = 2;
scrollThumb.style.transform = 'translate( 0, 2px)';

var scrollMove = function scrollMove(event) {
    coord += event;
    if (coord > 192) {
        coord = 192;
        return scrollThumb.style.transform = 'translate( 0,' + 192 + 'px)';
    }
    if (coord < 2) {
        coord = 2;
        return scrollThumb.style.transform = 'translate( 0,' + 2 + 'px)';
    }
    scrollThumb.style.transform += 'translate( 0,' + event + 'px)';
};
var scrollClick = function scrollClick(event) {
    scrollThumb.style.transform += 'translate( 0,' + event + 'px)';
};
scrollingContent.addEventListener('wheel', function (event) {
    scrollMove(event.deltaY);
});


scrollThumb.onmousedown = function () {

    var prevY = 0;
    var moveVector;

    function mousemove(e) {
        if(e.clientY - prevY > 0){
            moveVector = 1.5;
        }else{
            moveVector = -1.5;
        }

        var movementY = moveVector;
        prevY = e.clientY;
        return movementY;
    }
    var onMouseMove = function onMouseMove(event) {
        var moveY = mousemove(event);
        if (coord <= 192 && moveY > 0 || coord >= 2 && moveY < 0) {
            scrollMove(moveY);
            scrollingContent.scrollTop += moveY;
        }
    };
    tv.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function (event) {
        tv.removeEventListener('mousemove', onMouseMove);
        tv.onmouseup = null;
    };
};
scrollThumb.ondragstart = function () {
    return false;
};
scroll.onclick = function (event) {
    if (event.target === scroll) {
        if (event.offsetY > 500) {
            scrollClick(event.offsetY - 500);
            scrollingContent.scrollTop = event.offsetY - 500;
        } else {
            scrollClick(event.offsetY);
            scrollingContent.scrollTop = event.offsetY;
        }
    }
};