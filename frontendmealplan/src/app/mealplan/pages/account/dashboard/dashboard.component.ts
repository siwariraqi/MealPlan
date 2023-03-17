import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/mealplan/models/User';
import { UserService } from 'src/app/mealplan/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService) { }
  user:User ={};
  name:string;
  firstName:string;
  email:string;
  ngOnInit(): void {
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe(
      data => {
         this.user = data;
         this.firstName=this.user.firstName;
         this.name=this.user.firstName+" "+this.user.lastName;
         this.email=this.user.email;
      },
      error => console.error('Error fetching user:', error)
   );
  }

}
