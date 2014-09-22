// Import function promp from sync-prompt module
var prompt = require('sync-prompt').prompt;

/* generateCards(): function that generates and returns an array of card objects */
function generateCards() {
	var deck = []; // Initialize array of objects
	var suits = ['♠', '♥', '♦', '♣']; 
	var faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; 

	for (var m = 0; m < suits.length; m++) {

		for (var n = 0; n < faces.length; n++) {

			var newCard = {
				suit: suits[m],
				face: faces[n]
			};
			deck.push(newCard);
		}
	}
	return deck;
}

/* shuffle(): Implementation of the Fisher-Yates shuffle algorithm. 
Function takes an array of card objects, picks a random card, and then swaps it with the last card. 
It then picks another random card from remaining cards, then swap to second last card until no remainder.

More info: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
*/
function shuffle(deck) {
	var counter = deck.length; // Counter variable to keep track of remainding objects to be shuffled
	var temp, index; 

	while (counter > 0) {

		// Pick a random index to be shuffled
		index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// Swap last element of the array with current index
		temp = deck[counter]; 
		deck[counter] = deck[index];
		deck[index] = temp;
	}

	return deck;
}


/* calculateHand: 
Calculates and returns the total numeric value in hand.
Takes in an array of card objects and sums all values. 

Number cards ('2' … '10') can translated directly to numeric values: '2' → 2
Face cards ('J', 'Q', 'K') are worth 10 each
Aces ('A') are worth either 1 or 10 depending on which value brings the hand closer to 21 without going over */
function calculateHand(handDeck) {

	var sum = 0;

	for (var i = 0; i < handDeck.length; i++) {
		var face = handDeck[i].face;
		if (face === 'J' || face === 'Q' || face === 'K') {
			sum = sum + 10;
		} else if (face == 'A') {
			sum = sum + 11;
			if (sum > 21) {
				sum = sum - 10;
			}
		} else {
			// Card's face is a number
			face = face * 1; // Type conversion into a number
			sum = sum + face;
		}
	}

	return sum;
}

/* determineWinner():
Determines the winner based on the totals passed in, and return string representation of the winner.
	
First number argument represents total for player's hand, second argument represents total for computer's hand. */
function determineWinner(playerNumber, compNumber) {


	// Either player has 21
	if (playerNumber === 21 || compNumber === 21) {
		if (playerNumber === 21 && compNumber != 21) {
			return "Player Wins";
		} else if (playerNumber != 21 && compNumber === 21) {
			return "Computer Wins";
		} else {
			// Both players have 21
			return "Tie!";
		}
	}
	
	// Either player or computer has bust deck 
	else if (playerNumber > 21 || compNumber > 21) {

		if (playerNumber > 21 && compNumber < 21) {
			return "Computer Wins";
		} else if (compNumber > 21 && playerNumber < 21) {
			return "Player Wins";
		} else {
			return "Tie!";
		}
	} 

	// Neither player nor computer has bust deck and not 21
	else {
		if (playerNumber > compNumber) {
			return "Player Wins";
		} else if (playerNumber < compNumber) {
			return "Computer Wins";
		} else {
			return "Tie!";
		}
	}
}

/* printCards: 
Given an array of cards, return a array of strings to be printed */
function printCards(deck) {
	var printArray = [];
	deck.forEach(function(card) {printArray.push(card.face.concat(card.suit));});
	return printArray;
}

// Create shuffled deck
var deck = shuffle(generateCards());

while (deck.length >= 26) {

	// Deal 2 cards to the player
	var playerHand = [deck.pop(), deck.pop()];

	// Print player's hand and total numeric value
	console.log("Your hand is: " + printCards(playerHand) + " ... for a total of " + calculateHand(playerHand));

	while (calculateHand(playerHand) < 21) {

		// Prompt user for action
		var action = prompt('(h)it or (s)tay\n');

		// User hits, pop a card from shuffled deck and push into player's hand
		if (action === 'h') {
			playerHand.push(deck.pop());
			console.log("Your hand: "  + printCards(playerHand) + " (" + calculateHand(playerHand) + ")"); 
		} else {
			break;
		}
	}

	// Deal computer's hand
	var compHand = [deck.pop(), deck.pop()];

	// Computer will continually "hit" as long as the total of its cards are less than 17
	while (calculateHand(compHand) < 17) {
		compHand.push(deck.pop());
	}

	// Print player's and computer's hand
	console.log("Your hand: " + printCards(playerHand) + " (" + calculateHand(playerHand) 
		+ "), Computer hand: " + printCards(compHand) + " (" + calculateHand(compHand) + ")"  );
	
	// Determine winner & print
	console.log(determineWinner(calculateHand(playerHand), calculateHand(compHand)));

	// Print remaining cards in deck, and print border for aesthestics, ya know
	console.log("\n" + "There are " + deck.length + " cards left in the deck");
	console.log("-----------------\n");

}

if (deck.length < 26)  {
	console.log("Less than 26 cards left. Game over!");
}

