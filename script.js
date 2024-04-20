new Sortable(document.getElementById('sort-group-1'), {
    group: {
        name: 'shared',

    },
    animation: 150, // Set animation duration (in milliseconds)
});

new Sortable(document.getElementById('sort-group-2'), {
    group: {
        name: 'shared',

    },
    // sort: false,
    animation: 150, // Set animation duration (in milliseconds)
});



let usedKeys = [];
let score = 0;

const list = document.getElementById('answerBox');

function fetchWordsData() {
    fetch('./easy.json')
        .then((response) => response.json())
        .then((data) => {
            const keys = Object.keys(data).filter(key => !usedKeys.includes(key)); // Filter out used keys
            if (keys.length === 0) {
                console.log('All keys have been used.');
                return;
            }
            const selectedWord = keys[Math.floor(Math.random() * keys.length)];
            const wordAna = data[selectedWord];
            usedKeys.push(selectedWord);
            console.log(selectedWord);
            console.log(wordAna);
            splitStringAndCreateElements(selectedWord, document.getElementById('sort-group-2'));
            createListItems(wordAna.length)

            // Add event listener after data is fetched
            document.getElementById('submitBtn').addEventListener('click', () => {
                checkAnagram(wordAna);
            });

            // console.log(wordAna.length);

        })
        .catch((error) => {
            console.error('Error fetching JSON:', error);
        });
}

fetchWordsData();

function splitStringAndCreateElements(str, parentElement) {
    const letters = str.split('');

    letters.forEach((letter) => {
        const letterElement = document.createElement('li');
        letterElement.textContent = letter;

        parentElement.appendChild(letterElement);
    });
}


const correctWordArray = [];

function checkAnagram(anagram) {
    const answerBoxText = document.getElementById('sort-group-1').textContent;

    const foundWord = anagram.find(word => word === answerBoxText)

    if (correctWordArray.find(word => word === answerBoxText)) {
        alert('word is already submitted');
    } else {
        if (foundWord) {
            console.log(anagram.indexOf(foundWord));
            console.log(list.childNodes[anagram.indexOf(foundWord)].textContent += ` ${foundWord}`);
            correctWordArray.push(foundWord);
            score++;
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }
    }
}


function createListItems(number) {
    for (let i = 1; i <= number; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `${i}.`;
        list.appendChild(listItem);
    }
    return list;
}


// Add event listener for clear button outside fetchWordsData
let clearBtn = document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('sort-group-1').textContent = '';
});
