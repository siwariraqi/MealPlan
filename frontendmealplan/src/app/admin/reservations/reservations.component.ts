import { Component, OnInit, ViewChild } from '@angular/core'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'time', 'guests', 'tableNumber', 'status.name', 'action', 'assignTable', 'view' ];
  dataSource!: MatTableDataSource<Reservation>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;  
  public statuses = [
    { id: 1, name: 'Approved' },
    { id: 2, name: 'Cancelled' }
  ];
  constructor(public appService:AppService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.appService.getReservations().subscribe((res:Reservation[]) => { 
      this.initDataSource(res);
    });  
  }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    (this.dataSource.sortingDataAccessor as any) = (data:any, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o:any, i:any) => o[i], obj);
  }

  public onStatusSelectionChange(event:any, reservation:Reservation){  
    if(event.value){ 
      const index: number = this.dataSource.data.indexOf(reservation);    
      if(index !== -1) { 
        this.dataSource.data.find(item => item.id == reservation.id)!.status = event.value;  
        this.initDataSource(this.dataSource.data);
        this.snackBar.open('Reservation status updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }  
    }
  }

  public onTableSelectionChange(event:any, reservation:Reservation){  
    if(event.value){ 
      const index: number = this.dataSource.data.indexOf(reservation);    
      if(index !== -1) { 
        this.dataSource.data.find(item => item.id == reservation.id)!.tableNumber = event.value;
        this.initDataSource(this.dataSource.data);
        this.snackBar.open('Table assigned successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 }); 
      }  
    }
  }


  public view(reservation:Reservation){
    const dialogRef = this.appService.openDialog(DetailsDialogComponent, reservation, 'theme-dialog');
    dialogRef.afterClosed().subscribe(data => {  
      if(data){ 
         
      } 
    }); 
  }

}
