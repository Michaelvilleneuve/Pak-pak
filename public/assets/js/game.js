var actualPlayer="";
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
        let y = 0;
        let x = 0;
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
<<<<<<< HEAD
                $('#main-char').draggable('disable');

                // Eat target and update positions/points
                var moved = MainChar.eat(event.target);

                moved.then(function() {
                    if (Game.currentPlayer().mode !== 'duo' ) {
                        Game.p2.move().then(function() {
                            $('#main-char').draggable({disabled:false});
                        });
                    } else {
                        $('#main-char').draggable({disabled:false});
=======
                // Eat target and update positions/points
                var moved = MainChar.eat(event.target);

                moved.then(function() {
                    if (Game.currentPlayer().mode !== 'duo' ) {
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
        for(let i = 0; i < 14; i++) {
            this.enemies.push(new Enemy(0, 1));
            this.enemies.push(new Enemy(0, 2));
            this.enemies.push(new Enemy(0, 3));
        }
        for(let i = 0; i < 5; i++) {
            this.enemies.push(new Enemy(0, 4));
        }

        // Shuffle array of enemies randomly
        this.enemies.sort(function() {
          return .5 - Math.random();
        });

        // Define catcher authorized positions
        const possibleCatcherPosition = [];
        for(let i = 0; i < 47; i++)
            if (![3,10,17,21,22,23,24,25,26,27,31,38,45].includes(i))
                possibleCatcherPosition.push(i);

        // Define and add catcher in any authorized position
        const catcherPosition = possibleCatcherPosition[Math.floor(Math.random()*possibleCatcherPosition.length)];
        this.enemies.splice(catcherPosition, 0, new Enemy(0, 5));

        this.showEnemies();
    },

    showEnemies: function() {
        for (let i = 0; i < this.enemies.length + 1; i++) {
            // Check if case is not middle case
            if(i !== 24) {
                const enemyId = (i > 24) ? i-1 : i;
                const caseId = i+1;
                const rotate = ((Math.random() >= 0.5) ? "rotate":"");

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

    checkVictory() {
        if(this.winner()) {
            this.addHighScore(this.winner());
            GameAudio.stopTheme();
            GameAudio.audios.effects.win.play();
            this.congratulate();
        }
    },

    winner() {
        if (this.p1.score >= 500) return this.p1;
        if (this.p2.score >= 500) return this.p2;
        return false;
    },

    congratulate() {
        if (confirm(this.winner().name + " a gagné !!!!! Voulez-vous rejouer ?"))
            document.location.reload();
        else
            $('#main-char').draggable('disable');
    },

    addHighScore(player) {
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
        let id = $(div).find('img').data('id');
        let x = $(div).data('x');
        let y = $(div).data('y');

        var promise = new Promise(function(resolve, reject) {
            if(typeof id !== 'undefined' && MainChar.isOnSameLine(x, y)) {
                let mainChar = $('#main-char');
                let enemy = $(div).find('img');

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
                }, 1100);
            } else {
                // resolve for return promise on empty case
                resolve();
            }
        });

        Game.currentPlayer().addRound();
        this.updatePosition(div);

        return promise;
        // return MainChar.isOnSameLine(x, y);
    },

    isOnSameLine(x, y) {
        return $('#main-char').data('x') === x || $('#main-char').data('y') === y;
    },

    isOnSameCase(x, y) {
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

class Enemy {
    constructor(case_id, type) {
        this.case_id = case_id;
        this.type = type;
    }

    points() {
        let points = 0;
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
    }

    image() {
        return "assets/img/ennemy" + this.type + ".png";
    }
}


Game.init();
