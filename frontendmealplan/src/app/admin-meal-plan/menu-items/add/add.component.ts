import { T } from '@angular/cdk/keycodes';
import { Component,OnInit} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MealDTO } from 'src/app/mealplan/models/MealDTO';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  mealDTO:MealDTO=new MealDTO();
  units = ['oz', 'teaspoon', 'cup', 'tablespoon', 'slice', 'lb', 'handful', 'punnet'];
  categories = ['Meat', 'Dairy', 'Fruit', 'Vegetables', 'Others']; 
  dietTypes = ['GLUTEN FREE', 'DAIRY FREE', 'KETO FRIENDLY', 'VEGAN FRIENDLY'];
  plans=['Freemium','Basic','Premium'];
  types=['Breakfast','Lunch','Dinner','Snack']
  dayNumbers=[8,9,10,11];
  selectedDietTypes: string[] = [];
  ingredients = [];
  dayPlanTypes=[];

  productName :string='';
  amount:number=null;
  unit :string=null;
  category :string='';

  plan:string='';
  dayNumber:number=null;
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
  imageUrl: string;

  isOvernightCooking: boolean = false;
  isOvernightPreparing:boolean=false


  constructor() {}

  ngOnInit(): void {   
  }

  updateCookTime(){
    this.CookTime='Overnight';
  }

  addIngredient() {
    const ingredient = { productName: this.productName, amount: this.amount, unit: this.unit, category: this.category };
    if(ingredient.productName!==''&&ingredient.category!=='')
    this.ingredients.push(ingredient);
    this.productName = '';
    this.amount = null;
    this.unit = '';
    this.category = '';
}

removeIngredient(index: number) {
  this.ingredients.splice(index, 1);
}


addDay() {
  const dayPlanType={plan:this.plan,dayNumber:this.dayNumber,type:this.type}
  if(dayPlanType.plan!==''&&dayPlanType.dayNumber!==null &&dayPlanType.type!=='')
  this.dayPlanTypes.push(dayPlanType);
  this.plan='';
  this.dayNumber=null;
  this.type='';
}


removeDay(index:number){
 this.dayPlanTypes.splice(index,1)
}


addTips(){ 
  if(this.Tip!=='')
  {
  this.Tips.push(this.Tip)
  this.TipsDB=this.TipsDB+'<li>'+this.Tip+'</li>'
  }
}

removeTips(index:number){
 this.Tips.splice(index,1);
}


addInstruction(){
if(this.instruction!=''){
this.instructions.push(this.instruction);
this.instuctionsDB=this.instuctionsDB+'<li>'+this.instruction+'</li>';
}
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
  this.TipsDB=this.TipsDB+'</ul>';
  this.instuctionsDB=this.instuctionsDB+'</ul>';

  if(this.isOvernightCooking) 
  this.CookTime='Overnight';
  if(this.isOvernightPreparing)
  this.PrepareTime='Overnight';

  if (this.MealName && this.PrepareTime && this.CookTime && this.Calories && this.Fat && this.Protien && this.Carbs && this.Fibre && this.dietTypes?.length && this.instuctionsDB && this.ingredients?.length && this.TipsDB && this.imageUrl && this.dayPlanTypes?.length) {
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
  this.mealDTO.dayMealDTO=this.dayPlanTypes;
  console.log(this.mealDTO);
  this.MealName=''; this.PrepareTime='';this.CookTime='';this.Calories=null;this.Fat=null;
  this.Protien=null;this.Carbs=null;this.Fibre=null;this.dietTypes=[];
  this.ingredients=[];this.imageUrl='';this.dayPlanTypes=[];
  this.isOvernightCooking=false;this.isOvernightPreparing=false;
   this.Tip='';this.instruction='';
  this.fileChange('');
  }
}



  



} 




