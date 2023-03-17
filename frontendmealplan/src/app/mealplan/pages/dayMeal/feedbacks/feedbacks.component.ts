import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public feedbacks: Array<string> = [
    "Eazy to make",
    "Yummy",
    "Effect onBGL",
    "Effect on energy levels",
  ];

  public ratings = [
    {
      title: "Very Dissatisfied",
      icon: "sentiment_very_dissatisfied",
      percentage: 20,
      selected: false,
    },
    {
      title: "Dissatisfied",
      // icon: "favorite_border",
      icon: "sentiment_dissatisfied",
      percentage: 40,
      selected: false,
    },
    {
      title: "Neutral",
      // icon: "favorite_border",
      icon: "sentiment_neutral",
      percentage: 60,
      selected: false,
    },
    {
      title: "Satisfied",
      // icon: "favorite_border",
      icon: "sentiment_satisfied",
      percentage: 80,
      selected: false,
    },
    {
      title: "Very Satisfied",
      // icon: "favorite_border",
      icon: "sentiment_very_satisfied",
      percentage: 100,
      selected: false,
    },
  ];

}
