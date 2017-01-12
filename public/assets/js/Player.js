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

        for(let x = 1; x < 8; x++) {
            let newPos = [x, MainChar.currentPosition()[1]];
            if (newPos[0] !== MainChar.currentPosition()[0]) 
                positions.push(newPos);
        }
        for(let y = 1; y < 8; y++) {
            let newPos = [MainChar.currentPosition()[0], y];
            if (newPos[1] !== MainChar.currentPosition()[1]) 
                positions.push(newPos);
        }
        return positions;
    },

    getTarget() {
        return 'div[data-x='+this.newPosition[0]+'][data-y='+this.newPosition[1]+']';
    },

    setNewPos(elements) {
        const randomElement = Math.floor(Math.random()*elements.length);
        this.newPosition = elements[randomElement];
    },

    easyMove() {
        const randomElement = Math.floor(Math.random()*this.possiblePositions().length);
        this.setNewPos(this.possiblePositions());
        this.moveChar();
    },

    mediumMove() {
        let goodPositions = this.possiblePositions();
        
        for (let i = 0; i < goodPositions.length; i++)
            var div = $('div[data-x='+goodPositions[i][0]+'][data-y='+goodPositions[i][1]+']');
            if (div.children().length === 0 || !div.find('img').attr('data-id'))
                goodPositions[i] = null;

        goodPositions = $.grep(goodPositions,function(n){ return n == 0 || n });
        goodPositions = (goodPositions.length === 0) ? this.possiblePositions() : goodPositions;

        this.setNewPos(goodPositions);
        this.moveChar();
    },

    hardMove() {
        let bestPosition = null;
        let bestValue = 0;

        for (let i = 0; i < this.possiblePositions().length; i++) {
            const div = $('div[data-x='+this.possiblePositions()[i][0]+'][data-y='+this.possiblePositions()[i][1]+']');
            if (div.children().length > 0 && div.find('img').attr('data-id')) {
                const enemyId = div.find('img').data('id');
                if (Game.enemies[enemyId].points() > bestValue) {
                    bestValue = Game.enemies[enemyId].points();
                    bestPosition = this.possiblePositions()[i];
                }
            }
        }

        this.newPosition = bestPosition;
        this.moveChar();
    },

    moveChar() {
        const targetPosition = $(this.getTarget()).offset();
        const currentPosition = $('#main-char').parent('div').offset();

        $('#main-char').css('transition','1s');
        $('#main-char').css('left',targetPosition.left - currentPosition.left)
        $('#main-char').css('top',targetPosition.top - currentPosition.top);

        setTimeout(function() {
            $('#main-char').css('transition','none');
            MainChar.eat(AI.getTarget());
        }, 1000);

    }
}
