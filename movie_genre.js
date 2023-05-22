const quizForm = document.querySelector('.quiz-form');
const nameLabel = document.querySelector('#name-label');
const nameInput = document.querySelector('#name');
let totalScore = 0;

const movieGenres = [{
  genre: 'Action & Thriller',
  lowestScore: 6,
  highestScore: 8,
  gif: './assets/action-thriller.gif'
}, {
  genre: 'Horror',
  lowestScore: 9,
  highestScore: 11,
  gif: './assets/horror.gif'
}, {
  genre: 'Comedy',
  lowestScore: 12,
  highestScore: 14,
  gif: './assets/comedy.gif'
}, {
  genre: 'Mystery',
  lowestScore: 15,
  highestScore: 17,
  gif:'./assets/mystery.gif'
}, {
  genre: 'Drama',
  lowestScore: 18,
  highestScore: 20,
  gif: './assets/drama.gif'
}, {
  genre: 'Romance',
  lowestScore: 21,
  highestScore: 23,
  gif: './assetes/romance.gif'
}];


const questions = [{
  type: 'radio',
  question: 'When you’re watching a movie, what are you thinking about the most?',
  responses: [{response: 'The plot', value: 1}, 
              {response: 'The amount of time it took to make the movie', value: 2}, 
              {response: 'The actions of the characters', value: 3}, 
              {response: 'bro i’m just trying to watch the movie because the trailer looked good', value: 4}]        
}, {
  type: 'radio',
  question: 'How often do you want to be alone?',
  responses: [{response: 'Pretty much every day', value: 1}, 
              {response: 'There are times I would like to be alone but there are other times when I need company', value: 2}, 
              {response: 'I like to spend most of my time with a close friend or two', value: 3}, 
              {response: 'I need to socialize!!!', value: 4}]                    
}, {
  type: 'radio',
  question: 'What’\s the best part of the movie?',
  responses: [{response: 'The beginning', value: 1}, 
              {response: 'The fight scenes', value: 2}, 
              {response: 'When a character dies', value: 3}, 
              {response: 'The ending', value: 4}]                    
}, {
  type: 'radio',
  question: 'The typical hero in my film is:',
  responses: [{response: 'A clueless man or woman that succeeds in the end', value: 1}, 
              {response: 'A fearless character with a lot of common sense', value: 2}, 
              {response: 'A character with zero common sense', value: 3}, 
              {response: 'The person that helps others', value: 4}]                    
}, {
  type: 'radio',
  question: 'What’s your favorite day of the week:',
  responses: [{response: 'Monday', value: 1}, 
              {response: 'Tuesday', value: 1}, 
              {response: 'Wednesday', value: 1}, 
              {response: 'Thursday', value: 1}, 
              {response: 'Friday', value: 2}, 
              {response: 'Saturday', value: 3}, 
              {response: 'Sunday', value: 3}]                    
}, {
  type: 'radio',
  question: 'How would your friends describe you in one word?',
  responses: [{response: 'Outgoing', value: 1}, 
              {response: 'Intuitive', value: 2}, 
              {response: 'Intelligent', value: 3}, 
              {response: 'Carefree', value: 4}]                    
}];

nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (nameInput.value === '') {
      alert('Enter a valid string!')
    } else {
      nameLabel.style.pointerEvents = 'none';
      nameInput.style.pointerEvents = 'none';
      nameInput.blur();
      const ageLabel = document.createElement('label');
      const ageInput = document.createElement('input');
      ageLabel.setAttribute('id', 'age-label');
      ageInput.type = 'number';
      ageInput.classList.add('age');
      ageLabel.textContent = 'What\'s your age?';
      quizForm.appendChild(ageLabel);
      quizForm.appendChild(ageInput);
      ageInput.focus();
      fadeIn(ageLabel);
      fadeIn(ageInput);
      ageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          if (ageInput.value === '') {
            alert('Enter a valid number!')
          } else if (ageInput.value < 1 || ageInput.value > 140) {
            alert('Enter a number between 1 and 140!');
          } else {
            quizForm.innerHTML = '';
            fadeIn(quizForm);
            const submitButton = document.createElement('input');
            const welcomeText = document.createElement('div');
            const resetButton = document.createElement('button');
            resetButton.textContent = 'Clear Form';
            resetButton.classList.add('reset-button');
            submitButton.classList.add('submit-button');
            submitButton.type = 'submit';
            welcomeText.classList.add('welcome-text');
            welcomeText.innerHTML = 'Hello ' + nameInput.value  + '! Answer these questions to find out what movie you like.';            
            quizForm.appendChild(welcomeText);
            quizForm.appendChild(resetButton);
            resetButton.addEventListener('click', () => {
              quizForm.reset();
            })
            for (let i = 0; i < questions.length; i++) {
              const questionContainer = document.createElement('div');
              const question = document.createElement('label');
              questionContainer.classList.add('question-container');
              question.name = questions[i].question;
              question.classList.add('question');
              question.innerHTML = questions[i].question;
              quizForm.appendChild(questionContainer);
              questionContainer.appendChild(question);
              console.log(questions[i].responses.length);
              for (let j = 0; j < questions[i].responses.length; j++) {
                const responseContainer = document.createElement('div');
                const responseText = document.createElement('label');
                const response = document.createElement('input');
                responseContainer.classList.add('response-container');
                responseText.classList.add('response-text');
                responseText.innerHTML = questions[i].responses[j].response;
                response.required = 'true';
                response.type = questions[i].type;
                response.name = questions[i].question;
                response.classList.add('response');
                responseContainer.appendChild(response)
                responseContainer.appendChild(responseText);
                questionContainer.appendChild(responseContainer);
                quizForm.appendChild(questionContainer);
                submitButton.addEventListener('click', (e) => {
                  e.preventDefault();
                  determineResult(response, i ,j);  
                }); 
              }
            }
          quizForm.appendChild(submitButton);
      }  
  }
});
    }
  }
});

function determineResult(response, i, j) {
  if (response.checked == true) {
    totalScore += questions[i].responses[j].value;
  };
  quizForm.innerHTML = '';
  const genreImage = document.createElement('img');
  const result = document.createElement('div');
  genreImage.classList.add('genre-image');
  result.classList.add('result');
  quizForm.appendChild(genreImage);
  quizForm.appendChild(result);
  for (let k = 0; k < movieGenres.length; k++) {
    if (totalScore >= movieGenres[k].lowestScore && totalScore <= movieGenres[k].highestScore) {
      genreImage.src = movieGenres[k].gif;
      result.textContent = 'Your favorite movie genre is: ' + movieGenres[k].genre;
      console.log(totalScore);
    }
  }
}

function refreshPage(){
  window.location.reload();
}

function fadeIn(item) {
  item.style.opacity = 0;
  let itemOpacity = 0;
  const myInterval = setInterval(() => {
  itemOpacity += 0.01;
  item.style.opacity = itemOpacity;
  if (itemOpacity >= 1) {
    clearInterval(myInterval);
    item.display = 'block';
  }
  }, 10);
}

function fadeOut(item) {
  let itemOpacity = 1;
  const myInterval = setInterval(() => {
  itemOpacity -= 0.01;
  item.style.opacity = itemOpacity;
  if (itemOpacity <= 0) {
    clearInterval(myInterval);
    item.display = 'block';
  }
  }, 10);
}