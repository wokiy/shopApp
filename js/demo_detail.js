var tap1 = document.querySelector(".tap_1")
var tap3 = document.querySelector(".tap_3")

var id1 = document.getElementById("1")
var id3 = document.getElementById("3")
console.log(tap3)
tap1.addEventListener('touchstart', function (ev) {
    var ev = ev || event;
    ev.preventDefault()
    id3.style.display = "none";
    id1.style.display = "block";
})
tap3.addEventListener('touchstart', function (ev) {
    var ev = ev || event;
    ev.preventDefault();
    id1.style.display = "none";
    id3.style.display = "block";
})
