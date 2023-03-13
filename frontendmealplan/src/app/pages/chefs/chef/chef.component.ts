import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.scss']
})
export class ChefComponent implements OnInit {
  private sub: any;
  public chef:any;
  public menuItems: MenuItem[] = [];
  constructor(private activatedRoute: ActivatedRoute, public appService:AppService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {  
      this.getChefById(params['id']); 
      this.getMenuItems(); 
    });
  }

  public getChefById(id:any){
    this.chef = this.appService.getChefs().find(chef=> chef.id == id); 
  }

  public getMenuItems(){
    this.appService.getMenuItems().subscribe(data=>{
      this.menuItems = this.appService.shuffleArray(data).slice(0, 12); 
    });
  } 

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


}
