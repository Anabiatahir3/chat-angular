import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket | undefined;

  constructor(private authService: AuthService) {
    this.authService.isUsernameSet() &&
      this.initializeSocket(this.authService.getUsername()!);
  }

  initializeSocket(name: string) {
    this.socket = io('http://localhost:3000');
    this.socket.emit('setName', name);
  }

  sendMessage(message: string, user: string | null) {
    if (this.socket) {
      this.socket.emit('chat message', message, user);
    }
  }

  getWelcomeMessage(): Observable<{ message: string }> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on('welcome', (data) => {
          observer.next(data);
        });
      } else {
        observer.error('Socket is not initialized');
      }
    });
  }

  getMessages(): Observable<{ name: string; message: string }> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on('chat message', (data) => {
          observer.next(data);
        });
      } else {
        observer.error('Socket is not initialized');
      }
    });
  }
  getUserJoinedMessages(): Observable<string> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on('user_join', (data) => {
          observer.next(data);
        });
      } else {
        observer.error('Socket is not initialized');
      }
    });
  }

  getUserLeft(): Observable<string> {
    return new Observable((observer) => {
      if (this.socket) {
        this.socket.on('user_gone', (data) => {
          observer.next(data);
        });
      } else {
        observer.error('Socket is not initialized');
      }
    });
  }
}
