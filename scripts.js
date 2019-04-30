// Created by @duc1607
// Date: 28-04-2019 19:02
// Last modified: 30-04-2019 16:00

var draw_rate = 6;

var host_score = 0;
var user_score = 0;
var current_round = 1;

var winning_score = 3;

function start() {
	$('#host-image').attr('src','Images/Host/Preperation-Host.gif');
	$('#user-image').attr('src','Images/User/Preperation-User.gif');
	$("#startBtnDiv").hide();
	$("#playBtnDiv").show();
	$('#result').html('<b id="host-score">0</b> - <b id="user-score">0</b>');
	winning_score = $('#rounds-input').val(); //get winning score from input
	if(isNaN(winning_score) || winning_score <= 0 || winning_score > 5) {
		winning_score = 3;
		$('#rounds-input').val('3');
	}
	$('#rounds-input').attr('disabled',''); //disable score input field
}

$(function() {
	$('button').click(function() { //listen to buttons
		var choice = $(this).attr('choice'); //get user's choice
		
		choose(choice);

		setTimeout(function() {
			update_score();
			$('button').show();
			if(user_score == winning_score || host_score == winning_score) end();
			else {
				current_round++;
			}
		},2000);
	});

	$('#startBtnDiv').click(function() {
		start();
	});

	$('#name-input').keyup(function() { //change name input field size by input length
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

function update_score() {
	$('#host-score').text(host_score);
	$('#user-score').text(user_score);
	// console.log("Round "+ current_round + ": " + host_score + " - " + user_score);
}

function choose(choice) {
	var user_choice = choice;

	//random madness
	var host_choices = ['rock','paper','scissors'];
	var host_choices_index = Math.floor(Math.random() * 3);
	var host_choice = host_choices[host_choices_index];

	switch(user_choice) {
		case 'rock':
			$('button').eq(1).toggle();
			$('button').eq(2).toggle();
			$('#user-image').attr('src','Images/User/Rock.gif');
			break;
		case 'paper':
			$('button').eq(0).toggle();
			$('button').eq(2).toggle();
			$('#user-image').attr('src','Images/User/Paper.gif');
			break;
		case 'scissors':
			$('button').eq(0).toggle();
			$('button').eq(1).toggle();
			$('#user-image').attr('src','Images/User/Scissors.gif');
			break;
		default:
			break;
	}

	switch(host_choice) {
		case 'rock':
			$('#host-image').attr('src','Images/Host/Rock.gif');
			break;
		case 'paper':
			$('#host-image').attr('src','Images/Host/Paper.gif');
			break;
		case 'scissors':
			$('#host-image').attr('src','Images/Host/Scissors.gif');
			break;
		default:
			break;
	}

	if(host_choice == "rock" && user_choice == "scissors" ||
		host_choice == "paper" && user_choice == "rock" ||
			host_choice == "scissors" && user_choice == "paper") { //host win
		host_score++;
	}
	else if(host_choice == "rock" && user_choice == "paper" ||
		host_choice == "paper" && user_choice == "scissors" ||
			host_choice == "scissors" && user_choice == "rock") { //user wins
		user_score++;
	}
	else { //draw
		current_round-=1;
	}
}

function restart() {
	host_score = 0;
	user_score = 0;
	current_round = 1;
}

function end() {
	if(user_score > host_score) {
		$('#host-image').attr('src','Images/Host/Lose.jpg');
		$('#user-image').attr('src','Images/User/Win.jpg');
	}
	else {
		$('#host-image').attr('src','Images/Host/Win.jpg');
		$('#user-image').attr('src','Images/User/Lose.jpg');
	}
	$("#startBtnDiv").show();
	$("#playBtnDiv").hide();
	$('#rounds-input').removeAttr('disabled');
	restart();
}
