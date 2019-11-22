#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: handlePlayer.py
# Author: Michal Krůl, Jan Chaloupka

from backend.modules.player import Player
from backend.modules.id import ID
from backend.modules.character import Character

def createPlayer (self,nick: str) -> Player :
    """ Creates a new player in game"""
    player = Player(ID, nick)
    return player

def playerChoseCharacter (self, player: Player, character: Character):
    """Links player to a certain character"""
    player.setCharacter(character)

def unlinkPlayerAndCharacter (self, player: Player):
    """Resets the player stats and unlinks the character"""
    player.character = None
    player.remainingLife = 0
    
