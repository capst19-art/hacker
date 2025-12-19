// ACTIVE NAVBAR LINK ON SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((sec) => {
            const top = window.scrollY;
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;

            if (top >= offset && top < offset + height) {
                  current = sec.getAttribute("id");
            }
      });

      navLinks.forEach((a) => {
            a.classList.remove("active");

            if (a.getAttribute("href") === `#${current}`) {
                  a.classList.add("active");
            }
      });
});


// Elements
const openGameBtn = document.getElementById('openGameBtn');
const wrap = document.querySelector('.wrap');
const closeGameBtn = document.querySelector('.close-game');
const colorDisplay = document.getElementById('colorDisplay');
const colorButtons = document.getElementById('colorButtons');
const gameMessage = document.getElementById('gameMessage');
const newGameBtn = document.getElementById('newGameBtn');

let correctColor;

function randomColor() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateGame() {
    colorButtons.innerHTML = '';
    const colors = [];
    correctColor = randomColor();
    colorDisplay.textContent = correctColor.toUpperCase();

    // generate 5 distractor colors + 1 correct
    colors.push(correctColor);
    while(colors.length < 6){
        let c = randomColor();
        if(!colors.includes(c)) colors.push(c);
    }

    // shuffle
    colors.sort(() => Math.random() - 0.5);

    colors.forEach(color => {
        const btn = document.createElement('button');
        btn.classList.add('color-btn');
        btn.style.backgroundColor = color;
        btn.addEventListener('click', () => checkColor(color));
        colorButtons.appendChild(btn);
    });

    gameMessage.textContent = '';
}

function checkColor(color) {
    if(color === correctColor) {
        gameMessage.textContent = 'Correct!';
        gameMessage.style.color = '#4ade80';
    } else {
        gameMessage.textContent = 'Try Again';
        gameMessage.style.color = '#f87171';
    }
}

// Open/Close Game
openGameBtn.addEventListener('click', () => wrap.style.display = 'block');
closeGameBtn.addEventListener('click', () => wrap.style.display = 'none');

// New Game
newGameBtn.addEventListener('click', generateGame);

// Initialize first game
generateGame();
