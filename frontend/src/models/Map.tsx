import { MapObject } from "./MapObject";

export interface Map{
  ID: string;
  Name: string;
  Objects: MapObject[];
}

export const Maps: string[] = [
  "Overworld",
  "IceMap",
  "FootballPitch"
]
