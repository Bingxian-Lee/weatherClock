const hour = document.querySelector(".hr");
const minute = document.querySelector(".min");
const second = document.querySelector(".sec");


//digital clock functionality
function clock(){

    const fullDate = new Date();
    var hours = fullDate.getHours();
    var minutes = fullDate.getMinutes();
    var seconds = fullDate.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    // change value of span tag to current hour, minutes and seconds
    document.getElementById('hour').innerHTML = `${hours}:`;
    document.getElementById('minute').innerHTML = `${minutes}:`;
    document.getElementById('second').innerHTML = `${seconds}`;

}

// analog clock functionality
function analog(){
    const fullDate = new Date();
    var hours = fullDate.getHours();
    var minutes = fullDate.getMinutes();
    var seconds = fullDate.getSeconds();

    const hourDeg = (hours/12) * 360 -90;
    const minDeg = (minutes/60) * 360 - 90;
    const secDeg = (seconds/60) * 360 - 90;

    hour.style.transform = `rotate(${hourDeg}deg)`
    minute.style.transform = `rotate(${minDeg}deg)`
    second.style.transform = `rotate(${secDeg}deg)`
}

// updates hours minute seconds every 1 miliseconds
setInterval(clock,100);
setInterval(analog,100);


