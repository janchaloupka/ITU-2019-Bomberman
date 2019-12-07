#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: change.py
# Author: Michal Krůl, Jan Chaloupka

class Change():
    
    def __init__(self, event_type, game):
        self.event_type = event_type
        self.game = game

    def getType(self):
        return self.event_type

    def getGame(self):
        return self.game