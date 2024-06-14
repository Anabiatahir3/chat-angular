import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string | null = null;
  constructor() {}

  setUsername(name: string) {
    this.username = name;
  }

  getUsername() {
    return this.username;
  }

  isUsernameSet(): boolean {
    return this.username !== null;
  }
}
