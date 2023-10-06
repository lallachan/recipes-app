# Recipes app

Welcome to the Recipes application - a simple web about recipes

### Live version: 
[Recipe Demo](https://recipes-sand-iota.vercel.app)

## Setup and local usage

To get started with app, follow these steps:

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/lallachan/recipes-app.git
   ```

2. Navigate to the project directory:

   ```shell
   cd recipes-app
   ```

3. Install the required dependencies using Yarn:

   ```shell
   yarn install
   ```

4. Start the app:

   ```shell
   yarn start
   ```

## Configuration

The app uses environment variables for configuration. Create a `.env` file in the project root
directory and define the following variables:


Auth:
- `REACT_APP_LOGIN_URL`: Route for login
- `REACT_APP_REGISTER_URL`: Route for register
- `REACT_APP_DELETE_ACCOUNT`: Route for deleting account


Token:
- `REACT_APP_TOKEN`:  Authentification token


Recipes:
- `REACT_APP_GET_ALL_RECIPES`: Route for get all recipes
- `REACT_APP_ADD_RECIPE`: Route to add new recipe
- `REACT_APP_EDIT_RECIPE`:  Route to edit recipe
- `REACT_APP_DELETE_RECIPE`:  TRoute to delete recipe


## Docker

You can run this app in a Docker container using Docker Compose.

**Note: Make sure you have Docker and Docker Compose installed**

Run this command:

   ```shell
   docker-compose up 
   ```

## Contact

For inquiries or suggestions, please don't hesitate to reach out to the author:

- Author: Laura Sučić
- Email:  laura.sucic@outlook.com

## Repository

You can access the source code for this app on GitHub: [recipes-app](https://github.com/lallachan/recipes-app)

Enjoy!
