import React, { useState, useEffect } from "react";

const MatrixGame = () => {
  const size = 3;
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [finalSequence, setFinalSequence] = useState([]);
  const totalBoxes = size * size;

  useEffect(() => {
    if (finalSequence.length === totalBoxes) {
      finalSequence.forEach((index, i) => {
        setTimeout(() => {
          setClickedBoxes((prev) =>
            prev.map((box) => (box === index ? index : box))
          );
        }, i * 300);
      });
    }
  }, [finalSequence]);

  const handleClick = (index) => {
    if (finalSequence.length > 0) return;

    if (!clickedBoxes.includes(index)) {
      const newClickedBoxes = [...clickedBoxes, index];
      setClickedBoxes(newClickedBoxes);

      if (newClickedBoxes.length === totalBoxes) {
        setFinalSequence([...newClickedBoxes]);
      }
    }
  };

  const handleReset = () => {
    setClickedBoxes([]);
    setFinalSequence([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-center tracking-wide text-teal-400">
        3x3 Clickable Matrix
      </h1>

      <div className="grid grid-cols-3 gap-3 border-4 border-teal-400 p-6 rounded-xl shadow-lg bg-gray-800">
        {[...Array(totalBoxes)].map((_, index) => (
          <div
            key={index}
            className={`w-16 h-16 md:w-24 md:h-24 flex items-center justify-center text-lg md:text-xl font-bold cursor-pointer rounded-lg transition-all duration-500 shadow-lg
              ${
                finalSequence.length > 0
                  ? "bg-orange-500 text-white"
                  : clickedBoxes.includes(index)
                  ? "bg-green-500 text-black scale-110"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }
            `}
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <button
        onClick={handleReset}
        className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
      >
        Reset Game
      </button>
    </div>
  );
};

export default MatrixGame;
