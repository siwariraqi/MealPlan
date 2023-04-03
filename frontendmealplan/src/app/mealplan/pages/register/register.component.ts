import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Goal } from "../../models/Goal";
import { UserInfo } from "../../models/UserInfo";
import { RegisterService } from "../../services/register.service";
import { Onboarding7Component } from "../../components/questions/onboarding7/onboarding7.component";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  template: `
    <div
      class="registerContainer"
      [ngStyle]="{
        'background-color': backgroundColor,
        'background-image': backgroundImage
      }"
    >
      <div
        class="backBtn"
        *ngIf="getOnboardingStep() > 2 && getOnboardingStep() < 16"
        [ngStyle]="{ color: getOnboardingStep() < 7 ? 'white' : 'black' }"
      >
        <div (click)="prevScreen()"><mat-icon>arrow_back</mat-icon></div>
      </div>

      <div *ngIf="getOnboardingStep() < 16" class="onboarding-question">
        <app-welcome-screen *ngIf="getOnboardingStep() < 7" [currentPage]="getOnboardingStep() - 2"></app-welcome-screen>
        <app-onboarding7 *ngIf="getOnboardingStep() === 7"></app-onboarding7>
        <app-onboarding8 *ngIf="getOnboardingStep() === 8"></app-onboarding8>
        <app-onboarding9 *ngIf="getOnboardingStep() === 9"></app-onboarding9>
        <app-onboarding10 *ngIf="getOnboardingStep() === 10"></app-onboarding10>
        <app-onboarding11 *ngIf="getOnboardingStep() === 11"></app-onboarding11>
        <app-onboarding12 *ngIf="getOnboardingStep() === 12"></app-onboarding12>
        <app-onboarding13 *ngIf="getOnboardingStep() === 13"></app-onboarding13>
        <app-onboarding14 *ngIf="getOnboardingStep() === 14"></app-onboarding14>
        <app-onboarding15 *ngIf="getOnboardingStep() === 15"></app-onboarding15>
      </div>

      <app-register-form *ngIf="getOnboardingStep() === 16"></app-register-form>
      <app-register-google
        *ngIf="getOnboardingStep() === 17"
      ></app-register-google>

      <div
        *ngIf="
          getOnboardingStep() >= 7 && getOnboardingStep() <= 14 && error !== ''
        "
        class="errorMsg"
      >
        <h4>{{ error }}</h4>
      </div>
      <button
        *ngIf="getOnboardingStep() < 16"
        class="nextBtn"
        [ngStyle]="{ 'background-color': btnBackgroundColor, color: btnColor }"
        (click)="nextScreen()"
      >
        {{ getOnboardingStep() === 15 ? "CONFIRM & CONTINUE" : "NEXT" }}
      </button>
      <div class="dots" *ngIf="getOnboardingStep() < 16">
        <div
          *ngFor="let page of pages; index as i"
          class="circle"
          [ngClass]="{
            'black-dot':
              i <= getOnboardingStep() - 2 && getOnboardingStep() < 7,
            'current-page':
              i <= getOnboardingStep() - 7 && getOnboardingStep() >= 7
          }"
        >
          {{ getOnboardingStep() >= 7 ? i + 1 : "" }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./register.component.scss"],
  animations: [],
})
export class RegisterComponent implements OnInit {
  pages: any[];
  backgroundColor: string;
  backgroundImage: string;
  btnBackgroundColor: string;
  btnColor: string;
  userGoals: Goal[];
  error: string;

  constructor(private registerSrv: RegisterService, private authSrv: AuthService, private router: Router) {
    this.backgroundColor = "#fff";
    this.backgroundImage = "";
    // this.screenState = "welcome";
    this.error = "";
  }

  ngOnInit(): void {
    const user = this.authSrv.getUser();
    console.log("user=> ", user);
    if (user && user.email) {
      this.router.navigateByUrl("/mealplan/meals");
    }
    this.changeBgColor();
    this.changeBtnColors();
    this.setPages();
  }

  getOnboardingStep(): number {
    return this.registerSrv.getOnBoardingStep();
  }

  nextScreen() {
    console.log("onboarding=> ", this.getOnboardingStep());
    if (this.saveUserInfo()) {
      this.registerSrv.incrementOnBoardingStep();
      this.setPages();
      this.changeBgColor();
      this.changeBtnColors();
    }
  }

  prevScreen() {
    if (this.saveUserInfo()) {
      this.registerSrv.decrementOnBoardingStep();
      this.setPages();
      this.changeBgColor();
      this.changeBtnColors();
    }
  }

  saveUserInfo(): boolean {
    if (this.getOnboardingStep() >= 7) {
      if (!this.screenValidation(this.getOnboardingStep())) {
        return false;
      } else {
        console.log("isValid YESS");
        this.error = "";
        //if valid save in db
        this.registerSrv.updateUserInfo().subscribe({
          next: (updatedUserInfo) => {
            console.log(updatedUserInfo);
            this.registerSrv.setUserInfo(updatedUserInfo);
          },
          error: (e) => console.error(e),
          complete: () => console.info("complete"),
        });
        return true;
      }
    } else {
      return true;
    }
  }

  setPages(): void {
    if (this.getOnboardingStep() < 7) {
      this.pages = Array.from({ length: 5 }).fill(0);
    } else {
      this.pages = Array.from({ length: 9 }).fill(0);
    }
  }

  changeBgColor(): string {
    switch (this.getOnboardingStep()) {
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
        this.backgroundImage =
          " linear-gradient(to right, #ffffff, #ffffffd2) ";
        break;

      default:
        this.backgroundColor = "#fff";
    }
    return this.backgroundColor;
  }

  changeBtnColors(): void {
    if (this.getOnboardingStep() >= 7) {
      this.btnBackgroundColor = "#dd9670c4";
      this.btnColor = "white";
    } else {
      this.btnBackgroundColor = "#ffffff";
      this.btnColor = "black";
    }
  }

  screenValidation(stepNum: number): boolean {
    let isValid: boolean = true;
    switch (stepNum) {
      case 7: //goals
        if (
          !this.registerSrv.getUserInfo().goals ||
          !this.registerSrv.getUserInfo().goals.length
        ) {
          this.error = "You must select at least one goal!";
          isValid = false;
        }
        break;
      case 8: //medicalRisk
        isValid = true;
        break;
      case 9: //isReceiveTreatment
        if (
          this.registerSrv.getUserInfo().isReceiveTreatment === null ||
          this.registerSrv.getUserInfo().isReceiveTreatment === undefined
        ) {
          this.error = "You must select an answer first";
          isValid = false;
        }
        break;
      case 10: //activity
        if (!this.registerSrv.getUserInfo().activity) {
          this.registerSrv.getUserInfo().activity = 50; //default activity value
        }
        isValid = true;
        break;
      case 11: //gender
        if (!this.registerSrv.getUserInfo().gender) {
          isValid = false;
          this.error = "You must select an answer first";
        }
        break;
      case 12: //birthday
        if (!this.validateBirthday()) {
          this.error =
            "Invalid birthdate! dates accepted between 1/1/1922 and 1/1/2004";
          isValid = false;
          this.registerSrv.getUserInfo().birthday = null;
        }
        break;
      case 13: //weight
        if (!this.validateWeight()) {
          console.log("unit is: ", this.registerSrv.getUserInfo().unit);

          this.error = `Invalid weight input! Weight must be between ${
            this.registerSrv.getUserInfo().unit === "metric"
              ? "30 and 300 kg"
              : "66 and 661 lb"
          }`;
          isValid = false;
          this.registerSrv.getUserInfo().weight = null;
        }
        break;
      case 14: //height
        if (!this.validateHeight()) {
          this.error = `Invalid height input! height must be between ${
            this.registerSrv.getUserInfo().unit === "metric"
              ? "100 and 220 cm"
              : "3.31 (3'31'') and 7.29 (7'29'') ft"
          }`;
          isValid = false;
          this.registerSrv.getUserInfo().height = null;
        }
        break;
    }
    return isValid;
  }

  validateBirthday(): boolean {
    const userBday = this.registerSrv.getUserInfo().birthday;
    console.log(typeof userBday);
    if (!userBday) {
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
    if (!this.registerSrv.getUserInfo().unit) {
      //if unit is null
      this.registerSrv.getUserInfo().unit = "metric"; //default value of unit
    }
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
      if (
        !(
          userWeightNum > minWeightKg * imperialFactor &&
          userWeightNum < maxWeightKg * imperialFactor
        )
      ) {
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
      if (
        !(
          userheightNum > this.convertToFeet(minHeightCm) &&
          userheightNum < this.convertToFeet(maxHeightCm)
        )
      ) {
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
