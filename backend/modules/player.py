#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: player.py
# Author: Michal Krůl

from backend.modules.id import ID
from backend.modules.character import Character

class Player():

    def __init__(self, nick):
        self.nick = nick
        self.ID = ID() #funkce na zvolení unikátního ID
        self.life_count = 0 #
        self.position = {None}

    def whoAmI(self):
        return nick
    
    def getID(self):
        return ID.getIDNumber()

    def getLifeCount(self):
        return life_count

    def whereAmI(self):
        return position

    #Zavolá se při vybrání characteru
    def characterChosen(self, character: Character):
        self.speed = character.getSpeed()
        self.power = character.getPower()
        self.max_life_count = character.getMaxLife()
        self.max_bomb_count = character.getMaxBombCount()
        self.visage = character.getAppearance()

    #Zavolá se jako čistící funkce pro hráče
    def gameOver(self):
        life_count = 0
        position = {None}
        speed = None
        power = None
        max_life_count = None
        max_bomb_count = None
        visage = None



    