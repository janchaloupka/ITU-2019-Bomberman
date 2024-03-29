#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: player.py
# Author: Michal Krůl
# TODO Vyřešit powerupy

from backend.modules.character import Character, Characters
from backend.modules.position import Position

class Player(Position):
    def __init__(self, ID: int, nick: str):
        Position.__init__(self, 0, 0)

        self.ID = ID
        self.nick = nick
        self.remainingLife = 0
        self.position: Position = self
        self.character: Character = Characters["regular"]

    def getID(self) -> int:
        return self.ID

    def getNick(self) -> str:
        return self.nick

    def setNick(self, nick: str) -> None:
        self.nick = nick

    def getRemainingLife(self) -> int:
        return self.remainingLife
    
    def resetRemainingLife(self) -> None:
        self.remainingLife = self.character.getMaxLife()
    
    def getSpeed(self):
        return self.character.getSpeed()

    def getPower(self):
        return self.character.getPower()

    def getMaxLife(self):
        return self.character.getMaxLife()

    def getMaxBomb(self):
        return self.character.getMaxBomb()

    def getAppearance(self):
        return self.character.getID()

    def setCharacter(self, character: Character) -> None:
        self.character = character
        self.resetRemainingLife()
    
    def getCharacterName(self):
        return self.character.getName()

    def getPosition(self) -> Position:
        return self.position
   