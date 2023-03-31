import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/mealplan/models/Plan';
import { User } from 'src/app/mealplan/models/User';
import { AuthService } from 'src/app/mealplan/services/auth.service';
import { PlanService } from 'src/app/mealplan/services/plan.service';
import { UserService } from 'src/app/mealplan/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService, private userService:UserService,private planService:PlanService) { }
  user:User ={};
  name:string;
  firstName:string;
  planName:string;
  email:string;

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.firstName=this.user.firstName;
    this.name=this.user.firstName+" "+this.user.lastName;
    this.email=this.user.email;
    this.planService.getPlanForUser().subscribe(//get the plan
            plan => {
              this.planName=plan.planName;
            },
            error => {
              console.error('Error fetching plan:', error);
            }
         );

  }

}
