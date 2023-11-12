const priceSwitchers = document.querySelectorAll('.price__input'),
    tarifItems = document.querySelectorAll('.price__tarif-item'),
    tarifBtns = document.querySelectorAll('.price__tarif-btn'),
    tarifCosts = document.querySelectorAll('.price__tarif-amount'),
    tarifPeriods = document.querySelectorAll('.price__tarif-period');


const price = {
    year: {
        0: 190.00,
        1: 390.00,
        2: 990.00
    },
    month: {
        0: 19.00,
        1: 39.00,
        2: 99.00
    }
}
priceSwitchers.forEach(item => {
    item.addEventListener('change', changeCost);
});

tarifBtns.forEach(item => {
    item.addEventListener('click', changeActiveStatus);
});

function changeActiveStatus() {
    tarifItems.forEach(item => {
        item.classList.remove('price__tarif--active');
    });

    this.parentElement.classList.add('price__tarif--active');
}

function changeCost() {
    const period = this.value;

    tarifCosts.forEach((item, i) => {
        item.textContent = `$${price[period][i]}`;
    });

    tarifPeriods.forEach(item => {
        item.textContent = `per ${period}`;
    });
}