# **Filters**

is located to the left of the recipe(s). It has two aspects :
- If the user has selected a recipe, the filter icons are as follows:
  - Validate / invalidate a recipe
  - Print recipe
  - Add recipe ingredients to your cart
- If the user has not selected a recipe :
  - Filter the list of recipes with only the validated ones
  - Filter the list of recipes with only the non-validated ones
  - Filter the list of recipes with all those discarded
  - Filter according to their spice level
  - Filter by rating

## **inputs**

- **user: User | Null**

*The current user*

- **currentRecipe: Recipe | Null**

*The current recipe selected*

----------
## **outputs**

- filterChanged: {
      'onlyValidated': boolean,
      'onlyNew': boolean,
      'onlyDislike': boolean,
      'hot': boolean,
      'hotMin': int >= 0 & <= 3,
      'hotMax': int >= 0 & <= 3,
      'star': boolean,
      'starMin': int >= 0 & <= 5,
      'starMax': int >= 0 & <= 5
    };

*This event is returned when the user wants to filter recipes. The filter object is then sent*

- recipeValidated: void

*This event is returned when the user want to validate or unvalidate the current recipe.*

- addedToCart: void

*This event is returned when the user want to add to its cart the current recipe ingredients.*

----------
## **Local variables**

*Nothing*

----------
## **View Child**

- hotMinElement: input

*Link to the hot min input*

- hotMaxElement: input

*Link to the hot max input*

- starMinElement: input

*Link to the star min input*

- starMaxElement: input

*Link to the star max input*