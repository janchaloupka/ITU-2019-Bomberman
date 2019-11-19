#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: map.py
# Author: Michal Krůl

from typing import List
from modules.obstacle import Obstacle

class Map:
    width: int = 30
    height: int = 20
    
    def __init__(self, background):
        self.background = background
        self.obstacles: List[Obstacle] = []

    def getBackground(self):
        return self.background

    def getObstacles(self) -> List[Obstacle]:
        return self.obstacles
