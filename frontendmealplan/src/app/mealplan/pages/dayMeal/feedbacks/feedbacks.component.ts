import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserFeedback } from "src/app/mealplan/models/UserFeedback";
import { DayMealService } from "src/app/mealplan/services/day-meal.service";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {
  @Input () mealId :number
  
  constructor(private fb: FormBuilder,private dayMealService:DayMealService ,private snackBar: MatSnackBar) {
    this.feedbackForm = this.fb.group({
      review: ['', Validators.required]
    });
  }
  userFeedback: UserFeedback = new UserFeedback(); 

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      review: new FormControl('', [Validators.required])
    });
    this.feedbackForm.get('review').valueChanges.subscribe(value => {
      console.log(value);
    });
  }
  feedbacks: string[] = [
    "Eazy to make",
    "Yummy",
    "Effect onBGL",
    "Effect on energy levels",
  ];
  feedbackStates: boolean[] = new Array(this.feedbacks.length).fill(false);
  feedbackForm: FormGroup;



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

  rate(rating: any) {
    for (let i = 0; i < this.ratings.length; i++) {
      if (this.ratings[i].title === rating.title) {
        this.ratings[i].selected = true;
        this.userFeedback.rating=i+1; 
      } else {
        this.ratings[i].selected = false;
      }
    }
  }

  selectedFeedbacksString: string = '';
  onSelectFeedback(index: number) {
    this.feedbackStates[index] = !this.feedbackStates[index];
    let selectedFeedbacks = [];
    for (let i = 0; i < this.feedbacks.length; i++) {
      if (this.feedbackStates[i]) {
        selectedFeedbacks.push(this.feedbacks[i]);
      }
    }
    this.selectedFeedbacksString = selectedFeedbacks.join(', ');
    this.feedbackForm.get('review').setValue(this.selectedFeedbacksString);
    console.log(this.selectedFeedbacksString)
  }
  
  saveFeedback() {
    
    const feedbackText = this.feedbackForm.get('review').value;
    console.log(feedbackText)
    if (feedbackText) {
      this.userFeedback.feedbackText = feedbackText;
      this.dayMealService.saveFeedback(this.userFeedback, 1, this.mealId).subscribe(response => {
        console.log('Feedback saved successfully:', response);
       
        this.feedbackForm.reset();
        for (let i = 0; i < this.ratings.length; i++) {
        this.ratings[i].selected=false
        }
        for (let i = 0; i < this.feedbacks.length; i++) {
        this.feedbackStates[i]=false;
        }
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['my-snackbar']
        this.snackBar.open('Thank you for your feedback!', 'Close', config);
        
      });
    }
    
    
  }

}
