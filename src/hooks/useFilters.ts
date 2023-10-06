import {Recipe} from "../components/RecipeCard/types";

export const useFilters = (recipes: Recipe[], showMyRecipes: boolean, tags: string[], userId: string, searchTerm: string) => {
    let newRecipes = recipes ?? [];
    if (showMyRecipes) {
        newRecipes = newRecipes.filter((recipe: Recipe) => recipe.authorId === userId)
    }
    if (tags.length > 0) {
        newRecipes = newRecipes.filter((recipe: Recipe) => recipe.tags.some((tag: string) => tags.includes(tag)))
    }

    if (searchTerm.length > 0) {
        newRecipes = newRecipes.filter((recipe: Recipe) => searchTerm.toLowerCase().split(' ').every(letter => recipe.title.toLowerCase().includes(letter)))
    }

    return {recipes: newRecipes}
}
