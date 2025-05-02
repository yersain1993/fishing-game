import React, { useEffect, useState } from 'react';
import LeaderBoard from './LeaderBoard';
import Market from './Market';
import { getLeaderBoardData, getMarketData } from '../services/getData';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';

const Main = () => {
  const UPDATE_INTERVAL_MS = 0.6 * 1000; // 1 minute

  const [players, setPlayers] = useState([]);
  const [market, setMarket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    players.length === 0 ? setLoading(true) : setIsUpdating(true);
    setError(null);
    try {
      // Try load both endpoints concurrently
      const [leaderBoardResult, marketResult] = await Promise.allSettled([
        getLeaderBoardData(),
        getMarketData(),
      ]);
      // fulfilled means the request was successful
      if (leaderBoardResult.status === 'fulfilled') {
        setPlayers(leaderBoardResult.value.players);
      } else {
        // rejected means the request failed
        console.error('Leaderboard load error (SW/Red):', leaderBoardResult.reason);
        setError((prev) =>
          prev
            ? `${prev} | Leaderboard: ${leaderBoardResult.reason.message}`
            : `Leaderboard: ${leaderBoardResult.reason.message}`,
        );
      }
      // fulfilled means the request was successful
      if (marketResult.status === 'fulfilled') {
        setMarket(marketResult.value.items);   
      } else {
        // rejected means the request failed
        console.error('Market load error (SW/Red):', marketResult.reason);
        setError((prev) =>
          prev
            ? `${prev} | Market: ${marketResult.reason.message}`
            : `Market: ${marketResult.reason.message}`,
        );
      }
    } catch (error) {
      console.error('Unexpected error during loading:', error);
      setError(error.message || 'An unexpected error occurred.');
    } finally {
      players === 0 ? setLoading(false) : setIsUpdating(true);
    }
  };

  useEffect(() => {
    loadData();

    const intervalId = setInterval(() => {
      loadData();
    }, UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {loading && !isUpdating && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!(loading && !isUpdating) && !error && (
        <>
          {players && (
            <>
              <h1 className="text-cyan-950 mt-5 font-[Eagle_Lake] text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl [text-shadow:0_0_7px_theme(colors.cyan.400),0_0_10px_theme(colors.cyan.400),0_0_21px_theme(colors.cyan.400),0_0_42px_theme(colors.cyan.700),0_0_82px_theme(colors.cyan.700),0_0_92px_theme(colors.cyan.700),0_0_102px_theme(colors.cyan.700),0_0_151px_theme(colors.cyan.700)]">
                Leader Board
              </h1>
              <LeaderBoard players={players} />
            </>
          )}
          {market && (
            <>
              <h1 className="text-cyan-950 mt-7 md:mt-9 lg:mt-10 xl:mt-15 font-[Eagle_Lake] text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl [text-shadow:0_0_7px_theme(colors.cyan.400),0_0_10px_theme(colors.cyan.400),0_0_21px_theme(colors.cyan.400),0_0_42px_theme(colors.cyan.700),0_0_82px_theme(colors.cyan.700),0_0_92px_theme(colors.cyan.700),0_0_102px_theme(colors.cyan.700),0_0_151px_theme(colors.cyan.700)]">
                Market
              </h1>
              <Market market={market} />
            </>
          )}
        </>
      )}
      {!loading && !players && !market && !error && (
        <p className="text-center text-cyan-500 mt-8">
          No se encontraron datos iniciales.
        </p>
      )}
    </div>
  );
};

export default Main;
