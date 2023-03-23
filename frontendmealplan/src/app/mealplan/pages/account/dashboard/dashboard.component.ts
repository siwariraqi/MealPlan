import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/mealplan/models/Plan';
import { User } from 'src/app/mealplan/models/User';
import { PlanService } from 'src/app/mealplan/services/plan.service';
import { UserService } from 'src/app/mealplan/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService,private planService:PlanService) { }
  user:User ={};
  name:string;
  firstName:string;
  planName:string;
  email:string;

  ngOnInit(): void {
    this.userService.getUser(Number(localStorage.getItem('userId'))).subscribe(
      data => {
         this.user = data;
         this.firstName=this.user.firstName;
         this.name=this.user.firstName+" "+this.user.lastName;
         this.email=this.user.email;
         this.planService.getPlanForUser(this.user.userId).subscribe(//get the plan
            plan => {
              this.planName=plan.planName;
            },
            error => {
              console.error('Error fetching plan:', error);
            }
         );
      },
      error => console.error('Error fetching user:', error)
   );
    
    

  }

}
