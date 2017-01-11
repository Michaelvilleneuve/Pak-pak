var Game = {
	ennemies: [],
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

		this.stage.addChild(this.ennemies[this.ennemies.length - 1]);
		this.renderer.render(this.stage);
	}
}


Game.init();;