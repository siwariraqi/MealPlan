import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from '../../app.settings';
import { User } from '../../mealplan/models/User';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AdminService } from 'src/app/mealplan/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ UsersService ]  
})
export class UsersComponent implements OnInit {


    public users: User[] ;
    public searchText: string = '';
    // public page:any;
    // public settings: Settings;
    // public maxSize:number = 5;
    // public autoHide:boolean = true;
    constructor(
                public adminService:AdminService,
                // public appSettings:AppSettings, 
                public dialog: MatDialog,
                // public usersService:UsersService
                ){
        // this.settings = this.appSettings.settings; 
    }

    ngOnInit() {
        this.getUsers();  
        
       
    }


    public getUsers() {
        this.adminService.getAllUsers().subscribe(users=>{
            this.users=users;            
           });  
    }

    
    public addUser(user:User){
        // this.usersService.addUser(user).subscribe(user => this.getUsers());
    }
    public updateUser(user:User){
        // this.usersService.updateUser(user).subscribe(user => this.getUsers());
    }
    // public deleteUser(user:User){
    //    this.usersService.deleteUser(user.id).subscribe(user => this.getUsers());
    // }


    // public onPageChanged(event:any){
    //     this.page = event;
    //     this.getUsers();
    //     window.scrollTo(0,0);
    //     // if(this.settings.fixedHeader){      
    //     //     document.getElementById('main-content').scrollTop = 0;
    //     // }
    //     // else{
    //     //     document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
    //     // }
    // }

    public openUserDialog(user:User | null){
        let dialogRef = this.dialog.open(UserDialogComponent, {
            data: user
        });

        dialogRef.afterClosed().subscribe(user => {
            if(!user){
                (user.id) ? this.updateUser(user) : this.addUser(user);
            }
        });
    }

}

