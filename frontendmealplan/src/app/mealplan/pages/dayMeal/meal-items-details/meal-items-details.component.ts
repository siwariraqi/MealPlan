import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { DayMeal } from 'src/app/mealplan/models/DayMeal';

@Component({
  selector: 'app-meal-items-details',
  templateUrl: './meal-items-details.component.html',
  styleUrls: ['./meal-items-details.component.scss']
})
export class MealItemsDetailsComponent implements OnInit {
  @Input ('mealItems') mealItems:Array<DayMeal>=[];
  public config: SwiperConfigInterface = {}; 
  constructor() { }
  ngOnInit() {
  }
  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,       
      keyboard: true,
      navigation: { nextEl: '.prop-next', prevEl: '.prop-prev'},
      pagination: true,
      grabCursor: true,        
      loop: false,
      preloadImages: false,
      lazy: true,   
      breakpoints: {
        280: {
          slidesPerView: 1
        },
        600: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        }
      }
    }
  }

}
