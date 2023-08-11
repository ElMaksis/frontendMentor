const productBigImage = document.querySelector('.product__big-img'),
    productThumbnails = document.querySelector('.product__img-box'),
    productBuyBtn = document.querySelector('.product__buy-btn'),
    btnMinus = document.querySelector('.btn--minus'),
    btnPlus = document.querySelector('.btn--plus'),
    amountField = document.querySelector('.product__input'),
    countLabel = document.querySelector('.cart__count-label'),
    cartModal = document.querySelector('.cart__modal'),
    cartDeleteBtn = document.querySelector('.cart__delete-icon'),
    modalSlider = document.querySelector('.modal');

document.body.addEventListener('click', function (e) {
    const target = e.target;

    if (target === btnMinus || target.closest('.btn--minus')) {
        changeAmount('minus');
    }

    if (target === btnPlus || target.closest('.btn--plus')) {
        changeAmount('plus');
    }

    if (target.classList.contains('product__item-wrapper')) {
        changeImage(target)
    }

    if (target.classList.contains('product__big-img')) {
        sliderHandler();
    }

    if (target === productBuyBtn || target.closest('.product__buy-btn')) {
        addToCart();
    }

    if (target === cartDeleteBtn || target.closest('.cart__delete-icon')) {
        removeFromCart(target);
    }

});


function changeAmount(operation) {
    if (operation == 'minus' && +amountField.value > 1) {
        +amountField.value--;
    }
    if (operation == 'plus') {
        +amountField.value++;
    }
}

function changeImage(target) {
    productBigImage.src = `image/content/image-product-${target.dataset.item}.jpg`;
    productThumbnails.querySelectorAll('.product__item-wrapper').forEach(item => {
        item.classList.remove('selected');
    });
    target.classList.add('selected');
}


function addToCart() {
    const quantity = +amountField.value,
        productItem =
            `<div class="cart__product-item" data-amount="${quantity}">
    <img class="cart__product-img" src="image/content/image-product-1-thumbnail.jpg"
        alt="product preview ">
    <div class="cart__product">
        <p class="cart__product-name">Fall Limited Edition Sneakers</p>
        <span class="cart__product-price">$125.00</span>
        <span class="cart__product-amount">x ${quantity}</span>
        <span class="cart__product-total">$${quantity * 125}</span>
    </div>
    <div class="cart__delete-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16"
            fill="none">
            <g clip-path="url(#clip0_208_198)">
                <path
                    d="M0 2.62501V1.75001C0 1.33401 0.334 1.00001 0.75 1.00001H4.25L4.544 0.416006C4.60512 0.290778 4.7003 0.185319 4.81864 0.111737C4.93697 0.0381538 5.07366 -0.000571319 5.213 6.3701e-06H8.784C8.92363 -8.2303e-05 9.06052 0.0388111 9.17924 0.112307C9.29797 0.185804 9.39382 0.290984 9.456 0.416006L9.75 1.00001H13.25C13.666 1.00001 14 1.33401 14 1.75001V2.62501C13.9997 2.72438 13.9601 2.81961 13.8899 2.88988C13.8196 2.96015 13.7244 2.99974 13.625 3.00001H0.375C0.275625 2.99974 0.180396 2.96015 0.110127 2.88988C0.0398575 2.81961 0.000263946 2.72438 0 2.62501H0ZM13 4.37501V14.5C13 14.8978 12.842 15.2794 12.5607 15.5607C12.2794 15.842 11.8978 16 11.5 16H2.5C2.10218 16 1.72064 15.842 1.43934 15.5607C1.15804 15.2794 1 14.8978 1 14.5V4.37501C1 4.16901 1.169 4.00001 1.375 4.00001H12.625C12.831 4.00001 13 4.16901 13 4.37501ZM4.5 6.50001C4.5 6.22501 4.275 6.00001 4 6.00001C3.725 6.00001 3.5 6.22501 3.5 6.50001V13.5C3.5 13.775 3.725 14 4 14C4.275 14 4.5 13.775 4.5 13.5V6.50001ZM7.5 6.50001C7.5 6.22501 7.275 6.00001 7 6.00001C6.725 6.00001 6.5 6.22501 6.5 6.50001V13.5C6.5 13.775 6.725 14 7 14C7.275 14 7.5 13.775 7.5 13.5V6.50001ZM10.5 6.50001C10.5 6.22501 10.275 6.00001 10 6.00001C9.725 6.00001 9.5 6.22501 9.5 6.50001V13.5C9.5 13.775 9.725 14 10 14C10.275 14 10.5 13.775 10.5 13.5V6.50001Z"
                    fill="#C3CAD9" />
            </g>
            <defs>
                <clipPath id="clip0_208_198">
                    <rect width="14" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
    </div>`;

    amountField.value = '';

    document.querySelector('.cart__product-box').insertAdjacentHTML('beforeend', productItem);

    countLabel.textContent = +countLabel.textContent + quantity;
    countLabel.style.display = 'flex';
}

function removeFromCart(target) {
    const productAmount = target.closest('.cart__product-item').dataset.amount;

    target.closest('.cart__product-item').remove();
    countLabel.textContent = +countLabel.textContent - productAmount;
}

function sliderHandler(counter = 1) {
    const sliderBigImage = modalSlider.querySelector('.slider__big-img'),
        sliderThubnails = modalSlider.querySelectorAll('.slider__item-wrapper'),
        prevBtn = modalSlider.querySelector('.btn--prev'),
        nextBtn = modalSlider.querySelector('.btn--next');
    // let counter = 1;

    modalSlider.style.display = 'flex';

    sliderBigImage.src = `image/content/image-product-${counter}.jpg`;
    sliderThubnails.forEach(item => {
        item.classList.remove('selected')
    });
    sliderThubnails[counter - 1].classList.add('selected');

    modalSlider.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal') || e.target.closest('.slider__close-btn')) {
            modalSlider.style.display = 'none';
        }
    });

    prevBtn.addEventListener('click', () => {
        changeSlides('minus');
    });
    nextBtn.addEventListener('click', () => {
        changeSlides('plus');
    });

    function changeSlides(dir) {
        if (dir == 'minus') {
            if (counter - 1 == 0) counter = sliderThubnails.length
            else counter--;
        }
        if (dir == 'plus') {
            if (counter + 1 > sliderThubnails.length) counter = 1;
            else counter++;
        }
        sliderBigImage.src = `image/content/image-product-${counter}.jpg`;
        sliderThubnails.forEach(item => {
            item.classList.remove('selected')
        });
        sliderThubnails[counter - 1].classList.add('selected');
    }

}