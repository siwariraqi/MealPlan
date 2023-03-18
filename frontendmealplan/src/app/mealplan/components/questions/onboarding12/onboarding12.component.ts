import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { RegisterService } from "src/app/mealplan/services/register.service";

@Component({
  selector: "app-onboarding12",
  template: `
    <div class="container">
      <div class="top">
        <p class="question">when were you born?</p>
        <p class="line"></p>
        <div class="dateContainer">
          <mat-card class="calendar-card">
            <mat-calendar
              [(selected)]="selected"
              (selectedChange)="validateInputsAndSave()"
            ></mat-calendar>
          </mat-card>
          <div class="displayError">
            {{ errorMsg }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding12.component.scss"],
})
export class Onboarding12Component implements OnInit {
  selected: Date | null;
  birthDate: string;
  errorMsg: string;

  constructor(private registerSrv: RegisterService) {
    this.birthDate = null;
    this.errorMsg = null;
  }

  ngOnInit(): void {}

  validateInputsAndSave() {
    this.errorMsg = "";
    const currentDate = new Date(Date.now());
    if (currentDate.getFullYear() - this.selected.getFullYear() < 12) {
      this.errorMsg = "You must be at least 12 years old to register";
    }

    //save
    if (this.errorMsg === null || this.errorMsg === "") {
      this.birthDate = this.selected.toDateString();
      // console.log(this.birthDate);
      this.registerSrv.getUserInfo().birthday = this.birthDate;
      console.log(this.registerSrv.getUserInfo().birthday);

    }
  }
}
