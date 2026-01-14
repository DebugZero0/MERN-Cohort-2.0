# My Market

[Live Demo](https://effortless-zabaione-37559f.netlify.app/)

## Features
- React 18
- Vite
- React Router DOM
- ESLint with recommended rules for React
- Prettier for code formatting
- CSS Modules support
- Fast Refresh for a better development experience
- React Compiler (optional, not enabled by default)
## Getting Started
### Prerequisites
- Node.js v14.18+, v16+
- npm v6+ or yarn v1.22+
### Installation
1. Clone the repository:
    ```bash
    git clone
    git clone
    ```
2. Navigate to the project directory:
    ```bash
    cd Project-Market
    ```
3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
### Running the Development Server
To start the development server, run:
```bash
npm run dev
# or
yarn dev
```
Open your browser and navigate to `http://localhost:5173` to see the application in action.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
