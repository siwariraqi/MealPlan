import { Component, OnInit , Input, ViewEncapsulation} from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class PlanComponent implements OnInit {
  @Input() name:string;
  @Input() price:number;
  @Input() length:string;
  @Input() includes: string;
  @Input() benefits: string;
  userId:number;
  @Input()planId:number;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    


    localStorage.setItem('userId','1');
  }

  choosePlan(){
    this.userId = Number(localStorage.getItem('userId'));
    this.userService.choosePlan(this.userId, this.planId).subscribe(
      data => console.log('Plan updated successfully.'),
      error => console.error('Error updating plan:', error)
    );
  }

}
