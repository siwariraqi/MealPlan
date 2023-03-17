import { Component, Input, OnInit } from "@angular/core";
import { Goal } from "src/app/mealplan/models/Goal";
import { UserInfo } from "src/app/mealplan/models/UserInfo";
import { RegisterService } from "src/app/mealplan/services/register.service";

@Component({
  selector: "app-onboarding7",
  template: `
    <style>
      .box:hover {
        background: #e09167;
      }
    </style>
    <div class="container">
      <div class="top">
        <p class="question">What are your goals?</p>
        <p class="textTitle">Select which apply to you</p>
        <p class="line"></p>
      </div>
      <div class="content">
        <div class="boxesWrapper">
          <!-- box1 -->
          <div
            class="box"
            (click)="enableDisableRule1(allGoals[0])"
            [ngClass]="{ green: toggle1, white: !toggle1 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['healthy.png'] }}" />
            </div>
            <div class="text">{{ allGoals[0].text }}</div>
          </div>
          <!-- box2 -->
          <div
            class="box"
            (click)="enableDisableRule2(allGoals[1])"
            [ngClass]="{ green: toggle2, white: !toggle2 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['glucose.png'] }}" />
            </div>
            <div class="text">{{ allGoals[1].text }}</div>
          </div>
        </div>
        <div class="boxesWrapper">
          <!-- box3 -->
          <div
            class="box"
            (click)="enableDisableRule3(allGoals[2])"
            [ngClass]="{ green: toggle3, white: !toggle3 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['energy.png'] }}" />
            </div>
            <div class="text">{{ allGoals[2].text }}</div>
          </div>
          <!-- box4 -->
          <div
            class="box"
            (click)="enableDisableRule4(allGoals[3])"
            [ngClass]="{ green: toggle4, white: !toggle4 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['weight.png'] }}" />
            </div>
            <div class="text">{{ allGoals[3].text }}</div>
          </div>
        </div>
        <div class="boxesWrapper">
          <!-- box5 -->
          <div
            class="box"
            (click)="enableDisableRule5(allGoals[4])"
            [ngClass]="{ green: toggle5, white: !toggle5 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['cook.png'] }}" />
            </div>
            <div class="text">{{ allGoals[4].text }}</div>
          </div>
          <!-- box6 -->
          <div
            class="box"
            (click)="enableDisableRule6(allGoals[5])"
            [ngClass]="{ green: toggle6, white: !toggle6 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['recipe.png'] }}" />
            </div>
            <div class="text">{{ allGoals[5].text }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding7.component.scss"],
})
export class Onboarding7Component implements OnInit {
  toggle1: boolean;
  toggle2: boolean;
  toggle3: boolean;
  toggle4: boolean;
  toggle5: boolean;
  toggle6: boolean;
  allGoals: Goal[];
  // @Input() userGoals: Goal[];

  constructor(private registerSrv: RegisterService) {
    this.toggle1 = false;
    this.toggle2 = false;
    this.toggle3 = false;
    this.toggle4 = false;
    this.toggle5 = false;
    this.toggle6 = false;
    this.allGoals = [
      { goalId: 1, text: "Be healthier" },
      { goalId: 2, text: "Manage my glucose" },
      { goalId: 3, text: "Increase my energy levels" },
      { goalId: 4, text: "Lose weight" },
      { goalId: 5, text: "Learn to cook" },
      { goalId: 6, text: "Learn new recipes" },
    ];
  }

  ngOnInit(): void {
    const userInfo = this.registerSrv.getUserInfo();
    console.log("current userinfo id " + userInfo.infoId);
    if (!userInfo.infoId) {
      this.registerSrv.updateUserInfo().subscribe((userInfo) => {
        console.log("added new userinfo " + userInfo.infoId);
      });
    }
  }

  enableDisableRule1(goal: Goal) {
    this.toggle1 = !this.toggle1;
    this.addOrRemoveGoalSelection(goal, this.toggle1);
  }
  enableDisableRule2(goal: Goal) {
    this.toggle2 = !this.toggle2;
    this.addOrRemoveGoalSelection(goal, this.toggle2);
  }
  enableDisableRule3(goal: Goal) {
    this.toggle3 = !this.toggle3;
    this.addOrRemoveGoalSelection(goal, this.toggle3);
  }
  enableDisableRule4(goal: Goal) {
    this.toggle4 = !this.toggle4;
    this.addOrRemoveGoalSelection(goal, this.toggle4);
  }
  enableDisableRule5(goal: Goal) {
    this.toggle5 = !this.toggle5;
    this.addOrRemoveGoalSelection(goal, this.toggle5);
  }
  enableDisableRule6(goal: Goal) {
    this.toggle6 = !this.toggle6;
    this.addOrRemoveGoalSelection(goal, this.toggle6);
  }

  addOrRemoveGoalSelection(goal: Goal, isSelected: boolean) {
    if (!this.registerSrv.getUserInfo().goals) {
      this.registerSrv.getUserInfo().goals = [];
    }
    if (isSelected) {
      this.registerSrv.getUserInfo().goals.push(goal);
    } else {
      const idx = goal.goalId;
      this.registerSrv.getUserInfo().goals = this.registerSrv
        .getUserInfo()
        .goals?.filter((obj) => obj.goalId !== idx); //remove goal from array
    }
    // console.log(this.registerSrv.getUserInfo());
    // console.log(this.registerSrv.getUserInfo().goals);
  }
}
