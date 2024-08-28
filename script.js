const words = [
    'hack', 'club', 'banana', 'raccoon',
    'adventure', 'coffee', 'sunflower', 'puzzle', 'giraffe',
    'mystery', 'keyboard', 'computer', 'mountain', 'ocean',
    'city', 'horizon', 'library', 'vacation', 'painting',
    'robot', 'celebration', 'hiking', 'festival', 'journey',
    'notebook', 'squirrel', 'dolphin', 'fountain', 'garden',
    'television', 'airplane', 'marathon', 'penguin', 'sunset',
    'technology', 'exercise', 'drama', 'symphony', 'history'
];

const hangmanWords = [
    'javascript', 'hangman', 'programming', 'developer', 'challenge',
    'algorithm', 'function', 'variable', 'exception', 'interface',
    'library', 'framework', 'database', 'scripting', 'debugging',
    'inheritance', 'refactoring', 'syntax', 'optimization', 'architecture',
    'deployment', 'testing', 'versioning', 'repository', 'frontend',
    'backend', 'software', 'module', 'script', 'compiler',
    'integration', 'network', 'security', 'prototype', 'platform',
    'engineering', 'design', 'innovation', 'usability', 'performance'
];

const hints = {
    'javascript': 'A popular programming language.',
    'hangman': 'A word-guessing game.',
    'programming': 'The process of creating software.',
    'developer': 'A person who writes code.',
    'challenge': 'A task or situation that tests skills.',
    'algorithm': 'A set of steps to solve a problem.',
    'function': 'A block of code that performs a task.',
    'variable': 'A storage location for data.',
    'exception': 'An error that occurs during execution.',
    'interface': 'A point of interaction between systems.',
    'library': 'A collection of prewritten code.',
    'framework': 'A basic structure for building software.',
    'database': 'A system for storing data.',
    'scripting': 'Writing code for automating tasks.',
    'debugging': 'The process of fixing code errors.',
    'inheritance': 'A way to reuse code in OOP.',
    'refactoring': 'Improving code without changing behavior.',
    'syntax': 'The rules for writing code.',
    'optimization': 'Making code run more efficiently.',
    'architecture': 'The design of a software system.',
    'deployment': 'The process of releasing software.',
    'testing': 'Checking software for errors.',
    'versioning': 'Managing changes to code.',
    'repository': 'A storage location for code.',
    'frontend': 'The user interface of a software application.',
    'backend': 'The server-side of a software application.',
    'software': 'Programs and operating systems.',
    'module': 'A self-contained unit of code.',
    'script': 'A small program for automation.',
    'compiler': 'A tool that translates code into machine language.',
    'integration': 'Combining different software components.',
    'network': 'A group of connected computers.',
    'security': 'Protecting software from unauthorized access.',
    'prototype': 'An early model of a software product.',
    'platform': 'The environment in which software runs.',
    'engineering': 'The application of scientific principles to design.',
    'design': 'The plan for creating software.',
    'innovation': 'Introducing new ideas or methods.',
    'usability': 'How easy and intuitive software is to use.',
    'performance': 'How well software performs its tasks.'
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