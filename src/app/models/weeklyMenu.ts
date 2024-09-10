import { Meal } from "./meal";

export interface WeeklyMenu {
    dayFoods: Meal[],
    nightFoods: Meal[]
}
