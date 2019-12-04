#!~/anaconda3/bin/python

# ITU projekt: hra Bomberman
#
# File: serverHandle.py
# Author: Michal Krůl

from backend.modules.player import Player
from backend.modules.id import ID
from backend.modules.game import Game
from backend.modules.map import Map
#from backend.server.my_server_protocol import MyServerProtocol


# Dictionary vsech hracu na serveru
# Players[PlayerID] = player
Connections = {}
Players = {}
Games = {}
Lobby = []

def createPlayer(obj):
    '''Vytvori noveho hrace a prida ho do seznamu vsech pripojenych hracu, indentifikace pomoci WebsocketServerHandle'''
    player = Player(ID().getID(), "")
    Connections[obj] = player
    Players[player.getID] = player 

def deletePlayer(obj):
    '''Smaze hrace ze seznamu a znici objekt'''
    ID = Connections[obj].getID()
    del Connections[obj]
    obj = Players[ID]
    del Players[ID]
    del obj

def createGame(obj):
    '''Vytvori novou hru ve fazi lobby'''
    game = Game()
    game.addPlayer(Connections[obj])
    Games[game.getId()] = game
    Lobby.append(game) 
    return game

def updateGame(data):
    '''Pokud je ve zprave obsazeno ID hry, updatuje dostupne parametry hry, notifikuje hrace (notifyGameMembers())'''
    if data['ID'] is None:
        return "BadRequest(Include Game ID)"
    else:
        print(Games)
        game = Games[data['ID']]
        if data['TimeLimit'] is not None:
            game.setTimeLimit(data['TimeLimit'])
        if data['NumberOfRounds'] is not None:
            game.setTimeLimit(data['NumberOfRounds'])
            notifyGameMembers(game.getID()) 

    return "OK"

def processMessage(connection, obj):
    '''Process message'''
    print(obj['Type'])
    if (obj['Type'] == "ChangeName"):
        Connections[connection].setNick(obj.Data.Name)
    elif (obj['Type'] == "SubscribeLobbyList"):
        pass
    elif (obj['Type'] == "UnsubscribeLobbyList"):
        pass
    elif (obj['Type'] == "JoinLobby"):
        pass
    elif (obj['Type'] == "CreateLobby"):
        '''Zavola funkci vytvoreni hry, vytvori response typu s daty ID, timeLimit a Players
        Vraci: {"Type": "LobbyJoin", "Data": {"NumberOfRounds": noOfRounds, "TimeLimit": timeLimit, "Players": {"1": PlayerID}}}'''
        game = createGame(connection)
        response = {}
        response['Type'] = "LobbyJoin"
        players = {}
        x = 1
        for p in game.getPlayers():
            i = p.getID()
            players[x] = i
            x += 1
        data = {"NumberOfRounds" : 0, "TimeLimit" : 0, "Players" : players}
        response['Data'] = data    
        print(response)    
        return response

    elif (obj['Type'] == "UpdateLobbySettings"):
        '''Zavola update hry, pokud probehne v poradku nic nevraci, jinak vraci {Type: "Lobby update", Data : "Error string"}'''
        ret = updateGame(obj['Data'])
        if (ret != "OK"):
            response = {}
            response['Type'] = "LobbyUpdate"
            response['Data'] = ret
            return response

    elif (obj['Type'] == "ChangeCharacter"):
        pass
    elif (obj['Type'] == "ChangeMap"):
        pass
    elif (obj['Type'] == "LeaveLobby"):
        pass
    elif (obj['Type'] == "StartGame"):
        pass
    elif (obj['Type'] == "Move"):
        pass
    elif (obj['Type'] == "PlaceBomb"):
        pass
    else:
        return {'Type' : "BadFuckingRequest"}


def notifyGameMembers(gameID):
    for conn in Connections.keys():
        if (Connections[conn] in Games[gameID].players):
            #TODO posle to i vlastnikovi, nutno pridat vlastnika do game
            message = {}
            message['Type'] = "LobbyUpdate"
            #notify neozkouseno!!!!
            conn.notify(message)