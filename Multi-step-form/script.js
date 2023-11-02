const form = document.querySelector('.form'),
    stepList = document.querySelectorAll('.step__num'),
    infoList = document.querySelectorAll('.form__input'),
    planList = document.querySelectorAll('.plan-item'),
    planPriceList = document.querySelectorAll('.plan-item__price'),
    addonInputs = document.querySelectorAll('.addon-item__input'),
    addonPriceList = document.querySelectorAll('.addon-item__cost');


let currentStep = 1;
let boolean = false;

const userData = {
    addons: {},
};

const perMonth = [9, 12, 15, 1, 2, 2];
const perYear = [90, 120, 150, 10, 20, 20];
const regEx = [/[a-z а-я]/gi, /.+@.+\..+/i, /\d{9,11}/g];

function goToStep(step) {
    if (step === 5) {
        document.querySelector(`.form__page${currentStep}`).classList.add('hide');
        document.querySelector('.gratitude').classList.remove('hide');
        currentStep = 5;
    } else {
        document.querySelector(`.form__page${currentStep}`).classList.add('hide');
        document.querySelector(`.form__page${step}`).classList.remove('hide');

        currentStep = step;
        history.pushState({ step }, `Step: ${step}`, `?step=${step}`);

        stepList.forEach(item => {
            item.classList.remove('step__num--active');
        });

        stepList[step - 1].classList.add('step__num--active');

        renderForm(step);
    }
}

function backToStep(event) {
    if (currentStep > 1 && currentStep < 5) {
        if (event.state) {
            document.querySelector(`.form__page${currentStep}`).classList.add('hide');
            document.querySelector(`.form__page${event.state.step}`).classList.remove('hide');

            currentStep = event.state.step;
        } else {
            document.querySelector(`.form__page${currentStep}`).classList.add('hide');
            currentStep--;
            document.querySelector(`.form__page${currentStep}`).classList.remove('hide');

            history.pushState({ currentStep }, `Step: ${currentStep}`, `?step=${currentStep}`);
        }

        stepList.forEach(item => {
            item.classList.remove('step__num--active');
        });
        stepList[currentStep - 1].classList.add('step__num--active');
    }
}

function renderForm(page) {
    switch (page) {
        case 1:
            infoList.forEach(item => {
                item.addEventListener('input', () => {
                    item.classList.remove('form__input--error');
                    item.nextElementSibling.textContent = 'This field is required';
                });
            });
            break;

        case 2:
            document.querySelectorAll('.switcher__radio').forEach(item => {
                item.addEventListener('change', function (e) {
                    if (this.value === 'Monthly') {
                        planPriceList.forEach((item, i) => {
                            item.textContent = `$${perMonth[i]}/mo`;
                            item.nextElementSibling.style.display = 'none';
                        });
                    }

                    if (this.value === 'Yearly') {
                        planPriceList.forEach((item, i) => {
                            item.innerHTML = `$${perYear[i]}/yr`;
                            item.nextElementSibling.style.display = 'block';
                        });
                    }
                });
            });

            document.querySelectorAll('.plan-item__radio').forEach(item => {
                item.addEventListener('change', function () {
                    userData.plan = this.value;

                    planList.forEach(item => {
                        item.classList.remove('plan-item--select');
                    });

                    this.parentElement.classList.add('plan-item--select')
                });
            });
            break;

        case 3:
            if (userData.frequency === 'Monthly') {
                addonPriceList.forEach((item, i) => {
                    addonInputs[i].value = perMonth[i + 3];
                    item.textContent = `+$${perMonth[i + 3]}/mo`;
                });
            } else if (userData.frequency === 'Yearly') {
                addonPriceList.forEach((item, i) => {
                    addonInputs[i].value = perYear[i + 3];
                    item.textContent = `+$${perYear[i + 3]}/yr`;
                });
            }

            document.querySelectorAll('.addon-item__input').forEach(item => {
                item.addEventListener('change', function () {
                    if (this.checked) {
                        this.parentElement.classList.add('addon-item--active');
                    } else {
                        this.parentElement.classList.remove('addon-item--active');
                    }
                });
            });
            break;

        case 4:
            const choicePlan = document.querySelector('.check__plan'),
                planCost = document.querySelector('.check__plan-sum'),
                addonsBox = document.querySelector('.check__addon-body'),
                totalPoint = document.querySelector('.check__total-point'),
                totalSum = document.querySelector('.check__total-sum');

            let unit = '';

            if (userData.frequency === 'Yearly') {
                unit = 'yr';
                totalPoint.textContent = 'Total (per year)';
            }
            else {
                unit = 'mo';
                totalPoint.textContent = 'Total (per month)';
            }

            choicePlan.textContent = `${userData.plan}(${userData.frequency})`;
            planCost.textContent = `$${userData.planCost}/${unit}`;

            addonsBox.textContent = '';
            for (let item in userData.addons) {
                addonsBox.insertAdjacentHTML('beforeend', `
                <div class="check__addon-item">
                <p class="check__addon-point">${item}</p>
                <span class="check__addon-sum">+$${userData.addons[item]}/${unit}</span>
            </div>`);
            }

            totalSum.textContent = `$${calculateTotal()}/${unit}`;

            document.querySelector('.check__link').addEventListener('click', () => {
                document.querySelector(`.form__page${currentStep}`).classList.add('hide');
                currentStep = 3;
                document.querySelector(`.form__page${currentStep}`).classList.remove('hide');

                history.pushState({ currentStep }, `Step: ${currentStep}`, `?step=${currentStep}`);
            });
    }
}

renderForm(currentStep);

function validationForm(page) {
    boolean = false;

    switch (page) {
        case 1:
            for (let i = 0; i < infoList.length; i++) {
                if (infoList[i].value.trim() !== "") {
                    if (!regEx[i].test(infoList[i].value)) {
                        infoList[i].classList.add('form__input--error');
                        infoList[i].nextElementSibling.textContent = 'wrong data';
                        return false;
                    }
                } else {
                    infoList[i].classList.add('form__input--error');
                    return false;
                }
            }

            boolean = true;
            break;

        case 2:
            userData.frequency = document.querySelector('.switcher__radio:checked').value;
            document.querySelectorAll('.plan-item__radio').forEach((item, i) => {
                if (item.checked && userData.frequency === 'Monthly') {
                    userData.plan = item.value;
                    userData.planCost = perMonth[i];
                }
                if (item.checked && userData.frequency === 'Yearly') {
                    userData.plan = item.value;
                    userData.planCost = perYear[i];
                }
            });

            boolean = true;
            break;

        case 3:
            addonInputs.forEach(item => {
                if (item.checked) {
                    userData.addons[item.name] = item.value;
                } else {
                    delete userData.addons[item.name];
                }
            });

            boolean = true;
            break;

        case 4:
            boolean = true;
            break;
    }

    return boolean;
}

function calculateTotal() {
    let sum = userData.planCost;

    for (let item in userData.addons) {
        sum += +userData.addons[item];
    }

    return sum;
}

form.addEventListener('click', (e) => {
    if (e.target.classList.contains('form__btn') && validationForm(currentStep)) {
        goToStep(currentStep + 1);
    }
});

window.addEventListener('popstate', (e) => {
    backToStep(e);
});

history.pushState({ step: 1 }, 'Step: 1', '?step=1');