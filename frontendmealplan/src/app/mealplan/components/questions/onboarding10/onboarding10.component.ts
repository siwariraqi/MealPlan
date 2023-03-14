import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-onboarding10",
  template: `
    <div class="container">
      <div class='top'> 
      <p class='question'> How active are you?  </p>
        <p class='line'></p>
      </div>
      <div class="content"> 
      <div class='img'> 
          <img src=" /assets/images/questions_icons/{{['Active.png']}}" >
          </div>
          <div class='range'>
          <input type="range" value="40" class="slider">
        <div class = 'text'>
           <p class='Sedentary'> Sedentary </p>
           <p class='Extra' > Extra Active </p>
         </div>
        </div>
    </div>
</div>
  `,
  styleUrls: ["./onboarding10.component.scss"],
})
export class Onboarding10Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
