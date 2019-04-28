from datetime import datetime

# channels_dic = {}

#create a class for channels to keep track of the messages inside of it
class Channel:

	def __init__(self, name):

		#Username
		self.name = name

		#keep track of the messages allocated to the channel.
		self.messages = []

		# channels_dic[name] = self

	def add_message(self,m):
		#if over 100 messages, remove the first message
		if len(self.messages) > 99:
			self.messages.pop(0)
		self.messages.append(m)

	def print_messages(self):
		for message in self.messages:
			print(message)

	def __repr__(self):
		return self.name

	# def __eq__(self, other):
	# 	return self.name == other.name

#create a class for all the messages users will type in each chat
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

	#channels_dic["test"].add_message(m1)
	test.add_message(m1)
	test.add_message(m2)

	test.print_messages()

	len_msg = len(test.messages)
	print(len_msg)

if __name__ =="__main__":
	main()
