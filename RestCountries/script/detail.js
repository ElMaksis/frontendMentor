import refs from './refs.js';
import data from '../data/data.json' assert { type: 'json' };

findCountry();

refs.themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

function findCountry() {
    const params = new URLSearchParams(window.location.search),
        countryCode = params.get('country');
    const currentCountry = data.find(item => item.alpha3Code === countryCode);

    renderPage(currentCountry);
    setRegion(currentCountry.region);
}

function renderPage(country) {
    refs.detailFlag.src = country.flag;
    refs.detailCountryTitle.textContent = country.name || '--';
    refs.detailCountryName.textContent = country.nativeName || '--';
    refs.detailPopulation.textContent = country.population || '--';
    refs.detailRegion.textContent = country.region || '--';
    refs.detailSubRegion.textContent = country.subregion || '--';
    refs.detailCapital.textContent = country.capital || '--';
    refs.detailDomain.textContent = country.topLevelDomain ? country.topLevelDomain.join(',') : '--';
    refs.detailCurrency.textContent = country.currencies ? country.currencies.map(item => item.name).join(', ') : '--';
    refs.detailLang.textContent = country.languages ? country.languages.map(item => item.name).join(', ') : '--';

    if (country.borders) {
        country.borders.forEach(border => {
            const neighbor = data.find(country => country.alpha3Code === border);

            refs.detailNeighborBox.insertAdjacentHTML('beforeend',
                `<a class="neighbor-item py-1 px-6 text-xs sm:text-sm dark:bg-[#2B3844] rounded-sm 
            shadow-light hover:bg-[#ebebf3] dark:hover:bg-[#253542] hover:scale-105 transition-all"
            href="detail.html?country=${neighbor.alpha3Code}">${neighbor.name}</a>`)
        });
    }
}

function setRegion(region) {
    refs.backBtn.href = `index.html?region=${region}`;
}


