import { ChatConversation } from './../../../shared/models/ui-models/chat-conversation.model';
import { ChatConversationState } from './../../../shared/state-management/chat-conversation.state';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Message } from 'src/app/shared/models/data-models/message.model';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { AuthState } from 'src/app/shared/state-management/auth.state';
import { User } from 'src/app/shared/models/data-models/user.model';

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

  conversationName: string;
  messages: Message[];
  previousUsername: string;
  messageForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private store: Store) {
    this.chatConversation$.subscribe(chatConversation => {
      if (chatConversation !== undefined) {
        this.conversationName = chatConversation.name;
        this.messages = chatConversation.messages;
      }
    });
  }

  ngOnInit(): void {
  }

  sendMessage(message: Message) {
    this.messageForm.reset();
    this.loggedInUser$.subscribe(loggedInUser => message.username = loggedInUser.username);
    const today = new Date();
    message.postTime = today;
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

  shouldPostQuickMessage(currentUsername: string, currentDate: Date): boolean {
    // const isPreviousUsernameEqual = this.isPreviousUsernameEqual(currentUsername);
    // this.previousUsername = currentUsername;
    // const haveTenMinutesPassed =  this.haveTenMinutesPassed(currentDate);
    // console.log(isPreviousUsernameEqual);
    // return (isPreviousUsernameEqual && !haveTenMinutesPassed);
    return false;
  }

  private isPreviousUsernameEqual(currentUsername: string) {
    if (this.previousUsername === currentUsername || this.previousUsername === undefined) {
      return true;
    }
    return false;
  }

  private haveTenMinutesPassed(currentDate: Date): boolean {
    //TO DO
    return false;
  }

}
