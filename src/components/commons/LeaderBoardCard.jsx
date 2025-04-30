import React, { useEffect, useState } from 'react';

const LeaderBoardCard = ({ player }) => {
  const infected = player.isInfected;
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    if (infected) {
      setIsGlowing(true);
    } else {
      // Wait for the transition to finish before removing the color.
      const timer = setTimeout(() => setIsGlowing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [infected]);

  return (
    <div className={`text-cyan-950 transition-all duration-1000 ease-in-out ${isGlowing ? 'animate-infected-glow' : 'bg-cyan-600'} p-2 rounded-xl m-1.5 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl`} 
    style={{animation: isGlowing ? 'infected-glow 2s infinite' : 'none'}}>
      <section className="flex flex-row justify-between">
        <div className="flex flex-row">
          <p className="font-semibold">{`${player.rank}`}</p>
          <p> - </p>
          <p>{player.username}</p>
        </div>
        <div>{player.fishEmojis}</div>
      </section>
      <section className="flex justify-between text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
        <p className="">Level:{player.level}</p>
        <p className="">{player.xp}xp</p>
        <p className="text-amber-500">{player.gold} Gold</p>
      </section>
    </div>
  );
};

export default LeaderBoardCard;
