import data from './data.json' assert {type: 'json'};
// console.log(data);

const jobList = document.querySelector('.job-list'),
    // jobItems = document.querySelectorAll('.job-item'),
    skillList = document.querySelector('.job-item__skill-list'),
    filtersPanel = document.querySelector('.filter-box'),
    filterList = document.querySelector('.filter-box__list'),
    clearPanel = document.querySelector('.filter-box__clear-btn');

document.addEventListener('DOMContentLoaded', () => {
    data.forEach(item => {
        render(item);
    });
});

jobList.addEventListener('click', function (e) {
    setFilter(e);
});

document.querySelector('.filter-box__wrapper').addEventListener('clik', function (e) {
    clearFilter(e);
});

function setFilter(e) {
    if (e.target.classList.contains('job-item__skill-item')) {
        const skillValue = e.target.textContent;

        const filterItem = document.createElement('li');
        filterItem.classList.add('filter-box__list-item');
        filterItem.innerHTML = `<span class="filter-box__item-value">${skillValue}</span><button class="filter-box__delete-item">&#x2716;</button>`;
        filterList.append(filterItem);

        filtersPanel.style = "display: flex";
        // jobList.innerHTML = '';

        // sortList(skillValue);

        const currentList = jobList.querySelectorAll('.job-item');
        jobList.innerHTML = '';
        currentList.forEach(item => {

            if (Object.values(item.dataset).includes(skillValue)) {
                render(data[item.id - 1]);
            }
        });
    }
}

function sortList(skillValue) {

    const currentList = jobList.querySelectorAll('.job-item');
    jobList.innerHTML = '';
    currentList.forEach(item => {
        // console.log(currentList);
        if (Object.values(item.dataset).includes(skillValue)) {
            console.log(item);
            // return item;
        }
    });
}





function render(vacancy) {
    const jobItem = document.createElement('div');
    jobItem.classList.add('job-item');
    jobItem.setAttribute('id', vacancy.id);
    jobItem.setAttribute('data-role', vacancy.role);
    jobItem.setAttribute('data-level', vacancy.level);
    jobItem.setAttribute('data-languages', vacancy.languages);
    jobItem.setAttribute('data-tools', vacancy.tools);

    jobItem.insertAdjacentHTML('beforeend', `
        <div class="job-item__content">
            <a class="job-item__link" href="#">
                <img class="job-item__firm-logo" src="${vacancy.logo}" alt="logo of company">
            </a>
            <div class="job-item__desc">
                <div class="job-item__box">
                    <h4 class="job-item__company">${vacancy.company}</h4>
                    <span class=${vacancy.new ? "job-item__label-new" : "none"}>NEW!</span>
                    <span class=${vacancy.featured ? "job-item__label-featured" : "none"}>FEATURED</span>
                </div>
                <h3 class="job-item__proffession">${vacancy.position}</h3>
                <div class="job-item__parameters">
                    <span class="job-item__term">${vacancy.postedAt}</span>
                    <span class="job-item__schedule">${vacancy.contract}</span>
                    <span class="job-item__place">${vacancy.location}</span>
                </div>
            </div>
        </div>
        <ul class=" job-item__skill-list">
            <li class="job-item__skill-item">${vacancy.role}</li>
            <li class="job-item__skill-item">${vacancy.level}</li>

            <li class=${vacancy.languages[0] ? "job-item__skill-item" : "none"}>${vacancy.languages[0]}</li>
            <li class=${vacancy.languages[1] ? "job-item__skill-item" : "none"}>${vacancy.languages[1]}</li>
            <li class=${vacancy.languages[2] ? "job-item__skill-item" : "none"}>${vacancy.languages[2]}</li>
            <li class=${vacancy.languages[3] ? "job-item__skill-item" : "none"}>${vacancy.languages[3]}</li>
            <li class=${vacancy.languages[4] ? "job-item__skill-item" : "none"}>${vacancy.languages[4]}</li>
            <li class=${vacancy.tools[0] ? "job-item__skill-item" : "none"}>${vacancy.tools[0]}</li>
            <li class=${vacancy.tools[1] ? "job-item__skill-item" : "none"}>${vacancy.tools[1]}</li>
            <li class=${vacancy.tools[2] ? "job-item__skill-item" : "none"}>${vacancy.tools[2]}</li>
            <li class=${vacancy.tools[3] ? "job-item__skill-item" : "none"}>${vacancy.tools[3]}</li>
            <li class=${vacancy.tools[4] ? "job-item__skill-item" : "none"}>${vacancy.tools[4]}</li>
        </ul>`);
    jobList.append(jobItem);
}

function clearFilter(target) {
    console.log(target);
    if (target.classList.cotains('filter-box__delete-item')) {
        console.log('work');
        target.closest('filter-box__list-item').remove();
    } else if (target.classList.contains('filter-box__clear-btn')) {
        filterList.innerHTML = '';
    }
}

