# WordleWordle Game

A simple implementation of the popular Wordle game, where the player has to guess a five-letter word within a limited number of attempts.

## Installation
To set up the project locally, please follow these steps:

```
git clone https://git@github.com:YOUR_USERNAME/wordle-app.git
```

## Features

- Randomly selected five-letter words from a list of valid words.
- Allows the user to enter words using a virtual keyboard.
- Provides feedback on correct letters, partially correct letters, and incorrect letters.
- Displays the number of remaining .
- Option to give up and reveal the correct word.
- Option to restart the game after winning, losing, or giving up.
- Click sound when interacting with buttons.
```js
  const click = new Audio("click.mp3");
    const buttons = document.querySelectorAll("button");
   
    buttons.forEach(button =>{
      button.addEventListener('click', ()=>{
        click.play();
      })
    }) 
```
## How to Play

1. Open the `index.html` file in your web browser.
2. Read the game rules and click the 'Start Game' button to begin.
3. Use the virtual keyboard to input your five-letter word guess.
4. Press the 'enter' button on the virtual keyboard to submit your guess.
5. The game will provide feedback on your guess. Correct letters will be highlighted in green, partially correct letters in yellow, and incorrect letters in red.
6. Keep guessing until you either correctly guess the word or run out of attempts.
7. At any point, you can click the 'Give Up' button to reveal the correct word and start a new game.



