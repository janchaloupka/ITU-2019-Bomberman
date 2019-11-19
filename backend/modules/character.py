#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: character.py
# Author: Michal Krůl

class Character:
    def __init__(self, speed: int, power: int, maxLife: int, maxBomb: int, appearance):
        self.speed = speed
        self.power = power
        self.maxLife = maxLife
        self.maxBomb = maxBomb
        self.appearance = appearance

    def getSpeed(self):
        return self.speed

    def getPower(self):
        return self.power

    def getMaxLife(self):
        return self.maxLife

    def getMaxBomb(self):
        return self.maxBomb

    def getAppearance(self):
        return self.appearance
