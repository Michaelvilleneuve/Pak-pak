$('#play').click(function() {
  $("#menu").fadeOut(300);
  $("#gametype").fadeIn(300);
})

$('#gametype').children('button').each(
  function() {
    $(this).click(function() {
      alert('emile est homo');
    });
  }
);

$('#go').click(function() {
  $('#menu-container').fadeOut(300);
  $('#main-container').fadeIn(300);
})


function play(gametype) {
  switch (gametype) {
    case "solo":
      console.log("je veux jouer solo wallah");
      break;
    case "duo":
      console.log("je veux jouer en duo wallah");
      break;
  }
}
