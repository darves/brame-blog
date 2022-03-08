# Test
The goal of this project is to show that you are familiar with Angular basic structure and concepts. You will need to build a simple blog app, which consists of three parts:

1. Administration dashboard

2. Public page where blog posts will be listed

3. Public page for a single post

Your app should consume our API with mock data. All API routes with documentation can be found on this link: http://18.192.182.140/api/documentation .

Some routes are protected with an API token, as you can see from the documentation, which you should pass as a query param.

You can use this API token: 9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN

Also, you can style the app as you wish by using SCSS, and whatever library you are comfortable with.

# Administration dashboard

1. Administration routes should be protected by a Guard, only authenticated users can access these routes. You should use the API token that we provided for this.

2. The dashboard needs to have a place for listing all articles and categories, a place for creating new articles/categories, and a place to edit them.

3. All form fields for creating/editing resources should have some type of validation, you should create at least some Directives for validation. You can check all types of parameters and minimum and maximum length for them in the API documentation (under the Schema tab).

# Public pages

1. The main page of the app should have listed articles with pagination, API calls for a list of articles and categories have all that you need to implement the pagination on the frontend. For example, every response has total items, items per page, and URLs for next/previous/first/last page

2. Single post page should have the post and all related comments and the category of the article



# BrameBlog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11. (I forgot to update ;()

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
