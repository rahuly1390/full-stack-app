import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent {
  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}
  model: any;

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') != null)
      this.recipeService
        .getRecipe(this.route.snapshot.paramMap.get('id'))
        .subscribe({
          next: (r) => (this.model = r),
          error: (e) => console.log(e),
        });
    else {
      this.model = { id: null, name: null, description: null };
    }
  }

  onSubmit(): void {
    if (this.model.id) {
      //save recipe
      this.recipeService.updateRecipe(this.model.id, this.model).subscribe({
        next: (r) => this.router.navigate(['/']),
        error: (e) => console.log(e),
      });
    } else {
      // update existing
      this.recipeService.createRecipe(this.model).subscribe({
        next: (r) => this.router.navigate(['/']),
        error: (e) => console.log(e),
      });
      this.router.navigate(['/']);
    }
  }
}
