import { RecipeDetailed } from './recipe.dto';

export interface User{
    email;
    name;
    DietHistory?: Consumption[];
}

export interface Consumption {
    date;
    recipe: RecipeDetailed;
}