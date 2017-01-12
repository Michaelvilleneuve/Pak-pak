class Player {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.round = 0;
    this.score = 0;
    this.eated = {};

    $('#player' + this.id).html(this.name);
  }

  addRound() {
    this.round++;
  }

  addPoints(points) {
    (this.didCombo(points)) ? this.score += points*3 : this.score += points;
    $('#score'+this.id).html(this.score);
  }

  cleanEated() {
    this.eated = {};
  }

  didCombo(points) {
    if(this.eated[points] === undefined) {
      this.cleanEated();
      this.eated[points] = 1;
    } else {
      this.eated[points] += 1;
    }

    if (this.eated[points] === 5) {
      this.cleanEated();
      return true;
    }
    return false;
  }
};
