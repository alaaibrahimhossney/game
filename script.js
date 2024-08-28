const images = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];
let shuffledImages;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let flippedCards = 0;
let timer;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    shuffledImages = shuffle(images);
    shuffledImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    
    this.classList.add('flip');
    this.textContent = this.dataset.image;

    if (!firstCard) {
        firstCard = this;
        timer = setTimeout(() => flipBack(firstCard), 5000); // Flip back if no second card is chosen in 5 seconds
        return;
    }

    secondCard = this;
    clearTimeout(timer);
    lockBoard = true;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
    } else {
        setTimeout(unflipCards, 1000);
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    flippedCards += 2;
    resetBoard();
    checkWin();
}

function unflipCards() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetBoard();
}

function flipBack(card) {
    if (card) {
        card.classList.remove('flip');
        card.textContent = '';
    }
    resetBoard();
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function checkWin() {
    if (flippedCards === images.length) {
        document.getElementById('message').textContent = 'You Win!';
    }
}

function resetGame() {
    flippedCards = 0;
    document.getElementById('message').textContent = '';
    createBoard();
}

document.getElementById('resetButton').addEventListener('click', resetGame);

// Initialize the game
createBoard();
