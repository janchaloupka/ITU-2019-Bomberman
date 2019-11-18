#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: bomb.py
# Author: Michal Krůl

from backend.modules.game import Game

class Bomb():

    def __init__(self, game : Game, timer, power, position):
        self.game = game
        self.timer = timer
        self.power = power
        self.position = position

    def whoOwnsMe(self):
        return game

    def getRemainingTime(self):
        return timer
    
    def decreaseTime(self):
        timer -= 1

    def getPower(self):
        return power

    def whereAmI(self):
        return position
