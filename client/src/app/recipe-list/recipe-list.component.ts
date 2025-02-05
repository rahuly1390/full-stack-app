import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  constructor(
    private recipeService:RecipeService
  ){}
  recipes:any;
  selectedRecipe? : any;

  ngOnInit(){
    this.recipeService.getRecipeList().subscribe({next:r => this.recipes = r, error:e =>console.log(e)});
  }
  // recipes = [
  //   { id: 1, name: 'Chocolate Chips Cookies', description:'Sugar,Flour,chocolate,chips etc.'},
  //   { id: 2, name: 'Wheat Bread', description:'Yeast,Flour,water etc.'},
  //   { id: 3, name: 'Apple Pie', description:'Apple Pie Filling , pie,crust etc.'},
// ];

onSelect(recipe:any):void{
  this.selectedRecipe = recipe;
}
onDelete(recipe:any):void{
  // this.recipes = this.recipes.filter(obj => obj.id != recipe.id);
  this.recipeService.deleteRecipe(recipe.id).subscribe({next:r => this.ngOnInit(), error:e =>console.log(e)});
}
}
