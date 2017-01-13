<<<<<<< HEAD
<<<<<<< HEAD
var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};// support for IE11

// To add to window
!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:u)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void u(n.promise,i)}r(n.promise,o)}))}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void f(e);if("function"==typeof i)return void s(t(i,n),e)}e._state=1,e._value=n,f(e)}catch(r){u(e,r)}}function u(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function s(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,u(n,e))})}catch(o){if(t)return;t=!0,u(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function o(r,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(e){o(r,e)},t)}n[r]=u,0===--i&&e(n)}catch(c){t(c)}}if(0===n.length)return e([]);for(var i=n.length,r=0;r<n.length;r++)o(r,n[r])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);
=======
var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};// support for IE11

// To add to window
if (!window.Promise) {
    var Promise = require('es6-promise').Promise;
}
>>>>>>> Add perf optimisation


if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
;GameAudio = {
<<<<<<< HEAD
=======
var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};GameAudio = {
>>>>>>> add support for promise for IE11
=======
>>>>>>> Add perf optimisation
	audios : {
		effects : {
			mute : false,
			beat : new Audio("assets/audio/beat.mp3"),
			jump : new Audio("assets/audio/jump.mp3"),
			lose : new Audio("assets/audio/lose.mp3"),
			win  : new Audio("assets/audio/win.mp3"),
		},
		theme : {
			mute : false,
			main : new Audio("assets/audio/theme.mp3")
		}

	},


	refresh: function() { 
		if(this.audios.theme.mute){
			this.audios.theme.main.pause();
		} else {
			this.audios.theme.main.play();
		}
	},

	startTheme: function() {
		this.audios.theme.main.play();
		this.audios.theme.main.volume = 0.2;
		this.audios.theme.main.loop = true;
	},

	stopTheme: function() {
		this.audios.theme.main.pause();
	},

	toggleMute: function(audio , value) {

    	this.audios[audio].mute = !this.audios[audio].mute;

    	if (value === false) {
    		this.audios[audio].mute  = false;
    	} else if(value===true) {
    		this.audios[audio].mute  = true;
    	}

    	this.refresh();

    	return this.audios[audio].mute;

    },

	play: function(effectName) {
    	if(!this.audios.effects.mute){
    		this.audios.effects[effectName].play();
    	}			
	}
};var Player = (function(){"use strict";var proto$0={};
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
    $('#last-score-list').prepend('<li>'+this.name+': '+pointWithCombo+' points</li>');
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
        $('body').prepend('<img class="gifEvent" src="/assets/anim/combo.gif" />');
        setTimeout(function() {
            $('.gifEvent').remove();
        }, 2000);
        this.cleanEated();
        return true;
    }
    return false;
  };

  proto$0.move = function() {
    switch(this.mode) {
        case 'easy':
            return AI.easyMove();
        break;
        case 'medium':
            return AI.mediumMove();
        break;
        case 'hard':
            return AI.hardMove();
        break;
    }
  };
MIXIN$0(Player.prototype,proto$0);proto$0=void 0;return Player;})();;



var AI = {
    possiblePositions: function() {
        var positions = [];

        for(var x = 1; x < 8; x++) {
            var newPos = [x, MainChar.currentPosition()[1]];
            if (newPos[0] !== MainChar.currentPosition()[0])
                positions.push(newPos);
        }
        for(var y = 1; y < 8; y++) {
            var newPos$0 = [MainChar.currentPosition()[0], y];
            if (newPos$0[1] !== MainChar.currentPosition()[1])
                positions.push(newPos$0);
        }
        return positions;
    },

    getTarget: function() {
        return 'div[data-x='+this.newPosition[0]+'][data-y='+this.newPosition[1]+']';
    },

    setNewPos: function(elements) {
        var randomElement = Math.floor(Math.random()*elements.length);
        this.newPosition = elements[randomElement];
    },

    easyMove: function() {
        var randomElement = Math.floor(Math.random()*this.possiblePositions().length);
        this.setNewPos(this.possiblePositions());
        return this.moveChar();
    },

    mediumMove: function() {
        var goodPositions = this.possiblePositions();

        for (var i = 0; i < goodPositions.length; i++){
            var div = $('div[data-x='+goodPositions[i][0]+'][data-y='+goodPositions[i][1]+']');
            if (div.children().length === 0 || !div.find('img').attr('data-id'))
                goodPositions[i] = null;
        }

        goodPositions = $.grep(goodPositions,function(n){ return n == 0 || n });
        goodPositions = (goodPositions.length === 0) ? this.possiblePositions() : goodPositions;

        this.setNewPos(goodPositions);
        return this.moveChar();
    },

    hardMove: function() {
        var bestPosition = null;
        var bestValue = 0;

        for (var i = 0; i < this.possiblePositions().length; i++) {
            var div = $('div[data-x='+this.possiblePositions()[i][0]+'][data-y='+this.possiblePositions()[i][1]+']');
            if (div.children().length > 0 && div.find('img').attr('data-id')) {
                var enemyId = div.find('img').data('id');
                if (Game.enemies[enemyId].points() > bestValue) {
                    bestValue = Game.enemies[enemyId].points();
                    bestPosition = this.possiblePositions()[i];
                }
            }
        }

        this.newPosition = bestPosition;
        return this.moveChar();
    },

    moveChar: function() {
        var targetPosition = $(this.getTarget()).offset();
        var currentPosition = $('#main-char').parent('div').offset();

        $('#main-char').css('transition','1s');
        $('#main-char').css('left',targetPosition.left - currentPosition.left)
        $('#main-char').css('top',targetPosition.top - currentPosition.top);
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                $('#main-char').css('transition','none');
                MainChar.eat(AI.getTarget()).then(function(result) {
                    resolve();
                });
            }, 1000);
        });
        return promise;
    }
}
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

