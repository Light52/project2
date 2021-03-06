
// url for channel
// function create_url(my_channel) {
// 	return "{{ url_for('channel', channel_name=#channel#) }}".replace('#channel#', my_channel);
// }

document.addEventListener('DOMContentLoaded', () => {
	//initialize username variable
	var username = '';
	// Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

	// When connected, configure buttons
    socket.on('connect', () => {

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

				username = document.querySelector('#new-username').value;
				//send username to server to save it in session var
				socket.emit('create username', {'username': username});
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

		//when user submits a request for new channel
		document.querySelector('#new-channel').onsubmit = () => {
			//save user input for new channel
			const channel = document.querySelector('#channel').value;
			socket.emit('create channel', {'channel': channel});

			// Clear input field and disable button again
			document.querySelector('#channel').innerText = '';
			document.querySelector('#create').disabled = true;

			// Stop form from submitting
			return false;
		};

		//when a new channel is created
		socket.on('new channel created', data => {
			var new_channel = `${data.channel}`
			var url = Flask.url_for("channel", {"channel_name": new_channel})
			var li = document.createElement('li');
			li.innerHTML = `<a href = ${url}>${new_channel}</a>`;
			// li.innerHTML = "<a href={{ url_for('channel', channel_name='' }}" + new_channel + '>' + new_channel + '</a>';
			document.querySelector('#channels').append(li);

						// new_channel = `${data.channel}`
			// var li = document.createElement('li');
			// var a = document.createElement('a');
			// var ul = document.querySelector('#channels');
			// var link = create_url(new_channel);
			// var links = [link, "test.html"]
			//
			// a.href = links[0];
			// a.innerText = new_channel;
			// ul.appendChild(li);
			// li.appendChild(a);


			// link.setAttribute('href', create_url(new_channel));
			// link.innerHTML = "Link Here";

			//check what this does!
			// document.body.appendChild(link);


			// const li = document.createElement('li');
			// li.innerHTML = `${data.channel}`;
			// //add new channel to list
			// document.querySelector('#channels').append(li);


		});

		socket.on('channel already exists', data => {
			alert(`${data.channel} already exists! Please try again.` )
		});

	});


});
