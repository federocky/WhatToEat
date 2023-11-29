export interface FoodCategory {
    id: string,
    name: string,
    food: Food[]
}

export interface Food {
    name: string,
    selected: boolean
}
