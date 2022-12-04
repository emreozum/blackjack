let player = {
    name: "Emre",
    chips: 200,
    }

let dealer = {
    name: "Dealer",
    chips: 200,
    }

let playerCards = []
let dealerCards = []
let playerSum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let playerSumEl = document.getElementById("player-sum-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let playerCardsEl = document.getElementById("player-cards-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")

playerEl.textContent = player.name + ": $" + player.chips
dealerEl.textContent = dealer.name + ": $" + dealer.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    hasBlackJack = false
    isAlive = true
    let playerfirstCard = getRandomCard()
    let playersecondCard = getRandomCard()
    playerCards = [playerfirstCard, playersecondCard]
    playerSum = playerfirstCard + playersecondCard

    let dealerfirstCard = getRandomCard()
    let dealersecondCard = getRandomCard()
    dealerCards = [dealerfirstCard, dealersecondCard]
    dealerSum = dealerfirstCard + dealersecondCard

    renderGame()
}

function renderGame() {
    playerCardsEl.textContent = "Player Cards: "
    dealerCardsEl.textContent = "Dealer Cards: "
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsEl.textContent += playerCards[i] + " "
    }
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    
    playerSumEl.textContent = "Player Sum: " + playerSum
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum
    if ((playerSum || dealerSum) <= 20) {
        message = "Do you want to draw a new card?"
        messageEl.textContent = message
    } else if (playerSum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        playerEl.textContent = player.name + ": $" + (player.chips += 10)
        dealerEl.textContent = dealer.name + ": $" + (dealer.chips -= 10)
        messageEl.textContent = message
    } else if (dealerSum === 21) {
        message = "Dealer has Blackjack!"
        hasBlackJack = true
        playerEl.textContent = player.name + ": $" + (player.chips -= 10)
        dealerEl.textContent = dealer.name + ": $" + (dealer.chips += 10)
        messageEl.textContent = message
    } else if (playerSum > 21) {
        message = "You Lost!"
        isAlive = false
        playerEl.textContent = player.name + ": $" + (player.chips -= 10)
        dealerEl.textContent = dealer.name + ": $" + (dealer.chips += 10)
        messageEl.textContent = message
        
    } else if (dealerSum > 21) {
        message = "You Won!"
        isAlive = false
        playerEl.textContent = player.name + ": $" + (player.chips += 10)
        dealerEl.textContent = dealer.name + ": $" + (dealer.chips -= 10)
        messageEl.textContent = message
    }
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        playerSum += card
        playerCards.push(card)
        dealerSum += card
        dealerCards.push(card)
        renderGame()        
    }
}

