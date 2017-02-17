$(() => {

  //VARIABLES/////////////////////////////////////
  const $screenWidth = $(window).width();     // gets the current window WIDTH
  const $screenHeight = $(window).height();   // gets the current window HEIGHT

  const $container = $('.container');         // container div for all 3 sliding screens
  const $box1 = $('.box1');                   // screen 1 = PLAY GAME screen
  const $box2 = $('.box2');                   // screen 2 = HIGH SCORES screen
  const $box3 = $('.box3');                   // screen 3 = CREDIT screen
  const $playButton = $('.left');             // this is the PLAY button that appaers on all screens
  const $menuButton = $('.right');            // this is the MENU button that appaers on all screen
  const $highScoreScreen = $('.high-score');  // this refers to the DIV containg the HIGH SCORE Screen
  const $credits = $('.credits');             // this refers to the DIV containing the CREDITS screen
  const $startButton = $('.startButton');     // this refers to the START BUTTON on the PLAY screen
  // const $highScoreLocation = $('.form-game'); // this refers to the div that contains the HIGH SCORES

  const $timer = $('.timer');                 // this refers to the location of the timer on the PLAY page
  let time = 20;                              // time starts at 20 seconds
  // const $display = $('.display');
  const $submitAnswerButton = $('.buttonyo'); // refers to the submit button in the PLAY page
  const $inputTextArea = $('#buttonyo');      // refers to the input area for the inputted answer

  let inputtedText = null;                    // the input the user inputs so we can use to determine if its correct or not
  let randomWord = null;                      // the random word chosen from the array of words
  const $liOne = $('.one');                   // this refers to the location of the RANDOM WORD to displayed on the screen
  let currentPage = null;                     // this refers to the current page that is being viewed

  const $score = $('.score');                 // this refers to the location of the SCORE on the PLAY page
  let totalScore = null;                      // this will contain the total SCORE
  let chosenLevel = 'EASY';                   // predetermined level is EASY - can change to MEDUIM,HARD or IMPOSSIBLE - also change HTML > move 'selected' to the correct option tag
  let chosenWordArray = null;                 // this will be the array chosen eg easyLetterWords, meduimLetterWords, hardLetterWords or impossible
  let timerId = null;                         // this is the start Timer value
  const $resetButton = $('.reset');
  //SOUNDS////////////////////////////////
  const $buzzerSound = $('#buzzer');          // classic buzzer sound
  const $shoryukenSound = $('#shoryuken');    // classic shoryuken sound from street fighter 2
  ///////////////////////////////////////

  //ARRAY & OBJECTS////////////////////////
  // easy letter words comprises of animal names that are 3,4 and 5 letter words
  const easyLetterWords = ['mole','dog','cat','duck','emu','goat','lion','bat','bear','hare','deer','lynx','orca','puma','wolf','seal','zebra','horse','tiger','snake','sheep','whale','panda','mouse','shark','moose'];

  // meduim letter words comprises of single animal names that are 6,7 and 8 letter words
  const meduimLetterWords = ['elephant', 'giraffe', 'anteater', 'kangaroo', 'squirrel', 'aardvark', 'antelope', 'leopard', 'chipmunk', 'anaconda', 'flamingo', 'hedgehog'];

  // hard letter words comprises of single animal names that are 9 and 10 letter words
  const hardLetterWords = ['chimpanzee', 'bandicoot', 'paddymelon', 'rhinoceros', 'cockroach', 'dragonfly', 'butterfly', 'rhinoceros', 'salamander', 'jellyfish', 'orangutan', 'alligator', 'crocodile', 'barracuda', 'chimpanzee', 'grasshopper'];

  // impossible words comprise of single animal names that are 11 letters or higher
  const impossible = ['hippopotamus', 'cardophagus', 'barbastelle', 'flickertail', 'megatherium', 'wishtonwish','hummingbird','sivatherium','catamountain','querquedule', 'klipspringer'];

  // const highScoreObj = {
  //   Nya: 890,
  //   Guv: 600,
  //   Nav: 450,
  //   Jake: 260
  // };

  ////////////////////////////

  // Slides to the PLAY screen
  function playScreen() {
    if (currentPage === 'highscorepage') {
      $box2.animate({left: $screenWidth}, 150);     // slides highscorepage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    } else if (currentPage === 'creditspage') {
      $box3.animate({left: $screenWidth}, 150);     // slides creditspage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    } else {
      $box1.animate({left: 0}, 150);                // slides playpage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    }
    currentPage = 'playpage';
  }

  // slides to the MENU SCREEN homepage
  function menuScreen() {
    if (currentPage === 'highscorepage') {
      $box2.animate({left: $screenWidth}, 150);   // slides highscorepage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    } else if (currentPage === 'creditspage') {
      $box3.animate({left: $screenWidth}, 150);   // slides creditspage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    } else {
      $box1.animate({left: $screenWidth}, 150);   // slides playpage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    }
    currentPage = 'menupage';
  }

  // slides to the HIGH SCORE SCREEN
  function highScoreScreen() {
    if (currentPage === 'creditspage') {
      $box3.animate({left: $screenWidth}, 150);     // slides creditspage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    } else if (currentPage === 'highscorepage') {
      $box2.animate({left: 0}, 150);                // slides highscorepage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    } else if (currentPage === 'playpage') {
      $box1.animate({left: $screenWidth}, 150);     // slides playpage back to original location hidden offscreen - 150 is the speed in mlilliseconds
    }
    currentPage = 'highscorepage';
  }

  // slides to the CREDITs screen
  function creditsScreen() {
    $box3.animate({left: 0}, 150);    // moves the screen into the main container display
    currentPage = 'creditspage';
  }

  // updates the score in the PLAY screen top right
  function updateScore() {
    totalScore = totalScore + 10;                       // add 10 points to the score
    $score.text(totalScore);                            // displays the new score on the screen
    console.log(totalScore);                            // logs the new score in the console
  }

  // Sets the width & height for the current viewing screen in CSS BOX1(menuScreen), BOX2(highScoreScreen) and BOX3(creditsScreen) & the container for the homepage
  // I used this to show an overlap on the left hand side however i have removed this now
  function setScreenSize() {
    $container.css('height', $screenHeight);    // updates the CSS with the current screen height
    $container.css('width', $screenWidth);      // updates the CSS with the current screen width

    $box1.css('height', $screenHeight);
    $box1.css('width', $screenWidth);
    $box1.css('left', $screenWidth);      // updates the CSS with the width from the right eg this used to be $screenWidth - 30 to show a bit of the div like a tile effect

    $box2.css('height', $screenHeight);
    $box2.css('width', $screenWidth);
    $box2.css('left', $screenWidth);      // updates the CSS with the width from the right eg this used to be $screenWidth - 30 to show a bit of the div like a tile effect

    $box3.css('height', $screenHeight);
    $box3.css('width', $screenWidth);
    $box3.css('left', $screenWidth);     // updates the CSS with the width from the right eg this used to be $screenWidth - 30 to show a bit of the div like a tile effect
  }

  function startTimer() {
    $timer.addClass('active');      // adds a class to the HTML to display the timer

    timerId = setInterval(() => {   // Timer whose interval is set to 20 seconds
      time--;                       // reduces the timer by one
      $timer.html(time);            // updates the displayed time
      if (!time) {                  // when the time reaches zero falsy then the interval is cleared
        clearInterval(timerId);     // clears the interval
        console.log('finished');    // console logging
        gameOver();                 // goes to gameOver
      }
    }, 1000);                       // goes through the loop every second
  }

  function gameOver() {
    $liOne.text('GAME OVER');
    $liOne.css('color', 'red');
    $liOne.css('font-weight', 'bold');
    $liOne.css('font-size', '50');
    $liOne.addClass('animated zoomIn');
    $inputTextArea.attr('placeholder', 'GAME OVER!');           // show Game Over in the input area
    $inputTextArea.attr('disabled', 'disabled');                // disables the input area
    $submitAnswerButton.attr('disabled','disabled');            // disables the SUBMIT ANSWER button
    console.log('input box & (button) has been disabled');      // console logging
    $startButton.removeAttr('disabled','disabled');             // removes the DISABLE of the START button
    $startButton.html('PLAY AGAIN');                            // shows PLAY AGAIN in the button

    // addHighScore();                                          // ask for name and save score  WILL DO THIS IN THE NEXT ITERATION
  }

  // function addHighScore() {
  //   // show current score and ask for name
  //   $highScoreLocation.html('<div class="askForUserName">foo</div>'); // trying to get a lightbox to ask for user name
  //   console.log('yo');
  //   // store this in an OBJECT
  //   // update object and then should be displayed in the High Score page with value the highest showing first
  //   // cant store this data yet because need to link to a database so will create a placeholder object that displays predetermined data for now
  // }

  // check to see if the random word is the same as users inputted word and changes the input color if its wrong or correct
  function checkMatch() {
    if (inputtedText === randomWord) {
      $inputTextArea.css('color', 'green');         // if correct the text changes to GREEN to signify that its correct
      $inputTextArea.css('font-weight', 'bold');    // and bold
      $inputTextArea.css('font-size', 30);          // and increased font size
      $('input').addClass('animated flip');         // add class to the input which flips out the input box when correct - used animate.css website
      $shoryukenSound[0].play();                    // plays the STREET FIGHTER 2 shoryuken sound

      setTimeout(function() {                                         // setTimeout to 1 second delay to remove the above
        $('input').removeClass('animated flip');                      // remove class after 1 seconds
        $inputTextArea.val('');                                       // remove the word from the box
        $inputTextArea.attr('placeholder', 'Type your guess here');   // updates the placeholder
        $inputTextArea.css('font-size', 18);                          // reduces the font size back to what it was originally in CSS
        $inputTextArea.css('color', '#aaa');                          // changes the color back to original - grey
      }, 1000);                                                       // the 1 second delay is set here

      updateScore();            // a function that updates the score
      getRandomWords();         // a function to get ther next random word
      time += 5;                // the time increases by 5 when you get a correct answer

    } else if (inputtedText !== randomWord) {       // if the word entered is not correct the do the following
      $inputTextArea.css('color', 'red');           // changes the color of the font to red
      $inputTextArea.css('font-weight', 'bold');    // add bold to the above
      $inputTextArea.css('font-size', 30);          // increase the font size
      $('input').addClass('animated shake');        // add class to the input which shakes the input box to signify an incorrect answer - used animate.css website
      $buzzerSound[0].play();                       // classic buzzer sound

      setTimeout(function() {
        $('input').removeClass('animated shake');   // removes class that shales the input box after 3 seconds
      }, 3000);
    }
  }

  // Jumbles the word chosen from getRandomWords (please note does not work for words with spaces so this is reflected in the array of animal names)
  function jumbleWord(x) {                            // x = randomWord.toUpperCase
    const a = x.split('');                            // split the word into individual charcaters
    const n = a.length;                               // length of the chosen word

    for(var i=n-1; i>0; i--) {                        // loop through the word starting from the end
      var j = Math.floor(Math.random() * (i + 1));    // random number generated using the length of the word chosen
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    const $jumbledWord = (a.join(''));                // joins the mixed up word again to make a string
    $liOne.text($jumbledWord);                        // displays the jumbled word to the user
    console.log(jumbleWord);                          // shows the jumbled word in the console
  }

  // Gets the random word from the array
  function getRandomWords() {
    const $randomNumber = Math.floor(Math.random() * (chosenWordArray.length-1));   // gets random number between 0 - length of array
    console.log($randomNumber);                                                     // logs the random number in the console
    randomWord = chosenWordArray[$randomNumber];                                    // uses random number to choose random word from the array
    console.log(randomWord);                                                        // logs the random word chosen in the console
    jumbleWord(randomWord.toUpperCase());                                           // sends the random number to the jumbleWord function to jumble up the letters
  }

  // Assigns the difficulty level to the variable chosenWordArray
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

  function resetGame() {
    clearInterval(timerId);                                      // clear timer
    totalScore = 0;                                              // reset score
    $score.text(totalScore);                                     // changes the displayed score
    console.log(totalScore);                                     // logs the score in the console
    chosenLevel = 'EASY';                                        // reset level to EASY as the default option
    console.log(chosenLevel);                                    // logs the chosen level in the console
    time = 20;                                                   // reset time to 20 seconds
    $timer.html(time);                                           // update the timer display to 20
    $timer.removeClass('active');                                // removes the class for the timer so it doesnt show the timer going down
    console.log(time);                                           // logs the time in the console
    $liOne.text('CLICK START');                                  // display this text in the random word loaction
    $startButton.html('START');                                  // shows START text in the button
    $startButton.removeAttr('disabled','disabled');              // enables the START button by using removeAttr
    $inputTextArea.removeAttr('placeholder', 'GAME OVER!');      // show Game Over in the input area
    $inputTextArea.val('');                                      // removes any text eg attempted incorrect guesses from the input area
    $liOne.css('color', 'white');

    setTimeout(function() {                        // using timeout to delay the screen 1 second from going back to the MENU screen to choose new difficulty level
      $box1.animate({left: $screenWidth}, 150);    // slides the screen out to reveal the MENU page
    }, 1000);                                      // 1 second delay
  }

  function inputValidation(e) {
    e.preventDefault();                                         // prevents the default submit button settings
    inputtedText = $('#buttonyo').val().toLowerCase();          // allows for the input to be made in caps - useful when played on a mobile
    console.log(inputtedText);                                  // log the inputted text to the console for testing
    checkMatch();                                               // goes to the checkMatch function
  }

  function startGame() {
    time = 20;                                                  // make it the same as the <div class="timer">20</div>
    $inputTextArea.removeAttr('placeholder', 'GAME OVER!');     // REMOVES the HTML text 'show Game Over' in the input area if its there - usually after user click reset
    $inputTextArea.val('');                                     // removes any text eg attempted incorrect guesses from the input area
    $inputTextArea.removeAttr('disabled', 'disabled');          // REMOVES the HTML disabled from the input area so it becomes ENABLED
    $submitAnswerButton.removeAttr('disabled','disabled');      // REMOVES the HTML disable on the SUBMIT ANSWER button to make it ENABLED
    $startButton.html('START');                                 // shows PLAY text in the button
    totalScore = 0;                                             // reset the score to zero
    $score.text(totalScore);                                    // changes the displayed score to zero
    startTimer();                                               // goes to the startTimer function
    chosenLevel = $('select[name=selector]').val();             // current chosen level gets stored here
    difficultyLevel();                                          // goes to the difficultyLevel function
    getRandomWords();                                           // goes to the getRandomWords function
    $startButton.attr('disabled','disabled');                   // disables the START button once the game is in play (if not then the random word changes and timer goes funny)
    $liOne.css('color', 'white');

    setTimeout(function() {
      $resetButton.animate({top: 27}, 1000);
    }, 1000);

  }

  // ALL EVENT LISTENERS ARE LISTED HERE:
  $playButton.on('click', playScreen);                // listening for the play button to be clicked
  $menuButton.on('click', menuScreen);                // listening for the menu button to be clicked
  $highScoreScreen.on('click', highScoreScreen);      // listening for the high score button to be clicked
  $credits.on('click', creditsScreen);                // listening for the credits button to be clicked
  $resetButton.on('click', resetGame);                // when the user clicks on the RESET in the PLAY screen - top left
  $submitAnswerButton.on('click', inputValidation);   // Get the inputted text (ID NEEDS TO GO ON THE INPUT BOX)
  $startButton.on('click', startGame);                // pressing the start button starts the game

  // CALLED FUNCTIONS START HERE:
  setScreenSize();                      // this sets the width and height of the sliding divs so it looks appropriate on large manitors as well
});
