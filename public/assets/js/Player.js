class Player {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.round = 0;
    this.score = 0;
  }

  addRound() {
    this.round = this.round + 1;
  }

  addPoints(points) {
    this.score += points;
  }
};
