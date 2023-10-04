## market-place-pet-project
E-commerce app project with Redux, Hooks, GraphQL, Stripe, Firebase

### Deployment
Project link - https://market-place-ecommerce.netlify.app/

##### Project screens
![Screen1](/src//assets/views/Screen1.png)
![Screen2](/src//assets/views/Screen2.png)
![Screen3](/src//assets/views/Screen3.png)
![Screen4](/src//assets/views/Screen4.png)


### Technologies
This project uses the following technologies:

JavaScript: A popular programming language used for web development.
npm: A package manager for Node.js that allows you to easily install and manage dependencies.
TypeScript: A superset of JavaScript that adds static typing and other features to the language.
React: A popular JavaScript library for building user interfaces.
Redux: A predictable state container for JavaScript apps.
GraphQL: A query language for APIs that allows you to request only the data you need.
Stripe: A payment processing platform that allows you to accept payments online.
Firebase: A platform for building web and mobile applications.

### How to fork and clone
One quick note about cloning this project. If you wish to make commits and push your own code, you'll need to fork the project first. Forking allows you to have your own copy of this repository by adding a duplicate version in your own profile!

You can see the fork button in the top right corner of every GitHub project; click it and a copy of the project will be added to your GitHub profile under the same name as the original project.

After forking the project, simply clone it the way you would from the new forked project in your own GitHub repository and you can commit and push to it freely!

#### After you fork and clone:
###### Install dependencies
In your terminal after you clone your project down, remember to run npm install to build all the dependencies in the project.

###### Set your firebase config
Remember to replace the config variable in your firebase.utils.ts with your own config object from the firebase dashboard! Navigate to the project settings gear icon > project settings and scroll down to the config code. Copy the object in the code and replace the variable in your cloned code.

### Redux
This project uses Redux to manage the application state. The src/redux directory contains the following files:

root-reducer.ts: The root reducer that combines all the other reducers.
store.ts: The Redux store that holds the application state.
cart: A directory that contains the cart-related Redux code, including the cart reducer and actions.
directory: A directory that contains the directory-related Redux code, including the directory reducer and actions.
shop: A directory that contains the shop-related Redux code, including the shop reducer and actions.
user: A directory that contains the user-related Redux code, including the user reducer and actions.
TypeScript
This project uses TypeScript to add static typing to the JavaScript code. The src/types directory contains the TypeScript type definitions used throughout the project.

### Testing
This project includes tests for the Redux reducers and the React components. The tests are located in the src/redux/__tests__ and src/components/__tests__ directories, respectively. To run the tests, use the command npm test.