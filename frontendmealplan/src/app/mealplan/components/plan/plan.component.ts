import { Component, OnInit , Input, ViewEncapsulation} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
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

  constructor(private authService:AuthService,private userService:UserService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log("choose");
  }

  choosePlan(){
    this.userId = this.authService.getUser().userId;
    this.userService.choosePlan(this.planId).subscribe(
      data => {console.log('Plan updated successfully.');
      this.snackBar.open('Plan updated successfully.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });},
      error => {console.error('Error updating plan:', error);
      this.snackBar.open('Error updating plan. Try again Later!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });}
    )
  }

}
