
class Position:
	def __init__(self, x: int = 0, y: int = 0):
		self.x = x
		self.y = y

	def getX(self):
		return self.x

	def getY(self):
		return self.y

	def setX(self, x: int):
		self.x = x
	
	def setY(self, y: int):
		self.y = y
