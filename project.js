import {validWords} from './wordle-Words.js'

//Generates random word from wordle-words.js array.
let randomWord = validWords[Math.floor(Math.random() * validWords.length)];
let wordlegrid = document.getElementById('wordle_grid'); 




//A for loop to create 5 Divs with a class set to div word display.
for(let i = 1; i <= 6; i++){
    let hiddenWord = [];
    
    let divWordDisplay = document.createElement('div');
    divWordDisplay.setAttribute("class", 'div_word_Display');
    wordlegrid.appendChild(divWordDisplay);
   
    //This is assiging the value characters to the random word to split each letter individually. 
    let characters = randomWord.split('');

    hiddenWord.push(characters)
    console.log(hiddenWord)
    // A for loop here is to assign each individually letter to a P element  and append it diretly to div Word Display.
    for(let j = 0; j < characters.length; j++){
        
        let pElementWordDisplay = document.createElement("input");
        divWordDisplay.appendChild(pElementWordDisplay);
        pElementWordDisplay.textContent = characters[j];
        pElementWordDisplay.classList.add('pElementWordDisplayStyle')
         
        pElementWordDisplay.addEventListener("input", function(event){

           let inputIndex = [...divWordDisplay.children].indexOf(event.target);
           let inputValue = event.target.value.toLowerCase();
           let character = hiddenWord[inputIndex].toLowerCase();

            if (pElementWordDisplay === characters) {
                event.target.classList.add('correct');
              } else {
                event.target.classList.remove('correct');
              }
              if (hiddenWord.toLowerCase().includes(inputValue)) {
                divWordDisplay.classList.add('contains_word');
              } else {
                divWordDisplay.classList.remove('contains_word');
              }
        })
    }
}

