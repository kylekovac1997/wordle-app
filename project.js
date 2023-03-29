import { validWords } from './wordle-Words.js';

function gameFunction() {
  const attempts = 6;
  let currentRow = 0;
  let currentColumn = 0;
  let currentWord = '';

  const randomWord = () => {
    currentWord = validWords[Math.floor(Math.random() * validWords.length)];
  }

  const initializeWordleGrid = () => {
    let wordleGrid = document.getElementById('wordle_grid');
    wordleGrid.innerHTML = '';

    randomWord();

    let gridColumns = []; // create an array to hold all grid columns

    for (let i = 0; i < attempts; i++) {
      let gridRow = document.createElement('div');
      gridRow.className = 'grid-row';
      gridRow.id = 'row-' + i;
      wordleGrid.appendChild(gridRow);

      for (let j = 0; j < 5; j++) {
        let gridColumn = document.createElement('div');
        gridColumn.className = 'grid-column';
        gridColumn.id = 'column-' + j;
        gridColumn.value = currentWord[j];
        console.log(gridColumn.value)
        gridRow.appendChild(gridColumn);
        gridColumns.push(gridColumn); // add the column to the array

        if (j === 0) {
          currentColumn = gridColumn; // set the current column to the first column in the row
        }
        gridColumn.addEventListener('input', ()=>{
          currentColumn = this;
        })
      }
    }

    return gridColumns; // return the array of grid columns
  }

  const keyboard = (gridColumns) => {
    let keys = document.getElementsByClassName('key');
    let currentColumn = gridColumns[0];
  
    for (let keyElement of keys) {
      let key = keyElement.textContent;
      keyElement.addEventListener('click', function() {
  
        switch (key) {
          case '⇦':
            currentColumn.textContent = currentColumn.textContent.slice(0, -1);
            if (currentColumn.textContent.length === 0 && currentColumn.previousElementSibling) {
              currentColumn = currentColumn.previousElementSibling;
            }
            break;
          case 'ent':
            checkWord(currentWord,gridColumns);
            currentRow += 1;
            if (currentRow >= attempts) {
              currentRow = 0;
            }
            currentColumn = gridColumns[currentRow * 5];
            break;
          default:
            if (currentColumn.textContent.length < 1) {
              currentColumn.textContent += key;
              if (currentColumn.nextElementSibling) {
                currentColumn = currentColumn.nextElementSibling;
              }
            }
        }
      });
    }
  }

  let gridColumns = initializeWordleGrid(); // get the array of grid columns

  keyboard(gridColumns); // pass the array of grid columns to the keyboard function

  const checkWord = () => {
    const wordColumns = document.querySelectorAll('.grid-row#row-' + currentRow + ' .grid-column');
    const joinedWord = [...wordColumns].map(column => column.textContent).join('');
    const correctColumns = [];
    const partiallyCorrectColumns = [];
    const incorrectColumns = [];
    let correctCount = 0;
  
    if (validWords.includes(joinedWord)) {
      for (let i = 0; i < joinedWord.length; i++) {
        const userInput = wordColumns[i].textContent;
        const currentWordLetter = currentWord[i];
  
        if (userInput === currentWordLetter) {
          correctCount++;
          correctColumns.push(wordColumns[i]);
        } else if (currentWord.includes(userInput)) {
          partiallyCorrectColumns.push(wordColumns[i]);
        } else {
          incorrectColumns.push(wordColumns[i]);
        }
      }
  
      if (correctCount === 5) {
        for (let column of wordColumns) {
          column.classList.add('correct');
        }
        alert('You won!');
      } else if (correctCount > 0) {
        for (let column of correctColumns) {
          column.classList.add('correct');
        }
        for (let column of partiallyCorrectColumns) {
          column.classList.add('partially-correct');
        }
        for (let column of incorrectColumns) {
          column.classList.add('incorrect');
        }
      } else {
        for (let column of partiallyCorrectColumns) {
          column.classList.add('partially-correct');
        }
        for (let column of incorrectColumns) {
          column.classList.add('incorrect');
        }
      }
    } else {
      alert('Invalid word');
      wordColumns.forEach(column => {
        column.textContent = '';
        column.classList.remove('correct', 'partially-correct', 'incorrect');
      });
      currentRow -= 1;
      if (currentRow < 0) {
        currentRow = attempts - 1;
      }
      currentColumn = gridColumns[currentRow * 5];
      currentColumn.focus();
    }
  };
  
}  

gameFunction();
