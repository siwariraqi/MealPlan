import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-onboarding14",
  template: `
    <div class="container">
      <div class="top">
        <p class="question">What is your height?</p>
        <p class="line"></p>
      </div>
      <div class="content">
        <div class="img">
          <img src=" /assets/images/questions_icons/{{ ['group2.png'] }}" />
        </div>
        <div class="form__group field">
          <input
            type="input"
            class="form__field"
            placeholder="Name"
            name="name"
            required
          />
          <p class='val'> {{ val }} <p>
        </div>
        <div class="box">
          <div
            class="innerbox"
            (click)="enableDisableRule1()"
            [ngClass]="{ orange: !toggle1, white: toggle1 }"
          >
            FT IN
          </div>
          <div
            class="innerbox"
            (click)="enableDisableRule2()"
            [ngClass]="{ orange: !toggle2, white: toggle2 }"
          >
            CM
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./onboarding14.component.scss"],
})
export class Onboarding14Component implements OnInit {
  toggle1 = true;
  toggle2 = false;
  val : String = "CM";

  constructor() {}

  ngOnInit(): void {}

  enableDisableRule1() {
    this.toggle1 = !this.toggle1;
    this.toggle2 = true;
    this.val = "FT/IN";

  }
  enableDisableRule2() {
    this.toggle2 = !this.toggle2;
    this.toggle1 = true;
    this.val = "CM";

  }
}
