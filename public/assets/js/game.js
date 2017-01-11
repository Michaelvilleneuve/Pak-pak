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

		let texture = this.textures[this.textures.length - 1];
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

		let lastEnemy = this.ennemies[this.ennemies.length - 1];

		lastEnemy.x = Math.floor(Math.random() * 200) + 140;
		lastEnemy.y = Math.floor(Math.random() * 200) + 150;

		lastEnemy.width = 30;
		lastEnemy.height = 30;

		this.stage.addChild(lastEnemy);
		this.renderer.render(this.stage);
	},
}


Game.init();