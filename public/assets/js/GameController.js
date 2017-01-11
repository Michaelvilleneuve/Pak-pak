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
}

var gameController = new GameController();

// Actions
$('#next').click(() => {
    gameController.nextRound();
})
