

document.addEventListener('DOMContentLoaded', () => {
	//initialize username variable
	var username = '';
	// Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
	//check if user already set a username:
	if (!localStorage.getItem('username')){
		//if user has no name, show the form to let them setup name, then save it to local storage - also to sessions?
		$('#modalUser').modal('show');

		//modal submit disabled by default
		document.querySelector('#create-username').disabled = true;

		//ensure user entered something
		document.querySelector('#new-username').onkeyup = () => {
			if (document.querySelector('#new-username').value.length > 0)
				document.querySelector('#create-username').disabled = false;
			else
				document.querySelector('#create-username').disabled = true;
		};
		//when user submits username, save it to local storage
		document.querySelector("#create-username").onclick = function() {

			//save username user enters
			username = document.querySelector('#new-username').value;

			//save username
			localStorage.setItem('username', username);
			// $('#Modal-user').modal('hide');
			//welcome message to user
			document.querySelector('#show-users').innerHTML = `Welcome to Flack ${username}`;

		};
	} else {
		//retrieve username from storage if user already previously entered name
		username = localStorage.getItem('username');
		document.querySelector('#show-users').innerHTML = `Welcome to Flack ${username}`;
	}


	// When connected, configure buttons
    socket.on('connect', () => {



		//create channel disabled by default
		document.querySelector('#create').disabled = true;

		//enable button only if there is text in the input field
		//also cannot match an item in list
		document.querySelector('#channel').onkeyup = () => {
			if (document.querySelector('#channel').value.length > 0)
				document.querySelector('#create').disabled = false;
			else
				document.querySelector('#create').disabled = true;
		};

		document.querySelector('#new-channel').onsubmit = () => {
			//create new item for list
			const li = documnt.createElement('li');
			li.innerHTML = documnt.querySelector('#channel').value;

			//add new channel to list
			document.querySelector('#channels').append(li);

			// Clear input field and disable button again
			document.querySelector('#channel').value = '';
			document.querySelector('#create').disabled = true;

			// Stop form from submitting
			return false;
		};
	});


});
