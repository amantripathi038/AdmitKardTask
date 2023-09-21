const fs = require('fs');
const readline = require('readline');

// Helper function to tokenize text into words
function tokenizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/)
        .filter((word) => word.length > 0); // Remove empty strings
}

// Function to process a file and return the results
async function processFile(filepath) {
    const wordFrequency = new Map(); // To store word frequencies
    const coOccurrenceMap = new Map(); // To store word pair frequencies

    const rl = readline.createInterface({
        input: fs.createReadStream(filepath),
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const words = tokenizeText(line);
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            // Increment word frequency
            wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);

            // Increment co-occurrence frequencies
            for (let j = i + 1; j < words.length; j++) {
                const adjacentWord = words[j];
                const wordPair = `${word} ${adjacentWord}`;
                coOccurrenceMap.set(wordPair, (coOccurrenceMap.get(wordPair) || 0) + 1);
            }
        }
    }

    // Sort word frequencies
    const sortedWordFrequency = new Map([...wordFrequency.entries()].sort((a, b) => b[1] - a[1]));
    const wordFrequencyArray = [...sortedWordFrequency.entries()];

    // Sort co-occurrence frequencies
    const sortedCoOccurrenceMap = new Map(
        [...coOccurrenceMap.entries()].sort((a, b) => b[1] - a[1])
    );

    // Get the top 5 most frequent words
    const top5Words = Array.from(sortedWordFrequency.keys()).slice(0, 5);

    // Get the top 5 most co-occurred word pairs
    const top5CoOccurredPairs = Array.from(sortedCoOccurrenceMap.keys()).slice(0, 5);
    return {
        top5Words,
        top5CoOccurredPairs,
        wordFrequency: wordFrequencyArray,
    };
}

function analyzeText(text) {
    const wordFrequency = new Map(); // To store word frequencies
    const coOccurrenceMap = new Map(); // To store word pair frequencies

    const lines = text.split('\n');

    for (const line of lines) {
        const words = tokenizeText(line);
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            // Increment word frequency
            wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);

            // Increment co-occurrence frequencies
            for (let j = i + 1; j < words.length; j++) {
                const adjacentWord = words[j];
                const wordPair = `${word} ${adjacentWord}`;
                coOccurrenceMap.set(wordPair, (coOccurrenceMap.get(wordPair) || 0) + 1);
            }
        }
    }

    // Sort word frequencies
    const sortedWordFrequency = new Map([...wordFrequency.entries()].sort((a, b) => b[1] - a[1]));

    // Sort co-occurrence frequencies
    const sortedCoOccurrenceMap = new Map(
        [...coOccurrenceMap.entries()].sort((a, b) => b[1] - a[1])
    );

    // Get the top 5 most frequent words
    const top5Words = Array.from(sortedWordFrequency.keys()).slice(0, 5);

    // Get the top 5 most co-occurred word pairs
    const top5CoOccurredPairs = Array.from(sortedCoOccurrenceMap.keys()).slice(0, 5);

    const wordFrequencyArray = [...sortedWordFrequency.entries()];

    return {
        top5Words,
        top5CoOccurredPairs,
        wordFrequency: wordFrequencyArray,
    };
}

module.exports = { analyzeText, processFile };