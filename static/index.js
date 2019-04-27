

document.addEventListener('DOMContentLoaded', () => {

	var username = '';
	// Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

	// When connected, configure buttons
    socket.on('connect', () => {

		//check if user already set a username:
		if (!localStorage.getItem('username')){
			//if user has no name, show the form to let them setup name, then save it to local storage - also to sessions?
			$('#modalUser').modal('show');

			//when user submits username, save it to local storage
			document.querySelector("#create-username").onclick = function() {

				//save username user enters
				username = document.querySelector('#new-username').value;

				//save username
				localStorage.setItem('username', username);
				// $('#Modal-user').modal('hide');



			};
		} else {
			//retrieve username from storage if user already previously entered name
			username = localStorage.getItem('username');
			//welcome user with their username

		}

		document.querySelector('#show-users').innerHTML = `Welcome to Flack ${username}`;


		});
	// //create channel disabled by default
	// document.querySelector('#create').disable = true;
//
// 	//enable button only if there is text in the input field
// 	//also cannot match an item in list
// 	document.querySelector('#channel').onkeyup = () => {
// 		if (document.querySelector('#channel').value.length > 0)
// 			document.querySelector('#create').disabled = false;
// 		else
// 			document.querySelector('#create').disabled = true;
// 	};
//
// 	document.querySelector('#new-channel').onsubmit = () => {
// 		//create new item for list
// 		const li = documnt.createElement('li');
// 		li.innerHTML = documnt.querySelector('#channel').value;
//
// 		//add new channel to list
// 		document.querySelector('#channels').append(li);
//
// 		// Clear input field and disable button again
// 		document.querySelector('#channel').value = '';
// 		document.querySelector('#create').disabled = true;
//
// 		// Stop form from submitting
// 		return false;
// 	};
//
});
