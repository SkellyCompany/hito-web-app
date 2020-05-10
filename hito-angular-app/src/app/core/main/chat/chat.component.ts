import { ChatConversation } from './../../../shared/models/ui-models/chat-conversation.model';
import { ChatConversationState } from './../../../shared/state-management/chat-conversation.state';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Message } from 'src/app/shared/models/data-models/message.model';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { AuthState } from 'src/app/shared/state-management/auth.state';
import { User } from 'src/app/shared/models/data-models/user.model';
import { SendMessage } from 'src/app/shared/state-management/chat-conversation.action';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<User>;

  @Select(ChatConversationState.loadedChatConversation)
  chatConversation$: Observable<ChatConversation>;

  chatConversation: ChatConversation;
  previousUsername: string;
  previousDate: any;
  messageForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private store: Store) {
    this.chatConversation$.subscribe(chatConversation => {
      this.chatConversation = chatConversation;
    });
  }

  ngOnInit(): void {
  }

  sendMessage(message: Message) {
    this.messageForm.reset();
    this.loggedInUser$.subscribe(loggedInUser => message.username = loggedInUser.username);
    const today = new Date();
    message.postTime = today;
    this.store.dispatch(new SendMessage(this.chatConversation.id, message));
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

  shouldPostQuickMessage(currentUsername: string, currentDate: Date, set: boolean): boolean {
    const isPreviousUsernameEqual = this.isPreviousUsernameEqual(currentUsername, set);
    const haveTenMinutesPassed =  this.haveTenMinutesPassed(currentDate);
    return (isPreviousUsernameEqual);
  }

  isPreviousUsernameEqual(currentUsername: string, setPrevious?: boolean) {

    if (this.previousUsername ) {
      if (setPrevious) {
        this.previousUsername = currentUsername;
      }
      return false;
    }
    if (setPrevious) {
      this.previousUsername = currentUsername;
    }
    return true;
  }

  private haveTenMinutesPassed(currentDate): boolean {
    const tenMinutes = 600;
    // tslint:disable-next-line: new-parens
    if (this.previousDate === undefined) {
      this.previousDate = currentDate;
      return false;
    }
    return true;
    // if ((this.previousDate - currentDate) >= tenMinutes) {
    //   this.previousDate = currentDate;
    //   return false;
    // }
    // this.previousDate = currentDate;
    // return true;
  }

}
