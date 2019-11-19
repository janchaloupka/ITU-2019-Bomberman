#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: bomb.py
# Author: Michal Krůl

from modules.player import Player
from modules.position import Position

class Bomb(Position):
    def __init__(self, placedBy: Player, timer: int, power: int, x: int = 0, y: int = 0):
        Position.__init__(self, x, y)
        self.placedBy = placedBy
        self.timer = timer
        self.power = power

    def decreaseTime(self) -> None:
        self.timer -= 1

    def getPlacedBy(self) -> Player:
        return self.player

    def getRemainingTime(self) -> int:
        return self.timer

    def getPower(self) -> int:
        return self.power
