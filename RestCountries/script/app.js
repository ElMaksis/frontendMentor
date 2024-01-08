import refs from './refs.js';

function getDataFromAPI() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {

            refs.regionSelect.addEventListener('click', selectHandler);

            document.querySelector('.js-search-btn').addEventListener('click', searchCountry);
            refs.countryInput.addEventListener('input', searchCountry);

            refs.countryInput.addEventListener('keydown', (e) => {
                if (e.code === 'Enter') searchCountry();
            });

            refs.themeBtn.addEventListener('click', changeTheme);

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

                const currentResults = data.filter(item => item.name.common.toLowerCase().includes(inputData));

                renderCountryList(currentResults);
            }

            function renderCountryList(data) {
                refs.countryBox.innerHTML = '';

                data.forEach(item => {
                    const newCountry = document.createElement('div');

                    newCountry.classList.add('js-country-item',
                        'country__item');
                    newCountry.innerHTML =
                        `<a href="detail.html?country=${item.cioc}">
                            <div>
                                <img class="country__img" src="${item.flags.svg}" alt="${item.name.common}">
                            </div>
                            <div class="country__content">
                                <h3 class="js-country__name country__title">${item.name.common}</h3>
                                <ul class="country__list">
                                    <li class="country__list-item">
                                        <span>Population:</span>
                                        <span class="js-country-population country__output">${new Intl.NumberFormat("ru-RU").format(item.population)}</span>
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

            function changeTheme() {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('RESTCountryTheme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('RESTCountryTheme', 'dark')
                }
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
        });
}

getDataFromAPI();

(function setTheme() {
    const myTheme = localStorage.getItem('RESTCountryTheme');

    if (myTheme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }

    if (myTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
}())






