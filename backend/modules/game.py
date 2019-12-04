#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: game.py
# Author: Michal Krůl, Jan Chaloupka

from typing import List
from modules.id import ID
from modules.player import Player
from modules.map import Map
from modules.barrel import Barrel
from modules.bomb import Bomb

class Game:
    def __init__(self):
        self.ID = ID()
        self.timeLimit = 0
        self.noOfRounds = 0
        self.map: Map = None
        self.players: List[Player] = []
        self.barrels: List[Barrel] = []
        self.bombs: List[Bomb] = []

    def getID(self) -> ID:
        return self.ID.getID()

    def getTimeLimit(self) -> int:
        return self.timeLimit
    
    def setTimeLimit(self, timeLimit) -> None:
        self.timeLimit = timeLimit

    def getNoOfRounds(self) -> int:
        return self.noOfRounds

    def setNoOfRounds(self, no_of_rounds: int) -> None:
        self.noOfRounds = noOfRounds
    
    def getPlayers(self) -> List[Player]:
        return self.players
    
    def addPlayer(self, player: Player) -> None:
        if player in self.players:
            raise Exception("Player is already in the game")

        if len(self.players) >= 4:
            raise Exception("Maximum number of players exceeded")

        self.players.append(player)
    
    def removePlayer(self, player: Player) -> None:
        self.players.remove(player)

    def getMap(self) -> Map:
        return self.map
    
    def setMap(self, map : Map) -> None:
        # TODO generace barelů
        self.map = map
    
    def getBarrels(self) -> List[Barrel]:
        return self.barrels
    
    def getBombs(self) -> List[Bomb]:
        return self.bombs
