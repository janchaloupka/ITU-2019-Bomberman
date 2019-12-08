#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: character.py
# Author: Michal Krůl

class Character:
    def __init__(self, name: str, speed: int, power: int, maxLife: int, maxBomb: int, id: str):
        self.name = name
        self.speed = speed
        self.power = power
        self.maxLife = maxLife
        self.maxBomb = maxBomb
        self.id = id

    def getName(self):
        return self.name

    def getSpeed(self):
        return self.speed

    def getPower(self):
        return self.power

    def getMaxLife(self):
        return self.maxLife

    def getMaxBomb(self):
        return self.maxBomb

    def getID(self):
        return self.id

#Default:
Characters = {
"scout" : Character("Skaut", 1, 0, 0, -1, "scout"),
"destroyer" : Character("Ničitel", 0, 1, -1, 0, "destroyer"),
"regular" : Character("Normální", 0, 0, 0, 0, "regular"),
"bomber" : Character ("Ituga", -1, 0, 0, 1, "bomber")
}
