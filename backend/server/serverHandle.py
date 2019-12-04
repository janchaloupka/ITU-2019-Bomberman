#!~/anaconda3/bin/python

# ITU projekt: hra Bomberman
#
# File: serverHandle.py
# Author: Michal Krůl

from backend.modules.player import Player
from backend.modules.id import ID


# Dictionary vsech hracu na serveru
# Players[PlayerID] = player
Players = {}

def createPlayer():
    '''Vytvori noveho hrace a prida'''
    player = Player(ID(), "")
    Players[player.getID] = player 
    return player.ID.getID()

def processMessage(obj):
    '''Process message'''
    if (obj.Type == "ChangeName"):
        Players[obj.data.ID].setNick(obj.data.Name)
    elif (obj.Type == "SubscribeLobbyList"):
        pass
    elif (obj.Type == "UnsubscribeLobbyList"):
        pass
    elif (obj.Type == "JoinLobby"):
        pass
    elif (obj.Type == "CreateLobby"):
        pass
    elif (obj.Type == "UpdateLobbySettings"):
        pass
    elif (obj.Type == "ChangeCharacter"):
        pass
    elif (obj.Type == "ChangeMap"):
        pass
    elif (obj.Type == "LeaveLobby"):
        pass
    elif (obj.Type == "StartGame"):
        pass
    elif (obj.Type == "Move"):
        pass
    elif (obj.Type == "PlaceBomb"):
        pass
    else:
        return "BadFuckingRequest"
