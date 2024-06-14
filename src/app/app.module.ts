import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ChatService } from './chat.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [AppComponent, ChatComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [ChatService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
