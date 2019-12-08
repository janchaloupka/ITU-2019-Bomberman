#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: map.py
# Author: Michal Krůl

from typing import List
from backend.modules.obstacle import Obstacle
import json
import os

class Map:
    width: int = 11
    height: int = 9

    def __init__(self, id):
        path = os.path.join(os.path.dirname(__file__), '..', 'maps', id)
        with open(path) as outfile:
            data = json.load(outfile)
            self.id = id
            self.name = data['Name']
                    
        self.obstacles: List[Obstacle] = []
        

    def generateObstacles(self):
        '''Dle typu mapy vytvori prekazky'''
        if (self.id == "Overworld"):
            for x in range(1, self.width ,2):
                for y in range(1, self.height, 2):
                    self.obstacles.append(Obstacle(x, y))
        if (self.id == "Map2"):
            pass
        if (self.id == "Map3"):
            pass

    def getObstacles(self) -> List[Obstacle]:
        return self.obstacles

    def getName(self) -> str:
        return self.name

    def getID(self) -> str:
        return self.id
