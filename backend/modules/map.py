#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: map.py
# Author: Michal Krůl

from typing import List
from backend.modules.obstacle import Obstacle

class Map:
    width: int = 30
    height: int = 20
    
    def __init__(self, background, name):
        self.background = background
        self.obstacles: List[Obstacle] = []
        self.name = name

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