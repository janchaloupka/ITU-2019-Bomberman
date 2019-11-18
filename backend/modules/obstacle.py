#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: obstacle.py
# Author: Michal Krůl

from backend.modules.map import Map

class Obstacle:

    def __init__(self, mapa : Map, position):
        self.mapa = mapa
        self.position = position

    def whereAmI(self):
        return position

    def whichMap(self):
        return mapa