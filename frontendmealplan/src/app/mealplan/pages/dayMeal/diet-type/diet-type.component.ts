import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-diet-type',
  templateUrl: './diet-type.component.html',
  styleUrls: ['./diet-type.component.scss']
})
export class DietTypeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  keto=true;
  vegan=true;
  gluten=true;
  dairy=true;

}
