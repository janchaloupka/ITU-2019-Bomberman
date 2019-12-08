#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: obstacle.py
# Author: Michal Krůl

from backend.modules.position import Position

class Obstacle(Position):
    def __init__(self, x: int = 0, y: int = 0):
        self.position = Position(x, y)
    
    def getPosition(self):
        return self.position
