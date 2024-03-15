/*
  here we convert one(setInterval) regular to arrow function in autoPlay()

  
  replace onclick="..." to .addEventListener();




  Play the game with keyboard:
  type 'r' => play rock
  type 'p' => play paper
  type 's' => play scissors

  using document.body.addEventListener('keydown', (event) => {...});
  and event.key


*/



let score = JSON.parse(localStorage.getItem('score'))      // (start with assign old-score) = (convert into Object(get the string name score))
                    || {                              //shot-cut of below, if first is falsy(null), then second use as default
                        wins : 0,
                        losses : 0,
                        teis : 0 
                       };



      updateScoreElement();



      /*
      if (!score) {
        wins = 0;
        losses = 0;
        teis = 0;
      }
      */

      let isAutoPlaying = false;
      let intervalId;


      function autoPlay() {
        if(!isAutoPlaying) {
          // intervalId = setInterval(function() {                 // save interval ID for clear
          intervalId = setInterval(() => {                 // arrow function
            const playerMove = pickComputerMove();           
            playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalId);                         // here we use interval ID for clear
          isAutoPlaying = false;
        } 
      }





      document.querySelector('.js-rock-botton').addEventListener('click',()=>{
        playGame('rock');
      });

      document.querySelector('.js-paper-botton').addEventListener('click', () => {
        playGame('paper');
      });

      document.querySelector('.js-scissors-botton').addEventListener('click', () => {
        playGame('scissors');
      });





      document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r') {playGame('rock');}
        else if(event.key === 'p') {playGame('paper');}
        else if(event.key === 's') {playGame('scissors');}
      });




          
      function playGame(playerMove) {
        const computerMove= pickComputerMove();

        let result = '';

        if(playerMove === 'scissors') {
          if(computerMove === 'rock') {result = 'You loose.';}
          else if(computerMove === 'paper') {result = 'You win.';}
          else if(computerMove === 'scissors') {result = 'Tie.';}
        } 
        else if(playerMove === 'paper') {
          if(computerMove === 'rock') {result = 'You win.';}
          else if(computerMove === 'paper') {result = 'Tie.'}
          else if(computerMove === 'scissors') {result = 'You loose.';}
        }
        else if(playerMove === 'rock') {
          if(computerMove === 'rock') {result = 'Tie.';}
          else if(computerMove === 'paper') {result = 'You loose.';}
          else if(computerMove === 'scissors') {result = 'You win.';}
        }


        if(result === 'You win.') {score.wins += 1;}
        else if(result === 'You loose.') {score.losses += 1;}
        else if(result === 'Tie.') {score.teis += 1;}

        localStorage.setItem('score', JSON.stringify(score));      // convert into string and save in localStorage name score


        updateScoreElement();
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer `;

      }



      function updateScoreElement() {
        document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, lossed: ${score.losses}, ties: ${score.teis}`;
      }




      function pickComputerMove() {
        let computerMove = '';      

        const randomNumber = Math.random();   

        if (randomNumber >=0 && randomNumber < 1/3) { computerMove='rock';}
        else if (randomNumber >=1/3 && randomNumber < 2/3) { computerMove='paper';}
        else { computerMove='scissors';}

        return computerMove;        
      }