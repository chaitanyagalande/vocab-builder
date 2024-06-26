let flashcards = [];
let currentIndex = 0;

async function loadFlashcards() {
    const response = await fetch('words.json');
    const data = await response.json();
    flashcards = data;
    displayCard(currentIndex);
    populateWordList();
}

function displayCard(index) {
    const card = flashcards[index];
    document.getElementById('word').innerText = card.Word;
    document.getElementById('meaning').innerText = card.Meaning;
    document.getElementById('synonyms').innerText = card.Synonym.join(", ");
    document.getElementById('sentence').innerHTML = card.Sentence;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard(currentIndex);
}

function prevCard() {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayCard(currentIndex);
}

function populateWordList() {
    const wordList = document.getElementById('wordList');
    flashcards.forEach((card, index) => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `<a class="nav-link" onclick="showCard(${index})">${card.Word}</a>`;
        wordList.appendChild(li);
    });
}

function showCard(index) {
    currentIndex = index;
    displayCard(currentIndex);
}

document.addEventListener('DOMContentLoaded', loadFlashcards);
