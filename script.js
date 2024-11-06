let bg = document.getElementById("background");
let timer_phase = document.getElementById("timer-phase");
let timer_count = document.getElementById("timer-count");
let timer_next_phase = document.getElementById("timer-next-phase");
let settings = document.getElementById("settings");
let circle = document.getElementById("inside-circle");
let current_round = document.getElementById("current-round");
let total_rounds = document.getElementById("total-rounds");
let pause_play_button = document.getElementById("pause-play-button");

let timer_visible = true, first_time = false;
let active_length = 60, rest_length = 30, warmup_length = 60, cooldown_length = 60;
let phase_duration, phase, countdown = setInterval(count_down_seconds, 1000), timer_is_paused = true;

window.onload = reset_timer();

function reset_timer () {
    timer_is_paused = true;
    phase = "WARMUP";
    timer_next_phase.textContent = "NEXT UP: ACTIVE";
    timer_count.textContent = phase_duration = warmup_length;
    timer_phase.textContent = phase;
    phase_duration = warmup_length;
    current_round.textContent = 1;
    circle.style.stroke = "white";
    circle.style.strokeDashoffset = 2890;
};

function change_phase () {
    switch (phase) {
        case "WARMUP":
            phase = "ACTIVE";
            timer_next_phase.textContent = "NEXT UP: REST";
            timer_count.textContent = phase_duration = rest_length;
            timer_phase.textContent = phase;
            if (current_round.textContent == total_rounds.textContent)
                timer_next_phase.textContent = "NEXT UP: COOLDOWN";
            break;
        case "ACTIVE":
            phase = "REST";
            timer_next_phase.textContent = "NEXT UP: ACTIVE";
            timer_count.textContent = phase_duration = rest_length;
            timer_phase.textContent = phase;
            if (current_round.textContent == total_rounds.textContent) {
                phase = "COOLDOWN";
                timer_next_phase.textContent = "ALMOST DONE!";
                timer_count.textContent = phase_duration = cooldown_length;
                timer_phase.textContent = phase;
            }
            break;
        case "REST":
            current_round.textContent++;
            phase = "ACTIVE";
            timer_next_phase.textContent = "NEXT UP: REST";
            timer_count.textContent = phase_duration = active_length;
            timer_phase.textContent = phase;
            if (current_round.textContent == total_rounds.textContent)
                timer_next_phase.textContent = "NEXT UP: COOLDOWN";
            break;
        case "COOLDOWN":
            reset_timer();
        default: break;
    };
};

function count_down_seconds () {
    if (timer_is_paused) {
        bg.style.backgroundColor = "var(--PAUSED)";
        return;
    } else bg.style.backgroundColor = `var(--${phase})`;

    timer_count.textContent--;

    circle.style.strokeDashoffset = (2890 * (timer_count.textContent / phase_duration));
    if (timer_count.textContent == phase_duration) circle.style.stroke = "var(--background-color)";

    if (timer_count.textContent == 0) {
        change_phase();
    }
};

function pause_play_timer () {
    timer_is_paused = !timer_is_paused;
}

function show_settings () {
    timer_is_paused = true;
    timer_visible = !timer_visible;
    if (!timer_visible) {
        settings.style.display = "grid";
        timer.style.display = "none";
    } else {
        timer.style.display = "grid";
        settings.style.display = "none";
    }
};

function edit_timer (class_name, input_value) {
    class_name = class_name.split(" ")[0];
    let elements = document.querySelectorAll("." + class_name);

    for (let element of elements) element.value = input_value;
    
    switch (class_name) {
        case "active-period":
            active_length = input_value;
            break;
        case "rest-period":
            rest_length = input_value;
            break;
        case "rounds-settings":
            total_rounds.textContent = input_value;
            break;
        case "warmup-period":
            warmup_length = input_value;
            break;
        case "cooldown-period":
            cooldown_length = input_value;
            break;
        default: break;
    };
    switch (phase) {
        case "WARMUP":
            timer_count.textContent = phase_duration = warmup_length;
            break;
        case "ACTIVE":
            timer_count.textContent = phase_duration = active_length;
            break;
        case "REST":
            timer_count.textContent = phase_duration = rest_length;
        case "COOLDOWN":
            timer_count.textContent = phase_duration = cooldown_length;
        default: break;
    };
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }, function(error) {
            console.log('Service Worker registration failed:', error);
        });
    });
}
