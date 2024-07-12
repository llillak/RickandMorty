# RickandMorty

This project is a React application that allows users to view and interact with characters from the Rick and Morty universe. It includes features such as searching characters by name, marking favorite characters, and logging in with basic authentication.

## Features

- **Authentication**
  - Users can log in to their accoun (right now i created one user "admin")
  - Upon successful login, the user can view their profile and log out.

- **Character Display**
  - Displays characters fetched from the Rick and Morty API.
  - Users can filter characters by name using a search input.

- **Favorites**
  - Logged-in users can mark characters as favorites by clicking a star icon.
  - Favorite characters are stored locally and persist across sessions.

- **View Options**
  - Users can toggle between viewing all characters and viewing only their favorite characters.

## Screenshots

![Screenshot 1](/screenshots/screenshot1.png)

![Screenshot 2](/screenshots/screenshot2.png)

![Screenshot 3](/screenshots/screenshot23.png)

## Technologies Used

- React
- TypeScript
- CSS (styled with Home.css)

## How to Use

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the application with `npm start`.

## Dependencies

- React: ^17.0.2
- TypeScript: ^4.3.2

## Setup

To run this project locally, ensure you have Node.js and npm installed on your machine. Then, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

   Created with ❤️ by llillak
