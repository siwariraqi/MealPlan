import { Component, Input, OnInit } from "@angular/core";
import { Goal } from "../../models/Goal";
import { UserInfo } from "../../models/UserInfo";
import { RegisterService } from "../../services/register.service";

@Component({
  selector: "app-register",
  template: `
    <div
      class="registerContainer"
      [ngStyle]="{ 'background-color': backgroundColor, 'background-image': backgroundImage }"
    >
      <app-welcome-screen
        *ngIf="screenState === 'welcome'"
        [currentPage]="currentPage"
      ></app-welcome-screen>
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
      <button *ngIf="onBoardingStep < 16" class="nextBtn" (click)="nextScreen()">NEXT</button>
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

  @Input() valid:boolean; // from conboarding7


  constructor(private registerSrv: RegisterService) {
    this.currentPage = 0;
    this.backgroundColor = "#fff";
    this.backgroundImage = "";

    this.screenState = "welcome";
    this.onBoardingStep = 2;
  }
  ngOnInit(): void {
    this.backgroundColor = "#4b643d";
  }

  nextScreen() {
    if (this.onBoardingStep > 5) {
      this.registerSrv.updateUserInfo(); //save userinfo (answers) to local storage and server database
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
}
