# Project: SkillBridge

## Project Overview

This project, "SkillBridge," is a web application designed to connect students seeking internships with companies that are hiring. It serves as a comprehensive platform for internship posting, application, and management.

The application is a frontend prototype built with **React** and **Vite**. It uses **Tailwind CSS** for styling and **React Router** for navigation. The entire application state, including user authentication and data (internships, companies, applications), is managed through React Context (`AuthContext`, `DataContext`) and uses mock data hardcoded within the `DataContext.jsx` file. There is no backend database connected; user state is persisted in `localStorage`.

The project structure is well-organized, with clear separation of components, pages, context, and mock data. A detailed specification in `spec.md` outlines the core features, user roles (Student, Recruiter, Admin), and a future roadmap which includes potential AI features.

## Building and Running

The project is managed using `npm` and built with `Vite`.

*   **Install Dependencies:** To install all the necessary packages, run:
    ```bash
    npm install
    ```

*   **Run Development Server:** To start the local development server with hot-reloading, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

*   **Build for Production:** To create a production-ready build of the application, run:
    ```bash
    npm run build
    ```
    The output files will be placed in the `dist/` directory.

*   **Preview Production Build:** To serve the production build locally for testing, run:
    ```bash
    npm run preview
    ```

## Development Conventions

*   **Styling:** The project uses **Tailwind CSS**. Utility classes are the primary way to style components. Custom theme colors (`primary`, `accent`) are defined in `tailwind.config.js`.
*   **State Management:** Global application state is managed via React Context.
    *   `AuthContext` (`src/context/AuthContext.jsx`) handles user authentication, storing user data in `localStorage`.
    *   `DataContext` (`src/context/DataContext.jsx`) provides all other application data (internships, companies, etc.) from a mock source.
*   **Routing:** Page routing is handled by **React Router** (`react-router-dom`). All routes are defined in `src/App.jsx`.
*   **Components:** The codebase is structured into reusable components (`src/components`) and page-level components (`src/pages`).
*   **Data:** All data is currently mocked and served from `src/context/DataContext.jsx`. This is the central point for any data interactions within the prototype.
*   **Project Specification:** A detailed functional and technical specification can be found in `spec.md`. This document should be consulted for details on intended features and application flow.
