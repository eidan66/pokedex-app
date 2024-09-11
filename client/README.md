
# Pokedex App - Client

This folder contains the **React Native** client-side implementation for the Pokedex App. The client communicates with the server to fetch Pokémon data and display it on mobile devices.

## Prerequisites

- **Node.js:** Ensure you have Node.js installed.
- **Yarn:** We use Yarn as the package manager.
- **React Native CLI:** Install the React Native CLI if you're testing on Android or iOS simulators.

## Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. To run in development mode:

   ```bash
   yarn start
   ```

3. Run the app:

   - iOS:

     ```bash
     yarn ios
     ```

   - Android:

     ```bash
     yarn android
     ```


## Available Scripts

In the project directory, you can run the following commands:

- **yarn start**: Runs the app in development mode.
- **yarn test**: Runs the tests for the client.
- **yarn ios**: Launches the iOS simulator and runs the app.
- **yarn android**: Launches the Android emulator and runs the app.

## Folder Structure

## Folder Structure

The project's directory structure is organized as follows:

- **src/**: Contains all the source code for the application.
  - **components/**: Reusable React Native components.
  - **constants/**: Constant values such as colors, fonts, and configuration settings.
  - **hoc/**: Higher-Order Components used across the application.
  - **navigation/**: Navigation-related files using React Navigation.
  - **pages/**: Components that represent entire screens within the application.
  - **providers/**: Context providers for state management across the React component tree.
  - **redux/**: Redux state management files including actions, reducers, and store configuration.
  - **types/**: TypeScript types and interfaces.
  - **utils/**: Utility functions used throughout the application.
- **assets/**: Static files such as images, logos, and icons used in the application.
- **declarations/**: TypeScript declaration files for module declarations.
- **tests/**: Test files and configuration for Jest and React Testing Library.


## Testing

This project uses @testing-library/react-native for unit tests.

```bash
yarn test
```

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
