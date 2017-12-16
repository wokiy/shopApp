window.onload = function () {
    banner('index_carousel');
    banner('experience_hall');
    cutDownTime();
}
function banner(dom) {
    var banner = document.querySelector('.' + dom + '');
    var w = banner.offsetWidth;
    var imageBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');
    var addTransition = function () {
        imageBox.style.webkitTransition = "all .2s";
        imageBox.style.transition = "all .2s";
    };
    var removeTransition = function () {
        imageBox.style.webkitTransition = "none";
        imageBox.style.transition = "none";
    };
    var setTranslateX = function (translateX) {
        imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
        imageBox.style.transform = "translateX(" + translateX + "px)";
    };
    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * w);

    }, 4000);
    LGP.transitionEnd(imageBox, function () {
        console.log('transitionEnd');
        if (index >= 5) {
            index = 1;
            removeTransition();
            setTranslateX(-index * w);
        } else if (index <= 0) {
            index = 4;
            removeTransition();
            setTranslateX(-index * w);
        }
        setPoint();
    });
    var setPoint = function () {
        for (var i = 0; i < points.length; i++) {
            points[i].className = " ";
        }
        points[index - 1].className = "current";
    }
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        console.log(distanceX);
        var currX = -index * w + distanceX;
        removeTransition();
        setTranslateX(currX);
    });
    imageBox.addEventListener('touchend', function (e) {
        if (isMove && (Math.abs(distanceX) > w / 3)) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            addTransition();
            setTranslateX(-index * w);
        }
        else {
            addTransition();
            setTranslateX(-index * w);
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * w);
        }, 4000);
    });
}
function cutDownTime() {
    var totalHour = 0;
    var totalSec = 1 * 60;
    var liArr = document.querySelectorAll('.Seckill ul li');
    var timeId = setInterval(function () {
        if (totalSec <= 0) {
            clearInterval(timeId);
            alert('结束啦,你买不到了!!');
            return;
        }
        totalSec--;
        var hour = Math.floor(totalSec / 3600);
        var minute = Math.floor(totalSec % 3600 / 60);
        var sec = totalSec % 60;
        liArr[0].innerHTML = Math.floor(hour / 10);
        liArr[1].innerHTML = hour % 10;
        liArr[3].innerHTML = Math.floor(minute / 10);
        liArr[4].innerHTML = minute % 10;
        liArr[6].innerHTML = Math.floor(sec / 10);
        liArr[7].innerHTML = sec % 10;
    }, 1000)
}