import React, { useState } from "react";
import MapView from "./components/MapView";
import Controls from "./components/Controls";
import data from "./data/dummy-route.json";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="app">
      <h1 className="header">Vehicle Tracker</h1>
      <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <MapView isPlaying={isPlaying} route={data} />
    </div>
  );
}

export default App;
