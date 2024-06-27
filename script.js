let flashcards = [];
let originalFlashcards = []; // Variable to store the original dataset
let currentIndex = 0;

async function loadFlashcards() {
    const response = await fetch('words.json');
    const data = await response.json();
    flashcards = data;
    originalFlashcards = data; // Store the original data
    displayCard(currentIndex);
    populateWordList();
}

function displayCard(index) {
    const card = flashcards[index];
    document.getElementById('word').innerText = card.Word;
    document.getElementById('meaning').innerText = card.Meaning;

    const synonymsContainer = document.getElementById('synonyms');
    synonymsContainer.innerHTML = '';

    card.Synonym.forEach(synonym => {
        const synonym_word = document.createElement('a');
        synonym_word.className = 'btn synonym-button';
        synonym_word.innerText = synonym;
        synonymsContainer.appendChild(synonym_word);
    });

    document.getElementById('sentence').innerHTML = card.Sentence;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard(currentIndex);
    updateActiveSidebarItem();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayCard(currentIndex);
    updateActiveSidebarItem();
}

function updateActiveSidebarItem() {
    const wordList = document.getElementById('wordList');
    const items = wordList.getElementsByClassName('nav-item');

    // Remove 'active' class from all items
    Array.from(items).forEach(item => {
        item.classList.remove('active');
    });

    // Add 'active' class to the current item
    items[currentIndex].classList.add('active');

    // Scroll to keep the active item in view
    items[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
    });
}



function populateWordList() {
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';

    flashcards.forEach((card, index) => {
        const li = document.createElement('li');
        li.className = 'nav-item';

        if (index === currentIndex) {
            li.classList.add('active');
        }

        li.innerHTML = `<a class="nav-link" onclick="showCard(${index})">${card.Word}</a>`;
        wordList.appendChild(li);
    });
}

function showCard(index) {
    currentIndex = index;
    displayCard(currentIndex);
    updateActiveSidebarItem();
}

document.addEventListener('DOMContentLoaded', () => {
    loadFlashcards();
    createAlphabetButtons();
});

function loadWords(filename, buttonId) {
    document.getElementById('barron-333').classList.remove('active');
    document.getElementById('barron-800').classList.remove('active');

    document.getElementById(buttonId).classList.add('active');

    fetch(filename)
        .then(response => response.json())
        .then(data => {
            flashcards = data;
            originalFlashcards = data; // Update the original dataset
            currentIndex = 0;
            displayCard(currentIndex);
            populateWordList();
        })
        .catch(error => console.error(`Error loading ${filename}:`, error));
}

function createAlphabetButtons() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const container = document.querySelector('.alphabet-buttons');

    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.onclick = () => filterByInitial(letter);
        container.appendChild(button);
    });
}

function filterByInitial(initial) {
    const filteredFlashcards = originalFlashcards.filter(card => card.Word.toLowerCase().startsWith(initial.toLowerCase()));
    if (filteredFlashcards.length > 0) {
        flashcards = filteredFlashcards;
        currentIndex = 0;
        displayCard(currentIndex);
        populateWordList();
    } else {
        flashcards = [];
        currentIndex = 0;
        displayCard(currentIndex);
        populateWordList();
        alert('No words found for this letter');
    }
}

function resetFilter() {
    flashcards = originalFlashcards.slice(); // Reset flashcards to original dataset
    currentIndex = 0;
    displayCard(currentIndex);
    populateWordList();
}
