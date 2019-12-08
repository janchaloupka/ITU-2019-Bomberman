import { ServerEventType } from "../enums/ServerEventType";

export interface ServerEvent{
  Type: ServerEventType;
  Data: any;
}
