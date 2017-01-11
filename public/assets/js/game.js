var Game = {
	init: function() {
		this.renderer = PIXI.autoDetectRenderer(512, 512);
		
		document.querySelector('.game').appendChild(this.renderer.view);

		this.stage = new PIXI.Container();
		this.renderer.render(this.stage);

		this.setColor();
		this.addAssets();
	},

	setColor: function() {
		this.renderer.backgroundColor = 0x061639;
		this.renderer.render(this.stage);
	},

	addAssets: function() {
		PIXI.loader
		  .add("images/anyImage.png")
		  .load(setup);
	}
}


Game.init();