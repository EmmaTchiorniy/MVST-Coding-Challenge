# MVST-Coding-Challenge:

### GitHub Repository Viewer With Search Functionality

## Description

The GitHub Repository Viewer is a React application written with typescript that allows users to search for GitHub repositories by username and filter them by name and programming language. The app fetches data from the GitHub API and displays a list of repositories with their details.

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/github-repository-viewer.git
   ```

2. Navigate into the project directory:

   ```bash
   cd github-repository-viewer
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

### Running the Application

To start the application in development mode, use:

```bash
npm run dev
```

or

```bash
yarn run dev
```

This will run the application at `http://localhost:5173/`.

## Running the Test Suite

To run the test suite, use:

```bash
npm test
```

or

```bash
yarn test
```

## Future Improvements

- **Handling large results:** Implement pagination for repositories or "show more" button to handle large numbers of results.
- **Error Handling:** Error handling for none-existing users, more feedback, particularly for network issues and empty states, and better navigation during and after the error.
- **Styling:** Enhance the UI with more advanced styling and responsive design features.
- **Testing:** Implement tests that don't cause problems with MUI and/or React Query. The errors were difficult to interpret but the pages that could not be tested due to these issues were the most important.
