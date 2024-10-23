let timer = document.getElementById("timer");
let seconds = timer.textContent;

const countdown = setInterval(countdownClock, 1000);

function countdownClock() {
    seconds--;
    timer.textContent = seconds;

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