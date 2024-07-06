import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

//2436ae4b-ea40-47a6-819d-ca3119d115ac - Teacher
//eeb9f898-e75e-4e28-bdbe-4c77bce549c1 - Student
//11476ea3-92df-4864-8117-5ffd12690b63 - Teacher
export class ChatComponent implements OnInit {

  private postService = inject(ChatService);
  userId = '2436ae4b-ea40-47a6-819d-ca3119d115ac';
  contacts: any = [];
  messages: any = [];
  private searchTerms = new Subject<string>();
  name: string | null = null;
  searchContacts: any = [];
  selectedContact: any = null;
  selectedContactId: string | null = null;
  receiverId: string | null = null;
  contentMessage: string | null = null;


  ngOnInit(): void {
    this.loadContacts();

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.postService.searchForUser(this.userId, term))
    ).subscribe({
      next: (searchContacts: any) => this.searchContacts = searchContacts,
      error: (error: any) => console.log('Error Message: ', error)
    });
  }

  loadContacts() {
    this.postService.getAllFriends(this.userId).subscribe({
      next: (contacts: any) => {
        this.contacts = contacts;
        this.searchContacts = contacts;
      },
      error: (error) => console.log('Error Message: ', error)
    });
  }

  searchContact(): void {
    if (this.name) {
      this.postService.searchForUser(this.userId, this.name).subscribe({
        next: (searchContacts: any) => {
          this.searchContacts = searchContacts;
        },
        error: (error) => console.log('Error Message: ', error)
      });
    } else {
      this.searchContacts = this.contacts;
    }
  }

  trackById(index: number, contact: any): string {
    return contact.id;
  }

  selectContact(contact: any): void {
    this.selectedContact = contact;
    this.selectedContactId = contact.userId;
    this.receiverId = contact.userId;
    this.loadMessages();
  }

  loadMessages() {
    if (this.receiverId) {
      this.postService.getMessages(this.userId, this.receiverId).subscribe({
        next: (messages: any) => {
          this.messages = messages;
        },
        error: (error: any) => console.log('Error Message: ', error)
      });
    }
  }


  sendMessage() {
    if (this.contentMessage && this.receiverId) {
      this.postService.sendMessage(this.userId, this.receiverId, this.contentMessage).subscribe({
        next: (response: any) => {
          this.messages.push({
            content: this.contentMessage,
            senderId: this.userId,
            receiverId: this.receiverId,
            messageDate: new Date().toISOString()
          });
          console.log(this.userId, this.receiverId, this.contentMessage);
          this.contentMessage = '';
          this.loadMessages();
        },
        error: (error: any) => console.log('Error Message: ', error)
      });
    }
  }
}
