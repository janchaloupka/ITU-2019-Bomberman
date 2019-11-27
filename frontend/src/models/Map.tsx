import { MapObject } from "./MapObject";
import { Observable } from "./Observable";

export interface Map extends Observable{
  Name: string;
  Objects: MapObject[];
  // TODO Pozadí?
}
