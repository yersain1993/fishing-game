import axios from 'axios';

export const axiosInstances = axios.create({
  baseURL: 'https://api-game.bloque.app/game',
});