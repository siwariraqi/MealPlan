import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LockScreenComponent implements OnInit {
  public date:any = new Date();
  public timerInterval:any;
  public form!: UntypedFormGroup;
  constructor(public fb: UntypedFormBuilder, public router:Router) { }

  ngOnInit() {
    this.timerInterval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.form = this.fb.group({ 
      password: [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngAfterViewInit(){
    document.getElementById('preloader')?.classList.add('hide');
  }

  ngOnDestroy(){
    clearInterval(this.timerInterval);
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.router.navigate(['/']);
    }
  }

}
