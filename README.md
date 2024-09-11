
# Pokedex App

**Pokedex App** is a mobile application that allows users to explore the world of Pokémon. The app supports both iOS and Android platforms, delivering a seamless and immersive experience. Users can browse through a complete list of Pokémon, access detailed information, and capture their favorites for easy reference. This app is powered by React Native, Redux for state management, and a custom server to fetch Pokémon data.

### Preview

- **Platforms Supported:** iOS and Android
- **Current Version:** In development (Preview available)
- **Features:**
  - Explore all available Pokémon.
  - View detailed information, such as types, evolutions, abilities, and moves.
  - Capture Pokémon and track them in the 'Captured' screen.
  - Support for both light and dark mode.
  - Smooth pagination and performance optimizations for large datasets.

Here's a brief look at the Pokedex App in action, showcasing some of its features and user interface:

https://github.com/user-attachments/assets/68380272-3817-4ae1-9e8d-9e2edba38ff1

This preview demonstrates the app's ability to browse through Pokémon, access detailed information, and utilize the capturing functionality.

## Features

- **Detailed Pokémon Information:** Fetch in-depth details, including evolutions and abilities.
- **Captured Pokémon:** Keep track of your captured Pokémon, with all relevant details stored.
- **Dark Mode:** Manual and system-based toggle to suit user preferences.
- **Pagination:** Efficient pagination to improve the app's performance while browsing large datasets.
- **Backend Integration:** The app is backed by a Python/Django server that provides dynamic Pokémon data using the `pokebase` package.

## Tech Stack

- **Frontend:** React Native, React Navigation TypeScript
- **Backend:** Python Django, pokebase
- **Testing:** @testing-library/react-native, Jest
- **CI/CD:** GitHub Actions
- **Package Manager:** Yarn

## Installation

### Prerequisites

- Node.js & Yarn installed
- Python and Pipenv for server setup

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/eidan66/pokedex-app.git
   ```

2. **Install dependencies for the client:**

   ```bash
   cd pokedex-app/client
   yarn install
   ```

3. **Install dependencies for the server:**

   ```bash
   cd ../server
   pipenv install
   ```

4. **Run the server:**

   ```bash
   cd ../server
   pipenv shell
   ./manage.py runserver
   ```

5. **Run the mobile app (React Native):**

   ```bash
   cd ../client
   yarn start
   ```

6. **iOS/Android Setup:**
   - For iOS: Open `ios/YourProject.xcworkspace` in Xcode and run the app.
   - For Android: Run the app using `yarn android` or open Android Studio and launch the project.

## Running Tests

### Frontend:

```bash
yarn test
```

<!-- ### Backend:

```bash
cd ../server
./manage.py test
``` -->

## Interview Practice

This app has been designed and developed with attention to important software development practices:
<!-- 
- **State Management:** Redux has been used to manage global state, which is crucial for scalability and maintainability. -->
- **Component Testing:** All components are tested using @testing-library/react-native to ensure they work independently.
- **CI/CD Pipeline:** The project uses GitHub Actions to automate testing, ensuring the app is always in a working state.
- **Performance Optimization:** Pagination and lazy loading are used to handle large datasets efficiently.


## License

This project is open-source and available under the [MIT License](./LICENSE).
