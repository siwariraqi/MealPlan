import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { RegisterService } from "src/app/mealplan/services/register.service";

@Component({
  selector: "app-onboarding10",
  template: `
    <div class="container">
      <div class="top">
        <p class="question">How active are you?</p>
        <p class="line"></p>
      </div>
      <div class="content">
        <div class="img">
          <img src=" /assets/images/questions_icons/{{ ['Active.png'] }}" />
        </div>
        <div class="range">
          <input type="range" [value]="activityValue" class="slider" (change)="updateVal($event.target)" />
          <div class="text">
            <h5 class="sedentary">Sedentary</h5>
            <h5 class="extra">Extra Active</h5>
          </div>
        </div>
      </div>
      <div class="value">
        <h3 id="sliderVal">{{ activityValue }}%</h3>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding10.component.scss"],
})
export class Onboarding10Component implements OnInit {
  activityValue: number;

  constructor(private registerSrv: RegisterService) {
    this.activityValue = 50;
  }
  ngOnInit(): void {
    const userInfo = this.registerSrv.getUserInfo();
    if (userInfo && userInfo.infoId) {
      if (userInfo.activity) {
        this.activityValue = userInfo.activity;
      }
    }
  }

  updateVal(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    console.log(value); //value is string
    this.activityValue = parseInt(value);
    this.registerSrv.getUserInfo().activity = this.activityValue;
  }
}
