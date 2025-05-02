import React from 'react';

const Market = ({ market }) => {
  if (!market || market.length === 0) {
    return (
      <p className="text-center text-cyan-500 mt-4">
        No items in the market.
      </p>
    );
  }

  return (
    <div className="shadow-sm rounded-lg p-4 px-15 md:px-30 lg:px-40 xl:px-60 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {market.map((item) => (
          <div
            key={item.id}
            className="border bg-[rgba(37,61,82,0.43)] rounded-lg p-4 flex flex-col justify-between hover:shadow-lg hover:shadow-cyan-700 transition-shadow duration-200"
          >
            <div>
              <h3 className="text-lg font-semibold text-cyan-500">{item.name}</h3>
              <p className="text-sm text-cyan-600 mt-1 mb-2">{item.description}</p>
              <p className="text-xs text-zinc-400">
                <strong>Type:</strong> {item.type}
              </p>
            </div>
            <p className="text-right text-lg font-bold text-yellow-500 mt-3">
              {item.cost} Gold
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
