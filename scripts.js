// Created by @duc1607
// Date: 28-04-2019 19:02
// Last modified: 29-04-2019 13:02

var winning_rate = Math.ceil(Math.random()*10);
var user_win;

var host_score = 0;
var user_score = 0;
var round = 1;

var host_win_at = [0,0];

if(winning_rate > 6) { //allow users to win if winning_rate > 7/10
	user_win = true;
	generate_host_win_at_rounds(false);
}
else {
	user_win = false;
	generate_host_win_at_rounds(true);
}

$(function() {
	$('button').click(function() { //listen to buttons
		var choice = $(this).attr('choice'); //get user's choice
		if(round == host_win_at[0] || round == host_win_at[1]) { //host win rounds
			choose(choice,'host'); //host plays
		}
		else {
			choose(choice,'user'); //user plays
		}
		setTimeout(function() {
			update_score();
			$('button').show();
			if(round == 3) end();
			else {
				round++;
			}
		},2000);
	});

	$('#startBtnDiv').click(function() {
		start();
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
	$('#host-image').attr('src','Images/Host/Preperation-Host.gif');
	$('#user-image').attr('src','Images/User/Preperation-User.gif');
	$("#startBtnDiv").hide();
	$("#playBtnDiv").show();
	$('#result').html('<b id="host-score">0</b> - <b id="user-score">0</b>');
}

function end() {
	if(user_win) {
		$('#host-image').attr('src','Images/Host/Lose.jpg');
		$('#user-image').attr('src','Images/User/Win.jpg');
	}
	else {
		$('#host-image').attr('src','Images/Host/Win.jpg');
		$('#user-image').attr('src','Images/User/Lose.jpg');
	}
	$("#startBtnDiv").show();
	$("#playBtnDiv").hide();
	restart();
}

function generate_host_win_at_rounds(host_win) { //which rounds host should win
	if(host_win) {
		host_win_at[0] = Math.floor(Math.random() * 3) + 1; //randomize between 1 and 3
		host_win_at[1] = Math.floor(Math.random() * 3) + 1; //randomize between 1 and 3
		while(host_win_at[1] == host_win_at[0]) { //make sure that rounds are different
			host_win_at[1] = Math.floor(Math.random() * 3) + 1;
		}
	}
	else {
		host_win_at[0] = Math.floor(Math.random() * 3) + 1;
	}
}

function update_score() {
	$('#host-score').text(host_score);
	$('#user-score').text(user_score);
}

function choose(choice, player) {
	if(player == 'host') { //host win
		switch(choice) { //user chose rock so host chosed paper and so on
			case 'rock':
				$('button').eq(1).toggle();
				$('button').eq(2).toggle();
				$('#host-image').attr('src','Images/Host/Paper.gif');
				$('#user-image').attr('src','Images/User/Rock.gif');
				break;
			case 'paper':
				$('button').eq(0).toggle();
				$('button').eq(2).toggle();
				$('#host-image').attr('src','Images/Host/Scissors.gif');
				$('#user-image').attr('src','Images/User/Paper.gif');
				break;
			case 'scissors':
				$('button').eq(0).toggle();
				$('button').eq(1).toggle();
				$('#host-image').attr('src','Images/Host/Rock.gif');
				$('#user-image').attr('src','Images/User/Scissors.gif');
				break;
			default:
				break;
		}
		host_score++;
	}
	else { //user win
		switch(choice) { //user chose rock so host chosed paper and so on
			case 'rock':
				$('button').eq(1).toggle();
				$('button').eq(2).toggle();
				$('#host-image').attr('src','Images/Host/Scissors.gif');
				$('#user-image').attr('src','Images/User/Rock.gif');
				break;
			case 'paper':
				$('button').eq(0).toggle();
				$('button').eq(2).toggle();
				$('#host-image').attr('src','Images/Host/Rock.gif');
				$('#user-image').attr('src','Images/User/Paper.gif');
				break;
			case 'scissors':
				$('button').eq(0).toggle();
				$('button').eq(1).toggle();
				$('#host-image').attr('src','Images/Host/Paper.gif');
				$('#user-image').attr('src','Images/User/Scissors.gif');
				break;
			default:
				break;
		}
		user_score++;
	}
}

function restart() {
	winning_rate = Math.ceil(Math.random()*10);

	host_score = 0;
	user_score = 0;
	round = 1;

	host_win_at = [0,0];

	if(winning_rate > 7) { //allow users to win if winning_rate > 7/10
		user_win = true;
		generate_host_win_at_rounds(false);
	}
	else {
		user_win = false;
		generate_host_win_at_rounds(true);
	}
}