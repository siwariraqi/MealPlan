import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public form!: UntypedFormGroup;
  private sub: any;
  public id:any;
  public showImage:boolean = false;

  constructor(public appService:AppService, 
              public formBuilder: UntypedFormBuilder, 
              private activatedRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object) 
              {
                this.formGroup = new FormGroup({
                  name: new FormControl('', Validators.required),
                  weight: new FormControl('', Validators.required),
                  unit:new FormControl('',Validators.required),
                  category:new FormControl('',Validators.required)
                });

                this.ingredientName = '';
                this.isChecked = false;
               
               }

  ngOnInit(): void {  
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      weight: ['', Validators.required],
      unit: ['', Validators.required],
      category: ['', Validators.required],
      // add other form controls here
    });


    this.form = this.formBuilder.group({ 
      "id": 0,
      "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      "description": null,
      "price": [null, Validators.required ], 
      "image": null, 
      "discount": null, 
      "availibilityCount": null, 
      "weight": null,
      "isVegetarian": false,
      "categoryId": [null, Validators.required ]   
    }); 
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.id = params['id'];
        this.getMenuItemById(); 
      } 
      else{
        this.showImage = true;
      }
    }); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  } 
 
  public getMenuItemById(){
    this.appService.getMenuItemById(this.id).subscribe((menuItem:MenuItem)=>{ 
      this.form.patchValue(menuItem); 
      if (isPlatformBrowser(this.platformId)) {
        this.appService.convertImgToBase64(menuItem.image.medium, (dataUrl:string) => { 
          this.showImage = true;
          this.form.controls.image.patchValue(dataUrl.toString());
        }) 
      }  
    });
  }

  public fileChange(files:any){ 
    // console.log(files)
    if(files.length){
      this.form.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.form.controls.image.patchValue(null); 
    }
  } 

  public onSubmit(){
    // console.log(this.form.value);
  }  
  foodCategories = [  { value: 'Meat', label: 'Meat' },  { value: 'Dairy', label: 'Dairy' },  { value: 'Fruit', label: 'Fruit' },  { value: 'Vegetables', label: 'Vegetables' },  { value: 'Others', label: 'Others' },];
  unitOptions = [  { value: 'oz', label: 'oz' },  { value: 'teaspoon', label: 'teaspoon' },  { value: 'cup', label: 'cup' },  { value: 'tablespoon', label: 'tablespoon' },  { value: 'slice', label: 'slice' },  { value: 'lb', label: 'lb' },  { value: 'handful', label: 'handful' },  { value: 'punnet', label: 'punnet' },];


  formGroup: FormGroup;

  ingr: { name: string, weight: number,unit:string,category:string }[] = [];
  selectedUnit: string;
  selectedCategory: string;

  addIngredient(): void {
    const name = this.formGroup.get('name').value;
    const weight = this.formGroup.get('weight').value;
    const unit = this.selectedUnit;
    const category = this.selectedCategory;
    const ingredient = `${weight}-${name}-${unit} (${category})`; // format the ingredient string
    this.ingr.push({ name, weight, unit, category });
    console.log(this.ingr);
    this.formGroup.reset(); // reset the form after adding the ingredient
    this.ingredientName = ingredient; // set the formatted ingredient string
    this.isChecked = false; // uncheck the checkbox (if any)
}


  ingredientName: string;
  isChecked: boolean;


} 