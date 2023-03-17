import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-onboarding12",
  template: `
    <div class="container">
      <div class="top">
        <p class="question">when were you born?</p>
        <p class="line"></p>
        <div class="date">
          <mat-form-field appearance="fill">
            <mat-label>Choose a date</mat-label>
            <input matInput [matDatepicker]="picker" />
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle
              matIconSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding12.component.scss"],
})
export class Onboarding12Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
