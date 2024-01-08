import refs from './refs.js';

fetchCountry();

function fetchCountry() {
    fetch(`https://restcountries.com/v3.1/alpha/${parsUrl()}`)
        .then(response => response.json())
        .then(country => {

            function renderPage() {

                refs.detailFlag.src = country[0].flags.svg;
                refs.detailCountryTitle.textContent = country[0].name.common || '--';
                refs.detailCountryName.textContent = Object.values(country[0].name.nativeName)[0].common || '--';
                refs.detailPopulation.textContent = new Intl.NumberFormat("ru-RU").format(country[0].population) || '--';
                refs.detailRegion.textContent = country[0].region || '--';
                refs.detailSubRegion.textContent = country[0].subregion || '--';
                refs.detailCapital.textContent = country[0].capital || '--';
                refs.detailDomain.textContent = country[0].tld ? country[0].tld.join(',') : '--';
                refs.detailCurrency.textContent = country[0].currencies ? Object.values(country[0].currencies).map(item => item.name).join(', ') : '--';
                refs.detailLang.textContent = country[0].languages ? Object.values(country[0].languages).join(', ') : '--';

                if (country[0].borders) {
                    country[0].borders.forEach(item => {

                        refs.detailNeighborBox.insertAdjacentHTML('beforeend',
                            `<a class="neighbor-item py-1 px-6 text-xs sm:text-sm dark:bg-[#2B3844] rounded-sm
                        shadow-light hover:bg-[#ebebf3] dark:hover:bg-[#253542] hover:scale-105 transition-all"
                        href="detail.html?country=${item}">${item}</a>`)
                    });
                }
            }

            function setRegion(region) {
                refs.backBtn.href = `index.html?region=${region}`;
            }

            setRegion(country[0].region);
            renderPage();
        });
}

refs.themeBtn.addEventListener('click', changeTheme);

initialPage();

function parsUrl() {
    const params = new URLSearchParams(window.location.search);

    return params.get('country');
}

function initialPage() {
    const favTheme = localStorage.getItem('RESTCountryTheme');

    if (favTheme) {
        document.documentElement.classList.add(favTheme);
    }
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





