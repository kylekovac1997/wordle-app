import {validWords} from './wordle-Words.js'

//generates the random word from the import of validWords array
let randomWord = validWords[Math.floor(Math.random() * validWords.length)];
let wordlegrid = document.getElementById('wordle_grid'); 
let winCounter = 0

//creates the display grid for the letters
for(let i = 1; i <= 6; i++){
  let divWordDisplay = document.createElement('div');
  divWordDisplay.setAttribute("class", 'div_word_Display');
  wordlegrid.appendChild(divWordDisplay);
 
  let characters = randomWord.split('');
  for(let j = 0; j < characters.length; j++){  
    let pElementWordDisplay = document.createElement("input");
    divWordDisplay.appendChild(pElementWordDisplay);
    pElementWordDisplay.textContent = characters[j];
    pElementWordDisplay.classList.add('pElementWordDisplayStyle');
    pElementWordDisplay.setAttribute('maxlength', 1);

    pElementWordDisplay.addEventListener('input', (event) => {
      let inputElement = event.target;
      let letterValue = inputElement.value;

      let index = Array.from(inputElement.parentElement.children).indexOf(inputElement);
    
      //function to check if the letter is correct, partially correct or incorrect      
      for (let j in characters) {
        if (letterValue.toUpperCase() == characters[index]) {
          inputElement.classList.add("correct");
        } else if (
          characters.includes(letterValue.toUpperCase())) 
        {
          inputElement.classList.add("partially-correct");
        } else {
          inputElement.classList.add("incorrect");
        }
      }
      
      // Check if all input elements in the div have values
      let allInputsFilled = Array.from(inputElement.parentElement.children).every(child => child.value);
     
      if (allInputsFilled) {
        // Disable all input elements in the div
        Array.from(inputElement.parentElement.children).forEach(child => child.disabled = true);
        // Call checkWord function
        checkWord(inputElement.parentElement);
      } else {
        // Move focus to the next input element
        inputElement.nextElementSibling.focus();
      }
    });
  }
}

//checks players input to make sure its a word
function checkWord(parentElement) {
  // Get all the input elements
  const inputElements = parentElement.querySelectorAll('input');

  // Get an array of input values
  const inputValues = Array.from(inputElements).map(inputElement => inputElement.value).join('');

  // Check if the input word is valid
  const isValidWord = validWords.includes(inputValues.toUpperCase());

  if (isValidWord) {
    // The input word is valid
    console.log('Valid word');
    
    // Move focus to the first input element of the next div
    const nextDiv = parentElement.nextElementSibling;
    if (nextDiv) {
      nextDiv.querySelector('input').focus();
    }
  } else {
    // The input word is invalid
    console.log('Invalid word');
  }
}
