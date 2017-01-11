(function() {
	window.AudioEffect = (function() {
		var audios = {
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

		}

		function refresh(){
			if(audios.theme.mute){
				audios.theme.main.pause();
			} else {
				audios.theme.main.play();
			}
		}

	    function AudioEffect() {
	    	audios.theme.main.loop = true;
			audios.theme.main.play();
	    }

	    AudioEffect.prototype.toggleMute = function(audio , value) {

	    	audios[audio].mute = !audios[audio].mute;

	    	if(value===false) {
	    		audios[audio].mute  = false;
	    	} else if(value===true) {
	    		audios[audio].mute  = true;
	    	}


	    	refresh();

	    	return audios[audio].mute;

	    }

	    AudioEffect.prototype.play = function(effectName) {
	    	if(!audios.effects.mute){
	    		audios.effects[effectName].play();
	    	}			
		};

	    return AudioEffect;
	}());
})() ;