// these values are set at the beginning
// and then used throughout the game
let gameState = {
  players: 2,
  whoseTurn: 1,
  gameOver: false
}

function changePlayer() {
  // if the current player is player 1
  if (gameState.whoseTurn === 1) {
    let playerTwoHealth = document.getElementById("playerTwoHealth");
    let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);

    // Generate a random damage amount between 1 and 10
    let randomDamage = Math.floor(Math.random() * 10) + 1;

    playerTwoHealthNum -= randomDamage;
    playerTwoHealth.innerHTML = playerTwoHealthNum;

    if (playerTwoHealthNum <= 0) { // If Player 2's health number is less than or equal to 0, then the player 2's health decreases and game is over
      playerTwoHealth = 0;
      gameOver();
    } else {
      gameState.whoseTurn = 2; // Player 2's turn

      let playerName = document.getElementById("playerName");
      playerName.innerHTML = `Player ${gameState.whoseTurn}`;
    }
  } else if (gameState.whoseTurn === 2) {  // If it's player's 2 turn, player 1's health will start decreasing.
    let playerOneHealth = document.getElementById("playerOneHealth");
    let playerOneHealthNum = Number(playerOneHealth.innerHTML);

    // Generate a random damage amount between 1 and 10
    let randomDamage = Math.floor(Math.random() * 10) + 1;

    playerOneHealthNum -= randomDamage;
    playerOneHealth.innerHTML = playerOneHealthNum;

    if (playerOneHealthNum <= 0) { // If Player 1's health number is less than or equal to 0, then the player 1's health decreases and game is over.
      playerOneHealth = 0;
      gameOver();
    } else {
      gameState.whoseTurn = 1;

      let playerName = document.getElementById("playerName");
      playerName.innerHTML = `Player ${gameState.whoseTurn}`;
    }
  }
}


// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
  let title = document.getElementById("title");
  title.style = "display: none;";
  let playerTurnDisplay = document.getElementById("playerTurn");
  playerTurnDisplay.style = "display: none;";

  let winningPlayer = document.getElementById("winningPlayer");
  winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`

  let gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.style = "display: flex; flex-direction: column;";
}

// function that allows the player two attack button to reduce the player two's
// health
function attackPlayerTwo() {  // In this part of the game, Player Two is being attacked.
  // compartmentalized function that will switch the player 2 attack button to inactive
  // and player 1 attack button to active using DOM manipulation
  // this also DISABLES the button, meaning they are not interactable
  function changeButtonStatus() {
      let playerTwoAttackButton = document.getElementById("playerTwoAttack");
      playerTwoAttackButton.disabled = true; // When player 2 is attacked, the attack button is disabled.
      playerTwoAttackButton.classList.add("inactive");
      playerTwoAttackButton.classList.remove("active");

      let playerOneAttackButton = document.getElementById("playerOneAttack");
      playerOneAttackButton.disabled = false; // On the other hand, player 1's attack button is not disabled.
      playerOneAttackButton.classList.add("active"); 
      playerOneAttackButton.classList.remove("inactive"); 
  }

  // commpartmentalized function that changes the player 1's sprite using the array
  // containing multiple images
  function animatePlayer() {
      // an array containing the images using in player one's animation
      // the indices are later used to cycle / "animate" when the player attacks
      let playerOneFrames = [
          "./images/R_Idle.png",
          "./images/R_Attack.png"
      ];

      let playerSprite = document.getElementById("playerOneSprite");
      // function we will call in setTimeout, before the frames change back
      // the idle stance
      // in other words, we set to the attack sprite, wait 3 seconds,
      // then set it back to the idle sprite
      playerSprite.src = playerOneFrames[1];  // Player One Frame will change to the R_Attack image.
      
      // removes the 'idle' class from the player sprite
      playerSprite.classList.remove("idle");
      // adds the 'attack' class to the player sprite
      // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
      playerSprite.classList.add("attack");

      // grabs the enemy sprite
      let enemySprite = document.getElementById("playerTwoSprite");
      let enemyDamage = document.getElementById("SFX_PlayerDamage");
      // removes the 'idle' class from the enemy sprite
      enemySprite.classList.remove("idle");
      // adds the 'attack' class to the enemy sprite
      // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
      enemySprite.classList.add("damage");
      // sound that plays when enemy takes damage
      enemyDamage.play();

      // the function we will call in the setTimeOut method below
      // after 350 milliseconds
      // this function will execute this block of code
      function changePlayerOneSprite() {
          enemySprite.classList.remove("damage");
          enemySprite.classList.add("idle");

          playerSprite.src = playerOneFrames[0];
          playerSprite.classList.remove("attack");
          playerSprite.classList.add("idle");
      }

      setTimeout(changePlayerOneSprite, 350);
  }

  // for easy reading,
  // we do not include ALL of the above code within this condition
  // instead, we create higher-order functions to keep the code neat and readable
  if (gameState.whoseTurn === 1) {
      animatePlayer();
      changeButtonStatus();
      changePlayer();
  }
}

function attackPlayerOne() {  // Player One is being attacked in this part of the game.
  if (gameState.whoseTurn === 1) { 
      let playerOneHealth = document.getElementById("playerOneHealth");
      let playerOneHealthNum = Number(playerOneHealth.innerHTML);
      playerOneHealthNum -= 10;
      playerOneHealth.innerHTML = playerOneHealthNum;

      if (playerOneHealth <= 0) {
          playerOneHealth = 0;
          gameOver();
      } else {
          changePlayer();
      }
  }
  // compartmentalized function that will switch the player 1 attack button to inactive
  // and player 2 attack button to active using DOM manipulation
  // this also DISABLES the button, meaning they are not interactable
  function changeButtonStatus() {
    let playerTwoAttackButton = document.getElementById("playerTwoAttack");
    playerTwoAttackButton.disabled = false; 
    playerTwoAttackButton.classList.add("active"); // Modified inactive button to active for player's to switch their turns
    playerTwoAttackButton.classList.remove("inactive"); // Modified active button to inactive

    let playerOneAttackButton = document.getElementById("playerOneAttack");
    playerOneAttackButton.disabled = true;
    playerOneAttackButton.classList.add("inactive"); // Modified active button to inactive for the logic to operate successfully
    playerOneAttackButton.classList.remove("active"); // Modified inactive button to active.
}

// commpartmentalized function that changes the player 2's sprite using the array
// containing multiple images
function animatePlayer() {
    // an array containing the images using in player one's animation
    // the indices are later used to cycle / "animate" when the player attacks
    let playerTwoFrames = [   // Modified Player Two frames of the opposite direction.
        "./images/L_Idle.png",
        "./images/L_Attack.png"
    ];

    let playerSprite = document.getElementById("playerTwoSprite");
    // function we will call in setTimeout, before the frames change back
    // the idle stance
    // in other words, we set to the attack sprite, wait 3 seconds,
    // then set it back to the idle sprite
    playerSprite.src = playerTwoFrames[1];
    
    // removes the 'idle' class from the player sprite
    playerSprite.classList.remove("idle");
    // adds the 'attack' class to the player sprite
    // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
    playerSprite.classList.add("attack"); // When Player 2 attacks, the player sprite should change from “idle” to “playerTwoAttack”

    // grabs the enemy sprite
    let enemySprite = document.getElementById("playerOneSprite");
    let enemyDamage = document.getElementById("SFX_PlayerDamage"); // SFX_EnemyrDamage was not found so I used the original audio.
    // removes the 'idle' class from the enemy sprite
    enemySprite.classList.remove("idle"); // idle
    // adds the 'attack' class to the enemy sprite
    // ** CHECK THE CSS TO NOTE THE CHANGES MADE **
    enemySprite.classList.add("damage"); // The enemy sprite’s status should change from “idle” to playerOneDamage
    // sound that plays when enemy takes damage
    enemyDamage.play();

    // the function we will call in the setTimeOut method below
    // after 350 milliseconds
    // this function will execute this block of code
    function changePlayerTwoSprite() {
        enemySprite.classList.remove("damage"); // The enemy sprite should return to “idle” and remove “playerOneDamage”
        enemySprite.classList.add("idle"); 

        playerSprite.src = playerTwoFrames[0];
        playerSprite.classList.remove("attack"); // The playerSprite should also return to “idle” and remove “playerTwoAttack”
        playerSprite.classList.add("idle"); // idle
    }

    setTimeout(changePlayerTwoSprite, 350);
}

/*  At the end check if it’s still player 2’s turn, and if it is
 a. Animate the player
b. Change the button status
c. Change the players’ turns
*/
if (gameState.whoseTurn === 2) {
    animatePlayer();
    changeButtonStatus();
    changePlayer();
 }
}






