#!~/anaconda3/bin/python

# ITU projekt: hra Bomberman
#
# File: serverHandle.py
# Author: Michal Krůl

from backend.modules.player import Player
from backend.modules.id import ID
from backend.modules.game import Game
from backend.modules.map import Map
from backend.modules.character import Characters
from backend.modules.map import mockMap
from backend.modules.bomb import Bomb
from backend.modules.change import Change
from threading import Timer
#from backend.server.my_server_protocol import MyServerProtocol


#Dictionary vsech hracu na serveru podle MyServerProtocol
#Connections[MyServerProtocol] = player
Connections = {}
# Dictionary vsech hracu na serveru
# Players[PlayerID] = player
Players = {}
#Dictionary vsech her
#Games[GameID] = game
Games = {}
#Dictionary her co jsou ve fazi Lobby
#Lobby[GameID] = game
Lobby = []
#List hracu co se prihlasili k subscribu lobby
Subscribed = []



def subscribeToLobyList(connection):
    """Prida hrace do seznamu subscribe, odpovi zpravou:
    {'Type': "LobbyListItemNew", 'Data' : {GameID, PlayerCount}}"""
    Subscribed.append(Connections[connection])
    data = []
    for g in Lobby:
        if len(g.getPlayers()) > 0:
            data.append({
                'ID' : g.getID(),
                'PlayerCount' : len(g.getPlayers()),
                'HostName' : g.getPlayers()[0].getNick(),
                'MapName' : g.getMap().getName()
            })
    
    message = {
        'Type': "LobbyListItemNew",
        'Data': data
    }
    return message

def createPlayer(obj):
    '''Vytvori noveho hrace a prida ho do seznamu vsech pripojenych hracu, indentifikace pomoci WebsocketServerHandle'''
    player = Player(ID().getID(), "")
    Connections[obj] = player
    Players[player.getID()] = player 

def deletePlayer(obj):
    '''Smaze hrace ze seznamu a znici objekt'''
    ID = Connections[obj].getID()
    del Connections[obj]
    if (Players[ID] in Subscribed):
        Subscribed.remove(Players[ID])
    objekt = Players[ID]
    del Players[ID]
    for g in Games.values():
        if objekt in g.getPlayers():
            g.getPlayers().remove(objekt)
            checkGame(g)
    del objekt

def createGame(obj):
    '''Vytvori novou hru ve fazi lobby'''
    game = Game()
    game.addPlayer(Connections[obj])
    Games[game.getID()] = game
    Lobby.append(game)
    notifySubscribed(Change("LobbyListItemNew", game))
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
        notifySubscribed(Change("LobbyListItemChange", game))

    return "OK"

def startGame(data):
    '''Zmeni stav z JeVLobby na HrajeSe, vygeneruje barelly a pozice'''
    game = Games[data['Game']]

    Lobby.remove(game)
    notifySubscribed(Change("LobbyListItemRemove", game))

    #Uz to dela vsechno
    obstacles, barrels = game.start()

    objects = {}

    x = 0

    for o in obstacles:
        objects[x] = {
            'Type' : 'Obstacle',
            'Collision' : True,
            'Destroyable' : False,
            'Background' : False,
            'PosX' : o.getPosition().getX(),
            'PosY' : o.getPosition().getY()
        }
        x += 1 

    for b in barrels:
        objects[x] = {
            'Type' : 'Barrel',
            'Collision' : True,
            'Destroyable' : True,
            'Background' : False,
            'PosX' : b.getPosition().getX(),
            'PosY' : b.getPosition().getY()
        }
        x += 1

    for p in game.getPlayers:
        objects[x] = {
            'Type' : 'Player',
            'Collision' : False,
            'Destroyable' : True,
            'Background' : False,
            'PosX' : p.getPosition().getX(),
            'PosY' : p.getPosition().getY()
        }
    data = {
        'MapObject' : objects
    }

    response = {
        'Type' : "GameStart",
        'Data' : data
    }
    game_timer = Timer(game.getTimeLimit(), endOfRound, [game])
    game_timer.start()
    return response

def addToLobby(player, data):
    '''Prida hrace do hry, pokud je ID hry ve zprave a pokud hra neni plna, odesila zpravu LobbyJoin s informacemi stejne jako LobbyCreate'''
    if (data['ID'] is None):
        return "No Game ID send"
    else:
        game = Games[data['ID']]
        if (len(game.players) == 4):
            return "Game full"
        else:
            game.addPlayer(Connections[player])
    
    response = {}
    response['Type'] = "LobbyJoin"
    players = []
    for p in game.getPlayers():
        players.append({
            "ID": p.getID(),
            "Nick": p.getNick()
        })
    data = {"ID": game.getID(), "NumberOfRounds" : game.getNoOfRounds(), "TimeLimit" : game.getTimeLimit(), "Players" : players}
    response['Data'] = data
    notifySubscribed(Change("LobbyListItemChange", game))
    notifyAboutPlayer(game.getID(), Connections[player].getID(), "PlayerJoin")
    return response

