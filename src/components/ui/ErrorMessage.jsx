import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="bg-cyan-100 border border-cyan-400 text-cyan-700 px-4 py-3 rounded relative m-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}

export default ErrorMessage;