import data from '../data.json' assert {type: 'json'};

let slideIndex = 0,
    timer;

const sliderStopBtn = document.querySelector('.slider__stop-btn'),
    slider = document.querySelector('.slider'),
    sliderPrevBtn = document.querySelector('.prev__btn'),
    sliderNextBtn = document.querySelector('.next__btn'),
    footerPictureName = document.querySelector('.footer__title'),
    footerPictureArtsit = document.querySelector('.footer__artist'),
    fullSizeModal = document.querySelector('.modal'),
    fullSizePicture = document.querySelector('.modal__big-image');

sliderStopBtn.addEventListener('click', () => {
    clearInterval(timer);
});

document.body.addEventListener('click', (e) => {
    if (e.target === sliderPrevBtn || e.target.closest('.prev__btn') && !e.target.closest('.disabled')) changeSlider('prev');
    if (e.target === sliderNextBtn || e.target.closest('.next__btn') && !e.target.closest('.disabled')) changeSlider('next');
    if (e.target.classList.contains('slider__fullsize-btn') || e.target.closest('.slider__fullsize-btn')) showFullSizePic();
});

function renderSlider() {
    const item = localStorage.getItem('selectItem') ? localStorage.getItem('selectItem') : slideIndex;

    const sliderItem = document.createElement('div');
    sliderItem.innerHTML = `
        <div class="slider__content">
        <div class="slider__picture">
            <img class="slider__preview-img" src="${data[item].images.hero.large}" alt="${data[item].name}">
            <a class="slider__fullsize-btn" href="#">
                <img class="slider__fullsize-icon" src="./assets/shared/icon-view-image.svg"
                    alt="button icon">
                <span class="slider__btn-title">VIEW IMAGE</span>
            </a>
        </div>
        <div class="slider__pic-plate">
            <h3 class="slider__pic-name">${data[item].name}</h3>
            <p class="slider__pic-artist">${data[item].artist.name}</p>
        </div>
        <img class="slider__artist-img" src="${data[item].artist.image}" alt="${data[item].artist.name}">
        <p class="slider__pic-description">
            <span class="slider__pic-year">${data[item].year}</span>
            ${data[item].description}
            <a class="slider__link" href="${data[item].source}" target="_blank">GO TO SOURCE</a>
        </p>
    </div>`;
    sliderItem.classList.add('slider__item');
    slider.insertAdjacentElement('beforeend', sliderItem);

    footerPictureName.textContent = data[item].name;
    footerPictureArtsit.textContent = data[item].artist.name;

    if (item == 0) sliderPrevBtn.classList.add('disabled');
    else sliderPrevBtn.classList.remove('disabled');

    if (item == data.length - 1) sliderNextBtn.classList.add('disabled');
    else sliderNextBtn.classList.remove('disabled');
}

function timerChange() {
    timer = setInterval(() => {
        changeSlider('next');
    }, 6000);
}

function changeSlider(direction) {
    let i = localStorage.getItem('selectItem');

    if (direction === 'prev') {
        if (i == 0) {
            clearInterval(timer);
            return;
        } else {
            localStorage.setItem('selectItem', --i);
        }
    }
    else {
        if (i == data.length - 1) {
            clearInterval(timer);
            return;
        } else {
            localStorage.setItem('selectItem', ++i);
        }
    }

    document.querySelector('.slider__item').remove();
    renderSlider();
}

function showFullSizePic() {
    let i = localStorage.getItem('selectItem');

    fullSizePicture.src = data[i].images.gallery;
    fullSizeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(timer);

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal__wrapper') || e.target.classList.contains('modal__close-btn')) {
            fullSizeModal.style.display = 'none';
            document.body.style.overflow = '';
            timerChange();
        }
    });
}


renderSlider();
timerChange();