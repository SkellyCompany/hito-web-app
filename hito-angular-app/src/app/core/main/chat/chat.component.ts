import { MessageDTO } from './../../../shared/models/dtos/message-dto.model';
import { Message } from '../../../shared/models/data-models/message';
import { PrivateConversation } from './../../../shared/models/data-models/private-conversation.model';
import { ChatConversationState } from './../../../shared/state-management/chat-conversation.state';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  @Select(ChatConversationState.loadedInterlocutor)
  loadedInterlocutor$: Observable<User>;
  @Select(ChatConversationState.loadedPrivateConversation)
  loadedPrivateConversation$: Observable<PrivateConversation>;

  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<User>;

  loggedInUser: User;
  interlocutor: User;
  // chatConversation: ChatConversation;
  privateConversation: PrivateConversation;

  messageForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private store: Store) {
    this.loggedInUser$.subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
    });

    this.loadedPrivateConversation$.subscribe(loadedPrivateConversation => {
      this.privateConversation = loadedPrivateConversation;
    });

    this.loadedInterlocutor$.subscribe(loadedInterlocutor => {
      this.interlocutor = loadedInterlocutor;
    });
    // this.chatConversation$.subscribe(chatConversation => {
    //   this.chatConversation = chatConversation;
    //   if(chatConversation !== undefined) {
    //     setTimeout(() => this.scrollMessagesDown(), 10);
    //   }
    // });
  }

  ngOnInit(): void {

  }

  sendMessage(text: string) {
    if (text !== undefined && text.length > 0) {
      this.messageForm.reset();
      const interlocutorId: string = this.loggedInUser.uid;
      const postTime = new Date();
      const messageDTO: MessageDTO = {
        interlocutorId: interlocutorId,
        postTime: postTime,
        text: text,
      };
      this.store.dispatch(new SendMessage(messageDTO, this.loggedInUser.uid));
    }
  }

  scrollMessagesDown() {
    const chatContainer = document.getElementById('chat-container');
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
    const minute = postTime.getMinutes();
    if (minute < 10) {
      convertedMinute = "0" + minute;
    } else {
      convertedMinute = minute;
    }

    const time = ' ' + date + ' ' + month + ' ' + year + ' ' + hour + ':' + convertedMinute;
    return time;
  }

  shouldPostQuickMessage(messageIndex: number, message: Message): boolean {
    if (messageIndex === 0) {
      return false;
    }
    return this.isPreviousUserSame(messageIndex, message.sender.uid) &&
      !this.haveTenMinutesPassed(messageIndex, message.postTime);
  }

  isPreviousUserSame(messageIndex: number, uid: string) {
    const lastSentMessage: Message = this.privateConversation.messages[messageIndex - 1];
    if (lastSentMessage !== undefined && uid === lastSentMessage.sender.uid) {
      return true;
    }
    return false;
  }

  private haveTenMinutesPassed(messageIndex: number, messagePostTime): boolean {
    const lastSentMessage: Message = this.privateConversation.messages[messageIndex - 1];
    const deltaTimeMilliseconds: number = messagePostTime - lastSentMessage.postTime.getTime();
    const deltaTimeMinutes = deltaTimeMilliseconds / 60000;
    if (deltaTimeMinutes < 10) {
      return false;
    }
    return true;
  }

}
