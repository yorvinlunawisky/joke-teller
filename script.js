const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


//Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing our joke to voiceRSS API.
function tellMe(joke) {
    VoiceRSS.speech({
                key: '05ed8c5815c34badb0d941d86a30fc1b',
                src: joke,
                hl: 'en-us',
                v: 'Linda',
                r: 0, 
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
}

// Get jokes from Joke API.
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke =`${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke
        }
        //Text-to-Speech
        tellMe(joke);
        //Disable the button
        toggleButton();
    }
     catch(error) {
         //Catch erros here.
         console.log('Something happened', error)
     }
}

//Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);