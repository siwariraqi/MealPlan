import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Goal } from "../../models/Goal";
import { UserInfo } from "../../models/UserInfo";
import { RegisterService } from "../../services/register.service";
import { Onboarding7Component } from "../../components/questions/onboarding7/onboarding7.component";

@Component({
  selector: "app-register",
  template: `
    <div class="registerContainer" [ngStyle]="{ 'background-color': backgroundColor, 'background-image': backgroundImage }">
      <app-welcome-screen *ngIf="screenState === 'welcome'" [currentPage]="currentPage"></app-welcome-screen>
      <app-onboarding7 *ngIf="onBoardingStep === 7"></app-onboarding7>
      <app-onboarding8 *ngIf="onBoardingStep === 8"></app-onboarding8>
      <app-onboarding9 *ngIf="onBoardingStep === 9"></app-onboarding9>
      <app-onboarding10 *ngIf="onBoardingStep === 10"></app-onboarding10>
      <app-onboarding11 *ngIf="onBoardingStep === 11"></app-onboarding11>
      <app-onboarding12 *ngIf="onBoardingStep === 12"></app-onboarding12>
      <app-onboarding13 *ngIf="onBoardingStep === 13"></app-onboarding13>
      <app-onboarding14 *ngIf="onBoardingStep === 14"></app-onboarding14>
      <app-onboarding15 *ngIf="onBoardingStep === 15"></app-onboarding15>
      <app-register-form *ngIf="onBoardingStep === 16"></app-register-form>
      <button *ngIf="onBoardingStep < 16" class="nextBtn" (click)="nextScreen()" [disabled]="!isCompleted">NEXT</button>
      <div class="dots">
        <div
          *ngFor="let page of pages; index as i"
          class="circle"
          [ngClass]="{
            'black-dot': i <= currentPage && screenState === 'welcome',
            'current-page': i <= currentPage && screenState === 'questions'
          }"
        >
          {{ screenState === "questions" ? i + 1 : "" }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./register.component.scss"],
  animations: [],
})
export class RegisterComponent implements OnInit {
  pages = Array.from({ length: 5 }).fill(0);
  currentPage: number;
  backgroundColor: string;
  backgroundImage: string;
  screenState: string;
  onBoardingStep: number;
  userGoals: Goal[];

  isCompleted: boolean;

  constructor(private registerSrv: RegisterService) {
    this.currentPage = 0;
    this.backgroundColor = "#fff";
    this.backgroundImage = "";

    this.screenState = "welcome";
    this.onBoardingStep = 2;
    this.isCompleted = true;
  }

  ngOnInit(): void {
    this.backgroundColor = "#4b643d";
  }

  nextScreen() {
    if (this.onBoardingStep > 6) {
      if (!this.screenValidation()) {
        return;
      } else {
        console.log("isValid YESS");

        this.registerSrv.updateUserInfo(); //if valid save in db
      }
    }

    if (this.currentPage !== 9) this.currentPage++;
    this.onBoardingStep++;
    if (this.screenState === "welcome") {
      if (this.currentPage == 5) {
        this.pages = Array.from({ length: 10 }).fill(0);
        this.screenState = "questions";
        this.currentPage = 0;
      }
    }

    switch (this.onBoardingStep) {
      case 2:
        this.backgroundColor = "#4b643d";
        break;
      case 3:
        this.backgroundColor = "#EB9183";
        break;

      case 4:
        this.backgroundColor = "#99B182";
        break;

      case 5:
        this.backgroundColor = "#E7C851";
        break;

      case 6:
        this.backgroundColor = "#E09167";
        break;

      case 16:
        this.backgroundColor = "#bdc3c7";
        this.backgroundImage = " linear-gradient(to right, #ffffff, #ffffffd2) ";
        break;

      default:
        this.backgroundColor = "#fff";
    }
  }

  prevScreen() {}

  screenValidation(): boolean {
    let isValid: boolean = true;
    switch (this.onBoardingStep) {
      case 7: //goals
        if (!this.registerSrv.getUserInfo().goals || !this.registerSrv.getUserInfo().goals.length) {
          isValid = false;
        }
        break;
      case 8: //medicalRisk
        isValid = true;
        break;
      case 9: //isReceiveTreatment
        if (this.registerSrv.getUserInfo().isReceiveTreatment === null || this.registerSrv.getUserInfo().isReceiveTreatment === undefined)
          isValid = false;
        break;
      case 10: //activity
        isValid = true;
        break;
      case 11: //gender
        if (!this.registerSrv.getUserInfo().gender) isValid = false;
        break;
      case 12: //birthday
        if (!this.validateBirthday()) isValid = false; //TODO
        break;
      case 13: //weight
        if (!this.validateWeight()) isValid = false; //TODO
        break;
      case 14: //height
        if (!this.validateHeight()) isValid = false; //TODO
        break;
    }
    return isValid;
  }

  validateBirthday(): boolean {
    const userBday = this.registerSrv.getUserInfo().birthday;
    console.log(typeof userBday);
    if (!userBday || userBday === "") {
      return false;
    }
    const userBdayDate = new Date(userBday);
    const minDate = new Date("1/1/1922");
    const maxDate = new Date("1/1/2004");
    if (userBdayDate < minDate || userBdayDate > maxDate) {
      return false;
    }
    return true;
  }

  validateWeight(): boolean {
    const userWeight = this.registerSrv.getUserInfo().weight;
    if (!userWeight || userWeight === "") {
      return false;
    }
    const userWeightNum = parseInt(userWeight);
    const userUnit = this.registerSrv.getUserInfo().unit;
    const minWeightKg: number = 30;
    const maxWeightKg: number = 300;
    const imperialFactor: number = 2.2;
    if (userUnit === "metric") {
      if (!(userWeightNum > minWeightKg && userWeightNum < maxWeightKg)) {
        return false;
      }
    } else {
      //imperial
      if (!(userWeightNum > minWeightKg * imperialFactor && userWeightNum < maxWeightKg * imperialFactor)) {
        return false;
      }
    }
    return true;
  }

  validateHeight(): boolean {
    const userheight = this.registerSrv.getUserInfo().height;
    console.log(userheight);
    if (!userheight || userheight === "") {
      return false;
    }
    const userheightNum = parseFloat(userheight);
    const userUnit = this.registerSrv.getUserInfo().unit;
    const minHeightCm: number = 100;
    const maxHeightCm: number = 220;
    if (userUnit === "metric") {
      if (!(userheightNum > minHeightCm && userheightNum < maxHeightCm)) {
        return false;
      }
    } else {
      //imperial
      if (!(userheightNum > this.convertToFeet(minHeightCm) && userheightNum < this.convertToFeet(maxHeightCm))) {
        return false;
      }
    }
    return true;
  }

  convertToFeet(n: number): number {
    const realFeet: number = (n * 0.3937) / 12;
    const feet: number = Math.floor(realFeet);
    const inches: number = Math.round((realFeet - feet) * 12);
    return parseFloat(feet + "." + inches);
  }
}
