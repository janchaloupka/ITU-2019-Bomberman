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
        '''Pri open vytvori hrace a odesle zpatky jeho ID v databazi'''
        print("WebSocket connection open.")
        repsonse = serverHandle.createPlayer()
        self.sendMessage(json.dumps({"data":repsonse}).encode('utf-8'), isBinary = False)

    def onMessage(self, payload, isBinary):
        if(isBinary):
            print("Binary message received: {0} bytes\n Tohle nikoho nezajímá a nebudeme to překládat".format(len(payload)))
        else:
            obj = json.loads(payload.decode('utf-8'))
            response = serverHandle.processMessage(obj)
            self.sendMessage(json.dumps(response).encode('utf-8'), isBinary)
        
    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))