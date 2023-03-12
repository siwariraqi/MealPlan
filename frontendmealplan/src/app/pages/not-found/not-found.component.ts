import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }

  ngAfterViewInit(){
    document.getElementById('preloader')?.classList.add('hide');    
  }

}