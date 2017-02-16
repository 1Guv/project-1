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
  const $credits = $('.credits');
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
  let timerId = null;
  // const $reset = $('.reset');
  //SOUNDS////////////////////////////////
  const $buzzerSound = $('#buzzer');
  const $shoryukenSound = $('#shoryuken');
  ///////////////////////////////////////

  //ARRAY & OBJECTS////////////////////////
  const easyLetterWords = ['mole', 'dog', 'cat', 'duck', 'emu', 'goat', 'lion', 'bat', 'bear', 'hare', 'deer', 'lynx', 'orca', 'puma', 'wolf', 'seal','zebra','horse','tiger','snake','sheep','whale','panda', 'mouse', 'shark', 'moose'];
  const meduimLetterWords = ['elephant', 'giraffe', 'orangutan', 'kangaroo', 'squirrel', 'aardvark', 'alligator', 'leopard', 'crocodile'];
  const hardLetterWords = ['Arctic Hare', 'Chimpanzee', 'Field Mouse', 'Paddymelon', 'Rhinoceros', 'Sperm Whale'];
  const impossible = ['Hippopotamus', 'Spider Monkey', 'Mountain Lion', 'Bandicoot Rat', 'Grey Squirrel'];

  // const highScoreObj = {
  //   Nya: 890,
  //   Guv: 600,
  //   Nav: 450,
  //   Jake: 260
  // };

  ////////////////////////////

  function playScreen() {
    if (currentPage === 'highscorepage') {
      $box2.animate({
        opacity: 1,
        left: $screenWidth // slides back
      }, 150);
    } else if (currentPage === 'creditspage') {
      $box3.animate({
        opacity: 1,
        left: $screenWidth // slides right to the start
      }, {
        // animation complete
      });
    } else {
      $box1.animate({
        opacity: 1,
        left: 0
      }, 150);
    }
    currentPage = 'playpage';
  }

  function menuScreen() {
    if (currentPage === 'highscorepage') {
      $box2.animate({
        left: $screenWidth // slides back
      }, 150);
    } else if (currentPage === 'creditspage') {
      $box3.animate({
        opacity: 1,
        left: $screenWidth // slides right to the start
      }, {
        // animation complete
      });
    } else {
      $box1.animate({
        left: $screenWidth // slides right to the end - 30 so you can see the start of the div
      }, 150);
    }
    currentPage = 'menupage';
  }

  function highScoreScreen() {

    if (currentPage === 'creditspage') {
      $box3.animate({
        left: $screenWidth // slides back
      }, 150);
    } else if (currentPage === 'highscorepage') {
      $box2.animate({
        left: 0 // slides right to the start
      }, 150);
    } else if (currentPage === 'playpage') {
      $box1.animate({
        left: $screenWidth // slides right to the end
      }, 150);
    }
    currentPage = 'highscorepage';
  }

  function creditsScreen() {
    $box3.animate({
      opacity: 1,
      left: 0 // slides right to the end
    }, {
      // animation complete
    });
    currentPage = 'creditspage';
  }

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
    $box1.css('left', $screenWidth); // width from the right

    $box2.css('height', $screenHeight);
    $box2.css('width', $screenWidth);
    $box2.css('left', $screenWidth); // width from the right

    $box3.css('height', $screenHeight);
    $box3.css('width', $screenWidth);
    $box3.css('left', $screenWidth); // width from the right
  }

  function startTimer() {

    $timer.addClass('active');

    timerId = setInterval(() => {
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
    $highScoreLocation.html('<div class="askForUserName">foo</div>'); // trying to get a lightbox to ask for user name
    console.log('yo');
    // store this in an OBJECT
    // update object and then should be displayed in the High Score page with value the highest showing first
    // cant store this data yet because need to link to a database so will create a placeholder object that displays predetermined data for now
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
        $('input').removeClass('animated flip'); // remove class after 1 seconds
        // remove the word from the box
        $inputTextArea.val('');
        $inputTextArea.attr('placeholder', 'Type your guess here'); // updates the placeholder
        $inputTextArea.css('font-size', 20);
        $inputTextArea.css('color', '#aaa');
      }, 1000);

      updateScore();
      getRandomWords();
      time += 5; // the time increases by 5 when you get a correct answer

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

  // EVENT LISTENERS ARE LISTED HERE:
  $leftButton.on('click', playScreen);
  $rightButton.on('click', menuScreen);
  $highScoreScreen.on('click', highScoreScreen);
  $credits.on('click', creditsScreen);

  $('.reset').click(function() {
    clearInterval(timerId);
    totalScore = 0;           // reset score
    $score.text(totalScore); // changes the displayed score
    console.log(totalScore);
    chosenLevel = 'EASY';     // reset level to EASY
    console.log(chosenLevel);
    time = 20;                // reset time to 20 seconds
    // $timer.html('20');        // update the timer display to 20
    $timer.removeClass('active');
    console.log(time);
    $liOne.text('CLICK START'); // display this text in the random word loaction
    $startButton.html('START'); // shows PLAY in the button// upDate start button

    setTimeout(function() {
      $box1.animate({
        opacity: 1,
        left: $screenWidth // slides back
      }, 150);
    }, 1000);

  });

  // Get the inputted text // ID NEEDS TO GO ON THE INPUT BOX
  $buttonYo.on('click', (e) => {
    e.preventDefault();
    inputtedText = $('#buttonyo').val().toLowerCase(); // allows for the input to be made in caps - useful when played on a mobile
    // inputtedText.toLowerCase();
    console.log(inputtedText);
    checkMatch();
  });

  $startButton.on('click', () => {
    time = 20; // make it the same as the <div class="timer">20</div>
    $inputTextArea.removeAttr('placeholder', 'GAME OVER!'); // show Game Over in the input area
    $inputTextArea.removeAttr('disabled', 'disabled'); // disables the input area
    $buttonYo.removeAttr('disabled','disabled'); // removes the disable on the SUBMIT ANSWER button
    $startButton.html('START'); // shows PLAY in the button
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
