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
    switch(this.mode) {
        case 'easy':
            AI.easyMove();
        break;
        case 'medium':
            AI.mediumMove();
        break;
        case 'hard':
            AI.hardMove();
        break;
    }
  }
};



const AI = {
    possiblePositions: function() {
        let positions = [];
        
        for(let x = 1; x < 7; x++) {
            let newPos = [x, MainChar.currentPosition()[1]];
            if (newPos[0] !== MainChar.currentPosition()[0]) 
                positions.push(newPos);
        }
        for(let y = 1; y < 7; y++) {
            let newPos = [MainChar.currentPosition()[0], y];
            if (newPos[1] !== MainChar.currentPosition()[1]) 
                positions.push(newPos);
        }
        return positions;
    },

    easyMove() {
        const randomElement = Math.floor(Math.random()*this.possiblePositions().length);
        this.newPosition = this.possiblePositions()[randomElement];
        this.moveChar();
    },

    mediumMove() {
        const randomElement = Math.floor(Math.random()*this.possiblePositions().length);
        this.newPosition = this.possiblePositions()[randomElement];
        this.moveChar();  
    },

    hardMove() {
    },

    moveChar() {
        const target = 'div[data-x='+this.newPosition[0]+'][data-y='+this.newPosition[1]+']';
        const targetPosition = $(target).offset();
        const currentPosition = $('#main-char').parent('div').offset();

        $('#main-char').css('transition','1s');
        $('#main-char').css('left',targetPosition.left - currentPosition.left)
        $('#main-char').css('top',targetPosition.top - currentPosition.top);

        setTimeout(function() {
            $('#main-char').css('transition','none');
        }, 1000);

        MainChar.eat(target);
    }
}
