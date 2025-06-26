const board = document.getElementById('game-board');
const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒'];
let cards = [...icons, ...icons];
let flippedCards = [];
let lockBoard = false;

shuffle(cards);
createBoard();

function shuffle(arr) {
    arr.sort(() => 0.5 - Math.random());
}

function createBoard() {
    cards.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card', 'p-2'); 

        card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${icon}</div>
        </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    const firstIcon = firstCard.querySelector('.card-back').textContent;
    const secondIcon = secondCard.querySelector('.card-back').textContent;

    if (firstIcon === secondIcon) {
        flippedCards = [];
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}