[Homework #1 - Blackjack](http://foureyes.github.io/csci-ua.0480-fall2014-002/assignments.html#hw01)

A commandline player Blackjack game with 2 players - the user and the computer.
Written and node.js and uses a synchronous prompt library to gather input.

- Each player is dealt 2 cards from a 52 card deck, with each card representing some numeric value
- Each player can choose to be dealt more cards ("hit") or stop being dealt cards ("stand")
- The sum of the numeric values of the cards in a player's hand determines if they've one
- Once both players have either chosen to stand or have a hand with a total that's more than 21 ("bust"), the hands are compared
- The player with the hand that's closest to 21 without going over wins
- Ties are possible (either same total, or both player "bust")

