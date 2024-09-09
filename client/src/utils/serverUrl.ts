/* eslint-disable no-confusing-arrow */

export const getBaseUrl = () =>
  process.env.RUN_WITH_LOCAL_SERVER === 'true' && __DEV__
    ? 'http://127.0.0.1:8000/api/'
    : 'https://pokedex-app-qfip.onrender.com/api/';
