const words = ['hack', 'club', 'banana', 'raccoon'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;

document.getElementById('guessButton').addEventListener('click', () => {
    const guess = document.getElementById('guessInput').value.toLowerCase();
    if (guess === selectedWord) {
        document.getElementById('result').innerText = 'Good job! You guessed the word right!';
    } else {
        attempts++;
        document.getElementById('result').innerText = `Oh no, incorrect! Attempts: ${attempts}`;
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    attempts = 0;
    document.getElementById('result').innerText = '';
    document.getElementById('guessInput').value = '';
});
