# movie_api-client

## This is the Client-Sinde Part of my Movie Application

### Objective:

**Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database).**

---

### Technical Requirements:

### Required:

- The application must be a single-page application (SPA)
- The application must use state routing to navigate between views and share URLs
- The application must give users the option to filter movies
- The application must give users the option to sort movies
- The application must initially use Parcel as its build tool
- The application must be written using the React library and in ES2015+
- The application must be written with React Redux (hence respecting the Flux pattern)
- The application must use Bootstrap as a UI library for styling and responsiveness
- The application must contain a mix of class components and function components
- The application may be hosted online

---

### Design Criteria:

#### User Stories:

- As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

#### Features & Requirements:

The feature requirements below were extracted from the user stories listed above. Your project will only be approved if the following “essential” feature requirements are implemented in your Achievement project.

#### Essential Views and Features:

Main view:

- Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- Sorting and filtering
- Ability to select a movie for more details

Single movie view:

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

Login view:

- Allows users to log in with a username and password

Registration view:

- Allows new users to register (username, password, email, birthday)

Genre view:

- Returns data about a genre, with a name and description
- Displays example movies

Director view:

- Returns data about a director (name, bio, birth year, death year)
- Displays example movies

Profile view:

- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays favorite movies
- Allows users to remove a movie from their list of favorites

---

#### Optional Views and Features:

Single movie view and all movies views:

- Allow users to see which actors star in which movies
- Allow users to view more information about different movies, such as the release date and the movie rating

Actors view:

- Allows users to view information about different actors

Profile view, single movie view, and all movies view:

- Allow users to create a “To Watch” list in addition to their “Favorite Movies” list

---

### Setup:

1. Installing the Right Dependencies
   Dependencies are what your application needs for both development and production, while development dependencies are only necessary during development.

- In order to use Parcel in movie_api-client, you first need to install it globally:<br/>
  use `npm install -g parcel@next` command for Terminal

- Be sure that Parcel v2+ is installed _(rather than Parcel v1, this older version is no longer maintained by the developers)_.<br/>
  To check the installed version, run the command: parcel --version

- Now, now navigate to “movie_api-client” project folder in terminal, then run the following commands to install packages and dependencies you need for React application development:<br/>
  use `npm install --save react react-dom` command for Terminal

- to use the actual list of movies from movie_apiDB, it´s needed to perform an ajax operation. For this, First install the Axios library:<br/>
  use `npm install axios --save` command for Terminal

- As props transmit data between components in a React application, propTypes validate the data types based on the app’s configuration. To avoid errors and bugs, install propTypes:<br/>
  use `npm install --save prop-types` command for Terminal

- A small help:<br/>
  If the images on the movie view are not getting displayed, there must be an issue with the links stored in the database.<br/>
  To fix that, add crossOrigin="anonymous" to the <img> tag, to avoid this error.

2. To Design a propper UI (User Interface)<br/>
   Half the work of a frontend developer is ensuring that the user interfaces (UIs) they code resemble the prototypes they receive from their designers as closely as possible.<br/>
   Design systems are often used by product teams to ensure consistent styling and branding across a product, creating a uniform and coherent experience for users.<br/>
   A design system is essentially a library of UI components applied to one or several products.

- For ths App we use React Bootstrap. In order to use React Bootstrap in movie_api-client, install it:<br/>
  use `npm install --save react-bootstrap` command for Terminal

3. To make the app persistent, you need routing: <br/>
   the ability to store state in the URL. <br/>
   Implementing a router from scratch isn’t all that straightforward, especially when it comes to state-based routers. There are some good libraries available that can handle things for you. React Router is the most popular for React applications.

- To implement a State-Based Router to the app, you need to install React Router: <br/>
  use `npm install react-router-dom` command for Terminal

4. You will use React Redux which acts as the binding between React and Redux, and then you'll move to the actual implementation part for converting your app to Redux.

- Before installing React Redux, let’s begin by installing the two packages you need: <br/>
  use `npm install redux --save` <br/>
  and `npm install react-redux --save` command for Terminal<br/>
  _make sure to install React Redux in your project directory locally_

- Install the redux-devtools extension inside your project:<br/>
  use `npm install --save redux-devtools-extension` command for Terminal<br/>
  _After the installation is complete, import this dependency as follows: <br/>_
  _import { devToolsEnhancer } from 'redux-devtools-extension'; and then adjust the line where the store is being created to: <br/>_
  _const store = createStore(moviesApp, devToolsEnhancer());_

---

## MyFlix:


An after-login page wound looking like:
![WelcomePage](./src/img/Screenshot_MovieFlexReact.png)

to run type parcel src/index.html or
npm run start
