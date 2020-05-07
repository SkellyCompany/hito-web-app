import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messageForm = new FormGroup({
    message: new FormControl('')
  });
  messages: string[] = ["kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk ","sda", "skdaskdjaskas", "ksjdakdjaskdjas", "sadkjsdkjsdkasjdas", "sakdjkasdjaskda", "skajdkasjdkas","askdjaskdjs","sdkjakdjsakdasdad","uhfasdhjasy","mnmzxncuyuwqkdas","asidyqywhnmz","daiihbxzmqkon","skjdkajdksjdksadaskj","dlasjicjzxjhcnqwn","sakdjkajksjdkas","askdjaskdjjqwiuiwe","sakdjakdjs"]

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(message: string) {

  }

}
