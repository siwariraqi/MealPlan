import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  template: `
    <p>
      landing-page works!
    </p>
  `,
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
