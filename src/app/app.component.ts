import { Component, HostListener, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { User } from '../model/user';
import { RecipesService } from './service/recipes.service';
import { UsersService } from './service/users.service';
import uniq from 'lodash-es/uniq';

const RECIPE_ITEM_WIDTH: number = 176;
const RECIPE_ITEM_HEIGHT:number = 203;
let recipesHeightDispo: number = 0;
let recipesWidthDispo: number = 0;
let nbMaxRecipesByPage: number = 0;
let recipes: any = [];
let searchItems = {
  query: [],
  in: [],
  out: [],
  calories: 0,
  dureeMax: 0
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  resize(event) {
    recipesWidthDispo = event.target.innerWidth - (266 + ((this.user === null) ? 0 : 40));
    recipesHeightDispo = event.target.innerHeight - 128;
    // Update the totalPages & the slice pipe
    this.updateTotalPages();
  }

  currentCategory: string = "all";
  currentPage: number = 1;
  currentRecipe: Recipe | null = null;
  deltaPerson: number = 0;
  editionMode: boolean = false;
  inShopping: boolean = false;
  notifs: Array<any> = [];
  openHelp: boolean = false;
  openRecipeForm: boolean = false;
  openShoppingList: boolean = false;
  openUserForm: boolean = false;
  query: string = "";
  recipesDisplayed: any = [];
  shoppingItems: Array<any> = [];
  totalPages: number = 1;
  user: User | null = null;
  start: number;
  end: number;
  filters: any = {
    'onlyValidated': false,
    'onlyNew': false,
    'onlyDislike': false,
    'hot': false,
    'hotMin': 0,
    'hotMax': 3,
    'star': false,
    'starMin': 0,
    'starMax': 5
  };
  nextID: number = 0;
  showSpinnerRecipesZone = true;
  units: Array<string> = [];

  constructor(private recipesService: RecipesService, private usersService: UsersService){
    this.recipesService.getAllRecipes().subscribe((data) => {
      recipes = data;
      this.setUnits(recipes);
      this.nextID = recipes[recipes.length - 1].recipeID + 1;
      this.recipesDisplayed = recipes;
      this.updateTotalPages();
      this.showSpinnerRecipesZone = false;

      window.onpopstate = (event) => {
        if(event.state && event.state.page) this.goTo(~~event.state.page, false);

        else if(event.state && event.state.recipe) this.showRecipe(~~event.state.recipe, false);
      };

    });
  }

  ngOnInit(){
    recipesWidthDispo = window.innerWidth - (266 + ((this.user === null) ? 0 : 40));
    recipesHeightDispo = window.innerHeight - 128;
  }

  /*********** CART ***********/

  addToCart(){
    if(this.currentRecipe === null) return;
    // Add each ingredients of the current recipe into the user's cart
    this.user.cart = this.groupIngredients(this.user.cart, this.currentRecipe.ingredients);
    this.shoppingItems = this.user.cart;

    this.usersService.updateUser(this.user.login, this.user)
      .subscribe(
        (data) => {
          this.user = data;
          this.addNotif(`Your cart is updated with success !`, "success");
        },(error) => {
          this.addNotif(error, "error");
        });
  }

  checkShoppingItem(name){
    this.user.cart = this.user.cart.map((e) => {
      e.checked = (e.checked || (e.ingredient === name));
      return e;
    });
    this.shoppingItems = this.user.cart;
  }

  cleanShoppingList(){
    this.user.cart = this.user.cart.filter((e) => !e.checked);
    this.shoppingItems = this.user.cart;
  }

  clearShoppingList(){
    this.user.cart = [];
    this.shoppingItems = [];
    this.usersService.updateUser(this.user.login, this.user)
      .subscribe(
        (data) => {
          this.user = data;
          this.addNotif(`Your cart is cleared with success !`, "success");
        },(error) => {
          this.addNotif(error, "error");
        });
  }

  groupIngredients = (ingredients, newIngredients) => {
    for(let i=0; i<newIngredients.length; i++){
      const position = ingredients.findIndex((ing) => (ing.ingredient === newIngredients[i].ingredient) && (ing.unit === newIngredients[i].unit))
      if((position > -1) && (ingredients.unit !== "")){
        ingredients[position].quantity = Number(ingredients[position].quantity) + Number(newIngredients[i].quantity);
        ingredients[position].checked = false;
      }
      else {
        ingredients.push({ ...newIngredients[i], checked: false});
      }
    }

    return ingredients;
  }

  /****************************/

  /*********** NOTIF **********/

  addNotif(text, state){
    this.notifs.push({text, state});
    let timer = window.setTimeout(() => { this.removeNotif()}, 5000);
  }

  removeNotif = () => { this.notifs.shift() };

  /*****************************/

  /************ RECIPE **********/

  // ADD
  addRecipe(recipe){
    this.recipesService.createRecipe({recipe}).subscribe(
      (res) => {
        this.addNotif("Recipe created", "success");
        this.closeRecipeForm();
        // add the new recipe into the recipes
        recipes.push(res);
        // update the displayed recipes
        this.updateRecipesDisplayed();
        this.nextID += 1;
      },
      (error) => { this.addNotif("Problem during the recipe creation", "error")});
  }

  // REMOVE
  deleteRecipe = (id) => {
    if(this.user === null){
      this.addNotif("First you log in and then you can delete ;)", "error");
      return;
    }

    const recipeToDelete = recipes.find((r) => r.recipeID === id);

    const needToAdd = !recipeToDelete.deletedBy.includes(this.user._id);
    if(needToAdd) recipeToDelete.deletedBy.push(this.user._id);
    else {
      const position = recipeToDelete.deletedBy.findIndex((userID) => userID === this.user._id);
      if(position > -1) recipeToDelete.deletedBy.splice(position, 1);
    }
    this.updateRecipeField(["deletedBy"], [this.user._id], needToAdd ? "add" : "remove", id);
  };

  // UPDATE
  updateRecipeField(fields, values, action: string = "replace", recipeID = -1){
    if(this.currentRecipe !== null) recipeID = this.currentRecipe.recipeID;
    const dataToSend = {fields, values, action};
    this.recipesService.updateRecipe(recipeID, dataToSend).subscribe((data) => {
      // recipe is updated, change currentRecipe value if necessary
      if((this.currentRecipe !== null) && (this.currentRecipe.recipeID === recipeID)){
        this.currentRecipe = data as Recipe;
      }
      // update recipes
      const position = recipes.findIndex((r) => r.recipeID === recipeID);
      if(position > -1) recipes.splice(position, 1, data);
      // update recipes displayed
      this.updateRecipesDisplayed();
    },
    (err) => { this.addNotif(err, "error") });
  }

  // simple field
  updateCategory = (cat) => { this.updateRecipeField(["category"], [cat]) };
  updateChiefTip = (tip) => { this.updateRecipeField(["chiefTrick"], [tip]) };
  updateCookingTime = (cookTime) => { this.updateRecipeField(["cookPeriod"], [cookTime]) };
  updateDelta = (delta) => { this.deltaPerson = delta };
  updateMark = (mark) => {
    // update recipe
    this.updateRecipeField(["mark", "nbMark"], [this.currentRecipe.mark + mark, this.currentRecipe.nbMark + 1]);
    // update user
    this.user.votedFor.push(this.currentRecipe.recipeID);
    this.usersService.updateUser(this.user.login, this.user)
      .subscribe((data) => { this.user = data },(error) => { this.addNotif(error, "error") });
  };
  updateMeat = (meat) => { this.updateRecipeField(["meatClass"], [meat]) };
  updateNbPerson = (nbPers) => { this.updateRecipeField(["nbPeople"], [nbPers]) };
  updatePreparationTime = (prepTime) => { this.updateRecipeField(["prepPeriod"], [prepTime]) };
  updateRestPeriod = (restTime) => { this.updateRecipeField(["restPeriod"], [restTime]) };
  updateSpice = (spice) => { this.updateRecipeField(["spicy"], [spice]) };
  updateTitle = (newTitle) => { this.updateRecipeField(["title"], [newTitle]) };
  updateUnit = (unit) => { this.updateRecipeField(["nbPeopleUnit"], [unit]) };
  updateVideo = () => { this.updateRecipeField(["video"], [!this.currentRecipe.video]) };
  // simple array field
  updateIngredients = (ingredients) => { this.updateRecipeField(["ingredients"], [ingredients]) };
  updateSteps = (steps) => { this.updateRecipeField(["steps"], [steps]) };
  updateTags = (tags) => { this.updateRecipeField(["tags"], [tags]) };
  // complexe array field
  addComment = (comment) => { this.updateRecipeField(["comments"], [comment], "add") };
  removeComment = (dateComment) => { this.updateRecipeField(["comments"], [dateComment], "remove") };
  updateComment = (comment) => { this.updateRecipeField(["comments"], [comment]) };
  updateValidatedBy = () => {
    const needToAdd = !this.currentRecipe.validatedBy.includes(this.user._id);
    if(needToAdd) this.currentRecipe.validatedBy.push(this.user._id);
    else {
      const position = this.currentRecipe.validatedBy.findIndex((userID) => userID === this.user._id);
      if(position > -1) this.currentRecipe.validatedBy.splice(position, 1);
    }
    this.updateRecipeField(["validatedBy"], [this.user._id], needToAdd ? "add" : "remove");
  }

  /*****************************/

  showRecipe(id, needToHistorize = true){
    this.recipesService.getRecipe(id).subscribe((data) => {
      this.currentRecipe = data;
      if(needToHistorize)
        window.history.pushState({"recipe": id}, null, `#recipe=${id}`);
    });
  }

  changeCurrentCategory(cat){
    // filter by category
    this.currentCategory = cat;
    this.updateRecipesDisplayed();
    // remove currentRecipe
    this.currentRecipe = null;
  }

  closeHelper = () => { this.openHelp = false }

  connection(info){
    this.usersService.getUser(info.login, info.password).subscribe((data) => {
      this.user = data;
      // ok we are connected or not ?
      if(this.user === null){ // not connected
        this.addNotif("Wrong login and/or password ! Try again ;)", "error");
      } else { // Great! welcome back
        this.addNotif(`Welcome ${info.login} !`, "success");
        recipesWidthDispo = window.innerWidth - 306;
        recipesHeightDispo = window.innerHeight - 128;
        this.updateTotalPages();
        this.updateRecipesDisplayed();
        this.shoppingItems = this.user.cart;
      }
    });
  }

  goTo(page, needToHistorize = true){
    this.start = nbMaxRecipesByPage * (page - 1);
    this.end = nbMaxRecipesByPage * page;
    this.currentPage = page;
    this.currentRecipe = null;

    if(needToHistorize){
      window.history.pushState({"page": page}, null, `#page=${page}`);
    }
  }

  openCreateUser = () => {
    this.openUserForm = true;
    this.openRecipeForm = false;
    this.openShoppingList = false;
  }
  closeUserForm = () => { this.openUserForm = false }

  openHelper = () => { this.openHelp = true }

  openCreateRecipe = () => {
    this.openUserForm = false;
    this.openRecipeForm = true;
    this.openShoppingList = false;
  }
  closeRecipeForm = () => { this.openRecipeForm = false };

  openTheShoppingList = () => {
    this.openUserForm = false;
    this.openRecipeForm = false;
    this.openShoppingList = true;
   }
   closeShoppingList = () => { this.openShoppingList = false };

  randomRecipe = (category) => {
    const recipesFiltered = recipes.filter( (r) => r.category === category);
    let id = recipesFiltered[Math.round(Math.random() * recipesFiltered.length) - 1].recipeID;
    this.showRecipe(id)
  }

  search(data){
    searchItems.query = data.query.filter((q) => (q.length > 2));
    this.query = data.query.join(" ");
    searchItems.in = data.ingredientsIn.filter((i) => (i.length > 2));
    searchItems.out = data.ingredientsOut.filter((o) => (o.length > 2));
    searchItems.calories = (data.caloryMax.length > 0) ? Number(data.caloryMax) : 0;
    searchItems.dureeMax = (data.dureeMax.length > 0) ? Number(data.dureeMax) : 0;

    this.updateRecipesDisplayed();
  }

  setUnits(recipes){
    this.units = uniq(recipes.map((r) => r.ingredients).flat().map((i) => i.unit )).sort();
  }

  toggleEditionMode(){
    this.editionMode = !this.editionMode;
  }

  updateFilters(data){
    this.filters = data;
    this.updateRecipesDisplayed();
  }

  updateOrCreateUser(data){
    let newUser = {
      login: data.login,
      password: data.password,
      email: data.email,
      logo: data.avatar
    };

    if(newUser.login.length == 0){
      this.addNotif("Il te faut peut-être un login, tu crois pas ?!", "error");
      return;
    }

    if(newUser.password.length == 0){
      this.addNotif("Il te faut peut-être un password, tu crois pas ?!", "error");
      return;
    }

    if(newUser.login.email == 0){
      this.addNotif("T'as pas un email mec ?!", "error");
      return;
    }

    // creation
    if(this.user === null){
      this.usersService.createUser(newUser).subscribe(
        (res) => {
          this.addNotif(`Dear ${data.login}, your account has been created! Welcome among us :)`, "success");
          this.openUserForm = false; // close the user form
          this.connection({login: data.login, password: data.password}); // connect
        }, (error) => {
          this.addNotif(error, "error");
        });
    } else { // update
      this.usersService.updateUser(this.user.login, newUser).subscribe(
        (res) => {
          this.user = res;
          this.addNotif(`Profil updated !`, "success");
          this.openUserForm = false; // close the user form
        }, (error) => {
          this.addNotif(error, "error");
        });
    }
  }

  updateRecipesDisplayed(){
    // Filter by category
    this.recipesDisplayed = (this.currentCategory === "all") ? recipes : recipes.filter( (r) => r.category === this.currentCategory);
    // Filter by filters
    if(this.filters.onlyValidated){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => r.validatedBy.includes(this.user._id));
    }
    if(this.filters.onlyNew){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => !(r.validatedBy.includes(this.user._id)));
    }
    if(this.filters.onlyDislike) {
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => r.deletedBy.includes(this.user._id));
    } else if(this.user !== null){
        this.recipesDisplayed = this.recipesDisplayed.filter((r) => !r.deletedBy.includes(this.user._id));
    }
    if(this.filters.hot){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => ((r.spicy >= this.filters.hotMin) && (r.spicy <= this.filters.hotMax)));
    }
    if(this.filters.star){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => {
        let mark = r.mark / r.nbMark;
        return ((mark >= this.filters.starMin) && (mark <= this.filters.starMax));
      });
    }
    // Filter by duree max
    if(searchItems.dureeMax > 0){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => { // TODO ici bug potentiel si tout les temps sont pas en minutes
        let dureeTotalRecipe = Number(r.prepPeriod.split(" ")[0]) + Number(r.cookPeriod.split(" ")[0]) + Number(r.restPeriod.split(" ")[0]);
        return (dureeTotalRecipe <= searchItems.dureeMax);
      });
    }
    // Filter by ingredients out
    if(searchItems.out.length > 0){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => {
        let haveOut = false;
        let ingredients = r.ingredients.map((i) => i.ingredient.toLowerCase());
        haveOut = searchItems.out.filter(x => ingredients.includes(x.toLowerCase())).length > 0;
        return !haveOut;
      })
    }
    // Filter by ingredients in
    if(searchItems.in.length > 0){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => {
        let haveIn = false;
        let ingredients = r.ingredients.map((i) => i.ingredient.toLowerCase());
        haveIn = searchItems.in.filter(x => ingredients.includes(x.toLowerCase())).length > 0;
        return haveIn;
      })
    }
    // Filter by calories
    if(searchItems.calories > 0){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => r.caloryMax < searchItems.calories);
    }
    // Filter by query
    if(searchItems.query.length > 0){
      this.recipesDisplayed = this.recipesDisplayed.filter((r) => {
        let tagMatch = false;
        let titleMatch = false;
        let chiefTrickMatch = false;
        let ingredientsMatch = false;
        let stepsMatch = false;

        for(let i = 0; i <= searchItems.query.length; i++ ){
          let q = searchItems.query[i];
          // tags
          if(r.tags.filter(t => t.toLowerCase().includes(q)).length > 0){ tagMatch = true; break; }
          // title
          if(r.title.toLowerCase().includes(q)){ titleMatch = true; break; }
          // chiefTrick
          if(r.chiefTrick.toLowerCase().includes(q)){ chiefTrickMatch = true; break; }
          // ingredients
          if(r.ingredients.map((i) => i.ingredient).filter((i) => i.toLowerCase().includes(q)).length > 0){
            ingredientsMatch = true;
            break;
          }
          // steps
          if(r.steps.map((s) => s.text).filter((s) => s.toLowerCase().includes(q)).length > 0){
            stepsMatch = true;
            break;
          }
        }
        return chiefTrickMatch || ingredientsMatch || stepsMatch || tagMatch || titleMatch;
      });
    }

    // update the pagination
    this.start = 0;
    this.end = nbMaxRecipesByPage;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.recipesDisplayed.length / nbMaxRecipesByPage);
  }

  updateTotalPages(){
    // calculate total pages
    let nbRecipeByWidth = Math.trunc(recipesWidthDispo / RECIPE_ITEM_WIDTH);
    let nbRecipeByHeight = Math.trunc(recipesHeightDispo / RECIPE_ITEM_HEIGHT);
    nbMaxRecipesByPage = nbRecipeByWidth * nbRecipeByHeight;
    this.totalPages = Math.ceil(this.recipesDisplayed.length / nbMaxRecipesByPage);
    // update filter slice for recipes
    this.goTo(1);
  }

  unconnect(){
    this.user = null;
    this.shoppingItems = [];
    // unconnected so filters disappears and the width is biggest to display the recipes
    recipesWidthDispo = window.innerWidth - 266;
    recipesHeightDispo = window.innerHeight - 128;
    this.updateTotalPages();
  }
}