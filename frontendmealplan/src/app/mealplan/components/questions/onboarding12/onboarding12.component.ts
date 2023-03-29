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
        <div class="selectedDate">
          <h4 *ngIf="birthDate">{{ birthDate.toUTCString().split(":")[0].slice(0, -2) }}</h4>
        </div>
        <div class="dateContainer">
          <mat-card class="calendar-card">
            <mat-calendar [startAt]="startAt" [(selected)]="selected" (selectedChange)="validateInputsAndSave()"></mat-calendar>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding12.component.scss"],
})
export class Onboarding12Component implements OnInit {
  selected: Date | null;
  birthDate: Date;
  startAt: Date;

  constructor(private registerSrv: RegisterService) {
    this.birthDate = null;
  }

  ngOnInit(): void {
    const userInfo = this.registerSrv.getUserInfo();
    if (userInfo && userInfo.infoId) {
      if (userInfo.birthday) {
        this.birthDate = userInfo.birthday;

        const date: Date = new Date(this.birthDate);
        this.birthDate = date;

        this.startAt = this.birthDate;
        this.selected = this.birthDate;
      }
    } else {
      this.startAt = new Date(Date.now());
    }
  }

  validateInputsAndSave() {
    let fixedDate: Date = new Date(this.selected);
    fixedDate.setMinutes(fixedDate.getMinutes() - fixedDate.getTimezoneOffset());
    this.registerSrv.getUserInfo().birthday = fixedDate;
  }
}
