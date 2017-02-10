$(() => {

  const $li = $('li');
  // const $button = $('.button');
  const $buttonYo = $('.buttonyo');

  const $words = ['elephant', 'giraffe', 'orangutan', 'kangaroo', 'Squirrel', 'aardvark'];

  // Gets the random word from the array
  function getRandomWords() {
    const $randomNumber = [Math.floor(Math.random() * $words.length)];
    // alert(randomNumber);
    // alert($words[randomNumber]);
    var $randomWord = $words[$randomNumber];
    // $li.text($randomWord);
    jumbleWord($randomWord);
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
    // alert($jumbledWord);
    $li.text($jumbledWord); // return the jumbled word
  }

  // Get the inputted text // ID NEEDS TO GO ON THE INPUT BOX
  $buttonYo.on('click', (e) => {
    e.preventDefault();
    const inputtedText = $('#buttonyo').val();
    console.log(inputtedText);

  });

  getRandomWords();

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
//   $li.text('Yo');
// });
