import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from '../../app.settings';
import { User } from '../../mealplan/models/User';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AdminService } from 'src/app/mealplan/services/admin.service';
import { Plan } from 'src/app/mealplan/models/Plan';
import { ChangePlanDialogComponent } from '../components/change-plan-dialog/change-plan-dialog.component';

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
    userId:number;
    public page:any;
    public settings: Settings;
    public maxSize:number = 5;
    public autoHide:boolean = true;
    constructor(
                 public dialog: MatDialog,
                public adminService:AdminService,
                public appSettings:AppSettings, 
                public usersService:UsersService
                ){
        this.settings = this.appSettings.settings; 
    }
   

    openDialog(userId:number) {
      const dialogRef = this.dialog.open(ChangePlanDialogComponent, {
        width: '250px',
        data: { userId: userId }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.getUsers();
      });
    }
  
  

    ngOnInit() {
        this.getUsers();  
        this.filteredUsers=this.users;
    }


    public getUsers() {
        this.adminService.getAllUsers().subscribe(users=>{
            this.users=users;  
            this.filteredUsers = users.filter(user => user.firstName.toLowerCase().includes(this.searchText.toLowerCase()));          
           });  
    }

    public deleteUser(userId:number){
        this.adminService.deleteUser(userId).subscribe(users =>this.getUsers());
    }

    public resetUser(userId:number){
        this.adminService.resetUser(userId).subscribe(users=>this.getUsers());
    }
    
    public changePlan(userId:number,planName:string){
        this.adminService.updateUserPlan(userId,planName).subscribe(users=>this.getUsers());
    }

    public changeUserRole (userId:number,isAdmin:boolean){
        this.adminService.changeRole(userId,isAdmin).subscribe(users=>this.getUsers());
        this.getUsers();
    }

    

    
    public addUser(user:User){
        // this.usersService.addUser(user).subscribe(user => this.getUsers());
    }
    public updateUser(user:User){
        // this.usersService.updateUser(user).subscribe(user => this.getUsers());
    }

    filteredUsers: any[] = [];

    onSearch() {
        if (this.searchText) {
          this.filteredUsers = this.users.filter(
            (user) =>
              user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
              user.lastName.toLowerCase().includes(this.searchText.toLowerCase())||
              user.email.toLowerCase().includes(this.searchText.toLowerCase())
          );
        } else {
          this.filteredUsers = this.users;
        }
      }

}

