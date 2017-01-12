// Actions //

$('#play').click(() => {
    removeSection('#menu');
    showSection('#gametype');
})

// Bind game type buttons
$('#gametype').children('button').each(
    function(){
        $(this).click(() => {
            chooseGameType(this.id);
        });
    }
);

$('#start').click(() => {
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
