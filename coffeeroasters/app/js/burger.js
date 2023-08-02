const burgerBtn = document.querySelector('.burger-menu'),
    mobileMenu = document.querySelector('.nav-menu');

burgerBtn.addEventListener('click', showBurgerMenu);

function showBurgerMenu() {
    this.classList.toggle('burger-menu--active');
    mobileMenu.classList.toggle('nav-menu--mobile');
    if (document.body.style.overflow !== 'hidden') {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

}