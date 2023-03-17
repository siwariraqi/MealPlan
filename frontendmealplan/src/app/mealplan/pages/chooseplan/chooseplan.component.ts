import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.scss']
})
export class ChooseplanComponent implements OnInit {

  plans: any[] = [];
  length:number;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get<any>('plans/getPlans').subscribe(
      (data: any) => {
        this.plans = data;
        console.log(this.plans);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
