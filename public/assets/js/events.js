function show(element) {
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
