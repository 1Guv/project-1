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
  // const $bonus = $('.bonus');
  // const $credits = $('.credits');

  const $timer = $('.timer');
  let time = 30;
  const $display = $('.display');
  const $buttonYo = $('.buttonyo');
  const $inputTextArea = $('#buttonyo');

  let inputtedText = null;
  let randomWord = null;
  const $startButton = $('.start');
  const $liOne = $('.one');
  // let currentPage = null;

  const $score = $('.score');
  // const chosenLevel = $('#options option:selected').val();
  let chosenLevel = 'MEDUIM';
  let chosenWordArray = null;
  //SOUNDS////////////////////////////////
  const $buzzerSound = $('#buzzer');
  const $shoryukenSound = $('#shoryuken');
  ///////////////////////////////////////

  //ARRAY & OBJECTS////////////////////////
  const easyLetterWords = ['mole', 'dog', 'cat', 'duck', 'emu', 'goat', 'lion', 'toad', 'bear', 'hare'];
  const meduimLetterWords = ['elephant', 'giraffe', 'orangutan', 'kangaroo', 'squirrel', 'aardvark', 'alligator', 'leopard', 'crocodile', 'mouse'];
  const hardLetterWords = ['Arctic Hare', 'Chimpanzee', 'Field Mouse', 'Paddymelon', 'Rhinoceros', 'Sperm Whale'];
  const impossible = ['Hippopotamus', 'Spider Monkey', 'Mountain Lion', 'Bandicoot Rat', 'Grey Squirrel'];

  ////////////////////////////

  function playScreen() {
    $box1.animate({
      opacity: 1,
      left: 0
    }, {
      // animation complete
    });
    // currentPage = 'playpage';
    scoreScreen();
  }

  function scoreScreen() {
    $score.animate({
      opacity: 1,
      top: 5
    }, {
      // animation complete
    });
  }

  function menuScreen() {
    $box1.animate({
      opacity: 1,
      left: $screenWidth - 30 // slides right to the end - 30 so you can see the start of the div
    }, {
      // animation complete
    });
    // currentPage = 'menupage';
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
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      $display.html('Stop!');
      $buttonYo.html('Play again?');
      // toggleBoard();
    }, 30000); // stop timer after 30 seconds
  }

  // check to see if the random word is the same as users inputted word
  // and changes the input color if its wrong or correct
  function checkMatch() {
    if (inputtedText === randomWord) {
      $shoryukenSound[0].play();
      $inputTextArea.css('color', 'green');
      $inputTextArea.css('font-weight', 'bold');
      $inputTextArea.css('font-size', 30);
      $('input').addClass('animated flip'); // green & flips out when correct
      // alert('You have matched the words CORRECTLY');

    } else {
      // alert('INCORRECT');
      $buzzerSound[0].play();
      $inputTextArea.css('color', 'red');
      $inputTextArea.css('font-weight', 'bold');
      $inputTextArea.css('font-size', 30);
      $('input').addClass('animated shake'); // red and shakes the input box
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

  // function bonusScreen() {
  //   $box2.animate({
  //     opacity: 1,
  //     left: 0 // slides right to the end
  //   }, {
  //     // animation complete
  //   });
  //   currentPage = 'bonuspage';
  // }

  // function creditsScreen() {
  //   $box3.animate({
  //     opacity: 1,
  //     left: 0 // slides right to the end
  //   }, {
  //     // animation complete
  //   });
  //   currentPage = 'creditpage';
  // }

  // EVENT LISTENERS ARE LISTED HERE:
  $leftButton.on('click', playScreen);
  $rightButton.on('click', menuScreen);
  // $bonus.on('click', bonusScreen);
  // $credits.on('click', creditsScreen);

  // Get the inputted text // ID NEEDS TO GO ON THE INPUT BOX
  $buttonYo.on('click', (e) => {
    e.preventDefault();
    inputtedText = $('#buttonyo').val();
    console.log(inputtedText);
    checkMatch();
  });

  $startButton.on('click', () => {
    startTimer();
    chosenLevel = $('select[name=selector]').val(); // CHOSEN LEVELS GETS STORED HERE
    difficultyLevel();
    getRandomWords();
    // alert(chosenLevel);
  });

  // CALLED FUNCTIONS START HERE:
  setScreenSize();


});
