<img src="https://github.com/happyksu/cookingBook/blob/master/logo/png/Cooking_logo_preview.png"/>

## Welcome to **Cooking book**

A modern website to save your favorite recipes and share them

### How to use

* Install the mongoDB server (tested with 3.4)
* Update the mongo.bat script with the good version and the good path
* Run mongo.bat
* Execute mongo.exe (the mongoDB client)
* Enter the command "use menus" to create the db named menus
* In the backend folder do "npm install"
* In the root folder do
  * npm Install
  * npm run build
  * npm run backend  // to start the backend server
  * npm run start  // to start the front server

* Open your navigator to http://localhost:4200

### How to save your DB

1. Open the mongoDB install folder of mongoexport.exe
2. Tape "cmd" into the folder input
3. Tape "mongoexport -d menus -c recipes -o E:\recipes.json"
4. Tape "mongoexport -d menus -c users -o E:\users.json"

### How to restore your DB

1. Open the mongoDB install folder of mongoimport.exe
2. Tape "cmd" into the folder input
3. Tape "mongoimport -d menus -c recipes E:\recipes.json"
4. Tape "mongoimport -d menus -c users E:\users.json"

### Support or Contact

Having trouble with Cooking book ? Contact me at funnybobby2@gmail.com and I’ll help you sort it out.
