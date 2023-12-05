import { icons } from './icons.js';

const tileField = document.querySelector('.game-field');
const tiles = document.querySelectorAll('.tile');
const startGame = document.querySelector('.setting__start');
const footer = document.querySelector('.footer__inner');


let timer = '1.53';
let movesCounter = 39;

const playerScores = {
    '1': 0,
    '2': 5,
    '3': 8,
    '4': 11
}

const settings = {
    theme: 'numbers',
    players: 4,
    grid: '6x6'
}

startGame.addEventListener('click', saveSetting);

tileField.addEventListener('click', openTile);

function saveSetting() {
    const choice = document.querySelectorAll('.setting__radio:checked');

    settings.theme = choice[0].value;
    settings.players = Number(choice[1].value);
    settings.grid = choice[2].value;

    document.querySelector('.setting').classList.add('hide');
    renderField();
}

function openTile(e) {
    if (!e.target.classList.contains('tile')) {
        return false;
    }

    if (e.target.classList.contains('open')) {
        e.target.classList.remove('open');
        e.target.classList.add('close');
    } else {
        e.target.classList.remove('close')
        e.target.classList.add('open');
    }
}

function renderField() {
    let tileAmount;

    if (settings.grid === '6x6') {
        tileField.classList.remove('game-field--16');
        tileField.classList.add('game-field--36');
        tileAmount = 36;
    }
    else {
        tileField.classList.remove('game-field--36');
        tileField.classList.add('game-field--16');
        tileAmount = 16;
    }

    for (let i = tileAmount; i > 0; i--) {
        const tileElem = document.createElement('div');
        tileElem.classList.add('tile', 'center');

        if (settings.theme === 'numbers') {
            tileElem.textContent = i;
        }
        if (settings.theme === 'icons') {
            const randomInt = Math.floor(Math.random() * icons.length);

            tileElem.innerHTML = icons[randomInt];
        }

        tileField.appendChild(tileElem);
    }

    // формирование нижнего поля с количеством игроков

    const players = settings.players;

    if (players === 1) {
        const countTimer = document.createElement('div');
        countTimer.classList.add('count-field');

        const titleTimer = document.createElement('p');
        titleTimer.textContent = 'Time';
        titleTimer.classList.add('count-field__title');

        const timerEl = document.createElement('div');
        timerEl.textContent = timer;
        timerEl.classList.add('count-field__counter', 'js-timer');

        countTimer.append(titleTimer, timerEl);

        const countMoves = document.createElement('div');
        countMoves.classList.add('count-field');

        const titleMoves = document.createElement('p');
        titleMoves.textContent = 'Moves';
        titleMoves.classList.add('count-field__title');

        const movesEl = document.createElement('div');
        movesEl.textContent = movesCounter;
        movesEl.classList.add('count-field__counter', 'js-moves');

        countMoves.append(titleMoves, movesEl);

        footer.append(countTimer, countMoves);
    } else {
        for (let i = 1; i <= players; i++) {
            const playerItem = document.createElement('div');
            playerItem.classList.add('count-field');

            const playerTitle = document.createElement('p');
            playerTitle.textContent = `Player ${i}`;
            playerTitle.classList.add('count-field__title');

            const scoreEl = document.createElement('div');
            scoreEl.textContent = playerScores[i];
            scoreEl.classList.add('count-field__counter', 'js-counter');

            playerItem.append(playerTitle, scoreEl);

            if (i === 1) playerItem.classList.add('count-field--current');

            footer.append(playerItem);
        }
    }

}

// renderField()