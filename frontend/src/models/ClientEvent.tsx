import { ClientEventType } from "../enums/ClientEventType";
import { Observable } from "./Observable";

export interface ClientEvent{
  Type: ClientEventType;
  Data?: Observable; // TODO jinak
}
