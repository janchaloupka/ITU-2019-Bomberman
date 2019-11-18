#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: game.py
# Author: Michal Krůl

from backend.modules.id import ID

class Game():

    def __init__(self):
        self.ID = ID()
        self.time_limit = 0
        self.no_of_rounds = 0

    def getID(self):
        return ID.getIDNumber()

    def setTimeLimit(self, time_limit):
        self.time_limit = time_limit

    def getTimeLimit(self):
        return time_limit

    def setNoOfRounds(self, no_of_rounds):
        self.no_of_rounds = no_of_rounds