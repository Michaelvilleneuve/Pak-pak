var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};// Class
var GameController = (function(){"use strict";function GameController() {}DP$0(GameController,"prototype",{"configurable":false,"enumerable":false,"writable":false});var proto$0={};
  proto$0.nextRound = function() {
    if (p2.round < p1.round) {
      p2.addRound();
      // @TODO Add css on player for identify
    } else {
      p1.addRound();
      // @TODO Add css on player for identify
    }
  };

  proto$0.updateScore = function(player, points) {
    player.addPoints(points);
    var scoreId = '#score' + player.id;
    $(scoreId).html(player.score);
  };
MIXIN$0(GameController.prototype,proto$0);proto$0=void 0;return GameController;})();

var gameController = new GameController();

// Actions for testing
$('#next').click(function()  {
    gameController.nextRound();
    gameController.updateScore(p1, 10);
})
;var Player = (function(){"use strict";var proto$0={};
  function Player(name, id) {
    this.id = id;
    this.name = name;
    this.round = 0;
    this.score = 0;
  }DP$0(Player,"prototype",{"configurable":false,"enumerable":false,"writable":false});

  proto$0.addRound = function() {
    this.round = this.round + 1;
  };

  proto$0.addPoints = function(points) {
    this.score += points;
  };
MIXIN$0(Player.prototype,proto$0);proto$0=void 0;return Player;})();;
;function show(element) {
  $(element).show();
}

function hide(element) {
  $(element).hide();
}

function displayPoints() {
  var element = $('#points');
  if ($(element).is(":visible")) {
    hide(element);
  } else {
    show(element);
  }
}
;var Game = {
    enemies: [],
    columns_nb: 49,

    init: function() {
        this.setPlate();
        this.setEnemies();
        MainChar.init();
        this.setEvents();
    },

    setPlate: function() {
        var y = 0;
        var x = 0;
        for(var i = 0; i < Game.columns_nb; i++) {
            if(i%7 === 0) y++;
            x = i%7+1;
            $('#game').append("<div data-x='"+x+"' data-y='"+y+"' id='case-"+(i+1)+"' class='case'></div>");
        }
    },

    setEvents: function() {
        $(document).on('click', '.case', function() {
            Game.update($(this));
        });
        $('.case').droppable({
            accept: function(el) {
                if(MainChar.isOnSameLine($(this).data('x'), $(this).data('y'))) {
                    return true;
                }
            },
            drop: function(event, ui) {
                MainChar.eat(event.target);
            },
        });
    },

    setEnemies: function() {
        for(i = 0; i < 48; i++) {
            var enemy_number = Math.floor(Math.random() * 5) + 1;
            this.enemies.push(new Enemy(i+1, enemy_number));
        }
        this.showEnemies();
    },

    showEnemies: function() {
        for(var i = 0; i < this.enemies.length; i++) {
            var rotate = ((Math.random() >= 0.5) ? "rotate":"");
            $('#case-'+this.enemies[i].case_id).append("\
                <img data-id='"+i+"' class='"+rotate+"' src='"+this.enemies[i].image()+"'>\
            ");
        }
    },


    update: function(a_case) {
        console.log(a_case);
    },

    setControls: function() {

    }
}


MainChar = {
    init: function() {
        $(".case:not(:has(>img))").append("<img id='main-char' src='assets/img/personnageprincipal.png'>");
        this.updatePosition($('#main-char').parent('div'));
        $('#main-char').draggable({containment: "#game",revert: 'invalid'});
    },

    eat: function(div) {
        var id = $(div).find('img').data('id');
        var x = $(div).data('x');
        var y = $(div).data('y');

        if(id && MainChar.isOnSameLine(x, y)) {
            $(div).find('img').remove();
        }
        this.updatePosition(div);
        return MainChar.isOnSameLine(x, y); 
    },

    isOnSameLine: function(x, y) {
        return $('#main-char').data('x') === x || $('#main-char').data('y') === y; 
    },

    updatePosition: function(div) {
        $('#main-char').data('x', $(div).data('x')); 
        $('#main-char').data('y', $(div).data('y')); 
    }
}


var Enemy = (function(){"use strict";var proto$0={};
    function Enemy(case_id, type) {
        this.case_id = case_id;
        this.type = type;
    }DP$0(Enemy,"prototype",{"configurable":false,"enumerable":false,"writable":false});

    proto$0.points = function() {
        var points = 0;
        switch(this.type) {
            case 1:
                points = 10;
            break;
            case 2:
                points = 20;
            break;
            case 3:
                points = 30;
            break;
            case 4:
                points = 40;
            break;
            case 5:
                points = 50;
            break;
        }
        return points;
    };

    proto$0.image = function() {
        return "assets/img/ennemy" + this.type + ".png";
    };
MIXIN$0(Enemy.prototype,proto$0);proto$0=void 0;return Enemy;})();


Game.init();;;// Actions //

$('#play').click(function()  {
  removeSection('#menu');
  showSection('#gametype');
})

$('#gametype').children('button').each(
  function(){var this$0 = this;
    $(this).click(function()  {
      chooseGameType(this$0.id);
    });
  }
);

$('#start').click(function()  {
  affectName();
  removeSection('#menu-container');
  showSection('#main-container');
})

$('gamelevel').children('button').each(
  function(){
    $(this).click(function() {
      chooseGameLevel(this.id);
    })
  }
)

// initialise global value
var p1, p2;

// Function //

function chooseGameType(gametype) {
  switch (gametype) {
    case "solo":
      removeSection('#gametype');
      showSection('#gamelevel');
      break;
    case "duo":
      removeSection('#gametype');
      showSection('#pickname');
      break;
  }
}

function chooseGameLevel(gamelevelPick) {
  var gamelevel = gamelevelPick;
}

function affectName() {
  p1 = new Player($('#pickname #namej1').val(), 1);
  p2 = new Player($('#pickname #namej2').val(), 2);
  $('#player1').html(p1.name);
  $('#player2').html(p2.name);
  startFirstRound();
}

function startFirstRound() {
  p1.addRound();
  $('#round').html(p1.round);
}

function removeSection(sectionId) {
  $(sectionId).fadeOut(300);
}

function showSection(sectionId) {
  $(sectionId).fadeIn(300);
}
