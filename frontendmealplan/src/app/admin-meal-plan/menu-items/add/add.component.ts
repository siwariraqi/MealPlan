import { Component,ElementRef,OnInit, ViewChild} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { DayNumberDTO } from 'src/app/mealplan/models/DayNumberDTO';
import { IngredientDTO } from 'src/app/mealplan/models/IngredientDTO';
import { MealDTO } from 'src/app/mealplan/models/MealDTO';
import { AdminService } from 'src/app/mealplan/services/admin.service';
import { RecipesService } from 'src/app/mealplan/services/recipes.service';
import { ImageUploadComponent } from 'src/app/shared/image-upload/image-upload.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('imageUpload') imageUpload: ImageUploadComponent;

  @ViewChild('mealNameInput') 
  mealNameInput: ElementRef;
  mealDTO:MealDTO=new MealDTO();
  units = [];
  categories = []; 
  dietTypes = [];
  plans=['Freemium','Basic','Premium'];
  types=['Breakfast','Lunch','Dinner','Snack']
  dayNumbers=[];
  selectedDietTypes: string[] = [];
  ingredients :IngredientDTO[]=[];
  dayPlanTypes=[];
  returnDayNumber=[];

  productName :string='';
  amount:number=null;
  unit :string='';
  category :string='';

  plan:string='';
  dayNumber:DayNumberDTO;
  type:string='';

  Tip:string='';
  instruction:string='';
  instructions=[];
  Tips=[];
  TipsDB:string='<ul>';
  instuctionsDB:string='<ul>';
  
  
  MealName:string;
  CookTime:string;
  PrepareTime:string;
  Calories:number;
  Fat:number;
  Protien:number;
  Carbs:number;
  Fibre:number;
  imageUrl: string='';

  isOvernightCooking: boolean = false;
  isOvernightPreparing:boolean=false

  isSubmitted=false;

  isEdit=false;

  mealId:number;
  constructor(private router: Router,private route: ActivatedRoute,private adminService:AdminService, public snackBar: MatSnackBar,private recipesService:RecipesService) {}


  ngOnInit(): void {
    this.getEditMealId();
    this.getDietTypes();
    this.getCategories();
    this.getUnits();
    // this.imageUrl='assets/images/others/noimage.png'
  }

  public getCategories(){
    this.recipesService.getMealCategories().subscribe(categories=>{
      this.categories = categories;
    })
  }
  public getDietTypes() {
    this.recipesService.getDietTypesApi().subscribe(types => {
      this.dietTypes = types;
      console.log(this.dietTypes);
    });
  }

  public getUnits(){
    this.recipesService.getUnits().subscribe(units=>{
      this.units = units;
    })
  }


  isSubmitted3=true
  addIngredient() {
    this.isSubmitted=true; 
    const ingredient = { productName: this.productName, amount: this.amount, unit: this.unit, category: this.category };
    if(ingredient.productName!==''&&ingredient.category!==''){
    this.ingredients.push(ingredient);
    this.isSubmitted3=true
  }else{
    this.isSubmitted3=false;
  }
    this.productName = '';
    this.amount = null;
    this.unit = '';
    this.category = '';
}

removeIngredient(index: number) {
  this.ingredients.splice(index, 1);
}
isSubmitted4=true
addDay() {
  this.isSubmitted=true; 
   const dayPlanType={plan:this.plan,dayNumber:this.dayNumber,type:this.type}
  if(dayPlanType.plan!==''&&dayPlanType.dayNumber!==null &&dayPlanType.type!==''){
  this.returnDayNumber.push({plan:this.plan,dayNumber:this.dayNumber.dayNumber,type:this.type});
  this.dayPlanTypes.push(dayPlanType);
  this.isSubmitted4=true
}else{
  this.isSubmitted4=false;
}
  this.plan='';
  this.dayNumber=null;
  this.type='';

}


removeDay(index:number){
 this.dayPlanTypes.splice(index,1)
}

isSubmitted2=true
addTips(){ 
   this.isSubmitted=true; 
  if(this.Tip!=='')
  {
  this.Tips.push(this.Tip)
  this.TipsDB=this.TipsDB+'<li>'+this.Tip+'</li>'
  this.isSubmitted2=true
}else{
  this.isSubmitted2=false;
}
  this.Tip='';

}

removeTips(index:number){
  
 this.Tips.splice(index,1);
}

