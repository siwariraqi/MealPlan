import { Component, Input, OnInit } from '@angular/core';
import { AppSettings, Settings } from 'src/app/app.settings';

@Component({
  selector: 'app-header-video',
  templateUrl: './header-video.component.html',
  styleUrls: ['./header-video.component.scss']
})
export class HeaderVideoComponent implements OnInit {
  @Input('backgroundVideo') backgroundVideo:any; 
  @Input('contentOffsetToTop') contentOffsetToTop:boolean = false;
  @Input('contentMinHeight') contentMinHeight:any;
  @Input('title') title:any;
  @Input('desc') desc:any;
  @Input('isHomePage') isHomePage:boolean = false;
  @Input('fullscreen') fullscreen: boolean = false;
  public settings: Settings;
  constructor(public appSettings:AppSettings) { 
    this.settings = this.appSettings.settings;
    setTimeout(() => {
      this.settings.headerBgVideo = true;
    }); 
  }

  ngOnInit(): void {
    if(this.contentOffsetToTop){
      setTimeout(() => {
        this.settings.contentOffsetToTop = this.contentOffsetToTop;
      });
    } 
    var vid = <HTMLVideoElement> document.getElementById("bgVideo");
    vid.muted = true;
  }

  ngOnDestroy(){  
    setTimeout(() => {
      this.settings.headerBgVideo = false; 
      this.settings.contentOffsetToTop = false;
    });  
  }

}
