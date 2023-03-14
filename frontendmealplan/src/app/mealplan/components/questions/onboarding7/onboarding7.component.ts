import { Component, OnInit } from "@angular/core";
import { Color, colorSets } from "@swimlane/ngx-charts";

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
            (click)="enableDisableRule1()"
            [ngClass]="{ orange: !toggle1, white: toggle1 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['healthy.png'] }}" />
            </div>
            <div class="text">Be healthier</div>
          </div>
          <!-- box2 -->
          <div
            class="box"
            (click)="enableDisableRule2()"
            [ngClass]="{ orange: !toggle2, white: toggle2 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['glucose.png'] }}" />
            </div>
            <div class="text">Manage my glucose</div>
          </div>
        </div>
        <div class="boxesWrapper">
          <!-- box3 -->
          <div
            class="box"
            (click)="enableDisableRule3()"
            [ngClass]="{ orange: !toggle3, white: toggle3 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['energy.png'] }}" />
            </div>
            <div class="text">Increase my energy levels</div>
          </div>
          <!-- box4 -->
          <div
            class="box"
            (click)="enableDisableRule4()"
            [ngClass]="{ orange: !toggle4, white: toggle4 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['weight.png'] }}" />
            </div>
            <div class="text">Lose weight</div>
          </div>
        </div>
        <div class="boxesWrapper">
          <!-- box5 -->
          <div
            class="box"
            (click)="enableDisableRule5()"
            [ngClass]="{ orange: !toggle5, white: toggle5 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['cook.png'] }}" />
            </div>
            <div class="text">Learn to cook</div>
          </div>
          <!-- box6 -->
          <div
            class="box"
            (click)="enableDisableRule6()"
            [ngClass]="{ orange: !toggle6, white: toggle6 }"
          >
            <div class="img">
              <img src=" /assets/images/questions_icons/{{ ['recipe.png'] }}" />
            </div>
            <div class="text">Learn new recipes</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding7.component.scss"],
})
export class Onboarding7Component implements OnInit {
  toggle1 = true;
  toggle2 = true;
  toggle3 = true;
  toggle4 = true;
  toggle5 = true;
  toggle6 = true;

  constructor() {}

  ngOnInit(): void {}

  enableDisableRule1() {
    this.toggle1 = !this.toggle1;
  }
  enableDisableRule2() {
    this.toggle2 = !this.toggle2;
  }
  enableDisableRule3() {
    this.toggle3 = !this.toggle3;
  }
  enableDisableRule4() {
    this.toggle4 = !this.toggle4;
  }
  enableDisableRule5() {
    this.toggle5 = !this.toggle5;
  }
  enableDisableRule6() {
    this.toggle6 = !this.toggle6;
  }
}
