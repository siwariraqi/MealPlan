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
  userId:number = 1;
  @Input()planId:number;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  choosePlan(){
    
    this.userService.choosePlan(this.userId, this.planId).subscribe(
      data => console.log('Plan updated successfully.'),
      error => console.error('Error updating plan:', error)
    );
  }

}
