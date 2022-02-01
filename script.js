const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
wordTag = document.querySelector(".word span");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = words = isTyping = 0;

//// if find the empty split in the paragraph = 1 word => if typing != charType mistake word + 1 


function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

/// skip the space bar or do not count the mistake from space bar
///  a word is any thing that is not space = 1 word = string that is not space bar = wpm not include space bar = count mistake of word only after the space bar
/// if there is > 1 mistake index (incorrect_in) before space bar = +1 word mistake
/// word mistake go up +1 only after the incorrect_in + 1 before word correct

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
           /// timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        
        if(typedChar == null){ 
            if(charIndex > 0) {
                charIndex--;
                characters[charIndex].classList.remove("correct_in", "incorrect_in");
            }
        } else { 
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct_in");
                    if (characters[charIndex].innerText === " ") {
                        characters[charIndex].classList.remove("correct_in");
                        characters[charIndex].classList.add("word");
                        mistakes*0;
                        
                        
                        
                    }
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect_in");
                    if (characters[charIndex].innerText === " ") {
                        characters[charIndex].classList.add("word");
                        mistakes*0;
                        
                        
                        
                        
                    }
            if (characters[charIndex].innerText === " ") {
            words++;
            characters[charIndex].classList.add("word");
            characters[charIndex].classList.remove("correct_in", "incorrect_in");
            
            
            }

            if (characters[charIndex].innerText === " ") {characters[charIndex].classList.add("word");
            
            }

            }
            charIndex++;

            
            }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        words = words
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes - words;
        cpmTag.innerText = (charIndex - mistakes);
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}


function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);