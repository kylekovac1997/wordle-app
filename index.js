import { validWords } from './wordle-Words.js';

function gameFunction() {
  const attempts = 6;
  let currentRow = 0;
  let currentColumn = 0;
  let currentWord = '';
  let guesses = 5;
  let gridColumns = [];
  const randomWord = () => {
    currentWord = validWords[Math.floor(Math.random() * validWords.length)];
  }
  
  const initializeWordleGrid = () => {
    randomWord()
    let wordleGrid = document.getElementById('wordle_grid');
    wordleGrid.innerHTML = '';
    
    console.log('currentWord:', currentWord);
    // Creates an array to hold all grid columns

  
    // Creates the grid row
    for (let i = 0; i < attempts; i++) {
      let gridRow = document.createElement('div');
      gridRow.className = 'grid-row';
      gridRow.id = 'row-' + i;
      wordleGrid.appendChild(gridRow);
  
      // Creates the grid columns
      for (let j = 0; j < 5; j++) {
        let gridColumn = document.createElement('div');
        gridColumn.className = 'grid-column';
        gridColumn.id = 'column-' + j;
        gridColumn.value = currentWord[j];
        gridRow.appendChild(gridColumn);
        gridColumns.push(gridColumn);
  
        // Sets the current column to the first empty column in the row
        if (currentRow === i && currentColumn === 0 && gridColumn.textContent === '') {
          currentColumn = gridColumn;
        }
        gridColumn.addEventListener('input', ()=>{
          currentColumn = this;
        })
      }
    }
  
    // Return the array of grid columns
    return gridColumns;
  }
  

  const keyboard = (gridColumns) => {
    let keys = document.getElementsByClassName('key');
    let currentColumn = gridColumns[0];
  
    // The event listener for the keyboard
    for (let keyElement of keys) {
      let key = keyElement.textContent;
      keyElement.addEventListener('click', function() {
  
        switch (key) {
          // The backspace key to move back by 1 and earse the input word
          case '⇦':
            currentColumn.textContent = currentColumn.textContent.slice(0, -1);
            if (currentColumn.textContent.length === 0 && currentColumn.previousElementSibling) {
              currentColumn = currentColumn.previousElementSibling;
            }
            break;
            // The enter button submits the word to be checked if correct will move down 1 row
          case 'ent':
            checkWord();
            guesses--;
            currentRow += 1;        
            if (currentRow >= attempts) {
              currentRow = 0;
            }
            currentColumn = gridColumns[currentRow * 5];
           
            break;
            // Each key will display its own value letter to the grid and will fill the space by one and move to its next sibling 
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
  // Get the array of grid columns
  gridColumns = initializeWordleGrid(); 
  
  // Pass the array of grid columns to the keyboard function
  keyboard(gridColumns); 

  // This checks the players input.
  const checkWord = () => {
    console.log(`Checking row ${currentRow}...`);
    
    const wordColumns = document.querySelectorAll('.grid-row#row-' + currentRow + ' .grid-column');
    const joinedWord = [...wordColumns].map(column => column.textContent).join('');
    const correctColumns = [];
    const partiallyCorrectColumns = [];
    const incorrectColumns = [];
    let correctCount = 0;
    console.log(`Joined word: ${joinedWord}`);
    
    if (joinedWord === '') {
      return;
    }
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
        win();
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
      if(guesses === 0){
        lost()
      }
      document.getElementById('guesses-counter').textContent = guesses;
    } else {
      alert('Invalid word');
      guesses++;
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
    
    console.log(guesses)
  };
  
  
  const win = () => {
    let winDialog = document.getElementById('win');
    let winText = document.getElementById('win_Text');
    winText.textContent = `Your word was ${currentWord}`;
    winDialog.appendChild(winText);
    winDialog.showModal();
    let playAgainWinBtn = document.getElementById('play_Again_Win');
  
    playAgainWinBtn.addEventListener('click', () => {
      winText.textContent = ''; 
      winDialog.close();
      resetGame()
     
    });
  };
  
  const lost = () => {
    let lostDialog = document.getElementById('lost');
    let lostText = document.getElementById('lost_Text');
    if (lostText) {
      lostText.textContent = `Your word was ${currentWord}`;
    }
    if (lostDialog) {
      lostDialog.appendChild(lostText);
      lostDialog.showModal();
      let playAgainLostBtn = document.getElementById('play_Again_Lost');
    
      playAgainLostBtn.addEventListener('click', () => {
        if (lostDialog) {
          lostDialog.close();
        }
        if (lostText) {
          lostText.textContent = '';
        }
        resetGame()
      });
    }
  };
  
  const giveUp = () => {
    let giveUpDialog = document.getElementById('give_Up_Dialog');
  
    if (!giveUpDialog.hasAttribute('open')) {
      let giveUpText = document.getElementById('give_Up_Text');
      giveUpText.textContent = `The word was ${currentWord}`;
      giveUpDialog.appendChild(giveUpText);
      giveUpDialog.showModal()
      let playAgainBtn = document.getElementById('play_Again');
  
      playAgainBtn.addEventListener('click', ()=>{
        giveUpDialog.close();
        giveUpText.textContent = ''; 
        resetGame();
      });
    };
  };
  

  const resetGame = () => {
    // Clear the wordle grid
    const wordleGrid = document.getElementById('wordle_grid');
    wordleGrid.innerHTML = '';
  
    // Reset game variables
    currentRow = 0;
    currentColumn = 0;
    currentWord = '';
    guesses = 5;
    gridColumns = [];
    document.getElementById('guesses-counter').textContent = 6;
    // console.log(currentWord);
    randomWord();
    // Restart the game
    gameFunction()
  };
  
  
  
  const giveUpButton = document.getElementById('give_Up');
  giveUpButton.addEventListener('click', () => {
    giveUp(); // Call the giveUp function
  });

  

 
}



  window.addEventListener('load', function() {
    var dialog = document.getElementById('game_Rules');
    var startButton = document.getElementById('start_Game');
    
    const click = new Audio("click.mp3");
    const buttons = document.querySelectorAll("button");
   
    buttons.forEach(button =>{
      button.addEventListener('click', ()=>{
        click.play();
      })
    }) 
    dialog.style.display = 'block';
    
    startButton.addEventListener('click', function() {
      document.getElementById('give_Up').style.display = 'block';
      document.getElementById('main_Header').style.display = 'block';
      document.getElementById('remaining-guesses').style.display = "block"
      dialog.style.display = 'none';
      gameFunction();  
    });
  });
