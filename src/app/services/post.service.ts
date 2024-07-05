import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as signalR from '@microsoft/signalr';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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

  getAllFriends(userId: string) {
    return this.http.get(`http://ourschool.somee.com/api/Chat/GetAllFriends/${userId}`);
  }

  getPost() {
    return this.http.get(BASE_URL);
  }
}
