var Game = {
    enemies: [],
    columns_nb: 49,

    init: function() {
        $(document).on('click', '#start', function() {
            Game.setPlayers();
            Game.launchGame();
        })
    },

    setPlayers: function() {
        this.p1 = new Player($('#pickname #namej1').val(), 1);
        this.p2 = new Player($('#pickname #namej2').val(), 2);
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
                if(MainChar.isOnSameLine($(this).data('x'), $(this).data('y'))) {
                    return true;
                }
            },
            drop: function(event, ui) {
                MainChar.eat(event.target);
            },
        });
    },

    setEnemies: function() {
        for(i = 0; i < 48; i++) {
            const enemy_number = Math.floor(Math.random() * 5) + 1;
            this.enemies.push(new Enemy(i+1, enemy_number));
        }
        this.showEnemies();
    },

    showEnemies: function() {
        for(let i = 0; i < this.enemies.length; i++) {
            const rotate = ((Math.random() >= 0.5) ? "rotate":"");
            $('#case-'+this.enemies[i].case_id).append("\
                <img data-id='"+i+"' class='"+rotate+"' src='"+this.enemies[i].image()+"'>\
            ");
        }
    },

    nextRound: function() {
        if (this.p2.round < this.p1.round) {
          this.p2.addRound();
        } else {
          this.p1.addRound();
        }
    },

    currentPlayer: function() {
        return (this.p2.round > this.p1.round) ? this.p1 : this.p2;
    }
}


MainChar = {
    init: function() {
        $(".case:not(:has(>img))").append("<img id='main-char' src='assets/img/personnageprincipal.png'>");
        this.updatePosition($('#main-char').parent('div'));
        $('#main-char').draggable({containment: "#game",revert: 'invalid'});
    },

    eat: function(div) {
        let id = $(div).find('img').data('id');
        let x = $(div).data('x');
        let y = $(div).data('y');

        
        if(id && MainChar.isOnSameLine(x, y)) {
            Game.currentPlayer().addPoints(Game.enemies[id].points());
            Game.enemies.splice(id, 1);
            $(div).find('img').remove();
        }

        Game.currentPlayer().addRound();
        this.updatePosition(div);
        
        return MainChar.isOnSameLine(x, y); 
    },

    isOnSameLine(x, y) {
        return $('#main-char').data('x') === x || $('#main-char').data('y') === y; 
    },

    updatePosition: function(div) {
        $('#main-char').data('x', $(div).data('x')); 
        $('#main-char').data('y', $(div).data('y')); 
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
                points = 40;
            break;
            case 5:
                points = 50;
            break;
        }
        return points;
    }

    image() {
        return "assets/img/ennemy" + this.type + ".png";
    }
}


Game.init();