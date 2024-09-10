import { MealType } from '../enums/mealType'

export interface Meal {
    id: string,
    name: string,
    neededFood: string[],
    optionalFood: string[],
    recipe: string,
    imageUrl: string,
    mealType: MealType
}
