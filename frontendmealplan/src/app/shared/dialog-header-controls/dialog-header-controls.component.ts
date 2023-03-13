import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-header-controls',
  templateUrl: './dialog-header-controls.component.html',
  styleUrls: ['./dialog-header-controls.component.scss']
})
export class DialogHeaderControlsComponent implements OnInit {
  @Input('dialogRef') dialogRef:any;
  @Input('showFullscreenIcon') showFullscreenIcon:boolean = true; 
  public isFullScreen:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public toggleFullScreen(){
    this.isFullScreen = !this.isFullScreen;
    if(this.isFullScreen){
      this.dialogRef.addPanelClass('fullscreen');
      document.getElementsByTagName('html')[0].style.overflowY = "hidden"; 
    }
    else{
      this.dialogRef.removePanelClass('fullscreen'); 
      (document.getElementsByTagName('html')[0] as any).style.overflowY = null; 
    } 
  }

  public close(){  
    this.dialogRef.close(); 
    (document.getElementsByTagName('html')[0] as any).style.overflowY = null; 
  }

}
