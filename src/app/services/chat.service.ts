import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as signalR from '@microsoft/signalr';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  public connection : signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://ourschool.somee.com/chatHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  private http = inject(HttpClient);

  constructor() {
    this.start();
  }

  public async start() {
    try {
      await this.connection.start();
      console.log("My Connection has been established!");
    } catch (error) {
      console.log(error);
    }
  }

  getAllFriends(userId: string): Observable<any> {
    return this.http.get(`http://ourschool.somee.com/api/Chat/GetAllFriends/${userId}`);
  }

  searchForUser(userId: string, name: string): Observable<any> {
    return this.http.get(`http://ourschool.somee.com/api/Chat/SearchForUser/${userId}/${name}`);
  }

  getMessages(userId1: string, userId2: string): Observable<any>  {
    return this.http.get(`http://ourschool.somee.com/api/Chat/GetChatBetweenTowUser/${userId1}/${userId2}`);
  }

  sendMessage(senderId: string, receiverId: string, contentMessage: string){
    return this.http.post(`http://ourschool.somee.com/api/Chat/SendMessage/${senderId}/${receiverId}/${contentMessage}`, {});
  }
}
