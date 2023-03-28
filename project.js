import { validWords } from './wordle-Words.js';

function initializeWordleGrid() {
  // Generate the random word from the import of validWords array
  let randomWord = validWords[Math.floor(Math.random() * validWords.length)];
  let wordlegrid = document.getElementById('wordle_grid');
  console.log(randomWord);

  // Creates the display grid for the letters
  for (let i = 1; i <= 6; i++) {
    let divWordDisplay = document.createElement('div');
    divWordDisplay.setAttribute('class', 'div_word_Display');
    wordlegrid.appendChild(divWordDisplay);

    let characters = randomWord.split('');

    for (let j = 0; j < characters.length; j++) {
      let inputElementWordDisplay = document.createElement('input');
      divWordDisplay.appendChild(inputElementWordDisplay);
      inputElementWordDisplay.value = ''; // Set the initial value to empty
      inputElementWordDisplay.classList.add('pElementWordDisplayStyle');
      inputElementWordDisplay.setAttribute('maxlength', 1);

      inputElementWordDisplay.addEventListener('input', (event) => {
        let inputElement = event.target;

        // Check if all the input elements in the current div are filled
        let isDivFilled = true;
        const inputElementsInDiv = divWordDisplay.querySelectorAll('input');
        inputElementsInDiv.forEach((input) => {
          if (!input.value) {
            isDivFilled = false;
          }
        });

        if (isDivFilled) {
          checkWord(divWordDisplay, inputElementsInDiv, characters); // Check if the word is valid
        } else {
          // Move focus to the next input element
          inputElement.nextElementSibling.focus();
        }
      });
    }
  }
}

function checkWord(divWordDisplay, inputElements, characters) {
  let inputValues = '';

  inputElements.forEach((inputElement) => {
    inputValues += inputElement.value.toUpperCase(); // Combine all the input values
  });

  let isValidWord = validWords.includes(inputValues);

  if (isValidWord) {
    // Move focus to the first input element of the next div
    const nextDiv = divWordDisplay.nextElementSibling;
   
    if (nextDiv) {
      nextDiv.querySelector('input').focus();
      
      for (let char in inputElements) {
        if (inputValues[char] == characters[char]) {
          inputElements[char].classList.add('correct');
        } else if (characters.includes(inputValues[char])) {
          inputElements[char].classList.add('partially-correct');
        } else {
          inputElements[char].classList.add('incorrect');
        }
      }
    }
  } else {
    // The input word is invalid
    alert('Invalid word. Enter a new word');
    inputElements.forEach((inputElement) => {
      inputElement.value = ''; // Reset the input values
      inputElement.disabled = false; // Enable the input elements
      inputElement.classList.remove('correct', 'partially-correct', 'incorrect');
    });
    inputElements[0].focus();
  }



}

initializeWordleGrid();