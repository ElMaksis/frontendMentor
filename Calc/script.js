const themeSwitcher = document.querySelector('.calc__theme-box'),
    themeInputs = document.querySelectorAll('.calc__theme-item'),
    themeStyle = document.querySelector('.theme-style'),
    display = document.querySelector('.calc__screenboard'),
    keyboard = document.querySelector('.calc__keyboard');

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'],
    actions = ['+', '-', '/', 'X'];

let firstNum = '', secondNum = '', action = '', result = '';

themeSwitcher.addEventListener('change', changeThemes);
keyboard.addEventListener('click', handler);

function changeThemes() {
    themeInputs.forEach(item => {
        if (item.checked) {
            switch (item.value) {
                case 'light':
                    themeStyle.setAttribute('href', 'style/light-theme.css');
                    break;
                case 'contrast':
                    themeStyle.setAttribute('href', 'style/contrast-theme.css');
                    break;
                default:
                    themeStyle.setAttribute('href', 'style/dark-theme.css');
            }
        }
    });
}

function handler(e) {
    if (!e.target.classList.contains('calc__btn')) {
        return
    }

    const key = e.target.textContent;

    if (!action && numbers.includes(key)) {
        if (firstNum == 0 && key == 0) return false;

        firstNum += key;
        display.textContent = firstNum;
    }

    if (!action && actions.includes(key)) {
        action = key;
        display.textContent += action;
    }

    if (action && numbers.includes(key)) {
        secondNum += key;
        display.textContent += key;
    }

    switch (key) {
        case 'DEL':
            clearScreen(1);
            break;
        case 'RESET':
            clearScreen();
            break;
        case '=':
            calculate();
            break;
    }
}

function clearScreen(amount) {
    if (amount === 1) {
        if (result) {
            result = result.toString().slice(0, result.length - 1);
        } else if (secondNum) {
            secondNum = secondNum.toString().slice(0, secondNum.length - 1);
        } else if (action) {
            action = '';
            secondNum = '';
        } else if (firstNum) {
            firstNum = firstNum.toString().slice(0, firstNum.length - 1);
        }

        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
        if (display.textContent.length == 0) display.textContent = '0';
    } else {
        firstNum = '';
        secondNum = '';
        action = '';
        result = '';
        display.textContent = '0';
    }
}

function calculate() {
    if (firstNum && action && secondNum) {
        switch (action) {
            case '+':
                result = +firstNum + +secondNum;
                break;
            case '-':
                result = +firstNum - +secondNum;
                break;
            case 'X':
                result = +firstNum * +secondNum;
                break;
            case '/':
                if (secondNum === '0') {
                    display.textContent = 'ERROR';
                    return false;
                } else {
                    result = firstNum / secondNum;
                }
                break;
        }

        display.textContent = result;
        firstNum = result;
        secondNum = '';
        action = '';
    }
}