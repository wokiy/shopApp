window.onload = function () {
    banner('index_carousel');
    banner('experience_hall');
    cutDownTime();
}
function banner(dom) {
    /*
     * 1.自动的滚动起来    （定时器，过渡）
     * 2.点随之滚动起来     （改变当前点元素的样式）
     * 3.图片滑动           （touch事件）
     * 4.当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）
     * 5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）
     * */
    /*获取到dom对象*/
    /*banner*/
    var banner = document.querySelector('.' + dom + '');
    /*屏幕的宽度*/
    var w = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.querySelector('ul:first-child');
    /*querySelector只支持有效的css选择器*/
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');
    /*添加过渡*/
    var addTransition = function () {
        imageBox.style.webkitTransition = "all .2s";
        /*兼容*/
        imageBox.style.transition = "all .2s";
    };
    /*删除过渡*/
    var removeTransition = function () {
        imageBox.style.webkitTransition = "none";
        /*兼容*/
        imageBox.style.transition = "none";
    };
    /*改变位子*/
    var setTranslateX = function (translateX) {
        imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
        imageBox.style.transform = "translateX(" + translateX + "px)";
    };
    /*1.自动的滚动起来（定时器，过渡）*/
    var index = 1;
    var timer = setInterval(function () {
        /*箱子滚动*/
        index++;
        /*定位  过渡来做定位的  这样才有动画*/
        /*加过渡*/
        addTransition();
        /*改变位子*/
        setTranslateX(-index * w);

    }, 4000);

    /*绑定一个过渡结束事件*/
    LGP.transitionEnd(imageBox, function () {
        console.log('transitionEnd');
        if (index >= 5) {
            index = 1;
            /*做定位*/
            /*加过渡*/
            removeTransition();
            /*改变位子*/
            setTranslateX(-index * w);
        } else if (index <= 0) {
            index = 4;
            /*加过渡*/
            removeTransition();
            /*改变位子*/
            setTranslateX(-index * w);
        }
        /*index 1-8  索引范围*/
        /*point 0-7 */
        setPoint();
    });

    /*2.点随之滚动起来     （改变当前点元素的样式）*/
    var setPoint = function () {
        /*把所有点的样式清除*/
        for (var i = 0; i < points.length; i++) {
            points[i].className = " ";
            /* points[i].classList.remove('now');*/
        }
        points[index - 1].className = "current";
    }

    /*3.图片滑动 touch事件）*/
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    imageBox.addEventListener('touchstart', function (e) {
        /*清除定时器*/
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        /*distanceX  值  正负*/

        /*算出当前图片盒子需要定位的位子*/
        console.log(distanceX);

        /*将要去做定位*/
        var currX = -index * w + distanceX;
        /*删除过渡*/
        removeTransition();
        /*改变位子*/
        setTranslateX(currX);
    });
    imageBox.addEventListener('touchend', function (e) {

        /*当超过了一定的距离的时候 */
        if (isMove && (Math.abs(distanceX) > w / 3)) {
            /*5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）*/
            if (distanceX > 0) {
                index--;
                /*向右滑  上一张*/
            } else {
                index++;
                /*向左滑 下一张*/
            }
            addTransition();
            setTranslateX(-index * w);
        }
        /*当不超过一定的滑动距离的时候*/
        else {
            /*4.当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）*/
            addTransition();
            setTranslateX(-index * w);
        }

        /*重置*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*添加定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            /*箱子滚动*/
            index++;
            /*定位  过渡来做定位的  这样才有动画*/
            /*加过渡*/
            addTransition();
            /*改变位子*/
            setTranslateX(-index * w);
        }, 4000);
    });
}
// 倒计时方法
/*
	定义一个 倒计时的 总时间
	获取 想要修改的 li标签
	开启定时器
		判断 是否时间没有了
		递减时间
		修改 对应标签的显示
*/
function cutDownTime() {
    // 定义 总时间 写时间时 建议 这样写
    var totalHour = 3;
    // 转化为秒
    var totalSec = 3 * 60 * 60;
    // 加多一秒 让用户看到的时候 是从整数 开始
    // totalSec++;
    // var totalSec = 5;
    // 获取 想要修改的所有li标签
    // querySelectorAll  querySelector 这两个方法 可以传入 css,css3 中的选择器
    // 如果想要自己封装一个 类似于jq的东西 可以再内部 调用 这两个方法
    var liArr = document.querySelectorAll('.Seckill ul li');
    // console.log(liArr);
    // 开启 定时器
    // 有了 定时器id 以后 就能够 干掉该id 对应的 定时器
    var timeId = setInterval(function () {
        // 0 判断 是否 小于0了
        if (totalSec <= 0) {
            // 干掉 定时器
            clearInterval(timeId);
            console.log('结束啦,你买不到了!!');
            return;
        }
        // 1递减
        totalSec--;
        // 当前的秒 对应到 多少小时 多少分 多少秒
        /*
            3671
            1小时
            1分
            11秒
            / 除法
            % 取余
        */
        var hour = Math.floor(totalSec / 3600);
        var minute = Math.floor(totalSec % 3600 / 60);
        var sec = totalSec % 60;
        // 2修改dom元素显示
        // 小时
        liArr[0].innerHTML = Math.floor(hour / 10);  // 十位 41 / 10  =4.1 所以要取整数
        liArr[1].innerHTML = hour % 10; // 个位
        // 分
        liArr[3].innerHTML = Math.floor(minute / 10);// 是为 55/10 = 5.5 取整
        liArr[4].innerHTML = minute % 10;
        // 秒
        liArr[6].innerHTML = Math.floor(sec / 10);
        liArr[7].innerHTML = sec % 10;
    }, 1000)
}