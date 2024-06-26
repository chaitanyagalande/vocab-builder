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

    // Clear previous synonyms
    const synonymsContainer = document.getElementById('synonyms');
    synonymsContainer.innerHTML = '';

    // Create a button-like element for each synonym
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
    displayCard(currentIndex); // Update the displayed flashcard
    updateActiveSidebarItem(); // Update the active item in the sidebar
}

function prevCard() {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayCard(currentIndex); // Update the displayed flashcard
    updateActiveSidebarItem(); // Update the active item in the sidebar
}

function updateActiveSidebarItem() {
    const wordList = document.getElementById('wordList');
    const items = wordList.getElementsByClassName('nav-item');

    // Remove active class from all items
    Array.from(items).forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to the current item
    items[currentIndex].classList.add('active');
}

function populateWordList() {
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = ''; // Clear previous list items

    // Display total count of words at the top
    const totalCount = document.createElement('li');
    totalCount.className = 'nav-item total-count';
    totalCount.textContent = `Total: ${flashcards.length}`;
    wordList.appendChild(totalCount);

    // Add individual word items
    flashcards.forEach((card, index) => {
        const li = document.createElement('li');
        li.className = 'nav-item';

        // Highlight the current word
        if (index === currentIndex) {
            li.classList.add('active');
        }

        li.innerHTML = `<a class="nav-link" onclick="showCard(${index})">${card.Word}</a>`;
        wordList.appendChild(li);
    });
}

function showCard(index) {
    currentIndex = index;
    displayCard(currentIndex); // Update the displayed flashcard
    populateWordList(); // Update the sidebar highlighting
}

document.addEventListener('DOMContentLoaded', loadFlashcards);

function loadWords(filename, buttonId) {
    // Remove active class from all buttons
    document.getElementById('barron-333').classList.remove('active');
    document.getElementById('barron-800').classList.remove('active');

    // Add active class to the clicked button
    document.getElementById(buttonId).classList.add('active');

    // Fetch and load the JSON data
    fetch(filename)
        .then(response => response.json())
        .then(data => {
            flashcards = data;
            currentIndex = 0;
            displayCard(currentIndex);
            populateWordList();
        })
        .catch(error => console.error(`Error loading ${filename}:`, error));
}