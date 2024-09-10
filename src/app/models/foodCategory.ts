import { Food } from "./food";

export interface FoodCategory {
    id: string,
    name: string,
    food: Food[]
}
