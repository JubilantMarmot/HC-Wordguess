const words = ['hack', 'club', 'banana', 'raccoon'];
const hangmanWords = ['javascript', 'hangman', 'programming', 'developer', 'challenge'];
const hints = {
    'javascript': 'A popular programming language.',
    'hangman': 'A word-guessing game.',
    'programming': 'The process of creating software.',
    'developer': 'A person who writes code.',
    'challenge': 'A task or situation that tests skills.'
};
let selectedWord = words[Math.floor(Math.random() * words.length)];
let hangmanSelectedWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
let attempts = 0;
let guessedLetters = [];
let correctGuesses = [];
let hangmanAttempts = 6;
let hangmanGuessedLetters = [];
let hangmanCorrectGuesses = [];

function setupWordGuessingGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById('guessButton').addEventListener('click', () => {
        const guess = document.getElementById('guessInput').value.toLowerCase();
        if (guess === selectedWord) {
            document.getElementById('result').innerText = 'Good job! You guessed the word right!';
            document.getElementById('guessButton').disabled = true;
        } else {
            document.getElementById('result').innerText = 'Incorrect, try again!';
        }
    });

    document.getElementById('resetButton').addEventListener('click', () => {
        setupWordGuessingGame();
        document.getElementById('result').innerText = '';
        document.getElementById('guessInput').value = '';
    });
}