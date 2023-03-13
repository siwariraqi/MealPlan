import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Settings, AppSettings } from '../../app.settings';

@Component({
  selector: 'app-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrls: ['./header-carousel.component.scss'] 
})
export class HeaderCarouselComponent implements OnInit {
  @Input('slides') slides: Array<any> = [];
  @Input('contentOffsetToTop') contentOffsetToTop:boolean = false; 
  @Input('fullscreen') fullscreen: boolean = true; 
  public config: SwiperConfigInterface = {};  
  public currentSlide:any; 
  public settings: Settings;
  constructor(public appSettings:AppSettings) { 
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    if(this.contentOffsetToTop){
      setTimeout(() => {
        this.settings.contentOffsetToTop = this.contentOffsetToTop;
      });
    } 
  }

  ngAfterViewInit(){    
    this.initCarousel();
  }

  ngOnChanges(){
    if(this.slides.length > 0){
      this.currentSlide = this.slides[0];  
    }
  }

  public initCarousel(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,         
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,        
      loop: true,
      preloadImages: false,
      lazy: true,     
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }
  }

  ngOnDestroy(){  
    setTimeout(() => {
      this.settings.contentOffsetToTop = false;
    });  
  }
  
  public onIndexChange(index: number) {  
    this.currentSlide = this.slides[index];
  }
}