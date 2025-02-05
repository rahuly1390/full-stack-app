package com.pluralsight.recipe.controllers;

import com.pluralsight.recipe.models.Recipe;
import com.pluralsight.recipe.repositories.RecipeJpaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/recipes")
public class RecipeRestController {
    @Autowired
    private RecipeJpaRespository jpaRespository;
    @GetMapping("")
    public List<Recipe> listRecipes(){
        return  jpaRespository.findAll();
    }
    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id){
        return jpaRespository.getReferenceById(id);
    }
    @PostMapping("")
    public Recipe createRecipe(@RequestBody Recipe recipe){
        return  jpaRespository.save(recipe);
    }
    @PutMapping("/{id}")
    public Recipe updateRecipe(@RequestBody Recipe recipe,@PathVariable Long id){
        Recipe r = jpaRespository.getReferenceById(id);
        r.setName(recipe.getName());
        r.setDescription(recipe.getDescription());
        return jpaRespository.save(r);
    }
    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id){
        jpaRespository.deleteById(id);
    }
}