def setPlayerCharacter(conn, data):
    '''Pokud najde jmeno postavy ve vytvorenych postavach, prida tuto postavu k hraci'''
    player = Connections[conn]
    char = data ['Name']
    for ch in Characters.keys():
        if (ch == char):
            player.setCharacter(Characters[ch])

def changeGameMap(data):
    '''Nastavi mapu ke hre'''
    game = Games[data['Game']]
    map = data['Map']
    game.setMap(map)

def removePlayerFromGame(conn):
    '''Odstrani hrace z hry, upozorni ostatni hrace'''
    player = Connections[conn]
    for g in Games:
        if player in g.getPlayers:
            g.removePlayer(player)
            notifySubscribed(Change("LobbyListItemChange", g))
            notifyAboutPlayer(g.getID(), player.getID(), "PlayerLeave")

def processMessage(connection, obj):
    '''Process message'''

    if (obj['Type'] == "ChangeName"):
        '''Zmeni Nick hrace
        ocekava {Type : "ChangeName", Data : { Nick : nickname}'''
        data = obj['Data']
        Connections[connection].setNick(data['Nick'])

    elif (obj['Type'] == "SubscribeLobbyList"):
        return subscribeToLobyList(connection)
    
    elif (obj['Type'] == "UnsubscribeLobbyList"):
        Subscribed.remove(Connections[connection])
    
    elif (obj['Type'] == "JoinLobby"):
        '''Zavola pridani hrace o lobby, pokud je odpoved chybova hlaska odesle LobbyLeave zpravu
        ocekava {Type : "ChangeName", Data : { ID : gameID}'''
        response = addToLobby(connection, obj['Data'])
        if (type(response) == str):
            bad_response = {}
            bad_response['Type'] = "LobbyLeave"
            bad_response['Data'] = response
            return bad_response
        else:
            return response

    elif (obj['Type'] == "CreateLobby"):
        '''Zavola funkci vytvoreni hry, vytvori response typu s daty ID, timeLimit a Players
        ocekava {Type : "CreateLobby"}
        Vraci: {"Type": "LobbyJoin", "Data": {"NumberOfRounds": noOfRounds, "TimeLimit": timeLimit, "Players": {"1": PlayerID}}}'''
        game = createGame(connection)
        response = {}
        response['Type'] = "LobbyJoin"
        players = []
        for p in game.getPlayers():
            players.append({
                "ID": p.getID(),
                "Nick": p.getNick()
            })
        data = {"ID": game.getID(), "NumberOfRounds" : 0, "TimeLimit" : 0, "Players" : players}
        response['Data'] = data
        return response

    elif (obj['Type'] == "UpdateLobbySettings"):
        '''Zavola update hry, pokud probehne v poradku nic nevraci, jinak vraci {Type: "Lobby update", Data : "Error string"}
        ocekava {Type : "UpdateLobbySettings", Data : { ID : gameId, ['TimeLimit' : timelimit, 'NumberOfRounds' : noofrounds]}'''
        ret = updateGame(obj['Data'])
        if (ret != "OK"):
            response = {}
            response['Type'] = "LobbyUpdate"
            response['Data'] = ret
            return response

    elif (obj['Type'] == "ChangeCharacter"):
        '''Zavola pridani postavy k hraci, vraci PlayerCharacter odpoved
        ocekava {Type : "ChangeCharacter", Data : {Character : Name}}'''
        setPlayerCharacter(connection, obj['Data'])
        response = {}
        response['Type'] = "PlayerCharacter"
        return response

    elif (obj['Type'] == "ChangeMap"):
        '''Zavola zmenu mapy
        ocekava: {Type : "ChangeMap", Data : {Game : GameId, Map : MapName}}'''
        changeGameMap(obj['Data'])

    elif (obj['Type'] == "LeaveLobby"):
        '''Zavola odstraneni hrace z hry a opet se prihlasi k odebirani lobby listu
        ocekava ocekava: {Type : "LeaveLobby"}'''
        removePlayerFromGame(connection)
        subscribeToLobyList()
    
    elif (obj['Type'] == "StartGame"):
        '''Spusti spousteni hry
        ocekava : {Type : "StartGame", Data : { Game : gameID}'''
        return startGame(obj['data'])

    elif (obj['Type'] == "Move"):
        '''Zavola pohyb
        ocekava {Type : "Move", Data : { Direction : "U/D/L/R"} (Up/Down/Left/Right)'''
        ret = move(connection, obj['Data'])
        response = {
            'Type' : "MapObjectMove",
            'Data' : {
                'Status' : ret,
                'Object' : "Player"
            }
        }
        return response

    elif (obj['Type'] == "PlaceBomb"):
        '''ZAhaji pokladani bomby
        ocekava: {Type : "PlaceBomb"} '''
        return placeBomb(connection)
    
    else:
        return {'Type' : "BadFuckingRequest"}


