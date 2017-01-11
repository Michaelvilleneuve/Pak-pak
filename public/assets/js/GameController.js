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
}

var gameController = new GameController();

// Actions for testing
$('#next').click(() => {
    gameController.nextRound();
    gameController.updateScore(p1, 10);
})
