import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
    </div>
  );
}

export default LoadingSpinner;