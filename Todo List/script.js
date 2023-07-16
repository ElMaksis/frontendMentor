const themeBtn = document.querySelector('.header__btn'),
    themeIcon = document.querySelector('.header__switcher');

themeBtn.addEventListener('click', function () {
    themeBtn.classList.toggle('header__btn--lite');
    themeIcon.src = 'images/icon-moon.svg';
});