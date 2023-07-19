let themeBtn = document.querySelector('.header__btn'),
    themeIcon = document.querySelector('.header__switcher'),
    themeLink = document.querySelector('#theme-style'),
    todoInput = document.querySelector('.app__todo-desc'),
    todoList = document.querySelector('.app-list'),
    filterBtns = document.querySelectorAll('.app-footer__btn');

toggleTheme();

themeBtn.addEventListener('click', toggleStorageSetting);

todoInput.addEventListener('change', addTodoItem);

todoList.addEventListener('click', function (e) {
    const clickTarget = e.target;
    todoItemClickHandler(clickTarget);
});

document.querySelector('.app-footer__control').addEventListener('click', function (e) {
    if (e.target.classList.contains('app-footer__btn')) {
        const currentFilter = e.target.dataset.filter,
            todoItems = todoList.querySelectorAll('.app-item');

        switch (currentFilter) {
            case "last":
                let counter = 0;

                for (let i = todoItems.length - 1; i >= 0; i--) {
                    if (todoItems[i].classList.contains('app-item--active') && counter < 5) {
                        todoItems[i].style = "display: flex";
                        counter++;
                    } else {
                        todoItems[i].style = "display: none";
                    }
                }

                filterBtns.forEach(item => {
                    item.classList.remove('app-footer__btn--active');
                });

                e.target.classList.add('app-footer__btn--active');
                break;

            case "all":
                for (let item of todoItems) {
                    item.style = "display: flex";
                }

                filterBtns.forEach(item => {
                    item.classList.remove('app-footer__btn--active');
                });

                e.target.classList.add('app-footer__btn--active');
                break;

            case "active":
                for (let item of todoItems) {
                    if (item.classList.contains('app-item--active')) {
                        item.style = "display: flex";
                    } else {
                        item.style = "display: none";
                    }
                }

                filterBtns.forEach(item => {
                    item.classList.remove('app-footer__btn--active');
                });

                e.target.classList.add('app-footer__btn--active');
                break;

            case "complete":
                for (let item of todoItems) {
                    if (item.classList.contains('app-item--done')) {
                        item.style = "display: flex";
                    } else {
                        item.style = "display: none";
                    }
                }

                filterBtns.forEach(item => {
                    item.classList.remove('app-footer__btn--active');
                });

                e.target.classList.add('app-footer__btn--active');
                break;

            case "clear":
                for (let item of todoItems) {
                    if (item.classList.contains('app-item--done')) {
                        item.remove();
                    }
                }
                break;
        }
    }
});

function toggleTheme() {
    if (localStorage.getItem('theme') === 'light') {
        themeLink.setAttribute('href', 'theme-light.css');
        themeIcon.src = './images/icon-moon.svg';
    } else {
        themeLink.setAttribute('href', 'theme-dark.css');
        themeIcon.src = './images/icon-sun.svg';
    }
}

function toggleStorageSetting() {
    if (localStorage.getItem('theme') === "light") {
        localStorage.removeItem('theme');
        toggleTheme();
    } else {
        localStorage.setItem('theme', 'light');
        toggleTheme();
    }
}

function addTodoItem(e) {
    e.preventDefault();
    const newTask = todoInput.value;

    todoInput.value = '';
    todoList.insertAdjacentHTML('beforeend',
        `<div class="app-item app-item--active">
    <div class="app-box">
        <label class="app-box__label">
            <input class="app-box__input" type="checkbox">
            <span class="app-box__checkbox">
                <img class="app-box__select-icon" src="./images/icon-check.svg"
                    alt="checkbox select icon">
            </span>
        </label>
    </div>
    <p class="app-item__text">
        ${newTask}
    </p>
    <button class="app-item__btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path fill="#494C6B" fill-rule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
        </svg>
    </button>
</div>`);
}


function todoItemClickHandler(clickTarget) {
    if (clickTarget.closest('.app-item__btn')) {
        clickTarget.closest('.app-item').remove();
    } else if (clickTarget.closest('.app-box__label')) {
        const currentTask = clickTarget.closest('.app-item'),
            statusInput = currentTask.querySelector('.app-box__input');

        if (statusInput.checked) {
            currentTask.classList.add('app-item--done');
            currentTask.classList.remove('app-item--active');
        } else {
            currentTask.classList.add('app-item--active');
            currentTask.classList.remove('app-item--done');
        }
    }
}