document.addEventListener('DOMContentLoaded', () => {
	// Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

	// When connected, configure buttons
    socket.on('connect', () => {

		//disable messages if blank
		document.querySelector('#send-message').disabled = true;

		//ensure user entered something
		document.querySelector('#message').onkeyup = () => {
			if (document.querySelector('#message').value.length > 0)
				document.querySelector('#send-message').disabled = false;
			else
				document.querySelector('#send-message').disabled = true;
		};

		//when user sends a new message
		document.querySelector('#form-message').onsubmit = () => {
			//save what user typed inspect
			// const cur_channel = document.querySelector("#current-channel").innerText;
			const msg = document.querySelector("#message").innerText;
			socket.emit('new message', {"msg": msg});

			// Clear input field and disable button again
			document.querySelector('#message').value = '';
			document.querySelector('#send-message').disabled = true;

			// Stop form from submitting
			return false;
		};

		//when user successfully sends a new message
		socket.on('new message sent', data => {
			// var new_msg = `${data.msg}`
			const li = document.createElement('li');
			li.innerHTML = `${data.msg}`;
			document.querySelector('#list-messages').append(li);
		});

	});
});
