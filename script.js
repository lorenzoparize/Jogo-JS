const cards = [
    { id: 1, value: 'A' }, { id: 2, value: 'B' }, { id: 3, value: 'C' }, { id: 4, value: 'D' },
    { id: 5, value: 'A' }, { id: 6, value: 'B' }, { id: 7, value: 'C' }, { id: 8, value: 'D' }
];

let flippedCards = [];
let matchedCards = [];

function startGame() {
    // Embaralha as cartas
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    const board = document.getElementById('board');
    board.innerHTML = ''; // Limpa o tabuleiro antes de começar

    // Cria os elementos das cartas no tabuleiro
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.value = card.value;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });

    flippedCards = [];
    matchedCards = [];
}

function flipCard(event) {
    const card = event.target;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return; // Impede que a carta seja virada novamente ou clicada após ser emparelhada
    }

    // Vira a carta
    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    // Se houver 2 cartas viradas, verifica se são um par
    if (flippedCards.length === 2) {
        setTimeout(() => checkMatch(), 1000);
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        // Se for um par, marca as cartas como correspondidas
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    } else {
        // Se não for, vira as cartas de volta
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
    }

    flippedCards = [];

    // Verifica se o jogo foi ganho
    if (matchedCards.length === cards.length) {
        setTimeout(() => alert('Parabéns! Você ganhou o jogo!'), 500);
    }
}

// Inicia o jogo quando a página carrega
startGame();
