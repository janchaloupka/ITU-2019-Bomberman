import { Sprite } from "./Sprite";
import { Observable } from "./Observable";

export interface MapObject extends Observable{
  Sprite: Sprite;
  Collision: boolean;
  Destroyable: boolean; // Není asi až tak nutný, logika se řeší na serveru
  Background: boolean;
  PosX: number;
  PosY: number;
}
