import { axiosInstances } from './axiosInstance';

const LEADERBOARD_URL = '/leaderboard';
const MARKET_URL = '/market';

// Función génerica para obtener datos de la API
export const getData = async (url, ) => {
  try {
    // Intenta obtener los datos de la API
    const response = await axiosInstances.get(url);
    console.log(`Data obtained for ${url} (from API or SW cache)`);
    return response.data;
  } catch (error) {
    // Si no hay caché y la petición falló, lanza error
    console.error(
      `Failed try to get data from ${url}`, error.message
    );
    throw new Error(`Getting data failed for ${url}. Verify your network connection.`);
  }
};

export const getLeaderBoardData = () => getData(LEADERBOARD_URL);
export const getMarketData = () => getData(MARKET_URL);
