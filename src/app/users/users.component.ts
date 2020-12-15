import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  selectedUser: User;
  users!: User[];

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    this.messageService.add(`UserComponent: Selected user id=${user.id}`);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(result => this.users = result)
  }

}
