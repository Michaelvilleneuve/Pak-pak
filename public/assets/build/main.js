var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};function setCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    setCookie(name, "", -1);
}
;// Class
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

  proto$0.checkVictory = function(player) {
    if (player.score >= 500) {
      // @TODO Stop the Game

      // Add player score to highScore in cookies
      addHighScore(player);
    }
  };

  proto$0.addHighScore = function(player) {
    var cookiesObject = {}, highscore;
    var playerName = player.name;
    var playerRound = player.round;

    if (highscoreCookies !== null) {
      cookiesObject = JSON.parse(highscoreCookies);
      if (cookiesObject.hasOwnProperty(playerName)) {
        cookiesObject[playerName].push(playerRound);
      } else {
        cookiesObject[playerName] = [playerRound];
      }
      highscore = JSON.stringify(cookiesObject);
      setCookie('highscore', highscore);
    } else {
      cookiesObject[playerName] = [playerRound];
      highscore = JSON.stringify(cookiesObject);
      setCookie('highscore', highscore);
    }
  };
MIXIN$0(GameController.prototype,proto$0);proto$0=void 0;return GameController;})();
;var Player = (function(){"use strict";var proto$0={};
  function Player(name, id) {
    this.id = id;
    this.name = name;
    this.round = 0;
    this.score = 0;
    
    $('#player' + this.id).html(this.name);
  }DP$0(Player,"prototype",{"configurable":false,"enumerable":false,"writable":false});

  proto$0.addRound = function() {
    this.round++;
  };

  proto$0.addPoints = function(points) {
    this.score += points;
    console.log($('#score'+this.id));
    $('#score'+this.id).html(this.score);
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
        $(document).on('click', '#start', function() {
            Game.setPlayers();
            Game.launchGame();
        })
    },

    setPlayers: function() {
        this.p1 = new Player($('#pickname #namej1').val(), 1);
        this.p2 = new Player($('#pickname #namej2').val(), 2);
    },

    launchGame: function() {
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
        for(i = 0; i < 49; i++) {
            var enemy_number = Math.floor(Math.random() * 5) + 1;
            this.enemies.push(new Enemy(i, enemy_number));
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

    nextRound: function() {
        if (this.p2.round < this.p1.round) {
          this.p2.addRound();
        } else {
          this.p1.addRound();
        }
    },

    currentPlayer: function() {
        return (this.p2.round > this.p1.round) ? this.p1 : this.p2;
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
            Game.currentPlayer().addPoints(Game.enemies[id].points());
            Game.enemies.splice(id, 1);
            $(div).find('img').remove();
        }

        Game.currentPlayer().addRound();
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


Game.init();;var highscoreCookies = getCookie('highscore');

displayHighScore();

function displayHighScore() {
  if (highscoreCookies === null) return false;
  var highscoreObject = JSON.parse(highscoreCookies);

  var bestScore = 9999;
  var nameBest;
  var indexBest;

  do {
    for (var key in highscoreObject) {
      highscoreObject[key].forEach(function(element, index) {
        if (element < bestScore) {
          bestScore = element;
          nameBest = key;
          indexBest = index;
        }
      });
    }
    // Add High Score here
    addHighScore(nameBest, bestScore);
    // Remove index from array
    highscoreObject[nameBest].splice(indexBest, 1);
    // Check if Array is empty for delete it form object
    if (highscoreObject[nameBest].length === 0) {
      delete highscoreObject[nameBest];
    }
    bestScore = 9999;
  } while (!$.isEmptyObject(highscoreObject));
}

function addHighScore(name, score) {
  var list = $('#score-list');
  var item = $("<li>"+name+" <span class='right'>" + score + "</span>"+"</li>");
  list.append(item);
}
;// Actions //

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
