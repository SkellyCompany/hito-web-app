import { ChatConversation } from './../../../shared/models/ui-models/chat-conversation.model';
import { ChatConversationState } from './../../../shared/state-management/chat-conversation.state';
import { Component, OnInit } from '@angular/core';
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
      if(chatConversation !== undefined) {
        setTimeout(() => this.scrollMessagesDown(), 10);
      }
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

  scrollMessagesDown() {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer !== null) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  convertMessagePostTime(messagePostTime: Date): string {
    const postTime = messagePostTime;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = postTime.getFullYear();
    const month = months[postTime.getMonth()];
    const date = postTime.getDate();
    const hour = postTime.getHours();

    let convertedMinute;
    let minute = postTime.getMinutes();
    if(minute < 10) {
      convertedMinute = "0" + minute;
    } else {
      convertedMinute = minute;
    }

    const time = ' ' + date + ' ' + month + ' ' + year + ' ' + hour + ':' + convertedMinute;
    return time;
  }

  shouldPostQuickMessage(messageIndex: number, message: Message): boolean {
    if(messageIndex === 0) {
      return false;
    }
    return this.isPreviousUsernameEqual(messageIndex, message.username) &&
      !this.haveTenMinutesPassed(messageIndex, message.postTime);
  }

  isPreviousUsernameEqual(messageIndex: number, currentUsername: string) {
    const lastSentMessage: Message = this.chatConversation.messages[messageIndex - 1];
    if (lastSentMessage !== undefined && currentUsername === lastSentMessage.username) {
      return true;
    }
    return false;
  }

  private haveTenMinutesPassed(messageIndex: number, messagePostTime): boolean {
    const lastSentMessage: Message = this.chatConversation.messages[messageIndex - 1];
    const deltaTimeMilliseconds: number = messagePostTime - lastSentMessage.postTime.getTime();
    const deltaTimeMinutes = deltaTimeMilliseconds / 60000;
    if (deltaTimeMinutes < 10) {
      return false;
    }
    return true;
  }

}
