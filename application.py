import os

from flask import Flask, session, render_template
from flask_session import Session
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

#initialize a list of empty channels
list_channels = []

@app.route("/")
def index():
    return render_template("index.html")


#app.route("/channel", methods = ["POST"])
	#def channel():
"""
-check when user wishes to create channel if channel is already in list.
-if channel already exists, return an error.html instead
-if channel does not exist, return success.html, and append the channel to list_channels.
-Q: How do we save the list_channels across browser session? When I close the app and reload it, wouldn't it restart it from blank?
"""

if __name__ == "__main__":
    app.run(debug=True)
