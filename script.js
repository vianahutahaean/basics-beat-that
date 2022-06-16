//There are 2 players -> take turns
//A player clicks Submit -> rolls 2 dice randomly -> shows the result
//Picks the order of the dice
//Next player
//Higher combined number wins

//Roll 2 dices
//Display the output
//Choose the dice order
//Return output
var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playersRolls = [];

//Helper function randomize
var rollDice = function () {
  console.log("Cntrol flow: start of rollDice()");
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
    playersRolls.push(rollDice());
    counter = counter + 1;
  }
  console.log("rollDiceForPlayer changes, playerRolls", playersRolls);
  return (
    "Welcome!<br><br>You rolled:<br>Dice 1:" +
    playersRolls[0] +
    "<br>Dice 2:" +
    playersRolls[1] +
    ". <br> Now put '1' or '2' to choose the first digit as your final value!"
  );
};

var getPlayerScore = function (playerInput) {
  //input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log("Control flow: input...NOT 1 AND NOT 2");
    return (
      "Error! Please only input '1' or '2' to choose which dice to use as the first digit. <br><br>Your dice rolls are:<br>Dice 1: " +
      playersRolls[0] +
      " | Dice 2: " +
      playersRolls[1] +
      "."
    );
  }

  //input = 1
  if (playerInput == 1) {
    console.log("Control flow: input ==1");
    var playerScore = Number(String(playersRolls[0] + String(playersRolls[1])));
    return "Your chosen value is: " + playerScore;
  }

  //input = 2
  if (playerInput == 2) {
    console.log("Control flow: input ==2");
    var playerScore = Number(String(playersRolls[1] + String(playersRolls[0])));
    return "Your chosen value is: " + playerScore;
  }
};

var main = function (input) {
  console.log("Checking game state on submit click:", gameState);
  var outputMessage = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    console.log("Control flow: gameSTate == GAME_STATE_DICE_ROLL");

    //Display dice rolled as output message
    outputMessage = rollDiceForPlayer();

    //Change the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
  }
  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    console.log("Control low: gameState == GAME_STATE_DICE_ORDER");

    //Call playerScore function
    outputMessage = getPlayerScore(input);
  }
  return outputMessage;
};
