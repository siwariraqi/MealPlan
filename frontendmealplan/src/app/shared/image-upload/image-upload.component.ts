import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';  
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input('base64') base64:string = ''; 
  @Input('fileSize') fileSize = 500;  
  @Input('acceptTypes') acceptTypes:any; 
  @Output() onFileChange: EventEmitter<any> = new EventEmitter(); 
  @Output() onFileUploadClick: EventEmitter<any> = new EventEmitter();
  public files:any[] = [];  

  constructor(public appService:AppService) { } 

  ngOnInit(): void {  
    if(this.base64){ 
      this.files.push({
        name: 'image-' + new Date().getDate, 
        content: this.base64,
        size: null
      })
    } 
  }
 

  public fileChange(input:any){  
    if(input.files.length){
      for (var i = 0; i < input.files.length; i++){
        const reader = new FileReader(); 
        if (input.files[i].size / 1024 > this.fileSize) {  
          const message = this.appService.getTranslateValue('MESSAGE.FILE_SIZE', this.fileSize.toString()); //'The file size cannot exceed '+this.fileSize.toString()+' kb.';
          let dialogRef = this.appService.openAlertDialog(message!); 
          dialogRef.afterClosed().subscribe(dialogResult => {
            this.clearInput();  
          });  
        } 
        else {  
          let name = input.files[i].name;
          let size = input.files[i].size; 
          reader.readAsDataURL(input.files[i]);
          reader.onload = () => {  
            var img = new Image(); 
            img.onload = () => { 
              // console.log(img.width + " " + img.height);
              // if(img.width > 300){ 
              //   const message = 'The size of the image should be 300x300!';
              //   let dialogRef = this.appService.openAlertDialog(message);             
              // }
              // else{
              //   this.files.push({
              //     "name": name, 
              //     "size": size, 
              //     "content": reader.result 
              //   }); 
              //   this.onFileChange.emit(this.files);  
              // }
              this.files.push({
                "name": name, 
                "size": size, 
                "content": reader.result 
              }); 
              this.onFileChange.emit(this.files);  
            }; 
            img.src = reader.result as string; 
          } 
        }  
      }
    }  
  }
   
  public fileUploadClick(){ 
    this.onFileUploadClick.emit();
  }

  public clearInput(){
    if(this.files.length == 0){  
      if(document.getElementById('singleFileUploader')){ 
        (<HTMLInputElement>document.getElementById('singleFileUploader')).value = ''; 
      }
    }  
  } 

  public deleteFile() {  
    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
    let dialogRef = this.appService.openConfirmDialog('', message!);
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.files.length = 0;          
        this.onFileChange.emit(this.files);
        this.clearInput();   
      }
    });  
  }  

}
