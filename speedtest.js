    const paragraphs = [

    "The quick brown fox jumps over the lazy dog while the bright sun shines above the green hills and valleys.",

    "Programming is a valuable skill that allows developers to create websites applications games and powerful software systems.",

    "Practice makes perfect and consistent effort every day can lead to significant improvements over a long period of time.",

    "Technology continues to evolve rapidly changing the way people communicate learn work and entertain themselves worldwide.",

    "Reading books regularly can improve vocabulary increase knowledge and strengthen critical thinking and creativity skills.",

    "The internet connects billions of people around the world making information accessible within just a few seconds.",

    "Healthy habits such as exercise proper sleep balanced nutrition and hydration contribute to overall well being.",

    "Web development combines creativity design and logical thinking to build attractive and functional user experiences.",

    "Learning JavaScript opens many opportunities for creating interactive websites dynamic interfaces and modern web applications.",

    "Success is often achieved by setting clear goals maintaining focus and staying committed to continuous improvement.",
        
    "Artificial intelligence is transforming industries by automating repetitive tasks and generating valuable business insights.",

    "Students who practice coding consistently develop stronger problem solving abilities and analytical thinking skills.",

    "Small daily improvements may seem insignificant at first but they eventually result in remarkable achievements.",

    "Design plays an important role in creating products that are visually appealing user friendly and accessible.",

    "The ability to adapt to change is essential in a world where innovation happens at an increasingly rapid pace.",

    "Working on personal projects helps developers gain practical experience and build confidence in their abilities.",

    "Communication and teamwork are important qualities that contribute greatly to success in professional environments.",

    "Learning new technologies can be challenging initially but persistence and curiosity lead to mastery over time.",

    "Typing speed and accuracy improve with regular practice attention to detail and proper finger placement.",

    "Every challenge presents an opportunity to learn something new grow stronger and become better than before."

    ];

    const paragraph = document.getElementById("paragraph");

    const timeTag = document.getElementById("time");
    const mistakeTag = document.getElementById("mistakes");
    const wpmTag = document.getElementById("wpm");
    const cpmTag = document.getElementById("cpm");

    const resetBtn = document.getElementById("resetBtn");

    let timer;
    let maxTime = 60;
    let timeLeft = maxTime;

    let charIndex = 0;
    let mistakes = 0;
    let isTyping = false;

    let characters = [];

    function loadParagraph() {

        let randomText =
        paragraphs[Math.floor(Math.random() * paragraphs.length)];

        paragraph.innerHTML = "";

        randomText.split("").forEach(char => {
            paragraph.innerHTML += `<span>${char}</span>`;
        });

        characters = paragraph.querySelectorAll("span");

        characters[0].classList.add("active");
    }

    function initTimer() {

        if (timeLeft > 0) {

            timeLeft--;
            timeTag.innerText = timeLeft;

        } else {

            clearInterval(timer);

            document.removeEventListener("keydown", typingHandler);
        }
    }

    function updateStats() {

        mistakeTag.innerText = mistakes;

        let cpm = Math.max(0, charIndex - mistakes);

        cpmTag.innerText = cpm;

        let timeSpent = maxTime - timeLeft;

        let wpm = timeSpent > 0
            ? Math.round(((charIndex - mistakes) / 5) * (60 / timeSpent))
            : 0;

        wpmTag.innerText = wpm;
    }

    function typingHandler(e) {

        if (timeLeft <= 0) return;

        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (e.key === "Backspace") {

            if (charIndex > 0) {

                charIndex--;

                if (characters[charIndex].classList.contains("wrong")) {
                    mistakes--;
                }

                characters[charIndex].classList.remove("correct");
                characters[charIndex].classList.remove("wrong");
            }
        }

        else if (e.key.length === 1) {

            if (charIndex < characters.length) {

                if (e.key === characters[charIndex].innerText) {

                    characters[charIndex].classList.add("correct");

                } else {

                    characters[charIndex].classList.add("wrong");
                    mistakes++;
                }

                charIndex++;
            }
        }

        characters.forEach(char => {
            char.classList.remove("active");
        });

        if (characters[charIndex]) {
            characters[charIndex].classList.add("active");
        }

        updateStats();

        if (charIndex === characters.length) {

            clearInterval(timer);

            let finalWPM = wpmTag.innerText;

            setTimeout(() => {
                alert(`Test Complete!\n\nWPM: ${finalWPM}\nMistakes: ${mistakes}`);
            }, 200);
        }
    }

    function resetGame() {

        clearInterval(timer);

        timeLeft = maxTime;
        charIndex = 0;
        mistakes = 0;
        isTyping = false;

        timeTag.innerText = maxTime;
        mistakeTag.innerText = 0;
        wpmTag.innerText = 0;
        cpmTag.innerText = 0;

        loadParagraph();
    }

    loadParagraph();

    document.addEventListener("keydown", typingHandler);

    resetBtn.addEventListener("click", resetGame);