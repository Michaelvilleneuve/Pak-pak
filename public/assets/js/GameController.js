// Class
class GameController {

  updateScore(player, points) {
    player.addPoints(points);
    var scoreId = '#score' + player.id;
    $(scoreId).html(player.score);
  }

  checkVictory(player) {
    if (player.score >= 500) {
      // @TODO Stop the Game

      // Add player score to highScore in cookies
      addHighScore(player);
    }
  }

  addHighScore(player) {
    var cookiesObject = {}, highscore;
    var playerName = player.name;
    var playerRound = player.round;

    if (highscoreCookies !== null) {
      cookiesObject = JSON.parse(highscoreCookies);
      if (cookiesObject.hasOwnProperty(playerName)) {
        cookiesObject[playerName].push(playerRound);
      } else {
        cookiesObject[playerName] = [playerRound];
      }
      highscore = JSON.stringify(cookiesObject);
      setCookie('highscore', highscore);
    } else {
      cookiesObject[playerName] = [playerRound];
      highscore = JSON.stringify(cookiesObject);
      setCookie('highscore', highscore);
    }
  }
}
