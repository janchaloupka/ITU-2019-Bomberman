import { Sprite } from "./Sprite";
import { Observable } from "./Observable";

export interface MapObject extends Observable{
  Sprite: Sprite;
  Collision: boolean;
  Destroyable: boolean;
  Background: boolean;
  PosX: number;
  PosY: number;
}
