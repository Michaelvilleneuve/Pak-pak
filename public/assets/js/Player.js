class Player {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.round = 0;
    this.score = 0;
    
    $('#player' + this.id).html(this.name);
  }

  addRound() {
    this.round++;
  }

  addPoints(points) {
    this.score += points;
    console.log($('#score'+this.id));
    $('#score'+this.id).html(this.score);
  }
};
