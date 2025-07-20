import React from "react";

const Controls = ({ isPlaying, setIsPlaying }) => {
  return (
    <div className="controls">
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Controls;
