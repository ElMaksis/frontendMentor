
const daysCounter = document.querySelectorAll('.js__days-counter'),
    hoursCounter = document.querySelectorAll('.js__hours-counter'),
    minutesCounter = document.querySelectorAll('.js__minutes-counter'),
    secondsCounter = document.querySelectorAll('.js__seconds-counter');

const ivent = 'Nov 25 2023 08:00';
const targetDate = new Date(ivent).getTime();
let currentDaysValue = currentHoursValue = currentMinutesValue = 0;

function counter() {
    const leftTime = targetDate - Date.now();
    const daysLeft = Math.floor(leftTime / 1000 / 60 / 60 / 24);
    const hoursLeft = Math.floor((leftTime / 1000 / 60 / 60) % 24);
    const minutesLeft = Math.floor((leftTime / 1000 / 60) % 60);
    const secondsLeft = Math.floor((leftTime / 1000) % 60);

    if (daysLeft === 0 && hoursLeft === 0 && minutesLeft === 0 && secondsLeft === 0) {
        clearInterval(timerId);
        secondsCounter.forEach(item => item.textContent = '00');
        secondsCounter[0].parentElement.classList.remove('animate__flipInX');
        return false;
    }

    secondsCounter.forEach(item => item.textContent = secondsLeft.toString().padStart(2, 0));

    if (minutesLeft !== currentMinutesValue) {
        minutesCounter[0].parentElement.classList.add('animate__flipInX');
        currentMinutesValue = minutesLeft;
        minutesCounter.forEach(item => item.textContent = minutesLeft.toString().padStart(2, 0));
    } else minutesCounter[0].parentElement.classList.remove('animate__flipInX');

    if (hoursLeft !== currentHoursValue) {
        hoursCounter[0].parentElement.classList.add('animate__flipInX');
        currentHoursValue = hoursLeft;
        hoursCounter.forEach(item => item.textContent = hoursLeft.toString().padStart(2, 0));
    } else hoursCounter[0].parentElement.classList.remove('animate__flipInX');

    if (daysLeft !== currentDaysValue) {
        daysCounter[0].parentElement.classList.add('animate__flipInX');
        currentDaysValue = daysLeft;
        daysCounter.forEach(item => item.textContent = daysLeft.toString().padStart(2, 0));
    } else daysCounter[0].parentElement.classList.remove('animate__flipInX');
}

const timerId = setInterval(counter, 1000);

counter();