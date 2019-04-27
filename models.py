from datetime import datetime

class Channel:

	channels_dic = {}
	def __init__(self, name):

		#Username
		self.name = name

		#keep track of the messages allocated to the channel.
		self.messages = []
		Channel.channels_dic[name] = self

	def add_message(self,m):
		#if over 100 messages, remove the first message
		if len(self.messages) > 99:
			self.messages.pop(0)
		self.messages.append(m)

	def print_messages(self):
		for message in self.messages:
			print(message)


class Message:
	def __init__(self, username, text):
		self.username = username
		self.text = text
		self.time = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

	def __repr__(self):
		return "{} \n Sent by {} at {}".format(self.text, self.username, self.time)

def main():

	test = Channel(name = "test")

	#create a messages
	m1 = Message(username = "wow", text= "Great!")
	m2 = Message(username = "second", text= "Good second Message!")


	test.add_message(m1)
	test.add_message(m2)

	test.print_messages()

	len_msg = len(test.messages)
	print(len_msg)

if __name__ =="__main__":
	main()
