// Created by @duc1607
// Date: 28-04-2019 19:02
// Last modified: 28-04-2019 23:05

$(function() {
	$('button').click(function() { //listen to buttons
		var choice = $(this).attr('choice'); //get user's choice
		switch(choice) { //user chose rock so host chosed paper and so on
			case 'rock':
				$('#host-image').attr('src','Images/Host/Paper.gif');
				$('#user-image').attr('src','Images/User/Rock.gif');
				break;
			case 'paper':
				$('#host-image').attr('src','Images/Host/Scissors.gif');
				$('#user-image').attr('src','Images/User/Paper.gif');
				break;
			case 'scissors':
				$('#host-image').attr('src','Images/Host/Rock.gif');
				$('#user-image').attr('src','Images/User/Scissors.gif');
				break;
			default:
				break;
		}
		setTimeout(function() {
			// alert();
		},2000);
	});

	$('input').keyup(function() { //change name input field size by input length
		var input_length = $(this).val().length;
		if(input_length == 0) {
			$(this).attr('size',4);
			$('#user-name').text('You');
		}
		else {
			$(this).attr('size',input_length + 1);
			$('#user-name').text($(this).val());
		}
	});
});

function start() {
	$("#startBtnDiv").remove();
	$('#result').html('<b id="host-score">0</b> - <b id="host-score">0</b>');
}