isSubmitted1=true;
addInstruction(){ 
this.isSubmitted=true; 
if(this.instruction!=''){
this.instructions.push(this.instruction);
this.instuctionsDB=this.instuctionsDB+'<li>'+this.instruction+'</li>';
this.isSubmitted1=true
}else{
  this.isSubmitted1=false;
}
this.instruction='';

}

removeInstruction(index:number){
  this.instructions.splice(index,1)
}



onCheckboxChange(event: MatCheckboxChange, dietType: string) {
  if (event.checked) {
    this.selectedDietTypes.push(dietType);
  } else {
    this.selectedDietTypes = this.selectedDietTypes.filter((dt) => dt !== dietType);
  }
}

public fileChange(files:any){ 
  if(files.length){ 
    this.imageUrl=files[0].content;
  } 
  else{
    this.imageUrl=''; 
  }
} 


OnSubmit() {
  if(this.isEdit){
    this.editMealFromDB(this.mealId);
  }
  else{
  this.TipsDB=this.TipsDB+'</ul>';
  this.instuctionsDB=this.instuctionsDB+'</ul>';
  if(this.isOvernightCooking) 
  this.CookTime='Overnight';
  if(this.isOvernightPreparing)
  this.PrepareTime='Overnight';
  else{
    this.CookTime+' min';
    this.PrepareTime+ ' min';
  }
  if (this.MealName && this.PrepareTime && this.CookTime && this.Calories && this.Fat && this.Protien && 
    this.Carbs && this.Fibre && this.selectedDietTypes?.length  && this.ingredients?.length && this.TipsDB 
    && this.imageUrl ) {
  this.mealDTO.mealName = this.MealName;
  this.mealDTO.prepareTime = this.PrepareTime;
  this.mealDTO.cookTime = this.CookTime;
  this.mealDTO.calories = this.Calories;
  this.mealDTO.fat = this.Fat;
  this.mealDTO.protein = this.Protien;
  this.mealDTO.carbs = this.Carbs;
  this.mealDTO.fibre = this.Fibre;
  this.mealDTO.dietTypes=this.selectedDietTypes;
  this.mealDTO.instructions = this.instuctionsDB;
  this.mealDTO.tips = this.TipsDB;
  this.mealDTO.ingredients = this.ingredients; 
  this.mealDTO.imageUrl=this.imageUrl;
  this.mealDTO.dayMealDTOList=this.returnDayNumber;
  this.addMeal(this.mealDTO);
  this.isSubmitted=true; 
  }else{
    this.isSubmitted=false; this.isSubmitted1=false; this.isSubmitted2=false;this.isSubmitted3=false;this.isSubmitted4=false;
    this.snackBar.open("Insert all needed information!", "×", {
      panelClass: "error",
      verticalPosition: "bottom",
      duration: 5000,
    });  
  }
}
}

addMeal(mealDTO:MealDTO){
  this.adminService.addMeal(mealDTO).subscribe(response => {
    this.resetAll();
    this.snackBar.open("Meal Added successfully!", "×", {
      panelClass: "success",
      verticalPosition: "bottom",
      duration: 7000,
    }); 
  }, error => {
    this.snackBar.open(error.error, "×", {
      panelClass: "error",
      verticalPosition: "bottom",
      duration: 5000,
    }); 
  }
  
  );
} 

planSelection(){
  this.adminService.getDayNumbers(this.plan).subscribe(dayNumbers => {
    this.dayNumbers = dayNumbers.sort((a, b) => a.dayNumber - b.dayNumber);
  })
}

