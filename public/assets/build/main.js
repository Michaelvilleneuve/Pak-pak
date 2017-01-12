var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var Player = (function(){"use strict";var proto$0={};
  function Player(name, id) {var mode = arguments[2];if(mode === void 0)mode = 'duo';
    this.id = id;
    this.name = name;
    this.round = 0;
    this.score = 0;
    this.eated = {};
    this.mode = mode;
    this.isBot = (mode !== 'duo');

    $('#player' + this.id).html(this.name);
  }DP$0(Player,"prototype",{"configurable":false,"enumerable":false,"writable":false});

  proto$0.addRound = function() {
    this.round++;
  };

  proto$0.addPoints = function(points) {
    var pointWithCombo = (this.didCombo(points)) ? points*3 : points;
    this.score += pointWithCombo;
    $('#score'+this.id).html(this.score);
    $('#last-score-list').append('<li>'+this.name+': '+pointWithCombo+' points</li>');
  };

  proto$0.cleanEated = function() {
    this.eated = {};
  };

  proto$0.didCombo = function(points) {
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
  };
MIXIN$0(Player.prototype,proto$0);proto$0=void 0;return Player;})();;
;function setCookie(name, value, days) {
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
    mode: '',

    init: function() {
        $(document).on('click', '#start', function() {
            Game.mode = $('#start').attr('mode');
            Game.setPlayers();
            Game.launchGame();
            GameAudio.startTheme();
        })
    },

    setPlayers: function() {
        this.p1 = new Player($('#pickname #namej1').val(), 1);
        // Set Bot or Players
        if (this.mode !== 'duo') {
            this.p2 = new Player('Bot', 2, this.mode);
        } else {
            this.p2 = new Player($('#pickname #namej2').val(), 2);
        }

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
                // Allow drag and drop only if such move is authorized
                if(MainChar.isOnSameLine($(this).data('x'), $(this).data('y'))) return true;
            },
            drop: function(event, ui) {
                // Eat target and update positions/points
                MainChar.eat(event.target);
            },
        });
    },

    setEnemies: function() {

        // Define different types of enemies
        for(var i = 0; i < 14; i++) {
            this.enemies.push(new Enemy(0, 1));
            this.enemies.push(new Enemy(0, 2));
            this.enemies.push(new Enemy(0, 3));
        }
        for(var i$0 = 0; i$0 < 5; i$0++) {
            this.enemies.push(new Enemy(0, 4));
        }

        // Shuffle array of enemies randomly
        this.enemies.sort(function() {
          return .5 - Math.random();
        });

        // Define catcher authorized positions
        var possibleCatcherPosition = [];
        for(var i$1 = 0; i$1 < 47; i$1++)
            if (![3,10,17,21,22,23,24,25,26,27,31,38,45].includes(i$1))
                possibleCatcherPosition.push(i$1);

        // Define and add catcher in any authorized position
        var catcherPosition = possibleCatcherPosition[Math.floor(Math.random()*possibleCatcherPosition.length)];
        this.enemies.splice(catcherPosition, 0, new Enemy(0, 5));

        this.showEnemies();
    },

    showEnemies: function() {
        for (var i = 0; i < this.enemies.length + 1; i++) {
            // Check if case is not middle case
            if(i !== 24) {
                var enemyId = (i > 24) ? i-1 : i;
                var caseId = i+1;
                var rotate = ((Math.random() >= 0.5) ? "rotate":"");

                this.enemies[enemyId].case_id = caseId;

                $('#case-'+this.enemies[enemyId].case_id).append("\
                    <img data-id='"+enemyId+"' class='"+rotate+"' src='"+this.enemies[enemyId].image()+"'>\
                ");
            }

        }
    },

    nextRound: function() {
        if (this.p2.round < this.p1.round)
          this.p2.addRound();
        else
          this.p1.addRound();
    },

    currentPlayer: function() {
        return (this.p2.round > this.p1.round) ? this.p1 : this.p2;
    },

    checkVictory: function() {
        if(this.winner()) {
            this.addHighScore(this.winner());
            GameAudio.stopTheme();
            GameAudio.audios.effects.win.play();
            this.congratulate();
        }
    },

    winner: function() {
        if (this.p1.score >= 500) return this.p1;
        if (this.p2.score >= 500) return this.p2;
        return false;
    },

    congratulate: function() {
        if (confirm(this.winner().name + " a gagné !!!!! Voulez-vous rejouer ?"))
            document.location.reload();
        else
            $('#main-char').draggable('disable');
    },

    addHighScore: function(player) {
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
    }
}

MainChar = {
    init: function() {
        $(".case:not(:has(>img))").append("<img id='main-char' style='z-index:9999;' src='assets/img/personnageprincipal.png'>");
        this.updatePosition($('#main-char').parent('div'));
        $('#main-char').draggable({containment: "#game", revert: 'invalid', start: function() {
          $('#main-char').attr("src","/assets/anim/dragAnimation.gif");
        }, stop: function() {
            if ($('#main-char').attr('src') == "/assets/anim/dragAnimation.gif") {
                $('#main-char').attr("src","/assets/img/personnageprincipal.png");
            }
        }});
    },

    eat: function(div) {
        var id = $(div).find('img').data('id');
        var x = $(div).data('x');
        var y = $(div).data('y');


        if(typeof id !== 'undefined' && MainChar.isOnSameLine(x, y)) {
            var mainChar = $('#main-char');
            var enemy = $(div).find('img');

            Game.currentPlayer().addPoints(Game.enemies[id].points());
            GameAudio.audios.effects.beat.play();
            mainChar.css('right', '+=25');
            enemy.css('left', '+=25');
            enemy.attr("src","/assets/anim/animEnemy"+ Game.enemies[id].type + ".gif");
            mainChar.attr("src","/assets/anim/animPersoPrincipal.gif");
            setTimeout(function() {
                mainChar.css('right', '+=-25');
                enemy.remove();
                mainChar.attr("src","/assets/img/personnageprincipal.png");
                Game.enemies[id] = null;
                Game.checkVictory();
            }, 1000);
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
                points = 50;
            break;
            case 5:
                points = 100;
            break;
        }
        return points;
    };

    proto$0.image = function() {
        return "assets/img/ennemy" + this.type + ".png";
    };
MIXIN$0(Enemy.prototype,proto$0);proto$0=void 0;return Enemy;})();


Game.init();
;var highscoreCookies = getCookie('highscore');

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

// Bind game type buttons
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

//Bind game level buttons
$('#gamelevel').children('button').each(
    function(){
        $(this).click(function() {
            chooseGameLevel(this.id);
        });
    }
)

// initialise global value
var p1, p2;

// Function Navigation

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
    switch (gamelevel) {
        case "easy":
        selectMode(gamelevel)
        break;
        case "medium":
        selectMode(gamelevel);
        break;
    }
}

// Functions
function selectMode(mode) {
    removeSection('#gamelevel');
    addModeToButton(mode);
    removeP2();
    showSection('#pickname');
}

// remove player2
function removeP2() {
    $('#pickname > #groupej2').hide();
}

function addModeToButton(mode){
    $('#start').attr('mode', mode);
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
