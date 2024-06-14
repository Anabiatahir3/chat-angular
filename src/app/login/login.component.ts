import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';

  constructor(
    private chatService: ChatService,
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    //this.chatService.initializeSocket(this.username);
    this.authService.setUsername(this.username);
    this.router.navigate(['/chat']);
  }
}
