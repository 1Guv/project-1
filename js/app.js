$(() => {

  const $liOne = $('.one');
  const $buttonYo = $('.buttonyo');
  const $timer = $('.timer');
  let time = 30;
  const $display = $('.display');
  const $startButton = $('.start');

  const $words = ['elephant', 'giraffe', 'orangutan', 'kangaroo', 'squirrel', 'aardvark', 'alligator', 'leopard', 'crocodile'];

  let randomWord = null;
  let inputtedText = null;

  // Gets the random word from the array
  function getRandomWords() {
    const $randomNumber = Math.floor(Math.random() * $words.length);
    randomWord = $words[$randomNumber];
    jumbleWord(randomWord);
  }

  // Jumbles the word chosen from getRandomWords
  function jumbleWord(x) {
    const a = x.split('');
    const n = a.length;

    for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    const $jumbledWord = (a.join(''));
    $liOne.text($jumbledWord); // displays the jumbled word
  }

  // check to see if the random word is the same as users inputted word
  function checkMatch() {
    if (inputtedText === randomWord) {
      alert('You have matched the words CORRECTLY');
    } else {
      alert('INCORRECT');
    }
  }

  function startTimer() {
    // resetGame();
    // toggleBoard();
    // generateSum();
    $timer.addClass('active');

    const timerId = setInterval(() => {
      time--;
      $timer.html(time);
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      $display.html('Stop!');
      $buttonYo.html('Play again?');
      // toggleBoard();
    }, 30000); // stop timer after 30 seconds
  }

  // EVENT LISTENERS
  // Get the inputted text // ID NEEDS TO GO ON THE INPUT BOX
  $buttonYo.on('click', (e) => {
    e.preventDefault();
    inputtedText = $('#buttonyo').val();
    console.log(inputtedText);
    checkMatch();
  });

  $startButton.on('click', () => {
    startTimer();
    getRandomWords();
  });

});


// how do i grab text input after the submit button is pressed
// how do i center my li exactly
// how do i put letters into an li without the box increasing in size
// add the favicon to the website

// const $main = $('.main');
// const $ul = $('ul');
// const $one = $('.one');
// const $two = $('.two');
// const $three = $('.three');
// const $d1 = $('.d1');
// const $divs = $('div');

// $button.on('click', (e) => {
//   $liOne.text('Yo');
// });
