import { Component, OnInit , Input} from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})

export class PlanComponent implements OnInit {
  includes:string;
  @Input() name:string;
  @Input() price:number;
  @Input() length:string;
  benefits: string;
  tmpIncludes: string[] = ["inc1", "inc2", "inc3", "inc4"];
  tmpBenefits: string[] = ["ben1", "ben2", "ben3", "ben4"];
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
