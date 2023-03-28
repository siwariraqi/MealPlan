import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.scss']
})
export class ChooseplanComponent implements OnInit {

  plans: any[] = [];
  length:number;

  constructor(private planService: PlanService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe({
      next: (data: any[]) => {
        this.plans = data;
        console.log(this.plans);
      },
      error: (error: any) => {
        this.snackBar.open('Failed to load plans. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        console.error(error);
      }
    });
  }

  

}
