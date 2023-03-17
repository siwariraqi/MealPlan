import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MenuItem } from 'src/app/app.models';
import { Meal } from 'src/app/mealplan/models/Meal';

@Component({
  selector: 'app-meal-items-details',
  templateUrl: './meal-items-details.component.html',
  styleUrls: ['./meal-items-details.component.scss']
})
export class MealItemsDetailsComponent implements OnInit {

  @Input ('mealItems') mealItems:Array<Meal>=[];
  public config: SwiperConfigInterface = {}; 
  constructor() { }
  ngOnInit() {
    console.log('aaaaaaaaaaaaaaaa')
    console.log(this.mealItems)
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
