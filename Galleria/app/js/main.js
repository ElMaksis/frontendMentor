import data from '../data.json' assert {type: 'json'};

const sliderStartBtn = document.querySelector('.header__slider-link'),
    galleria = document.querySelector('.galleria');

window.addEventListener('load', renderGallery);

galleria.addEventListener('click', (e) => {
    if (e.target.classList.contains('galleria__slide-item')) {
        const i = e.target.dataset.item;
        localStorage.setItem('selectItem', i);
    }
});

sliderStartBtn.addEventListener('click', () => {
    localStorage.removeItem('selectItem');
});


function renderGallery() {
    data.forEach((item, index) => {
        galleria.insertAdjacentHTML('beforeend', `
                <a class="galleria__slide-link" href="slider.html">
                    <div class="galleria__slide-item galleria__slide-${index + 1}" data-item=${index}>
                        <h3 class="galleria__item-name">${item.name}</h3>
                        <p class="galleria__item-artist">${item.artist.name}</p>
                    </div>
                </a>`);
    });
}

