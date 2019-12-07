#!~/anaconda3/bin/python

# ITU projekt: hra Bomberman
#
# File: server.py
# Author: Michal Krůl, Jan Chaloupka
#
#   Dependencies: autobahn (pip install autobahn)

#   V souboru client.html je predstava komunikace pomoci WebSocket

from backend.server.my_server_protocol import MyServerProtocol

if __name__ == '__main__':

    import sys

    from twisted.python import log
    from twisted.internet import reactor
    from autobahn.twisted.websocket import WebSocketServerFactory

    log.startLogging(sys.stdout)
    
    factory = WebSocketServerFactory(u"ws://0.0.0.0:9000")
    factory.protocol = MyServerProtocol

    reactor.listenTCP(9000, factory)
    reactor.run()

