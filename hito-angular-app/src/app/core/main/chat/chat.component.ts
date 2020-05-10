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

  loggedInUser: User;
  chatConversation: ChatConversation;
  messageForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private store: Store) {
    this.loggedInUser$.subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
    });
    this.chatConversation$.subscribe(chatConversation => {
      this.chatConversation = chatConversation;
    });
  }

  ngOnInit(): void {
  }

  sendMessage(message: Message) {
    this.messageForm.reset();
    message.username = this.loggedInUser.username;
    message.postTime = new Date();
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

  shouldPostQuickMessage(messageIndex: number, message: Message): boolean {
    return this.isPreviousUsernameEqual(messageIndex, message.username);
  }

  isPreviousUsernameEqual(messageIndex: number, currentUsername: string) {
    if (messageIndex === 0) {
      return false;
    }
    const lastSentMessage: Message = this.chatConversation.messages[messageIndex - 1];
    if (lastSentMessage !== undefined && currentUsername === lastSentMessage.username) {
      return true;
    }
    return false;
  }

  private haveTenMinutesPassed(currentDate): boolean {
    return false;
  }

}
