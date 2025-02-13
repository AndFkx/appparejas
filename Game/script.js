const gameContainer = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

const numbersArray = [
    1, 1, 2, 2, 3, 3, 4, 4,
    5, 5, 6, 6, 7, 7, 8, 8
];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function createCard(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.number = number;

    const numberText = document.createElement('span');
    numberText.classList.add('number');
    numberText.innerText = number;

    card.appendChild(numberText);
    card.addEventListener('click', flipCard);
    return card;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function startGame() {
    gameContainer.innerHTML = ""; // Limpiar tablero antes de iniciar
    shuffle(numbersArray);
    numbersArray.forEach(number => {
        const card = createCard(number);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.number === secondCard.dataset.number;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Reiniciar el juego al presionar el botón
restartButton.addEventListener('click', startGame);

startGame();
