import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  shareMe() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Iam sharing my recipe ingredients with you, Have Fun :)',
          url: 'http://localhost:4200/',
        })
        .then(() => {
          console.log('Thanks For Sharing!');
        })
        .catch(console.error);
    }
  }

}
