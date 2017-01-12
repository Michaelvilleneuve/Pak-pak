GameAudio = {
	audios : {
		effects : {
			mute : false,
			beat : new Audio("assets/audio/beat.mp3"),
			jump : new Audio("assets/audio/jump.mp3"),
			lose : new Audio("assets/audio/lose.mp3"),
			win  : new Audio("assets/audio/win.mp3"),
		},
		theme : {
			mute : false,
			main : new Audio("assets/audio/theme.mp3")
		}

	},


	refresh: function() { 
		if(this.audios.theme.mute){
			this.audios.theme.main.pause();
		} else {
			this.audios.theme.main.play();
		}
	},

	startTheme: function() {
		this.audios.theme.main.play();
		this.audios.theme.main.volume = 0.5;
		this.audios.theme.main.loop = true;
	},

	stopTheme: function() {
		this.audios.theme.main.pause();
	},

	toggleMute: function(audio , value) {

    	this.audios[audio].mute = !this.audios[audio].mute;

    	if (value === false) {
    		this.audios[audio].mute  = false;
    	} else if(value===true) {
    		this.audios[audio].mute  = true;
    	}

    	this.refresh();

    	return this.audios[audio].mute;

    },

	play: function(effectName) {
    	if(!this.audios.effects.mute){
    		this.audios.effects[effectName].play();
    	}			
	}
}