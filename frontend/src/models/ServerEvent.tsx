import { ServerEventType } from "../enums/ServerEventType";
import { Observable } from "./Observable";

export interface ServerEvent{
  Type: ServerEventType;
  Data: Observable; // TODO jinak
}
