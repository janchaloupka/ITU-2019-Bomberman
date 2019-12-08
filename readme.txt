ITU projekt 2019
Bomberman
================
Jan Chaloupka <xchalo16>
Tomáš Plachý <xplach08>
Michal Krůl <xkrulm00>


Serverová část: /backend
Klientská část: /frontend

===============
SERVEROVÁ ČÁST
===============
Server běží v jazyce Python

Předpokládaná verze je Python 3.7.1
Pro správné spuštění musí být nastavena environmentální proměná PYTHONPATH na directory projektu

Python vestavěné knihovny použité v Server:
    Timer       https://docs.python.org/2.4/lib/timer-objects.html
    json        https://docs.python.org/3/library/json.html
    autobahn    https://autobahn.readthedocs.io/en/latest/
    sys         https://docs.python.org/3/library/sys.html
    twisted     https://twistedmatrix.com/trac/wiki/Documentation

Jejich instalaci, pokud nejsou dostupné, je možné provést přes nástroj pip (pip install [název_knihovny])

===============
KLIENTSKÁ ČÁST
===============
Klient je webová aplikace psaná v jazyku TypeScript a frameworku React

Pro sestavení a spuštění je třeba mít nainstalované NPM a NodeJS v poslední verzi
NodeJS: https://nodejs.org/en/

Pro nainstalování závislostí v adresáři frontend/ spusťte příkaz: npm install
Pro spuštění vývojového serveru Reactu je příkaz: npm start
