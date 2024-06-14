import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  messages: Array<{ name: string; message: string }> = [];

  message: string = '';
  serverMessage = '';
  username: string | null = null;
  userMessages: string[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.getUsername()) {
      this.router.navigate(['/login']);
    }
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    const username = this.authService.getUsername();
    if (username) {
      this.chatService.initializeSocket(username);
      this.getWelcomeMessage();
      this.getMessages();
      this.getUserGone();
      this.getUserJoin();
    } else {
      console.error('Username is not set in AuthService');
    }
  }
  getUserGone() {
    this.chatService.getUserLeft().subscribe((data) => {
      console.log('user left', data);
      this.userMessages.push(data);
    });
  }

  getUserJoin() {
    this.chatService.getUserJoinedMessages().subscribe((data) => {
      this.userMessages.push(data);
    });
  }
  getWelcomeMessage() {
    this.chatService.getWelcomeMessage().subscribe((data) => {
      console.log(data.message);
      this.serverMessage = data.message;
    });
  }

  getMessages() {
    this.chatService.getMessages().subscribe((data) => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(this.message, this.username);
      this.message = '';
    }
  }
}
