import { RecipeDetailed } from './recipe.dto';

export interface User{
    email;
    name;
    height;
    weight;
    age;
    gender;
    activitylevel;
    DietHistory?: Consumption[];
}

export interface Consumption {
    date;
    recipe: RecipeDetailed;
}