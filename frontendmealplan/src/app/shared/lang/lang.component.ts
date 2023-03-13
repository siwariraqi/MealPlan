import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {  
  constructor(public translateService: TranslateService) { }

  ngOnInit() { } 

  public changeLang(lang:string){ 
    this.translateService.use(lang);   
  } 

}
