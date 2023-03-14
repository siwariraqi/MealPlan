import { Component, OnInit , Input} from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
