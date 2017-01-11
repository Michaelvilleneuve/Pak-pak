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
MIXIN$0(GameController.prototype,proto$0);proto$0=void 0;return GameController;})();

var gameController = new GameController();

// Actions
$('#next').click(function()  {
    gameController.nextRound();
})
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
  p1 = new Player($('#pickname #namej1').val());
  p2 = new Player($('#pickname #namej2').val());
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
;var Player = (function(){"use strict";var proto$0={};
  function Player(name) {
    this.name = name;
    this.round = 0;
  }DP$0(Player,"prototype",{"configurable":false,"enumerable":false,"writable":false});

  proto$0.addRound = function() {
    this.round = this.round + 1;
  };
MIXIN$0(Player.prototype,proto$0);proto$0=void 0;return Player;})();;
;