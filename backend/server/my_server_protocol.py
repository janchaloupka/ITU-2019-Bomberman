#!~/anaconda3/bin/python

# ITU projekt: hra Bomberman
#
# File: my_server_protocol.py
# Author: Michal Krůl

from autobahn.twisted.websocket import WebSocketServerProtocol
import json
import backend.server.serverHandle as serverHandle

class MyServerProtocol(WebSocketServerProtocol):

    def onConnect(self, request):  
        print("Client connecting: {0}".format(request.peer))
        

    def onOpen(self):
        '''Pri open vytvori hrace'''
        print("WebSocket connection open.")
        serverHandle.createPlayer(self)

    def onMessage(self, payload, isBinary):
        if(isBinary):
            print("Binary message received: {0} bytes\n Tohle nikoho nezajímá a nebudeme to překládat".format(len(payload)))
        else:
            obj = json.loads(payload.decode('utf-8'))
            response = serverHandle.processMessage(self, obj)
            if (response != None):
                self.sendMessage(json.dumps(response).encode('utf-8'), isBinary)
        
    def onClose(self, wasClean, code, reason):
        serverHandle.deletePlayer(self)
        print("WebSocket connection closed: {0}".format(reason))

    def notify(self, payload):
        self.sendMessage(json.dumps(payload).encode('utf-8'), isBinary=False)