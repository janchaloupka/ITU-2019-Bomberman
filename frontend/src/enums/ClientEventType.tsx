/**
 * Typy zpráv, které posílá klient na server
 */
export enum ClientEventType{
  /** Změnit jméno na nové */
  ChangeName = "ChangeName",

  /**
   * Začít odebírat změny seznamu otevřených lobby.
   * Server by měl odpovědět celým seznamem lobby.
   *
   * Pokud se změní stav seznamu, server od této chvíle bude automaticky
   * posílat změny, dokud se klient neodhlásí (Unsubscribe)
   */
  SubscribeLobbyList = "SubscribeLobbyList",

  /** Zrušit odběr změn seznamu lobby */
  UnsubscribeLobbyList = "UnsubscribeLobbyList",

  /**
   * Žádost o připojení do konkrétní lobby. Odpověď ze serveru může být negativní.
   * Server poté odpoví zprávou LobbyJoin s detaily o lobby.
   * Pokud server zamítne žádost, pošle zprávu LeaveLobby.
   */
  JoinLobby = "JoinLobby",

  /** Vytvořit novou lobby. Server odpoví zprávou LobbyJoin stejně jako u JoinLobby. */
  CreateLobby = "CreateLobby",

  /** Změna parametrů lobby (počet kol, časový limit) */
  UpdateLobbySettings = "UpdateLobbySettings",

  /** Změna postavy (na konkrétní postavu) */
  ChangeCharacter = "ChangeCharacter",

  /** Změna mapy (na konkrétní mapu) */
  ChangeMap = "ChangeMap",

  /** Odejít z lobby, není třeba čekat na odpověď ze serveru. */
  LeaveLobby = "LeaveLobby",

  /** Spustit hru (tlačítko v lobby) */
  StartGame = "StartGame",

  /**
   * Pohyb vlastní postavou v herním poli.
   * Odesílá se pouze směr kterým se má postava pohnout.
   */
  Move = "Move",

  /**
   * Položit bombu
   */
  PlaceBomb = "PlaceBomb"
}
