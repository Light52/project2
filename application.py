import os

from flask import Flask, session, render_template
from flask_jsglue import JSGlue
from flask_session import Session
from flask_socketio import SocketIO, emit
from models import *

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)
jsglue = JSGlue(app)
#initialize a list of empty channels
list_channels = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<string:channel_name>", methods = ["POST", "GET"])
def channel(channel_name):
	return render_template("channel.html", channel_name=channel_name)
"""
-if channel already exists, return an error.html instead
-if channel does not exist, return success.html, and append the channel to list_channels.
-Q: How do we save the list_channels across browser session? When I close the app and reload it, wouldn't it restart it from blank?
"""
@socketio.on("create username")
def create_username(data):
	#save username of user to session
	new_username = data["username"]
	session["username"] = new_username

#user trying to create channel
@socketio.on("create channel")
def create_channel(data):
	channel = data["channel"]
	#check if channel already exists with same name:
	if channel not in Channel.channels_dic:
		#put channel on everyone's list
		emit("new channel created", {"channel": channel}, broadcast=True)
		#if channel is new, create a Channel object using the name user input - which will be used to save messages after.
		channel_name = channel
		channel = Channel(name=channel_name)
	else:
		emit("channel already exists", {"channel": channel})


if __name__ == "__main__":
    app.run(debug=True)
