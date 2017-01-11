var Game = {
	ennemies: [],
	textures: [],
	init: function() {
		this.renderer = PIXI.autoDetectRenderer(512, 512);
		
		document.querySelector('.game').appendChild(this.renderer.view);

		this.stage = new PIXI.Container();
		this.renderer.render(this.stage);

		this.setColor();
		this.setup();
	},

	setColor: function() {
		this.renderer.backgroundColor = 0x061639;
		this.renderer.render(this.stage);
	},

	setup: function() {
		this.setupTextures();
		this.setupEnemies();

	},

	setupEnemies: function() {
		this.ennemiesAssets = [
			"assets/img/ennemy1.png",
			"assets/img/ennemy2.png",
			"assets/img/ennemy3.png",
			"assets/img/ennemy4.png"
		];

		for(var i = 0; i < this.ennemiesAssets.length; i++) {
			PIXI.loader
			  .add(this.ennemiesAssets[i])
		  	  .load(Enemy.setup.bind(this, i));
			
		}
	},

	setupTextures: function() {
		this.texturesAssets = [
			"assets/img/plateau.png",
		];

		for(var i = 0; i < this.texturesAssets.length; i++) {
			PIXI.loader
			  .add(this.texturesAssets[i])
		  	  .load(Textures.setup.bind(this, i));
			
		}
	}
}

Textures = {
	setup: function(i) {
		this.textures.push(
			new PIXI.Sprite(
				PIXI.loader.resources[
					this.texturesAssets[i]
				].texture
			)
		);

		var texture = this.textures[this.textures.length - 1];
		texture.x = 100;
		texture.y = 140;
		texture.width = 320;
		texture.height = 280;

		console.log(texture);
		this.stage.addChild(texture);
		this.renderer.render(this.stage);
	}
}


Enemy = {
	setup: function(i) {
		this.ennemies.push(
			new PIXI.Sprite(
				PIXI.loader.resources[
					this.ennemiesAssets[i]
				].texture
			)
		);

		var lastEnemy = this.ennemies[this.ennemies.length - 1];

		lastEnemy.x = Math.floor(Math.random() * 200) + 140;
		lastEnemy.y = Math.floor(Math.random() * 200) + 150;

		lastEnemy.width = 30;
		lastEnemy.height = 30;

		this.stage.addChild(lastEnemy);
		this.renderer.render(this.stage);
	},
}


Game.init();;;// Actions //

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
