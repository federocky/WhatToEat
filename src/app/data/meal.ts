import { Meal } from '../models/meal';

export let meals: Meal[] = 
[
  {
    name: 'pasta bolo',
    neededFood: ['pasta', 'tomate frito'],
    optionalFood: ['cebolla', 'pimiento', 'zanahoria']
  },
  {
    name: 'arroz cubana',
    neededFood: ['arroz', 'tomate frito', 'huevo'],
    optionalFood: ['cebolla', 'pimiento', 'zanahoria']
  },
  {
    name: 'curry',
    neededFood: ['arroz', 'leche coco', 'zanahoria'],
    optionalFood: ['cebolla', 'pimiento']
  }
];