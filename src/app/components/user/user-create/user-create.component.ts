import { User } from './../user.model';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    
      username: '',
      name: '',
      lastname: '',
      password: ''
      
  
  }
  constructor(private UserService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(): void{
    this.UserService.create(this.user).subscribe(()=>{
      this.UserService.showMessage('Usuario Criado')
      this.router.navigate(['/users'])
    })


  }

cancel(): void{
  this.router.navigate(['/users'])
}

}