daySelection(){
  this.types = this.dayNumber.mealTimeList;
  }

  resetAll(){
    this.mealDTO=new MealDTO();
    this.MealName=''; this.PrepareTime='';this.CookTime='';this.Calories=null;this.Fat=null;
    this.Protien=null;this.Carbs=null;this.Fibre=null;this.selectedDietTypes=[];
    this.ingredients=[];this.dayPlanTypes=[];this.returnDayNumber=[];
    this.isOvernightCooking=false;this.isOvernightPreparing=false;
     this.Tip='';this.instruction='';this.Tips=[];this.ingredients=[];this.instructions=[];
        if (this.imageUpload) {
      this.imageUpload.deleteImage();
    }
    
  }





  checkOverNight(){
    if(this.CookTime == 'Overnight')
    {
    this.isOvernightCooking=true;
    }
   else{this.CookTime = this.meal.cookTime.replace(' min', '');}
   
   if(this.PrepareTime == 'Overnight'){
    this.isOvernightPreparing = true;
   }else{this.PrepareTime = this.meal.prepareTime.replace(' min', '');}
   
  }

   extractListItems(html: string) {
    const regex = /<li>(.*?)<\/li>/g;
    const matches = html.match(regex);
    if (!matches) {
      // Check for empty <ul></ul> tag
      if (/<ul>\s*<\/ul>/.test(html)) {
        return [];
      } else {
        throw new Error('Invalid HTML: <ul> tag does not contain any <li> tags');
      }
    }
    return matches.map((match) => match.replace(/<\/?li>/g, ''));
  }

  

  
  getEditMealId(){
    this.route.paramMap.subscribe(params => {
      this.mealId =Number(params.get('id'));
      if(this.mealId !== 0){
        this.isEdit=true; 
        this.getMealForEdit(this.mealId); 
        }
    });
   
  }


  meal:MealDTO
  getMealForEdit(mealId:number){
    this.adminService.getMealDTO(mealId).subscribe(meal => {
      this.meal=meal;
       this.editMealInformation();
    });
    }

  editMealInformation(){
    this.imageUrl=this.meal.imageUrl;
    console.log(this.imageUrl)
    this.MealName=this.meal.mealName;
    this.CookTime=this.meal.cookTime;
    this.PrepareTime=this.meal.prepareTime;
    this.checkOverNight();
    this.Calories=this.meal.calories;
    this.Fat=this.meal.fat;
    this.Protien=this.meal.protein;
    this.Carbs=this.meal.carbs;
    this.Fibre=this.meal.fibre;
    this.selectedDietTypes=this.meal.dietTypes
    this.instructions=this.extractListItems(this.meal.instructions);
    // this.addInstruction();

    this.Tips=this.extractListItems(this.meal.tips);
    this.ingredients=this.meal.ingredients;
    
    // this.addTips();
   }


   editMealFromDB(mealId:number){
    this.mealDTO.imageUrl=this.imageUrl;
    console.log(this.mealDTO.imageUrl)
    this.mealDTO.prepareTime = this.PrepareTime;
    this.mealDTO.cookTime = this.CookTime ;
    if(this.mealDTO.cookTime !=='Overnight'){
      this.mealDTO.cookTime =this.mealDTO.cookTime+' min';}
    if(this.mealDTO.prepareTime !=='Overnight'){
    this.mealDTO.prepareTime = this.mealDTO.prepareTime + ' min'}
    if(this.isOvernightCooking)
    {this.mealDTO.cookTime='Overnight';}
    if(this.isOvernightPreparing)
    {this.mealDTO.prepareTime='Overnight';}
    this.mealDTO.mealName = this.MealName;
    this.mealDTO.calories = this.Calories;
    this.mealDTO.fat = this.Fat;
    this.mealDTO.protein = this.Protien;
    this.mealDTO.carbs = this.Carbs;
    this.mealDTO.fibre = this.Fibre;
    this.mealDTO.dietTypes=this.selectedDietTypes;
    this.mealDTO.instructions = this.createListItems(this.instructions);
    this.mealDTO.tips =this.createListItems(this.Tips);
    this.mealDTO.ingredients = this.ingredients; 
    this.mealDTO.dayMealDTOList=this.returnDayNumber;
    console.log(this.mealDTO)
    this.adminService.editMealDTO(this.mealDTO,mealId).subscribe(response => {
      this.resetAll();
      let snackBarRef = this.snackBar.open("Meal Edited successfully!", "×", {
        panelClass: "success",
        verticalPosition: "bottom",
        duration: 7000,
      });
      snackBarRef.afterOpened().pipe(
        delay(2000)
      ).subscribe(() => {
        this.router.navigate(['/adminside/meal-items/list'])
      });
    }, error => {
      this.snackBar.open(error.error, "×", {
        panelClass: "error",
        verticalPosition: "bottom",
        duration: 3000,
      }); 
    }
    
    );
    
  }

   createListItems(instructions: any[]) {
    const listItems = instructions.map((instruction) => `<li>${instruction}</li>`);
    const list = `<ul>${listItems.join('')}</ul>`;
    return list;
  }
  

}
