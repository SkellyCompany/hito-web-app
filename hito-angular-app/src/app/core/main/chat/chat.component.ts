import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'src/app/shared/services/message.service';
import { Message } from 'src/app/shared/models/message.model';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { AuthState } from 'src/app/shared/state-management/auth.state';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<User>;
  messages: Observable<Message[]>;
  previousUsername: string;

  messageForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private store: Store, private messageService: MessageService) {
    this.messages = this.messageService.getMessages();
  }

  ngOnInit(): void {
  }

  sendMessage(message: Message) {
    this.messageForm.reset();
    this.loggedInUser$.subscribe(loggedInUser => message.username = loggedInUser.username);
    const today = new Date();
    message.postTime = today;
    this.messageService.addMessage(message);
  }

  timeConverter(timestamp): string {
    const newDate = new Date(timestamp.seconds * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = newDate.getFullYear();
    const month = months[newDate.getMonth()];
    const date = newDate.getDate();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    const time = ' ' + date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute;
    return time;
  }

  isPreviousUsernameEqual(currentUsername: string, setPrevious?: boolean) {
    if (this.previousUsername === currentUsername || this.previousUsername === '') {
      if (setPrevious) {
        this.previousUsername = currentUsername;
      }
      return true;
    }
    if (setPrevious) {
      this.previousUsername = currentUsername;
    }
    return false;
  }

}
