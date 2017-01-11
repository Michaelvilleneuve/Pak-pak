class Player {
  constructor(name) {
    this.name = name;
    this.round = 0;
  }

  addRound() {
    this.round = this.round + 1;
  }
};
