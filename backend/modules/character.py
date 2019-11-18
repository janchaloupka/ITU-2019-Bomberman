#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: character.py
# Author: Michal Krůl

class Character:

    def __init__(self, speed, power, max_life, max_bomb_count, appearance, ID):
        self.ID = ID
        self.speed = speed
        self.power = power
        self.max_life = max_life
        self.max_bomb_count = max_bomb_count
        self.appearance = appearance

    def getID(self):
        return ID

    def getSpeed(self):
        return speed

    def getPower(self):
        return power

    def getMaxLife(self):
        return max_life

    def getMaxBombCount(self):
        return max_bomb_count

    def getAppearance(self):
        return appearance