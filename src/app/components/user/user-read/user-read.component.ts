
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

import { User } from '../user.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit {
  users: User[] 
  users2: User[]=[
    {id: 1, name: 'Hydrogen',username:'operador'}]

  displayedColumns = ['id','name','username','action']
  constructor(private UserService: UserService) { }

  ngOnInit(): void {
 this.UserService.read().subscribe(users =>{
 this.users = users;
 
})
console.log(this.users2)
   


  }

}
