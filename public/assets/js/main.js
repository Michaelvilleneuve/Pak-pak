socket = io();

$(document).ready(function(){

$(document).on('click','#pseudo-sub', function(event) {
	event.preventDefault();
	var pseudo = $('#pseudo-content').val();
	socket.emit("set_pseudo", pseudo);	
	$('.pseudo').fadeOut(); 
})




// enter sends messages
document.onkeypress = kp;
function kp(e){
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode
    if( $(".pseudo").is(":visible") ){
    	if(charCode===13){
	    	e.preventDefault();
	    	e.stopPropagation();
			$("#pseudo-sub").click();
		}	
    } else {
	    if(charCode===13){
	    	e.preventDefault();
	    	e.stopPropagation();
			send();
		}
	}
}
function send() {
	socket.emit("message", document.getElementById("message").value);
	document.getElementById("message").value = "";
	window.NavigationZQSDEnabled = true;
	$('#message').trigger('change');
}

	// ZQSD nav on/off when writing message
	document.getElementById('message').addEventListener('keydown', function (e){
	    window.NavigationZQSDEnabled = false;
	    socket.emit("writing","");
	}, false);

	$(document).on('change','#message',function() {
		socket.emit("notwriting","");
	})

	$('canvas').on('click', function(){
		window.NavigationZQSDEnabled = true;
	})


	// mobile version
	$(document).on('click', '.open-sidebar', function(){
		if( $('.open-sidebar').hasClass('opened') ){
			// close sidebar
			$('.sidebar').animate({
				'opacity': 0,
			}, 400, function(){
				$('.sidebar').removeClass('visible')
			});

			$('.open-sidebar').removeClass('opened').animate({
				'bottom': '10px'
			}, 400);

		} else {
			// open sidebar
			$('.sidebar').addClass('visible').animate({
				'opacity': 1, 
			}, 400);
			$('.open-sidebar').animate({
				'bottom': '390px'
			}, 400, function(){
				$('.open-sidebar').addClass('opened');
			})
		}
	});

});