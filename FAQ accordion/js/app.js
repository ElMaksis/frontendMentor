const faqModal = document.querySelector('.faq'),
    questions = document.querySelectorAll('.faq__question'),
    answers = document.querySelectorAll('.faq__answer');


faqModal.addEventListener('click', (e) => {
    showAnswer(e);
});

function showAnswer(e) {
    const target = e.target;
    const heightElem = target.nextElementSibling.scrollHeight;

    if (!target.classList.contains('faq__question')) return false;

    questions.forEach(item => {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            item.nextElementSibling.style.height = '0';
        }
    });

    target.classList.add('active');
    target.nextElementSibling.style.height = `${heightElem}px`;
}
