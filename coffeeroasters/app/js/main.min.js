const subscribeItems = document.querySelectorAll('.subscribe__item'),
    accordionTabs = document.querySelectorAll('.accordion-item__tab'),
    accordionLabels = document.querySelectorAll('.accordion-item__label'),
    summaryOut = document.querySelector('.order'),
    orderBtn = document.querySelector('.summary__btn'),
    modal = document.querySelector('.modal'),
    oneWeek = document.querySelector('.delivery__one-week'),
    twoWeek = document.querySelector('.delivery__two-week'),
    fourWeek = document.querySelector('.delivery__four-week'),
    deliveryOut = document.querySelectorAll('.modal__price');

const order = {};


accordionTabs.forEach(item => {
    item.addEventListener('click', function (e) {
        accordionHandler(e.target);
    });
});

subscribeItems.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const i = e.target.closest('.subscribe__item').dataset.num;

        accordionHandler(accordionTabs[i]);
    });
});

accordionLabels.forEach(item => {
    item.addEventListener('change', selectValue);
});

function selectValue() {
    this.parentElement.querySelectorAll('.accordion-item__label').forEach(item => {
        item.classList.remove('accordion-item__label--active');
    });
    this.classList.add('accordion-item__label--active');

    const key = this.querySelector('.accordion-item__input').name,
        value = this.querySelector('.accordion-item__title').textContent;

    order[key] = value;
    if (order.preference === 'Capsule') {
        accordionTabs[3].parentElement.classList.add('accordion-item--disabled');
        subscribeItems[3].classList.add('subscribe__item--disabled');

    }
    if (order.preference === 'Filter' || order.preference === 'Espresso') {
        accordionTabs[3].parentElement.classList.remove('accordion-item--disabled');
        subscribeItems[3].classList.remove('subscribe__item--disabled');
    }

    calcOrder();
    renderOrder();
}

function renderOrder() {
    let receipt;

    if (accordionLabels[1].firstElementChild.checked || accordionLabels[2].firstElementChild.checked) {
        receipt = `“I drink my coffee as <span class="order__pref">
        ${order.preference ? order.preference : '_____'}</span>, with a 
        <span class="order__type">${order.type ? order.type : '_____'}</span> type of bean. 
        <span class="order__quantity">${order.quantity ? order.quantity : '_____'}</span> ground ala, 
        <span class="order__grind">${order.grind ? order.grind : '_____'}</span> sent to me
        <span class="order__delivery">${order.delivery ? order.delivery : '_____'}</span>.”`;
    } else {
        receipt = `“I drink my coffee using <span class="order__pref">Capsules</span>, with a 
        <span class="order__type">${order.type ? order.type : '_____'}</span> type of bean. 
        <span class="order__quantity">${order.quantity ? order.quantity : '_____'}</span>,
        sent to me <span class="order__delivery">${order.delivery ? order.delivery : '_____'}</span>.”`;
    }

    summaryOut.innerHTML = receipt;
    modal.querySelector('.modal__order ').innerHTML = receipt;
    deliveryOut[0].textContent = `$${order.deliveryCost}/ mo`;
    deliveryOut[1].textContent = ` - $${order.deliveryCost}/ mo`;

    if (Object.keys(order).length === 6) {
        orderBtn.classList.remove('button--disabled');
        orderBtn.addEventListener('click', showModal);
    }
}


function accordionHandler(target) {
    const accordionItem = target.parentElement,
        i = accordionItem.dataset.num;

    if (order.preference === 'Capsule' && i === '3') return false;

    if (accordionItem.classList.contains('accordion-item--active')) {
        accordionItem.classList.remove('accordion-item--active')
        target.nextElementSibling.style = "display: none";
        subscribeItems[i].classList.remove('subscribe__item--active');
    } else {
        target.nextElementSibling.style = "display: flex";
        subscribeItems.forEach(item => {
            item.classList.remove('subscribe__item--active');
        });
        subscribeItems[i].classList.add('subscribe__item--active');
        accordionItem.classList.add('accordion-item--active');
        window.scrollTo(0, accordionItem.offsetTop);
    }
}

function showModal() {
    modal.style.display = "block";
    modal.querySelector('.modal__wrapper').style.top = `${window.scrollY}px`;
    document.body.style.overflow = "hidden";
    modal.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal__wrapper')) {
            modal.style = "display: none";
            document.body.style.overflow = "";
        }
    });
}

function calcOrder() {
    switch (order.quantity) {
        case '250g':
            oneWeek.textContent = '$7.20';
            twoWeek.textContent = '$9.60';
            fourWeek.textContent = '$12.00';
            if (order.delivery === 'Every week') order.deliveryCost = 7.20 * 4;
            if (order.delivery === 'Every 2 weeks') order.deliveryCost = 9.60 * 2;
            if (order.delivery === 'Every month') order.deliveryCost = 12.00;
            break;

        case '500g':
            oneWeek.textContent = '$13.00';
            twoWeek.textContent = '$17.50';
            fourWeek.textContent = '$22.00';
            if (order.delivery === 'Every week') order.deliveryCost = 13.00 * 4;
            if (order.delivery === 'Every 2 weeks') order.deliveryCost = 17.50 * 2;
            if (order.delivery === 'Every month') order.deliveryCost = 22.00;
            break;

        case '1000g':
            oneWeek.textContent = '$22.00';
            twoWeek.textContent = '$32.00';
            fourWeek.textContent = '$42.00';
            if (order.delivery === 'Every week') order.deliveryCost = 22.00 * 4;
            if (order.delivery === 'Every 2 weeks') order.deliveryCost = 32.00 * 2;
            if (order.delivery === 'Every month') order.deliveryCost = 42.00;
            break;
    }
}

renderOrder();