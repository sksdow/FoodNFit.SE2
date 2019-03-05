export interface Recipe{
    id;
    description: string;
    ingredients: Ingredients[];
}

export interface Ingredients {
    description: string;
    amount: string;
}