export interface Character{
  ID: string;
  Name: string;
  Speed: number;
  Power: number;
  MaxLives: number;
  MaxBombs: number;
}

export const Characters: string[] = [
  "regular",
  "bomber",
  "scout",
  "destroyer"
]
