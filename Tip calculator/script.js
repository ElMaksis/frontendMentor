const tipButtons = document.querySelectorAll('.calc-input__btn'),
    resetBtn = document.querySelector('.calc-output__btn'),
    billInput = document.querySelector('.calc-input__field--bill'),
    peopleInput = document.querySelector('.calc-input__field--people'),
    customBtn = document.querySelector('.calc-input__btn--custom'),
    customInput = document.querySelector('.custom-btn__input'),
    amount = document.querySelector('.calc-output__amount'),
    total = document.querySelector('.calc-output__total');


function validateInput(inp) {
    if (+inp.value === 0) {
        inp.style = "border: 2px solid rgb(158, 49, 49);";
        try {
            inp.nextElementSibling.textContent = "Can't be zero";
        }
        catch { }
        return false;
    } else if (+inp.value < 0) {
        inp.style = "border: 2px solid rgb(158, 49, 49);";
        try {
            inp.nextElementSibling.textContent = "Can't be negative";
        }
        catch { }
        return false;
    } else if (isNaN(+inp.value)) {
        inp.style = "border: 2px solid rgb(158, 49, 49);";
        try {
            inp.nextElementSibling.textContent = "Please input number";
        }
        catch { }
        return false;
    } else {
        inp.style = "border: none";
        try {
            inp.nextElementSibling.textContent = "";
        }
        catch { }
        return +inp.value;
    }
}

function calcTip() {
    const bill = validateInput(billInput);
    const people = validateInput(peopleInput);
    let tip;

    tipButtons.forEach(item => {
        item.classList.remove('btn--select');
    });

    if (this.classList.contains('custom-btn__input')) {
        tip = validateInput(customInput);
        customBtn.classList.add('btn--select');
    } else {
        this.classList.add('btn--select');
        tip = this.dataset.tip;
    }

    if (bill && people) {
        const resultTip = (bill / 100 * tip) / people,
            resultBill = (bill + (bill / 100 * tip)) / people;
        amount.textContent = resultTip.toFixed(2);
        total.textContent = resultBill.toFixed(2);
    }

    resetBtn.classList.remove('calc-output__btn--disabled');
    resetBtn.classList.add('btn');
}


resetBtn.addEventListener('click', () => {
    billInput.value = 0;
    billInput.classList.remove('calc-input__field--error');
    billInput.style = "border: none";
    billInput.nextElementSibling.textContent = "";

    peopleInput.value = 0;
    peopleInput.classList.remove('calc-input__field--error');
    peopleInput.style = "border: none";
    peopleInput.nextElementSibling.textContent = "";

    customInput.style = "border: 2px solid #2bcfb6;";
    customInput.value = '';

    tipButtons.forEach(item => {
        item.classList.remove('btn--select');
    });

    amount.textContent = '0.00';
    total.textContent = '0.00';

    resetBtn.classList.add('calc-output__btn--disabled');
    resetBtn.classList.remove('btn');
});


document.querySelectorAll('[data-tip]').forEach((item) => {
    item.addEventListener('click', calcTip);
});

customBtn.addEventListener('click', function () {
    customBtn.classList.add('btn--select');
    customInput.addEventListener('input', calcTip);
});


