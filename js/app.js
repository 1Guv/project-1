$(() => {

  //VARIABLES/////////////////////////////////////

  const $screenWidth = $(window).width();
  const $screenHeight = $(window).height();

  const $container = $('.container');
  const $box1 = $('.box1');
  const $box2 = $('.box2');
  const $box3 = $('.box3');
  const $leftButton = $('.left');
  const $rightButton = $('.right');
  const $highScoreScreen = $('.high-score');
  // const $credits = $('.credits');
  const $startButton = $('.startButton');
  const $highScoreLocation = $('.form-game');

  const $timer = $('.timer');
  let time = 20;
  // const $display = $('.display');
  const $buttonYo = $('.buttonyo');
  const $inputTextArea = $('#buttonyo');

  let inputtedText = null;
  let randomWord = null;
  // const $startButton = $('.start');
  const $liOne = $('.one');
  let currentPage = null;

  const $score = $('.score');
  let totalScore = null;
  // const chosenLevel = $('#options option:selected').val();
  let chosenLevel = 'EASY';
  let chosenWordArray = null;
  //SOUNDS////////////////////////////////
  const $buzzerSound = $('#buzzer');
  const $shoryukenSound = $('#shoryuken');
  ///////////////////////////////////////

  //ARRAY & OBJECTS////////////////////////
  const easyLetterWords = ['mole', 'dog', 'cat', 'duck', 'emu', 'goat', 'lion', 'bat', 'bear', 'hare', 'deer', 'lynx', 'orca', 'puma', 'wolf', 'seal', 'zebra'];
  const meduimLetterWords = ['elephant', 'giraffe', 'orangutan', 'kangaroo', 'squirrel', 'aardvark', 'alligator', 'leopard', 'crocodile', 'mouse'];
  const hardLetterWords = ['Arctic Hare', 'Chimpanzee', 'Field Mouse', 'Paddymelon', 'Rhinoceros', 'Sperm Whale'];
  const impossible = ['Hippopotamus', 'Spider Monkey', 'Mountain Lion', 'Bandicoot Rat', 'Grey Squirrel'];

  ////////////////////////////

  function playScreen() {
    if (currentPage === 'highscorepage') {
      $box2.animate({
        opacity: 1,
        left: $screenWidth - 20 // slides back
      }, 250);
    } else {
      $box1.animate({
        opacity: 1,
        left: 0
      }, 250);
    }
    currentPage = 'playpage';
  }

  function menuScreen() {
    if (currentPage === 'highscorepage') {
      $box2.animate({
        left: $screenWidth - 20 // slides back
      }, 250);
    } else {
      $box1.animate({
        left: $screenWidth - 30 // slides right to the end - 30 so you can see the start of the div
      }, 250);
    }
    currentPage = 'menupage';
  }

  function highScoreScreen() {
    $box2.animate({
      opacity: 1,
      left: 0 // slides right to the end
    }, 250);
    currentPage = 'highscorepage';
  }

  // function creditsScreen() {
  //   $box3.animate({
  //     opacity: 1,
  //     left: 0 // slides right to the end
  //   }, {
  //     // animation complete
  //   });
  //   currentPage = 'creditpage';
  // }

  function updateScore() {
    totalScore = totalScore + 10;
    $score.text(totalScore);
    console.log(totalScore);
  }

  // SETS THE WIDTH & HEIGHT FOR THE CURRENT VIEWING SCREEN IN CSS BOX1, 2 AND 3 & container
  function setScreenSize() {
    $container.css('height', $screenHeight);
    $container.css('width', $screenWidth);

    $box1.css('height', $screenHeight);
    $box1.css('width', $screenWidth);
    $box1.css('left', $screenWidth - 30); // width from the right

    $box2.css('height', $screenHeight);
    $box2.css('width', $screenWidth);
    $box2.css('left', $screenWidth - 20); // width from the right

    $box3.css('height', $screenHeight);
    $box3.css('width', $screenWidth);
    $box3.css('left', $screenWidth - 10); // width from the right
  }

  function startTimer() {

    $timer.addClass('active');

    const timerId = setInterval(() => {
      time--;
      $timer.html(time);
      if (!time) {
        clearInterval(timerId);
        console.log('finished');
        gameOver();
        // show Play Again Button
      }
    }, 1000);
  }

  function gameOver() {
    console.log('Game Over');
    $inputTextArea.attr('placeholder', 'GAME OVER!'); // show Game Over in the input area
    $inputTextArea.attr('disabled', 'disabled'); // disables the input area
    $buttonYo.attr('disabled','disabled'); // disables the SUBMIT ANSWER button
    console.log('input box & (button) has been disabled');
    $startButton.html('PLAY AGAIN'); // shows PLAY AGAIN in the button

    addHighScore(); // ask for name and save score
  }

  function addHighScore() {
    // show current score and ask for name
    $highScoreLocation.html('<div class="askForUserName">foo</div>');
    console.log('yo');
    // store this in an OBJECT
    // update object and then should be displayed in the High Score page with value the highest showing first

  }

  // check to see if the random word is the same as users inputted word
  // and changes the input color if its wrong or correct
  function checkMatch() {
    if (inputtedText === randomWord) {

      $inputTextArea.css('color', 'green');
      $inputTextArea.css('font-weight', 'bold');
      $inputTextArea.css('font-size', 30);
      $('input').addClass('animated flip'); // green & flips out when correct
      $shoryukenSound[0].play();

      setTimeout(function() {
        $('input').removeClass('animated flip'); // remove class after 3 seconds
        // remove the word from the box
        $inputTextArea.val('');
        $inputTextArea.attr('placeholder', 'Type your guess here'); // updates the placeholder
        $inputTextArea.css('font-size', 20);
        $inputTextArea.css('color', '#aaa');
      }, 1000);

      updateScore();
      getRandomWords();
      time += 5; // the time increases by 5 when you get a correct answer
      // nextWord();
      // alert('You have matched the words CORRECTLY');

    } else if (inputtedText !== randomWord) {
      // alert('INCORRECT');
      $inputTextArea.css('color', 'red');
      $inputTextArea.css('font-weight', 'bold');
      $inputTextArea.css('font-size', 30);
      $('input').addClass('animated shake'); // red and shakes the input box
      $buzzerSound[0].play();

      setTimeout(function() {
        $('input').removeClass('animated shake'); // removes class after 3seconds
      }, 3000);

    }
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

  // Gets the random word from the array
  function getRandomWords() {
    const $randomNumber = Math.floor(Math.random() * chosenWordArray.length);
    randomWord = chosenWordArray[$randomNumber];
    jumbleWord(randomWord.toUpperCase());
  }

  function difficultyLevel() {
    if (chosenLevel === 'EASY') {
      chosenWordArray = easyLetterWords;
    } else if (chosenLevel === 'MEDUIM') {
      chosenWordArray = meduimLetterWords;
    } else if (chosenLevel === 'HARD') {
      chosenWordArray = hardLetterWords;
    } else if (chosenLevel === 'IMPOSSIBLE') {
      chosenWordArray = impossible;
    }
  }

  // function nextWord() {
  //   $inputTextArea.val('');
  //   time = 30;
  // }

  // EVENT LISTENERS ARE LISTED HERE:
  $leftButton.on('click', playScreen);
  $rightButton.on('click', menuScreen);
  $highScoreScreen.on('click', highScoreScreen);
  // $credits.on('click', creditsScreen);

  // Get the inputted text // ID NEEDS TO GO ON THE INPUT BOX
  $buttonYo.on('click', (e) => {
    e.preventDefault();
    inputtedText = $('#buttonyo').val();
    console.log(inputtedText);
    checkMatch();
  });

  $startButton.on('click', () => {
    time = 20; // make it the same as the <div class="timer">20</div>
    $inputTextArea.removeAttr('placeholder', 'GAME OVER!'); // show Game Over in the input area
    $inputTextArea.removeAttr('disabled', 'disabled'); // disables the input area
    $buttonYo.removeAttr('disabled','disabled'); // removes the disable on the SUBMIT ANSWER button
    $startButton.html('PLAY'); // shows PLAY in the button
    totalScore = 0; // reset the score to zero
    $score.text(totalScore); // changes the displayed score
    startTimer();
    chosenLevel = $('select[name=selector]').val(); // CHOSEN LEVELS GETS STORED HERE
    difficultyLevel();
    getRandomWords();
    // alert(chosenLevel);
  });

  // CALLED FUNCTIONS START HERE:
  setScreenSize();


});
