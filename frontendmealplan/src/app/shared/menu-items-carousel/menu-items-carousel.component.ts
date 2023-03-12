import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MenuItem } from 'src/app/app.models';

@Component({
  selector: 'app-menu-items-carousel',
  templateUrl: './menu-items-carousel.component.html',
  styleUrls: ['./menu-items-carousel.component.scss']
})
export class MenuItemsCarouselComponent implements OnInit {
  @Input('menuItems') menuItems: Array<MenuItem> = [];
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
