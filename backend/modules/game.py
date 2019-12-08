#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: game.py
# Author: Michal Krůl, Jan Chaloupka

import random
from typing import List
from backend.modules.id import ID
from backend.modules.player import Player
from backend.modules.map import Map, mockMap
from backend.modules.barrel import Barrel
from backend.modules.bomb import Bomb

class Game:
    def __init__(self):
        self.ID = ID()
        self.isLobby = True
        self.timeLimit = 60
        self.noOfRounds = 1
        self.currentRound = 0
        self.map: Map = Map("Map1")
        self.players: List[Player] = []
        self.barrels: List[Barrel] = []
        self.bombs: List[Bomb] = []

    def getID(self) -> int:
        return self.ID.getID()

    def getTimeLimit(self) -> int:
        return self.timeLimit
    
    def setTimeLimit(self, timeLimit) -> None:
        self.timeLimit = timeLimit

    def getNoOfRounds(self) -> int:
        return self.noOfRounds

    def setNoOfRounds(self, noOfRounds: int) -> None:
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
    
    def setMap(self, mapa : Map) -> None:
        self.map = mapa
    
    def getBarrels(self) -> List[Barrel]:
        return self.barrels
    
    def getBombs(self) -> List[Bomb]:
        return self.bombs

    def getIsLobby(self) -> bool:
        return self.isLobby

    def getCurrentRound(self):
        return self.currentRound

    def start(self):
        '''
        Predpoklada se nasledujici sit
        ..|x0|x1|x2
        y0|__|__|__
        y1|__|__|__
        y2|__|__|__
        '''
        self.isLobby = False
        self.currentRound = 1
        self.map.generateObstacles()
        obstacles = self.map.getObstacles()
        generateBarrels()
        generatePlayerPositions()
        return obstacles, self.barrels

    def generateBarrels(self):
        if (self.map.getName == "Map1"):
            #Zatim nenahodna generace barellu
            #Rady
            for y in range(2, self.map.height - 2, 2):
                for x in range(0, self.map.width):
                    self.barrels.append(Barrel(x, y))
            
            #Sloupce (pozor na duplicitu!)
            for x in range (2, self.map.width, 2):
                for y in range (1, self.map.height, 2):
                    self.barrels.append(Barrel(x, y))

            #Kraje
            for x in range(2, self.map.width - 2):
                self.barrels.append(Barrel(x, 0))
                self.barrels.append(Barrel(x, self.map.height - 1))

            for y in range(3, self.map.height - 3, 2):
                self.barrels.append(Barrel(0, y))
                self.barrels.append(Barrel(self.map.width - 1, y))


    def generatePlayerPositions(self):
        x = 1
        for p in Player:
            if x == 1:
                p.getPosition().setX(0)
                p.getPosition().setY(0)
                x += 1
            if x == 2:
                p.getPosition().setX(self.map.width - 1)
                p.getPosition().setY(0)
                x += 1
            if x == 3:
                p.getPosition().setX(0)
                p.getPosition().setY(self.map.height - 1)
                x += 1
            if x == 4:
                p.getPosition().setX(self.map.width - 1)
                p.getPosition().setY(self.map.height - 1)
                x += 1
