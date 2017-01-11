var highscoreCookies = getCookie('highscore');

displayHighScore();

function displayHighScore() {
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
