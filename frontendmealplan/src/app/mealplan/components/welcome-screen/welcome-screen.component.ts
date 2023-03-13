import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

interface Keyable {
  [key: string]: any;
}

@Component({
  selector: "app-welcome-screen",
  template: `
    <div class="container">
      <img src=" /assets/images/welcome/{{currScreenObj?.['img']}}" />
      <div class="textWrapper">
        <h2 class="welcomeTitle">
          {{ currScreenObj?.['title'] }}
        </h2>
        <p class="WelcomeText">
          {{ currScreenObj?.['text'] }}
        </p>
      </div>
    </div>
  `,
  styleUrls: ["./welcome-screen.component.scss"],
})
export class WelcomeScreenComponent implements OnInit, OnChanges {
  currScreenObj: Keyable | null;
  welcomeScreens: Keyable[];

  @Input() currentPage: number | undefined;

  constructor() {
    this.currScreenObj = {};

    this.welcomeScreens = [
      {
        img: "Untitled-1.png",
        title: "Welcome",
        text: `Explore tons of new recipes right at your fingertips! You’re about to
      learn new kitchen skills, cook delicious food, and get healthy while
      doing it!`,
      },

      {
        img: "Untitled-2.png",
        title: "Plan your Plate",
        text: `A meal plan designed to support you being the healthiest version of yourself! A way to pile your plate, the right way! Helpful tips on portion control and food `,
      },

      {
        img: "Untitled-3.png",
        title: "Grocery List",
        text: `Each week you’ll get a grocery list sent directly to you, so you can navigate the grocery store the right way!`,
      },

      {
        img: "Untitled-4.png",
        title: "Search",
        text: `If you have extra ingredients laying around your kitchen, look up recipes to use your extras so you don’t waste food!`,
      },

      {
        img: "Untitled-5.png",
        title: "Your Library",
        text: `You now have access to a bunch of food related resources, blogs, and education tips to help you maintain a healthy lifestyle! `,
      },
    ];
  }

  ngOnInit(): void {
    this.currScreenObj = this.welcomeScreens[this.currentPage ?? 0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currScreenObj = this.welcomeScreens[changes["currentPage"].currentValue];
  }
}
