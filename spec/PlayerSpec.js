var Game = require("public/assets/js/game.js");




console.log(Game);

require("public/assets/js/Player.js");

describe("Joueur", function() {
    describe("Les points du joueur", function() {



    	Game.p1 = new Player("Joueur 1", 1);
        Game.p2 = new Player("Joueur 2", 2);

        Game.p1.addPoints(500);
        Game.p2.addPoints(5);



    	
        it("Qui gagne? Retourne p1", function() {
            expect(Game.winner()).toBe(Game.p1);
        });

                
    });
});