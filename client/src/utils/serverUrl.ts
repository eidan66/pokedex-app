/* eslint-disable no-confusing-arrow */
export const ServerUrl = (bypassDev = false) =>
  !bypassDev && __DEV__ ? 'http://localhost:3000' : 'https://pokedex-app-5f27.onrender.com';
