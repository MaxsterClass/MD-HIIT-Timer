let timer = document.getElementById("timer");
let seconds = timer.textContent;

const countdown = setInterval(countdownClock, 1000);

let circle_progress = document.getElementById("progress-circle");



function countdownClock() {
    seconds--;
    timer.textContent = seconds;
    circle_progress.style.strokeDashoffset = (2513 - (2513 * (seconds / 60)) / 100);

    if (seconds == 0) {
        clearInterval(countdown);
        console.log("timer is at 0");
    }
};

function pause(){

};

function resume() {

};

// window.onload = function(){
    
// };



// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/sw.js').then(function(registration) {
//             console.log('Service Worker registered with scope:', registration.scope);
//         }, function(error) {
//             console.log('Service Worker registration failed:', error);
//         });
//     });
// }