#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: map.py
# Author: Michal Krůl

from backend.modules.id import ID

class Map:

    def __init__(self, background):
        self.ID = ID()
        self.background = background

    def getIDNumber(self):
        return ID.getIDNumber()

    def getBackground(self):
        return background
