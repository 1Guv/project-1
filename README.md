#**Animal Word Conundrum**

######GA WDI-25 London - Project 1:

The idea was taken from the classic Countdown conundrum game as seen on TV currently presented by Nick Hewer assisted by Rachel Riley.

This version of the conundrum has an animal theme where every conundrum is a single animal word. Each screen also has a different animal skin background implying the animal them through out the game. The word length can be determined at the start of the game henceforce providing the four difficulty levels:

* EASY = 3 to 5 letter animal words
* MEDUIM = 6 to 8 letter animal words
* HARD = 9 to 10 letter animal words
* IMPOSSIBLE = 11+ letter animal words

[Play it here](https://limitless-dusk-78022.herokuapp.com/)

The game is fully responsive so you can try it on your mobile as well.

![Animal Conundrum - Mobile screen shot 1](https://github.com/1Guv/project-1/blob/master/images/AC-mobile-1-small.jpeg?raw=true "Animal Word Conundrum - Mobile screen shot")

Home page screen shot below:

![Animal Conundrum](https://github.com/1Guv/project-1/blob/master/images/Animal-Conundrum-1%20.png?raw=true "Animal Word Conundrum - screen shot")

##Rules:

* You have 20 seconds to guess the word displayed.
* You will get 10 points for every word guessed correctly.
* You will also get 5 seconds added to the timer for every correctly guesed word (yes you can go forever if you are good enough or remember all the words).

![Animal Conundrum](https://github.com/1Guv/project-1/blob/master/images/Animal-Conundrum-2.png?raw=true "Animal Word Conundrum - screen shot")

##Approach / How it works:

* Choose a difficulty level and then click PLAY to go the game.
* Click on the START button and a random jumbled up word will appear.
* You will be playing against the timer which will countdown from 20 seconds.
* If a guess is correct, the letter will turn green, and flip the word and then blank the input box ready for you to guess the next word.
* To signify a correctly guessed word you will hear a shoryuken!
* You will also get a complimentary 5 seconds added to the timer and 10 points for every word guessed correctly until the timer runs out.
* If the word is not guessed correctly then the input text will turn red and sound a buzzer for you to guess again.
* As of yet there are no clues for the more difficult words.

##The build:

* HTML 5, CSS and jQuery were used to create this game.
* Animation was created using the Animate.css stylesheet.
* The web font 'Lobster 2' has been used to style the game.

##Problems & Challenges:

The main challenge that I encountered was creatng and organising the sliding screens so the right screen activated and slid in or out depending on the current screen the user was viewing. I also made sure that the screen size was dynamically adjusted for the users viewing experience. Using CSS effectively via the DOM Chrome tools has also increased my skills in this area.

The game logic was completed quickly and was then tweaked for extra functionality especially after user testing eg uppercase and lowercase letters could be matched against the random word generated whcih would be important for the mobile experience.

##If I had more time I would:

1. Some of the words can be quite difficult to guess so if the word was not guessed correctly I would display the word after the timer had ran out.
2. In the future I would connect the game to a database and provide a dynamic high score screen, this has been created and ready to use once I have gathered the relevant knowledge.
3. In the next iteration I would provide more themes and change the background images and words dynamically depending on the theme chosen.


