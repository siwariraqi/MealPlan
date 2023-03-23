import { Component, OnInit , Input, ViewEncapsulation} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private userService:UserService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    


    localStorage.setItem('userId','1');// to be handled after adding global user
  }

  choosePlan(){
    this.userId = Number(localStorage.getItem('userId'));
    this.userService.choosePlan(this.userId, this.planId).subscribe(
      data => {console.log('Plan updated successfully.');
      this.snackBar.open('Plan updated successfully.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });},
      error => {console.error('Error updating plan:', error);
      this.snackBar.open('Error updating plan. Try again Later!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });}
    )
  }

}
