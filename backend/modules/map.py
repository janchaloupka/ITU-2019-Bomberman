#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: map.py
# Author: Michal Krůl

from typing import List
from backend.modules.obstacle import Obstacle

class Map:
    width: int = 21
    height: int = 21
    
    def __init__(self, background, name):
        self.background = background
        self.obstacles: List[Obstacle] = []
        self.name = name

    def generateObstacles(self):
        '''Dle typu mapy vytvori prekazky'''
        if (self.name == "Map1"):
            for x in range(1, self.width ,2):
                for y in range(1, self.height, 2):
                    self.obstacles.append(Obstacle(x, y))
        if (self.name == "Map2"):
            pass
        if (self.name == "Map3"):
            pass

    def getBackground(self):
        return self.background

    def getObstacles(self) -> List[Obstacle]:
        return self.obstacles

    def getName(self) -> str:
        return self.name


mockMap = {
    "Map1" : Map (None, "Map1"),
    "Map2" : Map (None, "Map2"),
    "Map3" : Map (None, "Map3")
}