def notifyGameMembers(gameID):
    for conn in Connections.keys():
        if ((Connections[conn] in Games[gameID].players) and Connections[conn] != Games[gameID].players[0]):
            message = {}
            message['Type'] = "LobbyUpdate"
            players = {}
            x = 1
            for p in Games[gameID].getPlayers():
                i = p.getID()
                players[x] = i
                x += 1
            data = {"NumberOfRounds" : Games[gameID].getNoOfRounds(), "TimeLimit" : Games[gameID].getTimeLimit, "Players" : players}
            message['Data'] = data
            conn.notify(message)

def notifyAboutPlayer(gameId, playerID, event_type):
    """Upozorni ostatni cleny hry o hraci (join/leave)"""
    for conn in Connections.keys():
        if (Connections[conn] in Games[gameId].players and Connections[conn] != Players[playerID]):
            message = {}
            message['Type'] = event_type
            data = {"Player" : playerID}
            message['Data'] = data
            conn.notify(message)

def notifySubscribed(change):
    '''Upozorni hrace odebirajici LobbyList o zmene
    zprava: {'Type' : event_type(New/Change/Remove), 'Data' : {GameID, PLayerCount(u Remove ne)} }'''
    event_type = change.getType()
    game = change.getGame()
    for conn in Connections.keys():
        if Connections[conn] in Subscribed:
            if (event_type == "LobbyListItemRemove"):
                data = {
                    'ID' : game.getID()
                }
            else:
                data = {
                    'ID' : game.getID(),
                    'PlayerCount' : len(game.getPlayers()),
                    'HostName' : game.getPlayers()[0].getNick(),
                    'MapName' : game.getMap().getName()
                }
            message = {
                'Type' : event_type,
                'Data' : data
            }
            conn.notify(message)
            

def move(conn, data):
    '''
    Updatuje position hrace
    Predpoklada se nasledujici sit
    ..|x0|x1|x2
    y0|__|__|__
    y1|__|__|__
    y3|__|__|__
    '''

    player = Connections[conn]
    direction = data['Direction']
    if (direction == "U"):
        player.position.setY(player.position.getY - 1) 
    elif (direction == "D"):
        player.position.setY(player.position.getY + 1)
    elif (direction == "L"):
        player.position.setX(player.position.getX - 1)
    elif (direction == "R"):
        player.position.setX(player.position.getX + 1)
    else:
        return "Invalid"
    return "OK"

def placeBomb(conn):
    """Polozeni bomby, nahozeni logky casovani"""
    player = Connections(conn)
    #TODO:musime vyresit nejakej base
    bomb = Bomb(player, 3, 4 + player.getPower(), player.getPosition().getX(), player.getPosition().getX())
    for g in Games():
        if not g.getIsLobby():
            g.getBombs().append(bomb)
            bomb_timer = Timer(3.0, detonate, [bomb, g])
            bomb_timer.start()

    return {'Type' : "BombPlace"}

def detonate(bomb, game):
    game.getBombs().remove()
    #VYBUCH
    del bomb

def checkGame(game):
    """Zkontroluje pocet hracu ve hre, pokud je 0 tak smaze a posle zpravu o smazani, jinak posila zpravu o Change"""
    if len(game.getPlayers) == 0:
        del Games[game]
        if game in Lobby:
            Lobby.remove(game)
        notifySubscribed(Change("LobbyListItemRemove", game))
    else:
        notifySubscribed(Change("LobbyListItemChange", game))

def endOfRound(game):
    response = {
        'Type' : 'GameEnd',
        'Data' : {
            'Round' : game.getCurrentRound()
        }
    }
    for p in game.getPlayers():
        for conn in Connections.keys:
            if p == Connections[conn]:
                conn.notify(response)
    if not game.getCurrentRound == game.getNoOfRounds:
        game_timer = Timer(game.getTimeLimit(), endOfRound, [game])
        game_timer.start()