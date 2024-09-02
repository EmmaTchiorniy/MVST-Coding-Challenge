import React, { useState } from "react";
import Repositories from "./Containers/Repos";

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSearch = () => {
    setSearchUsername(username);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Repository Viewer</h1>
        <input
          type="text"
          value={username}
          className="search-bar"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter GitHub username"
        />
        <button onClick={handleSearch}>Search</button>
        {searchUsername && <Repositories username={searchUsername} />}
      </header>
    </div>
  );
};

export default App;
