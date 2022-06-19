//There are 2 players -> take turns
//A player clicks Submit -> rolls 2 dice randomly -> shows the result
//Picks the order of the dice
//Next player
//Higher combined number wins

//Problem break down
//ver 1. rolls 2 dice and turns the output for player 1. player chooses the dice order and get the correct return output
//ver 2. refactored to include player 2
// - global var for currentPlayer; allPlayer
// - refactor outputMessage to interact with each player, 1 and 2
// - write logic for player 1 to go first then player 2, and finally point toward comparing score
//ver 3. implement comparing dice scores and declare winner
//ver 4. reset the game so that the players can play cont w/o refreshing the browser

//Roll 2 dices
//Display the output
//Choose the dice order
//Return output
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];

var currentPlayer = 1;
var allPlayerScore = [];

//Helper function randomize
var rollDice = function () {
  console.log("Control flow: start of rollDice()");
  //Randomize
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log("rollDice output, randomInteger:", randomInteger);
  return randomInteger;
};

//Helper Function Dice Return
var rollDiceForPlayer = function () {
  console.log("Control flow: start of rollDiceForPlayer()");
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer changes, playerRolls", currentPlayerRolls);
  return (
    "Welcome, Player " +
    currentPlayer +
    "!<br><br>You rolled:<br>Dice 1: " +
    currentPlayerRolls[0] +
    "<br>Dice 2: " +
    currentPlayerRolls[1] +
    "<br><br> Now put '1' or '2' to choose the first digit as your final value!"
  );
};

var getPlayerScore = function (playerInput) {
  var playerScore;
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("Control flow: input...NOT 1 AND NOT 2");
    return (
      "Please only input '1' or '2' to choose which dice to use as the first digit. <br><br>Your dice rolls are:<br>Dice 1: " +
      currentPlayerRolls[0] +
      " | Dice 2: " +
      currentPlayerRolls[1] +
      "."
    );
  }

  //input == 1
  if (playerInput == 1) {
    console.log("Control flow: input ==1");
    playerScore = Number(
      String(currentPlayerRolls[0] + String(currentPlayerRolls[1]))
    );
  }

  //input == 2
  if (playerInput == 2) {
    console.log("Control flow: input == 2");
    playerScore = Number(
      String(currentPlayerRolls[1] + String(currentPlayerRolls[0]))
    );
  }

  //Store playerScore in array
  allPlayerScore.push(playerScore);

  //clear current player rolls array
  currentPlayerRolls = [];
  return "Player " + currentPlayer + ", your chosen value is: " + playerScore;
};

var comparePlayerScores = function () {
  var compareMessage =
    "Player 1 score: " +
    allPlayerScore[0] +
    ".<br>Player 2 score: " +
    allPlayerScore[1] +
    ".<br>";
  //player 1 wins
  if (allPlayerScore[0] > allPlayerScore[1]) {
    compareMessage = compareMessage + "<br>Player 1 won!";
  }
  //player 2 wins
  if (allPlayerScore[0] < allPlayerScore[1]) {
    compareMessage = compareMessage + "<br>Player 2 won!";
  }
  //tie
  if (allPlayerScore[0] == allPlayerScore[1]) {
    compareMessage = compareMessage + "<br>It's a tie!";
  }
  return compareMessage;
};

var resetGame = function () {
  currentPlayer = 1;
  gameState = GAME_STATE_DICE_ROLL;
  allPlayerScore = [];
};

var main = function (input) {
  console.log("Checking game state on submit click:", gameState);
  console.log("Checking currentPlayer on submit click:", currentPlayer);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ROLL");
    //Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;

    //Display dice rolled as output message
    outputMessage = rollDiceForPlayer();
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control flow: gameState == GAME_STATE_DICE_ORDER");
    gameState = GAME_STATE_DICE_ROLL;

    //Call playerScore function
    outputMessage = getPlayerScore(input);
  }

  // if (gameState == GAME_STATE_COMPARE_SCORES){
  if (gameState == GAME_STATE_COMPARE_SCORES) {
    console.log("Control flow: gameState == GAME_STATE_COMPARE");
    //   console.log('Control flow: gameState == GAME_STATE_COMPARE_SCORES')
    outputMessage = comparePlayerScores();
    return outputMessage;
  }

  if (currentPlayer == 1) {
    console.log("Control flow: end of player 1's turn, now player 2's turn!");
    currentPlayer = 2;
    gameState = GAME_STATE_DICE_ROLL;
    return outputMessage + "<br><br>It is now player 2's turn!";
  }
  if (currentPlayer == 2) {
    console.log(
      "Control flow: end of player 2's turn, Next submit click will calculate score"
    );
    console.log(gameState);
    gameState = GAME_STATE_COMPARE_SCORES;
    console.log(gameState);
    return outputMessage + "<br><br>Press submit to calculate scores!";
  }
  resetGame();
  return outputMessage;
};