function displayHisto() {
    var element = $('#histo');
    if ($(element).is(":visible")) {
        hide(element);
    } else {
        show(element);
    }
}

function goToManual() {
    location.href='/manual.html';
}

function quit() {
    window.alert("Merci de fermer votre onglet ou votre navigateur");
}
;var actualPlayer="";
var turn = 1;
var botIsPlaying = false;

var Game = {
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
            this.p2 = new Player('El Scobar', 2, this.mode);
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
                if(MainChar.isOnSameLine($(this).data('x'), $(this).data('y')) && !MainChar.isOnSameCase($(this).data('x'), $(this).data('y'))) return true;
            },
            drop: function(event, ui) {
                $('#main-char').draggable('disable');

                // Eat target and update positions/points
                var moved = MainChar.eat(event.target);

                moved.then(function() {
                    if (Game.currentPlayer().mode !== 'duo' ) {
<<<<<<< HEAD
                        Game.p2.move().then(function() {
                            $('#main-char').draggable({disabled:false});
                        });
                    } else {
                        $('#main-char').draggable({disabled:false});
=======
                        $('#main-char').draggable('disable');

                        Game.p2.move().then(function() {
                            $('#main-char').draggable({disabled:false});
                        });
>>>>>>> Add promise for async function and remove draggable when bot is playing
                    }
                });
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

    currentPlayer: function() {
        return (this.p2.round >= this.p1.round) ? this.p1 : this.p2;
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
        this.makeDraggable();
    },

    eat: function(div) {
        var id = $(div).find('img').data('id');
        var x = $(div).data('x');
        var y = $(div).data('y');

<<<<<<< HEAD
<<<<<<< HEAD

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
            }, 1100);
        }
=======
=======
>>>>>>> Add promise for async function and remove draggable when bot is playing
        var promise = new Promise(function(resolve, reject) {
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
                    resolve();
                }, 1000);
            } else {
                // resolve for return promise on empty case
                resolve();
            }
        });
<<<<<<< HEAD
>>>>>>> Add promise for async function and remove draggable when bot is playing
=======
>>>>>>> Add promise for async function and remove draggable when bot is playing

        Game.currentPlayer().addRound();
        this.updatePosition(div);

        return promise;
        // return MainChar.isOnSameLine(x, y);
    },

    isOnSameLine: function(x, y) {
        return $('#main-char').data('x') === x || $('#main-char').data('y') === y;
    },

    isOnSameCase: function(x, y) {
        return $('#main-char').data('x') === x && $('#main-char').data('y') === y;
    },

    currentPosition: function() {
        return [parseInt($('#main-char').data('x')), parseInt($('#main-char').data('y'))];
    },

    updatePosition: function(div) {
        $('#main-char').data('x', $(div).data('x'));
        $('#main-char').data('y', $(div).data('y'));

        if (Game.currentPlayer().name != actualPlayer) {
			if (turn==1) {
				$(".player > #player1").parent().removeClass("inactive").addClass("active");
				$(".player > #player2").parent().removeClass("active").addClass("inactive");
				turn=2;
			} else {
				$(".player > #player1").parent().removeClass("active").addClass("inactive");
				$(".player > #player2").parent().removeClass("inactive").addClass("active");
				turn=1;
			}
		}
		actualPlayer=Game.currentPlayer().name;
    },

    makeDraggable: function() {
        $('#main-char').draggable({containment: "#game", revert: function(event, ui) {
            if (!event) {
                $('#main-char').attr("src","/assets/anim/rollingAnimation.gif");
            }
            return !event;
        }, start: function() {
          $('#main-char').attr("src","/assets/anim/dragAnimation.gif");
        }, stop: function() {
            if ($('#main-char').attr('src') == "/assets/anim/dragAnimation.gif") {
                $('#main-char').attr("src","/assets/img/personnageprincipal.png");
            }
        }});
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
        case "hard":
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
    setTimeout(function() {
        $(sectionId).fadeIn(500);
    }, 400)
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
;// support for IE11

// To add to window
if (!window.Promise) {
    var Promise = require('es6-promise').Promise;
}


if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
>>>>>>> add support for promise for IE11
=======
>>>>>>> Add perf optimisation
