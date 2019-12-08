
export interface MapObject{
  Type: string;
  Collision: boolean;
  Destroyable: boolean; // Není asi až tak nutný, logika se řeší na serveru
  Background: boolean;
  PosX: number;
  PosY: number;
}
