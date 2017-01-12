class Player {
  constructor(name, id, mode = 'duo') {
    this.id = id;
    this.name = name;
    this.round = 0;
    this.score = 0;
    this.eated = {};
    this.mode = mode;
    this.isBot = (mode !== 'duo');

    $('#player' + this.id).html(this.name);
  }

  addRound() {
    this.round++;
  }

  addPoints(points) {
    const pointWithCombo = (this.didCombo(points)) ? points*3 : points;
    this.score += pointWithCombo;
    $('#score'+this.id).html(this.score);
    $('#last-score-list').prepend('<li>'+this.name+': '+pointWithCombo+' points</li>');
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

  move() {
     
  }
};
