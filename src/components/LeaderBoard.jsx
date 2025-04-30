import React from 'react';
import LeaderBoardCard from './commons/LeaderBoardCard';
import { usePagination } from '../hooks/usePagination';

const LeaderBoard = ({ players }) => {
  const playersData = players;
  const leaderBoardPagination = usePagination(players, 7);

  console.log(playersData);

  return (
    <div className="mt-6 w-auto flex flex-col justify-center items-center">
      <div>
        {players &&
          leaderBoardPagination.listSlice.map((player) => (
            <LeaderBoardCard key={player.rank} player={player} />
          ))}
      </div>
      <div className="w-2.5 px-1.5 flex justify-center mt-1 text-cyan-600 text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        <button
          onClick={() => leaderBoardPagination.previousPage()}
          className="active:text-cyan-200 transition-colors duration-200 hover:text-cyan-300 mr-8"
        >
          Prev
        </button>
        <button
          onClick={() => leaderBoardPagination.nextPage()}
          className="active:text-cyan-200 transition-colors duration-200 hover:text-cyan-300 ml-8"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaderBoard;
