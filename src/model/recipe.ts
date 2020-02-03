import { Comment } from './comment';
import { Ingredient } from './ingredient';
import { Step } from './step';
import { User } from './User';

export class Recipe {
  recipeID: number;
  category: string; // default 'plat', enum of ['aperitif', 'autre', 'boisson', 'dessert', 'entree', 'plat']
  title: string;
  prepPeriod: string; // default '0 min'
  cookPeriod: string; // default '0 min'
  restPeriod: string; // default '0 min'
  nbPeople: number; // default 1
  nbPeopleUnit: string; // default 'Pers.', enum of ['Pers.', 'Pièces']
  mark: number; // default 0
  nbMark: number; // default 0
  calories: number; // default 0
  spicy: number; // default 0 (between 0 and 3)
  meatClass: string; // default '', enum of ['', 'boeuf', 'boeufporc', 'canard', 'crustace', 'moutonpoulet', 'poisson', 'porc', 'porccrustace', 'porcpoisson', 'poulet', 'pouletcrustace', 'pouletporc', 'vegetable']
  chiefTrick: string; // default "Aucune astuce !"
  comments: Array<Comment>;
  ingredients: Array<Ingredient>;
  steps: Array<Step>;
  tags: Array<string>;
  video: boolean;
  help: string;
  validatedBy: Array<User>;
  deletedBy: Array<User>;
}