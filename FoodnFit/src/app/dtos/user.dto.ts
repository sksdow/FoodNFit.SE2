import { RecipeDetailed } from './recipe.dto';

export interface User{
    email;
    name;
    weight;
    DietHistory?: Consumption[];
}

export interface Consumption {
    date;
    recipe: RecipeDetailed;
}