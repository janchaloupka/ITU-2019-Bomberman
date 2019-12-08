#!usr/bin/python3

# ITU projekt: hra Bomberman
#
# File: id.py
# Author: Michal Krůl

import random
from typing import List


class ID:
    # Seznam všech aktivních ID
    pool: List[int] = []

    def __init__(self):
        self.number = self.getNumber()

    # Uvolnění ID při zničení objektu klíčovým slovem del
    def __del__(self):
        self.pool.remove(self.getID())

    def getNumber(self) -> int: 
        randId = 0
        
        while randId in self.pool or randId < 1:
            randId = random.randint(1, 9999)

        self.pool.append(randId)
        
        return randId

    def getID(self) -> int:
        return self.number

