import { ClientEventType } from "../enums/ClientEventType";

export interface ClientEvent{
  Type: ClientEventType;
  Data?: any;
}
