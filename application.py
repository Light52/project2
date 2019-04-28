import os

from flask import Flask, session, render_template
from flask_jsglue import JSGlue
from flask_session import Session
from flask_socketio import SocketIO, emit
from models import *

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY") or \
    'e5ac358c-f0bf-11e5-9e39-d3b532c10a28'
socketio = SocketIO(app)
jsglue = JSGlue(app)

#initialize a list of empty channels
# channel_list = []
channels_dic = {}

@app.route("/")
def index():
	#if user was on a previous channel in browser, try to go to that page
	# if session.get("channel_name") is not None:
	# 	return redirect()

	return render_template("index.html", channels_dic = channels_dic)

@app.route("/<string:channel_name>", methods = ["POST", "GET"])
def channel(channel_name):
	if channel_name not in channels_dic:
		return render_template("error.html", message="No such channel, please first create it before trying to navigate to it.")

	#show existing messages in channel:
	messages = channels_dic[channel_name].messages
	for message in messages:
		print(message)

	#set up so session to remember which channel user is in
	print(channel_name)
	session["channel_name"] = channel_name

	return render_template("channel.html", channel_name=channel_name, messages = messages)
"""
-Q: How do we save the list_channels across browser session? When I close the app and reload it, wouldn't it restart it from blank?
"""
@socketio.on("create username")
def create_username(data):
	#save username of user to session
	new_username = data["username"]
	session["username"] = new_username
	print(session.get("username"))

#user trying to create channel
@socketio.on("create channel")
def create_channel(data):
	channel = data["channel"]
	#check if channel already exists with same name:
	if channel not in channels_dic:
		#put channel on everyone's list
		emit("new channel created", {"channel": channel}, broadcast=True)
		#if channel is new, create a Channel object using the name user input - which will be used to save messages after.
		# channel_name = channel
		# channel = Channel(name=channel_name)

		#append the channel to the list so if user refreshes all the channels that have already been created shows
		# channel_list.append(channel)
		channels_dic[channel] = Channel(name=channel)

	else:
		emit("channel already exists", {"channel": channel})

#user sending a new message inside channel
@socketio.on("new message")
def new_message(data):
	msg = data["msg"]
	user = session.get("username")
	new_msg = Message(username = user, text = msg)
	t = "{} \n Sent by {} at {}".format(new_msg.text, new_msg.username, new_msg.time)
	emit("new message sent", {"msg": t}, broadcast = True)
	# cur_channel = data["cur_channel"]
	# #add message to current channel
	# channels_dic[cur_channel].add_message(new_msg)
	ch = session.get("channel_name")
	print(user)
	channels_dic[ch].add_message(new_msg)

if __name__ == "__main__":
    app.run(debug=True)
