// Class
class GameController {
  nextRound() {
    if (p2.round < p1.round) {
      p2.addRound();
      // @TODO Add css on player for identify
    } else {
      p1.addRound();
      // @TODO Add css on player for identify
    }
  }

  updateScore(player, points) {
    player.addPoints(points);
    var scoreId = '#score' + player.id;
    $(scoreId).html(player.score);
  }

  checkVictory(player) {
    if (player.score >= 500) {
      // @TODO Stop the Game

      // Add player score to highScore in cookies
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


var gameController = new GameController();

// Actions for testing
$('#next').click(() => {
    gameController.nextRound();
    gameController.updateScore(p1, 10);
})

$('#addScore').click(() => {
    gameController.addHighScore(p2);
})
