#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: id.py
# Author: Michal Krůl

import random

class ID:

    def __init__(self):
        self.number = getNumber()

    def getNumber(self):
        return random() #asi nee, je potřeba vyřešit přidělování ID

    def getIDNumber(self):
        return number