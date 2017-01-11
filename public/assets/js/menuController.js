// Actions //

$('#play').click(function() {
removeSection('#menu');
showSection('#gametype');
})

$('#gametype').children('button').each(
  function() {
    $(this).click(function() {
      chooseGameType(this.id);
    });
  }
);

$('#start').click(function() {
  affectName();
  removeSection('#menu-container');
  showSection('#main-container');
})

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

function affectName() {
  var player1 = $('#pickname #namej1').val();
  var player2 = $('#pickname #namej2').val();
  $('#player1').html(player1);
  $('#player2').html(player2);
}

function removeSection(sectionId) {
  $(sectionId).fadeOut(300);
}

function showSection(sectionId) {
  $(sectionId).fadeIn(300);
}
