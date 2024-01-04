import refs from './refs.js';
import data from '../data/data.json' assert { type: 'json' };


// (function getData() {
//     fetch('https://restcountries.com/v3.1/all')
//         .then(response => response.json())
//         .then(info => console.log(info));
// })()


refs.regionSelect.addEventListener('click', selectHandler);

refs.themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

document.querySelector('.js-search-btn').addEventListener('click', searchCountry);
refs.countryInput.addEventListener('input', searchCountry);

refs.countryInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') searchCountry();
});

function selectHandler(e) {
    e.stopImmediatePropagation();
    refs.selectDropdaun.style.height = refs.selectDropdaun.scrollHeight + 'px';
    refs.selectMarker.style.transform = 'rotate(180deg)';

    refs.selectList.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopImmediatePropagation();

            refs.regionSelect.querySelector('.js-select__value').textContent = item.dataset.region;
            refs.selectDropdaun.style.height = '0';
            refs.selectMarker.style.transform = 'rotate(0)';
            filterRegion(item.dataset.region);
        });
    });

    document.body.addEventListener('click', (e) => {
        if (!e.target.classList.contains('js-select__item')) {
            refs.selectDropdaun.style.height = '0';
            refs.selectMarker.style.transform = 'rotate(0)';
        }
    }, { once: true });
}

function filterRegion(region) {
    const filterList = data.filter(item => item.region === region);

    renderCountryList(filterList);
}

function searchCountry() {
    let inputData = refs.countryInput.value.trim().toLowerCase();

    const currentResults = data.filter(item => item.name.toLowerCase().includes(inputData));

    renderCountryList(currentResults);
}

function renderCountryList(data) {
    refs.countryBox.innerHTML = '';

    data.forEach(item => {
        const newCountry = document.createElement('div');

        newCountry.classList.add('js-country-item',
            'country__item');
        newCountry.innerHTML =
            `<a href="detail.html?country=${item.alpha3Code}">
                <div>
                    <img class="country__img" src="${item.flag}" alt="${item.name}">
                </div>
                <div class="country__content">
                    <h3 class="js-country__name country__title">${item.name}</h3>
                    <ul class="country__list">
                        <li class="country__list-item">
                            <span>Population:</span>
                            <span class="js-country-population country__output">${item.population}</span>
                        </li>
                        <li class="country__list-item">
                            <span>Region:</span>
                            <span class="js-country-region country__output">${item.region}</span>
                        </li>
                        <li class="country__list-item">
                            <span>Capital:</span>
                            <span class="js-country-capital country__output">${item.capital}</span>
                        </li>
                    </ul>
                </div>
            </a>`;

        refs.countryBox.insertAdjacentElement('beforeend', newCountry);
    });
}

function initialPage() {
    const params = new URLSearchParams(window.location.search);
    const selectRegion = params.get('region');

    if (selectRegion) {
        filterRegion(selectRegion);
        refs.regionSelect.querySelector('.js-select__value').textContent = selectRegion;
    } else {
        renderCountryList(data);
    }
}

initialPage();

