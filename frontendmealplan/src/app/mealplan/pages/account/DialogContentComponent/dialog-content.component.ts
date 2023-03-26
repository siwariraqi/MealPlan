import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dialog-content',
    templateUrl: './dialog-content.component.html',
    styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogContentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) {}

    onConfirmClick(): void {
        this.dialogRef.close('confirm');
    }

    onCancelClick(): void {
        this.dialogRef.close('cancel');
    }
}