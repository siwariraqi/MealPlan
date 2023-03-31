import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { PlanService } from '../../services/plan.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.scss']
})
export class ChooseplanComponent implements OnInit {

  plans: any[] = [];
  length:number;
  previousUrl: string;
  @Input() needToBack:boolean = false;

  constructor(private _location: Location,private router: Router, private route: ActivatedRoute,private planService: PlanService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {



    this.planService.getPlans().subscribe({
      next: (data: any[]) => {
        this.plans = data;
      },
      error: (error: any) => {
        this.snackBar.open('Failed to load plans. Please try again later.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        console.error(error);
      }
    });
  }

  back(){
    this._location.back();
  }

  

}
