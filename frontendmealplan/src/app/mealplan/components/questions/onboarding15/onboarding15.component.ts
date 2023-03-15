import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-onboarding15",
  template: `
    <div class="container">
      <div class="top">
        <p class="question">Are you ready to begin?</p>
        <p class="line"></p>
      </div>
      <div class="content">
        <div class='text'> Your plan is baking </div>
    </div>
</div>
  `,
  styleUrls: ["./onboarding15.component.scss"],
})
export class Onboarding15Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
