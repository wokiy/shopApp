(function () {
    var styleNode = document.createElement("style");
    var width = document.documentElement.clientWidth / 16;
    styleNode.innerHTML = "html{font-size:" + width + "px!important}";
    document.head.appendChild(styleNode);
})();
/*
window.onload = function () {
    document.addEventListener("touchstart",function (ev) {
        ev = ev || event;
        ev.preventDefault();
    });
}*/
