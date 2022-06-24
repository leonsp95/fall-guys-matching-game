const cards = document.querySelectorAll(".card");
let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {    
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip")
    if(!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    flippedCard = false;
    checkforMatch();
}

function checkforMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();

}

function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
})