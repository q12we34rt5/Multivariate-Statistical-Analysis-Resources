var digitalClockDiv = null;
var total_time = 0;
var colon = true;
var timeoutID = null;
function setClockDiv(divName) {
    digitalClockDiv = document.querySelector(divName);
    if (digitalClockDiv != null)
        init();
}
function update() {
    var min = Math.floor((total_time + 0.1) / 60);
    var sec = Math.floor(total_time % 60);
    digitalClockDiv.innerHTML = ('' + (100 + min)).substring(1)
        + (colon ? '-' : ' ')
        + ('' + (100 + sec)).substring(1);
    colon ^= 1;
}
function init() {
    total_time = 1200;
    colon = true;
    update();
    clearInterval(timeoutID);
    timeoutID = null;
}
function start() {
    if (timeoutID != null) return;
    timeoutID = window.setInterval(() => {
        total_time--;
        update();
    }, 1000);
}
function pause() {
    clearInterval(timeoutID);
    timeoutID = null;
}

function dragElement(elmnt) {
    // Make the DIV element draggable:
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}