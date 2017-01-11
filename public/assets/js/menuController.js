// Actions //

$('#play').click(() => {
  removeSection('#menu');
  showSection('#gametype');
})

$('#gametype').children('button').each(
  function(){
    $(this).click(() => {
      chooseGameType(this.id);
    });
  }
);

$('#start').click(() => {
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
