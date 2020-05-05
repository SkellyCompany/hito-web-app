import { Contact } from './../../../shared/models/contact.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  selectedContact: Contact;
  contacts: Contact[] = [{name: "Kiddo"},{name: "Kiddo"},{name: "Kiddo"},
  {name: "Kiddo"},{name: "Kiddo"},{name: "Kiddo"},{name: "Kiddo"},{name: "Kiddo"},{name: "Kiddo"},];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(contact: Contact) {
    this.selectedContact = contact;
  }

}
