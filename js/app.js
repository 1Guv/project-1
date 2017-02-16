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
  //SOUNDS////////////////////////////////
  const $buzzerSound = $('#buzzer');
  const $shoryukenSound = $('#shoryuken');
  ///////////////////////////////////////

  //ARRAY & OBJECTS////////////////////////
  const easyLetterWords = ['mole','dog','cat','duck','emu','goat','lion','bat','bear','hare','deer','lynx','orca','puma','wolf','seal','zebra','horse','tiger','snake','sheep','whale','panda','mouse','shark','moose'];
  const meduimLetterWords = ['elephant', 'giraffe', 'orangutan', 'kangaroo', 'squirrel', 'aardvark', 'alligator', 'leopard', 'crocodile'];
  const hardLetterWords = ['chimpanzee', 'bandicoot', 'paddymelon', 'rhinoceros', 'antelope', 'anaconda', 'butterfly', 'flamingo', 'hedgehog', 'jellyfish'];
  const impossible = ['hippopotamus', 'barracuda', 'chimpanzee', 'cockroach', 'dragonfly', 'grasshopper','hummingbird','rhinoceros','salamander','querquedule'];

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
      $box2.animate({left: $screenWidth}, 150);     // slides highscorepage back - 150 is the speed in mlilliseconds
    } else if (currentPage === 'creditspage') {
      $box3.animate({left: $screenWidth}, 150);     // slides creditspage back
    } else {
      $box1.animate({left: 0}, 150);                // slides playpage back
    }
    currentPage = 'playpage';
  }

  // slides to the MENU SCREEN homepage
  function menuScreen() {
    if (currentPage === 'highscorepage') {
      $box2.animate({left: $screenWidth}, 150);
    } else if (currentPage === 'creditspage') {
      $box3.animate({left: $screenWidth}, 150);
    } else {
      $box1.animate({left: $screenWidth}, 150);
    }
    currentPage = 'menupage';
  }

  // slides to the HIGH SCORE SCREEN
  function highScoreScreen() {
    if (currentPage === 'creditspage') {
      $box3.animate({left: $screenWidth}, 150);
    } else if (currentPage === 'highscorepage') {
      $box2.animate({left: 0}, 150);
    } else if (currentPage === 'playpage') {
      $box1.animate({left: $screenWidth}, 150);
    }
    currentPage = 'highscorepage';
  }

  // slides to the CREDITs screen
  function creditsScreen() {
    $box3.animate({left: 0}, 150);    // moves the screen into display
    currentPage = 'creditspage';
  }

  // updates the score in the PLAY screen top right
  function updateScore() {
    totalScore = totalScore + 10;
    $score.text(totalScore);
    console.log(totalScore);
  }

  // SETS THE WIDTH & HEIGHT FOR THE CURRENT VIEWING SCREEN IN CSS BOX1, 2 AND 3 & container
  // i used this to show an overlap on the left hand side however i have removed this now
  function setScreenSize() {
    $container.css('height', $screenHeight);
    $container.css('width', $screenWidth);

    $box1.css('height', $screenHeight);
    $box1.css('width', $screenWidth);
    $box1.css('left', $screenWidth);          // width from the right

    $box2.css('height', $screenHeight);
    $box2.css('width', $screenWidth);
    $box2.css('left', $screenWidth);          // width from the right

    $box3.css('height', $screenHeight);
    $box3.css('width', $screenWidth);
    $box3.css('left', $screenWidth);          // width from the right
  }

  function startTimer() {
    $timer.addClass('active');
    // Timer whose interval is set to 20 seconds
    timerId = setInterval(() => {
      time--;                       // reduces the timer by one
      $timer.html(time);            // updates the displayed time
      if (!time) {                  // when the time reaches zero falsy then the interval is cleared
        clearInterval(timerId);
        console.log('finished');    // console logging
        gameOver();                 // goes to gameOver
      }
    }, 1000);                       // goes through the loop every second
  }

  function gameOver() {
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

  // Jumbles the word chosen from getRandomWords (please note does not work for words with spaces)
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
  $playButton.on('click', playScreen);
  $menuButton.on('click', menuScreen);
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
    $timer.html(time);        // update the timer display to 20
    $timer.removeClass('active');
    console.log(time);
    $liOne.text('CLICK START'); // display this text in the random word loaction
    $startButton.html('START'); // shows PLAY in the button// upDate start button
    $startButton.removeAttr('disabled','disabled'); // enables the START button by using removeAttr
    $inputTextArea.removeAttr('placeholder', 'GAME OVER!'); // show Game Over in the input area

    setTimeout(function() {
      $box1.animate({
        opacity: 1,
        left: $screenWidth // slides back
      }, 150);
    }, 1000);

  });

  // Get the inputted text // ID NEEDS TO GO ON THE INPUT BOX
  $submitAnswerButton.on('click', (e) => {
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
    $submitAnswerButton.removeAttr('disabled','disabled'); // removes the disable on the SUBMIT ANSWER button
    $startButton.html('START'); // shows PLAY in the button
    totalScore = 0; // reset the score to zero
    $score.text(totalScore); // changes the displayed score
    startTimer();
    chosenLevel = $('select[name=selector]').val(); // CHOSEN LEVELS GETS STORED HERE
    difficultyLevel();
    getRandomWords();
    $startButton.attr('disabled','disabled');                //disable the START button
    // alert(chosenLevel);
  });

  // CALLED FUNCTIONS START HERE:
  setScreenSize();


});
