import { ServerEvent } from "../models/ServerEvent";
import { ServerEventType } from "../enums/ServerEventType";
import { ClientEvent } from "../models/ClientEvent";

export interface ServerEventObserver{
  NewMessage(data: ServerEvent): void;
}

class ServerCommunication{
  private Socket: WebSocket;
  private Observers: Map<ServerEventType, ServerEventObserver[]>;
  private OnOpenObservers: (() => void)[] = [];

  constructor(serverUrl: string){
    this.Observers = new Map<ServerEventType, ServerEventObserver[]>();

    this.Socket = new WebSocket(serverUrl);
    this.Socket.onopen = () => this.Open();
    this.Socket.onerror = (ev) => this.Error(ev);
    this.Socket.onclose = (ev) => this.Close(ev);
    this.Socket.onmessage = (ev) => this.Message(ev);
  }

  private Close(ev: CloseEvent){
    console.log("WebSocket connection closed");
  }

  private Error(ev: Event){
    console.error(ev);
  }

  private Open(){
    console.log("WebSocket connection opened!");
    this.OnOpenObservers.forEach(obs => obs());
  }

  private Message(ev: MessageEvent){
    let event: ServerEvent;

    try{
      event = JSON.parse(ev.data);
      console.log(event);
    }catch(e){
      console.error("Failed to parse server event", ev);
      return;
    }

    this.NotifySubscribers(event);
  }

  public OnOpen(callback: () => void){
    this.OnOpenObservers.push(callback);
  }

  public SendEvent(event: ClientEvent){
    if(this.Socket.readyState !== WebSocket.OPEN){
      console.error("Failed to send event. WebSocket is not OPEN", event);
      return;
    }

    console.log("Sent:", JSON.stringify(event));

    this.Socket.send(JSON.stringify(event));
  }

  //#region Observer

  private NotifySubscribers(data: ServerEvent){
    const array = this.Observers.get(data.Type);
    if(!array) return;

    for (const o of array) {
      o.NewMessage(data);
    }
  }

  public Subscribe(type: ServerEventType, observer: ServerEventObserver): void{
    if(!this.Observers.has(type))
      this.Observers.set(type, []);

    let observers = this.Observers.get(type);
    if(observers) observers.push(observer);
  }

  public Unsubscribe(type: ServerEventType, observer: ServerEventObserver): void{
    const array = this.Observers.get(type);
    if(!array) return;
    const index = array.indexOf(observer);
    if(index >= 0) array.splice(index, 1);
  }

  public UnsubscribeAll(observer: ServerEventObserver): void{
    this.Observers.forEach((arr) => {
      const index = arr.indexOf(observer);
      if(index >= 0) arr.splice(index, 1);
    });
  }

  //#endregion
}

export const API = new ServerCommunication("ws://127.0.0.1:9000");
