# Recipe Finder App

<details>
<summary><strong>Table of Contents</strong></summary>

- [Description](#description)
- [Screenshots](#screenshots)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Deployed App](#deployed-app)
- [Getting Started/Installation Instructions](#getting-startedinstallation-instructions)
- [Icebox Items](#icebox-items)
- [Contribution Guidelines](#contribution-guidelines)

</details>


## Description

The Recipe Finder App is a web application that allows users to search for recipes based on various categories such as nationality, ingredients, and dish name. It provides a simple and intuitive interface for users to discover new recipes and find inspiration for their cooking adventures. The app now includes user login via Google, conditional rendering based on authentication status, and a reviews section visible only to logged-in users.


## Screenshots

<a href="https://github.com/jaclynscarey/recipe-finder/assets/109121563/fe027561-27de-4df8-be52-3bd5ae5dc543" target="_blank">
  <img src="https://github.com/jaclynscarey/recipe-finder/assets/109121563/fe027561-27de-4df8-be52-3bd5ae5dc543" alt="Screenshot 1" width="400">
</a>
<a href="https://github.com/jaclynscarey/recipe-finder/assets/109121563/408691bc-3c66-466a-ab01-60c839b682b6" target="_blank">
  <img src="https://github.com/jaclynscarey/recipe-finder/assets/109121563/408691bc-3c66-466a-ab01-60c839b682b6" alt="Screenshot 2" width="400">
</a>
<a href="https://github.com/jaclynscarey/recipe-finder/assets/109121563/c4017770-76cc-4066-b877-c11a0e3e87a3" target="_blank">
  <img src="https://github.com/jaclynscarey/recipe-finder/assets/109121563/c4017770-76cc-4066-b877-c11a0e3e87a3" alt="Screenshot 3" width="400">
</a>
<a href="https://github.com/jaclynscarey/recipe-finder/assets/109121563/0116c16d-4520-47cd-b474-730a72a89f61" target="_blank">
  <img src="https://github.com/jaclynscarey/recipe-finder/assets/109121563/0116c16d-4520-47cd-b474-730a72a89f61" alt="Screenshot 5" width="400">
</a>
<a href="https://github.com/jaclynscarey/recipe-finder/assets/109121563/7a2f58ae-9e60-4122-8273-f94d0a915068" target="_blank">
  <img src="https://github.com/jaclynscarey/recipe-finder/assets/109121563/7a2f58ae-9e60-4122-8273-f94d0a915068" alt="Screenshot 4" width="400">
</a>
<a href="https://github.com/jaclynscarey/recipe-finder/assets/109121563/a9cdd30b-8f86-4968-a118-e97a7b2d8842" target="_blank">
  <img src="https://github.com/jaclynscarey/recipe-finder/assets/109121563/a9cdd30b-8f86-4968-a118-e97a7b2d8842" alt="Screenshot 6" width="400">
</a>


## Key Features

* Search by Category: Users can choose from different categories such as Nationality, Ingredient, and Recipe Name to refine their recipe search.
* Dynamic Dropdowns: The app dynamically generates dropdown menus based on the selected category, providing users with relevant options to choose from.
* Random Recipe: The home page of the app presents users with a randomly selected dish or meal each time they visit, adding an element of surprise and exploration.
* Detailed Recipe View: Clicking on a recipe from the search results opens a detailed recipe view, showcasing the recipe name, ingredients, instructions, and even a video demonstration if available.
* Google OAuth Login: Users can log in securely using their Google account.
* Conditional Navigation: The navigation bar updates based on the user's login status (Login/Logout).
* Login Confirmation Page: After successful login, users are redirected to a dedicated confirmation page.
* User Reviews: Logged-in users can view a review section on the recipe details page.


## Technologies Used

The Recipe Search App is built using the following technologies:

* React: A JavaScript library for building user interfaces
* React Router: A library for managing routing and navigation in a React application
* React Hooks: Used to manage state and side effects in functional components
* Fetch API: Used to retrieve data from the external recipe API
* CSS: Styling the app for an appealing and intuitive user interface
* @react-oauth/google: Used to integrate Google OAuth authentication.
* jwt-decode: For decoding user tokens to personalize the UI.

### Trello
<a href="https://trello.com/b/WRdU0BgY/recipe-finder" target="_blank">Trello Board used for planning</a>

### Wireframe
<a href="https://jaclyncarey408912.invisionapp.com/freehand/Recipe-Finder-9yt2mMkp?dsid_h=d82b6d4b57232ef1cc95a482004d55b423cb027887f1e3b6a4434166699940c9&uid_h=2a43e32efedaef62e967be987ad6788bef9c5eae9eee07812571aafb89f1ebfb" target="_blank">Wireframe on InvisionApp</a>


## Deployed App

The Recipe Finder App is deployed and can be accessed at: [https://recipe-finder-enhancement1.netlify.app/](https://recipe-finder-enhancement1.netlify.app/)

## Getting Started/Installation Instructions

You can access the app 

To run the Recipe Finder App locally on your machine, follow these steps:

* Clone the repository: git clone `https://github.com/jaclynscarey/recipe-finder.git`
* Install the dependencies: `npm install`
* Start the development server: `npm start`
* Open the app in your browser: http://localhost:3000


## Icebox Items

The following features are planned for future implementation:

* Pagination: Implement pagination for search results to display recipes in manageable chunks, allowing users to navigate through multiple pages of results.
* Save Recipes: Enable logged-in users to save recipes to their account for easy access and organization.


## Contribution Guidelines

Contributions are welcome! If you find any bugs or have suggestions for new features, feel free to open an issue or submit a pull request. Please follow the existing code style and conventions.
