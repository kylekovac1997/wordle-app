import {validWords} from './wordle-Words.js'

let randomWord = validWords[Math.floor(Math.random() * validWords.length)]

for(let i = 0; i < 5; i++){
    let wordlegrid = document.getElementById('wordle_grid'); 
    let divWordDisplay = document.createElement('div');
    divWordDisplay.setAttribute("class", 'div_word_Display')
    wordlegrid.appendChild(divWordDisplay);
    
    let characters = randomWord.split('');
    let character = characters[i];
    divWordDisplay.textContent = character;
}