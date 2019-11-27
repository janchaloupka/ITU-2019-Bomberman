/**
 * Typy zpráv, které posílá server klientovi.
 */
export enum ServerEventType{
  /**
   * Informace o změně jména (pokud si někdo jiný změní jméno)
   */
  NameChange = "NameChange",

  /**
   * Nová položka v seznamu dostupných lobby
   */
  LobbyListItemNew = "LobbyListItemNew",

  /**
   * Změna položky v seznamu dostupných lobby
   * (např. změna mapy nebo počtu hráčů)
   */
  LobbyListItemChange = "LobbyListItemChange",

  /**
   * Odebrána položka v seznamu lobby
   */
  LobbyListItemRemove = "LobbyListItemRemove",

  /**
   * Potvrzení připojení k lobby (s detaily o konkrétním lobby)
   */
  LobbyJoin = "LobbyJoin",

  /**
   * Nové parametry nastavení lobby.
   * Server tuto zprávu neposílá zakladateli.
   */
  LobbyUpdate = "LobbyUpdate",

  /**
   * Vykopnutí z lobby nebo zamítnutý pokus o připojení k lobby.
   * Obsahuje důvod odejití.
   */
  LobbyLeave = "LobbyLeave",

  /**
   * Informace o začátku kola.
   */
  GameStart = "GameStart",

  /**
   * Informace o konci kola
   */
  GameEnd = "GameEnd",

  // TODO Informace o vrácení zpráky do lobby po konci hry

  /**
   * Změna postavy hráče
   */
  PlayerCharacter = "PlayerCharacter",

  /**
   * Připojení nového hráče do lobby
   */
  PlayerJoin = "PlayerJoin",

  /**
   * Odejití hráče z lobby
   */
  PlayerLeave = "PlayerLeave",

  /**
   * Úmrtí hráče ve hře (ne kompletní, jen -1 health)
   */
  PlayerDie = "PlayerDie",

  /**
   * Změna pozice objektu na mapě.
   * TODO: Asi není nutný? Nevím kdy by se pohybovalo s objektama.
   */
  MapObjectMove = "MapObjectMove",

  /**
   * Přidání objektu do herního pole.
   */
  MapObjectNew = "MapObjectNew",

  /**
   * Odebrání objektu z herního pole.
   */
  MapObjectRemove = "MapObjectRemove",

  /**
   * Položení bomby.
   */
  BombPlace = "BombPlace",

  /**
   * Vytvoření powerupu.
   */
  PowerupPlace = "PowerupPlace",

  /**
   * Aktualizace zbývajícího času do konce kola.
   */
  GameTimerUpdate = "GameTimerUpdate",
}
