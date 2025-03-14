document.addEventListener('DOMContentLoaded', function() {
    const subjectsGrid = document.querySelector('.subjects-grid');
    const subjectContent = document.getElementById('subject-content');
    const subjectTitle = document.getElementById('subject-title');
    const topicList = document.getElementById('topic-list');
    const backToSubjectsButton = document.getElementById('back-to-subjects');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeToggleIcon = themeToggle.querySelector('i'); // Получаем элемент i
    const quizContainer = document.getElementById('quiz-container'); // Получаем элемент для теста
    let currentSubject = null; // Текущий выбранный предмет
    const burgerMenu = document.querySelector('.burger-menu');
    const navItems = document.querySelector('.nav-items');

    // Проверяем, сохранена ли тема в localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleIcon.classList.remove('fa-moon'); // Меняем иконку на солнышко
        themeToggleIcon.classList.add('fa-sun');
    }

    // Данные для конспектов и тестов (пример)


    function loadSubjectContent(subject) {
        currentSubject = subject; // Сохраняем текущий предмет
        subjectTitle.textContent = subjectData[subject].title;
        topicList.innerHTML = '';

        subjectData[subject].topics.forEach(topic => {
            const topicLink = document.createElement('a');
            topicLink.href = '#';
            topicLink.textContent = topic.title;
            topicLink.addEventListener('click', () => {
                showQuiz(topic.quiz); // Показываем тест при клике на тему
            });
            topicList.appendChild(topicLink);
        });

        subjectContent.classList.remove('hidden');
        quizContainer.classList.add('hidden'); // Скрываем контейнер с тестом при загрузке предмета
    }

    // Функция для отображения теста
    function showQuiz(quizQuestions) {
        // Реализация теста
        const quizContainer = document.getElementById('quiz');
        const resultsContainer = document.getElementById('results');
        const submitButton = document.getElementById('submit');
        const percentageDisplay = document.getElementById('percentage');

        function buildQuiz() {
            const output = [];

            quizQuestions.forEach(
                (currentQuestion, questionNumber) => {

                    const answers = [];

                    for (let letter in currentQuestion.answers) {

                        answers.push(
                            `<label>
                  <input type="radio" name="question${questionNumber}" value="${currentQuestion.answers[letter]}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
                        );
                    }

                    output.push(
                        `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
              </div>`
                    );
                }
            );

            quizContainer.innerHTML = output.join('');
        }

        function showResults() {

            const answerContainers = quizContainer.querySelectorAll(".answers");

            let numCorrect = 0;

            quizQuestions.forEach((currentQuestion, questionNumber) => {

                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                if (userAnswer === currentQuestion.correctAnswer) {

                    numCorrect++;

                    answerContainers[questionNumber].style.color = 'lightgreen';
                } else {

                    answerContainers[questionNumber].style.color = 'red';
                }
            });

            resultsContainer.innerHTML = `${numCorrect} из ${quizQuestions.length}`;

            // Вычисляем и отображаем процент прохождения
            const percentage = (numCorrect / quizQuestions.length) * 100;
            percentageDisplay.textContent = `${percentage.toFixed(0)}%`;
        }

        function showSlide(n) {
            slides[currentSlide].classList.remove('active-slide');
            slides[n].classList.add('active-slide');
            currentSlide = n;

            if (currentSlide === 0) {
                previousButton.style.display = 'none';
            } else {
                previousButton.style.display = 'inline-block';
            }

            if (currentSlide === slides.length - 1) {
                nextButton.style.display = 'none';
                submitButton.style.display = 'inline-block';
            } else {
                nextButton.style.display = 'inline-block';
                submitButton.style.display = 'none';
            }
        }

        function showNextSlide() {
            showSlide(currentSlide + 1);
        }

        function showPreviousSlide() {
            showSlide(currentSlide - 1);
        }

        buildQuiz();

        const previousButton = document.getElementById("previous");
        const nextButton = document.getElementById("next");
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;

        showSlide(0);

        submitButton.addEventListener('click', showResults);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);

        quizContainer.classList.remove('hidden'); // Показываем контейнер с тестом
        quizContainer.style.display = 'block';
    }



    subjectsGrid.addEventListener('click', (event) => {
        if (event.target.closest('.subject-card')) {
            const subject = event.target.closest('.subject-card').dataset.subject;
            loadSubjectContent(subject);
        }
    });

    backToSubjectsButton.addEventListener('click', () => {
        subjectContent.classList.add('hidden');
        quizContainer.classList.add('hidden'); // Также скрываем тест
        currentSubject = null;
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');

        } else {
            localStorage.setItem('theme', 'light');
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        }
    });
    burgerMenu.addEventListener('click', () => {
        navItems.classList.toggle('active'); // Добавляем/удаляем класс 'active'
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
});