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
          <input
            type="range"
            [value]="activityValue"
            class="slider"
            (change)="updateVal($event.target)"
          />
          <div class="text">
            <p class="Sedentary">Sedentary</p>
            <p class="Extra">Extra Active</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding10.component.scss"],
})
export class Onboarding10Component {
  activityValue: number;
  constructor(private registerSrv: RegisterService) {
    this.activityValue = 40;
  }

  updateVal(target: EventTarget) {
    const value = (target as HTMLInputElement).value;
    console.log(value); //value is string
    this.activityValue = parseInt(value);
    this.registerSrv.getUserInfo().activity = value;
  }
}
