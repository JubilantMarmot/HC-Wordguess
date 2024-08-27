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

function setupHangmanGame() {
    hangmanSelectedWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
    hangmanAttempts = 6;
    hangmanGuessedLetters = [];
    hangmanCorrectGuesses = Array(hangmanSelectedWord.length).fill('_');
    updateHangmanDisplay();

    document.getElementById('hangmanGuessButton').addEventListener('click', () => {
        const guess = document.getElementById('hangmanGuessInput').value.toLowerCase();
        if (guess && !hangmanGuessedLetters.includes(guess)) {
            hangmanGuessedLetters.push(guess);
            if (hangmanSelectedWord.includes(guess)) {
                hangmanSelectedWord.split('').forEach((letter, index) => {
                    if (letter === guess) {
                        hangmanCorrectGuesses[index] = guess;
                    }
                });
                if (!hangmanCorrectGuesses.includes('_')) {
                    document.getElementById('hangmanResult').innerText = 'Congratulations! You guessed the word!';
                    document.getElementById('hangmanGuessButton').disabled = true;
                }
            } else {
                hangmanAttempts--;
                if (hangmanAttempts === 0) {
                    document.getElementById('hangmanResult').innerText = `Game over! The word was "${hangmanSelectedWord}".`;
                    document.getElementById('hangmanGuessButton').disabled = true;
                }
            }
            updateHangmanDisplay();
        }
        document.getElementById('hangmanGuessInput').value = '';
    });

    document.getElementById('hangmanResetButton').addEventListener('click', () => {
        setupHangmanGame();
        document.getElementById('hangmanResult').innerText = '';
        document.getElementById('hangmanGuessInput').value = '';
    });
}

function updateHangmanDisplay() {
    document.getElementById('wordDisplay').innerText = hangmanCorrectGuesses.join(' ');
    document.getElementById('hangmanAttemptsLeft').innerText = `Attempts left: ${hangmanAttempts}`;
    document.getElementById('hangmanIncorrectGuesses').innerText = `Incorrect guesses: ${hangmanGuessedLetters.join(', ')}`;
    document.getElementById('hangmanHint').innerText = `Hint: ${hints[hangmanSelectedWord]}`;
}

document.getElementById('wordGuessGame').addEventListener('click', () => {
    document.getElementById('gameSelector').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('wordGuessGameDiv').style.display = 'block';
    document.getElementById('hangmanGameDiv').style.display = 'none';
    setupWordGuessingGame();
});

document.getElementById('hangmanGame').addEventListener('click', () => {
    document.getElementById('gameSelector').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('wordGuessGameDiv').style.display = 'none';
    document.getElementById('hangmanGameDiv').style.display = 'block';
    setupHangmanGame();
});